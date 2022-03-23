// https://www.geogebra.org/3d/qxejdpty
//https://www.geogebra.org/3d/sadtqz3x


const canvas = document.getElementById( "testSurface" );
const ctx = canvas.getContext( '2d' );

const canvas2 = document.getElementById( "testSurface2" );
const ctx2 = canvas2.getContext( '2d' );

let canvas3 = null;

var grd2 = ctx.createLinearGradient(0, 0, 4096, 0);
grd2.addColorStop(0, "#990");
grd2.addColorStop(0.5, "#ff0");
grd2.addColorStop(1, "#990");


function tmp() {
	const canvas = document.createElement( "canvas");
	canvas3 = canvas;
	canvas.width = 4096;
	canvas.height = 256;
	const ctx = canvas.getContext( '2d' );
		const squareSize = 4096;
        ctx.font = "70px Verdana";
                        ctx.textAlign = 'center';
			ctx.fillText( '', 0, 0 );
//	ctx.clearRect(0,0,squareSize,squareSize );

// Create gradient
var grd = ctx.createLinearGradient(0, 0, 4096, 0);
grd.addColorStop(0, "black");
grd.addColorStop(0.25, "red");
grd.addColorStop(0.5, "white");
grd.addColorStop(0.75, "blue");
grd.addColorStop(1, "black");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0, 0, 4096, 256);

var grd = ctx.createLinearGradient(0, 0, 4096, 0);
grd.addColorStop(0, "white");
grd.addColorStop(0.25, "blue");
grd.addColorStop(0.5, "black");
grd.addColorStop(0.75, "red");
grd.addColorStop(1, "white");

ctx.fillStyle = grd;


	function plot( x_, y_, c ) {
		const x = x_;
		const y = y_;
		output[((x+y*squareSize)<<2)+0] = c[0];
		output[((x+y*squareSize)<<2)+1] = c[1];
		output[((x+y*squareSize)<<2)+2] = c[2];
		output[((x+y*squareSize)<<2)+3] = c[3];
	}
	var _output = ctx.getImageData(0, 0, canvas.width, canvas.height );
	var output = _output.data;

	for( let i = 0; i < 4096; i += 4096/360 ) {
		for( let j = 0; j < 256; j++ ) {
			plot( i, j, BASE_COLOR_BLACK );
		}
	}

	
	for( let i = 0; i < 4096; i ++ ) {
		const j = Math.floor(Math.sin(-Math.PI/2+18*i/4096*Math.PI*2) * 64+128);
		plot( i, j, BASE_COLOR_BLUE );
	}

	ctx.putImageData(_output, 0,0);

	let xx = 0;
	let deg = -90;
	let yy = -Math.PI/2;
	let s = "N";
	
	for( let i = 0; i < 4096; i++ ) {
		const j = ((-Math.PI/2)+i/4096*Math.PI*2);
		if( j > yy ) {
		        ctx.font = "14px Verdana";
			ctx.fillText( deg, i, 128+ 115 * Math.sin( 18*deg * Math.PI/180 ) );
			yy += Math.PI/180;
			deg++;
			
		}
		if( j > xx ) {
		        ctx.font = "70px Verdana";
			ctx.fillText( s, i, 128 );
			switch(s) {
			case "N":
				s = "W";	
				xx = 90 * Math.PI/180;
				break;
			case "W":
				s = "S";	
				xx = 180 * Math.PI/180;
				break;
			case "S":
				s = "E";	
				xx = 270 * Math.PI/180;
				break;
			case "E":
				s = "N";	
				xx = 4096;//360 * Math.PI/180;
				break;
			}
		}
	}

ctx.fillStyle = "white";
			ctx.fillText( "E", 0, 128 );
			ctx.fillText( "E", 4095, 128 );
	document.body.appendChild( canvas );	
}

const BASE_COLOR_WHITE = [255,255,255,255];
const BASE_COLOR_BLACK = [0,0,0,255];
const BASE_COLOR_RED = [255,0,0,255];
const BASE_COLOR_BLUE = [0,0,255,255];
const BASE_COLOR_GREEN = [0,255,0,255];
let invertCurvature =false;

tmp();

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

const mod = (x,y)=>y * (x / y - Math.floor(x / y)) ;
const plusminus = (x)=>mod( x+1,2)-1;
 
const trunc = (x,y)=>x-mod(x,y);


const _2to1 = (x,y)=> Math.sqrt(x*x+y*y);
const _3to1 = (x,y,z)=> Math.sqrt(x*x+y*y+z*z);
const _4to1 = (x,y,z,w)=> Math.sqrt(x*x+y*y+z*z+w*w);
const _5to1 = (x,y,z,w,q)=> Math.sqrt(x*x+y*y+z*z+w*w+q*q);

// this adds a W component to a previously only x/y/z component scaled.
const Q_0 = (x,y,z,w) => Math.sqrt(x*x+y*y+z*z+((invertCurvature?-1:1)* w*w));  // from real to converted (squash)
const Q_i = (x,y,z,Q) => Math.sqrt( x*x+y*y+z*z+((invertCurvature?1:-1)*Q*Q) );  // from converted to real (unsquash)
const dQ_0 = (l,x,y,z,Q) => l/_4to1(x,y,z,Q);  // from real to converted (squash)

// this normalizes a value from x/y/z -> x/y/z/w
const A_0 = (l,x,y,z,w) => l/Math.sqrt(x*x+y*y+z*z) * Q_0(x,y,z,w)
const A_i = (l,x,y,z,w) => l/Math.sqrt(x*x+y*y+z*z) * Q_i(x,y,z,w)


// this adds a Q component to a preivously only x/y/z/Q comonent
const M_0 = _5to1;
const M_00 = M_0;
const M_ii = (x,y,z,w,q) => Math.sqrt( x*x+y*y+z*z-w*w-q*q );  // from converted to real (unsquash)
const M_0i = (x,y,z,w,q) => Math.sqrt( x*x+y*y+z*z+w*w-q*q );  // from converted to real (unsquash)
const M_i0 = (x,y,z,w,q) => Math.sqrt( x*x+y*y+z*z-w*w+q*q );  // from converted to real (unsquash)

const dM_0 = (l,x,y,z,w,q) => (q)*(l/_4to1(x,y,z,w));  // from converted to real (unsquash)


const AB_0 = (l,x,y,z,w,q) => l/_3to1(x,y,0) * M_0( x,y,0,q );

// this normalizes a value from ( ( x/y/z -> x/y/z/w ) -> x/y/z/q )
//const B_0 = (l,x,y,z,w,q) => A_0(l,x,y,z,w)/_4to1(x,y,z,w) * M_00( x,y,z,w,q );
// single expression version.
const B_0 = (l,x,y,z,w,q) =>{ const xx=x*x; const yy=y*y; const zz=z*z; return (l/Math.sqrt(xx+yy+zz) * Math.sqrt(xx+yy+zz+((invertCurvature?-1:1)* w*w)))/Math.sqrt(xx+yy+zz+w*w) * Math.sqrt(xx+yy+zz+w*w+q*q) };

const B_i = (l,x,y,z,w,q) => A_i(l,x,y,z,w)/_4to1(x,y,z,w) * (invertCurvature?M_00( x,y,z,w,q ):M_ii( x,y,z,w,q ));

// sequential space would enumerate in a sort of alternating sign, alternating reiprocal
// spaces infinity to 0 - 0 to infinity - infinity to 0 - ...

// the net spatial displacement is the net charge, plus net motion

// outer surface goes from an infinity to 0; a signed motion within that space is relative to that space
//   sign alone does not go through the 0.... going from -e to +e does not notice any sort of 'space' of the zero space.

// This can simplify some models... a gravitational body whose center is within the virtual space of the other does not further get accelerated by the other.
//   This spacial shift translation from 0 to N around a thing gives things volumes that cannot interact.

// this means especially for the next space, the surface is an infinity that converges to 0 in the center. 
// 


// the composite of near fields... each individual dialation doesn't affect any other dialation; these points remain constant in space.
// (unless the underlayig space also warps ?  Another internal dialation also doesn't affect other points in flat space.

// light is in light-space, and conforms to that space.
// there's obviously an underlaying flatter space that light's space is displaced from.
// this displacement is proportional to the gravity field felt.

// if the underlaying spin in great enough, then the thing may be invisible, but still have a force.  (darkish matter... dense enough to displace any light wave around it without interacting

// the inner expressions end up visible on the outside...
// the layers aren't quite nesting like one would like.

let mouseX=0, mouseY=0;

	const squareSize = 1024;
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


canvas2.addEventListener( "mousemove", (e)=>{
	const rect = canvas2.getBoundingClientRect();
	const w = rect.right-rect.left;//window.innerWidth;
	const h = rect.bottom-rect.top;//window.innerHeight;
	const x = (((e.clientX-rect.left)-(w/2.0))/w) * 10;
	const y = -(((e.clientY-rect.top)-(h/2.0))/h) * 10;
	mouseX = x;
	mouseY = y;
	drawsomething();
	drawRayTrace();
} );



function drawsomething() {
	return;
	let x, y, z, w, X, Y, Z, W;

	ctx.clearRect(0,0,squareSize,squareSize );
	var _output = ctx.getImageData(0, 0, squareSize, squareSize );
	var output = _output.data;


	function plotPut( x_, y_, c ) {
		if( x_ < -5 || y_ < -5 ) return
		if( x_ > 5 || y_ > 5 ) return
		const x = unit(x_);
		const y = unit(-y_);
		output[((x+y*squareSize)<<2)+0] = c[0];
		output[((x+y*squareSize)<<2)+1] = c[1];
		output[((x+y*squareSize)<<2)+2] = c[2];
		output[((x+y*squareSize)<<2)+3] = c[3];
	}

	function plot( x_, y_, c ) {
		if( x_ < -5 || y_ < -5 ) return
		if( x_ > 5 || y_ > 5 ) return
		const x = unit(x_);
		const y = unit(-y_);
		output[((x+y*squareSize)<<2)+0] |= c[0];
		output[((x+y*squareSize)<<2)+1] |= c[1];
		output[((x+y*squareSize)<<2)+2] |= c[2];
		output[((x+y*squareSize)<<2)+3] |= c[3];
	}
		
//	const thisDel = (n,m)=>n*n*n-(n-m)*(n-m)*(n-m);
	const thisDel = (n,y)=>n*n*n-(n-step(1000))*(n-step(1000))*(n-step(1000))+y*y*y;

	invertCurvature	= document.getElementById( "invertCurvature")?.checked;
	                   
	//field is 2xg or 2g or g^2 for 2m?
	const scalar = (values.A+values.Amax);
	const zscalar =(values.B+scalar)?  scalar*scalar /Q_0(0,0,values.B,scalar):0;

	for( let r = -8.99*100; r < 8*100; r+=0.8*100 ) {
		for( let t=-18.99*100; t < 18*100; t+= 5*100/1000 ) {

			// these two draw the X/Y grid lines.
			{
				const Ax = B_0(t,t,r,values.B*100,values.A*100, values.Amax );
				const Ay = B_0(r,t,r,values.B*100,values.A*100, values.Amax );
				plot(t/100,r/100,pens[4] );
				plot(Ax/100,Ay/100,pens[1] );
			}
			{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
				const Ax = B_0(r,t,r,values.B,values.A*100, values.Amax );
				const Ay = B_0(t,t,r,values.B,values.A*100, values.Amax );
				plot(r/100,t/100,pens[5] );
				plot(Ax/100,Ay/100,pens[2] );
			}

		}

	}

	for( let r = 0.01; r < 8; r+=0.5 ) {
		// circles have no elongation to have to scale,it only needs the radius scaled.
		const Gr = B_0(r,r,0,values.B,values.A, values.Amax );
		// draw a circle with an aprox number of dots... could be smarter (or draw segments)
		// the density could shade the pen also.
		for( let t=0; t < Math.PI*2; t+= Math.PI*2/((r+1+values.A)*500) ) {
			const x = Gr*Math.cos(t);
			const y = Gr*Math.sin(t);
			plotPut(x,y,pens[0] );
		}
	}



	for( let t = 0; t < 360; t+= 10 ) {
		let slopex = Math.cos( t/180*Math.PI );
		let slopey = Math.sin( t/180*Math.PI );
		for( let t=0; t < 10; t+= 10/1000 ) {
			const mx = mouseX + slopex * t;
			const my = mouseY + slopey * t;
				const Ax = B_0(mx,mx,my,values.B,values.A, values.Amax );
				const Ay = B_0(my,mx,my,values.B,values.A, values.Amax );
			//if( Math.sqrt(Ax*Ax+Ay*Ay)< (values.A+values.Amax+1) ) continue;
			if( Math.sqrt(mx*mx+my*my)< (1) ) break;
			plot(Ax,Ay, ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLUE, t/10, 1 ));
		}
	}
	 //if(0)
	{
	const slopex = mouseX/Math.sqrt(mouseX*mouseX+mouseY*mouseY);
	const slopey = mouseY/Math.sqrt(mouseX*mouseX+mouseY*mouseY);
	const _mouseX = B_0(mouseX, mouseX,mouseY,values.B,values.A, values.Amax );
	const _mouseY = B_0(mouseY, mouseX,mouseY,values.B,values.A, values.Amax );
	for( let t = 0; t < 2; t+= 2/100 ) {
		
		{
			{
			const dx = -slopey*0.1 + slopex * (t-1);
			const dy = slopex*0.1 + slopey * (t-1);
				const mx = _mouseX + B_i( dx, _mouseX, _mouseY, values.B, values.A, values.Amax );
				const my = _mouseY + B_i( dy, _mouseX, _mouseY, values.B, values.A, values.Amax );
				{
					//const Ax = B_i(mx,mx,my,values.B,values.A, values.Amax );
					//const Ay = B_i(my,mx,my,values.B,values.A, values.Amax );
					const Ax = mx;// / _4to1(mx,my,values.B,values.A) * B_i(mx,mx,my,values.B,values.A, values.Amax );
					const Ay = my;//B_i(my,mx,my,values.B,values.A, values.Amax );
					//if( Math.sqrt(Ax*Ax+Ay*Ay)< (values.A+values.Amax+1) ) continue;
					plot(Ax,Ay, pens[2] );
				}
			}
			{
			const dx = slopey*0.1 + slopex * (t-1);
			const dy = -slopex*0.1 + slopey * (t-1);
				const mx = _mouseX + B_i( dx, _mouseX, _mouseY, values.B, values.A, values.Amax );
				const my = _mouseY + B_i( dy, _mouseX, _mouseY, values.B, values.A, values.Amax );

					const Ax = mx;// / _4to1(mx,my,values.B,values.A) * B_i(mx,mx,my,values.B,values.A, values.Amax );
					const Ay = my;//B_i(my,mx,my,values.B,values.A, values.Amax );
				plot(Ax,Ay, pens[2] );

/*				const mx = mouseX -slopey*0.1 + slopex * (t-1);
				const my = mouseY +slopex*0.1 + slopey * (t-1);
				{
				const Ax = B_i(mx,mx,my,values.B,values.A, values.Amax );
				const Ay = B_i(my,mx,my,values.B,values.A, values.Amax );
				//if( Math.sqrt(Ax*Ax+Ay*Ay)< (values.A+values.Amax+1) ) continue;
				plot(Ax,Ay, pens[2] );
				}
*/			}
		}
	}
	}
	ctx.putImageData(_output, 0,0);

}


function drawRayTrace() {
	let x, y, z, w, X, Y, Z, W;

	ctx.clearRect(0,0,squareSize,squareSize );
	ctx2.clearRect(0,0,squareSize,squareSize );
	var _output = ctx2.getImageData(0, 0, squareSize, squareSize );
	var output = _output.data;

	function plotPut( x_, y_, c ) {
		if( x_ < -5 || y_ < -5 ) return
		if( x_ > 5 || y_ > 5 ) return
		const x = unit(x_);
		const y = unit(-y_);
		output[((x+y*squareSize)<<2)+0] = c[0];
		output[((x+y*squareSize)<<2)+1] = c[1];
		output[((x+y*squareSize)<<2)+2] = c[2];
		output[((x+y*squareSize)<<2)+3] = c[3];
	}

	function plot( x_, y_, c ) {
		if( x_ < -5 || y_ < -5 ) return
		if( x_ > 5 || y_ > 5 ) return
		const x = unit(x_);
		const y = unit(-y_);
		output[((x+y*squareSize)<<2)+0] |= c[0];
		output[((x+y*squareSize)<<2)+1] |= c[1];
		output[((x+y*squareSize)<<2)+2] |= c[2];
		output[((x+y*squareSize)<<2)+3] |= c[3];
	}
		
//	const thisDel = (n,m)=>n*n*n-(n-m)*(n-m)*(n-m);
	const thisDel = (n,y)=>n*n*n-(n-step(1000))*(n-step(1000))*(n-step(1000))+y*y*y;

	invertCurvature	= document.getElementById( "invertCurvature")?.checked;
	                   
	//field is 2xg or 2g or g^2 for 2m?
	const scalar = (values.A+values.Amax);
	const zscalar =(values.B+scalar)?  scalar*scalar /Q_0(0,0,values.B,scalar):0;
	                 if(0)
	for( let r = -8.99*100; r < 8*100; r+=0.08*100 ) {
		for( let t=-18.99*100; t < 18*100; t+= 5*100/1000 ) {

			// these two draw the X/Y grid lines.
			{
				const Ax = B_0(t,t,r,values.B*100,values.A*100, values.Amax );
				const Ay = B_0(r,t,r,values.B*100,values.A*100, values.Amax );
				plot(t/100,r/100,pens[4] );
				plot(Ax/100,Ay/100,pens[1] );
			}
			{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
				const Ax = B_0(r,t,r,values.B,values.A*100, values.Amax );
				const Ay = B_0(t,t,r,values.B,values.A*100, values.Amax );
				plot(r/100,t/100,pens[5] );
				plot(Ax/100,Ay/100,pens[2] );
			}

		}

	}
	                               if(0)
	for( let r = 0.01; r < 8; r+=0.5 ) {
		// circles have no elongation to have to scale,it only needs the radius scaled.
		const Gr = B_0(r,r,0,values.B,values.A, values.Amax );
		// draw a circle with an aprox number of dots... could be smarter (or draw segments)
		// the density could shade the pen also.
		for( let t=0; t < Math.PI*2; t+= Math.PI*2/((r+1+values.A)*500) ) {
			const x = Gr*Math.cos(t);
			const y = Gr*Math.sin(t);
			plotPut(x,y,pens[0] );
		}
	}

	let angle = Math.atan2( -mouseY, -mouseX );

if(1)
	for( let t = -45; t < 45; t+= 90/4096 ) {
		let slopex = Math.cos( angle+t/180*Math.PI );
		let slopey = Math.sin( angle+t/180*Math.PI );
		for( let t2=0; t2 < 10; t2+= 10/400 ) {
			const mx = mouseX + slopex * t2;
			const my = mouseY + slopey * t2;
				const Ax = B_0(mx,mx,my,values.B,values.A, values.Amax );
				const Ay = B_0(my,mx,my,values.B,values.A, values.Amax );
			//if( Math.sqrt(Ax*Ax+Ay*Ay)< (values.A+values.Amax+1) ) continue;
			if( Math.sqrt(mx*mx+my*my)< (1) ) break;
			plot(Ax,Ay, ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLUE, t2/10, 1 ));
		}

	}

	ctx2.putImageData(_output, 0,0);

	for( let t = -45; t < 45; t+= 90/1024 ) {
		let slopex = Math.cos( angle+t/180*Math.PI );
		let slopey = Math.sin( angle+t/180*Math.PI );
		let t2 = 0;
		for( t2=0; t2 < 10; t2+= 10/400 ) {
			const mx = mouseX + slopex * t2;
			const my = mouseY + slopey * t2;
			if( Math.abs( mx*mx+my*my ) < 1 ) break;
				//const Ax = B_0(mx,mx,my,values.B,values.A, values.Amax );
				//const Ay = B_0(my,mx,my,values.B,values.A, values.Amax );
			//}
		}
		if( t2 < 10 ) {
			ctx.fillStyle = grd2;

			ctx.fillRect( Math.floor(((t+45)/90)*1024),  512, 1, 256 );
			continue;
		}
		{
			let t2=10
			const mx = mouseX + slopex * t2;
			const my = mouseY + slopey * t2;
			const Ax = B_0(mx,mx,my,values.B,values.A, values.Amax );
			const Ay = B_0(my,mx,my,values.B,values.A, values.Amax );
			const Ax2 = B_0(mx-slopex*0.1,mx-slopex*0.1,my-slopey*0.1,values.B,values.A, values.Amax );
			const Ay2 = B_0(my-slopey*0.1,mx-slopex*0.1,my-slopey*0.1,values.B,values.A, values.Amax );
			//if( Math.sqrt(Ax*Ax+Ay*Ay)< (values.A+values.Amax+1) ) continue;
			if( Math.sqrt(mx*mx+my*my)< (1) ) break;
			let curangle = Math.atan2( (Ay-Ay2), (Ax-Ax2) );
			let angle2 = ((t/180*Math.PI)+angle+2*Math.PI)%(Math.PI*2);

			{	
				//let j = Math.floor(((t/180*Math.PI)+curangle+(-Math.PI/4))/(Math.PI*2)*4096);
				let j = Math.floor((+curangle+(-0*Math.PI/2))/(Math.PI*2)*4096);
				if( j < 0 ) j += 4096;
				//if( j > ( 4096-1024) ) j -= 4096;
				ctx.drawImage( canvas3, j-1, 0, 1, 256, Math.floor(((t+45)/90)*1024),  256, 1, 256 );
				if( j < 0 ) 
				{
					j += 4096;
					ctx.drawImage( canvas3, j-1, 0, 1, 256, Math.floor((((t+45)/90))*1024), 256, 1, 256 );
				}
			}
			
		}

	}


			
//		const j = Math.floor(Math.sin(-Math.PI/2+18*i/4096*Math.PI*2) * 64+128);
	{	
		let j = Math.floor((angle+(-Math.PI/4))/(Math.PI*2)*4096);
		if( j < 0 ) j += 4096;
		if( j > ( 4096-1024) ) j -= 4096;
		ctx.drawImage( canvas3, j, 0, 1024, 256, 0, 0, 1024, 256 );
		if( j < 0 ) 
		{
			j += 4096;
			ctx.drawImage( canvas3, j, 0, 1024, 256, 0, 0, 1024, 256 );
		}
	}
}       


try {
	drawsomething();
}catch(err) {
	alert( "GotError:"+err );
}
