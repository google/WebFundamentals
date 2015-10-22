---
layout: shared/narrow-pages-list
title: "Device orientation"
description: "Device motion and orientation events provide access to the built in accelerometer, gyroscope, and compass in mobile devices."
published_on: 2014-06-17
updated_on: 2015-10-06
order: 4
authors:
  - petelepage
translation_priority: 1
notes:
  not-stable:
    - "Use <b>extreme</b> caution when deciding to use device motion or device orientation events.  Unfortunately not all browsers use the same coordinate system, and may report different values under identical situations."
---
<p class="intro">
  Device motion and orientation events provide access to the built in accelerometer, gyroscope, and compass in mobile devices.
</p>

These events can be used for many purposes; in gaming, for example, to control the direction or action of a character. When used with geolocation, they can help create more accurate turn-by-turn navigation or provide information about a specific location.

{% include shared/remember.liquid title="Warning" list=page.notes.not-stable %}

## Which end is up?

In order to use the data returned by the device orientation and motion events,
it is important to understand the values provided.  

### Earth coordinate frame

The Earth coordinate frame, described by the values `X`, `Y` and `Z`, are aligned
based on gravity and standard magnetic orientation.

<ul>
  <li>
    <b>X:</b> represents the east-west direction (where east is positive).
  </li>
    <li>
    <b>Y:</b> represents the north-south direction (where north is positive).
  </li>
    <li>
    <b>Z:</b> represents an up-down direction, perpendicular to the ground
    (where up is positive).
  </li>
</ul>

### Device coordinate frame

The device coordinate frame described by the values `x`, `y` and `z` are aligned
based on the center of the device.

<img src="images/axes.png" alt="illustration of device coordinate frame">
<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy)
  for his images which are in the public domain. -->

<ul>
  <li>
    <b>x:</b> in the plane of the screen, positive to the right.
  </li>
    <li>
    <b>y:</b> in the plane of the screen, positive towards the top.
  </li>
    <li>
    <b>z:</b> perpendicular to the screen or keyboard, positive extending
    away.
  </li>
</ul>

On a phone or tablet, the orientation of the device is based on the typical
orientation of the screen.  For phones and tablets, it is based on the device
being in portrait mode. For desktop or laptop computers, the orientation is
considered in relation to the keyboard.

### Rotation data

Rotation data is returned as a [Euler angle](https://en.wikipedia.org/wiki/Euler_angles),
representing the number of degrees of difference between the device's coordinate
frame and the Earth coordinate frame.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell-4--col">
    <img src="images/alpha.png"><br>
    <b>alpha:</b> The rotation around the z axis and is 0&deg; when the top of
    the device is pointed directly north.  As the device is rotated counter-clockwise
    the `alpha` value increases.
  </div>
  <div class="mdl-cell mdl-cell-4--col">
    <img src="images/beta.png"><br>
    <b>beta:</b> The rotation around the x axis and is 0&deg; when the top and
    bottom of the device are equidistant from the surface of the earth. The value
    increases as the top of the device is tipped toward the surface of the earth.
  </div>
  <div class="mdl-cell mdl-cell-4--col">
    <img src="images/gamma.png"><br>
    <b>gamma:</b> The rotation around the y axis and is 0&deg; when the left and
    right of the device are equidistant from the surface of the earth.  The value
    increases as the the right side is tipped towards the surface of the earth.
  </div>
</div>
