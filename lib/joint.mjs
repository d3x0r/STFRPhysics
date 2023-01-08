
import {lnQuat,Vector} from "./math_config.mjs"

// import points ... 
		   
export class Joint {
	center = Vector.new(0,0,0);
	exclusions = [ { n:Vector.new( 0,-1,0 ), angle:45 } ];
	armLength = 1;  // physical; might have a piston/solenoid action that makes it variable.
	armN = Vector.new();  // solving for this....

	armQ = new lnQuat(Math.PI/36,{x:0,y:1,z:0});
	
	
	next = null;
	parent = null;
	
	//cur_exclusions = [ computed relative(global) exclusions?  maybe just compare local relative? ],
	
	constructor( parent ) {
		if( this.parent = parent ) {
			if( parent.next ) throw new Error( "Parent is already attached to another arm." );
			parent.next = this;
		}
	}

	addLimb() {
		const limb = new Joint(this);
		return limb;
	}

	// origin of the chain...
	shoulder() {
		return this.root();
	}

	// sholder, where the chain is attached
	root() {
		let p = this;
		while( p.parent ) p = p.parent;
		return p;
	}
	
	hand() {
		let p = this;
		while( p.next ) p = p.next;
		return p;					
	}
	
	get length() {
		// maximum length this could be.
		let digit = this.root();
		let len = 0;
		while( digit ) {
			len += digit.armLength;
			digit = digit.next;
		}
		return len;
	}

	get reach() {
		// current configured reach...
		let digit = this.hand();
		return hand.armN.length() * hand.armLength;
	}

	
	inExclusion() {
		return this.exclusions.find( ex=>{
			return ( Math.arccos( ex.n. dot( this.armN ) ) < ex.angle );
		} );
	}
	
	update() {
		this.armQ.set( this.armN );
		
		if( this.next ) {
			next.center.set( armN.scale( this.armLength ) );
			next.update();
		}
	}
	
	static solve( chain, p/*x,y, z*/, approach ) {
		const l = p.length();
		const reach = chain.length;
		const finger = chain.hand();
		const shoulder = chain.shoulder();
		const origin = shoulder.center;

		if( l > reach ) {
			console.log( "Have to point?", l, reach );
			// just point roughly at the thing...
			let digit = chain.root();
			digit.armN.set( p );
			while( digit = digit.next ) {
				digit.armN.set( 0, 1, 0 );
			}

		} else if( l > reach - finger.length && false ) {
			console.log( "Fringe reach - might not get to point exactly there?")
		} else {
			const v = [];
			let target = Vector.new( p.x, p.y, p.z );
			console.log( "approach", approach );
			let fingerAt = Vector.new( target.x-approach.x*finger.armLength
						, target.y-approach.y*finger.armLength
						, target.z-approach.z*finger.armLength );
						// sphere is this...
						//.multiplyScalar( finger.length );
			let direction = lnQuat.new( approach );
			// but really at this point any old roll should do too... it doesn't have to be this quat.
			let planeNormal = Vector.new( -fingerAt.z, 0, fingerAt.x );
			//let spanning distance = fingerAt.

			console.log( "Stuff?", direction, fingerAt, approach );
			let seg = finger.parent;
			let realReach = fingerAt.length();
			const hyp_vert = Math.acos( fingerAt.y / realReach );
			shoulder.armQ.θ = hyp_vert;
			while( seg && seg.parent ) {
				v.push( seg );
				seg = seg.parent.parent;
			}
			if( seg ) {
				// odd count of flex points...
				realReach -= seg.armLength;
			}

			const perSegLength = realReach / v.length;
			for( let vv = 0; vv < v.length; vv++ ) {
				const seg = v[vv];
				const segAng = Math.asin(perSegLength/2);
				seg.armQ.θ = -(Math.PI - segAng*2)
				seg.parent.armQ.θ = segAng;
			}
			// V is a list of joints that are between two other nodes
			// each of those nodes this node controls the distance between.
			console.log( "Need to cover", v.length, perSegLength, realReach );

			direction.delete();
			fingerAt.delete();
			target.delete();
			planeNormal.delete();
		}
		// if x
	}
}

			