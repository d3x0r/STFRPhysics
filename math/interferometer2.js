
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

const sliders = {
};

const keyFrames = [
	{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 }
]

const keyFramesLength = [ 0,0,0,0];

const keyFrames_left = [
	{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 },{ x: 0, y: 0 }
]
const keyFramesLength_left = [ 0,0,0,0];
const keyFrameTimes_left = [ -2,-1,0,1,2];

const controls = document.getElementById( "controls" );

//----------------------

addSpan( "C", 1000, 1, 0, 2/1000, "C" );
addSpan( "Light Second Length", 1000, 150, 0, 1, "Scale" );
addSpan( "Velocity", 1000, 0.4, 0, 2/1000, "Velocity" );
addSpan( "Now", 1250, -1, -runT/2, runT/1000, "Now" );
//addSpan( "Speed", 1000, "speed", 0, 2*Math.PI/1000, "Speed" );

//- - - - - - - - - - - - - - 

const totalBlock = document.createElement( "div" );
controls.appendChild( totalBlock )
const spanTotalLabel = document.createElement( "span" );
spanTotalLabel.textContent = "Total Path Lengths:";
totalBlock.appendChild( spanTotalLabel );

const span3 = document.createElement( "br" );
totalBlock.appendChild( span3 );

sliders.spanTotal = document.createElement( "span" );
sliders.spanTotal.textContent = "Left: 0 Up: 0";
sliders.spanTotal.style.position = "relative";
sliders.spanTotal.style.left = "6em";
totalBlock.appendChild( sliders.spanTotal );

const span = document.createElement( "br" );
totalBlock.appendChild( span );

sliders.spanTotal2 = document.createElement( "span" );
sliders.spanTotal2.textContent = "Left: 0 Up: 0";
sliders.spanTotal2.style.position = "relative";
sliders.spanTotal2.style.left = "6em";
totalBlock.appendChild( sliders.spanTotal2 );

const span2 = document.createElement( "br" );
totalBlock.appendChild( span2 );


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


function addSpan( text, range, initial, bias_, scalar, suffix ) {

	values[suffix] = initial;
	scalars[suffix] = scalar;
	bias[suffix] = bias_;
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
	sliders["span"+suffix].textContent = val.toFixed(3);
}


function aberration( angle ) {
	const speed = values.Velocity;
	const a = Math.acos( (Math.cos(angle)+speed/values.C)/(1+speed/values.C*Math.cos(angle)) );
	return a;
}


update();


function update( evt ) {
	for( let name of names ) {
		sliderRead( name );
	}
	if( values.Velocity >= values.C ) values.Velocity = values.C - 0.0000000001;
	const gamma = 1/Math.sqrt( values.C*values.C - values.Velocity*values.Velocity );
	const Lgamma =  Math.sqrt(values.C*values.C - values.Velocity*values.Velocity)/values.C;
	values.VoverC = values.Velocity/values.C;
	sliders.spanNow.textContent = values.Now.toFixed(3) + " RT:" + (values.Now*gamma).toFixed(3);
	if( values.Now >= (runT/2 + values.Velocity)) values.Now = (runT/2 + values.Velocity);
	values.Now = values.Now * gamma;

	animate = chkLblNow.checked;
        
	//const Lgamma = (values.C*values.C - values.Velocity*values.Velocity)/values.C;
	const angle = Math.PI/2 + aberration( Math.PI/2 );

	keyFrames[0].x = 500 - runT/2 * values.Velocity * values.Scale*gamma;
	keyFrames[0].y = 500 + values.Scale;

	keyFrames[1].x = keyFrames[0].x + values.Velocity/values.C*gamma /* Math.sin(angle)*/ * values.Scale ;
	keyFrames[1].y = keyFrames[0].y + Math.cos(angle) * values.Scale * gamma ;

	keyFrames[2].x = keyFrames[1].x + values.Velocity/values.C*gamma /* Math.sin(angle)*/ * values.Scale ;
	keyFrames[2].y = keyFrames[1].y + Math.cos(angle) * values.Scale * gamma ;

	keyFrames[3].x = keyFrames[2].x + values.Velocity/values.C*gamma /* Math.sin(angle)*/ * values.Scale ;
	keyFrames[3].y = keyFrames[2].y - Math.cos(angle) * values.Scale * gamma ;

	keyFrames[4].x = keyFrames[3].x + values.Scale * ( 1 + values.Velocity ) * values.C * gamma;
	keyFrames[4].y = keyFrames[3].y;


	ctx.clearRect( 0, 0, 1000, 1000 );

	keyFrames_left[0].x = 500 - runT/2 * values.Velocity * values.Scale*gamma;
	keyFrames_left[0].y = 498 + values.Scale;

	keyFrames_left[1].x = keyFrames_left[0].x + values.Velocity/values.C*gamma/*Math.sin(angle)*/ * values.Scale ;
	keyFrames_left[1].y = keyFrames_left[0].y + Math.cos(angle) * values.Scale * gamma ;

	const left_pos_at_1 = (500 - values.Velocity * gamma * values.Scale - values.Scale*Lgamma);
	const left_len_at_1 = keyFrames_left[1].x - left_pos_at_1;
	const T = left_len_at_1 / (values.C+values.Velocity);
	const delta_until_2 = keyFrames_left[1].x -  ( values.C*T );
	keyFrameTimes_left[2] = -values.Velocity;
	/*
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo( left_pos_at_1, 100 );
	ctx.lineTo( left_pos_at_1, 800 );
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo( left_pos_at_1 + left_len_at_1, 100 );
	ctx.lineTo( left_pos_at_1 + left_len_at_1, 800 );
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.moveTo( delta_until_2, 100 );
	ctx.lineTo( delta_until_2, 800 );
	ctx.stroke();
	*/
	keyFrames_left[2].x = delta_until_2;
	keyFrames_left[2].y = keyFrames_left[1].y;

	keyFrames_left[3].x = keyFrames_left[2].x + ( (1 + values.Velocity) *gamma ) * values.Scale;
	keyFrames_left[3].y = keyFrames_left[2].y;

	keyFrames_left[4].x = keyFrames_left[3].x + values.Scale * ( 1 + values.Velocity ) * values.C * gamma;
	keyFrames_left[4].y = keyFrames_left[3].y;

	console.log( "T : ", -values.Velocity, keyFrameTimes_left );


	for( let i = 0; i < 4; i++ ) {
		const x = keyFrames[1+i].x-keyFrames[0+i].x;
		const xx = x*x;
		const y = keyFrames[1+i].y-keyFrames[0+i].y;
		const yy = y*y;
		keyFramesLength[i] = Math.sqrt(xx+yy);
		//console.log( "Length:", Math.sqrt( xx+yy));
	}
	console.log( "Length Up  :", keyFramesLength[0] + keyFramesLength[1] + keyFramesLength[2] + keyFramesLength[3] );

	for( let i = 0; i < 4; i++ ) {
		const x = keyFrames_left[1+i].x-keyFrames_left[0+i].x;
		const xx = x*x;
		const y = keyFrames_left[1+i].y-keyFrames_left[0+i].y;
		const yy = y*y;
		keyFramesLength_left[i] = Math.sqrt(xx+yy);
		//console.log( "Length:", Math.sqrt( xx+yy));
	}

	console.log( "Length Left:", keyFramesLength_left[0] + keyFramesLength_left[1] + keyFramesLength_left[2] + keyFramesLength_left[3] );

	sliders.spanTotal.textContent = "Up: " + keyFramesLength.map(a=>a.toFixed(3)).join("+") + "=" + ( keyFramesLength[0] + keyFramesLength[1] + keyFramesLength[2] + keyFramesLength[3] ).toFixed(3);
	sliders.spanTotal2.textContent = 
		"Left: " + keyFramesLength_left.map(a=>a.toFixed(3)).join("+" ) + "=" + ( keyFramesLength_left[0] + keyFramesLength_left[1] + keyFramesLength_left[2] + keyFramesLength_left[3] ).toFixed(3) 

	draw();

}


function draw(  ) {
	if( animate ) 	ctx.clearRect( 0, 0, 1000, 1000 );

	const gamma = 1/Math.sqrt( values.C*values.C - values.Velocity*values.Velocity );
	const pos = values.Now * values.Velocity * values.Scale;
	const Lgamma =  Math.sqrt(values.C*values.C - values.Velocity*values.Velocity)/values.C;

	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 0.5;
	ctx.strokeRect( 500 + pos - 0.5 * values.Scale*Lgamma
					, 500 + values.Scale*(1-0.1/2)
					, values.Scale*Lgamma, 0.1 * values.Scale );

	ctx.strokeRect( 500 + pos - 0.5 * values.Scale*Lgamma
					, 500 - values.Scale*(1 +0.1/2)
					, values.Scale*Lgamma, 0.1 * values.Scale );

	ctx.strokeRect( 500 + pos -(1+0.1/2)*values.Scale * Lgamma
					, 500 - values.Scale*(0.5)
					, 0.1 * values.Scale*Lgamma, 1 * values.Scale );

	ctx.strokeRect( 500 + pos + (1-0.1/2)*values.Scale * Lgamma
					, 500 - values.Scale*(0.5)
					, 0.1 * values.Scale*Lgamma, 1 * values.Scale );


	ctx.save();
	ctx.beginPath();
	ctx.translate( 500 + pos, 500 );
	ctx.scale( Lgamma, 1 );
	ctx.rotate(45*Math.PI/180);
	ctx.rect( - (0.5*values.Scale)
			, - (0.05*values.Scale)
			, 1 * values.Scale, 0.1 * values.Scale );
					
	ctx.stroke();
	ctx.restore();

	/*
	const angle = Math.PI/2 + aberration( Math.PI/2 );
	ctx.beginPath();
	ctx.moveTo(500,500 );
	ctx.lineTo( 500+Math.sin(angle)*values.Scale, 500+Math.cos(angle)*values.Scale );
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(500-runT/2*values.Velocity*values.Scale, 500 + values.Scale );
	ctx.lineTo( 500-runT/2*values.Velocity*values.Scale+values.Velocity*gamma*values.Scale, 500-values.Scale + values.Scale );
	ctx.stroke();
	*/

	{
		const localTime = values.Now/gamma;
		ctx.beginPath();
		ctx.strokeStyle = "white";
		let i = 0;
		for( let t = 0; t < 4; t++) {
			const tm =  keyFrameTimes_left[t];
			if( t === 3 || ( localTime >= tm && keyFrameTimes_left[t+1] > localTime ) ) {
				const del = localTime - tm;
				ctx.arc( keyFrames_left[i].x, keyFrames_left[i].y
							, del*values.Scale*gamma, 0, 2*Math.PI);
				ctx.stroke();
				break;
			}
			i++;
		}

		ctx.beginPath();
		i=0;
		ctx.strokeStyle = "red";
		for( let t = 0; t < 4; t++) {
			const tm =  t-runT/2;
			if( i === 3 || ( localTime >= tm && (tm+1) > localTime ) ) {
				const del = localTime - tm;
				ctx.arc( keyFrames[i].x, keyFrames[i].y
							, del*values.Scale*gamma, 0, 2*Math.PI);
				ctx.stroke();
				break;
			}
			i++;
		}

		/*
		console.log( "time:", localTime );
		const whole_ = Math.floor(values.Now/gamma);
		
		if( whole_ === 1 ) {
			const base = keyFrameTimes_left[whole_];
			const whole = whole_+runT/2;
			const frac = values.Now/gamma-whole_;
			ctx.arc( keyFrames[whole].x, keyFrames[whole].y, frac*values.Scale*gamma, 0, 2*Math.PI);
		} else {
			const base = keyFrameTimes_left[whole_];
			const whole = whole_+runT/2;
			const frac = values.Now/gamma-whole_;
			ctx.arc( keyFrames[whole].x, keyFrames[whole].y, frac*values.Scale*gamma, 0, 2*Math.PI);
		}
		*/

	}
	// emitter to splitter
	if(1) {
	ctx.beginPath();
	ctx.moveTo( keyFrames[0].x, keyFrames[0].y );
	ctx.lineTo( keyFrames[1].x, keyFrames[1].y );
	ctx.stroke();


	/* split to up */
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo(  keyFrames[1].x, keyFrames[1].y );
	ctx.lineTo(  keyFrames[2].x, keyFrames[2].y );
	ctx.stroke();

	/* top back to split */
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.moveTo(  keyFrames[2].x, keyFrames[2].y );
	ctx.lineTo(  keyFrames[3].x, keyFrames[3].y );
	ctx.stroke();

	/* splitter to right (from top)*/
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo(  keyFrames[3].x, keyFrames[3].y );
	ctx.lineTo(  keyFrames[4].x, keyFrames[4].y );
	ctx.stroke();
	}

	ctx.beginPath();
	ctx.moveTo( keyFrames_left[0].x, keyFrames_left[0].y );
	ctx.lineTo( keyFrames_left[1].x, keyFrames_left[1].y );
	ctx.stroke();

	/* split to left */
	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.moveTo(  keyFrames_left[1].x, keyFrames_left[1].y );
	ctx.lineTo(  keyFrames_left[2].x, keyFrames_left[2].y );
	ctx.stroke();
	
	/* left to split */
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.moveTo(  keyFrames_left[2].x, keyFrames_left[2].y );
	ctx.lineTo(  keyFrames_left[3].x, keyFrames_left[3].y );
	ctx.stroke();

	/* split to right (from left) */
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.moveTo(  keyFrames_left[3].x, keyFrames_left[3].y );
	ctx.lineTo(  keyFrames_left[4].x, keyFrames_left[4].y );
	ctx.stroke();
	
        
	if( animate ) {
		values.Now = ( ( (Date.now() ) %((runT+values.Velocity*2)*1250) ) / 1250) - runT/2;
		sliders.sliderNow.value =scalars.Now*values.Now + bias.Now
		sliders.spanNow.textContent = values.Now.toFixed(2);
		requestAnimationFrame( draw );
	}


	return;

}

draw();

