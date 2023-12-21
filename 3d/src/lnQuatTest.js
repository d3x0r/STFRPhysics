import { lnQuat } from "./lnQuatSq.js"

let A, B, C, D, E, T;  // slider values
let showCoordinateGrid = false;
let drawNormalBall = false;
let drawDropLines = false;

function QuatPathing2(unused_q, v, c, normalVertices, normalColors) {
	const spaceScale = 5;
	const normal_del = 1;
	const o = [0, 0, 0];//6/spaceScale,+6/spaceScale,+6/spaceScale];
	const baseX = (Number( lnBaseQX.value ) - 500 ) / 500 * Math.PI*2;
	lnBaseQXval.textContent = (baseX/Math.PI).toFixed(3) + "π";
	const baseY = (Number( lnBaseQY.value ) - 500 ) / 500 * Math.PI*2;
	lnBaseQYval.textContent = (baseY/Math.PI).toFixed(3) + "π";

	//const lnQ = new lnQuat( {a:2*Math.PI/3,b:2*Math.PI/3,c:2*Math.PI/3} );
	const baseQ = new lnQuat({ lat: baseX, lng: baseY});
	const target = new lnQuat({ lat: A, lng: B, c: C });
	let lnQ = baseQ.spin( target.θ, {x:target.nx, y:target.ny,z:target.nz} );
	//0.53118619792

	//	drawBasis( lnQ, 1.0 );
	//let qBasis;
	//lnQt = new lnQuat( qBasis = lnQ.getBasis() );

	//drawN(new lnQuat({ lat: baseX, lng: baseY}), false);
	drawBasis( baseQ, 1.0, false, 5, 0.1 );

	drawBasis(lnQ, 1.0, true, 0.5, 0.1);


	//lnQ.x /= 2;
	//lnQ.z /= 2;
	let lnQP = null;

	if (1) { // this ends up rotated 180 degrees.
		let lnQtmp = new lnQuat(lnQ);
		lnQtmp.twist(C);
		drawBasis(lnQtmp, 1.0, false);
	}


	function drawBasis(lnQ, T, doTwist, spaceScale, normal_del) {
		if (!spaceScale) spaceScale = 5;
		if (!normal_del) normal_del = 1;
		let new_v = lnQ.applyDel({ x: 0, y: 1, z: 0 }, 1.0);

		// draw path leading up to 1.0....
		let prior_v = null;

		for (var t = 0; t <= 1; t += 0.05) {
			const new_v = lnQ.applyDel(v, t);

			new_v.x += o[0]; new_v.y += o[1]; new_v.z += o[2];

			if (prior_v) {
				normalVertices.push(new THREE.Vector3(prior_v.x * spaceScale, prior_v.y * spaceScale, prior_v.z * spaceScale))
				normalVertices.push(new THREE.Vector3(new_v.x * spaceScale, new_v.y * spaceScale, new_v.z * spaceScale))
				normalColors.push(c)
				normalColors.push(c)
			}
			prior_v = new_v;

		};
		new_v.x += o[0]; new_v.y += o[1]; new_v.z += o[2];
		const basis = lnQ.getBasis();//{ up:lnQ.applyDel( {x:0,y:1,z:0} ),right:lnQ.applyDel( {x:1,y:0,z:0} ),forward:lnQ.applyDel( {x:0,y:0,z:1} )};


		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale, new_v.y * spaceScale, new_v.z * spaceScale))
		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale + basis.right.x * normal_del, new_v.y * spaceScale + basis.right.y * normal_del, new_v.z * spaceScale + basis.right.z * normal_del))

		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale, new_v.y * spaceScale, new_v.z * spaceScale))
		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale + basis.up.x * normal_del, new_v.y * spaceScale + basis.up.y * normal_del, new_v.z * spaceScale + basis.up.z * normal_del))

		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale, new_v.y * spaceScale, new_v.z * spaceScale))
		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale + basis.forward.x * normal_del, new_v.y * spaceScale + basis.forward.y * normal_del, new_v.z * spaceScale + basis.forward.z * normal_del))

		normalColors.push(new THREE.Color(255, 0, 0, 1))
		normalColors.push(new THREE.Color(255, 0, 0, 1))
		normalColors.push(new THREE.Color(0, 255, 0, 1))
		normalColors.push(new THREE.Color(0, 255, 0, 1))
		normalColors.push(new THREE.Color(0, 0, 255, 255))
		normalColors.push(new THREE.Color(0, 0, 255, 1))

		normalVertices.push(new THREE.Vector3((o[0] + 1 * 2 * Math.PI) * spaceScale, (o[1] + 0 * 2) * spaceScale, (o[2] + 0 * 2) * spaceScale))
		normalVertices.push(new THREE.Vector3((o[0] + 0 * 2 * Math.PI) * spaceScale, (o[1] + 0 * 2) * spaceScale, (o[2] + 0 * 2) * spaceScale))
		normalColors.push(new THREE.Color(0, 0, 0, 1))
		normalColors.push(new THREE.Color(1, 1, 1, 1))
		normalVertices.push(new THREE.Vector3((o[0] + 0 * 2) * spaceScale, (o[1] + 1 * 2 * Math.PI) * spaceScale, (o[2] + 0 * 2) * spaceScale))
		normalVertices.push(new THREE.Vector3((o[0] + 0 * 2) * spaceScale, (o[1] + 0 * 2 * Math.PI) * spaceScale, (o[2] + 0 * 2) * spaceScale))
		normalColors.push(new THREE.Color(0, 0, 0, 1))
		normalColors.push(new THREE.Color(1, 1, 1, 1))
		normalVertices.push(new THREE.Vector3((o[0] + 0 * 2) * spaceScale, (o[1] + 0 * 2) * spaceScale, (o[2] + 1 * 2 * Math.PI) * spaceScale))
		normalVertices.push(new THREE.Vector3((o[0] + 0 * 2) * spaceScale, (o[1] + 0 * 2) * spaceScale, (o[2] + 0 * 2 * Math.PI) * spaceScale))
		normalColors.push(new THREE.Color(0, 0, 0, 1))
		normalColors.push(new THREE.Color(1, 1, 1, 1))

		normalVertices.push(new THREE.Vector3((o[0] ) * spaceScale/10, (o[1] ) * spaceScale/10, (o[2]) * spaceScale/10))
		normalVertices.push(new THREE.Vector3((o[0] + lnQ.x) * spaceScale/10, (o[1] +lnQ.y) * spaceScale/10, (o[2] + lnQ.z) * spaceScale/10))
		normalColors.push(new THREE.Color(0, 1, 1, 1))
		normalColors.push(new THREE.Color(1, 1, 0, 1))
		

		if (doTwist) {
			for (let zz = 0; zz < 1; zz++) {
				const new_v_ = lnQ.applyDel({ x: 0, y: 1, z: 0 }, 0.5);
				let new_v = {
					x: lnQ.ny * new_v_.z - new_v_.y * lnQ.nz
					, y: lnQ.nz * new_v_.x - new_v_.z * lnQ.nx
					, z: lnQ.nx * new_v_.y - new_v_.x * lnQ.ny
				};
				const vRot = new_v;
				const lnv = Math.sqrt(new_v.x * new_v.x + new_v.y * new_v.y + new_v.z * new_v.z);
				new_v.x /= lnv;
				new_v.y /= lnv;
				new_v.z /= lnv;
				const q = lnQ;
				{
					let new_v_2 = {
						x: new_v_.y * new_v.z - new_v_.z * new_v.y
						, y: new_v_.z * new_v.x - new_v_.x * new_v.z
						, z: new_v_.x * new_v.y - new_v_.y * new_v.x
					};
					const lnv2 = Math.sqrt(new_v_2.x * new_v_2.x + new_v_2.y * new_v_2.y + new_v_2.z * new_v_2.z);
					new_v_2.x *= 1 / lnv2;
					new_v_2.y *= 1 / lnv2;
					new_v_2.z *= 1 / lnv2;
					// in the coordinate system of new_v_ (forward) new_v (axis of rotation/up) new_v_2 (right)
					// angle 0 = ( 1, 0, 0 )  angle 90 = ( 0, 0, 1 )
					const lnQr = new lnQuat({ forward: new_v_, right: new_v_2, up: new_v });

					const forward = new_v_;
					const right = new_v_2;


					normalVertices.push(new THREE.Vector3((o[0] + 0 * new_v.x * 2) * spaceScale, (o[1] + 0 * new_v.y * 2) * spaceScale, (o[2] + 0 * new_v.z * 2) * spaceScale))
					normalVertices.push(new THREE.Vector3((o[0] + new_v.x * 2) * spaceScale, (o[1] + new_v.y * 2) * spaceScale, (o[2] + new_v.z * 2) * spaceScale))

					normalColors.push(new THREE.Color(1, 0.25, 0.25, 1))
					normalColors.push(new THREE.Color(1, 0.25, 0.25, 1))
					new_v = new_v_;
					normalVertices.push(new THREE.Vector3((o[0] + 0 * new_v.x * 2) * spaceScale, (o[1] + 0 * new_v.y * 2) * spaceScale, (o[2] + 0 * new_v.z * 2) * spaceScale))
					normalVertices.push(new THREE.Vector3((o[0] + new_v.x * 2) * spaceScale, (o[1] + new_v.y * 2) * spaceScale, (o[2] + new_v.z * 2) * spaceScale))
					normalColors.push(new THREE.Color(0, 1, 0, 1))
					normalColors.push(new THREE.Color(0, 1, 0, 1))
					new_v = new_v_2;
					normalVertices.push(new THREE.Vector3((o[0] + 0 * new_v.x * 2) * spaceScale, (o[1] + 0 * new_v.y * 2) * spaceScale, (o[2] + 0 * new_v.z * 2) * spaceScale))
					normalVertices.push(new THREE.Vector3((o[0] + new_v.x * 2) * spaceScale, (o[1] + new_v.y * 2) * spaceScale, (o[2] + new_v.z * 2) * spaceScale))

					normalColors.push(new THREE.Color(0.75, 0, 0, 1))
					normalColors.push(new THREE.Color(0.75, 0, 0, 1))

					const basis = lnQ.getBasisT(1.0);
					new_v = basis.forward;
					normalVertices.push(new THREE.Vector3((o[0] + 0 * new_v.x * 2) * spaceScale, (o[1] + 0 * new_v.y * 2) * spaceScale, (o[2] + 0 * new_v.z * 2) * spaceScale))
					normalVertices.push(new THREE.Vector3((o[0] + new_v.x * 2) * spaceScale, (o[1] + new_v.y * 2) * spaceScale, (o[2] + new_v.z * 2) * spaceScale))
					normalColors.push(new THREE.Color(0, 0, 0.1, 1))
					normalColors.push(new THREE.Color(0, 0, 0.1, 1))
					new_v = basis.right;
					normalVertices.push(new THREE.Vector3((o[0] + 0 * new_v.x * 2) * spaceScale, (o[1] + 0 * new_v.y * 2) * spaceScale, (o[2] + 0 * new_v.z * 2) * spaceScale))
					normalVertices.push(new THREE.Vector3((o[0] + new_v.x * 2) * spaceScale, (o[1] + new_v.y * 2) * spaceScale, (o[2] + new_v.z * 2) * spaceScale))
					normalColors.push(new THREE.Color(0.1, 0, 0, 1))
					normalColors.push(new THREE.Color(0.1, 0, 0, 1))
					new_v = basis.up;
					normalVertices.push(new THREE.Vector3((o[0] + 0 * new_v.x * 2) * spaceScale, (o[1] + 0 * new_v.y * 2) * spaceScale, (o[2] + 0 * new_v.z * 2) * spaceScale))
					normalVertices.push(new THREE.Vector3((o[0] + new_v.x * 2) * spaceScale, (o[1] + new_v.y * 2) * spaceScale, (o[2] + new_v.z * 2) * spaceScale))
					normalColors.push(new THREE.Color(0, 0.1, 0, 1))
					normalColors.push(new THREE.Color(0, 0.1, 0, 1))

					const inv_rot = { x: -(basis.right.x + basis.forward.x + basis.up.x) / 3, y: -(basis.right.y + basis.forward.y + basis.up.y) / 3, z: -(basis.right.z + basis.forward.z + basis.up.z) / 3 };
					new_v = inv_rot;
					normalVertices.push(new THREE.Vector3((o[0] + 0 * new_v.x * 2) * spaceScale, (o[1] + 0 * new_v.y * 2) * spaceScale, (o[2] + 0 * new_v.z * 2) * spaceScale))
					normalVertices.push(new THREE.Vector3((o[0] + new_v.x * 2) * spaceScale, (o[1] + new_v.y * 2) * spaceScale, (o[2] + new_v.z * 2) * spaceScale))
					normalColors.push(new THREE.Color(0, 0.5, 0.5, 1))
					normalColors.push(new THREE.Color(0, 0.5, 0.5, 1))



				}

				const lnQTwist = new lnQuat(Math.PI / 2, {
					x: q.y * new_v.z - new_v.y * q.z
					, y: q.z * new_v.x - new_v.z * q.x
					, z: q.x * new_v.y - new_v.x * q.y
				});
				let lnQ2 = new lnQuat(lnQ);
				lnQ2.octave = (E | 0) || 1;
				//lnQ2.twist( -Math.PI ).update();
				let minL = 10;
				let maxL = -10;
				if (1)
					for (var t = -Math.PI / 2; t <= Math.PI / 2; t += 0.01 ) {
						//let lnQ2 = new lnQuat( {a:lnQ.x,b:lnQ.y,c:lnQ.z} );
						if (zz == 0)
							lnQ2.twist(0.1).update();
						else if (zz == 1)
							lnQ2.roll(0.1).update();
						else
							lnQ2.yaw(0.1).update();
						//lnQTwist.apply( lnQ2, 0.1 ).update();
						//twist_bad2( lnQ2, 0.1 ).update();
						// this shows the normalized path - easier to isolate twist axis....
						if (lnQ2.θ < minL) minL = lnQ2.θ;
						if (lnQ2.θ > maxL) maxL = lnQ2.θ;


						// console.log( "here?" );
						if (1) { // recti-linear scaled points ... 

							const basis = lnQ2.getBasis();
							normalVertices.push(new THREE.Vector3(((lnQ2.nx * lnQ2.θ)) * spaceScale, ((lnQ2.ny * lnQ2.θ)) * spaceScale, ((lnQ2.nz * lnQ2.θ)) * spaceScale))
							normalVertices.push(new THREE.Vector3(((lnQ2.nx * lnQ2.θ)) * spaceScale + basis.right.x * normal_del, ((lnQ2.ny * lnQ2.θ)) * spaceScale + basis.right.y * normal_del, ((lnQ2.nz * lnQ2.θ)) * spaceScale + basis.right.z * normal_del))

							normalVertices.push(new THREE.Vector3(((lnQ2.nx * lnQ2.θ)) * spaceScale, ((lnQ2.ny * lnQ2.θ)) * spaceScale, ((lnQ2.nz * lnQ2.θ)) * spaceScale))
							normalVertices.push(new THREE.Vector3(((lnQ2.nx * lnQ2.θ)) * spaceScale + basis.up.x * normal_del, ((lnQ2.ny * lnQ2.θ)) * spaceScale + basis.up.y * normal_del, ((lnQ2.nz * lnQ2.θ)) * spaceScale + basis.up.z * normal_del))

							normalVertices.push(new THREE.Vector3(((lnQ2.nx * lnQ2.θ)) * spaceScale, ((lnQ2.ny * lnQ2.θ)) * spaceScale, ((lnQ2.nz * lnQ2.θ)) * spaceScale))
							normalVertices.push(new THREE.Vector3(((lnQ2.nx * lnQ2.θ)) * spaceScale + basis.forward.x * normal_del, ((lnQ2.ny * lnQ2.θ)) * spaceScale + basis.forward.y * normal_del, ((lnQ2.nz * lnQ2.θ)) * spaceScale + basis.forward.z * normal_del))


							if (t == 0) {
								normalColors.push(new THREE.Color(1.0, 0.6, 0.6, 1))
								normalColors.push(new THREE.Color(1.0, 0.6, 0.6, 1))
								normalColors.push(new THREE.Color(0.6, 1.0, 0.6, 1))
								normalColors.push(new THREE.Color(0.6, 1.0, 0.6, 1))
								normalColors.push(new THREE.Color(0.6, 0.6, 1.0, 1))
								normalColors.push(new THREE.Color(0.6, 0.6, 1.0, 1))
							} else if (Math.abs(t - B) < 0.05) {
								normalColors.push(new THREE.Color(1.0, 0.3, 0.3, 1))
								normalColors.push(new THREE.Color(1.0, 0.3, 0.3, 1))
								normalColors.push(new THREE.Color(0.3, 1.0, 0.3, 1))
								normalColors.push(new THREE.Color(0.3, 1.0, 0.3, 1))
								normalColors.push(new THREE.Color(0.3, 0.3, 1.0, 1))
								normalColors.push(new THREE.Color(0.3, 0.3, 1.0, 1))

							} else {
								if( lnQ2.θ > Math.PI ){
									normalColors.push(new THREE.Color(2*0.5, 0, 0, 1))
									normalColors.push(new THREE.Color(2*0.5, 0, 0, 1))
									normalColors.push(new THREE.Color(0, 2*0.5, 0, 1))
									normalColors.push(new THREE.Color(0, 2*0.5, 0, 1))
									normalColors.push(new THREE.Color(0, 0, 2*0.5, 1))
									normalColors.push(new THREE.Color(0, 0, 2*0.5, 1))
									}else {
										normalColors.push(new THREE.Color(0.5, 0, 0, 1))
										normalColors.push(new THREE.Color(0.5, 0, 0, 1))
										normalColors.push(new THREE.Color(0, 0.5, 0, 1))
										normalColors.push(new THREE.Color(0, 0.5, 0, 1))
										normalColors.push(new THREE.Color(0, 0, 0.5, ))
										normalColors.push(new THREE.Color(0, 0, 0.5, 1))
		
									}
								}
							if (E < 2)
								drawRange(lnQ2.x, lnQ2.y, lnQ2.z, Math.PI / 64, 5);


						}

						if (drawDropLines) { // drop lines to axiess...
							const spaceScale = 0.5;
							const normal_del = 0.1;
							if (lnQ2.nx < 0) {
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale - 0.5 * normal_del, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale))
								normalVertices.push(new THREE.Vector3((o[0]) * spaceScale, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale))
							} else {
								normalVertices.push(new THREE.Vector3((o[0]) * spaceScale, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale))
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale + 0.5 * normal_del, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale))
							}
							if (lnQ2.nx < 0) {
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale - 0.5 * normal_del, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale))
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale, (o[1]) * spaceScale, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale))
							} else {
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale, (o[1]) * spaceScale, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale))
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale + 0.5 * normal_del, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale))
							}
							if (lnQ2.nz < 0) {
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale - 0.5 * normal_del))
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale, (o[2]) * spaceScale))
							} else {
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale, (o[2]) * spaceScale))
								normalVertices.push(new THREE.Vector3((o[0] + (lnQ2.nx * lnQ2.θ)) * spaceScale, (o[1] + (lnQ2.ny * lnQ2.θ)) * spaceScale, (o[2] + (lnQ2.nz * lnQ2.θ)) * spaceScale + 0.5 * normal_del))

							}



							if (t == 0) {
								normalColors.push(new THREE.Color(1.0, 0.6, 0.6, 1))
								normalColors.push(new THREE.Color(1.0, 0.6, 0.6, 1))
								normalColors.push(new THREE.Color(0.6, 1.0, 0.6, 1))
								normalColors.push(new THREE.Color(0.6, 1.0, 0.6, 1))
								normalColors.push(new THREE.Color(0.6, 0.6, 1.0, 1))
								normalColors.push(new THREE.Color(0.6, 0.6, 1.0, 1))
							} else if (Math.abs(t - C) < 0.02) {
								//console.log("narrow range?");
								normalColors.push(new THREE.Color(1.0, 0.3, 0.3, 1))
								normalColors.push(new THREE.Color(1.0, 0.3, 0.3, 1))
								normalColors.push(new THREE.Color(0.3, 1.0, 0.3, 1))
								normalColors.push(new THREE.Color(0.3, 1.0, 0.3, 1))
								normalColors.push(new THREE.Color(0.3, 0.3, 1.0, 1))
								normalColors.push(new THREE.Color(0.3, 0.3, 1.0, 1))

							} else {
								normalColors.push(new THREE.Color(0.2, 0, 0, 0.1))
								normalColors.push(new THREE.Color(0.2, 0, 0, 0.1))
								normalColors.push(new THREE.Color(0, 0.2, 0, 0.1))
								normalColors.push(new THREE.Color(0, 0.2, 0, 0.1))
								normalColors.push(new THREE.Color(0, 0, 0.2, 0.1))
								normalColors.push(new THREE.Color(0, 0, 0.2, 0.1))
							}
						}

					}

				//if(0)
				if (showCoordinateGrid) {
					const range = (Math.floor(E) + 2) * Math.PI;
					const minRange = (Math.floor(E) + 1) * Math.PI;
					drawRange(0, 0, 0, Math.PI * 2, 40, 2 * Math.PI);
				}
				// graph of location to rotation... 
				function drawRange(cx, cy, cz, range, steps, minr) {
					if (!minr) minr = 0;
					const normLen = 0.25 * (steps / range);
					for (let x = -range; x <= range; x += (2 * range) / steps) {
						for (let y = -range; y <= range; y += (2 * range) / steps) {
							for (let z = -range; z <= range; z += (2 * range) / steps) {
								if ((z * z) + (y * y) + (x * x) > minr * minr) continue;
								const lnQ = new lnQuat(0, cx + x, cy + y, cz + z);
								const basis = lnQ.getBasis();

								// the original normal direction; projected offset of sphere (linear scaled)
								//normalVertices.push( new THREE.Vector3( x*spaceScale,0*spaceScale, z*spaceScale ))
								//normalVertices.push( new THREE.Vector3( x*spaceScale + 1*normal_del,0*spaceScale + 1*normal_del,z*spaceScale + 1*normal_del ))
								//normalColors.push( new THREE.Color( 1,0,1,1 ))
								//normalColors.push( new THREE.Color( 1,0,1,1 ))

								const θ = (Math.abs(lnQ.x) + Math.abs(lnQ.y) + Math.abs(lnQ.z)) / 2;
								//const nR = Math.sqrt( lnQ.x*lnQ.x+lnQ.y*lnQ.y+lnQ.z*lnQ.z );
								const ox = lnQ.θ * lnQ.nx;
								const oy = lnQ.θ * lnQ.ny;
								const oz = lnQ.θ * lnQ.nz;


								normalVertices.push(new THREE.Vector3(ox * spaceScale, oy * spaceScale, oz * spaceScale))
								normalVertices.push(new THREE.Vector3(ox * spaceScale + basis.right.x * normal_del / normLen, oy * spaceScale + basis.right.y * normal_del / normLen, oz * spaceScale + basis.right.z * normal_del / normLen))

								normalVertices.push(new THREE.Vector3(ox * spaceScale, oy * spaceScale, oz * spaceScale))
								normalVertices.push(new THREE.Vector3(ox * spaceScale + basis.up.x * normal_del / normLen, oy * spaceScale + basis.up.y * normal_del / normLen, oz * spaceScale + basis.up.z * normal_del / normLen))

								normalVertices.push(new THREE.Vector3(ox * spaceScale, oy * spaceScale, oz * spaceScale))
								normalVertices.push(new THREE.Vector3(ox * spaceScale + basis.forward.x * normal_del / normLen, oy * spaceScale + basis.forward.y * normal_del / normLen, oz * spaceScale + basis.forward.z * normal_del / normLen))

								normalColors.push(new THREE.Color(1, 0, 0, 1))
								normalColors.push(new THREE.Color(1, 0, 0, 1))
								normalColors.push(new THREE.Color(0, 1, 0, 1))
								normalColors.push(new THREE.Color(0, 1, 0, 1))
								normalColors.push(new THREE.Color(0, 0, 1, 1))
								normalColors.push(new THREE.Color(0, 0, 1, 1))


							}

						}

					}

				}
				//console.log("MINMAX:", minL, maxL, minL + maxL);
			}
		}
	}
}




function DrawQuatNormals(normalVertices, normalColors) {
	const v = { x: 0, y: 1, z: 0 };
	const spaceScale = 5;
	const normal_del = 1;


	drawN(new lnQuat({ x: 0, y: 1, z: 0 }), { x: 0, y: 1, z: 0 });
	//drawN(new lnQuat({ x: 0, y: 1, z: 0 }), { x: 0, y: 1, z: 0 });
	//drawN(new lnQuat({ x: 0, y: -1, z: 0 }), { x: 0, y: -1, z: 0 });

	if (drawNormalBall/*draw normal ball with twist*/)

		for (let h = 0; h < Math.PI; h += 3.1 / 25) {
			//for( let t = 1*-Math.PI; t < 1*Math.PI; t+= 0.25/2 ){
			for (let t = -Math.PI * 2; t < Math.PI * 2; t += 0.25 / 2) {
				//if( t > (Math.PI + 0.5) ) continue;
				const h_ = h;//-(1/1)*Math.PI + h;// - 1*Math.PI/2 - Math.PI/4;
				const lnQ = new lnQuat({ lat: h_, lng: t }, false);

				drawN(lnQ);
			}
		}

	function drawN(lnQ) {
		const normal_del = 0.125;
		const new_v = lnQ.apply(v);

		const basis = lnQ.getBasis();

		// the original normal direction; projected offset of sphere (linear scaled)
		//normalVertices.push( new THREE.Vector3( x*spaceScale,y*spaceScale, z*spaceScale ))
		//normalVertices.push( new THREE.Vector3( x*spaceScale + x*l*normal_del,y*spaceScale + y*l*normal_del,z*spaceScale + z*l*normal_del ))
		//normalColors.push( new THREE.Color( 1,0,1,1 ))
		//normalColors.push( new THREE.Color( 1,0,1,1 ))

		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale, new_v.y * spaceScale, new_v.z * spaceScale))
		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale + basis.right.x * normal_del, new_v.y * spaceScale + basis.right.y * normal_del, new_v.z * spaceScale + basis.right.z * normal_del))

		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale, new_v.y * spaceScale, new_v.z * spaceScale))
		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale + basis.up.x * normal_del, new_v.y * spaceScale + basis.up.y * normal_del, new_v.z * spaceScale + basis.up.z * normal_del))

		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale, new_v.y * spaceScale, new_v.z * spaceScale))
		normalVertices.push(new THREE.Vector3(new_v.x * spaceScale + basis.forward.x * normal_del, new_v.y * spaceScale + basis.forward.y * normal_del, new_v.z * spaceScale + basis.forward.z * normal_del))

		normalColors.push(new THREE.Color(1, 0, 0, 1))
		normalColors.push(new THREE.Color(1, 0, 0, 1))
		normalColors.push(new THREE.Color(0, 1, 0, 1))
		normalColors.push(new THREE.Color(0, 1, 0, 1))
		normalColors.push(new THREE.Color(0, 0, 1, 1))
		normalColors.push(new THREE.Color(0, 0, 1, 1))


	}


}

window.DrawQuatPaths = DrawQuatPaths;
function DrawQuatPaths(normalVertices, normalColors) {

	let lnQX = document.getElementById("lnQX").value;
	let lnQY = document.getElementById("lnQY").value;
	let lnQZ = document.getElementById("lnQZ").value;
	let lnQT = document.getElementById("lnQT").value;
	let lnQA = document.getElementById("lnQA").value;

	//A = (lnQX/10-5)/10;

	T = lnQT / 500 - 1;
	A = lnQX / 500 - 1;
	B = lnQY / 500 - 1;
	C = lnQZ / 500 - 1;
	E = lnQA / 100;

	A = A * Math.PI * 4;
	B = B * Math.PI * 2;
	C = C * Math.PI * 4;
	T = T * 4;
	E = E * 30;
	D = T;
	//twistDelta = A;


	let check = document.getElementById("showCoordinateGrid");
	if (check) {
		showCoordinateGrid = check.checked;
	}
	check = document.getElementById("drawNormalBall");
	if (check) {
		drawNormalBall = check.checked;
	}
	document.getElementById("lnQXval").textContent = (A / Math.PI).toFixed(4) + "π";
	document.getElementById("lnQYval").textContent = (B / Math.PI).toFixed(4) + "π";
	document.getElementById("lnQZval").textContent = (C / Math.PI).toFixed(4) + "π";
	document.getElementById("lnQTval").textContent = T.toFixed(4);
	document.getElementById("lnQAval").textContent = E.toFixed(2);

	DrawQuatNormals(normalVertices, normalColors);

	const xAxis = { x: 1, y: 0, z: 0 };
	const yAxis = { x: 0, y: 1, z: 0 };
	const zAxis = { x: 0, y: 0, z: 1 };
	const cx = new THREE.Color(0.75, 0.75, 0, 255);
	const cy = new THREE.Color(0.1, 0.1, 0.1, 255);
	const cz = new THREE.Color(0, 0.75, 0.75, 255);
	QuatPathing2(null, yAxis, cy, normalVertices, normalColors);

	//QuatPathing( lnQ, xAxis, cx,normalVertices,normalColors );
	//QuatPathing( lnQ, yAxis, cy,normalVertices,normalColors );
	//QuatPathing( lnQ, zAxis, cz,normalVertices,normalColors );
}


