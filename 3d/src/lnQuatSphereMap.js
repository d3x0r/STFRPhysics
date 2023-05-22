import {Quat} from "./Quat.js"
import {lnQuat,slerp} from "./lnQuatSq.js"
let pointScalar = 12/ Math.PI;
let  weylCurvature  = false;
let polarAligned = false;

let armPrimary = 1; // 0 = x, 1=y, 2=z
let A,B,C,D,E;  // slider values
let xRot, yRot, zRot;
let AxRot, AyRot, AzRot;
let turnCount = 12;
let stepCount = 1000;
let _1norm = false;
let inv_1norm = false;
let mapPolar= false;
let showCoordinateGrid = false;
let drawNormalBall = false;
let normalizeNormalTangent = false;
let showInvCoordinateGrid = false;
let showRawCoordinateGrid = false;
let twistCount = 2;
let weylGroup = false;
let showScaledPoints = false; // show X/Y/Z Scaled to SO3 Axis/||Axis||_2 * Angle
let showCoords = false;
let showNormalProjection = true;
let bisectAnalog = false;
let trisectAnalog = false;
let timeScale = 1.5;
let twistDelta = 0.0;
let drawRotationAxles = true;
let drawRotationAllAxles = true;
let drawRotationSquares = true;
let drawRotationSquaresXY = true;
let drawRotationSquaresYX = true;
let drawRotationSquareLimit = 1;
let showLineSeg = [true,false,false,false,false];
let fixAxleRotation= true;
let showRotationCurves = false;
let showRotationCurve = "X";
let showRotationCurveSegment = -1;
let stepScalar = [false,false,false,false,false];
let drawRotationInterpolant = [false,false,false,false,false];
let drawRawRot = false;
let drawRawRotIter = false;
let drawMechanicalRot= false;
let drawRotIter= false;
let showArms = true;
let rawAngles = false;
let normalizeTangents = false;
let applyAccel = document.getElementById( "applyAccel" )?.checked;
let showSliderCurves = false;
let totalNormal = 0;
let drawWorldAxles = false;
let mountOrder = 0;
let currentOctave = 0;
let stereoProject = false;
let gridStepCount = 50;

let lnQx = new lnQuat();
let lnQx2 = new lnQuat();
let range = Math.PI;

let showRaw = true;  // just raw x/y/z at x/y/z
let shownRnL = true;  // p * θ / nR
let shownL = true;  //  p / nL
let shownR = true;  // p.n(xyz)  p / nR
const lnQ0 = new lnQuat();

let lnQ1;
let lnQ2;
let lnQ3;
let lnQ4;
let lnQ5;

const lnQ_current = [];
let lnQ1_current;
let lnQ2_current;
let lnQ3_current;
let lnQ4_current;
let lnQ5_current;
let curSliders = {
};

let normalVertices,normalColors;
	const spaceScale = 0.70;
	const normal_del = 0.14;

function mkQuat( a,b,c,d ){
	return new lnQuat( a, b, c, d );
}
	
function makeQuat(p,y,r) {
	switch( mountOrder ) {
	case 0:
	return mkQuat().roll(r).yaw(y).pitch(p);
	case 1:
	return mkQuat().roll(r).pitch(p).yaw(y);

	case 2:
	return mkQuat().pitch(p).yaw(y).roll(r);
	case 3:
	return mkQuat().pitch(p).roll(r).yaw(y);
	
	case 4:
	return mkQuat().yaw(y).pitch(p).roll(r);
	case 5:
	return mkQuat().yaw(y).roll(r).pitch(p);
	case 6:{
		return mkQuat(0,p,y,r);
	}
	}
}



	function deg2rad(n) { return n * Math.PI/180 }
	let twist = 0;
	const bP = new lnQuat();
	const xAxis = {x:1, y:0, z:0};
	const zAxis = {x:0, y:0, z:1};
	let useSub = false;
	let subIterations = 10;
	function pMake(q, x, y, o, gamma, r ){
		
		if( weylGroup ) {
			q.x = x;
			q.y = 0;
			q.z = 0;
			q.dirty = true;
			q.update(); 
			q.freeSpin( o.θ, o );

			bP.x = 0;
			bP.y = 0;
			bP.z = y;
			bP.dirty = true;
			bP.update(); 
			bP.freeSpin( o.θ, o );

			q.x += bP.x;
			q.y += bP.y;
			q.z += bP.z;
			q.dirty = true;
			q.update(); 
		} else {
			// use parameters to directly make and transform a point without 3 function calls
			const qlen = Math.sqrt(x*x + y*y);
			if( useSub ) {
				const lnQTmp = q.set(0,0,0,0).update();
				{
					const xstep = x/subIterations;
					const ystep = y/subIterations;
					for( let n = 0; n < subIterations; n++ ) {
						lnQTmp.freeSpin( xstep, xAxis )
						lnQTmp.freeSpin( ystep, zAxis )
					}
					lnQTmp.freeSpin( o.θ, o );
					return lnQTmp;
				}
			}


			const qnx = qlen?x / qlen:1;
			//const qny = 0;
			const qnz = qlen?y / qlen:0;

			
			// local 'finishRodrigues'
			const ax = o.nx
			const ay = o.ny
			const az = o.nz
			const oct = 0;//currentOctave || Math.floor( o.θ / (Math.PI*4) ); 
			const th = o.θ % (Math.PI*2);
			

			{ // finish rodrigues
				const AdotB = (qnx*ax + /*q.ny*ay +*/ qnz*az);
			
				const xmy = (th - qlen)/2; // X - Y  (x minus y)
				const xpy = (th + qlen)/2  // X + Y  (x plus y )
				const cxmy = Math.cos(xmy);
				const cxpy = Math.cos(xpy);
				const cosCo2 = ( ( 1-AdotB )*cxmy + (1+AdotB)*cxpy )/2;
			
				let ang = Math.acos( cosCo2 )*2 + ((currentOctave )* Math.PI*2 + oct*Math.PI*4);
				// only good for rotations between 0 and pi.
			
				if( ang && ang != Math.PI*2 ) {
					const sxmy = Math.sin(xmy); // sin x minus y
					const sxpy = Math.sin(xpy); // sin x plus y
			
					const ss1 = sxmy + sxpy
					const ss2 = sxpy - sxmy
					const cc1 = cxmy - cxpy
			
					// these have q.ny terms remove - q.ny is 0.
					const Cx = ( (ay*qnz       ) * cc1 +  ax * ss1 + qnx * ss2 );
					const Cy = ( (az*qnx-ax*qnz) * cc1 +  ay * ss1             );
					const Cz = ( (      -ay*qnx) * cc1 +  az * ss1 + qnz * ss2 );

					const Clx = 1/Math.sqrt(Cx*Cx+Cy*Cy+Cz*Cz);
					
					q.θ  = ang;// + currentOctave * Math.PI;;
					q.nx = Cx*Clx;
					q.ny = Cy*Clx;
					q.nz = Cz*Clx;
					
					q.x  = q.nx*ang;
					q.y  = q.ny*ang;
					q.z  = q.nz*ang;
			
					q.dirty = false;
				} else {
					// result is 0 angular rotation... normal doesn't matter.
					q.x = q.y = q.z = 0;
					q.nx = q.nz = 0;
					q.ny = 1;
					q.θ = 0;
					q.dirty = false;
				}
			}
		}

		if( mapPolar ) {
					if( weylCurvature )
						q.yaw( gamma );
					else if( polarAligned && !stereoProject )
						q.yaw( -gamma);
					else if( stereoProject && !polarAligned )
						q.yaw( -r );
					else if( stereoProject && polarAligned )
						q.yaw( r );

		}

		return q;
	}


	const tmpPoint = { x:0, y:0, z:0 };
	function drawGrid(normalVertices,normalColors, curSliders) {
		const merge = document.getElementById( "additiveMerge" )?.checked;
		showNormalProjection = document.getElementById( "showNormalProjection")?.checked;
		 _1norm = document.getElementById( "oneNormal" )?.checked;
		 inv_1norm = document.getElementById( "invOneNormal" )?.checked;
		 mapPolar = document.getElementById( "mapPolar" )?.checked;
		 weylCurvature = document.getElementById( "weylCurvature" )?.checked;
		 weylGroup = document.getElementById( "weylGroup" )?.checked;
		 polarAligned= document.getElementById( "polarAligned" )?.checked;
		 stereoProject = document.getElementById( "stereoProject" )?.checked;
		 const showGrid = document.getElementById( "showGrid").checked;
		const lnQ = new lnQuat();
		const spaceScale = 18;
		const p = [];
		const p2 = [];
		let gamline = 0;

		lnQuat.setTwistDelta( 0 );
		lnQx.set( {lat:curSliders.lnQX[0],lng:curSliders.lnQY[0]}, false ).yaw(twistDelta);//.update();


		const lnQxText = document.getElementById( "lnQXval1q" );
		const lnQyText = document.getElementById( "lnQYval1q" );
		const lnQzText = document.getElementById( "lnQZval1q" );
		lnQxText.textContent = "qX:"+(lnQx.x/Math.PI).toFixed(4) + "π";
		lnQyText.textContent = "qY:"+(lnQx.y/Math.PI).toFixed(4) + "π";
		lnQzText.textContent = "qZ:"+(lnQx.z/Math.PI).toFixed(4) + "π";
		range = deg2rad( curSliders.lnQZ[0] );

		// convert to and from quaternion (display values)
		{
			const lnQwText = document.getElementById( "lnQWval1quat" );
			const lnQxText = document.getElementById( "lnQXval1quat" );
			const lnQyText = document.getElementById( "lnQYval1quat" );
			const lnQzText = document.getElementById( "lnQZval1quat" );
			const basis = lnQx.getBasis();
			const w = Math.cos( lnQx.θ/2 );
			const x = Math.sin( lnQx.θ/2 ) * lnQx.nx;
			const y = Math.sin( lnQx.θ/2 ) * lnQx.ny;
			const z = Math.sin( lnQx.θ/2 ) * lnQx.nz;
			
			const Q1 = new Quat( w, x, y, z );
			/*
				const q2w = Math.cos( Math.PI/400 );
				const q2x = Math.sin( Math.PI/400 ) * basis.up.x;
				const q2y = Math.sin( Math.PI/400 ) * basis.up.y;
				const q2z = Math.sin( Math.PI/400 ) * basis.up.z;
				// make another small rotation, and make sure it survives...
				const Q2 = new Quat( q2w, q2x, q2y, q2z );
				const Q3 = Q1.mul( Q2 )
			*/

			lnQwText.textContent = "qW:"+(Q1.w).toFixed(4);
			lnQxText.textContent = "qX:"+(Q1.x).toFixed(4);
			lnQyText.textContent = "qY:"+(Q1.y).toFixed(4);
			lnQzText.textContent = "qZ:"+(Q1.z).toFixed(4);

			const th = Math.acos( Q1.w ) * 2;
			const sn = Math.sin( th/ 2 );
			{
				const lnQxText = document.getElementById( "lnQXval1quatLn" );
				const lnQyText = document.getElementById( "lnQYval1quatLn" );
				const lnQzText = document.getElementById( "lnQZval1quatLn" );
				lnQxText.textContent = "x:"+((Q1.x/sn*th)/Math.PI).toFixed(4) + "π";
				lnQyText.textContent = "y:"+((Q1.y/sn*th)/Math.PI).toFixed(4) + "π";
				lnQzText.textContent = "z:"+((Q1.z/sn*th)/Math.PI).toFixed(4) + "π";
			}
		}

		const step = range/gridStepCount;

		if( !mapPolar )  {
		
		for( let theta = -(range); theta <= (range); theta += (step) ){
	
			const draw = p.length;
			const draw2 = p2.length;
			
			gamline = 0;
			for( let gamma = -(range); gamma <= (range); gamma += (step), gamline++ ){
				let g2 = gamma;// / (Math.abs(g2)+Math.abs(theta)) * Math.sqrt( g2*g2+theta*theta);
				let t2 = theta;// / (Math.abs(g2)+Math.abs(theta)) * Math.sqrt( g2*g2+theta*theta);

				/*
				  // limit to more of a circular patch...
				if( t2*t2+g2*g2 > range*range ) 
				{
					if( !draw )
						p.push( {x:0,y:0,z:0} );
					if( !draw2 ) {
						p2.push( {x:0,y:0,z:0} )

					}
					continue;
				}
				*/
				const gridlen = Math.sqrt(g2*g2+t2*t2);
				if( inv_1norm || _1norm ) {
					const bigger = (Math.abs(g2) > Math.abs(t2) )?g2:t2;
					if( inv_1norm) {
						g2 = g2 / (Math.abs(g2)+Math.abs(t2)) * Math.abs(bigger);
						t2 = t2 / (Math.abs(g2)+Math.abs(t2)) * Math.abs(bigger);
						g2 = g2 / (Math.abs(g2)+Math.abs(t2)) * gridlen;
						t2 = t2 / (Math.abs(g2)+Math.abs(t2)) * gridlen;
					}else {
						g2 = g2 / Math.sqrt( g2*g2+t2*t2) * (Math.abs(g2)+Math.abs(t2));
						t2 = t2 / Math.sqrt( g2*g2+t2*t2) * (Math.abs(g2)+Math.abs(t2));
					}


				}
				if( merge ) {
					pMake( lnQ, t2, g2, lnQx);
				} else {
					lnQ.nx = lnQ.nz = 0;
					lnQ.ny = 0;
					lnQ.θ = 0;
					lnQ.qw = 1;
					lnQ.s = 0;
					lnQ.dirty = false;
					lnQ.freeSpin( t2, {x:1,y:0,z:0} );
					lnQ.freeSpin( g2, {x:0,y:0,z:1} );
					lnQ.update().freeSpin( lnQx.θ, {x:lnQx.nx, y:lnQx.ny, z:lnQx.nz} );
					doDrawBasis( lnQ, lnQ, 1, 1, null, 1 );
				}

				//lnQ.add( offset, 1 )
				//lnQ.x = -lnQ.x;				
				//lnQ.y = -lnQ.y;				
				//lnQ.z = -lnQ.z;				
				if( showNormalProjection ) {
				const basis = lnQ.update().getBasis();
				tmpPoint.x = basis.up.x * spaceScale*1.43 ;
				tmpPoint.y = basis.up.y * spaceScale*1.43 ;
				tmpPoint.z = basis.up.z * spaceScale*1.43 ;
				doDrawBasis( lnQ, tmpPoint, 0.25, 1, null, 1, g2, t2 );
				const wraps = Math.floor( (range) / Math.PI ) * Math.PI;
				if( showGrid && draw  ) {
					const oldp = p[gamline];
					if( ( gridlen) >= wraps ) {
						normalVertices.push( new THREE.Vector3( (oldp.x)*spaceScale ,(oldp.y)*spaceScale    , (oldp.z)*spaceScale ))
						normalVertices.push( new THREE.Vector3( (basis.up.x)*spaceScale ,(basis.up.y)*spaceScale    , (basis.up.z)*spaceScale ))
						normalColors.push( new THREE.Color( 0,1.0 * (g2+range)/range * 0.5,0,255 ))
						normalColors.push( new THREE.Color( 0,1.0 * (g2+range)/range * 0.5,0,255 ))
					}
					oldp.x = basis.up.x;
					oldp.y = basis.up.y;
					oldp.z = basis.up.z;
				}else {
					p.push( {x:basis.up.x,y:basis.up.y,z:basis.up.z} )
				}
	
				if( merge ) {
					pMake( lnQ, g2, t2, lnQx );
					//lnQ.x = g2; lnQ.y = 0; lnQ.z = t2;
					//lnQ.dirty = true;
				} else {
					lnQ.x = lnQ.y = lnQ.z = 0;
					lnQ.nx = lnQ.nz = 0;
					lnQ.ny = 1;
					lnQ.θ = 0;
					lnQ.qw = 1;
					lnQ.s = 0;
					lnQ.dirty = false;
					lnQ.freeSpin( t2, {x:0,y:0,z:1} );
					lnQ.freeSpin( g2, {x:1,y:0,z:0} );
					lnQ.update().freeSpin( lnQx.θ, {x:lnQx.nx, y:lnQx.ny, z:lnQx.nz} );

				}

				const basis2 = lnQ.update().getBasis();
				if( showGrid && draw2 ) {
					const oldp = p2[gamline];
					if( ( gridlen) >= wraps ) {
						normalVertices.push( new THREE.Vector3( (oldp.x)*spaceScale ,(oldp.y)*spaceScale    , (oldp.z)*spaceScale ))
						normalVertices.push( new THREE.Vector3( (basis2.up.x)*spaceScale ,(basis2.up.y)*spaceScale    , (basis2.up.z)*spaceScale ))
		
						normalColors.push( new THREE.Color( 1.0*(g2+range)/range*0.5,0,0,255 ))
						normalColors.push( new THREE.Color( 1.0*(g2+range)/range*0.5,0,0,255 ))
					}
					oldp.x = basis2.up.x;
					oldp.y = basis2.up.y;
					oldp.z = basis2.up.z;


				}else {
					p2.push( {x:basis2.up.x,y:basis2.up.y,z:basis2.up.z} )
				}
				}else
							doDrawBasis( lnQ, lnQ, 0.25, 1, null, 1, g2, t2 );


			}
		}
		}  // end if(!mapPolar );

		let rline = 0;
		if( mapPolar ) {

			for( let r = 0.01; r <= (range); r += (step/ ( 1.3*range/(Math.PI))), rline++ ){
		
				const draw = p.length;
				const draw2 = p2.length;
				
				gamline = 0;

				for( let gamma = -Math.PI*2; gamma <= Math.PI; gamma += Math.PI/32, gamline++ ){
					let g2 = gamma;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
					let t2 = r;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);

					g2 = (r)*Math.sin(gamma);
					t2 = (r)*Math.cos(gamma);
					
					pMake( lnQ, t2, g2, lnQx, gamma, r);

					//lnQ.θ +=  currentOctave * 4*Math.PI;
					lnQ.x = lnQ.nx * lnQ.θ;
					lnQ.y = lnQ.ny * lnQ.θ;
					lnQ.z = lnQ.nz * lnQ.θ;

					//lnQ.add( offset, 1 )
				if( showNormalProjection ) {
					
					const basis = lnQ.getBasis();
					tmpPoint.x = basis.up.x * spaceScale*1.43 ;
					tmpPoint.y = basis.up.y * spaceScale*1.43 ;
					tmpPoint.z = basis.up.z * spaceScale*1.43 ;
					doDrawBasis( lnQ, tmpPoint, 0.25, 1, null, 1, g2, t2, gamma, r );
					const wraps = Math.floor( range / Math.PI ) * Math.PI;
					if( showGrid && draw ) {
						const oldp = p[gamline];
						if( r > wraps ) {
							normalVertices.push( new THREE.Vector3( (oldp.x)*spaceScale ,(oldp.y)*spaceScale    , (oldp.z)*spaceScale ))
							normalVertices.push( new THREE.Vector3( (basis.up.x)*spaceScale ,(basis.up.y)*spaceScale    , (basis.up.z)*spaceScale ))
							normalColors.push( new THREE.Color( 0,1.0 * (gamma+range)/range * 0.5,0,255 ))
							normalColors.push( new THREE.Color( 0,1.0 * (gamma+range)/range * 0.5,0,255 ))
						}
						oldp.x = basis.up.x;
						oldp.y = basis.up.y;
						oldp.z = basis.up.z;
					}else {
						p.push( {x:basis.up.x,y:basis.up.y,z:basis.up.z} )
					}
		
					if( showGrid && draw2 && rline < p2.length ) {
						const oldp = p2[rline];
						if( r > wraps ) {
							normalVertices.push( new THREE.Vector3( (oldp.x)*spaceScale ,(oldp.y)*spaceScale    , (oldp.z)*spaceScale ))
							normalVertices.push( new THREE.Vector3( (basis.up.x)*spaceScale ,(basis.up.y)*spaceScale    , (basis.up.z)*spaceScale ))
							normalColors.push( new THREE.Color( 1.0*(gamma+range)/range*0.5,0,0,255 ))
							normalColors.push( new THREE.Color( 1.0*(gamma+range)/range*0.5,0,0,255 ))
						}
						oldp.x = basis.up.x;
						oldp.y = basis.up.y;
						oldp.z = basis.up.z;
		


					}else {
						p2.push( {x:basis.up.x,y:basis.up.y,z:basis.up.z} )
					}
					}else 					
						doDrawBasis( lnQ, lnQ, 0.25, 1, null, 1, g2, t2, gamma, r);

				}
			}
		}
	}





	// graph of location to rotation... 
	function drawRange( cx,cy,cz,range,steps, minr, unscaled, invert ) {
		
		if( !minr ) minr = 0;
		//steps *= 8;
		//range *= 2;
		const normLen = 0.125*(steps/range) * (( 12/ Math.PI ) / pointScalar);
		for( let x = -range; x <= range;  x += (2*range)/steps ) {
			for( let y = -range; y <= range;  y += (2*range)/steps ) {
				for( let z = -range; z <= range; z += (2*range)/steps ) {
					const ll = Math.abs(cx+x)+Math.abs(cy+y)+Math.abs(cz+z);
					const px = cx+x;
					const py = cy+y;
					const pz = cz+z;
					const lr = Math.sqrt( px*px+py*py+pz*pz );
				if( (lr) > range ) continue;
					const lnQ = new lnQuat( 0,px,py,pz );
					simpleBasis( lnQ );	
				}
				
			}
			
		}
	
		function simpleBasis(lnQ) {
				const basis = lnQ.update().getBasis( );

				// the original normal direction; projected offset of sphere (linear scaled)
				const ox = pointScalar*(unscaled?lnQ.x:(invert?lnQ.x:(lnQ.θ*lnQ.nx)));
				const oy = pointScalar*(unscaled?lnQ.y:(invert?lnQ.y:(lnQ.θ*lnQ.ny)));
				const oz = pointScalar*(unscaled?lnQ.z:(invert?lnQ.z:(lnQ.θ*lnQ.nz)));
		
		        //drawN( lnQ );
				normalVertices.push( new THREE.Vector3( ox*spaceScale			     ,oy*spaceScale			     , oz*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox*spaceScale + basis.right.x*normal_del/normLen  ,oy*spaceScale + basis.right.y*normal_del /normLen , oz*spaceScale + basis.right.z*normal_del/normLen ))
																				
				normalVertices.push( new THREE.Vector3( ox*spaceScale			     ,oy*spaceScale			     , oz*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox*spaceScale + basis.up.x*normal_del/normLen     ,oy*spaceScale + basis.up.y*normal_del/normLen     , oz*spaceScale + basis.up.z*normal_del/normLen ))
																				
				normalVertices.push( new THREE.Vector3( ox*spaceScale			     ,oy*spaceScale			     , oz*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox*spaceScale + basis.forward.x*normal_del/normLen,oy*spaceScale + basis.forward.y*normal_del/normLen, oz*spaceScale + basis.forward.z*normal_del/normLen ))
		
				normalColors.push( new THREE.Color( 255,0,0,0.25 ))
				normalColors.push( new THREE.Color( 255,0,0,0.25 ))
				normalColors.push( new THREE.Color( 0,255,0,0.25 ))
				normalColors.push( new THREE.Color( 0,255,0,0.25 ))
				normalColors.push( new THREE.Color( 0,0,0.9,0.25))
				normalColors.push( new THREE.Color( 0,0,0.9,0.25 ))
				
		}

	}


	// graph of location to rotation... 

	function doDrawBasis(lnQ2,t,s,Del,from,colorS, gamma, theta, g2In, r	 ) {

		const basis = lnQ2.update().getBasisT( Del,from );
		const normal_del = 3;
		if( !s ) s = 1.0;
		s = s/Math.PI;
		if( !colorS ) colorS = s;
		const l = 1;//(t instanceof lnQuat)?1/t.θ:1;
		if( t != lnQ2 || showArms )  {
			normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale			       ,(t.y/l)*spaceScale			       , (t.z/l)*spaceScale			       ))
			normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale + basis.right.x*normal_del*s  ,(t.y/l)*spaceScale + basis.right.y*normal_del*s  , (t.z/l)*spaceScale + basis.right.z*normal_del*s  ))
																					
			normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale			       ,(t.y/l)*spaceScale			       , (t.z/l)*spaceScale			       ))
			normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale + basis.up.x*normal_del*s     ,(t.y/l)*spaceScale + basis.up.y*normal_del *s    , (t.z/l)*spaceScale + basis.up.z*normal_del*s     ))
																					
			normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale			       ,(t.y/l)*spaceScale			       , (t.z/l)*spaceScale				))
			normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale + basis.forward.x*normal_del*s,(t.y/l)*spaceScale + basis.forward.y*normal_del*s, (t.z/l)*spaceScale + basis.forward.z*normal_del*s ))

			{
				normalColors.push( new THREE.Color( 1.0*colorS,0,0,255 ))
				normalColors.push( new THREE.Color( 1.0*colorS,0,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*colorS,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*colorS,0,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*colorS,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*colorS,255 ))
			}
		}

		if( showRotationCurves )
		{
			let x_ = 0;
			let y_ = 0;
			let z_ = 0;
			let first = true;

			let color = new THREE.Color( 1.0 * (theta+range)/range * 0.5,1.0 * (gamma+range)/range * 0.5,0,255 );
			const lnQ = new lnQuat();
			range = deg2rad( curSliders.lnQZ[0] );
			let minofs, maxofs;

			if( showRotationCurve === "X") {
				minofs = -(maxofs = Math.PI/2);
				color = new THREE.Color( 1.0 * (theta+range)/range * 0.5,1.0 * (gamma+range)/range * 0.5,0,255 );
			} else {
				minofs = -(maxofs = Math.PI/100);
				color = new THREE.Color( 0.2 * (theta+range)/range * 0.5,0.2 * (gamma+range)/range * 0.5,0,255 );
			}
			first = true;

				//lnQuat.setTwistDelta( twistDelta );

			if( showRotationCurve === "X" )
			for( let latPlus = minofs; latPlus <= maxofs; latPlus += (maxofs-minofs)/20 ){

				lnQx2.set( {lat:curSliders.lnQX[0] + latPlus,lng:curSliders.lnQY[0]}, false ).yaw(twistDelta);//.yaw(curSliders.lnQZ[0]*Math.PI-twist);//.update();

				let g2 = gamma ;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				let t2 = theta;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				if( _1norm ) {
					g2 = 1.414*gamma / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
					t2 = 1.414*theta / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				}
				//if( merge ) {
					pMake( lnQ, t2, g2, lnQx2, g2In, r);

					let x = lnQ.x;
					let y = lnQ.y;
					let z = lnQ.z;
					if( !showScaledPoints  ) {
						const r = Math.sqrt(x*x+y*y+z*z);
						const l = Math.abs(x)+Math.abs(y)+Math.abs(z);
						x *= r / l;
						y *= r / l;
						z *= r / l;
					}
					if( first ) {
						first = false;
					}else {
						//console.log( "Draw point:", x, y, z );
						normalVertices.push( new THREE.Vector3( (x_)*pointScalar*spaceScale			       ,(y_)*pointScalar*spaceScale			       , (z_)*pointScalar*spaceScale			       ))
						normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale                 ,(y)*pointScalar*spaceScale  , (z)*pointScalar*spaceScale  ))
																								
						normalColors.push( color)
						normalColors.push( color)
					}
					x_ = x; y_ = y; z_ = z;

			}

			if( showRotationCurve === "Y") {
				minofs = -(maxofs = Math.PI/2);
				color = new THREE.Color( 1.0 * (theta+range)/range * 0.5,1.0 * (gamma+range)/range * 0.5,0,255 );
			} else {
				minofs = -(maxofs = Math.PI/10);
				color = new THREE.Color( 0.2 * (theta+range)/range * 0.5,0.2 * (gamma+range)/range * 0.5,0,255 );
			}
if(1) {
			first = true;
			if( showRotationCurve === "Y" )
			for( let latPlus = minofs; latPlus <= maxofs; latPlus += (maxofs-minofs)/20 ){
				lnQx2.set( {lat:curSliders.lnQX[0] ,lng:curSliders.lnQY[0]+ latPlus}, false ).yaw(twistDelta);//.yaw(curSliders.lnQZ[0]*Math.PI-twist);//.update();

				let g2 = gamma ;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				let t2 = theta;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				if( _1norm ) {
					g2 = 1.414*gamma / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
					t2 = 1.414*theta / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				}
				//if( merge ) {
					pMake( lnQ, t2, g2, lnQx2, g2In, r);

					let x = lnQ.x;
					let y = lnQ.y;
					let z = lnQ.z;
					if( !showScaledPoints  ) {
						const r = Math.sqrt(x*x+y*y+z*z);
						const l = Math.abs(x)+Math.abs(y)+Math.abs(z);
						x *= r / l;
						y *= r / l;
						z *= r / l;
					}
					if( first ) {
						first = false;
					}else {
						//console.log( "Draw point:", x, y, z );
						normalVertices.push( new THREE.Vector3( (x_)*pointScalar*spaceScale			       ,(y_)*pointScalar*spaceScale			       , (z_)*pointScalar*spaceScale			       ))
						normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale                 ,(y)*pointScalar*spaceScale  , (z)*pointScalar*spaceScale  ))
																								
						normalColors.push(color)
						normalColors.push(color)
					}
					x_ = x; y_ = y; z_ = z;

			}

			if( showRotationCurve === "Z") {
				minofs = -(maxofs = Math.PI/2);
				color = new THREE.Color( 1.0 * (theta+range)/range * 0.5,1.0 * (gamma+range)/range * 0.5,0,255 );
			} else {
				minofs = -(maxofs = Math.PI/10);
				color = new THREE.Color( 0.2 * (theta+range)/range * 0.5,0.2 * (gamma+range)/range * 0.5,0,255 );
				
			}
			first = true;
			if(  showRotationCurve === "Z" )
			for( let latPlus = minofs; latPlus <= maxofs; latPlus += (maxofs-minofs)/20 ){
				//lnQuat.setTwistDelta( twistDelta + latPlus );
				lnQx2.set( {lat:curSliders.lnQX[0],lng:curSliders.lnQY[0]}, false ).yaw(twistDelta+latPlus);//.yaw(curSliders.lnQZ[0]*Math.PI-twist);//.update();

				let g2 = gamma ;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				let t2 = theta;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				if( _1norm ) {
					g2 = 1.414*gamma / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
					t2 = 1.414*theta / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				}
				//if( merge ) {
					pMake( lnQ, t2, g2, lnQx2, g2In, r);

					let x = lnQ.x;
					let y = lnQ.y;
					let z = lnQ.z;
					if( !showScaledPoints  ) {
						const r = Math.sqrt(x*x+y*y+z*z);
						const l = Math.abs(x)+Math.abs(y)+Math.abs(z);
						x *= r / l;
						y *= r / l;
						z *= r / l;
					}
					if( first ) {
						first = false;
					}else {
						//console.log( "Draw point:", x, y, z );
						normalVertices.push( new THREE.Vector3( (x_)*pointScalar*spaceScale			       ,(y_)*pointScalar*spaceScale			       , (z_)*pointScalar*spaceScale			       ))
						normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale                 ,(y)*pointScalar*spaceScale  , (z)*pointScalar*spaceScale  ))
																								
						normalColors.push( color)
						normalColors.push( color)
					}
					x_ = x; y_ = y; z_ = z;

			}

			//lnQuat.setTwistDelta( twistDelta );



		}
}
		let x = lnQ2.x,y =lnQ2.y,z= lnQ2.z;
			if( from ) {

				if( SLERP ) {
					const dot =  lnQ2.nx * from.nx 
						    + lnQ2.ny * from.ny 
						    + lnQ2.nz * from.nz 
						;
					const angle = Math.acos( dot );
					if( Math.abs(angle) < 0.0001 ){
						x = lnQ2.x * Del + from.x ;
						y = lnQ2.y * Del + from.y ;
						z = lnQ2.z * Del + from.z ;
					} else {
						const sa = Math.sin(angle);
						const sa1 = Math.sin((1-Del)*angle);
						const sa2 = Math.sin(Del*angle);
					
						x = (from.x+lnQ2.x) * sa2/sa + from.x * sa1/sa;
						y = (from.y+lnQ2.y) * sa2/sa + from.y * sa1/sa;
						z = (from.z+lnQ2.z) * sa2/sa + from.z * sa1/sa;
					}
				} 
				else {
					x = from.x + Del * lnQ2.x;
					y = from.y + Del * lnQ2.y;
					z = from.z + Del * lnQ2.z;
				}
			}

		{
			if( !showScaledPoints  ) {
				const r = Math.sqrt(x*x+y*y+z*z);
				const l = Math.abs(x)+Math.abs(y)+Math.abs(z);
				x *= r / l;
				y *= r / l;
				z *= r / l;
			}

			//console.log( "Draw point:", x, y, z );
			normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale			       ,(y)*pointScalar*spaceScale			       , (z)*pointScalar*spaceScale			       ))
			normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale + basis.right.x*normal_del*s  ,(y)*pointScalar*spaceScale + basis.right.y*normal_del*s  , (z)*pointScalar*spaceScale + basis.right.z*normal_del*s  ))
																				       
			normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale			       ,(y)*pointScalar*spaceScale			       , (z)*pointScalar*spaceScale			       ))
			normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale + basis.up.x*normal_del*s     ,(y)*pointScalar*spaceScale + basis.up.y*normal_del *s    , (z)*pointScalar*spaceScale + basis.up.z*normal_del*s     ))
																				       
			normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale			       ,(y)*pointScalar*spaceScale			       , (z)*pointScalar*spaceScale				))
			normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale + basis.forward.x*normal_del*s,(y)*pointScalar*spaceScale + basis.forward.y*normal_del*s, (z)*pointScalar*spaceScale + basis.forward.z*normal_del*s ))
		   
			{
				//const s = t / (Math.PI*4);
				const s = colorS;
				normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
				normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
			}
		}
	}



function tickQuat( shapes ) {
	

}

function focusSlider( slider, path, n ) {
	showRotationCurve = path;
	showRotationCurveSegment = n;
	updateMesh();
	
}

function blurSlider( slider ) {
	//showRotationCurve = null;
	//showRotationCurveSegment = -1;
	//updateMesh();
}
let is;
is = document.getElementById( "twistDelta" );
is.onfocus = ((is,n)=>()=>focusSlider( is, "Z", n ))(is,n);


for( var n = 1; n <= 5; n++ ) {
		is = document.getElementById( "lnQX"+n );
		is.onfocus = ((is,n)=>()=>focusSlider( is, "X", n ))(is,n);
		is = document.getElementById( "lnQY"+n );
		is.onfocus = ((is,n)=>()=>focusSlider( is,"Y", n ))(is,n);
	}


window.DrawQuatPaths = DrawQuatPaths;
function DrawQuatPaths(normalVertices_,normalColors_, shapes) {
	normalVertices = normalVertices_
	normalColors = normalColors_
	curSliders.lnQX = [];
	curSliders.lnQY = [];
	curSliders.lnQZ = [];
	drawRawRot = document.getElementById( "drawRawRot")?.checked;
        mountOrder = document.getElementById( "mountNone")?.checked?6
        	: document.getElementById( "mountYRP")?.checked?5
        	: document.getElementById( "mountYPR")?.checked?4
        	: document.getElementById( "mountPRY")?.checked?3
        	: document.getElementById( "mountPYR")?.checked?2
        	: document.getElementById( "mountRPY")?.checked?1
        	: document.getElementById( "mountRYP")?.checked?0
                : 6
                ;
        
		if( document.getElementById( "invertCrossProduct" )?.checked ) {
			lnQuat.invertCrossProduct = true;
		}else 			
			lnQuat.invertCrossProduct = false;

	drawRawRotIter = document.getElementById( "drawRawRotIter")?.checked;
	drawRotIter = document.getElementById( "drawRotIter")?.checked;
	drawMechanicalRot = document.getElementById( "drawMechanicalRot")?.checked;
	showArms = document.getElementById( "showArm")?.checked;
	rawAngles = document.getElementById( "rawAngles")?.checked;
	//normalizeTangents = document.getElementById( "normalizeTangents" )?.checked;
	applyAccel = document.getElementById( "applyAccel" )?.checked;
	drawWorldAxles = document.getElementById( "drawWorldAxles" )?.checked;
	showRotationCurves = showSliderCurves = document.getElementById( "showSliderCurves" )?.checked;
	//showFullRange = document.getElementById( "showSliderCurves" )?.checked;

	let rotateXArm = document.getElementById( "drawArmFromX" )?.checked;
	let rotateYArm = document.getElementById( "drawArmFromY" )?.checked;
	let rotateZArm = document.getElementById( "drawArmFromZ" )?.checked;

	if( rotateXArm )
		armPrimary= 0;
	else if( rotateYArm )
		armPrimary= 1;
	else if( rotateZArm )
		armPrimary= 2;

	let scalar = document.getElementById( "largeRange")?.checked;
	let scalar2 = document.getElementById( "fineRange")?.checked;

	if( scalar2 && !scalar ) pointScalar = (12/ Math.PI);
	if( !scalar2 && !scalar ) pointScalar = (3/ Math.PI);
	if( scalar2 && scalar ) pointScalar = (2/ Math.PI);
	if( !scalar2 && scalar ) pointScalar = ( Math.PI/2);


	let axis = document.getElementById( "showAxis")?.checked;
	let degrees = document.getElementById( "showDegrees")?.checked;

	{
		let td = Number(document.getElementById( "twistDelta" ).value);
		if( gridSteps ){
			gridStepCount = Number(gridSteps.value) + 1;
			gridStepSpan.textContent = gridStepCount;
		}
		twistDelta =twist= ( (td/500)-1 ) * Math.PI * 4.25;
		document.getElementById( "twistDeltaValue" ).textContent = (twistDelta/Math.PI).toFixed(4)+ "π";

		lnQuat.setTwistDelta( twistDelta );
		currentOctave = Number(document.getElementById( "octave" ).value);

		for( var n = 1; n <= 5; n++ ) {
			let lnQX = Number(document.getElementById( "lnQX"+n ).value);
			let lnQY = Number(document.getElementById( "lnQY"+n ).value);
			let lnQZ = Number(document.getElementById( "lnQZ"+n ).value);
			if( n === 1 ) {
			        totalNormal = (lnQY / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			}
			curSliders.lnQX[n-1] = (lnQX / 500 - 1);// * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			curSliders.lnQY[n-1] = (lnQY / 500 - 1);// * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			curSliders.lnQZ[n-1] = (lnQZ / 500 - 1);// * Math.PI * (scalar?6:1)*(scalar2?0.25:1);

			let lnQ;
		       	switch(n) {
			case 1:
				if( rawAngles )
					lnQ = lnQ1 = mkQuat( 0, curSliders.lnQX[0], curSliders.lnQY[0], curSliders.lnQZ[0] ).update();
				else
					lnQ = lnQ1 = makeQuat( curSliders.lnQX[0], curSliders.lnQY[0], curSliders.lnQZ[0] );
				break;
			case 2:
				if( rawAngles )
					lnQ = lnQ2 = mkQuat( 0, curSliders.lnQX[1], curSliders.lnQY[1], curSliders.lnQZ[1] ).update();
				else
					lnQ = lnQ2 = makeQuat( curSliders.lnQX[n-1], curSliders.lnQY[n-1], curSliders.lnQZ[n-1] );
				break;
			case 3:
				if( rawAngles )
					lnQ = lnQ3 = mkQuat( 0, curSliders.lnQX[2], curSliders.lnQY[2], curSliders.lnQZ[2] ).update();
				else
					lnQ = lnQ3 = makeQuat( curSliders.lnQX[n-1], curSliders.lnQY[n-1], curSliders.lnQZ[n-1] );
				break;
			case 4:
				if( rawAngles )
					lnQ = lnQ4 = mkQuat( 0, curSliders.lnQX[3], curSliders.lnQY[3], curSliders.lnQZ[3] ).update();
				else
					lnQ = lnQ4 = makeQuat( curSliders.lnQX[n-1], curSliders.lnQY[n-1], curSliders.lnQZ[n-1] );
				break;
			case 5:
				if( rawAngles )
					lnQ = lnQ5 = mkQuat( 0, curSliders.lnQX[4], curSliders.lnQY[4], curSliders.lnQZ[4] ).update();
				else
					lnQ = lnQ5 = makeQuat( curSliders.lnQX[n-1], curSliders.lnQY[n-1], curSliders.lnQZ[n-1] );
				break;
			}
	        
			lnQ.update();
	        
			const len = lnQ.θ;
			if( axis ) {
				document.getElementById( "lnQXval"+n).textContent = (lnQ.nx).toFixed(4);
				document.getElementById( "lnQYval"+n).textContent = (lnQ.ny).toFixed(4);
				document.getElementById( "lnQZval"+n).textContent = (lnQ.nz).toFixed(4);
			}else {
				// normalize the output angle... 
				const nL = Math.abs(lnQ.x)+Math.abs(lnQ.y)+Math.abs(lnQ.z);
				if( degrees ) {
					document.getElementById( "lnQXval"+n).textContent = (lnQ.x/nL*lnQ.θ*180/Math.PI).toFixed(4);
					document.getElementById( "lnQYval"+n).textContent = (lnQ.y/nL*lnQ.θ*180/Math.PI).toFixed(4);
					document.getElementById( "lnQZval"+n).textContent = (lnQ.z/nL*lnQ.θ*180/Math.PI).toFixed(4);
				}else{
					document.getElementById( "lnQXval"+n).textContent = (lnQ.x/nL*lnQ.θ).toFixed(4);
					document.getElementById( "lnQYval"+n).textContent = (lnQ.y/nL*lnQ.θ).toFixed(4);
					document.getElementById( "lnQZval"+n).textContent = (lnQ.z/nL*lnQ.θ).toFixed(4);
				}
			}               


            const xyr = lnQ.θ;
			const xyl = lnQ.θ;
			const showInterpolant = document.getElementById( "drawInterp"+n)
			if( showInterpolant )  
				drawRotationInterpolant[n-1] = showInterpolant.value;
			const useStep = document.getElementById( "useStep"+n)
			if( stepScalar[n-1] = useStep.checked ) {
				document.getElementById( "stepScalar"+n).textContent = (xyl/xyr).toFixed(4);
			} else {
				document.getElementById( "stepScalar"+n).textContent = 1;
				
			}
	        
	        
			if( degrees ) {
				document.getElementById( "xRot"+n).textContent = (curSliders.lnQX[n-1] *180/Math.PI).toFixed(4);
				document.getElementById( "yRot"+n).textContent = (curSliders.lnQY[n-1] *180/Math.PI).toFixed(4);
				document.getElementById( "lnQAngle"+n).textContent = (len*180/Math.PI).toFixed(4);
			} else {
				document.getElementById( "xRot"+n).textContent = (curSliders.lnQX[n-1] ).toFixed(4);
				document.getElementById( "yRot"+n).textContent = (curSliders.lnQY[n-1] ).toFixed(4);
				document.getElementById( "lnQAngle"+n).textContent = (len).toFixed(4);
			}
			if( degrees ) {
			} else {
			}
			//document.getElementById( "lnQYEulerval"+n).textContent = (qlen*180/Math.PI).toFixed(4);
			
	        
		}

        curSliders.lnQX[0] = (curSliders.lnQX[0] * 4.25*Math.PI);
        curSliders.lnQY[0] = (curSliders.lnQY[0] * 4.25*Math.PI);
        curSliders.lnQZ[0] = 2*( (curSliders.lnQZ[0] +1) * 180  + 10 ) ;

        document.getElementById( "lnQXval1").textContent = ( curSliders.lnQX[0]/Math.PI).toFixed(4) + "π";
        document.getElementById( "lnQYval1").textContent = ( curSliders.lnQY[0]/Math.PI).toFixed(4) + "π";
        document.getElementById( "lnQZval1").textContent = ( curSliders.lnQZ[0]).toFixed(4) ;

		timeScale = 3*(Number(document.getElementById( "timeScalar" )?.value ) / 450 -1);
		document.getElementById( "timeScalarValue" ).textContent = timeScale.toFixed(4);
	        
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
	        
		check = document.getElementById( "drawRotationAxles " );
		if( check ) {
			drawRotationAxles  = check.checked;
		}
		check = document.getElementById( "drawAllRotationAxles " );
		if( check ) {
			drawAllRotationAxles  = check.checked;
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
	        
	        
		if( document.getElementById( "drawRotationAllAxles" )?.checked ) {
			drawRotationAllAxles = true;
		}else 			
			drawRotationAllAxles = false;
	        
		if( document.getElementById( "drawRotationAxles" )?.checked ) {
			drawRotationAxles = true;
		}else 			
			drawRotationAxles = false;
	        
		if( document.getElementById( "drawSquares" )?.checked ) {
			drawRotationSquares = true;
		}else 			
			drawRotationSquares = false;
	        
		if( document.getElementById( "drawSquaresXY" )?.checked ) {
			drawRotationSquaresXY = true;
		}else 			
			drawRotationSquaresXY = false;
	        
		if( document.getElementById( "drawSquaresYX" )?.checked ) {
			drawRotationSquaresYX = true;
		}else 			
			drawRotationSquaresYX = false;
		
	        
		fixAxleRotation	= document.getElementById( "fixAxleRotation" )?.checked ;
	        
		showCoords = document.getElementById( "showCoords" )?.checked ;
	        
		if( document.getElementById( "showScaled" )?.checked ) {
			showScaledPoints = true;
		}
		else 			
			showScaledPoints = false;
	        
		check = document.getElementById( "showX1" );
		if( check ) {
			showLineSeg[0] = check.checked;
		}
		check = document.getElementById( "showX2" );
		if( check ) {
			showLineSeg[1] = check.checked;
		}
		check = document.getElementById( "showX3" );
		if( check ) {
			showLineSeg[2] = check.checked;
		}
		check = document.getElementById( "showX4" );
		if( check ) {
			showLineSeg[3] = check.checked;
		}
		check = document.getElementById( "showX5" );
		if( check ) {
			showLineSeg[4] = check.checked;
		}
	        
		useSub = document.getElementById( "useIterations")?.checked;
		subIterations = Number(document.getElementById( "subIterations")?.value);
		document.getElementById( "subIterationsValue").textContent = subIterations;
	        
		check = document.getElementById( "normalizeTangents");
		if( check )
			normalizeNormalTangent = false && check.checked; // global variable from lnQuat.js
		
		drawGrid( normalVertices,normalColors, curSliders);
		
		// show basis map
		if( showCoordinateGrid || showInvCoordinateGrid || showRawCoordinateGrid ) {
			const range = (2) * Math.PI;
			const minRange = (0) * Math.PI;
			drawRange( 0,0,0, range, 60, minRange, showRawCoordinateGrid, showInvCoordinateGrid );
		}
				
		// squares is calculated in analog arm.
	}

	return tickQuat;

}

