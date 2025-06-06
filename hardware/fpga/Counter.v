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
output [31:0] o1COUNTER,  // register 1 with latched counter value
output [31:0] o1COUNTERHi,  // register 1 with latched counter value
output [31:0] o2COUNTER, // register 2 with latched counter value
output [31:0] o2COUNTERHi, // register 2 with latched counter value
output  oRdyCOUNTER,           // signals that data has been latched in register 1
output  oRdyCOUNTER2,           // signals that data has been latched in register 2
output  [31:0] debug
);
reg [pWIDTH-1:0] rCOUNTER = 0; // live counter, always increments
reg [pWIDTH-1:0] rLatch1 = 0;  // latched counter value 1
reg [pWIDTH-1:0] rLatch2 = 0;  // latched counter value 2
reg iCLK_ff = 0;  // the flip-flopped clock gate
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


// protocol should resemble something like:  (two digit values are hex representations of bytes)
//   Host receives 00 + 5 byte counter value
//   Host sends 00 to clear register 1 latch
//   host receives 01 + 5 byte counter value
//   Host sends 01 to clear register 2 latch

// for local test without hardware signal/button 
//  host sends 02 to generate iLatch1
//    which should trigger sending 00 + 5 byte counter, which the host would naturally respond with a 00
//  host sends 03 to generate iLatch2 
//    which should trigger sending 01 + 5 byte counter, which the host would naturally respond with a 01

// or from the other side:
//   slave sends 00 + 5 byte counter value when register 1 is latched
//   slave receives 00 and generates iResetLatch1
//   slave sends 01 + 5 byte counter value when register 2 is latched
//   slave receives 01 and generates iResetLatch2
//   slave receives 02 and generates iLatch1
//   slave receives 03 and generates iLatch2



always // Start at time 0 and repeat the begin/end forever
  begin
    #1
    if( iCLK_ff ) iCLK_ff = 0;
    else iCLK_ff=1;
    //iCLK= 0; // Set clk to 0
    //#1; // Wait for 1 time unit
    //iCLK = 1; // Set clk to 1
    //#1;
  end

always 
begin
    #1
    if( !iLatch1 ) begin
        if( rstLatchLock1 && latchLock1 ) begin 
            rstLatchLock1 = 0;
            latchLock1 = 0;
        end 
    end else begin
        if( !latchLock1 ) begin
            rLatch1<=rCOUNTER;
            rstLatchLock1 = 0;
            latchLock1 = 1;
        end

        if( iResetLatch1 && latchLock1 )  begin
            rstLatchLock1 = 1;
        end
    end
    
end

always 
begin
    #1
    if( !iLatch2 ) begin
        if( rstLatchLock2 && latchLock2 ) begin 
            rstLatchLock2 = 0;
            latchLock2 = 0;
        end 
    end else begin
        if( !latchLock2 ) begin
            rLatch2<=rCOUNTER;
            rstLatchLock2 = 0;
            latchLock2 = 1;
        end

        if( iResetLatch2 && latchLock2 )  begin
            rstLatchLock2 = 1;
        end
    end
end


  
always @(posedge iCLK_ff) 

begin
  rCOUNTER<= rCOUNTER+1;
end

assign oRdyCOUNTER = latchLock1;
assign o1COUNTER=rCOUNTER[31:0];
assign o1COUNTERHi=rCOUNTER[pWIDTH-1:32];
assign oRdyCOUNTER2 = latchLock2;
assign o2COUNTER=rLatch2[31:0];
assign o2COUNTERHi=rLatch2[pWIDTH-1:32];

endmodule