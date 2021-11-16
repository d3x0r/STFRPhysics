
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

myForm.sliderA.oninput = myForm.sliderValA.oninput = readValues;
myForm.sliderB.oninput = myForm.sliderValB.oninput = readValues;
myForm.sliderC.oninput = myForm.sliderValC.oninput = readValues;
myForm.sliderD.oninput = myForm.sliderValD.oninput = readValues;

function readValues()  {
	values.A = (Number(myForm.sliderA.value)/10.0)-5;
	values.B = (Number(myForm.sliderB.value)/10.0)-5;
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

const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
const plusminus = (x)=>mod( x+1,2)-1;
 
const trunc = (x,y)=>x-mod(x,y);



function drawsomething() {
	let x, y, z, w, X, Y, Z, W;
	const squareSize = 1024;
	const minScale = -5;
	const maxScale = 5;

	const delStep = (min,max,x)=>( (max-min)/x );
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
		
	

	const data = [0,3,0,0,0,3,0,0,0,0,3];
	const data2 = [0,2.9,2.5,2.2,3.2,2.5,3.5,0,0,3];

	const scalar = (values.A+5)*30 +1;
	y = 0;
	for( x = minScale; x < maxScale; x+= step(1000) ) {
		y = (y*(scalar-1)+data[Math.floor(x)+5])/scalar;

		plot( x, y, pens[0] );
	}

	for( x = minScale; x < maxScale; x+= step(1000) ) {
		y = data[Math.floor(x)+5];

		plot( x, y, pens[6] );
	}

	y = 0;
	for( x = minScale; x < maxScale; x+= step(1000) ) {
		y = (y*(scalar-1)+data2[Math.floor(x)+5])/scalar;

		plot( x, y, pens[1] );
	}


	for( x = minScale; x < maxScale; x+= step(1000) ) {
		y = data2[Math.floor(x)+5];

		plot( x, y, pens[7] );
	}

	ctx.putImageData(_output, 0,0);

}

try {
	drawsomething();
}catch(err) {
	alert( "GotError:"+err );
}
