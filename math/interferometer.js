
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


const controls = document.getElementById( "controls" );

//----------------------

addSpan( "C", 1000, 1, 0, 2/1000, "C" );
addSpan( "Light Second Length", 1000, 150, 0, 1, "Scale" );
addSpan( "Velocity", 1000, 0.99, 0, 2/1000, "Velocity" );
addSpan( "Now", 1000, -1, -runT/2, runT/1000, "Now" );
//addSpan( "Speed", 1000, "speed", 0, 2*Math.PI/1000, "Speed" );

//- - - - - - - - - - - - - - 

const chkLblNow = document.createElement( "input" );
chkLblNow.setAttribute( "type", "checkbox" );
chkLblNow.checked = animate;
chkLblNow.addEventListener( "input", update );

const spanChkNow = document.createElement( "label" );
spanChkNow.textContent = " |Animate";
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

const body = [];

function update( evt ) {
	for( let name of names ) {
		sliderRead( name );
	}
	values.VoverC = values.Velocity/values.C;
	const wasAnimate = animate;
	animate = chkLblNow.checked;
        
	if( !animate ) {
		//values.Now = Number(values.Now)/100*runT/2;
		sliders.spanNow.textContent = values.Now.toFixed(2);
	}

	if( !wasAnimate ) draw();


}
function draw(  ) {
	const pos = values.Now * values.Velocity * values.Scale;
	const gamma = 1/Math.sqrt( values.C*values.C - values.Velocity*values.Velocity );
	ctx.clearRect( 0, 0, 1000, 1000 );

	ctx.beginPath();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 0.5;
	ctx.strokeRect( 500 + pos - 0.5 * values.Scale
					, 500 + values.Scale*(1-0.1/2)
					, values.Scale, 0.1 * values.Scale );

	ctx.strokeRect( 500 + pos - 0.5 * values.Scale
					, 500 - values.Scale*(1 +0.1/2)
					, values.Scale, 0.1 * values.Scale );

	ctx.strokeRect( 500 + pos + -1*values.Scale
					, 500 - values.Scale*(0.5)
					, 0.1 * values.Scale, 1 * values.Scale );

	ctx.strokeRect( 500 + pos + +1*values.Scale
					, 500 - values.Scale*(0.5)
					, 0.1 * values.Scale, 1 * values.Scale );


	ctx.save();
	ctx.beginPath();
	ctx.translate( 500 + pos, 500 );
	ctx.rotate(45*Math.PI/180);

	ctx.rect( - (0.5*values.Scale)
			, - (0.05*values.Scale)
			, 1 * values.Scale, 0.1 * values.Scale );
					
	ctx.stroke();
	ctx.restore();

	// emitter to splitter
	ctx.beginPath();
	const angle = Math.PI/2 + aberration( Math.PI/2 );
	ctx.moveTo( 500 - runT/2*values.Scale*values.Velocity
	          , 500 + values.Scale * 1.0 );
	ctx.lineTo( 500 - runT/2*values.Scale*values.Velocity 
				+ Math.sin(angle)*values.Scale 
				, 500 + values.Scale * 1.0 + Math.cos(angle) * values.Scale * gamma );
	ctx.stroke();

	/* split to left */
	ctx.beginPath();
	ctx.strokeStyle = "red";

	ctx.moveTo(  500 - runT/2*values.Scale*values.Velocity 
				+ Math.sin(angle)*values.Scale 
				, 500 + values.Scale * 1.0 + Math.cos(angle) * values.Scale * gamma  );
	ctx.lineTo(  500 - (1-0.1/2)*values.Scale				
				, 500 + values.Scale * 1.0 + Math.cos(angle) * values.Scale * gamma  );
	ctx.stroke();

	/* split to up */
	ctx.beginPath();
	ctx.strokeStyle = "red";

	ctx.moveTo(  500 - runT/2*values.Scale*values.Velocity 
				+ Math.sin(angle)*values.Scale 
				,  500 + values.Scale * 1.0 + Math.cos(angle) * values.Scale * gamma  );
	ctx.lineTo(  500 - runT/2*values.Scale*values.Velocity 
				+ 2*Math.sin(angle)*values.Scale 
				,  500 + values.Scale * 1.0 + Math.cos(angle) * values.Scale * gamma * 2 );
	ctx.stroke();


	/* left to split */
	ctx.beginPath();
	ctx.strokeStyle = "blue";

	ctx.moveTo( 500 - (1-0.1/2)*values.Scale				
	          , 500 + values.Scale * 1.0 + Math.cos(angle) * values.Scale * gamma  );
	ctx.lineTo( 500 - (1-0.1/2)*values.Scale
	            + ( 1 + values.Velocity ) * values.Scale
	          , 500 + values.Scale * 1.0 + Math.cos(angle) * values.Scale * gamma  );
	ctx.stroke();

	/* top back to split */
	ctx.beginPath();
	ctx.strokeStyle = "blue";

	ctx.moveTo( 500 - runT/2*values.Scale*values.Velocity 
				+ 2*Math.sin(angle)*values.Scale 
				,  500 + values.Scale * 1.0 + Math.cos(angle) * values.Scale * gamma * 2 );
	ctx.lineTo(500 - runT/2*values.Scale*values.Velocity 
				+ 3*Math.sin(angle)*values.Scale 
				,  500 + values.Scale * 1.0 
				   + Math.cos(angle) * values.Scale * gamma * 2 
				   - Math.cos(angle) * values.Scale * gamma );
	ctx.stroke();
	
	/* left to split */
	if(0) {
	ctx.beginPath();
	ctx.strokeStyle = "magneta";

	ctx.moveTo( 500 - runT/2*values.Scale*values.Velocity + Math.cos(angle)*values.Scale  + values.Velocity*values.Scale + values.VoverC * values.Scale
				, 500 + values.Scale * 1.0 - Math.sin(angle) * values.Scale );
	ctx.lineTo( 500 - runT/2*values.Scale*values.Velocity + Math.cos(angle)*values.Scale  + values.Velocity*values.Scale + values.VoverC * values.Scale + values.VoverC*values.Scale + values.Scale
				, 500 + values.Scale * 1.0 - Math.sin(angle) * values.Scale );
	ctx.stroke();
	}
	
	/* splitter to right (from top)*/
	ctx.beginPath();
	ctx.strokeStyle = "green";

	ctx.moveTo(500 - runT/2*values.Scale*values.Velocity 
				+ 3*Math.sin(angle)*values.Scale 
				,  500 + values.Scale * 1.0 
				   + Math.cos(angle) * values.Scale * gamma * 2 
				   - Math.cos(angle) * values.Scale * gamma);
	ctx.lineTo( 500 + runT/2* values.Scale * values.Velocity + (1 + 0.1/2) * values.Scale
				,  500 + values.Scale * 1.0 
				   + Math.cos(angle) * values.Scale * gamma * 2 
				   - Math.cos(angle) * values.Scale * gamma );

	ctx.stroke();
        
	if( animate ) {
		values.Now = ( ( (Date.now() ) %(runT*1000) ) / 1000) - runT/2;
		sliders.sliderNow.value =(values.Now - bias.Now)/scalars.Now;
		sliders.spanNow.textContent = values.Now.toFixed(2);
	}
	const frame = Math.floor( (values.Now+runT/2)*10 );

	if( animate ) 
		requestAnimationFrame( draw );

	return;

}

draw();

