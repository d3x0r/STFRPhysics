import * as THREE from "../three.js/build/three.module.js"

const attribs = ["position","uv"
,"in_Color", "in_FaceColor", "in_Modulous"
,"normal", "in_Pow", "in_flat_color", "in_use_texture", "in_decal_texture"
];
const attrib_bytes =     [4,4,1,1,1,4,4,1,1,1]
const attrib_sizes =     [3,2,4,4,2,3,1,1,1,1]
const attrib_normalize = [false,false,true,true,0,0,0,0,1,0]
const attrib_buftype = [Float32Array,Float32Array
    ,Uint8Array,Uint8Array,Uint8Array
    ,Float32Array,Float32Array,Uint8Array,Uint8Array, Uint8Array]

Voxelarium.GeometryBuffer = function () {
    var buffer = {};
     buffer.geometry = new THREE.BufferGeometry();

     buffer.geometry.uniforms = {
             edge_only : false,
             velocity1 : new THREE.Vector3(0.5,0,0),
             velocity2 : new THREE.Vector3(0.5,0,0),
     	};

    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    buffer.position = new Float32Array( [] );
    buffer.uv = new Float32Array( [] );
    buffer.in_Color = new Uint8Array( [] );
    buffer.in_FaceColor = new Uint8Array( [] );
    buffer.normal = new Float32Array( [] );
    buffer.in_Pow = new Float32Array( [] );
    buffer.in_use_texture = new Uint8Array( [] );
    buffer.in_flat_color = new Uint8Array( [] );
    buffer.in_decal_texture = new Uint8Array( [] );
    buffer.in_Modulous = new Int8Array( [] );
    buffer.available = 0;
    buffer.used = 0;

    buffer.clear = function() {
        this.used = 0;
    }

    attribs.forEach( (att,index)=>{
      buffer.geometry.setAttribute( att, new THREE.BufferAttribute( buffer[att], attrib_sizes[index], attrib_normalize[index] ))
    })

	buffer.updateUniforms = function() {
		console.log( this.material.uniforms, this.geometry.uniforms );
	}

     buffer.expand = function() {
         var newbuf;
         this.available = ( this.available + 1 ) * 2;

          attribs.forEach( (att,index)=>{
            newbuf =   new attrib_buftype[index]( new ArrayBuffer( this.available * ( attrib_bytes[index] * attrib_sizes[index] ) ) );
            newbuf.set( buffer[att] );
            buffer[att] = newbuf;
          })
     };

     buffer.markDirty = function () {

         attribs.forEach( (att)=>{
             var attrib = this.geometry.getAttribute(att);
             attrib.needsUpdate = true;
             attrib.array = buffer[att];
             attrib.count = buffer.used;
         })
         //console.log( "dirty", this.geometry.attributes );
     }

     buffer.addPoint = function( v, t, tBase, c, fc, n, p, ut, flat, dt, mod ) {
         if( this.used >= this.available )
            this.expand();
            const u2 = this.used * 2;
            const u3 = this.used * 3;
            const u4 = this.used * 4;
        if( t ) {
            this.uv[u2+0] = t[tBase+0];
            this.uv[u2+1] = t[tBase+1];
        }
        else {
            this.uv[u2+0] = 0;
            this.uv[u2+1] = 0;
        }
        this.position[u3 + 0 ] = v.x;
        this.position[u3 + 1 ] = v.y;
        this.position[u3 + 2 ] = v.z;
        if( c ) {
        this.in_Color[u4 + 0 ] = c.x*255;
        this.in_Color[u4 + 1 ] = c.y*255;
        this.in_Color[u4 + 2 ] = c.z*255;
        this.in_Color[u4 + 3 ] = c.w*255; }

        if( fc ) {
        this.in_FaceColor[u4 + 0 ] = fc.x*255;
        this.in_FaceColor[u4 + 1 ] = fc.y*255;
        this.in_FaceColor[u4 + 2 ] = fc.z*255;
        this.in_FaceColor[u4 + 3 ] = fc.w*255; }

        this.normal[u3 + 0] = n?n.x:0;
        this.normal[u3 + 1] = n?n.y:0;
        this.normal[u3 + 2] = n?n.z:1;

        this.in_Pow[ this.used ] = p;
        this.in_use_texture[ this.used ] = ut;
        this.in_flat_color[this.used] = flat;
        this.in_decal_texture[this.used] = dt;
        this.in_Modulous[this.used * 2 + 0] = mod[0];
        this.in_Modulous[this.used * 2 + 1] = mod[1];

        this.used++;
    };

     //buffer.

     buffer.AddQuad = function( norm, P1,P2,P3,P4,faceColor,color,pow ) {

         const min = 0;
         const max = 1;
         this.addPoint( P1, undefined, undefined, color, faceColor, norm, pow, false, false, false, [min,min] );
         this.addPoint( P2, undefined, undefined, color, faceColor, norm, pow, false, false, false, [max,min] );
         this.addPoint( P3, undefined, undefined, color, faceColor, norm, pow, false, false, false, [min,max] );
         this.addPoint( P2, undefined, undefined, color, faceColor, norm, pow, false, false, false, [max,min] );
         this.addPoint( P4, undefined, undefined, color, faceColor, norm, pow, false, false, false, [max,max] );
         this.addPoint( P3, undefined, undefined, color, faceColor, norm, pow, false, false, false, [min,max] );
     }
     buffer.AddQuadTexture = function( norm, P1,P2,P3,P4,textureCoords ) {
         const min = 0;
         const max = 1;
         this.addPoint( P1, textureCoords.uv_array, 0, undefined, undefined, norm, undefined, 255, false, false, [min,min] );
         this.addPoint( P2, textureCoords.uv_array, 2, undefined, undefined, norm, undefined, 255, false, false, [max,min] );
         this.addPoint( P3, textureCoords.uv_array, 4, undefined, undefined, norm, undefined, 255, false, false, [min,max] );
         this.addPoint( P2, textureCoords.uv_array, 2, undefined, undefined, norm, undefined, 255, false, false, [max,min] );
         this.addPoint( P4, textureCoords.uv_array, 6, undefined, undefined, norm, undefined, 255, false, false, [max,max] );
         this.addPoint( P3, textureCoords.uv_array, 4, undefined, undefined, norm, undefined, 255, false, false, [min,max] );
     }
     buffer.addSimpleQuad = function( quad, color, faceColor, norm, pow ) {
         var min = 0;
         var max = 1;
         this.addPoint( quad[0], undefined, undefined, color, faceColor, norm, pow, false, false, false, [min,min] );
         this.addPoint( quad[1], undefined, undefined, color, faceColor, norm, pow, false, false, false, [max,min] );
         this.addPoint( quad[2], undefined, undefined, color, faceColor, norm, pow, false, false, false, [min,max] );
         this.addPoint( quad[1], undefined, undefined, color, faceColor, norm, pow, false, false, false, [max,min] );
         this.addPoint( quad[3], undefined, undefined, color, faceColor, norm, pow, false, false, false, [max,max] );
         this.addPoint( quad[2], undefined, undefined, color, faceColor, norm, pow, false, false, false, [min,max] );
     }
     const white = new THREE.Vector4( 0.5, 0, 0, 1 );
     buffer.addSimpleQuadTex = function( quad, uvs, norm, pow ) {
         var min = 0;
         var max = 1.0;
         return [this.addPoint( quad[0], uvs, 0, white, white, norm, pow, 255, false, false, [min,min] )
         	,this.addPoint( quad[1], uvs, 2, white, white, norm, pow, 255, false, false, [max,min] )
         	,this.addPoint( quad[2], uvs, 4, white, white, norm, pow, 255, false, false, [min,max] )
         	,this.addPoint( quad[1], uvs, 2, white, white, norm, pow, 255, false, false, [max,min] )
         	,this.addPoint( quad[3], uvs, 6, white, white, norm, pow, 255, false, false, [max,max] )
         	,this.addPoint( quad[2], uvs, 4, white, white, norm, pow, 255, false, false, [min,max] )
                ];
     }

     buffer.updateVoxCube = function( voxelType ) {
         // this shouldn't change anyway....
         //return;
        if( voxelType && voxelType.image
	  && (( voxelType.properties.DrawInfo & Voxelarium.ZVOXEL_DRAWINFO_SHADER ) == 0 )
           ) {
            //var in_uvs = voxelType.textureCoords.uvs;
            var uvs = voxelType.textureCoords.uv_array;
            const tBase = [0,2,4,2,6,4];
            let changed = false;
            for( let v = 0; v < this.used/6; v++ ) {
            for( let face = 0; face < 6; face++ ) {
                const u2 = (v*6+face)*2
                    if( buffer.uv[u2+0] !== uvs[tBase[face]+0] ||
                       buffer.uv[u2+1] !== uvs[tBase[face]+1] ) {
         console.log( "changing UVS:", uvs );
	            	buffer.uv[u2+0] = uvs[tBase[face]+0];
        	    	buffer.uv[u2+1] = uvs[tBase[face]+1];
                    	changed = true;
                    }
            }
            }
            if( changed ) {
            	console.log( "Actuallyupdated" );
           	 buffer.markDirty();
            }
        }
     }

     buffer.makeVoxCube = function( size, voxelType ) {
        var v1 = new THREE.Vector3(1,1,1);
        var v2 = new THREE.Vector3(-1,1,1);
        var v3 = new THREE.Vector3(1,-1,1);
        var v4 = new THREE.Vector3(-1,-1,1);
        var v5 = new THREE.Vector3(1,1,-1);
        var v6 = new THREE.Vector3(-1,1,-1);
        var v7 = new THREE.Vector3(1,-1,-1);
        var v8 = new THREE.Vector3(-1,-1,-1);
        var quad;
        if( voxelType && voxelType.image
	  && (( voxelType.properties.DrawInfo & Voxelarium.ZVOXEL_DRAWINFO_SHADER ) == 0 )
           ) {
            const uvs = voxelType.textureCoords.uv_array;
            buffer.addSimpleQuadTex( quad=[v1.clone().multiplyScalar(size),v2.clone().multiplyScalar(size),v3.clone().multiplyScalar(size),v4.clone().multiplyScalar(size)]
                , uvs
                , THREE.Vector3Forward
                , 200 )
                quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();

            buffer.addSimpleQuadTex( quad = [v6.clone().multiplyScalar(size),v5.clone().multiplyScalar(size),v8.clone().multiplyScalar(size),v7.clone().multiplyScalar(size)]
                , uvs
                , THREE.Vector3Backward
                , 200 )
                quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
            buffer.addSimpleQuadTex( quad = [v5.clone().multiplyScalar(size),v6.clone().multiplyScalar(size),v1.clone().multiplyScalar(size),v2.clone().multiplyScalar(size)]
                    , uvs
                    , THREE.Vector3Up
                    , 200 )
                    quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
            buffer.addSimpleQuadTex( quad = [v3.clone().multiplyScalar(size),v4.clone().multiplyScalar(size),v7.clone().multiplyScalar(size),v8.clone().multiplyScalar(size)]
                    , uvs
                    , THREE.Vector3Down
                    , 200 )
                    quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
            buffer.addSimpleQuadTex( quad = [v5.clone().multiplyScalar(size),v1.clone().multiplyScalar(size),v7.clone().multiplyScalar(size),v3.clone().multiplyScalar(size)]
                    , uvs
                    , THREE.Vector3Right
                    , 200 )
                    quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
            buffer.addSimpleQuadTex( quad = [v2.clone().multiplyScalar(size),v6.clone().multiplyScalar(size),v4.clone().multiplyScalar(size),v8.clone().multiplyScalar(size)]
                    , uvs
                    , THREE.Vector3Left
                    , 200 )
                    quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();

        }else {
        buffer.addSimpleQuad( quad=[v1.clone().multiplyScalar(size),v2.clone().multiplyScalar(size),v3.clone().multiplyScalar(size),v4.clone().multiplyScalar(size)]
            , voxelType && voxelType.properties.EdgeColor || new THREE.Vector4( 0.2, 0.0, 1, 1.0 )
            , voxelType && voxelType.properties.FaceColor || new THREE.Vector4( 0, 0, 0, 0.5 )
            , THREE.Vector3Forward
            , 200 )
            quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
        buffer.addSimpleQuad( quad = [v6.clone().multiplyScalar(size),v5.clone().multiplyScalar(size),v8.clone().multiplyScalar(size),v7.clone().multiplyScalar(size)]
            , voxelType && voxelType.properties.EdgeColor || new THREE.Vector4( 0.2, 1, 0, 1.0 )
            , voxelType && voxelType.properties.FaceColor || new THREE.Vector4( 0, 0, 0, 0.5 )
            , THREE.Vector3Backward
            , 200 )
            quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
        buffer.addSimpleQuad( quad = [v5.clone().multiplyScalar(size),v6.clone().multiplyScalar(size),v1.clone().multiplyScalar(size),v2.clone().multiplyScalar(size)]
                , voxelType && voxelType.properties.EdgeColor || new THREE.Vector4( 1, 0.0, 0, 1.0 )
                , voxelType && voxelType.properties.FaceColor || new THREE.Vector4( 0, 0, 0, 0.5 )
                , THREE.Vector3Up
                , 200 )
                quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
        buffer.addSimpleQuad( quad = [v3.clone().multiplyScalar(size),v4.clone().multiplyScalar(size),v7.clone().multiplyScalar(size),v8.clone().multiplyScalar(size)]
                , voxelType && voxelType.properties.EdgeColor || new THREE.Vector4( 0, 1, 1, 1.0 )
                , voxelType && voxelType.properties.FaceColor || new THREE.Vector4( 0, 0, 0, 0.5 )
                , THREE.Vector3Down
                , 200 )
                quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
        buffer.addSimpleQuad( quad = [v5.clone().multiplyScalar(size),v1.clone().multiplyScalar(size),v7.clone().multiplyScalar(size),v3.clone().multiplyScalar(size)]
                , voxelType && voxelType.properties.EdgeColor || new THREE.Vector4( 1, 0.0, 1, 1.0 )
                , voxelType && voxelType.properties.FaceColor || new THREE.Vector4( 0, 0, 0, 0.5 )
                , THREE.Vector3Right
                , 200 )
                quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
        buffer.addSimpleQuad( quad = [v2.clone().multiplyScalar(size),v6.clone().multiplyScalar(size),v4.clone().multiplyScalar(size),v8.clone().multiplyScalar(size)]
                , voxelType && voxelType.properties.EdgeColor || new THREE.Vector4( 1, 1, 0, 1.0 )
                , voxelType && voxelType.properties.FaceColor || new THREE.Vector4( 0, 0, 0, 0.5 )
                , THREE.Vector3Left
                , 200 )
                quad[0].delete(); quad[1].delete(); quad[2].delete(); quad[3].delete();
        }
        this.markDirty(  );
     }

     //var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
     //var mesh = new THREE.Mesh( geometry, material );
     return buffer;
}




function updatePosition() {
    buffer.geometry.attributes.position.needsUpdate = true;
}
