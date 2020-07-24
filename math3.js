

  x * ( |x|+|y|+|z| )   *( |x|+|y|+|z| )
----------------------
    xx+yy+zz

  x * ( |x|+|y|+|z| ) 
----------------------
    sqrt(xx+yy+zz)
	
	
  y * ( |x|+|y|+|z| )   *( |x|+|y|+|z| )
----------------------
    xx+yy+zz


  z * ( |x|+|y|+|z| )   *( |x|+|y|+|z| )
----------------------
    xx+yy+zz	
	
	
	
	Y on the 
	
	
	0.5392429690839958  0.45602431531324195
	
	-0.23979269967711728  0.6041468479105288
	
	
	
	 x / (|x|+|z|)
	-z / (|x|+|z|)
	
	 y / (|y|+|z|)
	-z / (|y|+|z|)
	
	-x / (|x|+|y|)
	 y / (|x|+|y|)


	-x / (|x|+|z|)
	z / (|x|+|z|)
	
	-y / (|y|+|z|)
	 z  / (|y|+|z|)
	
	 x  / (|x|+|y|)
	-y / (|x|+|y|)
	
	
	
	https://d3x0r.github.io/STFRPhysics/3d/index2.html
	https://github.com/d3x0r/STFRPhysics/blob/master/3d_index2_html.png (explainer 1)
	https://github.com/d3x0r/STFRPhysics/blob/master/3d_index2_html-2.png (explainer 2)
	
	
	
	
	2*qx*qy  // sin(t)*sin(t) * x * y / (xx+yy+zz)
	
	   - 2*qw*qz  // cos(t)*sin(t) * z / sqrt(xx+yy+zz)
	   
	   
	 
	 1 - ( zz + xx ), z :     ( wx + yz ) }
	 
	 2*qz*qz;  // sin(t)*sin(t) * z * z / (xx+yy+zz)
	 2*qx*qx;  // sin(t)*sin(t) * y * y / (xx+yy+zz)
	 
	 1 - 2*sin(t)^2 * ( zz + xx ) / (xx+yy+zz)
	 
	 
	  ( wx + yz ) 
	 2*qw*qx   // cos(t)*sin(t) * x / sqrt(xx+yy+zz)
	    + 2*qy*qz   // sin(t)*sin(t) * y * z / (xx+yy+zz)
		
		
		
		
		
		up : 
		
		y * 2*qx*qy     // sin(t)*sin(t) * x * y / (xx+yy+zz)	
	        - qw*qz   // sin(2t) * z / sqrt(xx+yy+zz)
		- z * qw*qx   // sin(2t) * x / sqrt(xx+yy+zz)
	      + 2*qy*qz     // sin(t)*sin(t) * y * z / (xx+yy+zz)


		    2*qx*qy     // sin(t)*sin(t) * x * y * y / (xx+yy+zz)	
	      - 2*qy*qz     // sin(t)*sin(t) * y * z * z / (xx+yy+zz)
		  
	        - 2*qw*qz   // cos(t)*sin(t) * y * z / sqrt(xx+yy+zz)
		-  * 2*qw*qx   // cos(t)*sin(t) * z * x / sqrt(xx+yy+zz)


			
		y * 1 - 2*sin(t)^2 * ( zz + xx ) / (xx+yy+zz)
		
		z * 
		
		
sin(2x) = 2 sin(x) cos(x)

cos(2x) = cos2(x) – sin2(x) = 1 – 2 sin2(x) = 2 cos2(x) – 1	

	const nx = q.x * nR;  //  x / sqrt(xx+yy+zz)
	const ny = q.y * nR;  //  y / sqrt(xx+yy+zz)
	const nx = q.z * nR;  //  z / sqrt(xx+yy+zz)

	const xy = 2*qx*qy;  // sin(t)*sin(t) * x * y 
	const yz = 2*qy*qz;  // sin(t)*sin(t) * y * z 
	const xz = 2*qx*qz;  // sin(t)*sin(t) * x * z 

	const wx = 2*qw*qx;  // cos(t)*sin(t) * x 
	const wy = 2*qw*qy;  // cos(t)*sin(t) * y 
	const wz = 2*qw*qz;  // cos(t)*sin(t) * z 

	const xx = 2*qx*qx;  // sin(t)*sin(t) * x * x
	const yy = 2*qy*qy;  // sin(t)*sin(t) * y * y
	const zz = 2*qz*qz;  // sin(t)*sin(t) * z * z 
	

	
	
	const xy = qx*qy;  // ( 1 - cos(2t) ) * x * y 
	const yz = qy*qz;  // ( 1 - cos(2t) ) * y * z 
	const xz = qx*qz;  // ( 1 - cos(2t) ) * z * x

	const wx = qw*qx;  // sin(2t) * x 
	const wy = qw*qy;  // sin(2t) * y 
	const wz = qw*qz;  // sin(2t) * z 

	const xx = qx*qx;  // ( 1 - cos(2t) ) * x * x 
	const yy = qy*qy;  // ( 1 - cos(2t) ) * y * y
	const zz = qz*qz;  // ( 1 - cos(2t) ) * z * z 

	const basis = { right  :{ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) }
	              , up     :{ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) }
	              , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) }
	              , origin: { x:0, y:0, z:0 } };






	s = sin(t);
	c = 1/2 - cos(t);

	xy 
	yz
	xz
	xx
	yy
	zz
	
	right  :{ x : 1 - ( c ) * (yy + zz )
		,  y :      ( ( c ) * xy            + s * z )
		,  z :      ( ( c ) * xz            - s * y ) }
		
	  up     :{ x :     ( c ) * xy           - s * z 
			,  y :  1 - ( c ) * ( zz -  xx  )
			,  z :      ( c ) * yz           + s * x 			
			}

    , forward:{ x : ( c ) * xz        + s * y 
		,  y :      ( c ) * yz        - s * x  
		, z : 1 -   ( c ) * ( xx + yy  ) }



	s = sin(t);
	c = 1/2 - cos(t);

	t = x+y+z;
	l = sqrt(xx+yy+zz);
	
	vec3 r = vec3(x,y,z) / l;
	//x /= l;
	//y /= l;
	//z /= l;
	vec3 sr = r * s;
	//sx = s*x;
	//sy = s*y;
	//sz = s*z;
	
	vec3 v2 = vec3( r.y,r.z,r.x);
	vec3 cr = r*v2*c;
	//xy *c
	//yz *c
	//zx *c
	vec3 rr = r*r*c;
	//xx *c
	//yy *c
	//zz *c
	
	right    :{ x : 1 - rr.y - rr.z  ,  y : cr.x + sr.z      ,  z :      cr.z - sr.y  }
	  up     :{ x :  cr.x - sr.z     ,  y :  1 - rr.z - rr.x ,  z :      cr.y + sr.x  }
    , forward:{ x :  cr.z + sr.y     ,  y : cr.y - sr.x      ,  z : 1 -  rr.x - rr.y  }

	//right    :{ x : 1 - yy - zz  ,  y : xy + sz      ,  z :      xz - sy  }
	//  up     :{ x :  xy - sz     ,  y :  1 - zz - xx ,  z :      yz + sx  }
    //, forward:{ x :  xz + sy     ,  y : yz - sx      ,  z : 1 -  xx - yy  }



	float t = abs(x)+abs(y)+abs(z);
	float s = sin(t);
	float c = 0.5 - cos(t);
	float l = sqrt(x*x+y*y+z*z);
	vec3 r  = vec3(x,y,z) / l;
	vec3 v2 = vec3( r.y,r.z,r.x);
	vec3 sr = r * s;
	vec3 cr = r*v2*c;
	vec3 rr = r*r*c;
	vec3 right   = vec3( 1 - rr.y - rr.z  ,     cr.x + sr.z   ,      cr.z - sr.y  );
	vec3 up      = vec3(     cr.x - sr.z  , 1 - rr.z - rr.x   ,      cr.y + sr.x  );
    vec3 forward = vec3(     cr.z + sr.y  ,     cr.y - sr.x   , 1 -  rr.x - rr.y  }





	curve normal = cross up + this.nx...
		x: z * ( 1 - ( 1/2 - cos(2t) ) ( z * z - x * x  - y *y ) - sin(2t) * y *x 

		y :    sin(2t) * ( x* x - zz ) 

		z : x * ( 1 - ( 1/2 - cos(2t) ) ( z*z -   x*x  - y * y ) - sin(2t) * y * z



xy=2∗−upz/(|upy|+|upz|) ; xz=1+xy;//2∗upy/(|upy|+|upz|)

yx=2* upz/(|upz|+|upx|); yy=0; yz=2∗−upx/(|upz|+|upx|)

zx=2∗−upy/(|upx)+|upy|); zy=2∗upx/(|upx|+|upy|); zz=0

		
			  
	sin(2t) * ( x* x - zz )
	/  ( x + x* ( 1/2 - cos(2t) ) ( x*x - z*z ) + sin(2t) * ( x*x - zz )
	   + x*( 1/2 - cos(2t) )* y*y )   - sin(2t)*y*z ) 
			  

	sin(2t) * ( x* x - zz )
	/  x * ( 1 - ( 1/2 - cos(2t) ) ( z*z -   x*x  - y * y )  + sin(2t) * ( x* x - zz - y * z ) 
		
		
	
	
	sin(2t) * ( x* x - zz )  /
		z * ( 1 - ( 1/2 - cos(2t) ) ( z * z - x * x  - y *y ) - sin(2t) * y *x   +   sin(2t) * ( x* x - zz ) 
		
	( 1 - ( 1/2 - cos(2t) ) ( z * z * z - z * x * x  - z * y *y ) - sin(2t) * y *x   /
		 ( 1 - ( 1/2 - cos(2t) ) ( z * z * z - z * x * x  - z * y *y )  +  sin(2t) * ( x* x - zz - * y *x) 
		
		

	  ---------------------------------
	  

	  
	  
	  
	  a + b + c = t
	  
	  cos(a) + cos(b) + cos(c) = t
	  
	  a/sin(A) = b/sin(B) = c/sin(C) (Law of Sines)
	  
	       sin(|X|+|Y|+|Z|)
		   
	  nx * sin(X)   ny * sin(Y)  nz * sin(Z)

	       sin(|X|+|Y|)cos(|Z|) + cos( ||X|+|Y| )sin(|Z|)
		   
		   
		nX * (   sin(|X|)cos(|Y|)cos(|Z|) + cos(|X|)sin(|Y|)cos(|Z|) + cos(|X|)cos(|Y|)sin(|Z|) - sin(|X|)sin(|Y|)sin(|Z|) )

				sin(|x|)cos(|y|)cos(|B|) + cos(|x|)sin(|y|)cos(|B|) + cos(|x|)cos(|y|)sin(|B|) - sin(|x|)sin(|y|)sin(|B|)

			cos(|Y|) * (sin|X| cos|B|  + cos|X|sin|B| ) + sin(|Y|)*(cos|X|*cos|B|)-sin|X|sin|B|)


c^2 = a^2 + b^2 - 2ab cos(C)
b^2 = a^2 + c^2 - 2ac cos(B)

( b^2 + c^2 - a^2  ) = cos(A)
   /  2bc


( b^2 + c^2 - a^2  ) = cos(A)
   /  2bc

	
	
	
	



	  
	 const t = ; 
	  
	  
	  

	const xx = qx*qx;  // ( 1/2 - cos(2t) )  * x * x 
	const yy = qy*qy;  // ( 1/2 - cos(2t) ) * y * y
	const zz = qz*qz;  // ( 1/2 - cos(2t) ) * z * z 
	  

		3 - xx - xx  - yy  - yy - zz- zz
		2 - 2 xx - 2yy - 2zz
		
		
		acos( 1 - sin(t)*sin(t) * ( xx + yy + zz ) )
		
		
	  	let angle = acos(  ( ( basis.right.x + basis.up.y + basis.forward.z ) - 1 )/2  );
		
		
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
    ( yz - wx ) - ( wx + yz )     -2wx     2*sin(2t) * nx 
x = (R21 - R12)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
     ( xz - wy ) -  ( wy + xz )   -2wy     2*sin(2t) * ny
y = (R02 - R20)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
      ( xy - wz ) - ( wz + xy )   -2wz     2*sin(2t) * nz
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


	  
	  
	  
	  
	  
	  
	  	// this is terse; for more documentation see getBasis Method.
	const q = this;
	//this.update();
	if( !del ) del = 1.0;
	
	const nt = Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	if( !nt ) {
		return {forward:{x:0,y:0,z:1}, right:{x:1,y:0,z:0}, up:{x:0,y:1,z:0}, origin:{x:0,y:0,z:0 }};
	}
	//sin(2t), ( 1/2 - cos(2t) )
	const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
	const qw = 1/2 - Math.cos( del * nt ); // sin/cos are the function of exp()

	const nst = s;
	const qx = q.nx; // normalizes the imaginary parts
	const qy = q.ny; // set the sin of their composite angle as their total
	const qz = q.nz; // output = 1(unit vector) * sin  in  x,y,z parts.

	//sin(t)sin(t) = cos(t) - cos(2t)

	const xy = qw*qx*qy;  // sin(t)*sin(t) * x * y / (xx+yy+zz)
	const yz = qw*qy*qz;  // sin(t)*sin(t) * y * z / (xx+yy+zz)
	const xz = qw*qz*qx;  // sin(t)*sin(t) * z * x / (xx+yy+zz)

	const wx = s*qw*qx;  // cos(t)*sin(t) * x / sqrt(xx+yy+zz)
	const wy = s*qw*qy;  // cos(t)*sin(t) * y / sqrt(xx+yy+zz)
	const wz = s*qw*qz;  // cos(t)*sin(t) * z / sqrt(xx+yy+zz)

	const xx = qw*qx*qx;  // sin(t)*sin(t) * y * y / (xx+yy+zz)
	const yy = qw*qy*qy;  // sin(t)*sin(t) * x * x / (xx+yy+zz)
	const zz = qw*qz*qz;  // sin(t)*sin(t) * z * z / (xx+yy+zz)

	const basis = { right  :{ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) }
	              , up     :{ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) }
	              , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) }
	              , origin: { x:0, y:0, z:0 } };
	return basis;	


	  
	  
	  
	const twistor = new lnQuat( th, basis.up );
	
	tw.nx = basis.up.x;
	tw.ny = basis.up.y;
	tw.nz = basis.up.z;
	tw.nL = theta / (Math.abs(tw.nx)+Math.abs(tw.ny)+Math.abs(tw.nz))
	tw.x = tw.nx * tw.nL;
	tw.y = tw.ny * tw.nL;
	tw.z = tw.nz * tw.nL;
	
	basis.right = twistor.apply(basis.right);
	
		const stw = Math.sin( theta );
		const ctw = Math.cos( theta );
	        
		const qx = basis.up.x * stw;
		const qy = basis.up.y * stw;
		const qz = basis.up.z * stw;
		
		const rtx = 2 * (qy * basis.right.z - qz * basis.right.y);
		const rty = 2 * (qz * basis.right.x - qx * basis.right.z);
		const rtz = 2 * (qx * basis.right.y - qy * basis.right.x);
		
	basis.right = { x : basis.right.x + ctw * rtx + ( qy * rtz - rty * qz )
		       , y : basis.right.y + ctw * rty + ( qz * rtx - rtz * qx )
		       , z : basis.right.z + ctw * rtz + ( qx * rty - rtx * qy ) };

	
	
	
	basis.forward = twistor.apply(basis.forward);
  
		
		const ftx = 2 * (qy * basis.forward.z - qz * basis.forward.y);
		const fty = 2 * (qz * basis.forward.x - qx * basis.forward.z);
		const ftz = 2 * (qx * basis.forward.y - qy * basis.forward.x);
		
	basis.forward = { x : basis.forward.x + ctw * ftx + ( qy * ftz - fty * qz )
		       , y : basis.forward.y + ctw * fty + ( qz * ftx - ftz * qx )
		       , z : basis.forward.z + ctw * ftz + ( qx * fty - tfx * qy ) };



		basis.right.x 
		+ basis.up.y 
		+ basis.forward.z
	


		1 - ( yy + zz ) + ctw * rtx + ( qy * rtz - rty * qz )
		1 - ( zz + xx )
		1 - ( xx + yy ) + ctw * ftz + ( qx * fty - ftx * qy )



		1 - ( yy + zz ) + ctw * 2 * (qy * basis.right.z - qz * basis.right.y) 
			+ ( qy *  2 * (qx * basis.right.y - qy * basis.right.x)
			- 2 * (qz * basis.right.x - qx * basis.right.z) * qz )
		1 - ( zz + xx )
		1 - ( xx + yy ) + ctw * 2 * (qx * basis.forward.y - qy * basis.forward.x) 
			+ ( qx * 2 * (qz * basis.forward.x - qx * basis.forward.z) 
			- 2 * (qy * basis.forward.z - qz * basis.forward.y) * qy )


		1 - ( yy + zz ) + ctw * 2 * (qy * basis.right.z - qz * basis.right.y) 
			+ ( qy *  2 * (qx * basis.right.y - qy * basis.right.x)
			- 2 * (qz * basis.right.x - qx * basis.right.z) * qz )
		1 - ( zz + xx )
		1 - ( xx + yy ) + ctw * 2 * (qx * basis.forward.y - qy * basis.forward.x) 
			+ ( qx * 2 * (qz * basis.forward.x - qx * basis.forward.z) 
			- 2 * (qy * basis.forward.z - qz * basis.forward.y) * qy )


	
	let angle = acos( ( ( basis.right.x + basis.up.y + basis.forward.z ) - 1 )/2 );
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

    ( yz - wx ) - ( wx + yz )     -2wx     2*sin(2t) * nx 
x = (R21 - R12)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
     ( xz - wy ) -  ( wy + xz )   -2wy     2*sin(2t) * ny
y = (R02 - R20)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
      ( xy - wz ) - ( wz + xy )   -2wz     2*sin(2t) * nz
z = (R10 - R01)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);

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

















//---- Apply ------------
	  
		const q = this;
	if( 'undefined' === typeof del ) del = 1.0;

    if( !q.nL ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}

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

  
	  
	  
	  
	  
	  
	const s = sin(q.nl);
	const c = 1 - cos(q.nl);

	xy = q.nx*q.ny;
	yz = q.ny*q.nz;
	xz = q.nz*q.nx;
	xx = q.nx*q.nx;
	yy = q.ny*q.ny;
	zz = q.nz*q.nz;
	  

	  new_v_     :{ x :     ( c ) * xy           - s * z ,  y :  1 - ( c ) * ( zz -  xx  ) ,  z :      ( c ) * yz           + s * x 			}
	  
	  new_v_     :{ x :     ( c ) * xy           - s * z 
				,  y :  1 - ( c ) * ( zz -  xx  ) 
				,  z :      ( c ) * yz           + s * x 			
				}
	  
				// basis up 0.5
				
				const up = { x: -z + ( c ) * ( yyz + zzz - xxz )    + s * xy
			             , y: -s * (zz + xx)  
			             , z: x - ( c ) * ( zzx -  xxx - xyy ) )  + s * zy   
						};
				

				let up = { x:q.ny * new_v_.z - new_v_.y * q.nz
			             , y:q.nz * new_v_.x - new_v_.z * q.nx
			             , z:q.nx * new_v_.y - new_v_.x * q.ny
						};
				
				/*
				let up = { x:q.ny * new_v_.z - new_v_.y * q.nz
			             , y:q.nz * new_v_.x - new_v_.z * q.nx
			             , z:q.nx * new_v_.y - new_v_.x * q.ny
						};
				*/

				const testUp = { x:     ( c ) * ( y*y*z + z*z*z + x*x*z )   + s * y*x   - z 
			                   , y:   - s * ( z*z + x*x  )
			                   , z: x - ( c ) * ( x*z*z + x*x*x + x*y*y )   + s * z * y 
				};

				const up = { x:     ( c ) * ( yyz + zzz + xxz ) + s * xy - z
			               , y: -s * (zz + xx)
			               , z: x - ( c ) * ( zzx + xxx + xyy ) + s * zy
						};

				const nRup = Math.sqrt(up.x*up.x + up.y*up.y + up.z*up.z );
				up.x /= nRup;
				up.y /= nRup;
				up.z /= nRup;
	  

	  
	  curve = {
		xPlane : { x: 0
				 , y :  -up.z/(Math.abs( up.y)+Math.abs( up.z))
	  			 , z : 0// up.y/(Math.abs( up.y)+Math.abs( up.z))
				};
		yPlane : { x = up.z/(Math.abs( up.z)+Math.abs( up.x))
				, y :0
				, z : 0//2* -up.x/(Math.abs( up.z)+Math.abs( up.x)) 
				};
		zPlane : {x : -up.y/(Math.abs( up.x)+Math.abs( up.y))
					, y :0 // up.x/(Math.abs( up.x)+Math.abs( up.y))
					, z: 0 
					};
		}
		curve.xPlane.z = 1-xPlane.y;
		curve.yPlane.z = 1-yPlane.x;
		curve.zPlane.y = 1-zPlane.x;


------------------


	const q = this;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !q.nL ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	// call update() ?
	// q.s and q.qw are set in update(); they are constants for a quat in a location.

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




	const q = this;
	this.update();

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






lnQuat.prototype.getBasisT = function(del) {
	// this is terse; for more documentation see getBasis Method.
	const q = this;
	//this.update();
	if( !del ) del = 1.0;
	const nt = this.nL;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	const s  = Math.sin( 2* * nt ); // sin/cos are the function of exp()
	const c = 1- Math.cos( 2* * nt ); // sin/cos are the function of exp()

	const qx = q.nx; // normalizes the imaginary parts
	const qy = q.ny; // set the sin of their composite angle as their total
	const qz = q.nz; // output = 1(unit vector) * sin  in  x,y,z parts.

	const xy = c*qx*qy;  // 2*sin(t)*sin(t) * x * y / (xx+yy+zz)   1 - cos(2t)
	const yz = c*qy*qz;  // 2*sin(t)*sin(t) * y * z / (xx+yy+zz)   1 - cos(2t)
	const xz = c*qx*qz;  // 2*sin(t)*sin(t) * x * z / (xx+yy+zz)   1 - cos(2t)
	                          
	const wx = s*qx;  // 2*cos(t)*sin(t) * x / sqrt(xx+yy+zz)   sin(2t)
	const wy = s*qy;  // 2*cos(t)*sin(t) * y / sqrt(xx+yy+zz)   sin(2t)
	const wz = s*qz;  // 2*cos(t)*sin(t) * z / sqrt(xx+yy+zz)   sin(2t)
	                          
	const xx = c*qx*qx;  // 2*sin(t)*sin(t) * y * y / (xx+yy+zz)   1 - cos(2t)
	const yy = c*qy*qy;  // 2*sin(t)*sin(t) * x * x / (xx+yy+zz)   1 - cos(2t)
	const zz = c*qz*qz;  // 2*sin(t)*sin(t) * z * z / (xx+yy+zz)   1 - cos(2t)

	const basis = { right  :{ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) }
	              , up     :{ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) }
	              , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) }
	              };
	return basis;	
}

lnQuat.prototype.getBasisT = function(del) {
	// this is terse; for more documentation see getBasis Method.
	const q = this;
	//this.update();
	if( !del ) del = 1.0;
	const nt2 = this.nL;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	const s2  = Math.sin( 2* * nt2 ); // sin/cos are the function of exp()
	const c2 = 1- Math.cos( 2* * nt2 ); // sin/cos are the function of exp()

	const qx2 = q2.nx; // normalizes the imaginary parts
	const qy2 = q2.ny; // set the sin of their composite angle as their total
	const qz2 = q2.nz; // output = 1(unit vector) * sin  in  x,y,z parts.

	const xy2 = c2*qx2*qy2;  // 2*sin(t)*sin(t) * x * y / (xx+yy+zz)   1 - cos(2t)
	const yz2 = c2*qy2*qz2;  // 2*sin(t)*sin(t) * y * z / (xx+yy+zz)   1 - cos(2t)
	const xz2 = c2*qx2*qz2;  // 2*sin(t)*sin(t) * x * z / (xx+yy+zz)   1 - cos(2t)
	                          
	const wx2 = s2*qx2;  // 2*cos(t)*sin(t) * x / sqrt(xx+yy+zz)   sin(2t)
	const wy2 = s2*qy2;  // 2*cos(t)*sin(t) * y / sqrt(xx+yy+zz)   sin(2t)
	const wz2 = s2*qz2;  // 2*cos(t)*sin(t) * z / sqrt(xx+yy+zz)   sin(2t)
	                          
	const xx2 = c2*qx2*qx2;  // 2*sin(t)*sin(t) * y * y / (xx+yy+zz)   1 - cos(2t)
	const yy2 = c2*qy2*qy2;  // 2*sin(t)*sin(t) * x * x / (xx+yy+zz)   1 - cos(2t)
	const zz2 = c2*qz2*qz2;  // 2*sin(t)*sin(t) * z * z / (xx+yy+zz)   1 - cos(2t)

	const basis = { right  :{ x : 1 - ( yy2 + zz2 ),  y :     ( wz2 + xy2 ), z :     ( xz2 - wy2 ) }
	              , up     :{ x :     ( xy2 - wz2 ),  y : 1 - ( zz2 + xx2 ), z :     ( wx2 + yz2 ) }
	              , forward:{ x :     ( wy2 + xz2 ),  y :     ( yz2 - wx2 ), z : 1 - ( xx2 + yy2 ) }
	              };
	return basis;	
}


	const basis = { right  :{ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) }
	              , up     :{ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) }
	              , forward:{ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) }
	              };
	const basis2 = { right  :{ x : 1 - ( yy2 + zz2 ),  y :     ( wz2 + xy2 ), z :     ( xz2 - wy2 ) }
	              , up     :{ x :     ( xy2 - wz2 ),  y : 1 - ( zz2 + xx2 ), z :     ( wx2 + yz2 ) }
	              , forward:{ x :     ( wy2 + xz2 ),  y :     ( yz2 - wx2 ), z : 1 - ( xx2 + yy2 ) }
	              };


	( xy - wz ) = ( xy2 - wz2 )
	 1 - ( zz + xx ) = 1 - ( zz2 + xx2 )
	( wx + yz ) = ( wx2 + yz2 ) 
	
	( c*qx*qy - s*qz ) = ( c2*qx2*qy2 - s2*qz2 )
	 ( c*qz*qz + c*qx*qx ) = ( c2*qz2*qz2 + c2*qx2*qx2 )
	( s*qx + c*qy*qz ) = (  s2*qx2 + c2*qy2*qz2 ) 


	( c*qx*qy - s*qz ) = ( c2*qx2*qy2 - s2*qz2 )
	 ( c*qz*qz + c*qx*qx ) = ( c2*qz2*qz2 + c2*qx2*qx2 )
	( s*qx + c*qy*qz - s2*qx2)/c2*qy2 = (  qz2 ) 

	( c*qx*qy - s*qz ) = ( c2*qx2*qy2*c2*qy2 - s2* (s*qx + c*qy*qz - s2*qx2)/c2*qy2 
	 ( c*qz*qz + c*qx*qx ) = ( c2*qz2*qz2 + c2*qx2*qx2 )
	 ( s*qx + c*qy*qz - s2*qx2)/c2*qy2 = (  qz2 ) 

	 +  s2* (s*qx + c*qy*qz - s2*qx2  =  ( c2*qx2*qy2  - c*qx*qy - s*qz )*c2*qy2

	 ( c*qz*qz + c*qx*qx ) = ( c2*qz2*qz2 + c2*qx2*qx2 )
	 ( s*qx + c*qy*qz - s2*qx2)/c2*qy2 = (  qz2 ) 


-- try 2 ----
	( c*qx*qy - s*qz ) = ( c2*qx2*qy2 - s2*qz2 )
    sqrt((( c*qz*qz + c*qx*qx ) - c2*qz2*qz2)/c2) = qx2 
	( s*qx + c*qy*qz - s2*qx2)/c2*qy2 = (  qz2 ) 

	( c*qx*qy - s*qz ) = ( c2*sqrt((( c*qz*qz + c*qx*qx ) - c2*qz2*qz2)/c2)*qy2 - s2*qz2 )

-- try 3 ----
	( c*qx*qy - s*qz ) = ( c2*qx2*qy2 - s2*qz2 )
	 ( c*qz*qz + c*qx*qx ) = ( c2*qz2*qz2 + c2*qx2*qx2 )
	( s*qx + c*qy*qz ) = (  s2*qx2 + c2*qy2*qz2 ) 



	( c*qz*qz + c*qx*qx ) * (  s2*qx2 + c2*qy2*qz2 )  - ( s*qx + c*qy*qz ) * ( c2*qz2*qz2 + c2*qx2*qx2 )
	( c*qx*qy - s*qz ) * (  s2*qx2 + c2*qy2*qz2 )  - ( s*qx + c*qy*qz ) * ( c2*qx2*qy2 - s2*qz2 )
	( c*qx*qy - s*qz ) * ( c2*qz2*qz2 + c2*qx2*qx2 ) - (  s2*qx2 + c2*qy2*qz2 ) * ( c*qx*qy - s*qz )
	
	
	
	------
	
	// x axis at 0
	// x->z
	py_x = cos(x)  // prinicpal
	y_x = py_x + floor((((x+2pi)/2pi)-0.5)*2)
	pz_x = sin(x)  // principal
	z_x = pz_z + floor((((x+2pi)/2pi)-0.5)*2)
	
	// z axis at 0
	// z->y
	px_y = sin(y)
	x_y  = px_y + floor((((y+2pi)/2pi)-0.5)*2)
	pz_y = cos(y)
	z_y  = pz_y + floor((((y+2pi)/2pi)-0.5)*2)

	// y axis at 0
	// y->x
	px_z = sin(z)
	x_z  = px_z + floor((((z+2pi)/2pi)-0.5)*2)
	py_z = cos(z)
	y_z  = py_z + floor((((z+2pi)/2pi)-0.5)*2)

	
	x_z * x_y + y_z * x_y
	
	y_z(z) * x_y(y) + z_y(y) * x_z(z)
	x_z(z) * z_y(y) + x_y(y) * y_z(z)
	
	y_x(x) * (y_z(z) * x_y(y) + z_y(y) * x_z(z)) + ( x_z(z) * z_y(y) + x_y(y) * y_z(z)) * z_x(x)
	z_x(x) * (x_z(z) * z_y(y) + x_y(y) * y_z(z)) + ( y_z(z) * x_y(y) + z_y(y) * x_z(z)) * y_x(x)
	
	
	
	x = x + cos(z)*(sqrt(xx+yy))
	y = y + sin(z)*(sqrt(xx+yy))

	z = z + cos(x)*(sqrt(xx+yy))
	y = y + sin(x)*(sqrt(xx+yy))





	x = sin(y*dt);//1 + cos(y*dt)
	y = cos(y*dt);//1 + 

	
	sin(xa+ya)= 
	
	xa/ sqrt(xaxa+yaya+zaza)
	
	cos(xa+ya)= 
	
	za / sqrt(xaxa+yaya+zaza)
	
	
	
	
	
	
	
	
	x2 = x + cos(z)*(sqrt(xx+yy))
	y2 = y + sin(z)*(sqrt(xx+yy))

	z2 = z + cos(x)*(sqrt(xx+yy))
	y3 = y2 + sin(x+z)*(sqrt(xx+yy))
	
https://nilesjohnson.net/hopf-articles/Shoemake_quatut.pdf

q* is
Q =







 w2+x2–y2–z2 2(xy–wz) 2(xz+wy) 0
2(xy+wz) w2–x2+y2–z2 2(yz–wx) 0
2(xz–wy) 2(yz+wx) w2–x2–y2+z2 0
0 0 0 w2+x2+y2+z2
 = 


 (wI+(v×-))2+vvT 0
0T N(q)
This simplifies to
Q =


 N(q)–2(y2+z2) 2(xy–wz) 2(xz+wy) 0
2(xy+wz) N(q)–2(x2+z2) 2(yz–wx) 0
2(xz–wy) 2(yz+wx) N(q)–2(x2+y2) 0
0 0 0 N(q)
 ≅

 1–s(y^2+z^2) s(xy–wz) s(xz+wy) 0
s(xy+wz) 1–s(x^2+z^2) s(yz–wx) 0
s(xz–wy) s(yz+wx) 1–s(x^2+y^2) 0
0 0 0 1
; s = 2 / N(q)

s = curvature where 0 is a straight line and 1/s = radius of circle (which = N(q)/2 )

the x/y/z portions are the wings
(wI+(v × -))2+v * vT


w –z y x
z w –x y
–y x w z
–x –y –z w

	// basis moves... the determinent and the extra are separate calculations...
	// x->z makes a delta

	// forward and right are moved... up stays the same...


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



	const t = ( ( basis.right.x + basis.up.y + basis.forward.z ) - 1 )/2;
	// length of Q (from as a matrix)
	let angle = acos(t);
	st2 = angle?1/sin(angle):0;

	//const zy = basis.up     .z - basis.forward.y;
	//const zy = basis.up     .z - (v3.y + v4.y);
	const zy = basis.up     .z - (asis.forward.y*dcos + basis.right.y*dsin);
	//const xz = basis.forward.x - basis.right  .z;
	//const xz = (v3.x + v4.x) - (v1.z - v2.z);
	const xz = (basis.forward.x*dcos + basis.right.x*dsin) - (basis.right.z*dcos - basis.forward.z*dsin );
	//const yx = basis.right  .y - basis.up     .x;
	//const yx = (v1.y - v2.y) - basis.up     .x;
	const yx = (vbasis.right.y*dcos - basis.forward.y*dsin) - basis.up     .x;
	const nR = Math.sqrt(zy*zy + xz*xz + xy*xy ); // 2*sin(2t)

	this.nx = zy /st2;
	this.ny = xz *tmp;
	this.nz = yx *tmp;
	const lNorm = angle / (Math.abs(this.nx)+Math.abs(this.ny)+Math.abs(this.nz));
	
	
	this.x = zy /nR * angle / ( |zy/nR| + |xz/nR| + |yx/nR| );
	this.y = xz /nR * angle / ( |zy/nR| + |xz/nR| + |yx/nR| );
	this.z = yx /nR * angle / ( |zy/nR| + |xz/nR| + |yx/nR| );



	const basis2 = { right  :{ x : 1 - ( yy2 + zz2 ),  y :     ( wz2 + xy2 ), z :     ( xz2 - wy2 ) }
	              , up     :{ x :     ( xy2 - wz2 ),  y : 1 - ( zz2 + xx2 ), z :     ( wx2 + zy2 ) }
	              , forward:{ x :     ( wy2 + xz2 ),  y :     ( yz2 - wx2 ), z : 1 - ( xx2 + yy2 ) }
	              };
	
	
	( wx2 + yz2 ) - ( yz2 - wx2 )
	( wy2 + xz2 ) - ( xz2 - wy2 )
	( wz2 + xy2 ) - ( xy2 - wz2 )
	
	yz = 2wx2
	xz = 2wy2
	yx = 2wz2
	
	yz = 2 s2*qx2
	xz = 2 s2*qy2
	yx = 2 s2*qz2
	
	
	yz = 2 Math.sin( 2*  nt2 )*qnx
	xz = 2 Math.sin( 2*  nt2 )*qny
	yx = 2 Math.sin( 2*  nt2 )*qnz
	
	
	
	const s2  = Math.sin( 2*  nt2 ); // sin/cos are the function of exp()
	const c2 = 1- Math.cos( 2*  nt2 ); // sin/cos are the function of exp()

	const qx2 = q2.nx; // normalizes the imaginary parts
	const qy2 = q2.ny; // set the sin of their composite angle as their total
	const qz2 = q2.nz; // output = 1(unit vector) * sin  in  x,y,z parts.




---------------------------



tan c/2 C =

tanB/2 B + tanA/2 A + tanB/2TanA/2 B X A
----------
1 - tan B/2 tanA/2 B dot A

tB *
B.x B.y B.z

tA *
A.x A.y A.z

tA*tB *
B.y*A.z - B.z*A.y
B.z*A.x - B.x*A.z
B.x*A.y - B.y*A.x

-------------
1 - tA*tB* A.x*B.x+A.y*B.y+A.z*B.z

