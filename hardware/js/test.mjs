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

setTimeout( ()=>{
	setInterval( latch1, 1000 );
}, 3000 );

setTimeout( ()=>{
	setInterval( latch2, 1000 );
}, 2500 );

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

let firstTick = 0;//Date.now()/1000;
let priorTick = [0,0];

let tickMsg = new Uint8Array( 13 );
let tickOfs = 0;

function log(msg) {
	let start = 0;
	//console.log( "raw msg:", msg );
	for( let n = 0; n < msg.length; n++ ) {
		if( tickOfs ) {
			tickMsg[tickOfs++] = msg[n];
			if( tickOfs === 13 ){
				//console.log( "Msg:", tickMsg );
				out( tickMsg );
				tickOfs = 0;
			}
			start = n+1;
			continue;
		}
		else if( msg[n] === 0 ) {
			if( firstTick === 0 ) firstTick = Date.now()/1000
			if( start < n )
				out( msg.slice( start, n ) );
			tickMsg[0] = msg[n];
			tickOfs++;
		}
		else if( msg[n] === 1 ) {
			if( firstTick === 0 ) firstTick = Date.now()/1000
			if( start < n )
				out( msg.slice( start, n ) );
			tickMsg[0] = msg[n];
			tickOfs++;
		}
	}
	if( start < msg.length ) {
		//console.log( "last buffer?", start, msg.length );
		out( msg.slice( start, msg.length ) );
	}

	function out(msg) {
		//console.log( "Raw slice:", msg );
		if( msg[0] == 0 ) {
			const slice = msg.slice( 1, 13 );
			//console.log( "message slice:", slice );
			const u32 = new Uint32Array( slice.buffer );
			const tick = u32[1] * 0x100000000 + u32[0];
			const nowTick = Date.now()/1000;
			if( priorTick[0] === 0 )
				priorTick[0] = tick;
			console.log( "clock 0:", u32, u32[2].toString(2).padStart(32, '0'), tick, tick-priorTick[0], nowTick-firstTick, (((nowTick-firstTick)/(tick-priorTick[0]))*1000000000).toFixed(3) );
			
			reset1();
		}
		else if( msg[0] == 1 ) {
			const slice = msg.slice( 1, 13 );
			//console.log( "message slice:", slice );
			const u32 = new Uint32Array( slice.buffer );
			const tick = u32[1] * 0x100000000 + u32[0];
			const nowTick = Date.now()/1000;
			if( priorTick[1] === 0 )
				priorTick[1] = tick;
			console.log( "clock 1:", u32, u32[2].toString(2).padStart(32, '0'), tick, tick-priorTick[1], nowTick-firstTick, (((nowTick-firstTick)/(tick-priorTick[1]))*1000000000).toFixed(3) );
			reset2();
		}
		else console.log( String.fromCharCode.apply(null, msg) );
	}
}