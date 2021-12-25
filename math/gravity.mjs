
import {lnQuat} from "./lnQuatSq.mjs"

const g = [1, 10, 100, 1000];
const dT = [1, 0.1];
const D = [11, 20, 100, 1000, 100000, 1000000];

function getTime(D,g,dt ) {
	//g = BigInt(g)
	//dt = BigInt(dt)
	let V = 0;
	let P = D;//BigInt(D);
	let t = 0;
	let A = 0;
	let tick = 0;
        while( P > 10 ) {
			A = g/(P*P);
				V += A * dt;
		if( V > 299_792_458 * dt )  {
			V = 299_792_458 * dt;
			//break;
		}
		P -= V * dt;
		t += dt;
		tick++;
		//if( D < 20 )
		//console.log( "Tick:", tick, t, P, V, A );
        }
        return { t:t, V:V, P:P };
}


function Test() {
       	for( let tId = 0; tId < dT.length; tId++ ) {
		for( let gId = 0; gId < g.length; gId++ ) {
			for( let DId = 0; DId < D.length; DId++ ) {
                        	console.log( dT[tId], D[DId], g[gId], "result", getTime( D[DId], g[gId], dT[tId] ) );
	        	}
        	}

        }
}

//Test()

function Test2() {
	const V = new lnQuat( 0, 1, 0, 0).update();
	const G = new lnQuat( 0, 0, -0.1, 0 ).update();

	for( let t = 0; t < 100; t++ ) {
		//V.freeSpin( G.θ, G ); // torque
		V.add( G ); // linear accelerate

		console.log( V );
	}
}
Test2();