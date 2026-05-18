import { generateGalaxySvg } from './galaxy_svg_with_photometric_profile.mjs';
//import { generateGalaxySvg } from './galaxy_svg_with_mond_download.mjs';
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
}

