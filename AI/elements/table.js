

//import table from "./table.json" with {type:'json'}

import table from "./periodic-table-elements.json" with {type:'json'}

console.dir( table );

const elements = [{e:0}];

for( let e of table ) {
	elements[e.atomic_number] = {
			mass: e.atomic_mass,
			protons : e.atomic_number,
			neutrons : (e.atomic_mass - e.atomic_number*1.007276)/1.008665,
			ar : e.atomic_radius,
			r : 1.2187 * Math.pow( e.atomic_mass, 1/3 ),
			e : 0
		}
	elements[e.atomic_number].e = elements[e.atomic_number].ar/elements[e.atomic_number].r
}

let avg = 0;
let n = 0;
const ar2 = elements.sort( (a,b)=>{return a.e<b.e?-1 :1} )
for( let e of elements ) {
	console.log( e );
	if( e.ar ) {
		avg += e.e;
		n++ }
}

console.log( "ratio:", avg/n );

//console.dir( elements );