const util = require('util');

for( var x = 0; x < 9; x++ ) {
	var s = 'x: ' +(x>=0?" "+x:x);
       	for( var z = -8; z < 9; z++ ) {
		s += "  " + util.format( "  "+ ((z>=0)?" "+z:z) + "    " )
	}
	s += "\n";
	for( var y = 0; y < 9; y++ ) {
		s += "Y="+(y>=0?" "+y:y);
        	for( var z = -8; z < 9; z++ ) {
			//s += "  " + util.format( x>=0?" "+x:x,y>=0?" "+y:y,z>=0?" "+z:z, " -> ", (x&1)?"-1":" 1", (y&1)?"-1":" 1",  (z&1)?"-1":" 1" );
			s += "  " + util.format( (x&1)?"-1":" 1", (y&1)?"-1":" 1",  (z&1)?"-1":" 1" );
                	//console.log( x,y,z, " -> ", (x&1)?-1:1, (y&1)?-1:1,  (z&1)?-1:1 )
		}
		s += "\n";
	}
	console.log( "\n", s );
}


