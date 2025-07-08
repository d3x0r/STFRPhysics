
mat3 q_to_basis( vec3 q ) {

float th = sqrt( q*q )
vec3 const a = q/th;

float s,c1;
sincos( th, s, c1 );
float const c = 1-c1;


vec3 const ca = c*a;
vec3 const xyyzxz = { ca.x*a.y, ca.y*a.z, ca.z*a.x };
vec3 const sa = s*a;
vec3 const xxyyzz = ca*a;

mat3 basis = { { cl+xxyyzz.x, xyyzxz.y-sa.z, sa.y + xyyzxz.z }
		, { sa.z+ xyyzxz.y, c1+xxyyzz.y, xyyzxz.z - sa.x }
     , { xyyzxz.z - sa.y, xyyzxz.z + sa.x, c1+xxyyzz.z } };


	return basis;	

}


vec3 q_rot_q( vec3 q, float qth, vec3 a, float th ) {
//	function finishRodrigues( q, oct, ax, ay, az, th, extrinsic ) {
//	oct = oct || Math.floor(q.Î¸/(Math.PI*2));

	float cxmy,cxpy,sxmy,sxpy;
	sincos( (th - qth)/2, sxmy, cxmy );
	sincos( (th + qth)/2, sxpy, cxpy );

	float ang = acos( ( ( dot( q,a )*(cxpy - cxmy) + cxmy + cxpy )/2 )*2;// + oct * (Math.PI*2);
	if( ang ) {
		vec3 C = ( cross( a, q ) * (cxmy - cxpy) +  a * (sxmy + sxpy) + q * (sxpy - sxmy) );

		float Clx = 1/sqrt(dot(c*c));

		vec3 n = C*Clx;
		return C*Clx;
	} 
	// result angle is 0
	if( AdotB > 0 ) {
		return q*(qth+th);
	}
	return q*(qth-th);
}

vec3 r_rot_r( vec3 q, vec3 a ) {
	float qth = sqrt( dot(q,q) )
	vec3 nq = q/qth;
	float th = sqrt( dot(a,a) )
	vec3 na = a/th;
	return q_rot_q( nq, qth, na, th );
}

vec3 r_rot_v( vec3 q, vec3 v ) {
	float len = sqrt( dot( q,q ) );
	if( len < 0.000000001 ) {
		return v;
	} else  {
		float c, s;
		sincos( angle, c, s );
		vec3 ax = q/len;
		return v*c + s*cross( ax, v ) + ax * (1-c)*dot(q,v);
	}
}

vec3 q_cross_q( vec3 a, float ath, vec3 b, float bth ) {
        float angle = acos( dot( a, b ) );
        float norm = sin( angle );
        vec3 crs = cross( a, b );
        if( norm > 0.0 ) {
        	return angle*crs/norm
        } 
        // really need an exception - no angle between a and b
        // so the cross is 0 length also because there's no way to pick a single
        // perpendicular - just a perpendicular plane
        return a;
}


vec3 r_cross_r( vec3 a, vec3 b ) {
        float ath = sqrt( dot(a,a));
        float bth = sqrt( dot(b,b));
        vec3 aa = a/ath;
        vec3 bb = b/bth;
        float angle = acos( dot( aa, bb ) );
        float norm = sin( angle );
        vec3 crs = cross( aa, bb );
        if( norm > 0.0 ) {
        	return angle*crs/norm
        } 
        return aa*angle;
}

	this.update();
	other.update();
        
        
	const dot =  this.nx*other.nx + this.ny*other.ny + this.nz*other.nz ;
	const angle = Math.acos( dot );  // returns 0 to pi; 0 to 1/2 turn.

	const norm = Math.sin( angle );
	
	const crsX = -(this.ny*other.nz-this.nz*other.ny);
	const crsY = -(this.nz*other.nx-this.nx*other.nz);
	const crsZ = -(this.nx*other.ny-this.ny*other.nx);
	if( norm ) {
		target.θ = angle;
                bb = 
		target.nx = crsX/norm;
		target.ny = crsY/norm;
		target.nz = crsZ/norm;
	}else {
       		target.θ = angle;
                bb=aa;
	}
        return bb*angle;
}


