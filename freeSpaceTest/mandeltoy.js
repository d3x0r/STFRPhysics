
/*
<script src="require.js"></script>
<script src="three.js/build/three.js"></script>
<script src="three.js/build/LoaderSupport.js"></script>
<script src="three.js/build/OBJLoader2.js"></script>
<script src="three.js/build/OBJLoader.js"></script>
<script src="three.js/personalFill.js"></script>

<script src="NaturalCamera.js"></script>
*/
import {NaturalCamera} from "./NaturalCamera.js"
import {SaltyRNG} from "./salty_random_generator.js";
import * as THREE from "../3d/src/three.js/three.module.js"
import {Motion} from "../3d/src/three.js/personalFill.mjs"
import {popups} from "./popups/popups.mjs"

import {lnQuat} from "../3d/src/lnQuatSq.js"

import {BrainForm} from "./brainBoard.mjs"

//var glow = require( './glow.renderer.js' );

var l = 0;
//var SaltyRNG = require( "salty_random_generator.js" ).SaltyRNG;
//var lnQuat = require( "../lib/lnQuat.js" );

var RNG = SaltyRNG( (salt)=>{salt.push( Date.now() ) } );

//var words1 = voxelUniverse.createTextCluster( "Hello World" );

var controlNatural;
var controlOrbit;
var controls;
	var scene;
	var scene2;
	var scene3;
	var camera, renderer;
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

const 	moveSpeed = 10* 12 * 0.0254;


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



var appContainer = document.getElementById( "Canvas" );
var controlContainer = document.getElementById( "controls" );
var mandelSurface = document.createElement( "canvas" );
mandelSurface.width = 512;
mandelSurface.height = 512;
mandelSurface.style.width = 512;
mandelSurface.style.height = 512;
var mandelCtx = mandelSurface.getContext( '2d' );
var mandelData = mandelCtx.getImageData(0,0,512,512);

mandelCtx.fillStyle = "red" ;
mandelCtx.fillRect( 0, 0, 50, 50 );

var mandelTexture = new THREE.Texture(mandelSurface);
    var mandelMaterial = new THREE.MeshBasicMaterial({ map: mandelTexture });
	mandelTexture.needsUpdate = true;

//document.body.appendChild( mandelSurface );

var screen = { width:window.innerWidth, height:window.innerHeight };

	//const totalUnit = Math.PI/(2*60);
	//const unit = totalUnit;
	var delay_counter = 60*3;
	//const pause_counter = delay_counter + 120;
	var single_counter = 60;
	var totalUnit = Math.PI/2;
	var unit = totalUnit / single_counter;
	var pause_counter = 120;

	var counter= 0;

	var clock = new THREE.Clock()

function plot( mandelData, x, y, c ) {
	mandelData[((x+(y*512))*4)+0] = c[0];
	mandelData[((x+(y*512))*4)+1] = c[1];
	mandelData[((x+(y*512))*4)+2] = c[2];
	mandelData[((x+(y*512))*4)+3] = c[3];
}

function setMode1(){
}


function setMode2() {
}


function setMode3() {
}

function setControls1() {
	controls.disable();
	camera.matrixAutoUpdate = true;
	controls = controlNatural;
	controls.enable();
}
function setControls2() {
	controls.disable();
	camera.matrixAutoUpdate = true;  // current mode doesn't auto update
	controls = controlOrbit;
	controls.enable();
}


	const keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40
        , A:65, S:83, D:68, W:87, SPACE:32, C:67 
, NUM0: 45
, NUM1: 35
, NUM2: 40
, NUM3: 34
, NUM4: 37
, NUM5: 12
, NUM6: 39
, NUM7: 36
, NUM8: 38
, NUM9: 33
, NUMDOT: 46
, ENTER:13
, TILDE:192
};

//const Accel1 = 2*Math.PI / 12;
const Accel1 = 2*Math.PI / 24;
const linAccel1 = 10;

function handleKeyEvents( event, isDown ) {

	switch ( event.keyCode ) {
		default:
			console.log( "key:", event.keyCode );
			return;
			break;
		case keys.TILDE:
			controls.userRotate = !controls.userRotate;
			break;
		case keys.NUM2:
			if( isDown )
				myMotion.torque.x = -Accel1;
			else
				myMotion.torque.x = 0;
			myMotion.torque.dirty = true;
			break;
		case keys.NUM8:
			if( isDown )
				myMotion.torque.x = Accel1;
			else
				myMotion.torque.x = 0;
			myMotion.torque.dirty = true;
			break;

		case keys.NUM4:
			if( isDown )
				myMotion.torque.y = Accel1;
			else
				myMotion.torque.y = 0;
			myMotion.torque.dirty = true;
			break;
		case keys.NUM6:
			if( isDown )
				myMotion.torque.y = -Accel1;
			else
				myMotion.torque.y = 0;
			myMotion.torque.dirty = true;
			break;

		case keys.NUM7:
			if( isDown )
				myMotion.torque.z = -Accel1;
			else
				myMotion.torque.z = 0;
			myMotion.torque.dirty = true;
			break;
		case keys.NUM9:
			if( isDown )
				myMotion.torque.z = +Accel1;
			else
				myMotion.torque.z = 0;
			myMotion.torque.dirty = true;
			break;


		case keys.NUM1:
			if( isDown )
				myMotion.acceleration.x = -linAccel1;
			else
				myMotion.acceleration.x = 0;
			break;
		case keys.NUM3:
			if( isDown )
				myMotion.acceleration.x = +linAccel1;
			else
				myMotion.acceleration.x = 0;
			break;

		case keys.NUM0:
			if( isDown )
				myMotion.acceleration.z = +linAccel1;
			else
				myMotion.acceleration.z = 0;
			break;

		case keys.NUMDOT:
			if( isDown )
				myMotion.acceleration.z = -linAccel1;
			else
				myMotion.acceleration.z = 0;
			break;

		case keys.NUM5:
			if( isDown )
				myMotion.acceleration.y = linAccel1;
			else
				myMotion.acceleration.y = 0;
			break;

		case keys.ENTER:
			if( isDown )
				myMotion.acceleration.y = -linAccel1;
			else
				myMotion.acceleration.y = 0;
			break;

            case keys.SPACE:
                myMotion.speed.y = moveSpeed;
                break;
            case keys.C:
                myMotion.speed.y = -moveSpeed;
				break;
			case keys.A:
				myMotion.speed.x = -moveSpeed;
				break;
			case keys.W:
				myMotion.speed.z = moveSpeed;
				break;
			case keys.S:
				myMotion.speed.z = -moveSpeed;
				break;
			case keys.D:
				myMotion.speed.x = moveSpeed;
				break;
		}
	event.preventDefault();
		//console.log( "myMotion:", myMotion.torque )
		//console.log( "myMotion:", myMotion.rotation )
}


var myMover = null;
var myMotion = null;
var movers2 = [];
var movers = [];
var dirs = [];
var camMat = null;
var status_line;

function init() {
        
	const form = new BrainForm( controlContainer );
        
	let tmp;
        tmp = document.getElementById( "Brains") ;
        if( tmp ) {
        	tmp.addEventListener( "click", (evt)=>{
                	form.show();
                } );
        	
	}
		scene = new THREE.Scene();
		scene2 = new THREE.Scene();
		scene3 = new THREE.Scene();


		camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 1000 );


		camera.position.z = 5;
		//camera.matrix.origin.z = 3;
		camera.matrixWorldNeedsUpdate = true;

		camera.matrixAutoUpdate = true;

		 // for phong hello world test....
 		var light = new THREE.PointLight( 0xffFFFF, 1, 10000 );
 		light.position.set( 0, 0, 1000 );
 		scene.add( light );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );

		appContainer.appendChild( renderer.domElement );

		controlNatural = new NaturalCamera( camera, renderer.domElement );
		controlNatural.enable( handleKeyEvents  );

		//controlOrbit = new THREE.OrbitControls( camera, renderer.domElement );
		//controlOrbit.enable();

		controls = controlNatural;



var     geometry = new THREE.BoxGeometry( 200, 200, 200 );
var     mesh = new THREE.Mesh( geometry, mandelMaterial );
//    scene.add( mesh );


		//	CubeTest().init( scene );



//var jsonLoader = new THREE.JSONLoader();
var objectLoader = new THREE.ObjectLoader();
//var objectLoader = new THREE.OBJLoader();
//var objectLoader = new THREE.OBJLoader2();
objectLoader.load("models/model.json", addModelToScene);
objectLoader.load("models/aphod.json", addModelToScene2);

var protoRock;
objectLoader.load("models/rock1.json", model=>{ 
	protoRock=model

	for( var n = 0; n < 5; n++ ) {
		var x;
		scene.add( x = protoRock.clone() );
		x.matrixAutoUpdate = true;
		x.position.x = 20 * ( RNG.getBits( 11, true ) / 1024 );
		x.position.y = 20 * ( RNG.getBits( 11, true ) / 1024 );
		x.position.z = 20 * ( RNG.getBits( 11, true ) / 1024 );
		var m = new Motion( x );
		m.rotation.x = 2*Math.PI * RNG.getBits( 8, true ) /128;
		m.rotation.y = 2*Math.PI * RNG.getBits( 8, true ) /128;
		m.rotation.z = 2*Math.PI * RNG.getBits( 8, true ) /128;
		m.dipole.x = m.rotation.x;
		m.dipole.y = m.rotation.y;
		m.dipole.z = m.rotation.z;
		m.rotation.dirty = true;
		m.dipole.dirty = true;
		//m.speed.y = 1;
		movers.push({x:x,m:m});


		var material = new THREE.LineBasicMaterial({
			color: 0x0000ff
		});
	        
		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( m.rotation.x*2, m.rotation.y*2, m.rotation.z*2 )
		);
	        
		var line = new THREE.Line( geometry, material );
		line.matrixAutoUpdate = true;
		//const up = m.rotation;
		
		//m.rotation.exp( line.quaternion );
		//x.add(line);
		scene.add( line );

		//dirs.push( line );

		var material2 = new THREE.LineBasicMaterial({
			color: 0x00FF00
		});
		
		geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( m.rotation.x*2, m.rotation.y*2, m.rotation.z*2 )
		);
	        
		var line2 = new THREE.Line( geometry, material2 );
		line2.matrixAutoUpdate = true;
		//const up = m.rotation;
		
		//m.rotation.exp( line.quaternion );
		x.add(line2);

		var material3 = new THREE.LineBasicMaterial({
			color: 0xff0000
		});
		
		geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( 0, 0, 0 ),
			new THREE.Vector3( m.rotation.x*2, m.rotation.y*2, m.rotation.z*2 )
		);
	        
		var line3 = new THREE.Line( geometry, material3 );
		line3.matrixAutoUpdate = true;
		//const up = m.rotation;
		
		//m.rotation.exp( line.quaternion );
		x.add(line3);
		//scene.add( line2 );
		dirs.push( {line:line,line2:line2,line3:line3} );
	}

} );


		

function addModelToScene2(object) {
//	geometry, materials
 //   var material = new THREE.MeshFaceMaterial(materials);
 //   var object = new THREE.Mesh(geometry, material);
	var x;
	var m;
	for( var n = 0; n < 10; n++ ) {
	    scene.add(x = object.clone());
		x.matrixAutoUpdate = true;
		x.position.x = n * 5;

		m = new Motion( x );
		m.orientation.x =  2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
		m.orientation.y = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
		m.orientation.z = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
		const b = m.orientation.getBasis();
		m.speed.x = b.forward.x * 5;
		m.speed.y = b.forward.y * 5;
		m.speed.z = b.forward.z * 5;
		movers2.push({x:x,m:m});
	}

	scene.add(myMover = x = object);
	myMotion =  new Motion(x);
	movers2.push({x:x,m:myMotion});
	x.matrixAutoUpdate = true;
	myMover.add( camera );
	//camMat = camera.matrix;
	//camera.matrix = myMover.matrix;
}

		
function addModelToScene(object) {
//	geometry, materials
 //   var material = new THREE.MeshFaceMaterial(materials);
 //   var object = new THREE.Mesh(geometry, material);
    object.scale.set(10, 10, 10);
	    scene.add(object);
}

	}

function slowanim() {
	setTimeout( animate, 256 );
}


function render() {
	renderer.clear();
	renderer.render( scene, camera );
}

var sumDel =0;
function animate() {
	var delta = clock.getDelta();

//	if( myMotion &&( myMotion.torque.x || myMotion.torque.y|| myMotion.torque.z ))
//		console.log( "MyMotion (before)", JSON.stringify(myMotion, null, '\t') );
	movers2.forEach( (ent,idx)=>{
		const motion = ent.m;
		const m = ent.x;
		//if( motion === myMotion ){
		//	if( myMotion &&( myMotion.torque.x || myMotion.torque.y|| myMotion.torque.z ))
		//		console.log( "TICK")
		//}
		motion.freemove(m.matrix,delta) 
		
		var mot = motion;
		var x1= m.position.x ; 
		var y= m.position.y ; 
		var z= m.position.z ; 
		if( ( x1 < -100 || x1 > 100 ) 
		  ||( y < -100 || y > 100 ) 
		  ||( z < -100 || z > 100 ) ) {
			m.position.x = 100 * ( RNG.getBits( 11, true ) / 1024 );
			m.position.y = 100 * ( RNG.getBits( 11, true ) / 1024 );
			m.position.z = 100 * ( RNG.getBits( 11, true ) / 1024 );
			motion.orientation.x = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
			motion.orientation.y = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
			motion.orientation.z = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );

		}
		/*
		if( m !== myMover )
			if( sumDel > 1 ) {
			
				mot.torque.x = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
				mot.torque.y = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
				mot.torque.z = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
			}	
        */


	});

//	if( myMotion &&( myMotion.torque.x || myMotion.torque.y|| myMotion.torque.z ))
//	console.log( "MyMotion (after)", JSON.stringify(myMotion, null, '\t') );
	movers.forEach( (ent,idx)=>{
		ent.m.start();
	});
	movers.forEach( (ent,idx)=>{
		for( let idx2= 0; idx2 < movers.length; idx2++ ){
			if( idx === idx2 ) continue;
			ent.m.affect( movers[idx2].m, idx2 < idx, delta );
		}
		const m = ent.x;
		const motion = ent.m;
		
		motion.freemove(m.matrix,delta) 
		motion.orientation.update(); motion.dipole.update();

		
		var dirLines = dirs[idx];
		var dirLine = dirLines.line;
		var dirLine2 = dirLines.line2;
		var dirLine3 = dirLines.line3;
		var pt = {x:motion.eTorque.x*15, y:motion.eTorque.y*15, z:motion.eTorque.z*15 };
		//if( idx == 1 )
		//pt = motion.dipoleVec;
		const newDir = pt;// idx==0?pt:motion.orientation.apply( pt );
		const newDir2 = motion.dipoleVec;//motion.orientation.apply( motion.dipoleVec );
		const newDir3 = motion.rotation;

		dirLine.geometry.vertices[1].x = newDir.x*5;
		dirLine.geometry.vertices[1].y = newDir.y*5;
		dirLine.geometry.vertices[1].z = newDir.z*5;


		dirLine2.geometry.vertices[1].x = newDir2.x*5;
		dirLine2.geometry.vertices[1].y = newDir2.y*5;
		dirLine2.geometry.vertices[1].z = newDir2.z*5;

		dirLine3.geometry.vertices[1].x = newDir3.x*5;
		dirLine3.geometry.vertices[1].y = newDir3.y*5;
		dirLine3.geometry.vertices[1].z = newDir3.z*5;


		//dirLine.geometry.vertices[1].x = motion.torque.x*5;
		//dirLine.geometry.vertices[1].y = motion.torque.y*5;
		//dirLine.geometry.vertices[1].z = motion.torque.z*5;
		dirLine.geometry.verticesNeedUpdate = true;
		dirLine2.geometry.verticesNeedUpdate = true;
		dirLine3.geometry.verticesNeedUpdate = true;
		dirLine.position.copy( m.position );
		//dirLine.matrix.compose( o, q, s );
		

	});
if( sumDel > 1 ) sumDel = 0;
	sumDel += delta;

	controls.update(delta);

	render();

		if( slow_animate )
			requestAnimationFrame( slowanim );
		else
			requestAnimationFrame( animate );
}





init();
animate();

