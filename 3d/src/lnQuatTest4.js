import {lnQuat} from "./lnQuatSq.js" 

let A,B,C,D,E,T;  // slider values
let twistDelta = 0;
let normalizeNormalTangent = false;
let xRot, yRot, zRot;
let AxRot, AyRot, AzRot;
let turnCount = 12;
let stepCount = 1000;
let showCoordinateGrid = false;
let drawNormalBall = false;
let twistCount = 1;
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
let externalSpin = true;
let useQuaternion = false;
let useStepFunction = false;
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
	const lABC = Math.sqrt(A*A+B*B+C*C);
	const lA = Math.sqrt(AxRot*AxRot+AyRot*AyRot+AzRot*AzRot);
	const lB = Math.sqrt(xRot*xRot+yRot*yRot+zRot*zRot);
	
			normalVertices.push( new THREE.Vector3( (0)*spaceScale ,(0)*spaceScale    , (0)*spaceScale ))
			normalVertices.push( new THREE.Vector3( (A/lABC*2*Math.PI)*spaceScale   ,(T/lABC*2*Math.PI)*spaceScale      , (C/lABC*2*Math.PI)*spaceScale  ))
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

	 const lnQ0 = new lnQuat(  0, T*A/lABC, T*B/lABC, T*C/lABC ).update();

	var dq = new THREE.Quaternion( Math.sin( T/2 ) * A/lABC,  Math.sin( T/2 ) * B/lABC, Math.sin( T/2 ) * C/lABC, Math.cos( T/2 ) );
	const lnQq = new lnQuat();
	const axis1 = {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA};
	const axis2 = {x:xRot/lB, y:yRot/lB, z:zRot/lB };

	const fiberStep = ( 4*Math.PI ) / ( steps );
	const fiberPartStep = ((fiberStep + 1*Math.PI)/(Math.PI*2) %(2/subSteps));
	let lnQ_=new lnQuat().set( lnQ0);
	for( let nTotal = 0; nTotal < steps; nTotal++ ) {
        //const t = (Math.PI*4)* subSteps*((fibre + Math.PI)/(Math.PI*4) %(1/subSteps)) - (Math.PI*2);
		let fibre = (nTotal/steps)/*0-1*/ * (4*Math.PI ) ;
		const divs = 2;
		switch( divs ) {
		case 2:
			switch( turnCount % 2){
				case 0: break;
				case 1: 
					fibre /= 2;
					break;
			}
			break;
		case 3:
			switch( turnCount % 3){
				case 0: break;
				case 1: case 2: 
					fibre *= 3;
					break;
			}
			break;
		case 4:
			switch( turnCount % 4){
				case 0: break;
				case 1: fibre *= 2; break; 
				case 2: fibre /= 2; break;
				case 3: fibre *= 2; break;
			}
			break;
		case 5:
			switch( turnCount % 6){
				case 0: break;
				default: 
					fibre *= 5;
					break;
			}
			break;
		case 6:
			switch( turnCount % 6){
				case 0: break;
				case 1: 
					fibre *= 2;
					break;
				case 2: 
					fibre *= 3;
					break;
				case 3: 
					fibre *= 2;
					break;
				case 4: 
					fibre *= 3;
					break;
				case 5: 
					fibre *= 2;
					break;
			}
			break;
		case 24:
			switch( turnCount % 24){
				case 0: break;
				default: break;
				case 1:fibre *= 12; break; 
				case 2:fibre *= 6; break; 
				case 3:fibre *= 4; break; 
				case 4:fibre *= 1.5; break; 
				case 5:fibre *= 12; break; 
				case 6:fibre *= 2; break; 
				case 7:fibre *= 12; break; 
				case 8:fibre *= 3; break; 
				case 9:fibre *= 4; break; 
				case 10:fibre *= 6; break; 
				case 11:fibre *= 12; break; 
				case 12: fibre /= 2; break;
			}
			break;		
		case 23:
			switch( turnCount % 23){
				case 0: break;
				default: fibre *= 23; break;
			}
			break;		
		case 26:
			switch( turnCount % 26){
				case 0: break;
				default: fibre *= 6.5; break;
			}
			break;		
		case 27:
			switch( turnCount % 27){
				case 0: break;
				default: fibre *= 27; break;
			}
			break;		
		case 25:
			switch( turnCount % 25){
				case 0: break;
				case 5: fibre *= 5; break;
				case 15: fibre *= 5; break;
				case 20: fibre *= 5; break;
				case 10: fibre *= 5; break;
				default: fibre *= 25; break;
			}
			break;		
		}


		//if( turnCount & 1 ) 
     	const fiberPart =((fibre )/(Math.PI*2) %(divs/subSteps));
		const t = (Math.PI*4)* 1/divs*subSteps*(fiberPart) ;
		
		if(useQuaternion)
		{	
			let q1 = new THREE.Quaternion( Math.sin(fibre/2)* AxRot/lA,Math.sin(fibre/2)*AyRot/lA,Math.sin(fibre/2)*AzRot/lA,  Math.cos(fibre/2));
			//q1.setFromAxisAngle ( axis1, fibre );
			let q2 = new THREE.Quaternion( Math.sin(t/2)* xRot/lB,Math.sin(t/2)*yRot/lB,Math.sin(t/2)*zRot/lB,  Math.cos(t/2));
			//q2.setFromAxisAngle ( axis2, t );
			let q3 = dq.clone();
			if( externalSpin) {
				// q ** r ** s
				q3.multiply( q1 ).multiply( q2 )
			}else {
				// s ** ( r ** q )
				q2.multiply( q1.multiply( q3 ) );
				q3 = q2;
			}

			const len = Math.sqrt( q3.x*q3.x+ q3.y*q3.y+q3.z*q3.z /*+ q3.w*q3.w*/ );
			//if( Math.abs(len-1) > 0.01 ) console.log( "Result:", len, nTotal, q3 );
			//console.log( "resulting quat:", len );
			const a_ = Math.atan2( len, q3.w ) * 2;//Math.acos( q3.w/len ) * 2;
			// atan2 ( +, +/-) = 0 to pi
			// because it's *2, only 0 to PI results, which is only cos 1;0;-1  and sin 0;1;0
				// the sqrt above is always positive.

			// this is what the 0 to pi space seems to look like, when you wrap from >180 to -180<
			const a = a_;//(a_>Math.PI)?/*(Math.PI-(a_-Math.PI))*/(2*Math.PI-a_):a_;
			const i = 1;//(a_>Math.PI)?-1:1;
			//const s = Math.sin( a/2 );
			lnQq.nx = i*q3.x / len; // there is still a +/- here...
			lnQq.ny = i*q3.y / len;
			lnQq.nz = i*q3.z / len;
			lnQq.θ = a;
			lnQq.x = a * lnQq.nx;
			lnQq.y = a * lnQq.ny;
			lnQq.z = a * lnQq.nz;
			lnQq.dirty = false;
			doDrawBasis( lnQq, fibre, true );
		}
		else {
			const lnQ  = ( !useStepFunction ) ?
				(externalSpin?new lnQuat( lnQ0 )
                            	.spin( fibre, axis1, E )
                                .spin( t, axis2, E )
				:new lnQuat( lnQ0 )
                            	.freeSpin( fibre, axis1, E )
                                .freeSpin( t, axis2, E )
                                )
			       :( externalSpin?lnQ_
                            	.spin( fiberStep, {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA}, E )
                                .spin( fiberPartStep, {x:xRot/lB, y:yRot/lB, z:zRot/lB }, E )
				:lnQ_
                            	.freeSpin( fiberStep, {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA}, E )
                                .freeSpin( fiberPartStep, {x:xRot/lB, y:yRot/lB, z:zRot/lB }, E )
				);
			lnQ_ = lnQ;
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
		for( let x = -range; x <= range;  x += (2*range)/steps ) {
			for( let y = -range; y <= range;  y += (2*range)/steps ) {
				for( let z = -range; z <= range; z += (2*range)/steps ) {
				const l = x*x+y*y+z*z;
				if( l > r ) continue;
				//if( l > minr ) continue;
				const lnQ = new lnQuat( 0, cx+x, cy+y, cz+z );
				const basis = lnQ.getBasis( );
	        
				const ox = lnQ.x;
				const oy = lnQ.y;
				const oz = lnQ.z;
	        
		
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

	if( document.getElementById( "invertCrossProduct" )?.checked ) {
		lnQuat.invertCrossProduct = true;
	}else 			
		lnQuat.invertCrossProduct = false;
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

	useQuaternion = document.getElementById( "useQuaternion" )?.checked;
	useStepFunction = document.getElementById( "useStepFunction" )?.checked;
	externalSpin = document.getElementById( "useExternal" )?.checked;


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
	document.getElementById( "lnQAval").textContent = E= ((E/3)|0)-4;

	tmp = document.getElementById( "turnCounter" );
	turnCount = tmp.value;
	tmp = document.getElementById( "stepCounter" );
	stepCount = tmp.value * 250 ;

	lnQuat.sinNormal = !document.getElementById( "SinNormalizeRRF" )?.checked;

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


	const lABC = Math.sqrt(A*A+B*B+C*C);
	const lnQ0 = new lnQuat(  0, T*A/lABC, T*B/lABC, T*C/lABC ).update();
	lnQ_ = new lnQuat().set( lnQ0 );
	//QuatPathing( lnQ, xAxis, cx,normalVertices,normalColors );
	//QuatPathing( lnQ, yAxis, cy,normalVertices,normalColors );
	//QuatPathing( lnQ, zAxis, cz,normalVertices,normalColors );
}

let lnQ_;

export function updateShapes( shapes,camera ) {
	const atTick = Date.now();
	const nTotal = ( ( (atTick )/(turnCount*useStepFunction?5000:250000) ) %1) * stepCount * turnCount  /* this 5 and turn count must relate*/;

	const lABC = Math.sqrt(A*A+B*B+C*C);
	const steps = stepCount;
	const subSteps = turnCount;//Math.sqrt(steps);
	
	const lnQ0 = new lnQuat(  0, T*A/lABC, T*B/lABC, T*C/lABC ).update();
	
        //const t = (Math.PI*4)* subSteps*((fibre + Math.PI)/(Math.PI*4) %(1/subSteps)) - (Math.PI*2);

		let fibre = (nTotal/steps)/*0-1*/ * (4*Math.PI ) ;
		if( turnCount & 1 ) fibre /= 2;
     	const fiberPart =((fibre )/(Math.PI*2) %(2/subSteps));
		const t = (Math.PI*4)* 1/2*subSteps*(fiberPart) ;

	const lA = Math.sqrt(AxRot*AxRot+AyRot*AyRot+AzRot*AzRot);
	const lB = Math.sqrt(xRot*xRot+yRot*yRot+zRot*zRot);

	const fiberStep = ( 4*Math.PI ) / ( steps );
	const fiberPartStep = ((fiberStep + 1*Math.PI)/(Math.PI*2) %(1/subSteps));

	if(useQuaternion)
	{	
		const lnQq = new lnQuat();
			var dq = new THREE.Quaternion( Math.sin( T/2 ) * A/lABC,  Math.sin( T/2 ) * B/lABC, Math.sin( T/2 ) * C/lABC, Math.cos( T/2 ) );
			let q1 = new THREE.Quaternion( Math.sin(fibre/2)* AxRot/lA,Math.sin(fibre/2)*AyRot/lA,Math.sin(fibre/2)*AzRot/lA,  Math.cos(fibre/2));
			//q1.setFromAxisAngle ( axis1, fibre );
			let q2 = new THREE.Quaternion( Math.sin(t/2)* xRot/lB,Math.sin(t/2)*yRot/lB,Math.sin(t/2)*zRot/lB,  Math.cos(t/2));
			//q2.setFromAxisAngle ( axis2, t );
			let q3 = dq;

			if( externalSpin) {
				// q ** r ** s
				
				q3.multiply( q1 ).multiply( q2 )
			}else {
				// s ** ( r ** q )
				q2.multiply( q1.multiply( q3 ) );
				q3 = q2;
			}

			const len = Math.sqrt( q3.x*q3.x+ q3.y*q3.y+q3.z*q3.z+q3.w*q3.w );
///if( Math.abs(len-1) > 0.1 ) console.log( "Result:", len, nTotal, q3 );
			//console.log( "resulting quat:", len );
			const a = Math.acos( q3.w/len ) * 2;
			const s = Math.sin( a/2 )*len;
			lnQq.nx = q3.x / s;
			lnQq.ny = q3.y / s;
			lnQq.nz = q3.z / s;
			lnQq.θ = a;
			lnQq.x = a * lnQq.nx;
			lnQq.y = a * lnQq.ny;
			lnQq.z = a * lnQq.nz;
                        lnQq.dirty = false;


		lnQq.exp( shapes[0].quaternion );
		lnQq.exp( shapes[1].quaternion );
		shapes[1].position.set( lnQq.x*spaceScale, lnQq.y*spaceScale, lnQq.z*spaceScale );
		
	}else{
			const lA = Math.sqrt(AxRot*AxRot+AyRot*AyRot+AzRot*AzRot);
			const lB = Math.sqrt(xRot*xRot+yRot*yRot+zRot*zRot);

			const lnQ =  (!useStepFunction)?(
				externalSpin?new lnQuat( lnQ0 )
                            	.spin( fibre, {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA},E )
                                .spin( t, {x:xRot/lB, y:yRot/lB, z:zRot/lB },E )
				:new lnQuat( lnQ0 )
                            	.freeSpin( fibre, {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA},E )
                                .freeSpin( t, {x:xRot/lB, y:yRot/lB, z:zRot/lB },E ) )
			:(externalSpin?lnQ_
                            	.spin( fiberStep, {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA},E )
                                .spin( fiberPartStep, {x:xRot/lB, y:yRot/lB, z:zRot/lB },E )
				:lnQ_
                            	.freeSpin( fiberStep, {x:AxRot/lA,y:AyRot/lA,z:AzRot/lA},E )
                                .freeSpin( fiberPartStep, {x:xRot/lB, y:yRot/lB, z:zRot/lB },E )
			  )
			;
                
                
		lnQ.exp( shapes[0].quaternion );
		lnQ.exp( camera.quaternion );
		lnQ.exp( shapes[1].quaternion );
		shapes[1].position.set( lnQ.x*spaceScale, lnQ.y*spaceScale, lnQ.z*spaceScale );
	}
}