
//import {lnQuat} from "../3d/src/lnQuatSq.js"

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
//canvas.width = 5000;
//canvas.height = 5000;
const ctx = canvas.getContext( '2d' );

let doLog = false;

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
let myV=0.6184; // velocity  (m/s)
let S=1.0; // time scalar (s/s)
let runT = 20;
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
	Po = 0; // position observer
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
}

for( let n = 0; n < nFrames; n++ ) {
	frames.push( new Frame() );
}



//const d3xTransform = new D3xTransform();
class D3xTransform {
	// converts a long time to a short time.
	
	static get gamma() { return  (C*C-V*V)/C*C };
 	static getObservedTime(X,T,myV) {
		//const willSee = realTimeToObservedTime( T, L );
		const dist = Math.sqrt( (X)*(X) + (D*D) )/C;
const v = V-myV;
		return  (T-dist)*(1/(C*C-v*v));// (  (1/(C*C-V*V)) * T/C-dist)*D3xTransform.gamma/C;
	}
 	static getObservedPlace(X,T,V,myV) {
		return observerTimeToRealPos( T, D, X, V, myV )
		const willSee = realTimeToObservedTime( (1/(C*C-myV*myV))*T, X );
		const willSeeAt =  (X/C + willSee*V/C);
		return willSeeAt ;
	}
 	static getObservedPlace2(X,T) {
		const willSee = realTimeToObservedTime( T, X );
		const willSeeAt = X+willSee*V/C;
		return willSeeAt ;
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
		const xscale_ = xscale/4;
		const ofs = 300;//xscale_ * 13;

// velocity ratio line.
/*
		ctx.beginPath();
		ctx.strokeStyle= "white";
		ctx.moveTo( ofs , ofs  );
		ctx.lineTo( ofs + (xscale_)*(10), ofs + (xscale_)*(-10*(V/C) ) );
		ctx.stroke();
*/
   if(0) { // show velocity vector...
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.strokeStyle= "red";
		ctx.moveTo( ofs , ofs  );
		ctx.lineTo( ofs + 10*(xscale_)*(V/(C*C-V*V)), ofs - 10*xscale_ );
		ctx.stroke();

		ctx.lineWidth = 2;
	}

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

if(0)
		{
				ctx.beginPath();
				ctx.lineWidth = 5;
				ctx.strokeStyle= "green";

				//timeBiasAtPos( X, D, 0 )
				const ot  = D3xTransform.getObservedTime(-runT,now, myV);
				const oto = D3xTransform.getObservedTime(0,now, myV);
				const oto2 = D3xTransform.getObservedTime(runT,now, myV);

				const ox  = D3xTransform.getObservedPlace(-runT,0,0,myV);
				const oxo = D3xTransform.getObservedPlace(0,0,0,myV);
				const oxo2 = D3xTransform.getObservedPlace(runT,0,0,myV);
				
				ctx.moveTo( ofs + (xscale_)*(-runT), ofs - (xscale_)*(-now) );
				ctx.lineTo( ofs + (xscale_)*(runT), ofs - (xscale_)*(-now) );

				ctx.moveTo( ofs + (xscale_)*(ox), ofs + (xscale_)*(ot) );
				ctx.lineTo( ofs + (xscale_)*(oxo), ofs + (xscale_)*(oto) );
				ctx.lineTo( ofs + (xscale_)*(oxo2), ofs + (xscale_)*(oto2) );
				ctx.stroke()

			ctx.beginPath();
			ctx.fillStyle =  `hsl(${120*(now%3)-240},100%,50%`
			ctx.fillRect( ofs+(now*V-L)*xscale_, ofs+(now)*xscale_, (2*L)*xscale_, 10 );

			headTri(  + L, 20, true );
			tailTri(  - L, 20, true );
			centerBox( 0, 20, true );

		}		



	
		for(let f = 0; f < nFrames; f++ ){
			const frame = frames[f];
			const T = frame.T_start;
if( T > atNow ) break;
			ctx.beginPath();
			
			let front  = observerTimeToRealPos( T, D, L, 0, myV );
			let center = observerTimeToRealPos( T, D, 0, 0, myV );
			let back   = observerTimeToRealPos( T, D, -L, 0, myV );
			if( front.length ) front = front[0];
			if( center.length ) center = center[0];
			if( back.length ) back = back[0];
			
	
			const Tc=D3xTransform.getObservedTime(frame.Pc,T, 0)
			const Th=D3xTransform.getObservedTime(frame.Ph,T, 0)
			const Tt=D3xTransform.getObservedTime(frame.Pt,T, 0)

			if(0)
		if( Tc >= -runT && Tc <= runT && frame.T_see_c > -runT)  {
			var grd = ctx.createLinearGradient(ofs+(back)*xscale_ , 0
							, ofs+(front)*xscale_, 0);
			grd.addColorStop(0, `hsl(${Math.floor((1+Tt%3)*120)},100%,50%` );
			grd.addColorStop(0.5, `hsl(${Math.floor((1+Tc%3)*120)},100%,50%` );
			grd.addColorStop(1, `hsl(${Math.floor((1+Th%3)*120)},100%,50%` );
			ctx.strokeStyle= grd;

			//ctx.moveTo( ofs + back*xscale_, ofs + Tt*xscale_ );
			//ctx.lineTo( ofs + center*xscale_, ofs + Tc*xscale_ );
			//ctx.lineTo( ofs + front*xscale_, ofs + Th*xscale_ );
			
			ctx.moveTo( ofs + back*xscale_, ofs + Tt*xscale_ );
			ctx.lineTo( ofs + center*xscale_, ofs + Tc*xscale_ );
			ctx.lineTo( ofs + front*xscale_, ofs + Th*xscale_ );
			
			ctx.stroke();
		}
			if(0) {
				// draw ship in real space...
				ctx.beginPath();
				ctx.strokeStyle =  `hsl(${frame.hue},100%,50%`
 				const T1 = timeBiasAtPos( V, frame.Pt, D, 0 )
 				const T2 = timeBiasAtPos( V, frame.Ph, D, 0 )
				ctx.moveTo( ofs + (frame.Pt+ T1*V)*xscale_, ofs + (T)*xscale_ );
				ctx.lineTo( ofs + (frame.Ph + T2*V ) *xscale_, ofs + (T)*xscale_ );

				ctx.stroke();
			}
		}

		for( let X = -10; X < 40; X+=1 ) {
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

				{
					let tail  = observedTimeToRealTimeXYZ2( now, V, -L+V*now, 0-D, 0, myV, now*myV*ca_o, now*myV*sa_o, 0 );
					let head  = observedTimeToRealTimeXYZ2( now, V, +L+V*now, 0-D, 0, myV, now*myV*ca_o, now*myV*sa_o, 0 );
					const hdx =  head * (V) * ca +L - now*myV*ca_o;
					const hdy =  head * (V) * sa -D  - now*myV*sa_o;
					const tx =  tail * (V) * ca - L - now*myV*ca_o;
					const ty =  tail * (V) * sa -D - now*myV*sa_o;

					let here  = observedTimeToRealTimeXYZ2( now, V, +V*now*ca + X, T+V*now*sa-D, 0, myV, now*myV*ca_o, now*myV*sa_o, 0 );
					const hx =  here * (V) * ca + X - now*myV*ca_o;
					const hy =  here * (V) * sa + T-D - now*myV*sa_o;
					let right = observedTimeToRealTimeXYZ2( now, V, +V*now*ca + X+1, T+V*now*sa-D, 0, myV, now*myV*ca_o, now*myV*sa_o, 0 );
					const rx =  right * (V) * ca + (X+1) - now*myV*ca_o;
					const ry =  right * (V) * sa + T-D - now*myV*sa_o;
					let next   = observedTimeToRealTimeXYZ2( now, V, +V*now*ca + X, T+V*now*sa+1-D, 0, myV, now*myV*ca_o, now*myV*sa_o, 0 );
					const nx =  next * (V) * ca + X - now*myV*ca_o;
					const ny =  next * (V) * sa + (T+1)-D - now*myV*sa_o;

					ctx.beginPath();
					ctx.strokeStyle= "red";
					//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
					ctx.moveTo( ofs + (xscale_)*(hx), ofs + (xscale_)*(hy) );
					ctx.lineTo( ofs + (xscale_)*(rx), ofs + (xscale_)*(ry) );
					//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
					ctx.moveTo( ofs +  (xscale_)*(hx), ofs + (xscale_)*(hy) );
					ctx.lineTo( ofs + (xscale_)*(nx), ofs + (xscale_)*(ny) );
					ctx.stroke();

					ctx.beginPath();
					ctx.strokeStyle= "yellow";
					ctx.strokeWidth= 5;
					//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
					ctx.moveTo( ofs + (xscale_)*(hdx), ofs + (xscale_)*(hdy) );
					ctx.lineTo( ofs + (xscale_)*(tx), ofs + (xscale_)*(ty) );
					ctx.stroke();
					
				}

				if(0) 
				{
					// this is attempt 1 - using just what I see, and what the spece would be
					// when seen that long ago...  (mostly fits thought experiment, other than AT speed of light)
					const bias = timeBiasAtPos( myV, X, T, D );
					const bias2 = timeBiasAtPos( myV, X+1, T, D );
					const bias3 = timeBiasAtPos( myV, X, T-1, D );

					
					const xAtBias = X+V*bias;
					const xAtBias2 = X+1+V*bias2;
					const xAtBias3 = X+V*bias3;
					const yAtBias = 0;

					ctx.beginPath();
					ctx.strokeStyle= "red";
					ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
					ctx.moveTo( ofs + (xscale_)*(xAtBias), ofs + (xscale_)*(T) );
					ctx.lineTo( ofs + (xscale_)*(xAtBias2), ofs + (xscale_)*(T) );
					//ctx.strokeStyle= `hsl(${Math.floor((1+(bias+bias2+bias3)/3%3)*120)},100%,50%`;
					ctx.moveTo( ofs +  (xscale_)*(xAtBias), ofs + (xscale_)*(T) );
					ctx.lineTo( ofs + (xscale_)*(xAtBias3), ofs + (xscale_)*(T-1) );
					ctx.stroke();
				}

				if(0) // this is the transform my the observer moving...
				{
					const see = D3xTransform.GetSeenSpace(C,T,X,myV,0,D);
					const seex = D3xTransform.GetSeenSpace(C,T,X+1,myV,0,D);
					const seet = D3xTransform.GetSeenSpace(C,T+1,X,myV,0,D);

					ctx.beginPath();
					
					if( T === 0 ){
						ctx.lineWidth = 5;
						ctx.strokeStyle= "green";
					}
					else{
						ctx.strokeStyle= "yellow";
					}
					ctx.moveTo( ofs + (xscale_)*(see.see_pos), ofs - (xscale_)*(see.seen) );
					ctx.lineTo( ofs + (xscale_)*(seex.see_pos), ofs - (xscale_)*(seex.seen) );
					ctx.stroke();
			
					if( T === 0 ){
						ctx.lineWidth = 2;
					}
					ctx.beginPath();
					ctx.strokeStyle= "red";
					ctx.moveTo( ofs +  (xscale_)*(see.see_pos), ofs - (xscale_)*(see.seen) );
					ctx.lineTo( ofs + (xscale_)*(seet.see_pos), ofs - (xscale_)*(seet.seen) );
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

			if( false ) { // draw what happens to me relative to a stationary world. (show real velocity)
				ctx.beginPath();
				const ox  = D3xTransform.getObservedPlace(X,T,0);
				const oxo = D3xTransform.getObservedPlace(X+1,T,0);
				const oxt = D3xTransform.getObservedPlace(X,T-1,0);
				const ot  = D3xTransform.getObservedTime(X,T, 0);
				const oto = D3xTransform.getObservedTime(X+1,T, 0);
				const ott = D3xTransform.getObservedTime(X,T-1, 0);
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

const sliderMyV = document.createElement( "input" );
sliderMyV.setAttribute( "type", "range" );
controls.appendChild( sliderMyV );
sliderMyV.addEventListener( "input", update );

sliderMyV.setAttribute( "max", 1000 );
sliderMyV.value = myV*1000;
sliderMyV.style.width="250px";

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



function realTimeToObservedTime( T, L ) {
	const meNow = myV*T;
	const themNow = V*T + L;
	let A = 0;
	let A2 = 0;
	let hadA = false;
	let B = 0;
	if( meNow > themNow ) 
	{
		// (C-V)

		const tmp = (-2 * L - 2 * T * V + 2 * T * myV);
		A = (-Math.sqrt((4 * (2 * myV - C) * ((-D*D * myV*myV)/(C*C) 
								+ (2 * D*D * myV)/C - D*D 
								- L*L - 2 * L * T * V + 2 * L * T * myV - T*T * V*V - T*T * myV*myV + 2 * T*T * V * myV)
								)/C + (myV*myV * (tmp*tmp))/(C*C)) - (myV * (tmp))/C
			 )/(2 * (2 * myV - C))

		return A+T;
 		hadA = true;
	}
	if( hadA ) {
		const meAtA = myV*(T+A);
		const themAtA = V * (T+A) + L;if(0)
		if( meAtA < themAtA ) {
			// A is only valid up to the time it passed... so now I have to run a different
			// calculation to find when it passed and start from there.
			const B = (L-T*myV+T*V) / (myV - V);
			T += B;
			A = 0;
		}
	//	else 
	}

		// (C+V)
		const tmp = (2 * L + 2 * T * V - 2 * T * myV);
		A2 = (Math.sqrt((4 * (C + 2 * myV) * ((D*D * myV*myV)/(C*C) 
								+ (2 * D*D * myV)/C + D*D 
								+ L*L + 2 * L * T * V - 2 * L * T * myV + T*T * V*V + T*T * myV*myV - 2 * T*T * V * myV)
								)/C + (myV*myV * (tmp*tmp))/(C*C)) - (myV * (tmp))/C
			 )/(2 * (C + 2 * myV))
	return A2+T;
		{
			const meAtC = myV*(T+A2);
			const themAtC = V * (T+A2) + L;
			if( meAtC > themAtC ) {
				//console.log( "Observer passed observed..." );
			}
		}
	/*
	const meWillBe = myV*T + myV*To;
	const themWillBe = V*T+L + V * To;
	Math.sqrt((meWillBe-themWillBe)^2+DD)/C 

	// solve sqrt( ((( (V_1 T) + (V_1 A) )   // my position from now until sometime... myV*T + myV*A
						- ( V_0 T+L))/(C+V) // body position from now until sometime... V*T+L + V0*A
						)^2  + D*D ) = CA for A

	// solve sqrt( ((( (V_1 T) + (V_1 A) ) - ( V_0 T+L))/(C+V) )^2  + D*D ) = CA for A


	// solve sqrt( ((( (V_1 T) + (V_1 A) )   // my position from now until sometime... myV*T + myV*A
						- (( V_0 T+L)+(V_0 A)))/(C+V) // body position from now until sometime... V*T+L + V0*A
						)^2  + D*D ) = CA for A

	// solve sqrt( ((( (V_1 T) + (V_1 A) )  - (( V_0 T+L)+(V_0 A)))/(C+V)  )^2  + D*D ) = CA for A

	//A = (sqrt(C^2 D^2 + C^2 L^2 + 2 C^2 L T V_0 - 2 C^2 L T V_1 + C^2 T^2 V_0^2 + C^2 T^2 V_1^2 
	//		  - 2 C^2 T^2 V_0 V_1 - D^2 V_0^2 - D^2 V_1^2 + 2 D^2 V_0 V_1) 
	//     + L V_0 - L V_1 + T V_0^2 - 2 T V_1 V_0 + T V_1^2)
	//           /(C^2 - V_0^2 - V_1^2 + 2 V_0 V_1)
	//


	//A = (sqrt((2 L V_1 - 2 L V_0 - 2 T V_1^2 + 4 T V_0 V_1 - 2 T V_0^2)^2 
		- 4 (C^4 + 2 C^3 V + C^2 V^2 - V_1^2 - V_0^2 + 2 V_1 V_0) (-C^2 D^2 - 2 C D^2 V 
			- D^2 V^2 - L^2 + 2 L T V_1 - 2 L T V_0 - T^2 V_1^2 - T^2 V_0^2 + 2 T^2 V_1 V_0)) 
			- 2 L V_1 + 2 L V_0 + 2 T V_1^2 - 4 T V_0 V_1 + 2 T V_0^2)
			/(2 (C^4 + 2 C^3 V + C^2 V^2 - V_1^2 - V_0^2 + 2 V_1 V_0))


	//A = (sqrt((2 L V_1 - 2 L V_0 - 2 T V_1^2 + 4 T V_0 V_1 - 2 T V_0^2)^2 
		- 4 (C^4 - 2 C^3 V + C^2 V^2 - V_1^2 - V_0^2 + 2 V_1 V_0) (-C^2 D^2 + 2 C D^2 V 
			- D^2 V^2 - L^2 + 2 L T V_1 - 2 L T V_0 - T^2 V_1^2 - T^2 V_0^2 + 2 T^2 V_1 V_0)) 
			- 2 L V_1 + 2 L V_0 + 2 T V_1^2 - 4 T V_0 V_1 + 2 T V_0^2)
			/(2 (C^4 - 2 C^3 V + C^2 V^2 - V_1^2 - V_0^2 + 2 V_1 V_0))


		( (V_1 T) + (V_1 T_o) ) - ( V_0 T)+(V_0 T_o) ) + DD ) = 0;

		T_o = - ( DD - TV0+TV1 ) / (V0+V1)
	*/
	//const distance = (-Math.sqrt( ( V-myV )*(V-myV)-4*C*C*(-D*D+T*V-T*myV) ) - V + myV)/(2*C*C);

	const distance = (Math.sqrt( C*C*D*D + C*C*L*L + 2*C*C*L*T*V - 2*C*C*L*T*myV + C*C*T*T*V*V + C*C*T*T*myV*myV 
				- 2*C*C*T*T*V*myV  - D*D*V*V - D*D*myV*myV + 2*D*D*V*myV) 
					+ L*V - L*myV + T*V*V - 2*T*V*myV + T*myV*myV ) 
						/ (C*C - V*V - myV*myV + 2*V*myV);
	return distance+T;

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

function realTimeToObservedTimeSpin( T, P, Lx, Ly, Lz, Ax, Ay, Az ) {

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
function realTimeToObservedTimeSpin( T, Lx, Ly, Lz, Ax, Ay, Az ) {


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

function observedTimeToRealTimeWithSpin( T, P, Lx, Ly, Lz, Ax, Ay, Az  ) {

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


function observedTimeToRealTimeXYZ2( T_o, V, X, Y, Z, V_o, X_o, Y_o, Z_o ){ 
	//solve B = ( sqrt((Z-F)^2+( (Y-G) + -sin(A)VT +sin(E)*J*B)^2+(cos(A)VT+(X-H)-cos(E)*J*B)^2))/C+T  for T
	//solve B = (sqrt((Z)^2+( (Y) + sin(A)*V*T -sin(E)*J*B)^2+((X)+cos(A)*V*T-cos(E)*J*B)^2))/C+T   for T

	//T = (sqrt((2 B J V sin(A) sin(E) + 2 B J V cos(A) cos(E) - 2 V X cos(A) - 2 V Y sin(A) - 2 B C^2)^2 - 4 (-V^2 sin^2(A) - V^2 cos^2(A) + C^2) (B^2 C^2 - B^2 J^2 sin^2(E) - B^2 J^2 cos^2(E) + 2 B J X cos(E) + 2 B J Y sin(E) - X^2 - Y^2 - Z^2)) - 2 B J V sin(A) sin(E) - 2 B J V cos(A) cos(E) + 2 V X cos(A) + 2 V Y sin(A) + 2 B C^2)/(2 (-V^2 sin^2(A) - V^2 cos^2(A) + C^2))
	const xd = X-X_o;
	const yd = Y-Y_o;
	const zd = Z-Z_o;

	if( V === C ) {
		//T = (sqrt(-2 B^2 C J cos(A - E) + B^2 J^2 cos^2(A - E) + 2 B C X cos(A) + 2 B C Y sin(A) - 2 B J X cos(A) cos(A - E) - 2 B J Y sin(A) cos(A - E) + X^2 cos^2(A) + 2 X Y sin(A) cos(A) + Y^2 sin^2(A) + B^2 C^2)/C + (B J sin(A) sin(E))/C + (B J cos(A) cos(E))/C - (X cos(A))/C - (Y sin(A))/C - B)/(sin^2(A) + cos^2(A) - 1)
		/*
		T = (sqrt(-2 B^2 C J cos(A - E) 
					+ B^2 J^2 cos^2(A - E) 
					+ 2 B C X cos(A) 
					+ 2 B C Y sin(A) 
					- 2 B J X cos(A) cos(A - E) 
					- 2 B J Y sin(A) cos(A - E) 
					+ X^2 cos^2(A) + 2 X Y sin(A) cos(A) 
					+ Y^2 sin^2(A) + B^2 C^2)/C 
				+ (B J sin(A) sin(E))/C 
				+ (B J cos(A) cos(E))/C 
				- (X cos(A))/C 
				- (Y sin(A))/C 
				- B)/(1 - 1)
		*/
	}

	{
		const tmp = (
			T_o * V_o * V * ( sa * sa_o + ca * ca_o )
			- V * xd * ca 
			- V * yd * sa 
			- T_o * C*C);
		const T = (-Math.sqrt( tmp*tmp 
				- (C*C-V*V) 
					* (   T_o*T_o * C*C
						- T_o*T_o * V_o*V_o 
						+ 2 * T_o * V_o * xd * ca_o 
						+ 2 * T_o * V_o * yd * sa_o 
						- xd*xd - yd*yd
						- zd*zd
					)) 
			- T_o * V_o * V * sa * sa_o 
			- T_o * V_o * V * ca * ca_o 
			+ V * xd * ca 
			+ V * yd * sa 
			+ T_o * C*C)
			/ ( C*C-V*V)
		return T;
	}
}

function observedTimeToRealTimeXYZ( T_o, V, X, Y, Z ){
	// T_o = ( sqrt(Z^2+( Y + -sin(A)VT)^2+(cos(A)VT+X)^2))/C+T
	const answer = [];
	{
		const tmp = -(V * X * ca
			+ V * Y * sa 
			+ T_o * C*C);
		const A = (-Math.sqrt(tmp*tmp 
				- (C*C-V*V ) * (T_o*T_o * C*C - X*X - Y*Y - Z*Z)) 
				+ V * X * ca
				+ V * Y * sa
				+ T_o * C*C)
			/(C*C - V*V );

		answer.push(A);
	}
	{
		const tmp = -(V * X * ca
			+ V * Y * sa
			+ T_o * C^2)
		const A = (Math.sqrt(tmp*tmp 
			- (C*C-V*V)*(T_o*T_o * C*C - X*X - Y*Y - Z*Z)) 
			+ V * X * ca
			+ V * Y * sa
			+ T_o * C*C)
			/(C*C - V*V);
		answer.push(A);
	}
	return answer;
}

function observedTimeToRealTime( T, L ) {
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
	if( doLog ) console.log( "B was", b)
	return r;

}

function observerTimeToRealPos( T, D, L, V, myV ) {
//	if( myV === undefined ) myV = V*V; else myV = myV*myV;
	// things have to be able to propagate forwardly.
	if( C <= 0 ) return [0,0];
	
	if( C==V ) {
		const a = (C*C*T*T - D*D - L*L ) / (2*C*(C * T + L));
		if( a < T ) return [a*V+L];
		return [];
	}

	const v = V-myV;
	const r = [];
	// positive solution walks backwards...
	const a =  (C*C*T + L*v - Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*v*T + v*v*(C*C*T*T- D*D)))/(C*C - v*v) * (C*C-v*v);
	doLog && console.log( "A was", T, L, a)
	//if( L > T*v ) if( Math.abs(a) < T ) r.push(a*v+L);
	if( a < T ) r.push(a*v+L);
	const b = (C*C*T + L*v + Math.sqrt(C*C*D*D + C*C*L*L + 2*C*C*L*v*T + v*v*(C*C*T*T- D*D)))/(C*C - v*v) * (C*C-v*v);
	//if( L > T*v ) if( Math.abs(b) < T ) r.push(b*v+L);
	if( b < T ) r.push(b*v+L); 
	doLog && console.log( "B was", T, L, b)
	return r;

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
	myV = Number(sliderMyV.value)/1000*C;
	spanV.textContent = V.toFixed(3) + " : " + V*C*C/(C*C-V*V) + " : " + myV;
	L = Number(sliderL.value)/10;
	spanL.textContent = L.toFixed(1);

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

	spanC.textContent = C.toFixed(2)+ " scalar: "+ ((C*C-V*V)/(C*C)).toFixed(3) ;
	doLog = true;

	for( let n = 0; n < nFrames; n++ ) {
		const del = n/nFrames;
		const now = (del * runT)-runT/2;
		const Treal = (del * runT)-runT/2;
		const frame = frames[n];
		frame.hue =120*(now%3)-240;
		frame.T_start = now;

			frame.Po = now*myV;
			frame.Pc = now*V 
			frame.Ph = frame.Pc+L;
			frame.Pt = frame.Pc-L;
			frame.T_see_h = realTimeToObservedTime( now, L );
			frame.T_see_c = realTimeToObservedTime( now, 0 );
			frame.T_see_t = realTimeToObservedTime( now, -L );

			frame.P_see_h = frame.T_see_h * myV;
			frame.P_see_c = frame.T_see_c * myV;
			frame.P_see_t = frame.T_see_t * myV;

	}

	doLog = false;
	//draw(  );
}


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



let last_draw_time = 0;
const xscale = 100;
const yscale = 100;
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
    D3xTransform.drawCoords( now );
	curFrame = nFrames;  // draw all frames
	let drawP = null, drawT = null, drawH = null;
	let drawP2 = null,drawT2 = null,drawH2 = null;
	const toY = D*yscale+photonStart;
	for( let f = 0; f < curFrame; f++ ) {
		const frame = frames[f];

		if(0)
		if( frame.T_start < now ) {
			// stationary observer, moving train
			ctx.strokeStyle =  `hsl(${frame.hue},${100*(frame.T_start>now?0.5:1)}%,50%`
			ctx.beginPath();
			ctx.moveTo( 500 + frame.Pc*xscale, photonStart );
			ctx.lineTo( 500 + frame.P_see_c*xscale, toY );
			//ctx.moveTo( 500 + frame.Pt*xscale, photonStart );
			//ctx.lineTo( 500 + frame.P_see_t*xscale, toY );
			//ctx.moveTo( 500 + frame.Ph*xscale, photonStart );
			//ctx.lineTo( 500 + frame.P_see_h*xscale, toY );
			ctx.stroke();
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
*/
		const ofs = 500;

if(0) {		
		if( frame.T_start <now && frame.T_see_c>now) {
			const del = frame.T_see_c - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			
			centerBoxXY( (ofs+frame.Pc*xscale)*(1-delT) + (ofs+frame.P_see_c*xscale)*(delT), photonStart*(1-delT)+toY*(delT), false );
			if( frame.event ) {
				eventMark( (frame.Pc)*(1-delT), photonStart*(1-delT)+toY*(delT), true );
			}
			ctx.beginPath();
			ctx.arc(500+(frame.Pc)*xscale, photonStart, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
			ctx.stroke()
		}

		const willBe = frame.Phc + V*(frame.T_start-now);
		if( frame.T_start <now && frame.T_see_h>now) {
			const del = frame.T_see_h - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			headTri( (frame.Ph)*(1-delT) +(delT)*(frame.P_see_h), photonStart*(1-delT)+toY*(delT) );
			if( frame.event ) eventMark( (frame.Pc+L)*(1-delT)+(delT)*frame.Pc , photonStart*(1-delT)+toY*(delT), true );
			ctx.beginPath();
			ctx.arc(500+(frame.Ph)*xscale, photonStart, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
			ctx.stroke()

		}
		if( frame.T_start <now && frame.T_see_t>now) {
			const del = frame.T_see_t - frame.T_start;
			const passed = now - frame.T_start;
			const delT = passed/del;
			tailTri( (frame.Pt)*(1-delT)+(delT)*(frame.P_see_t), photonStart*(1-delT)+toY*(delT) );
			if( frame.event ) eventMark( (frame.Pc-L)*(1-delT)+(delT)*frame.Pc, photonStart*(1-delT)+toY*(delT)+20, true );
			if(1){ // draw circles around tail
				ctx.beginPath();
				ctx.arc(500+(frame.Pt)*xscale, photonStart, C*(now-frame.T_start)*(xscale), 0, 2 * Math.PI, false);
				ctx.stroke()
			}
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

	
/*
	const frontT  = observedTimeToRealTime( now,  L );
	const centerT = observedTimeToRealTime( now,  0 );
	const backT   = observedTimeToRealTime( now, -L );
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

