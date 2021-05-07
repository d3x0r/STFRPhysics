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
	to$(s) { return "$"+s;},
}
const localStorage = globalThis.localStorage;

const popups = {
	defaultDrag : true,
	autoRaise : true,
	create : createPopup,
	simpleForm : createSimpleForm,
	simpleNotice : createSimpleNotice,
        makeList : createList,
        makeCheckbox : makeCheckbox,
        makeNameInput : makeNameInput,  // form, object, field, text; popup to rename
        makeTextInput : makeTextInput,  // form, object, field, text
        makeTextField : makeTextField,
        makeButton : makeButton,
        makeChoiceInput : makeChoiceInput,// form, object, field, choiceArray, text
        makeDateInput : makeDateInput,  // form, object, field, text
	strings : { get(s) { return s } },
	setClass: setClass,
	toggleClass: toggleClass,
	clearClass:clearClass,
	createMenu : createPopupMenu,
}

const globalMouseState = {
        activeFrame : null
    }
var popupTracker;

function addCaptionHandler( c, popup_ ) {
	var popup = popup_;
	if( !popup )
	 	popup = createPopup( null, c );


	var mouseState = {
		frame:popup.divFrame,
		x:0,y:0,
		dragging:false
	};
	if( popups.autoRaise )
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
			}
		}
		function mouseDown(evt){
			//evt.preventDefault();
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
			evt.preventDefault();
			var pRect = state.frame.getBoundingClientRect();
			popupTracker.raise( popup );
			//state.x = evt.clientX-pRect.left;
			//state.y = evt.clientY-pRect.top;
			state.x = evt.touches[0].clientX-pRect.left;
			state.y = evt.touches[0].clientY-pRect.top;
			state.dragging = true;
			
		})
		c.addEventListener( "touchmove", (evt)=>{
			evt.preventDefault();
			if( state.dragging ) {
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
			
		})
		c.addEventListener( "touchend", (evt)=>{
			evt.preventDefault();
			popupTracker.raise( popup );
			state.dragging = false;
			
		})

	}

	if( popups.defaultDrag ) {
		mouseHandler(c, mouseState );

		mouseHandler(popup_.divFrame, mouseState );
	}

}

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
			popup.divFrame.style.zIndex = popup.index+1;
			tracker.popups.push( popup );
			popup.raise = function() {
				tracker.raise( popup)
			}
		}
	}
	return tracker;
}
popupTracker = initPopupTracker();

class Popup {
	popupEvents = {
		close : [],
		show : [],
	};
	divFrame = document.createElement( "div" );
	divCaption = document.createElement( "div" );
	divTitle = document.createElement( "span" );
        divContent = document.createElement( "div" );
        divClose = document.createElement( "div" );
	popup = this;

	constructor(caption_,parent) {
		this.divFrame.style.left= 0;
		this.divFrame.style.top= 0;
		this.divFrame.className = parent?"formContainer":"frameContainer";
		if( caption_ != "" )
			this.divFrame.appendChild( this.divCaption );
		this.divFrame.appendChild( this.divContent );
		this.divCaption.appendChild( this.divTitle );
		this.divCaption.appendChild( this.divClose );

		this.divCaption.className = "frameCaption";
		this.divContent.className = "frameContent";
		this.divClose.className = "captionButton closeButton";
        	popupTracker.addPopup( this );

		this.divClose.addEventListener( "click", (evt)=>{
			this.hide();
		} );

		this.caption = caption_;
			parent = (parent&&parent.divContent) || parent || document.body;
		parent.appendChild( this.divFrame );

		addCaptionHandler( this.divCaption, this );
	}
		set caption(val) {
			this.divTitle.textContent = val;
		}
		center() {
			var myRect = this.divFrame.getBoundingClientRect();
			var pageRect = this.divFrame.parentElement.getBoundingClientRect();
			this.divFrame.style.left = (pageRect.width-myRect.width)/2;
			this.divFrame.style.top = (pageRect.height-myRect.height)/2;
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
		hide() {
			this.divFrame.style.display = "none";
		}
		show() {
			this.divFrame.style.display = "";
			//popupTracker.raise( this );

			this.on( "show", true );
		}
		move(x,y) {
			this.divFrame.style.left = x+"%";
			this.divFrame.style.top = y+"%";
		}
	appendChild(e) {
		return this.divContent.appendChild(e)
	}
	remove() {
		this.divFrame.remove();
	}
}

function createPopup( caption ) {
	return new Popup(caption);
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
	var input = document.createElement( "INPUT" );
	input.className = "popupInputField";
	input.setAttribute( "size", 45 );
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

function makeButton( form, caption, onClick ) {

	var button = document.createElement( "div" );
	button.className = "button";
	button.style.width = "max-content";
	var buttonInner = document.createElement( "div" );
	buttonInner.className = "buttonInner";
	buttonInner.style.width = "max-content";
	buttonInner.textContent = caption;

        button.appendChild(buttonInner);


        button.addEventListener( "keydown", (evt)=>{
		if( evt.key === "Enter" || evt.key === " " ) {
			evt.preventDefault();
        	        evt.stopPropagation();
	                onClick();
                }
	} );
	//var okay = document.createElement( "BUTTON" );
	//okay.className = "popupOkay";
	//okay.textContent = caption;
	button.addEventListener( "click", (evt)=>{
		evt.preventDefault();
                onClick();
	})
	button.addEventListener( "touchstart", (evt)=>{
		evt.preventDefault();
		setClass( button, "pressed" );
		
	})
	button.addEventListener( "touchend", (evt)=>{
		evt.preventDefault();
		clearClass( button, "pressed" );
                onClick();
		
	})
	button.addEventListener( "mousedown", (evt)=>{
		evt.preventDefault();
		setClass( button, "pressed" );
		
	})
	button.addEventListener( "mouseup", (evt)=>{
		evt.preventDefault();
		clearClass( button, "pressed" );
		
	})
	form.appendChild( button );
        return button;

}

function createSimpleNotice( title, question, ok, cancel ) {
    return new SimpleNotice( title, question, ok, cancel );
}

class SimpleNotice extends Popup {
	//const popup = popups.create( title );
	constructor( title, question, ok, cancel ) {
		super( title, null );
		const popup = this;
   	const form = document.createElement( "form" );
	this.okay = makeButton( form, "Okay", ()=>{
		this.hide();
		ok && ok( );
	})
	
	{
		const	show_ = this.show.bind(this);

	this.show = function( caption, content ) {
		if( caption && content ) {
			this.divCaption.textContent = caption;
			textOutput.textContent = content;
		}
		else if( caption )
			this.textContent = caption;
		show_();
	}

	this.on( "show", ()=>{
		this.okay.focus();
	})
	this.on( "close", ()=>{
		// aborted...
		cancel && cancel();
	});

	form.className = "frameForm";
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

	var textOutput = document.createElement( "SPAN" );
	textOutput.className = "noticeText";
	textOutput.textContent = question;

	
	this.okay.className += " notice";
	this.okay.children[0].className += " notice";



	this.divFrame.addEventListener( "keydown", (e)=>{
		if(e.keyCode==27){
			e.preventDefault();
			this.hide();
			ok && ok( );
		}
	})
	this.divContent.appendChild( form );
	form.appendChild( textOutput );
	form.appendChild( document.createElement( "br" ) );
	form.appendChild( document.createElement( "br" ) );
	form.appendChild( this.okay );

	if( cancel )  {
		let cbut = makeButton( form, "Cancel", ()=>{
			this.hide();
			cancel && cancel( );
		})
		cbut.className += " notice";
		cbut.children[0].className += " notice";
	}
	this.center();
	this.hide();
	//return this;
		}
	}
	appendChild( e ) {
		this.form.insertChild( e, this.okay );
	}
}



class List {
		 selected = null;
		 groups = [];
		 itemOpens = false;
    constructor( parentDiv, parentList, toString )
        {
		this.toString = toString
		this.divTable = parentDiv;
                this.parentList = parentList;
        }

		push(group, toString_, opens) {
			var itemList = this.divTable.childNodes;
			var nextItem = null;
			for( nextItem of itemList) {
				if( nextItem.textContent > this.toString(group) )
					break;
				nextItem = null;
			}
			
			var newLi = document.createElement( "LI" );
			newLi.className = "listItem"
			
			this.divTable.insertBefore( newLi, nextItem );//) appendChild( newLi );
			newLi.addEventListener( "click", (e)=>{
				e.preventDefault();
				if( this.selected )
					this.selected.classList.remove("selected");
				newLi.classList.add( "selected" );
				this.selected = newLi;
			})

			var newSubList = document.createElement( "UL");
			newSubList.className = "listSubList";
			if( this.parentList && this.parentList.parentItem )
				this.parentList.parentItem.enableOpen( this.parentList.thisItem );
			if( opens ) {
			//	this.enableOpen(newLi);
			}

			var treeLabel = document.createElement( "span" );
			treeLabel.textContent = this.toString(group);
			treeLabel.className = "listItemLabel";
			newLi.appendChild( treeLabel );

			//var newSubDiv = document.createElement( "DIV");
			newLi.appendChild( newSubList );
			//newSubList.appendChild( newSubDiv);
			var newRow;
			var subItems = createList( this, newSubList, toString_, true );
			this.groups.push( newRow={ opens : false, group:group, item: newLi, subItems:subItems
                        	, parent:this.parentList
                                , set text(s) {
                                	treeLabel.textContent = s;
                               	}
                        	, hide() {
                                	this.item.style.display = "none";
                                }
                        	, show() {
                                	this.item.style.display = "";
                                }
                        } );
			return newRow;
		}
		enableOpen(item) {
			if( item.opens) return;
			item.opens = true;
				var treeKnob = document.createElement( "span" );
				treeKnob.textContent = "-";
				treeKnob.className = "knobOpen";
				item.item.insertBefore( treeKnob, item.item.childNodes[0] );
				treeKnob.addEventListener( "click", (e)=>{
					e.preventDefault();
					if( treeKnob.className === "knobClosed"){
						treeKnob.className = "knobOpen";
						treeKnob.textContent = "-";
						item.subItems.items.forEach( sub=>{
							sub.item.style.display="";
						})
					}else{
						treeKnob.className = "knobClosed";
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

function createList( parent, parentList, toString, opens ) {
     return new List( parent, parentList, toString, opens );
}

function makeCheckbox( form, o, field, text ) 
{
	let initialValue = o[field];
	var textCountIncrement = document.createElement( "SPAN" );
	textCountIncrement.textContent = text;
	var inputCountIncrement = document.createElement( "INPUT" );
	inputCountIncrement.setAttribute( "type", "checkbox");
	inputCountIncrement.className = "checkOption rightJustify";
	inputCountIncrement.checked = o[field];
	//textDefault.
	var onChange = [];
	var binder = document.createElement( "div" );
	binder.className = "fieldUnit";
	binder.addEventListener( "click", (e)=>{ 
		if( e.target===inputCountIncrement) return; e.preventDefault(); inputCountIncrement.checked = !inputCountIncrement.checked; })
	inputCountIncrement.addEventListener( "change", (e)=>{ 
		 o[field] = inputCountIncrement.checked; })
	form.appendChild(binder );
	binder.appendChild( textCountIncrement );
	binder.appendChild( inputCountIncrement );
	//form.appendChild( document.createElement( "br" ) );
	return {
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
                reset(){
                    o[field] = initialValue;
                    inputCountIncrement.checked = initialValue;
                },
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
		}
	}
}

function makeTextInput( form, input, value, text, money, percent ){
	const initialValue = input[value];

	var textMinmum = document.createElement( "SPAN" );
	textMinmum.textContent = text;
	var inputControl = document.createElement( "INPUT" );
	inputControl.className = "textInputOption rightJustify";
        inputControl.addEventListener( "mousedown", (evt)=>evt.stopPropagation() );
	//textDefault.
        function setValue() {
	if( money ) {
		inputControl.value = utils.to$(input[value]);
		inputControl.addEventListener( "change", (e)=>{
			var val = utils.toD(inputControl.value);
			input[value] = inputControl.value = utils.to$(val);
		})
	} else if( percent ) {
		inputControl.value = utils.toP(input[value]);
		inputControl.addEventListener( "change", (e)=>{
			var val = utils.fromP(inputControl.value);
			input[value] = inputControl.value = utils.toP(val);
		})
	}else {
		inputControl.value = input[value];
		inputControl.addEventListener( "input", (e)=>{
			var val = inputControl.value;
                        input[value] = val;
		})
	}
        }
        setValue();

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit";
	form.appendChild(binder );
	binder.appendChild( textMinmum );
	binder.appendChild( inputControl );
	return {
            	addEventListener(a,b) { return inputControl.addEventListener(a,b) },
		get value () {
			if( money )
				return utils.toD(inputControl.value);
			if( percent ) 
				return utils.fromP(inputControl.value);
			return inputControl.value;
		},
		set value (val) {
			if( money )
				inputControl.value = utils.to$(val);
			else if( percent )
				inputControl.value = utils.toP(val);
			else
				inputControl.value = val;			
		},
                reset(){
                    input[value] = initialValue;
                    setValue();
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


function makeTextField( form, input, value, text, money, percent ){
	const initialValue = input[value];

	var textMinmum = document.createElement( "SPAN" );
	textMinmum.textContent = text;
	var inputControl = document.createElement( "SPAN" );
	inputControl.className = "textInputOption rightJustify";
        inputControl.addEventListener( "mousedown", (evt)=>evt.stopPropagation() );
	//textDefault.
        function setValue() {
	if( money ) {
		inputControl.value = utils.to$(input[value]);
		inputControl.addEventListener( "change", (e)=>{
			var val = utils.toD(inputControl.value);
			input[value] = inputControl.value = utils.to$(val);
		})
	} else if( percent ) {
		inputControl.value = utils.toP(input[value]);
		inputControl.addEventListener( "change", (e)=>{
			var val = utils.fromP(inputControl.value);
			input[value] = inputControl.value = utils.toP(val);
		})
	}else {
		inputControl.value = input[value];
		inputControl.addEventListener( "input", (e)=>{
			var val = inputControl.value;
                        input[value] = val;
		})
	}
        }
        setValue();

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit";
	form.appendChild(binder );
	binder.appendChild( textMinmum );
	binder.appendChild( inputControl );
	return {
            	addEventListener(a,b) { return inputControl.addEventListener(a,b) },
		get value () {
			if( money )
				return utils.toD(inputControl.value);
			if( percent ) 
				return utils.fromP(inputControl.value);
			return inputControl.value;
		},
		set value (val) {
			if( money )
				inputControl.value = utils.to$(val);
			else if( percent )
				inputControl.value = utils.toP(val);
			else
				inputControl.value = val;			
		},
                reset(){
                    input[value] = initialValue;
                    setValue();
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

function makeNameInput( form, input, value, text ){
	const initialValue = input[value];
	var binder;
	const textLabel = document.createElement( "SPAN" );
	textLabel.textContent = text;

	const textOutput = document.createElement( "SPAN" );
	textOutput.textContent = input[value];

	const buttonRename = document.createElement( "Button" );
	buttonRename.textContent = popups.strings.get("(rename)");
	buttonRename.className="buttonOption rightJustify";
        buttonRename.addEventListener("click", (evt)=>{
		evt.preventDefault();
                //title, question, defaultValue, ok, cancelCb
		const newName = createSimpleForm( popups.strings.get("Change Name")
                                                 , popups.strings.get("Enter new name")
                                                 , input[value]
                                                 , (v)=>{
                                                 	input[value] = v;
							textOutput.textContent = v;
                                                 }
                                                 );
                newName.show();
	} );

	binder = document.createElement( "div" );
	binder.className = "fieldUnit";
	form.appendChild(binder );
	binder.appendChild( textLabel );
	binder.appendChild( text );
	binder.appendChild( buttonRename );
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
                }
	}
}

	function toggleClass( el, cn )  {
		if( el.className.includes(cn) )  {
			el.className = el.className.split( " " ).reduce( (a,el)=> ( el !== cn )?(a.push(el),a):a, [] ).join(' ');
		}else {
			el.className += " " + cn;
		}
	}
	function clearClass( el, cn )  {
		if( el.className.includes(cn) )  {
			el.className = el.className.split( " " ).reduce( (a,el)=> ( el !== cn )?(a.push(el),a):a, [] ).join(' ');
		}else {
		}
	}
	function setClass( el, cn )  {
		if( el.className.includes(cn) )  {
		}else {
			el.className += " " + cn;
		}
	}

function makeDateInput( form, input, value, text ){
	const initialValue = input[value];
	var textMinmum = document.createElement( "SPAN" );
	textMinmum.textContent = text;
	var inputControl = document.createElement( "INPUT" );
	inputControl.className = "textInputOption rightJustify";
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
	binder.className = "fieldUnit";
	form.appendChild(binder );
	binder.appendChild( textMinmum );
	binder.appendChild( inputControl );
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

	const initialValue = input[value];
	var textMinmum = document.createElement( "SPAN" );
	textMinmum.textContent = text;
	var inputControl = document.createElement( "INPUT" );
	inputControl.className = "textInputOption rightJustify";
        inputControl.type = "date";
        inputControl.addEventListener( "mousedown", (evt)=>evt.stopPropagation() );

	//textDefault.
	inputControl.value = input[value];
        inputControl.addEventListener( "change",(evt)=>{
		input[value] = inputControl.value;
	} );

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit";
	form.appendChild(binder );
	binder.appendChild( textMinmum );
	binder.appendChild( inputControl );
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

	const initialValue = input[value];
	var textMinmum = document.createElement( "SPAN" );
	textMinmum.textContent = text;
	var inputControl = document.createElement( "INPUT" );
	inputControl.className = "textInputOption rightJustify";
        inputControl.type = "date";

	//textDefault.
	inputControl.value = input[value];
        inputControl.addEventListener( "change",(evt)=>{
		input[value] = inputControl.value;
	} );

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit";
	form.appendChild(binder );
	binder.appendChild( textMinmum );
	binder.appendChild( inputControl );
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
function makeChoiceInput( form, input, value, choices, text ){
	const initialValue = input[value];

	var textMinmum = document.createElement( "SPAN" );
	textMinmum.textContent = text;
	var inputControl = document.createElement( "SELECT" );
	inputControl.className = "selectInput rightJustify";
        inputControl.addEventListener( "mousedown", (evt)=>evt.stopPropagation() );

        for( let choice of choices ) {
            	const option = document.createElement( "option" );
                option.text = choice;
                if( choice === input[value] ) {
	           inputControl.selectedIndex = inputControl.options.length-1;
                }
		inputControl.add( option );
        }
	//textDefault.
	inputControl.value = input[value];
        inputControl.addEventListener( "change",(evt)=>{
		const idx = inputControl.selectedIndex;
		if( idx >= 0 ) {
			console.log( "Value in select is :", inputControl.options[idx].text );
			input[value] = inputControl.options[idx].text;
                }
	} );

	var binder = document.createElement( "div" );
	binder.className = "fieldUnit";
	form.appendChild(binder );
	binder.appendChild( textMinmum );
	binder.appendChild( inputControl );
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



//--------------------------- Quick Popup Menu System ------------------------------

const mouseCatcher = document.createElement( "div" );
document.body.appendChild( mouseCatcher )
mouseCatcher.addEventListener( "contextmenu", (evt)=>{ evt.preventDefault(); evt.stopPropagation();return false; } );
mouseCatcher.className = "mouseCatcher";
let topMenu;

mouseCatcher.addEventListener( "click", (evt)=>{
	mouseCatcher.style.visibility = "hidden";
	if( topMenu )
		topMenu.hide( true );
} );

function createPopupMenu() {

	let keepShow = false;

	function menuCloser() {
		if( menu.lastShow ) {
			if( keepShow ) {
				menu.lastShow = 0;
				keepShow = false;
				return;
			}
			const now = Date.now();
			if( ( now - menu.lastShow ) > 500 )  {
				menu.lastShow = 0; // reset this, otherwise hide will just schedule this timer
				if( menu.subOpen ) menu.subOpen.hide();
				menu.hide();
			}
			if( menu.lastShow )
				setTimeout( menuCloser, 500 - ( now - menu.lastShow ) );
		}
	}

	const menu = {
		items: [],
		lastShow : 0,
		parent : null,
		subOpen : null,
		container : document.createElement( "div" ),
		board : null,
		separate( ) {
			var newItem = document.createElement( "HR" );
			menu.container.appendChild( newItem );
                },

		addItem( text, cb ) {
				var newItem = document.createElement( "A" );
				var newItemBR = document.createElement( "BR" );
				newItem.textContent = text;
				menu.container.appendChild( newItem );
				menu.container.appendChild( newItemBR );
				newItem.className = "popupItem";
				newItem.addEventListener( "click", (evt)=>{
				       cb();
				       //console.log( "Item is clicked.", evt.target.value );
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
				var newItemBR = document.createElement( "BR" );
				newItem.textContent = text;
				this.container.appendChild( newItem );
				this.container.appendChild( newItemBR );
				const value = createPopupMenu();
				{
					value.parent = this;
					newItem.addEventListener( "mouseover", (evt)=>{
						var r = newItem.getBoundingClientRect();
						keepShow = true;
						console.log( "Item is clicked show that.", evt.clientX, evt.clientY );
						value.show( evt.clientX, r.top - 10, menu.cb );
						menu.subOpen = value;
					} );
					newItem.addEventListener( "mouseout", (evt)=>{
						var r = newItem.getBoundingClientRect();
						console.log( "Item is clicked show that.",  evt.clientX, r.top );
						if( evt.toElement !== newItem.container )		
							value.hide();
					} );
					newItem.addEventListener( "mousemove", (evt)=>{
						if( this.subOpen ) this.subOpen.lastShow = Date.now();
					} );
				}
				return value;
		},
		hide( all ) {
			if( menu.lastShow ) return menuCloser();			
			this.container.style.visibility = "hidden";
			if( this.parent ) {
				this.parent.subOpen = null; // should be the same as Me... 
				if( all )
					this.parent.hide( all );
			} else {
				mouseCatcher.style.visibility = "hide"
			}
		},
		show( x, y, cb ) {
			menu.lastShow = Date.now();
			//this.board = board;
			menu.cb = cb;
			mouseCatcher.style.visibility = "visible"
			this.container.style.visibility = "inherit";
			this.container.style.left = x;
			this.container.style.top = y;
		},
		reset() {
			this.hide(true);
			//console.log( "hide everything?" );	
		}
	};

	mouseCatcher.appendChild( menu.container );
	menu.container.className = "popup";
	menu.container.style.zIndex = 50;
	menu.hide(); 
	//document.body.appendChild( menu.container );
	return menu;
}


export {popups};
export {Popup};
