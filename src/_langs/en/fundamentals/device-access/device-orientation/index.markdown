---
layout: section
title: "Device Orientation"
description: "Device motion and orientation events provide access to the built in
  accelerometer, gyroscope and compass in mobile devices."
introduction: "Device motion and orientation events provide access to the built in
  accelerometer, gyroscope and compass in mobile devices."
article:
  written_on: 2014-06-17
  updated_on: 2014-10-21
  order: 4
id: device-orientation
collection: device-access
authors:
  - petelepage
priority: 1
remember:
  not-stable:
    - Use <b>extreme</b> caution when deciding to use device motion or
      device orientation events.  Unfortunately not all browsers use the
      same coordinate system, and may report different values under
      identical situations.
---
{% wrap content%}

These events can be used in for many purposes; for example in gaming to 
control the direction of character, or to determine how high a character 
should jump. When used with GeoLocation, it can create a more accurate 
turn-by-turn navigation system or provide information about where a store is.

{% include modules/remember.liquid title="Warning" list=page.remember.not-stable %}

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

Rotation data is returned as a [Euler angle](http://en.wikipedia.org/wiki/Euler_angles),
representing the number of degrees of difference between the device's coordinate
frame and the Earth coordinate frame.

<div>
  <div class="g--third">
    <img src="images/alpha.png"><br>
    <b>alpha:</b> The rotation around the z axis and is 0&deg; when the top of
    the device is pointed directly north.  As the device is rotated counter-clockwise
    the `alpha` value increases.
  </div>
  <div class="g--third">
    <img src="images/beta.png"><br>
    <b>beta:</b> The rotation around the x axis and is 0&deg; when the top and 
    bottom of the device are equidistant from the surface of the earth. The value
    increases as the top of the device is tipped toward the surface of the earth.
  </div>
  <div class="g--third g--last">
    <img src="images/gamma.png"><br>
    <b>gamma:</b> The rotation around the y axis and is 0&deg; when the left and
    right of the device are equidistant from the surface of the earth.  The value
    increases as the the right side is tipped towards the surface of the earth. 
  </div>
</div>

<div style="clear:both;"></div>


{% include modules/nextarticle.liquid %}

{% endwrap %}
