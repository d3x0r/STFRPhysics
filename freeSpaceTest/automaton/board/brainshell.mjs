


const  MNU_ZOOM       = 1020 // 0, 1, 2 used...

let popup_x = 0;
let popup_y = 0;

import {Neuron,Exporter,External} from "../brain/neuron.mjs"
import peices from "./brain.peices.mjs";
import {DirDeltaMap,DefaultMethods,DefaultViaMethods}  from "./peice.mjs";
import { Board } from "./board.mjs";
import * as shapes from "./shapes.mjs";

import {popups} from "../../popups/popups.mjs"

//typedef class local_tag BRAINBOARD;

function outputInput( ) {
	
	return {
		flags : {
			 bOutput : 0 // else is an input...
		},
		brainboard : null,
		//PBRAIN_STEM pbs;
		brain : null, 
		conn : null, 
		neuron : null,  // this is what we really need... this particular peice's neural peice 
	};
	//typedef struct output_input_type OUTPUT_INPUT;
}


//static class BRAINBOARD *l;

export class BrainBoard {
	constructor ( _brain, container ) {
		if( !(this instanceof BrainBoard) ) return new BrainBoard( _brain, container );

		this.flags = {
			bOwnBrain : false // allocated its own brain...
		} ;


		var create_input_type,create_output_type;

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
		this.board = new Board( container );

			this.peices = new Map();
			this.peiceNames = new WeakMap();

			this.peiceTypes = [];

			this.peiceTypes.push( this.background_methods = new BackgroundMethods(this) );
			this.peiceTypes.push( this.neuron_methods     = new NEURON_METHODS(this) );
			this.peiceTypes.push( this.tick_oscillator_methods = new TICK_OSCILLATOR_METHODS(this) );
			this.peiceTypes.push( this.oscillator_methods = new OSCILLATOR_METHODS(this) );
			this.peiceTypes.push( this.input_methods      = new INPUT_METHODS(this) );
			this.peiceTypes.push( this.button_input_methods = new BUTTON_INPUT_METHODS(this) );
			this.peiceTypes.push( this.slider_input_methods = new SLIDER_INPUT_METHODS(this) );
			this.peiceTypes.push( this.brain_stem_input = new BrainStemInput(this) );
			this.peiceTypes.push( this.brain_stem_output = new BrainStemOutput(this) );
			this.peiceTypes.push( this.light_output_methods = new LIGHT_OUTPUT_METHODS(this) );
			this.peiceTypes.push( this.output_methods     = new OUTPUT_METHODS(this) );
			this.peiceTypes.push( this.nerve_methods      = new NERVE_METHODS(this) );

		for( let pt of this.peiceTypes ) {
				this.peices.set( pt.constructor.name, pt );
				this.peiceNames.set( pt, pt.constructor.name );
			}

			this.brain = _brain;
			Init( this );

		//---------------------------------------------------
		this.reset = function(){
			//	Init(this) 
			this.board.SetBackground( this.BackgroundPeice );
			this.board.reset();
			this.scale = 0;
		}
		
		this.scale = 0;
			
		function Init( brainshell )
		{
			//brainboard = this;
			//InitCommonControls();
				
			
			brainshell.lightOutputPeice = brainshell.board.CreatePeice( "light", shapes.makeLightOutput()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.light_output_methods );

			brainshell.buttonInputPeice = brainshell.board.CreatePeice( "button", shapes.makeButtonInput()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.button_input_methods );

			brainshell.sliderInputPeice = brainshell.board.CreatePeice( "slider", shapes.makeSliderInput()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.slider_input_methods );

			brainshell.OscillatorPeice = brainshell.board.CreatePeice( "oscil", shapes.makeNeuron()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.oscillator_methods );

			brainshell.TickOscillatorPeice = brainshell.board.CreatePeice( "tickosc", shapes.makeNeuron()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.tick_oscillator_methods );

			brainshell.NeuronPeice = brainshell.board.CreatePeice( "neuron", shapes.makeNeuron()
				, peices.neuron.cells.width,  peices.neuron.cells.height
				, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
				, brainshell.neuron_methods
							);


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
			brainshell.DefaultNeuron = new brainshell.brain.Neuron();
			brainshell.DefaultSynapse = new brainshell.brain.Synapse();

			
		}       
	//---------------------------------------------------


		function InitMenus( _this )
		{
			var hMenu = _this.hMenu = popups.createMenu();
			const brainboard = _this;

			_this.hMenu.addItem( "Add Neuron", addNeuron );
			function addNeuron() {
				console.log( ("Put neuron peice at %d,%d"), popup_x, popup_y );
				brainboard.board.PutPeice( brainboard.NeuronPeice, popup_x, popup_y    );
				return true;
			}





			_this.hMenu.addItem( "Add Oscillator", ()=>{
				console.log( ("Put osc peice at %d,%d"), popup_x, popup_y );
				brainboard.board.PutPeice( brainboard.OscillatorPeice,popup_x, popup_y );
				return true;

			} );
			_this.hMenu.addItem( "Add Tick Oscillator", ()=>{
				console.log( ("Put tickosc peice at %d,%d"), popup_x, popup_y );
				brainboard.board.PutPeice( brainboard.TickOscillatorPeice, popup_x, popup_y );
				return true;

			} );

			
			_this.hMenuComponents= _this.hMenu.addMenu( "Add &Component" );
			{
				_this.brain.brainStems.forEach( (pbs )=>
				{
					_this.BuildBrainstemMenus( _this.hMenuComponents, pbs, _this.menus, _this.connectors, [] );
				} )
			}
			hMenu.separate(  );
			{
				var hPopup;
				hPopup = hMenu.addMenu( "Zoom" );
				_this.menus.push( hPopup );
			
				//hPopup = (PMENU)GetPopupData( hMenu, 6 );
				hPopup.addItem( ("x1"), ()=>{
					doZoom( MNU_ZOOM+0);
				} );
				hPopup.addItem( ("x2"), ()=>{
					doZoom( MNU_ZOOM+1);
				} );
				hPopup.addItem( ("x4"), ()=>{
					doZoom( MNU_ZOOM+2);
				} );
				function doZoom(result) {
					brainboard.scale =  result - MNU_ZOOM;
					brainboard.board.SetScale( result - MNU_ZOOM );
					//brainboard.board.BoardRefresh();
				}

			}
			hMenu.separate(  );

			//hMenu.addItem(  MF_STRING, MNU_RESET, ("Reset") );
			//hMenu.addItem(  MF_STRING, MNU_RUN, ("RUN") );
			//hMenu.addSeparator(  );

			hMenu.addItem( "Load", ()=>{

					const load = localStorage.getItem( "brain" );
					//'[{from:-1,p:{},path:[],pc:"neuron",r:false,to:-1,x:1,y:3},{from:-1,p:{},path:[],pc:"oscil",r:false,to:-1,x:7,y:2},{from:1,p:{},path:[{BackDir:-1,ForeDir:-1,x:0,y:0},{BackDir:-1,ForeDir:5,x:0,y:0},{BackDir:1,ForeDir:5,x:-1,y:1},{BackDir:1,ForeDir:6,x:-2,y:2},{BackDir:2,ForeDir:6,x:-3,y:2},{BackDir:2,ForeDir:7,x:-4,y:2},{BackDir:3,ForeDir:-1,x:-5,y:1}],pc:"nerve",r:false,to:0,x:7,y:3},{from:-1,p:{},path:[],pc:"neuron",r:false,to:-1,x:5,y:7},{from:-1,p:{},path:[],pc:"oscil",r:false,to:-1,x:2,y:11},{from:4,p:{},path:[{BackDir:-1,ForeDir:2,x:0,y:0},{BackDir:6,ForeDir:1,x:1,y:0},{BackDir:5,ForeDir:0,x:2,y:-1},{BackDir:4,ForeDir:0,x:2,y:-2},{BackDir:4,ForeDir:-1,x:2,y:-3}],pc:"nerve",r:false,to:3,x:3,y:11},{from:-1,p:{},path:[],pc:"neuron",r:false,to:-1,x:7,y:12},{from:4,p:{},path:[{BackDir:-1,ForeDir:2,x:0,y:0},{BackDir:6,ForeDir:2,x:1,y:0},{BackDir:6,ForeDir:2,x:2,y:0},{BackDir:6,ForeDir:-1,x:3,y:0}],pc:"nerve",r:false,to:6,x:3,y:12}]';
				brainboard.load( load );
			} );

			hMenu.addItem( "Save", ()=>{
				const data = brainboard.save();
				localStorage.setItem( "brain", data );
				//console.log( "Save brain:", data );
			} );
			
		}

	}


	save(  ) {
		return this.board.Save();
	}

	load( msg ) {
		return this.board.Load( msg );
	}

        
	select( n ) {
		this.board.select( n );
	}
             
	addEventListener(name,cb) {
		this.board.events[name] = cb;
	}

// BuildBrainstemMenus( parentMenu, brainstem, [], [], "" )
	BuildBrainstemMenus  ( hMenuComponents, pbs, menus, connectors, pathName ) 
	{
		hMenuComponents = hMenuComponents || this.hMenuComponents;
		const This = this;
		var menu;
		//for( pbs = brain.first(); pbs; pbs = brain.next() )
		{
			var connector;
			var module;

			this.comp_menu = hMenuComponents.addMenu( pbs.name);
			
			this.menus.push(this.comp_menu);

			menu = this.comp_menu.addMenu( "inputs" );
			this.menus.push(menu);


			pbs.Inputs.list.forEach((connector) => {
				let c = connectors.find( (c)=>{
					if( c.module===pbs && c.connector===connector )
						return c;
				})
				let item = c;
				if( !c ) {
				
					const inputPeice = this.board.CreatePeice( connector.name, shapes.makePowerOutput()
						, peices.neuron.cells.width,  peices.neuron.cells.height
						, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
						, this.brain_stem_input
					);
					item = {
						module:pbs,
						connector:connector,
						peice:inputPeice,
					}
					const path = pathName.concat( [ pbs.name, "Input", connector.name ] );
					this.peices.set( path.join('/'), inputPeice );
					this.peiceNames.set( inputPeice, path.join('/') );
					connectors.push(item);
				}
				//connectors.push(connector);
				f( item )
				function f(item) {
					menu.addItem( connector.name, ()=>{
						// add_input_start
						This.board.PutPeice( item.peice, popup_x, popup_y, item );								
					});
				}
			});
			menu = this.comp_menu.addMenu( "outputs")
			//comp_menu.addItem(MF_STRING | MF_POPUP, menu = popups.CreatePopup(), ("outputs"));
			this.menus.push(menu);

			pbs.Outputs.list.forEach((connector) => {
				let c = connectors.find( (c)=>{
					if( c.module===pbs && c.connector===connector )
						return c;
				})
				let item = c;
				if( !c ) {
					const inputPeice = this.board.CreatePeice( connector.name
						, shapes.makePowerOutput()
						, peices.neuron.cells.width,  peices.neuron.cells.height
						, ((peices.neuron.cells.width-1)/2)|0, ((peices.neuron.cells.height-1)/2)|0
						, this.brain_stem_output
					);
					item = {
						module:pbs,
						connector:connector,
						peice:inputPeice,
					}

					const path = pathName.concat( [ pbs.name, "Output", connector.name ] );
					this.peices.set( path.join('/'), item.peice );
					this.peiceNames.set( item.peice, path.join('/') );
		
					connectors.push(item);
				}

				f( item )
				function f(item) {
					menu.addItem( item.connector.name, ()=>{
						// add_input_start
						var newN = This.board.PutPeice( item.peice,popup_x, popup_y, item );
						
					});
				}
				// MNU_ADD_OUTPUT_START + (connectors.length - 1),
			})
		}
		menu = this.comp_menu.addItem( "module" );

		this.menus.push(menu);

		for (module = pbs.first_module(); module; module = pbs.next_module()) {
			this.BuildBrainstemMenus(menu, module, menus, connectors, pathName.concat( [pbs.name, "Modules", module.name ] ));
		}
	}



	RebuildComponentPopups (  )
	{
		{
			var n = 0;
			var idx;
			var pbs;
			this.hMenuComponents.reset();
			this.brain.brainStems.forEach( ( pbs )=>
			{
				this.BuildBrainstemMenus( this.hMenuComponents, pbs, this.menus, this.connectors, [] );
			})
		}
	}

}

//---------------------------------------------------

class NERVE_METHODS extends DefaultViaMethods {
	constructor(newbrainboard) {
		super()

		//this.methods = 
		this.brainboard = newbrainboard;
		this.synapse = null
	};

	Create( psvExtra )
	{
		return this.brainboard.brain.dupSynapse( this.brainboard.DefaultSynapse );
	}
	Destroy(  psv )
	{
		this.brainboard.brain.ReleaseSynapse( psv );
	}
	Disconnect(  psv )
	{
		this.brainboard.brain.UnLinkSynapseTo( psv );
		return true;
	}
	OnRightClick(  psv,  x,  y )
	{
		console.log( "Show Synapse in Statuses" );
		//ShowSynapseDialog( (PSYNAPSE)psv );
		return 1;
	}

	DrawCell(  peice, psvInstance,  surface,  from, x,  y )
	{
		//console.log( ("---------- DRAW NEURON ------------") );

		var synapse = psvInstance;

		//var from = this.master.getcell( cellx, celly );
		if( "range" in this.master.image ) {
			if( synapse.gain >= 0 ) {
				const v = synapse.value;
				const entry = Math.floor( (this.master.image.range.length-1) * (1+v)/2 );
				surface.drawImage( this.master.image.range[entry], from.coords.x, from.coords.y, from.size.width, from.size.height
					, x, y
					, this.brainboard.board.cellSize.width
					, this.brainboard.board.cellSize.height  
				)
			}else{
				const v = synapse.value;
				const entry = Math.floor( (this.master.image.range.length-1) * (1+v)/2 );
				surface.drawImage( this.master.image.range[entry], from.coords.x, from.coords.y, from.size.width, from.size.height
					, x, y
					, this.brainboard.board.cellSize.width
					, this.brainboard.board.cellSize.height  
				)
			}

		} else {
			if( synapse.gain >= 0 )

			surface.drawImage( this.master.image.on, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			)
			else
			surface.drawImage( this.master.image.off, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			)
		}
	//	BlotImageAlpha( surface

	}
}

//---------------------------------------------------

class  INPUT_METHODS extends DefaultMethods {
	constructor(newbrainboard)
	{
		super();
		this.brainboard = newbrainboard;
		this.level_colors = [];
	}


	Create(  psvExtra )
	{
		//brainboard.create_input_type = (POUTPUT_INPUT)psvExtra;
		//brainboard.create_input_type.flags.bOutput = 0;
		console.log( ("Creating a new input (peice instance)") );
		//this.brainboard.brain.GetInputNeuron( ((POUTPUT_INPUT)psvExtra).pbs, ((POUTPUT_INPUT)psvExtra).conn
		return psvExtra; // still not the real create...  but this is psviNstance...
	}
	SetColors(  c1,  c2,  c3 )
	{
		this.level_colors[0] = c1;
		this.level_colors[1] = c2;
		this.level_colors[2] = c3;
	}
	Draw(  psvInstance,  image,  cell,  x,  y )
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
	}
	ConnectEnd(  psv_to_instance,  x,  y
										,  peice_from,  psv_from_instance )
	{
		return false;
	}
	ConnectBegin(  psv_to_instance,  x,  y
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
	}
	OnRightClick(  psv,  x,  y )
	{
		//ShowInputDialog( (PNEURON)psv );
		return 1;
	}

	OnClick(  psv,  x, y )
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
			if( !brainboard.board.BeginPath( brainboard.NervePeice ) )
			{
				// attempt to grab existing path...
				// current position, and current layer
				// will already be known by the grab path method
				//brainboard.board.GrabPath();
			}
		}
		// so far there's nothing on this cell to do....
		return false;
	}

}

class OUTPUT_METHODS extends DefaultMethods {
	constructor( newbrainboard )
	{
            super( newbrainboard );

		this.level_colors = [ ];
	}

	Create(  psvExtra )
	{
		console.log( "Creating a new output (peice instance)" );

		var poi = psvExtra;

		poi.neuron = this.brainboard.brain.GetOutputNeuron( poi.conn );
		//dupNeuron( brainboard.DefaultNeuron ))

		return psvExtra; // still not the real create...  but this is psviNstance...
	}

	Draw(  psvInstance,  image,  cell,  x,  y )
	{
		var cPrimary;
		var neuron = psvInstance;
		var poi = psvInstance;
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
	}

	SetColors(  c1,  c2,  c3 )
	{
		this.level_colors[0] = c1;
		this.level_colors[1] = c2;
		this.level_colors[2] = c3;
	}
	ConnectEnd(  psv_to_instance,  x,  y
										,  peice_from,  psv_from_instance )
	{
		var n;
		var success = false;
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
	}
	ConnectBegin(  psv_to_instance,  x,  y
									  ,  peice_from,  psv_from_instance )
	{
		return false;
	}
	OnRightClick(  psv,  x,  y )
	{
		//ShowOutputDialog( (PNEURON)psv );
		return 1;
	}
	OnClick(  psv,  x,  y )
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
			if( !this.brainboard.board.BeginPath( this.brainboard.NervePeice ) )
			{
				// attempt to grab existing path...
				// current position, and current layer
				// will already be known by the grab path method
				//brainboard.board.GrabPath();
			}
		}
		// so far there's nothing on this cell to do....
		return false;
	}
}
//---------------------------------------------------
//---------------------------------------------------
//---------------------------------------------------

	
class NEURON_METHODS extends DefaultMethods {
	#instance = null;

	constructor(newbrainboard)
	{
		super()
		// these methods are passed a psvInstance
		// which is the current neuron instance these are to wokr on
		// this valud is retrieved and stored (by other portions) by the create() method
		this.brainboard = newbrainboard;

		this.c_input = []; // 0=min,1=mid,2=max
		this.c_threshold = []; // 0=min,1=mid,2=max
		this.connected = [];

	}


	SetColors( bInput,  c1,  c2,  c3 )
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
	}

	Create (  psvExtra )
	{
		//console.log( "Creating a new neuron (peice instance)");

		return this.#instance = this.brainboard.brain.dupNeuron( this.brainboard.DefaultNeuron );
	}

	Destroy(  psv )
	{
	      this.brainboard.brain.ReleaseNeuron( psv );
	}
	

	DrawCell(  peice, psvInstance,  surface,  from, x,  y )
	{
		//console.log( ("---------- DRAW NEURON ------------") );

		var cPrimary, cSecondary, cTertiary;
			//var base,range,value,input,threshold;
		var neuron = psvInstance;

		//var from = this.master.getcell( cellx, celly );
		if( "range" in this.master.image ) {
			const v = neuron.value;
			const entry = Math.floor( (this.master.image.range.length-1) * (1+v)/2 );
			surface.drawImage( this.master.image.range[entry], from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			)

		} else {
			if( neuron.value )

			surface.drawImage( this.master.image.on, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			)
			else
			surface.drawImage( this.master.image.off, from.coords.x, from.coords.y, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height  
			)
		}
	//	BlotImageAlpha( surface

	}

	Update(  psv,  cycle )
		{
			console.log( "updating color information for a neuron..." );
		}

	ConnectEnd(  psv_to_instance,  x,  y
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
	}

	ConnectBegin(  psv_to_instance,  x,  y
										,  peice_from,  psv_from_instance )
	{
		var n;
		//if( peice_from == brainboard.NerveMethods )
		// maybe...
		var synapse = psv_from_instance;
		var neuron = psv_to_instance;
				if( this.brainboard.board.events["added"] )
					this.brainboard.board.events["added"]( this.brainboard.NervePeice, synapse );
		// validate that peice_from is a nerve_method type
		for( n = 0; n < 8; n++ )
			if( DirDeltaMap[n].x == x && DirDeltaMap[n].y == y )
				break;
		if( n < 8 )
			return this.brainboard.brain.LinkSynapseFrom( synapse, neuron, n );
		return false;
	}
	OnRightClick(  psv,  x,  y )
	{
		console.log( "Show in info panel?");
		//ShowNeuronDialog( psv );
		return 1;
	}

	OnClick(  psv,  x,  y )
	{
		if( this.brainboard.board.events["select"] )
			this.brainboard.board.events["select"]( psv );
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
			if( !this.brainboard.board.BeginPath( this.brainboard.NervePeice ) )
			{
				// attempt to grab existing path...
				// current position, and current layer
				// will already be known by the grab path method
				//brainboard.board.GrabPath();
			}
		}
		// so far there's nothing on this cell to do....
		return false;
	}
}

//---------------------------------------------------

class  LIGHT_OUTPUT_METHODS extends NEURON_METHODS {
	constructor(newbrainboard)
	{
		super(newbrainboard)
	}


	Create(  psvExtra )
	{
		//brainboard.create_input_type = (POUTPUT_INPUT)psvExtra;
		//brainboard.create_input_type.flags.bOutput = 0;
		//console.log( ("Creating a new output (peice instance)") );
		return new this.brainboard.brain.Exporter( this.brainboard.brain, psvExtra );
	}
}
//---------------------------------------------------

class  BUTTON_INPUT_METHODS extends NEURON_METHODS {
	constructor(newbrainboard)
	{
		super( newbrainboard );
	}

	Create(  psvExtra )
	{
		//brainboard.create_input_type = (POUTPUT_INPUT)psvExtra;
		//brainboard.create_input_type.flags.bOutput = 0;
		//console.log( ("Creating a new input (peice instance)") );
		return new this.brainboard.brain.External( this.brainboard.brain, psvExtra );
	}
}
//---------------------------------------------------

class  SLIDER_INPUT_METHODS extends NEURON_METHODS {
	constructor(newbrainboard)
	{
		super( newbrainboard )
	}


	Create(  psvExtra )
	{
		//brainboard.create_input_type = (POUTPUT_INPUT)psvExtra;
		//brainboard.create_input_type.flags.bOutput = 0;
		//console.log( ("Creating a new input (peice instance)") );
		return new this.brainboard.brain.External( this.brainboard.brain, psvExtra );
	}

}

//---------------------------------------------------

class BrainStemInputNeuron extends External {
	#connector = null;
	constructor( brain, connector ) {
		super( brain );
		super.setCb( this.#getValue.bind( this ) );
		this.#connector = connector;
	}
	#getValue() {
		if( this.#connector )
			return this.#connector.connector.ref.value * this.#connector.connector.scalar;
		return 0;
	}
	setConnector(c) {
		this.#connector = c;
	}
}

class  BrainStemInput extends NEURON_METHODS {
	constructor (newbrainboard) {
		super( newbrainboard );
	}

	Create ( connector ) {
		return { o : new BrainStemInputNeuron( this.brainboard.brain, connector ),
			connector:connector }
	}

	setMsg( io, data ) {
		super.setMsg( io.o, data)
		const bs = this.brainboard.brain.brainStems.find( (m)=>{
			if( m.name === data.bs )
				return true;
			return false;
		});
		if( bs ) {
			const input = bs.Inputs.list.find( (o)=>{
				if( o.name === data.c )
					return true;
				return false;
			})
			if( input ) {
				io.connector = {
					connector: input,
					module: bs,
					peice: this.master
				}
				io.o.setConnector( io.connector );
				//psv.connector.ref = out;
				return io;
			}
		}

	}	
    getMsg( io ) {
		return Object.assign( super.getMsg(io.o)
			, { bs:io.connector.module.name, c:io.connector.connector.name } );
    }
	ConnectEnd (  psv_to_instance,  x,  y,  peice_from,  psv_from_instance ){
			return false;
	}
	ConnectBegin(  psv_to_instance,  x,  y
		,  peice_from,  psv_from_instance ){
		return super.ConnectBegin( psv_to_instance.o, x, y, peice_from, psv_from_instance );
	}
}

//---------------------------------------------------

//---------------------------------------------------

class BrainStemOutputNeuron extends Exporter {
	#connector = null;
	constructor( brain, connector ) {
		super( brain );
		super.setCb( this.#setValue.bind( this ) );
		this.#connector = connector;
	}
	#setValue(value) {
		if( this.#connector )
			return this.#connector.connector.ref.value = value * this.#connector.connector.scalar;
		return 0;
	}
	setConnector(c) {
		this.#connector = c;
	}
}

class   BrainStemOutput extends NEURON_METHODS {

	constructor (newbrainboard) {
		super( newbrainboard );
	}

	Create( connector ) {
		return { o : new BrainStemOutputNeuron( this.brainboard.brain, connector ),
				 connector:connector }
	}
	setMsg( psv, arg ) {
		super.setMsg( psv.o, arg );
		const bs = this.brainboard.brain.brainStems.find( (m)=>{
			if( m.name === arg.bs )
				return true;
			return false;
		});
		if( bs ) {
			const out = bs.Outputs.list.find( (o)=>{
				if( o.name === arg.c )
					return true;
				return false;
			})
			if( out ) {
				psv.connector = {
					connector: out,
					module: bs,
					peice: this.master
				}
				psv.o.setConnector( psv.connector );
				//psv.connector.ref = out;
				return psv;
			}
		}
		console.log( "Export connector is not connected...");
	}
	getMsg( io ) {

		return Object.assign( super.getMsg(io.o)
			, { bs:io.connector.module.name, c:io.connector.connector.name } );
		//return io
	}
	ConnectEnd(  psv_to_instance,  x,  y
		,  peice_from,  psv_from_instance ){
		return super.ConnectEnd( psv_to_instance.o, x, y, peice_from, psv_from_instance );
	}
	ConnectBegin(  psv_to_instance,  x,  y
		,  peice_from,  psv_from_instance ){
		return false;
	}
}


//---------------------------------------------------

class BackgroundMethods extends DefaultMethods {
	constructor ( _brainboard ) {
		super( _brainboard );
	}

	Create() {
			return true;
	}

	Destroy() {
		
	}

	Connect  (  psvTo
				  , rowto,  colto
				  ,  psvFrom
				  ,  rowfrom,  colfrom )
	{
		return 0;
	}

	Update(  psv,  cycle )
	{
	      console.log( ("Update background - nothing to do.") );
		//parent.Update(psv,cycle);
	}

	OnClick(  psv,  x,  y )
	{
		this.brainboard.board.LockDrag();
		return true;
	}

	OnRightClick(  psv,  x,  y )
	{
		const brainboard = this.brainboard;
		this.brainboard.RebuildComponentPopups(this);
		popup_x = x;
		popup_y = y;

		this.brainboard.hMenu.show( this.brainboard.board.mousePosScrn.x, this.brainboard.board.mousePosScrn.y, ()=>{
			console.log( "Menu done?" )
		} );
		return true;
	}
	OnDoubleClick(  psv,  x,  y )
	{
		 result = TrackPopup( brainboard.hMenu, null );
		return true;
	}
}

//--------------------------- Oscillator Methods ------------------------------

class  OSCILLATOR_METHODS extends NEURON_METHODS {
	constructor(newbrainboard)
	{
		super( newbrainboard );
	}

	Create(  psvExtra )
	{
		console.log( "Creating a new oscillatorNeuron (peice instance)");
		return this.brainboard.brain.Oscillator( );
	}
}
	
//--------------------------- Tick Oscillator Methods ------------------------------

class TICK_OSCILLATOR_METHODS extends NEURON_METHODS{
	constructor(newbrainboard )
	{
		super( newbrainboard );
	}

	Create(  psvExtra )
	{
		console.log( "Creating a new tick Oscillator (peice instance)");
		return new this.brainboard.brain.TickOscillator( this.brainboard.brain, 1000 );
	}
}
	

