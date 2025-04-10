/*

style classes
    frameContainer - the outer frame
    frameCaption - the top caption of the frame
    frameContent - the container of the frame's future content.
    frameClose - style of the upper close Item.
    captionButton - this is a button appearin in the caption (close)
    

var popup = popups.create( "caption" );
popup.show();
popup.hide();
popup.caption = "New Caption";
popup.divContent  // insert frame content here

*/

//import {JSOX} from "jsox";
//import {JSOX} from "../../jsox/lib/jsox.mjs";

const utils = globalThis.utils || {
	ROUND_DOWN:1,
	ROUND_UP :2,
	ROUND_NATURAL:3,
	// --------- These need to go into utils or something
	to$(val,rounder) {
	if( "string" === typeof val ) val = utils.toD(val);
		function pad(val, n) {
			if( val.length < n) {
				val = '00000'.substr(0,n-val.length)+val;
			}
			return val;
		}
	let negate = false;
	if( val < 0 ) { val = -val; negate = true }
		var digits = Math.log10(val) - 2;
		var n;
		var r = '';
		var c = (val/100)|0;
		var cnts;
		if( cnts = val % 100 ) {
			if( rounder === 1 ) {
				if( val < 0 )
					val -= 1;
				else   
					val += 1;
			}else if( rounder === 2 ){
				if( val < 0 )
					val += 1;
					else
					val -=1 ;
			}else if( rounder === 3 ) {
				if( val < 0 )
					if( cnts >= 50 )
						val -= 1;
					else
						val += 1;
				else
					if( cnts >= 50 )
						val += 1;
					else
						val -= 1;
			}
			else
				r = '.' + pad((val%100).toString(),2);
		}
		if( digits >= 3 ) {
			for( n = 0; n <= digits-3; n += 3) {
				r = "," + pad(((c%1000)|0).toString(),3) + r;
				c = (c / 1000)|0;
			}
		}
		r = (negate?"-":"")+'$' + (c%1000) + r;
		return r;
	},

	toD($) {
		if( "string" !== typeof $ )
			$ = $.toString();
	let negate = false;
		if( $[0] === '-' ) {
			$ = $.substr(1);
			negate = true;
	}
		if( $[0] === '$' )
			$ = $.substr(1);
		//   throw new Error( "NOT A DOLLAR AMOUNT" );
		var i = $.indexOf('.' );
		if( i >= 0 && $.length-i > 2 ) {
			var trunc = $.split(',' ).join('').split('.');
			trunc[trunc.length-1] = trunc[trunc.length-1].substr(0,2);
			return (negate?-1:1)*Number( trunc.join('') );

		} else if( i >= 0 && $.length-i == 3 )
			return (negate?-1:1)*Number( $.split(',' ).join('').split('.').join('') );
		else if( i >= 0 && $.length-i == 2 )
			return (negate?-1:1)*Number( $.split(',' ).join('').split('.').join('') ) * 10;
			return (negate?-1:1)*(Number( $.split(',' ).join('') ) * 100)|0;
	},

	toP(p) {
		if( "string" !== typeof p )
			p = p.toString();
		return p + "%";
	},
	fromP(p){
		p = p.split('%').join('');
		return Number(p);		
	},
	preAddPopupStyles( container, baseUrl ) {
		const style = document.createElement( "link" );
		style.rel = "stylesheet";
		if(baseUrl && baseUrl.startsWith( "file://" ) ) {

		} else {
			style.href = new URL( defaultStyle, baseUrl || location.href ).href;
			container.insertBefore( style, container.childNodes[0] || null );
		}
	},
	addPopupStyles( container, styleUrl, baseUrl ) {
		if( container instanceof Popup ) {
			if( container.divShadow ) container = container.divShadow;
			else container = container.divFrame;
		}
		if( container.shadowRoot ) container = container.shadowRoot;
		const style = document.createElement( "link" );
		style.rel = "stylesheet";
		style.href = new URL( styleUrl, baseUrl || null ).href;
		let before = container.firstChild;
		while( before && before.tagName === "LINK" ) before = before.nextSibling;
		container.insertBefore( style, before );
	},
	// alias this badly named function
	preAddStyleSheet : null,
	preAddStyleStyleSheet( container, sheet ) {
		container.insertBefore( sheet, container.childNodes[0] || null );
	},
	// alias this badly named function
	preAddStyleSrc : null,
	preAddStyleStyleSrc( container, src, baseUrl ) {
		const style = document.createElement( "link" );
		style.rel = "stylesheet";
		style.href = baseUrl?new URL( src, baseUrl):src;
		container.insertBefore( style, container.childNodes[0] || null );
	},
	/**
	 * This expects a loaded style sheet node
	 */
	addStyleSheet( container, src ) {
		let lastOwner;
		for( let style of container.styleSheets ){
			lastOwner = style.ownerNode
		}
		if( lastOwner )
			lastOwner.parentNode.insertBefore(src, lastOwner.nextSibling);
	},
	/**
	 * This takes a URL - it might pre-add...
	 */
	addStyleSheetSrc( container, src, baseUrl ) {
		return new Promise( (res,rej)=>{

			const style = document.createElement( "link" );
			style.rel = "stylesheet";
			style.href = baseUrl?new URL( src, baseUrl):src;
			let lastOwner  = null;
			style.onload = ()=>{
				res();
			}
			if( container instanceof Popup){
				if( container.divShadow ) container = container.divShadow.shadowRoot;
			}
			if( container.styleSheets )
				for( let style of container.styleSheets ){
					lastOwner = style.ownerNode
				}
			if( lastOwner )
				lastOwner.parentNode.insertBefore(style, lastOwner.nextSibling);
			else{
				let child = container.firstChild;
				while( child && child.nodeName === "LINK" ) child = child.nextSibling;
				if( !child )
					container.appendChild( style);
				else
					container.insertBefore( style, child );
			}
		})
	},
	get defaultStyle() {
		return defaultStyle;
	},
	set defaultStyle(val) {
		defaultStyle = val;
	}
}

utils.preAddStyleSheet = utils.preAddStyleStyleSheet;
utils.preAddStyleSrc = utils.preAddStyleStyleSrc;


const localStorage = globalThis.localStorage;


let unique = Date.now();
const globalMouseState = {
		activeFrame : null
	}
var popupTracker;
let popupMap = new WeakMap();

let defaultStyle = (new URL( "./dark-styles.css", import.meta.url )).href;

function addCaptionHandler( c, popup_ ) {
	var popup = popup_;
	if( !popup )
	 	popup = createPopup( null, {from:c} );


	var mouseState = {
		frame:popup.divFrame,
		x:0,y:0,
		dragging:false
	};
	if( popups.autoRaise && popup_ )
		popup_.divFrame.addEventListener( "mousedown", (evt)=>{
			popupTracker.raise( popup );
		} );

	function mouseHandler(c,state) {
		
		var added = false;
		function mouseMove(evt){
			const state = globalMouseState.activeFrame;
			if( state ) {
   	   	if( state.dragging ) {
					evt.preventDefault();
					var pRect = state.frame.getBoundingClientRect();
					//var x = evt.clientX - pRect.left;
					//var y = evt.clientY - pRect.top;
					var x = evt.x - pRect.left;
					var y = evt.y - pRect.top;
					state.frame.style.left =parseInt(state.frame.style.left) + (x-state.x);
					state.frame.style.top= parseInt(state.frame.style.top) +(y-state.y);
					if( state.frame.id ) {
						localStorage.setItem( state.frame.id + "/x", popup.divFrame.style.left );
						localStorage.setItem( state.frame.id + "/y", popup.divFrame.style.top );
					}
				}
   	   	if( state.sizing ) {
					evt.preventDefault();
					var pRect = state.frame.getBoundingClientRect();
					//var x = evt.clientX - pRect.left;
					//var y = evt.clientY - pRect.top;
					var x = evt.x - pRect.left;
					var y = evt.y - pRect.top;
					state.frame.style.left =parseInt(state.frame.style.left) + (x-state.x);
					state.frame.style.top= parseInt(state.frame.style.top) +(y-state.y);
					if( state.frame.id ) {
						localStorage.setItem( state.frame.id + "/x", popup.divFrame.style.left );
						localStorage.setItem( state.frame.id + "/y", popup.divFrame.style.top );
					}
				}
			}
		}
		function mouseDown(evt){
			if( evt.target !== c && evt.target.parentNode !== c ) return;
			const realTarget = evt.composedPath()[0];
			if( realTarget !== c && realTarget.parentNode !== c ) return;
			//evt.preventDefault();
				if( !popup_.useMouse ) return;
				                       
			if( globalMouseState.activeFrame ) {
				return;
			}
			var pRect = state.frame.getBoundingClientRect();
			popupTracker.raise( popup );
			//state.x = evt.clientX-pRect.left;
			//state.y = evt.clientY-pRect.top;
			state.x = evt.x-pRect.left;
			state.y = evt.y-pRect.top;
			globalMouseState.activeFrame = state;
			state.dragging = true;
			if( !added ) {	
				added = true;
				document.body.addEventListener( "mousemove", mouseMove );
				document.body.addEventListener( "mouseup", mouseUp );
			}
		}
		function mouseUp(evt){
			evt.preventDefault();
			globalMouseState.activeFrame = null;
			state.dragging = false;
			if( added ) {
				added = false;
				document.body.removeEventListener( "mousemove", mouseMove );
				document.body.removeEventListener( "mouseup", mouseUp );
			}
		}

		c.addEventListener( "mousedown", mouseDown );
		//c.addEventListener( "mouseup", mouseUp );
		//c.addEventListener( "mousemove", mouseMove );

		c.addEventListener( "touchstart", (evt)=>{
		    if( !popup_.useMouse ) return;
			var pRect = state.frame.getBoundingClientRect();
			popupTracker.raise( popup );
			//state.x = evt.clientX-pRect.left;
			//state.y = evt.clientY-pRect.top;
			if( evt.target === c ) {
				evt.preventDefault();
				state.x = evt.touches[0].clientX-pRect.left;
				state.y = evt.touches[0].clientY-pRect.top;
				state.dragging = true;
			}
			
		}, { passive:true } )
		c.addEventListener( "touchmove", (evt)=>{
		    if( !popup_.useMouse ) return;
			if( state.dragging ) {
				evt.preventDefault();
				const points = evt.touches;
				var pRect = state.frame.getBoundingClientRect();
				var x = points[0].clientX - pRect.left;
				var y = points[0].clientY - pRect.top;
				state.frame.style.left =parseInt(state.frame.style.left) + (x-state.x);
				state.frame.style.top= parseInt(state.frame.style.top) +(y-state.y);
				if( state.frame.id ) {
					localStorage.setItem( state.frame.id + "/x", popup.divFrame.style.left );
					localStorage.setItem( state.frame.id + "/y", popup.divFrame.style.top );
				}
			}
			
		}, { passive:true })
		c.addEventListener( "touchend", (evt)=>{
		    if( !popup_.useMouse ) return;
			//popupTracker.raise( popup );
			if( evt.target === c )  {
				evt.preventDefault();
				state.dragging = false;
			}
			
		}, { passive:true })

	}

	if( popups.defaultDrag ) {
		mouseHandler(c, mouseState );
		if( popup_ )
			mouseHandler(popup_.divFrame, mouseState );
	}

}

class ValueOfType {	
	#type = 0; // undefined
	constructor( type, value ) {
		this.#type = type;
		this.value = value;
	}
}

ValueOfType.Unset = 0;
ValueOfType.Number = 1;
ValueOfType.Dollar = 2;
ValueOfType.Percent = 3;
ValueOfType.String = 4;
ValueOfType.SSN = 5;
ValueOfType.Zip = 6;
ValueOfType.Date = 7;

Object.freeze( ValueOfType );

function initPopupTracker() {

	var tracker = {
		popups : [],
		raise( popup ) {
			var top = tracker.popups.length;
			var n;
			var from = Number(popup.divFrame.style.zIndex);
			if( from === top ) return;

			for( n = 0; n < tracker.popups.length; n++ ) {
				if( n == popup.index )
					popup.divFrame.style.zIndex = top;
				else {
					var thisZ = Number(tracker.popups[n].divFrame.style.zIndex);
					if( thisZ > from )
						tracker.popups[n].divFrame.style.zIndex = Number(tracker.popups[n].divFrame.style.zIndex) - 1;
				}
			}
		},
		find( id ) {
			return this.popups.find( popup=>popup.divFrame.id === id );
		},
		addPopup(popup) {
			popup.index = tracker.popups.length;
			if( popup.divCaption ) {
				popup.divFrame.style.zIndex = popup.index+1;
				tracker.popups.push( popup );
				popup.raise = function() {
					tracker.raise( popup)
				}
			} else popup.raise = function() {
			}
		}
	}
	return tracker;
}
popupTracker = initPopupTracker();

class Events {
	events = {};
	on(event,cb) {
		if( cb && "function" === typeof cb )
			if( this.events[event] )
				this.events[event].push(cb);
			else
				this.events[event] = [cb];
		else {
			var cbList;
			if( cbList = this.events[event]  ) {
				return cbList.map( cbEvent=>cbEvent( cb ));
			}
		}
	}

}

class Popup {
	popupEvents = {
		close : [],
		show : [],
	};
	divContentParent_ = null;
	divShadow = null;
	divFrame_ = document.createElement( "div" );
	divCaption = document.createElement( "div" );
	divTitle = document.createElement( "span" );
	divContentParent_ = document.createElement( "div" );
	divContent_ = null;
	divClose = document.createElement( "div" );
	popup = this;
	// per frame mouse disable...
	useMouse = true;
	suffix = '';

	set top(top){
		if( "number" === typeof top ) {
			this.divFrame.style.top = (top.toDecimal(2)+"vh")
		} else
		this.divFrame.style.top = top;
	}
	set left(left){
		if( "number" === typeof top ) {
			this.divFrame.style.left = (top.toDecimal(2)+"vw")
		} else
		this.divFrame.style.left = top;
	}
	set width(top){
		if( "number" === typeof top ) {
			this.divFrame.style.width = (top.toDecimal(2)+"vw")
		} else
		this.divFrame.style.width = top;
	}
	set height(left){
		if( "number" === typeof top ) {
			this.divFrame.style.height = (top.toDecimal(2)+"vh")
		} else
			this.divFrame.style.height = top;
	}

	get divContent() {
		return this.divContent_ || this.divContentParent_;
	}

	get divFrame() {
		return this.divFrameParent_ || this.divFrame_;
	}

	constructor(caption_,parent,opts) {
	    this.suffix = opts?.suffix ||'';
		const closeButton = opts?.enableClose || false;
		
		// make popup from control.
		const forContent = opts?.from;
		let inFrame;
		if( forContent ) {
		    this.divFrame_ = forContent;
		    this.divContentParent_ = null;
		    this.divCaption = null;
		    this.divClose = null;
		    this.divTitle = null;
		}else  {
			inFrame = (parent&&(parent instanceof Popup));
			this.divFrame_.className = (inFrame?"formContainer":"frameContainer")+this.suffix;
		}
		let useFrame = this.divFrame_;
		let fillFrame = this.divFrame_;
		if( opts && opts.shadowFrame ) {
			this.divShadow = document.createElement( "div" );
			this.divShadow.classRoot = "shadow-frame-container";
			this.divShadow.style.position = inFrame?"absolute":"relative";
			this.divShadow.style.left = "0px";
			this.divShadow.style.top = "0px";
			this.shadow = this.divShadow.attachShadow( {mode:"open"});

			utils.preAddPopupStyles( this.shadow, import.meta.url );
			this.shadow.appendChild( this.divFrame );
			fillFrame = this.divFrame;
		}
		if( opts?.id ) useFrame.id = opts.id;

		if( useFrame.id ) {
			useFrame.style.left = localStorage.getItem( useFrame.id + "/x" );
			useFrame.style.top = localStorage.getItem( useFrame.id + "/y" );						
		}
		else {
			useFrame.style.left= 0;
			useFrame.style.top= 0;
		}
		if( this.divCaption ) {
			if( caption_ && caption_ != "" ) {
				fillFrame.appendChild( this.divCaption );
				this.divCaption.appendChild( this.divTitle );
				if( closeButton && this.divClose )
					this.divCaption.appendChild( this.divClose );
			}

			this.divCaption.className = "frameCaption"+this.suffix;
			if( this.divCaption )
				addCaptionHandler( this.divCaption, this );
		}
		if( this.divContent ){
			this.divContent.className = "frameContent"+this.suffix;
			fillFrame.appendChild( this.divContent );
		}

		if( this.divClose ) {
			this.divClose.className = "captionButton"+this.suffix +" closeButton"+this.suffix;
			this.divClose.addEventListener( "click", (evt)=>{
				this.hide();
				this.on("captionClose", true);
			} );
		}

		popupTracker.addPopup( this );
		if( this.divShadow	)
			popupMap.set( this.shadow, this );
		else
			popupMap.set( this.divFrame, this );

		this.caption = caption_;
		parent = (parent&&parent.divContent) || parent || document.body;

		if( !forContent )
			if( this.divShadow ) parent.appendChild( this.divShadow )
			else parent.appendChild( useFrame );

	}

	set caption(val) {
		if( this.divTitle )
			this.divTitle.textContent = val;
	}
	center() {
		const df = this.divFrame;
		var myRect = df.getBoundingClientRect();
		if( this.divShadow) {
			if( window.innerWidth-myRect.width > 0 )
				this.divShadow.style.left = ((window.innerWidth-myRect.width)/2)+"px";
			else
				this.divShadow.style.left = 0;
			if(window.innerHeight-myRect.height > 0 )
				this.divShadow.style.top = ((window.innerHeight-myRect.height)/2)+"px";
			else
				this.divShadow.style.top = 0;


		}else {
			//var pageRect = this.divFrame.parentElement.getBoundingClientRect();
			if( window.innerWidth-myRect.width > 0 )
				this.divFrame.style.left = ((window.innerWidth-myRect.width)/2)+"px";
			else
				this.divFrame.style.left = 0;
			if(window.innerHeight-myRect.height > 0 )
				this.divFrame.style.top = ((window.innerHeight-myRect.height)/2)+"px";
			else
				this.divFrame.style.top = 0;
		}
	}
	over( e ){
		var target = e.getBoundingClientRect();
		this.divFrame.style.left = target.left;
		this.divFrame.style.top = target.top;
	}
	on(event,cb) {
		if( cb && "function" === typeof cb )
			if( this.popupEvents[event] )
				this.popupEvents[event].push(cb);
			else
				this.popupEvents[event] = [cb];
		else {
			var cbList;
			if( cbList = this.popupEvents[event]  ) {
				cbList.forEach( cbEvent=>cbEvent( cb ));
			}
		}
	}
	reset() {
		this.on( "reset", true );
	}
	refresh() {
		this.on( "refresh", true );
	}
	reject() {
		this.on( "reject", true );
	}
	accept() {
		this.on( "accept", true );
	}
	hide() {
		this.divFrame.style.display = "none";
	}
	show(...args) {
		this.raise();
		this.divFrame.style.display = "";
		//popupTracker.raise( this );

		this.on( "show", true );
	}
	move(x,y) {
		this.divFrame.style.left = x+"vw";
		this.divFrame.style.top = y+"vh";
	}
	appendChild(e) {
		return (this.divContent||this.divFrame).appendChild(e)
	}
	remove() {
		this.divFrame.remove();
	}
}



function createPopup( caption, parent, opts ) {
	return new Popup(caption, parent, opts );
}

function createSimpleForm( title, question, defaultValue, ok, cancelCb ) {
	const popup = popups.create( title );
	popup.on( "show", ()=>{
		if( "function" === typeof defaultValue ){
			input.value = defaultValue();
		}
		else
			input.value = defaultValue;
		input.focus();
		input.select();
	})
	popup.on( "close", ()=>{
		// aborted...
		cancel && cancel();
	});

	var form = document.createElement( "form" );
	form.className = "frameForm";
	form.setAttribute( "action", "none" );
	form.addEventListener( "submit", (evt)=>{
		evt.preventDefault();
		popup.hide();
		ok && ok(input.value);
	} );	
	form.addEventListener( "reset", (evt)=>{
		evt.preventDefault();
		popup.hide();
	} );	

	var textOutput = document.createElement( "SPAN" );
	textOutput.textContent = question;
	var input = document.createElement( "textarea" );
	input.className = "popupInputField";
	input.setAttribute( "size", 45 );
		if( "function" === typeof defaultValue ){
			input.value = defaultValue();
		}
		else
			input.value = defaultValue;

	var okay = document.createElement( "BUTTON" );
	okay.className = "popupOkay";
	okay.textContent = "Okay";
	okay.setAttribute( "name", "submit" );
	okay.addEventListener( "click", (evt)=>{
		evt.preventDefault();
		popup.hide();
		ok && ok( input.value );
	})

	var cancel = document.createElement( "BUTTON" );
	cancel.className = "popupCancel";
	cancel.textContent = "Cancel";
	cancel.setAttribute( "type", "reset" );
	cancel.addEventListener( "click", (evt)=>{
		evt.preventDefault();
		popup.hide();
		cancelCb && cancelCb( );
	})

	popup.divFrame.addEventListener( "keydown", (e)=>{
		if(e.keyCode==27){
			e.preventDefault();
			popup.hide();
			cancelCb && cancelCb( );
		}
	})
	popup.divContent.appendChild( form );
	form.appendChild( textOutput );
	form.appendChild( document.createElement( "br" ) );
	form.appendChild( input );
	form.appendChild( document.createElement( "br" ) );
	form.appendChild( document.createElement( "br" ) );
	form.appendChild( cancel );
	form.appendChild( okay );
	
	popup.center();
	popup.hide();
	return popup;
}

function handleButtonEvents( button, onClick ) {
	let pressed = false;
	let pressed_ = false;
	button.addEventListener( "keydown", (evt)=>{
		if( evt.key === "Enter" || evt.key === " " ) {
			evt.preventDefault();
			evt.stopPropagation();
			onClick();
		}
	} );
	//var okay = document.createElement( "BUTTON" );
	//okay.className = "popupOkay"+suffix;
	//okay.textContent = caption;
	button.addEventListener( "click", (evt)=>{
		evt.preventDefault();
		evt.stopPropagation();
		onClick();
	})
	button.addEventListener( "touchstart", (evt)=>{
		evt.preventDefault();
		pressed = true;
		pressed_ = true;
		button.classList.add( "pressed")
		
	}, { passive:false })
	button.addEventListener( "touchend", (evt)=>{
		evt.preventDefault();
		pressed = false;
		pressed_ = false;
		button.classList.remove("pressed")
		onClick();
		
	}, { passive:false })
	button.addEventListener( "mousedown", (evt)=>{
		evt.preventDefault();
		pressed = true;
		button.classList.add( "pressed")
	})
	button.addEventListener( "mouseup", (evt)=>{
		evt.preventDefault();
		pressed = false;
		button.classList.remove( "pressed")
	})
	button.addEventListener( "mouseout", (evt)=>{
		pressed_ = pressed;
		pressed = false;
		button.classList.remove( "pressed")
	})
	button.addEventListener( "mousemove", (evt)=>{
		if( pressed_ && !pressed){
			if( evt.buttons ) {
				button.classList.add( "pressed")
				pressed = true;
			} else pressed_ = false;
		}
	})
}

function makeButton( form, caption, onClick, options ) {
	let in_form = form;
	let in_popup = null;
	while( in_form && !(( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

    const suffix = (in_popup?in_popup.suffix||"":"")+ (options?.suffix ||"");

	var button = document.createElement( "button" );
	button.className = "button"+suffix;
	//button.style.width = "max-content";
	var buttonInner = document.createElement( "div" );
	buttonInner.className = "buttonInner"+suffix;
	//buttonInner.style.width = "max-content";
	buttonInner.textContent = caption;
	button.buttonInner = buttonInner;
	button.appendChild(buttonInner);
	handleButtonEvents( button, onClick );
	form.appendChild( button );
	return {
		get el(){return button },
		get control() { return button; },
		get span() { return buttonInner; },
		button,
		buttonInner,
		show() {
			button.style.display = "";

		},
		hide() {
			button.style.display = "none";
		},
		remove() {
			button.remove();
		},
		set className(val) {
			button.className = val;
		},
		get className() {
			return button.className;
		},
		get style() {
			return button.style;
		},
		set tooltip(val) {
			const tooltip = document.createElement( "span" );
			tooltip.className = "tooltip-text";
			tooltip.textContent = val;
			button.appendChild( tooltip );
			button.classList.add( "has-tooltip");
		}

	}
      //  return button;

}

function createSimpleNotice( title, question, ok, cancel, opts ) {
    return new SimpleNotice( title, question, ok, cancel, opts );
}

class SimpleNotice extends Popup {
	//const popup = popups.create( title );

	textOutput = document.createElement( "SPAN" );

	constructor( title, question, ok, cancel, opts ) {
		opts = opts || {parent:null,suffix:null};
		super( title, opts.parent||null, {suffix:(opts?.suffix?opts.suffix:"")+"-notice"} );
		const popup = this;
		const form = document.createElement( "form" );
		{

			this.on( "show", ()=>{
	      	this.okay.button.focus();
			})
			this.on( "close", ()=>{
				// aborted...
				cancel && cancel();
			});
			
			form.className = "frameForm"+(opts?.suffix?opts.suffix:"")+"-notice";
	      form.setAttribute( "action", "none" );
			form.addEventListener( "submit", (evt)=>{
				evt.preventDefault();
				this.hide();
				//console.log( "SUBMIT?", input.value );
			} );	
			form.addEventListener( "reset", (evt)=>{
				evt.preventDefault();
				this.hide();
			} );	
			
			this.textOutput.className = "noticeText"+(opts?.suffix?opts.suffix:"")+"-notice";
	      this.textOutput.textContent = question;
			
			this.setMessage = (msg)=>{
	      	this.textOutput.textContent = msg;
			}
			
	      this.divFrame.addEventListener( "keydown", (e)=>{
	      	if(e.keyCode==27){
					e.preventDefault();
					this.hide();
					ok && ok( );
				}
			})
			this.divContent.appendChild( form );
			form.appendChild( this.textOutput );
			form.appendChild( document.createElement( "br" ) );
			form.appendChild( document.createElement( "br" ) );
			//form.appendChild( this.okay.button );
			this.okay = makeButton( form, "Okay", ()=>{
				this.hide();
				ok && ok( );
			})
			
			this.okay.className += (opts?.suffix?opts.suffix:"")+" notice";
			this.okay.button.children[0].className += (opts?.suffix?opts.suffix:"")+" notice";
			
			if( cancel )  {
	      	let cbut = makeButton( form, "Cancel", ()=>{
					this.hide();
					cancel && cancel( );
				})
				cbut.className += (opts?.suffix?opts.suffix:"")+" notice";
				cbut.button.children[0].className += (opts?.suffix?opts.suffix:"")+" notice";
			}
			this.center();
			this.hide();
			//return this;
		}
	}


	show( caption, content ) {
		if( caption && content ) {
			this.divCaption.textContent = caption;
			this.textOutput.textContent = content;
		}
		else if( caption )
			this.textContent = caption;
		super.show();
	}

	appendChild( e ) {
		this.form.insertChild( e, this.okay );
	}
}



class List extends Events{
		 selected = null;
		 groups = [];
		 itemOpens = false;
		 opts = null;
		 compare = (a,b)=>1;
		 
    constructor( parentDiv, parentList, toString, opens, opts )
	{
		let in_form = parentDiv;
		let in_popup = null;
		while( in_form && !(( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;
	
		super();
	    console.log( "List constructor could use the popup to get suffix..." );
		this.opts = opts || {};
		this.opts.suffix = (in_popup?in_popup.suffix:"") +  ( this.opts.suffix?this.opts.suffix:"");
		this.toString = toString;
		this.itemOpens = opens || false;

		if( !parentList ) {
			parentList = document.createElement( "div" );
			parentList.className = "list-container" + (this.opts.suffix?"-"+this.opts.suffix:"");
			parentDiv.appendChild( parentList );
		}			
		this.divTable = parentList;

		this.parentList = parentList;
		if( opts && opts.compare ) {
			this.compare = opts.compare;
		}
	}
	/*
	insertBefore( a, b ) {
		return this.parentList.insertBefore( a, b );
	}
*/
		push(group, toString_, opens) {
			let nextItem = null;
			if( this.parentList ) {
				const itemList = this.parentList.childNodes;
				for( nextItem of itemList) {
					if( !this.opts.setsContent ) {
						if( nextItem.textContent > this.toString(group) )
							break;
					} else {
						if( this.compare( nextItem.group, group ) )
							break;
					}
					nextItem = null;
				}
			
			}
			var newLi = document.createElement( "LI" );
			newLi.className = "listItem" + (this.opts.suffix)
			
			this.divTable.insertBefore( newLi, nextItem );//) appendChild( newLi );
			newLi.addEventListener( "click", (e)=>{
				e.preventDefault();
				if( this.selected )
					this.selected.classList.remove("selected");
				newLi.classList.add( "selected" );
				this.selected = newLi;
				this.on( "select", group );
			})

			var newSubList = document.createElement( "UL");
			newSubList.className = "listSubList" + this.opts.suffix;
			if( this.parentList && this.parentList.parentItem )
				this.parentList.parentItem.enableOpen( this.parentList.thisItem );
			if( opens ) {
			//	this.enableOpen(newLi);
			}

			var treeLabel = document.createElement( "span" );
			treeLabel.className = "listItemLabel" + this.opts.suffix;
			newLi.appendChild( treeLabel );

			if( this.opts.setsContent ) {
				for( let child of treeLabel.childNodes ) child.remove();
				this.toString( treeLabel, group );
			} else
				treeLabel.textContent = this.toString(group);

			//var newSubDiv = document.createElement( "DIV");
			newLi.appendChild( newSubList );
			//newSubList.appendChild( newSubDiv);
			newLi.group = group;
			const subItems = createList( this, newSubList, toString_, true );
			const newRow = { opens : false, group:group, item: newLi, subItems:subItems
				, parent:this.parentList
				//, push: subItems.push.bind( subItems ) 
				, set text(s) {
					treeLabel.textContent = s;
			       	}
				, hide() {
					this.item.style.display = "none";
				}
				, show() {
					this.item.style.display = "";
				}
				, remove() {
					this.item.remove();
				}
			}
			this.groups.push( newRow );
			return newRow;
		}
		enableOpen(item) {
			if( item.opens) return;
			item.opens = true;
				var treeKnob = document.createElement( "span" );
				treeKnob.textContent = "-";
				treeKnob.className = "list-item-knob"+this.opts.suffix+" knobOpen";
				item.item.insertBefore( treeKnob, item.item.childNodes[0] );
				treeKnob.addEventListener( "click", (e)=>{
					e.preventDefault();
					if( treeKnob.classList.contains(  "knobClosed" ) ){
						treeKnob.classList.remove( "knobClosed" );
						treeKnob.classList.add( "knobOpen" );
						treeKnob.textContent = "-";
						item.subItems.items.forEach( sub=>{
							sub.item.style.display="";
						})
					}else{
						treeKnob.classList.add( "knobClosed" );
						treeKnob.classList.remove( "knobOpen" );
						treeKnob.textContent = "+";
						item.subItems.items.forEach( sub=>{
							sub.item.style.display="none";
						})

					}
				})
		}
		enableDrag(type,item,key1,item2,key2) {
			item.item.setAttribute( "draggable", true );
			item.item.addEventListener( "dragstart", (evt)=>{
				//if( evt.dataTransfer.getData("text/plain" ) )
				//	evt.preventDefault();
				if( item2 )
					evt.dataTransfer.setData( "text/" + type, item.group[key1]+","+item2.group[key2])
				else
					evt.dataTransfer.setData( "text/" + type, item.group[key1])
				evt.dataTransfer.setData("text/plain",  evt.dataTransfer.getData("text/plain" ) + JSON.stringify( {type:type,val1:item.group[key1],val2:item2 && item2.group[key2] } ) );
				console.log( "dragstart:", type );
				if( item )
					evt.dataTransfer.setData("text/item", item.group[key1] );
				if( item2 )
					evt.dataTransfer.setData("text/item2", item2.group[key2] );
			})
		}
		enableDrop( type, item, cbDrop ) {
			item.item.addEventListener( "dragover", (evt)=>{
				evt.preventDefault();
				evt.dataTransfer.dropEffect = "move";
				//console.log( "Dragover:", evt.dataTransfer.getData( "text/plain" ), evt );
			})
			item.item.addEventListener( "drop", (evt)=>{
				evt.preventDefault();
				var objType = evt.dataTransfer.getData( "text/plain" );
				if( "undefined" !== typeof JSOX ) {
				JSOX.begin( (event)=>{
					if( type === event.type ){
						console.log( "drop of:", evt.dataTransfer.getData( "text/plain" ) );
						//cbDrop( accruals.all.get( event.val1 ) );
					}
				} ).write( objType );
				}
			})
		}
		update(group) {
			var item = this.groups.find( group_=>group_.group === group );
			if( this.opts.setsContent ) {
				for( let child of item.item.childNodes ) child.remove();
				this.toString( item, group );
			} else
				item.textContent = this.toString( group );
		}
		get items() {
			return this.groups;
		}
		reset() {
			while( this.divTable.childNodes.length )
				this.divTable.childNodes[0].remove();
		}
	}

function createList( parent, parentList, toString, opens, opts ) {
     return new List( parent, parentList, toString, opens, opts );
}
function makeList( parent, toString, opts ) {
	var newSubList = document.createElement( "UL");
	newSubList.className = "list" + (opts?.suffix?'-':'') + (opts?.suffix||"");
	parent.appendChild( newSubList );
	return new List( newSubList, newSubList, toString, opts?.opens, opts );
}

function makeCheckbox( form, o, field, text, opts ) 
{
	let in_form = form;
	let in_popup = null;
	while( in_form && !((in_popup =in_form) instanceof Popup || ( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	opts = opts || {};
	let initialValue = o[field];
	const popupForm = opts.form || in_popup;
	const suffix = (( popupForm )?popupForm.suffix:'') + (opts.suffix?opts.suffix:"");
	const id = "checkbox_"+Math.random();
	var textCountIncrement = document.createElement( "label" );
	textCountIncrement.htmlFor  = id;
	textCountIncrement.className = "field-unit-span";
	textCountIncrement.textContent = text;
	var inputCountIncrement = document.createElement( "INPUT" );
	inputCountIncrement.id = id;
	inputCountIncrement.setAttribute( "type", "checkbox");
	inputCountIncrement.className = "checkOption"+suffix + " rightJustify";
	inputCountIncrement.checked = o[field];
	//textDefault.
	var onChange = [];
	var binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	binder.addEventListener( "click", (e)=>{ 
		if( e.target === inputCountIncrement ) return;
		e.preventDefault(); o[field] = inputCountIncrement.checked = !inputCountIncrement.checked; 
		onChange.forEach( cb=>cb()); 
	})
	inputCountIncrement.addEventListener( "change", (e)=>{ 
		 o[field] = inputCountIncrement.checked; 
	})
	textCountIncrement.addEventListener( "click", (e)=>{ 
		if( e.target === inputCountIncrement ) return;
		e.preventDefault(); o[field] = !inputCountIncrement.checked; 
		onChange.forEach( cb=>cb()); 
	})
	form.appendChild(binder );
	binder.appendChild( textCountIncrement );
	binder.appendChild( inputCountIncrement );
	//form.appendChild( document.createElement( "br" ) );
	if( popupForm) {
		popupForm.on( "refresh", ()=>{
			initialValue = inputCountIncrement.checked = o[field];
		})
		popupForm.on( "reset", ()=>{			
			o[field] = inputCountIncrement.checked = initialValue;
		})
		popupForm.on( "accept", ()=>{
			initialValue = inputCountIncrement.checked;
		} );
		popupForm.on( "reject", ()=>{
			inputCountIncrement.checked = initialValue;
		} );
	}
	binder.addEventListener( "mousedown", (evt)=>{
		evt.stopPropagation();
	})

	return {
		get el() { return binder; },
		get control() { return inputCountIncrement; },
		get span() { return textCountIncrement; },
		on(event,cb){
			if( event === "change" ) onChange.push(cb);
			inputCountIncrement.addEventListener(event,cb);
		},
		get checked() {
			return inputCountIncrement.checked;
		},
		set checked(val) {
			inputCountIncrement.checked = val;
		},
		get value() { return inputCountIncrement.checked; },
		set value(val) { 
			o[field] = val;
			inputCountIncrement.checked = val;
			onChange.forEach( cb=>cb());
		 }
		,
		refresh(){
		    initialValue = o[field];
		    inputCountIncrement.checked = initialValue;
		},
		reset(){
		    o[field] = initialValue;
		    inputCountIncrement.checked = initialValue;
		},
		get disabled() { return inputCountIncrement.disabled },
		set disabled(val) { inputCountIncrement.disabled=val },
		changes() {
		    if( o[field] !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + o[field];
		    }
		    return '';
				},
		get style() {
			return binder.style;
		},
		set tooltip(val) {
			const tooltip = document.createElement( "span" );
			tooltip.className = "tooltip-text";
			tooltip.textContent = val;
			binder.appendChild( tooltip );
			binder.classList.add( "has-tooltip");
		}
	}
}

function makeLeftRadioChoice( form, o, field, text, groupName ) 
{
	return makeRadioChoice( form,o,field,text,groupName, true );
}

function makeRadioChoice( form, o, field, text, groupName, left ) 
{
	let in_form = form;
	let in_popup = null;
	while( in_form && !((in_popup =in_form) instanceof Popup || ( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	let initialValue = getInputValue( o, field );
	const suffix = ( form instanceof Popup )?form.suffix:'';
	var textOption = document.createElement( "SPAN" );
	if( left ) 
		textOption.className = "radio-text"+suffix + " rightJustify";
	else
		textOption.className = "radio-text"+suffix;
	textOption.textContent = text;
	var option = document.createElement( "INPUT" );
	option.setAttribute( "type", "radio");
	option.setAttribute( "name", groupName );		
	if( left )
		option.className = "radioOption"+suffix;
	else
		option.className = "radioOption"+suffix + " rightJustify";
	option.checked = getInputValue( o, field );
	//textDefault.
	var onChange = [];
	var binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	binder.addEventListener( "click", (e)=>{ 
		if( e.target===option) return; e.preventDefault(); if( !option.checked ) { option.checked = !option.checked; setValue( null, o, field, option.checked, null ) } })
	binder.addEventListener( "change", (e)=>{ 
		setValue( null, o, field, option.checked, null )
	})
	form.appendChild(binder );
	if( left ) {
		binder.appendChild( option );
		binder.appendChild( textOption );
	}else {
		binder.appendChild( textOption );
		binder.appendChild( option );
	}
	//form.appendChild( document.createElement( "br" ) );

	binder.addEventListener( "mousedown", (evt)=>{
		//evt.stopPropagation();
	})

	return {
		get el() { return binder; },
		get control() { return option; },
		get span() { return textOption; },
		on(event,cb){
			if( event === "change" ) onChange.push(cb);
			option.addEventListener(event,cb);
		},
		get checked() {
			return option.checked;
		},
		set checked(val) {
			option.checked = val;
		},
		get value() { return option.checked; },
		set value(val) { 
			setValue( null, o, field, option.checked )
			//o[field] = val;
			option.checked = val;
			onChange.forEach( cb=>cb());
		 }
		,
		reset(){
			setValue( null, o, field, initialValue, col.type )
		    option.checked = initialValue;
		},
		changes() {
		    if( o[field] !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + getInputValue( o, field );
		    }
		    return '';
				},
		get style() {
			return binder.style;
		},
		set tooltip(val) {
			const tooltip = document.createElement( "span" );
			tooltip.className = "tooltip-text";
			tooltip.textContent = val;
			binder.appendChild( tooltip );
			binder.classList.add( "has-tooltip");
		}
	}
}

function makeSlider( form, o, field, text, f, g ) 
{
	let in_form = form;
	let in_popup = null;
	while( in_form && !((in_popup =in_form) instanceof Popup || ( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	if( f && "function" !== typeof f ) {
		console.log( "makeSlider: Function to transform value is not a function:", f  );
		f = null;
	}
	if( g && "function" !== typeof g ) {
		console.log( "makeSlider: Function to transform from value to slider is not a function:", f  );
		g = null;
	}
	const suffix = ( in_popup instanceof Popup )?in_popup.suffix:'';
	let initialValue = getInputValue( o, field );
	const textCountIncrement = document.createElement( "SPAN" );
	textCountIncrement.textContent = text;
	const inputCountIncrement = document.createElement( "INPUT" );
	inputCountIncrement.setAttribute( "type", "range");
	inputCountIncrement.setAttribute( "min", 1);
	inputCountIncrement.setAttribute( "max", 1000);
	inputCountIncrement.className = "valueSlider"+suffix + " rightJustify";
	inputCountIncrement.value = g?g(getInputValue( o, field )):getInputValue( o, field );

	const valueCountIncrement = document.createElement( "SPAN" );
	valueCountIncrement.textContent = getInputValue( o, field );
	valueCountIncrement.className = "field-unit-span"+suffix;
	//textDefault.
	const onChange = [];
	const binder = document.createElement( "div" );
	binder.className = "field-unit"+suffix;
	//binder.addEventListener( "click", (e)=>{ 
	//	if( e.target===inputCountIncrement) return; e.preventDefault(); inputCountIncrement.checked = !inputCountIncrement.checked; })
	inputCountIncrement.addEventListener( "input", (e)=>{ 
		if(f)  setValue( null, o, field, f(inputCountIncrement.value), null );
		else setValue( null, o, field, inputCountIncrement.value, null );
		valueCountIncrement.textContent = getInputValue( o, field );
		control.on( "change", control );
		//if( form instanceof Popup ) form.on("update", control );	
	})

	form.appendChild(binder );
	binder.appendChild( textCountIncrement );
	binder.appendChild( inputCountIncrement );
	binder.appendChild( valueCountIncrement );

	binder.addEventListener( "mousedown", (evt)=>{
		evt.stopPropagation();
	})

	if( in_popup instanceof Popup ) {
		in_popup.on( "accept", ()=>{
			initialValue = inputCountIncrement.value;
		} );
		in_popup.on( "reject", ()=>{
			inputCountIncrement.value = initialValue;
		} );
	}

	//form.appendChild( document.createElement( "br" ) );
	const control = {
		get el() { return binder; },
		get control() { return inputCountIncrement; },
		get span() { return textCountIncrement; },
		on(event,cb){
			if( "function" === typeof cb ) {
				if( event === "change" ) onChange.push(cb);
				inputCountIncrement.addEventListener(event,cb);
			}else {
				if( event === "change" ) onChange.forEach( f=>f(cb) );
			}
		},
		get value() { return inputCountIncrement.checked; },
		set value(val) { 
			setValue( null, o, field, val, null )
			inputCountIncrement.checked = val;
			onChange.forEach( cb=>cb());
		 }
		,
		reset(){
			setValue( null, o, field, initialValue, null )
		    inputCountIncrement.checked = initialValue;
		},
		changes() {
		    if( getInputValue( o, field ) !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + getInputValue( o, field );
		    }
		    return '';
		},
		get style() {
			return binder.style;
		}
	}
	return control;
}

function makeTextInput( form, input, value, text, money, percent, number, suffix_, area ){
	// initial might be re-set on a form re-show...
	let in_form = form;
	let in_popup = null;
	while( in_form && !( (in_popup =in_form) instanceof Popup || ( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	let initialValue = getInputValue( input, value );
	const parentPopup =  in_popup instanceof Popup;
	const suffix = ( parentPopup?in_popup.suffix:"" ) +(suffix_||'');

	var textMinmum = document.createElement( "SPAN" );
	textMinmum.className = "text-label"+suffix;
	textMinmum.textContent = text;
	var inputControl = area?document.createElement( "TEXTAREA"):document.createElement( "INPUT" );
	inputControl.className = "textInputOption"+suffix +" rightJustify";
	//inputControl.addEventListener( "mousedown", (evt)=>evt.stopPropagation() );
	inputControl.addEventListener( "click", (evt)=>inputControl.select() );
	if( number ) {
		inputControl.setAttribute( "pattern", "[0-9]*" );
		inputControl.setAttribute( "inputmode","numeric" );
		inputControl.setAttribute( "size","10" );
	}
	//textDefault.

	if( parentPopup ) {
		in_popup.on ( "refresh", ()=>{
			initialValue = inputControl.value = getInputValue( input, value );
		})
		in_popup.on ( "reset", ()=>{
			inputControl.value = initialValue;
		})
		in_popup.on( "accept", ()=>{
			initialValue = inputControl.value;
		} );
		in_popup.on( "reject", ()=>{
			inputControl.value = initialValue;
		} );
	}

	function setFieldValue() {
		const val = getInputValue( input, value );
		if( money ) {
			inputControl.value = utils.to$(val);
		} else if( percent ) {
			inputControl.value = utils.toP(val);
		} else if( number ) {
			inputControl.value = Number(val);
		}else {
			inputControl.value = val;
		}
	}
	function addValueEvents() {
		if( money ) {
			inputControl.addEventListener( "change", (e)=>{
				var val = utils.toD(inputControl.value);
				setValue( null, input, value, val, null );
				inputControl.value = utils.to$(val);
				result.on( "change", result );
			})
		} else if( percent ) {
			inputControl.addEventListener( "change", (e)=>{
				var val = utils.fromP(inputControl.value);
				setValue( null, input, value, val, null );
				inputControl.value = utils.toP(val);
				result.on( "change", result );
			})
		} else if( number ) {
			inputControl.addEventListener( "change", (e)=>{
				var val = Number(inputControl.value);
				setValue( null, input, value, val, null );
				inputControl.textContent = val;
				result.on( "change", result );
			})
		}else {
			inputControl.addEventListener( "input", (e)=>{
			} );
			inputControl.addEventListener( "input", (e)=>{
				var val = inputControl.value;
				setValue( null, input, value, val, null );
				result.on( "change", result );
			})
		}
	}
	setFieldValue();
	addValueEvents();

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	form.appendChild(binder );
	binder.appendChild( textMinmum );
	binder.appendChild( inputControl );

	binder.addEventListener( "mousedown", (evt)=>{
		evt.stopPropagation();
	})

	if( in_popup instanceof Popup ) {
		in_popup.on( "accept", ()=>{
			initialValue = inputControl.value;
		} );
		in_popup.on( "reject", ()=>{
			inputControl.value = initialValue;
		} );
	}

	const events = {};

	const result = {
		get el() { return binder; },
		get control() { return inputControl; },
		get span() { return textMinmum; },
		on( event, param ) {
			if( "function" === typeof param ) {
				events[event] = param;
			} else {
				if( event in events )
				events[event](param);
			}
		},
		get frame() {
			return binder;
		},
		get frame() {
			return binder;
		},
	    	addEventListener(a,b) { return inputControl.addEventListener(a,b) },
		blur() { inputControl.blur() },
		get value () {
			if( money )
				return utils.toD(inputControl.value);
			if( percent ) 
				return utils.fromP(inputControl.value);
			if( number ) 
				return Number(inputControl.value);
			return inputControl.value;
		},
		set value (val) {
			if( money )
				inputControl.value = utils.to$(val);
			else if( percent )
				inputControl.value = utils.toP(val);
			else if( number )
				inputControl.value = val;
			else
				inputControl.value = val;			
		},
		refresh() {
		    initialValue = getInputValue( input, value );
		    setFieldValue();
		},
		reset(){
		    setValue( null, input, value, initialValue, null );
		    setFieldValue();
		},
		changes() {
			const newVal = getInputValue( input, value );
		    if( newVal !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + newVal;
		    }
		    return '';
		},
		set tooltip(val) {
			const tooltip = document.createElement( "span" );
			tooltip.className = "tooltip-text";
			tooltip.textContent = val;
			binder.appendChild( tooltip );
			binder.classList.add( "has-tooltip");
		}
	}
	return result;
}


function makeTextField( form, input, value, text, money, percent, area ){
	let initialValue = getInputValue( input, value );
	let in_form = form;
	let in_popup = null;
	while( in_form && !((in_popup =in_form) instanceof Popup || ( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	const parentPopup =  in_popup instanceof Popup;
	const suffix = ( parentPopup )?in_popup.suffix:'';
	var textLabel = area?document.createEleemnt( "TEXTAREA"):document.createElement( "SPAN" );
	textLabel.className = "text-label"+suffix;
	textLabel.textContent = text;
	var inputControl = document.createElement( "SPAN" );
	inputControl.className = "text-field"+suffix+" rightJustify";
	inputControl.addEventListener( "mousedown", (evt)=>evt.stopPropagation() );
	//textDefault.
	function setFieldValue() {
		const val = getInputValue( input, value );
		if( money ) {
			inputControl.textContent = utils.to$(val);
			inputControl.addEventListener( "change", (e)=>{
				var val = utils.toD(inputControl.value);
				input[value] = inputControl.textContent = utils.to$(val);
			})
		} else if( percent ) {
			inputControl.textContent = utils.toP(val);
			inputControl.addEventListener( "change", (e)=>{
				var val = utils.fromP(inputControl.value);
				setValue( null, input, value, inputControl.textContent = utils.toP(val), null );
			})
		}else {
			inputControl.textContent = getInputValue( input, value );
			inputControl.addEventListener( "input", (e)=>{
				var val = inputControl.value;
				setValue( null, input, value, val, null );
			})
		}
	}
	setFieldValue();

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	form.appendChild(binder );
	binder.appendChild( textLabel );
	binder.appendChild( inputControl );

	if( parentPopup ) {
		in_popup.on( "refresh", ()=>{
			initialValue = getInputValue( input, value );
			setFieldValue();
		})
		in_popup.on( "accept", ()=>{
			initialValue = inputControl.textContent;
		} );
		in_popup.on( "reject", ()=>{
			inputControl.textContent = initialValue;
		} );
	}

	return {
	    addEventListener(a,b) { return inputControl.addEventListener(a,b) },
		textLabel,
		refresh() {
			 initialValue = getInputValue( input, value );
			 setFieldValue();
			
		},
		get value () {
			if( money )
				return utils.toD(inputControl.textContent);
			if( percent ) 
				return utils.fromP(inputControl.textContent);
			return inputControl.textContent;
		},
		set value (val) {
			if( money )
				inputControl.textContent = utils.to$(val);
			else if( percent )
				inputControl.textContent = utils.toP(val);
			else
				inputControl.textContent = val;			
		},
		reset(){
			setValue( null, input, value, initialValue, { money, percent } )
		    setFieldValue();
		},
		divFrame : binder,
		changes() {
			const val = getInputValue( input, value );
		    if( val !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + val;
		    }
		    return '';
		},
		set tooltip(val) {
			const tooltip = document.createElement( "span" );
			tooltip.className = "tooltip-text";
			tooltip.textContent = val;
			binder.appendChild( tooltip );
			binder.classList.add( "has-tooltip");
		}
	}
}

function makeNameInput( form, input, value, text ){
	let in_form = form;
	let in_popup = null;
	while( in_form && !( (in_popup =in_form) instanceof Popup || (in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	const parentPopup =  in_popup instanceof Popup;
	let initialValue = getInputValue( input, value );
	const suffix = ( parentPopup )?in_popup.suffix:'';
	var binder;
	const textLabel = document.createElement( "SPAN" );
	textLabel.className = "text-label"+suffix;
	textLabel.textContent = text;

	const textOutput = document.createElement( "SPAN" );
	textOutput.className = "text-value"+suffix;
	textOutput.textContent = input[value];

	const buttonRename = document.createElement( "Button" );
	buttonRename.textContent = popups.strings.get("(rename)");
	buttonRename.className="buttonOption"+suffix+" rightJustify";
	buttonRename.addEventListener("click", (evt)=>{
		evt.preventDefault();
		//title, question, defaultValue, ok, cancelCb
		const newName = createSimpleForm( popups.strings.get("Change Name")
						 , popups.strings.get("Enter new name")
						 , getInputValue( input, value )
						 , (v)=>{
						 	setValue( null, input, value,  v, null );
							textOutput.textContent = v;
						 }
						 );
		newName.show();
	} );

	binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	form.appendChild(binder );
	binder.appendChild( textLabel );
	binder.appendChild( textOutput );
	binder.appendChild( buttonRename );

	if( parentPopup ) {
		in_popup.on( "refresh", ()=>{
			initialValue = textOutput.textContent = getInputValue( input, value );
		})
		in_popup.on( "reset", ()=>{
			textOutput.textContent = input[value] = initialValue;
		})
		in_popup.on( "accept", ()=>{
			initialValue = textOutput.textContent;
		} );
		in_popup.on( "reject", ()=>{
			textOutput.textContent = initialValue;
		} );
	}

	//binder.appendChild( document.createElement( "br" ) );
	return {
		get value() {
			return textOutput.textContent;
		}		,
		set value(val) {
			textOutput.textContent = val;
		},
		reset(){
		    input[value] = initialValue;
		    textLabel.textContent = initialValue;
		},
		changes() {
		    if( input[value] !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + input[value];
		    }
		    return '';
		},
		set tooltip(val) {
			const tooltip = document.createElement( "span" );
			tooltip.className = "tooltip-text";
			tooltip.textContent = val;
			binder.appendChild( tooltip );
			binder.classList.add( "has-tooltip");
		}
	}
}


function makeDateInput( form, input, value, text ){
	let in_form = form;
	let in_popup = null;
	while( in_form && !(( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;
	
	const suffix = ( in_popup instanceof Popup )?in_popup.suffix:'';
	const initialValue = input[value];

	var textLabel = document.createElement( "SPAN" );
	textLabel.className = "text-label"+suffix;
	textLabel.textContent = text;
	var inputControl = document.createElement( "INPUT" );
	inputControl.className = "textInputOption"+suffix+" rightJustify";
	inputControl.type = "date"; // returns date at midnight UTC not local.
	inputControl.addEventListener( "mousedown", (evt)=>{
		evt.stopPropagation() // halt on this control
	} );

	//textDefault.
	if( input[value] instanceof Date ) {
		inputControl.valueAsDate = input[value];
	}else
		inputControl.value = input[value];
	inputControl.addEventListener( "change",(evt)=>{
		console.log( "Date type:", inputControl.value, new Date( inputControl.value ) );
		input[value] = new Date( inputControl.value );
		// convert to wall clock?  What if browser isn't in birth locale?
		//input[value].setMinutes( input[value].getTimezoneOffset());
	} );

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	form.appendChild(binder );
	binder.appendChild( textLabel );
	binder.appendChild( inputControl );

	if( in_popup instanceof Popup ) {
		in_popup.on( "accept", ()=>{
			initialValue = inputControl.value;
		} );
		in_popup.on( "reject", ()=>{
			inputControl.value = initialValue;
		} );
	}

	return {
	    	addEventListener(a,b) { return inputControl.addEventListener(a,b) },
		get value () {
			return inputControl.value;
		},
		set value (val) {
		    	//input[value] = val;
			inputControl.value = val;
		}
		, hide() {
			this.item.style.display = "none";
		}
		, show() {
			this.item.style.display = "";
		}
		, reset(){
		    input[value] = initialValue;
		    inputControl.valueAsDate = initialValue;
		}
		, changes() {
		    if( input[value] !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + input[value];
		    }
		    return '';
		}
	}
}

function makeZipInput( form, input, value ){
	let in_form = form;
	let in_popup = null;
	while( in_form && !(( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	const suffix = ( in_popup instanceof Popup )?in_popup.suffix:'';
	const initialValue = input[value];
	var textLabel = document.createElement( "SPAN" );
	textLabel.className = "text-label"+suffix;
	textLabel.textContent = text;
	var inputControl = document.createElement( "INPUT" );
	inputControl.className = "textInputOption"+suffix+" rightJustify";
	inputControl.type = "date";
	inputControl.addEventListener( "mousedown", (evt)=>evt.stopPropagation() );

	//textDefault.
	inputControl.value = input[value];
	inputControl.addEventListener( "change",(evt)=>{
		input[value] = inputControl.value;
	} );

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	form.appendChild(binder );
	binder.appendChild( textLabel );
	binder.appendChild( inputControl );

	if( form instanceof Popup ) {
		in_popup.on( "accept", ()=>{
			initialValue = inputControl.value;
		} );
		in_popup.on( "reject", ()=>{
			inputControl.value = initialValue;
		} );
	}

	return {
		get value () {
			return inputControl.value;
		},
		set value (val) {
			inputControl.value = val;
		}
	}
}

function makeSSNInput( form, input, value ){
	let in_form = form;
	let in_popup = null;
	while( in_form && !(( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	const suffix = ( in_popup instanceof Popup )?in_popup.suffix:'';
	const initialValue = input[value];
	var textLabel = document.createElement( "SPAN" );
	textLabel.className = "text-label"+suffix;
	textLabel.textContent = text;
	var inputControl = document.createElement( "INPUT" );
	inputControl.className = "textInputOption"+suffix+" rightJustify";
	inputControl.type = "date";

	//textDefault.
	inputControl.value = input[value];
	inputControl.addEventListener( "change",(evt)=>{
		input[value] = inputControl.value;
	} );

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	form.appendChild(binder );
	binder.appendChild( textLabel );
	binder.appendChild( inputControl );

	if( in_popup instanceof Popup ) {
		in_popup.on( "accept", ()=>{
			initialValue = inputControl.value;
		} );
		in_popup.on( "reject", ()=>{
			inputControl.value = initialValue;
		} );
	}

	return {
		get value () {
			return inputControl.value;
		},
		set value (val) {
			inputControl.value = val;
		},
		reset(){
		    input[value] = initialValue;
		    inputControl.value = initialValue;
		},
		changes() {
		    if( input[value] !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + input[value];
		    }
		    return '';
		}
	}
}

// --------------- Dropdown choice list ---------------------------
function makeChoiceInput( form, input, value, choices, text, opts ){
	let in_form = form;
	let in_popup = null;
	while( in_form && !(( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

	const parentPopup =  in_popup instanceof Popup;
	const suffix = ( parentPopup ?in_popup.suffix:'') + ((opts&&opts.suffix)?opts.suffix:"");
	let initialValue = getInputValue( input, value );
	const options = [];
	var textLabel = document.createElement( "label" );
	const id = "choicebox_"+Math.random();
	textLabel.htmlFor  = id;
	textLabel.className = "choice-label"+suffix;
	textLabel.textContent = text;
	var inputControl = document.createElement( "SELECT" );
	inputControl.id=id;
	inputControl.className = "selectInput"+suffix+" rightJustify";
	inputControl.addEventListener( "mousedown", (evt)=>evt.stopPropagation() );
	const currentValue = getInputValue( input, value );
	for( let choice of choices ) {
		const option = document.createElement( "option" );
		if( "string" === typeof choice) {
			option.text = choice;
			option.value = choice;
			choice= {text:choice,value:choice, type:{} };
		} else{
			option.text = choice.text;
			option.value = choice.value;
		}
		options.push( {option,choice});
		inputControl.add( option );
		if( choice.value === currentValue ) {
		   inputControl.selectedIndex = inputControl.options.length-1;
		}
	}
	//textDefault.
	//inputControl.value = currentValue;
	inputControl.addEventListener( "change",(evt)=>{
		const opt = options[inputControl.selectedIndex];
		setValue( null, input, value, getValue(), opt.type );
		if(opts&&opts.change) opts.change(inputControl.selectedIndex);
	} );

	function getValue() {
		const idx = inputControl.selectedIndex;
		if( idx >= 0 ) {
			console.log( "Value in select is :", options[idx].choice.text );
			if( opts?.useIndex )
				return idx;
			else
				return options[idx].choice.value;
		}

	}
	var binder = document.createElement( "div" );
	binder.className = "fieldUnit"+suffix;
	form.appendChild(binder );
	binder.appendChild( textLabel );
	binder.appendChild( inputControl );

	if( parentPopup ) {
		in_popup.on( "refresh", ()=>{
			initialValue = inputControl.value = input[value];
		})
		in_popup.on( "reset", ()=>{
			input[value] = inputControl.value = initialValue;
		})
		in_popup.on( "accept", ()=>{
			initialValue = inputControl.value;
		} );
		in_popup.on( "reject", ()=>{
			inputControl.value = initialValue;
		} );
	}


	return {
		get el() { return binder; },
		get control() { return inputControl; },
		get span() { return textLabel; },
		on(event,cb){
			//inputControl.addEventListener(event,cb);
		},
		addEventListener( evt,cb) {
			return inputControl.addEventListener(evt,cb);
		},
		remove() {
			inputControl.remove();
		},
		get value () {
			return getValue();
		},
		set value (val) {
			//inputControl.value = val;
			const index = options.findIndex( opt=>opt.choice.value === val );
			if( index >= 0 ) {
				inputControl.selectedIndex = index;
			}
		},
		get disabled() { return inputControl.disabled },
		set disabled(val) { inputControl.disabled=val },
		refresh() {
			initialValue = getInputValue( input, value );
			inputControl.value = initialValue;
		},
		reset(){
		    setValue( null, input, value, initialValue, {number:true} );
		    inputControl.value = initialValue;
		},
		changes() {
		    if( input[value] !== initialValue ) {
			return text
			    + popups.strings.get( " changed from " )
			    + initialValue
			    + popups.strings.get( " to " )
			    + input[value];
		    }
		    return '';
		},
		addOption( choice ) {
			const option = document.createElement( "option" );
			if( "string" === typeof choice) {
				option.text = choice;
				option.value = choice;
				choice= {text:choice,value:choice, type:{} };
			} else{
				option.text = choice.text;
				option.value = choice.value;
			}
			options.push( {option,choice});
			if( choice.value === input[value] ) {
				inputControl.selectedIndex = inputControl.options.length-1;
			}
			inputControl.add( option );

		},
		setChoices( choices ) {
			options.length = 0;
			inputControl.innerHTML = "";

			for( let choice of choices ) {
				this.addOption( choice );
			}
	
		}
	}
}



//--------------------------- Quick Popup Menu System ------------------------------


let mouseCatcher = null;

function initMouseCatcher() {
	if( mouseCatcher ) return;
	mouseCatcher = document.createElement( "div" );
	document.body.appendChild( mouseCatcher )
	mouseCatcher.addEventListener( "contextmenu", (evt)=>{ evt.preventDefault(); evt.stopPropagation();return false; } );
	mouseCatcher.className = "mouseCatcher";
	let topMenu;

	mouseCatcher.addEventListener( "click", (evt)=>{
		mouseCatcher.style.visibility = "hidden";
		if( topMenu )
			topMenu.hide( true );
	} );

}


function createPopupMenu( opts ) {
	const suffix = opts?.suffix||'';
	let keepShow = false;
	let closing = false;
	function menuCloser() {
		if( menu.lastShow ) {
			if( keepShow ) {
				menu.lastShow = 0;
				keepShow = false;
				closing = false;
				return;
			}
			const now = Date.now();
			if( ( now - menu.lastShow ) > 500 )  {
				closing = false;
				menu.lastShow = 0; // reset this, otherwise hide will just schedule this timer
				if( menu.subOpen ) menu.subOpen.hide();
				menu.hide();
			}
			if( menu.lastShow ) {
				setTimeout( menuCloser, 500 - ( now - menu.lastShow ) );
				closing = true;
			}
		}
	}

	const menu = {
		items: [],
		keepOpen : opts?.keepOpen || false,
		lastShow : 0,
		parent : null,
		subOpen : null,
		container : document.createElement( "div" ),
		board : null,
		suffix,
		separate( ) {
			var newItem = document.createElement( "HR" );
			newItem.className = "popup-item-sep" + suffix;
			menu.container.appendChild( newItem );
		},

		addItem( text, cb ) {
				var newItem = document.createElement( "A" );
				var newItemBR = document.createElement( "BR" );
				newItem.textContent = text;
				menu.container.appendChild( newItem );
				menu.container.appendChild( newItemBR );
				newItem.className = "popup-item"+menu.suffix;
				newItem.addEventListener( "click", (evt)=>{
					cb();
					//console.log( "Item is clicked.", evt.target.value );
					if( !menu.keepOpen )
						this.hide( true );
				} );
				newItem.addEventListener( "mouseover", (evt)=>{
					if( menu.subOpen ) {
						menu.subOpen.hide();
						menu.subOpen = null;
					}
					keepShow = true;
				} );
		},
		addMenu( text ) {
				var newItem = document.createElement( "A" );
				newItem.className = "popup-item-menu" + suffix;
				var newItemBR = document.createElement( "BR" );
				newItem.textContent = text;
				this.container.appendChild( newItem );
				this.container.appendChild( newItemBR );
				const value = createPopupMenu();
				{
					value.parent = this;
				       	this.items.push( value );
					newItem.addEventListener( "mouseover", (evt)=>{
						var r = newItem.getBoundingClientRect();
						keepShow = true;
						//console.log( "Item hover show that.", evt.clientX, evt.clientY );

						value.show( evt.clientX + 25, r.top - 10, menu.cb );
						menu.subOpen = value;
					} );
					newItem.addEventListener( "mouseout", (evt)=>{
						var r = newItem.getBoundingClientRect();
						// get a mouse out when initially showing the item
						//console.log( "Item is mouseOut show that.",  evt.clientX, r.top );
						if( evt.toElement !== newItem /*this.container*/ )		
							value.hide();
					} );
					newItem.addEventListener( "mousemove", (evt)=>{
						if( this.subOpen )
							this.subOpen.lastShow = Date.now();
					} );
				}
				return value;
		},
		hide( all ) {
			if( menu.lastShow ) return menuCloser();			
			this.container.style.visibility = "hidden";
			const sub = this.subOpen;
			if( sub ) {
				this.subOpen = null;
				sub.hide( all );
			}

			if( this.parent && this.parent.subOpen ) {
				if( all ) {
					// close from here up
					this.parent.hide( all );
				}
			} else {
				if( !menu.keepOpen )
					mouseCatcher.style.visibility = "hide"
			}
		},
		show( x, y, cb ) {
			if( this.parent )
				this.parent.subOpen = this;
			menu.lastShow = Date.now();
			//this.board = board;
			menu.cb = cb;
			if( !menu.keepOpen ) {
				mouseCatcher.style.visibility = "visible"
			}
			this.container.style.visibility = "inherit";
			this.container.style.left = x;
			this.container.style.top = y;
			if( closing ) keepShow = true;
		},
		reset() {
			this.hide(true);
			let  n;
			while( n = menu.container.childNodes[0] ){
				n.remove();
			}
			//console.log( "hide everything?" );	
		}
	};

	if( !menu.keepOpen ) {
		if( !mouseCatcher ) initMouseCatcher();
		mouseCatcher.appendChild( menu.container );
	} else
		document.body.appendChild( menu.container );
	menu.container.className = "popup-menu"+suffix;
	menu.container.style.zIndex = 50;
	if( !menu.keepOpen )
		menu.hide(); 
	//document.body.appendChild( menu.container );
	return menu;
}


export class GraphicFrame extends Popup {
	static frames = [];

	frameFrame = null;
	leftWidth = 54;		
	topWidth = 54;
	rightWidth = 58;
	bottomWidth = 55;
	mouseSection = 0;
	draw = null;
	mouse = null;
	canvas = document.createElement( "canvas" )
		 ctx = null
		 w= 0
		 h = 0
		 x= 0
		 y = 0
		 sx = 0//leftWidth
		 sy = 0//topWidth
		 sw = 0//w - ( leftWidth+rightWidth )
		 sh = 0//h - ( topWidth+bottomWidth )
		 sizing = false
		 dragging = false
		 startX = 0
		 startY = 0



	constructor (opts) {
    	super(null,null);
		this.useMouse = false;

		const appCanvas = this.divFrame;

		//this.draw = _draw;
		//this.mouse = _mouse;
	
		var rect = appCanvas.getBoundingClientRect();
		//appCanvas.style.width = rect.right-rect.left;//window.innerWidth;
		//appCanvas.style.height = rect.bottom-rect.top;//window.innerHeight;
		var appSizing;
		var usingSection;
		var appDragging;

		this.divContent.style.left = opts.image.left;
		this.divContent.style.top = opts.image.top;
		this.divContent.style.zIndex = 3;
		this.divContent.style.position = "absolute";	


		//-----------------------------------------------------------------------
		this.sx = opts.image.left;//this.leftWidth;
		this.sy = opts.image.top;//this.topWidth;
		this.setWidth( opts.width );
		this.setHeight( opts.height );
		this.setFrame( opts.image.url );
		this.divFrame.className = "graphic-frame-container";

		//GraphicFrame.frames.push( this );
		this.canvas.style.width = this.canvas.width = opts.width;
		this.canvas.style.height = this.canvas.height = opts.height;
		this.canvas.style.position = "relative";
		
		this.ctx = this.canvas.getContext( "2d" );
		this.divFrame.style.position = "relative"
		//this.
		appCanvas.appendChild( this.canvas );
		//this.divContent.remove();
		//this.frame.canvas.appendChild( this.divContent );
		
		//this.frame.ctx.font = defaultFont1;
		//frame.ctx.fillRect( 0,0,100,100 );
		//appCtx.fillRect( 0,0,100,100 );



		appCanvas.addEventListener( "mousemove", mouseMove );
		appCanvas.addEventListener( "mouseup", mouseUp );
		appCanvas.addEventListener( "mousedown", mouseDown );
		document.body.addEventListener( "mousemove", mouseMove );
		document.body.addEventListener( "mouseup", mouseUp );
		document.body.addEventListener( "mousedown", mouseDown );


		var prior_buttons;
		const _MK_LBUTTON = 1;
		const _MK_RBUTTON = 2;
		const _MK_MBUTTON = 4;
		var zz = 0;
		const this_ = this;
		function mouse( x,y,b ) {
			const rect = appCanvas.getBoundingClientRect();
			const w = rect.right-rect.left;//window.innerWidth;
			const h = rect.bottom-rect.top;//window.innerHeight;
			const cx = (((x-rect.left)));
			const cy = (((y-rect.top)));
			const px = (((x-rect.left)-(w/2.0))) * 2;
			const py = (((rect.bottom-y)-(h/2.0))) * 2;
			

			//console.log( "mouse:",cx, cy, b );
			var wasMouse;
			var onFrame;
			if( appDragging ) {
				var m = appDragging.getMouse( cx, cy );
				//console.log( "Drag:", m );
				this_.divFrame.style.left = (appDragging.x += m.x - appDragging.startX);
				this_.divFrame.style.top = (appDragging.y += m.y - appDragging.startY);
			}

			if( ( onFrame = appSizing && ( ( wasMouse = appSizing.getMouse( cx, cy ) ), wasMouse.section = usingSection, appSizing ) ) 
			|| ( onFrame = (wasMouse = this_.isMouse( cx, cy ) )&&this_) ) {
				//console.log( "frameMouse:", wasMouse, x,y, b, prior_buttons );
				switch( wasMouse.section ) {
				default: 
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appDragging = onFrame;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					}
					else if( !( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						appDragging = null;
					}
					//console.log( "Section not found:", wasMouse.section );
					break;
				case 1:
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = onFrame;
						usingSection = wasMouse.section;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					} else if( appSizing && !( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						// last left.
						appSizing = null;
					} else if( appSizing && ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
							onFrame.setWidth( onFrame.w - ( wasMouse.x - onFrame.startX ) );
							onFrame.divFrame.style.left = (onFrame.x += wasMouse.x - onFrame.startX);
					}
					break;
				case 2: // right side, center
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = onFrame;
						usingSection = wasMouse.section;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					} else if( appSizing && !( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						appSizing = null;
					} else if( appSizing && ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						onFrame.setWidth( onFrame.w + ( wasMouse.x - onFrame.startX ) );
						onFrame.startX = wasMouse.x;
					}
					break;
				case 4:
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = onFrame;
						usingSection = wasMouse.section;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					} else if( appSizing && !( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						// last left.
						appSizing = null;
					} else if( appSizing && ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						onFrame.setHeight( onFrame.h - (wasMouse.y - onFrame.startY) );
						onFrame.divFrame.style.top = (onFrame.y += wasMouse.y - onFrame.startY);
					} else if( appDragging && !( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						appDragging = null;
					}
					break;
				case 8:
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = onFrame;
						usingSection = wasMouse.section;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					} else if( appSizing && !( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						// last left.
						appSizing = null;
					} else if( appSizing && ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						onFrame.setHeight( onFrame.h + (wasMouse.y - onFrame.startY) );
						onFrame.startY = wasMouse.y;
					}
					break;
				case 1+4: // top left
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = onFrame;
						usingSection = wasMouse.section;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					} else if( appSizing && !( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = null;
					} else if( appSizing && ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						// last left.
						onFrame.setWidth( onFrame.w - ( wasMouse.x - onFrame.startX ) );
						onFrame.setHeight( onFrame.h - (wasMouse.y - onFrame.startY ) );
						onFrame.divFrame.style.left = (onFrame.x += wasMouse.x - onFrame.startX);
						onFrame.divFrame.style.top = (onFrame.y += wasMouse.y - onFrame.startY);
					}
					break;
				case 2 + 4: // right side, upper corner
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = onFrame;
						usingSection = wasMouse.section;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					} else if( appSizing && !( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						appSizing = null;
					} else if( appSizing && ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						onFrame.setWidth( onFrame.w + ( wasMouse.x - onFrame.startX ) );
						onFrame.startX = wasMouse.x;

						onFrame.setHeight( onFrame.h - ( wasMouse.y - onFrame.startY ) );
						onFrame.divFrame.style.top = (onFrame.y += wasMouse.y - onFrame.startY);
					}
					break;

				case 1+8: // top left
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = onFrame;
						usingSection = wasMouse.section;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					} else if( appSizing && !( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = null;
					} else if( appSizing && ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						// last left.
						onFrame.setWidth( onFrame.w - ( wasMouse.x - onFrame.startX ) );
						onFrame.setHeight( onFrame.h + wasMouse.y - onFrame.startY );
						onFrame.divFrame.style.left = (onFrame.x += wasMouse.x - onFrame.startX);
						onFrame.startY = wasMouse.y;
					}
					break;
				case 2 + 8: // right side, upper corner
					if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
						appSizing = onFrame;
						usingSection = wasMouse.section;
						onFrame.startX = wasMouse.x;
						onFrame.startY = wasMouse.y;
					} else if( appSizing && !( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						appSizing = null;
					} else if( appSizing && ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
						onFrame.setWidth( onFrame.w + ( wasMouse.x - onFrame.startX ) );
						onFrame.startX = wasMouse.x;
						onFrame.setHeight( onFrame.h + (wasMouse.y - onFrame.startY) );
						onFrame.startY = wasMouse.y;
					}
					break;
				}
			}

			if( !appSizing && !appDragging ) {
					document.body.removeEventListener( "mousemove", mouseMove );
			}

			if( wasMouse && !wasMouse.section && onFrame ) {
				//onFrame.mouse(
			}

			{ // LEFT BTUTTON
				if( ( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
					document.body.addEventListener( "mousemove", mouseMove );

					// start left.
				}
				else if( ( b & _MK_LBUTTON ) && (prior_buttons & _MK_LBUTTON ) ) {
					// drag left.
				}
				else if( !( b & _MK_LBUTTON ) && !(prior_buttons & _MK_LBUTTON ) ) {
					// last left.
				}

			}

			prior_buttons = b;
		}

		var _buttons = 0;
		function mouseMove( evt ) {
			console.log( "Event at:", evt.target );
			evt.preventDefault();
			mouse( evt.clientX, evt.clientY, _buttons );
		}
		function mouseUp( evt ) {
			evt.preventDefault();
			_buttons = evt.buttons;
			mouse( evt.clientX, evt.clientY, _buttons );
		}
		function mouseDown( evt ) {
			evt.preventDefault();
			_buttons = evt.buttons;
			mouse( evt.clientX, evt.clientY, _buttons );
		}




	}

	drawFrame() {
		const frameFrame = this.frameFrame;
		if( !frameFrame )  return;
		const frame = this;
		var src = frameFrame;
		var ctx = frame.ctx;
		const {leftWidth,topWidth,rightWidth,bottomWidth} = this;

		//------------ corners ------------------

		ctx.drawImage(frameFrame, 0, 0, leftWidth, topWidth, 0, 0, leftWidth, topWidth );
		
		ctx.drawImage(frameFrame, frameFrame.width-rightWidth, 0, leftWidth, topWidth, frame.canvas.width-rightWidth, 0, leftWidth, topWidth );

		ctx.drawImage(frameFrame, 0, src.height-bottomWidth, leftWidth, topWidth, 0, frame.canvas.height - bottomWidth, leftWidth, bottomWidth );

		ctx.drawImage(frameFrame, frameFrame.width-rightWidth, src.height-bottomWidth, rightWidth, bottomWidth
			, frame.canvas.width-rightWidth, frame.canvas.height - bottomWidth, rightWidth, bottomWidth );

		// top-bottom
		ctx.drawImage(frameFrame, leftWidth, 0
			, src.width-(leftWidth+rightWidth), topWidth
			, leftWidth, 0, frame.canvas.width-(leftWidth+rightWidth), topWidth );

		ctx.drawImage(frameFrame, leftWidth, src.height-bottomWidth
			, src.width-(leftWidth+rightWidth), bottomWidth
			, leftWidth, frame.canvas.height-bottomWidth
			, frame.canvas.width-(leftWidth+rightWidth), bottomWidth );

		// left-right
		ctx.drawImage(frameFrame, 0, topWidth
			, leftWidth, src.height-(topWidth+bottomWidth)
			, 0, topWidth
			, leftWidth, frame.canvas.height-(topWidth+bottomWidth) );

		ctx.drawImage(frameFrame, src.width - rightWidth, topWidth
			, rightWidth, src.height-(topWidth+bottomWidth)
			, frame.canvas.width - rightWidth, topWidth
			, rightWidth, frame.canvas.height-(topWidth+bottomWidth) );

		ctx.drawImage(frameFrame
			, leftWidth, topWidth, src.width-(leftWidth+rightWidth), src.height-(topWidth+bottomWidth)
			, leftWidth, topWidth, frame.canvas.width-(leftWidth+rightWidth), frame.canvas.height-(topWidth+bottomWidth) );


		//renderLabel(ctx, "LABEL", 50, 75 );
		
		//outCtx.drawImage( frame.canvas, frame.x, frame.y );//, frame.width, frame.height, frame.w, frame.h, frame.width, frame.height );
	
		if( this.draw )
			this.draw();
//		appCtx.drawImage( frameFrame, 0, 0 );
	}

	setFrame( image ) {
		var img = document.createElement( "IMG" );
		img.src=image;
		const this_ = this;
		img.onload = function() {
			this_.frameFrame = img;
			console.log( "have image loaded?" );
			this_.drawFrame();
		}
	}
	setWidth( w ) {
		this.divFrame.style.width = this.w = w;
		this.sw = this.w - (this.leftWidth+this.rightWidth);
		const cs = window.getComputedStyle( this.divContent, null );

		const p = parseInt(cs.padding, 10);
		const m = parseInt(cs.margin, 10);
		this.divContent.style.width = ( this.canvas.style.width = this.canvas.width = this.w ) - (this.leftWidth+this.rightWidth+ 2*(p+m));
		
		this.drawFrame();
	}
	setHeight( h ) {
		this.divFrame.style.height = this.h = h;
		this.sh = this.h - (this.topWidth+this.bottomWidth);
		this.divContent.style.height = (this.canvas.style.height = this.canvas.height = this.h)  - (this.topWidth+this.bottomWidth+ 16+10);
		this.drawFrame();
	}
	setDraw( cb ) { draw = cb }
	getMouse( x, y ) {
		var sx, sy, tx, ty, farx = false, fary = false;
		const {leftWidth,topWidth,rightWidth,bottomWidth} = this;
	
		ty=y;
		if( (tx=x) > leftWidth && (ty) > topWidth ) {
			sx=tx-leftWidth;
			sy=ty-topWidth;
			if( (true,tx) < ( this.w - (leftWidth+rightWidth) )  && (true,ty) < ( this.h - (topWidth+bottomWidth) ) ) {
				return { frame:false, x:tx, y:ty };
			}
		}
		var section = 0;
		if( tx < leftWidth )
			section += 1;
		else if( tx > this.w - leftWidth )
			section += 2;

		if( ty < topWidth )
			section += 4;
		else if( ty > this.h - topWidth )
			section += 8;

		return { frame:true, section:section, x:tx, y:ty };
	}
	isMouse( x, y ) {
		var sx, sy, tx, ty, farx = false, fary = false;
		const {leftWidth,topWidth,rightWidth,bottomWidth} = this;
		

		if( x > 0 && y > 0 && x < (0+this.w) && y < (this.h) ) {
			ty=y;
			if( (tx=x) > leftWidth && (ty) > topWidth ) {
				sx=tx-leftWidth;
				sy=ty-topWidth;
				if( (true,tx) < ( this.w - (leftWidth+rightWidth) )  && (true,ty) < ( this.h - (topWidth+bottomWidth) ) ) {
					return { frame:false, x:tx, y:ty };
				}
			}
			var section = 0;
			if( tx < leftWidth )
				section += 1;
			else if( tx > this.w - leftWidth )
				section += 2;

			if( ty < topWidth )
				section += 4;
			else if( ty > this.h - topWidth )
				section += 8;

			return { frame:true, section:section, x:tx, y:ty };
		}
		return null;
	}


}



/*
 //-------------------------------------------------------------

function makeApp() {
	var widgets = makeFrame( 200, 500 );
	var tools = makeFrame( 800, 600 );
	tools.x = widgets.w;
	widgets.setFrame( "WindowFrame-LightWoodFilled.png" );

	tools.setFrame( "WindowFrame-LightWoodFilled.png" );

	makeNameTray();
}

*/


//-----------------------------------------------------------------

export class AlertForm extends Popup {
	MsgDiv = document.createElement( "div" );
	catcher = document.createElement("div" );

	constructor(parent, opts) {
		const suffix = (opts?.suffix?opts?.suffix:"") + "-alert";
		const catcher = document.createElement("div" );
		catcher.classList.add(  "alert-catcher");
		const placer = document.createElement("div" );
		placer.classList.add( "frameContainer" + suffix, "alert-form" );
		const content = document.createElement("div" );
		content.classList.add( "frameContent" + suffix,"alert-content" );
		catcher.appendChild(placer);
		placer.appendChild(content);
		super( null, parent, { from: placer, suffix} );
		const this_ = this;		
		this.MsgDiv.className = "alert-message";

		this.MsgDiv.setAttribute( "tabIndex", 0 )
		content.appendChild( this.MsgDiv );
		this.catcher = catcher;

		this.MsgDiv.className += " alert-content";
		content.appendChild( this.MsgDiv );
		if( !opts || !opts.noClick ) {
			this.divFrame.addEventListener( "click", ()=>{
				this_.hide();
			})
			this.catcher.addEventListener( "click", ()=>{
				this_.hide();
			})
		}
		if( opts && opts.onClick ) {
			this.divFrame.addEventListener( "click", ()=>{
				opts.onClick();
			})
			this.catcher.addEventListener( "click", ()=>{
				opts.onClick();
			})
		}
		(parent || document.body).appendChild( this.catcher );
	}
	remove() {
		super.remove();
		this.catcher.remove();
	}
	show(caption) {
		if( "string" === typeof caption  ) this.caption = caption;
		this.catcher.style.display = "";
		this.raise();
		super.show();
		this.divFrame.focus();
		this.center();
	}
	hide() {	   
		this.catcher.style.display = "none";
		this.divFrame.style.display = "none";
		this.on( "close", this );
	}
	set caption( val ) {
		// super sets caption to (well null in this case)
		if( this.MsgDiv )
			this.MsgDiv.innerHTML = val;
	}

}

var alertForm = null;//initAlertForm();
//alertForm.hide();

function Alert(msg) {
	if( !alertForm ) alertForm = new AlertForm();
	alertForm.caption = msg;
	
	alertForm.show();
	return alertForm;
}

class SashPicker extends Popup{
	choices = [];
	sashModule = null;
	promise = null;
	constructor( opts ) {
		super( "Please select login role", null, {enableClose: false } );
		const form = opts?.useSashForm || "pickSashForm.html";
		import( opts?.sashScript || "pickSashForm.js" ).then( (sashModule)=>{
			this.sashModule = sashModule;
			sashModule.setForm( pickSashForm );
		} ).catch( (err)=>{
			console.log( "Sash form resulted with an error?" );
		} );

		this.hide();

		fillFromURL( this, form ).then( (root)=>{
			this.center();
			this.on( "load", this );
		} ).catch( (err)=>{
			if( this.promise ) this.promise.rej( "Choice selection form failed to load." );
			
		} );
		this.on( "ok", ()=>{
			if( this.sashModule ) {
				const choice = this.sashModule.getChoice();
				if( this.promise ) this.promise.res( choice );
			}else
				if( this.promise ) this.promise.res( choices[0] );				
			this.hide();
		} );
		this.on( "cancel", ()=>{
			if( this.promise ) this.promise.rej( "Choice canceled by user." );
			this.hide();
		} );

	}
	
	show( choices ) {
		this.reset();
		this.choices = choices;
		if( this.sashModule )
			for( let choice of choices ) {
				this.sashModule.addChoice( choice );
			}
		super.show();
	}
}


// login form as a class would be a better implementation.
function makeLoginForm( doLogin, opts  ) {
	var loginForm = createPopup( "Connecting", opts?.parent, {enableClose:false} );
	var pickSashForm = null;

	let createMode =false;
	let isGuestLogin = false;
	const form = opts?.useForm || "loginForm.html";
	
	let wsClient = opts?.wsLoginClient;

	
	loginForm.connect = function() {
		loginForm.caption = "Login Ready...";
	}

	loginForm.disconnect = function() {
		loginForm.caption = "Connecting...";
		loginForm.show();
	}
	loginForm.login = function( a ) {     	
		if( doLogin ) doLogin( a );
	};

	loginForm.pickSash = function(choices) {
		const p = { p:null, res:null, rej:null };
		p.p = new Promise( (res,rej)=>{p.res =res;p.rej=rej} );
		if( !pickSashform ) {
			pickSashForm = new SashPicker( opts );
			pickSashForm.on( "load", (form)=>{
				fillChoices();
			} );
		} else {
			fillChoices();
		}

		function fillChoices() {		
			pickSashForm.show( choices, p )
		}
		return p.p;
	};
	loginForm.Alert = Alert;
	loginForm.setClient = function(wsClient_) {
		wsClient = wsClient_;
		// on reconnect, bind controls re-binds...
		
	};
	loginForm.hide();

	fillFromURL( loginForm, form ).then( async (root)=>{
		if( wsClient ) {
			// really this point the URL has been set in innerHTML, and scripts have been pushed to the page.
			//console.log( "At this point, the form should be entirely This is only once the top level has loaded (still pending children)" );
			//wsClient.ws.clearUiLoader();
			

			wsClient.bindControls( loginForm, root );
		}

		loginForm.center();
		if( opts.ready ) opts.ready(root);
	} );

	if( !wsClient ){
		loginForm.show();
	}


	return loginForm;
}


function makeWindowManager() {
	const taskButton = document.createElement( "div" );
	taskButton.className = "taskManagerFloater";
	document.body.appendChild( taskButton );
	const taskPanel = document.createElement( "div" );
	const taskWindow = new Popup( null, null, { from:taskPanel} );
	taskWindow.className = "taskManagerPanel";
	taskWindow.hide();


	addCaptionHandler( taskButton, null );
	taskButton.addEventListener( "click", (evt)=>{
    		evt.preventDefault();
		// if was not dragging?
		//alert( "CLICK!" );
	} );
	//addDragEvent( taskButton ); // add support for click-drag like caption handler....

	return {
	    close() {
		console.log( "this should remove this whole construct from the page" );
	    }
	}
}

const filledControls = new Map();

function makeURL( url ) {
	try {
		const base = new URL( url )
		return base;
	}catch( err ) {
		const base = new URL( url, location );
		return base;
	}
	
}

function fillFromURL(popup, url, opts) {
	opts = opts || {};
	const control = (((popup instanceof Popup)&&(popup.divContent||popup.divFrame))||popup);
	const shadow = control.attachShadow( {mode:"open"});
	if( popup instanceof Popup ) {
		popup.divContentParent_ = popup.divContent_;
		popup.divContent_ = shadow;
	}
	const base = new URL( url, location.href );
	const pathIndex = base.pathname.lastIndexOf( "/" );
	base.pathname = base.pathname.substring( 0, pathIndex );
	const here = new URL( location );
	const herePathIndex = here.pathname.lastIndexOf( "/" );
	here.pathname = here.pathname.substring( 0, herePathIndex+1 );
	const hereHref = here.href;
	
	//console.log( "Base:", base );

	//control.appendChild( shadow );
	return fetch(url).then(response => {
		return response.text().then( (text)=>{
			if( opts.origin ) {
				let n = 0;
				while( n < text.length ) {
					const k = text.indexOf( "from \"", n );
					const j = text.indexOf( "href=", n );
					const i = text.indexOf( "src=", n );
					if( i < 0 && j < 0 && k < 0 ) break;
					if( (i < 0 && j < 0) || (k >= 0 && ( i < 0 || k < i ) && ( j < 0 || k < j ) ) ) 
						n = k+6;
					else if( i < 0 || (j >= 0 && j < i) ) 
						n = j+6;
					else
						n = i+5;
					if( text[n] !== '/' || text[n] == '.' )
						text = text.substring( 0, n ) + opts.origin + text.substring( n );
				}
			}
			shadow.innerHTML = text;
			if( !opts.noDefaultStyle ){
				utils.preAddPopupStyles( shadow );
			}
			nodeScriptReplace(shadow);
			return shadow;
		} );
	})

	function nodeScriptReplace(node) {
		if( node.tagName === "LINK" ){
			if( node.href.includes( base.href ) )
			{

				const url = new URL( node.href.substring( base.length ), base.href );
				node.href = url.href;
			}
		}
		else if ( nodeScriptIs(node) === true ) {
			node.parentNode.replaceChild( nodeScriptClone(node) , node );
		}
		else {
			var i = -1, children = node.childNodes;
			while ( ++i < children.length ) {
			      nodeScriptReplace( children[i] );
			}
		}

		return node;
	}
	function nodeScriptClone(node){
		var script  = document.createElement("script");
		script.text = node.innerHTML;

		var i = -1, attrs = node.attributes, attr;
		while ( ++i < attrs.length ) {
				script.setAttribute( (attr = attrs[i]).name, attr.value );
		}
		/*
		if( script.src ) {
			const protoPath=script.src.split( "://" );
			const path = protoPath[1].split('/' );
		}
		*/
		script.id = "Unique"+(unique++);
		filledControls.set( script.id, shadow );
		if( script.textContent && script.textContent.length ) {
			script.textContent = "const rootId='"+script.id+"';" +script.textContent;
		}
		return script;
	}

	function nodeScriptIs(node) {
		return node.tagName === 'SCRIPT';
	}

}


class DataGridCell {
	
	#cell = null;
	#row = null;
	// callback to clear new event and set data.
	clearNewRow = null;
	el = null;  // element associated with this cell

	constructor( row, cell ) {
		this.#cell = cell,
		this.#row = row;
		this.canEdit = ( ("edit" in cell.type) ? cell.type.edit : true ),
		this.el=row.el.insertCell(),
		this.list = null,
		this.filled = false,
		this.options = [],

		this.el.className = row.suffix + cell.className;
	}
	get row() {
		return this.#row;
	}
	set row(val) {
		this.#row = val;	
	}
	get cell() {
		return this.#cell;
	}

	refresh() {
		const rowData = this.#row.rowData;
		if( !rowData ) return;
		if( this.#cell.type.grid ) {
			return this.list.refresh();
		}
		if( this.#cell.type.hasOwnProperty( "toString" ) )
			this.el.textContent = this.#cell.type.toString( rowData );
		else if( this.#cell.type.options ) {
			const val = getInputValue( rowData, this.cell.field );
			const optidx = this.options.findIndex( op=>op.val.value === val )
			this.list.selectedIndex = optidx;

			const i = this.list.selectedIndex; 
			if( i >= 0 ) {
				if( this.options[i].val.className )
					this.list.className = this.options[i].val.className;
			}

//				this.list.className = this.list.selected#cell.type.className;
		} else if( this.#cell.type.money )
			this.el.textContent = popups.utils.to$( getInputValue( rowData, this.#cell.field ) );
		else if( this.#cell.type.percent )
			this.el.textContent = popups.utils.toP( getInputValue( rowData, this.#cell.field ) );
		else 
			this.el.textContent = getInputValue( rowData, this.#cell.field );
	}

}

class DataGridTableCell extends DataGridCell {
}


class DataGridTextCell extends DataGridCell {
}

class DataGridCheckCell extends DataGridCell {
}

class DataGridChoiceCell extends DataGridCell {
}

class DataGridRow {

	rowData = null;
	el = null;   // table row element
	addUpdates=null;
	cells=[];
	#dataGrid = null;
	initialValues = null;
	newInput= {
		// update
	};

	constructor( grid, threshold, newRow, initialValues ) {
		this.#dataGrid = grid;
		this.el = newRow;
		this.rowData = threshold;
		this.initialValues = initialValues;

	}
	get grid() {
		return this.#dataGrid
	}
	get suffix() {
		return this.#dataGrid.suffix;
	}

	remove() {
		this.el.remove();
		//this.#dataGrid.deleteRow( this );
	}

	refresh() {
		// update this row....
		this.cells.forEach( cell=>{
			if( !cell.canEdit )
				cell.refresh();
		} );
	
	}
}

function setValue( dgr, rowData, pathName, val, type ){
	if( type )
		if( type.money ) {
			val = popups.utils.toD( val );
		} else if( type.percent ) {
			val = popups.utils.fromP( val );
		} else if( type.number ) {
			val = Number( val );
		} 

	if( dgr && type.toValue ) // data grid ...
		type.toValue(dgr, rowData, val);
	else {
		const path = ("string"===typeof pathName)?pathName.split('.' ):pathName;
		let obj = rowData;
		let p = 0;
		while( p < path.length-1 ) {
			if( !(path[p] in obj)){
				obj[path[p]] = {};
			}
			obj = obj[path[p]];
			p++;
		}
		obj[path[p]]=val;
	}
}

function getInputValue( rowData, pathName ) {
	const path = ("string"===typeof pathName)?pathName.split('.' ):pathName;
	if( !path ) return undefined; // probably a button
	//const path = pathName.split('.' );
	let obj = rowData;
	let p = 0;
	while( p < path.length-1 ) {
		if( !obj )  return null;
		obj = obj[path[p]];
		p++;
	}
	if( !obj )  return null;
	const val = obj[path[p]];
	if( val === undefined ) return "";
	return val;
}


function convertValue( value, type ) {
	return value;
}

class DataGrid extends Events {

	#initialValue = undefined;
	#initialValues = undefined;
	#suffix = '';
	#obj = null;
	#field = null;
	#table = null;
	#tableContainer = null;
	#header = null;
	#opts = null;
	#cells = [];
	#rows = [];
	#newRowIndex = 0;
	#subFields = null;
	#newRowCallback= (()=>({}));
	#sort = {prior:null};

	get el() {
		return this.#tableContainer;
	}
	get control() { return this.#table; }
	get span() { return null; }
	get rows() {
		return this.#rows;
	}
	set tooltip(val) {
		const tooltip = document.createElement( "span" );
		tooltip.className = "tooltip-text";
		tooltip.textContent = val;
		this.#tableContainer.appendChild( tooltip );
		this.#tableContainer.classList.add( "has-tooltip");
	}

	constructor( form, o, field, opts ) 
	{
		super();
		let in_form = form;
		let in_popup = null;
		while( in_form && !(( in_popup = popupMap.get(in_form)) instanceof Popup ) ) in_form = in_form.parentNode;

		this.#field= field;
		this.#opts = opts || {};
		this.#subFields = (opts?.columns) || [];
		this.#obj = o;
		const cancel = opts?.onCancel;
		
		//this.#initialValue = o[field];
		// keep a copy of the original array with original member addresses...
		this.#initialValue = getInputValue( o, field ).map(o=>o);

		// keep the original valuess... with a shallow deep copy  (deep shallow?)
		this.#initialValues = getInputValue( o,field ).map(o=>{
			const obj = {};
			this.#subFields.forEach( col=>{
				if( col.field )
					setValue( null, obj, col.field, getInputValue(o,col.field), {} )
			} );
			return obj;
		});
		
		
		this.#suffix = (opts?.suffix||'');
		
		if( opts?.onNewRow ) this.#newRowCallback = opts.onNewRow;
		
		
		if( in_popup instanceof Popup ) {
			in_popup.on( "apply", function() {
			} )

			in_popup.on( "show", ()=>{
			})

			in_popup.on( "close", ()=>{
			// aborted...
				cancel && cancel();
			});
			in_popup.on( "cancel", ()=>{
			// aborted...
				cancel && cancel();
			});
		}
		
		this.#tableContainer = document.createElement( "div" );
		this.#tableContainer.className = "data-grid-container"+this.#suffix;
	
		this.#table = document.createElement( "table" );
		this.#table.className = "data-grid-table"+ this.#suffix;
		
		this.#header = this.#table.insertRow();
		this.#header.className = "data-grid-header-row"+ this.#suffix;

		form.appendChild( this.#tableContainer );
		this.#tableContainer.appendChild( this.#table );
		
		this.#subFields.forEach( col=>{
			if( col.type.grid ) col.type.noSort = true;
			this.addColumn( col.name, col.field, col.className, col.type );
		} );

		this.fill();
	}

	get suffix() {
		return this.#suffix;
	}

	reinit() {
		const o = this.#obj;
		const field = this.#field;
		//this.#initialValue = o[field];
		// keep a copy of the original array with original member addresses...
		this.#initialValue = getInputValue( o,field).map(o=>o);
		// keep the original valuess... with a shallow deep copy  (deep shallow?)
		this.#initialValues = getInputValue( o,field).map(o=>{
			const obj = {};
			this.#subFields.forEach( col=>{
				if( col.field ) 
					setValue( null, obj,col.field, getInputValue(o,col.field), col.type ) 
			} );
			return obj;
		});
		this.fill();
	}

	reset( row ) {
		// this copies internal initial values to current object
		const data = this.#obj[this.#field]; data.length = 0;
		for( let v of this.#initialValue ) data.push(v);
		for( let v=0; v < this.#initialValues.length; v++  ) {
			const o = data[v];
			if( row && o !== row ) continue;
			const val = this.#initialValues[v];
			this.#subFields.forEach( (field,idx)=>{
				o[field.field] = val[field.field];
				if( row ) {
					const cell = this.#rows[v].cells[idx];
					cell.refresh();
				}
			} );
		}
		// fill removes all old data before including new data.
		if( !row )
			this.fill();
	}

	refresh() {
		const rows = getInputValue( this.#obj, this.#field );
		for( let v=0; v < rows.length; v++  ) {
			const row = rows[v];
			const dataRow = this.#rows[v];
			dataRow.cells.forEach( cell=>{
				if( !cell.canEdit )
					cell.refresh();
			} );
		}

	}

	commit( row ) {
		for( let v=0; v < this.#rows.length; v++  ) {
			const dataRow = this.#rows[v];
			if( dataRow.rowData === row) {
				const iv = this.#initialValues[v];
				dataRow.cells.forEach( cell=>{
					if( cell.field )
						setValue( null, iv, col.field,  getInputValue( row, cell.field ) );
				} );
				//dataRow.cells.forEach();
			}
		}
	}
	empty() {
		for( let row of this.#rows ) 
			row.el.remove();
		this.#rows.length = 0;
		this.#newRowIndex = 0;  // -1 is header... and is a thing actually

	}
	fill() {
		// empty existing table.
		this.empty();
		
		this.#initialValue.forEach( (row,idx)=>{
			this.addRow( row, this.#initialValues[idx] );
		} );
		/// plus one blank row to create a new entry.
		if( !("edit" in this.#opts) || this.#opts.edit )
			this.addRow( null, null );

	}

	addColumn( name, subField, className, type ) {
		const cell = this.#header.insertCell();
		const cellText = document.createElement( 'span' );
		const sortText = ( !this.#opts.noSort && !type.noSort ) ?document.createElement( 'span' ):null;
		cell.appendChild( cellText );
		if( sortText )
			cell.appendChild( sortText );
		
		cellText.textContent = name;
		cellText.className = "data-grid-header-text" + this.#suffix;
		if( sortText ) {
			sortText.textContent = "";//"Threshold Value";
			sortText.className = "data-grid-header-sort" + this.#suffix;
			sortText.textContent = '▬';
		//sortText.style.float="right";
		}


		const cellDef = {el:cell, cellText,sortText, sort:false, idx:this.#cells.length, name:name, field:subField, className, type } ;
		const this_ = this;

		if( this.#cells.length ) {
			if( sortText )
				sortText.style.visibility= "hidden";
		} else
			this.#sort.prior = cellDef;

		this.#cells.push( cellDef );
		
		if( sortText )
			onClick( cellDef );

		function onClick( header ) {
			header.el.addEventListener( "click", click );
			function click( evt ) {
				//console.log( "Cell clicked?", header.el );
				if( this_.#sort.prior.sortText ){
					if( this_.#sort.prior ) {
						if( this_.#sort.prior === cellDef ) {
							this_.#sort.prior.sort = !this_.#sort.prior.sort;
							if( this_.#sort.prior.sort )
								this_.#sort.prior.sortText.textContent = '▼';
							else
								this_.#sort.prior.sortText.textContent = '▲';
						} else {
							this_.#sort.prior.sortText.textContent = '▼';
							this_.#sort.prior.sortText.style.visibility= "hidden";
							this_.#sort.prior = cellDef;
							cellDef.sort = true;
							this_.#sort.prior.sortText.textContent = '▼';
						}
						
					} else {
						this_.#sort.prior = cellDef;
						cellDef.sort = true;
						this_.#sort.prior.sortText.textContent = '▼';
					}
					this_.#sort.prior.sortText.style.visibility = '';
				}
				if( header.type.grid ) {
					// should have been marked nosort anyway?
				}else if( header.type.options ) {
					this_.#rows.sort( (a,b)=>{
						if( !a.rowData ) return 1;
						if( !b.rowData ) return -1;
						const opts = header.type.options;
						const aval = getInputValue( a.rowData, a.cells[header.idx].cell.field);
						const bval = getInputValue( b.rowData, b.cells[header.idx].cell.field);
						const aopt = opts.find( opt=>opt.value == aval ).name
						const bopt = opts.find( opt=>opt.value == bval ).name
						if( aopt > bopt )
							return cellDef.sort?1:-1;
						if(  aopt < bopt )
							return cellDef.sort?-1:1;
						return 0;
					} )
					for( let row of this_.#rows )
						row.el.remove();
					for( let row of this_.#rows )
						this_.#table.appendChild( row.el )
					
				}else {
					//sortText.textContent = "▼";//"Threshold Value";

					this_.#rows.sort( (a,b)=>{
						if( !a.rowData ) return 1;
						if( !b.rowData ) return -1;
						if( a.cells[header.idx].el.textContent > b.cells[header.idx].el.textContent )
							return cellDef.sort?1:-1;
						if( a.cells[header.idx].el.textContent < b.cells[header.idx].el.textContent )
							return cellDef.sort?-1:1;
						return 0;
					} )
					for( let row of this_.#rows )
						row.el.remove();
					for( let row of this_.#rows )
						this_.#table.appendChild( row.el )
				}
			}
		}


	}

	swapRows( row1, row2 ) {
		// somehow swap..
		let r1 = -1;
		let r2 = 0;
		let r = 0;
		for( ; r1 < 0 && r2 < 0 && r < this.#rows.length; r++ ){
			const chk = this.#rows[r];
			if( chk === row1 ) { r1 = r; continue; }
			if( chk === row2 ) { r2 = r; continue; }
		}
		const save = this.#rows[r1];
		this.#rows[r1] = this.#rows[r2];
		this.#rows[r2] = save;
		const p1 = this.#rows[r1].el.priorSibling;
		const p2 = this.#rows[r2].el.priorSibling;
		this.#rows[r1].remove();
		this.#rows[r2].before( this.#rows[r1].el);
		this.#rows[r2].remove();
		if( !p1 )
			this.#rows[r1].parentNode.prepend( this.#rows[r2].el );
		else
			p1.after( this.#rows[r2] );
	}

	moveRowUp( row ) {
		let prior = null;
		let after = null;
		let r = 0;
		for( ; r < this.#rows.length; r++ ){
			const chk = this.#rows[r];
			if( after ) {
				after = chk;
				break;
			}
			if( chk.rowData === row ) {
				after = chk;
				continue;
			}
			prior = chk;
		}
		// r is on after now...
		r--; // set r to current row index
		if( r ) {
			const save = this.#rows[r];
			this.#rows[r] = this.#rows[r-1];
			this.#rows[r-1] = save;
			const saveData = this.#obj[this.#field][r];
			this.#obj[this.#field][r] = this.#obj[this.#field][r-1];
			this.#obj[this.#field][r-1] = saveData
			save.el.remove(); // detach
			prior.el.before( save.el ); // put back in before the previous
		} else {
			//already first
		}
	}

	moveRowDown( row ) {
		let prior = null;
		let after = null;
		let r = 0;
		for( ; r < this.#rows.length; r++ ){
			const chk = this.#rows[r];
			if( after ) {
				after = chk;
				break;
			}
			if( chk.rowData === row ) {
				after = chk;
				continue;
			}
			prior = chk;
		}
		if( after ) {
			// r is on after now...
			if( r === this.#newRowIndex ) return;
			r--; // set r to current row index
			const save = this.#rows[r];
			this.#rows[r] = this.#rows[r+1];
			this.#rows[r+1] = save;
			const saveData = this.#obj[this.#field][r];
			this.#obj[this.#field][r] = this.#obj[this.#field][r+1];
			this.#obj[this.#field][r+1] = saveData
			save.el.remove();
			after.el.after( save.el );
		} else {
			//already last
		}

	}

	addRow(newRow, initialValue) {
		/**
		 * 
		 */

		function setCaret(el,cell,ofs) {
			if( cell.cell.type?.options ) {
				//const select = cell.list.selectedIndex;
				cell.list.selectedIndex = 0;
			} else {

				el.classList.add( "editing" );
				function isTextNodeAndContentNoEmpty(node) {
					return ((node.nodeType == Node.ELEMENT_NODE ) || ( node.nodeType == Node.TEXT_NODE ) )&& node.textContent.trim().length > 0
				}
				let range = document.createRange(),
				      sel = window.getSelection(),
				
				lastKnownIndex = -1;
				for (let i = 0; i < el.childNodes.length; i++) {
				    if (isTextNodeAndContentNoEmpty(el.childNodes[i])) {
				      lastKnownIndex = i;
				    }
				  }
				  if (lastKnownIndex === -1) {
					// is just this cell...
				    //throw new Error('Could not find valid text content');
				  }else {
				  let row = el.childNodes[lastKnownIndex],
				      col = row.textContent.length;
				  range.setStart(row, col+ofs);
				  range.collapse(true);
				  sel.removeAllRanges();
				  sel.addRange(range);
				  }
			}
			  //el.focus();
		}
		
		/**
		 * select all text in a cell
		 */
		function selAll(el, cell) {
			if( !cell.canEdit ) return;
			if( cell.cell?.type.options ) {
				return;
			}
			el.classList.add( "editing" );
			function isTextNodeAndContentNoEmpty(node) {
			  return node.nodeType == Node.TEXT_NODE && node.textContent.trim().length > 0
			}
		
			let range = document.createRange(),
			sel = window.getSelection(),
			lastKnownIndex = -1;
			for (let i = 0; i < el.childNodes.length; i++) {
				if (isTextNodeAndContentNoEmpty(el.childNodes[i])) {
				  lastKnownIndex = i;
				}
			}
			if (lastKnownIndex === -1) {
				//throw new Error('Could not find valid text content');
			}else {
				let row = el.childNodes[lastKnownIndex],
						col = row.textContent.length;
				range.setStart(row, 0);
				range.setEnd(row, col);
				//range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
			//el.focus();
		}
	
	
		// this is the body of addRow... 
		{
		
			const newTableRow = this.#table.insertRow(newRow?this.#newRowIndex+1:-1);

			newTableRow.className = "data-grid-row" + this.#suffix;
			const row = new DataGridRow( this, newRow, newTableRow, initialValue );
			if( newRow ) {
				this.#rows.splice( this.#newRowIndex, 0, row ); /* header row is 1 */
				this.#newRowIndex = this.#rows.length + ((this.#rows.length && !this.#rows[this.#rows.length-1].rowData )?-1:0); 
			} else {
				this.#rows.push( row );
			}
			const this_ = this;
		
			this.#cells.forEach( cell=>{
		
				const newCell = new DataGridCell( row, cell );
				
				
				//newCell.el.className = cell.className + this.#suffix;

				if( cell.type.click ) {
					newCell.canEdit = false;
					if( row.rowData ) {
						const text = cell.field
							?getInputValue( rowData,cell.field)
							:(cell.type?.text?cell.type?.text:"X");
						newCell.el = makeButton( newCell.el, text, ()=>cell.type.click( row ), {suffix:newCell.el.className + (cell.type.suffix||"") } );
					} else {
						//console.log( "No button in cell... will have to create later..." );						
							newCell.clearNewRow = (newrow)=>{
								const text = cell.field
									?getInputValue( newrow,cell.field)
									:(cell.type?.text?cell.type?.text:"X");
								newCell.el = makeButton( newCell.el, text, ()=>cell.type.click( row ), {suffix:newCell.el.className + (cell.type.suffix||"") } );
								// add update has the remove listener
							}
					}
				} else if( cell.type.hasOwnProperty( "toString" ) ) {
					newCell.canEdit = false;				
				} else if( cell.type?.options ) {
					newCell.list = document.createElement( "select" );
					newCell.el.appendChild( newCell.list );
					if( !newCell.canEdit ){
						newCell.list.disabled = true;
					}
					cell.newInput = onEdit( cell, newCell, newRow, row );
				} else if( cell.type.grid ) {
					if( newRow ) {
						newCell.list = new DataGrid( newCell.el, newRow, cell.field, {
							columns:cell.type.grid.columns,
							onNewRow(initialValue) {
								if( cell.type.grid.onNewRow )
									return cell.type.grid.onNewRow( initialValue );
								return row;
							}
						});
						newCell.list.on("newRow", (row)=>{
							cell.type.grid.newRow( row );
						})
						if( cell.type.grid.change )
							newCell.list.on("change", (row)=>{
								cell.type.grid.change( row );
							})
					}
					//newCell.el.appendChild( newCell.list );
					//cell.newInput = onEdit( cell, newCell, newRow, row );
				}else {
					newCell.el.textContent = "";//cell.;
					newCell.el.setAttribute("contenteditable",newCell.canEdit );
					cell.newInput = onEdit( cell, newCell, newRow, row );
				}
				if( cell.field )
					newCell.refresh();				
				row.cells.push( newCell );
				// on update; does the right thing for edit boxes and listboxes
				
			} )
		

			function onEdit( cell, newCell, rowData, row ) {

				const c = newCell.el;

				/**
				 * Triggers creating a new row
				 * @param {html event} evt 
				 */
				async function newInput(evt) {
					if( !newCell.options.length ) {
						// if the cell is a list
						if( newCell.list ) {
							// fill options into the list of choices.
							fillOptions( newCell );
						}else {
							newCell.clearNewRow = (newrow)=>{
								rowData = newrow;
								// add update has the remove listener
								addUpdate( cell, newCell );
								fillOptions( newCell );
							}
						}
						
						// if this is a new row that we're just starting to edit... 
						if( !rowData ) {
							const r = this_.#newRowCallback(this_.#initialValue);
							row.rowData = rowData = await r;

							//this.#initialValues = getInputValue( o,field ).map(
							const shallowClone = o=>{
								const obj = {};
								this_.#subFields.forEach( col=>{
									if( col.field )
										setValue( null, obj, col.field, getInputValue(o,col.field), {} )
								} );
								return obj;
							};
							const initialVals = shallowClone( rowData );
							this_.#initialValues.push( initialVals );
							row.initialValues = initialVals;
							this_.#obj[this_.#field].push( rowData );
							for( let col of row.cells ) {
								if( col.clearNewRow )
									col.clearNewRow( row.rowData );
								else console.log( "Do we often not have a clear new row?" );
							}
							addUpdate( cell, newCell );
							this_.addRow( null );
						}
						this_.on( "newRow", {row,rowData} )

						setCaret( evt.target, newCell, cell.type.percent?-1:0 );
						//evt.target.setSelectionRange(evt.target.textContent.length, -1);
					}
				}

				function fillOptions(newCell) {
					const cell = newCell.cell;
					
					if( !newCell.filled )  {
						if( cell.type?.options ) {
							const opts = cell.type.options;
							{
								newCell.filled = true;
								const currentValue = getInputValue( rowData, cell.field )
								opts.forEach( op=>{
									const opt = { el:document.createElement( "option" ),
										val:op };
									opt.el.className = op.className;
									opt.el.textContent = op.text || op.name;
									//opt.el.value = op.value;
									//console.log( "Adding option:", op.name, op.value );
									opt.el.addEventListener( "select", ()=>{
										setValue( row, rowData, cell.field, op.value, col.type );
										console.log( "Option selected in context is for:", op );
									} );
									newCell.list.appendChild( opt.el );
									newCell.options.push( opt );
									if( op.value === currentValue ) {
										newCell.list.selectedIndex = newCell.options.length-1;
									 }
								} );
								//rowData[cell.field] = opts[0].value;
								//if( rowData ) 
								//	newCell.list.value = ''+getInputValue( rowData, cell.field);

							}
						}
						if( newCell.list )
							newCell.list.addEventListener( "change", (evt)=>{ 
								const i = evt.target.selectedIndex; if( i >= 0 ) {
									const val = convertValue( newCell.options[i].val.value, cell.type );
									setValue( row, rowData, cell.field, val, cell.type );
									if( newCell.options[i].val.className )
										newCell.list.className = newCell.options[i].val.className;
									if( cell.type.change ){
										cell.type.change( row.rowData, row.cells );
									}
									this_.on( "change", {row, rowData} );
								}
							} );
					}
				}

				if( !rowData ) {
					newCell.clearNewRow = (newrow)=>{
						rowData = newrow;
						// add update has the remove listener
						addUpdate( cell, newCell );
						fillOptions( newCell );
					}
					c.addEventListener( "input", newInput );
					c.addEventListener( "click", newInput );
				} else {
					addUpdate( cell, newCell );
					fillOptions( newCell );
				}
				row.addUpdates = addUpdate;
		
				return  (t)=>{
						this.#subFields.forEach( (key,id)=>{

					    	//const c = this.#cells[id].cell;
					    	const upd = this.#cells[id].upd;
		
					    	// update current value.
							if( upd.money )
								c.textContent = popups.utils.to$( getInputValue( rowData,upd.field) );
							else if( upd.percent )
								c.textContent = popups.utils.toP( getInputValue( rowData,upd.field) );
							else
								c.textContent = getInputValue( rowData, upd.field );
						} );
					};

				function addUpdates( rowData ) {
					if( !row.rowData )	row.rowData = rowData;
					
					this_.#cells.forEach( (cell,idx)=>addUpdate( cell, row.cells[idx] ) );
				}

					function addUpdate( cell_header, newCell ) {
						const c = newCell.el;
						const field = cell_header.field;
						const type = cell_header.type;
						if( type.grid ){
							newCell.list = new DataGrid( newCell.el, row.rowData	
										, type.grid.field, {
									columns:type.grid.columns
								});
	
						}
						else if( newCell.list ) {
							fillOptions( newCell );
						} else {

					     	// update current value.
							if( c.canEdit && c.textContent  !== "" ) {
								setValue( row, rowData,field, c.textContent, type );								
							} 
							newCell.refresh();
							
						}
		
						c.removeEventListener( "input", newInput );
						c.removeEventListener( "click", newInput );
						
						c.addEventListener( "focus", (evt)=>{
							c.classList.add( "editing" );
							if( type.percent ) {
								selAll( evt.target, newCell );
							}else
								selAll( evt.target, newCell );
						} );
						c.addEventListener( "blur", (evt)=>{
							c.classList.remove( "editing" );
							setValue( row, rowData, field, c.textContent, type );
					    	if( type.money ) {
								c.textContent = popups.utils.to$( getInputValue( rowData,cell_header.field) );
							}
					    	else if( type.percent ) {
					    		c.textContent = popups.utils.toP( getInputValue( rowData,cell_header.field) );
							}
							else if( type.hasOwnProperty( "toString" ) ) {
								// procedural output fields do not accept input.
							} 
							if( type.change && row.initialValues[cell_header.field] !== getInputValue( rowData,cell_header.field)) {
								type.change(row.rowData, row.cells)
							}
						});
					}
				//}
			}
			return row;
		}
	}

	deleteRow( rowData ) {
		if( !this.#rows.find( (row, idx)=>{
			if( row.rowData === rowData ) {
				this.#newRowIndex--;
				console.log( "Row is to be removed from the data and grid...", row );
				this.#initialValue.splice( idx, 1 ); // remove from the data
				this.#rows.splice( idx, 1 ); // remove from the grid
				row.remove(); // remove from the display
				return true;
			}
			return false;
		} ) ) console.log( "Row doesn't exist in the grid to delete...", rowData );
	}

	remove() {
		this.#tableContainer.remove();
	}
}


/* 

Generic Paged Frame ... along the top or side are navigation controls...

*/

class PageFramePage {
	content = document.createElement( 'div' );
	handle = document.createElement( 'div' );
	pages = null;
	#frame = null;
	#page = null;
	hidden = false;
	constructor(frame ) {
		if( frame instanceof PagedFrame ) {
			this.#frame = frame;

			this.content.className = 'page-frame-page-container'+(frame.suffix?frame.suffix:'');
			this.handle.className = 'page-frame-page-handle'+(frame.suffix?frame.suffix:'');
			frame.pages.handleContainer.appendChild( this.handle );
			frame.pages.pageContainer.appendChild( this.content );
			this.handle.addEventListener( "click", (evt)=>{
				this.#frame.activate( this );
			} );
			this.content.style.display = "none";
			frame.pages.push( this );

		} else {
			this.#page = frame;

			this.content.className = 'page-frame-page-page-container'+(frame.suffix?frame.suffix:'');
			this.handle.className = 'page-frame-page-page-handle'+(frame.suffix?frame.suffix:'');

			frame.pages.handleContainer.appendChild( this.handle );
			frame.pages.pageContainer.appendChild( this.content );

			this.handle.addEventListener( "click", (evt)=>{
				if( this.#page && this.#page.pages.lastPage )
					this.#page.pages.lastPage.deactivate();
				if( this.handle.classList.contains( "pressed" ))
					this.deactivate();
				else
					this.activate();
				evt.stopPropagation();
				//this.frame.activate( this );
			} );
			this.content.style.display = "none";
			frame.pages.push( this );
		}
	}
	set tooltip(val) {
		const tooltip = document.createElement( "span" );
		tooltip.className = "tooltip-text";
		tooltip.textContent = val;
		this.handle.appendChild( tooltip );
		this.handle.classList.add( "has-tooltip");
	}
	reset() {
		if( this.pages )
			for( let page of this.pages )
				page.remove();
	}
	remove() {
		this.content.remove();
		this.handle.remove();
		if( this.#page ) {
		const id = this.#page.pages.find( page=>page===this );
		if( id >= 0 ) this.#page.pages.splice( id, 1 );
		} 
		if( this.#frame ) {
			const id = this.#frame.pages.find( page=>page===this );
			if( id >= 0 ) this.#frame.pages.splice( id, 1 );
		
		}
	}
	hide() {
		this.content.style.display = "none";
		this.handle.style.display="none";
		this.hidden = true;
	}
	show() {
		this.content.style.display = "";
		this.handle.style.display="";
		this.hidden = false;
	}
	enableDrag( type, cbData ) {
		
		this.handle.setAttribute("draggable", true);
		this.handle.addEventListener("dragstart", (evt) => {
			//if( evt.dataTransfer.getData("text/plain" ) )
			//	evt.preventDefault();
			this.handle.classList.add("drag-over");
			evt.dataTransfer.setData( "text/plain", JSON.stringify({ type: type, data:cbData() }))
		})
	}
	enableDrop(type, cbDrop ) {
			//console.log("drop type ", type );

			this.handle.addEventListener("dragover", (evt) => {
				evt.preventDefault();
				evt.dataTransfer.dropEffect = "move";
				this.handle.classList.add("drag-over");
			})
			this.handle.addEventListener("dragleave", (evt) => {
				evt.preventDefault();
				this.handle.classList.remove("drag-over");
			})
			this.handle.addEventListener("drop", (evt) => {
				evt.preventDefault();
				var objType = evt.dataTransfer.getData("text/plain");
				const event = JSON.parse( objType ) 
				if (type === event.type) {
					//console.log("drop of:", evt.dataTransfer.getData("text/plain"));
					const dropIn = this.handle.getBoundingClientRect();

					cbDrop( {data:event.data, x:evt.clientX-dropIn.x,y:evt.clientY-dropIn.y, h:dropIn.height, w:dropIn.width, evt:evt } );
				}				
				this.handle.classList.remove("drag-over");
			})
	}
	insertBeforePage( page ) {
		this.handle.remove();
		this.handle.insertBefore( page.handle );
	}

	activatePage( page ) {
		if( this.pages.lastPage )
			this.pages.lastPage.deactivate();
		this.pages.lastPage = page.activate();
	}


	activate() {
		this.handle.classList.add( "pressed" );
		this.content.style.display="";
		if( this.pages ) {
			this.pages.handleContainer.style.display = "";
		}
		if( this.#page && this.#page.pages ) {
			// optimize already activated.
			this.#page.pages.lastPage = this;
			this.frame.on( "activate", this );
		}
		if( this.#frame ) {
			// optimize already activated.
			this.#frame.on( "activate", this );
		}
		return this;
	}

	deactivate() {
		this.handle.classList.remove( "pressed" );
		this.content.style.display="none";
		if( this.#page && this.#page.pages ) {
			this.#page.pages.lastPage = null;
		}
		if( this.pages )
			this.pages.handleContainer.style.display = "none";
		this.frame.on( "deactivate", this );
	}

	get frame() {
		if( this.#frame ) return this.#frame; 
		return this.#page.frame;
	}
	set textContent( text ) {
		this.handle.textContent = text;
	}
	
	appendChild( el ) {
		this.content.appendChild( el );
	}
	removePage( pf ) {
		pf.remove();

	}
	addPage(title, url) {
		if( !this.pages ) {
			if( this.#frame ) 
				this.pages = new PageFramePages( this, this.#frame.suffix );
			else 
				this.pages = new PageFramePages( this, this.frame.suffix );
			this.pages.handleContainer.style.display = "none";
		}
		const pf = new PageFramePage( this );
		pf.textContent = title;
		if( url )
			fillFromURL( pf.content, url );
		return pf;	
	}
	on(a,b) {
		this.frame.on(a,b);
	}

}	

class PageFramePages extends Array {
	handleContainer = document.createElement( 'div' );
	pageContainer = document.createElement( 'div' );
	
	#frame = null;
	#page = null;
	constructor( frame, suffix ) {
		super();
		if( frame instanceof PagedFrame ) {
			this.#frame = frame;
			this.handleContainer.className = 'page-frame-handle-container' + suffix;
			this.pageContainer.className = 'page-frame-page-frame' + suffix;
			frame.frame.appendChild( this.handleContainer );
			frame.frame.appendChild( this.pageContainer );
		}else if( frame instanceof PageFramePage ) {
			this.#page = frame;
			this.handleContainer.className = 'page-frame-page-handle-container' + suffix;
			this.pageContainer.className = 'page-frame-page-page-frame' + suffix;
			frame.handle.appendChild( this.handleContainer );
			frame.content.appendChild( this.pageContainer );
		}
	}
	remove() {
		this.handleContainer.remove();
		this.pageContainer.remove();
	}
}


class  PagedFrame extends Events{

	frame = document.createElement( 'div' );

	pages = null;
	lastPage = null;
	#oldPage = null;
	suffix = '';
	constructor( parent, opts ) {
		super();
		opts = opts || {};
		const alignTop = ( opts.top ) ;
		const pageDefs =  opts.pages;

		this.suffix = (alignTop?"-top":"") + ((opts?.suffix)?'-'+opts.suffix:'');


		this.frame.className = 'page-frame' + this.suffix;
				
		this.pages = new PageFramePages( this, this.suffix );

       		if( pageDefs )
			for( let pageDef of pageDefs ) {
				this.addPage( pageDef.title, pageDef.url );
			}
		if( this.pages.length)
			this.activate( this.pages[0] );
		parent.appendChild( this.frame );
	}


	empty() {
		this.pages.forEach( page=>{
			page.remove();
		} );
		this.pages.length = 0;
		this.lastPage = null;
		this.#oldPage = null;
	}

	addPage(title, url) {
			const pf = new PageFramePage( this );
			pf.textContent = title;
			if( url )
				fillFromURL( pf.content, url );
			return pf;				
	       }


	activate( page ) {
		if( this.#oldPage ) {
			this.#oldPage.deactivate();
		}
		this.#oldPage = page.activate();
	}

}


export {Popup};

const popups = {
	Popup:Popup,
	defaultDrag : true,
	autoRaise : true,
	create : createPopup,
	simpleForm : createSimpleForm,
	simpleNotice : createSimpleNotice,
	createList : createList,
	makeList : makeList,
	makeCheckbox : makeCheckbox,
	makeRadioChoice : makeRadioChoice,
	makeLeftRadioChoice : makeLeftRadioChoice,
	makeNameInput : makeNameInput,  // form, object, field, text; popup to rename
	makeTextInput : makeTextInput,  // form, object, field, text
	makeSlider : makeSlider,  // form, object, field, text
	makeTextField : makeTextField,
	makeButton : makeButton,
	handleButtonEvents : handleButtonEvents, // expose just the button handler of makeButton
	makeChoiceInput : makeChoiceInput,// form, object, field, choiceArray, text
	makeDateInput : makeDateInput,  // form, object, field, text
	makeSSNInput,
	makeZipInput,
	strings : { get(s) { return s } },
	setClass(){ console.trace( "Set class no longer supported."); },
	toggleClass(){ console.trace( "toggle class no longer supported."); },
	clearClass(){ console.trace( "Clear class no longer supported."); },
	createMenu : createPopupMenu,
	GraphicFrame,
	makeLoginForm,
	makeWindowManager,
	fillFromURL,
	utils, // expose formatting utility functions.
	DataGrid,
	PagedFrame,
	ValueOfType,  // carry formatting information with value
	AlertForm,
	SimpleNotice,
	Alert,
	getParentPopup( id ) {
		console.log( "getParentPopup is better called getFilledParent, and the former is deprecated" );
		return filledControls.get( id );
	},
	getFilledParent( id ) {
		return filledControls.get( id );
	}
}

export {popups};

export default popups;
