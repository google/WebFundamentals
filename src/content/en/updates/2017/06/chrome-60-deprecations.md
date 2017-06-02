project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 60 to help you plan.

{# wf_updated_on: 2017-06-08 #}
{# wf_published_on: 2017-06-08 #}
{# wf_tags: deprecations,removals,chrome60 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 60 to help you plan. #}

# Deprecations and Removals in Chrome 60 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 60,
which is in beta as of June 8. This list is subject to change at any time.



## Move getContextAttributes() behind a flag

The `getContextAttributes()` function has been supported on [`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) since 2013. However the feature was not part of any standard and has not become part of one since that time. It should have been implemented behind the `--enable-experimental-canvas-features` command line flag, but was mistakenly not. In Chrome 60 this oversight has been corrected. It's believed that this change is safe, since there's no data showing that anyone is using the method.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=696005)



## Remove WEBKIT_KEYFRAMES_RULE and WEBKIT_KEYFRAME_RULE

The non-standard `WEBKIT_KEYFRAMES_RULE` and `WEBKIT_KEYFRAME_RULE` constants are removed from [CSS Rule](https://developer.mozilla.org/en-US/docs/Web/API/CSSRule). Developers should use `KEYFRAMES_RULE` and `KEYFRAME_RULE` instead.

[Intent to Remove](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/mW1njtgDPHA) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5747368108490752) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=689681)



##

[Intent to Remove]() &#124;
[Chromestatus Tracker]() &#124;
[Chromium Bug]()



##

[Intent to Remove]() &#124;
[Chromestatus Tracker]() &#124;
[Chromium Bug]()



<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}