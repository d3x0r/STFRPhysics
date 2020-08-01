
import {motionFrame} from "./motionFrame.js";
// This is a relative frame
// it behaves like a inertial frame, but is just a relative difference between two frames
// 


const test = true;




class relativeFrame extends motionFrame {
	constructor(aFrame, bFrame ) {
        	
		this.aFrame = aFrame;
		this.aDirty = false;
		this.bFrame = bFrame;
		this.bDirty = false;
		// this will throw if aFrame isn't a good frame; good enough.
		aFrame.relate( this, this.tick.bind( this ), true );
		bFrame.relate( this, this.tick.bind( this ), false );
	}

	remove() {
		const aId = aFrame.relatives.findIndex( rel=>rel.frame===this );
		if( aId >= 0 ) aFrame.relatives.splice( aId, 1 );
		const bId = bFrame.relatives.findIndex( rel=>rel.frame===this );
		if( bId >= 0 ) aFrame.relatives.splice( bId, 1 );
	}

	tick(del,isA) {
		if( isA ) {
			this.aDirty = true;
		} else {
			this.bDirty = true;
		}
	}

	update() {
		if( this.aDirty || this.bDirty ) {
			this.aDirty = false;
			this.bDirty = false;
			this.position.eqSub( this.bFrame.position, this.aFrame.position );
			this.velocity.eqSub( this.bFrame.velocity, this.aFrame.velocity );
			//this.accel   .eqSub( this.bFrame.accel   , this.aFrame.accel    );
		}
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
