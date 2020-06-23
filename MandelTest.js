
/*
  R = ln( exp(P) + exp(Q) )

    Qw = -cos(Pw) - cos( Qw )

    arccos( cos(Pw)+cos(Qw) ) + sin(Pw)*PN + sin(Qw)*QN 

       arccos( cos(Pw)+cos(Qw) ) + ( sin(Pw)*PN + sin(Qw)*QN ) / arcsin( sin( Pw ) + sin( Qw ) )
    if( cos(Pw) + cos(Qw) > 1 )  NaN
    else
        Rw = (p/2)-cos(Pw)-cos(Qw), sin(Pw)*PN + sin(Qw)*QN
	const sRw  = sin(Rw); // I know the real resulting angle; direction change is not a rotation.
	// scale the quaternion normal to remove the sin from the value...
	if( sRW ) {
		Rx = Rx * 1/sRw;
		Ry = Ry * 1/sRw;
		Rz = Rz * 1/sRw;
	} 
	// then, any remaining length needs to be converted to the scalar...
	const r  = Math.sqrt( Rx*Rx + Ry*Ry + Rz*Rz );
	RSx = r / Rx;
	Rx = Rx * r;
	RSy = r / Ry;
	Ry = Ry * r;
	RSz = r / Rz;
	Rz = Rz * r;
*/


const complexes = [ {a:4,b:2}, {a:7,b:0.3}, {a:0.4, b:0.2} ];

function toFrom(val) {
	console.log( "Input:", val );
	let lq = {w:0,S:1,N:1};
	const angle = Math.atan2( val.a, val.b);
	const ca = Math.cos(angle);
	const sa = Math.sin(angle);
	const w = val.a / ca;
	const scalar = val.b / sa;

	lq.w = Math.log(w); lq.S =scalar; lq.A = angle; lq.N=1;
	console.log( "Convert:", lq );
	const Q = { a: Math.exp(lq.w)*Math.cos(lq.A), b: Math.sin(lq.A)*lq.S };
	console.log( "Restore:", Q );
}

complexes.map( toFrom );

const display_scale = 1;
const _ii2_max_iter = 10;
// 0, 0
// origin point x0 and y0 variation is julia

function IsInfinite2(  _x0,  _y0,  a,  b, result_direction, subN )
{

	const lC0 = { w:0, S:1, x:0 };
        const lC1 = { w:Math.acos( a % 1 ), S: 1, x: b };
        
        lC1.x = lC1.x / Math.sin( lC1.w );
        lC1.S = lC1.x;
        lC1.x = 1;
        
	

	var x, x0, y, y0;
	var iteration = 0;
	var  max_iteration = (display_scale < 0.000001 )? 600:(display_scale < 0.001 )? 400:200;
	var xtemp;
	var direction = 1;
	var direction2 = 1;
	var _delta;
	var delta;
	var _y;

	x = _x0;
	y = _y0;
	x0 = a;
	y0 = b;

	while ( 1  &&  iteration < max_iteration )
	{
        	// A*A + B
                lC0.x = Math.sin(lC0.w)*lC0.x + Math.sin(lC1.w)*lC1.y;
                lC0.w = Math.PI/2 - Math.cos(lC0.w) - Math.cos(lC1.w);
		
                const sR = Math.sin(lC0.w);
                lC0.x /= sR;
                lC0.S = lC0.x;
                lC0.x = 1;
                
                
		subN[0]++;
		xtemp = x*x - y*y + x0;
		_y = y;
		y = 2*x*y + y0;

		delta = (xtemp - x)*(xtemp-x) + (y-_y) * (y-_y);

		if( iteration > 1 )
		{
			if( delta < 0.000000001 ) // dititally too small to see
			{
				direction = -1;
				break;
			}
			if( delta > 250 )
			{
				direction2 = 1;
				break;
			}
		}
		_delta = delta;

		x = xtemp;

		iteration = iteration + 1;
		console.log( "Iteration:", iteration, lC0, x0, y0 );
	}

	if( iteration < max_iteration && iteration > _ii2_max_iter )
		_ii2_max_iter = iteration;

	result_direction[0] = direction;
	return direction2 * ( (iteration < max_iteration)
		?(iteration * 255 / max_iteration)
		:-(iteration * 255 / max_iteration) );
}

var iters = [0];
console.log( "TEst:", IsInfinite2( 0.3, 0.4, 0, 0, [1], iters ) );