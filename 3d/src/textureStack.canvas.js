"use strict";

import "./three.js/three.min.js";

// import {TextureStack} from "./textureStack.canvas.js"
//
// var stack = TextureStack();
//   stack.add( CreateElement( "img" ) );
//   var texture3d = stack.smudge();
//


function TextureStack() {

	
	var texture_width = 0;
	var texture_height = 0;
	var textures = 0;
	var rawData = null;
	
	var rawTextures = []; // hold on to these for the caller too...

	var    canvas = null;
	var context = null;

	var	texture3d = null; //DataTexture3D(  data, width ,height, depth );
	
	function expand( newImgData ) {
		const oldSize = texture_width*texture_height*textures*4;
		textures++;
		let newSize;
		let newData = new Uint8Array( newSize = texture_width*texture_height*textures*4 );
		for( let n = 0; n < oldSize; n++ ) {
			newData[n] = rawData[n];
		}
		for( let n = oldSize; n < newSize; n++ ) {
			newData[n] = newImgData[n-oldSize];
		}
		rawData = newData;
	}


	const ts = {
    texture : null,
    texture_count : 0,
    texture_size : 0,
    renderTarget : null,
    texture : null,
    x_ofs : 0,
    y_ofs : 0,
	smudge() {
		//DataTexture3D DataTexture2DArray
		//console.log( "Smudge texture... make new array",  texture_width, texture_height, textures);
		texture3d = new THREE.DataTexture3D( rawData, texture_width, texture_height, textures );
		texture3d.wrapR  = THREE.RepeatWrapping;
		texture3d.wrapS = THREE.RepeatWrapping;
		texture3d.wrapT = THREE.RepeatWrapping;
		return texture3d;
	},
    add( image )
   {

	if( !texture_width ) {
	        canvas = document.createElement('canvas');
		texture_width = image.width;
		texture_height = image.height;
		canvas.width =image.width;
		canvas.height = image.height;
	    	context = canvas.getContext('2d');
	        context.fillStyle="#00000000";
        	context.fillRect(0,0,image.width,image.height);
		
        //this.context.clearRect(20,20,100,50);
	}

       	context.drawImage( image, 0, 0, texture_width, texture_height );
	 const imageData = context.getImageData(0, 0, canvas.width, canvas.height );
	 const output = imageData.data;
	expand( output );
   }
	};

	return ts;
}


export {TextureStack};