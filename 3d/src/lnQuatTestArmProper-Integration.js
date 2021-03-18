
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
let internalAccel = false;
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

let normalVertices,normalColors;
	const spaceScale = 5;
	const normal_del = 1;

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

function drawDigitalTimeArm(curSliders, slerp) {
	
	const origin = {x:0,y:0,z:0};

	const arm = armPrimary==0?{x:2,y:0,z:0}
		      :armPrimary==1?{x:0,y:2,z:0}
			:{x:0,y:0,z:2};

	for( let zz = (keepInertia)?0:0; zz < (fixAxleRotation?2:1); zz++ ) {
		let fixAxleRotation = zz===1;
		let keepInertia = zz=== 0;

//	const t2_ts = fixAxleRotation?new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.θ, lnQ1, timeScale   ):new lnQuat(lnQ2);
//	const t3_ts = fixAxleRotation?new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2_ts.θ, t2_ts, timeScale ):new lnQuat(lnQ3);
//	const t4_ts = fixAxleRotation?new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3_ts.θ, t3_ts, timeScale ):new lnQuat(lnQ4);
//	const t5_ts = fixAxleRotation?new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4_ts.θ, t4_ts, timeScale ):new lnQuat(lnQ5);
	const tmp = {x:0,y:0,z:0};
	
	tmp.x = lnQ2.x;	tmp.y = lnQ2.y;	tmp.z = lnQ2.z;
	let tmpRot = lnQ1.applyDel( tmp, -timeScale*0.5 );
	const t2_ts = new lnQuat(0,tmpRot.x,tmpRot.y,tmpRot.z);

	tmp.x = lnQ3.x;	tmp.y = lnQ3.y;	tmp.z = lnQ3.z;
	tmpRot = t2_ts.applyDel( tmp, -timeScale*0.5 );
	const t3_ts = new lnQuat(0,tmpRot.x,tmpRot.y,tmpRot.z);

	tmp.x = lnQ4.x;	tmp.y = lnQ4.y;	tmp.z = lnQ4.z;
	tmpRot = t3_ts.applyDel( tmp, -timeScale*0.5 );
	const t4_ts = new lnQuat(0,tmpRot.x,tmpRot.y,tmpRot.z);
	                                                   
	tmp.x = lnQ5.x;	tmp.y = lnQ5.y;	tmp.z = lnQ5.z;
	tmpRot = t4_ts.applyDel( tmp, -timeScale*0.5 );
	const t5_ts = new lnQuat(0,tmpRot.x,tmpRot.y,tmpRot.z);

	if( applyAccel ) {
		t2_ts.add( lnQ1 );
		t3_ts.add( t2_ts );
		t4_ts.add( t3_ts );
		t5_ts.add( t4_ts );
	}
	if( keepInertia ) {		
		// expecing to keep inertia (previous rotation, plus new rotation)
		t2_ts.add( lnQ1 );
		t3_ts.add( t2_ts );
		t4_ts.add( t3_ts );
		t5_ts.add( t4_ts );
		
	}

	const tmpR = { portion:null };
	
	const A1_ts = lnQ1.applyDel( arm, timeScale );
	const A2_ts = t2_ts.applyDel( arm, timeScale );
	const A3_ts = t3_ts.applyDel( arm, timeScale);
	const A4_ts = t4_ts.applyDel( arm, timeScale );
	const A5_ts = t5_ts.applyDel( arm, timeScale );

	const A__ts = [A1_ts,A2_ts,A3_ts,A4_ts,A5_ts];
	const A_R_ts = [lnQ1, t2_ts, t3_ts, t4_ts, t4_ts ];

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
	
			pushNColor(n, zz/3+0.4);
		}
	}
	}	
	return;


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

	function pushNColor(n,s){
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

	for( let zz = (keepInertia)?0:0; zz < (fixAxleRotation?2:1); zz++ ) {
		let fixAxleRotation = zz===1;
		let keepInertia = zz=== 0;

	const t2 = fixAxleRotation?new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.θ, lnQ1, timeScale ):new lnQuat(lnQ2);
	const t3 = fixAxleRotation?new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2.θ, t2, timeScale ):new lnQuat(lnQ3);
	const t4 = fixAxleRotation?new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3.θ, t3, timeScale ):new lnQuat(lnQ4);
	const t5 = fixAxleRotation?new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4.θ, t4, timeScale ):new lnQuat(lnQ5);

	const Ro = [lnQ1,new lnQuat(t2),new lnQuat(t3),new lnQuat(t4),new lnQuat(t5)];

	if( applyAccel ) {
		t2.add( lnQ1 );
		t3.add( t2 );
		t4.add( t3 );
		t5.add( t4 );
	}

	// compute non-inertial differential
	const r2_ = new lnQuat(t2);
	const r3_ = new lnQuat(t3);
	const r4_ = new lnQuat(t4);
	const r5_ = new lnQuat(t5);

	if( keepInertia ) {
		//t2.add( lnQ1 );
		//t3.add( t2 );
		//t4.add( t3 );
		//t5.add( t4 );
	}

	//const R_ = [lnQ1,lnQ2,lnQ3,lnQ4,lnQ5];
	const Rb = [ lnQ1.sub2(Ro[0]), t2.sub2(Ro[1]), t3.sub2(Ro[2]), t4.sub2(Ro[3]), t5.sub2(Ro[4])];
	const Rm = [ lnQ1,  r2_,  r3_,  r4_,  r5_];
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
	const tmpQ2= new lnQuat();
	let tmpA;
	const startAt = new lnQuat( );
	const avQ = new lnQuat( );

	for( var n = 0; n < 5; n++ ) {
		if( showLineSeg[n] && drawRotationSquares ) {
			drawSquare( n, Rm[n], R[n-1] );
		}
		if( n ) {
			// start current position accumulator at previous end.
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
		const av = {x:delta.x,y:delta.y,z:delta.z};
		for( s = 0; s <= 100; s++ ) {
			result.portion = null;

			// this is an angular velocity value, it's not really a
                        // linear velocity....
			if(0) {
				// angular velocity is NOT itself a rotation...
				avQ.set( 0, delta.x, delta.y, delta.z ).update();
				avQ.freeSpin( -tmpQ.θ, tmpQ );
				tmpQ.freeSpin( avQ.θ * timeScale / 100, avQ  );
			}


			if(0) {
				// rotate tmpQ by this portion of the rotation.
				tmpA = tmpQ.applyDel( av, -1 );
				tmpQ2.x = tmpA.x;
				tmpQ2.y = tmpA.y;
				tmpQ2.z = tmpA.z;
				tmpQ2.dirty = true;
				tmpQ2.update();
                tmpQ.freeSpin( tmpQ2.θ * timeScale / 100, tmpQ2  );
			}

			if(1) {
				// add this portion of the angular velocity to tmpQ.

				// this is really the correct integration... over a time 0-1
				// the end is the rule of rotating around an externally directed rotation
				// axis.
				if( internalAccel ) // delta angle is from an internal source
					tmpA = tmpQ.applyDel( av, 1 );
				else
					tmpA = tmpQ.applyDel( av, -1 );

				// rotate the frame around the axis-angle of the acceleration
				tmpQ.freeSpin( Math.sqrt(tmpA.x*tmpA.x+ tmpA.y*tmpA.y+ tmpA.z*tmpA.z)/100, tmpA);
				if(0)
				{
				tmpQ.x += tmpA.x * timeScale/100.0;
				tmpQ.y += tmpA.y * timeScale/100.0;
				tmpQ.z += tmpA.z * timeScale/100.0;
				tmpQ.dirty = true;
				tmpQ.update();
				}
            }

			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			normalVertices.push( new THREE.Vector3( (A[n].x + delta.x)*spaceScale   ,( A[n].y + delta.y)*spaceScale      , (A[n].z + delta.z)*spaceScale  ))
			pushNColor(n, 1);

			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			normalVertices.push( new THREE.Vector3( (A[n].x + tmpA.x)*spaceScale   ,( A[n].y + tmpA.y)*spaceScale      , (A[n].z + tmpA.z)*spaceScale  ))
			pushNColor(n, 1.5);

			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			normalVertices.push( new THREE.Vector3( (A[n].x + tmpQ.x)*spaceScale   ,( A[n].y + tmpQ.y)*spaceScale      , (A[n].z + tmpQ.z)*spaceScale  ))
			pushNColor(n, 1.9);

			prior = tmpQ.applyDel( shortArm, 1 );
			
			draw( tmpQ, startAt, tmpQ, 1 );

			//prior = delta.applyDel( shortArm, s*timeScale/100.0, from, 1, result );
			//draw( result.portion, from, delta, s*timeScale/100.0 );
		}
		/*
		startAt.x += tmpQ.x;
		startAt.y += tmpQ.y;
		startAt.z += tmpQ.z;
		startAt.dirty = true;
		startAt.update();
		*/
		// draw the long segment to match digital arm.
		if( showArms )
			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))

		R[n] = result.portion;
		//Rz[n] = result.portion;
		A[n].x += prior.x*scalar;
		A[n].y += prior.y*scalar;
		A[n].z += prior.z*scalar;

		if( showArms){
			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			pushNColor(n, zz/3+0.4);
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

				// this draws the basis on the arm.
				if( from ) {
					doDrawBasis( q, A[n], 1, delta, from, n === (showRotationCurveSegment-1)?0.8:0.3 );
				} else {
					doDrawBasis( q, A[n], 1, 1, null, n === (showRotationCurveSegment-1)?0.8:0.3 );
				}	
				doDrawBasis( q, q, 1, delta, from, n === (showRotationCurveSegment-1)?0.8:0.3 );

			}

				if( from ) {
				const delta2 = delta - timeScale/100.0;
				normalVertices.push( new THREE.Vector3( pointScalar*(from.x + to.x * delta2)*spaceScale ,pointScalar*( from.y  + to.y * delta2)*spaceScale    , pointScalar*(from.z  + to.z * delta2)*spaceScale  ))
				normalVertices.push( new THREE.Vector3( pointScalar*(from.x+ to.x * delta)*spaceScale   ,pointScalar*( from.y + to.y * delta)*spaceScale      , pointScalar*(from.z + to.z * delta)*spaceScale  ))
				} else {
				const delta2 = delta - timeScale/100.0;
				normalVertices.push( new THREE.Vector3( pointScalar*( to.x * delta2)*spaceScale   ,pointScalar*( 0 * (1-delta2) + to.y * delta2)*spaceScale      , pointScalar*(0 * (1-delta2) + to.z * delta2)*spaceScale  ))
				normalVertices.push( new THREE.Vector3( pointScalar*( to.x * delta)*spaceScale   ,pointScalar*( 0 * (1-delta) + to.y * delta)*spaceScale      , pointScalar*(0 * (1-delta) + to.z * delta)*spaceScale  ))
				}	
				pushNColor( n );

			if( showArms )
			{
				if( s == 50 && delta || ( drawRotationAllAxles ) ){
					if( drawRotationAxles ) {
						if( SLERP || addN2 ) {
							normalVertices.push( new THREE.Vector3( (A[n].x - 2*q.nx)*spaceScale   ,( A[n].y - 2 * q.ny)*spaceScale      , (A[n].z-2*q.nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x + 0*q.nx)*spaceScale   ,( A[n].y + 0 * q.ny)*spaceScale      , (A[n].z+ 0*q.nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x - 0*q.nx)*spaceScale   ,( A[n].y - 0 * q.ny)*spaceScale      , (A[n].z-0*q.nz)*spaceScale  ))
							normalVertices.push( new THREE.Vector3( (A[n].x + 2*q.nx)*spaceScale   ,( A[n].y + 2 * q.ny)*spaceScale      , (A[n].z+ 2*q.nz)*spaceScale  ))
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
								nx = to.nx;
								ny = to.ny;
								nz = to.nz;
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

				// this is just the straght segment
				normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
				A[n].x += prior.x;
				A[n].y += prior.y;
				A[n].z += prior.z;

				normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
				pushNColor(n,0.3);
			}
		}
		
	}
	}
	
	return;


}

// { a,      b,	    c,		       d,				   e }
// { a,    a+b,	a+b+c,		 a+b+c+d,			   a+b+c+d+e }
// { a,a + a+b,a+a+b + a+b+c, a+a+b + a+b+c + a+b+c+d, a+a+b + a+b+c + a+b+c+d + a+b+c+d+e }

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
				lnQ2.add( lnQBase );
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

	/*
			// this does a range around the curves - but it's a lot of segments...
			for( var t = -Math.PI; t<= Math.PI; t+=0.1 ) {
				for( var s = -Math.PI/8; s < Math.PI/8; s+= 0.05 ) {
				for( var u = -Math.PI/8; u < Math.PI/8; u+= 0.05 ) {
					let lnQ1;
					if( showRotationCurve_ == "X" )
						lnQ1 = mkQuat().yaw(s+curSliders.lnQY[showRotationCurveSegment-1])
							.pitch( t +curSliders.lnQX[showRotationCurveSegment-1])
							.roll( u +curSliders.lnQZ[showRotationCurveSegment-1])

					if( showRotationCurve_ == "Y" )
						lnQ1 = mkQuat().yaw(t+curSliders.lnQY[showRotationCurveSegment-1])
							.pitch( u +curSliders.lnQX[showRotationCurveSegment-1])
							.roll( s +curSliders.lnQZ[showRotationCurveSegment-1])

					if( showRotationCurve_ == "Z" )
						lnQ1 = mkQuat().yaw( u+curSliders.lnQY[showRotationCurveSegment-1])
							.pitch( s +curSliders.lnQX[showRotationCurveSegment-1])
							.roll( t +curSliders.lnQZ[showRotationCurveSegment-1])

					if( fixAxleRotation )
						lnQ1.freeSpin( lnQ.θ, lnQ )
					lnQ1.add( lnQBase );
					doDrawBasis( lnQ1, lnQ1, 1, 1, null, (showRotationCurve_===origShow)?1:0.5 );
				}
				}
			}

          */
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
	
	const next = q.add2( qPrior).update();

	//console.log( "Prior:", qPrior, q, next );

	// q.x and q.nx*q.θ are equivalent
	// the total rotation si still q.nl.
	const qx = qPrior.apply(new lnQuat( 0, q.x ,   0 ,   0));
	const qy = qPrior.apply(new lnQuat( 0,   0 , q.y ,   0));
	const qz = qPrior.apply(new lnQuat( 0,   0 ,   0 , q.z));

	const qxy = drawRawRot?qPrior.apply(new lnQuat(0, q.x ,   0 ,   0).apply(new lnQuat(0,   0 , q.y ,   0)))
			:priorComposite.apply(new lnQuat(0, q.x ,   0 ,   0).apply(new lnQuat(0,   0 , q.y ,   0)))
			;
	const qyx = drawRawRot?qPrior.apply(new lnQuat(0,   0 , q.y ,   0).apply(new lnQuat(0, q.x ,   0 ,   0)))
			:priorComposite.apply(new lnQuat(0,   0 , q.y ,   0).apply(new lnQuat(0, q.x ,   0 ,   0)));

	const qxyz = drawRawRot?qPrior.apply(new lnQuat(0, q.x ,   0 ,   0).apply(new lnQuat(0,   0 , q.y ,   0)).apply(new lnQuat(0,   0 , 0, q.z)))
			:priorComposite.apply(new lnQuat(0, q.x ,   0 ,   0).apply(new lnQuat(0,   0 , q.y ,   0)).apply(new lnQuat(0,   0 , 0, q.z)))
			;
	const qyxz = drawRawRot?qPrior.apply(new lnQuat(0,   0 , q.y ,   0).apply(new lnQuat(0, q.x ,   0 ,   0)).apply(new lnQuat(0,   0 , 0, q.z)))
			:priorComposite.apply(new lnQuat(0,   0 , q.y ,   0).apply(new lnQuat(0, q.x ,   0 ,   0)).apply(new lnQuat(0,   0 , 0, q.z)));

	priorComposite = drawRotationSquaresYX?qyxz:qxyz;

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
		pushNColor(n,5.9);
		pushNColor(n,5.9);
		pushNColor(n,5.9);
		pushNColor(n,5.9);
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
			for( let i = 0; i < _20; i++ )
			{
				const step = qPrior.add2( q, i*timeScale/_20 );
		
				const p1 = step.apply( p1_, timeScale/_20 );
				const p2 = step.apply( p2_, timeScale/_20 );
				const p3 = step.apply( p3_, timeScale/_20 );
				const p4 = step.apply( p4_, timeScale/_20 );
			
				normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																							
				normalVertices.push( new THREE.Vector3( p1.x*spaceScale   ,p1.y*spaceScale  , p1.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
				
				normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p2.x*spaceScale   ,p2.y*spaceScale  , p2.z*spaceScale  ))
																							
				normalVertices.push( new THREE.Vector3( p4.x*spaceScale   ,p4.y*spaceScale  , p4.z*spaceScale ))
				normalVertices.push( new THREE.Vector3( p3.x*spaceScale   ,p3.y*spaceScale  , p3.z*spaceScale  ))
				pushNColor(n,0.6);
				pushNColor(n,0.6);
				pushNColor(n,0.6);
				pushNColor(n,0.6);
			}
		}


	}

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
		pushNColor(n,0.99);
		pushNColor(n,0.99);
		pushNColor(n,0.99);
		pushNColor(n,0.99);
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
			pushNColor(n,0.4);
			pushNColor(n,0.4);
			pushNColor(n,0.4);
			pushNColor(n,0.4);
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
			pushNColor(n,0.2);
			pushNColor(n,0.2);
			pushNColor(n,0.2);
			pushNColor(n,0.2);
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
			pushNColor(n,0.8);
			pushNColor(n,0.8);
			pushNColor(n,0.8);
			pushNColor(n,0.8);
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
				pushNColor(n,Math.floor(i/_20*9)+0.5);
				pushNColor(n,Math.floor(i/_20*9)+0.5);
				pushNColor(n,Math.floor(i/_20*9)+0.5);
				pushNColor(n,Math.floor(i/_20*9)+0.5);
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
			pushNColor(n,0.4);
			pushNColor(n,0.4);
			pushNColor(n,0.4);
			pushNColor(n,0.4);
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
			pushNColor(n,0.2);
			pushNColor(n,0.2);
			pushNColor(n,0.2);
			pushNColor(n,0.2);
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
				pushNColor(n,Math.floor(i/_20*9)+0.5);
				pushNColor(n,Math.floor(i/_20*9)+0.5);
				pushNColor(n,Math.floor(i/_20*9)+0.5);
				pushNColor(n,Math.floor(i/_20*9)+0.5);
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
		if(0) // attempting to convert to lat/long/len
                {
                    const len = lnQ2.θ;///(Math.PI*2);
                    const lat = Math.acos( lnQ2.y /(Math.PI*2) );
                    const lnglen = Math.sqrt( lnQ2.x*lnQ2.x+lnQ2.z*lnQ2.z );

                    const lng = Math.acos( ( lnQ2.x / lnglen ) / (Math.PI*2) );

                    x = lng;
                    y = lat;
                    z = len;
                }

		//console.log( "Draw point:", x, y, z );
		if(1) {
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
			//for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
			for( let t = -Math.PI*2; t < Math.PI*2; t+= 0.25/2 ){
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
	internalAccel = document.getElementById( "internalAccel")?.checked;
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


	let showAxis = document.getElementById( "showAxis")?.checked;
	let showQuat = document.getElementById( "showQuat")?.checked;
	let degrees = document.getElementById( "showDegrees")?.checked;

	if( showQuat ) {
		let tmp = document.getElementById( "labelC1");
		if( tmp ) tmp.textContent = "W";
		tmp = document.getElementById( "labelC2");
		if( tmp ) tmp.textContent = "X";
		tmp = document.getElementById( "labelC3");
		if( tmp ) tmp.textContent = "Y";
		tmp = document.getElementById( "labelC4");
		if( tmp ) tmp.textContent = "Z";
	}else {
		let tmp = document.getElementById( "labelC1");
		if( tmp ) tmp.textContent = "X";
		tmp = document.getElementById( "labelC2");
		if( tmp ) tmp.textContent = "Y";
		tmp = document.getElementById( "labelC3");
		if( tmp ) tmp.textContent = "Z";
		tmp = document.getElementById( "labelC4");
		if( tmp ) tmp.textContent = "Angle";
	}
	

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
			if( showAxis && !showQuat ) {
				document.getElementById( "lnQXval"+n).textContent = (lnQ.nx).toFixed(4);
				document.getElementById( "lnQYval"+n).textContent = (lnQ.ny).toFixed(4);
				document.getElementById( "lnQZval"+n).textContent = (lnQ.nz).toFixed(4);
			}else if( showQuat ) {
				const qw = Math.cos( lnQ.θ/2 );
				const s = Math.sin( lnQ.θ/2 );
				document.getElementById( "lnQXval"+n).textContent = (qw).toFixed(4);
				document.getElementById( "lnQYval"+n).textContent = (lnQ.nx*s).toFixed(4);
				document.getElementById( "lnQZval"+n).textContent = (lnQ.ny*s).toFixed(4);
				document.getElementById( "lnQAngle"+n).textContent = (lnQ.nz*s).toFixed(4);
			}else {
				// normalize the output angle... 
				const nL = Math.abs(lnQ.x)+Math.abs(lnQ.y)+Math.abs(lnQ.z);
				if( showAxis ) {
					if( degrees ) {
						document.getElementById( "lnQXval"+n).textContent = (lnQ.nx*180/Math.PI).toFixed(4);
						document.getElementById( "lnQYval"+n).textContent = (lnQ.ny*180/Math.PI).toFixed(4);
						document.getElementById( "lnQZval"+n).textContent = (lnQ.nz*180/Math.PI).toFixed(4);
					}else{
						document.getElementById( "lnQXval"+n).textContent = (lnQ.nx/Math.PI).toFixed(4) + "π";
						document.getElementById( "lnQYval"+n).textContent = (lnQ.ny/Math.PI).toFixed(4) + "π";
						document.getElementById( "lnQZval"+n).textContent = (lnQ.nz/Math.PI).toFixed(4) + "π";
					}
				}else {
					if( degrees ) {
						document.getElementById( "lnQXval"+n).textContent = (lnQ.x*180/Math.PI).toFixed(4);
						document.getElementById( "lnQYval"+n).textContent = (lnQ.y*180/Math.PI).toFixed(4);
						document.getElementById( "lnQZval"+n).textContent = (lnQ.z*180/Math.PI).toFixed(4);
					}else{
						document.getElementById( "lnQXval"+n).textContent = (lnQ.x/Math.PI).toFixed(4) + "π";
						document.getElementById( "lnQYval"+n).textContent = (lnQ.y/Math.PI).toFixed(4) + "π";
						document.getElementById( "lnQZval"+n).textContent = (lnQ.z/Math.PI).toFixed(4) + "π";
					}
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
				if( !showQuat )
					document.getElementById( "lnQAngle"+n).textContent = (len*180/Math.PI).toFixed(4);
			} else {
				document.getElementById( "xRot"+n).textContent = (curSliders.lnQX[n-1] ).toFixed(4);
				document.getElementById( "yRot"+n).textContent = (curSliders.lnQY[n-1] ).toFixed(4);
				if( !showQuat )
					document.getElementById( "lnQAngle"+n).textContent = (len/Math.PI).toFixed(4) + "π";
			}
			if( degrees ) {
			} else {
			}
			//document.getElementById( "lnQYEulerval"+n).textContent = (qlen*180/Math.PI).toFixed(4);
			
	        
		}
	        
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
	        


	        
		check = document.getElementById( "normalizeTangents");
		if( check )
			normalizeNormalTangent = check.checked; // global variable from lnQuat.js
		
		DrawNormalBall(normalVertices,normalColors);
	        
		drawCoordinateGrid();
		drawDigitalTimeArm( curSliders, slerp );
	        
		// squares is calculated in analog arm.
		drawAnalogArm( curSliders, slerp ); 
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