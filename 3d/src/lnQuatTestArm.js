import {lnQuat} from "./lnQuatSq.js"
let A,B,C,D,E;  // slider values
let xRot, yRot, zRot;
let AxRot, AyRot, AzRot;
let turnCount = 12;
let stepCount = 1000;
let showCoordinateGrid = false;
let drawNormalBall = false;
let showInvCoordinateGrid = false;
let showRawCoordinateGrid = false;
let twistCount = 1;
let showLineSeg = [true,false,false,false,false];


let showRaw = true;  // just raw x/y/z at x/y/z
let shownRnL = true;  // p * nL / nR
let shownL = true;  //  p / nL
let shownR = true;  // p.n(xyz)  p / nR
let normalizeNormalTangent = false;

function drawArm(curSliders,normalVertices,normalColors) {
	const spaceScale = 5;
	const normal_del = 0.5;
	
	const origin = {x:0,y:0,z:0};

	const arm = {x:0,y:0,z:2};
	const shortArm = {x:0,y:0,z:2/100};

	const lnQ1 = new lnQuat( 0, curSliders.lnQX[0], curSliders.lnQY[0], curSliders.lnQZ[0] );
	const lnQ2 = new lnQuat( 0, curSliders.lnQX[1], curSliders.lnQY[1], curSliders.lnQZ[1] );
	const lnQ3 = new lnQuat( 0, curSliders.lnQX[2], curSliders.lnQY[2], curSliders.lnQZ[2] );
	const lnQ4 = new lnQuat( 0, curSliders.lnQX[3], curSliders.lnQY[3], curSliders.lnQZ[3] );
	const lnQ5 = new lnQuat( 0, curSliders.lnQX[4], curSliders.lnQY[4], curSliders.lnQZ[4] );

	let mode = document.getElementById( "keepInertia" )?.checked?1:0;

	const t2 = lnQ2.add2( lnQ1 );
	const t3 = t2.add2( lnQ3 );
	const t4 = t3.add2( lnQ4 );
	const t5 = t4.add2( lnQ5 );

	const t2_ = t2.add2( lnQ1 );
	const t3_ = t2_.add2( t3 );
	const t4_ = t3_.add2( t4 );
	const t5_ = t4_.add2( t5 );

	//const t2 = lnQ1.add2( lnQ2.spin( t2_.nL/2, t2_ ) );
	//console.log( "Q becomes Q2", lnQ2, t2, t2 );
	//const t3 = t2.applyBeta(lnQ3);
	//const t4 = t3.applyBeta(lnQ4);
	//const t5 = t4.applyBeta(lnQ5);

	drawRange( t2.x, t2.y, t2.z, Math.PI/32, 5 );
	drawRange( t3.x, t3.y, t3.z, Math.PI/32, 5 );
	drawRange( t4.x, t4.y, t4.z, Math.PI/32, 5 );
	drawRange( t5.x, t5.y, t5.z, Math.PI/32, 5 );
	
	const A1 = lnQ1.apply( arm );
	const A2 = (mode===0?t2:t2_).apply( arm );
	const A3 = (mode===0?t3:t3_).apply( arm );
	const A4 = (mode===0?t4:t4_).apply( arm );
	const A5 = (mode===0?t5:t5_).apply( arm );

	const Rz = [lnQ1,t2_,t3_,t4_,t5_];
	const R_ = [lnQ1,lnQ2,lnQ3,lnQ4,lnQ5];
	const R = [lnQ1,t2,t3,t4,t5];
	const A_ = [{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];
	const A = [A1,A2,A3,A4,A5];
	let prior = origin;
	for( var n = 0; n < 5; n++ ) {
		A[n].x += prior.x;
		A[n].y += prior.y;
		A[n].z += prior.z;

		doDrawBasis( mode===0?R[n]:Rz[n], prior );
		normalVertices.push( new THREE.Vector3( (prior.x)*spaceScale ,(prior.y)*spaceScale    , (prior.z)*spaceScale ))
		normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
		pushN(n);
		prior = A[n];

			if( n ) {
				A_[n].x = A_[n-1].x
				A_[n].y = A_[n-1].y
				A_[n].z = A_[n-1].z
			}

			let step;
		for( let s = 0; s < 100; s++ )
		{
			//let step = R_[n].applyDel( shortArm, s/100.0, n?R[n-1]:null, 1.0 );

			if( mode === 0 )
				step = R_[n].applyDel( shortArm, s/100.0, n?R[n-1]:null, 1.0 );
			else
				step = R[n].applyDel( shortArm, s/100.0, n?Rz[n-1]:null, 1.0 );

			normalVertices.push( new THREE.Vector3( (A_[n].x)*spaceScale   ,( A_[n].y)*spaceScale      , (A_[n].z)*spaceScale  ))
			A_[n].x += step.x;
			A_[n].y += step.y;
			A_[n].z += step.z;
			normalVertices.push( new THREE.Vector3( (A_[n].x)*spaceScale   ,( A_[n].y)*spaceScale      , (A_[n].z)*spaceScale  ))


			switch( n ) {
			case 1:
				normalColors.push( new THREE.Color( 0,1.0,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0,0,255 ))
				break;
			case 2:
				normalColors.push( new THREE.Color( 0,0,1.0,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0,255 ))
				break;
			case 3:
				normalColors.push( new THREE.Color( 0,1.0,1.0,255 ))
				normalColors.push( new THREE.Color( 0,1.0,1.0,255 ))
				break;
			case 4:
				normalColors.push( new THREE.Color( 1.0,1.0,0,255 ))
				normalColors.push( new THREE.Color( 1.0,1.0,0,255 ))
				break;
			default:
				normalColors.push( new THREE.Color( 1.0,0,0,255 ))
				normalColors.push( new THREE.Color( 1.0,0,0,255 ))
			}
		}
			doDrawBasis( mode===0?R[n]:Rz[n], A_[n], 1, 1 );
		normalVertices.push( new THREE.Vector3( (A_[n].x)*spaceScale   ,( A_[n].y)*spaceScale      , (A_[n].z)*spaceScale  ))
		A_[n].x += step.x*100;
		A_[n].y += step.y*100;
		A_[n].z += step.z*100;
		normalVertices.push( new THREE.Vector3( (A_[n].x)*spaceScale   ,( A_[n].y)*spaceScale      , (A_[n].z)*spaceScale  ))
		pushN(n);
			
	
	}
	
return;

		function pushN(n){

		switch( n ) {
		case 1:
			normalColors.push( new THREE.Color( 0,1.0,0,255 ))
			normalColors.push( new THREE.Color( 0,1.0,0,255 ))
			break;
		case 2:
			normalColors.push( new THREE.Color( 0,0,1.0,255 ))
			normalColors.push( new THREE.Color( 0,0,1.0,255 ))
			break;
		case 3:
			normalColors.push( new THREE.Color( 0,1.0,1.0,255 ))
			normalColors.push( new THREE.Color( 0,1.0,1.0,255 ))
			break;
		case 4:
			normalColors.push( new THREE.Color( 1.0,1.0,0,255 ))
			normalColors.push( new THREE.Color( 1.0,1.0,0,255 ))
			break;
		default:
		normalColors.push( new THREE.Color( 1.0,0,0,255 ))
		normalColors.push( new THREE.Color( 1.0,0,0,255 ))
			}
		}

	var priorHere;
	const o = [0,0,0];//6/spaceScale,+6/spaceScale,+6/spaceScale];
	var fibre;
	//let prior = null;
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
	for( nTotal = 0; nTotal < steps; nTotal++ ) {
		fibre = nTotal * ( 1*( 2*Math.PI ) / ( steps ) );//  - 2*Math.PI;
		
		const lnQrot = new lnQuat( fibre, {x:AxRot,y:AyRot,z:AzRot} );
		const lnQ    = new lnQuat( T    , lnQrot.apply( { x: A, y:B, z:C } ) );

		const t = (Math.PI*4)* subSteps*((fibre + Math.PI)/(Math.PI*2) %(1/subSteps)) - (Math.PI*2);
		lnQ.spin( t, {x:xRot, y:yRot, z:zRot }, E/3 );
		
		doDrawBasis( lnQ, fibre, (q,x)=>x * q.nL, true );
		
	}

	if( showCoordinateGrid || showInvCoordinateGrid || showRawCoordinateGrid ) {
		const range = (Math.floor(E) + 2 ) * Math.PI;
		const minRange = (Math.floor(E) +1 ) * Math.PI;
		drawRange( 0,0,0, range, 20, minRange, showRawCoordinateGrid, showInvCoordinateGrid );
	}
	return;

	// graph of location to rotation... 
	function drawRange( cx,cy,cz,range,steps, minr, unscaled, invert ) {
		
		if( "undefined" === typeof unscaled ) unscaled = true;
		if( !minr ) minr = 0;
		const normLen = 0.1*(steps/range);
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
	        
				const nL = 1;//(Math.abs(lnQ.x) + Math.abs(lnQ.y) + Math.abs(lnQ.z))/2;
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

	function doDrawBasis(lnQ2,t,f,n ) {
		const basis = lnQ2.update().getBasis( );
		normalVertices.push( new THREE.Vector3( (t.x)*spaceScale                             ,(t.y)*spaceScale                             , (t.z)*spaceScale ))
		normalVertices.push( new THREE.Vector3( (t.x)*spaceScale + basis.right.x*normal_del  ,(t.y)*spaceScale + basis.right.y*normal_del  , (t.z)*spaceScale + basis.right.z*normal_del ))
		                                                                                                
		normalVertices.push( new THREE.Vector3( (t.x)*spaceScale                             ,(t.y)*spaceScale                             , (t.z)*spaceScale ))
		normalVertices.push( new THREE.Vector3( (t.x)*spaceScale + basis.up.x*normal_del     ,(t.y)*spaceScale + basis.up.y*normal_del     , (t.z)*spaceScale + basis.up.z*normal_del ))
		                                                                                                
		normalVertices.push( new THREE.Vector3( (t.x)*spaceScale                             ,(t.y)*spaceScale                             , (t.z)*spaceScale ))
		normalVertices.push( new THREE.Vector3( (t.x)*spaceScale + basis.forward.x*normal_del,(t.y)*spaceScale + basis.forward.y*normal_del, (t.z)*spaceScale + basis.forward.z*normal_del ))


		        {
				//const s = t / (Math.PI*4);
				const s = 1;
				normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
				normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
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



window.DrawQuatPaths = DrawQuatPaths;
function DrawQuatNormals(normalVertices,normalColors) {
	const v = { x:0,y:1,z:0};
	const spaceScale = 3;
	const normal_del = 0.25;
	drawN( new lnQuat( {x:0,y:1,z:0 } ), {x:0,y:1,z:0} );
	drawN( new lnQuat( {x:0,y:-1,z:0 } ), {x:0,y:-1,z:0} );
	if(drawNormalBall/*draw normal ball with twist*/)
		for( let h = 1*-1; h <= 1; h+= 0.1/2 ) {
			for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
				let x = Math.sin(t );
				const z = Math.cos(t);
				const lnQ = new lnQuat( {x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) }, normalizeNormalTangent );
				lnQ.twist( twistDelta );
			drawN( lnQ, norm );
		}
	}

	function drawN( lnQ, n )
	{
			const new_v = lnQ.apply( v );
			const basis = lnQ.getBasis( );

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
        let curSliders = {
	};
	curSliders.lnQX = [];
	curSliders.lnQY = [];
	curSliders.lnQZ = [];
	for( var n = 1; n <= 5; n++ ) {
			let lnQX = Number(document.getElementById( "lnQX"+n ).value);
			let lnQY = Number(document.getElementById( "lnQY"+n ).value);
			let lnQZ = Number(document.getElementById( "lnQZ"+n ).value);
		curSliders.lnQX[n-1] = (lnQX / 500 - 1) * 4*Math.PI;
		curSliders.lnQY[n-1] = (lnQY / 500 - 1) * 4*Math.PI;
		curSliders.lnQZ[n-1] = (lnQZ / 500 - 1) * 4*Math.PI;

		document.getElementById( "lnQXval"+n).textContent = curSliders.lnQX[n-1].toFixed(4);
		document.getElementById( "lnQYval"+n).textContent = curSliders.lnQY[n-1].toFixed(4);
		document.getElementById( "lnQZval"+n).textContent = curSliders.lnQZ[n-1].toFixed(4);

	}

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

	check = document.getElementById( "showX1" );
	if( check ) {
		shownL = check.checked;
	}
	check = document.getElementById( "showX2" );
	if( check ) {
		shownL = check.checked;
	}
	check = document.getElementById( "showX3" );
	if( check ) {
		shownL = check.checked;
	}
	check = document.getElementById( "showX4" );
	if( check ) {
		shownL = check.checked;
	}
	check = document.getElementById( "showX5" );
	if( check ) {
		shownL = check.checked;
	}



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
	drawArm( curSliders, normalVertices,normalColors );
	//QuatPathing2( lnQ, yAxis, cy,normalVertices,normalColors );

	
	//QuatPathing( lnQ, xAxis, cx,normalVertices,normalColors );
	//QuatPathing( lnQ, yAxis, cy,normalVertices,normalColors );
	//QuatPathing( lnQ, zAxis, cz,normalVertices,normalColors );
}


