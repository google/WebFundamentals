project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Web SQL" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-12-05 #}

# Avoids Web SQL  {: .page-title }

## Why the audit is important {: #why }

Web SQL is deprecated. See [Web SQL Database][spec] to learn more.

[spec]: https://www.w3.org/TR/webdatabase/

## How to pass the audit {: #how }

Consider replacing your Web SQL database with a modern alternative, such as
[IndexedDB][indexeddb].

See [Web Storage Overview][overview] for a discussion of other available
storage options.

[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[overview]: /web/fundamentals/instant-and-offline/web-storage/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse checks if the page has a Web SQL database instance.


{% include "web/tools/lighthouse/audits/_feedback/web-sql.html" %}
