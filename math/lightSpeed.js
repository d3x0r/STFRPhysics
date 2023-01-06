
//import {lnQuat} from "../3d/src/lnQuatSq.js"

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );


let L=1; // length of body (m)  (L/C = time of body (s))
let C=1; // speed of propagation (m/s)
let D=1; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=2; // velocity  (m/s)
let S=1; // time scalar (s/s)
let runT = 10;

const frames = [];
let curFrame = -1;
const nFrames = 1000;

class Frame{
	Ph = 0;
	Pc = 0;
	Pt = 0;

	T_start = 0;

	T_see_h = 0;
	T_see_c = 0;
	T_see_t = 0;
	
}

for( let n = 0; n < nFrames; n++ ) {
	frames.push( new Frame() );
}


const controls = document.getElementById( "controls" );

let span = document.createElement( "br" );
controls.appendChild( span );

span = document.createElement( "span" );
span.textContent = "C";
controls.appendChild( span );

const sliderC = document.createElement( "input" );
sliderC.setAttribute( "type", "range" );
controls.appendChild( sliderC );
sliderC.addEventListener( "input", update );

sliderC.setAttribute( "max",250 );
sliderC.value = C*100;
sliderC.style.width="250px";

const spanC = document.createElement( "span" );
spanC.textContent = "1";
controls.appendChild( spanC );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.textContent = "Time Scale";
controls.appendChild( span );

const sliderS = document.createElement( "input" );
sliderS.setAttribute( "type", "range" );
controls.appendChild( sliderS );
sliderS.addEventListener( "input", update );

sliderS.setAttribute( "max",250 );
sliderS.value = S*10;
sliderS.style.width="250px";

const spanS = document.createElement( "span" );
spanS.textContent = "1";
controls.appendChild( spanS );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.textContent = "Distance";
controls.appendChild( span );

const sliderD = document.createElement( "input" );
sliderD.setAttribute( "type", "range" );
controls.appendChild( sliderD );
sliderD.addEventListener( "input", update );

sliderD.setAttribute( "max",100 );
sliderD.value = D*10;
sliderD.style.width="250px";

const spanD = document.createElement( "span" );
spanD.textContent = "1";
controls.appendChild( spanD );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.textContent = "Velocity";
controls.appendChild( span );

const sliderV = document.createElement( "input" );
sliderV.setAttribute( "type", "range" );
controls.appendChild( sliderV );
sliderV.addEventListener( "input", update );

sliderV.setAttribute( "max",1000 );
sliderV.value = V*100;
sliderV.style.width="250px";

const spanV = document.createElement( "span" );
spanV.textContent = "1";
controls.appendChild( spanV );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.textContent = "Half-Length";
controls.appendChild( span );

const sliderL = document.createElement( "input" );
sliderL.setAttribute( "type", "range" );
controls.appendChild( sliderL );
sliderL.addEventListener( "input", update );

sliderL.setAttribute( "max",100 );
sliderL.value = L*10;
sliderL.style.width="250px";

const spanL = document.createElement( "span" );
spanL.textContent = "1";
controls.appendChild( spanL );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.textContent = "Run-Time";
controls.appendChild( span );

const sliderRunT = document.createElement( "input" );
sliderRunT.setAttribute( "type", "range" );
controls.appendChild( sliderRunT );
sliderRunT.addEventListener( "input", update );

sliderRunT.setAttribute( "max",250 );
sliderRunT.value = runT*5;
sliderRunT.style.width="250px";

const spanRunT = document.createElement( "span" );
spanRunT.textContent = "1";
controls.appendChild( spanRunT );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------
update();

const body = [];

/*
for( t = -5; t < 5; t += 0.02 ) {
	const b = { t : V*t - 1, c:V*t, h:V*t+1 };
	const delay = { t: Math.sqrt( ((D*D)/(C*C)) + b.t*b.t), c: Math.sqrt( ((D*D)/(C*C)) + b.c*b.c), h: Math.sqrt( ((D*D)/(C*C)) + b.h*b.h) };
	const appear = { t: delay.t+t, c:delay.c+t, h:delay.h+t };
	body.push( { hue:(t%3)*60, pos:b, delay, appear } );
}
*/

function realTimeToObserverTime( T, L ) {
	const pos = (V*T+L)/C;
	return Math.sqrt( D*D/(C*C) + pos*pos ) + T;
}

function observerTimeToRealTime_LoverC( T, L ) {
	// things have to be able to propagate forwardly.
	if( C <= 0 ) return [0,0];

	if( C==V ) {
		V=V+0.00000001*V;
	}
	return [ (  Math.sqrt( C*C*D*D + C*C+L*L + 2 * C*C*L*V*T + V*V*(C*C*T*T-D*D) ) + C*C*T + L*V ) / (C*C-V*V)
			, ( -Math.sqrt( C*C*D*D + C*C+L*L + 2 * C*C*L*V*T + V*V*(C*C*T*T-D*D) ) + C*C*T + L*V ) / (C*C-V*V) ];
}

function observerTimeToRealTime( T, L ) {
	// things have to be able to propagate forwardly.
	if( C <= 0 ) return [0,0];

	if( C==V ) {
		V=V+0.00000001*V;
	}
	return [(  Math.sqrt( C*C*D*D + C*C*C*C*L*L + 2 * C*C*C*C*L*V*T + D*D*(C*C-V*V) ) + C*L*V +C*C*C*T) / (C*C-V*V)
			, ( -Math.sqrt( C*C*D*D + C*C+C*C*L*L + 2 * C*C*C*C*L*V*T + D*D*(C*C-V*V) ) + C*L*V+C*C*C*T ) / (C*C-V*V) ];
}




function update( evt ) {
	C = Number(sliderC.value)/100;
	spanC.textContent = C.toFixed(2);
	D = Number(sliderD.value)/10;
	spanD.textContent = D.toFixed(2);
	V = Number(sliderV.value)/100;
	spanV.textContent = V.toFixed(2);
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(2);

	S = Number(sliderS.value)/10;
	spanS.textContent = S.toFixed(2);

	runT = Number(sliderRunT.value)/5;
	spanRunT.textContent = runT.toFixed(2);

	//draw(  );
}
let last_draw_time = 0;
let xscale = 50;
function draw(  ) {
	
	const beamX = canvas.width/2;
	const beamY = canvas.height/2 + 40;

	const now = ( ( (Date.now() * S) %(runT*1000) ) / 1000) - runT/2;
	const frame = Math.floor( (now+runT/2)*10 );
	if( curFrame < 0 || curFrame != frame ) {
		curFrame = frame; 
		const f = frames[curFrame];
		f.Pc = now*V 
		f.Ph = f.Pc+L;
		f.Pt = f.Pc-L;
		f.T_start = now;
		f.T_see_h = realTimeToObserverTime( now, L );
		f.T_see_c = realTimeToObserverTime( now, 0 );
		f.T_see_t = realTimeToObserverTime( now, -L );
	}


	ctx.clearRect( 0, 0, 1024, 1024);
	ctx.strokeStyle = "blue";
	let drawP = null, drawT = null, drawH = null;
	let drawP2 = null,drawT2 = null,drawH2 = null;
	for( let f = 0; f < curFrame; f++ ) {
		const frame = frames[f];
		ctx.beginPath();
		ctx.moveTo( 500 + frame.Pc*xscale, 40 );
		const toY = D*100+40;
		ctx.lineTo( 500, toY );
		ctx.stroke();
		
		if( ( frame.T_see_c < now ) ) {
			if( drawP ) drawP2 = frame;
			else drawP = frame;
		}
		if( ( frame.T_see_h < now ) ) {
			if( drawH ) drawH2 = frame;
			else drawH = frame;
		}
		if( ( frame.T_see_t < now ) ) {
			if( drawT ) drawT2 = frame;
			else drawT = frame;
		}
		if( now < frame.T_see_c ) {
			const del = frame.T_see_c - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			centerBoxXY( (500+frame.Pc*xscale)*(1-delT) + (500)*(delT), 40*(1-delT)+toY*(delT) );
		}
		if( now < frame.T_see_h ) {
			const del = frame.T_see_h - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			headTri( (frame.Pc+L)*(1-delT) , 40*(1-delT)+toY*(delT) );
		}
		if( now < frame.T_see_t ) {
			const del = frame.T_see_t - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			tailTri( (frame.Pc-L)*(1-delT), 40*(1-delT)+toY*(delT) );
		}
	}

	if( drawP !== frames[0] )
	if( drawP )
		centerBoxXY( 500 + drawP.Pc*xscale, 30 );
	if( drawP2 )
		centerBoxXY( 500 + drawP2.Pc*xscale, 30 );
	if( drawH !== frames[0] )
	if( drawH )
		headTri( drawH.Pc+L, 30 );
	if( drawH2 )
		headTri( drawH2.Pc+L, 30 );
	if( drawT !== frames[0] )
	if( drawT )
		tailTri( drawT.Pc-L, 30 );
	if( drawT2 )
		tailTri( drawT2.Pc-L, 30 );

	if( now < last_draw_time ) {
		ctx.fillStyle = "black";
		ctx.fillRect( 0, 0, 1024, 1024);		
	}

	last_draw_time = now;

	

	function headTri( t,o ) {
		const y = 0;
		
		ctx.fillStyle = "red";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( 500+(t) * xscale + 5, o+y );
		ctx.lineTo( 500+(t) * xscale - 5, o+y -5 );
		ctx.lineTo( 500+(t) * xscale - 5, o+y +5 );
		ctx.fill();
	}

	function tailTri( t,o ) {      
		const y = 0;
		
		ctx.fillStyle = "blue";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( 500+(t) * xscale - 5, o+y );
		ctx.lineTo( 500+(t) * xscale + 5, o+y - 5 );
		ctx.lineTo( 500+(t) * xscale + 5, o+y + 5 );
		ctx.fill();
	}

	function centerBoxXY( x,y ) {      
		
		ctx.fillStyle = "green";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( x +5, y );
		ctx.lineTo( x, y - 5 );
		ctx.lineTo( x-5, y  );
		ctx.lineTo( x, y + 5 );
		ctx.fill();
	}
	function centerBox( t,o ) {      
		const y = 20;
		centerBoxXY( 500+(t)*xscale, o+y );
	}
	
if(0) {
	const front  = observerTimeToRealTime( now,  L );
	const center = observerTimeToRealTime( now,  0 );
	const back   = observerTimeToRealTime( now, -L );


	headTri( front[0] * V, 20 );
	headTri( front[1] * V, 20+5 );
	tailTri( back[0] * V, 20 );
	tailTri( back[1] * V, 20+5 );

	centerBox( center[0] * V, 20 );
	centerBox( center[1] * V, 20+5 );

	headTri( front[0], 120 );
	headTri( front[1], 120+5 );
	tailTri( back[0], 120 );
	tailTri( back[1], 120+5 );

	centerBox( center[0], 120 );
	centerBox( center[1], 120+5 );
}

	headTri( now*V + L, 20 );
	tailTri( now*V - L, 20 );
	centerBox( now*V, 0 );


	requestAnimationFrame( draw );

	return;

}

		draw();

