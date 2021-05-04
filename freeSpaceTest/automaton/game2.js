(function () {
	'use strict';

	const MAX_OUTPUT_VALUE = 1.0;

	function Neuron(brain) {
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
	};

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
	};

	Object.defineProperty(Neuron.prototype, "value", {
		get: cb,
		//set: function(y) { this.setFullYear(y) }
	});
		  
	        function cb() {
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
	};
	Neuron.prototype.attachSynapseFrom= function( specific ) {
		if( specific !== undefined )
			return { nerves: this.outputs, id: specific }
		return { nerves: this.outputs, id: this.outputs.length };
	};
	Neuron.prototype.detachSynapse= function( s ) {
		var id = this.inputs.findIndex( input=>input === s );
		if( id >= 0 )
			this.inputs[id] = null;
	};
	Neuron.prototype.detachSynapseFrom= function( s ) {
		var id = this.outputs.findIndex( output=>output === s );
		if( id >= 0 )
			this.outputs[id] = null;
	};
	Neuron.prototype.attach= function( other ) {
		var synapse = this.brain.Synapse();
		this.inputs.push( synapse );
		other.outputs.push( synapse );
		synapse.input = other;
		synapse.output = this;
		this.brain.changed = true;
		return synapse;
	};

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
	};

	//-------------------------------------------------------------------------------

	function Sigmoid(brain) {
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
	};

	//-------------------------------------------------------------------------------

	function Oscillator(brain) {
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
		};

	//-------------------------------------------------------------------------------
		
	function TickOscillator( brain,ticks ) {
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
	};

	//-------------------------------------------------------------------------------

	function External( brain, cb ) {
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
	};

	//-------------------------------------------------------------------------------

	function Exporter( brain, cb ) {
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
	};

	//-------------------------------------------------------------------------------

	var neuron = {
		Neuron: Neuron,
		Oscillator : Oscillator,
		TickOscillator : TickOscillator,
		External:External,
		Exporter:Exporter,
		
	};

	var Neuron$1 = /*#__PURE__*/Object.freeze({
		Neuron: Neuron,
		Sigmoid: Sigmoid,
		Oscillator: Oscillator,
		TickOscillator: TickOscillator,
		External: External,
		Exporter: Exporter,
		default: neuron
	});

	function Synapse() {
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
	                };
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
	                                
	                };
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
	                                
	                };
	                Synapse.prototype.DetachDestination = function() {
	                        var n = this.output;
	                        if(n) {
	                                this.output = null;
	                                n.detachSynapse( this );
	                        }
	                };
	                Synapse.prototype.DetachSource = function() {
	                        var n = this.input;
	                        if( n ) {
	                                this.input = null;
	                                n.detachSynapseFrom( this );
	                        }
	                };

	function Brain() {
	    const neurons = [];
		const roots = [];
		var b = { cycle : 0,
			k : 1.0, // default signmoid constant
			changed : false,
			Synapse : Synapse,
			brainStems : [],
			step() {
				this.cycle++;
				if( this.changed ) {
					roots.length = 0;
					neurons.forEach( n=> {
						if( n.cycle != this.cycle ) {
							roots.push( n );
							n.value;
						}
					} );
					this.changed = false;
				}
				else
					roots.forEach( n=>n.value );
			},
			dupNeuron(n){
				var newN = n.clone();
				neurons.push( newN );
				return newN;

			},
			dupSynapse(s) {
				return s.clone();
			},
			UnLinkSynapse( synapse ){
				if( synapse.output )
					synapse.DetachDestination();
				else if( synapse.input )
					synapse.DetachSource();
			},
			UnLinkSynapseTo( synapse ){
				synapse.DetachDestination();
			},
			UnLinkSynapseFrom( synapse ){
				synapse.DetachSource();
			},
			LinkSynapseFrom( synapse, neuron$$1, n) {
				return synapse.AttachSource( neuron$$1, neuron$$1.attachSynapseFrom( n ) );
			},
			LinkSynapseTo( synapse, neuron$$1, n) {
				return synapse.AttachDestination( neuron$$1, neuron$$1.attachSynapse( n ) );
			},
			toJson() {
				
			}	
		};

		var types = Object.keys( Neuron$1 );
		types.forEach( key =>
			b[key] = Neuron$1[key]
			/*
			function(...args) { 
					var neuron = new Neuron[key]( b, args );
					this.changed = true;
					neurons.push( neuron );
					return neuron;
				}
			*/
			  //set: function(y) { this.setFullYear(y) }
		);
		
		
	        return b;
	}

	//# defines the board's size of each cell...
	//# this defines how blocks and pathways are
	//# split when given to the peice module..

	var peices = {
	    cell: { width : 48, height : 48 }
	   , background : { cells : { width : 5, height : 5 }
		   //, image : "board/images/back1.gif" 
		   //, image : "board/images/background.gif" 
		   , image : "board/images/background2.gif" 
		}
	   , neuron : {  
			cells : { width : 3, height : 3 }
			, image : "board/images/neuron.png" 
			, colors : [ [0x0000f0, 0x000000, 0xf0f000],  [0xf00000, 0x737373, 0x00f000] ]
		}
	   , input : {
			cells : { width : 3, height:3 }
			, image : "board/images/input.gif" 
	   }
	   , output : {
			cells : { width : 3, height:3}
			, image : "board/images/output.gif" 
	   }
	   ,pathway : { 
			cells : { width : 7, height:7}
			, image : "board/images/AlphaNerves.png"
			, imageNeg : "board/images/AlphaNerves-neg.png"
		}
	};


	/*
	cell size 48 by 48

	#color gate_high 255 255 255 
	block background (10 by 10) %resources%/images/brainboard/background.gif 
	#images/brainboard/grid.gif
	block neuron     (3 by 3) %resources%/images/brainboard/neuron.png
	color neuron 0 $0000f0 $000000 $f0f000
	color neuron 1 $f00000 $737373 $00f000
	block input      (3 by 3) %resources%/images/brainboard/input.gif
	block output     (3 by 3) %resources%/images/brainboard/output.gif
	pathway   %resources%/images/brainboard/alphanerves.png 
	color nerve 0 $F00000 $535353 $00F000
	color input 0 $f00000 $737373 $00f000
	color output 0 $f00000 $737373 $00f000

	*/

	const	 NOWHERE = -1;
	const	 UP =0;
	const	 UP_RIGHT =1;
	const	 RIGHT =2;
	const	 DOWN_RIGHT= 3;
	const	 DOWN =4;
	const	 DOWN_LEFT =5;
	const	 LEFT =6;
	const	 UP_LEFT =7;


	const direction = {
		 NOWHERE : NOWHERE,
		 UP :UP,
		 UP_RIGHT :UP_RIGHT,
		 RIGHT :RIGHT,
		 DOWN_RIGHT: DOWN_RIGHT,
		 DOWN :DOWN,
		 DOWN_LEFT :DOWN_LEFT,
		 LEFT :LEFT,
		 UP_LEFT :UP_LEFT,
	};

	Object.freeze( direction );


	const DirDeltaMap = [ { x: 0, y:-1 },
	                     { x:1, y:-1 }, 
			     { x:1, y:0 }, 
			     { x:1, y:1 }, 
			     { x:0, y:1 } , 
			     { x:-1, y:1 },  
			     { x:-1, y:0 },
			     { x:-1, y:-1 } 
			];
	Object.freeze( DirDeltaMap );
	DirDeltaMap.forEach( (del)=>Object.freeze(del) );



	//--------------------------- Peice class -----------------------------------------------
	//class PEICE:public IPEICE, private PEICE_DATA
	function Peice( board
		,  name
		,  image //= null
		,  rows// = 1
		,  cols// = 1
		,  hotx //= 0//(cols-1)/2
		,  hoty //= 0//(rows-1)/2
		,  bBlock// = 0
		,  bVia //= 0
		,  methods //= null
		,  psv //= 0
	  )
	{


	if( !(this instanceof Peice ) ) return new Peice( board,name,image,rows,cols,hotx,hoty,bBlock,bVia, methods,psv)
	//console.trace( image );
	this.flags =  {
	   block:0,
	   viaset:0,
	};
	this.scaled= [];// x1, x2, x4 // [3] ( [rows][cols] ) + 1
	this.current_scale; // set by setting scale...
	this.isBlock = bBlock;
	this.isRoute = bVia;

	this.cellSize = board.GetCellSize( );
	this.size = { rows:rows, cols:cols };
	this.cellSize = { width:0, height:0 };
	this.hot = { x:hotx, y:hoty };
	this.board = board;
	//PEICE_DATA::image = image;
	this.name = name;
	this.original = image;
	this.image = image;
	// this should be moved out to a thing which is
	// like re-mip-map :)
	// or recompute based on a new cell size of the main board...

	if( "on" in image )
		image = image.on; // just need one of these for now... 
	else
		this.image = image;
	if( image )
	{
		this.grid = null;
		this.lastCell = { coords:null, size:this.cellSize };
		//this.image = image;
		//this.image.src = image;
		if( image.nodeName === "IMG" ) {
			image.addEventListener( "load", initGrid.bind(this) );
			if( image.width )
				initGrid.call(this);
		} else if( image.nodeName === "svg" ) {
			var wrapper;// = document.createElement( "div" );
			//wrapper.appendChild( image );
			function convert(image) {
				var svghtml = new XMLSerializer().serializeToString(image);//image.outerHTML;
				//svghtml =[ svghtml.slice( 0, 5 ), "xmlns='http://www.w3.org/2000/svg' ", svghtml.slice( 5 ) ].join("");
				var svg = "data:image/svg+xml" /*+ ";base64"*/ + "," + encodeURI( svghtml ).replace( /\#/g, "%23" );
				wrapper = document.createElement( "img" );
				wrapper.width = image.getAttribute( "width");
				wrapper.height = image.getAttribute( "height");
				//console.log( "choppinw with:", wrapper.width, wrapper.height )
				wrapper.src = svg;
				return wrapper;
			}
			this.original.on = convert( this.original.on );
			this.original.off = convert( this.original.off );
			if( "range" in this.original ) {
				this.original.range = this.original.range.map( convert );
			}
			this.image = this.original;


			//wrapper.addEventListener( "load", initGrid.bind(this) );
			initGrid.call(this);
		}
		function initGrid(){
			var width ;
			var height;
			var img = this.image;
			if( "on" in img )
				img = img.on;

			if( typeof img.width === "number" ) {
				width = (img.width / this.size.cols);
				height = (img.height / this.size.rows);
			} else {
				width = ( 66 / this.size.cols);
				height = (66 / this.size.rows);
			}
			var coords = [];
			this.cellSize.width = width;
			this.cellSize.height = height;
			for( var c = 0; c < this.size.cols; c++ )  {
				coords[c] = [];
				for( var r = 0; r < this.size.rows; r++ )
				{
					coords[c].push( { x : c * width, y:r*height } );
				}
			}
			this.grid = coords;
		}
	  // level 0 scaled
	  this.current_scale = 0;
	}

	  // from the original file deifnitino psv here is totally bogus.
	  this.psvCreate = psv; /* brainboard for now?*/
	  if( !methods )
		  this.methods = new DefaultMethods(this);
	  else 
		  this.methods = methods;
	  this.methods.SetPeice( this );

	}

	Peice.prototype.getimage = function(  )
	{
		return this.image;
	};

	Peice.prototype.getcell = function( x, y )
	{
		this.lastCell.coords = this.grid[x%this.size.cols][y%this.size.rows];
		return this.lastCell;
	};

	Peice.prototype.getCellSize = function(  )
	{
		return this.cellSize;
	};


	Peice.prototype.getsize = function(  )
	{
		return this.size;
	};
	Peice.prototype.gethotspot = function(  )
	{
		return this.hot;
	};


	//typedef class VIA *PVIA;
	//class VIA:public IVIA, public VIA_DATA
	function Via(board
	  , name
	  , image //= null
	  , imageNeg
	  , methods //= null
	  , psv //= 0
	) 
	{
		Peice.call( this, board, name, {on:image,off:imageNeg}, 7, 7, 0, 0, false, true, methods, psv );
	}
	Via.prototype = new Object( Peice.prototype );
	Via.prototype.constructor = Via;

		//--------------------------------------------------------------

	Via.prototype. GetViaEnd=function( _direction, scale )
	{
	// to direction...
	  switch( _direction )
	  {
	  case UP_LEFT:
		  return this.getcell( 2, 2, scale );
	  case UP:
		  return this.getcell( 3, 2, scale );
	  case UP_RIGHT:
		  return this.getcell( 4, 2, scale );
	  case RIGHT:
		  return this.getcell( 4, 3, scale );
	  case DOWN_RIGHT:
		  return this.getcell( 4, 4, scale );
	  case DOWN:
		  return this.getcell( 3, 4, scale );
	  case DOWN_LEFT:
		  return this.getcell( 2, 4, scale );
	  case LEFT:
		  return this.getcell( 2, 3, scale );
	  case NOWHERE:
		  return this.getcell( 3, 3, scale );
	  }
	  return null;
	};

	//--------------------------------------------------------------

	Via.prototype.GetViaFill1=function( xofs, yofs, direction, scale )
	{
		  var outofs = { x : 0, y : 0, cell:null };
	  switch( direction )
	  {
	  case UP_LEFT:
		  outofs.x = 0;
		  outofs.y = -1;
					  outofs.cell = this.getcell( 5, 0, scale );
		  return outofs;
	  case DOWN_RIGHT:
		  outofs.x = 1;
		  outofs.y = 0;
					  outofs.cell = this.getcell( 5, 0, scale );
		  return outofs 
					  break;
	  case UP_RIGHT:
		  outofs.x = 0;
		  outofs.y = -1;
					  outofs.cell = this.getcell( 1, 0, scale );
		  return outofs;
	  case DOWN_LEFT:
		  outofs.x = -1;
		  outofs.y = 0;
					  outofs.cell =  this.getcell( 1, 0, scale );
		  return outofs;
	  }
			 return outofs 
	};
	// the diagonal fills are ... well position needs to
	 // be accounted for ...

	//--------------------------------------------------------------

	Via.prototype. GetViaFill2=function( xofs, yofs, direction, scale )
	{
		  var outofs = { x : 0, y : 0, cell:null };
	  // via vills are done when placing a cell that exits in 'direction'
	  // the xofs should be applied to the x,y of the last cell - the one that
	  // is exiting in 'direction'
	  // layers will consider fills as temporary and auto trash them when unwinding.
	  // Any cell may call GetViaFill, GetViaFill2 in exit direction,
	  // a direction which does not require a fill will result in null
	  // otherwise the information from this should be saved, and somewhat attached
	// to the peice just layed.
	  switch( direction )
	  {
	  case UP_LEFT:
		  outofs.x = -1;
		  outofs.y = 0;
					  outofs.cell = this.getcell( 4, 1, scale );
		  return outofs;
	  case DOWN_RIGHT:
			  outofs.x = 0;
			  outofs.y = 1;
					  outofs.cell = this.getcell( 4, 1, scale );
		  return outofs;
	  case UP_RIGHT:
		  outofs.x = 1;
		  outofs.y = 0;
			outofs.cell = this.getcell( 2, 1, scale );
			return outofs;
		case DOWN_LEFT:
			outofs.x = 0;
			outofs.y = 1;
			outofs.cell = this.getcell( 2, 1, scale );
			return outofs;
	  }
	  return null;
	};

	//--------------------------------------------------------------

	Via.prototype. GetViaStart=function(  direction,  scale )
	{
	// from NOWHERE..
	  switch( direction )
	  {
	  case UP_LEFT:
		  return this.getcell( 6, 6, scale );
	  case UP:
		  return this.getcell( 3, 5, scale );
	  case UP_RIGHT:
		  return this.getcell( 0, 6, scale );
	  case RIGHT:
		  return this.getcell( 1, 3, scale );
	  case DOWN_RIGHT:
		  return this.getcell( 0, 0, scale );
	  case DOWN:
		  return this.getcell( 3, 1, scale );
	  case DOWN_LEFT:
		  return this.getcell( 6, 0, scale );
	  case LEFT:
		  return this.getcell( 5, 3, scale );
	  case NOWHERE:
		  return this.getcell( 3, 3, scale );
	  }
	  return null;
	};
	//--------------------------------------------------------------

	Via.prototype. GetViaFromTo=function( from, to,  scale )
	{
	  if( from == NOWHERE )
	  {
		  return this.GetViaStart( to, scale );
	  }
	  else if( to == NOWHERE )
	  {
		  return this.GetViaEnd( from, scale );
	  }
	  switch( from | ( to << 4 ) )
	  {
	  case LEFT|(UP_RIGHT<<4):
	  case UP_RIGHT|(LEFT<<4):
		  return this.getcell( 4, 6, scale );
	  case LEFT|(RIGHT<<4):
	  case RIGHT|(LEFT<<4):
		  return this.getcell( 3, 0, scale );
	  case UP_LEFT|(RIGHT<<4):
	  case RIGHT|(UP_LEFT<<4):
		  return this.getcell( 2, 6, scale );
	  case LEFT|(DOWN_RIGHT<<4):
	  case DOWN_RIGHT|(LEFT<<4):
		  return this.getcell( 4, 0, scale );
	  case UP_LEFT|(DOWN_RIGHT<<4):
	  case DOWN_RIGHT|(UP_LEFT<<4):
		  return this.getcell( 5, 1, scale );
	  case UP|(DOWN_RIGHT<<4):
	  case DOWN_RIGHT|(UP<<4):
		  return this.getcell( 0, 4, scale );
	  case UP_LEFT|(DOWN<<4):
	  case DOWN|(UP_LEFT<<4):
		  return this.getcell( 6, 2, scale );
	  case UP|(DOWN<<4):
	  case DOWN|(UP<<4):
		  return this.getcell( 0, 3, scale );
	  case UP_RIGHT|(DOWN<<4):
	  case DOWN|(UP_RIGHT<<4):
		  return this.getcell( 0, 2, scale );
	  case UP|(DOWN_LEFT<<4):
	  case DOWN_LEFT|(UP<<4):
		  return this.getcell( 6, 4, scale );
	  case UP_RIGHT|(DOWN_LEFT<<4):
	  case DOWN_LEFT|(UP_RIGHT<<4):
		  return this.getcell( 1, 1, scale );
	  case RIGHT|(DOWN_LEFT<<4):
	  case DOWN_LEFT|(RIGHT<<4):
		  return this.getcell( 2, 0, scale );
	  }
	return null;
	};



	// plus additional private methods relating to vias....
	Via.prototype.Move=function(  ) { return 0; };
	Via.prototype.Stop=function(  ) { return 0; };




	//--------------------------- Default Methods ------------------------------------------

	function DefaultMethods(peice) {
		if( !(this instanceof DefaultMethods ) ) return new DefaultMethods();
		this.master = peice;
	}

	DefaultMethods.prototype.Move = function() {
		return false;
	};

	DefaultMethods.prototype.Stop = function() {
		return false;
	};


	DefaultMethods.prototype.name  = function() { return "default methods"; };
	DefaultMethods.prototype.SetPeice = function(  peice )        { this.master = peice; };
	DefaultMethods.prototype.getimage = function()                { return this.master.getimage(); };
	DefaultMethods.prototype.getcell = function(  x,  y )         { return this.master.getcell(x,y); };
	DefaultMethods.prototype.getimage = function( scale)          { return this.master.getimage(scale); };
	DefaultMethods.prototype.getcell = function(  x,  y,  scale ) { return this.master.getcell(x,y,scale); };
	DefaultMethods.prototype.gethotspot = function(  )            { return this.master.gethotspot(); };
	DefaultMethods.prototype.getsize = function(  )               { return this.master.getsize(); };

	//class DEFAULT_METHODS:public PEICE_METHODS {
	DefaultMethods.prototype.Create = function( psvExtra )
		{
			return 0;
		};
	DefaultMethods.prototype.Disconnect = function(  psv1 /*, PIPEICE peice, uintptr_t psv2*/ )
		{
	      return 0;
		};
	DefaultMethods.prototype.Destroy = function( psv )
		{
		};

	DefaultMethods.prototype.Update = function(  psv,  cycle )
		{
			return; // do nothing to update...
			// consider on failure
			// Destroy( psv );
		};
	DefaultMethods.prototype.OnMove = function(  psv )
		{
		};
	DefaultMethods.prototype.ConnectBegin  = function(  psv_to_instance,  x,  y
												  , peice_from,  psv_from_instance )
		{
	      return false;
		};
	DefaultMethods.prototype.ConnectEnd  = function(  psv_to_instance,  x,  y
												  ,  peice_from,  psv_from_instance )
		{
	      return false;
		};
	DefaultMethods.prototype.OnClick = function(  psv,  x,  y )
		{
			return false;
		};
	DefaultMethods.prototype.OnRightClick = function(  psv,  x,  y )
		{
			return false;
		};
	DefaultMethods.prototype.OnDoubleClick = function(  psv,  x,  y )
		{
			return false;
		};
	   /*
		void PEICE_METHODS::Draw( uintptr_t psvInstance, Image surface, int x, int y, int cellx, int celly )
		{
			// first 0 is current scale.
			lprintf( WIDE("Drawing peice instance %p cell: %d,%d at: %d,%d"), psvInstance, cellx, celly, x, y );
			//lprintf( WIDE("Drawing %d by %d"), rows, cols );
			BlotImage( surface
						, master.getcell(cellx, celly)
						, x, y
						);
		}
	   */
	DefaultMethods.prototype.Draw = function(  peice, psvInstance,  surface,   x,  y )
	{
		// first 0 is current scale.
		//lprintf( WIDE("Drawing peice instance %p"), psvInstance );
		//lprintf( WIDE("Drawing %d by %d"), rows, cols );

	   surface.drawImage( peice.image, x, y, this.master.size.cols * this.brainboard.board.cellSize.width, this.master.size.rows * this.brainboard.board.cellSize.height );
	//	BlotImageAlpha( surface
						  //, peice
						  //, x, y
						  //, 1 );
	};
	DefaultMethods.prototype.DrawCell = function( peice, psvInstance,  surface,  from, x,  y )
	{
		//surface.drawImage( this.master.image, 0, 0, 500, 500, 0, 0, 66, 66 )
		//surface.drawImage( this.master.image, 0, 0, 500, 500, 0, 0, 66, 66 )

		// first 0 is current scale.
		//lprintf( WIDE("Drawing peice instance %p"), psvInstance );
		//console.log( "Draw Cell: ", cellx, celly, x, y );
		//var from = this.master.getcell( cellx, celly );
		if( "on" in this.master.image )
			surface.drawImage( this.master.image.on
				, from.coords.x, from.coords.y
				, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			);
		 else
			surface.drawImage( this.master.image, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			);
	//	BlotImageAlpha( surface
						  //, peice
						  //, x, y
						  //, 1 );
	};

	//-------------------- DEFAULT VIA METHODS (a few more than PEICE_METHODS ) ----------------------------

	function DefaultViaMethods() {
		if( !(this instanceof DefaultViaMethods ) ) return new DefaultViaMethods();
		
	}

	DefaultViaMethods.prototype = new Object(  DefaultMethods.prototype );
	DefaultViaMethods.prototype.constructor = DefaultViaMethods();


	DefaultViaMethods.prototype.Move = function( )
	{
	      return 0;
	};
	DefaultViaMethods.prototype. Stop = function( )
	{
	      return 0;
	};

	//-------------------- VIA METHODS ----------------------------------


	DefaultViaMethods.prototype.OnClick = function(  psv,  x,  y )
	{
		console.log( "GENERATE DISCONNECT!" );
		this.master.board.UnendPath( );
		return 0;
	};

	DefaultViaMethods.prototype.OnRightClick = function(  psv,  x,  y )
	{
		return 0;
	};
	DefaultViaMethods.prototype.OnDoubleClick = function(  psv,  x,  y )
	{
		return 0;
	};

	const DirDeltaMap$1 = DirDeltaMap;

	function layerFlags() {
		return {
			// Index into PEICE array is stored...
			// board contains an array of peices....
			// as a bitfield these do not expand correctly if signed.
			BackDir:0,
			ForeDir:0,
			// forced set on first node cannot be cleared!
			// other nodes other than the first may have forced.
			// which indicates that the foredir MUST be matched.
			// these nodes do not unlay either.  Need to compute
			// the NEXT layer with a LeftOrRight correction factor
			bForced:0,
			// if bLeft, and bForced
			// UnlayerPath sets bRight and results with this layer intact.
			// if bLeft AND bRight AND bForced
			// UnlayerPath removes this node (if BackDir != NOWHERE)
			bFlopped:0, // starts at 0.  Moves ForDir +/- 1
			bTry:0, // set if a hard direction tendancy was set ...
			// repeat above with right, setting left, moving left...
			bRight:0, // starts at 0.  Moves ForDir +/- 1
			// foredir, backdir are unused if the peice is a filler
			// x, y of the data node will be an offset from the current
			// at which place the filler from viaset.GetViaFill1() and 2 will be done
			// actually x, y are unused, since the offset is resulted from the before
			// actually it looks like fillers don't need to be tracked, just drawn
			//var bFiller : 4;
		} 
	}


	//typedef void (CPROC *UpdateProc)( uintptr_t psv, CDATA colors[3] );

	function layerPathNode( ) {
		return { x : 0,
			y : 0,
			cellx : 0,
			celly : 0,
			isAbove: null,
			isBelow: null,
			flags : layerFlags(),
		}
	}

	const  LINK_VIA_START = 0;
	const  LINK_VIA_END = 1;


	//class LAYER
	function Layer( board, peice,  _x,  _y, _w,  _h,  ofsx,  ofsy )
	{
		if(!(this instanceof Layer)) return new Layer(board,peice,_x,_y,_w,_h, ofsx,ofsy);
		this.board = board;
		this.peice = peice||null;
		this.psvInstance = peice?peice.methods.Create( peice.psvCreate ):null;

		this.iLayer; // during the process of saving, this is kept

		//LAYER_FLAGS flags;
		// many route may be linked to a layer
		// but, as a route, only the start and end
		// may contain intelligable information.
		// routes linked to routes, the dest knows there is
		// a route linked, and hmm tributaries/distributaries...
		this.linked = [];
		// okay this becomes non-basic extensions
		// where layers moved will move other attached
		// layers automagically.

	        // ended up exposing this so that save could work correctly...
		// maybe save should be a property of layer.. but then calling it ?
		this.route_start_layer = {
			 layer :null,
			x:0, y:0 // where this is linked to the other layer
		};
		this. route_end_layer = {
			 layer :null,
			x:0, y:0 // where this is linked to the other layer
		};

		this.flags = {
			// if this is a route, then this marks
			// whether the first node on the route
			// must remain in this direction
			// of if it may be changed.
			bForced : 0,
			 bEnded : 0, // layed an end peice.
			// is a set of vias, and pds_path is used
			// to hold how, what, and where to draw.
			// all segments represent a single object (psvInstance)
			 bRoute : 0,
			 bRoot : 0, // member 0 of pool is 'root'
		} ;

		//what_i_am_over, what_i_am_under;
		this. next = null;
		this.prior = null;

		//var row, col; // which row/col of peice this is
		//wonder how to union inheritance...

	//--------------------------------------------------------------------------

		this.flags.bRoot = !board.rootLayer;
		this.pds_path = [];
		//pds_path = null;
		//shadows = null;

		this.flags.bRoute = peice.isRoute;
		this.x = _x||0;
		this.y = _y||0;
		// for via sets, the minimum until the width, height
		// is the whole span.
		this.min_x = (_x - ofsx)||0;
		this.min_y = (_y - ofsy)||0;
		this.w = _w||1;
		this.h = _h||1;

		this.peice = peice;


		if( !this.flags.bRoute ) {
		for( var x = 0; x < this.peice.size.cols; x++ )
			for( var y = 0; y < this.peice.size.rows; y++ ) {
				var newLayerPathNode = new layerPathNode();
				newLayerPathNode.x = this.x + x - this.peice.hot.x;
				newLayerPathNode.y = this.y + y - this.peice.hot.y;
				newLayerPathNode.cellx = x;
				newLayerPathNode.celly = y;
				this.pds_path.push( newLayerPathNode );
				//this.board.addLayerPathNode( newLayerPathNode );
			}
		}
	}


	Layer.prototype.IsLayerAt = function( _x, _y ) {
				var node;
				var n;
				// width of 3.. offset 1, should be -1 and +1 of the x, y... not -1 and +2 (3)
				// difference is really only 2 when comparing as a corrdinate
				//console.log( ("layer test %d,%d within %d,%d-%d,%d"), *x, *y, min_x, min_y, w, h );
				if( this.flags.bRoot ||
					(this.min_x+this.w) <= (_x) ||
					(this.min_y+this.h) <= (_y) ||
					(this.min_x > (_x) ) ||
					(this.min_y > (_y) )
				  )
					return null;
				if( !this.flags.bRoute )
				{
					return { x: (_x) - this.x, y:(_y) - this.y };
				}
				// otherwise, we need to check the path to see
				// if we're actually on this.
				
				for( n = 0; node =  this.pds_path[this.pds_path.length-1-n]; n++ )
				{
					if( (node.x + this.x) == (_x) && (node.y + this.y) == (_y) )
					{
						return { x: node.x, y: node.y };
					}
				}
				return null;
			};


			Layer.prototype.link_top = function()
			{
				var layer0;
				layer0 = this.board.rootLayer;
				if( layer0 )
				{
					//DebugBreak();
					if( this.next = layer0.next )
						this.next.prior = this;
					this.prior = null; // if top, no prior
					if( !layer0.next )
						layer0.prior = this;
					layer0.next = this;
					// layer0.me ?!
					//LinkThing( next, this );
				}
			};
	        
	        
			// link via to another (via or peice) at x, y
			// x, y save where this is linked to 
			Layer.prototype.Link = function(  via,  link_type,  x, y )
			{
				if( x === undefined ) x = 0;
				if( y === undefined ) y = 0;
				// links via to this
				// or links via from this
				this.linked.push( via );
				switch( link_type )
				{
				case LINK_VIA_START:
					via.route_start_layer.layer = this;
					via.route_start_layer.x = x;
					via.route_start_layer.y = y;
					
					break;
				case LINK_VIA_END:
					via.flags.bEnded = true;
					via.route_end_layer.layer = this;
					via.route_end_layer.x = x;
					via.route_end_layer.y = y;
					break;
				}
				// and we need to consider how to recover the linked
				// state of the actual peices that are linked.
			};
	        
			// unlinks a layer, first, if the end isl inked
			// it unlinks that, then if the start is linked it
			// unlinks that (probably resulting in distruction? )
			Layer.prototype.Unlink = function( )
			{
				//if( flags.bRoute )
				{
					if( this.route_end_layer.layer )
					{
						this.flags.bEnded = false;
						var i = this.route_end_layer.layer.linked.findIndex( path=>path===this ); 
						if( i >= 0 ) this.route_end_layer.layer.linked.splice( i, 1 ); 
						//DeleteLink( &route_end_layer.layer.linked, this );
						this.route_end_layer.layer = null;
					}
					else if( this.route_start_layer.layer )
					{
						var i = this.route_start_layer.layer.linked.findIndex( path=>path===this ); 
						if( i >= 0 ) this.route_start_layer.layer.linked.splice( i, 1 ); 
						//DeleteLink( &route_start_layer.layer.linked, this );
						this.route_start_layer.layer = null;
					}
				}
	        
			};
	        
	        
			// ability to set start x, y of this layer
			// it covers an area from here to
			// w, h
			// this allows things like wires to have bounds
			// checking to see if they should be displayed at all...
	        
	        
			Layer.prototype.Draw = function( board, ctx, x, y )
			{
				var scale;
				if( this.flags.bRoot )
					return;
				//console.log( ("Drawing a layer...at %d,%d"), x, y );
				this.scale = board.GetScale();
				board.GetSize(  );
				var cell = board.GetCellSize( );
				if( this.flags.bRoute )
				{
					//DebugBreak();
					var viaset = this.peice;
					var methods = viaset.via_methods;
					this.pds_path.forEach( (node)=>{
						var xofs, yofs;
						var fill;
						//console.log( ("Drawing route path node %p %d,%d  %d,%d")
						//		 , node, node.x, node.y
						//		 , node.flags.ForeDir, node.flags.BackDir );
						if( board.selected === this.psvInstance )
							ctx.fillRect( x + (node.x) * cell.width, y + (node.y) * cell.height, cell.width, cell.height );
						fill = viaset.GetViaFromTo( node.flags.BackDir, node.flags.ForeDir, scale );
						if( fill )
						{
							this.peice.methods.DrawCell( this.peice, this.psvInstance
											 , ctx
											 , fill
											 , x + (node.x) * cell.width
											 , y + (node.y) * cell.height );
			        
						}
						//else
						//   console.log( ("filler for %d,%d failed"), node.flags.BackDir, node.flags.ForeDir );
						fill = viaset.GetViaFill1( xofs, yofs, node.flags.ForeDir, scale );
						if( fill && fill.cell )
						{
							this.peice.methods.DrawCell( this.peice, this.psvInstance
											 , ctx
											 , fill.cell
											 , x + (node.x + fill.x) * cell.width
											 , y + (node.y + fill.y) * cell.height );
						}
						//else
						//   console.log( ("filler for %d,%d failed"), node.flags.BackDir, node.flags.ForeDir );
						fill = viaset.GetViaFill2( xofs, yofs, node.flags.ForeDir, scale );
						if( fill && fill.cell )
						{
							this.peice.methods.DrawCell( this.peice, this.psvInstance
											 , ctx
											 , fill.cell
											 , x + (node.x + fill.x) * cell.width
											 , y + (node.y + fill.y) * cell.height );
			        
						}
						//else
						//   console.log( ("filler for %d,%d failed"), node.flags.BackDir, node.flags.ForeDir );
					});
				}
				else
				{
					// this requires knowing cellsize, and the current offset/origin of the
					// layer/board...
					var xofs, yofs;
					// maximum number of cells on the board...
					// so we don't over draw.
					var hot = this.peice.gethotspot();
					// later, when I get more picky, only draw those cells that changed
					// which may include an offset
					var size = this.peice.getsize( );
					//console.log( ("Drawing layer at %d,%d (%d,%d) origin at %d,%d"), LAYER::x, LAYER::y, hot.x, hot.y, x, y );
					{
						for( xofs = -hot.x; xofs < (size.cols-hot.x); xofs++ )
							for( yofs = -hot.y; yofs < (size.rows-hot.y); yofs++ )
							{
								var from = this.peice.methods.master.getcell( xofs+hot.x, yofs+hot.y );
								if( board.selected === this.psvInstance )
									ctx.fillRect( x + (xofs) * cell.width, y + (yofs) * cell.height, cell.width, cell.height );
								this.peice.methods.DrawCell( 
												this.peice
												, this.psvInstance
												 , ctx
												  , from
												  , x + xofs * cell.width
												  , y + yofs * cell.height );
							}
					}
				}
			};
	        
			Layer.prototype.GetPeice = function( )
			{
				return this.peice;
			};
	        
			Layer.prototype.FindLayer = function(  iLayer )
			{
				return pool.find( (layer)=>{
					if( layer.iLayer ==- iLayer )
						return layer;
					return 0;
				} );
			};
			// this begin path just sets the point, and any direction is valid
			// origin point rotates to accomodate.
			// this path must begin from NOWHERE to direction.
	        
			Layer.prototype.BeginPath = function(  _x, _y, direction$$1 )
			{
				if( direction$$1 === undefined ) direction$$1 = direction.NOWHERE;
				var node= layerPathNode();
				this.x = _x;
				this.y = _y;
				this.min_x = _x;
				this.min_y = _y;
				this.w = 1;
				this.h = 1;
				this.pds_path.length = 0;
	        
				node.x = 0; // x - LAYER::x
				node.y = 0; // y - LAYER::y
	        
				node.flags.BackDir = direction.NOWHERE;
				if( direction$$1 == direction.NOWHERE )
				{
					this.flags.bForced = 0;
					// there is no real peice which is
					// NOWHERE to NOWHERE, therefore, do not attempt to draw one
					// and instead set the exit direction as valid.
					node.flags.bForced = 0;
					node.flags.ForeDir = direction.NOWHERE;
				}
				else
				{
					this.flags.bForced = 1;
					node.flags.bForced = 1;
					node.flags.ForeDir = direction$$1;
				}
	        
				this.pds_path.push( node );
			};
	        
	        
			// end at this point.
			// final node will be foredir=peices.direction.NOWHERE
			Layer.prototype. LayPath = function(  wX,  wY )
			{
				var tx, ty;
				var nPathLayed = 0;
				var nNewDir;
	                
				var node;
				//console.log( ("Laying path %p to %d,%d"), this, wX, wY );
				node = this.pds_path[this.pds_path.length-1];
				// sanity validations...
				// being done already, etc...
				wX -= this.x;
				wY -= this.y;
				if( node )
				{
					if( node.x == wX && node.y == wY )
					{
						//console.log( ("Already at this end point, why are you telling me to end where I already did?") );
						return;
					}
					// should range check wX and wY to sane limits
					// but for now we'll trust the programmer...
					if( Math.abs( node.x - wX ) > 100 || Math.abs( node.y - wY ) > 100 )
					{
						DebugBreak();
						console.log( ("Laying a LONG path - is this okay?!") );
					}
				}
				{
					var node;
					// get the last node in the path.
					node = this.pds_path[this.pds_path.length-1];
					while( node )
					{
						nNewDir = this.FindDirection( node.x
													  , node.y
													  , wX, wY );
						if( nNewDir == direction.NOWHERE )
						{
							// already have this node at the current spot...
							//console.log( ("Node has ended here...") );
							break;
						}
						if( node.flags.BackDir == direction.NOWHERE )
						{
							// if it is newdir, we're okay to go ahead with this plan.
							if( node.flags.ForeDir != nNewDir && this.flags.bForced )
							{
								console.log( ("Have a forced begin point, and no way to get there from here....") );
								DebugBreak();
								if( NearDir( node.flags.ForeDir, nNewDir ) == 10 )
								{
									console.log( ("MUST go %d , have to go %d from here.  Go nowhere."), node.flags.ForeDir, nNewDir );
									console.log( ("Okay - consider a arbitrary jump to go forward... until we can go backward.") );
								}
								else
								{
									console.log( ("It's just not quite right... return, a less radical assumption may be made.") );
								}
								return;
							}
							// else, just go ahead, we returned above here.
							node.flags.ForeDir = nNewDir;
						}
						else
						{
							// need to determine a valid foredir based on nNewDir desire, and nBackDir given.
							//console.log( ("%d, %d = %d")
							//		 , Opposite( node.flags.BackDir )
							//		 , nNewDir
							//		 , NearDir(Opposite( node.flags.BackDir )
							//					 , nNewDir ) );
							//console.log( ("newdir = %d backdir = %d"), nNewDir, node.flags.BackDir );
							//pold.TopLayer.ForeDir;
							if( NearDir( nNewDir, Opposite( node.flags.BackDir ) ) != 10 )
							{
								// this is a valid direction to go.
								node.flags.ForeDir = nNewDir;
							}
							else
							{
								console.log( ("Unlay path cause we can't get there from here.") );
								node = this.UnlayPath( nPathLayed + 1 );
								// at this point always unlay at least one more than we put down.
								nPathLayed = 1;
								continue;
							}
						}
						{
							var  n;
							tx = node.x + DirDeltaMap$1[node.flags.ForeDir].x;
							ty = node.y + DirDeltaMap$1[node.flags.ForeDir].y;
							//console.log( ("New coordinate will be %d,%d"), tx, ty );
							if( n = this.Overlaps( tx, ty ) ) // aleady drew something here...
								// the distance of the overlap is n layers, including Nth layer
								// for( ; n; PopData(&pds_stack), n-- )
								// and some fixups which unlay path does.
							{
								console.log( ("Unlaying path %d steps to overlap") , n );
								node = this.UnlayPath( n );
								// at an unlay point of forced, unlay path should be 'smart' and 'wait'
								// otherwise we may unwind to our tail and be confused... specially when moving away
								// and coming back to reside at the center.
								// if the force direction to go from a forced node is excessive, that definatly
								// breaks force, and releases the path node.
								// there may be board conditions which also determine the pathing.
								// okay try this again from the top do {
								// startin laying path again.
								continue;
							}
							// otherwise we're good to go foreward.
							// at least we won't add this node if it would have
							// already been there, heck, other than that via's
							// don't exist, sometimes we'll even get the exact node
							// that this should be....
							{
								var newnode = new layerPathNode();
								// this may be set intrinsically by being an excessive force
								// causing a large direction delta
								newnode.flags.bForced = false;
								newnode.flags.ForeDir = direction.NOWHERE;
								// this of course must start(?) exactly how the other ended(?)...
								newnode.flags.BackDir = Opposite( node.flags.ForeDir );
								newnode.x = tx;
								newnode.y = ty;
								{
									var xx = tx + this.x;
									var yy = ty + this.y;
									if( xx < this.min_x )
									{
										this.w += this.min_x - xx;
										this.min_x = xx;
									}
									if( xx >= ( this.min_x + this.w ) )
										this.w = xx - this.min_x + 1;
									if( yy < this.min_y )
									{
										this.h += this.min_y - yy;
										this.min_y = yy;
									}
									if( yy >= ( this.min_y + this.h ) )
										this.h = yy - this.min_y + 1;
	                
								}
								//console.log( ("Push path %d,%d  min=%d,%d size=%d,%d"), newnode.x, newnode.y, this.min_x, this.min_y, this.w, this.h );
								this.pds_path.push( newnode );
								nPathLayed++;
								node = this.pds_path[this.pds_path.length-1]; // okay this is now where we are.
							}
						}
					}
				}
			};
	        
	        
	        
			// unlay until the loop spot is found...
			// destination x, y to extend the path to...
			// unwinding loops, and auto extension is
			// done.
			// (should also modify the region information in the layer itself)
	        
			//-- this section used by SaveLayer
			// iLayer is the board_layer_id in board_layer table
			// when loaded, or saved, this is updated, and is valid
			// until saved again (will change on save)
	        
	        
			// can include the bacground texturing on the board....
	function		Opposite(n) { return (((n)+4)&7) }
	function		layerDirLeft(n)  {return   (((n)-1)&7) }
	function		layerDirRight(n) {return  (((n)+1)&7) }
	function		LeftOrRight(n,i)  {return   (((n)&1)?((i)?layerDirLeft(n):layerDirRight(n)):((i)?layerDirRight(n):layerDirLeft(n))) }
	function		NearDir(nNewDir, nDir) {return ( ( nNewDir == (nDir) ) ? 0 :   
				( nNewDir == ( ( (nDir) + 1 ) & 7 ) )? -1 :    
				( nNewDir == ( ( (nDir) - 1 ) & 7 ) )? 1 : 10 )
			}
	        
	        
	//------//--------------------------------------------------------------------------
	        
			Layer.prototype.isolate= function( )
			{
				// can't isoloate root
				if( this.flags.bRoot )
					return ;
				//if( !this.pool )
				//	return;
			        
				var layer0 = this.board.rootLayer;
				if( this.next )
				{
					this.next.prior = this.prior;
				}
				else
					layer0.prior = this.prior;
				if( this.prior )
					this.prior.next = this.next;
				else
					layer0.next = this.next;
			};
	        
	//--------------------------------------------------------------------------

			Layer.prototype.GetLastBackDirection = function( )
			{
				var node;
				node = this.pds_path[this.pds_path.length-1];
				if( node )
				{
				   return node.flags.BackDir;
				}
				return direction.NOWHERE;
			};
			Layer.prototype.GetLastForeDirection = function( )
			{
				var node;
				node = this.pds_path[this.pds_path.length-1];
				if( node )
				{
				   return node.flags.ForeDir;
				}
				return direction.NOWHERE;
			};
		        
		        
			Layer.prototype.Overlaps = function(  x,  y )
			{
				var node;
				var n;
				// just in case, don't check the top node
				// we may have been stupid...
				// and given current routing rules, there should never
				// be an opportunity which even the 5th segment might overlap.
				
				for( n = 1; node = this.pds_path[this.pds_path.length- n ]; n++ )
				{
					var xofs, yofs;
					//console.log( ("checking overlap of %d,%d at %d,%d (%d)")
					//		 , x, y
					//		 , node.x, node.y, n );
					// should we test for overlap on via?
					// that's really the only way we can catch 50% of the intersections
					// of two diagonals, at shared via coordinate, instead of in-cell line overlap
					if( node.x == x && node.y == y )
					{
						return n;
					}
					var viaset = (this.peice);
					//if( n > 2 )
					var filler;
					if( filler = viaset.GetViaFill1( xofs, yofs, node.flags.ForeDir ) )
						if( ( ( node.x + xofs ) == x ) && ( ( node.y + yofs ) == y ) )
						{
						   console.log(("hit via fill1 of node %d,%d"), xofs, yofs );
						   return n;
						}
					if( filler = viaset.GetViaFill2( xofs, yofs, node.flags.ForeDir ) )
						if( ( ( node.x + xofs ) == x ) && ( ( node.y + yofs ) == y ) )
						{
						   console.log(("hit via fill2 of node %d,%d"), xofs, yofs );
						   return n;
						}
					if( filler = viaset.GetViaFill1( xofs, yofs, node.flags.BackDir ) )
						if( ( ( node.x + xofs ) == x ) && ( ( node.y + yofs ) == y ) )
						{
						   console.log(("hit via fill1 of node back %d,%d"), xofs, yofs );
						   return n;
						}
					if( filler = viaset.GetViaFill2( xofs, yofs, node.flags.BackDir ) )
						if( ( ( node.x + xofs ) == x ) && ( ( node.y + yofs ) == y ) )
						{
						   console.log(("hit via fill2 of node back %d,%d"), xofs, yofs );
						   return n;
						}
				}
				return 0;
			};
		        
			// result is the last node (if any... which is a peekstack)
			// UnlayPath 0 layers unlocks a forced node
			// UnlayPath 1 backs up 1 step
			// Intent for use with Overlap which results in nSteps back to the overlap.
			// due to node flags, UnlayPath may choose to not undo all layers.
			// it may even perform internal modifications to the node
			// oh - and it retuns a free PeekStack on the path data
			Layer.prototype.UnlayPath = function( nLayers )
			{
				// unwind to, and including this current spot.
				// this is to handle when the line intersects itself.
				// other conditions of unlaying via pathways may require
				// other functionality.
				var n;
				var node;// = (PLAYER_PATH_NODE)PopData( &pds_path );
				//console.log( ("overlapped self at path segment %d"), nLayers );
				for( n = nLayers; (n && (node = this.pds_path.pop() )), n; n-- )
				{
					//console.log( ("Popped node %d(%p)"), n, node );
					// grab the NEXT node...
					// if it has bForced set... then this node must exist.
					var next = this.pds_path[this.pds_path.length-1];
					if( next && next.flags.bForced )
					{
						DebugBreak();
						node.flags.ForeDir = direction.NOWHERE;
						return node;
					}
					if( node && node.flags.bForced )
					{
						DebugBreak();
						// this is SO bad.
					}
				}
				//console.log( ("Okay done popping... %d, %p"), n, node );
				if( node )
				{
					var next = this.pds_path[this.pds_path.length-1];
					// set this as nowhere, so that we can easily just step forward here..
					if( !next )
					{
						if( !node.flags.bForced )
						{
							node.flags.ForeDir = direction.NOWHERE;
						}
						this.pds_path.push( node );
						return node;
					}
					if( !nLayers
						&& next.flags.bForced
						&& next.flags.BackDir != direction.NOWHERE )
					{
						// if it was forced, then this MUST be here.  There is a reason.
						// there is also a way to end this reason, and unlay 0 path.  This
						// releases the foredir to anything.  This may be used for error correction path
						// assumptions?
						debugger;
						if( next.flags.bTry )
						{
							node = this.pds_path.pop();
							// this is the second attempt
							if( !node.flags.bFlopped )
							{
								node.flags.bFlopped = 1;
								node.flags.ForeDir = LeftOrRight( Opposite( node.flags.BackDir ), 1 );
							   return node;
							}
						}
						next.flags.bForced = 0;
					}
					else
					{
						next.flags.ForeDir = direction.NOWHERE;
					   console.log( ("this node itself is okay...") );
					}
				   return next;
				}
				return null;
			};
	//------------------------------------------

	Layer.prototype.FindDirection = function( _x, _y, wX, wY ) // From, To
			{
				var nDir;
			        
				if( _x < wX ) 
				{
					if( _y > wY )
						nDir = direction.UP_RIGHT;
					else if( _y < wY )
						nDir = direction.DOWN_RIGHT;
					else
						nDir = direction.RIGHT;
				}
				else if( _x > wX )
				{
					if( _y > wY ) 
						nDir = direction.UP_LEFT;
					else if( _y < wY )
						nDir = direction.DOWN_LEFT;
					else
						nDir = direction.LEFT;
				}
				else
				{
					if( _y > wY ) 
						nDir = direction.UP;
					else if( _y == wY ) 
						nDir = direction.NOWHERE;
					else
						nDir = direction.DOWN;
				}
				return nDir;
			};
		        
		        
			Layer.prototype.move = function( del_x, del_y )
			{       
				this.x += del_x;
				this.y += del_y;
				this.min_x += del_x;
				this.min_y += del_y;
				//console.log( "LAYER MOVE:", del_x, del_y, this.x, this.y );
				{
					this.linked.forEach( (layer)=> {
						if( layer.flags.bRoute )
						{
							if( layer.route_end_layer.layer == this && layer.route_start_layer.layer != this )
							{
								var node = layer.pds_path[layer.pds_path.length-1];
								layer.LayPath( layer.x + ((!node)?0:node.x) + del_x
												  , layer.y + ((!node)?0:node.y) + del_y );
								// and here node is invalid!
							}
							if( layer.route_start_layer.layer == this )
							{
								var node = layer.pds_path[layer.pds_path.length-1];
								if( layer.route_end_layer.layer )
								{
									var destx = node.x + layer.x;
									var desty = node.y + layer.y;
									layer.BeginPath( layer.x + del_x, layer.y + del_y );
									layer.LayPath( destx, desty );
								}
								else
								{
									console.log( ("This via should have been deleted?!") );
								}
								//layer.UnlayPath(
								// RelayPathFrom( wX, wY );
							}
						}
					});
			        
				}
			};



	function LayerPool( board ) {
		var pool = [];
		return {
			get(peice, routable, _x,  _y, _w,  _h,  ofsx,  ofsy ) {
				var l = pool.pop();
				if( !l ) 
					l = Layer(board, peice, routable, _x,  _y, _w,  _h,  ofsx,  ofsy );
				return l;
			}
			,drop(l) {
				pool.push(l);
			}
		}
	}

	const MK_LBUTTON = 1;
	const MK_RBUTTON = 2;

	// should be 8 pixels on each and every side
	// these will be the default color (black?)
	const SCREEN_PAD = 8;


	function Board( parent ) {
		if( !(this instanceof Board)) return new Board(parent );

		var canvas = this.canvas = document.createElement( "canvas" );
		canvas.width = 1024;
		canvas.height = 1024;
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		this.ctx = canvas.getContext( "2d" );
		parent.appendChild( canvas );
		var board = this;
		var _buttons = 0;
		function mouseMove( evt ) {
			evt.preventDefault();
			board.mousePos.x = evt.clientX;
			board.mousePos.y = evt.clientY;
			var pRect = parent.getBoundingClientRect();
			
			board.DoMouse( evt.offsetX * canvas.width/pRect.width, evt.offsetY* canvas.height/pRect.height, _buttons );
		}
		function mouseUp( evt ) {
			evt.preventDefault();
			_buttons = evt.buttons;
			board.mousePos.x = evt.clientX;
			board.mousePos.y = evt.clientY;
			var pRect = parent.getBoundingClientRect();
			
			board.DoMouse( evt.offsetX * canvas.width/pRect.width, evt.offsetY* canvas.height/pRect.height, _buttons );
		}
		function mouseDown( evt ) {
			evt.preventDefault();
			_buttons = evt.buttons;
			board.mousePos.x = evt.clientX;
			board.mousePos.y = evt.clientY;
			var pRect = parent.getBoundingClientRect();
			
			board.DoMouse( evt.offsetX * canvas.width/pRect.width, evt.offsetY* canvas.height/pRect.height, _buttons );
		}

		canvas.addEventListener( "mousemove", mouseMove );
		canvas.addEventListener( "mouseup", mouseUp );
		canvas.addEventListener( "mousedown", mouseDown );
		//canvas.oncontextmenu = (event)=>{ event.preventDefault();return false};
		parent.addEventListener( "contextmenu", (event)=>{ 
			event.preventDefault();
			return false;
		}, false );
		document.body.addEventListener( "contextmenu", (event)=>{ 
			event.preventDefault();
			return false;
		}, false );
		canvas.addEventListener( "contextmenu", (event)=>{ 
				event.preventDefault();
				return false;
			}, false );

		// basic configured size.
		this.cellSize = { width: 16, height:16 };

		// original cell width/height
		// cell_width, height are updated to reflect scale
		this._cell_width = 0;
		this._cell_height = 0;

		this.default_peice_instance; // the instance of the background of the board.
		this.default_peice;  // the background of the board.

		this.OnClose;  // unused; would be a callback for when this is 'closed'
		this.psvClose;

		this.peices = [];  // array of peice types that this board has created

		this.layerPool = LayerPool();

		// current layer which has a mouse event dispatched to it.
		this.mouse_current_layer;
		this.route_current_layer;
		this.move_current_layer;

		this.mousePos = { x:0, y:0 }; // physical mouse position on the canvas(broser)

		this.xStart = 0; // Lock position for drag/slide/size
		this.yStart = 0; // Lock position for drag/slide/size
			
		this.wX = 0;  // mouse cell position on the board, last working X
		this.wY = 0;  // mouse cell position on the board, last working Y
			
		this.board_width = 50; // visible size of the board in cell count
		this.board_height = 50; // visible size of the board in cell count

		this.board_origin_x = 0;
		this.board_origin_y = 0; // [0][0] == this coordinate.

		this.flags = {
			bSliding : 0,
			bDragging : 0,
			bLockLeft : 0,
			bLockRight : 0,
			bLeft : 0,
			bRight : 0,
			// left changed happend both when a button is clicked
			// and when it is unclicked.
			bLeftChanged : 0,
			bRightChanged : 0,
		} ;

		this.scale = 0;
		this.current_path = {
			 viaset : null,
			 _x :0, _y:0
		} ;

		this.selected = null;

		function Init( board )
		{
			board.peices = [];
			//cell_width = 16;
			//cell_height = 16;
			board.board_origin_x = 0;
			board.board_origin_y = 0;
			board.scale = 0;
			board.default_peice = null;
			board.mouse_current_layer = null;
			board.route_current_layer = null;
			board.move_current_layer = null;
			board.flags.bSliding = 0;
			board.flags.bDragging = 0;
			board.flags.bLockLeft = 0;
			board.flags.bLeftChanged = 0;
			board.flags.bLeft = 0;
			board.flags.bLockRight = 0;
			board.flags.bRightChanged = 0;
			board.flags.bRight = null;
			board.layerPool = LayerPool();

			board.OnClose = null;
			//setTimeout( board.BoardRefresh.bind(board), 1000 );
			}


		//BOARD::BOARD()
		Init( this );
	}

	Board.prototype.select = function(n) {
		this.selected = n;
		this.BoardRefresh();
	};

	Board.prototype.GetCellSize = function(  )  {
		return this.cellSize;
	};

	Board.prototype.SetScale = function( _scale ) {
		if( _scale < 0 || _scale > 2 )
			return;
		this.cellSize.width = this._cell_width >> _scale;
		this.cellSize.height = this._cell_height >> _scale;
		this.scale = _scale;
	};
	Board.prototype.SetCellSize = function( cx,  cy )
	{
		this.cellSize.width = this._cell_width = cx;
		this.cellSize.height = this._cell_height = cy;
	};
		
	Board.prototype.DrawLayer = function( layer )
	{
		if( this.selected == layer.psvInstance ) {
			this.ctx.fillStyle = "#20c01040";
		}
		layer.Draw( this, this.ctx
			, SCREEN_PAD + ( this.board_origin_x + (layer.x) ) * this.cellSize.width
			, SCREEN_PAD + ( this.board_origin_y + (layer.y) ) * this.cellSize.height
			);
	};
	Board.prototype.reset = function( )
	{
		this.board_origin_x = 0;
		this.board_origin_y = 0;
		

		this.layerPool = LayerPool();
	};


	Board.prototype.GetScale = function(  )
	{
		return this.scale;
	};

	Board.prototype.SetBackground = function( peice )
	{
		this.default_peice = peice;
		this.default_peice_instance = this.default_peice.methods.Create(peice.psvCreate);
		this.rootLayer = new Layer( this, this.default_peice );
		peice.image.addEventListener( "load", ()=>{
			this.BoardRefresh();
		});
	};

	Board.prototype.BeginPath = function( viaset, x, y, psv )
	{
		if( this.mouse_current_layer )
		{
			var pl = new Layer( this, viaset );
			pl.flags.bRoute = true;
			var connect_okay = this.mouse_current_layer
				.peice
				.methods
				.ConnectBegin( this.mouse_current_layer.psvInstance
							, (this.wX - this.mouse_current_layer.x)
							, (this.wY - this.mouse_current_layer.y)
							, viaset
							, pl.psvInstance );
			if( !connect_okay )
			{
				return false;
			}
			this.mouse_current_layer.Link( pl, LINK_VIA_START
											, (this.wX - this.mouse_current_layer.x)
											, (this.wY - this.mouse_current_layer.y) );
			this.route_current_layer = pl;
			// set the via layer type, and direction, and stuff..
			pl.BeginPath( this.wX, this.wY );

			pl.link_top(this.rootLayer);

		}
		return true;
	};

	Board.prototype.GetLayerAt = function( wX, wY, notlayer )
	{
		var layer = this.rootLayer;
		while( layer )
		{
			var l;
			if( layer !== notlayer )
				if( l = layer.IsLayerAt(wX, wY) )
				{
					//console.log( ("Okay got a layer to return...") );
					return { layer:layer, at:l };
				}
			layer = layer.next;
		}
		return null;
	};

	Board.prototype.GetLayerDataAt = function( wX, wY,  notlayer /*= null*/ )
	{
		var layer = this.GetLayerAt( wX, wY, notlayer );
		if( layer )
			return layer;
		return null;
	};


	// viaset is implied by route_current_layer
	Board.prototype.EndPath = function(  x,  y )
	{
		// really this is lay path also...
		// however, this pays attention to mouse states
		// and data and layers and connections and junk like that
		// at this point I should have
		//   mouse flags.bRight, bLeft
		//   route_current_layer AND mouse_current_layer
		//
		var layer;
		var pld;
		// first layer should result and be me... check it.
		if( layer = this.GetLayerAt( x, y, this.route_current_layer ) )
		{
			if( this.flags.bLeftChanged )
			{
				pld = layer;
				var connect_okay = pld.layer.peice.methods.ConnectEnd( pld.layer.psvInstance
																					, (this.wX - layer.layer.x)
																					, (this.wY - layer.layer.y)
																					, this.route_current_layer.peice
																					, this.route_current_layer.psvInstance );
				if( connect_okay )
				{
					//DebugBreak();
					console.log( ("Heh guess we should do something when connect succeeds?") );
					// keep route_current_layer;
					layer.layer.Link( this.route_current_layer, LINK_VIA_END, (this.wX-layer.at.x), (this.wY-layer.at.y) );
					this.route_current_layer = null;
					return true;
				}
				else
				{
					this.route_current_layer.Unlink();
					this.route_current_layer.isolate();

					var disconnect_okay = this.route_current_layer
							.peice
							.methods
							.Disconnect( this.route_current_layer.psvInstance );

					this.route_current_layer = null;
					this.BoardRefresh();
					//DebugBreak();
					//delete route_current_layer;
					//this.route_current_layer = null;
					return false;
				}
			}
		}
		else
		{
			// right click anywhere to end this thing...
			if( this.route_current_layer &&
				this.flags.bLeftChanged &&
				!this.flags.bLeft )
			{
				//DebugBreak();
				// also have to delete this layer.
					this.route_current_layer.Unlink();
					this.route_current_layer.isolate();

					var disconnect_okay = this.route_current_layer
							.peice
							.methods
							.Disconnect( this.route_current_layer.psvInstance );

					this.route_current_layer = null;
				//delete this.route_current_layer;
				console.log( "route current layer goes to null...");
				this.route_current_layer = null;
				this.BoardRefresh();
				return false;
			}
		}
		return this.LayPathTo( this.wX, this.wY );
	};

	Board.prototype.UnendPath = function( )
	{
		var disconnect_okay = this.mouse_current_layer
			.peice
			.methods
			.Disconnect( this.mouse_current_layer.psvInstance );
		if( disconnect_okay )
		{
			this.mouse_current_layer.Unlink();
			this.mouse_current_layer.isolate();
			this.mouse_current_layer.link_top();
			this.route_current_layer = this.mouse_current_layer;
		}
	};



	Board.prototype.PutPeice = function(  peice, x, y, psv )
	{
		//uintptr_t psv = peice.Create();
		// at some point I have to instance the peice to have a neuron...
		if( !peice ) {
			console.log( ("PEICE IS null!") );
			return;
		}

		var size = peice.getsize( );//&rows, &cols );
		var hot = peice.gethotspot( );
		console.log( ("hotspot offset of created cell is %d,%d so layer covers from %d,%d to %d,%d,")
					, hot.x, hot.y
					, x-hot.x, y-hot.y
					, x-hot.x+size.cols, y-hot.y+size.rows );
		peice.psvCreate = psv; // kinda the wrong place for this but we abused this once upon a time.
		
		var pl = new Layer( this, peice, x, y, size.cols, size.rows, hot.x, hot.y );
		// should be portioned...
		pl.link_top(this.rootLayer);
		
		this.BoardRefresh();
		return pl.psvInstance;
	};


	var errCount = 0;
	Board.prototype.BoardRefresh = function(  )  // put current board on screen.
	{
		var x,y;
		const ctx = this.ctx;
		const canvas = this.canvas;
		
		ctx.clearRect( 0, 0, canvas.width, canvas.height );
		// 8 border top, bottom(16),left,right(16)
		this.board_width = ( canvas.width - (2*SCREEN_PAD) + ( this.cellSize.width-1) ) / this.cellSize.width;
		this.board_height = ( canvas.height - (2*SCREEN_PAD) + (this.cellSize.height-1) ) / this.cellSize.height;

		try {
			if( this.default_peice )
			{
				//var rows,cols;
				var size;
				var sx, sy;
				size = this.default_peice.getsize( );

				if( this.board_origin_x >= 0 )
					sx = this.board_origin_x % size.cols;
				else
					sx = -(-this.board_origin_x % size.cols);

				if( sx >= 0 )
					sx -= size.cols;

				if( this.board_origin_y >= 0 )
					sy = this.board_origin_y % size.rows;
				else
					sy = -(-this.board_origin_y % size.rows);

				if( sy >= 0 )
					sy -= size.rows;

				for( x = sx; x < this.board_width; x += size.cols )
					for( y = sy; y < this.board_height; y += size.rows )
					{
						this.default_peice.methods.Draw( this.default_peice, this.default_peice_instance
										, ctx
										, x * this.cellSize.width + SCREEN_PAD
										, y * this.cellSize.height + SCREEN_PAD
										);
					}
			}

			if( this.rootLayer )
			{			
				var layer = this.rootLayer;
				while( layer && (layer = layer.prior) )
				{
					this.DrawLayer( layer );
				}
			}
		}catch(err) {
			if( errCount++ < 10 )
			console.log( "(try again later) FAILED:", err ); 
		}
	};

	Board.prototype.LayPathTo = function(  wX, wY )
	{
		this.route_current_layer.LayPath( wX, wY );
		this.BoardRefresh();//SmudgeCommon( pControl );
		return true;
	};

	Board.prototype.SCRN_TO_GRID_X = function(x) { return ((x - SCREEN_PAD)/this.cellSize.width - this.board_origin_x ) };
	Board.prototype.SCRN_TO_GRID_Y = function(y) { return ((y - SCREEN_PAD)/this.cellSize.height - this.board_origin_y) };
	Board.prototype.DoMouse = function(  X,  Y,  b )
	{
		this.wX = Math.floor(this.SCRN_TO_GRID_X( X ));
		this.wY = Math.floor(this.SCRN_TO_GRID_Y( Y ));
		//console.log( ("mouse at %d,%d"), this.wX, this.wY );
			
		this.flags.bLeftChanged = this.flags.bLeft ^ ( (b & MK_LBUTTON) != 0 );
		this.flags.bRightChanged = this.flags.bRight ^ ( (b & MK_RBUTTON) != 0 );
		this.flags.bLeft = ( (b & MK_LBUTTON) != 0 );
		this.flags.bRight = ( (b & MK_RBUTTON) != 0 );
			
		if( this.flags.bRightChanged && !this.flags.bRight )
		{
			if( !this.route_current_layer )
			{
				//console.log( ("right at %d,%d"), this.wX, this.wY );
				pld = this.GetLayerDataAt( this.wX, this.wY );
				if( pld )
				{
					console.log( ("Okay it's on a layer, and it's at %d,%d on the layer"), this.wX, this.wY );
					if( !pld.layer.peice.methods.OnRightClick( pld.layer.psvInstance, this.wX, this.wY ) )
						return; // routine has done something to abort processing...
				}
				else if( this.default_peice )
				{
					if( !this.default_peice.methods.OnRightClick(null,this.wX,this.wY) )
						return; // routine has done something to abort processing...
				}
			}
		}
			
		if( this.flags.bSliding )
		{
			if( ( this.flags.bLockLeft && this.flags.bLeft ) ||
				( this.flags.bLockRight && this.flags.bRight ) )
			{
					if( this.wX != this.xStart ||
						this.wY != this.yStart )
					{
						//console.log( ("updating board origin by %d,%d"), this.wX-this.xStart, this.wY-this.yStart );
						this.board_origin_x += this.wX - this.xStart;
						this.board_origin_y += this.wY - this.yStart;
						this.wX = this.xStart;
						this.wY = this.yStart;
						this.BoardRefresh();//SmudgeCommon( pControl );
					}
				}
				else
				{
					this.flags.bSliding = false;
					this.flags.bLockLeft = false;
					this.flags.bLockRight = false;
				}
			}
		else if( this.move_current_layer ) // moving a node/neuron/other...
		{
			if( this.flags.bLeft )
			{
				this.move_current_layer.move( this.wX - this.xStart, this.wY - this.yStart );
				this.xStart = this.wX;
				this.yStart = this.wY;
				this.BoardRefresh();//SmudgeCommon( pControl );
				this.move_current_layer
					.peice
					.methods
					.OnMove( this.move_current_layer
								.psvInstance
								);
			}
			else
			{
				this.move_current_layer = null;
			}
		}
		else
		{
			if( this.flags.bLeft )  // not drawing, not doing anything...
			{
				// find neuron center...
				// first find something to do in this cell already
				// this is 'move neuron'
				// or disconnect from...
			
				var x = this.wX, y = this.wY;
				var layer = this.GetLayerAt( x, y, this.route_current_layer );
				//console.log( ("event at %d,%d"), this.wX, this.wY );
				if( this.route_current_layer )
				{
					if( this.flags.bLeftChanged )
					{
						if( !layer )
						{
							// if it was a layer... then lay path to is probably
							// going to invoke connection procedures.
							this.default_peice.methods.OnClick(null,this.wX,this.wY);
						}
					}
					this.LayPathTo( this.wX, this.wY );
				}
				else if( layer )
				{
					var pld = layer;
					this.mouse_current_layer = layer.layer;
					//console.log( ("Generate onclick method to peice.") );
					pld.layer.peice.methods.OnClick( pld.layer.psvInstance, layer.at.x, layer.at.y );
					this.mouse_current_layer = null;
				}
				else if( this.default_peice )
				{
					//click on the background.
					this.default_peice.methods.OnClick(null,this.wX,this.wY);
				}
			}
			else
			{
				if( this.route_current_layer )
				{
					// ignore current layer, and uhmm
					// get Next layer data... so we have something to connect to...
					// okay end path is where all the smarts of this is...
					// handles mouse changes in state, handles linking to the peice on the board under this route...
					this.EndPath( this.wX, this.wY );
				}
			}
		}
	};


	Board.prototype.LockDrag = function( )
	{
		// this method is for locking the SLIDING on the board...
		// cannot lock if neither button is down...??
		if( this.flags.bLeft || this.flags.bRight )
		{
			this.xStart = this.wX;
			this.yStart = this.wY;
			this.flags.bSliding = true; // <<----------
			if( this.flags.bLeft )
			{
				this.flags.bLockRight = false;
				this.flags.bLockLeft = true;
			}
			else
			{
				this.flags.bLockRight = true;
				this.flags.bLockLeft = false;
			}
		}
		//Log( ("Based on current OnMouse cell data message, lock that into cursor move...") );
	};

	Board.prototype.LockPeiceDrag = function( )
	{
		// this method is for locking the DRAG on the board...
		// cannot lock if neither button is down...??
		if( this.flags.bLeft || this.flags.bRight )
		{
			this.xStart = this.wX;
			this.yStart = this.wY;
			this.flags.bDragging = true;  // <<----------
			this.move_current_layer = this.mouse_current_layer; // <<----------
			if( this.flags.bLeft )
			{
				this.flags.bLockRight = false;
				this.flags.bLockLeft = true;
			}
			else
			{
				this.flags.bLockRight = true;
				this.flags.bLockLeft = false;
			}
		}
		//Log( ("Based on current OnMouse cell data message, lock that into cursor move...") );
	};

	Board.prototype.destroy = function()
	{
		//if( OnClose )
		//	OnClose( psvClose, this );
		//RemoveTimer( iTimer );
		canvas.remote();
	};

	Board.prototype.GetSize = function(  )
	{
		// result with the current cell size, so we know
		// how much to multiply row/column counters by.
		// X is always passed correctly?
		return { cols: this.board_width, rows: this.board_height };
	};

	Board.prototype.CreatePeice = function(  name //= ("A Peice")
									,  image //= null
									,  rows //= 1
									,  cols //= 1
									,  hotspot_x
									,  hotspot_y
									,  methods //= null
									,  psv
									)
	{
		var peice = Peice( this, name, image, rows, cols, hotspot_x, hotspot_y, true, false, methods, psv );
		this.peices.push( peice );
		return peice; // should be able to auto cast this...
	};

	Board.prototype.CreateVia = function( name //= ("A Peice")
												,  image //= null
												, imageNeg
												,  methods //= null
												,  psv
												)
	{
		var via = new Via( this, name, image, imageNeg, methods, psv );
		this.peices.push( via );
		return via;
	};

	Board.prototype.forEachPeice = function( cb ) {
		this.peices.forEach( cb );
	};

	Board.prototype.GetPeice = function( peice_name )
	{
		return this.peices.find( (peice)=>peice.name === peice_name );
	};

	/*

	<SVG>
	 
		<defs>
			<radialGradient id="gradient-0" gradientUnits="userSpaceOnUse" cx="32.806" cy="38.359" r="31.21" gradientTransform="matrix(0.556701, 0.060335, -0.061948, 0.571572, 35.942307, 40.952184)"><stop offset="0" style="stop-color: rgba(255, 249, 249, 0.72);"></stop><stop offset="1" style="stop-color: rgba(255, 255, 255, 0);"></stop></radialGradient>
			<radialGradient id="gradient-1" gradientUnits="userSpaceOnUse" cx="37.916" cy="50.156" r="31.21" gradientTransform="matrix(1.665372, 0.004509, -0.004806, 1.773443, -10.723868, -25.421527)"><stop offset="0" style="stop-color: rgba(227, 227, 227, 0);"></stop><stop offset="1" style="stop-color: rgba(0, 0, 0, 0.45);"></stop></radialGradient>
			<radialGradient id="gradient-2" gradientUnits="userSpaceOnUse" cx="35.259" cy="46.687" r="31.21" gradientTransform="matrix(1.490671, 0.00387, 0.00009, 1.829344, 1.658628, -19.147887)"><stop offset="0" style="stop-color: rgba(246, 243, 243, 0);"></stop><stop offset="1" style=""></stop></radialGradient>
			<linearGradient id="gradient-4" gradientUnits="userSpaceOnUse" x1="47.355" y1="12.732" x2="47.355" y2="74.298" gradientTransform="matrix(0.770686, -0.637215, 0.374193, 0.45257, 22.306562, 74.687881)"><stop offset="0" style="stop-color: rgba(227, 227, 227, 0.29);"></stop><stop offset="1" style="stop-color: rgba(0, 0, 0, 0.06);"></stop></linearGradient>
		</defs>
		<!--
		<ellipse style="fill: rgb(255, 0, 255);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
		<ellipse style="fill: rgb(0, 0, 255);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
		<ellipse style="fill: rgb(128, 0, 0);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
		-->
		<ellipse style="fill: rgb(0, 255, 68);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
		<circle style="fill: url(&quot;#gradient-2&quot;);" cx="69.539" cy="83.618" r="30.783" transform="matrix(1.062366, 0, 0, 1.046363, -8.38973, -7.437199)"></circle>
		<circle style="fill: url(&quot;#gradient-0&quot;);" cx="63.14" cy="78.072" r="30.783"></circle>
		<circle style="fill: url(&quot;#gradient-1&quot;); fill-opacity: 0.68;" cx="63.567" cy="77.218" r="30.783"></circle>
		<circle style="fill: url(&quot;#gradient-4&quot;);" cx="63.14" cy="78.925" r="30.783" transform="matrix(1.00693, 0, 0, 0.99307, -0.224218, 0.3336)"></circle></g>
	</SVG>


	<SVG width="75" height="75" viewBox="0 0 150 150": >
	 
			<defs>
				<radialGradient id="gradient-0" gradientUnits="userSpaceOnUse" cx="32.806" cy="38.359" r="31.21" gradientTransform="matrix(0.556701, 0.060335, -0.061948, 0.571572, 35.942307, 40.952184)"><stop offset="0" style="stop-color: rgba(255, 249, 249, 0.72);"></stop><stop offset="1" style="stop-color: rgba(255, 255, 255, 0);"></stop></radialGradient>
				<radialGradient id="gradient-1" gradientUnits="userSpaceOnUse" cx="37.916" cy="50.156" r="31.21" gradientTransform="matrix(1.665372, 0.004509, -0.004806, 1.773443, -10.723868, -25.421527)"><stop offset="0" style="stop-color: rgba(227, 227, 227, 0);"></stop><stop offset="1" style="stop-color: rgba(0, 0, 0, 0.45);"></stop></radialGradient>
				<radialGradient id="gradient-2" gradientUnits="userSpaceOnUse" cx="35.259" cy="46.687" r="31.21" gradientTransform="matrix(1.490671, 0.00387, 0.00009, 1.829344, 1.658628, -19.147887)"><stop offset="0" style="stop-color: rgba(246, 243, 243, 0);"></stop><stop offset="1" style=""></stop></radialGradient>
				<linearGradient id="gradient-4" gradientUnits="userSpaceOnUse" x1="47.355" y1="12.732" x2="47.355" y2="74.298" gradientTransform="matrix(0.770686, -0.637215, 0.374193, 0.45257, 22.306562, 74.687881)"><stop offset="0" style="stop-color: rgba(227, 227, 227, 0.29);"></stop><stop offset="1" style="stop-color: rgba(0, 0, 0, 0.06);"></stop></linearGradient>
			</defs>
			<!--
			<ellipse style="fill: rgb(255, 0, 255);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			<ellipse style="fill: rgb(0, 0, 255);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			<ellipse style="fill: rgb(128, 0, 0);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			<ellipse style="fill: rgb(0, 255, 68);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			-->
			<ellipse style="fill: rgb(255, 255, 0);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			<circle style="fill: url(&quot;#gradient-2&quot;);" cx="69.539" cy="83.618" r="30.783" transform="matrix(1.062366, 0, 0, 1.046363, -8.38973, -7.437199)"></circle>
			<circle style="fill: url(&quot;#gradient-0&quot;);" cx="63.14" cy="78.072" r="30.783"></circle>
			<circle style="fill: url(&quot;#gradient-1&quot;); fill-opacity: 0.68;" cx="63.567" cy="77.218" r="30.783"></circle>
			<circle style="fill: url(&quot;#gradient-4&quot;);" cx="63.14" cy="78.925" r="30.783" transform="matrix(1.00693, 0, 0, 0.99307, -0.224218, 0.3336)"></circle></g>
		</SVG>

	<SVG>  
			<ellipse cx="164.18392" cy="128.5" fill="#ffffff" id="svg_26" rx="41.17323" ry="12" stroke="#7f7f7f" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="6"/>
			<ellipse cx="164.18392" cy="123.5" fill="#ffffff" id="svg_27" rx="41.17323" ry="12" stroke="#ffffff" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="6"/>
			<ellipse cx="163.35715" cy="120.75" fill="#4558e8" id="svg_24" rx="35.07874" ry="11.25" stroke="#4558e8" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="6"/>
			<rect fill="#4558e8" height="65" id="svg_25" stroke="#cccccc" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-opacity="0" stroke-width="6" width="75.81102" x="125.62486" y="55.5"/>
			<ellipse cx="163.53037" cy="51.5" fill="#ffffff" id="svg_23" rx="41.17323" ry="12" stroke="#cccccc" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="2"/>
			<ellipse cx="163.93392" cy="45.25" fill="#b2b2b2" id="svg_21" rx="41.17323" ry="12" stroke="#cccccc" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="2"/>
	</SVG>

		*/

		function pad(n, width, z) {
			z = z || '0';
			n = n.toString(16);
			return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		  }
		  

		function makeNeuron() {
			var node = {
				on:makeOneNeuron(),
				off:makeOneNeuron(),
				range : [],
			};
			for( var n = 0; n < 8; n++ ) {
				node.range[n] = makeOneNeuron();
				node.range[n].setColor( `#${pad(0,2)}${pad(223 *(8-n)/8,2)}${pad(0,2)}`);
			}
			node.off.setColor( "#707070" );
			return node;
		}
	 function makeOneNeuron() {
		var svg = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
		svg.setAttribute( "width", 66 );
		svg.setAttribute( "height", 66 );
		svg.setAttribute( "viewBox", "-2 -2 68 68");
		svg.innerHTML = `
		<defs>
			<radialGradient id="gradient-0" gradientUnits="userSpaceOnUse" cx="-38.806" cy="-32.359" r="31.21" gradientTransform="matrix(0.556701, 0.060335, -0.061948, 0.571572, 35.942307, 40.952184)"><stop offset="0" style="stop-color: rgba(255, 249, 249, 0.72);"></stop><stop offset="1" style="stop-color: rgba(255, 255, 255, 0);"></stop></radialGradient>
			<radialGradient id="gradient-1" gradientUnits="userSpaceOnUse" cx="7.916" cy="20.156" r="31.21" gradientTransform="matrix(1.665372, 0.004509, -0.004806, 1.773443, -10.723868, -25.421527)"><stop offset="0" style="stop-color: rgba(227, 227, 227, 0);"></stop><stop offset="1" style="stop-color: rgba(0, 0, 0, 0.45);"></stop></radialGradient>
			<radialGradient id="gradient-2" gradientUnits="userSpaceOnUse" cx="5.259" cy="16.687" r="31.21" gradientTransform="matrix(1.490671, 0.00387, 0.00009, 1.829344, 1.658628, -19.147887)"><stop offset="0" style="stop-color: rgba(246, 243, 243, 0);"></stop><stop offset="1" style=""></stop></radialGradient>
			<linearGradient id="gradient-4" gradientUnits="userSpaceOnUse" x1="17.355" y1="-22.732" x2="17.355" y2="44.298" gradientTransform="matrix(0.770686, -0.637215, 0.374193, 0.45257, 22.306562, 74.687881)"><stop offset="0" style="stop-color: rgba(227, 227, 227, 0.29);"></stop><stop offset="1" style="stop-color: rgba(0, 0, 0, 0.06);"></stop></linearGradient>
		</defs>
		<!--
		<ellipse style="fill: rgb(255, 0, 255);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
		<ellipse style="fill: rgb(0, 0, 255);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
		<ellipse style="fill: rgb(128, 0, 0);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
		-->
		<circle ID="nodeColor" style="fill: rgb(35, 232, 0);" cx="32" cy="32" r="30"></circle>
		<circle style="fill:url(&quot;#gradient-2&quot;); fill-opacity: 0.28;" cx="39" cy="39" r="30" transform="matrix(1.062366, 0, 0, 1.046363, -8.38973, -7.437199)"></circle>
		<circle style="fill: url(&quot;#gradient-0&quot;); fill-opacity: 0.78;" cx="32" cy="32"  r="30"></circle>
		<circle style="fill:  url(&quot;#gradient-1&quot;); fill-opacity: 0.68;" cx="32" cy="32" r="30"></circle>
		<circle style="fill: url(&quot;#gradient-4&quot;);" cx="32" cy="32"  r="30" transform="matrix(1.00693, 0, 0, 0.99307, -0.224218, 0.3336)"></circle>
	`;
		svg.setColor = function( c ) {
			var color = svg.children.nodeColor;
			if( color ){
				color.style.fill = c;
			}

		};
		return svg;
	}

	function makeTrash() {
				var svg = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
				svg.setAttribute( "width", 66 );
				svg.setAttribute( "height", 66 );
				svg.setAttribute( "viewBox", "100 -5 130 170");
				svg.innerHTML = `   
				<ellipse cx="164.18392" cy="128.5" fill="#ffffff" id="svg_26" rx="41.17323" ry="12" stroke="#7f7f7f" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="6"/>
				<ellipse cx="164.18392" cy="123.5" fill="#ffffff" id="svg_27" rx="41.17323" ry="12" stroke="#ffffff" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="6"/>
				<ellipse cx="163.35715" cy="120.75" fill="#4558e8" id="svg_24" rx="35.07874" ry="11.25" stroke="#4558e8" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="6"/>
				<rect fill="#4558e8" height="65" id="svg_25" stroke="#cccccc" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-opacity="0" stroke-width="6" width="75.81102" x="125.62486" y="55.5"/>
				<ellipse cx="163.53037" cy="51.5" fill="#ffffff" id="svg_23" rx="41.17323" ry="12" stroke="#cccccc" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="2"/>
				<ellipse cx="163.93392" cy="45.25" fill="#b2b2b2" id="svg_21" rx="41.17323" ry="12" stroke="#cccccc" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="2"/>

			`;
				return svg;
	}

	function getSliderArrow() {
		return  `
	<g id="iconColor" class="layer" stroke="#DDDD00" fill="#DDDD00" transform="translate( 28,40) scale( 0.60)">
	<title>Layer 1</title>
	<rect  height="15" id="svg_1" opacity="0.7"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3" width="33" x="17.83333" y="48.5"/>
	<path d="m52.033,77.5l-1.033,-42.5c0,0 24.58544,20.66514 25.82504,19.88532c1.2396,-0.77982 -24.79204,22.61468 -24.79204,22.61468z"  id="svg_3" opacity="0.7"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3"/>
	<circle cx="93.83333" cy="33.5"  id="svg_4" opacity="0.7" r="2.82843"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3"/>
	<circle cx="94.2201" cy="49.05119"  id="svg_5" opacity="0.7" r="2.82843"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3"/>
	<circle cx="94.3847" cy="64.51913"  id="svg_6" opacity="0.7" r="2.82843"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3"/>
	<circle cx="94.17787" cy="81.27198"  id="svg_7" opacity="0.7" r="2.82843"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3"/>
 </g>
 `
	}

	function getArrowButton() {
		return `
	<g id="iconColor" class="layer" stroke="#DDDD00" fill="#DDDD00" transform="translate( 36,27) scale( 0.60) ">
	 <rect height="31"   stroke-opacity="0" stroke-width="5" width="20" x="34.5" y="43.5"/>
	 <path d="m44.125,98.54167c0,-1 -31.75,-25.25 -31.75,-25.25c0,0 65.25,-0.25 65.125,-0.29167c-0.125,-0.04167 -33.375,26.54167 -33.375,25.54167z"  id="svg_4" stroke="#000000" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-opacity="0" stroke-width="5"/>
	 <rect fill="#000000" fill-opacity="0" height="11.25" stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3" width="25.5" x="31.125" y="106.70833"/>
	 <rect fill="#000000" fill-opacity="0" height="0.25"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3" width="66.5" x="9.625" y="117.95833"/>
	</g>
	`
		
	}


	function getBulbIcon() {
		return `
	<g id="iconColor" class="layer" stroke="#FFFF00" transform="translate(40,45) scale( 0.50 )">
	<title>Layer 1</title>
	<path d="m57.08333,72.08333c2,8 1,18.5 1.5,22.5c0.5,4 -9.5,-1.5 -7.5,5c2,6.5 -12.5,6.5 -10.58333,-0.58333c1.91667,-7.08333 -3.41667,0.58333 -6.41667,-2.41667c-3,-3 5.5,-27 -3.58333,-33.08333c-9.08333,-6.08333 -11.91667,-12.41667 -8.91667,-26.91667c3,-14.5 7,-15 18,-18.5c11,-3.5 18,0 26.91667,9.91667c8.91667,9.91667 7.08333,14.58333 5.08333,24.58333c-2,10 -16.5,11.5 -14.5,19.5z" fill="#000000" fill-opacity="0" id="svg_3" opacity="0.7"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3"/>
	<line fill="none" fill-opacity="0"  opacity="0.7"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3" x1="33.58333" x2="58.58333" y1="86.08333" y2="86.08333"/>
	<line fill="none" fill-opacity="0"  opacity="0.7"  stroke-dasharray="null" stroke-linecap="null" stroke-linejoin="null" stroke-width="3" transform="rotate(-1.16913 45.8333 96.3333)" x1="34.08333" x2="57.58333" y1="96.58333" y2="96.08333"/>
	 </g>
	 `;
	}




	function makeNode( extra ) {
		var svg = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
		svg.setAttribute( "width", 66 );
		svg.setAttribute( "height", 66 );
		svg.setAttribute( "viewBox", "-10 0 150 150");
		svg.innerHTML = `
				<defs>
				<radialGradient id="gradient-0n" gradientUnits="userSpaceOnUse" cx="32.806" cy="38.359" r="31.21" gradientTransform="matrix(0.556701, 0.060335, -0.061948, 0.571572, 35.942307, 40.952184)"><stop offset="0" style="stop-color: rgba(255, 249, 249, 0.72);"></stop><stop offset="1" style="stop-color: rgba(255, 255, 255, 0);"></stop></radialGradient>
				<radialGradient id="gradient-1n" gradientUnits="userSpaceOnUse" cx="37.916" cy="50.156" r="31.21" gradientTransform="matrix(1.665372, 0.004509, -0.004806, 1.773443, -10.723868, -25.421527)"><stop offset="0" style="stop-color: rgba(227, 227, 227, 0);"></stop><stop offset="1" style="stop-color: rgba(0, 0, 0, 0.45);"></stop></radialGradient>
				<radialGradient id="gradient-2n" gradientUnits="userSpaceOnUse" cx="35.259" cy="46.687" r="31.21" gradientTransform="matrix(1.490671, 0.00387, 0.00009, 1.829344, 1.658628, -19.147887)"><stop offset="0" style="stop-color: rgba(246, 243, 243, 0);"></stop><stop offset="1" style=""></stop></radialGradient>
				<linearGradient id="gradient-4n" gradientUnits="userSpaceOnUse" x1="47.355" y1="12.732" x2="47.355" y2="74.298" gradientTransform="matrix(0.770686, -0.637215, 0.374193, 0.45257, 22.306562, 74.687881)"><stop offset="0" style="stop-color: rgba(227, 227, 227, 0.29);"></stop><stop offset="1" style="stop-color: rgba(0, 0, 0, 0.06);"></stop></linearGradient>
			</defs>
			<!--
			<ellipse style="fill: rgb(255, 0, 255);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			<ellipse style="fill: rgb(0, 0, 255);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			<ellipse style="fill: rgb(128, 0, 0);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			<ellipse style="fill: rgb(0, 255, 68);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			-->
			<circle style="fill: rgb(225, 195, 135); fill-opacity:0.5" cx="63" cy="78" r="60"></circle>
			<ellipse ID="nodeColor"  style="fill: rgb(255, 255, 0);" cx="63.354" cy="78.071" rx="30.93" ry="30.717"></ellipse>
			<circle   style="fill: url(&quot;#gradient-2n&quot;); fill-opacity: 0.68;" cx="69.539" cy="83.618" r="30.783" transform="matrix(1.062366, 0, 0, 1.046363, -8.38973, -7.437199)"></circle>
			<circle  style="fill: url(&quot;#gradient-0n&quot;); fill-opacity: 0.68;" cx="63.14" cy="78.072" r="30.783"></circle>
			<!--
			<circle style="fill: url(&quot;#gradient-1n&quot;); fill-opacity: 0.68;" cx="63.567" cy="77.218" r="30.783"></circle>
			<circle style="fill: url(&quot;#gradient-4n&quot;);" cx="63.14" cy="78.925" r="30.783" transform="matrix(1.00693, 0, 0, 0.99307, -0.224218, 0.3336)"></circle>
			-->
		` + (extra?extra():"")  ;
		svg.setColor = function(c) {
			var color = svg.children.nodeColor;
			if( color ){
				color.style.fill = c;
			}
		};
		svg.setIconColor = function(c) {
			var color = svg.children.iconColor;
			if( color ){
				color.style.fill = c;
				color.style.stroke = c;
			}
		};
		return svg;
	}



	function makeSlider() {
		var svg = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
		svg.setAttribute( "width", 166 );
		svg.setAttribute( "height",250 );
		svg.setAttribute( "viewBox", "-10 0 150 220");
		svg.innerHTML = `
		<defs>
			<linearGradient id="gradient-0c" gradientUnits="userSpaceOnUse" x1="37.908" y1="38.388" x2="37.908" y2="76.776"
					gradientTransform="matrix(0.29251, 0.956262, -1.062492, 0.325005, 98.316635, 28.52927)">
					<stop offset="0" style="stop-color: rgba(216, 216, 216, 1)"></stop>
					<stop offset="1" style="stop-color: rgba(165, 165, 165, 1)"></stop>
			</linearGradient>
			<bx-grid x="3.828" y="21.693" width="110.208" height="155.72"></bx-grid>
		</defs>
		<rect x="31.67" y="11.879" width="9.597" height="223.023" style="fill: rgb(216, 216, 216);" transform="matrix(1, 0, -0.000002, 1, -14.036083, -4.615945)"></rect>
		<g style="" transform="matrix(1, 0, 0, 1.070711, -35.728859, 29.265072)">
			<rect x="89.251" y="7.198" width="47.025" height="168.426" style="fill: rgb(216, 216, 216);"></rect><text style="fill: rgb(51, 51, 51); font-size: 11px; white-space: pre;"
					x="107.966" y="19.673">100</text><text style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;" x="114.203"
					y="85.893" transform="matrix(1, 0, 0, 1, 1.919386, -3.358925)">60<tspan x="114.2030029296875" dy="1em">&#8203;</tspan></text><text
					style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;" x="116.342" y="165.32">0</text><text
					style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;" x="114.422" y="125.013">30</text><text
					style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;" x="114.203" y="85.893" transform="matrix(1, 0, 0, 1, 0.219415, -52.050926)">90<tspan
							x="114.2030029296875" dy="1em">&#8203;</tspan></text><text style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;"
					x="113.943" y="152.364">10</text><text style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;" x="114.203"
					y="85.893" transform="matrix(1, 0, 0, 1, 0.699265, 51.595898)">20<tspan x="114.2030029296875" dy="1em">&#8203;</tspan></text><text
					style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;" x="114.203" y="85.893" transform="matrix(1, 0, 0, 1, -0.260427, 24.724503)">40<tspan
							x="114.2030029296875" dy="1em">&#8203;</tspan></text><text style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;"
					x="114.203" y="85.893" transform="matrix(1, 0, 0, 1, 0.699265, 10.32911)">50<tspan x="114.2030029296875" dy="1em">&#8203;</tspan></text><text
					style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;" x="114.203" y="85.893" transform="matrix(1, 0, 0, 1, 0.219419, -19.42137)">70<tspan
							x="114.2030029296875" dy="1em">&#8203;</tspan></text><text style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre;"
					x="114.203" y="85.893" transform="matrix(1, 0, 0, 1, 0.219419, -36.215992)">80<tspan x="114.2030029296875"
							dy="1em">&#8203;</tspan></text><text style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre; pointer-events: none; visibility: hidden;"
					x="114.203" y="85.893" transform="matrix(1, 0, 0, 1, 0.219418, -46.772614)">50<tspan x="114.2030029296875"
							dy="1em">&#8203;</tspan></text><text transform="matrix(1, 0, 0, 1, 85.63208, -33.816761)" style="fill: rgb(51, 51, 51); font-size: 10px; white-space: pre; visibility: hidden;">
					<tspan x="114.203" y="85.893" dx="4.319 4.319" dy="7.198">50</tspan>
					<tspan x="114.203" dy="1em">&#8203;</tspan>
			</text>
			<line style="stroke: rgb(0, 0, 0);" x1="94.53" y1="14.875" x2="107.965" y2="14.395"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="96.449" y1="162.668" x2="112.284" y2="162.188"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="96.449" y1="94.05" x2="113.244" y2="93.57"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="109.792" y1="149.247" x2="101.998" y2="149.586"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="111.825" y1="135.015" x2="103.354" y2="135.354"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="111.487" y1="121.46" x2="105.726" y2="121.46"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="110.809" y1="107.906" x2="104.709" y2="106.212"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="111.148" y1="79.103" x2="104.37" y2="79.442"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="111.148" y1="63.177" x2="104.37" y2="62.499"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="110.809" y1="46.234" x2="104.032" y2="45.895"></line>
			<line style="stroke: rgb(0, 0, 0);" x1="109.115" y1="30.307" x2="99.965" y2="29.968"></line>
		</g>
		<g ID="arrow" transform="matrix(1, 0, 0, 1, -13.610993, -12.375999) translate(0,158)">
			<path d="M 49.248 38.071 H 64.916 L 64.916 38.071 L 90.189 55.251 L 64.916 72.431 L 64.916 72.431 H 49.248 V 38.071 Z"
					data-bx-shape="arrow 49.248 38.071 40.941 34.36 34.36 25.273 0 1@8e88e44e" style="fill: rgb(223, 32, 32);"
					transform="matrix(0.999561, 0.029616, -0.029616, 0.999561, -5.786447, -0.060718)"></path>
			<ellipse style="fill: rgb(216, 216, 216);" cx="38.149" cy="38.868" rx="13.195" ry="4.799"></ellipse>
			<rect x="23.993" y="38.388" width="27.831" height="38.388" style="fill: url(&quot;#gradient-0c&quot;);"></rect>
		</g> 
		`;
		svg.setSlider = function( value ) {
				var arrow = svg.children['arrow'];//svg.querySelector( "[ID='arrow']" );
				var string = `matrix(1, 0, 0, 1, -13.610993, -12.375999) translate(0,${((100-value)/100)*159})`;
				arrow.setAttribute( "transform", string);
		};
		var state = 0;
		function tick() {
			const deadZone = 150;
			var now = Date.now();
			var tickdel = now / 10;
			var portion = ( tickdel % (200+2*deadZone) ); 
			if( portion < deadZone ){
				portion = 0;
			} else {
				portion = portion - deadZone;
				if( portion > 100 && portion < (100 + deadZone) )
					portion = 100;
				else {
					if( portion >= ( 100 + deadZone ) ) portion = ( 200 + deadZone )-portion;
					if( portion < 0 ) portion = 0;
				}
			}
			//console.log( "portion:", tickdel, tickdel %240,  portion )
			svg.setSlider( 100-portion );
			state = portion/100;
			setTimeout( tick, 100 );
		}
		tick();
		svg.getValue = function() {
			return state;
		};

		return svg;
	}


	function makeLightOutput() {
		var node = {
			on: makeNode( getBulbIcon ),//
			off: makeNode( getBulbIcon )//
		};
		//var node = makeNode(  getPowerBolt );
	 
		node.on.setColor( "#0000C0");
		node.on.setIconColor( "#eeeee20");

		node.off.setColor( "#000050");
		node.off.setIconColor( "#000000");

		return node;
	}

	function makeButtonInput() {
		var node = {
			on: makeNode( getArrowButton ),//
			off: makeNode( getArrowButton ),//
		};
		//var node = makeNode(  getPowerBolt );
	 
		node.on.setColor( "#C00000");
		node.on.setIconColor( "#eeeee20");

		node.off.setColor( "#501010");
		node.off.setIconColor( "#000000");
		return node;
	}

	function makeSliderInput() {
		var node = {
			on: makeNode( getSliderArrow ),//
			off:makeNode( getSliderArrow )//
		};
		//var node = makeNode(  getPowerBolt );
	 
		node.on.setColor( "#C00000");
		node.on.setIconColor( "#eeeee20");

		node.off.setColor( "#501010");
		node.off.setIconColor( "#000000");
		return node;
	}

	const  MNU_ZOOM       = 1020; // 0, 1, 2 used...

	const  MNU_CLOSE      = 1040;
	const  MNU_SIGMOID    = 1012;
	const  MNU_ADDOSC     = 1011;
	const  MNU_ADDTICKOSC = 1010;
	const  MNU_SYNAPSE    = 1009; 
	const  MNU_NEURON     = 1008;
	const  MNU_LOAD       = 1005;
	const  MNU_SAVE       = 1004;        
	const  MNU_RESET      = 1003;               
	const  MNU_RUN        = 1002;
	const  MNU_ADDNEURON  = 1001;

	const  MNU_ADD_INPUT_START  = 5000;
	const  MNU_ADD_OUTPUT_START = 6000;
	const  MNU_ADD_OUTPUT_LAST  = 6999;

	const MF_STRING = 1;
	const MF_POPUP = 2;
	const MF_SEPARATOR = 4;


	//static class BRAINBOARD *l;

	function BrainBoard( _brain, container ) {
		if( !(this instanceof BrainBoard) ) return new BrainBoard( _brain, container );

		this.flags = {
			bOwnBrain : false // allocated its own brain...
		} ;

		// these are the peice sets which will be loaded
		// from the file at the moemnt...

		
		this.hMenu; 
		this.hMenuComponents;

		// although a PIVIA is-a PIPEICE, a via type peice is required
		// for certain operations such as beginpath.
		// this also results in certain interactions between peice instances
		// (peice methods such as connect, disconnect are performed)

		this.background_methods; // these are created with board ID
		this. neuron_methods;
		this.input_methods;
		this.output_methods;
		this.nerve_methods;

		this.connectors = [];
		this.menus = [];
		this.events = {};
		this.board = new Board( container );

			this.background_methods = BackgroundMethods(this);
			this.neuron_methods     = new NEURON_METHODS(this);
			this.tick_oscillator_methods = new TICK_OSCILLATOR_METHODS(this);
			this.oscillator_methods = new OSCILLATOR_METHODS(this);
			this.input_methods      = new INPUT_METHODS(this);
			this.button_input_methods = new BUTTON_INPUT_METHODS(this);
			this.slider_input_methods = new SLIDER_INPUT_METHODS(this);
			this.light_output_methods = new LIGHT_OUTPUT_METHODS(this);
			this.output_methods     = new OUTPUT_METHODS(this);
			this.nerve_methods      = new NERVE_METHODS(this);
			this.brain = _brain;
			Init( this );

	    //---------------------------------------------------
		this.reset = function(){
			//	Init(this) 
			this.board.SetBackground( this.BackgroundPeice );
			this.board.reset();
			this.scale = 0;
		};
		
		this.scale = 0;
			
		function Init( brainshell )
		{
			//brainboard = this;
			//InitCommonControls();
				
			
			brainshell.InputPeice = null;
			brainshell.OutputPeice = null;

			brainshell.lightOutputPeice = brainshell.board.CreatePeice( "light", makeLightOutput()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.light_output_methods );

			brainshell.buttonInputPeice = brainshell.board.CreatePeice( "button", makeButtonInput()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.button_input_methods );

			brainshell.sliderInputPeice = brainshell.board.CreatePeice( "slider", makeSliderInput()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.slider_input_methods );

			brainshell.OscillatorPeice = brainshell.board.CreatePeice( "oscil", makeNeuron()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.oscillator_methods );

			brainshell.TickOscillatorPeice = brainshell.board.CreatePeice( "tickosc", makeNeuron()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.tick_oscillator_methods );

			brainshell.NeuronPeice = brainshell.board.CreatePeice( "neuron", makeNeuron()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.neuron_methods );


			var img = document.createElement( "img" );
			img.src = peices.pathway.image;

			var imgNeg = document.createElement( "img" );
			imgNeg.src = peices.pathway.imageNeg;
			//brainshell.NervePeice = brainshell.board.CreatePeice( "nerve",  img
			//	, 7, 7, 0, 0
			//	, brainshell.nerve_methods );
			brainshell.NervePeice = brainshell.board.CreateVia( "nerve",  img, imgNeg
				, brainshell.nerve_methods );

			brainshell.BackgroundPeice = null;
		        
			//CreateToolbin( board );


			brainshell.board.SetCellSize( 16, 16 );
			if( !brainshell.brain )
			{
				brainshell.flags.bOwnBrain = 1;
				brainshell.brain = new BRAIN();
			}
			else
				brainshell.flags.bOwnBrain = 0;
			
		        
				brainshell.board.SetCellSize( peices.cell.width, peices.cell.height );
		        
			var img = document.createElement( "img" );
			img.src = peices.background.image;
			brainshell.BackgroundPeice = brainshell.board.CreatePeice( "background", img
				,peices.background.cells.width, peices.background.cells.height 
				, ((peices.background.cells.width-1)/2)|0, ((peices.background.cells.height-1)/2)|0
				, brainshell.background_methods
			);
			brainshell.board.SetBackground( brainshell.BackgroundPeice );

		        
			brainshell.connectors = [];
			if( !brainshell.menus.length ) {
					
				InitMenus( brainshell );
			}
			brainshell.DefaultNeuron = brainshell.brain.Neuron();
			brainshell.DefaultSynapse = brainshell.brain.Synapse();

			
		}       

	//---------------------------------------------------


		function InitMenus( _this )
		{
			var hMenu = _this.hMenu = createPopup();
			_this.hMenu.appendItem( MF_STRING, MNU_ADDNEURON, ("Add Neuron") );
			_this.hMenu.appendItem( MF_STRING, MNU_ADDOSC, ("Add Oscillator") );
			_this.hMenu.appendItem( MF_STRING, MNU_ADDTICKOSC, ("Add Tick Oscillator") );
	           
			_this.hMenu.appendItem( MF_STRING|MF_POPUP, (_this.hMenuComponents=createPopup()), ("Add &Component") );
			{
				_this.brain.brainStems.forEach( (pbs )=>
				{
					BuildBrainstemMenus( _this.hMenuComponents, pbs, _this.menus, _this.connectors, 0 );
				} );
			}
			hMenu.appendItem(  MF_SEPARATOR,0,0 );
			hMenu.appendItem(  MF_STRING, MNU_RESET, ("Reset") );
			hMenu.appendItem(  MF_STRING, MNU_RUN, ("RUN") );
			hMenu.appendItem(  MF_SEPARATOR,0,0 );
			{
				var hPopup;
				hMenu.appendItem( MF_STRING|MF_POPUP, (hPopup = createPopup()), ("Zoom") );
				_this.menus.push( hPopup );
	        
				//hPopup = (PMENU)GetPopupData( hMenu, 6 );
				hPopup.appendItem( MF_STRING, MNU_ZOOM + 0, ("x1") );
				hPopup.appendItem( MF_STRING, MNU_ZOOM + 1, ("x2") );
				hPopup.appendItem( MF_STRING, MNU_ZOOM + 2, ("x4") );
			}
	        
			hMenu.appendItem( MF_STRING, MNU_NEURON, ("Default Neuron") );
			hMenu.appendItem( MF_STRING, MNU_SYNAPSE, ("Default Synapse") );
			hMenu.appendItem( MF_STRING, MNU_SIGMOID, ("Sigmoid Constant") );
			/*
			hMenu.appendItem( MF_STRING, MNU_SAVE, ("Save...") );
			hMenu.appendItem( MF_STRING, MNU_LOAD, ("Load...") );
			hMenu.appendItem( MF_SEPARATOR,0,0 );
			hMenu.appendItem( MF_STRING, MNU_CLOSE, ("Close") );
	        */
		}

	}
	        
	BrainBoard.prototype.select= function( n ) {
		this.board.select( n );
	};
	             
	BrainBoard.prototype.addEventListener = function(name,cb) {
		this.events[name] = cb;
	};

	BrainBoard.prototype.BuildBrainstemMenus = function (hMenuComponents, pbs, menus, connectors, idx) {
		{
			//PBRAIN_STEM pbs;
			this.comp_menu = createPopup();
			var menu;
			//for( pbs = brain.first(); pbs; pbs = brain.next() )
			{
				var idx;
				var module;
				hMenuComponents.appendItem(MF_STRING | MF_POPUP, comp_menu, pbs.name());
				this.menus.push(comp_menu);

				comp_menu.appendItem(MF_STRING | MF_POPUP, menu = CreatePopup(), ("inputs"));
				this.menus.push(menu);


				pbs.Inputs.list.forEach((connector) => {
					connectors.push(connector);
					menu.appendItem(MF_STRING, MNU_ADD_INPUT_START + (connectors.lenght - 1), connector.name());
				});
				comp_menu.appendItem(MF_STRING | MF_POPUP, menu = CreatePopup(), ("outputs"));
				this.menus.push(menu);

				pbs.Outputs.list.forEach((connector) => {
					connectors.push(connector);
					menu.appendItem(MF_STRING, MNU_ADD_OUTPUT_START + (connectors.length - 1), connector.name());
				});
			}
			comp_menu.appendItem(MF_STRING | MF_POPUP, (menu = CreatePopup()), ("module"));
			this.menus.push(menu);

			for (module = pbs.first_module(); module; idx++, module = pbs.next_module()) {
				BuildBrainstemMenus(menu, module, menus, connectors, idx);
				//AppendPopupItem( menu, MF_STRING, MNU_ADD_OUTPUT_START + idx + ( n * 80 ), module.name() );
				//SetLink( &outputs, idx, (POINTER)connector );
			}
		}
	};


	BrainBoard.prototype.RebuildComponentPopups = function(  )
	{
		{
			this.hMenuComponents.reset();
			this.brain.brainStems.forEach( ( pbs )=>
			{
				BuildBrainstemMenus( this.hMenuComponents, pbs, this.menus, this.connectors, 0 );
			});
		}
	};


	/*
	#ifdef BUILD_TEST_SHELL
	float f_values[10];
	CONNECTOR *connectors_in[] = { new connector( ("one"), &f_values[0] )
	,new connector( ("two"), &f_values[1] )
	,new connector( ("three"), &f_values[2] )
	,new connector( ("four"), &f_values[3] )
	,new connector( ("five"), &f_values[4] )
	,new connector( ("six"), &f_values[5] )
	,new connector( ("seven"), &f_values[6] )
	,new connector( ("eight"), &f_values[7] )
	,new connector( ("nine"), &f_values[8] )
	,new connector( ("ten"), &f_values[9] )
	};

	CONNECTOR *connectors_out[] = { new connector( ("one"), &f_values[0] )
	,new connector( ("two"), &f_values[1] )
	,new connector( ("three"), &f_values[2] )
	,new connector( ("four"), &f_values[3] )
	,new connector( ("five"), &f_values[4] )
	,new connector( ("six"), &f_values[5] )
	,new connector( ("seven"), &f_values[6] )
	,new connector( ("eight"), &f_values[7] )
	,new connector( ("nine"), &f_values[8] )
	,new connector( ("ten"), &f_values[9] )
	};

	BRAIN_STEM clusters[1] = { BRAIN_STEM( ("Basic Structure")
													 , connectors_in, sizeof(connectors_in)/sizeof(connectors_in[0])
													 , connectors_out, sizeof(connectors_out)/sizeof(connectors_out[0]) ) };

	// creates a thread, don't do this.
	PBRAIN brains[1];// = { BRAIN( &clusters[0] ) };

	SaneWinMain( argc, argv )
	{

		brains[0] = new BRAIN( &clusters[0] );
		//SetAllocateLogging( true );
		new BRAINBOARD;
		new BRAINBOARD;
		new BRAINBOARD;
		while( 1 )
			Sleep( 1000 );
	   return 0;
	}
	EndSaneWinMain()
	#endif
	*/



								//------------------------------------------
	/*
	static LOGICAL SelectNewFile( HWND hParent, PSTR szFile )
	{
	   
	   OPENFILENAME ofn;		 // common dialog box structurechar szFile[260];		 // buffer for filenameHWND hwnd;				  // owner windowHANDLE hf;				  // file handle// Initialize OPENFILENAMEZeroMemory(&ofn, sizeof(OPENFILENAME));
	   szFile[0] = 0;
	   memset( &ofn, 0, sizeof( OPENFILENAME ) );
	   ofn.lStructSize = sizeof(OPENFILENAME);
	   ofn.hwndOwner = hParent;
	   ofn.lpstrFile = szFile;
	   ofn.nMaxFile = 256;
	   ofn.lpstrFilter = ("Bodies\0*.Body\0");
	   ofn.nFilterIndex = 1;
	   ofn.Flags = OFN_NOTESTFILECREATE
					  | OFN_NOREADONLYRETURN ;// Display the Open dialog box. 

	   return GetOpenFileName(&ofn);
	}
	*/


	/*
	class IVIA: public IPEICE
	{
	public:
		//virtual ~IVIA();
		virtual CTEXTSTR name( void )=0;
		virtual Image GetViaStart( int direction, int scale = 0 )=0;// { return null; }
		virtual Image GetViaEnd( int direction, int scale = 0 )=0;//{ return null; }
		// getviafromto will result in start or end if from or to is NOWHERE respectively
		virtual Image GetViaFromTo( int from, int to, int scale = 0 ){ return null; }

		virtual Image GetViaFill1( int *xofs, int *yofs, int direction, int scale = 0 ){ return null; }
		virtual Image GetViaFill2( int *xofs, int *yofs, int direction, int scale = 0 ){ return null; }
		virtual int Move( void ) { return 0; } // Begin, Start
		virtual int Stop( void ) { return 0; } // end
		PVIA_METHODS via_methods;
	};
	*/

	//---------------------------------------------------

	function NERVE_METHODS(newbrainboard) {
		if( !(this instanceof NERVE_METHODS) ) return new MERVE_METHODS(newbrainboard);

		//this.methods = 
		this.brainboard = newbrainboard;
		this.synapse = null;
	}
	NERVE_METHODS.prototype = Object.create( DefaultViaMethods.prototype );
	NERVE_METHODS.prototype.constructor = NERVE_METHODS;

	NERVE_METHODS.prototype.Create = function( psvExtra )
	{
		return this.brainboard.brain.dupSynapse( this.brainboard.DefaultSynapse );
	};
	NERVE_METHODS.prototype.Destroy = function(  psv )
	{
		this.brainboard.brain.ReleaseSynapse( psv );
	};
	NERVE_METHODS.prototype.Disconnect = function(  psv )
	{
		this.brainboard.brain.UnLinkSynapseTo( psv );
		return true;
	};
	NERVE_METHODS.prototype.OnRightClick = function(  psv,  x,  y )
	{
		console.log( "Show Synapse in Statuses" );
		//ShowSynapseDialog( (PSYNAPSE)psv );
		return 1;
	};

	NERVE_METHODS.prototype.DrawCell = function(  peice, psvInstance,  surface,  from, x,  y )
	{
		//console.log( ("---------- DRAW NEURON ------------") );

		var synapse = psvInstance;

		//var from = this.master.getcell( cellx, celly );
		if( "range" in this.master.image ) {
			if( synapse.gain >= 0 )
				surface.drawImage( this.master.image.on, from.coords.x, from.coords.y, from.size.width, from.size.height
					, x, y
					, this.brainboard.board.cellSize.width
					, this.brainboard.board.cellSize.height  
				);
			else
				surface.drawImage( this.master.image.off, from.coords.x, from.coords.y, from.size.width, from.size.height
					, x, y
					, this.brainboard.board.cellSize.width
					, this.brainboard.board.cellSize.height  
				);

		} else {
			if( synapse.gain >= 0 )

			surface.drawImage( this.master.image.on, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			);
			else
			surface.drawImage( this.master.image.off, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			);
		}
	//	BlotImageAlpha( surface

	};


	//---------------------------------------------------

	function  INPUT_METHODS(newbrainboard)
	{
		if( !(this instanceof INPUT_METHODS) ) return new INPUT_METHODS(newbrainboard);
		this.brainboard = newbrainboard;
		this.level_colors = [];
	}

	INPUT_METHODS.prototype = Object.create( DefaultMethods.prototype );
	INPUT_METHODS.prototype.constructor = INPUT_METHODS;

	INPUT_METHODS.prototype.Create = function(  psvExtra )
		{
			//brainboard.create_input_type = (POUTPUT_INPUT)psvExtra;
			//brainboard.create_input_type.flags.bOutput = 0;
			console.log( ("Creating a new input (peice instance)") );
			//this.brainboard.brain.GetInputNeuron( ((POUTPUT_INPUT)psvExtra).pbs, ((POUTPUT_INPUT)psvExtra).conn
			return psvExtra; // still not the real create...  but this is psviNstance...
		};
	INPUT_METHODS.prototype.SetColors = function(  c1,  c2,  c3 )
		{
			this.level_colors[0] = c1;
			this.level_colors[1] = c2;
			this.level_colors[2] = c3;
		};
	INPUT_METHODS.prototype.Draw = function(  psvInstance,  image,  cell,  x,  y )
		{
			var cPrimary;
			var input = psvInstance;
			var value = input.conn.get();
			console.log( ("input value is %g"), value );
			if( value < 0 )
				cPrimary = ColorAverage( level_colors[1]
											  , level_colors[0]
												, -(value * 1200)|0, 1000 );
			else
				cPrimary = ColorAverage( level_colors[1]
												, level_colors[2]
										  , (value*1200)|0, 1000 );

			BlotImageShaded( image
			               , cell //master.getcell(cellx, celly)
			               , x, y
			               , cPrimary );
		};
	INPUT_METHODS.prototype.ConnectEnd = function(  psv_to_instance,  x,  y
										  ,  peice_from,  psv_from_instance )
	{
		return false;
	};
	INPUT_METHODS.prototype.ConnectBegin = function(  psv_to_instance,  x,  y
										  ,  peice_from,  psv_from_instance )
	{
		var n;
		//if( peice_from == brainboard.NerveMethods )
		// maybe...
		var synapse = psv_from_instance;
		var neuron = psv_to_instance;
		// validate that peice_from is a nerve_method type
		for( n = 0; n < 8; n++ )
			if( DirDeltaMap[n].x == x && DirDeltaMap[n].y == y )
				break;
		if( n < 8 )
			return this.brainboard.brain.LinkSynapseFrom( synapse, neuron.neuron, n );
		return false;
	};
	INPUT_METHODS.prototype.OnRightClick = function(  psv,  x,  y )
	{
		//ShowInputDialog( (PNEURON)psv );
		return 1;
	};

	INPUT_METHODS.prototype.OnClick = function(  psv,  x, y )
	{
		console.log( ("click on input! at %d,%d"), x, y );
		if( x == 0 && y == 0 )
		{
			// this is implied to be the current peice that
			// has been clicked on...
			// will receive further OnMove events...
			this.brainboard.board.LockPeiceDrag();
			return true;
		}
		else
		{
			if( !brainboard.board.BeginPath( brainboard.NervePeice, brainboard ) )
			;
		}
		// so far there's nothing on this cell to do....
		return false;
	};



	function  OUTPUT_METHODS( newbrainboard )
	{
		if( !(this instanceof OUTPUT_METHODS) ) return new OUTPUT_METHODS(newbrainboard);
		this.brainboard = newbrainboard; 

		this.level_colors = [ ];
	}

	OUTPUT_METHODS.prototype = Object.create( DefaultMethods.prototype );
	OUTPUT_METHODS.prototype.constructor = OUTPUT_METHODS;

	OUTPUT_METHODS.prototype.Create = function(  psvExtra )
	{
		//brainboard.create_output_type = (POUTPUT_INPUT)psv;
		//brainboard.create_output_type.flags.bOutput = 1;
		console.log( "Creating a new output (peice instance)" );

		var poi = psvExtra;

		poi.neuron = this.brainboard.brain.GetOutputNeuron( poi.conn );
		//dupNeuron( brainboard.DefaultNeuron ))

		return psvExtra; // still not the real create...  but this is psviNstance...
		//return poi.neuron; // still not the real create...  but this is psviNstance...
		//return (((POUTPUT_INPUT)psvExtra).conn); // still not the real create...  but this is psviNstance...
		//return (brainboard.create_output_type);
	};
	OUTPUT_METHODS.prototype.Draw = function(  psvInstance,  image,  cell,  x,  y )
	{
		var cPrimary;
		var neuron = psvInstance;
		//PANYVALUE output = neuron.Output; //(connector*)psvInstance;
		var value = neuron.get(); //output.get();
		if( value < 0 )
			cPrimary = ColorAverage( this.level_colors[1]
											, this.level_colors[0]
											, (int)-(value * 1200), 1000 );
		else
			cPrimary = ColorAverage( this.level_colors[1]
											, this.level_colors[2]
										, (int)(value*1200), 1000 );

		BlotImageShaded( image
									, cell //master.getcell(cellx, celly)
									, x, y
									, cPrimary );
	};

	OUTPUT_METHODS.prototype.SetColors = function(  c1,  c2,  c3 )
	{
		this.level_colors[0] = c1;
		this.level_colors[1] = c2;
		this.level_colors[2] = c3;
	};
	OUTPUT_METHODS.prototype.ConnectEnd = function(  psv_to_instance,  x,  y
										  ,  peice_from,  psv_from_instance )
	{
		var n;
		var success = false;
		//POUTPUT_INPUT poi = (POUTPUT_INPUT)psv_to_instance;
		//POUTPUT_INPUT poi = (POUTPUT_INPUT);
		//connector *output = (connector*)psv_to_instance;
		//if( peice_from == brainboard.NerveMethods )
		// maybe...
		var synapse = psv_from_instance;
		var neuron = psv_to_instance;
		// validate that peice_from is a nerve_method type
		//poi.
		for( n = 0; n < 8; n++ )
			if( DirDeltaMap[n].x == x && DirDeltaMap[n].y == y )
				break;
		if( n < 8 )
		{
			var success = this.brainboard.brain.LinkSynapseTo( synapse, neuron.neuron, n );
			return success;
		}
		return false;
	};
	OUTPUT_METHODS.prototype.ConnectBegin = function(  psv_to_instance,  x,  y
										  ,  peice_from,  psv_from_instance )
	{
		return false;
	};
	OUTPUT_METHODS.prototype.OnRightClick = function(  psv,  x,  y )
		{
			//ShowOutputDialog( (PNEURON)psv );
			return 1;
		};
	OUTPUT_METHODS.prototype.OnClick = function(  psv,  x,  y )
		{
			console.log( "click on neuron! at %d,%d", x, y );
			if( x == 0 && y == 0 )
			{
				// this is implied to be the current peice that
				// has been clicked on...
				// will receive further OnMove events...
				this.brainboard.board.LockPeiceDrag();
				return true;
			}
			else
			{
				if( !this.brainboard.board.BeginPath( this.brainboard.NervePeice, brainboard ) )
				;
			}
			// so far there's nothing on this cell to do....
			return false;
		};

	//---------------------------------------------------
	//---------------------------------------------------
	//---------------------------------------------------


	function  NEURON_METHODS(newbrainboard)
	{
		// these methods are passed a psvInstance
		// which is the current neuron instance these are to wokr on
		// this valud is retrieved and stored (by other portions) by the create() method
		this.brainboard = newbrainboard;

		this.c_input = []; // 0=min,1=mid,2=max
		this.c_threshold = []; // 0=min,1=mid,2=max
		this.connected = [];

	}

	NEURON_METHODS.prototype = Object.create( DefaultMethods.prototype );
	NEURON_METHODS.prototype.constructor = NEURON_METHODS;

	NEURON_METHODS.prototype.SetColors = function( bInput,  c1,  c2,  c3 )
		{
			if( bInput )
			{
				this.c_input[0] = c1;
				this.c_input[1] = c2;
				this.c_input[2] = c3;
			}
			else
			{
				this.c_threshold[0] = c1;
				this.c_threshold[1] = c2;
				this.c_threshold[2] = c3;
			}
		};

	NEURON_METHODS.prototype.Create = function(  psvExtra )
	{
		console.log( "Creating a new neuron (peice instance)");
		return this.brainboard.brain.dupNeuron( this.brainboard.DefaultNeuron );
	};

	NEURON_METHODS.prototype.Destroy = function(  psv )
	{
	      this.brainboard.brain.ReleaseNeuron( psv );
	};
		

	NEURON_METHODS.prototype.DrawCell = function(  peice, psvInstance,  surface,  from, x,  y )
	{
			//var base,range,value,input,threshold;
		var neuron = psvInstance;

		//var from = this.master.getcell( cellx, celly );
		if( "range" in this.master.image ) {
			if( neuron.value )
				surface.drawImage( this.master.image.on, from.coords.x, from.coords.y, from.size.width, from.size.height
					, x, y
					, this.brainboard.board.cellSize.width
					, this.brainboard.board.cellSize.height  
				);
			else
				surface.drawImage( this.master.image.off, from.coords.x, from.coords.y, from.size.width, from.size.height
					, x, y
					, this.brainboard.board.cellSize.width
					, this.brainboard.board.cellSize.height  
				);

		} else {
			if( neuron.value )

			surface.drawImage( this.master.image.on, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			);
			else
			surface.drawImage( this.master.image.off, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			);
		}
	//	BlotImageAlpha( surface

	};

	NEURON_METHODS.prototype.Update = function(  psv,  cycle )
		{
			console.log( "updating color information for a neuron..." );
		};

	NEURON_METHODS.prototype.ConnectEnd = function(  psv_to_instance,  x,  y
										  ,  peice_from,  psv_from_instance )
	{
		var n;
		//if( peice_from == brainboard.NerveMethods )
		// maybe...
		var synapse = psv_from_instance;
		var neuron = psv_to_instance;
		// validate that peice_from is a nerve_method type
		for( n = 0; n < 8; n++ )
			if( DirDeltaMap[n].x == x && DirDeltaMap[n].y == y )
				break;
		if( n < 8 )
		{
			var success = this.brainboard.brain.LinkSynapseTo( synapse, neuron, n );
			return success;
		}
		return false;
	};

	NEURON_METHODS.prototype.ConnectBegin = function(  psv_to_instance,  x,  y
										  ,  peice_from,  psv_from_instance )
	{
		var n;
		//if( peice_from == brainboard.NerveMethods )
		// maybe...
		var synapse = psv_from_instance;
		var neuron = psv_to_instance;
				if( this.brainboard.events["added"] )
					this.brainboard.events["added"]( this.brainboard.NervePeice, synapse );
		// validate that peice_from is a nerve_method type
		for( n = 0; n < 8; n++ )
			if( DirDeltaMap[n].x == x && DirDeltaMap[n].y == y )
				break;
		if( n < 8 )
			return this.brainboard.brain.LinkSynapseFrom( synapse, neuron, n );
		return false;
	};
	NEURON_METHODS.prototype.OnRightClick = function(  psv,  x,  y )
	{
		console.log( "Show in info panel?");
		//ShowNeuronDialog( psv );
		return 1;
	};

	NEURON_METHODS.prototype.OnClick = function(  psv,  x,  y )
	{
		if( this.brainboard.events["select"] )
			this.brainboard.events["select"]( psv );
		console.log( ("click on neuron! at %d,%d"), x, y );
		if( x == 0 && y == 0 )
		{
			// this is implied to be the current peice that
			// has been clicked on...
			// will receive further OnMove events...
			this.brainboard.board.LockPeiceDrag();
			return true;
		}
		else
		{
			if( !this.brainboard.board.BeginPath( this.brainboard.NervePeice, this.brainboard ) )
			;
		}
		// so far there's nothing on this cell to do....
		return false;
	};


	//---------------------------------------------------

	function  LIGHT_OUTPUT_METHODS(newbrainboard)
	{
		if( !(this instanceof LIGHT_OUTPUT_METHODS) ) return new LIGHT_OUTPUT_METHODS(newbrainboard);
		NEURON_METHODS.call( this, newbrainboard );
		this.brainboard = newbrainboard;
	}

	LIGHT_OUTPUT_METHODS.prototype = Object.create( NEURON_METHODS.prototype );
	LIGHT_OUTPUT_METHODS.prototype.constructor = BUTTON_INPUT_METHODS;

	LIGHT_OUTPUT_METHODS.prototype.Create = function(  psvExtra )
		{
			//brainboard.create_input_type = (POUTPUT_INPUT)psvExtra;
			//brainboard.create_input_type.flags.bOutput = 0;
			console.log( ("Creating a new output (peice instance)") );
			return new this.brainboard.brain.Exporter( this.brainboard.brain, psvExtra );
		};

	//---------------------------------------------------

	function  BUTTON_INPUT_METHODS(newbrainboard)
	{
		if( !(this instanceof BUTTON_INPUT_METHODS) ) return new BUTTON_INPUT_METHODS(newbrainboard);
		NEURON_METHODS.call( this, newbrainboard );
		this.brainboard = newbrainboard;
	}

	BUTTON_INPUT_METHODS.prototype = Object.create( NEURON_METHODS.prototype );
	BUTTON_INPUT_METHODS.prototype.constructor = BUTTON_INPUT_METHODS;

	BUTTON_INPUT_METHODS.prototype.Create = function(  psvExtra )
		{
			//brainboard.create_input_type = (POUTPUT_INPUT)psvExtra;
			//brainboard.create_input_type.flags.bOutput = 0;
			console.log( ("Creating a new input (peice instance)") );
			return new this.brainboard.brain.External( this.brainboard.brain, psvExtra );
		};
	//---------------------------------------------------

	function  SLIDER_INPUT_METHODS(newbrainboard)
	{
		if( !(this instanceof SLIDER_INPUT_METHODS) ) return new SLIDER_INPUT_METHODS(newbrainboard);
		NEURON_METHODS.call( this, newbrainboard );
		this.brainboard = newbrainboard;
	}

	SLIDER_INPUT_METHODS.prototype = Object.create( NEURON_METHODS.prototype );
	SLIDER_INPUT_METHODS.prototype.constructor = SLIDER_INPUT_METHODS;

	SLIDER_INPUT_METHODS.prototype.Create = function(  psvExtra )
		{
			//brainboard.create_input_type = (POUTPUT_INPUT)psvExtra;
			//brainboard.create_input_type.flags.bOutput = 0;
			console.log( ("Creating a new input (peice instance)") );
			return new this.brainboard.brain.External( this.brainboard.brain, psvExtra );
		};



	//---------------------------------------------------

	function BackgroundMethods( _brainboard ) {
		if( !(this instanceof BackgroundMethods ) ) return new BackgroundMethods( _brainboard );

		this.brainboard = _brainboard;

		//typedef PEICE_METHODS Parent;

	}

	BackgroundMethods.prototype = Object.create( DefaultMethods.prototype );
	BackgroundMethods.prototype.constructor = BackgroundMethods;


	BackgroundMethods.prototype.Create = function() {
				return true;
			};
	BackgroundMethods.prototype.Destroy = function() {
			
		};

	BackgroundMethods.prototype.Connect  = function (  psvTo
					  , rowto,  colto
					  ,  psvFrom
					  ,  rowfrom,  colfrom )
		{
			return 0;
		};

	BackgroundMethods.prototype.Update = function(  psv,  cycle )
		{
		      console.log( ("Update background - nothing to do.") );
			//parent.Update(psv,cycle);
		};

	BackgroundMethods.prototype.OnClick = function(  psv,  x,  y )
		{
			this.brainboard.board.LockDrag();
			return true;
		};

	BackgroundMethods.prototype.OnRightClick = function(  psv,  x,  y )
		{
			this.brainboard.RebuildComponentPopups(this);

			this.brainboard.hMenu.show( this.brainboard.board, this.brainboard.board.mousePos.x, this.brainboard.board.mousePos.y, (result)=>{
				if( result === undefined ) return; // canceled.
				//DebugBreak();
				const brainboard = this.brainboard;
				if( result >= MNU_ADD_INPUT_START && result < MNU_ADD_OUTPUT_START )
				{
					console.log( ("Put input peice at %d,%d"), x, y );
					var io_thing = new OUPUT_INPUT( brainboard );
					//io_thing.brainboard = brainboard;
					//io_thing.brain = io_thing.brainboard.brain;
					io_thing.conn = brainboard.connectors[ result-MNU_ADD_INPUT_START ];// io_thing.pbs.getinput( (result-MNU_ADD_INPUT_START) %80 );

					io_thing.neuron = io_thing.brain.GetInputNeuron( io_thing.conn );
					//brainboard.create_input_type = GetLink( &brainboard.inputs, result-MNU_ADD_INPUT_START );

					// really this only needs to pass the connector? or do I need to get a Input/Ouptut Neuron?
					brainboard.board.PutPeice( brainboard.InputPeice, x, y, io_thing );
				}
				else if( result >= MNU_ADD_OUTPUT_START && result <= MNU_ADD_OUTPUT_LAST )
				{
					console.log( ("Put output peice at %d,%d"), x, y );
					var io_thing = new OUPUT_INPUT( brainboard );
					//io_thing.brainboard = brainboard;
					//io_thing.brain = io_thing.brainboard.brain;
					io_thing.conn = brainboard.connectors[ result-MNU_ADD_OUTPUT_START ];// io_thing.pbs.getoutput( (result-MNU_ADD_OUTPUT_START)%80 );

					// really this only needs to pass the connector? or do I need to get a Input/Ouptut Neuron?
					brainboard.board.PutPeice( brainboard.OutputPeice, x, y, io_thing );
				}
				else switch( result )
				{
				case MNU_ADDNEURON:
					console.log( ("Put neuron peice at %d,%d"), x, y );
					var newN = brainboard.board.PutPeice( brainboard.NeuronPeice, x, y, 0 );
					if( brainboard.events["added"] )
						brainboard.events["added"](  brainboard.NeuronPeice,newN );
					return true;
				case MNU_ADDOSC:
					console.log( ("Put osc peice at %d,%d"), x, y );
					var newN = brainboard.board.PutPeice( brainboard.OscillatorPeice, x, y, 0 );
					if( brainboard.events["added"] )
						brainboard.events["added"]( brainboard.OscillatorPeice, newN );
					return true;
				case MNU_ADDTICKOSC:
					console.log( ("Put tickosc peice at %d,%d"), x, y );
					var newN = brainboard.board.PutPeice( brainboard.TickOscillatorPeice, x, y, 0 );
					if( brainboard.events["added"] )
						brainboard.events["added"]( brainboard.TickOscillatorPeice,newN );
					return true;
				case MNU_ZOOM:
				case MNU_ZOOM+1:
				case MNU_ZOOM+2:
					brainboard.scale =  result - MNU_ZOOM;
					brainboard.board.SetScale( result - MNU_ZOOM );
					break;
				case MNU_SAVE:
				{
								var name = PickBoardName( null, false );
								if( name )
									brainboard.board.Save( null, name );
				}

					break;
				case MNU_LOAD:
					{
						var name = PickBoardName( null, true );
						if( name )
							brainboard.board.Load( null, name );
					}
					break;
				case MNU_CLOSE:
					//delete brainboard;
					return false;
				}
			} );
			return true;
		},
	BackgroundMethods.prototype.OnDoubleClick = function(  psv,  x,  y )
		{
			 result = TrackPopup( brainboard.hMenu, null );
			return true;
		};

	//--------------------------- Oscillator Methods ------------------------------

	function  OSCILLATOR_METHODS(newbrainboard)
	{
		// these methods are passed a psvInstance
		// which is the current neuron instance these are to wokr on
		// this valud is retrieved and stored (by other portions) by the create() method
		this.brainboard = newbrainboard;


	}

	OSCILLATOR_METHODS.prototype = Object.create( NEURON_METHODS.prototype );
	OSCILLATOR_METHODS.prototype.constructor = NEURON_METHODS;

	OSCILLATOR_METHODS.prototype.Create = function(  psvExtra )
		{
			console.log( "Creating a new neuron (peice instance)");
			return this.brainboard.brain.Oscillator( );
		};

		
	//--------------------------- Tick Oscillator Methods ------------------------------

	function TICK_OSCILLATOR_METHODS(newbrainboard)
	{
		// these methods are passed a psvInstance
		// which is the current neuron instance these are to wokr on
		// this valud is retrieved and stored (by other portions) by the create() method
		this.brainboard = newbrainboard;


	}

	TICK_OSCILLATOR_METHODS.prototype = Object.create( NEURON_METHODS.prototype );
	TICK_OSCILLATOR_METHODS.prototype.constructor = NEURON_METHODS;

	TICK_OSCILLATOR_METHODS.prototype.Create = function(  psvExtra )
	{
		console.log( "Creating a new tick Oscillator (peice instance)");
		return new this.brainboard.brain.TickOscillator( this.brainboard.brain, 1000 );
	};

		

	//--------------------------- Quick Popup Menu System ------------------------------

	var mouseCatcher = document.getElementById( "mouseCatcher" );
	mouseCatcher.addEventListener( "click", (evt)=>{
		mouseCatcher.style.visibility = "hidden";
	} );
		

	function createPopup() {
		var menu = {
			items: [],
			parent : null,
			container : document.createElement( "div" ),
			board : null,
			// hMenu, MF_STRING, MNU_ADDNEURON, ("Add &Neuron") );
			appendItem( _flags, value, text ) {
				if( _flags & MF_SEPARATOR) {
					var newItem = document.createElement( "HR" );
					this.container.appendChild( newItem );

				}else {
					var newItem = document.createElement( "A" );
					var newItemBR = document.createElement( "BR" );
					this.container.appendChild( newItem );
					this.container.appendChild( newItemBR );
					var flags = _flags;
					newItem.value = value;
					newItem.textContent = text;
					newItem.className = "popup";
					if( flags & MF_POPUP ) {
						value.parent = this;
						newItem.addEventListener( "mouseover", (evt)=>{
							var r = newItem.getBoundingClientRect();
							console.log( "Item is clicked show that.", evt.target.value, evt.clientX, evt.clientY );

							newItem.value.show( this.board, evt.clientX, r.top - 10, this.cb );
						} );
						newItem.addEventListener( "mouseout", (evt)=>{
							var r = newItem.getBoundingClientRect();
							console.log( "Item is clicked show that.", evt.target.value, evt.clientX, r.top );
							if( evt.toElement !== newItem.value.container )		
								newItem.value.hide();
						} );
					} else
						newItem.addEventListener( "click", (evt)=>{
							this.cb( evt.target.value );
							console.log( "Item is clicked.", evt.target.value );
							this.hide( true );
						} );
				}
			},
			hide( all ) {
				this.container.style.visibility = "hidden";
				if( this.parent ) {
					if( all )
						this.parent.hide( all );
				} else {
					mouseCatcher.style.visibility = "hide";
				}
			},
			show( board, x, y, cb ) {
				this.board = board;
				this.cb = cb;
				mouseCatcher.style.visibility = "visible";
				this.container.style.visibility = "inherit";
				this.container.style.left = x;
				this.container.style.top = y;
			},
			reset() {
				console.log( "hide everything?" );	
			}
		};
		mouseCatcher.appendChild( menu.container );
		menu.container.className = "popup";
		menu.container.style.zIndex = 50;

		return menu;
	}

	function animator(freq) {
			var driveCenter = { x:50, y:50 };
	                
	                var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
			newSVG.style.width = 100;
			newSVG.style.height = 175;
			//newSVG.setAttribute("width","100");
			//newSVG.setAttribute("height","200");

			var driveRotor = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			driveRotor.id = "driveRotor";
			driveRotor.setAttribute( "r", "40" );
			driveRotor.setAttribute( "cx", "50" );
			driveRotor.setAttribute( "cy", "50" );
			driveRotor.setAttribute( "fill", "yellow" );

			var drivePivot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			drivePivot.id = "drivePivot";
			drivePivot.setAttribute( "r", "4" );
			drivePivot.setAttribute( "fill", "black" );
			
			var driveArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
			driveArm.classList.add( "switcher" );
			driveArm.id = "driveArm";
			driveArm.setAttribute( "stroke", "blue" );
			driveArm.setAttribute( "stroke-width", "10" );
			driveArm.setAttribute( "stroke-linecap", "round" );

			var driveRod = document.createElementNS("http://www.w3.org/2000/svg", "path");
			driveRod.classList.add( "switcher" );
			driveRod.id = "driveRod";
			driveRod.setAttribute( "stroke", "blue" );
			driveRod.setAttribute( "stroke-width", "5" );
			driveRod.setAttribute( "stroke-linecap", "round" );
			driveRod.setAttribute( "stroke-linecap", "round" );


			var buttonPad = document.createElementNS("http://www.w3.org/2000/svg", "path");
			buttonPad.id = "buttonPad";
			buttonPad.setAttribute( "stroke", "red" );
			buttonPad.setAttribute( "stroke-width", "10" );
			buttonPad.setAttribute( "stroke-linecap", "round" );
			
			newSVG.appendChild( driveRotor);
			newSVG.appendChild( drivePivot);
			newSVG.appendChild( driveArm);
			newSVG.appendChild( driveRod);
			newSVG.appendChild( buttonPad);
			var state = 0;
			function animate() {

				//<circle cx="250" cy="50" r="4" stroke="black" stroke-width="4" fill="none" />
				var svg = newSVG;//document.querySelector( "SVG" );
				//svg.width = 100;
				//svg.height = 200;
				var pivot = svg.children['drivePivot'];//svg.querySelector( "[ID='drivePivot']" );
				var tm = Date.now() / 1000;
				
				var cx, cy;
				pivot.setAttribute( "cx", cx = driveCenter.x + ( 20 * Math.sin( freq * (Math.PI * 2) *( -tm % (1/freq) ) ) ) );
				pivot.setAttribute( "cy", cy = driveCenter.y + ( 20 * Math.cos( freq * (Math.PI * 2) *(tm %(1/freq) )) ) );
				
				//var driveArm = svg.querySelector( "[ID='driveArm']" );
				
				// L = Math.sqrt(dx,dy);
				// L^2 - dx^1
				var dy = cy + Math.sqrt( (80*80) - ((cx-driveCenter.x)*(cx-driveCenter.x) ) );
				var path = `M${cx},${cy} L${driveCenter.x},${dy}`;
				driveArm.setAttribute( "d", path );

				//var driveRod = svg.querySelector( "[ID='driveRod']" );
				path = `M${driveCenter.x},${dy} L${driveCenter.x},${dy+ 10}`;
				dy += 10;
				driveRod.setAttribute( "d", path );

				//var buttonPad = svg.querySelector( "[ID='buttonPad']" );
				var button = 140;
				if( dy > button ) {
	                        	button = dy;
	                                state = 1;
	                        } else {
	                        	state = 0;
	                        }
				path = `M${driveCenter.x - 10},${button} L${driveCenter.x + 10 },${button}`;
				buttonPad.setAttribute( "d", path );

				requestAnimationFrame(animate);
				//setTimeout( animate, 100 );
			}
			animate();
	                
	                newSVG.getValue = function() {
	                	return state;
	                };
	                
	                return newSVG;
		}

	function myArc(cx, cy, radius, max){       
	       var circle = document.createElementNS( "http://www.w3.org/2000/svg", "path");
	        var angle=max;

		const inner = radius - 30;

	            var radians= angle * (Math.PI / 180);  // convert degree to radians
	           
		// rx ry x-axis-rotation large-arc-flag sweep-flag x y
	            
	            circle.setAngle = function(angle){
	            	if( angle > 350 ) angle = 350;
	                if( angle < 2 ) angle = 2;
	            
		            var radians= angle * (Math.PI / 180);  // convert degree to radians

		            var sx = cx + 0;  
	        	    var sy = cy - radius;

		            var x = cx + Math.sin(radians) * radius;  
	        	    var y = cy - Math.cos(radians) * radius;
	                    
		            var ix = cx + Math.sin(radians) * (inner);  
	        	    var iy = cy - Math.cos(radians) * (inner);

	                    
	                    var d = " M "+ (sx) + " " + sy;
		            d += ` A ${radius} ${radius}, 0, ${angle<180?0:1}, 1, ${x} ${y} `;// "+x + " " + y;
		            d += ` L ${ix} ${iy}`;
		            d += ` A ${inner} ${inner}, 0, ${angle<180?0:1}, 0, ${cx+0} ${cy-inner} `;// "+x + " " + y;
	                    
	        	    d += "Z";
	            circle.setAttribute("d", d);
	            	
	            };
	            circle.setAngle( 0);
	      return circle;
	 }     

	  //myArc(110, 110, 100, 360);


	function testButton( cb ) {


	                var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );

			newSVG.style.width = 250;
			newSVG.style.height = 125;

	                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	                panelFrame.setAttribute( "x", "0" );
	                panelFrame.setAttribute( "y", "0" );
	                panelFrame.setAttribute( "width", "200" );
	                panelFrame.setAttribute( "height", "125" );
	                panelFrame.setAttribute( "stroke", "none" );
	                panelFrame.setAttribute( "fill", "#d0c090" );
	                newSVG.appendChild( panelFrame );

	                
	                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	                panelFrame.setAttribute( "x", "5" );
	                panelFrame.setAttribute( "y", "5" );
	                panelFrame.setAttribute( "width", "190" );
	                panelFrame.setAttribute( "height", "115" );
	                panelFrame.setAttribute( "stroke", "black" );
	                panelFrame.setAttribute( "fill", "none" );
	                newSVG.appendChild( panelFrame );
	                
	                
	                
			var speakerFill = document.createElementNS("http://www.w3.org/2000/svg", "defs");
	                var speakerFillPattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
	                speakerFillPattern.id = "transformedPattern";
	                speakerFillPattern.setAttribute( "x" ,20);
	                speakerFillPattern.setAttribute( "y" , 10);
	                speakerFillPattern.setAttribute( "width" , 5);
	                speakerFillPattern.setAttribute( "height" , 5 );
	                speakerFillPattern.setAttribute( "patternUnits","userSpaceOnUse" );
	                speakerFillPattern.setAttribute( "patternTransform","rotate(15)" );
	                speakerFill.appendChild( speakerFillPattern );
	                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	                speakerFillCircle.setAttribute( "x", "0" );
	                speakerFillCircle.setAttribute( "y", "0" );
	                speakerFillCircle.setAttribute( "width", "30" );
	                speakerFillCircle.setAttribute( "height", "2" );
	                speakerFillCircle.setAttribute( "stroke", "black" );
	                speakerFillCircle.setAttribute( "fill", "none" );
	                speakerFillPattern.appendChild( speakerFillCircle );

	                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	                speakerFillCircle.setAttribute( "x", "0" );
	                speakerFillCircle.setAttribute( "y", "0" );
	                speakerFillCircle.setAttribute( "width", "2" );
	                speakerFillCircle.setAttribute( "height", "20" );
	                //speakerFillCircle.setAttribute( "stroke", "black" );
	                speakerFillCircle.setAttribute( "fill", "black" );
	                speakerFillPattern.appendChild( speakerFillCircle );
	                
	                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	                speakerFillCircle.setAttribute( "cx", "10" );
	                speakerFillCircle.setAttribute( "cy", "10" );
	                speakerFillCircle.setAttribute( "r", "10" );
	                //speakerFillCircle.setAttribute( "stroke", "black" );
	                speakerFillCircle.setAttribute( "fill", "black" );
	                //speakerFillPattern.appendChild( speakerFillCircle );
	                
	                newSVG.appendChild( speakerFill );
	                
	                 //<circle cx="10" cy="10" r="10" style="stroke: none; fill: #0000ff" />
		
			var testButton = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			testButton.id = "testButton";
			testButton.setAttribute( "r", "15" );
			testButton.setAttribute( "cx", "50" );
			testButton.setAttribute( "cy", "50" );
	                
			testButton.setAttribute( "fill", "#a51210" );
			//testButton.setAttribute( "fill", "#f53230" );
			testButton.setAttribute( "stroke", "white" );
	                testButton.setAttribute( "stroke-width", "5" );

	                newSVG.appendChild( testButton );
	                
	    //            <style>
	    //.small { font: italic 13px sans-serif; }
	    //.heavy { font: bold 30px sans-serif; }
	                
	                var testText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	                testText.textContent = "TEST";
			testText.setAttribute( "x", "22" );
			testText.setAttribute( "y", "100" );
			testText.setAttribute( "font-size", "24px" );
			testText.setAttribute( "font-style", "sans-serif" );
			testText.setAttribute( "stroke", "black" );
	                
	                newSVG.appendChild( testText );



			var timerArc = myArc( 125, 60, 45, 90 );
	                //timerArc.className = "timerArc";
			timerArc.setAttribute( "fill", "red" );
			timerArc.setAttribute( "stroke", "black" );
	                timerArc.setAttribute( "stroke-width", "2" );
	                
	                newSVG.appendChild( timerArc );


	        var angle = 360;
	        var testing = false;
		function tick() {
	                timerArc.setAngle( angle );
	                if( testing ) {
	                	angle -= 3;
			}
	                if( angle < 0 ) {
	                        //testSuccess();
	                        angle = 0;
	                        testing = false;
	                        onOff = false;
	                        if( cb( true, false ) ) ;
	                }
	        	setTimeout( tick, 100 );
	        }
	        tick();

	                
	                //<text x="20" y="35" class="small">My</text>
	                
	                var onOff = false;
	                function setColor() {

	                        if( onOff ) {
	                                testing = true;
					cb( false, true );
	                                testButton.setAttribute( "fill", "#f53230" );
	                        }else {
	                                testing = false;
					cb( false, false );
	                                testButton.setAttribute( "fill", "#a51210" );
	                                angle = 360;
	                        }
	                }

	                newSVG.addEventListener( "click", (evt)=>{
	                	evt.preventDefault();
	                	//if( evt.offsetX >= (50-15) && evt.offsetX <= (50+15) 
	                        //  && evt.offsetY >= (50-15) && evt.offsetY <= (50+15) )
	                        {
	                                onOff = !onOff;
	                                setColor();
	                        }
	                } );

	                newSVG.reset = function() {
	                        angle = 360;
	                        testing= false;
				cb( false, false );
	                        onOff = false;
	                        setColor();
	                };

	                return newSVG;

	}

	function makeAnalyzer( cb ) {
	                var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );

			newSVG.style.width = 420;
			newSVG.style.height = 330;

	                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	                panelFrame.setAttribute( "x", "0" );
	                panelFrame.setAttribute( "y", "0" );
	                panelFrame.setAttribute( "width", "420" );
	                panelFrame.setAttribute( "height", "230" );
	                panelFrame.setAttribute( "stroke", "none" );
	                panelFrame.setAttribute( "fill", "#d0c090" );
	                newSVG.appendChild( panelFrame );

	                
	                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	                panelFrame.setAttribute( "x", "5" );
	                panelFrame.setAttribute( "y", "5" );
	                panelFrame.setAttribute( "width", "410" );
	                panelFrame.setAttribute( "height", "220" );
	                panelFrame.setAttribute( "stroke", "black" );
	                panelFrame.setAttribute( "fill", "none" );
	                newSVG.appendChild( panelFrame );
	                

			var logicJack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			logicJack.id = "logicJack";
			logicJack.setAttribute( "r", "5" );
			logicJack.setAttribute( "cx", "22" );
			logicJack.setAttribute( "cy", "40" );
	                
			logicJack.setAttribute( "fill", "#657210" );
			logicJack.setAttribute( "stroke", "#805040" );
	                logicJack.setAttribute( "stroke-width", "2" );
	                newSVG.appendChild( logicJack );

			var logicJack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			logicJack.id = "logicJack";
			logicJack.setAttribute( "r", "5" );
			logicJack.setAttribute( "cx", "22" );
			logicJack.setAttribute( "cy", "60" );
	                
			logicJack.setAttribute( "fill", "#657210" );
			logicJack.setAttribute( "stroke", "#805040" );
	                logicJack.setAttribute( "stroke-width", "2" );
	                newSVG.appendChild( logicJack );

			var logicJack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			logicJack.id = "logicJack";
			logicJack.setAttribute( "r", "5" );
			logicJack.setAttribute( "cx", "22" );
			logicJack.setAttribute( "cy", "80" );
	                
			logicJack.setAttribute( "fill", "#657210" );
			logicJack.setAttribute( "stroke", "#805040" );
	                logicJack.setAttribute( "stroke-width", "2" );
	                newSVG.appendChild( logicJack );

			var logicJack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			logicJack.id = "logicJack";
			logicJack.setAttribute( "r", "5" );
			logicJack.setAttribute( "cx", "22" );
			logicJack.setAttribute( "cy", "100" );
	                
			logicJack.setAttribute( "fill", "#657210" );
			logicJack.setAttribute( "stroke", "#805040" );
	                logicJack.setAttribute( "stroke-width", "2" );
	                newSVG.appendChild( logicJack );


	                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	                panelFrame.setAttribute( "x", "45" );
	                panelFrame.setAttribute( "y", "15" );
	                panelFrame.setAttribute( "width", "350" );
	                panelFrame.setAttribute( "height", "200" );
	                panelFrame.setAttribute( "stroke", "white" );
	                panelFrame.setAttribute( "fill", "black" );
	                panelFrame.setAttribute( "stroke-width", "2" );
	                newSVG.appendChild( panelFrame );

	                var inputs = [
	                	 { history:[], path:document.createElementNS("http://www.w3.org/2000/svg", "path" ) },
	                	 { history:[], path:document.createElementNS("http://www.w3.org/2000/svg", "path" ) },
	                	 { history:[], path:document.createElementNS("http://www.w3.org/2000/svg", "path" ) },
	                	 { history:[], path:document.createElementNS("http://www.w3.org/2000/svg", "path" ) },
	                         ];
			var outputs = [
	                	 { history:[], path:document.createElementNS("http://www.w3.org/2000/svg", "path" ) },
	                	 { history:[], path:document.createElementNS("http://www.w3.org/2000/svg", "path" ) },
	                	 { history:[], path:document.createElementNS("http://www.w3.org/2000/svg", "path" ) },
	                	 { history:[], path:document.createElementNS("http://www.w3.org/2000/svg", "path" ) },
	                	];
			inputs.forEach( (put,n)=>{
				if( n == 3 )
		                	put.path.setAttribute( "stroke", "yellow" );
				else
		                	put.path.setAttribute( "stroke", "red" );
	                	newSVG.appendChild( put.path );
	                } );
			outputs.forEach( (put,n)=>{
	                	put.path.setAttribute( "stroke", "skyblue" );
	                	newSVG.appendChild( put.path );
	                } );
	                
	const lineLeft = 50;
	const lineRight = 390;
	const lineOne = 20;
	const lineLength = 15000; 

	                var prior = Date.now();
			function tick() {
				var path;
	                        var now = Date.now();
				var thisdel = now-prior;
	                        var tickTotal;
				var ypos = 0;
				inputs.forEach( (put,n)=>{
		                        put.history.push( { del: thisdel, value: cb( n ) } );
					if( n == 3 ) ypos = 45;
					else ypos = 20;
	                        	path = "M" + lineRight + "," + (ypos+lineOne + (n*20)) ;
	                                tickTotal = 0;
	                                for( var h = put.history.length - 1; h > 0; h-- ) {
	                                	if( tickTotal > lineLength ) {
	                                        	put.history.splice( 0, h );
	                                                break;
	                                        }
	                                	var hist = put.history[h];
	                                        var xPos = lineRight -  ((lineRight-lineLeft)*( (tickTotal+hist.del) / lineLength ));
		                        	path += "L" + xPos + "," + (lineOne +ypos+ (n*20) - (hist.value / 10)) ;
	                                        tickTotal += hist.del;
	                                }
	        	        	put.path.setAttribute( "d", path  );
		                } );
				outputs.forEach( (put,n)=>{
		                        put.history.push( { del: thisdel, value: cb( 4+n ) } );

	                        	path = "M" + lineRight + "," + (lineOne + 115 + (n*20)) ;

	                                tickTotal = 0;
					ypos = 15;
	                                for( var h = put.history.length - 1; h > 0; h-- ) {
	                                	if( tickTotal > lineLength ) {
	                                        	put.history.splice( 0, h );
	                                                break;
	                                        }
	                                	var hist = put.history[h];
	                                        var xPos = lineRight -  ((lineRight-lineLeft)*( (tickTotal+hist.del) / lineLength ));
		                        	path += "L" + xPos + "," + (lineOne + ypos+115+ (n*20) - (hist.value / 10)) ;
	                                        tickTotal += hist.del;
	                                }
	                        	//path += "L"+  lineRight + "," + (lineOne+ 80 + (n*20)) ;
	        	        	put.path.setAttribute( "d", path  );
		                } );

				prior = now;
	                	setTimeout( tick, 100 );
	                }
			tick();
	                
	                return newSVG;

	}

	function loadImage( filename ) {
		var img = document.createElement( "IMG" );
		img.src = filename;
		img.style.width = "100%";
		return img;
	}

	const journal = [ 
		{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	<CENTER>Observations<BR>
                on<BR>Certain Properties<BR>
                of<BR>
                Components<BR>
                of<BR>
                Synthetic Brains<BR>
                <BR><BR><BR>
                [Click on right side of this<BR>
		jounral page to go to next page]<BR>
          ` 
	         , activate : ()=>{
	                setupDemo0();
			}
		}
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	I have returned to the lab to continue<BR>
                my experiments on the brain components<BR>
                <BR>
                They are constructing a bug in the<BR>
                workshop.  Once it is completed I will be<BR>
                able to use my knowledge of synthetic<br>
                brains to control it.<BR>
                <BR>
                I plan to do a series of experiments.<BR>
                Each will involve creating a brain to<BR>
                perform a specific function.  The brains<BR>
                will be built on the brain board<BR>
                <BR>
                [Click on left side of this journal page<BR>
                to return to previous page]<BR>
        `}
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	Tool Panel<BR>
                <BR>
                The blue region at the top contains<BR>
                some of the items you will use to complete<BR>
                the goals.<BR>
                <BR>
                Clicking on them will automatically place<BR>
                a copy on the board.  Click the large green<BR>
                circle which is a Neuron.<BR>
                <BR>
                Don't worry about making a mess, the<BR>
                board will be cleared and setup with the<BR>
                 inputs and outputs to and from the brain<BR>
                 respectively.<BR>
                <BR>
                <BR>
                <DIV ID="jim1" > </DIV><BR>
                <BR>
                <BR>
         `
	         , inserts: { 
	                jim1:makeNeuron()
	         }
	         }
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	The recycle can...<BR>
                <DIV ID="jim1"> </DIV><BR>
                <BR>
                can be used to clear the board.<BR>
                <BR>
                If you accientally clear the test<BR>
		inputs and outputs, you can restore them<BR>
		by going to the previous journal page,<BR>
		and foward again, which will setup<BR>
                for the current test.<BR>
                <BR>
                Red nodes are Inputs, and blue<BR>
                nodes are outputs.<BR>
                <BR>
		The red node with Yellow arrow<br>
                downward is the first button pushing<BR>
                rotary wheel<BR>
                <BR>
		The red node with Yellow arrow<br>
                to the right is the slider input<BR>
                that ranges from 0-1 smoothly.<BR>
                <BR>
                <BR>
         `
	         , inserts: { 
	                jim1:makeTrash()
	         }
	         }
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	This is an example of clicking
		On the edge of a peice, and dragging
		away one space.  The connection does
		not show until the destination is different
		than the source<BR>
		<BR>
		
                <DIV ID="jim1"> </DIV><BR>
                <BR>
                Have fun, be creative...<BR>
                <BR>
                <DIV ID="jim2"> </DIV><BR>
                <BR>
         `
	         , inserts: { 
	                jim1:loadImage( "images/first-drag.jpg" ),
			jim2:loadImage( "images/PathPicture.jpg" )
	         }
	         }

	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	Monitoring Equpment<BR>
                <BR>
                The brain will be used to control lights in<BR>
                response to inputs from switches.<BR>
                <BR>
                THe input from the switches and the<BR>
                output to the lights will be monitored by<BR>
                a Logic Analyzer.  It shows the level of the<BR>
                output in blue.<BR>
                <BR>
                It can be preprogrammed with the<BR>
                expected output (shown in gold during<BR>
                a test) and will signal if the actal output<BR>
                is wrong.<BR>
         `
	         }
		

	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	<BR>
                <BR>
                To test a brain, press the "Test" Button<BR>
                then flip the switch to "Run".  If the<BR>
                brain has done what it should while the<BR>
                timer ticks to zero, the experiment is a<BR>
                success.<BR>
                <BR>
                Testing can begin at any time, and may be<BR>
		stopped and reset at any time by clicking<BR>
                the test button again.<BR>
                <BR>
         `}
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	Signals and Lines<BR>
                I have discovered that bug brains<BR>
                operate on signals which range from<BR>
                0(off) to 1(on).<BR>
                <BR>
                The signals enter the brain through the<BR>
                input nodes, travel along lines and exit<BR>
                through output nodes.<BR>
                <BR>
                Input Node - Line - Output Node<BR>
                <DIV ID="jim1"> </DIV><BR>
                A line is made by grabbing the edge of a<BR>
                node and dragging it out.  Drop the line<BR>
                on the edge of the target node.<BR>
                
         `
	         , activate : ()=>{
	                setupDemo1();
	        }
	       , inserts: { 
	                jim1:makeLightOutput()
	        }
	        }
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	Experiment 1: The Start<BR>
                I have connected the input node to an<BR>
                automatic switch.  The output node<BR>
                goes to the light.  To confirm my theory<BR>
                on the previous page, I will attempt to<BR>
                make a brain where the light will com<BR>
                on when the switch is on.<BR>
                <BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input from switch</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to light</SPAN><BR>
                <BR>
                [Build a brain on the Brain Board]<BR>
                [To test, press Test and wait for timer<BR>
                to expire]<BR>
                [Go to the next page when successful]<BR>
         `
	         , activate : ()=>{
	                setupDemo2();
	        }
	       , inserts: { 
	                jim1:makeButtonInput()
	                , jim2:makeLightOutput()
	         }
	         , locked : true
	         }
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
		A Success!!!!!<BR>
		<BR>
		They have started work on the bug in the<BR>
		workshop.  I had beter hurry up and<BR>
		complete these experiments.<BR>
		<BR>
		There seems to be a space for connecting<BR>
		up to 8 lines to the input node.  In<BR>
		theory then I should be able to drive<BR>
		more than one light from the same input.<BR>
		I'll have to test this.<BR>
		<BR>
		<BR>
		<BR>
		<BR>
         `}
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
		Experiment 2: Two Lights<BR>
		I have connected the input node to an<BR>
		automatic switch.  There are two output<BR>
		nodes - each goes to a light.  I will<BR>
		attempt to make a brain where both<BR>
		lights come on when the switch is on.<BR>
		<BR>
		<BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input from switch</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to lights 1 and 2</SPAN><BR>
         `
	         , activate : ()=>{
	                setupDemo3();
	        }
	         , inserts: { 
	                jim1:makeButtonInput()
	                , jim2:makeLightOutput()
	         }
		 , locked:true
		}
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
		Two in a row!!<BR>
		<BR>
		Much excitement.  Having a party<BR>
		to celebrate.  Maybe I could set<BR>
		up some lights???<BR>
		<BR>
		Might as well do it as an<BR>
		experiment...<BR>
		<BR>
		<BR>
		<BR>
		<BR>
		<BR>
         `}
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
		Experiment 3: Disco<BR>
		I have set up a second faster automatic<BR>
		switch and there are now four lights.<BR>
		I want lights 1 and 3 to swtich slowly<BR>
		and lights 2 and 4 to switch quickly.<BR>
		<BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input from 1 and 2</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to lights 1,2,3 and 4.</SPAN><BR>
		[Lines can be removed by grabbing<BR>
		them in one of the 8 grid squares<BR>
		that surround the node then dragging<BR>
		them away and dropping them]<BR>
         `
	         , activate : ()=>{
	                setupDemo4();
	        }
	         , inserts: { 
	                jim1:makeButtonInput()
	                , jim2:makeLightOutput()
	         }
		 , locked:true
		}
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
                Neurons<BR>
                The large green spheres are neurons.<BR>
                Neurons are the thinking part of a brain.<BR>
                these seem to be simplified versions of<BR>
                real neurons.  Neurons in general have a<BR>
                threshold.  If the input to the neuron is <BR>
                below the threshold the neuron is off<BR>
                (output 0).  If the input to the neuron<BR>
                 is at or above the threshold the neuron is<BR>
                 on (output 1).<BR>
                 <BR>
                 If this is true for these neurons the I<BR>
                 could make a brain which switches on a<BR>
                 light when the input is above some value.<BR>
                <BR>
                
         `}
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 4: Neuron Threshold<BR>
                The input now comes from a slider.<BR>
                The slider produces a variable signal in<BR>
                the range from 0 to 1.  I want the light to<BR>
                switch on when the signal is 80 or above.<BR>
                <BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top"> Input from slider : 0 to 1</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to light</SPAN><BR>
                <BR>
                [Click waste bin to clear the brain]<BR>
                [Click large egreen button to add neuron]<BR>
                [Neuron shows in table with slider to set
                threshold]<BR>
         `
	         , activate : ()=>{
	                setupDemo5();
	        }
	         , inserts: { 
	                jim1:makeSliderInput()
	                , jim2:makeLightOutput()
	         }
	         , locked:true
	        }
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                I have noticed that music equipment<BR>
                uses a seris of lights to indicate sound<BR>
                volume.  When the volume gets larger<BR>
                thre are more lights lit.<BR>
                <BR>
                It should be possible to duplicate this<BR>
                using several neurons.<BR>
                <BR>
                [On the Logic Analyzer, the blue line<BR>
                shows the output and the gold line shows<BR>
                the expected output.  The blue line should<BR>
                overlay the gold line.  If you can see a gold<BR>
                line the otuput is wrong and the test <BR>
                will fail]
         `}
	        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 5: Light Scale<BR>
                The input comes from the slider.<BR>
                There are four lights that should be lit<BR>
                at equally spaced intervals to show the<BR>
                value of the input.  The more light son,<BR>
                the higher the input.<BR>
                <BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top"> Input from slider : 0 to 1</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to lights 1,2,3 and 4</SPAN><BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
	         , activate : ()=>{
	                setupDemo6();
	        }
	         , inserts: { 
	                jim1:makeSliderInput()
	                , jim2:makeLightOutput()
	         }
	         , locked:true
	        }
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Synapses<BR>
                The input to a neuron comes through a<BR>
                synapse (shown as a blue or red blob<BR>
                on the neuron).  Each synapse has a<BR>
                weight between -1 and 1.  This is<BR>
                the percent of the signal the synapse<BR>
                passes through to the neuron.<BR>
                <BR>
                If there is mroe than one input to a<BR>
                neuron, then the input signal is the sum<BR>
                of each input signal times the weight of<BR>
                its synapse.  If this sum exceeds the<BR>
                threshold the neuron switches on.<BR>
                <BR>
                [Right click on a synapse to set the weight]<BR>
         `}
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Computing with Neurons<BR>
                By setting the synapse weights and the<BR>
                neuron threshold it should be possible<BR>
                to perform logic operation with<BR>
                neurons.<BR>
                <BR>
                These logic operations are the building<BR>
                blocks for digital computers. In<BR>
                computers, signals are either 0 or 1.<BR>
                The equivalent signals in Bug Brain are<BR>
                0 (light off) and 1(light on).<BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `}
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 6: Or<BR>
                The light should go on if switch 1 OR<BR>
                switch 2 is on (or both are on).<BR>
                <BR>
                <BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input from switches 1 and 2</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to light</SPAN><BR>
                <BR>
         `
	         , activate : ()=>{
	                setupDemo7();
	        }
	         , inserts: { 
	                jim1:makeSliderInput()
	                , jim2:makeLightOutput()
	         }
	         , locked:true
	        }
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 7: And<BR>
                The light should go on if switch 1 AND<BR>
                switch 2 are on.<BR>
                <BR>
                <BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input from switches 1 and 2</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to light</SPAN><BR>
                <BR>
         `
	         , inserts: { 
	                jim1:makeButtonInput()
	                , jim2:makeLightOutput()
	         }
	         , activate : ()=>{
	                setupDemo8();
	        }
	         , locked:true
	        }
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 8: Inhibition <BR>
                Synapses can have negative weights.<BR>
                A negative input is subtracted from<BR>
                the input sum, so these synapses<BR>
                inhibit the neuron.<BR>
                <BR>
                In this experiment the light should<BR>
                be on when switch 2 is on and<BR>
                switch 1 is off.<BR>
                <BR>
                <BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input from switches 1 and 2</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to light</SPAN><BR>
                <BR>
         `
	         , inserts: { 
	                jim1:makeButtonInput()
	                , jim2:makeLightOutput()
	         }
	         , activate : ()=>{
	                setupDemo9();
	        }
	         , locked:true
	        }
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
                Experiment 9: Inverter <BR>
                There is a single input and output. The<BR>
                light should go on if the switch is NOT<BR>
                on.<BR>
                <BR>
                <BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input from switch</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to light</SPAN><BR>
                <BR>
         `
	         , inserts: { 
	                jim1:makeButtonInput()
	                , jim2:makeLightOutput()
	         }
	         , activate : ()=>{
	                setupDemo10();
	        }
	         , locked:true
	        }
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Exclusive Or (Xor)<BR>
                The output is on if one or other of the<BR>
                inputs is on but not if both are on.<BR>
                <BR>
                This is a function with a bit of history.<BR>
                Minsky and Papert showed that a single<BR>
                neuron could not do it.  They are<BR>
                generally credited with stpping<BR>
                anyone working on neuron networks<BR>
                during the 1970's.  Interest returned in<BR>
                the 1980's with the introduction of the<BR>
                idea of multiple layers of neurons.<BR>
                <BR>
         `}
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 10: Xor<BR>
                The light should be on if one of the<BR>
                switches is on but not if both are on.<BR>
                <BR>
                <BR>
                <SPAN ID="jim1"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input from switches 1 and 2</SPAN><BR>
                <SPAN ID="jim2"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output to light</SPAN><BR>
                <BR>
         `
	         , inserts: { 
	                jim1:makeButtonInput()
	                , jim2:makeLightOutput()
	         }
	         , activate : ()=>{
	                setupDemo11();
	        }
	         , locked : true
	        }
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Success<BR>
                <BR>
                The lady bug is complete.<BR>
                It is time to leave the lab<BR>
                and go into the real world.<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
	         , locked : true
	        }
	         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
         `}
	        
	        ];


	var gameState = {
		journalState : 0,
		journalStateMax : 0,
		progressLocked : false,
		getExpectedValue : null,
		getTestValue : null,
		expectedAccum : 0,
		testing : false,
	};

	var neuronTable = setupNeuronTable( document.getElementById("statusTable"));

	var boardFrame = document.getElementById( "boardFrame" );
	var brain = Brain();

	function brainTicker() {
	        brain.step();
	        setTimeout( brainTicker, 1 );
	}
	brainTicker();

	var brainBoard = new BrainBoard( brain, boardFrame );

	brainBoard.addEventListener( "added", (p,n)=>{
	        if( n instanceof brain.Neuron ) {
	                neuronTable.addNeuron( p,n );
	        }
	        if( n instanceof brain.Synapse )  {
	                neuronTable.addSynapse( p, n);
	        }
	});

	brainBoard.addEventListener( "select", (n)=>{
		
	        if( n instanceof brain.Neuron ) {
			neuronTable.select(n);
		}
	});
	var notebookPanel = document.getElementById( "notebookPanel" );
	notebookPanel.addEventListener( "click", (evt)=>{
			if( evt.offsetX > 100 )
				setPage( gameState.journalState+1 );
			else if( gameState.journalState )
				setPage( gameState.journalState-1 );
		} );
	notebookPanel.innerHTML = journal[gameState.journalState].HTML;

	var activators = [];
	var outputters = [];

	var testControl = null;

	function testTestPanel() {
		var newDiv = document.getElementById( "boardMonitorFrame" );//createElement( "div" );
		//newDiv.style.height = 120;
		//newDiv.style.width = 500;
		//newDiv.style.position = "relative";
	        //newDiv.style.display = "inline-block";
		newDiv.style.padding = 8;
		var svg;

	        newDiv.appendChild( testControl = svg = testButton( (test,on)=>{
			if( !test ) {
				gameState.testing = on;
				if( on ) gameState.expectedAccum = 0;
			}
			console.log( "Test Button:", test, on );
	                if( test && !on ) {
				if( gameState.expectedAccum < 1 ) {
		                        gameState.progressLocked = journal[gameState.journalState].locked = false;
					setPage( gameState.journalState+1 );
					return true;
				}
				console.log( "Failed." );
	                        return false;
	                }
	        } ) );
	        svg.style.verticalAlign="top";
		svg.style.height = "66";
		svg.style.width = "25%";
		svg.style.top = "5";
		svg.setAttribute( "viewBox", "0 100 200 40");
		svg.setAttribute( "preserveAspectRatio", "xMaxYMax" );

	/*
	        newDiv.appendChild( svg = testPanel.runStop() );
	        svg.style.verticalAlign="top";
	svg.style.height = "66";
	svg.style.width = "25%";
	  svg.setAttribute( "viewBox", "0 100 200 50")
	svg.setAttribute( "preserveAspectRatio", "xMaxYMax" );
	*/

	        var tmp;
	        newDiv.appendChild( tmp = animator(0.75) );
	        activators.push( tmp );
	        tmp.style.verticalAlign="top";
	        tmp.style.height = "64";
	        tmp.style.width = "48";
	        tmp.setAttribute( "viewBox", "0 00 100 175");
	        
	        newDiv.appendChild( tmp = animator(0.223) );
	        activators.push( tmp );
	        tmp.style.verticalAlign="top";
	        tmp.style.height = "64";
	        tmp.style.width = "48";
	        tmp.setAttribute( "viewBox", "0 00 100 175");

	        newDiv.appendChild( svg = makeSlider() );
	        activators.push( svg );
	        svg.style.height = "128";
	        svg.style.width = "96";
	        svg.setAttribute( "viewBox", "0 00 100 255");
	        svg.setAttribute( "transform", "rotate(-90 0 -25)");

	        newDiv.appendChild( svg = makeAnalyzer( (n)=>{
	        	if( n >= 4 ) {
				if( outputters[n-4] ) {
					return outputters[n-4].value * 100;
				}	
	                	return 0;
	                }
			if( n == 3 ) {
			  	if( gameState.getExpectedValue ) {
					var expect = gameState.getExpectedValue();
					if( gameState.testing && gameState.getTestValue ) {
						gameState.expectedAccum += Math.abs( expect - gameState.getTestValue() );
					}
					return expect;
				}else return 0;
	                } else {
	                	if( n < activators.length ) 
	                        	return activators[n].getValue() * 100;
	                }
	        }) );

	        svg.style.position = "relative";
	        svg.style.top = -65;
	        svg.style.zIndex=3;
	        svg.style.height = "150";
	        svg.style.width = "328";
	        svg.setAttribute( "viewBox", "0 00 450 235");

		//newDiv.appendChild( switcher.animator(4) );
		//document.body.appendChild( newDiv );
	}

	function addSliderInput( n, x, y ) {
	        var newN = brainBoard.board.PutPeice( brainBoard.sliderInputPeice, x, y, ()=>{
	                //console.log( "Get External" );
	                return activators[2].getValue();
	        } );
	        if( brainBoard.events["added"] )
	                brainBoard.events["added"]( brainBoard.sliderInputPeice,newN );
	}

	function addButtonInput( n, x, y ) {
	        var newN = brainBoard.board.PutPeice( brainBoard.buttonInputPeice, x, y, ()=>{
	                if( n < activators.length )
	                        return activators[n].getValue();
	                return 0;
	        } );
	        if( brainBoard.events["added"] )
	               brainBoard.events["added"]( brainBoard.buttonInputPeice,newN );
	}

	function addLightOutput( n, x, y ) {
	        var newN = brainBoard.board.PutPeice( brainBoard.lightOutputPeice, x, y, (val)=>{
	                       // console.log( "Set LOight External", val );
	                       return val;
	                } );
		outputters.push( newN );
	        if( brainBoard.events["added"] )
	               brainBoard.events["added"]( brainBoard.lightOutputPeice,newN );
	}

	function setupDemo0() {
		
		gameState.getExpectedValue = () =>{
	                        	return (activators[0].getValue() & activators[1].getValue() ) * 100;
		};
		
	}

	function setupDemo1(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

		outputters.length = 0;
	        addLightOutput( 0, 15, 10 );

		gameState.getExpectedValue = () =>{
	                 return activators[0].getValue() * 100;
		};
		gameState.getTestValue = ()=>{
			return outputters[0].value * 100;
		};

	}

	function setupDemo2(  ) {
	        neuronTable.clear();
	        brainBoard.reset();
	        addButtonInput( 0, 2, 10 );
		outputters.length = 0;
	        addLightOutput( 0, 15, 10 );
	}

	function setupDemo3(  ) {
	        neuronTable.clear();
	        brainBoard.reset();
	        addButtonInput( 0, 2, 10 );
		outputters.length = 0;
	        addLightOutput( 0, 15, 10 );
	        addLightOutput( 1, 15, 15 );
		gameState.getExpectedValue = () =>{
	                 return activators[0].getValue() * 200;
		};
		gameState.getTestValue = ()=>{
			return outputters[0].value * 100 + outputters[1].value * 100;
		};
	}

	function setupDemo4(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

	        addButtonInput( 0, 2, 9 );
	        addButtonInput( 1, 2, 15 );
		outputters.length = 0;
	        addLightOutput( 0, 15, 6 );
	        addLightOutput( 1, 15, 10 );
	        addLightOutput( 2, 15, 14 );
	        addLightOutput( 3, 15, 18 );
		gameState.getExpectedValue = () =>{
	                        	return ( activators[0].getValue() + activators[1].getValue() ) * 100;
		};
		gameState.getTestValue = ()=>{
			return outputters[0].value * 50 + outputters[1].value * 50 + outputters[2].value * 50 + outputters[3].value * 50;	};
	}


	function setupDemo5(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

	        addSliderInput( 0, 2, 12 );
		outputters.length = 0;
	        addLightOutput( 0, 15, 12 );

		gameState.getExpectedValue = () =>{
	                        	return ( activators[2].getValue() > 0.5 )? 100 : 0;
		};
		gameState.getTestValue = ()=>{
			return outputters[0].value * 100;
		};

	}



	function setupDemo6(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

	        addSliderInput( 0, 2, 12 );
		outputters.length = 0;
	        addLightOutput( 0, 15, 6 );
	        addLightOutput( 1, 15, 10 );
	        addLightOutput( 2, 15, 14 );
	        addLightOutput( 3, 15, 18 );
		gameState.getExpectedValue = () =>{
			if( activators[2].getValue() > 0.8 ) return 200;
			if( activators[2].getValue() > 0.6 ) return 150;
			if( activators[2].getValue() > 0.4 ) return 100;
			if( activators[2].getValue() > 0.2 ) return 50;
			return 0;
		};
		gameState.getTestValue = ()=>{
			return outputters[0].value * 50 + outputters[1].value * 50 + outputters[2].value * 50 + outputters[3].value * 50;	};
	}

	// experiment 6; there's one setup before the first
	function setupDemo7(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

		outputters.length = 0;
	        addButtonInput( 0, 2, 9 );
	        addButtonInput( 1, 2, 15 );
	        addLightOutput( 0, 15, 12 );

		gameState.getExpectedValue = () =>{
			if( activators[0].getValue() || activators[1].getValue() ) return 100;
			return 0;
		};
		gameState.getTestValue = ()=>{
			return outputters[0].value * 100;
		};

	}

	// experiment 7; there's one setup before the first
	function setupDemo8(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

		outputters.length = 0;
	        addButtonInput( 0, 2, 9 );
	        addButtonInput( 1, 2, 15 );
	        addLightOutput( 0, 15, 12 );

		gameState.getExpectedValue = () =>{
			if( activators[0].getValue() && activators[1].getValue() ) return 100;
			return 0;
		};

		gameState.getTestValue = ()=>{
			return outputters[0].value * 100;
		};
	}

	// experiment 8; there's one setup before the first
	function setupDemo9(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

		outputters.length = 0;
	        addButtonInput( 0, 2, 9 );
	        addButtonInput( 1, 2, 15 );
	        addLightOutput( 0, 15, 12 );
		gameState.getExpectedValue = () =>{
			if( !activators[0].getValue() && activators[1].getValue() ) return 100;
			return 0;
		};
		gameState.getTestValue = ()=>{
			return outputters[0].value * 100;
		};
	}

	// experiment 8; there's one setup before the first
	function setupDemo10(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

		outputters.length = 0;
	        addButtonInput( 0, 2, 9 );
	        addLightOutput( 0, 15, 9 );

		gameState.getExpectedValue = () =>{
			if( !activators[0].getValue() ) return 100;
			return 0;
		};

		gameState.getTestValue = ()=>{
			return outputters[0].value * 100;
		};
	}
	// experiment 8; there's one setup before the first
	function setupDemo11(  ) {
	        neuronTable.clear();
	        brainBoard.reset();

		outputters.length = 0;
	        addButtonInput( 0, 2, 9 );
	        addButtonInput( 1, 2, 15 );
	        addLightOutput( 0, 15, 12 );

		gameState.getExpectedValue = () =>{
			if( !!activators[0].getValue() ^ !!activators[1].getValue() ) return 100;
			return 0;
		};

		gameState.getTestValue = ()=>{
			return outputters[0].value * 100;
		};
	}

	function findOpenSpot( x, y ) {
	        function test3x3Layer( ) {
	                var layer;
	                layer = brainBoard.board.GetLayerAt( x, y, null );
	                if( layer ) return layer;
	                layer = brainBoard.board.GetLayerAt( x+1, y, null );
	                if( layer ) return layer;
	                layer = brainBoard.board.GetLayerAt( x-1, y, null );
	                if( layer ) return layer;

	                layer = brainBoard.board.GetLayerAt( x, y+1, null );
	                if( layer ) return layer;
	                layer = brainBoard.board.GetLayerAt( x+1, y+1, null );
	                if( layer ) return layer;
	                layer = brainBoard.board.GetLayerAt( x-1, y+1, null );
	                if( layer ) return layer;

	                layer = brainBoard.board.GetLayerAt( x, y-1, null );
	                if( layer ) return layer;
	                layer = brainBoard.board.GetLayerAt( x+1, y-1, null );
	                if( layer ) return layer;
	                layer = brainBoard.board.GetLayerAt( x-1, y-1, null );
	                if( layer ) return layer;

	                return null;
	        }
	        var layer = test3x3Layer();
	        if( !layer ) return { x:x, y:y};
	        var n, m;
	        for( var m = 1; m < 14; m++ ) {
	                x += 4;
	                y -= 4;
	                var layer = test3x3Layer();
	                if( !layer ) return { x:x, y:y};
	                for( var n = 0; n < m*2; n++ ){
	                        y += 4;
	                        var layer = test3x3Layer();
	                        if( !layer ) return { x:x, y:y};
	                }

	                for( var n = 0; n < m*2; n++ ){
	                        x -= 4;
	                        var layer = test3x3Layer();
	                        if( !layer ) return { x:x, y:y};
	                }

	                for( var n = 0; n < m*2; n++ ){
	                        y -= 4;
	                        var layer = test3x3Layer();
	                        if( !layer ) return { x:x, y:y};
	                }
	                for( var n = 0; n < m*2-1; n++ ){
	                        x += 4;
	                        var layer = test3x3Layer();
	                        if( !layer ) return { x:x, y:y};
	                }
	                x += 4;
	        }
	        
	        return { x:x, y:y};
	}

	function setupToolPanel() {
	        var tooldiv = document.getElementById("boardToolsFrame" );
	        var tool;
	         tooldiv.appendChild( (tool = makeNeuron()).on );
	         tool.on.addEventListener( "click", ()=>{
	                 var pos = findOpenSpot( 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_x
	                        , 10* (1<<brainBoard.scale) - brainBoard.board.board_origin_y );
	                 var newN = brainBoard.board.PutPeice( brainBoard.NeuronPeice
	                                        , pos.x, pos.y
	                                        , 0 );
	                 if( brainBoard.events["added"] )
	                        brainBoard.events["added"]( brainBoard.NeuronPeice,newN );
	         });
	         //tooldiv.appendChild( (shapes.makeNode()).on );
	         tooldiv.appendChild( tool = makeTrash() );
	         tool.addEventListener( "click",()=>{
	                neuronTable.clear();
	                brainBoard.reset();
	         });

	         //tooldiv.appendChild( (shapes.makePowerOutput()).on );

	         tooldiv.appendChild( (tool = makeButtonInput()).on );
	         tool.on.addEventListener( "click", ()=>{ 
	                var pos = findOpenSpot( 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_x
	                        , 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_y );
	                 addButtonInput( 0, pos.x, pos.y );
	         });
	        tooldiv.appendChild( (tool = makeLightOutput()).on );
	        tool.on.addEventListener( "click", ()=>{
	                var pos = findOpenSpot( 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_x
	                        , 10  * (1<<brainBoard.scale)- brainBoard.board.board_origin_y );
	                addLightOutput(0, pos.x, pos.y);
	        } );
	         tooldiv.appendChild( (tool = makeSliderInput()).on );
	         tool.on.addEventListener( "click", ()=>{
	                var pos = findOpenSpot( 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_x
	                        , 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_y );
	                var newN = brainBoard.board.PutPeice( brainBoard.sliderInputPeice
	                        , pos.x, pos.y
	                        , ()=>{
	                                //console.log( "Get External" );
	                                return activators[2].getValue();
	                } );
	                if( brainBoard.events["added"] )
	                       brainBoard.events["added"]( brainBoard.sliderInputPeice,newN );
	        });
	        
	}

	setupToolPanel();

	testTestPanel();

	function reloadStatus() {
		var page = Number( localStorage.getItem( "maxPage" ) );
		if( page ) {
		        journal.forEach( (jpage,n)=>{
				if( n < page )
					journal[n].locked = false;
			} );
			setPage( page );
		} else {
			setPage( 0 );
		}
	}

	function animate() {
	        brainBoard.board.BoardRefresh();
	        requestAnimationFrame(animate);
	}
	animate();

	function fixupImages() {
	        journal.forEach( page=>{

	                notebookPanel.innerHTML = page.HTML;
	                var pageNum = notebookPanel.querySelector(`[id="pageNum"]`);
	                if( pageNum ) {
	                        pageNum.textContent = '' + (gameState.journalState + 1);
	                        if( page.inserts ) {
	                                var IDs = Object.keys( page.inserts );
	                                IDs.forEach( id =>{
	                                        var img;
	                                        img = notebookPanel.querySelector(`[id="${id}"]`);
	                                        if( img ) {
							if( "on" in page.inserts[id] )
			                                        img.appendChild( page.inserts[id].on );
							else
			                                       img.appendChild( page.inserts[id] );
						}
	                                });
	                        }

	                }
	                page.HTML = notebookPanel.innerHTML;

	        });
	}

	fixupImages();
	reloadStatus();

	//------------ SET PAGE ROUTINE ------------------------------

	function setPage( newPage )
	{
		if( gameState.progressLocked ) {
			if( newPage > gameState.journalState ) {
			 	return;
			}
	        }
	        testControl.reset();
		gameState.journalState = newPage;
		if( newPage > gameState.journalStateMax ) {
			gameState.journalStateMax = newPage;
			localStorage.setItem( "maxPage", gameState.journalStateMax );
		}
		gameState.progressLocked = journal[gameState.journalState].locked || false;

		notebookPanel.innerHTML = journal[gameState.journalState].HTML;
		var pageNum = notebookPanel.querySelector(`[id="pageNum"]`);
		if( pageNum ) {
	                pageNum.textContent = '' + (gameState.journalState + 1);
	        }
	        if( journal[gameState.journalState].activate )
	                journal[gameState.journalState].activate();
		
	}


	function setupNeuronTable( table ) {
		var itemMap = new WeakMap();
		var lastSelect = null;
	        var statuses = {
	                table : table,
	                clear() {
	                        var row;
	                        while( row = this.table.querySelector( "tr:nth-of-type(2)" ) )
	                        {
	                                row.remove();
	                                //this.table.removeChild(this.table.firstChild);
	                        }
	                },
			select( n ) {
				var rows = itemMap.get(n);
				if( rows ) {
					lastSelect && lastSelect.forEach(row=>row.className = "" );
					rows.forEach(row=>row.className = "selected" );
					lastSelect = rows;
				}
				brainBoard.select( n );
			},
	                addNeuron( p, n ) {
	                        var newRow = this.table.insertRow();
	                        var newRow2 = this.table.insertRow();
	                        neuron$$1( newRow, newRow2, n, p );
				itemMap.set( n, [newRow,newRow2] );
	                },
	                addSynapse( p, n ) {
	                        var newRow = this.table.insertRow();
	                        var newRow2 = this.table.insertRow();
	                        synapse( newRow, newRow2, n, p );
				itemMap.set( n, [newRow,newRow2] );
	                }
	        };
	        statuses.clear();
	        return statuses;

	        function neuron$$1( row, row2, n, p ) {
			const thisNeuron = n;
			row.addEventListener( "click", ()=>{
				statuses.select( thisNeuron );			
				brainBoard.select( thisNeuron );
			} );
			row2.addEventListener( "click", ()=>{
				statuses.select( thisNeuron );			
				brainBoard.select( thisNeuron );
			} );
	                var underName = row2.insertCell();
	                var data1 = row.insertCell();
	                data1.innerText = p.name +":"+n.type;
	                var utilCell = row2.insertCell();
	                utilCell.colSpan=2;
	                var utilSlider = document.createElement( "input" );
	                utilSlider.type = "range";
	                utilSlider.min = -100;
	                utilSlider.max = 100;
	                utilSlider.value = n.threshold * 100;
	                utilCell.appendChild( utilSlider );
	                utilSlider.addEventListener( "input", ()=>{
	                        n.threshold = utilSlider.value/100;
	                });

			var algoSelect = document.createElement( "select" );
			var opt;

			algoSelect.add( opt = document.createElement( "option" ) );
			opt.text = "digital";
			opt.value = Neuron.algo.digital;
			algoSelect.appendChild( opt );

			algoSelect.add( opt = document.createElement( "option" ) );
			opt.text = "analog";
			opt.value = Neuron.algo.analog;
			algoSelect.appendChild( opt );

			algoSelect.add( opt = document.createElement( "option" ) );
			opt.text = "sigmoid";
			opt.value = Neuron.algo.sigmoid;
			algoSelect.appendChild( opt );

			algoSelect.addEventListener( "change", (evt)=>{	
				var op = evt.target.options[evt.target.selectedIndex];
				console.log( "Right?", op );
				thisNeuron.algorithm = +op.value;
			} );
			underName.appendChild( algoSelect );

	                var data2 = row.insertCell();
	                data2.innerText = "123";
	                data2.align = "right";
	                data2.width = "25%";
	                var data3 = row.insertCell();
	                data3.innerText = "bbb";
	                data3.align = "right";
	                data3.width = "25%";
	                var thisN = n;
	                function neuronUpdateTick() {
	                        data2.innerText = thisN.threshold;
	                        var val = thisN.value;
	                        if( val !== undefined ) val = val.toFixed(3);
	                        else val = "???";
	                        //val = val - (val % 0.001)
	                        data3.innerText = val;
	                        setTimeout( neuronUpdateTick, 250 );
	                }
	                neuronUpdateTick();
	        }

	        function synapse( row, row2, n ) {
			const thisSynapse = n;
			row.addEventListener( "click", ()=>{
				statuses.select( thisSynapse );
				brainBoard.select( thisSynapse );
			} );
			row2.addEventListener( "click", ()=>{
				statuses.select( thisSynapse );
				brainBoard.select( thisSynapse );
			} );
	                var underName = row2.insertCell();
	                var data1 = row.insertCell();
	                data1.innerText = "synapse";
	                var utilCell = row2.insertCell();
	                utilCell.colSpan=2;
	                var utilSlider = document.createElement( "input" );
	                utilSlider.type = "range";
	                utilSlider.min = -100;
	                utilSlider.max = 100;
	                utilSlider.value = n.gain * 100;
	                utilCell.appendChild( utilSlider );
	                utilSlider.addEventListener( "input", ()=>{
	                        n.gain = utilSlider.value/100;
	                });

	                var data2 = row.insertCell();
	                data2.innerText = "123";
	                data2.align = "right";
	                data2.width = "25%";
	                var data3 = row.insertCell();
	                data3.innerText = "bbb";
	                data3.align = "right";
	                data3.width = "25%";
	                var thisN = n;
	                function neuronUpdateTick() {
	                        data2.innerText = thisN.gain;
	                        var val = thisN.value.toFixed(3);
	                        //val = val - (val % 0.001)
	                        data3.innerText = val;
	                        setTimeout( neuronUpdateTick, 250 );
	                }
	                neuronUpdateTick();
	        }

	}

}());
