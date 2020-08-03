# Space-Time Field Reactor Physics

# Fast Faraday Force Flux Field Reactor (FFFFFR)

I wrote a few pages, and lost it all :(  Lost some references from page too

(Space-Time Field Reactor ?STFR? )


## Glossary

 - quat - short for 'quaternion'.
 - quats - plural of `quaternion`.
 - lnQuat - short for 'quaternion in natural log mapping'  (lnQuats for plural); may also be said as 'log-quaternion' or 'Log Quat'.
 - dlnQuat - short for 'dual log-quaternion'; this adds a separate x/y/z coordinate that represents the translation/location of the quaternion; this point is the 'origin' of any child frames (more later).
 - Quat - the type `class Quat`.
 - principalling - the updating of a lnQuaternion to its prinicpal angles and the associated rate. There is a method `principle()` which sets a lnQuaternion to its principal angles.

## Preface

All the roads I go down lead back to 'use a matrix!'; yes, I will, but sin() and cos() are single clock lookupss; so can't I just save that loikup 
until later?  Why do I have to cary the important numbers in normalized coordinates?  

`A x B != B X A` except in a very small region.  But that's no different than saying `arcsin(sin(A+B)) != A+B` which is true (and untrue) exactly where the first expression is true.
We forget in the process that we've lost the original information, and are working with a modulated value.   And certainly everywhere I've gone, it's very hard to 
not find a cross or dot product to represent a rotation, when in reality it's just a simple addition of angle, and a lookup to get the modulated value for the 
quaternion.  If you apply inverse `A X -B` in certain conditions, that's the same as `B*A` or `A/B` , but then again; that's all in a multiplicative space; it's simpler to just say `A + B - C = D` instead of `C X A X B X -A X - C`  (4 multiplies instead of 2 adds).

Quaternions, kepd as `cos(theta) + sin(theta)N` where `N` is the axis of rotation; end up re-normalized when mlutiplied so that they stay within bounds; they 
can apply a smooth correction... but basically this calculator 

## Recent additions

[Twist operation](Twister.md)



[Curvature Notes](Curvature.md)... This is sort of a explanation of the 

## Live Demos
 - [Original Math Test](https://d3x0r.github.io/STFRPhysics) Stereographic projection of quaternion... finding 'circles'
 - ... another 2d graph test of extended arccos test.
 - [first](https://d3x0r.github.io/STFRPhysics/3d/index.html) Shows curves of interest - shows bundles of rotations around resulting curve...
 - [second](https://d3x0r.github.io/STFRPhysics/3d/index2.html) Shows just the sub-arc of interest; this used to show a more sparely scattered arc because of a bad multiplier.
 - [third](https://d3x0r.github.io/STFRPhysics/3d/index3.html) curvature plots, demonstrate free angle choice, and free 'same normal vector' choice; which doesn't have to be `up`.
 - [Fourth](https://d3x0r.github.io/STFRPhysics/3d/index4.html) Hopf Fibration generator...



## Frame Computation Using Dual Log-Quaternions

I've come to relearn much about the quatnerions and complex numbers especially with applications to rotation.
Quaternions have a natural logarithm function, and a exp.  Many places stress so very much that the order
of multiplication matters; however, there's a note that the quaternions which are also unit-quaternion or normalized in
the process of calculation.  So the reciprical of a unit-quaternion is also the conjugate; so the order or multiplying `pq` vs `qp` 
is just a matter of applying a negative sign.  Even in the non-logarithmic form, the calculation to apply a quaternion
for a calculation and involves cross products, such that `A x B  !=  B x A` which is true, but `A x B == -B X A`.  This helps
identify how order remains in the log-quaternion space.  

Given two logrithmic quaternions(LQ) `LP` and `LQ`, and their equivalent base forms `P` and `Q`,   The multiplication of `P * Q` is
`LP + LQ` OR `LQ + LP` because addition is commutative;  However the multiplication of `Q * P` is also `P / Q` (since the conjugate is also the recipricol), 
so this is a subtraction of logs `lP - lQ`.  If the multiplication terms are switched, the same order 
of operations is preserved in addition of LQ by flipping the sign appropriately.  Probably the above is better expressed
if the parital -- and ---- signs were shown...  Addition is probably `(--lP) - (-lQ)`... (which doesn't reverse ... just becomes -lp - lq which isn't right either.

`PQ = e^lP * e^lQ = e^(lP+lQ)`

`QP = e^lQ * e^lP = e^(lQ-lP)`


On Reflection; it should follow if `Q * P` is  also `P / Q` then `P * Q` is also `Q / P`, No, that doesn't clarify anything, and just muddies the waters.  Adding an Angle `A + B`
, it's the same as `A - (360-B)`  or `A + B - 360`.... Let's just go ahead and blame it on the 2PI modulus.  The point really is, we shouldn't be doing our quaternion math
in the projection of the value;  It's like always computing things about the cube on the screen from the pixels on the screen - they make AI's to do that, not formulas.


### Hypothetical failure case

An IK chain is setup with just a few links, a foot, a body and a couple segments; preferably the segments have rigid bend constraint.  The full calculation carried down the chain results in 
a resulting rotation of 1 degrees; although the total sum of inputs to that is 361 degrees; so to feed 1 back down the chain as the target rotation distorts the motion that the joints up to
that point are 'expected' to do; if the full chain of calculation is calculated in quaternion space.  (And really the limits break at 1/2 of a full rotation)

Log quaternions are the input angle to the sin/cos functions that limit the bounds of quaternions.  This means that the log quaternion can represent total rotations greater than 360 degrees,
and be simply manipulated with addition and subtraction.  (721 degrees is the same sin as 1 degree, but obviously the net motion of 720 is much greater than 1).

## SLERP Comparison

This engine will use lnQuats as the native computation; this lets the engine always directly linearly scale in a spherical path and then expoenentiate
only when applied; in comparison SLERP does `lnQuat.exp( Quat.log() + delta )`, where the same SLERP on lnQuat is just `lnQuat + delta`.

Well... it's almost that easy; if the chain is calculated from a fixed point, it would be best to direct subtract; 

The prinicpal angle form of lnQuat should be used.  The `principal()` utility function updates the quaternion to its princpal angle values, and returns the number of wraps removed.

Free Bodies may run a long accumulation of rotation to get the orientation; application of 
a quaternion with many turns still results in a minimal unit-quaternion representation; although if the accumulator gets too big, loss of precision may 
cause erratic results after a long time.  Free bodies should 'relax' their spin count as required by updating to the principal rotation (except if the value is a angular velocity or acceleration).
Also bodies, that spin very slowly don't need to apply corrections very often.

However, computing a chain from a fixed point like the base of a robot arm it will be more proper to maintain the full spin count (to prevent the robot manipulator from spinning 3 times just because; say on a 
long chain of actuators; but this scenario is also likely to not overflow rotation accumulation.

Principalling of lnQuats can be done with `lnQuat.exp().log()` or `const principal = lnQuat.principal();`.


## Log Quaternion Nature

## Inertial Frame Relavence.

Addition of impulse is the cross product between the vector to the point of impact from the mass' center of gravity and the force of impact. (maybe one of those is negative?)
Addition of translation is the remaining force applied to the dualQuat.
The cross of two nearly parallel vectors is nearly 0; so dead on collisions result in translation.
(The angle is also the arc length, so units of space translate to angle directly).

## Computation overhead introduced vs matricii

The dual log quaternion has to be applied to the dual part, to rotate the projected origin into its own space; that origin and the basis vectors can be retrieved to apply scalar x,y,z and get the resulting translated x,y,z 'world' coordinates.
lnQuat has a conditioning operation `update()` which updates the `exp()` calculation part, which is computation of the length of the point, and using that to lookup sin/cos values; this is the 'costly' part, subsequent application
to points/frames is as expensive as the matrix it replaces.

```
  (translation precompute exp() ) 
  1 sqrt, 3 mul 2 add 1 div 1 sin 1 cos
	sin/cos value are for the same angle, so it can be calated at the same time)

  lnQuat.apply(vector) //  aka mul(vec3)
 18 mul + 9 add  (translation update)

  lnQuat + lnQuat
 + 3 add   (orientation update) 

 18 mul + 12 add   total 

 storage 6 values  (can abbreviate to 3 and 3; w is always 0)
  note:  exp(0)=1 , 1 is the radius of the output quaternion,
     resulting that any lnQuat absolutely a normalized Quat

all of these operations can be done in sets of no more than registers; although it is 2 cross products

```

operation counts for applying a matrix to another matrix.

```
  matrix * dual part (translation update)
 18 mul 6 adds

  matrix * matrix part (orientation update)
 18 mul 6 adds


36 multiply and 12 adds

 storage 16(12) values (9 + 3)   usually sent as 4x4 or 3x3 and 3.
```


overhead compared to dual-quaterion

```
  origin apply  (translation)
   18 multiply and 12 adds

  quat * quat   (orienatation)
    32 multiply and 12 adds 

50 multiplies and 24 adds
  
although there are SIMD 'broadcast' things that make matrix multiply more efficient, it still takes more data to load....
all of these operations can be done in sets of 4 registers.

 storage 8 values  (4 + 4)

```

## Implementation

[JS Implementation](src/dual-quat.js)...

For implmeentation, existing `Quaternion.log()` function should return a new type 'LogQuaternion' which has different operator to apply and apply-inverse to vectors.

`LogQuaternion.exp()` should result with a 'Quaternion' type.

They are mappings in different projections, and should be considered as a different type of units.

| Type | Description |
|---|---|
| Vector | x,y,z points relative to common axis notations; an lnQuatVector these represent the rotation around each axis. |
| Quat | (w,x,z,y) Standard quaternion.  Quat().log() returns a lnQuat().
| lnQuat | (x,y,z) Quaternion in natural log map.  lnQuat().exp() returns a Quat().
| dlnQuat | (xr,yr,zr , xo,yo,zo) Dual Natural Log Quaternion; adds an offset to the frame.  This is the actual base type used in this engine.

| Vector Methods | Parameters | Description |
|---|---|---|
| add | (v) | add a vector to this one; update in-place. |

| Quat Methods | Parameters | Description |
|---|---|---|
| new | ( theta, direction ) | (constructor) Takes theta angle in radians and direction normal around which the theta angle rotates |
|  "  | ( a,b,c,d ) | (constructor)set literal parameters w,x,y,z respectively |
|  "  | ( normal ) | (constructor)Use normal and create a quaternion pointing in that direction |
| mul | (q) | multiply this quaternion with another quaternion; result with a new Quat(). |
| add | (q) | add passed quaternion to this quaternion. |
| addNew | (q) | add passed quaternion to this quaternion, return a new Quat(). |
| apply | (v) | apply rotation to vector parameter, result with a new vector. |
| applyInv | (v) | 'unapply' or apply the quaternion inversed to translate point from quaternion space. |
| log | () | return this quaternion as the natural log of this quaternion.  Returns a new lnQuat(). |
| getBasis | () | return { forward, right, up } object with 3 vectors and the related scalar direction vectors.  (Is also the rotation Matrix) |
| normalize | (q) | make sure this is a unit quaternion (only the axis direction? not including w?) |


| lnQuat Methods | Parameters | Description |
|---|---|---|
| new | ( theta, direction ) | (constructor) Takes theta angle in radians and direction normal around which the theta angle rotates |
|  "  | ( a,b,c,d ) | (constructor)set literal parameters w,x,y,z respectively |
|  "  | ( normal ) | (constructor)Use normal and create a quaternion pointing in that direction |
| add | (q) | add passed quaternion to this quaternion. |
| addNew | (q) | add passed quaternion to this quaternion, return a new lnQuat(). |
| apply | (v) | apply rotation to vector parameter, result with a new vector. |
| applyInv | (v) | 'unapply' or apply the quaternion inversed to translate point from quaternion space. |
| exp | () | return this log-quaternion as the natural map of this quaternion.  Returns a new Quat(). |
| getBasis | () | return { forward, right, up } object with 3 vectors and the related scalar direction vectors.  (Is also the rotation Matrix) |
| prinicpal | () | Removes excessive turns and results with new lnQuat in its principal angle.  Returns a new lnQuat() that is at the prinicpal angle of this lnQuat. (may be 0).  |
| turn | (turns ) | add a certain number of turns to the current rotation.  ( this += turns * PI, in the current direction (if any) ); If the principle() is 0, cannot re-turn it. (Deprecated before release; except in the case you know your thrust is always on the same twist) |
| torque | ( angles, turns ) | apply a torque to this quaternion.  (this += a * t ). |



| dlnQuat Methods | Parameters | Description |
|---|---|---|
| apply | (v) | apply rotation and offset to vector parameter, result with a new vector. |
| applyInv | (v) | 'unapply' or apply the dual-log-quaternion inversed to translate point from quaternion space. |
| getBasis | () | return { forward, right, up } object with 3 vectors and the related scalar direction vectors.  (Is also the rotation Matrix) |


## Rotation limits

If we consider the speed of light achievable, 1 half rotation per nano second is a reasonable maximum.  This is 3B RPM is the maximum rotation rate.
This turns out to be a 1 rotation of 0.3m arc-length per nanosecond is the speed of light.


## Quaternion rotation points

1) ln(q) = angle(s) and length.

add vectors instead of multiply.



## References

[Youtube Video - quaternion expoentiation mapping](https://www.youtube.com/watch?v=UHzAY5Q7ji0), This is actually sort of the inverse way of looking at and understanding log-quaternions. It doesn't
matter so much what the shape of the projection is, but what the source data projects into.

[(FPGA lnQuat adder)](http://www.acsel-lab.com/arithmetic/arith20/papers/ARITH20_Arnold.pdf), Implemented quaternion pose tracking as adders in FPGA Robotics controller.

['Practical Exponential Coordinates using Implicit Dual Quaternions'](http://www.neil.dantam.name/papers/dantam2018practical.pdf) (still not a log system)

[Pose consensus based on dual quaternion algebra with application to decentralized formation control of mobile manipulators (Log- dual-quaternion)](https://arxiv.org/pdf/1810.08871.pdf)

[kinatimatic control with dual quaternions (euler number)](https://reader.elsevier.com/reader/sd/pii/S0022247X12000327?token=C2A88F2FE30E44EC9A7E1439E715AFAE52DDAC7E05FCCB26B5353C6F6EFEE671588329FD76F673D41FAC945FD9B7CAF4)

[Scaling a quaternion to a power through exp() and log(); Example Java Code](https://math.stackexchange.com/questions/939229/unit-quaternion-to-a-scalar-power)


### Applications of Dual Numbers

[dual quaternions, proper euler and imgangary matrix multiplication](https://parasol.tamu.edu/wafr/wafr2018/ppr_files/WAFR_2018_paper_1.pdf); recommends calculation of separate things, since the position is mostly independant of the rotation, don't need to always track the projection AND inverse projection of the point.

[Math - Functions Of Dual Numbers](https://www.euclideanspace.com/maths/algebra/realNormedAlgebra/other/dualNumbers/functions/index.htm), only dual number exp, no ln.

[Meta-Complex Numbers](http://new.math.uiuc.edu/math198/MA198-2014/rgandre2/seminar.pdf), exp and ln; same old stuff, just a nice layout worth the credit.

```
ln dq = 

dual O   Oe + e0e   O^ = O  *O^ = Oe

O^ unchanged  real O part
1/0 

V is angle of rotation total 
thetaHat = v + de;
```

### Other Applications, and common background

[!Spinning T Handle(video)](https://www.youtube.com/watch?v=1n-HMSCDYtM)
[!Kerbal space program - spinning T handle Simulation(same video)](https://www.youtube.com/watch?v=WPRFerc4zqw)
[!The Bizarre Behavior of Rotating Bodies, Explained](https://www.youtube.com/watch?v=1VPfZ_XzisU)  (reiterates on the above)

[Wikpedia - Angular Velocity; especially the 3d particle motion](https://en.wikipedia.org/wiki/Angular_velocity)

[quantum spin modelling](http://bohr.physics.berkeley.edu/classes/221/1011/notes/spinrot.pdf)


[Quaternions and Exponentials - slides](http://www.cs.jhu.edu/~misha/Fall19/29.pdf)


[Quaternions  (long list of general formulas gathered)](https://maxime-tournier.github.io/notes/quaternions.html#interpolation)


[Wikipedia Quaternion(of course)](https://en.wikipedia.org/wiki/Quaternion) (especially exponentiation)

[Wikipedia Natural Logarithms](https://en.wikipedia.org/wiki/Natural_logarithm) (bottom of page, 'Plots of the natural logarithm function on the complex plane (principal branch)' complex number extension, graph of abs(ln(x+yi)) = high speed break of record hydraulic press channel. (30,000 RPM!)




### Other Topics


 tangent topic, about parititioning space; delenay separation provides networks where
 local clusters can be evaulated without searching the whole avaiable space; even if said 
 search is 'fast enough'; in practice objects interact simultaneously with very few other objects
 and those relations are __temporally coherant__.  [3D delaunay tessalation](https://www.ljll.math.upmc.fr/perronnet/delaunay3d/delaunay3d.html)

