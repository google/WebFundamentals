project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml


{# wf_published_on: 2018-10-23 #}
{# wf_updated_on: 2018-10-23 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: TODO #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: N/A #}

# Cookie Store API {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Note: this page is purely to iterate on design and doesn't contain any real content.

## What is the Cookie Store API {: #explainer }

Cookies are used most often for authentication. In this case, the relevant
cookies are generally called session cookies, and the state embedded in them
tends to be called session state. Documents generally update the current page UI
in response to changes in the session state. Service workers also need to react
to session state changes, to clean up private cached data.

Cookies have also found a niche in storing user decisions to opt out of tracking
by ad networks, and receive less personalized ads.

Separately, from a conceptual angle, a service worker is intended to be an
HTTP proxy for the pages under its scope. By this principle, service workers
must be able to read and modify the cookies accessible to pages under their
scopes.

[Continue reading][explainer]{: .button .button-primary }

## Current status {: #status }

| Step | Status |
| ---- | ------ |
| 1. Create explainer | [Complete](#explainer) |
| **2. Gather feedback & iterate on design** | [**In progress**](#feedback) |
| 3. Origin trial | Not started |
| 4. Launched | Not started |

## Feedback {: #feedback }

We need your help!

* **Do you plan to use this?**
  Tell us on the [Example WICG Discourse][wicg-discourse] discussion.
* **Have an idea for a use case or an idea where you'd use it?**
  Share your idea on the [Example WICG Discourse][wicg-discourse] discussion.
* **Like it, and want to show your support?**
  Like it on the [Example WICG Discourse][wicg-discourse] discussion.




## Helpful Links

* [Public explainer][explainer]
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* [Intent to ship][intent-to-ship]


[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=729800
[cr-status]: https://www.chromestatus.com/features/5658847691669504
[explainer]: https://github.com/WICG/cookie-store/blob/master/explainer.md "Read the Cookie Store explainer"
[wicg-discourse]: https://discourse.wicg.io/t/rfc-proposal-for-an-asynchronous-cookies-api/1652
[intent-to-ship]: https://groups.google.com/a/chromium.org/d/msg/blink-dev/gU-tSdjR4rA/hAYgmxiHCAAJ
