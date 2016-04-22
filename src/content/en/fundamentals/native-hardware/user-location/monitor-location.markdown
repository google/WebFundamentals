---
layout: shared/narrow
title: "Monitor the user's location"
description: "The Geolocation API lets you watch where the user is and keep tabs on them as they move around, always with the user's consent."
published_on: 2014-01-01
updated_on: 2016-04-22
order: 2
translation_priority: 1
authors:
  - paulkinlan
key-takeaways:
  geo: 
    - "Check for Compatibility before you use the API."
    - "Minimize the use of watching the user's location to save battery."
    - "Always handle errors."
---

<p class="intro">
  The Geolocation API lets you watch where the user is and keep tabs on them as they move 
  around, always with the user's consent.
</p>

**Note**: [As of Chrome 50, the Geolocation API will only work on secure contexts such as HTTPS](/web/updates/2016/04/geolocation-on-secure-contexts-only).
If your site is hosted on an non-secure origin (such as `HTTP`) the requests to get the users.
location will no longer function.

{% include shared/toc.liquid %}

The API is device-agnostic; it doesn't care how the browser determines
location, so long as clients can request and receive location data in a
standard way. The underlying mechanism might be via GPS, wifi. Since any of
these lookups is going to take some time, the API is asynchronous; you pass it
a callback method whenever you request a location.

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## When to use Geolocation to watch the user's location

*  You want to obtain a more precise lock on the user location.
*  Your application needs to update the user interface based on new location 
   information.
*  You applications needs to update business logic when the user enters a certain
   defined zone.

## Watching the users location

The Geolocation API allows you to obtain the user's location (with user
consent) with a single call to `getCurrentPosition()`.  

If you want to continually monitor the location of the user, the geolocation
API has a method called `watchPosition()`. It operates in a similar way to
`getCurrentPosition()` yet it will fire multiple times as the positioning
software:

1.  Gets a more accurate lock on the user.
2.  The user's position changes.
 
{% highlight javascript %}
var watchId = navigator.geolocation.watchPosition(function(position) {
  document.getElementById('currentLat').innerHTML = position.coords.latitude;
  document.getElementById('currentLon').innerHTML = position.coords.longitude;
});
{% endhighlight %}

## Always clear up and conserve battery

Watching for changes to a geolocation is not a free operation.  Whilst
operating systems might be introducing platform features to let applications
hook in to the geo subsystem, you as a web developer have no idea what support
the user's device has for monitoring the user's location and whilst you are watching
a position you are engaging the device in a lot of extra processing

Once you have no need to track the user's position call `clearWatch` to turn
off the geolocation systems.

## Always Handle Errors

Unfortunately, not all location lookups are successful. Perhaps a GPS could
not be located or the user has suddenly disabled location lookups. A second,
optional, argument to getCurrentPosition() will be called in the event of an
error, so you can notify the user inside the callback:

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.watchPosition(geoSuccess, geoError);
};
{% endhighlight %}


