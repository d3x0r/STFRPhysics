
import {Protocol} from "./client-protocol.js"


class MyProtocol extends Protocol {
	constructor() {
		super( "dataProtocol" );
		
	}
}

export {MyProtocol};
export const protocol = new MyProtocol();

