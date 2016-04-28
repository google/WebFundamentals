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

## Remove Custom Messages in onbeforeload Dialogs

**TL;DR:** A window's `onbeforeload` property no longer supports a custom string.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/YIH8CoYVGSg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5349061406228480) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=587940)

A window’s `onbeforeunload` property may be set to a function that returns a string that is shown to the user in a dialog box to confirm that the user wants to navigate away. This was intended to prevent users from losing data during navigation. Unfortunately, it is often used to scam users. 

Starting in Chrome 51, a custom string will no longer be shown to the user. Chrome will still show a dialog to prevent users from losing data, but it's contents will be set by the browser instead of the web page.

With this change, Chrome will be consistent with Safari 9.1 and later, as well as Firefox 4 and later.

## Deprecated results attribute for <input type=search>

**TL;DR:** The `result` attribute is being deprecated because it's not part of any standard and it inconsistently implemented across browsers.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/8fHsOWz1XEw/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5738199536107520) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=590117) 

The `results` is not implemented on most browser and highly inconsistently on those that do. For example, Chrome responds by adding a magnifier icon to the input box. While Safari desktop , it controls how many submitted queries are shown in a popup shown by click the magnifier icon. Since this isn't part of any standard, it's being deprecated.

Removal is expected in Chrome 53.


