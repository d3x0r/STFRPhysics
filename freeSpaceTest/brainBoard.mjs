
import {Popup,popups} from "./popups/popups.mjs"


import {BrainBoard} from "./automaton/board/brainshell.mjs"
import {Brain} from "./automaton/brain/brain.mjs"
import {Neuron} from "./automaton/brain/neuron.mjs"
import Synapse from "./automaton/brain/synapse.mjs"


export class ControlForm extends Popup {
	
	rotationRate = 0;

	constructor( parent ) {
		super( "Controls", parent );
		popups.makeSlider( this, this, "rotationRate", "Rotation Rate" );
	}
	

}

export class BrainForm extends Popup {
	board = null;
        brain = new Brain();
        neuronTable = null;
	constructor( parent ) {
        	super( "Brain 1", parent );
		
                this.hide();

                const brainBoard = this.board = new BrainBoard( this.brain, this.divContent );

                const This = this;
                function brainTick() {
                        This.brain.step();
                        setTimeout( brainTick, 1 );
                }
                brainTick();

                function boardTick() {
                        This.board.board.BoardRefresh()
                        requestAnimationFrame(boardTick);
                }
                requestAnimationFrame(boardTick);

                this.board.addEventListener( "added", (p,n)=>{
                        if( n instanceof Neuron ) {
                                this.neuronTable.addNeuron( p,n );
                        }
                        if( n instanceof Synapse )  {
                                this.neuronTable.addSynapse( p, n);
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
                                addNeuron( p, n ) {
                                        var newRow = this.table.insertRow();
                                        var newRow2 = this.table.insertRow();
                                        neuron( newRow, newRow2, n, p );
                                        itemMap.set( n, [newRow,newRow2] );
                                },
                                addSynapse( p, n ) {
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
		
	}

}



