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
	sliderBias : document.getElementById( "bias" ),
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
myForm.sliderBias.oninput = readValues;

myForm.sliderA.value = 0;
if(myForm.sliderAmax) myForm.sliderAmax.value = 0;
myForm.sliderB.value = 0;

function readValues()  {
	values.bias = (Number(myForm.sliderBias.value)) / 1000;
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
let one = 0.001;
const B_0 = (l,x,y,z,w,q) =>{ const xx=x*x; const yy=y*y; const zz=z*z; return Math.sign(l)*(-one+((Math.abs(l)+one)/Math.sqrt(one+xx+yy+zz) * Math.sqrt(one+xx+yy+zz+((invertCurvature?-1:1)* w*w)))/*/Math.sqrt(xx+yy+zz+w*w) * Math.sqrt(xx+yy+zz+w*w+q*q)*/) };

const B_i = (l,x,y,z,w,q) => A_i(l,x,y,z,w)/1/*_4to1(x,y,z,w)*/ * (invertCurvature?M_00( x,y,z,w,q ):M_ii( x,y,z,w,q ));

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


canvas.addEventListener( "mousemove", (e)=>{
	const rect = canvas.getBoundingClientRect();
	const w = rect.right-rect.left;//window.innerWidth;
	const h = rect.bottom-rect.top;//window.innerHeight;
	const x = (((e.clientX-rect.left)-(w/2.0))/w) * 10;
	const y = -(((e.clientY-rect.top)-(h/2.0))/h) * 10;
	mouseX = x;
	mouseY = y;
	drawsomething();
} );



function drawsomething() {
	let x, y, z, w, X, Y, Z, W;

	one = values.bias;

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

	function line( x1, y1, x2, y2, c ) {
		if( x1 < -5 || y1 < -5 ) return
		if( x1 > 5 || y1 > 5 ) return
		if( x2 < -5 || y2 < -5 ) return
		if( x2 > 5 || y2 > 5 ) return
		const realX1 = unit(x1);
		const realY1 = unit(-y1);
		const realX2 = unit(x2);
		const realY2 = unit(-y2);
		//const realLen = Math.sqrt( (realX2-realX1)*(realX2-realX1)  + (realY2-realY1)*(realY2-realY1) );
		x1=realX1;
		y1=realY1;
		x2=realX2;
		y2=realY2;
		//x1 *= realLen;
		//y1 *= realLen;
		//x2 *= realLen;
		//y2 *= realLen;
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
		output[((x1+y1*squareSize)<<2)+0] = c[0];
		output[((x1+y1*squareSize)<<2)+1] = c[1];
		output[((x1+y1*squareSize)<<2)+2] = c[2];
		output[((x1+y1*squareSize)<<2)+3] = c[3];
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
		output[((x1+y1*squareSize)<<2)+0] = c[0];
		output[((x1+y1*squareSize)<<2)+1] = c[1];
		output[((x1+y1*squareSize)<<2)+2] = c[2];
		output[((x1+y1*squareSize)<<2)+3] = c[3];
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
	

		
//	const thisDel = (n,m)=>n*n*n-(n-m)*(n-m)*(n-m);
	const thisDel = (n,y)=>n*n*n-(n-step(1000))*(n-step(1000))*(n-step(1000))+y*y*y;

	invertCurvature	= document.getElementById( "invertCurvature")?.checked;

	const D = values.A*values.A;
	const Zz = values.B*values.B;
	let maxdel = 0;
	let maxdel1 = 0;
	let maxdel2 = 0;
	let maxdel3 = 0;
	function pnp(x,y) {
		const px = x/(squareSize/(maxScale-minScale)) + minScale;
		const py = y/(squareSize/(maxScale-minScale)) + minScale;
		if( px*px+py*py < (D-Zz) ) return 1;
		const L = Math.sqrt(px*px+py*py - (D-Zz));
		const del1 = B_0(L,0,L,values.B,values.A, values.Amax )
		const del2 = B_0(L+0.1,0,L,values.B,values.A, values.Amax )
		const del3 = B_0(0.1,+0.1,L,values.B,values.A, values.Amax )
		const del4 = B_0(-0.1,-0.1,L,values.B,values.A, values.Amax )
		const delx = (del3-del4)*(del3-del4)/(del2-del1);
		if( delx < 1) return (delx);
		return (delx-1)/8;
	}

	{
		for( let x = 0; x < squareSize; x++ )
			for( let y = 0; y < squareSize; y++ ){
				const px = x/(squareSize/(maxScale-minScale)) + minScale;
				const py = y/(squareSize/(maxScale-minScale)) + minScale;
				//if( px*px+py*py < (D-Zz) ) continue;
				/*
				const L = Math.sqrt(px*px+py*py - D);
				const del1 = B_0(L,0,L,values.B,values.A, values.Amax )
				const del2 = B_0(L+0.1,0,L,values.B,values.A, values.Amax )
				const del3 = B_0(0.1,+0.1,L,values.B,values.A, values.Amax )
				const del4 = B_0(-0.1,-0.1,L,values.B,values.A, values.Amax )
				const delx = (del2-del1) * (del2-del1) / (del3-del4);
				*/
				const val = pnp(x,y);
				if( val === 1 ) plot( px, py, BASE_COLOR_RED );
				else if( val > 1 )  plot( px, py, BASE_COLOR_GREEN );
				else plot( px, py, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, pnp(x,y), 1) );
			
		}
	}

	//field is 2xg or 2g or g^2 for 2m?
	const scalar = (values.A+values.Amax);
	const zscalar =(values.B+scalar)?  scalar*scalar /Q_0(0,0,values.B,scalar):0;
	if( !invertCurvature)
	for( let r = -Math.PI*2; r <= Math.PI*2; r+=Math.PI/500 ) {
		for( let t=0; t <= Math.PI; t+= Math.PI/24 ) {
			let ang = Math.asin( Math.sin(t)*Math.sin(r/2) )*2 + Math.PI;
			const Clx = ang/Math.sin(ang/2);

			const Cx = Math.cos(r/2);
			const Cz = Math.cos(t) * Math.sin(r/2);
			
			const px = zscalar/(2*Math.PI)*Cx*Clx;
			const py = zscalar/(2*Math.PI)*Cz*Clx;
			plot( py, px,pens[2] );
			plot( px, py,pens[1] );
		}

	}
	for( let r = 0; r <= Math.PI*4; r+=(r < Math.PI*3/4 || ((r> Math.PI*5/4 && r < 8*Math.PI/2 ) )?Math.PI/50:Math.PI/(1000*Math.PI/4)) ) {

		for( let t=Math.PI*31/64; t <= Math.PI/2+Math.PI*1/64; t+= Math.PI/640 ) {
			let ang = Math.asin( Math.sin(t)*Math.sin(r/2) )*2 + Math.PI;
			const Clx = ang/Math.sin(ang/2);

			const Cx = Math.cos(r/2);
			const Cz = Math.cos(t) * Math.sin(r/2);
			
			const px = zscalar/(2*Math.PI)*Cx*Clx;
			const py = zscalar/(2*Math.PI)*Cz*Clx;
			plot( py, px,pens[2] );
			plot( px, py,pens[1] );
		}
	if(0)
		for( let t=-Math.PI/2; t <= -Math.PI*3/8; t+= Math.PI/32 ) {
			let ang = Math.asin( Math.sin(t)*Math.sin(r/2) )*2 + Math.PI;
			const Clx = ang/Math.sin(ang/2);

			const Cx = Math.cos(r/2);
			const Cz = Math.cos(t) * Math.sin(r/2);
			
			const px = zscalar/(2*Math.PI)*Cx*Clx;
			const py = zscalar/(2*Math.PI)*Cz*Clx;
			plot( py, px,pens[2] );
			plot( px, py,pens[1] );
		}
	}


if(0)
	for( let r = -0.99; r < 0.99; r+=0.01 ) {
		for( let t=-0.99; t < 0.99; t+= 0.01 ) {

			

			// these two draw the X/Y grid lines.
			{
				const Ax = B_0(t,t,r,values.B,values.A, values.Amax );
				const Ay = B_0(r,t,r,values.B,values.A, values.Amax );
				plot(Ax,Ay,pens[1] );
			}
			{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
				const Ax = B_0(r,t,r,values.B,values.A, values.Amax );
				const Ay = B_0(t,t,r,values.B,values.A, values.Amax );
				plot(Ax,Ay,pens[2] );
			}
	}
	}

	let ax1 = 0;
	let ay1 = 0;
	let ax2 = 0;
	let ay2 = 0;
	let first = true;

	for( let r = -8.99; r < 8; r+=0.08 ) {
		for( let t=-18.99; t < 18; t+= 5/1000 ) {

			

			// these two draw the X/Y grid lines.
			{
				const Ax = B_0(t,t,r,values.B,values.A, values.Amax );
				const Ay = B_0(r,t,r,values.B,values.A, values.Amax );
				if( !first ) line( ax1,ay1,Ax, Ay,pens[1]); 

				ax1=Ax; ay1=Ay;
				//plot(Ax,Ay,pens[1] );
			}
			{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
				const Ax = B_0(r,t,r,values.B,values.A, values.Amax );
				const Ay = B_0(t,t,r,values.B,values.A, values.Amax );
				if( !first ) line( ax2,ay2,Ax, Ay,pens[2]); 

				ax2=Ax; ay2=Ay;
				//plot(Ax,Ay,pens[2] );
			}
			if( first ) first = false;

		}

	}
	if(0)
	for( let r = -799; r < 800; r+=100 ) {
		for( let t=-1899; t < 1800; t+= 1000/1000 ) {
			if(1)
			{

// this is change in virtual Y by time... 
				{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
					const Ax = A_0(t,t,r,values.B,values.A )-t;
					const Ay = A_0(r,t,r,values.B,values.A )-r;
					const Bx = A_0(Ax,Ax,Ay,0, values.Amax );
					const By = A_0(Ay,Ax,Ay,0, values.Amax );
					//const Bx = Math.sign(Ax)*Ax*Ax/Math.sqrt(Ax*Ax+Ay*Ay);
					//const By = Math.sign(Ay)*Ay*Ay/Math.sqrt(Ax*Ax+Ay*Ay);
					plot(Bx,By,pens[4] );
					//plot(Bx,By,pens[7] );
				}
				{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
					const Ax = A_0(r,t,r,values.B,values.A )-r;
					const Ay = A_0(t,t,r,values.B,values.A )-t;
					const Bx = A_0(Ax,Ax,Ay,0, values.Amax );
					const By = A_0(Ay,Ax,Ay,0, values.Amax );
					//const Bx = Math.sign(Ax)*Ax*Ax/Math.sqrt(Ax*Ax+Ay*Ay);
					//const By = Math.sign(Ay)*Ay*Ay/Math.sqrt(Ax*Ax+Ay*Ay);
					plot(Bx,By,pens[5] );
					//plot(Bx,By,pens[8] );
				}

			}

if(0)
{
			{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
			//const Ax = dQ_0(_3to1(t,r,values.B),t,r,values.B,values.Amax );
			//const Ay = dQ_0(_3to1(t,r,values.B),t,r,values.B,values.Amax );
			const Ax = dQ_0(r,t,r,_2to1(values.B,values.A),values.Amax );
			const Ay = dQ_0(t,t,r,_2to1(values.B,values.A),values.Amax );
			//plot(t,Ay,pens[3] );
			//plot(t,Ax,pens[4] );
			plot(Ax,Ay,pens[5] );
			}
			{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
			const Ax = dQ_0(t,t,r,values.B,values.Amax );
			const Ay = dQ_0(r,t,r,values.B,values.Amax );
			//plot(t,Ay,pens[3] );
			//plot(t,Ax,pens[4] );
			plot(Ax,Ay,pens[4] );
			}
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
	let x_,y_;
	let x2_,y2_;
	for( let t = 0; t < 0.1; t+= 0.1/10 ) {
		
		{
			{
			const dx = -slopey*0.1 + slopex * (t-0.05);
			const dy = slopex*0.1 + slopey * (t-0.05);
				const mx = _mouseX + B_i( dx, _mouseX, _mouseY, values.B, values.A, values.Amax );
				const my = _mouseY + B_i( dy, _mouseX, _mouseY, values.B, values.A, values.Amax );
				{
					//const Ax = B_i(mx,mx,my,values.B,values.A, values.Amax );
					//const Ay = B_i(my,mx,my,values.B,values.A, values.Amax );
					const Ax = mx;// / _4to1(mx,my,values.B,values.A) * B_i(mx,mx,my,values.B,values.A, values.Amax );
					const Ay = my;//B_i(my,mx,my,values.B,values.A, values.Amax );
					//if( Math.sqrt(Ax*Ax+Ay*Ay)< (values.A+values.Amax+1) ) continue;
					if( t === 0 ) x_ = Ax, y_ = Ay;
					else line( x_,y_,Ax,Ay,pens[2] ), x_=Ax, y_=Ay;
					//plot(Ax,Ay, pens[2] );
				}
			}
			{
			const dx = slopey*0.1 + slopex * (t-0.05);
			const dy = -slopex*0.1 + slopey * (t-0.05);
				const mx = _mouseX + B_i( dx, _mouseX, _mouseY, values.B, values.A, values.Amax );
				const my = _mouseY + B_i( dy, _mouseX, _mouseY, values.B, values.A, values.Amax );

					const Ax = mx;// / _4to1(mx,my,values.B,values.A) * B_i(mx,mx,my,values.B,values.A, values.Amax );
					const Ay = my;//B_i(my,mx,my,values.B,values.A, values.Amax );
					if( t === 0 ) x2_ = Ax, y2_ = Ay;
					else line( x2_,y2_,Ax,Ay,pens[2] ), x2_=Ax, y2_=Ay;
				//plot(Ax,Ay, pens[2] );

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



try {
	drawsomething();
}catch(err) {
	alert( "GotError:"+err );
}
