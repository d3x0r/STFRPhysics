
//var Neuron = require( './neuron.js' );//import * as Neuron from ./neuron.js;
//var Synapse = require( './synapse.js' );

import * as NeuronTypes from './neuron.mjs';
import {Synapse} from "./synapse.mjs";

export class ref {
	o = null;
	f = null;
	constructor( o, f ) {
		this.o = o;
		this.f = f;
	}
	get value() {
		return this.o[this.f];
	}
	set value(value) {
		 this.o[this.f] = value;
	}

	get() {
		return this.o[this.f];
	}
	set(value) {
		 this.o[this.f] = value;
	}

}

class Connector {
	name = "";
	ref = null;
	scalar = 1.0;
	constructor( name, ref, scalar ) {
		this.name = name;
		this.ref = ref;
		this.scalar = 0+scalar;
	}
}

export class BrainStem {
	#name = "";
	Inputs = {
		list : []
	};
	Outputs = {
		list : []
	};
	Modules = {
		list : []
	}
	#curModule = 0;

	constructor( name ) {
		this.#name = name;
	}

	get name() {
		return this.#name;
	}
	addInput( name, ref, scalar ) {
		this.Inputs.list.push( new Connector( name, ref, scalar ) );
	}
	addOutput( name, ref, scalar ) {
		this.Outputs.list.push( new Connector( name, ref, scalar ) );
		
	}
	addModule( pbs ) {
		this.Modules.list.push( pbs );
	}

	// sub brainstems
	first_module() {
		this.#curModule = 0;
		if( this.#curModule < this.Modules.list )
			return this.Modules.list[this.#curModule];
		return null;
	}
	next_module() {
		if( this.#curModule < this.Modules.list ) {
			this.#curModule++;
			if( this.#curModule < this.Modules.list ) {
				return this.Modules.list[this.#curModule];
			}
		}
		return null;
	}

}

BrainStem.makeRef = function makeRef( obj, field ) {
	return new ref( obj, field );
}

export class Brain {
     #neurons = []
	 #roots = []

	 cycle = 0;
	k = 1.0; // default signmoid constant
	#changed = false;
	Synapse = Synapse;
	brainStems = [];

	addModule( brainStem ){
		this.brainStems.push( brainStem );
	}
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
		addNode(n) {
			this.#neurons.push(n);
			this.#changed = true;
		}
		dupNeuron(n){
			return n.clone();
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
		var types = Object.keys( NeuronTypes );
		types.forEach( key => {
				this[key] = (function(key) {
					return function(brain,psv) {
						return new NeuronTypes[key]( This, psv );
					}
				})(key);
			} )
		}
	
	
}

