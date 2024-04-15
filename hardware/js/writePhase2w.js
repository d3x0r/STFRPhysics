


console.log( "wire iCLK_ff0 = iCLK_ff_p[0] ^ iCLK_ff_n[0];" );

function pwire(n) {
	console.log( "wire iCLK_ff"+n+" = iCLK_ff_p["+n+"] ^ iCLK_ff_n["+n+"];" ); 
}

for( let i = 0; i < 25; i++ ) {
	pwire(i);
}


function pwire2(n) {
	console.log( "	rPhaseLatch1["+n+"]<= iCLK_ff"+n +";"); 
}

for( let i = 0; i < 25; i++ ) {
	pwire2(i);
}



function pwire3(n) {
	console.log( "	rPhaseLatch2["+n+"]<= iCLK_ff"+n +";" ); 
}

for( let i = 0; i < 25; i++ ) {
	pwire3(i);
}


console.log( 
`
always @(posedge globalClock ) 	iCLK_ff_p[0] = !(iCLK_ff_n[0]);
always @(negedge globalClock) 	iCLK_ff_n[0] = (iCLK_ff_p[0]);
//assign   iCLK_ff[0] = iCLK_ff_p[0] ^ iCLK_ff_n[0];
` );

//always begin  #5    iCLK_ff[0] = iCLK_ff_p[0] ^ iCLK_ff_n[0];  end

function phase( n ) {

console.log( 
`
always @(posedge iCLK_ff${n} ) 	iCLK_ff_p[${n+1}] = !(iCLK_ff_n[${n+1}]);
always @(negedge iCLK_ff${n} ) 	iCLK_ff_n[${n+1}] = (iCLK_ff_p[${n+1}]);
//assign    iCLK_ff[${n+1}] = iCLK_ff_p[${n+1}] ^ iCLK_ff_n[${n+1}];
` );

//always begin  #5    iCLK_ff[${n+1}] = iCLK_ff_p[${n+1}] ^ iCLK_ff_n[${n+1}];  end

}

for( let i = 0; i < 25; i++ ) {
	phase(i);
}
