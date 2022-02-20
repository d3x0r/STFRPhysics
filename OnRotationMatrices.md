

So what does a matrix do?  

There is gimbal lock in a matrix....

I'm stealing the word 'kernel' and defining it as, the matrix part to the upper-left (the lowest dimensional components?  as in 3d as a d1, d2, d3)



1) a 2x2 matrix rotations x->y great (and skews)
2) a 3x3 matrix adds a rotation for x->z and y->z, and by Eulers Axis Theorum(?) this is a circle with a normal vector in the x-y plane,
which rotates around Z, and moves points from (x,y) to (x,y,z).

## 1x1?

  |  |
  |----|
  | x1  |
  
  
      y =  f(x)     = X1 x 

        f_inv(x) = -X1 x 


## 2x2

   But the matrix direction is bidirectional, taken on both sides...
     that is there's an apply that translates x-> x1 x2 and y to y1 y2   as in

   |  |  |
   |----|---|
   | x1 | y2 |
   | y1 | y3 |
   
but the inverse is also available as x from x1,y1  and y from x2,y2 
( So one way is translate from local to global the other way is global to local )

So then x2 scales x1 in the inerse direction (X2 f_inv(x)) and y1 scales x1 in the forward direction (X1 f(x)).

    
     (z?) = g(x,y) = y1*f_inv(x) + y2*f(x) + y3 * y

     (z?) = g_inv(x,y) = -( y2*f_inv(x) + y1*f(x)  + y3*y )


### 2x2 evolution from 1x1 (0 rotation) 

This has to add 1 angle, it's around a axis that doesn't exist in this space... but it's a propery perpendicular to the x-y plane.

It adds some of scaled X and inverse scaled X.

     a  vA
     iA b
     
     the 'y3' part ends up being what ever is leftover from the other, so we can maintain the proper proportions.

    An angle like 1/2  is     a cos(T)  - b *  sin(T), a sin(T) + b * cos(T)
                             ( x1 y1 - y2 y3, x1 y2 + y1 y3 )
 
	g(x,y) = x cos(T)  - y *  sin(T), x sin(T) + y * cos(T);


    f_inv(x with a) * y1 + f( x with a ) * y2 ) + y3 * x

     x1y2 - x1y1 

so `x1` is `R` in a complex number idea... 

?y3 is then what the Y coordinate input is really... and should be a 1 also? a and b don't have to have a relationship at this point.


## 3x3 

  So now when the additional two rows get added (bottom and right)
  
|  |  |  |
|---|----|---|
| x1 | y2 |z3 |
| y1 | y3 |z4 |
| z1 | z2 |z5 |

  then the value pair in (z3,z4) applys as a scalar to the original core's 'apply' direction
  then the pair (z1,z2) applys to the core the inverse application part
  z5 is how much z is modified as a scalar; 
  
  But then the modification to the Z axis is now the remaining part that wasn't applied to the original kernel.
  
  So then there's a inital x-y rotation, and a target x-y rotation at z=1, which is arrived at by scaling with the z verse and inverse scalars.


     (z?) = h(x,y,z) = (z1,z2)*g_inv(x,y) + (y3,y4)*g(x,y)    + z5 * z

  
  
   in the 3d case, the opposing z1,z3, z2,z4 are the direction vector in the xy plane, and are then a circle around to the z axis.



### 3x3 evolution from 2x2 (1 rotation) 

So this is reasonable to pretend that we don't have a 3rd real dimension, and assume it's just a 'thing'; can show slices of planes or something; but.

This adds a ratio of 2 coodinates which rotate the `x` and `y` axis toward the 'z' (new) axis.  There's a circular sort of 
limit between these two values as if they were within a `x+yi` complex number that is constrained to be a unit vector. 

Maybe it's just abstractly `sqrt(xdel + ydel + z5 z5) = 1`  (which is what the third row in a rotation matrix would be...) but then (wx_del,wy_del,wz_del) added in 4x4 rotation plus ww_del = 1.


The z1,z2 values and z3,z4 values have to come from somewhere, and or have some related meaning to them... 

In the matrix representation, what the final rotation can be for the resulting rotation using x-y is limited to scaling/rotating the x-y rotation in the first place.  It's that rotation
forward and inverse versions scaled by the other factors... (by the z1,z2,z3,z4) and z5's modification of any new Z value.

... ( to be expanded)

A and B and C  which is (B-A)dz ; A is the start, B is the target, C is a delta over Z that A-B is changed.

so with A and (B-A)/dz can scale as in y = mx+b   y = (b-a/dx) x + A

but then I get delta-Xz(which looks like it's around the Y axis) and delta-Yz(which looks like it's along the X axis) 

and now Z is an axis we can see/use the original delta-Xy still exists.

the total delta-(Yz,Xz,Xy); is 1(2pi) max and are all identity to start.... or rather iterating from 0 to this 1 gives all of the stages along that... 





  
## 4x4  
  
  So now when the additional two rows get added (bottom and right)
  
  |  |  |  |  |
  |---|----|---|---|
  | x1 | y2 |z3 | t4 |
  | y1 | y3 |z4 | t5 |
  | z1 | z2 |z5 | t6 |
  | t1 | t2 | t3 | t7 |
  
  similarly now we have a 3d rotation coordinate kernel, which is scaled with the verse and inverse component of the 't' vector, 
  
  (t4,t5,t6) applies to scale the x,y,z rotation/skew matrix  'apply' side
  
  (t1,t2,t3) applies to scale the x,y,z rotation/skew matrix 'inverse apply' side.
  
  which scales between two rotation kernels along t, again with a scalar (t7) of how to much T to keep 
  

      i(x,y,z,t) = (t2,t2,t3)*h_inv(x,y,z) + (t4,t5,t6)*h(x,y,z)    + t7 * t
      i_inv(x,y,z,t) = - t2,t2,t3)*h(x,y,z) - (t4,t5,t6)*h_inv(x,y,z)    - t7 * t


  So in this case, some things that T could be... in OpenGL it's a flat scalar of the forward direction and nothing invesed.  (x,y,z) (0,0,0)...
  

   So a rotation around T properly rotates the space around it.   The space is defined itself as a 3x3 rotation kernel that transforms to another 3x3 kernel using the (t1,t2,t3) and (t4,t5,t6) components as + and -.
   
   In theory any 3x3 core/kernel matrix can be transformed to any other 3x3 matrix... And primarily, is dependant on the original axis of rotation, if the axis of rotation changes radically (rather than just applying a simple twist)
then there are 'gimbal lock' matrix issues (where zeros can never become non-zero).

## Hypercube

So the classic hyperube is a cube, with lines connecting the vertices of that cube to an identical cube, and translated away.

The initial 3x3 core matrix can describe the direction/basis-frame, while another 3x3 matrix would describe the second cube's orientation in its own x/y/z frame (yes vectors could be skewed and result with non-orthogonal projections).
Then the t1-t3 and t4-t6 scalars express the change form the first to the second, in terms of the basis-frame's forward and inverse (functions? applications? transformations?).   

But generally - a cube in position/orientation A and a cube in B, that share the same origin in space (though with other application of +/- they could be translated from each other) have a single smooth translation between them...
(unless you intertroduce some time variant factor, which depending if it's +/- some amount of time is a different result); But really that transform will still be represented with another 3 vector that's the rotation of the rotation.


## 5-Hypercube

and then we add another axis to the hypercube, and have 4 corners that have 4 orientations of the 3 space within it (that part is still always there, and it doesn't change or go away or really become anything else).

add another and have a cube of hypercubes, then in 3 variation spaces, you have 8 different 3 space orientations that you're scaling between.

## Oh Linear Algebra 


https://github.com/d3x0r/SACK/blob/master/src/imglib/assembly_reference/lineasm.asm

https://github.com/d3x0r/SACK/blob/master/src/imglib/line.c#L44

Linear scalars, which can be applied in multiple directions and dimensions for linear tranformations...

Since the matrix is really just a multi-linear scalar is the relationship, that really the transform from A to B of the 3x3 matrix within the 4x4 is like a y=mx+b but more like y = ax-bx+c.

Which makes it very [Lagrangian](https://en.wikipedia.org/wiki/Lagrangian_mechanics) actually  where you have a something added and somthing taken away to equal 0 instead of a 0.


---

## More Work

It's sort of self-modifing;... so then

a cross product of axb

is 

```
(ab sin theta)
(x,y) x (a,b) = (axby-bxay)

(if a&b are unit, just sin(theta) )
```


| | |
|---|----|
| 0            |-(axby-bxay)/2  |
| (axby-bxay)/2|            0   |

| | |
|---|----|
| 0            |-sin(theta)/2  |
| (sin theta)/2|            0  |



xy
yz
xz

| | | |
|---|----|---|
| 0             | -(axby-bxay)/2  |   -(axbz-bxaz)/2  |
| (axby-byax)/2 |    0            |   -(aybz-byaz)/2  |
| (axbz-bxaz)/2 | (aybz-byaz)/2   | 0                 |


| | | | |                  
|---|----|---|---|
| 0             | -(axby-bxay)/2 |    -(axbz-bxaz)/2 | -(axbw-bxaw)/2      |
| (axby-byax)/2 |    0           |    -(aybz-byaz)/2 | -(aybw-byaw)/2      |
| (axbz-bxaz)/2 | (aybz-byaz)/2  |    0              |    -(azbw-bzaw)/2   |
| (axbw-bxaw)/2 |  (aybw-byaw)/2 |   (azbw-bzaw)/2   |        0            |



``` js
	/*
	https://stackoverflow.com/a/12472591/4619267
	x = (R21 - R12)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
	y = (R02 - R20)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
	z = (R10 - R01)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
	*/	
        // this is the direction normal... the axis of rotation
	const yz = basis.up     .z - basis.forward.y;
	const xz = basis.forward.x - basis.right  .z;
	const xy = basis.right  .y - basis.up     .x;
	const tmp = 1 /Math.sqrt(yz*yz + xz*xz + xy*xy );

// and it would seem to follow....

	const wx = basis.in   .x - basis.right.w;
	const wy = basis.in   .y - basis.up     .w;
	const wz = basis.in   .z - basis.forward.w;
	const tmp = 1 /Math.sqrt(yz*yz + xz*xz + xy*xy );

```

