

## Background/Preface

In the late 1990's I was building this constructive goemetry tool, which would intersect planes and find the edges to show; and then they killed 3DFX and Glide; and then Glide became something else entirely.  By this point I had fundamental math like goemetry, trig, calc(123), and beyond that was interesting theory, which was also being developed as fuzzy logic by other people; and I figured I could leave that to everyone else.

This was really whiteroom developed; not intentionally, but it was at the time where dialup existed, but the internet wasn't what it is now.  I took some time to figure out these 'matrix things', which I had been introduced to, but really seemed like a convoluted way to do it when I could just call `multiply(a,b)` and get the answer; Please don't take this as arrogance or ... I mean you could say 'sure he's just lazy' but my parents did teach me to be able to do everything myself before using a calculator to do it, so before using someone elses library, I wanted to develop my own library; and I did.  But my matrices were 90 degrees rotated and even sign inverted from what OpenGL used... so I have to do actually a lot of work to transform my native matrix into opengl; however, my rotation wasn't reaCancel changeslly built on matrix mutiplication, but rather since I was dealing with 'finitesimal' steps anyway, I could step a rotation around the X Y and Z axis, but do the rotation in every combination of steps, trying to do the most 'opposite' after each other, and I got smooth rotations.  I even wrote https://docs.google.com/document/d/1_6JdZ0VplMFpBeR3QOcV5vhlOGYyn52T4-fITgI6lbc (July 12, 2015) a long document about the differences between A and B because I was entirely disappointed in acutally using stock matrices, preferring to implement my own physics tick; I was still resistant to quaternions, because they would self-denormalize anyway; something was still wrong there somehow.  

The short of it is, matrices are just 3 direction vectors, which can be scaled appropriately in a direction.  Rotating a matrix around X is just rotating the Y and Z columns without affecting the X direction vector... When you take the rotation forumla for rotating around `any axis` and apply `(1,0,0)`, `(0,1,0)`,`(0,0,1)` that much becomes quite clear.  So the [implementation of rotation](https://github.com/d3x0r/SACK/blob/master/src/vectlib/vectlib.c#L527) that I kept did less work to rotate around a single known axis, than any axis.

Any modification of the unit vectors describing the orientation does not further update the origintation, just causes a skew/untrue representation in 3D linear space.  Matrices are able to express a direction, but they omit the second cover; there could be a rotation that's 180 degrees apart from them that is approached from two different sides, and is not actually the same rotation; although a representation of the resulting matrix has a direction... .... (This is all circular; and isn't going anywhere)

Matrices are centered at the origin, and assume that a thing will have positive and negative angles, and that +180 = -180.

Further information will be presented about axis angle representation of rotation direction.  The axis is 90 degrees away from all points it modifies, the resulting matrix which indicates the direction of this axis represents the rotation around that axis, but not the axis, and the vectors it contains are in the direction of being around the rotation axis, not perpendicular.




## Rotation Vector


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



Whether scaled-normal or vector notation, they represent the same element of the rotation vector space.

- axis-angle (rotation) may be represented by either of the previous two equivalent values.

Vectors add as expected from geometry.

Scaled normals need to be converted to vector notation before addition.


Rotation space is 0 to 2pi; and the rotations for x and 2pi-x result in the same matrix representation.
Typically rotations will be around pi +/-x; or around the region of most uncertainty; the difference between the points is not recoverable from the matrix itself; but may(just a possible) be if you know the prior place, and want to project what the next might be.

#### Specific operations within the rotation space different from linear space

(see any other document about applied RRF)

```
    velocity of '1' is a spin of 2pi and a linear length of 2pi?
    
    turns of 1 work with natural elements of energy and mass specified later.
```


Rotating a rotating vector performs a co-mutation between the original rotation vector and the applied rotation.


---

## Physics First Principles


Existing units of physics, mass(g), time(s), distance(m), etc are included.

Additional a unit of 'turns'(t) is added.  This is represented with a 3 component rotation vector which behaves much like a 3D position vector, other than applying changes to evertyhing orthagonal the line from the origin to it.


Units that are multiplied are represented with their letter and a '-'(usually silent and not pronouced) separating them, for example `g-m` is mass times distance.  Units that are divided by other units, a represented by their letters and are separated by a '/' (which is prounouced 'per' usually), for example 'm/s' is distance per time.

Classically, wavelength(m) * frequency(1/s) = C;  this is extended with turns to be wavelenth(m) * freqquency(t/s) = C.  This changes 'C' from a 'speed' to a relation that is turn-meters per second (`t-m/s`).

The energy of a wave is a direct relationship of its frequency; `E = hF`; where `h` is Plank's Constant that directly scaled turns per second.

Using this, and replacing into the 'Mass–energy relation' `e=m*c^2` represented by  `t/s = g * t-t-m-m/s-s`, and reordering the terms `g-m/s = 1/t*1/m`  Or momentum equals one over turns times one over meters.  The smaller the radius that the turns happen in, the greater the mass. Alternatively this can be factored like `g = s/m-m-t` which is `g-m/s = 1/c 1/m`.  The smaller the radius, the greater the turns can be because there's less `m-t/s`.  (Maybe instead 1/c = g-m/s * m?)

### Maybe instead?

Revisiting the above, the principle dimensional units are time(s), distance(m), and turns(t); the units of mass(g) can be expressed entirely in terms of time, distance and turns.

Time and distance are non-independant values, where you have motion, coordinates of distance are related to time (m/s).  Similary time and turns have a relationship thats a measure of angular velocity (t/s).  

(?Relationship) of distance and turn  are (multiplied?) to find an angular distance or arc-length per time traveled.

Accelerations can happen either because of a transfer of distance to turn (throwing a ball into a water-sheel that can catch the ball's momentum and turn it into angular velocity), or turn to distance, 

Photons transmit turns(an acceleration of torque) between principle entities.  It goes from an angular speed, to a linear transmission, and results in an acceleration of turns when interacting at a targer.

Gravity (photons) transmit distance; the source is linear(1/m?), becomes a turn(wave) and becomes a linear acceleartion.



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















- Photons transmit torque.  (light, particles that are in a non material state)

- Mass transmits linear momentum.

