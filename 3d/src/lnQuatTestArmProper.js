
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
let matchOrder = 0;

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
const lnQ = [];


let normalVertices,normalColors;
	const spaceScale = 5;
	const normal_del = 1;

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
		const l2 = Math.sqrt(p*p+y*y);
		const l3 = Math.sqrt(p*p+y*y+r*r);
		//return mkQuat(0,p,y/l2,r/l3);
		return mkQuat(0,p,y,r);
	}
	}
}

function makeMatchQuat(from,to) {
	let newQuat = mkQuat();
	let p = to.x - from.x;
	let y = to.y - from.y;
	let r = to.z - from.z;
	for( let iter = 0; iter < 2; iter++ ) {

		switch( matchOrder ) {
			case 0:
				newQuat.set(0,0,0,0).roll(r).yaw(y).pitch(p);
				break;
			case 1:
				newQuat.set(0,0,0,0).roll(r).pitch(p).yaw(y);
				break;
			case 2:
				newQuat.set(0,0,0,0).pitch(p).yaw(y).roll(r);
				break;
			case 3:
				newQuat.set(0,0,0,0).pitch(p).roll(r).yaw(y);
				break;
			case 4:
				newQuat.set(0,0,0,0).yaw(y).pitch(p).roll(r);
				break;
			case 5:
				newQuat.set(0,0,0,0).yaw(y).roll(r).pitch(p);
				break;
			case 6:
				newQuat.set(0,p,y,r);
				break;
		}
		
		let delp = to.x - newQuat.x;
		let dely = to.y - newQuat.y;
		let delr = to.z - newQuat.z;
		if( ( Math.abs(delp) + Math.abs(dely) + Math.abs(delr) ) < 0.0000001 )
		{
			break;
		}
		p += delp;
		y += dely;
		r += delr;
	}
}




function drawDigitalTimeArm(curSliders, slerp) {
	
	const arm = armPrimary==0?{x:2,y:0,z:0}
		      :armPrimary==1?{x:0,y:2,z:0}
			:{x:0,y:0,z:2};

	{
		
		const t2_ts = fixAxleRotation?new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.θ*timeScale, lnQ1   ):new lnQuat(lnQ2);
		const t3_ts = fixAxleRotation?new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2_ts.θ*timeScale, t2_ts ):new lnQuat(lnQ3);
		const t4_ts = fixAxleRotation?new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3_ts.θ*timeScale, t3_ts ):new lnQuat(lnQ4);
		const t5_ts = fixAxleRotation?new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4_ts.θ*timeScale, t4_ts ):new lnQuat(lnQ5);


		const tmpR = { portion:null };
		const A1_ts = lnQ1.applyDel( arm, timeScale, null, 0, tmpR );
		const A1_R_ts = tmpR.portion.update();  tmpR.portion = null;
		const A2_ts = t2_ts.applyDel( arm, timeScale, null, 0, tmpR );
		const A2_R_ts = tmpR.portion.update();  tmpR.portion = null;
		const A3_ts = t3_ts.applyDel( arm, timeScale, null, 0, tmpR );
		const A3_R_ts = tmpR.portion.update();  tmpR.portion = null;
		const A4_ts = t4_ts.applyDel( arm, timeScale, null, 0, tmpR );
		const A4_R_ts = tmpR.portion.update();  tmpR.portion = null;
		const A5_ts = t5_ts.applyDel( arm, timeScale, null, 0, tmpR );
		const A5_R_ts = tmpR.portion.update();  tmpR.portion = null;

		const A__ts = [A1_ts,A2_ts,A3_ts,A4_ts,A5_ts];
		const A_R_ts = [A1_R_ts,A2_R_ts,A3_R_ts,A4_R_ts,A5_R_ts];

		for( var n = 0; n < 5; n++ ) {
			if( (n+1) < 5 ) {
				A__ts[n+1].x += A__ts[n].x;
				A__ts[n+1].y += A__ts[n].y;
				A__ts[n+1].z += A__ts[n].z;
			}
			
			if( n > 0 ){
				doDrawBasis( A_R_ts[n], A__ts[n-1], 1.5, 1, null, 1.0 );
			}

			if( showArms )
			{
				normalVertices.push( new THREE.Vector3( (n?A__ts[n-1].x:0)*spaceScale   ,( n?A__ts[n-1].y:0)*spaceScale      , (n?A__ts[n-1].z:0)*spaceScale  ))
				normalVertices.push( new THREE.Vector3( (A__ts[n].x)*spaceScale   ,( A__ts[n].y)*spaceScale      , (A__ts[n].z)*spaceScale  ))
				pushN(n, 0.7);
			}
		}
	}	

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




function drawAnalogArm(curSliders,slerp) {

	const origin = {x:0,y:0,z:0};

	const arm = armPrimary==0?{x:2,y:0,z:0}
		     :armPrimary==1?{x:0,y:0.1,z:0}
			:{x:0,y:0,z:2};
	const shortArm = armPrimary==0?{x:2/100,y:0,z:0}
		     :armPrimary==1?{x:0,y:2/100,z:0}
			:{x:0,y:0,z:2/100};
	const tmpShortArm = armPrimary==0?{x:2/100,y:0,z:0}
		     :armPrimary==1?{x:0,y:2/100,z:0}
			:{x:0,y:0,z:2/100};
	const v = { x:0,y:1,z:0};

	{
	const t2 = fixAxleRotation?new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.θ*timeScale, lnQ1 ):new lnQuat(lnQ2);
	const t3 = fixAxleRotation?new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2.θ*timeScale, t2 ):new lnQuat(lnQ3);
	const t4 = fixAxleRotation?new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3.θ*timeScale, t3 ):new lnQuat(lnQ4);
	const t5 = fixAxleRotation?new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4.θ*timeScale, t4 ):new lnQuat(lnQ5);

	const Ro = [lnQ1,new lnQuat(t2),new lnQuat(t3),new lnQuat(t4),new lnQuat(t5)];

	
	const Rb = [ lnQ1.sub2(Ro[0]), t2.sub2(Ro[1]), t3.sub2(Ro[2]), t4.sub2(Ro[3]), t5.sub2(Ro[4])];
	const Rm = Ro;
	const R  = [ lnQ1,   t2,   t3,   t4,   t5];
	//const Rz = [lnQ1,t2_,t3_,t4_,t5_];

	// { a,      b,	    c,		       d,				   e }  no accel
	// { a,    a+b,	a+b+c,		 a+b+c+d,			   a+b+c+d+e }  accel/keep inertia
	// { a,a + a+b,a+a+b + a+b+c, a+a+b + a+b+c + a+b+c+d, a+a+b + a+b+c + a+b+c+d + a+b+c+d+e }  accel+keep inertia
	// { a,2a +b,3a+2b +c,		    4a+3b+2c +d,		       5a+4b+3c+2d+e }  accel+keep inertia
	if( showSliderCurves )
		drawRotationCurve( R, Ro, curSliders, Rb );

	const A = [{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];
	let prior = origin;
	const tmpQ = new lnQuat();
	for( var n = 0; n < 5; n++ ) {
		if( showLineSeg[n] && drawRotationSquares ) {
			drawSquare( n, R[n], R[n-1] );
		}
		if( n ) {
			A[n].x = A[n-1].x
			A[n].y = A[n-1].y
			A[n].z = A[n-1].z
		}
		var s;
		var scalar = 100;
		const result = { portion : null };
		
		// start from either the end of the previous
		//	   or from the end of the sum of the previous
		//   add either relative rotation itself (to the end of rotations)
		//   or add the translated rotation (to the end of the sum of rotations)
		const from = n?(R[n-1]):lnQ0;
		const delta = Rm[n];
		const to = R[n];

		if(1)
			for( s = 0; s <= 100; s++ ) {
				result.portion = null;
				prior = to.applyDel( shortArm, s*timeScale/100.0, from, 1, result );
				draw( result.portion, from, delta, s*timeScale/100.0 );
			}
		if(0) {
			for( s = 0; s <= 100; s++ ) {
				from.slerp( to, (s+1)/100, tmpQ, 0 );
				prior = tmpQ.applyDel( shortArm );
				draw( tmpQ, from, null, s*timeScale/100.0 );
			}
		}

		// draw the long segment to match digital arm.
		if( showArms )
			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))

		//R[n] = result.portion;
		//Rz[n] = result.portion;
		A[n].x += prior.x*scalar;
		A[n].y += prior.y*scalar;
		A[n].z += prior.z*scalar;

		if( showArms){
			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			pushN(n, 0.4);
		}

		function draw(q,from,to,delta)
		{
			if( ( s % 3 ) === 0 )  {
				if(drawNormalBall) {
					// draw on normal ball...
					drawN( q );
					
					function drawN( lnQ )
					{
						const spaceScale = 3;
						const new_v = lnQ.apply( v );
						const normal_del = 0.25;
						const basis = lnQ.getBasis( );
					
						normalVertices.push( new THREE.Vector3( new_v.x*spaceScale,new_v.y*spaceScale, new_v.z*spaceScale ))
						normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.right.x*normal_del,new_v.y*spaceScale + basis.right.y*normal_del,new_v.z*spaceScale + basis.right.z*normal_del ))
					
						normalVertices.push( new THREE.Vector3( new_v.x*spaceScale			,new_v.y*spaceScale			, new_v.z*spaceScale ))
						normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.up.x*normal_del,new_v.y*spaceScale + basis.up.y*normal_del,new_v.z*spaceScale + basis.up.z*normal_del ))
					
						normalVertices.push( new THREE.Vector3( new_v.x*spaceScale			     ,new_v.y*spaceScale			     , new_v.z*spaceScale ))
						normalVertices.push( new THREE.Vector3( new_v.x*spaceScale + basis.forward.x*normal_del,new_v.y*spaceScale + basis.forward.y*normal_del,new_v.z*spaceScale + basis.forward.z*normal_del ))
					
						normalColors.push( new THREE.Color( 1.0,0,0,1.0 ))
						normalColors.push( new THREE.Color( 1.0,0,0,1.0 ))
						normalColors.push( new THREE.Color( 0,1.0,0,1.0 ))
						normalColors.push( new THREE.Color( 0,1.0,0,1.0 ))
						normalColors.push( new THREE.Color( 0,0,1.0,1.0))
						normalColors.push( new THREE.Color( 0,0,1.0,1.0 ))


					}
				}
			
				//if( from ) {
				//	doDrawBasis( to, A[n], 1, delta, from, n === (showRotationCurveSegment-1)?0.8:0.3 );
				//} else 
				{
					doDrawBasis( q, A[n], 1, 1, null, n === (showRotationCurveSegment-1)?0.8:0.3 );
				}	

			}
			if(0) {
				if( from && 0 ) {
				const delta2 = delta - timeScale/100.0;
				normalVertices.push( new THREE.Vector3( pointScalar*(from.x + to.x * delta2)*spaceScale ,pointScalar*( from.y  + to.y * delta2)*spaceScale    , pointScalar*(from.z  + to.z * delta2)*spaceScale  ))
				normalVertices.push( new THREE.Vector3( pointScalar*(from.x+ to.x * delta)*spaceScale   ,pointScalar*( from.y + to.y * delta)*spaceScale      , pointScalar*(from.z + to.z * delta)*spaceScale  ))
				} else {
				const delta2 = delta - timeScale/100.0;
				normalVertices.push( new THREE.Vector3( pointScalar*( to.x * delta2)*spaceScale   ,pointScalar*( 0 * (1-delta2) + to.y * delta2)*spaceScale      , pointScalar*(0 * (1-delta2) + to.z * delta2)*spaceScale  ))
				normalVertices.push( new THREE.Vector3( pointScalar*( to.x * delta)*spaceScale   ,pointScalar*( 0 * (1-delta) + to.y * delta)*spaceScale      , pointScalar*(0 * (1-delta) + to.z * delta)*spaceScale  ))
				}	
				pushN( n );
			}

			if( showArms )
			{
				{
					const xyz = {x:to.nx, y:to.ny, z:to.nz};
					const delxyz = to.applyDel( xyz, -1 );

					normalVertices.push( new THREE.Vector3( (0  )*spaceScale   ,( 0)*spaceScale      , (0)*spaceScale  ))
					normalVertices.push( new THREE.Vector3( (0 + delxyz.x*3)*spaceScale   ,( 0+ delxyz.y*3)*spaceScale      , (0+delxyz.z*3)*spaceScale  ))
					pushN2(n,4.9,0.2);
				}

				if( s == 50 && delta || ( drawRotationAllAxles ) ){
					if( drawRotationAxles ) {
						if( lnQuat.SLERP || addN2 ) {
							normalVertices.push( new THREE.Vector3( (A[n].x - 2*q.nx)*spaceScale   ,( A[n].y - 2 * q.ny)*spaceScale      , (A[n].z-2*q.nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x + 0*q.nx)*spaceScale   ,( A[n].y + 0 * q.ny)*spaceScale      , (A[n].z+ 0*q.nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x - 0*q.nx)*spaceScale   ,( A[n].y - 0 * q.ny)*spaceScale      , (A[n].z-0*q.nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x + 2*q.nx)*spaceScale   ,( A[n].y + 2 * q.ny)*spaceScale      , (A[n].z+ 2*q.nz)*spaceScale  ))
							pushN2(n,0.2,4.9);
						}else {

								let  nx;
								let  ny;
								let  nz;
							if( drawWorldAxles ) {
								const ax = to.x + from.x * delta;
								const ay = to.y + from.y * delta;
								const az = to.z + from.z * delta;
					
								const l = ax*ax + ay*ay + az*az;
						
								const s = Math.sqrt(l);

								 nx = ax/s;
								 ny = ay/s;
								 nz = az/s;
							 }else {
								 if( to ){
								nx = to.nx;
								ny = to.ny;
								nz = to.nz;
								 }else {
									 nx = q.x;
									 ny = q.y;
									 nz = q.z;
								 }
							}
							normalVertices.push( new THREE.Vector3( (A[n].x - 2*nx)*spaceScale   ,( A[n].y - 2 * ny)*spaceScale      , (A[n].z- 2*nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x + 0*nx)*spaceScale   ,( A[n].y + 0 * ny)*spaceScale      , (A[n].z+ 0*nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x - 0*nx)*spaceScale   ,( A[n].y - 0 * ny)*spaceScale      , (A[n].z- 0*nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x + 2*nx)*spaceScale   ,( A[n].y + 2 * ny)*spaceScale      , (A[n].z+ 2*nz)*spaceScale  ))
						}
						pushN2(n,4.9,0.2);
						pushN2(n,0.2,4.9);
						
					}
					
				}

				normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
				A[n].x += prior.x;
				A[n].y += prior.y;
				A[n].z += prior.z;

				normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
				pushN(n,0.3);
			}
		}
		
	}

	}
	
	return;


}

function drawRotationCurve( arr, spinOnly,  curSliders, base ) {
	const origShow = showRotationCurve;
	for( let i = 0; i < 3; i++ ) {
		let showRotationCurve_ = (i===0)?"X":(i===1)?"Y":"Z";
	const lnQN = arr[showRotationCurveSegment-2]|| lnQ0; // prior base... 
	if( showRotationCurve_ && ( showRotationCurveSegment >= 0 ) ) {
		let lnQ2;
		//const lnQ_Here = arr[showRotationCurveSegment-1] || lnQ0;
		const from = (rawAngles)?{ x: 0, y:0,z:0 }:null;
	
		if( rawAngles ) {
			lnQ2 = new lnQuat( 0
				,from.x = curSliders.lnQX[showRotationCurveSegment-1]
				,from.y = curSliders.lnQY[showRotationCurveSegment-1]
				,from.z = curSliders.lnQZ[showRotationCurveSegment-1])
		}

		  const lnQ = spinOnly[showRotationCurveSegment-2]||lnQ0;
		  const lnQBase = base[showRotationCurveSegment-1];

		//const lnQ = arr[showRotationCurveSegment-2]|| lnQ0;
		if( rawAngles ) {
			for( var t = -Math.PI*2; t<= Math.PI*2; t+=0.08 ) {
				// this works.
				lnQ2.x = from.x;
				lnQ2.y = from.y;
				lnQ2.z = from.z;
				lnQ2.dirty = true;
				if( showRotationCurve_ == "X" ) 
					lnQ2.x = from.x + t;
				else if( showRotationCurve_ == "Z" ) 
					lnQ2.z = from.z + t;
				else if( showRotationCurve_ == "Y" ) 
					lnQ2.y = from.y + t;

				if( fixAxleRotation )
					lnQ2.update().freeSpin( lnQ.θ, lnQ )

				//lnQ2.add( lnQBase );
				if( Math.abs( t )  < 0.11 ) {
					if( lnQ2.dθ ){
						const x = lnQ.x;
						const y = lnQ.y;
						const z = lnQ.z;
						normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale			       ,(y)*pointScalar*spaceScale			       , (z)*pointScalar*spaceScale			       ))
						normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale + (lnQ2.dθ*lnQ2.dnx) * 2.0,  (y)*pointScalar*spaceScale + (lnQ2.dθ*lnQ2.dny) * 2.0  , (z)*pointScalar*spaceScale + (lnQ2.dθ*lnQ2.dnz) * 2.0  ))
						normalColors.push( new THREE.Color( 1.0*s,1.0*s,0,255 ))
						normalColors.push( new THREE.Color( 1.0*s,1.0*s,0,255 ))		
					}
				}

				doDrawBasis( lnQ2, lnQ2, 1, 1, null, (showRotationCurve_===origShow)?1:0.5 );
			}
		}else {
			lnQ.update();              
			for( var t = -Math.PI*2; t<= Math.PI*2; t+=0.02 ) {
				const p = (( showRotationCurve_ == "X" ) ?t:0)	   +curSliders.lnQX[showRotationCurveSegment-1];
				const y = ((( showRotationCurve_ == "Y" ) ?t:0)     +curSliders.lnQY[showRotationCurveSegment-1]);
				const r = ((( showRotationCurve_ == "Z" ) ?t:0)	    +curSliders.lnQZ[showRotationCurveSegment-1]) ;
				const lnQ1 = makeQuat(p,y,r );
				lnQ1.update();

				//const lnQ1 = mkQuat().yaw((( showRotationCurve_ == "Y" ) ?t:0)+curSliders.lnQY[showRotationCurveSegment-1])
				//	.pitch((( showRotationCurve_ == "X" ) ?t:0)	   +curSliders.lnQX[showRotationCurveSegment-1])
				//	.roll((( showRotationCurve_ == "Z" ) ?t:0)	    +curSliders.lnQZ[showRotationCurveSegment-1])

				if( fixAxleRotation )
					lnQ1.freeSpin( lnQ.θ, lnQ )
				lnQ1.add( lnQBase );

				if(0)
				if( Math.abs( t )  < 0.03 ) {
					const q1 = mkQuat().roll(r).yaw(y).pitch(p);
					const q2 = mkQuat().roll(r).pitch(p).yaw(y);
					const q3 = mkQuat().yaw(y).pitch(p).roll(r);

					[q1,q2,q3].forEach( lnQ2=>{
						if( lnQ2.dθ ) {
							const x = lnQ1.x;
							const y = lnQ1.y;
							const z = lnQ1.z;
							normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale			       ,(y)*pointScalar*spaceScale			       , (z)*pointScalar*spaceScale			       ))
							normalVertices.push( new THREE.Vector3( (x)*pointScalar*spaceScale + (lnQ2.dθ*lnQ2.dnx) * 2.0,  (y)*pointScalar*spaceScale + (lnQ2.dθ*lnQ2.dny) * 2.0  , (z)*pointScalar*spaceScale + (lnQ2.dθ*lnQ2.dnz) * 2.0  ))
							if( showRotationCurve_ === "X" ){
							normalColors.push( new THREE.Color( 1.0,1.0,0,255 ))
							normalColors.push( new THREE.Color( 1.0,1.0,0,255 ))		
							}
							if( showRotationCurve_ === "Y" ){
							normalColors.push( new THREE.Color( 0.0,1.0,1.0,255 ))
							normalColors.push( new THREE.Color( 0.0,1.0,1.0,255 ))		
							}
							if( showRotationCurve_ === "Z" ){
							normalColors.push( new THREE.Color( 1.0,0.0,1.0,255 ))
							normalColors.push( new THREE.Color( 1.0,0.0,1.0,255 ))		
							}
						}
					})
				}
				doDrawBasis( lnQ1, lnQ1, 1, 1, null, (showRotationCurve_===origShow)?1:0.5 );
			}

		}
	}
	}
}


let priorComposite = null;
function drawSquare( n, q, qPrior ) {
	//if( n > 0 ) return;
	const one   = (1 - n*0.1 ) *4;
	const onef9 = (1 - n*0.1 - 0.085 )*4;
	const onef4 = (1 - n*0.1 - 0.04 )*4;
	const onef1 = (1 - n*0.1 - 0.03 )*4;
	const onef2 = (1 - n*0.1 - 0.01 )*4;
	const onef3 = (1 - n*0.1 - 0.02 )*4;


	if( !qPrior ) {
		qPrior = lnQ0;
		priorComposite = lnQ0;
	}
	if( !drawRawRot ){ 
		qPrior = priorComposite;
		//console.log( "Using xy prior" );
	}
	
	const next = q;

	//console.log( "Prior:", qPrior, q, next );
	const qo = lnQ[n];
	// q.x and q.nx*q.θ are equivalent
	// the total rotation si still q.nl.
	const qx = qPrior.apply(new lnQuat( 0, qo.x ,   0 ,   0));
	const qy = qPrior.apply(new lnQuat( 0,   0 , qo.y ,   0));
	const qz = qPrior.apply(new lnQuat( 0,   0 ,   0 , qo.z));

	const qxy = drawRawRot?qPrior.apply(new lnQuat(0, qo.x ,   0 ,   0).apply(new lnQuat(0,   0 , qo.y ,   0)))
			:priorComposite.apply(new lnQuat(0, qo.x ,   0 ,   0).apply(new lnQuat(0,   0 , qo.y ,   0)))
			;
	const qyx = drawRawRot?qPrior.apply(new lnQuat(0,   0 , qo.y ,   0).apply(new lnQuat(0, qo.x ,   0 ,   0)))
			:priorComposite.apply(new lnQuat(0,   0 , qo.y ,   0).apply(new lnQuat(0, qo.x ,   0 ,   0)));

	const qxyz = drawRawRot?qPrior.apply(new lnQuat(0, qo.x ,   0 ,   0).apply(new lnQuat(0,   0 , qo.y ,   0)).apply(new lnQuat(0,   0 , 0, qo.z)))
			:priorComposite.apply(new lnQuat(0, qo.x ,   0 ,   0).apply(new lnQuat(0,   0 , qo.y ,   0)).apply(new lnQuat(0,   0 , 0, qo.z)))
			;
	const qyxz = drawRawRot?qPrior.apply(new lnQuat(0,   0 , qo.y ,   0).apply(new lnQuat(0, qo.x ,   0 ,   0)).apply(new lnQuat(0,   0 , 0, qo.z)))
			:priorComposite.apply(new lnQuat(0,   0 , qo.y ,   0).apply(new lnQuat(0, qo.x ,   0 ,   0)).apply(new lnQuat(0,   0 , 0, qo.z)));

	{
		const p1 =  qPrior.applyDel({x:one, y:one, z:0 }, timeScale) ;
		const p2 =  qPrior.applyDel({x:one, y:-one,z:0 }, timeScale) ;
		const p3 =  qPrior.applyDel({x:-one,y:one, z:0 }, timeScale) ;
		const p4 =  qPrior.applyDel({x:-one,y:-one,z:0 }, timeScale) ;
		
		normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																					
		normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
		
		normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																					
		normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
		pushN(n,5.9);
		pushN(n,5.9);
		pushN(n,5.9);
		pushN(n,5.9);
	}

	if( drawRawRot )
	{
		// this isn't apply... it's just add...
		const p1 = next.applyDel({x:onef9 ,y :onef9,z:0 }, timeScale);
		const p2 = next.applyDel({x:onef9 ,y:-onef9,z:0 }, timeScale);
		const p3 = next.applyDel({x:-onef9,y: onef9,z:0 }, timeScale);
		const p4 = next.applyDel({x:-onef9,y:-onef9,z:0 }, timeScale);

		normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																					
		normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
		
		normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																					
		normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
		pushN2(n,0.8,9.9);
		pushN2(n,0.8,9.9);
		pushN2(n,0.8,9.9);
		pushN2(n,0.8,9.9);

		if( drawRawRotIter )
		{
			const _20 = drawRotationInterpolant[n];
			let p1_ = {x:onef4,y:onef4,z:0 }  
			let p2_ = {x:onef4,y:-onef4,z:0 } 
			let p3_ = {x:-onef4,y:onef4,z:0 } 
			let p4_ = {x:-onef4,y:-onef4,z:0 }
			const step = new lnQuat();
			for( let i = 0; i < _20; i++ )
			{
				step.x = qPrior.x * (_20-i)/_20 + next.x *( i)/_20;
				step.y = qPrior.y * (_20-i)/_20 + next.y *( i)/_20;
				step.z = qPrior.z * (_20-i)/_20 + next.z *( i)/_20;
				step.dirty = true;
				step.update();
				//const step = qPrior.add2( qo, i*timeScale/_20 );
		
				const p1 = step.apply( p1_, 1 );
				const p2 = step.apply( p2_, 1);
				const p3 = step.apply( p3_, 1);
				const p4 = step.apply( p4_, 1 );
			
				normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																							
				normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
				
				normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																							
				normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
				pushN(n,0.6);
				pushN(n,0.6);
				pushN(n,0.6);
				pushN(n,0.6);
			}
		}


	}
if(0)
	if( drawRotIter || drawMechanicalRot ) 
	{
		const p1 = ( next.applyDel({x:onef1 ,y :onef1,z:0 }, timeScale));
		const p2 = ( next.applyDel({x:onef1 ,y:-onef1,z:0 }, timeScale));
		const p3 = ( next.applyDel({x:-onef1,y: onef1,z:0 }, timeScale));
		const p4 = ( next.applyDel({x:-onef1,y:-onef1,z:0 }, timeScale));

		normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																					
		normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
		
		normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																					
		normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
		normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
		pushN(n,0.99);
		pushN(n,0.99);
		pushN(n,0.99);
		pushN(n,0.99);
	}


	if(drawRotationSquaresXY)
	{
		if( n === 0 )  {
			doDrawBasis( qx, qx, 2.0*Math.PI );
			doDrawBasis( qxy, qxy, 2.0*Math.PI );
			doDrawBasis( qxyz, qxyz, 2.0*Math.PI );
		}
		{
			const p1 = qx.applyDel( {x:onef2,y:onef2,z:0 }  , timeScale );
			const p2 = qx.applyDel( {x:onef2,y:-onef2,z:0 } , timeScale );
			const p3 = qx.applyDel( {x:-onef2,y:onef2,z:0 } , timeScale );
			const p4 = qx.applyDel( {x:-onef2,y:-onef2,z:0 }, timeScale );
			
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			pushN(n,0.4);
			pushN(n,0.4);
			pushN(n,0.4);
			pushN(n,0.4);
		}
		if(1)
		{
			const p1 = qxy.applyDel( {x:onef3,y:onef3,z:0 }  , timeScale);
			const p2 = qxy.applyDel( {x:onef3,y:-onef3,z:0 } , timeScale);
			const p3 = qxy.applyDel( {x:-onef3,y:onef3,z:0 } , timeScale);
			const p4 = qxy.applyDel( {x:-onef3,y:-onef3,z:0 }, timeScale);
			
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			pushN(n,0.2);
			pushN(n,0.2);
			pushN(n,0.2);
			pushN(n,0.2);
		}
		if(1)
		{
			const p1 = qxyz.applyDel( {x:onef4,y:onef3,z:0 }  , timeScale);
			const p2 = qxyz.applyDel( {x:onef4,y:-onef3,z:0 } , timeScale);
			const p3 = qxyz.applyDel( {x:-onef4,y:onef3,z:0 } , timeScale);
			const p4 = qxyz.applyDel( {x:-onef4,y:-onef3,z:0 }, timeScale);
			
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			pushN(n,0.8);
			pushN(n,0.8);
			pushN(n,0.8);
			pushN(n,0.8);
		}
		if( drawRotIter && drawRotationInterpolant[n] )
		{
			let p1 = qPrior.applyDel({x:onef3,y:onef3,z:0 }  , timeScale);  
			let p2 = qPrior.applyDel({x:onef3,y:-onef3,z:0 } , timeScale);  
			let p3 = qPrior.applyDel({x:-onef3,y:onef3,z:0 } , timeScale);  
			let p4 = qPrior.applyDel({x:-onef3,y:-onef3,z:0 }, timeScale);  
			const _20 = drawRotationInterpolant[n];
			for( var i = 0; i < _20; i++ ) {
				const del = timeScale/(_20/1);
				 p1 = qx.applyDel(qy.applyDel( p1, del), del);
				 p2 = qx.applyDel(qy.applyDel( p2, del), del);
				 p3 = qx.applyDel(qy.applyDel( p3, del), del);
				 p4 = qx.applyDel(qy.applyDel( p4, del), del);
				
				normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																							
				normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
				
				normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																							
				normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
				pushN(n,Math.floor(i/_20*9)+0.5);
				pushN(n,Math.floor(i/_20*9)+0.5);
				pushN(n,Math.floor(i/_20*9)+0.5);
				pushN(n,Math.floor(i/_20*9)+0.5);
			}
		}
	}
	if(drawRotationSquaresYX) 
	{
		if( n === 0 )  {
			doDrawBasis( qy, qy, 2.0*Math.PI );
			doDrawBasis( qyx, qyx, 2.0*Math.PI );
			doDrawBasis( qyxz, qyxz, 2.0*Math.PI );
		}
		{
			const p1 = qy.applyDel( {x:onef2,y:onef2,z:0  }, timeScale );
			const p2 = qy.applyDel( {x:onef2,y:-onef2,z:0 }, timeScale );
			const p3 = qy.applyDel( {x:-onef2,y:onef2,z:0 }, timeScale );
			const p4 = qy.applyDel( {x:-onef2,y:-onef2,z:0}, timeScale );
		
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			pushN(n,0.4);
			pushN(n,0.4);
			pushN(n,0.4);
			pushN(n,0.4);
		}
		
		{
			const p1 = qyx.applyDel( {x:onef2,y:onef2,z:0  }, timeScale ) ;
			const p2 = qyx.applyDel( {x:onef2,y:-onef2,z:0 }, timeScale ) ;
			const p3 = qyx.applyDel( {x:-onef2,y:onef2,z:0 }, timeScale ) ;
			const p4 = qyx.applyDel( {x:-onef2,y:-onef2,z:0}, timeScale ) ;
		
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																						
			normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
			normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
			pushN(n,0.2);
			pushN(n,0.2);
			pushN(n,0.2);
			pushN(n,0.2);
		}
		if( drawRotIter && drawRotationInterpolant[n] )
		{
			let p1 = {x:onef3,y:onef3,z:0 }  
			let p2 = {x:onef3,y:-onef3,z:0 } 
			let p3 = {x:-onef3,y:onef3,z:0 } 
			let p4 = {x:-onef3,y:-onef3,z:0 }
			const _20 = drawRotationInterpolant[n];
			for( var i = 0; i < _20; i++ ) {
				 p1 = qy.applyDel(qx.applyDel( p1, timeScale/(_20/1)), timeScale/(_20/1));
				 p2 = qy.applyDel(qx.applyDel( p2, timeScale/(_20/1)), timeScale/(_20/1));
				 p3 = qy.applyDel(qx.applyDel( p3, timeScale/(_20/1)), timeScale/(_20/1));
				 p4 = qy.applyDel(qx.applyDel( p4, timeScale/(_20/1)), timeScale/(_20/1));
				
				normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																							
				normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
				
				normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																							
				normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
				pushN(n,Math.floor(i/_20*9)+0.5);
				pushN(n,Math.floor(i/_20*9)+0.5);
				pushN(n,Math.floor(i/_20*9)+0.5);
				pushN(n,Math.floor(i/_20*9)+0.5);
			}
		}
	}
}

function drawCoordinateGrid() {
	if( showCoordinateGrid || showInvCoordinateGrid || showRawCoordinateGrid ) {
		const range = (2 ) * Math.PI;
		const minRange = (0) * Math.PI;
		drawRange( 0,0,0, range, 40, minRange, showRawCoordinateGrid, showInvCoordinateGrid );
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
//					if( Math.abs( ll - Math.abs(totalNormal) ) > 0.05 ) continue;
			if(0)
					if( Math.abs( (Math.abs(z)+Math.abs(x)) - Math.abs(totalNormal) ) > 0.1 
								|| Math.abs(y) > 0.1 ) continue;
					//if( Math.abs( Math.abs(x) - Math.abs(totalNormal) ) > 0.1
					//			|| Math.abs(y) > 0.1 ) continue;
					//if( Math.abs( Math.abs(y) - Math.abs(totalNormal) ) > 0.2 ) continue;
					//if( Math.abs( Math.abs(z) - Math.abs(totalNormal) ) > 0.2 ) continue;
				if( (lr) > range ) continue;

				//if( (Math.abs(z)+Math.abs(y)+Math.abs(x)) < minr ) continue;

					const lnQ = new lnQuat( 0,px,py,pz );
					simpleBasis( lnQ );	
				}
				
			}
			
		}
	
		function simpleBasis(lnQ) {
					const basis = lnQ.update().getBasis( );
	if(0)
				if(!(  (Math.abs( basis.up.z - curSliders.lnQX[1]) < 0.001 )
					&&  (Math.abs( basis.up.x - curSliders.lnQX[1] ) < 0.001 )
					&&  (basis.up.y > 0) ) ) return;
			if(0)
				if(  (Math.abs( basis.up.x ) + Math.abs(basis.up.z )) > 0.01 || basis.up.y < 0) return;
				// the original normal direction; projected offset of sphere (linear scaled)
				//normalVertices.push( new THREE.Vector3( x*spaceScale,0*spaceScale, z*spaceScale ))
				//normalVertices.push( new THREE.Vector3( x*spaceScale + 1*normal_del,0*spaceScale + 1*normal_del,z*spaceScale + 1*normal_del ))
				//normalColors.push( new THREE.Color( 255,0,255,255 ))
				//normalColors.push( new THREE.Color( 255,0,255,255 ))
		
				//const pointScalar = 2/ Math.PI;
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
		if( !s ) s = 1.0;
		s = s/Math.PI;
		if( !colorS ) colorS = s;
		const l = 1;//(t instanceof lnQuat)?1/t.θ:1;
	if( t != lnQ2 && showArms )  {
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

		if( showCoords ) {
			if( showScaledPoints ) {
				const r = Math.sqrt(x*x+y*y+z*z);
				const l = Math.abs(x)+Math.abs(y)+Math.abs(z);
				x *= l / r;
				y *= l / r;
				z *= l / r;
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




function DrawNormalBall(normalVertices,normalColors) {
	const v = { x:0,y:1,z:0};
	const spaceScale = 3;
	const normal_del = 0.25;
	const drawCoords = document.getElementById( "showNormalBallCoords")?.checked;
	const pickRandomNormals = document.getElementById( "pickRandomNormals" )?.checked;
	if(drawNormalBall/*draw normal ball with twist*/)  {
		if(!pickRandomNormals)
		for( let h = 0; h < Math.PI; h+= 3.1/25 ) {
			const s =  Math.sin( h );
			const latlen = s * 150 + 0.1;
				
			const step = (Math.PI*4) / ( latlen )
			//for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
			for( let t = -Math.PI*2; t < Math.PI*2; t+= step ){
				//if( t > (Math.PI + 0.5) ) continue;
				const h_ = h;//-(1/1)*Math.PI + h;// - 1*Math.PI/2 - Math.PI/4;
				const lnQ = new lnQuat( { lat: h_, lng:t }, normalizeNormalTangent );

				drawN( lnQ );
				if( drawCoords )
					doDrawBasis( lnQ, lnQ, 1, 1 );
			}
		}

		if(pickRandomNormals) // random normal test.
		for( let h_ = 0; h_ <= 1000; h_++ ) {
			//for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
			const h = ( Math.acos( 1- Math.random()*2 ) )/(Math.PI/2) - 1;
			const t = Math.random() * Math.PI*2;
				const x = Math.sin(t );
				const z = Math.cos(t);
				const lnQ = new lnQuat( {x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) }, normalizeNormalTangent );
				drawN( lnQ );
				if( drawCoords )
					doDrawBasis( lnQ, lnQ, 1, 1 );
		}
	}
	function drawN( lnQ )
	{
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
			for( var n = 1; n <= 5; n++ ) {
			let is;
				is = document.getElementById( "lnQX"+n );
				//is.oninput = updateMesh;
				is.onfocus = ((is,n)=>()=>focusSlider( is, "X", n ))(is,n);
				is.onblur = ((is,n)=>()=>blurSlider( is,"X", n ))(is,n);
				is = document.getElementById( "lnQY"+n );
				//is.oninput = updateMesh;
				is.onfocus = ((is,n)=>()=>focusSlider( is,"Y", n ))(is,n);
				is.onblur = ((is,n)=>()=>blurSlider( is,"Y", n ))(is,n);
				is = document.getElementById( "lnQZ"+n);
				//is.oninput = updateMesh;
				is.onfocus = ((is,n)=>()=>focusSlider( is,"Z", n ))(is,n);
				is.onblur = ((is,n)=>()=>blurSlider( is,"Z", n ))(is,n);
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
        
        matchOrder = document.getElementById( "matchNone")?.checked?6
        	: document.getElementById( "matchYRP")?.checked?5
        	: document.getElementById( "matchYPR")?.checked?4
        	: document.getElementById( "matchPRY")?.checked?3
        	: document.getElementById( "matchPYR")?.checked?2
        	: document.getElementById( "matchRPY")?.checked?1
        	: document.getElementById( "matchRYP")?.checked?0
                : 6
                ;
	drawRawRotIter = document.getElementById( "drawRawRotIter")?.checked;
	drawRotIter = document.getElementById( "drawRotIter")?.checked;
	drawMechanicalRot = document.getElementById( "drawMechanicalRot")?.checked;
	showArms = document.getElementById( "showArm")?.checked;
	rawAngles = document.getElementById( "rawAngles")?.checked;
	drawWorldAxles = document.getElementById( "drawWorldAxles" )?.checked;
	showSliderCurves = document.getElementById( "showSliderCurves" )?.checked;

		if( document.getElementById( "invertCrossProduct" )?.checked ) {
			lnQuat.invertCrossProduct = true;
		}else 			
			lnQuat.invertCrossProduct = false;


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
		
		const twistDelta = ( (td/500)-1 ) * Math.PI * (scalar?6:1)*(scalar2?0.25:1)*8 ;
		document.getElementById( "twistDeltaValue" ).textContent = twistDelta.toFixed(4);

		lnQuat.setTwistDelta( twistDelta );

		for( var n = 1; n <= 5; n++ ) {
			let lnQX = Number(document.getElementById( "lnQX"+n ).value);
			let lnQY = Number(document.getElementById( "lnQY"+n ).value);
			let lnQZ = Number(document.getElementById( "lnQZ"+n ).value);
			if( n === 1 ) {
			        totalNormal = (lnQY / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			}
			curSliders.lnQX[n-1] = (lnQX / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			curSliders.lnQY[n-1] = (lnQY / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			curSliders.lnQZ[n-1] = (lnQZ / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
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
			const nL = ( Math.abs(lnQ.x)+Math.abs(lnQ.y)+Math.abs(lnQ.z) );
			const nR = lnQ.θ;
			if( axis ) {
				document.getElementById( "lnQXval"+n).textContent = (lnQ.nx).toFixed(4);
				document.getElementById( "lnQYval"+n).textContent = (lnQ.ny).toFixed(4);
				document.getElementById( "lnQZval"+n).textContent = (lnQ.nz).toFixed(4);
			}else {
				// normalize the output angle... 
				if( degrees ) {
					document.getElementById( "lnQXval"+n).innerHTML = (lnQ.x*180/Math.PI).toFixed(4) +"°";
					document.getElementById( "lnQYval"+n).innerHTML = (lnQ.y*180/Math.PI).toFixed(4) +"°";
					document.getElementById( "lnQZval"+n).innerHTML = (lnQ.z*180/Math.PI).toFixed(4) +"°";
				}else{
					document.getElementById( "lnQXval"+n).innerHTML = (lnQ.x/Math.PI).toFixed(4) + "π" ;
					document.getElementById( "lnQYval"+n).innerHTML = (lnQ.y/Math.PI).toFixed(4) + "π" ;
					document.getElementById( "lnQZval"+n).innerHTML = (lnQ.z/Math.PI).toFixed(4) + "π" ;
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
				document.getElementById( "lnQAngle"+n).innerHTML = (len*180/Math.PI).toFixed(4) + "°";
			} else {
				document.getElementById( "xRot"+n).textContent = (curSliders.lnQX[n-1] ).toFixed(4);
				document.getElementById( "yRot"+n).textContent = (curSliders.lnQY[n-1] ).toFixed(4);

				document.getElementById( "lnQAngle"+n).innerHTML = (len/Math.PI).toFixed(4) + "π<br>" + (len*nR/nL/Math.PI).toFixed(4) + "π";
			}
			if( degrees ) {
			} else {
			}
			//document.getElementById( "lnQYEulerval"+n).textContent = (qlen*180/Math.PI).toFixed(4);
			
	        
		}
		lnQ.length = 0;
	    lnQ.push( lnQ1 );
	    lnQ.push( lnQ2 );
	    lnQ.push( lnQ3 );
	    lnQ.push( lnQ4 );
	    lnQ.push( lnQ5 );
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
			showScaledPoints = false;
		}
		//else 			
		//	showScaledPoints = false;
	        
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
	        


		if( document.getElementById( "useSLERP" )?.checked ) {
			lnQuat.SLERP = true;
		}else 			
			lnQuat.SLERP = false;


	        
		check = document.getElementById( "normalizeTangents");
		if( check )
			normalizeNormalTangent = check.checked; // global variable from lnQuat.js
		
		DrawNormalBall(normalVertices,normalColors);
	        
		drawCoordinateGrid();
		drawDigitalTimeArm( curSliders, slerp );
	        
		// squares is calculated in analog arm.
		drawAnalogArm( curSliders, slerp ); 
	}

}


