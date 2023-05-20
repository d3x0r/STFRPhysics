
export const params = {
	C: 1,
	lengthContract : true,
	lGam : 1.0,
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

export function RealTime2( T_o, V, P, Ofs, V_o, P_o ) {
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

	static drawCoords( atNow ) {
	}
}
