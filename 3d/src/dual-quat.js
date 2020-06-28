
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
			this.w = theta;
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
			this.s  = Math.sin(this.w/2);
			this.qw = Math.cos(this.w/2);
		}else {
			if( "object" === typeof theta ) {
				if( "a" in theta ) {
// angle-angle-angle  {a:,b:,c:}
					this.x = theta.a;
					this.y = theta.b;
					this.z = theta.c;
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
						const qw = Math.acos( ty ); // 1->-1 (angle from pole around this circle.

						//this.x = tz*(Math.PI*2+qw);
						//this.y = Math.PI*2;
						//this.z = -tx*(Math.PI*2+qw);

						this.x = tz*(0+qw);
						this.y = 0;
						this.z = -tx*(0+qw);
					        
						this.update();
						if(1)
						if(!twisting) { // nope/ still can't just 'twist' the target... have to re-resolve back to beginning
							twisting = true;
							const norm = this.apply( {x:0,y:1,z:0} );
							//norm[1] += 1;
							twist( this, 0*qw /*angle*/, norm );
							twisting = false;
						}
						return;
					}
					else return; // 0 rotation.
				}
			}
// angle - normal (angle, {x:,y:,z:} )
			//theta %= 2*Math.PI;
			//if( theta > Math.PI *2 )
			//	console.log( "...", Math.floor( theta / (Math.PI*2) ) )

			// very long ranges of multiples of turns around the axis is ... bad.
			// the scalar for calculating the axis normal back from the 
			const dl = 1/( Math.abs(d.x) + Math.abs(d.y) + Math.abs(d.z) );
			const t  = theta;
			// if no rotation, then nothing.
			if( Math.abs(t) > 0.000001 ) {
				this.x = (d.x * dl) * theta;
				this.y = (d.y * dl) * theta;
				this.z = (d.z * dl) * theta;
				this.update();
				return;
			}
		}
	} 
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

lnQuat.prototype.getBasisT = function(del) {
	// this is terse; for more documentation see getBasis Method.
	const q = this;

	if( !del ) del = 1.0;
	const nt = this.nL;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	if( !nt ) {
		return {forward:{x:0,y:0,z:1}, right:{x:1,y:0,z:0}, up:{x:0,y:1,z:0}, origin:{x:0,y:0,z:0 }};
	}
	const nst = this.nR;//Math.sqrt(q.x*q.x+q.y*q.y+q.z*q.z);
	const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
	const qw = Math.cos( del * nt ); // sin/cos are the function of exp()

	//L = r x p 
	// this.nL * this.nL = Centripetal force basis
	// 	
	const dqw = s/nst;

	const qx = q.x * dqw; // normalizes the imaginary parts
	const qy = q.y * dqw; // set the sin of their composite angle as their total
	const qz = q.z * dqw; // output = 1(unit vector) * sin  in  x,y,z parts.

	// V = v eHat_r + r dTh/dT * eHat_t + r * dphi/Dt * sinT * eHat_phi
	const basis = { forward:null
	              , right:null
	              , up:null
	              , origin: { x:0, y:0, z:0 } };
	{
		const tx = 2 * ( -qz );
		const tz = 2 * (qx );
		basis.up = { x :     qw * tx + qy * tz
		           , y : 1           + qz * tx - tz * qx
		           , z :     qw * tz           - tx * qy };
	}
	{
		
		// for apply, this is cross(q,some point)
		const ty = 2 * (qz);
		const tz = 2 * (-qy);
	 	basis.right = { x : 1           + ( qy * tz - ty * qz )
		              , y :     qw * ty + (         - tz * qx )
		              , z :     qw * tz + ( qx * ty ) };
	}

	{
		// direct calculation of 'z' rotated by the vector.
		const tx = 2 * ( qy );
		const ty = 2 * (-qx);
	 	basis.forward = { x :     qw * tx + (         - ty * qz )
		                , y :     qw * ty + ( qz * tx )
		                , z : 1 + 0       + ( qx * ty - tx * qy ) };
	}


	return basis;	
}


lnQuat.prototype.getRelativeBasis = function( q2 ) {
	const q = this;
	const r = new lnQuat( 0, this.x, this.y, this.z );
	const dq = lnSubQuat( q2 );
	return getBasis( dq );
}

lnQuat.prototype.getBasis = function(){return this.getBasisT(1.0) };

lnQuat.prototype.update = function() {
	// sqrt, 3 mul 2 add 1 div 1 sin 1 cos
	if( !this.dirty ) return;
	this.dirty = false;

	// norm-rect
	this.nR = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);

	// norm-linear    this is / 3 usually, but the sine lookup would 
	//    adds a /3 back in which reverses it.
	this.nL = (Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z))/2;///(2*Math.PI); // average of total

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
		const tx = 2 * (qy * v.z - qz * v.y);
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

//------------------ What If ---------------

/**
 *  
   Was pondering, what if I took euler angles and made a matrix, and then applied that matrix
   to the point, and how that would simplify.
   I wonder how the below compares with the above axis-axis-axis rotation. ....
   well ... someone can consider the below.  
   (remember then each of those still has to be applied to the point to get a rotation)
 
https://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToMatrix/index.htm
 */

/** this (JAVA) conversion uses NASA standard aeroplane conventions as described on page:
*   https://www.euclideanspace.com/maths/geometry/rotations/euler/index.htm
*   Coordinate System: right hand
*   Positive angle: right hand
*   Order of euler angles: heading first, then attitude, then bank
*   matrix row column ordering:
*   [m00 m01 m02]
*   [m10 m11 m12]
*   [m20 m21 m22]*/
/**
public final void rotate(double heading, double attitude, double bank) {
    // Assuming the angles are in radians.
    double ch = Math.cos(heading);
    double sh = Math.sin(heading);
    double ca = Math.cos(attitude);
    double sa = Math.sin(attitude);
    double cb = Math.cos(bank);
    double sb = Math.sin(bank);

    m00 = ch * ca;
    m01 = sh*sb - ch*sa*cb;
    m02 = ch*sa*sb + sh*cb;
    m10 = sa;
    m11 = ca*cb;
    m12 = -ca*sb;
    m20 = -sh*ca;
    m21 = sh*sa*cb + ch*sb;
    m22 = -sh*sa*sb + ch*cb;
}
*/

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
	        //console.log( "TICK:", q.nL/(3*Math.PI), del );
		const qx = q.x*nst;
		const qy = q.y*nst;
		const qz = q.z*nst;
		//console.log( "L:", p2x, p2y, p2z, p2x*p2x+p2y*p2y+p2z*p2z);
	        
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

// if ( x < z ) 
//    if ( x > 0 )
//    if ( x < 0 )

lnQuat.prototype.twist = function(c){
	return twist( this, c, this );
}


// this specific case, the input is just a 'normal'
// so not only do we 'twist', but we also need to 
// bias to the same rotation point.
function twistNormal( C, th, n ) {
	const del = delwrap( (th+twistDelta/4) );
	const adel = Math.abs( del );
	const sdel = (del<0)?-1:1;

//	console.log( "This is the one I really care about anyway...", del, th );
	const sx = C.x<0?-1:1;
	const sy = C.y<0?-1:1;
	const sz = C.z<0?-1:1;

	const ax = Math.abs(C.x);
	const ay = Math.abs(C.y);
	const az = Math.abs(C.z);
	const angleSum = ax+ay+az;    // max x/y/z

	let zMin,zMid,zMax;
	let yMin,yMid,yMax;
	let xMin,xMid,xMax;

	if( az > ax ) {
		// z is max rotation - principle change.
		// x is mid
		// y is min
		// ** normal case 2

		// N = A+B;
		// 2PI-N= (A'+B');
		// PI-N= (A'' + B'' );
		// M = A/B; 
		zMax = sz*(Math.PI-ax);
		xMax = sx*(Math.PI-az);
		zMid = zMax/2; 
		xMid = xMax/2;
		//zMid = ax;
		yMax = 0;
		yMid = 2*Math.PI - sz*(ax);
		//xMid = 0;
	}else {
		zMax = sz*(Math.PI-ax);
		xMax = sx*(Math.PI-az);
		zMid = zMax/2; 
		xMid = xMax/2;

		
		yMax = Math.PI-(ay - (ax) );
		yMid = 2*Math.PI-ax;

	}
	
	if( adel < 0.5 ) {
		C.x = C.x - del*xMax;
		C.z = C.z - del*zMax;
		C.y = -(del*2) * yMid;
	} else {
		C.y = (1-del)*del;
		C.x = C.x - xMax * ((del-0.5)*2);
		c.z = C.z - zMax * ((del-0.5)*2);
	}
	C.dirty = true;
	return C;
}

function twist( C, th, n ) {
	// rebase a quaternion; but given that the need to be relative to the
	// same 'basis' zero of 'Y' as 'up'
	// otherwise I don't know the angle around the new circle to end up at.
	if( C.y === 0 ) return twistNormal( C, th, n );
	const ax = Math.abs(C.x);
	const ay = Math.abs(C.y);
	const az = Math.abs(C.z);
	const angleSum = ax+ay+az;

	if( ax > ay ) {
		if( az > ax ) {
			// z is max rotation - principle change.
			// x is mid
			// y is min
			// ** normal case 2
			zMax = Math.PI-az;
			zMid = ax;
			yMax = Math.PI-(ay - (ax) );
			yMid = 
			xMax = Math.PI-ax;
			xMid = 0;
			
		} else {
			// x is main rotation 
			if( az > ay ) {
				// z is mid
				// y is min
				// ** normal case 1
			} else {
				// y is mid
				// z is min
			}
		}
	} else {
		if( az > ay ) {
			// az is max
			// ay is mid
			// ax is min
		} else {
			if( az > ax ) {
				// y is max
				// z is mid
				// x is min
			}else {
				// y is max
				// z is mid
				// x is min
			}
		}
	}


	// x/z are sin/cos of angle, times 1 normal length to each... 
	// so square of sum = 1, sqrt = 1 * currentAngle.
	const minAngle = Math.sqrt( C.x*C.x +C.y*C.y +C.z*C.z );
	
	const normal = C.apply( {x:0,y:1,z:0} );
	const CnQ = new lnQuat( th, normal );
	const Crot = CnQ.apply( C );
	console.log( "calc:", th, C, CnQ, Crot );
	C.x += CnQ.x;
	C.y += CnQ.y;
	C.z += CnQ.z;
	C.dirty = true;
	return C;
	//const D = new lnQuat( Math.PI/2, n.x,n.y,n.z );
	//const r = D.applyDel( C, -th/2+twistDelta*3 );
//console.log( "Twist:", twistDelta, D );
	const del = delwrap( (th+twistDelta/4) );
		
	if( del ) {
		if( del < 0 ) {
			maxY = Math.PI-angleSum;
		} else {
			maxY = -Math.PI-angleSum;
		}
		if( angleSum < Math.PI/2 )  {
			if( ( del > 0.5 ) || (del < 0 && del < -0.5 ) ) {
				// outside; past the 'mid point'
			} else {
				// before the 'mid point' (up to +/- 90 degrees)
				// A = A + angleSum * del*A/B
				// B = B + angleSUm * del*B/A
				// BMin = A
		        
				if( ax < az ) { // z is the 'main' axis of rotation.
					//const nx = C.x - C.x * del/2;
					const zdel=(C.z<0?-1:1)*(az-ax+B/10) * (del);
					const nx = C.x + Math.PI*(C.z<0?-1:1)* zdel/2;
					const nz = C.z - Math.PI/angleSum*zdel//(C.z<0?-1:1)*(az-ax+B/10) * (del);
					const ny = C.y - zdel/2 * 2*Math.PI;//- del*(Math.PI-(az+ax))/2;
					C.x = nx; C.y = ny; C.z = nz; C.dirty = true; 
				} else { // x is the 'main' axis of rotation.
					// the min is the cz... 
					const zdel=(C.x<0?-1:1)*(ax-az+B/10) * (del);
					const nx = C.x - zdel;
					const nz = C.z + (C.x<0?1:-1)*zdel/2;
					const ny = C.y - zdel/2 * Math.PI/angleSum;
					C.x = nx; C.y = ny; C.z = nz; C.dirty = true; 
				}
				return C;
			}
                } else {
			if( ( del > 0.5 ) || (del < 0 && del < -0.5 ) ) {
				// outside; past the 'mid point'
			} else {
				// before the 'mid point' (up to +/- 90 degrees)
				// A = A + angleSum * del*A/B
				// B = B + angleSUm * del*B/A
				// BMin = A
				const ax = Math.abs(C.x);
				const az = Math.abs(C.z);
		        
				if( ax < az ) { // z is the 'main' axis of rotation.
					const nx = C.x - C.x * del/2;
					const nz = C.z - (C.z<0?-1:1)*(ax) * (del)+B/10;
					const ny = -del*(3*Math.PI-(ax+az));
					C.x = nx; C.y = ny; C.z = nz; C.dirty = true; 
				} else { // x is the 'main' axis of rotation.
					// the min is the cz... 
					const nx = C.x - (C.x<0?-1:1)*(az) * del;
					const nz = C.z - (C.z) * (del);
					const ny = -del*(3*Math.PI-(ax+az));
					C.x = nx; C.y = ny; C.z = nz; C.dirty = true; 
				}
				return C;
			}
		}
		// throw out any unmodified ones.
		//C.z = angleSum;
		//C.x = 0;
		//C.dirty= true;
		return C;
		// del = (del+1)%2-1;
		// A = 0 + (del*2)*A/B*angleSum

		// B = 0 + (del*2)*A/B*angleSum

		if(1)
		{       // max angle = Math.PI at +/- 90 degrees
			// max angle = 2*Math.PI - maxAngle    at 180 degrees...

			// at first 'right' triangle (90 degrees left/right)
			angle = angleSum - (Math.PI-angleSum)*del; // 180 degrees.
			

			C.y = angle;// maxAngle -(C.z<0?-1:1)* C.x*del*2;
			//C.z = C.z -  del*angleSum;// - C.x;
			//C.x = C.x -  del*angleSum;
			C.dirty = true;
			return C;
			
		}

		// the closest axis leaves the remainder in the longest
		// and the vertical scales by the missing short part... 

		if( Math.abs(C.x)<Math.abs(C.z) ) 
		{       // max angle = Math.PI at +/- 90 degrees
			// max angle = 2*Math.PI - maxAngle    at 180 degrees...

			// at first 'right' triangle (90 degrees left/right)
			angle = Math.PI; // 180 degrees.
			

			C.y = maxAngle -(C.z<0?-1:1)* C.x*del*2;
			C.z = C.z - C.x*del;// - C.x;
			C.x = C.x - C.x*del;
			C.dirty = true;
			return C;
			
		}

		if( Math.abs(C.z)<Math.abs(C.x) ) 
		//if(1)
		{
			C.y = +(C.x<0?-1:1)*C.z*del;
			//C.x = del*C.x;
			C.z = C.z-C.z*del;
			C.dirty = true;
			return C;
			
		}
		C.dirty = true;
		//(C.x<0?1:-1)*
		C.x = C.x +  (C.x<0?1:-1)*del*(C.nL-C.x);
		C.y = -del*2*C.nL;
		C.z = C.z +  (C.z<0?1:-1)*del*(C.nL-C.z);
	} else {
		// no twist.
		return C;
	}
//	C.add(D,th/2+(twistDelta)*3);
	return C.update();
	const twist = D.apply( {x:0,y:1,z:0} );
	
	C.x = twist.x;
	C.y = twist.y;
	C.z = twist.z;
	C.update();
	return C;
	//C.x = D.x; C.y=D.y; C.z=D.z; C.update(); return C;
	const CpD = C.add2( D );
	//C.x = CpD.x; C.y=CpD.y; C.z=CpD.z; C.update(); return C;

	// this is basically C again, anyway...
	const F = new lnQuat( n );

	//C.x = F.x; C.y=F.y; C.z=F.z; C.update(); return C;
// A + B = C
// C + D = E		
// A + F = E
// A + (D - F) = E ?
//
// 
//  C + D = A + F
//  A - C = F - D
//  -B = F-D
//  B = D-F

	//console.log( " input:", q, th, n, D, CpD, E, F );
	C.x = D.x - F.x;
	C.y = D.y - F.y;
	C.z = D.z - F.z;
	C.update();
	//console.log( "output:", q );
	return C;
	// v is now the total rotation
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

