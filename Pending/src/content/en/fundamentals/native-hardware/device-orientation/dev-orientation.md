project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: The device orientation event returns rotation data,  which includes how much the device is leaning front-to-back, side-to-side and if the phone or laptop has a compass, the direction the device is facing.

<p class="intro">
  The device orientation event returns rotation data,  which includes how much the device is leaning front-to-back, side-to-side and if the phone or laptop has a compass, the direction the device is facing.
</p>



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## When to use device orientation events

There are several uses for device orientation events.  For example:

* Update a map as the user moves.
* Subtle UI tweaks, for example adding paralax effects.
* Combined with GeoLocation, can be used for turn by turn navigation.

## Check for support and listen for events

To listen for `DeviceOrientationEvent`, first, check to see if the events are
supported in the browser.  Then, attach an event listener to the `window` 
object listening for `deviceorientation` events. 


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">DeviceOrientationEvent</span><span class="p">)</span> <span class="p">{</span>
  <span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;deviceorientation&#39;</span><span class="p">,</span> <span class="nx">deviceOrientationHandler</span><span class="p">,</span> <span class="kc">false</span><span class="p">);</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s2">&quot;doeSupported&quot;</span><span class="p">).</span><span class="nx">innerText</span> <span class="o">=</span> <span class="s2">&quot;&quot;</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/native-hardware/device-orientation/dev-orientation.html">Try full sample</a>
      </p>
  </div>



## Handle the device orientation events

The device orientation event fires when the device moves, or changes 
orientation.  It returns data about the difference between the device in 
its current position in relation to the <a href="index.html#earth-coordinate-frame">
Earth coordinate frame</a>.

The event typically returns three properties, 
<a href="index.html#rotation-data">`alpha`</a>, 
<a href="index.html#rotation-data">`beta`</a>, and 
<a href="index.html#rotation-data">`gamma`</a>.  On Mobile Safari, and
additional parameter <a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a> is returned with the compass
heading.



