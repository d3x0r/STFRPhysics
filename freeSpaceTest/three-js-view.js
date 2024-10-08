
/*
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
//import {popups} from "../node_modules/@d3x0r/popups/popups.mjs"



import * as CANNON from '../node_modules/cannon-es/dist/cannon-es.js'
import {lnQuat} from "../3d/src/lnQuatSq.js"


var l = 0;

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



var appContainer = document.getElementById( "display" );


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


	const keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40
        , A:65, S:83, D:68, W:87, SPACE:32, C:67 
, TAB: 9
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
, Z:90
, X:88
};

//const Accel1 = 2*Math.PI / 12;
const Accel1 = 2*Math.PI / 24;
const linAccel1 = 10;
let controlForm = null;

export class Viewer {
	constructor( tick, parent ) {
		
		init(parent);
		animate( tick, performance.now() );


		function lockChangeAlert() {
			if (document.pointerLockElement === renderer.domElement ||
				document.mozPointerLockElement === renderer.domElement) {
					//canvas.rotateStart.set( event.clientX, event.clientY );
				//console.log('The pointer lock status is now locked');
				mode = 1;
							
				//controls.userRotate = true;
				//document.addEventListener("mousemove", updatePosition, false);
			} else {
				mode = 0;
				//console.log('The pointer lock status is now unlocked');
				//document.removeEventListener("mousemove", updatePosition, false);
			}
		}
		document.addEventListener('pointerlockchange', lockChangeAlert, false)

	}


	static addModelToScene2(object) {
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
			m.orientation.x = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
			m.orientation.y = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
			m.orientation.z = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
			const b = m.orientation.getBasis();
			m.speed.x = b.forward.x * 5;
			m.speed.y = b.forward.y * 5;
			m.speed.z = b.forward.z * 5;

			const body = new SmartBody( x, m );

			movers2.push(body);
		}

		scene.add(myMover = x = object);

		myMotion =  new Motion(x);
		myMotion.dipole = new lnQuat( 0, 0, 0, 1 ).update();
			myMotion.orientation.set( 0, 0, -Math.PI, 0 );
		myMotion.position.set( 0, 0, 100 );
		const body = new SmartBody( x, myMotion );
		if( controlForm )
		controlForm.mover = myMotion;
		movers2.push(body);
		x.matrixAutoUpdate = true;
		// attach the camera to one smart object.
		myMover.add( camera );
		body.brain = myBrainBoard.brain;
		myBrainBoard.setBody( body )

	}

		
	addModelToScene(object) {
	//	geometry, materials
	//   var material = new THREE.MeshFaceMaterial(materials);
	//   var object = new THREE.Mesh(geometry, material);
		//object.scale.set(10, 10, 10);
			scene.add(object);
	}


}


function handleKeyEvents( event, isDown ) {

	switch ( event.keyCode ) {
		default:
			console.log( "key:", event.keyCode );
			return;
			break;
		case keys.TAB:
			event.preventDefault();
			if( isDown )   {
				//mode = 1-mode;
				switch(mode ) {
				case 1: // is locked, want unlock
					document.exitPointerLock();
					controls.userRotate = false;
					break;
				case 0: // is unlocked, want lock.
					if( renderer.domElement ) {
						renderer.domElement.requestPointerLock(); 
					}
					controls.userRotate = true;
					break;
				}
			}
			break;
		case keys.X:
			myMotion.stabilizeVelocity = isDown?0.9:0;
			break;
		case keys.Z:
			myMotion.stabilizeRotation = isDown?0.9:0;
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

/*
            case keys.SPACE:
            case keys.E:
                myMotion.speed.y = moveSpeed;
                break;
            case keys.C:
            case keys.Q:
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
*/
		}
	event.preventDefault();
		//console.log( "myMotion:", myMotion.torque )
		//console.log( "myMotion:", myMotion.rotation )
}


function init(appContainer, controlForm ) {
        
	{

		// Init cannon.js
		world = new CANNON.World();
		world.gravity.set(0, 0, 0 );

	}
	

		scene = new THREE.Scene();
		scene2 = new THREE.Scene();

		camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 40000 );

		camera.position.z = -1;
		camera.position.y = 0.75;
		//camera.matrix.origin.z = 3;
		camera.matrixWorldNeedsUpdate = true;

		camera.matrixAutoUpdate = true;

		 // for phong hello world test....
 		var light = new THREE.PointLight( 0xffFFFF, 1, 10000 );
 		light.position.set( 0, 0, 100 );
 		scene.add( light );

		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );

		appContainer.appendChild( renderer.domElement );

		controlNatural = new NaturalCamera( camera, renderer.domElement );
		controlNatural.enable( handleKeyEvents  );
		controlNatural.motion.orientation.set( 0, 0, Math.PI, 0 ).update();
		controlNatural.motion.orientation.exp( camera.quaternion );

		//controlOrbit = new THREE.OrbitControls( camera, renderer.domElement );
		//controlOrbit.enable();

		controls = controlNatural;
		if( controlForm ){
		controlForm.controls = controls;
		controlForm.mover = myMover;
		}




}




export class SmartBody {
	m = null;
	x = null;
	brain = null;
	constructor( x, m ) {
		this.m = m; // motion frame
		this.x = x; // three.js body
	
	}

	getInterface( ) {
		const ntr_face = new BrainStem( "motion" );

		ntr_face.addInput( "Pos X", new ref( this.x.position, "x" ), 1.0 );
		ntr_face.addInput( "Pos Y", new ref( this.x.position, "y" ), 1.0 );
		ntr_face.addInput( "Pos Z", new ref( this.x.position, "z" ), 1.0 );

		ntr_face.addInput( "Speed X", new ref( this.m.speed, "x" ), 1.0 );
		ntr_face.addInput( "Speed Y", new ref( this.m.speed, "y" ), 1.0 );
		ntr_face.addInput( "Speed Z", new ref( this.m.speed, "z" ), 1.0 );

		ntr_face.addOutput( "Thrust X", new ref( this.m.bs_acceleration, "x" ), 1.0 );
		ntr_face.addOutput( "Thrust Y", new ref( this.m.bs_acceleration, "y" ), 1.0 );
		ntr_face.addOutput( "Thrust Z", new ref( this.m.bs_acceleration, "z" ), 1.0 );


		ntr_face.addInput( "Orient X", new ref( this.m.orientation, "x" ), 2*Math.PI );
		ntr_face.addInput( "Orient Y", new ref( this.m.orientation, "y" ), 2*Math.PI );
		ntr_face.addInput( "Orient Z", new ref( this.m.orientation, "z" ), 2*Math.PI );

		ntr_face.addInput( "Spin X", new ref( this.m.rotation, "x" ), 2*Math.PI/16 );
		ntr_face.addInput( "Spin Y", new ref( this.m.rotation, "y" ), 2*Math.PI/16 );
		ntr_face.addInput( "Spin Z", new ref( this.m.rotation, "z" ), 2*Math.PI/16 );

		ntr_face.addOutput( "Torque X", new ref( this.m.bs_torque, "x" ), 2*Math.PI/16 );
		ntr_face.addOutput( "Torque Y", new ref( this.m.bs_torque, "y" ), 2*Math.PI/16 );
		ntr_face.addOutput( "Torque Z", new ref( this.m.bs_torque, "z" ), 2*Math.PI/16 );

		return ntr_face;
		//brain.
	}
		


}

function slowanim(animate) {
	// and then the next animation frame.
	requestAnimationFrame( animate );
}


function render() {
	renderer.clear();
	renderer.render( scene, camera );
}

var sumDel =0;


	const     crossDipole = new lnQuat();
const imp = new CANNON.Vec3( 0,0,0 ),zero = new CANNON.Vec3( 0,0,0 );
const torq = new CANNON.Vec3( 0,0,0 );

function	affect( ent, ent2, inverse, delta ) {

		const motion = ent2.m;
		const body2 = ent2.body;
		const body = ent.body;
		const this_ = ent.m;
		const tmp1 = new lnQuat();
		const tmp2 = new lnQuat();
		if( !motion ) {console.trace( "Maybe pass a motion to affect?" ) }

		//this_.orientation.update();
		// compute a direction vector between this motion and motion target
		const tmpDir = this_.tmpDir;
		tmpDir.x = body2.position.x - body.position.x;
		tmpDir.y = body2.position.y - body.position.y;
		tmpDir.z = body2.position.z - body.position.z;
		tmpDir.dirty = true;
		tmpDir.update();

		const l1 = tmpDir.θ;
		// compute my dispole in global coordinates (dipole is directly tied to orientation)
		this_.dipoleVec.x = this_.dipole.nx;
		this_.dipoleVec.y = this_.dipole.ny;
		this_.dipoleVec.z = this_.dipole.nz;
		body.quaternion.vmult( this_.dipoleVec, this_.dipoleVec, 1 );  
		const relPole = this_.tmpDipole = this_.dipoleVec;
		this_.dipoleVec.dirty = true; this_.dipoleVec.update();

		// compute target dipole global coordinates (dipole is directly tied to orientation)
		motion.dipoleVec.x = motion.dipole.nx;
		motion.dipoleVec.y = motion.dipole.ny;
		motion.dipoleVec.z = motion.dipole.nz;
		body2.quaternion.vmult( motion.dipoleVec, motion.dipoleVec, 1 );
		const otherPole = this_.tmpOtherDipole = motion.dipoleVec;
		motion.dipoleVec.dirty = true; motion.dipoleVec.update();

		if( l1 < 50 ) {
		this_.affectors++;
		const l2 = motion.dipoleVec.θ;//length();

		// compute angle of my position vs target dipole direction
		const dot = ( tmpDir.nx*otherPole.nx + tmpDir.ny*otherPole.ny + tmpDir.nz*otherPole.nz );

		// if dot is near 1 or -1, the cross doesn't really matter... 

		/// dot == 1 : 0 degrees, up to dot = -1 at pi (180 degrees) and then it's times 2  
		// at 90 degrees a dipole is facing 180 degrees opposing, 
		// at 180 degrees it's 360 degrees and up again.
		const ofsAngle = Math.acos(dot)*2;

		// use lnQUat for directed distance, normal, length

		tmp1.x = tmpDir.nx;
		tmp1.y = tmpDir.ny;
		tmp1.z = tmpDir.nz;
		tmp1.dirty = true;

		// use lnQuat for dipole axis and angle (strength of pole?)
		tmp2.x = otherPole.nx;
		tmp2.y = otherPole.ny;
		tmp2.z = otherPole.nz;
		tmp2.dirty = true;
		tmp1.update();
		tmp2.update();

		// cross product is a direction vector perpendicular to the direction and other pole
		const torque = this_.lastCross;
		// this is the axis to rotate target dipole 
		// effective orientation perpendicular to my direction and target dipole
		// this IS unstable near identity....
		tmp1.cross( tmp2, torque );
		
		/*
		torque.θ = ofsAngle ;
		torque.x = torque.nx * torque.θ;
		torque.y = torque.ny * torque.θ;
		torque.z = torque.nz * torque.θ;
		*/

		// use static method to use torque axisd
		// and ofs angle to compute relative dipole (store in targetVec)
		lnQuat.apply( ofsAngle, torque, otherPole, 1, this_.targetVec);

		// use temp to compute the cross of my pole and the expected target pole
		tmp2.x = relPole.x
		tmp2.y = relPole.y
		tmp2.z = relPole.z

		// this is what the desired dipole should look like
		tmp1.x = this_.targetVec.x
		tmp1.y = this_.targetVec.y
		tmp1.z = this_.targetVec.z

		tmp1.dirty = true;
		tmp2.dirty = true;
		tmp1.update();
		tmp2.update();

		// cross is a rotation that moves the axis of our dipole toward target dipole
		tmp1.cross( tmp2, this_.lastCross2 );
		const accScalar = Math.cos( this_.lastCross2.θ );

		// scale by N/r^2 for distance falloff
		if( controlForm )
		if( Math.abs(l1 )>1e-9)
		this_.eTorque.add( this_.lastCross2,controlForm.rotScalar*50/(l1*l1) );
					if( isNaN( this_.eTorque.x ) ) {
						debugger; console.log( "overflow orientation:", this_.orientation, this_.rotation, this_.eTorque );
						//this_.orientation.θ = 0;
					}

		// for some distance R
                //   if( l1 < R )
                //      perOne = (R-l1)/l1  // fraction of l1 that is past R
                //
		// if length is less than sum of radii
		// 
		//if( l1 < 3 ) 
		{

			tmp2.x = otherPole.x;
			tmp2.y = otherPole.y;
			tmp2.z = otherPole.z;
			tmp2.dirty = true;
			tmp1.cross( tmp2.update(), crossDipole );

			//const realDot = otherPole.nx*relPole.nx + otherPole.ny*relPole.ny + otherPole.nz*relPole.nz;
			let realDot = this_.targetVec.x*relPole.nx + this_.targetVec.y*relPole.ny + this_.targetVec.z*relPole.nz;
			const ofsAngle2 = Math.acos(realDot)*2;

			crossDipole.θ = ofsAngle2;
			crossDipole.x = crossDipole.nx * crossDipole.θ;
			crossDipole.y = crossDipole.ny * crossDipole.θ;
			crossDipole.z = crossDipole.nz * crossDipole.θ;
                       //if(0)
/*
			if( dot < 0 ) {
				this_.eTorque.add( this_.crossDipole, 1 );
			}else {
				this_.eTorque.add( this_.crossDipole, -1 );
			}

*/		
		if( realDot < 0 )	
			realDot=-realDot* realDot;
		else
			if( controlForm ) {
				realDot=realDot* realDot;
				imp.x = controlForm.linScalar*1.0*0.02*realDot*tmpDir.x/(l1*l1);
				imp.y = controlForm.linScalar*1.0*0.02*realDot*tmpDir.y/(l1*l1);
				imp.z = controlForm.linScalar*1.0*0.02*realDot*tmpDir.z/(l1*l1);
				//zero.x = tmpDir.x;
				//zero.y = tmpDir.y;
				//zero.z = tmpDir.z;
				body.applyImpulse( 10,imp,zero );
                        //this_.position.x = motion.position.x - tmpDir.x * (1+perInner);
                        //this_.position.y = motion.position.y - tmpDir.y * (1+perInner);
                        //this_.position.z = motion.position.z - tmpDir.z * (1+perInner);
		       // this_.acceleration.addScaledVector( tmpDir, -1*speedNormal );
             }
		
                     //else
				//this_.acceleration.addScaledVector( tmpDir, 15*accScalar/(l1*l1) );
        }
	const l =body.position.length(); 
	imp.x = -body.position.x/(50000);
	imp.y = -body.position.y/(50000);
	imp.z = -body.position.z/(50000);
	body.applyImpulse( 10,imp,zero );
}
}	


function animate( cb, tick ) {
	var delta = clock.getDelta();

	cb( delta );
//	if( myMotion &&( myMotion.torque.x || myMotion.torque.y|| myMotion.torque.z ))
//		console.log( "MyMotion (before)", JSON.stringify(myMotion, null, '\t') );
	movers2.forEach( (ent,idx)=>{
		const motion = ent.m;
		motion.torque.dirty = true;
		motion.torque.update();
		const m = ent.x;
		//if( motion === myMotion ){
		//	if( myMotion &&( myMotion.torque.x || myMotion.torque.y|| myMotion.torque.z ))
		//		console.log( "TICK")
		//}
		motion.inertialmove(m.matrix,delta) 

		const s = motion.speed;
		const l = s.x * s.x + s.y*s.y + s.z*s.z;
		s.θ = Math.sqrt( l );
		if( s.θ ) {
			s.nx = s.x/s.θ;
			s.ny = s.y/s.θ;
			s.nz = s.z/s.θ;
		}
		
		const x1= m.position.x ; 
		const y= m.position.y ; 
		const z= m.position.z ; 
		if( x1 < -600  ) m.position.x += 1200;
		if( x1 > 600  ) m.position.x -= 1200;
		if( y < -600  ) m.position.y += 1200;
		if( y > 600  ) m.position.y -= 1200;
		if( z < -600  ) m.position.z += 1200;
		if( z > 600  ) m.position.z -= 1200;
/*

		if( ( x1 < -200 || x1 > 200 ) 
		  ||( y < -200 || y > 200 ) 
		  ||( z < -200 || z > 200 ) ) {
			m.position.x = 10 * ( RNG.getBits( 11, true ) / 1024 );
			m.position.y = 10 * ( RNG.getBits( 11, true ) / 1024 );
			m.position.z = 10 * ( RNG.getBits( 11, true ) / 1024 );
			motion.orientation.x = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
			motion.orientation.y = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
			motion.orientation.z = 2*Math.PI * ( RNG.getBits( 11, true ) / 1024 );
		}
*/
		/*
		if( m !== myMover )
			if( sumDel > 1 ) {
			
				mot.torque.x = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
				mot.torque.y = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
				mot.torque.z = 2*Math.PI/4 * ( RNG.getBits( 11, true ) / 1024 );
			}	
        */


	});

	if( myMotion )
	skybox.update( myMover.position, camera.position, new THREE.Vector3( myMotion.speed.nx, myMotion.speed.ny, myMotion.speed.nz ), myMotion.speed.θ );


//	if( myMotion &&( myMotion.torque.x || myMotion.torque.y|| myMotion.torque.z ))
//	console.log( "MyMotion (after)", JSON.stringify(myMotion, null, '\t') );
	//const rotation = ( ( controlForm.rotationRate ) / 100 ) * Math.PI;
	//const now = (Date.now() % 29000)/29000;
	if( controlForm)
		Motion.freeMoveAccel = controlForm.applyAccel;
	movers.forEach( (ent,idx)=>{
		ent.m.start();

		//ent.m.rotation.update();
	});
	movers.forEach( (ent,idx)=>{
		for( let idx2= 0; idx2 < (movers.length); idx2++ ){
			if( idx === idx2 ) continue;
			affect( ent, movers[idx2], idx2 < idx, delta );
			//ent.m.affect( movers[idx2].m, idx2 < idx, delta );
		}
		//affect( ent, 
		//ent.m.affect( myMotion, false, delta );

		const m = ent.x;
		const motion = ent.m;
		
		//motion.freemove(m.matrix,delta)  // what's freemove vs ?
		
		//motion.orientation.update(); // these are lnQuats?
		motion.dipole.update();

		///ent.attractor.move( m.position, motion.orientation );
		//motion.dipoleBody.

		
		var dirLines = dirs[idx];
		var dirLine = dirLines.line;
		var dirLine2 = dirLines.line2;
		var dirLine3 = dirLines.line3;
		var pt = {x:motion.eTorque.x*15, y:motion.eTorque.y*15, z:motion.eTorque.z*15 };
		//if( idx == 1 )
		//pt = motion.dipoleVec;

		if( !motion.tmpDipole ) {
			motion.dipoleVec.x = motion.dipole.x;
			motion.dipoleVec.y = motion.dipole.y;
			motion.dipoleVec.z = motion.dipole.z;
			const relPole = motion.orientation.update().apply( motion.dipoleVec );  
			motion.tmpDipole = relPole;
		}

		//const newDir = motion.tmpDir;//pt;// idx==0?pt:motion.orientation.apply( pt );
		const newDir = motion.targetVec;//pt;// idx==0?pt:motion.orientation.apply( pt );
		//const newDir = motion.tmpOtherDipole;//pt;// idx==0?pt:motion.orientation.apply( pt );
		//const newDir = motion.lastCross;//pt;// idx==0?pt:motion.orientation.apply( pt );
                                
		//const newDir2 = motion.tmpOtherDipole;//motion.orientation.apply( motion.dipoleVec );
		const newDir2 = motion.lastCross2;//motion.orientation.apply( motion.dipoleVec );
                //const newDir2 = motion.tmpDir;//motion.orientation.apply( motion.dipoleVec );


		//const newDir2 = motion.lastCross2;//motion.orientation.apply( motion.dipoleVec );
		//const newDir3 = motion.lastCross;
		//const newDir3 = motion.targetVec;
		//const newDir3 = motion.tmpDipole;
		const newDir3 = motion.tmpDipole;

		//const newDir3 = motion.tmpDir;
		if( newDir ) {

			dirLine.geometry.vertices[1].x = newDir.x*5;
			dirLine.geometry.vertices[1].y = newDir.y*5;
			dirLine.geometry.vertices[1].z = newDir.z*5;
			dirLine.position.copy( m.position );
		}
		if( newDir2 ) {
			dirLine2.geometry.vertices[1].x = newDir2.nx*5;
			dirLine2.geometry.vertices[1].y = newDir2.ny*5;
			dirLine2.geometry.vertices[1].z = newDir2.nz*5;
			dirLine2.position.copy( m.position );
		}
		if( newDir3 ) {
			dirLine3.geometry.vertices[1].x = newDir3.nx*5;
			dirLine3.geometry.vertices[1].y = newDir3.ny*5;
			dirLine3.geometry.vertices[1].z = newDir3.nz*5;
			dirLine3.position.copy( m.position );
		}


		//dirLine.geometry.vertices[1].x = motion.torque.x*5;
		//dirLine.geometry.vertices[1].y = motion.torque.y*5;
		//dirLine.geometry.vertices[1].z = motion.torque.z*5;
		dirLine.geometry.verticesNeedUpdate = true;
		dirLine2.geometry.verticesNeedUpdate = true;
		dirLine3.geometry.verticesNeedUpdate = true;
		//dirLine.matrix.compose( o, q, s );		
	});

	movers.forEach( (ent,idx)=>{
		//m.matrix                   
		const body = ent.body;
		body.applyTorque( ent.m.eTorque.update() );

		
	} );
        // Render three.js

        // Step the physics world
        //world.fixedStep();
    	world.step(1/60, delta, 1);
	movers.forEach( (ent,idx)=>{
		const b  =ent.body;
		const m = ent.x;
		//m.matrix                   

		m.position.copy( b.position );
		b.quaternion.setQuat( m.quaternion );
		//b.quaternion.exp( m.quaternion );
		
	} );
        // Render three.js



	if( sumDel > 1 ) sumDel = 0;
		sumDel += delta;

	controls.update(delta);
	if( controlForm )
		controlForm.update( delta );

	render();

	if( slow_animate )
		setTimeout( ()=>slowanim(animate.bind( this, cb )), 250 );
	else
		requestAnimationFrame( animate.bind( this, cb ) );
}






export {THREE}