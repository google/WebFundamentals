project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 78 to help you plan.

{# wf_updated_on: 2019-10-10 #}
{# wf_published_on: 2019-09-19 #}
{# wf_tags: deprecations,removals,chrome78 #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 78 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 78 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## XSS Auditor

XSS Auditor has been removed from Chromeß. The XSS Auditor can introduce
cross-site information leaks and mechanisms to bypass the Auditor are widely
known.

[Intent to Remove](https://groups.google.com/a/chromium.org/d/topic/blink-dev/TuYw-EZhO9g/discussion) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5021976655560704) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=968591)

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
