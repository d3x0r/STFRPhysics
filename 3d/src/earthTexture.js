// Rough equirectangular world map, drawn to a canvas.
//
// This is a sketch, not data; it exists so the sphere map has something with
// recognizable landmarks on it.  Most of the detail is lost in the mapping
// anyway - it only has to answer 'where is that point supposed to be'.
//
// u = (lon+180)/360, v = (90-lat)/180 ; v=0 is the north pole.

const OCEAN  = "#12395e";
const LAND   = "#3e6b3c";
const ICE    = "#dde6ea";
const SAND   = "#8a7a4e";
const GRID   = "rgba(255,255,255,0.13)";
const AXIS   = "rgba(255,255,255,0.32)";

// coarse [lon,lat] outlines; closed implicitly.
const LANDS = [
 { fill:LAND, pts:[ // North America
	[-168,66],[-156,71],[-130,70],[-110,69],[-95,70],[-82,73],[-75,68],[-64,60],
	[-56,52],[-66,45],[-70,42],[-76,35],[-81,25],[-83,29],[-90,29],[-97,26],
	[-98,19],[-88,21],[-84,10],[-78,8],[-83,8],[-92,15],[-105,20],[-110,24],
	[-117,32],[-124,40],[-124,48],[-133,55],[-145,60],[-158,57],[-165,60] ] }
,{ fill:LAND, pts:[ // South America
	[-78,8],[-72,11],[-62,10],[-50,0],[-44,-3],[-35,-5],[-39,-15],[-48,-25],
	[-58,-35],[-62,-41],[-65,-50],[-70,-55],[-75,-50],[-73,-40],[-71,-30],
	[-70,-18],[-75,-5],[-79,0] ] }
,{ fill:LAND, pts:[ // Africa
	[-17,15],[-16,20],[-10,28],[0,32],[10,34],[20,32],[33,31],[35,24],[38,18],
	[43,12],[51,12],[48,5],[41,-2],[40,-10],[35,-20],[32,-26],[27,-34],[20,-34],
	[16,-28],[12,-18],[9,-5],[9,4],[3,6],[-8,4],[-14,9] ] }
,{ fill:LAND, pts:[ // Eurasia
	[-10,36],[-2,36],[3,42],[12,45],[19,40],[24,41],[29,41],[30,46],[40,48],
	[50,45],[55,40],[60,38],[68,38],[72,35],[68,25],[72,20],[77,8],[80,10],
	[85,20],[88,22],[92,22],[95,16],[99,10],[104,2],[105,10],[109,11],[108,18],
	[113,22],[120,24],[122,31],[119,35],[122,40],[127,39],[129,43],[135,48],
	[140,53],[143,59],[150,59],[160,60],[170,66],[179,65],[170,70],[160,70],
	[140,73],[130,73],[110,76],[100,77],[80,73],[70,73],[60,70],[55,68],[45,66],
	[40,66],[35,65],[30,60],[25,65],[22,70],[15,68],[10,63],[5,58],[8,54],
	[4,52],[-2,49],[-5,43],[-9,39] ] }
,{ fill:LAND, pts:[ // Britain / Ireland
	[-5,50],[-3,54],[-2,58],[-6,58],[-10,53],[-6,51] ] }
,{ fill:LAND, pts:[ // Australia
	[113,-22],[114,-27],[118,-34],[125,-32],[132,-31],[138,-35],[145,-38],
	[150,-37],[153,-28],[146,-19],[142,-11],[136,-12],[130,-12],[125,-14],
	[118,-20] ] }
,{ fill:LAND, pts:[ // Japan
	[130,32],[135,34],[140,38],[142,43],[145,44],[141,40],[138,36],[133,33] ] }
,{ fill:LAND, pts:[ // Madagascar
	[43,-12],[50,-15],[50,-25],[45,-25],[43,-18] ] }
,{ fill:LAND, pts:[ // New Zealand
	[172,-34],[178,-38],[176,-41],[170,-44],[166,-46],[168,-42] ] }
,{ fill:ICE, pts:[ // Greenland
	[-45,60],[-25,70],[-20,77],[-30,83],[-50,82],[-58,76],[-55,68] ] }
,{ fill:SAND, pts:[ // Sahara, so north Africa doesn't read as forest
	[-12,20],[10,24],[30,26],[33,22],[25,16],[5,14],[-10,15] ] }
];

function makeEarthCanvas( w, h ) {
	w = w || 2048;
	h = h || 1024;
	const canvas = document.createElement( "canvas" );
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext( "2d" );

	const X = (lon)=> (lon+180)/360 * w;
	const Y = (lat)=> (90-lat)/180 * h;

	ctx.fillStyle = OCEAN;
	ctx.fillRect( 0, 0, w, h );

	// Antarctica is a band, not an outline - the projection smears it anyway.
	ctx.fillStyle = ICE;
	ctx.fillRect( 0, Y(-68), w, h-Y(-68) );
	// and a thin arctic cap so the north pole isn't open ocean
	ctx.fillRect( 0, 0, w, Y(81) );

	// draw each land twice, shifted a full turn, so shapes that cross the
	// +/-180 seam still close.
	for( const land of LANDS ) {
		for( const shift of [-w, 0, w] ) {
			ctx.beginPath();
			land.pts.forEach( (p,i)=>{
				const x = X(p[0]) + shift, y = Y(p[1]);
				if( i ) ctx.lineTo( x, y ); else ctx.moveTo( x, y );
			} );
			ctx.closePath();
			ctx.fillStyle = land.fill;
			ctx.fill();
		}
	}

	// graticule every 30 degrees; equator and prime meridian brighter.
	ctx.lineWidth = Math.max( 1, w/2048 );
	for( let lon = -180; lon <= 180; lon += 30 ) {
		ctx.strokeStyle = lon ? GRID : AXIS;
		ctx.beginPath();
		ctx.moveTo( X(lon), 0 );
		ctx.lineTo( X(lon), h );
		ctx.stroke();
	}
	for( let lat = -60; lat <= 60; lat += 30 ) {
		ctx.strokeStyle = lat ? GRID : AXIS;
		ctx.beginPath();
		ctx.moveTo( 0, Y(lat) );
		ctx.lineTo( w, Y(lat) );
		ctx.stroke();
	}

	return canvas;
}

window.makeEarthCanvas = makeEarthCanvas;
export { makeEarthCanvas };
