---
layout: shared/narrow
title: "Emulate Sensors: Geolocation &amp; Accelerometer"
description: "Touch screens, GPS chips, and accelerometers can be difficult to test since most desktops don't have them. The Chrome DevTools sensor emulators reduce the overhead of testing by emulating common mobile device sensors."
published_on: 2015-04-14
updated_on: 2016-03-08
order: 2
translation_priority: 1
authors:
  - megginkearney
  - pbakaus
key-takeaways:
  input:
    - "Emulate geolocation coordinates to test geolocation overrides."
    - "Simulate device orientation to test accelerometer data."
notes:
  sensors:
    - "If your app detects sensors onload using JavaScript (such as Modernizr), make sure that you reload the page after enabling sensor emulators."
---

<p class="intro">
  GPS chips and accelerometers can be difficult to test since most desktops don't have them. The Chrome DevTools Sensors emulation pane reduces the overhead of testing by emulating common mobile device sensors.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.input %}

## Access sensor controls

<div class="wf-devtools-flex">
  <div>
    <p>To access the Chrome DevTools sensor controls:</p>
    <ol>
      <li>Open the DevTools main menu, then</li>
      <li>Under <strong>More Tools</strong>, click on <strong>Sensors</strong></li>
    </ol>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/navigate-to-sensors.png" alt="Navigate to Sensors panel">
  </div>
</div>

{% include shared/remember.liquid title="Remember" list=page.notes.sensors %}

## Override geolocation data

Unlike desktops, mobile devices commonly use GPS hardware to detect location. In the Sensors pane, you can simulate geolocation coordinates to use with the <a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a>.

<div class="wf-devtools-flex">
  <div>
    <p>Enable the geolocation emulation by selecting the <strong>Emulate geolocation coordinates</strong> checkbox in the sensors pane of the emulation drawer.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-geolocation.png" alt="geolocation emulator enabled">
  </div>
</div>

You can use this emulator to override position values for `navigator.geolocation`, as well as to simulate cases when geolocation data is unavailable.

## Emulate Accelerometer (Device Orientation)

<div class="wf-devtools-flex">
  <div>
    <p>To test accelerometer data coming from the <a href='http://www.w3.org/TR/screen-orientation/'>Orientation API</a>, enable the accelerometer emulator by selecting the <strong>Accelerometer</strong> checkbox in the Sensors pane.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-accelerometer.png" alt="Accelerometer control">
  </div>
</div>

You can manipulate the following orientation parameters:

<dl>
<dt><abbr title="alpha">α</abbr></dt>
<dd>Rotation around the z-axis.</dd>
<dt><abbr title="beta">β</abbr></dt>
<dd>Left-to-right tilt.</dd>
<dt><abbr title="gamma">γ</abbr></dt>
<dd>Front-to-back tilt.</dd>
</dl>

You can also click and drag the model accelerometer to the desired orientation.

Try out the accelerometer emulator using this [device orientation demo](http://www.html5rocks.com/en/tutorials/device/orientation/deviceorientationsample.html).


