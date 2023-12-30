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
pWIDTH=64
) (
input               iLatch1,
input               iLatch2,
input               iResetLatch1,
input               iResetLatch2,
output [31:0]       o1COUNTER,
output [31:0]       o1COUNTERHi,
output [31:0]       o2COUNTER,
output [31:0]       o2COUNTERHi,
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


always // Start at time 0 and repeat the begin/end forever
  begin
    //#1
    if( iCLK ) iCLK <= 0;
    else iCLK <=1;
    //iCLK= 0; // Set clk to 0
    //#1; // Wait for 1 time unit
    //iCLK = 1; // Set clk to 1
    //#1;
  end

always 
begin
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

  
always 

begin
  rCOUNTER<= rCOUNTER+1;
end

assign oRdyCOUNTER = latchLock1;
assign o1COUNTER=rLatch1[31:0];
assign o1COUNTERHi=rLatch1[63:32];
assign oRdyCOUNTER2 = latchLock2;
assign o2COUNTER=rLatch2[31:0];
assign o2COUNTERHi=rLatch2[63:32];

endmodule