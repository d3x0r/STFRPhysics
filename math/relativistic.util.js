
export const params = {
	C: 1,
	lengthContract : true,
	lGam : 1.0,
} 

class Vector{
	x=0;y=0;z=0;
	constructor( x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	dot(a) {
		return this.x*a.x + this.y*a.y + this.z * a.z;
	}
	times(n) {
		return new Vector(this.x * n, this.y * n, this.z * n);
	}
	add(v) {
		return new Vector(this.x + v.x, this.y + v.y, this.z + v.z );
	}
	sub(v) {
		return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
	}
}


export function ObservedTime( T, V, P, V_o, P_o ) {
	const C = params.C;
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) (C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const xd = P.x-P_o.x;
	const yd = P.y-P_o.y;
	const zd = P.z-P_o.z;
	const VV = V.x*V.x+V.y*V.y+V.z*V.z;

	if( VV === C*C ) {
		//solve (S-T)^2 = ((D/C T - J /sqrt(J*J+K*K+L*L) S + X/C)^2 + (E/C T - K /sqrt(J*J+K*K+L*L)S + Y/C)^2 + (F/C T - L/sqrt(J*J+K*K+L*L) S + Z/C)^2)  for S
		//S = (sqrt(J^2 + K^2 + L^2) (C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2))/(2 C (C T sqrt(J^2 + K^2 + L^2) - D J T - E K T - F L T - J X - K Y - L Z))		
	}

	{
	const X = xd;
	const Y = yd;
	const Z = zd;

	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const tmp = (-C*C * T + D * J * T 
							+ E * K * T 
							+ F * L * T 
							+ J * X + K * Y + L * Z);
	const CV =  C*C - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	const S = (Math.sqrt(tmp*tmp
						 - CV
							*(C*C * T*T
							- D*D * T*T 
							- 2 * D * T * X 
							- E*E * T*T 
							- 2 * E * T * Y 
							- F*F * T*T 
							- 2 * F * T * Z 
							- xd*xd - yd*yd - zd*zd)
						) 
				+ C*C * T - D * J * T - E * K * T - F * L * T - J * X - K * Y - L * Z
				) / CV;
	return S;
	}
}

export function RealTime2( T_o, V, P, V_o, P_o ) {


	const p_x = (P.x - P_o.x);
	const p_y = (P.y - P_o.y);
	const p_z = (P.z - P_o.z);

	const D = C*C-(V.x*V.x+V.y*V.y+V.z*V.z); // C, V_E
	const px = p_x + (V.x- V_o.x)*T_o ;
	const py = p_y + (V.y- V_o.y)*T_o ;
	const pz = p_z + (V.z- V_o.z)*T_o ;

	const T1 = ( -C*Math.sqrt( px*px+py*py+pz*pz ) + ( p_x * V.x  +  p_y*V.y  +  p_z*V.z ) + (C*C-(V.x*V_o.x+V.y*V_o.y+V.z*V_o.z))* T_o )/D;
	const T2 = ( C*Math.sqrt( px*px+py*py+pz*pz ) + ( p_x * V.x  +  p_y*V.y  +  p_z*V.z ) + (C*C-(V.x*V_o.x+V.y*V_o.y+V.z*V_o.z))* T_o )/D;
	if( T2 < T_o ) return [T2,T1];
	if( T1 < T_o ) return [T1];
	return 0;

	//return [ (- C*Math.sqrt( px*px+py*py+pz*pz ) + ( p_x * V.x  +  p_y*V.y  +  p_z*V.z ) + (C*C-(V.x*V_o.x+V.y*V_o.y+V.z*V_o.z))* T_o )/D ];
}

export function RealTime( T_o, V, P, V_o, P_o ) {
	const C = params.C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for T.
	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 
	//                       - 4 (C^2 - D^2 - E^2 - F^2) 
	//                          * (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) 
	//            + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$
	const X_ = P.x-P_o.x;
	const Y_ = P.y-P_o.y;
	const Z_ = P.z-P_o.z;
	let VV = V.x*V.x+V.y*V.y+V.z*V.z;
	const lengthContract = params.lengthContract?(V.x<C?Math.sqrt(C*C-VV)/(C*C):Math.sqrt(VV-C*C)/(C*C)):1;

	const VLen = (VV>0)?Math.sqrt(VV):1;
	const dot = VLen===0?1:(X_*V.x + Y_*V.y + Z_*V.z)/VLen;
	const X = X_ - V.x*dot/VLen * (1-lengthContract)
	const Y = Y_ - V.y*dot/VLen * (1-lengthContract)
	const Z = Z_ - V.z*dot/VLen * (1-lengthContract)


	const S = T_o;

	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const jsx = X-J*S;
	const ksy = Y-K*S;
	const lsz = Z-L*S;


	const tmp = ( C*C * S + D*jsx + E*ksy + F*lsz );
	const tmp2 = ( S*S * C*C - jsx*jsx - ksy*ksy - lsz*lsz );
	const CV = C*C - VV;
	if( Math.abs(CV) < 0.000001 ) {
		// D*D+E*E+F*F = C
		// solve (S-T)^2 = ( ( (X+D*T-J*S)^2+(Y+E*T - K*S)^2+(Z + F*T - L* S)^2) )/(D*D+E*E+F*F) for T
		// T = ((J^2 S^2)/(D^2 + F^2 + e^2) - (2 J S X)/(D^2 + F^2 + e^2) + (K^2 S^2)/(D^2 + F^2 + e^2) - (2 K S Y)/(D^2 + F^2 + e^2) + (L^2 S^2)/(D^2 + F^2 + e^2) - (2 L S Z)/(D^2 + F^2 + e^2) + X^2/(D^2 + F^2 + e^2) + Y^2/(D^2 + F^2 + e^2) + Z^2/(D^2 + F^2 + e^2) - S^2)
		//        /((2 D J S)/(D^2 + F^2 + e^2) + (2 e K S)/(D^2 + F^2 + e^2) + (2 F L S)/(D^2 + F^2 + e^2) - (2 D X)/(D^2 + F^2 + e^2) - (2 e Y)/(D^2 + F^2 + e^2) - (2 F Z)/(D^2 + F^2 + e^2) - 2 S)
		// T = ((J^2 S^2)/C - (2 J S X)/C + (K^2 S^2)/C - (2 K S Y)/C + (L^2 S^2)/C - (2 L S Z)/C + X^2/C + Y^2/C + Z^2/C - S^2)
		//        /((2 D J S)/C + (2 e K S)/C + (2 F L S)/C - (2 D X)/C - (2 e Y)/C - (2 F Z)/C - 2 S)
		// T = ((J^2 S^2) - (2 J S X) + (K^2 S^2) - (2 K S Y) + (L^2 S^2) - (2 L S Z) + X^2 + Y^2 + Z^2 - S^2*C)
		//        /((2)*( (D J S) + (e K S) + (F L S) - (D X) - (e Y) - (F Z) - S C))

		const T =  ( tmp2 ) / ( 2*( tmp ) )
		if( T < T_o ) return [T];
		return -Math.Infinity;
	}
	
	const delT = Math.sqrt(tmp*tmp - CV * tmp2	);
	const T = (-delT + tmp )/CV;
	if( T > T_o ) {

		const T2 = (+delT + tmp )/CV;
		if( T2 < T_o ) return [T2];
		return [];
	}
	const T2 = (+Math.sqrt(tmp*tmp - CV * tmp2	) + tmp )/CV;
	return (T2<T_o)?[T,T2]:[T];
}

export function RealTime2a( T_o, V, P, Ofs, V_o, P_o ) {
	const C = params.C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for T.
	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 
	//                       - 4 (C^2 - D^2 - E^2 - F^2) 
	//                          * (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) 
	//            + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$

	let VV = V.x*V.x+V.y*V.y+V.z*V.z;
	const lengthContract = true?(V.x<C?Math.sqrt(C*C-VV)/(C*C):Math.sqrt(VV-C*C)/(C*C)):1;
	const VLen = (VV>0)?Math.sqrt(VV):1;
	const dot = VLen===0?1:(Ofs.x*V.x + Ofs.y*V.y + Ofs.z*V.z)/VLen;

	const oX = Ofs.x - V.x*dot/VLen * (1-lengthContract)
	const oY = Ofs.y - V.y*dot/VLen * (1-lengthContract)
	const oZ = Ofs.z - V.z*dot/VLen * (1-lengthContract)

	const X = (P.x+oX)-P_o.x;
	const Y = (P.y+oY)-P_o.y;
	const Z = (P.z+oZ)-P_o.z;

	const S = T_o;

	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const jsx = X-J*S;
	const ksy = Y-K*S;
	const lsz = Z-L*S;


	const tmp = ( C*C * S + D*jsx + E*ksy + F*lsz );
	const tmp2 = ( S*S * C*C - jsx*jsx - ksy*ksy - lsz*lsz );
	const CV = C*C - VV;
	if( Math.abs(CV) < 0.000001 ) {
		// D*D+E*E+F*F = C
		// solve (S-T)^2 = ( ( (X+D*T-J*S)^2+(Y+E*T - K*S)^2+(Z + F*T - L* S)^2) )/(D*D+E*E+F*F) for T
		// T = ((J^2 S^2)/(D^2 + F^2 + e^2) - (2 J S X)/(D^2 + F^2 + e^2) + (K^2 S^2)/(D^2 + F^2 + e^2) - (2 K S Y)/(D^2 + F^2 + e^2) + (L^2 S^2)/(D^2 + F^2 + e^2) - (2 L S Z)/(D^2 + F^2 + e^2) + X^2/(D^2 + F^2 + e^2) + Y^2/(D^2 + F^2 + e^2) + Z^2/(D^2 + F^2 + e^2) - S^2)
		//        /((2 D J S)/(D^2 + F^2 + e^2) + (2 e K S)/(D^2 + F^2 + e^2) + (2 F L S)/(D^2 + F^2 + e^2) - (2 D X)/(D^2 + F^2 + e^2) - (2 e Y)/(D^2 + F^2 + e^2) - (2 F Z)/(D^2 + F^2 + e^2) - 2 S)
		// T = ((J^2 S^2)/C - (2 J S X)/C + (K^2 S^2)/C - (2 K S Y)/C + (L^2 S^2)/C - (2 L S Z)/C + X^2/C + Y^2/C + Z^2/C - S^2)
		//        /((2 D J S)/C + (2 e K S)/C + (2 F L S)/C - (2 D X)/C - (2 e Y)/C - (2 F Z)/C - 2 S)
		// T = ((J^2 S^2) - (2 J S X) + (K^2 S^2) - (2 K S Y) + (L^2 S^2) - (2 L S Z) + X^2 + Y^2 + Z^2 - S^2*C)
		//        /((2)*( (D J S) + (e K S) + (F L S) - (D X) - (e Y) - (F Z) - S C))

		const T =  ( tmp2 ) / ( 2*( tmp ) )
		if( T < T_o ) return [T];
		return -Math.Infinity;
	}
	
	const delT = Math.sqrt(tmp*tmp - CV * tmp2	);
	const T = (-delT + tmp )/CV;
	if( T > T_o ) {

		const T2 = (+delT + tmp )/CV;
		if( T2 < T_o ) return [T2];
		return [];
	}
	const T2 = (+Math.sqrt(tmp*tmp - CV * tmp2	) + tmp )/CV;
	return (T2<T_o)?[T,T2]:[T];
}

//console.log( "Time:", RealTime( 0, {x:0.8, y:0,z:0}, {x:0, y:0, z:0}, {x:0.5, y:0, z:0}, {x:1, y:0,z:0} ) );
//console.log( "Time:", ObservedTime( 0, {x:0.8, y:0,z:0}, {x:0, y:0, z:0}, {x:0.5, y:0, z:0}, {x:1, y:0,z:0} ) );

export class D3xTransform {
	// converts a long time to a short time.
	static V = 1;
	static D = 1;
	static myV = 1;
	
	static get gamma() { const C = params.C;return  Math.sqrt(1 - D3xTransform.V*D3xTransform.V/(C*C)) };
 	static getObservedTime(X,T,myV) {
		myV = myV || 0;
		const willSee = RealTime( T, {x:D3xTransform.V,y:0,z:0}, {x:X, y:0, z:0}, {x:myV,y:0,z:0}, {x:0, y:0, z:0} );
		return willSee[0];
	}
 	static getObservedPlace(X,T,V,myV) {
 	   letmyV = myV || 0;
		const willSee = RealTime2( T, {x:V,y:0,z:0}, {x:X, y:D3xTransform.D, z:0}, {x:0, y:0, z:0}, {x:myV,y:0,z:0}, {x:0, y:0, z:0} ); 
		return willSee[0] * V + X * params.lGam;
	}
 	static getObservedPlace2(X,T) {
		const willSee2 = RealTime( T, {x:D3xTransform.V,y:0,z:0}, {x:D3xTransform.gamma *X, y:D3xTransform.D, z:0}, {x:D3xTransform.myV,y:0,z:0}, {x:0, y:0, z:0} ); 
		return willSee2[0] * D3xTransform.V +  D3xTransform.gamma *X 
				- willSee2[0]*D3xTransform.myV;
	}

	static GetSeenSpace( C, now, pos, V, L, D ) {
		const A = pos;//((now*V)- L);
		// how long it will take to be seen at the current velocities...
		//const gamma = (C*C-V*V)/C;
		const hLen = ((A*V+Math.sqrt(A*A*C*C+D*D*(C*C-V*V)))/(C*C-V*V));
		return { now, pos:now*V, see_pos:pos+now*V+hLen*V, seen:now+hLen }
		//frame.T_start = now;
		//frame.Ph = frame.Pc + hLen*V;
		//frame.T_see_h = now+hLen;

	}

	// returns absolute time an event was generated.
	static getEmitTime( T_o, X_o, V_o, X, V ) {
/*
$$\vec{a}=(\vec{X}-\vec{X_o})-\vec{V_o}T_o $$
$$A = C^2{T_o}^2 - \vec{a}\cdot\vec{a}$$
$$B = C^2{T_o} + \vec{V}\cdot\vec{a}$$
$$D = C^2-\vec{V}\cdot\vec{V}$$
if( D (is near) 0 ) $T = \frac A {2B}$ else $T = \frac {\sqrt{ B^2-DA } +B} {D}$
*/
		const a = X.sub( X_o ).sub( V_o.times( T_o ) );
		const A = params.C * params.C * T_o * T_o - a.dot( a );
		const B = params.C * params.C * T_o - V.dot( a );
		const D = params.C * params.C - V.dot( V );

		return ( Math.abs( D ) < 0.00000001 )? A/(2*B) : ( sqrt( V*V-D*A ) + B) / D;
	}

	// returns absolute time an event was generated.
	static getEmitPos( T_o, X_o, V_o, X, V ) {
		return D3xTransform.aberrate_coord( X_o, V_o, X.add( V.times( D3xTransform.getEmitTime( T_o, X_o, V_o, X, V ) ) ) );
	}

	static aberrate_coord( X_o, V, X ) {
		const Vlen2 = V.dot( V );
		const forward = V;
	        
		const del = X.sub( X_o );
		const r = new Vector();
		
		let len2 = del.dot( del );
		let Vdot = del.dot( V );
		const Vcrsz = del.y * V.x - del.x * V.y;
		const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
		//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
		if( Vlen2 > 0.00001 ) {
			let len = Math.sqrt( len2 );
			let Vlen = Math.sqrt( Vlen2 );
			let norm = len*Vlen;
			let CosVDot = Vdot/norm;
			let baseAng = Math.acos( CosVDot );
			const delAng = Math.acos( ( CosVDot + Vlen/params.C)/(1 + Vlen/params.C * CosVDot))-baseAng;
			if( Math.abs( delAng) > 0.00001 ) {
				const c = Math.cos(delAng );
				const s= Math.sin( delAng);
				let vx = del.x, vy=del.y;
				let qz = Math.sign( Vcrs );
				r.x = X_o.x + vx*c + s*(-qz * vy) + 0;
				r.y = X_o.y + vy*c + s*(qz * vx) + 0;						
			}
		}
		return r;
	}


	static drawCoords( atNow ) {
	}
}



export function aberration( angle ) {
	const speed = values.Velocity;
	const a = Math.acos( (Math.cos(angle)+speed/values.C)/(1+speed/values.C*Math.cos(angle)) );
	return a;
}

// returns the aberrated angle for a transmission direction (angle) with frame moving in (direction)
// Velocity and C are taken from global common variables.
export function aberration_angle_from_angles( angle, direction, V, C ) {
	let da = angle - direction;
	const mod = Math.abs( Math.floor( da / (Math.PI) ) ) & 1;
	let neg = mod?-1:1;
	const a = neg*Math.acos( (Math.cos(da)+V/C)/(1+V/C*Math.cos(da)) ) + direction;
	return a;
}


// returns the angle that the transmission would have to be from to get sent to the target angle (b)
// (d) is the direction the frame is moving in general at speed (V)
// (C) is the speed of light constant
// reverse calculation courtesy of Wolfram Alpha
//    https://www.wolframalpha.com/input?i=b+%3D+arccos%28+%28cos%28a-d%29%2BV%2FC%29%2F%281%2BV%2FC*cos%28a-d%29%29+%29+%2B+d+solve+for+a
export function aberration_inverse_angle( b, d, V, C ) { 
	if( V >= C ) V = C-0.000001;
	const da = b - d;
	const mod = Math.abs( Math.floor( da / (Math.PI) ) ) & 1;
	let neg = mod?-1:1;
	const a = neg*Math.acos((V - C* Math.cos(b - d))/(V *Math.cos(b - d) - C)) + d ;
	return a;
}

// returns the frequency shift seen for a transmission in some direction (angle) 
// from a frame moving in (direction) at velocity (V) and the speed of light (C).
export function freqShift( angle, direction, V, C ) {
	// V/C 
	if( V >= C ) V = C-0.000001;
	const ab = aberration_aa( angle, direction, V, C );
	const f = 1/( ( timeDilate?1/Math.sqrt( 1-V*V/(C*C) ):1 ) * Math.sqrt( 1+ V*V/(C*C) - 2*V/C*Math.cos( ab-direction ) ) );
	return f;
}

// results in Xx,Xy transformed to new coordinate, (rotates around Xox, Xoy)
export function aberration_coord( Xox, Xoy, Xx, Xy, V ) {
	const forward = { x : Math.cos(values.Direction) * values.Velocity, y: -Math.sin(values.Direction) * values.Velocity };

	let delx = Xx-Xox;
	let dely = Xy-Xoy;
	let rx = Xx;
	let ry = Xy;

	let len2 = delx*delx + dely*dely;
	let Vdot = delx * forward.x + dely*forward.y;
	const Vcrsz = dely * forward.x - delx * forward.y;
	const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
	//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
	if( values.Velocity > 0.00001 ) {
		let len = Math.sqrt( len2 );
		let Vlen = values.Velocity;
		let norm = len*Vlen;
		let CosVDot = Vdot/norm;
		let baseAng = Math.acos( CosVDot );
		const delAng = Math.acos( ( CosVDot + Vlen/values.C)/(1 + Vlen/values.C * CosVDot))-baseAng;
		if( Math.abs( delAng) > 0.00001 ) {
			const c = Math.cos(delAng );
			const s= Math.sin( delAng);
			let vx = delx, vy=dely;
			let qz = Math.sign( Vcrs );
			rx = Xox + vx*c + s*(-qz * vy) + 0;
			ry = Xoy + vy*c + s*(qz * vx) + 0;						
		}
	}
	return { x:rx, y:ry };
}

// results in relative angle
function aberration_angle( Xox, Xoy, Xx, Xy, V ) {
	const forward = { x : Math.cos(values.Direction) * values.Velocity, y: -Math.sin(values.Direction) * values.Velocity };

	let delx = Xx-Xox;
	let dely = Xy-Xoy;

	let len2 = delx*delx + dely*dely;
	let Vdot = delx * forward.x + dely*forward.y;
	const Vcrsz = dely * forward.x - delx * forward.y;
	const Vcrs = ( Vcrsz === 0 ? 1 : Vcrsz);
	//let Vcrs = { x: 0, y:0, z:dely*forward.x - delx * forward.y};
	if( values.Velocity > 0.00001 ) {
		let len = Math.sqrt( len2 );
		let Vlen = values.Velocity;
		let norm = len*Vlen;
		let CosVDot = Vdot/norm;
		let baseAng = Math.acos( CosVDot );
		//console.log( "baseAng:", baseAng )
		let qz = Math.sign( Vcrs );
		const delAng = -qz*(Math.acos( ( CosVDot + Vlen/values.C)/(1 + Vlen/values.C * CosVDot))-baseAng);
		return delAng;
	}
	return 0;
}
