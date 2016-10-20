project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome to help you plan.

{# wf_updated_on: 2016-09-14 #}
{# wf_published_on: 2016-09-14 #}
{# wf_tags: deprecations,removals,chrome54 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome to help you plan. #}

# API Deprecations and Removals in Chrome 55 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. This article describes the deprecations and removals in Chrome 55,
which is in beta as of October 21. This list is subject to change at any time.

## Resources with non-script MIME types can no longer be executed

Previous versions of Chrome allowed content to with several non-script 
[MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types){: .external}
to be executed as script. In addition to the obvious security vulnerability,
this problem also reduces the value of
[content security policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP){: .external}
settings like `script-src 'self'`.

For example, a site might lock down same-origin JavaScript, yet still allow
users to upload images that are served from that origin. Malicious users might
upload JavaScript embedded within a specially-crafted image file, and that
JavaScript had the potential to be served from that origin and executed. As of
Chrome 55 will no longer execute content loaded with the following MIME types:

* `audio/*`
* `image/*`
* `video/*`
* `text/csv` 

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/AHsFvhHzh1o/discussion){: .external} &#124;
[Chromestatus Tracker](https://www.chromestatus.com/features/6031053726679040){: .external} &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=433049){: .external}

## Remove SVGSVGElement.viewPort

The implementation of `SVGSVGElement.viewPort` [has not worked in
Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=395838){: .external}
since 2012. The attribute is not present at all in other browsers and
it has been removed from the specification. For these reasons the property was
deprecated in Chrome 54 and has now been removed.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/bFqDvZK2LVY/discussion){: .external} &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5686865248124928){: .external} &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=395838){: .external}

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
[chromestatus.com using the deprecated filter](https://www.chromestatus.com/features#deprecated){: .external}
and removed features by applying the [removed filter](https://www.chromestatus.com/features#removed){: .external}.
We will also  try to summarize some of the changes, reasoning, and migration
paths in these posts. We will also try to summarize some of the changes,
reasoning, and migration paths in these posts.
