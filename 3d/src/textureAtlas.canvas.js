"use strict";

Voxelarium.TextureAtlas = {
    texture : null,
    texture_count : 0,
    texture_size : 0,
    renderTarget : null,
    canvas : null,
    context : null,
    texture : null,
    x_ofs : 0,
    y_ofs : 0,
    init : function( count, size ) {
        this.texture_count = count;
        this.texture_size = size;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 2048;
        this.canvas.height = 2048;
    	this.context = this.canvas.getContext('2d');
        this.context.fillStyle="clear";
        this.context.fillRect(0,0,2048,2048);
        //this.context.clearRect(20,20,100,50);
        this.texture = new THREE.Texture(this.canvas)
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.NearestFilter;
    	//this.texture.needsUpdate = true;

    },
    add : function( image )
   {
       var coords = {
           uvs : new Array(8),
           uv_array : null,
           coord : { position : { x : 0, y : 0 }, size : {x : 0,y:0 } }
       }
       if( this.y_ofs >= 32 )
       {
           for(  var n = 0; n < 8; n++ )
               uvs[n] = 0;
           coords.coord.position.x = 0;
           coords.coord.position.y = 0;
           coords.coord.size.x = 0;
           coords.coord.size.y = 0;
           return coords;
       }
       var scalar = 1.0 / ( this.texture_count);
       //Log.log( "output texture to atlas... {0} {1}", x_ofs, y_ofs );
       coords.coord.position.x = ( scalar ) * this.x_ofs;
       coords.coord.position.y = ( scalar ) * this.y_ofs;
       coords.coord.size.x = ( scalar );
       coords.coord.size.y = ( scalar );

       coords.uvs[0 * 2 + 0] = ( scalar ) * this.x_ofs;
       coords.uvs[0 * 2 + 1] = 1-(( scalar ) * this.y_ofs);
       coords.uvs[1 * 2 + 0] = coords.uvs[0 * 2 + 0] + ( scalar );
       coords.uvs[1 * 2 + 1] = coords.uvs[0 * 2 + 1];
       coords.uvs[2 * 2 + 0] = coords.uvs[0 * 2 + 0];
       coords.uvs[2 * 2 + 1] = (coords.uvs[0 * 2 + 1] - ( scalar ));
       coords.uvs[3 * 2 + 0] = coords.uvs[1 * 2 + 0];
       coords.uvs[3 * 2 + 1] = coords.uvs[2 * 2 + 1];

       var in_uvs = coords.uvs;
       coords.uv_array = [in_uvs[1*2+0]
                   ,in_uvs[1*2+1]
                   ,in_uvs[0*2+0]
                   ,in_uvs[0*2+1]
                   ,in_uvs[3*2+0]
                   ,in_uvs[3*2+1]
                   ,in_uvs[2*2+0]
                   ,in_uvs[2*2+1]
               ];


       this.context.drawImage( image, this.texture_size * this.x_ofs, this.texture_size * this.y_ofs, this.texture_size, this.texture_size )

       this.texture.needsUpdate = true;

       this.x_ofs++;
       if( this.x_ofs == this.texture_count )
       {
           this.x_ofs = 0;
           this.y_ofs++;
       }
       return coords;
   }
}
