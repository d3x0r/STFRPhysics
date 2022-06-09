
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

sliderMassPer.setAttribute( "max", 200 );
sliderMassPer.setAttribute( "min", 1 );
sliderMassPer.value = 10;
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


	span = document.createElement( "br" );
	controls.appendChild( span );


span = document.createElement( "span" );
span.textContent = "Tilt Angle ";
controls.appendChild( span );

const tiltText = document.createElement( "span" );
tiltText.textContent = "0°";
controls.appendChild( tiltText );



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

function update( evt ) {
	const a = Number(sliderB.value);
	const b = Number(sliderA.value);
	let mass = Number(sliderMass.value)/10;
	const massPer = Number(sliderMassPer.value)/10;
	sliderTextA.textContent = b;
	sliderTextB.textContent = a;
	sliderTextMass.textContent = mass;
	sliderTextMassPer.textContent = massPer;
	mass = mass/massPer;

	firstDraw( a*massPer, b*massPer, mass );
}
function firstDraw( a, b, mass ) {
	const beamX = canvas.width/2;
	const beamY = canvas.height/2 + 40;

	ctx.clearRect( 0, 0, 1024, 1024);

	const tilt = balance( a, b, mass );
	
	tiltText.textContent = (tilt*90)+"°";

	const bx = Math.cos( Math.PI/2 * tilt );
	const by = Math.sin( Math.PI/2 * tilt );
	
	ctx.strokeStyle = "#333";
	ctx.font = "24px monospace"
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo( beamX-bx*200, beamY-by*200 );
	ctx.lineTo( beamX+bx*200, beamY+by*200 );
	ctx.stroke();
	//console.log( "ang?", ang );
	ctx.fillStyle = "#333";
	ctx.fillText( "A", beamX-bx*200, beamY-by*200 - 20 );
	ctx.fillText( "B", beamX+bx*200, beamY+by*200 - 20 );

	for( let A = 0; A < b; A++ ) {
		const x = Math.floor(A/10);
		const y = A%10;
		if( A < a ) 
			wedge( 0, Math.PI*2, 8, 10+x*20, beamY + y*20, "#00770080");
		else
			wedge( 0, Math.PI*2, 8, 10+x*20, beamY + y*20, "#77000080" );
	}

	for( let A = 0; A < a; A++ ) {
		const x = Math.floor(A/10);
		const y = A%10;
		if( A < b ) 
			wedge( 0, Math.PI*2, 8, 825-x*20, beamY + y*20, "#00770080");
		else
	
			wedge( 0, Math.PI*2, 8, 825-x*20, beamY + y*20, "#77000080" );
	}


	const g = (a>b)?a:b;
	const m = (a>b)?b:a;

	for( let A = 0; A < g; A++ ) {
		const x = A%30;
		const y = Math.floor(A/30);

		wedge( 0, Math.PI*2, 8, beamX - 15*20+x*20, 90 + y*20, "#0000FF80" );
	}


	for( let A = 0; A < g-m; A++ ) {
		const x = A%30;
		const y = Math.floor(A/30);
		if( a < b )
			wedge( 0, Math.PI*2, 8, beamX - 15*20 +x*20, 10 + y*20, "#77000080");
		else
			wedge( 0, Math.PI*2, 8, beamX - 15*20 +x*20, 10 + y*20, "#00770080");
	}
	ctx.beginPath( );
	ctx.lineWidth = 3;
	ctx.moveTo( 250, 80 );
	ctx.lineTo( 950, 80 );
	ctx.stroke();
	ctx.fillStyle = "black";
	if( a > b ) 
		ctx.fillText( "(A-B)/B", 0, 80 );
	else	
		ctx.fillText( "(A-B)/A", 0, 80 );
	return;

	
        drawHalf( ang1,0 );
        drawHalf( ang1,2 );

	function wedge( from, to, r, centerX, centerY, ca, cb ) {
		ctx.beginPath();
	
		ctx.moveTo( centerX+100 , centerY );
		ctx.lineTo( centerX+100 + r * Math.cos(from*Math.PI/2), centerY  + r * Math.sin( from*Math.PI/2));
		    ctx.arc(centerX+100, centerY, r, from*Math.PI/2,  to*Math.PI/2, false);
		ctx.lineTo( centerX+100 , centerY );
//ctx.closePath();
		    ctx.fillStyle = ca;//"#77000020";
	    ctx.fill();
		if( cb ) {
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = cb;//"red";
	    ctx.stroke();
		}
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

		update();

