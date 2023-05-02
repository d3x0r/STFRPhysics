
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
let V=0.80; // velocity  (m/s)
let S=1.0; // time scalar (s/s)
let A=0; // length of body (m)  (L/C = time of body (s))
let sa = 0;// Math.sin(A);
let ca = 0;//Math.cos(A);


let runT = 12;

let E = 0;
let now = 0;
let animate = true;
const step = 10;

const frames = [];
let curFrame = -1;
const nFrames = 501;
let eventFrame = -1;
let last_draw_time = 0;
const xscale = 100;
const yscale = 100;
let didEvent = false;
const photonStart = 100;


let frameStep = (1/nFrames * runT);
let halfFrame = frameStep/2;

const ARCS = 48;
const ARC_HALFLEN = (Math.PI*2)/(2*ARCS);
const SPOKES = 12;
const SPOKE_SEGS = 20;

class Arc{
	baseAngle = 0;
	pos = 0;
	T_see = 0;
	angle = 0;
	constructor( baseAngle ) {
		this.baseAngle = baseAngle;
	}
	set( R, V, T ){
		this.pos = D2+0;//V*T;
		this.angle = V/R*T+ this.baseAngle;
		const cm = this.pos + R*Math.cos( V/R*T+ this.baseAngle );
		const sm = D        + R*Math.sin( V/R*T+ this.baseAngle );
		this.T_see = Math.sqrt( cm*cm + sm*sm)/C + T;
		//ctx.strokeStyle =  `hsl(${(T%3)*40+120},${100*(1)}%,50%`
		//this.draw( ctx );
	}
	draw(ctx ){
		ctx.beginPath();
		//ctx.arc(500+(L-Math.cos(A)*V*(now-frame.T_start))*xscale, photonStart+(Math.sin(A)*V*(now-frame.T_start))*xscale, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
		ctx.arc(500+this.pos*xscale, 500+(D)*xscale
				, L*(xscale), this.angle + ARC_HALFLEN
							, this.angle - ARC_HALFLEN, true);
		ctx.stroke()
	}
}

class Spoke{
	T_see = [];
	from=[];
	to = [];
	baseAngle = 0;
	//n = 0;
	constructor(baseAngle) {
		for( let n = 0; n < SPOKE_SEGS; n++ ){
			this.T_see.push(0);
			this.from.push({x:0,y:0});
			this.to.push({x:0,y:0});
		} 
		this.baseAngle = baseAngle;
		//this.n = n;
	}
	draw( ctx, n ) {
		ctx.beginPath();
		ctx.moveTo( 500+xscale*this.from[n].x, 500+xscale*this.from[n].y );
		ctx.lineTo( 500+xscale*this.to[n].x, 500+xscale*this.to[n].y );
		ctx.stroke()
	}
	set( R, V, T ) {
		const angle = (V/R)*T+ this.baseAngle;
		const c = Math.cos(angle);
		const s = Math.sin(angle );
		const spokelen = L/SPOKE_SEGS;
		const center = D2+ 0;//V*T;
		for( let n = 0; n < SPOKE_SEGS; n++ )  {
			const slen = (spokelen*n);
			const midx = center+c*(slen+spokelen/2);
			const midy = D+s*(slen+spokelen/2);
			this.from[n].x = center+c*(slen);
			this.from[n].y = D+s*(slen);
			this.to[n].x = center+c*(slen+spokelen);
			this.to[n].y = D+s*(slen+spokelen);
			this.T_see[n] = T+Math.sqrt( midx*midx+midy*midy ) / C;
		}
	}
}

class Frame{
	arcs = [];
	spokes = [];
	hue = 0;
	T_start = 0;
	Event = 0;
	T_end = 0;
	constructor() {
		for( let a = 0; a < ARCS; a++  ) {
			this.arcs.push( new Arc(a*(Math.PI*2)/ARCS) );
		}
		for( let a = 0; a < SPOKES; a++  ) {
			this.spokes.push( new Spoke( a*(Math.PI*2)/SPOKES) );
		}
	}
}

for( let n = 0; n < nFrames; n++ ) {
	frames.push( new Frame() );
}


const controls = document.getElementById( "controls" );

let span;

const box = document.createElement( "div" );
box.classname = "control-box";
controls.appendChild( box );
          	
const spanChkHide = document.createElement( "label" );
spanChkHide.textContent = "Hide Controls";
controls.appendChild( spanChkHide );

const chkLblHide = document.createElement( "input" );
chkLblHide.setAttribute( "type", "checkbox" );
chkLblHide.checked = animate;
spanChkHide.appendChild( chkLblHide );
chkLblHide.addEventListener( "input", update );



span = document.createElement( "span" );
span.className = "left";
span.textContent = "C";
box.appendChild( span );

const sliderC = document.createElement( "input" );
sliderC.setAttribute( "type", "range" );
box.appendChild( sliderC );
sliderC.addEventListener( "input", update );

sliderC.setAttribute( "max",1250 );
sliderC.value = C*100;
sliderC.style.width="250px";

const spanC = document.createElement( "span" );
spanC.textContent = "1";
box.appendChild( spanC );

span = document.createElement( "br" );
box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Time Scale";
box.appendChild( span );

const sliderS = document.createElement( "input" );
sliderS.setAttribute( "type", "range" );
box.appendChild( sliderS );
sliderS.addEventListener( "input", update );

sliderS.setAttribute( "max",250 );
sliderS.value = S*10;
sliderS.style.width="250px";

const spanS = document.createElement( "span" );
spanS.textContent = "1";
box.appendChild( spanS );

span = document.createElement( "br" );
box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Distance";
box.appendChild( span );

const sliderD = document.createElement( "input" );
sliderD.setAttribute( "type", "range" );
box.appendChild( sliderD );
sliderD.addEventListener( "input", update );

sliderD.setAttribute( "max",1000 );
sliderD.value = (D+5)*100;
sliderD.style.width="250px";

const spanD = document.createElement( "span" );
spanD.textContent = "1";
box.appendChild( spanD );

span = document.createElement( "br" );
box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Offset";
box.appendChild( span );

const sliderD2 = document.createElement( "input" );
sliderD2.setAttribute( "type", "range" );
box.appendChild( sliderD2 );
sliderD2.addEventListener( "input", update );

sliderD2.setAttribute( "max",1000 );
sliderD2.value = (D2+5)*100;
sliderD2.style.width="250px";

const spanD2 = document.createElement( "span" );
spanD2.textContent = "1";
box.appendChild( spanD2 );

span = document.createElement( "br" );
box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Velocity";
box.appendChild( span );

const sliderV = document.createElement( "input" );
sliderV.setAttribute( "type", "range" );
box.appendChild( sliderV );
sliderV.addEventListener( "input", update );

sliderV.setAttribute( "max",1000 );
sliderV.value = V*1000;
sliderV.style.width="250px";

const spanV = document.createElement( "span" );
spanV.textContent = "1";
box.appendChild( spanV );

span = document.createElement( "br" );
box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Half-Length";
box.appendChild( span );

const sliderL = document.createElement( "input" );
sliderL.setAttribute( "type", "range" );
box.appendChild( sliderL );
sliderL.addEventListener( "input", update );

sliderL.setAttribute( "max",100 );
sliderL.value = L*10;
sliderL.style.width="250px";

const spanL = document.createElement( "span" );
spanL.textContent = "1";
box.appendChild( spanL );

span = document.createElement( "br" );
box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Direction";
box.appendChild( span );

const sliderA = document.createElement( "input" );
sliderA.setAttribute( "type", "range" );
box.appendChild( sliderA );
sliderA.addEventListener( "input", update );

sliderA.setAttribute( "max",200 );
sliderA.value = A*100;
sliderA.style.width="250px";

const spanA = document.createElement( "span" );
spanA.textContent = "1";
box.appendChild( spanA );

span = document.createElement( "br" );
box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Time of sim. event: ";
//box.appendChild( span );

const sliderE = document.createElement( "input" );
sliderE.setAttribute( "type", "range" );
//box.appendChild( sliderE );
sliderE.addEventListener( "input", update );

sliderE.setAttribute( "min",-100 );
sliderE.setAttribute( "max",+100 );
sliderE.value = E*10;
sliderE.style.width="250px";

const spanE = document.createElement( "span" );
spanE.textContent = "1";
//box.appendChild( spanE );

span = document.createElement( "br" );
//box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Run-Time";
box.appendChild( span );

const sliderRunT = document.createElement( "input" );
sliderRunT.setAttribute( "type", "range" );
box.appendChild( sliderRunT );
sliderRunT.addEventListener( "input", update );

sliderRunT.setAttribute( "max",250 );
sliderRunT.value = runT*5;
sliderRunT.style.width="250px";

const spanRunT = document.createElement( "span" );
spanRunT.textContent = "1";
box.appendChild( spanRunT );

span = document.createElement( "br" );
box.appendChild( span );
//----------------------

span = document.createElement( "span" );
span.className = "left";
span.textContent = "Now";
box.appendChild( span );

const sliderNow = document.createElement( "input" );
sliderNow.setAttribute( "type", "range" );
box.appendChild( sliderNow );
sliderNow.addEventListener( "input", update );

sliderNow.setAttribute( "min",-100 );
sliderNow.setAttribute( "max",100 );
sliderNow.value = now*runT;
sliderNow.style.width="250px";

const spanNow = document.createElement( "span" );
spanNow.textContent = "1";
box.appendChild( spanNow );

const spanChkNow = document.createElement( "span" );
spanChkNow.textContent = " |Animate";
box.appendChild( spanChkNow );

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = animate;
box.appendChild( chkLblNow );
chkLblNow.addEventListener( "input", update );

span = document.createElement( "br" );
box.appendChild( span );
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


function ObservedTime( T, V, P, V_o, P_o ) {
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

function RealTime( T_o, V, P, V_o, P_o ) {
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



function update( evt ) {

	if( chkLblHide.checked ) box.style.display="none";
	else box.style.display="";

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

	D2 = (Number(sliderD2.value)/500-1)*5;
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

	frameStep = 1/runT;
	halfFrame = frameStep/2;
	
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
		let maxSee = -Infinity;
		for( let arc of frame.arcs ) {
			arc.set( L, V, Treal);
			if( arc.T_see > maxSee )
				maxSee = arc.T_see;
		}
		for( let spoke of frame.spokes ){
			spoke.set( L, V, Treal )
			for( let see of spoke.T_see )
				if( see > maxSee )
					maxSee = see;
		}

		const nowE = (del * runT)-runT/2;
		frame.hue =120*(Treal%3)-240;
		frame.T_start = Treal;
		frame.T_end = maxSee;
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
	const ofs = 500;
	for( let X = -10; X < 10; X+=0.5 ) {
		for( let T = 10; T > -10; T-=0.5 ) {

			{
				ctx.beginPath();
				ctx.strokeStyle= "blue";
				ctx.moveTo( ofs + (xscale)*(X), ofs + (xscale)*(T) );
				ctx.lineTo( ofs + (xscale)*(X+1), ofs + (xscale)*(T) );
				ctx.moveTo( ofs +  (xscale)*(X), ofs + (xscale)*(T) );
				ctx.lineTo( ofs + (xscale)*(X), ofs + (xscale)*(T-1) );
				ctx.stroke();
			}	
		}
	}
	curFrame = nFrames;  // draw all frames
	const toY = D*yscale+photonStart;


	for( let f = 0; f < curFrame; f++ ) {
		const frame = frames[f];
		if( frame.T_start <= now  && frame.T_end >= now ) 
		{
			ctx.strokeStyle =  `hsl(${frame.hue},${100*(frame.T_start>now?0.5:1)}%,50%`
			for( let arc of frame.arcs ) {
				const del = Math.abs( arc.T_see - now );
				if( del < halfFrame ) {
					arc.draw( ctx );
				}
			}
			for( let spoke of frame.spokes ) {
				for( let n = 0; n < SPOKE_SEGS; n++ ) {
					const del = Math.abs( spoke.T_see[n] - now );
					if( del < halfFrame )
						spoke.draw( ctx, n)
				}
			}
		}
		last_draw_time = now;

	}



if( animate )
	requestAnimationFrame( draw );

	return;

}

		draw();

