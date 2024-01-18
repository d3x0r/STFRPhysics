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
input    globalClock,
input               iLatch1,      // signal event that latches the counter to register 1
input               iLatch2,      // signal event that latches the counter to register 2
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
output [31:0]        debug
);
reg [63:0] rCOUNTER = 0; // live counter, always increments

reg [pWIDTH-1:0] rLatch1 = 0;  // latched counter value 1
reg [25:0] rPhaseLatch1 = 0;  // latched counter value 1
reg [pWIDTH-1:0] rLatch2 = 0;  // latched counter value 2
reg [25:0] rPhaseLatch2 = 0;  // latched counter value 2

reg [25:0] iCLK_ff = 0;  // the flip-flopped clock gate
reg [25:0] iCLK_ff_p = 0;  // the flip-flopped clock gate
reg [25:0] iCLK_ff_n = 0;  // the flip-flopped clock gate
reg [6:0] rSynthClock = 0;

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



always 
begin
    #1
    // latch1 handler
	 debug[0] = iLatch1;
	 debug[1] = iLatch2;
	 debug[2] = latchLock1;
	 debug[3] = latchLock2;
	 debug[4] = iResetLatch1;
	 debug[5] = iResetLatch2;
	 debug[6] = rstLatchLock1;
	 debug[7] = rstLatchLock2;
	 debug[8] = oRdyCOUNTER;
	 debug[9] = oRdyCOUNTER2;
	 debug[22:16] = rSynthClock[6:0];
end
//assign debug = 0;

always begin	 
   latchLock1 <= ( iLatch1 || latchLock1 ) && !( !iLatch1 && ( rstLatchLock1 ||iResetLatch1 ) );
	rstLatchLock1 <= ( iLatch1 && (iResetLatch1 || rstLatchLock1) ) ;
	
   latchLock2 <= ( iLatch2 || latchLock2 ) && !( !iLatch2 && ( rstLatchLock2 ||iResetLatch2 ) );
	rstLatchLock2 <= ( iLatch2 && ( iResetLatch2 || rstLatchLock2 ) ) ;

end

always @(posedge iLatch1 ) begin
         rLatch1<=rCOUNTER;
         rPhaseLatch1<=iCLK_ff;
end

always @(posedge iLatch2 ) begin
         rLatch2<=rCOUNTER;
         rPhaseLatch2<=iCLK_ff;
end


always begin
   #1
	rSynthClock[0] = !rSynthClock[0];
end

always @(posedge rSynthClock[0] ) rSynthClock[1] = !rSynthClock[1];
always @(posedge rSynthClock[1] ) rSynthClock[2] = !rSynthClock[2];
always @(posedge rSynthClock[2] ) rSynthClock[3] = !rSynthClock[3];
always @(posedge rSynthClock[3] ) rSynthClock[4] = !rSynthClock[4];
always @(posedge rSynthClock[4] ) rSynthClock[5] = !rSynthClock[5];
always @(posedge rSynthClock[5] ) rSynthClock[6] = !rSynthClock[6];



always @(posedge globalClock ) 	iCLK_ff_p[0] = !(iCLK_ff_n[0]);
always @(negedge globalClock) 	iCLK_ff_n[0] = (iCLK_ff_p[0]);
always begin  #5    iCLK_ff[0] = iCLK_ff_p[0] ^ iCLK_ff_n[0];  end


always @(posedge iCLK_ff[0] ) 	iCLK_ff_p[1] = !(iCLK_ff_n[1]);
always @(negedge iCLK_ff[0]) 	iCLK_ff_n[1] = (iCLK_ff_p[1]);
always begin  #5    iCLK_ff[1] = iCLK_ff_p[1] ^ iCLK_ff_n[1];  end


always @(posedge iCLK_ff[1] ) 	iCLK_ff_p[2] = !(iCLK_ff_n[2]);
always @(negedge iCLK_ff[1]) 	iCLK_ff_n[2] = (iCLK_ff_p[2]);
always begin  #5    iCLK_ff[2] = iCLK_ff_p[2] ^ iCLK_ff_n[2];  end


always @(posedge iCLK_ff[2] ) 	iCLK_ff_p[3] = !(iCLK_ff_n[3]);
always @(negedge iCLK_ff[2]) 	iCLK_ff_n[3] = (iCLK_ff_p[3]);
always begin  #5    iCLK_ff[3] = iCLK_ff_p[3] ^ iCLK_ff_n[3];  end


always @(posedge iCLK_ff[3] ) 	iCLK_ff_p[4] = !(iCLK_ff_n[4]);
always @(negedge iCLK_ff[3]) 	iCLK_ff_n[4] = (iCLK_ff_p[4]);
always begin  #5    iCLK_ff[4] = iCLK_ff_p[4] ^ iCLK_ff_n[4];  end


always @(posedge iCLK_ff[4] ) 	iCLK_ff_p[5] = !(iCLK_ff_n[5]);
always @(negedge iCLK_ff[4]) 	iCLK_ff_n[5] = (iCLK_ff_p[5]);
always begin  #5    iCLK_ff[5] = iCLK_ff_p[5] ^ iCLK_ff_n[5];  end


always @(posedge iCLK_ff[5] ) 	iCLK_ff_p[6] = !(iCLK_ff_n[6]);
always @(negedge iCLK_ff[5]) 	iCLK_ff_n[6] = (iCLK_ff_p[6]);
always begin  #5    iCLK_ff[6] = iCLK_ff_p[6] ^ iCLK_ff_n[6];  end


always @(posedge iCLK_ff[6] ) 	iCLK_ff_p[7] = !(iCLK_ff_n[7]);
always @(negedge iCLK_ff[6]) 	iCLK_ff_n[7] = (iCLK_ff_p[7]);
always begin  #5    iCLK_ff[7] = iCLK_ff_p[7] ^ iCLK_ff_n[7];  end


always @(posedge iCLK_ff[7] ) 	iCLK_ff_p[8] = !(iCLK_ff_n[8]);
always @(negedge iCLK_ff[7]) 	iCLK_ff_n[8] = (iCLK_ff_p[8]);
always begin  #5    iCLK_ff[8] = iCLK_ff_p[8] ^ iCLK_ff_n[8];  end


always @(posedge iCLK_ff[8] ) 	iCLK_ff_p[9] = !(iCLK_ff_n[9]);
always @(negedge iCLK_ff[8]) 	iCLK_ff_n[9] = (iCLK_ff_p[9]);
always begin  #5    iCLK_ff[9] = iCLK_ff_p[9] ^ iCLK_ff_n[9];  end


always @(posedge iCLK_ff[9] ) 	iCLK_ff_p[10] = !(iCLK_ff_n[10]);
always @(negedge iCLK_ff[9]) 	iCLK_ff_n[10] = (iCLK_ff_p[10]);
always begin  #5    iCLK_ff[10] = iCLK_ff_p[10] ^ iCLK_ff_n[10];  end


always @(posedge iCLK_ff[10] ) 	iCLK_ff_p[11] = !(iCLK_ff_n[11]);
always @(negedge iCLK_ff[10]) 	iCLK_ff_n[11] = (iCLK_ff_p[11]);
always begin  #5    iCLK_ff[11] = iCLK_ff_p[11] ^ iCLK_ff_n[11];  end


always @(posedge iCLK_ff[11] ) 	iCLK_ff_p[12] = !(iCLK_ff_n[12]);
always @(negedge iCLK_ff[11]) 	iCLK_ff_n[12] = (iCLK_ff_p[12]);
always begin  #5    iCLK_ff[12] = iCLK_ff_p[12] ^ iCLK_ff_n[12];  end


always @(posedge iCLK_ff[12] ) 	iCLK_ff_p[13] = !(iCLK_ff_n[13]);
always @(negedge iCLK_ff[12]) 	iCLK_ff_n[13] = (iCLK_ff_p[13]);
always begin  #5    iCLK_ff[13] = iCLK_ff_p[13] ^ iCLK_ff_n[13];  end


always @(posedge iCLK_ff[13] ) 	iCLK_ff_p[14] = !(iCLK_ff_n[14]);
always @(negedge iCLK_ff[13]) 	iCLK_ff_n[14] = (iCLK_ff_p[14]);
always begin  #5    iCLK_ff[14] = iCLK_ff_p[14] ^ iCLK_ff_n[14];  end


always @(posedge iCLK_ff[14] ) 	iCLK_ff_p[15] = !(iCLK_ff_n[15]);
always @(negedge iCLK_ff[14]) 	iCLK_ff_n[15] = (iCLK_ff_p[15]);
always begin  #5    iCLK_ff[15] = iCLK_ff_p[15] ^ iCLK_ff_n[15];  end


always @(posedge iCLK_ff[15] ) 	iCLK_ff_p[16] = !(iCLK_ff_n[16]);
always @(negedge iCLK_ff[15]) 	iCLK_ff_n[16] = (iCLK_ff_p[16]);
always begin  #5    iCLK_ff[16] = iCLK_ff_p[16] ^ iCLK_ff_n[16];  end


always @(posedge iCLK_ff[16] ) 	iCLK_ff_p[17] = !(iCLK_ff_n[17]);
always @(negedge iCLK_ff[16]) 	iCLK_ff_n[17] = (iCLK_ff_p[17]);
always begin  #5    iCLK_ff[17] = iCLK_ff_p[17] ^ iCLK_ff_n[17];  end


always @(posedge iCLK_ff[17] ) 	iCLK_ff_p[18] = !(iCLK_ff_n[18]);
always @(negedge iCLK_ff[17]) 	iCLK_ff_n[18] = (iCLK_ff_p[18]);
always begin  #5    iCLK_ff[18] = iCLK_ff_p[18] ^ iCLK_ff_n[18];  end


always @(posedge iCLK_ff[18] ) 	iCLK_ff_p[19] = !(iCLK_ff_n[19]);
always @(negedge iCLK_ff[18]) 	iCLK_ff_n[19] = (iCLK_ff_p[19]);
always begin  #5    iCLK_ff[19] = iCLK_ff_p[19] ^ iCLK_ff_n[19];  end


always @(posedge iCLK_ff[19] ) 	iCLK_ff_p[20] = !(iCLK_ff_n[20]);
always @(negedge iCLK_ff[19]) 	iCLK_ff_n[20] = (iCLK_ff_p[20]);
always begin  #5    iCLK_ff[20] = iCLK_ff_p[20] ^ iCLK_ff_n[20];  end


always @(posedge iCLK_ff[20] ) 	iCLK_ff_p[21] = !(iCLK_ff_n[21]);
always @(negedge iCLK_ff[20]) 	iCLK_ff_n[21] = (iCLK_ff_p[21]);
always begin  #5    iCLK_ff[21] = iCLK_ff_p[21] ^ iCLK_ff_n[21];  end


always @(posedge iCLK_ff[21] ) 	iCLK_ff_p[22] = !(iCLK_ff_n[22]);
always @(negedge iCLK_ff[21]) 	iCLK_ff_n[22] = (iCLK_ff_p[22]);
always begin  #5    iCLK_ff[22] = iCLK_ff_p[22] ^ iCLK_ff_n[22];  end


always @(posedge iCLK_ff[22] ) 	iCLK_ff_p[23] = !(iCLK_ff_n[23]);
always @(negedge iCLK_ff[22]) 	iCLK_ff_n[23] = (iCLK_ff_p[23]);
always begin  #5    iCLK_ff[23] = iCLK_ff_p[23] ^ iCLK_ff_n[23];  end


always @(posedge iCLK_ff[23] ) 	iCLK_ff_p[24] = !(iCLK_ff_n[24]);
always @(negedge iCLK_ff[23]) 	iCLK_ff_n[24] = (iCLK_ff_p[24]);
always begin  #5    iCLK_ff[24] = iCLK_ff_p[24] ^ iCLK_ff_n[24];  end


always @(posedge iCLK_ff[24] ) 	iCLK_ff_p[25] = !(iCLK_ff_n[25]);
always @(negedge iCLK_ff[24]) 	iCLK_ff_n[25] = (iCLK_ff_p[25]);
always begin  #5    iCLK_ff[25] = iCLK_ff_p[25] ^ iCLK_ff_n[25];  end




//
//always @(posedge rSynthClock[2])
always @(posedge globalClock)
begin
      #1
		rCOUNTER = rCOUNTER+1;
end


assign oRdyCOUNTER = latchLock1;
assign o1COUNTER=rLatch1[31:0];
assign o1COUNTERHi=rLatch1[63:32];
assign o1COUNTERPhase[25:0]=rPhaseLatch1;
assign o1COUNTERPhase[31:26]=6'b000000;

assign oRdyCOUNTER2 = latchLock2;
assign o2COUNTER=rLatch2[31:0];
assign o2COUNTERHi=rLatch2[63:32];
assign o2COUNTERPhase[25:0]=rPhaseLatch2;
assign o2COUNTERPhase[31:26]=6'b000000;


endmodule
