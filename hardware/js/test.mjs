import {sack} from "sack.vfs"

const com = sack.ComPort( "com6" );

com.onRead( log );

const sendbuf = new Uint8Array( 1 );

let trigger0 = 0;
let trigger1 = 0;

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


/*
setTimeout( ()=>{
	setInterval( latch1, 1000 );
}, 3000 );

setTimeout( ()=>{
	setInterval( latch2, 1000 );
}, 2500 );
*/

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
	trigger0 = Date.now() / 1000;
	setTimeout( ()=>{
			sendbuf[0] &= ~0b0100;
			send();
		}, 3 );
}

function latch2() {
	console.log( "Sending latch 2" );
	sendbuf[0] |= 0b1000;	
	send();
	trigger1 = Date.now() / 1000;
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
let firstTick0 = 0;//Date.now()/1000;
let firstTick1 = 0;//Date.now()/1000;
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
			let phase = 0;
			if( u32[2] & 0b1 ) { // 1
				if( u32[2] & 0b10 ) { // 11
					if( u32[2] & 0b100 ) { // 111
						if( u32[2] & 0b1000 ) { // 1111
							phase = 10;
						} else phase = 3;

					} else phase = 2;

				} else phase = 1;
			
			} else if( u32[2] & 0b10 ) {   // ?0
				if( u32[2] & 0b100 ) {  // ?10
					if( u32[2] & 0b1000 ) {  // ?110
						if( u32[2] & 0b10000 ) { // ?1110
							if( u32[2] & 0b100000 ) { // ?11110
								phase = 10;
							} else phase = 5; // 011110
						} else phase = 4; // 01110
					} else phase = 10; // 0110
				} else phase = 0; // 010
				
			} else  // 00
				phase = 0;

			if( phase === 10 ) console.log( "phase overflow" );
			else nowTick += phase/5000;
			//if( priorTick[0] === 0 )
			//	priorTick[0] = tick;
			console.log( "clock 0:", u32, u32[2].toString(2).padStart(32, '0'), tick, tick-priorTick[0], nowTick-firstTick0, (((nowTick-firstTick0)/(tick-priorTick[0]))*1000000000).toFixed(3) );
			firstTick0 = nowTick;
				priorTick[0] = tick;
			
			//reset1();
		}
		else if( msg[0] == 1 ) {
			const slice = msg.slice( 1, 13 );
			//console.log( "message slice:", slice );
			const u32 = new Uint32Array( slice.buffer );
			const tick = u32[1] * 0x100000000 + u32[0];
			const nowTick = Date.now()/1000;

			let phase = 0;
			if( u32[2] & 0b1 ) { // 1
				if( u32[2] & 0b10 ) { // 11
					if( u32[2] & 0b100 ) { // 111
						if( u32[2] & 0b1000 ) { // 1111
							phase = 10;
						} else phase = 3;

					} else phase = 2;

				} else phase = 1;
			
			} else if( u32[2] & 0b10 ) {   // ?0
				if( u32[2] & 0b100 ) {  // ?10
					if( u32[2] & 0b1000 ) {  // ?110
						if( u32[2] & 0b10000 ) { // ?1110
							if( u32[2] & 0b100000 ) { // ?11110
								phase = 10;
							} else phase = 5; // 011110
						} else phase = 4; // 01110
					} else phase = 10; // 0110
				} else phase = 0; // 010
				
			} else  // 00
				phase = 0;

			if( phase === 10 ) console.log( "phase overflow" );
			else nowTick += phase/5000;

			if( priorTick[1] === 0 )
				priorTick[1] = tick;
			console.log( "clock 1:", u32, u32[2].toString(2).padStart(32, '0'), phase, tick, tick-priorTick[1], nowTick-firstTick1, (((nowTick-firstTick1)/(tick-priorTick[1]))*1000000000).toFixed(3) );
			firstTick1 = nowTick;
				priorTick[1] = tick;
			//reset2();
		}
		else console.log( String.fromCharCode.apply(null, msg) );
	}
}