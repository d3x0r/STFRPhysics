
/*
<script src="require.js"></script>
<script src="three.js/build/three.js"></script>
<script src="three.js/build/LoaderSupport.js"></script>
<script src="three.js/build/OBJLoader2.js"></script>
<script src="three.js/build/OBJLoader.js"></script>
<script src="three.js/personalFill.js"></script>

<script src="NaturalCamera.js"></script>
*/

import {THREE,Viewer,BufferAttribute} from "./three-js-view.js"
import {ControlForm} from "./controlForm.mjs"
const Vector3 = THREE.Vector3;
import {lnQuat} from "../3d/src/lnQuatSq.js"

lnQuat.setVectorType( THREE.Vector3)

//var glow = require( './glow.renderer.js' );

var l = 0;
//var SaltyRNG = require( "salty_random_generator.js" ).SaltyRNG;
//var lnQuat = require( "../lib/lnQuat.js" );

//var RNG = SaltyRNG( (salt)=>{salt.push( Date.now() ) } );

//var words1 = voxelUniverse.createTextCluster( "Hello World" );
let world = null;
var myMover = null;
var myBrainBoard = null;
var myMotion = null;
var movers2 = [];
var movers = [];
let skybox = null;
var dirs = [];
var camMat = null;
var status_line;


var controlNatural;
var controlOrbit;
var controls;
	var scene;
	var scene2;
	var camera, renderer;
	let mode = 0;
	var light;
	var geometry, material, mesh = [];
	var frame_target = [];
	var slow_animate = false;
	var frame = 0;

	var tests = [];

var mx = 0;
var my = 0;
var xorg = -0.5 + ( -0.5/16 ) + ( 0.5 / 3200 );
var yorg = 0.5;
var display_scale = 1.0/3200000.0;

const 	moveSpeed = 12 * 0.0254;


var ofsx, ofsy;
var dx, dy;

function Color(r,g,b) { return [r,g,b,255]; }


const BASE_COLOR_WHITE = [255,255,255,255];
const BASE_COLOR_BLACK = [0,0,0,255];
const BASE_COLOR_RED = [127,0,0,255];
const BASE_COLOR_LIGHTBLUE = [0,0,255,255];
const BASE_COLOR_LIGHTRED = [255,0,0,255];
const BASE_COLOR_LIGHTGREEN = [0,255,0,255];
const BASE_COLOR_BLUE = [0,0,127,255];
const BASE_COLOR_GREEN = [0,127,0,255];
const BASE_COLOR_MAGENTA = [127,0,127,255];
const BASE_COLOR_BROWN = [127,92,0,255];


const BASE_COLOR_DARK_BLUE = [0,0,132,255];
const BASE_COLOR_MID_BLUE = [0x2A,0x4F,0xA8,255];
const BASE_COLOR_YELLOW = [255,255,0,255];
const BASE_COLOR_LIGHTCYAN = [0,192,192,255];
const BASE_COLOR_DARK_BLUEGREEN = [0x06, 0x51, 0x42,255];
const BASE_COLOR_DARK_GREEN = [0,93,0,255];
const BASE_COLOR_DARK_BROWN = [0x54,0x33,0x1c,255];  //54331C
const BASE_COLOR_LIGHT_TAN = [0xE2,0xB5,0x71,255];    //E2B571

const BASE_COLOR_ORANGE = [150,128,0,255];


const viewer = new Viewer( tickScene, document.getElementById( "app" ) /*, controlForm*/ );

let controlForm = null;
let lineGeometry = null;
let lineSegments  = null;

function tickScene( ) {

}

function init() {

	
//	const form = new BrainForm( controlContainer  );
	controlForm = new ControlForm( document.getElementById( "controls" ), {
		controls:controls,
		reInit() {
			//addDipoles()
		}
	});
//	myBrainBoard = form;
	
		
	let tmp;
		tmp = document.getElementById( "Controls") ;
		if( tmp ) {
			tmp.addEventListener( "click", (evt)=>{
					form.show();
				} );
			
	}


		//controlOrbit = new THREE.OrbitControls( camera, renderer.domElement );
		//controlOrbit.enable();



		const geometryNormals	= new THREE.BufferGeometry();
		const normalVerts = new BufferAttribute(Float32Array, 3);
		const normalColors = new BufferAttribute(Float32Array, 4);
		
		{
			var linematerial = new THREE.LineBasicMaterial({
				color : 0xffffff
				, vertexColors: true
				, vertexAlphas: true
			});
			lineSegments = new THREE.LineSegments( geometryNormals, linematerial );
			viewer.addModelToScene(lineSegments )
		}


		updateGeometry(normalVerts,normalColors);

		

		geometryNormals.setAttribute( "position", new THREE.BufferAttribute( normalVerts.buffer, 3 ) );
		geometryNormals.setAttribute( "color", new THREE.BufferAttribute( normalColors.buffer, 4, true ) );

	controlForm.on( "change", ()=>{
				updateGeometry(normalVerts,normalColors);

				geometryNormals.setAttribute( "position", new THREE.BufferAttribute( normalVerts.buffer, 3 ) );
				geometryNormals.setAttribute( "color", new THREE.BufferAttribute( normalColors.buffer, 4, true ) );
			geometryNormals.setDrawRange( 0, normalVerts.used );
	} );

}

const spaceScale = 0.1;
const spaceScale2 = 0.01;

function updateGeometry(verts,cols) {
	verts.length = 0;
	cols.length = 0;
	
	for( let seg = 0; seg < 400; seg++ ) {
		const color = new THREE.Color( 0,0,0,1 );
		color.setHSL( (seg % 100) / 100, 1.0, 0.5 );
		cols.push( color );
		cols.push( color );

		verts.push( new THREE.Vector3( seg*spaceScale,0, 0 ))
		verts.push( new THREE.Vector3( (seg+1)*spaceScale ,0,0 ))
		if( seg % 3 == 0 ) {
			for( let seg2 = 0; seg2 < 400; seg2++ ) {
				const color = new THREE.Color( 0,0,0,1 );
				color.setHSL( (seg2 % 100) / 100, 1.0, 0.5 );
				cols.push( color );
				cols.push( color );
				verts.push( new THREE.Vector3( seg*spaceScale,0, 0 ))
				verts.push( new THREE.Vector3( seg*spaceScale,5*spaceScale * Math.cos(seg/100*Math.PI*2), 5*spaceScale * Math.sin(seg/100*Math.PI*2) ))
			}
		}
	}

	verts.push( new THREE.Vector3( 0, 0, 0 ) );
	const A = new THREE.Vector4( controlForm.sliderAX, controlForm.sliderAY, controlForm.sliderAZ, controlForm.sliderAW );
	verts.push( A );

	cols.push( new THREE.Color( 1, 0, 0 ) );
	cols.push( new THREE.Color( 1, 0, 0 ) );


	verts.push( new THREE.Vector3( 0, 0, 0 ) );
	const B = new THREE.Vector4( controlForm.sliderBX, controlForm.sliderBY, controlForm.sliderBZ, controlForm.sliderBW );
	verts.push( B );
	cols.push( new THREE.Color( 0, 1, 0 ) );
	cols.push( new THREE.Color( 0, 1, 0 ) );

	const C = dotcross4( A, B );
	console.log( "Cross Product:", C );

	verts.push( new THREE.Vector3(C.x, C.y, C.z) );
	verts.push( new THREE.Vector3(0,0.05,0.05) );
	cols.push( new THREE.Color( 0.8, 0.8, 0.1 ) );
	cols.push( new THREE.Color( 0.8, 0.8, 0.1 ) );


	const Al = A.length();
	const Bl = B.length();

	if( Al && Bl ) {

		const a = A.clone().multiplyScalar( 1/Al );	
		const b = B.clone().multiplyScalar( 1/Bl );	
	   
		verts.push( new THREE.Vector3( 0.1, 0, 0 ) );
		verts.push( b );
		cols.push( new THREE.Color( 0, 1, 1 ) );
		cols.push( new THREE.Color( 0, 1, 1 ) );
		const Q = new lnQuat();


						const l2 = (Math.abs(b.y)/*+abs(theta.y)*/+Math.abs(b.z));
						if( l2 ) {
							const l3 = Math.sqrt(b.x*b.x+b.y*b.y+b.z*b.z);
							//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );

							const tx = b.x /l3; // square normal
							const cosTheta = Math.acos( tx ); // 1->-1 (angle from pole around this circle.
							const norm1 = Math.sqrt(b.y*b.y+b.z*b.z);
							// get square normal...
							Q.nx = 0;
							Q.ny = -b.z/norm1;
							Q.nz = b.y/norm1;

							Q.θ = cosTheta;
							Q.x = 0;
							Q.y = Q.ny*cosTheta;
							Q.z = Q.nz*cosTheta;
							
							const up = Q.up();
							const forward = Q.forward();

		verts.push( new THREE.Vector3( 0, 0, 0 ) );
		verts.push( forward );
		cols.push( new THREE.Color( 1, 1, 1 ) );
		cols.push( new THREE.Color( 1, 0.2, 0.2 ) );

							
							// need perpendicular to A in plane of A-B
							const cosAngle = a.dot( b );
							//const angle = Math.acos( a.dot( b ) ); 
							const BprojectedOnA = b.clone().multiplyScalar( cosAngle * Al ).sub( A );
							//const BtoAPerp = B.clone().sub( BprojectedOnA );
							const unitBtoAPerp = BprojectedOnA.clone().multiplyScalar( -1/BprojectedOnA.length() );
		verts.push( up );
		verts.push( new THREE.Vector3(0,0,0) );
		cols.push( new THREE.Color( 1, 1, 1 ) );
		cols.push( new THREE.Color( 1, 0, 0 ) );

							
		verts.push( unitBtoAPerp );
		verts.push( new THREE.Vector3(0,0.05,0) );
		cols.push( new THREE.Color( 0, 1, 1 ) );
		cols.push( new THREE.Color( 0, 1, 1 ) );

		const upDotPerp = unitBtoAPerp.dot( up );
							const angDotPerp = -Math.acos( upDotPerp );
							const Q2 = new lnQuat( Q );
							let useQ = Q2;
							// this could be refactored with the known values to rotate with... 
							Q2.freeSpin( angDotPerp, b, 0 );
							const up2 = Q2.up();
							if( Math.abs(up2.x-unitBtoAPerp.x)+Math.abs(up2.y-unitBtoAPerp.y)+Math.abs(up2.z-unitBtoAPerp.z) > 0.000001 ) {
								const Q3 = new lnQuat( Q );
								Q3.freeSpin( -angDotPerp, b, 0 );
								useQ = Q3;	
							}
							const up3 = useQ.up();
		verts.push( up3 );
		verts.push( new THREE.Vector3(0,0,0) );
		cols.push( new THREE.Color( 1, 1, 1 ) );
		cols.push( new THREE.Color( 1, 1, 1 ) );
		
							const crossProduct = up3.dot( A ) * Bl;
							//return crossProduct;
						} else {
							Q.nx = 0;
							Q.ny = b.x > 0?1:-1;
							Q.nz = 0;
						
							Q.x = 0;
							Q.y = 0;
							Q.z = 0;
						
							// the remining of this is update()
							Q.θ = 0;
							Q.dirty = false;
							
						}

//		const Q = new lnQuat( 0, x, y, z );

						// normal conversion is linear.

		

	}

	//normalVertices.push( new THREE.Vector3( x*spaceScale,y*spaceScale, z*spaceScale ))
	//normalVertices.push( new THREE.Vector3( x*spaceScale + x*l*normal_del,y*spaceScale + y*l*normal_del,z*spaceScale + z*l*normal_del ))
	//normalColors.push( new THREE.Color( "hsl(0, 100%, 50%)", 255,0,255,255 ))
	//normalColors.push( new THREE.Color( 255,0,255,255 ))
	

}


function cross3( A, B ) {
	const Al = A.length();
	const Bl = B.length();

	if( Al && Bl ) {

		const a = A.clone().multiplyScalar( 1/Al );	
		const b = B.clone().multiplyScalar( 1/Bl );	
	   
		const Q = new lnQuat();

						const l2 = (Math.abs(b.y)/*+abs(theta.y)*/+Math.abs(b.z));
						if( l2 ) {
							const l3 = Math.sqrt(b.x*b.x+b.y*b.y+b.z*b.z);
							//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );
					        
							const tx = b.x /l3; // square normal
							const cosTheta = Math.acos( tx ); // 1->-1 (angle from pole around this circle.
							const norm1 = Math.sqrt(b.y*b.y+b.z*b.z);
							// get square normal...
							Q.nx = 0;
							Q.ny = -b.z/norm1;
							Q.nz = b.y/norm1;

							Q.θ = cosTheta;
							Q.x = 0;
							Q.y = Q.ny*cosTheta;
							Q.z = Q.nz*cosTheta;
							
							const up = Q.up();

							// need perpendicular to A in plane of A-B
							const cosAngle = a.dot( b );
							//const angle = Math.acos( a.dot( b ) );
							const BprojectedOnA = b.clone().multiplyScalar( cosAngle * Al ).sub( A );
							//const BtoAPerp = B.clone().sub( BprojectedOnA );
							const unitBtoAPerp = BprojectedOnA.clone().multiplyScalar( -1/BprojectedOnA.length() );

							const upDotPerp = unitBtoAPerp.dot( up );
							const angDotPerp = -Math.acos( upDotPerp );
							const Q2 = new lnQuat( Q );
							let useQ = Q2;
							// this could be refactored with the known values to rotate with... 
							Q2.freeSpin( angDotPerp, b, 0 );
							const up2 = Q2.up();
							if( Math.abs(up2.x-unitBtoAPerp.x)+Math.abs(up2.y-unitBtoAPerp.y)+Math.abs(up2.z-unitBtoAPerp.z) > 0.000001 ) {
								const Q3 = new lnQuat( Q );
								Q3.freeSpin( -angDotPerp, b, 0 );
								useQ = Q3;
							}
							const up3 = useQ.up();
							const crossProduct = up3.dot( A ) * Bl;
							return crossProduct;

						} else {
							Q.nx = 0;
							Q.ny = b.x > 0?1:-1;
							Q.nz = 0;
						
							Q.x = 0;
							Q.y = 0;
							Q.z = 0;
						
							// the remining of this is update()
							Q.θ = 0;
							Q.dirty = false;
							return 0.0001;
						}
	}
	return 0;
}

function dotcross4( A, B ) {
	return { x:cross3( new Vector3( A.y, A.z, A.w ), new Vector3( B.y, B.z, B.w ) )
	       , y:cross3( new Vector3( A.z, A.w, A.x ), new Vector3( B.z, B.w, B.x ) )
	       , z:cross3( new Vector3( A.w, A.x, A.y ), new Vector3( B.w, B.x, B.y ) )
	       , w:cross3( new Vector3( A.x, A.y, A.z ), new Vector3( B.x, B.y, B.x ) ) };
}


function cross4( A, B ) {
	
}

function dotcross5( A, B ) {
	return { x:cross4( new Vector4( A.v, A.w, A.z, A.y ), new Vector4( B.v, B.w, B.z, B.y  ) )
	       , y:cross4( new Vector4( A.x, A.v, A.w, A.z ), new Vector4( B.x, B.v, B.w, B.z  ) )
	       , z:cross4( new Vector4( A.y, A.x, A.v, A.w ), new Vector4( B.y, B.x, B.v, B.w  ) )
	       , w:cross4( new Vector4( A.z, A.y, A.x, A.v ), new Vector4( B.z, B.y, B.x, B.v  ) )
	       , v:cross4( new Vector4( A.w, A.z, A.y, A.x ), new Vector4( B.w, B.z, B.y, B.x  ) ) };

}


function makeCircle( verts, cols, radius ) {
	for( let a = 0; a < Math.PI*2; a+= Math.PI*2/64 ) {
		
	}
} 

function makeQuat( a, b ) {
	// ( yz, zx, xy )
   // ( cos(x)sin(x), cos(y)sin(y), cos(z)sin(z) )
   // perpendiculars are guaranteed in this case... they are the axii
   // 1) parallel projection of (Ay,Az) dot perp (By,Bz) rotated around X... and it's around Z and Y...
	// 2) parallel projection of (Az,Ax) dot perp (Bz,Bx) rotated around Y and it's from z to x
	const alen = a.length;
	if( !alen ) throw new Error( "A vector to cross cannot be length 0" );
	const blen = b.length;
	if( !blen ) throw new Error( "B vector to cross cannot be length 0" );
	const A = a.scale( 1/alen );
	const B = b.scale( 1/blen );

	const pby = by;



	
	return [
		
	];
}


init();

