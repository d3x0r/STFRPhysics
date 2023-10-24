
//import {lnQuat} from "../3d/src/lnQuatSq.js"
import {newImage} from "./imageLoader.js"
const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
const galaxyImage = newImage( "./andromeda-galaxy-hd-png.png" );
const earthImage = newImage( "./planet_earth_cut_outs.png" );
const shipImage = newImage( "./Retro+Rocket+Cardboard+Standup.png" );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );

import {params, RealTime,RealTime2, D3xTransform,ObservedTime} from "./relativistic.util.js"

let L=1; // length of body (m)  (L/C = time of body (s))
let C=1; // speed of propagation (m/s)
let D=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let O=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let O2=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=0.5; // velocity  (m/s)
let V2=0; // observer's velocity  (m/s)
let S=1; // time scalar (s/s)
let lengthContract = 1;
let runT = 5;
let runStart = 0;
let eventTime = 0;
let now = 0;
let animate = true;
let animating = false;
let last_draw_time = 0;
let xscale = 50;

const drawOpts = {
 drawOffsetObserver: true,
 drawObserverLocal : false,
 drawAsSeen: true,
 drawDistantFrame : false,
 drawInverse : true,
 drawGrid : true,
 drawXTGrid : false,
	forceSameEvent : true,
	lengthContract : true,
	showFreq : false,
}
const clockRadius = 20;
const centerX = 500;
const centerY = 500;
const frames = [];
let curFrame = -1;
const nFrames = 200;

class Frame{
	T_start = 0;
	from = {x:0,y:0,z:0};
	T_end = 0;
	T_end_local = 0;

	static initFrames() {
		const lGam = Math.sqrt( C*C-V*V);
		const f0 = frames[0];
		f0.T_start = 0;
		// stationary frame seen by moving frame tail
		f0.T_end = ObservedTime( 0, {x:0, y:0, z:0}, {x:0,y:0,z:0}, {x:V,y:0,z:0}, {x:-L*lGam,y:0,z:0})
		f0.from.x = 0;
		f0.T_end_local = lGam*f0.T_end;
		const f1 = frames[1];
		f1.T_start = 0;
		// stationary frame seen by moving frame head
		f1.T_end = ObservedTime( 0, {x:0, y:0, z:0}, {x:0,y:0,z:0}, {x:V,y:0,z:0}, {x:L*lGam,y:0,z:0})
		f1.from.x = 0;
		f1.T_end_local = lGam*f1.T_end;
		const f2 = frames[2];
		f2.T_start = 0;
		// stationary frame seen by stationary frame tail
		f2.T_end = ObservedTime( 0, {x:0, y:0, z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0}, {x:-L,y:0,z:0})
		f2.from.x = 0;
		f2.T_end_local = f2.T_end;
		const f3 = frames[3];
		f3.T_start = 0;
		// stationary frame seen by stationary frame head
		f3.T_end = ObservedTime( 0, {x:0, y:0, z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0}, {x:L,y:0,z:0})
		f3.from.x = 0;
		f3.T_end_local = f3.T_end;


		const f4 = frames[4];
		f4.T_start = f0.T_end;
		// time from moving tail to moving observer
		f4.T_end = ObservedTime( f0.T_end, {x:V, y:0, z:0}, {x:-L*lGam,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0})
		f4.from.x = -L*lGam + f0.T_end*V;
		f4.T_end_local = lGam * f4.T_end;
		const f5 = frames[5];
		f5.T_start = f1.T_end;
		// time from moving head to moving observer
		f5.T_end = ObservedTime( f1.T_end, {x:V, y:0, z:0}, {x:L*lGam,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0})
		f5.from.x = L*lGam + f1.T_end*V;
		f5.T_end_local = lGam * f5.T_end;

		const f6 = frames[6];
		f6.T_start = f0.T_end;
		// time from moving tail to stationary observer
		f6.T_end = ObservedTime( f0.T_end, {x:V, y:0, z:0}, {x:-L*lGam,y:0,z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0})
		f6.from.x = -L*lGam + f0.T_end*V;
		f6.T_end_local = f6.T_end;
		const f7 = frames[7];
		f7.T_start = f1.T_end;
		// time from moving head to stationary observer
		f7.T_end = ObservedTime( f1.T_end, {x:V, y:0, z:0}, {x:L*lGam,y:0,z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0})
		f7.from.x = +L*lGam + f1.T_end*V;
		f7.T_end_local = f7.T_end;


		const fs4 = frames[8];
		fs4.T_start = f2.T_end;
		// time from stationary tail to moving observer
		fs4.T_end = ObservedTime( f2.T_end, {x:0, y:0, z:0}, {x:-L,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0})
		fs4.from.x = -L;
		fs4.T_end_local = lGam * fs4.T_end;
		const fs5 = frames[9];
		fs5.T_start = f3.T_end;
		// time from stationary head to moving observer
		fs5.T_end = ObservedTime( f3.T_end, {x:0, y:0, z:0}, {x:L,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0})
		fs5.from.x = L;
		fs5.T_end_local = lGam * fs5.T_end;
		
		const fs6 = frames[10];
		fs6.T_start = f2.T_end;
		// time from stationary tail to stationary observer
		fs6.T_end = ObservedTime( f2.T_end, {x:0, y:0, z:0}, {x:-L,y:0,z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0})
		fs6.from.x = -L;
		fs6.T_end_local = fs6.T_end;
		const fs7 = frames[11];
		fs7.T_start = f3.T_end;
		// time from stationary head to stationary observer
		fs7.T_end = ObservedTime( f3.T_end, {x:0, y:0, z:0}, {x:L,y:0,z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0})
		fs7.from.x = L;
		fs7.T_end_local = fs7.T_end;


		for( let i = 0; i < 12; i++ ){
			console.log( "from:", frames[i].T_start.toFixed(3), "to:", frames[i].T_end.toFixed(3), "L:", frames[i].T_end_local.toFixed(3))
		}

	}
	
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

sliderC.setAttribute( "max",1250 );
sliderC.value = C*100;
sliderC.style.width="250px";

const spanC = document.createElement( "span" );
spanC.textContent = "1";
controls.appendChild( spanC );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------
/*
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
*/
//----------------------

span = document.createElement( "span" );
span.textContent = "Velocity";
controls.appendChild( span );

const sliderV = document.createElement( "input" );
sliderV.setAttribute( "type", "range" );
controls.appendChild( sliderV );
sliderV.addEventListener( "input", update );

sliderV.setAttribute( "max",1000 );
sliderV.value = 500+V*500;
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
span.textContent = "Now";
controls.appendChild( span );

const sliderNow = document.createElement( "input" );
sliderNow.setAttribute( "type", "range" );
controls.appendChild( sliderNow );
sliderNow.addEventListener( "input", update );

sliderNow.setAttribute( "min",-100 );
sliderNow.setAttribute( "max",100 );
sliderNow.value = now*runT;
sliderNow.style.width="250px";

const spanNow = document.createElement( "span" );
spanNow.textContent = "1";
controls.appendChild( spanNow );

//------------------------------
const spanChkNow = document.createElement( "label" );
spanChkNow.textContent = " |Animate";
controls.appendChild( spanChkNow );

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = animate;
spanChkNow.appendChild( chkLblNow );
chkLblNow.addEventListener( "input", update );

span = document.createElement( "br" );
controls.appendChild( span );

//----------------------


//----------------------
const updates = [];

function mkChk(title, drawDistantFrame) {
const spanChkShowDistant = document.createElement( "label" );
spanChkShowDistant.textContent = title;
controls.appendChild( spanChkShowDistant );

const chkLblShowDistant = document.createElement( "input" );
chkLblShowDistant.setAttribute( "type", "checkbox" );
chkLblShowDistant.checked = drawOpts[drawDistantFrame];
spanChkShowDistant.appendChild( chkLblShowDistant );
chkLblShowDistant.addEventListener( "input", update );
span = document.createElement( "br" );
controls.appendChild( span );

updates.push( ()=>{
	drawOpts[drawDistantFrame] = chkLblShowDistant.checked;
} );

return chkLblShowDistant;
}

//const spanChkContract = mkChk( "Length Contract", "asdf" );
/*
mkChk( "Length Contraction", "lengthContract" );
mkChk( "Show Distant Frame", "drawDistantFrame" );
mkChk( "Lock Offset", "forceSameEvent" );
mkChk( "Show Offset Ship", "drawOffsetObserver" );
mkChk( "Show Ship Local", "drawObserverLocal" );
mkChk( "Show As Seen", "drawAsSeen" );
mkChk( "Draw Inverse", "drawInverse" );
mkChk( "Draw Grid", "drawGrid" );
mkChk( "Draw XT Grid", "drawXTGrid" );
mkChk( "Draw Wavelengths", "showFreq" );
*/
//----------------------

//----------------------
span = document.createElement( "br" );
controls.appendChild( span );
//----------------------



update();


function update( evt ) {
	updates.map( upd=>upd() );

//	runT = Number(sliderRunT.value)/5;
//	spanRunT.textContent = runT.toFixed(2)+"ns";

	animate = chkLblNow.checked;
	if( animate ) {
	}else
		now = (Number(sliderNow.value)/100+1)/2*runT+runStart;

	C = Number(sliderC.value)/100;
	params.C = C;
	spanC.textContent = C.toFixed(2)+"ft/ns";
	V = Number(sliderV.value)/500 - 1;
	if( V === 1 ) V-=0.0001;
	D3xTransform.myV = V2;
	D3xTransform.V = V;
	D3xTransform.D = D;
	spanV.textContent = V.toFixed(4) +"c";
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(2)+"ft";

	//S = Number(sliderS.value)/10;
	//spanS.textContent = S.toFixed(2);
  	params.lengthContract = drawOpts.lengthContract
	params.lGam = lengthContract = drawOpts.lengthContract?V<C?Math.sqrt(C*C-V*V)/(C*C):Math.sqrt(V*V-C*C)/(C*C):1;

	spanNow.textContent = now.toFixed(2) +"ns";

	Frame.initFrames();


	if( !animating )
		draw(  );
}

	ctx.font = "18px monospace" ;
	ctx.textAlign = "center";
	ctx.fillStyle = "white";

function drawClock( x, y, T,label ) {
	x +=  - 250;
	y +=  + 250;
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillText( label, centerX + x, centerY - y - (clockRadius+2) );


	ctx.beginPath();

		ctx.strokeStyle = "blue";
		if( T < -runT/2 )
			ctx.fillStyle = "#707";
		else if( T > runT/2 )
			ctx.fillStyle = "#770";
		else
			ctx.fillStyle = "#e00";

		ctx.arc(centerX+x, centerY-y
				, clockRadius, 0-Math.PI/2, ((0.5+T/runT)%1) * (Math.PI*2)-Math.PI/2, false);
		ctx.lineTo( centerX+x, centerY-y );
		ctx.closePath();
	ctx.stroke();
	ctx.fill();	

	ctx.beginPath();

		ctx.strokeStyle = "blue";
		ctx.fillStyle = "green";

		ctx.arc(centerX + x, centerY+clockRadius*2.5 - y
				, clockRadius, 0-Math.PI/2, ((8*(0.5+T/runT))%1) * (Math.PI*2)-Math.PI/2, false);
		ctx.lineTo( centerX+x, centerY+clockRadius*2.5-y );
		ctx.closePath();
	ctx.stroke();
	ctx.fill();	

}

function draw(  ) {
	
	const beamX = canvas.width/2;
	const beamY = canvas.height/2 + 40;

	if( animate ) {
		now = ( ( (Date.now() * S) %(runT*1000) ) / 1000)+runStart;
		sliderNow.value =100*(now-runStart)*2/runT - 100;
		spanNow.textContent = now.toFixed(2)+"ns";
	} else {
		animating = false;
	}

	const lNow = lengthContract*now;
	ctx.clearRect( 0, 0, 1024, 1024);
	ctx.strokeStyle = "white";
	// stationary event to moving tail
	if( now >= frames[0].T_start && now <= frames[2].T_end ) {
		ctx.beginPath();
		ctx.arc(750+0*xscale, 250, C*(now-frames[1].T_start)*(xscale), Math.PI*5/4, 3 * Math.PI/4, true);
		ctx.stroke()
	}
	// stationary event to moving head
	if( now >= frames[1].T_start && now <= frames[1].T_end ) {
		ctx.beginPath();
		ctx.arc(750+0*xscale, 250, C*(now-frames[0].T_start)*(xscale), -Math.PI/4, Math.PI/4, false);
		ctx.stroke()
	}


	// stationary event to stationary tail
	if( now >= frames[2].T_start && now <= frames[1].T_end ) {
		ctx.beginPath();
		ctx.arc(250+0*xscale, 250, C*(now-frames[2].T_start)*(xscale), -Math.PI/4, Math.PI/4, false);
		ctx.stroke()
	}
	// stationary event to stationary head
	if( now >= frames[3].T_start && now <= frames[2].T_end ) {
		ctx.beginPath();
		ctx.arc(250+0*xscale, 250, C*(now-frames[3].T_start)*(xscale),  Math.PI*5/4, 3 * Math.PI/4, true);
		ctx.stroke()
	}

	ctx.strokeStyle = "red";
	// time from moving tail to moving observer
	if( now >= frames[4].T_start && now <= frames[4].T_end ) {
		ctx.beginPath();
		ctx.arc(750+(0+ frames[4].from.x)*xscale, 250, C*(now-frames[4].T_start)*(xscale), -Math.PI/4, Math.PI/4, false);
		ctx.stroke()
	}
	// time from moving head to moving observer
	if( now >= frames[5].T_start && now <= frames[5].T_end ) {
		ctx.beginPath();
		ctx.arc(750+(0+ frames[5].from.x)*xscale, 250, C*(now-frames[5].T_start)*(xscale),  Math.PI*5/4, 3 * Math.PI/4, true);
		ctx.stroke()
	}

	// time from moving tail to stationary observer
	if( now >= frames[6].T_start && now <= frames[6].T_end ) {
		ctx.beginPath();
		ctx.arc(250+(0+ frames[6].from.x)*xscale, 250, C*(now-frames[6].T_start)*(xscale), -Math.PI/4, Math.PI/4, false);
		ctx.stroke()
	}
	// time from moving head to stationary observer
	if( now >= frames[7].T_start && now <= frames[7].T_end ) {
		ctx.beginPath();
		ctx.arc(250+(0+ frames[7].from.x)*xscale, 250, C*(now-frames[7].T_start)*(xscale),  Math.PI*5/4, 3 * Math.PI/4, true);
		ctx.stroke()
	}

	ctx.strokeStyle = "green";
	// time from stationary tail to moving observer
	if( now >= frames[8].T_start && now <= frames[8].T_end ) {
		ctx.beginPath();
		ctx.arc(750+(0+ frames[8].from.x)*xscale, 250, C*(now-frames[8].T_start)*(xscale), -Math.PI/4, Math.PI/4, false);
		ctx.stroke()
	}
	// time from stationary head to moving observer
	if( now >= frames[9].T_start && now <= frames[9].T_end ) {
		ctx.beginPath();
		ctx.arc(750+(0+ frames[9].from.x)*xscale, 250, C*(now-frames[9].T_start)*(xscale),  Math.PI*5/4, 3 * Math.PI/4, true);
		ctx.stroke()
	}

	// time from stationary tail to stationary observer
	if( now >= frames[10].T_start && now <= frames[10].T_end ) {
		ctx.beginPath();
		ctx.arc(250+(0+ frames[10].from.x)*xscale, 250, C*(now-frames[10].T_start)*(xscale), -Math.PI/4, Math.PI/4, false);
		ctx.stroke()
	}
	// time from stationary head to stationary observer
	if( now >= frames[11].T_start && now <= frames[11].T_end ) {
		ctx.beginPath();
		ctx.arc(250+(0+ frames[11].from.x)*xscale, 250, C*(now-frames[11].T_start)*(xscale), Math.PI*5/4, 3 * Math.PI/4, true);
		ctx.stroke()
	}

	ctx.strokeStyle = "yellow";
	ctx.beginPath();
	ctx.moveTo( 250 + (now*V-L*lengthContract)*xscale, 250 );
	ctx.lineTo( 250 + (now*V+L*lengthContract)*xscale, 250 );
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo( 250, 250 - 0.25*xscale );
	ctx.lineTo( 250, 250 + 0.25*xscale );
	ctx.stroke();


	ctx.beginPath();
	ctx.moveTo( 750 + (now*V-L*lengthContract)*xscale, 250 );
	ctx.lineTo( 750 + (now*V+L*lengthContract)*xscale, 250 );
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo( 750 + (now*V)*xscale, 250 - 0.25*xscale );
	ctx.lineTo( 750 + (now*V)*xscale, 250 + 0.25*xscale );
	ctx.stroke();

		ctx.lineWidth = 2;
		ctx.strokeStyle = "#ffffff20";
	[{x:250,y:250},{x:750,y:250}, {x:250,y:750}, {x:750,y:750}].forEach( center=>{

		for( let x = -5; x <= 5; x++ ) {
				ctx.beginPath();
				ctx.moveTo( center.x + xscale*(-4.5), center.y - xscale*(x) );
				ctx.lineTo( center.x + xscale*4.5, center.y-xscale*(x));
			ctx.stroke();
				ctx.beginPath();
				ctx.moveTo( center.x + xscale*(x), center.y + xscale*(-4.5) );
				ctx.lineTo( center.x + xscale*(x), center.y+xscale*(4.5	));
			ctx.stroke();

		}
	} )

	ctx.beginPath();
	ctx.strokeStyle="white";
	ctx.moveTo( 250 + (-L)*xscale, 750 - now*xscale );
	ctx.lineTo( 250 + (L)*xscale, 750 - now*xscale );
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle="yellow";
	ctx.moveTo( 750 + (-L*lengthContract)*xscale, 752 - lNow*xscale );
	ctx.lineTo( 750 + (+L*lengthContract)*xscale, 752 - lNow*xscale );
	ctx.stroke();

	ctx.beginPath();
	// moving tail to stationary observer (fastest path)
	ctx.strokeStyle="red";
	ctx.moveTo( 250 + (frames[6].from.x)*xscale, 750 - frames[6].T_start*xscale );
	ctx.lineTo( 250 + (frames[6].from.x)*xscale, 750 - (frames[6].T_end)*xscale );
	ctx.stroke();
	ctx.beginPath();
	// moving head to stationary observer (fastest path)
	ctx.strokeStyle="red";
	ctx.moveTo( 250 + (frames[7].from.x)*xscale, 750 - frames[7].T_start*xscale );
	ctx.lineTo( 250 + (frames[7].from.x)*xscale, 750 - (frames[7].T_end)*xscale );
	ctx.stroke();
	ctx.beginPath();
	// Simul events to moving observer
	ctx.strokeStyle="#ddd";
	ctx.moveTo( 250 + (frames[7].from.x)*xscale, 750 - (frames[7].T_end)*xscale );
	ctx.lineTo( 250 + (frames[6].from.x)*xscale, 750 - (frames[6].T_end)*xscale );
	ctx.stroke();
	ctx.beginPath();

	ctx.beginPath();
	// stationary head to moving observer
	ctx.strokeStyle="green";
	ctx.moveTo( 750 + (L-V*frames[9].T_start)*xscale, 750 - frames[9].T_start*lengthContract*xscale );
	ctx.lineTo( 750 + (L-V*frames[9].T_start)*xscale, 750 - frames[9].T_end*lengthContract*xscale );
	ctx.stroke();

	ctx.beginPath();
	// stationary tail to moving observer (fastest path)
	ctx.strokeStyle="green";
	ctx.moveTo( 750 + (-L-V*frames[8].T_start)*xscale, 750 - frames[8].T_start*lengthContract*xscale );
	ctx.lineTo( 750 + (-L-V*frames[8].T_start)*xscale, 750 - frames[8].T_end*lengthContract*xscale );
	ctx.stroke();
	// simul events stationary observer

	ctx.beginPath();
	ctx.strokeStyle="#ddd";
	ctx.moveTo( 750 + (-L-V*frames[8].T_start)*xscale, 750 - frames[8].T_end*lengthContract*xscale );
	ctx.lineTo( 750 + (L-V*frames[9].T_start)*xscale, 750 - frames[9].T_end*lengthContract*xscale );
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle="green";
		// stationary head to stationary observer
	ctx.moveTo( 250 + (frames[10].from.x)*xscale, 750 - frames[10].T_start*xscale );
	ctx.lineTo( 250 + (frames[10].from.x)*xscale, 750 - (frames[10].T_end)*xscale );
	ctx.stroke();
	ctx.beginPath();
		// stationary tail to stationary observer
	ctx.moveTo( 250 + (frames[11].from.x)*xscale, 750 - frames[11].T_start*xscale );
	ctx.lineTo( 250 + (frames[11].from.x)*xscale, 750 - frames[11].T_end*xscale );
	ctx.stroke();




	ctx.strokeStyle="red";
	ctx.beginPath();
		// moving tail to moving observer
	ctx.moveTo( 750 + (-L)*lengthContract*xscale, 750 - frames[4].T_start*lengthContract*xscale );
	ctx.lineTo( 750 + (-L)*lengthContract*xscale, 750 - (frames[4].T_end_local)*xscale );
	ctx.stroke();
	ctx.beginPath();
		// moving head to moving observer
	ctx.moveTo( 750 + (L)*lengthContract*xscale, 750 - frames[5].T_start*lengthContract*xscale );
	ctx.lineTo( 750 + (L)*lengthContract*xscale, 750 - frames[5].T_end_local*xscale );
	ctx.stroke();



	ctx.beginPath();
	ctx.strokeStyle="yellow";
	ctx.moveTo( 250 + (V*now-L*lengthContract)*xscale, 752 - now*xscale );
	ctx.lineTo( 250 + (V*now+L*lengthContract)*xscale, 752 - now*xscale );
	ctx.stroke();
	//if( now < frames[9].T_start )
	{
		ctx.beginPath();
		ctx.strokeStyle="white";
		ctx.moveTo( 750 + (-V*now-L)*xscale, 750 - lNow*xscale );
		ctx.lineTo( 750 + (-V*now+L)*xscale, 750 - lNow*xscale );
		ctx.stroke();
	}


	if( animate ) 	requestAnimationFrame( draw );
}


