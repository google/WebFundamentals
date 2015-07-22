---
layout: article
title: "Device motion"
description: "Device motion provides information about force of acceleration
  being applied to the device at a given moment, and the rate of rotation."
introduction: "Device motion provides information about force of acceleration
  being applied to the device at a given moment, and the rate of rotation."
article:
  written_on: 2014-06-17
  updated_on: 2014-10-21
  order: 1
id: device-orientation
authors:
  - petelepage
priority: 1
collection: device-orientation
key-takeaways:
  devmotion: 
    -  Use device motion for when the current motion of the device is needed.
    -  <code>rotationRate</code> is provided in &deg;/sec.
    -  <code>acceleration</code> and <code>accelerationWithGravity</code> is
       provided in m/sec<sup>2</sup>.
    -  Be aware of differences between browser implementations.
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.devmotion %}

## When to use device motion events

There are several uses for device motion events.  For example:

<ul>
  <li>Shake gesture to refresh data.</li>
  <li>In games to cause characters to jump or move.</li>
  <li>For health and fitness apps</li>
</ul>

## Check for support and listen for events

To listen for `DeviceMotionEvent`s, first, check to see if the events are
supported in the browser.  Then, attach an event listener to the `window` 
object listening for `devicemotion` events. 

{% include_code _code/jump-test.html devmot javascript %}

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

<table class="table-4">
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

<table class="table-4">
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

{% include_code _code/jump-test.html devmothand javascript %}

After tapping the Go! button, the user is told to jump!  During that time,
the page stores the maximum (and minimum) acceleration values, and after the
jump, tells the user their maximum acceleration.

{% endwrap %}
