
const PHASE_SIZE = 32;
const COUNTER_SIZE = 64;
const COUNTER_COL = 20; 


const PHASE_COL = 16; // 18 and 18+1

//const START_ROW = 75-Math.floor(PHASE_SIZE/4);
const START_ROW = 25-Math.floor(PHASE_SIZE/4);

console.log( `wire [${PHASE_SIZE-1}:0] connector;` ); // used to connect phase chain
console.log( `wire [${PHASE_SIZE-1}:0] wPhase1;` ); // connect phase to phase latch1
console.log( `wire [${PHASE_SIZE-1}:0] wPhase2;` ); // connect phase to phase latch2

console.log( `wire [${COUNTER_SIZE-1}:0] carry_wire; // carry wires for adder` );
console.log( `wire [${COUNTER_SIZE-1}:0] counter_wire; // output of adder to counter register` );
console.log( `wire [${COUNTER_SIZE-1}:0] counter_data_wire; // connect from register rCounter to adder data` ); 

console.log( `wire [${COUNTER_SIZE-1}:0] wCounter1; // connect to latch rCounter1` ); 
console.log( `wire [${COUNTER_SIZE-1}:0] wCounter2; // connect to latch rCounter2` ); 
console.log( `wire counter_tick_wire;  // extra inverter data wire for + 1` );
console.log( `(* gated_clock="yes" *) wire wFFLatchLock1;  // latch happened, lock until reset` );
console.log( `(* gated_clock="yes" *) wire wFFLatchLock2;  // latch happened, lock until reset` );
console.log( `(* gated_clock="yes" *) wire wLatchLock1;  // latch happened, lock until reset` );
console.log( `(* gated_clock="yes" *) wire wLatchLock2;  // latch happened, lock until reset` );
console.log( `wire wResetLock1;  // reset happened, lock until !iLatch1` );
console.log( `wire wResetLock2;  // reset happened, lock until !iLatch2` );
console.log( "" );

// iLatch1 -> set/reset flipflop
// iResetLatch1 -> set/reset flipflop

// iLatch sets flipflop
// iResetLatch Clears FlipFlop if iLatch is Low

// resetLatch -> if iLatch reset
//               if !iLatch clear wLatchLock


/*
(* BEL="D5LUT", LOC = "SLICE_X20Y52" *) LUT1 #(
   .INIT(2'b01)  // Specify LUT Contents
) LUT1_inst24 (
   .O(O),   // LUT general output
   .I0(I0)  // LUT input
);
*/

	console.log( "BUFG LATCHCLOCK1 ( .I( wFFLatchLock1 ), .O( wLatchLock1 ) );" );
	console.log( "BUFG LATCHCLOCK2 ( .I( wFFLatchLock2 ), .O( wLatchLock2 ) );" );
console.log( "" );


	console.log( 
`(* BEL="${['A','B','C','D'][0]}FF", LOC = "SLICE_X${PHASE_COL+2}Y${START_ROW + 8}", DONT_TOUCH = "true" *) LDPE  #(
   .INIT(0)  // Specify FF Contents
) LDPE_latch1_inst (
   .GE(wResetLock1),
	.G(1),
	.D(0),
	.PRE(iLatch1), 
	.Q(wFFLatchLock1)
);
` );

	console.log( 
`(* BEL="${['A','B','C','D'][0]}FF", LOC = "SLICE_X${PHASE_COL+2}Y${START_ROW + 7}", DONT_TOUCH = "true" *) LDPE  #(
   .INIT(0)  // Specify FF Contents
) LDPE_latch2_inst (
   .GE(wResetLock2),
	.G(1),
	.D(0),
	.PRE(iLatch2), 
	.Q(wFFLatchLock2)
);
` );

	console.log( 
`(* BEL="${['A','B','C','D'][0]}6LUT", LOC = "SLICE_X${PHASE_COL+2}Y${START_ROW + 8}", DONT_TOUCH = "true" *) LUT3  #(
   .INIT(8'he0)  // Specify FF Contents
) LUT3_reset1_inst (
   .I0(iResetLatch1),
	.I1(wResetLock1),
	.I2(wLatchLock1),
	.O(wResetLock1)
);
` );

	console.log( 
`(* BEL="${['A','B','C','D'][0]}6LUT", LOC = "SLICE_X${PHASE_COL+2}Y${START_ROW + 7}", DONT_TOUCH = "true" *) LUT3  #(
   .INIT(8'he0)  // Specify FF Contents
) LUT3_reset2_inst (
   .I0(iResetLatch2),
	.I1(wResetLock2),
	.I2(wLatchLock2),
	.O(wResetLock2)
);
` );


for( let i = 0; i < PHASE_SIZE; i++ ) {
	console.log( 
`(* BEL="${['A','B','C','D'][i%4]}5LUT", LOC = "SLICE_X${PHASE_COL}Y${START_ROW +4+ Math.floor(i/4)}", DONT_TOUCH = "true" *) LUT1 #(
   .INIT(2'b10)  // Specify LUT Contents
) LUT1_inst${Math.floor(i/4)}${i%4} (
   .O(${"connector["+i+"]"}),   // LUT general output
   .I0(${i?"connector["+(i-1)+"]":"iCLK"})  // LUT input
);
` );
}


for( let i = 0; i < PHASE_SIZE; i++ ) {
	console.log( 
`(* BEL="${['A','B','C','D'][i%4]}FF", LOC = "SLICE_X${PHASE_COL}Y${START_ROW +4+ Math.floor(i/4)}", DONT_TOUCH = "true" *) FDCE  #(
   .INIT(0)  // Specify FF Contents
) FDCE1_inst${Math.floor(i/4)}${i%4} (
   .CE(1),
	.C(wLatchLock1),
	.D(${"connector["+(i)+"]"}),
	.CLR(0), 
	.Q(${"wPhase1["+i+"]"})
);
` );

}


for( let i = 0; i < PHASE_SIZE; i++ ) {
	console.log( 
`(* BEL="${['A','B','C','D'][i%4]}FF", LOC = "SLICE_X${PHASE_COL+1}Y${START_ROW +4+ Math.floor(i/4)}", DONT_TOUCH = "true" *) FDCE #(
   .INIT(0)  // Specify FF Contents
) FDCE2_inst${Math.floor(i/4)}${i%4} (
   .CE(1),
	.C(wLatchLock2),
	.D(${"connector["+(i)+"]"}),
	.CLR(0), 
	.Q(${"wPhase2["+i+"]"})
);
` );
}



for( let i = 0; i < COUNTER_SIZE/4; i++ ) {
	if( i == 0 )
		console.log( `wire [3:0] carry4_di_${i}; assign carry4_di_${i}[0] = counter_data_wire[0]; assign carry4_di_${i}[3:1]=0;` );

	console.log( 
`(* BEL="CARRY4", LOC = "SLICE_X${COUNTER_COL}Y${START_ROW + i}", DONT_TOUCH = "true" *) CARRY4  CARRY4_inst${i} (
   .CO(carry_wire[${(i+1)*4-1}:${(i*4)}]),         // 4-bit carry out
   .O(counter_wire[${(i+1)*4-1}:${(i*4)}]),           // 4-bit carry chain XOR data out
   .CI(${i?"carry_wire["+(i*4-1)+"]":"0"}),         // 1-bit carry cascade input
   .CYINIT(0),                                      // 1-bit carry initialization
   .DI(${i?"0":("carry4_di_"+i)}),                       // 4-bit carry-MUX data in
   .S(${i?`counter_data_wire[${(i+1)*4-1}:${i*4}]`:`{ counter_data_wire[${(i+1)*4-1}:${i*4+1}],counter_tick_wire}`})            // 4-bit carry-MUX select input
 );
` );
}

for( let i = 0; i < COUNTER_SIZE; i++ ) {
	console.log( 
`(* BEL="${['A','B','C','D'][i%4]}FF", LOC = "SLICE_X${COUNTER_COL}Y${START_ROW + Math.floor(i/4)}", DONT_TOUCH = "true" *) FDRE  #(
   .INIT(0)  // Specify FF Contents
) FDRE1_counter_inst${Math.floor(i/4)}${i%4} (
   .CE(1),
	.C(iCLK),
	.R(0),
	.D(counter_wire[${i}]),
	.Q(${"counter_data_wire["+i+"]"})
);
` );

}


for( let i = 0; i < COUNTER_SIZE; i++ ) {
	console.log( 
`(* BEL="${['A','B','C','D'][Math.floor(i/2)%4]}${(i%2)?"5":""}FF", LOC = "SLICE_X${COUNTER_COL+1}Y${START_ROW + Math.floor(i/8)*2}", DONT_TOUCH = "true" *) FDCE  #(
   .INIT(0)  // Specify FF Contents
) FDCE1_counter_inst${Math.floor(i/4)}${i%4} (
   .CE(1),
	.C(wLatchLock1),
	.D(counter_data_wire[${i}]),
	.CLR(0), 
	.Q(${"wCounter1["+i+"]"})
);
` );

}

for( let i = 0; i < COUNTER_SIZE; i++ ) {
	console.log( 
`(* BEL="${['A','B','C','D'][Math.floor(i/2)%4]}${(i%2)?"5":""}FF", LOC = "SLICE_X${COUNTER_COL+1}Y${START_ROW + Math.floor(i/8)*2+1}", DONT_TOUCH = "true" *) FDCE #(
   .INIT(0)  // Specify FF Contents
) FDCE2_counter_inst${Math.floor(i/4)}${i%4} (
   .CE(1),
	.C(wLatchLock2),
	.D(counter_data_wire[${i}]),
	.CLR(0), 
	.Q(${"wCounter2["+i+"]"})
);
` );

}


	console.log( 
`(* BEL="A6LUT", LOC = "SLICE_X${COUNTER_COL}Y${START_ROW}", DONT_TOUCH = "true" *) LUT1 #(
   .INIT(2'b01)  // Specify LUT Contents
) LUT1_counter_inst0 (
   .O(counter_tick_wire),   // LUT general output
   .I0(counter_data_wire[0])  // LUT input
);
` );
