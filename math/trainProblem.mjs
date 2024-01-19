
import {ObservedTime,RealTime} from "./relativistic.util.mjs"

const gamma = Math.sqrt( 1-0.5*0.5);
const C = 1;
const V = 0.5;

const L = 1;

function a() {


// first observer post by train forward, stationary
const T_1 = ObservedTime( 0, {x:V,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0, y:0, z:0}, {x:L, y:0, z:0} );
console.log( "fp A T1:",T_1);

// second obsrever is guy in train moving, seeing moved post
const T_2 = ObservedTime( T_1, {x:0, y:0, z:0}, { x:L, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "fp A T2:",T_2-T_1, T_2);

}

a();

function tfa() {


// first observer post by train forward, stationary
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:L, y:0, z:0} );
console.log( "ft A T1:",T_1);

// second obsrever is guy in train moving, seeing moved post
const T_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:L, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "ft A T2:",T_2, T_1+T_2);

}

tfa();

function tba() {


// first observer post by train forward, stationary
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:-L, y:0, z:0} );
console.log( "bt A T1:",T_1);

// second obsrever is guy in train moving, seeing moved post
const T_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:-L, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "bt A T2:",T_2, T_1+T_2);

}

tba();


function tgfa() {


// first observer post by train forward, stationary
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:L*gamma, y:0, z:0} );
console.log( "ft A T1:",T_1*gamma);

// second obsrever is guy in train moving, seeing moved post
const T_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:L*gamma, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "ft A T2:",T_2*gamma,( T_1+T_2)*gamma);

}

tgfa();

function tgba() {


// first observer post by train forward, stationary
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:-L*gamma, y:0, z:0} );
console.log( "gbt A T1:",T_1*gamma);

// second obsrever is guy in train moving, seeing moved post
const T_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:-L*gamma, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "gbt A T2:",T_2*gamma, (T_1+T_2)*gamma);

}

tgba();

function tgfang() {


// first observer post by train forward, stationary
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:L*gamma, y:0, z:0} );
console.log( "ft A ngT1:",T_1);

// second obsrever is guy in train moving, seeing moved post
const T_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:L*gamma, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "ft A ngT2:",T_2,( T_1+T_2));

}

tgfang();

function tgbang() {


// first observer post by train forward, stationary
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:-L*gamma, y:0, z:0} );
console.log( "gbt A ngT1:",T_1);

// second obsrever is guy in train moving, seeing moved post
const T_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:-L*gamma, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "gbt A ngT2:",T_2, (T_1+T_2));

}

tgbang();


function ab() {


// first observer post by train backward, stationary
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0, y:0, z:0}, {x:-L, y:0, z:0} );
console.log( "bp A T1:",T_1);

// second obsrever is guy in train moving, seeing moved back post
const T_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:-L-T_1*0.5, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "bp A T2:",T_2, T_1+T_2);

}

ab();

function b() {


        
// first observer is mirror in train front, moving with train
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0, y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:L, y:0, z:0} );
console.log( "ft B T1:",T_1);

// second observer is stationary observer seeing moved front mirror
const T_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:L+T_1*0.5, y:0, z:0 }
			, {x:0, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "ft B T2:",T_2, T_1+T_2);

}

b();


function c() {

// first observer is mirror in train back, moving with train
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0, y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:-L, y:0, z:0} );
console.log( "bt B Tb1:",T_1);

// second observer is stationary, seeing moved back train mirror
const T_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:-L+T_1*0.5, y:0, z:0 }
			, {x:0, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "bt B Tb2:",T_2, T_1+T_2);

}

c();


// first observer is length contracted mirror on train
const Ta_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:L*gamma, y:0, z:0} );
console.log( "g ft A T1:",Ta_1);


// first observer is length contracted mirror on train
const Tb_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:-L*gamma, y:0, z:0} );
console.log( "g bt A T1:",Tb_1);

// second observer is stationary by train from moved front mirror
const Ta_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:L*gamma+Ta_1*0.5, y:0, z:0 }
			, {x:0, y:0, z:0 }, { x: 0, y:0, z:0} );

console.log( "g ft B T2:",Ta_2, Ta_2+Ta_1);


// second observer is stationary by train, from moved back mirror
const Tb_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:-L*gamma+Tb_1*0.5, y:0, z:0 }
			, {x:0, y:0, z:0 }, { x: 0, y:0, z:0} );

console.log( "g bt B T2:",Tb_2, Tb_2 + Tb_1);


function c2() {

// first observer is mirror in train back, moving with train
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0, y:0,z:0}
			, {x:0, y:0, z:0}, {x:-L, y:0, z:0} );
console.log( "gbp A T1:",(T_1)*gamma);

// second observer is stationary, seeing moved back train mirror
const T_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:-L-T_1*0.5, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "gbp A T2:",T_2*gamma, (T_1+T_2)*gamma);

}

c2();


function c3() {

// first observer is mirror in train back, moving with train
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0, y:0,z:0}
			, {x:0, y:0, z:0}, {x:L, y:0, z:0} );
console.log( "gfp A T1:",(T_1)*gamma);

// second observer is stationary, seeing moved back train mirror
const T_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:L-T_1*0.5, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "gfp A T2:",T_2*gamma, (T_1+T_2)*gamma);

}

c3();


// second observer is moving in train from moved front mirror
const TAa_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:0, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: -L*gamma, y:0, z:0} );

console.log( "g bt B T1:",TAa_2, TAa_2*0.5);

// second observer is moving observer
const TAb_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:0, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: L*gamma, y:0, z:0} );

console.log( "g ft B T1:",TAb_2, TAb_2*0.5);


// second observer is moving in train from moved front mirror
const TAa_2a = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:0, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: -L*gamma, y:0, z:0} );

console.log( " bt B T1:",TAa_2a*gamma);

// second observer is moving observer
const TAb_2a = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:0, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: L*gamma, y:0, z:0} );

console.log( " ft B T1:",TAb_2a*gamma);



// a emits b reflects
function getTAB(ta, av, a, bv, b ) {

	// this is going to track two events... the computes A->B
	const ta_ab = ObservedTime( ta, av, a, bv, b );

	// compute the event from B to A
	const ta_ab_ba = ObservedTime( ta_ab, bv, b, av, a );


	// B->A (for which there is no reason for an event to happen at TA - meta event)
	const ta_ba = ObservedTime( ta, bv, b, av, a );

	const ta_ba_ab = ObservedTime( ta_ba, av, a, bv, b );
	return {ta_ab, ta_ba, ta_ab_ba, ta_ba_ab, del_aba: ta_ab_ba-ta_ab, del_bab: ta_ba_ab-ta_ba };
}

const rt = getTAB( 0, {x:0,y:0,z:0}, {x:0,y:0,z:0}, {x:0.5,y:0,z:0}, {x:L*gamma, y:0, z:0});
console.log( rt );

const rt2 = getTAB( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}, {x:0.5,y:0,z:0}, {x:-L*gamma, y:0, z:0});
rt2.ta_ab *= gamma;
rt2.ta_ba *= gamma;
console.log( rt2 );

const rt3 = getTAB( 0, {x:0.0,y:0,z:0}, {x:0,y:0,z:0}, {x:0.5,y:0,z:0}, {x:L, y:0, z:0});
console.log( rt3 );

for( let i = 0; i < 1; i+= 0.25 ) {
for( let v = i+0.0; v < i+0.010; v+= 0.001 ) {
	const gamma = Math.sqrt( C*C-v*v);
	const Lg = L * gamma;
	
	const t1 = ObservedTime( 0, {x:v,y:0,z:0}, {x:0,y:0,z:0}, {x:v,y:0,z:0}, {x:Lg, y:0, z:0});
	const p1 = L + t1 * v;
	const t2 = ObservedTime( t1, {x:v,y:0,z:0}, {x:Lg,y:0,z:0}, {x:v,y:0,z:0}, {x:0, y:0, z:0});
	const p2 = p1 - (t2) * v;

	const T = gamma* gamma*L/((C-v));
	const P = L + gamma*L*v/((C-v));
	const T2 = gamma*L/(C+v);
	const P2 =  L - gamma*L*v/((C+v))

	const T12 = gamma*gamma*L*2*C/(C*C-v*v);
	const P12 = 2*L*(1 + gamma*v*v/(C*C-v*v));
//***********
	const C12 = C + C*gamma*v*v/(C*C-v*v);
//************



//	const P2 = ;
	console.log( "P0:", T, P, "T2:", T2,P2, "Tt:", T12, P12, P12/T12, C12 );

	console.log( "Time:", "V:",v.toFixed(4)
					, "G:", gamma.toFixed(3), "1/G:", (1/v*(1-gamma)).toFixed(3)
					, "T1:",(t1*gamma).toFixed(3)
					, "T2:", ((t2-t1)*gamma).toFixed(3)
					, "Tt:", ((t2)*gamma).toFixed(3)
					, "D1:", p1.toFixed(3)
					, "D2:", p2.toFixed(3)
					, "DT:", (p1+p2).toFixed(3)
					, "C1:", (p1/(t1*gamma)).toFixed(3)
					, "C2:", (p2/((t2-t1)*gamma)).toFixed(3)
					, "Ct:", ((p1+p2)/(t2*gamma))
					//, "zz:", (299_792_458) * ((p1+p2)/(t2*gamma))
					);
//	const l1 = p1 + Lg;
}
}