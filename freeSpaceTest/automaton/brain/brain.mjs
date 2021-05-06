
//var Neuron = require( './neuron.js' );//import * as Neuron from ./neuron.js;
//var Synapse = require( './synapse.js' );

import * as Neuron from './neuron.mjs';
import Synapse from "./synapse.mjs";

class BrainStem {
	addInput( name, ref ) {

	}
	addOutput( name, ref ) {
		
	}
}

export class Brain {
     #neurons = []
	 #roots = []

	 cycle = 0;
	k = 1.0; // default signmoid constant
	#changed = false;
	Synapse = Synapse;
	brainStems = [];

		step() {
			this.cycle++;
			if( this.#changed ) {
				this.#roots.length = 0;
				this.#neurons.forEach( n=> {
					if( n.cycle != this.cycle ) {
						this.#roots.push( n );
						n.value; // triggers getter to update neuron chain.
					}
				} );
				this.#changed = false;
			}
			else
				this.#roots.forEach( n=>n.value );
		}
		dupNeuron(n){
			var newN = n.clone();
			this.#neurons.push( newN );
			this.#changed = true;
			return newN;

		}
		dupSynapse(s) {
			this.#changed = true;
			return s.clone();
		}
		UnLinkSynapse( synapse ){
			if( synapse.output )
				synapse.DetachDestination();
			else if( synapse.input )
				synapse.DetachSource();
			this.#changed = true;
		}
		UnLinkSynapseTo( synapse ){
			synapse.DetachDestination();
			this.#changed = true;
		}
		UnLinkSynapseFrom( synapse ){
			synapse.DetachSource();
			this.#changed = true;
		}
		LinkSynapseFrom( synapse, neuron, n) {
			this.#changed = true;
			return synapse.AttachSource( neuron, neuron.attachSynapseFrom( n ) );
		}
		LinkSynapseTo( synapse, neuron, n) {
			this.#changed = true;
			return synapse.AttachDestination( neuron, neuron.attachSynapse( n ) );
		}
		toJson() {
			
		}	

	constructor() {	
		const This = this;
		var types = Object.keys( Neuron );
		types.forEach( key => {
				this[key] = (function(key) {
					return function() {
						return new Neuron[key]( This );
					}
				})(key);
			} )
		}
	
	
}

