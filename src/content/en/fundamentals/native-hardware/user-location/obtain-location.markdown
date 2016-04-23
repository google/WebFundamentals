---
layout: shared/narrow
title: "Obtain the user's current location"
description: "The Geolocation API lets you find out where the user is, always with the user's consent."
published_on: 2014-06-06
updated_on: 2016-04-22
order: 1
translation_priority: 1
authors:
  - paulkinlan
key-takeaways:
  geo: 
    - "Check for Compatibility before you use the API."
    - "Prefer a coarse location over a fine location."
    - "Always handle errors."
    - "Don't poll for the data too frequently to save the user's battery."
---

<p class="intro">
  The Geolocation API lets you find out where the user is, with the user's consent. 
  The API is device-agnostic; it doesn't care how the browser determines
  location, so long as clients can request and receive location data in a
  standard way. The underlying mechanism might be via GPS, wifi, or simply
  asking the user to enter their location manually. Since any of these lookups
  is going to take some time, the API is asynchronous; you pass it a callback
  method whenever you request a location.
</p>

**Note**: [As of Chrome 50, the Geolocation API will only work on secure contexts such as HTTPS](/web/updates/2016/04/geolocation-on-secure-contexts-only).
If your site is hosted on an non-secure origin (such as `HTTP`) the requests to get the users.
location will no longer function.


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}


## When to use Geolocation

*  Find where the user is closest to a physical location of yours to tailor 
   the user experience.
*  Tailor information (such as news) to the user's location.
*  Show the position of a user on a map.
*  Tag data created inside your application with the user's location 
   (i.e, geo-tagging a picture).


## Check for Compatibility

The geolocation API is now supported in the majority of browsers, but it is
good practice to always check for support before you do anything.

You can easily check for compatibility by testing for the presence of the
geolocation object:

{% highlight javascript %}
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
{% endhighlight %}

## Determine the User's Current Location

The geolocation API offers a simple 'one-shot' method to obtain the user's
location  `getCurrentPosition()`.  A call to this method will asynchronously
report on the user's  current location.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
{% endhighlight %}

If this is the first time an application on this domain has requested
permissions, the browser will typically check for user consent. Depending on
the browser, there may also be preferences to always allow - or disallow -
permission lookups, in which case the confirmation process will be bypassed.

Depending on the location device your browser is using, the position object
might actually contain a lot more than just latitude and longitude, for example, it could include an altitude or a direction.  You can't tell what extra information that location system will use until it actually returns the data.

## Testing Geolocation with your site

When working with HTML5 geolocation support in an application, it can be
useful to debug the output received when using different values for longitude
and latitude.

The DevTools support both overriding position values for navigator.geolocation
and simulating geolocation not being available via the overrides menu.

<img src="images/emulategeolocation.png">

1. Open up the overrides menu in the DevTools.
2. Check “Override Geolocation” then enter in Lat = 41.4949819 and Lon = -0.1461206.
3. Refresh the page and it will now use your overridden positions for geolocation.

##  Always Handle Errors

Unfortunately, not all location lookups are successful. Perhaps a GPS could
not be located or the user has suddenly disabled location lookups. A second,
optional, argument to `getCurrentPosition()` will be called in the event of an
error, so you can notify the user inside the callback:

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

## Reduce the need to start-up geo location hardware

For many use-cases you don't need to use the most up to date location of the user,
you just need a rough estimate.

Use the `maximumAge` optional property to tell the browser to use a recently
obtained geolocation result.  This not only returns quicker if the user has
requested the data before it also stops the browser from having to start up
its geolocation hardware interfaces such as Wifi triangulation or the GPS.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
  	maximumAge: 5 * 60 * 1000,
  }

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

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## Don't keep the user waiting, set a timeout

Unless you set a timeout, your request to get the current position might never return.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
     timeout: 10 * 1000
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## Prefer a coarse location over a fine grained location

If you want to find the nearest store to a user it is unlikely that you need
1 meter precision to  work that out.  The API is designed to give a coarse 
location that returns as quickly as possible.

If you do need high-precision it is possible to override the default setting
with the `enableHighAccuracy` option.  Use this sparingly: it will be slower
to resolve and use more battery.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
    enableHighAccuracy: true
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}


