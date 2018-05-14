project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Has multiple page redirects" Lighthouse audit.

{# wf_updated_on: 2018-04-02 #}
{# wf_published_on: 2018-04-02 #}
{# wf_blink_components: Platform>DevTools #}

# Has multiple page redirects  {: .page-title }

## Overview {: #overview }

Redirects slow down your page load speed.

When a browser requests a resource that has been redirected, the server usually
returns an HTTP response like this:

    HTTP/1.1 301 Moved Permanently
    Location: /path/to/new/location

The browser must then make another HTTP request at the new location in order to
retrieve the resource. This additional trip across the network can delay the
loading of the resource by hundreds of milliseconds.

## Recommendations {: #recommendations }

Your Lighthouse report lists resources that are being redirected.
Update the links to these resources. The links should
point to the current locations of the resources, so that the redirects are
eliminated. It's especially important to avoid redirects in resources that
are required for your [Critical Rendering Path][CRP].

[CRP]: /web/fundamentals/performance/critical-rendering-path/

If you're using redirects to divert mobile users to the mobile version of your
page, consider re-designing your site to use [Responsive Design][RD].

[RD]: /web/fundamentals/design-and-ux/responsive/

## More information {: #more-info }

A page fails this audit when it has 2 or more redirects.

Sources:

* [Redirections in HTTP][MDN]{:.external}
* [Avoid Landing Page Redirects](/speed/docs/insights/AvoidRedirects)
* [Audit source][src]{:.external}

[MDN]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/redirects.js
