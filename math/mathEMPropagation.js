// https://www.geogebra.org/3d/qxejdpty
//https://www.geogebra.org/3d/sadtqz3x


const canvas = document.getElementById( "testSurface" );
const ctx = canvas.getContext( '2d' );

const BASE_COLOR_WHITE = [255,255,255,255];
const BASE_COLOR_BLACK = [0,0,0,255];
const BASE_COLOR_RED = [255,0,0,255];
const BASE_COLOR_BLUE = [0,0,255,255];
const BASE_COLOR_GREEN = [0,255,0,255];
let invertCurvature =false;

function ColorAverage( a, b, i,m) {

    var c = [ (((b[0]-a[0])*i/m) + a[0])|0,
        (((b[1]-a[1])*i/m) + a[1])|0,
        (((b[2]-a[2])*i/m) + a[2])|0,
		(((b[3]-a[3])*i/m) + a[3])|0
    ];
    //console.log( "color: ", a, b, c, i, ((b[1]-a[1])*i/m)|0, a[1], ((b[1]-a[1])*i/m) + a[1] )
    return c;//`#${(c[0]<16?"0":"")+c[0].toString(16)}${(c[1]<16?"0":"")+c[1].toString(16)}${(c[2]<16?"0":"")+c[2].toString(16)}`
}


const myForm = {
	sliderA : document.getElementById( "A" ),
	sliderB : document.getElementById( "B" ),
	sliderC : document.getElementById( "C" ),
	sliderD : document.getElementById( "D" ),
	sliderAmax : document.getElementById( "Amax" ),
	sliderBmax : document.getElementById( "Bmax" ),
	sliderCmax : document.getElementById( "Cmax" ),
	sliderDmax : document.getElementById( "Dmax" ),
	sliderValA : document.getElementById( "Aval" ),
	sliderValB : document.getElementById( "Bval" ),
	sliderValC : document.getElementById( "Cval" ),
	sliderValD : document.getElementById( "Dval" ),
	invertCurvature : document.getElementById( "invertCurvature" )
}

// area of a triangle

const values = {A:0.0,Amax:0,B:0.0,C:0.0,D:0.0};
myForm.invertCurvature.oninput =  myForm.sliderA.oninput = myForm.sliderValA.oninput = readValues;
if(myForm.sliderAmax) myForm.sliderAmax.oninput = readValues;
myForm.sliderB.oninput = myForm.sliderValB.oninput = readValues;
myForm.sliderC.oninput = myForm.sliderValC.oninput = readValues;
myForm.sliderD.oninput = myForm.sliderValD.oninput = readValues;

myForm.sliderA.value = 0;
if(myForm.sliderAmax) myForm.sliderAmax.value = 0;
myForm.sliderB.value = 0;

function readValues()  {
	values.A = (Number(myForm.sliderA.value)/20.0);
	values.Amax = (myForm.sliderAmax)? (Number(myForm.sliderAmax.value)/20.0):0;
	values.B = (Number(myForm.sliderB.value)/20.0);
	values.B *= 5;
	values.C = (Number(myForm.sliderC.value)/10.0)-5;
	values.D = (Number(myForm.sliderD.value)/10.0)-5;
	myForm.sliderValA.textContent = values.A;
	myForm.sliderValB.textContent = values.B;
	myForm.sliderValC.textContent = values.C;
	myForm.sliderValD.textContent = values.D;
	drawsomething();
	//drawQuatTwist();
}



//---------------------- MATH -------------------------------------------------

let mouseX=0, mouseY=0;

	const squareSize = 1000;
	const minScale = -5;
	const maxScale = 5;

	const delStep = (min,max,x)=>( (max-min)/x );
	const step = (x)=>( (maxScale-minScale)/x );
	const unit = (x)=>Math.floor( squareSize/2 + (x * squareSize/(maxScale-minScale) ) );
	const unit2 = (x)=>x;
	const range = maxScale-minScale;
	const zero = -minScale;
	const pens = [ ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLACK, 0,9)
			,ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_BLACK, 0,9) 
			,ColorAverage( BASE_COLOR_BLUE, BASE_COLOR_BLACK, 0,9) 

	                ,ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLACK, 3,9)
			,ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_BLACK, 3,9) 
			,ColorAverage( BASE_COLOR_BLUE, BASE_COLOR_BLACK, 3,9) 

			, ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLACK, 6,9)
			,ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_BLACK, 6,9) 
			,ColorAverage( BASE_COLOR_BLUE, BASE_COLOR_BLACK, 6,9) 
		];


canvas.addEventListener( "mousemove", (e)=>{
	const rect = canvas.getBoundingClientRect();
	const w = rect.right-rect.left;//window.innerWidth;
	const h = rect.bottom-rect.top;//window.innerHeight;
	const x = (((e.clientX-rect.left)-(w/2.0))/w) * 10;
	const y = -(((e.clientY-rect.top)-(h/2.0))/h) * 10;
	mouseX = x;
	mouseY = y;
//	drawsomething();
} );

let start = 0;//performance.now();

function drawsomething() {
	let x, y, z, w, X, Y, Z, W;

	ctx.clearRect(0,0,squareSize,squareSize );
	ctx.beginPath ();	

	let del = performance.now() - start;
	start += del;
	
	let atsec = (start % 10000);

	const sa = atsec/1000;
	const sa05 = sa + 0.5;

	const n = Math.floor( sa );
	const n05 = Math.floor( sa05 );

	const n1 = Math.floor( atsec/1000 + 1 );

	const s = Math.sin( atsec * Math.PI/2 / 1000 );
//	const ss = s*s;
	const ss = Math.abs((sa+1)%2-1)
	const c = Math.cos( atsec * Math.PI/2 / 1000 );
//	const cc = c*c;

	const cc = Math.abs(sa%2-1)

	const dd = Math.abs((sa+0.5)%2-1)
	const ee = Math.abs((sa-0.5+10)%2-1)

	let from = Math.floor( n/4 ) * 200 + 150;
	let to = Math.floor( n/4 ) * 200 + 100  ;
	let f2 = 25;
	let t2 = 25;

	let f1 = 0;
	let t1 = 0;

	const from2 = Math.floor( n05/4 ) * 200+150;
	const to2 = Math.floor( n05/4 ) * 200 + 100 ;

//	if( Math.floor(n/4) )
	switch( n05%4 ){
	case 0:
		t2 = 25;
		f2 = -75;
		break;
	case 1:
		t2 = 25;
		f2 = 25;
		break;
	case 2:
		t2 = 125;
		//f2 = 75;
		f2 = 25
		break;
	case 3:
		t2 = 125;
		f2 = 125
		break;
	}
	switch( n%4 ){
	case 0:
		break;
	case 1:
		t1 = 100;
		break;
	case 2:
		f1 = 100;		
		t1 = 100;
		break;
	case 3:
		f1 = 100;		
		t1 = 200;
		break;
	}

	
	ctx.beginPath();
	ctx.strokeStyle = "green";  // starts max, at origin, and +100
	{
		ctx.moveTo( sa * 50 + 150, 480 );
		ctx.lineTo( sa * 50 + 150, 520 );
		ctx.stroke();
	}


	ctx.beginPath();
	ctx.strokeStyle = "magenta";  // starts max, at origin, and +100
		ctx.moveTo( sa * 50 + 50, 480 );
		ctx.lineTo( sa * 50 + 50, 520 );
		ctx.stroke();
	


	for( let a = 0; a <= n+1; a++ ) {
		
		ctx.beginPath();
		ctx.strokeStyle = "green";  // starts max, at origin, and +100
		
		ctx.moveTo( 100 + a * 50, 450 );
		ctx.lineTo( 100+a * 50, 480 );
		ctx.stroke();

	}


	ctx.beginPath();
	ctx.strokeStyle = "red"; // starts min, at +50
	ctx.arc( (from+f1) , 500, ss * 50, 0, Math.PI*2 );
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "blue";  // starts max, at origin, and +100
	ctx.arc( (to+t1) , 500, cc * 50, 0, Math.PI*2 );
	ctx.ellipse( (to+t1) , 500, cc*10, cc * 50, 0, 0, Math.PI*2 );
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "#088"; // starts min, at +50
	ctx.arc( (from2+f2) , 500, dd * 50, 0, Math.PI*2 );
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "#880";  // starts max, at origin, and +100
	ctx.arc( (to2+t2) , 500, ee * 50, 0, Math.PI*2 );
	ctx.stroke();


	ctx.fillStyle="black";
	ctx.fillText( ""+n + " " + n05, 400, 400 );
	requestAnimationFrame( drawsomething );	

}

try {
	drawsomething();
}catch(err) {
	alert( "GotError:"+err );
}
