const speedOfLight = 1;

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;
var addN2 = true;
var SLERP = true;
const abs = (x)=>Math.abs(x);

// 'fixed' acos for inputs > 1
function acos(x) {
	// uncomment this line to cause failure for even 1/2 rotations(at the limit of the other side)
	// return Math.acos(x); // fails on rotations greater than 4pi.
	const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
	const plusminus = (x)=>mod( x+1,2)-1;
	const trunc = (x,y)=>x-mod(x,y);
	return Math.acos(plusminus(x)) - trunc(x+1,2)*Math.PI/2;
}

// takes an input and returns -1 to 1
// where overflow bounces wraps at the ends.
function delwrap(x) {
	if( x < 0 )
		return ( 2*( (x+1)/2 - Math.floor((x+1)/2)) -1);
	else
		return( 2*( (x+1)/2 - Math.floor((x+1)/2)) -1);
}

// takes an input and returns -1 to 1
// where overflow bounces from the ends.
function signedMod(x) {
	return 1-Math.abs(1-(x))%2;

}

const test = true;
let normalizeNormalTangent = false;
var twistDelta = 0;
// -------------------------------------------------------------------------------
//  Log Quaternion (Rotation part)
// -------------------------------------------------------------------------------

let twisting = false;

// lnQuat( 0    , {x:,y:,z:})              - angle, axis ; normalizes 
// lnQuat( theta, b, c, d );               - angle, axisX, axisY, axisZ   ; linear normalize axis, scale by angle.
// lnQuat( 0    , b, c, d );               - 0,     spinX, spinY, spinZ   ; set raw spins
// lnQuat( basis );                        - basis object with {forward:,up:,right:} vectors.
// lnQuat( {a:, b:, c:} );                 - angle-angle-angle set raw spins.
// lnQuat( {x:, y:, z: }, {x:, y:, z: } )  - set as lookAt; forward, up vectors
// lnQuat( {x:, y:, z: }, null )           - set as lookAt; forward, automatic 'up'
function lnQuat( theta, d, a, b ){
	this.w = 0; // unused, was angle of axis-angle, then was length of angles(nL)...
	this.x = 0;  // these could become wrap counters....
	this.y = 0;  // total rotation each x,y,z axis.
	this.z = 0;

	this.nx = 0;  // default normal
	this.ny = 1;  // 
	this.nz = 0;
	// temporary sign/cos/normalizers
	this.s = 0;  // sin(composite theta)
	this.qw = 1; // cos(composite theta)
	this.nL = 0; // normal Linear
	this.nR = 0; // normal Rectangular
	this.refresh = null;
	this.dirty = true; // whether update() has to do work.

	if( "undefined" !== typeof theta ) {

		if( "function" === typeof theta  ){
// what is passed is a function to call during apply
			this.refresh = theta;
			return;
		}
		if( "undefined" !== typeof a ) {
			//if( ASSERT ) if( theta) throw new Error( "Why? I mean theta is always on the unit circle; else not a unit projection..." );
			// create with 4 raw coordinates
			if( theta ) {
				const spin = (abs(d)+abs(a)+abs(b));
				if( spin ) {
					const nSpin = (theta)/spin;
					this.x = d?d*nSpin:Math.PI*2;
					this.y = a?a*nSpin:Math.PI*2;
					this.z = b?b*nSpin:Math.PI*2;
				} else {
					this.x = 0;
					this.y = 0;
					this.z = 0;
				}
			}else {
				this.x = d;
				this.y = a;
				this.z = b;
			}

		}else {
			if( "object" === typeof theta ) {
				if( "up" in theta ) {
// basis object {forward:,right:,up:}
					return this.fromBasis( theta );
				}
				if( "a" in theta ) {
// angle-angle-angle  {a:,b:,c:}
					this.x = theta.a;
					this.y = theta.b;
					this.z = theta.c;
					const l3 = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
					//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );
					if( l3 ) {
						this.nx = this.x/l3 /* * qw*/;
						this.ny = this.y/l3 /* * qw*/;
						this.nz = this.z/l3 /* * qw*/;
					}
						
					this.update();
					return;
				}
				else if( "x" in theta )
				{
					let setNormal = normalizeNormalTangent;
					if( "boolean" === typeof d ) {
						setNormal = d;
					}

					if( "object" === typeof d ) {
						if( !d ) d = { x : -theta.y, y:theta.x, z:-theta.z }; // create a 'up' for the passed forward.
					        const tmpBasis = { forward: theta, up: d, right: {x:0,y:0,z:0} };
						tmpBasis.right.x = tmpBasis.forward.y * d.z - tmpBasis.forward.z * d.y;
						tmpBasis.right.y = tmpBasis.forward.z * d.y - tmpBasis.forward.x * d.z;
						tmpBasis.right.z = tmpBasis.forward.x * d.x - tmpBasis.forward.y * d.x;
						this.fromBasis( tmpBasis );
					} else {
// x/y/z normal (no spin, based at 'north' (0,1,0) )  {x:,y:,z:}
						// normal conversion is linear.
						const l2 = (abs(theta.x)/*+abs(theta.y)*/+abs(theta.z));
						if( l2 ) {
							const l3 = Math.sqrt(theta.x*theta.x+theta.y*theta.y+theta.z*theta.z);
							//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );
					        
							const r = 1/(l2);
							const tx = theta.x * r; // linear normal
							const ty = theta.y /l3; // square normal
							const tz = theta.z * r; // linear normal
							const cosTheta = acos( ty ); // 1->-1 (angle from pole around this circle.
							this.x = tz*cosTheta;
							this.y = 0;
							this.z = -tx*cosTheta;
							this.nR = Math.sqrt(this.x*this.x+this.z*this.z);
							this.nx = this.x / this.nR;
							this.ny = 0;
							this.nz = this.z / this.nR;
							this.dirty = true;
					        
							if(setNormal) {
								const fN = 1/Math.sqrt( tz*tz+tx*tx );
					        
								const txn = tx*fN;
								const tzn = tz*fN;
					        
								const s = Math.sin( cosTheta ); // double angle substituted
								const c = 1- Math.cos( cosTheta ); // double angle substituted
					        
								// determinant coordinates
								const angle = acos( ( ty + 1 ) * ( 1 - txn ) / 2 - 1 );
					        
								// compute the axis
								const yz = s * this.nx;
								const xz = ( 2 - c * (this.nx*this.nx + this.nz*this.nz)) * tzn;
								const xy = s * this.nx * tzn  
								         + s * this.nz * (1-txn);
					        
								const tmp = 1 /Math.sqrt(yz*yz + xz*xz + xy*xy );
								this.nx = yz *tmp;
								this.ny = xz *tmp;
								this.nz = xy *tmp;
					        
								const lNorm = angle / (abs(this.nx)+abs(this.ny)+abs(this.nz));
								this.x = this.nx * lNorm;
								this.y = this.ny * lNorm;
								this.z = this.nz * lNorm;
					        
								// the remining of this is update()
								this.nL = angle;
								this.nR = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
								this.s = Math.sin( this.nL/2);
								this.qw = Math.cos( this.nL/2);
								this.dirty = false;
								/*
								// the above is this;  getBasis(up), compute new forward and cross right
								// and restore from basis.
								const trst = this.getBasis();
								const fN = 1/Math.sqrt( tz*tz+tx*tx );
	                                                        
								trst.forward.x = tz*fN;
								trst.forward.y = 0;
								trst.forward.z = -tx*fN;
								trst.right.x = (trst.up.y * trst.forward.z)-(trst.up.z * trst.forward.y );
								trst.right.y = (trst.up.z * trst.forward.x)-(trst.up.x * trst.forward.z );
								trst.right.z = (trst.up.x * trst.forward.y)-(trst.up.y * trst.forward.x );
	                                                        
								this.fromBasis( trst );
								this.update();						
								*/
							}
					        
							if(!twisting) { // nope/ still can't just 'twist' the target... have to re-resolve back to beginning
								if( twistDelta ) {
									this.update();
									twisting = true;
									yaw( this, twistDelta /*+ angle*/ );
									twisting = false;
								}
							}
						}
					}
					return;
				}
			}

// angle-axis initialization method
			const nR = 1/ Math.sqrt( d.x*(d.x) + d.y*(d.y) + d.z*(d.z) ); // make sure to normalize axis.
			// if no rotation, then nothing.
			if( abs(theta) > 0.000001 ) {
				this.x = d.x * nR;
				this.y = d.y * nR;
				this.z = d.z * nR;

				const nL = theta / (abs(this.x)+abs(this.y)+abs(this.z));
				
				this.x *= nL;
				this.y *= nL;
				this.z *= nL;

				this.update();
				return;
			}
		}
	}
}


let tzz = 0;
lnQuat.prototype.fromBasis = function( basis ) {
	// tr(M)=2cos(theta)+1 .
	const t = ( ( basis.right.x + basis.up.y + basis.forward.z ) - 1 )/2;
	console.log( "FB t is:", t, basis.right.x, basis.up.y, basis.forward.z );

	//	if( t > 1 || t < -1 )
	// 1,1,1 -1 = 2;/2 = 1
	// -1-1-1 -1 = -4 /2 = -2;
	/// okay; but a rotation matrix never gets back to the full rotation? so 0-1 is enough?  is that why evertyhing is biased?
	//  I thought it was more that sine() - 0->pi is one full positive wave... where the end is the same as the start
	//  and then pi to 2pi is all negative, so it's like the inverse of the rotation (and is only applied as an inverse? which reverses the negative limit?)
	//  So maybe it seems a lot of this is just biasing math anyway?
	let angle = acos(t);
	if( !angle ) {
		//console.log( "primary rotation is '0'", t, angle, this.nL, basis.right.x, basis.up.y, basis.forward.z );
		this.x = this.y = this.z = this.nx = this.ny = this.nz = this.nL = this.nR = 0;
		this.ny = 1; // axis normal.
		this.s = 0;
		this.qw = 1;
		this.dirty = false;
		return this;
	}
/*
	if( !this.octave ) this.octave = 1;
	if( tzz == 0 ) {
		this.bias = -this.octave * 2*Math.PI;
	}else {
		this.bias = (this.octave-1) * 2*Math.PI
	}
	//angle += this.bias
	tzz++;
	this.i = tzz;
	if( tzz >= 2 ) tzz = 0;
*/
	/*
	https://stackoverflow.com/a/12472591/4619267
	x = (R21 - R12)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
	y = (R02 - R20)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
	z = (R10 - R01)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
	*/	
	const yz = basis.up     .z - basis.forward.y;
	const xz = basis.forward.x - basis.right  .z;
	const xy = basis.right  .y - basis.up     .x;
	const tmp = 1 /Math.sqrt(yz*yz + xz*xz + xy*xy );

	this.nx = yz *tmp;
	this.ny = xz *tmp;
	this.nz = xy *tmp;
	const lNorm = angle / (abs(this.nx)+abs(this.ny)+abs(this.nz));
	this.x = this.nx * lNorm;
	this.y = this.ny * lNorm;
	this.z = this.nz * lNorm;
	//console.log( "frombasis primary values:", this.x, this.y, this.z );

	this.dirty = true;
	return this;
}

lnQuat.prototype.exp = function() {
	this.update();
	const q = this;
	const s  = this.s;
	return { w: q.qw, x:q.nx* s, y:q.ny* s, z:q.nz * s };
	console.log( "lnQuat exp() is disabled until integrated with a quaternion library." );
	return null;//new Quat( this.qw, q.x *q.x* s, q.y *q.y* s, q.z *q.z * s );
}


// return the difference in spins
lnQuat.prototype.spinDiff = function( q ) {
	return abs(this.x - q.x) + abs(this.y - q.y) + abs(this.z - q.z);
}

lnQuat.prototype.add = function( q2, t ) {
	return lnQuatAdd( this, q2, t||1 );
}
lnQuat.prototype.add2 = function( q2 ) {
	return new lnQuat( 0, this.x, this.y, this.z ).add( q2 );
}

function lnQuatSub( q, q2, s ) {
	if( "undefined" == typeof s ) s = 1;
	q.dirty = true;
	q.x = q.x - q2.x * s;
	q.y = q.y - q2.y * s;
	q.z = q.z - q2.z * s;
	return q;
}

function lnQuatAdd( q, q2, s ) {
	if( "undefined" == typeof s ) s = 1;
	q.dirty = true;
	q.x = q.x + q2.x * s;
	q.y = q.y + q2.y * s;
	q.z = q.z + q2.z * s;
	return q;
}


// returns the number of complete rotations removed; updates this to principal angle values.
lnQuat.prototype.prinicpal = function() {
	this.update();
	return new lnQuat( { a:this.x
	                   , b:this.y
	                   , c:this.z} );
}

lnQuat.prototype.getTurns =  function() {
	const q = new lnQuat();
	const r = this.nL;
	const rMod  = Math.mod( r, (2*Math.PI) );
	const rDrop = ( r - rMod ) / (2*Math.PI);
	return rDrop;
}

// this applies turns passed as if turns is a fraction of the current rate.
// this scales the rate of the turn... adding 0.1 turns adds 36 degrees.
// adding 3 turns adds 1920 degrees.
// turns is 0-1 for 0 to 100% turn.
// turns is from 0 to 1 turn; most turns should be between -0.5 and 0.5.
lnQuat.prototype.turn = function( turns ) {
	console.log( "This will have to figure out the normal, and apply turns factionally to each axis..." );
	const q = this;
	// proper would, again, to use the current values to scale how much gets inceased...
	this.x += (turns*2*Math.PI) /3;
	this.y += (turns*2*Math.PI) /3;
	this.z += (turns*2*Math.PI) /3;
	return this;
}


// this increases the rotation, by an amount in a certain direction
// by euler angles even!
// turns is from 0 to 1 turn; most turns should be between -0.5 and 0.5.
lnQuat.prototype.torque = function( direction, turns ) {
	const q = this;
	const r  = direction.r;

	const rDiv = (turns*2*Math.PI)/r;
	this.x += direction.x*rDiv;
	this.y += direction.y*rDiv;
	this.z += direction.z*rDiv;
	return this;
}


lnQuat.prototype.getBasis = function(){return this.getBasisT(1.0) };
lnQuat.prototype.getBasisT = function(del, from, right) {
	// this is terse; for more documentation see getBasis Method.
	if( false ) { // this is        https://mathworld.wolfram.com/RodriguesRotationFormula.html
		const q = this;

		const s1 = Math.sin(q.nL*del); // * 2 * 0.5
		const c1 = Math.cos(q.nL*del); // * 2 * 0.5

		// up is testForward cross lnQ.normal; this version is from raw q.
		const testUp = { x:       q.nx*q.ny*(1-c1)-q.nz*s1
		               , y:  c1+ q.ny*q.ny*(1-c1)
		               , z:  q.nx*s1 + q.ny*q.nz*(1-c1)
		};

		// up is testForward cross lnQ.normal; this version is from raw q.
		const testForward = { x:   q.ny*s1 + q.nx*q.nz*(1-c1)
		                    , y:  -q.nx*s1+ q.ny*q.nz * (1-c1)
		                    , z:  c1+q.nz*q.nz*(1-c1)
		};

		const testRight = { x:  c1 + ( 1-c1 ) * ( q.nx*q.nx ) 
		                  , y: q.nz*s1 + q.nx*q.ny*(1-c1)
		                  , z: -q.ny * s1 + q.nx*q.nz*(1-c1)
		};
		const basis = { right  :testRight
		              , up     :testUp
		              , forward:testForward
		              };
		return basis;	
	}
	if( right ) {
		// this basis is supposed to be the rotation axis, and the tangent on the 
		// rotation...., and the normal to the circle (which is not nesscarily normal to the sphere)

		// this basis is not reversable... (well, it might be)
		const q = this;

		const s1 = Math.sin(q.nL); // * 2 * 0.5
		const c1 = 1 - Math.cos(q.nL); // * 2 * 0.5

		// up is testForward cross lnQ.normal; this version is from raw q.
		const testUp = { x:          ( c1 ) * ( q.ny*q.ny*q.nz + q.nz*q.nz*q.nz + q.nx*q.nx*q.nz )  + s1 * q.ny*q.nx   - q.nz
		               , y:  - s1 * ( q.nz*q.nz + q.nx * q.nx  )
		               , z: q.nx - ( c1 ) * ( q.nx*q.nz*q.nz + q.nx*q.nx*q.nx + q.nx*q.ny*q.ny )  + s1 * q.nz*q.ny
		};

		const nRup = Math.sqrt(testUp.x*testUp.x + testUp.y*testUp.y + testUp.z*testUp.z );
		//console.log( "up cross:", nRup );

		testUp.x /= nRup;
		testUp.y /= nRup;
		testUp.z /= nRup;

		//this.update();
		if( !del ) del = 1.0;
		const nt = this.nL;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
		const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
		const c = 1- Math.cos( del * nt ); // sin/cos are the function of exp()

		const qx = q.nx; // normalizes the imaginary parts
		const qy = q.ny; // set the sin of their composite angle as their total
		const qz = q.nz; // output = 1(unit vector) * sin  in  x,y,z parts.

		const xy = c*qx*qy;  // 2*sin(t)*sin(t) * x * y / (xx+yy+zz)   1 - cos(2t)
		const yz = c*qy*qz;  // 2*sin(t)*sin(t) * y * z / (xx+yy+zz)   1 - cos(2t)
		const xz = c*qx*qz;  // 2*sin(t)*sin(t) * x * z / (xx+yy+zz)   1 - cos(2t)
 
		const wx = s*qx;     // 2*cos(t)*sin(t) * x / sqrt(xx+yy+zz)   sin(2t)
		const wy = s*qy;     // 2*cos(t)*sin(t) * y / sqrt(xx+yy+zz)   sin(2t)
		const wz = s*qz;     // 2*cos(t)*sin(t) * z / sqrt(xx+yy+zz)   sin(2t)
 
		const xx = c*qx*qx;  // 2*sin(t)*sin(t) * y * y / (xx+yy+zz)   1 - cos(2t)
		const yy = c*qy*qy;  // 2*sin(t)*sin(t) * x * x / (xx+yy+zz)   1 - cos(2t)
		const zz = c*qz*qz;  // 2*sin(t)*sin(t) * z * z / (xx+yy+zz)   1 - cos(2t)
 
		const basis = { right  :{ x : 0,  y : ( wz + xy ), z :     ( xz - wy ) }
		              , up     :{ x :     ( xy - wz ),  y : 0, z :     ( wx + yz ) }
		              , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 0 }
		              };
		
		// forward is... along the curve...
		// 
		const newForward = { x : q.nx 
		           	, y : q.ny
		           	, z : q.nz };
		//const up = 
		
		//basis.right = basis.forward;
         	basis.forward = testUp;
		// cross of up and right is forward.
		const cURx1 = newForward.z * basis.forward.y - newForward.y * basis.forward.z;
		const cURy1 = newForward.x * basis.forward.z - newForward.z * basis.forward.x;
		const cURz1 = newForward.y * basis.forward.x - newForward.x * basis.forward.y;
		const norm = Math.sqrt(cURx1*cURx1+cURy1*cURy1+cURz1*cURz1);
		basis.up = { x : cURx1/norm, y : cURy1/norm, z : cURz1/norm };
		basis.right = testUp; // temporary
		basis.forward = newForward;
		return basis;	
	} else {
		const q = this;
		//this.update();
		if( "undefined" === typeof del ) del = 1.0;
		let ax, ay, az;
		if( addN2 ) {
			ax = (from?(from.nx*from.nL):0) + q.nx*q.nL*del;	
			ay = (from?(from.ny*from.nL):0) + q.ny*q.nL*del;	
			az = (from?(from.nz*from.nL):0) + q.nz*q.nL*del;	
			
			const l_ = Math.abs(ax)+Math.abs(ay)+Math.abs(az);
			const r_ = Math.sqrt(ax*ax+ay*ay+az*az);
			// convert back from nr*angle to nl*angle
			ax *= r_/l_
			ay *= r_/l_
			az *= r_/l_
		} else {
			ax = (from?from.x:0) + (q.x*del);	
			ay = (from?from.y:0) + (q.y*del);	
			az = (from?from.z:0) + (q.z*del);	
		}
		const alen = Math.abs(ax)+Math.abs(ay)+Math.abs(az);
		const sqlen = Math.sqrt(ax*ax+ay*ay+az*az);

		const nt = alen;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
		const s  = Math.sin( nt ); // sin/cos are the function of exp()
		const c1 = Math.cos( nt ); // sin/cos are the function of exp()
		const c = 1- c1;

		const qx = sqlen?ax/sqlen:0; // normalizes the imaginary parts
		const qy = sqlen?ay/sqlen:1; // set the sin of their composite angle as their total
		const qz = sqlen?az/sqlen:0; // output = 1(unit vector) * sin  in  x,y,z parts.

		const xy = c*qx*qy;  // x * y / (xx+yy+zz) * (1 - cos(2t))
		const yz = c*qy*qz;  // y * z / (xx+yy+zz) * (1 - cos(2t))
		const xz = c*qx*qz;  // x * z / (xx+yy+zz) * (1 - cos(2t))

		const wx = s*qx;     // x / sqrt(xx+yy+zz) * sin(2t)
		const wy = s*qy;     // y / sqrt(xx+yy+zz) * sin(2t)
		const wz = s*qz;     // z / sqrt(xx+yy+zz) * sin(2t)

		const xx = c*qx*qx;  // y * y / (xx+yy+zz) * (1 - cos(2t))
		const yy = c*qy*qy;  // x * x / (xx+yy+zz) * (1 - cos(2t))
		const zz = c*qz*qz;  // z * z / (xx+yy+zz) * (1 - cos(2t))

		const basis = { right  :{ x : c1 + ( xx ),       y :      ( wz + xy ), z :      ( xz - wy ) }
		              , up     :{ x :      ( xy - wz ),  y : c1 + (yy),        z :      ( wx + yz ) }
		              , forward:{ x :      ( wy + xz ),  y :      ( yz - wx ), z : c1 + ( zz ) }
		              };
		return basis;	
	}

}

function getCayleyBasis() {
		const q = this;
		//this.update();
		if( !del ) del = 1.0;
		const nt = this.nL;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
		let s  = Math.sin( del * nt ); // sin/cos are the function of exp()
		let c = 1- Math.cos( del * nt ); // sin/cos are the function of exp()
	        const cL = sqrt( 1+q.nx*q.nx+q.ny*q.ny+q.nz*qn.z);
		const qx = q.nx/cL; // normalizes the imaginary parts
		const qy = q.ny/cL; // set the sin of their composite angle as their total
		const qz = q.nz/cL; // output = 1(unit vector) * sin  in  x,y,z parts.

		const xy = c*qx*qy;  // x * y / (xx+yy+zz) * (1 - cos(2t))
		const yz = c*qy*qz;  // y * z / (xx+yy+zz) * (1 - cos(2t))
		const xz = c*qx*qz;  // x * z / (xx+yy+zz) * (1 - cos(2t))

		const wx = s*qx;     // x / sqrt(xx+yy+zz) * sin(2t)
		const wy = s*qy;     // y / sqrt(xx+yy+zz) * sin(2t)
		const wz = s*qz;     // z / sqrt(xx+yy+zz) * sin(2t)

		const xx = c*qx*qx;  // y * y / (xx+yy+zz) * (1 - cos(2t))
		const yy = c*qy*qy;  // x * x / (xx+yy+zz) * (1 - cos(2t))
		const zz = c*qz*qz;  // z * z / (xx+yy+zz) * (1 - cos(2t))

		const basis = {
			right(t) {
				s = Math.sin( t*q.nL );
				c = 1 - Math.cos( t*q.nL );
				return { x : 1 - ( yy() + zz() - xx() ),  y :     ( wz() + xy() ), z :     ( xz() - wy() ) };
			},
			up(t) {
				s = Math.sin( t*q.nL );
				c = 1 - Math.cos( t*q.nL );
				return { x :     ( xy() - wz() ),  y : 1 - ( zz() + xx() - yy() ), z :     ( wx() + yz() ) };
			},
			forward(t) {
				s = Math.sin( t*q.nL );
				c = 1 - Math.cos( t*q.nL );
				return { x :     ( wy() + xz() ),  y :     ( yz() - wx() ), z : 1 - ( xx() + yy() - zz() ) };
			},
		}
		return basis;
}


lnQuat.prototype.getRelativeBasis = function( q2 ) {
	const q = this;
	const r = new lnQuat( 0, this.x, this.y, this.z );
	const dq = lnSubQuat( q2 );
	return getBasis( dq );
}

lnQuat.prototype.update = function() {
	// sqrt, 3 mul 2 add 1 div 1 sin 1 cos
	if( !this.dirty ) return this;
	this.dirty = false;


	// norm-rect
	this.nR = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);

	// norm-linear    this is / 3 usually, but the sine lookup would
	//    adds a /3 back in which reverses it.
	this.nL = (abs(this.x)+abs(this.y)+abs(this.z));///(2*Math.PI); // average of total
	if( this.nR && this.nL ){
		this.nx = this.x/this.nR /* * this.nL*/;
		this.ny = this.y/this.nR /* * this.nL*/;
		this.nz = this.z/this.nR /* * this.nL*/;
	}else {
		this.nx = 0;
		this.ny = 1;
		this.nz = 0;
	}
	this.s  = Math.sin(this.nL/2); // only want one half wave...  0-pi total.
	this.qw = Math.cos(this.nL/2);

	return this;
}

lnQuat.prototype.getFrame = function( t, x, y, z ) {
	const lnQrot = new lnQuat( 0, x, y, z );
	const lnQcomposite = this.apply( lnQrot );
	return lnQcomposite.getBasisT( t );
}

// this returns functions which result in vectors that update
// as the current 
lnQuat.prototype.getFrameFunctions = function( lnQvel ) {
	const q = this.apply( lnQvel );

	let s  = Math.sin( q.nL ); // sin/cos are the function of exp()
	let c = 1- Math.cos( q.nL ); // sin/cos are the function of exp()

	const xy = ()=>c*q.nx*q.ny;  // 2*sin(t)*sin(t) * x * y / (xx+yy+zz)   1 - cos(2t)
	const yz = ()=>c*q.ny*q.nz;  // 2*sin(t)*sin(t) * y * z / (xx+yy+zz)   1 - cos(2t)
	const xz = ()=>c*q.nx*q.nz;  // 2*sin(t)*sin(t) * x * z / (xx+yy+zz)   1 - cos(2t)

	const wx = ()=>s*q.nx;     // 2*cos(t)*sin(t) * x / sqrt(xx+yy+zz)   sin(2t)
	const wy = ()=>s*q.ny;     // 2*cos(t)*sin(t) * y / sqrt(xx+yy+zz)   sin(2t)
	const wz = ()=>s*q.nz;     // 2*cos(t)*sin(t) * z / sqrt(xx+yy+zz)   sin(2t)

	const xx = ()=>c*q.nx*q.nx;  // 2*sin(t)*sin(t) * y * y / (xx+yy+zz)   1 - cos(2t)
	const yy = ()=>c*q.ny*q.ny;  // 2*sin(t)*sin(t) * x * x / (xx+yy+zz)   1 - cos(2t)
	const zz = ()=>c*q.nz*q.nz;  // 2*sin(t)*sin(t) * z * z / (xx+yy+zz)   1 - cos(2t)

	return {
		forward(t) {
			s = Math.sin( t*q.nL );
			c = 1 - Math.cos( t*q.nL );
			return { x :     ( wy() + xz() ),  y :     ( yz() - wx() ), z : 1 - ( xx() + yy() ) };
		},
		right(t) {
			s = Math.sin( t*q.nL );
			c = 1 - Math.cos( t*q.nL );
			return { x : 1 - ( yy() + zz() ),  y :     ( wz() + xy() ), z :     ( xz() - wy() ) };
		},
		up(t) {
			s = Math.sin( t*q.nL );
			c = 1 - Math.cos( t*q.nL );
			return { x :     ( xy() - wz() ),  y : 1 - ( zz() + xx() ), z :     ( wx() + yz() ) };
		}
	}
}


// https://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/
// 
lnQuat.prototype.apply = function( v ) {
	//return this.applyDel( v, 1.0 );
	if( v instanceof lnQuat ) {
		const result = new lnQuat(
			function() {
	                        return finishRodrigues( v, 0, this.nx, this.ny, this.nz, this.nL );
			}
		);
		return result.refresh();
	}

	const q = this;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !q.nL ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	} else {
		const nst = q.s; // normal * sin_theta
		const qw = q.qw;  //Math.cos( pl );   quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]

		const qx = q.nx*nst;
		const qy = q.ny*nst;
		const qz = q.nz*nst;

		//p = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w  v.dot(v))
		const tx = 2 * (qy * v.z - qz * v.y); // v.cross(p)*w*2
		const ty = 2 * (qz * v.x - qx * v.z);
		const tz = 2 * (qx * v.y - qy * v.x);
		return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		       , y : v.y + qw * ty + ( qz * tx - tz * qx )
		       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };
	} 
}

//-------------------------------------------

lnQuat.prototype.applyDel = function( v, del, q2, del2 ) {
	if( v instanceof lnQuat ) {
		const result = new lnQuat(
			function() {
				const q = v;
				const ax = q.nx;
				const ay = q.ny;
				const az = q.nz;
	                        return finishRodrigues( q, 0, ax, ay, az, q.nL*del );
			}
		);
		return result.refresh();
	}
	const q = this;
	if( 'undefined' === typeof del ) del = 1.0;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !(q.nL*del) && !q2 ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	} else  {
		if( q2 ) {

			let ax = 0;
			let ay = 0;
			let az = 0;
/*************** 
 * Okay; look, I made short attempt at slerp... it requires going to a quaternion...
   ||Q||_2 * sin(||Q||_1) and then using the cos slerp to get the angle and divide back out
   by the sin( ||Q2||_1 + ||Q1||_2 *del )
#*/
			if( SLERP ) {
				const dot =  this.nx * q2.nx 
				            + this.ny * q2.ny 
				            + this.nz * q2.nz 
					;
				const angle = Math.acos( dot );
				if( Math.abs(angle) < 0.0001 ){
					if( addN2) {
						ax = this.nx*this.nL * del + q2.nx*q2.nL * del2;
						ay = this.ny*this.nL * del + q2.ny*q2.nL * del2;
						az = this.nz*this.nL * del + q2.nz*q2.nL * del2;
					} else {
						ax = this.x * del + q2.x * del2;
						ay = this.y * del + q2.y * del2;
						az = this.z * del + q2.z * del2;
					}
					
				} else {
					const sa = Math.sin(angle);
					const sa1 = Math.sin((1-del)*angle);
					const sa2 = Math.sin(del*angle);
				
					if( addN2) {
						ax = (q2.x+this.nx*this.nL) * sa2/sa + (q2.nx*q2.nL) * sa1/sa;
						ay = (q2.y+this.ny*this.nL) * sa2/sa + (q2.ny*q2.nL) * sa1/sa;
						az = (q2.z+this.nz*this.nL) * sa2/sa + (q2.nz*q2.nL) * sa1/sa;
					} else {
						ax = (q2.x+this.x) * sa2/sa + q2.x * sa1/sa;
						ay = (q2.y+this.y) * sa2/sa + q2.y * sa1/sa;
						az = (q2.z+this.z) * sa2/sa + q2.z * sa1/sa;
					}
				}

/*			
				const sin_q = sin(this.nL/2);
				const sin_q2 = sin(q2.nL/2);

				const cos_q = sin(this.nL/2);
				const cos_q2 = sin(q2.nL/2);

				if( Math.abs(dot > 0.9995 ) )
				{
					const angle_del = q2.nL + q.nL*del;
					
					ax = q2.nx * sin_q2 + del * ( this.nx * sin_q );
					ay = q2.ny * sin_q2 + del * ( this.ny * sin_q );
					az = q2.nz * sin_q2 + del * ( this.nz * sin_q );
					
				}else {
					const theta_0 = Math.acos(dot);
					const theta = theta_0 * del;
					const st = sin(theta);
					const st_0 = sin(theta_0);
					const s0 = cos(theta) - dot* st/st_0;
					const s1 = st/st_0;
				
					ax = s0 * this.nx * sin_q + s1 * q2.nx * sin_q2
					ay = s0 * this.ny * sin_q + s1 * q2.ny * sin_q2
					az = s0 * this.nz * sin_q + s1 * q2.nz * sin_q2
					
				}

				ax /= Math.sin( q2.nL + q.nL *del ) * angle_del;
				ay /= Math.sin( q2.nL + q.nL *del ) * angle_del;
				az /= Math.sin( q2.nL + q.nL *del ) * angle_del;
*/
			}
			else 
//****************************************/

			{
				if( addN2) {
					// ax === ( this.x / this.nR ) * this.nL   .... and     this.nx === this.x / this.nR
					ax = this.nx*this.nL * del + q2.nx*q2.nL * del2;
					ay = this.ny*this.nL * del + q2.ny*q2.nL * del2;
					az = this.nz*this.nL * del + q2.nz*q2.nL * del2;
					const l_ = Math.abs(ax)+Math.abs(ay)+Math.abs(az);
					const r_ = Math.sqrt(ax*ax+ay*ay+az*az);
					if( addN2 ) {
						// convert back from nr*angle to nl*angle
						ax *= r_/l_
						ay *= r_/l_
						az *= r_/l_
					}
				} else {
					// this.x === ( this.x / this.nL ) * this.nL
					ax = this.x * del + q2.x * del2;
					ay = this.y * del + q2.y * del2;
					az = this.z * del + q2.z * del2;
				}
			}

			const l = Math.abs(ax)+Math.abs(ay)+Math.abs(az);
			const r = Math.sqrt(ax*ax+ay*ay+az*az);

			if( !l ) {
				return {x:v.x, y:v.y, z:v.z }; // 1.0
			}
			const s  = Math.sin( (l)/2 );//q.s;
			const nst = r?s/r:1; // sin(theta)/r    normal * sin_theta
			const qw = Math.cos( (l)/2 );  // quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]
		        
			const qx = l?ax*nst:q2?q2.nx:0;
			const qy = l?ay*nst:q2?q2.ny:1;
			const qz = l?az*nst:q2?q2.nz:0;
		        
			const tx = 2 * (qy * v.z - qz * v.y);
			const ty = 2 * (qz * v.x - qx * v.z);
			const tz = 2 * (qx * v.y - qy * v.x);
			return { x : v.x + qw * tx + ( qy * tz - ty * qz )
			       , y : v.y + qw * ty + ( qz * tx - tz * qx )
			       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };			
		}

		if( addN2) {
			// ax === ( this.x / this.nR ) * this.nL   .... and     this.nx === this.x / this.nR
			ax = this.nx*this.nL * del;
			ay = this.ny*this.nL * del;
			az = this.nz*this.nL * del;
		} else {
			// this.x === ( this.x / this.nL ) * this.nL
			ax = this.x * del;
			ay = this.y * del;
			az = this.z * del;
		}
		const l = Math.abs(ax)+Math.abs(ay)+Math.abs(az);
		if( !l ) {
			return { x:v.x, y:v.y, z:v.z }
		}
		const r = Math.sqrt(ax*ax+ay*ay+az*az);
		const s  = Math.sin( (l)*del/2 );//q.s;
		const nst = s/r; // sin(theta)/r    normal * sin_theta
		const qw = Math.cos( (l)*del/2 );  // quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]

		const qx = q.x*nst;
		const qy = q.y*nst;
		const qz = q.z*nst;

		const tx = 2 * (qy * v.z - qz * v.y);
		const ty = 2 * (qz * v.x - qx * v.z);
		const tz = 2 * (qx * v.y - qy * v.x);
		return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		       , y : v.y + qw * ty + ( qz * tx - tz * qx )
		       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };
		//    3 registers (temp variables, caculated with sin/cos/sqrt,...)
		// 18+12 (30)   12(2)+(3) (17 parallel)
	}

	// total 
	// 21 mul + 9 add  (+ some; not updated)
}

lnQuat.prototype.applyInv = function( v ) {
	//x y z w l
	const q = this;
        if( !q.nL ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	const s  = q.s;
	const qw = q.qw;
	
	const dqw = s/q.nR; // sin(theta)/r

	const qx = -q.x * dqw;
	const qy = -q.y * dqw;
	const qz = -q.z * dqw;

	const tx = 2 * (qy * v.z - qz * v.y);
	const ty = 2 * (qz * v.x - qx * v.z);
	const tz = 2 * (qx * v.y - qy * v.x);

	return { x : v.x + qw * tx + ( qy * tz - ty * qz )
	       , y : v.y + qw * ty + ( qz * tx - tz * qx )
	       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };
	// total 
	// 21 mul + 9 add
}

// q= quaternion to rotate; oct = octive to result with; ac/as cos/sin(rotation) ax/ay/az (normalized axis of rotation)
function finishRodrigues( q, oct, ax, ay, az, th ) {
	// A dot B   = cos( angle A->B )
	// cos( C/2 ) 
	// this is also spherical cosines... cos(c)=cos(a)*cos(b)+sin(a)sin(b) cos(C)
	// or this is also spherical cosines... -cos(C) = cos(A)*cos(B)-sin(A)sin(B) cos(c)
	//const angleMax = ( q.nL + Math.abs(th) );
	const angleNorm = 1;//(angleMax>2*Math.PI)?( Math.PI / angleMax):1;
	if( angleNorm !== 1 )
		console.log( "Scalar:", angleMax, angleNorm, th*angleNorm, q.nL*angleNorm );
	const as = Math.sin( th*angleNorm/2);
	const ac = Math.cos( th*angleNorm/2);
	const qw = Math.cos( q.nL*angleNorm/2);
	const qs = Math.sin( q.nL*angleNorm/2);
	const sc1 = as * qw;
	const sc2 = qs * ac;
	const ss = qs * as;
	const cc = qw * ac;
	const AdotB = (q.nx*ax + q.ny*ay + q.nz*az);
	const cosCo2 = cc - ss* AdotB;

	let ang = acos( cosCo2 )*2 + ((oct|0)) * (Math.PI*4);
	// only good for rotations between 0 and pi.

	if( ang ) {      // as bc     bs ac       as bs
			// vector rotation is just...
			// when atheta is small, aaxis is small pi/2 cos is 0 so this is small
			// when btheta is small, baxis is small pi/2 cos is 0 so this is small
			// when both are large, cross product is dominant (pi/2)
			
		const Cx = sc1 * ax + sc2 * q.nx + ss*(ay*q.nz-az*q.ny);
		const Cy = sc1 * ay + sc2 * q.ny + ss*(az*q.nx-ax*q.nz);
		const Cz = sc1 * az + sc2 * q.nz + ss*(ax*q.ny-ay*q.nx);
		const sAng = Math.sin(ang/2);
	
		const Clx = (sAng)*(Math.abs(Cx/sAng)+Math.abs(Cy/sAng)+Math.abs(Cz/sAng));
		/*
		if( angleNorm !== 1 )
			console.log( "ANGLE TO BE", ang*2, 2*ang/angleNorm );
		*/
		//ang = 2*ang/angleNorm;
		
		q.nL = ang;
		q.nR = sAng/Clx*ang;
		q.qw = cosCo2;
		q.s = sAng;
		q.nx = Cx/sAng;
		q.ny = Cy/sAng;
		q.nz = Cz/sAng;
	
		q.x = Cx/Clx*ang;
		q.y = Cy/Clx*ang;
		q.z = Cz/Clx*ang;

		q.dirty = false;
	} else {
		// two axles are coincident, add...
		if( AdotB > 0 ) {
			q.x = q.x / q.nL * (q.nL+th);
			q.y = q.y / q.nL * (q.nL+th);
			q.z = q.z / q.nL * (q.nL+th);
		}else {
			q.x = q.x / q.nL * (q.nL-th);
			q.y = q.y / q.nL * (q.nL-th);
			q.z = q.z / q.nL * (q.nL-th);
		}
		q.dirty = true;
	}
	return q;
}


lnQuat.prototype.spin = function(th,axis,oct){
	// input angle...
	if( "undefined" === typeof oct ) oct = 4;
	const C = this;

	const q = C;

	// ax, ay, az could be given; these are computed as the source quaternion normal
	const ax_ = axis.x;
	const ay_ = axis.y;
	const az_ = axis.z;
	// make sure it's normalized
	const aLen = Math.sqrt(ax_*ax_ + ay_*ay_ + az_*az_);

	//-------- apply rotation to the axle... (put axle in this basis)
	const nst = q.s; // normal * sin_theta
	const qw = q.qw;  //Math.cos( pl );   quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]
	
	const qx = C.nx*nst;
	const qy = C.ny*nst;
	const qz = C.nz*nst;
	
	//p = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w  v.dot(v))
	const tx = 2 * (qy * az_ - qz * ay_); // v.cross(p)*w*2
	const ty = 2 * (qz * ax_ - qx * az_);
	const tz = 2 * (qx * ay_ - qy * ax_);
	const ax = ax_ + qw * tx + ( qy * tz - ty * qz )
	const ay = ay_ + qw * ty + ( qz * tx - tz * qx )
	const az = az_ + qw * tz + ( qx * ty - tx * qy );

	return finishRodrigues( C, oct-4, ax, ay, az, th );
}

lnQuat.prototype.freeSpin = function(th,axis){
	const C = this;
	const q = C;

	const ax_ = axis.x;
	const ay_ = axis.y;
	const az_ = axis.z;
	// make sure it's normalized
	const aLen = Math.sqrt(ax_*ax_ + ay_*ay_ + az_*az_);
	if( aLen ) {
		const ax = ax_/aLen;
		const ay = ay_/aLen;
		const az = az_/aLen;

		return finishRodrigues( C, 0, ax, ay, az, th );
	}
	return this;
}

lnQuat.prototype.twist = function(c){
	return yaw( this, c );
}
lnQuat.prototype.pitch = function(c){
	return pitch( this, c );
}
lnQuat.prototype.yaw = function(c){
	return yaw( this, c );
}
lnQuat.prototype.roll = function(c){
	return roll( this, c );
}


function pitch( q, th ) {
	const s  = Math.sin( q.nL ); // sin/cos are the function of exp()
	const c1 = Math.cos( q.nL ); // sin/cos are the function of exp()
	const c = 1- c1;

	const ax = c1 + c*( q.nx*q.nx );
	const ay = ( s*q.nz    + c*q.nx*q.ny );
	const az = ( c*q.nx*q.nz - s*q.ny );
	return finishRodrigues( q, 0, ax, ay, az, th );
}

function roll( q, th ) {
	// input angle...
	const s  = Math.sin( q.nL ); // sin/cos are the function of exp()
	const c1 = Math.cos( q.nL ); // sin/cos are the function of exp()
	const c = 1- c1;

	const ax = ( s*q.ny      + c*q.nx*q.nz );
	const ay = ( c*q.ny*q.nz   - s*q.nx );
	const az = c1 + c*( q.nz*q.nz );

	return finishRodrigues( q, 0, ax, ay, az, th );
}

function yaw( q, th ) {
	// input angle...
	const s = Math.sin( q.nL ); // double angle sin
	const c1 = Math.cos( q.nL ); // sin/cos are the function of exp()
	const c = 1- c1;

	const ax = ( c*q.nx*q.ny - s*q.nz );
	const ay = c1 + c*( q.ny*q.ny );
	const az = ( s*q.nx      + c*q.ny*q.nz );

	return finishRodrigues( q, 0, ax, ay, az, th );
}

// rotate the passed vector 'from' this space
lnQuat.prototype.sub2 = function( q ) {
	const qRes = new lnQuat(this.w, this.x, this.y, this.z).addConj( q );
	return qRes;//.update();
}

lnQuat.prototype.addConj = function( q ) {
	//this.w += q.w;
	this.x -= q.x;
	this.y -= q.y;
	this.z -= q.z;
	this.dirty = true;
	return this;//.update();
}

class EulerRotor {
	x = new lnQuat(0,0,0,0);
	y = new lnQuat(0,0,0,0);
	z = new lnQuat(0,0,0,0);
	//t = new lnQuat();

	/*
	const t2 = new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.nL, lnQ1 );
	const t3 = new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2.nL, t2 );
	const t4 = new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3.nL, t3 );
	const t5 = new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4.nL, t4 );
	*/
	
	constructor(x_,y_,z_) {
		this.x.x = x_;
		this.x.dirty = true;
		this.y.y = y_;
		this.y.dirty = true;
		this.z.z = z_;
		this.z.dirty = true;
	}
	update() {
		this.x.update();
		this.y.update();
		this.z.update();
		return this;
	}
	applyDel( v, del, v2, del2 ) {
		//const a = x.
		return v;
	}
	get lnQuat() {
		this.y.update(); this.z.update();
		const t = this.x.freeSpin( this.y.nL, this.y );
		t.freeSpin( this.z.nL, this.z );
		return t;
	}
	get x() {
		return this.x.x;
	}		
	get nx() {
		return this.x.nx;
	}		
	get y() {
		return this.y.y;
	}		
	get ny() {
		return this.y.ny;
	}		
	get z() {
		return this.z.z;
	}		
	get nz() {
		return this.z.nz;
	}
	set x(v) {
		this.x.x = v;
		this.x.dirty = true;
	}		
	set y(v) {
		this.y.y = v;
		this.y.dirty = true;
	}		
	set z(v) {
		this.z.z = v;
		this.z.dirty = true;
	}
	freeSpin(th,v){
		const a = this.x.freeSpin( th, v );
		const b = this.y.freeSpin( th, v );
		const c = this.z.freeSpin( th, v );
		
		return c;
	}		

	getBasisT(T){
		return new lnQuat( 0, this.x.x, this.y.y, this.z.z ).update().getBasisT(T);
	}		

	apply(v){
		if( v instanceof EulerRotor ) {

			const t2 = this.x.update();
			const t3 = this.y.update().freeSpin( t2.nL, t2 );
			const t4 = this.z.update().freeSpin( t3.nL, t3 );

			return t4;	

			const z = this.lnQuat.update();
			const a = this.x.freeSpin( this.z.nL/2, this.z );
			const b = this.y.freeSpin( a.nL/2, a );
			const c = this.z.freeSpin( b.nL/2, b );
			return new EulerRotor( c.x, c.y, c.z );
		}
						
		const a = this.x.apply( v );
		const b = this.y.apply( a );
		const c = this.z.apply( b );
		return c;
	}		
}


// -------------------------------------------------------------------------------
//  Testing Apparatii
// -------------------------------------------------------------------------------


if( ("undefined" == typeof window ) && test )       {

	if( test2() )
		test1();

	function test2() {
		return false; // claim fail, to stop test chain.
	}
	
	function test1() {
	         /*
		  * please update to compare vs an 'official' quaternion implementation.
		console.log( "Normal x,y,z:", new Quat( 1, { x:1, y:1, z:1 } ) );
		console.log( "lNormal x,y,z:", new lnQuat( 1, { x:1, y:1, z:1 } ).exp() );

		console.log( "Normal x:", new Quat( 1, { x:1, y:0, z:0 } ).log() );
		console.log( "Normal y:", new Quat( 1, { x:0, y:1, z:0 } ).log() );
		console.log( "Normal z:", new Quat( 1, { x:0, y:0, z:1 } ).log() );
		console.log( "Normal (5,2,0):", new Quat( { x:5, y:2, z:0 } ).log() );
		console.log( "Normal (5,2,0):", new lnQuat( { x:5, y:2, z:0 } ) );
		const Q_n1 = new Quat( { x:5, y:2, z:1 } );
		const p1 = Q_n1.apply( {x:0,y:1,z:0} );
		console.log( "Normal (5,2,1):", Q_n1.log(), Q_n1.apply( {x:0,y:1,z:0} ), {x:p1.x*5,y:p1.y*5,z:p1.z*5} ) ;

		console.log( "Normal1 (5,2,1):", lnQ_n1, lnQ_n1.apply( {x:0,y:1,z:0} ) );
		console.log( "Normal2 (5,2,1):", lnQ_n2, lnQ_n2.apply( {x:0,y:1,z:0} ), lnQ_n2.apply( {x:0,y:0,z:1} ) );
		const stmpz = lnQ_n3.apply( {x:0,y:1,z:0} );
		stmpz.x *= 5.2;
		stmpz.y *= 5.2;
		stmpz.z *= 5.2;

		console.log( "Normal3 (5,2,1):", lnQ_n3, lnQ_n3.apply( {x:0,y:1,z:0} ), lnQ_n3.apply( {x:0,y:0,z:1} ), stmpz );

		console.log( "Basis 1 (5,2,1):", lnQ_n1.getBasis() );
		console.log( "Basis 2 (5,2,1):", lnQ_n2.getBasis() );

		// just two rotations in a non zero direction
		const q1 = new Quat( 30/ 180 * Math.PI, {x:0.5773, y:0.57735026919, z:0.57735026919 } );
		const q2 = new Quat( 17/ 180 * Math.PI, {x:0.5773, y:0.57735026919, z:0.57735026919 } );

		//const q1 = new Quat( 0, {x:1, y:0, z:0 } );
		//const q2 = new Quat( 90/ 180 * Math.PI, {x:0, y:1, z:0 } );

		const rlnq1 = new lnQuat( 30/ 180 * Math.PI, {x:0.5773, y:0.57735026919, z:0.57735026919 } );
		const rlnq2 = new lnQuat( 17/ 180 * Math.PI, {x:0.5773, y:0.57735026919, z:0.57735026919 } );
		//const rlnq1 = new lnQuat( 0, {x:1, y:0, z:0 } );
	//	const rlnq2 = new lnQuat( 90/ 180 * Math.PI, {x:0, y:1, z:0 } );

		const lnq1 = q1.log();
		const lnq2 = q2.log();
		console.log( "q1:", JSON.stringify( q1 ), "q2:", JSON.stringify( q2  ));
		console.log( "lnq1:", JSON.stringify( lnq1 ), "lnq2:", JSON.stringify( lnq2  ));
		console.log( "rlnq1:", JSON.stringify( rlnq1 ), "rlnq2:", JSON.stringify( rlnq2  ));
		const q1q2a = q1.mul( q2 );
		const q1q2b = q1.mulLong( q2 );
		console.log( "a:", JSON.stringify( q1q2a ), "b:", JSON.stringify( q1q2b  ));

		const v = { x:2, y:5, z:-3};

		console.log( "q1 v : ", JSON.stringify( q1.apply(v) ) );	
		console.log( "q2 v : ", JSON.stringify( q2.apply(v) ) );	
		console.log( "lnq1 exp v : ", JSON.stringify( rlnq1.exp().apply(v) ) );	
		console.log( "lnq2 exp v : ", JSON.stringify( rlnq2.exp().apply(v) ) );	
		console.log( "lnq1 v : ", JSON.stringify( rlnq1.apply(v) ) );	
		console.log( "lnq2 v : ", JSON.stringify( rlnq2.apply(v) ) );	

		const lnq1q2 = rlnq1.addNew( rlnq2 ); // changes 
		console.log( "q1q2 v", JSON.stringify( q1q2a.apply( v ) ) );

		console.log( "lnq1q2 v", JSON.stringify( lnq1q2.apply( v ) ) );
		
		console.log( "  q1 basis?", q1.getBasis() );
		console.log( "  q2 basis?", q2.getBasis() );
		console.log( " lq1 basis?", lnq1.getBasis() );
		console.log( " lq2 basis?", lnq2.getBasis()  );
		console.log( "rlq1 basis?", rlnq1.getBasis() );
		console.log( "rlq2 basis?", rlnq2.getBasis() );
		console.log( "lq1q2 basis?", lnq1q2.getBasis()  );
		*/ 
	}
}

// -------------------------------------------------------------------------------
//  Quaternion (Rotation part)
// -------------------------------------------------------------------------------
//   x y z w -> i j k R

// multiply the long way; take the logs, add them and reverse the exp().
// validation that P*Q = exp(P.log()+Q.log())
/*
  // Quat class no longer exists... this is for later implementation with a standard quat library.
Quat.prototype.mulLong = function( q ) {
	const lnThis = this.log();
	const lnQ = q.log();
	lnThis.add( lnQ );
	const r = lnThis.exp();
	return r;
}

*/

lnQuat.quatToLogQuat = quatToLogQuat;

// Accept any generalized quaternion {w,x,y,z}
function quatToLogQuat( q ) {
	const w = q.w;
	const r = Math.sqrt(q.x*q.x+q.y*q.y+q.z*q.z);
	if( ASSERT )
	{
		// just a warning.
		if( Math.abs( 1.0 - r ) > 0.001 ) console.log( "Input quat was denormalized", l );
	}
	const bal = Math.sqrt( w*w + r*r );
	
	const ang = acos(w/bal)*2;
	const s = bal*Math.sin(ang/2);
	if( !s ) {
		if( r )
			return new lnQuat( 0, q.x/r, yt/r, zt/r ).update();	
		else
			return new lnQuat( 0, 0, 1, 0 ).update();	
	}
	return new lnQuat( ang, q.x/s, q.y/s, q.z/s ).update();
}
                      
//module.exports = exports = lnQuat
