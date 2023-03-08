
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
let V=0.6184; // velocity  (m/s)
let S=1.0; // time scalar (s/s)
let runT = 4;
let E = 0;
let now = 0;
let animate = true;
const step = 10;

const frames = [];
let curFrame = -1;
const nFrames = 201;
let eventFrame = -1;

//------------------ Storage for information about a frame ---------------------------

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



//const d3xTransform = new D3xTransform();
class D3xTransform {
	// converts a long time to a short time.
	
	static get gamma() { return  (C*C-V*V)/C*C };
 	static getObservedTime(X,T) {
		//const willSee = realTimeToObserverTime( T, L );
		const dist = Math.sqrt( (X)*(X) + (D*D) )/C;
		return  (T-dist)*(1/(C*C-V*V));// (  (1/(C*C-V*V)) * T/C-dist)*D3xTransform.gamma/C;
	}
 	static getObservedPlace(X,T) {
		const willSee = realTimeToObserverTime( (1/(C*C-V*V))*T, X );
		const willSeeAt =  (X/C + willSee*V/C);
		return willSeeAt ;
	}
 	static getObservedPlace2(X,T) {
		const willSee = realTimeToObserverTime( T, X );
		const willSeeAt = X-willSee*V/C;
		return willSeeAt ;
	}


	static drawCoords(  ) {
	 const xscale_ = xscale/4;
		const ofs = xscale_ * 13;



// velocity ratio line.

		ctx.beginPath();
ctx.strokeStyle= "white";
		ctx.moveTo( ofs , ofs  );
		ctx.lineTo( ofs + (xscale_)*(10), ofs + (xscale_)*(-10*(V/C) ) );
		ctx.stroke();

		ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle= "red";
		ctx.moveTo( ofs , ofs  );
		ctx.lineTo( ofs + 10*(xscale_)*(V/(C*C-V*V)), ofs - 10*xscale_ );
		ctx.stroke();
ctx.lineWidth = 2;
		  if(0)
// Lorentz Transform Grid, based on velocity ratio line.
		for( let X = -10; X < 10; X++ ) 
{
		ctx.beginPath();
		ctx.strokeStyle= "white";
if( X > 0 ){
		ctx.moveTo( ofs - (xscale_)*(0), ofs  - (xscale_)*(+X) );
		ctx.lineTo( ofs + (xscale_)*(10), ofs + (xscale_)*(-10*(V/C)-X ) );
		ctx.moveTo( ofs - (xscale_)*(0*(V/C)-X), ofs  - (xscale_)*(-0) );
		ctx.lineTo( ofs + (xscale_)*(10*(V/C)+X), ofs + (xscale_)*(-10 ) );
}
		ctx.stroke();
}	


		for( let X = -10; X < 10; X++ ) {
			for( let T = 10; T > -10; T-- ) {
{
		ctx.beginPath();
ctx.strokeStyle= "blue";
		ctx.moveTo( ofs + (xscale_)*(X), ofs + (xscale_)*(T) );
		ctx.lineTo( ofs + (xscale_)*(X+1), ofs + (xscale_)*(T) );
		ctx.moveTo( ofs +  (xscale_)*(X), ofs + (xscale_)*(T) );
		ctx.lineTo( ofs + (xscale_)*(X), ofs + (xscale_)*(T-1) );
		ctx.stroke();
}	
if( false ) {
		ctx.beginPath();
		const ox  = D3xTransform.getObservedPlace2(X,T);
		const oxo = D3xTransform.getObservedPlace2(X+1,T);
		const oxt = D3xTransform.getObservedPlace2(X,T-1);
		const ot  = D3xTransform.getObservedTime(X,T);
		const oto = D3xTransform.getObservedTime(X+1,T);
		const ott = D3xTransform.getObservedTime(X,T-1);
if( T === 0 ){
ctx.lineWidth = 5;
ctx.strokeStyle= "green";
}
else{
ctx.strokeStyle= "yellow";
}
		ctx.moveTo( ofs + (xscale_)*(ox), ofs - (xscale_)*(ot) );
		ctx.lineTo( ofs + (xscale_)*(oxo), ofs - (xscale_)*(oto) );
		ctx.stroke();

if( T === 0 ){
ctx.lineWidth = 2;
}
		ctx.beginPath();
ctx.strokeStyle= "red";
		ctx.moveTo( ofs +  (xscale_)*(ox), ofs - (xscale_)*(ot) );
		ctx.lineTo( ofs + (xscale_)*(oxt), ofs - (xscale_)*(ott) );
		ctx.stroke();

}

if( true ) { // draw what happens to me relative to a stationary world. (show real velocity)
		ctx.beginPath();
		const ox  = D3xTransform.getObservedPlace(X,T);
		const oxo = D3xTransform.getObservedPlace(X+1,T);
		const oxt = D3xTransform.getObservedPlace(X,T-1);
		const ot  = D3xTransform.getObservedTime(X,T);
		const oto = D3xTransform.getObservedTime(X+1,T);
		const ott = D3xTransform.getObservedTime(X,T-1);
if( T === 0 ){
ctx.lineWidth = 5;
ctx.strokeStyle= "green";
}
else{
ctx.strokeStyle= "yellow";
}
		ctx.moveTo( ofs + (xscale_)*(ox), ofs - (xscale_)*(ot) );
		ctx.lineTo( ofs + (xscale_)*(oxo), ofs - (xscale_)*(oto) );
		ctx.stroke();

if( T === 0 ){
ctx.lineWidth = 2;
}
		ctx.beginPath();
ctx.strokeStyle= "red";
		ctx.moveTo( ofs +  (xscale_)*(ox), ofs - (xscale_)*(ot) );
		ctx.lineTo( ofs + (xscale_)*(oxt), ofs - (xscale_)*(ott) );
		ctx.stroke();

			}
		}
	}
}
}

//------------------ Create Controls ---------------------------

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
sliderD.value = (D2+5)*10;
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
sliderV.value = V*1000;
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

	{return Math.abs(T*V)/C+T;}
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


function update( evt ) {
	C = Number(sliderC.value)/100;
	spanC.textContent = C.toFixed(2);
	V = Number(sliderV.value)/1000*C;
	spanV.textContent = V.toFixed(3) + " : " + V*C*C/(C*C-V*V);
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(1);
	D2 = (Number(sliderD.value)/50-1)*L;
	D =10* (Number(sliderD.value)/50-1);
	spanD.textContent = D2.toFixed(3) + " T(world s):" + (-2*(C*D2+L*V)/(C*C-V*V)).toFixed(2)  + " T(obs s):"+ ((-2*(C*D2+L*V)/(C*C-V*V))/Math.sqrt(1-V/C)).toFixed(2) /*+ " O(m-m/s):"+ (-2*(C*D2+L*V)).toFixed(2)*/;
	E = Number(sliderE.value)/10 - Math.sqrt( D*D + L*L )/C * V;
	spanE.textContent = E.toFixed(1);
	S = Number(sliderS.value)/10;
	spanS.textContent = S.toFixed(1);

	animate = chkLblNow.checked;
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

	// test return time length.
	const hrLen = (L-D2)/(C-V) ;
	const trLen = ((L+D2)/(C+V));//((D2-L)/C)*Math.sqrt(C*C-V*V);


	const gamma = D3xTransform.gamma;
	
	//		(time scalar)        (tail time)              (tail return time)                 (scaled tail time = 2)                           (scaled head time = 2)
	//+ " : "+ (C*C-V*V)/(C*C) +" : "+ tLen.toFixed(2) + " :" + trLen.toFixed(2) + " : " + ((C*C-V*V)/(C*C)*(tLen+trLen)).toFixed(2) + " : " + ((C*C-V*V)/(C*C)*(hLen+hrLen)).toFixed(2);

	spanC.textContent = C.toFixed(2)+ " scalar: "+ ((C*C-V*V)/(C*C)).toFixed(3) +" realTail: "+ tLen.toFixed(2) + " returnTail:" + trLen.toFixed(2) + " TailRT: " + ((C*C-V*V)/(C*C)*(tLen+trLen)).toFixed(2) + " HeadRT: " + ((C*C-V*V)/(C*C)*(hLen+hrLen)).toFixed(2);

		//2(CD+LV)/(CC-VV)

		// 2D  //  V=0, L=any(any time after a fixed start point is same), C=1  sqrt(1-v/c)=1
		// A+B = 2D
		// a = A/D   b = A/D
		// a+b=2
		// 1-a/b = b/a-1 = 0   QM balance.


	for( let n = 0; n < nFrames; n++ ) {
		const del = n/nFrames;
		const Treal = (del * runT)-runT/2;
		const frame = frames[n];


		const nowE = (del * runT)-runT/2;
		frame.hue =120*(Treal%3)-240;
		frame.Pc = D2;
		frame.Ph = D2;
		frame.Pt = D2;
		frame.T_start = Treal;
		frame.T_end = Treal+hLen+tLen;
		frame.T_see_h = Treal + hLen;
		frame.T_see_t = Treal + tLen;
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

	//draw(  );
}
let last_draw_time = 0;
const xscale = 150;
const yscale = 50;
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
        D3xTransform.drawCoords();
	curFrame = nFrames;  // draw all frames
	let drawP = null, drawT = null, drawH = null;
	let drawP2 = null,drawT2 = null,drawH2 = null;
	const toY = D*yscale+photonStart;
	for( let f = 0; f < curFrame; f++ ) {
		const frame = frames[f];
		if( frame.T_start < now ) {


		ctx.strokeStyle =  `hsl(${frame.hue},${100*(frame.T_start>now?0.5:1)}%,50%`
		ctx.beginPath();
		ctx.moveTo( 500 -L*xscale/*+ frame.Pc*xscale*/, photonStart );
		ctx.lineTo( 500 + xscale*frame.Pt, toY );
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo( 500 +L*xscale, photonStart );
		ctx.lineTo( 500 + xscale*frame.Ph, toY );
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

		const willBe = frame.Phc + V*(frame.T_start-now);
		if( frame.T_start <now && frame.T_see_h>now) {
			const del = frame.T_see_h - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			headTri( (+L)*(1-delT) +(delT)*frame.Ph, photonStart*(1-delT)+toY*(delT) );
			if( frame.event ) eventMark( (frame.Pc+L)*(1-delT)+(delT)*frame.Pc , photonStart*(1-delT)+toY*(delT), true );
ctx.beginPath();
ctx.arc(500+(L-V*(now-frame.T_start))*xscale, photonStart, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
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
	ctx.arc(500-(L+V*(now-frame.T_start))*xscale, photonStart, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
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
	function centerBox( t,o ) {      
		//const y = 20;
		centerBoxXY( 500+(t)*xscale, o );
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



	ctx.fillStyle =  `hsl(${120*(now%3)-240},100%,50%`
	ctx.fillRect( 500+(-L)*xscale, 15, (2*L)*xscale, 10 );
	headTri(  + L, 20, true );
	tailTri(  - L, 20, true );
	centerBox( 0, 20, true );


	requestAnimationFrame( draw );

	return;

}

		draw();

