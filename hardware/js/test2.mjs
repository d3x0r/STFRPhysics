import {sack} from "sack.vfs"
//import {openServer} from "sack.vfs/http-ws";
import {Protocol} from "sack.vfs/protocol"

const com = sack.ComPort( "com9" );
//const NANOS = 8.333;
const NANOS = 4;
const PHASES = 10; // typical phase count

const dataPoints1 = [];
const delPoints1 = [];
const dataPoints2 = [];
const delPoints2 = [];


class MyProtocol extends Protocol {
	constructor(  ) {
		super( { protocol: "clock-data", resourcePath:"ui", npmPath:"../..", port: 4321 } );
	}
}

//openServer( {port:8080}, accept, connect );
const protocol = new MyProtocol(  );

protocol.on( "getData", (ws,msg)=>{
	//console.log( "request for data?", ws, msg );
	ws.send( {op:"data", dataPoints1, dataPoints2} );
} );


/*
sack.DB.eo( (a,b)=>{
	console.log( "EO:", a, b ); 
	if( b === "comports.ini" ) {
		a.eo( (a,b)=>{
			console.log( "level2:", a, b );
			if( b === "node" ) {
				a.eo( (a,b)=>{
					console.log( "level3:", a, b, a.value );
					if( b === "COM PORTS" ) {
						a.eo( (a,b)=>{console.log( a,b)} );
					}
				} );
			}
		} );
	}
} );
console.log( "option:", sack.DB.so( "/comports.ini/node/COM PORTS", "com9", "115200,N,8,1,carrier,Rts,rtsFlow" ) );
*/
com.onRead( log );

const sendbuf = new Uint8Array( 1 );

let trigger0 = 0;
let trigger1 = 0;
let totdel1 = 0;
let totdel2 = 0;

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

//setTimeout( latchTest, 3000 );
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

	function countPhase( phase ) {
		let bit = phase & 1;
		for( let n = 1; n < 25; n++ ) {
			const newBit = (phase & (1<<n));
			if( bit && !newBit ) {
				return n % 10;
			}
			bit = newBit;
		}
	}

let firstTick = 0;//Date.now()/1000;
let firstTick0 = 0;//Date.now()/1000;
let firstTick1 = 0;//Date.now()/1000;
let priorTick = [0,0];
let priorDel = 0;
let priorDel2 = 0;

let tickMsg = new Uint8Array( 13 );
let tickOfs = 0;

class Point {
	tick = 0n;
	del = 0n;  // 1 second delta
	ddel = 0n; // delta minus 1 second delta
	tdel = 0n;  // total ddel

	constructor( buf ) {
		const phase = countPhase( buf[2] ) 
		this.tick = ( BigInt( buf[1] ) * 0x1_0000_0000n + BigInt( buf[0] ) ) * BigInt(NANOS)*1000n + BigInt(phase * (NANOS*1000 / PHASES));
		console.log( "ticks:", this.tick );
	}
}

function pushData( channel, buf ) {
	const prior = channel?	dataPoints2[dataPoints2.length-1]: dataPoints1[dataPoints1.length-1];
	const first = channel?	dataPoints2[1]: dataPoints1[1];
	const newPoint = new Point( buf ) ;
	if( !prior ) {
	} else {
		const newPoint = new Point( buf );
		let low = newPoint.tick - prior.tick;
		newPoint.del = low;
		if( first ) newPoint.ddel = newPoint.del - first.del;
		newPoint.tdel = prior.tdel + newPoint.ddel;
	}
		
	if( channel ) {
		dataPoints2.push( newPoint );
		if( dataPoints2.length > 10000 ) {
			dataPoints2.slice( 0, 5000 );
		}
	} else {
		dataPoints1.push( newPoint );
		if( dataPoints1.length > 10000 ) {
			dataPoints1.slice( 0, 5000 );
		}
	}

	
}

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
			pushData( 0, u32 );
			//if( priorTick[0] === 0 )
			//	priorTick[0] = tick;
			const thisdel = ((tick-priorTick[0]-priorDel)* NANOS/1000);
			if( priorDel )
			totdel1 += thisdel;
			console.log( "clock 0:", u32[0].toString(16),u32[1].toString(16), u32[2].toString(2).padStart(32, '0'), tick.toString(16), tick-priorTick[0], (thisdel).toFixed(3), totdel1.toFixed(3) );
			if( firstTick0 )
			priorDel = tick - priorTick[0];
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
			pushData( 1, u32 );
			//if( priorTick[1] === 0 )
			//	priorTick[1] = tick;

			let phase = countPhase( u32[2] ) * NANOS/PHASES;

			const thisdel = (tick-priorTick[1]-priorDel2)* NANOS/1000 + (phase/(1000));


			if( priorDel2 )
				totdel2 += thisdel;
			console.log( "clock 1:", u32[0].toString(16),u32[1].toString(16)
			                      , u32[2].toString(2).padStart(32, '0')
			                      , phase/(1000)
			                      , tick*NANOS
			                      , priorDel2
			                      , (tick-priorTick[1])*NANOS
			                      , ( thisdel).toFixed(3)
			                      , totdel2.toFixed(3) );
			//console.log( "clock 1:", u32, u32[2].toString(2).padStart(32, '0'), tick, tick-priorTick[1], nowTick-firstTick1, (((nowTick-firstTick1)/(tick-priorTick[1]))*1000000000).toFixed(3) );
			if( firstTick1 )
				priorDel2 = tick - priorTick[1];
			firstTick1 = nowTick;
			
			priorTick[1] = tick;
			//reset2();
		}
		else console.log( String.fromCharCode.apply(null, msg) );
	}
}