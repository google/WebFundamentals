


<p class="intro">
  The device orientation event returns rotation data,  which includes how much the device is leaning front-to-back, side-to-side and if the phone or laptop has a compass, the direction the device is facing.
</p>



{% include shared/takeaway.liquid list=page.key-takeaways.devorientation %}

## When to use device orientation events

There are several uses for device orientation events.  For example:

* Update a map as the user moves.
* Subtle UI tweaks, for example adding paralax effects.
* Combined with GeoLocation, can be used for turn by turn navigation.

## Check for support and listen for events

To listen for `DeviceOrientationEvent`, first, check to see if the events are
supported in the browser.  Then, attach an event listener to the `window` 
object listening for `deviceorientation` events. 

{% include_code src=_code/dev-orientation.html snippet=devori lang=javascript %}

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





