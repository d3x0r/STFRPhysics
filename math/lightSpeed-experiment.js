// this shows
// 2 arms, 1 center, and the emitted photon arcs from the arms...


import {lnQuat} from "../3d/src/lnQuatSq.js"
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
let S=60*60; // time scalar (s/s)
let tilt = 0;
let lat = 0;
let angle = 0;
let points = [{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];
let lengthContract = 1;
let runT = 24*60;
let runStart = 0;
let eventTime = 0;
let now = 0;
let animate = true;
let animating = false;
let last_draw_time = 0;
let xscale = 50;
const lnQ = new lnQuat();

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
const eventFrames = [];
let curFrame = -1;
const nFrames = 200;

class Frame{
	T_start = 0;
	from = [{x:0,y:0,z:0},{x:0,y:0,z:0}];

	T_end = 0;
	T_end_local = 0;

	static initFrames() {
		const lGam = Math.sqrt( C*C-V*V);
		const f0 = eventFrames[0];

		
		for( let frame of eventFrames ) {
			
		}

		
		f0.T_start = 0;
		// stationary frame seen by moving frame tail
		f0.T_end = ObservedTime( 0, {x:0, y:0, z:0}, {x:0,y:0,z:0}, {x:V,y:0,z:0}, {x:-L*lGam,y:0,z:0})
		f0.from.x = 0;
		f0.T_end_local = lGam*f0.T_end;
		const f1 = eventFrames[1];
		f1.T_start = 0;
		// stationary frame seen by moving frame head
		f1.T_end = ObservedTime( 0, {x:0, y:0, z:0}, {x:0,y:0,z:0}, {x:V,y:0,z:0}, {x:L*lGam,y:0,z:0})
		f1.from.x = 0;
		f1.T_end_local = lGam*f1.T_end;
		const f2 = eventFrames[2];
		f2.T_start = 0;
		// stationary frame seen by stationary frame tail
		f2.T_end = ObservedTime( 0, {x:0, y:0, z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0}, {x:-L,y:0,z:0})
		f2.from.x = 0;
		f2.T_end_local = f2.T_end;
		const f3 = eventFrames[3];
		f3.T_start = 0;
		// stationary frame seen by stationary frame head
		f3.T_end = ObservedTime( 0, {x:0, y:0, z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0}, {x:L,y:0,z:0})
		f3.from.x = 0;
		f3.T_end_local = f3.T_end;


		const f4 = eventFrames[4];
		f4.T_start = f0.T_end;
		// time from moving tail to moving observer
		f4.T_end = ObservedTime( f0.T_end, {x:V, y:0, z:0}, {x:-L*lGam,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0})
		f4.from.x = -L*lGam + f0.T_end*V;
		f4.T_end_local = lGam * f4.T_end;
		const f5 = eventFrames[5];
		f5.T_start = f1.T_end;
		// time from moving head to moving observer
		f5.T_end = ObservedTime( f1.T_end, {x:V, y:0, z:0}, {x:L*lGam,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0})
		f5.from.x = L*lGam + f1.T_end*V;
		f5.T_end_local = lGam * f5.T_end;

		const f6 = eventFrames[6];
		f6.T_start = f0.T_end;
		// time from moving tail to stationary observer
		f6.T_end = ObservedTime( f0.T_end, {x:V, y:0, z:0}, {x:-L*lGam,y:0,z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0})
		f6.from.x = -L*lGam + f0.T_end*V;
		f6.T_end_local = f6.T_end;
		const f7 = eventFrames[7];
		f7.T_start = f1.T_end;
		// time from moving head to stationary observer
		f7.T_end = ObservedTime( f1.T_end, {x:V, y:0, z:0}, {x:L*lGam,y:0,z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0})
		f7.from.x = +L*lGam + f1.T_end*V;
		f7.T_end_local = f7.T_end;


		const fs4 = eventFrames[8];
		fs4.T_start = f2.T_end;
		// time from stationary tail to moving observer
		fs4.T_end = ObservedTime( f2.T_end, {x:0, y:0, z:0}, {x:-L,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0})
		fs4.from.x = -L;
		fs4.T_end_local = lGam * fs4.T_end;
		const fs5 = eventFrames[9];
		fs5.T_start = f3.T_end;
		// time from stationary head to moving observer
		fs5.T_end = ObservedTime( f3.T_end, {x:0, y:0, z:0}, {x:L,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0})
		fs5.from.x = L;
		fs5.T_end_local = lGam * fs5.T_end;
		
		const fs6 = eventFrames[10];
		fs6.T_start = f2.T_end;
		// time from stationary tail to stationary observer
		fs6.T_end = ObservedTime( f2.T_end, {x:0, y:0, z:0}, {x:-L,y:0,z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0})
		fs6.from.x = -L;
		fs6.T_end_local = fs6.T_end;
		const fs7 = eventFrames[11];
		fs7.T_start = f3.T_end;
		// time from stationary head to stationary observer
		fs7.T_end = ObservedTime( f3.T_end, {x:0, y:0, z:0}, {x:L,y:0,z:0}, {x:0,y:0,z:0}, {x:0,y:0,z:0})
		fs7.from.x = L;
		fs7.T_end_local = fs7.T_end;


		for( let i = 0; i < 12; i++ ){
			console.log( "from:", eventFrames[i].T_start.toFixed(3), "to:", eventFrames[i].T_end.toFixed(3), "L:", eventFrames[i].T_end_local.toFixed(3))
		}

	}
	
}

for( let n = 0; n < nFrames; n++ ) {
	eventFrames.push( new Frame() );
}


const controls = document.getElementById( "controls" );

let span = document.createElement( "br" );
controls.appendChild( span );

span = document.createElement( "span" );
span.textContent = "C: ";
controls.appendChild( span );

const sliderC = document.createElement( "input" );
sliderC.setAttribute( "type", "range" );
controls.appendChild( sliderC );
sliderC.addEventListener( "input", update );

sliderC.setAttribute( "max",1250 );
sliderC.style.display = "none";
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

sliderNow.setAttribute( "min",0 );
sliderNow.setAttribute( "max",1000 );
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

span = document.createElement( "span" );
span.textContent = "Tilt";
controls.appendChild( span );

const sliderT = document.createElement( "input" );
sliderT.setAttribute( "type", "range" );
controls.appendChild( sliderT );
sliderT.addEventListener( "input", update );

sliderT.setAttribute( "max",3600 );
sliderT.value = 0;
sliderT.style.width="250px";

const spanT = document.createElement( "span" );
spanT.textContent = "1";
controls.appendChild( spanT );

span = document.createElement( "br" );
controls.appendChild( span );

//----------------------

span = document.createElement( "span" );
span.textContent = "Latitude";
controls.appendChild( span );

const sliderLat = document.createElement( "input" );
sliderLat.setAttribute( "type", "range" );
controls.appendChild( sliderLat );
sliderLat.addEventListener( "input", update );

sliderLat.setAttribute( "min",-900 );
sliderLat.setAttribute( "max",900 );
sliderLat.value = 0;
sliderLat.style.width="250px";

const spanLat = document.createElement( "span" );
spanLat.textContent = "0";
controls.appendChild( spanLat );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.textContent = "Ether Direction";
controls.appendChild( span );

const sliderAngle = document.createElement( "input" );
sliderAngle.setAttribute( "type", "range" );
controls.appendChild( sliderAngle );
sliderAngle.addEventListener( "input", update );

sliderAngle.setAttribute( "max",3600 );
sliderAngle.value = 0;
sliderAngle.style.width="250px";

const spanAngle = document.createElement( "span" );
spanAngle.textContent = "1";
controls.appendChild( spanAngle );

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

	animate = chkLblNow.checked;
	if( animate ) {
	}else
		now = (Number(sliderNow.value)/1000)*runT+runStart;

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

	tilt = Number(sliderT.value)/10;
	spanT.textContent = tilt.toFixed(2)+"°";

	lat = Number(sliderLat.value)/900 * Math.PI/2;
	spanLat.textContent = (lat*180/Math.PI).toFixed(2)+"°";
	
	angle = Number(sliderAngle.value)/10;
	spanAngle.textContent = angle.toFixed(2)+"°";


	//S = Number(sliderS.value)/10;
	//spanS.textContent = S.toFixed(2);
  	params.lengthContract = drawOpts.lengthContract
	params.lGam = lengthContract = drawOpts.lengthContract?V<C?Math.sqrt(C*C-V*V)/(C*C):Math.sqrt(V*V-C*C)/(C*C):1;

	spanNow.textContent = ((Math.floor(now/60)).toFixed(0)).padStart(2,'0') + ":"+ (Math.floor(now%60)).toFixed(0).padStart(2,'0') +" (hh:mm)";

	Frame.initFrames();

	let max = eventFrames[8].T_end;
	if( eventFrames[9].T_end > max ) 
		max = eventFrames[9].T_end;
	if( eventFrames[6].T_end/lengthContract > max ) 
		max = eventFrames[6].T_end/lengthContract;
	if( eventFrames[7].T_end/lengthContract > max ) 
		max = eventFrames[7].T_end/lengthContract;
		
	//runT = max + 0.5;
//	spanRunT.textContent = runT.toFixed(2)+"ns";
	lnQuat.setTwistDelta( Math.PI/2 + tilt/360*Math.PI*2 );
	lnQ.set( {lat:Math.PI/2 + lat,lng:Math.PI/2}, true );
	lnQ.freeSpin( now/runT*Math.PI*2, {x:0,y:1,z:0} );
	
	points[0] = lnQ.apply( {x:-L,y:0,z:0} );
	points[2] = lnQ.apply( {x:L,y:0,z:0} );

	points[0].x = params.lGam*points[0].x;
	points[2].x = params.lGam*points[2].x;
	

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
				, clockRadius, 0-Math.PI/2, ((T)%1) * (Math.PI*2)-Math.PI/2, false);
		ctx.lineTo( centerX+x, centerY-y );
		ctx.closePath();
	ctx.stroke();
	ctx.fill();	

	ctx.beginPath();

		ctx.strokeStyle = "blue";
		ctx.fillStyle = "green";

		ctx.arc(centerX + x, centerY+clockRadius*2.5 - y
				, clockRadius, 0-Math.PI/2, ((2*(T))%1) * (Math.PI*2)-Math.PI/2, false);
		ctx.lineTo( centerX+x, centerY+clockRadius*2.5-y );
		ctx.closePath();
	ctx.stroke();
	ctx.fill();	

}

function draw(  ) {
	
	const beamX = canvas.width/2;
	const beamY = canvas.height/2 + 40;

	if( animate ) {
		now = ( ( (Date.now() * S) %(runT*1000*60) ) / (1000*60))+runStart;
		sliderNow.value =1000*(now-runStart)/runT;
		spanNow.textContent = (Math.floor(now/60)).toFixed(0).padStart(2,'0') + ":" + (now%60).toFixed(0).padStart(2,'0') +" (hh:mm)";
	} else {
		animating = false;
	}


	const lNow = lengthContract*now;
	ctx.clearRect( 0, 0, 1024, 1024);

	const lastHour = Math.floor( now / 60 );
	const lastMin = now - lastHour*60;


	
		const etherSin = Math.sin( angle /360 * 2 * Math.PI );
		const etherCos = Math.cos( angle /360 * 2 * Math.PI );

		const effV =  {x:V*etherCos,y:V*etherSin,z:0};
//	drawClock( 0, -550, now, now.toFixed(2) );
//	drawClock( 500, -550, now*lengthContract, (now*lengthContract).toFixed(2) );

	lnQuat.setTwistDelta( Math.PI/2 + tilt/360*Math.PI*2 );
	lnQ.set( {lat:Math.PI/2 + lat,lng:Math.PI/2}, true );
	lnQ.freeSpin( lastHour/24*Math.PI*2, {x:0,y:1,z:0} );
	
	points[0] = lnQ.apply( {x:-L*xscale,y:0,z:0} );
	points[2] = lnQ.apply( {x:L*xscale,y:0,z:0} );

	points[0].x = params.lGam*points[0].x*etherCos;
	points[2].x = params.lGam*points[2].x*etherCos;
	points[0].x = params.lGam*points[0].y*etherSin;
	points[2].x = params.lGam*points[2].y*etherSin;

	// count back up to 10 hours... 
	for( let del = 0; del < 10; del++ ) 
	{
		const hr = (lastHour -del)+24;


	lnQuat.setTwistDelta( Math.PI/2 + tilt/360*Math.PI*2 );
	lnQ.set( {lat:Math.PI/2 + lat,lng:Math.PI/2}, true );
	lnQ.freeSpin( hr/24*Math.PI*2, {x:0,y:1,z:0} );
		
	points[0] = lnQ.apply( {x:-L*xscale,y:0,z:0} );
	points[2] = lnQ.apply( {x:L*xscale,y:0,z:0} );

	points[0].x = params.lGam*points[0].x*etherCos;
	points[2].x = params.lGam*points[2].x*etherCos;
	points[0].y = params.lGam*points[0].y*etherSin;
	points[2].y = params.lGam*points[2].y*etherSin;



		const l1 = Math.sqrt( points[0].x * points[0].x + points[0].y * points[0].y + points[0].z * points[0].z );
		const l2 = Math.sqrt( points[2].x * points[2].x + points[2].y * points[2].y + points[2].z * points[2].z );
		const del0 = ObservedTime( (lastHour-del)*60, effV, points[0], effV, {x:0,y:0,z:0} );
		const del1 = ObservedTime( (lastHour-del)*60, effV, points[2], effV, {x:0,y:0,z:0} );
		if( !( ( now < del0 ) || ( now < del1 ) ) ) {
			break;
		}

		if( now < del0 ) {
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.arc(500+points[0].x - V/C*(del*60+lastMin)*etherCos, 500+points[0].y- V/C*(del*60+lastMin)*etherSin, (del*60+lastMin), 0, 2*Math.PI, true);
			ctx.stroke()

			ctx.moveTo( 500+points[0].x, 500+points[0].y );
			ctx.lineTo( 500+points[0].x - V/C*(del*60+lastMin)*etherCos, 500+points[0].y- V/C*(del*60+lastMin)*etherSin );
			ctx.stroke()


			ctx.beginPath();
				ctx.arc(500+points[0].x - V/C*(del*60+lastMin)*etherCos, 700+points[0].z, (del*60+lastMin), 0, 2 * Math.PI, true);
			ctx.stroke()

			ctx.moveTo( 500+points[0].x, 700+points[0].z );
			ctx.lineTo( 500+points[0].x - V/C*(del*60+lastMin)*etherCos, 700+points[0].z );
			ctx.stroke()

			ctx.beginPath();
				ctx.arc(700+points[0].y- V/C*(del*60+lastMin)*etherSin, 700+points[0].z, (del*60+lastMin)/60*xscale, 0, 2 * Math.PI, true);
			ctx.stroke()

			ctx.moveTo( 700+points[0].y, 700+points[0].z );
			ctx.lineTo( 700+points[0].y - V/C*(del*60+lastMin)*etherSin, 700+points[0].z );
			ctx.stroke()

		}

		if( now < del1 ) {
	
			ctx.beginPath();
			ctx.strokeStyle = "green";
				ctx.arc(500+points[2].x - V/C*(del*60+lastMin)*etherCos, 500+points[2].y - V/C*(del*60+lastMin)*etherSin, (del*60+lastMin), 0, 2*Math.PI, true);
			ctx.stroke()
			ctx.moveTo( 500+points[2].x, 500+points[2].y );
			ctx.lineTo( 500+points[2].x - V/C*(del*60+lastMin)*etherCos, 500+points[2].y - V/C*(del*60+lastMin)*etherSin );
			ctx.stroke()

			ctx.beginPath();
				ctx.arc(500+points[2].x - V/C*(del*60+lastMin)*etherCos, 700+points[2].z, (del*60+lastMin), 0, 2 * Math.PI, true);
			ctx.stroke()

			ctx.moveTo( 500+points[2].x, 700+points[2].z );
			ctx.lineTo( 500+points[2].x - V/C*(del*60+lastMin)*etherCos, 700+points[2].z );
			ctx.stroke()



			ctx.beginPath();
				ctx.arc(700+points[2].y - V/C*(del*60+lastMin)*etherSin, 700+points[2].z, (del*60+lastMin)/60*xscale, 0, 2 * Math.PI, true);
			ctx.stroke()

			ctx.moveTo( 700+points[2].y, 700+points[2].z );
			ctx.lineTo( 700+points[2].y - V/C*(del*60+lastMin)*etherSin, 700+points[2].z );
			ctx.stroke()

		}
	}

			ctx.beginPath();
			ctx.strokeStyle = "cyan";
			ctx.beginPath();
				ctx.arc(500, 700, 4, 0, 2 * Math.PI, true);
			ctx.stroke()
			ctx.beginPath();
				ctx.arc(700, 700, 4, 0, 2 * Math.PI, true);
			ctx.stroke()
			ctx.beginPath();
				ctx.arc(500, 500, 4, 0, 2 * Math.PI, true);
			ctx.stroke()

	lnQuat.setTwistDelta( Math.PI/2 + tilt/360*Math.PI*2 );
	lnQ.set( {lat:Math.PI/2 + lat,lng:Math.PI/2}, true );
	lnQ.freeSpin( now/runT*Math.PI*2, {x:0,y:1,z:0} );
	
	points[0] = lnQ.apply( {x:-L,y:0,z:0} );
	points[2] = lnQ.apply( {x:L,y:0,z:0} );

	points[0].x = params.lGam*points[0].x*etherCos;
	points[2].x = params.lGam*points[2].x*etherCos;
	points[0].y = params.lGam*points[0].y*etherSin;
	points[2].y = params.lGam*points[2].y*etherSin;


	ctx.beginPath();
	ctx.strokeStyle = "white";

	ctx.moveTo( 500 + points[0].x * xscale, 500 + points[0].y  * xscale);
	ctx.lineTo( 500 + points[2].x * xscale, 500 + points[2]. y * xscale );
	ctx.stroke();


	ctx.moveTo( 500 + points[0].x * xscale, 700 + points[0].z  * xscale);
	ctx.lineTo( 500 + points[2].x * xscale, 700 + points[2]. z * xscale );
	ctx.stroke();

	ctx.moveTo( 700 + points[0].y * xscale, 700 + points[0].z  * xscale);
	ctx.lineTo( 700 + points[2].y * xscale, 700 + points[2]. z * xscale );
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "#630";
	ctx.lineWidth = 1;
	for( let m = 0.5; m < 100; m+= 10 ) {
		ctx.moveTo( 0, 300+m );
		ctx.lineTo( 1000, 300+m );
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.strokeStyle = "#363";
	ctx.lineWidth = 1;
	for( let m = 0.5; m < 100; m+= 10 ) {
		ctx.moveTo( 0, 300-m );
		ctx.lineTo( 1000, 300-m );
		ctx.stroke();
	}


	ctx.beginPath();
	ctx.strokeStyle = "red";
	for( let m = 0; m < 24*60; m+= 5 ) {

		lnQuat.setTwistDelta( Math.PI/2 + tilt/360*Math.PI*2 );
		lnQ.set( {lat:Math.PI/2 + lat,lng:Math.PI/2}, true );
		lnQ.freeSpin( m/(24*60)*Math.PI*2, {x:0,y:1,z:0} );
		lnQ.freeSpin( angle/(360)*Math.PI*2, {x:0,y:0,z:1} );
		
		points[0] = lnQ.apply( {x:-L,y:0,z:0} );
		points[2] = lnQ.apply( {x:L,y:0,z:0} );
	   
		points[0].x = params.lGam*points[0].x;
		points[2].x = params.lGam*points[2].x;

		const l1 = Math.sqrt( points[0].x * points[0].x + points[0].y * points[0].y + points[0].z * points[0].z );
		if( m === 0 ) {
			const Y = 300-xscale*(ObservedTime( m, {x:V,y:0,z:0}, points[0], {x:V,y:0,z:0}, {x:0,y:0,z:0} )-m )*params.lGam;
			ctx.moveTo( m/runT*990 + 5, Y );
			ctx.fillText( "A", 20, Y-10 );
		} else
			ctx.lineTo( m/runT*990 + 5, 300-xscale*(ObservedTime( m, {x:V,y:0,z:0}, points[0], {x:V,y:0,z:0}, {x:0,y:0,z:0} )-m )*params.lGam );
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "magenta";
	for( let m = 0; m < 24*60; m+= 5 ) {

		lnQuat.setTwistDelta( Math.PI/2 + tilt/360*Math.PI*2 );
		lnQ.set( {lat:Math.PI/2 + lat,lng:Math.PI/2}, true );
		lnQ.freeSpin( m/(24*60)*Math.PI*2, {x:0,y:1,z:0} );
		lnQ.freeSpin( angle/(360)*Math.PI*2, {x:0,y:0,z:1} );
		
		points[0] = lnQ.apply( {x:-L,y:0,z:0} );
		points[2] = lnQ.apply( {x:L,y:0,z:0} );
	   
		points[0].x = params.lGam*points[0].x;
		points[2].x = params.lGam*points[2].x;

		const l1 = Math.sqrt( points[0].x * points[0].x + points[0].y * points[0].y + points[0].z * points[0].z );
		const l2 = Math.sqrt( points[2].x * points[2].x + points[2].y * points[2].y + points[2].z * points[2].z );
		if( m === 0 ) {
			const Y = 300-xscale*((ObservedTime( m, {x:V,y:0,z:0}, points[2], {x:V,y:0,z:0}, {x:0,y:0,z:0} )-m)+ObservedTime( m, effV, points[0], {x:V,y:0,z:0}, {x:0,y:0,z:0} )-m )*params.lGam;
			ctx.fillText( "A+B (two-way time)", 100, Y-10 );

			ctx.moveTo( m/runT*990 + 5, Y );
		} else
			ctx.lineTo( m/runT*990 + 5, 300-xscale*((ObservedTime( m, {x:V,y:0,z:0}, points[2], {x:V,y:0,z:0}, {x:0,y:0,z:0} )-m)+ObservedTime( m, {x:V,y:0,z:0}, points[0], {x:V,y:0,z:0}, {x:0,y:0,z:0} )-m )*params.lGam );
	}
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "green";
	for( let m = 0; m < 24*60; m+= 5 ) {

		lnQuat.setTwistDelta( Math.PI/2 + tilt/360*Math.PI*2 );
		lnQ.set( {lat:Math.PI/2 + lat,lng:Math.PI/2}, true );
		lnQ.freeSpin( m/(24*60)*Math.PI*2, {x:0,y:1,z:0} );
		lnQ.freeSpin( angle/(360)*Math.PI*2, {x:0,y:0,z:1} );
		
		points[0] = lnQ.apply( {x:-L,y:0,z:0} );
		points[2] = lnQ.apply( {x:L,y:0,z:0} );
	   
		points[0].x = params.lGam*points[0].x;
		points[2].x = params.lGam*points[2].x;

		const l2 = Math.sqrt( points[2].x * points[2].x + points[2].y * points[2].y + points[2].z * points[2].z );

		if( m === 0 ) {
			const Y = 300-xscale*(ObservedTime( m, {x:V,y:0,z:0}, points[2], {x:V,y:0,z:0}, {x:0,y:0,z:0} )-m )*params.lGam;
			ctx.fillText( "B", 20, Y-10 );
			ctx.moveTo( m/runT*990 + 5, Y );
		} else
			ctx.lineTo( m/runT*990 + 5, 300-xscale*(ObservedTime( m, {x:V,y:0,z:0}, points[2], {x:V,y:0,z:0}, {x:0,y:0,z:0} )-m )*params.lGam );
	}
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "yellow";
	for( let m = 0; m < 24*60; m+= 5 ) {

		lnQuat.setTwistDelta( Math.PI/2 + tilt/360*Math.PI*2 );
		lnQ.set( {lat:Math.PI/2 + lat,lng:Math.PI/2}, true );
		lnQ.freeSpin( m/(24*60)*Math.PI*2, {x:0,y:1,z:0} );
		lnQ.freeSpin( angle/(360)*Math.PI*2, {x:0,y:0,z:1} );
		
		points[0] = lnQ.apply( {x:-L,y:0,z:0} );
		points[2] = lnQ.apply( {x:L,y:0,z:0} );
	   
		points[0].x = params.lGam*points[0].x;
		points[2].x = params.lGam*points[2].x;

		if( m === 0 ) {
			const Y = 300-xscale*(ObservedTime( m, effV, points[0], effV, {x:0,y:0,z:0} )-m - ( ObservedTime( m, effV, points[2], effV, {x:0,y:0,z:0} )-m) )*params.lGam
			ctx.moveTo( m/runT*990 + 5, Y );
			ctx.fillText( "A-B", 20, Y-10 );
		} else
			ctx.lineTo( m/runT*990 + 5, 300-xscale*(ObservedTime( m, effV, points[0], effV, {x:0,y:0,z:0} )-m - (ObservedTime( m, effV, points[2], effV, {x:0,y:0,z:0} )-m) )*params.lGam );
	}
	ctx.stroke();



	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.moveTo( now/runT*990 + 5, 300 - 100 );
	ctx.lineTo( now/runT*990 + 5, 300 + 100 );
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.fillText( "X-Y", 500-xscale, 500-xscale );
	ctx.fillText( "X-Z", 500-xscale, 700-xscale );
	ctx.fillText( "Y-Z", 700-xscale, 700-xscale );




	if( animate ) 	requestAnimationFrame( draw );
}


