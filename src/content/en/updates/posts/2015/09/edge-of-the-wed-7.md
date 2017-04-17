---
layout: updates/post
title: "Edge Of The Web #7"
description: "Chrome 46 (beta) And Wed Updates"
published_on: 2015-09-27
updated_on: 2015-09-27
authors:
  - greenido
tags:
  - news
  - webrtc
  - serviceworker
featured_image: /web/updates/images/2015-09-27-edge-of-the-wed-7/chrome_512dp.png
---

# Edge Of The Web \#7

### Chrome 46 (Beta)
<img src="/web/updates/images/2015-09-27-edge-of-the-wed-7/chrome_256.png">

* *Performance boost*
    * Tools like srcset allow developers to serve an optimized image variant in 
      a responsive way, but it can be cumbersome and inefficient to use in 
      practice. Developers can now[ 
      ](http://developers.google.com/web/updates/2015/09/automating-resource-selection-with-client-hints)[negotiate 
      with the 
      server](http://developers.google.com/web/updates/2015/09/automating-resource-selection-with-client-hints) 
      (resource selection with client hints) to download the best image variant 
      for a device using straightforward HTTP request headers. These headers 
      communicate[ 
      ](http://tools.ietf.org/html/draft-grigorik-http-client-hints-03#section-3)[DPR](http://tools.ietf.org/html/draft-grigorik-http-client-hints-03#section-3),[ 
      ](http://tools.ietf.org/html/draft-grigorik-http-client-hints-03#section-5)[Viewport-Width](http://tools.ietf.org/html/draft-grigorik-http-client-hints-03#section-5), 
      and the[ 
      ](http://tools.ietf.org/html/draft-grigorik-http-client-hints-03#section-4)[intended 
      display 
      width](http://tools.ietf.org/html/draft-grigorik-http-client-hints-03#section-4) 
      of the resource being fetched to the server.
    * Sites can[ 
      ](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)[specify 
      origins that Chrome should preconnect 
      to](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/) 
      in order to improve performance.
* **In the kingdom of Service Worker** 
    * [Cache.addAll()](https://googlechrome.github.io/samples/service-worker/prefetch/index.html) 
      is now supported, removing the need for polyfills enabling bulk 
      interactions with the cache.
    * The Fetch API now supports[ 
      ](https://code.google.com/p/chromium/issues/detail?id=517837)[Request.redirect](https://code.google.com/p/chromium/issues/detail?id=517837), 
      allowing more control over redirects.
    * [Resource Timing 
      extensions](https://developers.google.com/web/updates/2015/07/measuring-performance-in-a-service-worker) 
      to the Performance interface are now available[ 
      ](https://code.google.com/p/chromium/issues/detail?id=515344)[without 
      prefixes](https://code.google.com/p/chromium/issues/detail?id=515344).
    * As part of our continuing policy to[ 
      ](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2LXKVWYkOus/gT-ZamfwAKsJ)[remove 
      powerful APIs on insecure 
      origins](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/2LXKVWYkOus/gT-ZamfwAKsJ), 
      the Cache API is now[ 
      ](https://code.google.com/p/chromium/issues/detail?id=501380)[restricted 
      to HTTPS](https://code.google.com/p/chromium/issues/detail?id=501380).
* *CSS Land*
    * Developers can now use[ 
      ](https://googlechrome.github.io/samples/css-escape/index.html)[CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html), 
      eliminating the need for complicated string escape code while handling 
      user generated identifiers.
    * The [CSS intrinsic sizing values](https://drafts.csswg.org/css-sizing-3/), 
      which allow boxes to fit their contents, are no longer prefixed.
* *Animating objects along author specified paths* - Developers can now[ 
  ](http://codepen.io/danwilson/blog/css-motion-paths)[animate any graphical 
  object along an arbitrary 
  path](http://codepen.io/danwilson/blog/css-motion-paths) declaratively as a[ 
  ](https://googlechrome.github.io/samples/css-motion-path/index.html)[CSS 
  property](https://googlechrome.github.io/samples/css-motion-path/index.html), 
  allowing simpler code that doesn't block rendering or input.
* *WebRTC* - [Timer-based polling is no longer 
  necessary](https://code.google.com/p/chromium/issues/detail?id=496700) to use 
  WebRTC DataChannels, making them more efficient and convenient.
* *DevTools* - It has a[ 
  ](https://developers.google.com/web/updates/2015/07/23/devtools-digest-aggregated-timeline-details-color-palettes-and-more)[better 
  tool tips and custom network 
  profiles](https://developers.google.com/web/updates/2015/07/23/devtools-digest-aggregated-timeline-details-color-palettes-and-more).  
* **[ES2015 specification](http://www.ecma-international.org/ecma-262/6.0/)** - 
  Chrome now supports the[ 
  ](https://github.com/GoogleChrome/samples/tree/gh-pages/spread-operator)[spread 
  operator](https://github.com/GoogleChrome/samples/tree/gh-pages/spread-operator) 
  and[ 
  ](http://www.ecma-international.org/ecma-262/6.0/#sec-built-in-function-objects)[new.target](http://www.ecma-international.org/ecma-262/6.0/#sec-built-in-function-objects).
* Sites launched from the home screen can now modify the default color of 
  Chrome's UI by specifying a[ 
  ](https://developers.google.com/web/updates/2015/09/using-manifest-to-set-sitewide-theme-color)[theme 
  color](https://developers.google.com/web/updates/2015/09/using-manifest-to-set-sitewide-theme-color) 
  in their[ ](https://w3c.github.io/manifest/)[web 
  manifest](https://w3c.github.io/manifest/) instead of a meta tag.
* Developers can now[ 
  ](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration)[disable 
  Chrome's default scroll restoration 
  behavior](https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration) 
  on history navigation when it interferes with the app's user experience.
* Sites that have been added to the homescreen can now set a[ 
  ](https://developers.google.com/web/updates/2015/09/using-web-app-manifest-to-set-solid-color-loading-screen)[background 
  color](https://developers.google.com/web/updates/2015/09/using-web-app-manifest-to-set-solid-color-loading-screen) 
  to show while resources load.

### On the web

* Earlier this month we kicked off the first ever Polymer Summit. We focused on 
  three key themes: Develop, Design and Deploy, giving concrete advice on how 
  you can build your web app from start to finish. You can check out all the 
  recordings[ 
  ](https://www.youtube.com/user/ChromeDevelopers)[here](https://www.youtube.com/user/ChromeDevelopers).
* A set of short videos that are focusing on important FED topics:
    * [Polycasts](https://www.youtube.com/playlist?list=PLOU2XLYxmsII5c3Mgw6fNYCzaWrsM3sMN)
    * [Lazy 
      Web](https://www.youtube.com/playlist?list=PLOU2XLYxmsIIdQz8Hih4AyP_ZCn_mzsN4)
    * [Totally Tooling 
      Tips](https://www.youtube.com/playlist?list=PLOU2XLYxmsILKwwASNS0xgfcmakbK_8JZ)
    * [HTTP 
      203](https://www.youtube.com/playlist?list=PLOU2XLYxmsII_38oWcnQzXs9K9HKBMg-e)

## Latest From Search


* **Helping hacked sites reconsider**

A successful reconsideration is the last step a hacked website owner will need to go through to let Google know the site is now safe for users. We've made some progresses in the way we handle these requests and provided some insights [here](http://goo.gl/RqGU4a).

<img src="/web/updates/images/2015-09-27-edge-of-the-wed-7/image00.png" width="468" height="292" />

* **Multiple guideline violations are a big no no**

[We've communicated very clearly](http://goo.gl/NltWER) to our communities of website owners that it is important not to violate our guidelines repeatedly, especially when the repeated violation is done with a clear intention of spam.

* **Deprecated the Search Queries report**

We switched off the old Search Query report in favor of the [Search Analytics report](https://goo.gl/rXW4Af), [announced back in May](http://googlewebmastercentral.blogspot.com/2015/05/new-search-analytics.html).

* **Turning off Search Console CSV downloads on Oct. 20th**

With the [new Search Analytics API](http://googlewebmastercentral.blogspot.com/2015/08/introducing-search-analytics-api.html), 
it's now time to gradually say goodbye to the [old CSV download 
scripts](http://googlewebmastercentral.blogspot.com/2011/12/download-search-queries-data-using.html) for information on queries & rankings. The [new API](https://developers.google.com/webmaster-tools/v3/searchanalytics) does much more anyway. Read on [here](http://goo.gl/6QkdDr).

<img src="/web/updates/images/2015-09-27-edge-of-the-wed-7/image01.png" width="589" height="157" />

### Mobile search results

* Sometimes a user may tap on a search result on a mobile device and see an app install interstitial that hides a significant amount of content and prompts the user to install an app. 
Our analysis shows that it is not a good search experience and can be 
frustrating for users because they are expecting to see the content of the web 
page. 
As of September 1st, we updated the [Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/) to indicate that sites should avoid showing app install interstitials that hide a significant amount of content on the transition from the search result page. 
The [Mobile Usability report](https://www.google.com/webmasters/tools/mobile-usability?utm_source=appinterstitialspost&utm_medium=blog&utm_campaign=appinterstitials&pli=1) in Search Console will show webmasters the number of pages across their site that have this issue.
Read on [here](http://goo.gl/ja6xsy).

If you have any questions or feedback, please [share it with 
us](https://groups.google.com/d/forum/mobile-web-rock) or privately with 
[@greenido](https://twitter.com/greenido)  

#### Wish to get these updates to your mailbox?   
Please use this [Signup form](https://goo.gl/l6TN40)

