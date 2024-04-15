

function writeAssign( w ) {

let s = 'generate if( inWidth'+w+' > 0 )\n\tassign outBus[';
for( let n = w; n >= 0; n-- ) {
	s += 'inWidth' + n + (n>0?"+":"");
}
s += -1;
s += ":"
if( w > 0 )
	for( let n = w-1; n >= 0; n-- ) {
		s += 'inWidth' + n + (n > 0?"+":"");
	}
else s += "0"

s+= "]=";

s += "i"+w+"[inWidth"+w+"-1:0];\n";
s += "endgenerate"

console.log( s );
}


for( let n = 0; n < 32; n++ ) {
	writeAssign( n );
}
