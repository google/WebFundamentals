---
layout: updates/post
title: "API Deprecations and Removals in Chrome 51"
description: "An round up of the deprecations and removals in Chrome to help you plan."
published_on: 2016-04-20
updated_on: 2016-04-20
authors:
  - josephmedley
tags:
  - deprecations
  - removals
  - chrome51
featured_image: /web/updates/images/2016/04/chrome-51-deprecations/deps-rems.png
---

In nearly every version of Chrome we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the web
platform.

{% include shared/toc.liquid %}

## Deprecation policy

To keep the platform healthy we sometimes remove APIs from the Web Platform which
have run their course.  There can be many reasons why we would remove an API, such
as: they are superseded by newer APIs, are updated to reflect changes to
specifications, to bring alignment and consistency with other browsers, or they are
early experiments that never came to fruition in other browsers and thus 
can increase the burden of support for web developers.

Some of these changes might have an effect on a very small number of sites and
to mitigate issues ahead of time we try to give developers advanced notice so
that if needed they can make the required changes to keep their sites running.

Chrome currently has a
[process for deprecations and removals of APIs](http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation)
and the TL;DR is:

* Announce on [blink-dev](https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev)
* Set warnings and give time scales in the developer console of the browser when
  usage is detected on a page
* Wait, monitor and then remove feature as usage drops

You can find a list of all deprecated features in
[chromestatus.com using the deprecated filter](https://www.chromestatus.com/features#deprecated)
and removed features by applying the
[removed filter](https://www.chromestatus.com/features#removed). We will also 
try to summarize some of the changes, reasoning, and migration paths in 
these posts.

In Chrome 51 (April, 2016) there are a number of changes to Chrome. 

## Remove Support for SPDY/3.1

**TL;DR**: Support for HTTP/2 is widespread enough that SPDY/3.1 support can be
dropped.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/_f24SluuXtc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5711167683035136) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=587469)

SPDY/3.1 was an experimental application layer protocol that provided
performance improvements over HTTP/1.1. It did this by, for example, connection
multiplexing and server push. Many of its features were incorporated into
HTTP/2, which was published as an RFC last May. Since HTTP/2 is supported by
major servers and clients, it's time to remove SPDY/3.1 from Chrome.

## Remove TLS Next Protocol Negotiation (NPN)

**TL;DR**: As part of deprecation of SPDY, NPN is removed, having previously been
replaced with ALPN.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Qroz7eyCzRs/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5767920709795840) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=587472)

NPN was the TLS extension used to negotiate SPDY (and, in transition, HTTP/2).
During the standardization process, NPN was replaced with ALPN, published as RFC
7301 in July 2014. We intend to remove NPN at the same time as the SPDY removal.

## Remove Custom Messages in onbeforeload Dialogs

**TL;DR:** A window's `onbeforeload` property no longer supports a custom string.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/YIH8CoYVGSg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5349061406228480) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=587940)

A window’s `onbeforeunload` property may be set to a function that returns a string that is shown to the user in a dialog box to confirm that the user wants to navigate away. This was intended to prevent users from losing data during navigation. Unfortunately, it is often used to scam users. 

Starting in Chrome 51, a custom string will no longer be shown to the user. Chrome will still show a dialog to prevent users from losing data, but it's contents will be set by the browser instead of the web page.

With this change, Chrome will be consistent with Safari 9.1 and later, as well as Firefox 4 and later.

## Deprecated results attribute for <input type=search>

**TL;DR:** The `result` attribute is being deprecated because it's not part of any standard and is inconsistently implemented across browsers.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/8fHsOWz1XEw/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5738199536107520) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=590117) 

The `results` value is not implemented on most browsers and behaves highly inconsistently on those that do. For example, Chrome adds a magnifier icon to the input box, while on Safari desktop, it controls how many submitted queries are shown in a popup shown by clicking the magnifier icon. Since this isn't part of any standard, it's being deprecated.

Removal is expected in Chrome 53.


