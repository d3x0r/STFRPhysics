import {Vector} from "./math_config.mjs"
const speedOfLight = 1;

// control whether type and normalization (sanity) checks are done..
const ASSERT = false;

const p2 = 2 * Math.PI;
//            0-1 1-2 2-3 3-4
const grid = [[0, p2, p2, 0]  //>0 - 1
	, [p2, 0, 0, p2]  //1-2
	, [p2, 0, 0, p2]  //2-3
	, [0, p2, p2, 0]   //3-4
];

// it's hard to see this because they're all in the same plane...
// not sure this is really needed, because the twist is just around this
// same axis.		
const grid2 = [[ 0,  0, 0,  0]  //>0 - 1
             , [ 0,  0, 0, p2]  //1-2
             , [ 0,  0, 0, p2 * 2]  //2-3
             , [ 0,  0, 0, p2 * 2]   //3-4
];
//            0-1 1-2 2-3 3-4
const gridn = [[1, 1, 1, 1]  //>0 - 1
	, [1, 1, 1, 1]  //1-2
	, [1, 1, 1, 1]  //2-3
	, [1, 1, 1, 1]   //3-4
];

// 'fixed' acos for inputs > 1
function acos(x) {
	// uncomment this line to cause failure for even 1/2 rotations(at the limit of the other side)
	// return Math.acos(x); // fails on rotations greater than 4pi.
	const mod = (x, y) => y * (x / y - Math.floor(x / y));
	const plusminus = (x) => mod(x + 1, 2) - 1;
	const trunc = (x, y) => x - mod(x, y);
	return Math.acos(plusminus(x)) - trunc(x + 1, 2) * Math.PI / 2;
}

let normalizeNormalTangent = false;

var twistDelta = 0;
// -------------------------------------------------------------------------------
//  Log Quaternion (Rotation part)
// -------------------------------------------------------------------------------

// lnQuat( 0    , {x:,y:,z:})              - angle, axis ; normalizes 
// lnQuat( theta, b, c, d );               - angle, axisX, axisY, axisZ   ; linear normalize axis, scale by angle.
// lnQuat( 0    , b, c, d );               - 0,     spinX, spinY, spinZ   ; set raw spins
// lnQuat( basis );                        - basis object with {forward:,up:,right:} vectors.
// lnQuat( {a:, b:, c:} );                 - angle-angle-angle set raw spins.
// lnQuat( {x:, y:, z: }, {x:, y:, z: } )  - set as lookAt; forward, up vectors
// lnQuat( {x:, y:, z: }, null )           - set as lookAt; forward, automatic 'up'
class lnQuat {
	nx = 0;  // default normal
	ny = 1;  // 
	nz = 0;
	θ = 0;

	get v() {
		return Vector.new( this.nx*this.θ, this.ny*this.θ, this.nz*this.θ )
	}

	get x() {
		return this.nx*this.θ;
	}
	get y() {
		return this.y*this.θ;
	}
	get z() {
		return this.z*this.θ;
	}
	constructor(theta, d, a, b, e) {

		this.set(theta, d, a, b, e);
	}

	static SLERP = false;
	static invertCrossProduct = false;
	static sinNormal = true;

	set(theta, d, a, b, e) {

		function alignZero(q) {
			//const fN = 1/Math.sqrt( tz*tz+tx*tx );
			const b = q.getBasis();
			const ty = b.up.y;
			const cosTheta = acos(ty); // 1->-1 (angle from pole around this circle.
			const txn = -q.nz;
			const tzn = q.nx;

			const s = Math.sin(cosTheta); // double angle substituted
			const c = 1 - Math.cos(cosTheta); // double angle substituted

			// determinant coordinates
			let angle = txn === 1 ? cosTheta
				: acos((ty + 1) * (1 - txn) / 2 - 1);

			//console.log( "Q:", q, txn, tzn, ty, angle)

			// compute the axis
			const yz = s * q.nx;
			const xz = (2 - c * (q.nx * q.nx + q.nz * q.nz)) * tzn;
			const xy = txn === 1 ? (s * q.nx * tzn
				+ s * q.nz * (1))
				: (s * q.nx * tzn
					+ s * q.nz * (1 - txn));

			const newlen = Math.sqrt(yz * yz + xz * xz + xy * xy);
			if (Math.abs(newlen) > 0.00000001) {
				const tmp = 1 / newlen;
				q.nx = yz * tmp;
				q.ny = xz * tmp;
				q.nz = xy * tmp;
			} else {
				q.nx = 0;
				q.ny = 1;
				q.nz = 0;

			}
			//console.log( "post Q:", q )

			// the remining of this is update()
			q.θ = angle;
		}


		if ("undefined" !== typeof theta) {

			if ("function" === typeof theta) {
				// what is passed is a function to call during apply
				this.refresh = theta;
				return this;
			}
			if (theta instanceof lnQuat) {
				// clone an existing lnQuat
				this.nx = theta.nx;
				this.ny = theta.ny;
				this.nz = theta.nz;
				this.θ = theta.θ;
				return this;
			}
			if ("undefined" !== typeof a) {
				//if( ASSERT ) if( theta) throw new Error( "Why? I mean theta is always on the unit circle; else not a unit projection..." );
				// create with 4 raw coordinates
				//throw new Error( "CHECK INITIALIZER" );
				if ("number" === typeof b) {
					if (theta !== 0) console.log("set is setting a non-zero lnquat")
					let l = a*a+b*b+d*d;
					if( l ){
						l = 1/Math.sqrt( l );
						this.nx = d*l;
						this.ny = a*l;
						this.nz = b*l;
					}
					else { 
						this.nx = this.nz = 0;
						this.ny = 1;
					}
					this.θ = l;
					if (e) {
						alignZero(this);
					}
					return this;
				} else {
					let l = a*a+theta*theta+d*d;
					if( l ){
						l = 1/Math.sqrt( l );
						this.nx = theta*l;
						this.ny = d*l;
						this.nz = a*l;
					}
					else { 
						this.nx = this.nz = 0;
						this.ny = 1;
					}
					if (e) {
						alignZero(this);
					}
					return this;
				}

			} else {
				if ("object" === typeof theta) {
					if ("up" in theta) {
						// basis object {forward:,right:,up:}
						return this.fromBasis(theta);
					}
					if ("lat" in theta) {
						let lat = theta.lat;// % (Math.PI*4);
						let lng = theta.lng;// % (Math.PI*4)

						if (!lat) {
							this.nx = 0; this.nz = 0; this.ny = 1; angle = lng + twistDelta;
							return this;
						}

						const gridlat = Math.floor(Math.abs(lat) / Math.PI);
						const gridlng = Math.floor(Math.abs(lng) / Math.PI);
						const gridlatoct = gridlat >> 2;
						const gridlngoct = gridlng >> 2;
						// additional spin is applied...
						const spin = ((d) ? grid : grid2)[gridlat % 4][gridlng % 4] + ((gridlatoct + gridlngoct) * Math.PI * 4);
						const latmul = 1;//(!d)?gridn[gridlat%4][gridlng%4]:1;

						const x = Math.sin(lng);
						const z = Math.cos(lng);
						this.θ = (latmul * lat + spin);
						this.nx = x;
						this.ny = 0;
						this.nz = z;
						if (d) // D is a boolean to further align the tangents.
						{
							const q = this;
							{
								// ---------- This is the optimized twist inline function ---------------
								// this uses a fixed offset of the latitude to turn the basis; this alignes
								// all forward/right towards the poles and along the equator
								const ty = Math.cos(lat);
								const txn = -z;
								const s = Math.sin(lat); // double angle substituted
								const c = 1 - ty; // double angle substituted
								let angle = txn === 1 ? lat
									: acos((ty + 1) * (1 + z) / 2 - 1);
								// compute the axis
								const yz = s * x;
								const xz = (2 - c * (x * x + z * z)) * x;
								const xy = txn === 1 ? (s * x * x + s * z * (1))
									: (s * x * x + s * z * (1 + z));

								const newlen = Math.sqrt(yz * yz + xz * xz + xy * xy);
								// newlen also should == sin(angle)
								// ----------- end of inline optmized twist ----------------------
								if (Math.abs(newlen) > 0.00000001) {
									const tmp = 1 / newlen;
									q.nx = yz * tmp;
									q.ny = xz * tmp;
									q.nz = xy * tmp;
								} else {
									q.nx = 0;
									q.ny = 1;
									q.nz = 0;
								}

								{
									// input angle...
									const s = Math.sin(angle);
									const c1 = Math.cos(angle);
									const c = 1 - c1;
									const cny = c * this.ny;// before the previous spin, this can be counted as 0
									// compute the 'up' for the current frame
									const ax = (cny * this.nx) - s * this.nz;
									const ay = (cny * this.ny) + c1;
									const az = (cny * this.nz) + s * this.nx;

									const AdotB = q.ny;

									const xmy = (spin + twistDelta - angle) / 2; // X - Y  (x minus y)
									const xpy = (spin + twistDelta + angle) / 2  // X + Y  (x plus y )
									const cxmy = Math.cos(xmy);
									const cxpy = Math.cos(xpy);
									const cosCo2 = ((1 - AdotB) * cxmy + (1 + AdotB) * cxpy) / 2;

									let ang = acos(cosCo2) * 2;

									if (ang) {
										const sxmy = Math.sin(xmy);
										const sxpy = Math.sin(xpy);

										const ss1 = sxmy + sxpy
										const ss2 = sxpy - sxmy
										const cc1 = cxmy - cxpy

										const crsX = (lnQuat.invertCrossProduct ? -1 : 1) * (ay * q.nz - az * q.ny);
										const Cx = (crsX * cc1 + ax * ss1 + q.nx * ss2);

										const crsY = (lnQuat.invertCrossProduct ? -1 : 1) * (az * q.nx - ax * q.nz);
										const Cy = (crsY * cc1 + ay * ss1 + q.ny * ss2);

										const crsZ = (lnQuat.invertCrossProduct ? -1 : 1) * (ax * q.ny - ay * q.nx);
										const Cz = (crsZ * cc1 + az * ss1 + q.nz * ss2);

										const Clx = 1 / Math.sqrt(Cx * Cx + Cy * Cy + Cz * Cz);

										q.θ = ang;
										q.nx = Cx * Clx;
										q.ny = Cy * Clx;
										q.nz = Cz * Clx;
									} else {
										q.θ = 0;
										q.nx = 0;
										q.ny = 1;
										q.nz = 0;
									}
								}
								return this;
							}
						} else {
							if (twistDelta) {
								// input angle...
								const s = Math.sin(this.θ); // double angle sin
								const c1 = Math.cos(this.θ); // sin/cos are the function of exp()
								const c = 1 - c1;
								const cny = c * this.ny;
								const ax = (cny * this.nx) - s * this.nz;
								const ay = (cny * this.ny) + c1;
								const az = (cny * this.nz) + s * this.nx;
								//console.log( "Rotate ", q.nx, q.ny, q.nz, ax, ay, az, th );
								if (false && lnQuat.invertCrossProduct) { /*generally we don't want the first option, it's an additional object, and can just toggle the cross product */
									// apply inverse transform is another option to reverse the cross product...
									const localAx = this.applyDel({ x: ax, y: ay, z: az }, -1);
									return finishRodrigues(this, 0, localAx.x, localAx.y, localAx.z, spin + twistDelta);
								} else {
									// without the If above, this also works....
									/// this has to be an intrinsic rotation, if it is default extrinsic, Apply extrinsic to reverse back to intrinsic
									return finishRodrigues(this, 0, ax, ay, az, spin + twistDelta, lnQuat.invertCrossProduct);
								}
							} else {
								//if(this.θ < 0 )
								this.θ = lat;
							}
							return this;
						}
					}
					else if ("x" in theta) {

						if ("object" === typeof d) {
							if (!d) d = { x: -theta.y, y: theta.x, z: -theta.z }; // create a 'up' for the passed forward.
							const tmpBasis = { forward: theta, up: d, right: { x: 0, y: 0, z: 0 } };
							tmpBasis.right.x = tmpBasis.forward.y * d.z - tmpBasis.forward.z * d.y;
							tmpBasis.right.y = tmpBasis.forward.z * d.y - tmpBasis.forward.x * d.z;
							tmpBasis.right.z = tmpBasis.forward.x * d.x - tmpBasis.forward.y * d.x;
							this.fromBasis(tmpBasis);
						} else {
							// x/y/z normal (no spin, based at 'north' (0,1,0) )  {x:,y:,z:}
							// normal conversion is linear.
							const l2 = (Math.abs(theta.x)/*+abs(theta.y)*/ + Math.abs(theta.z));
							if (l2) {
								const l3 = Math.sqrt(theta.x * theta.x + theta.y * theta.y + theta.z * theta.z);
								//if( l2 < 0.1 ) throw new Error( "Normal passed is not 'normal' enough" );

								const ty = theta.y / l3; // square normal
								const cosTheta = acos(ty); // 1->-1 (angle from pole around this circle.
								const norm1 = Math.sqrt(theta.x * theta.x + theta.z * theta.z);
								// get square normal...
								this.nx = theta.z / norm1;
								this.ny = 0;
								this.nz = -theta.x / norm1;

								this.θ = cosTheta;

								if (twistDelta) {
									yaw(this, twistDelta /*+ angle*/);
								}
							} else {
								this.nx = 0;
								this.ny = theta.y > 0 ? 1 : -1;
								this.nz = 0;

								this.θ = 0;

							}
						}
						return this;
					}
				}

				// angle-axis initialization method
				const l = 1/ Math.sqrt(d.x * (d.x) + d.y * (d.y) + d.z * (d.z));
				const θ = theta; // make sure to normalize axis.
				this.nx = d.x * l;
				this.ny = d.y * l;
				this.nz = d.z * l;
				// if no rotation, then nothing.

				if (Math.abs(theta) > 0.000001) {
					this.θ = θ;
					return this;
				}
			}
		}
	}

	cross(other, target) {
		const dot = this.nx * other.nx + this.ny * other.ny + this.nz * other.nz;
		const angle = Math.acos(dot);  // returns 0 to pi; 0 to 1/2 turn.

		const norm = Math.sin(angle);

		const crsX = -(this.ny * other.nz - this.nz * other.ny);
		const crsY = -(this.nz * other.nx - this.nx * other.nz);
		const crsZ = -(this.nx * other.ny - this.ny * other.nx);
		if (norm) {
			target.θ = angle;
			target.nx = crsX / norm;
			target.ny = crsY / norm;
			target.nz = crsZ / norm;
		} else {
			if (angle > Math.PI) {
				target.θ = angle;
				target.nx = this.nx;
				target.ny = this.ny;
				target.nz = this.nz;
			} else {
				target.θ = angle;
				target.nx = this.nx;
				target.ny = this.ny;
				target.nz = this.nz;
			}

		}
		return target;
	}

	fromBasis(basis) {
		// tr(M)=2cos(theta)+1 .
		const t = ((basis.right.x + basis.up.y + basis.forward.z) - 1) / 2;
		//console.log( "FB t is:", t, basis.right.x, basis.up.y, basis.forward.z );

		//	if( t > 1 || t < -1 )
		//  1,1,1 -1 = 2;/2 = 1
		// -1-1-1 -1 = -4 /2 = -2;
		/// okay; but a rotation matrix never gets back to the full rotation? so 0-1 is enough?  is that why evertyhing is biased?
		//  I thought it was more that sine() - 0->pi is one full positive wave... where the end is the same as the start
		//  and then pi to 2pi is all negative, so it's like the inverse of the rotation (and is only applied as an inverse? which reverses the negative limit?)
		//  So maybe it seems a lot of this is just biasing math anyway?
		let angle = acos(t);
		if (!angle) {
			//console.log( "primary rotation is '0'", t, angle, this.θ, basis.right.x, basis.up.y, basis.forward.z );
			this.x = this.y = this.z = this.nx = this.ny = this.nz = this.θ = 0;
			this.ny = 1; // axis normal.
			return this;
		}
		/*
		https://stackoverflow.com/a/12472591/4619267
		x = (R21 - R12)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
		y = (R02 - R20)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
		z = (R10 - R01)/sqrt((R21 - R12)^2+(R02 - R20)^2+(R10 - R01)^2);
		*/
		const yz = basis.up.z - basis.forward.y;
		const xz = basis.forward.x - basis.right.z;
		const xy = basis.right.y - basis.up.x;
		const tmp = 1 / Math.sqrt(yz * yz + xz * xz + xy * xy);

		this.nx = yz * tmp;
		this.ny = xz * tmp;
		this.nz = xy * tmp;
		this.θ = angle;// / (abs(this.nx)+abs(this.ny)+abs(this.nz));
		return this;
	}

	// exponentiate to quaternion ( q, at time T )
	exp(target, t) {
		t = t || 1;
		const q = this;
		const s = Math.sin(q.θ / 2 * t);
		target.w = Math.cos(q.θ / 2 * t);
		target.x = q.nx * s;
		target.y = q.ny * s;
		target.z = q.nz * s;
		return target;
	}


	// return the difference in spins
	// the resulting spin can be used to rotate Q(this) to P...
	// or to iterate to the new frame... this is 1/2 of the work of slerp2.
	// which is probably done fewer times than the second part which is just q.freespin(result);
	spinDiff(p, target) {
		target = target || new lnQuat();
		const external = false;
		const q = this;
		if (!q.θ) {
			// the difference is just directly to P.
			target.nx = p.nx;
			target.ny = p.ny;
			target.nz = p.nz;
			target.θ = p.θ;
			return target;
		}
		// the difference is P inverse rotated by Q as a frame
		target.set(p);
		// remove the rotation of q from p...
		finishRodrigues(target, Math.floor(q.θ / (Math.PI * 2)), q.nx, q.ny, q.nz, -q.θ);
		// which sets target as the initial P rotation.

		axisTemp.x = target.nx;
		axisTemp.y = target.ny;
		axisTemp.z = target.nz;
		let tmpA;
		if (!external) { // delta angle is from an internal source
			tmpA = q.applyDel(axisTemp, 1);
		} else
			tmpA = axisTemp;
		target.nx = tmpA.x;
		target.ny = tmpA.y;
		target.nz = tmpA.z;
		return target;
	}

	add(q2, t) {
		return lnQuatAdd(this, q2, t || 1);
	}
	add2(q2, t) {
		return new lnQuat(0, this.x, this.y, this.z).add(q2, t);
	}

	getBasis() { return this.getBasisT(1.0) };
	getBasisT(del) {
		const q = this;
		if ("undefined" === typeof del) del = 1.0;

		const nt = q.θ * del;
		const s = Math.sin(nt); // sin/cos are the function of exp()
		const c1 = Math.cos(nt); // sin/cos are the function of exp()
		const c = 1 - c1;

		const qx = this.nx;
		const qy = this.ny;
		const qz = this.nz;

		const cnx = c * qx;
		const cny = c * qy;
		const cnz = c * qz;

		const xy = cnx * qy;  // x * y / (xx+yy+zz) * (1 - cos(2t))
		const yz = cny * qz;  // y * z / (xx+yy+zz) * (1 - cos(2t))
		const xz = cnz * qx;  // x * z / (xx+yy+zz) * (1 - cos(2t))

		const wx = s * qx;     // x / sqrt(xx+yy+zz) * sin(2t)
		const wy = s * qy;     // y / sqrt(xx+yy+zz) * sin(2t)
		const wz = s * qz;     // z / sqrt(xx+yy+zz) * sin(2t)

		const xx = cnx * qx;  // y * y / (xx+yy+zz) * (1 - cos(2t))
		const yy = cny * qy;  // x * x / (xx+yy+zz) * (1 - cos(2t))
		const zz = cnz * qz;  // z * z / (xx+yy+zz) * (1 - cos(2t))

		const basis = {
			right: { x: c1 + xx, y: wz + xy, z: xz - wy }
			, up: { x: xy - wz, y: c1 + yy, z: wx + yz }
			, forward: { x: wy + xz, y: yz - wx, z: c1 + zz }
		};

		return basis;
	}


	getBasisV(del) {
		const q = this;
		if ("undefined" === typeof del) del = 1.0;

		const nt = q.θ * del;
		const s = Math.sin(nt); // sin/cos are the function of exp()
		const c1 = Math.cos(nt); // sin/cos are the function of exp()
		const c = 1 - c1;

		const qx = this.nx;
		const qy = this.ny;
		const qz = this.nz;

		const cnx = c * qx;
		const cny = c * qy;
		const cnz = c * qz;

		const xy = cnx * qy;  // x * y / (xx+yy+zz) * (1 - cos(2t))
		const yz = cny * qz;  // y * z / (xx+yy+zz) * (1 - cos(2t))
		const xz = cnz * qx;  // x * z / (xx+yy+zz) * (1 - cos(2t))

		const wx = s * qx;     // x / sqrt(xx+yy+zz) * sin(2t)
		const wy = s * qy;     // y / sqrt(xx+yy+zz) * sin(2t)
		const wz = s * qz;     // z / sqrt(xx+yy+zz) * sin(2t)

		const xx = cnx * qx;  // y * y / (xx+yy+zz) * (1 - cos(2t))
		const yy = cny * qy;  // x * x / (xx+yy+zz) * (1 - cos(2t))
		const zz = cnz * qz;  // z * z / (xx+yy+zz) * (1 - cos(2t))

		const basis = {
			right: { x: c1 + xx, y: wz + xy, z: xz - wy }
			, up: { x: xy - wz, y: c1 + yy, z: wx + yz }
			, forward: { x: wy + xz, y: yz - wx, z: c1 + zz }
		};

		return basis;
	}


	getRelativeBasis(q2) {
		const q = this;
		const r = new lnQuat(0, this.x, this.y, this.z);
		const dq = lnSubQuat(q2);
		return getBasis(dq);
	}


	getFrame(t, x, y, z) {
		const lnQrot = new lnQuat(0, x, y, z);
		const lnQcomposite = this.apply(lnQrot);
		return lnQcomposite.getBasisT(t);
	}

	// this returns functions which result in vectors that update
	// as the current 
	getFrameFunctions(lnQvel) {
		const q = this.apply(lnQvel);

		let s = Math.sin(q.θ); // sin/cos are the function of exp()
		let c1 = Math.cos(q.θ); // sin/cos are the function of exp()
		let c = 1 - c1; // sin/cos are the function of exp()

		const xy = () => c * q.nx * q.ny;  // 2*sin(t)*sin(t) * x * y / (xx+yy+zz)   1 - cos(2t)
		const yz = () => c * q.ny * q.nz;  // 2*sin(t)*sin(t) * y * z / (xx+yy+zz)   1 - cos(2t)
		const xz = () => c * q.nx * q.nz;  // 2*sin(t)*sin(t) * x * z / (xx+yy+zz)   1 - cos(2t)

		const wx = () => s * q.nx;     // 2*cos(t)*sin(t) * x / sqrt(xx+yy+zz)   sin(2t)
		const wy = () => s * q.ny;     // 2*cos(t)*sin(t) * y / sqrt(xx+yy+zz)   sin(2t)
		const wz = () => s * q.nz;     // 2*cos(t)*sin(t) * z / sqrt(xx+yy+zz)   sin(2t)

		const xx = () => c * q.nx * q.nx;  // 2*sin(t)*sin(t) * y * y / (xx+yy+zz)   1 - cos(2t)
		const yy = () => c * q.ny * q.ny;  // 2*sin(t)*sin(t) * x * x / (xx+yy+zz)   1 - cos(2t)
		const zz = () => c * q.nz * q.nz;  // 2*sin(t)*sin(t) * z * z / (xx+yy+zz)   1 - cos(2t)

		return {
			forward(t) {
				s = Math.sin(t * q.θ);
				c1 = Math.cos(t * q.θ);
				c = 1 - c1;
				return Vector.new((wy() + xz()), (yz() - wx()), c1 + (zz()));
			},
			right(t) {
				s = Math.sin(t * q.θ);
				c1 = Math.cos(t * q.θ);
				c = 1 - c1;
				return Vector.new(c1 + (xx()), (wz() + xy()), (xz() - wy()));
			},
			up(t) {
				s = Math.sin(t * q.θ);
				c1 = Math.cos(t * q.θ);
				c = 1 - c1;
				return Vector.new((xy() - wz()), c1 + yy(), (wx() + yz()));
			}
		}
	}


	apply(v) {
		const q = this;
		//return this.applyDel( v, 1.0 );
		if (v instanceof lnQuat) {

			const c = Math.cos(q.θ);
			const s = Math.sin(q.θ);

			const qx = q.nx, qy = q.ny, qz = q.nz;
			const vx = v.nx, vy = v.ny, vz = v.nz;
			// (1-cos theta) * dot
			// 1-cos theta * cos(angle between vectors)
			const dot = (1 - c) * ((qx * vx) + (qy * vy) + (qz * vz));
			// v *cos(theta) + sin(theta)*cross + q * dot * (1-c)
			v.nx = vx * c + s * (qy * vz - qz * vy) + qx * dot;
			v.ny = vy * c + s * (qz * vx - qx * vz) + qy * dot;
			v.nz = vz * c + s * (qx * vy - qy * vx) + qz * dot;
			return v;
		}

		// 3+2 +sqrt+exp+sin
		if (!q.θ) {
			// v is unmodified.	
			return Vector.new(v.x, v.y, v.z); // 1.0
		} else {
			// https://en.wikipedia.org/wiki/Rodrigues%27_rotation_formula
			// this is Rodrigues rotation formula.  2 multiplies shorter, and 1 less add than below quat method
			const c = Math.cos(q.θ);
			const s = Math.sin(q.θ);

			const qx = q.nx, qy = q.ny, qz = q.nz;
			const vx = v.x, vy = v.y, vz = v.z;
			// (1-cos theta) * dot
			// 1-cos theta * cos(angle between vectors)
			const dot = (1 - c) * ((qx * vx) + (qy * vy) + (qz * vz));
			// v *cos(theta) + sin(theta)*cross + q * dot * (1-c)
			return Vector.new(
				vx * c + s * (qy * vz - qz * vy) + qx * dot
				, vy * c + s * (qz * vx - qx * vz) + qy * dot
				, vz * c + s * (qx * vy - qy * vx) + qz * dot);
		}
	}

	//-------------------------------------------

	// this, 
	//   v ector input to rotate.  (or value)
	//  del is the amount of this to apply 
	// if q2 is specified, then the delta is between q2 and this (q)
	// del2 is the amount of Q2 to apply to (timescalar)

	applyDel(v, del, q2, linear, result2) {
		if (0 && v instanceof lnQuat) {
			const result = new lnQuat(
				function () {
					const q = v;
					const ax = q.nx;
					const ay = q.ny;
					const az = q.nz;
					return finishRodrigues(q, 0, ax, ay, az, q.θ * del);
				}
			);
			return result.refresh();
		}
		const q = this;
		if ('undefined' === typeof del) del = 1.0;
		// 3+2 +sqrt+exp+sin
		if (!(q.θ * del) && !q2) {
			// v is unmodified.	
			if (result2)
				result2.portion = this;
			return Vector.new(v.x, v.y, v.z); // 1.0
		} else {
			if (q2) {
				let ax = 0;
				let ay = 0;
				let az = 0;

				const target = new lnQuat();
				if (linear === true) {
					const x = q2.nx * q.θ + this.nx * this.θ * del
					const y = q2.ny * q.θ + this.ny * this.θ * del
					const z = q2.nz * q.θ + this.nz * this.θ * del
					let l = x*x+y*y+z*z;
					if( l ) {
						l = 1/Math.sqrt(l);
						target.nx = x * l;
						target.ny = y * l;
						target.nz = z * l;
						target.θ = l;
					}else {
						target.θ = target.nx = target.nz = 0;
						target.ny = 1;
					}
				} else {
					q2.slerp(q, del, target);
				}

				ax = target.nx;
				ay = target.ny;
				az = target.nz;

				if (result2 && !result2.portion)
					result2.portion = target;

				const θ = target.θ;

				if (!θ) {
					return { x: v.x, y: v.y, z: v.z }; // 1.0
				}

				// this is still the half-angle quaternion rotate.
				const s = Math.sin(θ);  //;
				const c = Math.cos(θ);  // quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]

				const qx = ax, qy = ay, qz = az;
				const vx = v.x, vy = v.y, vz = v.z;
				// (1-cos theta) * dot
				const dot = (1 - c) * ((qx * vx) + (qy * vy) + (qz * vz));
				// v *cos(theta) + sin(theta)*cross + q * dot * (1-c)
				return Vector.new(
					vx * c + s * (qy * vz - qz * vy) + qx * dot
					, vy * c + s * (qz * vx - qx * vz) + qy * dot
					, vz * c + s * (qx * vy - qy * vx) + qz * dot);
			}
			if (result2 && !result2.portion)
				result2.portion = new lnQuat(0, q.x * del, q.y * del, q.z * del);

			// rodrigues full angle multiply
			const c = Math.cos(q.θ * del);
			const s = Math.sin(q.θ * del);

			const qx = q.nx, qy = q.ny, qz = q.nz;
			const vx = v.x, vy = v.y, vz = v.z;
			// (1-cos theta) * dot
			const dot = (1 - c) * ((qx * vx) + (qy * vy) + (qz * vz));
			// v *cos(theta) + sin(theta)*cross + q * dot * (1-c)
			return Vector.new(
				vx * c + s * (qy * vz - qz * vy) + qx * dot
				, vy * c + s * (qz * vx - qx * vz) + qy * dot
				, vz * c + s * (qx * vy - qy * vx) + qz * dot);
		}
	}

	static apply(angle, axis, v, del, target) {
		target = target || Vector.new();

		if ('undefined' === typeof del) del = 1.0;
		// 3+2 +sqrt+exp+sin
		if (!(angle * del)) {
			target.set(v.x, v.y, v.z);
			return target; // 1.0
		} else {
			const len = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
			const qx = axis.x / len, qy = axis.y / len, qz = axis.z / len;
			// rodrigues full angle multiply
			const c = Math.cos(angle * del);
			const s = Math.sin(angle * del);

			const vx = v.x, vy = v.y, vz = v.z;
			const dot = (1 - c) * ((qx * vx) + (qy * vy) + (qz * vz));
			target.set(vx * c + s * (qy * vz - qz * vy) + qx * dot
				, vy * c + s * (qz * vx - qx * vz) + qy * dot
				, vz * c + s * (qx * vy - qy * vx) + qz * dot
				///			, vw*c + s*(qx * vy - qy * vx) + qw * dot 
			);
			/*
				  c     s*qz   s*qy   s* wx qwqx         qx
			v*   -s*qz  c      s*qx   s* wy qwqy      +  qy  *dot*(1-c)
				 s*qy   s*qx      c   s* wz qwqz         qz
				 s*qwqx s*qwqy s*qwqx     c              qw
			*/

			return target;
		}
	}

	applyInv(v) {
		return this.applyDel(v, -1);
	}

	slerp(p, t, target, oct) {
		return slerp2(this, p, t, target, oct)
	}


	spin(th, axis, oct) {
		// input angle...
		if ("undefined" === typeof oct) oct = 0;

		// ax, ay, az could be given; these are computed as the source quaternion normal
		const aLen = Math.sqrt(axis.x * axis.x + axis.y * axis.y + axis.z * axis.z);
		const ax_ = axis.x / aLen;
		const ay_ = axis.y / aLen;
		const az_ = axis.z / aLen;
		// make sure it's normalized

		//-------- apply rotation to the axle... (put axle in this basis)
		const nst = Math.sin((lnQuat.invertCrossProduct ? -1 : 1) * this.θ / 2); // normal * sin_theta
		const qw = Math.cos((lnQuat.invertCrossProduct ? -1 : 1) * this.θ / 2);  //Math.cos( pl );   quaternion q.w  = (exp(lnQ)) [ *exp(lnQ.W=0) ]

		const qx = this.nx * nst;
		const qy = this.ny * nst;
		const qz = this.nz * nst;

		//p┬Æ = (v*v.dot(p) + v.cross(p)*(w))*2 + p*(w*w ┬û v.dot(v))
		const tx = 2 * (qy * az_ - qz * ay_); // v.cross(p)*w*2
		const ty = 2 * (qz * ax_ - qx * az_);
		const tz = 2 * (qx * ay_ - qy * ax_);
		const ax = ax_ + qw * tx + (qy * tz - ty * qz)
		const ay = ay_ + qw * ty + (qz * tx - tz * qx)
		const az = az_ + qw * tz + (qx * ty - tx * qy);

		return finishRodrigues(this, oct || 0, ax, ay, az, th, false);
	}

	freeSpin(th, axis, oct) {
		const ax_ = axis.x;
		const ay_ = axis.y;
		const az_ = axis.z;
		// make sure it's normalized
		const aLen = Math.sqrt(ax_ * ax_ + ay_ * ay_ + az_ * az_);
		if (aLen) {
			const ax = ax_ / aLen;
			const ay = ay_ / aLen;
			const az = az_ / aLen;

			return finishRodrigues(this, oct || 0, ax, ay, az, th);
		}
		return this;
	}

	// rotate around the current 'right' of the frame.
	// just use freeSpin for a more complex spin.
	pitch(c) {
		return pitch(this, c);
	}

	// rotate around the current 'up' of the frame.
	// just use freeSpin for a more complex spin.
	yaw(c) {
		return yaw(this, c);
	}

	// rotate around the current 'forward' of the frame.
	// just use freeSpin for a more complex spin.
	roll(c) {
		return roll(this, c);
	}

	// inlined up and finish rodrigues.
	// depends only on Math. functions and math operators.
	// spin the frame around the current 'up' by some amount
	yaw2(th) {
		// just go ahead and get the basis!
		const q = this;
		// input angle...
		const s = Math.sin(q.θ); // double angle sin
		const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
		const ths = Math.sin(th);
		const thc = Math.cos(th);
		const c = 1 - c1;
		const cn = c * q.ny;

		ax = -s * q.nz + cn * q.nx
		ay = c1 + cn * q.ny  //( c + (1-c)yy =  c +yy-cyy  =  c(1-yy)+yy
		az = s * q.nx + cn * q.nz

		// x = th
		// y = q.theta
		const cosCo2 = thc * c1 - q.ny * (ths * s)

		//const cosCo2 = ( ( AdotB )*(cxpy - cxmy) + cxmy + cxpy )/2;
		//   (1-cos(A))cos(x-y)+(1+cos(A))cos(x+y)
		//    cos(A) (cos(x + y) - cos(x - y)) + cos(x - y) + cos(x + y)
		// octive should have some sort of computation that gets there...
		// would have to be a small change
		let ang = acos(cosCo2) * 2 + oct * (Math.PI * 4);

		if (ang) {
			const sxmy = Math.sin(xmy);
			const sxpy = Math.sin(xpy);
			// vector rotation is just...
			// when both are large, cross product is dominant (pi/2)
			const ss1 = 2 * c1 * ths;//sxmy + sxpy  // 2 cos(y) sin(x)
			const ss2 = 2 * thc * s;//sxpy - sxmy  // 2 cos(x) sin(y)
			const cc1 = 2 * ths * s;//cxmy - cxpy  // 2 sin(x) sin(y)

			//1/2 (B sin(a/2) cos(b/2) - A sin^2(b/2) + A cos^2(b/2))
			// the following expression is /2 (has to be normalized anyway keep 1 bit)
			// and is not normalized with sin of angle/2.
			const crsX = (ay * q.nz - az * q.ny);
			const crsY = (az * q.nx - ax * q.nz);
			const crsZ = (ax * q.ny - ay * q.nx);
			const Cx = (crsX * cc1 + ax * ss1 + q.nx * ss2);
			const Cy = (crsY * cc1 + ay * ss1 + q.ny * ss2);
			const Cz = (crsZ * cc1 + az * ss1 + q.nz * ss2);

			// this is NOT /sin(theta);  it is, but only in some ranges...
			const Clx = (lnQuat.sinNormal)
				? (1 / (2 * Math.sin(ang / 2)))
				: 1 / Math.sqrt(Cx * Cx + Cy * Cy + Cz * Cz);
			if (0) {
				// this normalizes the rotation so there's no overflows.
				const other = 1 / Math.sqrt(Cx * Cx + Cy * Cy + Cz * Cz);
				if (Math.abs(other - Clx) > 0.001) {
					console.log("Compare A and B:", Clx, other, th, q.θ);
				}
			}
			q.rn = Clx; // I'd like to save this to see what the normal actually was
			q.θ = ang;
			q.nx = Cx * Clx;
			q.ny = Cy * Clx;
			q.nz = Cz * Clx;
		} else {
			// result angle is 0
			q.θ = ang;
			q.nx = 1;
			q.ny = 0;
			q.nz = 0;
		}
		return q;
	}


	//-------------------------------------------------------------------------------
	// these work for the typical 'locked' camera that natural camera uses
	//   Roll = y coordinate of Right direction  (pitch and yaw do not change the right)
	//      (could also be x of up pitch and yaw don't change this)
	//      (could cos(y-up) or cos(x-right) but then one other direction immediately also changes the value)
	//   Pitch = x coordinate of Y axis - yaw, and roll do not change this 
	//      (could also be y of forward yaw and roll do not change this either)
	//      (could cos(y-up) or cos(z-forward) but then one other direction immediately also changes the value)
	//   Yaw = z coordinate or Right direction ( roll, and pitch do not change this )
	//      (could also be x of forward)
	//      (could cos(z-forward) or cos(x-right) but then one other direction immediately also changes the value)
	//      further example : nothing on 'up' changes; 
    //           right x(cos) changes, right y(up) doesn't change (isn't yaw), right z(sin) changes,
	//           forward x(sin) changes  forward y(up) doesn't change, forward z(cos) changes.
	//           the terms that have cos also immediately change if another rotation happens; the
	//           sin terms only change (immdiately from this one action)
	//           using combinations of the other rotations will also change the sin term of these
	//             but that's from an interaction of 2 rotations, which is generally 3 dimenional.
	//-------------------------------------------------------------------------------
	// These functions assume that roll is near 0.

	// roll is the amount of the 'right' axis as a arcsin...
	// this is the Y coordinate of the right.
	getRoll() {
		// just go ahead and get the basis!
		const q = this;

		// input angle...
		const s = Math.sin(q.θ); // double angle sin
		const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
		const c = 1 - c1;
		const cn = c * q.nx;

		return Math.asin(s * q.nz + cn * q.ny);
	}

	// roughly the yaw of this from from 'normal forward'
	// this is the z coodinate of the right as a arcsin..
	getYaw() {
		const q = this;
		const s = Math.sin(q.θ); // double angle sin
		const c1 = Math.cos(q.θ); // sin/cos are the function of exp()

		const c = 1 - c1;
		const cn = c * q.nx;

		const rx = c1 + cn * q.nx;
		const principal = -Math.asin(-s * q.ny + (1 - c1) * q.nx * q.nz);
		if (rx < 0) return principal;
		let result;
		if (principal < 0) {
			result = -Math.PI - principal;//-Math.PI/4;
		} else {
			result = Math.PI - principal;//Math.PI-principal;//-Math.PI/4;
		}
		return result;
	}

	// this is the forward direction z coordinate arcsin.
	// this is the Z coordinate of the Up axis; as an arcsin.
	getPitch() {
		const q = this;
		// input angle...
		const s = Math.sin(q.θ); // double angle sin
		const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
		return Math.asin(s * q.nx + (c1 - 1) * q.nz * q.ny);
	}

	//-------------------------------------------------------------------------------


	right() {
		const q = this;
		// input angle...
		const s = Math.sin(q.θ); // double angle sin
		const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
		const c = 1 - c1;
		const cn = c * q.nx;
		return Vector.new(
			c1 + cn * q.nx
			, s * q.nz + cn * q.ny
			, -s * q.ny + cn * q.nz
		);
	}

	up() {
		const q = this;
		// input angle...
		const s = Math.sin(q.θ); // double angle sin
		const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
		const c = 1 - c1;
		const cn = c * q.ny;
		return Vector.new(
			-s * q.nz + cn * q.nx
			, c1 + cn * q.ny  //( c + (1-c)yy =  c +yy-cyy  =  c(1-yy)+yy
			, s * q.nx + cn * q.nz
		);
	}

	forward() {
		const q = this;
		// input angle...
		const s = Math.sin(q.θ); // double angle sin
		const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
		const c = 1 - c1;
		const cn = c * q.nz;
		return Vector.new(
			s * q.ny + cn * q.nx
			, -s * q.nx + cn * q.ny
			, c1 + cn * q.nz
		);
	}


	// rotate the passed vector 'from' this space
	sub2(q) {
		const qRes = new lnQuat(this).addConj(q);
		return qRes;//.update();
	}

	addConj(q) {
		const ax = -q.nx * q.θ + this.nx * this.θ;
		const ay = -q.ny * q.θ + this.ny * this.θ;
		const az = -q.nz * q.θ + this.nz * this.θ;
		let l = ax*ax+ay*ay+az*az;
		if( l ) {
			l = 1/Math.sqrt(l);
			this.nx = ax * l;
			this.ny = ay * l;
			this.nz = az * l;
			this.θ = l;
		}else {
			this.nx = 0;
			this.ny = 1;
			this.nz = 0;
			this.θ = 0;
		}
		return this;//.update();
	}

	static setTwistDelta(t) {
		twistDelta = t;
	}



}

function lnQuatSub(q, q2, s) {
	if ("undefined" == typeof s) s = 1;
	const ax = q.nx * q.θ - q2.nx * this.θ * s;
	const ay = q.ny * q.θ - q2.ny * this.θ * s;
	const az = q.nz * q.θ - q2.nz * this.θ * s;
	const l = ax*ax+ay*ay+az*az;
	if( l ) {
		l = 1/Math.sqrt(l);
		q.nx = ax * l;
		q.ny = ay * l;
		q.nz = az * l;
		q.θ = l;
	}else {
		q.nx = 0;
		q.ny = 1;
		q.nz = 0;
		q.θ = 0;
	}
	return q;//.update();
}

function lnQuatAdd(q, q2, s) {
	if ("undefined" == typeof s) s = 1;
	const ax = q.nx * q.θ + q2.nx * this.θ * s;
	const ay = q.ny * q.θ + q2.ny * this.θ * s;
	const az = q.nz * q.θ + q2.nz * this.θ * s;
	const l = ax*ax+ay*ay+az*az;
	if( l ) {
		l = 1/Math.sqrt(l);
		q.nx = ax * l;
		q.ny = ay * l;
		q.nz = az * l;
		q.θ = l;
	}else {
		q.nx = 0;
		q.ny = 1;
		q.nz = 0;
		q.θ = 0;
	}
	return q;//.update();
}



// q= quaternion to rotate; oct = octive to result with; 
// ac/as cos/sin(rotation) ax/ay/az (normalized axis of rotation)
const axisTemp = { x: 0, y: 0, z: 0 };
function slerp2(q, p, t, target, external) {
	external = external || 0;
	// A dot B   = cos( angle A->B )
	// cross product of the rotations is a rotation perpendicular to the two
	// with an arc length of arccos( q x p ), scaled by 0-1 passed in as T.
	if (!q.θ) {
		target.nx = p.nx;
		target.ny = p.ny;
		target.nz = p.nz;
		target.θ = t * p.θ;
		return target;
	}

	target.set(p);
	// remove the rotation of q from p...
	finishRodrigues(target, Math.floor(q.θ / (Math.PI * 2)), q.nx, q.ny, q.nz, -q.θ);
	// which sets target as the initial P rotation.

	axisTemp.x = target.nx;
	axisTemp.y = target.ny;
	axisTemp.z = target.nz;
	let tmpA;
	if (!external) // delta angle is from an internal source
		tmpA = q.applyDel(axisTemp, 1);
	else
		tmpA = axisTemp;
	const angle = target.θ;
	target.set(q);
	return finishRodrigues(target, Math.floor(q.θ / (Math.PI * 2)), tmpA.x, tmpA.y, tmpA.z, angle * t);
}



// q= quaternion to rotate; oct = octive to result with; ac/as cos/sin(rotation) ax/ay/az (normalized axis of rotation)
function finishRodrigues(q, oct, ax, ay, az, th, extrinsic) {
	oct = oct || Math.floor(q.θ / (Math.PI * 2));
	// A dot B   = cos( angle A->B )
	// cos( C/2 ) 
	//  cos(angle between the two rotation axii)
	const AdotB = (q.nx * ax + q.ny * ay + q.nz * az);
	/*
	// orbital hopping mechanic... 
	// hypothetical relation mass to orbital
	if( AdotB > 0.99 ) {
		if( q.θ + th > Math.PI*4 )
			oct++;
	} else if( cosCo2 < -0.99 ){
		if( q.θ - th < -Math.PI*4 )
			oct--;
	}
	*/

	// using sin(x+y)+sin(x-y)  expressions replaces multiplications with additions...
	// same sin/cos lookups sin(x),cos(x),sin(y),cos(y)  
	//   or sin(x+y),cos(x+y),sin(x-y),cos(x-y)
	const xmy = (th - q.θ) / 2; // X - Y  ('x' 'm'inus 'y')
	const xpy = (th + q.θ) / 2  // X + Y  ('x' 'p'lus 'y' )
	const cxmy = Math.cos(xmy);
	const cxpy = Math.cos(xpy);

	// cos(angle result)
	//const cosCo2 = ( ( 1-AdotB )*cxmy + (1+AdotB)*cxpy )/2;
	// ( 2 cos(x) cos(y) - 2 A sin(x) sin(y) ) / 2
	const cosCo2 = ((AdotB) * (cxpy - cxmy) + cxmy + cxpy) / 2;
	//   (1-cos(A))cos(x-y)+(1+cos(A))cos(x+y)
	//    cos(A) (cos(x + y) - cos(x - y)) + cos(x - y) + cos(x + y)
	// octive should have some sort of computation that gets there...
	// would have to be a small change
	// 1 to -1 ... is a positive angle from 0 to pi; times two = 2pi
	let ang = acos(cosCo2) * 2 + oct * (Math.PI * 2);

	if (ang && ang != Math.PI*2 ) {
		const sxmy = Math.sin(xmy);
		const sxpy = Math.sin(xpy);
		// vector rotation is just...
		// when both are large, cross product is dominant (pi/2)
		const ss1 = sxmy + sxpy  // 2 cos(y) sin(x)
		const ss2 = sxpy - sxmy  // 2 cos(x) sin(y)
		const cc1 = cxmy - cxpy  // 2 sin(x) sin(y)

		//1/2 (B sin(a/2) cos(b/2) - A sin^2(b/2) + A cos^2(b/2))
		// the following expression is /2 (has to be normalized anyway keep 1 bit)
		// and is not normalized with sin of angle/2.
		const crsX = (extrinsic ? -1 : 1) * (lnQuat.invertCrossProduct ? -1 : 1) * (ay * q.nz - az * q.ny);
		const crsY = (extrinsic ? -1 : 1) * (lnQuat.invertCrossProduct ? -1 : 1) * (az * q.nx - ax * q.nz);
		const crsZ = (extrinsic ? -1 : 1) * (lnQuat.invertCrossProduct ? -1 : 1) * (ax * q.ny - ay * q.nx);
		const Cx = (crsX * cc1 + ax * ss1 + q.nx * ss2);
		const Cy = (crsY * cc1 + ay * ss1 + q.ny * ss2);
		const Cz = (crsZ * cc1 + az * ss1 + q.nz * ss2);

		// this is NOT /sin(theta);  it is, but only in some ranges...
		const Clx = (lnQuat.sinNormal)
			? (1 / (2 * Math.sin(ang / 2)))
			: 1 / Math.sqrt(Cx * Cx + Cy * Cy + Cz * Cz);
		if (0) {
			// this normalizes the rotation so there's no overflows.
			const other = 1 / Math.sqrt(Cx * Cx + Cy * Cy + Cz * Cz);
			if (Math.abs(other - Clx) > 0.001) {
				console.log("Compare A and B:", Clx, other, th, q.θ);
			}
		}
		q.rn = Clx; // I'd like to save this to see what the normal actually was
		q.θ = ang;
		q.nx = Cx * Clx;
		q.ny = Cy * Clx;
		q.nz = Cz * Clx;
	} else {
		// result angle is 0
		if (AdotB > 0) {
			q.θ = q.θ + th;
		} else {
			q.θ = q.θ + th;
		}
	}
	return q;
}



// this gets the right direction in the current frame, as an axis, and tips around that.
function pitch(q, th) {
	const s = Math.sin(q.θ); // sin/cos are the function of exp()
	const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
	const c = 1 - c1;

	const cnx = c * q.nx
	const ax = (cnx * q.nx + c1);
	const ay = (cnx * q.ny + s * q.nz);
	const az = (cnx * q.nz - s * q.ny);

	return finishRodrigues(q, 0, ax, ay, az, th, lnQuat.invertCrossProduct);
}

function roll(q, th) {
	// input angle...
	const s = Math.sin(q.θ); // sin/cos are the function of exp()
	const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
	const c = 1 - c1;

	const cnz = c * q.nz;
	const ax = (cnz * q.nx) + s * q.ny;
	const ay = (cnz * q.ny) - s * q.nx;
	const az = (cnz * q.nz) + c1;

	return finishRodrigues(q, 0, ax, ay, az, th, lnQuat.invertCrossProduct);
}

function yaw(q, th) {
	// input angle...
	const s = Math.sin(q.θ); // double angle sin
	const c1 = Math.cos(q.θ); // sin/cos are the function of exp()
	const c = 1 - c1;

	const cny = c * q.ny;
	const ax = (cny * q.nx) - s * q.nz;
	const ay = (cny * q.ny) + c1;
	const az = (cny * q.nz) + s * q.nx;

	return finishRodrigues(q, 0, ax, ay, az, th, lnQuat.invertCrossProduct);
}


export function deg2rad(n) { return n * Math.PI / 180 }

// v is a point (x,y,z)
// q is the relative origin rotation
// range is the expected distance... (should? only return +/-1 range)
// q.applyInverse( v ) and then use the result as a new normal and compute x/z relative 
export function SphereToXY(q, v, range) {

	const s = Math.sin(q.θ / 2);
	const qw = Math.cos(q.θ / 2);

	const dqw = s / q.θ; // sin(theta)/r
	// inverse
	const qx = -q.x * dqw;
	const qy = -q.y * dqw;
	const qz = -q.z * dqw;

	const tx = 2 * (qy * v.z - qz * v.y);
	const ty = 2 * (qz * v.x - qx * v.z);
	const tz = 2 * (qx * v.y - qy * v.x);

	const vxOut = v.x + qw * tx + (qy * tz - ty * qz);
	const vyOut = v.y + qw * ty + (qz * tx - tz * qx);
	const vzOut = v.z + qw * tz + (qx * ty - tx * qy);

	{ // convert normal to x/0/z normal
		const l3 = Math.sqrt(vxOut * vxOut + vyOut * vyOut + vzOut * vzOut);
		const tmpy = vyOut / l3; // square normal
		const cosTheta = Math.acos(tmpy); // 1->-1 (angle from pole around this circle.
		const norm1 = Math.sqrt(vxOut * vxOut + vzOut * vzOut);
		return { x: (vzOut / norm1 * cosTheta / range), y: (-vxOut / norm1 * cosTheta) / range };
	}
}

// o is the origin of the grid
// x/y is an angle to map... 
export function updateGridXY(q, x, y, o) {

	//lnQ.x = theta; lnQ.y = 0; lnQ.z = gamma;
	const qlen = Math.sqrt(x * x + y * y);

	const qnx = qlen ? x / qlen : 0;
	const qny = qlen ? 0 : 1;
	const qnz = qlen ? y / qlen : 0;

	const ax = o.nx
	const ay = o.ny
	const az = o.nz
	const th = o.θ

	{ // finish rodrigues
		const AdotB = (qnx * ax + /*q.ny*ay +*/ qnz * az);

		const xmy = (th - qlen) / 2; // X - Y  (x minus y)
		const xpy = (th + qlen) / 2  // X + Y  (x plus y )
		const cxmy = Math.cos(xmy);
		const cxpy = Math.cos(xpy);
		const cosCo2 = ((1 - AdotB) * cxmy + (1 + AdotB) * cxpy) / 2;

		let ang = Math.acos(cosCo2) * 2;
		// only good for rotations between 0 and pi.

		if (ang) {
			const sxmy = Math.sin(xmy); // sin x minus y
			const sxpy = Math.sin(xpy); // sin x plus y

			const ss1 = sxmy + sxpy
			const ss2 = sxpy - sxmy
			const cc1 = cxmy - cxpy

			// these have q.ny terms remove - q.ny is 0.
			const Cx = ((ay * qnz) * cc1 + ax * ss1 + qnx * ss2);
			const Cy = ((az * qnx - ax * qnz) * cc1 + ay * ss1);
			const Cz = ((-ay * qnx) * cc1 + az * ss1 + qnz * ss2);

			const Clx = 1 / Math.sqrt(Cx * Cx + Cy * Cy + Cz * Cz);

			q.θ = ang;
			q.nx = Cx * Clx;
			q.ny = Cy * Clx;
			q.nz = Cz * Clx;
		} else {
			// two axles are coincident, add...
			let x;
			let y;
			let z;
			let l;
			if (AdotB > 0) {
				x = qnx * (qlen + th);
				y = qny * (qlen + th);
				z = qnz * (qlen + th);
				l = x*x+y*y+z*z;
			} else {
				x = qnx * (qlen - th);
				y = qny * (qlen - th);
				z = qnz * (qlen - th);
			}
			if( l ) {
				l = 1/Math.sqrt(l);
				q.x = qnx * l;
				q.y = qny * l;
				q.z = qnz * l;
				q.θ = l;
			}else {
				q.θ = 0;
			}
		}
	}
	return q;
}

const lnQuatPool = [];

class lnQuat_pooled extends lnQuat {
	constructor( ...args ) {
		super( ...args );
	}

	static new(...args) {
		var r = lnQuatPool.pop();
		if( r ) {
			r.set( ...args );
		}
		else {
			r = new lnQuat_pooled(...args);
		}
		return r;
	}

	delete() {
		lnQuatPool.push( this );
		return this;
	}

}




export { lnQuat, lnQuat_pooled }
