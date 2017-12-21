project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Opens External Anchors Using rel="noopener"" Lighthouse audit.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2016-11-30 #}
{# wf_blink_components: N/A #}

# Opens External Anchors Using rel="noopener"  {: .page-title }

## Overview {: #overview }

When your page links to another page using `target="_blank"`, the new page
runs on the same process as your page. If the new page is executing expensive
JavaScript, your page's performance may also suffer.

On top of this, `target="_blank"` is also a security vulnerability. The new page
has access to your window object via `window.opener`, and it can navigate your
page to a different URL using `window.opener.location = newURL`.

See [The Performance Benefits of rel=noopener][jake] for more information.

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

## Recommendations {: #recommendations }

Add `rel="noopener"` to each of the links that Lighthouse has identified in your
report. In general, always add `rel="noopener"` when you open an external link
in a new window or tab.

    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

## More information {: #more-info }

Lighthouse uses the following algorithm to flag links as `rel="noopener"`
candidates:

1. Gather all `<a>` nodes that contain the attribute `target="_blank"` and do
   not contain the attribute `rel="noopener"`.
1. Filter out any same-host links.

Because Lighthouse filters out same-host links, there's an edge case that you
might want to be aware of if you're working on a large site. If your page opens
a link to another section of your site without using `rel="noopener"`, the
performance implications of this audit still apply. However, you won't see these
links in your Lighthouse results.


{% include "web/tools/lighthouse/audits/_feedback/noopener.html" %}
