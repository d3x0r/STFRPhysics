

## Background/Preface

In the late 1990's I was building this constructive goemetry tool, which would intersect planes and find the edges to show; and then 
they killed 3DFX and Glide; and then Glide became something else entirely.  By this point I had fundamental math like goemetry, trig, 
calc(123), and beyond that was interesting theory, which was also being developed as fuzzy logic by other people; and I figured I 
could leave that to everyone else.

This was really whiteroom developed; not intentionally, but it was at the time where dialup existed, but the internet wasn't 
what it is now.  I took some time to figure out these 'matrix things', which I had been introduced to, but really seemed like 
a convoluted way to do it when I could just call `multiply(a,b)` and get the answer; my parents taught me I should be able 
to do everything myself before using a calculator to do it, so before using someone elses library, I developed my own library 
of matrix based rotation.  My matrices were transposed and a sign inverted from what OpenGL used... so I have to do actually 
a lot of work to transform my native matrix into opengl; however, my rotation wasn't really built on matrix mutiplication, 
but rather since I was dealing with 'finitesimal' steps anyway, I could step a rotation around the X Y and Z axis, but do 
the rotation in every combination of steps, trying to do the most 'opposite' after each other, and I got smooth rotations. 
I even wrote https://docs.google.com/document/d/1_6JdZ0VplMFpBeR3QOcV5vhlOGYyn52T4-fITgI6lbc (July 12, 2015) a long document 
about the differences between A and B because I was entirely disappointed in acutally using stock matrices, preferring to
implement my own physics tick; I was still resistant to quaternions, because they would self-denormalize anyway; and what 
should be a straight forward rotation around one axis causes a chaotic path.

The short of it is, matrices are just 3 direction vectors, which can be scaled appropriately in a direction based on linear 
characteristics.  Rotating a matrix around X is just rotating the Y and Z columns without affecting the X direction vector... 
When you take the rotation forumla for rotating around `any axis` and apply `(1,0,0)`, `(0,1,0)`,`(0,0,1)` that much becomes 
quite clear.  So the [implementation of rotation](https://github.com/d3x0r/SACK/blob/master/src/vectlib/vectlib.c#L527) that 
I kept did less work to rotate around a single known axis, than any axis.

Any modification of the unit vectors describing the orientation does not further update the origintation, just causes a skew/untrue 
representation in 3D linear space.  Matrices are able to express a direction, but they omit the second cover; there could be a 
rotation that's 180 degrees apart from them that is approached from two different sides, and is not actually the same rotation; 
although a representation of the resulting matrix has a direction... .... (This is all circular; and isn't going anywhere)

Matrices are centered at the origin, and assume that a thing will have positive and negative angles, and that +180 = -180. The terms
of a matrix representation are the `sin()` and `cos()` functions applied to the angles, and then multiplied together.  This results in
a bit of confusion when `- * - = +` and you don't know if the result was from `+ +` or `- -` and conversely with `- * + = -` you don't know
which of the first terms was the negative value.  Matrices represent an orientation, and can represent all possible orientations, but
fail to represent the axis-angle that oriented them.

Quaternions are axis-angle, but are sin(angle/2) times the axis, and cos(angle/2)  which the sin of the angle times the axis merges '--' to '+' and '-+' or '+-' to '-', 
and there is no information to recover the original sign of the axis of rotation or sin of the angle; but also the actual 
sign of the angle cannot be recovered. Quaternions may be decoded in such a way that they do not represent the original rotation vector,
but represent an identital conjugate version of the vector instead; care must be taken to restore the angle to only all + or all -, and not
recover all angles as less than pi.

Further information will be presented about axis angle representation of rotation direction.  The axis is 90 degrees away from 
all points it modifies, the resulting matrix which indicates the direction of this axis represents the rotation around that axis, 
but not the axis, and the vectors it contains are in the direction of being around the rotation axis, not perpendicular.

## And then to really complicate things...

Angles will be represented using a fraction from 0-1 for 0 to 90 degrees. A value greater than 90 degrees will be greater than 1. Partially this equates '1' to 'i' in complex numbers or quaternions, that
1i is pi/2 radians of rotation; this is just '1'. 

Comparitively can use the number 0,1,2,3,4,.. to represent important points on a sin curve (where it's min and max and 0), that 0=0, 1=1, 2=0, 3=-1, and 4=0; 4 is a completed cycle from 0, and is back to 
the same value as 0. In binary, the values 00, 01, 10, 11, have a sign bit that's the left bit, and the value bit on the right side, giving +0, +1, -0, -1, +0,... for sin.  The sign on 0 is often irrelavent, but
one might regard the sign of the 0 as the direction the curve is going when it crossees that 0, with either a positive slope at 0 or a negative slope at 2.

In the modulo-4 math, 1,2,3 is the same as -3,-2,-1.  -1 is pi/2 radians the opposite direction of 1.  2 is pi radians, and is the inverted direction from 0.

This later simplifies using the ratio of masses on a balance which yields a fraction from -1 to 1 which is the anglular velocity from -90 to 90 degrees; a balance can't ever be greater than 90 degrees.

### Math-like objects

sum n=1 to N  ((x_n,...),(Alpha_n,...))

FOr on dimension, the angle and the length are generally orthoganal and do not affect each other. 
 `(R_a,Theta_a) + ( R_b,Theta_b) = (R_a+R_b, Theta_a+Theta_b );` scaling is applied per term... `A(R,Theta)=(AR,ATheta)`

To give things size, `(R_from,R_to, Theta_from, Theta_to)` or`((R_from,Theta_from), (R_to, Theta_to))`, and we should of course account for time... 
`((R_from,Theta_from), (R_to, Theta_to), (R_velocity,Theta_rotation))`; acceleration is a temporary property that operates on a thing's state, 
and while associated with the object come more often from external things; or things that are attached, and would otherwise be external.

#### 2D

`(((X_from,Y_from),(Alpha_from,Beta_from)), ((X_to, Y_to), (Alpha_to, Beta_to)), ((X_velocity,Y_velocity), (Alpha_rotation, Beta_rotation)))`

This gets to be quite the mouthful; and really such a naive notation doesn't account for multiple parts of a thing being attached, and then rotation value of that within the plane, 
separate from the alpha and beta rotations.


## Rotation Vector

A rotation vector is a vector describing the axis-angle of a rotation using 3 components; the rotation around the X, Y and Z axes effectively applied simultaneously.  These vectors can add, 
combining torques from multiple sources to be applied all at once, they can subtract, and find the error or difference between an expected target and real target.  There are also methods 
to rotate a rotation vector without a matrix; and it's not that much more work than doing the math with matrices.

The conversion from rotation vectors to matrices are a 2 to 1 surjective mapping, which is lossy; you cannot immediately get the original rotation vector (axis-angle) 
value from the matrix, because the representation using linear vectors in a matrix overlaps itself at +/- 180 degrees; while the full rotation has to go +/-360 degrees 
to get back to the start (for a total span of 720 degrees or 4pi).

- scaled normal notation : θ(x,y,z)
- vector notation : (xθ, yθ, zθ)
- rotation vector space is typically a region around identity, within a range of 2pi.  Rotating around any axis by 2pi the  represented frame is the same as 0.
  - Beyond this shell, it may be possible to apply a linear offset and hop orbits; or perhaps a resonant spin that happens to come around a parallel axis.

There are (at least) 2 vector spaces, one for linear/directional representation, and one for the orientation and anglar velocity representation.  They have their own independant inertia (law of motion; a thing that is spinning will keep spinning... a going in a direction will continue going in that direction, and neither direction has anything to do with the other; more later).

There are 3 degress of freedom in 2 units of turn and distance.  There's an additional axis which enables freedom in these 2 units. They are not entirely independant vector spaces, through physics thare ways to trasfer part of a coodinte of turn into distance, and vice versa, the current and projected orientation may also modify how a rotation vector is represented in linear space.  

By my count, that makes us have a 3D world of, time, momentum, angular momentum.

### Physical dimension vectors

These vectors may be treated like, position, velocity and acceleration.  Position is a specific point at time, velocity is the change in position in time (the freedom to move), acceleration is a change
in velocity in time.  They can be paramterized as:

| Parameter | Vector | Directed Distance |
|---|---|---|
| Position | accumulation | (x,y,z) | distance(d)*direction(x,y,z) |
| velocity | differentiable| (x,y,z) | speed(v)*direction(x,y,z) |
| Acceleration | differentiable | (x,y,z) | delta speed(a)*direction(x,y,z) |
| Orientation | emergant/accumlative | (x,y,z) | angle(theta) * axis(x,y,z) |
| Rotation | differentiable | (x,y,z) | (x,y,z)  angle(theta) * axis(x,y,z) |
| Angular Acceleration | differentiable | (x,y,z) | accel(theta) * axis(x,y,z) |

There are applications which can benefit from having expanded versions of the coordinates, because the sign of the angle or speed otherwise is lost when multiplied with its direction vector.  Quanterions
have no reference for the sign, and only express either all positive or all negative spins.

Whether scaled-normal or vector notation, they represent the same element of the rotation vector space.

- axis-angle (rotation) may be represented by either of the previous two equivalent values.

Vectors add as expected from geometry.

Scaled normals need to be converted to vector notation before addition.


Rotation space is 0 to 2pi; and the rotations for x and 2pi-x result in the same matrix representation.
Typically rotations will be around pi +/-x; or around the region of most uncertainty; the difference between the points is not recoverable from the matrix itself; but may(just a possible) be if you know the prior place, and want to project what the next might be.

#### Specific operations within the rotation space different from linear space

(see any other document about applied RRF)

```
    velocity of '1' is a spin of pi/2 / pi/2 and a linear length of 1?
    
    quarter turns work with natural elements of energy and mass specified later.
```


Rotating a rotating vector performs a co-mutation between the original rotation vector and the applied rotation.


---

## Physics First Principles


Existing units of physics, mass(g), time(s), distance(m), etc are included.

Additional a unit of 'quarter-turns'(q) is added.  This is represented with a 3 component rotation vector which behaves 
much like a 3D position vector, other than applying changes to evertyhing orthagonal the line from the origin to it.


Units that are multiplied are represented with their letter and a '-'(usually silent and not pronouced) separating them, 
for example `g-m` is mass times distance.  Units that are divided by other units, a represented by their letters and are 
separated by a '/' (which is prounouced 'per' usually), for example 'm/s' is distance per time.

--- 

The following section is a step wise approach to Principia and where this might apply.

https://redlightrobber.com/red/links_pdf/Isaac-Newton-Principia-English-1846.pdf

### Principia

- Definitions
  - quantity of matter is measure of the same from density and bulk.  (Weight and Measure).
  - quantity of motion is measure of the same from velocity and quantity of matter.
  - (inertia) 'vis insista' - innate property of mass to resist change.
  - impressed force - applied externally to an object to change it.
  - centripetal force - attraction to a center (gravity, magnetism)
  - quantity of centripetal force (spread out)       The absolute quantity of a centripetal force is the measure of the same proportional to the efficacy of the cause that propagates it from the centre, through the spaces round 
  - acceleration quantity of centripetal force
  - motive quanity centipetal 
  
- Notions
  - absolute time
  - absolute space
  - place in space
  - absolute motion  (place to place over time)
  - ordering of time and space
  - 

### Laws of Motion

- Every body perseveres in its state of rest, or of uniform motion in a right line, unless it is compelled to change that state by forces impressed thereon.
- The alteration of motion is ever proportional to the motive force impreus ed ; and is made in the direction of the right line in. which that force is impressed
- To every action there is always opposed an equal reaction : or the mutual actions of two bodies upon each other are always equal, and directed to contrary parts.


### Pendulums and oscillations

Pendulums are a special case of beam-balance where all of the weight is on one end of a fulcrum; this means either `(A-0)/A=1` or `(0-B)/B=-1`, and the rotation applied is always a constant.
All existing newtonian math applies (Book 2, Section 6).  Planets, etc are also single sided balance beams when interacting with other similarly scaled bodies.

### Fluids

Navier Stokes is the place to address this, diffusion, mixing, etc in Newton's stuff while 'right' is incomplete. Modelling flows with complex numbers is probably not a great idea; the linear
components are still rectangular, not polar, and the spin is then as above applied as an unbalance of weight on a fulcrum. 

Section 9 in Prinicpia is on circular fluid motions; this would apply here; but not really because it's talking about the rising of the liquid outside vs gravity.

### Levers

Certainly there is force applied on a lever is proportional to it's length from the fulcrum...

#### Correlaries follow

Consideration of geometry of acceleration of centripetal force on an otherwise unchanged velocity.  Also Point between two gravitational bodies.


- A body maintains its state, unless acted on by external force.
  - a body at rest, with no velocity, remains at rest.
  - a body with a velocity ( a speed and direction ) maintains its velocity, without any forces acting on it.
  - a body wwith a spin ( an axis and angle <> 0 ) maintains its spin.

---

## (Back to your regularly scheduled program...)

### Balance of weights

The first apparatus we start with is a beam balance scale. The ideal scale has 3 pivots, one in the middle where the fulcrum is (the point the beam turns 
around), and 2 pivots where 
objects to be compared are hung.  A beam balance will settle into a set angle for some ratio of objects, it's not just that if one side is heavier the 
scale hasa critical failure and falls with the
heaviest side straight down.

When balancing on a scale, there has to be a total of 2 things to have any sort of balance. Even when the scale is empty, on one side you have 'nothing' 
and the other side is 'nothing' for a total of 2 'nothing's.  If you have 10 apples and another 10 apples you have 2 (10 apples); and even if you were comparing parts of objects
1/2 of an apple compares against another half apple and you have two half apples.


The calculation for the angle for a count of similar objects `A` and `B` is just `(A-B)/A` or `(A-B)/B` depending on whether `A` or `B` is larger respectively.  These can be algebraicly
rearranged as `1-B/A` and `A/B-1`.  Another truth is `A+B=2c`.  Really since A/B and B/A are the values being used, any common divisor they have cancels out with itself; as in `A/C+B/C=2` and `A/C / B/C = A/B`.
And really just saying `A+B=2` is another useful identity in the algebra. 

The function `f(a,b) = { a>b: 1-b/a, a/b-1 }` can plotted with `g(x)=f(x, 2-x)`, which uses x and it's compliment of 2-x to graph the fraction of 90 degrees for any ratio of objects.  `1-(x/(2-x))` and `(2-x)/x-1` then are the expressions for a plot;
note that were there is a `2` that `a+b` can be substitued.  The 2 in this case is sort of a scalar to the function; 2 can be replaced with 'pi' for radians input, or '180' for degrees.  2 is actually 2
quarter turns.









### Speed of Light

Classically, wavelength(m) * frequency(1/s) = C;  this is extended with turns to be `length per quarter-cycle(m/q) * frequency(q/s) = C`. 
Wavelength is length of a quarter cycle. frequency is quater cycles per second. or maybe `length per quarter-cycle(m/4q) * frequency(4q/s) = C`; the 
scalar would end up canceling out along with the units.


The energy of a wave is a direct relationship of its frequency; `E = hF`; where `h` is Plank's Constant that directly scaled turns per second.

Using this, and replacing into the 'Mass–energy relation' `e=m*c^2` 
represented by  `t/s = g * t-t-m-m/s-s`, and reordering the terms `g-m/s = 1/t*1/m` 
Or momentum equals one over turns times one over meters. 
~~The smaller the radius that the turns happen in, the greater the mass.~~(this requires additional investigation, specific directions might infer different properties?)
Alternatively this can be factored like `g = s/m-m-t` which is `g-m/s = 1/c 1/m`. 
The smaller the radius, the greater the turns can be because there's less `m-t/s`. 
(Maybe instead 1/c = g-m/s * m?)

### Maybe instead?

Revisiting the above, the principle dimensional units are time(s), distance(m), and turns(t); the units of mass(g) can be expressed entirely in terms of time, distance and turns.

Time and distance are non-independant values, where you have motion, coordinates of distance are related to time (m/s).  Similary time and turns have a relationship thats a measure of angular velocity (t/s). 

(?Relationship) of distance and turn  are (multiplied?) to find an angular distance or arc-length per time traveled.

Accelerations can happen either because of a transfer of distance to turn (throwing a ball into a water-sheel that can catch the ball's momentum and turn it into angular velocity), or turn to distance, 

Photons transmit turns(an acceleration of torque) between principle entities.  It goes from an angular speed, to a linear transmission, and results in an acceleration of turns when interacting at a targer.

? Gravity (photons) transmit linear velocity; the source is linear(1/m?), becomes a turn(wave) and becomes a linear acceleartion.



-----


# Unnotated notes

Dirac Equation is (ihya - mc )g


e = mc^2  c^2 = pi*pi (radius is pi, circum = 2pipi)

e/2pipi = m

freq*wave= c

per-sec (seconds are abitrary)
(meters are abitrary)

299 792 458 m/s

.299m/ns

// pi * pi
9.8696044010893586188344909998762

// gravity on earth?
9.807 


freq = angle-change
energy = h*freq  (h=planks constant)
wave = linear-change

turns(1)/sec * meters = turn-meters/sec

m c^2 = e

mass * turn-turn-m-m/sec-sec = (1)h*turns/sec

mass = (1)s/m-m-turn

mass*m/s = (1)h/m-turns

mass = s/m-m-turns

mass(g) = 1/c 1/m

mass*m/s = (1)s/m-turns !

mass* c = 1/c * turns!












## What are Dimensions? (to be moved later, too philosophic)

(sidebar, another view of coordinate systems?)

In 1 Dimension, the length along a line is a a linear dimension.  It doesn't matter what shape the line is in, but it may be convenient to consider it a straight line for now.
There has to be some fixed mark on the line from which the distance is measured; many points along the line have relative distances to each other, and any other point is a valid origin for distance.
There is an amount of twist around the line, without adding another spatial dimension, line-landers will occupy some amount of arc-length or angle, (perhaps called phase?), and relative rotations can 
be measured against other known orientations.  If there's a well defined 0 for some reason, all angled might be based against that.  If the angle that's occupied does not overlap another line-lander they can pass each other
on the line, even if their body is also itself a length, with different amounts of angular occupation along the length in different orientations.

A second orthoganal dimension can be added, relating two of the previously mentioned line dimensions, and providing a 2D surface of X/Y relative positions things can interact with, and the additional rotation angle controls a direction normal
to that surface.  A surface normal is a sort of direction of the surface or orientation; in computer graphics, this is a normal map, which can use two spherical coordinates to represent a direction; which is a combination of the two spins 
of the X and Y lines.

To track a rotation in that plane, a third axis really has to be considered that is perpendicular to the surface itself, and becomes co-incidental with the Z axis when adding another dimension.
The rotation factors of the existing 2 dimensions don't really apply to track the rotation of the object on the plane, but the rotation at every point on the plane; and none of the points on the plane can move off of the plane.

Adding a 3rd dimension, now an X,Y and Z axis (which are, again, aribtrary lines, they don't have to be straight, and later will have to not be straight, but at this point, straight lines can be considered).  This forms a cube of related points
and thre's full freedom to move in any x y or Z diretion, plus at every point in the space there is an orientation to that point, which are the 3 coordinates of rotation associted with each axis.  
Shapes that occupy 3 linear dimensions, also occupy arc still, and additionally can use the same rotation directions to apply to points in the space around a line.  And all of the points around the line are rotated a certain amount
in a certain amount of time, which forms a macroscopic rotation.

These various dimensions can be used in various subsets; complex numbers for example use 3rd spin and first and second x/y location.

The change in orientation of the points in a space can be applied to fixed points in that space, and project how they change in time.  If the points (1,0,0), (0,1,0) and (0,0,1) are all individually rotated by a rotation, then the result
is a new orienation of that frame.  This sort of frame would represent the current X Y and Z axis coordinates, which can be scaled with each new point to find a new location in space.   Matrixes capture this, and represent these three direction
vectors, which, when applied(multiplied) with a point, results with a point in some direction in space.



### Moving Angles (rotations)

Rotations in 3 dimensions may be added together if they all happen at the same time; and any basis vectors Xb, Yb, Zb that are perpendicular in that space may be used scaled appropriately by some related X Y and Z scalars, and added together.

Rotations represent a change in angle over time, so if an object has already elapsed some time, and is at a rotation, applying the next rotation must be an integral including the current rotation which still happens; either the additional
rotation is from an internal source, in which case the relative direction of that force changes in time with the original rotation, or it is external, which changes which direction the current rotation is relative to that external instead.






- Photons transmit torque.  (light, particles that are in a non material state)

- Mass transmits linear momentum.

---------

particle physics indicates that neutrinos are tiny with a super tiny mass...

but then they don't have a lot of spin?  it's the composition of spins not a single spin itself that makes for
a particle.

A linear twist has little bearing on size - if there's tangential rotation on top of that, it may fold backward
into a closed loop; but then neutrinos are particles in motion - with their own linear velocity... 

does the target have linear velocity?  gold leaf experiments have motion with static (internal spin)


with nearly insignificant electric charge... 

## To Be moved up.

General relativity(special relativity) curvature is accomplished.

So - linear paths around any pure gravitational source will not interact with the source except on direct incident.

If the wave length of the light is longer than the incidental area it may still interface but is still a low chance, with a high chance to be out of phase also.

Photons travel on geodesics, within a space that is displaced by space itself collapsing into itself.?

This is like quantum locking in magnetism.

The idea is that as space falls within the exclusion, that torque is imparted, which prevents more of that space from falling into it in that direction, by displacing the space linearly.

This can be seen that the space is rarified; certainly the amount of surface that is around 0, when stretched to +1 has can only be so thick... 

If the thickness of that is less than a wavelength it will not be seen by a wavelength.

The space that is most likely to fall in next is on the rotation axis, which will move the axis in a random direction; which forces a displacement now perpendicular to that, allowing another 90 degree area of space to potentially fall in...
though at any particular point a point of space might fall in, changing the direction of the spin, and allowing certain uncertainty in the spin direction (unless conditioned by other means).

at any time there's a -1 space and +pi rotation and -1 rotation +1 space  (the rotation has to give space back to space?  the rotation can emit the space as a photon?  Peizo electric?)

In the case of striking peize electric with mechanical (linear impact) this forces space into the exclusion in a particular polarized direction, causing a net spin in a certain direction

light cones are always divergent from an emitter.  The wavelength of light is tangential to the frequency.  If the frequency is coming at you in time, then the wave is across your view; this impliex that 
it has at least to differene X-> values... that has a unique position. 
    When the photon is emitted it's at a certain frequency that the current spacial configuration of the emitter is(a), and is seen as red shifted.

(a) that iron experiment at harvard... at the top, the space that contains the iron is in a less dense space, with the detector at the bottom  is in more dense space, the wavelength is compressed and blue shifted with the spatial gradient.
If the emitter is in the more dense space, then as the photon moves away from that source, it expands to the less dense space where the emitter is and has a longer wavelength, and is apparently red shifted.

(Most)Any source of photons we see is massive, and has a certain gradient of space in which its particles are in to emit said frequency.  anywhere outside of that, and those points that are furthest from it will have a divergent angle of that source gradient of X)

Back to a ideal massive source - is in visible.
If the mass existed within the excluded space, photons would pass around it and never actually hit it.


Very distant very massive objects may appear invisible if there is enough behind them to occlude it.

2) at some absolute distance L (in light-meters) the divergence from the source will be equivalent to flat space (in addition to other curvatures the light passes through? regardless of)

Or - the universe is generally expanding, and space in generally is getting rarified allowing for a red shift everywhere around us, which most recent time being the least gravitational dense. (this is still a theoretical consideration)

- state? - Space that is displaced does not displace the position of other displacements.
  




