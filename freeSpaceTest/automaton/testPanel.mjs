
export function speaker( ) {

                var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );

		newSVG.style.width = 100;
		newSVG.style.height = 125;

                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                panelFrame.setAttribute( "x", "0" );
                panelFrame.setAttribute( "y", "0" );
                panelFrame.setAttribute( "width", "100" );
                panelFrame.setAttribute( "height", "125" );
                panelFrame.setAttribute( "stroke", "none" );
                panelFrame.setAttribute( "fill", "#d0c090" );
                newSVG.appendChild( panelFrame );

                
                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                panelFrame.setAttribute( "x", "5" );
                panelFrame.setAttribute( "y", "5" );
                panelFrame.setAttribute( "width", "90" );
                panelFrame.setAttribute( "height", "115" );
                panelFrame.setAttribute( "stroke", "black" );
                panelFrame.setAttribute( "fill", "none" );
                newSVG.appendChild( panelFrame );
                
		var speakerFill = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                var speakerFillPattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
                speakerFillPattern.id = "transformedPattern";
                speakerFillPattern.setAttribute( "x" ,20);
                speakerFillPattern.setAttribute( "y" , 10);
                speakerFillPattern.setAttribute( "width" , 5);
                speakerFillPattern.setAttribute( "height" , 5 );
                speakerFillPattern.setAttribute( "patternUnits","userSpaceOnUse" );
                speakerFillPattern.setAttribute( "patternTransform","rotate(15)" );
                speakerFill.appendChild( speakerFillPattern );
                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                speakerFillCircle.setAttribute( "x", "0" );
                speakerFillCircle.setAttribute( "y", "0" );
                speakerFillCircle.setAttribute( "width", "30" );
                speakerFillCircle.setAttribute( "height", "2" );
                speakerFillCircle.setAttribute( "stroke", "black" );
                speakerFillCircle.setAttribute( "fill", "none" );
                speakerFillPattern.appendChild( speakerFillCircle );

                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                speakerFillCircle.setAttribute( "x", "0" );
                speakerFillCircle.setAttribute( "y", "0" );
                speakerFillCircle.setAttribute( "width", "2" );
                speakerFillCircle.setAttribute( "height", "20" );
                //speakerFillCircle.setAttribute( "stroke", "black" );
                speakerFillCircle.setAttribute( "fill", "black" );
                speakerFillPattern.appendChild( speakerFillCircle );
                
                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                speakerFillCircle.setAttribute( "cx", "10" );
                speakerFillCircle.setAttribute( "cy", "10" );
                speakerFillCircle.setAttribute( "r", "10" );
                //speakerFillCircle.setAttribute( "stroke", "black" );
                speakerFillCircle.setAttribute( "fill", "black" );
                //speakerFillPattern.appendChild( speakerFillCircle );
                
                newSVG.appendChild( speakerFill );
                
                 //<circle cx="10" cy="10" r="10" style="stroke: none; fill: #0000ff" />
	
		var speakerGrill = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		speakerGrill.id = "speakerGrill";
		speakerGrill.setAttribute( "r", "35" );
		speakerGrill.setAttribute( "cx", "50" );
		speakerGrill.setAttribute( "cy", "45" );
		speakerGrill.setAttribute( "fill", "url(#transformedPattern)" );
		speakerGrill.setAttribute( "stroke", "red" );

                newSVG.appendChild( speakerGrill );
                

const switchX = 2;
const switchW = 120;
const switchY = 75;
const switchH = 45

		var testButtonLED = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		testButtonLED.id = "testButtonLED";
		testButtonLED.setAttribute( "r", "5" );
		testButtonLED.setAttribute( "cx", "80" );
		testButtonLED.setAttribute( "cy", "105" );
                
		testButtonLED.setAttribute( "fill", "#12a510" );
		//testButtonLED.setAttribute( "fill", "#32f530" );
		testButtonLED.setAttribute( "stroke", "black" );
                testButtonLED.setAttribute( "stroke-width", "1" );
                newSVG.appendChild( testButtonLED );


                var onOff = false;
                newSVG.addEventListener( "click", (evt)=>{
                	evt.preventDefault();
                	if( evt.offsetX >= (switchX) && evt.offsetX <= (switchX+switchW) 
                          && evt.offsetY >= (switchY) && evt.offsetY <= (switchY+switchH) )
                        {
                        	onOff = !onOff;
                                if( onOff ) {
					testButtonLED.setAttribute( "fill", "#32f530" );
                        	} else {
					testButtonLED.setAttribute( "fill", "#12a510" );
                                }
                        }
                } );
                
                
                return newSVG;

}

export function runStop( ) {
                var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );

		newSVG.style.width = 250;
		newSVG.style.height = 125;

                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                panelFrame.setAttribute( "x", "0" );
                panelFrame.setAttribute( "y", "0" );
                panelFrame.setAttribute( "width", "200" );
                panelFrame.setAttribute( "height", "125" );
                panelFrame.setAttribute( "stroke", "none" );
                panelFrame.setAttribute( "fill", "#d0c090" );
                newSVG.appendChild( panelFrame );

                
                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                panelFrame.setAttribute( "x", "5" );
                panelFrame.setAttribute( "y", "5" );
                panelFrame.setAttribute( "width", "190" );
                panelFrame.setAttribute( "height", "115" );
                panelFrame.setAttribute( "stroke", "black" );
                panelFrame.setAttribute( "fill", "none" );
                newSVG.appendChild( panelFrame );
                

                var testText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                testText.textContent = "STOP";
		testText.setAttribute( "x", "22" );
		testText.setAttribute( "y", "65" );
		testText.setAttribute( "font-size", "20px" );
		testText.setAttribute( "font-style", "sans-serif" );
		testText.setAttribute( "stroke", "black" );
                
                newSVG.appendChild( testText );
                
                var testText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                testText.textContent = "RUN";
		testText.setAttribute( "x", "22" );
		testText.setAttribute( "y", "95" );
		testText.setAttribute( "font-size", "20px" );
		testText.setAttribute( "font-style", "sans-serif" );
		testText.setAttribute( "stroke", "black" );
                
                newSVG.appendChild( testText );


		var testButtonLED = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		testButtonLED.id = "testButtonLED";
		testButtonLED.setAttribute( "r", "10" );
		testButtonLED.setAttribute( "cx", "97" );
		testButtonLED.setAttribute( "cy", "20" );
                
		testButtonLED.setAttribute( "fill", "#a51210" );
		//testButtonLED.setAttribute( "fill", "#f53230" );
		testButtonLED.setAttribute( "stroke", "black" );
                testButtonLED.setAttribute( "stroke-width", "2" );
                newSVG.appendChild( testButtonLED );
                
const switchX = 82;
const switchW = 30;
const switchY = 40;
const switchH = 65
const switchY1 = 45;
const switchY2 = 72;

		var testButtonSlot = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		testButtonSlot.id = "testButtonSlot";
		testButtonSlot.setAttribute( "x", "82" );
		testButtonSlot.setAttribute( "y", "40" );
		testButtonSlot.setAttribute( "width", "30" );
		testButtonSlot.setAttribute( "height", "65" );
                
		testButtonSlot.setAttribute( "fill", "black" );
		testButtonSlot.setAttribute( "stroke", "black" );
                testButtonSlot.setAttribute( "stroke-width", "2" );
                newSVG.appendChild( testButtonSlot );
                
                
		var testButton = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		testButton.id = "testButton";
		testButton.setAttribute( "x", "84.5" );
		testButton.setAttribute( "y", "45" );
		testButton.setAttribute( "width", "25" );
		testButton.setAttribute( "height", "27" );
                
		testButton.setAttribute( "fill", "#a51210" );
		//testButton.setAttribute( "fill", "#f53230" );
		testButton.setAttribute( "stroke", "white" );
                testButton.setAttribute( "stroke-width", "5" );
                newSVG.appendChild( testButton );
                

const resetSwitchX = 82;
const resetSwitchW = 30;
const resetSwitchY = 40;
const resetSwitchH = 65

		var resetButton = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		resetButton.id = "resetButton";
		resetButton.setAttribute( "r", "20" );
		resetButton.setAttribute( "cx", "155" );
		resetButton.setAttribute( "cy", "50" );
                
		resetButton.setAttribute( "fill", "#a51210" );
		//resetButton.setAttribute( "fill", "#f53230" );
		resetButton.setAttribute( "stroke", "white" );
                resetButton.setAttribute( "stroke-width", "3" );

                newSVG.appendChild( resetButton );
                
    //            <style>
    //.small { font: italic 13px sans-serif; }
    //.heavy { font: bold 30px sans-serif; }
                
                var resetText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                resetText.textContent = "RESET";
		resetText.setAttribute( "x", "118" );
		resetText.setAttribute( "y", "100" );
		resetText.setAttribute( "font-size", "24px" );
		resetText.setAttribute( "font-style", "sans-serif" );
		resetText.setAttribute( "stroke", "black" );
                
                newSVG.appendChild( resetText );

                
                var onOff = false;
                newSVG.addEventListener( "click", (evt)=>{
                	evt.preventDefault();
                	if( evt.offsetX >= (switchX) && evt.offsetX <= (switchX+switchW) 
                          && evt.offsetY >= (switchY) && evt.offsetY <= (switchY+switchH) )
                        {
                        	onOff = !onOff;
                                if( onOff ) {
					testButton.setAttribute( "fill", "#f53230" );
					testButtonLED.setAttribute( "fill", "#f53230" );
					testButton.setAttribute( "y", switchY2 );
                        	} else {
					testButton.setAttribute( "fill", "#a51210" );
					testButtonLED.setAttribute( "fill", "#a51210" );
					testButton.setAttribute( "y", switchY1 );
                                }
                        }
                } );
                

                
                return newSVG;

}


function myArc(cx, cy, radius, max){       
       var circle = document.createElementNS( "http://www.w3.org/2000/svg", "path");
        var d = " M "+ (cx + radius) + " " + cy;
        var angle=max;

	const inner = radius - 30;

            var radians= angle * (Math.PI / 180);  // convert degree to radians
            var x = cx + Math.cos(radians) * radius;  
            var y = cy + Math.sin(radians) * radius;
           
	// rx ry x-axis-rotation large-arc-flag sweep-flag x y
            
            circle.setAngle = function(angle){
            	if( angle > 350 ) angle = 350;
                if( angle < 2 ) angle = 2;
            
	            var radians= angle * (Math.PI / 180);  // convert degree to radians

	            var sx = cx + 0;  
        	    var sy = cy - radius;

	            var x = cx + Math.sin(radians) * radius;  
        	    var y = cy - Math.cos(radians) * radius;
                    
	            var ix = cx + Math.sin(radians) * (inner);  
        	    var iy = cy - Math.cos(radians) * (inner);

                    
                    var d = " M "+ (sx) + " " + sy;
	            d += ` A ${radius} ${radius}, 0, ${angle<180?0:1}, 1, ${x} ${y} `;// "+x + " " + y;
	            d += ` L ${ix} ${iy}`;
	            d += ` A ${inner} ${inner}, 0, ${angle<180?0:1}, 0, ${cx+0} ${cy-inner} `;// "+x + " " + y;
                    
        	    d += "Z"
            circle.setAttribute("d", d)
            	
            }
            circle.setAngle( 0);
      return circle;
 }     

  //myArc(110, 110, 100, 360);


export function testButton( cb ) {


                var newSVG = document.createElementNS( "http://www.w3.org/2000/svg","svg" );

		newSVG.style.width = 250;
		newSVG.style.height = 125;

                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                panelFrame.setAttribute( "x", "0" );
                panelFrame.setAttribute( "y", "0" );
                panelFrame.setAttribute( "width", "200" );
                panelFrame.setAttribute( "height", "125" );
                panelFrame.setAttribute( "stroke", "none" );
                panelFrame.setAttribute( "fill", "#d0c090" );
                newSVG.appendChild( panelFrame );

                
                var panelFrame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                panelFrame.setAttribute( "x", "5" );
                panelFrame.setAttribute( "y", "5" );
                panelFrame.setAttribute( "width", "190" );
                panelFrame.setAttribute( "height", "115" );
                panelFrame.setAttribute( "stroke", "black" );
                panelFrame.setAttribute( "fill", "none" );
                newSVG.appendChild( panelFrame );
                
                
                
		var speakerFill = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                var speakerFillPattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
                speakerFillPattern.id = "transformedPattern";
                speakerFillPattern.setAttribute( "x" ,20);
                speakerFillPattern.setAttribute( "y" , 10);
                speakerFillPattern.setAttribute( "width" , 5);
                speakerFillPattern.setAttribute( "height" , 5 );
                speakerFillPattern.setAttribute( "patternUnits","userSpaceOnUse" );
                speakerFillPattern.setAttribute( "patternTransform","rotate(15)" );
                speakerFill.appendChild( speakerFillPattern );
                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                speakerFillCircle.setAttribute( "x", "0" );
                speakerFillCircle.setAttribute( "y", "0" );
                speakerFillCircle.setAttribute( "width", "30" );
                speakerFillCircle.setAttribute( "height", "2" );
                speakerFillCircle.setAttribute( "stroke", "black" );
                speakerFillCircle.setAttribute( "fill", "none" );
                speakerFillPattern.appendChild( speakerFillCircle );

                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                speakerFillCircle.setAttribute( "x", "0" );
                speakerFillCircle.setAttribute( "y", "0" );
                speakerFillCircle.setAttribute( "width", "2" );
                speakerFillCircle.setAttribute( "height", "20" );
                //speakerFillCircle.setAttribute( "stroke", "black" );
                speakerFillCircle.setAttribute( "fill", "black" );
                speakerFillPattern.appendChild( speakerFillCircle );
                
                var speakerFillCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                speakerFillCircle.setAttribute( "cx", "10" );
                speakerFillCircle.setAttribute( "cy", "10" );
                speakerFillCircle.setAttribute( "r", "10" );
                //speakerFillCircle.setAttribute( "stroke", "black" );
                speakerFillCircle.setAttribute( "fill", "black" );
                //speakerFillPattern.appendChild( speakerFillCircle );
                
                newSVG.appendChild( speakerFill );
                
                 //<circle cx="10" cy="10" r="10" style="stroke: none; fill: #0000ff" />
	
		var testButton = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		testButton.id = "testButton";
		testButton.setAttribute( "r", "15" );
		testButton.setAttribute( "cx", "50" );
		testButton.setAttribute( "cy", "50" );
                
		testButton.setAttribute( "fill", "#a51210" );
		//testButton.setAttribute( "fill", "#f53230" );
		testButton.setAttribute( "stroke", "white" );
                testButton.setAttribute( "stroke-width", "5" );

                newSVG.appendChild( testButton );
                
    //            <style>
    //.small { font: italic 13px sans-serif; }
    //.heavy { font: bold 30px sans-serif; }
                
                var testText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                testText.textContent = "TEST";
		testText.setAttribute( "x", "22" );
		testText.setAttribute( "y", "100" );
		testText.setAttribute( "font-size", "24px" );
		testText.setAttribute( "font-style", "sans-serif" );
		testText.setAttribute( "stroke", "black" );
                
                newSVG.appendChild( testText );



		var timerArc = myArc( 125, 60, 45, 90 );
                //timerArc.className = "timerArc";
		timerArc.setAttribute( "fill", "red" );
		timerArc.setAttribute( "stroke", "black" );
                timerArc.setAttribute( "stroke-width", "2" );
                
                newSVG.appendChild( timerArc );


        var angle = 360;
        var testing = false;
	function tick() {
                timerArc.setAngle( angle );
                if( testing ) {
                	angle -= 3;
		}
                if( angle < 0 ) {
                        //testSuccess();
                        angle = 0;
                        testing = false;
                        onOff = false;
                        if( cb( true, false ) ) {

                        }
                }
        	setTimeout( tick, 100 );
        }
        tick();

                
                //<text x="20" y="35" class="small">My</text>
                
                var onOff = false;
                function setColor() {

                        if( onOff ) {
                                testing = true;
				cb( false, true );
                                testButton.setAttribute( "fill", "#f53230" );
                        }else {
                                testing = false;
				cb( false, false );
                                testButton.setAttribute( "fill", "#a51210" );
                                angle = 360;
                        }
                }

                newSVG.addEventListener( "click", (evt)=>{
                	evt.preventDefault();
                	//if( evt.offsetX >= (50-15) && evt.offsetX <= (50+15) 
                        //  && evt.offsetY >= (50-15) && evt.offsetY <= (50+15) )
                        {
                                onOff = !onOff;
                                setColor();
                        }
                } );

                newSVG.reset = function() {
                        angle = 360;
                        testing= false;
			cb( false, false );
                        onOff = false;
                        setColor();
                }

                return newSVG;

}

