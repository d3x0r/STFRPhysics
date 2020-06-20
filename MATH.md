
# Log Math

So it looks like I need a reference sheet of the equivalent ln(q) functions for functions on q.


This only considers the subset of log quaternions that have a 0 real value, such that `exp(0) = 1`, and always generate a unit quaternion as a result.

Quaternions are not themselves a thing.  They are a projection or function of angle and axis.  Quaternions are not reversible to their projection (within finite precision represenations); except in a small range around 0 (unit quaternions).  If f(q)+g(p) > 1 information is lost; 
this 'irrersability' can be avoided by defering evalution of the non-bijective functions especially those that have implicit functions.
Multiplication of quaternions results in a quaternion in a priniciple angle position; and is non-bijective such that `|A X B| != |B X A|` and has no implicit function.

`quaternion( theta, N )` generates a vector which can be operated on with standard quaternion math methods; with a finite numeric representation of math functions.

Natural log quatnerions are not themselves a thing.  `Q(theta,N)`... They are a projection or function of angle and axis.
Is not reversible when the rotation approaches 0 (again, within finite precision represention); there is the exception
if the evalution of the scalars of the log-quternion are able to be defered, it is reversible. Addition of log quaternions 
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
 - bi-vector  - a pair of vectors; perhaps defining an orthoganal area or space (an origin and diagonal normal to the corner of the space is sufficent to define a cubical space)
 - bi-vector  - a triplet of vectors; perhaps defining an orthoganal area or space ()
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
	



https://www.geogebra.org/3d/ye9fxxzg



// !!! arccos( cos(x+cos(y))  (landscape ridges...)

if ( multiply two quaternions... )


  q = cos(a) + sin(a)(1,0,0)
  p = cos(b) + sin(b)(1,0,0)

  2 * q x p = ln(2) + Q+P

   (a + b) 


```

