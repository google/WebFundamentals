project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome to help you plan.

{# wf_updated_on: 2016-12-xx #}
{# wf_published_on: 2016-12-xx #}
{# wf_tags: deprecations,removals,chrome56 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome to help you plan. #}

# API Deprecations and Removals in Chrome 56 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 56,
which is in beta as of December xx. This list is subject to change at any time.

## Mouse on Android stops firing TouchEvents

Until version 55, Android low-level mouse events in Chrome primarily followed an event path designed for touch interactions. For example, mouse drag motion while a mouse button is pressed generates `MotionEvents` delivered through `View.onTouchEvent`. 

However, since touch events cannot support hover, hovering mousemoves followed a separate path. The whole design had quite a few side-effects including mouse interactions firing `TouchEvents`, all moue buttons appearing as *left* mouse buttons, and `MouseEvents` being suppressed by `TouchEvents`.

Starting with Chrome 56, a mouse on Android M Or later will:

* No longer fire `TouchEvents`.
* Fire a cosistent sequence of `MouseEvents` with appropriate buttons and other properties. 

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/cNaFvMaYtNA/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5642080642662400) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=468806)

## Remove user gestures from touch scroll

We've seen multiple [examples](http://crbug.com/572319) of poorly written or malicious ads that trigger navigation for touch scrolls either on `touchstart` or all `touchend` events.  If a 'wheel' event can't open a pop-up, then touch scrolling shouldn't either. This may break some scenarios, for example, media not playing on touch, or pop-ups not opening on touch.  Safari already silently fails to open pop-ups in all of these scenarios.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/TO_x7FRkdmw/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6131337345892352) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=611981)

## Remove PaymentAddress.careOf field

The `PaymentAddress` interface has a `careOf` field which is non-standard (no well-known address
standards support it). The `careOf` field is also unnecessary, the recipient and organization fields
sufficiently support all necessary use cases. Adding `careOf` poses significant issues in terms of
interoperability with existing postal address schemas and APIs. For a fuller discussion, read the [spec removal proposal](https://github.com/w3c/browser-payment-api/issues/244) on GitHub.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/WhUAKyc0O80/discussion) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=648049)

## Remove SVGViewElement.viewTarget

The `SVGViewElement.viewTarget` attribute is not part of the SVG2.0 specification and it's usage is small or nonexistent. This attribute was deprecated in Chrome 54 and has now been removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/X3kyDbj9xlA/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5665473114931200) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=633908)

## Deprecation policy

To keep the platform healthy, we sometimes remove APIs from the Web Platform
which have run their course. There can be many reasons why we would remove an
API, such as: they are superseded by newer APIs, they are updated to reflect
changes to specifications to bring alignment and consistency with other
browsers, or they are early experiments that never came to fruition in other
browsers and thus can increase the burden of support for web developers.

Some of these changes will have an effect on a very small number of sites. To
mitigate issues ahead of time, we try to give developers advanced notice so that
if needed, they can make the required changes to keep their sites running.

Chrome currently has a
[process for deprecations and removals of API's](http://www.chromium.org/blink#TOC-Launch-Process:-Deprecation){:.external}
and the TL;DR is:

* Announce on the
  [blink-dev](https://groups.google.com/a/chromium.org/forum/#!forum/blink-dev){: .external}
  mailing list.
* Set warnings and give time scales in the Chrome DevTools Console when usage
  is detected on a page.
* Wait, monitor, and then remove feature as usage drops.

You can find a list of all deprecated features in
[chromestatus.com using the deprecated filter](https://www.chromestatus.com/features#deprecated)
and removed features by applying the [removed filter](https://www.chromestatus.com/features#removed).
We will also  try to summarize some of the changes, reasoning, and migration
paths in these posts. We will also try to summarize some of the changes,
reasoning, and migration paths in these posts.

{% include "comment-widget.html" %}
