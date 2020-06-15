import  "./three.js/three.min.js"

THREE.DualGridGeometryMaterial = DualGeometryMaterial;
function DualGeometryMaterial() {
    return new THREE.ShaderMaterial( {
    defines : {
        PHONG:true,
	CALCULATE_COSINE_MERGE:1,
	
    },
	uniforms: THREE.UniformsUtils.merge( [

        THREE.UniformsLib[ "ambient" ],
        THREE.UniformsLib[ "lights" ],
        {
	        textureMap3 : { type:"t", value:null },
	        elementMap3 : { type:"t", value:null },
           	elementX : { type: "f", value : 0 },
			elementY : { type: "f", value : 0 },
            elementZ : { type: "f", value : 0 },
            edge_only : { type: "f", value : 0 },
            //map : { type : "t", value : null },
            specular_ : {value : [0.6,0.6,0.6]},
            emissive : {value: new THREE.Color(0,0,0 )},
            diffuse : {value: new THREE.Color(0x909090 )},
            shininess : {value: 15},
            ambientLightColor : {value:new THREE.Color(0x404040)},
	    cursorIconTex      : { type:"t", value:null },
	    cursorRayNormal    : { value : new THREE.Vector3( 0, 0, 0 ) },
            cursorRayOrigin    : { value : new THREE.Vector3( 0, 0, 0 ) },
            cursorIconNormal   : { value : new THREE.Vector3( 0, 0, 0 ) },
            cursorIconUp       : { value : new THREE.Vector3( 0, 0, 0 ) },
            textureStackSize : { value : 6.0 } // this should be like Textures.count.
        }
    ] ),
    // lights:true,  (soon!)
    transparent : true,
    lights: true,
     blending: THREE.NormalBlending,
	vertexShader: `

    // expected 'position' as an attribute.
// expected 'normal' as an attribute.

    #include <common>
    #include <uv_pars_vertex>
    #include <uv2_pars_vertex>
    #include <displacementmap_pars_vertex>
    #include <envmap_pars_vertex>
    #include <color_pars_vertex>
    #include <morphtarget_pars_vertex>
    #include <skinning_pars_vertex>
    #include <shadowmap_pars_vertex>
    #include <logdepthbuf_pars_vertex>
    #include <clipping_planes_pars_vertex>

    flat out float aspect;// = projectionMatrix [1][1] / projectionMatrix [0][0];

    attribute  vec4 in_Color;
    attribute  vec4 in_FaceColor;
    attribute  float in_Pow;

    attribute  float in_use_texture;
    attribute  float in_flat_color;
    attribute  float in_decal_texture;

	attribute vec3 simplex;

	out vec3 v_simplex;
	
    uniform vec3 pointCursor_1; // this will probably be an array someday.

    attribute  vec3 in_Modulous;

    varying vec3 vNormal;
    varying vec3 vViewPosition;

    varying vec4 ex_Color;
    varying vec2 ex_texCoord;
    varying float ex_Dot;
    varying  float ex_Pow;
    varying float vDepth;
    varying float ex_use_texture;
    varying float ex_flat_color;
    varying float ex_decal_texture;
    varying vec4 ex_FaceColor;


    varying vec3 zzNormal;
    varying vec3 zrNormal;
    varying vec3 zzPos;
    varying vec4 zPosition;
#if !CALCULATE_COSINE_MERGE
	varying vec3 curDeltas;
#endif
    #define EPSILON 1e-6

    varying  vec3 ex_Modulous;

    void main() {
        aspect = projectionMatrix [1][1] / projectionMatrix [0][0];

    	#include <uv_vertex>
    	#include <uv2_vertex>
    	#include <color_vertex>


    	#include <beginnormal_vertex>
    	#include <morphnormal_vertex>
    	#include <skinbase_vertex>
        #include <skinnormal_vertex>

        // this sets transformedNormal, transformdTrangent// uses a normal matrix
    	#include <defaultnormal_vertex>
//transformedNormal.z = -transformedNormal.z;
        vNormal = normalize( transformedNormal );

        // sets transformed from 'position'
    	#include <begin_vertex>
    	#include <morphtarget_vertex>
        #include <skinning_vertex>
        #include <displacementmap_vertex>
        #include <project_vertex>
    	#include <logdepthbuf_vertex>
    	#include <clipping_planes_vertex>

        vViewPosition = -mvPosition.xyz;

    	#include <worldpos_vertex>
    	#include <envmap_vertex>

        {
                ex_texCoord = uv;
                ex_Color = in_Color;
                ex_FaceColor = in_FaceColor;

                ex_Pow = in_Pow;

                ex_use_texture = in_use_texture;
                ex_flat_color = in_flat_color;
                ex_Modulous = in_Modulous;
        }
	v_simplex = simplex;
	zzPos = position;
	zPosition = gl_Position;
        zzNormal = normalize( abs(normal) );
    }
    `,
fragmentShader:`
    uniform vec3 diffuse;
    uniform vec3 emissive;
    uniform vec3 specular_;
    uniform float shininess;
    uniform float opacity;
    vec3 specular;
    varying vec3 zzNormal;
    varying vec3 zzPos;
    varying vec4 zPosition;

	uniform sampler2D cursorIconTex;
	uniform vec3 cursorRayNormal;
	uniform vec3 cursorRayOrigin;
	uniform vec3 cursorIconNormal;
	uniform vec3 cursorIconUp;
	uniform float textureStackSize;
	uniform float elementX;
	uniform float elementY;
	uniform float elementZ;
//#define NUM_DIR_LIGHTS 3
    #ifndef FLAT_SHADED

        // supplied by bsdfs/phong_lighting
    	//varying vec3 vNormal;

    #endif

    #include <common>
    #include <packing>
    #include <color_pars_fragment>
    #include <uv_pars_fragment>
    #include <uv2_pars_fragment>
    #include <map_pars_fragment>
    #include <alphamap_pars_fragment>
    #include <aomap_pars_fragment>
    #include <envmap_pars_fragment>
    #include <fog_pars_fragment>
    #include <specularmap_pars_fragment>
    #include <logdepthbuf_pars_fragment>
    #include <clipping_planes_pars_fragment>
    
    #include <bsdfs>
    #include <lights_pars_begin>
    #include <lights_phong_pars_fragment>

    uniform highp sampler3D textureMap3;
    uniform highp sampler2D elementMap3;

    varying vec2 ex_texCoord;
    varying vec4 ex_Color;

    varying float ex_Pow;
    varying float ex_use_texture;
    varying float ex_flat_color;
    varying vec3 ex_Modulous;
    varying vec4 ex_FaceColor;
    //uniform sampler2D tex;
    uniform float edge_only;
#if !CALCULATE_COSINE_MERGE
	varying vec3 curDeltas;
#endif
    
    uniform float logDepthBufFC;
    varying float vFragDepth;
	flat in float aspect;
	varying vec3 v_simplex;


void IntersectLineWithPlane( vec3 Slope, vec3 Origin,  // line m, b
					 vec3 n, vec3 o,  // plane n, o
					inout vec2 r ) {
		float a,b,c,cosPhi, t; // time of intersection
		a = ( Slope.x * n.x + Slope.y * n.y + Slope.z * n.z );
		r.x = 0.0; r.y = 0.0;
	        
		if( a == 0.0 ) return;
	        
		b = length( Slope );
		c = length( n );
		if( b == 0.0 || c == 0.0 ) return; // bad vector choice - if near zero length...
	        
		cosPhi = a / ( b * c );
		t = ( n.x * ( o.x - Origin.x ) + n.y * ( o.y - Origin.y ) + n.z * ( o.z - Origin.z ) ) / a;
	        
		if( cosPhi > 0.0 || cosPhi < 0.0 ) { // at least some degree of insident angle
			r.x = cosPhi; r.y = t;
		} else
			return;
	}


    void main() {
        vec2 vUv;

        #include <clipping_planes_fragment>

    	vec4 diffuseColor = vec4( diffuse, opacity );
	specular = specular_;

	vec3 modulo = zzPos.xyz/1.0;// + 1.3;


	vec3 curElementPos = floor( zzPos.xyz +0.5 );
	curElementPos.x += 1.0;
	//curElementPos.z -= 1.0;

	vec3 curElementDirs = vec3(1.0);

	vec3 curDeltas;
	curDeltas = 2.0*(mod( zzPos.xyz, 1.0 )- 0.5);

	//curDeltas = (0.5 - abs(mod( ex_Modulous, 1.0 )- 0.5));  // delta is here * D + (next*(1-D))

	// show the raw input delta - this will be -1.0> to <1.0. with 0 being the centroid of the element

	//gl_FragColor =vec4( (curDeltas+1.0)/2.0, 1.0 );
	//return;

#if  CALCULATE_COSINE_MERGE


	// floor to one of the types.
	//curDeltas = vec3(0.0,0.0,0.0);

	// so this is the same result...

	// this comment is specifically wrong to the current input; but essentially right.
	// 0 becomes 1.0 as an output.. -1 cos is biased to 0 for a range of 0->1 from -1->1
	curDeltas = cos( (1.0-curDeltas) * 0.5*3.14159 );
	//curDeltas = normalize( curDeltas * curDeltas );

	// use sigmoid curve
	//	curDeltas = 1.0 - (exp( curDeltas ) / ( exp( curDeltas) + 1.0 ) );

#endif

	if( curDeltas.x < 0.0 ){
		curDeltas.x = -curDeltas.x;
		curElementDirs.x = -1.0;
	}
	if( curDeltas.y < 0.0 ){
		curDeltas.y = -curDeltas.y;
		curElementDirs.y = -1.0;
	}
	if( curDeltas.z < 0.0 ){
		curDeltas.z = - curDeltas.z;
		curElementDirs.z = -1.0;
	}
	curElementDirs = -curElementDirs;

	// change 0-1.0 (absolute value) to 0.5 to 1.0.. 
	// this is now the proper scalar of 'here' to 'there' 
	// until 'here' changes at 0.5 and the new 'there' is the old 'here'.
	curDeltas = curDeltas/2.0 + 0.5;


	// this is for X = -0.5 to X +0.5  to 1.0 at the axis 'here'.
	// 
	//gl_FragColor = vec4( curDeltas,1.0) ;
	//return;
	
	// scale (-1/1) +2/3 makes this 33% and 66% output.  
	//gl_FragColor = vec4( (curElementDirs.x+2.0)/3.0,(curElementDirs.y+2.0)/3.0,(curElementDirs.z+2.0)/3.0,1.0) ;
	//return;

	// this is the actual lookup index.
	//gl_FragColor = vec4( curElementPos/elementX,1.0) ;
	//return;

        {
			vec4 face = ex_FaceColor;
			vec4 edge = ex_Color;
			vec4 white;
            if( 1.0 > 0.0 || ex_use_texture > 0.5 )
                {
			float fadeFrom;
			float fadeTo;
			float fadeBy;

		edge.a = 1.0;

			float index;

#define TEXTURE_SCALAR 1.0
#define NUMBER_OF_TEXTURE_TYPES textureStackSize
#define _3D_TEXTURE_LAYER_CONVERSION ( -(1.0/NUMBER_OF_TEXTURE_TYPES) / 2.0 ) 

			// if type 1 isn't void; use type 1.
			float sX = 1.0/(elementX*elementZ);
			float sY = 1.0/(elementY*elementZ);
			float eX = (mod(curElementPos.z,  elementZ) * elementX + curElementPos.x)*sX;
			float eY = (floor(curElementPos.z / elementZ) * elementY + curElementPos.y)*sY;
			//float eX = (1.0 * elementX + curElementPos.x)*sX;
			//float eY = (2.0 * elementY + curElementPos.y)*sY;

			vec4 v_type1 = texture2D( elementMap3, vec2( eX, 1.0-eY ) );
			//gl_FragColor = vec4( v_type1.r*256.0, eX, eY, 1.0);
			//gl_FragColor = vec4( mod(eX*elementZ,1.0), mod(eY*elementZ,1.0), curElementPos.z/(elementZ*elementZ), 1.0 );
			//gl_FragColor = vec4( v_type1.xyz*32.0, 1.0);
			//return;

			vec4 v_type2 = texture2D( elementMap3, vec2( eX + (curElementDirs.x * sX), 1.0-eY ) );
			if(!( v_type1.r > 0.0 || v_type2.r > 0.0 ) ){
				v_type2 = texture2D( elementMap3, vec2( eX - (curElementDirs.x * sX), 1.0-eY ) );
				curDeltas.x = 1.5 - curDeltas.x;
			}

			vec4 v_type3 = texture2D( elementMap3, vec2( eX, 1.0-(eY + (curElementDirs.y * sY)) ) );
			if( !( v_type1.r > 0.0 || v_type3.r > 0.0 ) ){
				v_type3 = texture2D( elementMap3, vec2( eX, 1.0-(eY - (curElementDirs.y * sY)) ) );
				curDeltas.y = 1.5 - curDeltas.y;
			}

			float eXz = ( mod((curElementPos.z+curElementDirs.z), elementZ) * elementX + curElementPos.x ) / (elementX*elementZ);
			float eYz = ( floor((curElementPos.z+curElementDirs.z) / elementZ) * elementY + curElementPos.y ) / (elementY*elementZ);
			vec4 v_type4 = texture2D( elementMap3, vec2( eXz, 1.0 - eYz ) );
			if( !( v_type1.r > 0.0 || v_type4.r > 0.0 ) ){
				 eXz = ( mod((curElementPos.z-curElementDirs.z), elementZ) * elementX + curElementPos.x ) / (elementX*elementZ);
				 eYz = ( floor((curElementPos.z-curElementDirs.z) / elementZ) * elementY + curElementPos.y ) / (elementY*elementZ);
				v_type4 = texture2D( elementMap3, vec2( eX, 1.0-(eYz) ) );
				curDeltas.z = 1.5 - curDeltas.z;
			}

			float type1;

			if( v_type1.r > 0.0 ) 
				 type1 = v_type1.r*255.0/NUMBER_OF_TEXTURE_TYPES + _3D_TEXTURE_LAYER_CONVERSION;
			else type1 = -1.0;

			float type2;
			if( v_type2.x > 0.0 ) 
				type2 = v_type2.r*255.0/NUMBER_OF_TEXTURE_TYPES + _3D_TEXTURE_LAYER_CONVERSION;
			else type2 = -1.0;
			float type3;

			if( v_type3.x > 0.0 ) 
				type3 = v_type3.r*255.0/NUMBER_OF_TEXTURE_TYPES + _3D_TEXTURE_LAYER_CONVERSION;
			else
				type3 = -1.0;

			float type4;

			if( v_type4.r > 0.0 )
				type4 = v_type4.r*255.0/NUMBER_OF_TEXTURE_TYPES + _3D_TEXTURE_LAYER_CONVERSION;
			else
				type4 = -1.0;

			//gl_FragColor = vec4( (curDeltas-0.5)*2.0, 1.0);
			//return;
			//gl_FragColor = vec4( mod(eX*elementZ,1.0), mod(eY*elementZ,1.0), curElementPos.z/(elementZ*elementZ), 1.0 );
			//return;
			//gl_FragColor = vec4( mod(eX+(curElementDirs.x/(elementX*elementZ))*elementZ,1.0)*curDeltas.x, mod(eX*elementZ,1.0)*(1.0-curDeltas.x), 0.0, 1.0 );

			// this never has really shown right...
			//gl_FragColor = vec4( type1 + type4, type2+ type4, type3+ type4, 1.0);

			//return;

			/*
			if(curElementDirs.x < 0.0  )
				gl_FragColor = vec4( mod(  (eX+ (curElementDirs.x/(elementX*elementZ))) * elementZ ,1.0), mod(eY*elementZ,1.0), 0.5+(curElementDirs.x/(elementX)),1.0 );
			else
				gl_FragColor = vec4( mod(  (eX+ (curElementDirs.x/(elementX*elementZ))) * elementZ ,1.0), mod(eY*elementZ,1.0), 0.5+(curElementDirs.x/(elementX)),1.0 );
			*/
			//return;

			if( type1 > 0.0 ) 
				index = type1;
			else // type 2 will not be void if 1 is void; use this.
				index = type2;

			vec4 cxyz1, cxyz2, cxyz3; // texels at this point that are scaled by simplex
			const vec3 vec_2 = vec3(2.0,2.0,2.0); // to square things
			if( index > 0.0 )
			{

				// okay so let's figure this out; the normal is a unit vector, but the sum of each thing is not itself 1.
				// but rather the sum of the squares.
#define MAGIC_FUNCTION vec4( pow(cxy1.rgb * zzNormal.z,vec_2) + pow(cyz1.rgb * zzNormal.x,vec_2) + pow(cxz1.rgb * zzNormal.y,vec_2), \
				1.0-sqrt(pow( ( 1.0-cxy1.a )* zzNormal.z,2.0) + pow((1.0-cyz1.a) * zzNormal.x,2.0) + pow((1.0-cxz1.a) * zzNormal.y,2.0) ) )


				// compute spacial coordinate index (should add more layers here to auto rotate uv lookups based on fractional values of curDeltas.
				vec4 cxy1 = texture( textureMap3, vec3(modulo.xy * TEXTURE_SCALAR,index) );
				vec4 cyz1 = texture( textureMap3, vec3(modulo.yz * TEXTURE_SCALAR,index) );
				vec4 cxz1 = texture( textureMap3, vec3(modulo.xz * TEXTURE_SCALAR,index) );

				cxyz1 = MAGIC_FUNCTION;

				if( type2 > 0.0 && type1 > 0.0 ) {
					// if both are not void, then compute the other point, and the delta to the other texture
					index = type2;
					// this calculates the position in a 3-plane repetition space; scaled by the normal.
					cxy1 = texture( textureMap3, vec3(modulo.xy * TEXTURE_SCALAR,index) );
					cyz1 = texture( textureMap3, vec3(modulo.yz * TEXTURE_SCALAR,index) );
					cxz1 = texture( textureMap3, vec3(modulo.xz * TEXTURE_SCALAR,index) );
					vec4 cxyz2 = MAGIC_FUNCTION;
					// this is against a constant; current is the same everywhere.
					cxyz1 = cxyz1 * curDeltas.x + cxyz2 * (1.0-curDeltas.x);
					gl_FragColor = cxyz1;
					gl_FragColor = vec4( (curDeltas.x), 0.0,0.0, 1.0);
					//return;
				}
				cxyz1.rgb *= curDeltas.x;
			} // else( got a index at all )
			else {
				cxyz1.r = -1.0;
			}
		
			if( type1 > 0.0 ) 
				index = type1;
			else // type 2 will not be void if 1 is void; use this.
				index = type3;

			if( index > 0.0 ) {
				vec4 cxy1 = texture( textureMap3, vec3(modulo.xy * TEXTURE_SCALAR,index) );
				vec4 cyz1 = texture( textureMap3, vec3(modulo.yz * TEXTURE_SCALAR,index) );
				vec4 cxz1 = texture( textureMap3, vec3(modulo.xz * TEXTURE_SCALAR,index) );
				cxyz2 = MAGIC_FUNCTION;

				if( type3 >0.0 && type1 >0.0 ) {
					index = type3;
					cxy1 = texture( textureMap3, vec3(modulo.xy * TEXTURE_SCALAR,index) );
					cyz1 = texture( textureMap3, vec3(modulo.yz * TEXTURE_SCALAR,index) );
					cxz1 = texture( textureMap3, vec3(modulo.xz * TEXTURE_SCALAR,index) );
					vec4 cxyz4 = MAGIC_FUNCTION;
					cxyz2 = cxyz2 * curDeltas.y + cxyz4 * (1.0-curDeltas.y);
					//gl_FragColor = cxyz2;
					//gl_FragColor = vec4( 0.0, (curDeltas.x), 0.0, 1.0);
					//return;
				}
				cxyz2.rgb *= curDeltas.y;
			} // else had a index at all.
			else {
				cxyz2.r = -1.0;
			}

			if( type1 > 0.0 ) 
				index = type1;
			else // type 2 will not be void if 1 is void; use this.
				index = type4;
			if( index > 0.0 ) {
				vec4 cxy1 = texture( textureMap3, vec3(modulo.xy * TEXTURE_SCALAR,index) );
				vec4 cyz1 = texture( textureMap3, vec3(modulo.yz * TEXTURE_SCALAR,index) );
				vec4 cxz1 = texture( textureMap3, vec3(modulo.xz * TEXTURE_SCALAR,index) );
				cxyz3 = MAGIC_FUNCTION;

				if( type4 > 0.0 && type1 > 0.0 ) {
					index = type4;
					cxy1 = texture( textureMap3, vec3(modulo.xy * TEXTURE_SCALAR,index) );
					cyz1 = texture( textureMap3, vec3(modulo.yz * TEXTURE_SCALAR,index) );
					cxz1 = texture( textureMap3, vec3(modulo.xz * TEXTURE_SCALAR,index) );
					vec4 cxyz6 = MAGIC_FUNCTION;
					cxyz3 = cxyz3 * curDeltas.z + cxyz6 * (1.0-curDeltas.z);
					gl_FragColor = cxyz3;
					gl_FragColor = vec4( 0.0,0.0,(curDeltas.z),  1.0);
					//return;
				}
				cxyz3.rgb *= curDeltas.z;
				//if( cxyz1.r < 0.0 ){
				//	cxyz1 = cxyz3;
				//	cxyz2 = cxyz3;
				//}
		
			}else {
				cxyz3.r = -1.0;
			}

			// compute the final composite color into cxzy2 using the barycentric simplex scalar. (always adds to 1)
			if( cxyz1.r >= 0.0 ) {
				if( cxyz2.r >= 0.0 ){
					if( cxyz3.r >= 0.0 ) {
						face = ( cxyz1 * 0.33 + cxyz2 * 0.33 + cxyz3 * 0.33 ) ;
					}else {
						face = ( cxyz1 * 0.5 + cxyz2 * 0.5 ) ;
					}
				} else {
					if( cxyz3.r >= 0.0 ) {
						face = cxyz1*0.5+cxyz3*0.5;
					}
					else
						face = cxyz1;
				}
			} else if( cxyz2.r >= 0.0 ){
				if( cxyz3.r >= 0.0 ){
					face = cxyz1*0.5+cxyz3*0.5;;
				}else
					face = cxyz2;
			} else {
				face = cxyz3;
			}
			gl_FragColor = face;
			return;

			
                }
                //else if( ex_flat_color > 0.5 )
                //{
                //    diffuseColor =vec4(1,0,1,1);// edge;
                //}
                //else
                {
			vec3 gridmod = mod( zzPos*3.0, 1.0 ) - 0.5;

                    float g;
                    float h;
			gridmod = 4.0 * ( 0.25 - gridmod*gridmod);

                    float depthScalar;

			// depthScalar causes the grid lines to be 'thicker' in the distance...
                    depthScalar = 1.0/(zPosition.z+50.0)*50.0;
                    depthScalar = depthScalar*depthScalar*depthScalar*depthScalar;
			gridmod.x = pow( abs( gridmod.x ), ((7.0*depthScalar))*ex_Pow );
			gridmod.y = pow( abs( gridmod.y ), ((7.0*depthScalar))*ex_Pow );
			gridmod.z = pow( abs( gridmod.z ), ((7.0*depthScalar))*ex_Pow );
			//gridmod = sqrt(1.0-zzNormal*zzNormal) *gridmod ;

			if( zzNormal.x > zzNormal.y ) {
				if( zzNormal.x > zzNormal.z ) {
					if( gridmod.x < 0.3 &&  ((gridmod.y + gridmod.z) < 0.3) ) {
					    g = 0.0;
					} else {
                                            if( zzNormal.x > 0.90 )
			                       g = min(1.0,gridmod.y+gridmod.z);
                                            else
			                       g = min(1.0,gridmod.x+gridmod.y+gridmod.z);
					}
				}else {
					if( gridmod.z < 0.7 && gridmod.x + gridmod.y < 0.05 ) {
						g = 0.0;
					} else {
                                            if( zzNormal.z > 0.90 )
				                    g = min(1.0,gridmod.x+gridmod.y);
						else
			                       		g = min(1.0,gridmod.x+gridmod.y+gridmod.z);
					}
				}
			} else {
				if( zzNormal.y > zzNormal.z ) {
					if( gridmod.y < 0.7 && gridmod.x + gridmod.z  < 0.05  ) {
						g = 0.0;
					} else {
                                            if( zzNormal.y > 0.90 )
			                    g = min(1.0,gridmod.x+gridmod.z);
						else
			                       		g = min(1.0,gridmod.x+gridmod.y+gridmod.z);
					}
				}else {
					if( gridmod.z < 0.7 && gridmod.x + gridmod.y  < 0.05  ) {
						g = 0.0;
					} else {
                        if( zzNormal.z > 0.90 )
	                    	g = min(1.0,gridmod.x+gridmod.y);
						else
                       		g = min(1.0,gridmod.x+gridmod.y+gridmod.z);
					}
				}
			}
			//gridmod.x = sqrt(1.0-zzNormal.x*zzNormal.x) * pow( abs( gridmod.x ), ((7.0*depthScalar))*ex_Pow );
			//gridmod.y = sqrt(1.0-zzNormal.y*zzNormal.y) * pow( abs( gridmod.y ), ((7.0*depthScalar))*ex_Pow );
			//gridmod.z = sqrt(1.0-zzNormal.z*zzNormal.z) * pow( abs( gridmod.z ), ((7.0*depthScalar))*ex_Pow );
			float tmp;
			tmp = 4.0;
			if( tmp == 0.0 ) 
				edge.rgb = vec3( 0.0, 0.7, 0.7 );
			else if( tmp == 1.0 ) 
				edge.rgb = vec3( 0.0, 0.5, 0.0 );
			else if( tmp == 2.0 ) 
				edge.rgb = vec3( 0.0, 0.0, 5.0 );
			else if( tmp == 3.0 ) 
				edge.rgb = vec3( 0.5, 0.2, 0.5 );
			else if( tmp == 4.0 ) 
				edge.rgb = vec3( 0.5, 0.5, 0.0 );
			else if( tmp == 5.0 ) 
				edge.rgb = vec3( 0.0, 0.5, 5.0 );
			else if( tmp == 6.0 ) 
				edge.rgb = vec3( 0.5, 0.5, 0.5 );


 //                   g = min(1.0,gridmod.x+gridmod.y+gridmod.z);
                    h = max((gridmod.x+gridmod.y+gridmod.z)-1.0,0.0)/12.0;
                    white = vec4( vec3(1.0,1.0,1.0) * max(edge.r,max(edge.g,edge.b)), 1.0 );

			
	specular = face.rgb;
	diffuseColor = vec4(vec3(0.0),face.a);
	//diffuseColor = face;
	//gl_FragColor = vec4(g,h,0.0,1.0);
	//return;

    	#include <logdepthbuf_fragment>
    	#include <map_fragment>
    	#include <color_fragment>
    	#include <alphamap_fragment>
    	#include <alphatest_fragment>
    	#include <specularmap_fragment>
        #include <normal_fragment_begin>
        #include <normal_fragment_maps>
        #include <emissivemap_fragment>

      	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
        vec3 totalEmissiveRadiance = emissive;

  	
        // accumulation
        #include <lights_phong_fragment>
        #include <lights_fragment_begin>
        #include <lights_fragment_maps>
        #include <lights_fragment_end>
    
    	#include <aomap_fragment>

        vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
        
    	#include <envmap_fragment>

        gl_FragColor = vec4( outgoingLight, diffuseColor.a );

    	#include <tonemapping_fragment>
    	#include <encodings_fragment>
    	#include <fog_fragment>
    	#include <premultiplied_alpha_fragment>
    	#include <dithering_fragment>

		// update to include grid computation (no shine on virtual lines)
		if( 1.0 > 0.0 )

                    if( edge_only > 0.5 )
                         gl_FragColor += vec4( h* ( white.rgb - gl_FragColor.rgb )+ (g* edge.rgb), (g * edge.a) ) ;
                    else
                         gl_FragColor = vec4( gl_FragColor.a*(1.0-g)*gl_FragColor.rgb + h * ( white.rgb - gl_FragColor.rgb ) + (g* edge.rgb)
					, (1.0-g)*gl_FragColor.a + (g * edge.a) ) ;

					//return;
//                         gl_FragColor = vec4( gl_FragColor.a*(1.0-g)*gl_FragColor.rgb 
						// this is the extra highlight in corners...
						// + h* ( white.rgb - gl_FragColor.rgb ) 
//						+ (g* edge.rgb), (1.0-g)*gl_FragColor.a + (g * edge.a) ) ;

                }
            }

	//gl_FragColor.rgb += v_simplex/4.0;
	{
		// this can work in projected space. against 0 origin for camera.
				vec2 mouseAngle;
		IntersectLineWithPlane( cursorRayNormal, vec3(0.0), vNormal.xyz, zPosition.xyz, mouseAngle );

		// where the mouse intersects the plane of this pixel local position and local normal determine the plane.
		vec3 mouse_on_this = cursorRayNormal * mouseAngle.y + vec3(0.0);

		//if( distance( mouse_on_this, zPosition.xyz ) < 1.0 ) gl_FragColor.rgb = vec3(1.0,1.0,1.0);
		// detected intersection on plane.

		//vec2 planeUVAngle;
		//IntersectLineWithPlane( zzNormal.xyz, zPosition.xyz, cursorRayNormal, vec3(0.0,0.0,0.0), planeUVAngle );
		
		vec3 linePoint                = -( mouse_on_this - zPosition.xyz  );
		linePoint.y = linePoint.y / aspect;
		// since the space is already aligned to x,y,z normal; just use the resulting x,y.
		// cursorRayNormal 
		vec3 cursorIconRightProjector = normalize(cross( cursorIconUp, vec3(0.0,0.0,1.0) ));
		// cursorIconRightProjector, cursorRayNormal 
		vec3 cursorIconUpProjector = normalize(cross( cursorIconRightProjector, vec3(0.0,0.0,1.0) ));
		// project point on plane relative to 'here' scale from -1 to 1(around center) to 0 to 1 (uv)
		// //
		//float upProjection            = dot( cursorIconUpProjector, linePoint ) /2.0 + 0.5;
		float upProjection            = linePoint.x / 2.0 + 0.5;
		// //dot( cursorIconRightProjector, linePoint )
		// apply aspect correction here.
		//float rightProjection         = dot( cursorIconRightProjector, linePoint ) /2.0 + 0.5;;
		float rightProjection         = (linePoint.y) / 2.0 + 0.5;
		
		
		// thing that are in the distance won't get splatted (beyond diagonal 1.0 cubed distance; sqrt(1+1+1) )
		if( length(linePoint) < 1.7320 ) 
		{
			// this shows what the UV map looks like...
			gl_FragColor.rgb +=( vec3(rightProjection, upProjection, 0.0) / 3.0 );
		
			//cursorRayPosition
			vec4 this_color = texture2D( cursorIconTex, vec2( rightProjection, upProjection ) );
		        if( this_color.a > 0.0 ) {
				gl_FragColor.rgb = ( gl_FragColor.rgb * (1.0-this_color.a)) + ( this_color.rgb * this_color.a );
			}
		}
	}


    }
    `
} );

/*
#if !MORE_ROUNDED
              g = sqrt((a*a+b*b+c*c)/3);
              h = pow(g,200.0) * 0.5;  // up to 600 even works...
              g = pow( ( max(a,b,c)),400);
              h = (g+h);
              gl_FragColor = vec4( h * in_Color.rgb, in_Color.a ) ;
#else
*/

}
export {DualGeometryMaterial}

