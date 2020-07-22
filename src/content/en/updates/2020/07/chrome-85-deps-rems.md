project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 85 to help you plan.

{# wf_updated_on: 2020-07-22 #}
{# wf_published_on: 2020-07-22 #}
{# wf_tags: deprecations,removals,chrome85 #}
{# wf_blink_components: Blink>Layout,Blink>Network,Blink>Storage>AppCache #}
{# wf_featured_image: /web/updates/images/2020/07/dep-rem_85.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 85 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 85 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## AppCache Removal Begins

Chrome 85 starts a spec-mandated turn down of AppCache in Chrome. For details
and instructions for managing the transition gracefully, see [Preparing for
AppCache removal](https://web.dev/appcache-removal/). For information on a
feature that will help you identify uses of this and other deprecated APIs, see
[Know your code health](https://web.dev/reporting-observer/)

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/FvM-qo7BfkI/m/0daqyD8kCQAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/features/6192449487634432) &#124;
[Chromium Bug](https://crbug.com/582750)


## Reject insecure SameSite=None cookies

Use of cookies with SameSite set to None without the Secure attribute is no
longer supported. Any cookie that requests SameSite=None but is not marked
Secure will be rejected. This feature started rolling out to users of Stable
Chrome on July 14, 2020. See [SameSite
Updates](https://www.chromium.org/updates/same-site) for a full timeline and
details. Cookies delivered over plaintext channels may be cataloged or modified
by network attackers. Requiring secure transport for cookies intended for
cross-site usage reduces this risk.

[Intent to Remove](https://groups.google.com/a/chromium.org/g/blink-dev/c/6KhRNH3PrvU/m/Xz6YyNXbAQAJ) &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5633521622188032) &#124;
[Chromium Bug](https://crbug.com/954551)


## -webkit-box quirks from -webkit-line-clamp

[Intent to Remove]() &#124;
[Chrome Platform Status](https://www.chromestatus.com/feature/5680142707851264) &#124;
[Chromium Bug](https://crbug.com/305376)

{% include "web/updates/_shared/deprecations-policy.html" %}

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
