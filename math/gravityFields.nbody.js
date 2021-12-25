// https://www.geogebra.org/3d/qxejdpty
//https://www.geogebra.org/3d/sadtqz3x

// d/dx (log(x)) = 1/x
//  which then d/dx(1/x) = -1/x^2  which is sort of the answer I was expecting... 
// 


const canvas = document.getElementById( "testSurface" );
const ctx = canvas.getContext( '2d' );

const BASE_COLOR_WHITE = [255,255,255,255];
const BASE_COLOR_BLACK = [0,0,0,255];
const BASE_COLOR_RED = [255,0,0,255];
const BASE_COLOR_BLUE = [0,0,255,255];
const BASE_COLOR_YELLOW = [255,255,0,255];
const BASE_COLOR_GREEN = [0,255,0,255];

const wells = [/* {x:5,y:5,z:0,g:1.0}
              , {x:5,y:-5,z:0,g:1.0}
              , {x:-5,y:5,z:0,g:1.0} 
              , {x:-5,y:-5,z:0,g:1.0} */ ];

for( let w = 0; w < 100; w++ ) {
	wells.push( {x:(Math.random()-0.5)* 50,y:(Math.random()-0.5)* 50,z:0,g:Math.random()/3+0.5} );
}

const localDel = 0.1;
const local = [ {x:1,y:1,z:1} 
	      , {x:-1,y:1,z:1} 
	      , {x:1,y:-1,z:1} 
	      , {x:-1,y:-1,z:1} 
	      , {x:1,y:1,z:-1} 
	      , {x:-1,y:1,z:-1} 
	      , {x:1,y:-1,z:-1} 
	      , {x:-1,y:-1,z:-1}  
		];


function measureArcBox( p, s, q ) {
	// each well applies a effective curvature tensor.
	// this has two components - the amount the that radius is compressed
	//  and the amount that the arc is expanded.
	//   0->s+q
	// 1-> 
	// 1/1 = infinity form s+q
	// radius/theta = 1 (?)
	// theta of 0 is 180
	// theta of 1 is only 

	// this is like log(r) space... remember log-quaternion.

	// R is 0 = (s+r)
	//      1 = x/x.len * sqrt(11+(s))
	//      2 = x/x.len * sqrt(22+(s))
	//	


	//    xx/lenlen * (1+s)
	//    xx  (1+s)/lenlen = x'x'
	//     


	//  === Stress of Arc ===
	// - stretch of the outer edge is
	//        (sqrt(x^(2)+S S)-x)*2 π
	//     (sqrt(xx+ss)-x)*2pi
	//
	//  the change in the curvature  	
	//     x/sqrt(xx+SS) -1
	//   
	//  for any S above, the change of the curvature is the same.
	//   get get a proper change in gradient the height of the gradient needs to be applied to the change.
	//   SS*(x/sqrt(xx+SS) -1)  (*2pi?)


	//  === Stress of radius ===
	//      sqrt(xx+SS)-x
	// this itself is just the displacement of the space
	//    the change in the displacment is 
	//     x/sqrt(xx+SS) -1
	//   the density thereforeis
	//   S * (x/sqrt(xx+SS) - 1)
	
	const rl = _3to1(p);
	const S = _2to1(_3to1(s.x,s.y,s.z),_3to1(q.x,q.y,q.z) )/( sqrt(rl*rl+S*S) - 1);
	
	// this gives the relative density changes 
	return S;
	
}

function measureArcs( p, s, q ) {
	const t = {x:0,y:0,z:0};
	const P = {x:0,y:0,z:0};
	const D = {x:1,y:1,z:1};

	const xy = { a:1, b:1 };
	const xz = { a:1, b:1 };
	const yz = { a:1, b:1 };

	// forward = forward dot forward
	//		right dot forward
	//		forward dot right
	//		right dot right
	//
		

	// for each well, 
	const dens = [];
	let first = true;
	const localDels = local.map( (del,idx)=>{
		P.x = p.x + del.x*localDel;
		P.y = p.y + del.y*localDel;
		P.z = p.z + del.z*localDel;
		for( let o of wells ) {
			// for each displament point, get the spacial density for this well.
			t.x = P.x - o.x;
			t.y = P.y - o.y;
			t.z = P.z - o.z;
			const S = measureArc( t, s, q );
			// this is the arc, in the direction of
			if( first ) {
				// in the direction of x/y/z is S.  that means some transform of 
				const forward = { x:t.x, y:t.y, z:t.z }

			
				//plane normal UV				
			
				dens.push( { x:1, y:1, z:1 } );
			}else dens[idx] *= S;

		first = false;	
		}
	})

	const localDels2 = localDels.map( (del,idx)=>{
		D.x *= del.x * dens[idx];
		D.y *= del.y * dens[idx];
		D.z *= del.z * dens[idx];
	})

	//console.log( "This density is then... the sum of the deltas from the central delta" );
	return t;

}


// this returns the net change of all 8 corners around a point.
// it's the general motion of space, and gives the uphill gradient
function measureBox( p, s, q ) {
	const t = {x:0,y:0,z:0};
	const P = {x:0,y:0,z:0};
	const D = {x:0,y:0,z:0};


		t.x = p.x;
		t.y = p.y;
		t.z = p.z;

		for( let o of wells ) {
			//plot( o.x,o.y,pens[0]);
			if( p === o ) continue;

			const p_ = L_sq(p, 0, o, s, q );
			const a = p_.x - t.x;
			const b = p_.y - t.y;
			const c = p_.z - t.z;
			D.x += a;
			D.y += b;
			D.z += c;
		}
		// D is the net delta of the origin

	const localDels = local.map( (del)=>{
		t.x = p.x + del.x*localDel;
		t.y = p.y + del.y*localDel;
		t.z = p.z + del.z*localDel;

		for( let o of wells ) {
			//plot( o.x,o.y,pens[0]);
			//if( p === o ) continue;
			const p_ = L_sq(t, 0, o, s*o.g, q );
			const a = p_.x - t.x;
			const b = p_.y - t.y;
			const c = p_.z - t.z;
			P.x += a;
			P.y += b;
			P.z += c;
		}
		return {x:P.x-D.x,y:P.y-D.y,z:P.z-D.z};
	} );
	t.x = 0;
	t.y = 0;
	t.z = 0;
	localDels.map( (m)=>{
		t.x += m.x;
		t.y += m.y;
		t.z += m.z;
	} );
	t.x /= 8;
	t.y /= 8;
	t.z /= 8;
	//console.log( "This density is then... the sum of the deltas from the central delta" );
	return t;
}

const spin_0 = {x:0,y:0,z:0};
const spin_1 = {x:0,y:0,z:0};

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
	values.A = (Number(myForm.sliderA.value)/40.0);
	values.A *= 5;
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

// unit lengths for various lenth vectors.
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






const _zero = {x:0,y:0,z:0};

const L_r = {x:0,y:0,z:0};
// scale point x relative to (p)osition with (s)pin vector
function L_0( x, p, s ) {
	const rp = {x:x.x-p.x,y:x.y-p.y,z:x.z-p.z}; // this is effective real space position.
	const rl = _4to1( s.x, s.y, s.z, 1 );
	//const rs = {x:s.x-s0.x,y:s.y-s0.y,z:s.z-s0.z}; // this is effective real space position.

	const q0 = Q_0( s.x, s.y, s.z, _3to1( s.x, s.y, s.z ) );

	L_r.x=p.x + rp.x * q0/rl
	L_r.y=p.y + rp.y * q0/rl
	L_r.z=p.z + rp.z * q0/rl

	return L_r;
	const r = { x: p0.x + rp.x * q0/rl
	          , y: p0.y + rp.y * q0/rl
	          , z: p0.z + rp.z * q0/rl };
}

// scale point x relative to (p)osition with (s)pin vector
// projects light space to flat space.
//   includes spin and charge spaces.
// spin is a full space though.
// the sizes passed for S and Q are extents.
function L_sq( x, zofs, p, s, q ) {
	
	const rp = {x:x.x-p.x,y:x.y-p.y,z:x.z-p.z-zofs}; // this is effective real space position.
	const rl = _4to1( rp.x, rp.y, rp.z, 0 );
	const sl = _3to1( s.x, s.y, s.z );
	const ql = _3to1( q.x, q.y, q.z );
	const tl = Math.sqrt(sl*sl+ql*ql);

	const q0 = _4to1( rp.x, rp.y, rp.z, tl );
	// I know Z del, I don't really want to include x/y distance and look at sphere cross sections
	// including x/y for the grid lines is fine, because they end up being diagonals, minus x.
	
	// thi sis the plane...
	L_r.x=p.x + rp.x * q0/rl
	L_r.y=p.y + rp.y * q0/rl
	L_r.z=p.z + rp.z * q0/rl
	
	return L_r;
}

// inverse would remove qq from the above

function L_isq( x, p, s, q ) {
	
	const rp = {x:x.x-p.x,y:x.y-p.y,z:x.z-p.z}; // this is effective real space position.
	const rl = _3to1( rp.x, rp.y, rp.z );
	//const rs = {x:s.x-s0.x,y:s.y-s0.y,z:s.z-s0.z}; // this is effective real space position.	

	const q0 = Q_i( rp.x, rp.y, rp.z, _3to1( s.x, s.y, s.z ) );
	// additionally shift this point outward.
	const q2 = Q_i( q0.x, q0.y, q0.z, _3to1( q.x, q.y, q.z ) );
	// keep going for N inner dimensions to project between some 0-N offset

	L_r.x=p0.x + rp.x * q2/rl
	L_r.y=p0.y + rp.y * q2/rl
	L_r.z=p0.z + rp.z * q2/rl

	return L_r;
	const r = { x: p.x + rp.x * q2/rl
	          , y: p.y + rp.y * q2/rl
	          , z: p.z + rp.z * q2/rl };
}



// This adds one imaginary component
function L_1( r, zdel, q ) {
	const rl = _3to1( r.x, r.y, r.z );

	const q0 = Q_0( r.x, r.y, r.z, _3to1( q.x, q.y, q.z ) );

	L_r.x= r.x * q0/rl
	L_r.y= r.y * q0/rl
	L_r.z= r.z * q0/rl

	return L_r;
}

// spacially scales the extents used.
// d/dx(log(x)) = 1/x
function L_d( x, zofs, p, s, q ) {
	//if( !zofs ) return L_sq( x,zofs,p,s,q );
	const rx = {x:x.x-p.x,y:x.y-p.y,z:x.z-p.z-zofs}; // this is effective real space position.
	const rl_ = _3to1( rx.x, rx.y, rx.z );  // add 1 to be able to scale within q.
	const rl = zofs<rl_?_2to1( rl_, (rl_-zofs)/rl_ ):_2to1(rl_,0);  // add 1 to be able to scale within q.
	
	const ql = _3to1( q.x, q.y, q.z );

	L_r.x=  p.x+(rx.x / rl) *ql
	L_r.y=  p.y+(rx.y / rl) *ql
	L_r.z=  p.z+(rx.z / rl) *ql

	return L_r;
}


function L_d_iron_zofs( x, zofs, p, s, q ) {
	//if( !zofs ) return L_sq( x,zofs,p,s,q );
	const rp = {x:x.x-p.x,y:x.y-p.y,z:x.z-p.z-zofs}; // this is effective real space position.
	const sl = _4to1( s.x, s.y, s.z, zofs );
	const rl = _4to1( rp.x, rp.y, rp.z, 0 );
	
	const ql = zofs-_3to1( q.x, q.y, q.z )

	L_r.x=  x.x * ql/rl 
	L_r.y=  x.y * ql/rl
	L_r.z=  x.z * ql/rl

	return L_r;
}




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
	const x = (((e.clientX-rect.left)-(w/2.0))/w) * 100;
	const y = -(((e.clientY-rect.top)-(h/2.0))/h) * 100;
	mouseX = x;
	mouseY = y;
	drawsomething();
} );



function drawsomething() {


	let x, y, z, w, X, Y, Z, W;
	const squareSize = 1024;
	const minScale = -80;
	const maxScale = 80;
	//const minScale = -50;
	//const maxScale = 50;
	const delStep = (min,max,x)=>( (max-min)/x );
	const step = (x)=>( (maxScale-minScale)/x );
	const unit = (x)=>Math.floor( squareSize/2 + (x * squareSize/(maxScale-minScale) ) );
	const unit2 = (x)=>x;
	const range = maxScale-minScale;
	const zero = -minScale;

	ctx.clearRect(0,0,squareSize,squareSize );
	var _output = ctx.getImageData(0, 0, squareSize, squareSize );
	var output = _output.data;
function updateWells() {
	const s={x:values.A,y:0,z:0};
	const q={x:values.Amax,y:0,z:0};
	let first = true;			
	for( let o of wells ) {
		if( first ) { first = false; continue; }
		const a = measureBox( o, s, q );
		line( o.x, o.y, o.x+a.x, o.y+a.y, BASE_COLOR_BLUE );
		//const al = _3to1(a.x,a.y,a.z);
		o.x += a.x/50;
		o.y += a.y/50;
//		o.z += -a.z/50;
	}

}
                        //updateWells();

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
		if( x_ < minScale || y_ < minScale ) return
		if( x_ > maxScale || y_ > maxScale ) return
		const x = unit(x_);
		const y = unit(-y_);
		output[((x+y*squareSize)<<2)+0] = c[0];
		output[((x+y*squareSize)<<2)+1] = c[1];
		output[((x+y*squareSize)<<2)+2] = c[2];
		output[((x+y*squareSize)<<2)+3] = c[3];
	}

	function line( x1, y1, x2, y2, c ) {
		const realX1 = unit(x1);
		const realY1 = unit(-y1);
		const realX2 = unit(x2);
		const realY2 = unit(-y2);
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
	

		
//	const thisDel = (n,m)=>n*n*n-(n-m)*(n-m)*(n-m);
	const thisDel = (n,y)=>n*n*n-(n-step(1000))*(n-step(1000))*(n-step(1000))+y*y*y;

	const s={x:values.A,y:0,z:0};
	const q={x:values.Amax,y:0,z:0};
	const p0={x:0,y:0,z:0}; // used to cache the previous point for a line.
	const p0_={x:0,y:0,z:0}; // used to cache the previous point for a line.
//	const 	                   
	const  p= {x:0, y:0,z:values.B }

	//field is 2xg or 2g or g^2 for 2m?

//	p.z = ;
//	p0.z = 0;
	const rows = [];
if(1)
	for( let r = minScale; r < maxScale; r += step(20) ) {
		for( let t = minScale; t < maxScale; t += step(20) ) {
			p.x = r; p.y = t; p.z = 0;
			const a = measureBox( p, s, q );
			const al = _3to1(a.x,a.y,a.z);
			line( p.x, p.y, p.x+a.x/15,p.y+a.y/15,ColorAverage( BASE_COLOR_BLUE, BASE_COLOR_RED, al, 100 ) )
			if( al > 10 ) {
				plot( p.x, p.y, ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_YELLOW, al, 100 ) )
			}else{
				plot( p.x, p.y, ColorAverage( BASE_COLOR_BLUE, BASE_COLOR_RED, al, 10 ) )
			}
		}
	}

			for( let o of wells ) {
				plot( o.x,o.y,pens[0]);
			}

	let first = true;
if(1)
	for( let r = -58.99; r < 58; r+=1 ) {
		const row = [];
	//	rows.push(row );
		first = true;
		for( let t=-68.99; t < 68; t+= step(1000) ) {
		 	p.x = t;
			p.y = r;
			const len =  _3to1( p.x, p.y, p.z );
			//p.z = 0;
			// these two draw the X/Y grid lines.
			if(1)
			{
				const P = {x:0,y:0,z:0};
				const M = {x:0,y:0,z:0};
				const N = {x:0,y:0,z:0};
				for( let o of wells ) {
					s.x = values.A * o.g;
					//if( _3to1( o.x, o.y, o.z ) < len ) 
					{
					const p_ = L_sq(p, 0, o, s, q );
					const a = p_.x - p.x;
					const b = p_.y - p.y;
					const c = p_.z - p.z;
					if( a > M.x ) M.x = a; if(a<N.x)N.x=a;
					if( b > M.y ) M.y = b; if(b<N.y)N.y=b;
					if( c > M.z ) M.z = c; if(c<N.z)N.z=c;
					P.x += a;
					P.y += b;
					P.z += c;
					}
				}
				const dl = _2to1( P.x, P.y );
				//plot( p.x, p.y, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, dl, 1 ) )
//				plot( p.y, p.x, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, dl, 1 ) )
				P.x += p.x;
				P.y += p.y;
				//line( p.x,p.y,P.x,P.y, pens[0] )
				//line( p.y,p.x,P.y,P.x, pens[1] )
				//row.push( P );

			if( first ) 
				plot(P.x,P.y,pens[1] );
			else
				line( P.x,P.y,p0.x, p0.y, pens[1] );
			p0.x = P.x;
			p0.y = P.y;
			p0.z = P.z;

			}
		 	p.x = r;
			p.y = t;
			if(1)
			{
				const P = {x:0,y:0,z:0};
				const M = {x:0,y:0,z:0};
				const N = {x:0,y:0,z:0};
				for( let o of wells ) {
					s.x = values.A * o.g;
					const p_ = L_sq(p, 0, o, s, q );
					const a = p_.x - p.x;
					const b = p_.y - p.y;
					const c = p_.z - p.z;
					if( a > M.x ) M.x = a; if(a<N.x)N.x=a;
					if( b > M.y ) M.y = b; if(b<N.y)N.y=b;
					if( c > M.z ) M.z = c; if(c<N.z)N.z=c;
					P.x += a;
					P.y += b;
					P.z += c;
				}

				const dl = _2to1( P.x, P.y );
				//plot( p.x, p.y, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, dl, 1 ) )
//				plot( p.y, p.x, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, dl, 1 ) )
				P.x += p.x;
				P.y += p.y;
			if( first ) 
				plot(P.x,P.y,pens[2] );
			else
				line( P.x,P.y,p0_.x, p0_.y, pens[2] );

			p0_.x = P.x;
			p0_.y = P.y;
			p0_.z = P.z;
			}
			first  =false;
		}
	}

//	ctx.putImageData(_output, 0,0);


	let start = Date.now();
	const _p = {x:0, y:0 };
	let _l = 0;
	first = true;
	for( let t = 0; t < 360; t+= 10 ) {
		let slopex = Math.cos( t/180*Math.PI );
		let slopey = Math.sin( t/180*Math.PI );
		let red_blue = 0.5;
		for( let t=0; t < 50; t+= 50/1000 ) {

			const mx = mouseX + slopey*Math.cos(2*t) + slopex * t;
			const my = mouseY - slopex*Math.cos(2*t) + slopey * t;

	/*
			const now = Date.now();
			if( (now-start) > 50 ) {
				ctx.putImageData(_output, 0,0);
				start = now;
				console.log( "tick?" );
			}
	*/
		 	p.x = mx;
			p.y = my;
			//p.z = 0;
			// these two draw the X/Y grid lines.
			if(1)
			{
				const P = {x:0,y:0,z:0};
				const M = {x:0,y:0,z:0};
				const N = {x:0,y:0,z:0};
				for( let o of wells ) {
					s.x = values.A * o.g;
					const p_ = L_sq(p, 0, o, s, q );
					const a = p_.x - p.x;
					const b = p_.y - p.y;
					const c = p_.z - p.z;
					if( a > M.x ) M.x = a; if(a<N.x)N.x=a;
					if( b > M.y ) M.y = b; if(b<N.y)N.y=b;
					if( c > M.z ) M.z = c; if(c<N.z)N.z=c;
					P.x += a;
					P.y += b;
					P.z += c;
				}
				const dl = _2to1( P.x, P.y );
				P.x += p.x;
				P.y += p.y;
				if( red_blue < 0.5 ) {
					plot(P.x,P.y,ColorAverage( BASE_COLOR_RED, BASE_COLOR_GREEN, red_blue, 0.5 ) );	
				} else {
					plot(P.x,P.y,ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_BLUE, red_blue-0.5, 0.5 ) );	
				}
			}


		 	p.x = mouseX + slopex * t;
			p.y = mouseY + slopey * t;

			// these two draw the X/Y grid lines.
			if(1)
			{
				const P = {x:0,y:0,z:0};
				const M = {x:0,y:0,z:0};
				const N = {x:0,y:0,z:0};
				for( let o of wells ) {
					s.x = values.A * o.g;
					const p_ = L_sq(p, 0, o, s, q );
					const a = p_.x - p.x;
					const b = p_.y - p.y;
					const c = p_.z - p.z;
					if( a > M.x ) M.x = a; if(a<N.x)N.x=a;
					if( b > M.y ) M.y = b; if(b<N.y)N.y=b;
					if( c > M.z ) M.z = c; if(c<N.z)N.z=c;
					P.x += a;
					P.y += b;
					P.z += c;
				}
				const dl = _2to1( P.x, P.y );
				if( first ){
					first = false;
					_l = dl;
					_p.x = P.x;
					_p.y = P.y;
				} else {
					if( _l < dl ) {
						red_blue = (( red_blue * 499 ) + 1)/500;
					} else {
						red_blue = (( red_blue * 499 ) + 0)/500;
					}
					_l = dl;
				}
				P.x += p.x;
				P.y += p.y;
				if( red_blue < 0.5 ) {
					plot(P.x,P.y,ColorAverage( BASE_COLOR_RED, BASE_COLOR_GREEN, red_blue, 0.5 ) );	
				} else {
					plot(P.x,P.y,ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_BLUE, red_blue-0.5, 0.5 ) );	
				}
				

			}
		}
	}
	 if(0)
	{
	const slopex = mouseX/Math.sqrt(mouseX*mouseX+mouseY*mouseY);
	const slopey = mouseY/Math.sqrt(mouseX*mouseX+mouseY*mouseY);
	for( let t = 0; t < 2; t+= 2/1000 ) {
		
		{
			{
			const mx = mouseX +slopey*0.1 + slopex * (t-1);
			const my = mouseY -slopex*0.1 + slopey * (t-1);
				const Ax = B_0(mx,mx,my,values.B,values.A, values.Amax );
				const Ay = B_0(my,mx,my,values.B,values.A, values.Amax );
			//if( Math.sqrt(Ax*Ax+Ay*Ay)< (values.A+values.Amax+1) ) continue;
			plot(Ax,Ay, pens[2] );
			}
			{
			const mx = mouseX -slopey*0.1 + slopex * (t-1);
			const my = mouseY +slopex*0.1 + slopey * (t-1);
				const Ax = B_0(mx,mx,my,values.B,values.A, values.Amax );
				const Ay = B_0(my,mx,my,values.B,values.A, values.Amax );
			//if( Math.sqrt(Ax*Ax+Ay*Ay)< (values.A+values.Amax+1) ) continue;
			plot(Ax,Ay, pens[2] );
			}
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
