

function twister2( q, theta ) {
	const q = this;
	const s  = this.s;
	console.log( "lnQuat exp() is disabled until integrated with a quaternion library." );
	return null;//new Quat( this.qw, q.x *q.x* s, q.y *q.y* s, q.z *q.z * s );
	const cosD = Math.cos( q.nL )
	const sinD = Math.sin( q.nL )
	const Q = {
		w:q.qw,
		x:sinD * q.x / q.nR,
		y:sinD * q.y / q.nR,
		z:sinD * q.z / q.nR
	}
	

	const s  = Math.sin( theta ); // sin/cos are the function of exp()
	const qw = Math.cos( theta ); // sin/cos are the function of exp()

	const nst = s;
	const qx = q.nx * nst; // normalizes the imaginary parts
	const qy = q.ny * nst; // set the sin of their composite angle as their total
	const qz = q.nz * nst; // output = 1(unit vector) * sin  in  x,y,z parts.

	const xy = 2*qx*qy;  // sin(t)*sin(t) * x * y / (xx+yy+zz)
	const yz = 2*qy*qz;  // sin(t)*sin(t) * y * z / (xx+yy+zz)
	//const xz = 2*qx*qz;  // sin(t)*sin(t) * x * z / (xx+yy+zz)

	const wx = 2*qw*qx;  // cos(t)*sin(t) * x / sqrt(xx+yy+zz)
	//const wy = 2*qw*qy;  // cos(t)*sin(t) * y / sqrt(xx+yy+zz)
	const wz = 2*qw*qz;  // cos(t)*sin(t) * z / sqrt(xx+yy+zz)

	const xx = 2*qx*qx;  // sin(t)*sin(t) * y * y / (xx+yy+zz)
	//const yy = 2*qy*qy;  // sin(t)*sin(t) * x * x / (xx+yy+zz)
	const zz = 2*qz*qz;  // sin(t)*sin(t) * z * z / (xx+yy+zz)

	const Q2Norm = Math.abs( xy - wz ) + Math.abs( 1 - ( zz + xx ) ) + Math.abs( wx + yz );
	const Q2Norm2 = Math.sqrt( ( xy - wz ) * ( xy - wz ) + ( 1 - ( zz + xx ) )*( 1 - ( zz + xx ) ) + ( wx + yz )* ( wx + yz ) );

	const sinT = Math.sin(theta );
	const cosT = Math.cos(theta );
	const Q2 = {
		w:cosT,
		x:q.x + theta * ( xy - wz )/QNorm2 * Q2Norm,
		y:q.y + theta * ( 1 - ( zz + xx ) )/QNorm2 * Q2Norm,
		z:q.z + theta * ( wx + yz )/QNorm2 * Q2Norm, 
	}
	
	q.x 
	const qQapp = {
			w: Q2.w * Q.w - Q2.x * Q.x - Q2.y * Q.y - Q2.z * Q.z
			x: Q2.w * Q.x - Q2.x * Q.w - Q2.y * Q.z - Q2.z * Q.y
			y: Q2.w * Q.z - Q2.x * Q.y - Q2.y * Q.w - Q2.z * Q.x
			z: Q2.w * Q.y - Q2.x * Q.z - Q2.y * Q.x - Q2.z * Q.w
	}

	const x = qQapp.x;
	const y = qQapp.y;
	const z = qQapp.z;
	const w = qQapp.w;
	
	const r  = Math.sqrt(x*x+y*y+z*z);
	if( r < SIN_R_OVER_R_MIN ) {
		// cannot know the direction.
		return new lnQuat( ang, 0, 1, 0 )
	}
	const lNorm = Math.abs(x)+Math.abs(y)+Math.abs(z);
	const angle = acos(w);//Math.atan2(r,w);
	const t  = 1/r;

	const xt = x*t;
	const yt = y*t;
	const zt = z*t;
	
	q.nx = xt;
	q.ny = xt;
	q.nz = xt;
	q.x = q.nx*angle
	q.y = q.ny*angle
	q.z = q.nz*angle
	
	
}

/*
	// get basis original
	const q = this;

	if( !del ) del = 1.0;
	const nt = this.nL;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	if( !nt ) {
		return {forward:{x:0,y:0,z:1}, right:{x:1,y:0,z:0}, up:{x:0,y:1,z:0}, origin:{x:0,y:0,z:0 }};
	}
	const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
	const qw = Math.cos( del * nt ); // sin/cos are the function of exp()

	//L = r x p 
	// this.nL * this.nL = Centripetal force basis
	// 	
	const nst = s/this.nR;//Math.sqrt(q.x*q.x+q.y*q.y+q.z*q.z);
	const qx = q.x * nst; // normalizes the imaginary parts
	const qy = q.y * nst; // set the sin of their composite angle as their total
	const qz = q.z * nst; // output = 1(unit vector) * sin  in  x,y,z parts.

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

 
*/

function twister( theta ) {

	const dsin = Math.sin(theta);
	const dcos = Math.cos(theta);

	// this is terse; for more documentation see getBasis Method.
	const q = this;

	const nt = this.nL;
	if( !nt ) {
		return {forward:{x:0,y:0,z:1}, right:{x:1,y:0,z:0}, up:{x:0,y:1,z:0}, origin:{x:0,y:0,z:0 }};
	}

	const sinQ = Math.sin( this.nL ); // sin/cos are the function of exp()
	const sinQ2 = sinQ*sinQ; // sin/cos are the function of exp()
	const cosQ = Math.cos( this.nL ); // sin/cos are the function of exp()
	const qw = cosQ; // sin/cos are the function of exp()

	const qnx = q.nx * sinQ;
	const qny = q.ny * sinQ;
	const qnz = q.nz * sinQ;

	const xy = 2*qx*qy;  // sin(t)*sin(t) * x * y / (xx+yy+zz)
	const yz = 2*qy*qz;  // sin(t)*sin(t) * y * z / (xx+yy+zz)
	const xz = 2*qx*qz;  // sin(t)*sin(t) * x * z / (xx+yy+zz)

	const wx = 2*qw*qx;  // cos(t)*sin(t) * x / sqrt(xx+yy+zz)
	const wy = 2*qw*qy;  // cos(t)*sin(t) * y / sqrt(xx+yy+zz)
	const wz = 2*qw*qz;  // cos(t)*sin(t) * z / sqrt(xx+yy+zz)

	const xx = 2*qx*qx;  // sin(t)*sin(t) * y * y / (xx+yy+zz)
	const yy = 2*qy*qy;  // sin(t)*sin(t) * x * x / (xx+yy+zz)
	const zz = 2*qz*qz;  // sin(t)*sin(t) * z * z / (xx+yy+zz)

	const basis = { right  :{ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) }
	              , up     :{ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) }
	              , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) }
	              , origin: { x:0, y:0, z:0 } };

//	return basis;	

	// forward/right transform.
	const dsin = Math.sin(theta);
	const dcos = Math.cos(theta);
	const v1 = { x:basis.right.x*dcos, y:basis.right.y*dcos, z:basis.right.z*dcos};
	const v2 = { x:basis.forward.x*dsin, y:basis.forward.y*dsin, z: basis.forward.z*dsin };
	basis.right.x = v1.x - v2.x;
	basis.right.y = v1.y - v2.y;
	basis.right.z = v1.z - v2.z; 
	const v3 = { x:basis.forward.x*dcos, y:basis.forward.y*dcos, z: basis.forward.z*dcos };
	const v4 = { x:basis.right.x*dsin, y:basis.right.y*dsin, z:basis.right.z*dsin};
	basis.forward.x = v3.x + v4.x;
	basis.forward.y = v3.y + v4.y;
	basis.forward.z = v3.z + v4.z;
	
	//const t0r = basis.right.x;
	//const t1r = v1.x - v2.x;
	//const t2r = basis.right.x*dcos - basis.forward.x*dsin;
	const t3r =  ( 1 - ( yy + zz )) * dcos  -  ( wy + xz )* dsin
			   
	//const t0u = basis.up.y;
	const t1u = 1 - ( zz + xx );

	//const t0f = basis.forward.z;
	//const t1f = v3.z + v4.z;
	//const t2f =  basis.forward.z*dcos + basis.right.z*dsin;
	const t3f = (  1  - ( xx + yy ) ) * dcos   +   ( xz - wy ) *dsin

	// partial (sum of t3r, t3f, t1u )
	const t1 = ( 1 - ( yy + zz ) ) * dcos  -  ( wy + xz ) * dsin
	         +   1 - ( zz + xx )
	         + ( 1 - ( xx + yy ) ) * dcos  +  ( xz - wy ) *dsin
	const t2 = 1 - ( zz + xx ) 
		+ ( 2 - yy - yy - zz - xx   ) * dcos   
		+ ( -  ( wy + xz )  +  ( xz - wy ) ) * dsin
		 
	const t3 = 1 - ( zz + xx ) 
		+ ( 2 - yy - yy - zz - xx   ) * dcos   
		+ (   - wy - wy - xz + xz  ) * dsin
		 
	const t4 = 1 - ( zz + xx ) 
		+ 2*( ( (1 - yy) - zz - xx ) * dcos 
		    -  wy * dsin );
		
	// acos(t2)
	const angle2 = acos( 1 - ( zz + xx ) 
	                   + 2*( ( (1 - yy) - zz - xx ) * dcos 
	                   - wy * dsin ) );

	//const t = ( ( basis.right.x + basis.up.y + basis.forward.z ) - 1 )/2;
	const t = ((t1r+t1u+t1f)-1)/2;
	const angle = Math.acos(t);

	const tmp = 1 /Math.sqrt((basis.forward.y -basis.up.z)*(basis.forward.y-basis.up.z) + (basis.right.z-basis.forward.x)*(basis.right.z-basis.forward.x) + (basis.up.x-basis.right.y)*(basis.up.x-basis.right.y));

	//const xtmp = basis.up.z      -basis.forward.y;
	const xtmp =  ( wx + yz )  - ( v3.y + v4.y);
	const xtmp =  ( wx + yz )  - ( basis.forward.y*dcos + basis.right.y*dsin);
	const xtmp =  ( wx + yz )  - ( yz -wx )*dcos - ( wz+xy )*dsin;
	
	
	//const ytmp = basis.forward.x -basis.right.z;
		v3.x + v4.x - v1.z + v2.z
		( basis.forward.x - basis.right.z )*dcos + ( basis.forward.z + basis.right.x )*dsin 
		(   ( wy + xz ) - ( xz - wy ) )*dcos + ( 1 - ( xx + yy )  + 1 - ( yy + zz ) )*dsin 
		(   wy + xz - xz + wy )*dcos + ( 2 - yy  - yy -  xx  - zz )*dsin 
		(   2 * wy  )*dcos + ( 2*(1 - yy) - xx - zz )*dsin 
	
	//const ztmp = basis.right.y   -basis.up.x;
		 v1.y - v2.y   -                 ( xy - wz )
		basis.right.y*dcos - basis.forward.y*dsin   -    ( xy - wz )

		wz - xy +  ( wz + xy )*dcos -   ( yz - wx )*dsin   

	const ztmp = wz - xy +  ( wz + xy )*dcos +  ( wx - yz )*dsin;
			



	const xtmp =  ( wx + yz )  - ( yz -wx )*dcos - ( wz+xy )*dsin;
	const ytmp =  ( 2 * wy  )*dcos + ( 2*(1 - yy) - xx - zz )*dsin 
	const ztmp = wz - xy +  ( wz + xy )*dcos +  ( wx - yz )*dsin;
			

	//const ztmp = ( 2 * ( xy + zn ))*dcos - ( 2 * ( xn - yz ) )*dsin   -   2 *  ( xy + xn )
	const ztmp = 2 * ( ( xy + zn )*dcos - ( xn - yz )*dsin - ( xy + xn ) );
	

	const xtmp =  2 *  ( ( yz + zn ) - (  ( xn - yz )*dcos + ( xy + zn )*dsin) );
	const ytmp =  2 * ( 1 + ( yn + yn )*dcos  - ( xx - zz )*dsin )
	const ztmp = 2 * ( ( xy + zn )*dcos - ( xn - yz )*dsin - ( xy + xn ) );

	//const xtmp = basis.up.z      -basis.forward.y;
	//const ytmp = basis.forward.x -basis.right.z;
	//const ztmp = basis.right.y   -basis.up.x;

	this.nR = Math.sqrt(xtmp*xtmp + ytmp*ytmp + ztmp*ztmp);
	const sqNorm = 1 /this.nR;

	C.nx = xtmp *sqNorm;
	C.ny = ytmp *sqNorm;
	C.nz = ztmp *sqNorm;

	this.nL = (Math.abs(this.nx)+Math.abs(this.ny)+Math.abs(this.nz));
	const angleOverLinNorm = angle / this.nL;
	this.s  = Math.sin( angle );
	this.qw = Math.cos( angle );
	this.x = this.nx * angleOverLinNorm;
	this.y = this.ny * angleOverLinNorm;
	this.z = this.nz * angleOverLinNorm;
	this.nx *= angle;
	this.ny *= angle;
	this.nz *= angle;
	this.dirty = false;






function twister( theta ) {

	const dsin = Math.sin(theta);
	const dcos = Math.cos(theta);

	// this is terse; for more documentation see getBasis Method.
	const q = this;

	const nt = this.nL;
	if( !nt ) {
		return {forward:{x:0,y:0,z:1}, right:{x:1,y:0,z:0}, up:{x:0,y:1,z:0}, origin:{x:0,y:0,z:0 }};
	}

	const sinQ = Math.sin( this.nL ); // sin/cos are the function of exp()
	const sinQ2 = sinQ*sinQ; // sin/cos are the function of exp()
	const cosQ = Math.cos( this.nL ); // sin/cos are the function of exp()
	const qw = cosQ; // sin/cos are the function of exp()

	const qnx = q.nx * sinQ;
	const qny = q.ny * sinQ;
	const qnz = q.nz * sinQ;

	const xy = 2*qx*qy;  // sin(t)*sin(t) * x * y / (xx+yy+zz)
	const yz = 2*qy*qz;  // sin(t)*sin(t) * y * z / (xx+yy+zz)
	const xz = 2*qx*qz;  // sin(t)*sin(t) * x * z / (xx+yy+zz)

	const wx = 2*qw*qx;  // cos(t)*sin(t) * x / sqrt(xx+yy+zz)
	const wy = 2*qw*qy;  // cos(t)*sin(t) * y / sqrt(xx+yy+zz)
	const wz = 2*qw*qz;  // cos(t)*sin(t) * z / sqrt(xx+yy+zz)

	const xx = 2*qx*qx;  // sin(t)*sin(t) * y * y / (xx+yy+zz)
	const yy = 2*qy*qy;  // sin(t)*sin(t) * x * x / (xx+yy+zz)
	const zz = 2*qz*qz;  // sin(t)*sin(t) * z * z / (xx+yy+zz)

	const angle = acos( 1 - ( zz + xx ) 
	                  + 2*( ( (1 - yy) - xx - zz ) * dcos 
	                  - wy * dsin ) );

	const xtmp = wx + yz + ( wx - yz )*dcos - ( wz + xy )*dsin;
	const ytmp =         + ( 2*wy    )*dcos + ( 2*(1 - yy) - xx - zz )*dsin 
	const ztmp = wz - xy + ( wz + xy )*dcos + ( wx - yz )*dsin;

	this.nR = Math.sqrt(xtmp*xtmp + ytmp*ytmp + ztmp*ztmp);
	const sqNorm = 1 /this.nR;

	this.nx = xtmp *sqNorm;
	this.ny = ytmp *sqNorm;
	this.nz = ztmp *sqNorm;

	this.nL = Math.abs( this.nx ) + Math.abs( this.ny ) + Math.abs( this.nz );
	const angleOverLinNorm = angle / this.nL;
	this.s  = Math.sin( angle );
	this.qw = Math.cos( angle );
	this.x = this.nx * angleOverLinNorm;
	this.y = this.ny * angleOverLinNorm;
	this.z = this.nz * angleOverLinNorm;
	// I keep these as their normal more often.
	//this.nx *= angle;
	//this.ny *= angle;
	//this.nz *= angle;
	this.nL *= angle;
	this.dirty = false;

}




--------------------------------------------------




//----------------------------------------
//  This IS the angle of rotation
//  how do I apply that to another rotation?  Just add it, right?  

		const dsin = Math.sin(theta);
		const dcos = Math.cos(theta);
		
		const cosD2 = Math.cos( q.nL/2 )
		const sinD2 = Math.sin( q.nL/2 )
		
		const angle2 = acos( (  dcos - ( sinT*sinT / (q.nR * q.nR )) * ( 
	                               ( q.z * q.z -  q.x * q.x )  * dcos
	                             - ( q.x * q.z +  q.x * q.z ) * dsin
	                             - ( q.z * q.z + q.x * q.x ) ) 
						 );
		
		//const new_v = lnQ.applyDel( {x:0,y:1,z:0}, 0.5 );
		const new_v = { x :     2 *       (sinQ / (q.nR * q.nR )) * ( q.y * q.x * sinQ - cosQ * q.z * q.nR )
		              , y : 1 - 2 *  sinQ*(sinQ / (q.nR * q.nR )) * ( q.z * q.z + q.x * q.x )
		              , z :     2 *       (sinQ / (q.nR * q.nR )) * ( q.z * q.y * sinQ + cosQ * q.x * q.nR ) };

		const twistAxis = { nx:q.y * new_v.z - new_v.y * q.z
						  , ny:q.z * new_v.x - new_v.z * q.x
						  , nz:q.x * new_v.y - new_v.x * q.y
						, x : 0
						, y: 0
						, z: 0
		};
		const aNorm = 1/Math.sqrt( twistAxis.x * twistAxis.x + twistAxis.y * twistAxis.y + twistAxis.z * twistAxis.z );
		twistAxis.x = twistAxis.nx * aNorm * angle2;  // theta?
		twistAxis.y = twistAxis.ny * aNorm * angle2;  // theta?
		twistAxis.z = twistAxis.nz * aNorm * angle2;  // theta?
		twistAxis.nx *= angle2;
		twistAxis.ny *= angle2;
		twistAxis.nz *= angle2;
	q.x += twistAxis.x
	q.y += twistAxis.y
	q.z += twistAxis.z


-------------
https://en.wikipedia.org/wiki/Osculating_circle
cycloid
cycloid radius r
/csc(1/2t ) / 4r



arc length (s) per one ... s/1  = 1/r

unit tangent T(s) 
unit normal N(s) 
signed curvature k(s)
Radius of curvature R(s)

T(s) = gamma'(s)
T'(s) = k(s)N(s)
R(s) = 1/|k(s)|



gamma(t) = (x1(t), y1(t))


k(t) = x1'(t) . x2''(t) - x1''(t) . x2'(t)
     / ( x1'(t)^2 + x2'(t)^2) ^ 3/2

N(t) = 1/||gamma(t)|| . ( x2'(t) x1'(t) )

R(t) = 1/|k(t)| //  | ( x1'(t)^1 + x2'(t)^2 ) ^ 3/2 / ( 

Q(t) = gamma(t) + 1/k(t) . || gamma'(t) || . ( -x2'(t) , x'1(t) )



x = sin(K t );
y = cos( K t );



 Bertrand curves that do not lie in the same two-dimensional plane are characterized by the existence of a linear relation aκ + bτ = 1 
where a and b are real constants and a ≠ 0.[1] 
 Furthermore, the product of torsions of Bertrand pairs of curves are constant.[2]