project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 79 to help you plan.

{# wf_updated_on: 2019-10-31 #}
{# wf_published_on: 2019-10-31 #}
{# wf_tags: deprecations,removals,chrome79 #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 79 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 79 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## -webkit-appearance keywords for arbitrary elements

Changes `-webkit-appearance` keywords to work only with specific element types.
If a keyword is applied to a non-supported element, the element takes the
default appearance.

[Chrome Platform Status](https://chromestatus.com/feature/4867142128238592) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=981720)

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
