
import * as THREE from "./three.module.js"
import {lnQuat} from "../lnQuatSq.js"

var vector3Pool = [];
export const Vector3Pool = {
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
export const Vector4Pool = {
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

const Vector3Unit = new      THREE.Vector3(  1,  1,  1 );
const Vector3Zero = new      THREE.Vector3(  0,  0,  0 );
const Vector3Right = new     THREE.Vector3( -1,  0,  0 );
const Vector3Backward = new  THREE.Vector3(  0,  0,  1 );
const Vector3Up = new        THREE.Vector3(  0,  1,  0 );
const Vector3Left = new      THREE.Vector3(  1,  0,  0 );
const Vector3Forward = new   THREE.Vector3(  0,  0, -1 );
const Vector3Down = new      THREE.Vector3(  0, -1,  0 );

export const THREE_consts = {
	 Vector3Unit :	 Vector3Unit ,
	Vector3Zero :	Vector3Zero ,
	 Vector3Right:	 Vector3Right, 
	 Vector3Backward:	 Vector3Backward,
	 Vector3Up :	 Vector3Up ,
	 Vector3Left:	 Vector3Left, 
	 Vector3Forward:	 Vector3Forward,
	 Vector3Down:	 Vector3Down 
}

const x = ["Vector3Unit"
,"Vector3Zero"
,"Vector3Right"
,"Vector3Backward"
,"Vector3Up"
,"Vector3Left"
,"Vector3Forward"
,"Vector3Down"].forEach( function(key){
	Object.freeze(THREE_consts[key])
	Object.defineProperty(THREE_consts[key], "x", { writable: false })
	Object.defineProperty(THREE_consts[key], "y", { writable: false })
	Object.defineProperty(THREE_consts[key], "z", { writable: false })
})


const tmpQ = new lnQuat();

export class Motion {
	body  = null;


	speed = new THREE.Vector3();
	acceleration = new THREE.Vector3();
	orientation = new lnQuat();
	rotation = new lnQuat();
	torque = new lnQuat();
	eTorque = new lnQuat();

	dipole = new lnQuat();
	dipoleVec = new THREE.Vector3();
	mass = 1.0;


	constructor( body ) {
		this.body = body;
	}


	affect( motion, inverse, delta ) {
		const tmp1 = new lnQuat();
		const tmp2 = new lnQuat();
		this.dipoleVec.x = this.dipole.x;
		this.dipoleVec.y = this.dipole.y;
		this.dipoleVec.z = this.dipole.z;
		const relPole = this.orientation.update().apply( this.dipoleVec );  
		motion.dipoleVec.x = motion.dipole.x;
		motion.dipoleVec.y = motion.dipole.y;
		motion.dipoleVec.z = motion.dipole.z;
		const otherPole = motion.orientation.update().apply( motion.dipoleVec );
		tmp1.x = relPole.x;
		tmp1.y = relPole.y;
		tmp1.z = relPole.z;
		tmp1.dirty = true;
		tmp2.x = otherPole.x;
		tmp2.y = otherPole.y;
		tmp2.z = otherPole.z;
		tmp2.dirty = true;
		tmp1.update(); tmp2.update();

		//this.dipole.update();
		//motion.dipole.update();
		const torque = new lnQuat();// 0, tmp2.x-tmp1.x,tmp2.y-tmp1.y,tmp2.z-tmp1.z);
		if(  false && inverse )
			tmp2.cross( tmp1, torque );
		else
			tmp1.cross( tmp2, torque );
		const bodyDel = Vector3Pool.new().subVectors(  this.body.position, motion.body.position );
		const rSq = bodyDel.lengthSq()/100;
		bodyDel.delete();
		this.eTorque.add( torque, 1/rSq );
		//this.rotation.add( torque, delta/rSq );
		//this.acceleration.add( bodyDel )
	}
	
	start() {
		this.eTorque.set( 0, 0, 0, 0 );
		this.torque.set( 0, 0, 0, 0 );
		this.acceleration.set( 0, 0, 0 );
	}
                move ( m, delta ) {

					//this.orientation.spin( this.rotation.θ ,this.rotation.freeSpin( this.torque.θ * delta, this.torque ), delta ).exp( this.body.quaternion, 1 );
					this.torque.update();
					if( this.torque.θ) {
						//console.log( "Updating rotation:", this.rotation, this.torque )
						tmpQ.set( this.torque ).freeSpin( -this.orientation.θ, this.orientation );
						tmpQ.add( this.eTorque )
						this.rotation.freeSpin( tmpQ.θ * delta, tmpQ );
					}
					this.rotation.update();
					this.orientation.spin( this.rotation.θ * delta, {x:this.rotation.nx
							, y:this.rotation.ny
							, z:this.rotation.nz } ).exp( this.body.quaternion, 1 );

					this.speed.addScaledVector( this.acceleration, delta );
					var del = this.speed.clone().multiplyScalar( delta );
					const basis = this.orientation.getBasis();
					this.body.position.addScaledVector( basis.forward, del.z );
					this.body.position.addScaledVector( basis.up, del.y );
					this.body.position.addScaledVector( basis.right, -del.x );

					// this is applying internal torque.

					//m.rotateRelative( this_move.x, this_move.y, this_move.z );
					//this_move.delete();
					del.delete();
				}
                freemove( m, delta ) {
					
					var del = this.acceleration.clone().multiplyScalar( delta );
					const basis = this.orientation.getBasis();
					this.speed.addScaledVector( basis.forward, del.z );
					this.speed.addScaledVector( basis.up, del.y );
					this.speed.addScaledVector( basis.right, -del.x );

					del.delete();

					this.body.position.addScaledVector( this.speed, delta );

					//const tq = {x:this.torque.x, y:this.torque.y, z:this.torque.z}
					//const gtorque = tq;//this.orientation.applyDel( tq );

					//tmpQ.set( 0, gtorque.x, gtorque.y, gtorque.z );
					//tmpQ.add( this.eTorque )
					this.torque.update();
					if( this.torque.θ) {
						//console.log( "Updating rotation:", this.rotation, this.torque )
						///tmpQ.set( this.torque ).freeSpin( this.orientation.θ, this.orientation );
						//this.rotation.freeSpin( tmpQ.θ * delta, tmpQ );
						this.rotation.spin( this.torque.θ * delta, this.torque );
					}
					this.eTorque.update();
					tmpQ.set( 0, this.eTorque.x + this.rotation.x, this.eTorque.y + this.rotation.y, this.eTorque.z + this.rotation.z );
					tmpQ.update();
					//this.rotation.spin( this.eTorque.θ * delta, this.eTorque ).update();
					//this.rotation.add( this.eTorque,  delta ).update();
					
					this.orientation.spin( this.rotation.θ * delta, {x:this.rotation.nx
							, y:this.rotation.ny
							, z:this.rotation.nz } ).exp( this.body.quaternion, 1 );
					
					this.orientation.spin( this.eTorque.θ * delta, {x:this.eTorque.nx
							, y:this.eTorque.ny
							, z:this.eTorque.nz } ).exp( this.body.quaternion, 1 );
					if(0)
					this.orientation.spin( tmpQ.θ * delta, {x:tmpQ.nx
						, y:tmpQ.ny
						, z:tmpQ.nz } ).exp( this.body.quaternion, 1 );
	
								
					//this.orientation.add( this.rotation.freeSpin( this.torque.θ * delta, this.torque ), delta ).exp( this.body.rotation, 1 );
				}
				rotate( m, delta ) {
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
				  }


			rotate ( m, delta ) {
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
			}

}

