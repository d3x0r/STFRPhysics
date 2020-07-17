
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
	//drawsomething();
	drawQuatTwist();
}



//---------------------- MATH -------------------------------------------------

const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
const plusminus = (x)=>mod( x+1,2)-1;
 
const trunc = (x,y)=>x-mod(x,y);



// place holder for the type information mostly.
function complex(a,b) {
	this.a = a;
        this.b = b;
}

function vecS( a,b,d ) {
	if( d !== "undefined" ) {
        	
        } else {
        	this.sin=Math.sin(a);
                this.cos=Math.cos(a);
        }
}

// this is a lot like baseNumber ;; but we do want a specific type. 
// this has no imaginary/rotational parts; it represents the recangular grid coordinate.
class realNumber {
	r= 0;	
	constructor( a) {
		r=a;
	}
	add(a) { return r.add(a) };
	sub(a) { return r.add(a) };
	mul(a) { return r.add(a) };
	div(a) { return r.add(a) };
	add2(a) { return r.add2(a) };
	sub2(a) { return r.add2(a) };
	mul2(a) { return r.add2(a) };
	div2(a) { return r.add2(a) };
}

class frameA {
	axisPos   = {x:0,y:1,z:0};
	anglesPos = {x:0,y:0,z:0};
	axisVel   = {x:0,y:1,z:0};
	anglesVel = {x:0,y:0,z:0};
	axisAcc   = {x:0,y:1,z:0};
	anglesAcc = {x:0,y:0,z:0};
	constructor() {
		// I know; always thinking ahead... 
	}
}

class vecA {
	axis   = {x:0,y:1,z:0};
	angles = {x:0,y:0,z:0};
	constructor( angle,axis )  {
		this.angle = angle;
        	this.axis = axis;
	}

	ln(a) {
		if( a instanceof vecA ) {
        		const angle = z_acos( a.cos );
        	        const angle2 = asin( a.sin );
	                const axis = 1;
        		return new lnC( angle, axis );
        	} else {
	        	const value=1;
			return new lnC();
        	}
	}


}



// g_{1}(x)=cos^(-1)(B-cos(x))
// 
function z_acos(cos, zero) {

	//newArccos(x)=cos^(-1)(md(x+1,2)-1)+(-x-1+md(x+1,2)) 
	if( "number" === typeof cos ) {
		//if( cos < 0 ) 
		//console.log( "MOD:", cos%2, cos, "SPIN:", (cos-((cos+1)%2))*Math.PI/2  );
		return new complexNumber(  Math.acos(plusminus(cos)), -(trunc((cos+1),2)+0), zero );
	} else if( cos instanceof baseNumber ) {
		return new complexNumber( Math.acos( ((cos.r+1)%2-1), (-cos.r-1+md(cos.r+1,2)) ), zero ) ;
	} else if( cos instanceof vecA ) {
		return cos;
	//} else if( cos instancof ln ) {
	//	return cos;
	}else{
		throw new Error(  "arccos doesn't know how to handle:"+ cos  );
	}
}


function gamma( a, b ) {
	this.a = a;
	this.b = b;
}




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




class baseNumber {
	r = 0;
	constructor(a) {
		this.r = a;
	}
	toString() {
		return ''+this.r;
	}
	add(a) {
		this.r += a.r;
		return this;
	}
	add2(a,b) {
		return new baseNumber( this.r + a.r );
	}
	mult(a) {
		this.r *= a.r;
		return this;
	}
	mult2(a) {
		return new baseNumber( this.r * a.r );
	}
}
const base2 = new baseNumber(2);
Object.freeze( base2 );
const baseNeg1 = new baseNumber(-1);
Object.freeze( baseNeg1 );

class dualNumber {
	r = new baseNumber(0);
	e = new baseNumber(0);

	constructor(a,b) {
		if( "number" === typeof a ) a = new baseNumber(a);
		if( "number" === typeof b ) b = new baseNumber(b);
		this.r = a;
		this.e = b;
	}
	toString(){ return   `[ ${this.r.toString()}, ${this.e.toString()} ]`  }
	add(a) {
		if( !(a instanceof dualNumber) ) throw new Error( "Can only add dual to dual" );
		this.r.add( a.r );
		this.e.add( a.e );
		return this;
	}
	add2(a) {
		if( !(a instanceof dualNumber) ) throw new Error( "Can only add dual to dual" );
		return new dualNumber( this.r, this.e ).add( a.e );
	}
	mult(a) {
		if( a === baseNeg1 ) a = dualNeg1;
		if( !(a instanceof dualNumber) ) throw new Error( "Can only add dual to dual" );
		this.r.mult( a.r );
		this.e.mult( this.r.mult2( base2 ) );
		return this;
	}
	mult2(a) {
		if( !(a instanceof dualNumber) ) throw new Error( "Can only add dual to dual" );
		return new dualNumber( this.r, this.e ).mult( this.e );
	}
}

const dualNeg1 = new dualNumber(-1,0)
Object.freeze( dualNeg1 );

class complexNumber {
	r = new baseNumber(0);
	i = new baseNumber(0);
	g = new baseNumber(0);
	constructor(a,b,c) {
		if( "number" === typeof a ) a = new baseNumber(a);
		if( "number" === typeof b ) b = new baseNumber(b);
		this.r = a;
		this.i = b;
		if( c ) this.g = c;
		if( Number.isNaN(this.r.r) ) throw new Error( "FAIL" );
	}
	toString()  { return `< ${this.r.toString()}, ${this.i.toString()} >`  }

	add(a) {
		if( !(a instanceof complexNumber) ) throw new Error( "Can only add complex to comple" );
		this.r.add( a.r );
		this.e.add( a.e );
		this.g.add( a.g );
		return this;
	}
	add2(a) {
		if( !(a instanceof complexNumber) ) throw new Error( "Can only add complex to comple" );
		const r = new complexNumber( this.r, this,i, this,g );
		return r.add( a );
	}
	mult(a) {
		if( !(a instanceof complexNumber) ) throw new Error( "Can only add complex to comple" );
		const _oldR = this.r;
		this.r = this.r.mult2( a.r ).add( this.i.mult2(a.i).mult( baseNeg1 ) );
		this.i = _oldR.mult2( a.i ).add( this.i.mult2(a.r) );
		return this;
	}
	mult2(a) {
		if( !(a instanceof complexNumber) ) throw new Error( "Can only add complex to comple" );
		const r = new complexNumber( this.r, this.i, this.g );
		return r.mult( a );
	}
}
const complexNeg1 = new complexNumber(-1,0);
Object.freeze( dualNeg1 );

class  logComplex { // not really, just this is what we're really working in.
	r = new baseNumber(0); // exp(0) = 1
	angle = new baseNumber(0);

	exp(lc) {
		// rectangular exponent
        	//return new complex( 
		const r = new complexNumber( Math.cos( angle )*Math.exp(r), Math.sin(angle)*Math.exp(r) );
		return r;
	}

		

}


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
		
	for( x = minScale; x < maxScale; x+= step(1000) ) {
		plot( x, plusminus(x), pens[2] );
//		plot( x, Math.acos(plusminus(x)), pens[1] );
		//plot( x, Math.floor(x), pens[1] );
		const ac = z_acos(x);
		plot( x, ac.i.r, pens[1] );
		plot( x,  + ac.r.r + ac.i.r*Math.PI/2, pens[0] );

		plot( x, Math.PI*(x-1)/2     + ac.r.r + ac.i.r*Math.PI/2, pens[0] );
		plot(  Math.PI*(x-1)/2     + ac.r.r + ac.i.r*Math.PI/2, -x,pens[0] );

		plot( -x, Math.PI*(x-1)/2     + ac.r.r + ac.i.r*Math.PI/2, pens[2] );
		plot(  Math.PI*(x-1)/2     + ac.r.r + ac.i.r*Math.PI/2, x,pens[2] );


		plot( x, Math.cos(x*Math.PI), pens[3] );
		const as = asin(x);
		plot( x, as.i.r, pens[1] );
		plot( x, as.r.r, pens[0] );

		plot( x, Math.sqrt(ac.r.r*ac.r.r + as.r.r*as.r.r ), pens[1] );
		plot( x, ac.r.r*as.r.r , pens[1] );
		//plot( x,x%2, pens[2] );
	}

	for( x = minScale; x < maxScale; x+= step(1000) ) {
		plot( x, plusminus(x), pens[2] );
//		plot( x, Math.acos(plusminus(x)), pens[1] );
		//plot( x, Math.floor(x), pens[1] );
		const ac = z_acos(x+values.A);
		plot( x, ac.i.r, pens[1] );
		plot( x,  + ac.r.r + ac.i.r*Math.PI/2, pens[0] );

		plot( x, Math.PI*(x-1)/2     + ac.r.r + ac.i.r*Math.PI/2, pens[0] );
		plot(  Math.PI*(x-1)/2     + ac.r.r + ac.i.r*Math.PI/2, -x,pens[0] );

		plot( -x, Math.PI*(x-1)/2     + ac.r.r + ac.i.r*Math.PI/2, pens[2] );
		plot(  Math.PI*(x-1)/2     + ac.r.r + ac.i.r*Math.PI/2, x,pens[2] );


		plot( x, Math.cos(x*Math.PI), pens[3] );
		const as = asin(x+values.A);
		plot( x, as.i.r, pens[1] );
		plot( x, as.r.r, pens[0] );

		plot( x, ac.i.r*ac.i.r + as.i.r*as.i.r, pens[1] );

		//plot( x,x%2, pens[2] );
	}


	{
		for( x = minScale; x < maxScale; x+= step(1000) ) {
			plot( x, 0, pens[0] );
		}
		for( x = Math.ceil(minScale); x <= Math.floor(maxScale); x++ ) {
			for( y = -0.5; y < 0.5; y += delStep(-0.5,0.5,50 ) )  {
				plot( x, y, pens[0] );
				plot( y, x, pens[1] );
				plot( x*Math.PI/2, y, pens[6] );
				plot( y, x*Math.PI/2, pens[7] );
			}
		}
	        
		for( x = minScale; x < maxScale; x+= step(1000) ) {
			if( Math.abs( ( x % 0.5 ) - 0.25 ) < 0.1 ){
				for( y = -0.5; y < 0.5; y += step(20 ) ) 
					plot( 0, x, pens[1] );
			}
			plot( 0, x, pens[1] );
		}
		for( x = minScale; x < maxScale; x+= step(1000) ) {
			plot( x, x, ColorAverage( pens[2], BASE_COLOR_WHITE, x+zero, range) );
		}
	}

	if(0)
		for( x = minScale; x < maxScale; x+= step(1000) ) {
			const ac = z_acos(x);
			if( x < -2 ) 
			console.log( "??", x, ac );
			plot( x, x-((x+1)%2), pens[4]);
			plot( x, ac.r.r+ac.i.r, pens[3] );
		}

	ctx.putImageData(_output, 0,0);

}

try {
	drawsomething();
}catch(err) {
	alert( "GotError:"+err );
}

class dualComplex {
	s = new complexNumber( 0, 0 );
	c = new complexNumber( 1, 0 );

	constructor(a, b, c, d ) {
		if( "number" === typeof a ) {
			if( "number" === typeof b ) {
				if( "number" === typeof c ) {
					s.r = a;
					s.i = b;
					c.r = c;
					c.i = d;
				} else {
					// this is some clever constructor to figure later...
					//s.r = sin(a);
					//c.r = cos(b);
					//-----
					
				}
			}else {
				s.r = sin(a);
				c.r = cos(a);
			}
		} else {
			throw new Error( "Invalid Parameters" );
		}
	}

	add(a) {
		this.s.add(a);
		this.c.add(c);
	}
	add2(a) {
		return new dualComplex( s.r, s.i, c.r, c.i ).add( a );
	}
	mult(a) {
		// TBD
	}
	mult2( a ) {
		// TBD 
	}
	
}


function testComplex() {
	var a = new complexNumber( 1, 0 );
	var b = new complexNumber( 3, 4 );
	var c = b.mult2( a );
	b.mult(a)
	console.log( "c:", c.toString(), b.toString() );


	a = new complexNumber( 5, -2 );
	b = new complexNumber( 5, +2 );
	var c = b.mult2( a );
	b.mult(a)
	console.log( "c:", c.toString(), b.toString() );


	// can we do things with them?

}

//testComplex();






function drawQuatTwist() {
	const histories = {x:[],y:[],z:[] };
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
	function plot( x_, y_, c ) {
		const x = unitX(x_);
		const y = unitY(-y_);
		output[((x+y*squareSize)<<2)+0] = c[0];
		output[((x+y*squareSize)<<2)+1] = c[1];
		output[((x+y*squareSize)<<2)+2] = c[2];
		output[((x+y*squareSize)<<2)+3] = c[3];
	}
		
	if(0) {

	const lnQ = new lnQuat( {a:values.A,b:values.B,c:values.C} );
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
		const lnQc = new lnQuat( {a:values.A,b:values.B,c:values.C} );
		lnQc.twist( x );

		if( ( x - drewBar ) > 2 ) {
		for( W = 0; W < histories.x.length; W++ ) {
			if( Math.abs( histories.x[W] - lnQc.x ) < 0.005 ) {
			if( Math.abs( histories.y[W] - lnQc.y ) < 0.005 ) {
			if( Math.abs( histories.z[W] - lnQc.z ) < 0.005 ) {
				for( y = minScaleY; y < maxScaleY; y += stepY(500 ) ) {
					plot( x, y, pens[0]);
				}
				drewBar = x;
				break;
			}
			}
			}
		}
		}


		
		//histories.x.push(lnQc.x);
		//histories.y.push(lnQc.y);
		//histories.z.push(lnQc.z);
/*
		if( prior ) {
			if( (prior.x*lnQc.x)<0 )
				if( lnQc.x < 0 )
					lnQc.x = -2*Math.PI - lnQc.x;
				else
					lnQc.x = 2*Math.PI + lnQc.x;
			if( (prior.y*lnQc.y)<0 )
				if( lnQc.y < 0 )
					lnQc.y = -2*Math.PI - lnQc.y;
				else
					lnQc.y = 2*Math.PI + lnQc.y;
			if( (prior.z*lnQc.z)<0 )
				if( lnQc.z < 0 )
					lnQc.z = -2*Math.PI - lnQc.z;
				else
					lnQc.z = 2*Math.PI + lnQc.z;
		}
		prior = lnQc;
*/
	const q = this;

//	if( !del ) del = 1.0;
	/*
	const nt = this.nL;//Math.abs(q.x)+Math.abs(q.y)+Math.abs(q.z);
	const nst = this.nR;//Math.sqrt(q.x*q.x+q.y*q.y+q.z*q.z);
	const s  = Math.sin( del * nt ); // sin/cos are the function of exp()
	const qw = Math.cos( del * nt ); // sin/cos are the function of exp()
	const dqw = s/nst;
	const qx = q.x * dqw; // normalizes the imaginary parts
	const qy = q.y * dqw; // set the sin of their composite angle as their total
	const qz = q.z * dqw; // output = 1(unit vector) * sin  in  x,y,z parts.
	  */

		const t = Math.abs(lnQc.x) +Math.abs(lnQc.y) +Math.abs(lnQc.z);
		const xx = lnQc.x / lnQc.nR;	
		const yy = lnQc.y / lnQc.nR;	
		const zz = lnQc.z / lnQc.nR;	

		//plot( x, Math.sqrt(xx), pens[0] );
		//plot( x, Math.sqrt(yy), pens[1] );
		//plot( x, Math.sqrt(zz), pens[2] );


		//plot( x, acos( Math.cos( (values.C)+Math.cos(values.A) )), pens[0] );
		if(0) {
			// some initial approximations using cos; the factor is more like 1-N^2 instead.
			plot( x, (Math.abs(values.C)+Math.abs(values.A) )*Math.cos( values.C + (x/2) ), pens[2] );
			let wx = x;
			plot( x, wx, pens[0] );
			plot( x, (Math.abs(values.C)+Math.abs(values.A))*Math.cos( -values.A + Math.PI+ (x/2) )*Math.PI, pens[1] );
		}

		plot( x, t, pens[7] );
		const t2 = Math.abs(lnQc.nx) +Math.abs(lnQc.ny) +Math.abs(lnQc.nz);
		plot( x, t2, pens[7] );
		
		plot( x, lnQc.nx , pens[0] );
		plot( x, lnQc.ny , pens[1] );
		plot( x, lnQc.nz , pens[2] );

		if( x >= 0 && x <= Math.PI*3/2 ) {
		plot( lnQc.nx, lnQc.ny, pens[0] );
		plot( lnQc.nx, lnQc.nz , pens[1] );
		plot( lnQc.ny, lnQc.nz , pens[2] );
		}

		if( x >= 0 && x <= Math.PI*2 ) {
		plot( lnQc.x / lnQc.nR *lnQc.nL , lnQc.y / lnQc.nR *lnQc.nL , pens[0] );
		plot( lnQc.x / lnQc.nR *lnQc.nL , lnQc.z / lnQc.nR *lnQc.nL , pens[1] );
		plot( lnQc.y / lnQc.nR *lnQc.nL , lnQc.z / lnQc.nR *lnQc.nL , pens[2] );
		}

		
		//plot( x, -lnQc.nx - lnQ.nx, pens[3] );
		//plot( x, -lnQc.ny - lnQ.ny, pens[4] );
		//plot( x, -lnQc.nz - lnQ.nz, pens[5] );

		/*
		plot( x, lnQc.x, pens[6] );
		plot( x, lnQc.y, pens[7] );
		plot( x, lnQc.z, pens[8] );
		
		plot( x, -lnQc.x, pens[6] );
		plot( x, -lnQc.y, pens[7] );
		plot( x, -lnQc.z, pens[8] );
		*/

		if( Math.abs(x -values.A) < 0.01  )
				for( y = -0.25; y < 0.25; y += stepY(500 ) ) {
					plot( x, y, pens[0]);
				}
		if( Math.abs(x -values.B) < 0.01  )
				for( y = -0.25; y < 0.25; y += stepY(500 ) ) {
					plot( x, y, pens[1]);
				}
		if( Math.abs(x -values.C) < 0.01  )
				for( y = -0.25; y < 0.25; y += stepY(500 ) ) {
					plot( x, y, pens[2]);
				}

	}	
	}

	drawCurve( { x:0, y:0 }, pens[0], circle, circle_a )
	drawCurve( { x:0, y:0 }, pens[1], curve, curve_a )
	drawCurve( { x:1, y:0 }, pens[2], (o,t)=>(values.C+(Math.sin(t*values.D)))/values.B, curve_a )
	
//	drawCurve( { x:1, y:0 }, pens[3], (o,t)=>(values.A*Math.sin(t/2)*Math.sin(t/2)), curve_a )
//	drawCurve( { x:1, y:0 }, pens[4], (o,t)=>(values.A*Math.cos(t/2)*Math.cos(t/2)), curve_a )
//	drawCurve( { x:1, y:0 }, pens[5], (o,t)=>(values.A*Math.sin(t/2)*Math.cos(t/2)), curve_a )
//	drawCurve( { x:1, y:0 }, pens[5], (o,t)=>(values.A*Math.cos(t/2)/Math.sin(t/2)), curve_a )
	drawCurve( { x:1, y:0 }, pens[5], (o,t)=>(values.A*Math.cos(t/2)/Math.sin(t/2)), curve_a )

	ctx.putImageData(_output, 0,0);

	function drawCurve( o, c, f, fa) {
		plot( o.x, o.y, pens[0] );
		const rgt = (x) => 1-Math.cos(x);
		const fwd = (x) => Math.sin(x);

		const p = 0;  // 'position' offset

		for( t= 0; t < 2	*Math.PI; t += Math.PI*2/5000 ) {
			const v = f( o, t );
			const a = fa( o, t );
			let rt = -rgt( a * t + p );
			let fd = fwd( a * t + p );

			o.x = v*rt;
			o.y = v*fd;
			
			plot( o.x, o.y, c );
		}
	}
	function curve_a( o, t ) {		
		return 1;//(Math.PI*2);//Math.sin(t/(4)); // time scalar
	}
	function curve( o, t ) {
		return Math.sin(t/2)/ values.A;
		return Math.cos(t/2)/ values.A;
	}

	function circle_a( o, t ) {		
		return 1; // time scalar
	}
	function circle( o, t ) {
		return 1/ values.A;
	}
}
