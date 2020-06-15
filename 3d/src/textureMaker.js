
import {noise} from "./perlin-min.mjs";


const BASE_COLOR_WHITE = [255,255,255,255];
const BASE_COLOR_LIGHTGREY = [ 127,127,127,255];
const BASE_COLOR_BLACK = [0,0,0,255];
const BASE_COLOR_DARK_BLUE = [0,0,132,255];
const BASE_COLOR_MID_BLUE = [0x2A,0x4F,0xA8,255];
const BASE_COLOR_RED = [127,0,0,255];
const BASE_COLOR_LIGHT_TAN = [0xE2,0xB5,0x71,255];    //E2B571
const BASE_COLOR_YELLOW = [255,255,0,255];
const BASE_COLOR_LIGHTBLUE = [0,0,255,255];
const BASE_COLOR_LIGHTCYAN = [0,192,192,255];
const BASE_COLOR_DARK_BLUEGREEN = [0x06, 0x51, 0x42,255];
const BASE_COLOR_LIGHTRED = [255,0,0,255];
const BASE_COLOR_LIGHTGREEN = [0,255,0,255];
const BASE_COLOR_BRIGHT_GREEN = [0x23, 0xB5, 0x10,255];
const BASE_COLOR_DARK_GREEN = [0,93,0,255];
const BASE_COLOR_DARK_BROWN = [0x54,0x33,0x1c,255];  //54331C
const BASE_COLOR_BROWN = [0x91,0x79,0x4F ,255];  //54331C
const BASE_COLOR_WHEAT_GREEN = [0xB6, 0xD1, 0x6E,255];
const BASE_COLOR_AGED_GREEN = [0x57, 0x87, 0x2D, 255]

const BASE_COLOR_TAN = [0xD8, 0xAB, 0x7D,255];
const BASE_COLOR_FLOUR = [0xD6, 0xC8, 0xBA,255];

//const RANGES = [BASE_COLOR_BLACK, BASE_COLOR_DARK_BLUE, BASE_COLOR_DARK_GREEN, BASE_COLOR_LIGHT_TAN, BASE_COLOR_DARK_BROWN, BASE_COLOR_WHITE, BASE_COLOR_BLACK ];
//const RANGES_THRESH = [0, 0.01, 0.25, 0.50, 0.75, 0.99, 1.0 ];

const RANGES = [BASE_COLOR_BLACK, BASE_COLOR_DARK_BLUE, BASE_COLOR_MID_BLUE, BASE_COLOR_LIGHT_TAN, BASE_COLOR_DARK_GREEN, BASE_COLOR_LIGHT_TAN, BASE_COLOR_DARK_BROWN, BASE_COLOR_WHITE, BASE_COLOR_BLACK ];
const RANGES_THRESH = [0, 0.02, 0.20, 0.24, 0.29, 0.50, 0.75, 0.99, 1.0 ];

var logs = 1000;
var logs2 = 1000;

function offscreenSurface() {
	let output_offset = 0;
	const pointBuffer = [0,0,0,0];
	const surface = {
		canvas : document.createElement( "canvas" ),
		ctx :null,
		colorAvg : ColorAverage,
		plot : plot,
		reset() {
			output_offset = 0;
		},
		get() {	
			pointBuffer[0] = output[output_offset+0];
			pointBuffer[1] = output[output_offset+1];
			pointBuffer[2] = output[output_offset+2];
			pointBuffer[3] = output[output_offset+3];
	if( pointBuffer[0] < 0 || pointBuffer[1] < 0 || pointBuffer[2] < 0 ) debugger;
if( logs-- > 0 ) { logs2 = 2; console.log( "Read:", output_offset, pointBuffer ); }
			return pointBuffer;
		},
		smudge() {
			surface.ctx.putImageData(imageData, 0,0);
			output_offset = 0;
		}
	};
	surface.canvas.width = 512;
	surface.canvas.height = 512;
	surface.ctx = surface.canvas.getContext( "2d" );
	document.body.appendChild( surface.canvas );

	const imageData = surface.ctx.getImageData(0, 0, surface.canvas.width, surface.canvas.height );
	const output = imageData.data;

	return surface;

function ColorAverage( a, b, i,m) {

    var c = [ (((b[0]-a[0])*i/m) + a[0])|0,
        (((b[1]-a[1])*i/m) + a[1])|0,
        (((b[2]-a[2])*i/m) + a[2])|0,
		(((b[3]-a[3])*i/m) + a[3])|0
             ]
    //c[3] -= c[1];
    //console.log( "color: ", a, b, c, i, ((b[1]-a[1])*i/m)|0, a[1], ((b[1]-a[1])*i/m) + a[1] )
    return c;//`#${(c[0]<16?"0":"")+c[0].toString(16)}${(c[1]<16?"0":"")+c[1].toString(16)}${(c[2]<16?"0":"")+c[2].toString(16)}`
}

    function plot(d) { 
		//console.log( "output at", output_offset, d )
if( logs2-- > 0 ) console.log( "write:", output_offset, d );
if( d[0] < 0 || d[1] < 0 || d[2] < 0 ) debugger;
        output[output_offset+0] = d[0]; 
        output[output_offset+1] = d[1]; 
        output[output_offset+2] = d[2]; 
        output[output_offset+3] = d[3]; 
        output_offset+=4
        //output++;
    }

}


function makeGranite() {
	const surface = makeSurface();
	function makeSurface() {
                
		var config = {
			patchSize : 128,
			seed_noise : "Blue",
			repeat_modulo : 1024, // make the thing tilable
			repeat_modulo2 : {x:2048, y:128} // make the thing tilable
		}
		var config2 = {
			patchSize : 32,
			seed_noise : "Noise3",
			repeat_modulo : 1024, // make the thing tilable
		
		}
	        
		var surface = offscreenSurface();
	        
		surface.fill = ()=>{	        
		var p1 = noise( config );
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*4,0+y*0.5,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				surface.plot( surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 ) );
			}

		let noise2 =  noise( config2 );
		surface.reset();
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = noise2.get(0.1+x*2,2+y*2,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				if( v > 0.70 ) 
					surface.plot( surface.colorAvg( surface.get(), BASE_COLOR_WHITE, v-0.70, 0.30 ) );
				else if( v < 0.30 ) 
					surface.plot( surface.colorAvg( surface.get(), BASE_COLOR_BLACK, 0.30-v, 0.30 ) );
				else surface.plot( surface.get() );
			}
		surface.smudge();
		}
		return surface;
	}	
        return surface;
}


function makeRough() {
	const surface = makeSurface();
	function makeSurface() {
                
		var config = {
			patchSize : 128,
			seed_noise : "Blue",
			repeat_modulo : 2048, // make the thing tilable
		
		}
		var config2 = {
			patchSize : 32,
			seed_noise : "Noise3",
			repeat_modulo : 2048, // make the thing tilable
		
		}
	        
		var surface = offscreenSurface();
	        
		surface.fill = ()=>{	        
		var p1 = noise( config );
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+y*2+x*4.9,0+x*3+y*11.7,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				surface.plot( surface.colorAvg( BASE_COLOR_DARK_BROWN, BASE_COLOR_LIGHTGREY, v, 1.0 ) );
			}

		let noise2 =  noise( config2 );
		surface.reset();
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {

				let v = p1.get(0.1+y*3+x*9.9,2+x*2+y*9.4,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				if( v > 0.62 ) 
					surface.plot( surface.colorAvg( surface.get(), BASE_COLOR_WHITE, v-0.68, 0.38 ) );
				else if( v < 0.30 ) 
					surface.plot( surface.colorAvg( surface.get(), BASE_COLOR_BLACK, 0.30-v, 0.30 ) );
				else surface.plot( surface.get() );
			}
		surface.smudge();
		}
		return surface;
	}	
        return surface;
}



function makeSoil() {
	const surface = makeSurface();
	function makeSurface() {
                
		var config = {
			patchSize : 128,
			seed_noise : "Brown",
			repeat_modulo : 128, // make the thing tilable
		
		}
	        
		var surface = offscreenSurface();
	        
		surface.fill = ()=>{	        
		var p1 = noise( config );
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*0.5,0+y*0.5,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				surface.plot( surface.colorAvg( BASE_COLOR_BROWN, BASE_COLOR_DARK_BROWN, v, 1.0 ) );
			}

		var config2 = {
			patchSize : 128,
			seed_noise : "brownz",
			repeat_modulo : 1024, // make the thing tilable
		
		}
		var p1 = noise( config2 );
		surface.reset();
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*4,0+y*4,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				if( v > 0.68 )
					surface.plot( surface.colorAvg( surface.get(), BASE_COLOR_DARK_GREEN, v-0.68, 0.50 ) );
				else if( v < 0.32 ) 
					surface.plot( surface.colorAvg( surface.get(), BASE_COLOR_TAN, 0.32-v, 0.50 ) );
				else
					surface.plot( surface.get() );
			}

		surface.smudge();
		}
		return surface;
	}	
        return surface;
}

function makeWater() {
	const surface = makeSurface();
	function makeSurface() {
                
		var config = {
			patchSize : 32,
			seed_noise : "BlueGreen1",
			repeat_modulo : 128, // make the thing tilable
		
		}
	        
		var config2 = {
			patchSize : 64,
			seed_noise : "moreBlues",
			repeat_modulo : 128, // make the thing tilable
		
		}
		var config3 = {
			patchSize : 32,
			seed_noise : "aBlues",
			repeat_modulo : 128, // make the thing tilable
		
		}
		var surface = offscreenSurface();
	        
		let c;
		surface.fill = ()=>{	
		config.seed_noise += '1';
		var p1 = noise( config );
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*0.25,0+y*0.25,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
		if( v < 0 ) debugger;
				surface.plot( (c=surface.colorAvg( BASE_COLOR_DARK_BLUE,BASE_COLOR_DARK_BLUEGREEN, v, 1.0 )),(c[4]=64),c );
			}

		config2.seed_noise += '1';
		var p1 = noise( config2 );
		surface.reset();
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*0.25,0+y*0.25,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				if( v > 0.68 )
					surface.plot( c=surface.colorAvg( surface.get(), BASE_COLOR_LIGHTCYAN, 0.16 - Math.abs( 0.16- (v-0.68) ), 3*0.42 ),(c[4]=64),c );
				else if( v < 0.32 ) 
					surface.plot( c=surface.colorAvg( surface.get(), BASE_COLOR_LIGHTCYAN, 0.16-Math.abs((0.16-v)), 3*0.25 ),(c[4]=64),c );
				else if( v < 0.55 ) 
					surface.plot( c=surface.colorAvg( surface.get(), BASE_COLOR_MID_BLUE, 0.16 - Math.abs( 0.48-v ), 3*0.28 ),(c[4]=64),c );
				else{
//logs = 2;
					surface.plot( surface.get() );
				}
			}

		config3.seed_noise += '1';
		var p1 = noise( config3 );
		surface.reset();
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*0.25,0+y*0.25,0);
				if( v > 0.44 )
					surface.plot( c=surface.colorAvg( surface.get(), BASE_COLOR_DARK_BLUE, v-0.68, 4*0.32 ),(c[4]=64),c );
				else
					surface.plot( surface.get() );
			}

		surface.smudge();
		}
		return surface;
	}	
        return surface;
}



function makeGrass() {
	const surface = makeSurface();
	function makeSurface() {
		var config = {
			patchSize : 32,
			seed_noise : "Green",
			repeat_modulo : 128, // make the thing tilable
		
		}
		var config2 = {
			patchSize : 128,
			seed_noise : "Green2",
			repeat_modulo : 1024, // make the thing tilable
		
		}
		var config3 = {
			patchSize : 512,
			seed_noise : "Green3",
			repeat_modulo : 512, // make the thing tilable
		
		}
	        
		var surface = offscreenSurface();
		surface.fill = ()=>{	        
	        
		var p1 = noise( config );
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*0.25,0+y*3,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				surface.plot( surface.colorAvg( BASE_COLOR_AGED_GREEN, BASE_COLOR_DARK_GREEN, v, 1.0 ) );
			}

		var p2 = noise( config2 );
		var p3 = noise( config3 );
		surface.reset();
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p2.get(x*10,0+y,0);
				let v2 = p3.get(x*2.1,0+y*1.9,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				surface.plot( surface.colorAvg( surface.get()
					, surface.colorAvg( BASE_COLOR_WHEAT_GREEN, BASE_COLOR_DARK_GREEN, v, 1.0 ), v2/3.0+0.33, 1.0 ) );
			}

		var config4 = {
			patchSize : 128,
			seed_noise : "Green5",
			repeat_modulo : 512, // make the thing tilable
		
		}
		var config5 = {
			patchSize : 128,
			seed_noise : "Green7",
			repeat_modulo : 512, // make the thing tilable
		
		}
		var config6 = {
			patchSize : 128,
			seed_noise : "Green9",
			repeat_modulo : 1024, // make the thing tilable
		
		}
	        
		surface.reset();
		var p1 = noise( config4 );
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x,0+(x+y)*7,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				if( v > 0.62	 )
					surface.plot( surface.colorAvg( surface.get(), BASE_COLOR_DARK_GREEN, v-0.62, 0.62 ) );
				else
					surface.plot( surface.get() );
			}

		var p2 = noise( config5 );
		var p3 = noise( config6 );
		surface.reset();
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p2.get((x+y)*3,0+y,0);
				let v2 = p3.get(x*2,0+y*2,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				if( v > 0.62 )
					surface.plot( surface.colorAvg( surface.get()
						, surface.colorAvg( surface.get(), BASE_COLOR_BRIGHT_GREEN, v-0.7, 0.7 ), v2/3.0+0.33, 1.0 ) );
				else
					surface.plot( surface.get() );
			}



		surface.smudge();
		}
		return surface;
	}	
        return surface;
}



function makeSand() {
	const surface = makeSurface();
	function makeSurface() {
                
		var config = {
			patchSize : 128,
			seed_noise : "tan",
			repeat_modulo : 1024, // make the thing tilable
		
		}
	        
		var surface = offscreenSurface();
	        
		surface.fill = ()=>{	        
		var p1 = noise( config );
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*2,0+y*2,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				surface.plot( surface.colorAvg( BASE_COLOR_TAN, BASE_COLOR_FLOUR, v, 1.0 ) );
			}

		surface.smudge();
		}
		return surface;
	}	
        return surface;
}

function makeTerrain() {
	const surface = makeSurface();
	function makeSurface() {
                
		var config = {
			patchSize : 128,
			seed_noise : "land",
			repeat_modulo : 128, // make the thing tilable
		
		}
	        
		var surface = offscreenSurface();
		surface.fill = ()=>{	        
		var p1 = noise( config );
		for( let y = 0; y < surface.canvas.height; y++ )
			for(let x = 0; x < surface.canvas.width; x++ ) {
				let v = p1.get(0+x*0.8,0+y*0.8,0);
				//surface.colorAvg( BASE_COLOR_WHITE, BASE_COLOR_LIGHTGREY, v, 1.0 );
				//surface.plot( surface.colorAvg( BASE_COLOR_TAN, BASE_COLOR_FLOUR, v, 1.0 ) );
				for( var r = 1; r < RANGES_THRESH.length; r++ ) {
						if( v <= RANGES_THRESH[r] ) {
							surface.plot( surface.colorAvg( RANGES[r-1], RANGES[r+0], (v-RANGES_THRESH[r-1])/(RANGES_THRESH[r+0]-RANGES_THRESH[r-1]) * 1000, 1000 ) );
							break;
						}
				}
			}
		surface.smudge();
		}
		return surface;
	}	
        return surface;
}



const Textures = [
	makeWater(), makeSand(), makeGrass(), makeSoil(),  makeRough(), makeGranite(), makeTerrain()
]

export { Textures };
