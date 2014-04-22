---
layout: article
title: "Adding Touch to Your Site"
description: "Adding touch responses to your site gives a great sense of responsiveness and polish, with minimal amount of effort. Then we have entirely new and custom interactions which you can add using touch events, delighting your users."
introduction: "Touchscreens are available on more and more devices, ranging from phones up to desktop screens. When your user chooses to interact with your UI, your app should respond to their touch, in intuitive and beautiful ways."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
key-takeaways:
  add-states:
    - Use the :active pseudo class to make your site feel snappy and responsive.
    - The :focus pseudo class allows users to navigate your UI easily using a keyboard.
    - You can encourage users to interact with an element by adding a hove effect using :hover.
    - Only override styling from the browser for touch and focus if you add your own styles.
  touch-events:
    - Don't do any long running tasks inside an event callback
    - Use requestAnimationFrame's to change the UI in response to an event
  common-practices:
    - Ensure you handle touch events and pointer events for full device support
    - Always bind start event listeners to the element itself
    - If you want all events after the start event, bind your move and end listeners to the document
      - If you do this, then ensure you unbind from the document in the end listener
    - If you want to support multi-touch, either restrict move and end touch events to the element itself or handle all the touches on an element 
important:
  touch-events-main-thread:
    - All touch events fire on the main thread
    - Be as quick as possible inside your callback
    - Use requestAnimationFrame to keep your site fast and performant
  user-select:
    - You should be cautious not to disable user selection if the information on the element may be useful to the user (i.e. phone number, e-mail address etc.)
collection: user-input
---

{% wrap content%}

{% include modules/toc.liquid %}

## Adding States

<!--
Demo: http://jsbin.com/siramabo/latest/edit
-->
<!--
Demo: http://jsbin.com/kugenoza/1/edit
-->
<!-- [Image from: http://jsbin.com/siramabo/26/edit]-->

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.add-states %}

### Respond to a Users Touch

Have you ever touched or clicked an element on a web page and questioned whether
the site actually detected you?

A simple color change not only helps people know that there action has been acknowledged, it makes your site feel snappy and responsive.

The fastest way to support touch in your UI is to simply support the
various states a DOM element can be in.

The states to handle are focus, active and hover, each of which are described below.

* Focus
  * When you tab through elements on a page, you are moving the focus from one
  element to the next. The focus state allows the user to know what element they
  are currently interacting with.

  ![Button with Focus State](images/btn-focus-state.png)

* Active
  * This is the state an element has when it's being selected, for example a 
  user clicking or touching an element.

  ![Button in Pressed State](images/btn-pressed-state.png)

* Hover
  * This state is entered when a is cursor placed over
    an element. Changes in UI on hover are helpful to encourage users to 
    interact with elements.

To change our UI for each of these states, we need to apply styles to the following
pseudo classes :hover, :focus and :active as shown below.

{% include_code _code/states-example.html btnstates css %}

The _outline: 0_ rule in the _:focus_ pseudo class removes a colored border which
some browsers add to focused elements.

![Image illustrating the different colors for button states](images/button-states.png)

### Cross Browser Tips

When mobile devices first launched a number of sites didn't have styling for
the active state. As a result many browsers add a highlight color or style change
to elements when a user touches them.

Safari and Chrome browsers add a tap highlight color which can be prevented
with the _-webkit-tap-highlight_color_ property.

{% include_code _code/states-example.html webkit-specific css %}

IE on Windows Phone has a similar behaviour, but you need to surpress it via a meta
tag.

{% include_code _code/states-example.html ms-specific html %}

For Firefox OS we needed to override a -moz-focus-inner class to remove an
outline on our element and if you are using a _<button>_ element you might want  
to set the _background-image_ to _none_ to remove a gradient added by their default styles.

{% include_code _code/states-example.html ff-specific css %}

### User Select

The last piece of the puzzle, some mobile browsers will select text if the user 
long presses on the screen. This can result in a bad user experience if they 
accidentally press down on a button for too long. You can prevent this from 
happening using the user-select property.

{% include_code _code/user-select-example.html user-select css %}

{% include modules/remember.liquid title="Important" list=page.important.user-select %}

## Touch events
<!-- Demo: http://jsbin.com/sozujute/latest/edit -->

### Receiving Touch Events

For full browser support there are two kinds of touch events you need to cater for.

Touch events are implemented on most mobile browsers apart from Windows Phone. The event names you need to implement are **touchstart**, **touchmove**, **touchend** and **touchcancel**.

For Windows Phone devices you need to support Pointer Events which are a new set of events which merges mouse and touch events into one set of callbacks. This is 
currently only supported in IE10+ with the events **MSPointerDown**, **MSPointerMove** and **MSPointerUp**.

For some situations you may find that you would like to support mouse interaction as well which you can do with mouse events, **mousedown**, **mousemove** and 
**mouseup**.

These events are the building blocks for adding new gestures into your application, below is a grouping of the event names and the description of when they are called.

#### touchstart, MSPointerDown, mousedown

When a finger first touches an element or when the user clicks down on the mouse

#### touchmove, MSPointerMove, mouse move

The user moves their finger across the screen or drags with the mouse

#### touchend, MSPointerUp, mouseup

When the user lifts their finger off of the screen or releases the mouse button

#### touchcancel

This is called when the browser cancels the touch gestures (for example the 
page beging to scrolls and browser no longer allows you to intercept the 
touch events).

### Using Touch Events

You hook these event names up through the **addEventListener()** method, as shown 
below.

{% include_code _code/touch-demo-1.html addlisteners javascript %}

This code first checks to see if **Pointer Events** are supported by testing 
for _window.navigator.msPointerEnabled_ and if they aren't, we add
listeners for touch and mouse events instead.

The **addEventListener()** method takes an event name (In our case one of 
_MSPointerDown_, _touchstart_ or _mousedown_), a callback function to call 
when the event occurs and a boolean which determines whether you should 
catch the event before or after other elements have had the opportunity 
to catch and interpret the events (true means we want the event before other 
elements).

#### Common Practices

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.common-practices %}

Depending on what you would like to do with touch, you're likely to fall into one of two camps

- I want the user to interact with one particular element
- I want the user to interact with multiple elements at the same time

There are trade offs to be had with both.

If the user will only be able to interact with one element, you
might want all touch events to be given to that one element, as long as 
the gesture initially started on the element itself.

For example, moving a finger off the swipable element can still control the element.

![Example GIF of touch on document](images/touch-document-level.gif)

If however you expect people to interact with multiple elements at the same time
(using multi-touch), you would want to restrict the touch to the specific element.

![Example GIF of touch on element](images/touch-element-level.gif)

Let's look at the first interaction, expecting the user to only touch one 
element.

##### Single Element Interaction

The steps taken to implement this are:

1. Add the start events listener to the element
2. Inside your touch start method, bind the move and end elements to the document
3. Handle the move events
4. On the end event, remove the move and end listeners from the docment

The reason for binding the move and end events to the document is so that we
receive all events regardless of whether they occur on the original element or not.

You can use the 'Show potential scroll bottlenecks' feature
in Chrome DevTools to show how the touch events behave.

![Illustrating Binding Touch Events to Document in touchstart](images/scroll-bottleneck.gif)

By adding the move and end event listeners only when the gesture has started on the 
element itself, the browser can check if the touch is in a region with a touch 
event listener and if it's not, can handle it faster than if the entire document 
had a touch listener causing the browser to call javascript and act accordingly.

Below is a snipplet of our _handleGestureStart_ method which adds the move and end events to the document.

{% include_code _code/touch-demo-1.html handle-start-gesture javascript %}

_handleGestureEnd_ removes the events from the document when the gesture has finished.

{% include_code _code/touch-demo-1.html handle-end-gesture javascript %}

Mouse events follow this same pattern since it's easy for a user to accidentally 
move the mouse outside of the element, which results in the move events no 
longer firing. By adding the move event to the document we overcome this and 
continue to get mouse move events.

##### Multiple Element Interaction

If you expect your users to use multiple elements at once, you can 
add the move and end events listeners directly to the elements
themselves.

This applies to touch only, for mouse interactions
you should continue to apply the _mousemove_ and _mouseup_ listeners to the 
document.

Since we only wish to track touches on a particular element, we can add the move 
and end listeners for touch and pointer events to element straight away.

{% include_code _code/touch-demo-2.html addlisteners javascript %}

In our _handleGestureStart_ and _handleGestureEnd_ function we add and remove
the mouse event listeners to the document, otherwise we carry on as normal.

{% include_code _code/touch-demo-2.html handle-gestures javascript %}

### How to Get the Touch Event Coordinates

For any of the start and move events you can easily extract x and y
from an event with the following code:

{%include_code _code/touch-demo-2.html extract-xy javascript %}

The above code first assumes the event is from a mouse, extracting _screenX_ and 
_screenY_. We then check to see if pointer events are supported, if so we get 
_clientX_ and _clientY_ from the event. If it's not, we check for _targetTouches_
and extract the first touch if the variable exists.

Touch events have a few different lists all containing touch data.

**evt.touches** is an list of all the current touches on the screen, regardless of 
what element that are on.

**evt.targetTouches** is the list of touches currently on the element the event was 
bound to. For example, binding to the document will give all touches in 
_targetTouches, if you bind to a button, you'll only get touches currently
on that button.

Finally, **evt.changedTouches** which contains the touches which changed resulting in the event being fired.

In most cases targetTouches will do everything you need.

Once you have the coordinates, what do you do with them?

### How to Efficiently Use Touch Events

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.touch-events %}

Since the event callbacks are fired on the main thread, we want to run 
as little code as possible in the callback to keep our frame rate high, 
preventing jank. The best practice is to make use of requestAnimationFrame's when 
altering the UI.

A typical implementation is to save the x and y coordinates from the start and
move events and request an animation frame in the move event callback.

In our demo we store the initial touch position in **handleGestureStart**.

{%include_code _code/touch-demo-2.html stash-start javascript %}

The **handleGestureMove** method stores the Y position before requesting an
animation frame if we need to, passing in our **onAnimFrame** function as 
the callback.

{%include_code _code/touch-demo-2.html handle-move javascript %}

It's in the **onAnimFrame** function that we change our UI to move the
elements around.

Initially we check to see if the gesture is still on-going to determine whether 
we should still animate or not, if so we use our initial and last Y positions 
to calculate the new transform for our element.

Once we've set the transform, we set the isAnimating variable to false so the
next touch event will request a new animation frame.

{%include_code _code/touch-demo-2.html on-anim-frame javascript %}

{% include modules/remember.liquid title="Important" list=page.important.touch-events-main-thread %}

## Touch-Action
<!-- demo http://jsbin.com/cekibuzo/1/edit -->

Touch-action allows you to define how an element reacts to touch in a more general
sense, without the need to implement touch event listeners.

The properties you can use are:

touch-action: [auto \| none \| pan-x \| pan-y]

Setting these properties will have the following affect:

- touch-action: auto
  - Will work as normal, touching will scroll horizontally and vertically if the browser allows it
- touch-action: none
  - No scrolling will be allowed on touch
- touch-action: pan-x
  - This will allow the horizontal scrolling, but disable verical scrolling
- touch-action: pan-y
  - This will perform the opposite of the pan-x and allow vertical scrolling only

In both of our examples, we use touch-action to filter all touch events to our
element:

{%include_code _code/touch-demo-1.html touch-action-example css %}

Pan-X and Pan-Y are great for being explicit in your intention that a user
should only ever scroll vertically or horizontally on an element.

{% endwrap %}
