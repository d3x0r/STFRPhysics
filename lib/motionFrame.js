
import {dlnQuat} from  "./dlnQuat.js" ;

const speedOfLight = 1;
// Object relative orientation and position is represented with a dualLnQuat with( angleUp, lookAtNormal ), (my position within parent)

/* The 'world' would be started with a dual-quat */

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;

class motionFrame {
	relatives = [];
	const tick = this.tick.bind( this );
	position = new dlnQuat(); // doesn't need dirty update
	velocity = new dlnQuat();
	//accel = new dlnQuat();

        move = moveFree;
	
	constructor() {
	}



	relate = function(rFrame, cb, isA) {
		relatives.push( { frame : rFrame, tick:cb, isA:isA } );
	}

	tick(del) {
		for( let relative of this.relatives ) relative.tick( del, relative.isA )
	}
	moveFree( accel, del ) {
		if( !del ) del = 1.0;
		this.position.stepExternal( this.velocity, accel, del );
		this.tick(del); // invoke callbacks
	}

	moveRocket( accel, del ) {
		if( !del ) del = 1.0;
		this.position.stepRocket( this.velocity, accel, del );
		this.tick(del); // invoke callbacks
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

export {motionFrame}