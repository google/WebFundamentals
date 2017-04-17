---
layout: updates/post
title: "Edge Of The Web #5"
description: "Chrome 44 (stable) And Wed Updates"
published_on: 2015-07-28
updated_on: 2015-07-28
authors:
  - greenido
tags:
  - news
  - serviceworker
  - polymer
featured_image: /web/updates/images/2015-08-28-edge-of-the-wed-6/chrome_256.png
---

##Edge Of The Web \#5

###Chrome 44 (Stable)

<img src="/web/updates/images/2015-09-27-edge-of-the-wed-7/chrome_256.png">

* Improvements to [Notifications API and promoted add to 
  homescreen](http://blog.chromium.org/2015/06/chrome-44-beta-improvements-to.html).

* ES6[ 
  ](https://googlechrome.github.io/samples/extended-unicode-escapes/index.html)[extended 
  Unicode escape 
  sequences](https://googlechrome.github.io/samples/extended-unicode-escapes/index.html) 
  allow developers to use the extended set of Unicode characters in JavaScript 
  string literals, where previously characters whose escape sequences contain 
  more than four hexadecimal values were unable to be denoted.
* The[ ](http://www.w3.org/TR/push-api/)[Push 
  API](http://www.w3.org/TR/push-api/) has undergone[ 
  ](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web#what-changes-exist-in-the-push-api-since-chrome-42)[several 
  minor breaking 
  changes](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web#what-changes-exist-in-the-push-api-since-chrome-42) 
  in order to keep up to date with the evolving specification.
* A new implementation of[ 
  ](https://googlechrome.github.io/samples/multi-column-css/index.html)[multi-column 
  layout](https://googlechrome.github.io/samples/multi-column-css/index.html), 
  solving historic issues with incorrect column balancing.
* Developers should now use the scroll attributes of[ 
  ](https://developer.mozilla.org/en-US/docs/Web/API/document/scrollingElement)[document.scrollingElement](https://developer.mozilla.org/en-US/docs/Web/API/document/scrollingElement) 
  instead of document.body as the latter has several[ 
  ](https://dev.opera.com/articles/fixing-the-scrolltop-bug/)[well known 
  issues](https://dev.opera.com/articles/fixing-the-scrolltop-bug/).
* Lots of other [improvements and security 
  fixes](http://googlechromereleases.blogspot.co.il/2015/07/stable-channel-update_21.html).
* What a quick summary? [you got it all in under 4 min 
  video!](https://www.youtube.com/watch?v=ghgx3j3ydwU)

### On the web

* [A quick intro to the Physical Web](https://youtu.be/1yaLPRgtlR0) - Learn what 
  can be done on the physical web and how you can implement it. 
* Why [you should lie to users in the name of 
  performance](https://www.youtube.com/watch?v=6Zgp_G5o6Oc&list=PLNYkxOF6rcIAKIQFsNbV0JDws_G_bnNo9)?<br/>
   Both 
  [@](https://twitter.com/jaffathecake)[jaffathecake](https://twitter.com/jaffathecake) 
  and [@](https://twitter.com/aerotwist)[aerotwist 
  ](https://twitter.com/aerotwist)[think you should. <br/>
  And yes! We agree with them.](https://twitter.com/aerotwist)
* The [Web Bluetooth API is 
  coming](https://www.youtube.com/watch?v=I3obFcCw8mk&index=34&list=PLOU2XLYxmsIJDPXCTt5TLDu67271PruEk) 
  - Be ready.
* Polymer News
    * Create [offline-first Polymer apps](https://goo.gl/gFZcco) without writing 
      a single line of JavaScript.
    * [How to use the new Polymer starter 
      kit](https://www.youtube.com/watch?v=xz-yixRxZN8&index=4&list=PLOU2XLYxmsII5c3Mgw6fNYCzaWrsM3sMN) 
      - An opinionated scaffold for building Polymer apps
* We just [published first draft of 
  requestIdleCallback](https://w3c.github.io/requestidlecallback/) - Your 
  feedback is welcome!

### Media

* Web Audio - select output devices
    * Demo 1: 
      [webrtc.github.io/samples/src/content/devices/input-output](http://webrtc.github.io/samples/src/content/devices/input-output/)
    * Demo 2: 
      [webrtc.github.io/samples/src/content/devices/multi](http://webrtc.github.io/samples/src/content/devices/multi)
* [Please stop using Microsoft Silverlight, says, err, 
  Microsoft](http://www.computing.co.uk/ctg/news/2416144/please-stop-using-microsoft-silverlight-says-err-microsoft) 
  - "...We encourage companies that are using Silverlight for media to begin the 
  transition to DASH / MSE / CENC / EME based designs..."
    * Ohh ya… [Hulu's Move to 
      DASH](http://www.streamingmediaglobal.com/Articles/ReadArticle.aspx?ArticleID=105110)
* [Replacing Flash: Adaptive Streaming and DRM in 
  HTML5](http://www.dash-player.com/blog/2015/06/replacing-flash-adaptive-streaming-and-drm-in-html5)
* [BBC Video Factory: Updating the creation and distribution systems for on 
  demand 
  video](http://www.bbc.co.uk/blogs/internet/entries/e2428e08-7e8b-4617-8d39-244e482b8895): 
  they provide 30 (!) video delivery variants and are beginning DASH 
  distribution. 
* [GarageBand is great but SoundTrap is a collaborative music app for 
  everyone](http://thenextweb.com/apps/2015/07/04/this-song-is-called-mic-is-writing-an-article/)
* Capture a canvas to a MediaStream with [captureStream() in Firefox 
  41](http://wiki.mozilla.org/Media/WebRTC/ReleaseNotes/41wiki.mozilla.org/Media/WebRTC/ReleaseNotes/41).

### Latest From Search

[We've published an FAQ](http://goo.gl/prbz5n) on how Google search handles new top level domains like .guru, .how, or any of the .BRAND gTLDs. We've answered questions like: "How will new gTLDs affect search? Is Google changing the search algorithm to favor these TLDs? How are the new region or city TLDs (like .london or .bayern) handled?".   
See the full FAQ [here](http://goo.gl/prbz5n).

If you have any questions or feedback, please [share it with 
us](https://groups.google.com/d/forum/mobile-web-rock) or privately with 
[@greenido](https://twitter.com/greenido)  

#### Wish to get these updates to your mailbox?   
Please use this [Signup form](https://goo.gl/l6TN40)