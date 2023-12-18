import * as THREE from "../3d/src/three.js/three.module.js"


const defaultParams = {
	defines:{
	},
	uniforms: {
	        enableAberration : { value : 0 },
        	enableLorentz : { value : 0 },
	        enableContract : { value : 0 },
		time : {value: 0 },
		opacity : {value: 1 },
		size : {value: 1 },
		scale : {value: 1.0 },
		diffuse : { value: new THREE.Color(1,1,1) },	
	        direction1 : { value: new THREE.Vector3(0,0,0) },
        	direction2 : { value: new THREE.Vector3(0,0,0) },
	        speed1 : { value: new THREE.Vector3(0,0,0) },
        	speed2 : { value: new THREE.Vector3(0,0,0) }		
	},
	//side: THREE.DoubleSide,
	transparent : false,
	depthTest:false,
	blending: THREE.NormalBlending,
	vertexShader: `

    varying vec4 ex_Color;
    varying float vDepth;
    #define EPSILON 1e-6
    varying float T;

    uniform float time;
    uniform vec3 direction1;
    uniform vec3 direction2;
    uniform float speed1;
    uniform float speed2;
    uniform int enableAberration;
    uniform int enableLorentz;
    uniform int enableContract;

    const float C=100.0;

    vec3 aberration( vec3 X, vec3 Vo, vec3 Xo ){

        if( enableAberration == 0 || Vo.x == 1.0 ) {
            return X+Xo;
        }
        vec3 Xr;// = vec3();
        float delx = X.x-Xo.x;
        float dely = X.y-Xo.y;
        float delz = X.z-Xo.z;
        float len2 = delx*delx+dely*dely+delz*delz;
        float Vlen2 = Vo.x*Vo.x+Vo.y*Vo.y+Vo.z*Vo.z;
        float Vdot = delx * Vo.x + dely * Vo.y + delz * Vo.z;
        vec3 Vcrs = vec3(  delz*Vo.y-dely*Vo.z, delx*Vo.z-delz*Vo.x, dely*Vo.x-delx*Vo.y );
        if( len2 < 0.0000001 || Vlen2 < 0.000001) {
            // not far enough away to change...
            Xr =  Xo+X;
        } else {
            float len = sqrt(len2);
            float Vlen = sqrt(Vlen2);
            float norm = Vlen*len;
             //const vAng = acos( Vo.x/Vlen ) * (Vo.y<0?1:-1);
             //console.log( "velocity angle:", vAng, "from", Vlen );
            float CosVDot = Vdot/(norm);
            float baseAng = acos( CosVDot );
            float delAng = acos( ( CosVDot + Vlen/C ) 
                    / ( 1.0 + Vlen/C * CosVDot ) )-baseAng;
    
            if( abs(delAng) < 0.00000001 ) {
                Xr=Xo+X;
                return Xr;
            }
            float c = cos(delAng);
            float s = sin(delAng);
            float n = sqrt( Vcrs.x*Vcrs.x+Vcrs.y*Vcrs.y+Vcrs.z*Vcrs.z);
            if( n < 0.000000001 )
            {
                Xr=Xo+X;
                return Xr;
            }
            float qx = Vcrs.x/n;
            float qy = Vcrs.y/n;
            float qz = Vcrs.z/n;
    
            float vx = delx , vy = dely , vz = delz;
    
            float dot =  (1.0-c)*((qx * vx ) + (qy*vy)+(qz*vz));
            Xr.x = Xo.x + vx*c + s*(qy * vz - qz * vy) + qx * dot;
            Xr.y = Xo.y + vy*c + s*(qz * vx - qx * vz) + qy * dot;
            Xr.z = Xo.z + vz*c + s*(qx * vy - qy * vx) + qz * dot;
            
        }
        return Xr;
    }

    vec3 hsv2rgb(vec3 c)
    {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
	gl_PointSize = 5.0;

      mat3 rotmat = mat3( modelViewMatrix );
      vec3 realVel = (rotmat * (direction1) );
      vec3 startPos = (modelViewMatrix * vec4( position + time*direction1*speed1, 1.0 )).xyz;

	
		float g1 = sqrt(C*C-speed1*speed1)/(C); // cc-vv/cc * c/sqrt(cc-vv) time-accurate [parabola]

		vec3 posDir = realVel * dot(startPos,realVel);

	if( enableContract > 0 && speed1 > 0.0)
        startPos = ( startPos - posDir) + posDir*g1;
        T=0.0;
        if( enableLorentz > 0 ) {
            // move position to real position, camera is then at (0,0,0)
            vec3 realVel2 = (rotmat *  (speed2*direction2) );
            vec3 delpos = startPos;
            vec3 tmp = delpos - realVel2*time;
            float A = time*time*C*C - dot(tmp,tmp);
            float B = time*C*C + dot( (realVel*speed1) , tmp );
            float D = C*C-speed1*speed1;
            if( abs(D) < 0.00000001 ) T = A/(2.0*B);
            else T = (sqrt( B*B - D*A ) + B)/D;
            //vec3 real_position = (modelViewMatrix*vec4(position+ T*realVel*speed1,1.0)).xyz ;
            vec3 real_position = startPos+ T*realVel*speed1;
            //vec3 real_position = startPos;
            //gl_Position = projectionMatrix * vec4( real_position, 1.0 );
            vec3 abb_pos = aberration( real_position, -realVel2, vec3(0) );
            gl_Position = projectionMatrix * vec4( abb_pos, 1.0 );
        } else if( enableAberration > 0 ) {
            mat3 rotmat = mat3( modelViewMatrix );
            vec3 realVel2 = (rotmat *  (speed2*direction2) );

            vec3 abb_pos = aberration( startPos, -realVel2, vec3(0) );
            gl_Position = projectionMatrix * vec4( abb_pos, 1.0 );
        } else {
            gl_Position = projectionMatrix * vec4(startPos,1.0)/0.2;
            //#include <project_vertex>
        }
        
        #include <logdepthbuf_vertex>

    	//#include <worldpos_vertex>
    	#include <clipping_planes_vertex>
    	#include <envmap_vertex>


    }
    `,
fragmentShader:`
    uniform vec3 diffuse;
    uniform float opacity;
    varying float T;
    #ifndef FLAT_SHADED

    	varying vec3 vNormal;

    #endif

    #include <common>
    #include <uv_pars_fragment>
    #include <color_pars_fragment>
    #include <map_pars_fragment>
    #include <alphamap_pars_fragment>
    #include <aomap_pars_fragment>
    #include <envmap_pars_fragment>
    #include <fog_pars_fragment>
    #include <specularmap_pars_fragment>
    #include <logdepthbuf_pars_fragment>
    #include <clipping_planes_pars_fragment>

    //uniform sampler2D tex;

    uniform float logDepthBufFC;
    varying float vFragDepth;
    uniform sampler2D  mymap;

    void main() {


	
//    	#include <clipping_planes_fragment>

    	vec4 diffuseColor = vec4( diffuse, opacity );

    	#include <logdepthbuf_fragment>
    	#include <map_fragment>
    	#include <color_fragment>
    	#include <alphamap_fragment>
    	#include <alphatest_fragment>
    	#include <specularmap_fragment>


    	ReflectedLight reflectedLight;
    	reflectedLight.directDiffuse = vec3( 0.0 );
    	reflectedLight.directSpecular = vec3( 0.0 );
    	reflectedLight.indirectDiffuse = diffuseColor.rgb;
    	reflectedLight.indirectSpecular = vec3( 0.0 );

    	#include <aomap_fragment>

    	vec3 outgoingLight = reflectedLight.indirectDiffuse;

    	#include <envmap_fragment>

    	gl_FragColor = diffuseColor;

    	#include <premultiplied_alpha_fragment>
    	#include <tonemapping_fragment>
    	#include <encodings_fragment>
    	#include <fog_fragment>

    }
    `
}


export class GeometryShader extends THREE.ShaderMaterial {
	constructor( parameters ) {
		super();
		
		this.isPointsMaterial = true;

		this.type = 'LT-Point-GeometryShader';

		this.color = new THREE.Color( 0xffffff );

		this.map = null;

		this.alphaMap = null;

		this.size = 1;
		this.sizeAttenuation = true;

		this.fog = true;
		const allParams = Object.assign( {}, defaultParams )
		Object.assign( allParams, parameters );
		;
		this.setValues( allParams );

	}

}
