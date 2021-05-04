



	export function animator(freq) {
		var driveCenter = { x:50, y:50 };
                
                var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );
		newSVG.style.width = 100;
		newSVG.style.height = 175;
		//newSVG.setAttribute("width","100");
		//newSVG.setAttribute("height","200");

		var driveRotor = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		driveRotor.id = "driveRotor";
		driveRotor.setAttribute( "r", "40" );
		driveRotor.setAttribute( "cx", "50" );
		driveRotor.setAttribute( "cy", "50" );
		driveRotor.setAttribute( "fill", "yellow" );

		var drivePivot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		drivePivot.id = "drivePivot";
		drivePivot.setAttribute( "r", "4" );
		drivePivot.setAttribute( "fill", "black" );
		
		var driveArm = document.createElementNS("http://www.w3.org/2000/svg", "path");
		driveArm.classList.add( "switcher" );
		driveArm.id = "driveArm";
		driveArm.setAttribute( "stroke", "blue" );
		driveArm.setAttribute( "stroke-width", "10" );
		driveArm.setAttribute( "stroke-linecap", "round" );

		var driveRod = document.createElementNS("http://www.w3.org/2000/svg", "path");
		driveRod.classList.add( "switcher" );
		driveRod.id = "driveRod";
		driveRod.setAttribute( "stroke", "blue" );
		driveRod.setAttribute( "stroke-width", "5" );
		driveRod.setAttribute( "stroke-linecap", "round" );
		driveRod.setAttribute( "stroke-linecap", "round" );


		var buttonPad = document.createElementNS("http://www.w3.org/2000/svg", "path");
		buttonPad.id = "buttonPad";
		buttonPad.setAttribute( "stroke", "red" );
		buttonPad.setAttribute( "stroke-width", "10" );
		buttonPad.setAttribute( "stroke-linecap", "round" );
		
		newSVG.appendChild( driveRotor);
		newSVG.appendChild( drivePivot);
		newSVG.appendChild( driveArm);
		newSVG.appendChild( driveRod);
		newSVG.appendChild( buttonPad);

	        //const freq = 1;
		var t = 0;
		var state = 0;
		function animate() {

			//<circle cx="250" cy="50" r="4" stroke="black" stroke-width="4" fill="none" />
			var svg = newSVG;//document.querySelector( "SVG" );
			//svg.width = 100;
			//svg.height = 200;
			var pivot = svg.children['drivePivot'];//svg.querySelector( "[ID='drivePivot']" );
			var tm = Date.now() / 1000;
			
			var cx, cy;
			pivot.setAttribute( "cx", cx = driveCenter.x + ( 20 * Math.sin( freq * (Math.PI * 2) *( -tm % (1/freq) ) ) ) )
			pivot.setAttribute( "cy", cy = driveCenter.y + ( 20 * Math.cos( freq * (Math.PI * 2) *(tm %(1/freq) )) ) )
			
			//var driveArm = svg.querySelector( "[ID='driveArm']" );
			
			// L = Math.sqrt(dx,dy);
			// L^2 - dx^1
			var dy = cy + Math.sqrt( (80*80) - ((cx-driveCenter.x)*(cx-driveCenter.x) ) )
			var path = `M${cx},${cy} L${driveCenter.x},${dy}`;
			driveArm.setAttribute( "d", path );

			//var driveRod = svg.querySelector( "[ID='driveRod']" );
			path = `M${driveCenter.x},${dy} L${driveCenter.x},${dy+ 10}`;
			dy += 10;
			driveRod.setAttribute( "d", path );

			//var buttonPad = svg.querySelector( "[ID='buttonPad']" );
			var button = 140;
			if( dy > button ) {
                        	button = dy;
                                state = 1;
                        } else {
                        	state = 0;
                        }
			path = `M${driveCenter.x - 10},${button} L${driveCenter.x + 10 },${button}`;
			buttonPad.setAttribute( "d", path );

			requestAnimationFrame(animate);
			//setTimeout( animate, 100 );
		}
		animate();
                
                newSVG.getValue = function() {
                	return state;
                }
                
                return newSVG;
	}
