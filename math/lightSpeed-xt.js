
//import {lnQuat} from "../3d/src/lnQuatSq.js"

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );
import {lnQuat} from "../3d/src/lnQuatSq.js"

let showXTGraph = false;
let showXTGraph_unbiased = false;
let showRelativeVelocities = false;
let includeAberration = true;
let drawLorentzRelative = false; // relative velocity purple crosses
let lengthContract = 1;
let A=0;
let ca = Math.cos(A);
let sa = -Math.sin(A);
let A_o = 0;
let ca_o = Math.cos( A_o );
let sa_o = -Math.sin( A_o );

let L=1; // length of body (m)  (L/C = time of body (s))
let C=1; // speed of propagation (m/s)
let D=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let D2=0; // shortest distance to moving body (m) (D/C = time to view closest event (s))
let V=0.6184; // velocity  (m/s)
let S=1.0; // time scalar (s/s)
let runT = 20;
let E = 0;
let now = 0;
let animate = false;
const step = 10;

const eventFrames = [];
let curFrame = -1;
const nFrames = 201;
let eventFrame = -1;

let last_draw_time = 0;
const xscale = 100;
const yscale = 100;
let didEvent = false;
const photonStart = 100;

//------------------ Storage for information about a frame ---------------------------

class Frame{
	PobsrX = 0; // position observer
	PobsrY = 0; // position observer
	PobsdX = 0; // position observer
	PobsdY = 0; // position observer
	Ph = 0; // position head
	Pc = 0; // postion center
	Pt = 0; // position tail
	hue = 0;
	T_start = 0; // time start event
	Event = 0;

	T_see_h = 0; // when head is seen by observer
	T_see_c = 0; // when center is seen by observer                      
	T_see_t = 0; // when tail is seen by observer

	P_see_h = 0; // when head is seen by observer
	P_see_c = 0; // when center is seen by observer                      
	P_see_t = 0; // when tail is seen by observer

	T_end = 0; // when we can stop drawing...
	relativeVelocityTo = {x:0,y:0};
	relativeVelocity = {x:0,y:0};
}

for( let n = 0; n < nFrames; n++ ) {
	eventFrames.push( new Frame() );
}


function aberration_orig(th,V) {
	const a = Math.acos( (Math.cos(th)+V/C)/(1+V/C*Math.cos(th)) )
	return a;
}


function aberration( X, Vo, Xo ) {
	// light direction (X-Xo) dot Vo/C = Vdot = |X-Xo||1|cos(th)
	//    Vdot/||(X-Xo) = cos(th)
	//  sindot =  sin(th) =  sqrt( 1-cos*cos );
	//  X += sinDot * Vo/C
	if( !includeAberration ) {
		return X;
	}
	const Xr = {x:0,y:0,z:0}
	const delx = X.x-Xo.x;
	const dely = X.y-Xo.y;
	const delz = X.z-Xo.z;
	const len2 = delx*delx+dely*dely+delz*delz;
	const Vlen2 = Vo.x*Vo.x+Vo.y*Vo.y+Vo.z*Vo.z;
	const Vdot = delx * Vo.x + dely * Vo.y + delz * Vo.z;
	const Vcrs = { x: delz*Vo.y-dely*Vo.z, y: delx*Vo.z-delz*Vo.x, z: dely*Vo.x-delx*Vo.y }
	if( len2 < 0.0000001 || Vlen2 < 0.000001) {
		// not far enough away to change...
		Xr.x = X.x;
		Xr.y = X.y;
		Xr.z = X.z;
		
	} else {
		const len = Math.sqrt(len2);
		const Vlen = Math.sqrt(Vlen2);
		const norm = Vlen*len;
 		//const vAng = Math.acos( Vo.x/Vlen ) * (Vo.y<0?1:-1);
		 //console.log( "velocity angle:", vAng, "from", Vlen );
		const CosVDot = Vdot/(norm);
		const baseAng = Math.acos( CosVDot );
		const delAng = Math.acos( ( CosVDot + Vlen/C ) 
				/ ( 1 + Vlen/C * CosVDot ) )-baseAng;//*((Vcrs.z<0)?-1:1);

		if( !delAng ) {
			Xr.x = X.x;
			Xr.y = X.y;
			Xr.z = X.z;
			return Xr;
		}
		const c = Math.cos(delAng);
		const s = Math.sin(delAng);
		const n = Math.sqrt( Vcrs.x*Vcrs.x+Vcrs.y*Vcrs.y+Vcrs.z*Vcrs.z);
//console.log( "blah?", norm, );
		const qx = Vcrs.x/n;
		const qy = Vcrs.y/n;
		const qz = Vcrs.z/n;

		const vx = delx , vy = dely , vz = delz;

		const dot =  (1-c)*((qx * vx ) + (qy*vy)+(qz*vz));
		Xr.x = Xo.x + vx*c + s*(qy * vz - qz * vy) + qx * dot;
		Xr.y = Xo.y + vy*c + s*(qz * vx - qx * vz) + qy * dot;
		Xr.z = Xo.z + vz*c + s*(qx * vy - qy * vx) + qz * dot;
		
/*
		const lnQ = new lnQuat( delAng, Vcrs ); // normalizes vector
		const delVec = {x:delx, y:dely, z:delz };
		const newDel = lnQ.apply( delVec )

		Xr.x = Xo.x + newDel.x;
		Xr.y = Xo.y + newDel.y;
		Xr.z = Xo.z + newDel.z;
*/
	}
	return Xr;
}

//const d3xTransform = new D3xTransform();
class D3xTransform {
	// converts a long time to a short time.
	
	static get gamma() { return  (C*C-V*V)/C*C };
 	static getObservedTime(X,T,myV) {
		const willSee = RealTime( T, {x:V,y:0,z:0}, {x:X, y:0, z:0}, {x:0,y:0,z:0}, {x:0, y:0, z:0} );
		return willSee[0];
	}
 	static getObservedPlace2(X,T) {
		const willSee2 = RealTime( T, {x:V,y:0,z:0}, {x:X, y:D, z:0}, {x:0,y:0,z:0}, {x:0, y:0, z:0} ); 
		return willSee2[0] * V + X;
	}

 	static getObservedTime2(X,T,myV) {
		const willSee = RealTime( T, {x:0,y:0,z:0}, {x:0, y:0, z:0}, {x:V,y:0,z:0}, {x:X, y:0, z:0} );
		return willSee[0]*(V);//-(X<=0?-1:1)*X;
	}
 	static getObservedPlace(X,T) {
		const willSee = RealTime( T, {x:0,y:0,z:0}, {x:0, y:D, z:0}, {x:-V,y:0,z:0}, {x:X, y:0, z:0} ); 
		return willSee[0] * -V +X;
	}

	static GetSeenSpace( C, now, pos, V, L, D ) {
		const A = pos;//((now*V)- L);
		// how long it will take to be seen at the current velocities...
		//const gamma = (C*C-V*V)/C;
		const hLen = ((A*V+Math.sqrt(A*A*C*C+D*D*(C*C-V*V)))/(C*C-V*V));
		return { now, pos:now*V, see_pos:pos+now*V+hLen*V, seen:now+hLen }
		//frame.T_start = now;
		//frame.Ph = frame.Pc + hLen*V;
		//frame.T_see_h = now+hLen;

	}

	static drawCoords( atNow ) {
		const xscale_ = xscale/3.5;
		const ofs = 500;//xscale_ * 13;

// velocity ratio line.
/*
		ctx.beginPath();
		ctx.strokeStyle= "white";
		ctx.moveTo( ofs , ofs  );
		ctx.lineTo( ofs + (xscale_)*(10), ofs + (xscale_)*(-10*(V/C) ) );
		ctx.stroke();
*/
	const myX = now*V*ca_o;
	const myY = now*V*sa_o;
	const posX = now*V*ca;
	const posY = now*V*sa;

	const delVX = V*ca - V*ca_o ;
	const delVY = V*sa - V*sa_o ;

					let seen  = RealTime( now, { x: V*ca, y: V*sa, z: 0 }
									, { x:0, y:-D, z:0 }
									, { x:ca_o*V, y:sa_o*V, z: 0 }
									, { x:0, y:0, z:0 } );

//seen
	ctx.lineWidth = 0.5;


	if(showXTGraph) {
		const gamma = lengthContract*(C-V)/C;  // This matches the matrual curve (at C=1)
		//const gamma = Math.sqrt( C*C-V*V);
		const gamma2 = lengthContract*(C+V)/C;
// Lorentz Transform Grid, based on velocity ratio line.
		for( let X = -10; X < 10; X++ ) 
		{
			ctx.beginPath();
			ctx.strokeStyle= "white";
			ctx.lineWidth = 3;
			//if( X > 0 )
			{
				ctx.moveTo( ofs - (xscale_)*(0), ofs  - (xscale_)*(X)*(lengthContract) );
				ctx.lineTo( ofs + (xscale_)*(10), ofs - (xscale_)*((10*V/C+(X)*(lengthContract))) );

				ctx.moveTo( ofs + (xscale_)*((X))*(lengthContract), ofs  - (xscale_)*(-0) );
				ctx.lineTo( ofs + (xscale_)*(10*V/C+(X)*(lengthContract)), ofs + (xscale_)*(-10 ) );
			}


			{
//				ctx.moveTo( ofs - (xscale_)*(0), ofs  - (xscale_)*(+X)*(gamma2) );
//				ctx.lineTo( ofs + (xscale_)*(-10), ofs + (xscale_)*((10*V/C-X*(gamma2))) );
//				ctx.moveTo( ofs + (xscale_)*((-X))*(gamma2), ofs  - (xscale_)*(-0) );
//				ctx.lineTo( ofs + (xscale_)*(-10*V/C-X*(gamma2)), ofs + (xscale_)*(10 ) );
			}

			ctx.stroke();
		}	
	}



	ctx.strokeWidth= 1.5;


		for( let X = -20*lengthContract; X < 20*lengthContract; X+=1*lengthContract ) {
			for( let T = 10; T > -10; T-=1 ) {

				{
					ctx.beginPath();
					ctx.strokeStyle= "blue";
					ctx.moveTo( ofs + (xscale_)*(X), ofs + (xscale_)*(T) );
					ctx.lineTo( ofs + (xscale_)*(X+1), ofs + (xscale_)*(T) );
					ctx.moveTo( ofs +  (xscale_)*(X), ofs + (xscale_)*(T) );
					ctx.lineTo( ofs + (xscale_)*(X), ofs + (xscale_)*(T-1) );
					ctx.stroke();
				}	

			if( showXTGraph) {
					ctx.beginPath();
					const ox  = D3xTransform.getObservedPlace2(X,T);
					const ot  = D3xTransform.getObservedTime(X,T);//+Math.abs(X);
					const oxt = D3xTransform.getObservedPlace2(X,T+1);
					const ott = D3xTransform.getObservedTime(X,T+1);//+Math.abs(X);

					const ox_  = ( (lengthContract*X) ); //D3xTransform.getObservedPlace(X,T);
					const ot_  = (T-(X)*V )*lengthContract; //D3xTransform.getObservedTime2(X,T);//+Math.abs(X);
					const oxo = ( lengthContract*(X+1));//D3xTransform.getObservedPlace(X+1,T);
					const oto =  (T-(X+1)*V) *lengthContract;//D3xTransform.getObservedTime2(X+1,T);//+(Math.abs(X)+(X>-1?1:-1));
					if( T === 0 ){
						ctx.lineWidth = 5;
						ctx.strokeStyle= "green";
					}
					else{
						ctx.lineWidth = 2;
						ctx.strokeStyle= "yellow";
					}
//					ctx.moveTo( ofs + (xscale_)*(ox), ofs - (xscale_)*(ot+Math.abs(X)) );
//					ctx.lineTo( ofs + (xscale_)*(oxo), ofs - (xscale_)*(oto + Math.abs(X)+(X>-1?1:-1)) );
					ctx.moveTo( ofs + (xscale_)*(ox_), ofs + (xscale_)*(ot_) );
					ctx.lineTo( ofs + (xscale_)*(oxo), ofs + (xscale_)*(oto ) );
					ctx.stroke();

					if( T === 0 ){
						ctx.lineWidth = 2;
					}
					ctx.beginPath();
					ctx.strokeStyle= "red";
					ctx.moveTo( ofs +  (xscale_)*(ox), ofs - (xscale_)*(ot) );
					ctx.lineTo( ofs + (xscale_)*(oxt), ofs - (xscale_)*(ott) );
					ctx.stroke();
					ctx.moveTo( ofs + (xscale_)*(ox)  - (0.1*xscale_)*(ott-ot)/2, ofs - (xscale_)*(ot) - (0.1*xscale_)*(oxt-ox)/2 );
					ctx.lineTo( ofs + (xscale_)*(ox) + (0.1*xscale_)*(oxt-ox)/2, ofs - (xscale_)*(ot) + (0.1*xscale_)*(ott-ot)/2 );
					ctx.stroke();

			}

			if( showXTGraph_unbiased) {
				ctx.beginPath();
				const ox  = D3xTransform.getObservedPlace2(X,T);
				const oxo = D3xTransform.getObservedPlace2(X+1,T);
				const oxt = D3xTransform.getObservedPlace2(X,T+1);
				const ot  = D3xTransform.getObservedTime(X,T);
				const oto = D3xTransform.getObservedTime(X+1,T);
				const ott = D3xTransform.getObservedTime(X,T+1);
				if( T === 0 ){
					ctx.lineWidth = 5;
					ctx.strokeStyle= "green";
				}
				else{
					ctx.lineWidth = 2;
					ctx.strokeStyle= "yellow";
				}
				//const ox_abb = aberration( {x:ox, y:ot, z:0 }, {x:V, y:0, z:0 }, {x:0, y:0, z:0} );
				//const ot_abb = aberration( {x:oxo, y:oto, z:0 }, {x:V, y:0, z:0 }, {x:0, y:0, z:0} );
				//const ott_abb = aberration( {x:oxt, y:ott, z:0 }, {x:V, y:0, z:0 }, {x:0, y:0, z:0} );
	

				ctx.moveTo( ofs + (xscale_)*(ox.x), ofs - (xscale_)*(ox.y) );
				ctx.lineTo( ofs + (xscale_)*(ot.x), ofs - (xscale_)*(ot.y) );
				ctx.stroke();

				if( T === 0 ){
					ctx.lineWidth = 2;
				}
				ctx.beginPath();
				ctx.strokeStyle= "red";
				ctx.moveTo( ofs +  (xscale_)*(ox.x), ofs - (xscale_)*(ox.y) );
				ctx.lineTo( ofs + (xscale_)*(ott.x), ofs - (xscale_)*(ott.y) );
				ctx.stroke();

		}

			ctx.lineWidth = 1;

		}


		}

}
}

//------------------ Create Controls ---------------------------

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

const sliderA_o = document.createElement( "input" );
sliderA_o.setAttribute( "type", "range" );
controls.appendChild( sliderA_o );
sliderA_o.addEventListener( "input", update );

sliderA_o.setAttribute( "max",200 );
sliderA_o.value = A_o*100;
sliderA_o.style.width="250px";

const spanA_o = document.createElement( "span" );
spanA_o.textContent = "1";
controls.appendChild( spanA_o );

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

//- - - - - - - - - - - - - - 

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = animate;
chkLblNow.addEventListener( "input", update );

const spanChkNow = document.createElement( "label" );
spanChkNow.textContent = " |Animate";
spanChkNow.appendChild( chkLblNow );
controls.appendChild( spanChkNow );
//- - - - - - - - - - - - - - 

const chkLblXTGraph = document.createElement( "input" );
chkLblXTGraph.setAttribute( "type", "checkbox" );
chkLblXTGraph.checked = true;
//controls.appendChild( chkLblXTGraph );
chkLblXTGraph.addEventListener( "input", update );

const spanChkXTGraph = document.createElement( "label" );
spanChkXTGraph.textContent = " |XT Graph";
spanChkXTGraph.appendChild( chkLblXTGraph );
controls.appendChild( spanChkXTGraph );
//----------------------

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------

span = document.createElement( "br" );
controls.appendChild( span );
//----------------------



update();

const body = [];


function ShotTime( T, V, P, V_o, P_o, c ) {
	c = c || C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for S and T.
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) 
	//                    *(C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) 
	//     + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const X = P.x-P_o.x;
	const Y = P.y-P_o.y;
	const Z = P.z-P_o.z;
	const VV = V_o.x*V_o.x+V_o.y*V_o.y+V_o.z*V_o.z;
	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const dsx = X+D*T;
	const esy = Y+E*T;
	const fsz = Z+F*T;
/*
	const pos = (P-P_o)+V*T;
	const a = pos * V_o;
	const tmp = (-C*C * T + sum(a) );
	const tmp2 = ( T*T * C*C - sum(pos*pos) );
*/	
	const tmp = (-c*c * T + J*dsx + K*esy + L*fsz );
	const tmp2 = ( T*T * c*c - dsx*dsx - esy*esy - fsz*fsz );

	const CV =  c*c - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	if( Math.abs(CV) < 0.000001 ) {
		const T_o =  tmp2/( 2*tmp )
		if( T_o < T ) return T_o;
		return -Math.Infinity;
	}

	return  (Math.sqrt(tmp*tmp - CV*tmp2) - tmp ) / CV;
}

function ObservedTime( T, V, P, V_o, P_o, c ) {
	c = c || C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for S and T.
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) 
	//                    *(C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) 
	//     + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const X = P.x-P_o.x;
	const Y = P.y-P_o.y;
	const Z = P.z-P_o.z;
	const VV = V_o.x*V_o.x+V_o.y*V_o.y+V_o.z*V_o.z;
	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const dsx = X+D*T;
	const esy = Y+E*T;
	const fsz = Z+F*T;
/*
	const pos = (P-P_o)+V*T;
	const a = pos * V_o;
	const tmp = (-C*C * T + sum(a) );
	const tmp2 = ( T*T * C*C - sum(pos*pos) );
*/	
	const tmp = (-c*c * T + J*dsx + K*esy + L*fsz );
	const tmp2 = ( T*T * c*c - dsx*dsx - esy*esy - fsz*fsz );

	const CV =  c*c - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	if( Math.abs(CV) < 0.000001 ) {
		const T_o =  tmp2/( 2*tmp )
		if( T_o < T ) return T_o;
		return -Math.Infinity;
	}

	return  (Math.sqrt(tmp*tmp - CV*tmp2) - tmp ) / CV;
}

function RealTime( T_o, V, P, V_o, P_o ) {
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for T.
	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 
	//                       - 4 (C^2 - D^2 - E^2 - F^2) 
	//                          * (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) 
	//            + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$
	const X_ = P.x-P_o.x;
	const Y_ = P.y-P_o.y;
	const Z_ = P.z-P_o.z;
	let VV = V.x*V.x+V.y*V.y+V.z*V.z;

	const VLen = (VV>0)?Math.sqrt(VV):1;
	const dot = VLen===0?1:(X_*V.x + Y_*V.y + Z_*V.z)/VLen;
	const X = X_ - V.x*dot/VLen * (1-lengthContract)
	const Y = Y_ - V.y*dot/VLen * (1-lengthContract)
	const Z = Z_ - V.z*dot/VLen * (1-lengthContract)


	const S = T_o;

	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const jsx = X-J*S;
	const ksy = Y-K*S;
	const lsz = Z-L*S;


	const tmp = ( C*C * S + D*jsx + E*ksy + F*lsz );
	const tmp2 = ( S*S * C*C - jsx*jsx - ksy*ksy - lsz*lsz );
	const CV = C*C - VV;
	if( Math.abs(CV) < 0.000001 ) {
		// D*D+E*E+F*F = C
		// solve (S-T)^2 = ( ( (X+D*T-J*S)^2+(Y+E*T - K*S)^2+(Z + F*T - L* S)^2) )/(D*D+E*E+F*F) for T
		// T = ((J^2 S^2)/(D^2 + F^2 + e^2) - (2 J S X)/(D^2 + F^2 + e^2) + (K^2 S^2)/(D^2 + F^2 + e^2) - (2 K S Y)/(D^2 + F^2 + e^2) + (L^2 S^2)/(D^2 + F^2 + e^2) - (2 L S Z)/(D^2 + F^2 + e^2) + X^2/(D^2 + F^2 + e^2) + Y^2/(D^2 + F^2 + e^2) + Z^2/(D^2 + F^2 + e^2) - S^2)
		//        /((2 D J S)/(D^2 + F^2 + e^2) + (2 e K S)/(D^2 + F^2 + e^2) + (2 F L S)/(D^2 + F^2 + e^2) - (2 D X)/(D^2 + F^2 + e^2) - (2 e Y)/(D^2 + F^2 + e^2) - (2 F Z)/(D^2 + F^2 + e^2) - 2 S)
		// T = ((J^2 S^2)/C - (2 J S X)/C + (K^2 S^2)/C - (2 K S Y)/C + (L^2 S^2)/C - (2 L S Z)/C + X^2/C + Y^2/C + Z^2/C - S^2)
		//        /((2 D J S)/C + (2 e K S)/C + (2 F L S)/C - (2 D X)/C - (2 e Y)/C - (2 F Z)/C - 2 S)
		// T = ((J^2 S^2) - (2 J S X) + (K^2 S^2) - (2 K S Y) + (L^2 S^2) - (2 L S Z) + X^2 + Y^2 + Z^2 - S^2*C)
		//        /((2)*( (D J S) + (e K S) + (F L S) - (D X) - (e Y) - (F Z) - S C))

		const T =  ( tmp2 ) / ( 2*( tmp ) )
		if( T < T_o ) return [T];
		return -Math.Infinity;
	}
	
	const delT = Math.sqrt(tmp*tmp - CV * tmp2	);
	const T = (-delT + tmp )/CV;
	if( T > T_o ) {

		const T2 = (+delT + tmp )/CV;
		if( T2 < T_o ) return [T2];
		return [];
	}
	const T2 = (+Math.sqrt(tmp*tmp - CV * tmp2	) + tmp )/CV;
	return (T2<T_o)?[T,T2]:[T];
}

function observedTimeToRealTimeXYZ2( T_o, V, X, Y, Z, V_o, X_o, Y_o, Z_o, ca, sa, ca_o, sa_o ){ 
	return RealTime( T_o, { x: V*ca, y: V*sa, z: 0 }, { x:X, y:Y, z:Z }, { x:ca_o*V_o, y:sa_o*V_o, z: 0 }, { x:X_o, y:Y_o, z:Z_o } );
}




function timeBiasAtPos( V, X, Y, Z ) {
	//b(x,y)=-sqrt((x If(x<0, ((C+V)/(C-V)), ((C-V)/(C+V))))^(2)+(y ((sqrt(C C+V V))/(C)))^(2)+(Z ((sqrt(C C+V V))/(C)))^(2))
	const div1 = ( C+V ) / (C-V)
	const div2 = ( C-V ) / (C+V)
	const div3 = Math.sqrt( C*C+V*V ) / (C)

	const xx = (X<0?( Math.abs(X) * div1):(Math.abs(X)*div2));
	const yy = Math.abs(Y)*div3;
	const zz = Math.abs(Z)*div3;
	const b = -Math.sqrt( xx*xx + yy*yy + zz*zz );
	return b;

}

function update( evt ) {


	C = Number(sliderC.value)/100;
	spanC.textContent = C.toFixed(2);
	V = Number(sliderV.value)/1000*C;

	lengthContract = Math.sqrt(C*C-V*V)/(C*C);

	spanV.textContent = V.toFixed(3);
	L = 1;

	A = Number(sliderA.value)/100*Math.PI;
	sa = -Math.sin(A);
	ca = Math.cos(A);
	spanA.textContent = (A/Math.PI).toFixed(3) + "π";

	
	A_o = Number(sliderA_o.value)/100*Math.PI;
	sa_o = -Math.sin(A_o);
	ca_o = Math.cos(A_o);
	spanA_o.textContent = (A_o/Math.PI).toFixed(3) + "π";

	D2 = (Number(sliderD.value)/50-1)*L;
	D =10* (Number(sliderD.value)/50-1);
	spanD.textContent = D.toFixed(3) + " T(world s):" + (-2*(C*D+L*V)/(C*C-V*V)).toFixed(2)  + " T(obs s):"+ ((-2*(C*D+L*V)/(C*C-V*V))/Math.sqrt(1-V/C)).toFixed(2) /*+ " O(m-m/s):"+ (-2*(C*D2+L*V)).toFixed(2)*/;
	E = Number(sliderE.value)/10 - Math.sqrt( D*D + L*L )/C * V;
	spanE.textContent = E.toFixed(1);
	S = 1;

	showXTGraph = chkLblXTGraph.checked;
//	showXTGraph_unbiased = chkLblXTGraph.checked;
	showRelativeVelocities = false;
	includeAberration = true;

	const didAnimate = animate;
	animate = chkLblNow.checked;
	runT = Number(sliderRunT.value)/5;
	spanRunT.textContent = runT.toFixed(2);

	if( animate ) {
	}else
		now = (Number(sliderNow.value)/100*runT/2);
	spanNow.textContent = "T(world s):" +  (now).toFixed(2)  + " T(obs s):" + (now/Math.sqrt(1-V/C)).toFixed(2) /*+ " T(obs m-m/s):" + (now*(C*C-V*V)).toFixed(2)*/;

	spanC.textContent = C.toFixed(2)+ " scalar: "+ ((C*C-V*V)/(C*C)).toFixed(3) ;

	const framedel = (runT/30)/nFrames;
	for( let n = 0; n < nFrames; n++ ) {
		const frame = eventFrames[n];
		const del = n/nFrames;
		const Treal = ((del * runT)-runT/2);

		frame.T_start = Treal;
		frame.PobsrX = ca_o * V * Treal;
		frame.PobsrY = sa_o * V * Treal;
		frame.PobsdX = ca * V * Treal;
		frame.PobsdY = sa * V * Treal-D;
		frame.dX = (frame.PobsdX - frame.PobsrX); // distance, non directed
		frame.dY = (frame.PobsdY - frame.PobsrY); // distance, non directed
		frame.distX = Math.abs(frame.PobsdX - frame.PobsrX); // distance, non directed
		frame.distY = Math.abs(frame.PobsdY - frame.PobsrY); // distance, non directed

		if( n ) {
			const frame0 = eventFrames[n-1];
			const distlen = Math.sqrt( frame.distX*frame.distX+frame.distY*frame.distY);
			const zx = Math.sqrt((frame.distX)*(frame.distX) + (frame.distY)*(frame.distY));
			const z0 = Math.sqrt((frame0.distX)*(frame0.distX) + (frame0.distY)*(frame0.distY));

			const dx = (frame.distX)-(frame0.distX);
			const dy = (frame.distY)-(frame0.distY);
			const dpos = zx-z0;//Math.sqrt(dx*dx+dy*dy);
			frame.relativeVelocity.x = 0.1+(frame.PobsdX - frame.PobsrX)
			frame.relativeVelocity.y =  0.1+(frame.PobsdY - frame.PobsrY );
			frame.relativeVelocityTo.x = frame.relativeVelocity.x + (dpos*frame.dX/distlen)*0.25/framedel;
			frame.relativeVelocityTo.y = frame.relativeVelocity.y + (dpos*frame.dY/distlen)*0.25/framedel;
		}
	
	
	}


	if( !animate ) {
		draw(  );
	} else if( !didAnimate ) draw();

}



function draw(  ) {
	
	if( animate ) {
		now = ( ( (Date.now() * S) %(runT*1000) ) / 1000) - runT/2;
		sliderNow.value =100*now*2/runT
		spanNow.textContent = now.toFixed(2);
	}
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
    D3xTransform.drawCoords( now );



	last_draw_time = now;

	if( animate )
	requestAnimationFrame( draw );

	return;

}

		draw();

