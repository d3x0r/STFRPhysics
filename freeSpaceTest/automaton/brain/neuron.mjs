"use strict"

const MAX_OUTPUT_VALUE = 1.0;

export class Neuron {

	
	constructor( brain) {
		this.brain = brain;
		this.threshold = 0.5;
		this.algorithm = 0;
		this.k = 0.2;
		this.input = 0;
		this.on = false;
		this.cycle = brain.cycle-1;
		this.type = "Neuron";
		this.inputs = [],
		this.outputs = [];
	}

	setMsg(msg) {
		this.threshold = msg.t;
		this.algorithm = msg.a;
		this.k = msg.k;
	}	
	getMsg() {
		return {
			t: this.threshold,
			a: this.algorithm,
			k : this.k,
		}		
	}



	clone(){
		var newNeuron = new Neuron( this.brain );
		newNeuron.threshold = this.threshold;
		newNeuron.cycle = this.cycle;
		newNeuron.type = this.type;
		return newNeuron;
	}

	output(n) {
		//  convert N to the output level signal.
		// N is gotten from the sum of input gains * input neuron value()s.
		switch( this.algorithm ) {
		case Neuron.algo.analog:
			var out = n - this.threshold;
			if( out > MAX_OUTPUT_VALUE ) out = MAX_OUTPUT_VALUE;
			if( out < 0 ) out = 0;
			return out;
		case Neuron.algo.direct:
			var out = n - this.threshold;
			if( out > MAX_OUTPUT_VALUE ) out = MAX_OUTPUT_VALUE;
			if( out < -MAX_OUTPUT_VALUE ) out = -MAX_OUTPUT_VALUE;
			return out;
		case Neuron.algo.digital:
			if( n > this.threshold )
				return MAX_OUTPUT_VALUE;
			return 0;
		case Neuron.algo.sigmoid:
			 var out = (MAX_OUTPUT_VALUE/(1+Math.exp( -this.k * (n-this.threshold))));
			if( out <= 0 )
			out = 0;  // trim bottom portion...
			else 
			if( out > MAX_OUTPUT_VALUE )
				out = MAX_OUTPUT_VALUE; 
			return out;
		}
	}

	attachSynapse( specific ) {
		if( specific !== undefined )
			return { nerves: this.inputs, id: specific }
		return { nerves: this.inputs, id: this.inputs.length };
	}
	attachSynapseFrom( specific ) {
		if( specific !== undefined )
			return { nerves: this.outputs, id: specific }
		return { nerves: this.outputs, id: this.outputs.length };
	}
	detachSynapse( s ) {
		var id = this.inputs.findIndex( input=>input === s );
		if( id >= 0 )
			this.inputs[id] = null;
	}
	detachSynapseFrom( s ) {
		var id = this.outputs.findIndex( output=>output === s );
		if( id >= 0 )
			this.outputs[id] = null;
	}
	attach( other ) {
		var synapse = this.brain.Synapse();
		this.inputs.push( synapse );
		other.outputs.push( synapse );
		synapse.input = other;
		synapse.output = this;
		this.brain.changed = true;
		return synapse;
	}
	
	detach( other ) {
		if( other ) {
			var index;
			var synapse;
			index = this.inputs.findIndex( s=>(s.input === other)?true:false );
			if( index < 0 ) {
				index = this.outputs.findIndex( s=>(s.output === other )?true:false );
				if( index >= 0 ) {
					synapse = this.outputs[index];
					this.outputs.splice( index, 1 );
					synapse.output.inputs.find( (s,idx)=>{ if( s === synapse ) {
							synapse.output.inputs.splice( idx, 1 );
							return true;
						} else return false; 
					} );
				}
			} else {
				synapse = this.inputs[index];
				this.inputs.splice( index, 1 );
				synapse.input.outputs.find( (s,idx)=>{ if( s === synapse ) {
						synapse.input.outputs.splice( idx, 1 );
						return true;
					} else return false; 
				} );
			}
		} else {
			while( this.inputs.length )
				this.detach( this.inputs[0].input );
			while( this.outputs.length )
				this.detach( this.outputs[0].output );
		}
		this.brain.changed = true;
	}

	get value() {
			var inputs = 0;
			if( this.cycle != this.brain.cycle ) {
				this.cycle = this.brain.cycle;
				this.input = this.inputs.reduce( (inputs,inp)=>inputs + (inp?inp.value:0), 0 );
			}
			if( this.input > this.threshold ) {
				this.on = true;
				return this.output(this.input);
			}
			this.on = false;
			return 0;
	
	}
	

}

Neuron.algo = {
	direct : 3,
	digital : 0,
	analog : 1,
	sigmoid : 2,
};
Object.seal( Neuron.algo );



	  

//-------------------------------------------------------------------------------

export  class Sigmoid extends Neuron {
	constructor(brain) {
		super( brain );

		this.type = "Sigmoid";
		this.k = this.brain.k;
	}
	setMsg(msg) {
		super.setMsg(msg);
		this.k = msg.k;
	}
	getMsg() {
		return Object.assign( super.getMsg(), {
				k: this.k
			} )
	}

	output(n) { 
		debugger; // otuput is unused now
		return n;
	};


	clone() {
		const newN = Neuron.prototype.clone.call( this );
		newN.k = n.k;
	}
	
}

//Sigmoid.prototype = Object.create( Neuron );

//-------------------------------------------------------------------------------

export class Oscillator extends Neuron {
	//#time = 0;

	constructor(brain){
		super(brain);
		this.type = "Oscillator";
		this.freq = 1.0;
	}

	setMsg(msg) {
		super.setMsg(msg);
		this.freq = msg.freq;
	}
	getMsg() {
		return Object.assign( super.getMsg(), {
				freq: this.freq
			} )
	}

	output(n) { 
		debugger; // otuput is unused now
		return Math.sin( this.brain.tick * this.freq );
	 };

	get value() {
			return ( Math.sin(  Math.PI*2*(( ( this.freq * Date.now() ) / 1000 ) % 1 ) ) );
        }
	clone() {
		const copy = super.clone();
		copy.freq = this.freq;
		return copy;
	}

}        

//-------------------------------------------------------------------------------
	
export class TickOscillator extends Neuron {
	constructor( brain,ticks ) {
		super(brain);
		this.type = "TickOscillator";
		this.freq = ticks || 1000;
	}
	output(n) { 
		debugger; // otuput is unused now
		return 1/(1+Math.exp( -this.k ) ) 
	}

	setMsg(msg) {
		super.setMsg(msg);
		this.freq = msg.freq;
	}
	getMsg() {
		return Object.assign( super.getMsg(), {
				freq: this.freq
			} )
	}


	get value(){ 
		//console.log( "Math.sin( ( this.brain.cycle * 2* Math.PI / freq ) )", Math.sin( ( this.brain.cycle * 2* Math.PI / freq ) ) );
			return Math.sin( ( this.brain.cycle * 2* Math.PI / this.freq ) );
	}

	clone() {
		var newN = super.clone();
		newN.ticks = n.ticks;
		return newN;
	}
	
}


//-------------------------------------------------------------------------------

export class External extends Neuron {
	#cb = null;
	constructor( brain, cb ) {
		super( brain );
		this.type = "External";
		this.#cb = cb;
                this.threshold = -1.0;
	}

	output(n) { return n };

	get value() {
		return this.inputs = this.#cb() 
	}
	clone() {
		return new External( this.brain, this.cb );
	}
	
}

//-------------------------------------------------------------------------------


export class Exporter  extends Neuron{
	#cb = null;
	constructor( brain, cb ) {
		super(brain);

		this.#cb = cb;
		this.type = "Exporter";
	}
	setCb( cb ) {
		this.#cb = cb;
	}
	output(n) { 
		var outval = this.#cb(n); 
		this.on = outval;
		return outval;
	};

	clone() {
		return new Exporter( this.brain, this.cb );
	}

}

//-------------------------------------------------------------------------------

