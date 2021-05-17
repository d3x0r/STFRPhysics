
import {LINK_VIA_START,LINK_VIA_END,Layer,LayerPool, layerPathNode} from "./layer.mjs";
import {JSOX} from "../../jsox/lib/jsox.mjs "

import * as peices from "./peice.mjs";

const MK_LBUTTON = 1;
const MK_RBUTTON = 2;
const MK_MBUTTON = 4;

// should be 8 pixels on each and every side
// these will be the default color (black?)
const SCREEN_PAD = 8;


export function Board( parent ) {
	if( !(this instanceof Board)) return new Board(parent );

	var canvas = this.canvas = document.createElement( "canvas" );
	canvas.width = 1024;
	canvas.height = 1024;
	//canvas.style.width = "100%";
	//canvas.style.height = "100%";
	this.ctx = canvas.getContext( "2d" );
	this.events = {};

	parent.appendChild( canvas );
	var board = this;
	var _buttons = 0;
	function mouseMove( evt ) {
		evt.preventDefault();
		evt.stopPropagation();
		var pRect = canvas.getBoundingClientRect();
		board.mousePosScrn.x = evt.clientX;
		board.mousePosScrn.y = evt.clientY;
		board.mousePos.x = evt.clientX - pRect.left;
		board.mousePos.y = evt.clientY - pRect.top;
		
		board.DoMouse( board.mousePos.x * canvas.width/pRect.width, board.mousePos.y* canvas.height/pRect.height, _buttons );
	}
	function mouseUp( evt ) {
		evt.preventDefault();
		evt.stopPropagation();
		_buttons = evt.buttons;
		var pRect = canvas.getBoundingClientRect();
		board.mousePosScrn.x = evt.clientX;
		board.mousePosScrn.y = evt.clientY;
		board.mousePos.x = evt.clientX - pRect.left;
		board.mousePos.y = evt.clientY - pRect.top;
		
		board.DoMouse( board.mousePos.x * canvas.width/pRect.width, board.mousePos.y* canvas.height/pRect.height, _buttons );
	}
	function mouseDown( evt ) {
		evt.preventDefault();
		evt.stopPropagation();
		_buttons = evt.buttons;
		var pRect = canvas.getBoundingClientRect();
		board.mousePosScrn.x = evt.clientX;
		board.mousePosScrn.y = evt.clientY;
		board.mousePos.x = evt.clientX - pRect.left;
		board.mousePos.y = evt.clientY - pRect.top;
		
		board.DoMouse( board.mousePos.x * canvas.width/pRect.width, board.mousePos.y* canvas.height/pRect.height, _buttons );
	}

	canvas.addEventListener( "mousemove", mouseMove );
	canvas.addEventListener( "mouseup", mouseUp );
	canvas.addEventListener( "mousedown", mouseDown );
	//canvas.oncontextmenu = (event)=>{ event.preventDefault();return false};
	parent.addEventListener( "contextmenu", (event)=>{ 
		event.preventDefault()
		return false;
	}, false );
	document.body.addEventListener( "contextmenu", (event)=>{ 
		event.preventDefault()
		return false;
	}, false );
	canvas.addEventListener( "contextmenu", (event)=>{ 
			event.preventDefault()
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
	this.mousePosScrn = { x:0, y:0 }; // physical mouse position on the canvas(broser)

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
}

Board.prototype.GetCellSize = function(  )  {
	return this.cellSize;
}

Board.prototype.SetScale = function( _scale ) {
	if( _scale < 0 || _scale > 2 )
		return;
	this.cellSize.width = this._cell_width >> _scale;
	this.cellSize.height = this._cell_height >> _scale;
	this.scale = _scale;
}
Board.prototype.SetCellSize = function( cx,  cy )
{
	this.cellSize.width = this._cell_width = cx;
	this.cellSize.height = this._cell_height = cy;
}
	
Board.prototype.DrawLayer = function( layer )
{
	if( this.selected == layer.psvInstance ) {
		this.ctx.fillStyle = "#20c01040";
	}
	layer.Draw( this, this.ctx
		, SCREEN_PAD + ( this.board_origin_x + (layer.x) ) * this.cellSize.width
		, SCREEN_PAD + ( this.board_origin_y + (layer.y) ) * this.cellSize.height
		);
}
Board.prototype.reset = function( )
{
	this.board_origin_x = 0;
	this.board_origin_y = 0;
	

	this.layerPool = LayerPool();
}


Board.prototype.GetScale = function(  )
{
	return this.scale;
}

Board.prototype.SetBackground = function( peice )
{
	this.default_peice = peice;
	this.default_peice_instance = this.default_peice.methods.Create(peice.psvCreate);
	this.rootLayer = new Layer( this, this.default_peice );
	peice.image.addEventListener( "load", ()=>{
		this.BoardRefresh();
	});
}

Board.prototype.BeginPath = function( viaset, x, y, atLayer )
{
	atLayer = atLayer || this.mouse_current_layer;
	x = ("undefined" === typeof x ) ? this.wX : x;
	y = ("undefined" === typeof y ) ? this.wY : y;
	if( atLayer )
	{
		var pl = new Layer( this, viaset );
		pl.flags.bRoute = true;
		var connect_okay = atLayer
			.peice
			.methods
			.ConnectBegin( atLayer.psvInstance
						, (x - atLayer.x)
						, (y - atLayer.y)
						, viaset
						, pl.psvInstance );
		if( !connect_okay )
		{
			return false;
		}
		atLayer.Link( pl, LINK_VIA_START
										, (x - atLayer.x)
										, (y - atLayer.y) );
		this.route_current_layer = pl;
		// set the via layer type, and direction, and stuff..
		pl.BeginPath( x, y );

		pl.link_top(this.rootLayer);
		return pl;
	}
	return null;
}

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
	};

	return null;
}

Board.prototype.GetLayerDataAt = function( wX, wY,  notlayer /*= null*/ )
{
	var layer = this.GetLayerAt( wX, wY, notlayer );
	if( layer )
		return layer;
	return null;
}


// viaset is implied by route_current_layer
Board.prototype.EndPath = function(  force, x,  y, layer, toLayer )
{
	// really this is lay path also...
	// however, this pays attention to mouse states
	// and data and layers and connections and junk like that
	// at this point I should have
	//   mouse flags.bRight, bLeft
	//   route_current_layer AND mouse_current_layer
	//
	layer = layer || this.route_current_layer;
	var pld;
	x = ("undefined" === typeof x)?this.wX:x;
	y = ("undefined" === typeof y)?this.wY:y;
	// first layer should result and be me... check it.
	let foundLayer = null;
	toLayer = ( toLayer || ( foundLayer = this.GetLayerAt( x, y, this.route_current_layer ) )?.layer );
	if( toLayer )
	{
		pld = toLayer;
		var connect_okay = pld.peice.methods.ConnectEnd( pld.psvInstance
			, (x - toLayer.x)
			, (y - toLayer.y)
			, layer.peice
			, layer.psvInstance );
		if( connect_okay )
		{
			//DebugBreak();
			console.log( ("Heh guess we should do something when connect succeeds?") );
			// keep route_current_layer;
			toLayer.Link( layer, LINK_VIA_END, (x - toLayer.x), (y - toLayer.y) );
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

			if( this.events["removed"] )
				this.events["removed"]( this.route_current_layer.peice, this.route_current_layer.psvInstance );

			this.route_current_layer = null;
			this.BoardRefresh();
			//DebugBreak();
			//delete route_current_layer;
			//this.route_current_layer = null;
			return false;
		}
	}
	else
	{
		// right click anywhere to end this thing...
		if( force )
		{
			//DebugBreak();
			// also have to delete this layer.
			this.route_current_layer.Unlink();
			this.route_current_layer.isolate();

			var disconnect_okay = this.route_current_layer
					.peice
					.methods
					.Disconnect( this.route_current_layer.psvInstance );
			if( this.events["removed"] )
				this.events["removed"]( this.route_current_layer.peice, this.route_current_layer.psvInstance );

				this.route_current_layer = null;
			//delete this.route_current_layer;
			console.log( "route current layer goes to null...");
			this.route_current_layer = null;
			this.BoardRefresh();
			return false;
		}
	}
	return this.LayPathTo( this.wX, this.wY );
}

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
}



Board.prototype.AddLayer = function(  peice, x, y )
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
	//peice.psvCreate = psv; // kinda the wrong place for this but we abused this once upon a time.
	
	var pl = new Layer( this, peice, x, y, size.cols, size.rows, hot.x, hot.y );
	// should be portioned...
	pl.link_top(this.rootLayer);
	
	this.BoardRefresh();
	return pl;
}

Board.prototype.PutPeice = function(  peice, x, y )
{
	const layer = this.AddLayer( peice, x, y );
	return layer.psvInstance;
}


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
}

Board.prototype.Save = function() {

	if( this.rootLayer )
	{
		const layerInfo = [];
		const layers = [];
		var layer = this.rootLayer;
                // this check also skips the root layer itself.
		while( layer && (layer = layer.prior) )
		{
			const layerMsg = {
				x: layer.x,
				y: layer.y,
				path : [],
				from : layers.findIndex( (l)=>( l === layer.route_start_layer.layer ) ),
				to : layers.findIndex( (l)=>( l === layer.route_end_layer.layer ) ),
				r : layer.flags.bRoot,
				p : layer.peice.getMsg( layer.psvInstance ),
				pc : layer.peice.name, //this.GetPeice( layer.peice.name )?.name,
			};

			function addNode( n ) {
				layerMsg.path.push( { x: n.x, y:n.y,
					BackDir:n.flags.BackDir,
					ForeDir:n.flags.ForeDir
				} );
			}
		    if( layer.flags.bRoute )
		    	layer.pds_path.forEach( addNode );

			// track layers in parallel with their message
			layers.push( layer );

			layerInfo.push( layerMsg );
		}
		return JSOX.stringify( layerInfo );
	}

}

Board.prototype.Load = function( arg ) {


	const layers = JSOX.parse( arg );
    for( let layer of layers ) {
		const peice = this.GetPeice( layer.pc );

        if( layer.path.length ) {

			//this.mouse_current_layer
			const fromLayer = layers[layer.from].layer;
			const toLayer = layers[layer.to].layer;

			// begin path ends up calling the add row controls... callback
			const viaLayer = this.BeginPath( peice, layer.x, layer.y, fromLayer )
			viaLayer.peice.setMsg( viaLayer.psvInstance, layer.p );

			let p;
            for( p of layer.path ) {
                const node = new layerPathNode( p.x, p.y, p );
				viaLayer.pds_path.push( node );

			}

			this.EndPath( false, layer.x+p.x, layer.y+p.y, viaLayer, toLayer );

		}else {
			layer.layer = this.AddLayer( peice, layer.x, layer.y );
			layer.layer.peice.setMsg( layer.layer.psvInstance, layer.p );
			if( this.events["added"] )
				this.events["added"]( peice, layer.layer.psvInstance );
		}

	}

	this.BoardRefresh();

}


Board.prototype.LayPathTo = function(  wX, wY )
{
	this.route_current_layer.LayPath( wX, wY );
	this.BoardRefresh();//SmudgeCommon( pControl );
	return true;
}

Board.prototype.SCRN_TO_GRID_X = function(x) { return ((x - SCREEN_PAD)/this.cellSize.width - this.board_origin_x ) }
Board.prototype.SCRN_TO_GRID_Y = function(y) { return ((y - SCREEN_PAD)/this.cellSize.height - this.board_origin_y) }
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
					this.BoardRefresh()//SmudgeCommon( pControl );
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
			this.BoardRefresh()//SmudgeCommon( pControl );
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
				this.EndPath( 	( this.route_current_layer &&
					this.flags.bLeftChanged &&
					!this.flags.bLeft ),
		
					this.wX, this.wY );
			}
		}
	}
}


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
}

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
}

Board.prototype.destroy = function()
{
	//if( OnClose )
	//	OnClose( psvClose, this );
	//RemoveTimer( iTimer );
	canvas.remote();
}

Board.prototype.GetSize = function(  )
{
	// result with the current cell size, so we know
	// how much to multiply row/column counters by.
	// X is always passed correctly?
	return { cols: this.board_width, rows: this.board_height };
}

Board.prototype.CreatePeice = function(  name //= ("A Peice")
								,  image //= null
								,  rows //= 1
								,  cols //= 1
								,  hotspot_x
								,  hotspot_y
								,  methods //= null
								,  get
                                       		, set
								)
{
	var peice = peices.Peice( this, name, image, rows, cols, hotspot_x, hotspot_y, true, false, methods );
	this.peices.push( peice );
	return peice; // should be able to auto cast this...
}

Board.prototype.CreateVia = function( name //= ("A Peice")
											,  image //= null
											, imageNeg
											,  methods //= null
											,  psv
											)
{
	var via = new peices.Via( this, name, image, imageNeg, methods, psv );
	this.peices.push( via );
	return via;
}

Board.prototype.forEachPeice = function( cb ) {
	this.peices.forEach( cb );
}

Board.prototype.GetPeice = function( peice_name )
{
	return this.peices.find( (peice)=>peice.name === peice_name );
}

