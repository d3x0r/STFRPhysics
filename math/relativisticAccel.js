
const testSize= 200000;
const canvas = document.getElementById( "testSurface" );


const ctx = canvas.getContext( '2d' );


let last_draw_time = 0;
let animate = false;
const runT = 4;

const names = [];

const values = {
	Now : -1,
	C : Math.PI*2,
	VoverC : 1,
	Velocity : 1,
	Scale : 100,
}

const bias = {
	C : 1,
}

const scalars = {
	C : 1,
}

const stringifiers = {

}

const sliders = {
};

const keyFrames = [
	{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 }
]

const keyFramesLength = [ 0,0,0,0];
const keyFrameTimes = [ -2,-1,0,1,2];
const keyFrameTimes2 = [ -2,-1,0,1,2];

const keyFrames_left = [
	{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 }
]
const keyFramesLength_left = [ 0,0,0,0];
const keyFrameTimes_left = [ -2,-1,0,1,2];

const controls = document.getElementById( "controls" );


const dcorn = [ { x: -0.637, y:-0.777}, {x:0.777, y:0.637}, {x:0.637, y:0.777}, {x:-0.777, y:-0.637}];
const hcorn = [ { x: -1, y:-0.1}, {x:1, y:-0.1}, {x:1, y:0.1}, {x:-1, y:0.1}];
const vcorn = [ { x: -0.1, y:-1}, {x:0.1, y:-1}, {x:0.1, y:1}, {x:-0.1, y:1}];

for( let p of dcorn ) { p.x = p.x/2; p.y = p.y/2 }
for( let p of hcorn ) { p.x = p.x/2; p.y = p.y/2 }
for( let p of vcorn ) { p.x = p.x/2; p.y = p.y/2 }

let lengthContract = 1;

//----------------------

addSpan( "C", 1000, 1, 0, 2/1000, "C" );
//sliders.sliderC.style.display = "none";
addSpan( "Light Second Length", 1000, 150, 0, 1, "Scale" );
addSpan( "Acceleration", 1000, 0.4, 0, 2/1000, "Acceleration" );
addSpan( "Velocity", 1000, 0.4, 0, 2/1000, "Velocity" );
addSpan( "Direction", 1000, 0, 0, (Math.PI*2)/1000, "Direction", (val)=>(val/Math.PI).toFixed(3)+"pi" );
addSpan( "Now", 2550, -1, -runT/2, runT/1000, "Now" );
//addSpan( "Speed", 1000, "speed", 0, 2*Math.PI/1000, "Speed" );

//- - - - - - - - - - - - - - 

const totalBlock = document.createElement( "div" );
controls.appendChild( totalBlock )
const spanTotalLabel = document.createElement( "span" );
spanTotalLabel.textContent = "Total Path Lengths:";
totalBlock.appendChild( spanTotalLabel );

let span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotal = document.createElement( "span" );
sliders.spanTotal.textContent = "Left: 0 Up: 0";
sliders.spanTotal.style.position = "relative";
sliders.spanTotal.style.left = "6em";
totalBlock.appendChild( sliders.spanTotal );

span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotalT = document.createElement( "span" );
sliders.spanTotalT.textContent = "Left: 0 Up: 0";
sliders.spanTotalT.style.position = "relative";
sliders.spanTotalT.style.left = "6em";
totalBlock.appendChild( sliders.spanTotalT );

span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotal2 = document.createElement( "span" );
sliders.spanTotal2.textContent = "Left: 0 Up: 0";
sliders.spanTotal2.style.position = "relative";
sliders.spanTotal2.style.left = "6em";
totalBlock.appendChild( sliders.spanTotal2 );

span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotal2T = document.createElement( "span" );
sliders.spanTotal2T.textContent = "Left: 0 Up: 0";
sliders.spanTotal2T.style.position = "relative";
sliders.spanTotal2T.style.left = "6em";
totalBlock.appendChild( sliders.spanTotal2T );

span = document.createElement( "br" );
totalBlock.appendChild( span );


//- - - - - - - - - - - - - - 

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = animate;
chkLblNow.addEventListener( "input", update );

const spanChkNow = document.createElement( "label" );
spanChkNow.textContent = "Animate";
spanChkNow.appendChild( chkLblNow );
controls.appendChild( spanChkNow );

//----------------------


function addSpan( text, range, initial, bias_, scalar, suffix, toString ) {

	values[suffix] = initial;
	scalars[suffix] = scalar;
	bias[suffix] = bias_;
	stringifiers[suffix] = toString;
	let span;


	names.push( suffix );

	span = document.createElement( "span" );
	span.textContent = text;
	controls.appendChild( span );

	const sliderC = document.createElement( "input" );
	sliders["slider"+suffix] = sliderC;
	sliderC.setAttribute( "type", "range" );
	controls.appendChild( sliderC );
	sliderC.addEventListener( "input", update );
	sliderC.setAttribute( "max", range );
	sliderC.value = (values[suffix] - bias_)/ scalar ;
	sliderC.style.width="250px";

	const spanC = document.createElement( "span" );
	sliders["span"+suffix] = spanC;
	spanC.textContent = values[suffix].toFixed(3);
	controls.appendChild( spanC );

	span = document.createElement( "br" );
	controls.appendChild( span );

}

function sliderRead( suffix ) {
	const val = bias[suffix] + Number( sliders["slider"+suffix].value ) * scalars[suffix];
	values[suffix] = val;
	if( stringifiers[suffix])
		sliders["span"+suffix].textContent = stringifiers[suffix](val);
	else
		sliders["span"+suffix].textContent = val.toFixed(3);
}


function aberration( angle ) {
	const speed = values.Velocity;
	const a = Math.acos( (Math.cos(angle)+speed/values.C)/(1+speed/values.C*Math.cos(angle)) );
	return a;
}

function aberration2( Xox, Xoy, Xx, Xy ) {
	const forward = { x : Math.cos(values.Direction) * values.Velocity, y: -Math.sin(values.Direction) * values.Velocity };

	let delx = Xx-Xox;
	let dely = Xy-Xoy;
	let rx = Xx;
	let ry = Xy;

	let len2 = delx*delx + dely*dely;
	let Vdot = delx * forward.x + dely*forward.y;
	const Vcrsz = dely * forward.x - delx * forward.y;
	const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
	//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
	if( values.Velocity > 0.00001 ) {
		let len = Math.sqrt( len2 );
		let Vlen = values.Velocity;
		let norm = len*Vlen;
		let CosVDot = Vdot/norm;
		let baseAng = Math.acos( CosVDot );
		const delAng = Math.acos( ( CosVDot + Vlen/values.C)/(1 + Vlen/values.C * CosVDot))-baseAng;
		if( Math.abs( delAng) > 0.00001 ) {
			const c = Math.cos(delAng );
			const s= Math.sin( delAng);
			let vx = delx, vy=dely;
			let qz = Math.sign( Vcrs );
			rx = Xox + vx*c + s*(-qz * vy) + 0;
			ry = Xoy + vy*c + s*(qz * vx) + 0;						
		}
	}
	return { x:rx, y:ry };
}

function aberration2a( Xox, Xoy, Xx, Xy ) {
	const forward = { x : Math.cos(values.Direction) * values.Velocity, y: -Math.sin(values.Direction) * values.Velocity };

	let delx = Xx-Xox;
	let dely = Xy-Xoy;

	let len2 = delx*delx + dely*dely;
	let Vdot = delx * forward.x + dely*forward.y;
	const Vcrsz = dely * forward.x - delx * forward.y;
	const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
	//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
	if( values.Velocity > 0.00001 ) {
		let len = Math.sqrt( len2 );
		let Vlen = values.Velocity;
		let norm = len*Vlen;
		let CosVDot = Vdot/norm;
		let baseAng = Math.acos( CosVDot );
		//console.log( "baseAng:", baseAng )
		let qz = Math.sign( Vcrs );
		const delAng = -qz*(Math.acos( ( CosVDot + Vlen/values.C)/(1 + Vlen/values.C * CosVDot))-baseAng);
		return delAng;
	}
	return 0;
}


function gamma( v ) {
	return Math.sqrt( values.C*values.C-v*v ) / values.C;
}

update();


function update( evt ) {
	for( let name of names ) {
		sliderRead( name );
	}
	if( values.Velocity >= values.C ) values.Velocity = values.C - 0.0000000001;
	const gamma = 1/Math.sqrt( values.C*values.C - values.Velocity*values.Velocity );
	const Lgamma =  Math.sqrt(values.C*values.C - values.Velocity*values.Velocity)/values.C;
	lengthContract = Lgamma;

	values.VoverC = values.Velocity/values.C;
	sliders.spanNow.textContent = values.Now.toFixed(3) + " Local Time:" + ((values.Now+2)/gamma -2).toFixed(3);
	//if( values.Now >= (runT/2 + values.Velocity)) values.Now = (runT/2 + values.Velocity);
	//values.Now = values.Now;
	const was_animate = animate;
	animate = chkLblNow.checked;
                    
	if( !animate ) 
		ctx.clearRect( 0, 0, 1000, 1000 );

	if( !was_animate )
		draw();

	
}





function draw(  ) {
	if( animate ) 	ctx.clearRect( 0, 0, 1000, 1000 );


	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;


	// x = x+ Math.sqrt( CC-xx ) / C * A;
	//     x = +/- AC/sqrt(AA+CC)
	//    

	ctx.beginPath();
	ctx.strokeStyle = "white";

	ctx.moveTo( 0, 500 );
	let value = 0;
	for( let x = 5; x < 1000; x+= 5 ) {
		value += gamma( value ) * values.Acceleration/40;
		if( isNaN( value ) ) value = values.C;
		ctx.lineTo( x, 500 - value*400 );
	}
	
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "blue";

	ctx.moveTo( 0, 500 );
	value = 0;
	let del = 0;
	for( let x = 5; x < 1000; x+= 5 ) {
		del = gamma( value ) * values.Acceleration/40;
		value += gamma( value ) * values.Acceleration/40;
		if( isNaN( value ) ) value = values.C;
		ctx.lineTo( x, 500 - del*40000 );
	}
	
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "yellow";
	ctx.moveTo( 0, 500 );
	 value = 0;
	for( let x = 5; x < 1000; x+= 5 ) {
		value = 0.5- 1/(1+Math.exp( (values.Acceleration*x)/70) );
		if( isNaN( value ) ) value = values.C;
		ctx.lineTo( x, 500 - value*800 );
	}
	
	ctx.stroke();
	
        
	if( animate ) {
		values.Now = ( ( (Date.now() ) %((runT+values.Velocity*2)*1250) ) / 1250) - runT/2;
		sliders.sliderNow.value =scalars.Now*values.Now + bias.Now
		sliders.spanNow.textContent = values.Now.toFixed(2);
		requestAnimationFrame( draw );
	}


	return;

}


function RealTime( T_o, V, P, V_o, P_o ) {
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for T.
	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 
	//                       - 4 (C^2 - D^2 - E^2 - F^2) 
	//                          * (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) 
	//            + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$
	const C = values.C;

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


function ObservedTime( T, V, P, V_o, P_o, c ) {
	c = c || values.C;
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

function realTimeToObservedTimeXYZ2( T_o, V, X, Y, Z, V_o, X_o, Y_o, Z_o, ca, sa, ca_o, sa_o ){ 
	return ObservedTime( T_o, { x: V*ca, y: V*sa, z: 0 }, { x:X, y:Y, z:Z }, { x:ca_o*V_o, y:sa_o*V_o, z: 0 }, { x:X_o, y:Y_o, z:Z_o } );
}
