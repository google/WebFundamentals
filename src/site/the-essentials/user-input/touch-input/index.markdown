---
layout: article
title: "Touch"
description: "Touch, tap, click."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
collection: user-input
---

 Touch Input
# Why touch feedback is necessary

Have you ever touched or clicked an element on a web page and questioned whether 
the site actually detected you?

In addition to helping people know that there action has been acknowledged, 
giving touch feedback gives your site a snappy and responsive feel to it.

# Adding States
 Demo: http://jsbin.com/siramabo/latest/edit

The fastest way to add touch feedback to your UI is to simply support the 
various states your element can be in.

The states to handle are:

* Focus
    * If you interact with a webpage using just a keyboard by hitting the tab 
      key and on an unstyled page you'll see some indication of which item you 
      are focusing on
* Active
    * This is the state when an element is being selected, for example: on mouse 
      click down, on touch down or on keyboard down
* Hover
    * This applies to scenarios where you have some form of cursor placed over 
      an element. This is helpful to encourage a user that they can interact 
      with the elements.

	Demo: http://jsbin.com/kugenoza/1/edit

To change our UI for this elements we need to apply styles to the following 
pseudo classes :hover, :focus and :active as shown below.

    .btn {
      display: inline-block;
      
      width: 100%;
      
      padding: 16px;
      box-sizing: border-box;
      
      background-color: #c0392b;
      
      border-radius: 6px;
      
      text-align:center;
      text-decoration: none;
    }

    .btn:hover {
      background-color: #B32C1E;
    }

    .btn:focus {
      /*
      The outline parameter surpresses the border color / outline when focused
      */
      outline: 0;
      background-color: #8D0600;
    }

    .btn:active {
      background-color: #9A1305;
    }

<img src="image00.jpg" width="381" height="297" />  
[Image from: http://jsbin.com/siramabo/26/edit]

Without the outline rule, most user agents will display a colored edge to your 
focusable elements.

## Cross Browser Tips

Since a number of sites didn't include the active state when the devices where 
first released, the browsers including user-agent styles which added color or 
set of styles to elements the user would interact with which you may notice on 
some of your devices.

Safari and Chrome browsers add a tap highlight color which can be prevented 
with:

    .btn {
    -webkit-tap-highlight-color: transparent;
    }

Windows Phone has the same behaviour, but you need to surpress it via a meta 
tag:

    <meta name="msapplication-tap-highlight" content="no"/>

For Firefox OS you need to remove a gradient added by their default styles and 
if you are setting a focus style, you may wish to remove the black border which 
can appear around text:

    .btn {
    background-image: none;
    }

    button::-moz-focus-inner {
      border: 0;
    }

## User Select

If you have elements which the user is interacting with you might want to 
prevent the user for accidentally selecting the text.

    user-select: none;

You should be cautious not to disable user selection if there are scenarios 
where the user might want to copy the text. An example would be a button to 
display a phone, if the user clicks on it, you could open the devices dialer, 
but the user may wish to copy and paste to a different app.

<a href="tel:+44123456789">+44 (0) 123456789</a>

# Touch handlers for feedback

_Demo: http://jsbin.com/feginefu/latest/edit_

You've got active states in your sites. Awesome.

However, sometimes the active state is a little slow to kick in, how can you add 
an instance response?

Using touch events you can add a class to detect when a user has touched a 
device and set an active class name.

For a single button you would need to listen for touchstart to add the 'active' 
classname and listen for touchend and touchcancel to remove the 'active' 
classname:

var button = document.querySelector('.btn');

button.**addEventListener('touchstart'**, function(e) {  
  **e.target.classList.add('active');**  
}, true);

button.addEventListener('touchend', function(e) {  
  **e.target.classList.remove('active');**  
}, true);

button.**addEventListener('touchcancel'**, function(e) {  
 ** e.target.classList.remove('active');**  
}, true);

Finally, in our CSS share the active CSS styling with our new classname:

.btn:active, **.btn.active** {  
  background-color: #9e3024;  
}

The main downside of this approach compared to just the active state is that it 
will display the pressed (or active state) when the user scrolls, where as the 
active state has a delay to determine if the user intends to press or scroll.

# Touch events
 Demo: http://jsbin.com/sozujute/latest/edit

If you have an idea for a new interaction pattern that you'd like to include 
touch support, how do you do it?

## Receiving Touch Events

The building blocks for adding touch to your application is these events:

* touchstart
    * When a finger starts to touch an element
* touchmove
    * When a finger moves across the screen
* touchend
    * When the user lifts their finger off of the screen
* touchcancel
    * The browser cancels the touch gestures (i.e. TODO)

The way you would use these listeners are:

addEventListener(**'touchstart'**, function(evt) { … }, true);  
addEventListener(**'touchmove'**, function(evt) { … }, true);  
addEventListener(**'touchend'**, function(evt) { … }, true);  
addEventListener(**'touchcancel'**, function(evt) { … }, true);

The boolean value is used to determine whether you should catch the touch event 
before or after other elements have the opportunity to catch and interpret the 
events.

For performance reasons the best practice for touch and mouse interaction is to 
bind the touchmove, touchend and touchcancel events as late as possible and 
remove them once the user finished their gesutre.

What this means is you'll be doing  the following

element.**addEventListener**('touchstart', handleGestureStart, true);

function handleGestureStart(evt) {  
evt.preventDefault();  
	document.**addEventListener**('touchmove', handleGestureMove, true);  
	document.**addEventListener**('touchend', handleGestureEnd, true);  
	document.**addEventListener**('touchcancel', handleGestureEnd, true);  
}

function handleGestureEnd(evt) {  
	evt.preventDefault();  
	document.**removeEventListener**('touchmove', handleGestureMove, true);  
	document.**removeEventListener**('touchend', handleGestureEnd, true);  
	document.**removeEventListener**('touchcancel', handleGestureEnd, true);  
}

You may have noticed that in the handleGestureStart and handleGestureEnd the 
listeners are added and removed from the document element rather than the 
element you want the user to interact with, the reason for this is to keep it 
simple should you wish to add support for mouse interaction as well.

**element**.addEventListener('touchstart', handleGestureStart, true);  
**element**.addEventListener('mousedown', handleGestureStart, true);

function handleGestureStart(evt) {  
evt.preventDefault();

// Add Touch Listeners  
	**document**.addEventListener('touchmove', handleGestureMove, true);  
	**document**.addEventListener('touchend', handleGestureEnd, true);  
	**document**.addEventListener('touchcancel', handleGestureEnd, true);

	// Add Mouse Listeners

> **document**.addEventListener('mousemove', handleGestureMove, true);

	**document**.addEventListener('mouseup', handleGestureEnd, true);  
}

function handleGestureEnd(evt) {  
	evt.preventDefault();

	// Remove Touch Listeners  
	**document**.removeEventListener('touchmove', handleGestureMove);  
	**document**.removeEventListener('touchend', handleGestureEnd);  
	**document**.removeEventListener('touchcancel', handleGestureEnd);

	// Remove Mouse Listeners

> **document**.removeEventListener('mousemove', handleGestureMove);

	**document**.removeEventListener('mouseup', handleGestureEnd);  
}

_// TODO: May add in video of DevTools with Scroll bottlenecks moving from 
element to body_

This is the foundation of our touch interaction, time for adding in our new 
behaviour with handleGestureMove and handleGestureEnd.

## Using Touch Events

In your handleGestureMove and handleGestureEnd methods you can find out where 
the touch and mouse events with:

function handleGestureMove(evt) {  
    // Let's assume this is a mouse event first  
    var x = evt.screenX;  
    var y = evt.screenY;

    // Prefer touch events if we have them.  
    if (evt.touches && evt.touches.length > 0) {  
     	x = evt.touches[0].clientX;  
     	y = evt.touches[0].clientY;  
    }  
}

Since the event callbacks are fired on the main thread, we want to run as little 
code as possible in the callback. Apart from pulling out what we need from the 
event, the only other thing we should do is start a requestAnimationFrame to 
then do something with these x and y values.

window.requestAnimFrame = (function(){  
  return  window.requestAnimationFrame       ||  
          window.webkitRequestAnimationFrame ||  
          window.mozRequestAnimationFrame    ||  
          function( callback ){  
            window.setTimeout(callback, 1000 / 60);  
          };  
})();

  var isAnimating = false;  
  var lastTouchPos = null;  
  var swipeFront = document.querySelector('.swipe-front');

  ……….

  function handleTouchMove(evt) {  
    evt.preventDefault();  
      
    lastTouchPos = getGesturePointFromEvent(evt);  
      
    if(isAnimating) {  
      return;  
    }  
      
    isAnimating = true;  
      
    window.requestAnimFrame(**onAnimFrame**);  
  }

  function **onAnimFrame**() {  
    if(!isAnimating) {  
      return;  
    }  
      
    var differenceInX = initialTouchPos.x - lastTouchPos.x;  
      
    var newXTransform = (currentXPosition - differenceInX)+'px';  
    var transformStyle = 'translateX('+newXTransform+')';  
    swipeFront.style['-webkit-transform'] = transformStyle;  
    swipeFront.style['-moz-transform'] = transformStyle;  
    swipeFront.style.transform = transformStyle;  
      
    isAnimating = false;  
  }

What this does is store the current touch in **lastTouchPost** and then we call 
the  **requestAnimFrame** method with the callback **onAnimFrame**. In 
**onAnimFrame** we can calculate where the DOM element should be  and apply a 
transform style.

## Multi-Touch
 Demo: http://jsbin.com/gayuqege/quiet

There are a few scenarios where you may care about more than one finger on a 
screen:

1. The page has multiple touch-enabled elements the user can interact with.
1. You want to implement a multi-touch gesture like multi-finger swipe to 
   perform a certain actions.

By binding the touch events to the element, you can use event.**targetTouches** 
to get the details for the touch event specific to that element.

In the scenario where the user has two fingers on the screen, one on each 
slider, in your handleGestureMove method, you'll have the following:

event**.touches**  
Length: 2

Touch 0 (clientX, clientY): (264,213)  
Touch 1 (clientX, clientY): (110,117)

event**.targetTouches**  
Length: 1

Touch 1 (clientX, clientY): (110,117)

The event contains all of the touches currently on the screen in event.touches, 
but if we only care about touches on a specific element, we can use 
targetTouches.

var **sliderElement** = document.querySelector('.v-slider');

// Add Touch Listeners  
**sliderElement**.addEventListener('touchstart', handleGestureStart.bind(this), 
true);  
**sliderElement**.addEventListener('touchmove', handlers.touchmove, true);  
**sliderElement**.addEventListener('touchend', handlers.touchfinish, true);  
**sliderElement**.addEventListener('touchcancel', handlers.touchfinish, true);

function handleGestureMove(evt) {  
  evt.preventDefault();  
    
  // Let's assume this is a mouse event first  
  var y = evt.screenY;

  // Prefer touch events if we have them.  
  if (evt.**targetTouches** && evt.**targetTouches**.length > 0) {  
    y = evt.**targetTouches**[0].clientY;  
  }  
    
  lastYPos = y;  
    
    if(isAnimating) {  
      return;  
    }  
      
    isAnimating = true;  
      
    window.requestAnimFrame(onAnimFrame);  
}

## Touch-Action

## Pointer Events
 Demo: <See Previous Sections???>

Windows Phone does not support touch events, but has support for Windows Phones