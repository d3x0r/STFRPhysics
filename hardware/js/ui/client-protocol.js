
import {Events} from "./events.mjs"
import {JSOX} from "/node_modules/jsox/lib/jsox.mjs"


export class Protocol extends Events {
	static debug = false;
	protocol = null;
	#Protocol = Protocol; // this is the proper class container of the implemented protocol
	get debug() {
		return Protocol.debug;
	}
	set debug(val) {
		Protocol.debug = val;
	}
	constructor( protocol ){
		super();
		this.#Protocol = Object.getPrototypeOf( this ).constructor;
		this.#Protocol.ws = null; // allocate static ws member.
		this.protocol = protocol;
		if( protocol )
			Protocol.connect(protocol, this);
	}

	static connect(protocol, this_) {
		const ThisProtocol = this_.#Protocol;//Object.getPrototypeOf( this ).constructor;
		ThisProtocol.ws = new WebSocket( location.origin.replace("http","ws"), protocol );
		ThisProtocol.ws.onmessage = (evt)=>Protocol.onmessage.call( this_, evt) ;
		ThisProtocol.ws.onclose = (evt)=>Protocol.onclose.call( this_, evt) ;
		ThisProtocol.ws.onopen = (evt)=>Protocol.onopen.call( this_, evt) ;
		return ThisProtocol.ws;
	}

	get ready() {
		if( this.#Protocol.ws )
			if( this.#Protocol.ws.readyState == 1 ) return true;
		return false;
	}
	
	connect() {
		return Protocol.connect( this.protocol, this );
	}

	static onopen( evt ) {
		const ThisProtocol = Object.getPrototypeOf( this ).constructor;
		ThisProtocol.on( "open", true );
	}

	static onclose( evt ){
		const Protocol = Object.getPrototypeOf( this ).constructor;
		Protocol.debug && console.log( "close?", this, evt );
		const event = this.on( "close", [evt.code, evt.reason] );
		Protocol.ws = null;
		if( evt.code === 1000 ) this.connect();
		else setTimeout( this.connect.bind(this), 5000 );
	}

	static onmessage( evt ) {
		Protocol.debug && console.log( "got:", this, evt );
		const msg = JSOX.parse( evt.data );
		if( !this.on( msg.op, msg ) ){
			Protocol.debug && console.log( "Unhandled message:", msg );
		}
	}

	send( msg ) {
		const ws = this.#Protocol.ws;
		if( ws.readyState === 1 ) {
			if( "object" === typeof msg ) {
				ws.send( JSOX.stringify(msg) ); 
			} else
				ws.send( msg );	
		} else {
			Protocol.debug && console.log( "Protocol socket is not in open readystate", ws.readyState );
		}
	}
	close( code, reason ) {
		return this.ws.close( code, reason );
	}

} 

