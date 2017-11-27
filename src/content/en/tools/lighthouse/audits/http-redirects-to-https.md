project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Redirects HTTP Traffic To HTTPS" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-09-20 #}

# Redirects HTTP Traffic To HTTPS  {: .page-title }

## Why the audit is important {: #why }

All sites should be protected with HTTPS. See the following Lighthouse doc to
learn why: [Site is on HTTPS](https).

Once you've got HTTPS set up, you need to make sure that all unsecure HTTP
traffic to your site is redirected to HTTPS.

## How to pass the audit {: #how }

1. Use canonical links in the `head` of your HTML to help search engines figure
   out the best way to get to the page.

       <link rel="canonical" href="https://example.com"/>

2. Configure your server to redirect HTTP traffic to HTTPS. See your server's
   documentation to figure out the best way to do this.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse changes the page's URL to `http`, loads the page, and then waits for
the event from the Chrome Debugger that indicates that the page is secure. If
Lighthouse does not receive the event within 10 seconds then the audit fails.


{% include "web/tools/lighthouse/audits/_feedback/http-redirects-to-https.html" %}
