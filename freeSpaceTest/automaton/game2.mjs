
import Brain from "./brain/brain.mjs";
import {Neuron} from "./brain/neuron.mjs";
import {BrainBoard} from "./board/brainshell.mjs"
import { NaturalControls } from "./NaturalCamera.mjs"
import * as THREE from "./three.js/build/three.module.mjs"

import * as switcher from "./switcher.mjs";
import * as testPanel from "./testPanel.mjs";
import * as analyzer from "./analyzer.mjs";
import * as shapes from "./board/shapes.mjs";

const journal = [ 
	{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		<BR>
        	<CENTER>Observations<BR>
                on<BR>
		the Application<BR>
                of<BR>
                Synthetic Brains<BR>
                to<BR>
                the Survival and Feeding<BR>
                of<BR>
		Cocinella Septumpunctata<BR>
		<BR>
                <BR>
		<BR>
          ` }
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		We have set up an observation post in<BR>
        	a forest clearing.  The Spider is<BR>
                visible on a branch of a tree below us.<BR>
                <BR>
                Three aphids are also on the branch.<BR>
                The spider will eat the aphids if it<BR>
                comes across them.  The goal is to build<br>
                a brain to get the Spider to the<BR>
                aphids while staying on the branch.<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
        `}
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		Experiment 1: Full Steam Ahead<BR>
        	The bug can tell how wide the branch is<BR>
                in front of it.  The input varies between<BR>
                0 (no branch) to 1 (full branch).  The<BR>
                outupt cause the bug to move forward.<BR>
                <BR>
                <br>
                <SPAN ID="branchInput"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input: branch width</SPAN><BR>
                <BR>
                <SPAN ID="goForward"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output: go forward</SPAN><BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
         , activate : ()=>{
                setupDemo1();
        }
	, inserts: { 
                branchInput:shapes.makeBranchInput()
        }
		, locked : true
         }
	

        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		Experiment 2: Not so fast<BR>
        	The input and output are the same but<BR>
                the branch has been trimmed.<BR>
                <BR>
                <BR>
                <SPAN ID="branchInput"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input: branch width</SPAN><BR>
                <br>
                <SPAN ID="goForward"></SPAN><SPAN style="line-height:400%;vertical-align:top">Output: go forward</SPAN><BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
        	`
		, locked : true
         , activate : ()=>{
                setupDemo1();
        }
	, inserts: { 
                branchInput:shapes.makeBranchInput()
        }
	}
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">1</SPAN>
		Experiment 3: Eye in the Sky<BR>
        	The Spider now has a primitive form<BR>
                of eye.  It can only detect the<BR>
                difference between dark (0) and<BR>
                light (1).  But this might be useful.<BR>
                <BR>
                <br>
                <BR>
                <SPAN ID="eyeInput"></SPAN><SPAN style="line-height:400%;vertical-align:top">Input: branch width</SPAN><BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
         , activate : ()=>{
                setupDemo1();
        }
       , inserts: { 
                jim1:shapes.makeLightOutput()
        }
        }
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
         , activate : ()=>{
                setupDemo2();
        }
       , inserts: { 
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
         }
         , locked : true
         }
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `}
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
         , activate : ()=>{
                setupDemo3();
        }
         , inserts: { 
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
         }
	 , locked:true
	}
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `}
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
         , activate : ()=>{
                setupDemo4();
        }
         , inserts: { 
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
         }
	 , locked:true
	}
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                
         `}
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
         , activate : ()=>{
                setupDemo5();
        }
         , inserts: { 
                jim1:shapes.makeSliderInput()
                , jim2:shapes.makeLightOutput()
         }
         , locked:true
        }
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `}
        ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
        	<BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
                <BR>
         `
         , activate : ()=>{
                setupDemo6();
        }
         , inserts: { 
                jim1:shapes.makeSliderInput()
                , jim2:shapes.makeLightOutput()
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
                jim1:shapes.makeSliderInput()
                , jim2:shapes.makeLightOutput()
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
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
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
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
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
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
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
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
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

const journal2 = [ 
        { HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
                <CENTER>
                Observations<BR>
                on<BR>
                the Application<BR>
                of<BR>
                Synthetic Brains<BR>
                to<BR>
                the Survival and Feeding<BR>
                of<BR>
                Cocinella Septumpunctata<BR>
                <BR>
                <BR>
                <BR>
           `
        }
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                We have set up an observation post in<BR>
                a forest clearing.  The Lady Bug is<BR>
                visible on a branch of a tree below us.<BR>
                <BR>
                Three aphids are also on the branch.<BR>
                The Lady Bug will eat the aphids if it<BR>
                comes across them.  The goal is to build<BR>
                a brain to get the Lady Bug to the<BR>
                aphids while staying on the branch.<BR>
                <BR>
         `}
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 1: Full Steam Ahead<BR>
                The bug can tell how wide the branch is<BR>
                in front of it.  The input varies between<BR>
                0 (no branch) to 1 (full branch).  The<BR>
                output causes the bug to move forward.<BR>
                <BR>
                <BR>
                <IMG></IMG>Input : branch width<BR>
                <BR>
                <IMG></IMG>Output : go forward<BR>
                <BR>
           `
           , locked : true
        }
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 2: Not so fast<BR>
                The input and output are the same but<BR>
                the branch has been trimmed.<BR>
                <BR>
                <BR>
                <IMG></IMG>Input : branch width<BR>
                <BR>
                <IMG></IMG>Output : go forward<BR>
                <BR>
           `
           , locked : true
        }
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 3: Eye in the Sky<BR>
                The Lady Bug now has a primitive form<BR>
                of eye.  It can only detect the<BR>
                difference between dark (0) and <BR>
                light(1), but this might e useful.<BR>
                <BR>
                <BR>
                <IMG></IMG>Input : branch width<BR>
           `
           , locked : true
        }
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
                <BR>
                Experiment 4: A Turn for the Better<BR>
                THe Lady Bug can now turn to the left<BR>
                or right and detect when it bumps its<BR>
                nose.
                <BR>
                <BR>
                <IMG></IMG>Input : bump nose<BR>
                <BR>
                <IMG></IMG>Output : turn left<BR>
                <BR>
                <IMG></IMG>Output : turn right<BR>
           `
           , locked : true
        }
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
         `}
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
         `}
         ,{ HTML : `
		<SPAN ID="pageNum" style="float:right;margin-right:10">6</SPAN>
		<BR>
           `
           , locked : true
        }

];


var gameState = {
	journalState : 0,
	progressLocked : false,
}

var neuronTable = setupNeuronTable( document.getElementById("statusTable"))

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
})

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

var testControl = null;

function testTestPanel() {
	var newDiv = document.getElementById( "boardMonitorFrame" );//createElement( "div" );
	//newDiv.style.height = 120;
	//newDiv.style.width = 500;
	//newDiv.style.position = "relative";
        //newDiv.style.display = "inline-block";
	var svg;

        newDiv.appendChild( svg = testPanel.speaker() );
        svg.style.verticalAlign="top";
svg.style.height = "66";
svg.style.width = "15%";
  svg.setAttribute( "viewBox", "0 0 130 170")
svg.setAttribute( "preserveAspectRatio", "xMaxYMax" );

        newDiv.appendChild( testControl = svg = testPanel.testButton( (test,on)=>{
                if( test ) {
                        gameState.progressLocked = journal[gameState.journalState].locked = false;
                        return true;
                }
        } ) );
        svg.style.verticalAlign="top";
svg.style.height = "66";
svg.style.width = "25%";
  svg.setAttribute( "viewBox", "0 100 200 50")
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
        newDiv.appendChild( tmp = switcher.animator(0.75) );
        activators.push( tmp );

        tmp.style.height = "64";
        tmp.style.width = "48";
        tmp.setAttribute( "viewBox", "0 00 100 175")
        
        newDiv.appendChild( tmp = switcher.animator(0.223) );
        activators.push( tmp );
        tmp.style.height = "64";
        tmp.style.width = "48";
        tmp.setAttribute( "viewBox", "0 00 100 175")

        newDiv.appendChild( svg = shapes.makeSlider() );
        activators.push( svg );
        svg.style.height = "128";
        svg.style.width = "96";
        svg.setAttribute( "viewBox", "0 00 100 255")
        svg.setAttribute( "transform", "rotate(-90 0 -25)")

        newDiv.appendChild( svg = analyzer.makeAnalyzer( (n)=>{
        	if( n > 4 ) {
                	return 0;
                }
                else {
                	if( n < activators.length ) 
                        	return activators[n].getValue() * 100;
                        return 0;
                }
        }) );

        svg.style.position = "relative";
        svg.style.top = -80;
        svg.style.zIndex=3;
        svg.style.height = "150";
        svg.style.width = "328";
        svg.setAttribute( "viewBox", "0 00 450 155")

	//newDiv.appendChild( switcher.animator(4) );
	//document.body.appendChild( newDiv );
}

function addSliderInput( n, x, y ) {
        var newN = brainBoard.board.PutPeice( brainBoard.sliderInputPeice, x, y, ()=>{
                //console.log( "Get External" );
                return 1-activators[2].getValue();
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
        if( brainBoard.events["added"] )
               brainBoard.events["added"]( brainBoard.lightOutputPeice,newN );
}

function setupDemo1(  ) {
        neuronTable.clear();
        brainBoard.reset();
        addLightOutput( 0, 15, 10 );
}

function setupDemo2(  ) {
        neuronTable.clear();
        brainBoard.reset();
        addButtonInput( 0, 2, 10 );
        addLightOutput( 0, 15, 10 );
}

function setupDemo3(  ) {
        neuronTable.clear();
        brainBoard.reset();
        addButtonInput( 0, 2, 10 );
        addLightOutput( 0, 15, 10 );
        addLightOutput( 1, 15, 15 );
}

function setupDemo4(  ) {
        neuronTable.clear();
        brainBoard.reset();

        addButtonInput( 0, 2, 9 );
        addButtonInput( 1, 2, 15 );
        addLightOutput( 0, 15, 6 );
        addLightOutput( 1, 15, 10 );
        addLightOutput( 2, 15, 14 );
        addLightOutput( 3, 15, 18 );
}


function setupDemo5(  ) {
        neuronTable.clear();
        brainBoard.reset();

        addSliderInput( 0, 2, 12 );
        addLightOutput( 0, 15, 12 );
}



function setupDemo6(  ) {
        neuronTable.clear();
        brainBoard.reset();

        addSliderInput( 0, 2, 12 );
        addLightOutput( 0, 15, 6 );
        addLightOutput( 1, 15, 10 );
        addLightOutput( 2, 15, 14 );
        addLightOutput( 3, 15, 18 );
}

// experiment 6; there's one setup before the first
function setupDemo7(  ) {
        neuronTable.clear();
        brainBoard.reset();

        addButtonInput( 0, 2, 9 );
        addButtonInput( 1, 2, 15 );
        addLightOutput( 0, 15, 12 );
}

// experiment 7; there's one setup before the first
function setupDemo8(  ) {
        neuronTable.clear();
        brainBoard.reset();

        addButtonInput( 0, 2, 9 );
        addButtonInput( 1, 2, 15 );
        addLightOutput( 0, 15, 12 );
}

// experiment 8; there's one setup before the first
function setupDemo9(  ) {
        neuronTable.clear();
        brainBoard.reset();

        addButtonInput( 0, 2, 9 );
        addButtonInput( 1, 2, 15 );
        addLightOutput( 0, 15, 12 );
}

// experiment 8; there's one setup before the first
function setupDemo10(  ) {
        neuronTable.clear();
        brainBoard.reset();

        addButtonInput( 0, 2, 9 );
        addLightOutput( 0, 15, 9 );
}
// experiment 8; there's one setup before the first
function setupDemo11(  ) {
        neuronTable.clear();
        brainBoard.reset();

        addButtonInput( 0, 2, 9 );
        addButtonInput( 1, 2, 15 );
        addLightOutput( 0, 15, 12 );
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
         tooldiv.appendChild( (tool = shapes.makeNeuron()).on );
         tool.on.addEventListener( "click", ()=>{
                 var pos = findOpenSpot( 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_x
                        , 10* (1<<brainBoard.scale) - brainBoard.board.board_origin_y );
                 var newN = brainBoard.board.PutPeice( brainBoard.NeuronPeice
                                        , pos.x, pos.y
                                        , 0 );
                 if( brainBoard.events["added"] )
                        brainBoard.events["added"]( brainBoard.NeuronPeice,newN );
         })
         //tooldiv.appendChild( (shapes.makeNode()).on );
         tooldiv.appendChild( tool = shapes.makeTrash() );
         tool.addEventListener( "click",()=>{
                neuronTable.clear();
                brainBoard.reset()
         })

         //tooldiv.appendChild( (shapes.makePowerOutput()).on );

         tooldiv.appendChild( (tool = shapes.makeButtonInput()).on );
         tool.on.addEventListener( "click", ()=>{ 
                var pos = findOpenSpot( 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_x
                        , 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_y );
                 addButtonInput( 0, pos.x, pos.y )
         })
        tooldiv.appendChild( (tool = shapes.makeLightOutput()).on );
        tool.on.addEventListener( "click", ()=>{
                var pos = findOpenSpot( 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_x
                        , 10  * (1<<brainBoard.scale)- brainBoard.board.board_origin_y );
                addLightOutput(0, pos.x, pos.y)
        } )
         tooldiv.appendChild( (tool = shapes.makeSliderInput()).on );
         tool.on.addEventListener( "click", ()=>{
                var pos = findOpenSpot( 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_x
                        , 10 * (1<<brainBoard.scale) - brainBoard.board.board_origin_y );
                var newN = brainBoard.board.PutPeice( brainBoard.sliderInputPeice
                        , pos.x, pos.y
                        , ()=>{
                                //console.log( "Get External" );
                                return 1-activators[2].getValue();
                } );
                if( brainBoard.events["added"] )
                       brainBoard.events["added"]( brainBoard.sliderInputPeice,newN );
        })
        
}

setupToolPanel();
var viewer = setupWorldView();
//testTestPanel();
	var clock = new THREE.Clock()

function animate() {

	var delta = clock.getDelta();

	viewer.renderer.clear();
	viewer.renderer.render( viewer.scene, viewer.camera );
	viewer.controls.update(delta);

        brainBoard.board.BoardRefresh();
        requestAnimationFrame(animate);
}
animate();

function fixupImages() {
        journal.forEach( page=>{

                notebookPanel.innerHTML = page.HTML;
                var pageNum = notebookPanel.querySelector(`[id="pageNum"]`)
                if( pageNum ) {
                        pageNum.textContent = '' + (gameState.journalState + 1);
                        if( page.inserts ) {
                                var IDs = Object.keys( page.inserts );
                                IDs.forEach( id =>{
                                        var img;
                                        img = notebookPanel.querySelector(`[id="${id}"]`);
                                        if( img )
                                        img.appendChild( page.inserts[id].on );        
                                })
                        }

                }
                page.HTML = notebookPanel.innerHTML;

        })
}

fixupImages();
setPage( 0 )

//------------ SET PAGE ROUTINE ------------------------------

function setPage( newPage )
{
	if( gameState.progressLocked ) {
		if( newPage > gameState.journalState ) {
		 	return;
		}
        }
        testControl && testControl.reset()
	gameState.journalState = newPage;

	gameState.progressLocked = journal[gameState.journalState].locked || false;

	notebookPanel.innerHTML = journal[gameState.journalState].HTML;
	var pageNum = notebookPanel.querySelector(`[id="pageNum"]`)
	if( pageNum ) {
                pageNum.textContent = '' + (gameState.journalState + 1);
        }
        if( journal[gameState.journalState].activate )
                journal[gameState.journalState].activate();
	
}

//------------ PAGE ACTIVATION ROUTINES ------------------------------

function setupLightOutput() {
	
}


function setupWorldView() {
	var viewer = {
		canvas: document.getElementById( "worldView" ),
		renderer : null,
		scene : new THREE.Scene(),
		camera : null,
		controls : null,
	};
		viewer.renderer = new THREE.WebGLRenderer( { canvas: viewer.canvas } );

		viewer.camera = new THREE.PerspectiveCamera( 75, viewer.canvas.width / viewer.canvas.height, 0.001, 10000 );

		viewer.camera.matrixAutoUpdate = false;
		//viewer.camera.position.z = 15;
		//viewer.camera.matrix.rotateRelative( 0.19229568617010028,-0.9214720761189179, 0 );
		//viewer.camera.matrix.rotateRelative( 0.19229568617010028,-0.2914720761189179, 0 );
		//viewer.camera.matrix.rotateRelative( 0.19229568617010028, 0, 0 );
		//viewer.camera.matrix.rotateRelative( 0.19229568617010028, 0, 0 );


		var quat = new THREE.Quaternion(  -0.2438506107593719,  -0.5903994136453138,  -0.1933228014193038,  0.7447091421830025 );
		viewer.camera.matrix.makeRotationFromQuaternion( quat );

		viewer.camera.matrix.origin.x = -5.72860527740503;
		viewer.camera.matrix.origin.y = 5.263398318042513;
		viewer.camera.matrix.origin.z =  4.793901205658764;
//		viewer.camera.matrix.rotateRelative( 0.19229568617010028,-0.2914720761189179, 0 );
//		viewer.camera.matrix.rotateRelative( 0.19229568617010028,-0.2914720761189179, 0 );
//		viewer.camera.matrix.rotateRelative( 0.19229568617010028,-0.2914720761189179, 0 );
//		viewer.camera.matrix.rotateRelative( 0.19229568617010028,-0.2914720761189179, 0 );
//		viewer.camera.matrix.rotateRelative( 0.19229568617010028,-0.2914720761189179, 0 );

		viewer.camera.matrixWorldNeedsUpdate = true;

		 // for phong hello world test....
 		var light = new THREE.PointLight( 0xffFFFF, 1, 10000 );
 		light.position.set( 0, 0, 1000 );
 		viewer.scene.add( light );
		
		 //initVoxelarium();


		//viewer.renderer.setSize( window.innerWidth, window.innerHeight );

		//document.body.appendChild( renderer.domElement );

		var controlNatural = new NaturalControls( viewer.camera, viewer.renderer.domElement );
		controlNatural.enable( );

		//controlOrbit = new THREE.OrbitControls( camera, renderer.domElement );
		//controlOrbit.enable();

		viewer.controls = controlNatural;

var objectLoader = new THREE.ObjectLoader();
//var objectLoader = new ObjLoader2();
//var objectLoader = new THREE.OBJLoader();
//var objectLoader = new THREE.OBJLoader2();
objectLoader.load("models/demoScene1.json", (model)=>{
	console.log( "Loaded spider" );
	viewer.scene.add( model );
});
objectLoader.load("models/spider.json", (model)=>{
	console.log( "Loaded spider" );
	viewer.scene.add( model );
});
objectLoader.load("models/aphod.json", (model)=>{
	console.log( "Loaded aphod" );
	viewer.scene.add( model );
});

	return viewer;
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
        statuses.clear();
        return statuses;

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

        