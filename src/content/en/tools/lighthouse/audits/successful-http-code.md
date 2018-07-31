project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Page has unsuccessful HTTP status code" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-12-11 #}
{# wf_blink_components: N/A #}

# Page has unsuccessful HTTP status code  {: .page-title }

## Overview {: #overview }

Search engines may not properly index pages that return unsuccessful HTTP status codes.

## Recommendations {: #recommendations }

When a page is requested, ensure that your server returns a 2XX or 3XX HTTP status code. Search
engines may not properly index pages with 4XX or 5XX status codes.

## More information {: #more-info }

Lighthouse considers any HTTP status code between 400 and 599 (inclusive) to be unsuccessful.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/http-status-code.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
