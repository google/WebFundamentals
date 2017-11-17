project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Uses Passive Event Listeners to Improve Scrolling Performance" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-11-30 #}

# Uses Passive Event Listeners to Improve Scrolling Performance  {: .page-title }

## Why the audit is important {: #why }

Setting the `passive` option on your touch and wheel event listeners can
improve scrolling performance.

See [Improving Scrolling Performance with Passive Event Listeners][blog] for
an overview.

See the [Explainer][explainer] in the passive event listener specification
for a technical deep-dive.

[blog]: https://developers.google.com/web/updates/2016/06/passive-event-listeners
[explainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

## How to pass the audit {: #how }

Add the `passive` flag to all of the event listeners that Lighthouse
has identified. In general, add the `passive` flag to every `wheel`,
`mousewheel`, `touchstart`, and `touchmove` event listener that does not
call `preventDefault()`.

In browsers that support passive event listeners, marking a listener as
`passive` is as easy as setting a flag:

    document.addEventListener('touchstart', onTouchStart, {passive: true});

However, in browsers that do not support passive event listeners, the third
parameter is a boolean to indicate whether the event should bubble or capture.
So, using the syntax above may cause unintended consequences.

See the polyfill in [Feature Detection][polyfill] to learn how to safely
implement passive event listeners.

[polyfill]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse uses the following algorithm to flag potential passive event
listener candidates:

1. Collect all event listeners on the page.
1. Filter out non-touch and non-wheel listeners.
1. Filter out listeners that call `preventDefault()`.
1. Filter out listeners that are from a different host
   than the page.

Lighthouse filters out listeners from different hosts because you probably
don't have control over these scripts. Because of this, note that Lighthouse's
audit does not represent the full scroll performance of your page. There
may be third-party scripts that are harming your page's scroll performance,
but these aren't listed in your Lighthouse report.


{% include "web/tools/lighthouse/audits/_feedback/passive-event-listeners.html" %}
