
const testSize= 200000;
const canvas = document.getElementById( "testSurface" );

const w = canvas.width;
const h = canvas.height;


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

//----------------------

addSpan( "C", 1000, 0.5, 0, 10/1000, "C" );
addSpan( "Length(ft)", 1000, 10000, 0, 100, "Scale" );
addSpan( "Time Scalar", 1000, 15, 0, 1, "TScale" );
addSpan( "Velocity", 1000, 0, -0.99999, 1.99998/1000, "Velocity" );
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

const body = [];

function update( evt ) {
	for( let name of names ) {
		sliderRead( name );
	}
	values.VoverC = values.Velocity/values.C;
	values.Velocity = values.Velocity * values.C;
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

	ctx.clearRect( 0, 0, w, h );

	ctx.lineWidth = 1;
	ctx.strokeStyle = "white";
	
	ctx.beginPath();
	ctx.moveTo( 10, h-1 );
	ctx.lineTo( 10, 0 );
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo( 100, 100 );
	ctx.lineTo( 1300, 100 );
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo( 100, 200 );
	ctx.lineTo( 1300, 200 );
	ctx.stroke();

	let g = (values.C*values.C-values.Velocity*values.Velocity)/(values.C*values.C);
	let del1 = g * 50/(values.C+values.Velocity);
	let del2 = g * 50/(values.C-values.Velocity);

	ctx.beginPath();
	ctx.strokeStyle = "#800"
	for( let m = 0; m < 5; m+=0.1 ) {
		ctx.moveTo( 100 +m*(del1+del2), 200 );
		ctx.lineTo( 100 +m*del1 + (m+1)*del2, 100 );
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "#080"
	for( let m = 0; m < 5; m+=0.1 ) {
		ctx.moveTo( 100 +m*del1 + (m+1)*del2, 100 );
		ctx.lineTo( 100 +(m+1)*(del1+del2), 200 );
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "#fff";
	ctx.moveTo( 100, 200 );
	for( let m = 0; m < 5; m++ ) {
		ctx.lineTo( 100 +m*(del1+del2), 200 );
		ctx.lineTo( 100 +m*del1 + (m+1)*del2, 100 );
		ctx.lineTo( 100 +(m+1)*(del1+del2), 200 );
	}
	ctx.stroke();

	for( let m = 0; m < 108/2; m++ ) {
		ctx.beginPath();
		ctx.moveTo( 10-3, h-1 - m*20 );
		ctx.lineTo( 10+3, h-1 - m*20 );
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo( 20-3, h-1 - m*20 + Math.cos( m/(Math.PI*2) )*10 );
		ctx.lineTo( 20+3, h-1 - m*20 + Math.cos( m/(Math.PI*2) )*10 );
		ctx.stroke();

	}

	if( animate ) 
		requestAnimationFrame( draw );

	return;

}

draw();

