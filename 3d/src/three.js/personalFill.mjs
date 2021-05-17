	
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
let maxlog = 0;

const tmpQ = new lnQuat();

export class Motion {
	body  = null;


	speed = new THREE.Vector3();
	acceleration = new THREE.Vector3();
	orientation = new lnQuat();
	rotation = new lnQuat();
	torque = new lnQuat();
	eTorque = new lnQuat();
	lastCross = new lnQuat();
	lastCross2 = new lnQuat();
	tmpDir = new THREE.Vector3();
	
	dipole = new lnQuat();
	dipoleVec = new THREE.Vector3();
	targetVec = new THREE.Vector3();
	tmpDipole = null;
	tmpOtherDipole = null;
	affectors = 0;

	mass = 1.0;



	constructor( body ) {
		this.body = body;
	}


	affect( motion, inverse, delta ) {
		const tmp1 = new lnQuat();
		const tmp2 = new lnQuat();

		// compute a direction vector between this motion and motion target
		const tmpDir = this.tmpDir;
		tmpDir.subVectors( motion.body.position, this.body.position );
		const l1 = tmpDir.length();
		// compute my dispole in global coordinates (dipole is directly tied to orientation)
		this.dipoleVec.x = this.dipole.x;
		this.dipoleVec.y = this.dipole.y;
		this.dipoleVec.z = this.dipole.z;
		const relPole = this.orientation.update().apply( this.dipoleVec );  
		this.tmpDipole = relPole;

		// compute target dipole global coordinates (dipole is directly tied to orientation)
		motion.dipoleVec.x = motion.dipole.x;
		motion.dipoleVec.y = motion.dipole.y;
		motion.dipoleVec.z = motion.dipole.z;
		const otherPole = motion.orientation.update().apply( motion.dipoleVec );

		this.tmpOtherDipole = otherPole;
		//if( l1 > 20 ) return;
		this.affectors++;
		const l2 = motion.dipoleVec.length();

		// compute angle of my position vs target dipole direction
		const dot = ( tmpDir.x*otherPole.x + tmpDir.y*otherPole.y + tmpDir.z*otherPole.z )
			/ (l1*l2);

		/// dot == 1 : 0 degrees, up to dot = -1 at pi (180 degrees) and then it's times 2  
		// at 90 degrees a dipole is facing 180 degrees opposing, 
		// at 180 degrees it's 360 degrees and up again.
		const ofsAngle = Math.PI*2 - Math.acos(dot)*2;

		// use lnQUat for directed distance, normal, length
		tmp1.x = tmpDir.x;
		tmp1.y = tmpDir.y;
		tmp1.z = tmpDir.z;
		tmp1.dirty = true;

		// use lnQuat for dipole axis and angle (strength of pole?)
		tmp2.x = otherPole.x;
		tmp2.y = otherPole.y;
		tmp2.z = otherPole.z;
		tmp2.dirty = true;
		tmp1.update();
		tmp2.update();

		// cross product is a direction vector perpendicular to the direction and other pole
		const torque = this.lastCross;
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
		lnQuat.apply( ofsAngle, torque, otherPole, 1, this.targetVec);

		// use temp to compute the cross of my pole and the expected target pole
		tmp1.x = relPole.x
		tmp1.y = relPole.y
		tmp1.z = relPole.z

		// this is what the desired dipole should look like
		tmp2.x = this.targetVec.x
		tmp2.y = this.targetVec.y
		tmp2.z = this.targetVec.z

		tmp1.dirty = true;
		tmp2.dirty = true;
		tmp1.update();
		tmp2.update();

		// cross is a rotation that moves the axis of our dipole toward target dipole
		tmp1.cross( tmp2, this.lastCross2 );
		const accScalar = Math.cos( this.lastCross2.θ );

		// scale by N/r^2 for distance falloff
		this.eTorque.add( this.lastCross2, 100/(l1*l1*l1) );
		
		if( Motion.freeMoveAccel )
			this.acceleration.addScaledVector( tmpDir, 3*accScalar/(l1*l1) );
	}
	
	affectAlignPoles( motion, inverse, delta ) {
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
		tmp1.cross( tmp2, torque );
		const bodyDel = Vector3Pool.new().subVectors(  this.body.position, motion.body.position );
		const rSq = bodyDel.lengthSq();
		bodyDel.delete();
		this.eTorque.add( torque, 100/rSq );

		//console.log( "Torque:", this.eTorque );
		//this.rotation.add( torque, delta/rSq );
		//this.acceleration.add( bodyDel )
	}
	
	start() {
		this.affectors = 0;
		this.eTorque.set( 0, 0, 0, 0 );
		this.torque.set( 0, 0, 0, 0 );
		this.acceleration.set( 0, 0, 0 );
		
	}
                move ( m, delta ) {

					//this.orientation.spin( this.rotation.θ ,this.rotation.freeSpin( this.torque.θ * delta, this.torque ), delta ).exp( this.body.quaternion, 1 );
					this.torque.update();
					if( this.torque.θ) {
						//console.log( "Updating rotation:", this.rotation, this.torque )
						//tmpQ.set( this.torque ).freeSpin( -this.orientation.θ, this.orientation );
						//tmpQ.add( this.eTorque )
						this.rotation.spin( this.torque.θ * delta, this.torque );
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
					del.delete();
					
						/*
					var del = this.acceleration.clone().multiplyScalar( delta );
					const basis = this.orientation.getBasis();
					this.speed.addScaledVector( basis.forward, del.z );
					this.speed.addScaledVector( basis.up, del.y );
					this.speed.addScaledVector( basis.right, -del.x );

					del.delete();

					this.body.position.addScaledVector( this.speed, delta );
						*/
						
					// this is applying internal torque.

					//m.rotateRelative( this_move.x, this_move.y, this_move.z );
					//this_move.delete();
				}
                inertialmove ( m, delta ) {

					//this.orientation.spin( this.rotation.θ ,this.rotation.freeSpin( this.torque.θ * delta, this.torque ), delta ).exp( this.body.quaternion, 1 );
					this.torque.update();
					if( this.torque.θ) {
						//console.log( "Updating rotation:", this.rotation, this.torque )
						//tmpQ.set( this.torque ).freeSpin( -this.orientation.θ, this.orientation );
						//tmpQ.add( this.eTorque )
						this.rotation.spin( this.torque.θ * delta, this.torque );
					}
					this.rotation.update();
					this.orientation.spin( this.rotation.θ * delta, {x:this.rotation.nx
							, y:this.rotation.ny
							, z:this.rotation.nz } ).exp( this.body.quaternion, 1 );

					/*
					this.speed.addScaledVector( this.acceleration, delta );
					var del = this.speed.clone().multiplyScalar( delta );
					const basis = this.orientation.getBasis();
					this.body.position.addScaledVector( basis.forward, del.z );
					this.body.position.addScaledVector( basis.up, del.y );
					this.body.position.addScaledVector( basis.right, -del.x );
					del.delete();
					*/

					var del = this.acceleration.clone().multiplyScalar( delta );
					const basis = this.orientation.getBasis();
					this.speed.addScaledVector( basis.forward, del.z );
					this.speed.addScaledVector( basis.up, del.y );
					this.speed.addScaledVector( basis.right, -del.x );

					del.delete();

					this.body.position.addScaledVector( this.speed, delta );

					// this is applying internal torque.

					//m.rotateRelative( this_move.x, this_move.y, this_move.z );
					//this_move.delete();
				}
                freemove( m, delta ) {
					
					var del = this.acceleration.clone().multiplyScalar( delta );
					//const basis = this.orientation.getBasis();
					this.speed.add( del );
					//this.speed.addScaledVector( basis.forward, del.z );
					//this.speed.addScaledVector( basis.up, del.y );
					//this.speed.addScaledVector( basis.right, -del.x );

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
					this.rotation.update();
					if( this.affectors ) {
						this.eTorque.update();
						this.eTorque.θ /= this.affectors;
						this.eTorque.x = this.eTorque.nx * this.eTorque.θ;
						this.eTorque.y = this.eTorque.ny * this.eTorque.θ;
						this.eTorque.z = this.eTorque.nz * this.eTorque.θ;
					}
					const localRotation = Vector3Pool.new();
					lnQuat.apply( this.orientation.θ, this.orientation, this.rotation, 1, localRotation );
					tmpQ.set( 0, this.eTorque.x + localRotation.x, this.eTorque.y + localRotation.y, this.eTorque.z + localRotation.z );
					tmpQ.update();
					//this.rotation.spin( this.eTorque.θ * delta, this.eTorque ).update();
					//this.rotation.add( this.eTorque,  delta ).update();

					if(0)
					this.orientation.spin( this.rotation.θ * delta, {x:this.rotation.nx
							, y:this.rotation.ny
							, z:this.rotation.nz } ).exp( this.body.quaternion, 1 );
					if(0)
					this.orientation.freeSpin( this.eTorque.θ * delta, {x:this.eTorque.nx
							, y:this.eTorque.ny
							, z:this.eTorque.nz } ).exp( this.body.quaternion, 1 );
					if(1)
					this.orientation.freeSpin( tmpQ.θ * delta, {x:tmpQ.nx
						, y:tmpQ.ny
						, z:tmpQ.nz } ).exp( this.body.quaternion, 1 );
	
					if( isNaN( this.orientation.θ ) ) {
						console.log( "overflow orientation:", this.orientation, this.rotation, this.eTorque );
						this.orientation.θ = 0;
					}
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


Motion.freeMoveAccel = false;