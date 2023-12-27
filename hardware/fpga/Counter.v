`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 12/26/2023 01:37:14 AM
// Design Name: 
// Module Name: Counter
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////
module COUNTER #(
pWIDTH=40
) (
input               iLatch1,      // signal event that latches the counter to register 1
input               iLatch2,      // signal event that latches the counter to register 2
input               iResetLatch1, // sent after the value in register 1 is read from (or sent to) the USB
input               iResetLatch2, // sent after the value in register 2 is read from (or sent to) the USB
output [pWIDTH-1:0] oCOUNTER,  // register 1 with latched counter value
output [pWIDTH-1:0] oCOUNTER2, // register 2 with latched counter value
output  oRdyCOUNTER,           // signals that data has been latched in register 1
output  oRdyCOUNTER2           // signals that data has been latched in register 2
);
reg [pWIDTH-1:0] rCOUNTER = 0; // live counter, always increments
reg [pWIDTH-1:0] rLatch1 = 0;  // latched counter value 1
reg [pWIDTH-1:0] rLatch2 = 0;  // latched counter value 2
reg iCLK = 0;  // the flip-flopped clock gate
reg latchLock1 = 0;     // iLatch1 was set, and the value is copied to rLatch1; prevents update to register 1 until reset
reg latchLock2 = 0;     // iLatch2 was signaled, the value is copied to rLatch2; prevents update to reigster 2 until reset
reg rstLatchLock1 = 0;  // pending reset signal, iResetLatch1 was signaled, but iLatch1 is still active; 
			// wait until iLatch1 is not in a signaled state
reg rstLatchLock2 = 0;  // pending reset signal, iResetLatch2 was signaled, but iLatch2 is still active; 
			// wait until iLatch2 is not in a signaled state

// if iResetLatch1 or iResetlatch2 is signaled, and iLatch1 or iLatch2 respectively is not set, then
// latchLock1 or latchLock2 is immediately cleared.

// if iResetLatch* is signaled and iLatch* is still set, then set rstLatchLock*, then when latchLock* is reset
// if rstLatchLock* is set, reset latckLock*.

// protocol should resemble something like
//   Host receives 00 + 5 byte counter value
//   Host sends 0 to clear register 1 latch
//   host receives 01 + 5 byte counter value
//   Host sends 1 to clear register 2 latch
// or from the other side:
//   slave sends 00 + 5 byte counter value when register 1 is latched
//   slave receives 00 and gneerates iResetLatch1
//   slave sends 01 + 5 byte counter value when register 2 is latched
//   slave receives 01 and gneerates iResetLatch2

initial forever // Start at time 0 and repeat the begin/end forever
  begin
    #1
    if( iCLK ) iCLK = 0;
    else iCLK=1;
    //iCLK= 0; // Set clk to 0
    //#1; // Wait for 1 time unit
    //iCLK = 1; // Set clk to 1
    //#1;
  end

always @(posedge iResetLatch1)
    if( !iLatch1 ) begin
        latchLock1 = 0; 
    end else begin
        rstLatchLock1 = 1;
    end
begin

always @(posedge iLatch1) 
begin
    rLatch1=rCOUNTER;
    rstLatchLock1 = 0;
    latchLock1 = 1;
end

always @(negedge iLatch1) 
begin
  if( rstLatchLock1 && latchLock1 ) begin 
      rstLatchLock1 = 0;
      latchLock1 = 0;
  end 
end

always @(posedge iResetLatch2)
    if( !iLatch2 ) begin
        latchLock2 = 0; 
    end else begin
        rstLatchLock2 = 1;
    end
end

always @(posedge iLatch2) 
begin
  if( iLatch2 ) begin
    rLatch2=rCOUNTER;
    rstLatchLock2 = 0;
    latchLock2 = 1;
  end else if ( !iLatch2 && latchLock2 ) begin
    latchLock2 = 0;
  end
end

always @(negedge iLatch2) 
begin
  if( rstLatchLock2 && latchLock2 ) begin 
    rstLatchLock2 = 0;
    latchLock2 = 0;
  end 
end

  
always @(posedge iCLK) 

begin
  rCOUNTER<= rCOUNTER+1;
end

assign oRdyCOUNTER = latchLock1;
assign oCOUNTER=rLatch1;
assign oRdyCOUNTER2 = latchLock2;
assign oCOUNTER2=rLatch2;

endmodule