
if( !THREE.REVISION.includes( "d3x0r" ) ) {

if( Number(THREE.REVISION) === 74 ) {
}

var vector3Pool = [];
THREE.Vector3Pool = {
	new : function(x,y,z) {
		var r = vector3Pool.pop();
		if( r ) {
			r.x = x;
			r.y = y;
			r.z = z;
		}
		else{
			r = new THREE.Vector3(x,y,z);
		}
		return r;
	}
}

THREE.Vector3.prototype.delete = function() {
    vector3Pool.push( this );
    return this;
}

var vector4Pool = [];
THREE.Vector4Pool = {
	new : function(x,y,z,w) {
		var r = vector4Pool.pop();
		if( r ) {
			r.x = x;
			r.y = y;
			r.z = z;
			r.w = w;
		}
		else{
			r = new THREE.Vector4(x,y,z,w);
		}
		return r;
	}
}

THREE.Vector4.prototype.delete = function() {
    vector4Pool.push( this );
    return this;
}


/*
	INLINEFUNC( void, Rotate, ( RCOORD dAngle, P_POINT vaxis1, P_POINT vaxis2 ) )
	{
	   _POINT v1, v2;
	   _POINT vsave;
	   RCOORD dsin = (RCOORD)SIN( dAngle )
	   	  , dcos = (RCOORD)COS( dAngle );
	   MemCpy( vsave, vaxis1, sizeof( _POINT ) );
	   DOFUNC(scale)( v1, vaxis1, dcos );
	   DOFUNC(scale)( v2, vaxis2, dsin );
	   DOFUNC(sub)( vaxis1, v1, v2 );
	   DOFUNC(scale)( v2, vsave, dsin );
	   DOFUNC(scale)( v1, vaxis2, dcos );
	   DOFUNC(add)( vaxis2, v2, v1 );
	}
*/

THREE.Vector3Unit = new      THREE.Vector3(  1,  1,  1 );
THREE.Vector3Zero = new      THREE.Vector3(  0,  0,  0 );
THREE.Vector3Right = new     THREE.Vector3( -1,  0,  0 );
THREE.Vector3Backward = new  THREE.Vector3(  0,  0,  1 );
THREE.Vector3Up = new        THREE.Vector3(  0,  1,  0 );
THREE.Vector3Left = new      THREE.Vector3(  1,  0,  0 );
THREE.Vector3Forward = new   THREE.Vector3(  0,  0, -1 );
THREE.Vector3Down = new      THREE.Vector3(  0, -1,  0 );


["Vector3Unit"
,"Vector3Zero"
,"Vector3Right"
,"Vector3Backward"
,"Vector3Up"
,"Vector3Left"
,"Vector3Forward"
,"Vector3Down"].forEach( function(key){
	Object.freeze(THREE[key])
	Object.defineProperty(THREE[key], "x", { writable: false })
	Object.defineProperty(THREE[key], "y", { writable: false })
	Object.defineProperty(THREE[key], "z", { writable: false })
})

var oldProto = THREE.Matrix4.prototype;
var oldMatrixContructor = THREE.Matrix4.prototype.constructor;
THREE.Matrix4x = function() {
	this.elements = new Float32Array( [

		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1

	] );

	Object.defineProperty(this, "elements", { writable:false } );


}

THREE.Matrix4.prototype.__defineGetter__( "motion", function(){
	if( !this._motion ){
        this._motion = {
        	tick : 0,
        	speed : new THREE.Vector3(),
                acceleration : new THREE.Vector3(),
                rotation : new THREE.Vector3(),
                torque : new THREE.Vector3(),
                mass : 1.0,
                move : function( m, delta ) {
					this.speed.addScaledVector( this.acceleration, delta );
					var del = this.speed.clone().multiplyScalar( delta );

					m.origin.addScaledVector( m.forward, del.z );
					m.origin.addScaledVector( m.up, del.y );
					m.origin.addScaledVector( m.left, del.x );

					this.rotation.addScaledVector( this.torque, delta );
					var this_move = this.rotation.clone().multiplyScalar( delta )
					m.rotateRelative( this_move.x, this_move.y, this_move.z );
					this_move.delete();
					del.delete();
				},
				rotate : function( m, delta ) {
					var iterations = 1;

					var max = Math.abs( this.rotation.x );
					var tmp = Math.abs( this.rotation.y );
					if( tmp > max ) {
						max = tmp;
						tmp = Math.abs( this.rotation.z );
						if( tmp > max ) {
							max = tmp;
							while( ( ( max * delta ) / iterations ) > 0.1 )
								iterations++;
						} else {
							while( ( ( max * delta ) / iterations ) > 0.1 )
								iterations++;
						}
					} else {
						tmp = Math.abs( this.rotation.z );
						if( tmp > max ) {
							max = tmp;
							while( ( ( max * delta ) / iterations ) > 0.1 )
								iterations++;
						} else {
							while( ( ( max * delta ) / iterations ) > 0.1 )
								iterations++;
						}
					}
					var delx = ( this.rotation.x * delta ) / iterations;
					var dely = ( this.rotation.y * delta ) / iterations;
					var delz = ( this.rotation.z * delta ) / iterations;
					for( var n = 0; n < iterations; n++ ) {
						m.rotateRelative( delx, dely, delz );
					}
					// delta = delta / 1000;
					/*
					   ** this is becoming a physics engine frame...
					   ** might as well just add that.
                	var delta_accel = this.acceleration.clone().multiplyScalar(delta);
					if( ( this.rotation.x > ( Math.PI / 4 ) )
					   ||( this.rotation.x < -( Math.PI / 4 ) )
					   ||( this.rotation.y > ( Math.PI / 4 ) )
					   ||( this.rotation.y < -( Math.PI / 4 ) )
					   ||( this.rotation.z > ( Math.PI / 4 ) )
					   ||( this.rotation.z < -( Math.PI / 4 ) )
					   ){
						   var max = this.rotation.x;
						   if( max < this.rotation.y )
						   	 max = this.rotation.y;
						   if( max < this.rotation.z )
						     max = this.rotation.z;
						 var min = this.rotation.x;
  						   if( min > this.rotation.y )
  						   	 max = this.rotation.y;
  						   if( min > this.rotation.z )
  						     max = this.rotation.z;
							if( min < 0 )
								if( max < -min )
									max = -min;
							var t;
							for( t = 1; t < 100; t++ )
								if( ( max / t ) < ( Math.PI / 4 ))
									break;

							delta_accel.scale( 1 / t );
					   }
					  */
				  },


			rotate : function( m, delta ) {
				var iterations = 1;

				var max = Math.abs( this.rotation.x );
				var tmp = Math.abs( this.rotation.y );
				if( tmp > max ) {
					max = tmp;
					tmp = Math.abs( this.rotation.z );
					if( tmp > max ) {
						max = tmp;
						while( ( ( max * delta ) / iterations ) > 0.1 )
							iterations++;
					} else {
						while( ( ( max * delta ) / iterations ) > 0.1 )
							iterations++;
					}
				} else {
					tmp = Math.abs( this.rotation.z );
					if( tmp > max ) {
						max = tmp;
						while( ( ( max * delta ) / iterations ) > 0.1 )
							iterations++;
					} else {
						while( ( ( max * delta ) / iterations ) > 0.1 )
							iterations++;
					}
				}
				var delx = ( this.rotation.x * delta ) / iterations;
				var dely = ( this.rotation.y * delta ) / iterations;
				var delz = ( this.rotation.z * delta ) / iterations;
				for( var n = 0; n < iterations; n++ ) {
					m.rotateRelative( delx, dely, delz );
				}
				// delta = delta / 1000;
				/*
					 ** this is becoming a physics engine frame...
					 ** might as well just add that.
								var delta_accel = this.acceleration.clone().multiplyScalar(delta);
				if( ( this.rotation.x > ( Math.PI / 4 ) )
					 ||( this.rotation.x < -( Math.PI / 4 ) )
					 ||( this.rotation.y > ( Math.PI / 4 ) )
					 ||( this.rotation.y < -( Math.PI / 4 ) )
					 ||( this.rotation.z > ( Math.PI / 4 ) )
					 ||( this.rotation.z < -( Math.PI / 4 ) )
					 ){
						 var max = this.rotation.x;
						 if( max < this.rotation.y )
							 max = this.rotation.y;
						 if( max < this.rotation.z )
							 max = this.rotation.z;
					 var min = this.rotation.x;
							 if( min > this.rotation.y )
								 max = this.rotation.y;
							 if( min > this.rotation.z )
								 max = this.rotation.z;
						if( min < 0 )
							if( max < -min )
								max = -min;
						var t;
						for( t = 1; t < 100; t++ )
							if( ( max / t ) < ( Math.PI / 4 ))
								break;

						delta_accel.scale( 1 / t );
					 }
					*/
				}

	        };
	}
	return this._motion;
} );

THREE.Matrix4.prototype.__defineGetter__( "origin", function(){
	if( !this._origin ){
		var self = this;
		this._origin = new THREE.Vector3();
		Object.defineProperty(this, "_origin", { writable:false } );
		Object.defineProperty( this._origin, "x", {
			get : function(){
				return self.elements[12];
			},
			set : function(v){
				self.elements[12] = v;
			}
		})
		Object.defineProperty( this._origin, "y", {
			get : ()=>{
				return self.elements[13];
			},
			set : (v)=>{
				self.elements[13] = v;
			}
		})
		Object.defineProperty( this._origin, "z", {
			get : ()=>{
				return self.elements[14];
			},
			set : (v)=>{
				self.elements[14] = v;
			}
		})
	}
	return this._origin;
} );




THREE.Matrix4.prototype.rotateOrtho = function( angle, axis1, axis2 ) {
		if( !angle ) return;
		// 0 = x;  0
		// 1 = y;  4
		// 2 = z;  8
		var te = this.elements;
		var sa = Math.sin( angle );
		var ca = Math.cos( angle );
        switch( axis1 )	{
			case 0: switch( axis2 ){
				case 0:
					throw new Error( "Invalid axis combination, cannot rotate axis toward itself")
				break;
				case 1:
					var save1x = te[0], save1y = te[1], save1z = te[2];
					var tmp1x = te[0] * ca, tmp1y = te[1] * ca, tmp1z = te[2] * ca;
					var tmp2x = te[4] * sa, tmp2y = te[5] * sa, tmp2z = te[6] * sa;
					te[0] = tmp1x - tmp2x; te[1] = tmp1y - tmp2y; te[2] = tmp1z - tmp2z;
					tmp2x = save1x * sa; tmp2y = save1y * sa; tmp2z = save1z * sa;
					tmp1x = te[4] * ca; tmp1y = te[5] * ca; tmp1z = te[6] * ca;
					te[4] = tmp1x + tmp2x; te[5] = tmp1y + tmp2y; te[6] = tmp1z + tmp2z;
					break;
				case 2:
					var save1x = te[0], save1y = te[1], save1z = te[2];
					var tmp1x = te[0] * ca, tmp1y = te[1] * ca, tmp1z = te[2] * ca;
					var tmp2x = te[8] * sa, tmp2y = te[9] * sa, tmp2z = te[10] * sa;
					te[0] = tmp1x - tmp2x; te[1] = tmp1y - tmp2y; te[2] = tmp1z - tmp2z;
					tmp2x = save1x * sa; tmp2y = save1y * sa; tmp2z = save1z * sa;
					tmp1x = te[8] * ca; tmp1y = te[9] * ca; tmp1z = te[10] * ca;
					te[8] = tmp1x + tmp2x; te[9] = tmp1y + tmp2y; te[10] = tmp1z + tmp2z;
					break;
			}
			break;
			case 1: switch( axis2 ){
				case 0:
					var save1x = te[4], save1y = te[5], save1z = te[6];
					var tmp1x = te[4] * ca, tmp1y = te[5] * ca, tmp1z = te[6] * ca;
					var tmp2x = te[0] * sa, tmp2y = te[1] * sa, tmp2z = te[2] * sa;
					te[4] = tmp1x - tmp2x; te[5] = tmp1y - tmp2y; te[6] = tmp1z - tmp2z;
					tmp2x = save1x * sa; tmp2y = save1y * sa; tmp2z = save1z * sa;
					tmp1x = te[0] * ca; tmp1y = te[1] * ca; tmp1z = te[2] * ca;
					te[0] = tmp1x + tmp2x; te[1] = tmp1y + tmp2y; te[2] = tmp1z + tmp2z;
					break;
				case 1:
					throw new Error( "Invalid axis combination, cannot rotate axis toward itself")
				break;
				case 2:
					var save1x = te[4], save1y = te[5], save1z = te[6];
					var tmp1x = te[4] * ca, tmp1y = te[5] * ca, tmp1z = te[6] * ca;
					var tmp2x = te[8] * sa, tmp2y = te[9] * sa, tmp2z = te[10] * sa;
					te[4] = tmp1x - tmp2x; te[5] = tmp1y - tmp2y; te[6] = tmp1z - tmp2z;
					tmp2x = save1x * sa; tmp2y = save1y * sa; tmp2z = save1z * sa;
					tmp1x = te[8] * ca; tmp1y = te[9] * ca; tmp1z = te[10] * ca;
					te[8] = tmp1x + tmp2x; te[9] = tmp1y + tmp2y; te[10] = tmp1z + tmp2z;
				break;
			}
			break;
			case 2: switch( axis2 ){
				case 0:
					var save1x = te[8], save1y = te[9], save1z = te[10];
					var tmp1x = te[8] * ca, tmp1y = te[9] * ca, tmp1z = te[10] * ca;
					var tmp2x = te[0] * sa, tmp2y = te[1] * sa, tmp2z = te[2] * sa;
					te[8] = tmp1x - tmp2x; te[9] = tmp1y - tmp2y; te[10] = tmp1z - tmp2z;
					tmp2x = save1x * sa; tmp2y = save1y * sa; tmp2z = save1z * sa;
					tmp1x = te[0] * ca; tmp1y = te[1] * ca; tmp1z = te[2] * ca;
					te[0] = tmp1x + tmp2x; te[1] = tmp1y + tmp2y; te[2] = tmp1z + tmp2z;
				break;
				case 1:
					var save1x = te[8], save1y = te[9], save1z = te[10];
					var tmp1x = te[8] * ca, tmp1y = te[9] * ca, tmp1z = te[10] * ca;
					var tmp2x = te[4] * sa, tmp2y = te[5] * sa, tmp2z = te[6] * sa;
					te[8] = tmp1x - tmp2x; te[9] = tmp1y - tmp2y; te[10] = tmp1z - tmp2z;
					tmp2x = save1x * sa; tmp2y = save1y * sa; tmp2z = save1z * sa;
					tmp1x = te[4] * ca; tmp1y = te[5] * ca; tmp1z = te[6] * ca;
					te[4] = tmp1x + tmp2x; te[5] = tmp1y + tmp2y; te[6] = tmp1z + tmp2z;
				break;
				case 2:
					throw new Error( "Invalid axis combination, cannot rotate axis toward itself")
				break;
			}
			break;
		}
    };
	THREE.Matrix4.prototype.Translate = function(x,y,z) {
			this.origin.x = x;
			this.origin.y = y;
			this.origin.z = z;
	};
	THREE.Matrix4.prototype.rotateRelative = function( x, y, z ){
		//console.trace( "rotate starts as ", this )
		if( typeof this.tick === "undefined" ) this.tick = 0;
		switch( this.tick++ ) {
			case 0:
				this.rotateOrtho( x, 1, 2 );
				this.rotateOrtho( y, 0, 2 );
				this.rotateOrtho( z, 0, 1 );
				break;
			case 1:
				this.rotateOrtho( y, 0, 2 );
				this.rotateOrtho( x, 1, 2 );
				this.rotateOrtho( z, 0, 1 );
				break;
			case 2:
				this.rotateOrtho( z, 0, 1 );
				this.rotateOrtho( x, 1, 2 );
				this.rotateOrtho( y, 0, 2 );
				break;
			case 3:
				this.rotateOrtho( x, 1, 2 );
				this.rotateOrtho( z, 0, 1 );
				this.rotateOrtho( y, 0, 2 );
				break;
			case 4:
				this.rotateOrtho( y, 0, 2 );
				this.rotateOrtho( z, 0, 1 );
				this.rotateOrtho( x, 1, 2 );
				break;
			case 5:
				this.rotateOrtho( z, 0, 1 );
				this.rotateOrtho( y, 0, 2 );
				this.rotateOrtho( x, 1, 2 );
				this.tick = 0;
				break;
		}
	};
	THREE.Matrix4.prototype.__defineGetter__( "left", function(){
        	return THREE.Vector3Pool.new( this.elements[0], this.elements[1], this.elements[2] );
        } );
	THREE.Matrix4.prototype.__defineGetter__( "right", function(){
		return THREE.Vector3Pool.new( -this.elements[0], -this.elements[1], -this.elements[2] );
	} );
	THREE.Matrix4.prototype.__defineGetter__( "up", function(){
        	return THREE.Vector3Pool.new( this.elements[4], this.elements[5], this.elements[6] );
        } );
	THREE.Matrix4.prototype.__defineGetter__( "down", function(){
		return THREE.Vector3Pool.new( -this.elements[4], -this.elements[5], -this.elements[6] );
        } );
	THREE.Matrix4.prototype.__defineGetter__( "forward", function(){
        	return THREE.Vector3Pool.new( -this.elements[8], -this.elements[9], -this.elements[10] );
        } );
	THREE.Matrix4.prototype.__defineGetter__( "backward", function(){
		return THREE.Vector3Pool.new( this.elements[8], this.elements[9], this.elements[10] );
        } );
	THREE.Matrix4.prototype.move = function (tick) {
        	if( this.motion )
				this.motion.move( this, tick );
        	//this.origin.addScaledVector( this.forward, z ).addScaledVector( this.up, y ).addScaledVector( this.left, x )
		};
	THREE.Matrix4.prototype.moveNow = function ( x,y,z ) { this.origin.addScaledVector( this.forward, z ).addScaledVector( this.up, y ).addScaledVector( this.left, x ) };
	THREE.Matrix4.prototype.moveForward = function ( n ) { this.origin.addScaledVector( this.forward, n ); };
	THREE.Matrix4.prototype.moveUp = function ( n ) { this.origin.addScaledVector( this.up, n ); };
	THREE.Matrix4.prototype.moveLeft = function ( n ) { this.origin.addScaledVector( this.left, n ); };
	THREE.Matrix4.prototype.moveBackward = function ( n ) { this.origin.addScaledVector( this.backward, n ); };
	THREE.Matrix4.prototype.moveDown = function ( n ) { this.origin.addScaledVector( this.down, n ); };
	THREE.Matrix4.prototype.moveRight = function ( n ) { this.origin.addScaledVector( this.right, n ); };

	THREE.Matrix4.prototype.__defineGetter__( "inv_left", function(){
        	return Vector3Pool.new( this.elements[0], this.elements[4], this.elements[8] );
        } );
	THREE.Matrix4.prototype.__defineGetter__( "inv_up", function(){
        	return Vector3Pool.new( this.elements[1], this.elements[5], this.elements[9] );
        } );
	THREE.Matrix4.prototype.__defineGetter__( "inv_forward", function(){
        	return Vector3Pool.new( this.elements[2], this.elements[6], this.elements[10] );
        } );

	THREE.Matrix4.prototype.getRoll = function( relativeUp ) {
		//if( !relativeUp ) relativeUp = THREE.Vector3Up;
		return Math.asin( this.right.dot( relativeUp ) );
	};
	THREE.Matrix4.prototype.getPitch = function( relativeForward ) {
		//if( !relativeForward ) relativeForward = THREE.Vector3Forward;
		return Math.asin( this.up.dot( relativeForward ) );
	};
	THREE.Matrix4.prototype.getYaw = function( relativeRight ) {
		//if( !relativeRight ) relativeRight = THREE.Vector3Right;
		return Math.asin( this.forward.dot( relativeRight ) );
	};
	THREE.Matrix4.prototype.__defineGetter__( "roll", function(){
		return this.getRoll( THREE.Vector3Up );
	} );
	THREE.Matrix4.prototype.__defineGetter__( "pitch", function(){
		return this.getPitch( THREE.Vector3Forward );
	} );
	THREE.Matrix4.prototype.__defineGetter__( "yaw", function(){
		return this.getYaw( THREE.Vector3Right );
	} );
}
