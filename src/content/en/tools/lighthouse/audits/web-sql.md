project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Web SQL" Lighthouse audit.

{# wf_updated_on: 2018-11-30 #}
{# wf_published_on: 2016-12-05 #}
{# wf_blink_components: N/A #}

# Avoids Web SQL  {: .page-title }

<aside class="warning">
  This audit is deprecated. See <a href="https://github.com/googlechrome/lighthouse/pull/6293"
  class="external" rel="noopener">PR #6293</a>.
</aside>

## Overview {: #overview }

[spec]: https://www.w3.org/TR/webdatabase/

The W3C stopped actively maintaining the Web SQL spec in 2010 and has no plans
to maintain it any further. See [Web SQL Database][spec]{: .external rel="noopener" target="_blank" }.

## Recommendations {: #recommendations }

Consider replacing your Web SQL database with a modern alternative, such as
[IndexedDB][indexeddb].

See [Web Storage Overview][overview] for a discussion of other available
storage options.

[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[overview]: /web/fundamentals/instant-and-offline/web-storage/

## More information {: #more-info }

Lighthouse checks if the page has a Web SQL database instance.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
