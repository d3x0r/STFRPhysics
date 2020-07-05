
## What ARE Log Quaternions.

Log Quaternions represent curvature; they have values that are the curve around the x, y and z axels, which lie in the same direction as x, y, and z cartesian axises.
The range is `0-2pi` for one complete cycle of rotation; this is the arc length of a rotation that in 1 'tick' completes a full cycle.  This is equivalent to the angle of rotation.
In either interpretation the sign of the value indicates clockwise or counterclockwise rotation.

For some unit vector in the x/y/z axis domain, the curvature applies x y and z rotations simultaneously, without a prefered order.
They are converted, essentially, using a `exp()` operator on the log quaternion to get it back to natural space.  This involves computing the axis of rotation, and angle of rotation,
computing the sine and cosine of that angle divided by 2, and building a quaternion.  The sin of the angle determines the full cycle of rotation relevance... from `0` which is no rotation 
until pi (original value would have been pi*2), where sine is `0` again, and there is no rotation, is essentially the operation.  The cos part determines the part of the point's original
value to use, and the rotation matrix scaled by the sine part rotates it depending on the angle around the axel of rotation.

The three independant curvatures can always resolve into a single axis of rotation (other when there is 0 rotation), in which case any operations can just return the original values of things
and skip any computations that might overflow.

The shortest arc around a sphere to a point on that sphere is a great circle through the basis point chosen, with the bivector plane... okay this will make more sense from a steady basis...

If we define the 'north' pole or 'up' to be the Y direction; (as you are looking this page, Y negative is toward the bottom of the text and Y positive is towards the top.  Your head is 'up'.
That point, taken as a base to apply a curve, will result as a 'normal' indicating what the new 'up' direction will be under the specified curvature.
(also, because the chosen `up` not the origin, curvature applied to space will result in another location in that x/y/z space; which implies any non 0 point can be designated as 'up').

Back to assuming 'up' is a vector `0,1,0`, the shortest point from there to any other point on the sphere is a great circle passing through that point; this can be done by setting the axis
of that circle, or the curvature around that axel to 0 (or a k * 2pi).  then setting the other axel's curavture to `(arccos(normalized-y)*sin(angle),arccos(normalized-y)*cos(angle))` where `angle` is equivalent to the angle of rotation 
of that circle passing through the pole at the point of the pole, and the normalized-Y sets the angle around the circle.  
This sets the 'up' position for any given x/y/z normal input based against (the magnatude of the curvature is y normalized to 0-1); however, since the path is direct, there is no rotation
determined for arriving at that point, and based on the angles, the basis frame will point in a seemingly random direction for the tangent and bivector; for any given normal on the circle, 
there is a series of curvatures that lie in a 'plane' of their rotation space, and that is semi-circular around the normal of that plane.

## Twisting Curvature.

Where last we left, we had a normal, but 'indeterminent' tangent; one way to fix this is to get the basis at tick 1, keep the 'up', and rotate the 'forward' and 'right' vectors,
then reset the log-quaternion to that basis.  This operation loses information about the actual curvature.

It is possible to also spin the point around the normal, again, getting the basis, rotating 'forward'->'right' by the specified angle and setting the log-quaternion from the resulting matrix;
this only resolves to 1/2 of the curve possible; for develpoment and testing purposes I keep an internal counter that steps whether to return 0, +2pi, -2pi, etc.  This, with enough steps,
allows the complete cyles to be shown; what I previously though were circles are only sometimes circle-ish; however, by twisting a point around a normal, I have found there is a continuous
path ([see Bertrand Curves](https://www.sciencedirect.com/science/article/pii/S0393044012000940#:~:text=A%20curve%20%CE%B1%20immersed%20in,Bertrand%20curves%20in%20S%203%20.) [wikipedia](https://en.wikipedia.org/wiki/Differentiable_curve#Bertrand_curve)) 
which contains other curvature vectors which have the same normal, but different rotation around that normal; although the study has previously been against helical fields which have a translation
asscicated with the curve too.

This curve is produced by having the normalized axis of rotation, and the total angle of rotation multiplied together.

```
// for some curvature vector x,y,z (log-quat)

squareNormal = sqrt( x*x+y*y+z*z ); 
totalAngle = |x|+|y|+|z|; 

axisOfRotation = ( x/squareNormal, y/squareNormal, z/squareNormal )

normalOfRotation = axisOfRotation * totalAngle;

```

This normal of rotation, follows a path that is similar to the iso-linear fields of magnetic field strength through a solenoid coil, where the
current x/y/z curvature changes the length and radius of the coil.

### squashed

https://pasteboard.co/Jg8iMys.png  This one shows the 'squashed' field state, where the solenoid is 'tall' and narrow....  There is a large circle shown on most of these
that is a circle i did just by curvature (no rotation), and was a good approximation, but none of the curves actually turned out to be real circles.


### early attempt at circle

https://pasteboard.co/Jg7M6hKx.png

### circles 1 and 2

https://pasteboard.co/Jfrl8gq.png  Near circular rotation path.. (shows full arc)

https://pasteboard.co/Jg7FsIo.png (also kind of circular, the linear lines are x,y,z curvature directly)

# sketch trying to narrow down the path to success

https://pasteboard.co/Jfrl8gq.png


