project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 75 to help you plan.

{# wf_updated_on: 2019-06-26 #}
{# wf_published_on: 2019-05-02 #}
{# wf_tags: deprecations,removals,chrome75 #}
{# wf_blink_components: Blink,Security,Internals>Network>FTP,Internals>Network>SSL,Blink>Payments #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 75 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 75 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Remove overflow: -webkit-paged-x and overflow: -webkit-paged-y

These are old webkit-specific properties that allowed developers to fragment
content over columns inside a scrollable region. They are now removed.

Practically speaking these aren't used. Most developers use them accidentally,
and typically when they are they force a new formatting context similar to
setting `overflow: hidden`.

[Chrome Platform Status](https://www.chromestatus.com/feature/5731653806718976) &#124;
[Chromium Bug](https://bugs.chromium.org/p/chromium/issues/detail?id=940652)

## Deprecations

{% include "web/updates/_shared/no-new-deprecations.html" %}

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
