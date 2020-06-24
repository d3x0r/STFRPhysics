
//const JSOX = require( "./jsox.js" );
let nodes = 0;
function node() {
	nodes++;
	this.id = nodes;
	this.mates = [];
}
node.prototype.add = function(n) { this.mates.push(n) }
node.prototype.isEdge = function(x) { return this.mates.find(m=>m===x) }


var i;
let root = null;
let test2 = null;
for( let i = 0; i < 50; i++ ) {
	const n_ = new node();
        if( root ) {
		root.add(n_);
		n_.add(root );
       	} else test2 = n_;
        root = n_;
}


let here = root;

let test1 = root;
let test  = [null,null,null,null];


for( let i = 0; i < 5; i++ ) {
	// skip 5
	for( let j = 0; j < 6; j++ ) here = here.mates[0];
        let tmp = here;
        // add 8 that loop to next
        for( let j = 0; j < 8; j++ ) {
		const n_ = new node();
                if( i === j ) test[i] = n_;
        	tmp.add( n_ );
        	if( j === 7 )  {
                	n_.add( here.mates[0] ); // circle end back to list next...
                }
		tmp = n_;
        }
}

//console.log( "Graph:", JSOX.stringify( root ) );
//console.log( "Graph:", JSOX.stringify( root, null, "\t" ) );
function reach( A, C, length ) {
	maxdepth = 0;
	depth = 0;
	const r = reach_( A, C, length );
	console.log( "Return R:", r, depth, maxdepth );
	return r;

	// ended up wrapping this to setup depth counters.
	function reach_( A, C, length ) { 
		depth++;
		if( depth > maxdepth ) maxdepth = depth;
		//console.log( "Look at:", A.id, C.id, length, depth );
		if( A === C ) { depth--; return true; }
		if (length == 0) { depth--; return true  }
		else if (length == 1) { depth--; return !!A.isEdge( C )  }
		else { 
			for( let B of A.mates )  {
				//console.log( "Mate of A:", A.id, B.id );
				if( reach_( A, B, length>>1 ) && reach_( B, C, length>>1 ) ) {
					depth--;
					return true; 
				}
				//console.log( "no reach a b b c", aStat, bStat );
			}
		}
		depth--;
		return false;
	}
}

console.log( "1 ", reach( root, root.mates[0].mates[0], nodes ) );
console.log( "1 2 ", reach( test1, test2, nodes ) );
console.log( "1 [0] ", reach( test1, test[0], nodes ) );
console.log( "1 [1] ", reach( test1, test[1], nodes ) );
console.log( "1 [2] ", reach( test1, test[2], nodes ) );
console.log( "1 [3] ", reach( test1, test[3], nodes ) );
