/**
 * @author d3x0r / https://github.com/d3x0r
 */

import * as THREE from "../3d/src/three.js/three.module.js"

// lnQuat is used in Motion, but not directly here
//import {lnQuat} from "../3d/src/lnQuatSq.js"
import {THREE_consts,Motion} from "../3d/src/three.js/personalFill.mjs"

export function NaturalCamera( object, domElement ) {
	var self = this;
	this.object = object;
	this.motion = new Motion(object);

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	// 65 /*A*/, 83 /*S*/, 68 /*D*/
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40
        , A:65, S:83, D:68, W:87, SPACE:32, C:67, E:69, Q:81 };

	// internals
	this.moveSpeed = 10 * 12 * 0.0254;
	const scope = this;
	
	// 2d scaled screen point - prior position
	this.rotateStart = new THREE.Vector2();
	// 2d scaled screen point - current
	this.rotateEnd = new THREE.Vector2();
	// temp for rotation difference of start and end
	this.rotateDelta = new THREE.Vector2();

	let phiDelta = 0;
	let thetaDelta = 0;

	this.userRotate = false;

	this.rotateLeft = function ( angle ) {
		if ( angle === undefined )  angle = 0;//getAutoRotationAngle();
		thetaDelta -= angle;
	};

	this.rotateRight = function ( angle ) {
		if ( angle === undefined )  angle = 0;//getAutoRotationAngle();
		thetaDelta += angle;

	};

	this.rotateUp = function ( angle ) {
		if ( angle === undefined )  angle = 0;//getAutoRotationAngle();
		phiDelta += angle;

	};

	this.rotateDown = function ( angle ) {
		if ( angle === undefined )  angle = 0;//getAutoRotationAngle();
		phiDelta -= angle;
	};

	this.update = function ( tick ) {
	    scope.object.matrixWorldNeedsUpdate = true;
	    //scope.object.matrixNeedsUpdate = true;
		if( !scope.userRotate ) return;
		touchUpdate();

		const roll = scope.motion.orientation.getRoll();
		if( phiDelta || thetaDelta || roll ){
			scope.motion.rotation.x = -phiDelta;
			scope.motion.rotation.y = thetaDelta;

			// always face 'up'
			scope.motion.rotation.z = -roll/tick; // normalize rotation to full rotation for this tick.

			scope.motion.rotation.dirty = true;
			//scope.motion.rotation.yaw(  );
			thetaDelta = 0;
			phiDelta = 0;

			scope.motion.move( scope.object, tick );			
		}

	};

	

	function onMouseDown( event ) {
	         //console.log( "down" );
		if ( scope.enabled === false ) return;
		if( !scope.userRotate ) return;

		event.preventDefault();

		//scope.rotateStart.set( event.clientX, event.clientY );


	}

	function onMouseMove( event ) {
		if ( scope.enabled === false ) return;

		event.preventDefault();


	//if( event.movementX
		scope.rotateDelta.set( event.movementX, event.movementY );

	        scope.rotateDelta.x = 25 * (scope.rotateDelta.x / window.innerWidth)
        	scope.rotateDelta.y = 25 * (scope.rotateDelta.y / window.innerHeight)

		thetaDelta -= ( 2 * Math.PI * scope.rotateDelta.x  );
		phiDelta += ( 2 * Math.PI * scope.rotateDelta.y );

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;
		if ( scope.userRotate === false ) return;


	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false ) return;
	}

	var keyEvent = null;

	function onKeyDown( event ) {

		if ( scope.enabled === false ) return;

		if( !scope.userRotate ) {
			if( keyEvent )
				keyEvent( event, true );
			return;
		}

		switch ( event.keyCode ) {
		default:
			if( keyEvent )
				keyEvent( event, true );
			break;
            case scope.keys.SPACE:
            case scope.keys.E:
                scope.motion.speed.y = self.moveSpeed;
                break;
            case scope.keys.C:
            case scope.keys.Q:
                scope.motion.speed.y = -self.moveSpeed;
				break;
			case scope.keys.A:
				scope.motion.speed.x = self.moveSpeed;
				break;
			case scope.keys.W:
				scope.motion.speed.z = -self.moveSpeed;
				break;
			case scope.keys.S:
				scope.motion.speed.z = self.moveSpeed;
				break;
			case scope.keys.D:
				scope.motion.speed.x = -self.moveSpeed;
				break;
		}

	}

	function onKeyUp( event ) {

if( !scope.userRotate ) return;
        switch ( event.keyCode ) {
		default:
			if( keyEvent )
				keyEvent( event, false );
			break;
            case scope.keys.SPACE:
            case scope.keys.E:
                scope.motion.speed.y = 0;
                break;
            case scope.keys.C:
            case scope.keys.Q:
                scope.motion.speed.y = 0;
                break;

            case scope.keys.A:
                scope.motion.speed.x = 0;
				break;
			case scope.keys.W:
                scope.motion.speed.z = 0;
				break;
			case scope.keys.S:
                scope.motion.speed.z = 0;
				break;
			case scope.keys.D:
                scope.motion.speed.x = 0;
				break;
        }
		//switch ( event.keyCode ) {

		//		break;
		//}

	}

var touches = [];
if( typeof TouchList !== "undefined" )
	TouchList.prototype.forEach = function(c){ for( var n = 0; n < this.length; n++ ) c(this[n]); }

function touchUpdate() {
  if( touches.length == 1 ){
    var t = touches[0];
    if( t.new )
    {
      scope.rotateStart.set( t.x, t.y );
      t.new = false;
    }
    else {
            scope.rotateEnd.set( t.x, t.y );
      		scope.rotateDelta.subVectors( scope.rotateEnd, scope.rotateStart );

            scope.rotateDelta.x = -2 * (scope.rotateDelta.x / window.innerWidth)
            scope.rotateDelta.y = - 2 * (scope.rotateDelta.y / window.innerHeight)
      		scope.rotateLeft( Math.PI/2 * rotateDelta.x   );
      		scope.rotateUp( Math.PI/2 * rotateDelta.y );
            //console.log( rotateDelta )
      		scope.rotateStart.copy( scope.rotateEnd );
    }
  }
}

function onTouchStart( e ) {
  e.preventDefault();
  e.changedTouches.forEach( (touch)=>{
    touches.push( {ID:touch.identifier,
      x : touch.clientX,
      y : touch.clientY,
      new : true
    })
  })
}

function onTouchMove( e ) {
  e.preventDefault();
  e.changedTouches.forEach( (touchChanged)=>{
    var touch = touches.find( (t)=> t.ID === touchChanged.identifier );
    if( touch ) {
      touch.x = touchChanged.clientX;
      touch.y = touchChanged.clientY;
    }
  })
}

function onTouchEnd( e ) {
  e.preventDefault();
  e.changedTouches.forEach( (touchChanged)=>{
    var touchIndex = touches.findIndex( (t)=> t.ID === touchChanged.identifier );
    if( touchIndex >= 0 )
       touches.splice( touchIndex, 1 )
  })
}

    function ignore(event) {
        event.preventDefault();
    }
    this.disable = function() {
    	scope.domElement.removeEventListener( 'contextmenu', ignore, false );
    	scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
    	scope.domElement.removeEventListener( 'mousewheel', onMouseWheel, false );
    	scope.domElement.removeEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
    	window.removeEventListener( 'keydown', onKeyDown, false );
    	window.removeEventListener( 'keyup', onKeyUp, false );
    }

    this.enable = function(cb) {
		keyEvent = cb;
    	scope.domElement.addEventListener( 'contextmenu', ignore, false );
    	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.addEventListener( 'mousemove', onMouseMove, false );
		scope.domElement.addEventListener( 'mouseup', onMouseUp, false );

    	scope.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
      	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
      	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );
      	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );

    	scope.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox
    	window.addEventListener( 'keydown', onKeyDown, false );
    	window.addEventListener( 'keyup', onKeyUp, false );
    }
    this.enable();

};


// extend Object with a default event dispatcher
NaturalCamera.prototype = Object.create( THREE.EventDispatcher.prototype );
