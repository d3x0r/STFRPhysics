


This paper needs to be updated; there were some minor simplifications made later.

The math is given in latex format here:

http://mathb.in/51333

# Euler Axis System

from https://en.wikipedia.org/wiki/Euler%27s_rotation_theorem

```
  The theorem is named after Leonhard Euler, who proved it in 1775 by means of spherical geometry. 
  The axis of rotation is known as an Euler axis, typically represented by a unit vector ê (e hat). Its 
  product by the rotation angle is known as an axis-angle vector. The extension of the theorem 
  to kinematics yields the concept of instant axis of rotation, a line of fixed points.
```

## Notation

```
    A ∙ B   indicates dot product
    A × B   indicates cross product
```

## Get Basis Matrix

``` glsl
mat3 q_to_basis( vec3 q ) {

	float th = sqrt( q*q )
	vec3 a = q/th;

	float s,c;
	sincos( th, s, c );
	float c1 = 1-c;

	vec3 ca = c1*a;
	// mixed product, not cross...
	// used as a common basis to add/subtract from
	vec3 yzxzxy = { ca.y*a.z, ca.z*a.x, ca.x*a.y };
	vec3 sa = s*a;
	vec3 xxyyzz = ca*a;
	vec3 spx = yzxzxy + sa;
	vec3 smx = yzxzxy - sa;
	mat3 basis = { { c+xxyyzz.x, smx.z,      spx.y }
	             , { spx.z,      c+xxyyzz.y, smx.x }
	             , { smx.y,      spx.x,      c+xxyyzz.z } };

	return basis;	

}

```
$$q=\begin{bmatrix}x \\ y \\ z\end{bmatrix}$$

$$ \theta = \sqrt{q\cdot q}$$

$$ \begin{matrix} a = \frac{q}{\theta} & \begin{bmatrix}\frac{x}{\theta}\\ \frac{y}{\theta} \\ \frac{z}{\theta} \end{bmatrix}\end{matrix}$$

$$ \vec{ca} =(1-\cos\left(\theta\right))  a $$

$$\vec{sa} =\sin(\theta)a$$

$$\begin{matrix}\vec{xxyyzz}=ca * a & | & \begin{bmatrix}\frac{(1-\cos\left(\theta\right))xx}{\theta\theta}\\ \frac{(1-\cos\left(\theta\right))yy}{\theta\theta} \\ \frac{(1-\cos\left(\theta\right))zz}{\theta\theta} \end{bmatrix} \end{matrix}$$

(not sure why the following is broken)

$$\begin{matrix}\vec{xyz} = (ca.y*a.z, ca.z*a.x, ca.x*a.y) & | & \begin{bmatrix} (1-\cos\left(\theta\right))\frac{yz}{\theta\theta} \\ (1-\cos\left(\theta\right))\frac{zx}{\theta\theta} \\ (1-\cos\left(\theta\right))\frac{xy}{\theta\theta} \\  \end{bmatrix} \end{matrix}$$

$$\begin{matrix}\vec{xyz} + \vec{sa} &|& \begin{bmatrix} (1-\cos\left(\theta\right))\frac{yz}{\theta\theta} + \sin(\theta)\frac{x}{\theta} \\
(1-\cos\left(\theta\right))\frac{zx}{\theta\theta} + \sin(\theta)\frac{y}{\theta} \\
(1-\cos\left(\theta\right))\frac{xy}{\theta\theta} + \sin(\theta)\frac{z}{\theta} \\
\end{bmatrix} \end{matrix}$$

$$\begin{matrix}\vec{xyz} - \vec{sa}&| & \begin{bmatrix} (1-\cos\left(\theta\right))\frac{yz}{\theta\theta} - \sin(\theta)\frac{x}{\theta} \\
(1-\cos\left(\theta\right))\frac{zx}{\theta\theta} - \sin(\theta)\frac{y}{\theta} \\
(1-\cos\left(\theta\right))\frac{xy}{\theta\theta} - \sin(\theta)\frac{z}{\theta} \\
\end{bmatrix} \end{matrix}$$

### Final Matrix output

$$
 \begin{bmatrix} 
 \cos(\theta)- \frac{(1-\cos\left(\theta\right))xx}{\theta\theta} & (1-\cos\left(\theta\right))\frac{xy}{\theta\theta} - \sin(\theta)\frac{z}{\theta}& (1-\cos\left(\theta\right))\frac{zx}{\theta\theta} + \sin(\theta)\frac{y}{\theta} \\
 (1-\cos\left(\theta\right))\frac{xy}{\theta\theta} + \sin(\theta)\frac{z}{\theta}& \cos(\theta)- \frac{(1-\cos\left(\theta\right))yy}{\theta\theta} &(1-\cos\left(\theta\right))\frac{yz}{\theta\theta} - \sin(\theta)\frac{x}{\theta}  \\
 (1-\cos\left(\theta\right))\frac{zx}{\theta\theta} - \sin(\theta)\frac{y}{\theta} &(1-\cos\left(\theta\right))\frac{yz}{\theta\theta} + \sin(\theta)\frac{x}{\theta} &\cos(\theta)- \frac{(1-\cos\left(\theta\right))zz}{\theta\theta}
 \end{bmatrix}
$$




## Rotating a Rotation(A RRF B)

The Rodrigues Rotation Formula may be used with axis-angle representation to compose multiple rotations, 
and result with axis and angle.

https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Rodrigues_vector
https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation#The_composition_of_spatial_rotations


Given input axes A and B and angles a and b respectively...	the following rotates A around B.


  $\theta = 2 \cos^-1 \left( \cos(b/2)\cos(a/2)-\sin(b/2)\sin(a/2) ( A \cdot B ) \right)$
  
  $$\begin{array}{ll} tmp_{axis}& = \sin(b/2)\cos(b/2)B \\
          & + \sin(a/2)\cos(b/2)A \\
          & + \sin(a/2)\sin(b/2)( A \times B ) \\
  result_{axis} = \frac {tmp_{axis} }{ |tmp_{axis}| } \end{array}\\
  $$
  
  
  - or -


  $result Angle = cos^-1 ( 1/2 ((1 - A ∙ B) cos((a - b)/2) + (1 + A ∙ B) cos((a + b)/2)) ) * 2$
  
    - this version of the axis computation has a (* 1/2), but since it's being 
      normalized anyway, can skip the multiplication by a constant
      
  $$\begin{array}{ll}tmp_axis = (-sin((a - b)/2) + sin((a + b)/2)) B 
           + ( sin((a - b)/2) + sin((a + b)/2)) A 
           + ( cos((a - b)/2) - cos((a + b)/2))( A × B ) )
  
  result_axis = tmp_axis / ||tmp_axis||
  \end{array}$$

cos(x/2),sin(x/2) = cos(y/2),sin(y/2)

Rotates a rotation $\vec{b}$ and rotates around $\vec{a}$ 

$$x=|\vec{a}|; y=|\vec{b}|$$

$$A=\frac{\vec{a}}{|\vec{a}|} $$

$$B=\frac{\vec{b}}{|\vec{b}|} $$ 

$${sxpy}=\sin( \frac{x+y}{2} )$$

$${sxmy}=\sin(\frac{x-y}{2}) $$

$${cxpy}=\cos( \frac{x+y}{2} )$$

$${cxmy}=\cos(\frac{x-y}{2})$$


$\vec{A}$ is a unit vector and $x$ is the angle around that vector; $\vec{B}$ is a unit vector and $y$ is the angle around that axis.

$$\begin{array}{ll} R(A,x,B,y) &= \left[\begin{matrix}{}  \begin{array}{} 2\arccos( \frac{( ( A\cdot B )*(cxpy - cxmy) + cxmy + cxpy )}{2} )
\\
 2\arccos\left( \frac{\begin{array}{r} ( A\cdot B )*(\cos( \frac{x+y}{2} ) - \cos(\frac{x-y}{2}))\\ + \cos(\frac{x-y}{2}) \\+ \cos( \frac{x+y}{2} ) \end{array}}{2} \right) & 
 \end{array} 
& \begin{array}{llr}
 \vec{C}
  &=(\vec{B} \times \vec{A})(\cos( \frac{x-y}{2} ) - \cos( \frac{x+y}{2} )) \\
 &+\vec{A}(\sin( \frac{x-y}{2} ) + \sin( \frac{x+y}{2} ))\\
 &+\vec{B}(\sin( \frac{x+y}{2} ) - \sin( \frac{x-y}{2} ))\\ \\
 &\boxed{=\frac{2\vec{C}}{\left|\vec{C}\right|}  \arccos\left( \frac{\begin{array}{r} ( A\cdot B )*(\cos( \frac{x+y}{2} ) - \cos(\frac{x-y}{2}))\\ + \cos(\frac{x-y}{2}) \\+ \cos( \frac{x+y}{2} ) \end{array}}{2} \right)}  \end{array}
 
  \end{matrix}\right]
 \\
 
 \end{array}$$
This is the working part; it results in a vector($\vec{C}$) which is either scaled by $\left|\vec{C}\right|$  or $sin(\frac{\theta}{2})$, which if $\theta = 0$ or $\theta=n2\pi$, that's $\frac {\infty}{0}$.  A and B are unit vectors so $A \times B$ is a vector from 0 to 1; any of the $\sin {or} \cos (x \pm y)$ terms are -1 to 1.  The result vector will never be greater than 1.  And actually, 

$$(A \times B)(cxmy - cxpy) + A(sxmy + sxpy)+B(sxpy - sxmy)  $$


Expanded Equation....

$$\begin{array}{llr}f\left(\vec{a},\vec{b}\right)=&&r\left(\frac{\vec{a}}{\left|\vec{a}\right|},|\vec{a}|,\frac{\vec{b}}   
{\left|\vec{b}\right|},|\vec{b}|\right)\\
r(\vec{A},x,\vec{B},y)=\\
&\vec{C}=
  &(\vec{B} \times \vec{A})(\cos( \frac{x-y}{2} ) - \cos( \frac{x+y}{2} )) \\
 &&+\vec{A}(\sin( \frac{x-y}{2} ) + \sin( \frac{x+y}{2} ))\\
 &&+\vec{B}(\sin( \frac{x+y}{2} ) - \sin( \frac{x-y}{2} ))\\ \\
& \boxed{=\frac{2\vec{C}}{\left|\vec{C}\right|}  \arccos\left( \frac{\begin{array}{r} ( A\cdot B )*(\cos( \frac{x+y}{2} ) - \cos(\frac{x-y}{2}))\\ + \cos(\frac{x-y}{2}) \\+ \cos( \frac{x+y}{2} ) \end{array}}{2} \right)}  \end{array}$$

$$\begin{array}{lr}\vec{C}=\frac { \begin{array}{r} (A \times B)(cxmy - cxpy)\\ + A(sxmy + sxpy)\\+B(sxpy - sxmy)\end{array} } {sin(\frac{ang}{2})} \end{array}$$

$$\vec{c} = \vec{C}*ang$$

$$\begin{array}{ll} 
\vec{A}=\frac {Q}{|Q|} & \theta = |Q| \\

U_{p}\left(Q\right)=&\left(\begin{array}{ll}-\sin\left(\theta\right)\ \vec{A}.z\ &+\ \left(1-\cos\left(\theta\right)\right)\vec{A}.y\vec{A}.x\ ,\\
\cos\left(\theta\right)&+\left(1-\cos\left(\theta\right)\right)\vec{A}.y^{2},\\
\sin\left(\theta\right)\vec{A}.x&+\left(1-\cos\left(\theta\right)\right)\vec{A}.y\vec{A}.z\end{array}\right)\\

R_{ight}\left(Q\right)=&\left(\begin{array}{ll}\cos\left(\theta\right)&+\left(1-\cos\left(\theta\right)\right)\vec{A}.x^{2},\\
\sin\left(\theta\right)\vec{A}.z&+\left(1-\cos\left(\theta\right)\right)\vec{A}.x\vec{A}.y,\\
-\sin\left(\theta\right)\ \vec{A}.y& + \left(1-\cos\left(\theta\right)\right)\vec{A}.x\vec{A}.z \end{array}\right)\\

F_{orward}\left(Q\right)=&\left(\begin{array}{ll}\sin\left(\theta\right)\vec{A}.y&+\left(1-\cos\left(\theta\right)\right)\vec{A}.z\vec{A}.x,\\
-\sin\left(\theta\right)\vec{A}.x&+\left(1-\cos\left(\theta\right)\right)\vec{A}.z\vec{A}.y,\\
\cos\left(\theta\right)&+\left(1-\cos\left(\theta\right)\right)\vec{A}.z^{2}\end{array}\right)\\
\\
\\
Y_{aw}\left(Q,\theta\right)=r\left(\frac{Q}{\left|Q\right|},\left|Q\right|,U_{p}\left(Q\right),\theta\right)\\
R_{oll}\left(Q,\theta\right)=r\left(\frac{Q}{\left|Q\right|},\left|Q\right|,F_{orward}\left(Q\right),\theta\right)\\
P_{itch}\left(Q,\theta\right)=r\left(\frac{Q}{\left|Q\right|},\left|Q\right|,R_{ight}\left(Q\right),\theta\right)\\

\end{array}$$






$Y_{aw}\left(Q,\theta\right)=R\left(\frac{Q}{\left|Q\right|},\left|Q\right|,U_{p}\left(Q\right),\theta\right)$
$R_{oll}\left(Q,\theta\right)=R\left(\frac{Q}{\left|Q\right|},\left|Q\right|,F_{orward}\left(Q\right),\theta\right)$
$P_{itch}\left(Q,\theta\right)=R\left(\frac{Q}{\left|Q\right|},\left|Q\right|,R_{ight}\left(Q\right),\theta\right)$


```js
    const q2a = Math.cos( q.θ /2 );
    const q1s = Math.sin( q.θ /2 )
    const q2b = q1s*q.nx;
    const q2c = q1s*q.ny;
    const q2d = q1s*q.nz;
    const q1a = Math.cos( th /2 );
    const q2s = Math.sin( th /2 );
    const q1b = q2s*ax;
    const q1c = q2s*ay;
    const q1d = q2s*az;

  

    // quaternion multiplication
    
    // dot product
    q3a = q1a*q2a - q1b*q2b - q1c*q2c - q1d*q2d;
    // cross product in parens
    q3b = q1a*q2b + q1b*q2a + (q1c*q2d - q1d*q2c);
    q3c = q1a*q2c + q1c*q2a + (q1d*q2b - q1b*q2d);
    q3d = q1a*q2d + q1d*q2a + (q1b*q2c - q1c*q2b);

/*
    const q3a = q1a*q2a - q1b*q2b - q1c*q2c - q1d*q2d;
    const q3b = q1a*q2b + q1b*q2a + (extrinsic?-1:1)*(lnQuat.invertCrossProduct?-1:1)*(q1c*q2d - q1d*q2c);
    const q3c = q1a*q2c + q1c*q2a + (extrinsic?-1:1)*(lnQuat.invertCrossProduct?-1:1)*(q1d*q2b - q1b*q2d);
    const q3d = q1a*q2d + q1d*q2a + (extrinsic?-1:1)*(lnQuat.invertCrossProduct?-1:1)*(q1b*q2c - q1c*q2b);
*/
```

## Rotating a vector (V RV Q)

The Rodrigues Rotation formula may also be used to apply a point, and result with a rotated point.


```
   Given input axis A with angle a, and a point V to rotate.
   
   V' = V + cos(a)( 2 * sin(a)* A × V ) + A * sin(a) × V 

     - or - 
	
   V' = cos(a)*V  +  sin(a) * A × V  + (1-cos(a))(A ∙ V ) * A
```

  $${V'} = V\cos{a}  +  \sin{a} ( A × V ) +  A(1-cos(a))(A ∙ V ) $$

$${V'} = V + \cos{a} ( 2 \sin{a} ( A × V )) +  A(\sin{a})(A ∙ V ) $$
$$R_{V}(A,a,V) = \left [ \begin{matrix} V\cos{a}  \\+  \sin{a} ( A × V ) \\+  A(1-cos(a))(A ∙ V )\end{matrix} \right ]$$

## Integrating a Rotation

Given an orientation Q, which is the initial position, and a known axis-angle (P) to update the position.
Rotate the axis-angle of rotation into the frame of Q, and then rotate Q by the updated position times
a scalar(T) of 0 to 1.

```
   P` = P RV Q         ; rotate the direction of P into frame Q; also ||P|| = ||P`||.
   
   R  = Q RRF (P` * T) ; result Q rotated by P` scaled from 0 to 1.  
   
    - or as a single complete step -
	
   R = P RRF Q         ; rotate the frame P into Q
                       ;  (is this also PT RRF Q)?
```


## Rotating between two arbitrary Frames (SLERP proper)

Rotation between to arbitrary frames may be done by projecting the target to a relative frame to the start, 
and then rotating the resulting axis, and applying the resulting
axis-angle to the starting frame.


  given Q as an initial frame, P as the target frame, and T as a value from 0 to 1.

   $P'  = P\  {RRF}\  Q-1$       ; multiply Q angle by -1 to rotate P to relative to Q
   
   $P'' = P' RV Q$        ; rotate the direction of P' into frame Q; also $||P'|| = ||P''||$
   
   R   = Q RRF (P'' * T) ; result Q rotated by P'' scaled from 0 to 1.


$\theta$

$$\begin{array}{lll} \vec{A}&= R(&\vec{p}&,|p|&,\vec{q}&&&&,-|q| &) \\
\vec{r} &=R(&\vec{q}&,|q|&,R_{V}(&\vec{q}&,|q|&,\vec{A})&,\vec{A}&) \end{array}$$

``` js
const axisTemp = {x:0,y:0,z:0};
// slerp q to p with T, target is output, external toggles cross product intrinsic/extrinsic rotation
function slerp2( q, p, t, target, external ) {
	external = external || 0;
	// A dot B   = cos( angle A->B )
	// cross product of the rotations is a rotation perpendicular to the two
	// with an arc length of arccos( q x p ), scaled by 0-1 passed in as T.
	if( !q.θ ) {
		target.nx = p.nx;
		target.ny = p.ny;
		target.nz = p.nz;
		target.θ = t * p.θ;
		target.x = target.nx * target.θ;
		target.y = target.ny * target.θ;
		target.z = target.nz * target.θ;
		return target;
	}

	target.set( p );
	// remove the rotation of q from p...
	finishRodrigues( target, Math.floor( q.θ,(Math.PI*2)), q.nx, q.ny, q.nz, -q.θ );
	// which sets target as the initial P rotation.
	
	axisTemp.x = target.nx;
	axisTemp.y = target.ny;
	axisTemp.z = target.nz;
	let tmpA;
	if( !external ) // delta angle is from an internal source
		tmpA = q.applyDel( axisTemp, 1 );
	else
		tmpA = axisTemp;
	const angle = target.θ;
	target.set(q);
	return finishRodrigues( target, Math.floor( q.θ,(Math.PI*2)), tmpA.x, tmpA.y, tmpA.z, angle*t );
}

```

## Caveats

This system is itself self consistent, and converts to quaternion or matrix easily.  When computing
rotation factors from physics, such as an impact generting a torque on a 3D body, the result of that 
calculation is a cross product, and is scaled both by the length of the vectors from the bodie's center
of gravity and velocity of the strike, and by the sin of the angle.  `||A|| ||B|| sin(theta) N` ends
up with the rotational velocity already scaled by the sin of the angle, like the vector part(i,j,k) 
of a quaternion.  This makes the physics calculations and this system fairly incompatible; and such 
cross products would have to be represented as a different type to carry its `angle` or `sin(angle)`
as a separate scalar from its direction normal.


