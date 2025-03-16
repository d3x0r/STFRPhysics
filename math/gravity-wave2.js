
import * as rel from "./relativistic.util.js"
const canvas = document.getElementById( "testSurface" );
canvas.width = 1000;
canvas.height = 1000;
const ctx = canvas.getContext( '2d' );


const controls = document.getElementById( "controls" );

const runT = 5;
const scalars = {};
const bias = {};
const sliders = {};
const values = { planet_position: {x: 0, y:0}
		,sun_position: {x: 0, y:0}
                , planet_velocity: 0.5 
                , planet_gravity : []
		, sun_velocity: 0.5 
                , sun_gravity : []
                };
let animate = false;
const names = [];

const displacements = [];
const displacements2 = [];
for( let n = 0; n < canvas.width/10; n++ ) {
	const row = [];
	displacements.push( row );
	for( let m = 0; m < canvas.height/10; m++ ) {
		row.push( {x:0,y:0, sx:0,sy:0, f:0, sseedel:0, seedel:0} );
	}
}

for( let n = 0; n < canvas.width; n++ ) {
	const row = [];
	displacements2.push( row );
	for( let m = 0; m < canvas.height; m++ ) {
		row.push( {x:0,y:0, sx:0,sy:0, f:0, sseedel:0, seedel:0} );
	}
}

const B_0 = (l,x,y,w) =>{ const xx=x*x; const yy=y*y; return (l/Math.sqrt(xx+yy) * Math.sqrt(xx+yy+( w*w)))/Math.sqrt(xx+yy+w*w) * Math.sqrt(xx+yy+w*w) };

function angleOf( x, y ) {
	return Math.atan2( y, x );
}

function displace( now) {

	const s = -Math.sin( values.Direction );
	const c = Math.cos( values.Direction );
	values.sun_position.x = ( 0 + values.Now * values.Velocity * c ) * values.Scale;
	values.sun_position.y = ( 0 + values.Now * values.Velocity * s ) * values.Scale;

	const planet_direction = values.Now * values.OrbitVelocity;
	const pf = rel.freqShift2( -planet_direction, 0, -values.Velocity, values.C );
	const ps = -Math.sin( planet_direction +values.Direction);
	const pc = Math.cos( planet_direction +values.Direction);

	values.planet_position.x = values.sun_position.x + (values.Orbit * pc) * pf*values.Scale;
	values.planet_position.y = values.sun_position.y + (values.Orbit * ps) * pf*values.Scale;

	const lengthContract = Math.sqrt( values.C*values.C - values.Velocity*values.Velocity ) / values.C;
if(0)
	for( let y = 0; y < displacements.length; y++ ) {
		const gy = y * 10 - 500;
		const row = displacements[y];
		rel.params.C = values.C * values.Scale;
		for( let x = 0; x < row.length; x++ ) {

			const gx = x * 10 - 500;
			//const xx=x*x; 

			// scaling by lengthContract makes this velocity invariant.
			const f= row[x].f = rel.freqShift2( angleOf( gx, gy), 0, values.Velocity, values.C )/lengthContract;
			
			const seetime = rel.RealTime2( 0, {x:values.Velocity*c,y:values.Velocity*s, z:0}
								, {x:now*values.Velocity*c*values.Scale,y:now*values.Velocity*s*values.Scale, z:0}
								, {x:values.Velocity*c,y:values.Velocity*s, z:0}, {x:gx, y:gy, z:0} );
			//console.log( "see Time:", seetime, now, gx, gy );
	//		const dist = Math.sqrt( gx*gx + gy*gy );
			const seedel = seetime[0]-0;
			// actual sun position...
			row[x].sx = (values.sun_position.x+values.Velocity*c* seedel*values.Scale);
			row[x].sy = (values.sun_position.y+values.Velocity*s* seedel*values.Scale);
			row[x].sseedel = seedel;
			//const realLen = Math.sqrt((row[x].sx-gx)*(row[x].sx-gx)+(row[x].sy-gy)*(row[x].sy-gy))/values.Scale;

			const ago = -seedel;//ll / (100*values.C);

		const pdel = Math.sqrt((values.planet_position.x - gx ) * ( values.planet_position.x-gx) + (values.planet_position.y-gy)*(values.planet_position.y-gy)) / (values.Scale*values.C);

	const pnow = values.Now - pdel;

	const planet_direction = (pnow) * values.OrbitVelocity;
	const ps = -Math.sin( planet_direction );
	const pc = Math.cos( planet_direction );

	const px = ( 0 + pnow * values.Velocity * c ) * values.Scale + (values.Orbit * pc) * values.Scale;
	const py = ( 0 + pnow * values.Velocity * s ) * values.Scale + (values.Orbit * ps) * values.Scale;


			const seetimePlanet = rel.RealTime2( 0, {x:values.Velocity*c,y:values.Velocity*s, z:0}
				, {x:px //+ now*values.Velocity*c*values.Scale
				  ,y:py //+ now*values.Velocity*s*values.Scale
				  , z:0}
				, {x:0, y:0, z:0}, {x:gx, y:gy, z:0} );
			const agoPlanet = -seetimePlanet[0];
			row[x].seedel = agoPlanet;//realLen;//agoPlanet;
			//console.log( "ago:", ago, gx, gy, (values.sun_position.x-ago*values.Velocity*c*values.Scale), x, y );
				const Ax = B_0(gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale), values.Scale*values.SunSize )
				         + (values.sun_position.x-ago*values.Velocity*c*values.Scale);
				const Ay = B_0(gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale)
				              ,gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale), values.Scale*values.SunSize )
				         + values.sun_position.y-ago*values.Velocity*s*values.Scale;

				const Bx = B_0(Ax-(px)
				              ,Ax-(px)
				              ,Ay-(py)
				              ,200*planetSize ) 
				         + (px);
				const By = B_0(Ay-(py)
				              ,Ax-(px)
				              ,Ay-(py)
				              ,200*planetSize ) 
				         + (py);

				row[x].x = Bx;
				row[x].y = By;
			}
	}

	for( let y = 0; y < displacements2.length; y++ ) {
		const gy = y - 500;
		const row = displacements2[y];
		rel.params.C = values.C * values.Scale;
		for( let x = 0; x < row.length; x++ ) {
			const gx = x - 500;
			//const xx=x*x; 

			const seetime = rel.RealTime2( 0, {x:values.Velocity*c,y:values.Velocity*s, z:0}
								, {x:now*values.Velocity*c*values.Scale,y:now*values.Velocity*s*values.Scale, z:0}
								, {x:0, y:0, z:0}, {x:gx, y:gy, z:0} );
			//console.log( "see Time:", seetime, now, gx, gy );
			const seedel = seetime[0];
			// actual sun position...
			row[x].sx = (values.sun_position.x+values.Velocity*c* seedel*values.Scale);
			row[x].sy = (values.sun_position.y+values.Velocity*s* seedel*values.Scale);
			row[x].seedel = seedel;
			const realLen = Math.sqrt((row[x].sx-gx)*(row[x].sx-gx)+(row[x].sy-gy)*(row[x].sy-gy))/values.Scale;

			const ago = -seedel;//ll / (100*values.C);

		const pdel = Math.sqrt((values.planet_position.x - gx ) * ( values.planet_position.x-gx) + (values.planet_position.y-gy)*(values.planet_position.y-gy)) / values.C;

	const pnow = values.Now - pdel;

	const planet_direction = (pnow) * values.OrbitVelocity;
	const ps = -Math.sin( planet_direction );
	const pc = Math.cos( planet_direction );

	const px = ( 0 + pnow * values.Velocity * c ) * values.Scale + (values.Orbit * pc) * values.Scale;
	const py = ( 0 + pnow * values.Velocity * c ) * values.Scale + (values.Orbit * ps) * values.Scale;

			const seetimePlanet = rel.RealTime2( 0, {x:values.Velocity*c,y:values.Velocity*s, z:0}
				, {x:px //+ now*values.Velocity*c*values.Scale
				  ,y:py //+ now*values.Velocity*s*values.Scale
				  , z:0}
				, {x:0, y:0, z:0}, {x:gx, y:gy, z:0} );
			const agoPlanet = -seetimePlanet[0];
			row[x].seedel = agoPlanet;//realLen;//agoPlanet;
			//console.log( "ago:", ago, gx, gy, (values.sun_position.x-ago*values.Velocity*c*values.Scale), x, y );
				const Ax = B_0(gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale), values.Scale*values.SunSize )
				         + (values.sun_position.x-ago*values.Velocity*c*values.Scale);
				const Ay = B_0(gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale)
				              ,gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale), values.Scale*values.SunSize )
				         + values.sun_position.y-ago*values.Velocity*s*values.Scale;

				const Bx = B_0(Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,values.Scale*planetSize ) 
				         + (values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale);
				const By = B_0(Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,values.Scale*planetSize ) 
				         + (values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale);

				row[x].x = Bx;
				row[x].y = By;
			}
	}


}



// V=0.502
// VP=6.440

// VP=4.440
// LSL=259
// V=0.502

// VP 9.680
// V=0.4
// orbit 0.4 

addSpan( "C", 1000, 1, 0, 2/1000, "C" );
addSpan( "Light Second Length", 1000, 573, 0, 1, "Scale" );
addSpan( "Velocity", 1000, 0.4, 0, 2/1000, "Velocity" );
addSpan( "Direction", 1000, 0, 0, (Math.PI*2)/1000, "Direction", (val)=>(val/Math.PI).toFixed(3)+"pi" );
addSpan( "Orbit", 400, 0.65, 0, 1/100, "Orbit" );
addSpan( "Orbit Velocity", 400, 0.4, 0, 1/100, "OrbitVelocity" );
addSpan( "SunSize", 400, 0.060, 0, 1/100, "SunSize" );
addSpan( "Now", 1000, -1, -runT/2, runT/1000, "Now" );
addSpan( "G", 10000, 0.018, 0.00001, 1/500, "G" );
addSpan( "VPlanet", 1000, 18.2, -100, 1/5, "VP" );
addSpan( "VPlanetX", 1000, 4.98, -10, 1/50, "VPX" );

//const sunSize = 0.5;
const planetSize = 0.1;

update();
function addSpan( text, range, initial, bias_, scalar, suffix ) {

	values[suffix] = initial;
	scalars[suffix] = scalar;
	bias[suffix] = bias_;
	let span;


	names.push( suffix );

	span = document.createElement( "span" );
	span.textContent = text;
	controls.appendChild( span );

	const sliderC = document.createElement( "input" );
	sliders["slider"+suffix] = sliderC;
	sliderC.setAttribute( "type", "range" );
	controls.appendChild( sliderC );
	sliderC.addEventListener( "input", update );
	sliderC.setAttribute( "max", range );
	sliderC.value = (values[suffix] - bias_)/ scalar ;
	sliderC.style.width="250px";

	const spanC = document.createElement( "span" );
	sliders["span"+suffix] = spanC;
	spanC.textContent = values[suffix].toFixed(3);
	controls.appendChild( spanC );

	span = document.createElement( "br" );
	controls.appendChild( span );

}

function sliderRead( suffix ) {
	const val = bias[suffix] + (sliders["value"+suffix] = Number( sliders["slider"+suffix].value )) * scalars[suffix];
	values[suffix] = val;
	sliders["span"+suffix].textContent = val.toFixed(3);
}


function update() {
	for( let name of names ) {
		sliderRead( name );
	}
        //values.OrbitVelocity = values.Velocity * 3;
	const nowTick = sliders.valueNow;
	values.nowTick = nowTick;

	values.planet_gravity.length = 0;
	values.sun_gravity.length = 0;

	for( let n = 0; n < nowTick; n++ ) {
		const now = n *scalars.Now + bias.Now;
		const s = -Math.sin( values.Direction );
		const c = Math.cos( values.Direction );
	        const sx = now * values.Velocity * c * values.Scale;
        	const sy = now * values.Velocity * s * values.Scale;

		const planet_direction = now * values.OrbitVelocity;
		const ps = -Math.sin( planet_direction );
		const pc = Math.cos( planet_direction );

		const px = sx + values.Orbit * pc * values.Scale;
		const py = sy + values.Orbit * ps * values.Scale;

		values.sun_gravity.push( {x:sx, y:sy } );
		values.planet_gravity.push( {x:px, y:py } );
	}

	const s = -Math.sin( values.Direction );
	const c = Math.cos( values.Direction );
        values.sun_position.x = values.Now * values.Velocity * c * values.Scale;
        values.sun_position.y = values.Now * values.Velocity * s * values.Scale;

		const planet_direction = values.Now * values.OrbitVelocity/2*Math.PI;
		const pf = rel.freqShift2( -planet_direction + values.Direction, 0, -values.Velocity, values.C );
		const ps = -Math.sin( planet_direction + values.Direction );
		const pc = Math.cos( planet_direction + values.Direction );

        values.planet_position.x = values.sun_position.x + values.Orbit * pf*pc * values.Scale;
        values.planet_position.y = values.sun_position.y + values.Orbit * pf*ps * values.Scale;

	if( !animate )
		draw();
}

function draw() {
	displace( values.Now );
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	const lengthContract = Math.sqrt( values.C*values.C - values.Velocity*values.Velocity ) / values.C;
	sliders["span"+"C"].textContent = values.C.toFixed(3) + "("+lengthContract.toFixed(3)+")";
	if(0)
	for( let y = 0; y < displacements.length; y++ ) {
		const row = displacements[y];
		for( let x = 0; x < row.length; x++ ) {
			ctx.beginPath();
			ctx.fillStyle = `hsl(0,0%,${Math.sqrt((x-50)*(x-50)*100+(y-50)*(y-50)*100)/ 8}%)`;
			//ctx.fillRect( x*10-2, y*10-2, 4, 4 );
			
		}
	}

	for( let r = 0.25; r < 2; r+=0.25) {
		let first = true;
		ctx.beginPath();
		ctx.strokeStyle = "white";
		for( let t = 0; t < Math.PI*2; t += Math.PI/180 ) {
			const f = rel.freqShift2( t, 0, values.Velocity, values.C )/lengthContract;
			const x = 500+values.sun_position.x+ Math.cos( t ) * f*r * values.Scale*lengthContract;
			const y = 500+values.sun_position.y+Math.sin( t ) * f*r*values.Scale;
			if( x < 0 || x >= (canvas.width-1)) continue;
			if( y < 0 || y >= (canvas.height-1) ) continue;
			/*
			const dx1 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)].x;
			const dy1 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)].y;
			const dx2 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)+1].x;
			const dy2 = displacements2[Math.floor((y)/1)+1][Math.floor((x)/1)].y;
			const ddx = (dx2-dx1)*((((x))/1)%1);
			const ddy = (dy2-dy1)*((((y))/1)%1);
			*/
			if( first ) {
				ctx.moveTo( x, y );
				first = false;
			}else
				ctx.lineTo( x, y );
		}
		ctx.stroke();
	}

	if( 1 ) // this is the projected orbit....
	{
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.lineWidth = 3;
	for( let t = 0; t < Math.PI*2; t += Math.PI/60 ) {
		const abf = rel.aberration_angle_from_angles( t, 0, values.Velocity, values.C );
		const ab = rel.aberration_inverse_angle( t, 0, values.Velocity, values.C );
		const f = rel.freqShift2( ab, 0,- values.Velocity, values.C );
		const x = 500+values.sun_position.x+ Math.cos( t - values.Direction) * values.Orbit*f* values.Scale;
		const y = 500+values.sun_position.y+Math.sin( t - values.Direction) * values.Orbit*f*values.Scale;

		if( x < 0 || x >= (canvas.width-1)) continue;
		if( y < 0 || y >= (canvas.height-1) ) continue;
		if( !t ) {
			ctx.moveTo( x, y );
		}else
			ctx.lineTo( x, y );
	}
	ctx.closePath();
	ctx.stroke();
	}
	ctx.lineWidth = 1;

if(0) {
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.lineWidth = 3;
	for( let t = 0; t < Math.PI*2; t += Math.PI/60 ) {
		const ab = rel.aberration_inverse_angle( t, 0, -values.Velocity, values.C );
		const f = rel.freqShift2( ab, 0, -values.Velocity, values.C );
		const x = 500+values.sun_position.x+ Math.cos( ab  - values.Direction) * values.Orbit*f* values.Scale;
		const y = 500+values.sun_position.y+Math.sin( ab  - values.Direction) * values.Orbit*f*values.Scale;
		if( x < 0 || x >= (canvas.width-1)) continue;
		if( y < 0 || y >= (canvas.height-1) ) continue;
			ctx.moveTo( 500, 500 );
			ctx.lineTo( x, y );
	}
	ctx.stroke();
	ctx.lineWidth = 1;
}

	const fdown = rel.freqShift2( Math.PI/2, 0, values.Velocity, values.C );
	let prior={x:500+values.sun_position.x,y:values.sun_position.y+500+values.Orbit*values.Scale*fdown
				, dx:0+values.VP,dy:0+values.VPX
				, ddx:0, ddy:0 };

				ctx.moveTo( 0, 500+fdown*values.Orbit*values.Scale );
				ctx.lineTo( 1000, 500+fdown*values.Orbit*values.Scale );
		ctx.stroke();
		ctx.fillRect( prior.x-4, prior.y-4, 9, 9 );
				if(0)

		
				for( let x = 0; x < 10; x++ ) {
		ctx.moveTo( 500+x*fdown*10, 500 );
		ctx.lineTo( 500+x*fdown*10, 700 );
		ctx.stroke();
	}

	for( let t = 0; t < Math.PI*2*50; t += Math.PI/60 ) {
		const abf = rel.aberration_angle_from_angles( t, 0, values.Velocity, values.C );
		const ab2f = rel.aberration_angle_from_angles( t+Math.PI/60, 0, values.Velocity, values.C );

		const f = rel.freqShift2( abf, 0, values.Velocity, values.C );
		const x = Math.cos( abf ) * 1/((1/f*values.Orbit)*(1/f*values.Orbit)) * values.Scale*0.1;
		const y = Math.sin( abf ) * 1/((1/f*values.Orbit)*(1/f*values.Orbit))*values.Scale*0.1;

		const a = Math.atan2( prior.y-(500+values.sun_position.y), prior.x-(values.sun_position.x+500) );
		const abf2 = rel.aberration_angle_from_angles( a, 0, values.Velocity, values.C );
		const fat = rel.freqShift2( a, 0, values.Velocity, values.C );
		const delpx = (prior.x-(500+values.sun_position.x))/values.Scale;
		const delpy = (prior.y-(500+values.sun_position.y))/values.Scale;
		const delp = Math.sqrt( delpx*delpx+delpy*delpy );
		//const x2 = Math.cos( Math.PI+a ) * 1/((1/fat*delp)*(1/fat*delp)) * values.Scale*0.1;
		//const y2 = Math.sin( Math.PI+a ) * 1/((1/fat*delp)*(1/fat*delp))*values.Scale*0.1;
		const x2 = Math.cos( Math.PI+a ) * 1/(/*(1/fat*values.Orbit)**/(1/fat*values.Orbit)) * values.Scale*0.1;
		const y2 = Math.sin( Math.PI+a ) * 1/(/*(1/fat*values.Orbit)**/(1/fat*values.Orbit))*values.Scale*0.1;

		ctx.beginPath();
		ctx.strokeStyle = "green";
		ctx.moveTo( (t)*30/10, 0 );
		ctx.lineTo( (t)*30/10, delp*100 );
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "green";
		ctx.lineWidth=3;
		ctx.moveTo( 0, 400 );
		ctx.lineTo( 1000, 400 );
		ctx.stroke();
if(0) {
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.strokeStyle = "blue";
		ctx.moveTo( t*30/10+1, 0 );
		ctx.lineTo( t*30/10+1, values.Orbit * 100*5 / fat );
		ctx.stroke();
}

		const heredx = prior.dx + x2  /(values.G*10000);
		const heredy = prior.dy + y2 /(values.G*10000);
		prior.ddx = x2;
		prior.ddy = y2;
		const herex = prior.x + heredx;
		const herey = prior.y + heredy;
		// x * f = x'
		// x = x'/f  //
if(0) {
			ctx.beginPath();
			ctx.strokeStyle = "green";
			ctx.moveTo( prior.x, prior.y );
			ctx.lineTo( 500+values.sun_position.x+x, 500+values.sun_position.y+y );
			ctx.stroke();
}
if(0) {
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo( prior.x, prior.y );
			ctx.lineTo( prior.x + (500+values.sun_position.x+x)-prior.x
					    ,prior.y + (500+values.sun_position.y+y)-prior.y );
			ctx.stroke();
}

if(0) {
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo( prior.x, prior.y );
			//ctx.lineTo( prior.x+prior.dx*values.Scale/20, prior.x+prior.dy*values.Scale/20 );
			ctx.lineTo( prior.x+(heredx-prior.dx)*values.Scale*0.2, prior.y+(heredy-prior.dy)*values.Scale*0.2 );
			ctx.stroke();

			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo( t*30+2
					  , 0 );
			ctx.lineTo( t*30+2
						, 1/((1/fat*values.Orbit)*(1/fat*values.Orbit))*100);//Math.sqrt(((heredx-prior.dx)*(heredx-prior.dx)+(heredy-prior.dy)*(heredy-prior.dy)))*500 );
			ctx.stroke();
	
}

			ctx.beginPath();
			ctx.strokeStyle = "purple";
			ctx.moveTo( (prior.x-500-values.sun_position.x)*lengthContract+500+values.sun_position.x, prior.y );
			ctx.lineTo( (herex-500-values.sun_position.x)*lengthContract+500+values.sun_position.x, herey );
			ctx.stroke();

			prior.x = herex;
		prior.y = herey;
		prior.dx = heredx;
		prior.dy = heredy;
	}

if(0){  // bad manual orbit.
	ctx.beginPath();
	ctx.strokeStyle = "green";
	for( let t = 0; t < Math.PI*2; t += Math.PI/60 ) {
		const abf = rel.aberration_angle_from_angles( t, 0, values.Velocity, values.C );
		const ab = rel.aberration_inverse_angle( t, 0, values.Velocity, values.C );
		const f = rel.freqShift2( ab, 0, -values.Velocity, values.C );
		const dx =  Math.cos( abf  - values.Direction) ;
		const dy = Math.sin( abf  - values.Direction);
		const dxf =  Math.cos( abf  - values.Direction) ;
		const dyf = Math.sin( abf  - values.Direction);

		const x = 500+values.sun_position.x+ dxf * values.Orbit*f* values.Scale;
		const y = 500+values.sun_position.y+ dyf * values.Orbit*f*values.Scale;

		const ab2f = rel.aberration_angle_from_angles( t+Math.PI/60, 0, values.Velocity, values.C );
		const ab2 = rel.aberration_inverse_angle( t+Math.PI/60, 0, values.Velocity, values.C );
		const f2 = rel.freqShift2( ab2, 0, -values.Velocity, values.C );
		const dx2 =  Math.cos( ab2f  - values.Direction) ;
		const dy2 = Math.sin( ab2f  - values.Direction);

		const x2 = 500+values.sun_position.x+ dx2 * values.Orbit*f2* values.Scale;
		const y2 = 500+values.sun_position.y+ dy2 * values.Orbit*f2*values.Scale;

		const ab0f = rel.aberration_angle_from_angles( t-Math.PI/60, 0, values.Velocity, values.C );
		const ab0 = rel.aberration_inverse_angle( t-Math.PI/60, 0, values.Velocity, values.C );
		const f0 = rel.freqShift2( ab0, 0, -values.Velocity, values.C );
		const dx0 =  Math.cos( ab0f  - values.Direction) ;
		const dy0 = Math.sin( ab0f  - values.Direction);

		const x0 = 500+values.sun_position.x+ dx0 * values.Orbit*f0* values.Scale;
		const y0 = 500+values.sun_position.y+ dy0 * values.Orbit*f0*values.Scale;

		const a = (ab2f-abf)*(f+f2)/2;

		const dx01 = x-x0;
		const dy01 = y-y0;

		const dx12 = x2-x;
		const dy12 = y2-y;

		const dax = dx12-dx01;
		const day = dy12-dy01;

		if(0) {
		ctx.beginPath();
		ctx.moveTo( t*100, 0 );
		ctx.lineTo( t*100, a*5000 );
		ctx.stroke();
		}
		if(0) {
			// acceleration length
		ctx.beginPath();
		ctx.strokeStyle = "red";
		ctx.moveTo( t*100
				  , 0 );
		ctx.lineTo( t*100
					, (((x2-x)-dx01)*((x2-x)-dx01)+((y2-y)-dy01)*((y2-y)-dy01))*10000 );
		ctx.stroke();
		}
		if(0) {
			// basic position?
			ctx.beginPath();
			ctx.strokeStyle = "red";		
			ctx.moveTo( 500+values.sun_position.x
					  , 500+values.sun_position.y );
			ctx.lineTo( 500+values.sun_position.x+(values.Orbit * dxf*(f) )*values.Scale
						, 500+values.sun_position.y+(values.Orbit * dyf*(f) )*values.Scale );
			ctx.stroke();
			}
	
		if(0) {
		ctx.beginPath();
		ctx.strokeStyle = "red";		
		ctx.moveTo( 500+values.sun_position.x
				  , 500+values.sun_position.y );
		ctx.lineTo( 500+values.sun_position.x+(values.Orbit * dx*1/(f*f) )*values.Scale
					, 500+values.sun_position.y+(values.Orbit * dy*1/(f*f) )*values.Scale );
		ctx.stroke();
		}
if(1) { // tangent
		ctx.beginPath();
		ctx.strokeStyle = "green";
		ctx.moveTo( 500+values.sun_position.x+(values.Orbit * dx*f )*values.Scale
				  , 500+values.sun_position.y+(values.Orbit * dy*f )*values.Scale );
		ctx.lineTo( 500+values.sun_position.x+(values.Orbit * dx*f )*values.Scale+ (x2-x)*10
					, 500+values.sun_position.y+(values.Orbit * dy*f )*values.Scale+ (y2-y)*10 );
		ctx.stroke();
}


if(1) { // tangent
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.moveTo( 500+values.sun_position.x+(values.Orbit * (dx)*f )*values.Scale
			  , 500+values.sun_position.y+(values.Orbit * (dy)*f )*values.Scale );
	ctx.lineTo( 500+values.sun_position.x+(values.Orbit * (dx)*f )*values.Scale+ (dax)*0.4*values.Scale
				, 500+values.sun_position.y+(values.Orbit * (dy)*f )*values.Scale+ (day)*0.4*values.Scale );
	ctx.stroke();
}

		if(0) {
			ctx.beginPath();
			ctx.moveTo( t*100, 700+0 );
			ctx.lineTo( t*100, 700+(ab-ab2)*5000 );
			ctx.stroke();
		}
		if( x < 0 || x >= (canvas.width-1)) continue;
		if( y < 0 || y >= (canvas.height-1) ) continue;
	}
}

	ctx.stroke();
	ctx.lineWidth = 1;

	for( let r = 0.25; r < 2; r+=0.25) {
		let first = true;
		ctx.beginPath();
		ctx.strokeStyle = "white";
		for( let t = 0; t < Math.PI*2; t += Math.PI/180 ) {
			const f = rel.freqShift2( t, 0, -values.Velocity, values.C )/lengthContract;
			const x = 500+values.sun_position.x+ Math.cos( t ) * f*r * values.Scale*lengthContract;
			const y = 500+values.sun_position.y+Math.sin( t ) * f*r*values.Scale;
			if( x < 0 || x >= (canvas.width-1)) continue;
			if( y < 0 || y >= (canvas.height-1) ) continue;
			/*
			const dx1 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)].x;
			const dy1 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)].y;
			const dx2 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)+1].x;
			const dy2 = displacements2[Math.floor((y)/1)+1][Math.floor((x)/1)].y;
			const ddx = (dx2-dx1)*((((x))/1)%1);
			const ddy = (dy2-dy1)*((((y))/1)%1);
			*/
			if( first ) {
				ctx.moveTo( x, y );
				first = false;
			}else
				ctx.lineTo( x, y );
		}
		ctx.stroke();
	}

if(0)
	for( let y = 0; y < displacements.length; y++ ) {
		const row = displacements[y];
		const row1 = displacements[y+1];
		if( !row1 ) continue;
		for( let x = 0; x < row.length; x++ ) {
			if( x < 0 || x >= canvas.width) continue;
			if( y < 0 || y >= canvas.height ) continue;
			const d = row[x];
			const d1 = row1[x];
			const d2 = row[x+1];
			const dx = (x-50)*10;
			const dy = (y-50)*10;
//			const len = Math.sqrt( dx*dx + dy*dy );
//			if( len >= 180 && len <= 200  ) {
//				ctx.fillRect( 500+dx*d.f*lengthContract-1, 500+dy*d.f-1, 3, 3 );
//			}
			
/*
		if( (x % 5)==0 && (y%5)==0) {
			ctx.beginPath();
			ctx.strokeStyle= "yellow";
			ctx.moveTo( ((x-50)*10)+500, ((y-50)*10)+500 );
			ctx.lineTo( 500+ row[x].sx-1, 500+row[x].sy );
			ctx.stroke();           
		}
*/
//			ctx.fillRect(502+ row[x].sx-1, 502+row[x].sy-1, 3, 3 );
			if( !d2 ) continue;

			if( y < displacements.length-1 ) {
				ctx.beginPath();
				ctx.strokeStyle = "green";
				ctx.moveTo( ((x-50)*10)+1*(d.x-((x-50)*10))+500, ((y-50)*10)+1*(d.y-((y-50)*10))+500 );
				ctx.lineTo( ((x-50)*10)+1*(d1.x-((x-50)*10))+500, ((y-50)*10)+1*(d1.y-((y-50)*10))+500 );
				ctx.stroke();
			}
			if( x < row.length-1 ){
				ctx.beginPath();
				ctx.strokeStyle = "blue";
				ctx.moveTo( ((x-50)*10)+1*(d.x-((x-50)*10))+500, ((y-50)*10)+1*(d.y-((y-50)*10))+500 );
				ctx.lineTo( ((x-50)*10)+1*(d2.x-((x-50)*10))+500, ((y-50)*10)+1*(d2.y-((y-50)*10))+500 );
				ctx.stroke();
			}

			if(0) {
				// time of travel
				ctx.beginPath();
				ctx.fillStyle = `hsl(${((120/180*Math.PI)*Math.abs(d.sseedel)%3)*360},100%, 50%)`;
				ctx.fillRect( ((x-50)*10)+500, ((y-50)*10)+500, 2, 2 );
			}
			if(0) {
				// time of travel
				ctx.beginPath();
				ctx.fillStyle = `hsl(${((120/180*Math.PI)*Math.abs(displacements2[x][y].seedel)%3)*360},100%, 50%)`;
				ctx.fillRect( ((x-50)*10)+500+3, ((y-50)*10)+500, 2, 2 );
			}

		}
	}
if(0)
	for( let y = 0; y < displacements.length; y++ ) {
		const row = displacements[y];
		const row1 = displacements[y+1];
		if( !row1 ) continue;
		for( let x = 0; x < row.length; x++ ) {
			const d = row[x];
			const d1 = row1[x];
			const d2 = row[x+1];
			if( !d2 ) continue;

			if( x & 1 && y & 1 ) {
			ctx.beginPath();
			ctx.strokeStyle = "red";
			ctx.moveTo( ((x-50)*10)+500, ((y-50)*10)+500 );
			ctx.fillRect( ( (x-50)*10)+500, ((y-50)*10)+500, 4, 4 );
			ctx.lineTo( d.sx, d.sy );
			ctx.stroke();
			}
if(0) {
			if( y < displacements.length-1 ) {
				ctx.beginPath();
				ctx.strokeStyle = "green";
				ctx.moveTo( ((x-50)*10)+1*(d.x-((x-50)*10))+500, ((y-50)*10)+1*(d.y-((y-50)*10))+500 );
				ctx.lineTo( ((x-50)*10)+1*(d1.x-((x-50)*10))+500, ((y-50)*10)+1*(d1.y-((y-50)*10))+500 );
				ctx.stroke();
			}
			if( x < row.length-1 ){
				ctx.beginPath();
				ctx.strokeStyle = "blue";
				ctx.moveTo( ((x-50)*10)+1*(d.x-((x-50)*10))+500, ((y-50)*10)+1*(d.y-((y-50)*10))+500 );
				ctx.lineTo( ((x-50)*10)+1*(d2.x-((x-50)*10))+500, ((y-50)*10)+1*(d2.y-((y-50)*10))+500 );
				ctx.stroke();
			}
		}
		}
	}



	if(1) {  // draw sun and planet
		ctx.beginPath();
		ctx.fillStyle = "yellow";
		ctx.strokeStyle = "yellow";
		ctx.ellipse( 500 + values.sun_position.x, 500 + values.sun_position.y, values.SunSize*values.Scale/3*lengthContract, values.SunSize*values.Scale/3, -values.Direction, 0, Math.PI*2 );
		//ctx.arc( 500 + values.sun_position.x, 500 + values.sun_position.y, values.SunSize*values.Scale/3, 0, Math.PI*2 );
		ctx.fill();
		for( let r = 0; r < 2; r+= 0.1) {
			ctx.arc( 500 + values.sun_position.x-r*values.Velocity*values.Scale, 500 + values.sun_position.y, values.Scale*r, 0, Math.PI*2 );
			ctx.stroke();
		}

		if(0) { // draw planet
		ctx.beginPath();
        ctx.fillStyle = "green";
        //ctx.arc( 500 + values.planet_position.x, 500 + values.planet_position.y, planetSize*values.Scale, 0, Math.PI*2 );
        ctx.ellipse( 500 + values.planet_position.x, 500 + values.planet_position.y, planetSize*values.Scale*lengthContract,planetSize*values.Scale, -values.Direction, 0, Math.PI*2 );
        ctx.fill();
		}
	}
if(0)
	for( let i = 0; i < values.sun_gravity.length; i++ ) {
		const sg = values.sun_gravity[i];
		const pg = values.planet_gravity[i];
		const now = (sliders.valueNow - i)*scalars.Now;
		ctx.beginPath();
		ctx.strokeStyle = "hsl(0%,0%,"+(100-(values.SunSize + now*values.C)*100/(values.SunSize + (sliders.valueNow)*scalars.Now*values.C))+"%)";
		ctx.arc( 500 + sg.x, 500 + sg.y, (values.SunSize + now * values.C)* values.Scale, 0, Math.PI*2 );
		ctx.stroke();

		ctx.beginPath();
		const c2 = "hsl(0,0%,"+(100-(planetSize + now * values.C)*100/(planetSize + (sliders.valueNow)*scalars.Now*values.C)).toFixed(2)+"%)";
		//console.log( "distance = ", (100-(planetSize + now * values.C)*100/(planetSize + runT*values.C)), c2 )
		ctx.strokeStyle = c2;//"hsl(0,0,"+(100-(planetSize + now * values.C)*100/(planetSize + runT*values.C)).toFixed(2)+"%)";
		ctx.arc( 500 + pg.x, 500 + pg.y, (planetSize + now * values.C)* values.Scale, 0, Math.PI*2 );
		ctx.stroke();
	}
}
