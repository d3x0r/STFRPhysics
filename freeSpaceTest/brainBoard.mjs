
import {Popup,popups} from "../node_modules/@d3x0r/popups/popups.mjs"


import {BrainBoard} from "./automaton/board/brainshell.mjs"
import {Brain} from "./automaton/brain/brain.mjs"
import {Neuron} from "./automaton/brain/neuron.mjs"
import {Synapse} from "./automaton/brain/synapse.mjs"

const forms = [];


export class BrainForm extends Popup {
	board = null;
	brain = new Brain();
	neuronTable = null;
	constructor( parent, body ) {
		super( "Brain 1", parent );
		
		this.hide();
		const brainBoard = this.board = new BrainBoard( this.brain, this.divContent );

		const This = this;
		function brainTick() {
			for( let form of forms ) form.update();
			This.brain.step();
			setTimeout( brainTick, 1 );
		}
		brainTick();

		function boardTick() {
			This.board.board.BoardRefresh()
			requestAnimationFrame(boardTick);
		}
		requestAnimationFrame(boardTick);

		this.board.addEventListener( "added", (n, psv)=>{
			if( psv instanceof Neuron ) {
				this.neuronTable.addNeuron( psv,n );
			}
			if( psv instanceof Synapse )  {
				this.neuronTable.addSynapse( psv,n);
			}
		})
		
		this.board.addEventListener( "removed", (p,n)=>{
			const rows = itemMap.get( n );
			if( rows ) {
				itemMap.delete( n );
				rows[0].remove();
				rows[1].remove();
			}
		})
		
		this.board.addEventListener( "select", (n)=>{
			
			if( n instanceof this.brain.Neuron ) {
			//        neuronTable.select(n);
			}
		});

		var itemMap = new WeakMap();
		var lastSelect = null;
		this.neuronTable = {
			table : document.createElement("table"),
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
			addNeuron( n, p ) {
				var newRow = this.table.insertRow();
				var newRow2 = this.table.insertRow();
				neuron( newRow, newRow2, n, p );
				itemMap.set( n, [newRow,newRow2] );
			},
			addSynapse( n, p ) {
				var newRow = this.table.insertRow();
				var newRow2 = this.table.insertRow();
				synapse( newRow, newRow2, n, p );
				itemMap.set( n, [newRow,newRow2] );
			}
		}
		this.neuronTable.table.addEventListener( "mousedown", (evt)=>{
			evt.stopPropagation();
		})
		this.neuronTable.table.className = "neuronTable"
		this.divContent.appendChild( this.neuronTable.table );
		const statuses = this.neuronTable;
		//statuses.clear();
		//return statuses;
	
		function neuron( row, row2, n, p ) {
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
			var utilSlider = document.createElement( "input" )
			utilSlider.type = "range";
			utilSlider.min = -100;
			utilSlider.max = 100;
			utilSlider.value = n.threshold * 100;
			utilCell.appendChild( utilSlider );
			utilSlider.addEventListener( "input", ()=>{
				n.threshold = utilSlider.value/100;
			})
	
			var algoSelect = document.createElement( "select" );
			var opt;
			for( let type in Neuron.algo ) {
				algoSelect.add( opt = document.createElement( "option" ) );
				opt.text = type;
				opt.value = Neuron.algo[type];
				algoSelect.appendChild( opt );
				if( thisNeuron.algorithm === Neuron.algo[type] )
					opt.setAttribute("selected","selected");
			}
	
			algoSelect.addEventListener( "change", (evt)=>{	
				var op = evt.target.options[evt.target.selectedIndex];
				thisNeuron.algorithm = +op.value;
			} );
			underName.appendChild( algoSelect );
	
			var data2 = row.insertCell();
			data2.innerText = "123";
			data2.align = "right";
			data2.width = "25%"
			var data3 = row.insertCell();
			data3.innerText = "bbb";
			data3.align = "right";
			data3.width = "25%"
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
			var utilSlider = document.createElement( "input" )
			utilSlider.type = "range";
			utilSlider.min = -100;
			utilSlider.max = 100;
			utilSlider.value = n.gain * 100;
			utilCell.appendChild( utilSlider );
			utilSlider.addEventListener( "input", ()=>{
				n.gain = utilSlider.value/100;
			})
	
			var data2 = row.insertCell();
			data2.innerText = "123";
			data2.align = "right";
			data2.width = "25%"
			var data3 = row.insertCell();
			data3.innerText = "bbb";
			data3.align = "right";
			data3.width = "25%"
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


	setBody( body ) {
		const brainstem = body.getInterface();
		this.brain.addModule( brainstem );
		this.board.BuildBrainstemMenus( null, brainstem, [], [], [] )
	}

}



