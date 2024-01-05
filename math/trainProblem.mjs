
import {ObservedTime,RealTime} from "./relativistic.util.mjs"

const gamma = Math.sqrt( 1-0.5*0.5);
const V = 0.5;
const L = 1;

function a() {


// first observer post by train forward, stationary
const T_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0, y:0, z:0}, {x:L, y:0, z:0} );
console.log( "fp A T1:",T_1);

// second obsrever is guy in train moving, seeing moved post
const T_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:L-T_1*0.5, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );
console.log( "fp A T2:",T_2, T_1+T_2);

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
console.log( "g fm A T1:",Ta_1);


// first observer is length contracted mirror on train
const Tb_1 = ObservedTime( 0, {x:0.5,y:0,z:0}, {x:0,y:0,z:0}
			, {x:0.5, y:0, z:0}, {x:-L*gamma, y:0, z:0} );
console.log( "g bm A T1:",Tb_1);

// second observer is stationary by train from moved front mirror
const Ta_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:L*gamma+Ta_1*0.5, y:0, z:0 }
			, {x:0, y:0, z:0 }, { x: 0, y:0, z:0} );

console.log( "g fm B T2:",Ta_2, Ta_2+Ta_1);


// second observer is stationary by train, from moved back mirror
const Tb_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:-L*gamma+Tb_1*0.5, y:0, z:0 }
			, {x:0, y:0, z:0 }, { x: 0, y:0, z:0} );

console.log( "g bm B T2:",Tb_2, Tb_2 + Tb_1);


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
const TAa_2 = ObservedTime( 0, {x:0, y:0, z:0}, { x:L-Ta_1*0.5, y:0, z:0 }
			, {x:0, y:0, z:0 }, { x: 0, y:0, z:0} );

console.log( "zzg fm A T2:",TAa_2, TAa_2+Ta_1);

// second observer is moving observer
const TAb_2 = ObservedTime( 0, {x:0.5, y:0, z:0}, { x:-L*gamma, y:0, z:0 }
			, {x:0.5, y:0, z:0 }, { x: 0, y:0, z:0} );

console.log( "zzg bm A T2:",TAb_2, TAb_2 + Tb_1);

