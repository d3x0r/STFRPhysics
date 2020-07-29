
// This is a relative frame
// it behaves like a inertial frame, but is just a relative difference between two frames
// 


const test = true;




function relativeFrame(aFrame, bFrame ) {

	motionFrame(); // initialize as a motion frame?
	
	this.aFrame = aFrame;
	this.aDirty = false;
	this.bFrame = bFrame;
	this.bDirty = false;
	aFrame.relatives.push( { frame:this, tick:this.tick.bind( this ), isA:true } );
	bFrame.relatives.push( { frame:this, tick:this.tick.bind( this ), isA:false } );
}

relativeFrame.prototype.remove = function() {
	const aId = aFrame.relatives.findIndex( rel=>rel.frame===this );
	if( aId >= 0 ) aFrame.relatives.splice( aId, 1 );
	const bId = bFrame.relatives.findIndex( rel=>rel.frame===this );
	if( bId >= 0 ) aFrame.relatives.splice( bId, 1 );
}

relativeFrame.prototype.tick = function(del,isA) {
	if( isA ) {
		this.aDirty = true;
	} else {
		this.bDirty = true;
	}
}

relativeFrame.prototype.update = function() {
	if( this.aDirty || this.bDirty ) {
		this.aDirty = false;
		this.bDirty = false;
		this.position.eqSub( this.bFrame.position, this.aFrame.position );
		this.velocity.eqSub( this.bFrame.velocity, this.aFrame.velocity );
		this.accel   .eqSub( this.bFrame.accel   , this.aFrame.accel    );
	}
	return this;	
}

// this returns functions which result in vectors that update
// as the current 
relativeFrame.prototype.getFrameFunctions = function( lnQvel ) {
	const q = this.apply( lnQvel );

	let s  = Math.sin( 2 * q.nL ); // sin/cos are the function of exp()
	let c = 1- Math.cos( 2 * q.nL ); // sin/cos are the function of exp()

	const xy = ()=>c*q.nx*q.ny;  // 2*sin(t)*sin(t) * x * y / (xx+yy+zz)   1 - cos(2t)
	const yz = ()=>c*q.ny*q.nz;  // 2*sin(t)*sin(t) * y * z / (xx+yy+zz)   1 - cos(2t)
	const xz = ()=>c*q.nx*q.nz;  // 2*sin(t)*sin(t) * x * z / (xx+yy+zz)   1 - cos(2t)
	                          
	const wx = ()=>s*q.nx;     // 2*cos(t)*sin(t) * x / sqrt(xx+yy+zz)   sin(2t)
	const wy = ()=>s*q.ny;     // 2*cos(t)*sin(t) * y / sqrt(xx+yy+zz)   sin(2t)
	const wz = ()=>s*q.nz;     // 2*cos(t)*sin(t) * z / sqrt(xx+yy+zz)   sin(2t)
	                          
	const xx = ()=>c*q.nx*q.nx;  // 2*sin(t)*sin(t) * y * y / (xx+yy+zz)   1 - cos(2t)
	const yy = ()=>c*q.ny*q.ny;  // 2*sin(t)*sin(t) * x * x / (xx+yy+zz)   1 - cos(2t)
	const zz = ()=>c*q.nz*q.nz;  // 2*sin(t)*sin(t) * z * z / (xx+yy+zz)   1 - cos(2t)

	return {
		forward(t) {
			s = Math.sin( 2*t*q.nL );
			c = 1 - Math.cos( 2*t*q.nL );
			return { x :     ( wy() + xz() ),  y :     ( yz() - wx() ), z : 1 - ( xx() + yy() ) };
		},
		right(t) {
			s = Math.sin( 2*t*q.nL );
			c = 1 - Math.cos( 2*t*q.nL );
			return { x : 1 - ( yy() + zz() ),  y :     ( wz() + xy() ), z :     ( xz() - wy() ) };
		},
		up(t) {
			s = Math.sin( 2*t*q.nL );
			c = 1 - Math.cos( 2*t*q.nL );
			return { x :     ( xy() - wz() ),  y : 1 - ( zz() + xx() ), z :     ( wx() + yz() ) };
		}
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

// -------------------------------------------------------------------------------
//  Quaternion (Rotation part)
// -------------------------------------------------------------------------------
//   x y z w -> i j k R

// multiply the long way; take the logs, add them and reverse the exp().
// validation that P*Q = exp(P.log()+Q.log())
/*
  // Quat class no longer exists... this is for later implementation with a standard quat library.
Quat.prototype.mulLong = function( q ) {
	const lnThis = this.log();
	const lnQ = q.log();
	lnThis.add( lnQ );
	const r = lnThis.exp();
	return r;
}

*/


function quatToLogQuat( q ) {

	const w = q.w;
	const r = 1;//Math.sqrt(x*x+y*y+z*z);
	const ang = acos(w)*2;
	const s = Math.sin(ang/2);
	if( !s ) {
		const l = Math.sqrt(q.x*q.x + q.y*q.y + q.z*q.z );
		if( l )
			return new lnQuat( 0, q.x/l, yt/l, zt/l ).update();	
		else
			return new lnQuat( 0, 0,1,0 ).update();	
	}
	const x = q.x/s;
	const y = q.y/s;
	const z = q.z/s;
	{
		const l = Math.sqrt(x*x + y*y + z*z );
		if( Math.abs( 1.0 - l ) > 0.001 ) console.log( "Input quat was denormalized", l );
	}

	const xt = x;
	const yt = y;
	const zt = z;
	return new lnQuat( ang, xt, yt, zt ).update();
}

