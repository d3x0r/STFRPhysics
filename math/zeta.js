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
	myForm.sliderValB.textContent = values.B;
	myForm.sliderValC.textContent = values.C;
	myForm.sliderValD.textContent = values.D;
	drawsomething();
}



//------------------- MATHS --------------------------------------

// 1/2 ^ a+ki 
// 1/2 ^ a +0i  *  0 + 1/2^ki
//
// 

function acos(x) {
	// uncomment this line to cause failure for even 1/2 rotations(at the limit of the other side)
	// return Math.acos(x); // fails on the south pole, which gets inverted back to 0.
	const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
	const plusminus = (x)=>mod( x+1,2)-1;
	const trunc = (x,y)=>x-mod(x,y);
	return Math.acos(plusminus(x));
}
function asin(x) {
	return acos(x)+Math.PI/2;
}

function lnComplex(A,B,C) {
	if( A instanceof lnComplex ) {  // clone
        	this.w = A.w;
        	this.x = A.x;
        	this.y = A.y;
        	this.z = A.z;
                return this;
        }
        if( "number" === typeof C ) {
        	this.w = A;
                this.x = B;
                this.y = C;
                this.z = 0;
                return this;
        }

	//const normQ = Math.sqrt(B*B+C*C+D*D);
	// B /= normQ

	const normAB = Math.sign(A)*Math.sqrt(A*A+B*B);
	//console.log( "input:", A, B, normAB, A/normAB, B/normAB, acos(B/normAB) );
	const angle = asin(B/normAB);
        const axis = [1,0,0];
        this.w = normAB;
        this.x = angle*2;
        this.y = 0;
        this.z = 0;
	return this 
}
// exp(lnC)
function getComplex(lnC ) {
	//console.log( "Both sides have ", lnC.w );
	return { w: lnC.w * Math.cos(Math.abs(lnC.x)/2), x:lnC.w *Math.sin(Math.abs(lnC.x)/2), y:0, z:0 }
}

// does add in ln( exp(A)+exp(B) )  - this is the full form.  ln(A+B) = ln( exp(ln(A))+exp(ln(B)) )  
function lnAdd( A, B ) {
	//console.log( "Add:", A, B );
	const F = A.w*Math.sin( A.x/2 ) + B.w*Math.sin( B.x/2 );
	//console.log( "acos:", F, Math.sin(F), A.w*Math.sin( Math.abs(A.x)/2 ) + B.w*Math.sin( Math.abs(B.x)/2 ) );
	//const F = Math.asin(F_);
	//console.log( "A:", Math.sin( Math.abs(A.x)/2), "B:", Math.sin( Math.abs( B.x)/2), F, Math.sin(F) );
		
	return new lnComplex( A.w*Math.cos(A.x/2)+B.w*Math.cos(B.x/2), F );
	//return new lnComplex( (A.w*Math.cos(A.x/2)+B.w*Math.cos(B.x/2))/Math.cos(F), F*2, , 0 );
}

function pow(N,lnQ){
	const nReal = Math.pow(N,lnQ.w*Math.cos(lnQ.x/2));
        //const nImag = N ^ i;
	const nImag = Math.pow(N, lnQ.w*Math.sin(Math.abs(lnQ.x)/2) );
        return new lnComplex( nReal, nImag );
}

function recipPow(N,lnQ){
	// C(r,t) = r*cos(t/2) + sin(t/2)i   then what does   1/N ^ C(r,t) 
	// 
	const nReal = Math.pow(N,-lnQ.w*Math.cos(lnQ.x/2));
        //const nImag = N ^ i;
	const nImag = lnQ.w*Math.sin( Math.log(N)*lnQ.x/2);
	return new lnComplex( nReal, nImag );
}




function testAdd() {
	{
		const C1 = {A:0.1, B:0.3};
		const C2 = {A:0.25, B:0.2};
		console.log( "A+Bi=", C1.A, C1.B, "C+Di:", C2.A, C2.B, "=E+Fi", C1.A+C2.A, C1.B+C2.B );
		const lnC1 = new lnComplex( C1.A, C1.B );
		//console.log( "exp(lnC1):", getComplex( lnC1 ) );
		const lnC2 = new lnComplex( C2.A, C2.B );
		//console.log( "exp(lnC2):", getComplex( lnC2 ) );
		const lnC3 = lnAdd( lnC1, lnC2 );
		console.log( "lnC1+lnC2 =", getComplex( lnC3 ) );
	}
	{
		const C1 = {A:-0.1, B:0.3};
		const C2 = {A:0.25, B:-0.2};
		console.log( "A+Bi=", C1.A, C1.B, "C+Di:", C2.A, C2.B, "=E+Fi", C1.A+C2.A, C1.B+C2.B );
		const lnC1 = new lnComplex( C1.A, C1.B );
		//console.log( "exp(lnC1):", getComplex( lnC1 ) );
		const lnC2 = new lnComplex( C2.A, C2.B );
		//console.log( "exp(lnC2):", getComplex( lnC2 ) );
		const lnC3 = lnAdd( lnC1, lnC2 );
		console.log( "lnC1+lnC2 =", getComplex( lnC3 ) );
	}
	{
		const C1 = {A:-0.1, B:-0.3};
		const C2 = {A:-0.25, B:0.2};
		console.log( "A+Bi=", C1.A, C1.B, "C+Di:", C2.A, C2.B, "=E+Fi", C1.A+C2.A, C1.B+C2.B );
		const lnC1 = new lnComplex( C1.A, C1.B );
		//console.log( "exp(lnC1):", getComplex( lnC1 ) );
		const lnC2 = new lnComplex( C2.A, C2.B );
		//console.log( "exp(lnC2):", getComplex( lnC2 ) );
		const lnC3 = lnAdd( lnC1, lnC2 );
		console.log( "lnC1+lnC2 =", getComplex( lnC3 ) );
	}
	{
		const C1 = {A:0.1, B:-0.3};
		const C2 = {A:-0.25, B:-0.2};
		console.log( "A+Bi=", C1.A, C1.B, "C+Di:", C2.A, C2.B, "=E+Fi", C1.A+C2.A, C1.B+C2.B );
		const lnC1 = new lnComplex( C1.A, C1.B );
		//console.log( "exp(lnC1):", getComplex( lnC1 ) );
		const lnC2 = new lnComplex( C2.A, C2.B );
		//console.log( "exp(lnC2):", getComplex( lnC2 ) );
		const lnC3 = lnAdd( lnC1, lnC2 );
		console.log( "lnC1+lnC2 =", getComplex( lnC3 ) );
	}
}
//testAdd();




function drawsomething() {
	let x, y, z, w, X, Y, Z, W;
	const squareSize = 1024;
	const minScaleX = -Math.PI*3.1;
	const maxScaleX = Math.PI*4.5;

	const minScaleY = -8;
	const maxScaleY = 8;

	const delStep = (min,max,x)=>( (max-min)/x );
	const stepX = (x)=>( (maxScaleX-minScaleX)/x );
	const stepY = (x)=>( (maxScaleY-minScaleY)/x );
	const unitX = (x)=>Math.floor( squareSize/2 + (x * squareSize/(maxScaleX-minScaleX) ) );
	const unitY = (x)=>Math.floor( squareSize/2 + (x * squareSize/(maxScaleY-minScaleY) ) );
	const unit2 = (x)=>x;
	const rangeX = maxScaleX-minScaleX;
	const rangeY = maxScaleY-minScaleY;

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


	let prior = null;
	for( x = minScaleY; x < maxScaleY; x+= stepY(100 ) ) {
		for( y = -2; y < 2; y++ ) {
			plot( y*Math.PI, x, pens[6]);
		}
	}
	let drewBar = minScaleX;
	for( x = minScaleX; x < maxScaleX; x+= stepX(1000 ) ) {
		plot( x, 0, pens[5] );
		plot( x, Math.PI/2, pens[4] );
		plot( x, -Math.PI/2, pens[4] );
		plot( x, Math.PI, pens[7] );
		plot( x, -Math.PI, pens[7] );

		
	}	


	let sum = new lnComplex(1,0);//{r:1, i:0}; // 1/1^(a+bi) = 1+1/bi
	
        let lnC = new lnComplex(values.A,values.B);
        //console.log(" got:", lnC );
        for( var n = 2; n < 200; n++ ){
        	const lnRP = recipPow( n, lnC );
		let rx1 = lnRP.w;
		let ry1 = lnRP.x;
		if( rx1 > 10 ) rx1= 10;
		if( rx1 < -10 ) rx1= -10;
		if( ry1 > 10 ) ry1= 10;
		if( ry1 < -10 ) ry1= -10;
		
		line( 0, 0, rx1, ry1, pens[4] );
		const newSum = lnAdd( sum, lnRP );
		const c1 = getComplex( sum );
		const c2 = getComplex( newSum );
		if( c1.w < -100 ) c1.w = -100;
		if( c1.w > 100 ) c1.w = 100;
		if( c1.x < -100 ) c1.x = -100;
		if( c1.x > 100 ) c1.x = 100;
		if( c2.w < -100 ) c2.w = -100;
		if( c2.w > 100 ) c2.w = 100;
		if( c2.x < -100 ) c2.x = -100;
		if( c2.x > 100 ) c2.x = 100;
		line( c1.w, c1.x, c2.w, c2.x, pens[2] );
		let x1 = sum.w
		let y1 = sum.x
		let x2 = newSum.w
		let y2 = newSum.x
		if( x1 > 10 ) x1= 10;
		if( x1 < -10 ) x1= -10;
		if( y1 > 10 ) y1= 10;
		if( y1 < -10 ) y1= -10;
		if( x2 > 10 ) x2= 10;
		if( x2 < -10 ) x2= -10;
		if( y2 > 10 ) y2= 10;
		if( y2 < -10 ) y2= -10;
		line( x1, y1, x2, y2, pens[3] );
		sum = newSum;
                //console.log( "sum:", N, lnRP, getComplex( sum ) );
        }
	console.log( "Sum:", sum, getComplex( sum ) );
	//line( 0.5, 0.5, 0.6, 1.75, pens[1] );
	//line( -5.3, 0.5, 8.6, 1.75, pens[2] );

	

	for( x = minScaleX; x < maxScaleX; x+= stepX(1000 ) ) {
	}
	ctx.putImageData(_output, 0,0);

	return;


	function plot( x_, y_, c ) {
		const x = unitX(x_);
		const y = unitY(-y_);
		output[((x+y*squareSize)<<2)+0] = c[0];
		output[((x+y*squareSize)<<2)+1] = c[1];
		output[((x+y*squareSize)<<2)+2] = c[2];
		output[((x+y*squareSize)<<2)+3] = c[3];
	}
	
	function line( x1, y1, x2, y2, c ) {
		const realX1 = unitX(x1);
		const realY1 = unitY(-y1);
		const realX2 = unitX(x2);
		const realY2 = unitY(-y2);
		const realLen = Math.sqrt( (realX2-realX1)*(realX2-realX1)  + (realY2-realY1)*(realY2-realY1) );
		x1 *= realLen;
		y1 *= realLen;
		x2 *= realLen;
		y2 *= realLen;
		// scale coordinates to a unit-pixel size...

		var err, delx, dely, len, inc;
		//if( !pImage || !pImage->image ) return;
		delx = x2 - x1;
		if( delx < 0 )
			delx = -delx;
        
		dely = y2 - y1;
		if( dely < 0 )
			dely = -dely;
        
		if( dely > delx ) // length for y is more than length for x
		{
			len = dely;
			if( y1 > y2 )
			{
				var tmp = x1;
				x1 = x2;
				x2 = tmp;
				y1 = y2; // x1 is start...
			}
			if( x2 > x1 )
				inc = 1;
			else
				inc = -1;
        
			err = -(dely / 2);
			while( len >= 0 )
			{
				plot( x1/realLen, y1/realLen, c );
				y1++;
				err += delx;
				while( err >= 0 )
				{
					err -= dely;
					x1 += inc;
				}
				len--;
			}
		}
		else
		{
			if( !delx ) // 0 length line
				return;
			len = delx;
			if( x1 > x2 )
			{
				var tmp = y1;
				y1 = y2;
				y2 = tmp;
				x1 = x2; // x1 is start...
			}
			if( y2 > y1 )
				inc = 1;
			else
				inc = -1;
        
			err = -(delx / 2);
			while( len >= 0 )
			{
				plot(  x1/realLen, y1/realLen, c );
				x1++;
				err += dely;
				while( err >= 0 )
				{
					err -= delx;
					y1 += inc;
				}
				len--;
			}
		}
        
	}
	

}

