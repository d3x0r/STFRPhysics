`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 12/26/2023 02:15:50 AM
// Design Name: 
// Module Name: SimulationParams
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


module SimulationParams(

    );
 reg iLatch1;
 reg iLatch2;
 reg iRstLatch1;
 reg iRstLatch2;
 wire [39:0] reg1;
 wire [39:0] reg2;
 wire rdy1;
 wire rdy2;
 reg iReset = 0;
 
 initial begin
    iLatch1 = 0;
    iLatch2 = 0;
    iRstLatch1 = 0;
    iRstLatch2 = 0;
    
    #100
    iLatch1 = 1;
    #100
    iLatch1 = 0;
    iLatch2 = 1;
    #100
    iRstLatch1 = 1;
    iLatch2 = 0; 

    #100
    iRstLatch1 = 0;
    iRstLatch2 = 1;
    iLatch1 = 1;
    #100
    iLatch1 = 0;
    iLatch2 = 1;
    iRstLatch1 = 1;
    iRstLatch2 = 0;
    #100
    iLatch2 = 0; 
    #100
    iRstLatch2 = 1;


 end
 
 COUNTER u1( iLatch1, iLatch2, iRstLatch1, iRstLatch2, reg1, reg2, rdy1, rdy2 );
endmodule
