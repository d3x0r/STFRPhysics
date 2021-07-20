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

var DualMarchingTetrahedra3 = window.DualMarchingTetrahedra3 = (function() {
const debug_ = false;
const _debug_output = true;
	// static working buffers
	let ofsA = 0.0;

	var sizes = 0;
	const pointHolder = [null];
	const pointStateHolder = [];
	const pointMergeHolder = [[]];
	const normalHolder = [[]];
	const crossHolder = [null];
	const contentHolder = [null];
	var bits = null; // single array of true/false per cube-cell indicating at least 1 cross happened
	
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
	
	//const lineEvenAlts = [ [ [1,4], [1,2], [0,1],[0,4],[0,2] ],
	//						[    ]  ];

	const linesMin = [linesEvenMin,linesOddMin];

	// this is the running center of the faces being generated - center of the cell being computed.
	const cellOrigin = [0,0,0];

	// see next comment...
	// the order of these MUST MATCH edgeToComp order
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

	const tetPointInversions =
		[
			[  // the computed halfpoints are inverted from these tet's perspective.
				[ 0,0,0  ,0,0,0],
				[ 1,1,0  ,1,1,1 ],
				[ 0,1,1  ,1,1,1 ],
				[ 1,0,1  ,1,1,1],
				[ 0,0,0  ,0,1,0],
			],
			[
				[ 1,0,0     ,0,0,1],
				[ 0,1,0     ,1, 1, 0 ],
				[ 1,1,1     ,0,1,1 ],
				[ 0,1,0     , 1, 0, 1],
				[ 0,0,0     ,1,0,1 ],
			]

		];

	// tetrahedra edges are in this order.
	// the point indexes listed here are tetrahedra points.  (point index into vertToDataOrig points to get composite point)
	const referenceTetEdgePoints = [ [0,1] ,[0,2], [0,3], [1,2], [2,3], [3,1] ];
	
	// input is face number (0-3)  output is the triplet of points that define that face.
	// given to define relations between mating faces of tets.
	const referenceTetFacePoints = [ [ 0,1,2 ], [0,2,3], [0,3,1], [1,3,2] ];

	// input is face number (0-3) output is the three edges that bound this face.
	// (unused?  Ordering has no sense... just is what it is? )
	const referenceTetFaceEdges = [ [0,3,1], [1,2,4], [2,0,5], [3,4,5] ]; 

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
	const v_ab = new THREE.Vector3()
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
				[[1,0,2]],    // vert 0
				[[1,0,4],[5,1,4]],
				[[5,0,3],[2,0,5]],
				[[4,0,3]],    // vert 1
				[[2,1,4],[4,1,3]],
				[[5,1,3]],    // vert 2
				[[4,2,5]]     // vert 3
			],
			// invert
			[
				[[0,1,2]],    // vert 0
				[[0,1,4],[1,5,4]],
				[[0,5,3],[0,2,5]],
				[[0,4,3]],    // vert 1
				[[1,2,4],[1,4,3]],
				[[1,5,3]],    // vert 2
				[[2,4,5]]     // vert 3
			],
	];

	
   // array of child tetrahedra for collapsing in an octree of DLC cells.
   // [even/odd parent cell]
   // all cells collapse with 'even' at 0,0,0  ... 0-1  become another 0.. 2-3 -> 1 ...
   //   [tetNumberInCell]
   //      results (right now)   [x,y,z offset (n*2)+   , (exclusion),  tets at offset to include,... (1, 2 or 4 )   ]
   //   the sum of x+y+z determines whether the tet ID is 'odd' or 'even'.. (x+y+z)&1 === odd.
   //
	const childTetList = [ [
		 [ // 0 - 7 combined
			  [ 0,0,1,  /* not 3,*/  0,1,2,4  ] /* all tets but 3 - odd */
						 ,  [ 0,0,0,  0  ]
						 ,  [ 1,0,1,  0  ]
						 ,  [ 0,1,1,  0  ]
		],
		   
		[   // 1 - 7 combined
			  [ 1,0,0, /* not 2, */  0,1,3,4  ] /* all tets but 2 - odd */
						  , [ 0,0,0,  1  ]
						  , [ 1,0,1,  1  ]
						  , [ 0,1,1,  1  ]
	   ],

	   [ // 2 - 7 combined
			   [ 0,1,0, /* not 1, */ 0,2,3,4  ] /* all tets but 1 - odd */
			,[ 0,1,1,  2  ]
			,[ 1,1,1,  2  ]
			,[ 0,0,0,  2  ]
		],

		[ // 3 - 7 combined
				 [ 1,1,1, /* not 0,*/  1,2,3,4  ] /* all tets but 0 - odd */
			,[ 0,1,1,  3  ]
			,[ 1,1,0,  3  ]
			,[ 0,1,1,  3  ]
		],

		[   // 4 - 12 combined
			  [1,0,0,   2 ]
			  ,[0,0,1,   3 ]
			  ,[0,1,0,   1 ]
			  ,[1,1,1,   0 ]
			,[ 0,0,0,   3, 4  ]
			,[ 0,1,1,   1, 4  ]
			,[ 1,0,1,   2, 4  ]
			,[ 1,1,0,   0, 4  ] 
		],

		],[
			[ // 0 - 7 combined
				[ 0,0,0, /* not 3, */ 0,1,2,4  ] /* all tets but 3 - even */
							,[ 1,0,0,  0  ]
							,[ 0,1,0,  0  ]
							,[ 0,0,1,  0  ]
			],
				
			[   // 1 - 7 combined
					[ 1,0,1, /* not 2, */ 0,1,3,4  ] /* all tets but 2 - even */
								,[ 1,0,0,  1  ]
								,[ 1,1,1,  1  ]
								,[ 0,0,1,  1  ]
			],

			[ // 2 - 7 combined
					[ 0,1,1, /* not 3,*/  0,1,2,4  ] /* all tets but 1 - even */
				,[ 0,1,0,  2  ]
				,[ 0,0,1,  2  ]
				,[ 1,1,1,  2  ]
			],

			[ // 3 - 7 combined
						[ 1,1,0,  /* not 0,*/  1,2,3,4  ] /* all tets but 0 - even */
				,[ 0,1,0,  3  ]
				,[ 1,0,0,  3  ]
				,[ 1,1,1,  3  ]
			],

			[   // 4 - 12 combined
					[1,0,0,   2,4 ]
					,[0,0,1,   3,4 ]
					,[0,1,0,   1,4 ]
					,[1,1,1,   0,4 ]
				,[ 0,0,0,   3  ]
				,[ 0,1,1,   1  ]
				,[ 1,0,1,   2  ]
				,[ 1,1,0,   0  ] 
			],
		]
	]


const usedTets = [
	[ // even
		[ [ 0,0,0,0,0,0]  /* unchecked! */
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		],
	   [  [ 0,0,0,0,0,0]  /* a few missing checks */
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		, [ 0,0,0,0,0,0]
		],
	  ],
	[ 
	  [ [ 0,0,0,0,0,0]  /* unchecked! */
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0] 
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  ],
	 [  [ 0,0,0,0,0,0]  /* a few missing checks */
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  , [ 0,0,0,0,0,0]
	  ],
	],
]

// [odd][invert][dir][longest%3/*min*/]
const tetCentroidFacet =[  
			[ // even
		      [ [ [0,3,2,1],[0,3,2,1],[0,2,3,1],[1,3,0,2],[1,3,0,2/*3,2,0,1*/],[0,2,3,1]]  // 3, 4 set /* unchecked! */
			  , [ [0,1,2,3],[0,1,2,3],[1,0,2,3],[1,3,0,2],[2,0,3,1/*0,3,1,2*/],[0,2,1,3]]  // 3, 4, 5 set
			  , [ [0,3,2,1],[1,0,3,2],[3,1,0,2],[0,3,1,2],[0,3,1,2],[1,0,2,3]]
			  , [ [1,2,3,0],[1,2,3,0],[2,3,1,0],[2,0,3,1],[1,2,0,3],[2,3,1,0]]
			  , [ [0,3,2,1],[0,3,2,1],[3,2,0,1],[3,0,2,1],[3,0,2,1],[3,2,0,1]]
			  , [ [2,3,0,1],[2,3,0,1],[3,2,0,1],[3,0,2,1],[3,0,2,1],[3,2,0,1]]
			  , [ [3,2,1,0],[3,2,1,0],[3,2,0,1],[2,0,3,1],[2,0,3,1],[1,3,2,0]]
			  , [ [2,3,0,1],[2,3,0,1],[3,2,0,1],[2,0,3,1],[1,2,0,3],[3,2,0,1]]
			  ],
			],
		  [ 
			[ [ [2,3,0,1],[3,0,1,2],[0,2,3,1],[2,0,3,1],[0,3,1,2],[0,2,3,1]]    // 4 checked /* unchecked! */
			, [ [0,3,2,1],[0,3,2,1],[0,2,3,1],[2,0,3,1],[0,3,1,2],[1,0,2,3]]   // 3,4 set
			, [ [3,0,1,2],[3,0,1,2],[0,2,3,1],[1,3,0,2],[0,2,1,3],[1,0,2,3]] 
			, [ [0,3,2,1],[0,3,2,1],[2,3,1,0],[3,0,2,1],[0,2,1,3],[2,3,1,0]]
			, [ [2,3,0,1],[2,3,0,1],[3,2,0,1],[2,0,3,1],[2,0,3,1],[0,1,3,2]]
			, [ [1,0,3,2],[1,0,3,2],[3,2,0,1],[2,0,3,1],[2,0,3,1],[0,1,3,2]]
			, [ [1,2,3,0],[1,2,3,0],[3,2,0,1],[3,0,2,1],[2,1,3,0],[3,2,0,1]]
			, [ [1,0,3,2],[1,0,3,2],[3,2,0,1],[1,3,0,2],[0,2,1,3],[2,0,1,3]]
			],
		],		  
	];
	


	// these are bits that are going to 0.
	const tetMasks = [ [ 0, 2|4, 1|2|4, 1|2, 1|2|4 ], [ 2, 4|1, 1|4|2, 1, 1|2|4 ] ];

	function  moveNear(a,b){
		const d1 = 2*(b[0]-a[0]);
		const d2 = 2*(b[1]-a[1]);
		const d3 = 2*(b[2]-a[2]);
		const dlen = Math.sqrt(d1*d1+d2*d2+d3*d3);
		if( dlen > Math.PI ) {
			lnQA.set( 0, a[0], a[1], a[2] ).update();
			lnQB.set( 0, b[0], b[1], b[2] ).update();
			const newB = lnQA.applyDel( lnQB.up(), -1.0 );
			lnQB.set( newB, false ).update();
			lnQB.freeSpin( lnQA.θ, lnQA );
			const newB2 = lnQA.applyDel( lnQB.up(), 1.0 );
			
			b[0] = lnQB.x;
			b[1] = lnQB.y;
			b[2] = lnQB.z;
		}
	}
	

	class TetVertBase{ 
		constructor( p, n, invert, p1, p2, p3 ) {
			this.invert = invert;
			this.p = p;
			this.n = n;
			this. sources=[p1, p2, p3, null]
			this.elements=[p1.type1,p1.type2,p2.type1,p2.type2,p3.type1,p3.type2,0,0]
			this. eleDels=[ p1.typeDelta, p2.typeDelta,p3.typeDelta,0 ] ;
	
		}
	
	
		update( pCenter, fnorm, p1, p2, p3 ) {
			this.p[0] = (this.p[0] + pCenter[0])/2;
			this.p[1] = (this.p[1] + pCenter[1])/2;
			this.p[2] = (this.p[2] + pCenter[2])/2;
			
			moveNear( this.n, fnorm );		
	
			this.n[0] = (this.n[0] + fnorm[0])/2;
			this.n[1] = (this.n[1] + fnorm[1])/2;
			this.n[2] = (this.n[2] + fnorm[2])/2;
	
			if( p1 !== this.sources[0] && p1 !== this.sources[1] && p1 !== this.sources[2]  ){
				this.sources[3] = p1;
				this.elements[6] = p1.type1;
				this.elements[7] = p1.type2;
				this.eleDels[3] = p1.typeDelta;
			}
			else if( p2 !== this.sources[0] && p2 !== this.sources[1] && p2 !== this.sources[2]  ){
				this.sources[3] = p2;
				this.elements[6] = p2.type1;
				this.elements[7] = p2.type2;
				this.eleDels[3] = p2.typeDelta;
			}
			else if( p3 !== this.sources[0] && p3 !== this.sources[1] && p3 !== this.sources[2]  ) {
				this.sources[3] = p3;
				this.elements[6] = p3.type1;
				this.elements[7] = p3.type2;
				this.eleDels[3] = p3.typeDelta;
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
	var smoothShade = opts.smoothShade || false;
	var newData = [];
	const showGrid = opts.showGrid;

	const dim0 = dims[0];
	const dim1 = dims[1];
	const dim2 = dims[2];

	const dataOffset = [ 0, 1, dim0, 1+dim0, 0 + dim0*dim1,1 + dim0*dim1,dim0 + dim0*dim1, 1+dim0 + dim0*dim1] ;
	const cellOffset = dataOffset.map( n=>n*6);

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



	// these are the possible edges formed from each tet to each other near tet.
	// [odd] [tet] [face]
	const referenceTetEdgeFormations =[ [  [ [0, (1*dim1*dim0)*tetCount+0], [0,(-1*dim0)*tetCount+2], [0,(-1)*tetCount+3],   [0,4] ]
					     , [ [1, ( 1 )*tetCount+0] [1,4], [1,(-1*dim0*dim1)*tetCount+3], [1,(-1*dim0)*tetCount+1] ]
					    , [ [2, (1*dim0)*tetCount+0], [2,(-1) +1], [2,(-1*dim0*dim1)*tetCount+2], [2,4] ]
					    , [ [3, (1*dim0*dim1)*tetCount+1], [3,4], [3,(1*dim0)*tetCount+3], [3,( 1 )*tetCount+2] ]
					    , [ [4, 0], [4,1], [4,2], [4,3] ]
					    ],
					    [ [ [ 0, (-1)*tetCount+1], [0, (-1*dim0)*tetCount+2], [0,(-1*dim0*dim1)*tetCount+0], [0,4] ]
					    , [ [ 1, ( 1 )*tetCount+2], [1, (1*dim0)*tetCount+1], [1, (1*dim0*dim1)*tetCount+3], [1,4] ]
					    , [ [ 2, (1*dim0*dim1)*tetCount+2], [2, (-1)*tetCount+3], [2, (1*dim0)*tetCount+0], [2,4] ]
					    , [ [ 3, (1*dim0*dim1)*tetCount+1], [3, (-1*dim0)*tetCount+3], [3, 4], [3,( 1 )*tetCount+0] ]
					    , [ [4, 0], [4,1], [4,2], [4,3] ]
					    ]
					];


//	const referenceTetEdgeFormationsAroundTetEdges=[ [ [0],[1] ], [ [0],[2] ], [ [0], [3] ], [ [0], [4] ], [ [ 1],[2] ], [ [ 1], [3] ], [ [  2], [3]] 
//						]
	// this is, for even/odd, for each tet, for each edge, the other mating tet index (plus data offset)

	const TetFaceMapping = [ [  [ ( 1 *dim0*dim1 ) * tetCount    + 0, (-1*dim0)*tetCount + 2, (-1)*tetCount           + 3, (0)*tetCount       + 4]
			            ,  [ ( 1 ) * tetCount            + 0, (0)*tetCount       + 4, (-1*dim0*dim1)*tetCount + 3, (-1*dim0)*tetCount + 1]
			            ,  [ ( 1 *dim0 ) * tetCount      + 0, (-1)*tetCount      + 1, (-1*dim0*dim1)*tetCount + 2, (0)*tetCount       + 4]
			            ,  [ ( 1 *dim0*dim1 ) * tetCount + 1, (0)*tetCount       + 4, (1*dim0)*tetCount       + 3, ( 1 )*tetCount       + 2]
			            ,  [ ( 0 ) * tetCount            + 0, (0)*tetCount       + 3, (0)*tetCount            + 2, (0)*tetCount       + 1]
			            ]
					/* Duplicated from above - this will be a bad map... */
			          , [  [ ( -1 ) * tetCount           + 1, (-1*dim0)*tetCount + 2, (-1*dim0*dim1)*tetCount + 0, (0)*tetCount       + 4]
			            ,  [ ( 1 ) * tetCount            + 2, (1*dim0)*tetCount  + 1, (-1*dim0*dim1)*tetCount + 3, (-1*dim0)*tetCount + 3]
			            ,  [ ( 1 *dim0*dim1 ) * tetCount + 2, (-1)*tetCount      + 3, (1*dim0)*tetCount       + 1, (0)*tetCount       + 4]
			            ,  [ ( 1 *dim0*dim1 ) * tetCount + 1, (-1*dim0)*tetCount + 3, (0)*tetCount            + 4, ( 1 )*tetCount       + 0]
				    ,  [ ( 0 ) * tetCount            + 0, (0)*tetCount       + 3, (0)*tetCount            + 1, (0)*tetCount       + 2]
			            ]	
			          ];
	
	meshCloud( data,dims );
	return null;

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



function meshCloud(data, dims) {

	// values input to this are in 2 planes for lower and upper values

	//const pointSchedule = makeList();

	// vertex paths 0-1 0-2, 0-3  1-2 2-3 3-1
	// this is the offset from dataOffset to the related value.

	// index with [odd] [tet_of_cube] [0-5 line index]
	// result is composite point data offset.
	
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
		bits = new Uint8Array(dim0*dim1*dim2);
		pointHolder[0] = new Int32Array(sizes);
		crossHolder[0] = new Uint8Array(sizes);
		contentHolder[0] = new Uint8Array(dim0*dim1*dim2*5);  // 1 bit for each tet in each cell. (5)
		for( let zz = normalHolder[0].length; zz < sizes; zz++ ) {
			normalHolder[0].push( null );
		}
		for( let zz = pointMergeHolder[0].length; zz < (dim0*dim1*dim2); zz++ ) {
			pointMergeHolder[0].push( null ); 
		}
	}
	pointStateHolder.length = 0;	
	// all work space has been allocated by this point.
	// now, for each layer, compute inside-outside crossings ('cross').. which interestingly relates to 'cross product' but in a 2D way...

	const points  = pointHolder[0];
	const pointMerge  = pointMergeHolder[0];
	const normals = normalHolder[0];
	const crosses = crossHolder[0];
	const content = contentHolder[0];
	for( let zero = 0; zero < dim0*dim1*dim2; zero++ ) {
		pointMerge[zero] = null;
		// make sure to reset this... 
		for( let crz = 0; crz < 6; crz++ ) crosses[zero*6+crz] = 0;
		for( let crz = 0; crz < 5; crz++ )  { content[zero*5+crz] = 0; normals[zero*5+crz] = null; }
	}
	for( var z = 0; z < dim2; z++ ) {
	
		let odd = 0;
		let zOdd = z & 1;
		cellOrigin[2] = z-dim2/2;

		//if( z < 13 || z > 15 )continue;
		//if( z < 16 || z > 18 ) continue;
		
		// compute one layer (x by y) intersections (cross from inside to outside).
		// each cell individually has 16 intersections
		// the first cell needs 9 intersections computed; the subsequent cells providing the computation for the 7 'missing'
		// 3 intersections per cell after the first layer can be copied; but shift in position (moving from the top to the bottom)
		// 
		for( var y = 0; y < dim1-1; y++ ) {
		//	if( y < 3 || y > 6 ) continue;
		//	if( y > 3 ) continue;
			cellOrigin[1] = y-dim1/2;
			for( var x = 0; x < dim0-1; x++ ) {
			//	if( x < 7 || x > 10 ) continue;
		//		if( x < 25 || x > 27 ) continue;
				odd = (( x + y ) &1) ^ zOdd;
		//		if( x < 12 || x > 15 ) continue;
				cellOrigin[0] = x-dim0/2;
	
				const baseHere = (x+0 + y*dim0 + z*(dim0*dim1))*6;
				const baseOffset = x+0 + y*dim0 + z * dim0*dim1;
				const lineArray = linesMin[odd];
				bits[baseOffset] = 0;
				//console.log( "Set bits to 0", baseOffset)
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
					/*
					if( d > 0 && e > 0 ) {
						if( d < e ) {
							if( (e-d) < 1 ) {
								// need to check with another point behind the surface...

								// the surface values are split.
								pointOutputHolder[0] = cellOrigin[0] + geom[p1][0]+( geom[p0][0]- geom[p1][0])* t;
								pointOutputHolder[1] = cellOrigin[1] + geom[p1][1]+( geom[p0][1]- geom[p1][1])* t;
								pointOutputHolder[2] = cellOrigin[2] + geom[p1][2]+( geom[p0][2]- geom[p1][2])* t;
								//console.log( "new point(1):", pointOutputHolder, t, data[data0], data[data1], data0, data1 );
								normal = PointState( pointOutputHolder
									, elements.data[data0]
									, elements.data[data1]
									, t
								);
								normal.invert = true; // d is > 0 and e < 0 which puts e outside and d inside
								if( t < 0.00001 )  {
									pointMerge[baseOffset+dataOffset[p1]] = normal;
								} else if( t > 1-0.00001 ) {
									pointMerge[baseOffset+dataOffset[p0]] = normal;	
								}
								points[baseHere+l] = normal.id;

								pointOutputHolder[0] = cellOrigin[0] + geom[p1][0]+( geom[p0][0]- geom[p1][0])* t;
								pointOutputHolder[1] = cellOrigin[1] + geom[p1][1]+( geom[p0][1]- geom[p1][1])* t;
								pointOutputHolder[2] = cellOrigin[2] + geom[p1][2]+( geom[p0][2]- geom[p1][2])* t;
								//console.log( "new point(1):", pointOutputHolder, t, data[data0], data[data1], data0, data1 );
								normal = PointState( pointOutputHolder
									, elements.data[data0]
									, elements.data[data1]
									, t
								);
								normal.invert = true; // d is > 0 and e < 0 which puts e outside and d inside
								if( t < 0.00001 )  {
									pointMerge[baseOffset+dataOffset[p1]] = normal;
								} else if( t > 1-0.00001 ) {
									pointMerge[baseOffset+dataOffset[p0]] = normal;	
								}

								points[baseHere+l+6] = normal.id;
							}
						}
					} else */
					if( ( d <= 0 && e >0  )|| (d > 0 && e <= 0 ) ){
						let t;
						let normal = null;
						//console.log( "x, y is a cross:", x+y*dim0,(x+y*dim0)*6, crosses.length, baseOffset+l, x, y, p0, p1, data0, data1, `d:${d} e:${e}` );
						if( e <= 0 ) {
							(t = -e/(d-e));
// --V-V-V-V-V-V-V-V-- CREATE OUTPUT POINT(VERTEX) HERE --V-V-V-V-V-V-V-V--
							normal = null;
							if( t < 0.00001 )  {
								normal = pointMerge[baseOffset+dataOffset[p1]];
							} else if( t > 1-0.001 ){
								normal = pointMerge[baseOffset+dataOffset[p0]];
							}
							if( true || !normal ) {
								pointOutputHolder[0] = cellOrigin[0] + geom[p1][0]+( geom[p0][0]- geom[p1][0])* t;
								pointOutputHolder[1] = cellOrigin[1] + geom[p1][1]+( geom[p0][1]- geom[p1][1])* t;
								pointOutputHolder[2] = cellOrigin[2] + geom[p1][2]+( geom[p0][2]- geom[p1][2])* t;
								//console.log( "new point(1):", pointOutputHolder, t, data[data0], data[data1], data0, data1 );
								normal = PointState( pointOutputHolder
									, elements.data[data0]
									, elements.data[data1]
									, t
								);
								normal.invert = 1; // d is > 0 and e < 0 which puts e outside and d inside
								if( t < 0.00001 )  {
									pointMerge[baseOffset+dataOffset[p1]] = normal;
								} else if( t > 1-0.00001 ) {
									pointMerge[baseOffset+dataOffset[p0]] = normal;	
								}
							}
							points[baseHere+l] = normal.id;
// --^-^-^-^-^-^-- END OUTPUT POINT(VERTEX) HERE --^-^-^-^-^-^--
						} else {
							(t = -d/(e-d));
// --V-V-V-V-V-V-V-V-- OUTPUT POINT 2 HERE --V-V-V-V-V-V-V-V--
							normal = null;
							if( t < 0.0001 )  {
								normal = pointMerge[baseOffset+dataOffset[p0]];
							} else if( t > 1-0.001 )  {
								normal = pointMerge[baseOffset+dataOffset[p1]];
							}
							if( true ||!normal ) {
								pointOutputHolder[0] = cellOrigin[0] + geom[p0][0]+( geom[p1][0]- geom[p0][0])* t;
								pointOutputHolder[1] = cellOrigin[1] + geom[p0][1]+( geom[p1][1]- geom[p0][1])* t;
								pointOutputHolder[2] = cellOrigin[2] + geom[p0][2]+( geom[p1][2]- geom[p0][2])* t;
								//console.log( "new point(2):", pointOutputHolder );
								normal = PointState( pointOutputHolder
									, elements.data[data0]
									, elements.data[data1]
									, t
								);
								normal.invert = 0;  // d is < 0 or outside... 
								if( t < 0.00001 ) 
									pointMerge[baseOffset+dataOffset[p0]] = normal;
								else if( t > 1-0.00001 )
									pointMerge[baseOffset+dataOffset[p1]] = normal;
							}
							points[baseHere+l] = normal.id;
// --^-^-^-^-^-^-- END  OUTPUT POINT 2 HERE --^-^-^-^-^-^--
						}
						bits_++;
						crosses[baseHere+l] = 1;
						//console.log( "set position crosses:", x, y, z, baseHere,l, `d:${d} e:${e}`  );
					}
					else {
						//console.log( "x,y does not cross", x, y, z, baseHere, l, `d:${d} e:${e}` ); 
						points[baseHere+l] = -baseHere-l;
						crosses[baseHere+l] = 0;
					}
				}
			}
		}
	}

	
	// this computes normals at the points on the tet's face.
	// the face's point-normal can be determined here...
	for( var z = 0; z < dim2; z++ ) {
		// for all boundary crossed points, generate the faces from the intersection points.
		for( var y = 0; y < dim1; y++ ) {
			//if( y > 3 ) continue;
			for( var x = 0; x < dim0; x++ ) {
				//if( x < 5 || x > 32 ) continue;
				let usedTets = false;
				let tetSkip = 0;
				const baseOffset = (x + (y*dim0) + z*dim0*dim1)*6;
				const normOffset = (x + (y*dim0) + z*dim0*dim1)*5; // 1 point-norm per tet
				if( x >= (dim0-1)) tetSkip |= 1;
				if( y >= (dim1-1)) tetSkip |= 2;
				if( z >= (dim2-1)) tetSkip |= 4;
				const dataOffset = x + (y*dim0) + z*dim1*dim0;
	        	const odd = (( x + y + z ) &1);
				for( let tet = 0; tet < 5; tet++ ) {
					if( tetMasks[odd][tet] & tetSkip ) continue;

					let invert = 0;
					let useFace = 0;

					// this is 'valid combinations' check.
					if( crosses[ baseOffset+edgeToComp[odd][tet][0] ] ) {
						//console.log( `Output: odd:${odd} tet:${tet} x:${x} y:${y} a:${JSON.stringify(a)}` );
						if( crosses[ baseOffset+edgeToComp[odd][tet][1] ] ) {
							if( crosses[ baseOffset+edgeToComp[odd][tet][2] ] ) {
								// lower left tet. // source point is 0
								useFace = 1;								
								invert = ( data[dataOffset+vertToData[odd][tet][0]] >= 0 )?1:0;
								if( tetPointInversions[odd][tet][0] )
									invert = 1-invert;
							} else {
								if( crosses[ baseOffset+edgeToComp[odd][tet][4] ] && crosses[ baseOffset+edgeToComp[odd][tet][5] ]) {
									// source point is 2? 1?   (0?3?)
									useFace = 2;
									invert = ( data[dataOffset+vertToData[odd][tet][0]] >= 0 )?1:0 ;
									if( tetPointInversions[odd][tet][0] )
										invert = 1-invert;
								}
							}
						} else {
							if( crosses[ baseOffset+edgeToComp[odd][tet][2]] && crosses[ baseOffset+edgeToComp[odd][tet][3]] && crosses[ baseOffset+edgeToComp[odd][tet][5] ] ) {
								// source point is ? 1? 3?   (0? 2?)
								useFace = 3;
								invert = ( data[dataOffset+vertToData[odd][tet][0]] >= 0 )?1:0  ;
								if( tetPointInversions[odd][tet][0] )
									invert = 1-invert;
							}else if( crosses[ baseOffset+edgeToComp[odd][tet][3]] && crosses[ baseOffset+edgeToComp[odd][tet][4] ] ) {
								// source point is 1
								useFace = 4;
								invert = ( data[dataOffset+vertToData[odd][tet][0]] >= 0 )?1:0
								if( tetPointInversions[odd][tet][0] )
									invert = 1-invert;
							}
						}
					} else {
						if( crosses[ baseOffset+edgeToComp[odd][tet][1] ] ) {
							if( crosses[ baseOffset+edgeToComp[odd][tet][2] ] && crosses[ baseOffset+edgeToComp[odd][tet][3] ] && crosses[ baseOffset+edgeToComp[odd][tet][4] ]) {
								// 0?1?   2?3?
								useFace = 5;
								invert = ( data[dataOffset+vertToData[odd][tet][1]] >= 0 )  ?1:0
								if( tetPointInversions[odd][tet][1] )
									invert = 1-invert;
							} else if( crosses[ baseOffset+edgeToComp[odd][tet][3]] && crosses[ baseOffset+edgeToComp[odd][tet][5] ] ) {
								// source point is 2
								useFace = 6;
								invert = ( data[dataOffset+vertToData[odd][tet][1]] >= 0 ) ?1:0
								if( tetPointInversions[odd][tet][1] )
									invert = 1-invert;
							}
						} else {
							if( crosses[ baseOffset+edgeToComp[odd][tet][2] ] && crosses[ baseOffset+edgeToComp[odd][tet][4]] && crosses[ baseOffset+edgeToComp[odd][tet][5] ] ) {
								// source point is 3
								useFace = 7;
								invert = ( data[dataOffset+vertToData[odd][tet][2]] >= 0 ) ?1:0
								if( tetPointInversions[odd][tet][2] )
									invert = 1-invert;
							}
						}
					}

					if( odd == 0 && tet == 0 && invert ) {
						console.log( "adding a tet...", x,y,z,odd, tet, invert, useFace );
					}
					if( false && !useFace && usedTets ) {
						console.log( "Didn't find a face in a tet (sometimes OK)", x, y, z, odd, tet, baseOffset
								,"CRS:"
								, crosses[baseOffset+edgeToComp[odd][tet][0] ]
								, crosses[baseOffset+edgeToComp[odd][tet][1] ]
								, crosses[baseOffset+edgeToComp[odd][tet][2] ]
								, crosses[baseOffset+edgeToComp[odd][tet][3] ]
								, crosses[baseOffset+edgeToComp[odd][tet][4] ]
								, crosses[baseOffset+edgeToComp[odd][tet][5] ]
								,edgeToComp[odd][tet][0]
								,edgeToComp[odd][tet][1]
								,edgeToComp[odd][tet][2]
								,edgeToComp[odd][tet][3]
								,edgeToComp[odd][tet][4]
								,edgeToComp[odd][tet][5]
								)
					}

					// compute the point-normal of the face.
					// the averaging of near normals on the points, which are then
					// re-averaged to the face normal would
					// still just be the face normal, with a lot less extra steps.
					if( useFace-- ) {
						const fpi = facePointIndexes[odd][tet][invert][useFace];
						const pCenter = [0,0,0];
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
							const vA = pointStateHolder[ai].vertBuffer;
							const vB = pointStateHolder[bi].vertBuffer;
							const vC = pointStateHolder[ci].vertBuffer;
							
							let v1, v2, v3;
							const AisB =  ( ( vA[0] === vB[0] ) && ( vA[1] === vB[1]  ) && ( vA[2] === vB[2]  ) );
							const AisC =  ( ( vA[0] === vC[0] ) && ( vA[1] === vC[1]  ) && ( vA[2] === vC[2]  ) );
							const BisC =  ( ( vB[0] === vC[0] ) && ( vB[1] === vC[1]  ) && ( vB[2] === vC[2]  ) );
							if( AisB || BisC || AisC ) {
								//console.log( "zero size tri-face", x, y, z, odd, tet, tri, useFace, AisB,AisC,BisC );
								continue;
							}
							v1 = vB;
							v2 = vC;
							v3 = vA;

							fnorm[0] = v2[0]-v1[0];fnorm[1] = v2[1]-v1[1];fnorm[2] = v2[2]-v1[2];
							tmp[0] = v3[0]-v1[0];tmp[1] = v3[1]-v1[1];tmp[2] = v3[2]-v1[2];
							let a=fnorm[0], b=fnorm[1];
							fnorm[0]=fnorm[1]*tmp[2] - fnorm[2]*tmp[1];
							fnorm[1]=fnorm[2]*tmp[0] - a       *tmp[2];
							fnorm[2]=a       *tmp[1] - b       *tmp[0];
							let ds;
							if( (ds=fnorm[0]*fnorm[0]+fnorm[1]*fnorm[1]+fnorm[2]*fnorm[2]) > 0.000001 ){
								//console.log( "Took 1", v1,v2,v3 );
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
						
							fnorm[0] = lnQA.x;
							fnorm[1] = 0; // y is always 0
							fnorm[2] = lnQA.z;


							pCenter[0] = (vA[0]+vB[0]+vC[0])/3;
							pCenter[1] = (vA[1]+vB[1]+vC[1])/3;
							pCenter[2] = (vA[2]+vB[2]+vC[2])/3;

							let tv = normals[normOffset+tet];
							if( !tv )  {
								tv = new TetVertBase( pCenter, fnorm.slice(0,3), invert
									, pointStateHolder[ai], pointStateHolder[bi], pointStateHolder[ci] );
								normals[normOffset+tet] = tv;//{id:0,p:p,n:n,sources:[psh1, psh2,psh3], i:invert};
							} else {
								tv.update( pCenter, fnorm, pointStateHolder[ai], pointStateHolder[bi], pointStateHolder[ci] )
							}

							if( odd == 0 && tet == 0 && invert && normalVertices){
								const up = lnQA.set( 0, tv.n[0],tv.n[1],tv.n[2]).update().up();
								normalVertices.push( new THREE.Vector3( tv.p[0],tv.p[1]+0.02,tv.p[2]+0.02 ))
								normalVertices.push( new THREE.Vector3( tv.p[0]+up.x*1.3,tv.p[1]+up.y*1.3,tv.p[2]+up.z*1.3));
								normalColors.push( new THREE.Color( 1.0,0,0,1.0 ))
								normalColors.push( new THREE.Color( 1.0,0,0,1.0 ))
							}
							usedTets = true;
						}
						bits[dataOffset] = 1;
						//console.log( "Set position:", x, y, z, normOffset, tet, useFace );
						content[normOffset + tet] = 1;
// --^-^-^-^-^-^-- END GENERATE NORMALS (if face) --^-^-^-^-^-^--
					}
				}
			}
		}
	}

	// 0 = Y X Z
	// 1 = X Z Y
	// 2 = Z X Y
	// 3 = x y z
	// 4 = y z x
	// 5 = z y x

	// X(biggest)   1 3
	// y(biggest)   0 4
	// z(biggest)   2 5
	// y > x  0 4 5	
	// x > y  1 2 3 
	// y > z  0 3 4
	// x > z  0 1 3
	// z > x  2 4 5
	// z > y  1 2 5

	//direction is 0-7 .. (1,1,1), (-1,1,1), (1,-1,1), (-1,-1,1), (1,1,-1), (-1,1,-1), (1,-1,-1), (-1,-1,1)

	function getNormalState( s, baseNormal ) {
		const norm = lnQA.set( 0, baseNormal[0],baseNormal[1], baseNormal[2] ).update().up();
					
		let bnx = norm.x;
		let bny = norm.y;
		let bnz = norm.z;
		s.dir = 0;
		if( bnx < 0 ) { s.dir |= 1; bnx = -bnx; }
		if( bny < 0 ) { s.dir |= 2; bny = -bny; }
		if( bnz < 0 ) { s.dir |= 4; bnz = -bnz; }
		if( bnx > bny )  // x > y
			if( bnx > bnz ) // x > z
				if( bny > bnz ) s.largest=0;//0*3+2; // y>z xmax  z min
				else s.largest=1;//0*3+1; // xmax, ymin
			else s.largest=2;//2*3+1; // z longest, x mid  y least
		else if( bny > bnz ) // x < y, y > z   (y > x ) 
			if( bnx>bnz ) s.largest=3;//1*3+2;  // x>z   z min
			else s.largest=4;//1*3+0;  // y longest, z mid, x short
		else s.largest = 5;//2*3 + 0; // z longest, y mid,  x min
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
					lnQA.set( 0,ai_.n[0],ai_.n[1],ai_.n[2] ).update();
					const an = lnQA.up();
					lnQA.set( 0,bi_.n[0],bi_.n[1],bi_.n[2] ).update();
					const bn = lnQA.up();
					lnQA.set( 0,ci_.n[0],ci_.n[1],ci_.n[2] ).update();
					const cn = lnQA.up();
					n = [[an.x,an.y,an.z],[cn.x,cn.y,cn.z],[bn.x,bn.y,bn.z]];
				} else {
					n = [faceNormals[ai],faceNormals[ci],faceNormals[bi]];// these are three.vectors isntead...
					lnQA.set( 0,faceNormals[ai].x,faceNormals[ai].y,faceNormals[ai].z ).update();
					const an = lnQA.up();
					lnQA.set( 0,faceNormals[bi].x,faceNormals[bi].y,faceNormals[bi].z ).update();
					const bn = lnQA.up();
					lnQA.set( 0,faceNormals[ci].x,faceNormals[ci].y,faceNormals[ci].z ).update();
					const cn = lnQA.up();
					n = [an,cn,bn];
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
			//n = [faceNormals[ai],faceNormals[ci],faceNormals[bi]];// these are three.vectors isntead...
			lnQA.set( 0,faceNormals[ai].x,faceNormals[ai].y,faceNormals[ai].z ).update();
			const an = lnQA.up();
			lnQA.set( 0,faceNormals[bi].x,faceNormals[bi].y,faceNormals[bi].z ).update();
			const bn = lnQA.up();
			lnQA.set( 0,faceNormals[ci].x,faceNormals[ci].y,faceNormals[ci].z ).update();
			const cn = lnQA.up();
			n = [an,cn,bn];
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
			faceNormals.push( p.n );
			p.id = normal.id+1;
			return p;
		}else {
			if( smoothShade ) {
				if( !p.id ) {
					p.id = (vertices.push(new THREE.Vector3( p.p[0],  p.p[1], p.p[2] )),vertices.length-1)+1;
					if( n ) {
						lnQA.set( 0,n[0],n[1],n[2] ).update();
						const an = lnQA.up();
						faceNormals.push( new THREE.Vector3( an.x,an.y,an.z ) );
					} else {
						lnQA.set( 0, p.n[0], p.n[1], p.n[2] ).update();
						const an = lnQA.up();
						faceNormals.push( new THREE.Vector3( p.n[0], p.n[1], p.n[2] ) );
					}
				}
				return p;//p.id - 1;
			}else {
				let newId = (vertices.push(new THREE.Vector3( p.p[0],  p.p[1], p.p[2] )),vertices.length-1)+1;
				if( n ) {
					lnQA.set( 0,n[0],n[1],n[2] ).update();
					const an = lnQA.up();
					faceNormals.push( new THREE.Vector3( an.x,an.y,an.z ) );
				} else {
					lnQA.set( 0, p.n[0], p.n[1], p.n[2] ).update();
					const an = lnQA.up();
					faceNormals.push( new THREE.Vector3( p.n[0], p.n[1], p.n[2] ) );
				}
				p.id = newId;  // this will get updated dynamically
				return p;
			}
		}
	}
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
			if( ( crossDel[0] * faceNormal[0] + crossDel[1] * faceNormal[1] + crossDel[2] * faceNormal[2] ) > 0 )
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

	function outputFace( inv, n1, n2, n3, n4 ){
		//inv = 0
		const f = getFold( n1.n, n1.p, n2.p, n3.p, n4.p );
		if( f >= 0 ) {
			const p0 = addPoint( n1 );
			const p1 = addPoint( n2);
			const p2 = addPoint( n3);
			const p3 = addPoint( n4);
			if( f ) 
				if( inv ){
					addFace( p0, p2, p1, (!smoothShade)?null:[n1.n,n3.n,n2.n] );
					addFace( p0, p3, p2, (!smoothShade)?null:[n1.n,n4.n,n3.n] );
				}else {
					addFace( p0, p1, p2, (!smoothShade)?null:[n1.n,n2.n,n3.n] );
					addFace( p0, p2, p3, (!smoothShade)?null:[n1.n,n3.n,n4.n] );
				}
			else
				if( inv ){
					addFace( p1, p3, p2, (!smoothShade)?null:[n2.n,n4.n,n3.n] );
					addFace( p1, p0, p3, (!smoothShade)?null:[n2.n,n1.n,n4.n] );
				}else {
					addFace( p1, p2, p3, (!smoothShade)?null:[n2.n,n3.n,n4.n] );
					addFace( p1, p3, p0, (!smoothShade)?null:[n2.n,n4.n,n1.n] );
				}
		}else {
			let a = measureTriFace( n1.p, n2.p, n3.p );
			if( a > 0.1 ){
				console.log( "Recovered lost face?");
				const p1 = addPoint( n1);
				const p2 = addPoint( n2);
				const p3 = addPoint( n3);
				if( inv )
					addFace( p1, p3, p2, (!smoothShade)?null:[n1.n,n3.n,n2.n] );
				else
					addFace( p1, p2, p3, (!smoothShade)?null:[n1.n,n2.n,n3.n] );
			}
			a = measureTriFace( n1.p, n3.p, n4.p );
			if( a > 0.1 ){
				console.log( "Recovered lost face?");
				const p1 = addPoint( n1);
				const p2 = addPoint( n3);
				const p3 = addPoint( n4);
				if( inv )
					addFace( p1, p3, p2,(!smoothShade)?null:[n1.n,n3.n,n2.n] );
				else
					addFace( p1, p2, p3,(!smoothShade)?null:[n1.n,n2.n,n3.n] );
			}
		}
	}


	//const drawToggle = 0xFFFFFFFF;
	//const drawToggle = 0xFFff;
	//const drawToggle = 0xFF00;
	//const drawToggle = 0x10;
	//const drawToggle = 0x0900;
	//const drawToggle = 0xFF;
	//const drawToggle = 0xF0;
	//const drawToggle = 0xc0;
	const drawToggle = 0xff;
	const ifDraw = (n)=>drawToggle & (1<<n)

	for( var z = 0; z < dim2; z++ ) {
		//if(!( z > (dim2-4) )) continue;
		//if( z < 9 || z > 18 ) continue;
		// for all bounday crossed points, generate the faces from the intersection points.
		for( var y = 0; y < dim1; y++ ) {
			//if( y > 3 ) continue;
			for( var x = 0; x < dim0; x++ ) {
				//if( x < 4 || x > 11 ) continue;
				let added = 0;
				outX = x; outY = y; outZ = z;
				const odd = (x+y+z)&1;
				const offset = (x + (y*dim0) + z*dim0*dim1);
				//if( !( x > 8 && x < 10 && y > 3 && y < 9 && z > 17 && z < 19 ))
				//	continue;
				//console.log( "scanning normal:", x, y, z, bits[offset], offset )
				if( !bits[offset] ) {
					continue
				}
				const baseOffset = offset*5;
				let baseNormal;

				let n0,n1,n2,n3,n4;
				if( baseNormal = normals[baseOffset+4] ) {
					// goes through the center.

					const normDir = { dir:0, largest:0 };
					let inv = 0;
					//console.log( "Has Center.",content[baseOffset+0],content[baseOffset+1],content[baseOffset+2],content[baseOffset+3] );
					getNormalState( normDir, baseNormal.n );
					if( !content[baseOffset+0] ) {
						// sanity check that 1 2 and 3 are good?
						// big slice from here... which is not 0, even.
						// small slice from not 3, odd
						if(ifDraw(0))
						if( !odd ) {
							if( 0 || ( !content[baseOffset+1] )||( !content[baseOffset+2] )||( !content[baseOffset+3] ) )
							{
								//console.log( "Bad computation, missing a required intersection if the surface is here..." );
								continue;
							}
							added++;
							switch( normDir.dir ) {
								case 4: case 5: case 6: case 0: 
									inv = 0;
									break;
								case 7:
									inv = 1;
									break;
								default:
									inv = 1;
									
							}
							inv = (n0 = normals[baseOffset+4]).sources[0].invert;
							const p0 = addPoint( n0 );
							const p1 = addPoint( n1 = normals[baseOffset+1]);
							const p2 = addPoint( n2 = normals[baseOffset+2]);
							const p3 = addPoint( n3 = normals[baseOffset+3]);
							_debug_output && console.log( "A?", normDir );
							if( inv ){
								addFace( p0, p1, p2 );
								addFace( p0, p2, p3 );
								addFace( p0, p3, p1 );
							}else {
								addFace( p0, p2, p1 );
								addFace( p0, p3, p2 );
								addFace( p0, p1, p3 );
							}
							usedTets[odd][inv][normDir.dir][normDir.largest] = 1;
						} else {
							if( 0 || ( !content[baseOffset+1] )||( !content[baseOffset+2] )||( !content[baseOffset+3] ) )
							{
								//console.log( "Bad computation, missing a required intersection if the surface is here..." );
								continue;
							}
							added++;

							switch( normDir.dir ){
								case 0: case 1: case 2: case 4:
									inv = 1;
									break;
								default:
									inv = 0;
							}

							inv = (n0 = normals[baseOffset+4]).sources[0].invert;
							const p0 = addPoint( n0 );
							const p1 = addPoint( n1 = normals[baseOffset+1]);
							const p2 = addPoint( n2 = normals[baseOffset+2]);
							const p3 = addPoint( n3 = normals[baseOffset+3]);
							if( inv ){
								addFace( p0, p1, p2 );
								addFace( p0, p2, p3 );
								addFace( p0, p3, p1 );
		
							}else {
								addFace( p0, p2, p1 );
								addFace( p0, p3, p2 );
								addFace( p0, p1, p3 );
							}
							usedTets[odd][inv][normDir.dir][normDir.largest] = 1;
						}
					}
					else if( !content[baseOffset+1] ) {
						if(ifDraw(1))
						if( !odd ) {
							if( ( !content[baseOffset+0] )||( !content[baseOffset+2] )||( !content[baseOffset+3] ) )
							{
								_debug_output && console.log( "Bad computation, missing a required intersection if the surface is here..." );
								continue;
							}
							added++;
							switch( normDir.dir ){
								case 1: case 0: case 5: case 3:
									inv = 0;
									break;
								default:
									inv = 1;
							}

							inv = (n0 = normals[baseOffset+4]).sources[0].invert;
							const p0 = addPoint( n0 );
							const p1 = addPoint( n1 = normals[baseOffset+0]);
							const p2 = addPoint( n2 = normals[baseOffset+2]);
							const p3 = addPoint( n3 = normals[baseOffset+3]);
							_debug_output && console.log( "B?" );
							if( inv ) {
								addFace( p0, p2, p1 );
								addFace( p0, p3, p2 );
								addFace( p0, p1, p3 );
							}else{
								addFace( p0, p1, p2 );
								addFace( p0, p2, p3 );
								addFace( p0, p3, p1 );
							}
							usedTets[odd][inv][normDir.dir][normDir.largest] = 1;
						} else {
							if( ( !content[baseOffset+0] )||( !content[baseOffset+2] )||( !content[baseOffset+3] ) )
							{
								console.log( "Bad computation, missing a required intersection if the surface is here..." );
								continue;
							}
							added++;
							switch( normDir.dir ){
								case 0: case 2: case 3: case 6:
									inv = 0;
									break;
								default:
									inv = 1;
									break;
							}

							inv = (n0 = normals[baseOffset+4]).sources[0].invert;
							const p0 = addPoint( n0 );
							const p1 = addPoint( n1 = normals[baseOffset+0]);
							const p2 = addPoint( n2 = normals[baseOffset+2]);
							const p3 = addPoint( n3 = normals[baseOffset+3]);
								
							_debug_output && console.log( "B2?" );
							if( inv ) {
								addFace( p0, p2, p1 );
								addFace( p0, p3, p2 );
								addFace( p0, p1, p3 );
							}else{
								addFace( p0, p1, p2 );
								addFace( p0, p2, p3 );
								addFace( p0, p3, p1 );
							}

							usedTets[odd][inv][normDir.dir][normDir.largest] = 1;
						}
					}
					else if( !content[baseOffset+2] ) {
						if(ifDraw(2))
						if( !odd ) {
							if( ( !content[baseOffset+1] )||( !content[baseOffset+0] )||( !content[baseOffset+3] ) )
							{
								console.log( "Bad computation, missing a required intersection if the surface is here..." );
								continue;
							}
							added++;
							inv = 0;
							switch(normDir.dir ){
								case 5:case 4:case 7:case 1:
									break;
								default:
									inv = 1-inv;
							}							
							inv = (n0 = normals[baseOffset+4]).sources[0].invert;
							const p0 = addPoint( n0 );
							const p1 = addPoint( n1 = normals[baseOffset+0]);
							const p2 = addPoint( n2 = normals[baseOffset+1]);
							const p3 = addPoint( n3 = normals[baseOffset+3]);
							if( inv ) {
								_debug_output && console.log( "Ci?" );
								addFace( p0, p2, p1 );
								addFace( p0, p3, p2 );
								addFace( p0, p1, p3 );
							}else {
								_debug_output && console.log( "Cn?" );
								addFace( p0, p1, p2 );
								addFace( p0, p2, p3 );
								addFace( p0, p3, p1 );
		
							}
							usedTets[odd][inv][normDir.dir][normDir.largest] = 1;
						}else {
							if( ( !content[baseOffset+1] )||( !content[baseOffset+0] )||( !content[baseOffset+3] ) )
							{
								console.log( "Bad computation, missing a required intersection if the surface is here..." );
								continue;
							}
							inv = 0;
							switch(normDir.dir ){
								case 6:case 4:case 7:case 2:
									break;
								default:
									inv = 1-inv;
							}							
							inv = (n0 = normals[baseOffset+4]).sources[0].invert;
							const p0 = addPoint( n0 );
							const p1 = addPoint( normals[baseOffset+0]);
							const p2 = addPoint( n2 = normals[baseOffset+1]);
							const p3 = addPoint( normals[baseOffset+3]);
							_debug_output && console.log( "D?" );
							if( inv ) {
								addFace( p0, p2, p1 );
								addFace( p0, p3, p2 );
								addFace( p0, p1, p3 );
							}else {
								addFace( p0, p1, p2 );
								addFace( p0, p2, p3 );
								addFace( p0, p3, p1 );
							}
							usedTets[odd][inv][normDir.dir][normDir.largest] = 1;
						}
					}
					else if( !content[baseOffset+3] ) {
						if(ifDraw(3))
						if( !odd ) {
							if( ( !content[baseOffset+1] )||( !content[baseOffset+2] )||( !content[baseOffset+0] ) )
							{
								console.log( "Bad computation, missing a required intersection if the surface is here..." );
								continue;
							}
							added++;
							inv = 0;
							switch( normDir.dir) {
								case 0: case 2: case 1: case 4: 
									inv = 1-inv;
									break;
								default:
									//if( !(normDir.dir & 4) )inv = 1-inv;
									break;
							}
							inv = (n0 = normals[baseOffset+4]).sources[0].invert;
							const p0 = addPoint( n0 );
							const p1 = addPoint( normals[baseOffset+0]);
							const p2 = addPoint( n2 = normals[baseOffset+1]);
							const p3 = addPoint( normals[baseOffset+2]);
							_debug_output && console.log( "E?" );

							if( inv ) {
								addFace( p0, p2, p1 );
								addFace( p0, p3, p2 );
								addFace( p0, p1, p3 );
							}else {
								addFace( p0, p1, p2 );
								addFace( p0, p2, p3 );
								addFace( p0, p3, p1 );
							}

						} else {
							if( ( !content[baseOffset+1] )||( !content[baseOffset+2] )||( !content[baseOffset+0] ) )
							{
								console.log( "Bad computation, missing a required intersection if the surface is here..." );
								continue;
							}
							added++;
							inv = 0;
							switch( normDir.dir) {
								case 3: case 2: case 1: case 7: 
									inv = 1-inv;
									break;
								default:
									//if( !(normDir.dir & 4) )inv = 1-inv;
									break;
							}
							inv = (n0 = normals[baseOffset+4]).sources[0].invert;
							const p0 = addPoint( n0 );
							const p1 = addPoint( normals[baseOffset+0]);
							const p2 = addPoint( normals[baseOffset+1]);
							const p3 = addPoint( normals[baseOffset+2]);
							if( inv ) {
								_debug_output && console.log( "Fi?" );
								addFace( p0, p2, p1 );
								addFace( p0, p3, p2 );
								addFace( p0, p1, p3 );
							}else {
								_debug_output && console.log( "Fn?" );
								addFace( p0, p1, p2 );
								addFace( p0, p2, p3 );
								addFace( p0, p3, p1 );
							}

						}
					}
					else {
						// all 5 gets - solid quad emit.
						added++;
						if(ifDraw(4) && 0 )
						{
							const l = normDir.largest;
							inv = 0;
							let o;
							var i1, i2, i3, i4;
							const p0 = addPoint( n0=normals[baseOffset+4]);
							const p1 = addPoint( n1=normals[baseOffset+(i1=tetCentroidFacet[odd][inv][normDir.dir][l][0])]);
							const p2 = addPoint( n2=normals[baseOffset+(i2=tetCentroidFacet[odd][inv][normDir.dir][l][1])]);
							const p3 = addPoint( n3=normals[baseOffset+(i3=tetCentroidFacet[odd][inv][normDir.dir][l][2])]);
							const p4 = addPoint( n4=normals[baseOffset+(i4=tetCentroidFacet[odd][inv][normDir.dir][l][3])]);

							// console.log( "This is still soemtimes brokens... TODO FIXME")
							usedTets[odd][inv][normDir.dir][l] = 1;

							addFace( p0, p1, p2 );
							addFace( p0, p2, p3 );
							addFace( p0, p3, p4 );
							addFace( p0, p4, p1 );
							_debug_output &&  console.log( "G?", x, y, z, odd, inv, normDir );
							_debug_output &&  console.log( "  G? p0",  n0.p );
							_debug_output &&  console.log( "  G? p1",  n1.p );
							_debug_output &&  console.log( "  G? p2",  n2.p );
							_debug_output &&  console.log( "  G? p3",  n3.p );
							_debug_output &&  console.log( "  G? p4",  n4.p );

							if( normalVertices){

								normalVertices.push( new THREE.Vector3( n0.p[0],n0.p[1]+0.02,n0.p[2]+0.02 ))
								normalVertices.push( new THREE.Vector3( n0.p[0]+n0.n[0]*1.3,n0.p[1]+n0.n[1]*1.3,n0.p[2]+n0.n[2]*1.3));
								normalColors.push( new THREE.Color( 1.0,0,0,1.0 ))
								normalColors.push( new THREE.Color( 1.0,0,0,1.0 ))

								normalVertices.push( new THREE.Vector3( n1.p[0],n1.p[1]-0.02,n1.p[2]+0.02 ))
								normalVertices.push( new THREE.Vector3( n1.p[0]+n1.n[0]*1.2,n1.p[1]+n1.n[1]*1.2,n1.p[2]+n1.n[2]*1.2));
								normalColors.push( new THREE.Color( 0,1.0,0,1.0 ))
								normalColors.push( new THREE.Color( 0,1.0,0,1.0 ))

								normalVertices.push( new THREE.Vector3( n2.p[0],n2.p[1]+0.02,n2.p[2]-0.02 ))
								normalVertices.push( new THREE.Vector3( n2.p[0]+n2.n[0]*1.1,n2.p[1]+n2.n[1]*1.1,n2.p[2]+n2.n[2]*1.1));
								normalColors.push( new THREE.Color( 1.0,1.0,0,1.0 ))
								normalColors.push( new THREE.Color( 1.0,1.0,0,1.0 ))

								normalVertices.push( new THREE.Vector3( n3.p[0],n3.p[1]-0.02,n3.p[2]-0.02 ))
								normalVertices.push( new THREE.Vector3( n3.p[0]+n3.n[0],n3.p[1]+n3.n[1],n3.p[2]+n3.n[2]));
								normalColors.push( new THREE.Color( 0,0,1.0,1.0 ))
								normalColors.push( new THREE.Color( 0,0,1.0,1.0 ))

								normalVertices.push( new THREE.Vector3( n4.p[0]-0.02,n4.p[1],n4.p[2] ))
								normalVertices.push( new THREE.Vector3( n4.p[0]+n4.n[0],n4.p[1]+n4.n[1],n4.p[2]+n4.n[2]));
								normalColors.push( new THREE.Color( 1.0,0,1.0,1.0 ))
								normalColors.push( new THREE.Color( 1.0,0,1.0,1.0 ))

							}


						}
					}


				if(1)
					if( odd ) {
						if( (n0 = normals[baseOffset+2]  )) {
							if(ifDraw(5))
							if( (n3 = normals[baseOffset+(1*dim0)*tetCount+2])
							   && (n2 = normals[baseOffset+(1+1*dim0)*tetCount+1] )
							   && (n1 = normals[baseOffset+( 1 )*tetCount+1]) ) {
								added++;
								
								inv = 0;
								const l1 =1/Math.sqrt(  n0.n[0]*n0.n[0] + n0.n[1]*n0.n[1] + n0.n[2]*n0.n[2] ) ;
								const c = [n0.n[0]*l1,n0.n[1]*l1,n0.n[2]*l1];

								const l2 =1/Math.sqrt( n2.n[0]*n2.n[0]+n2.n[1]*n2.n[1]+n2.n[2]*n2.n[2] ) ;
								const c2 = [n2.n[0]*l2,n2.n[1]*l2,n2.n[2]*l2];
								//ncross( c, n2.n, n0.n );
								const d = c[0]*c2[0]+c[1]*c2[1]+c[2]*c2[2];
								if( d > 0 ) {
									if( normDir.dir & 4 ) inv = 0; else inv = 1;
									switch( normDir.largest )		{
										//case 0: case 3: case 4: break; // y > z
										//case 0: case 4: case 5: break; // y > x
										case 0: case 1: case 3: {
											if( ( normDir.largest ===3 )||( normDir.largest ===0 ) ){
												if( normDir.dir === 0 ) inv = 1-inv;
												if( normDir.dir === 7 ) inv = 1-inv;
												//console.log( "EMitting?", normDir, inv );
											}
											break; // x > z
										}
										default:
											break;
									}
									_debug_output && console.log( "I?" );
									inv = n1.sources[0].invert;
									outputFace( inv, n0, n1, n2, n3 );
								}
							}
						
							// 1=2
							// 3=4
							//
							if(ifDraw(6))
							if( (n3=normals[baseOffset+0] )
							   && (n2 = normals[baseOffset + ( 1*dim0*dim1 )*tetCount + 0] )
							   && (n1 = normals[baseOffset + ( 1*dim0*dim1 )*tetCount + 4] )
							   && normals[baseOffset + ( 1*dim0*dim1 )*tetCount + 4] 
							   ) {  // and 3 because is 4
								added++;
								inv = 0;
								//normalVertices.push( new THREE.Vector3( n1.p[0],n1.p[1],n1.p[2] ))
								//normalVertices.push( new THREE.Vector3( n1.p[0] + n1.n[0]/2,n1.p[1] + n1.n[1]/2,n1.p[2] + n1.n[2]/2 ));
								//normalColors.push( new THREE.Color( 0,0.5,0,255 ))
								//normalColors.push( new THREE.Color( 0,0.5,0,255 ))
	
								switch( normDir.largest ){
									case 5: case 3: 
										if(( normDir.dir == 0 )) inv = 0;
										if(( normDir.dir & 2 )) inv = 1-inv;
										break;
									case 4:
										if(( normDir.dir === 1 )) inv = 0;
										//if(( normDir.dir == 0 )) inv = 1-inv;
										if(( normDir.dir & 2 )) inv = 1-inv;
										
										break;
									default:
										if(!( normDir.dir & 1 )) inv = 1-inv;
										break;
								}
								_debug_output && console.log( "J?", x, y, z,normDir );
								
								inv = n1.sources[0].invert;
								outputFace( inv, n0, n1, n2, n3 );

							}

							if(ifDraw(7)) // forward in-plane
							if( (n1 = normals[baseOffset + 0] )
									&& (n2=normals[baseOffset + (1*dim0)*tetCount + 0])
									&& (n3=normals[baseOffset + (1*dim0)*tetCount + 2])
									&& normals[baseOffset + (1*dim0)*tetCount + 4]
									 ) {
								// nothing above, must be... this.
								added++;
								if( normDir.dir & 1 ) inv = 0; else inv = 1;
								switch( normDir.largest ){
									case 0: case 1: case 3:
										break;
									default:
										if( normDir.dir & 1 ){
											if(( normDir.dir & 4 )) inv = 1-inv;
										}
										else
											if( !(normDir.dir & 4) ) inv = 1-inv;
										break;

								}
								_debug_output && console.log( "K?" );
								inv = n1.sources[0].invert;
								outputFace( inv, n0, n1, n2, n3 );
							}

							if(ifDraw(8))
							if( ( n3 = normals[baseOffset+3] )
							  && (n1 =normals[baseOffset + ( 1 )*tetCount + 1]  )
							  && (n2=normals[baseOffset + ( 1 )*tetCount + 0] )
							  && normals[baseOffset + ( 1 )*tetCount + 4] 
							) {  // and 3 because is 4
								added++;
								inv = 0;
		
								if( odd ) {
									switch( normDir.largest ){
										case 0: case 3:case 2:
											if( normDir.dir === 0 ) inv = 1;
											if( normDir.dir === 1 )  inv = 1;
											//if( normDir.dir === 2 )  inv = 0;
											break;
										case 4:
											//if( normDir.dir === 2 )  inv = 1;
											if( normDir.dir === 0 ) inv = 1;
											break;
										default:
											if( normDir.dir & 2 ) {
												if( normDir.dir & 4 )	inv = 1-inv;
											}else {
												if(!( normDir.dir & 4))	inv = 1-inv;

											}
									
									}
								}else {
									switch( normDir.largest ){
										case 0: case 3:
											continue;
											if( normDir.dir === 0 ) inv = 1;
											if( normDir.dir === 1 )  inv = 1;
											//if( normDir.dir === 2 )  inv = 0;
											break;
										case 2:
											if( normDir.dir === 0 ) inv = 0;
											if( normDir.dir === 1 )  inv = 0; 
											//if( normDir.dir === 2 )  inv = 0;
											break;
										case 4:
											//if( normDir.dir === 2 )  inv = 1;
											if( normDir.dir === 0 ) inv = 0;
											break;
										default:
											if( normDir.dir & 2 ) {
												if( normDir.dir & 4 )	inv = 1-inv;
											}else {
												if(!( normDir.dir & 4))	inv = 1-inv;

											}
									}
									
								}

								if( !(y & 1 ) ) inv = 1-inv;

								_debug_output && console.log( "L?",x,y,z, inv, odd, normDir );
								inv = n1.sources[0].invert;
								outputFace( inv, n0, n1, n2, n3 );
							}

							if(ifDraw(9)) // forward vertical
								if( (n1 = normals[baseOffset + (1*dim0)*tetCount+2] )
								&& (n2 = normals[baseOffset + (1*dim0+1*dim0*dim1)*tetCount + 3])
								&& (n3 = normals[baseOffset + (1*dim0*dim1)*tetCount + 3] )) {
									const l1 =1/Math.sqrt(  n0.n[0]*n0.n[0] + n0.n[1]*n0.n[1] + n0.n[2]*n0.n[2] ) ;
									const c = [n0.n[0]*l1,n0.n[1]*l1,n0.n[2]*l1];

	
									const l2 =1/Math.sqrt( n2.n[0]*n2.n[0]+n2.n[1]*n2.n[1]+n2.n[2]*n2.n[2] ) ;
									const c2 = [n2.n[0]*l2,n2.n[1]*l2,n2.n[2]*l2];
									//ncross( c, n2.n, n0.n );
									const d = c[0]*c2[0]+c[1]*c2[1]+c[2]*c2[2];
									//if( c[0]*c[0]+c[1]*c[1]+c[2]*c[2] < 0.5 )
									//console.log( "D:", d );
									//if( d > 0 ) 
									{
										inv = 0;

										getNormalState( normDir, n0.n );
				//if( normDir.dir !== 7 )continue;

										switch( normDir.largest ){
											case 0:case 1: case 3:
												if( !(normDir.dir & 1) ) inv = 1;
												break;
											default:
												if( (normDir.dir & 4) ) {
													if(( normDir.dir === 5)) {
														inv = 0;
													} else if( ( normDir.dir === 7))
														inv = 0;
													else
														inv = 1;
												} else if(! ( (normDir.dir != 2) && (normDir.dir != 5) ) ){
													if( (normDir.dir & 2 ))
														inv = 1;
													else 
														inv = 0;
												}
												else if( normDir.dir === 7 ) inv = 1-inv;
												else if( normDir.dir === 0 ) inv = 1-inv;
												//console.log( "emit:", normDir, inv, n0.n )
												break;
										}
										_debug_output && console.log( "M?" );
										inv = n1.sources[0].invert;
										outputFace( inv, n0, n1, n2, n3 );
									}
								}

							if(ifDraw(10)) // forawrd-right plane... 
							if( ( n1 = normals[baseOffset+ ( 1*dim0*dim1)*tetCount + 4] )
								&& (n2 = normals[baseOffset+ ( 1 + 1*dim0*dim1)*tetCount + 0] )
								&& (n3 = normals[baseOffset + ( 1 )*tetCount + 1] )
								) {
								const l1 =1/Math.sqrt(  n0.n[0]*n0.n[0] + n0.n[1]*n0.n[1] + n0.n[2]*n0.n[2] ) ;
								const c = [n0.n[0]*l1,n0.n[1]*l1,n0.n[2]*l1];

								const l2 =1/Math.sqrt( n2.n[0]*n2.n[0]+n2.n[1]*n2.n[1]+n2.n[2]*n2.n[2] ) ;
								const c2 = [n2.n[0]*l2,n2.n[1]*l2,n2.n[2]*l2];
								//ncross( c, n2.n, n0.n );
								const d = c[0]*c2[0]+c[1]*c2[1]+c[2]*c2[2];
								//if( c[0]*c[0]+c[1]*c[1]+c[2]*c[2] < 0.5 )
								//console.log( "D:", d );
								

							if( d > 0 ) {
								// right up...
									getNormalState( normDir, n1.n );
									inv = 0;
									if( (normDir.dir & 2) ) inv = 0; else inv = 1;
									if ( (normDir.dir === 7 ) && ( normDir.largest === 2 || normDir.largest === 1 ) ) inv = 1;
									//if ( (normDir.dir === 1 ) && ( normDir.largest === 2 || normDir.largest === 5 ) ) inv = 1;
									added++;
									//if( normDir.dir !== 2 ) continue;
									//if( normDir.largest !== 4 ) continue;
									//console.log( "Emit:", normDir, inv )
									inv = n1.sources[0].invert;
									outputFace( inv, n0, n1, n2, n3 );
									//_debug_output && 
									_debug_output && console.log( "N?", normDir );
								}
								//else console.log( "Threw out plane" );
							}
						}
						// to the fore
						// TODO : THIS IS STILL BROKEN...

///----------------------------------------------------------
//    ODD  ....   (above is even (!odd) )
///----------------------------------------------------------

					}else {
						//continue;
						// all other cases that don't include 4 will be rendered in another cell...
						// this one can only add new faces here.
						// to the right

						// directly up.
	/* TODO - HYPERELIP FAIL */
						if(ifDraw(11))
						if( ( n0 = normals[baseOffset+1] )
							&& ( n1 = normals[baseOffset+2] )
						   && ( n2 = normals[baseOffset + ( 1*dim0*dim1 )*tetCount + 2]  )
						   && normals[baseOffset + ( 1*dim0*dim1 )*tetCount + 4] 
						   && ( n3 = normals[baseOffset + ( 1*dim0*dim1 )*tetCount + 1] )
						  ) {  // and 3 because is 4
							added++;
							inv = 0;
			//if( normDir.dir & 1 ) inv = 0; else inv = 1;
							switch( normDir.largest ){
								//case 1:case 3: case 0:
								//case 4:case 3: case 0:
								case 4: case 3: case 5:
									if(!( normDir.dir & 2) ) inv = 1-inv;
									break;
									default:
										if(!( normDir.dir & 1) ) inv = 1-inv;
										break;
							}
						
							_debug_output && console.log( "AA?" );
							outputFace( inv, n0, n1, n2, n3 );
						}


	/* TODO - HYPERELIP FAIL */
						if(ifDraw(12))
						if( n0 = normals[baseOffset+3] ) { 
							// and content[baseOffset+(1*dim0)*tetCount+0]  content[baseOffset+(1*dim0)*tetCount+3] content[baseOffset+(1*dim0)*tetCount+4]
							//console.log( "Content Here:", odd, inv, content[baseOffset+0], content[baseOffset+1], content[baseOffset+2], content[baseOffset+3],content[baseOffset+4] );
							// to the right - in-plane

							if(ifDraw(13))
							if( ( n1 = normals[baseOffset+(1*dim0)*tetCount+1] )
							   && (n2 = normals[baseOffset+(1+1*dim0)*tetCount+0] )
							   && (n3 = normals[baseOffset+( 1 )*tetCount+2] ) ) {
								added++;
								inv = 0;
								//console.log( "SOmething:",content[baseOffset+ ( 1*dim0)*tetCount + 0] ,content[baseOffset+ ( 1*dim0*dim1)*tetCount +1] ,content[baseOffset+ ( 1*dim0*dim1)*tetCount + 2] ,content[baseOffset+ ( 1*dim0*dim1)*tetCount + 3] ,content[baseOffset+ ( 1*dim0*dim1)*tetCount + 4]  )
								if( normDir.dir & 4 ) inv = 1-inv;
	
								const l1 =1/Math.sqrt(  n0.n[0]*n0.n[0] + n0.n[1]*n0.n[1] + n0.n[2]*n0.n[2] ) ;
								const c = [n0.n[0]*l1,n0.n[1]*l1,n0.n[2]*l1];

								const l2 =1/Math.sqrt( n2.n[0]*n2.n[0]+n2.n[1]*n2.n[1]+n2.n[2]*n2.n[2] ) ;
								const c2 = [n2.n[0]*l2,n2.n[1]*l2,n2.n[2]*l2];
								const d = c[0]*c2[0]+c[1]*c2[1]+c[2]*c2[2];
								
								if( d > 0 ) {
									_debug_output && console.log( "BB?" );
									inv = n1.sources[0].invert;
									outputFace( inv, n0, n1, n2, n3 );
								}
								//else console.log( "Threw out face");
							}


							if(ifDraw(14))
							if( (n3=normals[baseOffset+1])
										&& (n1=normals[baseOffset + ( 1 )*tetCount + 2] )
										&& normals[baseOffset + ( 1 )*tetCount + 4] 
										&& (n2=normals[baseOffset + ( 1 )*tetCount + 0] )
										) {  // and 3 because is 4
								added++;

								if( normDir.dir & 2 ) inv = 1; else inv = 0;
								switch(normDir.largest  ){
									case 0: case 3: case 4: {
										break;
									};
									default:
										if( (normDir.dir & 2 ) ) {
											if(!( normDir.dir & 4 )) inv = 1-inv;
										}
										else {
											if(( normDir.dir & 4 )) inv = 1-inv;
										}
								}
								_debug_output && console.log( "CC?" );
								inv = n1.sources[0].invert;
								outputFace( inv, n0, n1, n2, n3 );
							}
							// to the fore
						}

							// 
							// odd 2 - above/forward line across
							if(1)
							if( n0 = normals[baseOffset + 2] ) {

								if(ifDraw(15))	
								if( (n1 = normals[baseOffset + (1*dim0)*tetCount + 0] )
										&& (n2 =normals[baseOffset + (1*dim0)*tetCount + 1] )
										&& (n3 =normals[baseOffset + 3] )
										&& (n4 = normals[baseOffset + (1*dim0)*tetCount + 4] ) // make sure the surface goes here...
										) {

																					
										const l1 =1/Math.sqrt(  n0.n[0]*n0.n[0] + n0.n[1]*n0.n[1] + n0.n[2]*n0.n[2] ) ;
										const c = [n0.n[0]*l1,n0.n[1]*l1,n0.n[2]*l1];
	
										const l2 =1/Math.sqrt( n2.n[0]*n2.n[0]+n2.n[1]*n2.n[1]+n2.n[2]*n2.n[2] ) ;
										const c2 = [n2.n[0]*l2,n2.n[1]*l2,n2.n[2]*l2];
										//ncross( c, n2.n, n0.n );
										const d = c[0]*c2[0]+c[1]*c2[1]+c[2]*c2[2];
										//if( c[0]*c[0]+c[1]*c[1]+c[2]*c[2] < 0.5 )
										//console.log( "D:", d );
										if( d > 0 ) {
											getNormalState( normDir, n4.n );
										// nothing above, must be... this.
										added++;
										inv = 0;//n4.i;
											if(1)
										switch(normDir.dir  ){
											case 7: case 5:
												inv = 1-inv;
												break;;
											case 3: case 1:
												if( normDir.largest === 3 || normDir.largest === 1|| normDir.largest === 0 )
													inv = 1-inv;
												break;
											case 2: case 0:
												//inv = 1-inv;
												break;
											case 6: case 4:
												if( normDir.largest === 2 || normDir.largest === 5 || normDir.largest === 4 ) 
													inv = 1-inv;
													break;
										}
											
										_debug_output && console.log( "DD?" );
										outputFace( inv, n0, n1, n2, n3 );
										}
								}

								if(ifDraw(16))
								if( (n1 = normals[baseOffset+(1*dim0*dim1)*tetCount+2])
									&& (n2 = normals[baseOffset + (1*dim0+1*dim0*dim1)*tetCount + 0])
									&& (n3 = normals[baseOffset + (1*dim0)*tetCount + 0])
									) {

										const l1 =1/Math.sqrt(  n0.n[0]*n0.n[0] + n0.n[1]*n0.n[1] + n0.n[2]*n0.n[2] ) ;
									const c = [n0.n[0]*l1,n0.n[1]*l1,n0.n[2]*l1];

									const l2 =1/Math.sqrt( n2.n[0]*n2.n[0]+n2.n[1]*n2.n[1]+n2.n[2]*n2.n[2] ) ;
									const c2 = [n2.n[0]*l2,n2.n[1]*l2,n2.n[2]*l2];
									//ncross( c, n2.n, n0.n );
									const d = c[0]*c2[0]+c[1]*c2[1]+c[2]*c2[2];
									//if( c[0]*c[0]+c[1]*c[1]+c[2]*c[2] < 0.5 )
									//console.log( "D:", d );
									if( d > 0 ) {
										getNormalState( normDir, n0.n );

										// nothing above, must be... this.
										added++;
										inv  = 0 ;
										switch( normDir.largest ) {
											case 1: case 3: case 2:case 0:
												switch( normDir.dir ) {
													case 5:// case 6: case 7: case 4: 
													case 7: case 1: case 3:
														inv = 1;
														break;
													default:
														break;
												}
												break;
											default:
												if( normDir.dir === 6 ) { inv = 1;
													break; 
												}
												if( normDir.dir & 1) {
													inv = 1;
												}
												break;
										}
										_debug_output && console.log( "EE?" );
										inv = n1.sources[0].invert;
										outputFace( inv, n0, n1, n2, n3 );
									}
									//else console.log( "Threw out face");
								}
							}
						

						if(ifDraw(17)) // good!
						// odd, 'up'(y), x, 
						if( n0 = normals[baseOffset+1] ) {
							if( (n1 = normals[baseOffset+ ( 1*dim0*dim1)*tetCount + 1] ) 
								&& (n2 = normals[baseOffset+ ( 1 + 1*dim0*dim1)*tetCount + 0] )
								&& (n3 = normals[baseOffset + ( 1 )*tetCount + 0])
								) {
									const l1 =1/Math.sqrt(  n0.n[0]*n0.n[0] + n0.n[1]*n0.n[1] + n0.n[2]*n0.n[2] ) ;
									const c = [n0.n[0]*l1,n0.n[1]*l1,n0.n[2]*l1];

									const l2 =1/Math.sqrt( n2.n[0]*n2.n[0]+n2.n[1]*n2.n[1]+n2.n[2]*n2.n[2] ) ;
									const c2 = [n2.n[0]*l2,n2.n[1]*l2,n2.n[2]*l2];
									//ncross( c, n2.n, n0.n );
									const d = c[0]*c2[0]+c[1]*c2[1]+c[2]*c2[2];
									//if( c[0]*c[0]+c[1]*c[1]+c[2]*c[2] < 0.5 )
									//console.log( "D:", d );
									if( d > 0 )
									{
										getNormalState( normDir, n0.n );
										// right up...
										// make sure this is a complete thing...
										added++;
										if( normDir.dir & 2 ) inv = 0; else inv = 1;
													
										_debug_output && console.log( "FF?" );
										outputFace( inv, n0, n1, n2, n3 );
									}
									//else console.log( "threw out face?", d);
							}

							
						}
					}
				} else {
					let n0,n1,n2,n3;
					if(1)
					if( !odd ) 
					{
						if(ifDraw(18))
						// not through the center... 
						if( (n2 = normals[baseOffset+3] )
						  && (n1 = normals[baseOffset + (1*dim0)*tetCount + 1] )
						  && (n0 = normals[baseOffset + (1 + 1*dim0)*tetCount + 0])
						  //&& (normals[baseOffset + (1 + 1*dim0)*tetCount + 4])
						  && (n3 = normals[baseOffset + ( 1 )*tetCount + 2] )) {
							const normDir = { dir:0, largest:0 };
							getNormalState( normDir, n0.n );
							let inv = 0;//!(( normDir.dir ^ 0x7 ) & 7);

							switch( normDir.dir ){
								case 0: case 1: case 2: case 3:
										inv = 1;
								break;
								default:
									break;;
							}
							_debug_output && console.log( "GG?" );
							inv = n0.sources[0].invert;
							outputFace( inv, n0, n1, n2, n3 );
						}
				//console.log( "status:", x, y, z, baseOffset, n0, n1, n2, n3 );
						if(ifDraw(19))
						if( (n0 = normals[baseOffset+3] )
						  && (n3 = normals[baseOffset + (1*dim0*dim1)*tetCount + 3] )
						  && (n2 = normals[baseOffset + (1*dim0 + 1*dim0*dim1)*tetCount +1])
						  && (n1 = normals[baseOffset + (1*dim0 )*tetCount + 1] )) {
							  // this feels large.
							const normDir = { dir:0, largest:0 };
							getNormalState( normDir, n0.n );
							let inv = 0;//normDir.dir&7;

							switch( normDir.dir ){
								case 0: case 2: case 4: case 6:
										inv = 1;
								break;
								default:
									break;;
							}
							_debug_output && console.log( "HH?" );
							inv = n0.sources[0].invert;
							outputFace( inv, n0, n1, n2, n3 );
						}
				//console.log( "status:", x, y, z, baseOffset, n0, n1, n2, n3 );
						if(ifDraw(20))
						if( (n0 = normals[baseOffset+3] )
						  && (n1 = normals[baseOffset + (1*dim0*dim1)*tetCount + 3] )
						  && (n2 = normals[baseOffset + (1 + 1*dim1*dim0)*tetCount + 2])
						  ///&& ( normals[baseOffset + (1 + 1*dim1*dim0)*tetCount + 4])
						  && (n3 = normals[baseOffset + ( 1 )*tetCount + 2])) {
							  
							  const normDir = { dir:0, largest:0 };
							  getNormalState( normDir, n0.n );
							  let inv = 0;//(normDir.dir&7);
							  switch( normDir.dir ){
								case 0: case 1: case 4: case 5:
										inv = 1;
								break;
								default:
									break;;
							}
							_debug_output && console.log( "II?" );
							inv = n0.sources[0].invert;
							outputFace( inv, n0, n1, n2, n3 );
						}
//				console.log( "status:", x, y, z,baseOffset,  n0, n1, n2, n3 );
					} else {
						// THERE ARE 2 inverted triangels in this case.  TODO
						if(ifDraw(21))
						if( (n0 = normals[baseOffset+1] )
						  && (n1 = normals[baseOffset + (1*dim0*dim1)*tetCount + 1] )
						  && (n2 = normals[baseOffset + (1 + 1*dim0*dim1)*tetCount + 0])
						  && (n3 = normals[baseOffset + ( 1 )*tetCount + 0])) {
							  
							  const normDir = { dir:0, largest:0 };
							  getNormalState( normDir, n0.n );
							  let inv = 1;
							  switch( normDir.dir ){
								case 0: case 1: case 2: case 3:
										inv = 0;
								break;
								default:
									break;
							}
							_debug_output && console.log( "JJ?" );
							outputFace( inv, n0, n1, n2, n3 );
						}
						// there are two more triangles inverted on this TODO
						if(ifDraw(22)) // foward dots left
						if( (n0 = normals[baseOffset+2] )
						  && (n1 = normals[baseOffset + (1*dim0*dim1)*tetCount + 2] )
						  && (n2 = normals[baseOffset + (1*dim0*dim1 + 1*dim0)*tetCount + 0])
						  //&& (normals[baseOffset + (1*dim0*dim1 + 1*dim0)*tetCount + 4])
						  && (n3 = normals[baseOffset + ( 1*dim0 )*tetCount + 0])) {

							const normDir = { dir:0, largest:0 };
							  getNormalState( normDir, n0.n );
							  let inv = 1;//normDir.dir&7;
							  switch( normDir.dir ){
								case 0: case 4: case 2: case 6:
										inv = 0;
								break;
								default:
									break;;
							}
							_debug_output && console.log( "KK?" );
							inv = n0.sources[0].invert;
							outputFace( inv, n0, n1, n2, n3 );
						}
						
						if(ifDraw(23)) // towards big dits
						if( (n0 = normals[baseOffset+3] )
						  && (n1 = normals[baseOffset + (1*dim0)*tetCount + 1] )
						  && (n2 = normals[baseOffset + (1*dim0 + 1)*tetCount + 0])
						  //&& (normals[baseOffset + (1*dim0 + 1)*tetCount + 4])
						  && (n3 = normals[baseOffset + ( 1 )*tetCount + 2])) { // 'lower right' (3)   (odd 1 to even 2 )

							const normDir = { dir:0, largest:0 };
							  getNormalState( normDir, n0.n );
							  let inv = 1;//normDir.dir&7;
							  switch( normDir.dir ){
								case 0: case 1: case 2: case 3:
										inv = 0;
								break;
								default:
									break;;
							}
							_debug_output && console.log( "LL?" );
							inv = n0.sources[0].invert;
							outputFace( inv, n0, n1, n2, n3 );
						}
					}
				}
				//console.log( "ADDED:", added );
			}
		}
	}




	// update geometry (could wait for index.html to do this?
	if( showGrid )
		opts.geometryHelper.markDirty();
	console.log( "These got used so far:", usedTets);

	opts.points  = points;   
	opts.normals = normals;
	opts.bits    = bits; 
	// internal utility function to limit angle
	function clamp(a,b) {
		if( a < b ) return a; return b;
	}
	//return vertices;
}

}
})()

if("undefined" != typeof exports) {
	exports.mesher = MarchingTetrahedra4;
}

