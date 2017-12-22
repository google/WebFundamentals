project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Keep Server Response Times Low" Lighthouse audit.

{# wf_updated_on: 2017-12-22 #}
{# wf_published_on: 2017-12-22 #}
{# wf_blink_components: N/A #}

# Keep Server Response Times Low  {: .page-title }

## Overview {: #overview }

Users dislike when pages take a long time to load. Slow server response times are one possible
cause for long page loads.

When users navigate to a URL in their web browser, the browser makes a network request to
fetch that content. Your server receives the request and returns the page content. The server
may need to do a lot of work in order to return a page with all of the content that users
want. For example, if users are looking at their order history, the server needs
to fetch each user's history from a database, and then insert that content into the page.
Optimizing the server to do work like this as quickly as possible is one way to reduce the time
that users spend waiting for pages to load.

## Recommendations {: #recommendations }

The first step to improving server response times is to identify the core conceptual tasks
that your server must complete in order to return page content, and then measure how long each
of these tasks takes. Once you've identified the longest tasks, search for ways to speed them
up.

There are many possible causes of slow server responses, and therefore many possible ways
to improve:

* Optimize the server's application logic to prepare pages faster. If you use a server
  framework, the framework may have recommendations on how to do this.
* Optimize how your server queries databases, or migrate to faster database systems.
* Upgrade your server hardware to have more memory or CPU.

## More information {: #more-info }

This audit is also referred to as "Time To First Byte", which represents the time that it takes
for a user's browser to receive the first byte of page content.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/time-to-first-byte.js
