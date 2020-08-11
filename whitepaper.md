
# Development of Relativistic Rotations

<TBD>

d3ck0r@gmail.com

Independant Studies

## Abstract

The essential function defining this rotation space map is the exponetial of a log-complex, and by extension
of a log-vector-complex.

## Introduction

Curvature is a translation of a rectangular space around 1 or more axles; where additional axles composite
into a single composite axle, around which all space is translated.  The coordinates of a curvature are
in terms of `dTheta/dT`, similar to velocity expressed in (X,Y,Z) linear coordinates with units of `distance/dT`.
Just like velocity sums to a position, angular velocity sums to an angular position.  Curvature at time 0 is the same
as a curvature of 0 at any other time `T`; which is the basis frame representing the new (X/Y/Z) vectors, which can be
used to scale all points in the frame to this new frame.

The space of coordinates representing rotations is linear, be compared relatively (which is to say to 
take the difference of the rotations).
when a rotation is rotated, the operation is still `lnQ1 x lnQ2` and not addition, and is the 
same result as `exp(lnQ1) x exp(lnQ2)`; although the math performed is not the same, and the former 
retains the relative spin count over time.

In every 3D physics and game engine, objects have 6 dimensions, 3 which represent it's velocity and 3 that
represent it's angular velocity.   The normal vector representing velocity is the direction of motion, while
the normal of the vector representing angular velocity is the axis of rotation.  The length of the velocity
vector represents the speed of an object, similarly the sum of the angles of the angular velocity represents 
the total angular speed of an object.  



### Glossary

- apply() - Multiply a vector by a matrix or matrix by matrix, or quaternion times quaternion.  Addition is simple
    in many cases, so, although true that `A X -B = exp(ln(A)-ln(B))` this only works for rotations within the same frame, or fixed to
    another frame.  Rotation of a rotation by rotation outside of the rotation itself is still a form of multiplication.
- axle - An axis of curvature.
- curvature - A point translated to another location by curving its forward motion; does not require a third point.
- frame - The orientation, which can be desribed by the basis vectors 'right', 'up', and 'forward'; A full frame would include velocity also.
- log-complex - A natural log of a complex number.
- rotation - A point translated to another location describing a pivot around a third point.
- spin - Basically 'rotation', however, it's not expressed by an angle like rotation, but measured in a curvature.
- vector-complex - A complex number, but the real coordinate and the imaginary coordinate are vector quantities normalized with square root of the sum of squares.

---


### Applications

Relative rotations can be used to synchronize two rotating bodies; in games or a purely virtual world, this gives a direct SLERP operation with addition.  The rotation
can be synchronized separately from the linear position; for example piloting a craft in Elite Dangerous and docking at a station from a tangential approach to the docking bay.

Surfaces with curvatures more than zero, can be compared relatively by looking at the change in curvature from one location to another; this would be comparing
unit curvatures or curvatures at `T=1`.

This rotation system also gives the ability to render theoretical curves like Bertrand Curves where all the frames have a common normal axis to them.  Also can demonstrate Hopf Fibrations by doing arbitrary rotations around 3 axles, again, maintaining the base relative rotation coordinate, instead of being truncated.

### Comparison to Existing Methods

Existing models of rotation are limited to 0-2pi; this is only 1/2 of the rotation space; there's lots of talk about 'double covering' of spherical coordinate systems,
but there is no 'covering' except when the rotation is projected to a sphere and used to curve space at some time; although it should be noted that the phrase would
be 'infinite covering' of projected rotations, since for every +6π project as basis frame or representation of the rotation.

These coordinates offer the flexibility to model rotation at any time T and not just at tick 1; a rotation matrix or a 
quaternion are limited to representing the single
frame at T=1 for some base rotation (x,y,z).  They only represent the principal projection of that rotation, 
such that they have no concept of behaving differently when rotating multiple times before the `T=1` frame that they represent.


## Log of Complex Numbers and Exponentiation of Log Complex Numbers

The natural log of the complex number `0+i` is `π/2`.  This is just a scalar, however, it should be noted that this scalar is builtin to the 
standard arcsin/arccos functions,  which return `-π to π`, instead of `-2 to 2`;  `-2 * π/2 = -π`  and `2 * π/2 = π`. 
The resulting radians from sin/cos and their related arcsin/arccos functions include the `π/2` multiplication from `ln(i)`. 

The imaginary part doesn't collapse and become a real,  but instead remains as a dual number with a notation `ε`, and since the `π/2` 
scalar is builtin to the current defintions of sin/cos/arcsin/arccos, the notation of `ln(i)=ε` will be used rather than `ln(i)=πε/2`.  (Figure A)


Figure A
```
   ln(A+Bi)   = a+bε
   exp(a+bε)  = A+Bi
```

### Complex Numbers and Their Natural Log

Complex numbers of the form `A+Bi`, have a natural log, a generic log-complex will be called `lnC`.

Apply `exp()` to log-complex from a complex number, involves normalizing the real an imaginary 
components, and get the angle of rotation (Figure B).  This expression is simplified from other factors...


Figure B
```
    ln(A+Bi) = ln( sgn(A) * sqrt(A*A+B*B) ) + arcsin(B/sgn(A) * sqrt(A*A+B*B))*2 * ε

```

Exponent of a log complex (Figure C):

Figure C
```
    exp( A+Bε ) = exp(A) * cos( |B|/2 ) + exp(A) * B/sqrt(B*B) * sin( |B|/2 )i
```

(Figure C) simplifies for the following reasons:
  - `cos(x)=cos(-x)` the absolute value in the `cos()` expression is not needed.
  - `B/sqrt(B*B)` keeps the sign of B, which is lost in the `sin(|B|/2)`, is restored; so the abosolute value in the `sin()` expression is not needed.
  - B has a single dimension, this looks like it's equivalent to (Figure D).

Figure D
```
    exp( A+Bε ) = exp(A) * cos(B/2) + exp(A) * sin(B/2)i
```


Which becomes the common expression of `ln(A+Bi)` shown in (figure E).

Figure E
```
    exp( A+Bε ) = A * cos(B/2) + A * sin(B/2)i
```



It should be noted that (Figure D) simplifies specifically in the case of unit-vector rotations, since `A=0` and `exp(0)=1` to become (Figure F).

Figure F
```
    exp( 0+Bε ) = cos(B/2) + sin(B/2)i
```
### Vector Complex Extension

Instead of a single scalar `B` in the complex number, this can be represented with a multipart vector, which has a square normal of 1 scaled by a
common scaler `b`.

```
    if   B = (x,y,z)
    then A+Bi = A + (x,y,z)i
```

When for a unit scaled `B`, `B/sqrt(BB)`, the equivalent expression for a unit vector is `(x,y,z)/sqrt(xx+yy+zz)`.  However, this is not the only
way to define a unit vector, it may be defined as `+/-1=B/|B|`  or `(x,y,z)/(|x|+|y|+|z|))`; which also means there should be `+/-1=B/cbrt(BBB)` or 
`(x/y/z)/cbrt(xxx+yyy+zzz)` but I've never seen an application of this sort of normal (Footnote 1). 


### Log Vector Complex to Quaternion conversion

The sum of the curvatures is the total rotation of the system, or is the angle around the axle to curve all
other spacial points by.  `|X|+|Y|+|Z|` is the total rotation.  The axis of rotation is the same coordinates
normalized by their square normal `sqrt(X*X+Y*Y+Z*Z)`.  

Using the same method for `exp(lnC)`

Figure F
```
  exp( A+Bε ) = exp(A) * cos(|B|)/2) + exp(A) * B/sqrt(B*B) * sin( (B/|B|) /2)i
```

But instead treating B as a vector...

Figure G
```
  exp( A+(x,y,z)ε ) = exp(A) * cos( (|x|+|y|/|z|)/2 ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) * exp(A) * sin( |x|+|y|+|z| /2) i
```


If the log-quaternion has a 0 real part, then since `exp(0)=1`, every nil log-quaternion is a valid unit quaternion.

Figure H
```
  exp( 0 + (x,y,z)ε ) = 1 * cos( (|x|+|y|/|z|)/2 ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) * 1 * sin( |x|+|y|+|z| /2) i

  -becomes-
  exp( 0 + (x,y,z)ε ) = cos( (|x|+|y|/|z|)/2 ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) sin( |x|+|y|+|z| /2) i
```

Which resembles the axis-angle conversion to quaternion `cos(θ/2) + sin(θ/2) * xi + sin(θ/2) * yi + sin(θ/2) * zi`  where `x,y,z` are a normalized axis of rotation, 
and `θ` is the angle of rotation around that axle.


## Quaternion to Log Quatnerion

Compute the normal (Figure I)

Figure I
```
   axisSquare = sqrt(x*x+y*y+z*z)   // square the axis
   normAB = sqrt( A + axisSquare ); // square the real and axis parts (results in cos(theta/2)+sin(theta/2)...)

   angle = acos(A/normAB)*2
```

And finally build the log-quaternion...

Figure J
```
   ln( A+(x,y,z)i ) = ln(normAB) + angle * ( (x/axisSquare)/sin(angle/2),  (y/axisSquare)/sin(angle/2), (z/axisSquare)/sin(angle/2) ) ε
```

For programmatic purposes, the scaling of the real part may not matter, so the following might be more useful

Figure K
```
   ln( A+(x,y,z)i ) = A/cos(angle/2) + angle * ( (x/axisSquare)/sin(angle/2),  (y/axisSquare)/sin(angle/2), (z/axisSquare)/sin(angle/2) ) ε
```

The real part, (The A) might instead be represted by a vector `(x,y,z)`, and also may not fully apply to the imaginary part(? Having only
recently discovered this, I leave that to minds brighter than mine).


Figure L
```
   exp( A+(x,y,z)ε ) = A * cos( (|x|+|y|+|z|)/2) 
                     + A * sin((|x|+|y|+|z|)/2) * ( (x/sqrt(x*x+y*y+z*z))/sin(angle/2)
                     + A * sin((|x|+|y|+|z|)/2) * ( (y/sqrt(x*x+y*y+z*z))/sin(angle/2)
                     + A * sin((|x|+|y|+|z|)/2) * ( (z/sqrt(x*x+y*y+z*z))/sin(angle/2)
```


Experimentally I was only interested in pure rotations, with 0 real part...  
The real part is just a scalar of elevetion from 1 to infinite and 1 to 0 at the same rate; it migt be considered an elevtation or offset,
but a motion inertia or velocity vector has nothing to do the axis of rotation, and neither do accelerations, so this must still be `apply()`ed
to the actual acceleration vector, since that vector is actually outside the current rotation.

Figure M
```
   exp( 0+(x,y,z)ε ) = cos( (|x|+|y|+|z|)/2) 
                     + sin((|x|+|y|+|z|)/2) * ( (x/sqrt(x*x+y*y+z*z))/sin(angle/2)
                     + sin((|x|+|y|+|z|)/2) * ( (y/sqrt(x*x+y*y+z*z))/sin(angle/2)
                     + sin((|x|+|y|+|z|)/2) * ( (z/sqrt(x*x+y*y+z*z))/sin(angle/2)
```


Operations like 'yaw', 'pitch' and 'roll' around the vectors defined by the frame require applying the curvature to `(1,0,0)`,`(0,1,0)`, and `(0,0,1)` to 
get the axis from an external perspctive, and then apply a rotation around that axis to the current spin.  These axles don't exist in the spin it itself,
but result by curving space, and finding the relative extrernal point.

### Conversion from Vector Complex to Quaternion

This should be specified as an implied rule.  Reasoning and proof of the following is not provided.

Figure N
```
   (x,y,z)i = xi + yj + zk;
```

### Generalized Parameterization of Log Complex

The exponetiation of a log complex number applies the same 'A' scalar to the real and imaginary components, instead this could be split
to specify two differnt constants for the real and imaginary components.

Figure O
```
 (ln(A1), ln(A2)) + (x,y,z)ε
```

which, on exponentiation can be (figure P)

Figure P
```
  theta = |x|+|y|+|z|;
  sqNorm = sqrt( x*x + y*y + z*z );
  exp(ln(A1))*cos(theta/2) + exp(ln(A2)) * sin(theta/2) * ( x/sqNorm, y/sqNorm, z/sqNorm )i
```

which (should) give more an an elliptical projection from log-complex space given 5 dimensions (Figure Q).

Recovering the separate `A1`, and `A2` values from a complex number is improbable, since it would look like a change in the angle computed by the tangent;
also probably starts as a divide by 2 to each side (so the sum of the logs is the numbers multiplied).


Figure Q
```
 ( R, X, Y, Z ) -> (x,y,z,angle,offset) 
        describes 3 dimensional axis, rotation around that axis, 
        offset of the rotation from 1 around that axis... 
        (which looks like 5 degrees of freedom from 4 numbers)

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

## lnA x lnB - The Cross Product of Natural Log Vector Complex Numbers

[Extended commentary](Twister.md)


This a general purpose rotation of a rotation around some aribtrary axis by some angle theta.

Here, `ax`, `ay`, and `az` could be filled by any normalized unit axis, and `x`,`y`, and `z` specify the rotation being rotated around the axis.

```js
	as = sin( theta )
	ac = cos( theta )
	q = { qw: cos( |x|+|y|+|z| / 2 )
            , s : sin( |x|+|y|+|z| / 2 )
	    , nL : |x|+|y|+|z|
	    , nx : x / sqrt( x*x + y*y + z*z )
	    , ny : y / sqrt( x*x + y*y + z*z )
	    , nz : z / sqrt( x*x + y*y + z*z )
	    }

	AdotB = q.nx*ax + q.ny*ay + q.nz*az;        // dot product of axles
	angle = acos( q.qw*ac - q.s*as*( AdotB ) ); // really angle/2
	sAng = Math.sin(angle); // same as sqrt(xx+yy+zz)

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

		Clx = sAng * ( abs(Cx/sAng) + abs(Cy/sAng) + abs(Cz/sAng) );

		// angle angle angle
		x = Cx/Clx*angle;
		y = Cy/Clx*angle;
		z = Cz/Clx*angle;
	}
```

# Further Work to do

If the `B` part of a complex number can be a vector, then could `A` also be a unit vector with a scalar?  That would represent the linear velocity, and would be
included in the rotation?  Seems like the result would be perpendicular to reality.


## Footnotes

 1) Really sort of feels like we live in a 3D universe, time, with 0 degrees of freedom, spin with 3 degrees of freedom, but with a linear normal, and linear motion
with 3 degrees of freedom, but a square normal... (n^0,n^1,n^2).


## References

[Youtube Video - quaternion expoentiation mapping](https://www.youtube.com/watch?v=UHzAY5Q7ji0), This is actually sort of the inverse way of looking at and understanding log-quaternions. It doesn't
matter so much what the shape of the projection is, but what the source data projects into.

[(FPGA lnQuat adder)](http://www.acsel-lab.com/arithmetic/arith20/papers/ARITH20_Arnold.pdf), Implemented quaternion pose tracking as adders in FPGA Robotics controller.

['Practical Exponential Coordinates using Implicit Dual Quaternions'](http://www.neil.dantam.name/papers/dantam2018practical.pdf) (still not a log system)

[Pose consensus based on dual quaternion algebra with application to decentralized formation control of mobile manipulators (Log- dual-quaternion)](https://arxiv.org/pdf/1810.08871.pdf)

[kinatimatic control with dual quaternions (euler number)](https://reader.elsevier.com/reader/sd/pii/S0022247X12000327?token=C2A88F2FE30E44EC9A7E1439E715AFAE52DDAC7E05FCCB26B5353C6F6EFEE671588329FD76F673D41FAC945FD9B7CAF4)

[Scaling a quaternion to a power through exp() and log(); Example Java Code](https://math.stackexchange.com/questions/939229/unit-quaternion-to-a-scalar-power)


### Applications of Dual Numbers

[dual quaternions, proper euler and imgangary matrix multiplication](https://parasol.tamu.edu/wafr/wafr2018/ppr_files/WAFR_2018_paper_1.pdf); recommends calculation of separate things, since the position is mostly independant of the rotation, don't need to always track the projection AND inverse projection of the point.

[Math - Functions Of Dual Numbers](https://www.euclideanspace.com/maths/algebra/realNormedAlgebra/other/dualNumbers/functions/index.htm), only dual number exp, no ln.

[Meta-Complex Numbers](http://new.math.uiuc.edu/math198/MA198-2014/rgandre2/seminar.pdf), exp and ln; same old stuff, just a nice layout worth the credit.





