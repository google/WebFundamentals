project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Touchscreens are available on more and more devices,  from phones up to desktop screens. Your app should respond to their touch  in intuitive and beautiful ways.

{# wf_updated_on: 2014-01-06 #}
{# wf_published_on: 2014-01-01 #}

# Add Touch to Your Site {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rwc4fHUnGuU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Touchscreens are available on more and more devices, ranging from phones up to
desktop screens. When your users choose to interact with your UI, your app
should respond to their touch in intuitive and beautiful ways.

<div class="clearfix"></div>

## Respond to Element States

Have you ever touched or clicked an element on a web page and questioned
whether the site actually detected it?

Simply altering the color of an element as users touch or interact with parts
of your UI gives a basic reassurance that your site is working. Not only does
this alleviate frustration, but can also give a snappy and responsive feel.

DOM elements can inherit any of the following states, default, focus, hover
and active. To change our UI for each of these states, we need to apply styles
to the following pseudo classes `:hover`, `:focus` and `:active` as shown below:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/states-example.html" region_tag="btnstates" adjust_indentation="auto" %}
</pre>

![Image illustrating the different colors for button states](images/button-states.png)

On most mobile browsers *hover* and/or *focus* states will apply to an element
after it's been tapped.

Consider carefully what styles you set and how they will look to the user after
they finish their touch.

Note: Anchor tags and buttons may have different behavior in different browsers, so assume in some cases **hover** will remain and in others **focus** will remain.

### Suppressing Default Browser Styles

Once you add styles for the different states, you'll notice that most browsers
implement their own styles in response to a user’s touch. This is largely due
to the fact that when mobile devices first launched, a number of sites didn’t
have styling for the `:active` state. As a result, many browsers add additional
highlight color or style to give the user feedback.

Most browsers will use the `outline` CSS property to display a ring around an
element when an element is focused which you suppress with:

    .btn:focus {
      outline: 0;

      // Add replacement focus styling here (i.e. border)
    }

Safari and Chrome add a tap highlight color which can be prevented with the
`-webkit-tap-highlight-color` CSS property:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/states-example.html" region_tag="webkit-specific" adjust_indentation="auto" %}
</pre>

Internet Explorer on Windows Phone has a similar behavior, but is suppressed
via a meta tag:

    <meta name="msapplication-tap-highlight" content="no">

Firefox has two side effects to handle.

The `-moz-focus-inner` pseudo class which adds an outline on
touchable elements, which you can remove by setting `border: 0`.

If you are using a `<button>` element on Firefox, you get a gradient
applied, which you can remove by setting `background-image: none`.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/states-example.html" region_tag="ff-specific" adjust_indentation="auto" %}
</pre>

Caution: Only suppress the default styles mentioned above if you have pseudo classes for `:hover`, `:active` and `:focus`!

### Disabling user-select

If you are crafting an experience for touch you may want to make parts of
your UI which can't have text select, elements like buttons or form input.
You can do this by setting  the `user-select` CSS property, but beware that
doing this on content users want to select can be *extremely* infuriating
for users.

    user-select: none;

## Implement custom gestures

If you have an idea for custom interactions and gestures for your site, there
are two topics to keep in mind:

1. How to support the all browsers.
1. How to keep your frame rate high.

In this article, we'll look at exactly these topics covering the API's we need
to support to hit all browsers and then cover how we use these events
efficiently.

Depending on what you would like your gesture to do, you’re likely want the
user to interact with one element at a time *or* you'll want them to be able
to interact with multiple elements at the same time.

We are going to look at two examples in this article, both demonstrating
support for all browsers and how to keep frame rate high.

![Example GIF of touch on document](images/touch-document-level.gif){: .attempt-right }

The first example will allow the user to interact with one element. In this
case you might want all touch events to be given to that one element, as long
as the gesture initially started on the element itself. For example, moving a finger off
the swipe-able element can still control the element.

This is useful at it's allows a great deal of flexibility for the user, but
does enforce a restriction on how the user can interact with your UI.

<div class="clearfix"></div>

![Example GIF of touch on element](images/touch-element-level.gif){: .attempt-right }

If, however, you expect users to interact with multiple elements at the same
time (using multi-touch), you should restrict the touch to the specific
element.

This is more flexible for users, but does complicate the logic for manipulating
the UI and is less resilient to user error.

<div class="clearfix"></div>

### Add Event Listeners

In Chrome (version 55+) and Internet Explorer + Edge `PointerEvents` are
the recommended approach for implementing custom gestures.

In other browsers `TouchEvents` and `MouseEvents` are the approach to take..

The great feature of `PointerEvents` is that it merges multiple types of input,
including mouse, touch and pen events, into one set of
callbacks. The events to list for are `pointerdown`, `pointermove` and
`pointerup`.

The equivalent in other browsers are `touchstart`, `touchmove`,
`touchend` and `touchcancel` for touch events and if you wanted to implement
the same gesture for mouse input you'd need to implement `mousedown`,
`mousemove`, and `mouseup`.

If you ever get lost with want events to use, just check out this table of
[Touch, mouse and pointer events](#touch-mouse-and-pointer-events)).

Using these events requires calling the `addEventListener()` method on a DOM
element, along with the name of an event, a callback function and a boolean.
The boolean determines whether you should catch the event before or after
other elements have had the opportunity to catch and interpret the
events (`true` means we want the event before other elements).

Here's an example of listening for the start of an interaction.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-1.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

Note: PointerEvents only need a single pointerdown event to handle both mouse and touch events. This is due to the design of the API.

#### Handle Single-Element Interaction

In the short snippet of code above we only added the starting event listener,
this wasn't just to show you how to add the event listeners. for single
element gestures, this is the only event listener we add at first.

By adding the "move" and "end" event listeners *after* a gesture has
started, the browser can quickly check if the touch occurred in a
region with an event listener and if not, it can skips calling
any JavaScript, which can be a slow process.

The steps taken to implement this are:

1. Add the start events listener to an element.
1. Inside your start gesture callback, bind the move and end elements to the
   document. The reason for binding the move and end events to the
   document is so that we receive all events regardless of whether they
   occur on the original element or not.
1. Handle the move events.
1. On the end event, remove the move and end listeners from the document and
   end the gesture.

Below is a snippet of our `handleGestureStart` method which adds the move
and end events to the document:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

The end callback we add is `handleGestureEnd`, which removes the move
and end event listeners from the document when the gesture has finished like so:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-1.html" region_tag="handle-end-gesture" adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <p>By following this pattern of adding the move event to the document, if the
  user starts interacting with an element and moves their gesture outside of
  the element, we'll continue to get mouse movements regardless of where they
  are on the page, because the events are being received from the document.</p>

  <p>This diagram demonstrates what the touch events are doing as we add the
  *move* and *end* events to the document once a gesture begins.</p>
</div>

![Illustrating Binding Touch Events to Document in touchstart](images/scroll-bottleneck.gif)

<div class="clearfix"></div>


#### Handle Multi-Element Interaction

If you expect your users to use multiple elements at once, you can add the
move and end events listeners directly to the elements themselves. This
applies to touch only, for mouse interactions you should continue to apply
the `mousemove` and `mouseup` listeners to the document.

Since we only wish to track touches on a particular element, we can add the
move and end listeners for touch and pointer events to the element straight away:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-2.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

In our `handleGestureStart` and `handleGestureEnd` function, we add and
remove the mouse event listeners to the document.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-2.html" region_tag="handle-gestures" adjust_indentation="auto" %}
</pre>

### Responding to Touch Efficiently

Now that we have the start and end events taken care of we can actually respond to the touch events.

For any of the start and move events, you can easily extract `x` and `y`
from an event.

The following code snippet checks whether the event is from a `TouchEvent` by checking if `targetTouches` exists, if it does, then it extracts the `clientX` and `clientY` from the first touch.
If the event is a `PointerEvent` or `MouseEvent` we extract `clientX` and `clientY` directly from the event itself.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-2.html" region_tag="extract-xy" adjust_indentation="auto" %}
</pre>

A TouchEvent has three lists containing touch data:

* `touches`: list of all current touches on the screen, regardless of DOM element they are on.
* `targetTouches`: list of touches currently on the DOM element the event is bound to.
* `changedTouches`: list of touches which changed resulting in the event being fired.

In most cases, `targetTouches` gives you everything you need and want. (For
more info on these lists see [Touch lists](#touch-lists)).

#### Use requestAnimationFrame

Since the event callbacks are fired on the main thread, we want to run as
little code as possible in the callbacks for our events, keeping our frame
rate high and preventing jank.

Using `requestAnimationFrame` we have an opportunity to update the UI when
the browser is intending to draw a frame and will help us move some work out
of our event callbacks.

If you are unfamiliar with request animation frames, you
can [learn more here](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes),
but one way to think of `requestAnimationFrame` is that it is a way of changing
UI in a way that "works with the browser" rather than against.

A typical implementation is to save the `x` and `y` coordinates from the
start and move events and request an animation frame inside the move event
callback.

In our demo, we store the initial touch position in `handleGestureStart` (look for `initialTouchPos`):

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

The `handleGestureMove` method stores the position before requesting an
animation frame if we need to, passing in our `onAnimFrame` function as the
callback:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-1.html" region_tag="handle-move" adjust_indentation="auto" %}
</pre>

The `onAnimFrame` value is a function that when called, we change our UI
to move our UI around. By passing it into `requestAnimationFrame`, we are
telling the browser to call it just before it's about to update the page
(i.e. paint any changes to the page).

In the `handleGestureMove` callback we initially check if `rafPending` is false,
which indicates if `onAnimFrame` has been called by `requestAnimationFrame`
since the last move event. Since means we only have one `requestAnimationFrame`
waiting to run at any one time.

When our `onAnimFrame` callback is executed, we set the transform on any
elements we want to move before updating `rafPending` to `false`, allowing the
the next touch event to request a new animation frame.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-1.html" region_tag="on-anim-frame" adjust_indentation="auto" %}
</pre>

### Control Gestures using Touch Actions

The CSS property `touch-action` allows you to control the default touch
behavior of an element. In our examples, we use `touch-action: none` to
prevent the browser from doing anything with a users' touch, allowing us
to intercept all of the touch events.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-1.html" region_tag="touch-action-example" adjust_indentation="auto" %}
</pre>

`touch-action` allows you to disable gestures implemented by a browser.
For example, IE10+ supports a double-tap to zoom gesture. By setting a touch-action
of `pan-x | pan-y | manipulation` you prevent the default double-tap
behavior.

This allows you to implement a double-tap gesture yourself.

Below is a list of the available parameters for *touch-action*.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Touch Action Parameters</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>touch-action: auto</code></td>
      <td data-th="Description">
        The browser will add the normal touch interactions which it supports. For example, scrolling in the x-axis, scrolling in the y-axis, pinch zoom and double tap.
      </td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: none</code></td>
      <td data-th="Description">No touch interactions will be handled by the browser.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-x</code></td>
      <td data-th="Description">Only horizontal scrolling will be handled by the browser; vertical scrolling and gestures will be disabled.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-y</code></td>
      <td data-th="Description">Only vertical scrolling will be handled by the browser; horizontal scrolling and gestures will be disabled.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: manipulation</code></td>
      <td data-th="Description">Scrolling in both directions and pinch zooming will be handled by the browser; all other gesture will be ignored by the browser.</td>
    </tr>
  </tbody>
</table>


Note: Using <code>touch-action&colon; pan-x</code> or <code>touch-action&colon; pan-y</code> are great for being explicit in your intention that a user should only ever scroll vertically or horizontally on an element.

## Supporting for Older Versions of IE

If you want to support IE10, you'll need to handle vendor prefixed versions of
`PointerEvents`.


To check for support of `PointerEvents` you'd typically look for
`window.PointerEvent`, but in IE10, you'd look
`window.navigator.msPointerEnabled`.

The event names with vendor prefixes are: 'MSPointerDown', 'MSPointerUp' and
'MSPointerMove'.

Below is a snippet that demonstrates how to check for support and switch
the event names.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/touch/_code/touch-demo-1.html" region_tag="pointereventsupport" adjust_indentation="auto" %}
</pre>

For more information, checkout this [updates article from Microsoft](https://msdn.microsoft.com/en-us/library/dn304886(v=vs.85).aspx).

## Reference

### Pseudo Classes for Touch States

<table>
  <thead>
    <tr>
      <th>Class</th>
      <th>Example</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="Button in Pressed State" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        This state is entered when a is cursor placed over an element.
        Changes in UI on hover are helpful to encourage users to interact
        with elements.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="Button with Focus State" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        When you tab through elements on a page, you are moving the focus
        from one element to the next. The focus state allows the user to
        know what element they are currently interacting with; also allows
        users to navigate your UI easily using a keyboard.
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="Button in Pressed State" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        This is the state an element has when it's being selected, for
        example a user clicking or touching an element.
      </td>
    </tr>
  </tbody>
</table>


The definitive touch events reference can be found here:
[w3 Touch Events](http://www.w3.org/TR/touch-events/).

### Touch, Mouse, and Pointer events

These events are the building blocks for adding new gestures into your
application:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Touch, Mouse, Pointer Events</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event Names">
        <code>touchstart</code>,
        <code>mousedown</code>,
        <code>pointerdown</code>
      </td>
      <td data-th="Description">
        This is called when a finger first touches an element or when the
        user clicks down on the mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchmove</code>,
        <code>mousemove</code>,
        <code>pointermove</code>
      </td>
      <td data-th="Description">
        This is called when the user moves their finger across the screen or
        drags with the mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchend</code>,
        <code>mouseup</code>,
        <code>pointerup</code>
      </td>
      <td data-th="Description">
        This is called when the user lifts their finger off of the screen
        or releases the mouse.
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchcancel</code>
      </td>
      <td data-th="Description">
        This is called when the browser cancels the touch gestures.
      </td>
    </tr>
  </tbody>
</table>

### Touch Lists

Each touch event includes three list attributes:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Touch Event Attributes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>touches</code></td>
      <td data-th="Description">
        List of all current touches on the screen, regardless of elements
        being touched.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>targetTouches</code></td>
      <td data-th="Description">
        List of touches that started on the element that is the target of
        the current event. For example, if you bind to a <code>&lt;button&gt;</code>,
        you'll only get touches currently on that button. If you bind to the
        document, you'll get all touches currently on the document.
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>changedTouches</code></td>
      <td data-th="Description">
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

### Enabling Active State Support on iOS

Unfortunately, Safari on iOS does not apply the *active* state by default, to
get it working you need to add a `touchstart` event listener to the *document
body* or to each element.

You should do this behind a user agent test so it's only run on iOS devices.

Adding a touch start to the body has the advantage of applying to all elements
in the DOM, however this may have performance issues when scrolling the page.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
      }
    };


The alternative is to add the touch start listeners to all the interactable
elements in the page, alleviating some of the performance concerns.


    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        var elements = document.querySelectorAll('button');
        var emptyFunction = function() {};
        for(var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchstart', emptyFunction, false);
        }
      }
    };
