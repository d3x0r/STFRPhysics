
import * as THREE from "../3d/src/three.js/three.module.js"

import * as rng from "../math/prng_short.mjs"
import {GeometryShader} from "./geometrymaterial-points-lt.js"


export class Skybox{
	stars = [];
	rng = rng.SFC32( "test" );
	body_data = new THREE.BufferGeometry();
	body_material = new GeometryShader( { color: 0xffffff, size: 0.5 } );
	//body_material = new THREE.PointsMaterial( { color: 0xffffff, size:0.5 } );
	body = new THREE.Points(this.body_data, this.body_material);
	constructor( scene ) {
		const vertices = new Float32Array( 3*10000 );
		this.body_data.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
//		this.body_data.attributes.position.needsUpdate = true;
	const counters = [0,0,0, 0];
		for( let s = 0; s < 10000; s++ ) {
			do{
				counters[3]++;
				const r = Math.cos( this.rng() * Math.PI/2 ) * 40000;
				const a = vertices[s*3+0] = this.rng() * r-r/2;
				const b = vertices[s*3+1] = this.rng() * r-r/2;
				const c = vertices[s*3+2] = this.rng() * r-r/2;
				// it's valid....
				if( (a*a+b*b+c*c) < 20000*20000 ) {
					// it's pretty close, and random chance 80% keep it
					if( (a*a+b*b+c*c) < 2000*2000 )  {
						// if it's really close, and random chance 90% to keep it
						if( (a*a+b*b+c*c) < 100*100 ) {
							if( (a*a+b*b+c*c) < 10*10 ) {
								if( this.rng() < 0.005 ) {
									counters[0]++;
									break;
								}
							}else {
								if( this.rng() < 0.05 ) {
									counters[0]++;
									break;
								}
							}
						} else {
							// medium to keep...
							if( this.rng() < 0.05 ) {
								counters[1]++;
								break;
							}
						}
						// distant keep
					}	else if( this.rng() < 0.004 ) {
						counters[2]++;
						break; // otherwise 10% distant....
					}
				}
			//break;
			} while ( true );
		}
console.log( "counters:", counters );
//		this.update( new THREE.Vector3( 1,0,0), 0.5 );
		scene.add( this.body );
        }

	update( bodyOffset, viewOffset,direction,speed ) {
		const u = this.body_material.uniforms;
		u.enableAberration.value = true;//chkAberration.checked;
		u.enableLorentz.value = false;//chkLorentz.checked;
		u.enableContract.value = false;//true;//chkContract.checked;
		//this.body_material.side = THREE.DoubleSide;
		//else
		//	Voxelarium.geometryShader.side = THREE.FrontSide;
		u.bodyOffset.value.x = bodyOffset.x;
		u.bodyOffset.value.y = bodyOffset.y;
		u.bodyOffset.value.z = bodyOffset.z;
		u.viewOffset.value.x = viewOffset.x;
		u.viewOffset.value.y = viewOffset.y;
		u.viewOffset.value.z = viewOffset.z;
		u.direction1. value.x = 1;
		u.direction1. value.y = 0;
		u.direction1. value.z = 0;
		u.direction2. value.x = -direction.x;
		u.direction2. value.y = -direction.y;
		u.direction2. value.z = -direction.z;
		
		u.speed1.value = 0;
		u.speed2.value = speed;
	
		u.time.value = 0;//sldTime.value/10;
		
		this.body_material.uniformsNeedUpdate = true;

		
	}
}