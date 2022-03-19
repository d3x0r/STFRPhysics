
import {Popup,popups} from "../node_modules/@d3x0r/popups/popups.mjs"


import {BrainBoard} from "./automaton/board/brainshell.mjs"
import {Brain} from "./automaton/brain/brain.mjs"
import {Neuron} from "./automaton/brain/neuron.mjs"
import {Synapse} from "./automaton/brain/synapse.mjs"

const forms = [];

export class ControlForm extends Popup {
	
	rotationRate = 0;

	applyAccel = false;
	objectCount = 20;
	yaw = 0;
	pitch = 0;
	roll = "0z";
	#controls = null;
	#mover = null;	

	constructor( parent, opts ) {
		super( "Controls", parent );
		this.#controls = opts.controls;
		popups.makeSlider( this, this, "rotationRate", "Rotation Rate" );
		popups.makeCheckbox( this, this, "applyAccel", "Apply Accel" );
		this.yawControl = popups.makeTextField( this, this, "yaw", "Yaw", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.pitchControl = popups.makeTextField( this, this, "pitch", "Pitch", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.rollControl = popups.makeTextField( this, this, "roll", "Roll", false, false ); //makeTextField( form, input, value, text, money, percent )

		this.yawControlM = popups.makeTextField( this, this, "yawm", "Yaw", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.pitchControlM = popups.makeTextField( this, this, "pitchm", "Pitch", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.rollControlM = popups.makeTextField( this, this, "rollm", "Roll", false, false ); //makeTextField( form, input, value, text, money, percent )
		const input = popups.makeTextInput( this, this, "objectCount", "Object Count" );
		popups.makeButton( this, "Re-init", ()=>{
			input.blur();
			if( opts.reInit ) opts.reInit(); 
		} );
		this.move( 0,300);
		forms.push( this );
	}
	
	set controls( val ) {
		this.#controls = val;
	}
	set mover( val ) {
		this.#mover= val;
	}
	update(delta) {
		if( this.#controls ) {
		const o = this.#controls.motion.orientation;
		this.roll = o.getRoll()*180/Math.PI;
		this.pitch = o.getPitch()*180/Math.PI;
		this.yaw = (o.getYaw()*180/Math.PI);


		this.roll = this.roll - this.roll%0.01;
		this.yaw = this.yaw - this.yaw%0.01;
		this.pitch = this.pitch - this.pitch%0.01;

		this.rollControl.value = this.roll ;
		this.pitchControl.value = this.pitch;
		this.yawControl.value = this.yaw;

		}else {
		}
		if( this.#controls) {
//		const o = this.#mover.orientation;
		const o = this.#controls.motion.orientation;
		//this.rollm = o.getRoll()*180/Math.PI;
		//this.pitchm = o.getPitch()*180/Math.PI;
		//this.yawm = (o.getYaw()*180/Math.PI);

		this.rollm = o.z*180/Math.PI;
		this.pitchm = o.x*180/Math.PI;
		this.yawm = (o.y*180/Math.PI);

		this.rollm = this.rollm - this.rollm%0.01;
		this.yawm = this.yawm - this.yawm%0.01;
		this.pitchm = this.pitchm - this.pitchm%0.01;

		this.rollControlM.value = this.rollm ;
		this.pitchControlM.value = this.pitchm;
		this.yawControlM.value = this.yawm;

		}else {
		}
	}
}

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



