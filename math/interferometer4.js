
const testSize= 200000;
const canvas = document.getElementById( "testSurface" );


const ctx = canvas.getContext( '2d' );


let last_draw_time = 0;
let animate = false;
let ab_test = false;
let galaxy = false;
let timeDilate = false;
let clockwise = false;
const runT = 4;
const G = 3;
const names = [];

const values = {
	Now : -1,
	C : Math.PI*2,
	VoverC : 1,
	Velocity : 1,
	Scale : 100,
}

const bias = {
	C : 1,
}

const scalars = {
	C : 1,
}

const stringifiers = {

}

const sliders = {
};

const keyFrames = [
	{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 }
]

const l = {
	photons : null,
}

const keyFramesLength = [ 0,0,0,0];
const keyFrameTimes = [ -2,-1,0,1,2];
const keyFrameTimes2 = [ -2,-1,0,1,2];

const keyFrames_left = [
	{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 }
]
const keyFramesLength_left = [ 0,0,0,0];
const keyFrameTimes_left = [ -2,-1,0,1,2];

const controls = document.getElementById( "controls" );


const dcorn = [ { x: -0.637, y:-0.777}, {x:0.777, y:0.637}, {x:0.637, y:0.777}, {x:-0.777, y:-0.637}];
const hcorn = [ { x: -1, y:-0.1}, {x:1, y:-0.1}, {x:1, y:0.1}, {x:-1, y:0.1}];
const vcorn = [ { x: -0.1, y:-1}, {x:0.1, y:-1}, {x:0.1, y:1}, {x:-0.1, y:1}];

for( let p of dcorn ) { p.x = p.x/2; p.y = p.y/2 }
for( let p of hcorn ) { p.x = p.x/2; p.y = p.y/2 }
for( let p of vcorn ) { p.x = p.x/2; p.y = p.y/2 }

let lengthContract = 1;

//----------------------

addSpan( "C", 1000, 1, 0, 2/1000, "C" );
//sliders.sliderC.style.display = "none";
addSpan( "Light Second Length", 1000, 150, 0, 1, "Scale" );
addSpan( "Velocity", 1000, 0.4, 0, 1/1000, "Velocity" );
addSpan( "Direction", 2000, 0, -Math.PI*2, (Math.PI*2)/1000, "Direction", (val)=>(val/Math.PI).toFixed(3)+"pi" );
addSpan( "Angle", 2000, 0, -Math.PI*2, (Math.PI*2)/1000, "Angle", (val)=>(val/Math.PI).toFixed(3)+"pi" );

addSpan( "Now", 2550, -1, -runT/2, runT/1000, "Now" );
addSpan( "Frequency", 1000, 7, 0.1, 14/1000, "Frequency" );
//addSpan( "Speed", 1000, "speed", 0, 2*Math.PI/1000, "Speed" );

//- - - - - - - - - - - - - - 

const totalBlock = document.createElement( "div" );
controls.appendChild( totalBlock )
const spanTotalLabel = document.createElement( "span" );
spanTotalLabel.textContent = "Total Path Lengths:";
totalBlock.appendChild( spanTotalLabel );

let span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotal = document.createElement( "span" );
sliders.spanTotal.textContent = "Left: 0 Up: 0";
sliders.spanTotal.style.position = "relative";
sliders.spanTotal.style.left = "6em";
totalBlock.appendChild( sliders.spanTotal );

span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotalT = document.createElement( "span" );
sliders.spanTotalT.textContent = "Left: 0 Up: 0";
sliders.spanTotalT.style.position = "relative";
sliders.spanTotalT.style.left = "6em";
totalBlock.appendChild( sliders.spanTotalT );

span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotal2 = document.createElement( "span" );
sliders.spanTotal2.textContent = "Left: 0 Up: 0";
sliders.spanTotal2.style.position = "relative";
sliders.spanTotal2.style.left = "6em";
totalBlock.appendChild( sliders.spanTotal2 );

span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotal2T = document.createElement( "span" );
sliders.spanTotal2T.textContent = "Left: 0 Up: 0";
sliders.spanTotal2T.style.position = "relative";
sliders.spanTotal2T.style.left = "6em";
totalBlock.appendChild( sliders.spanTotal2T );

span = document.createElement( "br" );
totalBlock.appendChild( span );


//- - - - - - - - - - - - - - 

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = true;
chkLblNow.addEventListener( "input", update );

const spanChkNow = document.createElement( "label" );
spanChkNow.textContent = "Animate";
spanChkNow.appendChild( chkLblNow );
controls.appendChild( spanChkNow );

//- - - - - - - - - - - - - - 

const chkLblAbTest = document.createElement( "input" );
chkLblAbTest.setAttribute( "type", "checkbox" );
chkLblAbTest.checked = false;
chkLblAbTest.addEventListener( "input", update );

const spanChkAbTest = document.createElement( "label" );
spanChkAbTest.textContent = "Aberration Test";
spanChkAbTest.appendChild( chkLblAbTest );
controls.appendChild( spanChkAbTest );

//- - - - - - - - - - - - - - 

const chkLblGalaxy = document.createElement( "input" );
chkLblGalaxy.setAttribute( "type", "checkbox" );
chkLblGalaxy.checked = true;
chkLblGalaxy.addEventListener( "input", update );

const spanChkGalaxy = document.createElement( "label" );
spanChkGalaxy.textContent = "Galaxy";
spanChkGalaxy.appendChild( chkLblGalaxy );
controls.appendChild( spanChkGalaxy );

//- - - - - - - - - - - - - - 

const chkLblDilate = document.createElement( "input" );
chkLblDilate.setAttribute( "type", "checkbox" );
chkLblDilate.checked = true;
chkLblDilate.addEventListener( "input", update );

const spanChkDilate = document.createElement( "label" );
spanChkDilate.textContent = "Dilate";
spanChkDilate.appendChild( chkLblDilate );
controls.appendChild( spanChkDilate );

//- - - - - - - - - - - - - - 

const chkLblClockwise = document.createElement( "input" );
chkLblClockwise.setAttribute( "type", "checkbox" );
chkLblClockwise.checked = true;
chkLblClockwise.addEventListener( "input", update );

const spanChkClockwise = document.createElement( "label" );
spanChkClockwise.textContent = "Clockwise";
spanChkClockwise.appendChild( chkLblClockwise );
controls.appendChild( spanChkClockwise );

//----------------------


function addSpan( text, range, initial, bias_, scalar, suffix, toString ) {

	values[suffix] = initial;
	scalars[suffix] = scalar;
	bias[suffix] = bias_;
	stringifiers[suffix] = toString;
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
	if( stringifiers[suffix])
		sliders["span"+suffix].textContent = stringifiers[suffix](val);
	else
		sliders["span"+suffix].textContent = val.toFixed(3);
}


function aberration( angle ) {
	const speed = values.Velocity;
	const a = Math.acos( (Math.cos(angle)+speed/values.C)/(1+speed/values.C*Math.cos(angle)) );
	return a;
}

// returns the aberrated angle for a transmission direction (angle) with frame moving in (direction)
// Velocity and C are taken from global common variables.
function aberration_aa( angle, direction, V, C ) {
	let da = angle - direction;
	const mod = Math.abs( Math.floor( da / (Math.PI) ) ) & 1;
	let neg = mod?-1:1;
	const a = neg*Math.acos( (Math.cos(da)+V/C)/(1+V/C*Math.cos(da)) ) + direction;
	return a;
}


// returns the angle that the transmission would have to be from to get sent to the target angle (b)
// (d) is the direction the frame is moving in general at speed (V)
// (C) is the speed of light constant
// reverse calculation courtesy of Wolfram Alpha
//    https://www.wolframalpha.com/input?i=b+%3D+arccos%28+%28cos%28a-d%29%2BV%2FC%29%2F%281%2BV%2FC*cos%28a-d%29%29+%29+%2B+d+solve+for+a
function aberration_bb( b, d, V, C ) { 
	if( V >= C ) V = C-0.000001;
	const da = b - d;
	const mod = Math.abs( Math.floor( da / (Math.PI) ) ) & 1;
	let neg = mod?-1:1;
	const a = neg*Math.acos((V - C* Math.cos(b - d))/(V *Math.cos(b - d) - C)) + d ;
	return a;
}

// returns the frequency shift seen for a transmission in some direction (angle) 
// from a frame moving in (direction) at velocity (V) and the speed of light (C).
function freqShift( angle, direction, V, C ) {
	// V/C 
	if( V >= C ) V = C-0.000001;
	const ab = aberration_aa( angle, direction, V, C );
	const f = 1/( ( timeDilate?1/Math.sqrt( 1-V*V/(C*C) ):1 ) * Math.sqrt( 1+ V*V/(C*C) - 2*V/C*Math.cos( ab-direction ) ) );
	return f;
}

function aberration2( Xox, Xoy, Xx, Xy ) {
	const forward = { x : Math.cos(values.Direction) * values.Velocity, y: -Math.sin(values.Direction) * values.Velocity };

	let delx = Xx-Xox;
	let dely = Xy-Xoy;
	let rx = Xx;
	let ry = Xy;

	let len2 = delx*delx + dely*dely;
	let Vdot = delx * forward.x + dely*forward.y;
	const Vcrsz = dely * forward.x - delx * forward.y;
	const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
	//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
	if( values.Velocity > 0.00001 ) {
		let len = Math.sqrt( len2 );
		let Vlen = values.Velocity;
		let norm = len*Vlen;
		let CosVDot = Vdot/norm;
		let baseAng = Math.acos( CosVDot );
		const delAng = Math.acos( ( CosVDot + Vlen/values.C)/(1 + Vlen/values.C * CosVDot))-baseAng;
		if( Math.abs( delAng) > 0.00001 ) {
			const c = Math.cos(delAng );
			const s= Math.sin( delAng);
			let vx = delx, vy=dely;
			let qz = Math.sign( Vcrs );
			rx = Xox + vx*c + s*(-qz * vy) + 0;
			ry = Xoy + vy*c + s*(qz * vx) + 0;						
		}
	}
	return { x:rx, y:ry };
}

function aberration2a( Xox, Xoy, Xx, Xy ) {
	const forward = { x : Math.cos(values.Direction) * values.Velocity, y: -Math.sin(values.Direction) * values.Velocity };

	let delx = Xx-Xox;
	let dely = Xy-Xoy;

	let len2 = delx*delx + dely*dely;
	let Vdot = delx * forward.x + dely*forward.y;
	const Vcrsz = dely * forward.x - delx * forward.y;
	const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
	//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
	if( values.Velocity > 0.00001 ) {
		let len = Math.sqrt( len2 );
		let Vlen = values.Velocity;
		let norm = len*Vlen;
		let CosVDot = Vdot/norm;
		let baseAng = Math.acos( CosVDot );
		//console.log( "baseAng:", baseAng )
		let qz = Math.sign( Vcrs );
		const delAng = -qz*(Math.acos( ( CosVDot + Vlen/values.C)/(1 + Vlen/values.C * CosVDot))-baseAng);
		return delAng;
	}
	return 0;
}




function update( evt ) {
	const was_direction = values.Direction;
	const was_frequency = values.Frequency;


	for( let name of names ) {
		sliderRead( name );
	}
	values.Velocity *= values.C;
	if( values.Velocity === values.C ) {
		values.Velocity -= 0.00001;
		sliders.spanVelocity.textContent = values.Velocity;		
	}
	
	if( was_frequency != values.Frequency || was_direction != values.Direction )  {
		l.photons = null;
	}
	if( !l.photons ) makePhotons();

	if( values.Velocity >= values.C ) values.Velocity = values.C - 0.0000000001;
	const gamma = 1/Math.sqrt( values.C*values.C - values.Velocity*values.Velocity );
	const Lgamma =  Math.sqrt(values.C*values.C - values.Velocity*values.Velocity)/values.C;
	lengthContract = Lgamma;

	values.VoverC = values.Velocity/values.C;
	sliders.spanNow.textContent = values.Now.toFixed(3) + " Local Time:" + ((values.Now+2)/gamma -2).toFixed(3);
	//if( values.Now >= (runT/2 + values.Velocity)) values.Now = (runT/2 + values.Velocity);
	//values.Now = values.Now;
	const was_animate = animate;
	animate = chkLblNow.checked;
	ab_test = chkLblAbTest.checked;
	galaxy = chkLblGalaxy.checked;
	timeDilate = chkLblDilate.checked;
	clockwise = chkLblClockwise.checked;
        
	if( !animate ) 
		ctx.clearRect( 0, 0, 1000, 1000 );
	//const Lgamma = (values.C*values.C - values.Velocity*values.Velocity)/values.C;
	const angle = Math.PI/2 + aberration( Math.PI/2 );

	const c = Math.cos( values.Direction );
	const s = -Math.sin( values.Direction );

	const offset = contract( 0, 1 );

	for( let x = 0; x < 360; x += 2 ) {
		const ab = aberration2( 900, 100, 900 + Math.cos( x / 180 * Math.PI  ) * 90, 100  + Math.sin( x / 180 * Math.PI  ) * 90 );
		//console.log( "ab is:", ab );
		ctx.beginPath();
		ctx.strokeStyle = `hsl(${x+values.Direction*180/Math.PI} 100% 50%)`;
		ctx.moveTo( 900, 100 );
		ctx.lineTo( ab.x, ab.y );
		ctx.stroke();
	}
	//const ab = aberration2( 500, 500, 500, 500 - values.Scale );
	//const ab = aberration2( 500, 500, 500, 500 + values.Scale );
	//const ab = aberration2( 500, 500, 500+ values.Scale, 500  );
	
	//const ab = aberration2( 500, 500, 500- values.Scale, 500  );
	/*
	console.log( "ab is:", ab );
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo( 500+3, 500 );
	ctx.lineTo( ab.x+3, ab.y );
	ctx.stroke();
	*/


	const angle_0 = Math.PI/2 + aberration2a( 500, 500, 500, 500 - values.Scale  );
	const angle_3 =  aberration2a( 500, 500, 500, 500 + values.Scale  ) - Math.PI/2;
	const angle_4 =  aberration2a( 500, 500, 500 + values.Scale, 500  );
	const angle_l2 = aberration2a( 500, 500, 500 - values.Scale, 500  ) + Math.PI;

	//console.log( "A0(1,2) : ", angle_0 / (Math.PI) );
	//console.log( "Al2 : ", angle_l2 / (Math.PI) );
	//console.log( "A3 : ", angle_3 / (Math.PI) );
	//console.log( "A4 : ", angle_4 / (Math.PI) );

	//const angle0a = -aberration2a( 500, 500, 500- values.Scale, 500   );
	//const angle0a = aberration2a( 500, 500, 500+ values.Scale, 500   );
	//const angle0a = aberration2a( 500, 500, 500, 500 + values.Scale  ) - Math.PI/2;
	//console.log( "ab is:", angle_0, angle_3, angle_4, angle_l2 );
	/*
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.moveTo( 500, 500 );
	ctx.lineTo( 500 + values.Scale*Math.cos(angle_0), 500 - values.Scale*Math.sin(angle_0) );
	ctx.stroke();
	*/
/*
	const angle0 = values.Direction< Math.PI/2 ? (Math.PI/2- values.Direction)
	             : values.Direction< Math.PI ?  (values.Direction - Math.PI/2)
	             : values.Direction< Math.PI*3/2 ?  (values.Direction - Math.PI*1/2)
	             :   (Math.PI*5/2 - values.Direction );
	const angle0a = aberration( angle0  ) 
					* (values.Direction < Math.PI/2 ? (1)
					: values.Direction < Math.PI ? ( -1 ) 
					: values.Direction < Math.PI*3/2 ? ( -1 ) 
					: 1 
					)
					+ (values.Direction < Math.PI/2 ? (values.Direction)
					: values.Direction < Math.PI ? ( +values.Direction ) 
					: values.Direction < Math.PI*3/2 ? ( +values.Direction ) 
					:  ( +values.Direction - Math.PI*2 ) )
	console.log( "Angles: ", angle0.toFixed(3), angle0a.toFixed(3))
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo( 500, 500 );
	ctx.lineTo( 500 + Math.cos( angle0 ) * values.Scale, 500 - Math.sin( angle0  ) * values.Scale );
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.moveTo( 500, 500 );
	ctx.lineTo( 500 + Math.cos( angle0a ) * values.Scale, 500 - Math.sin( angle0a ) * values.Scale );
	ctx.stroke();
*/
	keyFrameTimes[0] = -runT/2;
	keyFrames[0].x = offset.x - runT/2 * values.Velocity  * c;
	keyFrames[0].y = offset.y - runT/2 * values.Velocity  * s;
	const c0 = contract( 0, -1 );
	keyFrameTimes2[0] = keyFrameTimes[0];

	keyFrameTimes[1] = realTimeToObservedTimeXYZ2( keyFrameTimes[0], values.Velocity, keyFrames[0].x, keyFrames[0].y, 0
			, values.Velocity, keyFrames[0].x + c0.x, keyFrames[0].y + c0.y, 0, c, s, c, s );
	//console.log( "T0_1:", keyFrameTimes);
	keyFrameTimes2[1] = keyFrameTimes[0] + (keyFrameTimes[1] - keyFrameTimes[0]) / gamma;

	let delt = (keyFrameTimes[1] - keyFrameTimes[0])*values.C;

	keyFrames[1].x = keyFrames[0].x + delt*Math.cos(angle_0);
	keyFrames[1].y = keyFrames[0].y - delt*Math.sin(angle_0);

	const c1 = contract( 0, -1 );
	keyFrameTimes[2] = realTimeToObservedTimeXYZ2( keyFrameTimes[1], values.Velocity, keyFrames[1].x, keyFrames[1].y, 0
		, values.Velocity, keyFrames[1].x + c1.x, keyFrames[1].y + c1.y, 0, c, s, c, s );
	keyFrameTimes2[2] = keyFrameTimes[1] + (keyFrameTimes[2] - keyFrameTimes[1]) / gamma;
	delt = (keyFrameTimes[2] - keyFrameTimes[1])*values.C;
	keyFrames[2].x = keyFrames[1].x + delt * Math.cos(angle_0);
	keyFrames[2].y = keyFrames[1].y - delt * Math.sin(angle_0);
	

	const c2 = contract( 0, 1 );
	keyFrameTimes[3] = realTimeToObservedTimeXYZ2( keyFrameTimes[2], values.Velocity, keyFrames[2].x, keyFrames[2].y, 0
		, values.Velocity, keyFrames[2].x + c2.x, keyFrames[2].y + c2.y, 0, c, s, c, s );
	keyFrameTimes2[3] = keyFrameTimes[2] + (keyFrameTimes[3] - keyFrameTimes[2]) / gamma;
	delt = (keyFrameTimes[3] - keyFrameTimes[2])*values.C;
	keyFrames[3].x = keyFrames[2].x + delt * Math.cos( angle_3 );
	keyFrames[3].y = keyFrames[2].y - delt * Math.sin( angle_3 );

	const c3 = contract( 1, 0 );
	keyFrameTimes[4] = realTimeToObservedTimeXYZ2( keyFrameTimes[3], values.Velocity, keyFrames[3].x, keyFrames[3].y, 0
		, values.Velocity, keyFrames[3].x + c3.x, keyFrames[3].y + c3.y, 0, c, s, c, s );
	keyFrameTimes2[4] = keyFrameTimes[3] + (keyFrameTimes[4] - keyFrameTimes[3]) / gamma;
	delt = (keyFrameTimes[4] - keyFrameTimes[3])*values.C;
	keyFrames[4].x = keyFrames[3].x + delt * Math.cos( angle_4 );
	keyFrames[4].y = keyFrames[3].y - delt * Math.sin( angle_4 );


	keyFrames_left[0].x = keyFrames[0].x;
	keyFrames_left[0].y = keyFrames[0].y;
	keyFrameTimes_left[0] = keyFrameTimes[0];

	keyFrames_left[1].x = keyFrames[1].x;
	keyFrames_left[1].y = keyFrames[1].y;
	keyFrameTimes_left[1] = keyFrameTimes[1];

	const cl2 = contract( -1, 0 );
	keyFrameTimes_left[2] = realTimeToObservedTimeXYZ2( keyFrameTimes_left[1], values.Velocity, keyFrames_left[1].x, keyFrames_left[1].y, 0
		, values.Velocity, keyFrames_left[1].x + cl2.x, keyFrames_left[1].y + cl2.y, 0, c, s, c, s );
	delt = (keyFrameTimes_left[2] - keyFrameTimes_left[1])*values.C;

	keyFrames_left[2].x = keyFrames_left[1].x + delt * Math.cos(angle_l2);
	keyFrames_left[2].y = keyFrames_left[1].y - delt * Math.sin(angle_l2);

	keyFrameTimes_left[3] = keyFrameTimes[3];
	keyFrames_left[3].x = keyFrames[3].x;
	keyFrames_left[3].y = keyFrames[3].y;

	keyFrameTimes_left[4] = keyFrameTimes[4];
	keyFrames_left[4].x = keyFrames[4].x;
	keyFrames_left[4].y = keyFrames[4].y;

	//console.log( "T : ", -values.Velocity, keyFrameTimes_left, keyFrameTimes, keyFrameTimes2 );
	for( let i = 0; i < 4; i++ ) {
		const x = keyFrames[1+i].x-keyFrames[0+i].x;
		const xx = x*x;
		const y = keyFrames[1+i].y-keyFrames[0+i].y;
		const yy = y*y;
		keyFramesLength[i] = Math.sqrt(xx+yy);
		//console.log( "Length:", Math.sqrt( xx+yy));
	}
	//console.log( "Length Up  :", keyFramesLength[0] + keyFramesLength[1] + keyFramesLength[2] + keyFramesLength[3] );

	for( let i = 0; i < 4; i++ ) {
		const x = keyFrames_left[1+i].x-keyFrames_left[0+i].x;
		const xx = x*x;
		const y = keyFrames_left[1+i].y-keyFrames_left[0+i].y;
		const yy = y*y;
		keyFramesLength_left[i] = Math.sqrt(xx+yy);
		//console.log( "Length:", Math.sqrt( xx+yy));
	}

	//console.log( "Length Left:", keyFramesLength_left[0] + keyFramesLength_left[1] + keyFramesLength_left[2] + keyFramesLength_left[3] );

	const first3 = ( keyFramesLength[0] + keyFramesLength[1] + keyFramesLength[2] ).toFixed(3);
	const first_left3 = ( keyFramesLength_left[0] + keyFramesLength_left[1] + keyFramesLength_left[2] ).toFixed(3);
	const total = ( keyFramesLength[0] + keyFramesLength[1] + keyFramesLength[2] + keyFramesLength[3] );
	sliders.spanTotal.textContent = "Up: " + keyFramesLength.map(a=>a.toFixed(3)).join("+") + "=" + total.toFixed(3) + " first 3:" + first3;
	let base = keyFrameTimes[0];
	let vels1 = [];
	let tot = 0;
	for( let i = 1; i < 5; i++ ) {
		vels1.push(  ((keyFrameTimes[i] - keyFrameTimes[i-1]) ) );
		tot += vels1[vels1.length-1];
	}                                  
	//vels1.push(tot);
	sliders.spanTotalT.textContent = "Up(2way): " + (vels1[1]+vels1[2]).toFixed(3) + " ("+(vels1[1]).toFixed(3)+"+"+(vels1[2]).toFixed(3)+")";
				//+ keyFrameTimes.map((a,i)=>a.toFixed(3)).join(" & ") + " Len/Time:" + vels1.map((a,i)=>a.toFixed(3)).join(" & ") + " = " + tot.toFixed(3) ;
	//sliders.spanTotalT.textContent = "Up(T): " + keyFrameTimes.map(a=>(Lgamma*a).toFixed(3)).join(" @ ") + "(" + (total/(keyFrameTimes[4]+2)).toFixed(3) + ")" ;

	sliders.spanTotal2.textContent = 
		"Left: " + keyFramesLength_left.map(a=>a.toFixed(3)).join("+" ) + "=" + ( keyFramesLength_left[0] + keyFramesLength_left[1] + keyFramesLength_left[2] + keyFramesLength_left[3] ).toFixed(3)  + " first 3:" + first_left3;
	base = keyFrameTimes_left[0];
	vels1 = [];
	tot = 0;
	for( let i = 1; i < 5; i++ ) {
		vels1.push(  ((keyFrameTimes_left[i] - keyFrameTimes_left[i-1]) ) );
		tot += vels1[vels1.length-1];
	}                                  
	//vels1.push(tot);
	//sliders.spanTotal2T.textContent = "Left(T): " + keyFrameTimes_left.map((a,i)=>(keyFramesLength_left[i]/(Lgamma*a)).toFixed(3)).join(" @ ") ;
	sliders.spanTotal2T.textContent = "Left(2way): " + (vels1[1]+vels1[2]).toFixed(3) + " ("+(vels1[1]).toFixed(3)+"+"+(vels1[2]).toFixed(3)+")" + " Local:" +  (Lgamma*(vels1[1]+vels1[2])).toFixed(3);
			//+ keyFrameTimes_left.map((a,i)=>a.toFixed(3)).join(" & ") + " Len/Time:" + vels1.map((a,i)=>a.toFixed(3)).join(" & ") + " = " + tot.toFixed(3) ;

		{
			let photon = l.photons;
			//console.log( "----------------" );
			while( photon ) {
				photon.update();
				photon = photon.next;
			}
		
		}


	if( !was_animate )
		draw();

	function contract( x, y ) {
		
		let posVelDot = ( x*c + y * s );
		let posDirx = c * posVelDot;
		let posDiry = s * posVelDot;

		if( values.Velocity > 0.0) {
			x = ( x - posDirx) + posDirx*Lgamma;
			y = ( y - posDiry) + posDiry*Lgamma;
		}
		return { x, y };
	}

}


function drawFrequency( freq, x, y, xto, yto, from, until, to, invert ) {
	let T;
	if( to > 10 ) to = 10;
	if( from > until ) return;
	const delx = xto-x;
	const dely = yto-y;
	const len = Math.sqrt( delx*delx + dely*dely );
	const delt = to-from;
	let tanx = (dely)/len;
	let tany = -(delx)/len;
	const step = 0.005;
	for( T = 0; T < (to-from); T += step ) {
		
		const s = (invert?-1:1)*20*Math.sin( freq * (until-from-T) * Math.PI*2 );
		const s2 = (invert?-1:1)*20*Math.sin( freq * (until-from-(T+step)) * Math.PI*2 );
		if( T >= (until-from) || T < (until-from-1/freq ) ) {
			ctx.moveTo( (x*(1-T/delt)) + xto*(T/delt), (y*(1-T/delt)) + yto*(T/delt) );
			ctx.lineTo( (x*(1-(T+step)/delt)) + xto*((T+step)/delt), (y*(1-(T+step)/delt)) + yto*((T+step)/delt) );
		} else {
			ctx.moveTo( tanx*s+(x*(1-T/delt)) + xto*(T/delt), tany*s + (y*(1-T/delt)) + yto*(T/delt) );
			ctx.lineTo( tanx*s2+(x*(1-(T+step)/delt)) + xto*((T+step)/delt), tany*s2 + (y*(1-(T+step)/delt)) + yto*((T+step)/delt) );
		}
		ctx.stroke();
	}
}




function draw(  ) {
	if( animate ) 	ctx.clearRect( 0, 0, 1000, 1000 );

	//drawFrequency( values.Frequency * lengthContract, 500 - Math.cos(values.Direction)*300, 400 - Math.sin(values.Direction)*300, 500+Math.cos(values.Direction)*300, 400 + Math.sin(values.Direction)*300, -2, values.Now, 2 );
	if( ab_test)
	{
		ctx.beginPath();
		ctx.strokeStyle = "green" ;
		ctx.moveTo( 200, 800 );
		const dx = 100 * Math.cos( values.Angle );
		const dy = -100 * Math.sin( values.Angle );
		ctx.lineTo( 200 + dx, 800 + dy );
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "blue" ;
		ctx.moveTo( 200, 800 );
		const drx = 100 * Math.cos( values.Direction );
		const dry = -100 * Math.sin( values.Direction );
		ctx.lineTo( 200 + drx, 800 + dry );
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "red" ;
		ctx.moveTo( 200, 800 );
		const ab2 = aberration_bb( values.Angle, values.Direction, values.Velocity, values.C );

		const dab2x = 100 * Math.cos( ab2 );
		const dab2y = -100 * Math.sin( ab2 );
		ctx.lineTo( 200 + dab2x, 800 + dab2y );
		ctx.stroke();


		/*
		ctx.beginPath();
		ctx.strokeStyle = "#0FF" ;
		ctx.arc( 250 + values.C * 50 * Math.cos( values.Angle ), 750 - values.C * 50 * Math.sin( values.Angle ), 10, 0, Math.PI*2 );
		ctx.stroke();


		ctx.beginPath();
		ctx.strokeStyle = "green" ;
		ctx.arc( 250 + values.Velocity*50 * Math.cos( values.Direction ), 750 - values.Velocity*50 * Math.sin( values.Direction ), 10, 0, Math.PI*2 );
		ctx.stroke();
		*/
		const fs = freqShift( aberration_bb( values.Angle, values.Direction, values.Velocity, values.C )
		                    , values.Direction, values.Velocity, values.C );
		//const ab = aberration_aa( values.Angle, values.Direction, values.Velocity, values.Direction );
		ctx.fillStyle = "white";
		ctx.font = "22px Arial";

		ctx.fillText( "Frequency Shift:"+ fs.toFixed(3), 100, 900  );
		console.log( "----------------------" );
		for( let w = 0; w < 10; w++ ) {
			ctx.beginPath();
			ctx.strokeStyle = "yellow" ;
			ctx.arc( 200 + w*1/(values.Frequency*fs)*values.Scale * Math.cos( values.Angle ), 800 - w*1/(values.Frequency*fs)*values.Scale * Math.sin( values.Angle ), 5, 0, Math.PI*2 );
			ctx.stroke();
			if( galaxy )
			{
				/*
				for( let r = 0; r < 360; r += 10 ) {
					const ang = r / 180 * Math.PI;
					const ang2 = r / 180 * Math.PI + ( clockwise?-Math.PI/2 : Math.PI/2);
					const deab = aberration_bb( values.Angle, ang2, values.Velocity*G/( (w/9+1)*(w/9+1) ), values.C );
					const V = values.Velocity*G/( (w/9+1)*(w/9+1) );
				ctx.beginPath();
					ctx.strokeStyle = "#FFF"
					ctx.moveTo( 200 + 20 * w * Math.cos( ang ), 800 - 20 * w * Math.sin( ang ) );
					ctx.lineTo( 200 + 20 * w * Math.cos( ang ) + 30*V*Math.cos( ang2), 800 - 20 * w * Math.sin( ang ) - 30*V*Math.sin( ang2) );
					ctx.stroke();

				ctx.beginPath();
					ctx.strokeStyle = "#FF0"
					ctx.moveTo( 200 + 20 * w * Math.cos( ang ), 800 - 20 * w * Math.sin( ang ) );
					ctx.lineTo( 200 + 20 * w * Math.cos( ang ) + 30*V*Math.cos( deab), 800 - 20 * w * Math.sin( ang ) - 30*V*Math.sin( deab) );	
					ctx.stroke();
				ctx.beginPath();
					ctx.strokeStyle = "#0FF"
					ctx.moveTo( 200 + 20 * w * Math.cos( ang ), 800 - 20 * w * Math.sin( ang ) );
					ctx.lineTo( 200 + 20 * w * Math.cos( ang ) + 30*V*Math.cos( values.Angle), 800 - 20 * w * Math.sin( ang ) - 30*V*Math.sin( values.Angle) );
					ctx.stroke();
				}
				*/
				ctx.strokeStyle = "#f0f";
				let px, py;
				for( let r = 0; r <= 360; r += 10 ) {
					const ang0 = values.Angle + r / 180 * Math.PI;
					const ang = values.Angle + r / 180 * Math.PI + ( clockwise?-Math.PI/2 : Math.PI/2);
					const deab = aberration_bb( values.Angle, ang, values.Velocity*G/( (w/9+1)*(w/9+1) ), values.C );
					const fs = freqShift( deab, ang, values.Velocity*G/( (w/9+1)*(w/9+1) ), values.C );
				ctx.beginPath();
		ctx.strokeStyle = `hsl(${120+(fs-1)*10*180/Math.PI} 100% 50%)`;
					//console.log( "Angles and fs:", w, r, ang.toFixed(3), deab.toFixed(3), fs.toFixed(3), (values.Scale*w/(values.Frequency*fs)).toFixed(3) );
	/*
					if( !r ) ctx.moveTo( 200 + w * 1/(values.Frequency*fs)*values.Scale * Math.cos( ang0 )
						, 800 - w * 1/(values.Frequency*fs)*values.Scale * Math.sin( ang0 ) );
					else ctx.lineTo( 200 + w * 1/(values.Frequency*fs)*values.Scale * Math.cos( ang0 )
						, 800 - w * 1/(values.Frequency*fs)*values.Scale * Math.sin( ang0 ) );
		*/
					if( !r ) {px = 200 + w * 1/(values.Frequency*fs)*values.Scale * Math.cos( ang0 )
						py = 800 - w * 1/(values.Frequency*fs)*values.Scale * Math.sin( ang0 );
					} else {
						const nx =  200 + w * 1/(values.Frequency*fs)*values.Scale * Math.cos( ang0 );
						const ny = 800 - w * 1/(values.Frequency*fs)*values.Scale * Math.sin( ang0 );
						ctx.moveTo( px, py);
						ctx.lineTo(nx, ny );
						px = nx;
						py = ny;
					}
				ctx.stroke();
				}
				//ctx.closePath ();
				//ctx.stroke();
			}
			else	
			{
				ctx.beginPath();
				ctx.strokeStyle = "#f0f";
				for( let r = 0; r < 360; r += 5 ) {
					const ang = r / 180 * Math.PI;
					const deab = aberration_bb( ang, values.Direction, values.Velocity, values.C );
					const fs = freqShift( deab, values.Direction, values.Velocity, values.C );
					if( !r ) ctx.moveTo( 200 + w * 1/(values.Frequency*fs)*values.Scale * Math.cos( ang )
						, 800 - w * 1/(values.Frequency*fs)*values.Scale * Math.sin( ang ) );
					else ctx.lineTo( 200 + w * 1/(values.Frequency*fs)*values.Scale * Math.cos( ang )
						, 800 - w * 1/(values.Frequency*fs)*values.Scale * Math.sin( ang ) );
				}
				ctx.closePath ();
				ctx.stroke();
			}
		}

	}

	// dilation gamma
	const gamma = values.C/Math.sqrt( values.C*values.C - values.Velocity*values.Velocity );
	const dx = Math.cos( values.Direction );
	const dy = -Math.sin( values.Direction );
	const posx = dx*values.Now * values.Velocity * values.Scale;
	const posy = dy*values.Now * values.Velocity * values.Scale;
	// contraction gamma
	const Lgamma =  Math.sqrt(values.C*values.C - values.Velocity*values.Velocity)/values.C;  // cc-vv/cc * c/sqrt(cc-vv) time-accurate [parabola]

	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;


	function drawRect( x, ox, y, oy, mode ){
		const forward = { x : Math.cos(values.Direction), y: -Math.sin(values.Direction) };
		const corners = mode==1?vcorn:mode==0?hcorn:dcorn;
		const g1 = Lgamma;


		let posVelDot = ( ox*forward.x + oy * forward.y );
		let posDirx = forward.x * posVelDot;
		let posDiry = forward.y * posVelDot;

		if( values.Velocity > 0.0) {
			ox = ( ox - posDirx) + posDirx*g1;
			oy = ( oy - posDiry) + posDiry*g1;
		}

/*
	drawFrequency( values.Frequency * values.C/(values.Velocity+values.C)
			, 500 - 300, 400
			, 500  +300, 400, -2, values.Now, keyFrameTimes[1] );

	drawFrequency( values.Frequency * values.C/(values.C-values.Velocity)
			, 500 - 300, 450
			, 500  +300, 450, -2, values.Now, keyFrameTimes[1] );
*/
		ctx.save();
		ctx.beginPath();
		ctx.translate( x+ox, y+oy );
		/*
		ctx.moveTo( values.Scale * corners[0].x, values.Scale * corners[0].y );
		ctx.lineTo( values.Scale * corners[1].x, values.Scale * corners[1].y );
		ctx.lineTo( values.Scale * corners[2].x, values.Scale * corners[2].y );
		ctx.lineTo( values.Scale * corners[3].x, values.Scale * corners[3].y );
		ctx.lineTo( values.Scale * corners[0].x, values.Scale * corners[0].y );
		ctx.stroke();
		*/
		
		let first = true;		
		const Vlen2 = values.Velocity * values.Velocity;
		let sx0 = 0;
		let sy0 = 0;
		//let dot = {x:0,y:0};
		for( let n = 0; n < 4; n++ ) {

			let startPosX = corners[n].x*values.Scale;
			let startPosY = corners[n].y*values.Scale;
		
			let posVelDot = ( startPosX*forward.x + startPosY * forward.y );
			let posDirx = forward.x * posVelDot;
			let posDiry = forward.y * posVelDot;
	
			if( values.Velocity > 0.0) {
				startPosX = ( startPosX - posDirx) + posDirx*g1;
				startPosY = ( startPosY - posDiry) + posDiry*g1;
			}
	


			let rx = startPosX, ry=startPosY;
			if( n === 0 ){ sx0 = rx; sy0 = ry; } // where to close at.
			if( first ) ctx.moveTo( rx, ry )
			else ctx.lineTo( rx, ry );
			first = false;
		}
		ctx.lineTo( sx0, sy0 );
		ctx.stroke();

		ctx.restore();
	}

	drawRect( 500+ posx,0, 500+ posy, 0, 2 );

	drawRect( 500+ posx,0 , 500+posy,+ values.Scale*(1), 0 );

	drawRect( 500+ posx,0 , 500+posy,-values.Scale*(1), 0 );

	drawRect( 500+ posx, + values.Scale*(1), 500+ posy,0, 1 );

	drawRect( 500+ posx, - values.Scale*(1), 500+ posy,0, 1 );

	{
		let photon = l.photons;
		while( photon ) {
			photon.draw();
			photon = photon.next;
		}
		
	}

	/*
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.arc( 500 + values.Scale*keyFrames_left[0].x, 500 + values.Scale*keyFrames_left[0].y
		, (values.Now - -2)*values.Scale * values.C, 0, 2*Math.PI);
	ctx.stroke();
	*/

	{
		const localTime = values.Now;
		//console.log( "now:", localTime );
		ctx.beginPath();
		ctx.strokeStyle = "white";
		let i = 0;
		for( let t = 0; t < 4; t++) {
			const tm =  keyFrameTimes_left[t];
			//console.log( "compare:", tm, keyFrameTimes_left[t+1] )
			if( keyFrameTimes_left[4] < localTime ) break;
			if( t === 3 || ( localTime >= tm && keyFrameTimes_left[t+1] > localTime ) ) {
				const del = localTime - tm;
				if( del < 0 ) break;
				ctx.arc( 500 + values.Scale*keyFrames_left[i].x, 500 + values.Scale*keyFrames_left[i].y
							, del*values.Scale* values.C, 0, 2*Math.PI);
				ctx.stroke();
				break;
			}
			i++;
		}

		ctx.beginPath();
		i=0;
		ctx.strokeStyle = "red";
		for( let t = 0; t < 4; t++) {
			const tm =  keyFrameTimes[t];
			if( keyFrameTimes[4] < localTime ) break;
			if( i === 3 || ( localTime >= tm && keyFrameTimes[t+1] > localTime ) ) {
				const del = localTime - tm;
				if( del < 0 ) break;
				ctx.arc( 501 + values.Scale*keyFrames[i].x, 500 + values.Scale*keyFrames[i].y
							, del*values.Scale* values.C, 0, 2*Math.PI);
				ctx.stroke();
				break;
			}
			i++;
		}

		/*
		console.log( "time:", localTime );
		const whole_ = Math.floor(values.Now/gamma);
		
		if( whole_ === 1 ) {
			const base = keyFrameTimes_left[whole_];
			const whole = whole_+runT/2;
			const frac = values.Now/gamma-whole_;
			ctx.arc( keyFrames[whole].x, keyFrames[whole].y, frac*values.Scale*gamma, 0, 2*Math.PI);
		} else {
			const base = keyFrameTimes_left[whole_];
			const whole = whole_+runT/2;
			const frac = values.Now/gamma-whole_;
			ctx.arc( keyFrames[whole].x, keyFrames[whole].y, frac*values.Scale*gamma, 0, 2*Math.PI);
		}
		*/

	}
	// emitter to splitter
	if(1) {
	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.moveTo( 500 + values.Scale * keyFrames[0].x, 500 + values.Scale * keyFrames[0].y );
	ctx.lineTo( 500 + values.Scale * keyFrames[1].x, 500 + values.Scale * keyFrames[1].y );
	ctx.stroke();
	drawFrequency( values.Frequency / lengthContract, 500 + values.Scale * keyFrames[0].x, 500 + values.Scale * keyFrames[0].y 
			, 500 + values.Scale * keyFrames[1].x, 500 + values.Scale * keyFrames[1].y, -2, values.Now, keyFrameTimes[1] );

	if( values.Now < keyFrameTimes[1] ) {
		const pos = ( values.Now - keyFrameTimes[0] ) / ( keyFrameTimes[1] - keyFrameTimes[0] );
		ctx.beginPath();
		ctx.strokeStyle = "yellow";
		ctx.arc( 500 + values.Scale * ( keyFrames[0].x * (1-pos) + keyFrames[1].x * (pos) )
			, 500 + values.Scale * ( keyFrames[0].y * (1-pos) + keyFrames[1].y * (pos) )
			, 0.05 * values.Scale
			, 0, Math.PI * 2 ) ;
		ctx.stroke();		
	}

	/* split to up */
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo(  500 + values.Scale * keyFrames[1].x, 500 + values.Scale * keyFrames[1].y );
	ctx.lineTo(  500 + values.Scale * keyFrames[2].x, 500 + values.Scale * keyFrames[2].y );
	ctx.stroke();
	drawFrequency( values.Frequency * lengthContract, 500 + values.Scale * keyFrames[1].x, 500 + values.Scale * keyFrames[1].y 
			, 500 + values.Scale * keyFrames[2].x, 500 + values.Scale * keyFrames[2].y, keyFrameTimes[1], values.Now, keyFrameTimes[2] );

	if( values.Now >= keyFrameTimes[1] && values.Now < keyFrameTimes[2] ) {
		const pos = ( values.Now - keyFrameTimes[1] ) / ( keyFrameTimes[2] - keyFrameTimes[1] );
		ctx.beginPath();
		ctx.strokeStyle = "yellow";
		ctx.arc( 500 + values.Scale * ( keyFrames[1].x * (1-pos) + keyFrames[2].x * (pos) )
			, 500 + values.Scale * ( keyFrames[1].y * (1-pos) + keyFrames[2].y * (pos) )
			, 0.05 * values.Scale
			, 0, Math.PI * 2 ) ;
		ctx.stroke();		
	}
	if( values.Now >= keyFrameTimes_left[1] && values.Now < keyFrameTimes_left[2] ) {
		const pos = ( values.Now - keyFrameTimes_left[1] ) / ( keyFrameTimes_left[2] - keyFrameTimes_left[1] );
		ctx.beginPath();
		ctx.strokeStyle = "yellow";
		ctx.arc( 500 + values.Scale * ( keyFrames_left[1].x * (1-pos) + keyFrames_left[2].x * (pos) )
			, 500 + values.Scale * ( keyFrames_left[1].y * (1-pos) + keyFrames_left[2].y * (pos) )
			, 0.05 * values.Scale
			, 0, Math.PI * 2 ) ;
		ctx.stroke();		
	}
	if( values.Now >= keyFrameTimes[2] && values.Now < keyFrameTimes[3] ) {
		const pos = ( values.Now - keyFrameTimes[2] ) / ( keyFrameTimes[3] - keyFrameTimes[2] );
		ctx.beginPath();
		ctx.strokeStyle = "yellow";
		ctx.arc( 500 + values.Scale * ( keyFrames[2].x * (1-pos) + keyFrames[3].x * (pos) )
			, 500 + values.Scale * ( keyFrames[2].y * (1-pos) + keyFrames[3].y * (pos) )
			, 0.05 * values.Scale
			, 0, Math.PI * 2 ) ;
		ctx.stroke();		
	}
	if( values.Now >= keyFrameTimes_left[2] && values.Now < keyFrameTimes_left[3] ) {
		const pos = ( values.Now - keyFrameTimes_left[2] ) / ( keyFrameTimes_left[3] - keyFrameTimes_left[2] );
		ctx.beginPath();
		ctx.strokeStyle = "yellow";
		ctx.arc( 500 + values.Scale * ( keyFrames_left[2].x * (1-pos) + keyFrames_left[3].x * (pos) )
			, 500 + values.Scale * ( keyFrames_left[2].y * (1-pos) + keyFrames_left[3].y * (pos) )
			, 0.05 * values.Scale
			, 0, Math.PI * 2 ) ;
		ctx.stroke();		
	}
	if( values.Now >= keyFrameTimes[3] && values.Now < keyFrameTimes[4] ) {
		const pos = ( values.Now - keyFrameTimes[3] ) / ( keyFrameTimes[4] - keyFrameTimes[3] );
		ctx.beginPath();
		ctx.strokeStyle = "yellow";
		ctx.arc( 500 + values.Scale * ( keyFrames[3].x * (1-pos) + keyFrames[4].x * (pos) )
			, 500 + values.Scale * ( keyFrames[3].y * (1-pos) + keyFrames[4].y * (pos) )
			, 0.05 * values.Scale
			, 0, Math.PI * 2 ) ;
		ctx.stroke();		
	}


	/* top back to split */
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.moveTo(  500 + values.Scale * keyFrames[2].x, 500 + values.Scale * keyFrames[2].y );
	ctx.lineTo(  500 + values.Scale * keyFrames[3].x, 500 + values.Scale * keyFrames[3].y );
	ctx.stroke();
	drawFrequency( values.Frequency * lengthContract, 500 + values.Scale * keyFrames[2].x, 500 + values.Scale * keyFrames[2].y 
			, 500 + values.Scale * keyFrames[3].x, 500 + values.Scale * keyFrames[3].y
			, keyFrameTimes[2], values.Now, keyFrameTimes[3], true );


	/* splitter to right (from top)*/
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo(  500 + values.Scale * keyFrames[3].x, 500 + values.Scale * keyFrames[3].y );
	ctx.lineTo(  500 + values.Scale * keyFrames[4].x, 500 + values.Scale * keyFrames[4].y );
	ctx.stroke();
	drawFrequency( values.Frequency * (values.C/(values.C-values.Velocity)), 500 + values.Scale * keyFrames[3].x, 500 + values.Scale * keyFrames[3].y 
			, 500 + values.Scale * keyFrames[4].x, 500 + values.Scale * keyFrames[4].y
			, keyFrameTimes[3], values.Now, keyFrameTimes[4], true );
	}

	ctx.beginPath();
	ctx.moveTo( 500 + values.Scale * keyFrames_left[0].x, 500 + values.Scale * keyFrames_left[0].y );
	ctx.lineTo( 500 + values.Scale * keyFrames_left[1].x, 500 + values.Scale * keyFrames_left[1].y );
	ctx.stroke();

	/* split to left */
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo( 500 + values.Scale *  keyFrames_left[1].x, 500 + values.Scale * keyFrames_left[1].y );
	ctx.lineTo( 500 + values.Scale *  keyFrames_left[2].x, 500 + values.Scale * keyFrames_left[2].y );
	ctx.stroke();
	drawFrequency( values.Frequency * (values.C/(values.C+values.Velocity)), 500 + values.Scale * keyFrames_left[1].x, 500 + values.Scale * keyFrames_left[1].y 
			, 500 + values.Scale * keyFrames_left[2].x, 500 + values.Scale * keyFrames_left[2].y, keyFrameTimes_left[1], values.Now, keyFrameTimes_left[2] );

	
	/* left to split */
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.moveTo( 500 + values.Scale *  keyFrames_left[2].x, 500 + values.Scale * keyFrames_left[2].y );
	ctx.lineTo( 500 + values.Scale *  keyFrames_left[3].x, 500 + values.Scale * keyFrames_left[3].y );
	ctx.stroke();

	drawFrequency( values.Frequency * (values.C/(values.C-values.Velocity)), 500 + values.Scale * keyFrames_left[2].x, 500 + values.Scale * keyFrames_left[2].y 
			, 500 + values.Scale * keyFrames_left[3].x, 500 + values.Scale * keyFrames_left[3].y
			, keyFrameTimes_left[2], values.Now, keyFrameTimes_left[3], true );

	/* split to right (from left) */
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo( 500 + values.Scale *  keyFrames_left[3].x, 500 + values.Scale * keyFrames_left[3].y );
	ctx.lineTo( 500 + values.Scale *  keyFrames_left[4].x, 500 + values.Scale * keyFrames_left[4].y );
	ctx.stroke();
	
        
	if( animate ) {
		values.Now = ( ( (Date.now() ) %((runT+values.Velocity*2)*1250) ) / 1250) - runT/2;
		{
			let photon = l.photons;
			while( photon ) {
				photon.update();
				photon = photon.next;
			}
		
		}
		
		//sliders.sliderNow.value = scalars.Now*values.Now + bias.Now;
		sliders.sliderNow.value =(values.Now - bias.Now)/scalars.Now;
		sliders.spanNow.textContent = values.Now.toFixed(2);
		requestAnimationFrame( draw );
	}


	return;

}


function RealTime( T_o, V, P, V_o, P_o ) {
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for T.
	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 
	//                       - 4 (C^2 - D^2 - E^2 - F^2) 
	//                          * (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) 
	//            + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$
	const C = values.C;

	const X_ = P.x-P_o.x;
	const Y_ = P.y-P_o.y;
	const Z_ = P.z-P_o.z;
	let VV = V.x*V.x+V.y*V.y+V.z*V.z;

	const VLen = (VV>0)?Math.sqrt(VV):1;
	const dot = VLen===0?1:(X_*V.x + Y_*V.y + Z_*V.z)/VLen;
	const X = X_ - V.x*dot/VLen * (1-lengthContract)
	const Y = Y_ - V.y*dot/VLen * (1-lengthContract)
	const Z = Z_ - V.z*dot/VLen * (1-lengthContract)


	const S = T_o;

	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const jsx = X-J*S;
	const ksy = Y-K*S;
	const lsz = Z-L*S;


	const tmp = ( C*C * S + D*jsx + E*ksy + F*lsz );
	const tmp2 = ( S*S * C*C - jsx*jsx - ksy*ksy - lsz*lsz );
	const CV = C*C - VV;
	if( Math.abs(CV) < 0.000001 ) {
		// D*D+E*E+F*F = C
		// solve (S-T)^2 = ( ( (X+D*T-J*S)^2+(Y+E*T - K*S)^2+(Z + F*T - L* S)^2) )/(D*D+E*E+F*F) for T
		// T = ((J^2 S^2)/(D^2 + F^2 + e^2) - (2 J S X)/(D^2 + F^2 + e^2) + (K^2 S^2)/(D^2 + F^2 + e^2) - (2 K S Y)/(D^2 + F^2 + e^2) + (L^2 S^2)/(D^2 + F^2 + e^2) - (2 L S Z)/(D^2 + F^2 + e^2) + X^2/(D^2 + F^2 + e^2) + Y^2/(D^2 + F^2 + e^2) + Z^2/(D^2 + F^2 + e^2) - S^2)
		//        /((2 D J S)/(D^2 + F^2 + e^2) + (2 e K S)/(D^2 + F^2 + e^2) + (2 F L S)/(D^2 + F^2 + e^2) - (2 D X)/(D^2 + F^2 + e^2) - (2 e Y)/(D^2 + F^2 + e^2) - (2 F Z)/(D^2 + F^2 + e^2) - 2 S)
		// T = ((J^2 S^2)/C - (2 J S X)/C + (K^2 S^2)/C - (2 K S Y)/C + (L^2 S^2)/C - (2 L S Z)/C + X^2/C + Y^2/C + Z^2/C - S^2)
		//        /((2 D J S)/C + (2 e K S)/C + (2 F L S)/C - (2 D X)/C - (2 e Y)/C - (2 F Z)/C - 2 S)
		// T = ((J^2 S^2) - (2 J S X) + (K^2 S^2) - (2 K S Y) + (L^2 S^2) - (2 L S Z) + X^2 + Y^2 + Z^2 - S^2*C)
		//        /((2)*( (D J S) + (e K S) + (F L S) - (D X) - (e Y) - (F Z) - S C))

		const T =  ( tmp2 ) / ( 2*( tmp ) )
		if( T < T_o ) return [T];
		return -Math.Infinity;
	}
	
	const delT = Math.sqrt(tmp*tmp - CV * tmp2	);
	const T = (-delT + tmp )/CV;
	if( T > T_o ) {

		const T2 = (+delT + tmp )/CV;
		if( T2 < T_o ) return [T2];
		return [];
	}
	const T2 = (+Math.sqrt(tmp*tmp - CV * tmp2	) + tmp )/CV;
	return (T2<T_o)?[T,T2]:[T];
}

function observedTimeToRealTimeXYZ2( T_o, V, X, Y, Z, V_o, X_o, Y_o, Z_o, ca, sa, ca_o, sa_o ){ 
	return RealTime( T_o, { x: V*ca, y: V*sa, z: 0 }, { x:X, y:Y, z:Z }, { x:ca_o*V_o, y:sa_o*V_o, z: 0 }, { x:X_o, y:Y_o, z:Z_o } );
}


function ObservedTime( T, V, P, V_o, P_o, c ) {
	c = c || values.C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for S and T.
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) 
	//                    *(C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) 
	//     + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const X = P.x-P_o.x;
	const Y = P.y-P_o.y;
	const Z = P.z-P_o.z;
	const VV = V_o.x*V_o.x+V_o.y*V_o.y+V_o.z*V_o.z;
	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const dsx = X+D*T;
	const esy = Y+E*T;
	const fsz = Z+F*T;
/*
	const pos = (P-P_o)+V*T;
	const a = pos * V_o;
	const tmp = (-C*C * T + sum(a) );
	const tmp2 = ( T*T * C*C - sum(pos*pos) );
*/	
	const tmp = (-c*c * T + J*dsx + K*esy + L*fsz );
	const tmp2 = ( T*T * c*c - dsx*dsx - esy*esy - fsz*fsz );

	const CV =  c*c - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	if( Math.abs(CV) < 0.000001 ) {
		const T_o =  tmp2/( 2*tmp )
		if( T_o < T ) return T_o;
		return -Math.Infinity;
	}

	return  (Math.sqrt(tmp*tmp - CV*tmp2) - tmp ) / CV;
}

function realTimeToObservedTimeXYZ2( T_o, V, X, Y, Z, V_o, X_o, Y_o, Z_o, ca, sa, ca_o, sa_o ){ 
	return ObservedTime( T_o, { x: V*ca, y: V*sa, z: 0 }, { x:X, y:Y, z:Z }, { x:ca_o*V_o, y:sa_o*V_o, z: 0 }, { x:X_o, y:Y_o, z:Z_o } );
}


function makePhotons() {
	const step = values.C/(values.Frequency); // wavelength err wavetime  (meter-cycles)
	for( let T = -2; T < runT; T+= step ) {
		const photon = new Photon();
		photon.t = T;
		const photon_l = new Photon();
		photon_l.t = T;
		photon_l.left = true;
	}
	
}

class Photon {
	x = 0;
	y = 0;
	dx = 0;
	dy = 0;
	f = 0;
	start = 0;
	next = 0;
	seg = 0;
	left = false;
	can_draw = false;
	me = {};

	constructor() {
		if( l.photons ) l.photons.me = { o:this, p:"next" };
		this.next = l.photons;
		this.me = { o:l, p:"photons" };
		l.photons = this;
		
	}
	
	update() {
		if( this.t > values.Now ) return;
		let del = ( values.Now - this.t) -2;
		//console.log( "del:", del );
		let seg = -1;
		this.can_draw = true; 
		if( this.left ) {
			if( del > keyFrameTimes_left[4] ) { this.can_draw = false; return; }
			if( del > keyFrameTimes_left[3] ) seg = 3;
			else if( del > keyFrameTimes_left[2] ) seg = 2;
			else if( del > keyFrameTimes_left[1] ) seg = 1;
			else seg = 0;
			//console.log( "UPdating:", seg, del );
			const segDx = keyFrames_left[seg+1].x - keyFrames_left[seg].x;
			const segDy = keyFrames_left[seg+1].y - keyFrames_left[seg].y;
			let ofs = 0;
			for( let s = 1; s <= seg; s++ ) {
				ofs += keyFrameTimes_left[s]-keyFrameTimes_left[s-1];
			}
			const segL = Math.sqrt( segDx*segDx + segDy*segDy);
			const delT = del - keyFrameTimes_left[seg];
			const segNDx = segDx / segL;
			const segNDy = segDy / segL;
			this.seg = seg;
			this.x = (this.t-keyFrameTimes_left[seg] + ofs  ) * values.Velocity * Math.cos( values.Direction ) + keyFrames_left[seg].x + values.C * delT * segNDx;
			this.y = -(this.t-keyFrameTimes_left[seg] + ofs ) * values.Velocity * Math.sin( values.Direction ) + keyFrames_left[seg].y + values.C * delT * segNDy;

			
		} else {
			if( del > keyFrameTimes[4] ) { this.can_draw = false; return; }
			if( del > keyFrameTimes[3] ) seg = 3;
			else if( del > keyFrameTimes[2] ) seg = 2;
			else if( del > keyFrameTimes[1] ) seg = 1;
			else seg = 0;
			const segDx = keyFrames[seg+1].x - keyFrames[seg].x;
			const segDy = keyFrames[seg+1].y - keyFrames[seg].y;
			let ofs = 0;
			for( let s = 1; s <= seg; s++ ) {
				ofs += keyFrameTimes[s]-keyFrameTimes[s-1];
			}
			const segL = Math.sqrt( segDx*segDx + segDy*segDy);
			const delT = del - keyFrameTimes[seg];
			const segNDx = segDx / segL;
			const segNDy = segDy / segL;

			this.seg = seg;
			this.x = (this.t-keyFrameTimes[seg]+ofs) * values.Velocity * Math.cos( values.Direction ) + keyFrames[seg].x + values.C * delT * segNDx;
			this.y = -(this.t-keyFrameTimes[seg]+ofs) * values.Velocity * Math.sin( values.Direction ) + keyFrames[seg].y + values.C * delT * segNDy;
			//console.log( "Set point : ", this.t, this.x, this.y, delT );
		}
	}
	draw() {
		if( this.t > values.Now || !this.can_draw ) return;
		ctx.beginPath();
		if( this.left )
			ctx.strokeStyle = "#0f0";
		else
			ctx.strokeStyle = "#00f";
		if( this.seg === 0 ) ctx.strokeStyle = "#fff";
		else if( this.seg === 1 ) ctx.strokeStyle = "#f00";
		else if( this.seg === 2 ) ctx.strokeStyle = "#33F";
		else if( this.seg === 3 ) ctx.strokeStyle = "#0F0";
		ctx.arc( 500 + values.Scale*this.x, 500 + (this.left?1:0) + values.Scale*this.y
							, 5, 0, 2*Math.PI);
		ctx.stroke();
	}
}



update();
