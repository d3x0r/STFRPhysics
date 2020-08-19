



//var glow = require( './glow.renderer.js' );

var l = 0;
var SaltyRNG = require( "salty_random_generator.js" ).SaltyRNG;

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
	camera.matrixAutoUpdate = false;
	controls = controlNatural;
	controls.enable();
}
function setControls2() {
	controls.disable();
	camera.matrixAutoUpdate = false;  // current mode doesn't auto update
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
const Accel1 = 2*Math.PI / 120;
const linAccel1 = 1;

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
				myMover.matrix.motion.torque.x = -Accel1;
			else
				myMover.matrix.motion.torque.x = 0;
			break;
		case keys.NUM8:
			if( isDown )
				myMover.matrix.motion.torque.x = Accel1;
			else
				myMover.matrix.motion.torque.x = 0;
			break;

		case keys.NUM4:
			if( isDown )
				myMover.matrix.motion.torque.y = Accel1;
			else
				myMover.matrix.motion.torque.y = 0;
			break;
		case keys.NUM6:
			if( isDown )
				myMover.matrix.motion.torque.y = -Accel1;
			else
				myMover.matrix.motion.torque.y = 0;
			break;

		case keys.NUM7:
			if( isDown )
				myMover.matrix.motion.torque.z = -Accel1;
			else
				myMover.matrix.motion.torque.z = 0;
			break;
		case keys.NUM9:
			if( isDown )
				myMover.matrix.motion.torque.z = Accel1;
			else
				myMover.matrix.motion.torque.z = 0;
			break;


		case keys.NUM1:
			if( isDown )
				myMover.matrix.motion.acceleration.x = -linAccel1;
			else
				myMover.matrix.motion.acceleration.x = 0;
			break;
		case keys.NUM3:
			if( isDown )
				myMover.matrix.motion.acceleration.x = linAccel1;
			else
				myMover.matrix.motion.acceleration.x = 0;
			break;

		case keys.NUM0:
			if( isDown )
				myMover.matrix.motion.acceleration.z = linAccel1;
			else
				myMover.matrix.motion.acceleration.z = 0;
			break;

		case keys.NUMDOT:
			if( isDown )
				myMover.matrix.motion.acceleration.z = -linAccel1;
			else
				myMover.matrix.motion.acceleration.z = 0;
			break;

		case keys.NUM5:
			if( isDown )
				myMover.matrix.motion.acceleration.y = linAccel1;
			else
				myMover.matrix.motion.acceleration.y = 0;
			break;

		case keys.ENTER:
			if( isDown )
				myMover.matrix.motion.acceleration.y = -linAccel1;
			else
				myMover.matrix.motion.acceleration.y = 0;
			break;

            case keys.SPACE:
                myMover.matrix.motion.speed.y = moveSpeed;
                break;
            case keys.C:
                myMover.matrix.motion.speed.y = -moveSpeed;
				break;
			case keys.A:
				myMover.matrix.motion.speed.x = -moveSpeed;
				break;
			case keys.W:
				myMover.matrix.motion.speed.z = moveSpeed;
				break;
			case keys.S:
				myMover.matrix.motion.speed.z = -moveSpeed;
				break;
			case keys.D:
				myMover.matrix.motion.speed.x = moveSpeed;
				break;
		}
	event.preventDefault();

}


var myMover = null;
var movers2 = [];
var movers = [];
var dirs = [];
var camMat = null;
var status_line;
	function init() {
	if( document.getElementById( "controls1") ) {
		document.getElementById( "controls1").onclick = setControls1;
		document.getElementById( "controls2").onclick = setControls2;
	}
		scene = new THREE.Scene();
		scene2 = new THREE.Scene();
		scene3 = new THREE.Scene();


		camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.001, 10000 );


		camera.matrixAutoUpdate = false;
		camera.position.z = 5;
		camera.matrix.origin.z = 3;
		camera.matrixWorldNeedsUpdate = true;

		camera.matrixAutoUpdate = false;

		 // for phong hello world test....
 		var light = new THREE.PointLight( 0xffFFFF, 1, 10000 );
 		light.position.set( 0, 0, 1000 );
 		scene.add( light );

		
		 //initVoxelarium();


		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );

		document.body.appendChild( renderer.domElement );

		controlNatural = new THREE.NaturalControls( camera, renderer.domElement );
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

	for( var n = 0; n < 50; n++ ) {
		var x;
		scene.add( x = protoRock.clone() );
		x.matrixAutoUpdate = false;
		x.matrix.origin.x = 100 * ( RNG.getBits( 11, true ) / 1024 );
		x.matrix.origin.y = 100 * ( RNG.getBits( 11, true ) / 1024 );
		x.matrix.origin.z = 100 * ( RNG.getBits( 11, true ) / 1024 );
		var m = x.matrix.motion;
		m.rotation.x = 2*Math.PI * RNG.getBits( 8, true ) /128;
		m.rotation.y = 2*Math.PI * RNG.getBits( 8, true ) /128;
		m.rotation.z = 2*Math.PI * RNG.getBits( 8, true ) /128;
		//m.speed.y = 1;
		movers.push(x);


		var material = new THREE.LineBasicMaterial({
			color: 0x0000ff
		});
	        
		var geometry = new THREE.Geometry();
		geometry.vertices.push(
			new THREE.Vector3( 0, 0, -10 ),
			new THREE.Vector3( 0, 0, 10 )
		);
	        
		var line = new THREE.Line( geometry, material );
		line.matrixAutoUpdate = false;
		scene.add( line );

		dirs.push( line );
	}

} );


		

function addModelToScene2(object) {
//	geometry, materials
 //   var material = new THREE.MeshFaceMaterial(materials);
 //   var object = new THREE.Mesh(geometry, material);


	for( var n = 0; n < 10; n++ ) {
		var x;
	    scene.add(x = object.clone());
		x.matrixAutoUpdate = false;
		x.matrix.origin.x = n * 5;
		x.matrix.rotateRelative( 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 )
				, 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 )
				, 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 )
			)
		var m = x.matrix.motion;
		m.acceleration.z = -1;
		movers2.push(x);
	}


	    scene.add(myMover = x = object);
		movers2.push(x);
		x.matrixAutoUpdate = false;
		 myMover.add( camera );
	//camMat = camera.matrix;
	//camera.matrix = myMover.matrix;
}

		
function addModelToScene(object) {
//	geometry, materials
 //   var material = new THREE.MeshFaceMaterial(materials);
 //   var object = new THREE.Mesh(geometry, material);
    object.scale.set(10, 10, 10);
	    scene.add(x = object);
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

	movers2.forEach( (m,idx)=>{
		
		m.matrix.motion.freemove(m.matrix,delta) 
		
		var mot = m.matrix.motion;
		var x1= m.matrix.origin.x ; 
		var y= m.matrix.origin.y ; 
		var z= m.matrix.origin.z ; 
		if( ( x1 < -100 || x1 > 100 ) 
		  ||( y < -100 || y > 100 ) 
		  ||( z < -100 || z > 100 ) ) {
			m.matrix.origin.x = 100 * ( RNG.getBits( 11, true ) / 1024 );
			m.matrix.origin.y = 100 * ( RNG.getBits( 11, true ) / 1024 );
			m.matrix.origin.z = 100 * ( RNG.getBits( 11, true ) / 1024 );
			m.matrix.rotateRelative( 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 )
					, 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 )
					, 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 )
				)

			mot.acceleration.z = -10;

			mot.speed.z = 0;

			mot.rotation.x = 0;//2*Math.PI/12 * ( RNG.getBits( 11, true ) / 1024 );
			mot.rotation.y = 0;//2*Math.PI/12 * ( RNG.getBits( 11, true ) / 1024 );
			mot.rotation.z = 0;//2*Math.PI/12 * ( RNG.getBits( 11, true ) / 1024 );


			mot.torque.x = 2*Math.PI/72;// * ( RNG.getBits( 11, true ) / 1024 );
			mot.torque.y = 0;//2*Math.PI/12 * ( RNG.getBits( 11, true ) / 1024 );
			mot.torque.z = 0;//2*Math.PI/12 * ( RNG.getBits( 11, true ) / 1024 );
		}
		if( m !== myMover )
			if( sumDel > 1 ) {
			
				mot.torque.x = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
				mot.torque.y = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
				mot.torque.z = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
			}	
        

	});

	movers.forEach( (m,idx)=>{
		m.matrix.motion.freemove(m.matrix,delta) 
		var mot = m.matrix.motion;
		//dirline.matrix.origin.copy( m.matrix.origin );



		var dirLine = dirs[idx];
		var o = new THREE.Vector3();
		var q  = new THREE.Quaternion();
		var s = new THREE.Vector3();

		m.matrix.decompose( o, q, s );

		dirLine.matrix.lookAt( new THREE.Vector3(q.w,q.x,q.y), THREE.Vector3Zero, m.matrix.up );
		dirLine.matrix.origin.copy( m.matrix.origin );
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

