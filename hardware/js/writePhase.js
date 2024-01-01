

function phase( n ) {

console.log( 
`
always  @( posedge iCLK_ff[${n}] )	begin
	#1
	iCLK_ff[${n+1}] = iCLK_ff[${n}];
end
always  @( negedge iCLK_ff[${n}] )	begin
	#1
	iCLK_ff[${n+1}] = iCLK_ff[${n}];
end
` );

}

for( let i = 0; i < 12; i++ ) {
	phase(i);
}
