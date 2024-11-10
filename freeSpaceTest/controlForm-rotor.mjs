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

	controlGroups = [];

	constructor( parent, opts ) {
		super( "Controls", parent );
		this.controlGroups.push( document.createElement( "div" ) );
		this.appendChild( this.controlGroups[0] );
		this.controlGroups[0].className = "control-group";
		this.controlGroups.push( document.createElement( "div" ) );
		this.appendChild( this.controlGroups[1] );
		this.controlGroups[1].className = "control-group";

		this.#controls = opts.controls;
		

		popups.makeCheckbox( this.controlGroups[0], this, "animate", "Animate" );

/*
		this.xControl = popups.makeTextField( this.controlGroups[0], this, "z", "X", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.yControl = popups.makeTextField( this.controlGroups[0], this, "y", "Y", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.zControl = popups.makeTextField( this.controlGroups[0], this, "x", "Z", false, false ); //makeTextField( form, input, value, text, money, percent )

		this.sxControl = popups.makeTextField( this.controlGroups[0], this, "Vz", "X", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.syControl = popups.makeTextField( this.controlGroups[0], this, "Vy", "Y", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.szControl = popups.makeTextField( this.controlGroups[0], this, "Vx", "Z", false, false ); //makeTextField( form, input, value, text, money, percent )

		this.yawControl = popups.makeTextField( this.controlGroups[0], this, "yaw", "Yaw", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.pitchControl = popups.makeTextField( this.controlGroups[0], this, "pitch", "Pitch", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.rollControl = popups.makeTextField( this.controlGroups[0], this, "roll", "Roll", false, false ); //makeTextField( form, input, value, text, money, percent )

		this.yawControlM = popups.makeTextField( this.controlGroups[0], this, "yawm", "Yaw", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.pitchControlM = popups.makeTextField( this.controlGroups[0], this, "pitchm", "Pitch", false, false ); //makeTextField( form, input, value, text, money, percent )
		this.rollControlM = popups.makeTextField( this.controlGroups[0], this, "rollm", "Roll", false, false ); //makeTextField( form, input, value, text, money, percent )
		const input = popups.makeTextInput( this.controlGroups[0], this, "objectCount", "Object Count" );
		const linInput = popups.makeTextInput( this.controlGroups[0], this, "linScalar", "Linear Accel Scalar" );
		const rotInput = popups.makeTextInput( this.controlGroups[0], this, "rotScalar", "Rotation Scalar" );
		popups.makeButton( this.controlGroups[0], "Re-init", ()=>{
			input.blur();
			if( opts.reInit ) opts.reInit(); 
		} );
*/
		this.move( 0,3);
		this.sliderAX = 0.25;
		this.sliderAY = 0.1;
		this.sliderAZ = 0;
		this.sliderAW = 0;
		this.sliderBX = 0;
		this.sliderBY = 0;
		this.sliderBZ = 0.1;
		[{field:"sliderAX", text: "Torsion Amount"}
		, {field:"sliderAY", text: "A x"}
		, {field:"sliderAZ", text: "A y"}
		, {field:"sliderAW", text: "A z"}
		, {field:"sliderBX", text: "B x"}
		, {field:"sliderBY", text: "B y"}
		, {field:"sliderBZ", text: "B z"}
		//, {field:"sliderBW", text: "B w"}
		].forEach( slider=>{
			const sld = popups.makeSlider( this.controlGroups[1], this, slider.field, slider.text, (x)=>{
					// slider to value.
					return (x-500)/100;
				}, 
				(x)=>{
					// value to slider
					return x*100+500;
				} );			
			//sld.value = 0;
			sld.on( "change", ()=>{
				this.on( "change", true );
			} );
		} );
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
		this.xControl.value = this.x .toFixed(3);
		this.yControl.value = this.y.toFixed(3);
		this.zControl.value = this.z.toFixed(3);

		this.sxControl.value = this.#mover.speed.x.toFixed(3) ;
		this.syControl.value = this.#mover.speed.y.toFixed(3);
		this.szControl.value = this.#mover.speed.z.toFixed(3);

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
