
const testSize= 200000;
const canvas = document.getElementById( "testSurface" );


const ctx = canvas.getContext( '2d' );

let animate = false;
let now = 0;
let last_draw_time = 0;
let xscale = 50;

const values = {
	C : Math.PI*2,
	VoverC : 1,
	Velocity : 1,
	Scale : 100,
}

const scalars = {
	C : 1,
}

const sliders = {
};

const controls = document.getElementById( "controls" );

//----------------------

addSpan( "C", 1250, "C", 100, 1/100, "C" );
addSpan( "Tilt", 1000, "tilt", 0, Math.PI/2000, "Tilt" );
addSpan( "Speed", 1000, "speed", 0, 2*Math.PI/1000, "Speed" );

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


function addSpan( text, range, source, initial, scalar, suffix ) {

	values[source] = initial;
	scalars[source] = scalar;
	let span;

	span = document.createElement( "span" );
	span.textContent = text;
	controls.appendChild( span );

	const sliderC = document.createElement( "input" );
	sliders["slider"+suffix] = sliderC;
	sliderC.setAttribute( "type", "range" );
	controls.appendChild( sliderC );
	sliderC.addEventListener( "input", update );
	sliderC.setAttribute( "max", range );
	sliderC.value = values[source] * scalar;
	sliderC.style.width="250px";

	const spanC = document.createElement( "span" );
	sliders["span"+suffix] = spanC;
	spanC.textContent = values[source].toFixed(3);
	controls.appendChild( spanC );

	span = document.createElement( "br" );
	controls.appendChild( span );

}

function sliderRead( source, suffix ) {
	const val = Number( sliders["slider"+suffix].value ) * scalars[source];
	values[source] = val;
	sliders["span"+suffix].textContent = val.toFixed(3);
}

update();

const body = [];

function aberration( x, y, ang, r ) {
	const velx = Math.cos(ang+Math.PI/2);
	const vely = Math.sin(ang+Math.PI/2);
	const speed = ( r * values.speed )/400;
	const a = Math.acos( (Math.cos(Math.PI/2)+speed/values.C)/(1+speed/values.C*Math.cos(Math.PI/2)) );
	ctx.beginPath();
	ctx.moveTo( 500+x, 500+y );
	ctx.fillStyle = ctx.strokeStyle = `hsl( ${0.3+Math.sin(values.tilt)*vely/3 /*+a/(Math.PI*2)*/}turn, 100%, 50% )`;
	ctx.lineTo( 500+x+velx*20, 500+y+vely*20*Math.cos(values.tilt) );
	ctx.stroke();


}

function update( evt ) {
	values.C = Number(sliderC.value)/100;
	spanC.textContent = values.C.toFixed(2);

	sliderRead( "speed", "Speed" );
	sliderRead( "tilt", "Tilt" );


/*
	animate = chkLblNow.checked;
        
	if( animate ) {
	}else
		now = Number(sliderNow.value)/100*runT/2;
	spanNow.textContent = now.toFixed(2);
*/

}


function drawCircle( ) {

	ctx.beginPath();
	ctx.moveTo( 500, 500 );
	ctx.strokeStyle=`hsl( 0.3turn, 100%, 50% )`;
	ctx.lineTo( 510, 500 );
	ctx.stroke();

}


function drawLoops( n ) {
	const del = 400 / n;
	for( let i = 1; i <= n; i++ ) {
		const rad = i*del;
		const spots = ( (rad) * 2 *Math.PI ) / 50;
		for( let s = 0; s < spots; s++ ) {
			const ang = Math.PI * 2 * (s / spots);
			const x = Math.cos(ang)*rad;
			const y = Math.sin(ang)*rad* Math.cos( values.tilt );
			const ab = aberration( x, y, ang, rad );
			ctx.beginPath();
			//ctx.fillStyle = `hsl( 0.3turn, 100%, 50% )`;
			//ctx.arc( 500 + Math.cos(ang)*rad , 500 + Math.sin(ang)*rad* Math.cos( values.tilt ), 10, 0, 2*Math.PI );
			ctx.ellipse( 500 + x , 500 + y, 10, 10*Math.cos(values.tilt), 0, 0, 2*Math.PI );
			ctx.fill();
		}
	}
}

function draw(  ) {
	ctx.clearRect( 0, 0, 1000, 1000 );
	
	ctx.strokeStyle = "white";

	drawLoops( 10 );
	
	ctx.beginPath ();
	ctx.ellipse(500, 500, 400, 400 * Math.abs( Math.cos( values.tilt ) ), 0, 0, Math.PI*2);
	ctx.stroke();


	ctx.beginPath();
	ctx.moveTo( 500, 500 );
	ctx.strokeStyle=`hsl( 0.3turn, 100%, 50% )`;
	ctx.lineTo( 510, 500 );
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo( 510, 500 );
	ctx.strokeStyle=`hsl( 0.25turn, 100%, 50% )`;
	ctx.lineTo( 520, 500 );
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo( 520, 500 );
	ctx.strokeStyle=`hsl( 0.20turn, 100%, 50% )`;
	ctx.lineTo( 530, 500 );
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo( 530, 500 );
	ctx.strokeStyle=`hsl( 0.15turn, 100%, 50% )`;
	ctx.lineTo( 540, 500 );
	ctx.stroke();

	//ctx.strokeRect( 450, 800, 100, 100 );
        
        //ctx.strokeRect( 450, 800, 100, 100 );
        
	if( animate ) {
		//now = ( ( (Date.now() * S) %(runT*1000) ) / 1000) - runT/2;
		//sliderNow.value =100*now*2/runT
		//spanNow.textContent = now.toFixed(2);
	}
	//const frame = Math.floor( (now+runT/2)*10 );


	requestAnimationFrame( draw );

	return;

}

draw();

