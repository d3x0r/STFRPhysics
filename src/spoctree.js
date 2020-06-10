
/* 
 *
 
 levels
 		(1 << tree.depth - 1)
    0 = 1 point 0    (half_width*1)  (depth 0)
    	1 point 1    (depth 1)
        1 point 3    (depth 2)
        1 point 7    (depth 3)
        1 point 15   (depth 4)
        1 point 31   (depth 5) 
        
        (  N = (1<<(tree.depth-this.level)-1), N2 = N + (1<<this.level) )
    1 = 2 point (0, ,2) ((depth 1)width of 3)
        2 point (1, ,5) ((depth 2)width of 4/6)
        2 point (3, ,11) (depth 3)(width of 5/12)
        2 point (7, ,23) (depth 4)(width of 6/24)
        2 point (15, ,47)
                
	( N = ( 1 << ( tree.depth - this.level) - 1 ), step = N + 1 << (1+tree.depth-this.level) , count = 1<<this.level
    2 = 4 point (0,2, ,4,6)  ((depth 2) width of 4/6)
        4 point (1,5, ,9,13) (depth 3) width of 
        

	( N = ( 1 << ( tree.depth - this.level) - 1 ), step = N + 1 << (1+tree.depth-this.level) , count = 1<<this.level
    3 = 8 points  (1<<node.level)
    	
    	( 0, 2, 4, 6,  ,8, 10, 12, 14 )  (depth 3)
	( 1, 5, 9, 13,  , 17, 21, 25, 29 ) (depth 4)   

    amazingly - is a binary number progression :)
     1,3,7,15, .. what's the next number?
     
     cubed. 2*2*2 (8) 3*3*3(27) 4*4*4(64)
     
*/

const OctereTree = function OctereTree() {
	if( this instanceof "OctereTree" ) throw new Error( "Please do not call this with new." );
        

function maxInt( x ) { 	for( let n = 0; n < 32; n++ ) if( x & ( 1 << 31-n) ) return 32-n; }

// basically a yardstick that converts a coordinate at a depth to an index.
function octRuler( x, depth ) {
	const stepx = 1 << ( depth);
        const Nx = (1 << ( depth -1 ))-1;
        return ( x*stepx + Nx );
}

const octEntResult = [0,0,0];
function octEnt( x, y, z, level, depth ) {
	const stepx = 1 << ( depth-level);
        const Nx = (1 << ( depth - level -1 ))-1;
        octEntResult[0] = ( x*stepx + Nx ); octEntResult[1] = (y*stepx+Nx); octEntResult[2] = (z*stepx+Nx);
        return octEntResult;
}

	
const depths = [maxInt(dims[0]),maxInt(dims[1]),maxInt(dims[2])];
        
const depth = (depths[0]>depths[1])?(depths[0]>depths[2])?depths[0]:(depths[1]>depths[2])?depths[1]:depths[2];

const dims = dims_;
const octBits = new Uint32Array( dims[0]*dims[1]*dims[2]/32 );




function octeretree(data,dims_) {
        let level = depth-1;
        
        for( ; level >= 0; level-- ) {
		xsize = octRuler( 1, level );
        	for( let z = 0; z < xsize && z < dims[2]; z++ ) 
                	for( let y = 0; y < xsize && y < dims[1], y++ )
	                	for( let x = 0; x < xsize && x < dims[0]; x++ ) {
                        		let ent = octEnt( x, y, z, level, depth );
                                       	let index = ent[0]+ent[1]*dims[0] + ent[2]*dims[0]*dims[1];
                                        let bits = octBits[(index>>5)|0];
                                        const bit = index & 0x1f;
                                        let newIndex, newBit;
					if( data[index] < 0 ) {
                                        	bits |= 1 << (index & 0x1f);
                                        }
                                        if( !(bits & ( 1 << index & 0x1f ) ) )
                                        	
                                        // this is already solid because of its own point.
                                       	level++;
                                	if( level == depth-1 ) {
	                                        	ent = octEnt( x*2, y*2, z*2, level, depth );
							if( data[index = ent[0]+ent[1]*dims[0]+ent[2]*dims[0]*dims[1]] < 0 ) {
                                                        	bits |= bit;
                                                	}
	                                        	else { ent = octEnt( x*2+1, y*2, z*2, level, depth );
							if( data[index = ent[0]+ent[1]*dims[0]+ent[2]*dims[0]*dims[1]] < 0 ) {
                                                        	bits |= bit;
                                                	}
                	                        	else { ent = octEnt( x*2, y*2+1, z*2, level, depth );
							if( data[index = ent[0]+ent[1]*dims[0]+ent[2]*dims[0]*dims[1]] < 0 ) {
                                	                	bits |= bit;
                                        		}
	                                        	else { ent = octEnt( x*2+1, y*2+1, z*2, level, depth );
							if( data[index = ent[0]+ent[1]*dims[0]+ent[2]*dims[0]*dims[1]] < 0 ) {
                                                        	bits |= bit;
                                                	}

	                                        	else { ent = octEnt( x*2, y*2, z*2+1, level, depth );
							if( data[index = ent[0]+ent[1]*dims[0]+ent[2]*dims[0]*dims[1]] < 0 ) {
                                                        	bits |= bit;
                                                	}
	                                        	else { ent = octEnt( x*2+1, y*2, z*2+1, level, depth );
							if( data[index = ent[0]+ent[1]*dims[0]+ent[2]*dims[0]*dims[1]] < 0 ) {
                                                        	bits |= bit;
                                                	}
                	                        	else { ent = octEnt( x*2, y*2+1, z*2+1, level, depth );
							if( data[index = ent[0]+ent[1]*dims[0]+ent[2]*dims[0]*dims[1]] < 0 ) {
                                	                	bits |= bit;
                                        		}
	                                        	else { ent = octEnt( x*2+1, y*2+1, z*2+1, level, depth );
							if( data[index = ent[0]+ent[1]*dims[0]+ent[2]*dims[0]*dims[1]] < 0 ) {
                                                        	bits |= bit;
                                                	}
                                                        }}}}}}}
                                        }else {
	                                        	ent = octEnt( x*2, y*2, z*2, level, depth );
                                                        newIndex = ent[0] + ent[1]*dims[0] + ent[2]*dims[0]*dims[1]; newBit = newIndex & 0x1f; newIndex >>= 5;
							if( octBits[newIndex] & newBit ) {
                                                        	bits |= 1 << (index & 0x1f);
                                                	}
	                                        	else { ent = octEnt( x*2+1, y*2, z*2, level, depth );
                                                        newIndex = ent[0] + ent[1]*dims[0] + ent[2]*dims[0]*dims[1]; newBit = newIndex & 0x1f; newIndex >>= 5;
							if( octBits[newIndex] & newBit ) {
                                                        	bits |= 1 << (index & 0x1f);
                                                	}
                	                        	else { ent = octEnt( x*2, y*2+1, z*2, level, depth );
                                                        newIndex = ent[0] + ent[1]*dims[0] + ent[2]*dims[0]*dims[1]; newBit = newIndex & 0x1f; newIndex >>= 5;
							if( octBits[newIndex] & newBit ) {
                                	                	bits |= 1 << (index & 0x1f);
                                        		}
	                                        	else { ent = octEnt( x*2+1, y*2+1, z*2, level, depth );
                                                        newIndex = ent[0] + ent[1]*dims[0] + ent[2]*dims[0]*dims[1]; newBit = newIndex & 0x1f; newIndex >>= 5;
							if( octBits[newIndex] & newBit ) {
                                                        	bits |= 1 << (index & 0x1f);
                                                	}

	                                        	else { ent = octEnt( x*2, y*2, z*2+1, level, depth );
                                                        newIndex = ent[0] + ent[1]*dims[0] + ent[2]*dims[0]*dims[1]; newBit = newIndex & 0x1f; newIndex >>= 5;
							if( octBits[newIndex] & newBit ) {
                                                        	bits |= 1 << (index & 0x1f);
                                                	}
	                                        	else { ent = octEnt( x*2+1, y*2, z*2+1, level, depth );
                                                        newIndex = ent[0] + ent[1]*dims[0] + ent[2]*dims[0]*dims[1]; newBit = newIndex & 0x1f; newIndex >>= 5;
							if( octBits[newIndex] & newBit ) {
                                                        	bits |= 1 << (index & 0x1f);
                                                	}
                	                        	else { ent = octEnt( x*2, y*2+1, z*2+1, level, depth );
                                                        newIndex = ent[0] + ent[1]*dims[0] + ent[2]*dims[0]*dims[1]; newBit = newIndex & 0x1f; newIndex >>= 5;
							if( octBits[newIndex] & newBit ) {
                                	                	bits |= 1 << (index & 0x1f);
                                        		}
	                                        	else { ent = octEnt( x*2+1, y*2+1, z*2+1, level, depth );
                                                        newIndex = ent[0] + ent[1]*dims[0] + ent[2]*dims[0]*dims[1]; newBit = newIndex & 0x1f; newIndex >>= 5;
							if( octBits[newIndex] & newBit ) {
                                                        	bits |= 1 << (index & 0x1f);
                                                	}
                                                        }}}}}}}
                                        }
                                       	level--;
                                        octBits[index>>5] = bits;
        			}
                		
        }
        
        
        
	function node() {
		this.value = 0.0;
                this.level = 0;
	        this.children = [ null,null,null,null
        	                , null,null,null,null ];
	}

	


}

const octIndex = [ [0,0,0], [1,0,0], [0,1,0], [1,1,0], [0,0,1], [1,0,1], [0,1,1], [1,1,1] ];

// indexed by [normalBits] [octant collided]
const octOrder = [ [0,1,2,4, 7,6,5,3]
		 , [1,0,3,5, 6,4,7,2]
                 , [2,3,0,6, 5,4,7,1]
                 , [3,1,2,7, 4,6,5,0]
                 , [4,6,5,0, 3,1,2,7]
                 , [5,4,7,1, 2,3,0,6]
                 , [6,4,7,2, 1,0,3,5]
                 , [7,6,5,3, 0,1,2,4]
                 ];
                 

function pointDistance( p, o, n ) {
// array of values version.
	// length( o-p  - ( o-p)dot n ) n ) 
	//
	var t = [o[0]-p[0],o[1]-p[1],o[2]-p[2] ];
	var dn = t[0]*n[0]+t[1]*n[1]+t[2]*n[2];
	n[0] *= dn;
	n[1] *= dn;
	n[2] *= dn;
	return Math.sqrt( n[0]*n[0]+n[1]*n[1]+n[2]+n[2] );
}
// three.js vector version
function pointDistanceT( p, o, n ) {
	// length( o-p  - ( o-p)dot n ) n ) 
	//
	var t = new THREE.Vector3();
	t.sub( o, p );
	var dn = t.dot(n);
	n.multiplyScalar(dn);
	return n.length();
}


function dirBits(n) {
	return ((n[0]>0)?0:1) + ((n[1]>0)?0:2) + ((n[2]>0)?0:4);
}

octeretree.prototype.raycast = function( o, n ) {
	
	var dir = dirBits(n);
        var level = 0;
        let size = octRuler( 1, depth-level );
        
        var r = checkNode( 0, 0, 0 );
        console.log( "Hit at:", r );
        return r;
        
        function checkNode(x,y,z) {
	        let base=octEnt( x, y, z, level, depth );
        
		let r = 1.414*(depth-level);
	        let d = pointDistance( base, o, n );
        	if( d < r ) {
	        	let index = base[0]+base[1]*dims[0]+base[2]*dims[1]*dims[0];
        
	        	if(octBits[index>>5] & index&0x1f) {
        			const test = octOrder[dir];
                	        level++;
                        	for( var test = 0; test < 8; test++ ) {
                                	const i = octIndex[test];
                                        let r = checkNode( x*2+i[0], y*2+i[1], z*2+i[2] );
                                        if( r ) {
                                        	//r.push( [x,y,z] );
	                                        return r<<3+test;
                                        }
                        	}
                        }
	        }
		return 0;
        }
        
}

return octeretree( data, dims );

};

