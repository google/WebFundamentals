---
layout: shared/narrow
title: "Device motion"
description: "The device orientation event returns rotation data, which includes how much the device is leaning front-to-back, side-to-side, and, if the phone or laptop has a compass, the direction the device is facing."
published_on: 2014-06-17
updated_on: 2015-10-06
order: 1
authors:
  - petelepage
translation_priority: 1
key-takeaways:
  devmotion: 
    -  "Use device motion for when the current motion of the device is needed."
    -  "<code>rotationRate</code> is provided in &deg;/sec."
    -  "<code>acceleration</code> and <code>accelerationWithGravity</code> is provided in m/sec<sup>2</sup>."
    -  "Be aware of differences between browser implementations."
---

<p class="intro">
  The device orientation event returns rotation data, which includes how much the device is leaning front-to-back, side-to-side, and, if the phone or laptop has a compass, the direction the device is facing.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devmotion %}

## When to use device motion events

There are several uses for device motion events.  For example:

* Shake gesture to refresh data.
* In games to cause characters to jump or move.
* For health and fitness apps


## Check for support and listen for events

To listen for `DeviceMotionEvent`s, first, check to see if the events are
supported in the browser.  Then, attach an event listener to the `window` 
object listening for `devicemotion` events. 

{% include_code src=_code/jump-test.html snippet=devmot lang=javascript %}

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

{% include_code src=_code/jump-test.html snippet=devmothand lang=javascript %}

After tapping the Go! button, the user is told to jump!  During that time,
the page stores the maximum (and minimum) acceleration values, and after the
jump, tells the user their maximum acceleration.

