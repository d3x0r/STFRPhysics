import * as peices from "./peice.mjs";

const DirDeltaMap = peices.DirDeltaMap;

const DEBUG_BACKTRACE = false;

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

export class layerPathNode {
	 x = 0;
	 y = 0;
	 isAbove= null;
	 isBelow= null;
	 flags = layerFlags();

         constructor( x, y, flags ) {
         	if( "number" === typeof x && "number" === typeof y ) {

	             this.x = x;
                     this.y = y;
                     this.flags.BackDir = flags.BackDir;
                     this.flags.ForeDir = flags.ForeDir;
		}

         }

}


function layerData(peice) 
{
};

export const  LINK_VIA_START = 0
export const  LINK_VIA_END = 1


//class LAYER
export function Layer( board, peice,  _x,  _y, _w,  _h,  ofsx,  ofsy,psv )
{
	if(!(this instanceof Layer)) return new Layer(board,peice,_x,_y,_w,_h, ofsx,ofsy);
	this.board = board;
	this.peice = peice||null;
	this.psvInstance = peice?peice.methods.Create( psv ):null;

	function SetPeice( peice, psv )
		{
			this.peice = peice;
			if( peice )
				this.psvInstance = peice.methods.Create( psv );
			else
				this.psvInstance = null;
		}

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
			var newLayerPathNode = new layerPathNode()
			newLayerPathNode.x = this.x + x - this.peice.hot.x;
			newLayerPathNode.y = this.y + y - this.peice.hot.y;
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
			else
			{
				//DebugBreak();
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
		}


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
		}
        
        
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
		}
        
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
					if( i >= 0 ) this.route_end_layer.layer.linked.splice( i, 1 ) 
					//DeleteLink( &route_end_layer.layer.linked, this );
					this.route_end_layer.layer = null;
				}
				else if( this.route_start_layer.layer )
				{
					var i = this.route_start_layer.layer.linked.findIndex( path=>path===this ); 
					if( i >= 0 ) this.route_start_layer.layer.linked.splice( i, 1 ) 
					//DeleteLink( &route_start_layer.layer.linked, this );
					this.route_start_layer.layer = null;
				}
			}
        
		}
        
        
		// ability to set start x, y of this layer
		// it covers an area from here to
		// w, h
		// this allows things like wires to have bounds
		// checking to see if they should be displayed at all...
        
        
		Layer.prototype.Draw = function( board, ctx, x, y )
		{
			var boardx, boardy;
			var scale;
			if( this.flags.bRoot )
				return;
			//console.log( ("Drawing a layer...at %d,%d"), x, y );
			this.scale = board.GetScale();
			board.GetSize(  );
			var cell = board.GetCellSize( );
			if( this.flags.bRoute )
			{
				var viaset = this.peice;
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
				})
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
				if( 1 )
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
				else
					this.peice.methods.Draw( this.psvInstance
										, image
										, this.peice.getimage(scale)
										, x, y );
			}
		}
        
		Layer.prototype.GetPeice = function( )
		{
			return this.peice;
		}
        
		Layer.prototype.FindLayer = function(  iLayer )
		{
			return pool.find( (layer)=>{
				if( layer.iLayer ==- iLayer )
					return layer;
				return 0;
			} );
		}
		// this begin path just sets the point, and any direction is valid
		// origin point rotates to accomodate.
		// this path must begin from NOWHERE to direction.
        
		Layer.prototype.BeginPath = function(  _x, _y, direction )
		{
			if( direction === undefined ) direction = peices.direction.NOWHERE;
			var node= new layerPathNode();
			this.x = _x;
			this.y = _y;
			this.min_x = _x;
			this.min_y = _y;
			this.w = 1;
			this.h = 1;
			this.pds_path.length = 0;
        
			node.x = 0; // x - LAYER::x
			node.y = 0; // y - LAYER::y
        
			node.flags.BackDir = peices.direction.NOWHERE;
			if( direction == peices.direction.NOWHERE )
			{
				this.flags.bForced = 0;
				// there is no real peice which is
				// NOWHERE to NOWHERE, therefore, do not attempt to draw one
				// and instead set the exit direction as valid.
				node.flags.bForced = 0;
				node.flags.ForeDir = peices.direction.NOWHERE;
			}
			else
			{
				this.flags.bForced = 1;
				node.flags.bForced = 1;
				node.flags.ForeDir = direction;
			}
        
			this.pds_path.push( node );
		}
        
        
		// end at this point.
		// final node will be foredir=peices.direction.NOWHERE
		Layer.prototype. LayPath = function(  wX,  wY )
		{
			var DeltaDir;
			var bLoop = false, bIsRetry;  // no looping....
			var tx, ty;
			var nPathLayed = 0;
			var nDir, nNewDir;
			var bBackTrace = false,
				bFailed = false;
                
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
                
			DEBUG_BACKTRACE && console.log( ("Enter...") );
                
				//------------ FORWARD DRAWING NOW .....
			bIsRetry = false;
			DeltaDir = 0;
			{
				var node;
				// get the last node in the path.
				node = this.pds_path[this.pds_path.length-1];
				while( node )
				{
					nNewDir = this.FindDirection( node.x
												  , node.y
												  , wX, wY );
					if( nNewDir == peices.direction.NOWHERE )
					{
						// already have this node at the current spot...
						//console.log( ("Node has ended here...") );
						break;
					}
					nDir = peices.direction.NOWHERE; // intialize this, in case we missed a path below...
					if( node.flags.BackDir == peices.direction.NOWHERE )
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
						tx = node.x + DirDeltaMap[node.flags.ForeDir].x;
						ty = node.y + DirDeltaMap[node.flags.ForeDir].y;
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
							var newnode = new layerPathNode()
							// this may be set intrinsically by being an excessive force
							// causing a large direction delta
							newnode.flags.bForced = false;
							newnode.flags.ForeDir = peices.direction.NOWHERE;
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
		}
        
        
        
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
		}
        
//--------------------------------------------------------------------------

		Layer.prototype.GetLastBackDirection = function( )
		{
			var node;
			node = this.pds_path[this.pds_path.length-1];
			if( node )
			{
			   return node.flags.BackDir;
			}
			return peices.direction.NOWHERE;
		}
		Layer.prototype.GetLastForeDirection = function( )
		{
			var node;
			node = this.pds_path[this.pds_path.length-1];
			if( node )
			{
			   return node.flags.ForeDir;
			}
			return peices.direction.NOWHERE;
		}
	        
	        
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
		}
	        
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
					node.flags.ForeDir = peices.direction.NOWHERE;
					return node;
				}
				if( node && node.flags.bForced )
				{
					DebugBreak();
					// this is SO bad.
				}
				//if( node.x == dest_x && node.y == dest_y )
				{
					//console.log( ("And then we find the node we overlaped...") );
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
						node.flags.ForeDir = peices.direction.NOWHERE;
					}
					this.pds_path.push( node );
					return node;
				}
				if( !nLayers
					&& next.flags.bForced
					&& next.flags.BackDir != peices.direction.NOWHERE )
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
					next.flags.ForeDir = peices.direction.NOWHERE;
				   console.log( ("this node itself is okay...") );
				}
			   return next;
			}
			return null;
		}
//------------------------------------------

Layer.prototype.FindDirection = function( _x, _y, wX, wY ) // From, To
		{
			var nDir;
		        
			if( _x < wX ) 
			{
				if( _y > wY )
					nDir = peices.direction.UP_RIGHT;
				else if( _y < wY )
					nDir = peices.direction.DOWN_RIGHT;
				else
					nDir = peices.direction.RIGHT;
			}
			else if( _x > wX )
			{
				if( _y > wY ) 
					nDir = peices.direction.UP_LEFT;
				else if( _y < wY )
					nDir = peices.direction.DOWN_LEFT;
				else
					nDir = peices.direction.LEFT;
			}
			else
			{
				if( _y > wY ) 
					nDir = peices.direction.UP;
				else if( _y == wY ) 
					nDir = peices.direction.NOWHERE;
				else
					nDir = peices.direction.DOWN;
			}
			return nDir;
		}
	        
	        
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
		}



export function LayerPool( board ) {
	var pool = [];
	var _board = board;
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

export function LayerDataPool() {
	var pool = [];
	return {
		get() {
			var l = pool.pop();
			if( !l ) 
				l = Layer();
			return l;
		}
		,drop(l) {
			pool.push(l);
		}
	}
}

