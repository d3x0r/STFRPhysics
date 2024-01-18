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
PHASE_SIZE=26
) (
input    globalClock,
input    iReset,
(* ALLOW_COMBINATORIAL_LOOPS="true" *) input               iLatch1,      // signal event that latches the counter to register 1
(* ALLOW_COMBINATORIAL_LOOPS="true" *) input               iLatch2,      // signal event that latches the counter to register 2
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
reg [PHASE_SIZE-1:0] rPhaseLatch1 = 0;  // latched counter value 1
reg [pWIDTH-1:0] rLatch2 = 0;  // latched counter value 2
reg [PHASE_SIZE-1:0] rPhaseLatch2 = 0;  // latched counter value 2

wire [PHASE_SIZE-1:0] iCLK_ff ;//26'b1;  // the flip-flopped clock gate
reg [PHASE_SIZE-1:0] iCLK_ff_p;  // the flip-flopped clock gate
reg [PHASE_SIZE-1:0] iCLK_ff_n;  // the flip-flopped clock gate
//reg [6:0] rSynthClock;

//(* dont_touch="TRUE" *) reg [25:0] rPhase;  // the flip-flopped clock gate
//(* dont_touch="TRUE" *) reg [25:0] rPhase_n;  // the flip-flopped clock gate
(* dont_touch="TRUE" *) wire [PHASE_SIZE-1:0] wPhase;  // the flip-flopped clock gate
(* dont_touch="TRUE" *) wire [PHASE_SIZE-2:0] wPhase_n;  // the flip-flopped clock gate

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
//assign   debug[31:16] = wPhase;
//assign   debug[31:16] = rPhase;
assign   debug[31:16] = 0;
//assign	 debug[22:16] = 0;//rSynthClock[6:0];
//assign   debug[31:23] = 0;

//assign debug = 0;

/*
initial begin
    iCLK_ff_p = 0;
    iCLK_ff_n = 0;
end
*/

/*
always @(posedge iReset) begin
    rCOUNTER = 0;
    rLatch1 = 0;
    rLatch2 = 0;
    rPhaseLatch1 = 0;
    rPhaseLatch2 = 0;
    iCLK_ff_p = 0;
    iCLK_ff_n = 0;
    
end
*/


genvar ph;
assign wPhase[0] = globalClock;
for( ph=0; ph < PHASE_SIZE-1; ph=ph+1 ) begin
    assign wPhase_n[ph] = !wPhase  [ph];
    assign wPhase  [ph+1] = !wPhase_n[ph];
end


/*
genvar ph;
assign wPhase[0] = globalClock;
for( ph=0; ph < PHASE_SIZE-1; ph=ph+1 ) begin
    assign wPhase  [ph+1] = wPhase  [ph];
end
*/


/*

always begin
rPhase  [0] = globalClock;
end
always begin
rPhase  [1] = rPhase[0];
end
always begin
rPhase  [2] = rPhase[1];
end
always begin
rPhase  [3] = rPhase[2];
end
always begin
rPhase  [4] = rPhase[3];
end
always begin
rPhase  [5] = rPhase[4];
end
always begin
rPhase  [6] = rPhase[5];
end
always begin
rPhase  [7] = rPhase[6];
end
always begin
rPhase  [8] = rPhase[7];
end
always begin
rPhase  [9] = rPhase[8];
end
always begin
rPhase  [10] = rPhase[9];
end
always begin
rPhase  [11] = rPhase[10];
end
always begin
rPhase  [12] = rPhase[11];
end
always begin
end
always begin
rPhase  [13] = rPhase[12];
end
always begin
rPhase  [14] = rPhase[13];
end
always begin
rPhase  [15] = rPhase[14];
end
*/

/*
always begin
rPhase[0] = globalClock;
rPhase_n[0] = !rPhase  [0];
rPhase  [1] = !rPhase_n[0];
rPhase_n[1] = !rPhase  [1];
rPhase  [2] = !rPhase_n[1];
rPhase_n[2] = !rPhase  [2];
rPhase  [3] = !rPhase_n[2];
rPhase_n[3] = !rPhase  [3];
rPhase  [4] = !rPhase_n[3];
rPhase_n[4] = !rPhase  [4];
rPhase  [5] = !rPhase_n[4];
rPhase_n[5] = !rPhase  [5];
rPhase  [6] = !rPhase_n[5];
rPhase_n[6] = !rPhase  [6];
rPhase  [7] = !rPhase_n[6];
rPhase_n[7] = !rPhase  [7];
rPhase  [8] = !rPhase_n[7];
rPhase_n[8] = !rPhase  [8];
rPhase  [9] = !rPhase_n[8];
rPhase_n[9] = !rPhase  [9];
rPhase  [10] = !rPhase_n[9];
rPhase_n[10] = !rPhase  [10];
rPhase  [11] = !rPhase_n[10];
rPhase_n[11] = !rPhase  [11];
rPhase  [12] = !rPhase_n[11];
rPhase_n[12] = !rPhase  [12];
rPhase  [13] = !rPhase_n[12];
rPhase_n[13] = !rPhase  [13];
end
*/

/*
always @(posedge globalClock ) #1 	rPhase[0] = !(rPhase[0]);
always @(posedge rPhase[0] ) #1 	rPhase[1] = !(rPhase[1]);
always @(posedge rPhase[1] ) #1 	rPhase[2] = !(rPhase[2]);
always @(posedge rPhase[2] ) #1 	rPhase[3] = !(rPhase[3]);
always @(posedge rPhase[3] ) #1 	rPhase[4] = !(rPhase[4]);
always @(posedge rPhase[4] ) #1 	rPhase[5] = !(rPhase[5]);
always @(posedge rPhase[5] ) #1 	rPhase[6] = !(rPhase[6]);
always @(posedge rPhase[6] ) #1 	rPhase[7] = !(rPhase[7]);
always @(posedge rPhase[7] ) #1 	rPhase[8] = !(rPhase[8]);
always @(posedge rPhase[8] ) #1 	rPhase[9] = !(rPhase[9]);
always @(posedge rPhase[9] ) #1 	rPhase[10] = !(rPhase[10]);
always @(posedge rPhase[10] ) #1 	rPhase[11] = !(rPhase[11]);
always @(posedge rPhase[11] ) #1 	rPhase[12] = !(rPhase[12]);
always @(posedge rPhase[12] ) #1 	rPhase[13] = !(rPhase[13]);
always @(posedge rPhase[13] ) #1 	rPhase[14] = !(rPhase[14]);
always @(posedge rPhase[14] ) #1 	rPhase[15] = !(rPhase[15]);


/*
(* dont_touch="TRUE" *) assign wPhase[0] = globalClock;
(* dont_touch="TRUE" *) assign wPhase[1] = wPhase[0];
(* dont_touch="TRUE" *) assign wPhase[2] = wPhase[1];
(* dont_touch="TRUE" *) assign wPhase[3] = wPhase[2];
(* dont_touch="true" *) assign wPhase[4] = wPhase[3];
(* dont_touch="true" *) assign wPhase[5] = wPhase[4];
(* dont_touch="true" *) assign wPhase[6] = wPhase[5];
(* dont_touch="true" *) assign wPhase[7] = wPhase[6];
(* dont_touch="true" *) assign wPhase[8] = wPhase[7];
(* dont_touch="true" *) assign wPhase[9] = wPhase[8];
(* dont_touch="true" *) assign wPhase[10] = wPhase[9];
(* dont_touch="true" *) assign wPhase[11] = wPhase[10];
(* dont_touch="true" *) assign wPhase[12] = wPhase[11];
(* dont_touch="true" *) assign wPhase[13] = wPhase[12];
(* dont_touch="true" *) assign wPhase[14] = wPhase[13];
(* dont_touch="true" *) assign wPhase[15] = wPhase[14];
*/

/*
always @(posedge globalClock ) #1 	iCLK_ff_p[0] = !(iCLK_ff_n[0]);
always @(negedge globalClock) #1 	iCLK_ff_n[0] = (iCLK_ff_p[0]);
assign   iCLK_ff[0] = iCLK_ff_p[0] ^ iCLK_ff_n[0];


always @(posedge iCLK_ff[0] ) #1 	iCLK_ff_p[1] = !(iCLK_ff_n[1]);
always @(negedge iCLK_ff[0]) #1 	iCLK_ff_n[1] = (iCLK_ff_p[1]);
assign    iCLK_ff[1] = iCLK_ff_p[1] ^ iCLK_ff_n[1];


always @(posedge iCLK_ff[1] ) #1 iCLK_ff_p[2] = !(iCLK_ff_n[2]);
always @(negedge iCLK_ff[1])   #1 iCLK_ff_n[2] = (iCLK_ff_p[2]);
assign    iCLK_ff[2] = iCLK_ff_p[2] ^ iCLK_ff_n[2];


always @(posedge iCLK_ff[2] )   #1 iCLK_ff_p[3] = !(iCLK_ff_n[3]);
always @(negedge iCLK_ff[2])   #1 iCLK_ff_n[3] = (iCLK_ff_p[3]);
assign    iCLK_ff[3] = iCLK_ff_p[3] ^ iCLK_ff_n[3];


always @(posedge iCLK_ff[3] )   #1 iCLK_ff_p[4] = !(iCLK_ff_n[4]);
always @(negedge iCLK_ff[3])   #1 iCLK_ff_n[4] = (iCLK_ff_p[4]);
assign    iCLK_ff[4] = iCLK_ff_p[4] ^ iCLK_ff_n[4];


always @(posedge iCLK_ff[4] )   #1 iCLK_ff_p[5] = !(iCLK_ff_n[5]);
always @(negedge iCLK_ff[4])   #1 iCLK_ff_n[5] = (iCLK_ff_p[5]);
assign    iCLK_ff[5] = iCLK_ff_p[5] ^ iCLK_ff_n[5];


always @(posedge iCLK_ff[5] )   #1 iCLK_ff_p[6] = !(iCLK_ff_n[6]);
always @(negedge iCLK_ff[5])   #1 iCLK_ff_n[6] = (iCLK_ff_p[6]);
assign    iCLK_ff[6] = iCLK_ff_p[6] ^ iCLK_ff_n[6];


always @(posedge iCLK_ff[6] )   #1 iCLK_ff_p[7] = !(iCLK_ff_n[7]);
always @(negedge iCLK_ff[6])   #1 iCLK_ff_n[7] = (iCLK_ff_p[7]);
assign    iCLK_ff[7] = iCLK_ff_p[7] ^ iCLK_ff_n[7];


always @(posedge iCLK_ff[7] )   #1 iCLK_ff_p[8] = !(iCLK_ff_n[8]);
always @(negedge iCLK_ff[7])   #1 iCLK_ff_n[8] = (iCLK_ff_p[8]);
assign    iCLK_ff[8] = iCLK_ff_p[8] ^ iCLK_ff_n[8];


always @(posedge iCLK_ff[8] )   #1 iCLK_ff_p[9] = !(iCLK_ff_n[9]);
always @(negedge iCLK_ff[8])   #1 iCLK_ff_n[9] = (iCLK_ff_p[9]);
assign    iCLK_ff[9] = iCLK_ff_p[9] ^ iCLK_ff_n[9];


always @(posedge iCLK_ff[9] )   #1 iCLK_ff_p[10] = !(iCLK_ff_n[10]);
always @(negedge iCLK_ff[9])   #1 iCLK_ff_n[10] = (iCLK_ff_p[10]);
assign    iCLK_ff[10] = iCLK_ff_p[10] ^ iCLK_ff_n[10];


always @(posedge iCLK_ff[10] )   #1 iCLK_ff_p[11] = !(iCLK_ff_n[11]);
always @(negedge iCLK_ff[10])   #1 iCLK_ff_n[11] = (iCLK_ff_p[11]);
assign    iCLK_ff[11] = iCLK_ff_p[11] ^ iCLK_ff_n[11];


always @(posedge iCLK_ff[11] )   #1 iCLK_ff_p[12] = !(iCLK_ff_n[12]);
always @(negedge iCLK_ff[11])   #1 iCLK_ff_n[12] = (iCLK_ff_p[12]);
assign    iCLK_ff[12] = iCLK_ff_p[12] ^ iCLK_ff_n[12];


always @(posedge iCLK_ff[12] )   #1 iCLK_ff_p[13] = !(iCLK_ff_n[13]);
always @(negedge iCLK_ff[12])   #1 iCLK_ff_n[13] = (iCLK_ff_p[13]);
assign    iCLK_ff[13] = iCLK_ff_p[13] ^ iCLK_ff_n[13];
*/

/*
always @(posedge iCLK_ff[13] )   #1 iCLK_ff_p[14] = !(iCLK_ff_n[14]);
always @(negedge iCLK_ff[13])   #1 iCLK_ff_n[14] = (iCLK_ff_p[14]);
assign    iCLK_ff[14] = iCLK_ff_p[14] ^ iCLK_ff_n[14];


always @(posedge iCLK_ff[14] )   #1 iCLK_ff_p[15] = !(iCLK_ff_n[15]);
always @(negedge iCLK_ff[14])   #1 iCLK_ff_n[15] = (iCLK_ff_p[15]);
assign    iCLK_ff[15] = iCLK_ff_p[15] ^ iCLK_ff_n[15];


always @(posedge iCLK_ff[15] )   #1 iCLK_ff_p[16] = !(iCLK_ff_n[16]);
always @(negedge iCLK_ff[15])   #1 iCLK_ff_n[16] = (iCLK_ff_p[16]);
assign    iCLK_ff[16] = iCLK_ff_p[16] ^ iCLK_ff_n[16];


always @(posedge iCLK_ff[16] )   #1 iCLK_ff_p[17] = !(iCLK_ff_n[17]);
always @(negedge iCLK_ff[16])   #1 iCLK_ff_n[17] = (iCLK_ff_p[17]);
assign    iCLK_ff[17] = iCLK_ff_p[17] ^ iCLK_ff_n[17];


always @(posedge iCLK_ff[17] )   #1 iCLK_ff_p[18] = !(iCLK_ff_n[18]);
always @(negedge iCLK_ff[17])   #1 iCLK_ff_n[18] = (iCLK_ff_p[18]);
assign    iCLK_ff[18] = iCLK_ff_p[18] ^ iCLK_ff_n[18];


always @(posedge iCLK_ff[18] )   #1 iCLK_ff_p[19] = !(iCLK_ff_n[19]);
always @(negedge iCLK_ff[18])   #1 iCLK_ff_n[19] = (iCLK_ff_p[19]);
assign    iCLK_ff[19] = iCLK_ff_p[19] ^ iCLK_ff_n[19];


always @(posedge iCLK_ff[19] )   #1 iCLK_ff_p[20] = !(iCLK_ff_n[20]);
always @(negedge iCLK_ff[19])   #1 iCLK_ff_n[20] = (iCLK_ff_p[20]);
assign    iCLK_ff[20] = iCLK_ff_p[20] ^ iCLK_ff_n[20];


always @(posedge iCLK_ff[20] )   #1 iCLK_ff_p[21] = !(iCLK_ff_n[21]);
always @(negedge iCLK_ff[20])   #1 iCLK_ff_n[21] = (iCLK_ff_p[21]);
assign    iCLK_ff[21] = iCLK_ff_p[21] ^ iCLK_ff_n[21];


always @(posedge iCLK_ff[21] )   #1 iCLK_ff_p[22] = !(iCLK_ff_n[22]);
always @(negedge iCLK_ff[21])   #1 iCLK_ff_n[22] = (iCLK_ff_p[22]);
assign    iCLK_ff[22] = iCLK_ff_p[22] ^ iCLK_ff_n[22];


always @(posedge iCLK_ff[22] )   #1 iCLK_ff_p[23] = !(iCLK_ff_n[23]);
always @(negedge iCLK_ff[22])   #1 iCLK_ff_n[23] = (iCLK_ff_p[23]);
assign    iCLK_ff[23] = iCLK_ff_p[23] ^ iCLK_ff_n[23];


always @(posedge iCLK_ff[23] )   #1 iCLK_ff_p[24] = !(iCLK_ff_n[24]);
always @(negedge iCLK_ff[23])   #1 iCLK_ff_n[24] = (iCLK_ff_p[24]);
assign    iCLK_ff[24] = iCLK_ff_p[24] ^ iCLK_ff_n[24];


always @(posedge iCLK_ff[24] )   #1 iCLK_ff_p[25] = !(iCLK_ff_n[25]);
always @(negedge iCLK_ff[24])   #1 iCLK_ff_n[25] = (iCLK_ff_p[25]);
assign    iCLK_ff[25] = iCLK_ff_p[25] ^ iCLK_ff_n[25];
*/


// about 1 second off, 1 millisecond on.
//assign	oLatchTest1 = ( (rCOUNTER[26:16] & 'h7fc) == 'h700 ) ;//&& !( (rCOUNTER[19:8] & 'hfff) );
//assign	oLatchTest2 = ( (rCOUNTER[26:16] & 'h7fc) == 'h700 ) ;//&& !( (rCOUNTER[19:8] & 'hfff) );

//assign	oLatchTest1 = ( (rCOUNTER[26:4] & 'h7fffff) == 'h700000 ) && !( (rCOUNTER[19:8] & 'hfff) );
//assign oLatchTest2 = 0;



always @(posedge globalClock)
begin
      #1
		rCOUNTER <= rCOUNTER+1;
		
end

always begin	 
	#1
    (* dont_touch="TRUE" *) latchLock1 <= ( iLatch1 || latchLock1 ) && !( !iLatch1 && ( rstLatchLock1 ||iResetLatch1 ) );
	(* dont_touch="TRUE" *) rstLatchLock1 <= ( iLatch1 && (iResetLatch1 || rstLatchLock1) ) ;
	
    (* dont_touch="TRUE" *) latchLock2 <= ( iLatch2 || latchLock2 ) && !( !iLatch2 && ( rstLatchLock2 ||iResetLatch2 ) );
	(* dont_touch="TRUE" *) rstLatchLock2 <= ( iLatch2 && ( iResetLatch2 || rstLatchLock2 ) ) ;

end

always @(posedge iLatch1 ) begin
         rLatch1<=rCOUNTER;
         //rPhaseLatch1 =wPhase;
         rPhaseLatch1 <= wPhase;
         //rPhaseLatch1<=rPhase;
end

always @(posedge iLatch2 ) begin
         rLatch2<=rCOUNTER;
         //rPhaseLatch2 =wPhase;
         rPhaseLatch2 <= wPhase;
         //rPhaseLatch2<=rPhase;
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
