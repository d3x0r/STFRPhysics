https://d3x0r.github.io/STFRPhysics/3d/index.html

```
cos
-sin
-cos
sin

x y z curvature.
0 = line 
2pi = unit circle
arc length
angle are also understandable labels, if not right.

what I'm drawing is (normal direction * angle) = x,y,z of the point.

what I want to curve is angle*normal

the axis of curvature is specified based on the log-quat's current curvature.
the bivector of the plane to translate x(t) and y(t) are also available.

x(0) = no additional curve
y(0) = no additional curve

x(1) = 

				const forward = lnQ.applyDel( {x:0,y:1,z:0}, 0.5 );
				const right = lnQ.applyDel( {x:0,y:1,z:0}, 0.5 );
				
								let new_v_2 = { x: new_v_.y * new_v.z - new_v_.z * new_v.y 
				              , y: new_v_.z * new_v.x - new_v_.x * new_v.z
				              , z: new_v_.x * new_v.y - new_v_.y * new_v.x 
				              };
				const lnv2 = Math.sqrt(new_v_2.x*new_v_2.x + new_v_2.y*new_v_2.y + new_v_2.z*new_v_2.z );
				new_v_2.x *= 1/lnv2;
				new_v_2.y *= 1/lnv2;
				new_v_2.z *= 1/lnv2;



					const origin = { x:lnQ.nx*lnQ.nL, y:lnQ.ny*lnQ.nL, z:lnQ.nz*lnQ.nL };
					//const rotation;
						const rgt = (x) => Math.sin(x);
						const fwd = (x) => Math.cos(x);
					let r = rgt( lnQ.nL * Math.PI/16 );
					let f = fwd( lnQ.nL * Math.PI/16 );
					let newF = { x : forward.x * f + right.x * r, y:forward.y*f + right.y*r, z:forward.z*f + right.z * r };



// tangent = { x: cos( q.nx ), y: cos( q.nx ), z: cos( q.nx ) }
// tangentLen = 1/sqrt( tangent.x*tangent.x + tangent.y+tangent.y + tangent.z+tangent.z );
// tangent.x *= tangentLen;     tangent.z *= tangentLen;     tangent.y *= tangentLen;
// T = tangent;

// principle unit normal = kN = { x: -sin(tangent.x), y: -sin(tangent.y), z: -sin(tangent.z) };
// normalLen = sqrt( N.x*N.x+ N.y*N.y + N.z*N.z);
// N = { x:kN.x/normalLen,y:kN.y/normalLen,z:kN.z/normalLen };

B = { x: T.y * N.z - T.z * N.y 
    , x: T.z * N.x - T.x * N.z 
    , x: T.z * N.y - T.y * N.x };

// dB/ds is parallel to N
//


tangent vector
	
	dot? = derivitive of ? / dt
	dotX = dX/dt
	
	
	r(t) = radius vector.
T(t) =	dotR / |dotR |
    = dotR / dotS
	= dr/ds
	
	t is parameterarization (scalar (1))   s is unit length 
	
	
	x(t) = dotF / sqrt( dotF^2 + dotG^2 )
	y(t) = dotG / sqrt( dotF^2 + dotG^2 )
	
	dT/ds = k N
	dT/dt = k ds/dt N
	
	
	y(t) = cos(t)
	x(t) = sin(t) 
	
	dy(t) = -sin(t)
	dx(t) = cos(t)
	
	d2y(t) = -cos(t)
	d2x(t) = -sin(t)
	
	
	α(s) = a sec(s + s0) γ(s),
	
	
	
	k ~~ dPhi/ds
	
	     dPhi/dt   /   ds/dt
		 
		 
		 dPhi/dt    /   sqrt( (dx/dt)^2 + (dy/dt)^2 )
		 
		 phi is tangential angle
		 s is arc length
		 
		 dphi/dt =
		  
		    tan phi = dy/dx
			
			 d (tanPhi)/dt = sec ^2 phi dphi/dt  = 
			 
			 
			 k = -cos(t)^2 -  sin(t)^2  1/2
			 
			 
			 
	ds^2 =	 e du^2  + 2 F du dv   + Gdv^2
			 
			 
			 
			 ak1sinω+ak2cosω=sinω
			 
			 a k1 sinw + a k2 cos w = sin w
			 
			 
```		 
			 
 so... I found these things called 'bertrand curves' which is a theorum that says that for some curve in space there exists another curve with the same normal; which is true when changing a rotation around a single axel that doesn't change...
 
 But they work on a Frenet frame, which is a orthagonal basis representing a curvature with [T,N,B] (tangent, normal, binormal} ... but the 'tangent' isnt actually tangent to the curve, but is the axis of rotation for that curvature, the normal is based entirely off the Tangent to choose some arbitrary 'up' and then the binormal is the cross product of those.
 This leads to basis frames that don't really indicate very much about the curve, other than it's axis of rotation; the normal and binormal are not along the curve... I've tried a few different ways to compose the frenet frame from curvatures, and even getting it aligned 'properly' with the curve, such that the normal is perpendicular to the curve at time T(or arc S), then that somehow does not reverse into the same curvature.
 So now I understand why this rotation thing is so obvious to me, and why I can't find anything other than a bunch of math equations, which abstractly still work the same, but produce nearly useless geometric properties, because the basis frame is so skew to the actual curve.
 I'm not even sure that the frenet frame is reversible to a curvature (even within the 1/2 rotation limit that is imposed by getting normal vectors anyway)