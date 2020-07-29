const speedOfLight = 1;
// Object relative orientation and position is represented with a dualLnQuat with( angleUp, lookAtNormal ), (my position within parent)

/* The 'world' would be started with a dual-quat */

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;

function motionFrame() {
	this.relatives = [];
	const tick = this.tick.bind( this );
	this.position = new dlnQuat(); // doesn't need dirty update
	this.velocity = new dlnQuat();
	this.accel = new dlnQuat();
}

motionFrame.prototype.on = function() {
	
}

motionFrame.prototype.tick = function(del) {
	this.position.add( this.velocity, this.accel, del );
	for( let relative of this.relatives ) relative.tick( del, relative.isA )
}


function relativeFrame(aFrame, bFrame ) {

	motionFrame(); // initialize as a motion frame?
	
	this.aFrame = aFrame;
	this.aDirty = false;
	this.bFrame = bFrame;
	this.bDirty = false;
	aFrame.relatives.push( { frame:this, tick:this.tick.bind( this ), isA:true } );
	bFrame.relatives.push( { frame:this, tick:this.tick.bind( this ), isA:false } );
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
