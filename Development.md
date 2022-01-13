
# The before-fore...

Early 2020, I started investigating rotations; figuring maybe now 20 years later, maybe there was more 
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



  
