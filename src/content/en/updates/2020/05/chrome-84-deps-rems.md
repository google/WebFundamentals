project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 84 to help you plan.

{# wf_updated_on: 2020-05-27 #}
{# wf_published_on: 2020-05-27 #}
{# wf_tags: deprecations,removals,chrome84 #}
{# wf_blink_components: Blink>CSS #}
{# wf_featured_image: /web/updates/images/2020/05/dep-rem_480.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 84 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

Note: Chrome expects to start the spec-mandated turn down of AppCache in Chrome
85. For details and instructions for managing the transition gracefully, see
[Preparing for AppCache removal](https://web.dev/appcache-removal/). For
information on a feature that will help you identify uses of this and other
deprecated APIs, see [Know your code
health](https://web.dev/reporting-observer)/

# Deprecations and removals in Chrome 84 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## @import rules in CSSStyleSheet.replace() removed

The original spec for constructable stylesheets allowed for calls to:

```
sheet.replace("@import('some.css');")
```

This use case is being removed. Calls to `replace()` now throw an exception if
`@import` rules are found in the replaced content.


[Intent to Remove]() &#124;
[Chrome Platform Status]() &#124;
[Chromium Bug](https://crbug.com/)

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
