import {lnQuat} from "./lnQuat.js";

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

class dlnQuat{


	constructor( x, y, z, xR, yR, zR ) {
		if( x instanceof lnQuat ) {
			this.v = x;
			
			this.r = y||new lnQuat();
			return;
		}
		if( "number" === typeof x && "number" === typeof z ) {
			this.w = -1.0; // mark it's a dual.
	        
		        this.linearAngualarity = 0;
	        
			this.speed = Math.abs(x)+Math.abs(y)+Math.abs(z);
			this.nR = sqrt(x*x+y*y+z*z);
			
			this.v = new lnQuat(x,y,z);
		        this.r = new lnQuat(xR,yR,zR);
		        
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
	        
			this.v = new lnQuat( x.v );
			this.r = new lnQuat( x.r );
	        
			this.angle_normal = w.angle_normal;
			this.speed_normal = w.speed_normal;
			
			this.dirty = w.dirty;
	        
		} else if( "undefined" === typeof x ) {
			this.w = speedOfLight;
			// generate photons by default.
			this.speed = speedOfLight;
			// generate black holes by default.
			//this.speed = 0;
			this.v = new lnQuat();
	        
			// generate black holes by default
			// this.angle = speedOfLight;
			this.r = new lnQuat();
			
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


	step = stepExternal;

	// add Velocity/Acceleration/dTime
	// qV = dlnQuat - Velocity
	// qA = dlnQuat - acceleration
	// del is the amount of time (1.0 default)
	stepExternal( qV, qA, del ) {
		// other inertial equations are 'p += (Vf+Vi)/2' which adds the delta in velocity over 2...which is (sort of) the 1/2A...

		qV.r.addDel( qA.r, 0.5*del ); // add 1/2 A T  rotation
		qV.v.add( qA.v, 0.5*del ); // add 1/2 A T  rotation applied to acceleration vector

		q.v.addDel( qV.v, del ); // add inertial velocity  (vt + 1/2At^2)
		q.r.addDel( qV.r, del ); // add inertial spin      (vt + 1/2At^2)
	        
		return this;
	}

	// acceleration is bound to the body, and changes with rotation velocity
	// qV = dlnQuat - Velocity
	// qA = dlnQuat - acceleration
	// del is the amount of time (1.0 default)
	stepRocket( qV, qA, del ) {
		// other inertial equations are 'p += (Vf+Vi)/2' which adds the delta in velocity over 2...which is (sort of) the 1/2A...

		qV.r.addDel( qA.r, 0.5*del ); // add 1/2 A T  rotation
		qV.v.add( qV.apply( qA.v, 0.5*del ) ); // add 1/2 A T  rotation applied to acceleration vector

		q.v.addDel( qV.v, del ); // add inertial velocity  (vt + 1/2At^2)
		q.r.addDel( qV.r, del ); // add inertial spin      (vt + 1/2At^2)
	        
		return this;
	}

	getArmT( del ) {
		return this.apply( this.v, del );
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


export {dlnQuat} 