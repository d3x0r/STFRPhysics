/**
 * @author d3x0r / https://github.com/d3x0r
 */

import * as THREE from "../3d/src/three.js/three.module.js"
import {lnQuat} from "../3d/src/lnQuatSq.js"
import {THREE_consts,Motion} from "../3d/src/three.js/personalFill.mjs"

export function NaturalCamera( object, domElement ) {
	var self = this;
	this.object = object;
	this.motion = new Motion(object);

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	// 65 /*A*/, 83 /*S*/, 68 /*D*/
	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40
        , A:65, S:83, D:68, W:87, SPACE:32, C:67 };

	// internals
	this.moveSpeed = 100* 12 * 0.0254;
	var scope = this;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var phiDelta = 0;
	var thetaDelta = 0;
	var scale = 1;

	var lastPosition = new THREE.Vector3();

	this.userRotate = true;

	this.rotateLeft = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta -= angle;

	};

	this.rotateRight = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta += angle;

	};

	this.rotateUp = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta += angle;

	};

	this.rotateDown = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta -= angle;

	};

	this.update = function ( tick ) {
	    scope.object.matrixWorldNeedsUpdate = true;
	    //scope.object.matrixNeedsUpdate = true;
		if( !scope.userRotate ) return;
		touchUpdate();
		if( phiDelta || thetaDelta ){
			//console.log( "rotation:", scope.motion.rotation, scope.motion.orientation )
		}
		scope.motion.rotation.x = -phiDelta;
		scope.motion.rotation.y = thetaDelta;
		scope.motion.rotation.dirty = true;
		thetaDelta = 0;
		phiDelta = 0;

		scope.motion.move( scope.object, tick );
		
		//scope.object.matrix.rotateRelative( 0, 0, -scope.object.matrix.roll );

	};

	

	function onMouseDown( event ) {
		if ( scope.enabled === false ) return;
		if( !scope.userRotate ) return;

		event.preventDefault();

		rotateStart.set( event.clientX, event.clientY );

		document.addEventListener( 'mousemove', onMouseMove, false );
		document.addEventListener( 'mouseup', onMouseUp, false );

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

    	rotateEnd.set( event.clientX, event.clientY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

        rotateDelta.x = 32 * (rotateDelta.x / window.innerWidth)
        rotateDelta.y = 32 * (rotateDelta.y / window.innerHeight)

		scope.rotateLeft( 2 * Math.PI * rotateDelta.x  );
		scope.rotateUp( 2 * Math.PI * rotateDelta.y );

		rotateStart.copy( rotateEnd );

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;
		if ( scope.userRotate === false ) return;

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );


	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false ) return;

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail ) { // Firefox

			delta = - event.detail;

		}

	/*
		if ( delta > 0 ) {

			scope.zoomOut();

		} else {

			scope.zoomIn();

		}
	*/
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
                scope.motion.speed.y = self.moveSpeed;
                break;
            case scope.keys.C:
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
                scope.motion.speed.y = 0;
                break;
            case scope.keys.C:
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
      rotateStart.set( t.x, t.y );
      t.new = false;
    }
    else {
            rotateEnd.set( t.x, t.y );
      		rotateDelta.subVectors( rotateEnd, rotateStart );

            rotateDelta.x = -2 * (rotateDelta.x / window.innerWidth)
            rotateDelta.y = - 2 * (rotateDelta.y / window.innerHeight)
      		scope.rotateLeft( Math.PI/2 * rotateDelta.x   );
      		scope.rotateUp( Math.PI/2 * rotateDelta.y );
            //console.log( rotateDelta )
      		rotateStart.copy( rotateEnd );
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

//THREE.NaturalCamera.

NaturalCamera.prototype = Object.create( THREE.EventDispatcher.prototype );
