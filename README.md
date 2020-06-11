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

## Frame Computation Using Dual Log-Quaternions

I've come to relearn much about the quatnerions and complex numbers especially with applications to rotation.
Quaternions have a natrual logarithm function, and a exp.  So many places stress so very much that the order
of multiplication matter; however, there's a note that the quaternions are also unit-quaternion or normalized in
the process of calculation.  So the reciprical of a unit-quaternion is also the conjugate; so the order or multiplying `pq` vs `qp` 
is just a matter of applying a negative sign.  Even in the non-logarithmic form, the calculation to apply a quaternion
for a calculation and involves cross products, such that `A x B  !=  B x A` which is true, but `A x B == -B X A`.  This helps
identify how order remains in the log-quatnerion space.  

Given two logrithmic quaternions(LQ) `LP` and `LQ`, and their equivalent base forms `P` and `Q`,   The multiplication of `P * Q` is
`LP + LQ` OR `LQ + LP` because addition is commutative;  However the multiplication of `Q * P` is also `Q / P` (since the conjugate is also the recipricol), 
so this is a subtraction of logs `lQ - lP`.  If the multiplication terms are switched, the same order 
of operations is preserved in addition of LQ by flipping the sign appropriately.  Probably the above is better expressed
if the parital -- and ---- signs were shown...  Addition is probably `(--lP) - (-lQ)`... (which doesn't reverse ... just becomes -lp - lq which isn't right either.

`PQ = e^lP * e^lQ = e^(lP+lQ)`

`QP = e^lQ * e^lP = e^(lQ-lP)`


### Hypothetical failure case

An IK chain is setup with just a few links, a foot, a body and a couple segments; preferably the segments have rigid bend constraint.  The full calculation carried down the chain results in 
a resulting rotation of 1 degrees; although the total sum of inputs to that is 361 degrees; so to feed 1 back down the chain as the target rotation distorts the motion that the joints up to
that point are 'expected' to do; if the full chain of calculation is calculated in quaternion space.  (And really the limits break at 1/2 of a full rotation)

Log quaternions are the input angle to the sin/cos functions that limit the bounds of quaternions.  This means that the log quaternion can represent total rotations greater than 360 degrees,
and be simply manipulated with addition and subtraction.  (721 degrees is the same sin as 1 degree, but obviously the net motion of 720 is much greater than 1).

## SLERP Comparison

This engine will use lnQuats as the native computation; this lets the engine always directly linearly scale in a spherical path and then expoenentiate
only when applied; in comparison SLERP does `lnQuat.exp( Quat.log() + delta )`, where the same SLERP on lnQuat is just `lnQuat + delta`.


## Computation overhead introduced vs matricii

The dual log quaternion has to be applied to the dual part, to rotate the projected origin into its own space.   This is 

```
	(translation update)
 24 mul  14 adds  +1 sqrt  + 1 sin  +( 1 cos or  
	sin/cos value are for the same angle, so it can be calated at the same time)
-or-
 18 mul  4        +1 sqrt  + 1 sin  +( 1 cos or 
	sin/cos value are for the same angle, so it can be calated at the same time) (parallel-ish)


 + 1 4 value add for application of rotation  (orientation update) 

// (in a chain, one additional calculation)
// + 1 4 value add for origin adjust from basis origin

 storage 8 values  (4 + 4)  (can truncate to 3 and 3; w is always 0; in both vectors)

```

operation counts for applying a matrix to another matrix.

```
  matrix * dual part (translation update)
 18 mul 6 adds

  matrix * matrix part (orientation update)
 18 mul 6 adds


// 1 add for origin adjust from basis origin

36 multiply and 12 adds
(vs 27 and 14)

 storage 16(12) values (9 + 3)   usually sent as 4x4 or 3x3 and 3.

```


overhead compared to dual-quaterion

```
  origin apply  (translation)
   18 multiply and 12 adds

  quat * quat   (orienatation)
    32 multiply and 12 adds 


50 vs 27 multiplies  and   24 vs 14 adds (nearly half the work)
  
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
| add | (v) | add a vector to this one; update in-place.

| Quat Methods | Parameters | Description |
|---|---|---|
| mul | (q) | multiply this quaternion with another quaternion; result with a new Quat().
| add | (q) | add passed quaternion to this quaternion.
| addNew | (q) | add passed quaternion to this quaternion, return a new Quat().
| apply | (v) | apply rotation to vector parameter, result with a new vector.
| applyInv | (v) | 'unapply' or apply the quaternion inversed to translate point from quaternion space.
| log | () | return this quaternion as the natural log of this quaternion.  Returns a new lnQuat().
| getBasis | () | return { forward, right, up } object with 3 vectors and the related scalar direction vectors.  (Is also the rotation Matrix)


| lnQuat Methods | Parameters | Description |
|---|---|---|
| add | (q) | add passed quaternion to this quaternion.
| addNew | (q) | add passed quaternion to this quaternion, return a new lnQuat().
| apply | (v) | apply rotation to vector parameter, result with a new vector.
| applyInv | (v) | 'unapply' or apply the quaternion inversed to translate point from quaternion space.
| exp | () | return this log-quaternion as the natural map of this quaternion.  Returns a new Quat().
| getBasis | () | return { forward, right, up } object with 3 vectors and the related scalar direction vectors.  (Is also the rotation Matrix)

| dlnQuat Methods | Parameters | Description |
|---|---|---|
| apply | (v) | apply rotation and offset to vector parameter, result with a new vector.
| applyInv | (v) | 'unapply' or apply the dual-log-quaternion inversed to translate point from quaternion space.
| getBasis | () | return { forward, right, up } object with 3 vectors and the related scalar direction vectors.  (Is also the rotation Matrix)


## Rotation limits

If we consider the speed of light achievable, 1 half rotation per nano second is a reasonable maximum.  

This is 3B RPM is the maximum rotation rate.  This turns out to be a 1 rotation at 1dm is the speed of light.


## Quaternion rotation points

1) ln(q) = angle(s) and length.

add vectors instead of multiply.




## References

quaternion expoentiation mapping
https://www.youtube.com/watch?v=UHzAY5Q7ji0

https://www.ljll.math.upmc.fr/perronnet/delaunay3d/delaunay3d.html


[(FPGA lnQuat adder)](http://www.acsel-lab.com/arithmetic/arith20/papers/ARITH20_Arnold.pdf) // logrithm quaternion adoptations.

[Practical Exponential Coordinates using Implicit Dual Quaternions (still not a log system)](http://www.neil.dantam.name/papers/dantam2018practical.pdf)

[Quaternions  (long list of general formulas gathered)](https://maxime-tournier.github.io/notes/quaternions.html#interpolation)


https://en.wikipedia.org/wiki/Quaternion (especially exponentiation)


https://parasol.tamu.edu/wafr/wafr2018/ppr_files/WAFR_2018_paper_1.pdf  (dual quatnerions; recommend calculation of separate things)

https://en.wikipedia.org/wiki/Natural_logarithm (bottom of page, complex number extension, graph of abs(ln(x+yi)) = high speed break of record hydraulic press channel. (30,000 RPM!)

https://www.euclideanspace.com/maths/algebra/realNormedAlgebra/other/dualNumbers/functions/index.htm (only exp)

http://new.math.uiuc.edu/math198/MA198-2014/rgandre2/seminar.pdf (exp and ln)

```
// dual exp and ln
a+be.. exp(a+be) = exp(a) + exp(a)* b * e

log(a+be) = log(a) + ( b / a ) e

```

[Example Java Code](https://math.stackexchange.com/questions/939229/unit-quaternion-to-a-scalar-power)


[Pose consensus based on dual quaternion algebra with application to decentralized formation control of mobile manipulators (Log- dual-quaternion)](https://arxiv.org/pdf/1810.08871.pdf)


https://pdf.sciencedirectassets.com/272578/1-s2.0-S0022247X12X00039/1-s2.0-S0022247X12000327/main.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjELT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIFXsRUeP8AoqeUAwYp36FLtfbjOv%2B0FKRO%2BYkTD4VRTwAiEA2viZWfw5uLjaDhvrrM8ghkviwL8FYvWUm%2Fb4nLXn7HQqtAMILRADGgwwNTkwMDM1NDY4NjUiDO46yavyZj6sONraryqRA9btRhy55GL%2FSZPlQcXnt3WhdYfbKLGxOElO50AWJSe65MPtTkwm63s%2Fg7RM5pKoTibzoR2KmWhrkI%2Fc4oISa03Z66sZ8%2FmywOya4heVoj%2BG4hmmvy8XisIWdPheDjmcCBxlnDzq72nzNN9ZyzXQGU73ngc8wZ8uv6xD7XUhd%2BgiDoOEPd9Mw8lZUIZoDDYtdcu6ILBsAJOTdVK5NsVCiKwLUOfSdE0wUWSa7tHn0GYbpku26szG5mQjgaSaNA%2Fsy1Dkb6Vt0G%2B634udep0sasmsp7I%2FBUcgDUngbM%2Fm6RtBC8EL7YNb8AlFpWtsXi%2F452NCjEdhT3vmJFYEXAyyjODDsb2MmitjiS5FxGXsODqhgS96BOwqJY%2BuUsZZUDC3Z2CYwWPGrKgAnIo4wu9svpELg%2BAMJ0XtMgVu3LPtlZ0J9L9oit6ncp2HM088NTlVw3sxIk%2FkQhd6SOgqpZZJW95QGB5t2ckZu43lnIQuDlQfKB4L4I4fWM3Qenb%2FaG4BtZs4nV6y8YcxOh%2B2W8ZT0dukMJuPg%2FcFOusBLrVCipWtDgP8EOJewmZBG%2FQg3J3FDbG%2BgeC9%2B7t3PNqx7KXb2%2Fw57FSZNW4C9uATQC%2FVYndMK5IKBKJLt7m1oYbR9BYnLuiRkOFctLmDRfHOdShER0J78CepTtob8Y%2BrtyvLEDffUiZLqwHRQfqWVhHGq03sLYqFPUSzVsKhJZMgzmG9p2aHO0lmhRCY7qd5%2FMKQ4cJhIJSaPHoYUFNG1zacEIyxd8Xz5hPynHbmFM02raSqY6pGUtirCka5HuKUhFDn2aHd3YCJrig7zjf6ipC0iaQyT%2FRXlqbTRKHu4scqxobX6pYkGk5WNw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200610T123533Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3PHCVTYZP7ZFTOH%2F20200610%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=360a699df9819bf6d1ece33ec01ad9bd9b094733a05269aa3610f20e21e79999&hash=1251a1a2cc47f4217eee1b412fc936866c56342193e6eaeb1939c124af64b815&host=68042c943591013ac2b2430a89b270f6af2c76d8dfd086a07176afe7c76c2c61&pii=S0022247X12000327&tid=spdf-0f31c464-c476-4d00-88aa-a2ca3b588b01&sid=c16a6b152ec8a14cce585b23aa95383e709dgxrqa&type=client

ln dq = 

dual O   Oe + e0e   O^ = O  *O^ = Oe

O^ unchanged  real O part
1/0 

V is angle of rotation total 
thetaHat = v + de;



--

### Internal source notes

```



qAC = qAB (cr) qBC

PQ = pq = -p . q + p x q;
  (dot) (cross)
  

QP = 

xy=x×y-xTy

xy =cross(x,y) - xT * y;

conjugate

w = w;
x = -x;
y = -y;
z = -z;

q1 q2 =  w1 w2   - v1 dot v2, w1 v2 + w2 v1 + v1 cross v2 

pq = ... well pq
qp = (pq)*

{\displaystyle {\begin{alignedat}{4}&a_{1}a_{2}&&+a_{1}b_{2}i&&+a_{1}c_{2}j&&+a_{1}d_{2}k\\{}+{}&b_{1}a_{2}i&&+b_{1}b_{2}i^{2}&&+b_{1}c_{2}ij&&+b_{1}d_{2}ik\\{}+{}&c_{1}a_{2}j&&+c_{1}b_{2}ji&&+c_{1}c_{2}j^{2}&&+c_{1}d_{2}jk\\{}+{}&d_{1}a_{2}k&&+d_{1}b_{2}ki&&+d_{1}c_{2}kj&&+d_{1}d_{2}k^{2}\end{alignedat}}}


	The conjugate of a product of two quaternions is the product of the conjugates 
	in the reverse order. That is, if p and q are quaternions, 
	then (pq)* = q*p*, not p*q*.   qp = 
	 
	 q* = -1/2 ( q + iqi + jqj + kqk )
	 

The conjugation of a quaternion, in stark contrast to the complex setting, can be expressed with 
multiplication and addition of quaternions:
http://graphics.stanford.edu/courses/cs348a-17-winter/Papers/quaternion.pdf

, Q¯0 = Q00 + Q01i and  Q¯1 = Q10 + Q11i,


Q = Q¯0 + Q¯1j (18)
= (Q00 + Q01i)+(Q10 + Q11i)j (19)
= Q00 + Q01i + Q10j + Q11k



log(theta,n)=theta n
Thus, when defined, the derivative of the logarithm satisfies:

dlog(theta,n)=dtheta n+ thetadn



q* = -1/2 ( q + iqi + jqj + kqk )

q*.x = -1/2 ( q.x + (-q.x + q.yji + q.zki) + (q.xji -q.y + q.zjk ) + ( q.xki + q.ykj - q.z ) )

                 q.xji + q.yji   
		 q.zki + q.xki
		 q.yjk + q.zjk


```