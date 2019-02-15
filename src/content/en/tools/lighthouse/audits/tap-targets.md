project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: How to pass the "Tap targets are not sized appropriately" Lighthouse audit.

{# wf_updated_on: 2019-02-15 #}
{# wf_published_on: 2019-02-15 #}
{# wf_blink_components: Platform>DevTools #}

# Tap targets are not sized appropriately {: .page-title }

## Overview {: #overview }

[webmasters]: https://webmasters.googleblog.com/2015/04/rolling-out-mobile-friendly-update.html

Appropriately-sized tap targets make pages more mobile-friendly and accessible. Google Search
started boosting the ranking of mobile-friendly pages on mobile search results back in 2015.
See [Rolling out the mobile-friendly update][webmasters].

## Recommendations {: #recommendations }

Click the audit to see which DOM nodes are too small. The **Tap Target** column shows the
name of the DOM node. 

## More information {: #more-info }

Sources:

* [Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/tap-targets.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
