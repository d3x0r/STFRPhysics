
const canvas = document.getElementById( "testSurface" );
const ctx = canvas.getContext( '2d' );

const BASE_COLOR_WHITE = [255,255,255,255];
const BASE_COLOR_BLACK = [0,0,0,255];
const BASE_COLOR_RED = [255,0,0,255];
const BASE_COLOR_BLUE = [0,0,255,255];
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


const myForm = {
	sliderA : document.getElementById( "A" ),
	sliderB : document.getElementById( "B" ),
	sliderC : document.getElementById( "C" ),
	sliderD : document.getElementById( "D" ),
	sliderValA : document.getElementById( "Aval" ),
	sliderValB : document.getElementById( "Bval" ),
	sliderValC : document.getElementById( "Cval" ),
	sliderValD : document.getElementById( "Dval" ),
}

// area of a triangle

const values = {A:0.0,B:0.0,C:0.0,D:0.0};

myForm.sliderA.oninput = readValues;
myForm.sliderB.oninput = readValues;
myForm.sliderC.oninput = readValues;
myForm.sliderD.oninput = readValues;

function readValues()  {
	values.A = (Number(myForm.sliderA.value)/10.0)-5;
	values.B = (Number(myForm.sliderB.value)/10.0)-5;
	values.C = (Number(myForm.sliderC.value)/10.0)-5;
	values.D = (Number(myForm.sliderD.value)/10.0)-5;
	myForm.sliderValA.textContent = values.A;
	myForm.sliderValB.textContent = (values.B/5)*90;
	myForm.sliderValC.textContent = values.C;
	myForm.sliderValD.textContent = values.D;
	drawsomething();
	//drawQuatTwist();
}



//---------------------- MATH -------------------------------------------------

const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
const plusminus = (x)=>mod( x+1,2)-1;
const trunc = (x,y)=>x-mod(x,y);
const cyc = (x)=>mod(x,4);

function sn(x) {	
	return Math.abs(-Math.abs(cyc(x)-1)+2)-1
}

function cs(x) {
	return Math.abs(-Math.abs(cyc(x))+2)-1
}

// place holder for the type information mostly.
//newArccos(x)=cos^(-1)(md(x+1,2)-1)+(-x-1+md(x+1,2)) (p)/(2)

function asin(sin, i) {
	if( "number" === typeof sin ) {
		return new complexNumber( Math.asin(plusminus(sin)), (trunc((sin+1),2)+0), i );;
	} else if( sin instanceof baseNumber ) {
		return new complexNumber( Math.asin((sin.r+1)%2-1), a.r/2, i );
	//} else if( sin instanceof vecA ) {
	//	return cos;             
	//} else if( sin instancof ln ) {
	//	return cos;
	}else{
		throw new Error(  "arcsin doesn't know how to handle:" + sin );
	}
}



function drawsomething() {
	let x, y, z, w, X, Y, Z, W;
	const squareSize = 1024;
	const minScale = -5;
	const maxScale = 5;
	const minAngle = 0;
	const maxAngle = 1*values.A;

	const delStep = (min,max,x)=>( (max-min)/x );
	const stepAngle = (x)=>( (maxAngle-minAngle)/x );
	const stepRange = (mn,mx,x)=>( (mx-mn)/x );
	const step = (x)=>( (maxScale-minScale)/x );
	const unit = (x)=>Math.floor( squareSize/2 + (x * squareSize/(maxScale-minScale) ) );
	const unit2 = (x)=>x;
	const range = maxScale-minScale;
	const zero = -minScale;

	ctx.clearRect(0,0,squareSize,squareSize );
	var _output = ctx.getImageData(0, 0, squareSize, squareSize );
	var output = _output.data;

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



	function plot( x_, y_, c ) {
		const x = unit(x_);
		const y = unit(-y_);
		output[((x+y*squareSize)<<2)+0] = c[0];
		output[((x+y*squareSize)<<2)+1] = c[1];
		output[((x+y*squareSize)<<2)+2] = c[2];
		output[((x+y*squareSize)<<2)+3] = c[3];
	}
		
	for( x = minAngle; x < maxAngle; x+= stepAngle(1000) ) {
		const s = sn(x)*4.1;
		const c = cs(x)*4.1;
		const l1 = Math.abs(s)+Math.abs(c);
		const l2 = Math.sqrt(s*s+c*c)

		const s2 = Math.sin(x*Math.PI/2)*4.1;
		const c2 = Math.cos(x*Math.PI/2)*4.1;
		plot( c, s, pens[2] );
		plot( c2, s2, pens[0] );
		plot( c*l1/l2, s*l1/l2, pens[1] );

		const e1 = s2 - (s*l1/l2);
		const e2 = c2 - (c*l1/l2);

		plot( e2, e1, ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLACK, x,maxAngle)  );

		if( Math.abs(x-values.B/5) < 0.001 ) {
			for( y = 0; y < 1; y+= stepRange(0,1,100) ) {

				plot( c*y, s*y,  BASE_COLOR_GREEN );
				plot( Math.cos(x*Math.PI/2)*4*y, Math.sin(x*Math.PI/2)*4*y, BASE_COLOR_RED );
		
			}
		}

	}




	ctx.putImageData(_output, 0,0);

}

try {
	drawsomething();
}catch(err) {
	alert( "GotError:"+err );
}

