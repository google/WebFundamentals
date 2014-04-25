---
layout: article
title: "Add Touch to Your Site"
description: "Adding touch responses to your site gives a great sense of
  responsiveness and polish, with minimal amount of effort. Then we have
  entirely new and custom interactions which you can add using touch events,
  delighting your users."
introduction: "Touchscreens are available on more and more devices, ranging
  from phones up to desktop screens. When your users choose to interact with
  your UI, your app should respond to their touch in intuitive and beautiful
  ways."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
key-takeaways:
  add-states:
    - Make your site feel snappy and responsive&colon; change the UI for each state.
    - Don’t override a browser’s default responses to touch and focus unless you are
      implementing your own UI changes.
    - Disable text selection on elements user’s will touch, unless there’s
      a good reason why users might need to copy / select the text.
  touch-events:
    - For full device support, handle touch, mouse and MS Pointer Events.
    - Always bind start event listeners to the element itself.
    - If you want the user to interact with one particular element, bind your
      move and end listeners to the document; ensure you unbind them from
      the document in the end listener.
    - If you want to support multi-touch, either restrict move and end touch
      events to the element itself or handle all the touches on an element.
remember:
  disable-user-select:
    - You should be cautious not to disable user selection if the
      information on the element may be useful to the user (phone number,
      e-mail address, and so on).
  override-default:
    - Only override browser styles if you are implementing your own!
  touch-action:
    - Using <code>touch-action&colon; pan-x</code> or
      <code>touch-action&colon; pan-y</code> are great for being explicit in
      your intention that a user should only ever scroll vertically or
      horizontally on an element.
collection: user-input
---

{% wrap content%}

<!-- TODO[MATTGAUNT] add related items -->
<!-- TODO[MATTGAUNT] add what's next -->

{% include modules/toc.liquid %}

## Add touch states

### Use pseudo classes to change UI for each touch state

Have you ever touched or clicked an element on a web page and questioned
whether the site actually detected it?

The fastest way to support touch is to change the UI in response to a DOM
element’s change in state.  For example, a simple color change not only
helps people know that their action has been acknowledged, it makes your
site feel snappy and responsive.

DOM elements can be in default, focus, hover, and active states. To change
our UI for each of these states, we need to apply styles to the following
pseudo classes `:hover`, `:focus` and `:active` as shown below:

{% include_code _code/states-example.html btnstates css %}

See [Pseudo classes for touch states](#pseudo-classes-for-touch-states):

![Image illustrating the different colors for button states](images/button-states.png)

### Override default browser styles for touch states

Different browsers have implemented their own styles in response to user’s
touch. When you implement your own styles, you should also override these
browser styles.

{% include modules/remember.liquid title="Remember" list=page.remember.override-default %}

#### Override FireFoxOS style in default state

The Firefox `-moz-focus-inner` class includes an outline on touch elements.
You can remove this outline by setting the `border: 0`. Also, if you are
using a `<button>` element, you can set `background-image: none` to remove a
gradient added by their default styles:

{% include_code _code/states-example.html ff-specific css %}

#### Override browser styles in active state

When mobile devices first launched, a number of sites didn’t have styling for
the active state. As a result, many browsers add a highlight color or style
change to elements when a user touches them.

Safari and Chrome add a tap highlight color which can be prevented with the
`-webkit-tap-highlight-color` CSS property:

{% include_code _code/states-example.html webkit-specific css %}

Internet Explorer on Windows Phone has a similar behavior, but is suppressed
via a meta tag:

{% highlight html %}
<meta name="msapplication-tap-highlight" content="no" />
{% endhighlight %}

#### Override border color style in focus state

Suppress the border color when an element is focused using `outline: 0`:

{% highlight css %}
.btn:focus {
  outline: 0;
}
{% endhighlight %}

### Disable user-select on UI that responds to touch state

Some mobile browsers will select text if the user long presses on the screen.
This can result in a bad user experience if the user accidentally presses down
on a button for too long. You can prevent this from happening using the
`user-select` CSS property:

{% highlight css %}
-moz-user-select: none;
-webkit-user-select: none;
-ms-user-select: none;
user-select: none;
{% endhighlight %}

{% include modules/remember.liquid title="Remember" list=page.remember.disable-user-select %}

{% include modules/takeaway.liquid title="Key Takeaways" list=page.key-takeaways.add-states %}

## Respond to touch input using events

Depending on what you would like to do with touch, you’re likely to fall into
one of two camps:

- I want the user to interact with one particular element.
- I want the user to interact with multiple elements at the same time.

There are trade offs to be had with both.

If the user will only be able to interact with one element, you might want
all touch events to be given to that one element, as long as the gesture
initially started on the element itself. For example, moving a finger off
the swipable element can still control the element.

![Example GIF of touch on document](images/touch-document-level.gif)

If, however, you expect users to interact with multiple elements at the same
time (using multi-touch), you should restrict the touch to the specific
element.

![Example GIF of touch on element](images/touch-element-level.gif)

{% include modules/takeaway.liquid title="Key Takeaways" list=page.key-takeaways.touch-events %}

### Add event listeners

Touch events are implemented on most mobile browsers apart from Windows Phone.
The event names you need to implement are `touchstart`, `touchmove`,
`touchend` and `touchcancel`.

For Windows Phone devices, you need to support Pointer Events which are a
new set of events which merge mouse and touch events into one set of
callbacks. This is currently only supported in Internet Explorer 10+ with
the events `MSPointerDown`, `MSPointerMove`, and `MSPointerUp`.

For some situations, you may find that you would like to support mouse
interaction as well; which you can do with the mouse events:
`mousedown`, `mousemove`, and `mouseup`.

Touch, mouse and MS Pointer Events are the building blocks for adding new
gestures into your application (see [Touch, mouse and MS Pointer events](#touch-mouse-and-ms-pointer-events)).

Include these events in the `addEventListener()` method, along with the
event’s callback function and a boolean. The boolean determines whether you
should catch the event before or after other elements have had the
opportunity to catch and interpret the events (`true` means we want the event
before other elements):

{% include_code _code/touch-demo-1.html addlisteners javascript %}

This code first checks to see if Pointer Events are supported by testing for
`window.navigator.msPointerEnabled`. If they aren’t, we add listeners for
touch and mouse events instead.

### Handle single-element interaction

By adding the move and end event listeners only when the gesture has
started on the element itself, the browser can check if the touch is in a
region with a touch event listener and if it’s not, can handle it faster
than if the entire document had a touch listener causing the browser to call
javascript and act accordingly:

![Illustrating Binding Touch Events to Document in touchstart](images/scroll-bottleneck.gif)

The steps taken to implement this are:

1. Add the start events listener to the element.
1. Inside your touch start method, bind the move and end elements to the
   document. The reason for binding the move and end events to the
   document is so that we receive all events regardless of whether they
   occur on the original element or not.
1. Handle the move events.
1. On the end event, remove the move and end listeners from the document.

Below is a snippet of our `handleGestureStart` method which adds the move
and end events to the document:

{% include_code _code/touch-demo-1.html handle-start-gesture javascript %}

`handleGestureEnd` removes the events from the document when the gesture
has finished:

{% include_code _code/touch-demo-1.html handle-end-gesture javascript %}

Mouse events follow this same pattern since it’s easy for a user to
accidentally move the mouse outside of the element, which results in the move
events no longer firing. By adding the move event to the document, we
overcome this and continue to get mouse move events.

You can use the `"Show potential scroll bottlenecks"` feature in Chrome DevTools
to show how the touch events behave:

<img class="g-medium--1 g-medium--last g-wide--3" src="images/scroll-bottleneck-devtool.png" alt="Enable Scroll Bottleneck in DevTools" />

<div style="clear: both;"></div>

### Handle multi-element interaction

If you expect your users to use multiple elements at once, you can add the
move and end events listeners directly to the elements themselves. This
applies to touch only, for mouse interactions you should continue to apply
the `mousemove` and `mouseup` listeners to the document.

Since we only wish to track touches on a particular element, we can add the
move and end listeners for touch and pointer events to element straight away:

{% include_code _code/touch-demo-2.html addlisteners javascript %}

In our `handleGestureStart` and `handleGestureEnd` function, we add and
remove the mouse event listeners to the document, otherwise we carry on as
normal:

{% include_code _code/touch-demo-2.html handle-gestures javascript %}

## Implement responsive touch using `requestAnimationFrame`

Use `requestAnimationFrame` to keep your site fast and performant.

### Get and store touch event coordinates

For any of the start and move events, you can easily extract `x` and `y`
from an event.

For example, the following code snippet first assumes the event is from a
mouse, extracting `screenX` and `screenY`. It then checks to see if pointer
events are supported, and if so, gets `clientX` and `clientY` from the event.
If it’s not, the code checks for `targetTouches` and extracts the first
touch, if the variable exists:

{%include_code _code/touch-demo-2.html extract-xy javascript %}

Each touch event includes three lists containing touch data
(see also [Touch lists](#touch-lists)):

* `touches`: list of all current touches on the screen, regardless of DOM element they are on.
* `targetTouches`: list of touches currently on the DOM element the event is bound to.
* `changedTouches`: list of touches which changed resulting in the event being fired.

In most cases, `targetTouches` gives you everything you need.

### Request animation frame

Since the event callbacks are fired on the main thread, we want to run as
little code as possible in the callback to keep our frame rate high,
preventing jank. Use `requestAnimationFrame` to change the UI in response to
an event.

A typical implementation is to save the `x` and `y` coordinates from the
start and move events and request an animation frame in the move event
callback.

In our demo, we store the initial touch position in `handleGestureStart`:

{% include_code _code/touch-demo-1.html handle-start-gesture javascript %}

The `handleGestureMove` method stores the `y` position before requesting an
animation frame if we need to, passing in our `onAnimFrame` function as the
callback:

{%include_code _code/touch-demo-2.html handle-move javascript %}

### Transform touch event coordinates

It’s in the `onAnimFrame` function that we change our UI to move the
elements around. Initially we check to see if the gesture is still
on-going to determine whether we should still animate or not, if so we use
our initial and last y positions to calculate the new transform for our
element.

Once we’ve set the transform, we set the `isAnimating` variable to `false` so
the next touch event will request a new animation frame.

{%include_code _code/touch-demo-2.html on-anim-frame javascript %}

## Control scrolling using actions

The CSS property `touch-action` allows you control scrolling behavior on
touch (see [Touch actions](#touch-actions)). In our examples, we
use `touch-action: none` to disable scrolling on touch:

{%include_code _code/touch-demo-1.html touch-action-example css %}

## Reference

The definitive touch events reference can be found here:
[w3 Touch Events](http://www.w3.org/TR/touch-events/).

### Pseudo classes for touch states

<table class="table">
  <thead>
    <tr>
      <th>Class</th>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>:focus</code></td>
      <td>
        <img alt="Button with Focus State" src="images/btn-focus-state.png">
      </td>
      <td>
        When you tab through elements on a page, you are moving the focus
        from one element to the next. The focus state allows the user to
        know what element they are currently interacting with; also allows
        users to navigate your UI easily using a keyboard.
      </td>
    </tr>
    <tr>
      <td><code>:active</code></td>
      <td>
        <img alt="Button in Pressed State" src="images/btn-pressed-state.png">
      </td>
      <td>
        This is the state an element has when it's being selected, for
        example a user clicking or touching an element.
      </td>
    </tr>
    <tr>
      <td><code>:hover</code></td>
      <td><img alt="Button in Pressed State" src="images/btn-hover-state.png"></td>
      <td>
        This state is entered when a is cursor placed over an element.
        Changes in UI on hover are helpful to encourage users to interact
        with elements.
      </td>
    </tr>
  </tbody>
</table>

### Touch, mouse, and MS Pointer events

These events are the building blocks for adding new gestures into your
application:

<table class="table">
  <thead>
    <tr>
      <th>Touch, mouse, MS Pointer event</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>touchstart</code>,
        <code>mousedown</code>,
        <code>MSPointerDown</code>
      </td>
      <td>
        This is called when a finger first touches an element or when the
        user clicks down on the mouse.
      </td>
    </tr>
    <tr>
      <td>
        <code>touchmove</code>,
        <code>mousemove</code>,
        <code>MSPointerMove</code>
      </td>
      <td>
        This is called when the user moves their finger across the screen or
        drags with the mouse.
      </td>
    </tr>
    <tr>
      <td>
        <code>touchend</code>,
        <code>mouseup</code>,
        <code>MSPointerUp</code>
      </td>
      <td>
        This is called when the user lifts their finger off of the screen
        or releases the mouse.
      </td>
    </tr>
    <tr>
      <td>
        <code>touchcancel</code>
      </td>
      <td>
        This is called when the browser cancels the touch gestures.
      </td>
    </tr>
  </tbody>
</table>

### Touch lists

Each touch event includes three list attributes:

<table class="table">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>touches</code></td>
      <td>
        List of all current touches on the screen, regardless of elements
        being touched.
      </td>
    </tr>
    <tr>
      <td><code>targetTouches</code></td>
      <td>
        List of touches that started on the element that is the target of
        the current event. For example, if you bind to a <code>&lt;button&gt;</code>,
        you'll only get touches currently on that button. If you bind to the
        document, you'll get all touches currently on the document.
      </td>
    </tr>
    <tr>
      <td>changedTouches</td>
      <td>
        List of touches which changed resulting in the event being fired:
        <ul>
          <li>
            For the <code><a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">touchstart</a></code>
            event-- list of the touch points that just became active with the
            current event.
          </li>
          <li>
            For the <code><a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">touchmove</a></code>
            event-- list of the touch points that have moved since the last
            event.
          </li>
          <li>
            For the <code><a href="http://www.w3.org/TR/touch-events/#dfn-touchend">touchend</a></code>
            and <code><a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">touchcancel</a></code>
            events-- list of the touch points that have just been removed
            from the surface.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Touch actions

Control scrolling behavior by setting the `touch-action` property to one of
the following:

<table class="table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>touch-action: auto</code></td>
      <td>
        Scrolling works as normal, touching will scroll horizontally and
        vertically if the browser allows it.
      </td>
    </tr>
    <tr>
      <td><code>touch-action: none</code></td>
      <td>No scrolling allowed on touch.</td>
    </tr>
    <tr>
      <td><code>touch-action: pan-x</code></td>
      <td>Horizontal scrolling allowed; vertical scrolling disabled.</td>
    </tr>
    <tr>
      <td><code>touch-action: pan-y</code></td>
      <td>Vertical scrolling allowed; horizontal scrolling disabled.</td>
    </tr>
  </tbody>
</table>

{% include modules/remember.liquid title="Remember" list=page.remember.touch-action %}


<!-- Demo: http://jsbin.com/sozujute/latest/edit -->

<!-- demo http://jsbin.com/cekibuzo/1/edit -->


{% endwrap %}
