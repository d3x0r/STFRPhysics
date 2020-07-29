
let A,B,C,D,E;  // slider values
let xRot, yRot, zRot;
let showCoordinateGrid = false;
let drawNormalBall = false;
let showInvCoordinateGrid = false;
let showRawCoordinateGrid = false;


let showRaw = true;  // just raw x/y/z at x/y/z
let shownRnL = true;  // p * nL / nR
let shownL = true;  //  p / nL
let shownR = true;  // p.n(xyz)  p / nR

function QuatPathing2(q, v, c,normalVertices,normalColors) {
	var priorHere;
	const spaceScale = 5;
	const normal_del = 1;
	const o = [0,0,0];//6/spaceScale,+6/spaceScale,+6/spaceScale];

	const ax = Math.abs(A);
	const ay = 0;//Math.abs(B);
	const az = Math.abs(C);
	const angleSum = ax+ay+az;    // max x/y/z

	//const lnQ = new lnQuat( {a:2*Math.PI/3,b:2*Math.PI/3,c:2*Math.PI/3} );
	let lnQ = new lnQuat( {a:A,b:T,c:C} );
	//0.53118619792
		
//	drawBasis( lnQ, 1.0 );
	//let qBasis;
	//lnQt = new lnQuat( qBasis = lnQ.getBasis() );
	let lnQtmp = null;
	if(1){ // this ends up rotated 180 degrees.
		lnQtmp = new lnQuat( {a:lnQ.x,b:lnQ.y,c:lnQ.z} );
        	//lnQtmp.spin( B*Math.PI/2, {x:xRot, y:yRot, z:zRot });
        	lnQtmp.yaw( B );
        	drawBasis( lnQtmp, 1.0, false );
	}
	drawBasis( lnQ, 1.0, true );
        	let lnQP = null;
		

	return;

		function drawBasis( lnQ,T, doTwist )
		{

			let new_v = lnQ.applyDel( {x:0,y:1,z:0}, 1.0 );

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
			//new_v.x += o[0];new_v.y += o[1];new_v.z += o[2];
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
				normalVertices.push( new THREE.Vector3( (o[0]+1*2*Math.PI)*spaceScale         ,(o[1]+0*2)*spaceScale  ,(o[2]+ 0*2)*spaceScale ))
				normalVertices.push( new THREE.Vector3( (o[0]+0*2*Math.PI)*spaceScale           ,(o[1]+0*2)*spaceScale    ,(o[2]+0*2)*spaceScale  ))
				normalColors.push( new THREE.Color( 1,0,0,255 ))
				normalColors.push( new THREE.Color( 1,1,1,255 ))
				normalVertices.push( new THREE.Vector3( (o[0]+0*2)*spaceScale           ,(o[1]+1*2*Math.PI)*spaceScale  ,(o[2]+ 0*2)*spaceScale ))
				normalVertices.push( new THREE.Vector3( (o[0]+0*2)*spaceScale           ,(o[1]+0*2*Math.PI)*spaceScale    ,(o[2]+0*2)*spaceScale  ))
				normalColors.push( new THREE.Color( 0,1,0,255 ))
				normalColors.push( new THREE.Color( 1,1,1,255 ))
				normalVertices.push( new THREE.Vector3( (o[0]+0*2)*spaceScale           ,(o[1]+0*2)*spaceScale    ,(o[2]+ 1*2*Math.PI)*spaceScale ))
				normalVertices.push( new THREE.Vector3( (o[0]+0*2)*spaceScale           ,(o[1]+0*2)*spaceScale    ,(o[2]+ 0*2*Math.PI)*spaceScale  ))
				normalColors.push( new THREE.Color( 0,0,1,255 ))
				normalColors.push( new THREE.Color( 1,1,1,255 ))


			normalVertices.push( new THREE.Vector3( lnQ.x/lnQ.nL*spaceScale                             ,lnQ.y/lnQ.nL*spaceScale                             , lnQ.z/lnQ.nL*spaceScale ))
			normalVertices.push( new THREE.Vector3( lnQ.x/lnQ.nL*spaceScale + basis.right.x*4*normal_del,lnQ.y/lnQ.nL*spaceScale + basis.right.y*4*normal_del, lnQ.z/lnQ.nL*spaceScale + basis.right.z*4*normal_del ))

			normalVertices.push( new THREE.Vector3( lnQ.x/lnQ.nL*spaceScale                          ,lnQ.y/lnQ.nL*spaceScale                          , lnQ.z/lnQ.nL*spaceScale ))
			normalVertices.push( new THREE.Vector3( lnQ.x/lnQ.nL*spaceScale + basis.up.x*4*normal_del,lnQ.y/lnQ.nL*spaceScale + basis.up.y*4*normal_del, lnQ.z/lnQ.nL*spaceScale + basis.up.z*4*normal_del ))

			normalVertices.push( new THREE.Vector3( lnQ.x/lnQ.nL*spaceScale                               ,lnQ.y/lnQ.nL*spaceScale                               , lnQ.z/lnQ.nL*spaceScale ))
			normalVertices.push( new THREE.Vector3( lnQ.x/lnQ.nL*spaceScale + basis.forward.x*4*normal_del,lnQ.y/lnQ.nL*spaceScale + basis.forward.y*4*normal_del, lnQ.z/lnQ.nL*spaceScale + basis.forward.z*4*normal_del ))

			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,0,255,255))
			normalColors.push( new THREE.Color( 0,0,255,255 ))


			if( doTwist )
			{
				const zz = 0;
				//for( let zz = 0; zz < 1; zz++ ) 
				{
				const new_v_ = lnQ.applyDel( {x:0,y:1,z:0}, 0.5 );
				let new_v = { x:lnQ.ny * new_v_.z - new_v_.y * lnQ.nz
			                    , y:lnQ.nz * new_v_.x - new_v_.z * lnQ.nx
			                    , z:lnQ.nx * new_v_.y - new_v_.x * lnQ.ny
						};

				const lnv = Math.sqrt(new_v.x*new_v.x + new_v.y*new_v.y + new_v.z*new_v.z );
				new_v.x /= lnv;
				new_v.y /= lnv;
				new_v.z /= lnv;
				const q = lnQ;
			{
			        const qq = lnQ;//tmp ;
				const s = Math.sin(qq.nL); // * 2 * 0.5
				const c = 1 - Math.cos(qq.nL); // * 2 * 0.5

				const testRight = { x :     ( c ) * qq.nx*qq.ny           - s * qq.nz 
				                    , y : 1 - ( c ) * ( qq.nz*qq.nz +  qq.nx*qq.nx  ) 
				                    , z :     ( c ) * qq.ny*qq.nz           + s * qq.nx 			
				}
				// up is testForward cross qq.normal; this version is from raw qq.
				const testUp = { x:          ( c ) * ( qq.ny*qq.ny*qq.nz + qq.nz*qq.nz*qq.nz + qq.nx*qq.nx*qq.nz )  + s * qq.ny*qq.nx   - qq.nz 
			                       , y:  - s * ( qq.nz*qq.nz + qq.nx * qq.nx  )
			                       , z: qq.nx - ( c ) * ( qq.nx*qq.nz*qq.nz + qq.nx*qq.nx*qq.nx + qq.nx*qq.ny*qq.ny )  + s * qq.nz*qq.ny 
				};

				const nRup = Math.sqrt(testUp.x*testUp.x + testUp.y*testUp.y + testUp.z*testUp.z );
				//console.log( "up cross:", nRup );

				testUp.x /= nRup;
				testUp.y /= nRup;
				testUp.z /= nRup;
	  

			        const right = testRight;//new_v_2;

				const up = testUp;//new_v;

				let new_v_2 = { x: right.y * up.z - right.z * up.y 
				              , y: right.z * up.x - right.x * up.z
				              , z: right.x * up.y - right.y * up.x 
				              };
				// this cross product is normalized because the others are themselves orthagonal and 
				// normalized

			        const forward = new_v_2;


				// curve normal/up/right
				normalVertices.push( new THREE.Vector3( (o[0]+0*up.x*2)*spaceScale         ,(o[1]+0*up.y*2)*spaceScale  ,(o[2]+ 0*up.z*2)*spaceScale ))
				normalVertices.push( new THREE.Vector3( (o[0]+up.x*2)*spaceScale           ,(o[1]+up.y*2)*spaceScale    ,(o[2]+up.z*2)*spaceScale  ))
				normalColors.push( new THREE.Color( 0.25,1,0.25,255 ))
				normalColors.push( new THREE.Color( 0.25,1,0.25,255 ))


				normalVertices.push( new THREE.Vector3( (o[0]+0*forward.x*2)*spaceScale         ,(o[1]+0*forward.y*2)*spaceScale  ,(o[2]+ 0*forward.z*2)*spaceScale ))
				normalVertices.push( new THREE.Vector3( (o[0]+forward.x*2)*spaceScale           ,(o[1]+forward.y*2)*spaceScale    ,(o[2]+forward.z*2)*spaceScale  ))
				normalColors.push( new THREE.Color( 0,0,1,255 ))
				normalColors.push( new THREE.Color( 0,0,1,255 ))

				normalVertices.push( new THREE.Vector3( (o[0]+0*right.x*2)*spaceScale         ,(o[1]+0*right.y*2)*spaceScale  ,(o[2]+ 0*right.z*2)*spaceScale ))
				normalVertices.push( new THREE.Vector3( (o[0]+right.x*2)*spaceScale           ,(o[1]+right.y*2)*spaceScale    ,(o[2]+right.z*2)*spaceScale  ))
				normalColors.push( new THREE.Color( 1,0,0,255 ))
				normalColors.push( new THREE.Color( 1,0,0,255 ))
			        
			        // plane notations of angle intersection points
				{
					
					let xz =2* up.y/(Math.abs( up.y)+Math.abs( up.z));
					let xy =2* -up.z/(Math.abs( up.y)+Math.abs( up.z));

					let yz =2* -up.x/(Math.abs( up.z)+Math.abs( up.x));
					let yx =2* up.z/(Math.abs( up.z)+Math.abs( up.x));

					let zy =2* up.x/(Math.abs( up.x)+Math.abs( up.y));
					let zx =2* -up.y/(Math.abs( up.x)+Math.abs( up.y));
					
					// these are the plane crossings - where we need to change the iterator...
					/*
					let xz = up.y;
					let xy = -up.z;
					xy = xy / Math.sqrt(xy*xy + xz*xz);
					xz = xz / Math.sqrt(xy*xy + xz*xz);
			        
					let yz = -up.x;
					let yx = up.z;
					yx = yx / Math.sqrt(yx*yx + yz*yz);
					yz = yz / Math.sqrt(yx*yx + yz*yz);

					let zy = up.x;
					let zx = -up.y;
					zx = zx / Math.sqrt(zx*zx + zy*zy);
					zy = zy / Math.sqrt(zx*zx + zy*zy);
			                */

					normalVertices.push( new THREE.Vector3( (o[0]+0)*spaceScale         ,(o[1]+xy)*spaceScale  ,(o[2]+xz)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+0)*spaceScale         ,(o[1]+xy)*spaceScale  ,(o[2]+0)*spaceScale  ))
					normalColors.push( new THREE.Color( 1,0.5,0.5,255 ))
					normalColors.push( new THREE.Color( 1,0.5,0.5,255 ))
			        
					normalVertices.push( new THREE.Vector3( (o[0]+0)*spaceScale         ,(o[1]+xy)*spaceScale  ,(o[2]+xz)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+0)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]+xz)*spaceScale  ))
					normalColors.push( new THREE.Color( 1,0.5,0.5,255 ))
					normalColors.push( new THREE.Color( 1,0.5,0.5,255 ))
					normalVertices.push( new THREE.Vector3( (o[0]+0)*spaceScale         ,(o[1]-xy)*spaceScale  ,(o[2]-xz)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+0)*spaceScale         ,(o[1]-xy)*spaceScale  ,(o[2]+0)*spaceScale  ))
					normalColors.push( new THREE.Color( 1,0.5,0.5,255 ))
					normalColors.push( new THREE.Color( 1,0.5,0.5,255 ))
			        
					normalVertices.push( new THREE.Vector3( (o[0]+0)*spaceScale         ,(o[1]-xy)*spaceScale  ,(o[2]-xz)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+0)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]-xz)*spaceScale  ))
					normalColors.push( new THREE.Color( 1,0.5,0.5,255 ))
					normalColors.push( new THREE.Color( 1,0.5,0.5,255 ))
			        
			        
					normalVertices.push( new THREE.Vector3( (o[0]+yx)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]+yz)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+0 )*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]+yz)*spaceScale  ))
					normalColors.push( new THREE.Color( 0.5,1,0.5,255 ))
					normalColors.push( new THREE.Color( 0.5,1,0.5,255 ))
			        
					normalVertices.push( new THREE.Vector3( (o[0]+yx)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]+yz)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+yx)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]+0)*spaceScale  ))
					normalColors.push( new THREE.Color( 0.5,1,0.5,255 ))
					normalColors.push( new THREE.Color( 0.5,1,0.5,255 ))
			        
					normalVertices.push( new THREE.Vector3( (o[0]-yx)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]-yz)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+0 )*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]-yz)*spaceScale  ))
					normalColors.push( new THREE.Color( 0.5,1,0.5,255 ))
					normalColors.push( new THREE.Color( 0.5,1,0.5,255 ))
			        
					normalVertices.push( new THREE.Vector3( (o[0]-yx)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]-yz)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]-yx)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]+0)*spaceScale  ))
					normalColors.push( new THREE.Color( 0.5,1,0.5,255 ))
					normalColors.push( new THREE.Color( 0.5,1,0.5,255 ))
			        
					normalVertices.push( new THREE.Vector3( (o[0]+zx)*spaceScale        ,(o[1]+zy)*spaceScale  ,(o[2]+0)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]  )*spaceScale         ,(o[1]+zy)*spaceScale  ,(o[2]+0)*spaceScale  ))
					normalColors.push( new THREE.Color( 0.5,0.5,1,255 ))
					normalColors.push( new THREE.Color( 0.5,0.5,1,255 ))
			        
					normalVertices.push( new THREE.Vector3( (o[0]+zx)*spaceScale         ,(o[1]+zy)*spaceScale  ,(o[2]+0)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+zx)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]+0)*spaceScale  ))
					normalColors.push( new THREE.Color( 0.5,0.5,1,255 ))
					normalColors.push( new THREE.Color( 0.5,0.5,1,255 ))

					normalVertices.push( new THREE.Vector3( (o[0]-zx)*spaceScale        ,(o[1]-zy)*spaceScale  ,(o[2]+0)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]  )*spaceScale         ,(o[1]-zy)*spaceScale  ,(o[2]+0)*spaceScale  ))
					normalColors.push( new THREE.Color( 0.5,0.5,1,255 ))
					normalColors.push( new THREE.Color( 0.5,0.5,1,255 ))
			        
					normalVertices.push( new THREE.Vector3( (o[0]-zx)*spaceScale         ,(o[1]-zy)*spaceScale  ,(o[2]+0)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]-zx)*spaceScale         ,(o[1]+0)*spaceScale  ,(o[2]+0)*spaceScale  ))
					normalColors.push( new THREE.Color( 0.5,0.5,1,255 ))
					normalColors.push( new THREE.Color( 0.5,0.5,1,255 ))
				}


			}
			const lnQTwist = new lnQuat( Math.PI/2, {x:q.y * new_v.z - new_v.y * q.z
			                                        ,y:q.z * new_v.x - new_v.z * q.x
			                                        ,z:q.x * new_v.y - new_v.x * q.y
						} );
			let lnQ2 = new lnQuat( {a:lnQ.x,b:lnQ.y,c:lnQ.z} );
			lnQ2.octave = (E|0)||1;
			//lnQ2.twist( -Math.PI ).update();
			let minL = 10;
			let maxL = -10;

if(1)
			//for( var t = -Math.PI/2; t<= Math.PI/2; t+=0.01 *(1/(E/2)) ) {
			//lnQ2.twist( B-Math.PI/32).update();

			document.getElementById( "lnQ2Xval").textContent = lnQ2.x  / (lnQ2.nR);
			document.getElementById( "lnQ2Yval").textContent = lnQ2.y  / (lnQ2.nR);
			document.getElementById( "lnQ2Zval").textContent = lnQ2.z  / (lnQ2.nR);
			for( var t = 0*Math.PI/16; t<= 4*Math.PI; t+=0.08*(1/(E/0.5)) ) {
				let lnQ2 = new lnQuat( {a:lnQ.x,b:lnQ.y,c:lnQ.z} );
				if(0)
				if( zz == 0 ) 
					lnQ2.twist( 0.08*(1/(E/0.5)) ).update();
				else if( zz == 1 )
					lnQ2.roll( 0.08*(1/(E/0.5)) ).update();
				else
					lnQ2.yaw( 0.08*(1/(E/0.5)) ).update();

				// this version never escapes an octive.
                                //lnQ2.yaw( 0.08*(1/(E/0.5)) ).update();

                                //lnQ2.yaw( t );
				//lnQ2.pitch( 0.08*(1/(E/0.5)) ).update();
				lnQ2.spin( t/* *0.08*(1/(E/0.5))*/, {x:xRot, y:yRot, z:zRot } );
				//lnQTwist.apply( lnQ2, 0.1 ).update();
				// this shows the normalized path - easier to isolate twist axis....
				if( lnQ2.nL < minL ) minL = lnQ2.nL;
				if( lnQ2.nL > maxL ) maxL = lnQ2.nL;


				if( showRaw  ) {
					// this has accelerations, not just ping-ponging limits... (but those walls may be rotation artifacts and reflections)
					doDrawBasis( lnQ2, t, x=>x );
				}

		        
				if( shownL ) {
					// this has accelerations, not just ping-ponging limits... (but those walls may be rotation artifacts and reflections)
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/lnQ2.nL)*spaceScale - 0.5 * normal_del   ,(o[1]+lnQ2.y/lnQ2.nL)*spaceScale                     , (o[2]+lnQ2.z/lnQ2.nL)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/lnQ2.nL)*spaceScale + 0.5 * normal_del   ,(o[1]+lnQ2.y/lnQ2.nL)*spaceScale                     , (o[2]+lnQ2.z/lnQ2.nL)*spaceScale ))
			                                                                                                                                                                  
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/lnQ2.nL)*spaceScale                      ,(o[1]+lnQ2.y/lnQ2.nL)*spaceScale - 0.5 * normal_del  , (o[2]+lnQ2.z/lnQ2.nL)*spaceScale  ))
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/lnQ2.nL)*spaceScale                      ,(o[1]+lnQ2.y/lnQ2.nL)*spaceScale + 0.5 * normal_del  , (o[2]+lnQ2.z/lnQ2.nL)*spaceScale  ))
			                                                                                                                                                                  
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/lnQ2.nL)*spaceScale                      ,(o[1]+lnQ2.y/lnQ2.nL)*spaceScale                     , (o[2]+lnQ2.z/lnQ2.nL)*spaceScale - 0.5 * normal_del  ))
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/lnQ2.nL)*spaceScale                      ,(o[1]+lnQ2.y/lnQ2.nL)*spaceScale                     , (o[2]+lnQ2.z/lnQ2.nL)*spaceScale + 0.5 * normal_del  ))
			                if( t == 0 ) {
						normalColors.push( new THREE.Color( 1.0,0.6,0.6,255 ))
						normalColors.push( new THREE.Color( 1.0,0.6,0.6,255 ))
						normalColors.push( new THREE.Color( 0.6,1.0,0.6,255 ))
						normalColors.push( new THREE.Color( 0.6,1.0,0.6,255 ))
						normalColors.push( new THREE.Color( 0.6,0.6,1.0,255))
						normalColors.push( new THREE.Color( 0.6,0.6,1.0,255 ))
					} else if( Math.abs( t-B) < 0.01 ) {
						normalColors.push( new THREE.Color( 1.0,0.3,0.3,255 ))
						normalColors.push( new THREE.Color( 1.0,0.3,0.3,255 ))
						normalColors.push( new THREE.Color( 0.3,1.0,0.3,255 ))
						normalColors.push( new THREE.Color( 0.3,1.0,0.3,255 ))
						normalColors.push( new THREE.Color( 0.3,0.3,1.0,255))
						normalColors.push( new THREE.Color( 0.3,0.3,1.0,255 ))
	                                
					} else {
					normalColors.push( new THREE.Color( 0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 0,0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,0,0.5,255))
					normalColors.push( new THREE.Color( 0,0,0.5,255 ))
				        
					}
				}

		        
				if(shownR) {
					const sx = 1;//lnQ2.x < 0?-1:1;// 
					const sy = 1;//lnQ2.y < 0?-1:1;// 
					const sz = 1;//lnQ2.z < 0?-1:1;// 
					const lnn = Math.abs( lnQ2.x )+Math.abs( lnQ2.y )+Math.abs( lnQ2.z );
					const sqn = Math.sqrt( lnQ2.x*lnQ2.x + lnQ2.y*lnQ2.y + lnQ2.z*lnQ2.z );///(lnn);
					const frst = (t === B )?3:1;
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/sqn )*spaceScale - 0.5 * frst*normal_del  ,(o[1]+sy*lnQ2.y/sqn)*spaceScale                            , (o[2]+sz*lnQ2.z/sqn)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/sqn)*spaceScale + 0.5 * frst* normal_del  ,(o[1]+sy*lnQ2.y/sqn)*spaceScale                            , (o[2]+sz*lnQ2.z/sqn)*spaceScale ))
				                                                                                                                                                                                    
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/sqn)*spaceScale                           ,(o[1]+sy*lnQ2.y/sqn)*spaceScale - 0.5 *  frst*normal_del   , (o[2]+sz*lnQ2.z/sqn)*spaceScale  ))
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/sqn)*spaceScale                           ,(o[1]+sy*lnQ2.y/sqn)*spaceScale + 0.5 *  frst*normal_del   , (o[2]+sz*lnQ2.z/sqn)*spaceScale  ))
				                                                                                                                                                                                      
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/sqn)*spaceScale                           ,(o[1]+sy*lnQ2.y/sqn)*spaceScale                            , (o[2]+sz*lnQ2.z/sqn)*spaceScale - 0.5 *  frst*normal_del  ))
					normalVertices.push( new THREE.Vector3( (o[0]+lnQ2.x/sqn)*spaceScale                           ,(o[1]+sy*lnQ2.y/sqn)*spaceScale                            , (o[2]+sz*lnQ2.z/sqn)*spaceScale + 0.5 *  frst*normal_del  ))
				        
					normalColors.push( new THREE.Color( 255,0,0,255 ))
					normalColors.push( new THREE.Color( 255,0,0,255 ))
					normalColors.push( new THREE.Color( 0,255,0,255 ))
					normalColors.push( new THREE.Color( 0,255,0,255 ))
					normalColors.push( new THREE.Color( 0,0,255,255))
					normalColors.push( new THREE.Color( 0,0,255,255 ))
				        
				}
		        

		if(1) { // graph of rotations...
				//console.log( "TICK", zz, t, E, lnQ2.i );
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale - 0.5 * normal_del   ,(o[1]+(lnQ2.nL*2))*spaceScale                     , (o[2]+(0))*spaceScale ))
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale + 0.5 * normal_del   ,(o[1]+(lnQ2.nL*2))*spaceScale                     , (o[2]+(0))*spaceScale ))
				                                                                                                                 
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale                      ,(o[1]+(lnQ2.nL*2))*spaceScale - 0.5 * normal_del  , (o[2]+(0))*spaceScale  ))
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale                      ,(o[1]+(lnQ2.nL*2))*spaceScale + 0.5 * normal_del  , (o[2]+(0))*spaceScale  ))
				                                                                                                                 
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale                      ,(o[1]+(lnQ2.nL*2))*spaceScale                     , (o[2]+(0))*spaceScale - 0.5 * normal_del  ))
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale                      ,(o[1]+(lnQ2.nL*2))*spaceScale                     , (o[2]+(0))*spaceScale + 0.5 * normal_del  ))


			        if( Math.abs(t) < 0.05 ) {
					normalColors.push( new THREE.Color( 1.0,0.6,0.6,255 ))
					normalColors.push( new THREE.Color( 1.0,0.6,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,1.0,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,1.0,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,0.6,1.0,255))
					normalColors.push( new THREE.Color( 0.6,0.6,1.0,255 ))
				} else if( Math.abs( t-B) < 0.05 ) {
					normalColors.push( new THREE.Color( 1.0,0.3,0.3,255 ))
					normalColors.push( new THREE.Color( 1.0,0.3,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,1.0,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,1.0,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,0.3,1.0,255))
					normalColors.push( new THREE.Color( 0.3,0.3,1.0,255 ))
	
				} else {
					normalColors.push( new THREE.Color( 0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 0,0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,0,0.5,255 ))
					normalColors.push( new THREE.Color( 0,0,0.5,255 ))
				}
		}

		if(1) { // graph of angle around curve...
			if( priorHere ) {
				const dot = priorHere.x * lnQ2.nx + priorHere.y * lnQ2.ny + priorHere.z * lnQ2.nz;
				const val = (acos(dot))*100 ;
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale - 0.5 * normal_del   ,(o[1]+(val))*spaceScale                     , (o[2]+(0))*spaceScale ))
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale + 0.5 * normal_del   ,(o[1]+(val))*spaceScale                     , (o[2]+(0))*spaceScale ))
				                                                                                                                                
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale                      ,(o[1]+(val))*spaceScale - 0.5 * normal_del  , (o[2]+(0))*spaceScale  ))
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale                      ,(o[1]+(val))*spaceScale + 0.5 * normal_del  , (o[2]+(0))*spaceScale  ))
				                                                                                                                                
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale                      ,(o[1]+(val))*spaceScale                     , (o[2]+(0))*spaceScale - 0.5 * normal_del  ))
				normalVertices.push( new THREE.Vector3( (o[0]+(t))*spaceScale                      ,(o[1]+(val))*spaceScale                     , (o[2]+(0))*spaceScale + 0.5 * normal_del  ))


			        if( Math.abs(t) < 0.05 ) {
					normalColors.push( new THREE.Color( 1.0,0.6,0.6,255 ))
					normalColors.push( new THREE.Color( 1.0,0.6,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,1.0,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,1.0,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,0.6,1.0,255))
					normalColors.push( new THREE.Color( 0.6,0.6,1.0,255 ))
				} else if( Math.abs( t-B) < 0.05 ) {
					normalColors.push( new THREE.Color( 1.0,0.3,0.3,255 ))
					normalColors.push( new THREE.Color( 1.0,0.3,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,1.0,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,1.0,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,0.3,1.0,255))
					normalColors.push( new THREE.Color( 0.3,0.3,1.0,255 ))
	
				} else {
					normalColors.push( new THREE.Color( 0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 0,0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,0,0.5,255 ))
					normalColors.push( new THREE.Color( 0,0,0.5,255 ))
				}
			}
			priorHere = { x:lnQ2.nx, y:lnQ2.ny, z:lnQ2.nz };
		}

		if(shownRnL) { // recti-linear scaled points ... 
			doDrawBasis( lnQ2, t, (x)=>x*(lnQ2.nL*2)/lnQ2.nR );
		}

		function doDrawBasis(lnQ2,t,f,n ) {
			const basis = lnQ2.getBasis( );
			normalVertices.push( new THREE.Vector3( (f(n?lnQ2.nx:lnQ2.x))*spaceScale                             ,(f(n?lnQ2.ny:lnQ2.y))*spaceScale                             , (f(lnQ2.z))*spaceScale ))
			normalVertices.push( new THREE.Vector3( (f(n?lnQ2.nx:lnQ2.x))*spaceScale + basis.right.x*normal_del  ,(f(n?lnQ2.ny:lnQ2.y))*spaceScale + basis.right.y*normal_del  , (f(lnQ2.z))*spaceScale + basis.right.z*normal_del ))
			                                                                                                                                                                   
			normalVertices.push( new THREE.Vector3( (f(n?lnQ2.nx:lnQ2.x))*spaceScale                             ,(f(n?lnQ2.ny:lnQ2.y))*spaceScale                             , (f(lnQ2.z))*spaceScale ))
			normalVertices.push( new THREE.Vector3( (f(n?lnQ2.nx:lnQ2.x))*spaceScale + basis.up.x*normal_del     ,(f(n?lnQ2.ny:lnQ2.y))*spaceScale + basis.up.y*normal_del     , (f(lnQ2.z))*spaceScale + basis.up.z*normal_del ))
			                                                                                                                                                                   
			normalVertices.push( new THREE.Vector3( (f(n?lnQ2.nx:lnQ2.x))*spaceScale                             ,(f(n?lnQ2.ny:lnQ2.y))*spaceScale                             , (f(lnQ2.z))*spaceScale ))
			normalVertices.push( new THREE.Vector3( (f(n?lnQ2.nx:lnQ2.x))*spaceScale + basis.forward.x*normal_del,(f(n?lnQ2.ny:lnQ2.y))*spaceScale + basis.forward.y*normal_del, (f(lnQ2.z))*spaceScale + basis.forward.z*normal_del ))

			        if( t == 0 ) {
					normalColors.push( new THREE.Color( 1.0,0.6,0.6,255 ))
					normalColors.push( new THREE.Color( 1.0,0.6,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,1.0,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,1.0,0.6,255 ))
					normalColors.push( new THREE.Color( 0.6,0.6,1.0,255))
					normalColors.push( new THREE.Color( 0.6,0.6,1.0,255 ))
				} else if( Math.abs( t-B) < 0.05 ) {
					normalColors.push( new THREE.Color( 1.0,0.3,0.3,255 ))
					normalColors.push( new THREE.Color( 1.0,0.3,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,1.0,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,1.0,0.3,255 ))
					normalColors.push( new THREE.Color( 0.3,0.3,1.0,255))
					normalColors.push( new THREE.Color( 0.3,0.3,1.0,255 ))
	
				} else {
					normalColors.push( new THREE.Color( 0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 0,0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,0,0.5,255 ))
					normalColors.push( new THREE.Color( 0,0,0.5,255 ))
				}

		}
	}		        
	if( showCoordinateGrid || showInvCoordinateGrid || showRawCoordinateGrid ) {
		const range = (Math.floor(E) + 2 ) * Math.PI;
		const minRange = (Math.floor(E) +1 ) * Math.PI;
		drawRange( 0,0,0, range, 20, minRange, showRawCoordinateGrid, showInvCoordinateGrid );
	}
	// graph of location to rotation... 
	function drawRange( cx,cy,cz,range,steps, minr, unscaled, invert ) {
		
		if( !minr ) minr = 0;
		const normLen = 0.5*(steps/range);
	for( let x = -range; x <= range;  x += (2*range)/steps ) {
		for( let y = -range; y <= range;  y += (2*range)/steps ) {
			for( let z = -range; z <= range; z += (2*range)/steps ) {
				const lnQ = new lnQuat( {a:cx+x, b:cy+y, c:cz+z } );
			const basis = lnQ.getBasis( );
			if( (Math.abs(z)+Math.abs(y)+Math.abs(x)) < minr ) continue;

			// the original normal direction; projected offset of sphere (linear scaled)
			//normalVertices.push( new THREE.Vector3( x*spaceScale,0*spaceScale, z*spaceScale ))
			//normalVertices.push( new THREE.Vector3( x*spaceScale + 1*normal_del,0*spaceScale + 1*normal_del,z*spaceScale + 1*normal_del ))
			//normalColors.push( new THREE.Color( 255,0,255,255 ))
			//normalColors.push( new THREE.Color( 255,0,255,255 ))

			const nL = (Math.abs(lnQ.x) + Math.abs(lnQ.y) + Math.abs(lnQ.z))/2;
			//const nR = Math.sqrt( lnQ.x*lnQ.x+lnQ.y*lnQ.y+lnQ.z*lnQ.z );
			const ox = unscaled?lnQ.x:(invert?lnQ.x*lnQ.nR/lnQ.nL/2:lnQ.nL*lnQ.nx);
			const oy = unscaled?lnQ.y:(invert?lnQ.y*lnQ.nR/lnQ.nL/2:lnQ.nL*lnQ.ny);
			const oz = unscaled?lnQ.z:(invert?lnQ.z*lnQ.nR/lnQ.nL/2:lnQ.nL*lnQ.nz);

	
			normalVertices.push( new THREE.Vector3( ox*spaceScale                             ,oy*spaceScale                             , oz*spaceScale ))
			normalVertices.push( new THREE.Vector3( ox*spaceScale + basis.right.x*normal_del/normLen  ,oy*spaceScale + basis.right.y*normal_del /normLen , oz*spaceScale + basis.right.z*normal_del/normLen ))
			                                                                                                                                
			normalVertices.push( new THREE.Vector3( ox*spaceScale                             ,oy*spaceScale                             , oz*spaceScale ))
			normalVertices.push( new THREE.Vector3( ox*spaceScale + basis.up.x*normal_del/normLen     ,oy*spaceScale + basis.up.y*normal_del/normLen     , oz*spaceScale + basis.up.z*normal_del/normLen ))
			                                                                                                                                
			normalVertices.push( new THREE.Vector3( ox*spaceScale                             ,oy*spaceScale                             , oz*spaceScale ))
			normalVertices.push( new THREE.Vector3( ox*spaceScale + basis.forward.x*normal_del/normLen,oy*spaceScale + basis.forward.y*normal_del/normLen, oz*spaceScale + basis.forward.z*normal_del/normLen ))

			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,0,255,255))
			normalColors.push( new THREE.Color( 0,0,255,255 ))
			
				
			}
			
		}
		
	}
	
	}
			 //console.log( "MINMAX:", minL, maxL, minL+maxL );
			}
			}
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
	const spaceScale = 3;
	const normal_del = 0.25;
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
if(drawNormalBall/*draw normal ball with twist*/)
	for( let h = 1*-1; h <= 1; h+= 0.1/2 ) {
		for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
			let x = Math.sin(t );
			const z = Math.cos(t);
			let norm ;
			const lnQ = new lnQuat( norm={x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) } );
			//lnQ.twist( twistDelta );
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
			let lnQA = document.getElementById( "lnQA" ).value;

			//A = (lnQX/10-5)/10;

			//let lnQ = new lnQuat(  { a:(lnQT/100+1)*(lnQX/10-5)/20 , b:(lnQT/100+1)*(B=(lnQY/10-5)/20) , c: (lnQT/100+1)*(C=(lnQZ/10-5)/20)  } );
			T = (lnQT/500-1);
			E=lnQA/100;
			let lnQ = new lnQuat(  { a:(A=lnQX/500-1) , b:(B=lnQY/500-1) , c:(C=lnQZ/500-1)  } );
	A = A * Math.PI*4;
	B = B * Math.PI*4;
	C = C * Math.PI*4;
	T = T * Math.PI*4;
	E = E * 30;
	D = T ;
	twistDelta = A;

	let tmp;
	tmp = document.getElementById( "xRot" ).value;
	xRot = tmp / 500 - 1;
	tmp = document.getElementById( "yRot" ).value;
	yRot = tmp / 500 - 1;
	tmp = document.getElementById( "zRot" ).value;
	zRot = tmp / 500 - 1;


	let check = document.getElementById( "showCoordinateGrid" );
	if( check ) {
		showCoordinateGrid = check.checked;
	}
	check = document.getElementById( "drawNormalBall" );
	if( check ) {
		drawNormalBall = check.checked;
	}

	check = document.getElementById( "showInvCoordinateGrid" );
	if( check ) {
		showInvCoordinateGrid = check.checked;
	}
	check = document.getElementById( "showRawCoordinateGrid" );
	if( check ) {
		showRawCoordinateGrid = check.checked;
	}

	check = document.getElementById( "showRaw" );
	if( check ) {
		showRaw = check.checked;
	}
	check = document.getElementById( "shownRnL" );
	if( check ) {
		shownRnL = check.checked;
	}
	check = document.getElementById( "shownR" );
	if( check ) {
		shownR = check.checked;
	}
	check = document.getElementById( "shownL" );
	if( check ) {
		shownL = check.checked;
	}


	document.getElementById( "lnQXval").textContent = A;
	document.getElementById( "lnQYval").textContent = B;
	document.getElementById( "lnQZval").textContent = C;
	document.getElementById( "lnQTval").textContent = T;
	document.getElementById( "lnQAval").textContent = E;

	check = document.getElementById( "normalizeTangents");
	if( check )
		normalizeNormalTangent = check.checked; // global variable from lnQuat.js

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


