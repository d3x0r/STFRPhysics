

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
        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        
	ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc( 500 + values.sun_position.x, 500 + values.sun_position.y, sunSize*values.Scale, 0, Math.PI*2 );
        ctx.fill();

	ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc( 500 + values.planet_position.x, 500 + values.planet_position.y, planetSize*values.Scale, 0, Math.PI*2 );
        ctx.fill();

	for( let i = 0; i < values.sun_gravity.length; i++ ) {
		const sg = values.sun_gravity[i];
		const pg = values.planet_gravity[i];
		ctx.beginPath();
		ctx.strokeStyle = "white";
		const now = (sliders.valueNow - i)*scalars.Now;
		ctx.arc( 500 + sg.x, 500 + sg.y, (sunSize + now * values.C)* values.Scale, 0, Math.PI*2 );
		ctx.stroke();

		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.arc( 500 + pg.x, 500 + pg.y, (planetSize + now * values.C)* values.Scale, 0, Math.PI*2 );
		ctx.stroke();
	}
}
