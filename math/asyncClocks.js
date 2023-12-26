
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

addSpan( "C", 1000, 1, 0, 2/1000, "C" );
addSpan( "Light Second Length", 1000, 150, 0, 1, "Scale" );
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


function aberration( angle ) {
	const speed = values.Velocity;
	const a = Math.acos( (Math.cos(angle)+speed/values.C)/(1+speed/values.C*Math.cos(angle)) );
	return a;
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
	const sendDelay = 1_500_000n;
	const recvDelay = 2_500_000n; // these are fixed offsets...

	// start in a random ToD
	//const firstT = Math.random()*Math.PI*2;

	

	for( let i = 0; i < 100; i++ ) {
		// assume 1 second pulses in pico-second tick counts.
		// this could be any constant value.
		clockFrames.push( { c1:BigInt(i)*1_000_000_000_000n+ sendDelay + recvDelay
		                  , c2:BigInt(i)*1_000_000_000_000n+ sendDelay + recvDelay } );
	}

	ctx.strokeStyle = "purple";
	ctx.beginPath();
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
		console.log( "Scalar: ", values.Pressure, 1/( 1+IoR * (values.Pressure + PV)/stdPressure ) );
		frame.c1 += BigInt( Math.floor(1000 * values.Scale/((values.C /( 1+IoR * (values.Pressure + PV)/stdPressure ))+ VScale)) );
		frame.c2 += BigInt( Math.floor(1000 * values.Scale/((values.C /( 1+IoR * (values.Pressure + PV)/stdPressure ))- VScale)) );
	}
	ctx.stroke();
	commonClock = clockFrames[1].c1 - clockFrames[0].c1;

	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 0.5;

	ctx.moveTo( 0, 500 );
	for( var i = 1; i < 100; i++ ) {
		ctx.lineTo( i * 1000 / 100, 500 + Number(clockFrames[i].c1-clockFrames[i-1].c1-commonClock) );
		
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo( 0, 500 );
	commonClock2 = clockFrames[1].c2 - clockFrames[0].c2;
	for( var i = 1; i < 100; i++ ) {
		ctx.lineTo( i * 1000 / 100, 500 + Number(clockFrames[i].c2-clockFrames[i-1].c2 - commonClock2 ) );
	}
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.moveTo( 0, 500 );
	for( var i = 1; i < 100; i++ ) {
		const T = i / 100 * 2*Math.PI;
		ctx.lineTo( i * 1000 / 100, 500 
		          + Number(clockFrames[i].c1-clockFrames[i-1].c1-commonClock) 
		          - Number(clockFrames[i].c2-clockFrames[i-1].c2-commonClock2) );
	}
	ctx.stroke();


	if( animate ) 
		requestAnimationFrame( draw );

	return;

}

draw();

