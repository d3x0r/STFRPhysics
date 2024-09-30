
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
		row.push( {x:0,y:0, sx:0,sy:0, seedel:0} );
	}
}

for( let n = 0; n < canvas.width; n++ ) {
	const row = [];
	displacements2.push( row );
	for( let m = 0; m < canvas.height; m++ ) {
		row.push( {x:0,y:0, sx:0,sy:0, seedel:0} );
	}
}

const B_0 = (l,x,y,w) =>{ const xx=x*x; const yy=y*y; return (l/Math.sqrt(xx+yy) * Math.sqrt(xx+yy+( w*w)))/Math.sqrt(xx+yy+w*w) * Math.sqrt(xx+yy+w*w) };

function displace( now) {

	const s = -Math.sin( values.Direction );
	const c = Math.cos( values.Direction );
	values.sun_position.x = ( 0 + values.Now * values.Velocity * c ) * values.Scale;
	values.sun_position.y = ( 0 + values.Now * values.Velocity * s ) * values.Scale;
	const planet_direction = values.Now * values.OrbitVelocity;
	const ps = -Math.sin( planet_direction );
	const pc = Math.cos( planet_direction );

	values.planet_position.x = values.sun_position.x + (values.Orbit * pc) * values.Scale;
	values.planet_position.y = values.sun_position.y + (values.Orbit * ps) * values.Scale;


	for( let y = 0; y < displacements.length; y++ ) {
		const gy = y * 10 - 500;
		const row = displacements[y];
		rel.params.C = values.C * values.Scale;
		for( let x = 0; x < row.length; x++ ) {
			const gx = x * 10 - 500;
			//const xx=x*x; 

			const seetime = rel.RealTime2( 0, {x:values.Velocity*c,y:values.Velocity*s, z:0}
								, {x:now*values.Velocity*c*values.Scale,y:now*values.Velocity*s*values.Scale, z:0}
								, {x:0, y:0, z:0}, {x:values.Velocity*c,y:values.Velocity*s, z:0}, {x:gx, y:gy, z:0} );
			//console.log( "see Time:", seetime, now, gx, gy );
			const seedel = seetime[0]-0;
			// actual sun position...
			row[x].sx = (values.sun_position.x+values.Velocity*c* seedel*values.Scale);
			row[x].sy = (values.sun_position.y+values.Velocity*s* seedel*values.Scale);
			row[x].seedel = seedel;
			const realLen = Math.sqrt((row[x].sx-gx)*(row[x].sx-gx)+(row[x].sy-gy)*(row[x].sy-gy))/values.Scale;

			const ago = -seedel;//ll / (100*values.C);

			const seetimePlanet = rel.RealTime2( 0, {x:values.Velocity*c,y:values.Velocity*s, z:0}
				, {x:values.planet_position.x //+ now*values.Velocity*c*values.Scale
				  ,y:values.planet_position.y //+ now*values.Velocity*s*values.Scale
				  , z:0}
				, {x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:gx, y:gy, z:0} );
			const agoPlanet = -seetimePlanet[0];
			row[x].seedel = realLen;//agoPlanet;
			//console.log( "ago:", ago, gx, gy, (values.sun_position.x-ago*values.Velocity*c*values.Scale), x, y );
				const Ax = B_0(gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale), 300*sunSize )
				         + (values.sun_position.x-ago*values.Velocity*c*values.Scale);
				const Ay = B_0(gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale)
				              ,gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale), 300*sunSize )
				         + values.sun_position.y-ago*values.Velocity*s*values.Scale;

				const Bx = B_0(Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,200*planetSize ) 
				         + (values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale);
				const By = B_0(Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,200*planetSize ) 
				         + (values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale);

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
								, {x:0, y:0, z:0}, {x:values.Velocity*c,y:values.Velocity*s, z:0}, {x:gx, y:gy, z:0} );
			//console.log( "see Time:", seetime, now, gx, gy );
			const seedel = seetime[0]-0;
			// actual sun position...
			row[x].sx = (values.sun_position.x+values.Velocity*c* seedel*values.Scale);
			row[x].sy = (values.sun_position.y+values.Velocity*s* seedel*values.Scale);
			row[x].seedel = seedel;
			const realLen = Math.sqrt((row[x].sx-gx)*(row[x].sx-gx)+(row[x].sy-gy)*(row[x].sy-gy))/values.Scale;

			const ago = -seedel;//ll / (100*values.C);

			const seetimePlanet = rel.RealTime2( 0, {x:values.Velocity*c,y:values.Velocity*s, z:0}
				, {x:values.planet_position.x //+ now*values.Velocity*c*values.Scale
				  ,y:values.planet_position.y //+ now*values.Velocity*s*values.Scale
				  , z:0}
				, {x:0, y:0, z:0}, {x:0, y:0, z:0}, {x:gx, y:gy, z:0} );
			const agoPlanet = -seetimePlanet[0];
			row[x].seedel = realLen;//agoPlanet;
			//console.log( "ago:", ago, gx, gy, (values.sun_position.x-ago*values.Velocity*c*values.Scale), x, y );
				const Ax = B_0(gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale), 300*sunSize )
				         + (values.sun_position.x-ago*values.Velocity*c*values.Scale);
				const Ay = B_0(gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale)
				              ,gx- (values.sun_position.x-ago*values.Velocity*c*values.Scale)
				              ,gy- (values.sun_position.y-ago*values.Velocity*s*values.Scale), 300*sunSize )
				         + values.sun_position.y-ago*values.Velocity*s*values.Scale;

				const Bx = B_0(Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,200*planetSize ) 
				         + (values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale);
				const By = B_0(Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,Ax-(values.planet_position.x-agoPlanet*values.Velocity*c*values.Scale)
				              ,Ay-(values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale)
				              ,200*planetSize ) 
				         + (values.planet_position.y-agoPlanet*values.Velocity*s*values.Scale);

				row[x].x = Bx;
				row[x].y = By;
			}
	}


}

addSpan( "C", 1000, 1, 0, 2/1000, "C" );
addSpan( "Light Second Length", 1000, 150, 0, 1, "Scale" );
addSpan( "Velocity", 1000, 0.4, 0, 2/1000, "Velocity" );
addSpan( "Direction", 1000, 0, 0, (Math.PI*2)/1000, "Direction", (val)=>(val/Math.PI).toFixed(3)+"pi" );
addSpan( "Orbit", 400, 0.4, 0, 1/100, "Orbit" );
addSpan( "Orbit Velocity", 400, 0.4, 0, 1/100, "OrbitVelocity" );
addSpan( "Now", 1000, -1, -runT/2, runT/1000, "Now" );

const sunSize = 0.5;
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

	const planet_direction = values.Now * values.OrbitVelocity;
	const ps = -Math.sin( planet_direction );
	const pc = Math.cos( planet_direction );

        values.planet_position.x = values.sun_position.x + values.Orbit * pc * values.Scale;
        values.planet_position.y = values.sun_position.y + values.Orbit * ps * values.Scale;

	if( !animate )
		draw();
}

function draw() {
	displace( values.Now );
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
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
			const x = 500+values.sun_position.x+ Math.cos( t ) * r * values.Scale;
			const y = 500+values.sun_position.y+Math.sin( t ) * r*values.Scale;
			const dx1 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)].x;
			const dy1 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)].y;
			const dx2 = displacements2[Math.floor((y)/1)][Math.floor((x)/1)+1].x;
			const dy2 = displacements2[Math.floor((y)/1)+1][Math.floor((x)/1)].y;
			const ddx = (dx2-dx1)*((((x))/1)%1);
			const ddy = (dy2-dy1)*((((y))/1)%1);
			if( first ) {
				ctx.moveTo( 500+dx1+ddx, 500+dy1+ddy );
				first = false;
			}else
				ctx.lineTo( 500+dx1+ddx, 500+dy1+ddy );
		}
		ctx.stroke();
	}

	for( let y = 0; y < displacements.length; y++ ) {
		const row = displacements[y];
		const row1 = displacements[y+1];
		if( !row1 ) continue;
		for( let x = 0; x < row.length; x++ ) {
			const d = row[x];
			const d1 = row1[x];
			const d2 = row[x+1];
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
				ctx.fillStyle = `hsl(${((120/180*Math.PI)*Math.abs(d.seedel)%3)*360},100%, 50%)`;
				ctx.fillRect( ((x-50)*10)+500, ((y-50)*10)+500, 2, 2 );
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



	if(1) {
	ctx.beginPath();
	ctx.fillStyle = "yellow";
	ctx.arc( 500 + values.sun_position.x, 500 + values.sun_position.y, sunSize*values.Scale/3, 0, Math.PI*2 );
	ctx.fill();

	ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc( 500 + values.planet_position.x, 500 + values.planet_position.y, planetSize*values.Scale, 0, Math.PI*2 );
        ctx.fill();
	}
if(0)
	for( let i = 0; i < values.sun_gravity.length; i++ ) {
		const sg = values.sun_gravity[i];
		const pg = values.planet_gravity[i];
		const now = (sliders.valueNow - i)*scalars.Now;
		ctx.beginPath();
		ctx.strokeStyle = "hsl(0%,0%,"+(100-(sunSize + now*values.C)*100/(sunSize + (sliders.valueNow)*scalars.Now*values.C))+"%)";
		ctx.arc( 500 + sg.x, 500 + sg.y, (sunSize + now * values.C)* values.Scale, 0, Math.PI*2 );
		ctx.stroke();

		ctx.beginPath();
		const c2 = "hsl(0,0%,"+(100-(planetSize + now * values.C)*100/(planetSize + (sliders.valueNow)*scalars.Now*values.C)).toFixed(2)+"%)";
		//console.log( "distance = ", (100-(planetSize + now * values.C)*100/(planetSize + runT*values.C)), c2 )
		ctx.strokeStyle = c2;//"hsl(0,0,"+(100-(planetSize + now * values.C)*100/(planetSize + runT*values.C)).toFixed(2)+"%)";
		ctx.arc( 500 + pg.x, 500 + pg.y, (planetSize + now * values.C)* values.Scale, 0, Math.PI*2 );
		ctx.stroke();
	}
}
