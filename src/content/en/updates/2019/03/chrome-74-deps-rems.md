project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 74 to help you plan.

{# wf_updated_on: 2019-03-07 #}
{# wf_published_on: 2019-03-21 #}
{# wf_tags: deprecations,removals,chrome74 #}
{# wf_blink_components: Blink,Security,Internals>Network>FTP,Internals>Network>SSL,Blink>Payments #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 74 to help you plan.#}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 74 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Removals

### Don't allow popups during page unload

Pages may no longer use `window.open()` to open a new page during unload. The
Chrome popup blocker already prohibited this, but now it is prohibited whether
or not the popup blocker is enabled.

[Intent to Remove](https://crbug.com/844455) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5989473649164288) &#124;
[Chromium Bug](https://groups.google.com/a/chromium.org/d/topic/blink-dev/MkA0A1YKSw4/discussion)



{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
