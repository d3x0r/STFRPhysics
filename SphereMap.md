
# Sphere Map 3

This developed the parameterization around the dipole-like graph.  Figure out characteristics of the points there, and what a direct equation for mapping them is.

[Demo](https://d3x0r.github.io/STFRPhysics/3d/indexSphereMap3.html)...

http://mathb.in/68136

![sample image](https://i.ibb.co/mN6V9pR/image.png)




[Latex formatted quations....](http://mathb.in/68136) 				

``` js

let ang = Math.acos( -Math.sin(gamma+lng)*Math.sin(r/2) )*2 ;

const Cx = Math.cos(lng)         * Math.cos(r/2);
const Cy = Math.sin(lng)         * Math.cos(r/2);
const Cz = Math.cos(lng + gamma) * Math.sin(r/2);

//const Clx = 1/Math.sqrt(Cx*Cx+Cy*Cy+Cz*Cz);
const Clx = 1/Math.sin(ang/2);
```

And then in code, normalize the computed vector cross product and multiply by angle to get log(quaternion).

``` js
    lnQ.θ = θ;
    lnQ.nx=Cx*Clx;
    lnQ.ny=Cy*Clx;
    lnQ.nz=Cz*Clx;
    lnQ.x = lnQ.nx * θ;
    lnQ.y = lnQ.ny * θ;
    lnQ.z = lnQ.nz * θ;
```


This uses the above lnQ to compute the normal direction vectors (basis vectors)...

``` js
	const q = lnQ;
	const nt = q.θ * del;
	const s  = Math.sin( nt ); // sin/cos are the function of exp()
	const c1 = Math.cos( nt ); // sin/cos are the function of exp()
	const c = 1- c1;

	const qx = q.nx;
	const qy = q.ny;
	const qz = q.nz;

	const cnx = c*qx;
	const cny = c*qy;
	const cnz = c*qz;

	const xy = cnx*qy; 
	const yz = cny*qz; 
	const xz = cnz*qx; 

	const wx = s*qx;   
	const wy = s*qy;   
	const wz = s*qz;   

	const xx = cnx*qx; 
	const yy = cny*qy; 
	const zz = cnz*qz; 

	const basis = { right  :{ x : c1 + xx, y : wz + xy, z : xz - wy }
	              , forward:{ x : xy - wz, y : c1 + yy, z : wx + yz }
	              , up     :{ x : wy + xz, y : yz - wx, z : c1 + zz }
	              };
```