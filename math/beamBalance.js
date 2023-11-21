
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
span.textContent = "Tilt Angle: ";
controls.appendChild( span );

const tiltText = document.createElement( "span" );
tiltText.textContent = "0°";
controls.appendChild( tiltText );

	span = document.createElement( "br" );
	controls.appendChild( span );


span = document.createElement( "span" );
span.textContent = "Quantum Mechanics: ";
controls.appendChild( span );


const cm_tiltText = document.createElement( "span" );
cm_tiltText.textContent = "0°";
controls.appendChild( cm_tiltText );


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
	const cm_tilt = a==b?0:-Math.cos(Math.PI*a/(a+b));
	
	tiltText.textContent = (tilt*90).toFixed(3)+"°";
	cm_tiltText.textContent = (cm_tilt*90).toFixed(3)+"°" + "  (" + ((cm_tilt-tilt)*90).toFixed(3) + "° delta)";

	const bx = Math.cos( Math.PI/2 * tilt );
	const by = Math.sin( Math.PI/2 * tilt );
	const cm_bx = Math.cos( Math.PI/2 * cm_tilt );
	const cm_by = Math.sin( Math.PI/2 * cm_tilt );

	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 1;
	ctx.moveTo( beamX-cm_bx*200, beamY-cm_by*200 );
	ctx.lineTo( beamX+cm_bx*200, beamY+cm_by*200 );
	ctx.stroke();

	
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = 3;
	ctx.moveTo( beamX-bx*200, beamY-by*200 );
	ctx.lineTo( beamX+bx*200, beamY+by*200 );
	ctx.stroke();

	/* fulcrum */
	ctx.beginPath();
	ctx.fillStyle = "green";
	ctx.lineWidth = 3;
	if( (a+b) === 0 ) {
		ctx.moveTo( beamX, beamY + 2+0*200 );
		ctx.lineTo( beamX - 5, beamY + 2+0*200 + 10 );
		ctx.lineTo( beamX + 5, beamY + 2+0*200 + 10 );
	} else {
		ctx.moveTo( beamX+(2*(a)/(a+b)-1)*200, beamY + 2+0*200 );
		ctx.lineTo( beamX+(2*(a)/(a+b)-1)*200 - 5, beamY + 2+0*200 + 10 );
		ctx.lineTo( beamX+(2*(a)/(a+b)-1)*200 + 5, beamY + 2+0*200 + 10 );
	}
	ctx.fill();

	ctx.beginPath();
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	if( a > b ) {
		ctx.strokeStyle = "blue";
		ctx.moveTo( beamX-1*200, beamY+3-0*200 );
		ctx.lineTo( beamX-(2*b/(a+b)-1)*200, beamY+3+0*200 );
	} else {
		ctx.moveTo( beamX-1*200, beamY+3-0*200 );
		ctx.lineTo( beamX-(1-(2*a)/(b+a))*200, beamY+3+0*200 );
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.lineWidth = 3;
	if( a > b ) {
		ctx.moveTo( beamX+((2*a)/(a+b)-1)*200, beamY-0*200 );
		ctx.lineTo( beamX+1*200, beamY+0*200 );
	} else {
		ctx.moveTo( beamX-(1-(2*a)/(a+b))*200, beamY-0*200 );
		ctx.lineTo( beamX+1*200, beamY+0*200 );
	}
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = "orange";
	ctx.lineWidth = 3;
	if( a > b ) {
	ctx.strokeStyle = "purple";
		const len = 1-2*(2*b)/(a+b);
		ctx.moveTo( beamX+(2*(a)/(a+b)-1)*200, beamY-3 );
		ctx.lineTo( beamX+(len)*200, beamY-3 );
	} else {
		if( !b ) {
			ctx.moveTo( beamX-0, beamY-3 );
			ctx.lineTo( beamX+1*200, beamY-3 );
		}else {
			const len = (2*(2*a)/(b+a)-1);
			ctx.moveTo( beamX+(1-(2*b)/(a+b))*200, beamY-3 );
			ctx.lineTo( beamX+(len)*200, beamY-3 );
		}
	}
	ctx.stroke();


	//console.log( "ang?", ang );
	ctx.fillStyle = "#333";
	ctx.font = "24px monospace"
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
	ctx.strokeStyle="black";
	ctx.lineWidth = 3;
	ctx.moveTo( 250, 80 );
	ctx.lineTo( 950, 80 );
	ctx.stroke();

	ctx.beginPath( );
	ctx.strokeStyle="black";
	ctx.lineWidth = 3;
	ctx.moveTo( 250, 80 );
	ctx.lineTo( 950, 80 );
	ctx.stroke();
	ctx.fillStyle = "black";
	if( a > b ) {
		ctx.fillText( "(B-A)", 180, 60 );
		ctx.fillText( "B", 200, 100 );
		ctx.fillText( "(B-A)/B", 0, 80 );
	} else {
		ctx.fillText( "(A-B)", 180, 60 );
		ctx.fillText( "A", 200, 100 );
		ctx.fillText( "(A-B)/A", 0, 80 );
	}
	return;

	
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
}

		update();

