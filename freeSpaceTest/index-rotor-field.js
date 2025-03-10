
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

import {Motion} from "../3d/src/three.js/personalFill.mjs"
import {lnQuat} from "../3d/src/lnQuatSq.js"


import {BrainForm} from "./brainBoard.mjs"
import {ControlForm} from "./controlForm-rotor.mjs"
import {BrainStem,ref} from "./automaton/brain/brain.mjs"
import {Skybox} from "./skybox.mjs"

//var glow = require( './glow.renderer.js' );

var l = 0;
//var SaltyRNG = require( "salty_random_generator.js" ).SaltyRNG;
//var lnQuat = require( "../lib/lnQuat.js" );

//var RNG = SaltyRNG( (salt)=>{salt.push( Date.now() ) } );

//var words1 = voxelUniverse.createTextCluster( "Hello World" );
let world = null;
var myMover = null;
var myBrainBoard = null;
let myMotion = null;
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
	let toroidal = false;
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
let clock = 0;

function tickScene( ) {

}

function init() {

	
	myMotion = Viewer.addModelToScene2( new THREE.Object3D() );
	myMotion.dipole = new lnQuat( 0, 0, 0, 1 ).update();
   myMotion.orientation.set( 0, 0, -Math.PI/2, 0 );
	myMotion.position.set( 3, 0, 0 );
	
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


	function tick() {
		if( controlForm.animate )
			clock += Math.PI/16;


			geometryNormals.setAttribute( "position", new THREE.BufferAttribute( normalVerts.buffer, 3 ) );
			geometryNormals.setAttribute( "color", new THREE.BufferAttribute( normalColors.buffer, 4, true ) );
			updateGeometry( normalVerts, normalColors );
			geometryNormals.setDrawRange( 0, normalVerts.used );
			setTimeout( tick, 100 );
	}
	tick();

}



const spaceScale = 0.5;
const spaceScale2 = 0.01;

const grid = [];

function updateGeometry(verts,cols) {
	verts.length = 0;
	cols.length = 0;
	const color = new THREE.Color( 1,0,0,1 );
	const colorg = new THREE.Color( 0,1,0,1 );
	const colorb = new THREE.Color( 0,0,1,1 );
	const color2 = new THREE.Color( 0,1,0,1 );
	//color.setHSL( (seg % 100) / 100, 1.0, 0.5 );
	//const axis = new THREE.Vector3( 0, 1, 0 );
	const Q = new lnQuat( {x:0,y:1,z:0} );
	const stress = Math.PI*4 * (controlForm.sliderAX||0.5)/5;
	const cdel1 = 1/5;
	const rdel1 = 1/5;
	
	const axis = {x:controlForm.sliderAY, y:controlForm.sliderAZ, z:controlForm.sliderAW};
	const axislen2 = axis.x*axis.x + axis.y*axis.y + axis.z*axis.z;
	const axislen = axislen2?Math.sqrt( axislen2):1;
	axis.x/= axislen;
	axis.y/= axislen;
	axis.z/= axislen;

	const axisRot = Q.set( clock, {x:controlForm.sliderBX, y:controlForm.sliderBY, z:controlForm.sliderBZ } ).apply( axis );
	//const axisRot = Q.set( clock, {x:cdel1, y:rdel1, z:0 } ).apply( axis );

	const firstSpin = new lnQuat();

	if( controlForm.toroidal ) {
		
	} else {

	   
		for( let c = 0; c < 100; c++ ) {
			const divs = c*Math.PI/2;
			for( let r = 0; r < c*Math.PI; r++ ) {

				//const rdel = (r-49.5)/5;
				//const cdel = (c-49.5)/5;
				const cdel = Math.cos(r/divs*Math.PI)*c/5;//(c-49.5)/5;
				const rdel = Math.sin(r/divs*Math.PI)*c/5;
				const cdelx = Math.sin(r/divs*Math.PI)*(c+1)/5-rdel;
				const cdely = Math.cos(r/divs*Math.PI)*(c+1)/5-cdel;
				const rdelx = Math.sin((r+1)/divs*Math.PI)*(c)/5-rdel;
				const rdely = Math.cos((r+1)/divs*Math.PI)*(c)/5-cdel;

				
	   
				const here = new THREE.Vector3( 0,rdel*spaceScale,cdel*spaceScale )
				const r_plus1 = new THREE.Vector3( 0,(rdel+rdelx)*spaceScale ,(cdel+rdely)*spaceScale )
				const c_plus1 = new THREE.Vector3( 0,(rdel+cdelx)*spaceScale ,(cdel+cdely)*spaceScale )
	   
				const rsq = rdel*rdel + cdel*cdel;
				const rsq_r = (rdel+rdel1)*(rdel+rdel1) + cdel*cdel;
				const rsq_c = rdel*rdel + (cdel+cdel1)*(cdel+cdel1);
		
				const cs = Math.cos( clock );
				const sn = Math.sin( clock );
	   
				const rot_here = stress*(1/(1+(rsq)));
				const rot_r = stress*(1/(1+(rsq_r)));
				const rot_c = stress*(1/(1+(rsq_c)))
	   
				const here_rot = Q.set( firstSpin.set( rot_here, axisRot )). apply( here );
            const r_plus1_rot = Q.set( firstSpin.set( rot_r, axisRot ) ).apply( r_plus1 )
            const c_plus1_rot = Q.set( firstSpin.set( rot_c, axisRot ) ).apply( c_plus1 )
      
      
				cols.push( color );
				cols.push( color );
	   
	   
				verts.push( here)
				verts.push( r_plus1)
				cols.push( colorg );
				cols.push( colorg );
	   
				verts.push( here)
				verts.push( c_plus1)
	   

if(1) {	   
				const color2 = new THREE.Color( 0,1,0,1 );
					color2.setHSL( rot_here/(Math.PI*4), 1.0, 0.5 );
				//if( clock == 0 ) console.log( "stuff:", r, c, rdel, cdel, rot_here, rot_here/stress );
      
				cols.push( color2 );
				cols.push( color2 );
	   
	   
				verts.push( here_rot)
				verts.push( r_plus1_rot)
				cols.push( color2 );
				cols.push( color2 );
	   
				verts.push( here_rot)
				verts.push( c_plus1_rot)
	   
				const tmpBasis = { right: {x:r_plus1_rot.x-here_rot.x,y:r_plus1_rot.y-here_rot.y, z:r_plus1_rot.z-here_rot.z}
				                 , forward: {x:c_plus1_rot.x-here_rot.x,y:c_plus1_rot.y-here_rot.y, z:c_plus1_rot.z-here_rot.z}, up: {x:0,y:0,z:0} };
							tmpBasis.up.x = tmpBasis.forward.y * tmpBasis.right.z - tmpBasis.forward.z * tmpBasis.right.y;
							tmpBasis.up.y = tmpBasis.forward.z * tmpBasis.right.x - tmpBasis.forward.x * tmpBasis.right.z;
							tmpBasis.up.z = tmpBasis.forward.x * tmpBasis.right.y - tmpBasis.forward.y * tmpBasis.right.x;
					const rlen = Math.sqrt( tmpBasis.right.x*tmpBasis.right.x+ tmpBasis.right.y*tmpBasis.right.y+ tmpBasis.right.z*tmpBasis.right.z );
					const flen = Math.sqrt( tmpBasis.forward.x*tmpBasis.forward.x+ tmpBasis.forward.y*tmpBasis.forward.y+ tmpBasis.forward.z*tmpBasis.forward.z );
					const ulen = Math.sqrt( tmpBasis.up.x*tmpBasis.up.x+ tmpBasis.up.y*tmpBasis.up.y+ tmpBasis.up.z*tmpBasis.up.z );
				tmpBasis.right.x /= rlen; tmpBasis.right.y /= rlen; tmpBasis.right.z /= rlen;
				tmpBasis.forward.x /= flen; tmpBasis.forward.y /= flen; tmpBasis.forward.z /= flen;
				tmpBasis.up.x /= ulen; tmpBasis.up.y /= ulen; tmpBasis.up.z /= ulen;
							Q.fromBasis( tmpBasis );
	   
				//Q.set( {x:r_plus1_rot.x-here_rot.x,y:r_plus1_rot.y-here_rot.y, z:r_plus1_rot.z-here_rot.z}
				//     ,  {x:c_plus1_rot.x-here_rot.x,y:c_plus1_rot.y-here_rot.y, z:c_plus1_rot.z-here_rot.z} );
				const basis = Q.getBasis();
	   
				basis.forward.x = basis.forward.x * spaceScale*0.05 +here_rot.x;
				basis.forward.y = basis.forward.y * spaceScale*0.05 +here_rot.y;
				basis.forward.z = basis.forward.z * spaceScale*0.05 +here_rot.z;
				basis.right.x = basis.right.x * spaceScale*0.05 +here_rot.x;
				basis.right.y = basis.right.y * spaceScale*0.05 +here_rot.y;
				basis.right.z = basis.right.z * spaceScale*0.05 +here_rot.z;
				basis.up.x = basis.up.x * spaceScale*0.05 +here_rot.x;
				basis.up.y = basis.up.y * spaceScale*0.05 +here_rot.y;
				basis.up.z = basis.up.z * spaceScale*0.05 +here_rot.z;
	   
				cols.push( color );
				cols.push( color );
	   
	   
				verts.push( here_rot )
				verts.push( basis.right )
				cols.push( colorg );
				cols.push( colorg );
	   
				verts.push( here_rot )
				verts.push( basis.up )
				
				cols.push( colorb );
				cols.push( colorb );
	   
				verts.push( here_rot )
				verts.push( basis.forward )
	   }
			}	
		}	
	}
	//normalVertices.push( new THREE.Vector3( x*spaceScale,y*spaceScale, z*spaceScale ))
	//normalVertices.push( new THREE.Vector3( x*spaceScale + x*l*normal_del,y*spaceScale + y*l*normal_del,z*spaceScale + z*l*normal_del ))
	//normalColors.push( new THREE.Color( "hsl(0, 100%, 50%)", 255,0,255,255 ))
	//normalColors.push( new THREE.Color( 255,0,255,255 ))
	

}


init();

