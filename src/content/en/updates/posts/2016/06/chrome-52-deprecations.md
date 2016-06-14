---
layout: updates/post
title: "API Deprecations and Removals in Chrome 52"
description: "An round up of the deprecations and removals in Chrome to help you plan."
published_on: 2016-06-10
updated_on: 2016-06-10
authors:
  - josephmedley
tags:
  - deprecations
  - removals
  - chrome52
featured_image: /web/updates/images/2016/06/chrome-52-deprecations/deps-rems.png
---

<p class="intro">
In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the changes in Chrome 52, which is in beta as 
of June 9. This list is subject to change at any time.
</p>

{% include shared/toc.liquid %}
## Deprecation policy

To keep the platform healthy, we sometimes remove APIs from the Web Platform which
have run their course.  There can be many reasons why we would remove an API, such
as: they are superseded by newer APIs, are updated to reflect changes to
specifications to bring alignment and consistency with other browsers, or they are
early experiments that never came to fruition in other browsers and thus 
can increase the burden of support for web developers.

Some of these changes might have an effect on a very small number of sites.
To mitigate issues ahead of time, we try to give developers advanced notice so
that if needed, they can make the required changes to keep their sites running.

Chrome currently has a
[process for deprecations and removals of API's](http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation)
and the TL;DR is:

* Announce on [blink-dev](https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev).
* Set warnings and give time scales in the developer console of the browser when
  usage is detected on a page.
* Wait, monitor, and then remove feature as usage drops.

You can find a list of all deprecated features in
[chromestatus.com using the deprecated filter](https://www.chromestatus.com/features#deprecated)
and removed features by applying the
[removed filter](https://www.chromestatus.com/features#removed). We will also 
try to summarize some of the changes, reasoning, and migration paths in 
these posts.

## Deprecate MediaStream ended event and attribute and onended attribute

**TL;DR:** The `ended` event and attribute and the `onended` event handler are being deprecated because they have been removed from the  [Media Capture and Streams spec](https://www.w3.org/TR/mediacapture-streams/).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/EHy8zm0eVy0/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5730404371791872) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=608795)

Neither the `ended` event, nor the `onended` event handler have been part of the WebRTC spec for about three years. Developers wanting to watch events should use [`MediaStreamTracks`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) instead of `MediaStreams`.

Removal is anticipated in Chrome 53.

## Block pop-ups from cross-origin iframes during touch events except during a tap gesture

**TL;DR:** Chrome will begin disallowing pop-ups and other sensitive operations on touch events that don't correspond to a tap from inside of cross-origin iframes.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/piK75azdN5o/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5649871251963904) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=582140)

By their very nature, touch events can be ambiguous when compared to their corresponding mouse events. For example, if a user slides a finger across the screen, is said user sliding a toggle switch or scrolling the view? Some third-party content in iframes have taken advantage of this ambiguity to intentionally disable scrolling on the containing page.

To combat this, pop-ups and other sensitive operations will be disallowed on touch events from cross-origin iframes. The touchend event will continue to behave as before.

## Deprecate overload of postMessage()

**TL;DR:** An unneeded and little-used variant of the `postMessage()` interface is being deprecated, specifically `postMessage(message, transferables, targetOrigin)`.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/h4ooaB_Y9JE/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5719033043222528) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=425896)

The `postMessage()` method is a way to securely communicate between the scripts of pages on different origins. WebKit/Blink supports three versions: 

* `postMessage(message, targetOrigin)`
* `postMessage(message, targetOrigin, transferables)`
* `postMessage(message, transferables, targetOrigin)`

The last item in this list was an accident from the history of the spec's evolution and implementation. Because it [is rarely used](https://www.chromestatus.com/metrics/feature/timeline/popularity/575), it will be deprecated and later removed. This applies to both `window.postMessage()` and `worker.postMessage()`.

Removal is anticipated in Chrome 54.

## Remove support for X-Frame-Options in <meta> tags

**TL;DR:** To both comply with the spec and increase consistency with other browsers, support for `X-Frame-Options` inside a `<meta>` tag is being removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/R1gkjKZI0J8/discussion) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=603002)

The `X-Frame-Options` HTTP response header indicates whether a browser can render a page in an`<frame>`, `<iframe>`, or `<object>` tag. This lets a site avoid clickjacking since such pages cannot be embedded in other sites. The current version of the [X-Frame-Options spec](https://tools.ietf.org/html/rfc7034) explicitly restricts user agents from supporting this field inside a `<meta>` tag. 

To both comply with the spec and increase consistency with other browsers, support for `X-Frame-Options` inside a `<meta>` tag is being removed.

## Remove non-primary button click event

**TL;DR:** Non-primary mouse clicks no longer fire click events, but `MouseEvent.button` is still available.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/pYAh8bBl5Yc/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5769439450497024) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=255)

To bring Chrome in line with the [UIEvents spec](https://w3c.github.io/uievents/#event-type-click), we're removing the click events for non-primary mouse buttons. Non-primary mouse buttons vary by device. Generally this means anything other than a right or left mouse button. Note that the precise button clicked may still be retrieved using the [`MouseEvent.button` property](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button) sent to events such as [`mousedown'](https://developer.mozilla.org/en-US/docs/Web/Events/mousedown) or [`mouseup`](https://developer.mozilla.org/en-US/docs/Web/Events/mouseup).

## Remove requestAutocomplete()

The `requestAutocomplete()` function allowed forms to be filled out on demand by the browser's autofill capability. Yet more than two years in, this capability is only supported in Blink and its [usage is low](https://www.chromestatus.com/metrics/feature/timeline/popularity/965). For these reasons, `requestAutocomplete()` is removed in Chrome 52.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/O9_XnDQh3Yk/discussion)





