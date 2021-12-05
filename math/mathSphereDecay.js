// https://www.geogebra.org/3d/qxejdpty
//https://www.geogebra.org/3d/sadtqz3x


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
	sliderAmax : document.getElementById( "Amax" ),
	sliderBmax : document.getElementById( "Bmax" ),
	sliderCmax : document.getElementById( "Cmax" ),
	sliderDmax : document.getElementById( "Dmax" ),
	sliderValA : document.getElementById( "Aval" ),
	sliderValB : document.getElementById( "Bval" ),
	sliderValC : document.getElementById( "Cval" ),
	sliderValD : document.getElementById( "Dval" ),
}

// area of a triangle

const values = {A:0.0,Amax:0,B:0.0,C:0.0,D:0.0};

myForm.sliderA.oninput = myForm.sliderValA.oninput = readValues;
myForm.sliderAmax.oninput = readValues;
myForm.sliderB.oninput = myForm.sliderValB.oninput = readValues;
myForm.sliderC.oninput = myForm.sliderValC.oninput = readValues;
myForm.sliderD.oninput = myForm.sliderValD.oninput = readValues;

myForm.sliderA.value = 0;
myForm.sliderAmax.value = 0;
myForm.sliderB.value = 0;

function readValues()  {
	values.A = (Number(myForm.sliderA.value)/20.0);
	values.Amax = (Number(myForm.sliderAmax.value)/20.0);
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
const Q_0 = (x,y,z,w) => Math.sqrt(x*x+y*y+z*z+w*w);  // from real to converted (squash)
const Q_i = (x,y,z,Q) => Math.sqrt( x*x+y*y+z*z-Q*Q );  // from converted to real (unsquash)
const dQ_0 = (l,x,y,z,Q) => l/_4to1(x,y,z,Q);  // from real to converted (squash)

// this normalizes a value from x/y/z -> x/y/z/w
const A_0 = (l,x,y,z,w) => l/Math.sqrt(x*x+y*y+z*z) * Q_0(x,y,z,w)


// this adds a Q component to a preivously only x/y/z/Q comonent
const M_0 = _5to1;
const M_00 = M_0;
const M_ii = (x,y,z,w,q) => Math.sqrt( x*x+y*y+z*z-w*w-q*q );  // from converted to real (unsquash)
const M_0i = (x,y,z,w,q) => Math.sqrt( x*x+y*y+z*z+w*w-q*q );  // from converted to real (unsquash)
const M_i0 = (x,y,z,w,q) => Math.sqrt( x*x+y*y+z*z-w*w+q*q );  // from converted to real (unsquash)

const dM_0 = (l,x,y,z,w,q) => (q)*(l/_4to1(x,y,z,w));  // from converted to real (unsquash)


const AB_0 = (l,x,y,z,w,q) => l/_3to1(x,y,0) * M_0( x,y,0,q );

// this normalizes a value from ( ( x/y/z -> x/y/z/w ) -> x/y/z/q )
const B_0 = (l,x,y,z,w,q) => A_0(l,x,y,z,w)/_4to1(x,y,z,w) * M_0( x,y,z,w,q );

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
		if( x_ < -5 || y_ < -5 ) return
		if( x_ > 5 || y_ > 5 ) return
		const x = unit(x_);
		const y = unit(-y_);
		output[((x+y*squareSize)<<2)+0] = c[0];
		output[((x+y*squareSize)<<2)+1] = c[1];
		output[((x+y*squareSize)<<2)+2] = c[2];
		output[((x+y*squareSize)<<2)+3] = c[3];
	}
		
//	const thisDel = (n,m)=>n*n*n-(n-m)*(n-m)*(n-m);
	const thisDel = (n,y)=>n*n*n-(n-step(1000))*(n-step(1000))*(n-step(1000))+y*y*y;


	                   
	for( let r = 0.01; r < 8; r+=0.5 ) {
		// circles have no elongation to have to scale,it only needs the radius scaled.
		const Gr = B_0(r,r,0,values.B,values.A, values.Amax );
		// draw a circle with an aprox number of dots... could be smarter (or draw segments)
		// the density could shade the pen also.
		for( let t=0; t < Math.PI*2; t+= Math.PI*2/((r+1+values.A)*500) ) {
			const x = Gr*Math.cos(t);
			const y = Gr*Math.sin(t);
			plot(x,y,pens[0] );
		}
	}

	//field is 2xg or 2g or g^2 for 2m?

	

	for( let r = -8.99; r < 8; r+=0.5 ) {
		for( let t=-18.99; t < 18; t+= 5/1000 ) {

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

			if(1)
			{

// this is change in virtual Y by time... 
				{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
					const Ax = A_0(t,t,r,values.B,values.A)-t;
					const Ay = A_0(r,t,r,values.B,values.A)-r;
					const Az = A_0(values.B,t,r,values.B,values.A)-values.B;
					const Bx = A_0(Ax,Ax,Ay,Az, values.Amax );
					const By = A_0(Ay,Ax,Ay,Az, values.Amax );
					//const Bx = Math.sign(Ax)*Ax*Ax/Math.sqrt(Ax*Ax+Ay*Ay);
					//const By = Math.sign(Ay)*Ay*Ay/Math.sqrt(Ax*Ax+Ay*Ay);
					plot(Bx,By,pens[4] );
					//plot(Bx,By,pens[7] );
				}
				{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
					const Ax = A_0(r,t,r,values.B,values.A)-r;
					const Ay = A_0(t,t,r,values.B,values.A)-t;
					const Az = A_0(values.B,t,r,values.B,values.A)-values.B;
					const Bx = A_0(Ax,Ax,Ay,Az, values.Amax );
					const By = A_0(Ay,Ax,Ay,Az, values.Amax );
					//const Bx = Math.sign(Ax)*Ax*Ax/Math.sqrt(Ax*Ax+Ay*Ay);
					//const By = Math.sign(Ay)*Ay*Ay/Math.sqrt(Ax*Ax+Ay*Ay);
					plot(Bx,By,pens[5] );
					//plot(Bx,By,pens[8] );
				}

			}
if(1) {
			{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
			//const Ax = dQ_0(_3to1(t,r,values.B),t,r,values.B,values.Amax );
			//const Ay = dQ_0(_3to1(t,r,values.B),t,r,values.B,values.Amax );
			const Ax = dM_0(r,t,r,values.B,values.A,values.Amax );
			const Ay = dM_0(t,t,r,values.B,values.A,values.Amax );
			//plot(t,Ay,pens[3] );
			//plot(t,Ax,pens[4] );
			plot(Ax,Ay,pens[5] );
			}
			{
// which is why this is parametarized across x,y,z,T axis... T isn't even a factor in this though
			const Ax = dM_0(t,t,r,values.B,values.A,values.Amax );
			const Ay = dM_0(r,t,r,values.B,values.A,values.Amax );
			//plot(t,Ay,pens[3] );
			//plot(t,Ax,pens[4] );
			plot(Ax,Ay,pens[4] );
			}
}
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
			plot(Ax,Ay, pens[0] );
		}
	}

	ctx.putImageData(_output, 0,0);

}

try {
	drawsomething();
}catch(err) {
	alert( "GotError:"+err );
}
