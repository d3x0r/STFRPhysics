

Curvature requires a 'motion in time' to be applied... the scalar of that time and the motion affects the
result.


1) in a plane, a point with a single curvature is (x = sin(t*c), y = cos(t*c) )


// a point with a forward motion is....
2) in a plane, a point with a single curvature is (x += sin(t+c), y += cos(t+c) )



lnQuat.prototype.update = function() {
	// sqrt, 3 mul 2 add 1 div 1 sin 1 cos
	if( !this.dirty ) return;
	this.dirty = false;


	// norm-rect
	this.nR = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);

	// norm-linear    this is / 3 usually, but the sine lookup would 
	//    adds a /3 back in which reverses it.
	this.nL = (Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z))/2;///(2*Math.PI); // average of total
	if( this.nR ){
		this.nx = this.x/this.nR /* * this.nL*/;
		this.ny = this.y/this.nR /* * this.nL*/;
		this.nz = this.z/this.nR /* * this.nL*/;
	}else {
		this.nx = 0;
		this.ny = 0;
		this.nz = 0;
	}
	this.s  = Math.sin(this.nL); // only want one half wave...  0-pi total.
	this.qw = Math.cos(this.nL);

	return this;
}


// https://blog.molecular-matters.com/2013/05/24/a-faster-quaternion-vector-multiplication/
// 
lnQuat.prototype.apply = function( v ) {
	//return this.applyDel( v, 1.0 );
	const q = this;
	this.update();
	// 3+2 +sqrt+exp+sin
        if( !q.nL ) {
		// v is unmodified.	
		return {x:v.x, y:v.y, z:v.z }; // 1.0
	}
	// call update() ?
	// q.s and q.qw are set in update(); they are constants for a quat in a location.

	if( q.nL ) {
		const nst = q.s/this.nR; // normal * sin_theta
		const qw = q.qw;  //Math.cos( pl );   quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]
	        
		const qx = q.x*nst;
		const qy = q.y*nst;
		const qz = q.z*nst;
	        
		//p’ = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w – v.dot(v))
		const tx = 2 * (qy * v.z - qz * v.y); // v.cross(p)*w*2
		const ty = 2 * (qz * v.x - qx * v.z);
		const tz = 2 * (qx * v.y - qy * v.x);
		return { x : v.x + qw * tx + ( qy * tz - ty * qz )
		       , y : v.y + qw * ty + ( qz * tx - tz * qx )
		       , z : v.z + qw * tz + ( qx * ty - tx * qy ) };
		//    3 registers (temp variables, caculated with sin/cos/sqrt,...)
		// 18+12 (30)   12(2)+(3) (17 parallel)
	        
		// total 
		// 21 mul + 9 add  (+ some; not updated)
	} 
	else return {x:v.x,y:v.y,z:v.z};
}


// https://www.gamasutra.com/view/feature/131686/rotating_objects_using_quaternions.php

Addition: q + q´ = [w + w´, v + v´]

Multiplication: qq´ = [ww´ - v · v´, v x v´ + wv´ +w´v] (· is vector dot product and x is vector cross product); Note: qq´ ? q´q
Conjugate: q* = [w, -v]

Norm: N(q) = w2 + x2 + y2 + z2

Inverse: q-1 = q* / N(q)

Unit Quaternion: q is a unit quaternion if N(q)= 1 and then q-1 = q*

Identity: [1, (0, 0, 0)] (when involving multiplication) and [0, (0, 0, 0)] (when involving addition)


QuatMul(QUAT *q1, QUAT *q2, QUAT *res){
float A, B, C, D, E, F, G, H;
A = (q1->w + q1->x)*(q2->w + q2->x);
B = (q1->z - q1->y)*(q2->y - q2->z);
C = (q1->w - q1->x)*(q2->y + q2->z); 
D = (q1->y + q1->z)*(q2->w - q2->x);
E = (q1->x + q1->z)*(q2->x + q2->y);
F = (q1->x - q1->z)*(q2->x - q2->y);
G = (q1->w + q1->y)*(q2->w - q2->z);
H = (q1->w - q1->y)*(q2->w + q2->z);
res->w = B + (-E - F + G + H) /2;
res->x = A - (E + F + G + H)/2; 
res->y = C + (E - F + G - H)/2; 
res->z = D + (E - F - G + H)/2;
}


dQ/dt + 0.5 * quat(angular) * Q



A^2+b^2-c^2-d^2
cos(phi) + sin(x) - sin(y) - sin(z)      2cy-2wz                                  2bd+2wy

2xy +2wz                            cos(phi)-sin(x)+sin(y)-sin(z)                 2yz - 2wx
2xz - 2wy                                2yz + 2wx                       cos(phi)-sin(x)-sin(y)+sin(z)


x ( cos(phi) + sin(x) - sin(y) - sin(z)    +  2cy-2wz     +      2bd+2wy )


   -sin(a/2) sin(b/2) , cos(a/2) sin(b/2), sin(a/2)cos(b/2)

    //sin(a/2) sin(a/2) , cos(a/2) sin(a/2), sin(a/2)cos(a/2)

    cos( |x|+|y|+|z| ) + sin( |x|+|y|+|z| ) ( x/sqrt(xx+yy+zz) ) i +  sin( |x|+|y|+|z| ) * ( y/sqrt(xx+yy+zz) ) j   +        sin( |x|+|y|+|z| ) * ( z/sqrt(xx+yy+zz) ) k



The composition of spatial rotations
	
tan(c/2)C = tan(b/2)B + tan(a/2)A + tan(a/2)tan(b/2) B . A
      / ( 1 - tan(b/2)tan(a/2) B . A )

This gives the axis of the new rotation, the angle is aparently not known?

	

     


// v perp and vparallel     vper * cos phi + (U x V) sin phi + vparallel

//------------------ What If ---------------

/**
 *  
   Was pondering, what if I took euler angles and made a matrix, and then applied that matrix
   to the point, and how that would simplify.
   I wonder how the below compares with the above axis-axis-axis rotation. ....
   well ... someone can consider the below.  
   (remember then each of those still has to be applied to the point to get a rotation)
 
https://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToMatrix/index.htm
 */

/** this (JAVA) conversion uses NASA standard aeroplane conventions as described on page:
*   https://www.euclideanspace.com/maths/geometry/rotations/euler/index.htm
*   Coordinate System: right hand
*   Positive angle: right hand
*   Order of euler angles: heading first, then attitude, then bank
*   matrix row column ordering:
*   [m00 m01 m02]
*   [m10 m11 m12]
*   [m20 m21 m22]*/
/**
public final void rotate(double heading, double attitude, double bank) {
    // Assuming the angles are in radians.
    double ch = Math.cos(heading);
    double sh = Math.sin(heading);
    double ca = Math.cos(attitude);
    double sa = Math.sin(attitude);
    double cb = Math.cos(bank);
    double sb = Math.sin(bank);

    m00 = ch * ca;
    m01 = sh*sb - ch*sa*cb;
    m02 = ch*sa*sb + sh*cb;
    m10 = sa;
    m11 = ca*cb;
    m12 = -ca*sb;
    m20 = -sh*ca;
    m21 = sh*sa*cb + ch*sb;
    m22 = -sh*sa*sb + ch*cb;
}
*/
