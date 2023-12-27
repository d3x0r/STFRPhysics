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
input               iLatch1,
input               iLatch2,
input               iResetLatch1,
input               iResetLatch2,
output [pWIDTH-1:0] oCOUNTER,
output [pWIDTH-1:0] oCOUNTER2,
output  oRdyCOUNTER,
output  oRdyCOUNTER2
);
reg [pWIDTH-1:0] rCOUNTER = 0;
reg [pWIDTH-1:0] rLatch1 = 0;
reg [pWIDTH-1:0] rLatch2 = 0;
reg iCLK = 0;
reg latchLock1 = 0;
reg latchLock2 = 0;
reg rstLatchLock1 = 0;
reg rstLatchLock2 = 0;


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
  if( rstLatchLock1 && latchLock2 ) begin 
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