
// Object relative orientation and position is represented with a dualLnQuat with( angleUp, lookAtNormal ), (my position within parent)

/* The 'world' would be started with a dual-quat */

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;
// how much of an angle is required before a thing is 'turning'
// this is like in radians per tick... 
// tick = (1000/1) ticks/second
// 1/10,000th of 1/2pi (so like * 6.2)
const NO_TURN_ANGLE = 0.000_000_01;  
const SIN_R_OVER_R_MIN = 0.00001;

const SQ = true; // square normal to apply.... normal won't be a normal

/*
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

// -------------------------------------------------------------------------------
//  Log Quaternion (Rotation part)
// -------------------------------------------------------------------------------


function lnQuat( theta, d, a, b ){
	this.w = 0;
	if( "undefined" !== typeof theta ) {
		if( "undefined" !== typeof a ) {
			//if( ASSERT ) if( theta) throw new Error( "Why? I mean theta is always on the unit circle; else not a unit projection..." );
			// create with 4 raw coordinates
			this.w = theta;
			
			this.x = d;
			this.y = a;
			this.z = b;
			this.s  = Math.sin(this.w/2);
			this.qw = Math.cos(this.w/2);
		}else {
			if( "object" === typeof theta ) {
				if( "a" in theta ) {
// angle-angle-angle  {a:,b:,c:}
					this.w = (Math.abs(theta.a)+Math.abs(theta.b)+Math.abs(theta.c));
					this.x = theta.a;
					this.y = theta.b;
					this.z = theta.c;
					this.s = 0;
					this.qw = 0;
					this.update();
					return;
				}
				else if( "x" in theta )
				{
// x/y/z normal (no spin, based at 'north' (0,1,0) )  {x:,y:,z:}
					// normal conversion is linear.
					const l2 = (Math.abs(theta.x)+Math.abs(theta.y)+Math.abs(theta.z));
					const l3 = Math.sqrt(theta.x*theta.x+theta.y*theta.y+theta.z*theta.z);
					//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );

					const r = 3/l2;
					let tx = theta.x*r, ty = theta.y/l3, tz = theta.z* r;

					const r2_ = 1/(2*(Math.abs(tx)+Math.abs(tz))); // poles = 0
					const r2x = r2_>0.001 ? tz*r2_  : 0; // this is actually hard to reach witout being absolutely in this direction.
					const r2z = r2_>0.001 ? -tx*r2_  : 1; // or exactly opposite of the Y polar axis
					// primary circle.

					// this is the great circle through the Y axis turned by the angle of the normal
					// the arc around the circle is the acos(Y) of the normal
					// y == 1 : acos = 0;  y == 0 :acos = Pi/2;  Y = -1 : acos = PI
					if( ty < -1 ) ty = -1; if ( ty > 1 ) ty = 1;
					this.w = Math.acos( ty ); // 1->-1 (angle from pole around this circle.
					this.x = r2x*this.w;
					this.y = 0;//0.1*this.w;
					this.z = r2z*this.w;
					this.s = 0;
					this.qw = 0;
					if( Number.isNaN(this.w)) debugger;
					this.update();

					if(0) { // nope/ still can't just 'twist' the target... have to re-resolve back to beginning
						const norm = this.apply( {x:0,y:1,z:0} );
						
						//const nl = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
						if(  1 ) {
							const del = Math.asin(1-norm.y);
							
							//const nx = this.x/nl;
							//const ny = this.y/nl;
							//const nz = this.z/nl;
							this.x += (this.x<0?-1:1)*del;
							this.y += (this.y<0?-1:1)*del;
							this.z += (this.z<0?-1:1)*del;
							this.update();
						}
					}
					return;
				}
			}
// angle - normal (angle, {x:,y:,z:} )
			const dl = 1/Math.sqrt( d.x*d.x + d.y*d.y + d.z*d.z );
			const t  = theta;
			// if no rotation, then nothing.
			if( Math.abs(t) > NO_TURN_ANGLE ) {
				// 'proper' initialization would compute the quaternion, and take the log of it.
				// computation of the quaterion is just to fill in the 'w' part; which is (properly) 0.
				//  -- So this is (make a (normalized)quaternion)
				//const ct2 = Math.cos( t );  // sqrt( 1/2(1 + cos theta))  // half angle subst
				//const st2 = Math.sin( t );  // sqrt( 1/2(1 - cos theta))  // half angle subst
				//const w = ct2;
				//const x = dl * d.x * st2;
				//const y = dl * d.y * st2;
				//const z = dl * d.z * st2;
				//const r  = w*w + x*x+y*y+z*z ;
				//console.log( "D PART:", dl*dl*d.x*d.x, dl*dl*d.y*d.y, dl*dl*d.z*d.z, dl*dl*d.x*d.x+dl*dl*d.y*d.y+dl*dl*d.z*d.z );
				//console.log( "CTST PART:", ct2*ct2 + st2*st2 );
				// ------- Simplification of the above math -----------------------
				//  w                        * w                          +  st2*st2                                     
				//               *  ( dl*dx * dl*dx + dl*dy * dl*dy + dl*dz * dl*dz )
				// sqrt( 1/2(1 + cos theta)) * sqrt( 1/2(1 + cos theta))  + sqrt( 1/2(1 - cos theta))*sqrt( 1/2(1 - cos theta)) 
				//               * ( x*x+y*y+z*z )
				// 1/2(1 + cos theta)  + 1/2(1 - cos theta) * ( x*x+y*y+z*z )
				// 1/2(1 + cos theta)  + 1/2(1 - cos theta) * (1)
				// 1/2 ( 1 + cos theta + 1 - cos theta)
				// 1
				//console.log( "Calculate log:", theta, "R=", r, "D=",d, "DL=", (x*x+y*y+z*z), st2*st2, "W=", 0.5* Math.log(r), Math.log(dl) )

				//this.w = 0; // r is always 1.  0.5* Math.log(r);    // 0.5 is sqrt() moved outside
				this.x = (d.x * dl) * theta/(Math.PI*2);
				this.y = (d.y * dl) * theta/(Math.PI*2);
				this.z = (d.z * dl) * theta/(Math.PI*2);
				this.w = (Math.abs(this.z)+Math.abs(this.y)+Math.abs(this.z)); ;
				// initial creation will allow more 'accuracy' than application...
				this.s  = 0;
				this.qw = 0;
				this.update();
				return;
				//console.log( "??", this );
			}else {
				this.x = 0;
				this.y = 0;
				this.z = 0;
				this.s  = 0; // sin(r)/r -> 1
				this.qw = 1;
			}
		}
	} else {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.s  = 0;
		this.qw = 1;
	}
}

lnQuat.prototype.update = function() {
	// sqrt, 3 mul 2 add 1 div 1 sin 1 cos
	this.w = (Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z));
	this.s  = Math.sin(this.w);
	this.qw = Math.cos(this.w);
	return this;
}

lnQuat.prototype.exp = function() {
	const q = this;
	const s  = this.s;
	console.log( "lnQuat ln() is disabled until integrated with a quaternion library." );
	return null;//new Quat( this.qw, q.x *q.x* s, q.y *q.y* s, q.z *q.z * s );
}

lnQuat.prototype.addNormal = function( q2 ) {
	return lnQuatAdd( this, q2, 1 );
}

function lnQuatSub( q, q2, s ) {
	if( !s ) s = 1;
	q.x = q.x - q2.x * s;
	q.y = q.y - q2.y * s;
	q.z = q.z - q2.z * s;
	return q;
}

function lnQuatAdd( q, q2, s ) {
	if( !s ) s = 1;
	q.x = q.x + q2.x * s;
	q.x = q.y + q2.y * s;
	q.x = q.z + q2.z * s;
	q.w = Math.abs(nqx) + Math.abs(nqy) + Math.abs(nqz);
	return q;
}


// returns the number of complete rotations removed; updates this to principal angle values.
lnQuat.prototype.prinicpal = function() {
	return new lnQuat( { a:( (this.x + Math.PI) % (Math.PI*2) ) - Math.PI*2
	                   , b:( (this.y + Math.PI) % (Math.PI*2) ) - Math.PI*2
	                   , c:( (this.z + Math.PI) % (Math.PI*2) ) - Math.PI*2} );
}

lnQuat.prototype.getTurns =  function() {
	const q = new lnQuat();
	const r = this.w;
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
	const q = this;
	this.w += (turns*2*Math.PI);
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
	const nt = Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	if( !nt ) {
		return {forward:{x:0,y:0,z:1}, right:{x:1,y:0,z:0}, up:{x:0,y:1,z:0}, origin:{x:0,y:0,z:0 }};
	}
	const nst = Math.sqrt(q.x*q.x+q.y*q.y+q.z*q.z);
	const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
	const qw = Math.cos( del * nt ); // sin/cos are the function of exp()

	//L = r x p 
	// this.w * this.w = Centripetal force basis
	// 	
	const ds = qw;
	const dqw = s/nst;

	const qx = q.x * dqw; // normalizes the imaginary parts
	const qy = q.y * dqw; // set the sin of their composite angle as their total
	const qz = q.z * dqw; // output = 1(unit vector) * sin  in  x,y,z parts.

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

	// V = v eHat_r + r dTh/dT * eHat_t + r * dphi/Dt * sinT * eHat_phi

	return basis;	
}


lnQuat.prototype.getRelativeBasis = function( q2 ) {
	const q = this;
	const r = new lnQuat( this.x, this.y, this.z, this.w );
	const dq = lnSubQuat( q2 );
	return getBasis( dq );
}

lnQuat.prototype.getBasis = function(){return this.getBasisT(1.0) };

lnQuat.prototype.apply = function( v ) {
	//return this.applyDel( v, 1.0 );
	const q = this;

	// 3+2 +sqrt+exp+sin
        if( !q.w ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	// call update() ?
	// q.s and q.qw are set in update(); they are constants for a quat in a location.

	// this operation has to have the square normal... 

	// can truncate to just 1 full rotation total in each direction
	// and apply the principal angle at any time T instead of diminishing.
	const px = (q.x % (Math.PI));
	const py = (q.y % (Math.PI));
	const pz = (q.z % (Math.PI));
	const pl = (Math.abs(px)+Math.abs(py)+Math.abs(pz) );
	const p2l = 3/(pl);
	const nst = 1/Math.sqrt(px*px+py*py+pz*pz);
	const s  = Math.sin( pl );//q.s;
	const qw = Math.cos( pl );

	// sin(theta)/r
	const dqw = s;
	const p2x = px*nst;
	const p2y = py*nst;
	const p2z = pz*nst;
	//console.log( "L:", p2x, p2y, p2z, p2x*p2x+p2y*p2y+p2z*p2z);

	const qx = p2x*s;//q.x * dqw;
	const qy = p2y*s;//q.y * dqw;
	const qz = p2z*s;//q.z * dqw;

	//p’ = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w – v.dot(v))
	const tx = 2 * (qy * v.z - qz * v.y);  
	const ty = 2 * (qz * v.x - qx * v.z);  // qx vz
	const tz = 2 * (qx * v.y - qy * v.x);  // qx vy
	return { x : v.x + qw * tx + ( qy * tz - ty * qz )   // 
	       , y : v.y + qw * ty + ( qz * tx - tz * qx )   // qx tz(qx vy)
	       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };// qx ty(qx vz)
	//    3 registers (temp variables, caculated with sin/cos/sqrt,...)
	// 18+12 (30)   12(2)+(3) (17 parallel)

	// total 
	// 21 mul + 9 add  (+ some; not updated)
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
	// 3+2 +sqrt+exp+sin
	const nt = Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
        if( !nt ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}

	const nst = Math.sqrt(q.x*q.x+q.y*q.y+q.z*q.z);
	const s  = Math.sin( del * nt );
	const qw = Math.cos( del * nt );

	// sin(theta)/r
	const dqw = s/nst;

	const qx = q.x * dqw; // normalizes the imaginary parts
	const qy = q.y * dqw; // set the sin of their composite angle as their total
	const qz = q.z * dqw; // output = 1(unit vector) * sin  in  x,y,z parts.

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

lnQuat.prototype.applyInv = function( v ) {
	//x y z w l
	const q = this;

	const nt = Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
        if( !nt ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}

	const nst = Math.sqrt(q.x*q.x+q.y*q.y+q.z*q.z);
	const s  = q.s;
	const qw = q.qw;

	// sin(theta)/r
	const dqw = s/nst;

	const qx = -q.x * s;
	const qy = -q.y * s;
	const qz = -q.z * s;

	const tx = 2 * (qy * v.z - qz * v.y);
	const ty = 2 * (qz * v.x - qx * v.z);
	const tz = 2 * (qx * v.y - qy * v.x);

	return { x : v.x + qw * tx + ( qy * tz - ty * qz )
	       , y : v.y + qw * ty + ( qz * tx - tz * qx )
	       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };

	// total 
	// 21 mul + 9 add
}



function twist( q, angle, zero_angle ) {
	// rebase a quaternion; but given that the need to be relative to the
	// same 'basis' zero of 'Y' as 'up'
	// otherwise I don't know the angle around the new circle to end up at.
/*
	// P defines an axis around which the rotation portion of the matrix
	// is rotated by an amount.
	// coded from http://www.mines.edu/~gmurray/ArbitraryAxisRotation/ArbitraryAxisRotation.html
	// and http://www.siggraph.org/education/materials/HyperGraph/modeling/mod_tran/3drota.htm
   	// and http://astronomy.swin.edu.au/~pbourke/geometry/rotate/
	TRANSFORM t;
	PTRANSFORM T = pt;
	RCOORD Len = //EXTERNAL_NAME(Length)( p );
	RCOORD Cos = COS(amount);
	RCOORD Sin = SIN(amount);
	RCOORD normal;

	// actually the only parts of the matrix resulting
	// will only be the rotation matrix, for which we are
	// building an absolute translation... which may be saved by
	// passing an identity filled transform... but anyhow...
	// the noise in the speed, accel, etc resulting from uninitialized
	// stack space being used for the transform this is building, matters
   // not at all.
	pt = &t;
	//SetPoint( _v, p );
	//normalize( _v );
	const u = q.x;
	const v = q.z;
	const up = q.y;
	// okay this is rude and ugly, and could be optimized a bit
	// but we do have a short stack and 3 are already gone.
	normal = u*u+v*v+up*up;
	pt->m[0][0] = u * u + ( v * v + up * up ) * Cos
	      ;
	pt->m[0][1] = u*v * ( 1-Cos ) - up * Len * Sin
	      ;
	pt->m[0][2] = u*up*(1-Cos) + v*Len * Sin
	      ;
	pt->m[1][0] = u*v*(1-Cos) + up*Len * Sin
	      ;
	pt->m[1][1] = v*v + (u*u+up*up)*Cos
	      ;
	pt->m[1][2] = v*up*(1-Cos)-u*Len*Sin
	      ;
	pt->m[2][0] = u*up*(1-Cos)-v*Len*Sin
	      ;
	pt->m[2][1] = v*up*(1-Cos)+u*Len*Sin
	      ;
	pt->m[2][2] = up*up+(u*u + v*v)*Cos
	      ;
	// oh yeah , be nice, and release these symbols...
	// V is such a common vector variable :)
#undef u
#undef v
#undef up

	EXTERNAL_NAME(ApplyRotationT)( pt, T, T );
*/

}

lnQuat.prototype.add = function( q ) {
	//this.w += q.w;
	this.x += q.x;
	this.y += q.y;
	this.z += q.z;
	// 	// sqrt, 3 mul 2 add 1 div 1 sin 1 cos
	return this.update();
}

// rotate the passed lnQuat by the amount specified.
lnQuat.prototype.addNew = function( q ) {
	return new lnQuat().add(this).add(q).update();
}

// rotate the passed vector 'from' this space
lnQuat.prototype.subNew = function( q ) {
	const qRes = new lnQuat().add( this ).addConj( q );
	return qRes.update();
}

lnQuat.prototype.addConj = function( q ) {
	//this.w += q.w;
	this.x -= q.x;
	this.y -= q.y;
	this.z -= q.z;
	return this.update();
}

// -------------------------------------------------------------------------------
//  Dual Quaternion (offset part)
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

