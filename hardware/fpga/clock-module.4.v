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
input               iLatch1,      // signal event that latches the counter to register 1
input               iLatch2,      // signal event that latches the counter to register 2
input               iResetLatch1, // sent after the value in register 1 is read from (or sent to) the USB
input               iResetLatch2, // sent after the value in register 2 is read from (or sent to) the USB
output [31:0]       o1COUNTER,    // register 1 with latched counter value
output [31:0]       o1COUNTERHi,  // register 1 with latched counter value high bits
output [31:0]       o2COUNTER,    // register 2 with latched counter value
output [31:0]       o2COUNTERHi,  // register 2 with latched counter value high bits
output  oRdyCOUNTER,           // signals that data has been latched in register 1
output  oRdyCOUNTER2,           // signals that data has been latched in register 2
output [31:0]        debug
);
reg [63:0] rCOUNTER = 0; // live counter, always increments

reg [pWIDTH-1:0] rLatch1 = 0;  // latched counter value 1
reg [pWIDTH-1:0] rLatch2 = 0;  // latched counter value 2

reg iCLK_ff = 0;  // the flip-flopped clock gate
reg iCLK_ff1 = 0;  // the flip-flopped clock gate

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
	 debug[31:16] = rCOUNTER[15:0];
end


always begin	 
   latchLock1 <= ( iLatch1 || latchLock1 ) && !( !iLatch1 && ( rstLatchLock1 ||iResetLatch1 ) );
	rstLatchLock1 <= ( iLatch1 && (iResetLatch1 || rstLatchLock1) ) ;
	
   latchLock2 <= ( iLatch2 || latchLock2 ) && !( !iLatch2 && ( rstLatchLock2 ||iResetLatch2 ) );
	rstLatchLock2 <= ( iLatch2 && ( iResetLatch2 || rstLatchLock2 ) ) ;

end

always @(posedge iLatch1 ) begin
         rLatch1<=rCOUNTER;
end

always @(posedge iLatch2 ) begin
         rLatch2<=rCOUNTER;
end

always if( iCLK_ff ) iCLK_ff = 0; else iCLK_ff = 1;


//always @(posedge iCLK_ff) if( iCLK_ff1 ) iCLK_ff1 = 0; else iCLK_ff1 = 1;


always @(posedge iCLK_ff)
begin
		rCOUNTER <= rCOUNTER+1;
end


assign oRdyCOUNTER = latchLock1;
assign o1COUNTER=rLatch1[31:0];
assign o1COUNTERHi=rLatch1[63:32];

assign oRdyCOUNTER2 = latchLock2;
assign o2COUNTER=rLatch2[31:0];
assign o2COUNTERHi=rLatch2[63:32];

endmodule
