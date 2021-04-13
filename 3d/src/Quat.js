const SIN_R_OVER_R_MIN = 0.00001

// -------------------------------------------------------------------------------
//  Quaternion (Rotation part)
// -------------------------------------------------------------------------------

// 
//   x y z w -> i j k R

export function Quat( theta,d, a, b ) {
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
		const dL = Math.sqrt(d.x*d.x+d.y*d.y+d.z*d.z);
		if( dL ) {
			this.x = d.x * st2 / dL;
			this.y = d.y * st2 / dL;
			this.z = d.z * st2 / dL;
		}else {
			this.x = 0 * st2;
			this.y = 1 * st2;
			this.z = 0 * st2;
		}

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

Quat.prototype.mulConj = function( q ) {
      //parse(P, w, x, y, z);
      // Q1 * Q2 = [w1 * w2 - dot(v1, v2), w1 * v2 + w2 * v1 + cross(v1, v2)]
      // Not commutative because cross(v1, v2) != cross(v2, v1)!  ( but cross(v1,v2) = -cross(v2,v1) )

      const w1 = +this['w'];
      const x1 = -this['x'];
      const y1 = -this['y'];
      const z1 = -this['z'];

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

const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
const plusminus = (x)=>mod( x+1,2)-1;
 
const trunc = (x,y)=>x-mod(x,y);

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
	const ang = Math.atan2(r,w)*2;
	if( r < SIN_R_OVER_R_MIN ) {
		// cannot know the direction.
		return new lnQuat( ang, 0, 1, 0 )
	}
	const t  = 1/r;

	const xt = x * t;
	const yt = y * t;
	const zt = z * t;
	return new lnQuat( ang, xt, yt, zt )
}

