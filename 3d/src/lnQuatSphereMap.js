
import {lnQuat,slerp} from "./lnQuatSq.js"
let pointScalar = 12/ Math.PI;

let armPrimary = 1; // 0 = x, 1=y, 2=z
let A,B,C,D,E;  // slider values
let xRot, yRot, zRot;
let AxRot, AyRot, AzRot;
let turnCount = 12;
let stepCount = 1000;
let showCoordinateGrid = false;
let drawNormalBall = false;
let normalizeNormalTangent = false;
let showInvCoordinateGrid = false;
let showRawCoordinateGrid = false;
let twistCount = 2;
let showScaledPoints = false; // show X/Y/Z Scaled to SO3 Axis/||Axis||_2 * Angle
let showCoords = false;
let bisectAnalog = false;
let trisectAnalog = false;
let timeScale = 1.5;
let drawRotationAxles = true;
let drawRotationAllAxles = true;
let drawRotationSquares = true;
let drawRotationSquaresXY = true;
let drawRotationSquaresYX = true;
let drawRotationSquareLimit = 1;
let showLineSeg = [true,false,false,false,false];
let fixAxleRotation= true;
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
let keepInertia = document.getElementById( "keepInertia" )?.checked;
let applyAccel = document.getElementById( "applyAccel" )?.checked;
let showSliderCurves = false;
let totalNormal = 0;
let drawWorldAxles = false;
let mountOrder = 0;
let currentOctave = 0;

let lnQx = new lnQuat();
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

let normalVertices,normalColors;
	const spaceScale = 0.70;
	const normal_del = 0.14;

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
		const l2 = Math.sqrt(p*p+y*y);
		const l3 = Math.sqrt(p*p+y*y+r*r);
		//return mkQuat(0,p,y/l2,r/l3);
		return mkQuat(0,p,y,r);
	}
	}
}

function test1() {
	// this test fails... although I would think that Y and PQ5 should be close
	const P = new lnQuat( 0, 0.1, 0.2, 0.3 ).update();
	const Q = new lnQuat( 0, -0.3, -0.1, 0.2 ).update();
	const PQ1 = new lnQuat(0,P.x,P.y,P.z).freeSpin( Q.θ, Q );
	const PQ5 = new lnQuat(0,P.x,P.y,P.z).freeSpin( Q.θ*0.5, Q );
	SLERP=true;
	const X = P.slerp( PQ1, 0.5 );
	SLERP=false;
	const Y = P.slerp( PQ1, 0.5 );
	console.log( "Things:", X, Y, PQ5 );
}
//test1();

function mkQuat( a,b,c,d ){
	//const scalar = Math.sqrt(a*a+b*b+c*c+d*d);
	//const lin = Math.abs(a)+Math.abs(b)+Math.abs(c)+Math.abs(d);
	//return new lnQuat( a*scalar/lin, b*scalar/lin ,c*scalar/lin,d*scalar/lin );
	//return new lnQuat( a*lin/scalar, b*lin/scalar ,c*lin/scalar,d*lin/scalar );
	return new lnQuat( a, b, c, d );
}



	function pushN2(n,s1,s2){
		let c1 = Math.floor(s1)/10;
		s1 = s1 % 1;
		let c2 = Math.floor(s2)/10;
		s2 = s2 % 1;
		switch( n ) {
		case 0:
			normalColors.push( new THREE.Color( 1.0*s1,1.0*c1,1.0*c1,255 ))
			normalColors.push( new THREE.Color( 1.0*s2,1.0*c2,1.0*c2,255 ))
			break;
		case 1:
			normalColors.push( new THREE.Color( 1.0*c1,1.0*s1,1.0*c1,255 ))
			normalColors.push( new THREE.Color( 1.0*c2,1.0*s2,1.0*c2,255 ))
			break;
		case 2:
			normalColors.push( new THREE.Color( 1.0*c1,1.0*c1,1.0*s1,255 ))
			normalColors.push( new THREE.Color( 1.0*c2,1.0*c2,1.0*s2,255 ))
			break;
		case 3:
			normalColors.push( new THREE.Color( 1.0*c1,1.0*s1,1.0*s1,255 ))
			normalColors.push( new THREE.Color( 1.0*c2,1.0*s2,1.0*s2,255 ))
			break;
		case 4:
			normalColors.push( new THREE.Color( 1.0*s1,1.0*s1,1.0*c1,255 ))
			normalColors.push( new THREE.Color( 1.0*s2,1.0*s2,1.0*c2,255 ))
			break;
		}
	}

	function pushN(n,s){
		if( !s ) s = 0.99;
		let c = Math.floor(s)/10;
		s = s % 1;
		switch( n ) {
		case 0:
			normalColors.push( new THREE.Color( 1.0*s,1.0*c,1.0*c,255 ))
			normalColors.push( new THREE.Color( 1.0*s,1.0*c,1.0*c,255 ))
			break;
		case 1:
			normalColors.push( new THREE.Color( 1.0*c,1.0*s,1.0*c,255 ))
			normalColors.push( new THREE.Color( 1.0*c,1.0*s,1.0*c,255 ))
			break;
		case 2:
			normalColors.push( new THREE.Color( 1.0*c,1.0*c,1.0*s,255 ))
			normalColors.push( new THREE.Color( 1.0*c,1.0*c,1.0*s,255 ))
			break;
		case 3:
			normalColors.push( new THREE.Color( 1.0*c,1.0*s,1.0*s,255 ))
			normalColors.push( new THREE.Color( 1.0*c,1.0*s,1.0*s,255 ))
			break;
		case 4:
			normalColors.push( new THREE.Color( 1.0*s,1.0*s,1.0*c,255 ))
			normalColors.push( new THREE.Color( 1.0*s,1.0*s,1.0*c,255 ))
			break;
		}
	}


	function deg2rad(n) { return n * Math.PI/180 }
	let twist = 0;

	function backConvert(q, v, range ){

		const s  = q.s;
		const qw = q.qw;
		
		const dqw = s/q.θ; // sin(theta)/r
	
		const qx = -q.x * dqw;
		const qy = -q.y * dqw;
		const qz = -q.z * dqw;
	
		const tx = 2 * (qy * v.z - qz * v.y);
		const ty = 2 * (qz * v.x - qx * v.z);
		const tz = 2 * (qx * v.y - qy * v.x);
	
		const vxOut = v.x + qw * tx + ( qy * tz - ty * qz );
		const vyOut = v.y + qw * ty + ( qz * tx - tz * qx );
		const vzOut = v.z + qw * tz + ( qx * ty - tx * qy );

		{ // convert normal to x/0/z normal
			const l3 = Math.sqrt(vxOut*vxOut+vyOut*vyOut+vzOut*vzOut);
			const tmpy = vyOut /l3; // square normal
			const cosTheta = Math.acos( tmpy ); // 1->-1 (angle from pole around this circle.
			const norm1 = Math.sqrt(vxOut*vxOut+vzOut*vzOut);
			return {x: (vzOut/norm1 * cosTheta/range), y: (-vxOut/norm1 * cosTheta)/range };
		}
	}

	function pMake(q, x, y, o ){
	}
	function pMake(q, x, y, o ){

		const qlen = Math.sqrt(x*x + y*y);

		const qnx = qlen?x / qlen:0;
		const qny = qlen?0:1;
		const qnz = qlen?y / qlen:0;

		
		q.x = x+o.x;
		q.y = 0+o.y;
		q.z = y+o.z;
		q.dirty = true;
		return q;
	

		const ax = o.nx
		const ay = o.ny
		const az = o.nz
		const th = o.θ;

		{ // finish rodrigues
			const AdotB = (qnx*ax + /*q.ny*ay +*/ qnz*az);
		
			const xmy = (th - qlen)/2; // X - Y  (x minus y)
			const xpy = (th + qlen)/2  // X + Y  (x plus y )
			const cxmy = Math.cos(xmy);
			const cxpy = Math.cos(xpy);
			const cosCo2 = ( ( 1-AdotB )*cxmy + (1+AdotB)*cxpy )/2;
		
			let ang = Math.acos( cosCo2 )*2 + (currentOctave * Math.PI*4);
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
				
				q.θ  = ang;
				q.qw = cosCo2;
				q.s  = Math.sin(ang/2);
				q.nx = Cx*Clx;
				q.ny = Cy*Clx;
				q.nz = Cz*Clx;
				
				q.x  = q.nx*ang;
				q.y  = q.ny*ang;
				q.z  = q.nz*ang;
		
				q.dirty = false;
			} else {
				// two axles are coincident, add...
				if( AdotB > 0 ) {
					q.x = qnx * (qlen+th);
					q.y = qny * (qlen+th);
					q.z = qnz * (qlen+th);
				}else {
					q.x = qnx * (qlen-th);
					q.y = qny * (qlen-th);
					q.z = qnz * (qlen-th);
				}
				q.dirty = true;
			}
		}
		return q;
	}


	const tmpPoint = { x:0, y:0, z:0 };
	function drawGrid(normalVertices,normalColors, curSliders) {
		const merge = document.getElementById( "additiveMerge" )?.checked;
		const _1norm = document.getElementById( "oneNormal" )?.checked;
		const lnQ = new lnQuat();
		const spaceScale = 18;
		const p = [];
		const p2 = [];
		let gamline ;
		lnQx.set( {lat:curSliders.lnQX[0],lng:curSliders.lnQY[0]}, true );//.yaw(curSliders.lnQZ[0]*Math.PI-twist);//.update();
		lnQx.update();
		const lnQxText = document.getElementById( "lnQXval1q" );
		const lnQyText = document.getElementById( "lnQYval1q" );
		const lnQzText = document.getElementById( "lnQZval1q" );
		lnQxText.textContent = "qX:"+(lnQx.x/Math.PI).toFixed(4) + "π";
		lnQyText.textContent = "qY:"+(lnQx.y/Math.PI).toFixed(4) + "π";
		lnQzText.textContent = "qZ:"+(lnQx.z/Math.PI).toFixed(4) + "π";
		range = deg2rad( curSliders.lnQZ[0] );
		const step = range/16;
		
		for( let theta = -(range); theta <= (range); theta += (step) ){
	
			const draw = p.length;
			const draw2 = p2.length;
			
			gamline = 0;
			for( let gamma = -(range); gamma <= (range); gamma += (step), gamline++ ){
				let g2 = gamma;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				let t2 = theta;// / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				if( _1norm ) {
					g2 = 1.414*gamma / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
					t2 = 1.414*theta / (Math.abs(gamma)+Math.abs(theta)) * Math.sqrt( gamma*gamma+theta*theta);
				}

				if( merge ) {
					pMake( lnQ, t2, g2, lnQx);
					//doDrawBasis( lnQ, lnQ, 1, 1, null, 1 );
					//lnQ.x = theta; lnQ.y = 0; lnQ.z = gamma;
					//lnQ.dirty = true;
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
				
				const basis = lnQ.update().getBasis();
				tmpPoint.x = basis.up.x * spaceScale*1.43 ;
				tmpPoint.y = basis.up.y * spaceScale*1.43 ;
				tmpPoint.z = basis.up.z * spaceScale*1.43 ;
					doDrawBasis( lnQ, tmpPoint, 0.25, 1, null, 1 );
				if( draw ) {

					const oldp = p[gamline];
					normalVertices.push( new THREE.Vector3( (oldp.x)*spaceScale ,(oldp.y)*spaceScale    , (oldp.z)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (basis.up.x)*spaceScale ,(basis.up.y)*spaceScale    , (basis.up.z)*spaceScale ))
					oldp.x = basis.up.x;
					oldp.y = basis.up.y;
					oldp.z = basis.up.z;
					normalColors.push( new THREE.Color( 0,1.0 * (gamma+range)/range * 0.5,0,255 ))
					normalColors.push( new THREE.Color( 0,1.0 * (gamma+range)/range * 0.5,0,255 ))
				}else 
					p.push( {x:basis.up.x,y:basis.up.y,z:basis.up.z} )
	
				if( merge ) {
					pMake( lnQ, g2, t2, lnQx );
					//lnQ.x = gamma; lnQ.y = 0; lnQ.z = theta;
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
				if( draw2 ) {
					const oldp = p2[gamline];
					normalVertices.push( new THREE.Vector3( (oldp.x)*spaceScale ,(oldp.y)*spaceScale    , (oldp.z)*spaceScale ))
					normalVertices.push( new THREE.Vector3( (basis2.up.x)*spaceScale ,(basis2.up.y)*spaceScale    , (basis2.up.z)*spaceScale ))
					oldp.x = basis2.up.x;
					oldp.y = basis2.up.y;
					oldp.z = basis2.up.z;
	
					normalColors.push( new THREE.Color( 1.0*(gamma+range)/range*0.5,0,0,255 ))
					normalColors.push( new THREE.Color( 1.0*(gamma+range)/range*0.5,0,0,255 ))


				}else 
					p2.push( {x:basis2.up.x,y:basis2.up.y,z:basis2.up.z} )
			}
		}
	}





function drawCoordinateGrid() {
	if( showCoordinateGrid || showInvCoordinateGrid || showRawCoordinateGrid ) {
		const range = (2 ) * Math.PI;
		const minRange = (0) * Math.PI;
		drawRange( 0,0,0, range, 30, minRange, showRawCoordinateGrid, showInvCoordinateGrid );
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

	function drawN( lnQ )
	{
	const v = { x:0,y:1,z:0};
			simpleBasis(lnQ);
			const new_v = lnQ.apply( v );
			const basis = lnQ.getBasis( );

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale,new_v.y*spaceScale, new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.right.x*normal_del,new_v.y*spaceScale + basis.right.y*normal_del,new_v.z*spaceScale + basis.right.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale			,new_v.y*spaceScale			, new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del,new_v.y*spaceScale + basis.up.y*normal_del,new_v.z*spaceScale + basis.up.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale			     ,new_v.y*spaceScale			     , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.forward.x*normal_del,new_v.y*spaceScale + basis.forward.y*normal_del,new_v.z*spaceScale + basis.forward.z*normal_del ))

			normalColors.push( new THREE.Color( 0.6,0,0,0.6 ))
			normalColors.push( new THREE.Color( 0.6,0,0,0.6 ))
			normalColors.push( new THREE.Color( 0,0.6,0,0.6 ))
			normalColors.push( new THREE.Color( 0,0.6,0,0.6 ))
			normalColors.push( new THREE.Color( 0,0,0.6,0.6))
			normalColors.push( new THREE.Color( 0,0,0.6,0.6 ))
			
	
	}
	}


	// graph of location to rotation... 
	function drawRangeOnBall( cx,cy,cz,range,steps, minr, unscaled, invert ) {
		
		if( !minr ) minr = 0;
		const normLen = 0.5*(steps/range);

		if(0)
		for( let z = -range; z <= range;  z += (range)/steps ) {
			const lnQ = new lnQuat( {a:totalNormal, b:0, c:totalNormal-z } );
			drawN( lnQ );
			simpleBasis( lnQ );	
			
			//drawN( new lnQuat( {a:totalNormal, b:0, c:-z } ) );
			//drawN( new lnQuat( {a:-totalNormal, b:0, c:-z } ) );
			//drawN( new lnQuat( {a:-totalNormal, b:0, c:z } ) );
			
		}
		// this just gives the solid ring around for the same total...
		if(1)
		for( let t = 0; t <= 1.0;  t += 1/steps ) {
			const x = totalNormal * (1.0-t);
			const z = totalNormal * t;
			drawN( new lnQuat( {a:x, b:0, c:z } ) );
			drawN( new lnQuat( {a:x, b:0, c:-z } ) );
			drawN( new lnQuat( {a:-x, b:0, c:-z } ) );
			drawN( new lnQuat( {a:-x, b:0, c:z } ) );
			if(1){
				drawN( new lnQuat( {a:x,  b:z, c:0 } ) );
				drawN( new lnQuat( {a:x,  b:-z, c:0 } ) );
				drawN( new lnQuat( {a:-x, b:-z, c:0 } ) );
				drawN( new lnQuat( {a:-x, b:z, c:0 } ) );
				drawN( new lnQuat( {a:0,  b:z , c:x  } ) );
				drawN( new lnQuat( {a:0,  b:-z, c:x  } ) );
				drawN( new lnQuat( {a:0, b:-z , c:-x } ) );
				drawN( new lnQuat( {a:0, b:z  , c:-x } ) );
			}
		}
	if(0)	
		for( let x = -range; x <= range;  x += (2*range)/steps ) {
			for( let y = -range; y <= range;  y += (2*range)/steps ) {
				for( let z = -range; z <= range; z += (2*range)/steps ) {
					const ll = Math.abs(cx+x)+Math.abs(cy+y)+Math.abs(cz+z);
//					if( Math.abs( ll - Math.abs(totalNormal) ) > 0.05 ) continue;
			if(0)
					if( Math.abs( (Math.abs(z)+Math.abs(x)) - Math.abs(totalNormal) ) > 0.1 
								|| Math.abs(y) > 0.1 ) continue;
					//if( Math.abs( Math.abs(x) - Math.abs(totalNormal) ) > 0.1
					//			|| Math.abs(y) > 0.1 ) continue;
					//if( Math.abs( Math.abs(y) - Math.abs(totalNormal) ) > 0.2 ) continue;
					//if( Math.abs( Math.abs(z) - Math.abs(totalNormal) ) > 0.2 ) continue;
				if( (ll) > range ) continue;

				if( (Math.abs(z)+Math.abs(y)+Math.abs(x)) < minr ) continue;

					const lnQ = new lnQuat( {a:cx+x, b:cy+y, c:cz+z } );
					simpleBasis( lnQ );	
				}
				
			}
			
		}
	
		function simpleBasis(lnQ) {
					const basis = lnQ.getBasis( );
		
				// the original normal direction; projected offset of sphere (linear scaled)
				//normalVertices.push( new THREE.Vector3( x*spaceScale,0*spaceScale, z*spaceScale ))
				//normalVertices.push( new THREE.Vector3( x*spaceScale + 1*normal_del,0*spaceScale + 1*normal_del,z*spaceScale + 1*normal_del ))
				//normalColors.push( new THREE.Color( 255,0,255,255 ))
				//normalColors.push( new THREE.Color( 255,0,255,255 ))
		
				const pointScalar = 2/ Math.PI;
				const ox = pointScalar*lnQ.x;
				const oy = pointScalar*lnQ.y;
				const oz = pointScalar*lnQ.z;
		
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

	function drawN( lnQ )
	{
	const v = { x:0,y:1,z:0};
			simpleBasis(lnQ);
			const new_v = lnQ.apply( v );
			const basis = lnQ.getBasis( );

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale,new_v.y*spaceScale, new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.right.x*normal_del,new_v.y*spaceScale + basis.right.y*normal_del,new_v.z*spaceScale + basis.right.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale			,new_v.y*spaceScale			, new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del,new_v.y*spaceScale + basis.up.y*normal_del,new_v.z*spaceScale + basis.up.z*normal_del ))

			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale			     ,new_v.y*spaceScale			     , new_v.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.forward.x*normal_del,new_v.y*spaceScale + basis.forward.y*normal_del,new_v.z*spaceScale + basis.forward.z*normal_del ))

			normalColors.push( new THREE.Color( 0.6,0,0,0.6 ))
			normalColors.push( new THREE.Color( 0.6,0,0,0.6 ))
			normalColors.push( new THREE.Color( 0,0.6,0,0.6 ))
			normalColors.push( new THREE.Color( 0,0.6,0,0.6 ))
			normalColors.push( new THREE.Color( 0,0,0.6,0.6))
			normalColors.push( new THREE.Color( 0,0,0.6,0.6 ))
			
	
	}
	}


	function doDrawBasis(lnQ2,t,s,Del,from,colorS ) {

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





let clock = 0.0;
let start = 0;
const curPos = [new lnQuat(),];

function setMatrix( n, q, m ) {
	const me = m.elements;
	const b = q.getBasis();
	//console.log( "M:", m );
/*
	m.elements[0+0] = b.right.x;
	m.elements[4+0] = b.right.y;
	m.elements[8+0] = b.right.z;
	//m.elements[0+3] = 0;
	m.elements[0+1] = b.up.x;
	m.elements[4+1] = b.up.y;
	m.elements[8+1] = b.up.z;
	//m.elements[4+3] = 0;
	m.elements[0+2] = b.forward.x;
	m.elements[4+2] = b.forward.y;
	m.elements[8+2] = b.forward.z;
	//m.elements[8+3] = 0;
*/
	m.elements[0+0] = b.right.x;
	m.elements[0+1] = b.right.y;
	m.elements[0+2] = b.right.z;
	//m.elements[0+3] = 0;
	m.elements[4+0] = b.up.x;
	m.elements[4+1] = b.up.y;
	m.elements[4+2] = b.up.z;
	//m.elements[4+3] = 0;
	m.elements[8+0] = b.forward.x;
	m.elements[8+1] = b.forward.y;
	m.elements[8+2] = b.forward.z;
	//m.elements[8+3] = 0;
	m.elements[12+0] = n*2-4;
	m.elements[12+1] = 0;
	m.elements[12+2] = 0;
	//m.elements[12+3] = b.forward.x;
}

function tickQuat( shapes ) {
	const end = Date.now();
	if( !start ) {
		start = end - 15;
		for( let n = 0; n < shapes.length; n++ ) {
			curPos.push( new lnQuat() );
		}
	}
	const delta = ( end - start ) / 1000;
	clock += ( end - start ) / 1000;
	start = end;

	for( let n = 0; n < shapes.length; n++ ) {
		const offset = Math.floor(clock );
		if( clock % 2 > 1 ) {
			//clock -= 1;
		}
		if( n+offset < lnQ_current.length )
			curPos[n].add( lnQ_current[n+offset], delta );
		const shape = shapes[n];
		shape.matrixAutoUpdate = false;
		setMatrix( n, curPos[n], shape.matrix );
	}

	if( clock > 7 ) { 
		clock = 0;
		curPos.length = 0;
		start = 0;
	}

}

window.DrawQuatPaths = DrawQuatPaths;
function DrawQuatPaths(normalVertices_,normalColors_, shapes) {
	normalVertices = normalVertices_
	normalColors = normalColors_
	let curSliders = {
	};
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
        
	drawRawRotIter = document.getElementById( "drawRawRotIter")?.checked;
	drawRotIter = document.getElementById( "drawRotIter")?.checked;
	drawMechanicalRot = document.getElementById( "drawMechanicalRot")?.checked;
	showArms = document.getElementById( "showArm")?.checked;
	rawAngles = document.getElementById( "rawAngles")?.checked;
	keepInertia = document.getElementById( "keepInertia" )?.checked;
	applyAccel = document.getElementById( "applyAccel" )?.checked;
	drawWorldAxles = document.getElementById( "drawWorldAxles" )?.checked;
	showSliderCurves = document.getElementById( "showSliderCurves" )?.checked;

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
		
		const twistDelta =twist= ( (td/500)-1 ) * Math.PI * 4.25;
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
        curSliders.lnQZ[0] = (curSliders.lnQZ[0] +1) * 100 + 10;

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
	        
	        
		check = document.getElementById( "normalizeTangents");
		if( check )
			normalizeNormalTangent = check.checked; // global variable from lnQuat.js
		
		drawGrid( normalVertices,normalColors, curSliders);
	        
		drawCoordinateGrid();
	        
		// squares is calculated in analog arm.
	}

	// tick needs lnQ?_current
	start = 0;
	clock = 0;
	curPos.length = 0;
	return tickQuat;

}




/*
  // bisect and trisect algorithms - testing half of half of  half ....
		if( trisectAnalog ) {
			const pointList = [];
			function doLevel( l, P, Q, mn, mx ) {
				if( Math.abs( mx-mn ) < 0.001 ) debugger;
				if( l > 4 ) return;
				let x1 = mn + (mx-mn)/3;
				let x2 = mn + (2*(mx-mn)/3);
				
				const mid1 = P.slerp( Q, 0.33 );
				const mid2 = P.slerp( Q, 0.66 );

				doLevel( l+1, P, mid1, mn, x1 );
				pointList.push( mid1 );
				doLevel( l+1, mid1, mid2, x1, x2 );
				pointList.push( mid2 );
				doLevel( l+1, mid2, Q, x2, mx );
			}

			const from = n?((keepInertia===0?R:Rz)[n-1]):lnQ0;
			const to = (keepInertia===0?R:Rz)[n];

			pointList.push( from );
			doLevel( 0, from, to, 0, 1*timeScale );

			pointList.push( to );
			scalar = pointList.length;
			tmpShortArm.z = 2/(timeScale * pointList.length);
			for( s = 0; s < pointList.length; s++ ) {
				const point = pointList[s]
				prior = point.applyDel( tmpShortArm, 1.0 );
				draw( point )
			}
			result.portion = pointList[pointList.length-1];
		} else if( bisectAnalog ) {
			const pointList = [];
			function doLevel( n, P, Q, mn, mx ) {
				if( n > 6 ) return;
				let x = (mx+mn)/2;
				const mid = P.slerp( Q, timeScale*0.5 );

				doLevel( n+1, P, mid, mn, x );
				pointList.push( mid );
				//console.log( "Add point:", n, x );
				doLevel( n+1, mid, Q, x, mx );
			}

			const from = n?((keepInertia===0?R:Rz)[n-1]):lnQ0;
			const to = (keepInertia===0?R[n]:Rz[n]);

			pointList.push( from );
			doLevel( 0, from, to, 0, 1*timeScale );

			pointList.push( to );
			scalar = pointList.length;
			tmpShortArm.z = 2/(pointList.length);
			for( s = 0; s < pointList.length; s++ ) {
				const point = pointList[s]
				prior = point.applyDel( tmpShortArm, 1.0 );
				draw( point )
			}
			
			result.portion = pointList[pointList.length-1];
			

*/