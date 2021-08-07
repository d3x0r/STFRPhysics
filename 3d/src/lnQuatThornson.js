import {lnQuat} from "./lnQuatSq.js"

let A,B,C,D,E,T;  // slider values
let showCoordinateGrid = false;
let drawNormalBall = false;



	const showFull = document.getElementById( "showFull" );
	const showTop = document.getElementById( "showTop" );
	const showBot = document.getElementById( "showBot" );


function DrawQuatNormals(normalVertices,normalColors) {
	const v = { x:0,y:0,z:1};

	const show_full = showFull.checked;
	const show_top = showTop.checked;
	const show_bot = showBot.checked;
        
	const spaceScale = 5;
	const normal_del = 2.92;
	const del_normal_del = 1000;
	const speed_normal_del = 50;        

       	const lnQ = new lnQuat( {x:Math.PI/2, y:0, z:0 } );
	let prior_v = {x:1, y:0, z:-1 };        
	let prior_del = {x:0.006, y:0, z:0.012 };
	const sum = {x:0, y:0, z:0 };

	const from = show_full?0:show_top?-Math.PI/2:(Math.PI/2);
	const to = show_full?Math.PI*2:show_top?Math.PI/2:(3*Math.PI/2);
let skipped = false;
//        for( let t = -Math.PI/2; t < 2*Math.PI/4; t += 2*Math.PI/1024 ) {
        for( let t = from; t < to; t += 2*Math.PI/1024 ) {
//        for( let t = 0; t < 2*Math.PI; t += 2*Math.PI/1024 ) {
       		const x = Math.sin(t );
       		const y = -Math.cos(t);
       		//const lnQ = new lnQuat( {x:x, y:0, z:z } );
        	lnQ.set( {x:0, z:0, y:0 }, false ).update();


                //lnQ.freeSpin( -t*2, v );
                lnQ.freeSpin( t*2, v );
                
			//const new_v = lnQ.up();
			const basis = lnQ.getBasis( );
		const new_v = {x:x, y:y, z:0 };

		const this_v = { x:basis.up.x*normal_del+new_v.x*spaceScale , y:basis.up.y*normal_del+new_v.y*spaceScale, z:basis.up.z*normal_del+new_v.z*spaceScale  };
		const this_speed = { x:this_v.x - prior_v.x , y:this_v.y - prior_v.y, z:this_v.z - prior_v.z  };

		const len = Math.sqrt( this_v.x*this_v.x+this_v.y*this_v.y+this_v.z*this_v.z );
		const del_v = {x:len*(this_speed.x  - prior_del.x)  // minus prior velocity...
		             , y:len*(this_speed.y  - prior_del.y)
		             , z:len*(this_speed.z  - prior_del.z) };
		//console.log( "len:", t, len, Math.sqrt( del_v.x*del_v.x+del_v.y*del_v.y+del_v.z*del_v.z) );
		if( Math.sqrt( del_v.x*del_v.x+del_v.y*del_v.y+del_v.z*del_v.z) > 2 ) {
skipped = true;}else
{
	skipped = false;
		sum.x += del_v.x
		sum.y += del_v.y
		sum.z += del_v.z
}
		prior_del = { x:(this_v.x - prior_v.x), y:(this_v.y - prior_v.y), z:(this_v.z - prior_v.z) };  // save this velocity as prior velocity
		// new position is new_v + up
		prior_v = this_v;
                        
                	normalVertices.push( new THREE.Vector3( 0                      , 0                     , 0 ))
			normalVertices.push( new THREE.Vector3(  del_v.x*del_normal_del, del_v.y*del_normal_del,  del_v.z*del_normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                        ,new_v.y*spaceScale                        ,0.1+ new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del,new_v.y*spaceScale + basis.up.y*normal_del,0.1+new_v.z*spaceScale + basis.up.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                                ,new_v.y*spaceScale                                 ,0.3+ new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + this_speed.x*speed_normal_del,new_v.y*spaceScale  + this_speed.y*speed_normal_del,0.3+new_v.z*spaceScale +  + this_speed.z*speed_normal_del ))
			if( skipped ) {
			normalColors.push( new THREE.Color( t/(2*Math.PI),1,1,255 ))
			normalColors.push( new THREE.Color( t/(2*Math.PI),1,1,255 ))
			normalColors.push( new THREE.Color( 1,t/(2*Math.PI),1,255 ))
			normalColors.push( new THREE.Color( 1,t/(2*Math.PI),1,255 ))
			normalColors.push( new THREE.Color( 1,1,t/(2*Math.PI),255))
			normalColors.push( new THREE.Color( 1,1,t/(2*Math.PI),255 ))
			} else {
			normalColors.push( new THREE.Color( t/(2*Math.PI),0,0,255 ))
			normalColors.push( new THREE.Color( t/(2*Math.PI),0,0,255 ))
			normalColors.push( new THREE.Color( 0,t/(2*Math.PI),0,255 ))
			normalColors.push( new THREE.Color( 0,t/(2*Math.PI),0,255 ))
			normalColors.push( new THREE.Color( 0,0,t/(2*Math.PI),255))
			normalColors.push( new THREE.Color( 0,0,t/(2*Math.PI),255 ))
				}
	
	}

                	normalVertices.push( new THREE.Vector3( 0                      , 0                     , 0.2 ))
			normalVertices.push( new THREE.Vector3(  sum.x/1024*del_normal_del, 0+sum.y/1024*del_normal_del,  0.2+sum.z/1024*del_normal_del ))
			normalColors.push( new THREE.Color( 1,1,1,1 ))
			normalColors.push( new THREE.Color( 1,1,1,1 ))
console.log( "Total:", sum.x, sum.y, sum.z );

}

window.DrawQuatPaths = DrawQuatPaths;
function DrawQuatPaths(normalVertices,normalColors) {

			let lnQX = document.getElementById( "lnQX" ).value;
			let lnQY = document.getElementById( "lnQY" ).value;
			let lnQZ = document.getElementById( "lnQZ" ).value;
			let lnQT = document.getElementById( "lnQT" ).value;
			let lnQA = document.getElementById( "lnQA" ).value;

			//A = (lnQX/10-5)/10;

			//let lnQ = new lnQuat(  { a:(lnQT/100+1)*(lnQX/10-5)/20 , b:(lnQT/100+1)*(B=(lnQY/10-5)/20) , c: (lnQT/100+1)*(C=(lnQZ/10-5)/20)  } );
			 T = (lnQT/500-1);
			E=lnQA/100;
			let lnQ = new lnQuat( 0, (A=lnQX/500-1) , (B=lnQY/500-1) , (C=lnQZ/500-1)   );
	A = A * Math.PI*4;
	B = B * Math.PI*2;
	C = C * Math.PI*4;
	T = T * Math.PI*4;
	E = E * 30;
	D = T ;
	//twistDelta = A;


	let check = document.getElementById( "showCoordinateGrid" );
	if( check ) {
		showCoordinateGrid = check.checked;
	}
	check = document.getElementById( "drawNormalBall" );
	if( check ) {
		drawNormalBall = check.checked;
	}
	document.getElementById( "lnQXval").textContent = A;
	document.getElementById( "lnQYval").textContent = B;
	document.getElementById( "lnQZval").textContent = C;
	document.getElementById( "lnQTval").textContent = T;
	document.getElementById( "lnQAval").textContent = E;

                        DrawQuatNormals(normalVertices,normalColors);

	const xAxis = {x:1,y:0,z:0};
	const yAxis = {x:0,y:1,z:0};
	const zAxis = {x:0,y:0,z:1};
	const cx = new THREE.Color( 192,192,0,255 );
	const cy = new THREE.Color( 128,128,128,255 );
	const cz = new THREE.Color( 0,192,192,255 );
//	QuatPathing2( lnQ, yAxis, cy,normalVertices,normalColors );

	//QuatPathing( lnQ, xAxis, cx,normalVertices,normalColors );
	//QuatPathing( lnQ, yAxis, cy,normalVertices,normalColors );
	//QuatPathing( lnQ, zAxis, cz,normalVertices,normalColors );
}


