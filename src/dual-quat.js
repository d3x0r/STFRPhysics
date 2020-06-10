


/*
transforming a point

 t = 2 * cross(q.xyz, v) ;  v' = v + q.w * t + cross(q.xyz, t)  <-- actull application of quat to vector to get resulting rotated v' ...    t, v are 3vectors and q is a quaternion
[09:57:47] <d3x0r> vsqr = pow(q.xyz,2.0); vlen = vsqr.x+vsqr.y+vsqr.z;



 vsqr = pow(q.xyz,2.0); vlen = vsqr.x+vsqr.y+vsqr.z; q' = exp(q.w) * ( cos(vlen) + q.xyz/vlen*sin(vlen) )  
[09:58:17] <d3x0r> is sort of simple enough - but actually the vlen factor can be kept as a scalar so the lnq is actual
*/

const test = true;


// 
//   x y z w -> i j k R

function Quat( theta,d, a, b ) {
	if( theta ) {
		if( "undefined" !== typeof a ) {
			// create with 4 raw coordinates
			this.w = theta;
			this.x = d;
			this.y = a;
			this.z = b;
			return;
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

Quat.prototype.apply = function( v ) {
        const q = this;
	const tx = 2 * (q.y * v.z - q.z * v.x);
	const ty = 2 * (q.y * v.x - q.x * v.y);
	const tz = 2 * (q.z * v.y - q.y * v.z);

	return {  x: v.x + q.w * tx + ( q.y * tz - ty * q.z )
		, y : v.y + q.w * ty + ( q.z * tx - tz * q.x )
		, z : v.z + q.w * tz + ( q.x * ty - tx * q.y ) };
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


Quat.prototype.mulLong = function( q ) {
	const lnThis = this.log();
	const lnQ = q.log();
	lnThis.add( lnQ );
	const r = lnThis.exp();
	console.log( "?", r, lnThis, lnQ );
	return r;
}

Quat.prototype.log = function( ) {
	const x = this.x;
	const y = this.y;
	const z = this.z;
	const w = this.w;

	const r  = Math.sqrt(x*x+y*y+z*z);
	const t  = r>0.00001? Math.atan2(r,w)/r: 0;

	const xt = this.x * t;
	const yt = this.y * t;
	const zt = this.z * t;

	return new lnQuat( 0.5* Math.log(w*w+x*x+y*y+z*z), xt, yt, zt )
}



function lnQuat( theta, d, a, b ){
	if( theta ) {
		if( "undefined" !== typeof a ) {
			// create with 4 raw coordinates
			this.w = theta;
			this.x = d;
			this.y = a;
			this.z = b;
		}else {
			this.w = Math.log(theta);
			this.x = d.x * theta;
			this.y = d.y * theta;
			this.z = d.z * theta;
		}
	} else {
		this.w = 1;
		this.x = 0;
		this.y = 0;
		this.z = 0;
	}
}


var exp = function (q) {
    // assert q[0] === 0
    var a = distance(q);
    if (a === 0) return unit;
    var sin = Math.sin(a);
    var t = sin / a;
    return [Math.cos(a), t * q[1], t * q[2], t * q[3]];
};


lnQuat.prototype.exp = function() {
	const q = this;
	const r  = Math.sqrt( q.x*q.x + q.y*q.y + q.z*q.z) ;
	const et = Math.exp(q.w);
	const s  = r>=0.00001? et*Math.sin(r)/r: 0;

	return new Quat( et*Math.cos(r), q.x * s, q.y * s, q.z * s );
}


lnQuat.prototype.expApply = function( v ) {
	//x y z w l
	const q = this;

	// 3+2 +sqrt+exp+sin
	const r  = Math.sqrt( q.x*q.x + q.y*q.y + q.z*q.z) ;
	const et = Math.exp(q.w);
	const s  = r>=0.00001? et*Math.sin(r)/r: 0;

	// 4+0 +cos
	// 2+0 +cos
	const qw = et*Math.cos(r);
	const qx = q.x * s;
	const qy = q.y * s;
	const qz = q.z * s;

        if( !r ) {
		// v is unmodified.	
		return {x:v.x, y:v.y; z:v.z }; // 1.0
	}
	// 9+3
	// 7+1
	const tx = 2 * (qy * v.z - qz * v.x);
	const ty = 2 * (qy * v.x - qx * v.y);
	const tz = 2 * (qz * v.y - qy * v.z);

	// 9+9
	// 7+1
	return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		, y : v.y + qw * ty + ( qz * tx - tz * qx )
		, z : v.z + qw * tz + ( qx * ty - tx * qy ) };

	// total 
	// 27+14 +sqrt+exp+sin+cos
	// 21+4 +sqrt+exp+sin+cos (parallel-ish)
}


lnQuat.prototype.add = function( q ) {
	this.w += q.w;
	this.x += q.x;
	this.y += q.y;
	this.z += q.z;
}

// rotate the passed lnQuat by the amount specified.
lnQuat.prototype.addNew = function( q ) {
	return new lnQuat( this.w + q.w, this.x + q.x, this.y + q.y, this.z + q.z );
}

// rotate the passed vector 'from' this space
lnQuat.prototype.subNew = function( q ) {
	return new lnQuat( q.w - this.w, q.x - this.x, q.y - this.y, q.z - this.z );
}

lnQuat.prototype.addConj = function( q ) {
	this.w += q.w;
	this.x -= q.x;
	this.y -= q.y;
	this.z -= q.z;
}

function dQuat( x, y z ) {
	this.w = 1.0;
	this.x = x;
	this.y = y;
	this.z = z;
}

dQuat.prototype.add = function( q ) {
	return new dQuat( this.w+q.w, this.x+q.x, this.y + q.y, this.z + q.z );
}

// dual log-quat
//   log qaut keeps the orientation of the frame
//   dual of the quat keeps the offset of the origin of that quat.
//   it forms the orgin of a set of basis vectors describing the x-y-z space.

function dlnQuat( lnQ, dQ ) {
	this.lnQ = lnQ;
	this.dQ = dQ;
}

// Apply just the rotation to a point.
dlnQuat.prototype.applyRotation( v ) {
	return this.lnq.expApply( v );
}

// Apply just the rotation to a point.
dlnQuat.prototype.applyInvRotation( v ) {
	
	return this.lnq.expApply( v );
}

// Apply just the rotation to a point.
dlnQuat.prototype.applyRotationQ( q ) {
	if( !q instance of lnQuat ) throw( new Error( "invalid parameter passed to applyRotationQ" ) );
	return this.lnQ.addNew( q );
}

dlnQuat.prototype.applyTransform( v ) {
	const rV = this.lnq.expApply( v );
	//const rO = this.lnQ.expApply( this.dQ );
	rV.x += this.dQ.x;
	rV.y += this.dQ.y;
	rV.z += this.dQ.z;
	return 
}

// V is in the space of the dual rotated around 0.
dlnQuat.prototype.applyArmTransform( v ) {
	const rV = this.lnq.expApply( v );
	const rO = this.lnQ.expApply( this.dQ );
	rV.x += r0.x;
	rV.y += r0.y;
	rV.z += r0.z;
	return 
}


dlnQuat.prototype.applyArmTransformQ( q ) {
	return new dlnQuat( this.lnQ.addNew( q.lnQ ), this.dQ.addNew( q.dQ ) );
}


dlnQuat.prototype.applyArmTransformQ( q ) {
	// 
	return new dlnQuat( this.lnQ.addNew( q.lnQ ), this.dQ.addNew( q.dQ ) );
}


dlnQuat.prototype.applyArmTransformQ( q ) {
	// 
	return new dlnQuat( this.lnQ.addNew( q.lnQ ), this.dQ.addNew( q.dQ ) );
}


/*



// http://www.neil.dantam.name/papers/dantam2018practical.pdf

// https://maxime-tournier.github.io/notes/quaternions.html#exponential-map-second-derivative

qAC = qAB (cr) qBC

PQ = pq = -p . q + p x q;
  (dot) (cross)
  

QP = 

xy=x×y-xTy

xy =cross(x,y) - xT * y;

conjugate

w = w;
x = -x;
y = -y;
z = -z;


q1 q2 =  w1 w2   - v1 dot v2, w1 v2 + w2 v1 + v1 cross v2 


pq = ... well pq
qp = (pq)*



{\displaystyle {\begin{alignedat}{4}&a_{1}a_{2}&&+a_{1}b_{2}i&&+a_{1}c_{2}j&&+a_{1}d_{2}k\\{}+{}&b_{1}a_{2}i&&+b_{1}b_{2}i^{2}&&+b_{1}c_{2}ij&&+b_{1}d_{2}ik\\{}+{}&c_{1}a_{2}j&&+c_{1}b_{2}ji&&+c_{1}c_{2}j^{2}&&+c_{1}d_{2}jk\\{}+{}&d_{1}a_{2}k&&+d_{1}b_{2}ki&&+d_{1}c_{2}kj&&+d_{1}d_{2}k^{2}\end{alignedat}}}


	 The conjugate of a product of two quaternions is the product of the conjugates in the reverse order. That is, if p and q are quaternions, then (pq)* = q*p*, not p*q*.   qp = 
	 
	 q* = -1/2 ( q + iqi + jqj + kqk )
	 

The conjugation of a quaternion, in stark contrast to the complex setting, can be expressed with multiplication and addition of quaternions:
http://graphics.stanford.edu/courses/cs348a-17-winter/Papers/quaternion.pdf

, Q¯0 = Q00 + Q01i and  Q¯1 = Q10 + Q11i,


Q = Q¯0 + Q¯1j (18)
= (Q00 + Q01i)+(Q10 + Q11i)j (19)
= Q00 + Q01i + Q10j + Q11k



log(theta,n)=theta n
Thus, when defined, the derivative of the logarithm satisfies:

dlog(theta,n)=dtheta n+ thetadn



q* = -1/2 ( q + iqi + jqj + kqk )

q*.x = -1/2 ( q.x + (-q.x + q.yji + q.zki) + (q.xji -q.y + q.zjk ) + ( q.xki + q.ykj - q.z ) )

                 q.xji + q.yji   
		 q.zki + q.xki
		 q.yjk + q.zjk

*/


if( test )       {
	test1();
	function test1() {
		const q1 = new Quat( 30/ 180 * Math.PI, {x:0.5773, y:0.57735026919, z:0.57735026919 } );
		const q2 = new Quat( 17/ 180 * Math.PI, {x:0.5773, y:0.57735026919, z:0.57735026919 } );

		const lnq1 = q1.log();
		const lnq2 = q2.log();
		console.log( "q1:", q1, "q2:", q2 );
		const q1q2a = q1.mul( q2 );
		const q1q2b = q1.mulLong( q2 );
		console.log( "a:", q1q2a, "b:", q1q2b );

		const v = { x:2, y:5, z:-3};
		console.log( "q1 v : ", q1.apply(v) );	
		console.log( "q2 v : ", q2.apply(v) );	
		console.log( "lnq1 exp v : ", lnq1.exp().apply(v) );	
		console.log( "lnq2 exp v : ", lnq2.exp().apply(v) );	
		console.log( "lnq1 v : ", lnq1.expApply(v) );	
		console.log( "lnq2 v : ", lnq2.expApply(v) );	

		const lnq1q2 = lnq1.addNew( lnq2 ); // changes 
		console.log( "q1q2 v", q1q2a.apply( v ) );

		console.log( "lnq1q2 v", lnq1q2.expApply( v ) );
		

	}
}
