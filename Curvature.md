# Curvature and Rotations

An angle of a rotation, and the length of the arc on a unit circle (arc-length) are equivalent numerically; and can be converted in a direct 1 to 1 relationship.
A curvature is a change in arc.  Principle curvature values define the change in a single unit time;  ds/dt.  This is the total angle, or arc length around the circle covered.
For some fractional amount of time ( `0.01` for instance ) the angle/arc-length is scaled directly according to the time.

## This Project

The test apparatus/framework is fairly complex at first glance; but really, this project is just 1 source file 'dual-quat.js' and the test... '3d/src/lnQuatTest.js' or 'math/main.js'.

https://github.com/d3x0r/STFRPhysics/blob/master/3d/src/dual-quat.js   - where the real work is done

https://github.com/d3x0r/STFRPhysics/blob/master/3d/src/lnQuatTest.js   - displaying the results of the internals...
 
There is a older test project in 'src/dual-quat.js' and a 'src/index.html' sort of project; some of the comments there have historical signficance.

## why? How?

Why ?

This started looking at quaternions as rotation vectors, and attempting to find a computation method of rotations which required less work and worked over longer ranges.
Matrix multiplication for rotation can only express 1/2 of a rotation, it can go from -1 to 1 but 1 to -1 looks exactly like -1 to 1... so you never get the other half of the rotation.
Quaternion representation has singulatities at 0 rotation; the axis of rotation becomes unintelligable on (finite math systems). (References can be provided to existing information 
to review; see Readme.md References title... )

There is an operation that goes from a log-quaternion to a quaternion; Although the math on wikipedia page ends at merely stating this fact.  
`Exponential, logarithm, and power functions` on https://en.wikipedia.org/wiki/Quaternion 
This gives me a method to take axis-angle representation and convert to quaternion; which is fairly cheap, and then I can always have the normal
axis of rotation regardless of a insignificant angle... resulting in a 'high quality' small-rotation quaternion.

`Q(angle,axis) = cos(angle) * 1 + sin(angle) * ( unit vector/ vector length=1)`

Which follows that `1*cos + 1*sin` are also remeniscent of a unit circle in complex plane.

Log quaternions, quatnerions in the log-space, have 3 `angle`; However, these are more properly arcs over time.  The sum of the angles of a rotation is the sum of the angles.
And the total sum of the system angles is the total angle of rotation of the system; this is a linear length `linLen = |x| + |y| + |z|` 
and the normalizing is `x/linLen, y/linLen, z/linLen` to get the total (or average /mean curvature).

 https://en.wikipedia.org/wiki/Curvature
 https://en.wikipedia.org/wiki/Mean_curvature
 https://en.wikipedia.org/wiki/Gaussian_curvature

The axis of rotation is the square normalized x y and z curvatures... `squareLength = x*x + y*y + z*z` and normalized coordinates are `x/squareLength, y/squareLength, z/squareLength`;
This square normal is the axis of rotation to use to convert to a quaternion or matrix.

For a simple IK chain (computer inverse kinetics), the fixed chain of angles on a robot arm are simply the addition of all the angles at each point.   
The rotation has to be 'applied'/multiplied to offset points to get the positions of the arm in space from the base origin.  [(FPGA lnQuat adder)](http://www.acsel-lab.com/arithmetic/arith20/papers/ARITH20_Arnold.pdf)... logrithm quaternion adoptation.
But the classical system of quaternions or matrix multiplications requires multiplication with the origin/offset AND the rotation quaternion/matrix; working
with log-quaternions is, again, a simple matter of scaled(T) addition of N axels of curvature.



There exists a system 'Frenet Frames' https://en.wikipedia.org/wiki/Frenet%E2%80%93Serret_formulas  which is based on gaussian curvature, but replaces one dimension of curvature with 0,
because it's used to walk over the surface of a surface (and not both sides at once). ( or rather it follows the tangent and normal along the surface, though the normal does not point along
the surface.)

Translation from curvature to a rotation can be done by taking the angle-angle-angle (curl-curl-curl) 
and normalizing it, with a square-normal, and converting to a quaternion, then applying the quatnerion in a
order-free rotation of the points  (1,0,0), (0,1,0) and (0,0,1); which are respectively called 'right' 'up' and 'forward'.
(These points can be weighted in another application like
computing the oblong rotation by setting the axis points at the min/max/mid mass points of an object....) 

This results in a basis frame that has the tangent as the axis of rotation;  (This is equivalent to the Tangent of a frenet frame, which is a faster method of computation than the above
applied rotation.)   The forward vector is along the direction of rotation around the axis of rotation at that point.    The up vector is away from the origin  ( '0,0,0' of the above axis points), 
and is always perpendicular to the surface; the Frenet frame loses this information... in using just the 'right' to compute the 'up' the tip aorund the 'right' is lost.... which will
also lead to problems figuring out what is 'over' and 'under' another rotation.  The frenet frame only produces coordinates of rotation x/z coordinates, and not Y.


## The Demo (HOWTO?)


I have [this mockup](https://d3x0r.github.io/STFRPhysics/3d/index3.html); REquires WebGL2.

The model of the sphere has nothing to do with the line segments that are shown, and because of the framework is a little misaligned with the vector origins. (the framework recomputes the center 
of the model and the extra data above/around the model confuse the centering).

The sliders have much more range than is available with the mouse; if you click on 
a slider to select the focus there, then arrow keys will adjust in single increments; updating in smaller increments; using the mouse can be a lot jarring until you get used to it.)

The X,Y,Z,T slider control the curvature of a log-quaternion. (the labels are a little mixed up....)
X = X curvature from -4pi to 4pi.
T = Y curvature from -4pi to 4pi.
Z = Z curvature from -4pi to 4pi.
Y = the resulting twist at the destination point.

The colors are X/Y/Z = R/G/B.  Right/Up/Forward.

The X/T/Z sliders control the primary curvature.  The point at 0,1,0 is projected through the curved space to a resulting point, which has a normal (green), right (red) and forward(blue).
The Y slider controls the twist from that base point - it would be the resulting point; it is accurate and spins in place appropriately (even with +/- 2pi added to the projection for fun).

The T slider is the twist around 0,1,0 and really shows up mostly as an offset to the whole rotation... although does change the aspect ratio of the 
circle of same-normal points...

There are anothet set of sliders that controls the axis of rotation which the graph shows the plot for...

Added options to `Show Basis Map` which shows the rotation coordinates and the respective frame represented at that point.  `Show Inverse Basis Map` Really unused, but is an interesting direction to look at 
the rotation basis from.  All rotation paths are the same lengths.  `Show Unscaled Basis Map` shows just the rotations at x/y/z coordinates directly; the graphs of the normal and linear paths
align on one of these maps...


So what is shown

On the ball, are 3 white lines, 1 is from the pole to the rotation represented by x/t/z slider, another is from the pole to that 
same point, but twisted by the Y slider; (always the same point,
always has the same 'up'(green) normal, and just turns the basis forward/right vectors).

There is a graph is space at Z=0, X = Angle of Twist, and Y is the total angle of the twist.  0 is the center, where no additional twist to the frame is applied.  (Y slider set to 0).

(Initiallly) There is a long vertical line of Crossed frames, these represent the change in the 'y' coordinate for the twist at the current point.  At 0 of the Y is 0 twist applied, 
under Y is negative twist and above positive....  As you adjust the x/z curvature, this straight line becomes a closed curve (as a review, a straight line has 
a curvature of 0, and a circle has a constant postiive or negative curvature.) so for a non-zero z/x curvature, the curve has a curvature, and is closed unto itself.

If you go out to about z = 0.6 Y=0, X=0, T=0   then you can start to see the curves better... at the outside extreme, the curvature is actually very large so a small increment of angle change 
produces a large change in position.   The cross points are the x/y/z curvatures projected into the x/y/z coordinate system; I added drop-lines from each point to each x/y/z plane... (the lines
are parallel to the axel of curvature).

There are ~~2 octaves of curves, and ~~ 2 curves ~~in each octave~~ that are related;   The 'curve' that has more linear lines, is the literal value of the curvature;  The smooth closed circle is
the `(square-normal) * angle` or `axis-normal * angle`.  This Curve resembles the iso-linear (everywhere the same value) curve of magnetic flux around a solenoid coil; up to the point that
0 curvature is specified, and the line is direction up and down through the coil.  At any slight positive curvature, however, the radius of the solenoid coil is very night, so the one
edge of the curve is constrained, where the outside is nearly a perfect circle curvature... 


The points around the circles are (1) the original point of the x/t/z rotation represented on the ball... This '0' is highlighted slightly.
(1) another highlighted point indicating where the current 'Y' is set to.  All other points are +/- 2pi twist; (the total twist angle is 4pi where there are 4 values that can be consolidated 
to a principal value, but are themselves unique vectors.)

I know the normal to this plane of the rotation space coordianates that all share the same 'normal' of rotation.  (hard coded)

Shoudl really redirect your attention to the [Twister.md](Twister.md) which has the full method of rotation; the following works
through reverse mapping of the basis to a rotation.

```
 ... for some lnQ  (log-quaternion)...

	// apply 1/2 the curvature to the normal 'up'  (multiply by 1/2 the angle)
	const vForward = lnQ.applyDel( {x:0,y:1,z:0}, 0.5 );  // forward basis of the twist-rotation plane

	// cross normal axis of rotation with vForward  // bi-tangen

	// vRot is the 'normal to the plane' so it might also be named 'up'
	let vRot = { x:lnQ.ny * vForward.z - vForward.y * lnQ.nz
	           , y:lnQ.nz * vForward.x - vForward.z * lnQ.nx
	           , z:lnQ.nx * vForward.y - vForward.x * lnQ.ny
			};
	// normalize vector, those two vectors, while nearly perpendicular are often not .
	const upSqLen = Math.sqrt(vRot.x*vRot.x + vRot.y*vRot.y + vRot.z*vRot.z );
	vRot.x /= upSqLen;
	vRot.y /= upSqLen;
	vRot.z /= upSqLen;

	// cross 'up' with the 1/2 rotated vector to get the normal of the plane of rotation...
	// all rotation vectors that have the same normal as this point lie in a plane which has this normal.
	let vRight = { x: vForward.y * vRot.z - vForward.z * vRot.y 
	             , y: vForward.z * vRot.x - vForward.x * vRot.z
	             , z: vForward.x * vRot.y - vForward.y * vRot.x 
	             };
	const vRightsqLen = Math.sqrt(vRight.x*vRight.x + vRight.y*vRight.y + vRight.z*vRight.z );
	vRight.x *= 1/vRightsqLen;
	vRight.y *= 1/vRightsqLen;
	vRight.z *= 1/vRightsqLen;

```


## Another use for log quaternions

Subtraction of one curvature from another is the change in curvature, and that delta can be used to compute a relative basis frame.

Computing a basis frame is slightly less work than rotating an arbitrary point.

Dual Contouring - https://people.eecs.berkeley.edu/~jrs/meshpapers/SchaeferWarren2.pdf  uses a QEF solver (quadradic error function), to 
track differences in matrixes that represent the normal of surface, so it can find opposing surfaces and not merge them; maintaining the same
manifold.  This would be trivally implemented using log-quaternion differentials.

## The original troubling question...

... which I guess I have no better answer for than a cross product.

If I have an axel of rotation, and a point at a unit distance from that, and another point at some angle/arc-length from the 'origin'al point;, then given
so it's a cross product of the axis of rotation with the 'origin point'... and then scaled by sin/cos of the angle, 
(projected along the curve) using the new tangent/right and bi-tangent/forward...  




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

