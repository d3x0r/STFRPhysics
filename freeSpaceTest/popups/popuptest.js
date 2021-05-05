
class myForm extends Popup {
	

	constructor( title ) {
		super( null, title );
		this.canvas = document.createElement( "canvas" );
		this.appendChild( this.canvas );
		this.ctx = document.getContext( "2d" );
	}
}


const form = new myForm();
form.show();
form.center();
