
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

const world = new dlnQuat( new lnQuat(), new dualQuat() );
// add 0, rotation 0.

const someObject = new dlnQuat( new lnQuat( 0, {x:0, y:0, z:1} ), new dualQuat(0, 0, 10) );
const Tree = new dlnQuat( new lnQuat( 0, {x:0, y:1, z:0} ), new dualQuat(5, 0, -2) );
const treeTop = new dlnQuat( new lnQuat( 0, { x:0, y:1, z:0} ), new dualQuat( 0, 0, 0 ) );
const branch1 = new dlnQuat( new lnQuat( 54/180*Math.PI, { x:0.4, y:0.3, z:0.2} ), new dualQuat( 5, 0, 0 ) );

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
//  Quaternion (Rotation part)
// -------------------------------------------------------------------------------

// 
//   x y z w -> i j k R

function Quat( theta,d, a, b ) {
	if( "undefined" !== typeof theta ) {
		if( "object" === typeof theta ) {
			// normal-up 
			const axis_vector = theta;
			const aL = 1/Math.sqrt(axis_vector.x*axis_vector.x + axis_vector.y*axis_vector.y + axis_vector.z*axis_vector.z );
			axis_vector.x *= aL;
			axis_vector.y *= aL;
			axis_vector.z *= aL;
			const up_vector = {x:0,y:1,z:0};
			const right_vector = { x: axis_vector.y * up_vector.z - up_vector.y * axis_vector.z
					,  y : axis_vector.z * up_vector.x - up_vector.z * axis_vector.x
					, z : axis_vector.x * up_vector.y - up_vector.x * axis_vector.y
					}
			// make sure to normalize the 'right'
			const lR = Math.sqrt( right_vector.x*right_vector.x + right_vector.y*right_vector.y + right_vector.z*right_vector.z );
			if( lR < 0.00001 ) {
				// no certain direction for this normal, but it's gotta be normal to the up.
				right_vector.x = 1;
				right_vector.y = 0;
				right_vector.z = 0;				
			}else {
				const dR = 1/lR;
				right_vector.x *= dR;
				right_vector.y *= dR;
				right_vector.z *= dR;
			}
			theta = -1.0*Math.acos( axis_vector.x*up_vector.x + axis_vector.y*up_vector.y + axis_vector.z*up_vector.z );
			d = right_vector;
		} else {
			if( "undefined" !== typeof a ) {
				// create with 4 raw coordinates
				this.w = theta;
				this.x = d;
				this.y = a;
				this.z = b;
				return;
			}
		}
		const ct2 = Math.cos( theta/2 );
		const st2 = Math.sin( theta/2 );
		this.w = ct2;
		this.x = d.x * st2;
		this.y = d.y * st2;
		this.z = d.z * st2;
	} else {
		this.w = 1;
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}
}

//https://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/
//https://www.html5gamedevs.com/topic/32934-multiply-a-vector3-times-a-quaternion/  (code; credits above)
Quat.prototype.apply = function( v ) {
        const q = this;
	const tx = 2 * (q.y * v.z - q.z * v.y);
	const ty = 2 * (q.z * v.x - q.x * v.z);
	const tz = 2 * (q.x * v.y - q.y * v.x);

	return {  x : v.x + q.w * tx + ( q.y * tz - ty * q.z )
		, y : v.y + q.w * ty + ( q.z * tx - tz * q.x )
		, z : v.z + q.w * tz + ( q.x * ty - tx * q.y ) };
}


Quat.prototype.getBasis = function() {
	const q = this;
	const basis = { right  : this.apply( { x:1, y:0, z:0 })
	              , up     : this.apply( { x:0, y:1, z:0 }) 
	              , forward: this.apply( { x:0, y:0, z:1 }) }; // 1.0
	return basis;
}

Quat.prototype.mul = function( q ) {

      //parse(P, w, x, y, z);

      // Q1 * Q2 = [w1 * w2 - dot(v1, v2), w1 * v2 + w2 * v1 + cross(v1, v2)]
      // Not commutative because cross(v1, v2) != cross(v2, v1)!  ( but cross(v1,v2) = -cross(v2,v1) )

      const w1 = this['w'];
      const x1 = this['x'];
      const y1 = this['y'];
      const z1 = this['z'];

      const w2 = q['w'];
      const x2 = q['x'];
      const y2 = q['y'];
      const z2 = q['z'];

      return new Quat(
              w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
              w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
              w1 * y2 + y1 * w2 + z1 * x2 - x1 * z2,
              w1 * z2 + z1 * w2 + x1 * y2 - y1 * x2);
	// 16+12
}

// multiply the long way; take the logs, add them and reverse the exp().
// validation that P*Q = exp(P.log()+Q.log())
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
	const t  = r>SIN_R_OVER_R_MIN? Math.atan2(r,w)/r: 0;

	const xt = x * t;
	const yt = y * t;
	const zt = z * t;
	return new lnQuat( 0, xt, yt, zt )
}

// -------------------------------------------------------------------------------
//  Log Quaternion (Rotation part)
// -------------------------------------------------------------------------------


function lnQuat( theta, d, a, b ){
	this.w = 0;
	if( "undefined" !== typeof theta ) {
		if( "undefined" !== typeof a ) {
			if( ASSERT ) if( theta) throw new Error( "Why? I mean theta is always on the unit circle; else not a unit projection..." );
			// create with 4 raw coordinates
			this.w = theta; // 0
			this.x = d;
			this.y = a;
			this.z = b;
			this.r = Math.sqrt( d*d + a*a + b*b );
			// initial creation will allow more 'accuracy' than application...
			if( this.r > SIN_R_OVER_R_MIN ) {
				this.s  = Math.sin(this.r)/this.r;
				this.qw = Math.cos(this.r);
			} else {
				this.s  = 1;
				this.qw = 1;
			}
		}else {
			if( "object" === typeof theta ) {

				const axis_vector = theta;
				const aL = 1/Math.sqrt(axis_vector.x*axis_vector.x + axis_vector.y*axis_vector.y + axis_vector.z*axis_vector.z );
				axis_vector.x *= aL;
				axis_vector.y *= aL;
				axis_vector.z *= aL;
				const up_vector = {x:0,y:1,z:0};
				const right_vector = { x:  -axis_vector.z
				                     , y : 0
				                     , z : axis_vector.x
				                     }
			        const lR = Math.sqrt( right_vector.x*right_vector.x + right_vector.z*right_vector.z );
				if( !d && lR > 0.0001 ) {
					const dR = 1/lR;
					right_vector.x *= dR;
					//right_vector.y *= dR;
					right_vector.z *= dR;
					const t = -0.5*Math.acos( axis_vector.y );
	                        
					this.x = right_vector.x * t;
					this.y = 0;//right_vector.y * t;
					this.z = right_vector.z * t;
				}else {
					const up_vector2 = {x:0,y:0,z:1};
					right_vector.x = axis_vector.y;
					right_vector.y = -axis_vector.x;
					right_vector.z = 0;
				        const lR2 = Math.sqrt( right_vector.x*right_vector.x + right_vector.y*right_vector.y );
					if( lR2 < 0.0001 ) {
						// the normal can't be much of a normal afterall... if it's not pointing anywhere I can't figure out where it is pointing.
						throw new Error( "If it's pointing up, any other axis should perpendicular; otherwise bad normal" );
					}
					const dR = 1/lR2;
					//t -= Math.PI/2;  // +/-
					right_vector.x *= dR;
					right_vector.y *= dR;
					//right_vector.z *= dR;

					const t = -0.5*Math.acos( axis_vector.z );
	                        
					this.x = right_vector.x * t;
					this.y = right_vector.y * t;
					this.z = 0;//right_vector.z * t;
					// all we know is the normal is up or down.... but not it's direction.
				}

				this.r = 0;
				this.s = 0;
				this.qw = 0;
				this.update();
				return;
			}
			const dl = 1/Math.sqrt( d.x*d.x + d.y*d.y + d.z*d.z );

			const t  = dl*theta/2;
			// if no rotation, then nothing.
			if( Math.abs(t) > NO_TURN_ANGLE ) {
				// 'proper' initialization would compute the quaternion, and take the log of it.
				// computation of the quaterion is just to fill in the 'w' part; which is (properly) 0.
				//  -- So this is (make a (normalized)quaternion)
				//const ct2 = Math.cos( t );  // sqrt( 1/2(1 + cos theta))  // half angle subst
				//const st2 = Math.sin( t );  // sqrt( 1/2(1 - cos theta))  // half angle subst
				//const w = ct2;               // sqrt( 1/2(1 + cos theta))
				//const x = dl * d.x * st2;    // sqrt( 1/2(1 - cos theta))
				//const y = dl * d.y * st2;    // sqrt( 1/2(1 - cos theta))
				//const z = dl * d.z * st2;    // sqrt( 1/2(1 - cos theta))
				//const r  = w*w + x*x+y*y+z*z ;
				//console.log( "D PART:", dl*dl*d.x*d.x, dl*dl*d.y*d.y, dl*dl*d.z*d.z, dl*dl*d.x*d.x+dl*dl*d.y*d.y+dl*dl*d.z*d.z );
				//console.log( "CTST PART:", ct2*ct2 + st2*st2 );
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
				this.x = d.x * t;
				this.y = d.y * t;
				this.z = d.z * t;
				this.r = t/dl;
				// initial creation will allow more 'accuracy' than application...
				this.s  = Math.sin(this.r)/this.r;
				this.qw = Math.cos(this.r);
				console.log( "??", this );
			}else {
				this.x = 0;
				this.y = 0;
				this.z = 0;
				this.r = 0;
				this.s  = 1; // sin(r)/r -> 1
				this.qw = 1;
			}
		}
	} else {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.r = 0;
		this.s  = 1;
		this.qw = 1;
	}
}

lnQuat.prototype.update = function() {
	// sqrt, 3 mul 2 add 1 div 1 sin 1 cos
	if( (this.r  = Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z ) ) > SIN_R_OVER_R_MIN ) {
		this.s  = Math.sin(this.r)/this.r;
		this.qw = Math.cos(this.r);
	} else {
		this.s = 0;
		this.qw = 1;
	}
	return this;
}

lnQuat.prototype.exp = function() {
	const q = this;
	//const r  = this.r;//Math.sqrt( q.x*q.x + q.y*q.y + q.z*q.z) ;
	//const et = 1;//Math.exp(q.w);
	const s  = this.s;//r>=SIN_R_OVER_R_MIN? /* et* */Math.sin(r)/r: 0;
	return new Quat( this.qw, q.x * s, q.y * s, q.z * s );
}

// returns the number of complete rotations removed; updates this to principal angle values.
lnQuat.prototype.prinicpal = function() {
	const q = new lnQuat();
	const r = this.r;
	const rMod  = Math.mod( r, (2*Math.PI) );
	const rDrop = r - rMod;
	
	if( ( rDrop / (Math.PI*2) ) > 0.5 )
	{
		// has a wrap; so update to principle angle values
		const rDiv = rMod/r;
		q.x = this.x * rDiv;
		q.y = this.y * rDiv;
		q.z = this.z * rDiv;
	}
	return q; // return removed part in 'turns' units
}

lnQuat.prototype.getTurns =  function() {
	const q = new lnQuat();
	const r = this.r;
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
	const r  = q.r;
	
	const rDiv = (q.r+(turns*2*Math.PI))/r;
	this.x *= rDiv;
	this.y *= rDiv;
	this.z *= rDiv;
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


lnQuat.prototype.getBasis = function(del) {
	const q = this;

	if( !del ) del = 1.0;
	const basis = { forward:null
	              , right:null
	              , up:null
	              , origin: { x:0, y:0, z:0 } };
	if( q.w ) console.log( "0 +/- 0 is not 0?" );

	// 6+2 +sqrt+cos+sin
	const r  = this.r;
	//const et = 1;//Math.exp(q.w);
	if( r >= SIN_R_OVER_R_MIN ) {
		
		const s  = Math.sin( del* Math.asin(q.s*q.r) );
	        
		const qw = Math.cos( Math.acos(q.qw) * del );
		const qx = q.x * s /q.r;
		const qy = q.y * s /q.r;
		const qz = q.z * s /q.r;
		
		// 24+6
		{
			const ty = 2 * (qz);
			const tz = 2 * (-qy);

		 	basis.right = { x : 1 + 0       + ( qy * tz - ty * qz )
			              , y : 0 + qw * ty + ( 0       - tz * qx )
			              , z : 0 + qw * tz + ( qx * ty - 0 ) };
		}
		{
			const tx = 2 * ( -qz );
			const tz = 2 * (qx );

		 	basis.up = { x : 0 + qw * tx + ( qy * tz - 0 )
			           , y : 1 + 0       + ( qz * tx - tz * qx )
			           , z : 0 + qw * tz + ( 0       - tx * qy ) };
		}
		{
			const tx = 2 * (qy  );
			const ty = 2 * (- qx);

		 	basis.forward = { x : 0 + qw * tx + ( 0 - ty * qz )
			                , y : 0 + qw * ty + ( qz * tx - 0 )
			                , z : 1 + 0       + ( qx * ty - tx * qy ) };
		}
	} else {
		basis.right   = { x:1, y:0, z:0 };
		basis.up      = { x:0, y:1, z:0 };
		basis.forward = { x:0, y:0, z:1 };
	}
	return basis;	
}

lnQuat.prototype.apply = function( v, del ) {
	const q = this;
	if( 'undefined' === typeof del ) del = 1.0;
	// 3+2 +sqrt+exp+sin
        if( !q.r ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	const s  = (del==1)?q.s:(del ===0 )?1:Math.sin(del*Math.asin(q.s*q.r))/q.r;
	const qw = (del==1)?q.qw:Math.cos(del*Math.acos(q.qw));

	const qx = q.x * s * del;
	const qy = q.y * s * del;
	const qz = q.z * s * del;

	//p’ = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w – v.dot(v))
	const tx = 2 * (qy * v.z - qz * v.y);
	const ty = 2 * (qz * v.x - qx * v.z);
	const tz = 2 * (qx * v.y - qy * v.x);
	return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		, y : v.y + qw * ty + ( qz * tx - tz * qx )
		, z : v.z + qw * tz + ( qx * ty - tx * qy ) };

	// total 
	// 21 mul + 9 add
}


function ReView( lnQ1 ) {
	const lnAux = { x:Math.PI/4, y:0, z:0, r : Math.PI/4, s:Math.sin(Math.PI/2)/(Math.PI/4) };
	const lnReal = { x:0, y:1, z:0, r : 1, s:1 };

	// lnQ1.y * lnReal.z - lnQ1.z * lnReal.y
	// lnQ1.z * lnReal.x - lnQ1.x * lnreal.z
	// lnQ1.x * lnReal.y - lnQ1.y * lnReal.x

	// lnQ1.y * 0 - 0/*lnQ1.z*/ * 1
	// lnQ1.z * 0 - lnQ1.x * 0
	// lnQ1.x * 1 - lnQ1.y * 0


//   cross nac, nab
	const cross1 = { x : 0
                  , y : 0
                  , z : lnQ1.x
		}
	console.log( "cross:", lnQ1, lnAux, cross1, Math.sqrt( lnQ1.x*lnQ1.x + lnQ1.z*lnQ1.z ), lnQ1.s*lnQ1.r, Math.sqrt(lnQ1.x*lnQ1.x+lnQ1.y*lnQ1.y+lnQ1.z*lnQ1.z) );

	// 1 should be (sin_B/sin_b)
	const sin_b = 1;
	const sin_B = 1;

	const sin_A = lnQ1.y;  // sin is the Y, 90 degrees, this is 1; at 0 degrees, this is 0
	const sin_a = sin_A;

	const sin_c = lnQ1.s*lnQ1.r;
	const sin_C = sin_c;
	
	const sin_GC_new = sin_A * sin_C;

	console.log( "sinA = ", sin_A, Math.asin(sin_A));
	console.log( "sina = ", sin_a, Math.asin(sin_a));

	console.log( "sinB = ", sin_B, Math.asin(sin_B));
	console.log( "sinb = ", sin_b, Math.asin(sin_b));

	console.log( "sinC = ", sin_C, Math.asin(sin_C));
	console.log( "sinc = ", sin_c, Math.asin(sin_c));

	// angle is Math.acos( lnQ1.y );

	// 
	//const cos_a = sin_c * cos_A;  // angle of rotation to use.
	//const sin_a = Math.sqrt(1 - cos_a*cos_a);

//	console.log( "sin_b, cos_a:", sin_a*sin_c, sin_A, (sin_a*sin_c)/sin_A, sin_b, Math.asin(sin_b), cos_a, Math.acos(cos_a) );

//	const sin_C = ( sin_a * sin_c ) / sin_;
	const cos_C = Math.sqrt(1 - (sin_GC_new*sin_GC_new));

//	console.log( "sin_a, sin_C:", Math.asin( (lnQ1.s * lnQ1.r)) , sin_a, Math.asin(sin_a), sin_C, Math.asin(sin_C) );
//	console.log( "cos_C:", cos_C, Math.acos(cos_C), Math.asin( sin_C ) );

	//   so the rotation then is like 
	//  (spin around Y, x->Z)
	
	// normal of great circle in question. (is normalized)
	const nCB = { x :cos_C, y:0, z:-sin_GC_new };  // don't know what the shift is here... 
	// angle to cover on that circle /2
	const theta =  lnQ1.y;//-Math.PI/2;//sin_a;

	const dist = lnQ1.z;
	const dist2 = Math.PI/2-lnQ1.y;
	
	console.log( "theta:", nCB, theta );
	
	return new lnQuat( 0, nCB.x * theta, nCB.y * theta, nCB.z * theta );
}

lnQuat.prototype.applyInv = function( v ) {
	//x y z w l
	const q = this;

        if( !q.r ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	const s  = q.s;
	const qw = q.qw;

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


if( test )       {
	test1();
	function test1() {

		console.log( "Normal x:", new Quat( 1, { x:1, y:0, z:0 } ).log() );
		console.log( "Normal y:", new Quat( 1, { x:0, y:1, z:0 } ).log() );
		console.log( "Normal z:", new Quat( 1, { x:0, y:0, z:1 } ).log() );
		console.log( "Normal (5,2,0):", new Quat( { x:5, y:2, z:0 } ).log() );
		console.log( "Normal (5,2,0):", new lnQuat( { x:5, y:2, z:0 } ) );
		const Q_n1 = new Quat( { x:5, y:2, z:1 } );
		const p1 = Q_n1.apply( {x:0,y:1,z:0} );
		console.log( "Normal (5,2,1):", Q_n1.log(), Q_n1.apply( {x:0,y:1,z:0} ), {x:p1.x*5,y:p1.y*5,z:p1.z*5} ) ;

		const lnQ_n1 = new lnQuat( { x:2, y:5, z:1 } );
		const lnQ_n2 = new lnQuat( { x:2, y:5, z:1 }, true );
		const lnQ_n3 = ReView( lnQ_n2 );
	/*
		const lnQ_n3 = new lnQuat();
		
		const lnQ_n2_to_n1 = new lnQuat( -Math.PI/2, { x:1, y:0, z:0 } );   // z -> Y
		lnQ_n3.add( lnQ_n2_to_n1 );
		lnQ_n3.add( lnQ_n2 );

		// target minus Z plus z->Y
		console.log( "Conversion:", lnQ_n2_to_n1, lnQ_n2 );
	*/
		console.log( "Converted:", lnQ_n3 );

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
	}
}
