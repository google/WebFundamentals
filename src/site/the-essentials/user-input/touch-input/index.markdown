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
important:
  touch-events-main-thread:
    - All touch events fire on the main thread
    - Be as quick as possible inside your callback
    - Use requestAnimationFrame to keep your site feeling fast
collection: user-input
---

{% wrap content%}

* Table of Contents
{:toc}

Have you ever touched or clicked an element on a web page and questioned whether
the site actually detected you?

In addition to helping people know that there action has been acknowledged,
giving touch feedback gives your site a snappy and responsive feel to it.

## Adding States

<!--
Demo: http://jsbin.com/siramabo/latest/edit
-->

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.add-states %}

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
but the user may wish to copy and paste to a different app, an example of
this is shown in the full example **MAKE FULL SAMPLE A  LINK TO CODE SAMPLE**.



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

{% include_code _code/touch-demo-1.html addlisteners javascript %}

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

{% include_code _code/touch-demo-1.html handle-start-gesture javascript %}

and handleGestureEnd removes them:

{% include_code _code/touch-demo-1.html handle-end-gesture javascript %}

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

For this we can add the touch event listeners on the element straight away:

{% include_code _code/touch-demo-2.html addlisteners javascript %}

Then in the handleGestureStart and handleGestureEnd we add the mouse event
listeners to the document, otherwise we carry on as normal.

{% include_code _code/touch-demo-2.html handle-gestures javascript %}

## How to Use the Touch Events

For any of the start and move events you can easily extract x and y
from an event with the following code:

{%include_code _code/touch-demo-2.html extract-xy javascript %}

Once you have the coordinates, the question is how do you use them?

{% include modules/remember.liquid title="Important" list=page.important.touch-events-main-thread %}

Since the event callbacks are fired on the main thread, we want to run 
as little code as possible in the callback. The best practice is to use requestAnimationFrame to change the UI when you need to.

The common practice is to use the x and y coordinates in the start and
move gestures and start the requestionAnimationFrame in the move method.

Inside of **handleGestureStart** we note the initial touch position:

{%include_code _code/touch-demo-2.html stash-start javascript %}

When **handleGestureMove** we store the Y value and start a requestAnimationFrame
if we need to, passing in our **onAnimFrame** function:

{%include_code _code/touch-demo-2.html handle-move javascript %}

It's in the **onAnimFrame** function that we change our UI to move the
elements around.

We firstly check if the gesture is still going on and we should still animate,
if so we use our initial and last Y positions to figure out the new Y transform.
Once we've set the transform, we set the isAnimating variable to false so on
the next touch event, a new requestAnimationFrame will be fired.

{%include_code _code/touch-demo-2.html on-anim-frame javascript %}

## Touch-Action
<!-- demo http://jsbin.com/cekibuzo/1/edit -->

Touch-action allows you to define how an element reacts to touch in a general
sense, without need to implement touch.

The properties you can use are:

touch-action: [auto | none | pan-x | pan-y]

Setting these properties will have the following affect:

- touch-action: auto
  - Will work as normal, touching will allow scroll horizontally and vertically
- touch-action: none
  - No scrolling will be allowed on touch
- touch-action: pan-x
  - This will allow the horizontal scrolling, but disable verical scrolling
- touch-action: pan-y
  - This will perform the opposite of the pan-x and allow vertical scrolling only

In both of our examples, we use touch-action to filter all touch events down on to
the element:

{%include_code _code/touch-demo-1.html touch-action-example css %}

Pan-X and Pan-Y are great for being explicit in your intention for what you
expect the interaction's to be like.

{% endwrap %}
