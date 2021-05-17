

const	 NOWHERE = -1;
const	 UP =0;
const	 UP_RIGHT =1;
const	 RIGHT =2;
const	 DOWN_RIGHT= 3;
const	 DOWN =4
const	 DOWN_LEFT =5
const	 LEFT =6
const	 UP_LEFT =7


export const direction = {
	 NOWHERE : NOWHERE,
	 UP :UP,
	 UP_RIGHT :UP_RIGHT,
	 RIGHT :RIGHT,
	 DOWN_RIGHT: DOWN_RIGHT,
	 DOWN :DOWN,
	 DOWN_LEFT :DOWN_LEFT,
	 LEFT :LEFT,
	 UP_LEFT :UP_LEFT,
}

Object.freeze( direction );


export const DirDeltaMap = [ { x: 0, y:-1 },
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



function Cell(p,c,r) {
	// peice - full peice definition, has
	// one method - getcell.
	// the col, row expressed here is the specific
	// portion of the peice.
	return {
		peice:p,
		col:c,
		row:r,		
	}
}



export function createPeice(  board,  name //= "A Peice"
							 ,  image //= null
							 ,  rows //= 1
							 ,  cols //= 1
							 ,  hotspot_x
							 ,  hotspot_y
							 ,  methods //= null
							 ,  psv
							 ) 
{
	var peice = new Peice( board, name, image, rows, cols, hotspot_x, hotspot_y, true, false, methods, psv );
	return peice; // should be able to auto cast this...
}



//--------------------------- Peice class -----------------------------------------------
//class PEICE:public IPEICE, private PEICE_DATA
export function Peice( board
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
	var scale = 0, x, y;
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

Peice.prototype.setMsg = function( psvInstance, msg ) {
	return this.methods.setMsg( psvInstance, msg );
}

Peice.prototype.getMsg = function( psvInstance ) {
	return this.methods.getMsg( psvInstance );
}

Peice.prototype.getimage = function(  )
{
	return this.image;
}

Peice.prototype.getcell = function( x, y )
{
	this.lastCell.coords = this.grid[x%this.size.cols][y%this.size.rows];
	return this.lastCell;
}

Peice.prototype.getCellSize = function(  )
{
	return this.cellSize;
}


Peice.prototype.getsize = function(  )
{
	return this.size;
}
Peice.prototype.gethotspot = function(  )
{
	return this.hot;
}


//typedef class VIA *PVIA;
//class VIA:public IVIA, public VIA_DATA
export function Via(board
  , name
  , image //= null
  , imageNeg
  , methods //= null
  , psv //= 0
) 
{
	Peice.call( this, board, name, {on:image,off:imageNeg}, 7, 7, 0, 0, false, true, methods, psv );
};

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
}

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
}
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
}

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
}



// plus additional private methods relating to vias....
Via.prototype.Move=function(  ) { return 0; }
Via.prototype.Stop=function(  ) { return 0; }




//--------------------------- Default Methods ------------------------------------------

export class DefaultMethods {
    master = null;

	constructor (_brainboard) {
		this.brainboard = _brainboard;
	}
	
	Move() {
		return false;
	}

	Stop() {
		return false;
	}


	get name() { return "default methods"; }
	SetPeice(  peice )        { this.master = peice; }
	getimage()                { return this.master.getimage(); };
	getcell(  x,  y )         { return this.master.getcell(x,y); };
	getimage( scale)          { return this.master.getimage(scale); };
	getcell(  x,  y,  scale ) { return this.master.getcell(x,y,scale); };
	gethotspot(  )            { return this.master.gethotspot(); };
	getsize(  )               { return this.master.getsize(); };

	//class DEFAULT_METHODS:public PEICE_METHODS {
	Create( psvExtra )
		{
			return 0;
		}
	Disconnect(  psv1 /*, PIPEICE peice, uintptr_t psv2*/ )
		{
	      return 0;
		}
	Destroy( psv )
		{
		}

	Update(  psv,  cycle )
		{
			return; // do nothing to update...
			// consider on failure
			// Destroy( psv );
		}
	OnMove(  psv ) {
	}
	ConnectBegin (  psv_to_instance,  x,  y
												  , peice_from,  psv_from_instance )
		{
	      return false;
		}
        ConnectEnd (  psv_to_instance,  x,  y
												  ,  peice_from,  psv_from_instance )
		{
	      return false;
        	}
	OnClick(  psv,  x,  y )
        	{
			return false;
		}
	OnRightClick(  psv,  x,  y )
		{
        		return false;
		}
	OnDoubleClick(  psv,  x,  y )
		{
			return false;
		}
	   /*
		void Draw( uintptr_t psvInstance, Image surface, int x, int y, int cellx, int celly )
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
	Draw(  peice, psvInstance,  surface,   x,  y )
	{
		// first 0 is current scale.
		//lprintf( WIDE("Drawing peice instance %p"), psvInstance );
        	//lprintf( WIDE("Drawing %d by %d"), rows, cols );

	   surface.drawImage( peice.image, x, y, this.master.size.cols * this.brainboard.board.cellSize.width, this.master.size.rows * this.brainboard.board.cellSize.height )
	//	BlotImageAlpha( surface
						  //, peice
						  //, x, y
						  //, 1 );
	}
	DrawCell( peice, psvInstance,  surface,  from, x,  y )
	{
		if( "on" in this.master.image )
			surface.drawImage( this.master.image.on
				, from.coords.x, from.coords.y
				, from.size.width, from.size.height
				, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height
			)
		 else
        		surface.drawImage( this.master.image, from.coords.x, from.coords.y, from.size.width, from.size.height
        			, x, y
				, this.brainboard.board.cellSize.width
				, this.brainboard.board.cellSize.height
			)
		//	BlotImageAlpha( surface
						  //, peice
						  //, x, y
						  //, 1 );
	}

	setMsg( psvInstance, opts ) {
		psvInstance.setMsg( opts );
	}
	getMsg(psvInstance ) {
		return psvInstance.getMsg() ;
	}

}
//-------------------- DEFAULT VIA METHODS (a few more than PEICE_METHODS ) ----------------------------

export class DefaultViaMethods extends DefaultMethods {
	constructor() {
		super( )
	}


	Move( )
	{
	      return 0;
	}
	Stop( )
	{
	      return 0;
	}

//-------------------- VIA METHODS ----------------------------------


	OnClick(  psv,  x,  y )
	{
		console.log( "GENERATE DISCONNECT!" );
		this.master.board.UnendPath( );
		return 0;
	}

	OnRightClick(  psv,  x,  y )
	{
		return 0;
	}
	OnDoubleClick(  psv,  x,  y )
	{
		return 0;
	}

}
