import { generateGalaxySvg } from './galaxy_svg_with_photometric_profile.mjs';
//import { generateGalaxySvg as g2 } from './galaxy_svg_with_mond_download.mjs';
//import { generateGalaxySvg as g2 } from './galaxy_svg.mjs';
import { GALAXY_PRESETS } from './galaxy_presets.mjs';
import { ROTMOD_GALAXIES } from './rotmod_ltg_data.mjs';

const data = { presets: GALAXY_PRESETS, rotmod: ROTMOD_GALAXIES };
import {sack} from "sack.vfs";
const disk = sack.Volume();

let currentSvg = '';
let currentName = '';

console.log( "data.presets" );
for( let name of Object.keys( data.presets ) ) {
	const g = data.presets[name];
	const s = generateGalaxySvg( name, data );
        disk.write( "svg/"+name+".svg", s );
//	const s2 = g2( name, data );
//        disk.write( "svg/"+name+"2.svg", s2 );
}

