


v1,v2 are(or will be) unit vectors already... so rotating them they can end up on the same...

$(A,B)$  $(C,D)$

$(a,b)A$ $(c,d)B$    ;  $(a,b)=\frac{(A,B)}{|(A,B)|}$    $(c,d)= \frac{(C,D)}{|(C,D)|}$ $A=|(A,B)|$  $B=|(C,D)|$


$(ad * AB >bc * AB)=AB(ad>bc)=(  ad > bc )$


if( ad > bc ) s=1  else s=-1

$a = \cos(\alpha)$
$b = \sin(\alpha)$
$c=cos(\beta)$
$d=sin(\beta)$

cross product produces...

$cos(\alpha)sin(\beta) > sin(\alpha)cos(\beta)$

$cos(\alpha)sin(\beta) - sin(\alpha)cos(\beta) = x$


$\sin(a-b)=\sin a \cos b - \cos a \sin b$

$-\sin(\alpha-\beta)=+\cos \alpha \sin \beta -\sin \alpha \cos \beta$

$\sin( \beta-\alpha)$

dot product produces...

$cos(\alpha-\beta)$ or $cos(\beta-\alpha)$


dot product is (a,b)x(c,d) = (ac+bd)

$s*\sqrt{1-(db+ac)^2}*A*B = (ad-bc)*A*B$

- why isn't that 2 single values, like next is 3 single values?

(bd, ac)



$(A,B,C)$ $(D,E,F)$

$(a,b,c)A$ $(d,e,f)B$  ; $(a,b,c)=\frac{(A,B,C)}{|(A,B,C)|}$ ... $(d,e,f)=\frac{(D,E,F)}{|(D,E,F)|}$  $A={|(A,B,C)|}$ $B={|(D,E,F)|}$


if( BF > EC ) sx=1  else sz=-1

if( CD > FA ) sy=1  else sy=-1

if( AE > DB ) sz=1  else sz=-1

$sx*\sqrt{1-(be+cf)^2} *AB = (bf-ec)*AB$

$sy*\sqrt{1-(cf+ad)^2} *AB = (cd-fa)*AB$

$sz*\sqrt{1-(ad+be)^2}*AB = (ae-db)*AB$


(A,B,C,D) (E,F,G,H)

$(a,b,c,d)A$ $(e,f,g,h)B$  ; $(a,b,c,d)=\frac{(A,B,C,D)}{|(A,B,C,D)|}$ ... $(e,f,g,h)=\frac{(E,F,G,H)}{|(E,F,G,H)|}$  $A={|(A,B,C,D)|}$ $B={|(E,F,G,H)|}$

if( (DG,BH,CF) > (CH,DF,BG)  1  else -1

if( (AH,CE,DG) > (DE,AG,CH)  1  else -1

if( (BE,DF,AH) > (AF,BH,DE)  1  else -1

if( (CF,AG,BE) > (BG,CE,AF)  1  else -1


---

1) Vector A, B

1) project A into x,y,z
2) convert to A(x,y,z) unit vector and scalar
3) project B into x,y,z, rotate 90 degrees in plane of A and B...
4) convert to B(x,y,z) 

cross product (A,B) / (AB)

	(A - dot product(A,B) * A)

b = right
(0,y,z) * arcsin(x)

get 'up' 
``` js
	const s = Math.sin( q.θ ); // double angle sin
	const c1 = Math.cos( q.θ ); // sin/cos are the function of exp()
	const c = 1-c1;  // 2\sin\left(\frac{x}{\left(2\right)}\right)^{2}  2*sin(x/2)^2   2sin(x/2)sin(x/2)  (1-cos(2(x/2)))   or  \(-\cos ^{2}a+1\)
	const cn = c*q.ny;
	return new vectorType( 
	        -s*q.nz  + (1-c)*q.ny * q.nx
	       , c1      + (1-c)*q.ny * q.ny  //( c + (1-c)yy =  c +yy-cyy  =  c(1-yy)+yy
	       , s*q.nx  + (1-c)*q.ny * q.nz
	       );
```

\theta = arccos( up dot (B-(a dot b)A)))

rotate Q around right as an axis, by -\theta 

Q is perpendicular to the line/frame too to start... it's built from yz , x is 'right'


if( A dot resulting 'up' < 0 ) then rotate again by 180 (up=-up and forward=-forward, 
forward is the direction of the resulting cross product)




---

There's some other possible direction information maybe?

a direction vector... in 1D has nowhere to rotate to, and would always be identity.
A twist around that 1D line can be in its 1+1D without needing any other line... 
comparisons a+b, a-b, make sense to do...  on the rotation direction it's modulo 4.
modulo 4(q-turns) is 1 rotation, could be modulo 1(turns), or 2pi(radian) or 400(gradian);
0 1 2 3 ... `1` is 90 degrees like `1i` is 90 degrees and in binary 00, 01, 10, 11, the first two
are positive, the next two are negative.

2D now there's somewhere to turn from a point on the axis to the other axis, around a 
rotation axis which doesn't actually exist, and in the 3rd dimension is the new z axis.
and the plane is where z=0.  so cos( t ) = x direction  degrees around Z,  sin(t) = y direction

a=arccos(x) b=arcsin(y)

if( a > 0 && b > 0 ) a=a     b=b   a=b
if( a > 0 && b < 0 ) a=-a    b=b  a=b
if( a < 0 && b > 0 ) a=a     b=b+pi/2
if( a < 0 && b < 0 ) a=-a    b=b - pi/2

3D, (X,Y,Z) 
It's not this simple, because when unwinding the other angles... well no I can just do cos(x),...


---

so we want to have the frame that is aligned with right along the projection, up on the plane of projection, and forward becomes the cross.
but still - can have Y in the plane aligned in two directions which flips the Z correspondingly.

it's projected on a plane, so the original vectors are known...

(A.y,A.z,0)
(A.z,-A.y, 0)
(0,0,1)

(B.y,B.z,0)
(B.z,-B.y, 0)
(0,0,1)

t1 = arccos(A.y)  if( arcsin( A.z ) < 0 ) t1 = 2pi-t1;

t2 = arccos(B.y)  if( arcsin( B.z ) < 0 ) t2 = pi/2+2pi-t2; // perpendicular, so this is 'up'
   (A.x,A.y) dot ( cos(t2)B, sin(t2)B )

t3 = arccos(A.z)  if( arcsin( A.x ) < 0 ) t3 = -t3 or 2pi-t3;

t4 = arccos(B.z)  if( arcsin( B.x ) < 0 ) t4 = pi/2+-t4 or 2pi-t4; // perpendicular version
   (A.x,A.y) dot ( cos(t4)B, sin(t4)B )

t5 = arccos(A.x)  if( arcsin( A.y ) < 0 ) t5 = -t5 or 2pi-t5;

t6 = arccos(B.x)  if( arcsin( B.y ) < 0 ) t6 = pi/2+-t6; or 2pi-t6; // perpendicular version
   (A.x,A.y) dot ( cos(t6)B, sin(t6)B )
   
this becomes the dot product of the perpendicular and normal...
( )
( cos(t2-t1)AB, cos(t4-t3)AB, cos(t6-t5)AB )



(A.x, A.y, A.z, 0) 
(B.y, B.z, B.x, 0 )
(0,0,0,1)

3d cross( A,B )  = normal of plane of rotation (Z)
3d cross( Z, A )
3d cross( Z, B )


---

``` js
function cross3( A, B ) {
	const Al = A.length();
	const Bl = B.length();

	if( Al && Bl ) {

		const a = A.clone().multiplyScalar( 1/Al );	
		const b = B.clone().multiplyScalar( 1/Bl );		
	   
		const Q = new lnQuat();

		const l2 = (Math.abs(b.y)/*+abs(theta.y)*/+Math.abs(b.z));
		
		if( l2 ) {
			const l3 = Math.sqrt(b.x*b.x+b.y*b.y+b.z*b.z);
			//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );
			
			const tx = b.x /l3; // square normal
			const theta = Math.acos( tx ); // 1->-1 (angle from pole around this circle.
			const norm1 = Math.sqrt(b.y*b.y+b.z*b.z);
			// get square normal...
			Q.nx = 0;
			Q.ny = -b.z/norm1;
			Q.nz = b.y/norm1;

			Q.θ = theta;
			Q.x = 0;
			Q.y = Q.ny*theta;
			Q.z = Q.nz*theta;
			
			const up = Q.up(); // get whatever the resulting 'up' is for this 'right'

			// tx will only be from 0 to pi
			// sign is always positive from 0 to pi so sqrt can work.
			const s = Math.sqrt( 1-tx*tx); // Math.sin( Math.acos( tx ) ); // double angle sin
			const c1 = tx;//Math.cos( q.θ ); // sin/cos are the function of exp()
			const c = 1- c1;

			/*
				const vx = v.x , vy = v.y , vz = v.z, vw = v.w;;
				const dot =  ((qx * vx ) + (qy*vy)+(qz*vz)+(qw*qw));
				// vector from origin to V * cos (right * cos)
				// vector from origin to VxQ (Q is unit, V has length)
				//     this is the perpendicular in the plane defined by Q and V
				const c4 = cross4( q, v );
				target.set( (vx*c + (1-c)*qx * dot) + s*c4.x //(qy * vz - qz * vy)
				          , (vy*c + (1-c)*qy * dot) + s*c4.y //(qz * vx - qx * vz)
				          , (vz*c + (1-c)*qz * dot) + s*c4.z //(qx * vy - qy * vx) 
				          , (vw*c + (1-c)*qw * dot) + s*c4.w //( These are more complex terms than solved up to 3D ) 
			*/

			const cny = c*q.ny; // (1-Math.cos(q.θ))*q.ny * q
			const up = new vectorType(
			        -s*q.nz  + cny*q.nx
			       , c1      + cny*q.ny
			       , s*q.nx  + cny*q.nz
			       , ?       + cny*q.nw
			       );

			/*
			const cnx = c*q.nx; // (1-Math.cos(q.θ))*q.nx * q
			const right = new vectorType(
			         c1      + cnx*q.nx
			       , s*q.nz  + cnx*q.ny
			       ,-s*q.ny  + cnx*q.nz
			       , ?       + cnx*q.nw
			       );



			const cnz = c*q.nz; // (1-Math.cos(q.θ))*q.nz * q
			const forward = new vectorType(
			         s*q.ny  + cnz*q.nx
			       ,-s*q.nx  + cnz*q.ny
			       , c1      + cnz*q.nz
			       , ?       + cnz*q.nw
			       );

			const cnw = c*q.nw; // (1-Math.cos(q.θ))*q.nw * q
			const counter = new vectorType(
			         s*q.nz  + cnw*q.nx
			       , s*q.nx  + cnw*q.ny
			       ,-s*q.ny  + cnw*q.nz
			       , c1      + cnw*q.nw
			       );
			*/


			// need perpendicular to A in plane of A-B
			const cosAngle = a.dot( b );
			// (a.b)
			//const angle = Math.acos( cosAngle );
			const AprojectedOnB = b.clone().multiplyScalar( cosAngle * Al ).sub( A );
			// (b*(a.b) - A)
			//const BtoAPerp = B.clone().sub( AprojectedOnB );

			const unitBtoAPerp = AprojectedOnB.clone().multiplyScalar( -1/AprojectedOnB.length() );

			// (b*(a.b) - A) / -1/|(b*(a.b) - A)|    ; Bl*dot-Al

			// now we can find how much to turn around right
			// which is forward->up by an angle

			const upDotPerp = unitBtoAPerp.dot( up );

			// ( ((b*(a.b) - A) / -1/|(b*(a.b) - A)| ) . up )

			const angDotPerp = -Math.acos( upDotPerp );

			// Math.acos( ((b*(a.b) - A) / -1/|(b*(a.b) - A)| ) . up )

			const Q2 = new lnQuat( Q ); // clone Q
			let useQ = Q2;
			// this could be refactored with the known values to rotate with... 
			Q2.freeSpin( angDotPerp, b, 0 );

			//  Q.theta = acos( b.x );
			//  Q.nx = 0;
			//  Q.ny = -b.z;
			//  Q.nz = b.y;

			//  b dot Q is 0
			//  b cross Q is 1


			/*


	// A dot B   = cos( angle A->B )
	// cos( C/2 ) 
	//  cos(angle between the two rotation axii)
	const AdotB = 0;//(q.nx*ax + q.ny*ay + q.nz*az + q.nw*aw);

	// using sin(x+y)+sin(x-y)  expressions replaces multiplications with additions...
	// same sin/cos lookups sin(x),cos(x),sin(y),cos(y)  
	//   or sin(x+y),cos(x+y),sin(x-y),cos(x-y)
	const xmy = (+/-angDotPerp - theta)/2; // X - Y  ('x' 'm'inus 'y')
	const xpy = (+/-angDotPerp + theta)/2  // X + Y  ('x' 'p'lus 'y' )
	const cxmy = Math.cos(xmy);
	const cxpy = Math.cos(xpy);

	let ang = acos( cos(theta)cos(+/-angDotPerp) )*2;

	if( ang ) {
		const sxmy = Math.sin(xmy);
		const sxpy = Math.sin(xpy);
		// vector rotation is just...
		// when both are large, cross product is dominant (pi/2)
		const ss1 = sxmy + sxpy  // 2 cos(y) sin(x)
		const ss2 = sxpy - sxmy  // 2 cos(x) sin(y)
		const cc1 = cxmy - cxpy  // 2 sin(x) sin(y)

		//1/2 (B sin(a/2) cos(b/2) - A sin^2(b/2) + A cos^2(b/2))
		// the following expression is /2 (has to be normalized anyway keep 1 bit)
		// and is not normalized with sin of angle/2.
		const crsX = (b.y*b.y + b.z*b.z);
		const crsY = (-b.x*b.y);
		const crsZ = (-b.x*b.z);
		const Cx = ( (b.y*b.y + b.z*b.z) * cc1 +  b.x * ss1 + 0 * ss2 );
		const Cy = ( (-b.x*b.y) * cc1          +  b.y * ss1 + -b.z * ss2 );
		const Cz = ( (-b.x*b.z) * cc1          +  b.z * ss1 + b.y * ss2 );
		//const Cw = ( crsW * cc1          +  b.z * ss1 + b.y * ss2 );

		// this is NOT /sin(theta);  it is, but only in some ranges...
		const Clx = (lnQuat.sinNormal)
		          ?(1/(2*Math.sin( ang/2 )))
		          :1/Math.sqrt(Cx*Cx+Cy*Cy+Cz*Cz);
		q.rn = Clx; // I'd like to save this to see what the normal actually was
		q.θ  = ang;
		q.nx = Cx*Clx;
		q.ny = Cy*Clx;
		q.nz = Cz*Clx;

		q.x  = q.nx*ang;
		q.y  = q.ny*ang;
		q.z  = q.nz*ang;

		q.dirty = false;
	}

			const cny = c*Cx; // (1-Math.cos(q.θ))*q.ny * q
			const up = new vectorType(
			        -s*Cz    + (1-c1)*Cx*Cx
			       , c1      + (1-c1)*Cx*Cy
			       , s*Cx    + (1-c1)*Cx*Cz
			       );


			A.x* ( -s*( (-b.x*b.z) * cc1         +  b.z * ss1 + b.y * ss2 )     + c*( (b.y*b.y + b.z*b.z) * cc1 +  b.x * ss1 )*( (b.y*b.y + b.z*b.z) * cc1 +  b.x * ss1 + 0 * ss2 ) ) * Bl
			A.y* ( c1                                                           + c*( (b.y*b.y + b.z*b.z) * cc1 +  b.x * ss1 )*( (-b.x*b.y) * cc1          +  b.y * ss1 + -b.z * ss2 ) ) * Bl
			A.z* ( s*( (b.y*b.y + b.z*b.z) * cc1 +  b.x * ss1             )     + c*( (b.y*b.y + b.z*b.z) * cc1 +  b.x * ss1 )*( (-b.x*b.z) * cc1          +  b.z * ss1 + b.y * ss2 ) ) * Bl

		*/


			const up2 = Q2.up();
			// if the rotation didn't result on the target, then it's the inverse angle to rotate
			// or B should be small
			if( Math.abs(up2.x-unitBtoAPerp.x)+Math.abs(up2.y-unitBtoAPerp.y)+Math.abs(up2.z-unitBtoAPerp.z) > 0.000001 ) {
				const Q3 = new lnQuat( Q );
				Q3.freeSpin( -angDotPerp, b, 0 );
				useQ = Q3;
			}
			const up3 = useQ.up(); // this should be forward?
			const crossProduct = up3.dot( A ) * Bl;
			return crossProduct;

		} else {
			Q.nx = 0;
			Q.ny = b.x > 0?1:-1;
			Q.nz = 0;
		
			Q.x = 0;
			Q.y = 0;
			Q.z = 0;
		
			// the remining of this is update()
			Q.θ = 0;
			Q.dirty = false;
			
		}
	}
	return 0;
}

function dotcross4( A, B ) {
	return { x:cross3( new Vector3( A.w, A.z, A.y ), new Vector3( B.w, B.z, B.y ) )
	       , y:cross3( new Vector3( A.x, A.w, A.z ), new Vector3( B.x, B.w, B.z ) )
	       , z:cross3( new Vector3( A.y, A.x, A.w ), new Vector3( B.y, B.x, B.w ) )
	       , w:cross3( new Vector3( A.z, A.y, A.x ), new Vector3( B.x, B.y, B.x ) ) };
}


```






```js
	// normal conversion is linear.
	// rotates 'up' to point in the line's direction.
function setUp( A,B,C ) {
	const theta = {x:A, y:B, z:C};
	const l2 = (Math.abs(theta.x)/*+abs(theta.y)*/+Math.abs(theta.z));
	if( l2 ) {
		const l3 = Math.sqrt(theta.x*theta.x+theta.y*theta.y+theta.z*theta.z);
		//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );
		
		const ty = theta.y /l3; // square normal
		const cosTheta = acos( ty ); // 1->-1 (angle from pole around this circle.
		const norm1 = Math.sqrt(theta.x*theta.x+theta.z*theta.z);
		// get square normal...
		this.nx = theta.z/norm1;
		this.ny = 0;
		// this is a simple perpendicular
		this.nz = -theta.x/norm1;

		this.θ = cosTheta;							
		this.x = this.nx*cosTheta;
		this.y = this.ny*cosTheta;
		this.z = this.nz*cosTheta;
		
		if( twistDelta ) {
			// the frame has an implicit direction based on 
			// parallel transport from the frame at the pole around the great
			// circle tot his point.... can change the function of that
			// stepping.....
			yaw( this, twistDelta /*+ angle*/ );
		}
	} else {
		// up is UP, and there is no rotation
		// setup a default frame.
		this.nx = 0;
		this.ny = theta.y > 0?1:-1;
		this.nz = 0;
	
		this.x = 0;
		this.y = 0;
		this.z = 0;
	
		// the remining of this is update()
		this.θ = 0;
		this.dirty = false;
	}

```

``` js
up() {
			s = Math.sin( t*q.θ );
			c1 = Math.cos( t*q.θ );
			c = 1 - c1;
			return new vectorType(   ( xy() - wz() ),   c1 + yy(),      ( wx() + yz() ) );

	const q = this;
	const s = Math.sin( q.θ ); // double angle sin
	const c1 = Math.cos( q.θ ); // sin/cos are the function of exp()
	const c = 1- c1;
	const cn = c*q.ny;
	return new vectorType( 
	        -s*q.nz  + cn*q.nx
	       , c1      + cn*q.ny  //( c + (1-c)yy =  c +yy-cyy  =  c(1-yy)+yy
	       , s*q.nx  + cn*q.nz
	       );
}

```

```

a,A
a,A, b,B
a,A, b,B, c,C
a,A, b,B, c,C, d,D


dot product  # dot #   divide by length of each and will be 1
dot product ## dot ##  divided by length, then this is in a circle, and each is a 1, but 

directionally will result with sin(angle) angle = 0 +/-   

cos(angle) angle=0 when parallel = 1 and either side can't tell...?


dot product ### dot ### is again 0 +/- projection of sin (+90 -90)

dot product #### dot #### has the same rules?  


a       b
a,b     c,d
a,b,c   d,e,f


a,b,c   d,e,f

dot product is sin(theta)  cos(theta) 1 = 0; -1 = 180; 0 = 90

cross product is sin(theta) 1 = 90; -1 = -90; 0 = 0/180 (parallel the cross product is 0)

( sqrt(1-(a.yz*b.yz)^2), sqrt(1-(a.yz*b.yz)^2), sqrt(1-(a.yz*b.yz)^2) )

sqrt(1-(a.yz*b.yz)^2) = a.yb.z - a.zb.y

a = A/|A|
b = B/|B|

sqrt( 1 - (a.y*b.y) ) = aybz

sqrt(1-(a.y*b.y + a.z*b.z)^2) = a.yb.z - a.zb.y

3d cross product
( sqrt(1-(a.y*b.y + a.z*b.z)^2) = ?? /*a.yb.z - a.zb.y ;  parallel dot perpendicular */
, sqrt(1-(a.x*b.x + a.z*b.z)^2) = ?? /*a.xb.z - a.zb.x ;  parallel dot perpendicular */
, sqrt(1-(a.x*b.x + a.y*b.y)^2) = ?? /*a.xb.y - a.zb.y ;  parallel dot perpendicular */
)

correct value - invalid signs... the projection of one on the other is only the angle along up-to anti-along; the perpendicular
taken into the dot product is 0 for aligned, 1 for  perpendicular and 0 again for anti-aligned
although it does go to -1 if it's on the other side of the line - that is - the shortest path to align approaches 0 ; but could go the wrong way

I can do arccos( dot ) = angle between the two  from 1 to -1 and 0 = aligned
arcsin(dot) = 0 when parpendicular and angle toward aligned or anti-aligned is +1 and -1 respectively.

but that still doesn't get me 'side' - what is side in respect to though?
1) it's a shortness up to perpendicular, but greater than 90 degrees looks like less than 90 degrees
2) it's projected on the view angle to that plane - to get front/back

a little Y shape y ... sort of thing, the angle is to one side in the current configuration, where the long 
defined one angle and the short is offset - if it was turned around, then the cross product would be towards the other side
there's a rotation vector perpendicular to the surface of the Y around which the little arm has been turned... 
axis-angle can really only support positive angles, so this angle will always be a positive rotation by some amount.
but this would mean knowing that rotation vector already - when the cross product's result is that vector; and 
so the signs of the results have to be solved such that the dot products are all 0 at the end... 


A x B = 
R dot A and R dot B = 0

(Rx,Ry,Rz) dot (Ax,Ay,Az)


v1,v2 are unit vectors already... so rotating them they can end up on the same...

(A,B)  (C,D)
(a,b)A (c,d)B    ;  (a,b)= (A,B)/|(A,B)|    (c,d)= (C,D)/|(C,D)|

if( AD > BC ) s=1  else s=-1

s*sqrt(1-(ac+db)^2) *A*B = (ad-bc)*A*B


(A,B,C) (D,E,F)
(a,b,c)A (d,e,f)B  ; (a,b,c)=(A,B,C)/|(A,B,C)| ...

if( BF > EC ) sx=1  else sz=-1
if( CD > FA ) sy=1  else sy=-1
if( AE > DB ) sz=1  else sz=-1

sx*sqrt(1-(be+cf)^2) *A*B = (bf-ec)*A*B
sy*sqrt(1-(cf+ad)^2) *A*B = (cd-fa)*A*B
sz*sqrt(1-(ad+be)^2) *A*B = (ae-db)*A*B



(A,B,C,D) (E,F,G,H)
if( (DG,BH,CF) > (CH,DF,BG)  1  else -1
if( (AH,CE,DG) > (DE,AG,CH)  1  else -1
if( (BE,DF,AH) > (AF,BH,DE)  1  else -1
if( (CF,AG,BE) > (BG,CE,AF)  1  else -1



( G dot H ) / |G||H| = cos( between G and H )   acos() = angle between G->H

sin( angle ) ... sqrt(1-coscos) if( cos < 0 )   (0->90  1 to 0    0 to 1 (and to 0)  all positive sign



K/|K| or L/|L|

		const len = Math.sqrt( axis.x * axis.x + axis.y * axis.y + axis.z * axis.z );
		const qx = axis.x / len, qy = axis.y / len, qz = axis.z / len;
		// rodrigues full angle multiply
//		const c = Math.cos(angle*del);
//		const s = Math.sin(angle*del);

c = ( G dot H ) / |G||H|;
s = sqrt( 1- c*c );

		const vx = A , vy = B , vz = C;
		const dot = 0;// (1-c)*((qx * vx ) + (qy*vy)+(qz*vz));
		
		// this is yet another cross product to have to compute...
		// which are on 2 points to solve
		
		
		
		target.set( vx*c + s*(Ry * vz - Rz * vy) + 0//qx * dot
		          , vy*c + s*(Rz * vx - Rx * vz) + 0//qy * dot
		          , vz*c + s*(Rx * vy - Ry * vx) + 0//qz * dot 
		//          , D*c + s*(qx * vy - qy * vx) + qw * dot 
			);
			
		if( target === A ) {
		   return R
		} else return -R;


sqrt( 1 - (vyqy+vzqz)^2 ), sqrt( 1 - (vyqy+vzqz)^2 ), 




4d cross product is then:
( +/- sqrt(1-(a.w+b.w + a.y*b.y + a.z*b.z)^2)|A||B| = ?? /*a.yb.z - a.zb.y ;  parallel dot perpendicular */
, +/- sqrt(1-(a.w+b.w + a.x*b.x + a.z*b.z)^2)|A||B| 
, +/- sqrt(1-(a.w+b.w + a.y*b.y + a.x*b.x)^2)|A||B|
, +/- sqrt(1-(a.z+b.z + a.y*b.y + a.x*b.x)^2)|A||B| )


1- ayby^2 - 2ayazbybz - azbz^2 = aybz^2 - 2ayazbybz + azby^2

1- ayby^2 ~~- 2ayazbybz~~ - azbz^2 = aybz^2 ~~- 2ayazbybz~~ + azby^2

1 = ayby^2 + azbz^2 + aybz^2 + azby^2


1 = ayay ( byby + bzbz ) +azaz(byby + bzbz )
    (ayay + azaz)(byby+bzbz)
	
	ayaybyby ayaybzbz azazbyby azazbzbz
```