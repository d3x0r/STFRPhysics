
import {lnQuat} from "../3d/src/lnQuatSq.js"

const testSize= 200000;
const canvas = document.getElementById( "testSurface" );
const ctx = canvas.getContext( '2d' );

const controls = document.getElementById( "controls" );

let span;

	span = document.createElement( "br" );
	controls.appendChild( span );

span = document.createElement( "span" );
span.textContent = "A Objects";
controls.appendChild( span );

const sliderA = document.createElement( "input" );
sliderA.setAttribute( "type", "range" );
controls.appendChild( sliderA );
sliderA.addEventListener( "input", update );

sliderA.setAttribute( "max",100 );
sliderA.value = 0;
sliderA.style.width="250px";

const sliderTextA = document.createElement( "span" );
sliderTextA.textContent = "0";
controls.appendChild( sliderTextA );

	span = document.createElement( "br" );
	controls.appendChild( span );



span = document.createElement( "span" );
span.textContent = "B Objects";
controls.appendChild( span );

const sliderB = document.createElement( "input" );
sliderB.setAttribute( "type", "range" );
controls.appendChild( sliderB );
sliderB.addEventListener( "input", update );

sliderB.setAttribute( "max",100 );
sliderB.value = 0;
sliderB.style.width="250px";

const sliderTextB = document.createElement( "span" );
sliderTextB.textContent = "0";
controls.appendChild( sliderTextB );


	span = document.createElement( "br" );
	controls.appendChild( span );


span = document.createElement( "span" );
span.textContent = "Mass Per Object";
controls.appendChild( span );

const sliderMassPer = document.createElement( "input" );
sliderMassPer.setAttribute( "type", "range" );
controls.appendChild( sliderMassPer );
sliderMassPer.addEventListener( "input", update );

sliderMassPer.setAttribute( "max", 100 );
sliderMassPer.setAttribute( "min", 1 );
sliderMassPer.value = 1;
sliderMassPer.style.width="250px";

const sliderTextMassPer = document.createElement( "span" );
sliderTextMassPer.textContent = "1";
controls.appendChild( sliderTextMassPer );


	span = document.createElement( "br" );
	controls.appendChild( span );


span = document.createElement( "span" );
span.textContent = "Beam Mass";
controls.appendChild( span );

const sliderMass = document.createElement( "input" );
sliderMass.setAttribute( "type", "range" );
controls.appendChild( sliderMass );
sliderMass.addEventListener( "input", update );

sliderMass.setAttribute( "max", 100 );
sliderMass.value = 0;
sliderMass.style.width="250px";

const sliderTextMass = document.createElement( "span" );
sliderTextMass.textContent = "0";
controls.appendChild( sliderTextMass );

/*
const angleLeader = document.createElement( "span" );
angleLeader.innerHTML = " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Angle:";
controls.appendChild( angleLeader );
const angleText = document.createElement( "span" );
angleText.textContent = "50%";
controls.appendChild( angleText );
angleText.style.fontSize = "200%";


const polarizerLeader = document.createElement( "span" );
polarizerLeader.innerHTML = " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Polarizer correlation:";
controls.appendChild( polarizerLeader );
const polarizerText = document.createElement( "span" );
polarizerText.textContent = "50%";
polarizerText.style.fontSize = "200%";
controls.appendChild( polarizerText );

const polarizerTrailer = document.createElement( "span" );
polarizerTrailer.innerHTML = "";
controls.appendChild( polarizerTrailer );

controls.appendChild( document.createElement( "p")  );

const qmLeader = document.createElement( "span" );
qmLeader.innerHTML = " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;QM Prediction:";
controls.appendChild( qmLeader );
const qmText = document.createElement( "span" );
qmText.textContent = "50%";
controls.appendChild( qmText );
qmText.style.fontSize = "200%";

const corrLeader = document.createElement( "span" );
corrLeader.innerHTML = " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Error Percent:";
controls.appendChild( corrLeader );
const corrText = document.createElement( "span" );
corrText.textContent = "50%";
controls.appendChild( corrText );
corrText.style.fontSize = "200%";
*/


const BASE_COLOR_WHITE = [255,255,255,255];
const BASE_COLOR_BLACK = [0,0,0,255];
const BASE_COLOR_RED = [255,0,0,255];
const BASE_COLOR_BLUE = [0,0,255,255];
const BASE_COLOR_YELLOW = [255,255,0,255];
const BASE_COLOR_GREEN = [0,255,0,255];

function ColorAverage( a, b, i,m) {

    var c = [ (((b[0]-a[0])*i/m) + a[0])|0,
        (((b[1]-a[1])*i/m) + a[1])|0,
        (((b[2]-a[2])*i/m) + a[2])|0,
		(((b[3]-a[3])*i/m) + a[3])|0
    ];
    //console.log( "color: ", a, b, c, i, ((b[1]-a[1])*i/m)|0, a[1], ((b[1]-a[1])*i/m) + a[1] )
    return c;//`#${(c[0]<16?"0":"")+c[0].toString(16)}${(c[1]<16?"0":"")+c[1].toString(16)}${(c[2]<16?"0":"")+c[2].toString(16)}`
}

function balance(a,b,m) {
	if( a == b ) return 0;
	const ab = (a+b)
	a=a/ab;
	b=b/ab;
	m=m/ab;
	const x = (a-b);
	if( x < 0 ) {		
		return (a+m)/(b+m)-1
	}else
		return 1-(b+m)/(a+m);
}

const lnQ= new lnQuat();

const choices = [0,0,0,0,0,0,0,0];
const choices_d = [0,0,0,0,0,0,0,0];

const axis1 = [1,0,0];

const axis2_0 = [Math.cos(0),Math.sin(0),0];
const axis2_22 = [Math.cos(Math.PI/8),Math.sin(Math.PI/8),0];
const axis2_30 = [Math.cos(Math.PI/6),Math.sin(Math.PI/6),0];
const axis2_45 = [Math.cos(Math.PI/4),Math.sin(Math.PI/4),0];
let axis2_angle = 0;

//const axis2_60 = [Math.cos(Math.PI*93/300),Math.sin(Math.PI*93/300),0];   // 111.6  50% 
const axis2_60 = [Math.cos(Math.PI/3),Math.sin(Math.PI/3),0];  // 44%

const axis2_90 = [Math.cos(Math.PI/2),Math.sin(Math.PI/2),0];  // 90 degrees separation;

let axis2 = axis2_45;

const tmp = [0,0,0];
const tmp2 = [0,0,0];



let drawing = false;
let ang = -180;
        let prior_x = -1;
        let prior_y = -1;

        let prior_x_b = -1;
        let prior_y_b = -1;

        let prior_x_d = -1;
        let prior_y_d = -1;
        let prior_x_e = -1;
        let prior_y_e = -1;

        let prior_x_ed = -1;
        let prior_y_ed = -1;


function update( evt ) {
	const a = Number(sliderB.value);
	const b = Number(sliderA.value);
	let mass = Number(sliderMass.value)/10;
	const massPer = Number(sliderMassPer.value);
	sliderTextA.textContent = b;
	sliderTextB.textContent = a;
	sliderTextMass.textContent = mass;
	sliderTextMassPer.textContent = massPer;
	mass = mass/massPer;

	firstDraw( a*massPer, b*massPer, mass );
}
function firstDraw( a, b, mass ) {
	const beamX = canvas.width/2;
	const beamY = canvas.height/2;

	ctx.clearRect( 0, 0, 1024, 1024);

	const tilt = balance( a, b, mass );
	
	const bx = Math.cos( Math.PI/2 * tilt );
	const by = Math.sin( Math.PI/2 * tilt );
	
	ctx.strokeStyle = "#333";
	ctx.font = "24px monospace"
	ctx.beginPath();
	ctx.moveTo( beamX-bx*200, beamY-by*200 );
	ctx.lineTo( beamX+bx*200, beamY+by*200 );
	ctx.stroke();
	//console.log( "ang?", ang );

	ctx.fillText( "A", beamX-bx*200, beamY-by*200 - 20 );
	ctx.fillText( "B", beamX+bx*200, beamY+by*200 - 20 );

	return;
    var centerX = 666;
    var centerY = canvas.height / 2;
    var radius = 200;

	ctx.clearRect( 0, 0, 1024, 1024);


	const i = ang1/Math.PI*2;
	angleText.textContent = (90 * (ang1/Math.PI*2)).toFixed(4) +"°";

	const c = Math.cos( ang1 );
	const q = (100*(c*c)/2);
	qmText.textContent = q.toFixed(4);

	
	corrText.textContent = (100*(q-p)/(q)).toFixed(4) +"% "
	
	
        drawHalf( ang1,0 );
        drawHalf( ang1,2 );

	function wedge( from, to, r, ca, cb ) {
		const centerX = 150;
		ctx.beginPath();
	
		ctx.moveTo( centerX+100 , centerY );
		ctx.lineTo( centerX+100 + r*radius * Math.cos(from*Math.PI/2), centerY  + r*radius * Math.sin( from*Math.PI/2));
		    ctx.arc(centerX+100, centerY, r*radius, from*Math.PI/2,  to*Math.PI/2, false);
		ctx.lineTo( centerX+100 , centerY );
//ctx.closePath();

		    ctx.fillStyle = ca;//"#77000020";
	    ctx.fill();
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = cb;//"red";
	    ctx.stroke();
	}

	function drawHalf( ang1, del ) {
		const centerX = 150;
	const ang = ang1/Math.PI*2;
		//const center = 250;

		if( ang1 < Math.PI/4 )  {
			wedge( del - ang*2, del, 1.0, "#77000020", "red" );

			wedge( del+0, del+2-ang*2, 1.05, "#00770020", "green" );
	
			wedge( del+0+ang, del+2-ang*2, 1, "#00007720", "blue" );

		}else {

			wedge( del - (2-ang*2), del+0, 1.0, "#77000020", "red" );
			wedge( del+0, del+ang*2, 1.05, "#00330060", "green" );
	
			wedge( del+0.5, del+1.50-ang*1, 1, "#6070E740", "#33f" );

		}


	}


}

		ctx.clearRect(0,0,1024,1024 );

		firstDraw( 0, 0, 0 );

