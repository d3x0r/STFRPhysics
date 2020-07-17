
const root = "./src/images/";
const Textures = [];
const realTextures= [
	root+"texture-layer-1.png", root+"texture-layer-2.png"
        , root+"texture-layer-3.png"
        , root+"texture-layer-4.png"
        , root+"texture-layer-5.png"
        , root+"texture-layer-6.png"
        , root+"CursorIcon.png"

]

const whenDone = [];

function on(cb ) {
	whenDone.push(cb);
	setTimeout( cb, 0 );
}


function loadATexture( n, cb ) {
	if( n < Textures.length )
	{
		var xhrObj = new XMLHttpRequest();
		try {
			xhrObj.open('GET', Textures[n] );
			xhrObj.responseType = "blob";
                        
			//xhrObj.responseType = "text";
			//xhrObj.response = "";
			xhrObj.send(null);
			xhrObj.onerror = (err)=>{
				  //console.log( "require ", n );
				      console.log( err );
				      cb();
				      return;
			};
			xhrObj.onload = ()=>{
				if( xhrObj.status === 200 && xhrObj.response.size > 0 ) {
					var image = new Image();
			   		var reader = new FileReader();
					reader.onload = function(e) {
						image.src = e.target.result;
					        
						//textureData = xhrObj.responseText;
						image.onerror = (err)=>{ console.log( "image load error?", err)}
                                                
						image.onload = ()=> {
                                                	Textures[n] = image
							if( n === Textures.length-1 ) {
								for( let cb of whenDone ) cb();
							}
						}
						loadATexture( n+1, cb );
					};
					reader.readAsDataURL(xhrObj.response);
				}else 
					loadATexture( n+1, cb );

			}
		}
		catch( err ) {
			console.log( "get request ", n );
	        	console.log( err );
				cb();
		}
	}
}

loadATexture( 0 );
              

export { Textures };
export { on };
