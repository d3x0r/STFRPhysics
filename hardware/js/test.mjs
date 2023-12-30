import {sack} from "sack.vfs"

const com = sack.ComPort( "com6" );

com.onRead( log );

const sendbuf = new Uint8Array( 1 );

let sendTick = 0;
function send() {
	if( !sendTick )
	sendTick = setTimeout( ()=>{
		sendTick = 0;
		com.write( sendbuf );
	}, 2 );
}

	reset1();
	reset2();

//setTimeout( latchTest, 5000 );
//setTimeout( latchTest, 10000 );

setInterval( latch1, 1000 );

function reset1() {
	sendbuf[0] |= 0b0001;
	send();
	setTimeout( ()=>{
			sendbuf[0] &= ~0b0001;
			send();
		}, 10 );
}

function reset2() {
	sendbuf[0] |= 0b0010;
	send();
	setTimeout( ()=>{
			sendbuf[0] &= ~0b0010;
			send();
		}, 10 );
}

function latch1() {
	console.log( "Sending latch 1" );
	sendbuf[0] |= 0b0100;
	send();
	setTimeout( ()=>{
			sendbuf[0] &= ~0b0100;
			send();
		}, 3 );
}

function latch2() {
	console.log( "Sending latch 2" );
	sendbuf[0] |= 0b1000;
	send();
	setTimeout( ()=>{
			sendbuf[0] &= ~0b1000;
			send();
		}, 3 );
}


function latchTest() {
//reset1();
	setTimeout( ()=>{
		latch1();
	}, 100 );
	setTimeout( ()=>{
		latch2();
		}, 500 );
//sendbuf[0] = 0b0000;
//com.write( sendbuf );

}

let firstTick = Date.now()/1000;

function log(msg) {
	let start = 0;
	console.log( "raw msg:", msg );
	for( let n = 0; n < msg.length; n++ ) {
		if( msg[n] === 0 ) {
			if( start < n )
				out( msg.slice( start, n ) );
			out( msg.slice( n, n+9 ) );
			start = n+9;
			n += 8;
		}
		if( msg[n] === 1 ) {
			if( start < n )
				out( msg.slice( start, n ) );
			out( msg.slice( n, n+9 ) );
			start = n+9;
			n += 8;
		}
	}
	if( start < msg.length ) {
		//console.log( "last buffer?", start, msg.length );
		out( msg.slice( start, msg.length ) );
	}
	function out(msg) {
		//console.log( "Raw slice:", msg );
		if( msg[0] == 0 ) {
			const slice = msg.slice( 1, 9 );
			//console.log( "message slice:", slice );
			const u32 = new Uint32Array( slice.buffer );
			const tick = u32[0] * 0x100000000 + u32[1];
			const nowTick = Date.now()/1000;
			console.log( "clock 0:", u32, tick );
			reset1();
		}
		else if( msg[0] == 1 ) {
			const slice = msg.slice( 1, 9 );
			//console.log( "message slice:", slice );
			const u32 = new Uint32Array( slice.buffer );
			const tick = u32[0] * 0x100000000 + u32[1];
			console.log( "clock 1:", u32, tick );
			reset2();
		}
		else console.log( String.fromCharCode.apply(null, msg) );
	}
}