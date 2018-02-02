project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 65 to help you plan. In this version,

{# wf_updated_on: 2018-02-08 #}
{# wf_published_on: 2018-02-08 #}
{# wf_tags: deprecations,removals,chrome65 #}
{# wf_blink_components: Blink>Input #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 65 to help you plan. In this version,  #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 65 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In nearly every version of Chrome, we see a significant number of updates and
improvements to the product, its performance, and also capabilities of the Web
Platform. 

This series, released with every version of Chrome describes its
deprecations and removals. The list for Chrome 65, which is in beta as of
February 8, is short.

## Block cross-origin &lt;a download>

To avoid what is essentially a user-mediated cross-origin information leakage,
Blink will now ignore the presence of the download attribute on anchor elements
with cross origin attributes. Note that this applies to
[HTMLAnchorElement.download](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/download)
as well as to the element itself.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/Iw3_SUcagGg/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/4969697975992320) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=714373)

{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "comment-widget.html" %}
