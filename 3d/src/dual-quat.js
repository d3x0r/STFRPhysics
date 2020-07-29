const speedOfLight = 1;
// Object relative orientation and position is represented with a dualLnQuat with( angleUp, lookAtNormal ), (my position within parent)

/* The 'world' would be started with a dual-quat */

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;

const abs = (x)=>abs(x);

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


// -------------------------------------------------------------------------------
//  Dual Quaternion (offset part) (will be unused
//     This is just the point offset associated with a rotation
//     .. either a rotation at a point, or a rotation before a point...
// -------------------------------------------------------------------------------

// offset coordinate

// dual log-quat
//   log qaut keeps the orientation of the frame
//   dual of the quat keeps the offset of the origin of that quat.
//   it forms the orgin of a set of basis vectors describing the x-y-z space.


class v3(a,b,c){
	this.x = a||0;
	this.y = b||0;
	this.z = c||0;
	this.nL = Math.abs(|a|)+Math.abs(|b|)+Math.abs(|c|);
	this.nR = Math.sqrt(a*a+b*b+c*c);
	if( this.nR ) {
		this.nx = this.x / this.nR;
		this.ny = this.y / this.nR;
		this.nz = this.z / this.nR;
	}else {
		this.nx = 1;
		this.ny = 0;
		this.nz = 0;
	}

	this.dirty = false;

	constructor(a) {
		if( a instanceof v3 ) {
			this.x = a.x;
			this.y = a.y;
			this.z = a.z;
			this.dirty = true;
		}
	}

	update() {
		if( this.dirty ) {
			this.nL = Math.abs(|a|)+Math.abs(|b|)+Math.abs(|c|);
			this.nR = Math.sqrt(a*a+b*b+c*c);
			this.nx = this.x / this.nR;
			this.ny = this.y / this.nR;
			this.nz = this.z / this.nR;
			this.dirty = false;
		}
	}
	add( b ) {
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
		this.dirty = true;
		return this;
	}
	add2( a, b ) {
		this.x = b.x + b.x;
		this.y = b.y + b.y;
		this.z = b.z + b.z;
		this.dirty = true;
		return this;
	}
	addDel( b, del ) {
		this.x += del*b.x;
		this.y += del*b.y;
		this.z += del*b.z;
		this.dirty = true;
		return this;
	}
	sub( b ) {
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
		this.dirty = true;
		return this;
	}
	sub2( a, b ) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.dirty = true;
		return this;
	}
	dot( b ) {
		return ( this.x * b.x + this.y * b.y + this.z * b.z );
	}
	cross( b ) {
		return new v3( this.y * b.z - this.z * b.y
		             , this.z * b.x - this.x * b.z
		             , this.x * b.y - this.y * b.x
		             );
	}	
}

function dlnQuat( del, x, y, z, xR, yR, zR ) {
	if( "number" === typeof x && "number" === typeof z ) {
		this.w = -1.0; // mark it's a dual.

	        this.linearAngualarity = 0;

		this.speed = Math.abs(x)+Math.abs(y)+Math.abs(z);
		this.nR = sqrt(x*x+y*y+z*z);
		
		this.v = new v3(x,y,z);
	        this.r = new v3(xR,yR,zR);
	        
		// w becomes time scale basically... 
		// unit vectors representing normal things through time...
	        this.w =  this.r.nL + this.v.nL;
		//this.w = spinSpeedNormalizer; // also total spin+angle of this system...
		if( this.w ) {
			this.angle_normal = this.r.nL / this.w;
			this.speed_normal = this.v.nL / this.w;
		}else {
			// normal matter is basically here...
			this.angle_normal = 1/2;
			this.speed_normal = 1/2;
		}

		// /* speed * */ nxyz * cos(theta) + /*spin * */ nxyzR * sin(theta)
		this.dirty = false;

	} else if( x instanceof dlnQuat ) {
		this.w = x.w;

		this.v = new v3( x.v );
		this.r = new v3( x.r );

		this.angle_normal = w.angle_normal;
		this.speed_normal = w.speed_normal;
		
		this.dirty = w.dirty;

	} else if( "undefined" === typeof x ) {
		this.w = speedOfLight;
		// generate photons by default.
		this.speed = speedOfLight;
		// generate black holes by default.
		//this.speed = 0;
		this.v = new v3();

		// generate black holes by default
		// this.angle = speedOfLight;
		this.r = new v3();
		
		// standard normal?
		// all speed, no spin
		this.angle_normal = 0;
		this.speed_normal = 1;

		// black hole default : all spin, no speed
		//this.angle_normal = 1;
		//this.speed_normal = 0;

		this.dirty = false;
	} else {		
		throw new Error( "Unsupported argument types passed..." );
	}
}

dlnQuat.prototype.add = function( q ) {
	this.v.add(q.v);
	this.r.add(q.r);
	return this;
}

dlnQuat.prototype.update = function( ) {
	this.v.update();
	this.r.update();
	// speed/angle normalizer constant?

	return this;
}


// add Velocity/Acceleration/dTime
dlnQuat.prototype.addVAT = function( qV, qA, del ) {
        // (A_1,A_2,B(x,y,z),B_r(x,y,z) ) 
	// B_r_(f,r) = B_r.basis.forward, B_r.basis.right\n    
	// A_1 * dT * ( B \dot B_r_f(cos(dT * B_r)) + B \dot B_r_r(sin(dT * B_r)) ) + A_2 * sin(dT * dT * B_r)i
	const tmpV = new v3(qV.v,del);
	const tmpR = new v3(qV.r,del);

	const tmpVA = new v3(qA.v,del*del/2);
	const tmpRA = new v3(qA.r,del*del/2);
	
	const q = qA.r;

	if( !del ) del = 1.0;

	const nt = q.nL; //Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	const s  = Math.sin( 2*del * qA.r.nL/2 ); // sin/cos are the function of exp()
	const c = 1- Math.cos( 2*del * qA.r.nL/2 ); // '/2 *2' cancels out because this is double-angle
	
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
	// right is 'forward' in the default frame... or it's the default 'normal' of veocity does that matter?

	const aBasis = { right  :{ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) }
	               , up     :{ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) }
	               , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) }
	               };
	// 19 mults, 13 adds
	let accel_vec;

	{
		const nst = Math.sin( del * qA.r.nL/2 ); // sin/cos are the function of exp()
		const qw  = Math.cos( del * qA.r.nL/2 ); // '/2 *2' cancels out because this is double-angle
		
		const qx = qA.r.x*nst;
		const qy = qA.r.y*nst;
		const qz = qA.r.z*nst;
		
		const tx = 2 * (qy * qA.v.z - qz * qA.v.y);
		const ty = 2 * (qz * qA.v.x - qx * qA.v.z);
		const tz = 2 * (qx * qA.v.y - qy * qA.v.x);
		accel_vec = { x : qA.v.x + qw * tx + ( qy * tz - ty * qz )
		            , y : qA.v.y + qw * ty + ( qz * tx - tz * qx )
		            , z : qA.v.z + qw * tz + ( qx * ty - tx * qy ) };
		// 22 mults 12 adds
	}


	const aa =  qA.v.dot( aBasis.up );
	const bb =  qA.v.dot( aBasis.right );

	this.v.add( tmpV );
	this.r.add( tmpR );

	
	const newX = qV.x*del + 1/2*qA.x*del*del
	const newY = qV.y*del + 1/2*qA.y*del*del
	const newZ = qV.z*del + 1/2*qA.z*del*del

	this.x += (newX)/2;
	this.y += (newY)/2;
	this.z += (newZ)/2;
	
	this.xR += qV.xR*del + 1/2*qA.xR*del*del;
	this.yR += qV.yR*del + 1/2*qA.yR*del*del;
	this.zR += qV.zR*del + 1/2*qA.zR*del*del;

	this.dirty = true;
	return this;
}

dlnQuat.prototype.add = function( qV, qA, del ) {
}

dlnQuat.prototype.getBasisT = function( del ) {
	const q = this.r;

	if( !del ) del = 1.0;

	const nt = q.nL; //Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
	const c = 1- Math.cos( del * nt ); // '/2 *2' cancels out because this is double-angle
	
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
	
	const basis = { right  :{ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) }
	              , up     :{ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) }
	              , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) }
	              };

	return {
		location : this.position.v,
		forward  : basis.forward,
		right    : basis.right,
		up       : basis.up
	};
}

dlnQuat.prototype.addNew = function( q ) {
	return new dlnQuat().add(this).add(q);
}


// -------------------------------------------------------------------------------
//  Dual Log Quaternion
// -------------------------------------------------------------------------------


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

dlnQuat.prototype.eqSub = function( a, b ) {
	this.v.sub2( a.v, b.v );
	this.v.sub2( a.r, b.r );
	
	this.dirty = true;
	return this;
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


function quatToLogQuat( q ) {

	const w = q.w;
	const r = 1;//Math.sqrt(x*x+y*y+z*z);
	const ang = acos(w)*2;
	const s = Math.sin(ang/2);
	if( !s ) {
		const l = Math.sqrt(q.x*q.x + q.y*q.y + q.z*q.z );
		if( l )
			return new lnQuat( 0, q.x/l, yt/l, zt/l ).update();	
		else
			return new lnQuat( 0, 0,1,0 ).update();	
	}
	const x = q.x/s;
	const y = q.y/s;
	const z = q.z/s;
	{
		const l = Math.sqrt(x*x + y*y + z*z );
		if( Math.abs( 1.0 - l ) > 0.001 ) console.log( "Input quat was denormalized", l );
	}

	const xt = x;
	const yt = y;
	const zt = z;
	return new lnQuat( ang, xt, yt, zt ).update();
}

