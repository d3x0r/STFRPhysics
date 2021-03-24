
# Euler Axis System

from https://en.wikipedia.org/wiki/Euler%27s_rotation_theorem

```
  The theorem is named after Leonhard Euler, who proved it in 1775 by means of spherical geometry. 
  The axis of rotation is known as an Euler axis, typically represented by a unit vector ê (e hat). Its 
  product by the rotation angle is known as an axis-angle vector. The extension of the theorem 
  to kinematics yields the concept of instant axis of rotation, a line of fixed points.
```


## Rotating a Rotation(A RRF B)

The Rodrigues Rotation Forumla may be used with axis-angle representation to compose multiple rotations, 
and result with axis and angle.

https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Rodrigues_vector
https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation#The_composition_of_spatial_rotations

```
	given input axii A and B and angles a and b respectively...
	the following rotates A around B.


  A` = cos(a/2) + sin(a/2)A
  B` = cos(b/2) + sin(b/2)B
  
  result Angle = cos^-1 ( cos(b/2)cos(a/2)-sin(b/2)sin(a/2) ( A ∙ B ) ) * 2
  
  tmp_axis = sin(b/2)cos(b/2)B + sin(a/2)cos(b/2)A + sin(a/2)sin(b/2)( A × B )
  result_axis = tmp_axis / ||tmp_axis||
  
  
  - or -


  result Angle = cos^-1 ( 1/2 ((1 - A ∙ B) cos(a/2 - b/2) + (1 + A ∙ B) cos(a/2 + b/2)) ) * 2
  
  tmp_axis = 1/2 ( 
         (-sin((a - b)/2) + sin((a + b)/2)) B 
       + ( sin((a - b)/2) + sin((a + b)/2)) A 
       + ( cos((a - b)/2) - cos((a + b)/2))( A × B ) )
  
  result_axis = tmp_axis / ||tmp_axis||
  
``

## Rotating a vector (V RV Q)

The Rodrigues Rotation formula may also be used to apply a point, and result with a rotated point.


```
   Given input axis A with angle a, and a point V to rotate.
   
   V` = V + cos(a)( 2* A * sin(a) × V ) + A * sin(a) × V 

     - or - 
	
   V` = cos(a)*V  +  sin(a) * A × V  + (1-cos(a))(A ∙ V ) * A
```

## Integrating a Rotation

Given an orientation Q, which is the initial position, and a known axis-angle (P) to update the position.
Rotate the axis-angle of rotation into the frame of Q, and then rotate Q by the updated position times
a scalar(T) of 0 to 1.

```
   P` = P RV Q         ; rotate the direction of P into frame Q; also ||P|| = ||P`||.
   
   R  = Q RRF (P` * T) ; result Q rotated by P` scaled from 0 to 1.  
   
    - or -
	
   R = P RRF Q         ; rotate the frame P into Q-1
                       ;  (is this also PT RRF Q)?
```	


## Rotating between two arbitrary Frames (SLERP proper)

Rotation between to arbitrary frames may be done by projecting the target to a relative frame to the start, 
and then rotating the resulting axis, and applying the resulting
axis-angle to the starting frame.

```
  given Q as an initial frame, P as the target frame, and T as a value from 0 to 1.

   P`  = P RRF Q-1       ; multiply Q angle by -1 to rotate P to relative to Q
   
   P`` = P` RV Q         ; rotate the direction of P` into frame Q; also ||P`|| = ||P``||
   
   R   = Q RRF (P`` * T) ; result Q rotated by P`` scaled from 0 to 1.
```

