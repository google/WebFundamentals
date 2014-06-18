---
layout: article
title: "Getting the user to consent to location sharing"
description: ""
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
rel:
  gplusauthor: https://plus.google.com/+PaulKinlan
collection: user-location
introduction: ""
key-takeaways:
  geo: 
    -  Assume the user will not give you their location
    -  Make it clear why you need access to the users location
    -  Don't immediately prompt for access on page load.
---

{% wrap content %}

{% include modules/toc.liquid %}
{% include modules/takeaway.liquid list=page.key-takeaways.geo %}

As a web developer, having access to the users location opens up a huge number
of possibilities such as advanced filtering, pinpointing the user on a map,
and offering them pro-active suggestions on things they can do based on their
current position.

As a user your physical location is a piece of information you want to
guard and only give out to people that you trust.  This is why the browser
shows a prompt when a site asks for their location.

[TODO add image]

Recent user studies have <a <a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">have shown</a> that
users are distrustful of sites that simply prompt the user to away their
position on page load.  So what are the best practice?

## Assume the user will not give you their location

It might be a pain, but many of your users will not want to give you their
location so you need to adopt a defensive development style.

1.  Handle all errors out of the geolocation API so that you can adapt your
    site to this condition
2.  Be clear and explicit about your need for the location
3.  Use a fallback solution if needed.

## Use a fallback

Our recomnedation is to not tie your site or application in to requiring
access to the users current location, but  If your application or site
absolutely requires it there are 3rd party solutions that allow you to obtain
a best guess of where the person currently is.

These solutions often work by looking at the users-IP address and mapping that
to the physical addresses registered with the RIPE database.  These locations
are often not very accurate normally giving you a position on the nearest
telecommunications hub to the user, or the nearest cell phone tower.  In many
cases they might not even be that accurate, especially if the user is on VPN
or some other proxy service.

## Request Access on a user gesture

Never try to request access to the users current location on page load.  The
user hasn't had time to read the page and understand the context of the
request.  Instead wait for a user gesture on an action that the user would 
expect to trigger a request.

## Give clear indication that an action will request their location

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">In a study by the Google Ads team</a>, when users were asked to book a hotel room in Boston for an upcoming conference on one particular hotels site, they were prompted to share their GPS location immediately after tapping the ‘Find and Book’ call-to-action on the homepage.

In some cases users became frustrated because they struggled to understand why she was being shown hotels in San Francisco when she wanted to book a room in Boston.

A better experience is to make sure the user understands why you’re asking
them for location. Add in a well known signifier that is common  across
devices, such as range finder.

<img src="images/indication.png">

Or consider a very explict call to action such as “Find Near Me.” 

<img src="images/nearme.png">

## Gently nudge the user to grant permission to their location

You don't have access 

1.  Set a relatively short timeout for the geo-location API,
2.  Handle the error message
3.  Re-request the Geo-location

{% highlight javascript %}
button.onclick = function() {
  var startPos;
  var element = document.getElementById("nudge");

  var showNudgeBanner = function() {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function() {
    nudge.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

  var geoSuccess = function(position) {
    hideNudeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId); 

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

{% endwrap %}