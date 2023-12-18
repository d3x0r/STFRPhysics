import {Popup,popups} from "../node_modules/@d3x0r/popups/popups.mjs"



const forms = [];

export class ControlForm extends Popup {
	
	rotationRate = 0;

	applyAccel = false;
	objectCount = 20;
	rotScalar = 1;
	linScalar = 1;
	x=0;
	y=0;
	z=0;
	yaw = 0;
	pitch = 0;
	roll = "0z";
	#controls = null;
	#mover = null;	

	constructor( parent, opts ) {
		super( "Controls", parent );
		this.#controls = opts.controls;
		popups.makeSlider( this, this, "rotationRate", "Rotation Rate" );
		popups.makeCheckbox( this, this, "applyAccel", "Apply Accel" );

		this.xControl = popups.makeTextField( this, this, "z", "X", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.yControl = popups.makeTextField( this, this, "y", "Y", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.zControl = popups.makeTextField( this, this, "x", "Z", false, false ); //makeTextField( form, input, value, text, money, percent )

		this.yawControl = popups.makeTextField( this, this, "yaw", "Yaw", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.pitchControl = popups.makeTextField( this, this, "pitch", "Pitch", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.rollControl = popups.makeTextField( this, this, "roll", "Roll", false, false ); //makeTextField( form, input, value, text, money, percent )

		this.yawControlM = popups.makeTextField( this, this, "yawm", "Yaw", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.pitchControlM = popups.makeTextField( this, this, "pitchm", "Pitch", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.rollControlM = popups.makeTextField( this, this, "rollm", "Roll", false, false ); //makeTextField( form, input, value, text, money, percent )
		const input = popups.makeTextInput( this, this, "objectCount", "Object Count" );
		const linInput = popups.makeTextInput( this, this, "linScalar", "Linear Accel Scalar" );
		const rotInput = popups.makeTextInput( this, this, "rotScalar", "Rotation Scalar" );
		popups.makeButton( this, "Re-init", ()=>{
			input.blur();
			if( opts.reInit ) opts.reInit(); 
		} );
		this.move( 0,300);
		forms.push( this );
	}
	
	set controls( val ) {
		this.#controls = val;
	}
	set mover( val ) {
		this.#mover= val;
	}
	update(delta) {
		if( this.#controls ) {
		const o = this.#controls.motion.orientation;
		this.roll = o.getRoll()*180/Math.PI;
		this.pitch = o.getPitch()*180/Math.PI;
		this.yaw = (o.getYaw()*180/Math.PI);



		this.roll = this.roll - this.roll%0.01;
		this.yaw = this.yaw - this.yaw%0.01;
		this.pitch = this.pitch - this.pitch%0.01;

		this.rollControl.value = this.roll ;
		this.pitchControl.value = this.pitch;
		this.yawControl.value = this.yaw;

		}else {
		}
		if( this.#mover) {
//		const o = this.#mover.orientation;
		const o = this.#mover.orientation;
		//this.rollm = o.getRoll()*180/Math.PI;
		//this.pitchm = o.getPitch()*180/Math.PI;
		//this.yawm = (o.getYaw()*180/Math.PI);
		this.x = this.#mover.position.x;
		this.y = this.#mover.position.y;
		this.z = this.#mover.position.z;
		this.xControl.value = this.x ;
		this.yControl.value = this.y;
		this.zControl.value = this.z;

		this.rollm = o.z*180/Math.PI;
		this.pitchm = o.x*180/Math.PI;
		this.yawm = (o.y*180/Math.PI);

		this.rollm = this.rollm - this.rollm%0.01;
		this.yawm = this.yawm - this.yawm%0.01;
		this.pitchm = this.pitchm - this.pitchm%0.01;

		this.rollControlM.value = this.rollm ;
		this.pitchControlM.value = this.pitchm;
		this.yawControlM.value = this.yawm;

		}else {
		}
	}
}
