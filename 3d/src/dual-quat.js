const speedOfLight = 1;
// Object relative orientation and position is represented with a dualLnQuat with( angleUp, lookAtNormal ), (my position within parent)

/* The 'world' would be started with a dual-quat */

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;

const abs = (x)=>abs(x);

// 'fixed' acos for inputs > 1
function acos(x) {
	// uncomment this line to cause failure for even 1/2 rotations(at the limit of the other side)
	// return Math.acos(x); // fails on rotations greater than 4pi.
	const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
	const plusminus = (x)=>mod( x+1,2)-1;
	const trunc = (x,y)=>x-mod(x,y);
	return Math.acos(plusminus(x)) - trunc(x+1,2)*Math.PI/2;
}

// takes an input and returns -1 to 1
// where overflow bounces wraps at the ends.
function delwrap(x) {
	if( x < 0 )
		return ( 2*( (x+1)/2 - Math.floor((x+1)/2)) -1);
	else
		return( 2*( (x+1)/2 - Math.floor((x+1)/2)) -1);
}

// takes an input and returns -1 to 1
// where overflow bounces from the ends.
function signedMod(x) {
	return 1-Math.abs(1-(x))%2;

}

const test = true;


// -------------------------------------------------------------------------------
//  Dual Quaternion (offset part) (will be unused
//     This is just the point offset associated with a rotation
//     .. either a rotation at a point, or a rotation before a point...
// -------------------------------------------------------------------------------

// offset coordinate

// dual log-quat
//   log qaut keeps the orientation of the frame
//   dual of the quat keeps the offset of the origin of that quat.
//   it forms the orgin of a set of basis vectors describing the x-y-z space.


class v3(a,b,c){
	this.x = a||0;
	this.y = b||0;
	this.z = c||0;
	this.nL = Math.abs(|a|)+Math.abs(|b|)+Math.abs(|c|);
	this.nR = Math.sqrt(a*a+b*b+c*c);
	if( this.nR ) {
		this.nx = this.x / this.nR;
		this.ny = this.y / this.nR;
		this.nz = this.z / this.nR;
	}else {
		this.nx = 1;
		this.ny = 0;
		this.nz = 0;
	}

	this.dirty = false;

	constructor(a,b,c) {
		if( a instanceof v3 ) {
			this.x = a.x;
			this.y = a.y;
			this.z = a.z;
			this.dirty = true;
		} else if( "number" === typeof a ) {
			this.x = a;
			this.y = b;
			this.z = c;
			this.dirty = true;
		}
	}

	update() {
		if( this.dirty ) {
			this.nL = Math.abs(|a|)+Math.abs(|b|)+Math.abs(|c|);
			this.nR = Math.sqrt(a*a+b*b+c*c);
			this.nx = this.x / this.nR;
			this.ny = this.y / this.nR;
			this.nz = this.z / this.nR;
			this.dirty = false;
		}
	}
	add( b ) {
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
		this.dirty = true;
		return this;
	}
	add2( a, b ) {
		this.x = b.x + b.x;
		this.y = b.y + b.y;
		this.z = b.z + b.z;
		this.dirty = true;
		return this;
	}
	addDel( b, del ) {
		this.x += del*b.x;
		this.y += del*b.y;
		this.z += del*b.z;
		this.dirty = true;
		return this;
	}
	sub( b ) {
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
		this.dirty = true;
		return this;
	}
	sub2( a, b ) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.dirty = true;
		return this;
	}
	dot( b ) {
		return ( this.x * b.x + this.y * b.y + this.z * b.z );
	}
	cross( b ) {
		return new v3( this.y * b.z - this.z * b.y
		             , this.z * b.x - this.x * b.z
		             , this.x * b.y - this.y * b.x
		             );
	}	
}

class dlnQuat{


	constructor( del, x, y, z, xR, yR, zR ) {
		if( "number" === typeof x && "number" === typeof z ) {
			this.w = -1.0; // mark it's a dual.
	        
		        this.linearAngualarity = 0;
	        
			this.speed = Math.abs(x)+Math.abs(y)+Math.abs(z);
			this.nR = sqrt(x*x+y*y+z*z);
			
			this.v = new v3(x,y,z);
		        this.r = new v3(xR,yR,zR);
		        
			// w becomes time scale basically... 
			// unit vectors representing normal things through time...
		        this.w =  this.r.nL + this.v.nL;
			//this.w = spinSpeedNormalizer; // also total spin+angle of this system...
			if( this.w ) {
				this.angle_normal = this.r.nL / this.w;
				this.speed_normal = this.v.nL / this.w;
			}else {
				// normal matter is basically here...
				this.angle_normal = 1/2;
				this.speed_normal = 1/2;
			}
	        
			// /* speed * */ nxyz * cos(theta) + /*spin * */ nxyzR * sin(theta)
			this.dirty = false;
	        
		} else if( x instanceof dlnQuat ) {
			this.w = x.w;
	        
			this.v = new v3( x.v );
			this.r = new v3( x.r );
	        
			this.angle_normal = w.angle_normal;
			this.speed_normal = w.speed_normal;
			
			this.dirty = w.dirty;
	        
		} else if( "undefined" === typeof x ) {
			this.w = speedOfLight;
			// generate photons by default.
			this.speed = speedOfLight;
			// generate black holes by default.
			//this.speed = 0;
			this.v = new v3();
	        
			// generate black holes by default
			// this.angle = speedOfLight;
			this.r = new v3();
			
			// standard normal?
			// all speed, no spin
			this.angle_normal = 0;
			this.speed_normal = 1;
	        
			// black hole default : all spin, no speed
			//this.angle_normal = 1;
			//this.speed_normal = 0;
	        
			this.dirty = false;
		} else {		
			throw new Error( "Unsupported argument types passed..." );
		}
	}

	add ( q ) {
		this.v.add(q.v);
		this.r.add(q.r);
		return this;
	}

	addHalf ( q ) {
		this.v.addDel(q.v,0.5);
		this.r.addDel(q.r,0.5);
		return this;
	}

	sub( q ) {
		this.v.add(q.v);
		this.r.add(q.r);
		return this;
	}

	update( ) {
		this.v.update();
		this.r.update();
		// speed/angle normalizer constant?

		return this;
	}

	apply( v ) {
		this.update();
		if( v instanceof v3 ) {
                        if( !this.r.nL ) {
				// v is unmodified.	
				return new vec3( v ); // 1.0
			} else {
				const q = this.r;
				const st = Math.sin( this.r.nL / 2 ); // normal * sin_theta
				const ct = Math.cos( this.r.nL / 2 );  //Math.cos( pl );   quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]
			        
				const qx = q.nx*st;
				const qy = q.ny*st;
				const qz = q.nz*st;
			        
				//p’ = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w – v.dot(v))
				const tx = 2 * (qy * v.z - qz * v.y); // v.cross(p)*w*2
				const ty = 2 * (qz * v.x - qx * v.z);
				const tz = 2 * (qx * v.y - qy * v.x);
				const v = this.v;
				return new v3( v.x + ct * tx + ( qy * tz - ty * qz )
				             , v.y + ct * ty + ( qz * tx - tz * qx )
				             , v.z + ct * tz + ( qx * ty - tx * qy ) );
			} 
		} else if( v instanceof dlnQuat ) {
			console.log( "Apply to frame?" );
		}
	}


	// add Velocity/Acceleration/dTime
	// qV = dlnQuat - Velocity
	// qA = dlnQuat - acceleration
	// del is the amount of time (1.0 default)
	addVAT( qV, qA, del ) {
		// other inertial equations are 'p += (Vf+Vi)/2' which adds the delta in velocity over 2...which is (sort of) the 1/2A...

		qV.r.addDel( qA.r, 0.5*del ); // add 1/2 A T  rotation
		qV.v.add( qV.apply( qA.v, 0.5*del ) ); // add 1/2 A T  rotation applied to acceleration vector

		q.v.addDel( qV.v, del ); // add inertial velocity  (vt + 1/2At^2)
		q.r.addDel( qV.r, del ); // add inertial spin      (vt + 1/2At^2)
	        
		return this;
	}


	getBasisT( vec, del ) {
		const q = vec.update();
	        
		if( !del ) del = 1.0;
	        
		const nt = q.nL; //Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
		const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
		const c = 1- Math.cos( del * nt ); // '/2 *2' cancels out because this is double-angle
		
		const qx = q.nx; // normalizes the imaginary parts
		const qy = q.ny; // set the sin of their composite angle as their total
		const qz = q.nz; // output = 1(unit vector) * sin  in  x,y,z parts.
		
		const xy = c*qx*qy;  // 2*sin(t)*sin(t) * x * y / (xx+yy+zz)   1 - cos(2t)
		const yz = c*qy*qz;  // 2*sin(t)*sin(t) * y * z / (xx+yy+zz)   1 - cos(2t)
		const xz = c*qx*qz;  // 2*sin(t)*sin(t) * x * z / (xx+yy+zz)   1 - cos(2t)
		                          
		const wx = s*qx;     // 2*cos(t)*sin(t) * x / sqrt(xx+yy+zz)   sin(2t)
		const wy = s*qy;     // 2*cos(t)*sin(t) * y / sqrt(xx+yy+zz)   sin(2t)
		const wz = s*qz;     // 2*cos(t)*sin(t) * z / sqrt(xx+yy+zz)   sin(2t)
		                          
		const xx = c*qx*qx;  // 2*sin(t)*sin(t) * y * y / (xx+yy+zz)   1 - cos(2t)
		const yy = c*qy*qy;  // 2*sin(t)*sin(t) * x * x / (xx+yy+zz)   1 - cos(2t)
		const zz = c*qz*qz;  // 2*sin(t)*sin(t) * z * z / (xx+yy+zz)   1 - cos(2t)
		
		const basis = { right  :new v3({ x : 1 - ( yy + zz ),  y :     ( wz + xy ), z :     ( xz - wy ) })
		              , up     :new v3({ x :     ( xy - wz ),  y : 1 - ( zz + xx ), z :     ( wx + yz ) })
		              , forward:new v3({ x :     ( wy + xz ),  y :     ( yz - wx ), z : 1 - ( xx + yy ) })
		              };
	        
		const nst = Math.sin( del*nt/2);
		const qsx = q.nx*nst;
		const qsy = q.ny*nst;
		const qsz = q.nz*nst;
		// dualQuat keeps linear normal unscaled by 2...
		const qw = Math.cos( del * nt / 2 );
	        const v = this.v;
		// apply q.r to q.v also... 
		const tx = 2 * (qsy * v.z - qsz * v.y); // v.cross(p)*w*2
		const ty = 2 * (qsz * v.x - qsx * v.z);
		const tz = 2 * (qsx * v.y - qsy * v.x);

		return {
			// inertia applied with current rotation
			// 'arm' I suppose?
			direction : new v3({ x : v.x + qw * tx + ( qsy * tz - ty * qsz )
		                           , y : v.y + qw * ty + ( qsz * tx - tz * qsx )
		                           , z : v.z + qw * tz + ( qsx * ty - tx * qsy ) }),
			forward  : basis.forward,
			right    : basis.right,
			up       : basis.up
		};
	}


	

	addNew( q ) {
		return new dlnQuat().add(this).add(q);
	}


	eqSub( a, b ) {
		this.v.sub2( a.v, b.v );
		this.v.sub2( a.r, b.r );
	
		this.dirty = true;
		return this;
	}

}

// -------------------------------------------------------------------------------
//  Testing Apparatii
// -------------------------------------------------------------------------------


if( ("undefined" == typeof window ) && test )       {

	if( test2() )
		test1();

	function test2() {
		return false; // claim fail, to stop test chain.
	}
	
	function test1() {
	}
}

