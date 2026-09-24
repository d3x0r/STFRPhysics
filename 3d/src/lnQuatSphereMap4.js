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
			
				let ang = Math.acos( cosCo2 )*2;
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
		q.θ += (currentOctave )* Math.PI*2;// + oct*Math.PI*4)
					q.x  = q.nx*q.θ;
					q.y  = q.ny*q.θ;
					q.z  = q.nz*q.θ;
		//console.log( "Roll starts   :", q.getRoll() );

if(0) {
		let rl;
		while( Math.abs(rl=q.getRoll()) > 0.001 ) 
		{
			q.freeSpin( q.getRoll(), {x:0,y:0,z:1} );
				break;
			//console.log( "Roll after fix:", q.getRoll() );
		}
}
//		q.roll( -q.getRoll() );

		return q;
	}


	// ------------------------------------------------------------------
	//  Textured surface over the same (r,gamma) grid drawGrid() walks.
	//
	//  The drawn point is the raw rotation vector (x,y,z) - the same thing
	//  doDrawBasis() plants its triads on when 'Show Normal Projection' is
	//  off; not the projected 'up'.
	//
	//  pMake() is the quaternion product O*B: B is r about the horizontal
	//  axis (cos g, 0, sin g), applied first, then the orientation O.  As
	//  (r,g) walks the disk B sweeps the great sphere in span{1,i,k} once,
	//  r/2 colatitude and g longitude, and O*B is that sphere moved so its
	//  pole sits on O.  So the texture is the equirectangular map of THAT
	//  sphere, north pole on O and south pole on -O, and in the patch's own
	//  parameters it is exact and trivial:
	//      colatitude = r/2      (the log map's factor of 2: theta = 2*colat)
	//      longitude  = g
	//  v = r/2pi and u = g/2pi straight from the loop variables.  Nothing is
	//  derived from the R3 point: R3 distance from O is only r along the z
	//  meridian, elsewhere the constant-r curves are ovals, not circles.  For
	//  the default orientation (pi about z) that puts the poles at (0,0,+-pi)
	//  with the equator, r=pi, on the y axis line between them.  Over
	//  r in [0,2pi] the sphere is covered exactly once; there is no second
	//  cover to mirror back.
	//
	//  Each hemisphere is walked from its own pole: r in [0,pi] about O for
	//  the north, and about -O for the south.  O*B(2pi-r',g) = (-O)*B(r',g+pi)
	//  so the south rows land on the same sphere with the same triangle
	//  quality as the north, instead of a ring of slivers converging on -O
	//  from the far side.
	//
	//  The one tear no chart avoids: the equator point at g=pi/2 is the
	//  quaternion -1, which the log map spreads around the whole rim R=2pi.
	//  The quad straddling it spans the disk; it is culled by R3 edge length.
	// ------------------------------------------------------------------
	let surfaceGeometry = null;
	let surfaceLongSteps = 96;

	// Built as a real BufferGeometry: the legacy THREE.Geometry ->
	// BufferGeometry conversion in r119 drops the v component of
	// faceVertexUvs, which renders the whole sheet at v=0.
	function buildSurface( curSliders ) {
		const lnQ = new lnQuat();
		// Scale must match where doDrawBasis actually plants the points: its
		// final block uses pointScalar*spaceScale (both module-level), NOT
		// bare spaceScale - pointScalar is 12/pi on the fineRange path, so
		// using spaceScale alone puts the surface ~3.8x too small.
		const NG = surfaceLongSteps;               // longitude divisions, closed
		const NR = Math.max( 8, gridStepCount );   // latitude divisions per hemisphere
		const cols = NG+1, rows = NR+1;
		const twoPi = Math.PI*2;
		const s = pointScalar * spaceScale;

		lnQuat.setTwistDelta( 0 );
		lnQx.set( {lat:curSliders.lnQX[0],lng:curSliders.lnQY[0]}, false ).yaw(twistDelta);

		// -O: the same rotation on the other sheet of the double cover;
		// 2pi-theta about the opposite axis.  pMake only reads theta and n.
		const lnQxNeg = new lnQuat();
		lnQxNeg.θ  = twoPi - lnQx.θ;
		lnQxNeg.nx = -lnQx.nx; lnQxNeg.ny = -lnQx.ny; lnQxNeg.nz = -lnQx.nz;
		lnQxNeg.x  = lnQxNeg.nx*lnQxNeg.θ; lnQxNeg.y = lnQxNeg.ny*lnQxNeg.θ; lnQxNeg.z = lnQxNeg.nz*lnQxNeg.θ;
		lnQxNeg.dirty = false;

		// The disk's own frame.  O's rotation vector theta*a lies in the disk, and
		// the disk normal is y rotated by HALF the orientation angle about a
		// (verified numerically for every twist-free orientation).  Seen from
		// +m longitude runs clockwise, so the un-mirrored front is -m.
		//   X = -a  (pole axis, north pole at -X)   Z = -m  (front)   Y = Z x X
		// X is -a rather than a so that at lat=pi local Y is world +y: then
		// lookAt (which keeps local Y upright) agrees with the true placement
		// when the camera is straight in front, instead of rolling it 180.
		// Positions are stored in this frame; render() either puts the frame
		// back (true R3 placement) or turns Z to the camera.
		const a = lnQx.θ > 1e-6 ? new THREE.Vector3( lnQx.nx, lnQx.ny, lnQx.nz ) : new THREE.Vector3( 0, 0, 1 );
		const n = new THREE.Vector3( 0, 1, 0 ).applyQuaternion( new THREE.Quaternion().setFromAxisAngle( a, lnQx.θ/2 ) ).negate();
		const e2 = new THREE.Vector3().crossVectors( a, n );
		const frame = new THREE.Quaternion().setFromRotationMatrix( new THREE.Matrix4().makeBasis( a.clone().negate(), e2, n ) );
		let spread = 0;

		// Size: how far from O the patch reaches, capped at the whole sphere.
		// Under pi it is a polar cap about O; past pi the south cap fills in
		// from -O.  The pole stays pinned at r=2pi whatever the size.
		const fullRange = Math.min( deg2rad( curSliders.lnQZ[0] ), twoPi );
		const hemis = [ { o:lnQx, rMin:0, rMax:Math.min( fullRange, Math.PI ), south:false } ];
		if( fullRange > Math.PI )
			hemis.push( { o:lnQxNeg, rMin:twoPi - fullRange, rMax:Math.PI, south:true } );

		const fp = [], fu = [];
		let culled = 0;

		// A twist-free orientation (no y component in O) keeps the image
		// sphere through +1, so its rotation vectors are the FLAT disk of
		// radius 2pi in this frame.  Mesh that disk directly - a regular
		// polar grid about the origin - and get the texture coordinates by
		// inverting: a disk point is the quaternion Q = exp(R/2 * p^), and
		// B = O^-1 * Q is back on the input sphere, where r = 2 acos(B.w)
		// and gamma = atan2(B.z, B.x)  (B.y is 0 to rounding; the round
		// trip through pMake is exact to 1e-14).  Walking (r,gamma) instead
		// is singular at the equator point gamma = pi/2, which is -1 and is
		// spread around the whole rim: the closer a row gets to the equator
		// the narrower the gamma window in which it whips around the rim, so
		// no grid in the domain resolves it - that was the jagged, flickering
		// outer band.  Here the rim is just the last ring, and the singular
		// point of the map is a texture matter (one texel stretched round it).
		const flat = lnQx.θ < 1e-6 || Math.abs( lnQx.ny ) < 1e-6;
		if( flat ) {
			const NRd = 2*NR;                      // rings, 0..2pi
			const rowsD = NRd+1;
			const pos2 = new Float32Array( rowsD*cols*2 );   // local x,y; z is 0
			const uvs  = new Float32Array( rowsD*cols*2 );
			const rr   = new Float32Array( rowsD*cols );     // r of each vertex, for the Size cull
			// conj(O): a is the axis of O (defaulted when theta ~ 0, where Os ~ 0 anyway)
			const Ow = Math.cos( lnQx.θ/2 ), Os = Math.sin( lnQx.θ/2 );
			const Ocx = -Os*a.x, Ocy = -Os*a.y, Ocz = -Os*a.z;
			for( let ri = 0; ri < rowsD; ri++ ) {
				const R = (ri/NRd) * twoPi;
				for( let gi = 0; gi < cols; gi++ ) {
					const phi = (gi/NG) * twoPi;
					const xl = R*Math.cos(phi), yl = R*Math.sin(phi);
					// world rotation vector: local X is -a, local Y is e2
					const px = -a.x*xl + e2.x*yl, py = -a.y*xl + e2.y*yl, pz = -a.z*xl + e2.z*yl;
					let qw = 1, qx = 0, qy = 0, qz = 0;
					if( R > 1e-9 ) { const k = Math.sin(R/2)/R; qw = Math.cos(R/2); qx = px*k; qy = py*k; qz = pz*k; }
					// B = conj(O) * Q
					const Bw = Ow*qw - Ocx*qx - Ocy*qy - Ocz*qz;
					const Bx = Ow*qx + Ocx*qw + Ocy*qz - Ocz*qy;
					const Bz = Ow*qz + Ocx*qy - Ocy*qx + Ocz*qw;
					const r = 2*Math.acos( Math.max( -1, Math.min( 1, Bw ) ) );
					const gamma = Math.atan2( Bz, Bx );
					// the same 2-norm/1-norm rescale doDrawBasis applies; it is radial
					let f = 1;
					if( !showScaledPoints ) { const n1 = Math.abs(px)+Math.abs(py)+Math.abs(pz); if( n1 > 0 ) f = R/n1; }
					const vi = ri*cols + gi;
					pos2[vi*2] = xl*f; pos2[vi*2+1] = yl*f;
					uvs[vi*2] = gamma/twoPi; uvs[vi*2+1] = r/twoPi;
					rr[vi] = r;
				}
			}
			const emitD = ( ia, ib, ic ) => {
				const idx = [ia,ib,ic];
				// Size: drop a triangle wholly beyond the patch (r > fullRange)
				if( rr[ia] > fullRange && rr[ib] > fullRange && rr[ic] > fullRange ) { culled++; return; }
				// keep u on one side of the seam; a vertex on a pole (v ~ 0 or 1)
				// has no longitude of its own and takes the mean of the others
				const u = [ uvs[ia*2], uvs[ib*2], uvs[ic*2] ];
				const v = [ uvs[ia*2+1], uvs[ib*2+1], uvs[ic*2+1] ];
				const pole = v.map( x => x < 1e-4 || x > 1-1e-4 );
				let ref = pole.indexOf( false ); if( ref < 0 ) ref = 0;
				for( let k = 0; k < 3; k++ ) { while( u[k]-u[ref] >  0.5 ) u[k] -= 1; while( u[k]-u[ref] < -0.5 ) u[k] += 1; }
				for( let k = 0; k < 3; k++ ) if( pole[k] ) { const o1 = u[(k+1)%3], o2 = u[(k+2)%3]; u[k] = (o1+o2)/2; }
				for( let k = 0; k < 3; k++ ) {
					const j = idx[k];
					fp.push( pos2[j*2]*s, pos2[j*2+1]*s, 0 );
					fu.push( u[k], v[k] );
				}
			};
			for( let ri = 0; ri < NRd; ri++ )
				for( let gi = 0; gi < NG; gi++ ) {
					const ia =  ri   *cols + gi, ib = ia+1;
					const ic = (ri+1)*cols + gi, id = ic+1;
					emitD( ia, ic, ib );
					emitD( ib, ic, id );
				}
		} else {
			// Twisted orientation: the image is curved, so walk the domain
			// (r,gamma) as before, each hemisphere from its own pole, and
			// cull the tear at the rim by edge length.
			const positions = new Float32Array( rows*cols*3 );
			const uvs       = new Float32Array( rows*cols*2 );
			const maxEdge = Math.PI;   // grid edges are well under 1 in rotation units; the tear is ~4pi

			const emit = ( a, b, c ) => {
				const idx = [a,b,c];
				for( let k = 0; k < 3; k++ ) {
					const j = idx[k], l = idx[(k+1)%3];
					const dx = positions[j*3]-positions[l*3], dy = positions[j*3+1]-positions[l*3+1], dz = positions[j*3+2]-positions[l*3+2];
					if( dx*dx+dy*dy+dz*dz > maxEdge*maxEdge ) { culled++; return; }
				}
				for( let k = 0; k < 3; k++ ) {
					const j = idx[k];
					fp.push( positions[j*3]*s, positions[j*3+1]*s, positions[j*3+2]*s );
					fu.push( uvs[j*2], uvs[j*2+1] );
				}
			};

			for( const h of hemis ) {
				for( let ri = 0; ri < rows; ri++ ) {
					const r = h.rMin + (ri/NR) * (h.rMax - h.rMin);
					for( let gi = 0; gi < cols; gi++ ) {
						const gamma = (gi/NG) * twoPi;
						// same decomposition drawGrid uses
						pMake( lnQ, r*Math.cos(gamma), r*Math.sin(gamma), h.o, gamma, r );

						let px = lnQ.nx*lnQ.θ, py = lnQ.ny*lnQ.θ, pz = lnQ.nz*lnQ.θ;
						if( !showScaledPoints ) {
							// the same 2-norm/1-norm rescale doDrawBasis applies
							const n2 = Math.sqrt( px*px + py*py + pz*pz );
							const n1 = Math.abs(px) + Math.abs(py) + Math.abs(pz);
							if( n1 > 0 ) { px *= n2/n1; py *= n2/n1; pz *= n2/n1; }
						}
						const vi = ri*cols + gi;
						const pn = px*n.x + py*n.y + pz*n.z;
						positions[vi*3  ] = -(px*a.x + py*a.y + pz*a.z);
						positions[vi*3+1] = px*e2.x + py*e2.y + pz*e2.z;
						positions[vi*3+2] = pn;
						if( Math.abs( pn ) > spread ) spread = Math.abs( pn );
						// south rows are north rows at (2pi-r, g+pi)
						uvs[vi*2  ] = h.south ? gamma/twoPi - 0.5 : gamma/twoPi;
						uvs[vi*2+1] = h.south ? 1 - r/twoPi       : r/twoPi;
					}
				}
				for( let ri = 0; ri < NR; ri++ )
					for( let gi = 0; gi < NG; gi++ ) {
						const a =  ri   *cols + gi, b = a+1;
						const c = (ri+1)*cols + gi, d = c+1;
						emit( a, c, b );
						emit( b, c, d );
					}
			}

		}

		const geo = new THREE.BufferGeometry();
		geo.setAttribute( "position", new THREE.BufferAttribute( new Float32Array( fp ), 3 ) );
		geo.setAttribute( "uv",       new THREE.BufferAttribute( new Float32Array( fu ), 2 ) );
		geo.computeVertexNormals();
		geo.userData.frame       = frame;          // local -> world
		geo.userData.sheetSpread = spread / Math.PI; // ~0 when flat (no twist); Face Camera only then
		geo.userData.center      = new THREE.Vector3( 0, 0, 0 );
		geo.userData.culledTris  = culled;
		return geo;
	}
	window.BuildQuatSurface = function() { return surfaceGeometry; }

	// Rebuild ONLY the textured surface, re-reading the orientation sliders.
	// Spin Long uses this so it doesn't redo DrawQuatPaths (~77k line vertices
	// for the triad cloud) every frame just to move the longitude.
	// pointScalar / gridStepCount / showScaledPoints are left at whatever the
	// last full pass set - none of them change while only longitude moves.
	window.RebuildQuatSurface = function() {
		const nX = Number( document.getElementById( "lnQX1" ).value );
		const nY = Number( document.getElementById( "lnQY1" ).value );
		const nZ = Number( document.getElementById( "lnQZ1" ).value );
		const td = Number( document.getElementById( "twistDelta" ).value );

		twistDelta = twist = ( (td/500)-1 ) * Math.PI * 4.25;
		lnQuat.setTwistDelta( twistDelta );
		currentOctave = Number( document.getElementById( "octave" ).value );

		curSliders.lnQX[0] = (nX/500 - 1) * 4.25*Math.PI;
		curSliders.lnQY[0] = (nY/500 - 1) * 4.25*Math.PI;
		curSliders.lnQZ[0] = 2*( (nZ/500) * 180 + 10 );

		document.getElementById( "lnQXval1" ).textContent = (curSliders.lnQX[0]/Math.PI).toFixed(4) + "π";
		document.getElementById( "lnQYval1" ).textContent = (curSliders.lnQY[0]/Math.PI).toFixed(4) + "π";
		document.getElementById( "lnQZval1" ).textContent = (curSliders.lnQZ[0]).toFixed(4);
		document.getElementById( "twistDeltaValue" ).textContent = (twistDelta/Math.PI).toFixed(4) + "π";

		surfaceGeometry = document.getElementById( "showTexture" )?.checked
			? buildSurface( curSliders )
			: null;
		return surfaceGeometry;
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

//	tmpPoint.x = lnQ.getPitch() * 2 * spaceScale;
//	tmpPoint.y = lnQ.getYaw() * 2 * spaceScale;
//	tmpPoint.z = lnQ.getRoll() * 2 * spaceScale;

	//	tmpPoint.z = lnQ.getRoll()*2*spaceScale;

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

		// drawGrid() has just refreshed mapPolar/weylGroup/range etc. from the
		// DOM, so the surface is built against the same state.
		surfaceGeometry = document.getElementById( "showTexture" )?.checked
			? buildSurface( curSliders )
			: null;
		
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

