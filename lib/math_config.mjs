import {Vector3} from "./three.module.mjs"
import {lnQuat_pooled} from "./lnQuatSq.mjs"

const vector3Pool = [];

class Vector3_pooled extends Vector3 {

	constructor( ...args ) {
		super( ...args );
	}

	static new(x,y,z) {
		var r = vector3Pool.pop();
		if( r ) {
			r.x = x;
			r.y = y;
			r.z = z;
		}
		else {
			r = new Vector3_pooled(x,y,z);
		}
		return r;
	}

	delete() {
		vector3Pool.push( this );
		return this;
	}

	
}

export {lnQuat_pooled as lnQuat };
export {Vector3_pooled as Vector};
