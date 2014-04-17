---
layout: article
title: "Adding Touch to Your Site"
description: "Adding touch responses to your site gives a great sense of responsiveness and polish, with minimal amount of effort. Then we have entirely new and custom interactions which you can add using touch events, delighting your users."
introduction: "Touchscreens are available on more and more devices, ranging from phones up to desktop screens. To when the user chooses to interact with your UI, your app should respond to their touch, in simple and beautiful ways"
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
key-takeaways:
  add-states:
    - Use :active to make your site feel snappy and responsive.
    - :focus allows users to navigate your UI easily with keyboard input.
    - You can encourage users to interact with an element by using :hover to add changes.
    - Only override stateful styling when you add your own styles.
  touch-events:
    - Don't do any long running tasks inside an event callback
    - Use requestAnimationFrame's to change the UI in response to an event
  common-practices:
    - Ensure you handle mouse, touch and pointer events for full device support
    - Always add start event listeners to the element
    - If you want all events after the start, bind move and end listeners to the document
      - If you do this, then ensure you unbind from the document in the end listener
    - If you want to support multi-touch, either restrict move and end touch events to the element itself or handle all the touches yourself  
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

* Table of Contents
{:toc}

## Adding States

<!--
Demo: http://jsbin.com/siramabo/latest/edit
-->

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.add-states %}

### Respond to a Users Touch

Have you ever touched or clicked an element on a web page and questioned whether
the site actually detected you?

A simple color change not only helps people know that there action has been acknowledged, it makes your site feel snappy and responsive.

The fastest way to support touch in your UI is to simply support the
various states a DOM element can be in.

The states to handle are focus, active and hover, each of which are described below.

* Focus
  * If you interact with a webpage using a keyboard by hitting the tab key,
  you'll see some indication of which item you are focusing on.

  ![Button with Focus State](images/btn-focus-state.png)

* Active
  * This is the state when an element is being selected, for example a 
  user clicking or touching an element.

  ![Button in Pressed State](images/btn-pressed-state.png)

* Hover
    * This applies to scenarios where you have some form of cursor placed over
      an element. On hover changes are helpful to hint and encourage users to 
      interact with elements.

<!--
Demo: http://jsbin.com/kugenoza/1/edit
-->

To change our UI for an element we need to apply styles to the following
pseudo classes :hover, :focus and :active as shown below.

{% include_code _code/states-example.html btnstates css %}

![Image illustrating the different colors for button states](images/button-states.png)

<!-- [Image from: http://jsbin.com/siramabo/26/edit]-->

Without the outline rule, most user agents will display a colored border around your
focusable elements.

### Cross Browser Tips

When mobile devices first launched a number of sites didn't change styling for
the active state. As a result many browsers add a highlight color or style change
on elements when a user touches them.

Safari and Chrome browsers add a tap highlight color which can be prevented
with:

{% include_code _code/states-example.html webkit-specific css %}

Windows Phone has the same behaviour, but you need to surpress it via a meta
tag:

{% include_code _code/states-example.html ms-specific html %}

For Firefox OS we needed to override a -moz-focus-inner class to remove an
outline on our element and since we used a button we also set 
background-image to none to remove a gradient added by their default styles.

{% include_code _code/states-example.html ff-specific css %}

### User Select

Finally, some mobile browsers will select text if the user long presses on the screen, however this can result in a bad user experience if they accidentally press a button for too long. You can prevent this from happening using the user-select property.

{% include_code _code/user-select-example.html user-select css %}

{% include modules/remember.liquid title="Important" list=page.important.user-select %}

## Touch events
<!-- Demo: http://jsbin.com/sozujute/latest/edit -->

### Receiving Touch Events

For full browser support there are two kinds of events you need to cater for:

- Touch Events
  - Consist of **touchstart**, **touchmove**, **touchend** and **touchcancel**
- Mouse Events
  - If it makes sense you can add mouse support with **mousedown**, 
  **mousemove** and **mouseup**
- Pointer Events
  - A new set of events which merges mouse and touch events into one 
  set of events. This is currently only supported in IE10+ with the events: 
  **MSPointerDown**, **MSPointerMove** and **MSPointerUp**

These events are the building blocks for adding new gestures into your application, below is a description of when they are called.

#### touchstart, MSPointerDown, mousedown

When a finger first touches an element or when the user clicks down on the mouse

#### touchmove, MSPointerMove, mouse move

The user moves their finger across the screen or drags with the mouse

#### touchend, MSPointerUp, mouseup

When the user lifts their finger off of the screen or releases the mouse button

#### touchcancel

The browser cancels the touch gestures (for example the page scrolls and
browser no longer allows you to intercept the touch events)

### Using Touch Events

You hook these events up through the **addEventListener()** method on a DOM element
like so:

{% include_code _code/touch-demo-1.html addlisteners javascript %}

This code first checks if we can use **Pointer Events** by testing for _window.navigator.msPointerEnabled_ and if Pointer Events are not available, we add
listeners for touch and mouse events.

The **addEventListener()** method takes an event name (In our case one of _MSPointerDown_, _touchstart_ or _mousedown_), a callback function to call when the event happens and a boolean which determines whether you should catch the event before or after other elements have had the opportunity to catch and interpret the 
events (true means we want it before other elements).

#### Common Practices

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.common-practices %}

Depending on what you would like to do with touch, you're likely to fall into one of two camps

- I want the user to interact with one particular element
- I want the user to interact with multiple elements at the same time

There are trade offs to be had with both.

If the user will only be able to interact with one element on the screen, you
might want all touch events to be given to that one element, as long as the gesture started on the element itself.

For example, moving a finger off the swipable element can still control the element.

![Example GIF of touch on document](images/touch-document-level.gif)

If however you expect people to interact with multiple elements at the same time
(using multi-touch), you would want to restrict the touch to the specific element.

![Example GIF of touch on element](images/touch-element-level.gif)

Let's look at the first interaction, expecting the user to only touch one 
element.

##### Single Element Interaction

The steps to achieve this is are:

1. Add the start events to the element
2. Inside your touch start method, bind the move and end elements to the document
3. Handle the move events
4. On the end event, remove the move and end listeners from the docment

The reason for binding the move and end events to the document is so we
receive all events regardless of whether they occur on the element or not.

We add the listeners inside of the start listener as this allows the browser
to handle touches faster when they aren't on one of your elements.

In our example, _handleGestureStart_ adds events to the document.

{% include_code _code/touch-demo-1.html handle-start-gesture javascript %}

_handleGestureEnd_ removes the events from the document.

{% include_code _code/touch-demo-1.html handle-end-gesture javascript %}

Mouse events are following this same pattern,
the reason for this is that it's easy for a user to quickly move the mouse outside of
the element which results in the move events no longer firing, so adding the
move event to the document allows us to overcome this.

// TODO: Maybe add in video of DevTools with Scroll bottlenecks moving from 
element to body

##### Multiple Element Interaction

If you expect your users to use multiple elements at once, you can 
add the move and end events listeners directly to the elements
themselves.

This applies to touch only, for mouse interactions
you should continue to apply them to the documents as well since this avoids
the possibility of the mouse moving outside of the element.

Instead of adding just the start event listeners, we can add the move and end listeners for touch and pointer events.

{% include_code _code/touch-demo-2.html addlisteners javascript %}

In our _handleGestureStart_ and _handleGestureEnd_ function we add and remove
the mouse event listeners to the document, otherwise we carry on as normal.

{% include_code _code/touch-demo-2.html handle-gestures javascript %}

### How to Get the Touch Events Coordinates

For any of the start and move events you can easily extract x and y
from an event with the following code:

{%include_code _code/touch-demo-2.html extract-xy javascript %}

The above code first assumes the event is from a mouse, extracting _screenX_ and 
_screenY_. We then check to see if pointer events are supported, if so we get 
_clientX_ and _clientY_ from the event. If it's not, we check for _targetTouches_
and extract the first touch.

Touch events have a few different touch variables.

* evt.touches
  * touches is an array of all the current touches on the screen, regardless of
  what element that are one
* evt.targetTouches
  * targetTouches is the array of touches currently on the element the event was 
  bound to
* evt.changedTouches
  * changedTouches contains the touches which have changed resulting in the event being fired

targetTouches will cater for most use cases.

Once you have the coordinates, the question is how do you use them?

### How to Use the Touch Events

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.touch-events %}

Since the event callbacks are fired on the main thread, we want to run 
as little code as possible in the callback. The best practice is to use requestAnimationFrame to change the UI which you can call in the move events.

The common practice is to use the x and y coordinates in the start and
move gestures and start the requestionAnimationFrame in the move method.

Inside of **handleGestureStart** we store the initial touch position in our
object:

{%include_code _code/touch-demo-2.html stash-start javascript %}

The **handleGestureMove** method stores the Y value and we start a requestAnimationFrame if we need to, passing in our **onAnimFrame** function.

{%include_code _code/touch-demo-2.html handle-move javascript %}

It's in the **onAnimFrame** function that we change our UI to move the
elements around.

We firstly check if the gesture is still on-going to determine whether should still animate, if so we use our initial and last Y positions to figure out the new 
transform for out element.

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

Pan-X and Pan-Y are great for being explicit in your intention for what you
expect the interaction's to be like.

{% endwrap %}
