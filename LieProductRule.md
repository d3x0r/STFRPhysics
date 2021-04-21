
Elements of so(3) are a matrix formed from an associated axis-angle vector.

from https://en.wikipedia.org/wiki/3D_rotation_group#Exponential_map
"A ∈ 𝖘𝖔(3) is associated with a vector ω = θ u, where u = (x,y,z) is a unit magnitude vector."

Which is a surjective mapping from axis-angle to elements of so(3).

An equivalent representation of axis-angle is axis * angle: `ω = θ u`.

Axis-angle and [Euler Vector](https://en.wikipedia.org/wiki/Axis%E2%80%93angle_representation) are equivalent parameterizations for elements of so(3); but elements of so(3) cannot be reversed to their axis-angle.

If the `A` and `B` terms for `e^(A+B)` are in Euler Vector format, then `e^(A+B) = e^(C)` where C is the componentwise addition of A and B vectors.

This is verifiable by using the Lie Product Formula for the expression `e^(x+y+z)` where `x`, `y`, and `z` are rotations around the X Y and Z axii; since they are mutually orthagonal, many of the terms evaporate, when you're left with an expression that converts Euler Vector to an exponentiated expression of it.

Since within the expression `(x+y+z)` these are all just vectors, they can themselves just be added as in a vector space; that is if instead they represented axii which have two `0` values fo each term, a rotation is applied to each of these vectors, the resulting sum will be (?congruent) since rotation doesn't change any distances or relative relationships.

## Surjective mapping

The [Euler Vectors](https://en.wikipedia.org/wiki/Axis%E2%80%93angle_representation#Rotation_vector) `(pi/2,0,0)` and `(-3pi/2,0,0)` result in the same so(3) matrix.  The same vectors, in axis-angle form would be `pi/2 * ( 1,0,0 )` and `3pi/2 * ( -1,0,0 )`.  

```
   s  = sin( pi/2  / 2 ) = sqrt(2)/2
   c  = cos( pi/2  / 2 ) = sqrt(2)/2
   s  = sin( 3pi/2 / 2 ) = sqrt(2)/2
   c  = cos( 3pi/2 / 2 ) = -sqrt(2)/2

   ss = sin( pi/2 / 2 )*sin( pi/2 / 2 ) = 1/2
   c*s*x  [pi/2]  =  1/2 (*1)    = 1/2
   c*s*x  [3pi/2] = -1/2 ( *-1)  = 1/2
 
  | 2*(xx-1)*ss+1                              |
  |            2*(yy-1)*ss+1    x*c*s          |
  |            x*c*s            2*(zz-1)*ss+1  |


   | 1 0                   0                   |
   | 0 2*(-1)*sin*sin + 1  0                   |
   | 0 0                   2*(-1)*sin*sin + 1  |

   | 1 0          0        |
   | 0 1 - 1/2    1/2      |
   | 0 1/2        1 - 1/2  |
```

Performing a vector addition using one of two values cannot result in a valid outcome; there is a large difference between the following expressions.

```
   (a,b,c) + (pi/2,0,0)   != (a,b,c) + (3pi/2,0,0)
```

Therefore, this rule only applies if you truly know the axis-angle components of a paramter in so(3).

## Why Does this matter?

The direction you approach `(a,b,c)` matters, because on one of the coordinates you're approaching from (the bottom?), while on the opposing side it's approaching from the top.

The direction of the change is not the same between `(a,b,c)` and `(a',b',c')`... This probably needs more elaboration. 

