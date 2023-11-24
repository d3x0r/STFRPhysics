
const testSize= 200000;
const canvas = document.getElementById( "testSurface" );


const ctx = canvas.getContext( '2d' );


let last_draw_time = 0;
let animate = false;
let runT = 20;

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
addSpan( "Light Second Length", 1000, 30, 0, 1, "Scale" );
addSpan( "Observed Velocity", 2000, 0.25, -1, 2/2000, "Velocity" );
addSpan( "Observer Velocity", 2000, 0.25, -1, 2/2000, "Velocity2" );
addSpan( "Now", 1000, -1, -runT/2, runT/1000, "Now" );
addSpan( "Run Length", 500, runT, 0, 40/500, "runLength" );
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
	runT = values.runLength;
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
	ctx.lineWidth = 3;

	ctx.moveTo( 500, 500 );
	ctx.lineTo( 500 - 500, 500 - 500 );
	ctx.stroke();

	ctx.moveTo( 500, 500 );
	ctx.lineTo( 500 + 500, 500 - 500 );
	ctx.stroke();

	ctx.moveTo( 500, 500 );
	ctx.lineTo( 500 - 500, 500 + 500 );
	ctx.stroke();

	ctx.moveTo( 500, 500 );
	ctx.lineTo( 500 + 500, 500 + 500 );
	ctx.stroke();

	
	ctx.beginPath();
	ctx.strokeStyle = "#888";
	ctx.lineWidth = 1;


	const tGam = Math.sqrt( values.C * values.C - values.Velocity2*values.Velocity2 );

			ctx.beginPath();
			ctx.strokeStyle = "#00A";
			ctx.lineWidth = 3;
			ctx.moveTo( 500 + (values.Scale*(-10)
						)
					, 500  );
			ctx.lineTo( 500 + (values.Scale*(10) 
						)
					, 500  );
			ctx.stroke();
			ctx.moveTo( 500 
					, 500 - ( -runT/2 * values.Scale ) );
			ctx.lineTo( 500 
					, 500 - ( +runT/2 * values.Scale ) );
			ctx.stroke();
	
			ctx.lineWidth = 1;

	let xGam = 0;
	for( let i = -10; i <= 10; i += 1 ) {
		for( let t = -runT/2; t < runT/2; t += 1 ) {
			const now = t * (1/tGam);
			const then = (t+1) * (1/tGam);
			const proper_now = t ;
			const proper_then = (t+1);

			ctx.beginPath();
			ctx.strokeStyle = "#A00";
			if( false )
			{
				if( i >= 0 ) {
					xGam = values.C - values.Velocity2;
				} else {
					xGam = values.C + values.Velocity2;
				}
			} 
			xGam = tGam;
			ctx.moveTo( 500 + (xGam)*(values.Scale*i
						//+values.Scale*(values.Velocity-values.Velocity2) * now
						)
					, 500 - now * values.Scale );
			ctx.lineTo( 500 + (xGam)*(values.Scale*(i+1) 
						//+ values.Scale*(values.Velocity-values.Velocity2) * now
						)
					, 500 - (now) * values.Scale );
			ctx.stroke();
			ctx.moveTo( 500 + (xGam)*( values.Scale*i
					//	+(tGam)*(values.Scale*(values.Velocity-values.Velocity2) * now)
						)
					, 500 - now * values.Scale );
			ctx.lineTo( 500 + (xGam)*(values.Scale*i
						//+(tGam)*(values.Scale*(values.Velocity-values.Velocity2) * now)
						)
					, 500 - (then) * values.Scale );
			ctx.stroke();

			ctx.beginPath();
			ctx.strokeStyle = "#333";
			ctx.moveTo( 500 + (values.Scale*i
						//+values.Scale*(values.Velocity-values.Velocity2) * now
						)
					, 500 - proper_now * values.Scale );
			ctx.lineTo( 500 + (values.Scale*(i+1) 
						//+ values.Scale*(values.Velocity-values.Velocity2) * now
						)
					, 500 - (proper_now) * values.Scale );
			ctx.stroke();
			ctx.moveTo( 500 + ( values.Scale*i
					//	+(tGam)*(values.Scale*(values.Velocity-values.Velocity2) * now)
						)
					, 500 - proper_now * values.Scale );
			ctx.lineTo( 500 + (values.Scale*i
						//+(tGam)*(values.Scale*(values.Velocity-values.Velocity2) * now)
						)
					, 500 - (proper_then) * values.Scale );
			ctx.stroke();
			

		}
		
	}

	for( let i = -500; i <= 500; i += 1000/runT ) {
		const now = i / 500 * runT/2 * tGam;
		ctx.beginPath();
		ctx.strokeStyle = "#0b0";
		ctx.moveTo( 500 + values.Scale*(values.Velocity-values.Velocity2) * now, 500 - now * values.Scale );
		ctx.lineTo( 500 + values.Scale*(values.Velocity-values.Velocity2) * now- 500, 500 - now * values.Scale - 500 );
		ctx.stroke();
		ctx.moveTo( 500 + values.Scale*(values.Velocity-values.Velocity2) * now, 500 - now * values.Scale );
		ctx.lineTo( 500 + values.Scale*(values.Velocity-values.Velocity2) * now+ 500, 500 - now * values.Scale - 500 );
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = "#040";
		ctx.moveTo( 500 + values.Scale*(values.Velocity-values.Velocity2) * now, 500 - now * values.Scale );
		ctx.lineTo( 500 + values.Scale*(values.Velocity-values.Velocity2) * now- 500, 500 - now * values.Scale + 500 );
		ctx.stroke();
		ctx.moveTo( 500 + values.Scale*(values.Velocity-values.Velocity2) * now, 500 - now * values.Scale );
		ctx.lineTo( 500 + values.Scale*(values.Velocity-values.Velocity2) * now+ 500, 500 - now * values.Scale + 500 );
		ctx.stroke();
	}



	


	if( animate ) {
		values.Now = ( ( (Date.now() ) %(runT*1000) ) / 1000) - runT/2;
		sliders.sliderNow.value =(values.Now - bias.Now)/scalars.Now;
		sliders.spanNow.textContent = values.Now.toFixed(2);
	}
	if( animate ) 
		requestAnimationFrame( draw );

	return;

}

draw();

