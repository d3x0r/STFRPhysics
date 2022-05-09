import {Quat} from "./Quat.js"
import {lnQuat,slerp} from "./lnQuatSq.js"
let pointScalar = 1*12/ Math.PI;
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
let normalizeTangents = false;
let applyAccel = document.getElementById( "applyAccel" )?.checked;
let showSliderCurves = false;

let drawWorldAxles = false;
let mountOrder = 0;
let currentOctave = 0;

let lnQx = new lnQuat();
let lnQx2 = new lnQuat();
let range = Math.PI;

let showRaw = true;  // just raw x/y/z at x/y/z
let shownRnL = true;  // p * θ / nR
let shownL = true;  //  p / nL
let shownR = true;  // p.n(xyz)  p / nR
const lnQ0 = new lnQuat();

let lnQ1 = new lnQuat();
let lnQ2 = new lnQuat();
let lnQ3 = new lnQuat();
let lnQ4 = new lnQuat();
let lnQ5 = new lnQuat();

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

	

	function deg2rad(n) { return n * Math.PI/180 }

	let twist = 0;
	const bP = new lnQuat();
	const xAxis = {x:1, y:0, z:0};
	const zAxis = {x:0, y:0, z:1};
	let useSub = false;
	let subIterations = 10;
	function pMake(q, x, y, o ){
		
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
		return q;
	}


	const tmpPoint = { x:0, y:0, z:0 };
	function drawGrid(normalVertices,normalColors, curSliders) {
		return;
	}




	// graph of location to rotation... 

	function doDrawBasis(lnQ2,t,s,Del	 ) {
		const zz = s===0;
		const basis = lnQ2.update().getBasisT( Del, 1 );
		const normal_del = 3;
		if( !s ) s = 1.0;
		s = s/Math.PI;
		const colorS = s || 1;
		const l = 1;//(t instanceof lnQuat)?1/t.θ:1;
		if( t != lnQ2  )  {
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

		//if( zz )
		{

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
if(is) is.onfocus = ((is,n)=>()=>focusSlider( is, "Z", n ))(is,n);


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


			normalVertices.push( new THREE.Vector3( 0			       ,0			       , 0			       ))
			normalVertices.push( new THREE.Vector3( 40  ,0, 0 ) );
																				       
			normalVertices.push( new THREE.Vector3( 0			       ,0			       , 0			       ))
			normalVertices.push( new THREE.Vector3( 0, 40,  0 ) );
																				       
			normalVertices.push( new THREE.Vector3( 0			       ,0			       , 0			       ))
			normalVertices.push( new THREE.Vector3( 0, 0, 40 ) );
		   
			{
				//const s = t / (Math.PI*4);
				const s = 1.0;
				normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
				normalColors.push( new THREE.Color( 1.0*s,0,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 0,1.0*s,0,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
				normalColors.push( new THREE.Color( 0,0,1.0*s,255 ))
			}

        
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

//	if( scalar2 && !scalar ) pointScalar = (12/ Math.PI);
//	if( !scalar2 && !scalar ) pointScalar = (3/ Math.PI);
//	if( scalar2 && scalar ) pointScalar = (2/ Math.PI);
//	if( !scalar2 && scalar ) pointScalar = ( Math.PI/2);


	let axis = document.getElementById( "showAxis")?.checked;
	let degrees = document.getElementById( "showDegrees")?.checked;

	{
			//let td = Number(document.getElementById( "twistDelta" ).value);
		
		 twistDelta =twist= 0;//( (td/500)-1 ) * Math.PI * 4.25;
		//document.getElementById( "twistDeltaValue" ).textContent = (twistDelta/Math.PI).toFixed(4)+ "π";

		lnQuat.setTwistDelta( twistDelta );
		currentOctave = 0;//Number(document.getElementById( "octave" ).value);

		for( var n = 1; n <= 5; n++ ) {
			let lnQX = Number(document.getElementById( "lnQX"+n ).value);
			let lnQY = Number(document.getElementById( "lnQY"+n ).value);
			let lnQZ = Number(document.getElementById( "lnQZ"+n ).value);

			curSliders.lnQX[n-1] = (lnQX / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			curSliders.lnQY[n-1] = (lnQY / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			curSliders.lnQZ[n-1] = (lnQZ / 500 - 1) * Math.PI * (scalar?6:1)*(scalar2?0.25:1);
			

		       	switch(n) {
			case 1:
				curSliders.lnQZ[n-1] = curSliders.lnQZ[n-1] * 4;
				break;
			case 2:
				break;
			case 3:
				break;
			case 4:
				break;
			case 5:
				curSliders.lnQZ[n-1] = curSliders.lnQZ[n-1] * 36;
				break;
			}
		


				document.getElementById( "lnQXval"+n).textContent = ( curSliders.lnQX[n-1]*4/Math.PI).toFixed(4) + "π";
				document.getElementById( "lnQYval"+n).textContent = ( 4*curSliders.lnQY[n-1]/Math.PI).toFixed(4) + "π";
				document.getElementById( "lnQZval"+n).textContent = ( curSliders.lnQZ[n-1]/Math.PI).toFixed(4) + "π";


	        
			//document.getElementById( "lnQYEulerval"+n).textContent = (qlen*180/Math.PI).toFixed(4);
			
	        
		}


{	
	const k = curSliders.lnQZ[0]*4;
	const t = curSliders.lnQY[0]*4;	
	const lnQ0_ = new lnQuat();

	lnQ0.x = 0;
	lnQ0.y = t;
	lnQ0.z = 0;
	lnQ0.dirty = true;
	lnQ0.update();

	const l1 = curSliders.lnQX[0]*4;
	lnQ1.x = l1 * k/100;
	lnQ1.y = 0;//t;
	lnQ1.z = 0;//r0z * l1 * k/100;
	lnQuat.apply( lnQ0.θ, lnQ0, lnQ1, 1, lnQ1 );
	lnQ1.dirty = true;
	lnQ1.update();


		doDrawBasis( lnQ1,lnQ1, 0, 1 );
	
	const v = {x:0,y:30,z:0};

	for( let l = 0; l < 100; l++ ) {

		lnQ0_.spin( lnQ1.θ, lnQ1 ); // parallel transport version.
		const vt = lnQ0_.applyDel( v, 1 );
		//doDrawBasis( lnQ0, vt, 1, 1 );
		//doDrawBasis( lnQ0, lnQ0, 0, 1 );


		doDrawBasis( lnQ0_, vt, 0, 1 );
		//doDrawBasis( lnQ0_, lnQ0_, 0, 1 );


	}
	lnQ0.freeSpin( lnQ1.θ * 100, lnQ1 );

	for( let n = 1 ; n < 5; n++ ) {
		const l2 = curSliders.lnQX[n]*4;
		// take a big additional step.

	// lnQ0 is updated as we go along, taking short steps...
		lnQ0.yaw( curSliders.lnQY[n]*4 );

		lnQ2.x = l2 * k/100;
		lnQ2.y = 0;
		lnQ2.z = 0;
		lnQuat.apply( lnQ0.θ, lnQ0, lnQ2, 1, lnQ2 );
		lnQ2.dirty= true;
		lnQ2.update();
		
			doDrawBasis( lnQ2,lnQ2, 0, 1 );
		
		for( let l = 0; l < 100; l++ ) {

			lnQ0_.freeSpin( lnQ2.θ, lnQ2 );  // parallel transport version.
			const vt = lnQ0_.applyDel( v, 1 );
			doDrawBasis( lnQ0_, vt, 0, 1 );
		}
		lnQ0.freeSpin( lnQ2.θ *100, lnQ2 );
	}

}

{
	const k = curSliders.lnQZ[0]*4; // value displayed is *4
	const t = curSliders.lnQY[0]*4;	
	const lnQ0_ = new lnQuat();
	const v = {x:0,y:29,z:0};
	{
		const l5 = curSliders.lnQZ[4];
		lnQ0.set( 0,0,0,0).update();
		
		
		for( let seg =0; seg < 400; seg++ ) {

			//lnQ0.yaw( Math.PI*(1+Math.cos(k))/100 );
			lnQ0.yaw( l5/100 );
			//console.log( "lnQ0:", lnQ0.x, lnQ0.y, lnQ0.z );
			doDrawBasis( lnQ0, lnQ0, 0, 1 );

			lnQ2.x = k /100  ;
			lnQ2.y = 0;
			lnQ2.z = 0;
			lnQuat.apply( lnQ0.θ, lnQ0, lnQ2, 1, lnQ2 );
			lnQ2.dirty = true;
			lnQ2.update();	

		        for( let l = 0; l < 1; l++ ) {

				lnQ0.freeSpin( lnQ2.θ, lnQ2 );
				lnQ0_.freeSpin( lnQ2.θ, lnQ2 );
				//lnQ0_.freeSpin( lnQ2.θ, lnQ2 );
				const vt = lnQ0.applyDel( v, 1 );  // the up works fine too - dn't ned 0 for this.
				//doDrawBasis( lnQ0, vt, 1, 1 );
				//doDrawBasis( lnQ0, lnQ0, 0, 1 );
				doDrawBasis( lnQ0_, vt, 0, 1 );
				//doDrawBasis( lnQ0_, lnQ0_, 0, 1 );
			}

			lnQ2.x *= 100;
			lnQ2.y *= 100;
			lnQ2.z *= 100;
			//doDrawBasis( lnQ2, lnQ2, 0, 1 );

	// so building from the other side; 
	// curvature = 1, angle = 0 = 0
	// curvature = 0, angle = any = 0

	// angle = 0.02pi (2pi/100) pi/2 offset   but at curvature=1, is also nearly back to the start.
	//    0.4pi  pi offset  0.8734 curvature closes the loop.
        //0.6pi  = 3pi/2 offset   
	// 0.8pi = 2pi offset  and curvature 0 closes the loop.
        //     curvature 0.8671 ->  3/pi/2 offset
	//      curvature of 1.75 -> pi offset
	//	curvature of 3.14 -> almost back to pi/2 offset (after 3 loops of the curve)
		}

	}
}


        document.getElementById( "lnQXval1").textContent = ( curSliders.lnQX[0]/Math.PI).toFixed(4) + "π";
        document.getElementById( "lnQYval1").textContent = ( curSliders.lnQY[0]/Math.PI).toFixed(4) + "π";
        document.getElementById( "lnQZval1").textContent = ( curSliders.lnQZ[0]*4).toFixed(4) ;

		timeScale = 1;//3*(Number(document.getElementById( "timeScalar" )?.value ) / 450 -1);
		//document.getElementById( "timeScalarValue" ).textContent = timeScale.toFixed(4);
	        
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
			//drawRange( 0,0,0, range, 60, minRange, showRawCoordinateGrid, showInvCoordinateGrid );
		}
				
		// squares is calculated in analog arm.
	}

	return ( shapes )=>{ /* update function */ };


}

