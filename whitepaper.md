
Hm. what do I want it to show...
I want 
  - to present this new system of observing curvatures/rotations.
    - the new system is less calculation and has greater accuracy than existing systems.
    - THere was a paper about using log-quaternions in long IK chains, and the superior solve time was shown.
    - It has been applied for updating skinning on models, but had some corner cases that were not handled correctly; this provides a correction for that. (Again more FPS, less work)

  - How this can be applied in places like differential geometry; rather than the Frenet frame; and complex analysis.

  - I want to clearly show what path needs to be filled in next
    - There is a curvature for the twist of a point at any given sphere... I just don't have specifically what that is.


---

##Complex Numbers and Their Natural Log

Complex numbers of the form `A+Bi`, have a natural log, a generic log-complex will be called `lnC`.

To get a log-complex from a complex number...

Normalize the real an imaginary components.
```
    normAB = sgn(A) * sqrt(A*A+B*B)
```

Get the angle of rotation
```
    angle = arcsin(B/normAB);   // -pi -> pi
```

And the resulting log-complex is
```
    ln(A+Bi) = ln(normAB) + angle*2 * ln(i)

```

The ln(i) is π/2.  This is just a scalar, but this scalar is builtin to the standard arcsin/arccos functions, 
which return `-π to π`, instead of '-2 to 2';  `-2 * π/2 = -π`  and `2 * π/2 = π`. Again, 
the resulting radians from sin/cos and their related arcsin/arccos functions include the `π/2` multiplication from `ln(i)`.
However, this second part doesn't collapse and become a real, but instead remains as a dual number with a place holder 'ε'.


```
	ln(A+Bi) = ln(normAB) + angle*2 * ε

```

However, this doesn't become just another 'real' number, but still needs 

Exponent of a log complex...

```
  exp( A+Bε ) = exp(A) * cos( |B|/2 ) + exp(A) * B/sqrt(B*B) * sin( |B|/2 )i
```

Because B has a single dimension, this looks like it's equivalent to... so if this 
was assumed as the conversion, all of this would work for a single dimensional vector as B.


```
  exp( A+Bε ) = exp(A) * cos(B/2) + exp(A) * sin(B/2)i
```

##Log Quaternion to Quaternion conversion

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
  exp( 0+(x,y,z)ε ) = 1 * cos( (|x|+|y|/|z|)/2 ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) * 1 * sin( |x|+|y|+|z| /2) i


  exp( A+(x,y,z)ε ) = cos( (|x|+|y|/|z|)/2 ) 
                    + ( x/sqrt(x*x+y*y+z*z) 
                      , y/sqrt(x*x+y*y+z*z)
                      , z/sqrt(x*x+y*y+z*z)
                      ) sin( |x|+|y|+|z| /2) i

```

Which resembles the classic `cos(θ/2) + sin(θ/2) * xi + sin(θ/2) * yi + sin(θ/2) * zi`  where x,y,z are a normalized axis of rotation.


