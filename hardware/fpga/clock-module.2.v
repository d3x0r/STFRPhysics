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
/*
reg rstA = 0;
reg rstA_ = 0;
reg clrA_ = 0;
reg [8:0] rCOUNTERa = 0; // live counter, always increments
reg rstB = 0;
reg rstB_ = 0;
reg clrB_ = 0;
reg [16:0] rCOUNTERb = 0; // live counter, increments on overflow of rCounterA
reg [41:0] rCOUNTERc = 0; // live counter, increments on overflow of rCounterB
*/
reg [63:0] rCOUNTER = 0;
reg [pWIDTH-1:0] rLatch1 = 0;  // latched counter value 1
reg [pWIDTH-1:0] rLatch2 = 0;  // latched counter value 2

/*
reg iCLKa = 0;  // the flip-flopped clock gate
reg iCLKb = 0;  // the flip-flopped clock gate
reg iCLKc = 0;  // the flip-flopped clock gate
reg iCLKd = 0;  // the flip-flopped clock gate
*/
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

/*
initial begin
	rLatch1 = 0;
	rLatch2 = 0;
	latchLock1 = 0;
	latchLock2 = 0;
	debug = 0;
end
*/
//integer index;

//always // Start at time 0 and repeat the begin/end forever
//  begin
 //   #1
	/* 
    iCLKa <= !iCLKa;
	 if( iCLKa ) begin
		iCLKb <= !iCLKb;
		if( iCLKb ) begin
			iCLKc <= !iCLKc;
			if( iCLKc ) begin
				iCLKd <= !iCLKd;
			end
		end
	 end
	 */
	 /*
		rCOUNTER[0] <= iCLKb;//!rCOUNTER[0];
		for(index = 1; index < 64; index = index + 1) begin
			if( !rCOUNTER[index-1] ) rCOUNTER[index] <= !rCOUNTER[index];
			else break;
		end
	  */	
	  /*
		// this doesn't seem to generate a proper netlist at all...  it seems to think that 
		// fanning in all the symbols above is the correct solution.
      rCOUNTER[0] = !rCOUNTER[0];
      if( rCOUNTER[0] ) begin
         rCOUNTER[1] = !rCOUNTER[1];
        if( rCOUNTER[1] ) begin
           rCOUNTER[2] = !rCOUNTER[2];
          if( rCOUNTER[2] ) begin
             rCOUNTER[3] = !rCOUNTER[3];
            if( rCOUNTER[3] ) begin
               rCOUNTER[4] = !rCOUNTER[4];
              if( rCOUNTER[4] ) begin
                 rCOUNTER[5] = !rCOUNTER[5];
                if( rCOUNTER[5] ) begin
                   rCOUNTER[6] = !rCOUNTER[6];
                  if( rCOUNTER[6] ) begin
                     rCOUNTER[7] = !rCOUNTER[7];
                    if( rCOUNTER[7] ) begin
                       rCOUNTER[8] = !rCOUNTER[8];
                      if( rCOUNTER[8] ) begin
                         rCOUNTER[9] = !rCOUNTER[9];
                        if( rCOUNTER[9] ) begin
                           rCOUNTER[10] = !rCOUNTER[10];
                          if( rCOUNTER[10] ) begin
                             rCOUNTER[11] = !rCOUNTER[11];
                            if( rCOUNTER[11] ) begin
                               rCOUNTER[12] = !rCOUNTER[12];
                              if( rCOUNTER[12] ) begin
                                 rCOUNTER[13] = !rCOUNTER[13];
                                if( rCOUNTER[13] ) begin
                                   rCOUNTER[14] = !rCOUNTER[14];
                                  if( rCOUNTER[14] ) begin
                                     rCOUNTER[15] = !rCOUNTER[15];
                                    if( rCOUNTER[15] ) begin
                                       rCOUNTER[16] = !rCOUNTER[16];
                                      if( rCOUNTER[16] ) begin
                                         rCOUNTER[17] = !rCOUNTER[17];
                                        if( rCOUNTER[17] ) begin
                                           rCOUNTER[18] = !rCOUNTER[18];
                                          if( rCOUNTER[18] ) begin
                                             rCOUNTER[19] = !rCOUNTER[19];
                                            if( rCOUNTER[19] ) begin
                                               rCOUNTER[20] = !rCOUNTER[20];
                                              if( rCOUNTER[20] ) begin
                                                 rCOUNTER[21] = !rCOUNTER[21];
                                                if( rCOUNTER[21] ) begin
                                                   rCOUNTER[22] = !rCOUNTER[22];
                                                  if( rCOUNTER[22] ) begin
                                                     rCOUNTER[23] = !rCOUNTER[23];
                                                    if( rCOUNTER[23] ) begin
                                                       rCOUNTER[24] = !rCOUNTER[24];
                                                      if( rCOUNTER[24] ) begin
                                                         rCOUNTER[25] = !rCOUNTER[25];
                                                        if( rCOUNTER[25] ) begin
                                                           rCOUNTER[26] = !rCOUNTER[26];
                                                          if( rCOUNTER[26] ) begin
                                                             rCOUNTER[27] = !rCOUNTER[27];
                                                            if( rCOUNTER[27] ) begin
                                                               rCOUNTER[28] = !rCOUNTER[28];
                                                              if( rCOUNTER[28] ) begin
                                                                 rCOUNTER[29] = !rCOUNTER[29];
                                                                if( rCOUNTER[29] ) begin
                                                                   rCOUNTER[30] = !rCOUNTER[30];
                                                                  if( rCOUNTER[30] ) begin
                                                                     rCOUNTER[31] = !rCOUNTER[31];
                                                                    if( rCOUNTER[31] ) begin
                                                                       rCOUNTER[32] = !rCOUNTER[32];
                                                                      if( rCOUNTER[32] ) begin
                                                                         rCOUNTER[33] = !rCOUNTER[33];
                                                                        if( rCOUNTER[33] ) begin
                                                                           rCOUNTER[34] = !rCOUNTER[34];
                                                                          if( rCOUNTER[34] ) begin
                                                                             rCOUNTER[35] = !rCOUNTER[35];
                                                                            if( rCOUNTER[35] ) begin
                                                                               rCOUNTER[36] = !rCOUNTER[36];
                                                                              if( rCOUNTER[36] ) begin
                                                                                 rCOUNTER[37] = !rCOUNTER[37];
                                                                                if( rCOUNTER[37] ) begin
                                                                                   rCOUNTER[38] = !rCOUNTER[38];
                                                                                  if( rCOUNTER[38] ) begin
                                                                                     rCOUNTER[39] = !rCOUNTER[39];
                                                                                    if( rCOUNTER[39] ) begin
                                                                                       rCOUNTER[40] = !rCOUNTER[40];
                                                                                      if( rCOUNTER[40] ) begin
                                                                                         rCOUNTER[41] = !rCOUNTER[41];
                                                                                        if( rCOUNTER[41] ) begin
                                                                                           rCOUNTER[42] = !rCOUNTER[42];
                                                                                          if( rCOUNTER[42] ) begin
                                                                                             rCOUNTER[43] = !rCOUNTER[43];
                                                                                            if( rCOUNTER[43] ) begin
                                                                                               rCOUNTER[44] = !rCOUNTER[44];
                                                                                              if( rCOUNTER[44] ) begin
                                                                                                 rCOUNTER[45] = !rCOUNTER[45];
                                                                                                if( rCOUNTER[45] ) begin
                                                                                                   rCOUNTER[46] = !rCOUNTER[46];
                                                                                                  if( rCOUNTER[46] ) begin
                                                                                                     rCOUNTER[47] = !rCOUNTER[47];
                                                                                                    if( rCOUNTER[47] ) begin
                                                                                                       rCOUNTER[48] = !rCOUNTER[48];
                                                                                                      if( rCOUNTER[48] ) begin
                                                                                                         rCOUNTER[49] = !rCOUNTER[49];
                                                                                                        if( rCOUNTER[49] ) begin
                                                                                                           rCOUNTER[50] = !rCOUNTER[50];
                                                                                                          if( rCOUNTER[50] ) begin
                                                                                                             rCOUNTER[51] = !rCOUNTER[51];
                                                                                                            if( rCOUNTER[51] ) begin
                                                                                                               rCOUNTER[52] = !rCOUNTER[52];
                                                                                                              if( rCOUNTER[52] ) begin
                                                                                                                 rCOUNTER[53] = !rCOUNTER[53];
                                                                                                                if( rCOUNTER[53] ) begin
                                                                                                                   rCOUNTER[54] = !rCOUNTER[54];
                                                                                                                  if( rCOUNTER[54] ) begin
                                                                                                                     rCOUNTER[55] = !rCOUNTER[55];
                                                                                                                    if( rCOUNTER[55] ) begin
                                                                                                                       rCOUNTER[56] = !rCOUNTER[56];
                                                                                                                      if( rCOUNTER[56] ) begin
                                                                                                                         rCOUNTER[57] = !rCOUNTER[57];
                                                                                                                        if( rCOUNTER[57] ) begin
                                                                                                                           rCOUNTER[58] = !rCOUNTER[58];
                                                                                                                          if( rCOUNTER[58] ) begin
                                                                                                                             rCOUNTER[59] = !rCOUNTER[59];
                                                                                                                            if( rCOUNTER[59] ) begin
                                                                                                                               rCOUNTER[60] = !rCOUNTER[60];
                                                                                                                              if( rCOUNTER[60] ) begin
                                                                                                                                 rCOUNTER[61] = !rCOUNTER[61];
                                                                                                                                if( rCOUNTER[61] ) begin
                                                                                                                                   rCOUNTER[62] = !rCOUNTER[62];
                                                                                                                                  if( rCOUNTER[62] ) begin
                                                                                                                                     rCOUNTER[63] = !rCOUNTER[63];
                                                                                                                                   end
                                                                                                                                 end
                                                                                                                               end
                                                                                                                             end
                                                                                                                           end
                                                                                                                         end
                                                                                                                       end
                                                                                                                     end
                                                                                                                   end
                                                                                                                 end
                                                                                                               end
                                                                                                             end
                                                                                                           end
                                                                                                         end
                                                                                                       end
                                                                                                     end
                                                                                                   end
                                                                                                 end
                                                                                               end
                                                                                             end
                                                                                           end
                                                                                         end
                                                                                       end
                                                                                     end
                                                                                   end
                                                                                 end
                                                                               end
                                                                             end
                                                                           end
                                                                         end
                                                                       end
                                                                     end
                                                                   end
                                                                 end
                                                               end
                                                             end
                                                           end
                                                         end
                                                       end
                                                     end
                                                   end
                                                 end
                                               end
                                             end
                                           end
                                         end
                                       end
                                     end
                                   end
                                 end
                               end
                             end
                           end
                         end
                       end
                     end
                   end
                 end
               end
             end
           end
         end
       end
		*/
		
//end

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
	 debug[31:16] = rCOUNTER[15:0];
end
*/

always 
begin	 
   #1
	if( iLatch1 ) begin
		if( !latchLock1 ) begin
//         rLatch1[7:0]<=rCOUNTERa[7:0];
//         rLatch1[23:8]<=rCOUNTERb[15:0];
//         rLatch1[63:24]<=rCOUNTERc[39:0];
//			rLatch1<=rCOUNTER;
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
	 /*
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
	end
	 if( rstA_ && !rstA ) rstA <= 1;
	 if( clrA_ ) rstA <= 0;
	 if( rstB_ && !rstB ) rstB <= 1;
	 if( clrB_ ) rstB <= 0;
	*/
end


/*
always @(posedge iCLKd )
begin
		clrA_ <= rstA;
		rCOUNTERa <= rCOUNTERa+1+(rstA_ ^ rstA)*256;
end

always @(posedge rCOUNTERa[8] or posedge rstA )
begin
        if( rCOUNTERa[8] ) begin
				if( !rstA_ ) begin
					rstA_ <= 1;
					clrB_ <= rstB;
					rCOUNTERb <= rCOUNTERb+1 + (rstB_ ^ rstB ) * 65536;	
				end else rstA_ <= 0;
        end else rstA_ <= 0;
end

always @(posedge rCOUNTERb[16] or posedge rstB )
begin
        if( rCOUNTERb[16]  ) begin
				if( !rstB_ ) begin
					rstB_ <= 1;
					rCOUNTERc <= rCOUNTERc+1;	
				end else rstB_ <= 0;
        end else rstB_ <= 0;
end
*/

always 
begin
   #1
	rCOUNTER = rCOUNTER + 1;
end

assign oRdyCOUNTER = latchLock1;

//assign o1COUNTER=rLatch1[31:0];
//assign o1COUNTERHi=rLatch1[63:32];

assign o1COUNTER=rCOUNTER[31:0];
assign o1COUNTERHi=rCOUNTER[63:32];

//assign o1COUNTER[7:0]=rCOUNTERa[7:0];
//assign o1COUNTER[23:8]=rCOUNTERb[15:0];
//assign o1COUNTER[31:24]=rCOUNTERc[7:0];
//assign o1COUNTERHi[31:0]=rCOUNTERc[39:8];


assign oRdyCOUNTER2 = latchLock2;
assign o2COUNTER=rLatch2[31:0];
assign o2COUNTERHi=rLatch2[63:32];

endmodule
