project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Using touch events, you can create custom interactions for your UI. The question is how can you do this efficiently, keeping your frame rate high and your users happy.

<p class="intro">
  If you have an idea for custom interactions and gestures for your site, there are two topics to keep in mind: how to support the range of mobile browsers and how to keep your frame rate high. In this article, we'll look at exactly these topics.
</p>



## Respond to Touch Input Using Events

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
















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>For full device support, handle touch, mouse and Pointer Events.</li>
    
    <li>Always bind start event listeners to the element itself.</li>
    
    <li>If you want the user to interact with one particular element, bind your move and end listeners to the document in the touchstart method; ensure you unbind them from the document in the end listener.</li>
    
    <li>If you want to support multi-touch, either restrict move and end touch events to the element itself or handle all the touches on an element.</li>
    
  </ul>
  
</div>



### Add Event Listeners

Touch events and mouse events are implemented on most mobile browsers.

The event names you need to implement are `touchstart`, `touchmove`,
`touchend` and `touchcancel`.

For some situations, you may find that you would like to support mouse
interaction as well; which you can do with the mouse events:
`mousedown`, `mousemove`, and `mouseup`.

For Windows Touch devices, you need to support Pointer Events which are a
new set of events. Pointer Events merge mouse and touch events into one set of
callbacks. This is currently only supported in Internet Explorer 10+ with
the prefixed events `MSPointerDown`, `MSPointerMove`, and `MSPointerUp` and
in IE 11+ the unprefixed events `pointerdown`, `pointermove`, and `pointerup`.

Touch, mouse and Pointer Events are the building blocks for adding new
gestures into your application (see [Touch, mouse and Pointer events](#touch-mouse-and-pointer-events)).

Include these event names in the `addEventListener()` method, along with the
event’s callback function and a boolean. The boolean determines whether you
should catch the event before or after other elements have had the
opportunity to catch and interpret the events (`true` means we want the event
before other elements).


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="c1">// Check if pointer events are supported.</span>
<span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Add Pointer Event Listener</span>
  <span class="nx">swipeFrontElement</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="nx">pointerDownName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
  <span class="c1">// Add Touch Listener</span>
  <span class="nx">swipeFrontElement</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchstart&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>

  <span class="c1">// Add Mouse Listener</span>
  <span class="nx">swipeFrontElement</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;mousedown&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-1.html">Try full sample</a>
      </p>
  </div>



This code first checks to see if Pointer Events are supported by testing for
`window.PointerEventsSupport`, if Pointer Events aren’t supported, we add listeners for
touch and mouse events instead.

The value `window.PointerEventSupport` is determined by looking for the
existence of `window.PointerEvent` or the now deprecated
`window.navigator.msPointerEnabled` objects. If they are supported we use
varibles for event names, which use the prefixed or unprefixed versions depending
on the existence of `window.PointerEvent`.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="kd">var</span> <span class="nx">pointerDownName</span> <span class="o">=</span> <span class="s1">&#39;MSPointerDown&#39;</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">pointerUpName</span> <span class="o">=</span> <span class="s1">&#39;MSPointerUp&#39;</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">pointerMoveName</span> <span class="o">=</span> <span class="s1">&#39;MSPointerMove&#39;</span><span class="p">;</span>

<span class="k">if</span><span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEvent</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">pointerDownName</span> <span class="o">=</span> <span class="s1">&#39;pointerdown&#39;</span><span class="p">;</span>
  <span class="nx">pointerUpName</span> <span class="o">=</span> <span class="s1">&#39;pointerup&#39;</span><span class="p">;</span>
  <span class="nx">pointerMoveName</span> <span class="o">=</span> <span class="s1">&#39;pointermove&#39;</span><span class="p">;</span>
<span class="p">}</span>

<span class="c1">// Simple way to check if some form of pointerevents is enabled or not</span>
<span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
<span class="k">if</span><span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEvent</span> <span class="o">||</span> <span class="nb">window</span><span class="p">.</span><span class="nx">navigator</span><span class="p">.</span><span class="nx">msPointerEnabled</span><span class="p">)</span> <span class="p">{</span>
  <span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-1.html">Try full sample</a>
      </p>
  </div>



### Handle Single-Element Interaction

In the short snippet of code above you may have noticed that we only add the starting event listener, this is a conscious decision.

By adding the move and end event listeners once the gesture has
started on the element itself, the browser can check if the touch occured in a
region with a touch event listener and if it’s not, can handle it faster
by not having to run any additional javascript.

The steps taken to implement this are:

1. Add the start events listener to an element.
1. Inside your touch start method, bind the move and end elements to the
   document. The reason for binding the move and end events to the
   document is so that we receive all events regardless of whether they
   occur on the original element or not.
1. Handle the move events.
1. On the end event, remove the move and end listeners from the document.

Below is a snippet of our `handleGestureStart` method which adds the move
and end events to the document:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="c1">// Handle the start of gestures</span>
<span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">evt</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>

  <span class="k">if</span><span class="p">(</span><span class="nx">evt</span><span class="p">.</span><span class="nx">touches</span> <span class="o">&amp;&amp;</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">touches</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="c1">// Add the move and end listeners</span>
  <span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Pointer events are supported.</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="nx">pointerMoveName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="nx">pointerUpName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
    <span class="c1">// Add Touch Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchmove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchend&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchcancel&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>

    <span class="c1">// Add Mouse Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;mousemove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;mouseup&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="nx">initialTouchPos</span> <span class="o">=</span> <span class="nx">getGesturePointFromEvent</span><span class="p">(</span><span class="nx">evt</span><span class="p">);</span>

  <span class="nx">swipeFrontElement</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">transition</span> <span class="o">=</span> <span class="s1">&#39;initial&#39;</span><span class="p">;</span>
<span class="p">}.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">);</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-1.html">Try full sample</a>
      </p>
  </div>



The end callback we add is `handleGestureEnd` which removes the move
and end events from the document when the gesture has finished:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="c1">// Handle end gestures</span>
<span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">evt</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>

  <span class="k">if</span><span class="p">(</span><span class="nx">evt</span><span class="p">.</span><span class="nx">touches</span> <span class="o">&amp;&amp;</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">touches</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nx">isAnimating</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>

  <span class="c1">// Remove Event Listeners</span>
  <span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Remove Pointer Event Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="nx">pointerMoveName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="nx">pointerUpName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
    <span class="c1">// Remove Touch Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="s1">&#39;touchmove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="s1">&#39;touchend&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="s1">&#39;touchcancel&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>

    <span class="c1">// Remove Mouse Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="s1">&#39;mousemove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="s1">&#39;mouseup&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="nx">updateSwipeRestPosition</span><span class="p">();</span>
<span class="p">}.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">);</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-1.html">Try full sample</a>
      </p>
  </div>



Mouse events follow this same pattern since it’s easy for a user to
accidentally move the mouse outside of the element, which results in the move
events no longer firing. By adding the move event to the document, we'll continue to get mouse movements regardless of where they are on the page.

You can use the
[Show potential scroll bottlenecks](https://developer.chrome.com/devtools/docs/rendering-settings#show-potential scroll bottlenecks)
feature in Chrome DevTools to show how the touch events behave:

<img src="images/scroll-bottleneck-devtool.png" alt="Enable Scroll Bottleneck in DevTools">

With this enabled you can see where touch events are bound and ensure your logic for adding
and removing listeners is working as you'd expect.

![Illustrating Binding Touch Events to Document in touchstart](images/scroll-bottleneck.gif)

<div style="clear: both;"></div>

### Handle Multi-Element Interaction

If you expect your users to use multiple elements at once, you can add the
move and end events listeners directly to the elements themselves. This
applies to touch only, for mouse interactions you should continue to apply
the `mousemove` and `mouseup` listeners to the document.

Since we only wish to track touches on a particular element, we can add the
move and end listeners for touch and pointer events to the element straight away:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="c1">// Check if pointer events are supported.</span>
<span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Add Pointer Event Listener</span>
  <span class="nx">elementHold</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="nx">pointerDownName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="nx">elementHold</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="nx">pointerMoveName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="nx">elementHold</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="nx">pointerUpName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
  <span class="c1">// Add Touch Listeners</span>
  <span class="nx">elementHold</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchstart&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="nx">elementHold</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchmove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="nx">elementHold</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchend&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="nx">elementHold</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchcancel&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>

  <span class="c1">// Add Mouse Listeners</span>
  <span class="nx">elementHold</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;mousedown&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-2.html">Try full sample</a>
      </p>
  </div>



In our `handleGestureStart` and `handleGestureEnd` function, we add and
remove the mouse event listeners to the document.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="c1">// Handle the start of gestures</span>
<span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">evt</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>

          <span class="kd">var</span> <span class="nx">point</span> <span class="o">=</span> <span class="nx">getGesturePointFromEvent</span><span class="p">(</span><span class="nx">evt</span><span class="p">);</span>
  <span class="nx">initialYPos</span> <span class="o">=</span> <span class="nx">point</span><span class="p">.</span><span class="nx">y</span><span class="p">;</span>

  <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Add Mouse Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;mousemove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;mouseup&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="p">}</span>
<span class="p">}.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">);</span>

<span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">evt</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>

  <span class="k">if</span><span class="p">(</span><span class="nx">evt</span><span class="p">.</span><span class="nx">targetTouches</span> <span class="o">&amp;&amp;</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">targetTouches</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Remove Mouse Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="s1">&#39;mousemove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">removeEventListener</span><span class="p">(</span><span class="s1">&#39;mouseup&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="nx">isAnimating</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
  <span class="nx">lastHolderPos</span> <span class="o">=</span> <span class="nx">lastHolderPos</span> <span class="o">+</span> <span class="o">-</span><span class="p">(</span><span class="nx">initialYPos</span> <span class="o">-</span> <span class="nx">lastYPos</span><span class="p">);</span>
<span class="p">}.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">);</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-2.html">Try full sample</a>
      </p>
  </div>



## Responding to Touch Efficiently

Now that we have the start and end events taken care of we can actually respond to the touch events.

### Get and Store Touch Event Coordinates

For any of the start and move events, you can easily extract `x` and `y`
from an event.

The following code snippet checks whether the event is from a touch event by looking for `targetTouches`, if it is then it extracts the `clientX` and `clientY` from the first touch. If the event is a mouse or pointer event then we extract `clientX` and `clientY` directly from the event itself.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="kd">function</span> <span class="nx">getGesturePointFromEvent</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">point</span> <span class="o">=</span> <span class="p">{};</span>

    <span class="k">if</span><span class="p">(</span><span class="nx">evt</span><span class="p">.</span><span class="nx">targetTouches</span><span class="p">)</span> <span class="p">{</span>
      <span class="c1">// Prefer Touch Events</span>
      <span class="nx">point</span><span class="p">.</span><span class="nx">x</span> <span class="o">=</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">targetTouches</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">clientX</span><span class="p">;</span>
      <span class="nx">point</span><span class="p">.</span><span class="nx">y</span> <span class="o">=</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">targetTouches</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">clientY</span><span class="p">;</span>
    <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
      <span class="c1">// Either Mouse event or Pointer Event</span>
      <span class="nx">point</span><span class="p">.</span><span class="nx">x</span> <span class="o">=</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">clientX</span><span class="p">;</span>
      <span class="nx">point</span><span class="p">.</span><span class="nx">y</span> <span class="o">=</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">clientY</span><span class="p">;</span>
    <span class="p">}</span>

    <span class="k">return</span> <span class="nx">point</span><span class="p">;</span>
  <span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-2.html">Try full sample</a>
      </p>
  </div>



Each touch event has three lists containing touch data
(see also [Touch lists](#touch-lists)):

* `touches`: list of all current touches on the screen, regardless of DOM element they are on.
* `targetTouches`: list of touches currently on the DOM element the event is bound to.
* `changedTouches`: list of touches which changed resulting in the event being fired.

In most cases, `targetTouches` gives you everything you need.

### requestAnimationFrame

Since the event callbacks are fired on the main thread, we want to run as
little code as possible in the callback to keep our frame rate high,
preventing jank.

Use `requestAnimationFrame` to change the UI in response to
an event. This gives you an opportunity to update the UI when the browser is intending to draw a frame and will help you move some work out of your callback.

If you are unfamiliar with request animation frames, you can [learn more here](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes).

A typical implementation is to save the `x` and `y` coordinates from the
start and move events and request an animation frame in the move event
callback.

In our demo, we store the initial touch position in `handleGestureStart`:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="c1">// Handle the start of gestures</span>
<span class="k">this</span><span class="p">.</span><span class="nx">handleGestureStart</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">evt</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>

  <span class="k">if</span><span class="p">(</span><span class="nx">evt</span><span class="p">.</span><span class="nx">touches</span> <span class="o">&amp;&amp;</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">touches</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="c1">// Add the move and end listeners</span>
  <span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">PointerEventsSupport</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Pointer events are supported.</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="nx">pointerMoveName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="nx">pointerUpName</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
    <span class="c1">// Add Touch Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchmove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchend&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;touchcancel&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>

    <span class="c1">// Add Mouse Listeners</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;mousemove&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureMove</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;mouseup&#39;</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">handleGestureEnd</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
  <span class="p">}</span>

  <span class="nx">initialTouchPos</span> <span class="o">=</span> <span class="nx">getGesturePointFromEvent</span><span class="p">(</span><span class="nx">evt</span><span class="p">);</span>

  <span class="nx">swipeFrontElement</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">transition</span> <span class="o">=</span> <span class="s1">&#39;initial&#39;</span><span class="p">;</span>
<span class="p">}.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">);</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-1.html">Try full sample</a>
      </p>
  </div>



The `handleGestureMove` method stores the `y` position before requesting an
animation frame if we need to, passing in our `onAnimFrame` function as the
callback:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="kd">var</span> <span class="nx">point</span> <span class="o">=</span> <span class="nx">getGesturePointFromEvent</span><span class="p">(</span><span class="nx">evt</span><span class="p">);</span>
<span class="nx">lastYPos</span> <span class="o">=</span> <span class="nx">point</span><span class="p">.</span><span class="nx">y</span><span class="p">;</span>

  <span class="k">if</span><span class="p">(</span><span class="nx">isAnimating</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nx">isAnimating</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span>
  <span class="nb">window</span><span class="p">.</span><span class="nx">requestAnimFrame</span><span class="p">(</span><span class="nx">onAnimFrame</span><span class="p">);</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-2.html">Try full sample</a>
      </p>
  </div>



It’s in the `onAnimFrame` function that we change our UI to move the
elements around. Initially we check to see if the gesture is still
on-going to determine whether we should still animate or not, if so we use
our initial and last y positions to calculate the new transform for our
element.

Once we’ve set the transform, we set the `isAnimating` variable to `false` so
the next touch event will request a new animation frame.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="kd">function</span> <span class="nx">onAnimFrame</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nx">isAnimating</span><span class="p">)</span> <span class="p">{</span>
      <span class="k">return</span><span class="p">;</span>
    <span class="p">}</span>

    <span class="kd">var</span> <span class="nx">newYTransform</span> <span class="o">=</span> <span class="nx">lastHolderPos</span> <span class="o">+</span> <span class="o">-</span><span class="p">(</span><span class="nx">initialYPos</span> <span class="o">-</span> <span class="nx">lastYPos</span><span class="p">);</span>

    <span class="nx">newYTransform</span> <span class="o">=</span> <span class="nx">limitValueToSlider</span><span class="p">(</span><span class="nx">newYTransform</span><span class="p">);</span>

    <span class="kd">var</span> <span class="nx">transformStyle</span> <span class="o">=</span> <span class="s1">&#39;translateY(&#39;</span><span class="o">+</span><span class="nx">newYTransform</span><span class="o">+</span><span class="s1">&#39;px)&#39;</span><span class="p">;</span>
    <span class="nx">elementHold</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">msTransform</span> <span class="o">=</span> <span class="nx">transformStyle</span><span class="p">;</span>
    <span class="nx">elementHold</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">MozTransform</span> <span class="o">=</span> <span class="nx">transformStyle</span><span class="p">;</span>
    <span class="nx">elementHold</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">webkitTransform</span> <span class="o">=</span> <span class="nx">transformStyle</span><span class="p">;</span>
    <span class="nx">elementHold</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">transform</span> <span class="o">=</span> <span class="nx">transformStyle</span><span class="p">;</span>

    <span class="nx">isAnimating</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span>
  <span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-2.html">Try full sample</a>
      </p>
  </div>



## Control Gestures using Touch Actions

The CSS property `touch-action` allows you to control the default touch
behavior of an element. In our examples, we use `touch-action: none` to
prevent the browser from doing anything with a users' touch, allowing us
to intercept all of the touch events.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="c">/* Pass all touches to javascript */</span>
<span class="nt">-ms-touch-action</span><span class="o">:</span> <span class="nt">none</span><span class="o">;</span>
<span class="nt">touch-action</span><span class="o">:</span> <span class="nt">none</span><span class="o">;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/touch/touch-demo-1.html">Try full sample</a>
      </p>
  </div>



`touch-action` allows you to disable gestures implemented by a browser.
For example, IE10+ supports a double-tap to zoom gesture. By setting a touch-action
of `pan-x | pan-y | manipulation` you prevent the default double-tap
behavior.

This allows you to implement a double-tap gesture yourself.
In the case of IE10+, it also eliminates the 300ms click delay.

Below is a list of the available parameters for *touch-action*.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
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




















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Remember</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Using <code>touch-action&colon; pan-x</code> or <code>touch-action&colon; pan-y</code> are great for being explicit in your intention that a user should only ever scroll vertically or horizontally on an element.</li>
    
  </ul>
  
</div>



## Reference

The definitive touch events reference can be found here:
[w3 Touch Events](http://www.w3.org/TR/touch-events/).

### Touch, Mouse, and Pointer events

These events are the building blocks for adding new gestures into your
application:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Touch, Mouse, Pointer Events</th>
      <th>Description</th>
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

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Description</th>
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



