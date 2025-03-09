
//import {lnQuat} from "../3d/src/lnQuatSq.js"

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
import * as ru from "./relativistic.util.js"
console.log( "ru is:", ru );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );


let L=3; // length of body (m)  (L/C = time of body (s))
let C=1; // speed of propagation (m/s)
let D=1; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=0.75; // velocity  (m/s)
let S=1; // time scalar (s/s)
let lengthContract = 1;
let runT = 10;
let now = 0;
let animate = true;

const eventFrames = [];
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

	body = [];

	bounces = [];

	emitted = [];
	
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
sliderV.value = V/C*1000;
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

const spanChkContract = document.createElement( "label" );
spanChkContract.textContent = " Length Contract";
controls.appendChild( spanChkContract );

const chkLblContract = document.createElement( "input" );
chkLblContract.setAttribute( "type", "checkbox" );
chkLblContract.checked = true;
spanChkContract.appendChild( chkLblContract );
chkLblContract.addEventListener( "input", update );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

let last_draw_time = 0;
let xscale = 50;

update();

const body = [];

/*
for( t = -5; t < 5; t += 0.02 ) {
	const b = { t : V*tM:\javascript\carWars\dual-quat\STFRPhysics\math\lightSpeed-radial.js - 1, c:V*t, h:V*t+1 };
	const delay = { t: Math.sqrt( ((D*D)/(C*C)) + b.t*b.t), c: Math.sqrt( ((D*D)/(C*C)) + b.c*b.c), h: Math.sqrt( ((D*D)/(C*C)) + b.h*b.h) };
	const appear = { t: delay.t+t, c:delay.c+t, h:delay.h+t };
	body.push( { hue:(t%3)*60, pos:b, delay, appear } );
}
*/

function realTimeToObserverTime( T, L ) {
	const pos = (V*T + L*lengthContract);
	return Math.sqrt( D*D + pos*pos )/C+T;
}

// T = real time
// P = Phase  // offset the spin phase against real time
// Lx,Ly,Lz = body Local x,y,z to go from
// Ax,Ay,Az = body local spin axis to apply rotation of Lx,Ly,Lz

function realTimeToObserverTimeSpin( T, P, Lx, Ly, Lz, Ax, Ay, Az ) {

	let R = 0; // Rotation rate, implicit from velocity.
	if( V <= C ) {
		// compute in arc-length === physical length = 1
		R = Math.sqrt( C^2 - V^2 )/ 2*Math.PI;
	} else {
		// compute in arc-length === physical length = 1
		R = -Math.sqrt( V^2 - C^2 )/ 2*Math.PI;
	}
	const ang = S*(T+P)*R 
	const s = Math.sin( ang );
	const c = Math.cos( ang );
	const dot =  (1-c)*(( Ax * Lx ) + (Ay*Ly)+(Az*Lz));
	const L = { x:Lx*c + s*(Ay * Lz - Az * Ly) + Ax * dot
	          , y:Ly*c + s*(Az * Lx - Ax * Lz) + Ay * dot
	          , z:Lz*c + s*(Ax * Ly - Ay * Lx) + Az * dot };

	const pos = (V*T) + L.x;
	return Math.sqrt( L.z*L.z + (D+L.y)*(D+L.y) + pos*pos )/C+T;
}

/*
$$ x=\sqrt{( Z*Z + (D+Y)*(D+Y) + ((V*T) + A)^2 )}/C+T;$$

$$ \frac { \sqrt{(-2XV-2C{T_O})^2 - 4\left(C^2-V^2\right)\left( -X^2 + C^2{T_O}^2 - D^2 -2DY - Y^2 - Z^2\right) }  + 2XV + 2C^2{T_O} } { 2\left(C^2-V^2\right) } $$


/*
function realTimeToObserverTimeSpin( T, Lx, Ly, Lz, Ax, Ay, Az ) {


if(0) {
		// this is Rodrigues rotation formula.  2 multiplies shorter, and 1 less add than below quat method
		const c = Math.cos(q.θ);
		const s = Math.sin(q.θ);

		const qx = q.nx, qy = q.ny, qz = q.nz;
		const vx = v.x , vy = v.y , vz = v.z;
		// (1-cos theta) * dot
		// 1-cos theta * cos(angle between vectors)
		const dot =  (1-c)*((qx * vx ) + (qy*vy)+(qz*vz));
		// v *cos(theta) + sin(theta)*cross + q * dot * (1-c)
		return new vectorType(
			  vx*c + s*(qy * vz - qz * vy) + qx * dot
			, vy*c + s*(qz * vx - qx * vz) + qy * dot
			, vz*c + s*(qx * vy - qy * vx) + qz * dot );
}
}
*/

function observerTimeToRealTimeWithSpin( T, P, Lx, Ly, Lz, Ax, Ay, Az  ) {

	//Lx
	if( C === V ) {
		const num = Lx*Lx-C*C*TT*T + D*D + 2*D*Ly + Ly*Ly + Lz*Lz;
		const den = C*(2*Lx+2*C*T);
		return [ num/den, num/den ];
	} else {
		const num = Math.sqrt( 2*Lx*V - 2*C*T - 4 * ( C*C-V^V ) * ( -X*X + C*C*T - D*D - 2*D*Ly - Ly*Ly - Lz*Lz )) + 2*Lx * V + 2*C*C*T;
		const num2 = -Math.sqrt( 2*Lx*V - 2*C*T - 4 * ( C*C-V^V ) * ( -X*X + C*C*T - D*D - 2*D*Ly - Ly*Ly - Lz*Lz )) + 2*Lx * V + 2*C*C*T;
		const den = 2*(C*C-V*V);
		return [ num/den, num2/den ];
	}
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

	const Td = (Math.sqrt( C*C*D*D - V*V*D*D + C*C*(V*T+L)*(V*T+L) ) - V*(V*T+L)) / (C*C-V*V);
	const a = T - Td;

	//const a =  (C*C*T + L*V - Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*V*T + V*V*(C*C*T*T- D*D)))/(C*C - V*V);
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
	const Td = (Math.sqrt( C*C*D*D-V*V*D*D+C*C*(V*T+L)*(V*T+L) ) - V*(V*T+L)) / (C*C-V*V);
	const a = T - Td;

	//const a =  (C*C*T + L*V - Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*V*T + V*V*(C*C*T*T- D*D)))/(C*C - V*V);
	if( a < T ) r.push(a*V+L);
	// positive solution walks backwards...
	const Td2 = (-Math.sqrt( C*C*D*D-V*V*D*D+C*C*(V*T+L)*(V*T+L) ) - V*(V*T+L)) / (C*C-V*V);
	const b = T - Td2;
	//const b = (C*C*T + L*V + Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*V*T + V*V*(C*C*T*T- D*D)))/(C*C - V*V);
	if( b < T ) r.push(b*V+L); 
	return r;

}



function update( evt ) {
	C = Number(sliderC.value)/100;
	ru.params.C = C;
	spanC.textContent = C.toFixed(2);
	D = Number(sliderD.value)/10;
	spanD.textContent = D.toFixed(2);
	V = Number(sliderV.value)/1000*C;
	spanV.textContent = V.toFixed(2);
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(2);

	S = Number(sliderS.value)/10;
	spanS.textContent = S.toFixed(2);

	lengthContract = chkLblContract.checked?V<C?Math.sqrt(C*C-V*V)/(C):Math.sqrt(V*V-C*C)/(C):1;
	runT = Number(sliderRunT.value)/5;
	spanRunT.textContent = runT.toFixed(2);

	animate = chkLblNow.checked;
	if( animate ) {
	}else
		now = Number(sliderNow.value)/100*runT/2;
	spanNow.textContent = now.toFixed(2);




	//const hLen = (L-D2)/(C+V) ;
	//const tLen = ((L+D2)/(C-V));//((D2-L)/C)*Math.sqrt(C*C-V*V);
		//2(CD+LV)/(CC-VV)

		// 2D  //  V=0, L=any(any time after a fixed start point is same), C=1  sqrt(1-v/c)=1
		// A+B = 2D
		// a = A/D   b = A/D
		// a+b=2
		// 1-a/b = b/a-1 = 0   QM balance.

	let prior_f = null;
	for( let n = 0; n < nFrames; n++ ) {
		const del = n/nFrames;
		const now = (del * runT )-runT/2;

		const f = eventFrames[n];
		f.Pc = now*V 
		f.Ph = f.Pc+L*lengthContract;
		f.Pt = f.Pc-L*lengthContract;
		f.hue = 120*(now%3)-240;
		f.T_start = now;
		f.T_see_h = realTimeToObserverTime( now, L );
		f.T_see_c = realTimeToObserverTime( now, 0 );
		f.T_see_t = realTimeToObserverTime( now, -L );

		f.body.length = 0;
		for( let n = 0; n < 37; n++ ) {
			f.body.push( [500+xscale*(f.Pc+ L*lengthContract*Math.cos( n*Math.PI/18 )), 500+L*xscale*Math.sin( n*Math.PI/18) ] );
		}

		f.bounces.length = 0;
		f.emitted.length = 0;
		for( let n = 0; n < 37; n++ ) {
			let dx = (-runT/2*V+ (now+runT/2)*C*Math.cos( n*Math.PI/18 ));
			let dy = (now+runT/2)*C*Math.sin( n*Math.PI/18);
			if( !prior_f || !prior_f.bounces[n] ) {
				if( (dx-f.Pc)*(dx-f.Pc)/(lengthContract*lengthContract) + dy*dy > L*L ){
					const last = f.emitted.length-1;
					const l = f.emitted[last];
					const ot = ru.ObservedTime( now, {x:0,y:0,z:0}, {x:dx, y:dy,z:0}, { x:V,y:0,z:0},{x:0,y:0,z:0} );
					

					f.bounces[n] = {x:dx, y:dy, ot: ot, at:now, tx:ot*V, ty:0, dx : (V*ot-dx), dy:(0-dy) };

				}
				f.emitted.push( [500+xscale*(-runT/2*V+ C*(now+runT/2)*Math.cos( n*Math.PI/18 )), 500+xscale*C*(now+runT/2)*Math.sin( n*Math.PI/18) ] );
			} else {
				const lastBounce = f.bounces[n] = prior_f.bounces[n];
				f.emitted.push( [500+xscale*(lastBounce.x + (lastBounce.dx)*(now-lastBounce.at)/(lastBounce.ot-lastBounce.at))
									, 500+xscale*(lastBounce.y + (lastBounce.dy)*(now-lastBounce.at)/(lastBounce.ot-lastBounce.at) ) ] );
			}
		}
		prior_f = f;

	}
	//draw(  );
}
function draw(  ) {
	
	const beamX = canvas.width/2;
	const beamY = canvas.height/2 + 40;

	if( animate ) {
		now = ( ( (Date.now() * S) %(runT*1000) ) / 1000) - runT/2;
		sliderNow.value =100*now*2/runT
		spanNow.textContent = now.toFixed(2);
	}
	const frame = Math.floor( (now+runT/2)/runT*nFrames );


	ctx.clearRect( 0, 0, 1024, 1024);

	{
	ctx.strokeStyle = "white";
		ctx.beginPath();
		const now = eventFrames[frame];
			for( let n = 0; n < 37; n++  ) {
				if( !n ) ctx.moveTo( now.body[n][0], now.body[n][1] );
				else ctx.lineTo( now.body[n][0], now.body[n][1] );
			}
			ctx.stroke();

		ctx.beginPath();
	ctx.strokeStyle = "red";
			for( let n = 0; n < 37; n++  ) {
				if( !n ) ctx.moveTo( now.emitted[n][0], now.emitted[n][1] );
				else ctx.lineTo( now.emitted[n][0], now.emitted[n][1] );
			}
			ctx.stroke();
	}

		for( let n = 0; n < 37; n++  ) {
				ctx.beginPath();
		ctx.strokeStyle = "blue";
			for( let f = 0; f < eventFrames.length; f++  ) {
				
					if( !n ) ctx.moveTo( eventFrames[f].emitted[n][0], eventFrames[f].emitted[n][1] );
					else ctx.lineTo( eventFrames[f].emitted[n][0], eventFrames[f].emitted[n][1] );
			}
			ctx.stroke();

		}
	

	last_draw_time = now;


	requestAnimationFrame( draw );

	return;

}

		draw();

