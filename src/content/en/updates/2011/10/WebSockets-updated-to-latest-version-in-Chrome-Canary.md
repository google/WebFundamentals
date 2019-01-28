project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-01-21 #}
{# wf_published_on: 2011-10-13 #}
{# wf_tags: news,websockets #}
{# wf_blink_components: N/A #}

# WebSockets updated to latest version in Chrome Canary {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}


The WebSocket API has been rev'd to the latest version (13) in Chrome Canary. The developer-facing changes are very small, but are incompatible with the older version.

Here's the scoop:

* Change the origin header name: `Sec-WebSocket-Origin` -> `Origin`
* `Sec-WebSocket-Version` header value: 8 -> 13


