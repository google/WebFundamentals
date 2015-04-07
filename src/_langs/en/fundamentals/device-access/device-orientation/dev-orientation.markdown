---
layout: article
title: "Device orientation"
description: "The device orientation event returns rotation data, 
  which includes how much the device is leaning front-to-back, 
  side-to-side and if the phone or laptop has a compass, the direction 
  the device is facing."
introduction: "The device orientation event returns rotation data, 
  which includes how much the device is leaning front-to-back, 
  side-to-side and if the phone or laptop has a compass, the direction 
  the device is facing."
article:
  written_on: 2014-06-17
  updated_on: 2014-10-21
  order: 1
priority: 1
id: device-orientation
authors:
  - petelepage
collection: device-orientation
key-takeaways:
  devorientation: 
    -  Use sparingly.
    -  Test for support.
    -  Don't update the UI on every orientation event; instead sync to requestAnimationFrame.
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.devorientation %}

## When to use device orientation events

There are several uses for device orientation events.  For example:

<ul>
  <li>Update a map as the user moves.</li>
  <li>Subtle UI tweaks, for example adding paralax effects.</li>
  <li>Combined with GeoLocation, can be used for turn by turn navigation.</li>
</ul>

## Check for support and listen for events

To listen for `DeviceOrientationEvent`, first, check to see if the events are
supported in the browser.  Then, attach an event listener to the `window` 
object listening for `deviceorientation` events. 

{% include_code _code/dev-orientation.html devori javascript %}

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


{% endwrap %}
