
console.log( "      rCOUNTER[0] = !rCOUNTER[0];" );
function writeLoop( i ) {
	if( i < 64 )  {
	console.log( "     if( rCOUNTER[%d] ) begin".padStart( 28+i*2, " " ), i-1 );
	console.log( "        rCOUNTER[%d] = !rCOUNTER[%d];".padStart( 35+i*2, " " ), i, i );
        writeLoop( i+1 );
	console.log( "     end".padStart( 8+i*2, " " ) );
        }

}

writeLoop( 1 );

