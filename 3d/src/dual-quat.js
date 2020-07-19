
// Object relative orientation and position is represented with a dualLnQuat with( angleUp, lookAtNormal ), (my position within parent)

/* The 'world' would be started with a dual-quat */

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;

/*

// theoretical physical world....

const world = new dlnQuat( new lnQuat(), new dualQuat() );
// add 0, rotation 0.

const someObject = new dlnQuat( new lnQuat( 0, {x:0, y:0, z:1} ), new dualQuat(0, 0, 10) );
const Tree = new dlnQuat( new lnQuat( 0, {x:0, y:1, z:0} ), new dualQuat(5, 0, -2) );
const treeTop = new dlnQuat( new lnQuat( 0, { x:0, y:1, z:0} ), new dualQuat( 0, 0, 0 ) );
const branch1 = new dlnQuat( new lnQuat( 54/180*Math.PI, { x:0.4, y:0.3, z:0.2} ), new dualQuat( 5, 0, 0 ) );
*/

// 'fixed' acos for inputs > 1
function acos(x) {
	// uncomment this line to cause failure for even 1/2 rotations(at the limit of the other side)
	// return Math.acos(x); // fails on the south pole, which gets inverted back to 0.

	const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
	const plusminus = (x)=>mod( x+1,2)-1;
	const trunc = (x,y)=>x-mod(x,y);
	return Math.acos(plusminus(x));
}

// takes an input and returns -1 to 1
// where overflow bounces wraps at the ends.
function delwrap(x) {
	// mod( x+1, 2)-1
	if( x < 0 )
		return ( 2*( (x+1)/2 - Math.floor((x+1)/2)) -1);
	else
		return( 2*( (x+1)/2 - Math.floor((x+1)/2)) -1);
}

// takes an input and returns -1 to 1
// where overflow bounces from the ends.
function signedMod(x) {
	// mod( x+1, 2)-1
	return 1-Math.abs(1-(x))%2;

}

// world is 0, 0, 0, 0, 0, 0, 0.
// first object            cT   = is ( world.addNew(someObject.lnQ), world.lnQ.applyExp( someObject.dQ ) )
// first tree              tT   = is ( world.addNew(Tree.lnQ)      , world.lnQ.applyExp( Tree.dQ ) )
// first tree's top        ttT  = is ( tT.addNew(treeTop.lnQ)      , tT.lnQ.applyExp( treeTop.dQ ) )
// first tree's top branch ttbT = is ( ttT.addNew(branch1.lnQ)     , ttT.lnQ.applyExp( branch1.dQ ) )

// ttbcT = ttbT -> cT = ( cttbT.lnQ=(ttbT.lnQ - CT.lnQ), cttbT.lnQ.applyExpInv(ttbT.dQ - cT.dq) )
// basis = { forward : ttbcT.apply( {x:0,y:0,z:1} )
//         , right : ttbcT.apply( {x:1,y:0,z:0} )
//         , up : ttbcT.apply( {x:0,y:1,z:0} )
// 

const test = true;
let normalizeNormalTangent = false;
var twistDelta = 0;
// -------------------------------------------------------------------------------
//  Log Quaternion (Rotation part)
// -------------------------------------------------------------------------------

let twisting = false;
function lnQuat( theta, d, a, b ){
	this.w = 0; // unused, was angle of axis-angle, then was length of angles(nL)...
	this.x = 0;  // these could become wrap counters....
	this.y = 0;  // total rotation each x,y,z axis.
	this.z = 0;

	this.nx = 0;  // these could become wrap counters....
	this.ny = 0;  // total rotation each x,y,z axis.
	this.nz = 0;
	// temporary sign/cos/normalizers
	this.s = 0;  // sin(composite theta)
	this.qw = 1; // cos(composite theta)
	this.nL = 1; // normal Linear
	this.nR = 1; // normal Rectangular
	this.dirty = true; // whether update() has to do work.

	if( "undefined" !== typeof theta ) {
		if( "undefined" !== typeof a ) {
			//if( ASSERT ) if( theta) throw new Error( "Why? I mean theta is always on the unit circle; else not a unit projection..." );
			// create with 4 raw coordinates
			if( theta ) {
				const spin = (Math.abs(d)+Math.abs(a)+Math.abs(b));
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
// x/y/z normal (no spin, based at 'north' (0,1,0) )  {x:,y:,z:}
					// normal conversion is linear.
					const l2 = (Math.abs(theta.x)/*+Math.abs(theta.y)*/+Math.abs(theta.z));
					if( l2 ) {
						const l3 = Math.sqrt(theta.x*theta.x+theta.y*theta.y+theta.z*theta.z);
						//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );
					        
						const r = 1/(l2);
						let tx = theta.x*r, ty = theta.y/l3, tz = theta.z* r;
						const qw = acos( ty ); // 1->-1 (angle from pole around this circle.

						this.nx = theta.x/l3 /* * qw*/;
						this.ny = 0;// theta.y/l3 /* * qw*/;
						this.nz = theta.z/l3 /* * qw*/;

						this.x = tz*qw;
						this.y = 0;
						this.z = -tx*qw;
					        
						this.update();
						if(!twisting) { // nope/ still can't just 'twist' the target... have to re-resolve back to beginning
							if(normalizeNormalTangent) {
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
							}
							if( twistDelta ) {
								twisting = true;
								yaw( this, twistDelta /*+ angle*/ );
								twisting = false;
							}
						}
						return;
					}
					else return; // 0 rotation.
				}
			}


			const nR = 1/ Math.sqrt( d.x*(d.x) + d.y*(d.y) + d.z*(d.z) ); // make sure to normalize axis.
			// if no rotation, then nothing.
			if( Math.abs(theta) > 0.000001 ) {
				this.x = d.x * nR;
				this.y = d.y * nR;
				this.z = d.z * nR;

				const nL = theta / (Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z));
				
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
x = (R21 - R12)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);

y = (R02 - R20)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);

z = (R10 - R01)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
*/	
	if( !this.octave ) this.octave = 1;
	if( tzz == 0 ) {
		angle -= this.octave * 2*Math.PI
	}else {
		angle += (this.octave-1) * 2*Math.PI
	}
	//else if( tzz == 1 ) {
	//        angle += 10*Math.PI;
	//}
	//else if( tzz == 2 ) {
	//        angle -= 12*Math.PI;
	//}
	tzz++;
	if( tzz >= 2 ) tzz = 0;

	const yz = basis.up     .z - basis.forward.y;
	const xz = basis.forward.x - basis.right  .z;
	const xy = basis.right  .y - basis.up     .x;
	const tmp = 1 /Math.sqrt(yz*yz + xz*xz + xy*xy );

	this.nx = yz *tmp;
	this.ny = xz *tmp;
	this.nz = xy *tmp;
	const lNorm = angle / (Math.abs(this.nx)+Math.abs(this.ny)+Math.abs(this.nz));
	this.x = this.nx * lNorm;
	this.y = this.ny * lNorm;
	this.z = this.nz * lNorm;

	this.dirty = true;
	return this;
}

lnQuat.prototype.exp = function() {
	const q = this;
	const s  = this.s;
	console.log( "lnQuat exp() is disabled until integrated with a quaternion library." );
	return null;//new Quat( this.qw, q.x *q.x* s, q.y *q.y* s, q.z *q.z * s );
}

lnQuat.prototype.spinDiff = function( q ) {
	return Math.abs(this.x - q.x) + Math.abs(this.y - q.y) + Math.abs(this.z - q.z);
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
lnQuat.prototype.getBasisT = function(del) {
	// this is terse; for more documentation see getBasis Method.
	const q = this;
	//this.update();
	if( !del ) del = 1.0;
	const nt = this.nL;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	if( !nt ) {
		return {forward:{x:0,y:0,z:1}, right:{x:1,y:0,z:0}, up:{x:0,y:1,z:0}, origin:{x:0,y:0,z:0 }};
	}
	const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
	const qw = Math.cos( del * nt ); // sin/cos are the function of exp()

	const nst = s;
	const qx = q.nx * nst; // normalizes the imaginary parts
	const qy = q.ny * nst; // set the sin of their composite angle as their total
	const qz = q.nz * nst; // output = 1(unit vector) * sin  in  x,y,z parts.

	//sin(t)sin(t) = cos(t) - cos(2t)

	const xy = 2*qx*qy;  // 2*sin(t)*sin(t) * x * y / (xx+yy+zz)   1 - cos(2t)
	const yz = 2*qy*qz;  // 2*sin(t)*sin(t) * y * z / (xx+yy+zz)   1 - cos(2t)
	const xz = 2*qx*qz;  // 2*sin(t)*sin(t) * x * z / (xx+yy+zz)   1 - cos(2t)
	                          
	const wx = 2*qw*qx;  // 2*cos(t)*sin(t) * x / sqrt(xx+yy+zz)   sin(2t)
	const wy = 2*qw*qy;  // 2*cos(t)*sin(t) * y / sqrt(xx+yy+zz)   sin(2t)
	const wz = 2*qw*qz;  // 2*cos(t)*sin(t) * z / sqrt(xx+yy+zz)   sin(2t)
	                          
	const xx = 2*qx*qx;  // 2*sin(t)*sin(t) * y * y / (xx+yy+zz)   1 - cos(2t)
	const yy = 2*qy*qy;  // 2*sin(t)*sin(t) * x * x / (xx+yy+zz)   1 - cos(2t)
	const zz = 2*qz*qz;  // 2*sin(t)*sin(t) * z * z / (xx+yy+zz)   1 - cos(2t)

	const basis = { right  :{ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) }
	              , up     :{ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) }
	              , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) }
	              , origin: { x:0, y:0, z:0 } };
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
	if( !this.dirty ) return;
	this.dirty = false;


	// norm-rect
	this.nR = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);

	// norm-linear    this is / 3 usually, but the sine lookup would 
	//    adds a /3 back in which reverses it.
	this.nL = (Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z))/2;///(2*Math.PI); // average of total
	if( this.nR ){
		this.nx = this.x/this.nR /* * this.nL*/;
		this.ny = this.y/this.nR /* * this.nL*/;
		this.nz = this.z/this.nR /* * this.nL*/;
	}else {
		this.nx = 0;
		this.ny = 0;
		this.nz = 0;
	}
	this.s  = Math.sin(this.nL); // only want one half wave...  0-pi total.
	this.qw = Math.cos(this.nL);

	return this;
}


// https://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/
// 
lnQuat.prototype.apply = function( v ) {
	//return this.applyDel( v, 1.0 );
	const q = this;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !q.nL ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	// call update() ?
	// q.s and q.qw are set in update(); they are constants for a quat in a location.

	if( q.nL ) {
		const nst = q.s/this.nR; // normal * sin_theta
		const qw = q.qw;  //Math.cos( pl );   quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]
	        
		const qx = q.x*nst;
		const qy = q.y*nst;
		const qz = q.z*nst;
	        
		//p’ = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w – v.dot(v))
		const tx = 2 * (qy * v.z - qz * v.y); // v.cross(p)*w*2
		const ty = 2 * (qz * v.x - qx * v.z);
		const tz = 2 * (qx * v.y - qy * v.x);
		return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		       , y : v.y + qw * ty + ( qz * tx - tz * qx )
		       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };
		//    3 registers (temp variables, caculated with sin/cos/sqrt,...)
		// 18+12 (30)   12(2)+(3) (17 parallel)
	        
		// total 
		// 21 mul + 9 add  (+ some; not updated)
	} 
	else return {x:v.x,y:v.y,z:v.z};
}

//-------------------------------------------

lnQuat.prototype.applyDel = function( v, del ) {
	const q = this;
	if( 'undefined' === typeof del ) del = 1.0;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !q.nL ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	if( this.nL ) {
		const s  = Math.sin( (q.nL)*del );//q.s;
		const nst = s/q.nR; // sin(theta)/r    normal * sin_theta
		const qw = Math.cos( (q.nL)*del );  // quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]
	        
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
	}else return {x:v.x, y:v.y, z:v.z };        

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

function twist( q, theta ) {
	const dsin = Math.sin(theta);
	const dcos = Math.cos(theta);
	if( !q.nL ) {
		q.y = theta;
		q.dirty = true;
		return q;
	}	
	
	const cosQ = q.qw; //Math.sin( q.nL )
	const sinQ = q.s;  //Math.sin( q.nL )

	const qnx = sinQ * q.x / q.nR;
	const qny = sinQ * q.y / q.nR;
	const qnz = sinQ * q.z / q.nR;

	const yy = qny * qny;
	const zz = qnz * qnz;
	const xx = qnx * qnx;
	const xy = qnx * qny;
	const xz = qnx * qnz;
	const yz = qny * qnz;

	const xn = qnx * cosQ;
	const yn = qny * cosQ;
	const zn = qnz * cosQ;

	const xtmp =  2 * ( ( yz + zn ) -  ( xn - yz )*dcos + ( xy + zn )*dsin );
	const ytmp =  2 * ( 1 + 2 * yn *dcos  - ( xx - zz )*dsin );
	const ztmp =  2 * ( ( xy + zn )*dcos - ( xn - yz )*dsin - ( xy + xn ) );

	const t2 = ( 1 - xx + zz  ) * dcos   
	         - ( yn + yn  ) * dsin
	         - ( zz + xx );
	let angle = acos( t2 );

	const baseAngle = q.nL;
	if( theta > 0 ) {
		while( baseAngle > angle ) {
			angle += Math.PI*2;
		}
	}
	if( theta < 0 ) {
		while( baseAngle < angle ) angle -= Math.PI*2;
	}


	q.nR = Math.sqrt(xtmp*xtmp + ytmp*ytmp + ztmp*ztmp);
	const sqNorm = 1 /q.nR;

	q.nx = xtmp *sqNorm;
	q.ny = ytmp *sqNorm;
	q.nz = ztmp *sqNorm;

	q.nL = (Math.abs(q.nx)+Math.abs(q.ny)+Math.abs(q.nz))/2;
	const angleOverLinNorm = angle / q.nL;
	q.s  = Math.sin( angle );
	q.qw = Math.cos( angle );
	q.x = q.nx * angleOverLinNorm;
	q.y = q.ny * angleOverLinNorm;
	q.z = q.nz * angleOverLinNorm;
/*
	q.nx *= angle;
	q.ny *= angle;
	q.nz *= angle;
*/
	q.dirty = false;

	return q;
}

function pitch( C, th ) {
	const basis = C.getBasis();
	const twistor = new lnQuat( th, basis.right );
	basis.up = twistor.apply(basis.up);
	basis.forward = twistor.apply(basis.forward);
	return C.fromBasis( basis );
}

function roll( C, th ) {
	const basis = C.getBasis();
	const twistor = new lnQuat( th, basis.forward );
	basis.up = twistor.apply(basis.up);
	basis.right = twistor.apply(basis.right);
	return C.fromBasis( basis );
}

function yaw( C, th ) {
	const basis = C.getBasis();
	const twistor = new lnQuat( th, basis.up );
	basis.right = twistor.apply(basis.right);
	basis.forward = twistor.apply(basis.forward);
	return C.fromBasis( basis );
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
	return this;//.update();
}

// -------------------------------------------------------------------------------
//  Dual Quaternion (offset part) (will be unused
//     This is just the point offset associated with a rotation
//     .. either a rotation at a point, or a rotation before a point...
// -------------------------------------------------------------------------------

// offset coordinate
function dualQuat( x, y, z ) {
	this.w = -1.0; // mark it's a dual.
	this.x = x;
	this.y = y;
	this.z = z;
}

dualQuat.prototype.add = function( q ) {
	this.w += q.w;
	this.x += q.x;
	this.y += q.y;
	this.z += q.z;
	return this;
}

dualQuat.prototype.addNew = function( q ) {
	return new dualQuat().add(this).add(q);
}


// -------------------------------------------------------------------------------
//  Dual Log Quaternion
// -------------------------------------------------------------------------------

// dual log-quat
//   log qaut keeps the orientation of the frame
//   dual of the quat keeps the offset of the origin of that quat.
//   it forms the orgin of a set of basis vectors describing the x-y-z space.

function dlnQuat( lnQ, dQ ) {
	this.lnQ = lnQ;
	this.dQ = dQ;
}

// Apply just the rotation to a point.
dlnQuat.prototype.applyRotation = function( v ) {
	return this.lnq.apply( v );
}

// Apply just the rotation to a point.
dlnQuat.prototype.applyInvRotation = function( v ) {
	return this.lnq.apply( v );
}

// Apply just the rotation to a rotation
// returns a new vector (usually the partial is saved for further use).
dlnQuat.prototype.applyRotationQ = function( q ) {
	if( !(q instanceof lnQuat) ) throw( new Error( "invalid parameter passed to applyRotationQ" ) );
	return this.lnQ.addNew( q );
}

// Apply the rotation to a rotation
// Apply the origin offset from the dual
// returns a new vector (usually the partial is saved for further use).

dlnQuat.prototype.applyTransform = function( v ) {
	const rV = this.lnq.apply( v );
	//const rO = this.lnQ.apply( this.dQ );
	rV.x += this.dQ.x;
	rV.y += this.dQ.y;
	rV.z += this.dQ.z;
	return rv;
}

// V is in the space of the dual rotated around 0.
dlnQuat.prototype.applyArmTransform = function( v ) {
	const rV = this.lnq.apply( v );
	const rO = this.lnQ.apply( this.dQ );
	rV.x += r0.x;
	rV.y += r0.y;
	rV.z += r0.z;
	return 
}


dlnQuat.prototype.applyArmTransformQ = function( q ) {
	return new dlnQuat( this.lnQ.addNew( q.lnQ ), this.dQ.addNew( q.dQ ) );
}


dlnQuat.prototype.applyArmTransformQ = function( q ) {
	// 
	return new dlnQuat( this.lnQ.addNew( q.lnQ ), this.dQ.addNew( q.dQ ) );
}


dlnQuat.prototype.applyArmTransformQ = function( q ) {
	// 
	return new dlnQuat( this.lnQ.addNew( q.lnQ ), this.dQ.addNew( q.dQ ) );
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

Quat.prototype.log = function( ) {
	const x = this.x;
	const y = this.y;
	const z = this.z;
	if( ASSERT ) {
		const l = 1/Math.sqrt(x*x + y*y + z*z );
		if( Math.abs( 1.0 - l ) > 0.001 ) console.log( "Input quat was denormalized", l );
	}

	const w = this.w;
	const r  = Math.sqrt(x*x+y*y+z*z);
	const ang = Math.atan2(r,w);
	if( r < SIN_R_OVER_R_MIN ) {
		// cannot know the direction.
		return new lnQuat( ang, 0, 1, 0 )
	}
	const t  = 1/r;

	const xt = x /r;
	const yt = y /r;
	const zt = z /r;
	return new lnQuat( Math.atan2(r,w), xt, yt, zt )
}
*/

