project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 83 to help you plan.

{# wf_updated_on: 2020-04-10 #}
{# wf_published_on: 2020-04-10 #}
{# wf_tags: deprecations,removals,chrome83 #}
{# wf_blink_components: Blink>Payments,Blink>SVG,Internals>Network>SSL #}
{# wf_featured_image: /web/updates/images/generic/deps-rems.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 83 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 83 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Disallow downloads in Sandboxed iframes

Chrome now prevents downloads in sandboxed iframes, though this restriction can
be lifted via an 'allow-downloads' keyword in the sandbox attribute list. This
allows content providers to restrict malicious or abusive downloads. Downloads
can bring security vulnerabilities to a system. Even though additional security
checks are done in Chrome and the operating system, we feel blocking downloads
in sandboxed iframes also fits the purpose of the sandbox.

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/JdAQ6HNoZvk/m/WQZfXIMADgAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5706745674465280)

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
