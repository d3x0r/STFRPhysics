/*
angle     measured[A]            cos(theta)[B]         A/B

*/

//************************************************************************/
//**** IF YOU HAVE AN ERROR, copy ../3d/src/lnQuat.js to ./lnQuat.mjs **** /
//************************************************************************/
                  import {lnQuat} from "./lnQuatSq.mjs"
//************************************************************************/
//**** IF YOU HAVE AN ERROR, copy ../3d/src/lnQuat.js to ./lnQuat.mjs **** /
//************************************************************************/

const lnQ = new lnQuat();
const choices = [0,0,0,0];
const choices_d = [0,0,0,0];

const axis1 = [1,0,0];

const axis2_0 = [Math.cos(0),Math.sin(0),0];
const axis2_30 = [Math.cos(Math.PI/6),Math.sin(Math.PI/6),0];
//const axis2_30 = [Math.cos(Math.PI*40/180),Math.sin(Math.PI*40/180),0];
const axis2_60 = [Math.cos(Math.PI/3),Math.sin(Math.PI/3),0];
const axis2_90 = [Math.cos(Math.PI/2),Math.sin(Math.PI/2),0];

// optimal? rough guess...
// 3.4 (0.80 + (1-0) ) should be optimal for this hidden variable.
// that is 80% right for A,B,C and 100% not right for D.

const a0 = axis2_60;
const a1 = axis2_0;
const b0 = axis2_30;
const b1 = axis2_90;


const axis2_22_5 = [Math.cos(Math.PI*22.5/180),Math.sin(Math.PI*22.5/180),0];
const axis2_45   = [Math.cos(Math.PI*45/180),Math.sin(Math.PI*45/180),0];
const axis2_62_5 = [Math.cos(Math.PI*67.5/180),Math.sin(Math.PI*67.5/180),0];

// CHSH angles only get 3.16 win z
/*
const a0 = axis2_45;
const a1 = axis2_0;
const b0 = axis2_22_5;
const b1 = axis2_62_5;
*/



const tmp = [0,0,0];
const tmp2 = [0,0,0];

function pick_2d_fair(){
	let t = Math.random();
        //l += ( tmp[0] = Math.random()*2-1 ) * tmp[0];
        //l += ( tmp[1] = Math.random()*2-1 ) * tmp[1];
	tmp[0] = Math.cos( t * 2*Math.PI );
	tmp[1] = Math.sin( t * 2*Math.PI );
	tmp[2] = 0;
	//l += ( tmp[2] = Math.random()*2-1 ) *tmp[2];

        return tmp;
}

function pick2(){

	let t = Math.random()*Math.PI*2;
	let u = Math.random()*2*Math.PI;
	let l = 0;
	lnQ.x=lnQ.y=lnQ.z=lnQ.nz=lnQ.nx=lnQ.θ=0; lnQ.ny= 1; lnQ.dirty = false;
	const up = lnQ.pitch( u ).roll( t ).up();
        //l += ( tmp[0] = Math.random()*2-1 ) * tmp[0];
        //l += ( tmp[1] = Math.random()*2-1 ) * tmp[1];
	l += ( tmp[0] = up.x ) *tmp[0];
	l += ( tmp[1] = up.y ) *tmp[1];
	l += ( tmp[2] = up.z ) *tmp[2];
	//l += ( tmp[2] = Math.random()*2-1 ) *tmp[2];

	t = 1/Math.sqrt(l);
        tmp[0] *= t;
        tmp[1] *= t;
        tmp[2] *= t;
        return tmp;
}
const pick = pick_2d_fair;


function getState( axis ) {    
	let s = 0;

	if( tmp[0]*axis1[0] >= 0 ) {
		//choices_d[0] += Math.sin( Math.PI/4*(1+axis[0]) );
		s += 1;
	}else{
		//choices_d[1] += Math.sin( Math.PI/4*(1+axis[0]) );
	}
	if( (tmp[0]*axis[0] + tmp[1]*axis[1]) > 0 ) {
		return true;
	}
        return false;
}


const pairs = [ [a0,b0],[a1,b0],[a0,b1],[a1,b1]]

const CHSH_wins = [ [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0] ];

const ratio = (val,val2)=>((val2<val)?(1-(val2/val)):(1-(val/val2)));

function test1() {
	let i;

	

	for( i = 0; i < 4; i++ ) { choices[i] = 0; choices_d[i] = 0; }

	for( i = 0; i < 200000; i++ ) {
		pick();  // tmp has a vector.
		for( let j = 0;j < 4; j++ ) {
		        if( getState( pairs[j][0] ) ) {
				if( getState( pairs[j][1] ) ) {
				 	CHSH_wins[j][0]++;
				}else
				 	CHSH_wins[j][1]++;
			} else {
				if( !getState( pairs[j][1] ) ) {
				 	CHSH_wins[j][2]++;
				}else
				 	CHSH_wins[j][3]++;
			}
		}

        }

	
	const totalWin = CHSH_wins.map( choices=> ratio( choices[0], choices[1] ) );

	console.log( "Array is : {A0, B0} got  [up-up,up-down,down-down,down-up], where up-up and down-down is expected to correlate" );
	console.log( "then {A1, B0}, {A0,B1}, {A1,B1}; where A1 and B1 are expected to not correlate, and penalize points." );

        console.log( "choices:", CHSH_wins, totalWin,  totalWin.reduce( ((acc,val,i)=>acc+(i==3?1-val:val)),0 ));
	console.log( "Ideal CHSH S for LHV : 3.40 which is > 2*sqrt(2) 2.82" );
}



function test2() {
	let i;
	for( let th = 0; th <= 90; th++ ) {
		const angle = th/180 * Math.PI;
		axis2[0] = Math.cos( angle );
		axis2[1] = Math.sin( angle );
		for( i = 0; i < 4; i++ ) { choices[i] = 0; choices_d[i] = 0; }

		for( i = 0; i < 200000; i++ ) {
        		const s = getState( pick() );
	                choices[s]++;
        	}
	        console.log( th,"choices:", 1-(choices[1])/(choices[0]), Math.cos( angle ), (1-(choices[1])/(choices[0]))/ Math.cos( angle ) );
	}
}

//axis2 = tmp2;
//test2();
//[axis2_0, axis2_22, axis2_30, axis2_45,axis2_60,axis2_90].forEach( ax=>{ axis2 = ax; test1() } );
test1();