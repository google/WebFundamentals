---
layout: updates/post
title: "Delivering Fast and Light Applications with Save-Data"
description: "The new Save-Data client hint request header available in Chrome, Opera, and Yandex browsers enables developers to deliver fast and light applications to users who have opted-in to 'data savings' mode in their browser."
published_on: 2016-02-19
updated_on: 2016-02-19
authors:
  - ilyagrigorik
tags:
  - savedata
  - clienthints
  - chrome49
featured_image: /web/updates/images/2016/02/save-data/data-saver-chrome.png
---

Hundreds of millions of users are relying on proxy browsers and various
transcoding services to access the web on a daily basis. For some, these
services are critical because they significantly lower the associated costs of
browsing the web. For others, they enable a much faster browsing experience in
situations where network connectivity is slow. In short, they significantly
improve the user experience, hence their continuing growth in use and
popularity.

However, the popularity of proxy browsers and transcoding services is also
an indicator that we&mdash;the site owners and web developers&mdash;are ignoring the high
user demand for fast and light applications and pages. Let's fix that.

**The new [`Save-Data` client hint request header](https://httpwg.github.io/http-extensions/client-hints.html#the-save-data-hint) available in Chrome, Opera, and Yandex browsers enables developers to deliver fast and light applications to users who have opted-in to "data savings" mode in their browser.** By identifying this request header, the application can customize and deliver an optimized user experience to cost- and performance-constrained users.

## The Need for Lightweight Apps and Pages

![Weblight stats](/web/updates/images/2016/02/save-data/google-weblight.png)

> _"Google shows faster, lighter pages to people [searching on slow mobile connections in selected countries](https://support.google.com/webmasters/answer/6211428?hl=en)... **Our experiments show that optimized pages load four times faster than the original page and use 80% fewer bytes. Because these pages load so much faster, we also saw a 50% increase in traffic to these pages.**"_

The number of 2G connections is [finally on the decline](http://www.gsmamobileeconomy.com/GSMA_Global_Mobile_Economy_Report_2015.pdf). However, [2G was still the dominant network technology](http://www.gsmamobileeconomy.com/GSMA_Global_Mobile_Economy_Report_2015.pdf) by number of connections in 2015. The penetration and availability of 3G and 4G networks is growing rapidly, but the associated ownership costs and network constraints are still a significant factor for hundreds of millions of users:

* Accessing a faster network requires reasonably modern ("smartphone") hardware and a data plan to back it. The total cost of ownership for such a device can be staggering for many users&mdash;e.g., [a 500MB data plan can cost 17 hours worth of minimum wage work in India](http://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/). Not surprisingly many users opt for prepaid plans, often topping up their quota _daily_, and carefully monitor and control their device access to the network. Every megabyte counts.

* Those that can afford the latest flagship 4G-enabled phone and data plan can still find themselves constrained by the network: the device may be connected to a fast network but sipping data through a straw, due to capacity issues, signal quality, roaming policies, and so on. For example, many providers cap connection throughput to &lt;300 kbps when the user is roaming, or when the allotted data plan cap has been exceeded,  regardless of the network technology in use.

The point being, the need for lightweight and optimized experiences may be more
pronounced in some markets (typically, in areas with higher ratio of 2G/3G users and higher data costs), but it is also a universal need because even 4G
subscribers can often find themselves with poor and expensive connectivity.

> _Note: as a corollary to the above, the need for lightweight experiences is not a problem that will "go away" in any foreseeable future._

## Limits of Proxy Browsers and Transcoding Services

Many popular browsers, both desktop and mobile, allow the user to enable a "data saving" mode, which gives permission to the browser to apply some set of
optimizations to reduce the amount of data required to render the page. For
example, when enabled, some browsers may request lower resolution images, defer loading of some resources, or route requests through a proxy service that can apply other content-specific optimizations&mdash;e.g. recompress images, compress text resources, and so on.

The savings from such optimizations vary, but as one data point, the [Chrome Data Saver](https://developer.chrome.com/multidevice/data-compression) feature
can [reduce the size of pages by 50%](https://developer.chrome.com/multidevice/data-compression). Other popular proxy browsers such as [Opera browsers](http://www.opera.com/turbo) and [Yandex.Browser](https://play.google.com/store/apps/details?id=com.yandex.browser&hl=en) offer similar functionality. However, while these proxy browsers are popular with users, they have their own set of limitations:

* Proxy browsers achieve most of their savings by recompressing images into more efficient formats and with lower quality, and applying text compression where it was omitted. In other words, they can only optimize what you give them; they can't build and deliver an alternate and better "lightweight" experience.

* Most proxy browsers restrict themselves to resources delivered over HTTP. Secure connections (HTTPS) are routed directly from the client to the destination, bypassing the proxies.

On the other hand, transcoding services, such as the ["web light" experience offered by Google search](https://support.google.com/webmasters/answer/6211428?hl=en), often take a more drastic approach and may reformat the site to make it accessible to users on very slow networks. This yields a different set of disadvantages and limitations:

* Our applications may look very different because we can't control how the
  information is presented to the user, and may omit or ignore important site
  functionality.

* The optimized experience is available to a subset of users&mdash;e.g. those
  navigating to our site after a search. Repeat visits may result in
  inconsistent experience, and so on.

In short, counting on third-party services is both suboptimal and unreliable. **We&mdash;the site owners and web developers&mdash;need to take the responsibility and control over the user experience for data- and cost-constrained users**&mdash;e.g. respond with an alternative "lighter" application template, reduce the number of image bytes (fewer images, higher compression ratios, smaller display size, and so on), switch to on-demand loading of expensive content, and so on.

## Detecting the **Save-Data** User Preference

How do you know when to deliver the "light" experience to your users? Your application should check for the new `Save-Data` client hint request header:

> _The "**Save-Data**" client hint request header indicates the client's preference for reduced data usage, due to high transfer costs, slow connection speeds, or other reasons._

Whenever the user enables a "data savings" mode in their browser, the browser
will append the new `Save-Data` request header to all outgoing requests (both
HTTP and HTTPS). Today, the browser will only advertise one "on" token in the
header (i.e. `Save-Data: on`), but it may be extended in the future to indicate
other user preferences.

![Save-Data header in DevTools](/web/updates/images/2016/02/save-data/data-saver-chrome.png)

In turn, if your application is [using a service worker](https://developers.google.com/web/fundamentals/getting-started/push-notifications/step-03?hl=en), it can inspect the request headers and apply relevant logic to optimize the experience. Alternatively, the server can look for the advertised preferences in the `Save-Data` request header and return an alternate response&mdash;e.g. different markup, smaller images and video, and so on.

> _Tip: Are you using [PageSpeed for Apache or Nginx](https://developers.google.com/speed/pagespeed/module/) to optimize your pages? If so, [see  this discussion](https://github.com/pagespeed/mod_pagespeed/issues/1258) to learn how to enable Save-Data savings for your users._

## Browser Support

* **Chrome 49+ will advertise `Save-Data`** [whenever the user enables](https://support.google.com/chrome/answer/2392284?hl=en) the "Data Saver" option on mobile, or the "Data Saver" extension on desktop browsers.

* **Opera 35+ will advertise `Save-Data`** whenever the user enables "[Opera Turbo](http://www.opera.com/computer/features/fast-browser)" mode on desktop, or the "[Data savings](http://www.opera.com/help/mobile/android#turbo)" option on Android browsers.

* **Yandex 16.2+ will advertise `Save-Data`** whenever [Turbo mode](https://yandex.com/support/newbrowser/search-and-browse/turbo.xml) is enabled on desktop, or [mobile browsers](https://yandex.com/support/browser-mobile-android-phone/navigation_turbo-mode.xml#navigation_turbo-mode).

## Implementation Tips and Best Practices

1. Lightweight applications are not lesser applications. They don't omit
   important functionality or data that is critical to help the user find and
   achieve what they're looking for; they're just more cognizant of the involved
   costs and the user experience. Do not restrict or remove critical
   functionality and where possible give the user a choice to toggle between
   experiences. For example:
    * A photo gallery application may deliver lower resolution previews when
      `Save-Data` is advertised, but it should still allow the user to view
      high-resolution previews if desired.
    * A search application may return fewer results, reduce the amount of "heavy"
      media results, and rely on reducing the number of dependencies required to
      render the page.
    * A news-oriented site may surface fewer stories and provide smaller media
      previews to enable faster and lighter browsing.
    * And so on...

1. Enable server logic to check for the `Save-Data` request header and consider
   providing an alternate (lighter) response&mdash;e.g. reduce the number of required
   resources and dependencies to display the page, apply higher image
   compression, etc.

   If you're serving an alternate response based on the `Save-Data` header, don't
   forget to add it to the Vary list&mdash;e.g. `Vary: Save-Data`, to indicate
   to upstream caches that they should cache and serve this version only if
   the `Save-Data` request header is present. For more details, consult the
   best practices for [interaction with
   caches](https://httpwg.github.io/http-extensions/client-hints.html#interaction-with-caches).

1. If you're using a service worker, your application can detect when the data savings
   option is enabled by checking for the presence of the `Save-Data` request header. If enabled,
   consider if you can   rewrite the request to fetch fewer bytes, or use an already fetched response.

1. Consider augmenting `Save-Data` with other signals such as information about
   the user's connection type and technology (see [NetInfo
   API](http://w3c.github.io/netinfo/#examples-of-usage)). For example, you
   might want to serve the lightweight experience to any user on a 2G
   connection. Conversely, just because the user is on a "fast" 4G connection
   does not mean they're not interested in saving data&mdash;e.g. roaming.
