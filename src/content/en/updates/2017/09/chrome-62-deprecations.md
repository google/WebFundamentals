project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 62 to help you plan. In this version, security improvements, further webkit deprecations, and more.

{# wf_updated_on: 2017-09-15 #}
{# wf_published_on: 2017-09-15 #}
{# wf_tags: deprecations,removals,chrome62 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 62 to help you plan. In this version, more restrictions on insecure origins and a change to the shadow-piercing descendant combinator. #}

# Deprecations and Removals in Chrome 62 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 62,
which is in beta as of September 14. This list is subject to change at any time.


## Remove RTCPeerConnection.getStreamById()

Nearly two years ago, `getStreamById()` was [removed from the WebRTC
spec](https://github.com/w3c/webrtc-pc/pull/18). Most other browsers have
already removed this from their implementations, and the feature was deprecated
in Chrome 60. Though this function is believed to be little-used, it's also
believed there is some minor interoperability risk with Edge and WebKit-based
browsers *other than* Safari where `getStreamById()` is still supported.
Developers needing an alternative implementation can find example code in the
Intent to Remove, below.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/m4DNZbLMkRo/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5751819573657600) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=698163&desc=5)


## Remove SharedWorker.workerStart

This property, which was intended for use in monitoring worker performance was
removed from the spec more than two years ago and it is not supported in the
other major browsers. A more modern approach to tracking performance of a worker
would use
[`Performance.timeOrigin`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/KkPl_Szxf50/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5652075467767808) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=695996)


## Remove SVGPathElement.getPathSegAtLength()

In Chrome 48, `SVGPathElement.pathSegList()` and related interfaces were removed
in compliance with the [SVG specification](https://www.w3.org/TR/SVG2/). At that
time, this method was mistakenly left in. We don't excpct this removal to break
any web pages since, for the last two years, it has returned an object that no
longer exists in Blink.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Gc1Aw282beo/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5638783282184192) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=669498)

<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}
