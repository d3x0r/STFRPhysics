
import {Joint} from "./joint.mjs";
import {lnQuat,Vector} from "./math_config.mjs";

const root = new Joint();
let l = root;
for( let i = 0; i < 5; i++ )
	l = l.addLimb();

const approach = Vector.new( 0, 1, 0 );
const spin = lnQuat.new( { lat:Math.PI*5/4, lng:Math.PI } );

const approachReal = spin.apply( approach );

Joint.solve( root, Vector.new(-1.5,1,0), approachReal );

console.log( "Blah?" );
