
let A,B,C,D;  // slider values


function QuatPathing2(q, v, c,normalVertices,normalColors) {
	const spaceScale = 5;
	const normal_del = 1;
	const o = [6/spaceScale,+6/spaceScale,+6/spaceScale];

	const ax = Math.abs(A);
	const ay = 0;//Math.abs(B);
	const az = Math.abs(C);
	const angleSum = ax+ay+az;    // max x/y/z

	//const lnQ = new lnQuat( {a:2*Math.PI/3,b:2*Math.PI/3,c:2*Math.PI/3} );
	let lnQ = new lnQuat( {a:A,b:0*B,c:C} );
	//0.53118619792
		
//	drawBasis( lnQ, 1.0 );
	let qBasis;
	lnQt = new lnQuat( qBasis = lnQ.getBasis() );
	drawBasis( lnQt, 1.0 );

        //lnQ.x /= 2;
	//lnQ.z /= 2;
	let lnQP = null;
	const n = lnQ.apply( {x:0,y:1,z:0} );
	
	if(1){ // this ends up rotated 180 degrees.
		let lnQtmp = new lnQuat( {a:lnQ.x,b:lnQ.y,c:lnQ.z} );
		lnQtmp.twist( B*Math.PI/2);
		drawBasis( lnQtmp, 1.0 );
	}

	return;

		function drawBasis( lnQ,T )
		{
			const new_v = lnQ.applyDel( {x:0,y:1,z:0}, T );

			// draw path leading up to 1.0....
			let prior_v = null;
			for( var t = 0; t<= 1; t+=0.05 ) {
				const new_v = lnQ.applyDel( v, t );
	                
				new_v.x += o[0];new_v.y += o[1];new_v.z += o[2];
					if( prior_v ) {
						normalVertices.push( new THREE.Vector3( prior_v.x*spaceScale,prior_v.y*spaceScale, prior_v.z*spaceScale ))
						normalVertices.push( new THREE.Vector3( new_v.x*spaceScale,new_v.y*spaceScale, new_v.z*spaceScale ))
						normalColors.push( c)
						normalColors.push( c)
					}
					prior_v = new_v;
	                
			};
			
			new_v.x += o[0];new_v.y += o[1];new_v.z += o[2];
			const basis = lnQ.getBasis();//{ up:lnQ.applyDel( {x:0,y:1,z:0} ),right:lnQ.applyDel( {x:1,y:0,z:0} ),forward:lnQ.applyDel( {x:0,y:0,z:1} )};
			
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                           ,new_v.y*spaceScale                           , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.right.x*normal_del,new_v.y*spaceScale + basis.right.y*normal_del, new_v.z*spaceScale + basis.right.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                        ,new_v.y*spaceScale                        , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del,new_v.y*spaceScale + basis.up.y*normal_del,new_v.z*spaceScale + basis.up.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                             ,new_v.y*spaceScale                             , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.forward.x*normal_del,new_v.y*spaceScale + basis.forward.y*normal_del,new_v.z*spaceScale + basis.forward.z*normal_del ))

			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,0,255,255))
			normalColors.push( new THREE.Color( 0,0,255,255 ))

		}
}


function QuatPathing(q_, v, c,normalVertices,normalColors) {
	const spaceScale = 5;
	const normal_del = 1;
	const q = new lnQuat( {a:q_.x, b:q_.y, c:q_.z} );

	const o = [6/spaceScale,+6/spaceScale,+6/spaceScale];
	let prior_v = null;
	for( var x = -0.0; x < 0.25; x+= 0.02 ) {
		q.twist( x );
		prior_v = null;        	
		var t = 0;
		for( ; t <= 1; t+=0.1 ) {
			
			const new_v = q.applyDel( v, t );
			new_v.x += o[0];new_v.y += o[1];new_v.z += o[2];
				if( prior_v ) {
					normalVertices.push( new THREE.Vector3( prior_v.x*spaceScale,prior_v.y*spaceScale, prior_v.z*spaceScale ))
					normalVertices.push( new THREE.Vector3( new_v.x*spaceScale,new_v.y*spaceScale, new_v.z*spaceScale ))
					normalColors.push( c)
					normalColors.push( c)
				}
				prior_v = new_v;
			if( (t % 0.750 ) <= 0.01 || t >=0.99  ) {
				const basis = q.getBasisT( t );
	        
				normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                           ,new_v.y*spaceScale                           , new_v.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.right.x*normal_del,new_v.y*spaceScale + basis.right.y*normal_del, new_v.z*spaceScale + basis.right.z*normal_del ))
	        
				normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                        ,new_v.y*spaceScale                        , new_v.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del,new_v.y*spaceScale + basis.up.y*normal_del,new_v.z*spaceScale + basis.up.z*normal_del ))
	        
				normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                             ,new_v.y*spaceScale                             , new_v.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.forward.x*normal_del,new_v.y*spaceScale + basis.forward.y*normal_del,new_v.z*spaceScale + basis.forward.z*normal_del ))
	        
				normalColors.push( new THREE.Color( 255,0,0,255 ))
				normalColors.push( new THREE.Color( 255,0,0,255 ))
				normalColors.push( new THREE.Color( 0,255,0,255 ))
				normalColors.push( new THREE.Color( 0,255,0,255 ))
				normalColors.push( new THREE.Color( 0,0,255,255))
				normalColors.push( new THREE.Color( 0,0,255,255 ))
	        
			}
		};
	}
}


function DrawQuatNormals(normalVertices,normalColors) {
	const v = { x:0,y:1,z:0};
	const spaceScale = 5;
	const normal_del = 1;
	if(0)
	for( let t = 0.1; t < 1.1*Math.PI; t+= 0.05 ){
			const x = Math.sin(t );
			const z = -Math.cos(t);
			const lnQ = new lnQuat( {x:x, y:0, z:z } );

			const new_v = lnQ.apply( v );

			const basis = lnQ.getBasis( );

			// the original normal direction; projected offset of sphere (linear scaled)
			//normalVertices.push( new THREE.Vector3( x*spaceScale,0*spaceScale, z*spaceScale ))
			//normalVertices.push( new THREE.Vector3( x*spaceScale + 1*normal_del,0*spaceScale + 1*normal_del,z*spaceScale + 1*normal_del ))
			//normalColors.push( new THREE.Color( 255,0,255,255 ))
			//normalColors.push( new THREE.Color( 255,0,255,255 ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                           ,new_v.y*spaceScale                           , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.right.x*normal_del,new_v.y*spaceScale + basis.right.y*normal_del, new_v.z*spaceScale + basis.right.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                        ,new_v.y*spaceScale                        , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del,new_v.y*spaceScale + basis.up.y*normal_del,new_v.z*spaceScale + basis.up.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                             ,new_v.y*spaceScale                             , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.forward.x*normal_del,new_v.y*spaceScale + basis.forward.y*normal_del,new_v.z*spaceScale + basis.forward.z*normal_del ))

			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,0,255,255))
			normalColors.push( new THREE.Color( 0,0,255,255 ))
			
	
	}
	drawN( new lnQuat( {x:0,y:1,z:0 } ), {x:0,y:1,z:0} );
	drawN( new lnQuat( {x:0,y:-1,z:0 } ), {x:0,y:-1,z:0} );
if(1)
	for( let h = 1*-1; h <= 1; h+= 0.1/2 ) {
		for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
			let x = Math.sin(t );
			const z = Math.cos(t);
			let norm ;
			const lnQ = new lnQuat( norm={x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) } );
		drawN( lnQ, norm );
	}
	}

	if(0)
	for( let h = -1; h <= 1; h+= 0.25 ) {
		if( h < 0.6 ) continue;
	for( let t = Math.PI; t < Math.PI*3/2; t+= 0.25 ){
			let x = Math.sin(t );
			const z = Math.cos(t);
			let norm ;
			const lnQ = new lnQuat( norm={x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) } );
		drawN( lnQ, norm );
	}
	}
	function drawN( lnQ, n )
	{
			const new_v = lnQ.apply( v );

			const basis = lnQ.getBasis( );

			// the original normal direction; projected offset of sphere (linear scaled)
			//normalVertices.push( new THREE.Vector3( x*spaceScale,y*spaceScale, z*spaceScale ))
			//normalVertices.push( new THREE.Vector3( x*spaceScale + x*l*normal_del,y*spaceScale + y*l*normal_del,z*spaceScale + z*l*normal_del ))
			//normalColors.push( new THREE.Color( 255,0,255,255 ))
			//normalColors.push( new THREE.Color( 255,0,255,255 ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale,new_v.y*spaceScale, new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.right.x*normal_del,new_v.y*spaceScale + basis.right.y*normal_del,new_v.z*spaceScale + basis.right.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                        ,new_v.y*spaceScale                        , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del,new_v.y*spaceScale + basis.up.y*normal_del,new_v.z*spaceScale + basis.up.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                             ,new_v.y*spaceScale                             , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.forward.x*normal_del,new_v.y*spaceScale + basis.forward.y*normal_del,new_v.z*spaceScale + basis.forward.z*normal_del ))

			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,0,255,255))
			normalColors.push( new THREE.Color( 0,0,255,255 ))
			
	
	}


}
function DrawQuatPaths(normalVertices,normalColors) {

			let lnQX = document.getElementById( "lnQX" ).value;
			let lnQY = document.getElementById( "lnQY" ).value;
			let lnQZ = document.getElementById( "lnQZ" ).value;
			let lnQT = document.getElementById( "lnQT" ).value;

			//A = (lnQX/10-5)/10;

			//let lnQ = new lnQuat(  { a:(lnQT/100+1)*(lnQX/10-5)/20 , b:(lnQT/100+1)*(B=(lnQY/10-5)/20) , c: (lnQT/100+1)*(C=(lnQZ/10-5)/20)  } );
			T = ((lnQT+1)/21);
			let lnQ = new lnQuat(  { a:T*(A=lnQX/10-5) , b:T*(B=lnQY/10-5) , c:T*(C=lnQZ/10-5)  } );
	A = A;
	B = B;
	C = C;
	D = T;
twistDelta = A;


	document.getElementById( "lnQXval").textContent = A;
	document.getElementById( "lnQYval").textContent = B;
	document.getElementById( "lnQZval").textContent = C;
	document.getElementById( "lnQTval").textContent = T;

                        DrawQuatNormals(normalVertices,normalColors);

	const xAxis = {x:1,y:0,z:0};
	const yAxis = {x:0,y:1,z:0};
	const zAxis = {x:0,y:0,z:1};
	const cx = new THREE.Color( 192,192,0,255 );
	const cy = new THREE.Color( 128,128,128,255 );
	const cz = new THREE.Color( 0,192,192,255 );
	QuatPathing2( lnQ, yAxis, cy,normalVertices,normalColors );

	//QuatPathing( lnQ, xAxis, cx,normalVertices,normalColors );
	//QuatPathing( lnQ, yAxis, cy,normalVertices,normalColors );
	//QuatPathing( lnQ, zAxis, cz,normalVertices,normalColors );
}


