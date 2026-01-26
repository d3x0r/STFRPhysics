
/*
<script src="require.js"></script>
<script src="three.js/build/three.js"></script>
<script src="three.js/build/LoaderSupport.js"></script>
<script src="three.js/build/OBJLoader2.js"></script>
<script src="three.js/build/OBJLoader.js"></script>
<script src="three.js/personalFill.js"></script>

<script src="NaturalCamera.js"></script>
*/

import {THREE,Viewer,BufferAttribute,controlNatural} from "./three-js-view.js"
import * as  view from "./three-js-view.js"
console.log( 'view:', view );

import {Motion} from "../3d/src/three.js/personalFill.mjs"
import {lnQuat} from "../3d/src/lnQuatSq.js"


//import {BrainForm} from "./brainBoard.mjs"
import {ControlForm} from "./controlForm-rotor.mjs"
//import {BrainStem,ref} from "./automaton/brain/brain.mjs"
import {Skybox} from "./skybox.mjs"

//var glow = require( './glow.renderer.js' );
	const color = new THREE.Color( 1,0,0,1 );
	const colorg = new THREE.Color( 0,1,0,1 );
	const colorb = new THREE.Color( 0,0,1,1 );
	const color2 = new THREE.Color( 0,1,0,1 );

var l = 0;
//var SaltyRNG = require( "salty_random_generator.js" ).SaltyRNG;
//var lnQuat = require( "../lib/lnQuat.js" );

const C = 300000000;
const G = 6.667e-11;
const M = 6.649e26;
const A = (M,r) => G*M/(r*r);
const Rs = (M) => 2*G*M/(C*C);
const Vo = (M,r) => Math.sqrt( G*M/r );


	const t = 0.0000000001;
	const p = new THREE.Vector3(Rs(M)*0.5,0,0.001);
	const v = new THREE.Vector3(0,1*Vo(M,0.5*Rs(M)*1),0);
	const a = new THREE.Vector3(-A(M,Math.sqrt(p[0]*p[0]+p[1]*p[1])),0,0);

	const colors = [];
	for( let i = 0; i < 360; i++ ) {
		colors.push( new THREE.Color("hsl("+i+", 100%, 50%)")) ;
	}


//var RNG = SaltyRNG( (salt)=>{salt.push( Date.now() ) } );

//var words1 = voxelUniverse.createTextCluster( "Hello World" );
let world = null;
var myMover = null;
var myBrainBoard = null;
let myMotion = null;
let gravMotion = null;
let bodyMotion = null;
var movers2 = [];
var movers = [];
let skybox = null;
var dirs = [];
var camMat = null;
var status_line;

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

view.controlNatural.alignUp = false;

function tickScene( ) {

}

function init() {

	
	myMotion = Viewer.addModelToScene2( new THREE.Object3D() );
	myMotion.dipole = new lnQuat( 0, 0, 0, 1 ).update();
   myMotion.orientation.set( 0, 0, -Math.PI/2, 0 );
	myMotion.position.set( 50, 5, 0 );
{
const geometry = new THREE.SphereGeometry( 1, 32, 12 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry, material );
	gravMotion = Viewer.addModelToScene2( sphere );
	gravMotion.dipole = new lnQuat( 0, 0, 0, 1 ).update();
   gravMotion.orientation.set( 0, 0, -Math.PI/2, 0 );
	gravMotion.position.set( 0, 0, 0 );

	}

{

const geometry = new THREE.SphereGeometry( 0.5, 32, 12 );
const material = new THREE.MeshBasicMaterial( { color: 0x707070 } );
const sphere = new THREE.Mesh( geometry, material );

	bodyMotion = Viewer.addModelToScene2( sphere );
	bodyMotion.dipole = new lnQuat( 0, 0, 0, 1 ).update();
   bodyMotion.orientation.set( 0, 0, -Math.PI/2, 0 );
	bodyMotion.position.set( 1, 3, 0 );

}	
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
		bodyMotion.position.set( p.x*25, p.y*25, p.z*25 )
			setTimeout( tick, 100 );
	}
	tick();

}



const spaceScale = 0.5;
const spaceScale2 = 0.01;

const grid = [];
let skipz = false;

function updateGeometry(verts,cols) {
	verts.length = 0;
	cols.length = 0;
	let c_index = 0;;
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

		{
	let v = new THREE.Vector3( 0,0,0);
  				verts.push( v )
			let v2 = new THREE.Vector3( 50, 0, 0 );
				verts.push( v2 )
				cols.push( color );
				cols.push( color );
		}
		{
	let v = new THREE.Vector3( 0,0,0);
  				verts.push( v )
			let v2 = new THREE.Vector3( 0, 50, 0 );
				verts.push( v2 )
				cols.push( colorg );
				cols.push( colorg );
		}
		{
	let v = new THREE.Vector3( 0,0,0);
  				verts.push( v )
			let v2 = new THREE.Vector3( 0, 0, 50 );
				verts.push( v2 )
				cols.push( colorb );
				cols.push( colorb );
		}

	const axisRot = Q.set( clock, {x:controlForm.sliderBX, y:controlForm.sliderBY, z:controlForm.sliderBZ } ).apply( axis );
	//const axisRot = Q.set( clock, {x:cdel1, y:rdel1, z:0 } ).apply( axis );

	const firstSpin = new lnQuat();

	let start = p.clone().multiplyScalar( 25 );
	
	for( let n = 0; n < 2000; n++ ) {
		const d = Math.sqrt( p.x*p.x + p.y*p.y + p.z*p.z );
		const ac = A(M,d);

		const sin = p.x / d
		const sinz = p.z / d
		// normalized direction times acceleration at this radius for mass
//		a[0] = -(p[0]/d)*ac * ( 1-sin/10000 );
		a.x = -(p.x/d)*ac;//* ( 1-sin/10000 );
		a.y = -(p.y/d)*ac;

			if( Math.abs(p.z)>0.125) skipz = true;
		a.z = -(p.z/d)*ac* ( 1 -sinz*0.1 - (!skipz?sin*0.26:0)  );
		const ad = Math.sqrt( a.x*a.x+a.y*a.y+a.z*a.z);
		// acceleration total is still the same - just in a different direction?
		a.x =a.x/ad*ac;
		a.y =a.y/ad*ac;
		a.z =a.z/ad*ac;

		v.x = v.x + a.x * t;
		v.y = v.y + a.y * t;
		v.z = v.z + a.z * t;


		p.x = p.x + v.x * t;
		p.y = p.y + v.y * t;
		p.z = p.z + v.z * t;

		const end =  p.clone().multiplyScalar( 25 );
  				verts.push( start )
				verts.push( end )
				cols.push( colors[c_index] );
				cols.push( colors[c_index] );

			c_index = Math.floor(n / 10);
			if( c_index >= colors.length ) c_index -= colors.length;

		start = end.clone();
		//ctx.lineTo( p[0] * 250 + 500, p[1] * 250 + 500 );

		
	}

	//normalVertices.push( new THREE.Vector3( x*spaceScale,y*spaceScale, z*spaceScale ))
	//normalVertices.push( new THREE.Vector3( x*spaceScale + x*l*normal_del,y*spaceScale + y*l*normal_del,z*spaceScale + z*l*normal_del ))
	//normalColors.push( new THREE.Color( "hsl(0, 100%, 50%)", 255,0,255,255 ))
	//normalColors.push( new THREE.Color( 255,0,255,255 ))
	

}


init();

