


let A = 10;
let B = 100;
let C = 1;
let V = 0.85;

let frames = [];

class Sender {
	msgq = [];
	times = [];
	recvtime = 0;
	sendtime = 0;
	time = 0;
	time_ping = 0;
	transDel = 1;
	sync = false;
	roundTrip = 0;
	syndel = 0;
	constructor( name, time, transDel ) {
		console.log( "aaa", transDel );
		this.name = name;
      this.time = this.recvtime = this.sendtime = time;
      this.transDel = transDel;
      this.times.push( {time} );
   }
	recv() {
		if( !this.msgq.length ) return false;
		for( let msg of this.msgq ) {
			// step clocks when messages are received.

			console.log( this.time.toFixed(3), this.name, "handles:", msg );
			console.log( "Actual time delta:", this.time - msg.from.time );

			switch( msg.op ) {
			case "ping0":
				{
					const del = this.sendTo( msg.from, { op:"pong0", fromAt: msg.at } );
					// step both times by transmission time.
					console.log( "pong0 increment", del );
					this.time += del;
					msg.from.time += del;
					console.log( "After ping0 times:", sa.time, sb.time );
				}	
				break;
			case "pong0":
				{
					this.roundTrip = this.time - msg.fromAt;
					const del = this.sendTo( msg.from, { op:"ping1", fromAt: msg.at } );
					console.log( "ping1 increment", del );
					// step both clocks by third ping
					this.time += del;
					msg.from.time += del;
					console.log( "Set rOundtrip:", this.name, this.roundTrip );
					console.log( "After pong0 times:", sa.time, sb.time );
				}
				break;
			case "ping1":
				this.roundTrip = this.time - msg.fromAt;
				console.log( "Set rOundtrip:", this.name, this.roundTrip, this.time, msg.fromAt );
				this.time = this.sendtime = this.recvtime = msg.at + this.roundTrip / 2;
				console.log( "After ping1 times:", sa.time, sb.time, msg.at );
				break;
			case "sec":
				console.log( "Received at:", this.time, msg.at, this.time - msg.at, this.roundTrip/2  );	
				if( this.time < msg.at ) {
					// this time is before the other side even sent the message...
					// therefore this time has to be advanced at least by msg.at-msg.time
					this.syndel = -(msg.at - this.time);
					console.log( "total Del?", ( this.roundTrip/2 + this.syndel ) );
					this.time = msg.expectAt + this.syndel;// + this.roundTrip/2);
					console.log( "Updated time?", this.time );
					const del = this.sendTo( msg.from, { op: "syndel", syndel: this.syndel } );
					this.time += del;
					msg.from.time += del;
				}
				break;
			case "syndel":
				{
					this.syndel = msg.syndel;
					console.log( "what should this be?", this.time );
				}
				break;
			}
		}
		this.msgq.length = 0;
		return true;
	}
	sendToSec( recv, msg ) {
		console.log( "now:", this.time );
		let nextSec = 1-(this.time%1);
		console.log( "next second:", nextSec, this.time, "+", nextSec, "=", this.time + nextSec );
		this.time += nextSec; // skip for delay to send
		recv.time += nextSec; // also skip for delay to send
		msg.expectAt = this.time + (this.roundTrip/2+this.syndel);
		console.log( "Send To At:", this.time, recv.time, recv.time - this.roundTrip/2 );
		recv.recvtime += nextSec;
		this.sendtime += nextSec;
		const del = this.sendTo( recv, msg );
		return del;
	}
	sendTo( recv, msg ) {
		msg.from = this;
		msg.at = this.time;
		msg.transDel = this.transDel;
		recv.msgq.push( msg );
		//recv.recv();
		return this.transDel;
	}
	tick( t ) {
		console.log( "Tick send:", this.sendtime, "recv:", this.recvtime, t );
		this.sendtime += t;
	}
	
}

const sa = new Sender( "A", A, 1/(C-V) );
const sb = new Sender( "B", B, 1/(C+V) );



console.log( "A sends", A );

let st = 0;

st = sa.sendTo( sb, { op:"ping0" } );
// step both times by transmission time.
console.log( "ping0 increment:", st );
sa.time += st;
sb.time += st;

while( sa.recv() || sb.recv() );

//console.log( "A started ping trips..." );
//console.log( "sa 0:", JSON.stringify( sa, null, "\t" ).replaceAll( '"','') );
//console.log( "sb 0:", JSON.stringify( sb, null, "\t" ).replaceAll( '"','') );

/*
st = sb.sendToSec( sa, { op:"sec", skipSendClock: true } );
console.log( "Send To Increment:", st );
sa.time += st;
sb.time += st;
sa.recv();

console.log( "A sent second ticks" );
console.log( "sa 1:", JSON.stringify( sa, null, "\t" ).replaceAll( '"','') );
console.log( "sb 1:", JSON.stringify( sb, null, "\t" ).replaceAll( '"','') );
*/

st = sa.sendToSec( sb, { op:"sec", skipSendClock: true } );
sa.time += st;
sb.time += st;
while( sa.recv() || sb.recv() );

console.log( "B sent second ticks" );
console.log( "sa 1:", JSON.stringify( sa, null, "\t" ).replaceAll( '"','') );
console.log( "sb 1:", JSON.stringify( sb, null, "\t" ).replaceAll( '"','') );

st = sa.sendToSec( sb, { op:"sec", skipSendClock: true } );
sa.time += st;
sb.time += st;
while( sa.recv() || sb.recv() );

console.log( "B sent second ticks" );
console.log( "sa 2:", JSON.stringify( sa, null, "\t" ).replaceAll( '"','') );
console.log( "sb 2:", JSON.stringify( sb, null, "\t" ).replaceAll( '"','') );

sa.sendToSec( sb, { op:"sec", skipSendClock: true } );
sb.recv();

console.log( "A sent second ticks" );
console.log( "sa 1:", JSON.stringify( sa, null, "\t" ).replaceAll( '"','') );
console.log( "sb 1:", JSON.stringify( sb, null, "\t" ).replaceAll( '"','') );





