"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2020 d3x0r
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * Marching Tetrahedra in Javascript
 *
 * Based on Unique Research
 *   - Carbon atom latice in diamond crystal; hence (DCL - Diamond Crystal Lattice)
 *
 *
 * Javascript by d3x0r
 *  - Version 1 - original 'marching tetrahedra'
 *  - Version 2 - Single Cell - Diamond Lattice
 *  - Version 3 - Single Plane - Diamond Lattice
 *  - Version 4 - Full Form - Diamond Lattice
 *  - Version DMT-3D - Full Form - Diamond Lattice
 *                    - Dual MT
 *                 - supports collision detection ?
 */


/*
	// there is a long combination of possible 3-4 bits some 50(?) of
	// which only these 6 apply in reality

this is the vertex references on the right, and which 'vert N' applies.

   0 _ _ 1
   |\   /|
    \\2//     (above page)
    | | |
     \|/
      3


 this is the line index applied.  each 'bit' of valid is this number...
	. ____0____ .
	|\         /|     01  02 03 12 23 31
	\ \_1   3_/ /
	 |  \   /  |
	  \  \ /  /
	   \  .  /   (above page)
	  2|  |  |5
	    \ 4 /
	    | | |
	     \|/
	      .

	// of all combinations of bits in crossings is 6 bits per tetrahedron,
	// these are the only valid combinations.
	// (16 bits per cell)
	const validCombinations = [
		{ val:[1,1,1,0,0,0], // valid (vert 0, 0,1,2)   0 in, 0 out
		},
		{ val:[1,1,0,0,1,1], // valid 0,1,4,5  (0-3,1-2)
		},
		{ val:[1,0,1,1,1,0], // valid 0,2,3,4  (0-2,1-3)
		},
		{ val:[1,0,0,1,0,1], // valid (vert 1, 0,3,5)
		},
		{ val:[0,1,1,1,0,1], // valid 1,2,3,5 (0-1,2,3)
		},
		{ val:[0,1,0,1,1,0], // valid (vert 2, 1,3,4 )
		},
		{ val:[0,0,1,0,1,1], // valid (vert 3, 2,4,5 )
		},
	]

*/

import {lnQuat} from "./lnQuatSq.js"
lnQuat.setVectorType( THREE.Vector3 )
var DualMarchingTetrahedra3 = window.DualMarchingTetrahedra3a = (function() {
const debug_ = false;
const drawCubes = false;
const drawCubesIntersects = false;
	// static working buffers
	let ofsA = 0.0;

	var sizes = 0;
	const pointHolder = [null];
	const pointStateHolder = [];
	const normalHolder = [[]];
	const crossHolder = [null];
	const contentHolder = [null];
	var bits = null; // single array of true/false per cube-cell indicating at least 1 cross happened
	let visited = null;
	let edge_visited = null;
	
	// basis cube
	const geom = [
		[0,0,0],   // front layer
		[1,0,0],
		[0,1,0],
		[1,1,0],
		[0,0,1],   // 5 back layer
		[1,0,1],   // 6
		[0,1,1],   // 7
		[1,1,1],   // 8
	]

	// area of a triangle scalar
	// sqrt(A)/L  is a value between 0-MagicRange.
	//   1/  0.3102016197 =  3.22370979547
	// 
	const MagicRange  =  Math.sqrt( Math.sqrt(3) / 18 );
	const MagicScalar =  1 / Math.sqrt( Math.sqrt(3) / 18 );

	// these are the 6 computed lines per cell.
	// the numbers are the indexes of the point in the computed layer map (tesselation-5tets-plane.png)
	// every other cell has a different direction of the diagonals.

	// low left, front up, left diag, bot front, front diag, bottom diag, front diag
	const linesEvenMin = [ [0,2],[0,4],[0,1],[2,4],[1,2],[1,4]  ];
	const linesOddMin =  [ [0,2],[0,4],[0,1],[0,6],[0,3],[0,5]  ];
	
	const linesMin = [linesEvenMin,linesOddMin];

	// this is the running center of the faces being generated - center of the cell being computed.
	const cellOrigin = [0,0,0];

	// see next comment...
	// the order of these MUST MATCH edgeToComp order
	// only 3 of these are used in code ATM... the 4th index is not
	const vertToDataOrig = [
		[ [ 0,2,4,1], [6,4,2,7], [5,7,1,4], [3,1,7,2], [1,4,7,2] ],
		[ [ 2,0,3,6], [4,6,5,0], [7,5,6,3], [1,3,0,5], [0,3,6,5] ],
	];


	// these is the point orders of the tetrahedra. (first triangle in comments at top)
	// these can be changed to match the original information on the wikipedia marching-tetrahedra page.
	// the following array is modified so the result is the actual offset in the computed data plane;
	// it is computed from the above, original, array.

	// index with [odd] [tet_of_cube] [0-3 vertex]
	// result is point data rectangular offset... (until modified)
	const vertToData = [	// updated (values overwritten) base index to resolved data cloud offset
			[ [ 0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0] ],
			[ [ 0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0] ],
	];

	const tetCount = 5; // 5 tetrahedrons per cell...

	// these are short term working variables
	// reduces number of temporary arrays created.
	const pointOutputHolder = [0,0,0];
	// face normal - base direction to add normal, scales by angle 
	const fnorm = [0,0,0];
	// used to compute cross product for angle between faces
	const tmp = [0,0,0];
	// used to compute angle between faces, are two direction vectors from a point
	const a1t = [0,0,0];
	const a2t = [0,0,0];

	// these are used for the non-geometry-helper output
	const v_cb = new THREE.Vector3();
	const v_ab = new THREE.Vector3
	const v_normTmp = new THREE.Vector3();
	// used to compute angle between faces, are two direction vectors from a point
	const v_a1t = new THREE.Vector3();
	const v_a2t = new THREE.Vector3();

	// temporary variables for moveNear
	const lnQA = new lnQuat();
	const lnQB = new lnQuat();
	const tmpbuf = [0,0,0]; // temporary normal buffer;


	// a tetrahedra has 6 crossing values
	// the result of this is the index into that ordered list of intersections (second triangle in comments at top)

	// indexed with [invert][face][0-1 tri/quad] [0-2]
	// indexed with 'useFace'  and that is defined above in the order of validCombinations
	// facePointIndexes indexes edgeToComp
	// these are edge numbers; a tet has 6 edges.
	const facePointIndexesOriginal = [
			[
				[[0,1,2]],    // vert 0  // no center
				[[0,1,4],[1,5,4]],
				[[5,0,3],[2,0,5]],
				[[4,0,3]],    // vert 1  // filters y
				[[2,1,4],[4,1,3]],
				[[1,5,3]],    // vert 2  // filters x
				[[2,4,5]]     // vert 3  // filters z
			],
			// invert
			[
				[[0,2,1]],    // vert 0
				[[1,0,4],[5,1,4]],
				[[0,5,3],[0,2,5]],
				[[0,4,3]],    // vert 1
				[[1,2,4],[1,4,3]],
				[[5,1,3]],    // vert 2
				[[4,2,5]]     // vert 3
			],
	];


	// this uses only edges in 'this' block...
	// the same edge from another block is a different path :(

	const tetNearMap = [
		[ // odd=0
			{ inTets : [0],
			  ofs : 0,
			  edge:0,
			  nextNear :[ { ofs1:-1, ofs2:-4, edge:[0,15] } ],  // edges
			  near:[ // edge=0
				{ dir:-1, tet:3, tfrm:0, tetEdge:0 }, 
				{ dir:-4, tet:1, tfrm:0, tetEdge:0 }, 
			]},{
			  inTets : [0],
			  ofs : 0,
			  edge:1,
			  nextNear :[ { ofs1:-2, ofs2:-4, edge:[0,16] } ],  // edges
			  near:[ // edge=1
				{ dir:-1, tet:3, tfrm:0, tetEdge:1 }, 
				{ dir:-2, tet:0, tfrm:0, tetEdge:1 }, 
			]},{
			  inTets : [0],
			  ofs : 0,
			  edge:2,
			  nextNear :[ { ofs1:-2, ofs2:-1, edge:[0,17] } ],  // edges
			  near:[ // edge=2
				//here{ dir: 0, tet:0, tfrm:0 }, 
				{ dir:-2, tet:0, tfrm:0, tetEdge:2 }, 
				{ dir:-4, tet:1, tfrm:0, tetEdge:2 }, 
				//not'near'{ dir:-6, tet:1, tfrm:0 }, 

			]},{
			  inTets : [0,1,4],
			  ofs : 0,
			  edge:3,
			  nextNear :[ { ofs1:-1, ofs2:0, edge:[1,8] } ],  // edges
			  near:[ // edge=3
				{ dir:-1, tet:2, tfrm:1, tetEdge:3 }, 
				{ dir:-1, tet:3, tfrm:0, tetEdge:3 }, 

				// depending on which tet I'm in, these are 'self' or 'near'
				{ dir:0, tet:1, tfrm:4, tetEdge:4 }, 
				{ dir:0, tet:0, tfrm:4, tetEdge:4 }, 
				{ dir:0, tet:4, tfrm:1, tetEdge:3 }, 
				{ dir:0, tet:4, tfrm:0, tetEdge:3 }, 
			]},{
			  inTets : [0,3,4],
			  ofs : 0,
			  edge:4,
			  nextNear :[ { ofs1:-4, ofs2:0, edge:[1,14] } ],  // edges
			  near:[ // edge=4
				// depends on tet being evaluated
				{ dir:-4, tet:1, tfrm:0, tetEdge:4 }, 
				{ dir:-4, tet:2, tfrm:3, tetEdge:4 }, 
				//{ dir:-4, tet:4, tfrm:0 }, 

				// depending on which tet I'm in, these are 'self' or 'near'
				{ dir:0, tet:0, tfrm:4, tetEdge:2 }, 
				{ dir:0, tet:3, tfrm:4, tetEdge:2 }, 
				{ dir:0, tet:4, tfrm:0, tetEdge:4 }, 
				{ dir:0, tet:4, tfrm:3, tetEdge:4 }, 
			]},{
			  inTets : [0,2,4],
			  ofs : 0,
			  edge:5,
			  nextNear :[ { ofs1:-2, ofs2:0, edge:[1,11] } ],  // edges
			  near:[ // edge=5
				{ dir:-2, tet:0, tfrm:0, tetEdge:5 }, 
				{ dir:-2, tet:2, tfrm:2, tetEdge:5 }, 
				//{ dir:-2, tet:4, tfrm:0 }, 

				// depending on which tet I'm in, these are 'self' or 'near'
				{ dir:0, tet:0, tfrm:4, tetEdge:0 }, 
				{ dir:0, tet:2, tfrm:4, tetEdge:0 }, 
				{ dir:0, tet:4, tfrm:0, tetEdge:5 }, 
				{ dir:0, tet:4, tfrm:2, tetEdge:5 }, 
			]},{
			  inTets : [3],
			  ofs : 1,
			  edge: 0,
			  nextNear :[ { ofs1:1, ofs2:-4, edge:[0,12] } ],  // edges
			  near:[ // edge=6 // +x, edge 0
				{ dir:1, tet:0, tfrm:3, tetEdge:0 }, 
				{ dir:-4, tet:2, tfrm:3, tetEdge:0 }, 
				//{ dir:5, tet:1, tfrm:0 }, 
			]},{
			  inTets : [2],
			  ofs : 1,
			  edge:1,
			  nextNear :[ { ofs1:1, ofs2:-4, edge:[0,9] } ],  // edges
			  near:[ // edge=7 // +x, edge 1
				{ dir:1, tet:1, tfrm:2, tetEdge:1 }, 
				{ dir:4, tet:3, tfrm:2, tetEdge:1 }, 
			]},{
			  inTets : [2,3,4],
			  ofs : 1,
			  edge: 3,
			  nextNear :[ { ofs1:1, ofs2:0, edge:[1,3] } ],  // edges
			  near:[ // edge=8 // +x, edge 3
				{ dir:1, tet:0, tfrm:3, tetEdge:3 }, 
				{ dir:1, tet:1, tfrm:2, tetEdge:3 }, 
				{ dir:0, tet:4, tfrm:2, tetEdge:3 }, 
				{ dir:0, tet:4, tfrm:3, tetEdge:3 }, 
				{ dir:0, tet:2, tfrm:4, tetEdge:1 }, 
				{ dir:0, tet:3, tfrm:4, tetEdge:1 }, 
			]},{
			  inTets : [1],
			  ofs : 2,
			  edge: 1,
			  nextNear :[ { ofs1:-1, ofs2:2, edge:[0,7] } ],  // edges
			  near:[ // edge=9 // +y, edge 1
				{ dir:-1, tet:2, tfrm:1, tetEdge:1 }, 
				{ dir:2, tet:1, tfrm:1, tetEdge:1 }, 
			]},{
			  inTets : [3],
			  ofs : 2,
			  edge: 2,
			  nextNear :[ { ofs1:1, ofs2:2, edge:[0,13] } ],  // edges
			  near:[ // edge=10 // +y, edge 2
				{ dir:1, tet:0, tfrm:3, tetEdge:2 }, 
				{ dir:2, tet:3, tfrm:3, tetEdge:2 }, 
			]},{
			  inTets : [1,3,4],
			  ofs : 2,
			  edge: 5,
			  nextNear :[ { ofs1:0, ofs2:2, edge:[1,5] } ],  // edges
			  near:[ // edge=11 // +y, edge 5
				{ dir:2, tet:1, tfrm:1, tetEdge:5 }, 
				{ dir:2, tet:3, tfrm:3, tetEdge:5 }, 

				{ dir:0, tet:4, tfrm:1, tetEdge:5 }, 
				{ dir:0, tet:4, tfrm:3, tetEdge:5 }, 
				{ dir:0, tet:1, tfrm:4, tetEdge:5 }, 
				{ dir:0, tet:3, tfrm:4, tetEdge:5 }, 
			]},{
			  inTets : [1],
			  ofs : 4,
			  edge: 0,
			  nextNear :[ { ofs1:-1, ofs2:4, edge:[1,6] } ],  // edges
			  near:[ // edge=12 // +z, edge 0
				{ dir:-1, tet:2, tfrm:1, tetEdge:0 }, 
				{ dir: 4, tet:0, tfrm:1, tetEdge:0 }, 
			]},{
			  inTets : [2],
			  ofs : 4,
			  edge: 2,
			  nextNear :[ { ofs1:-2, ofs2:4, edge:[0,2] } ],  // edges
			  near:[ // edge=13 // +z, edge 2
				{ dir:-2, tet:2, tfrm:2, tetEdge:2 }, 
				{ dir:4, tet:3, tfrm:2, tetEdge:2 }, 
			]},{
			  inTets : [1,2,4],
			  ofs : 4,
			  edge: 4,
			  nextNear :[ { ofs1:0, ofs2:4, edge:[1,4] } ],  // edges
			  near:[ // edge=14 // +z, edge 4
				{ dir:4, tet:0, tfrm:1, tetEdge:4 }, 
				{ dir:4, tet:3, tfrm:2, tetEdge:4 }, 

				{ dir:0, tet:4, tfrm:1, tetEdge:4 }, 
				{ dir:0, tet:4, tfrm:2, tetEdge:4 }, 
				{ dir:0, tet:1, tfrm:4, tetEdge:3 }, 
				{ dir:0, tet:2, tfrm:4, tetEdge:3 }, 
			]},{
			  inTets : [2],
			  ofs : 5,
			  edge: 0,
			  nextNear :[ { ofs1:1, ofs2:4, edge:[0,0] } ],  // edges
			  near:[ // edge=15 // +x+z, edge 0
				{ dir:1, tet:1, tfrm:2, tetEdge:0 }, 
				{ dir:4, tet:3, tfrm:2, tetEdge:0 }, 
			]},{
			  inTets : [3],
			  ofs : 3,
			  edge: 1,
			  nextNear :[ { ofs1:1, ofs2:2, edge:[0,1] } ],  // edges
			  near:[ // edge=16 // +x+y, edge 1
				{ dir:1, tet:0, tfrm:3, tetEdge:1 }, 
				{ dir:2, tet:3, tfrm:3, tetEdge:1 }, 
			]},{
			  inTets : [1],
			  ofs : 6,
			  edge: 2,
			  nextNear :[ { ofs1:2, ofs2:4, edge:[0,2] } ],  // edges
			  near:[ // edge=17 // +y+z, edge 2
				{ dir:2, tet:1, tfrm:1, tetEdge:2 }, 
				{ dir:4, tet:0, tfrm:1, tetEdge:2 }, 
			]}
		],[ //odd=1
			{ inTets : [0],
			  ofs : 0,
			  edge:0,
			  nextNear :[ { ofs1:-1, ofs2:-4, edge:[1,15] } ],  // edges
			  near:[ // edge=0
				//self{ dir: 0, tet:0, srf:0 }, 
				{ dir:-1, tet:3, tfrm:0, tetEdge:0 }, 
				{ dir:-4, tet:1, tfrm:0, tetEdge:0 }, 
				//not'near'{ dir:-5, tet:2, tfrm:0 }, 
			]},{
			  inTets : [1],
			  ofs : 0,
			  edge:1,
			  nextNear :[ { ofs1:-2, ofs2:-4, edge:[1,16] } ],  // edges
			  near:[ // edge=1
				//self{ dir: 0, tet:0, tfrm:0 }, 
				{ dir:-1, tet:2, tfrm:1, tetEdge:2 }, 
				{ dir:-2, tet:1, tfrm:1, tetEdge:2 }, 
				//not'near'{ dir:-3, tet:3, tfrm:0 }, 
			]},{
			  inTets : [3],
			  ofs : 0,
			  edge:2,
			  nextNear :[ { ofs1:-2, ofs2:-1, edge:[1,17] } ],  // edges
			  near:[ // edge=2
				//here{ dir: 0, tet:0, tfrm:0 }, 
				{ dir:-4, tet:2, tfrm:3, tetEdge:1 }, 
				{ dir:-2, tet:3, tfrm:3, tetEdge:1 }, 
				//not'near'{ dir:-6, tet:1, tfrm:0 }, 
			]},{
			  inTets : [0,1,4],
			  ofs : 0,
			  edge:3,
			  nextNear :[ { ofs1:-1, ofs2:0, edge:[0,8] } ],  // edges
			  near:[ // edge=3
				{ dir:-1, tet:2, tfrm:1, tetEdge:4 }, 
				{ dir:-1, tet:3, tfrm:0, tetEdge:3 }, 

				// depending on which tet I'm in, these are 'self' or 'near'
				{ dir:0, tet:1, tfrm:4, tetEdge:1 }, 
				{ dir:0, tet:0, tfrm:4, tetEdge:1 }, 
				{ dir:0, tet:4, tfrm:1, tetEdge:3 }, 
				{ dir:0, tet:4, tfrm:0, tetEdge:4 }, 
			]},{
			  inTets : [0,3,4],
			  ofs : 0,
			  edge: 4,
			  nextNear :[ { ofs1:-4, ofs2:0, edge:[0,14] } ],  // edges
			  near:[ // edge=4
				// depends on tet being evaluated
				{ dir:-4, tet:1, tfrm:0, tetEdge:3 }, 
				{ dir:-4, tet:2, tfrm:3, tetEdge:3 }, 
				//{ dir:-4, tet:4, tfrm:0 }, 

				// depending on which tet I'm in, these are 'self' or 'near'
				{ dir:0, tet:0, tfrm:4, tetEdge:0 }, 
				{ dir:0, tet:3, tfrm:4, tetEdge:0 }, 
				{ dir:0, tet:4, tfrm:0, tetEdge:3 }, 
				{ dir:0, tet:4, tfrm:3, tetEdge:3 }, 
			]},{
			  inTets : [1,3,4],
			  ofs : 0,
			  edge:5,
			  nextNear :[ { ofs1:-2, ofs2:0, edge:[0,11] } ],  // edges
			  near:[ // edge=5
				{ dir:-2, tet:1, tfrm:1, tetEdge:5 }, 
				{ dir:-2, tet:3, tfrm:3, tetEdge:5 }, 

				// depending on which tet I'm in, these are 'self' or 'near'
				{ dir:0, tet:4, tfrm:1, tetEdge:5 }, 
				{ dir:0, tet:4, tfrm:3, tetEdge:5 }, 
				{ dir:0, tet:1, tfrm:4, tetEdge:2 }, 
				{ dir:0, tet:3, tfrm:4, tetEdge:2 }, 
			]},{
			  inTets : [3],
			  ofs : 1,
			  edge: 0,
			  nextNear :[ { ofs1:1, ofs2:-4, edge:[1,12] } ],  // edges
			  near:[ // edge=6 // +x, edge 0
				{ dir:1, tet:0, tfrm:3, tetEdge:0 }, 
				{ dir:-4, tet:2, tfrm:3, tetEdge:0 }, 
			]},{
			  inTets : [3],
			  ofs : 1,
			  edge:1,
			  nextNear :[ { ofs1:1, ofs2:-4, edge:[1,9] } ],  // edges
			  near:[ // edge=7 // +x, edge 1
				{ dir:1, tet:0, tfrm:3, tetEdge:2 }, 
				{ dir:-4, tet:2, tfrm:3, tetEdge:2 }, 
			]},{
			  inTets : [2,3,4],
			  ofs : 1,
			  edge:3,
			  nextNear :[ { ofs1:1, ofs2:0, edge:[0,3] } ],  // edges
			  near:[ // edge=8 // +x, edge 3
				{ dir:1, tet:0, tfrm:3, tetEdge:4 }, 
				{ dir:1, tet:1, tfrm:2, tetEdge:3 }, 
				{ dir:0, tet:4, tfrm:2, tetEdge:3 }, 
				{ dir:0, tet:4, tfrm:3, tetEdge:4 }, 
				{ dir:0, tet:2, tfrm:4, tetEdge:4 }, 
				{ dir:0, tet:3, tfrm:4, tetEdge:4 }, 
			]},{
			  inTets : [0],
			  ofs : 2,
			  edge:1,
			  nextNear :[ { ofs1:1, ofs2:-2, edge:[1,7] } ],  // edges
			  near:[ // edge=9 // +y, edge 1
				{ dir:-1, tet:3, tfrm:0, tetEdge:2 }, 
				{ dir:2, tet:0, tfrm:0, tetEdge:2 }, 
			]},{
			  inTets : [0],
			  ofs : 2,
			  edge:2,
			  nextNear :[ { ofs1:-4, ofs2:2, edge:[1,13] } ],  // edges
			  near:[ // edge=10 // +y, edge 2
				{ dir:2, tet:0, tfrm:0, tetEdge:1 }, 
				{ dir:-4, tet:1, tfrm:0, tetEdge:1 }, 
			]},{
			  inTets : [0,2,4],
			  ofs : 2,
			  edge: 5,
			  nextNear :[ { ofs1:0, ofs2:2, edge:[0,5] } ],  // edges
			  near:[ // edge=11 // +y, edge 5
				{ dir:2, tet:0, tfrm:0, tetEdge:5 }, 
				{ dir:2, tet:2, tfrm:2, tetEdge:5 }, 

				{ dir:0, tet:4, tfrm:0, tetEdge:5 }, 
				{ dir:0, tet:4, tfrm:2, tetEdge:5 }, 
				{ dir:0, tet:0, tfrm:4, tetEdge:3 }, 
				{ dir:0, tet:2, tfrm:4, tetEdge:3 }, 
			]},{
			  inTets : [1],
			  ofs : 4,
			  edge: 0,
			  nextNear :[ { ofs1:-1, ofs2:4, edge:[0,6] } ],  // edges
			  near:[ // edge=12 // +z, edge 0
				{ dir:-1, tet:2, tfrm:1, tetEdge:0 }, 
				{ dir: 4, tet:0, tfrm:1, tetEdge:0 }, 
			]},{
			  inTets : [1],
			  ofs : 4,
			  edge: 2,
			  nextNear :[ { ofs1:-2, ofs2:4, edge:[1,2] } ],  // edges
			  near:[ // edge=13 // +z, edge 2
				{ dir:-2, tet:1, tfrm:1, tetEdge:1 }, 
				{ dir:4, tet:0, tfrm:1, tetEdge:1 }, 
			]},{
			  inTets : [1,2,4],
			  ofs : 4,
			  edge:4,
			  nextNear :[ { ofs1:0, ofs2:4, edge:[0,4] } ],  // edges
			  near:[ // edge=14 // +z, edge 4
				{ dir:4, tet:0, tfrm:1, tetEdge:3 }, 
				{ dir:4, tet:3, tfrm:2, tetEdge:4 }, 

				{ dir:0, tet:4, tfrm:1, tetEdge:3 }, 
				{ dir:0, tet:4, tfrm:2, tetEdge:4 }, 
				{ dir:0, tet:1, tfrm:4, tetEdge:5 }, 
				{ dir:0, tet:2, tfrm:4, tetEdge:5 }, 
			]},{
			  inTets : [2],
			  ofs : 5,
			  edge: 0,
			  nextNear :[ { ofs1:1, ofs2:4, edge:[1,0] } ],  // edges
			  near:[ // edge=15 // +x+z, edge 0
				{ dir:1, tet:1, tfrm:2, tetEdge:0 }, 
				{ dir:4, tet:3, tfrm:2, tetEdge:0 }, 
			]},{
			  inTets : [2],
			  ofs : 3,
			  edge: 1,
			  nextNear :[ { ofs1:2, ofs2:1, edge:[1,1] } ],  // edges
			  near:[ // edge=16 // +x+y, edge 1
				{ dir:1, tet:1, tfrm:2, tetEdge:2 }, 
				{ dir:2, tet:2, tfrm:2, tetEdge:2 }, 
			]},{
			  inTets : [2],
			  ofs : 6,
			  edge: 2,
			  nextNear :[ { ofs1:2, ofs2:4, edge:[1,2] } ],  // edges
			  near:[ // edge=17 // +y+z, edge 2
				{ dir:2, tet:2, tfrm:2, tetEdge:1 }, 
				{ dir:4, tet:3, tfrm:2, tetEdge:1 }, 
			]}
		]
	];


for( let o of tetNearMap )
	for( let e of o ) {
		const next=e.nextNear[0].edge;
		e.nextNear[0].edge = tetNearMap[next[0]][next[1]];
		e.useTets = [];//[ { dir:
		e.checkDirs = [];//[ { dir:
		if( e.inTets.length == 1 ) {
			e.useTets.push( { dir:0, tet:e.inTets[0] } );
			e.useTets.push( { dir:[e.nextNear[0].ofs1,e.nextNear[0].ofs2], tet:e.nextNear[0].edge.inTets[0]  });
			e.useTets.push( { dir:e.near[0].dir, tet:e.near[0].tet } );
			e.useTets.push( { dir:e.near[1].dir, tet:e.near[1].tet } );
		}else {
			e.useTets.push( { dir:0, tet:e.inTets[0]} );
			e.useTets.push( { dir:0, tet:e.inTets[1]} );
			e.useTets.push( { dir:0, tet:e.inTets[2]} );
			const otherTets = e.nextNear[0].edge.inTets;
			const otherDir = e.nextNear[0].ofs1 || e.nextNear[0].ofs2;
			e.useTets.push( { dir:otherDir, tet:otherTets[0]} );
			e.useTets.push( { dir:otherDir, tet:otherTets[1]} );
			e.useTets.push( { dir:otherDir, tet:otherTets[2]} );
		}
		for( let tet of e.useTets ) {
			if( "number" === typeof tet.dir ) {  
				if ( tet.dir )
					if( e.checkDirs.findIndex( (d)=>d===tet.dir ) < 0 ){
						e.checkDirs.push( tet.dir );
					}
			} else {
				e.checkDirs.push( tet.dir );				
			}
		}
	}

	const faceMetric = [];

{
	// [odd][tet 0-5][edge 0-6]-> tetNearMap[edge]
	const tetNewEdgeArray = [];
	for( let odd = 0; odd < 2; odd++ ) {
		const oddarr = [];
		tetNewEdgeArray.push( oddarr );
		for( let tet=0; tet < 5; tet++ ) {
			const tarr = [-1,-1,-1,-1,-1,-1];
			oddarr.push(tarr);
			for( let edg = 0; edg < 6; edg++ ) {
				for( let edge = 0; edge < 18; edge++ ) {
					const e = tetNearMap[odd][edge];
					for( let n of e.near ) {
						if( n.tfrm === tet && n.tetEdge === edg )
						{
							if( tarr.findIndex( (ed)=>ed===edge ) < 0 )
								tarr[edg]= edge;
						}
					}

				}			
			}
		}
	}






	const tetarray = [];
	for( let odd = 0; odd < 2; odd++ ) {
		const oddarr = [];
		tetarray.push( oddarr );
		for( let tet=0; tet < 5; tet++ ) {
			const tarr = [];
			oddarr.push(tarr);
			for( let edge = 0; edge < 18; edge++ ) {
				const e = tetNearMap[odd][edge];
				if( e.inTets.findIndex( t=>t===tet ) >= 0 )
					tarr.push(e);
			}			
		}
	}



	const tetEdgeArray = [];
	for( let odd = 0; odd < 2; odd++ ) {
		const oddarr = [];
		tetEdgeArray.push( oddarr );
		for( let tet=0; tet < 5; tet++ ) {
			const tarr = [];
			oddarr.push(tarr);
			for( let edg=0; edg < 6; edg++ ) {
				const earr = [];
				tarr.push(earr);
				for( let edge = 0; edge < 18; edge++ ) {
					const e = tetNearMap[odd][edge];
					for( let n of e.near ) {
						
						//if( e.inTets.findIndex( t=>t===tet ) >= 0 )
						tarr.push(e);
					}
				}			
			}
		}
	}
	

	const array = [];
	const array2 = [];
	for( let odd = 0; odd < 2; odd++ ) {
		const oddarr = [];
		const oddarr2 = [];
		array.push( oddarr );
		array2.push( oddarr2 );
		for( let tet=0; tet < 5; tet++ ) {
			
			const tetarr = [];
			const tetarr2 = [];
			oddarr.push(tetarr );
			oddarr2.push(tetarr2 );
			for( let face = 0; face < 7; face++ ) {
			for( let edg = 0; edg < 6; edg++ ) {
			for( let edge = 0; edge < 18; edge++ ) {
				const e = tetNearMap[odd][edge];
				{
					for( let t of e.inTets ) {
						if( tet === t ) {
							tetarr.push( edge );
							for( let n of e.near ) {
								if( n.tfrm === tet ) {
									{
										for( let arr = 0; arr < facePointIndexesOriginal[odd][face].length; arr++ ){
											let fn;
											for( fn = 0; fn < 3; fn++ ) {
												const fnum = facePointIndexesOriginal[odd][face][arr][fn];
												if( fnum == n.tetEdge && fnum == edg ) {
													if( !n.faces ) n.faces = [face];
													else n.faces.push(face );
									//console.log( "Added face", tet,face, n );
													break;
												}
											}
											if( fn < 3 ) break;
										}
										tetarr2.push( n );
									}
								}
							}
						}
					} 
				}
			}
			}
			}
		}
	} 


	// the lowest level path I might have
	// odd.tet.edge.face goes to  odd1.tet1.edge  face(s) 

	// // 2 5 7 (3/4)

	for( let odd = 0; odd < 2; odd++ ) {
		const oddarr = [];
		faceMetric.push( oddarr );
		
		for( let tet=0; tet < 5; tet++ ) {
			
			const tetarr = [];
			oddarr.push(tetarr );

			for( let f = 0; f < 7; f++ ) {
				const facearr = [];
				tetarr.push(facearr );
				for( let edg = 0; edg < 6; edg++ ) {
					const edgeArr=[];
					facearr.push( edgeArr );
	        			// mulitple targets available from this face...
					for( let edge=0; edge<18; edge++ ) {
						const e = tetNearMap[odd][edge];
						for( let n of e.near )
						{
							if( n.tetEdge === edg && n.tfrm === tet )
							for( let t of n.faces ) {
								if( t === f ) {
									// this face is in those near the edge, and in this tet..
									//console.log( "This is a desired entry", odd, tet, f, edge, e, n );
									edgeArr.push( { edge:e, n:n } );
								}
							}			
						}
					}
				}
			}
		}
	}


	console.log( "tets:", faceMetric );
	console.log( "tets:", array );
	console.log( "tets:", array2 );


	

}

	const edgeGeometryIndex = [
		[    
		     [ 0,   0, 0, 0,  0,   5  ] // lower left forward even
		   , [ 4,   2, 6, 0,  4,   5  ]
		   , [ 5,   1, 4, 1,  4,   5  ]
		   , [ 1,   3, 2, 1,  0,   5  ]
		   , [ 0,   1, 0, 4,  0,   5  ]
		]

		,[
			 [  0, 2, 2, 0, 0, 2 ]
			,[  4, 4, 0, 4, 0, 0 ]
			,[  5, 6, 3, 4, 1, 2 ]
			,[  1, 0, 1, 0, 1, 0 ]
		 	,[  0, 0, 0, 2, 1, 4 ] // center.
		]
	];


	// these are bits that are going to 0.
	const tetMasks = [ [ 0, 2|4, 1|2|4, 1|2, 1|2|4 ], [ 2, 4|1, 1|4|2, 1, 1|2|4 ] ];

	function  moveNear(a,b){
		//const d1 = 2*(b[0]-a[0]);
		//const d2 = 2*(b[1]-a[1]);
		//const d3 = 2*(b[2]-a[2]);
		//const dlen = Math.sqrt(d1*d1+d2*d2+d3*d3);
		{
			lnQA.set( 0, a[0], a[1], a[2] ).update();
			lnQB.set( 0, b[0], b[1], b[2] ).update();
			const newB = lnQA.applyDel( lnQB.up(), -1.0 );
			lnQB.set( newB, false ).update();
			lnQB.freeSpin( lnQA.θ, lnQA );
			//const newB2 = lnQA.applyDel( lnQB.up(), 1.0 );
			
			b[0] = lnQB.x;
			b[1] = lnQB.y;
			b[2] = lnQB.z;
		}
	}
	

	class TetVertBase{ 
		constructor( p, n, invert, p1, p2, p3, offset, face, tet, odd ) {
			this.invert = invert;
			this.p = p;
			this.n = n;
			this.nError = false;
			this.face = face;
			this.offset = offset;
			this.tet = tet;
			//console.log( "set normal to:", this.n );
			this. sources=[p1, p2, p3, null]
			this.elements=[p1.type1,p1.type2,p2.type1,p2.type2,p3.type1,p3.type2,0,0]
			this. eleDels=[ p1.typeDelta, p2.typeDelta,p3.typeDelta,0 ] ;
			this.odd = odd;
			p1.normalSources.push( this );
			p2.normalSources.push( this );
			p3.normalSources.push( this );
		}
	
	
		update( pCenter, fnorm, p1, p2, p3 ) {
			this.p[0] = (this.p[0] + pCenter[0])/2;
			this.p[1] = (this.p[1] + pCenter[1])/2;
			this.p[2] = (this.p[2] + pCenter[2])/2;
			//console.log( "fnorm was:", this.n, fnorm);
			moveNear( this.n, fnorm );		
			//console.log( "fnorm became:", fnorm);
			
//			this.n[0] = (this.n[0] + fnorm[0])/2;
			//this.n[1] = (this.n[1] + fnorm[1])/2;
			//this.n[2] = (this.n[2] + fnorm[2])/2;
	
			if( p1 !== this.sources[0] && p1 !== this.sources[1] && p1 !== this.sources[2]  ){
				this.sources[3] = p1;
				this.elements[6] = p1.type1;
				this.elements[7] = p1.type2;
				this.eleDels[3] = p1.typeDelta;
				p1.normalSources.push( this );
			}
			else if( p2 !== this.sources[0] && p2 !== this.sources[1] && p2 !== this.sources[2]  ){
				this.sources[3] = p2;
				this.elements[6] = p2.type1;
				this.elements[7] = p2.type2;
				this.eleDels[3] = p2.typeDelta;
				p2.normalSources.push( this );
			}
			else if( p3 !== this.sources[0] && p3 !== this.sources[1] && p3 !== this.sources[2]  ) {
				this.sources[3] = p3;
				this.elements[6] = p3.type1;
				this.elements[7] = p3.type2;
				this.eleDels[3] = p3.typeDelta;
				p3.normalSources.push( this );
			}
		}
	}
	
		
//----------------------------------------------------------
//  This is the real working fucntion; the above is just
//  static data in the function context; instance data for this function.
	return function(data,dims, opts) {

	const elements = opts.elements;
	var vertices = opts.vertices || []
	, normalVertices = opts.normalVertices || null
	, normalColors = opts.normalColors || null
	, faces = opts.faces || []
	, faceNormals  = []
	const smoothShade = opts.smoothShade || false;
	const showGrid = opts.showGrid;

	const dim0 = dims[0];
	const dim1 = dims[1];
	const dim2 = dims[2];

	const dataOffset = [ 0, 1, dim0, 1+dim0, 0 + dim0*dim1,1 + dim0*dim1,dim0 + dim0*dim1, 1+dim0 + dim0*dim1] ;
	const cellOffset = dataOffset.map( n=>n*6);
	const tetOffset = dataOffset.map( n=>n*5);
	//const pointOffsets = points.map( plane=>plane.map(col=>col.map( val=>[0,0,0] ) ) );

	// indexed with [odd]
	//   [tet] [edge] 
	// edges are also the lines...
	const edgeToComp = [
		[    
		     [                 0,                   1,                   2,                  3,                  4,                    5  ] // lower left forward even
		   , [ cellOffset[4] + 0,   cellOffset[2] + 1,   cellOffset[6] + 2,                  3,  cellOffset[4] + 4,   cellOffset[2] +  5  ]
		   , [ cellOffset[5] + 0,   cellOffset[1] + 1,   cellOffset[4] + 2,  cellOffset[1] + 3,  cellOffset[4] + 4,                    5  ]
		   , [ cellOffset[1] + 0,   cellOffset[3] + 1,   cellOffset[2] + 2,  cellOffset[1] + 3,                  4,   cellOffset[2] +  5  ]
		   , [                 5,   cellOffset[1] + 3,                   4,  cellOffset[4] + 4,  cellOffset[0] + 3,   cellOffset[2] +  5  ]
		]

		,[
			 [                   0, cellOffset[2]  + 2,  cellOffset[2] + 1,                 4,                 3,  cellOffset[2] + 5 ]
			,[   cellOffset[4] + 0, cellOffset[4]  + 2,                  1, cellOffset[4] + 4,                 3,                  5 ]
			,[   cellOffset[5] + 0, cellOffset[6]  + 2,  cellOffset[3] + 1, cellOffset[4] + 4, cellOffset[1] + 3,  cellOffset[2] + 5 ]
			,[   cellOffset[1] + 0,                  2,  cellOffset[1] + 1,                 4, cellOffset[1] + 3,                  5 ]
		 	,[                   4,                  3,  cellOffset[0] + 5, cellOffset[2] + 5, cellOffset[1] + 3,  cellOffset[4] + 4 ] // center.
		 ]
		];


	const tetEdgeOffsets = [ [
		     [            0  ,               0 ,              0  ,             0  ,              0 ,               0  ] // lower left forward even
		   , [ dataOffset[4] ,   dataOffset[2] ,   dataOffset[6] ,              0 ,  dataOffset[4] ,   dataOffset[2]  ]
		   , [ dataOffset[5] ,   dataOffset[1] ,   dataOffset[4] ,  dataOffset[1] ,  dataOffset[4] ,               0  ]
		   , [ dataOffset[1] ,   dataOffset[3] ,   dataOffset[2] ,  dataOffset[1] ,              0 ,   dataOffset[2]  ]
		   , [            0  ,   dataOffset[1] ,              0  ,  dataOffset[4] ,  dataOffset[0] ,   dataOffset[2]  ]
		]
		,[
			 [               0 , dataOffset[2] ,  dataOffset[2],            0 ,             0 ,  dataOffset[2] ]
			,[   dataOffset[4] , dataOffset[4] ,             0 , dataOffset[4],             0 ,              0 ]
			,[   dataOffset[5] , dataOffset[6] ,  dataOffset[3], dataOffset[4], dataOffset[1] ,  dataOffset[2] ]
			,[   dataOffset[1] ,             0 ,  dataOffset[1],            0 , dataOffset[1] ,              0 ]
		 	,[               0 ,             0 ,  dataOffset[0], dataOffset[2], dataOffset[1] ,  dataOffset[4] ] // center.
		 ]
		];



	
	return meshCloud( data );
	//return null;

function makeList() {
		var context_stack = {
			first : null,
			last : null,
			saved : null,
			push(node,q) {
				var recover = this.saved;
				if( recover ) { this.saved = recover.next; recover.node = node; recover.next = null; recover.prior = this.last; }
				else { recover = { node : node, q:q, next : null, prior : this.last }; }
				if( !this.last ) this.last = this.first = recover;
				else { let x, x_=null; for( x = this.first; x; x_=x, x=x.next ) { if( recover.q > x.q ) { 
					// largest q is last in stack.
					if( !x_ ) { recover.next = this.first; this.first.prior=recover; this.first = recover; break; }
					else { x_.next = recover; recover.prior = x_; recover.next = x; x.prior = recover; break;}
				} if( !x ) { if( x_ ) x_.next = this.last = recover; } } }
				this.length++;
			},
			pop() {
				var result = this.last;
				if( !result ) return null;
				if( !(this.last = result.prior ) ) this.first = null;
				result.next = this.saved; this.saved = result;
				this.length--;
				return result.node;
			},
			length : 0,

		};
	return context_stack;

}

function makeQueue() {
	var context_stack = {
		first : null,
		last : null,
		saved : null,
		length:0,
		q : 0,
		push(node,q) {
			var recover = this.saved;
			if( recover ) { this.saved = recover.next; recover.node = node; recover.next = null; recover.prior = this.last; }
			else { recover = { node : node, q:q, next : null, prior : this.last }; }
			if( !this.last ) this.last = this.first = recover;
			else {
				this.last.next = recover;
				this.last = recover;
			}
			this.length++;
		},
		shift() {
			var result = this.first;
			if( !result ) return null;
			if( !(this.first = result.next) ) this.last = null;
			result.next = this.saved; this.saved = result;
			this.length--;
			return result.node;
		},
	};
	return context_stack;

}


function PointState(v,type1,type2,typeDelta) {
	let result = {
		id:pointStateHolder.length,
		normalBuffer:[0,0,0],
		normalSources: [],
		normalSources2: [],
		normalAngle : 0,
		normals : 0,
		vertBuffer:[v[0],v[1],v[2]],
		visits:0,
		invert:false,
		valid : true,
		type1:type1,
		type2:type2,
		typeDelta:typeDelta, // saved just as meta for later
    }
	pointStateHolder.push(result );
	return result;
}

// types is an array of 6 elements.  0-1,  2-3, 4-5  are the textures at the ends 
// of the edges that p1, p2, p3 are on respectivly.
// deltas is an array of 3 floats that is the scale through that map.

function measureTriFace( p1,p2,p3){
	const del1 = [p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2] ];
	const del2 = [p3[0]-p2[0],p3[1]-p2[1],p3[2]-p2[2] ];
	const del3 = [p1[0]-p3[0],p1[1]-p3[1],p1[2]-p3[2] ];
	const l1 = del1[0]+del1[1] +del1[2];
	const l2 = del2[0]+del2[1] +del2[2];
	const l3 = del3[0]+del3[1] +del3[2];
	var l = l1+l2+l3;

	// bigger than the grey circle; which puts them all co-linear.
	if( l > 0.1 ) {
		var a = [0,0,0];
		cross(a, del1, del2 );
		const asqr = Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])/2
		const nA = asqr * MagicScalar;
		return nA; // normalized relative area 0-0.6 is a sliver of a triangle... above this is a reasonable spread.
	}
	return 0;
}



function cross(o,a,b) {
	o[0] = a[1]*b[2]-a[2]*b[1];
	o[1] = a[2]*b[0]-a[0]*b[2];
	o[2] = a[0]*b[1]-a[1]*b[0];
	return o;
}



function meshCloud(data) {
	// values input to this are in 2 planes for lower and upper values
	const meshing = Date.now();	
	for( let a = 0; a < 2; a++ ) for( let b = 0; b < 5; b++ ) for( let c = 0; c < 4; c++ ) vertToData[a][b][c] = dataOffset[vertToDataOrig[a][b][c]];

	// this is a computed lookup from facePointIndexes ([invert][output_face_type][0-1 triangle count][0-3 triangle point index]
	// it is actually edgeToComp[odd][tet][  FPI[invert][face_type][0-1][point indexes] ]
	// index with [odd][tet][invert][output_face_type][0-1 triangle count][0-3 triangle point index]
	const facePointIndexes = [ 
	];

	for( let odd=0; odd < 2; odd++) {
		let t; 
		facePointIndexes.push( t = [] )
		for( let tet = 0; tet < 5; tet++ ){
			// the 2 rows are inverted versions... (could be 1, and flip points here)
			t.push(  [
				[ [ [edgeToComp[odd][tet][facePointIndexesOriginal[0][0][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][0][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][0][0][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[0][1][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][1][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][1][0][2]]]
				, [  edgeToComp[odd][tet][facePointIndexesOriginal[0][1][1][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][1][1][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][1][1][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[0][2][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][2][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][2][0][2]]]
				, [  edgeToComp[odd][tet][facePointIndexesOriginal[0][2][1][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][2][1][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][2][1][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[0][3][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][3][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][3][0][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[0][4][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][4][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][4][0][2]]]
				, [  edgeToComp[odd][tet][facePointIndexesOriginal[0][4][1][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][4][1][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][4][1][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[0][5][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][5][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][5][0][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[0][6][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[0][6][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[0][6][0][2]]] ]
			]
			, [ [   [edgeToComp[odd][tet][facePointIndexesOriginal[1][0][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][0][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][0][0][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[1][1][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][1][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][1][0][2]]]
				, [  edgeToComp[odd][tet][facePointIndexesOriginal[1][1][1][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][1][1][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][1][1][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[1][2][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][2][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][2][0][2]]]
				, [  edgeToComp[odd][tet][facePointIndexesOriginal[1][2][1][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][2][1][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][2][1][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[1][3][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][3][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][3][0][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[1][4][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][4][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][4][0][2]]]
				, [  edgeToComp[odd][tet][facePointIndexesOriginal[1][4][1][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][4][1][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][4][1][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[1][5][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][5][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][5][0][2]]] ]
				, [ [edgeToComp[odd][tet][facePointIndexesOriginal[1][6][0][0]],edgeToComp[odd][tet][facePointIndexesOriginal[1][6][0][1]],edgeToComp[odd][tet][facePointIndexesOriginal[1][6][0][2]]] ]
			] ] )	
		}
	}


	if( dim0*dim1*dim2*6 > sizes ) {
		sizes = dim0 * dim1 * dim2 * 12;
		bits = new Uint16Array(dim0*dim1*dim2);
		visited = new Uint8Array(dim0*dim1*dim2);
		edge_visited = new Uint8Array(dim0*dim1*dim2);
		pointHolder[0] = new Int32Array(sizes);
		crossHolder[0] = new Uint8Array(sizes);
		contentHolder[0] = new Uint8Array(dim0*dim1*dim2*5);  // 1 bit for each tet in each cell. (5)
		for( let zz = normalHolder[0].length; zz < sizes; zz++ ) {
			normalHolder[0].push( null );
		}
	}
	pointStateHolder.length = 0;	
	// all work space has been allocated by this point.
	// now, for each layer, compute inside-outside crossings ('cross').. which interestingly relates to 'cross product' but in a 2D way...

	const points  = pointHolder[0];
	const normals = normalHolder[0];
	const crosses = crossHolder[0];
	const content = contentHolder[0];
	for( let zero = 0; zero < dim0*dim1*dim2; zero++ ) {
		bits[zero] = 0;
		visited[zero] = 0;
		edge_visited[zero] = 0;
		// make sure to reset this... 
		for( let crz = 0; crz < 6; crz++ ) crosses[zero*6+crz] = 0;
		for( let crz = 0; crz < 5; crz++ )  { content[zero*5+crz] = 0; normals[zero*5+crz] = null; }
	}


// for a single block x/y/z, get the 6 unique edges...
function computeEdges( x, y, z ) {
	//		if( x < 10 || x > 20 ) continue;
	let odd = (( x + y + z ) &1);
	cellOrigin[0] = x-dim0/2;
	cellOrigin[1] = y-dim1/2;
	cellOrigin[2] = z-dim2/2;

	const baseHere = (x+0 + y*dim0 + z*(dim0*dim1))*6;
	const baseOffset = x+0 + y*dim0 + z * dim0*dim1;
	const lineArray = linesMin[odd];
	if( bits[baseOffset] ) return;

	let bits_ = 0;

	for( let l = 0; l < 6; l++ ) {
		const p0 = lineArray[l][0];
		const p1 = lineArray[l][1];

		if( (x == (dim0-1)) &&( (p0 & 1) || (p1 &1) )) {
			// this is an overflow, need to push fake data....
			points[baseHere+l] = -1;
			crosses[baseHere+l] = 0;
			continue;
		}
		if( (y == (dim1-1)) &&( (p0 & 2) || (p1 &2) )) {
			// this is an overflow, need to push fake data....
			points[baseHere+l] = -1;
			crosses[baseHere+l] = 0;
			continue;
		}
		if( (z == (dim2-1)) &&( (p0 & 4) || (p1 & 4) )) {
			// this is an overflow, need to push fake data....
			points[baseHere+l] = -1;
			crosses[baseHere+l] = 0;
			continue;
		}

		const data0=baseOffset+dataOffset[p0];
		const data1=baseOffset+dataOffset[p1];

		const d=-data[data0]; const e=-data[data1];

		// test if there is a gap in the surface between these two points, then we need to add 2 faces.
		if( ( d <= 0 && e >0  )|| (d > 0 && e <= 0 ) ){
			let t;
			let normal = null;
			bits_ |= 1<<l;

			
			//console.log( "x, y is a cross:", x+y*dim0,(x+y*dim0)*6, crosses.length, baseOffset+l, x, y, p0, p1, data0, data1, `d:${d} e:${e}` );
			if( e <= 0 ) {
				if( e >-0.999 ) (t = -(e-0.01)/(d-(e-0.01))) 
				else (t = -e/(d-e));
// --V-V-V-V-V-V-V-V-- CREATE OUTPUT POINT(VERTEX) HERE --V-V-V-V-V-V-V-V--
				pointOutputHolder[0] = cellOrigin[0] + geom[p1][0]+( geom[p0][0]- geom[p1][0])* t;
				pointOutputHolder[1] = cellOrigin[1] + geom[p1][1]+( geom[p0][1]- geom[p1][1])* t;
				pointOutputHolder[2] = cellOrigin[2] + geom[p1][2]+( geom[p0][2]- geom[p1][2])* t;
				//console.log( "new point(1):", pointOutputHolder, t, data[data0], data[data1], data0, data1 );

				normal = PointState( pointOutputHolder
					, elements.data[data0]
					, elements.data[data1]
					, t
				);
				//; eventually this needs its normal also... and there's a normalBuffer in it.
				normal.invert = 0; // d is > 0 and e < 0 which puts e outside and d inside
			
				points[baseHere+l] = normal.id;
// --^-^-^-^-^-^-- END OUTPUT POINT(VERTEX) HERE --^-^-^-^-^-^--
			} else {
				if( d >-0.999 ) (t = -(d - 0.01)/(e-(d - 0.01)))  ;
				else (t = -d/(e-d));
// --V-V-V-V-V-V-V-V-- OUTPUT POINT 2 HERE --V-V-V-V-V-V-V-V--
				{
					pointOutputHolder[0] = cellOrigin[0] + geom[p0][0]+( geom[p1][0]- geom[p0][0])* t;
					pointOutputHolder[1] = cellOrigin[1] + geom[p0][1]+( geom[p1][1]- geom[p0][1])* t;
					pointOutputHolder[2] = cellOrigin[2] + geom[p0][2]+( geom[p1][2]- geom[p0][2])* t;
					//console.log( "new point(2):", pointOutputHolder );

					normal = PointState( pointOutputHolder
						, elements.data[data0]
						, elements.data[data1]
						, t
					);
					normal.invert = 1;  // d is < 0 or outside... 
				}
				//; eventually this needs its normal also... and there's a normalBuffer in it.
				points[baseHere+l] = normal.id;
// --^-^-^-^-^-^-- END  OUTPUT POINT 2 HERE --^-^-^-^-^-^--
			}
			crosses[baseHere+l] = 1;
			efQueue( x, y, z, l ); // we will want to output this.
			//console.log( "set position crosses:", x, y, z, baseHere,l, `d:${d} e:${e}`  );
		}
		else {
			//console.log( "x,y does not cross", x, y, z, baseHere, l, `d:${d} e:${e}` ); 
			points[baseHere+l] = -baseHere-l;
			crosses[baseHere+l] = 0;
		}
	}
	
	// if nothing, mark as an 'error' so later if(!bits[]) won't call this function
	if( !bits_ ) bits_ = 0b1000_0000_0000_0000;
	else
		console.log( "ComputedEdges:", x, y,z  );

	// if checking the return value it only wants to know if any; not if error.
	return (bits[baseOffset] = bits_)&0x3F; // just 6 bits is the value of this computation.
}


function computeAllEdges( x, y, z ) {
	computeEdges( x  , y  , z );
	computeEdges( x+1, y  , z );
	computeEdges( x  , y+1, z );
	computeEdges( x+1, y+1, z );
	computeEdges( x  , y  , z+1 );
	computeEdges( x+1, y  , z+1 );
	computeEdges( x  , y+1, z+1 );
	//computeEdges( x+1, y+1, z+1 );
}

	// so at this point I've computed all the cross points
	// all the normals
	// all the centroid/offset points back to the dual phase
	// created the points per-tet-per-cell 
	// now - to actually construct the faces from them.


	function addFace( ai_, bi_, ci_, n ) {
		const ai = ai_.id-1;
		const bi = bi_.id-1;
		const ci = ci_.id-1;
		if( !n ){
			if( smoothShade ) {
				if( opts.geometryHelper ){
					n = [ai_.n,ci_.n,bi_.n];
				} else {
					n = [faceNormals[ai],faceNormals[ci],faceNormals[bi]];// these are three.vectors isntead...
				}
			}else {
				if( opts.geometryHelper )
				{
					const tmp1 = [bi_.p[0]-ai_.p[0], bi_.p[1]-ai_.p[1], bi_.p[2]-ai_.p[2]];
					const tmp2 = [ci_.p[0]-ai_.p[0], ci_.p[1]-ai_.p[1], ci_.p[2]-ai_.p[2]];
					n = cross( [0,0,0], tmp1, tmp2);
					const s = -1/Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);
					n[0] *= s;
					n[1] *= s;
					n[2] *= s;
					//n = new THREE.Vector3(n[0],n[1],n[2]);
				}else {
					const tmp1 = [vertices[bi].x-vertices[ai].x, vertices[bi].y-vertices[ai].y, vertices[bi].z-vertices[ai].z];
					const tmp2 = [vertices[ci].x-vertices[ai].x, vertices[ci].y-vertices[ai].y, vertices[ci].z-vertices[ai].z];
					n = cross( [0,0,0], tmp1, tmp2);
					const s = -1/Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);
					n[0] *= s;
					n[1] *= s;
					n[2] *= s;
					n = new THREE.Vector3(n[0],n[1],n[2]);
				}
			}
		}
		else if( !opts.geometryHelper ){
			n = [faceNormals[ai],faceNormals[ci],faceNormals[bi]];// these are three.vectors isntead...
		}else {
			//let x = n[1];
			//n[1] = n[2];
			//n[2] = x;
		}

		if( opts.geometryHelper )	{
			return opts.geometryHelper.addFace( ai, ci, bi, n, false	);
		}
		let f;
		return faces.push( f = new THREE.Face3( ai, ci, bi, n ) );

	}
	var outX, outY, outZ;
	function addPoint( p, n ) {
		if( opts.geometryHelper ) {
			let normal = opts.geometryHelper.addPoint( p.p
					, null, null // texture, and uv[1,0] 
					, [0xA0,0x00,0xA0,255] // edge color
					, [0x11, 0x11, 0x11, 255] // face color
					, [0,0,0] // normal *needs to be updated*;
					, 100 // pow
					, false // use texture
					, false // flat
					, false // decal texture?
					, [outX,outY,outZ]  // unit modulous of this point.
					, false
			);
			lnQA.set( 0, p.n[0], p.n[1], p.n[2] ).update();
			const an = lnQA.up();
			faceNormals.push( an );
			p.id = normal.id+1;
			return p;
		}else {
			if( smoothShade ) {
				if( !p.id ) {
					p.id = (vertices.push(new THREE.Vector3( p.p[0],  p.p[1], p.p[2] )),vertices.length-1)+1;
					if( n ) {
						lnQA.set( 0,n[0],n[1],n[2] ).update();
						const an = lnQA.up();
						faceNormals.push( an );
					} else {
						if( p.invert ) {
							lnQA.set( 0, p.n[0], p.n[1], p.n[2] ).update();

						}else
						lnQA.set( 0, p.n[0], p.n[1], p.n[2] ).update();
						const an = lnQA.up();
						faceNormals.push( an );
					}
					if(  normalVertices){
						lnQA.set( 0, p.n[0], p.n[1], p.n[2] ).update();
						const an = lnQA.up();
						normalVertices.push( new THREE.Vector3( p.p[0],p.p[1],p.p[2]+0.02 ))
						normalVertices.push( new THREE.Vector3( p.p[0]+an.x*1.3,p.p[1]+an.y*1.3,p.p[2]+an.z*1.3));
						normalColors.push( new THREE.Color( 0,0.7, 0.7,1.0 ))
						normalColors.push( new THREE.Color( 0,0.7, 0.7,1.0 ))
					}
				}
				return p;//p.id - 1;
			}else {
				let newId = (vertices.push(new THREE.Vector3( p.p[0],  p.p[1], p.p[2] )),vertices.length-1)+1;
				if( n ) {
					lnQA.set( 0,n[0],n[1],n[2] ).update();
					const an = lnQA.up();
					faceNormals.push( an );
				} else {
					lnQA.set( 0, p.n[0], p.n[1], p.n[2] ).update();
					const an = lnQA.up();
					faceNormals.push( an );
				}
				p.id = newId;  // this will get updated dynamically
				return p;
			}
		}
	}
	//https://en.wikipedia.org/wiki/Skew_lines#Nearest_Points


	//const drawToggle = 0xFFFFFFFF;
	//const drawToggle = 0xFFff;
	//const drawToggle = 0xFF00;
	//const drawToggle = 0x10;
	//const drawToggle = 0x0900;
	//const drawToggle = 0xFF;
	//const drawToggle = 0xF0;
	//const drawToggle = 0xc0;
	const drawToggle = 0xffff;
	const ifDraw = (n)=>drawToggle & (1<<n)


	//https://en.wikipedia.org/wiki/Skew_lines#Nearest_Points

	function getFold( faceNormal, p1, p2, p3, p4 ) {
		//p1 = vertices[p1];
		//p2 = vertices[p2];
		//p3 = vertices[p3];
		//p4 = vertices[p4];

		const del1 = [ p2[0]-p1[0], p2[1]-p1[1], p2[2]-p1[2] ];

		const d1 = [p1[0]-p3[0], p1[1]-p3[1], p1[2]-p3[2] ];
		const d2 = [p2[0]-p4[0], p2[1]-p4[1], p2[2]-p4[2] ];
		
		const l1 = 1/Math.sqrt( d1[0]*d1[0] + d1[1]*d1[1] + d1[2]*d1[2]);
		const l2 = 1/Math.sqrt( d2[0]*d2[0] + d2[1]*d2[1] + d2[2]*d2[2]);
		const n1 = [d1[0]*l1,d1[1]*l1,d1[2]*l1];
		const n2 = [d2[0]*l2,d2[1]*l2,d2[2]*l2];
		const c = [0,0,0];
		cross(c,n1,n2);
		const c1 = [0,0,0];
		cross(c1,n1,c);
		const c2 = [0,0,0];
		cross(c2,n2,c);
	
		const dot1 = del1[0]*c2[0] + del1[1]*c2[1] + del1[2]*c2[2] ;
		const dot2 = n1[0]*c2[0] + n1[1]*c2[1] + n1[2]*c2[2];
		if( dot2 ){ // if !dot2, the lines are parallel and all pionts are parallel.
			// dot1/dot2 with dot2 === 1 is a fault... just a guess at handling this.
			const closeP1 = [p1[0] + (( dot1/dot2  )*n1[0]),p1[1] + (( dot1/dot2  )*n1[1]),p1[2] + (( dot1/dot2  )*n1[2])]
		        
			const dot3 = -del1[0]*c1[0] + -del1[1]*c1[1] + -del1[2]*c1[2] ;
			const dot4 = n2[0]*c1[0] + n2[1]*c1[1] + n2[2]*c1[2];
		        
			const closeP2 = [p2[0] + (( dot3/dot4  )*n2[0]),p2[1] + (( dot3/dot4  )*n2[1]),p2[2] + (( dot3/dot4  )*n2[2])]
		        
			const crossDel = [closeP1[0]-closeP2[0],closeP1[1]-closeP2[1],closeP1[2]-closeP2[2]];
			if( ( crossDel[0] * faceNormal.x + crossDel[1] * faceNormal.y + crossDel[2] * faceNormal.z ) > 0 )
				return 1;
			return 0;

		}
		return -1;

		// compare the length, and prefer to fold on the shorter one.
		if( d1[0]*d1[0]+d1[1]*d1[1]+d1[2]*d1[2] < d2[0]*d2[0]+d2[1]*d2[1]+d2[2]*d2[2] ) {
			//console.log( "YES")
			return 1;
		}
		//console.log( "NO", d1, d2)
		return 0;
	}


	function emitHex(offset,p, dir, cIndx) {
		if( !p[0] || !p[1] || !p[2] ) return;	
		const n= [0,0,0];//p[0].n.slice(0,3);
		const pn = p[0].n;					
		const pt = [0,0,0];
		for( let p_ of p){
			moveNear( pn, p_.n );
			pt[0] += p_.p[0];
			pt[1] += p_.p[1];
			pt[2] += p_.p[2];
			n[0] += p_.n[0];
			n[1] += p_.n[1];
			n[2] += p_.n[2];
		}
		pt[0] /= 6;
		pt[1] /= 6;
		pt[2] /= 6;
		n[0] /= 6;
		n[1] /= 6;
		n[2] /= 6;

		
		const psh = pointStateHolder[ points[(offset + dataOffset[dir]) *6 + cIndx ] ];
		if( !psh ) {
			//console.log( "edge is bad..." );
			return;
		}
/*
		if( normalVertices){
			const up = lnQA.set( 0, p[0].n[0],p[0].n[1],p[0].n[2]).update().up();
			normalVertices.push( new THREE.Vector3( p[0].p[0],p[0].p[1],p[0].p[2]+0.02 ))
			normalVertices.push( new THREE.Vector3( p[0].p[0]+up.x*1.3,p[0].p[1]+up.y*1.3,p[0].p[2]+up.z*1.3));
			normalColors.push( new THREE.Color( 0.8,0.8, 0.8,1.0 ))
			normalColors.push( new THREE.Color( 0.8,0.8, 0.8,1.0 ))
		}
*/
		pt[0] = (pt[0] * 3 + psh.vertBuffer[0])/4;
		pt[1] = (pt[1] * 3 + psh.vertBuffer[1])/4;
		pt[2] = (pt[2] * 3 + psh.vertBuffer[2])/4;
		const up = lnQA.set( 0, n[0],n[1],n[2]).update().up();
		const vpc = addPoint( {p:0?psh.vertBuffer:pt, n:n, id:0} );

		const vp0 = addPoint( p[0] );
		const vp1 = addPoint( p[1] );
		const vp2 = addPoint( p[2] );
		const vp3 = addPoint( p[3] );
		const vp4 = addPoint( p[4] );
		const vp5 = addPoint( p[5] );
		//_debug_output && console.log( "E?" );
		//console.log( "Doing hex..." );
		if( !psh.invert  ) {

			let fold = getFold( up, vpc.p, vp0.p, vp1.p, vp2.p );
			if( fold >= 0) {
				addFace( vpc, vp1, vp0 );
				addFace( vpc, vp2, vp1 );
			}else {
				//console.log( "This is a pinch fix?");
				addFace( vpc, vp1, vp0 );
				addFace( vpc, vp2, vp1 );

			}

			fold = getFold( up, vpc.p, vp2.p, vp3.p, vp4.p );
			if( fold >= 0) {
				addFace( vpc, vp3, vp2 );
				addFace( vpc, vp4, vp3 );
			}else{
				//console.log( "This is a pinch fix?");
				addFace( vpc, vp3, vp2 );
				addFace( vpc, vp4, vp3 );

			}

			fold = getFold( up, vpc.p, vp4.p, vp5.p, vp0.p );
			if( fold >= 0) {
				addFace( vpc, vp5, vp4 );
				addFace( vpc, vp0, vp5 );
			}else {
				//console.log( "This is a pinch fix?");
				addFace( vpc, vp5, vp4 );
				addFace( vpc, vp0, vp5 );
			}
		}else {

			let fold = getFold( up, vpc.p, vp0.p, vp1.p, vp2.p );
			if( fold >= 0) {
				addFace( vpc, vp0, vp1 );
				addFace( vpc, vp1, vp2 );
				}else {
				//console.log( "This is a pinch fix?");
				addFace( vpc, vp0, vp1 );
				addFace( vpc, vp1, vp2 );
	
			}

			fold = getFold( up, vpc.p, vp2.p, vp3.p, vp4.p );
			if( fold >= 0) {
				addFace( vpc, vp2, vp3 );
				addFace( vpc, vp3, vp4 );
			}else{
				//console.log( "This is a pinch fix?");
				addFace( vpc, vp2, vp3 );
				addFace( vpc, vp3, vp4 );
	
			}

			fold = getFold( up, vpc.p, vp4.p, vp5.p, vp0.p );
			if( fold >= 0) {
				addFace( vpc, vp4, vp5 );
				addFace( vpc, vp5, vp0 );
			}else {
				//console.log( "This is a pinch fix?");
				addFace( vpc, vp4, vp5 );
				addFace( vpc, vp5, vp0 );
			}

		}

	}

	function emitSquare(p, offset, dir, edge) {

		const n= [0,0,0];//p[0].n.slice(0,3);
		const pnsrc = p[0].n;					
		const pt = [0,0,0];

/*
		if( edge ===2 )
		if(  normalVertices){
			const up = lnQA.set( 0, pnsrc[0],pnsrc[1],pnsrc[2]).update().up();
			normalVertices.push( new THREE.Vector3( p[0].p[0]-0.02,p[0].p[1]-0.02,p[0].p[2]+0.02 ))
			normalVertices.push( new THREE.Vector3( p[0].p[0]-0.02+up.x*1.3,p[0].p[1]-0.02+up.y*1.3,p[0].p[2]+up.z*1.3));
				normalColors.push( new THREE.Color( 1.0,1.0, 1,1.0 ))
				normalColors.push( new THREE.Color( 1.0,1.0, 1,1.0 ))
		}
*/

		for( let pn = 0; pn < 4; pn++){
			const p_ = p[pn];
			moveNear( pnsrc, p_.n );
			pt[0] += p_.p[0];
			pt[1] += p_.p[1];
			pt[2] += p_.p[2];
			n[0] += p_.n[0];
			n[1] += p_.n[1];
			n[2] += p_.n[2];

		}
		pt[0] /= 4;
		pt[1] /= 4;
		pt[2] /= 4;
		n[0] /= 4;
		n[1] /= 4;
		n[2] /= 4;
		const up = lnQA.set( 0, n[0],n[1],n[2]).update().up();
		const psh = pointStateHolder[ points[(offset + dataOffset[dir]) *6 + edge ] ];

		if( !psh ) {
			console.log( "edge is bad..." );
			if( 0 &&  normalVertices){
				const up = lnQA.set( 0, p[0].n[0],p[0].n[1],p[0].n[2]).update().up();
				normalVertices.push( new THREE.Vector3( p[0].p[0],p[0].p[1],p[0].p[2]+0.02 ))
				normalVertices.push( new THREE.Vector3( p[0].p[0]+up.x*1.3,p[0].p[1]+up.y*1.3,p[0].p[2]+up.z*1.3));
				normalColors.push( new THREE.Color( 1.0,0.0, 0,1.0 ))
				normalColors.push( new THREE.Color( 1.0,0.0, 0,1.0 ))
			}
			return;
		}
/*
		if( edge == 2)
		if( normalVertices){
			//const up = lnQA.set( 0, p[0].n[0],p[0].n[1],p[0].n[2]).update().up();

			normalVertices.push( new THREE.Vector3( pt[0],pt[1],pt[2]+0.02 ))
			normalVertices.push( new THREE.Vector3( pt[0]+up.x*1.3,pt[1]+up.y*1.3,pt[2]+up.z*1.3));
			normalColors.push( new THREE.Color( 1.0,0.0, 0,1.0 ))
			normalColors.push( new THREE.Color( 1.0,0.0, 0,1.0 ))
		}
*/
		pt[0] = (pt[0] * 2 + psh.vertBuffer[0])/3;
		pt[1] = (pt[1] * 2 + psh.vertBuffer[1])/3;
		pt[2] = (pt[2] * 2 + psh.vertBuffer[2])/3;
	
		const vpc = addPoint( {p:0?psh.vertBuffer:pt, n:n, id:0} );
		const vp0 = addPoint( p[0] );
		const vp1 = addPoint( p[1] );
		const vp2 = addPoint( p[2] );
		const vp3 = addPoint( p[3] );
		const fold = getFold( up, vp0.p, vp1.p, vp2.p, vp3.p );
		//_debug_output && console.log( "S?" );
		if( psh && psh.invert  ) {
			//console.log( "sq face 1", dir, edge, faces.length)
			//return;
			if(1) {
				addFace( vpc, vp1, vp0 );
				addFace( vpc, vp2, vp1 );
				addFace( vpc, vp3, vp2 );
				addFace( vpc, vp0, vp3 );
			}
			else if( fold >= 0 ) {
				addFace( vp3, vp1, vp0 );
				addFace( vp3, vp2, vp1 );
			}else {
				addFace( vp0, vp2, vp1 );
				addFace( vp0, vp3, vp2 );
							
			}
		}else {
			//console.log( "sq face 2", dir,edge, faces.length)
			//return;
			if(1) {
				addFace( vpc, vp0, vp1 );
				addFace( vpc, vp1, vp2 );
				addFace( vpc, vp2, vp3 );
				addFace( vpc, vp3, vp0 );
			} 
			else if( fold >= 0 ) {
				addFace( vp3, vp0, vp1 );
				addFace( vp3, vp1, vp2 );
			}else {
				addFace( vp0, vp1, vp2 );
				addFace( vp0, vp2, vp3 );

			}
		}
	}

	const ff_queue = makeQueue();
	const ef_queue = makeQueue(); // edge follow queue

	let ff_queue_root = null;
	let ff_queue_prior = null;
	let ff_queue_p2 = null;

	function ffQueue(x,y,z,e) {
		if( x < 0 || y < 0 || z < 0 || x >= dim0 || y >= dim1 || z >= dim2 ) return;
		const offset = (x + (y*dim0) + z*dim0*dim1);
		if( !visited[offset]) {
			const tag = {x:x,y:y,z:z,e:e};

		if( normalVertices){
			if( ff_queue_p2 ) {
				normalVertices.push( new THREE.Vector3( ff_queue_p2.x,ff_queue_p2.y, ff_queue_p2.z ))
				normalVertices.push( new THREE.Vector3( tag.x,tag.y, tag.z));
				normalColors.push( new THREE.Color( 0.0,0.0,1.0,1.0 ))
				normalColors.push( new THREE.Color( 0.0,0.0,1.0,1.0 ))
			}

			if( ff_queue_prior ) {
				normalVertices.push( new THREE.Vector3( ff_queue_prior.x,ff_queue_prior.y, ff_queue_prior.z ))
				normalVertices.push( new THREE.Vector3( tag.x,tag.y, tag.z));
				normalColors.push( new THREE.Color( 1.0,0.0, 0,1.0 ))
				normalColors.push( new THREE.Color( 1.0,0.0, 0,1.0 ))
			} else {
				if( !ff_queue_root )
					ff_queue_root = ff_queue_prior;
			}
			
			if( ff_queue_root ) {
				normalVertices.push( new THREE.Vector3( ff_queue_root.x,ff_queue_root.y, ff_queue_root.z ))
				normalVertices.push( new THREE.Vector3( tag.x,tag.y, tag.z));
				normalColors.push( new THREE.Color( 1.0,1.0, 0,1.0 ))
				normalColors.push( new THREE.Color( 1.0,1.0, 0,1.0 ))
			}
		}
			//console.log( "adding:", x, y, z );
			// each cell only needs bits once...
			visited[offset] = 1;
			ff_queue_prior = tag;
			ff_queue_p2 = tag;
			ff_queue.push( tag );
			return tag;
		}
		//console.log( "already visited:", x, y, z );
	}


	function efQueue(x,y,z,e) {
		if( x < 0 || y < 0 || z < 0 || x >= dim0 || y >= dim1 || z >= dim2 ) return;
		const offset = (x + (y*dim0) + z*dim0*dim1);
		if( !edge_visited[offset]) {
			const tag = {x:x,y:y,z:z,e:e};
			ef_queue.push( tag );
			edge_visited[offset] = 1;
			return tag;
		}
	}


	function ffQueueMark() {
		ff_queue_root = ff_queue_prior;
	}
	function ffQueueEnd() {
		ff_queue_root = ff_queue_prior = null;
	}

	// this processes the 5 tets within a cube
	// each tet results in a normal[] member which has the face and tet that particular point is.
	// now, what's actually used is the midpoint between the points in each tet, so each tet
	// has a single point result in it (with a face)

	function processCube( x, y, z, from, tetPrior ) {
		const dataOffset = x + (y*dim0) + z*dim1*dim0;
		let didTet = [];
		// this computes normals at the points on the tet's face.
		// the face's point-normal can be determined here...
		if( bits[dataOffset] & (0x1f<<6) ) {
			// already checked, and has content.
			return true;
		}
		if( visited[dataOffset]) return false;

		//if( !bits[dataOffset] ) {
		//	if( !computeEdges( x, y, z ) ) ;//return;
		//}

		let tetSkip = 0;
		const baseOffset = (x + (y*dim0) + z*dim0*dim1)*6;
		const normOffset = (x + (y*dim0) + z*dim0*dim1)*5; // 1 point-norm per tet
		if( x >= (dim0-1)) tetSkip |= 1;
		if( y >= (dim1-1)) tetSkip |= 2;
		if( z >= (dim2-1)) tetSkip |= 4;
		const odd = (( x + y + z ) &1);
		let tv = null;
		for( let tet = 0; tet < 5; tet++ ) {
			if( tetMasks[odd][tet] & tetSkip ) continue;
			const edgeChecks = edgeToComp[odd][tet];
			let invert = 0;
			let useFace = 0;

			// this is 'valid combinations' check.
			// 
			for( let n = 0; n < 6; n++ ) {
				if( !bits[dataOffset+tetEdgeOffsets[odd][tet][n]]  ) {
					const offset = geom[ edgeGeometryIndex[odd][tet][n] ];
					computeEdges( x + offset[0], y+offset[1], z+offset[2] );
				}
			}

			if( crosses[ baseOffset+edgeChecks[0] ] ) {
				//console.log( `Output: odd:${odd} tet:${tet} x:${x} y:${y} a:${JSON.stringify(a)}` );
				if( crosses[ baseOffset+edgeChecks[1] ] ) {
					if( crosses[ baseOffset+edgeChecks[2] ] ) {
						useFace = 1;								
						invert = ( data[dataOffset+vertToData[odd][tet][0]] >= 0 )?1:0;
					} else {
						if( crosses[ baseOffset+edgeChecks[4] ] && crosses[ baseOffset+edgeChecks[5] ]) {
							useFace = 2;
							invert = ( data[dataOffset+vertToData[odd][tet][0]] >= 0 )?1:0 ;
						}
					}
				} else {
					if( crosses[ baseOffset+edgeChecks[2]] && crosses[ baseOffset+edgeChecks[3]] && crosses[ baseOffset+edgeChecks[5] ] ) {
						useFace = 3;
						invert = ( data[dataOffset+vertToData[odd][tet][0]] >= 0 )?1:0  ;
					}else if( crosses[ baseOffset+edgeChecks[3]] && crosses[ baseOffset+edgeChecks[4] ] ) {
						// source point is 1
						useFace = 4;
						invert = ( data[dataOffset+vertToData[odd][tet][0]] >= 0 )?1:0
					}
				}
			} else {
				if( crosses[ baseOffset+edgeChecks[1] ] ) {
					if( crosses[ baseOffset+edgeChecks[2] ] && crosses[ baseOffset+edgeChecks[3] ] && crosses[ baseOffset+edgeChecks[4] ]) {
						useFace = 5;
						invert = ( data[dataOffset+vertToData[odd][tet][1]] < 0 )  ?1:0
					} else if( crosses[ baseOffset+edgeChecks[3]] && crosses[ baseOffset+edgeChecks[5] ] ) {
						useFace = 6;
						invert = ( data[dataOffset+vertToData[odd][tet][1]] >= 0 ) ?1:0
					}
				} else {
					if( crosses[ baseOffset+edgeChecks[2] ] && crosses[ baseOffset+edgeChecks[4]] && crosses[ baseOffset+edgeChecks[5] ] ) {
						useFace = 7;
						invert = ( data[dataOffset+vertToData[odd][tet][2]] >= 0 ) ?1:0
					}
				}
			}

			// compute the point-normal of the face.
			// the averaging of near normals on the points, which are then
			// re-averaged to the face normal would
			// still just be the face normal, with a lot less extra steps.
			if( useFace-- ) {
				const fpi = facePointIndexes[odd][tet][invert][useFace];
				const pCenter = [0,0,0];
				let edges = 0;
				let fixed = false;
				//console.log( "adding face:", x,y,z, useFace, tet );
				for( var tri=0;tri< fpi.length; tri++ ){
					// these points are just the half points on the geometry.
					// and what I'm computing is their surface average...
					const ai = points[baseOffset+fpi[tri][0]];
					const bi = points[baseOffset+fpi[tri][1]];
					const ci = points[baseOffset+fpi[tri][2]];
					if( bi < 0 ){
						console.log( "How many zeros do we get(b)?", useFace,facePointIndexes, facePointIndexesOriginal[odd][useFace],"xyz:",x,y,z, "ott:",odd,tet,tri, bi, baseOffset, baseOffset+fpi[tri][0], baseOffset+fpi[tri][1], baseOffset+fpi[tri][2], );
						continue;
					}
					if( ci < 0){
						console.log( "How many zeros do we get(c)?",useFace, "xyz:", x,y,z,"ott:",odd,tet,tri, ci,baseOffset, baseOffset+fpi[tri][0], baseOffset+fpi[tri][1], baseOffset+fpi[tri][2], );
						continue;
					}
					// ai, bi, ci are indexes into computed pointcloud layer.
// --V-V-V-V-V-V-V-V-- GENERATE POINT NORMALS --V-V-V-V-V-V-V-V--
					//  https://stackoverflow.com/questions/45477806/general-method-for-calculating-smooth-vertex-normals-with-100-smoothness
					// suggests using the angle as a scalar of the normal.
					
					// a - b - c    c->b a->b
					const pA = pointStateHolder[ai];
					const pB = pointStateHolder[bi];
					const pC = pointStateHolder[ci];
					const vA = pointStateHolder[ai].vertBuffer;
					const vB = pointStateHolder[bi].vertBuffer;
					const vC = pointStateHolder[ci].vertBuffer;
					pCenter[0] = (vA[0]+vB[0]+vC[0])/3;
					pCenter[1] = (vA[1]+vB[1]+vC[1])/3;
					pCenter[2] = (vA[2]+vB[2]+vC[2])/3;


					let v1, v2, v3;
					const AisB =  ( ( vA[0] === vB[0] ) && ( vA[1] === vB[1]  ) && ( vA[2] === vB[2]  ) );
					const AisC =  ( ( vA[0] === vC[0] ) && ( vA[1] === vC[1]  ) && ( vA[2] === vC[2]  ) );
					const BisC =  ( ( vB[0] === vC[0] ) && ( vB[1] === vC[1]  ) && ( vB[2] === vC[2]  ) );
					if( AisB || BisC || AisC ) {
						edges |= 0x1 << tet;

						const getNorm = [];
						pA.normalSources.forEach( source=>{
							getNorm.push(source);
						});
						pB.normalSources.forEach( source=>{
							if( !getNorm.find(n=>n===source))
								 getNorm.push(source);
						});
						pC.normalSources.forEach( source=>{
							if( !getNorm.find(n=>n===source))
								getNorm.push(source);
						});
						if( getNorm.length> 0 ) {
							//console.log( "Have some already near candidates to build a normal from?", getNorm );
							const n = [0,0,0];
							const start = getNorm[0].n;
							getNorm.forEach( tet=>{
								moveNear( start, tet.n);
								n[0] += tet.n[0];
								n[1] += tet.n[1];
								n[2] += tet.n[2];
							})
							fnorm[0] = n[0]/ getNorm.length;
							fnorm[1] = n[1]/ getNorm.length;
							fnorm[2] = n[2]/ getNorm.length;
						}
						else {
							console.log( "have to do something...")	;

						if( from >= 0 ) {
							const tetFrom = didTet[0] || normals[from*5+tetPrior];
							const nprior = tetFrom.n;
							fnorm[0] = nprior[0];
							fnorm[1] = nprior[1];
							fnorm[2] = nprior[2];
						/*
							if(  normalVertices){
								//console.log( "Drawing normal normal" );
								//const up = lnQA.set( 0, tv.n[0],tv.n[1],tv.n[2]).update().up();
								normalVertices.push( new THREE.Vector3( pCenter[0],pCenter[1],pCenter[2]+0.02 ))
								normalVertices.push( new THREE.Vector3( tetFrom.p[0],tetFrom.p[1],tetFrom.p[2]));
								normalColors.push( new THREE.Color( 1.0,0.0,0,1.0 ))
								normalColors.push( new THREE.Color( 1.0,1.0,1.0,1.0 ))
							}			
						*/
						}
					}

						if(0)
						console.log( "zero size tri-face", x, y, z, odd, tet, tri
							, useFace, AisB,AisC,BisC 
							, vA, vB, vC
							);
						fixed = true;
						//fnorm[0] = 0;
						//fnorm[1] = 0; // y is always 0
						//fnorm[2] = 0;
					}else {
						v1 = vA;
						v2 = vB;
						v3 = vC;
						//console.log( "computing normal fnorm..." );
						fnorm[0] = v2[0]-v1[0];fnorm[1] = v2[1]-v1[1];fnorm[2] = v2[2]-v1[2];
						tmp[0] = v3[0]-v1[0];tmp[1] = v3[1]-v1[1];tmp[2] = v3[2]-v1[2];
						let a=fnorm[0], b=fnorm[1];
						fnorm[0]=fnorm[1]*tmp[2] - fnorm[2]*tmp[1];
						fnorm[1]=fnorm[2]*tmp[0] - a       *tmp[2];
						fnorm[2]=a       *tmp[1] - b       *tmp[0];
						let ds;
						if( (ds=fnorm[0]*fnorm[0]+fnorm[1]*fnorm[1]+fnorm[2]*fnorm[2]) > 0.000001 ){
							//console.log( "Took 1", v1,v2,v3 );
							fnorm[0] /= Math.sqrt(ds);
							fnorm[1] /= Math.sqrt(ds);
							fnorm[2] /= Math.sqrt(ds);
						}else {

							// b->A  c->A
							fnorm[0] = vB[0]-vA[0];fnorm[1] = vB[1]-vA[1];fnorm[2] = vB[2]-vA[2];
							tmp[0] = vC[0]-vA[0];tmp[1] = vC[1]-vA[1];tmp[2] = vC[2]-vA[2];
							a=fnorm[0], b=fnorm[1];
							fnorm[0]=fnorm[1]*tmp[2] - fnorm[2]*tmp[1];
							fnorm[1]=fnorm[2]*tmp[0] - a       *tmp[2];
							fnorm[2]=a       *tmp[1] - b       *tmp[0];
							let ds2;
							if( (ds2=fnorm[0]*fnorm[0]+fnorm[1]*fnorm[1]+fnorm[2]*fnorm[2]) > 0.00000001 ){
								fnorm[0] /= Math.sqrt(ds2);
								fnorm[1] /= Math.sqrt(ds2);
								fnorm[2] /= Math.sqrt(ds2);
							} else {
								fnorm[0] = vA[0]-vC[0];fnorm[1] = vA[1]-vC[1];fnorm[2] = vA[2]-vC[2];
								tmp[0] = vB[0]-vC[0];tmp[1] = vB[1]-vC[1];tmp[2] = vB[2]-vC[2];
								a=fnorm[0], b=fnorm[1];
								fnorm[0]=fnorm[1]*tmp[2] - fnorm[2]*tmp[1];
								fnorm[1]=fnorm[2]*tmp[0] - a       *tmp[2];
								fnorm[2]=a       *tmp[1] - b       *tmp[0];
								let ds3;
								//console.log( "Took 3" );
								//else 
								//	console.log( "3Still not happy...", ds, vA, vB, vC );
							}
						}
						// convert normal to a rotation of 'up'
						lnQA.set( { x:fnorm[0], y:fnorm[1], z:fnorm[2] }, false ).update();
						/*
						if( (x === 3) && (y === 2) && (z === 4) )
						if(  normalVertices){
							//console.log( "Drawing normal normal" );
							normalVertices.push( new THREE.Vector3( pCenter[0],pCenter[1],pCenter[2]+0.02 ))
							normalVertices.push( new THREE.Vector3( pCenter[0]+fnorm[0]*0.7,pCenter[1]+fnorm[1]*0.7,pCenter[2]+fnorm[2]*0.7+0.02));
							normalColors.push( new THREE.Color( 0.8, 0.8, 0, 1.0 ))
							normalColors.push( new THREE.Color( 0.8, 0.8, 0, 1.0 ))
							
								
						}
						*/
						fnorm[0] = lnQA.x;
						fnorm[1] = 0; // y is always 0
						fnorm[2] = lnQA.z;
					}

					tv = normals[normOffset+tet];
					if( !tv )  {
						tv = new TetVertBase( pCenter, fnorm.slice(0,3), invert
							, pointStateHolder[ai], pointStateHolder[bi], pointStateHolder[ci], dataOffset, useFace, tet, odd );
						normals[normOffset+tet] = tv;//{id:0,p:p,n:n,sources:[psh1, psh2,psh3], i:invert};
						//console.log( "Adding at ", x, y, z, dataOffset, useFace, tet );
					} else {
						tv.update( pCenter, fnorm, pointStateHolder[ai], pointStateHolder[bi], pointStateHolder[ci] )
					}
				}
				didTet.push( tv );
		
				bits[dataOffset] |= (1<<tet)<<6;
				//console.log( "updated bits:", x, y, z, odd, useFace, tet, bits[dataOffset].toString(16) );
				//console.log( "Set position:", x, y, z, normOffset, tet, useFace );
				content[normOffset + tet] = 1;
// --^-^-^-^-^-^-- END GENERATE NORMALS (if face) --^-^-^-^-^-^--
			}
		}
		if( bits[dataOffset] & (0x1F<<6) ) {
			return true;
		}
		return false;
	}



	function followEdge() {
		const p = [null,null,null,null,null,null];
		if( ef_queue.length === 0 ) 
			return false;
		let x, y, z, e;
		while( (ef_queue.length>0 ) ) {
			({x,y,z,e} = ef_queue.shift());
			const offset = (x + (y*dim0) + z*dim0*dim1);
			const baseOffset = offset*5;
			const odd = (x+y+z)&1;

			const edge = tetNearMap[odd][e];
			let failed = false;
			for( let dir of edge.checkDirs ) {
				if( dir ) {		
					let is = false;		
					console.log( "Check near cubes before processing this edge...", dir );
					if( "number" === typeof dir ) {
						switch( dir ) {
						default: console.log( "Unhandled direction(1):", dir ); break;
						case  1:is=processCube( x+1, y, z ); break;
						case  2:is=processCube( x, y+1, z ); break;
						case  4:is=processCube( x, y, z+1 ); break;
						case -1:is=processCube( x-1, y, z ); break;
						case -2:is=processCube( x, y-1, z ); break;
						case -4:is=processCube( x, y, z-1 ); break;
						}
					} else {
						let xofs,yofs,zofs;
						switch( dir[0] ) {
						default: console.log( "Unhandled direction(1):", dir ); break;
						case  1:xofs=1; break;
						case  2:yofs=1; break;
						case  4:zofs=1; break;
						case -1:xofs=-1; break;
						case -2:yofs=-1; break;
						case -4:zofs=-1; break;
						}
						switch( dir[1] ) {
						default: console.log( "Unhandled direction(1):", dir ); break;
						case  1:xofs=1; break;
						case  2:yofs=1; break;
						case  4:zofs=1; break;
						case -1:xofs=-1; break;
						case -2:yofs=-1; break;
						case -4:zofs=-1; break;
						}
						is=processCube( x + xofs, y + yofs, z + zofs );
					}
					if( !is ) {
						failed = true;
						console.log( "Incomplete information; maybe this fell off the edge?", x, y, z, e, dir );
						break;
					}
				}		
			}
			if( failed ) continue; // can't emit the face for this...
			if( edge.edge < 3 ) {
				let d;
				// this point is always 'here'
				p[0] = normals[baseOffset+edge.useTets[0].tet];
				// this dir is an array
				{
					let ds = edge.useTets[1].dir;
					if( ds[0] < 0 )
						if( ds[1] < 0 ) 
							p[1] = normals[baseOffset-tetOffset[-ds[1]]-tetOffset[-ds[0]] +edge.useTets[1].tet ];
						else
							p[1] = normals[baseOffset+tetOffset[ds[1]]-tetOffset[-ds[0]] +edge.useTets[1].tet];
					else
						if( ds[1] < 0 ) 
							p[1] = normals[baseOffset-tetOffset[-ds[1]]+tetOffset[ds[0]] +edge.useTets[1].tet];
						else
							p[1] = normals[baseOffset+tetOffset[ds[1]]+tetOffset[ds[0]] +edge.useTets[1].tet];
				}
				if( (d=edge.useTets[2].dir) < 0 )
					p[2] = normals[baseOffset-tetOffset[-d]+edge.useTets[2].tet];
				else
					p[2] = normals[baseOffset+tetOffset[d]+edge.useTets[2].tet];
				if( (d=edge.useTets[3].dir) < 0 )
					p[3] = normals[baseOffset+tetOffset[-d]+edge.useTets[3].tet];
				else 
					p[3] = normals[baseOffset+tetOffset[d]+edge.useTets[3].tet];
				emitSquare( offset, p, d, e );
				
				const edges0 = faceMetric[odd][p[0].tet][p[0].face];
				const edges1 = faceMetric[odd][p[1].tet][p[1].face];
				const edges2 = faceMetric[odd][p[2].tet][p[2].face];
				const edges3 = faceMetric[odd][p[3].tet][p[3].face];
				//p[0].tet][

			} else {
				const edgeTets = edge.useTets;
				let nearofs;
				p[0] = normals[baseOffset+edgeTets[0].tet];
				p[1] = normals[baseOffset+edgeTets[1].tet];
				p[2] = normals[baseOffset+edgeTets[2].tet];
				if( edgeTets[3].dir < 0 ) {
					nearofs = -tetOffset[-edgeTets[3].dir];
				} else {
					nearofs = tetOffset[edgeTets[3].dir];
				}
				p[3] = normals[baseOffset+nearofs+edgeTets[3].tet];
				p[4] = normals[baseOffset+nearofs+edgeTets[4].tet];
				p[5] = normals[baseOffset+nearofs+edgeTets[5].tet];
				emitHex( offset, p, nearofs, e );

			/*
				const edges = [faceMetric[odd][p[0].tet][p[0].face]
					, faceMetric[odd][p[1].tet][p[1].face]
					, faceMetric[odd][p[2].tet][p[2].face]
					, faceMetric[odd][p[3].tet][p[3].face]
					, faceMetric[odd][p[4].tet][p[4].face]
					, faceMetric[odd][p[5].tet][p[5].face]
					];
				const nextSteps = [];
				for( let e2 of edges ) {
					// e2 will have 0 or 2 entries
					for( let e3 of e2 ) {
						for( let e4 of e3 ) {
							if( e4.edge === edge ) continue; // skip my own edge.
							nextSteps.push( e4 );
						}
					}
				}
				console.log( "Next Steps is queued?", nextSteps );
			*/
			}
		}

	}


	let cycles = 0;
	let startAt = Date.now();
	function followFace() {
		let p0;
		let p = [null,null,null,null,null,null];
		let added = [];
		let tick = 0;
		let fromTet = -1;
		//if( x < 10 ) candraw = false;
		if( ff_queue.length === 0 ) 
			return false;
		let x,y,z,e;
		while( (ff_queue.length>0 ) ) {
			// allow refreshing the display inbetween working on this.
			if( tick++ > 25 ) {
				const now = Date.now();
				if( ( now-startAt ) > 15 )  {
					//console.log( "Breaking with queue:", ff_queue.length )
					break;
				}
				tick= 0;
				cycles++;
				break;
			}
			({x,y,z,e} = ff_queue.shift());

			added.length = 0;

			const offset = (x + (y*dim0) + z*dim0*dim1);
			const baseOffset = offset*5;
			const odd = (x+y+z)&1;

			if( !processCube( x, y, z, offset, fromTet ) ) continue;

			for( let e = 0; e < 6; e++ ) {
				if( bits[offset] & ( 1 << e ) ) {
					// this is also an edge in tetNearMap
					// The first edge found will probably be 
					//   an edge that has incomplete information to process...
					efQueue( x, y, z, e );
				}
			}

			followEdge();

			//fromTet = e;

			//const nextEdges = edgeMetric[odd][e];//[0-5];

			if( p[0] = normals[baseOffset+nextEdges.tet1] ) {
				
			}						



			if( odd === 0 ) {
				// skips checking tet 0, because it would be completed before... but...
				// tet 1, 



				if( p[0] = normals[baseOffset+1] ) {
					const bts = bits[offset+dataOffset[6]];
					const bts2 = bits[offset+dataOffset[2]];
					const bts3 = bits[offset+dataOffset[4]];
					//p[0].face
					const yzcube = (bts &(1<<2))?processCube( x, y+1, z+1, offset, 1 ):false;
					const ycube = ((bts2&(1<<5))|(bts & (1<<2)))?processCube( x, y+1, z , offset, 1):false;
					const zcube = ((bts3&(1<<4))|(bts & (1<<2)))?processCube( x, y, z+1, offset, 1 ):false;
					 
					if( yzcube && ycube && zcube )
						if( (p[1] = normals[baseOffset + tetOffset[4] + 0] )
							&&(p[2] = normals[baseOffset + tetOffset[6] + 0] )
							&&(p[3] = normals[baseOffset + tetOffset[2] + 1] )
							){
					        
							//fixNormals
							let drawOk = true;
							{
								const fc = p[0].face;
								if( fc == 1 ) drawOk = false;
								else if( fc == 3 ) drawOk = false;
								else if( fc == 5 ) drawOk = false;
							}
				                
								// back top square
							if(ifDraw(0)&& drawOk ) {
								emitSquare(p, offset, 6, 2 );
								// see here's the rub...
								// p[0..3] is an array of tets with points
								// the composite of THOSE points is this face... and the centroid is 'this' 
								// although, squares are emitted around vertical and horizontal lines
								// so really the centroid of this face is a horizontal/vertical line, 
								// and I'm emitting all the targets that don't contain that line(?)

								ffQueue( x, y, z+1,  )
								ffQueue( x, y+1, z,  )
								ffQueue( x, y+1, z+1, )
							}
						}
					//if(0)
					if( zcube )
						if( ( p[1] = normals[baseOffset + tetOffset[4] + 0] )
							&&( p[2] = normals[baseOffset + tetOffset[4] + 4] )
							&&(p[3] = normals[baseOffset + tetOffset[4] + 3] )
							&&(p[5] =  normals[baseOffset+4] )
							&&(p[4] = normals[baseOffset+2] )
							){
							// around diagonal back
							if(ifDraw(1)) {
								emitHex(offset,p, 4, 4 );
								ffQueue( x, y, z+1 )
							}
						}

					//if(0)
					if( ycube )
						if( ( p[5] = normals[baseOffset + tetOffset[2] + 1] )
							&&( p[4] = normals[baseOffset + tetOffset[2] + 4]) 
							&&( p[3] = normals[baseOffset + tetOffset[2] + 3] )
							&& ( p[2] = normals[baseOffset+3])
							&& ( p[1] = normals[baseOffset+4] )
							){
							// around diagonal top...
							if(ifDraw(2)) {
								emitHex(offset,p, 2, 5);
								ffQueue( x, y+1, z )
							}
						}
				}

				if( p[0] = normals[baseOffset+2] ) {

					const bts = bits[offset+dataOffset[5]];
					const bts2 = bits[offset+dataOffset[1]];
					const bts3 = bits[offset+dataOffset[4]];

					const xzcube = 	(bts & (1<<0))?processCube( x+1, y, z+1, offset,2 ):false;
					const xcube = ((bts2&(1<<3))|(bts & ((1<<0))))?processCube( x+1, y, z, offset,2 ):false;
					const zcube = ((bts3&(1<<5))|(bts & (1<<0)))?processCube( x, y, z+1, offset,2 ):false;
					if( xcube&&zcube&&xzcube )
					if( (p[1] = normals[baseOffset + tetOffset[1] + 1]  )
						&&(p[2] = normals[baseOffset + tetOffset[5] + 0]  )
						&&(p[3] = normals[baseOffset + tetOffset[4] + 3]  )
						){
						// around back right vertical
						let drawOk = true;
						if( p[0].face >= 4 ) drawOk = false;
						if(ifDraw(3) && drawOk ) {
							emitSquare(p, offset, 5, 0 );  // edge not tet
							ffQueue( x+1, y, z )
							ffQueue( x, y, z+1 )
							ffQueue( x+1, y, z+1 )
						}
					}else {
						//console.log( "Crosses data", crosses[offset*6+] = 1;
						//)
						console.log( "Missing some faces for this quad"
								,bits[offset].toString(16)
								, bits[offset+dataOffset[1]].toString(16)
								, bits[offset+dataOffset[5]].toString(16)
								, bits[offset+dataOffset[4]].toString(16)
								, "down"
								, bits[offset-dataOffset[2]].toString(16)
								, bits[offset-dataOffset[6]].toString(16)
										, p[1], p[2], p[3] );
					}

					if( xcube )
						if( (p[1] = normals[baseOffset + tetOffset[1] + 1]  )
							&&(p[2] = normals[baseOffset + tetOffset[1] + 4]  )
							&&(p[3] = normals[baseOffset + tetOffset[1] + 0]  )
							&& (p[5] = normals[baseOffset+4]  )
							&& (p[4] = normals[baseOffset+3] )
							){
							// around diagonal right...
							if(ifDraw(4)) {
								emitHex(offset,p, 1, 3 );
								ffQueue( x+1, y, z )
							}
						}

				}

				if( p[0] = normals[baseOffset+3] ) {

					const bts = bits[offset+dataOffset[3]];
					const bts2 = bits[offset+dataOffset[1]];
					const bts3 = bits[offset+dataOffset[2]];
					const xycube = (bts &(1<<1))?processCube( x+1, y+1, z, offset,3 ):false;
					const ycube = ((bts3&(1<<5))|(bts &(1<<1)))?processCube( x, y+1, z, offset,3 ):false;
					const xcube = ((bts2&(1<<3))|(bts &(1<<1)))?processCube( x+1, y, z, offset,3 ):false;

					if( xcube && ycube && xycube )
					if( (p[1]= normals[baseOffset + tetOffset[2] + 3])
						&&(p[3] = normals[baseOffset + tetOffset[1] + 0] )
						&&(p[2] = normals[baseOffset + tetOffset[3] + 0] )
						){
						// around back right top to back vertical
						let drawOk = true;
						{
							const fc = p[0].face;
							if( fc == 2 ) drawOk = false;
							else if( fc == 3 ) drawOk = false;
							else if( fc == 6 ) drawOk = false;
						}
						if(ifDraw(5)&&drawOk) {
							emitSquare(p, offset, 3, 1 );
							ffQueue( x+1, y, z )
							ffQueue( x, y+1, z )
							ffQueue( x+1, y+1, z )
						}
					}
				}


			}else if(1){

				if( p[0] = normals[baseOffset+0] ) {
	
					const bts = 0xFFFF | bits[offset+dataOffset[2]];

					const ycube = (bts&(1<<5))?processCube( x, y+1, z, offset,0 ):false;
					
					if( ycube )

					if(  (p[5] = normals[baseOffset + tetOffset[2] + 0]  )
						&&( p[4] = normals[baseOffset + tetOffset[2] + 4]  )
						&&( p[3] = normals[baseOffset + tetOffset[2] + 2]  )
						&& ( p[2] = normals[baseOffset+2] )
						&& ( p[1] = normals[baseOffset+4]  )
						){
						// around top diagonal
						if(ifDraw(6)){
							emitHex(offset,p, 2, 5);
							ffQueue( x, y+1, z )
						}

					}
					else { 
					//	console.log( "missing one or more for this hex" ); 
					}

				}


				if( p[0] = normals[baseOffset+1] ) {
					const bts = bits[offset+dataOffset[4]];
					if( (bts&(1<<4)) && processCube( x, y, z+1, offset,1 ) )
					
					if( ( p[1] = normals[baseOffset + tetOffset[4] + 0]  )
						&&( p[2] = normals[baseOffset + tetOffset[4] + 4]  )
						&&( p[3] = normals[baseOffset + tetOffset[4] + 3]  )
						&& ( p[5] = normals[baseOffset+4]  )
						&& ( p[4] = normals[baseOffset+2] )
						){
						// around back diagonal
						if(ifDraw(7)){
							emitHex(offset,p, 4, 4);
							ffQueue( x, y, z+1 )
						}
					}

				}

				if( p[0] = normals[baseOffset+2] ) {
					const bts = bits[offset+dataOffset[6]];
					const bts2 = bits[offset+dataOffset[2]];
					const bts3 = bits[offset+dataOffset[4]];
					const yzcube = 	(bts&(1<<2))?processCube( x, y+1, z+1, offset, 2 ):false;
					const ycube = ((bts2&(1<<5))||(bts&(1<<2)))?processCube( x, y+1, z , offset, 2):false;
					const zcube = ((bts3&(1<<4))||(bts&(1<<2)))?processCube( x, y, z+1, offset,2 ):false;
					if( ycube&&zcube&&yzcube )
					if( ( p[3] = normals[baseOffset + tetOffset[2] + 2] )
						&&( p[2] = normals[baseOffset + tetOffset[6] + 3]  )
						&&( p[1] = normals[baseOffset + tetOffset[4] + 3]  )
						){
						// around back right top to back horizontal
						let drawOk = true;
						
						{// edge 2 is tet line 1 here...
							const fc = p[0].face;
							if( fc == 2 ) drawOk = false;
							else if( fc == 3 ) drawOk = false;
							else if( fc == 6 ) drawOk = false;
						}
						if(ifDraw(8)&&drawOk) {
							emitSquare(p, offset, 6, 2 );
							ffQueue( x, y+1, z )
							ffQueue( x, y, z+1 )
							ffQueue( x, y+1, z+1 )
						}
					}

					const bts4 = bits[offset+dataOffset[5]];
					const bts5 = 0xFFFF|bits[offset+dataOffset[1]];
					const xzcube = ( bts4&(1<<0) ) ?processCube( x+1, y, z+1, offset, 2 ):false;
					const xcube  = ( bts5&(1<<3) ) ?processCube( x+1, y, z, offset, 2 ):false;

					if( xcube&&xzcube&&zcube )
					if( ( p[3] = normals[baseOffset + tetOffset[4] + 3]  )
						&&( p[2] = normals[baseOffset + tetOffset[5] + 0]  )
						&&( p[1] = normals[baseOffset + tetOffset[1] + 1]  )
						){
						// around back right vertical line
						let drawOk = true;
						if( p[0].face >= 4 ) drawOk = false;
						
						if(ifDraw(9)&&drawOk) {
							emitSquare(p, offset, 5, 0 );
							ffQueue( x+1, y, z )
							ffQueue( x, y, z+1 )
							ffQueue( x+1, y, z+1 )
						}
					}

					const bts6 = bits[offset+dataOffset[3]];
					const xycube = 	(bts6&(1<<1))?processCube( x+1, y+1, z, offset, 2 ):false;

					if( xcube && ycube && xycube )
					if( ( p[1] = normals[baseOffset + tetOffset[2] + 2]  )
						&&( p[2] = normals[baseOffset + tetOffset[3] + 1]  )
						&&( p[3] = normals[baseOffset + tetOffset[1] + 1]  )
						){
						// around top right to back line
						let drawOk = true;
						{
							const fc = p[0].face;
							if( fc == 1 ) drawOk = false;
							else if( fc == 3 ) drawOk = false;
							else if( fc == 5 ) drawOk = false;
						}
						if(ifDraw(11)&&drawOk){
							emitSquare(p, offset, 3, 1 );
							ffQueue( x, y+1, z )
							ffQueue( x+1, y, z )
							ffQueue( x+1, y+1, z )
						}
					}

					if( xcube )
					if( ( p[5] = normals[baseOffset + tetOffset[1] + 1]  )
						&&( p[4] = normals[baseOffset + tetOffset[1] + 4]  )
						&&( p[3] = normals[baseOffset + tetOffset[1] + 0]  )
						&&(  p[2] = normals[baseOffset+3])
						&&(  p[1] = normals[baseOffset+4] )
						){
							if(ifDraw(10)) {
								emitHex(offset,p, 1, 3);
								ffQueue( x+1, y, z )
							}
						// around right diagonal
					}
				}
			}

			ffQueueMark();
		}
		ffQueueEnd();
		return true;
	}

	let z = 0;
	let y = 0;
	let x = 0;
	function followNewFace() {
		startAt = Date.now();

		if( ff_queue.length ) followFace();
		// still want to be called.
		if( ff_queue.length ) return true;
		for( ; z < dim2; z++ ) {
			for( ; y < dim1; y++ ) {
				for( ; x < dim0; x++ ) {
					const offset = (x + (y*dim0) + z*dim0*dim1);
					if( visited[offset] || !processCube(x,y,z, -1, -1) ) {
					
						continue;
					}
					
					for( let edge = 0; edge < 6; edge++ ) 
					{
						if( bits[offset]& (1<<edge)) {
							//console.log( "Following from", x, y, z );
							ffQueue( x, y, z, edge );
						}
					}
					followFace(  );
					// can find another new face to follow?

					/* false=process full geometry; if queue is not empty, we CAN return for partial computations */
					if( false && ff_queue.length )
						break;
				}
				if( x < dim0 ) break;
				x = 0;
			}
			if( y < dim1 ) break;
			y = 0;
		}
		// got out of the loop...
		if( z < dim2 ) return true;
		// done.
		return false;
	}
	function followNewEdge() {
		startAt = Date.now();

		if( ef_queue.length ) followEdge();
		// still want to be called; dont need another edge queued yet
		if( ef_queue.length ) return true;
		for( ; z < dim2; z++ ) {
			for( ; y < dim1; y++ ) {
				for( ; x < dim0; x++ ) {
					const offset = (x + (y*dim0) + z*dim0*dim1);
					if( visited[offset] ) continue;

					processCube(x,y,z, -1, -1); // this has a result, but we don't care about it's idea of getting a tet completed.

					// process cube(computeEdges) will add edges that need to be processed as they are found
					// the lowest level computation is actually 1:1 what we want to output.
					if( !ef_queue.length ) continue;
					followEdge(  );
					if( false && ef_queue.length )
						break;
				}
				if( x < dim0 ) break;
				x = 0;
			}
			if( y < dim1 ) break;
			y = 0;
		}
		// got out of the loop...
		if( z < dim2 ) return true;
		// done.
		return false;
	}

	followNewEdge();
	//followNewFace();

	//console.log( "Took:", Date.now() - meshing, cycles );
	// update geometry (could wait for index.html to do this?
	if( showGrid )
		opts.geometryHelper.markDirty();
		
	//console.log( "These got used so far:", usedTets);

	opts.points  = points;   
	opts.normals = normals;
	opts.bits    = bits; 
	// internal utility function to limit angle
	function clamp(a,b) {
		if( a < b ) return a; return b;
	}
	//return vertices;

	return followNewFace;
}

}
})()

if("undefined" != typeof exports) {
	exports.mesher = MarchingTetrahedra4;
}

