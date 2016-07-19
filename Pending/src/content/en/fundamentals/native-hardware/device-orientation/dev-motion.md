project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: The device orientation event returns rotation data, which includes how much the device is leaning front-to-back, side-to-side, and, if the phone or laptop has a compass, the direction the device is facing.

<p class="intro">
  The device orientation event returns rotation data, which includes how much the device is leaning front-to-back, side-to-side, and, if the phone or laptop has a compass, the direction the device is facing.
</p>


















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Use device motion for when the current motion of the device is needed.</li>
    
    <li><code>rotationRate</code> is provided in &deg;/sec.</li>
    
    <li><code>acceleration</code> and <code>accelerationWithGravity</code> is provided in m/sec<sup>2</sup>.</li>
    
    <li>Be aware of differences between browser implementations.</li>
    
  </ul>
  
</div>



## When to use device motion events

There are several uses for device motion events.  For example:

* Shake gesture to refresh data.
* In games to cause characters to jump or move.
* For health and fitness apps


## Check for support and listen for events

To listen for `DeviceMotionEvent`s, first, check to see if the events are
supported in the browser.  Then, attach an event listener to the `window` 
object listening for `devicemotion` events. 


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="k">if</span> <span class="p">(</span><span class="nb">window</span><span class="p">.</span><span class="nx">DeviceMotionEvent</span><span class="p">)</span> <span class="p">{</span>
  <span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&quot;devicemotion&quot;</span><span class="p">,</span> <span class="nx">deviceMotionHandler</span><span class="p">);</span>
  <span class="nx">setTimeout</span><span class="p">(</span><span class="nx">stopJump</span><span class="p">,</span> <span class="mi">3</span><span class="o">*</span><span class="mi">1000</span><span class="p">);</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/native-hardware/device-orientation/jump-test.html">Try full sample</a>
      </p>
  </div>



## Handle the device motion events

The device motion event fires on a regular interval and returns data about the
rotation (in &deg; per second) and acceleration (in m per second<sup>2</sup>)
of the device, at that moment in time.  Some devices do not have the hardware
to exclude the effect of gravity.

The event returns four properties, 
<a href="index.html#device-frame-coordinate">`accelerationIncludingGravity`</a>, 
<a href="index.html#device-frame-coordinate">`acceleration`</a>, 
which excludes the effects of gravity, 
<a href="index.html#rotation-data">`rotationRate`</a> and `interval`.

For example, let's take a look at a phone, lying on a flat table,
with its screen facing up.

<table class="mdl-data-table mdl-js-data-table">
  <colgroup>
    <col span="1">
    <col span="1">
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="State">State</th>
      <th data-th="Rotation">Rotation</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Acceleration (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Acceleration with gravity (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Not moving</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9.8]</td>
    </tr>
    <tr>
      <td data-th="State">Moving up towards the sky</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14.81]</td>
    </tr>
    <tr>
      <td data-th="State">Moving only to the right</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9.81]</td>
    </tr>
    <tr>
      <td data-th="State">Moving up &amp; to the right</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14.81]</td>
    </tr>
  </tbody>
</table>

Conversely, if the phone were held so the screen was perpendicular to the
ground, and was directly visible to the viewer:

<table class="mdl-data-table mdl-js-data-table">
  <colgroup>
    <col span="1">
    <col span="1">
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="State">State</th>
      <th data-th="Rotation">Rotation</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Acceleration (m/s<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Acceleration with gravity (m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Not moving</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Moving up towards the sky</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Moving only to the right</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Moving up &amp; to the right</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14.81, 0]</td>
    </tr>
  </tbody>
</table>

### Sample: Calculating the maximum acceleration of an object

One way to use  device motion events is to calculate the maximum acceleration
of an object.  For example, what's the maximum acceleration of a person 
jumping.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="k">if</span> <span class="p">(</span><span class="nx">evt</span><span class="p">.</span><span class="nx">acceleration</span><span class="p">.</span><span class="nx">x</span> <span class="o">&gt;</span> <span class="nx">jumpMax</span><span class="p">.</span><span class="nx">x</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">jumpMax</span><span class="p">.</span><span class="nx">x</span> <span class="o">=</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">acceleration</span><span class="p">.</span><span class="nx">x</span><span class="p">;</span>
<span class="p">}</span>
<span class="k">if</span> <span class="p">(</span><span class="nx">evt</span><span class="p">.</span><span class="nx">acceleration</span><span class="p">.</span><span class="nx">y</span> <span class="o">&gt;</span> <span class="nx">jumpMax</span><span class="p">.</span><span class="nx">y</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">jumpMax</span><span class="p">.</span><span class="nx">y</span> <span class="o">=</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">acceleration</span><span class="p">.</span><span class="nx">y</span><span class="p">;</span>
<span class="p">}</span>
<span class="k">if</span> <span class="p">(</span><span class="nx">evt</span><span class="p">.</span><span class="nx">acceleration</span><span class="p">.</span><span class="nx">z</span> <span class="o">&gt;</span> <span class="nx">jumpMax</span><span class="p">.</span><span class="nx">z</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">jumpMax</span><span class="p">.</span><span class="nx">z</span> <span class="o">=</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">acceleration</span><span class="p">.</span><span class="nx">z</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/native-hardware/device-orientation/jump-test.html">Try full sample</a>
      </p>
  </div>



After tapping the Go! button, the user is told to jump!  During that time,
the page stores the maximum (and minimum) acceleration values, and after the
jump, tells the user their maximum acceleration.


