---
layout: updates/post
title: "Geolocation API removed from unsecured origins in Chrome 50"
description: "Starting with Chrome version 50, Chrome no longer supports the HTML5 
  Geolocation API over non-secure connections."
published_on: 2016-04-22
updated_on: 2016-04-22
authors:
  - paulkinlan
tags:
  - geolocation
  - removals
  - chrome50
featured_image: /web/updates/images/2016/04/chrome-51-deprecations/deps-rems.png
---

Chrome has [public 
intent](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) 
to deprecate powerful features like geolocation on non-secure origins, and we 
hope that others will follow.

Starting with Chrome version 50, Chrome no longer supports [the HTML5 
Geolocation 
API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) 
over non-secure connections [to obtain the user's 
location](https://developers.google.com/web/fundamentals/native-hardware/user-location/obtain-location?hl=en). 
This means that the page that's making the Geolocation API call must be served 
over a [secure context ](https://w3c.github.io/webappsec-secure-contexts/)such 
as 
[HTTPS](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/?hl=en) and `localhost`. 

**When is this changing?**

This change is effective as of Chrome version 50 (12PM PST April 20 2016). 
Chrome has been providing warnings since version 44 (released July 21 2015).    
There have been other public announcements, so hopefully this isn't the first 
time you've seen this:

* [Intent to deprecate set of powerful features over 
  HTTP](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2LXKVWYkOus/gT-ZamfwAKsJ) 
   (Feb 2015)
* [Intent to deprecate Geolocation API over 
  HTTP](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ylz0Zoph76A) 
  (Nov 2015)
* [Chrome Dev Summit](https://www.youtube.com/watch?v=9WuP4KcDBpI&t=31m0s) (Nov 
  2015)
* [Mobiforge](https://mobiforge.com/news-comment/no-https-then-bye-bye-geolocation-in-chrome-50) 
  (Jan 26, 2016)
* **[Chrome Beta 
  Channel](http://blog.chromium.org/2016/03/chrome-50-beta-push-notification.html)** ** 
  release blog (March 17, 2016)**
* [Wired](http://www.wired.com/2016/03/https-adoption-google-report/) (March 17, 
  2016)
* [VentureBeat](http://venturebeat.com/2016/04/13/chrome-50-arrives-with-push-notification-improvements-and-declarative-preload/) 
  (April 13, 2016)
* [Chrome Status](https://www.chromestatus.com/feature/5636088701911040) website
* et al

**Why are we making this change?**

Location is sensitive data! Requiring HTTPS is the _only_ way to protect the 
privacy of your users' location data. If the user's location is sent over an 
non-secure connection, _anyone_ on the network will be able to know where that 
user is. This seriously compromises user privacy.

**Who does this affect?**

This affects any page currently using the [Geolocation 
API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) 
from pages served over HTTP (non-secure). It also affects HTTPS iframes that use 
the Geolocation API if they are embedded in HTTP pages (you won't be able to 
polyfil using a shared HTTPS based service).

**Does my whole web app need HTTPS?**

It is _not_ a requirement that the whole app be served via HTTPS to use 
Geolocation. Only pages that use Geolocation need to be served via HTTPS. 
However, we strongly suggest that you migrate to HTTPS.

**I need to use Geolocation. What should I do?**

If you would like to use the HTML5 Geolocation API, or if your site already uses 
the Geolocation API, [please 
](https://www.chromium.org/Home/chromium-security/education/tls#TOC-TLS-Resources-for-Developers-and-Site-Operators)[migrate 
the 
page](https://www.chromium.org/Home/chromium-security/education/tls#TOC-TLS-Resources-for-Developers-and-Site-Operators)[ 
making the Geolocation API JavaScript function call to 
HTTPS](https://www.chromium.org/Home/chromium-security/education/tls#TOC-TLS-Resources-for-Developers-and-Site-Operators), 
ensuring that it's used in a secure context.

There are other fallback options available to get a user's location that are not 
affected by this change, such as [Google Maps Geolocation 
API](https://developers.google.com/maps/documentation/geolocation/intro#overview), 
[GeoIP](https://www.maxmind.com/en/geoip2-precision-services) (as an example, 
there are other geo based solutions), and user-entered zip code. However, we 
_strongly recommend_ that the best path to ensure ongoing access to geolocation 
is to move to HTTPS.