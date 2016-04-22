---
layout: shared/narrow
title: "Getting the user to consent to location sharing"
description: ""
published_on: 2014-01-01
updated_on: 2016-04-22
order: 2
translation_priority: 1
authors:
  - paulkinlan
key-takeaways:
  geo: 
    - "Assume users will not give you their location."
    - "Make it clear why you need access to the user's location."
    - "Don't immediately prompt for access on page load."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple25
---

<p class="intro">
  As a web developer, having access to the user's location opens up a huge number of possibilities such as advanced filtering, pinpointing the user on a map, and offering pro-active suggestions on things the user can do based on their current position.
</p>

As a user, your physical location is a piece of information you want to
guard and only give out to people that you trust.  This is why the browser
shows a prompt when a site asks for your location.

**Note**: [As of Chrome 50, the Geolocation API will only work on secure contexts such as HTTPS](/web/updates/2016/04/geolocation-on-secure-contexts-only).
If your site is hosted on an non-secure origin (such as `HTTP`) the requests to get the users.
location will no longer function.

{% include shared/toc.liquid %}

Recent user studies <a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">have shown</a> that
users are distrustful of sites that simply prompt the user to give away their
position on page load. So what are the best practices?

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## Assume users will not give you their location

It might be a pain, but many of your users will not want to give you their
location so you need to adopt a defensive development style.

1.  Handle all errors out of the geolocation API so that you can adapt your
    site to this condition.
2.  Be clear and explicit about your need for the location.
3.  Use a fallback solution if needed.

## Use a fallback if geolocation is required

Our recommendation is to not tie your site or application in to requiring
access to the user's current location, but  if your application or site
absolutely requires it there are 3rd party solutions that allow you to obtain
a best guess of where the person currently is.

These solutions often work by looking at the user's IP address and mapping that
to the physical addresses registered with the RIPE database.  These locations
are often not very accurate normally giving you a position of the nearest
telecommunications hub to the user, or the nearest cell phone tower.  In many
cases, they might not even be that accurate, especially if the user is on VPN
or some other proxy service.

## Always request access to location on a user gesture

Make sure users understand why you’re asking for their location, and what
the benefit to them will be.  Asking for it immediately on the homepage as 
the site loads results in a poor user experience.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-navigation-good.png" srcset="images/sw-navigation-good.png 1x, images/sw-navigation-good-2x.png 2x" alt="">
    <figcaption class="wf-figcaption-good">Do: Always request access to location on a user gesture.</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/sw-navigation-bad.png" srcset="images/sw-navigation-bad.png 1x, images/sw-navigation-bad-2x.png 2x" alt="">
    <figcaption class="wf-figcaption-bad">Don't: Ask for it immediately on the homepage as the site loads, it results in a poor user experience.</figcaption>
  </figure>
</div>

Instead you should give the user a clear call-to-action or an indication that
an operation will require access to their location.  The user will then be able
to more easily associate the system prompt for access with the action
just initiated.

## Give clear indication that an action will request their location

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">In a study by the Google Ads team</a>, when a user was asked to book a hotel room in Boston for an upcoming conference on one particular hotels site, they were prompted to share their GPS location immediately after tapping the ‘Find and Book’ call-to-action on the homepage.

In some cases, the user became frustrated because they struggled to understand why
they were being shown hotels in San Francisco when they wanted to book a room in
Boston.

A better experience is to make sure users understands why you’re asking
them for location. Add in a well known signifier that is common across
devices, such as range finder, or an explicit call to action such as 
“Find Near Me.”

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/indication.png">
    <figcaption>Use a range finder</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/nearme.png">
    <figcaption>A specific call to action to find near me</figcaption>
  </figure>
</div>

## Gently nudge users to grant permission to their location

You don't have access to any of the steps of what users are doing.  You know exactly
when the users disallow access to their location, but you don't know
when they grant you access; you only know you obtained access when results appear.

It is good practice to "tickle" the user into action if you need them to complete the action.

We recommend: 

1.  Setup a timer that will trigger after a short period - 5 seconds is a good value.
2.  If you get an error message, show a message to the user.
3.  If you get a positive response, disable the timer and process the results.
4.  If after the timeout you haven't got a positive response, show a notification to the user.
5.  If the response comes in later and the notification is still present, remove it from the screen.

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
    hideNudgeBanner();
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

