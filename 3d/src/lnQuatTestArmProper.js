
let armPrimary = 1; // 0 = x, 1=y, 2=z
let A,B,C,D,E;  // slider values
let xRot, yRot, zRot;
let AxRot, AyRot, AzRot;
let turnCount = 12;
let stepCount = 1000;
let showCoordinateGrid = false;
let drawNormalBall = false;
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


let showRaw = true;  // just raw x/y/z at x/y/z
let shownRnL = true;  // p * nL / nR
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
	const spaceScale = 5;
	const normal_del = 1;

function test1() {
	// this test fails... although I would think that Y and PQ5 should be close
	const P = new lnQuat( 0, 0.1, 0.2, 0.3 ).update();
	const Q = new lnQuat( 0, -0.3, -0.1, 0.2 ).update();
	const PQ1 = new lnQuat(0,P.x,P.y,P.z).freeSpin( Q.nL, Q );
	const PQ5 = new lnQuat(0,P.x,P.y,P.z).freeSpin( Q.nL*0.5, Q );
	SLERP=true;
	const X = P.slerp( PQ1, 0.5 );
	SLERP=false;
	const Y = P.slerp( PQ1, 0.5 );
	console.log( "Things:", X, Y, PQ5 );
}
//test1();

function mkQuat( a,b,c,d ){
	const scalar = Math.sqrt(a*a+b*b+c*c+d*d);
	const lin = Math.abs(a)+Math.abs(b)+Math.abs(c)+Math.abs(d);
	//return new lnQuat( a*scalar/lin, b*scalar/lin ,c*scalar/lin,d*scalar/lin );
	//return new lnQuat( a*lin/scalar, b*lin/scalar ,c*lin/scalar,d*lin/scalar );
	return new lnQuat( a, b, c, d );
}

function drawDigitalTimeArm(curSliders, slerp) {
	
	const origin = {x:0,y:0,z:0};

	const arm = armPrimary==0?{x:2,y:0,z:0}
		      :armPrimary==1?{x:0,y:2,z:0}
			:{x:0,y:0,z:2};


	const t2_ts = fixAxleRotation?new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.nL, lnQ1, timeScale   ):new lnQuat(lnQ2);
	const t3_ts = fixAxleRotation?new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2_ts.nL, t2_ts, timeScale ):new lnQuat(lnQ3);
	const t4_ts = fixAxleRotation?new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3_ts.nL, t3_ts, timeScale ):new lnQuat(lnQ4);
	const t5_ts = fixAxleRotation?new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4_ts.nL, t4_ts, timeScale ):new lnQuat(lnQ5);

	if( applyAccel ) {
		t2_ts.add( lnQ1 );
		t3_ts.add( t2_ts );
		t4_ts.add( t3_ts );
		t5_ts.add( t4_ts );
	}
	if( keepInertia ) {
		t2_ts.add( lnQ1 );
		t3_ts.add( t2_ts );
		t4_ts.add( t3_ts );
		t5_ts.add( t4_ts );
	}


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

	
	const R_ = [lnQ1,lnQ2,lnQ3,lnQ4,lnQ5];
	const R_ts  = [lnQ1,t2_ts,t3_ts,t4_ts,t5_ts];
	//const Rz_ts = [lnQ1,t2__ts,t3__ts,t4__ts,t5__ts];
	const Rw_ts = [lnQ1,t2_ts,t3_ts,t4_ts,t5_ts];
	const A__ts = [A1_ts,A2_ts,A3_ts,A4_ts,A5_ts];
	const A_R_ts = [A1_R_ts,A2_R_ts,A3_R_ts,A4_R_ts,A5_R_ts];


	let prior = origin;
	 for( var n = 0; n < 5; n++ ) {
		if( (n+1) < 5 ) {
			A__ts[n+1].x += A__ts[n].x;
			A__ts[n+1].y += A__ts[n].y;
			A__ts[n+1].z += A__ts[n].z;
		}
		 
		if( n > 0 ){
			doDrawBasis( A_R_ts[n], A__ts[n-1], 1.5, 1, null, 1.0 );
		}

		/*
		  not sure which rotation axis this is supposed to show at this point; but this dowsn't work.
		if( drawRotationAxles ) {
			normalVertices.push( new THREE.Vector3( (A__ts[n].x)*spaceScale   ,( A__ts[n].y)*spaceScale      , (A__ts[n].z)*spaceScale  ))
			normalVertices.push( new THREE.Vector3( (A__ts[n].x + 4*R_ts[n].nx)*spaceScale   ,( A__ts[n].y+ 4*R_ts[n].ny)*spaceScale      , (A__ts[n].z+ 4*R_ts[n].nz)*spaceScale  ))
	
			pushN(n, 0.3);
		}
		*/
		if( showArms )
		{
		normalVertices.push( new THREE.Vector3( (n?A__ts[n-1].x:0)*spaceScale   ,( n?A__ts[n-1].y:0)*spaceScale      , (n?A__ts[n-1].z:0)*spaceScale  ))
		normalVertices.push( new THREE.Vector3( (A__ts[n].x)*spaceScale   ,( A__ts[n].y)*spaceScale      , (A__ts[n].z)*spaceScale  ))
	
		pushN(n);
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



	const t2 = fixAxleRotation?new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.nL, lnQ1, timeScale ):new lnQuat(lnQ2);
	const t3 = fixAxleRotation?new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2.nL, t2, timeScale ):new lnQuat(lnQ3);
	const t4 = fixAxleRotation?new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3.nL, t3, timeScale ):new lnQuat(lnQ4);
	const t5 = fixAxleRotation?new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4.nL, t4, timeScale ):new lnQuat(lnQ5);

	const Ro = [lnQ1,new lnQuat(t2),new lnQuat(t3),new lnQuat(t4),new lnQuat(t5)];

	if( applyAccel ) {
		t2.add( lnQ1 );
		t3.add( t2 );
		t4.add( t3 );
		t5.add( t4 );
	}
	if( keepInertia ) {
		t2.add( lnQ1 );
		t3.add( t2 );
		t4.add( t3 );
		t5.add( t4 );
	}
	lnQ_current[0] = lnQ1_current = lnQ1;
	lnQ_current[1] = lnQ2_current = t2;
	lnQ_current[2] = lnQ3_current = t3;
	lnQ_current[3] = lnQ4_current = t4;
	lnQ_current[4] = lnQ5_current = t5;

	// compute non-inertial differential
	const r2_d = t2.sub2( Ro[0] );
	const r3_d = t3.sub2( Ro[1] );
	const r4_d = t4.sub2( Ro[2] );
	const r5_d = t5.sub2( Ro[3] );

	// compute non-inertial differential
	const r2_ = t2.sub2( lnQ1 );
	const r3_ = t3.sub2( t2 );
	const r4_ = t4.sub2( t3 );
	const r5_ = t5.sub2( t4 );

	// 
	const A1 = lnQ1.applyDel( arm );
	const A2 = t2.applyDel( arm );
	const A3 = t3.applyDel( arm );
	const A4 = t4.applyDel( arm );
	const A5 = t5.applyDel( arm );

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
	for( var n = 0; n < 5; n++ ) {
		if( showLineSeg[n] && drawRotationSquares ) {
			drawSquare( n, Rm[n], R[n-1] );
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

		for( s = 0; s <= 100; s++ ) {
			result.portion = null;
			prior = delta.applyDel( shortArm, s*timeScale/100.0, from, 1, result );
			draw( result.portion, from, delta, s*timeScale/100.0 );
		}
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
			pushN(n);
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
			
				if( from ) {
					doDrawBasis( to, A[n], 1, delta, from, n === (showRotationCurveSegment-1)?0.8:0.3 );
				} else 
					doDrawBasis( q, A[n], 1, 1, null, n === (showRotationCurveSegment-1)?0.8:0.3 );

			}
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
							const ax = to.x + from.x * delta;
							const ay = to.y + from.y * delta;
							const az = to.z + from.z * delta;

							const l = ax*ax + ay*ay + az*az;

							const s = Math.sqrt(l);

							const nx = ax/s;
							const ny = ay/s;
							const nz = az/s;
							
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
					lnQ2.update().freeSpin( lnQ.nL, lnQ )
				lnQ2.add( lnQBase );
				doDrawBasis( lnQ2, lnQ2, 1, 1, null, (showRotationCurve_===origShow)?1:0.5 );
			}
		}else {
			for( var t = -Math.PI*2; t<= Math.PI*2; t+=0.02 ) {
				const lnQ1 = mkQuat().yaw((( showRotationCurve_ == "Y" ) ?t:0)+curSliders.lnQY[showRotationCurveSegment-1])
					.pitch((( showRotationCurve_ == "X" ) ?t:0)	   +curSliders.lnQX[showRotationCurveSegment-1])
					.roll((( showRotationCurve_ == "Z" ) ?t:0)	    +curSliders.lnQZ[showRotationCurveSegment-1])
				if( fixAxleRotation )
					lnQ1.freeSpin( lnQ.nL, lnQ )
				lnQ1.add( lnQBase );
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
	
	const next = q.add2( qPrior).update();

	//console.log( "Prior:", qPrior, q, next );

	// q.x and q.nx*q.nR are equivalent
	// the total rotation si still q.nl.
	//const qx = new lnQuat( 0, q.x * q.nR/q.nL, 0, 0 );
	//const qy = new lnQuat( 0, 0, q.y * q.nR/q.nL, 0 );
	//const qz = new lnQuat( 0, 0, 0, q.z * q.nR/q.nL );
	const qx = qPrior.apply(new lnQuat( 0, q.x ,   0 ,   0));
	const qy = qPrior.apply(new lnQuat( 0,   0 , q.y ,   0));
	const qz = qPrior.apply(new lnQuat( 0,   0 ,   0 , q.z));

	const qxy = drawRawRot?qPrior.apply(new lnQuat(0, q.x ,   0 ,   0).apply(new lnQuat(0,   0 , q.y ,   0)))
			:priorComposite.apply(new lnQuat(0, q.x ,   0 ,   0).apply(new lnQuat(0,   0 , q.y ,   0)))
			;
	const qyx = drawRawRot?qPrior.apply(new lnQuat(0,   0 , q.y ,   0).apply(new lnQuat(0, q.x ,   0 ,   0)))
			:priorComposite.apply(new lnQuat(0,   0 , q.y ,   0).apply(new lnQuat(0, q.x ,   0 ,   0)));

	priorComposite = drawRotationSquaresYX?qyx:qxy;

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
				pushN(n,0.6);
				pushN(n,0.6);
				pushN(n,0.6);
				pushN(n,0.6);
			}
		}


	}

	if( drawRotIter || drawMechanicalRot ) 
	{
		const p1 = ( next.applyDel({x:onef1 ,y :onef1,z:0 }, timeScale*qPrior.nR/qPrior.nL));
		const p2 = ( next.applyDel({x:onef1 ,y:-onef1,z:0 }, timeScale*qPrior.nR/qPrior.nL));
		const p3 = ( next.applyDel({x:-onef1,y: onef1,z:0 }, timeScale*qPrior.nR/qPrior.nL));
		const p4 = ( next.applyDel({x:-onef1,y:-onef1,z:0 }, timeScale*qPrior.nR/qPrior.nL));

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
		if( drawRotIter && drawRotationInterpolant[n] )
		{
			let p1 = qPrior.applyDel({x:onef3,y:onef3,z:0 }  , timeScale);  
			let p2 = qPrior.applyDel({x:onef3,y:-onef3,z:0 } , timeScale);  
			let p3 = qPrior.applyDel({x:-onef3,y:onef3,z:0 } , timeScale);  
			let p4 = qPrior.applyDel({x:-onef3,y:-onef3,z:0 }, timeScale);  
			const _20 = drawRotationInterpolant[n];
			for( var i = 0; i < _20; i++ ) {
				const del = timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1));
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
				 p1 = qy.applyDel(qx.applyDel( p1, timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1))), timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1)));
				 p2 = qy.applyDel(qx.applyDel( p2, timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1))), timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1)));
				 p3 = qy.applyDel(qx.applyDel( p3, timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1))), timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1)));
				 p4 = qy.applyDel(qx.applyDel( p4, timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1))), timeScale/(_20/(stepScalar[n]?q.nL/q.nR:1)));
				
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
		const normLen = 0.5*(steps/range);
		for( let x = -range; x <= range;  x += (2*range)/steps ) {
			for( let y = -range; y <= range;  y += (2*range)/steps ) {
				for( let z = -range; z <= range; z += (2*range)/steps ) {
					const ll = Math.abs(x)+Math.abs(y)+Math.abs(z);
					const lr = Math.sqrt(x*x+y*y+z*z);
					const lnQ = new lnQuat( {a:cx+x, b:cy+y, c:cz+z } );
					if( lnQ.nL > range ) continue;
					const basis = lnQ.getBasis( );
				if( (lr) > range ) continue;

				if( (Math.abs(z)+Math.abs(y)+Math.abs(x)) < minr ) continue;
		
				// the original normal direction; projected offset of sphere (linear scaled)
				//normalVertices.push( new THREE.Vector3( x*spaceScale,0*spaceScale, z*spaceScale ))
				//normalVertices.push( new THREE.Vector3( x*spaceScale + 1*normal_del,0*spaceScale + 1*normal_del,z*spaceScale + 1*normal_del ))
				//normalColors.push( new THREE.Color( 255,0,255,255 ))
				//normalColors.push( new THREE.Color( 255,0,255,255 ))
		
				const nL = (Math.abs(lnQ.x) + Math.abs(lnQ.y) + Math.abs(lnQ.z));
				//const nR = Math.sqrt( lnQ.x*lnQ.x+lnQ.y*lnQ.y+lnQ.z*lnQ.z );
				const pointScalar = 2/ Math.PI;
				const ox = pointScalar*(unscaled?lnQ.x:(invert?lnQ.x*lnQ.nR/lnQ.nL:lnQ.nL*lnQ.nx));
				const oy = pointScalar*(unscaled?lnQ.y:(invert?lnQ.y*lnQ.nR/lnQ.nL:lnQ.nL*lnQ.ny));
				const oz = pointScalar*(unscaled?lnQ.z:(invert?lnQ.z*lnQ.nR/lnQ.nL:lnQ.nL*lnQ.nz));
		
		
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
			
		}
	
	}

	function doDrawBasis(lnQ2,t,s,Del,from,colorS ) {
		const basis = lnQ2.update().getBasisT( Del,from );
		if( !s ) s = 1.0;
		s = s/Math.PI;
		if( !colorS ) colorS = s;
		const l = 1;//(t instanceof lnQuat)?1/t.nR:1;
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
						if( addN2) {
							x = lnQ2.nx*lnQ2.nL * Del + from.nx*from.nL;
							y = lnQ2.ny*lnQ2.nL * Del + from.ny*from.nL;
							z = lnQ2.nz*lnQ2.nL * Del + from.nz*from.nL;
							const l_ = Math.abs(x)+Math.abs(y)+Math.abs(z);
							const r_ = Math.sqrt(x*x+y*y+z*z);
							// convert back from nr*angle to nl*angle
							x *= r_/l_
							y *= r_/l_
							z *= r_/l_
						} else {
							x = lnQ2.x * Del + from.x ;
							y = lnQ2.y * Del + from.y ;
							z = lnQ2.z * Del + from.z ;
						}
						
					} else {
						const sa = Math.sin(angle);
						const sa1 = Math.sin((1-Del)*angle);
						const sa2 = Math.sin(Del*angle);
					
						if( addN2) {
							x = (from.x+lnQ2.nx*lnQ2.nL) * sa2/sa + (from.nx*from.nL) * sa1/sa;
							y = (from.y+lnQ2.ny*lnQ2.nL) * sa2/sa + (from.ny*from.nL) * sa1/sa;
							z = (from.z+lnQ2.nz*lnQ2.nL) * sa2/sa + (from.nz*from.nL) * sa1/sa;
							const l_ = Math.abs(x)+Math.abs(y)+Math.abs(z);
							const r_ = Math.sqrt(x*x+y*y+z*z);
							// convert back from nr*angle to nl*angle
							x *= r_/l_
							y *= r_/l_
							z *= r_/l_
						} else {
							x = (from.x+lnQ2.x) * sa2/sa + from.x * sa1/sa;
							y = (from.y+lnQ2.y) * sa2/sa + from.y * sa1/sa;
							z = (from.z+lnQ2.z) * sa2/sa + from.z * sa1/sa;
						}
					}
				} 
				else {
					 if( addN2 ) {
						// ax === ( this.x / this.nR ) * this.nL   .... and     this.nx === this.x / this.nR
						x = lnQ2.nx*lnQ2.nL * Del + from.nx*from.nL ;
						y = lnQ2.ny*lnQ2.nL * Del + from.ny*from.nL ;
						z = lnQ2.nz*lnQ2.nL * Del + from.nz*from.nL ;
						const l_ = Math.abs(x)+Math.abs(y)+Math.abs(z);
						const r_ = Math.sqrt(x*x+y*y+z*z);
						// convert back from nr*angle to nl*angle
						x *= r_/l_
						y *= r_/l_
						z *= r_/l_
					} else {
						x = from.x + Del * lnQ2.x;
						y = from.y + Del * lnQ2.y;
						z = from.z + Del * lnQ2.z;
					}
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
		const pointScalar = 2/ Math.PI;
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
	if(drawNormalBall/*draw normal ball with twist*/)
		for( let h = 1*-1; h <= 1; h+= 0.1/2 ) {
			for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
				let x = Math.sin(t );
				const z = Math.cos(t);
				const lnQ = new lnQuat( norm={x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) } );
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

function DrawQuatPaths(normalVertices_,normalColors_, shapes) {
	normalVertices = normalVertices_
	normalColors = normalColors_
	let curSliders = {
	};
	curSliders.lnQX = [];
	curSliders.lnQY = [];
	curSliders.lnQZ = [];
	drawRawRot = document.getElementById( "drawRawRot")?.checked;
	drawRawRotIter = document.getElementById( "drawRawRotIter")?.checked;
	drawRotIter = document.getElementById( "drawRotIter")?.checked;
	drawMechanicalRot = document.getElementById( "drawMechanicalRot")?.checked;
	showArms = document.getElementById( "showArm")?.checked;
	rawAngles = document.getElementById( "rawAngles")?.checked;
	keepInertia = document.getElementById( "keepInertia" )?.checked;
	applyAccel = document.getElementById( "applyAccel" )?.checked;

	showSliderCurves = document.getElementById( "showSliderCurves" )?.checked;
	let scalar = document.getElementById( "largeRange")?.checked;
	let scalar2 = document.getElementById( "fineRange")?.checked;

	let axis = document.getElementById( "showAxis")?.checked;
	let degrees = document.getElementById( "showDegrees")?.checked;

	for( var n = 1; n <= 5; n++ ) {
		let lnQX = Number(document.getElementById( "lnQX"+n ).value);
		let lnQY = Number(document.getElementById( "lnQY"+n ).value);
		let lnQZ = Number(document.getElementById( "lnQZ"+n ).value);
		if( n === 1 )
			twistDelta = (lnQX / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1)*8;

		curSliders.lnQX[n-1] = (lnQX / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
		curSliders.lnQY[n-1] = (lnQY / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
		curSliders.lnQZ[n-1] = (lnQZ / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
		let lnQ;
	       	switch(n) {
		case 1:
			if( rawAngles )
				lnQ = lnQ1 = mkQuat( 0, curSliders.lnQX[0], curSliders.lnQY[0], curSliders.lnQZ[0] ).update();
			else
				lnQ = lnQ1 = mkQuat().yaw(curSliders.lnQY[0]).pitch(curSliders.lnQX[0]).roll(curSliders.lnQZ[0]);
			break;
		case 2:
			if( rawAngles )
				lnQ = lnQ2 = mkQuat( 0, curSliders.lnQX[1], curSliders.lnQY[1], curSliders.lnQZ[1] ).update();
			else
				lnQ = lnQ2 = mkQuat().yaw(curSliders.lnQY[1]).pitch(curSliders.lnQX[1]).roll(curSliders.lnQZ[1]);
			break;
		case 3:
			if( rawAngles )
				lnQ = lnQ3 = mkQuat( 0, curSliders.lnQX[2], curSliders.lnQY[2], curSliders.lnQZ[2] ).update();
			else
				lnQ = lnQ3 = mkQuat().yaw(curSliders.lnQY[2]).pitch(curSliders.lnQX[2]).roll(curSliders.lnQZ[2]);
			break;
		case 4:
			if( rawAngles )
				lnQ = lnQ4 = mkQuat( 0, curSliders.lnQX[3], curSliders.lnQY[3], curSliders.lnQZ[3] ).update();
			else
				lnQ = lnQ4 = mkQuat().yaw(curSliders.lnQY[3]).pitch(curSliders.lnQX[3]).roll(curSliders.lnQZ[3]);
			break;
		case 5:
			if( rawAngles )
				lnQ = lnQ5 = mkQuat( 0, curSliders.lnQX[4], curSliders.lnQY[4], curSliders.lnQZ[4] ).update();
			else
				lnQ = lnQ5 = mkQuat().yaw(curSliders.lnQY[4]).pitch(curSliders.lnQX[4]).roll(curSliders.lnQZ[4]);
			break;
		}

		lnQ.update();

		const len = lnQ.nL;
		const qlen = lnQ.nR;
		if( axis ) {
			document.getElementById( "lnQXval"+n).textContent = (lnQ.nx).toFixed(4);
			document.getElementById( "lnQYval"+n).textContent = (lnQ.ny).toFixed(4);
			document.getElementById( "lnQZval"+n).textContent = (lnQ.nz).toFixed(4);
		}else {
			if( degrees ) {
				document.getElementById( "lnQXval"+n).textContent = (lnQ.x*180/Math.PI).toFixed(4);
				document.getElementById( "lnQYval"+n).textContent = (lnQ.y*180/Math.PI).toFixed(4);
				document.getElementById( "lnQZval"+n).textContent = (lnQ.z*180/Math.PI).toFixed(4);
			}else{
				document.getElementById( "lnQXval"+n).textContent = (lnQ.xcur).toFixed(4);
				document.getElementById( "lnQYval"+n).textContent = (lnQ.ycur).toFixed(4);
				document.getElementById( "lnQZval"+n).textContent = (lnQ.zcur).toFixed(4);
			}
		}
		const xyr = lnQ.nR;
		const xyl = lnQ.nL;
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
			document.getElementById( "xRot"+n).textContent = (curSliders.lnQX[n-1] * (qlen/len) *180/Math.PI).toFixed(4);
			document.getElementById( "yRot"+n).textContent = (curSliders.lnQY[n-1] * (qlen/len)*180/Math.PI).toFixed(4);
			document.getElementById( "lnQAngle"+n).textContent = (len*180/Math.PI).toFixed(4);
		} else {
			document.getElementById( "xRot"+n).textContent = (curSliders.lnQX[n-1] * (qlen/len)).toFixed(4);
			document.getElementById( "yRot"+n).textContent = (curSliders.lnQY[n-1] * (qlen/len)).toFixed(4);
			document.getElementById( "lnQAngle"+n).textContent = (len).toFixed(4);
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
		showScaledPoints = true;
	}else 			
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

	DrawNormalBall(normalVertices,normalColors);

	drawCoordinateGrid();
		drawDigitalTimeArm( curSliders, slerp );

	// squares is calculated in analog arm.
	drawAnalogArm( curSliders, slerp ); 

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