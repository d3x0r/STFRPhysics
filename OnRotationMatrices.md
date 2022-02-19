

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

  - But the matrix direction is bidirectional, taken on both sides...
     that is there's an apply that translates x-> x1 x2 and y to y1 y2   as in
     
        |  |  |
        |----|---|
        | x1 | y2 |
        | y1 | y3 |
        
     but the inverse is also available as x from x1,y1  and y from x2,y2 
     ( So one way is translate from local to global the other way is global to local )
     
     So then x2 scales x1 in the inerse direction (X2 f_inv(x)) and y1 scales x1 in the forward direction (X1 f(x)).
     
    
     (z?) = g(x,y) = y1*f_inv(x) + y2*f(x) + y3 * y
     
     (z?) = g_inv(x,y) = y2*f_inv(x) + y1*f(x)  - y3*y
     
## 3x3 

  So now when the additional two rows get added (bottom and right)
        |  |  |  |
        |---|----|---|
        | x1 | y1 |z3 |
        | x2 | y2 |z4 |
        | z1 | z2 |z5 |

  then the value pair in (z3,z4) applys as a scalar to the original core's 'apply' direction
  then the pair (z1,z2) applys to the core the inverse application part
  z5 is how much z is modified as a scalar; 
  
  But then the modification to the Z axis is now the remaining part that wasn't applied to the original kernel.
  
  So then there's a inital x-y rotation, and a target x-y rotation at z=1, which is arrived at by scaling with the z verse and inverse scalars.


     (z?) = h(x,y,z) = (z1,z2)*g_inv(x,y) + (y3,y4)*g(x,y)    + z5 * z

  
  
## 4x4  
  
  So now when the additional two rows get added (bottom and right)
        |  |  |  |  |
        |---|----|---|---|
        | x1 | y1 |z3 | t4 |
        | x2 | y2 |z4 | t5 |
        | z1 | z2 |z5 | t6 |
        | t1 | t2 | t3 | t7 |
  
  similarly now we have a 3d rotation coordinate kernel, which is scaled with the verse and inverse component of the 't' vector, 
  
  (t4,t5,t6) applies to scale the x,y,z rotation/skew matrix  'apply' side
  (t1,t2,t3) applies to scale the x,y,z rotation/skew matrix 'inverse apply' side.
  
  which scales between two rotation kernels along t, again with a scalar (t7) of how to much T to keep 
  

      i(x,y,z,t) = (t2,t2,t3)*h_inv(x,y,z) + (t4,t5,t6)*h(x,y,z)    + t7 * t



