project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A round up of the deprecations and removals in Chrome 71 to help you plan.

{# wf_updated_on: 2018-10-10 #}
{# wf_published_on: 2018-10-25 #}
{# wf_tags: deprecations,removals,chrome71 #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: A round up of the deprecations and removals in Chrome 71 to help you plan.#}

{% include "web/updates/_shared/see-all-dep-rem.html" %}

# Deprecations and removals in Chrome 71 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

## Remove SpeechSynthesis.speak() without user activation

The [`SpeechSynthesis`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
interface is actively being abused on the web. There's anecdotal evidences that
because other autoplay avenues are being closed, abuse is moving to the [Web
Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API),
which doesn't follow autoplay rules.

The `speechSynthesis.speak()` function now throws an error if the document has
not received a user activation. This feature has been deprecated since Chrome 70.

[Intent to Deprecate](https://groups.google.com/a/chromium.org/d/topic/blink-dev/XpkevOngqUs/discussion) &#124;
[Chromestatus Tracker](https://www.chromestatus.com/feature/5687444770914304) &#124;
[Chromium Bug](https://crbug.com/812767)

{% include "web/updates/_shared/deprecations-policy.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
