import * as THREE from "../3d/src/three.js/three.module.js"


export function GeometryShader() {
    return new THREE.ShaderMaterial( {
	defines:{
//		USE_MAP:'',
		USE_UV:'',
	},
	uniforms: {
        edge_only : { type: "f", value : 0 },
        mymap : { type : "t", value : null },
        enableAberration : { value : 0 },
        enableLorentz : { value : 0 },
        enableContract : { value : 0 },
	time : {value: 0 },

        direction1 : { value: new THREE.Vector3(0,0,0) },
        direction2 : { value: new THREE.Vector3(0,0,0) },
        speed1 : { value: new THREE.Vector3(0,0,0) },
        speed2 : { value: new THREE.Vector3(0,0,0) }		
	},
	//side: THREE.DoubleSide,
    transparent : true,
	depthTest:false,
     blending: THREE.NormalBlending,
	vertexShader: `

    #include <common>
    #include <uv_pars_vertex>
    #include <envmap_pars_vertex>
    #include <color_pars_vertex>
    #include <morphtarget_pars_vertex>
    #include <skinning_pars_vertex>
    #include <logdepthbuf_pars_vertex>
    #include <clipping_planes_pars_vertex>

    attribute  vec4 in_Color;
    attribute  vec4 in_FaceColor;
    attribute  float in_Pow;

    attribute  float in_use_texture;
    attribute  float in_flat_color;
    attribute  float in_decal_texture;

    attribute  vec2 in_Modulous;
    varying vec4 ex_Color;
    varying vec2 ex_texCoord;
    varying float ex_Dot;
    varying  float ex_Pow;
    varying  float ex_Pow2;
    varying float vDepth;
    varying float ex_use_texture;
    varying float ex_flat_color;
    varying float ex_decal_texture;
    varying vec4 ex_FaceColor;
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
    const float C=1.0;

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

    varying  vec2 ex_Modulous;

    varying vec4 fe_normal, light_dir, eye_vec, lookat;

    void main() {

    	#include <uv_vertex>
    	#include <color_vertex>
    	#include <skinbase_vertex>

    	#ifdef USE_ENVMAP

    	#include <beginnormal_vertex>
    	#include <morphnormal_vertex>
    	#include <skinnormal_vertex>
    	#include <defaultnormal_vertex>

    	#endif

    	#include <begin_vertex>
    	#include <morphtarget_vertex>
    	#include <skinning_vertex>
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
            gl_Position = projectionMatrix * vec4(startPos,1.0);
            //#include <project_vertex>
        }
        
        #include <logdepthbuf_vertex>

    	#include <worldpos_vertex>
    	#include <clipping_planes_vertex>
    	#include <envmap_vertex>


{
        ex_texCoord = uv;
        ex_Color.rgb = hsv2rgb(vec3(mod(-T,3.0)/3.0+0.3,1.0,1.0));
			ex_Color.a = 1.0;
        //in_Color;
        ex_FaceColor = in_FaceColor;
        ex_FaceColor.rgb = hsv2rgb(vec3(mod(-T,3.0)/3.0+0.3,1.0,0.8));
			ex_FaceColor.a = 0.4;

        //normal = normalMatrix * normal;

        //dottmp = dot( normal, vec3( 0.0, 1.0, 0.0 ) );
        //dottmpright = dot( normal, vec3( 1.0, 0.0, 0.0 ) );

        ex_Pow = in_Pow;// * (/*sqrt/(1.0-dottmpright*dottmpright));
        ex_Pow2 = in_Pow;// * (/*sqrt/(1.0-dottmp*dottmp));

        ex_use_texture = in_use_texture;
        ex_flat_color = in_flat_color;
        ex_Modulous = in_Modulous;
}

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

    varying vec2 ex_texCoord;
    varying vec4 ex_Color;

    varying float ex_Pow;
    varying float ex_Pow2;
    varying float ex_use_texture;
    varying float ex_flat_color;
    varying vec2 ex_Modulous;
    varying vec4 ex_FaceColor;
    //uniform sampler2D tex;
    uniform float edge_only;

    uniform float logDepthBufFC;
    varying float vFragDepth;
    uniform sampler2D  mymap;

    void main() {

    	#include <clipping_planes_fragment>

    	vec4 diffuseColor = vec4( diffuse, opacity );

    	#include <logdepthbuf_fragment>
    	#include <map_fragment>
    	#include <color_fragment>
    	#include <alphamap_fragment>
    	#include <alphatest_fragment>
    	#include <specularmap_fragment>

        {
                if( ex_use_texture > 0.5 )
                {
                    if( edge_only > 0.5 )
                        diffuseColor = vec4(1.0);
                    else
                        diffuseColor = vec4(  texture2D( mymap, ex_texCoord ).rgb, 1.0 );
                }
                else if( ex_flat_color > 0.5 )
                {
                    diffuseColor =vec4(1,0,1,1);// ex_Color;
                }
                else
                {
                    float a = mod(ex_Modulous.x +0.5, 1.0 )-0.5;
                    float b = mod(ex_Modulous.y +0.5, 1.0 )-0.5;

                    float g;
                    float h;
                    vec3 white;
                    a = 4.0*(0.25-a*a);
                    b = 4.0*(0.25-b*b);
                    a = pow( abs(a), ex_Pow );
                    b = pow( abs(b), ex_Pow2 );

                    g = min(1.0,b+a);
                    h = max((b+a)-1.0,0.0)/3.0;
                    white = vec3(1.0,1.0,1.0) * max(ex_Color.r,max(ex_Color.g,ex_Color.b));
                    if( edge_only > 0.5 )
                         diffuseColor = vec4( h* ( white - ex_FaceColor.rgb )+ (g* ex_Color.rgb), (g * ex_Color.a) ) ;
                    else
                         diffuseColor = vec4( ex_FaceColor.a*(1.0-g)*ex_FaceColor.rgb + h* ( white - ex_FaceColor.rgb ) + (g* ex_Color.rgb), (1.0-g)*ex_FaceColor.a + (g * ex_Color.a) ) ;
                }
        }


    	ReflectedLight reflectedLight;
    	reflectedLight.directDiffuse = vec3( 0.0 );
    	reflectedLight.directSpecular = vec3( 0.0 );
    	reflectedLight.indirectDiffuse = diffuseColor.rgb;
    	reflectedLight.indirectSpecular = vec3( 0.0 );

    	#include <aomap_fragment>

    	vec3 outgoingLight = reflectedLight.indirectDiffuse;

    	#include <envmap_fragment>

    	gl_FragColor = diffuseColor;//vec4( outgoingLight, diffuseColor.a );

    	#include <premultiplied_alpha_fragment>
    	#include <tonemapping_fragment>
    	#include <fog_fragment>

    }
    `
} );

/*
#if !MORE_ROUNDED
              g = sqrt((a*a+b*b)/2);
              h = pow(g,200.0) * 0.5;  // up to 600 even works...
              g = pow( ( max(a,b)),400);
              h = (g+h);
              gl_FragColor = vec4( h * in_Color.rgb, in_Color.a ) ;
#else
*/

}
