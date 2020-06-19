
# Log Math

So it looks like I need a reference sheet of the equivalent ln(q) functions for functions on q.

Quaternions are not themselves a 'thing'.  They are a projection or function of angle and axis.

Quaternion( theta, N ) generates a vector which can be operated on with standard quaternion math methods.

Natural Log Quatnerions are not themselves a 'thing'.  They are a projection or function of angle and axis.

A rotation matrix is a function of a Quatnerion... Matrix(Q); which can also be called the basis of the quaternion Q.  A basis is a vector of vectors representing the `forward`, `right` and `up` orientation either of the quaternion, or
a quaternion accumulator.

## Glossary
 - e - the empty set; as a scalar is >0;  as a vector is all parameters of the vector >0; it's the basis of 'dual numbers'.  It adds something that's really nothing. Other langugages might implement this as `NULL`, `undefined`, `null`, `false?`.
 - NaN - a value of a scalar which is not empty, but is not a real, complex, infinite or any other number;  A number without a prime factor of 1?  That is, `N / 1 != N`.
 - Scalar - a constant parameter; may also be `e`, `NaN`, or be a Function (not the result of a function).
 - Vector - a parameter set of scalar or vector values; parameters are names 'x', 'y', 'z', 'w', 'a', 'b',... to w...  (really there aren't very many parametric dimensions used)
    - Vectors contained within a vector may be recursive (self-referential), cyclic (indirectly self referential), constant
    - Vectors may contain functions; not just the results of functions
 - Function - an operation that operates on a vector, and results with a scalar or a vector.
 - integrated - summed into an accumulator; integrations are usually scalar values.  (similar to (superset of?) integrals and integration in calculus).
 - accumulator - A single variable which often starts at 0 and maintains a running sum of ... or calculation of a vector at a time;  This has also been called an 'event' is Clifford algebra, but may be the accumulation of multiple events. 
 - counterspace - This is vector containing all accumulators.  It's the space that is holding the counters.
 - 4-vector - a set of 4 parameters
 - 3-vector - a set of 3 parameters
 - normal  - planes are defined with a point and a normal.  The slope of the plane is just the normal, without a specific location.
 - plane   - A surface defined by a direction.   (May also be or contain) a flat surface represented with a bi-vector, specifically a right-bi-vector.
    - points are contained in planes.  Points in planes are 2 parameter vectors.  Vectors that relate to a location are points.
    - curve is a function or scalar that generates a related set of points; some curves can be projected to values which calculus can operate on.
        - curves may be open or closed, continuous or discrete, ...
    - perimeter - a closed curve.
    - area is a set of all points contained within and on a curve.  The points that are on the curve do not add to the area; the thickness of the perimeter around an area is 0.
 - bi-vector  - a pair of vectors; perhaps defining an orthoganal area or space (an origin and diagonal normal to the corner of the space is sufficent to define a cubical space)
 - space   - A volume.... no relation to `counterspace`; other than values of counters in counterspace may represent or project-as points in a space.
    - planes are contained in spaces.
    - points are contained in spaces.  Points in planes are 2 parameter vectors.  Vectors that relate to a location are points.
    - curves... 
    - surface - see plane.perimeter, but points are 3 parameter vectors...
    - volume - a set of all points contained by a surface and on a surface.  (0 is within the volume); and again a surface has a thickness of 0, and does not contribute to the accumulated integrated space in the volume.


## Notation

```



q is a quaternion; Q is a log-quaternion. 

N is a normal

these are suffixes to specify fields of a quaternion

?w  (as in Qw or qw )  is the W component of a 4-vector.
?n  (as in Qn or qn )  is the 'normal' of the quatnerion; normal of the plane the quaternion is in.
?xyz  (as in Qxyz or qxyz )  is also the normal
?x, ?y, ?z  (as in Qz )  is the single parameter in the vector.

## Conversion

```
Q = ln(q) = ln(qw) + arccos(qw)qn


## Multiplication	