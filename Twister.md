 - this is a general scribble... an attempt to format/document 'yaw' sort of function....


# Twist

This is really a general purpose rotation of a rotation around some axis...
the axis and be external to the rotation, have the rotation being rotated applied 
to make the axis local to that rotation first, the rotation's own basis frame can
be used as `pitch`,`yaw`, `roll` vectors; there are routines with those lookups
hard coded (simplifies a few of the calculations).


## Yaw around the fixed normal.

The object `q` has the following fields
 - `(x,y,z)` raw coordinates
 - `nL` (normal-linear): `|x|+|y|+|z|` 
 - `nR` (normal-rectangular): `sqrt(x*x+y*y+z*z)`
 - `qw` : `cos(nL/2)`
 - `s` : `sin(nL/2)`
 - `(nx,ny,z)` : `(x,y,z)/nR`.

`qw` is named that, because `cos(theta/2)` is the unit-quaternion `w` component of the quaternion which is `exp(lnQ)`.


``` js
// C is some angle-angle-angle quaternion, th is the angle to turn around it's normal(up)...
function yaw( q, th ) {
```

---

This can be replaced with some other axis; this `yaw()` routine computes the current `normal` from
the current log-quaternion.

This computes the basis 'up' vector for the current angle-angle-angle rotation.  `nx`, `ny`, `nz` are
the square normal components. These factors are mostly copied from `getBasis()` method, although
a few operations can be dropped... most of the work still has to be done.  Matrix representation
would already have these, so rotation one angle to another is approximately the same; but none of this
is required for the general case of an external axis being specified...

``` js

	const s = Math.sin( q.θ ); // double angle sin
	const c1 = Math.cos( q.θ ); // sin/cos are the function of exp()
	const c = 1- c1;

	const cny = c * q.ny;

```

---

Here, `ax`, `ay`, and `az` could be filled by any axis, and normalized.
This completes the computation of the 'up' normal into `ax`, `ay`, and `az`.  This vector is normalized.

``` js
	// ax, ay, az could be given; these are computed as the source quaternion normal
	const ax = ( cny*q.nx ) - s*q.nz;
	const ay = ( cny*q.ny ) + c1;
	const az = ( cny*q.nz ) + s*q.nx;
```

dot product of the axles of rotation, and compute the new resulting angle; which is like
cos(original Quatnerion overall angle + twist angle) ... the dot product on the sin product
skews the result to the imaginary direction... 

https://www.geogebra.org/3d/pwjdwzrz This graph has `arccos( cos(x)cos(y)-sin(x)sin(y)*B )` where B is a slider
represending `A dot B` operation below. the result is always within +/-pi;

``` js
	const ac = Math.cos( th );
	const as = Math.cos( th );
	// A dot B   = cos( angle A->B )
	const AdB = q.nx*ax + q.ny*ay + q.nz*az;
	// cos( C/2 ) 
	const cosCo2 = q.qw*ac - q.s*as*AdB;

	// this is approximately like cos(a+b), but scales to another diagonal
	// that's more like cos(a-b) depending on the cos(angle between rotation axles)
	let ang = acos( cosCo2 )*2;

```



Compute the output axis of rotation cross product of the axles... and sin(a+b) sort of scalar 
plus part of cos(a+b)



``` js
	const Cx = as * q.qw * ax + q.s * ac * q.nx + q.s*as*(ay*q.nz-az*q.ny);
	const Cy = as * q.qw * ay + q.s * ac * q.ny + q.s*as*(az*q.nx-ax*q.nz);
	const Cz = as * q.qw * az + q.s * ac * q.nz + q.s*as*(ax*q.ny-ay*q.nx);
```



Use the computed angle and get the sin(a/2) to normalize the vector part...
this is the same value as `sqrt(Cx*Cx+Cy*Cy+Cz*Cz)`.  `Clx` is the linear
sum scalat times the angle to result with the proper angle-angle-angle values.

``` js

	const sAng = Math.sin(ang/2); // same as sqrt(xx+yy+zz)
	
	const Clx = sAng*(Math.abs(Cx/sAng)+Math.abs(Cy/sAng)+Math.abs(Cz/sAng));
```


finally, update the current quaternion with the computed axis and angle.

``` js

	C.nL = ang/2;
	C.nR = sAng/Clx*ang;
	// cos() and sin()
	C.qw = cosCo2;
	C.s = sAng;
	// normal - axle of rotation
	C.nx = Cx/sAng;
	C.ny = Cy/sAng;
	C.nz = Cz/sAng;
	C.dirty = false;

	// angle angle angle
	C.x = Cx/Clx*ang;
	C.y = Cy/Clx*ang;
	C.z = Cz/Clx*ang;

	return C;

}
```


## Optional angle fixup

This isn't required, but is something that can be done as application desires.  Before having a stable method to do
the cross product of two lnQuats, this was used to artificially pad the range to see the full graph.
Apply angle-fixup code so the result is in the expected range. This can cause a jump in octaves.

``` js
	let fix = ( ang-(nt+th))
	while( fix < -Math.PI*4 ){
		ang += Math.PI*4;
		fix += Math.PI*2;
	}
```
