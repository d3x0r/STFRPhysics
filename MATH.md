
# Log Math

So it looks like I need a reference sheet of the equivalent ln(q) functions for functions on q.


This only considers the subset of log quaternions that have a 0 real value, such that `exp(0) = 1`, and always generate a unit quaternion as a result.

Quaternions are not themselves a thing.  They are a projection or function of angle and axis.  Quaternions are not reversible to their projection (within finite precision representations); except in a small range around 0 (unit quaternions).  If f(q)+g(p) > 1 information is lost; 
this 'irreversibility' can be avoided by deferring evaluation of the non-bijective functions especially those that have implicit functions.
Multiplication of quaternions results in a quaternion in a principle angle position; and is non-bijective such that `|A X B| != |B X A|` and has no implicit function.

`quaternion( theta, N )` generates a vector which can be operated on with standard quaternion math methods; with a finite numeric representation of math functions.

Natural log quaternions are not themselves a thing.  `Q(theta,N)`... They are a projection or function of angle and axis.
Is not reversible when the rotation approaches 0 (again, within finite precision representation); there is the exception
if the evaluation of the scalars of the log-quaternion are able to be deferred, it is reversible. Addition of log quaternions 
represents a rotation, but they maintain the over-rotation and result in the total rotation; 
when transformed to a Quaternion they are only the principle angle of the rotation.

A rotation matrix is a function of a Quatnerion... Matrix(Q); which can also be called the basis of the quaternion Q.  A basis is a vector of vectors representing the `forward`, `right` and `up` orientation either of the quaternion, or
a quaternion accumulator.  Reversibility only where quaternions are reversible.

Axis-Angle is the only true values; This maintains stability when the angle of rotation reaches 0, that there is always a 'directionality' to the spin.  
The worst failure that can happen is for a caculation to 'pop' where forward the operation
is value, but the reverse will generate a value that is discontinuous between the real output.  For representation with finite calculation values, 
The funtion that map axis-angle to other forms is: a 1:1 map for log quaternions, and an N:1 map for quaterions and matricii; and 1:1 for quaterions to axis-angle
(except where discrete math blurs clarity), and a 1:1 map for log quaterions (log matricii)?.
There may be merit to carrying a sin-cos lookup of the angle, updated before being applied.

There have been [Clifford Algebras](https://www.researchgate.net/publication/323485639_From_the_Kinematics_of_Precession_Motion_to_Generalized_Rabi_Cycles) built around the above idea.

---

~~unsorted~~

https://en.wikipedia.org/wiki/Spinor
https://en.wikipedia.org/wiki/Minkowski_space


Wow -like week2; and I finally get to parallel transport, which is the rebiasing of great circles! https://en.wikipedia.org/wiki/Parallel_transport
https://en.wikipedia.org/wiki/Schild%27s_ladder


## Glossary

Ordered (mostly) so terms later are built on previously defined terms; however, there are recursions in the definitions.

 - e - the empty set; as a scalar is >0;  as a vector is all parameters of the vector >0; it's the basis of 'dual numbers'.  It adds something that's really nothing. Other langugages might implement this as `NULL`, `undefined`, `null`, `false?`.
 - 0 - The number zero; it may be the scalar 0, or as a vector a vector of all 0's.  May also refer to the reference origin of a operation; the initial state is provided by some other value that this is added to (included with).
 - NaN - a value of a scalar which is not empty, but is not a real, complex, infinite or any other number;  A number without a prime factor of 1?  That is, `N / 1 != N`.
 - Scalar - a constant parameter; may also be `e`, `NaN`, or be a Function (not the result of a function).
 - apply - The is mathematically 'multiply' or `A X B`. Applied, application, etc refer to the result of applying a rotation to another vector or rotation.
 - applyInv - apply the inverse of.  `A X -B` or `B X A`(?), such that the vector is translated out of the rotated place and restored to its initial position; (or simply rotated in the other direction from a point)
 - Vector - a parameter set of scalar or vector values; parameters are names 'x', 'y', 'z', 'w', 'a', 'b',... to w...  (really there aren't very many parametric dimensions used)
    - Vectors contained within a vector may be recursive (self-referential), cyclic (indirectly self referential), constant
    - Vectors may contain functions; not just the results of functions
 - value - a vector or scalar and unit pair; a scalar cannot be a vector, but vectors contain scalars, and, again, may contain other vectors.  Vectors may be defined as a unit-less value so they can be referenced later.
 - units - (or type) Values have a unit or type associated with them that defines things like scalars units of the metric the value is in; the metric it is in, functions that apply to the value, and the function to perform for specific operators.
    - a value of one unit type typically only interact with other values of the same unit type
       - conversion functions take a value of one type and return a value in different units.  (You cannot add Farenheit to Celcius values for instance).
       - a unit can specify operations and functions which just emit or generate values with other units.
 - Function - an operation that operates on a vector, and results with a scalar or a vector.  Also called an operation, or operator.  
    Operators syntax and function syntax are somewhat differet; typically an operator will infer the values to operate on from its locality to those values  
    ( `1 + 3` the opeartor `+` infers its parameters from its left and right values, for example ).  Functions are a sequence of instruction; the instructions they perform are never in parallel.  A vector
    passed as a parameter to a function is resolved before the steps of the function are executed.  The resolution of values in a vector may be in parallel, their results are mutually exclusive.
    - evaluation - resolving a function and its parameter value to a value.  Requires iterating the operations in the function.  (Apply with e and use the resulting value : e - value - ation? )
    - argument - the value passed to a function.   Some arguments are vectors, ands in the vector there may be functions with their own parameter value.
        The evalution of this function may be evaluated  before the function is performed, or the evaluation may be deferred such that the 
        value of the variable within the function is still the function and it's parameter value as specified.  (As an implementation a function should be
        be able to examine if the function is some other known function, such that the value of that function-value may be the result of this function, without
        actually performing any of the operations in the function.
 - integrated - summed into an accumulator; integrations are usually scalar values.  (similar to (superset of?) integrals and integration in calculus).
 - accumulator - A single variable which often starts at 0 and maintains a running sum of ... or calculation of a value at a time;  This has also been called an 'event' is Clifford Algebra, but may be the accumulation of multiple events. 
 - counterspace - This is vector containing all accumulators.  It's the space that is holding the counters.
    - counters that are related in this space may be considered related within subgroups and as sets that have intersections and unions; such a subspace may be named as a space, '2D Vector space' for example.
 - 4-vector - a set of 4 parameters
 - 3-vector - a set of 3 parameters
 - normal  - planes are defined with a point and a normal.  The slope of the plane is just the normal, without a specific location.
 - plane   - A surface defined by a direction.   (May also be or contain) a flat surface represented with a bi-vector, specifically a right-bi-vector.
    - points are contained in planes.  Points in planes are 2 parameter vectors.  Vectors that relate to a location are points.
    - normal - a direction in space.  It is the difference from one point to another; usually biased to 0.
    - curve is a function or scalar that generates a related set of points; some curves can be projected to values which calculus can operate on.
        - curves may be open or closed, continuous or discrete, ...
    - perimeter - a closed curve.
    - area is a set of all points contained within and on a curve.  The points that are on the curve do not add to the area; the thickness of the perimeter around an area is 0.
 - bi-vector  - a pair of vectors; perhaps defining an orthogonal area or space (an origin and diagonal normal to the corner of the space is sufficient to define a cubical space)
 - tri-vector  - a triplet of vectors; perhaps defining an orthogonal area or space ()
 - space   - A volume.... no relation to `counterspace`; other than values of counters in counterspace may represent or project-as points in a space.  This typically is intended to represent real space,
    but this is of course itself just a projection of real space into a counterspace.  To further clarify this `space` with no other qualifier.
    - points are contained in spaces.  Points in planes are 2 parameter vectors.  Vectors that relate to a location are points.
    - normal - a direction in space.  It is the difference from one point to another.
    - planes are contained in spaces.  They can be parametized several ways; usually its a point-normal 
    - surface - see plane.curve, but points are 3 parameter vectors...
    - bounding area - see plane.perimeter
    - volume - a set of all points contained by bounding area and on a surface.  (0 is within the volume); and again a surface has a thickness of 0, and does not contribute to the accumulated integrated space in the volume.
  - Matrix space - a counterspace where the metrics and operations are defined by multiplication of matricii.  (really this is an attribute of the unit, not that it's in a different counterspace from any other counter)
  - Quaternion space - a counterspace that operats on quaternions.
  - logQuat space - the space that represents the operations on log quaternions; (log-matrcii?).
  - Rectangular space - normal 3 dimensional space, in (x,y,z).  X is 'right' Y is 'up' and Z is 'forward'... when represeted with colors RGB -> XYZ map in order.  Instantaneous positions (events) are the X,Y and Z values applied to the tri-vector basis defining the space.
  - map - a translation function from one unit type to another.

## Notation


```

~ is used to denote equivalence but not equality; a similarity or congruency.

q is a quaternion; Q is a log-quaternion. 

N is a normal (vector)
V is a vector (of any unit type)
S is a scalar (vector)

these are suffixes to specify fields of a quaternion

?w  (as in Qw or qw )  is the W component of a 4-vector.
?n  (as in Qn or qn )  is the 'normal' of the quatnerion; normal of the plane the quaternion is in.
?xyz  (as in Qxyz or qxyz )  is also the normal
?x, ?y, ?z  (as in Qz )  is the single parameter in the vector.

|V|  is the length (unsigned distance); calculated as a sqrt( sum of squares ).
:V:  is the length (unsigned distance); calculated as the sum of :V parameters:


```
## More on Functions (which will deserve pages later)

[bijective](https://en.wikipedia.org/wiki/Function_(mathematics)) - a function that maps the input vector to an output vector that is determinstic and reversible such that every output can recover the input.

non-bijective.... (otherwise unspecified?)

implicit function is the reduced range of non-bijective cases that `F(v)=f(v)` where F() and f() are inverse functions; `(a+b)=arcsin(sin(a+b))` is another example with such a range.




## Conversion

```

# axis-angle to quaternion
q = cos(angle) + sin(angle)axis

# quaternion -> axis-angle
(An,Ax) = arccos(qw),qn/sin(arcos(qw)) 
(An,Ax) = arccos(qw),qn/sqrt(1-qw*qw)

# axis-angle to log-quaternion
Q = 0 + angle * axis

# log-quaterion ->axis-angle
(An,Ax) = |Q|, Qn/|Q|
(An,Ax) = Qw,Qn

(Notation for the math following will *likely* carry the angle 
in Qw and leave the normal unscaled; this allows a valid spin 
direction with 0 actual spin)


# quatnerion to log-quaternion
Q = ln(q) = ln(qw) + arccos(qw)qn

# log-quaternion to quaternion
q = exp(Q) = exp(Qw) * cos( |N| ) + sin( |N| )N 


```
## Considerations?  

Non-normalized Normals for log-quaternions serve merely to add an excentricity to the orbit. 
This can be maintained with a scalar vector associated with angle-axis.
Addition in normal quaternion space can result with eccentricity.


## Multiplication (Relative to operation in Matrix counterspace)

All rotation math written everywhere right now, is all based on a
concept of multiplication and matric representation with cross
and dot products representing a subset of multiplicative operations.


```
a * b = exp( ln(a) + ln(b) )   

# this might be an alternate representation
# but is confusing compared to 'e' in floating point numbers,
# or e the nil.
a * b = e^( ln(a) + ln(b) )

ln(exp(Q)) != exp(ln(q))

q * p ~ Q + P , because p * q != q * p


Q + P = P + Q;


q + p = R ; is a non-linear operation. result is a non-normal quaternion for any quaternion with a rotation.
this is only a valid operation within the mandelbrot boundary region of -2 ->1. 

  R = ln( exp(P) + exp(Q) )

    Qw = -cos(Pw) - cos( Qw )

    arccos( cos(Pw)+cos(Qw) ) + sin(Pw)*PN + sin(Qw)*QN 

	

       arccos( cos(Pw)+cos(Qw) ) + ( sin(Pw)*PN + sin(Qw)*QN ) / arcsin( sin( Pw ) + sin( Qw ) )
    if( cos(Pw) + cos(Qw) > 1 )  NaN
    else
        Rw = (π/2)-cos(Pw)-cos(Qw), sin(Pw)*PN + sin(Qw)*QN
	const sRw  = sin(Rw); // I know the real resulting angle; direction change is not a rotation.
	// scale the quaternion normal to remove the sin from the value...
	if( sRW ) {
		Rx = Rx * 1/sRw;
		Ry = Ry * 1/sRw;
		Rz = Rz * 1/sRw;
	} 
	// then, any remaining length needs to be converted to the scalar...
	const r  = Math.sqrt( Rx*Rx + Ry*Ry + Rz*Rz );
	RSx = r / Rx;
	Rx = Rx * r;
	RSy = r / Ry;
	Ry = Ry * r;
	RSz = r / Rz;
	Rz = Rz * r;


- -

sin(Pw)*PN + sin(Qw)*QN
        
sin(Pw)*PN = -sin(Qw)*QN
PN/QN + (1,1,1)*sin(Qw)/sin(Pw)
	



(dead link)https://www.geogebra.org/3d/ye9fxxzg



// !!! arccos( cos(x+cos(y))  (landscape ridges...)

if ( multiply two quaternions... )


  q = cos(a) + sin(a)(1,0,0)
  p = cos(b) + sin(b)(1,0,0)

  2 * q x p = ln(2) + Q+P

   (a + b) 


```


## Complex number reduction and testing

### Mandelbrot groundwork

[3D Graph of equations](https://www.geogebra.org/3d/a5dauj6s)    `cos^(-1)(cos(x) + cos(y)) = π/2 -cos(x) -cos(y);`; The graph is composed of several layers;  (quick summary, red-error, blue - composite of green, purple proposed solution, green - actual computations)
  1) Red - this is the error layer; or the difference between
  2) Blue - A composite of 'valid' ranges of `arccos(cos(a)+cos(b)`; uses `useA()`, `useR2`, `vz()` , and `mod2()` to compute domains to select from the Green layers.
  3) Green - 3 Layers; this is `arccos(cos(a)+cos(b))` shifted to cover the full range of possible values; cos(a)+cos(b) can be greater than 1 and less than -1, so arccos faults and returns NaN.
  4) Purple - Hypothetical equal graph.

A Mandelbrot is a recursive application of a complex number plus a second, constant complex number.  A Quaternion or Log Quaternion can represent a complex number with `y` and `z`
coordinates set to 0.  Axis normal is `x=1`.

```
F(0) = 0 + 0i;
F(X) = F(x-1)*F(x-1) + C;
```

This breaks down to the following sequence of operations...

``` 
// values of a, b, c, and d are expected to be valid raw coordinates
// for the complex function.

A = (a+bi);
B = (c+di);

r = A * A + B;

r = a^2 - b^2 + 2abi + (c+di);

r = a^2 - b^2 + ( 2ab + c + d )i;




R = ln( exp(A + A) + exp(B) )

R = ln( exp(2A)+exp(B) )

// convert into exp space for the '+'

E2A = exp(Aw*2) * cos(2A) + sin(2A)*S*i;
EB =  exp(Bw) * cos(B) + sin(B)*S*i;

    ( exp(Aw*2) * cos(2A) + exp(Bw) * cos(B) ) + ( sin(2A)+sin(B) )*S i

# figure cross product
#    eA*cA+eB*cB =0
#	eA*cA=-eB*cB eA/eB + cB/CA
	
    ( exp(2*Aw)/exp(Bw)  + cos(B) / cos(2A) ) + ( sin(2A)+sin(B) )*S i

    ( exp(2*Aw-Bw)  + cos(B) / cos(2A) ) + ( sin(2A)+sin(B) )*S i

     	
     


  ln( cos(x)+sin(x)i ) = xi

    
     (X+eX+Y+eY)i = ln( cos(X+eX+Y+eY)+sin(X+eX+Y+eY)i )


	e^(2a+c+d)i = cos(2a+c+d)



```

Angle-Axis ( semi-log-complex/log-quat )

```
a = 1 * cos(angle)
b = 1 * sin(angle)

# cos/sin is tangent...

Angle = atan2( a, b );
Scalar = b;
Axis = 1;

Qw = angle; (not a real log-quaternion)
QN = axis;
QS = Scalar;
```


## complex Add

```

	// e ^ (xi) = cos(x) + sin(x)i(jk)
	// e ^ i*pi  = 1
	// ix = ln(cos(x) + sin(x)i )

	// 1 / ( 1 + x^2 ) = 1/2( 1/(1-ix) + 1/ (1+ix) )
	// integral( dx/1+ax) = 1/a * ln(1+ax) + C

	a = cos(x), c = (cos(y), c = sin(x), d = sin(y);  
	(a+bi) + (c+di) = (a+c) + (b+d)i;  
	
	(a+c) = cos-1( cos(a) + cos(b) );  
	(a+c) =  π/2 -cos(a) -cos(b);
	
	ln(a+bi) = ln( a/cos(x) ) + (b/sin(x))i*(x/2); 
	ln(c+di) = ln( c/cos(y) ) + (d/sin(y))i*(y/2); 
	

    ln( (a+c) + (b+d)i ) ~  arccos(a+c) (angle); 
            ln( (a+c)/cos(a+c) ) + ( (b+d)/sin(a+c) * (a+c)/2)i






```	
	





## Complex Add (take 2)

Attempting to compute addition in exp space for ln natural...

```
R = ln( exp(A) + exp(B) )

// convert into exp space for the '+'

E2A = exp(Aw) * cos(A) + sin(A)*S*i;
EB =  exp(Bw) * cos(B) + sin(B)*S*i;

    ( exp(Aw) * cos(A) + exp(Bw) * cos(B) ) + ( sin(A)+sin(B) )*S i

 # figure cross product
 #    eA*cA+eB*cB =0
 #	eA*cA=-eB*cB eA/eB + cB/CA
	
    ( exp(Aw)/exp(Bw)  + cos(B) / cos(A) ) + ( sin(A)+sin(B) )*S i

    ( exp(Aw-Bw)  + cos(B) / cos(A) ) + ( sin(A)+sin(B) )*S i

   = a + ln(1+exp(b-a)) =      a + log1p(exp(b-a))   , which, if a >= b,
     
  ln( cos(x)+sin(x)i ) = xi

    
     (X+eX+Y+eY)i = ln( cos(X+eX+Y+eY)+sin(X+eX+Y+eY)i )


	e^(2a+c+d)i = cos(2a+c+d)


```

## `Sine Waves` Demo...

49+49+(49*4 -(2*49)*4 -47 ) (rotations)

https://d3x0r.github.io/

I already did that demo; one could say 'been there, done that, got the shirt, burned it...' they don't have an asymtoptic intersection even, there's no collision mechanics on rotation - so to speak.

Axis-Angle Representation (raw?)...

In reality, the rotation vector is x+y+z normalized to squares (because they're rotating squares; matrix application is applied to a sum of squares. )

See... sphereical barycentric mapping.

http://domino.mpi-inf.mpg.de/intranet/ag4/ag4publ.nsf/3561a79a83e6557ac1256b91004f4bdd/9144c5ff262d3f9cc12571be00348ddf/$FILE/paper.pdf


The normal length is the sum of the axels of rotation. ( ratio of rotation vs normal?  (least spin energy?)


```

The shape of the parameters to actually track matters.
A quaternion is itself a second order polynomial that acts on its prior state.
Every state between before and now is a single state based on the direction, 
so both forward and backward time is continuous; the previous state can always be considered as a delta from 'before' to here and from here into the future.

This is a linear feeling to the rotation itself....

f(x)=sin(x)

g(x,del) = f(x)-f(x-del)+f(x+del)


 sin(x/2)+sin(y/2)+2 sin(x) sin(y)e

which leads to dual sin numbers....


  
q = a+(bn + b0e)i

Q = ln(q) = ln(a) + arccos(a)/2 * (bn+b0e)i

A = ln(q) = ( S, arcsin( |bn| ); a/cos(arcsin(|bn|)), bn, b0e )
A = exp(Q) = (S=w, |bn|, bn/|bn|, b0e 

q0 = exp(Q) = exp(a) * cos( arccos(a)/2 * bn ) + sin( arccos(a)/2 * bn ) * (bn+b0e)i
q0a = exp(A) = S*cos(a) + sin(a)(bn+b0)i

Q0a = ln(A) = ln(S) + (a/2 * bn + a/2*b0)i;


```

## Mandelbrot

 - see log complex implementation in math/Zeta.js

The mandelbrot/julia set are a study in modulation of a constant spinning body with an acceleration applied.
In complex number representation, this is a truncated rotation space applying only the principle angle of the current velocity with a principle angle acceleration.
This set will require special modulo operations in order to 'properly' compute.

```
A = a + bi;
f(0) = 0 + 0i; // zero initial velocity; julia set updates the initial principle angle velocity.
f(x) = f(x-1) + A;


A = theta, R; // acceleration angle + R * wraps
F(0) = 0, 0; // julia updates this value.
F(0) = F(x-1) * 2 + aln( velocity angle )

```

aln(velocity angle) is the equivalent of taking a `ln(N)`, but is the base of `ln(Angle)`


Complex log = (theta,R,W) where theta = arctan(a,b), R = ln( sqrt(a*a+b*b) ) and W = 0;

Complex natural = (a,b) where a = exp(R)*cos(theta) + sin(theta);  // loses information.

add complex from log back to log




-------

So the full translation from lnComplex to Complex is

exp(A+Bli ) = /* sqrt(AA+BB) */ normAB * cos(B/2) 
            + /* sqrt(AA+BB) */ normAB * sin(B/2)
ln(A+Bi) = 

	const normR = Math.sqrt(A*A); // get normal of the real - velocity vector
	const normI = Math.sqrt(B*B /* +C*C+D*D */ ); // get normal of the imaginary - rotation axis

	// normalize real and imaginary parts.
	const normAB = Math.sign(A)*Math.sqrt(A*A+B*B);
	const normAB = Math.sign(A)*Math.sqrt( normI * normI + normQ * normQ ); // a square of 1... sin^2+cos^2 so I guess it's square.

	const angle = asin( B / normAB );
        this.w = normAB;  // A
        this.wR = normR;  // really I want to keep this
        this.wI = normI;  // really I want to keep this
        this.x = angle*2; // B
        this.y = 0;
        this.z = 0;
	return this 


--------

Basically the translation space should have free coodinates for the real(velocity)/imaginary(rotation) scalars... instead of a single 'w'

-------

Helical path = screw axis... (an accelaration application changes cuvrature over time; and the forward is helical.

--------

So dual-log-quaternions we get 
 - acceleration and curvature
   accel*||directionVector|| + spin*||curvature||

 - velocity and spin
   speed*||velocity|| * cos + sin * angle*||axis||

 - position and orientation
   po += po.speed_normal*vs.speed_normal  *vs*t + 1/2 po.angle_normal*vs.angle_normal ac*t^2



```

## Relativistic fields and EM together

1) so fields are inextricably linked and exist
2) relativistic contraction/time dialation causes magnetic field
3) magnetic flux is closed and doesn't leave a volume(?)

we have a motion..
1) 600km/s in a direction
2) 255km/s around the galaxy
3) 30km/s around the sun

a circle moving at a speed, in a circle moving at a different speed..

is the 600km/s including the galactic component?  No, because that was a known value that was subtracted... 

so we could be going 855km/s to 345km/sec  in a direction

so if electrostatic is THE thing (could probably frame it in the other term too, however...)
then a charge moving at a wire induces a field, the relative current in the wire (speed
of electrons) causes the proton part of the atom to be exposed; and the higher the current the more this exposure happens.  when a voltage potential driving a current is removed, the electron motion stops... and so unwinds the magnetic field; which is not nessecarily driving the current forward .... but the current does keep going forward.  The larger the magnetic field I can build from a small current, the larger the voltage output (moving electrons that ended up stopped)
but they don't collapse until the field is removed....

'pressure mediation' so-called by ken I suppose is more teh point of it.

magnetism only affects other things that have a charge and are moving.  (can be moved?)

delta M causes delta E
delta E causes delta M

+/- will be terrible notations for the above...

1) a changing magnetic field causes induction in another wire.
	1)  a changing moving charge field causes induction in another wire
	2) the induced current is in the opposite direction of the orignal current
	3) so in the stationary case, the moving electrons appear longer, and have a larger electric repulsion; this causes the electrons to want to spread out... as the charge wall moves forward, more negative are bunched up on the one side, and sent in the opposing side which is already charge defiicient.
		1) those that have a velocity in the same velocity as the original charges will feel that negative charge less (mutual length contraction) but then still should feel the positive more?  Sort of defeats the directionality of the field.
2) 

https://en.wikipedia.org/wiki/Lorentz_force

$$\displaystyle \mathbf {F} =q\,\mathbf {E} +q\,\mathbf {v} \times \mathbf {B} $$
The above has 'v' which is relativistic because V compared to what? (Turns out to be the B field itself)   Field formation in an abundance of electrons, which form a field, and constantly are collapsing, and re-forming new fields (around the source of the magnet)

As the magnet moves, the field moves with it... but does it?  Does it collapse and re-form?  If the magnet is moving at the speed of light, then won't it lose its magnetic properties?  Something like a curie-temperture but curie-speed.

https://en.wikipedia.org/wiki/Relativistic_electromagnetism

https://www.youtube.com/watch?v=Ii7rgIQawko# How Special Relativity Fixed Electromagnetism
https://www.youtube.com/watch?v=IWiY5kVw9U4 # Veritasium's 'How Special Relativity Makes Magnets Work' - EXPLAINED (better)


This supposes that the magnetic field doesn't already exist in a location, and wouldn't be detected...
our fastest satellites are only 


Two pancake coils separated by a half foot, still induction from electrostatic relativistics?  The fields from the electrostatic would be so blended there wouldn't literally be 


``` js

class observer {
	#velocity = new Vector();
	#position = new Vector();
	get distance( observer ) {
		return observer.#position.sub( this.#position );
	}
	get velocity( observer ) {
		return observer.#velocity.sub( this.#velocity );
	}
}

class charge extends observer {

	get electricField( observer ) {
		const velocity = observer.velocity( this );
		const direction = observer.distance( this );
		const speed = Math.sqrt( velocity.dot( velocity ) );
		// if speed > 2c ?
		if( velocity.dot(direction) < 0 ) {
			return (1+speed/c) / distance.dot(direction)
		} else {
			return (1-speed/c) / distance.dot(direction)
	}
	get magneticField( observer ) {
		return 1-electricField( observer );
		
		const speed = observer.speed( this );
		const distance = observer.distance( this );
		return (speed/c) / distance^2;
	}
	
}
```
1) charge.  speed

charge moving thorugh a magnetic field, will deflect until it's 90 degrees towards or away from the other.

electrons moving in an opposing direction then have extra strong electrostatic force 
