
console.log( "      rCOUNTER[0] = !rCOUNTER[0];" );

function writeLoop( i ) {
	if( i < 64 )  {
	console.log( "always @(posedge rCOUNTER[%d])" + "rCOUNTER[%d] = !rCOUNTER[%d];", i-1, i, i );
        writeLoop( i+1 );
        }

}

writeLoop( 1 );

