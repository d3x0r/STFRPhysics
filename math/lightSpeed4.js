
//import {lnQuat} from "../3d/src/lnQuatSq.js"

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );


let L=1; // length of body (m)  (L/C = time of body (s))
let C=1; // speed of propagation (m/s)
let D=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let D2=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=0.50; // velocity  (m/s)
let S=1.0; // time scalar (s/s)
let A=0; // length of body (m)  (L/C = time of body (s))
let sa = 0;// Math.sin(A);
let ca = 0;//Math.cos(A);


let runT = 4;
let E = 0;
let now = 0;
let animate = true;
const step = 10;

const frames = [];
let curFrame = -1;
const nFrames = 201;
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
	T_end = 0;
}

for( let n = 0; n < nFrames; n++ ) {
	frames.push( new Frame() );
}


const controls = document.getElementById( "controls" );

let span = document.createElement( "br" );
controls.appendChild( span );

span = document.createElement( "span" );
span.className = "left";
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
span.className = "left";
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
span.className = "left";
span.textContent = "Distance";
controls.appendChild( span );

const sliderD = document.createElement( "input" );
sliderD.setAttribute( "type", "range" );
controls.appendChild( sliderD );
sliderD.addEventListener( "input", update );

sliderD.setAttribute( "max",1000 );
sliderD.value = (D+5)*100;
sliderD.style.width="250px";

const spanD = document.createElement( "span" );
spanD.textContent = "1";
controls.appendChild( spanD );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Offset";
controls.appendChild( span );

const sliderD2 = document.createElement( "input" );
sliderD2.setAttribute( "type", "range" );
controls.appendChild( sliderD2 );
sliderD2.addEventListener( "input", update );

sliderD2.setAttribute( "max",1000 );
sliderD2.value = (D2+5)*100;
sliderD2.style.width="250px";

const spanD2 = document.createElement( "span" );
spanD2.textContent = "1";
controls.appendChild( spanD2 );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Velocity";
controls.appendChild( span );

const sliderV = document.createElement( "input" );
sliderV.setAttribute( "type", "range" );
controls.appendChild( sliderV );
sliderV.addEventListener( "input", update );

sliderV.setAttribute( "max",1000 );
sliderV.value = V*1000;
sliderV.style.width="250px";

const spanV = document.createElement( "span" );
spanV.textContent = "1";
controls.appendChild( spanV );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
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
span.className = "left";
span.textContent = "Direction";
controls.appendChild( span );

const sliderA = document.createElement( "input" );
sliderA.setAttribute( "type", "range" );
controls.appendChild( sliderA );
sliderA.addEventListener( "input", update );

sliderA.setAttribute( "max",200 );
sliderA.value = A*100;
sliderA.style.width="250px";

const spanA = document.createElement( "span" );
spanA.textContent = "1";
controls.appendChild( spanA );

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Time of sim. event: ";
//controls.appendChild( span );

const sliderE = document.createElement( "input" );
sliderE.setAttribute( "type", "range" );
//controls.appendChild( sliderE );
sliderE.addEventListener( "input", update );

sliderE.setAttribute( "min",-100 );
sliderE.setAttribute( "max",+100 );
sliderE.value = E*10;
sliderE.style.width="250px";

const spanE = document.createElement( "span" );
spanE.textContent = "1";
//controls.appendChild( spanE );

span = document.createElement( "br" );
//controls.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
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
span.className = "left";
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

const spanChkNow = document.createElement( "span" );
spanChkNow.textContent = " |Animate";
controls.appendChild( spanChkNow );

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = animate;
controls.appendChild( chkLblNow );
chkLblNow.addEventListener( "input", update );

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

// rt2ot( T, 0)
//   obsT = T(V/C+1)
// rt2ot( T+e, 0 );
//   (T+e)(V/C+1)

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

function getObservedTimePos( delxt, delyt ){
	return ( Math.sqrt( -V*V*delxt*delxt*sa*sa
		-V*V*delyt*delyt*ca*ca 
		+2*V*V*delyt*delyt*sa*ca
		+C*C*delxt*delxt
		+C*C*delyt*delyt
	   )
			+V*delxt*ca+V*delyt*sa )
		/ ((C*C-V*V) )

}

function update( evt ) {
	C = Number(sliderC.value)/100;
	spanC.textContent = C.toFixed(2);
	V = Number(sliderV.value)/1000*C;
	spanV.textContent = V.toFixed(3);
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(1);

	A = Number(sliderA.value)/100*Math.PI;
	sa = -Math.sin(A);
	ca = Math.cos(A);

	spanA.textContent = (A/Math.PI).toFixed(3) + "π";

	D = (Number(sliderD.value)/500-1)*5;
	spanD.textContent = D.toFixed(3) ;

	D2 = (Number(sliderD2.value)/500-1)*L;
	spanD2.textContent = D2.toFixed(3) + " T(world s):" + (-2*(C*D2+L*V)/(C*C-V*V)).toFixed(2)  + " T(obs s):"+ ((-2*(C*D2+L*V)/(C*C-V*V))/Math.sqrt(1-V/C)).toFixed(2) /*+ " O(m-m/s):"+ (-2*(C*D2+L*V)).toFixed(2)*/;

	E = Number(sliderE.value)/10 - Math.sqrt( D*D + L*L )/C * V;
	spanE.textContent = E.toFixed(1);
	S = Number(sliderS.value)/10;
	spanS.textContent = S.toFixed(1);
	if( animate != chkLblNow.checked ) {
		animate = chkLblNow.checked;
		if( animate ) draw();
	}
	runT = Number(sliderRunT.value)/5;
	spanRunT.textContent = runT.toFixed(2);

	if( animate ) {
	}else
		now = (Number(sliderNow.value)/100*runT/2);
	spanNow.textContent = "T(world s):" +  (now).toFixed(2)  + " T(obs s):" + (now/Math.sqrt(1-V/C)).toFixed(2) /*+ " T(obs m-m/s):" + (now*(C*C-V*V)).toFixed(2)*/;

	if( eventFrame>=0 ) {
		frames[eventFrame].event = false;
		eventFrame = -1;
	}

	const hLen = (L-D2)/(C+V) ;
	const tLen = ((L+D2)/(C-V));//((D2-L)/C)*Math.sqrt(C*C-V*V);

	// hLen = DD + VVTT + LL 
	//  

	//const hLen = Math.sqrt( Math.sqrt(D*D-V*V)*Math.sqrt(D*D-V*V)/(C*C)+(L-D2)/(C+V)*(L-D2)/(C+V)) ;
	//const tLen = (Math.sqrt( D*D/(C*C)+(L+D2)/(C-V)*(L+D2)/(C-V)));//((D2-L)/C)*Math.sqrt(C*C-V*V);


		//2(CD+LV)/(CC-VV)

		// 2D  //  V=0, L=any(any time after a fixed start point is same), C=1  sqrt(1-v/c)=1
		// A+B = 2D
		// a = A/D   b = A/D
		// a+b=2
		// 1-a/b = b/a-1 = 0   QM balance.

		//const ca = Math.cos(A);
		//const sa = -Math.sin(A);

	for( let n = 0; n < nFrames; n++ ) {
		const del = n/nFrames;
		const Treal = (del * runT)-runT/2;
		const frame = frames[n];


		const nowE = (del * runT)-runT/2;
		frame.hue =120*(Treal%3)-240;
		frame.Po = {x:ca*V*Treal + D2,y:sa*V*Treal+D};
		frame.Pc = {x:ca*V*Treal + 0,y:sa*V*Treal};
		frame.Ph = {x:ca*V*Treal + L,y:sa*V*Treal};
		frame.Pt = {x:ca*V*Treal + -L,y:sa*V*Treal};

		const delxc = frame.Po.x - frame.Pc.x;
		const delyc = frame.Po.y - frame.Pc.y;
		const delxh = frame.Po.x - frame.Ph.x;
		const delyh = frame.Po.y - frame.Ph.y;
		const delxt = frame.Po.x - frame.Pt.x;
		const delyt = frame.Po.y - frame.Pt.y;
		// if I was stationary, the time would be delxh
		// this should basically be V*TReal
		//const delxyh = Math.sqrt( delxh*delxh + delyh*delyh );
		// this should basically be V*TReal
		//const delxyt = Math.sqrt( delxt*delxt + delyt*delyt );

		// + ca*V*T_2, sa*V*T_2
		// C*T2 = (Po-Ph)+V*T2
		// C*T2 = Math.sqrt( (delxh + ca*V*T2)^2 +(delyh + sa*V*T2)^2 )
		//  T_2 = (sqrt(  -4 V^2 X^2 sin^2(a) 
		//                + 8 V^2 X Y sin(a) cos(a) 
		//                - 4 V^2 Y^2 cos^2(a) 
		//                + 4 C^2 X^2 + 4 C^2 Y^2) 
		//         + 2 V X cos(a) + 2 V Y sin(a))
		//       /(2 (-V^2 sin^2(a) - V^2 cos^2(a) + C^2))
		//

		//  T_2 = (sqrt(  -4 V^2 X^2 sin^2(a) 
		//                - 4 V^2 Y^2 cos^2(a) 
		//                + 8 V^2 X Y sin(a) cos(a) 
		//                + 4 C^2 X^2 
		//                + 4 C^2 Y^2
		//              ) 
        //        + 2 V X cos(a) + 2 V Y sin(a))
		//      /(2 *( C^2-V^2 ))

		// (sin=1 a = 90 degrees)
		//  delx = -L
		//  dely = 0
		//  T_2 = (sqrt(  -4 V^2 X^2
		//                + 4 C^2 X^2 
		//                + 4 C^2 Y^2
		//              ) 
        //          + 2 V Y )
		//      /(2 *( C^2-V^2 ))

		// (cos=1 a = 0 degrees)
		//  delx = -L
		//  dely = 0
		//  T_2 = (2*sqrt( - V^2 Y^2 
		//                 + C^2 X^2 
		//                 + C^2 Y^2
		//              ) 
        //        + 2 V X )
		//      /(2 *( C^2-V^2 ))


		// (C-V)*T2 = (Po-Ph)
		//   (Po-Ph) / (C-V)
		const txc = getObservedTimePos( delxc, delyc );
		/*
		( Math.sqrt( -4*V*V*delxc*delxc*sa*sa
							   -4*V*V*delyc*delyc*ca*ca 
							   +8*V*V*delyc*delyc*sa*ca
							   +4*C*C*delxc*delxc
							   +4*C*C*delyc*delyc
							  )
					  +2*V*delxc*ca+2*V*delyc*sa )
					/ (2*(C*C-V*V) )
					*/
		const txh = getObservedTimePos( delxh, delyh );/*( Math.sqrt( -4*V*V*delxh*delxh*sa*sa
							   -4*V*V*delyh*delyh*ca*ca 
							   +8*V*V*delyh*delyh*sa*ca
							   +4*C*C*delxh*delxh
							   +4*C*C*delyh*delyh
							  )
					  +2*V*delxh*ca+2*V*delyh*sa )
					/ (2*(C*C-V*V) )
					*/
		const txt = getObservedTimePos( delxt, delyt );/*( Math.sqrt( -4*V*V*delxt*delxt*sa*sa
							   -4*V*V*delyt*delyt*ca*ca 
							   +8*V*V*delyt*delyt*sa*ca
							   +4*C*C*delxt*delxt
							   +4*C*C*delyt*delyt
							  )
					  +2*V*delxt*ca+2*V*delyt*sa )
					/ (2*(C*C-V*V) )
					*/
		//const tyh = delyh/(sa*(C-V))
		//const txt = delxyt/(ca*(C-V))

		frame.T_start = Treal;
		frame.T_end = Treal+hLen+tLen;
		frame.T_see_c = Treal + txc;
		frame.T_see_h = Treal + txh;
		frame.T_see_t = Treal + txt;
	}

	         /*
context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
context.fillStyle = 'green';
context.fill();
context.lineWidth = 5;
context.strokeStyle = '#003300';
context.stroke()
*/
	if( !animate )
		draw(  );
}
let last_draw_time = 0;
const xscale = 150;
const yscale = 150;
let didEvent = false;
const photonStart = 100;
function draw(  ) {
	
	const beamX = canvas.width/2;
	const beamY = canvas.height/2 + 40;

	if( animate ) {
		now = ( ( (Date.now() * S) %(runT*1000) ) / 1000) - runT/2;
		sliderNow.value =100*now*2/runT
		spanNow.textContent = now.toFixed(2);
	}

	ctx.clearRect( 0, 0, 1024, 1024);
	ctx.strokeStyle = "blue";

	curFrame = nFrames;  // draw all frames
	let drawP = null, drawT = null, drawH = null;
	let drawP2 = null,drawT2 = null,drawH2 = null;
	const toY = D*yscale+photonStart;


	for( let f = 0; f < curFrame; f++ ) {
		const frame = frames[f];
		if( frame.T_start < now   ) 
		{
			ctx.strokeStyle =  `hsl(${frame.hue},${100*(frame.T_start>now?0.5:1)}%,50%`
			if( frame.T_see_t > now ) {
				ctx.beginPath();
				ctx.moveTo( 500 +frame.Pt.x*xscale/*+ frame.Pc*xscale*/, 500+frame.Pt.y*xscale );
				ctx.lineTo( 500 +(frame.Po.x + (frame.T_see_t-frame.T_start)*Math.cos(A)*V)*xscale
							, 500 +(frame.Po.y - (frame.T_see_t-frame.T_start)*Math.sin(A)*V)*xscale );
				ctx.stroke();
			}
	   
			if( frame.T_see_h > now ) {
				ctx.beginPath();
				ctx.moveTo( 500 +frame.Ph.x*xscale/*+ frame.Pc*xscale*/, 500+frame.Ph.y*xscale );
				ctx.lineTo( 500 +(frame.Po.x + (frame.T_see_h-frame.T_start)*Math.cos(A)*V)*xscale
							, 500 +(frame.Po.y - (frame.T_see_h-frame.T_start)*Math.sin(A)*V)*xscale );
				ctx.stroke();
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
		}
		ctx.fillStyle =  `hsl(${frame.hue},${100*(frame.T_start>now?0.5:1)}%,50%`




	/*
// from that link in docs about train...
dt = t'+vx'/cc  / sqrt(1-vv/cc)

t/sqrt = -vx/cc /sqrt

t= -v x / cc

     -13s

0 = t' + L/c  // goes away... / sqrt(0.5)     /0.707/

t' = L/C s

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

if( Math.abs(frame.T_start- now) < 0.01) {
	ctx.fillStyle =  `hsl(${120*(now%3)-240},100%,50%`
	ctx.fillRect( 500+(-L)*xscale, 15, (2*L)*xscale, 10 );
	const ca = Math.cos(A);
	const sa = Math.sin(A);
	headTri( frame.Ph.x-ca*V*(frame.T_see_h-now), 500+(frame.Ph.y+sa*V*(frame.T_see_h-now))*xscale, true );
	tailTri(  frame.Pt.x-ca*V*(frame.T_see_t-now), 500+(frame.Pt.y+sa*V*(frame.T_see_t-now))*xscale,  true );

	centerBox( frame.Pc.x-ca*V*(frame.T_see_c-now), 500+(frame.Pc.y+sa*V*(frame.T_see_c-now))*xscale, true );
	centerBox( frame.Po.x, 500+frame.Po.y*xscale, true );

	for( let n = -20; n <= 20; n++ ) {
		const t = (n/20)*L;
		const time = getObservedTimePos( frame.Po.x - (frame.Pc.x+t), frame.Po.y - frame.Pc.y );
		ctx.fillStyle =  `hsl(${(time%3)*-120+120},100%,50%`
		centerBox( (frame.Pc.x+t)-ca*V*(time), 500+(frame.Pc.y+sa*V*(time))*xscale, false );
	}

}


		const willBe = frame.Phc + V*(frame.T_start-now);
		if( frame.T_start <now && frame.T_see_h>now) {
			const del = frame.T_see_h - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			headTri( (+L)*(1-delT) +(delT)*frame.Ph, photonStart*(1-delT)+toY*(delT) );

			if( frame.event ) eventMark( (frame.Pc+L)*(1-delT)+(delT)*frame.Pc , photonStart*(1-delT)+toY*(delT), true );
ctx.beginPath();
//ctx.arc(500+(L-Math.cos(A)*V*(now-frame.T_start))*xscale, photonStart+(Math.sin(A)*V*(now-frame.T_start))*xscale, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
ctx.arc(500+(frame.Ph.x)*xscale, 500+(frame.Ph.y)*xscale, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
ctx.stroke()

		}
		if( frame.T_start <now && frame.T_see_t>now) {
			const del = frame.T_see_t - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			tailTri( (-L)*(1-delT)+(delT)*frame.Pt, photonStart*(1-delT)+toY*(delT) );
			if( frame.event ) eventMark( (frame.Pc-L)*(1-delT)+(delT)*frame.Pc, photonStart*(1-delT)+toY*(delT)+20, true );
if(1){ // draw circles around tail
	ctx.beginPath();
	//ctx.arc(500-(L+Math.cos(A)*V*(now-frame.T_start))*xscale, photonStart+(Math.sin(A)*V*(now-frame.T_start))*xscale, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
	ctx.arc(500+(frame.Pt.x)*xscale, 500+(frame.Pt.y)*xscale, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
	ctx.stroke()
}
		}
if(0)
		if( frame.T_see_t <now && frame.T_end >now) {
			const del = frame.T_see_t - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			tailTri( (-L)*(1-delT)+(delT)*frame.Pt, photonStart*(1-delT)+toY*(delT) );
			if( frame.event ) eventMark( (frame.Pc-L)*(1-delT)+(delT)*frame.Pc, photonStart*(1-delT)+toY*(delT)+20, true );
if(1){ // draw circles around tail
	ctx.beginPath();
	ctx.arc(500-(L+V*(now-frame.T_start))*xscale, photonStart, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
	ctx.stroke()
}
		}
	}

	centerBoxXY( (500+D2*xscale), toY, true );

if( eventFrame >= 0 )
	{
	 	const frame = frames[eventFrame];
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
	//if( drawP !== frames[0] ) 
	{

/*
	if( drawP )
		centerBoxXY( 500 + drawP.Pc*xscale, 30, true );
	if( drawP2 )
		centerBoxXY( 500 + drawP2.Pc*xscale, 30, true );
	if( drawH !== frames[0] )
	if( drawH )
		headTri( drawH.Pc+L, 30, true );
	if( drawH2 )
		headTri( drawH2.Pc+L, 30, true );
	if( drawT !== frames[0] )
	if( drawT )
		tailTri( drawT.Pc-L, 30, true );
	if( drawT2 )
		tailTri( drawT2.Pc-L, 30, true );

*/
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
	function centerBox( t,o,f ) {      
		//const y = 20;
		centerBoxXY( 500+(t)*xscale, o,f );
	}
	
/*
	const frontT  = observerTimeToRealTime( now,  L );
	const centerT = observerTimeToRealTime( now,  0 );
	const backT   = observerTimeToRealTime( now, -L );
	const front  = observerTimeToRealPos( now,  L );
	const center = observerTimeToRealPos( now,  0 );
	const back   = observerTimeToRealPos( now, -L );
	for( let f of front )
		headTri( f, 6 );
	for( let b of back )
		tailTri( b, 6 );
	for( let c of center )
		centerBox( c, 6 );
*/
if(0) { // old realtive calculation (motionless thing)
	if( drawP && drawH )
	if( center.length > 1 && front.length > 1 ) {
		//console.log( "blah:", center[1], front[1], back[1] );
		var grd = ctx.createLinearGradient(500+(center[1])*xscale +((front[1]) - center[1])*xscale, 0, 500+(center[1])*xscale, 0);
		grd.addColorStop(0, `hsl(${drawH.hue},100%,50%` );
		grd.addColorStop(1, `hsl(${drawP.hue},100%,50%` );
		ctx.fillStyle = grd;
		ctx.fillRect( 500+(center[1])*xscale, 8, ((front[1]) - center[1])*xscale, 10 );
	}
	if( drawP && drawT )
	if( center.length > 1 && back.length > 1 ) {
		var grd = ctx.createLinearGradient(500+(back[1])*xscale, 0, 500+(back[1])*xscale+( center[1] - (back[1]))*xscale, 0);
		grd.addColorStop(1, `hsl(${drawP.hue},100%,50%` );
		grd.addColorStop(0, `hsl(${drawT.hue},100%,50%` );
		ctx.fillStyle = grd;
		ctx.fillRect( 500+(back[1])*xscale, 8, ( center[1] - (back[1]))*xscale, 10 );
	}
	drawP = drawP2 || drawP;
	drawH = drawH2 || drawH;
	drawT = drawT2 || drawT;
	if( drawP && drawH )
	if( center.length > 0 && front.length > 0 ) {
		var grd = ctx.createLinearGradient(500+(center[0])*xscale , 0, 500+(front[0])*xscale, 0);
		grd.addColorStop(0, `hsl(${((drawP.hue))},100%,50%` );
		grd.addColorStop(1, `hsl(${((drawH.hue))},100%,50%` );
		ctx.fillStyle = grd;
		ctx.fillRect( 500+(center[0])*xscale, 8, ((front[0]) - center[0])*xscale, 10 );
	}
	if( drawP && drawT )
	if( center.length > 0 && back.length > 0 ) {
		var grd = ctx.createLinearGradient(500+(back[0])*xscale, 0, 500+(center[0])*xscale, 0);
		grd.addColorStop(0, `hsl(${((drawT.hue))},100%,50%` );
		grd.addColorStop(1, `hsl(${((drawP.hue))},100%,50%` );
		ctx.fillStyle = grd;
		ctx.fillRect( 500+(back[0])*xscale, 8, ( center[0] - (back[0]))*xscale, 10 );
	}

	ctx.fillStyle = "black"
}



if( animate )
	requestAnimationFrame( draw );

	return;

}

		draw();

