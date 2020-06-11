
// Object relative orientation and position is represented with a dualLnQuat with( angleUp, lookAtNormal ), (my position within parent)

/* The 'world' would be started with a dual-quat */


const world = new dlnQuat( new lnQuat(), new dQuat() );
// add 0, rotation 0.

const someObject = new dlnQuat( new lnQuat( 0, {x:0, y:0, z:1} ), new dQuat(0, 0, 10) );
const Tree = new dlnQuat( new lnQuat( 0, {x:0, y:1, z:0} ), new dQuat(5, 0, -2) );
const treeTop = new dlnQuat( new lnQuat( 0, { x:0, y:1, z:0} ), new dQuat( 0, 0, 0 ) );
const branch1 = new dlnQuat( new lnQuat( 54/180*Math.PI, { x:0.4, y:0.3, z:0.2} ), new dQuat( 5, 0, 0 ) );

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


// 
//   x y z w -> i j k R

function Quat( theta,d, a, b ) {
	if( "undefined" !== typeof theta ) {
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


Quat.prototype.getBasis = function() {

	const q = this;

	const basis = { forward:this.apply( {x:0, y:0, z: 1 } )
		, right:this.apply( {x:1, y:0, z: 0 })
	        , up:this.apply( {x:0, y:1, z: 0 }) }; // 1.0
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


Quat.prototype.mulLong = function( q ) {
	const lnThis = this.log();
	const lnQ = q.log();
	lnThis.add( lnQ );
	const r = lnThis.exp();
	//console.log( "?", r, lnThis, lnQ );
	return r;
}

Quat.prototype.log = function( ) {
	const x = this.x;
	const y = this.y;
	const z = this.z;
	const l = 1/Math.sqrt(x*x + y*y + z*z );
	//if( Math.abs( 1.0 - l ) > 0.001 ) console.log( "Input quat was denormalized", l );

	const w = this.w;

	const r  = Math.sqrt(x*x+y*y+z*z);
	const t  = r>0.00001? Math.atan2(r,w)/r: 0;

	const xt = x * t;
	const yt = y * t;
	const zt = z * t;
	//console.log( "Calculate log:", 0.5* Math.log(w*w+x*x+y*y+z*z), xt, yt, zt )
	return new lnQuat( 0/*0.5* Math.log(w*w+x*x+y*y+z*z)*/, xt, yt, zt )
}



function lnQuat( theta, d, a, b ){
	if( "undefined" !== typeof theta ) {
		if( "undefined" !== typeof a ) {
			// create with 4 raw coordinates
			this.w = theta;
			this.x = d;
			this.y = a;
			this.z = b;
		}else {
			// if no rotation, then nothing.
			const dl = 1/Math.sqrt( d.x*d.x + d.y*d.y + d.z*d.z );

			const t  = theta/2;
			//const ct2 = Math.cos( t );  // sqrt( 1/2(1 + cos theta))  // half angle subst
			const st2 = Math.sin( t );  // sqrt( 1/2(1 - cos theta))  // half angle subst
			//const w = ct2;               // sqrt( 1/2(1 + cos theta))
			const x = dl * d.x * st2;    // sqrt( 1/2(1 - cos theta))
			const y = dl * d.y * st2;    // sqrt( 1/2(1 - cos theta))
			const z = dl * d.z * st2;    // sqrt( 1/2(1 - cos theta))
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

			this.w = 0; // r is always 1.  0.5* Math.log(r);    // 0.5 is sqrt() moved outside
			this.x = dl*d.x * t;
			this.y = dl*d.y * t;
			this.z = dl*d.z * t;
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

// returns the number of rotations truncated.
lnQuat.prototype.norm = function() {
	const q = this;
	const r  = Math.mod( Math.sqrt( q.x*q.x + q.y*q.y + q.z*q.z), (2*Math.PI) );
	this.x *= r;
	this.y *= r;
	this.z *= r;
	return 1/r;
}

lnQuat.prototype.getBasis = function() {
// basis = { forward : ttbcT.apply( {x:0,y:0,z:1} )
//         , right : ttbcT.apply( {x:1,y:0,z:0} )
//         , up : ttbcT.apply( {x:0,y:1,z:0} )

	const q = this;

const basis = { forward:null
		, right:null
	        , up:null }; // 1.0
	if( q.w ) console.log( "0 +/- 0 is not 0?" );
	// 3+2 +sqrt+exp+sin
	const r  = Math.sqrt( q.x*q.x + q.y*q.y + q.z*q.z) ;
        if( !r ) {
		// v is unmodified.	
		return basis; // 1.0
	}
	const et = 1;//Math.exp(q.w);
	const s  = r>=0.00001? /* et* */Math.sin(r)/r: 0;

	const qw = /*et* */Math.cos(r);
	const qx = q.x * s;
	const qy = q.y * s;
	const qz = q.z * s;
	
	{
		const tx = 2 * (qy);
		const tz = 2 * (-qy);
	 	basis.forward = { x : 0 + qw * tx + ( qy * tz - 0 )
		                , y : 0 + 0       + ( qz * tx - tz * qx )
		                , z : 1 + qw * tz + ( 0       - tx * qy ) };
	}
	{
		const tx = 2 * (-qz);
		const ty = 2 * (qy);
	 	basis.right = { x : 1 + qw * tx + ( 0       - ty * qz )
		              , y : 0 + qw * ty + ( qz * tx - 0 )
		              , z : 0 + 0       + ( qx * ty - tx * qy ) };
	}
	{
		const ty = 2 * (-qx);
		const tz = 2 * (qz);
	 	basis.up = { x : 0 + 0       + ( qy * tz - ty * qz )
		           , y : 1 + qw * ty + ( 0       - tz * qx )
		           , z : 0 + qw * tz + ( qx * ty - 0       ) };
	}
	return basis;	
}

lnQuat.prototype.expApply = function( v ) {
	//x y z w l
	const q = this;

	// 3+2 +sqrt+exp+sin
	const r  = Math.sqrt( q.x*q.x + q.y*q.y + q.z*q.z) ;
        if( !r ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	const et = 1;//Math.exp(q.w);
	const s  = r>=0.00001? /*et**/ Math.sin(r)/r: 0;

	const qw = /* et* */Math.cos(r);
	const qx = q.x * s;
	const qy = q.y * s;
	const qz = q.z * s;

	const tx = 2 * (qy * v.z - qz * v.x);
	const ty = 2 * (qy * v.x - qx * v.y);
	const tz = 2 * (qz * v.y - qy * v.z);

	return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		, y : v.y + qw * ty + ( qz * tx - tz * qx )
		, z : v.z + qw * tz + ( qx * ty - tx * qy ) };

	// total 
	// 27+14 +sqrt+sin+cos
	// 21+4 +sqrt+sin+cos (parallel-ish)
}


lnQuat.prototype.expApplyInv = function( v ) {
	//x y z w l
	const q = this;

	// 3+2 +sqrt+exp+sin
	const r  = Math.sqrt( q.x*q.x + q.y*q.y + q.z*q.z) ;
        if( !r ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	const et = 1;// Math.exp(q.w);
	const s  = r>=0.00001? /* et* */Math.sin(r)/r: 0;

	const qw = /* et*  */Math.cos(r);
	const qx = -q.x * s;
	const qy = -q.y * s;
	const qz = -q.z * s;

	const tx = 2 * (qy * v.z - qz * v.x);
	const ty = 2 * (qy * v.x - qx * v.y);
	const tz = 2 * (qz * v.y - qy * v.z);

	return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		, y : v.y + qw * ty + ( qz * tx - tz * qx )
		, z : v.z + qw * tz + ( qx * ty - tx * qy ) };

	// total 
	// 27+14 +sqrt+sin+cos
	// 21+4 +sqrt+sin+cos (parallel-ish)
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

function dQuat( x, y, z ) {
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
dlnQuat.prototype.applyRotation = function( v ) {
	return this.lnq.expApply( v );
}

// Apply just the rotation to a point.
dlnQuat.prototype.applyInvRotation = function( v ) {
	return this.lnq.expApply( v );
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
	const rV = this.lnq.expApply( v );
	//const rO = this.lnQ.expApply( this.dQ );
	rV.x += this.dQ.x;
	rV.y += this.dQ.y;
	rV.z += this.dQ.z;
	return rv;
}

// V is in the space of the dual rotated around 0.
dlnQuat.prototype.applyArmTransform = function( v ) {
	const rV = this.lnq.expApply( v );
	const rO = this.lnQ.expApply( this.dQ );
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
		console.log( "lnq1 v : ", JSON.stringify( rlnq1.expApply(v) ) );	
		console.log( "lnq2 v : ", JSON.stringify( rlnq2.expApply(v) ) );	

		const lnq1q2 = rlnq1.addNew( rlnq2 ); // changes 
		console.log( "q1q2 v", JSON.stringify( q1q2a.apply( v ) ) );

		console.log( "lnq1q2 v", JSON.stringify( lnq1q2.expApply( v ) ) );
		

		console.log( "  q1 basis?", q1.getBasis() );

		console.log( "  q2 basis?", q2.getBasis() );

		console.log( " lq1 basis?", lnq1.getBasis() );

		console.log( " lq2 basis?", lnq2.getBasis()  );

		console.log( "rlq1 basis?", rlnq1.getBasis() );

		console.log( "rlq2 basis?", rlnq2.getBasis() );

		console.log( "lq1q2 basis?", lnq1q2.getBasis()  );

	}
}
