
import {JSOX} from "/node_modules/jsox/lib/jsox.mjs"
import {MyProtocol,protocol} from "./protocol.js"


MyProtocol.on( "open", function (a, b){
	console.log( "Connection:", this, a, b );
//	protocol.send( { op:"getData" } );
} );

protocol.on( "data", ( msg ) =>{
	clockFrames.length = 0;
	if( msg.dataPoints1.length > 1000 )
		msg.dataPoints1 = msg.dataPoints1.slice( msg.dataPoints1.length - 1000 );
	if( msg.dataPoints2.length > 1000 )
		msg.dataPoints2 = msg.dataPoints2.slice( msg.dataPoints2.length - 1000 );
	//console.log( "DataaPoints:", msg.dataPoints2 );
	let n = 0;
	while( true ) {
		let A=null,B=null;
		if( n < msg.dataPoints1.length ) {
			A = msg.dataPoints1[n];
		}
		if( n < msg.dataPoints2.length ) {
			B = msg.dataPoints2[n];
		}
		if( A || B ) clockFrames.push( {d:(A?A.tick:0n) - (B?B.tick:0n), c1:A?A.tick:0n, c2:B?B.tick:0n } );
		else break;
		n++;
	}
//	console.log( "Frames:", clockFrames );
	if( clockFrames.length ) {
		s1 = clockFrames[0].c1;
		s2 = clockFrames[0].c2;
	}  else s1 = s2 = 0n;
	update();
} );


setInterval( ()=>{
	protocol.send( { op:"getData" } );
}, 10000 );

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );


const ctx = canvas.getContext( '2d' );


let last_draw_time = 0;
let animate = false;
const runT = 100;

const names = [];
const IoR = 0.000293;
const stdPressure = 1013.25;

const values = {
	Now : -1,
	C : Math.PI*2,
	VoverC : 1,
	Velocity : 1,
	Scale : 100,
	Pressure : 1000,
	PressureVariance : 30,
	Smooth : false,
}

const bias = {
	C : 1,
}

const scalars = {
	C : 1,
}

const sliders = {
};


const controls = document.getElementById( "controls" );
let s1 = BigInt( 32_000_000_000_000n );
let s2 = BigInt( 31_200_000_000_000n );

let clockFrames = [];
let clock1delta = [];
let clock2delta = [];
let clock1deltaSmooth = [];
let clock2deltaSmooth = [];



//----------------------

addSpan( "C", 1000, 1, 0, 10/1000, "C" );
addSpan( "Length(ft)", 1000, 10000, 0, 100, "Scale" );
addSpan( "Time Scalar", 1000, 0.1, 0, 0.01, "TScale" );
addSpan( "Velocity", 1000, 0, 0, 2/1000, "Velocity" );
addSpan( "Velocity max", 1000, 0.001, 0, 1/10000, "VelocityMax" );
addSpan( "Time of Day(start)", 1000, 0, 0, 2*Math.PI/1000, "ToD" );
addSpan( "Time of Day(align)", 1000, 0, 0, 2*Math.PI/1000, "ToDA" );
addSpan( "Time of Day(low pressure)", 1000, 2*Math.PI/24 * (24/6), 0, 2*Math.PI/1000, "ToDP" );
addSpan( "Pressure", 100000, 1000, 0, 1, "Pressure" );
addSpan( "Pressure Variance", 1000, 30, 0, 4/10, "PressureVariance" );
addSpan( "View Res", 1000, 1, 1, 100/1000, "ViewRes" );
addSpan( "View Span", 1000, 200, 0, 5*runT/1000, "ViewSpan" );
addSpan( "Now", 1000, 0, -runT/2, runT/1000, "Now" );
//addSpan( "Speed", 1000, "speed", 0, 2*Math.PI/1000, "Speed" );

//- - - - - - - - - - - - - - 

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = animate;
chkLblNow.addEventListener( "input", update );

const spanChkNow = document.createElement( "label" );
spanChkNow.textContent = " |Animate";
spanChkNow.appendChild( chkLblNow );
controls.appendChild( spanChkNow );


const chkSmooth = document.createElement( "input" );
chkSmooth.setAttribute( "type", "checkbox" );
chkSmooth.checked = animate;
chkSmooth.addEventListener( "input", update );

const spanSmooth = document.createElement( "label" );
spanSmooth.textContent = " |Smooth";
spanSmooth.appendChild( chkSmooth );
controls.appendChild( spanSmooth );
//----------------------


function addSpan( text, range, initial, bias_, scalar, suffix ) {

	values[suffix] = initial;
	scalars[suffix] = scalar;
	bias[suffix] = bias_;
	let span;


	names.push( suffix );

	span = document.createElement( "span" );
	span.textContent = text;
	controls.appendChild( span );

	const sliderC = document.createElement( "input" );
	sliders["slider"+suffix] = sliderC;
	sliderC.setAttribute( "type", "range" );
	controls.appendChild( sliderC );
	sliderC.addEventListener( "input", update );
	sliderC.setAttribute( "max", range );
	sliderC.value = (values[suffix] - bias_)/ scalar ;
	sliderC.style.width="250px";

	const spanC = document.createElement( "span" );
	sliders["span"+suffix] = spanC;
	spanC.textContent = values[suffix].toFixed(3);
	controls.appendChild( spanC );

	span = document.createElement( "br" );
	controls.appendChild( span );

}

function sliderRead( suffix ) {
	const val = bias[suffix] + Number( sliders["slider"+suffix].value ) * scalars[suffix];
	values[suffix] = val;
	sliders["span"+suffix].textContent = val.toFixed(3);
}



update();




function update( evt ) {
	for( let name of names ) {
		sliderRead( name );
	}
	values.VoverC = values.Velocity/values.C;
	const wasAnimate = animate;
	animate = chkLblNow.checked;
	values.Smooth = chkSmooth.checked;

	sliders.spanVelocityMax.textContent = (values.VelocityMax).toFixed(5);	
	sliders.spanToD.textContent = '' + Math.floor( values.ToD / (Math.PI*2) * 24 ) + ":" + (''+Math.floor( (values.ToD / (Math.PI*2) * (24*60)) % 60 )).padStart( 2, '0' )
	sliders.spanToDA.textContent = '' + Math.floor( values.ToDA / (Math.PI*2) * 24 ) + ":" + (''+Math.floor( (values.ToDA / (Math.PI*2) * (24*60)) % 60 )).padStart( 2, '0' )
	sliders.spanToDP.textContent = '' + Math.floor( values.ToDP / (Math.PI*2) * 24 ) + ":" + (''+Math.floor( (values.ToDP / (Math.PI*2) * (24*60)) % 60 )).padStart( 2, '0' )

	if( !animate ) {
		//values.Now = Number(values.Now)/100*runT/2;
		sliders.spanNow.textContent = values.Now.toFixed(2);
	}


	let commonClock = 0;
	let commonClock2 = 0;
	const sendDelay = 1_500_000n;
	const recvDelay = 2_500_000n; // these are fixed offsets...

	// start in a random ToD
	//const firstT = Math.random()*Math.PI*2;
	const firstT = values.ToDA - values.ToD;//Math.random()*Math.PI*2;

		
	if( !clockFrames.length ) {
		for( let i = 0; i < 200; i++ ) {
			// assume 1 second pulses in pico-second tick counts.
			// this could be any constant value.
			const sendJitter = recvDelay + BigInt( Math.floor( 5000* Math.random() ) );
			const recvJitter = sendDelay + BigInt( Math.floor( 5000* Math.random() ) );
			const sendJitter2 = recvDelay + BigInt( Math.floor( 5000* Math.random() ) );
			const recvJitter2 = sendDelay + BigInt( Math.floor( 5000* Math.random() ) );
			
			clockFrames.push( { c1:s1+BigInt(i)*1_010_000_000_000n+ sendJitter + recvJitter
			                  , c2:s2+BigInt(i)*1_000_000_000_000n+ sendJitter2 + recvJitter2 } );
		}
	   
		for( let i = 0; i < clockFrames.length; i++ ) {
			const frame = clockFrames[i];
			const T = i / 100 * 2*Math.PI;
			// this could be smarter - and track any arbitrary direction... since 
			// The alignment doesn't actually get to return back to 0.
			const VScale= (values.VelocityMax-values.Velocity)*Math.sin( firstT + T );
			const PV = (values.PressureVariance)*Math.sin( values.ToDP - values.ToD  + T )
			
			//ctx.lineTo( i * 1000 / clockFrames.length, 500 + 100000 *( IoR * (values.Pressure + PV)/stdPressure - IoR*values.Pressure/stdPressure) );
	   
			// each frame, clock1 and clock2 happen, and a delay is added based on time of day.
			// each clock has a (potentially) different delay.
			// fixed scalar to pico seconds (1000)
			// the amount of space to ocver ( Scale)
			// How fast light covers that space( C + Velocity )
			//console.log( "Scalar: ", values.Pressure, 1/( 1+IoR * (values.Pressure + PV)/stdPressure ) );
			frame.c1 += BigInt( Math.floor(1000*values.Scale/((values.C /( 1+IoR * (values.Pressure + PV)/stdPressure ))+ VScale)) );
			frame.c2 += BigInt( Math.floor(1000*values.Scale/((values.C /( 1+IoR * (values.Pressure + PV)/stdPressure ))- VScale)) );
			//console.log( "Time: ", frame.c1, values.Scale/((values.C /( 1+IoR * (values.Pressure + PV)/stdPressure ))+ VScale) );
		}
	}

	clock1delta.length = 0;
	clock2delta.length = 0;

	let Tdelta = 0;
	commonClock = (clockFrames[1].c1 - clockFrames[0].c1);
	for( var i = 1; i < clockFrames.length; i++ ) {
		const basedel = Number(clockFrames[i].c1-clockFrames[i-1].c1);
		const del = (basedel - Number(commonClock))/1000;
		Tdelta += del;
		//commonClock = basedel;
		clock1delta.push( Tdelta );
	}
	//console.log( "common clock1:", commonClock, clock1delta[clock1delta.length-1], clock1delta.length );
	const delta1offset = clock1delta[clock1delta.length-1] / clock1delta.length;
	for( var i = 0; i < clock1delta.length; i++ ) {
		clock1delta[i] = clock1delta[i] - delta1offset * i;		
		clock1deltaSmooth[i] = clock1delta[i];
	}
	if( values.Smooth ) {
		clock1deltaSmooth[0] = clock1delta[0];
		for( let j = 0; j < 10; j++ )
			for( var i = 1; i < clock1delta.length-1; i++ ) {
				clock1deltaSmooth[i] = (clock1deltaSmooth[i-1]+clock1deltaSmooth[i]+clock1deltaSmooth[i+1])/3;		
			}
	}

	let Tdelta2 = 0;
	commonClock2 = clockFrames[1].c2 - clockFrames[0].c2;
	for( var i = 1; i < clockFrames.length; i++ ) {
		const basedel = Number(clockFrames[i].c2-clockFrames[i-1].c2);
		const del = (basedel - Number(commonClock2))/1000;
		Tdelta2 += del;
		//commonClock2 = basedel;
		//console.log( "del:", del, Tdelta2 );
		clock2delta.push( Tdelta2 );
	}
	const delta2offset = clock2delta[clock2delta.length-1] / clock2delta.length;
	for( var i = 0; i < clock2delta.length; i++ ) {
		clock2delta[i] = clock2delta[i] - delta2offset * i;		
		clock2deltaSmooth[i] = clock2delta[i];
	}
	if( values.Smooth ) {
		for( let j = 0; j < 10; j++ )
			for( var i = 1; i < clock2delta.length-1; i++ ) {
				clock2deltaSmooth[i] = (clock2deltaSmooth[i-1]+clock2deltaSmooth[i]+clock2deltaSmooth[i+1])/3;		
			}
	}
console.log( "Delta:", Tdelta, Tdelta2 );


	if( !wasAnimate ) draw();


}
function draw(  ) {

	const pos = values.Now * values.Velocity * values.Scale;
	const gamma = 1/Math.sqrt( values.C*values.C - values.Velocity*values.Velocity );
	ctx.clearRect( 0, 0, 1000, 1000 );


	//---------------------------------------------
	// new processing loop...
	//   

	let stream1 = [];
	let stream2 = [];

	let pFrame = null;
	let firstDel1 = null;
	let pFrame1 = null;
	let firstDel2 = null;
	let pFrame2 = null;
	for( let frame of clockFrames ) {
		if( !pFrame ) {
			pFrame = frame;
		}
		// first del = 0.
		const delFrame1 = {from:pFrame.c1, to:frame.c1
					, del : (pFrame1?pFrame1.del:0n)+frame.c1-pFrame.c1-(firstDel1?firstDel1.del:0n) };
		stream1.push( delFrame1 );
		if( !firstDel1 && delFrame1.del )
			firstDel1 = delFrame1;
		else pFrame1 = delFrame1;

		const delFrame2 = {from:pFrame.c2, to:frame.c2
					, del : (pFrame2?pFrame2.del:0n)+(frame.c2-pFrame.c2-(firstDel2?firstDel2.del:0n)) };
		stream2.push( delFrame2 );
		if( !firstDel2 && delFrame2.del )
			firstDel2 = delFrame2;
		else pFrame2 = delFrame2;

		pFrame = frame;
		//console.log( "Dels:", delFrame1.del, delFrame2.del );
	}
	if( !firstDel1 ) firstDel1 = stream1[0];

	const bias1 = Number(stream1[stream1.length-1].del) / (stream1.length-1);
	const bias2 = Number(stream2[stream2.length-1].del) / (stream2.length-1);
	//console.log( "common clock1:", firstDel1.del, stream1[stream1.length-1].del, (stream1.length-1) );
	for( let f =1; f < stream1.length; f++ ) stream1[f].del -= BigInt(Math.floor(bias1*(f-1)));
	for( let f =1; f < stream2.length; f++ ) stream2[f].del -= BigInt(Math.floor(bias2*(f-1)));
	firstDel1.del = 0;
	firstDel2.del = 0;

	function getDel( stream, tick ) {
		let from = 0;
		let to = stream.length-1;
		while( to >= from ) {
			const pos = (to+from)>>1;
			if( tick < stream[pos].from ) {
				to = pos-1;
			} else if( tick > stream[pos].to ) {
				from = pos+1;
			} else {
				const del = Number(tick - stream[pos].from)/Number(stream[pos].to-stream[pos].from);
				if( del > 0.5 ) {
					if( pos < (stream.length-1) ) {
						const v1 = Number(stream[pos].del);
						const v2 = Number(stream[pos+1].del);
			//console.log( "Scale del1:", pos, del, 1-(del-0.5), del, v1, v2 );
			//ctx.stroke();ctx.beginPath(); ctx.strokeStyle = "red";
						return (v1*(1-(del-0.5))+v2*(del-0.5))/1000
					} 
					return Number(stream[pos].del)/1000;
				} else {
					if( pos > (0) ) {
						const v1 = Number(stream[pos-1].del);
						const v2 = Number(stream[pos].del);
			//console.log( "Scale del2:", pos, del, 0.5-del, 0.5+del, v1, v2 );
			//ctx.stroke();ctx.beginPath(); ctx.strokeStyle = "green";
						return (v1*(0.5-del)+v2*(0.5+del))/1000;
					} 
					return Number(stream[pos].del)/1000;
				}
			} 
		}
		return 0;
	}
	//------------------------------------------------

/*
	ctx.beginPath();
	ctx.strokeStyle = "#FFF";
	ctx.moveTo( 0, 500+0  );
	let pdel;
	let del = 0;
	for( let i = 0; i < values.ViewRes; i++ ) {
		del = values.TScale*Number( stream1[i].del )/1000;
		ctx.moveTo( (i-Math.abs(values.Now/10))*1000/values.ViewRes, 500+  pdel );
		ctx.lineTo( i*1000/values.ViewRes, 500+  del );
		ctx.arc( i*1000/values.ViewRes, 500+  del, 3, 0, Math.PI*2 );
	}
	ctx.stroke();
*/
	ctx.beginPath();
	ctx.strokeStyle = "#F33";
	ctx.moveTo( 0, 500+0  );
	let del = 0;
	let pdel;
	for( let i = 0; i < values.ViewSpan; i+=values.ViewRes/10 ) {
		pdel = del;
		del = values.TScale*getDel( stream1, s1+BigInt(Math.floor( (i+values.Now*10) * 1_000_000_000_000)) )
		ctx.moveTo( (i-values.ViewRes/10)*1000/values.ViewSpan, 500+  pdel );
		ctx.lineTo( i*1000/values.ViewSpan, 500+  del );
		//ctx.arc( i*1000/50, 500+  del, 3, 0, Math.PI*2 );
	}
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "#3F3";
	ctx.moveTo( 0, 500+0  );
	del = 0;
	
	for( let i = 0; i < values.ViewSpan; i+=values.ViewRes/10 ) {
		pdel = del;
		del = values.TScale*getDel( stream2, s1+BigInt(Math.floor( (i+values.Now*10) * 1_000_000_000_000)) )
		//console.log( "del:", del );
		ctx.moveTo( (i-values.ViewRes/10)*1000/values.ViewSpan, 500+  pdel );
		ctx.lineTo( i*1000/values.ViewSpan, 500+  del );
		//ctx.arc( i*1000/50, 500+  del, 3, 0, Math.PI*2 );
	}
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "#ff3";
	ctx.moveTo( 0, 500 );
	for( var i = 0; i < values.ViewSpan; i+=values.ViewRes/10 ) {
		const del1 = values.TScale*getDel( stream1, s1+BigInt(Math.floor( (i+values.Now*10) * 1_000_000_000_000)) )
		const del2 = values.TScale*getDel( stream2, s1+BigInt(Math.floor( (i+values.Now*10) * 1_000_000_000_000)) )
		ctx.lineTo( i * 1000 / (values.ViewSpan), 500 
		          + (del1-del2)
		           );
		//console.log( "total Del:", values.TScale*Tdelta, values.TScale*Tdelta2  );
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "#333";
	for( let i = -25; i < 25; i++ ) {
		ctx.moveTo( 0, 500+i * values.TScale  );
		ctx.lineTo( 1000, 500+i * values.TScale );
	}
	ctx.stroke();




	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 0.5;
	ctx.moveTo( 0, 500 );
	for( var i = 0; i < clock1delta.length; i++ ) {
		//console.log( "red time:", clockFrames[i].c1-clockFrames[i-1].c1, Number(clockFrames[i].c1-clockFrames[i-1].c1-commonClock) );
		ctx.lineTo( i * 1000 / (clock1delta.length-1), 500 + values.TScale * clock1delta[i] );
		
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo( 0, 1000 );
	const range1 = Number(clockFrames[clockFrames.length-1].c1)/clockFrames.length;
	
	for( var i = 0; i < clockFrames.length; i++ ) {
		//console.log( "red time:", clockFrames[i].c1-clockFrames[i-1].c1, Number(clockFrames[i].c1-clockFrames[i-1].c1-commonClock) );
		ctx.lineTo( i * 1000 / (clockFrames.length-1), 1000 - ( Number(clockFrames[i].c1) - range1*i ) / 1000000000 );
		//ctx.lineTo( i * 1000 / (clockFrames.length-1), 1000 - 1000*Number(clockFrames[i].c1)/range1 );
		
	}
	ctx.stroke();

	if( values.Smooth ) {
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 0.5;
	ctx.moveTo( 0, 500 );
	for( var i = 0; i < clock1delta.length; i++ ) {
		//console.log( "red time:", clockFrames[i].c1-clockFrames[i-1].c1, Number(clockFrames[i].c1-clockFrames[i-1].c1-commonClock) );
		ctx.lineTo( i * 1000 / (clock1delta.length-1), 500 + values.TScale * clock1deltaSmooth[i] );
		
	}
	ctx.stroke();
	}

	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo( 0, 500 );
//	commonClock2 = clockFrames[1].c2 - clockFrames[0].c2;
//	let Tdelta2 = 0;
	for( var i = 0; i < clock2delta.length; i++ ) {
		//Tdelta2 += Number(clockFrames[i].c2-clockFrames[i-1].c2-commonClock2)/1000;
		ctx.lineTo( i * 1000 / (clock2delta.length-1), 500 + values.TScale * clock2delta[i] );
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo( 0, 1000 );
	const range2 = Number(clockFrames[clockFrames.length-1].c2)/clockFrames.length;
	
	for( var i = 0; i < clockFrames.length; i++ ) {
		//console.log( "red time:", clockFrames[i].c1-clockFrames[i-1].c1, Number(clockFrames[i].c1-clockFrames[i-1].c1-commonClock) );
		ctx.lineTo( i * 1000 / (clockFrames.length-1), 1000 - ( Number(clockFrames[i].c2) - range2*i ) / 1000000000 );
		
	}
	ctx.stroke();

	if( values.Smooth ) {
		ctx.beginPath();
		ctx.strokeStyle = "green";
		ctx.moveTo( 0, 500 );
		for( var i = 0; i < clock2delta.length; i++ ) {
			ctx.lineTo( i * 1000 / (clock2delta.length-1), 500 + values.TScale * clock2deltaSmooth[i] );
		}
		ctx.stroke();
	}


	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.moveTo( 0, 500 );
	let Tdelta = 0;
	let Tdelta2 = 0;
	for( var i = 0; i < clock1delta.length; i++ ) {
		ctx.lineTo( i * 1000 / (clock1delta.length-1), 500 
		          + values.TScale* (clock1delta[i] - clock2delta[i])
		           );
		//console.log( "total Del:", values.TScale*Tdelta, values.TScale*Tdelta2  );
	}
	ctx.stroke();

	if( values.Smooth ) {
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.moveTo( 0, 500 );
		Tdelta = 0;
		Tdelta2 = 0;
		for( var i = 0; i < clock1delta.length; i++ ) {
			ctx.lineTo( i * 1000 / (clock1delta.length-1), 500 
			          + values.TScale* (clock1deltaSmooth[i] - clock2deltaSmooth[i])
			           );
			//console.log( "total Del:", values.TScale*Tdelta, values.TScale*Tdelta2  );
		}
		ctx.stroke();
	}
	

	if( animate ) 
		requestAnimationFrame( draw );

	return;

}

draw();

