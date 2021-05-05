# popups
HTML Quick Popup dialog library

## Usage

```

import {popups,Popup} from "popups.mjs";

var popup = popups.create( "caption" );

// show a dialog
popup.show();

// hide a ialog
popup.hide();

// set a new caption
popup.caption = "New Caption";

// this is the content of the frame (inner content div)
popup.divContent  // insert frame content here

// this is the frame of the frame (outer div)
popup.divFrame // insert frame content here


popup.appendChild( createElement( "canvas" ) ); // add something to draw into on the form.

```


Generally popups work like VERY simple GUI widgets...
some of the popups.makeButton sort of methods return just a simple html element.



|popup methods| arguments/type  | description |
|----|---|---|
|	defaultDrag | true | option toggle whether to enable mouse dragging on frames |
|	autoRaise | true |  option to toggle whether clicks on frames auto raise them to top |
|	create | (caption [, parent])  | create a new blank popup with specified caption ; if caption is an empty string, no title caption is shown.  |
|	simpleForm | (title, question, defaultValue, ok, cancelCb )  | create a simple yesno form with a title, and a string question; and a text input field for user input  |
|	simpleNotice | ( title, question, ok, cancel )  |  Create just a popup notice with Ok, and optional Cancel button.   |
|        list | (parentList,toString) | Creates a list with a specified tostring method for elements.   |
|        makeCheckbox | (form, o, text, field )  |  make a checkmark button, which is bound to object 'o' and member 'field'.  The title is shown next to the checkbox.  |
|        makeNameInput | (form, o, text, field ) | make a static text display, with a button to click to edit the text   |
 |       makeTextInput |(form,o,text,field) |  make a text input with a lable next to it   |
|        makeTextField |(form,o,text,field)  | make a text display with a label next to it (like input but readonly)   |
 |       makeButton | (parentElement,text, callback) | adds a button; is 2 divs nested and styled.  Callback is called when the button is clicked/touched. |
|	setClass| (element.class) | Set a class in className |
|	toggleClass| (element,class) | if a class is in a class, remove it, else add it |
|	clearClass| (element,class) | remove a class from className |
| createMenu | () | returns a menu object which is a popup menu |

### Lists

Drag and drop nested items in lists.


### Menu

```
const menu = popups.createMenu();
menu.addItem( "text", ()=>{
	/* called when item is selected */
} );

menu.separate();

const subMenu = menu.addMenu( "Menu Entry Text" );
```

## Changelog
- 1.0.103(in progress)
- 1.0.102
  - added remove function on more popups.
  - Improved popup sub-menu closing, put it behind a timer, which allows enough time to move over the menu from the selection before closing.
- 1.0.101 
  - Revised popup menu interface, removed constants, used separate initializer methods; make popup trigger per item instead of per-show.
