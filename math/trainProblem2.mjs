
import {ObservedTime,RealTime} from "./relativistic.util.mjs"

const C = 1;
const V = 0.5;

const L = 1;
const gamma = Math.sqrt( C*C-V*V ) / C;



function a() {
	const T1a = ObservedTime( 0  , { x:0,y:0,z:0}, {x:0,y:0,z:0}, {x:0, y:0, z:0}, {x:-L, y:0, z:0} );
	const T2a = ObservedTime( T1a, { x:-L,y:0,z:0}, {x:0,y:0,z:0}, {x:0, y:0, z:0}, {x:0, y:0, z:0} );

	const T1  = gamma * ObservedTime( 0, { x:0,y:0,z:0}, {x:0,y:0,z:0}, {x:V,y:0, z:0}, {x:-L, y:0, z:0} );
	const T2 = gamma * ObservedTime( T1a, { x:-L,y:0,z:0}, {x:0,y:0,z:0}, {x:V,y:0, z:0}, {x:-L, y:0, z:0} );
	const T3 = gamma * ObservedTime( T2a, { x:0,y:0,z:0}, {x:0,y:0,z:0}, {x:V,y:0, z:0}, {x:-L, y:0, z:0} );
        
        console.log( "moving Frame:", T1, T2, T3 );
        console.log( "Stationary Frame:", T1a, T2a );
        
}
a()