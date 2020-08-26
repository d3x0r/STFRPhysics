
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
let bisectAnalog = false;
let trisectAnalog = false;
let timeScale = 1.5;
let drawRotationAxles = true;
let drawRotationAllAxles = true;

let showRaw = true;  // just raw x/y/z at x/y/z
let shownRnL = true;  // p * nL / nR
let shownL = true;  //  p / nL
let shownR = true;  // p.n(xyz)  p / nR
const lnQ0 = new lnQuat();

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
test1();

function drawDigitalTimeArm(curSliders, slerp) {
	
	const origin = {x:0,y:0,z:0};

	const arm = {x:0,y:0,z:2};
	const shortArm = {x:0,y:0,z:2/100};
	const tmpShortArm = {x:0,y:0,z:2/100};

	let keepInertia = document.getElementById( "keepInertia" )?.checked?1:0;

	const lnQ1 = new lnQuat( 0, curSliders.lnQX[0], curSliders.lnQY[0], curSliders.lnQZ[0] ).update();
	const lnQ2 = new lnQuat( 0, curSliders.lnQX[1], curSliders.lnQY[1], curSliders.lnQZ[1] ).update();
	const lnQ3 = new lnQuat( 0, curSliders.lnQX[2], curSliders.lnQY[2], curSliders.lnQZ[2] ).update();
	const lnQ4 = new lnQuat( 0, curSliders.lnQX[3], curSliders.lnQY[3], curSliders.lnQZ[3] ).update();
	const lnQ5 = new lnQuat( 0, curSliders.lnQX[4], curSliders.lnQY[4], curSliders.lnQZ[4] ).update();

	const t2_ts = new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.nL, lnQ1, timeScale );
	const t3_ts = new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2_ts.nL, t2_ts, timeScale );
	const t4_ts = new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3_ts.nL, t3_ts, timeScale );
	const t5_ts = new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4_ts.nL, t4_ts, timeScale );

	const t2__ts = t2_ts.add2( lnQ1 ).update();
	const t3__ts = t2__ts.add2( t3_ts ).update();
	const t4__ts = t3__ts.add2( t4_ts ).update();
	const t5__ts = t4__ts.add2( t5_ts ).update();

	const tmpR = { portion:null };
	const A1_ts = lnQ1.applyDel( arm, timeScale, null, 0, tmpR );
	const A1_R_ts = tmpR.portion.update();  tmpR.portion = null;
	const A2_ts = (keepInertia===0?t2_ts:t2__ts).applyDel( arm, timeScale, null, 0, tmpR );
	const A2_R_ts = tmpR.portion.update();  tmpR.portion = null;
	const A3_ts = (keepInertia===0?t3_ts:t3__ts).applyDel( arm, timeScale, null, 0, tmpR );
	const A3_R_ts = tmpR.portion.update();  tmpR.portion = null;
	const A4_ts = (keepInertia===0?t4_ts:t4__ts).applyDel( arm, timeScale, null, 0, tmpR );
	const A4_R_ts = tmpR.portion.update();  tmpR.portion = null;
	const A5_ts = (keepInertia===0?t5_ts:t5__ts).applyDel( arm, timeScale, null, 0, tmpR );
	const A5_R_ts = tmpR.portion.update();  tmpR.portion = null;

	
	//const R_ = [lnQ1,lnQ2,lnQ3,lnQ4,lnQ5];
	const R_ts  = [lnQ1,t2_ts,t3_ts,t4_ts,t5_ts];
	const Rz_ts = [lnQ1,t2__ts,t3__ts,t4__ts,t5__ts];
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
		normalVertices.push( new THREE.Vector3( (n?A__ts[n-1].x:0)*spaceScale   ,( n?A__ts[n-1].y:0)*spaceScale      , (n?A__ts[n-1].z:0)*spaceScale  ))
		normalVertices.push( new THREE.Vector3( (A__ts[n].x)*spaceScale   ,( A__ts[n].y)*spaceScale      , (A__ts[n].z)*spaceScale  ))
	
		pushN(n);
	}
	
return;


}



		function pushN(n,s){
		if( !s ) s = 1.0;
		switch( n ) {
		case 1:
			normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
			normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
			break;
		case 2:
			normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
			normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
			break;
		case 3:
			normalColors.push( new THREE.Color( 0,1.0*s,1.0*s,255 ))
			normalColors.push( new THREE.Color( 0,1.0*s,1.0*s,255 ))
			break;
		case 4:
			normalColors.push( new THREE.Color( 1.0*s,1.0*s,0,255 ))
			normalColors.push( new THREE.Color( 1.0*s,1.0*s,0,255 ))
			break;
		default:
		normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
		normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
			}
		}




function drawAnalogArm(curSliders,slerp) {

	const origin = {x:0,y:0,z:0};

	const arm = {x:0,y:0,z:2};
	const shortArm = {x:0,y:0,z:2/100};
	const tmpShortArm = {x:0,y:0,z:2/100};

	let keepInertia = document.getElementById( "keepInertia" )?.checked?1:0;
	//const lnQ1 = new lnQuat( {x: curSliders.lnQX[0],y: curSliders.lnQY[0],z: curSliders.lnQZ[0]} );
	//const lnQ2 = new lnQuat( {x: curSliders.lnQX[1],y: curSliders.lnQY[1],z: curSliders.lnQZ[1]} );
	//const lnQ3 = new lnQuat( {x: curSliders.lnQX[2],y: curSliders.lnQY[2],z: curSliders.lnQZ[2]} );
	//const lnQ4 = new lnQuat( {x: curSliders.lnQX[3],y: curSliders.lnQY[3],z: curSliders.lnQZ[3]} );
	//const lnQ5 = new lnQuat( {x: curSliders.lnQX[4],y: curSliders.lnQY[4],z: curSliders.lnQZ[4]} );

	const lnQ1 = new lnQuat( 0, curSliders.lnQX[0], curSliders.lnQY[0], curSliders.lnQZ[0] ).update();
	const lnQ2 = new lnQuat( 0, curSliders.lnQX[1], curSliders.lnQY[1], curSliders.lnQZ[1] ).update();
	const lnQ3 = new lnQuat( 0, curSliders.lnQX[2], curSliders.lnQY[2], curSliders.lnQZ[2] ).update();
	const lnQ4 = new lnQuat( 0, curSliders.lnQX[3], curSliders.lnQY[3], curSliders.lnQZ[3] ).update();
	const lnQ5 = new lnQuat( 0, curSliders.lnQX[4], curSliders.lnQY[4], curSliders.lnQZ[4] ).update();

	const t2 = new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.nL, lnQ1, timeScale );
	const t3 = new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2.nL, t2, timeScale );
	const t4 = new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3.nL, t3, timeScale );
	const t5 = new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4.nL, t4, timeScale );

	// compute inertial frames
	const t2_ = t2.add2( lnQ1 ).update();
	const t3_ = t2_.add2( t3 ).update();
	const t4_ = t3_.add2( t4 ).update();
	const t5_ = t4_.add2( t5 ).update();

	// compute non-inertial differential
	const r2_ = t2.sub2( lnQ1 );
	const r3_ = t3.sub2( t2 );
	const r4_ = t4.sub2( t3 );
	const r5_ = t5.sub2( t4 );

	// 
	const A1 = lnQ1.applyDel( arm );
	const A2 = (keepInertia===0?t2:t2_).applyDel( arm );
	const A3 = (keepInertia===0?t3:t3_).applyDel( arm );
	const A4 = (keepInertia===0?t4:t4_).applyDel( arm );
	const A5 = (keepInertia===0?t5:t5_).applyDel( arm );

	//const R_ = [lnQ1,lnQ2,lnQ3,lnQ4,lnQ5];
	const Rm = [lnQ1,r2_,r3_,r4_,r5_];
	const R  = [lnQ1,t2,t3,t4,t5];
	const Rz = [lnQ1,t2_,t3_,t4_,t5_];
	const A = [{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];
	let prior = origin;
	for( var n = 0; n < 5; n++ ) {
		if( keepInertia )
			drawSquare( n, Rz[n] );
		else
			drawSquare( n, R[n] );
		if( n ) {
			A[n].x = A[n-1].x
			A[n].y = A[n-1].y
			A[n].z = A[n-1].z
		}
                var s;
		var scalar = 100;
		const result = { portion : null };
		
		// start from either the end of the previous
		//           or from the end of the sum of the previous
		//   add either relative rotation itself (to the end of rotations)
		//   or add the translated rotation (to the end of the sum of rotations)
		const from = n?((keepInertia===0?R:Rz)[n-1]):lnQ0;
		const delta = (keepInertia===0?Rm:R)[n];

		for( s = 0; s <= 100; s++ ) {
			result.portion = null;
			prior = delta.applyDel( shortArm, s*timeScale/100.0, from, 1, result );
			draw( result.portion, from, delta, s*timeScale/100.0 );
		}
		// draw the long segment to match digital arm.
		normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
		R[n] = result.portion;
		Rz[n] = result.portion;
		A[n].x += prior.x*scalar;
		A[n].y += prior.y*scalar;
		A[n].z += prior.z*scalar;
		normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
		pushN(n);

		function draw(q,from,to,delta)
		{
			if( s == 50 && delta || ( drawRotationAllAxles ) ){
				if( drawRotationAxles ) {
					if( SLERP || addN2 ) {
					normalVertices.push( new THREE.Vector3( (A[n].x - 2*q.nx)*spaceScale   ,( A[n].y - 2 * q.ny)*spaceScale      , (A[n].z-2*q.nz)*spaceScale  ))
					normalVertices.push( new THREE.Vector3( (A[n].x + 2*q.nx)*spaceScale   ,( A[n].y + 2 * q.ny)*spaceScale      , (A[n].z+ 2*q.nz)*spaceScale  ))
					}else {
					normalVertices.push( new THREE.Vector3( (A[n].x - 2*to.nx)*spaceScale   ,( A[n].y - 2 * to.ny)*spaceScale      , (A[n].z-2*to.nz)*spaceScale  ))
					normalVertices.push( new THREE.Vector3( (A[n].x + 2*to.nx)*spaceScale   ,( A[n].y + 2 * to.ny)*spaceScale      , (A[n].z+ 2*to.nz)*spaceScale  ))
	                                }
					pushN(n,0.5);
					
				}

			}
			if( ( s % 3 ) === 0 )  {
				if( from ) {
					doDrawBasis( to, A[n], 1, delta, from, 0.3 );
				} else 
					doDrawBasis( q, A[n], 1, 1, null, 0.3 );
			}

			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			A[n].x += prior.x;
			A[n].y += prior.y;
			A[n].z += prior.z;

			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			pushN(n,0.3);
		}
		
	}
	
return;


}


function drawArm(curSliders,normalVertices_,normalColors_, slerp) {
	normalVertices = normalVertices_
	normalColors = normalColors_


	const origin = {x:0,y:0,z:0};

	const arm = {x:0,y:0,z:2};
	const shortArm = {x:0,y:0,z:2/100};
	const tmpShortArm = {x:0,y:0,z:2/100};

	let keepInertia = document.getElementById( "keepInertia" )?.checked?1:0;
	//const lnQ1 = new lnQuat( {x: curSliders.lnQX[0],y: curSliders.lnQY[0],z: curSliders.lnQZ[0]} );
	//const lnQ2 = new lnQuat( {x: curSliders.lnQX[1],y: curSliders.lnQY[1],z: curSliders.lnQZ[1]} );
	//const lnQ3 = new lnQuat( {x: curSliders.lnQX[2],y: curSliders.lnQY[2],z: curSliders.lnQZ[2]} );
	//const lnQ4 = new lnQuat( {x: curSliders.lnQX[3],y: curSliders.lnQY[3],z: curSliders.lnQZ[3]} );
	//const lnQ5 = new lnQuat( {x: curSliders.lnQX[4],y: curSliders.lnQY[4],z: curSliders.lnQZ[4]} );

	const lnQ1 = new lnQuat( 0, curSliders.lnQX[0], curSliders.lnQY[0], curSliders.lnQZ[0] ).update();
	const lnQ2 = new lnQuat( 0, curSliders.lnQX[1], curSliders.lnQY[1], curSliders.lnQZ[1] ).update();
	const lnQ3 = new lnQuat( 0, curSliders.lnQX[2], curSliders.lnQY[2], curSliders.lnQZ[2] ).update();
	const lnQ4 = new lnQuat( 0, curSliders.lnQX[3], curSliders.lnQY[3], curSliders.lnQZ[3] ).update();
	const lnQ5 = new lnQuat( 0, curSliders.lnQX[4], curSliders.lnQY[4], curSliders.lnQZ[4] ).update();

	const t2 = new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.nL, lnQ1 );
	const t3 = new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2.nL, t2 );
	const t4 = new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3.nL, t3 );
	const t5 = new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4.nL, t4 );

	const t2_ = t2.add2( lnQ1 ).update();
	const t3_ = t2_.add2( t3 ).update();
	const t4_ = t3_.add2( t4 ).update();
	const t5_ = t4_.add2( t5 ).update();

	const r2_ = t2.sub2( lnQ1 );
	const r3_ = t3.sub2( t2 );
	const r4_ = t4.sub2( t3 );
	const r5_ = t5.sub2( t4 );

	const A1 = lnQ1.applyDel( arm );
	const A2 = (keepInertia===0?t2:t2_).applyDel( arm );
	const A3 = (keepInertia===0?t3:t3_).applyDel( arm );
	const A4 = (keepInertia===0?t4:t4_).applyDel( arm );
	const A5 = (keepInertia===0?t5:t5_).applyDel( arm );



	const t2_ts = new lnQuat( 0, lnQ2.x,lnQ2.y,lnQ2.z).update().freeSpin( lnQ1.nL, lnQ1, timeScale );
	const t3_ts = new lnQuat( 0, lnQ3.x,lnQ3.y,lnQ3.z).update().freeSpin( t2_ts.nL, t2_ts, timeScale );
	const t4_ts = new lnQuat( 0, lnQ4.x,lnQ4.y,lnQ4.z).update().freeSpin( t3_ts.nL, t3_ts, timeScale );
	const t5_ts = new lnQuat( 0, lnQ5.x,lnQ5.y,lnQ5.z).update().freeSpin( t4_ts.nL, t4_ts, timeScale );

	const t2__ts = t2_ts.add2( lnQ1 ).update();
	const t3__ts = t2__ts.add2( t3_ts ).update();
	const t4__ts = t3__ts.add2( t4_ts ).update();
	const t5__ts = t4__ts.add2( t5_ts ).update();

	const tmpR = { portion:null };
	const A1_ts = lnQ1.applyDel( arm, timeScale, null, 0, tmpR );
	const A1_R_ts = tmpR.portion;  tmpR.portion = null;
	const A2_ts = (keepInertia===0?t2_ts:t2__ts).applyDel( arm, timeScale, null, 0, tmpR );
	const A2_R_ts = tmpR.portion;  tmpR.portion = null;
	const A3_ts = (keepInertia===0?t3_ts:t3__ts).applyDel( arm, timeScale, null, 0, tmpR );
	const A3_R_ts = tmpR.portion;  tmpR.portion = null;
	const A4_ts = (keepInertia===0?t4_ts:t4__ts).applyDel( arm, timeScale, null, 0, tmpR );
	const A4_R_ts = tmpR.portion;  tmpR.portion = null;
	const A5_ts = (keepInertia===0?t5_ts:t5__ts).applyDel( arm, timeScale, null, 0, tmpR );
	const A5_R_ts = tmpR.portion;  tmpR.portion = null;

	
	//const R_ = [lnQ1,lnQ2,lnQ3,lnQ4,lnQ5];
	const Rm = [lnQ1,r2_,r3_,r4_,r5_];
	const R  = [lnQ1,t2,t3,t4,t5];
	const Rz = [lnQ1,t2_,t3_,t4_,t5_];
	const R_ts  = [lnQ1,t2_ts,t3_ts,t4_ts,t5_ts];
	const Rz_ts = [lnQ1,t2__ts,t3__ts,t4__ts,t5__ts];
	const A__ts = [A1_ts,A2_ts,A3_ts,A4_ts,A5_ts];
	const A_R_ts = [A1_R_ts,A2_R_ts,A3_R_ts,A4_R_ts,A5_R_ts];
	const A_ = [A1,A2,A3,A4,A5];
	const A = [{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];
	let prior = origin;
	for( var n = 0; n < 5; n++ ) {
		const ox = n?A_[n-1].x:0;
		const oy = n?A_[n-1].y:0;
		const oz = n?A_[n-1].z:0;
		if( n ) {
			A[n].x = A[n-1].x
			A[n].y = A[n-1].y
			A[n].z = A[n-1].z
		}
		if( (n+1) < 5 ) {
			A_[n+1].x += A_[n].x;
			A_[n+1].y += A_[n].y;
			A_[n+1].z += A_[n].z;

			A__ts[n+1].x += A__ts[n].x;
			A__ts[n+1].y += A__ts[n].y;
			A__ts[n+1].z += A__ts[n].z;
		}
                var s;
		var scalar = 100;
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
			const to = (keepInertia===0?R[n]:Rz[n]);

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
			
			
		} else if( bisectAnalog ) {
			const pointList = [];
			function doLevel( n, P, Q, mn, mx ) {
				if( n > 6 ) return;
				let x = (mx+mn)/2;
				const mid = P.slerp( Q, 0.5 );

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
			tmpShortArm.z = 2/(timeScale*pointList.length);
			for( s = 0; s < pointList.length; s++ ) {
				const point = pointList[s]
				prior = point.applyDel( tmpShortArm, 1.0 );
				draw( point )
			}
			
			
		} else {
			for( s = 0; s <= 100; s++ ) {
				// start from either the end of the previous
				//           or from the end of the sum of the previous
				//   add either relative rotation itself (to the end of rotations)
				//   or add the translated rotation (to the end of the sum of rotations)
				const from = n?((keepInertia===0?R:Rz)[n-1]):lnQ0;
				const delta = (keepInertia===0?Rm[n]:R[n]);
				const result = { portion : null };

				prior = delta.applyDel( shortArm, s*timeScale/100.0, from, 1, result );
			
				draw( result.portion );
			}
		}

		function draw(q)
		{
			if( ( s % 3 ) === 0 )  {
				doDrawBasis( q, A[n], 1, 1 );
			}

			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			A[n].x += prior.x;
			A[n].y += prior.y;
			A[n].z += prior.z;

			normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
			pushN( n, 0.5 );
		}
		
		

		normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
		A[n].x += prior.x*scalar;
		A[n].y += prior.y*scalar;
		A[n].z += prior.z*scalar;
		normalVertices.push( new THREE.Vector3( (A[n].x)*spaceScale   ,( A[n].y)*spaceScale      , (A[n].z)*spaceScale  ))
		pushN(n);

		if( n > 0 ){
			doDrawBasis( keepInertia==0?R[n]:Rz[n], A_[n-1], 1, 1 );
			doDrawBasis( A_R_ts[n], A__ts[n-1], 1, 1 );
		}
			// 
		//doDrawBasis( keepInertia==0?R[n]:Rz[n], {x:ox,y:oy,z:oz}, 1, 1 );

		//doDrawBasis( R[n], { x:R[n].nx*R[n].nL, y:R[n].ny*R[n].nL, z:R[n].nz*R[n].nL}, 1, 1 );

		
		normalVertices.push( new THREE.Vector3( (ox)*spaceScale   ,( oy)*spaceScale      , (oz)*spaceScale  ))
		normalVertices.push( new THREE.Vector3( (A_[n].x)*spaceScale   ,( A_[n].y)*spaceScale      , (A_[n].z)*spaceScale  ))
	
		pushN(n);


		normalVertices.push( new THREE.Vector3( (n?A__ts[n-1].x:0)*spaceScale   ,( n?A__ts[n-1].y:0)*spaceScale      , (n?A__ts[n-1].z:0)*spaceScale  ))
		normalVertices.push( new THREE.Vector3( (A__ts[n].x)*spaceScale   ,( A__ts[n].y)*spaceScale      , (A__ts[n].z)*spaceScale  ))
	
		pushN(n);

	}
	
	return;
}

function drawSquare( n, q ) {
	const one = (1 - n*0.02) *4;
	const p1 = q.apply( {x:one,y:one,z:0 } );
	const p2 = q.apply( {x:one,y:-one,z:0 } );
	const p3 = q.apply( {x:-one,y:one,z:0 } );
	const p4 = q.apply( {x:-one,y:-one,z:0 } );

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

function drawCoordinateGrid() {
	if( showCoordinateGrid || showInvCoordinateGrid || showRawCoordinateGrid ) {
		const range = (2 ) * Math.PI;
		const minRange = (0) * Math.PI;
		drawRange( 0,0,0, range, 20, minRange, showRawCoordinateGrid, showInvCoordinateGrid );
	}
return;
}
	// graph of location to rotation... 
	function drawRange( cx,cy,cz,range,steps, minr, unscaled, invert ) {
		
		if( !minr ) minr = 0;
		const normLen = 0.2*(steps/range);
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
				const ox = 2*(unscaled?lnQ.x:(invert?lnQ.x*lnQ.nR/lnQ.nL/2:lnQ.nL*lnQ.nx));
				const oy = 2*(unscaled?lnQ.y:(invert?lnQ.y*lnQ.nR/lnQ.nL/2:lnQ.nL*lnQ.ny));
				const oz = 2*(unscaled?lnQ.z:(invert?lnQ.z*lnQ.nR/lnQ.nL/2:lnQ.nL*lnQ.nz));
	        
		
				normalVertices.push( new THREE.Vector3( ox*spaceScale                             ,oy*spaceScale                             , oz*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox*spaceScale + basis.right.x*normal_del/normLen  ,oy*spaceScale + basis.right.y*normal_del /normLen , oz*spaceScale + basis.right.z*normal_del/normLen ))
				                                                                                                                                
				normalVertices.push( new THREE.Vector3( ox*spaceScale                             ,oy*spaceScale                             , oz*spaceScale ))
				normalVertices.push( new THREE.Vector3( ox*spaceScale + basis.up.x*normal_del/normLen     ,oy*spaceScale + basis.up.y*normal_del/normLen     , oz*spaceScale + basis.up.z*normal_del/normLen ))
				                                                                                                                                
				normalVertices.push( new THREE.Vector3( ox*spaceScale                             ,oy*spaceScale                             , oz*spaceScale ))
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
		if( !colorS ) colorS = s;
		const l = 1;//(t instanceof lnQuat)?1/t.nR:1;
		normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale                               ,(t.y/l)*spaceScale                               , (t.z/l)*spaceScale                               ))
		normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale + basis.right.x*normal_del*s  ,(t.y/l)*spaceScale + basis.right.y*normal_del*s  , (t.z/l)*spaceScale + basis.right.z*normal_del*s  ))
		                                                                                                                                                   
		normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale                               ,(t.y/l)*spaceScale                               , (t.z/l)*spaceScale                               ))
		normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale + basis.up.x*normal_del*s     ,(t.y/l)*spaceScale + basis.up.y*normal_del *s    , (t.z/l)*spaceScale + basis.up.z*normal_del*s     ))
		                                                                                                                                                   
		normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale                               ,(t.y/l)*spaceScale                               , (t.z/l)*spaceScale                                ))
		normalVertices.push( new THREE.Vector3( (t.x/l)*spaceScale + basis.forward.x*normal_del*s,(t.y/l)*spaceScale + basis.forward.y*normal_del*s, (t.z/l)*spaceScale + basis.forward.z*normal_del*s ))

		{
			normalColors.push( new THREE.Color( 1.0*colorS,0,0,255 ))
			normalColors.push( new THREE.Color( 1.0*colorS,0,0,255 ))
			normalColors.push( new THREE.Color( 0,1.0*colorS,0,255 ))
			normalColors.push( new THREE.Color( 0,1.0*colorS,0,255 ))
			normalColors.push( new THREE.Color( 0,0,1.0*colorS,255 ))
			normalColors.push( new THREE.Color( 0,0,1.0*colorS,255 ))
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
			if( showScaledPoints ) {
				const r = Math.sqrt(x*x+y*y+z*z);
				const l = Math.abs(x)+Math.abs(y)+Math.abs(z);
				x *= l / r;
				y *= l / r;
				z *= l / r;
			}

		//console.log( "Draw point:", x, y, z );
		normalVertices.push( new THREE.Vector3( (x)*2*spaceScale                               ,(y)*2*spaceScale                               , (z)*2*spaceScale                               ))
		normalVertices.push( new THREE.Vector3( (x)*2*spaceScale + basis.right.x*normal_del*s  ,(y)*2*spaceScale + basis.right.y*normal_del*s  , (z)*2*spaceScale + basis.right.z*normal_del*s  ))
		                                                                                                                                               
		normalVertices.push( new THREE.Vector3( (x)*2*spaceScale                               ,(y)*2*spaceScale                               , (z)*2*spaceScale                               ))
		normalVertices.push( new THREE.Vector3( (x)*2*spaceScale + basis.up.x*normal_del*s     ,(y)*2*spaceScale + basis.up.y*normal_del *s    , (z)*2*spaceScale + basis.up.z*normal_del*s     ))
		                                                                                                                                               
		normalVertices.push( new THREE.Vector3( (x)*2*spaceScale                               ,(y)*2*spaceScale                               , (z)*2*spaceScale                                ))
		normalVertices.push( new THREE.Vector3( (x)*2*spaceScale + basis.forward.x*normal_del*s,(y)*2*spaceScale + basis.forward.y*normal_del*s, (z)*2*spaceScale + basis.forward.z*normal_del*s ))


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
				let norm ;
				const lnQ = new lnQuat( norm={x:x*(1-Math.abs(h)), y:h, z:z*(1-Math.abs(h)) } );
				//lnQ.twist( twistDelta );
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

function DrawQuatPaths(normalVertices_,normalColors_) {
	normalVertices = normalVertices_
	normalColors = normalColors_
        let curSliders = {
	};
	curSliders.lnQX = [];
	curSliders.lnQY = [];
	curSliders.lnQZ = [];
	let scalar = document.getElementById( "largeRange")?.checked;
	for( var n = 1; n <= 5; n++ ) {
		let lnQX = Number(document.getElementById( "lnQX"+n ).value);
		let lnQY = Number(document.getElementById( "lnQY"+n ).value);
		let lnQZ = Number(document.getElementById( "lnQZ"+n ).value);
		curSliders.lnQX[n-1] = (lnQX / 500 - 1) * Math.PI * (scalar?6:1);
		curSliders.lnQY[n-1] = (lnQY / 500 - 1) * Math.PI * (scalar?6:1);
		curSliders.lnQZ[n-1] = (lnQZ / 500 - 1) * Math.PI * (scalar?6:1);

		document.getElementById( "lnQXval"+n).textContent = (curSliders.lnQX[n-1]*180/Math.PI).toFixed(4);
		document.getElementById( "lnQYval"+n).textContent = (curSliders.lnQY[n-1]*180/Math.PI).toFixed(4);
		document.getElementById( "lnQZval"+n).textContent = (curSliders.lnQZ[n-1]*180/Math.PI).toFixed(4);

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


	if( document.getElementById( "showScaled" )?.checked ) {
		showScaledPoints = true;
	}else 			
		showScaledPoints = false;


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

	drawCoordinateGrid();
	drawDigitalTimeArm( curSliders, slerp );

	drawAnalogArm( curSliders, slerp ); 

	//drawArm( curSliders, normalVertices, normalColors, false );
	//drawArm( curSliders, normalVertices, normalColors, true );
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