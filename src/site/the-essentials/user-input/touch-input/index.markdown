---
layout: article
title: "Adding Touch to Your Site"
description: "Adding touch responses to your site gives a great sense of responsiveness and polish, with minimal amount of effort. Then we have entirely new and custom interactions which you can add using touch events, delighting your users."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
key-takeaways:
  add-states:
    - Adding states for :active, :focus and :hover pseudo classes makes your site feel snappy and responsive
    - Most mobile browsers have a default styling for these states which should only be overridden when you are adding your own styles for them
    - Make the state changes fit in with your UI
collection: user-input
---

# Touch Input

Have you ever touched or clicked an element on a web page and questioned whether 
the site actually detected you?

In addition to helping people know that there action has been acknowledged, 
giving touch feedback gives your site a snappy and responsive feel to it.

## Adding States

<!--
Demo: http://jsbin.com/siramabo/latest/edit
-->

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.add-states %}

The fastest way to support touch in your UI is to simply support the 
various states your elements can be in, giving a response to the users interactions.

The states to handle are:

* Focus
    * If you interact with a webpage using a keyboard by hitting the tab 
      key, you'll see some indication of which items you 
      are focusing on

      // TODO Insert Image Of Button Focus

* Active
    * This is the state when an element is being selected, for example a user clicking or touching
    an element

      // Insert Pressed Button State

* Hover
    * This applies to scenarios where you have some form of cursor placed over 
      an element. This is helpful to encourage users to interact 
      with elements.

<!--
Demo: http://jsbin.com/kugenoza/1/edit
-->

To change our UI for an element we need to apply styles to the following 
pseudo classes :hover, :focus and :active as shown below.

{% include_code _code/states-example.html btnstates css %}

![Image illustrating the different colors for button states](images/button-states.png)

<!-- [Image from: http://jsbin.com/siramabo/26/edit]-->

Without the outline rule, most user agents will display a colored edge to your 
focusable elements.

## Cross Browser Tips

Since a number of sites didn't include the active state when the devices where 
first released, the browsers including user-agent styles which added color or 
set of styles to elements the user would interact with which you may notice on 
some of your devices.

Safari and Chrome browsers add a tap highlight color which can be prevented 
with:

{% include_code _code/states-example.html webkit-specific css %}

Windows Phone has the same behaviour, but you need to surpress it via a meta 
tag:

{% include_code _code/states-example.html ms-specific html %}


For Firefox OS you need to remove a gradient added by their default styles and 
if you are setting a focus style, you may wish to remove the black border which 
can appear around text:

{% include_code _code/states-example.html ff-specific css %}

## User Select

If you have elements which the user is interacting with you might want to 
prevent the user for accidentally selecting the text.

{% include_code _code/user-select-example.html user-select css %}

You should be cautious not to disable user selection if there are scenarios 
where the user might want to copy the text. An example would be a button to 
display a phone, if the user clicks on it, you could open the devices dialer, 
but the user may wish to copy and paste to a different app.



# Touch events
<!-- Demo: http://jsbin.com/sozujute/latest/edit -->

If you have an idea for a new interaction pattern that you'd like to include 
touch support, how do you do it?

## Receiving Touch Events

For full browser support there are two kinds of events you need to cater for:

- Touch Events
  - These consist of touchstart, touchmove, touchend and touchcancel
- Pointer Events
  - This is a new feature which merges Mouse and Touch events into the same 
  set of events. This is currently only supported in IE10+ with the events: 
  MSPointerDown, MSPointerMove and MSPointerUp

The building blocks for adding touch to your application is these events:

* touchstart, MSPointerDown
    * When a finger starts to touch an element
* touchmove, MSPointerMove
    * When a finger moves across the screen
* touchend, MSPointerUp
    * When the user lifts their finger off of the screen
* touchcancel
    * The browser cancels the touch gestures (for example the page scrolls and
    browser no longer allows you to intercept touch events)

You hook these events up through the **addEventListener()** method of a DOM element
 like so.

{% include_code _code/touch-demo-1.html addlisteners js %}

This code first checks if we should use Pointer Events or you touch and mouse events.
We then add the event listener with the appropriate name, the callback we want called,
in this case **this.handleGestureStart**.

The third boolean value is used to determine whether you should catch the touch event 
before or after other elements have the opportunity to catch and interpret the 
events.

### Common Practices

Depending on what you want to do with touch, you're likely to fall into one of two camps

- I want the user to interact with one of my elements at a time
- I want the user to interact with multiple elements at the same time

There are trade offs to be had with both.

If you only have one element to be interactive with at one time, then you might want 
any gesture which started on that element, to be used to control that gesture.

For example, moving a finger off the swipable element still controls the element.

![Example GIF of touch on document](images/touch-document-level.gif)

If however you expect people to interact with multiple elements at the same time, 
you would want to restrict the touch to the specific element.

![Example GIF of touch on element](images/touch-element-level.gif)

Let's look at the first interaction with expecting the user to only interact with just one 
element.

The steps to achieve this is:

1. Add the start events to the element the user will interact with
2. Inside your touch start method, you bind the move and end elements to the document
3. Handle the move events
4. On end event remove the move and end listeners on the docment

The reason to follow this approach is it's the most performant approach.

In our example, handleGestureStart adds our events to the document:

{% include_code _code/touch-demo-1.html handle-start-gesture js %}

and handleGestureEnd removes them:

{% include_code _code/touch-demo-1.html handle-end-gesture js %}

You'll notice the mouse events are being applied in this fashion as well,
the reason is that it's easy for a user to quickly move the mouse outside of
the element which results in the move events no longer firing, so setting
the events on to the document gets around this.

// TODO: Maybe add in video of DevTools with Scroll bottlenecks moving from 
element to body

The alternative approach to support multiple touch elements on 
the page are simply applying the touchmove and touchend events on the elements
themselve, but remember that this applies to touch only, so for mouse interactions
you should continue to apply them to documents.

## Using Touch Events

In your `handleGestureMove` and `handleGestureEnd` methods you can find out 
where the touch and mouse events with:

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
        
        window.requestAnimFrame(onAnimFrame);
      }

      function onAnimFrame() {
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

## Pointer Events
 Demo: <See Previous Sections???>

Windows Phone does not support touch events, but uses Pointer Events to handle 
any interaction on the screen (i.e. mouse and touch are treated as the same 
point events).

To start with, we need to tell the browser whether we are handling the touch 
interaction or not:

  // Pass all touches to javascript  
  touch-action: none;  
  -ms-touch-action: none;

Next is to determine whether we are going to use pointer events or touch events:

if (window.navigator.msPointerEnabled) {  
    // Use Pointer Events  
    …..  
  } else {  
    // Add Touch Listener  
    …..  
    // Add Mouse Listener  
    ….  
  }

From this we start to follow the same behaviour as before but using different 
pointer names:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Touch / Mouse Event Name</td>
<td>Point Event Name</td>
</tr>
<tr>
<td>touchstart / mousedown</td>
<td>MSPointerDown</td>
</tr>
<tr>
<td>touchmove / mousemove</td>
<td>MSPointerMove</td>
</tr>
<tr>
<td>touchend / touchcancel / mouseup</td>
<td>MSPointerUp</td>
</tr>
</table>

Note that the mouse event and touch events are merged into a single pointer 
event, this is one of the goals of Pointer Events, to make it easier to support 
input devices without have to worry about what the input is.

This can be matched up to original logic for your touch logic:

if (window.navigator.msPointerEnabled) {  
    // Pointer events are supported.  
    element.addEventListener('MSPointerDown', handleGestureStart, true);  
  } else {  
    // Add Touch Listener  
    element.addEventListener('touchstart', handleGestureStart, true);  
      
    // Add Mouse Listener  
    element.addEventListener('mousedown', handleGestureStart, true);  
  }

Then the final piece to change is extracting the x and y values from the touch 
event. Pointer Events will have the properties clientX and clientY, which are 
equivalent to targetTouches[0].clientX and targetTouches[1].clientY.

// Let's assume this is a mouse event first  
  var y = evt.screenY;

  // Prefer touch events if we have them.  
  if (window.navigator.msPointerEnabled) {  
    y = evt.clientY;  
  } else if (evt.targetTouches && evt.targetTouches.length > 0) {  
    y = evt.targetTouches[0].clientY;  
  }

This means Pointer Events are up and running with touch events.

**Touch-Action**

Touch-action allows you to determine the behaviour an element has without 
needing to implement touch events.

An example is a long scrolling page designed to fit on mobile, but has an image 
expanding off the screen, this would normally mean the user can scroll 
horizontally off screen, to guard against this, you can use touch-action: pan-y 
as a last resort to prevent this.

See: http://jsbin.com/cekibuzo/1/edit

pan-x means you ca scroll vertically, auto allows the browser to determine the 
behaviour and finally touch-action none means the browser will no intercept the 
touches, allowing you to consume all the events in javascript.

auto | none | [pan-x || pan-y]