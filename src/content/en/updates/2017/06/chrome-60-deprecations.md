project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 60 to help you plan. In this version, security improvements, further webkit deprecations, and more.

{# wf_updated_on: 2017-08-03 #}
{# wf_published_on: 2017-06-08 #}
{# wf_tags: deprecations,removals,chrome60 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 60 to help you plan. In this version, security improvements, further webkit deprecations, and more. #}

# Deprecations and Removals in Chrome 60 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 60,
which is in beta as of June 8. This list is subject to change at any time.

## Security

### crypto.subtle now requires a secure origin

The [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) 
which has been supported since Chrome 37 has always worked on non-secure
origins. Because of Chrome's long-standing policy of
[prefering secure origins for powerful features](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/prefer-secure-origins-for-powerful-new-features?pli=1),
`crypto.subtle` is no only visible on secure origins.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/ZD3NWqkk-bo/discussion) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=641526)


### Remove content-initiated top frame navigations to data URLs

Because of their unfamilliarity to non-technical browser users, we're
increasingly seeing the `data:` scheme being used in spoofing and phishing
attacks. To prevent this, we're blocking web pages from loading `data:` URLs
in the top frame. This applies to `<a>` tags, `window.open`,
`window.location` and similar mechanisms. The `data:` scheme will still work for
resources loaded by a page.

This feature was deprecated in Chrome 58 and is now removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/GbVcuwg_QjM/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5669602927312896) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=684011&desc=2)


### Temporarily disable navigator.sendBeacon() for some blobs

The `navigator.sendBeacon()` function has been available
[since Chrome 39](https://www.chromestatus.com/feature/5517433905348608). 
As originally implemented, the function's `data` argument could contain any
arbitrary blob whose type is not CORS-safelisted. We believe this is a potential
security threat, though no one has yet tried to exploit it. Because we do NOT
have a reasonable immediate fix for it, temporarily, `sendBeacon()` can no
longer be invokable on blobs whose type is NOT CORS-safelisted.

Although this change was implemented for Chrome 60, it is has since been merged
back to Chrome 59.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=720283)

## CSS

### Make shadow-piercing descendant combinator behave like descendent combinator

Note: This item was bumped from Chrome 60 to Chrome some time after this article
was published.

The shadow-piercing descendant combinator (`>>>`), part of
[CSS Scoping Module Level 1](https://drafts.csswg.org/css-scoping/)
, was intended to match the children of a particular ancestor element
even when they appeared inside of a shadow tree. This had some limitations.
First, [per the spec](https://drafts.csswg.org/css-scoping/#deep-combinator), it
could only be used in JavaScript calls such as `querySelector()` and did not
work in stylesheets. More importantly, browser vendors were unable to make it
work beyond one level of the Shadow DOM.

Consequently, the descendant combinator has been removed from relevant specs
including Shadow DOM v1. Rather than break web pages by removing this selector
from Chromium, we've chosen instead to alias the shadow-piercing descendent
combinator to the descendant combinator. The original behavior was
[deprecated in Chrome 45](https://www.chromestatus.com/features/6750456638341120).
The new behavior is implemented in Chrome 61.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/HX5Y8Ykr5Ns/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4964279606312960) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=489954)

## JavaScript

### Deprecate and remove RTCPeerConnection.getStreamById()

Nearly two years ago, `getStreamById()` was [removed from the Web RTC
spec](https://github.com/w3c/webrtc-pc/pull/18). Most other browsers have
removed already removed this from their implementations. Though this function is
believed to be little-used, it's also believed there is some minor
interoperability risk with Edge and WebKit-based browsers *other than* Safari
where `getSTreamById()` is still supported. Developers needing an alternative
implementation can find example code in the Intent to Remove, below.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/m4DNZbLMkRo/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5751819573657600) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=698163&desc=5)

### Deprecate SVGPathElement.getPathSegAtLength

More than two years ago, `getPathSegAtLength()` was [removed from the SVG
spec](https://github.com/w3c/svgwg/commit/25ad470b300a1274a9a45734811c9a5f809233cf).
Since there are only a handful of hits for this method in httparchive, it is
being deprecated in Chrome 60. Removal is expected to be in Chrome 62, which
will ship some time in early or middle October.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Gc1Aw282beo/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5638783282184192) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=669498)


### Move getContextAttributes() behind a flag

The `getContextAttributes()` function has been supported on
[`CanvasRenderingContext2D`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
since 2013. However the feature was not part of any standard and has not become
part of one since that time. It should have been implemented behind the
`--enable-experimental-canvas-features` command line flag, but was mistakenly
not. In Chrome 60 this oversight has been corrected. It's believed that this
change is safe, since there's no data showing that anyone is using the method.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=696005)


### Remove Headers.prototype.getAll()

The `Headers.prototype.getAll()` function is being removed per the latest
version of the [Fetch specification](https://fetch.spec.whatwg.org/).

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/x3YXciXQWM0/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5656023951998976) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=645492)

### Remove indexedDB.webkitGetDatabaseNames()

We added this feature when Indexed DB was relatively new in Chrome and prefixing
was all the rage. The API asynchronously returns a list of existing database
names in an origin, which seemed sensible enough.

Unfortunately, the design is flawed, in that the results may be obsolete as soon
as they are returned, so it can really only be used for logging, not serious
application logic. The
[github issue](https://github.com/w3c/IndexedDB/issues/31) tracks/links to
previous discussion on alternatives, which would require a different approach.
While there's been on-and-off interest by developers, given the lack of cross-
browser progress the problem has been worked around by library authors.

Developers needing this functionality need to develop their own solution.
Libraries like [Dexie.js](http://dexie.org/) for example use a global table
ßwhich is itself another database to track the names of databases.

This feature was deprecated in Chrome 58 and is now removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/A6m1Pt9-BAo/discussion)
&#124; [Chromestatus Tracker](https://www.chromestatus.com/feature/5725741740195840) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=696010)

### Remove WEBKIT_KEYFRAMES_RULE and WEBKIT_KEYFRAME_RULE

The non-standard `WEBKIT_KEYFRAMES_RULE` and `WEBKIT_KEYFRAME_RULE` constants
are removed from
[CSS Rule](https://developer.mozilla.org/en-US/docs/Web/API/CSSRule).
Developers should use `KEYFRAMES_RULE` and `KEYFRAME_RULE` instead.

[Intent to Remove](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/mW1njtgDPHA) 
 &#124; [Chromestatus Tracker](https://www.chromestatus.com/feature/5747368108490752) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=689681)

<<../../_deprecation-policy.md>>

{% include "comment-widget.html" %}
