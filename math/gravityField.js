



const scalars = [ { to:40, d:200}
                , { to:100, d:2.9}
                , { to:1000, d:1.2 }
                , { to:185000, d:0.006 }
];
const r = 40;

function getDensity(r ) {
	let s_ = null;
	for( let s of scalars ){
        	if( r < s.to ) {
                	if( s_ ) {
                        	const one = (r-s_.to)/(s.to-s_.to);
                                return ((1-one)*s_.d+(one)*s.d);
                        } else {
                        	return s.d;
                        }
                }
		s_ = s;
        }
	return s_.d;
}

//console.log( "D:", getDensity( 30 ),getDensity( 40 ),getDensity( 50 ),getDensity( 99 ), getDensity( 100 ) )
function makeSpan( r ) {
	const stars = [];
	const d = getDensity(r);
	console.log( "D:", d );
	for( i = 0; i < d * 8; i++ ) {
		stars.push( {x: Math.random( )*2-1, y:Math.random()*2-1, z:Math.random()*2-1, s:( Math.random()* 10  +0.1 ) / 100 } );
	}
	return stars;
}

const stars = makeSpan( 100 );
console.log( "Span?", stars.length );


const fixedMeasures = [];

for( let x=-1; x <=1; x++ )for( let y=-1; y <=1; y++ )for( let z=-1; z <=1; z++ ) {

	fixedMeasures.push( {x:x,y:y,z:z} );
}

countSpan( stars );
function countSpan( stars ) {

//	const offset = (p)=>stars.map( 
	const offsets = fixedMeasures.map( m=>offset(m));


	function offset(m) {
		let nearest = null;
		let d = 0;
		let sum = { x:0,y:0,z:0};

		for( let star of stars ) {
			if( !nearest ) { nearest = star; d=( (m.x-star.x)*(m.x-star.x)+(m.y-star.y)*(m.y-star.y)+(m.z-star.z)*(m.z-star.z)); continue; }

			let l = ( (m.x-star.x)*(m.x-star.x)+(m.y-star.y)*(m.y-star.y)+(m.z-star.z)*(m.z-star.z));
			if( l < d ) { const use = nearest; const oldD = d; nearest = star; star=use; d=l; l=oldD; }
			const newd = l+star.s*star.s;
			const scl = Math.sqrt(newd/l);
			const nx = (m.x-star.x) * scl;
			const ny = (m.y-star.y) * scl;
			const nz = (m.z-star.z) * scl;
			sum.x += nx - (m.x-star.x);
			sum.y += ny - (m.y-star.y);
			sum.z += nz - (m.z-star.z);
		}
		
		if( nearest )
		{
			const l = ( (m.x+sum.x-nearest.x)*(m.x+sum.x-nearest.x)+(m.y+sum.y-nearest.y)*(m.y+sum.y-nearest.y)+(m.z+sum.z-nearest.z)*(m.z+sum.z-nearest.z));
			const d = l+nearest.s*nearest.s;
			const scl = Math.sqrt(d/l);
			const nx = (m.x+sum.x-nearest.x) * scl;
			const ny = (m.y+sum.y-nearest.y) * scl;
			const nz = (m.z+sum.z-nearest.z) * scl;
			sum.x = nx - (m.x+sum.x-nearest.x);
			sum.y = ny - (m.y+sum.y-nearest.y);
			sum.z = nz - (m.z+sum.z-nearest.z);
		}
		return {sum:sum, src:m};
	}

	console.log( "Measured:", offsets );
	const xs=[];
	const ys=[];
	const zs=[];
	for( let x=-1; x <=1; x+=2 ) {
		for( let sum of offsets ) {
			if( sum.src.x === x ) {
				xs.push( sum.sum.x );
			}
			if( sum.src.y === x ) {
				ys.push( sum.sum.y );
			}
			if( sum.src.z === x ) {
				zs.push( sum.sum.z );
			}
		}
	}
	console.log( "stuff:", xs );
	console.log( "stuff:", ys );
	console.log( "stuff:", zs );
}