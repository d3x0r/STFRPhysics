
# Development of Relativistic Rotations

<TBD>

d3ck0r@gmail.com

Independant Studies, Internet(mostly english)

## Abstract


Rotations are quite linear, and can, in many cases, be simply added and subtracted; there are as
many times however when a rotation is rotated around an axle external to the frame the rotation is
in.  This was (discovered) as a desire to remain in a truly linear rotation space.  Having discovered
Hamiltonians first, it seems the underlaying additive properties of `ln(Q1)+ln(Q2) ~~ Q1*Q2` (where `~~`
represents 'is effectively'), have been neglected.


## Introduction

For complex numbers, the `ln(i)` is `π/2`.  This is just a scalar, but this scalar is builtin to the standard arcsin/arccos functions, 
which return `-π to π`, instead of `-2 to 2`;  `-2 * π/2 = -π`  and `2 * π/2 = π`. Again, 
the resulting radians from sin/cos and their related arcsin/arccos functions include the `π/2` multiplication from `ln(i)`.
However, this second part doesn't collapse and become a real, but instead remains as a dual number with a place holder `ε`, and, again, the 
`π/2` is builtin to the current defintions of sin/cos/arcsin/arccos, so `ln(i)=ε` will be used.

So the two forms are represented like this.

```
   ln(A+Bi)   = a+bε
   exp(a+bε)  = A+Bi
```

### Glossary

- apply() - in math this is multiply a vector by a matrix or matrix by matrix, or quaternion times quaternion.  Addition is simple
    in many cases, so, although true that `A X -B = exp(ln(A)-ln(B))` this only works for rotations within the same frame, or fixed to
    another frame.  Rotation of a rotation by rotation outside of the rotation itself is still a form of multiplication, but this is 
    called `apply()` instead.
- axle - an axis of curvature.
- curvature - a point translated to another location by curving its forward motion; does not require a third point.
- frame - the orientation, which can be desribed by the basis vectors 'right', 'up', and 'forward'; A full frame would include velocity also.
- rotation - a point translated to another location referencing a third point.
- spin - basically 'rotation', however, it's not apply by an angle, as rotation, but measured in a curvature.


---

## Complex Numbers and Their Natural Log

Complex numbers of the form `A+Bi`, have a natural log, a generic log-complex will be called `lnC`.

To get a log-complex from a complex number...

Normalize the real an imaginary components, and get the angle of rotation

```
    ln(A+Bi) = ln( sgn(A) * sqrt(A*A+B*B) ) + arcsin(B/sgn(A) * sqrt(A*A+B*B))*2 * ln(i) * ε

```

Exponent of a log complex...

```
    exp( A+Bε ) = exp(A) * cos( |B|/2 ) + exp(A) * B/sqrt(B*B) * sin( |B|/2 )i
```

Because `cos(x)=cos(-x)` the absolute value in the `cos()` expression is unneeded.
Because `B/sqrt(B*B)` keeps the sign, the sign lost in the `sin(|B|/2)` is restored, so the abosolute value isn't needed there either.
And, because B has a single dimension, this looks like it's equivalent to... 

```
    exp( A+Bε ) = exp(A) * cos(B/2) + exp(A) * sin(B/2)i
```

This is exactly (the only) form of this equation known; the previous version with absolute values is never
presented.


Note, for programmatic purposes, unless you are actually adding relative radiuses also, the real part can
be kept unscaled.

```
    exp( A+Bε ) = A * cos(B/2) + A * sin(B/2)i
```


## Log Quaternion to Quaternion conversion

The sum of the curvatures is the total rotation of the system, or is the angle around the axle to curve all
other spacial points by.  `|X|+|Y|+|Z|` is the total rotation.  The axis of rotation is the same coordinates
normalized by their square normal `sqrt(X*X+Y*Y+Z*Z)`.  

Using the same method for `exp(lnC)`

```
  exp( A+Bε ) = exp(A) * cos(|B|)/2) + exp(A) * B/sqrt(B*B) * sin( (B/|B|) /2)i
```

But instead treating B as a vector...

```
  exp( A+(x,y,z)ε ) = exp(A) * cos( (|x|+|y|/|z|)/2 ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) * exp(A) * sin( |x|+|y|+|z| /2) i
```


If the log-quaternion has a 0 real part, then since `exp(0)=1`, every nil log-quaternion is a valid unit quaternion.

```
  exp( 0 + (x,y,z)ε ) = 1 * cos( (|x|+|y|/|z|)/2 ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) * 1 * sin( |x|+|y|+|z| /2) i


  exp( 0 + (x,y,z)ε ) = cos( (|x|+|y|/|z|)/2 ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) sin( |x|+|y|+|z| /2) i

```

Which resembles the axis-angle conversion to quaternion `cos(θ/2) + sin(θ/2) * xi + sin(θ/2) * yi + sin(θ/2) * zi`  where `x,y,z` are a normalized axis of rotation, 
and `θ` is the angle of rotation around that axle.


## Quaternion to Log Quatnerion

```
   ...
```

Compute the normal
```
   axisSquare = sqrt(x*x+y*y+z*z)   // square the axis
   normAB = sqrt( A + axisSquare ); // square the real and axis parts (results in cos(theta/2)+sin(theta/2)...)

   angle = acos(A/normAB)*2
```

And finally build the log-quaternion...
```
   ln( A+(x,y,z)i ) = ln(normAB) + angle * ( (x/axisSquare)/sin(angle/2),  (y/axisSquare)/sin(angle/2), (z/axisSquare)/sin(angle/2) ) ε
```

For programmatic purposes, the scaling of the real part may not matter, so the following might be more useful

```
   ln( A+(x,y,z)i ) = A/cos(angle/2) + angle * ( (x/axisSquare)/sin(angle/2),  (y/axisSquare)/sin(angle/2), (z/axisSquare)/sin(angle/2) ) ε
```

The real part, (The A) might instead be represted by a vector `(x,y,z)`, and also may not fully apply to the imaginary part(? Having only
recently discovered this, I leave that to minds brighter than mine).


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

```
   exp( 0+(x,y,z)ε ) = cos( (|x|+|y|+|z|)/2) 
                     + sin((|x|+|y|+|z|)/2) * ( (x/sqrt(x*x+y*y+z*z))/sin(angle/2)
                     + sin((|x|+|y|+|z|)/2) * ( (y/sqrt(x*x+y*y+z*z))/sin(angle/2)
                     + sin((|x|+|y|+|z|)/2) * ( (z/sqrt(x*x+y*y+z*z))/sin(angle/2)
```


Operations like 'yaw', 'pitch' and 'roll' around the vectors defined by the frame require applying the curvature to `(1,0,0)`,`(0,1,0)`, and `(0,0,1)` to 
get the axis from an external perspctive, and then apply a rotation around that axis to the current spin.  These axles don't exist in the spin it itself,
but result by curving space, and finding the relative extrernal point.

## Conversion from Vector Complex to Quaternion

This should be specified as an implied rule.  Reasoning and proof of the following is not provided.

```
   (x,y,z)i = xi + yj + zk;
```

## Generalized Parameterization of Log Complex

```
 (ln(A1), ln(A2)) + (x,y,z)i )
```

which, on exponentiation can be

```
  theta = |x|+|y|+|z|;
  sqNorm = sqrt( x*x + y*y + z*z );

   exp(ln(A1))*cos(theta/2) , exp(ln(A2)) * sin(theta/2) * ( x/sqNorm, y/sqNorm, z/sqNorm ) )
```

which gives more an an elliptical projection from log-complex space given 5 dimensions...

Recovering the seprate `A1`, and `A2` values from a complex number is improbable... probably starts as a divide by 2 to each side (so the sum of the logs is the numbers multiplied)

```
 ( R, X, Y, Z ) -> (x,y,z,angle,offset) 
        describes 3 dimensional axis, rotation around that axis, 
        offset of the rotation from 1 around that axis... 
        (which looks like 5 degrees of freedom from 4 numbers)

 ( R1, R2, X, Y, Z ) -> (x,y,z,angle, offset, alpha_blend of rotation/offset?) 

 // These can be scaled the same way the x/y/z are, and find another degree of freedom in their total
 //   
 len = |R1|+|R2| = R total
 R1Rel = R1/sqrt(R1+R2)
 R2Rel = R2/sqrt(R1+R2) 
 R1Lin = R1/len
 R2Lin = R2/len 

   ( exp(R1)*cos(theta/2) , exp(R2) * sin(theta/2) * ( x/sqNorm, y/sqNorm, z/sqNorm ) )


```

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





