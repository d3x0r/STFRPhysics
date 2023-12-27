
const testSize= 200000;
const canvas = document.getElementById( "testSurface" );


const ctx = canvas.getContext( '2d' );


let last_draw_time = 0;
let animate = false;
const runT = 4;

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

//----------------------

addSpan( "C", 1000, 1, 0, 10/1000, "C" );
addSpan( "Length(ft)", 1000, 10000, 0, 100, "Scale" );
addSpan( "Time Scalar", 1000, 15, 0, 1, "TScale" );
addSpan( "Velocity", 1000, 0, 0, 2/1000, "Velocity" );
addSpan( "Velocity max", 1000, 0.001, 0, 1/10000, "VelocityMax" );
addSpan( "Time of Day(start)", 1000, 0, 0, 2*Math.PI/1000, "ToD" );
addSpan( "Time of Day(align)", 1000, 0, 0, 2*Math.PI/1000, "ToDA" );
addSpan( "Time of Day(low pressure)", 1000, 2*Math.PI/24 * (24/6), 0, 2*Math.PI/1000, "ToDP" );
addSpan( "Pressure", 100000, 1000, 0, 1, "Pressure" );
addSpan( "Pressure Variance", 1000, 30, 0, 4/10, "PressureVariance" );
addSpan( "Now", 1000, -1, -runT/2, runT/1000, "Now" );
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

const body = [];

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

	if( !wasAnimate ) draw();


}
function draw(  ) {

	const pos = values.Now * values.Velocity * values.Scale;
	const gamma = 1/Math.sqrt( values.C*values.C - values.Velocity*values.Velocity );
	const firstT = values.ToDA - values.ToD;//Math.random()*Math.PI*2;
	ctx.clearRect( 0, 0, 1000, 1000 );

	let commonClock = 0;
	let commonClock2 = 0;
	let clockFrames = [];
	let clock1delta = [];
	let clock2delta = [];
	let clock1deltaSmooth = [];
	let clock2deltaSmooth = [];
	const sendDelay = 1_500_000n;
	const recvDelay = 2_500_000n; // these are fixed offsets...

	// start in a random ToD
	//const firstT = Math.random()*Math.PI*2;

	

	for( let i = 0; i < 200; i++ ) {
		// assume 1 second pulses in pico-second tick counts.
		// this could be any constant value.
		const sendJitter = recvDelay + BigInt( Math.floor( 5000* Math.random() ) );
		const recvJitter = sendDelay + BigInt( Math.floor( 5000* Math.random() ) );
		const sendJitter2 = recvDelay + BigInt( Math.floor( 5000* Math.random() ) );
		const recvJitter2 = sendDelay + BigInt( Math.floor( 5000* Math.random() ) );
		clockFrames.push( { c1:BigInt(i)*1_000_000_000_000n+ sendJitter + recvJitter
		                  , c2:BigInt(i)*1_000_000_000_000n+ sendJitter2 + recvJitter2 } );
	}

	ctx.beginPath();
	ctx.strokeStyle = "#333";
	for( var i = -25; i < 25; i++ ) {
		ctx.moveTo( 0, 500+i * values.TScale  );
		ctx.lineTo( 1000, 500+i * values.TScale );
	}
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "purple";
	ctx.moveTo( 0, 500 );
	for( let i = 0; i < clockFrames.length; i++ ) {
		const frame = clockFrames[i];
		const T = i / 100 * 2*Math.PI;
		// this could be smarter - and track any arbitrary direction... since 
		// The alignment doesn't actually get to return back to 0.
		const VScale= (values.VelocityMax-values.Velocity)*Math.sin( firstT + T );
		const PV = (values.PressureVariance)*Math.sin( values.ToDP - values.ToD  + T )
		
		ctx.lineTo( i * 1000 / clockFrames.length, 500 + 100000 *( IoR * (values.Pressure + PV)/stdPressure - IoR*values.Pressure/stdPressure) );
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
	ctx.stroke();

	let Tdelta = 0;
	commonClock = (clockFrames[1].c1 - clockFrames[0].c1);
	for( var i = 1; i < clockFrames.length; i++ ) {
		Tdelta += Number(clockFrames[i].c1-clockFrames[i-1].c1-commonClock)/1000;
		clock1delta.push( Tdelta );
	}
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
		Tdelta2 += Number(clockFrames[i].c2-clockFrames[i-1].c2-commonClock2)/1000;
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

	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 0.5;
	ctx.moveTo( 0, 500 );
	for( var i = 0; i < clock1delta.length; i++ ) {
		//console.log( "red time:", clockFrames[i].c1-clockFrames[i-1].c1, Number(clockFrames[i].c1-clockFrames[i-1].c1-commonClock) );
		ctx.lineTo( i * 1000 / (clock1delta.length-1), 500 + values.TScale * clock1delta[i] );
		
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
	Tdelta = 0;
	Tdelta2 = 0;
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

