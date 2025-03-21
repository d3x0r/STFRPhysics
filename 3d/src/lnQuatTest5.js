import {lnQuat} from "./lnQuatSq.js" 

let A,B,C,D,E,T;  // slider values
let twistDelta = 0;
let normalizeNormalTangent = false;
let xRot, yRot, zRot;
let AxRot, AyRot, AzRot;
let turnCount = 12;
let stepCount = 1000;
let showCoordinateGrid = false;
let showSpinChance = false;
let showSpinUp = false;
let drawNormalBall = false;
let twistCount = 1;
let limitCone = false;
let normalVertices = null;
let normalColors = null;
let showOnNormalBall = false;
let showTrajectories = false;

let priorPosx = {x:0,y:0,z:0};
let priorPosy = {x:0,y:0,z:0};
let priorPosz = {x:0,y:0,z:0};
let priorPosxyz = {x:0,y:0,z:0};
let stepx = {x:0.02, y:0, z:0 };
let stepy = {x:0, y:0.02, z:0 };
let stepz = {x:0, y:0, z:0.02 };
let stepxyz = {x:0.02, y:0.02, z:0.02 };

const spaceScale = 5;

function QuatPathing2(q, v, c,normalVertices,normalColors) {
	const normal_del = 0.5;
	const o = [0,0,0];//6/spaceScale,+6/spaceScale,+6/spaceScale];
	let prior = null;

	
	if( showTrajectories ) {
		priorPosx.x = 0;
		priorPosx.y = 0;
		priorPosx.z = 0;
		priorPosy.x = 0;
		priorPosy.y = 0;
		priorPosy.z = 0;
		priorPosz.x = 0;
		priorPosz.y = 0;
		priorPosz.z = 0;
		priorPosxyz.x = 0;
		priorPosxyz.y = 0;
		priorPosxyz.z = 0;
	}
	const lATC = Math.sqrt(A*A+T*T+C*C);
	const lA = Math.sqrt(AxRot*AxRot+AyRot*AyRot+AzRot*AzRot);
	const lB = Math.sqrt(xRot*xRot+yRot*yRot+zRot*zRot);
	
			normalVertices.push( new THREE.Vector3( (0)*spaceScale ,(0)*spaceScale    , (0)*spaceScale ))
			normalVertices.push( new THREE.Vector3( (A/lATC*2*Math.PI)*spaceScale   ,(T/lATC*2*Math.PI)*spaceScale      , (C/lATC*2*Math.PI)*spaceScale  ))
			normalColors.push( new THREE.Color( 0,1.0,0,255 ))
			normalColors.push( new THREE.Color( 0,1.0,0,255 ))

			normalVertices.push( new THREE.Vector3( (0)*spaceScale ,(0)*spaceScale    , (0)*spaceScale ))
			normalVertices.push( new THREE.Vector3( (xRot/lB*2*Math.PI)*spaceScale   ,(yRot/lB*2*Math.PI)*spaceScale      , (zRot/lB*2*Math.PI)*spaceScale  ))
			normalColors.push( new THREE.Color( 1.0,0,0,255 ))
			normalColors.push( new THREE.Color( 1.0,0,0,255 ))

			normalVertices.push( new THREE.Vector3( (0)*spaceScale ,(0)*spaceScale    , (0)*spaceScale ))
			normalVertices.push( new THREE.Vector3( (AxRot/lB*2*Math.PI)*spaceScale   ,(AyRot/lA*2*Math.PI)*spaceScale      , (AzRot/lA*2*Math.PI)*spaceScale  ))
			normalColors.push( new THREE.Color( 0,0,1.0,255 ))
			normalColors.push( new THREE.Color( 0,0,1.0,255 ))
	const steps = stepCount;
	const subSteps = turnCount;//Math.sqrt(steps);
		prior = null;

	 const lnQ0 = new lnQuat(  0, T*A/lATC, T*B/lATC, T*C/lATC ).update();
if(0)
	for( let nTotal = 0; nTotal < steps; nTotal++ ) {
        //const t = (Math.PI*4)* subSteps*((fibre + Math.PI)/(Math.PI*4) %(1/subSteps)) - (Math.PI*2);
		const fibre = nTotal * ( 4*Math.PI ) / ( steps );
        const fiberPart =((fibre + 1*Math.PI)/(Math.PI*2) %(1/subSteps));
		const t = (Math.PI*4)* subSteps*(fiberPart) - (Math.PI*2);
		

		const lnQ = new lnQuat( lnQ0 )
                    	.freeSpin( fibre, {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA} )
                        .freeSpin( t, {x:xRot/lB, y:yRot/lB, z:zRot/lB } );


		if( showTrajectories ) {
			const newDelx = lnQ.apply( stepx );
			const newDely = lnQ.apply( stepy );
			const newDelz = lnQ.apply( stepz );
			const newDelxyz = lnQ.apply( stepxyz );
		
			normalVertices.push( new THREE.Vector3( (priorPosx.x)*spaceScale             ,(priorPosx.y)*spaceScale                , (priorPosx.z)*spaceScale ))
			normalVertices.push( new THREE.Vector3( (priorPosx.x+newDelx.x)*spaceScale   ,(priorPosx.y+newDelx.y)*spaceScale      , (priorPosx.z+newDelx.z)*spaceScale  ))
			normalVertices.push( new THREE.Vector3( (priorPosy.x)*spaceScale             ,(priorPosy.y)*spaceScale                , (priorPosy.z)*spaceScale ))
			normalVertices.push( new THREE.Vector3( (priorPosy.x+newDely.x)*spaceScale   ,(priorPosy.y+newDely.y)*spaceScale      , (priorPosy.z+newDely.z)*spaceScale  ))
			normalVertices.push( new THREE.Vector3( (priorPosz.x)*spaceScale             ,(priorPosz.y)*spaceScale                , (priorPosz.z)*spaceScale ))
			normalVertices.push( new THREE.Vector3( (priorPosz.x+newDelz.x)*spaceScale   ,(priorPosz.y+newDelz.y)*spaceScale      , (priorPosz.z+newDelz.z)*spaceScale  ))
			normalVertices.push( new THREE.Vector3( (priorPosxyz.x)*spaceScale             ,(priorPosxyz.y)*spaceScale                , (priorPosxyz.z)*spaceScale ))
			normalVertices.push( new THREE.Vector3( (priorPosxyz.x+newDelxyz.x)*spaceScale   ,(priorPosxyz.y+newDelxyz.y)*spaceScale      , (priorPosxyz.z+newDelxyz.z)*spaceScale  ))
			priorPosx.x += newDelx.x;
			priorPosx.y += newDelx.y;
			priorPosx.z += newDelx.z;
			priorPosy.x += newDely.x;
			priorPosy.y += newDely.y;
			priorPosy.z += newDely.z;
			priorPosz.x += newDelz.x;
			priorPosz.y += newDelz.y;
			priorPosz.z += newDelz.z;
			priorPosxyz.x += newDelxyz.x;
			priorPosxyz.y += newDelxyz.y;
			priorPosxyz.z += newDelxyz.z;
			normalColors.push( new THREE.Color( 0.6,0.6,0,255 ))
			normalColors.push( new THREE.Color( 0.6,0.6,0,255 ))
			normalColors.push( new THREE.Color( 0.6,0,0.6,255 ))
			normalColors.push( new THREE.Color( 0.6,0,0.6,255 ))
			normalColors.push( new THREE.Color( 0,0.6,0.6,255 ))
			normalColors.push( new THREE.Color( 0,0.6,0.6,255 ))
			normalColors.push( new THREE.Color( 0.6,0.6,0.6,255 ))
			normalColors.push( new THREE.Color( 0.6,0.6,0.6,255 ))
		}

		if(showOnNormalBall) 		
			drawN( lnQ );
		else
			doDrawBasis( lnQ, fibre, true );
		
	}

	if( showCoordinateGrid  ) {
		const range = (  2 ) * Math.PI;
		const minRange = (0 ) * Math.PI;
		drawRange( 0,0,0, range, 12*Math.PI, Math.PI*2 );
	}
	return;

	// graph of location to rotation... 
	function drawRange( cx,cy,cz,range,steps, minr, invert ) {
		
		if( !minr ) minr = 0;
		minr = minr*minr;
		const r = range*range;
		const normLen = 0.15*(steps/range);
		const lnQ = new lnQuat(  );
		for( let x = -range; x <= range;  x += (2*range)/steps ) {
			for( let y = -range; y <= range;  y += (2*range)/steps ) {
				for( let z = -range; z <= range; z += (2*range)/steps ) {
				const l = x*x+y*y+z*z;
				if( l > r ) continue;
				//if( l > minr ) continue;
				lnQ.set( 0, cx+x, cy+y, cz+z );
				const basis = lnQ.getBasis( );
	                        let ox_,oy_,oz_;
	                        let ox_2,oy_2,oz_2;
	                        let ox,oy,oz;
                			ox = lnQ.x;
                			oy = lnQ.y;
	                		oz = lnQ.z;

//sin(2th)=sin(th)sin(th)

	// these are angle off-of axis
	// while x,y,z are around axis
						//ox = Math.asin( lnQ.nx ) * lnQ.θ;
						//oy = Math.asin( lnQ.ny ) * lnQ.θ;
						//oz = Math.asin( lnQ.nz ) * lnQ.θ;

						//ox_ = Math.PI*2*(Math.sin( (1+lnQ.nx)*Math.PI/4 ) *Math.sin( (1+lnQ.nx)*Math.PI/4 ) - 0.0);
						//oy_ = Math.PI*2*(Math.sin( (1+lnQ.ny)*Math.PI/4 ) *Math.sin( (1+lnQ.ny)*Math.PI/4 ) - 0.0);
						//oz_ = Math.PI*2*(Math.sin( (1+lnQ.nz)*Math.PI/4 ) *Math.sin( (1+lnQ.nz)*Math.PI/4 ) - 0.0);
if( limitCone ) {
//if( ox_ > 0.95*Math.PI*2 ) continue
//if( oy_ > 0.95*Math.PI*2 ) continue
if( oz_ > 0.95*Math.PI*2 ) continue
//if( ox_ < 0.05*Math.PI*2 ) continue
//if( oy_ < 0.05*Math.PI*2 ) continue
if( oz_ < 0.05*Math.PI*2 ) continue
}
                                if( showSpinChance ) {
	                                if( showSpinUp ) {
					// 1/sqrt(3),1/sqrt(3),1/sqrt(3) 
						//0.57735026918962576450914878050196
						// 1.238846746625 (1.577*pi/4)
						// 0.945408798178208552786628648355
						// 0.89379779567276467139841057011364% up
						ox_ = Math.PI*2*(Math.sin( (1+lnQ.nx)*Math.PI/4 ) *Math.sin( (1+lnQ.nx)*Math.PI/4 ) - 0.0);
						oy_ = Math.PI*2*(Math.sin( (1+lnQ.ny)*Math.PI/4 ) *Math.sin( (1+lnQ.ny)*Math.PI/4 ) - 0.0);
						oz_ = Math.PI*2*(Math.sin( (1+lnQ.nz)*Math.PI/4 ) *Math.sin( (1+lnQ.nz)*Math.PI/4 ) - 0.0);
                                	} else {

						ox_ = Math.PI*2*Math.sin( (1-lnQ.nx)*Math.PI/4 ) *Math.sin( (1-lnQ.nx)*Math.PI/4 );
						oy_ = Math.PI*2*Math.sin( (1-lnQ.ny)*Math.PI/4 ) *Math.sin( (1-lnQ.ny)*Math.PI/4 );
						oz_ = Math.PI*2*Math.sin( (1-lnQ.nz)*Math.PI/4 ) *Math.sin( (1-lnQ.nz)*Math.PI/4 );
	                                }
			        }
			        else
				{
                			ox_ = ox;
                			oy_ = oy;
                			oz_ = oz;
        		        }

					const	spinUp = Math.PI*2*(Math.sin( (1+lnQ.nz)*Math.PI/4 ) *Math.sin( (1+lnQ.nz)*Math.PI/4 ) - 0.0);
	if(0){
				normalVertices.push( new THREE.Vector3( ox*spaceScale                             ,oy*spaceScale                             , oz*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox_*spaceScale  ,oy_*spaceScale , oz_*spaceScale ))

				normalColors.push( new THREE.Color( 1,1,1,0.5 ))
				normalColors.push( new THREE.Color( 1,1,1,0.5 ))
	}

				normalVertices.push( new THREE.Vector3( ox_*spaceScale                                     ,oy_*spaceScale                                     , oz_*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox_*spaceScale + 2*lnQ.nx*normal_del/normLen       ,oy_*spaceScale + 2*lnQ.ny*normal_del /normLen      , oz_*spaceScale + 2*lnQ.nz*normal_del/normLen ))
				                                                                                                                                                    
		                                                                                                                                                                    
				normalVertices.push( new THREE.Vector3( ox_*spaceScale                                     ,oy_*spaceScale                                     , oz_*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox_*spaceScale + basis.right.x*normal_del/normLen  ,oy_*spaceScale + basis.right.y*normal_del /normLen , oz_*spaceScale + basis.right.z*normal_del/normLen ))
				                                                                                                                                                    
				normalVertices.push( new THREE.Vector3( ox_*spaceScale                                     ,oy_*spaceScale                                     , oz_*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox_*spaceScale + basis.up.x*normal_del/normLen     ,oy_*spaceScale + basis.up.y*normal_del/normLen     , oz_*spaceScale + basis.up.z*normal_del/normLen ))
				                                                                                                                                                    
				normalVertices.push( new THREE.Vector3( ox_*spaceScale                                     ,oy_*spaceScale                                     , oz_*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox_*spaceScale + basis.forward.x*normal_del/normLen,oy_*spaceScale + basis.forward.y*normal_del/normLen, oz_*spaceScale + basis.forward.z*normal_del/normLen ))
	        

				normalColors.push( new THREE.Color( 1*spinUp/(Math.PI*2),1*spinUp/(Math.PI*2),0,255 ))
				normalColors.push( new THREE.Color( 1*spinUp/(Math.PI*2),1*spinUp/(Math.PI*2),0,255 ))
				normalColors.push( new THREE.Color( 1,0,0,255 ))
				normalColors.push( new THREE.Color( 1,0,0,255 ))
				normalColors.push( new THREE.Color( 0,1,0,255 ))
				normalColors.push( new THREE.Color( 0,1,0,255 ))
				normalColors.push( new THREE.Color( 0,0,1,255))
				normalColors.push( new THREE.Color( 0,0,1,255 ))
				
					
				}
				
			}
			
		}
	
	}

	function doDrawBasis(lnQ2, fibre ) {
		const basis = lnQ2.update().getBasis( );
		normalVertices.push( new THREE.Vector3( (lnQ2.x)*spaceScale                             ,((lnQ2.y))*spaceScale                             , ((lnQ2.z))*spaceScale ))
		normalVertices.push( new THREE.Vector3( (lnQ2.x)*spaceScale + basis.right.x*normal_del  ,((lnQ2.y))*spaceScale + basis.right.y*normal_del  , ((lnQ2.z))*spaceScale + basis.right.z*normal_del ))
		                                                                                                                                               
		normalVertices.push( new THREE.Vector3( (lnQ2.x)*spaceScale                             ,((lnQ2.y))*spaceScale                             , ((lnQ2.z))*spaceScale ))
		normalVertices.push( new THREE.Vector3( (lnQ2.x)*spaceScale + basis.up.x*normal_del     ,((lnQ2.y))*spaceScale + basis.up.y*normal_del     , ((lnQ2.z))*spaceScale + basis.up.z*normal_del ))
		                                                                                                                                               
		normalVertices.push( new THREE.Vector3( (lnQ2.x)*spaceScale                             ,((lnQ2.y))*spaceScale                             , ((lnQ2.z))*spaceScale ))
		normalVertices.push( new THREE.Vector3( (lnQ2.x)*spaceScale + basis.forward.x*normal_del,((lnQ2.y))*spaceScale + basis.forward.y*normal_del, ((lnQ2.z))*spaceScale + basis.forward.z*normal_del ))


		        {
				//const s = t / (Math.PI*4);
				const s = (fibre ) / (Math.PI*2);
				normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
				normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
			}

		if( prior ) {
			const s = (fibre ) / (Math.PI*2);
			normalVertices.push( new THREE.Vector3( ((prior.x))*spaceScale ,(prior.y)*spaceScale    , (prior.z)*spaceScale ))
			normalVertices.push( new THREE.Vector3( ((lnQ2.x))*spaceScale   ,(lnQ2.y)*spaceScale    , (lnQ2.z)*spaceScale  ))
			if( lnQ2.θ > Math.PI ) {
				normalColors.push( new THREE.Color( 1.0*s,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 1.0*s,1.0*s,0,255 ))
			}else {
				normalColors.push( new THREE.Color( 0,1.0*s,1.0*s,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,1.0*s,255 ))
			}
			prior.θ = lnQ2.θ;
			prior.nx = lnQ2.nx;
			prior.ny = lnQ2.ny;
			prior.nz = lnQ2.nz;
			prior.x = lnQ2.x;
			prior.y = lnQ2.y;
			prior.z = lnQ2.z;
		}else prior = { θ:lnQ2.θ, nx:lnQ2.nx,ny:lnQ2.ny,nz:lnQ2.nz,x:lnQ2.x,y:lnQ2.y,z:lnQ2.z }

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



	//const spaceScale = 5;
	const normal_del = 0.25;
	const v = { x:0,y:4,z:0};
//	const v = { x:1,y:1,z:1};

function DrawQuatNormals(normalVertices,normalColors) {
	//drawN( new lnQuat( {x:0,y:1,z:0 } ), {x:0,y:1,z:0} );
	//drawN( new lnQuat( {x:0,y:-1,z:0 } ), {x:0,y:-1,z:0} );
	if(drawNormalBall/*draw normal ball with twist*/)
		for( let h = 1*-1; h <= 1; h+= 0.1/2 ) {
			for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
				let x = Math.sin(t );
				const z = Math.cos(t);
				const lnQ = new lnQuat( {x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) } );
				//lnQ.twist( twistDelta );
				drawN( lnQ );
			}
		}
	if(0)
		for( x = -Math.PI*4;x < Math.PI*4; x+= 0.5 )
		for( y = -Math.PI*4;y < Math.PI*4; y+= 0.5 )
		for( z = -Math.PI*4;z < Math.PI*4; z+= 0.5 )
		 {
			{
				const lnQ = new lnQuat( 0,x,y,z );
				drawN( lnQ );
			}
		}


	if(0)
		for( let h = -1; h <= 1; h+= 0.25 ) {
			if( h < 0.6 ) continue;
		for( let t = Math.PI; t < Math.PI*3/2; t+= 0.25 ){
				let x = Math.sin(t );
				const z = Math.cos(t);
				const lnQ = new lnQuat( {x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) } );
			drawN( lnQ );
		}
	}


}

	function drawN( lnQ )
	{
			const new_v = lnQ.apply( v );
			const basis = lnQ.getBasis( );

			// the original normal direction; projected offset of sphere (linear scaled)
			//normalVertices.push( new THREE.Vector3( x*spaceScale,y*spaceScale, z*spaceScale ))
			//normalVertices.push( new THREE.Vector3( x*spaceScale + x*l*normal_del,y*spaceScale + y*l*normal_del,z*spaceScale + z*l*normal_del ))
			//normalColors.push( new THREE.Color( 255,0,255,255 ))
			//normalColors.push( new THREE.Color( 255,0,255,255 ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                             ,new_v.y*spaceScale                             , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.right.x*normal_del  ,new_v.y*spaceScale + basis.right.y*normal_del  ,new_v.z*spaceScale + basis.right.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                             ,new_v.y*spaceScale                             , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del     ,new_v.y*spaceScale + basis.up.y*normal_del     ,new_v.z*spaceScale + basis.up.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale                             ,new_v.y*spaceScale                             , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.forward.x*normal_del,new_v.y*spaceScale + basis.forward.y*normal_del,new_v.z*spaceScale + basis.forward.z*normal_del ))

			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 255,0,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,255,0,255 ))
			normalColors.push( new THREE.Color( 0,0,255,255))
			normalColors.push( new THREE.Color( 0,0,255,255 ))
			
	
	}

window.DrawQuatPaths = DrawQuatPaths;
export function DrawQuatPaths(normalVertices_,normalColors_) {
	normalVertices = normalVertices_
	normalColors = normalColors_;

	showSpinUp = document.getElementById( "showSpinUp" )?.checked;
        showSpinChance = document.getElementById( "showSpinChance" )?.checked;
	showOnNormalBall = document.getElementById( "showOnNormalBall" )?.checked;
	showTrajectories = document.getElementById( "showTrajectories" )?.checked;
        let curSliders = {
	};
			let lnQX = document.getElementById( "lnQX" ).value;
			let lnQY = document.getElementById( "lnQY" ).value;
			let lnQZ = document.getElementById( "lnQZ" ).value;
			let lnQT = document.getElementById( "lnQT" ).value;
			let lnQA = document.getElementById( "lnQA" ).value;

	curSliders.lnQX = lnQX;
	curSliders.lnQY = lnQY;
	curSliders.lnQZ = lnQZ;
	curSliders.lnQT = lnQT;
	curSliders.lnQA = lnQA;


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
	curSliders.xRot = tmp;	
	xRot = tmp / 500 - 1;
	tmp = document.getElementById( "BXval" );
	if( tmp ) tmp.textContent = xRot;
	tmp = document.getElementById( "yRot" ).value;
	curSliders.yRot = tmp;	
	yRot = tmp / 500 - 1;
	tmp = document.getElementById( "BYval" );
	if( tmp ) tmp.textContent = yRot;
	tmp = document.getElementById( "zRot" ).value;
	curSliders.zRot = tmp;	
	zRot = tmp / 500 - 1;
	tmp = document.getElementById( "BZval" );
	if( tmp ) tmp.textContent = zRot;

	tmp = document.getElementById( "AxRot" ).value;
	curSliders.AxRot = tmp;	
	AxRot = tmp / 500 - 1;
	tmp = document.getElementById( "AXval" );
	if( tmp ) tmp.textContent = AxRot;
	tmp = document.getElementById( "AyRot" ).value;
	curSliders.AyRot = tmp;	
	AyRot = tmp / 500 - 1;
	tmp = document.getElementById( "AYval" );
	if( tmp ) tmp.textContent = AyRot;
	tmp = document.getElementById( "AzRot" ).value;
	curSliders.AzRot = tmp;	
	AzRot = tmp / 500 - 1;
	tmp = document.getElementById( "AZval" );
	if( tmp ) tmp.textContent = AzRot;

	//console.log( "Current Sliders", curSliders );

	showCoordinateGrid = document.getElementById( "showCoordinateGrid" )?.checked;

	let check = document.getElementById( "drawNormalBall" );
	if( check ) {
		drawNormalBall = check.checked;
	}

	document.getElementById( "lnQXval").textContent = A;
	document.getElementById( "lnQYval").textContent = B;
	document.getElementById( "lnQZval").textContent = C;
	document.getElementById( "lnQTval").textContent = T;
	document.getElementById( "lnQAval").textContent = ((E/3)|0)-4;

	tmp = document.getElementById( "turnCounter" );
	turnCount = tmp.value;
	tmp = document.getElementById( "stepCounter" );
	stepCount = tmp.value * 250 ;

	lnQuat.sinNormal = !document.getElementById( "SinNormalizeRRF" )?.checked;

	check = document.getElementById( "normalizeTangents");
	if( check )
		normalizeNormalTangent = check.checked; // global variable from lnQuat.js

        //DrawQuatNormals(normalVertices,normalColors);

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


export function updateShapes( shapes ) {
return;
	const atTick = Date.now();
	const nTotal = ( ( (atTick )/(turnCount*5000) ) %1) * stepCount *turnCount/10;

	const lATC = Math.sqrt(A*A+T*T+C*C);
	const steps = stepCount;
	const subSteps = turnCount;//Math.sqrt(steps);
	
	const lnQ0 = new lnQuat(  0, T*A/lATC, T*B/lATC, T*C/lATC ).update();
	
        //const t = (Math.PI*4)* subSteps*((fibre + Math.PI)/(Math.PI*4) %(1/subSteps)) - (Math.PI*2);
		const fibre = nTotal * ( 4*Math.PI ) / ( steps );
        const fiberPart =((fibre + 1*Math.PI)/(Math.PI*2) %(1/subSteps));
		const t = (Math.PI*4)* subSteps*(fiberPart) - (Math.PI*2);
		

		const lA = Math.sqrt(AxRot*AxRot+AyRot*AyRot+AzRot*AzRot);
		const lB = Math.sqrt(xRot*xRot+yRot*yRot+zRot*zRot);
		const lnQ = new lnQuat( lnQ0 )
                    	.freeSpin( fibre, {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA} )
                        .freeSpin( t, {x:xRot/lB, y:yRot/lB, z:zRot/lB } );

	lnQ.exp( shapes[0].quaternion );
	lnQ.exp( shapes[1].quaternion );
	shapes[1].position.set( lnQ.x*spaceScale, lnQ.y*spaceScale, lnQ.z*spaceScale );
}