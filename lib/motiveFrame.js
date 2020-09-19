
import { motionFrame } from "./motionFrame.js";
import { entityFrame } from "./entityFrame.js";
import { lnQuat} from "./lnQuat.js";

class motiveFrame extends motionFrame {
	
	r = 1.0;

	// acceleration vector towards plane
	isPlane = false;
	plane = { o:new v3(0,0,0)
	        , n: new v3(0,1,0)
	        };

	// acceleration vector towards plane
	isFlow = false;
	impulse = null; 

	// acceleration vector is towards this point
	// radius limits reaching the point (unless r<0?)
	isPoint = false;
	// point is far enough that the distance should scale the factor
	isFarPoint = false;
	point = v3(0,0,0);
	g = 0;
	
	// acceleration vector from this frame is tied to the
	// contents' current frame.
	isRocket = false;
	frame.step = frame.stepExternal;
	
	contents = [];

	constructor( g ) {
		if( g instance of lnQuat ) {
			acceleration = new dlnQuat( g, null );
		}
	}

	contain( frame ) {
		if( !contents.find( frame ) )
			contents.push( frame );	
	}
	remove( frame ) {
		
	}
	update( del ) {
		if( isPoint || isFarPoint ) {
			// temporary acceleration vector
			const acc = new dlnQuat();
			contents.forEach( member=>{
				acc.v.sub2( point, member.frame.v ).update();
				if( isFarPoint )
					acc.v.mulScale( g/acc.v.nR*acc.v.nR );
				else
					acc.setScaled( acc, g );
				member.move( acc, del ) 
			} );			
			return;
		}
		if( isFlow ) {
			const acc = new dlnQuat();
			contents.forEach( member=>{
				acc.v.sub2( impulse.v, member.frame.v );
				//acc.r.sub2( impulse.r, member.frame.r );

				member.move( acc, del ) 
			} );	
			return;		
			
		}
		contents.forEach( member=>member.move( acceleration, del ) );
	}

	// forces applies from this are attached to the current frame
	set rocket(val){
		if( val )
			frame.step = frame.stepRocket;
		else
			frame.step = frame.stepExternal;
		isRocket = val;
	}
	get rocket(){
		return isRocket;
	}

	// adds a direction impulse to everything in this frame...
	set flow(val){
		if( val ) {
			impulse = val;
			isFlow = true;
		} else {
			isFlow = false;
		}
	}
	get flow() {
		return isFlow;
	}

	// add a fixed boundary
	set floor(val) {
		if( val ) {
			plane = val;
			isPlane = true;
		}else {
			isPlane = false;
		}
	}
	get floor() {
		return isPlane;
	}
}

export {motiveFrame}