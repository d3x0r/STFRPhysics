"use strict";

export default function Synapse() {
	if( !(this instanceof Synapse)) return new Synapse(this);
        	this.input = null;
                this.output = null;
                this.gain = 1.0;
}

                Object.defineProperty(Synapse.prototype, "value", {
                	get: function() {if( this.input )
                        	return this.gain * this.input.value;
                        return 0;
                        }
                } );

                Synapse.prototype.clone = function(){
                        var newS = new Synapse();
                        newS.gain = this.gain;
                        return newS;
                }
                Synapse.prototype.AttachSource = function( neuron, ppSyn ) {
                        if( !ppSyn && neuron )
                                for( var n = 0; 
                                        !(ppSyn = neuron.AttachSynapse( n ) )
                                        && n < MAX_NERVES; 
                                        n++ );
                        if( !this.input && neuron && ppSyn )
                        {
                                ppSyn.nerves[ppSyn.id] = this;
                                this.input = neuron;
                                return true;
                        }
                        return false;
                                
                }
                Synapse.prototype.AttachDestination = function( neuron, ppSyn ) {
                        if( !ppSyn && neuron )
                                for( var n = 0; 
                                        !(ppSyn = neuron.AttachSynapse( n ) )
                                        && n < MAX_NERVES; 
                                        n++ );
                        if( !this.output && neuron && ppSyn )
                        {
                                ppSyn.nerves[ppSyn.id] = this;
                                this.output = neuron;
                                return true;
                        }
                        return false;
                                
                }
                Synapse.prototype.DetachDestination = function() {
                        var n = this.output;
                        if(n) {
                                this.output = null;
                                n.detachSynapse( this );
                        }
                }
                Synapse.prototype.DetachSource = function() {
                        var n = this.input;
                        if( n ) {
                                this.input = null;
                                n.detachSynapseFrom( this );
                        }
                }

                
