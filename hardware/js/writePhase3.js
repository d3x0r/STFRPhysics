

console.log( 
`
always @(posedge globalClock ) 	iCLK_ff[0] = !iCLK_ff[0];
` );
function phase( n ) {

console.log( 
`
always @(posedge iCLK_ff[${n-1}] ) 	iCLK_ff[${n}] = !iCLK_ff[${n}];
` );

}

for( let i = 1; i < 25; i++ ) {
	phase(i);
}
