const speedOfLight = 1;

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;
var SLERP = false;
var SLERPbasis = false;
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

const test = true;
let normalizeNormalTangent = false;
var twistDelta = 0;
// -------------------------------------------------------------------------------
//  Log Quaternion (Rotation part)
// -------------------------------------------------------------------------------

// lnQuat( 0    , {x:,y:,z:})              - angle, axis ; normalizes 
// lnQuat( theta, b, c, d );               - angle, axisX, axisY, axisZ   ; linear normalize axis, scale by angle.
// lnQuat( 0    , b, c, d );               - 0,     spinX, spinY, spinZ   ; set raw spins
// lnQuat( basis );                        - basis object with {forward:,up:,right:} vectors.
// lnQuat( {a:, b:, c:} );                 - angle-angle-angle set raw spins.
// lnQuat( {x:, y:, z: }, {x:, y:, z: } )  - set as lookAt; forward, up vectors
// lnQuat( {x:, y:, z: }, null )           - set as lookAt; forward, automatic 'up'
function lnQuat( theta, d, a, b ){
	this.w = 0; // unused, was angle of axis-angle, then was length of angles(n)...
	this.x = 0;  // these could become wrap counters....
	this.y = 0;  // total rotation each x,y,z axis.
	this.z = 0;

	this.nx = 0;  // default normal
	this.ny = 1;  // 
	this.nz = 0;
	// temporary sign/cos/normalizers
	this.s = 0;  // sin(composite theta)
	this.qw = 1; // cos(composite theta)
	this.θ = 0; // length
	this.refresh = null;
	this.dirty = true; // whether update() has to do work.

	if( "undefined" !== typeof theta ) {

		if( "function" === typeof theta  ){
// what is passed is a function to call during apply
			this.refresh = theta;
			return;
		}
		if( theta instanceof lnQuat ) {
// clone an existing lnQuat
			this.x = theta.x;
			this.y = theta.y;
			this.z = theta.z;
			this.nx = theta.nx;
			this.ny = theta.ny;
			this.nz = theta.nz;
			this.θ = theta.θ;
			this.s = theta.s;
			this.qw = theta.qw;
			this.dirty = theta.dirty;
			return;
		}
		if( "undefined" !== typeof a ) {
			//if( ASSERT ) if( theta) throw new Error( "Why? I mean theta is always on the unit circle; else not a unit projection..." );
			// create with 4 raw coordinates
			if( theta ) {
				throw new Error( "CHECK INITIALIZER" );
				const spin = (abs(d)+abs(a)+abs(b));
				if( spin ) {
					const nSpin = (theta)/spin;
					this.x = d*nSpin;
					this.y = a*nSpin;
					this.z = b*nSpin;
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
					const l1 = Math.abs(theta.b)+Math.abs(theta.b)+Math.abs(theta.c);
					const l3 = Math.sqrt(theta.a*theta.a+theta.b*theta.b+theta.c*theta.c);
					if( l3 > 0.000001 ) {
						this.x = theta.a * l1 / l3;
						this.y = theta.b * l1 / l3;
						this.z = theta.c * l1 / l3;
					}
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
						const l2 = (Math.abs(theta.x)/*+abs(theta.y)*/+Math.abs(theta.z));
						if( l2 ) {
							const l3 = Math.sqrt(theta.x*theta.x+theta.y*theta.y+theta.z*theta.z);
							//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );
					        
							const ty = theta.y /l3; // square normal
							const cosTheta = acos( ty ); // 1->-1 (angle from pole around this circle.
							const norm1 = Math.sqrt(theta.x*theta.x+theta.z*theta.z);
							// get square normal...
							this.nx = theta.z/norm1;
							this.ny = 0;
							this.nz = -theta.x/norm1;

							this.θ = cosTheta;							
							this.x = this.nx*cosTheta;
							this.z = this.nz*cosTheta;
							

							if(setNormal) {
								//const fN = 1/Math.sqrt( tz*tz+tx*tx );
					        
								const txn = -this.nz;
								const tzn = this.nx;
					        
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
					        
								const lNorm = angle;
								this.x = this.nx * lNorm;
								this.y = this.ny * lNorm;
								this.z = this.nz * lNorm;
					        
								// the remining of this is update()
								this.θ = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
								this.s = Math.sin( this.θ/2);
								this.qw = Math.cos( this.θ/2);
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
					        
							if( twistDelta ) {
								yaw( this, twistDelta /*+ angle*/ );
							}
						}
					}
					return;
				}
			}

// angle-axis initialization method
			const θ = theta/ Math.sqrt( d.x*(d.x) + d.y*(d.y) + d.z*(d.z) ); // make sure to normalize axis.
			// if no rotation, then nothing.
			if( abs(theta) > 0.000001 ) {
				this.x = d.x * θ;
				this.y = d.y * θ;
				this.z = d.z * θ;
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
		//console.log( "primary rotation is '0'", t, angle, this.θ, basis.right.x, basis.up.y, basis.forward.z );
		this.x = this.y = this.z = this.nx = this.ny = this.nz = this.θ = 0;
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
	const lNorm = angle;// / (abs(this.nx)+abs(this.ny)+abs(this.nz));
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
lnQuat.prototype.add2 = function( q2, t ) {
	return new lnQuat( 0, this.x, this.y, this.z ).add( q2, t );
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
	const r = this.θ;
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
	const q = this;
	//this.update();
	if( "undefined" === typeof del ) del = 1.0;
	let ax, ay, az;
	if( SLERPbasis ) {
		if( from ) {
			const target = {x:this.x+from.x, y:this.y+from.y, z:this.z+from.z };
			const targetLen = Math.sqrt( target.x*target.x + target.y*target.y + target.z*target.z );
			const targetAng = targetLen;//Math.abs( target.x )+Math.abs( target.y )+Math.abs( target.z );
			
		        
			const r = longslerp( from, {nx:target.x/targetLen, ny:target.y/targetLen, nz:target.z/targetLen, θ:targetAng  }, del );
			ax = r.x;
			ay = r.y;
			az = r.z;
		} else {
			const r = longslerp( {nx:0,ny:0,nz:0, θ:0}, this, del );
			ax = r.x;
			ay = r.y;
			az = r.z;
		}
	} else {
		ax = (from?from.x:0) + (q.x*del);
		ay = (from?from.y:0) + (q.y*del);
		az = (from?from.z:0) + (q.z*del);
	}
	const sqlen = Math.sqrt(ax*ax+ay*ay+az*az);

	const nt = sqlen;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	const s  = Math.sin( nt ); // sin/cos are the function of exp()
	const c1 = Math.cos( nt ); // sin/cos are the function of exp()
	const c = 1- c1;

	const qx = sqlen?ax/sqlen:0; // normalizes the imaginary parts
	const qy = sqlen?ay/sqlen:1; // set the sin of their composite angle as their total
	const qz = sqlen?az/sqlen:0; // output = 1(unit vector) * sin  in  x,y,z parts.

	const cnx = c*qx;
	const cny = c*qy;
	const cnz = c*qz;

	const xy = cnx*qy;  // x * y / (xx+yy+zz) * (1 - cos(2t))
	const yz = cny*qz;  // y * z / (xx+yy+zz) * (1 - cos(2t))
	const xz = cnz*qx;  // x * z / (xx+yy+zz) * (1 - cos(2t))

	const wx = s*qx;     // x / sqrt(xx+yy+zz) * sin(2t)
	const wy = s*qy;     // y / sqrt(xx+yy+zz) * sin(2t)
	const wz = s*qz;     // z / sqrt(xx+yy+zz) * sin(2t)

	const xx = cnx*qx;  // y * y / (xx+yy+zz) * (1 - cos(2t))
	const yy = cny*qy;  // x * x / (xx+yy+zz) * (1 - cos(2t))
	const zz = cnz*qz;  // z * z / (xx+yy+zz) * (1 - cos(2t))

	const basis = { right  :{ x : c1 + xx, y : wz + xy, z : xz - wy }
	              , up     :{ x : xy - wz, y : c1 + yy, z : wx + yz }
		      , forward:{ x : wy + xz, y : yz - wx, z : c1 + zz }
	              };
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
	this.θ = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	if( this.θ ){
		this.nx = this.x/this.θ;
		this.ny = this.y/this.θ;
		this.nz = this.z/this.θ;
	}else {
		this.nx = 0;
		this.ny = 1;
		this.nz = 0;
	}
	this.s  = Math.sin(this.θ/2); // only want one half wave...  0-pi total.
	this.qw = Math.cos(this.θ/2);

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

	let s  = Math.sin( q.θ ); // sin/cos are the function of exp()
	let c1 = Math.cos( q.θ ); // sin/cos are the function of exp()
	let c  = 1- c1; // sin/cos are the function of exp()

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
			s = Math.sin( t*q.θ );
			c1 = Math.cos( t*q.θ );
			c = 1 - c1;
			return { x :     ( wy() + xz() ),  y :     ( yz() - wx() ), z : c1 + ( zz() ) };
		},
		right(t) {
			s = Math.sin( t*q.θ );
			c1 = Math.cos( t*q.θ );
			c = 1 - c1;
			return { x : c1 + ( xx() ),  y :     ( wz() + xy() ), z :     ( xz() - wy() ) };
		},
		up(t) {
			s = Math.sin( t*q.θ );
			c1 = Math.cos( t*q.θ );
			c = 1 - c1;
			return { x :     ( xy() - wz() ),  y : c1 + yy(), z :     ( wx() + yz() ) };
		}
	}
}


// https://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/
// 
lnQuat.prototype.apply = function( v ) {
	//return this.applyDel( v, 1.0 );
	if( v instanceof lnQuat ) {
		const this_ = this;
		const result = new lnQuat(
			function() {
				this_.update(); 
	                        return finishRodrigues( v.update(), 0, this_.nx, this_.ny, this_.nz, this_.θ );
			}
		);
		return result.refresh();
	}

	const q = this;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !q.θ ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	} else {
		const nst = q.s; // normal * sin_theta
		const qw = q.qw;  //Math.cos( pl );   quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]

		const qx = q.nx*nst;
		const qy = q.ny*nst;
		const qz = q.nz*nst;

		//p┬Æ = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w ┬û v.dot(v))
		const tx = 2 * (qy * v.z - qz * v.y); // v.cross(p)*w*2
		const ty = 2 * (qz * v.x - qx * v.z);
		const tz = 2 * (qx * v.y - qy * v.x);
		return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		       , y : v.y + qw * ty + ( qz * tx - tz * qx )
		       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };
	} 
}

//-------------------------------------------

lnQuat.prototype.applyDel = function( v, del, q2, del2, result2 ) {
	if( v instanceof lnQuat ) {
		const result = new lnQuat(
			function() {
				const q = v;
				const ax = q.nx;
				const ay = q.ny;
				const az = q.nz;
	                        return finishRodrigues( q, 0, ax, ay, az, q.θ*del );
			}
		);
		return result.refresh();
	}
	const q = this;
	if( 'undefined' === typeof del ) del = 1.0;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !(q.θ*del) && !q2 ) {
		// v is unmodified.	
		if( result2 ) 
			result2.portion = this;
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	} else  {
		if( q2 ) {
			q2.update();
			let ax = 0;
			let ay = 0;
			let az = 0;
/*************** 
 * Okay; look, I made short attempt at slerp... it requires going to a quaternion...
   ||Q||_2 * sin(||Q||_1) and then using the cos slerp to get the angle and divide back out
   by the sin( ||Q2||_1 + ||Q1||_2 *del )
#*/
			if( SLERP ) {
				const target = {x:this.x+q2.x, y:this.y+q2.y, z:this.z+q2.z };
				const targetLen = Math.sqrt( target.x*target.x + target.y*target.y + target.z*target.z );
				const targetAng = targetLen;//Math.abs( target.x )+Math.abs( target.y )+Math.abs( target.z );
				

				const r = longslerp( q2, {nx:target.x/targetLen, ny:target.y/targetLen, nz:target.z/targetLen, θ:targetAng  }, del );
				if( result2 ) 
					result2.portion = r;
				ax = r.x;
				ay = r.y;
				az = r.z;
			}
			else 
//****************************************/
			{
				ax = this.x * del + q2.x * del2;
				ay = this.y * del + q2.y * del2;
				az = this.z * del + q2.z * del2;
			}

			if( result2 && !result2.portion )
				result2.portion = new lnQuat( 0, ax, ay, az );

			const θ = Math.sqrt(ax*ax+ay*ay+az*az);

			if( !θ ) {
				return {x:v.x, y:v.y, z:v.z }; // 1.0
			}
			const s  = Math.sin( θ/2 );//q.s;
			const nst = θ?s/θ:1; // sin(theta)/r    normal * sin_theta
			const qw = Math.cos( θ/2 );  // quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]
		        
			const qx = θ?ax*nst:q2?q2.nx:0;
			const qy = θ?ay*nst:q2?q2.ny:1;
			const qz = θ?az*nst:q2?q2.nz:0;
		        
			const tx = 2 * (qy * v.z - qz * v.y);
			const ty = 2 * (qz * v.x - qx * v.z);
			const tz = 2 * (qx * v.y - qy * v.x);
			return { x : v.x + qw * tx + ( qy * tz - ty * qz )
			       , y : v.y + qw * ty + ( qz * tx - tz * qx )
			       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };			
		}
		else {
			if( SLERP ) {
				const r = longslerp( {nx:0,ny:0,nz:0,θ:0}, this, del );
				ax = r.x;
				ay = r.y;
				az = r.z;
			} else {
				ax = this.x * del;
				ay = this.y * del;
				az = this.z * del;
			}
		}
		if( result2 && !result2.portion )
			result2.portion = new lnQuat( 0, ax, ay, az );

		const θ = Math.sqrt(ax*ax+ay*ay+az*az);
		if( !θ ) {
			return { x:v.x, y:v.y, z:v.z }
		}
		const s  = Math.sin( θ/2 );//q.s;
		const nst = s/θ; // sin(theta)/r    normal * sin_theta
		const qw = Math.cos( θ/2 );  // quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]

		const qx = ax*nst;
		const qy = ay*nst;
		const qz = az*nst;

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

lnQuat.prototype.slerpRel = function( q2, del ) {
	const newQ = new lnQuat( 0, this.x+q2.x, this.y+q2.y, this.z+q2.z).update();
	const result = longslerp( this, newQ, del );
	return result;
}

lnQuat.prototype.slerp = function( q2, del ) {
	const q = this;
	if( 'undefined' === typeof del ) del = 1.0;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !(q.θ*del) && !q2 ) {
		// v is unmodified.
		return new lnQuat( this )
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
				return longslerp( this, q2, del );
			}
			else 
//****************************************/
			{
				ax = this.x * (1-del) + (del)*q2.x;
				ay = this.y * (1-del) + (del)*q2.y;
				az = this.z * (1-del) + (del)*q2.z;
			}
	
			return new lnQuat( 0, ax, ay, az );
		}
		else {
			if( SLERP ) {
				return longslerp( {nx:0,ny:0,nz:0,θ:0}, this, del );
			} else {
				ax = this.x * del;
				ay = this.y * del;
				az = this.z * del;
			}
		}
		return new lnQuat( 0, ax, ay, az );
	}
}


lnQuat.prototype.applyInv = function( v ) {
	//x y z w l
	const q = this;
        if( !q.θ ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	const s  = q.s;
	const qw = q.qw;
	
	const dqw = s/q.θ; // sin(theta)/r

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
	//const angleMax = ( q.θ + Math.abs(th) );

	const AdotB = (q.nx*ax + q.ny*ay + q.nz*az);

	const xmy = th/2 - q.θ/2; // X - Y  (x minus y)
	const xpy = th/2 + q.θ/2  // X + Y  (x plus y )
	const cxmy = Math.cos(xmy);
	const cxpy = Math.cos(xpy);
	const sxmy = Math.sin(xmy);
	const sxpy = Math.sin(xpy);
	
	//const as = Math.sin( th/2);
	//const ac = Math.cos( th/2);
	//const qw = Math.cos( q.θ/2);
	//const qs = Math.sin( q.θ/2);
	//const sc1 = as * qw;
	//const sc2 = qs * ac;
	//const ss = qs * as;
	//const cc = qw * ac;
	const cosCo2 = ( ( 1-AdotB )*cxmy + (1+AdotB)*cxpy )/2;
	//const cosCo2 = cc - ss* AdotB;

	let ang = acos( cosCo2 )*2 + ((oct|0)) * (Math.PI*4);
	// only good for rotations between 0 and pi.

	if( ang ) {      // as bc     bs ac       as bs
			// vector rotation is just...
			// when atheta is small, aaxis is small pi/2 cos is 0 so this is small
			// when btheta is small, baxis is small pi/2 cos is 0 so this is small
			// when both are large, cross product is dominant (pi/2)

		const ss1 = sxmy + sxpy
		const ss2 = sxpy - sxmy
		const cc1 = cxmy - cxpy

		const sAng = Math.sin(ang/2);

		// the following expression is /2
		// and is not normalized with sin of angle/2.
		const crsX = (ay*q.nz-az*q.ny);
		const Cx = ( crsX * cc1 +  ax * ss1 + q.nx * ss2 );
		const crsY = (az*q.nx-ax*q.nz);
		const Cy = ( crsY * cc1 +  ay * ss1 + q.ny * ss2 );
		const crsZ = (ax*q.ny-ay*q.nx);
		const Cz = ( crsZ * cc1 +  az * ss1 + q.nz * ss2 );
			
		const Clx = 1/Math.sqrt(Cx*Cx+Cy*Cy+Cz*Cz);//+Math.abs(Cy/sAng)+Math.abs(Cz/sAng));
		
		q.θ  = ang;
		q.qw = cosCo2;
		q.s  = sAng;
		q.nx = Cx*Clx;
		q.ny = Cy*Clx;
		q.nz = Cz*Clx;
	
		q.x  = q.nx*ang;
		q.y  = q.ny*ang;
		q.z  = q.nz*ang;

		q.dirty = false;
	} else {
		// two axles are coincident, add...
		if( AdotB > 0 ) {
			q.x = q.nx * (q.θ+th);
			q.y = q.ny * (q.θ+th);
			q.z = q.nz * (q.θ+th);
		}else {
			q.x = q.nx * (q.θ-th);
			q.y = q.ny * (q.θ-th);
			q.z = q.nz * (q.θ-th);
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
	
	//p┬Æ = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w ┬û v.dot(v))
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
	const s  = Math.sin( q.θ ); // sin/cos are the function of exp()
	const c1 = Math.cos( q.θ ); // sin/cos are the function of exp()
	const c = 1- c1;

	const cnx = c*q.nx
	const ax = ( cnx*q.nx + c1 );
	const ay = ( cnx*q.ny + s*q.nz );
	const az = ( cnx*q.nz - s*q.ny );

	return finishRodrigues( q, 0, ax, ay, az, th );
}

function roll( q, th ) {
	// input angle...
	const s  = Math.sin( q.θ ); // sin/cos are the function of exp()
	const c1 = Math.cos( q.θ ); // sin/cos are the function of exp()
	const c = 1- c1;

	const cnz = c * q.nz;
	const ax = ( cnz*q.nx ) + s*q.ny;
	const ay = ( cnz*q.ny ) - s*q.nx;
	const az = ( cnz*q.nz ) + c1;

	return finishRodrigues( q, 0, ax, ay, az, th );
}

function yaw( q, th ) {
	// input angle...
	const s = Math.sin( q.θ ); // double angle sin
	const c1 = Math.cos( q.θ ); // sin/cos are the function of exp()
	const c = 1- c1;

	const cny = c * q.ny;
	const ax = ( cny*q.nx ) - s*q.nz;
	const ay = ( cny*q.ny ) + c1;
	const az = ( cny*q.nz ) + s*q.nx;

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
	const t2 = new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.θ, lnQ1 );
	const t3 = new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2.θ, t2 );
	const t4 = new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3.θ, t3 );
	const t5 = new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4.θ, t4 );
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
		const t = this.x.freeSpin( this.y.θ, this.y );
		t.freeSpin( this.z.θ, this.z );
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
			const t3 = this.y.update().freeSpin( t2.θ, t2 );
			const t4 = this.z.update().freeSpin( t3.θ, t3 );

			return t4;	

			const z = this.lnQuat.update();
			const a = this.x.freeSpin( this.z.θ/2, this.z );
			const b = this.y.freeSpin( a.θ/2, a );
			const c = this.z.freeSpin( b.θ/2, b );
			return new EulerRotor( c.x, c.y, c.z );
		}
						
		const a = this.x.apply( v );
		const b = this.y.apply( a );
		const c = this.z.apply( b );
		return c;
	}		
}

// -------------------------------------------------------------------------------
//  Quaternion (Rotation part)
// -------------------------------------------------------------------------------


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
			return new lnQuat( 0, q.x/r, q.y/r, q.z/r ).update();	
		else
			return new lnQuat( 0, 0, 0, 0 ).update();	
	}
	return new lnQuat( ang, q.x/s, q.y/s, q.z/s ).update();
}

function quatArrayToLogQuat( q ) {
		return quatToLogQuat( {x:q[0],y:q[1],z:q[2],w:q[3]} );
 }
//module.exports = exports = lnQuat





function longslerp(a, b, t ) {
	
	const u = [ a.nx*a.θ, a.ny*a.θ, a.nz* a.θ]
	const v = [ b.nx*b.θ, b.ny*b.θ, b.nz* b.θ]
	var p = axisAngleToQuaternion(u);
	var q = axisAngleToQuaternion(v);
	var r = slerp(p, q, t);
	return quatArrayToLogQuat( r );		
}

// -*- coding: utf-8; -*-

// Copyright 2019, Richard Copley <buster at buster dot me dot uk>

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


    // Assuming p and q are not parallel or antiparallel, return a quaternion
    // that interpolates between p and q.
    function slerp(p, q, t) {
      normalizeQuaternion(p);
      normalizeQuaternion(q);
      var cosTheta = p[0] * q[0] + p[1] * q[1] + p[2] * q[2] + p[3] * q[3];
      var theta = Math.acos(cosTheta);

      // Find the arc length from p to q along a great circle on the unit
      // sphere. (The unit sphere is a 3-dimensional surface in the
      // 4-dimensional space of quaternions).

      // Interpolate.
      var sinTheta = Math.sin(theta);
      var s0 = Math.sin((1 - t) * theta) / sinTheta;
      var s1 = Math.sin(t * theta) / sinTheta;
      return [
        s0 * p[0] + s1 * q[0],
        s0 * p[1] + s1 * q[1],
        s0 * p[2] + s1 * q[2],
        s0 * p[3] + s1 * q[3]
      ];
    }

    function axisAngleToQuaternion(v) {
      // If A = (x0,y0,z0) is the unit length axis of rotation and if θ is the
      // angle of rotation, a quaternionq=w+xi+yj+zk that represents the rotation
      // satisfies w= cos(θ/2), x=x0 sin(θ/2), y=y0 sin(θ/2) and z=z0 sin(θ/2).

      var angle = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      if (angle === 0) {
        return [0, 0, 0, 1];
      }
      var k = Math.sin(angle / 2) / angle, c = Math.cos(angle / 2);
      return [k * v[0], k * v[1], k * v[2], c];
    }

    function quaternionToMatrix(q) {
      var xx = q[0] * q[0];
      var xy = q[0] * q[1];
      var xz = q[0] * q[2];
      var xw = q[0] * q[3];

      var yy = q[1] * q[1];
      var yz = q[1] * q[2];
      var yw = q[1] * q[3];

      var zz = q[2] * q[2];
      var zw = q[2] * q[3];

      var ww = q[3] * q[3];

      return [
        [1 - 2 * yy - 2 * zz, 2 * xy - 2 * zw, 2 * xz + 2 * yw],
        [2 * xy + 2 * zw, 1 - 2 * xx - 2 * zz, 2 * yz - 2 * xw],
        [2 * xz - 2 * yw, 2 * yz + 2 * xw, 1 - 2 * xx - 2 * yy]
      ];
    }

    // Multiply 3-by-3 matrices.
    function normalizeQuaternion(q) {
      var length = Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
      q[0] /= length;
      q[1] /= length;
      q[2] /= length;
      q[3] /= length;
    }

    function leftPad(string, width)
    {
      var result = "";
      for (var i = string.length; i < width; ++ i) {
        result += " ";
      }
      return result + string;
    }

    function formatNumber(x) {
      return leftPad(x.toFixed(4), 8);
    }

    function matrixToString(m) {
      var text = "";
      for (var i = 0; i != 3; ++i) {
        for (var j = 0; j != 3; ++j) {
          text = text + formatNumber(m[i][j]);
        }
        text = text + "\n";
      }
      return text;
    }

    // Multiply transpose of matrix a by matrix b.
    function matrixMultiplyTranspose(a, b) {
      return [
        [
          a[0][0] * b[0][0] + a[0][1] * b[0][1] + a[0][2] * b[0][2],
          a[0][0] * b[1][0] + a[0][1] * b[1][1] + a[0][2] * b[1][2],
          a[0][0] * b[2][0] + a[0][1] * b[2][1] + a[0][2] * b[2][2],
        ],
        [
          a[1][0] * b[0][0] + a[1][1] * b[0][1] + a[1][2] * b[0][2],
          a[1][0] * b[1][0] + a[1][1] * b[1][1] + a[1][2] * b[1][2],
          a[1][0] * b[2][0] + a[1][1] * b[2][1] + a[1][2] * b[2][2],
        ],
        [
          a[2][0] * b[0][0] + a[2][1] * b[0][1] + a[2][2] * b[0][2],
          a[2][0] * b[1][0] + a[2][1] * b[1][1] + a[2][2] * b[1][2],
          a[2][0] * b[2][0] + a[2][1] * b[2][1] + a[2][2] * b[2][2],
        ]
      ];
    }

    function formatAxisAndAngle(v) {
      var angle = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      var axis = [v[0] / angle, v[1] / angle, v[2] / angle];
      var text = "angle" + formatNumber(angle) + ", axis";
      if (angle) {
        text = text +
          formatNumber(axis[0]) +
          formatNumber(axis[1]) +
          formatNumber(axis[2]);
      }
      else {
        text = text + " undefined";
      }
      return text;
    }

    function matrixToAxisAngle(m) {
      var trace = m[0][0] + m[1][1] + m[2][2];
      trace = Math.min(3, Math.max(-1, trace));
      var angle = Math.acos((trace - 1) / 2);
      var v = [
        m[2][1] - m[1][2],
        m[0][2] - m[2][0],
        m[1][0] - m[0][1]
      ];
      var k = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      if (k) {
        v[0] *= angle / k;
        v[1] *= angle / k;
        v[2] *= angle / k;
      }
      return v;
    }

