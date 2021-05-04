
import Brain from "./brain/brain.mjs";
import {BrainBoard} from "./board/brainshell.mjs"

import * as switcher from "./switcher.mjs";
import * as testPanel from "./testPanel.mjs";
import * as analyzer from "./analyzer.mjs";
import * as shapes from "./board/shapes.mjs";

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
          ` }
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
        	The logic analyzer and switches are run<BR>
                by control boxes on the shelf [above].<BR>
                <BR>
                Flip the switch to "Run" to start things<BR>
                running.<BR>
                <BR>
                Press the "Reset" Button to clear the<BR>
                screen and return things to their original<BR>
                position.<BR>
                <BR>
                TO test a brain, press the "Test" Button<BR>
                then flip the switch to "Run".  If the<BR>
                brain has done what it should when the<BR>
                timer reaches zero, the experiment is a<BR>
                success.<BR>
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
                jim1:shapes.makeLightOutput()
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
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
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
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
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
                jim1:shapes.makeButtonInput()
                , jim2:shapes.makeLightOutput()
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
                jim1:shapes.makeSliderInput()
                , jim2:shapes.makeLightOutput()
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

//testTestPanel();

function animate() {
        brainBoard.board.BoardRefresh();
        requestAnimationFrame(animate);
}
//animate();

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
        testControl.reset()
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


function setupNeuronTable( table ) {
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
                addNeuron( p, n ) {
                        var newRow = this.table.insertRow();
                        var newRow2 = this.table.insertRow();
                        neuron( newRow, newRow2, n, p );
                },
                addSynapse( p, n ) {
                        var newRow = this.table.insertRow();
                        var newRow2 = this.table.insertRow();
                        synapse( newRow, newRow2, n, p );
                }
        }
        statuses.clear();
        return statuses;

        function neuron( row, row2, n, p ) {
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

        