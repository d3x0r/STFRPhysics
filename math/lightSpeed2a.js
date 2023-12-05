
//import {lnQuat} from "../3d/src/lnQuatSq.js"

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );


let L=3.2; // length of body (m)  (L/C = time of body (s))
let C=1; // speed of propagation (m/s)
let D=1; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=0.90; // velocity  (m/s)
let S=1.0; // time scalar (s/s)
let runT = 10;
let E = 0;
let now = 0;
let animate = true;
let aberrate = true;
const step = 10;

const eventFrames = [];
let curFrame = -1;
const nFrames = 101;
let eventFrame = -1;

class Frame{
	Ph = 0;
	Pc = 0;
	Pt = 0;
	hue = 0;
	T_start = 0;
	Event = 0;

	T_see_h = 0;
	T_see_c = 0;
	T_see_t = 0;
	
}

for( let n = 0; n < nFrames; n++ ) {
	eventFrames.push( new Frame() );
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
span.textContent = "Time of sim. event: ";
controls.appendChild( span );

const sliderE = document.createElement( "input" );
sliderE.setAttribute( "type", "range" );
controls.appendChild( sliderE );
sliderE.addEventListener( "input", update );

sliderE.setAttribute( "min",-100 );
sliderE.setAttribute( "max",+100 );
sliderE.value = E*10;
sliderE.style.width="250px";

const spanE = document.createElement( "span" );
spanE.textContent = "1";
controls.appendChild( spanE );

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

//----------------------

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


const spanChkAberrate = document.createElement( "LABEL" );
spanChkAberrate.textContent = "Light Aberration";
controls.appendChild( spanChkAberrate );

const chkLblAberrate = document.createElement( "input" );
chkLblAberrate.setAttribute( "type", "checkbox" );
chkLblAberrate.checked = animate;
spanChkAberrate.appendChild( chkLblAberrate );
chkLblAberrate.addEventListener( "input", update );

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

// speed around clock
// CT = VT + Ct
//
x' =   g -gv   x
t'    -gv g    t
 x(1 - v) / sqrt( cc-vv)

g t(1 - v)


g   gv   x'
gv  g    t'

g x'(1 + v)
g t'(1 + v)
 
*/



function realTimeToObserverTime( T, L ) {
	const pos = (V*T + L);
	return Math.sqrt( D*D + pos*pos )/C + T;

	{const pos = (V*T);
	return  Math.sqrt(pos*pos)/C + T;}

	{return Math.abs(TV)/C+T;}
}


function observerTimeToRealTime( T, L ) {
	// things have to be able to propagate forwardly.
	if( C <= 0 ) return [0,0];

	if( C==V ) {
		const a = (C*C*T*T - D*D - L*L ) / (2*C*(C * T + L));
		if( a < T ) return [a];
		return [];
	}

	const r = [];
	const a =  (C*C*T + L*V - Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*V*T + V*V*(C*C*T*T- D*D)))/(C*C - V*V);
//	const a =   C*T(C - V )/(C*C - V*V);

	if( a < T ) r.push(a);
	// positive solution walks backwards...
	const b = (C*C*T + L*V + Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*V*T + V*V*(C*C*T*T- D*D)))/(C*C - V*V);
	if( b < T ) r.push(b); 
	return r;

}

function observerTimeToRealPos( T, L ) {
	// things have to be able to propagate forwardly.
	if( C <= 0 ) return [0,0];

	if( C==V ) {
		const a = (C*C*T*T - D*D - L*L ) / (2*C*(C * T + L));
		if( a < T ) return [a*V+L];
		return [];
	}

	const r = [];
	const a =  (C*C*T + L*V - Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*V*T + V*V*(C*C*T*T- D*D)))/(C*C - V*V);
	if( a < T ) r.push(a*V+L);
	// positive solution walks backwards...
	const b = (C*C*T + L*V + Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*V*T + V*V*(C*C*T*T- D*D)))/(C*C - V*V);
	if( b < T ) r.push(b*V+L); 
	return r;

}


function aberration(th,V) {
	const a = Math.acos( (Math.cos(th)+V/C)/(1+V/C*Math.cos(th)) )
	return a;
}


function update( evt ) {
	C = Number(sliderC.value)/100;
	spanC.textContent = C.toFixed(2);
	D = Number(sliderD.value)/10;
	spanD.textContent = D.toFixed(1);
	V = Number(sliderV.value)/100;
	spanV.textContent = V.toFixed(2);
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(1);
	E = Number(sliderE.value)/10 - Math.sqrt( D*D + L*L )/C * V;
	spanE.textContent = E.toFixed(1);
	S = Number(sliderS.value)/10;
	spanS.textContent = S.toFixed(1);
	let wasAnimate = animate;
	animate = chkLblNow.checked;
	aberrate = chkLblAberrate.checked;
	runT = Number(sliderRunT.value)/5;
	spanRunT.textContent = runT.toFixed(2);

	if( animate ) {
	}else
		now = Number(sliderNow.value)/100*runT/2;
	spanNow.textContent = now.toFixed(2);

	if( eventFrame>=0 ) {
		eventFrames[eventFrame].event = false;
		eventFrame = -1;
	}

	const Tofs = Math.sqrt( D*D + L*L ) /C;

	for( let n = 0; n < nFrames; n++ ) {
		const del = n/nFrames;
		const Treal = (del * runT)-runT/2;
		const frame = eventFrames[n];
		// offset observer's time to be in place later.
		const obs_now = (del * runT)-runT/2 - Tofs;
		const x = obs_now * V;

		const B = ((Treal*V)- L);
		const hLen = (B*V+Math.sqrt(B*B*C*C+D*D*(C*C-V*V)))/(C*C-V*V);

		const A = ((Treal*V)- -L);
		const tLen = (A*V+Math.sqrt(A*A*C*C+D*D*(C*C-V*V)))/(C*C-V*V);

		const nowE = (del * runT)-runT/2;
		frame.hue =120*(Treal%3)-240;
		frame.Pc = Treal*V;
		frame.Ph = frame.Pc + hLen*V;
		frame.Pt = frame.Pc + tLen*V;
		frame.T_start = Treal;

		frame.T_see_h = Treal+hLen;
		frame.T_see_t = Treal+tLen;
	}

	if( !wasAnimate ) draw();


}

let last_draw_time = 0;
const xscale = 50;
const yscale = 50;
let didEvent = false;
const photonStart = 400;
function draw(  ) {
	
	const beamX = canvas.width/2;
	const beamY = canvas.height/2 + 40;

	if( animate ) {
		now = ( ( (Date.now() * S) %(runT*1000) ) / 1000) - runT/2;
		sliderNow.value =100*now*2/runT
		spanNow.textContent = now.toFixed(2);
	}
	const frame = Math.floor( (now+runT/2)*100 );

	ctx.clearRect( 0, 0, 1024, 1024);
	ctx.strokeStyle = "blue";
	let drawP = null, drawT = null, drawH = null;
	let drawP2 = null,drawT2 = null,drawH2 = null;
	const toY = D*yscale+photonStart;
	let f = 0;
	//console.log( "---------------------" );

	
	{

		const Pc = now*V*xscale;
		const Py = D*xscale;
		const Ph = L*xscale;
		const Pt = -L*xscale;

		const dx = Pc-Pt;
		const dx2 = Pc-Ph;
		const dy = Py;
		

		const len = Math.sqrt(dx*dx + dy*dy);
		const len2 = Math.sqrt(dx2*dx2 + dy*dy);
		
		const angle = Math.atan2( dy, -dx );
		const angle2 = Math.atan2( dy, -dx2 );
		const new_angle = aberration( angle, V );
		const new_angle2 = aberration( angle2, V );
		const cx = Math.cos( new_angle );
		const sx = Math.sin( new_angle );
		const cx2 = Math.cos( new_angle2 );
		const sx2 = Math.sin( new_angle2 );
		//console.log( "angles:", angle, new_angle, " & ", angle2, new_angle2 );
		/*
		const acx = Math.cos( angle );
		const asx = Math.sin( angle );
		const acx2 = Math.cos( angle2 );
		const asx2 = Math.sin( angle2 );
		ctx.lineWidth = 2;
		ctx.moveTo( 500 + Pc , photonStart +D*xscale  );
		ctx.lineTo( 500 + Pc + acx2*len2, photonStart +D*xscale - asx2*len2 );
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo( 500 + Pc , photonStart +D*xscale  );
		ctx.lineTo( 500 + Pc + acx*len, photonStart +D*xscale - asx*len );
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 10;
		*/
		//ctx.moveTo( 500 + Pc, photonStart+Py );
		const dpx = (cx2*len2-cx*len)/xscale;
		const dpy = (sx2*len2-sx*len)/xscale;
		
		ctx.fillStyle = "white";
		ctx.font = "25px Arial";
		ctx.fillText( "Len:" + (new_angle-new_angle2).toFixed(3) , 10, photonStart-20 );		


		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo( 500 + Pc /*Pc +*/ , photonStart + D*xscale  );
		ctx.lineTo( 500 + Pc+/*Pc +*/   cx*len, photonStart+ D*xscale -sx*len );
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo( 500 +Pc /*Pc +*/ , photonStart + D*xscale  );
		ctx.lineTo( 500 +Pc+ /*Pc +*/   cx2*len2, photonStart + D*xscale-sx2*len2  );
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = 10;
		ctx.moveTo( 500 + Pc+/*Pc +*/ cx*len, photonStart +D*xscale - sx*len );
		ctx.lineTo( 500 + Pc+/*Pc +*/ cx2*len2, photonStart +D*xscale - sx2*len2 );
		ctx.stroke();
		
	}
	ctx.lineWidth = 1.5;


	for( f = 0; f < nFrames; f++ ) {
		const frame = eventFrames[f];
		if( frame.T_start > now ) break;
//		if(( frame.T_see_h < now ) && ( frame.T_see_t < now ) )continue;

		ctx.strokeStyle =  `hsl(${frame.hue},${100*(frame.T_start>now?0.5:1)}%,50%`

		if( frame.T_see_t > now && frame.T_see_t < runT/2 ) {
			if( !aberrate ) {
				ctx.beginPath();
				ctx.moveTo( 500 -L*xscale/*+ frame.Pc*xscale*/, photonStart );
				ctx.lineTo( 500 + xscale*frame.Pt, toY );
				ctx.stroke();
			} else {

			const dx = xscale*frame.Pt - (-L*xscale);
			const dy = toY-photonStart;
			const len = Math.sqrt(dx*dx + dy*dy);
			
			const angle = Math.atan2( dy, -dx );
			const new_angle = aberration( angle, V );
			const cx = Math.cos( new_angle );
			const sx = Math.sin( new_angle );
			
	//console.log( "Angle:", angle );

			ctx.beginPath();
			ctx.moveTo( 500 +xscale*frame.Pt + cx*len, toY - sx*len );
			ctx.lineTo( 500 + xscale*frame.Pt, toY );
			ctx.stroke();
			}

			const del = frame.T_see_t - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			tailTri( (-L)*(1-delT)+(delT)*frame.Pt, photonStart*(1-delT)+toY*(delT) );

			if( frame.event ) eventMark( (frame.Pc-L)*(1-delT)+(delT)*frame.Pc, photonStart*(1-delT)+toY*(delT), true );

		}

		if( frame.T_see_h > now && frame.T_see_h < runT/2 ) {
			if( !aberrate ) {
			ctx.beginPath();
			ctx.moveTo( 500 +L*xscale, photonStart );
			ctx.lineTo( 500 + xscale*frame.Ph, toY );
			ctx.stroke();
			} else {

			const dx = xscale*frame.Ph - (+L*xscale);
			const dy = toY-photonStart;
			const len = Math.sqrt(dx*dx + dy*dy);
			
			const angle = Math.atan2( dy, -dx );
			const new_angle = aberration( angle, V );
			//console.log( "angle:", angle, new_angle );
			const cx = Math.cos( new_angle );
			const sx = Math.sin( new_angle );
			//const cx = Math.cos( angle );
			//const sx = Math.sin( angle );
			
			ctx.beginPath();
			ctx.moveTo( 500 + xscale*frame.Ph + cx*len, toY - sx*len );
			ctx.lineTo( 500 + xscale*frame.Ph, toY );
			ctx.stroke();
			}


			const del = frame.T_see_h - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			headTri( (+L)*(1-delT) +(delT)*frame.Ph, photonStart*(1-delT)+toY*(delT) );
			if( frame.event ) eventMark( (frame.Pc+L)*(1-delT)+(delT)*frame.Pc , photonStart*(1-delT)+toY*(delT), true );

		}
		
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


		ctx.fillStyle =  `hsl(${frame.hue},${100*(frame.T_start>now?0.5:1)}%,50%`



/*
		if( now < frame.T_see_c ) {
			const del = frame.T_see_c - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			centerBoxXY( (500+frame.Pc*xscale)*(1-delT) + (500)*(delT), photonStart*(1-delT)+toY*(delT), false );
			if( frame.event ) {
				eventMark( (frame.Pc)*(1-delT), photonStart*(1-delT)+toY*(delT), true );
			}
		}
*/

		const willBe = frame.Phc + V*(frame.T_start-now);
		if( frame.T_start <now && frame.T_see_h>now && frame.T_see_h < runT/2) {
			ctx.beginPath();
			ctx.arc(500+L*xscale, photonStart, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
			ctx.stroke()

		}
		if( frame.T_start <now && frame.T_see_t>now&& frame.T_see_t < runT/2) {
			if(1){ // draw circles around tail
				ctx.beginPath();
				ctx.arc(500-L*xscale, photonStart, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
				ctx.stroke()
			}
		}
	}

	{
		const frame = eventFrames[f];  // frame of now...
		//if( frame.t_see_h < now && frame.t_see_t < now ) 
		//(frame.Pc*frame.Pc)-(L*L)
		// how long ago do I see Tail?
		// Math.sqrt( (V*now-L)*(V*now-L)+D*D ) / C;
		
		const Tt = Math.sqrt( (V*now- -L)*(V*now- -L)+D*D ) / C - now;
		const Tc = Math.sqrt( (V*now)*(V*now)+D*D ) / C - now;
		const Th = Math.sqrt( (V*now- +L)*(V*now- +L)+D*D ) / C - now;
			//console.log( "blah:", center[1], front[1], back[1] );
		var grd = ctx.createLinearGradient(500+(-L)*xscale, 0, 500+(L)*xscale, 0);
		
		grd.addColorStop(0, `hsl(${(-Tt%3)*120+120},100%,50%` );
		grd.addColorStop(0.5, `hsl(${(-Tc%3)*120+120},100%,50%` );
		grd.addColorStop(1, `hsl(${(-Th%3)*120+120},100%,50%` );
		ctx.fillStyle = grd;

		//ctx.beginPath();
		//ctx.moveTo( drawH.Ph
		//ctx.stroke();

		ctx.fillRect( 500+(-L)*xscale, 20, (2*L)*xscale, 10 );
	}

	// the moving observer.
	centerBoxXY( (500+V*now*xscale), toY, true );

	if( eventFrame >= 0 )
	{
	 	const frame = eventFrames[eventFrame];
		ctx.fillStyle =  `hsl(${frame.hue},100%,50%`
		if(0)
			if( now < frame.T_see_c ) {
				centerBoxXY( (500+frame.Pc*xscale), 40, false );
				if( frame.event ) {
					eventMark( (frame.Pc), 40, true );
				}
			}
		if( now < frame.T_see_h ) {
			headTri( (frame.Pc+L) , 40 );
			if( frame.event ) eventMark( (frame.Pc+L) , 40, true );
		}
		if( now < frame.T_see_t ) {
			tailTri( (frame.Pc-L), 40 );
			if( frame.event ) eventMark( (frame.Pc-L), 40, true );
		}

	}

	last_draw_time = now;

	function eventMark( t,o,f ) {
		const y = 0;
		
		if(f)ctx.strokeStyle = "magenta";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo( 500+(t) * xscale + 10, o+y );
		ctx.lineTo( 500+(t) * xscale - 10, o+y );
		ctx.stroke();
	}
	

	function headTri( t,o,f ) {
		const y = 0;
		
		if(f)ctx.fillStyle = "red";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( 500+(t) * xscale + 5, o+y );
		ctx.lineTo( 500+(t) * xscale - 5, o+y -5 );
		ctx.lineTo( 500+(t) * xscale - 5, o+y +5 );
		ctx.fill();
	}

	function tailTri( t,o,f ) {      
		const y = 0;
		
		if(f)ctx.fillStyle = "blue";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( 500+(t) * xscale - 5, o+y );
		ctx.lineTo( 500+(t) * xscale + 5, o+y - 5 );
		ctx.lineTo( 500+(t) * xscale + 5, o+y + 5 );
		ctx.fill();
	}

	function centerBoxXY( x,y,f ) {      
		
		if(f)ctx.fillStyle = "green";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo( x +5, y );
		ctx.lineTo( x, y - 5 );
		ctx.lineTo( x-5, y  );
		ctx.lineTo( x, y + 5 );
		ctx.fill();
	}
	function centerBox( t,o ) {      
		//const y = 20;
		centerBoxXY( 500+(t)*xscale, o );
	}


	ctx.fillStyle =  `hsl(${120*(now%3)-240},100%,50%`
	ctx.fillRect( 500+(-L)*xscale, photonStart-10, (2*L)*xscale, 10 );
	headTri(  + L, photonStart-5, true );
	tailTri(  - L, photonStart-5, true );
	centerBox( 0, photonStart-5, true );

	if( animate )
		requestAnimationFrame( draw );

	return;

}

		draw();

