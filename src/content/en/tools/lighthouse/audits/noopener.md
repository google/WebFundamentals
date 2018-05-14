project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Opens External Anchors Using rel="noopener"" Lighthouse audit.

{# wf_updated_on: 2018-04-05 #}
{# wf_published_on: 2016-11-30 #}
{# wf_blink_components: N/A #}

# Opens External Anchors Using rel="noopener"  {: .page-title }

## Overview {: #overview }

When your page links to another page using `target="_blank"`, the new page
runs on the same process as your page. If the new page is executing expensive
JavaScript, your page's performance may also suffer. See [The Performance
Benefits of `rel=noopener`][jake] for more information.


On top of this, `target="_blank"` is also a security vulnerability. The new page
has access to your `window` object via `window.opener`, and it can navigate your
page to a different URL using `window.opener.location = newURL`. See [About
`rel=noopener`][mths] for a demo and explanation of the vulnerability.

Adding a `rel="noopener"` attribute prevents the new page from being able to
access the `window.opener` property and will ensure it runs in a separate
process. The `rel="noreferrer"` attribute has the same effect, but will also
prevent the `Referer` header from being sent to the new page. See [HTML
Standard: Link type "noreferrer"][whatwg] for an explanation of this behavior.

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
[mths]: https://mathiasbynens.github.io/rel-noopener/
[whatwg]: https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer

## Recommendations {: #recommendations }

Add `rel="noopener"` or `rel="noreferrer"` to each of the links that Lighthouse
has identified in your report. In general, always add one of these attributes
when you open an external link in a new window or tab.

    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

## More information {: #more-info }

Lighthouse uses the following algorithm to flag links as `rel="noopener"`
candidates:

1. Gather all `<a>` nodes that contain the attribute `target="_blank"` and do
   not contain the attribute `rel="noopener"` or `rel="noreferrer"`.
1. Filter out any same-host links.

Because Lighthouse filters out same-host links, there's an edge case that you
might want to be aware of if you're working on a large site. If your page opens
a link to another section of your site without using `rel="noopener"`, the
performance implications of this audit still apply. However, you won't see these
links in your Lighthouse results.


{% include "web/tools/lighthouse/audits/_feedback/noopener.html" %}
