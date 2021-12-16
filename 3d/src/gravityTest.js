


import {popups,Popup} from "../../node_modules/@d3x0r/popups/popups.mjs"


let zDepth= 0;

const BASE_COLOR_WHITE = new THREE.Color(1,1,1,1);
const BASE_COLOR_BLACK = new THREE.Color(0,0,0,1);//[0,0,0,255];
const BASE_COLOR_RED = new THREE.Color(1,0,0,1);//[255,0,0,255];
const BASE_COLOR_BLUE = new THREE.Color(0,0,1,1);//[0,0,255,255];
const BASE_COLOR_GREEN = new THREE.Color(0,1,0,1);//[0,255,0,255];



let invertCurvature =false;

const values = { sliderA : 0
		,sliderB : 0
		};

const wellOfs = 1;
const wells = [ {x:wellOfs,y:wellOfs,z:0}
              , {x:wellOfs,y:-wellOfs,z:0}
              , {x:-wellOfs,y:wellOfs,z:0} 
              , {x:-wellOfs,y:-wellOfs,z:0} ];

function ColorAverage( a, b, i,m) {

    var c = [ (((b[0]-a[0])*i/m) + a[0])|0,
        (((b[1]-a[1])*i/m) + a[1])|0,
        (((b[2]-a[2])*i/m) + a[2])|0,
		(((b[3]-a[3])*i/m) + a[3])|0
    ];
    //console.log( "color: ", a, b, c, i, ((b[1]-a[1])*i/m)|0, a[1], ((b[1]-a[1])*i/m) + a[1] )
    return c;//`#${(c[0]<16?"0":"")+c[0].toString(16)}${(c[1]<16?"0":"")+c[1].toString(16)}${(c[2]<16?"0":"")+c[2].toString(16)}`
}


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
const B_0 = (l,x,y,z,w,q) => A_0(l,x,y,z,w)/_4to1(x,y,z,w) * M_00( x,y,z,w,q );

const B_i = (l,x,y,z,w,q) => A_i(l,x,y,z,w)/_4to1(x,y,z,w) * (invertCurvature?M_00( x,y,z,w,q ):M_ii( x,y,z,w,q ));




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




function updateGeometry( normalVertices,normalColors) {
        const spaceScale = 3.0;     
	const incr = 0.25;
	const s = {x:6.0,y:0,z:0};
	const q = {x:0,y:0,z:0};
	const p = {x:0,y:0,z:zDepth } ;

	for( let zDepth = -20; zDepth < 20; zDepth+=incr *10 ) 
	{
		p.z = zDepth + values.sliderA/100;
	for( let r = -20; r < 20; r+=incr ) {
		
		for( let c = -20; c < 20; c+=incr ) {

			// -----------------------------------------------------------------
			const P = {x:0,y:0,z:0};
	if(1) {
		 	p.x = c;
			p.y = r;

			for( let o of wells ) {
				const p_ = L_sq(p, 0, o, s, q );
				const a = p_.x - p.x;
				const b = p_.y - p.y;
				const c = p_.z - p.z;
				P.x += a;
				P.y += b;
				P.z += c;
			}
			P.x += p.x;
			P.y += p.y;
                	P.z += p.z;


			normalVertices.push( new THREE.Vector3( (P.x)*spaceScale ,(P.y)*spaceScale    , (P.z)*spaceScale ))

			// -----------------------------------------------------------------

			P.x = P.y=P.z = 0;
		 	p.x = c-incr;
			p.y = r;

			for( let o of wells ) {
				const p_ = L_sq(p, 0, o, s, q );
				const a = p_.x - p.x;
				const b = p_.y - p.y;
				const c = p_.z - p.z;
				P.x += a;
				P.y += b;
				P.z += c;
			}
			//plot( p.x, p.y, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, dl, 1 ) )
//			plot( p.y, p.x, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, dl, 1 ) )
			P.x += p.x;
			P.y += p.y;
                	P.z += p.z;
			//line( p.x,p.y,P.x,P.y, pens[0] )


			normalVertices.push( new THREE.Vector3( (P.x)*spaceScale ,(P.y)*spaceScale    , (P.z)*spaceScale ))
			normalColors.push( BASE_COLOR_BLUE )
			normalColors.push( BASE_COLOR_BLUE )
	}
			// -----------------------------------------------------------------
	if(1) {
			P.x = P.y=P.z = 0;

		 	p.x = c;
			p.y = r;

			for( let o of wells ) {
				const p_ = L_sq(p, 0, o, s, q );
				const a = p_.x - p.x;
				const b = p_.y - p.y;
				const c = p_.z - p.z;
				P.x += a;
				P.y += b;
				P.z += c;
			}
			P.x += p.x;
			P.y += p.y;
                	P.z += p.z;

			normalVertices.push( new THREE.Vector3( (P.x)*spaceScale ,(P.y)*spaceScale    , (P.z)*spaceScale ))

			// -----------------------------------------------------------------

			P.x = P.y=0;P.z = 0;
		 	p.x = c;
			p.y = r-incr;

			for( let o of wells ) {
				const p_ = L_sq(p, 0, o, s, q );
				const a = p_.x - p.x;
				const b = p_.y - p.y;
				const c = p_.z - p.z;
				P.x += a;
				P.y += b;
				P.z += c;
			}
			//plot( p.x, p.y, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, dl, 1 ) )
//			plot( p.y, p.x, ColorAverage( BASE_COLOR_WHITE, BASE_COLOR_BLACK, dl, 1 ) )
			P.x += p.x;
			P.y += p.y;
                	P.z += p.z;
			//line( p.x,p.y,P.x,P.y, pens[0] )


			normalVertices.push( new THREE.Vector3( (P.x)*spaceScale ,(P.y)*spaceScale    , (P.z)*spaceScale ))
			normalColors.push( BASE_COLOR_GREEN )
			normalColors.push( BASE_COLOR_GREEN )
	}

}

		}
	}
}

function initUI( updateMesh ) {
	const controls = document.getElementById( "controls" );
        console.log( "controls",controls );
	const slider = popups.makeSlider( controls, values, "sliderA", "zLevel" );
	popups.makeButton( controls, "Update", updateMesh );
}

export {initUI}
export {updateGeometry};
