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
reg rstA = 0;
reg rstA_ = 0;
reg clrA_ = 0;
reg [8:0] rCOUNTERa = 0; // live counter, always increments
reg rstB = 0;
reg rstB_ = 0;
reg clrB_ = 0;
reg [16:0] rCOUNTERb = 0; // live counter, always increments
reg [41:0] rCOUNTERc = 0; // live counter, always increments
reg [pWIDTH-1:0] rLatch1 = 0;  // latched counter value 1
reg [pWIDTH-1:0] rLatch2 = 0;  // latched counter value 2

reg iCLK = 0;  // the flip-flopped clock gate
reg latchLock1 = 0;     // iLatch1 was set, and the value is copied to rLatch1; prevents update to register 1 until reset
reg latchLock2 = 0;     // iLatch2 was signaled, the value is copied to rLatch2; prevents update to reigster 2 until reset
reg rstLatchLock1 = 0;  // pending reset signal, iResetLatch1 was signaled, but iLatch1 is still active; 
			// wait until iLatch1 is not in a signaled state
reg rstLatchLock2 = 0;  // pending reset signal, iResetLatch2 was signaled, but iLatch2 is still active; 
reg init = 0;
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


initial begin
	rLatch1 = 0;
	rLatch2 = 0;
	latchLock1 = 0;
	latchLock2 = 0;
//	debug = 0;
end

always // Start at time 0 and repeat the begin/end forever
  begin
    #1
    iCLK <= !iCLK;    
  end

  /*
always 
begin
    //#1
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
	 //debug[31:16] = rCOUNTER[15:0];
end
*/

always 
begin	 
    #1
    /*
	 if( !iLatch1 && rstLatchLock1 ) begin
        latchLock1 <= 0;
        rstLatchLock1 <= 0;
    end 
	 
    if( iResetLatch1 && iLatch1 )  rstLatchLock1 <= 1;
    else if( iResetLatch1 )        latchLock1 <= 0;
	 
    // latch2 handler    
    if( !iLatch2 && rstLatchLock2 ) begin
        latchLock2 <= 0;
        rstLatchLock2 <= 0;
    end 
	 
	 if( iResetLatch2 && latchLock2 ) rstLatchLock2 <= 1;
    else if( iResetLatch2 )          latchLock2 <= 0;
    */
    
    if( iLatch1 ) begin
	   if( !latchLock1 ) begin
         rLatch1[7:0]<=rCOUNTERa[7:0];
         rLatch1[23:8]<=rCOUNTERb[15:0];
         rLatch1[63:24]<=rCOUNTERc[39:0];
         latchLock1 <= 1;
        end
        if( iResetLatch1 )  rstLatchLock1 <= 1;
	end else begin
	 if( iResetLatch1 || rstLatchLock1 ) begin
        latchLock1 <= 0;
        rstLatchLock1 <= 0;
      end 
	end

// latch2 handler    
	if( iLatch2 ) begin
		if( !latchLock2 ) begin
         rLatch2[7:0]<=rCOUNTERa[7:0];
         rLatch2[23:8]<=rCOUNTERb[15:0];
         rLatch2[63:24]<=rCOUNTERc[39:0];
         latchLock2 <= 1;
    end
    if( iResetLatch2 )  rstLatchLock2 <= 1;
	end else begin
	 if( iResetLatch2 || rstLatchLock2 ) begin
        latchLock2 <= 0;
        rstLatchLock2 <= 0;
    end 
	 
	 if( iLatch1 && !latchLock1 ) begin
         rLatch1[7:0]<=rCOUNTERa[7:0];
         rLatch1[23:8]<=rCOUNTERb[15:0];
         rLatch1[63:24]<=rCOUNTERc[39:0];
         latchLock1 <= 1;
    end
	 if( iLatch2 && !latchLock2 ) begin
         rLatch2[7:0]<=rCOUNTERa[7:0];
         rLatch2[23:8]<=rCOUNTERb[15:0];
         rLatch2[63:24]<=rCOUNTERc[39:0];
         latchLock2 <= 1;
    end
	 if( rstA_ ) rstA = 1;
	 if( clrA_ ) rstA = 0;
	 if( rstB_ ) rstB = 1;
	 if( clrB_ ) rstB = 0;
end

always @(posedge iCLK  )
begin
		clrA_ <= rstA;
		rCOUNTERa <= rCOUNTERa+1+(rstA_ ^ rstA)*256;
end

always @(posedge rCOUNTERa[8] or posedge rstA )
begin
        if( rCOUNTERa[8]  ) begin
            if( !rstA_) begin
                rstA_ <= 1;
        		clrB_ <= rstB;
	          	rCOUNTERb <= rCOUNTERb+1 + (rstB_ ^ rstB ) * 65536;
	       	end else rstA_ <= 0;	
        end else rstA_ <= 0;
end

always @(posedge rCOUNTERb[16] or posedge rstB )
begin
        if( rCOUNTERb[16] ) begin
            if( !rstB_) begin
                rstB_ <= 1;
        		rCOUNTERc <= rCOUNTERc+1;
        	end else rstB_ <= 0;	
        end else rstB_ <= 0;
end

assign oRdyCOUNTER = latchLock1;
assign o1COUNTER=rLatch1[31:0];
assign o1COUNTERHi=rLatch1[63:32];

assign oRdyCOUNTER2 = latchLock2;
assign o2COUNTER=rLatch2[31:0];
assign o2COUNTERHi=rLatch2[63:32];

endmodule
