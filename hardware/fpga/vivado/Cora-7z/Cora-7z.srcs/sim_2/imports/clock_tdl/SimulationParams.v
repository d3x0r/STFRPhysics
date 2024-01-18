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
 reg rReset;
 reg iLatch1;
 reg iLatch2;
 reg iRstLatch1;
 reg iRstLatch2;
 wire [31:0] o1COUNTER;
 wire [31:0] o1COUNTERHi;
 wire [31:0] o1COUNTERPhase;
 wire [31:0] o2COUNTER;
 wire [31:0] o2COUNTERHi;
 wire [31:0] o2COUNTERPhase;
 wire oRdyCOUNTER1;
 wire oRdyCOUNTER2;
 wire oLatchTest1;
 wire oLatchTest2;
 reg iCLK=0;
 wire [31:0] debug;
 
 always begin 
    #20
    iCLK=1;
    #20
    iCLK=0;
 end
 
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
    #25
    iRstLatch1 = 1;
    #75
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

    #100
    iRstLatch2 = 0;

    #100000
    iLatch1 = 1;
    #100
    iLatch1 = 0;
    iRstLatch1 = 1;
    #100
    iRstLatch1 = 0;

 end


 COUNTER u1( iCLK, rReset, iLatch1, iLatch2, iRstLatch1, iRstLatch2
            , o1COUNTER, o1COUNTERHi, o1COUNTERPhase
            , o2COUNTER, o2COUNTERHi, o2COUNTERPhase
            , oRdyCOUNTER1, oRdyCOUNTER2,oLatchTest1, oLatchTest2, debug );

endmodule
