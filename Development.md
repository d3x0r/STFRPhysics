
# The before-fore...

Early 2020, I started re-investigating rotations; figuring maybe now 20 years later, maybe there was more 
information and development on the internet regarding rotations.

I wrote this document a few years ago about my view of handling rotations, and why matrices end up better
than quaternions.  https://docs.google.com/document/d/1_6JdZ0VplMFpBeR3QOcV5vhlOGYyn52T4-fITgI6lbc (July 12, 2015)

But also sort of lays the groundwork of how I see rotations...

From the 90's I was developing rotation matrices for 3D programs, using Glide on 3DFX and even software 
rasterizing before that... but matrix multiplication is like an extrinsic rotation, and generally I think
in terms of intrinsic rotation.  A rotation can be applied from either an internal source(intrinsic rotation) (muscles moving, 
rockets firing, ...) or from an external source(extrinsic rotation) (Standing on the earth, having a rod mounted in a lathe, ...).
The final matrix used to transform a point is essentially 3 unit direction
vectors which indicate where the X/Y and Z axes each point.  Intrinsic rotations use these vectors as a basis
to rotate the frame by.  If something rotates around the Y axis, then only the X and Z direction vectors are changed; similarly for
rotating around the X or Z axes, only the vectors describing the plane perpendicular to the axis are updated.   They are moved from one
toward another, using sin/cos products.  

Working in small time steps and small increments, this sort of rotation can be applied iteritively, for a complex (x,y,z) coordinate,
such that the increment around each axis is applied in a different order for every frame; the overall effect is rotating around a single axis.
There was mentioned a long time ago a method to rotate around any given axis; but that ended up being an extrinsic rotation, which has 
no relation to the frame's orientation... so this didn't help me rotate.


# Where this started

 - Up is the Y axis, Right is the X axis and Forward is the Z axis.  
 - A frame is represented by it's up right and forward vectors.  
 - A basis is a frame at the origin (0,0,0) of some coordinate system.


The above relationship is arbitrary, but for communication
purposes this is the convention used in the following text; various conventions exist in various industries, and this is
slighted towards OpenGL; although forward/backward is reversed even from that; which is just multiplying the Z axis of the
resulting matrix by -1.


It's easy enough to represent a frame with an up direction that is on a sphere using two coodinates, I chose the X and Z axes to represent a 
spherical location; leaving the Y as 0.  This then is a frame that has an up somewhere on a sphere, or in some particular direction.

The next transform is then to turn around the Up axis and face a new direction; this will affect not only the Y but also the X and Z coordinates; and is not a simple addition.
The first step in getting the curve of rotations that matches this, was to form a rotation vector with `(x,0,z)` and then calculate it's up axis, and rotate around that axis.

I've always had a hard time getting quaternions to do this...

So I bypassed looking at any sort of quaternion implementation of this math.

Which left me with this curve that sort of just ended in space.

https://math.stackexchange.com/questions/3747951/find-curvature-of-bertrand-curve-to-twist-a-log-quaternion-around-a-target-axle

https://math.stackexchange.com/questions/3759693/finding-the-parameters-of-curves-of-rotations-in-rotation-space 

And then looking at what quaternions were, from a log-quaternion perspective, and I found the Rodriguez Rotation Formula applied to quaternion parts, which are just terms of axis and angle.  And using this formula, with the expected axis-angle calculations from the matrix math, I ended up with a axis-angle, intrinsic rotation implementation of the Rodrigues Rotation Formula.

I ran with that for a long time, developed all sort of things that worked wonderfully.

I did run into an issue with Cannon.JS (A JS physics engine) which I was replacing the quaternion math with the developed math, and mostly worked really well, except in the case that the force from from an external thing; a mouse pick on a cube for example, has to have the rotation axis rotated out of the frame before being applied.

## More on spherical orientations




# And then there's now?

Implementing this math library on Wolfram Cloud, with just math equations, and very little of any of other boiler plate code
to get in the way, It went all wonderfully.  I even implemented quaternions, and got the sort of divergent curve from 'reality'
that I expected, and ran out to share with the world...

https://www.wolframcloud.com/obj/67b9ca01-f294-4dcc-a69c-1cff2bf0507c

And even had 'evidence' that quaternions weren't right... I mean the terms of the functions are not the same... and quaternions do self denormalize; but really should have
been closer than I expected.   Someone challenged my negative sentiments, and I reflected on this and found a double conversion of the quaternion as if it was axis angle; and
fixing that, the multiplication worked.   (The initial samples of rotations demonstrate an off by 3Pi divergence already, regardless of the graph)
Only the curve was sort of reflected/inverted from the curve generated by the rotation formula... (so who's right?  I dunno it's a matter of right answer to what question).

There is a cross product term in the rotation forula, which reversing the terms inverts the sign, and maybe it's a left to right sort of reflection... I flipped
the rotation forumla's cross product, and the curves between quaternions and this rotation formula matched pixel perfect.  Now this does confuse and annoy me, since
"why were quaternions such and issue in the first place then?", and I continued on, I backported the sign change, and fiddled with options on 

https://d3x0r.github.io/STFRPhysics/3d/index4.html and added options
 - use Quaternions: Use Three.JS quaternions to generate the curve.
 - use Internal Rotation: This toggles an internal flag that rotates the axis first into the previous rotation's frame before applying it (intrinsic instead of extrinsic rotation)
  - use Step Function:   accumulate the answer, at each step saving the product and applying another small step at the point resulting
 - Invert Cross Product(Q Compat): This is the cross product mentioned above, which makes the rotation match the quaternion.

Internal rotation also matches quaternion, as well as invert cross product; so I guess Rodrigues rotation formula has a single sign that controls
whether the rotation is intrinsic or extrinsic?

Anyway, I left the sign defaulted, and was going to demonstrate real gimbal lock: https://d3x0r.github.io/STFRPhysics/3d/indexArmProper.html (which can be done with that) which is a real thing, not that a matrix multiplication ends up with `[(0,0,0),(0,c,0),(0,0,0)]` as a result (hooray for matrix multiplication?  I ran into this matrix as one of the early terms of the hopf fibration that is a graceful toroid.  The initial rotation starts at Pi around one axis, and the first rotation is -2Pi+(a small number) around another axis.)  But I found
that the rotations weren't working right.  What had previously had nice graceful curves now formed loops, and controls on frames that were composited from other frames were always rotated by an external axis.  As if they weren't mounted to their parent frames at all.  So I added the invert cross product option to this test, and of course that fixes the original
rotation; but then this inverted cross product really should apply in other places - like rotating a vector should now be inverted?  The specific axis for some frame are still the same, so the same
relative rotations should work, but no, they're all inverted...  

So maybe it's just been that I'm thinking of intrinisc rotation.


If I have a rotation vector `{1,1,1}` and rotate it by `{0.0.0.2}` ... that results in a vector that is the second rotation applied after first doing the first rotation; but this is in a global context.
Unless one is rotated into the frame of another (say get the up/right/forward axes and scale it by specified `{0,0,0.2}` (which would just be a rotation around the local Z axis), and then using that result
to rotate, is using that in an external sense to rotate the frame.



# Compatibility with Quaternions

Quaternion `QxP` is an extrinsic rotation of `Q` around `P`, or an intrinsic rotation of `P` around `Q`. In the intrinsic case, the axis `Q` is within the frame of `P`, and moves as `P` moves. In the extrinsic case, `P` is external to the frame of `Q` and rotates `Q`.

Inverting the cross product in the Rodrigues rotation formula makes this work the same; [The Demo](https://d3x0r.github.io/STFRPhysics/3d/index4.html) ~~has some inversed options still~~, but at least can demonstrate the same configurations;
and the rotating cube indicating the rotation combination over time shows the difference between intrinsic and extrinsic rotations.
