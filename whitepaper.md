
# Discovery of additive rotations

Rotations are quite linear, and can, in many cases, be simply added and subtracted, especially when comparing
the orientations of two free objects in the same frame; there are as
many times however when a rotation is spun around an axle external to the frame the rotation is
in.

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



## Glossary

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


---

working notes...

Hm. what do I want it to show...
I want 
  - to present this new system of observing curvatures/rotations.
    - the new system is less calculation and has greater accuracy than existing systems.
    - THere was a paper about using log-quaternions in long IK chains, and the superior solve time was shown.
    - It has been applied for updating skinning on models, but had some corner cases that were not handled correctly; this provides a correction for that. (Again more FPS, less work)

  - How this can be applied in places like differential geometry; rather than the Frenet frame; and complex analysis.

  - I want to clearly show what path needs to be filled in next
    - There is a curvature for the twist of a point at any given sphere... I just don't have specifically what that is.


