

// place holder for the type information mostly.
function complex(a,b) {
	this.a = a;
        this.b = b;
}

function vecS( a,b,d ) {
	if( d !== "undefined' ) {
        	
        } else {
        	this.sin=Math.sin(a);
                this.cos=Math.cos(a);
        }
}

function vecA( angle,axis ) {
	this.angle = angle;
        this.axis = axis;
}
function.prototype.ln = function(a) {
	if( a instanceof vecA ) {
        	const angle = acos( a.cos );
                const angle2 = asin( a.sin );
                const axis = 1;
        	return new lnC( angle, axis );
        } else {
        	const 
        }
}


function lnC( a,b ) {
	
}

function.prototype.exp = function(lc) {
	// rectangular exponent
        return new complex( 
}

function vecR( o, v ) {
	// apply rotation to given point. (2d rectangular representation allowed)
        if( !o ) o = { 0, 1, 0 }; // we are polist, and think north is this way.
        return v.apply( o );
}


// g_{1}(x)=cos^(-1)(B-cos(x))
// 
function acos(cos, 0) {
	if( "number" === typeof cos ) {
		return { r: Math.acos( ((cos+1)%2-1) +(((cos+1%2)-1) - x)* (Math.PI)/(2), i: 0 };
	} else if( cos instanceof baseNumber ) {
		return { r: Math.acos( ((x.r+1)%2-1) +(-x-1+md(x.r+1,2))* (Math.PI)/(2), i: 0 };
	} else if( cos instanceof vecA ) {
		return cos;
	} else if( cos instancof ln ) {
		return cos;
	}
}

function gamma( a, b ) {
	this.a = a;
	this.b = b;
}




//newArccos(x)=cos^(-1)(md(x+1,2)-1)+(-x-1+md(x+1,2)) (p)/(2)

function asin(sin, i) {
	if( "number" === typeof sin ) {
		return Math.asin((a+1)%2-1);
	} else if( sin instanceof baseNumber ) {
		return new baseNumber( { r: Math.asin((a.r+1)%2-1), i:a.r/2  } );
	} else if( sin instanceof vecA ) {
		return cos;
	} else if( sin instancof ln ) {
		return cos;
	}
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
const canvas = document.getElementById( "testSurface" );
const ctx = canvas.getContext( '2d' );

// area of a triangle

const values = {A:0.0,B:0.0,C:0.0,D:0.0};

myForm.sliderA.oninput = readValues;
myForm.sliderB.oninput = readValues;
myForm.sliderC.oninput = readValues;
myForm.sliderD.oninput = readValues;

function readValues()  {
	values.A = Number(myForm.sliderA.value)/100.0;
	values.B = Number(myForm.sliderB.value)/100.0;
	values.C = Number(myForm.sliderC.value)/100.0;
	values.D = Number(myForm.sliderD.value)/100.0;
	myForm.sliderValA.textContent = values.A;
	myForm.sliderValB.textContent = values.B;
	myForm.sliderValC.textContent = values.C;
	myForm.sliderValD.textContent = values.D;
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
		return new dualNumber( this.r.add2( a.r ), this.e.add( a.e ) );
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
		return new dualNumber( this.r.mult2( a.r ), this.r.mult2( base2 ).mult( this.e ) );
	}
}

const dualNeg1 = new dualNumber(-1,0)
Object.freeze( dualNeg1 );

class complexNumber {
	r = new baseNumber(0);
	i = new baseNumber(0);

	constructor(a,b) {
		if( "number" === typeof a ) a = new baseNumber(a);
		if( "number" === typeof b ) b = new baseNumber(b);
		this.r = a;
		this.i = b;
	}
	toString()  { return `< ${this.r.toString()}, ${this.i.toString()} >`  }

	add(a) {
		if( !(a instanceof complexNumber) ) throw new Error( "Can only add complex to comple" );
		this.r.add( a.r );
		this.e.add( a.e );
		return this;
	}
	add2(a) {
		if( !(a instanceof complexNumber) ) throw new Error( "Can only add complex to comple" );
		return new complexNumber( this.r.add2( a.r ), this.e.add2( a.e ) );
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
		return new complexNumber(  this.r.mult2( a.r ).add( this.i.mult2(a.i).mult( baseNeg1 ) )
		                         , this.r.mult2( a.i ).add( this.i.mult2(a.r) ) );
		return this;
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




}

testComplex();



function drawLines() {

	var o = [500, 500];
	var px = 50;
	var py = 50;

	var x, y;

		var b = new complexNumber( 4, 0 );
		var c = new complexNumber( 0.707, 0.707 );
	        
	        
			ctx.beginPath();
			ctx.strokeStyle = "red";		
			ctx.moveTo( o[0], o[1] );
			ctx.lineTo( o[0] + 100, o[1] + 100 );
			ctx.stroke();	
	        
			ctx.beginPath();
			ctx.strokeStyle = "red";		
			ctx.moveTo( o[0], o[1] );
	        
			var d = b.mult2( c );
			console.log( "MoveTO:", d.r.r,  d.i.r );
		for( var n = 0; n < 100; n++ ) {
			ctx.beginPath();
			ctx.strokeStyle = `hsl(${360*(n/100)},75%,50%)`;		
			ctx.moveTo( o[0] + 100*d.r.r, o[1] + 100*d.i.r );
			d.mult( c );
			ctx.lineTo( o[0] + 100*d.r.r, o[1] + 100*d.i.r );
			console.log( "MoveTO:", d.r.r,  d.i.r );
			ctx.stroke();	
		}



	
	if(0) {
		var b = new complexNumber( new dualNumber( 4, 2.1 ), new dualNumber( 5,1) );
		var c = new complexNumber( new dualNumber(0.95, 0.1 ), new dualNumber( 0.95, 0.2 ) );

		o[0] += 50;
	        
			ctx.beginPath();
			ctx.strokeStyle = "red";		
			ctx.moveTo( o[0], o[1] );
			ctx.lineTo( o[0] + 100, o[1] + 100 );
			ctx.stroke();	
	        
			ctx.beginPath();
			ctx.strokeStyle = "red";		
			ctx.moveTo( o[0], o[1] );
	        
			var d = b.mult2( c );
			console.log( "MoveTO:", d.r.r,  d.i.r );
		for( var n = 0; n < 100; n++ ) {
			ctx.beginPath();
			ctx.strokeStyle = `hsl(${360*(n/100)},75%,50%)`;		
			ctx.moveTo( o[0] + 100*d.r.r.r, o[1] + 100*d.i.r.r );
			d.mult( c );
			ctx.lineTo( o[0] + 100*d.r.r.r, o[1] + 100*d.i.r.r );
			console.log( "MoveTO:", d.r.r,  d.i.r );
			ctx.stroke();	
		}
	        
	        
	}

} // end function

       
