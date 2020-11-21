
# Development of Relativistic Rotations

<TBD>

d3ck0r@gmail.com

Independant Studies

## Abstract

There exists a coordinate space of rotations that is not self covering.  The essential function defining this rotation space map 
is the exponential of a log-complex, and by extension a log-vector-complex.  This paper will define a notation of log
complex numbers, and modification to the exponential function, the extension from a single scalar to a scaled unit vector, 
conversion to quaternion, define the cross product of two natural log vector complex numbers, get of the basis vectors of
a rotation, apply log vector complex to a point to rotate, applications, comparison with existing methods and rotation 
mappings, and additional experimental methods to try.

## Introduction

The coordinate space of rotations, hence called 'rotation space' or 'rotation map', is a continuous, infinite space consisiting
of N perpendicular axles which together apply curvature to a space.  Curvature is a translation of a rectangular space around 1 or more axles;
additional axles composite into a single composite axle, around which all space is translated or warped.  The coordinates of a curvature are
in terms of `dTheta/dT`, similar to velocity expressed in (X,Y,Z) linear coordinates with units of `dPosition/dT`.
Velocity sums to a position, angular velocity sums to an angular position.  

Curvature at time 0 is the same as a curvature of 0 at any other time `T`; which is the basis frame representing the new (X/Y/Z) 
vectors used to warp all points in the frame to this new frame.

The rotation space is linear, and can be compared relatively (which is to say to take the difference of the rotations).
While the differential rotation is knowable, and defines a specific axis/angle itself, the required path to move the rotation coordinate,
when properly constrained to rotation composition, is a different matter.  Much like in life, although a line from 'here' to 'there', doesn't mean you can use
that line to get 'there'; in space, for example, gravity applies a curvature to forward velocity, and the path of least effort is curved rather than the direct linear path.
When a rotation is rotated, the operation is the [cross product](#lna-x-lnb---the-cross-product-of-natural-log-vector-complex-numbers) of two log quaternions: `lnQ1 ⨯ lnQ2`; which is equivalent to `exp(lnQ1) ⨯ exp(lnQ2)`; the math steps performed are different.  The `lnQ1 ⨯ lnQ2`
results with the correct relative angles within the rotation space; including potential orbital jumps.

'Rotation' is typically only considers  the translation of points in space at a specific instant, 
rather than across all time from `0` until that instant, or beyond.  Simply setting `Time=1`(`T`), and computing the fixed formula based on
this constant, is equivalent to a 'rotation' . Rotation as a math operation may be considered a subset of curvatures specified in rotation space.

In every 3D physics and game engine, objects have 6 dimensions, 3 which represent it's velocity and 3 that
represent it's angular velocity.   The unit vector representing velocity is the direction of motion, while
the unit of the vector representing angular velocity is the axis of rotation.  The length of the velocity
vector represents the speed of an object, similarly the sum of the angles of the angular velocity [represents](#regarding-specific-representation)
the total angular warp of coodinate space.

This is *NOT* Euler Angles.  A quick check reveals that it's quite infeasible to get a rotation axis from Euler Angle coodinates; while
log vector complex representation immediately yields the axle.   Coordinates within the rotation space have a concentric spherical shell nature to them, any radial line 
from the origin in the rotation space is the same axle, with a different angular speed.  

Operational Note, and speculation: Especially at high curvatures, the difference between two frames may be a chord through the lower concentric spherical shells, which would require it to lose a signficant amount of speed before getting to the destination; the line of lower effert would be a curve around the origin, translating between the shell layers, while  pivoting the origin around an axis at the cross product of the differential axles.  Similarly say when navigating space between planets, the path of lowest energy is not a straight line, but rather is a curved line; in a more direct instance, if you have a point on the ground, and a point on a roof, there is no way to traverse the straight line, being constrained by the system the points are in; rotations have similar constraints on their effective motion changes.

### Glossary

- apply - Multiply a vector by a matrix or matrix by matrix, or quaternion times quaternion.  Addition is simple
    in many cases, so, although true that `A X -B = exp(ln(A)-ln(B))` this only works for rotations within the same frame, or fixed to
    another frame.  Rotation of a rotation by rotation outside of the rotation itself is still a form of multiplication.
- axle - An axis of curvature, or more commonly, axis of rotation.
- curvature - a change in angle over time.
   - A point translated to another location by curving its forward motion; does not require a third point like 'rotation'. 
   - Warps the relative space around an axle, thereby translating all points in that space to a new position.
- frame - The orientation, which can be desribed by the basis vectors 'right', 'up', and 'forward'; A full frame would include velocity also.
- log-complex - A natural log of a complex number.
- modulate - Applying a modulo operator to a number to get the prinicpal angle result.
- rotation - A specific translation of spacial coordinates around a point.
  - A point translated to another location describing a pivot around a third point.
  - Specifies a fixed frame which can be applied to translate points to a new position.
- spin - Basically 'rotation', however, it's not expressed by an angle like rotation, but measured in a curvature.
- vector-complex - A complex number, but the real coordinate and the imaginary coordinate are vector quantities normalized with square root of the sum of squares.
- [warp](#warping-space) - Apply a smooth translation over time to translate the points in the space around an axle. 
---



### Quaternion

To Be Deleted...

The conversion to quaternion could be specified as a given rule (Figure H).  
Intuitively, expanding the vector across a matrix assigns the imaginary parts.  

The math partials look like `sin(θ/2)` and `cos(θ/2)` for a quaternion; however, when the multiplications
are simplified there are terms which are actually double angle substitutions. Rodrigues' Rotation Formula 
is all in terms of alpha/2, beta/2 and gamma/2.  The quaternion `θ/2` is reverse scalar to split the product?  Or,
because quaternions are always muultiplied the `θ/2+θ/2 = θ` result?

Having simplifed the math internally (removing common terms, consolidating constants) to work with log quaternions,
turns out that keeping `sin(θ/2)` and `cos(θ/2)` actually `sin(2*θ/2)` or `sin(θ)`, the same for `cos`.

__Figure H__
``` js
   (x,y,z)i =  sin(arcsin(x)/2)i + sin(arcsin(y)/2)j + sin(arcsin(z)/2)k;
```

### Log Vector Complex to Quaternion conversion

The sum of the curvatures is the total rotation of the system, or is the angle around the axle to curve all
other spacial points by.  `sqrt( x*x + y*y + z*z )` is the total rotation.  The axis of rotation is the same coordinates
normalized by their square normal `sqrt(X*X+Y*Y+Z*Z)`.  Using the same method for `exp(lnC)` (figure C), 
while treating B as a vector (Figure G).

__Figure G__
``` js
  exp( A+(x,y,z)ε ) = exp(A) * cos( (|x|+|y|/|z|) ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) * exp(A) * sin( |A| ) i
```


If the log-quaternion has a 0 real part, as `exp(0)=1`, every nil log-quaternion is a valid unit quaternion (figure H).

__Figure H__
``` js
  exp( 0 + (x,y,z)ε ) = 1 * cos( (|x|+|y|/|z|) ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) * 1 * sin( sqrt( x*x + y*y + z*z ) ) i

  -becomes-
  exp( 0 + (x,y,z)ε ) = cos( (|x|+|y|/|z|) ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) sin( sqrt( x*x + y*y + z*z ) ) i
```

(Figure H) resembles the axis-angle conversion to quaternion `cos(θ/2) + sin(θ/2) * xi + sin(θ/2) * yj + sin(θ/2) * zk`  where `x,y,z` are a normalized axis of rotation, 
and `θ` is the angle of rotation around that axle; although for the log-complex and subsequent operations, `θ` is more use than `θ/2`; and `θ/2` is only used in 
the application of a rotation to a rotation or for the rotation of a point.


### Vector Complex to Log Complex (ln(vector complex))

Compute the normal, and the angle from the real component's `arccos()` (Figure I).

__Figure I__
``` js
   axisSquare = sqrt(x*x+y*y+z*z)   // square the axis
   normAB = sqrt( A + axisSquare ); // square the real and axis parts (results in cos(θ)+sin(θ)...)
   angle = acos(A/normAB)*2
```

And finally build the log-quaternion (Figure J).

__Figure J__
``` js
   ln( A+(x,y,z)i ) = ln(normAB) + angle * ( (x/axisSquare)/sin(angle)
                                           , (y/axisSquare)/sin(angle)
                                           , (z/axisSquare)/sin(angle) ) ε
```

For programmatic purposes, the scaling of the real part may not matter, and the expression (figure K) might be more useful, instead of `sign(A)*exp(ln(|A|))`, use `A`; especially if `A=0` and the long expression would fail on `ln(x<=0)` .

__Figure K__
``` js
   ln( A+(x,y,z)i ) = A/cos(angle) + angle * ( (x/axisSquare)/sin(angle)
                                             , (y/axisSquare)/sin(angle)
                                             , (z/axisSquare)/sin(angle) ) ε
```

### lnA x lnB - The Cross Product of Natural Log Vector Complex Numbers

Rodrigues' Rotation Forumla is used to rotate a rotation (Figure L).  This is a general purpose rotation of a rotation around some aribtrary axis by some angle `θ`, which retains relative angles. The 'Twister.md' document goes into [more detail](Twister.md) about this procedure.  When
adding `ln(A+Bi)+ln(C+Di)` as scalar complex numbers, the axle is parallel/coincidental so the addition/subtraction of the angle becomes a straight addition or subtraction.  When the axles are not parallel, partial values of the angles of each rotation are used.

Here, `ax`, `ay`, and `az` could be filled by any normalized unit axis, and `x`,`y`, and `z` specify the rotation being rotated around the axis.

Note; while this method almost works, I do think there's a more reliable and direct method available; however Rodrigues' Rotation Forumla, does still truncate the result to
+/-2π.

__Figure L__
``` js
	θ = sqrt( x*x + y*y + z*z )
	as = sin( θ )
	ac = cos( θ )
	q = { qw: cos( sqrt( x*x + y*y + z*z ) / 2 )
            , s : sin( sqrt( x*x + y*y + z*z ) / 2 )
	    , nL : sqrt( x*x + y*y + z*z )
	    , nx : x / sqrt( x*x + y*y + z*z )
	    , ny : y / sqrt( x*x + y*y + z*z )
	    , nz : z / sqrt( x*x + y*y + z*z )
	    }

	AdotB = q.nx*ax + q.ny*ay + q.nz*az;        // dot product of axles
	angle = acos( q.qw*ac - q.s*as*( AdotB ) ); // really angle/2
	sAng = Math.sin(angle); // same as sqrt(xx+yy+zz); for x,y,z below

	if( sAng < 0.0001) {
		// if the two axles are coincident, directly add/subtract the angular speed
		if( AdotB > 0 ) {
			x = x / q.nL * (q.nL+th);
			y = y / q.nL * (q.nL+th);
			z = z / q.nL * (q.nL+th);
		}else {
			x = x / q.nL * (q.nL-th);
			y = y / q.nL * (q.nL-th);
			z = z / q.nL * (q.nL-th);
		}
	} else {
		Cx = as * q.qw * ax + q.s * ac * q.nx + q.s*as*(ay*q.nz-az*q.ny);
		Cy = as * q.qw * ay + q.s * ac * q.ny + q.s*as*(az*q.nx-ax*q.nz);
		Cz = as * q.qw * az + q.s * ac * q.nz + q.s*as*(ax*q.ny-ay*q.nx);

		Clx = angle / sqrt( Cx*Cx + Cy*Cy + Cz*Cz );

		// angle angle angle
		x = Cx*Clx;
		y = Cy*Clx;
		z = Cz*Clx;
	}
```

### Getting the frame of a rotation

For a log quaternion `(x,y,z)`, the basis matrix is computed by applying the rotation to the fixed points `(1,0,0)`,`(0,1,0)`, and `(0,0,1)` and using the result as the
basis vectors to scale spacial points with.  The first part of the matrix calculation(Figure M) is often precomputed for a tick of `1`, and can be looked up.  Specifying a delta other than `1` requires recomputing the `sin()` and `cos()` of the rotation.

This matrix representation is on the talk page of [Quaternions and spatial rotation](https://en.wikipedia.org/wiki/Talk:Quaternions_and_spatial_rotation#Derivation_(COI_Edit_Request)) under Derivation (COI Edit Request).

__Figure M__
``` js
	if( !del ) del = 1.0; // assume 1.0 as time to show.
	
	θ = sqrt( x*x + y*y + z*z )
	s = Math.sin( del * θ );    // sin/cos are the function of exp()
	c = Math.cos( del * θ ); // sin/cos are the function of exp()
	m = 1 - c; // sin/cos are the function of exp()

	qx = x/nR; // normalizes the imaginary parts
	qy = y/nR; // output = 1(unit vector)  in  x,y,z parts.
	qz = z/nR; // 
```

One might note that multiplications for this are highly parallel, and the resulting basis matrix is nearly cheaper than rotating an arbitrary point; however
applying the matrix to every point afterward manually increases the amount of calculations to greater than applying the rotation to a point, especially with
the `sin()` and `cos()` precomputed.

__Figure N__
``` js
	xy = m*qx*qy;  // x * y / (xx+yy+zz) * (1 - cos(t))
	yz = m*qy*qz;  // y * z / (xx+yy+zz) * (1 - cos(t))
	xz = m*qx*qz;  // x * z / (xx+yy+zz) * (1 - cos(t))

	wx = s*qx;     // x / sqrt(xx+yy+zz) * sin(t)
	wy = s*qy;     // y / sqrt(xx+yy+zz) * sin(t)
	wz = s*qz;     // z / sqrt(xx+yy+zz) * sin(t)

	xx = m*qx*qx;  // y * y / (xx+yy+zz) * (1 - cos(t))
	yy = m*qy*qy;  // x * x / (xx+yy+zz) * (1 - cos(t))
	zz = m*qz*qz;  // z * z / (xx+yy+zz) * (1 - cos(t))

	basis = { right  :{ x : c + xx , y : wz + xy, z : xz - wy }
                , up     :{ x : xy - wz, y : c + yy , z : wx + yz }
                , forward:{ x : wy + xz, y : yz - wx, z : c + zz  }
        };
```

### Rotating a 3D vector

(Figure S) applies a rotation to a single point.  Given a point `v`, with `x,y,z` coordinates, and rotation `q` with `nx,ny,nz,s:sin(θ/2),qw:cos(θ/2)`, result with `x,y,z`.  The working
variable `nst` is `normal sign theta`; `qw` is `exp(lnQ).w` or `cos(theta/2)`.  This is essentially the same procedure as applying a quaternion to a point, with the
short `exp()` builtin as cached values.

__Figure S__
``` js
	θ  = sqrt( x*x + y*y + z*z )
	s  = sin(θ/2)
	c  = cos(θ/2)

	qx = q.nx*s;
	qy = q.ny*s;
	qz = q.nz*s;

	tx = 2 * (qy * v.z - qz * v.y)
	ty = 2 * (qz * v.x - qx * v.z)
	tz = 2 * (qx * v.y - qy * v.x)

	x = v.x + c * tx + ( qy * tz - ty * qz )
	y = v.y + c * ty + ( qz * tx - tz * qx )
	z = v.z + c * tz + ( qx * ty - tx * qy )

```

### Applications

Relative rotations can be used to synchronize two rotating bodies; in games or a purely virtual world, this gives a direct SLERP operation with addition.  The rotation
can be synchronized separately from the linear position; for example piloting a craft in Elite Dangerous and docking at a station from a tangential approach to the docking bay.

Surfaces with curvatures more than zero, can be compared relatively by looking at the change in curvature from one location to another; this would be comparing
unit curvatures or curvatures at `T=1`.

This rotation system also gives the ability to render theoretical curves like Bertrand Curves where all the frames have a common normal axis to them.  Also can demonstrate Hopf Fibrations by doing arbitrary rotations around 3 axles, again, maintaining the base relative rotation coordinate, instead of being truncated.

### Comparison to Existing Methods

There is a system 'Euler angles', but the angles are applied in a specfic order in order to rotate a space, so comparisons
of two sets of angles fails to produce a meaningful result; it is also nearly impossible to get an axis of rotation from Euler angles.
While similar to Euler angles, in that this is also 3 angles, this is NOT Euler angles.  

Other than Euler angles, existing methods of representing and computing 
rotations are at a specific time `T=1`, and lose the flexibility
to evaluate their basis frame at any other step.  The computational cost of keeping homogenous angles is low, `sin()` and `cos()` functions are less
expensive than `sqrt()`, and that's not all that expensive; the order of operations is actually highly parallel in the computations, requiring
few vector reorders for cross-product type operations.  Existing models of rotation with multiplication are limited to 0-2pi; this is only 1/2 of the rotation space; 
there's lots of talk about 'double covering' of spherical coordinate systems,
but there is no 'covering' except when the rotation is projected to a sphere and used to curve space at some time; 
although it should be noted that the phrase would be 'infinite covering' of projected rotations, 
where every +2π rotation results with the same basis frame or representation of the rotation.

This rotation space coordinate systems offer the flexibility to model rotation at any time T and not only at tick 1; versus, as mentioned, a rotation matrix or a 
quaternion is limited to representing the single
frame at T=1 for some base rotation (x,y,z).  Matricii and quaternions also only represent the principal projection of that rotation, 
such that they have no concept of behaving differently when rotating multiple times before the `T=1` frame that they represent.

There are some things this can't do
 - can't generate a mandelbrot without taking the modulo of the current angular velocity; for some result spin more than π, the result has to wrap to -π.
 - doesn't compare products of numbers, especially prime numbers that are a modulo of (2?)π.


### Generalized Parameterization of Log Complex (experimental)

Further experimentation can explore the possibilty of splitting the single scalar into two parts; or perhaps a ratio factor of amount to apply spin vs linear(real) factor.
The exponentiation of a log complex number, as defined, applies the same 'A' scalar to the real and imaginary components, instead the scalar could be split
to specify two differnt constants for the real and imaginary components (Figure O).  

__Figure O__
``` js
   (ln(A1), ln(A2)) + (x,y,z)ε
```

which, on exponentiation can be (figure P)

__Figure P__
``` js
  theta = sqrt( x*x + y*y + z*z );
  sqNorm = sqrt( x*x + y*y + z*z );
  exp(ln(A1))*cos(theta/2) + exp(ln(A2)) * sin(theta/2) * ( x/sqNorm, y/sqNorm, z/sqNorm )i
```

which (should) give more an an elliptical projection from log-complex space given 5 dimensions (Figure Q).

Recovering the separate `A1`, and `A2` values from a complex number is improbable, it would look like a change in the angle computed by the tangent;
also probably starts as a divide by 2 to each side (so the sum of the logs is the numbers multiplied).

__Figure Q__
``` js
 ( R, X, Y, Z ) -> (x,y,z,angle,offset) 
        describes 3 dimensional axis, rotation around that axis, 
        and the offset of the rotation from 1.0 around that axis... 
        (which looks like 5 degrees of freedom encoded in 4 numbers)

 ( R1, R2, X, Y, Z ) -> (x,y,z,angle, offset, alpha_blend of rotation/linear scalar?) 

 // These can be scaled the same way the x/y/z are, and find another degree of freedom in their total
 //   
 len = |R1|+|R2| = R total
 R1Rel = R1/sqrt(R1+R2)
 R2Rel = R2/sqrt(R1+R2) 
 R1Lin = R1/len
 R2Lin = R2/len 
    exp(R1)*cos(theta/2) + exp(R2) * sin(theta/2) * ( x/sqNorm, y/sqNorm, z/sqNorm )i
```

### Warping Space

Consider a 'hairy ball', simliar to the 'Koosh Ball' toy, with hairs radiaitng form the origin of a space; as the curvature applied to warp
space increases, the curl of the hairs increases respectively around the axis of rotation.  A different, more finite example would be to consider
short hairs from `T=0` to `T=1` and consider how those hairs are simultaneously curled around an axle.

### Scope of Development

Existing development concentrated only on pure rotations, with 0 real part on the log-quaternion.  
The real part is a scalar of elevation from 1 to infinite and 1 to 0 at the same rate; it migt be considered an elevation or offset,
but a motion inertia or velocity vector has nothing to do the axis of rotation, and neither do accelerations, so this must still be computed with 
a cross product of the actual acceleration vector.

__Figure R__
``` js
   exp( 0+(x,y,z)ε ) = cos( (sqrt( x*x + y*y + z*z ))/2) 
                     + sin( (sqrt( x*x + y*y + z*z ))/2) * ( (x/sqrt(x*x+y*y+z*z))/sin(angle/2)
                     + sin( (sqrt( x*x + y*y + z*z ))/2) * ( (y/sqrt(x*x+y*y+z*z))/sin(angle/2)
                     + sin( (sqrt( x*x + y*y + z*z ))/2) * ( (z/sqrt(x*x+y*y+z*z))/sin(angle/2)
```


Operations like 'yaw', 'pitch' and 'roll' around the vectors defined by the frame require applying the curvature to `(1,0,0)`,`(0,1,0)`, and `(0,0,1)` to 
get the axis from an external perspctive, and then apply a rotation around that axis to the current spin.  These axles don't exist in the spin it itself,
but result by applying the curvature to regular cartesian space axis unit vectors, and using the relative external vector as a rotation axis.


# Further Work to do

If the `B` part of a complex number can be a vector, then could `A` also be a unit vector with a scalar?  That would represent the linear velocity, and would be
included in the rotation?  Seems like the result would be perpendicular to reality.


## Footnotes

 ### Footnote 1
   Author comment: Really sort of feels like we live in a '3D' universe: time, with 0 degrees of freedom, and a normal of 1 `(100T/1=100T)`; spin with 3 degrees of freedom, with a linear normal `(50,10)/(|50|+|10|)`; and linear motion with 3 degrees of freedom, with a square normal `(50,10)/sqrt(50*50+10*10)`.  A sequence `n^0, n^1, n^2,...` emerges; maybe there is a n^3 involved in (magnetics? Which falls off at a cube root?).  Does that get us to 10 (1+3+3+3) coordinates yet?

## Additional Resources

Wikipedia article with formatted maths.  https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Quaternion_Natural_Log  (wikipedia.wiki source file)


## References

[Youtube Video - quaternion expoentiation mapping](https://www.youtube.com/watch?v=UHzAY5Q7ji0), This is actually sort of the inverse way of looking at and understanding log-quaternions. It doesn't
matter so much what the shape of the projection is, but what the source data projects into.

[(FPGA lnQuat adder)](http://www.acsel-lab.com/arithmetic/arith20/papers/ARITH20_Arnold.pdf), Implemented quaternion pose tracking as adders in FPGA Robotics controller.

['Practical Exponential Coordinates using Implicit Dual Quaternions'](http://www.neil.dantam.name/papers/dantam2018practical.pdf) (still not a log system)

[Pose consensus based on dual quaternion algebra with application to decentralized formation control of mobile manipulators (Log- dual-quaternion)](https://arxiv.org/pdf/1810.08871.pdf)

[kinatimatic control with dual quaternions (euler number)](https://reader.elsevier.com/reader/sd/pii/S0022247X12000327?token=C2A88F2FE30E44EC9A7E1439E715AFAE52DDAC7E05FCCB26B5353C6F6EFEE671588329FD76F673D41FAC945FD9B7CAF4)

[Scaling a quaternion to a power through exp() and log(); Example Java Code](https://math.stackexchange.com/questions/939229/unit-quaternion-to-a-scalar-power)


### Applications of Dual Numbers

[dual quaternions, proper euler and imgangary matrix multiplication](https://parasol.tamu.edu/wafr/wafr2018/ppr_files/WAFR_2018_paper_1.pdf); recommends calculation of separate things, the position is mostly independant of the rotation, don't need to always track the projection AND inverse projection of the point.

[Math - Functions Of Dual Numbers](https://www.euclideanspace.com/maths/algebra/realNormedAlgebra/other/dualNumbers/functions/index.htm), only dual number exp, no ln.

[Meta-Complex Numbers](http://new.math.uiuc.edu/math198/MA198-2014/rgandre2/seminar.pdf), exp and ln; same old stuff, just a nice layout worth the credit.





