project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 85 to help you plan.

{# wf_updated_on: 2020-07-22 #}
{# wf_published_on: 2020-07-22 #}
{# wf_tags: deprecations,removals,chrome85 #}
{# wf_blink_components: Blink>Layout,Blink>Network #}
{# wf_featured_image: /web/updates/images/2020/05/dep-rem_480.jpg #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 85 to help you plan. #}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 84 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

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
