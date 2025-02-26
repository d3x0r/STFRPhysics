
//import {lnQuat} from "../3d/src/lnQuatSq.js"

import {RealTime} from "./relativistic.util.js"
const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );


let L=1; // length of body (m)  (L/C = time of body (s))
let L_o=1; // length of body (m)  (L/C = time of body (s))
let C=1; // speed of propagation (m/s)
let D=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let D2=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=0.50; // velocity  (m/s)
let S=1.0; // time scalar (s/s)
let A=0; // length of body (m)  (L/C = time of body (s))
let View = 0;
let Z = 0;
let sa = 0;// Math.sin(A);
let ca = 0;//Math.cos(A);
let sin_view = 0;
let cos_view = 1;
let lengthContract = 1;
let debugAb = false;

let runT = 4;
let E = 0;
let now = 0;
let animate = true;
const step = 10;

const eventFrames = [];
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
	eventFrames.push( new Frame() );
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
span.textContent = "View Direction";
controls.appendChild( span );

const sliderView = document.createElement( "input" );
sliderView.setAttribute( "type", "range" );
controls.appendChild( sliderView );
sliderView.addEventListener( "input", update );

sliderView.setAttribute( "max",200 );
sliderView.value = View*100;
sliderView.style.width="250px";

const spanView = document.createElement( "span" );
spanView.textContent = "1";
controls.appendChild( spanView );

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
span.className = "left";
span.textContent = "Z-Level";
controls.appendChild( span );

const sliderZ = document.createElement( "input" );
sliderZ.setAttribute( "type", "range" );
controls.appendChild( sliderZ );
sliderZ.addEventListener( "input", update );

sliderZ.setAttribute( "min",-1000 );
sliderZ.setAttribute( "max",1000 );
sliderZ.value = Z/100;
sliderZ.style.width="250px";

const spanZ = document.createElement( "span" );
spanZ.textContent = "1";
controls.appendChild( spanZ );

span = document.createElement( "br" );
controls.appendChild( span );

//----------------------

const spanChkContract = document.createElement( "label" );
spanChkContract.textContent = "Length Contract";
controls.appendChild( spanChkContract );

const chkLblContract = document.createElement( "input" );
chkLblContract.setAttribute( "type", "checkbox" );
chkLblContract.checked = animate;
spanChkContract.appendChild( chkLblContract );
chkLblContract.addEventListener( "input", update );

const spanChkDebug = document.createElement( "label" );
spanChkDebug.textContent = "Debug Aberration";
controls.appendChild( spanChkDebug );

const chkLblDebug = document.createElement( "input" );
chkLblDebug.setAttribute( "type", "checkbox" );
chkLblDebug.checked = false;
spanChkDebug.appendChild( chkLblDebug );
chkLblDebug.addEventListener( "input", update );


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




function ObservedTime( T, V, P, V_o, P_o ) {

	const p_x = (P_o.z - P.x) + V_o.x*T;
	const p_y = (P_o.y - P.y) + V_o.y*T;
	const p_z = (P_o.z - P.z) + V_o.z*T;

	const D = C*C-(V.x*V.x+V.y*V.y+V.z*V.z); // C, V_E
	const px = p_x-T*V.x;
	const py = p_y-T*V.y;
	const pz = p_z-T*V.z;

	return [( C*Math.sqrt( px*px+py*py+pz*pz ) + C*C* T - (  p_x * V.x  +  p_y*V.y  +  p_z*V.z ) )/D];
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) (C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const xd = P.x-P_o.x;
	const yd = P.y-P_o.y;
	const zd = P.z-P_o.z;
	const VV = V.x*V.x+V.y*V.y+V.z*V.z;

	if( VV === C*C ) {
		//solve (S-T)^2 = ((D/C T - J /sqrt(J*J+K*K+L*L) S + X/C)^2 + (E/C T - K /sqrt(J*J+K*K+L*L)S + Y/C)^2 + (F/C T - L/sqrt(J*J+K*K+L*L) S + Z/C)^2)  for S
		//S = (sqrt(J^2 + K^2 + L^2) (C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2))/(2 C (C T sqrt(J^2 + K^2 + L^2) - D J T - E K T - F L T - J X - K Y - L Z))		
	}

	{
	const X = xd;
	const Y = yd;
	const Z = zd;

	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const tmp = (-C*C * T + D * J * T 
							+ E * K * T 
							+ F * L * T 
							+ J * X + K * Y + L * Z);
	const CV =  C*C - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	const S = (Math.sqrt(tmp*tmp
						 - CV
							*(C*C * T*T
							- D*D * T*T 
							- 2 * D * T * X 
							- E*E * T*T 
							- 2 * E * T * Y 
							- F*F * T*T 
							- 2 * F * T * Z 
							- xd*xd - yd*yd - zd*zd)
						) 
				+ C*C * T - D * J * T - E * K * T - F * L * T - J * X - K * Y - L * Z
				) / CV;
	return S;
	}
}

function EmitPos( T_o, V_e, P, V_o, P_o ) {
	/*
            vec3 realVel2 = (rotmat *  (speed2*direction2) );
            vec3 delpos = startPos;
            vec3 tmp = delpos - realVel2*time;
            float A = time*time*C*C - dot(tmp,tmp);
            float B = time*C*C + dot( (realVel*speed1) , tmp );
            float D = C*C-speed1*speed1;
            if( abs(D) < 0.00000001 ) T = A/(2.0*B);
            else T = (sqrt( B*B - D*A ) + B)/D;
            vec3 real_position = startPos + T*realVel*speed1;
            //vec3 real_position = startPos;
            //gl_Position = projectionMatrix * vec4( real_position, 1.0 );
            vec3 abb_pos = aberration( real_position, -realVel2, vec3(0) );
            gl_Position = projectionMatrix * vec4( abb_pos, 1.0 );
         */
	const rv2 = { x:V_o.x, y:V_o.y, z:0 };
	const delpos = { x:P.x-P_o.x, y:P.y-P_o.y, z:P.z-P_o.z }
	const tmp = { x: delpos.x - V_o.x*T_o, y : delpos.y - V_o.y*T_o, z: delpos.z - V_o.z*T_o };
	const A = T_o*T_o*C*C - (tmp.x*tmp.x + tmp.y*tmp.y + tmp.z*tmp.z);
	const B = T_o*C*C + ( V_e.x*tmp.x + V_e.y*tmp.y, V_e.z*tmp.z );
	const D = C*C-V*V;
	let T;
	if( Math.abs(D) < 0.000001 ) T = A/(2*B);
	else T= ( Math.sqrt( B*B - D*A ) + B )/D;
	const real_position = { x: P.x + T*V_e.x, y : P.y + T*V_e.y, z:P.z + T*V_e.z };
	return real_position;
}

function EmitTime( T_o, V, P, V_o, P_o ) {
	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 - 4 (C^2 - D^2 - E^2 - F^2) (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$
	const xd = P.x-P_o.x;
	const yd = P.y-P_o.y;
	const zd = P.z-P_o.z;
	const VV = V.x*V.x+V.y*V.y+V.z*V.z;
	const v = Math.sqrt(VV);

	const S = T_o;
	const X = xd;
	const Y = yd;
	const Z = zd;

	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	if( VV == C*C ) {
		//solve (S-T)^2 = ((D/sqrt(D*D+E*E+F*F) T - J /CS + X/C)^2 + (E/sqrt(D*D+E*E+F*F) T - K /CS + Y/C)^2 + (F/sqrt(D*D+E*E+F*F) T - L /CS + Z/C)^2)  for T
		//T = (-C^2 S^2 + J^2 S^2 - 2 J S X + K^2 S^2 - 2 K S Y + L^2 S^2 - 2 L S Z + X^2 + Y^2 + Z^2)/(2 (C^2 (-S) + (C D J S)/sqrt(D^2 + E^2 + F^2) + (C E K S)/sqrt(D^2 + E^2 + F^2) + (C F L S)/sqrt(D^2 + E^2 + F^2) - (C D X)/sqrt(D^2 + E^2 + F^2) - (C E Y)/sqrt(D^2 + E^2 + F^2) - (C F Z)/sqrt(D^2 + E^2 + F^2)))

		const T =   (-C*C * S*S 
						+ J*J * S*S - 2 * J * S * X 
						+ K*K * S*S - 2 * K * S * Y 
						+ L*L * S*S - 2 * L * S * Z 
						+ X*X + Y*Y + Z*Z
					)/(2 * (C*C * (-S) 
						+ C * ( ( D * J * S) + (E * K * S) + (F * L * S) - (D * X) - (E * Y) - (F * Z)) /v))
		if( T < T_o ) return T; 
		{
			//console.log( "Overflowed:", P, V, P_o, V_o, T_o, T );
			return -Math.Infinity;
		}
		//const T =   (- S*S + J*J * S*S - 2 * J * S * X + X*X )/(2 * ( (-S) +  ( ( D * J * S) - (D * X) ) /v))
	}
	{

	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 
	//         - 4 (C^2 - D^2 - E^2 - F^2) (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) 
	//         + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$
	const tmp = (-C*C * S 
					+ D * J * S - D * X 
					+ E * K * S - E * Y 
					+ F * L * S - F * Z
					);
	const CV = C*C - D*D - E*E - F*F;
	const T = (-Math.sqrt(tmp*tmp 
							- CV * (C*C * S*S
									- J*J * S*S 
									+ 2 * J * S * X 
									- K*K * S*S 
									+ 2 * K * S * Y 
									- L*L * S*S
									+ 2 * L * S * Z 
									- X*X - Y*Y - Z*Z)
							) 
					+ C*C * S 
					- D * J * S 
					+ D * X 
					- E * K * S 
					+ E * Y 
					- F * L * S 
					+ F * Z
				)/CV;
		return T;
	}
}

function aberration(th,V) {
	const a = Math.acos( (Math.cos(th)+V/C)/(1+V/C*Math.cos(th)) )
	if( th < 0 || th > Math.PI) return -a;
	return a;
}

function aberration2( Xox, Xoy, Xoz, Xx, Xy, Xz ) {
	const forward = { x : ca * V, y: sa * V, z : 0 };

	let delx = Xx-Xox;
	let dely = Xy-Xoy;
	let delz = Xz-Xoz;
	let rx = Xx;
	let ry = Xy;
	let rz = Xz;

	let len2 = delx*delx + dely*dely + delz*delz;
	let Vdot = delx * forward.x + dely*forward.y + delz*forward.z;
        //vec3 Vcrs = vec3(  delz*Vo.y-dely*Vo.z, delx*Vo.z-delz*Vo.x, dely*Vo.x-delx*Vo.y );
	const Vcrsx = delz * forward.y - dely * forward.z;
	const Vcrsy = delx * forward.z - delz * forward.x;
	const Vcrsz = dely * forward.x - delx * forward.y;
	//const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
	//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
	let baseAng;
	let delAng;
	if( V > 0.00001 ) {
		let len = Math.sqrt( len2 );
		let Vlen = V;
		let norm = len*Vlen;
		let CosVDot = Vdot/norm;
		baseAng = Math.acos( CosVDot );
		if( Vcrsz < 0 ) baseAng = -baseAng;
		delAng = ((( Vcrsz < 0 )?-1:1)*Math.acos( ( CosVDot + Vlen/C)/(1 + Vlen/C * CosVDot)))-baseAng;
		//if( Vcrsz < 0 ) delAng = -delAng;
		if( Math.abs( delAng) > 0.00001 ) {
			const c = Math.cos( delAng );
			const s = Math.sin( delAng );
			let vx = delx, vy=dely, vz = delz;
			const n = Math.sqrt( Vcrsx*Vcrsx + Vcrsy*Vcrsy + Vcrsz*Vcrsz);
			const qx = Vcrsx/n;
			const qy = Vcrsy/n;
			const qz = Math.abs(Vcrsz/n);
    
			const dot =  (1.0-c)*((qx * vx ) + (qy*vy)+(qz*vz));

			rx = Xox + vx*c + s*(qy * vz - qz * vy) + qx*dot;
			ry = Xoy + vy*c + s*(qz * vx - qx * vz) + qy*dot;						
			rz = Xoz + vz*c + s*(qx * vy - qy * vx) + qz*dot;
		}
	}
	return { x:rx, y:ry, ba:baseAng, da:delAng };
}


/*
    vec3 aberration( vec3 X, vec3 Vo, vec3 Xo ){

        if( enableAberration == 0 || Vo.x == 1.0 ) {
            return X+Xo;
        }
        vec3 Xr;// = vec3();
        float delx = X.x-Xo.x;
        float dely = X.y-Xo.y;
        float delz = X.z-Xo.z;
        float len2 = delx*delx+dely*dely+delz*delz;
        float Vlen2 = Vo.x*Vo.x+Vo.y*Vo.y+Vo.z*Vo.z;
        float Vdot = delx * Vo.x + dely * Vo.y + delz * Vo.z;
        vec3 Vcrs = vec3(  delz*Vo.y-dely*Vo.z, delx*Vo.z-delz*Vo.x, dely*Vo.x-delx*Vo.y );
        if( len2 < 0.0000001 || Vlen2 < 0.000001) {
            // not far enough away to change...
            Xr =  Xo+X;
        } else {
            float len = sqrt(len2);
            float Vlen = sqrt(Vlen2);
            float norm = Vlen*len;
             //const vAng = acos( Vo.x/Vlen ) * (Vo.y<0?1:-1);
             //console.log( "velocity angle:", vAng, "from", Vlen );
            float CosVDot = Vdot/(norm);
            float baseAng = acos( CosVDot );
            float delAng = acos( ( CosVDot + Vlen/C ) 
                    / ( 1.0 + Vlen/C * CosVDot ) )-baseAng;
    
            if( abs(delAng) < 0.00000001 ) {
                Xr=Xo+X;
                return Xr;
            }
            float c = cos(delAng);
            float s = sin(delAng);
            float n = sqrt( Vcrs.x*Vcrs.x+Vcrs.y*Vcrs.y+Vcrs.z*Vcrs.z);
            if( n < 0.000000001 )
            {
                Xr=Xo+X;
                return Xr;
            }
            float qx = Vcrs.x/n;
            float qy = Vcrs.y/n;
            float qz = Vcrs.z/n;
    
            float vx = delx , vy = dely , vz = delz;
    
            float dot =  (1.0-c)*((qx * vx ) + (qy*vy)+(qz*vz));
            Xr.x = Xo.x + vx*c + s*(qy * vz - qz * vy) + qx * dot;
            Xr.y = Xo.y + vy*c + s*(qz * vx - qx * vz) + qy * dot;
            Xr.z = Xo.z + vz*c + s*(qx * vy - qy * vx) + qz * dot;
            
        }
        return Xr;
    }
*/

function aberration2a( Xox, Xoy, Xoz, Xx, Xy, Xz ) {
	const forward = { x : ca * V, y: sa * V, z: 0 };

	let delx = Xx-Xox;
	let dely = Xy-Xoy;

	let len2 = delx*delx + dely*dely;
	let Vdot = delx * forward.x + dely*forward.y;
	const Vcrsz = dely * forward.x - delx * forward.y;
	const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
	//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
	if( V > 0.00001 ) {
		let len = Math.sqrt( len2 );
		let Vlen = V;
		let norm = len*Vlen;
		let CosVDot = Vdot/norm;
		let baseAng = Math.acos( CosVDot );
		//console.log( "baseAng:", baseAng )
		let qz = Math.sign( Vcrs );
		const delAng = -qz*(Math.acos( ( CosVDot + Vlen/C)/(1 + Vlen/C * CosVDot))-baseAng);
		return delAng;
	}
	return 0;
}

	function contract( x, y ) {
		/*
			direction1 is a unit vector in direction of velocity.
			rotmat is the rotation matrix (rotate direction1 to view direction ( no translation for 2D top down)	
		vec3 realVel = (rotmat * (direction1) );
			// realVel = direction1
		vec3 posDir = realVel * dot(startPos,realVel);
        	startPos = ( startPos - posDir) + posDir*g1;
		*/
		if( chkLblContract.checked ) {
		let posVelDot = ( x*ca + y * sa );
		let posDirx = ca * posVelDot;
		let posDiry = sa * posVelDot;

		if( V > 0.0) {
			x = ( x - posDirx) + posDirx*lengthContract;
			y = ( y - posDiry) + posDiry*lengthContract;
		}
		}
		return { x, y };
	}



function update( evt ) {
	C = Number(sliderC.value)/100;
	spanC.textContent = C.toFixed(2);
	V = Number(sliderV.value)/1000*C;
	spanV.textContent = V.toFixed(3);
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(1);

	debugAb = chkLblDebug.checked;

	lengthContract = Math.sqrt( C*C-V*V)/C;

	A = Number(sliderA.value)/100*Math.PI;
	View = Number(sliderView.value)/100 * Math.PI;
	sin_view = Math.sin( View );
	cos_view = Math.cos( View );
	sa = Math.sin(A);
	ca = Math.cos(A);
	L_o = L;
	L = contract( L, 0 ).x;// * (ca * lengthContract) + L*(sa);
        spanL.textContent = L.toFixed(3);


	spanA.textContent = (A/Math.PI).toFixed(3) + "π";

	D = (Number(sliderD.value)/500-1)*5;
	spanD.textContent = D.toFixed(3) ;

	D2 = (Number(sliderD2.value)/500-1)*L;
	spanD2.textContent = D2.toFixed(3);

	Z = (Number(sliderZ.value)/100);
	spanZ.textContent = Z.toFixed(3);

	const posContract = contract( D2, D );
	//D = posContract.y;
	spanD.textContent = D.toFixed(3) ;
	//D2 = posContract.x;
	//spanD2.textContent = D2.toFixed(3) + " T(world s):" + (-2*(C*D2+L*V)/(C*C-V*V)).toFixed(2)  + " T(obs s):"+ ((-2*(C*D2+L*V)/(C*C-V*V))/Math.sqrt(1-V/C)).toFixed(2) /*+ " O(m-m/s):"+ (-2*(C*D2+L*V)).toFixed(2)*/;

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
	spanNow.textContent = "T(world s):" +  (now).toFixed(2)  + " T(obs s):" + (now*Math.sqrt(1-V/C)).toFixed(2) /*+ " T(obs m-m/s):" + (now*(C*C-V*V)).toFixed(2)*/;

	if( eventFrame >= 0 ) {
		eventFrames[eventFrame].event = false;
		eventFrame = -1;
	}

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
		const frame = eventFrames[n];


		const nowE = (del * runT)-runT/2;
		frame.hue =120*(Treal%3)-240;
		frame.Po = {x:ca*V*Treal + posContract.x,y:sa*V*Treal+posContract.y};
		frame.Pc = {x:ca*V*Treal + 0,y:sa*V*Treal};
		frame.Ph = {x:ca*V*Treal + L,y:sa*V*Treal};
		frame.Pt = {x:ca*V*Treal + -L,y:sa*V*Treal};

		const ot = ObservedTime( Treal, {x:ca*V,y:sa*V, z:0}, {x:-L, y:0, z:0 }, {x:ca*V, y:sa*V, z:0}, {x:posContract.x, y:posContract.y, z:Z } );
		const oc = ObservedTime( Treal, {x:ca*V,y:sa*V, z:0}, {x: 0, y:0, z:0 }, {x:ca*V, y:sa*V, z:0}, {x:posContract.x, y:posContract.y, z:Z } );
		const oh = ObservedTime( Treal, {x:ca*V,y:sa*V, z:0}, {x: L, y:0, z:0 }, {x:ca*V, y:sa*V, z:0}, {x:posContract.x, y:posContract.y, z:Z } );

		frame.T_start = Treal;
		frame.T_end = (ot>oc)?(oh>ot)?oh:ot :(oc>oh)?oc:oh;
		frame.T_see_c = oc;
		frame.T_see_h = oh;
		frame.T_see_t = ot;
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

	curFrame = nFrames;  // draw all eventFrames
	let drawP = null, drawT = null, drawH = null;
	let drawP2 = null,drawT2 = null,drawH2 = null;
	const toY = D*yscale+photonStart;


	for( let f = 0; f < curFrame; f++ ) {
		const frame = eventFrames[f];
		if( frame.T_start < now   ) 
		{
			ctx.strokeStyle =  `hsl(${frame.hue},${100*(frame.T_start>now?0.5:1)}%,50%`
			if( frame.T_see_t > now ) {
				ctx.beginPath();
				ctx.moveTo( 500 +frame.Pt.x*xscale/*+ frame.Pc*xscale*/, 500+frame.Pt.y*xscale );
				ctx.lineTo( 500 +(frame.Po.x + (frame.T_see_t-frame.T_start)*ca*V)*xscale
							, 500 +(frame.Po.y + (frame.T_see_t-frame.T_start)*sa*V)*xscale );
				ctx.stroke();
			}
	   
			if( frame.T_see_h > now ) {
				ctx.beginPath();
				ctx.moveTo( 500 +frame.Ph.x*xscale/*+ frame.Pc*xscale*/, 500+frame.Ph.y*xscale );
				ctx.lineTo( 500 +(frame.Po.x + (frame.T_see_h-frame.T_start)*ca*V)*xscale
							, 500 +(frame.Po.y + (frame.T_see_h-frame.T_start)*sa*V)*xscale );
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

if( Math.abs(frame.T_start- now) <= runT/ (2*nFrames)) {
	const ca = Math.cos(A);
	const sa = Math.sin(A);


		ctx.beginPath();
		ctx.strokeStyle = "white";
			ctx.moveTo( 500 , 500  );
			ctx.lineTo( 500 + ca * 4 * xscale
					, 500 + sa*4 * xscale );
			ctx.stroke();
	//if(0)
	for( let x = 0; x < 360; x += 2 ) {
		const ab = aberration2( 900, 100, Z, 900 + Math.cos( x / 180 * Math.PI  ) * 90, 100  + Math.sin( x / 180 * Math.PI  ) * 90, 0 );
		//console.log( "ab is:", ab );
		ctx.beginPath();
		if( Math.abs( ((ab.ba*180/Math.PI))%360 ) <= 2 )
			ctx.strokeStyle = "white";   else
			ctx.strokeStyle = `hsl(${x} 100% 50%)`;
		ctx.moveTo( 900, 100 );
		ctx.lineTo( ab.x, ab.y );
//		ctx.lineTo( 900+Math.cos( ab.da )*90*x/360, 100+Math.sin(ab.da)*90*x/360 );
		ctx.stroke();
		if(0) {
			ctx.moveTo( 750, 100 );
//			ctx.lineTo( ab.x, ab.y );
			//ctx.lineTo( 750+Math.cos( ab.da +ab.ba)*90*x/360, 100+Math.sin(ab.da+ab.ba)*90*x/360 );
			ctx.lineTo( 750+Math.cos( ab.da )*90*x/360, 100+Math.sin(ab.da)*90*x/360 );
			ctx.stroke();
		}
		ctx.moveTo( 600, 100 );
		ctx.lineTo( 600+Math.cos( ab.ba )*90, 100+Math.sin(ab.ba)*90 );
		ctx.stroke();
		if( 0 ) {
			ctx.moveTo( 450, 100 );
			ctx.lineTo( 450+ Math.cos(x/180*Math.PI)*90, 100+Math.sin(x/180*Math.PI)*90 );
			ctx.stroke();
		}
	}


	ctx.fillStyle =  `hsl(${120*(now%3)-240},100%,50%`
	ctx.fillRect( 500+(ca*V*now-L)*xscale, 500+(sa*V*now)*xscale-5, (2*L)*xscale, 10 );
	ctx.fillStyle =  'black'
	ctx.fillRect( 500+(ca*V*now-L_o*lengthContract)*xscale, 503+(sa*V*now)*xscale-5, (2*L_o*lengthContract)*xscale, 4 );
	headTri( frame.Ph.x-ca*V*(frame.T_see_h-now), 500+(frame.Ph.y-sa*V*(frame.T_see_h-now))*xscale, true );
	tailTri(  frame.Pt.x-ca*V*(frame.T_see_t-now), 500+(frame.Pt.y-sa*V*(frame.T_see_t-now))*xscale,  true );

	//headTri( frame.Ph.x, 500+(frame.Ph.y)*xscale, true );
	//tailTri(  frame.Pt.x, 500+(frame.Pt.y)*xscale,  true );
	
	centerBox( frame.Pc.x-ca*V*(frame.T_see_c-now), 500+(frame.Pc.y-sa*V*(frame.T_see_c-now))*xscale, true );
	centerBoxXY( 500 + frame.Po.x*xscale, 500+frame.Po.y*xscale, true );

		const pcont = contract( D2, D );
	const curx = ca*V*now+ pcont.x;
	const cury =  sa*V*now+pcont.y;
	for( let n = -20; n <= 20; n++ ) {
		const t = (n/20)*L;
		const cont = contract( t, 0 );
		//const time = getObservedTimePos( frame.Po.x - (frame.Pc.x+t), frame.Po.y - frame.Pc.y );
		const time = EmitTime( now, {x:ca*V,y:sa*V, z:0}, {x:cont.x, y:0, z:0 }
									, {x:ca*V, y:sa*V, z:0}, {x:pcont.x, y:pcont.y, z:Z } );
		const apparentx = ((cont.x)+ca*V*(time));
		const apparenty = (sa*V*(time));
		const len = Math.sqrt( (apparentx-curx) * (apparentx-curx) + (apparenty-cury) * (apparenty-cury) );

		ctx.fillStyle =  `hsl(${((time)%3)*120+120},100%,50%`
		ctx.strokeStyle =  `green`
		centerBoxXY( 500+( apparentx ) *xscale, 500+(  apparenty )*xscale, false );
		//const epos = EmitPos( now, {x:ca*V,y:sa*V, z:0}, {x:t, y:0, z:0 }, {x:ca*V, y:sa*V, z:0}, {x:D2, y:D, z:0 } );
		//const apparentx = epos.x;
		//const apparenty = epos.y;
		
		let newPos = aberration2( ca*V*now+ pcont.x, sa*V*now+pcont.y, Z, apparentx, apparenty, 0 ) ;

		const aberrantx = newPos.x;
		const aberranty = newPos.y;
		ctx.moveTo( 500+(curx)*xscale +20*cos_view - 20*sin_view, 500+(cury)*xscale +20*sin_view+ 20*cos_view ) ;
		ctx.lineTo( 500+(curx)*xscale +20*cos_view+ 20*sin_view, 500+(cury)*xscale +20*sin_view- 20*cos_view ) ;
		ctx.stroke();

		const view_dot = newPos.x * cos_view + newPos.y * sin_view;
		const vx = curx + (aberrantx - curx) / view_dot;
		const vy = cury + (aberranty - cury) / view_dot;
			ctx.beginPath();
			ctx.strokeStyle = "white";
		ctx.moveTo( 500+(curx)*xscale , 500+(cury)*xscale ) ;
		ctx.lineTo( 500+(vx)*xscale , 500+(vy)*xscale  ) ;
		ctx.stroke();
		//const view_depth = ( newPos.x - curx )

		if(debugAb) {
			ctx.beginPath();
			if( cont.x < 0 )
				ctx.strokeStyle = "cyan";
			else
				ctx.strokeStyle = "blue";
			ctx.arc( 500+curx*xscale, 500+cury*xscale, len*xscale, 0, Math.PI*2 );
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle = "white";
		//ctx.moveTo( 500 + ( frame.Po.x + abc * len *2 ) * xscale, 500 + ( frame.Po.y + abs * len *2 ) * xscale );
		//ctx.lineTo( 500 + frame.Po.x * xscale, 500 + frame.Po.y * xscale );
		//ctx.stroke();

		ctx.moveTo( 500 + ( newPos.x ) * xscale, 500 + ( newPos.y ) * xscale );
		ctx.lineTo( 500 + curx * xscale, 500 + cury * xscale );
		ctx.stroke();
		ctx.moveTo( 500 + ( (newPos.x -frame.Po.x) * 2 + frame.Po.x ) * xscale, 500 + ( (newPos.y -frame.Po.y) * 2 + frame.Po.y ) * xscale );
		ctx.lineTo( 500 + curx * xscale, 500 + cury * xscale );
		ctx.stroke();
	}
		
		//centerBoxXY( 500+( apparentx ) *xscale, 500+( apparenty )*xscale, false );
		ctx.strokeStyle =  `white`
		centerBoxXY( 500+(aberrantx)*xscale, 500+(aberranty )*xscale, false );

		//ctx.strokeStyle =  `red`
		//centerBoxXY( 500+( newPos.x)*xscale, 500+( newPos.y )*xscale, false );

		//centerBoxXY( 500+newPos.x*xscale, 500+newPos.y*xscale, false );
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
	}

	//centerBoxXY( (500+D2*xscale), toY, true );

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
	//if( drawP !== eventFrames[0] ) 
	{

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
		ctx.closePath();
		ctx.stroke();
	}
	function centerBox( t,o,f ) {      
		//const y = 20;
		centerBoxXY( 500+(t)*xscale, o,f );
	}
	


	if( animate )
		requestAnimationFrame( draw );

	return;

}

		draw();

