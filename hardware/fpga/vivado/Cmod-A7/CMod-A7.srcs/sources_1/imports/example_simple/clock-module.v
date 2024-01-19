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
pWIDTH=64,
PHASE_SIZE = 26
) (
input    globalClock,
input    iReset,
(* ALLOW_COMBINATORIAL_LOOPS="true", ASYNC_REG = "TRUE" *) input               iLatch1,      // signal event that latches the counter to register 1
(* ALLOW_COMBINATORIAL_LOOPS="true", ASYNC_REG = "TRUE" *) input               iLatch2,      // signal event that latches the counter to register 2
input               iResetLatch1, // sent after the value in register 1 is read from (or sent to) the USB
input               iResetLatch2, // sent after the value in register 2 is read from (or sent to) the USB
output [31:0]       o1COUNTER,    // register 1 with latched counter value
output [31:0]       o1COUNTERHi,  // register 1 with latched counter value high bits
output [31:0]       o1COUNTERPhase,  // register 1 with latched counter value high bits
output [31:0]       o2COUNTER,    // register 2 with latched counter value
output [31:0]       o2COUNTERHi,  // register 2 with latched counter value high bits
output [31:0]       o2COUNTERPhase,  // register 1 with latched counter value high bits
output  oRdyCOUNTER,           // signals that data has been latched in register 1
output  oRdyCOUNTER2,           // signals that data has been latched in register 2
output  oLatchTest1,           // test clock signal - internal signal exposed to generate periodic latch 1
output  oLatchTest2,           // test clock signal - internal signal exposed to generate periodic latch 2
output [31:0]        debug
);
reg [63:0] rCOUNTER = 0; // live counter, always increments

reg [pWIDTH-1:0] rLatch1 = 0;  // latched counter value 1
reg [25:0] rPhaseLatch1 = 0;  // latched counter value 1
reg [pWIDTH-1:0] rLatch2 = 0;  // latched counter value 2
reg [25:0] rPhaseLatch2 = 0;  // latched counter value 2

(* dont_touch="TRUE", KEEP="TRUE" *) wire [PHASE_SIZE-1:0] wPhase;  // the flip-flopped clock gate



(* ALLOW_COMBINATORIAL_LOOPS="true", ASYNC_REG = "TRUE" *) reg latchLock1 = 0;     // iLatch1 was set, and the value is copied to rLatch1; prevents update to register 1 until reset
(* ALLOW_COMBINATORIAL_LOOPS="true", ASYNC_REG = "TRUE" *) reg latchLock2 = 0;     // iLatch2 was signaled, the value is copied to rLatch2; prevents update to reigster 2 until reset
(* ALLOW_COMBINATORIAL_LOOPS="true" *) reg rstLatchLock1 = 0;  // pending reset signal, iResetLatch1 was signaled, but iLatch1 is still active; 
			// wait until iLatch1 is not in a signaled state
(* ALLOW_COMBINATORIAL_LOOPS="true" *) reg rstLatchLock2 = 0;  // pending reset signal, iResetLatch2 was signaled, but iLatch2 is still active; 
			// wait until iLatch2 is not in a signaled state

// if iResetLatch1 or iResetlatch2 is signaled, and iLatch1 or iLatch2 respectively is not set, then
// latchLock1 or latchLock2 is immediately cleared.

// if iResetLatch* is signaled and iLatch* is still set, then set rstLatchLock*, then when latchLock* is reset
// if rstLatchLock* is set, reset latckLock*.


assign	 debug[0] = iLatch1;
assign	 debug[1] = iLatch2;
assign	 debug[2] = latchLock1;
assign	 debug[3] = latchLock2;
assign	 debug[4] = iResetLatch1;
assign	 debug[5] = iResetLatch2;
assign	 debug[6] = rstLatchLock1;
assign	 debug[7] = rstLatchLock2;
assign	 debug[8] = oRdyCOUNTER;
assign	 debug[9] = oRdyCOUNTER2;
assign   debug[15:10] = 0;
//assign   debug[31:16] = wPhase;
assign   debug[31:16] = 0;
//assign	 debug[22:16] = 0;//rSynthClock[6:0];
//assign   debug[31:23] = 0;

//assign debug = 0;


genvar ph;
assign wPhase[0] = globalClock;
for( ph=0; ph < PHASE_SIZE-1; ph=ph+1 ) begin
    assign wPhase  [ph+1] = !wPhase[ph];
end


assign	oLatchTest1 = ( (rCOUNTER[27:16] & 'hFfc) == 'hE00 ) ;//&& !( (rCOUNTER[19:8] & 'hfff) );
//assign	oLatchTest1 = ( (rCOUNTER[26:4] & 'h7fffff) == 'h700000 ) && !( (rCOUNTER[19:8] & 'hfff) );
assign	oLatchTest2 = ( (rCOUNTER[27:16] & 'hFfc) == 'hE00 ) ;//&& !( (rCOUNTER[19:8] & 'hfff) );
//assign oLatchTest2 = 0;



always @(posedge globalClock)
begin
      #1
		rCOUNTER <= rCOUNTER+1;
		
end

always begin	 
	#1
    latchLock1 <= ( iLatch1 || latchLock1 ) && !( !iLatch1 && ( rstLatchLock1 ||iResetLatch1 ) );
	rstLatchLock1 <= ( iLatch1 && (iResetLatch1 || rstLatchLock1) ) ;
	
    latchLock2 <= ( iLatch2 || latchLock2 ) && !( !iLatch2 && ( rstLatchLock2 ||iResetLatch2 ) );
	rstLatchLock2 <= ( iLatch2 && ( iResetLatch2 || rstLatchLock2 ) ) ;

end

always @(posedge iLatch1 ) begin
         rLatch1<=rCOUNTER;
         rPhaseLatch1<=wPhase;
end

always @(posedge iLatch2 ) begin
         rLatch2<=rCOUNTER;
         rPhaseLatch2<=wPhase;
end


assign oRdyCOUNTER = latchLock1;
assign o1COUNTER=rLatch1[31:0];
assign o1COUNTERHi=rLatch1[63:32];
assign o1COUNTERPhase[25:0]=rPhaseLatch1;
assign o1COUNTERPhase[31:26]=6'b000000;

// rCOUNTER DOES tick... 
//assign o1COUNTER=rCOUNTER[31:0];
//assign o1COUNTERHi=rCOUNTER[63:32];
//assign o1COUNTERPhase[31:0]=iCLK_ff;

assign oRdyCOUNTER2 = latchLock2;
assign o2COUNTER=rLatch2[31:0];
assign o2COUNTERHi=rLatch2[63:32];
assign o2COUNTERPhase[25:0]=rPhaseLatch2;
assign o2COUNTERPhase[31:26]=6'b000000;


endmodule
