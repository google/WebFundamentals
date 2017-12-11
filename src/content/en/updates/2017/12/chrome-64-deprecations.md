project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 64 to help you plan. In this version, performance API changes, removal of support for multiple shadow roots, and removal of a webkit API.

{# wf_updated_on: 2017-12-14 #}
{# wf_published_on: 2017-12-14 #}
{# wf_tags: deprecations,removals,chrome64 #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 64 to help you plan. In this version, performance API changes, removal of support for multiple shadow roots, and removal of a webkit API. #}

# Deprecations and removals in Chrome 64 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes some of the deprecations and removals in Chrome
64, which is in beta as of December 14. Visit the
[deprecations page](/web/updates/tags/deprecations) for more deprecations and
removals from this and previous versions of Chrome. This list is subject to
change at any time.

## Remove chrome.loadTimes()

The `chrome.loadTimes()` method is a non-standard API that enables collecting
loading-related metrics in real-world operations. A [Resource Timing Level
1](https://www.w3.org/TR/resource-timing-1/) API has existed for several years
while the current version of it is a W3C Candidate Recommendation. Chrome itself
has had some version of an implementation [since Chrome
25](https://www.chromestatus.com/features/5796350423728128). For these reasons,
the `chrome.loadTimes()` method is removed as of Chrome 64.

Developers needing an alternative should look specifically at the
[`PerformanceResourceTiming` interface](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/QqvFGFgoTyI/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/5637885046816768) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=621512)

## Remove support for multiple shadow roots

Shadow DOM version 1 required multiple shadow roots. At a [standars meeting in
April 2015](https://www.w3.org/wiki/Webapps/WebComponentsApril2015Meeting) it
was decided that this feature should not be part of version 2. Supported was
deprecated shortly thereafter in Chrome 45. In Chrome 64 support is now removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/JjtmigNE28M/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/4668884095336448) &#124;
[Chromium Bug](https://code.google.com/p/chromium/issues/detail?id=489947)

## Remove getMatchedCSSRules()

The `getMatchedCSSRules()` method is a non-standard, webkit-only API that
retrieves a list of style rules applied to a particular element. This has been
deprecated since 2014. It's now being removed because it's not on a standards
track.

Since there is currently no standards-based alternative, developers would need
to create their own. There is at least [one example on
StackOverflow](https://stackoverflow.com/questions/2952667/find-all-css-rules-
that-apply-to-an-element).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/fd-QLCiLESQ/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/4606972603138048) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=437569&desc=2)

<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}
