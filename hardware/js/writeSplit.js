

function writeAssign( w ) {

let s = 'generate if( '+w+' < inWidth && outWidth'+w+' > 0 && enable'+((''+w).padStart(2,"0"))+' )\n\tassign o'+w+'[outWidth' +w+"-1:0]";

s += "=";

s += "inBus[";//outWidth"+w+"-1:0];";


for( let n = w; n >= 0; n-- ) {
	s += 'outWidth' + n + (n>0?"+":"");
}
s += -1;
s += ":"
if( w > 0 )
	for( let n = w-1; n >= 0; n-- ) {
		s += 'outWidth' + n + (n > 0?"+":"");
	}
else s += "0"

s+= "];\nendgenerate";



console.log( s );
}


for( let n = 0; n < 32; n++ ) {
	writeAssign( n );
}
