
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
let D=1; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let O=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let O2=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=0.2; // velocity  (m/s)
let V2=0; // observer's velocity  (m/s)
let S=1; // time scalar (s/s)
let primeZero = 0;
let lengthContract = 1;
let runT = 10;
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
	Ph = 0;
	Pc = 0;
	Pt = 0;
	hue = 0;
	T_start = 0;

	T_see_h = 0;
	T_see_c = 0;
	T_see_t = 0;

	static initFrames() {

		for( let n = 0; n < nFrames; n++ ) {
			const del = n/nFrames;
			const now = (del * runT)-runT/2;

			const f = frames[n];

			f.Pc = now*V 
			f.Ph = f.Pc+L*lengthContract;
			f.Pt = f.Pc-L*lengthContract;
			f.hue = 120*(now%3)-240;
			f.T_start = now;
			f.T_see_h = realTimeToObserverTime( now, L );
			f.T_see_c = realTimeToObserverTime( now, 0 );
			f.T_see_t = realTimeToObserverTime( now, -L );
	   
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
span.textContent = "Offset";
controls.appendChild( span );

const sliderO = document.createElement( "input" );
sliderO.setAttribute( "type", "range" );
controls.appendChild( sliderO );
sliderO.addEventListener( "input", update );

sliderO.setAttribute( "max",100 );
sliderO.value = (O*10)+50;
sliderO.style.width="250px";

const spanO = document.createElement( "span" );
spanO.textContent = "1";
controls.appendChild( spanO );

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
sliderV.value = 500+V*500;
sliderV.style.width="250px";

const spanV = document.createElement( "span" );
spanV.textContent = "1";
controls.appendChild( spanV );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.textContent = "Observer's Velocity";
controls.appendChild( span );

const sliderV2 = document.createElement( "input" );
sliderV2.setAttribute( "type", "range" );
controls.appendChild( sliderV2 );
sliderV2.addEventListener( "input", update );

sliderV2.setAttribute( "max",1000 );
sliderV2.value = 500+V2*50;
sliderV2.style.width="250px";

const spanV2 = document.createElement( "span" );
spanV2.textContent = "1";
controls.appendChild( spanV2 );

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

span = document.createElement( "span" );
span.textContent = "Event Time";
controls.appendChild( span );

const sliderEvent = document.createElement( "input" );
sliderEvent.setAttribute( "type", "range" );
controls.appendChild( sliderEvent );
sliderEvent.addEventListener( "input", update );

sliderEvent.setAttribute( "min",-100 );
sliderEvent.setAttribute( "max",100 );
sliderEvent.value = eventTime;
sliderEvent.style.width="250px";

const spanEvent = document.createElement( "span" );
spanEvent.textContent = eventTime;
controls.appendChild( spanEvent );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.textContent = "Prime Bias";
controls.appendChild( span );

const sliderPrime = document.createElement( "input" );
sliderPrime.setAttribute( "type", "range" );
controls.appendChild( sliderPrime );
sliderPrime.addEventListener( "input", update );

sliderPrime.setAttribute( "max",100 );
sliderPrime.value = primeZero*100;
sliderPrime.style.width="250px";

const spanPrime = document.createElement( "span" );
spanPrime.textContent = "1";
controls.appendChild( spanPrime );

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

//----------------------

//----------------------

span = document.createElement( "span" );
span.textContent = "Wave 1";
controls.appendChild( span );

const spanWave1 = document.createElement( "span" );
spanWave1.textContent = "";
controls.appendChild( spanWave1 );
//----------------------

span = document.createElement( "span" );
span.textContent = "Wave 2";
controls.appendChild( span );

const spanWave2 = document.createElement( "span" );
spanWave2.textContent = "";
controls.appendChild( spanWave2 );
//----------------------

span = document.createElement( "span" );
span.textContent = "Wave 3";
controls.appendChild( span );

const spanWave3 = document.createElement( "span" );
spanWave3.textContent = "";
controls.appendChild( spanWave3 );

//----------------------
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


function update( evt ) {
	updates.map( upd=>upd() );

	runT = Number(sliderRunT.value)/5;
	spanRunT.textContent = runT.toFixed(2)+"ns";

	animate = chkLblNow.checked;
	if( animate ) {
	}else
		now = Number(sliderNow.value)/100*runT/2;

	eventTime = Number( sliderEvent.value ) / 100 * runT;
	spanEvent.textContent = eventTime.toFixed(2);

	C = Number(sliderC.value)/100;
	params.C = C;
	spanC.textContent = C.toFixed(2)+"ft/ns";
	D = Number(sliderD.value)/10;
	spanD.textContent = D.toFixed(2)+"ft";
	V = Number(sliderV.value)/500 - 1;
	if( V === 1 ) V-=0.0001;
	V2 = Number(sliderV2.value)/500 - 1;
	if( V2 === 1 ) V2-=0.0001;
	D3xTransform.myV = V2;
	D3xTransform.V = V;
	D3xTransform.D = D;
	spanV.textContent = V.toFixed(4) +"c";
	spanV2.textContent = V2.toFixed(4) +"c";
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(2)+"ft";
	primeZero = Number(sliderPrime.value)/100;
	spanPrime.textContent = primeZero.toFixed(2);

	if( !animate && drawOpts.forceSameEvent ) {
		O2 = -now*(V-V2);
		O = O2/10 ;
		sliderO.value = (O+1)*50;
		spanO.textContent = O.toFixed(2) + "ft | " + O2.toFixed(2)+"ft";

	} else {
		O = L*((Number(sliderO.value)/50)-1);
		O2 = 10*((Number(sliderO.value)/50)-1);
		spanO.textContent = O.toFixed(2) + "ft | " + O2.toFixed(2)+"ft";
	}

	//S = Number(sliderS.value)/10;
	//spanS.textContent = S.toFixed(2);
   params.lengthContract = drawOpts.lengthContract
	params.lGam = lengthContract = drawOpts.lengthContract?V<C?Math.sqrt(C*C-V*V)/(C*C):Math.sqrt(V*V-C*C)/(C*C):1;

	spanNow.textContent = now.toFixed(2) +"ns";



	spanWave1.textContent = "|" + (20*lengthContract*lengthContract*(1/(C+V))).toFixed(2)  + "|"  + ((20*lengthContract*lengthContract*(1/(C+V)) + (20*lengthContract*lengthContract*(1/(C-V))))).toFixed(2)  + "|";
	spanWave2.textContent = "|" + (20*lengthContract*lengthContract*(1/(C-V))).toFixed(2)  + "|";
	spanWave3.textContent = "|" + (20).toFixed(2)  + "|" + (2*20).toFixed(2)  + "|";

	//const hLen = (L-D2)/(C+V) ;
	//const tLen = ((L+D2)/(C-V));//((D2-L)/C)*Math.sqrt(C*C-V*V);
		//2(CD+LV)/(CC-VV)

		// 2D  //  V=0, L=any(any time after a fixed start point is same), C=1  sqrt(1-v/c)=1
		// A+B = 2D
		// a = A/D   b = A/D
		// a+b=2
		// 1-a/b = b/a-1 = 0   QM balance.

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
		if( T < 0 )
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
		now = ( ( (Date.now() * S) %(runT*1000) ) / 1000) - runT/2;
		sliderNow.value =100*now*2/runT
		spanNow.textContent = now.toFixed(2)+"ns";
	} else {
		animating = false;
	}
	const frame = Math.floor( (now+runT/2)*10 );


	ctx.clearRect( 0, 0, 1024, 1024);


	const lGam = lengthContract;//Math.sqrt(1-V*V/(C*C));
	const tGam = lengthContract;//Math.sqrt(1-V*V/(C*C));
	const cL = L*lGam;
	const localNow = now*tGam;
	// observer in observable, moving along the length of it.
	// when the front and back are seen.
	const timeFront = RealTime( now, {x:V,y:0,z:0}, {x: (L-O)*lGam,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0} )[0]*(tGam);
	const timeBack  = RealTime( now, {x:V,y:0,z:0}, {x:(-L-O)*lGam,y:0,z:0}, {x:V,y:0,z:0}, {x:0,y:0,z:0} )[0]*(tGam);


	const timeFront2   = RealTime2( now, {x:V,y:0,z:0}, {x:O2,y:0,z:0}, {x: cL,y:0,z:0}, {x:V2,y:0,z:0}, {x:0,y:-D,z:0} )[0] *tGam;
	const timeBack2    = RealTime2( now, {x:V,y:0,z:0}, {x:O2,y:0,z:0}, {x:-cL,y:0,z:0}, {x:V2,y:0,z:0}, {x:0,y:-D,z:0} )[0] *tGam;
	const timeCenter2a = RealTime2( now, {x:V,y:0,z:0}, {x:O2,y:0,z:0}, {x:0,y:0,z:0}  , {x:V2,y:0,z:0}, {x:0,y:-D,z:0} )[0] *tGam;

	const timeCenter2 = RealTime( now, {x:V,y:0,z:0}, {x:0,y:0,z:0}  , {x:V2,y:0,z:0}, {x:0,y:-D,z:0} )[0] *tGam;
	const reverseObserve = RealTime( now, {x:-V2,y:0,z:0}, {x:0,y:-D,z:0}, {x:-V,y:0,z:0}, {x:0,y:0,z:0} )[0];

	const timeFront_frame = RealTime( now, {x:0,y:0,z:0}, {x: 10,y:0,z:0}, {x:V,y:0,z:0}, {x: O2,y:-D,z:0} )[0];
	const timeBack_frame  = RealTime( now, {x:0,y:0,z:0}, {x:-10,y:0,z:0}, {x:V,y:0,z:0}, {x: O2,y:-D,z:0} )[0];
	const timeFrontFront_frame = RealTime( now, {x:0,y:0,z:0}, {x: 10,y:0,z:0}, {x:V,y:0,z:0}, {x: O2+L,y:-D,z:0} )[0];
	const timeFrontBack_frame  = RealTime( now, {x:0,y:0,z:0}, {x:-10,y:0,z:0}, {x:V,y:0,z:0}, {x: O2+L,y:-D,z:0} )[0];
	const timeBackFront_frame = RealTime( now, {x:0,y:0,z:0}, {x: 10,y:0,z:0}, {x:V,y:0,z:0}, {x: O2-L,y:-D,z:0} )[0];
	const timeBackBack_frame  = RealTime( now, {x:0,y:0,z:0}, {x:-10,y:0,z:0}, {x:V,y:0,z:0}, {x: O2-L,y:-D,z:0} )[0];

	if( drawOpts.drawGrid )
	{
		ctx.strokeStyle = "#ffFFFf40";
		ctx.lineWidth = 3;
				ctx.beginPath();
				ctx.moveTo( centerX + xscale*(-20), centerY - xscale*(-20) );
				ctx.lineTo( centerX + 0+ xscale*(20), centerY-xscale*(20));
			ctx.stroke();
				ctx.beginPath();
				ctx.moveTo( centerX + xscale*(20), centerY - xscale*(-20) );
				ctx.lineTo( centerX + 0+ xscale*(-20), centerY-xscale*(20));
			ctx.stroke();

		ctx.lineWidth = 2;
		ctx.strokeStyle = "#ffffff20";

		for( let x = -10; x <= 10; x++ ) {
				ctx.beginPath();
				ctx.moveTo( centerX + xscale*(-10), centerY - xscale*(x) );
				ctx.lineTo( centerX + xscale*10, centerY-xscale*(x));
			ctx.stroke();
				ctx.beginPath();
				ctx.moveTo( centerX + xscale*(x), centerY + xscale*(-10) );
				ctx.lineTo( centerX + xscale*(x), centerY+xscale*(10));
			ctx.stroke();

		}
	}

	
	drawClock( 0, 0, now, "Now" );
	drawClock( -clockRadius*5, 0, timeCenter2, "Saw Now" );

	ctx.fillStyle = "#FFF";
	if( drawOpts.showFreq ) {
		
		for( let x = 0; x < canvas.width; x++ ) {
			const T=20 * (x-canvas.width/2)/canvas.width;
			
			{
			const c = Math.cos(lengthContract*T*lengthContract*(1/(C+V))*Math.PI*2) * xscale/2;
			ctx.fillRect( 500+T*xscale, 700-c, 1, 1 );
			}
			{
			const c = Math.cos(lengthContract*lengthContract*T*(1/(C-V))*Math.PI*2) * xscale/2;
			ctx.fillRect( 500+T*xscale, 800-c, 1, 1 );
			}
			const c = Math.cos(lengthContract*T/tGam*Math.PI*2) * xscale/2;
			ctx.fillRect( 500+T*xscale, 900-c, 1, 1 );
		}
	}

	//if( 
		ctx.lineWidth = 3;


	if( drawOpts.drawOffsetObserver ) {
//-------------------------------
		// this is 
		ctx.strokeStyle = "#dd0";
	   
		{
			ctx.beginPath();
			// this is the ship's current location to the ship, in real time. (line across)
			ctx.moveTo( centerX + xscale*((1-primeZero)*(V*now)-L*lGam)+ xscale*O2, centerY - ((1-primeZero)*now+ (primeZero*localNow))*xscale);
			ctx.lineTo( centerX + xscale*((1-primeZero)*(V*now)+L*lGam)+ xscale*O2, centerY - xscale*((1-primeZero)*now+ (primeZero*localNow)) );
			ctx.stroke();
			ctx.drawImage( shipImage, centerX + xscale*(O2+(1-primeZero)*(V*now)-L*lGam), centerY - xscale*(((1-primeZero)*now+ (primeZero*localNow))) - 50, 100*lGam*L, 100 );
		}
	   
		{
			ctx.beginPath();
			// this is where the observer's view of the ship is.
			ctx.moveTo( centerX + xscale*(0), centerY+0);
			ctx.lineTo( centerX + xscale*((primeZero)*(V2*now)+primeZero*(-V*now)), centerY - xscale*((1-primeZero)*now+ (primeZero*localNow)) );
			ctx.stroke();

		{
			ctx.beginPath();
			// this is the ship's center location
			ctx.moveTo( centerX + 0+ xscale*O2, centerY+0);
			ctx.lineTo( centerX + xscale*((1-primeZero)*(V*now))+ xscale*O2, centerY - xscale*((1-primeZero)*now+ (primeZero*localNow)) );
			ctx.stroke();


		}
			// this is the ship's front location
			ctx.moveTo( centerX + xscale*(O2+cL), centerY+0);
			ctx.lineTo( centerX + xscale*((O2+cL)+(1-primeZero)*(V*now)), centerY - xscale*((1-primeZero)*now+ (primeZero*localNow)) );
			ctx.stroke();
			// this is the ship's back location
			ctx.moveTo( centerX + xscale*(O2-cL), centerY+0);
			ctx.lineTo( centerX + xscale*((O2-cL)+(1-primeZero)*(V*now)), centerY - xscale*((1-primeZero)*now+ (primeZero*localNow)) );
			ctx.stroke();
		}
	}
	

	if( drawOpts.drawObserverLocal )
	{
		drawClock( clockRadius*3, 0, localNow, "L Now" );
		drawClock( clockRadius*3, clockRadius*6, timeFront, "L Fnt" );
		drawClock( clockRadius*3, -clockRadius*6, timeBack, "L Bck" );

		ctx.beginPath();
		ctx.strokeStyle = "#0EE";
		ctx.moveTo( centerX + xscale*(V*now-L*lGam), centerY - xscale*(localNow));
		// real position vs local clock.
		ctx.lineTo( centerX + xscale*(V*now+L*lGam), centerY - xscale*(localNow) );
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "#707";
		ctx.moveTo( centerX + xscale*(+L)*lGam, centerY+xscale*(localNow -timeFront));
		// real position vs local clock.
		ctx.lineTo( centerX + xscale*(V*now+(+L)*lGam), centerY - xscale*(timeFront) );
		ctx.stroke();
		ctx.moveTo( centerX + xscale*(-L)*lGam, centerY+xscale*(localNow-timeBack));
		// real position vs local clock.
		ctx.lineTo( centerX + xscale*(V*now-(+L)*lGam), centerY - xscale*(timeBack) );
		ctx.stroke();
		ctx.moveTo( centerX + xscale*O*lGam, centerY+xscale*(0));
		// real position vs local clock.
		ctx.lineTo( centerX + xscale*(V*now+O*lGam), centerY - xscale*(localNow) );
		ctx.stroke();
		{
			ctx.beginPath();
			ctx.strokeStyle = "#077";
			ctx.moveTo( centerX + xscale*(V*now+(L)*lGam), centerY - timeFront*xscale);
			ctx.lineTo( centerX + xscale*(V*now + O*lGam), centerY - xscale*localNow );
			ctx.lineTo( centerX + xscale*(V*now+(-L)*lGam), centerY - xscale*timeBack );
			ctx.stroke();
		}

	{
		ctx.beginPath();
		ctx.strokeStyle = "#FFF";
		// seen craft at their time
		ctx.moveTo( centerX + xscale*(V*now+L*lGam), centerY - xscale*timeFront );
		ctx.lineTo( centerX + xscale*(V*now-L*lGam), centerY - timeBack*xscale);
		ctx.stroke();
	}

	}

	if( drawOpts.drawInverse ) {
		drawClock( clockRadius*7.5, 0, reverseObserve, "Obs Now" );
			ctx.strokeStyle = "#44E";
			ctx.beginPath();
			ctx.moveTo( centerX + xscale*(O2), centerY - (0)*xscale);
			ctx.lineTo( centerX + xscale*(((1-primeZero)*reverseObserve*V2)+(O2+reverseObserve* (-V-V2)*(primeZero))), centerY - xscale*(reverseObserve) );
			
			ctx.stroke();
		
	}

	if( drawOpts.drawAsSeen ) {

		drawClock( 0, clockRadius*6, timeFront2, "See Fnt" );
		drawClock( 0, -clockRadius*6, timeBack2, "See Bck" );
		ctx.strokeStyle = "#0F0";
		{
			ctx.beginPath();
		// this should be hue information
			ctx.moveTo( centerX + xscale*(timeFront2/lGam*V+O2+cL), centerY - (timeFront2/lGam)*xscale);
			ctx.lineTo( centerX + xscale*(timeCenter2a/lGam*V+O2), centerY - xscale*(timeCenter2a/lGam) );
			ctx.lineTo( centerX + xscale*(timeBack2/lGam*V+O2-cL), centerY - xscale*(timeBack2/lGam) );
			ctx.stroke();
			// this should be what the moving body looks like to a stationary observer?
			ctx.beginPath();
			// or is this the 
			ctx.strokeStyle = "#F00";
			ctx.moveTo( centerX + xscale*((timeFront2/lGam)*V+O2+cL), centerY - (now)*xscale);
			ctx.lineTo( centerX + xscale*((timeBack2/lGam)*V+O2-cL), centerY - (now)*xscale );
			ctx.stroke();

		}
	}


	if( drawOpts.drawXTGrid ) {
		const ofs = 500;
		const xStep = 1;
		const tStep = 1;
		for( let X = -10; X < 10; X+=xStep ) {
			for( let T = 10; T > -10; T-=tStep ) {

				ctx.beginPath();
				const ox  = D3xTransform.getObservedPlace2(O2+X,T);
				const oxo = D3xTransform.getObservedPlace2(O2+X+xStep,T);
				const oxt = D3xTransform.getObservedPlace2(O2+X,T+tStep);
				const ot  = D3xTransform.getObservedTime(O2+X,T);//+Math.abs(X);
				const oto = D3xTransform.getObservedTime(O2+X+xStep,T);//+(Math.abs(X)+(X>-1?1:-1));
				const ott = D3xTransform.getObservedTime(O2+X,T+tStep);//+Math.abs(X);
				if( T === 0 ){
					ctx.lineWidth = 5;
					ctx.strokeStyle= "green";
				}
				else{
					ctx.lineWidth = 2;
					ctx.strokeStyle= "#aa0";
				}
				ctx.moveTo( ofs + (xscale)*(ox), ofs - (xscale)*(ot) );
				ctx.lineTo( ofs + (xscale)*(oxo), ofs - (xscale)*(oto) );
				ctx.stroke();

				if( T === 0 ){
					ctx.lineWidth = 2;
				}
				ctx.beginPath();
				ctx.strokeStyle= "red";
				ctx.moveTo( ofs +  (xscale)*(ox), ofs - (xscale)*(ot) );
				ctx.lineTo( ofs + (xscale)*(oxt), ofs - (xscale)*(ott) );
				ctx.stroke();
			}
		}
	}


	if( drawOpts.drawDistantFrame ) {
		drawClock( -clockRadius*7.5, clockRadius*6, 10+timeFront_frame, "Frm Fnt" );
		drawClock( -clockRadius*7.5, -clockRadius*6, 10+timeBack_frame, "Frm Bck" );

		if( drawOpts.drawInverse ) {
			ctx.beginPath();
			ctx.strokeStyle = "#d0d";
			ctx.moveTo( centerX + xscale*(+10), centerY - xscale*(0));
			ctx.lineTo( centerX + xscale*(+10 +(1-primeZero)*0+(primeZero)*(-V*now)), centerY - xscale*(now));
			ctx.stroke();
			ctx.moveTo( centerX + xscale*(-10), centerY - xscale*(0));
			ctx.lineTo( centerX + xscale*(-10+(1-primeZero)*0+(primeZero)*(-V*now)), centerY - xscale*(now));
			ctx.stroke();
		}

		//drawClock( -clockRadius*7.5, clockRadius*12, 10+timeFrontFront_frame, "Frm FFnt" );
		//drawClock( -clockRadius*7.5, -clockRadius*12, 10+timeFrontBack_frame, "Frm FBck" );
		//drawClock( -clockRadius*10, clockRadius*12, 10+timeBackFront_frame, "Frm BFnt" );
		//drawClock( -clockRadius*10, -clockRadius*12, 10+timeBackBack_frame, "Frm BBck" );
		ctx.beginPath();
		ctx.strokeStyle = "#FFF";
		ctx.moveTo( centerX + xscale*(-10), centerY - xscale*(eventTime));
		ctx.lineTo( centerX + xscale*(+10), centerY - xscale*(eventTime));
		ctx.stroke();
		ctx.drawImage( earthImage, 920, 500-40- xscale*(eventTime), 80, 80 );
		ctx.drawImage( galaxyImage, 0, 500-40- xscale*(eventTime), 80, 80 );

		//ctx.moveTo( centerX + xscale*(V*now-L*lGam), centerY - xscale*(localNow));

		ctx.strokeStyle = "#070";
		{
			ctx.beginPath();
			ctx.moveTo( centerX + xscale*(-10), centerY - (10+timeBack_frame)*xscale);
			ctx.lineTo( centerX + xscale*(10), centerY - xscale*(timeFront_frame+10) );
			ctx.stroke();
		}
		ctx.strokeStyle = "#700";
		{
			ctx.beginPath();
			ctx.moveTo( centerX + xscale*(-10), centerY - (10+timeBackBack_frame)*xscale);
			ctx.lineTo( centerX + xscale*(10), centerY - xscale*(timeBackFront_frame+10) );
			ctx.stroke();
		}
		ctx.strokeStyle = "#007";
		{
			ctx.beginPath();
			ctx.moveTo( centerX + xscale*(-10), centerY - (10+timeFrontBack_frame)*xscale);
			ctx.lineTo( centerX + xscale*(10), centerY - xscale*(timeFrontFront_frame+10) );
			ctx.stroke();
		}
	}

	if( animate ) 	requestAnimationFrame( draw );

	return;

}


