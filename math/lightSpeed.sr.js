
//import {lnQuat} from "../3d/src/lnQuatSq.js"

//import { tron } from "./tron.js";

const testSize = 200000;
const canvas = testSurface;
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext('2d');
const tronCtx = tronSurface.getContext('2d');

let tron;
const tron_ = import("./tron.js").then((module) => {
	tron = module.tron;
	const P1 = tron.addPlayer();
	const P2 = tron.addPlayer();
	return tron;
})

startTron.addEventListener("click", (evt) => {
	tron.spawn();
})

let realTimeIsOne = false;
let observerTimeIsOne = false;
let bodyTimeIsOne = false;

let B = 0; // bias (apparent)speed of the frame... observer is travelling at this speed...
//let O = 0; // offset balance between frame bias
let L = 1; // length of body (m)  (L/C = time of body (s))
let C = 2; // speed of propagation (m/s)
let D = 1; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V = 2; // feel velocity  (m/s)
let V1Real = 0; // real velocity
let BVr = 0;
let BTs = 0;
let BVf = 0;
let S = 1; // time scalar (s/s)
let runT = 10;
let tNow = 0;

let P1Of = 0;
let BOf = 0;

const A_frames = [];
const B_frames = [];
let curFrameA = -1;
let curFrameB = -1;
const nFrames = 1000;

let last_draw_tick = Date.now();
let last_draw_time = 0;
let xscale = 50;
let now = Date.now();


class Frame {
	Ph = 0;
	Pc = 0;
	Pt = 0;
	hue = 0;
	T_start = 0;

	T_see_h = 0;
	T_see_c = 0;
	T_see_t = 0;

}

for (let n = 0; n < nFrames; n++) {
	A_frames.push(new Frame());
}
for (let n = 0; n < nFrames; n++) {
	B_frames.push(new Frame());
}


const controls = document.getElementById("controls");

let span = document.createElement("br");
controls.appendChild(span);

//----------------------

span = document.createElement("span");
span.textContent = "Bias velocity between eventFrames";
controls.appendChild(span);

const sliderB = document.createElement("input");
sliderB.setAttribute("type", "range");
controls.appendChild(sliderB);
sliderB.addEventListener("input", update);

sliderB.setAttribute("min",-50000);
sliderB.setAttribute("max", 50000);
sliderB.value = B*5000+5000;
sliderB.style.width = "250px";

const spanB = document.createElement("span");
spanB.textContent = "1";
controls.appendChild(spanB);

span = document.createElement("br");
controls.appendChild(span);

//----------------------
if(false) {
span = document.createElement("span");
span.textContent = "Offset mid velocity between eventFrames";
controls.appendChild(span);

const sliderO = document.createElement("input");
sliderO.setAttribute("type", "range");
controls.appendChild(sliderO);
sliderO.addEventListener("input", update);

sliderO.setAttribute("min", -100);
sliderO.setAttribute("max", 100);
//sliderO.value = O * 100;
sliderO.style.width = "250px";

const spanO = document.createElement("span");
spanO.textContent = "1";
controls.appendChild(spanO);

span = document.createElement("br");
controls.appendChild(span);
}
//----------------------

span = document.createElement("span");
span.textContent = "C";
controls.appendChild(span);

const sliderC = document.createElement("input");
sliderC.setAttribute("type", "range");
controls.appendChild(sliderC);
sliderC.addEventListener("input", update);

sliderC.setAttribute("max", 12500);
sliderC.value = C * 100;
sliderC.style.width = "250px";

const spanC = document.createElement("span");
spanC.textContent = "1";
controls.appendChild(spanC);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Time Scale";
controls.appendChild(span);

const sliderS = document.createElement("input");
sliderS.setAttribute("type", "range");
controls.appendChild(sliderS);
sliderS.addEventListener("input", update);

sliderS.setAttribute("max", 250);
sliderS.value = S * 10;
sliderS.style.width = "250px";

const spanS = document.createElement("span");
spanS.textContent = "1";
controls.appendChild(spanS);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Distance";
controls.appendChild(span);

const sliderD = document.createElement("input");
sliderD.setAttribute("type", "range");
controls.appendChild(sliderD);
sliderD.addEventListener("input", update);

sliderD.setAttribute("max", 100);
sliderD.value = D * 10;
sliderD.style.width = "250px";

const spanD = document.createElement("span");
spanD.textContent = "1";
controls.appendChild(spanD);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Velocity";
controls.appendChild(span);

const sliderV = document.createElement("input");
sliderV.setAttribute("type", "range");
controls.appendChild(sliderV);
sliderV.addEventListener("input", update);

sliderV.setAttribute("max", 1000);
sliderV.value = V * 100;
sliderV.style.width = "250px";

const spanV = document.createElement("span");
spanV.textContent = "1";
controls.appendChild(spanV);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Half-Length";
controls.appendChild(span);

const sliderL = document.createElement("input");
sliderL.setAttribute("type", "range");
controls.appendChild(sliderL);
sliderL.addEventListener("input", update);

sliderL.setAttribute("max", 100);
sliderL.value = L * 10;
sliderL.style.width = "250px";

const spanL = document.createElement("span");
spanL.textContent = "1";
controls.appendChild(spanL);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Run-Time";
controls.appendChild(span);

const sliderRunT = document.createElement("input");
sliderRunT.setAttribute("type", "range");
controls.appendChild(sliderRunT);
sliderRunT.addEventListener("input", update);

sliderRunT.setAttribute("max", 250);
sliderRunT.value = runT * 5;
sliderRunT.style.width = "250px";

const spanRunT = document.createElement("span");
spanRunT.textContent = "1";
controls.appendChild(spanRunT);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Now";
controls.appendChild(span);

const sliderNow = document.createElement("input");
sliderNow.setAttribute("type", "range");
controls.appendChild(sliderNow);
sliderNow.addEventListener("input", update);

sliderNow.setAttribute("min", -250);
sliderNow.setAttribute("max", +250);
sliderNow.value = 0;
sliderRunT.style.width = "250px";

const spanNow = document.createElement("span");
spanNow.textContent = "0";
controls.appendChild(spanNow);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Stats:";
controls.appendChild(span);

const spanStats = document.createElement("span");
spanStats.textContent = "-compute-";
controls.appendChild(spanStats);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Real Time Speed(Body):";
controls.appendChild(span);

const spanRTB = document.createElement("span");
spanRTB.textContent = "-compute-";
controls.appendChild(spanRTB);

span = document.createElement("br");
controls.appendChild(span);
//----------------------

span = document.createElement("span");
span.textContent = "Real Time Speed(Obs):";
controls.appendChild(span);

const spanRTO = document.createElement("span");
spanRTO.textContent = "-compute-";
controls.appendChild(spanRTO);

span = document.createElement("br");
controls.appendChild(span);
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

// real velocity to observer velocity
export function sr_RVtoOV(V) {
	return V / Math.sqrt(C * C - V * V);
}

// observer velocity to real velocity
export function sr_OVtoRV(V) {
	return (C * V) / Math.sqrt(V * V + 1);
}

// observer clock for real velocity
//  (0 at infinity, 1 at 0); 
//  inverse of this can be used to scale clocks external to the observer
export function clockScalarRV(V) {
	return Math.sqrt(C * C - V * V);
}

// for a given scalar between 0 and 1
// return a velocity from C to 0; a 1:1 clock is only
// there when V=0; and V=C when the clock scalar=0;
export function velocityFromClockScalar(T) {
	return Math.sqrt(C*C*(1-T*T))
}

// observer clock for observer velocity
//  this is 1/N so (1 to infinity) range, 
//  this applies to clocks outside of the observer, to bias
//  observer clock=1 to simulation time = 1
export function clockScalarOV(V) {
	// v = sr_OVtoRV(V)
	// returns 1/(sqrt(cc-vv))
	return Math.sqrt(1 - V/C * V/C);
	// x = sqrt(1-VV/CC)
	// xx = 1-vv/cc  sqrt(cc(1-xx))
}

export function clockScalarOV_RV(V) {
	// v = sr_OVtoRV(V)
	// returns 1/(sqrt(cc-vv))
	return Math.sqrt(C*C - V * V);
	// x = sqrt(1-VV/CC)
	// xx = 1-vv/cc  sqrt(cc(1-xx))
}

// returns fraction of C that the velocity feels like
export function apparentVelocityO(V) {
	return (V/C)/Math.sqrt(1 - V/C * V/C);
	// xx(1-VV/CC)=VV/CC
	// +/- C
}

// returns the Velocity V that a feels like V actually IS
// input velocity is N of N*C; where the REAL virtual
// velocity given is a multpler of C.
export function realVelocityO(V) {
	return (C*V)/Math.sqrt(V*V+1);
}

// returns the Velocity V that a feels like V actually IS
// input velocity is V apparent. m/s
export function realVelocityOC(V) {
	return (V)/Math.sqrt(V/C*V/C+1);
}

// real time of an event as position L
//   to observed time of event at observer's position.
export function realTimeToObserverTime(T, L) {
	const pos = (V * T + L);
	return Math.sqrt(D * D + pos * pos) / C + T;
}

// T = real time
// P = Phase  // offset the spin phase against real time
// Lx,Ly,Lz = body Local x,y,z to go from
// Ax,Ay,Az = body local spin axis to apply rotation of Lx,Ly,Lz

function realTimeToObserverTimeSpin(T, P, Lx, Ly, Lz, Ax, Ay, Az) {

	let R = 0; // Rotation rate, implicit from velocity.
	if (V <= C) {
		// compute in arc-length === physical length = 1
		R = Math.sqrt(C ^ 2 - V ^ 2) / 2 * Math.PI;
	} else {
		// compute in arc-length === physical length = 1
		R = -Math.sqrt(V ^ 2 - C ^ 2) / 2 * Math.PI;
	}
	const ang = S * (T + P) * R
	const s = Math.sin(ang);
	const c = Math.cos(ang);
	const dot = (1 - c) * ((Ax * Lx) + (Ay * Ly) + (Az * Lz));
	const L = {
		x: Lx * c + s * (Ay * Lz - Az * Ly) + Ax * dot
		, y: Ly * c + s * (Az * Lx - Ax * Lz) + Ay * dot
		, z: Lz * c + s * (Ax * Ly - Ay * Lx) + Az * dot
	};

	const pos = (V * T) + L.x;
	return Math.sqrt(L.z * L.z + (D + L.y) * (D + L.y) + pos * pos) / C + T;
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

function observerTimeToRealTimeWithSpin(T, P, Lx, Ly, Lz, Ax, Ay, Az) {

	//Lx
	if (C === V) {
		const num = Lx * Lx - C * C * TT * T + D * D + 2 * D * Ly + Ly * Ly + Lz * Lz;
		const den = C * (2 * Lx + 2 * C * T);
		return [num / den, num / den];
	} else {
		const num = Math.sqrt(2 * Lx * V - 2 * C * T - 4 * (C * C - V ^ V) * (-X * X + C * C * T - D * D - 2 * D * Ly - Ly * Ly - Lz * Lz)) + 2 * Lx * V + 2 * C * C * T;
		const num2 = -Math.sqrt(2 * Lx * V - 2 * C * T - 4 * (C * C - V ^ V) * (-X * X + C * C * T - D * D - 2 * D * Ly - Ly * Ly - Lz * Lz)) + 2 * Lx * V + 2 * C * C * T;
		const den = 2 * (C * C - V * V);
		return [num / den, num2 / den];
	}
}


export function observerTimeToRealTime(T, L) {
	// things have to be able to propagate forwardly.
	if (C <= 0) return [0, 0];

	if (C == V) {
		const a = (C * C * T * T - D * D - L * L) / (2 * C * (C * T + L));
		if (a < T) return [a];
		return [];
	}

	const r = [];
	const a = (C * C * T + L * V - Math.sqrt(C * C * D * D + C * C * L * L + 2 * C * C * L * V * T + V * V * (C * C * T * T - D * D))) / (C * C - V * V);
	if (a < T) r.push(a);
	// positive solution walks backwards...
	const b = (C * C * T + L * V + Math.sqrt(C * C * D * D + C * C * L * L + 2 * C * C * L * V * T + V * V * (C * C * T * T - D * D))) / (C * C - V * V);
	if (b < T) r.push(b);
	return r;

}




function update(evt) {
	B = (Number(sliderB.value) )/ 100;
	//O = (Number(sliderO.value)-50) / 50;
	//spanO.textContent = O.toFixed(2);
	C = Number(sliderC.value) / 100;
	spanC.textContent = C.toFixed(2);
	D = Number(sliderD.value) / 10;
	spanD.textContent = D.toFixed(2);
	V = Number(sliderV.value) / 100;
	//(${(V*C).toFixed(2)})
	spanV.textContent = `${(V).toFixed(2)} : ${sr_OVtoRV(B).toFixed(2)} + ${sr_OVtoRV(V).toFixed(2)} = ${sr_OVtoRV(B + V).toFixed(2)}`;
	L = Number(sliderL.value) / 10;
	spanL.textContent = L.toFixed(2);

	S = Number(sliderS.value) / 10;
	spanS.textContent = S.toFixed(2);
	// V2 feels velocity 
	BVf = ((1+B/100) * (V));
	// V2 real from feel...
	BVr = realVelocityOC(BVf);
	BTs = clockScalarOV(BVr);
	tNow = Number(sliderNow.value)/50;
	spanNow.textContent = tNow.toFixed(2);


	V1Real = realVelocityOC(V);
	const T1Real = clockScalarOV( V1Real );
	const VDel = BVf-V;
	const TSlowest = B>0?BTs:T1Real;
	const TFast = B<0?BTs:T1Real;

	const TRat = BTs/T1Real;
	P1Of = -findPos( V1Real )*V1Real;
	BOf = -findPos(BVr) * BVr;

	spanB.textContent = (B>0?"+":"")+(B).toFixed(2)+"% " + "("+BVf.toFixed(2)+" Real:"+BVr.toFixed(2)+"("+(BVr/C).toFixed(2)+") )" + " T:"+BTs.toFixed(2) +"("+(1/BTs).toFixed(2)+")";

	runT = Number(sliderRunT.value) / 5;
	spanRunT.textContent = runT.toFixed(2);
	spanStats.textContent = `Body Time Scale  ${clockScalarOV(realVelocityOC(V)).toFixed(2)}(${(1/clockScalarOV(realVelocityOC(V))).toFixed(2)})
			 IsReally ${realVelocityOC(V).toFixed(2)}(${(realVelocityOC(V)/C).toFixed(2)})
			 other:  ${VDel.toFixed(2)} ${TRat.toFixed(2)}  ${(TSlowest).toFixed(2)}  ${TFast.toFixed(2)} `
	spanRTB.textContent = `${findPos(BVr)} :${findPos(V1Real)} : ${findPos(BVr)*BVr} }`
	const x = C * Math.sqrt( findPos(BVr)*findPos(BVr)+D*D )
	const y = C * Math.sqrt( findPos(V1Real)*findPos(V1Real)+D*D )
	spanRTO.textContent = `tests: ${x.toFixed(3)}  ${y.toFixed(3)}B realV ${sr_OVtoRV(B).toFixed(2)} BV clock:${clockScalarOV(B + V).toFixed(2)} B clock:${clockScalarOV(B).toFixed(2)} delReal*BVclk${((sr_OVtoRV(B + V) - sr_OVtoRV(B)) * clockScalarOV(B + V)).toFixed(3)} ${sr_OVtoRV(V) * clockScalarOV(B + V)}`;

	for( let fr = 0; fr < 1000; fr++ ){
		const now = ((fr-500)/500)*runT;
		{
			const f = A_frames[fr];
			// position center, head, tail
			f.Pc = P1Of + now * V1Real;
			f.Ph = f.Pc + L;
			f.Pt = f.Pc - L;
			f.hue = 120 * (now % 3) - 240;
			// time these events were emitted...
			f.T_start = now;
			f.T_see_h = realTimeToObserverTime(now, L);
			f.T_see_c = realTimeToObserverTime(now, 0);
			f.T_see_t = realTimeToObserverTime(now, -L);
		}
		{
			const f = B_frames[fr];
			// position center, head, tail
			f.Pc = BOf + now * BVr;
			f.Ph = f.Pc + L;
			f.Pt = f.Pc - L;
			f.hue = 120 * (now % 3) - 240;
			// time these events were emitted...
			f.T_start = now;
			f.T_see_h = realTimeToObserverTime(now, L);
			f.T_see_c = realTimeToObserverTime(now, 0);
			f.T_see_t = realTimeToObserverTime(now, -L);
		}
	}

	draw(  );
}

function findPos( V, T ) {
	// V*T*V*T + D/C * D/C  = TC*TC
	// TT*(VV-CC) = DD/CC
	// sqrt( DD/CC / (VV-CC))
	return Math.sqrt( (D*D)/(C*C) / (C*C-V*V));
}

function draw() {
	const curtime = Date.now();
	const now = tNow;//(((curtime * S) % (runT * 1000)) / 1000) - runT / 2;

	const frame = Math.floor((now + runT / 2) * 10);
	ctx.clearRect(0, 0, 1024, 1024);

	let adraw = null;
	let bdraw = null;
	for( let f = 0; f < A_frames.length; f++ ) {
		if( A_frames[f].T_start >= now ) {
			const fr = A_frames[f];
			adraw = fr;
			ctx.strokeStyle = "green";
			ctx.beginPath();
			ctx.moveTo(500 + fr.Pc * xscale, 40);
			ctx.lineTo(500 + fr.Pc * xscale, 60);
			ctx.stroke();
			break;
		}
	}
	for( let f = 0; f < B_frames.length; f++ ) {
		if( B_frames[f].T_start >= now ) {
			const fr = B_frames[f];
			bdraw = fr;
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.moveTo(500 + fr.Pc * xscale, 80);
			ctx.lineTo(500 + fr.Pc * xscale, 100);
			ctx.stroke();			
			break;
		}
	}

	for( let f = 0; f < B_frames.length; f++ ) {
		const fr = B_frames[f];
		// distance from B to A (A to B?)
		const dist = adraw.Pc-fr.Pc;
		// how long(T) the light had to go.
		const dt = Math.sqrt( dist*dist + D*D) / C;
		if( (fr.T_start + dt) >= now ) {
			ctx.strokeStyle = "blue";
			ctx.beginPath();
			ctx.moveTo(500 + fr.Pc * xscale, 90);
			ctx.lineTo(500 + adraw.Pc * xscale, 50);
			ctx.stroke();			
			break;
		}
	}

	for( let f = 0; f < A_frames.length; f++ ) {
		const fr = A_frames[f];
		// distance from B to A (A to B?)
		const dist = bdraw.Pc-fr.Pc;
		// how long(T) the light had to go.
		const dt = Math.sqrt( dist*dist + D*D) / C;
		if( (fr.T_start + dt) >= now ) {
			ctx.strokeStyle = "orange";
			ctx.beginPath();
			ctx.moveTo(500 + bdraw.Pc * xscale, 90);
			ctx.lineTo(500 + fr.Pc * xscale, 50);
			ctx.stroke();			
			break;
		}

	}
	/*
	if (curFrameA < 0 || curFrameA != frame) {
		while( frame >= A_frames.length)
			A_frames.push(new Frame());
		curFrameA = frame;
	}
	{
		const f = A_frames[curFrameA];

		if (f) {
			// position center, head, tail
			f.Pc = P1Of + now * V1Real;
			f.Ph = f.Pc + L;
			f.Pt = f.Pc - L;
			f.hue = 120 * (now % 3) - 240;
			// time these events were emitted...
			f.T_start = now;
			f.T_see_h = realTimeToObserverTime(now, L);
			f.T_see_c = realTimeToObserverTime(now, 0);
			f.T_see_t = realTimeToObserverTime(now, -L);

			ctx.strokeStyle = "green";
			ctx.beginPath();
			ctx.moveTo(500 + f.Pc * xscale, 40);
			ctx.lineTo(500 + f.Pc * xscale, 60);
			ctx.stroke();
		
		}
	}

	if (curFrameB < 0 || curFrameB != frame) {
		while( frame >= B_frames.length)
			B_frames.push(new Frame());
		curFrameB = frame;
	}
	{
		const f = B_frames[curFrameB];
		if (f) {
			// position center, head, tail
			f.Pc = BOf + now * BVr;
			f.Ph = f.Pc + L;
			f.Pt = f.Pc - L;
			f.hue = 120 * (now % 3) - 240;
			// time these events were emitted...
			f.T_start = now;
			f.T_see_h = realTimeToObserverTime(now, L);
			f.T_see_c = realTimeToObserverTime(now, 0);
			f.T_see_t = realTimeToObserverTime(now, -L);

			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.moveTo(500 + f.Pc * xscale, 80);
			ctx.lineTo(500 + f.Pc * xscale, 100);
			ctx.stroke();
		
		}
	}

	*/




	if(0) {
	const beamX = canvas.width / 2;
	const beamY = canvas.height / 2 + 40;
	const frame = Math.floor((now + runT / 2) * 10);
	if (curFrame < 0 || curFrame != frame) {
		curFrame = frame;
		const f = eventFrames[curFrame];
		if (!f) {
			f = eventFrames[curFrame] = new Frame();
		}
		if (f) {
			// position center, head, tail
			f.Pc = now * V
			f.Ph = f.Pc + L;
			f.Pt = f.Pc - L;
			f.hue = 120 * (now % 3) - 240;
			// time these events were emitted...
			f.T_start = now;
			f.T_see_h = realTimeToObserverTime(now, L);
			f.T_see_c = realTimeToObserverTime(now, 0);
			f.T_see_t = realTimeToObserverTime(now, -L);
		}
	}


	ctx.clearRect(0, 0, 1024, 1024);
	ctx.strokeStyle = "blue";

	let drawP = null, drawT = null, drawH = null;
	let drawP2 = null, drawT2 = null, drawH2 = null;
	for (let f = 0; f < curFrame; f++) {
		const frame = eventFrames[f];
		ctx.beginPath();
		ctx.moveTo(500 + frame.Pc * xscale, 40);
		const toY = D * 100 + 40;
		ctx.lineTo(500, toY);
		ctx.stroke();

		if ((frame.T_see_c < now)) {
			if (drawP) drawP2 = frame;
			else drawP = frame;
		}
		if ((frame.T_see_h < now)) {
			if (drawH) drawH2 = frame;
			else drawH = frame;
		}
		if ((frame.T_see_t < now)) {
			if (drawT) drawT2 = frame;
			else drawT = frame;
		}

		if (now < frame.T_see_c) {
			const del = frame.T_see_c - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed / del;
			centerBoxXY((500 + frame.Pc * xscale) * (1 - delT) + (500) * (delT), 40 * (1 - delT) + toY * (delT));
		}
		if (now < frame.T_see_h) {
			const del = frame.T_see_h - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed / del;
			headTri((frame.Pc + L) * (1 - delT), 40 * (1 - delT) + toY * (delT));
		}
		if (now < frame.T_see_t) {
			const del = frame.T_see_t - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed / del;
			tailTri((frame.Pc - L) * (1 - delT), 40 * (1 - delT) + toY * (delT));
		}
	}

	//if( drawP !== eventFrames[0] ) 
	{

		if (drawP)
			centerBoxXY(500 + drawP.Pc * xscale, 30);
		if (drawP2)
			centerBoxXY(500 + drawP2.Pc * xscale, 30);
		if (drawH !== eventFrames[0])
			if (drawH)
				headTri(drawH.Pc + L, 30);
		if (drawH2)
			headTri(drawH2.Pc + L, 30);
		if (drawT !== eventFrames[0])
			if (drawT)
				tailTri(drawT.Pc - L, 30);
		if (drawT2)
			tailTri(drawT2.Pc - L, 30);

	}
	const front = observerTimeToRealTime(now, L);
	const center = observerTimeToRealTime(now, 0);
	const back = observerTimeToRealTime(now, -L);
	for (let f of front)
		headTri(f * V + L, 6);
	for (let b of back)
		tailTri(b * V - L, 6);
	for (let c of center)
		centerBox(c * V, 6);

	if (1) {
		if (center.length > 1 && front.length > 1) {
			//console.log( "blah:", center[1], front[1], back[1] );
			var grd = ctx.createLinearGradient(500 + (center[1] * V) * xscale + ((front[1] * V + L) - center[1] * V) * xscale, 0, 500 + (center[1] * V) * xscale, 0);
			grd.addColorStop(0, `hsl(${(-(front[1]) % 3) * 120},100%,50%`);
			grd.addColorStop(1, `hsl(${(-(center[1]) % 3) * 120},100%,50%`);
			ctx.fillStyle = grd;
			ctx.fillRect(500 + (center[1] * V) * xscale, 8, ((front[1] * V + L) - center[1] * V) * xscale, 10);
		}
		if (center.length > 1 && back.length > 1) {
			var grd = ctx.createLinearGradient(500 + (back[1] * V - L) * xscale, 0, 500 + (back[1] * V - L) * xscale + (center[1] * V - (back[1] * V - L)) * xscale, 0);
			grd.addColorStop(1, `hsl(${(-(center[1]) % 3) * 120},100%,50%`);
			grd.addColorStop(0, `hsl(${(-(back[1]) % 3) * 120},100%,50%`);
			ctx.fillStyle = grd;
			ctx.fillRect(500 + (back[1] * V - L) * xscale, 8, (center[1] * V - (back[1] * V - L)) * xscale, 10);
		}


		if (center.length > 0 && front.length > 0) {
			var grd = ctx.createLinearGradient(500 + (center[0] * V) * xscale + ((front[0] * V + L) - center[0] * V) * xscale, 0, 500 + (center[0] * V) * xscale, 0);
			grd.addColorStop(0, `hsl(${((front[0]) % 3) * 120},100%,50%`);
			grd.addColorStop(1, `hsl(${((center[0]) % 3) * 120},100%,50%`);
			ctx.fillStyle = grd;
			ctx.fillRect(500 + (center[0] * V) * xscale, 8, ((front[0] * V + L) - center[0] * V) * xscale, 10);
		}
		if (center.length > 0 && back.length > 0) {
			var grd = ctx.createLinearGradient(500 + (back[0] * V - L) * xscale, 0, 500 + (back[0] * V - L) * xscale + (center[0] * V - (back[0] * V - L)) * xscale, 0);
			grd.addColorStop(1, `hsl(${((center[0]) % 3) * 120},100%,50%`);
			grd.addColorStop(0, `hsl(${((back[0]) % 3) * 120},100%,50%`);
			ctx.fillStyle = grd;
			ctx.fillRect(500 + (back[0] * V - L) * xscale, 8, (center[0] * V - (back[0] * V - L)) * xscale, 10);
		}

	}

	const v = sr_OVtoRV(V);

	ctx.fillStyle = `hsl(${120 * (now % 3) - 240},100%,50%`
	ctx.fillRect(500 + (now * v - L) * xscale, 15, (2 * L) * xscale, 10);

	headTri(now * v + L, 20);
	tailTri(now * v - L, 20);
	centerBox(now * v, 20);
	}

	const delta = (curtime - last_draw_tick) / 1000;
	last_draw_tick = curtime;
	
	last_draw_time = now;
	//console.log("draw:", delta);



	function headTri(t, o) {
		const y = 0;

		ctx.fillStyle = "red";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(500 + (t) * xscale + 5, o + y);
		ctx.lineTo(500 + (t) * xscale - 5, o + y - 5);
		ctx.lineTo(500 + (t) * xscale - 5, o + y + 5);
		ctx.fill();
	}

	function tailTri(t, o) {
		const y = 0;

		ctx.fillStyle = "blue";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(500 + (t) * xscale - 5, o + y);
		ctx.lineTo(500 + (t) * xscale + 5, o + y - 5);
		ctx.lineTo(500 + (t) * xscale + 5, o + y + 5);
		ctx.fill();
	}

	function centerBoxXY(x, y) {

		ctx.fillStyle = "green";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(x + 5, y);
		ctx.lineTo(x, y - 5);
		ctx.lineTo(x - 5, y);
		ctx.lineTo(x, y + 5);
		ctx.fill();
	}
	function centerBox(t, o) {
		//const y = 20;
		centerBoxXY(500 + (t) * xscale, o);
	}


	if (tron) {
		tron.tick(delta);
		tronCtx.clearRect( 0, 0, 1000, 1000 )
		tron.draw(  tronCtx);
	}

	//requestAnimationFrame(draw);

	return;

}

requestAnimationFrame(draw);
//draw();

