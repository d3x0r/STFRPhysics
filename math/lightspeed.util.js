
export let C = 1.0;

function lengthGamma(V) {
	const g1 = (C*C-V*V)/(C*C); // time-accurate [parabola]
	//startPos = startPos - realVel*(dot( startPos,realVel)*g1) ;
	return g1;	

}

function timeGamma() {
	const g1 = Math.sqrt( C*C-V*V)/C;
	return g1;
}

function aberration_orig(th,V) {
	const a = Math.acos( (Math.cos(th)+V/C)/(1+V/C*Math.cos(th)) )
	return a;
}


export function aberration( X, Vo, Xo ) {
	// light direction (X-Xo) dot Vo/C = Vdot = |X-Xo||1|cos(th)
	//    Vdot/||(X-Xo) = cos(th)
	//  sindot =  sin(th) =  sqrt( 1-cos*cos );
	//  X += sinDot * Vo/C
	if( !includeAberration ) {
		return X;
	}
	const Xr = {x:0,y:0,z:0}
	const delx = X.x-Xo.x;
	const dely = X.y-Xo.y;
	const delz = X.z-Xo.z;
	const len2 = delx*delx+dely*dely+delz*delz;
	const Vlen2 = Vo.x*Vo.x+Vo.y*Vo.y+Vo.z*Vo.z;
	const Vdot = delx * Vo.x + dely * Vo.y + delz * Vo.z;
	const Vcrs = { x: delz*Vo.y-dely*Vo.z, y: delx*Vo.z-delz*Vo.x, z: dely*Vo.x-delx*Vo.y }
	if( len2 < 0.0000001 || Vlen2 < 0.000001) {
		// not far enough away to change...
		Xr.x = X.x;
		Xr.y = X.y;
		Xr.z = X.z;
		
	} else {
		const len = Math.sqrt(len2);
		const Vlen = Math.sqrt(Vlen2);
		const norm = Vlen*len;
 		//const vAng = Math.acos( Vo.x/Vlen ) * (Vo.y<0?1:-1);
		 //console.log( "velocity angle:", vAng, "from", Vlen );
		const CosVDot = Vdot/(norm);
		const baseAng = Math.acos( CosVDot );
		const delAng = Math.acos( ( CosVDot + Vlen/C ) 
				/ ( 1 + Vlen/C * CosVDot ) )-baseAng;//*((Vcrs.z<0)?-1:1);

		if( !delAng ) {
			Xr.x = X.x;
			Xr.y = X.y;
			Xr.z = X.z;
			return Xr;
		}
		const c = Math.cos(delAng);
		const s = Math.sin(delAng);
		const n = Math.sqrt( Vcrs.x*Vcrs.x+Vcrs.y*Vcrs.y+Vcrs.z*Vcrs.z);
//console.log( "blah?", norm, );
		const qx = Vcrs.x/n;
		const qy = Vcrs.y/n;
		const qz = Vcrs.z/n;

		const vx = delx , vy = dely , vz = delz;

		const dot =  (1-c)*((qx * vx ) + (qy*vy)+(qz*vz));
		Xr.x = Xo.x + vx*c + s*(qy * vz - qz * vy) + qx * dot;
		Xr.y = Xo.y + vy*c + s*(qz * vx - qx * vz) + qy * dot;
		Xr.z = Xo.z + vz*c + s*(qx * vy - qy * vx) + qz * dot;
		
/*
		const lnQ = new lnQuat( delAng, Vcrs ); // normalizes vector
		const delVec = {x:delx, y:dely, z:delz };
		const newDel = lnQ.apply( delVec )

		Xr.x = Xo.x + newDel.x;
		Xr.y = Xo.y + newDel.y;
		Xr.z = Xo.z + newDel.z;
*/
	}
	return Xr;
}


export function ShotTime( T, V, P, V_o, P_o, c ) {
	c = c || C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for S and T.
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) 
	//                    *(C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) 
	//     + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const X = P.x-P_o.x;
	const Y = P.y-P_o.y;
	const Z = P.z-P_o.z;
	const VV = V_o.x*V_o.x+V_o.y*V_o.y+V_o.z*V_o.z;
	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const dsx = X+D*T;
	const esy = Y+E*T;
	const fsz = Z+F*T;
/*
	const pos = (P-P_o)+V*T;
	const a = pos * V_o;
	const tmp = (-C*C * T + sum(a) );
	const tmp2 = ( T*T * C*C - sum(pos*pos) );
*/	
	const tmp = (-c*c * T + J*dsx + K*esy + L*fsz );
	const tmp2 = ( T*T * c*c - dsx*dsx - esy*esy - fsz*fsz );

	const CV =  c*c - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	if( Math.abs(CV) < 0.000001 ) {
		const T_o =  tmp2/( 2*tmp )
		if( T_o < T ) return T_o;
		return -Math.Infinity;
	}

	return  (Math.sqrt(tmp*tmp - CV*tmp2) - tmp ) / CV;
}

export function ObservedTime( T, V, P, V_o, P_o, c ) {
	c = c || C;
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for S and T.
	//	$S = \frac {\sqrt((-C^2 T + D J T + E K T + F L T + J X + K Y + L Z)^2 - (C^2 - J^2 - K^2 - L^2) 
	//                    *(C^2 T^2 - D^2 T^2 - 2 D T X - E^2 T^2 - 2 E T Y - F^2 T^2 - 2 F T Z - X^2 - Y^2 - Z^2)) 
	//     + C^2 T - D J T - E K T - F L T - J X - K Y - L Z}{C^2 - J^2 - K^2 - L^2}$
	const X = P.x-P_o.x;
	const Y = P.y-P_o.y;
	const Z = P.z-P_o.z;
	const VV = V_o.x*V_o.x+V_o.y*V_o.y+V_o.z*V_o.z;
	const D = V.x;
	const E = V.y;
	const F = V.z;

	const J = V_o.x;
	const K = V_o.y;
	const L = V_o.z;

	const dsx = X+D*T;
	const esy = Y+E*T;
	const fsz = Z+F*T;
/*
	const pos = (P-P_o)+V*T;
	const a = pos * V_o;
	const tmp = (-C*C * T + sum(a) );
	const tmp2 = ( T*T * C*C - sum(pos*pos) );
*/	
	const tmp = (-c*c * T + J*dsx + K*esy + L*fsz );
	const tmp2 = ( T*T * c*c - dsx*dsx - esy*esy - fsz*fsz );

	const CV =  c*c - V_o.x*V_o.x - V_o.y*V_o.y - V_o.z*V_o.z;
	if( Math.abs(CV) < 0.000001 ) {
		const T_o =  tmp2/( 2*tmp )
		if( T_o < T ) return T_o;
		return -Math.Infinity;
	}

	return  (Math.sqrt(tmp*tmp - CV*tmp2) - tmp ) / CV;
}

export function RealTime( T_o, V, P, V_o, P_o ) {
	//$S = ( || {(X, Y, Z) + (D, E, F) T - (J, K, L) S} || )/C + T$; solve for T.
	//$T = \frac {\sqrt((-2 C^2 S + 2 D J S - 2 D X + 2 E K S - 2 E Y + 2 F L S - 2 F Z)^2 
	//                       - 4 (C^2 - D^2 - E^2 - F^2) 
	//                          * (C^2 S^2 - J^2 S^2 + 2 J S X - K^2 S^2 + 2 K S Y - L^2 S^2 + 2 L S Z - X^2 - Y^2 - Z^2)) 
	//            + 2 C^2 S - 2 D J S + 2 D X - 2 E K S + 2 E Y - 2 F L S + 2 F Z}{2 (C^2 - D^2 - E^2 - F^2)}$
	const X = P.x-P_o.x;
	const Y = P.y-P_o.y;
	const Z = P.z-P_o.z;
	let VV = V.x*V.x+V.y*V.y+V.z*V.z;

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

export function RealPosition( T_o, V, P, V_o, P_o ) {
	const dot = P.x*V.x+P.y*V.y+P.z*V.z;
	const g1 = lengthGamma( V );
	const P_del = { x: (P.x-V.x*dot*g1),
		y: (P.y-V.y*dot*g1),
		z: (P.z-V.z*dot*g1)};
	const T = RealTime( T_o, V, P_del, V_o, P_o );
	P_del.x += V.z*T;
	P_del.y += V.y*T;
	P_del.z += V.z*T;
	return {P:P_del, T};
}

export function observedTimeToRealTimeXYZ2( T_o, V, X, Y, Z, V_o, X_o, Y_o, Z_o, ca, sa, ca_o, sa_o ){ 
	return RealTime( T_o, { x: V*ca, y: V*sa, z: 0 }, { x:X, y:Y, z:Z }, { x:ca_o*V_o, y:sa_o*V_o, z: 0 }, { x:X_o, y:Y_o, z:Z_o } );
}


export function RealClock( localClock, V ){
	return localClock * timeGamma( V );
}