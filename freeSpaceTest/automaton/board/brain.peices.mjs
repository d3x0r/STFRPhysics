
//# defines the board's size of each cell...
//# this defines how blocks and pathways are
//# split when given to the peice module..

export default {
    cell: { width : 48, height : 48 }
   , background : { cells : { width : 5, height : 5 }
	   //, image : "board/images/back1.gif" 
	   //, image : "board/images/background.gif" 
	   , image : "automaton/images/background2.gif" 
	}
   , neuron : {  
		cells : { width : 3, height : 3 }
		, image : "automaton/images/neuron.png" 
		, colors : [ [0x0000f0, 0x000000, 0xf0f000],  [0xf00000, 0x737373, 0x00f000] ]
	}
   , input : {
		cells : { width : 3, height:3 }
		, image : "automaton/images/input.gif" 
   }
   , output : {
		cells : { width : 3, height:3}
		, image : "automaton/images/output.gif" 
   }
   ,pathway : { 
		cells : { width : 7, height:7}
		, image : "automaton/images/AlphaNerves.png"
		, imageNeg : "automaton/images/AlphaNerves-neg.png"
	}
}


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