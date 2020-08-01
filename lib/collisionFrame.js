import {relativeFrame} from "./relativeFrame"
import {entityFrame} from "./entityFrame"

class collisionFrame extends relativeFrame {

	constructor( a, b ) {
        	super(a,b);
                
        }
        
        step(del) {
        	// applies collision reative forces
        }
}

export {collisionFrame}
