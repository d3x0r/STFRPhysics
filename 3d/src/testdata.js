
import {noise} from "./perlin-min.mjs"

var noiseOpts;
var noiseMap = noise(noiseOpts ={
	patchSize : 256,
	seed_noise : '' + Date.now(),
	repeat_modulo : 256,
	//base : 0,
} );

function createTestData() {
	var result = {};
	
	function memoize(f) {
		var cached = null;
		return function(a) {
			if(cached === null) { 
				cached = f(a);
			}
			return cached;
		}
	}
	
	function makeVolume(dims, f) {
		return memoize( function(fill) {
			var res = new Array(3);
			for(var i=0; i<3; ++i) {
				if( fill )
					res[i] = 4 + Math.ceil((dims[i][1] - dims[i][0]) / dims[i][2]);
				else
					res[i] = 2 + Math.ceil((dims[i][1] - dims[i][0]) / dims[i][2]);
			}

			var volume = new Float32Array((res[0]+(fill?2:0)) * (res[1]+(fill?2:0)) * (res[2]+(fill?2:0)))
				, n = 0;
				var k=0;
			if( fill )
			for( ; k < 1; k++ )
			for(var j=0, y=dims[1][0]-dims[1][2]; j<res[1]; ++j, y+=dims[1][2])
			for(var i=0, x=dims[0][0]-dims[0][2]; i<res[0]; ++i, x+=dims[0][2], ++n) {
				if( fill < 0 )
					volume[n] = 2.3 * Math.random();
				if( fill > 0 )
					volume[n] = -2.3 * Math.random();
			}
			var z;
			for( k=k, z=dims[2][0]-dims[2][2]; k<(res[2]-(fill?1:0)); ++k, z+=dims[2][2])
			for(var j=0, y=dims[1][0]-dims[1][2]*(fill?2:1); j<res[1]; ++j, y+=dims[1][2])
			for(var i=0, x=dims[0][0]-dims[0][2]*(fill?2:1); i<res[0]; ++i, x+=dims[0][2], ++n) {
			
				if( fill && (j == 0 || i == 0 || j == (res[1]-1) || i == (res[0]-1))){
					if( fill < 0 )
						volume[n] = 2.3 * Math.random();
					else if( fill > 0 )
						volume[n] = -2.3 * Math.random();
					else n--;
				}else {
					volume[n] = f(x,y,z);
					//if( volume[n] === 0 ) volume[n] -= 0.001
				}
			}
			if( fill )
			for( k=k; k < res[2]; k++ )
			for(var j=0, y=dims[1][0]-dims[1][2]; j<res[1]; ++j, y+=dims[1][2])
			for(var i=0, x=dims[0][0]-dims[0][2]; i<res[0]; ++i, x+=dims[0][2], ++n) {
				if( fill < 0 )
					volume[n] = 2.3 * Math.random();
				if( fill > 0 )
					volume[n] = -2.3 * Math.random();
			}
			//res[0] = res[0];
			//res[1] = res[1];
			//res[2] = res[2];
			return {data: volume, dims:res};
		});
	}

	
	result['Sphere'] = makeVolume(
		[[-1.0, 1.0, 0.25],
		 [-1.0, 1.0, 0.25],
		 [-1.0, 1.0, 0.25]],
		function(x,y,z) {
			return x*x + y*y + z*z - 1.0;
		}
	);
	
	result['Pyramid'] = makeVolume(
		[[-1, 1, 0.125],
		 [-1, 1, 0.125],
		 [-1, 1, 0.125]],
		function(x,y,z) {
			var ROOT_3 = Math.sqrt(3);

			var planes = [[-ROOT_3, ROOT_3, -ROOT_3],
							      [-ROOT_3, ROOT_3,  ROOT_3],
							      [ ROOT_3, ROOT_3, -ROOT_3],
							      [ ROOT_3, ROOT_3,  ROOT_3]];
			var planeOffsets = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

			return distanceFromConvexPlanes(planes, planeOffsets, x, y, z);
		}
	);

	result['Asteroid'] = makeVolume(
		[[-1, 1, 0.08],
		 [-1, 1, 0.08],
		 [-1, 1, 0.08]],
		function(x,y,z) {
			return (x*x + y*y + z*z) - PerlinNoise.noise(x*2,y*2,z*2);
		}
	);

	
	result['Sine Waves'] = makeVolume(
		[[-Math.PI*2, Math.PI*2, Math.PI/8],
		 [-Math.PI*2, Math.PI*2, Math.PI/8],
		 [-Math.PI*2, Math.PI*2, Math.PI/8]],
		function(x,y,z) {
			return Math.sin(x) + Math.sin(y) + Math.sin(z);
		}
	);

/*
	result['rain1 Test'] = makeVolume(
		[[-1, 1, 0.08],
		 [-1, 1, 0.08],
		 [-1, 1, 0.08]],
		function(x,y,z) {
                        // Let e(z)=exp(2 pi i z)
			// e(b) = 1 then f(a+b)=e(2ab/n)e(b^2/n)f(a)         f(z) = exp(2 pi i z^2 / n)/(exp(2 pi i z) - 1)
                        
                        // exp( 2ab / n + b^2 / n +  z^2/n - (z) - 1 )
                        // exp( 2ab / n + b^2 / n )    *    z^2/n - (z) - 1 
                        
                        
                	const Q = lnQuat( z*2*Math.pi, {x:1,y:0,z:0} );//.exp();
			const N = 1;
                        
                        const e =  (x) =>{ return  };
                        const f =  (z) = exp(2 pi i z^2 / n)/(exp(2 pi i z) - 1)
                        
                        
	                //Let eZs=( sin(2*Math. pi * z) );
	                //Let eZc=/*exp(0)=1 * * /( cos(2*Math. pi * z) );
                 
	                if( eZ==1 ) { 
                        	//const f = (x+y)=>{
		                        return e( 2*x*y/n ) * e (y^2/n) * f(x);
                                //}
                        }
                        return -1.0;
                 }
                 //if( eZ = 
			//[02:23:27] <rain1> I find that if e(b) = 1 then f(a+b)=e(2ab/n)e(b^2/n)f(a)
*/

	result['dot'] = makeVolume(
		[[0, 0, 0.5],
		 [0, 0, 0.5],
		 [0, 0, 0.5]],
		function(x,y,z) {

			if( x || y || z ) return 1.0;
			return  - 1.0;
		}
	);

	result['dots'] = makeVolume(
		[[-4.0, 4.0, 1],
		 [-4.0, 4.0, 1],
		 [-4.0, 6.0, 1]],
		function(x,y,z) {
			//console.log( "duh? ", x, y, z );
			if( ( Math.abs(x) % 2 == 1 )
			&& ( (z < 0 ) ? ( Math.abs(y) % 2 == 1 ) : ( Math.abs(y) % 2 == 0 ) )
			&& ( ( Math.abs(x) % 2 == 0 ) ? ( Math.abs(z) % 2 == 1 ) : ( Math.abs(z) % 2 == 1 ) ))
				return -2.3 * Math.random();
			else
				return 2.3 * Math.random();
		}
	);
	
	result['Big Sphere'] = makeVolume(
		[[-1.0, 1.0, 0.05],
		 [-1.0, 1.0, 0.05],
		 [-1.0, 1.0, 0.05]],
		function(x,y,z) {
			return x*x + y*y + z*z - 1.0;
		}
	);

	result['Torus'] = makeVolume(
		[[-2.0, 2.0, 0.2],
		 [-2.0, 2.0, 0.2],
		 [-1.0, 1.0, 0.2]],
		function(x,y,z) {
			return Math.pow(1.0 - Math.sqrt(x*x + y*y), 2) + z*z - 0.25;
		}
	);

	result['Hyperelliptic'] = makeVolume(
		[[-1.0, 1.0, 0.05],
		 [-1.0, 1.0, 0.05],
		 [-1.0, 1.0, 0.05]],
		function(x,y,z) {
			return Math.pow( Math.pow(x, 6) + Math.pow(y, 6) + Math.pow(z, 6), 1.0/6.0 ) - 1.0;
		}  
	);
	
	result['Nodal Cubic'] = makeVolume(
		[[-2.0, 2.0, 0.05],
		 [-2.0, 2.0, 0.05],
		 [-2.0, 2.0, 0.05]],
		function(x,y,z) {
			return x*y + y*z + z*x + x*y*z;
		}
	);
	
	result["Goursat's Surface"] = makeVolume(
		[[-2.0, 2.0, 0.05],
		 [-2.0, 2.0, 0.05],
		 [-2.0, 2.0, 0.05]],
		function(x,y,z) {
			return Math.pow(x,4) + Math.pow(y,4) + Math.pow(z,4) - 1.5 * (x*x  + y*y + z*z) + 1;
		}
	);
	
	result["Heart"] = makeVolume(
		[[-2.0, 2.0, 0.05],
		 [-2.0, 2.0, 0.05],
		 [-2.0, 2.0, 0.05]],
		function(x,y,z) {
			y *= 1.5;
			z *= 1.5;
			return Math.pow(2*x*x+y*y+2*z*z-1, 3) - 0.1 * z*z*y*y*y - y*y*y*x*x;
		}
	);
	
	result["Nordstrand's Weird Surface"] = makeVolume(
		[[-0.8, 0.8, 0.01],
		 [-0.8, 0.8, 0.01],
		 [-0.8, 0.8, 0.01]],
		function(x,y,z) {
			return 25 * (Math.pow(x,3)*(y+z) + Math.pow(y,3)*(x+z) + Math.pow(z,3)*(x+y)) +
				50 * (x*x*y*y + x*x*z*z + y*y*z*z) -
				125 * (x*x*y*z + y*y*x*z+z*z*x*y) +
				60*x*y*z -
				4*(x*y+x*z+y*z);
		}
	);
	
	result['Perlin Noise'] = makeVolume(
		[[-5, 5, 0.25],
		 [-5, 5, 0.25],
		 [-5, 5, 0.25]],
		function(x,y,z) {
			return PerlinNoise.noise(x,y,z) - 0.5;
		}
	);
		
	var pos = 0;
	result['Terrain 2'] = makeVolume(
		[[-1, 1, 0.05],
		 [-1, 1, 0.05],
		 [-1, 1, 0.05]],
		function(x,y,z) {
		    	if( x==-1&&y===-1&&z===-1) {
				noiseOpts.seed = '' + Date.now();
				noiseMap = noise(noiseOpts );
				pos += 5;
			}
			return   y +1.8  - noiseMap.get(x*40+5 + pos,0/*y*40+3*/,z*40+0.6)*3;
			return   noiseMap.get(x*40+5 + pos,0/*y*40+3*/,z*40+0.6)*2;
		}
	);

	var pos = 0;
	result['Terrain 3'] = makeVolume(
		[[-1, 1, 0.05],
		 [-1, 1, 0.05],
		 [-1, 1, 0.05]],
		function(x,y,z) {
		    	if( x==-1&&y===-1&&z===-1) {
				noiseOpts.seed = '' + Date.now();
				noiseMap = noise(noiseOpts );
				pos += 5;
			}
			return   noiseMap.get(x*40+5 + pos,y*40+3,z*40+0.6)*2 - 1.0;
		}
	);

	
	result['Terrain'] = makeVolume(
		[[-1, 1, 0.05],
		 [-1, 1, 0.05],
		 [-1, 1, 0.05]],
		function(x,y,z) {
			return  y + PerlinNoise.noise(x*2+5,y*2+3,z*2+0.6);
		}
	);

	function distanceFromConvexPlanes(planes, planeOffsets, x, y, z) {
		var maxDistance = -Infinity;
		for(var i = 0; i < planes.length; i++) {
			var x_ = x - planeOffsets[i][0];
			var y_ = y - planeOffsets[i][1];
			var z_ = z - planeOffsets[i][2];

			var dotProduct = planes[i][0] * x_ + planes[i][1] * y_ + planes[i][2] * z_;

			maxDistance = Math.max(maxDistance, dotProduct);
		}

		return maxDistance;
	}

	result['1/2 Offset Pyramid'] = makeVolume(
		[[-1, 1, 0.125],
		 [-1, 1, 0.125],
		 [-1, 1, 0.125]],
		function(x,y,z) {
			var ROOT_3 = Math.sqrt(3);

			var planes = [[-ROOT_3, ROOT_3, -ROOT_3],
							      [-ROOT_3, ROOT_3,  ROOT_3],
							      [ ROOT_3, ROOT_3, -ROOT_3],
							      [ ROOT_3, ROOT_3,  ROOT_3]];
			var planeOffsets = [[0.0625, 0.0625, 0.0625],
							            [0.0625, 0.0625, 0.0625],
							            [0.0625, 0.0625, 0.0625],
							            [0.0625,0.0625,0.0625]];

			return distanceFromConvexPlanes(planes, planeOffsets, x, y, z);
		}
	);

	result['Tetrahedron'] = makeVolume(
		[[-1, 1, 0.125],
		 [-1, 1, 0.125],
		 [-1, 1, 0.125]],
		function(x,y,z) {
			var INV_ROOT_3 = Math.sqrt(3)/3;

			var planes = [[ INV_ROOT_3,  INV_ROOT_3,  INV_ROOT_3],
							      [-INV_ROOT_3, -INV_ROOT_3,  INV_ROOT_3],
							      [ INV_ROOT_3, -INV_ROOT_3, -INV_ROOT_3],
							      [-INV_ROOT_3,  INV_ROOT_3, -INV_ROOT_3]];
			var planeOffsets = [[ 0.25,  0.25,  0.25],
							            [-0.25, -0.25,  0.25],
							            [ 0.25, -0.25, -0.25],
							            [-0.25,  0.25, -0.25]];

			return distanceFromConvexPlanes(planes, planeOffsets, x, y, z);
		}
	);

	result['1/2 Offset Tetrahedron'] = makeVolume(
		[[-1, 1, 0.125],
		 [-1, 1, 0.125],
		 [-1, 1, 0.125]],
		function(x,y,z) {
			var INV_ROOT_3 = Math.sqrt(3)/3;

			var planes = [[ INV_ROOT_3,  INV_ROOT_3,  INV_ROOT_3],
							      [-INV_ROOT_3, -INV_ROOT_3,  INV_ROOT_3],
							      [ INV_ROOT_3, -INV_ROOT_3, -INV_ROOT_3],
							      [-INV_ROOT_3,  INV_ROOT_3, -INV_ROOT_3]];
			var planeOffsets = [[ 0.3125,  0.3125,  0.3125],
							            [-0.3125, -0.3125,  0.3125],
							            [ 0.3125, -0.3125, -0.3125],
							            [-0.3125,  0.3125, -0.3125]];

			return distanceFromConvexPlanes(planes, planeOffsets, x, y, z);
		}
	);
	
	
	result['Empty'] = function(){ return { data: new Float32Array(32*32*32), dims:[32,32,32] } };
	
	return result;
}

export {createTestData}