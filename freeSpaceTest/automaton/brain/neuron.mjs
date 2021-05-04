"use strict"

const MAX_OUTPUT_VALUE = 1.0;

export function Neuron(brain) {
	if( !(this instanceof Neuron)) return new Neuron(this);
	
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

Neuron.algo = {
	digital : 0,
	analog : 1,
	sigmoid : 2,
};
Object.seal( Neuron.algo );

Neuron.prototype.clone= function(){
	var newNeuron = new Neuron( this.brain );
	newNeuron.threshold = this.threshold;
	newNeuron.cycle = this.cycle;
	newNeuron.type = this.type;
	return newNeuron;
}

Neuron.prototype.output= function(n) {
	switch( this.algorithm ) {
	case Neuron.algo.analog:
		var out = n - this.threshold;
		if( out > MAX_OUTPUT_VALUE ) out = MAX_OUTPUT_VALUE;
		if( out < 0 ) out = 0;
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

Object.defineProperty(Neuron.prototype, "value", {
	get: cb,
	//set: function(y) { this.setFullYear(y) }
});
	  
        function cb() {
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

Neuron.prototype.attachSynapse= function( specific ) {
	if( specific !== undefined )
		return { nerves: this.inputs, id: specific }
	return { nerves: this.inputs, id: this.inputs.length };
}
Neuron.prototype.attachSynapseFrom= function( specific ) {
	if( specific !== undefined )
		return { nerves: this.outputs, id: specific }
	return { nerves: this.outputs, id: this.outputs.length };
}
Neuron.prototype.detachSynapse= function( s ) {
	var id = this.inputs.findIndex( input=>input === s );
	if( id >= 0 )
		this.inputs[id] = null;
}
Neuron.prototype.detachSynapseFrom= function( s ) {
	var id = this.outputs.findIndex( output=>output === s );
	if( id >= 0 )
		this.outputs[id] = null;
}
Neuron.prototype.attach= function( other ) {
	var synapse = this.brain.Synapse();
	this.inputs.push( synapse );
	other.outputs.push( synapse );
	synapse.input = other;
	synapse.output = this;
	this.brain.changed = true;
	return synapse;
}

Neuron.prototype.detach= function( other ) {
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

//-------------------------------------------------------------------------------

export  function Sigmoid(brain) {
	if( !(this instanceof Sigmoid) ) return new Sigmoid(this);
	Neuron.call(this,brain);
	this.type = "Sigmoid";
	this.k = this.brain.k;
	return n;
}

Sigmoid.prototype = Object.create( Neuron );
Sigmoid.prototype.output = 	function(n) { return 1/(1+Math.exp( -this.k ) ) };


Sigmoid.prototype.clone = function() {
	var newN = Neuron.prototype.clone.call( this );
	newN.k = n.k;
}

//-------------------------------------------------------------------------------

export function Oscillator(brain) {
	if( !(this instanceof Oscillator) ) return new Oscillator(this);
	Neuron.call(this,brain);
	this.type = "Oscillator";
    this.freq = 1.0;
}        
Oscillator.prototype = Object.create( Neuron.prototype );
Oscillator.prototype.output = 	function(n) { return 1/(1+Math.exp( -this.k ) ) };

	Object.defineProperty(Oscillator.prototype, "value", {
	  get: function() { 
		//console.log( "( Math.sin(  ( ( n.freq * Date.now() ) / 1000 ) % 1  ) )", Date.now() % 1000 
		//		, ( Math.sin(  2*Math.PI * (( ( this.freq * Date.now() ) / 1000 ) % 1 )  ) ) );
          	return ( Math.sin(  Math.PI*2*(( ( this.freq * Date.now() ) / 1000 ) % 1 ) ) );
          },
	  //set: function(y) { this.setFullYear(y) }
	});
	Oscillator.prototype.clone = function() {
		var newN = Neuron.prototype.clone.call( this );
		newN.freq = this.freq;
	}

//-------------------------------------------------------------------------------
	
export function TickOscillator( brain,ticks ) {
	if( !(this instanceof TickOscillator) ) return new TickOscillator(this);
	Neuron.call(this,brain);
	this.type = "TickOscillator";
    this.freq = ticks || 1000;
}
TickOscillator.prototype = Object.create( Neuron.prototype );
TickOscillator.prototype.output = 	function(n) { return 1/(1+Math.exp( -this.k ) ) };

Object.defineProperty(TickOscillator.prototype, "value", {
	get: function() { 
	//console.log( "Math.sin( ( this.brain.cycle * 2* Math.PI / freq ) )", Math.sin( ( this.brain.cycle * 2* Math.PI / freq ) ) );
		return Math.sin( ( this.brain.cycle * 2* Math.PI / this.freq ) );
		},
	//set: function(y) { this.setFullYear(y) }
});
TickOscillator.prototype.clone = function() {
	var newN = Neuron.prototype.clone.call( this );
	newN.ticks = n.ticks;
}

//-------------------------------------------------------------------------------

export function External( brain, cb ) {
	if( !(this instanceof External) ) return new External(this, brain);
	Neuron.call(this,brain);
	this.cb = cb;
	this.type = "External";
}
External.prototype = Object.create( Neuron.prototype );
External.prototype.output = 	function(n) { return n };

Object.defineProperty(External.prototype, "value", {
	get: function() { 
		return this.inputs = this.cb() 
	}
	//set: function(y) { this.setFullYear(y) }
});
External.prototype.clone = function() {
	return new External( this.brain, this.cb );
}

//-------------------------------------------------------------------------------

export function Exporter( brain, cb ) {
	if( !(this instanceof Exporter) ) return new Exporter(this, brain);
	Neuron.call(this,brain);
	this.cb = cb;
	this.type = "Exporter";
}
Exporter.prototype = Object.create( Neuron.prototype );
Exporter.prototype.output = function(n) { 
	var outval = this.cb(n); 
	this.on = !!outval;
	return outval;
};

Exporter.prototype.clone = function() {
	return new Exporter( this.brain, this.cb );
}

//-------------------------------------------------------------------------------

export default {
	Neuron: Neuron,
	Oscillator : Oscillator,
	TickOscillator : TickOscillator,
	External:External,
	Exporter:Exporter,
	
}