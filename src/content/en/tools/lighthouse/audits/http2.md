project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Uses HTTP/2 For Its Own Resources" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-12-05 #}

# Uses HTTP/2 For Its Own Resources  {: .page-title }

## Why the audit is important {: #why }

HTTP/2 can serve your page's resources faster, and with less data moving over
the wire.

See [HTTP/2 Frequently Asked Question][faq] for a list of benefits that HTTP/2
provides over HTTP/1.1.

See [Introduction to HTTP/2][intro] for an in-depth technical overview.

[faq]: https://http2.github.io/faq/
[intro]: /web/fundamentals/performance/http2/

## How to pass the audit {: #how }

Under **URLs**, Lighthouse lists every resource that was not served over HTTP/2.
To pass this audit, serve each of those resources over HTTP/2.

To learn how to enable HTTP/2 on your servers, see [Setting Up HTTP/2][setup].

[setup]: https://dassur.ma/things/h2setup/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse gathers all of the resources that are from the same host as the
page, and then checks the HTTP protocol version of each resource.

Lighthouse excludes resources from other hosts from this audit, because it
assumes that you have no control over how these resources are served.


{% include "web/tools/lighthouse/audits/_feedback/http2.html" %}
