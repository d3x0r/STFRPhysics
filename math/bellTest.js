
import {lnQuat} from "../3d/src/lnQuatSq.js"


const canvas = document.getElementById( "testSurface" );
const ctx = canvas.getContext( '2d' );

const BASE_COLOR_WHITE = [255,255,255,255];
const BASE_COLOR_BLACK = [0,0,0,255];
const BASE_COLOR_RED = [255,0,0,255];
const BASE_COLOR_BLUE = [0,0,255,255];
const BASE_COLOR_YELLOW = [255,255,0,255];
const BASE_COLOR_GREEN = [0,255,0,255];

function ColorAverage( a, b, i,m) {

    var c = [ (((b[0]-a[0])*i/m) + a[0])|0,
        (((b[1]-a[1])*i/m) + a[1])|0,
        (((b[2]-a[2])*i/m) + a[2])|0,
		(((b[3]-a[3])*i/m) + a[3])|0
    ];
    //console.log( "color: ", a, b, c, i, ((b[1]-a[1])*i/m)|0, a[1], ((b[1]-a[1])*i/m) + a[1] )
    return c;//`#${(c[0]<16?"0":"")+c[0].toString(16)}${(c[1]<16?"0":"")+c[1].toString(16)}${(c[2]<16?"0":"")+c[2].toString(16)}`
}


const lnQ= new lnQuat();

const choices = [0,0,0,0];
const choices_d = [0,0,0,0];

const axis1 = [1,0,0];

const axis2_0 = [Math.cos(0),Math.sin(0),0];
const axis2_22 = [Math.cos(Math.PI/8),Math.sin(Math.PI/8),0];
const axis2_30 = [Math.cos(Math.PI/6),Math.sin(Math.PI/6),0];
const axis2_45 = [Math.cos(Math.PI/4),Math.sin(Math.PI/4),0];

//const axis2_60 = [Math.cos(Math.PI*93/300),Math.sin(Math.PI*93/300),0];   // 111.6  50% 
const axis2_60 = [Math.cos(Math.PI/3),Math.sin(Math.PI/3),0];  // 44%

const axis2_90 = [Math.cos(Math.PI/2),Math.sin(Math.PI/2),0];  // 90 degrees separation;

let axis2 = axis2_45;

const tmp = [0,0,0];
const tmp2 = [0,0,0];

function pick1(){
	let t = ( tmp[0] = Math.random()*2-1 ) * tmp[0];
        t += ( tmp[1] = Math.random()*2-1 ) * tmp[1];
        t += ( tmp[2] = Math.random()*2-1 ) * tmp[2];
        t = 1/Math.sqrt( t );
        tmp[0] *= t;
        tmp[1] *= t;
        tmp[2] *= t;
        return tmp;
}
function pick2(){
	let t = Math.random();
	let l = 0;
        //l += ( tmp[0] = Math.random()*2-1 ) * tmp[0];
        //l += ( tmp[1] = Math.random()*2-1 ) * tmp[1];
	l += ( tmp[0] = Math.cos( t * 2*Math.PI )) *tmp[0];
	l += ( tmp[1] = Math.sin( t * 2*Math.PI )) *tmp[1];
	l += ( tmp[2] = 0 ) *tmp[2];
	//l += ( tmp[2] = Math.random()*2-1 ) *tmp[2];

	t = 1/Math.sqrt(l);
        tmp[0] *= t;
        tmp[1] *= t;
        tmp[2] *= t;
        return tmp;
}
function pick3(){
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

const pick = pick2;


function getStateByChance( axis ) {    
	let s = 0;

	let dot= axis[0]*axis1[0] ;
	let chance = dot;// Math.sin( Math.PI/4 * (1+dot) );
	//chance = chance*chance;
	
	if( Math.random() < chance ) 
		s += 1;

	dot= axis[0]*axis2[0] + axis[1]*axis2[1]
	chance = dot;//Math.sin( Math.PI/4 * (1+dot) );
	//chance = chance*chance;
	if( Math.random() < chance ) 
		s += 2;
	return s;
}

function getState( axis ) {    
	let s = 0;

	if( axis[0]*axis1[0] >= 0 ) {
		//choices_d[0] += Math.sin( Math.PI/4*(1+axis[0]) );
		s += 1;
	}else{
		//choices_d[1] += Math.sin( Math.PI/4*(1+axis[0]) );
	}
	if( (axis[0]*axis2[0] + axis[1]*axis2[1]) >= 0 ) {
		//choices_d[2] += Math.sin( Math.PI/4*(1+(axis[0]*axis2[0]+axis[1]*axis2[1])) );
		s += 2;
	} else {
		//choices_d[3] += Math.sin( Math.PI/4*(1+(axis[0]*axis2[0]+axis[1]*axis2[1])) );
	}
        return s;
}


function test1() {
	let i;
	for( i = 0; i < 4; i++ ) { choices[i] = 0; choices_d[i] = 0; }

	for( i = 0; i < 200000; i++ ) {
        	const s = getState( pick() );
                choices[s]++;
        }

	return choices;	

        //console.log( "choices:", choices, choices.map( c=>(c/i)*Math.log2(c/i) ).reduce( ((acc,val)=>acc+=val),0 )+2, (choices[0]-choices[1])/i, 1-(choices[1]-choices[1]/2)/(choices[0]-choices[1]/2), choices_d );
}


let drawing = false;
let ang = -180;
        let prior_x = -1;
        let prior_y = -1;

        let prior_x_b = -1;
        let prior_y_b = -1;

        let prior_x_d = -1;
        let prior_y_d = -1;
        let prior_x_e = -1;
        let prior_y_e = -1;

        let prior_x_ed = -1;
        let prior_y_ed = -1;

function drawsomething() {


	const squareSize = 1024;

	if( !drawing ) {
		ctx.clearRect(0,0,squareSize,squareSize );
	}
	var _output = ctx.getImageData(0, 0, squareSize, squareSize );
	var output = _output.data;

	const unit=(x=>(x|0));        

	const pens = [ ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLACK, 0,9)
			,ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_BLACK, 0,9) 
			,ColorAverage( BASE_COLOR_BLUE, BASE_COLOR_BLACK, 0,9) 

	                ,ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLACK, 3,9)
			,ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_BLACK, 3,9) 
			,ColorAverage( BASE_COLOR_BLUE, BASE_COLOR_BLACK, 3,9) 

			, ColorAverage( BASE_COLOR_RED, BASE_COLOR_BLACK, 6,9)
			,ColorAverage( BASE_COLOR_GREEN, BASE_COLOR_BLACK, 6,9) 
			,ColorAverage( BASE_COLOR_BLUE, BASE_COLOR_BLACK, 6,9) 
		];


	const minScale = 0;

const maxScale = 1024;
	function plot( x_, y_, c ) {
		if( x_ < minScale || y_ < minScale ) return
		if( x_ > maxScale || y_ > maxScale ) return
		const x = unit(x_);
		const y = unit(y_);
//console.log( "Draw:", x, y );
	if(c[0] )
		output[((x+y*squareSize)<<2)+0] = c[0];
if( c[1])
		output[((x+y*squareSize)<<2)+1] = c[1];
		if(c[2])output[((x+y*squareSize)<<2)+2] = c[2];
		if(c[3])output[((x+y*squareSize)<<2)+3] = c[3];
	}

	function line( x1, y1, x2, y2, c ) {
/*
		const realX1 = unit(x1);
		const realY1 = unit(-y1);
		const realX2 = unit(x2);
		const realY2 = unit(-y2);
		const realLen = Math.sqrt( (realX2-realX1)*(realX2-realX1)  + (realY2-realY1)*(realY2-realY1) );
		x1 *= realLen;
		y1 *= realLen;
		x2 *= realLen;
		y2 *= realLen;
*/
		// scale coordinates to a unit-pixel size...

		var err, delx, dely, len, inc;
		//if( !pImage || !pImage->image ) return;
		delx = x2 - x1;
		if( delx < 0 )
			delx = -delx;
        
		dely = y2 - y1;
		if( dely < 0 )
			dely = -dely;
        
		if( dely > delx ) // length for y is more than length for x
		{
			len = dely;
			if( y1 > y2 )
			{
				var tmp = x1;
				x1 = x2;
				x2 = tmp;
				y1 = y2; // x1 is start...
			}
			if( x2 > x1 )
				inc = 1;
			else
				inc = -1;
        
			err = -(dely / 2);
			while( len >= 0 )
			{
				plot( x1, y1, c );
				y1++;
				err += delx;
				while( err >= 0 )
				{
					err -= dely;
					x1 += inc;
				}
				len--;
			}
		}
		else
		{
			if( !delx ) // 0 length line
				return;
			len = delx;
			if( x1 > x2 )
			{
				var tmp = y1;
				y1 = y2;
				y2 = tmp;
				x1 = x2; // x1 is start...
			}
			if( y2 > y1 )
				inc = 1;
			else
				inc = -1;
        
			err = -(delx / 2);
			while( len >= 0 )
			{
				plot(  x1, y1, c );
				x1++;
				err += dely;
				while( err >= 0 )
				{
					err -= delx;
					y1 += inc;
				}
				len--;
			}
		}
        
	}
	
	axis2 = tmp2;

	if( !drawing ) {
		for( let per = 0; per <= 10; per++ ) {
			line( 0, 1024-per*10.24, 1024, 1024-per*10.24, [0,0,0,255] );
	
		}
		drawing = true;
		ang = -180;
	}
	const now = Date.now();
	for( ; ang <= 180; ang++ ) {
		if( (Date.now() -now) > 100 ) break;
        	const xpos = (ang + 180)/360 * 1020 + 2;
                axis2[0] = Math.cos( ang/180*Math.PI );
                axis2[1] = Math.sin( ang/180*Math.PI );
                const valArr = test1();//getState( axis2 );
                const val = valArr[1] < valArr[0]?(1-valArr[1]/valArr[0]):(1-valArr[0]/valArr[1]);
                const ypos = 1024-(val * 1024);

		const val2 = Math.abs(Math.cos( ang/180*Math.PI ));
		const ypos_b = 1024-(val2 * 1024);

		const ypos_d = (1024 - (val?(1024 * ((val2<val)?(1-(val2/val)):(1-(val/val2)))):1024));
		
		const x = (ang / 90);
		const ax = x>1?2-x:x<-1?2+x:x;
			
		const val3 = (2-2*(Math.abs(ax)))/(2-(Math.abs(ax)));
		const ypos_e =1024- (1024 * val3 );

		const ypos_ed =(1024 - (val3?(1024 * ((val2<val3)?(1-(val2/val3)):(1-(val3/val2)))):1024));

	//console.log( "Vals:", ang, val, val2, (val?(1024 * (1-(val2/val))):1024), ypos_d );
//console.log( "line:", valArr, val, ypos, ypos_b );
                
		if( (ang %30) === 0 ) {
			line( xpos, 0, xpos, 1024, [0,0,0,255] );
		}
		
                if( prior_x > 0 ) {
                	line( prior_x, prior_y, xpos, ypos, pens[2] );

                	line( prior_x_b, prior_y_b, xpos, ypos_b, pens[1] );

                	line( prior_x_d, prior_y_d, xpos, ypos_d, pens[2] );

                	line( prior_x_e, prior_y_e, xpos, ypos_e, pens[0] );
                	line( prior_x_ed, prior_y_ed, xpos, ypos_ed, pens[0] );

		//	ctx.putImageData(_output, 0,0);

                }
                prior_x = xpos;
                prior_y = ypos;

                prior_x_b = xpos;
                prior_y_b = ypos_b;

                prior_x_d = xpos;
                prior_y_d = ypos_d;
		
                prior_x_e = xpos;
                prior_y_e = ypos_e;

                prior_x_ed = xpos;
                prior_y_ed = ypos_ed;
        }
	if( ang > 180 ) drawing = false;
	

	ctx.putImageData(_output, 0,0);
	if( drawing ) requestAnimationFrame( drawsomething);
}

try {
		drawsomething();
}catch(err) {
	alert( "GotError:"+err );
}
