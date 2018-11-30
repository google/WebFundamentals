project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Opens External Anchors Using rel="noopener"" Lighthouse audit.

{# wf_updated_on: 2018-11-30 #}
{# wf_published_on: 2016-11-30 #}
{# wf_blink_components: N/A #}

# Links to cross-origin destinations are unsafe {: .page-title }

## Overview {: #overview }

### Performance

[SI]: /web/updates/2018/07/site-isolation
[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

When you open another page using `target="_blank"`, the other page may
run on the same process as your page, unless [Site Isolation][SI] is enabled.
If the other page is running a lot of JavaScript, your page's performance may
also suffer. See [The Performance Benefits of `rel=noopener`][jake]{: .external }.

### Security

[mths]: https://mathiasbynens.github.io/rel-noopener/
[attack]: https://en.wikipedia.org/wiki/Attack_surface

The other page can access your `window` object with the `window.opener` property.
This exposes an [attack surface][attack]{: .external } because the other page
can potentially redirect your page to a malicious URL.
See [About rel=noopener][mths]{: .external }.

## Recommendations {: #recommendations }

[whatwg]: https://html.spec.whatwg.org/multipage/links.html#link-type-noreferrer

Add `rel="noopener"` or `rel="noreferrer"` to each of the links that Lighthouse
has identified in your report. In general, when you use `target="_blank"`, always
add `rel="noopener"` or `rel="noreferrer"`.

    <a href="https://examplepetstore.com" target="_blank" rel="noopener">
      Example Pet Store
    </a>

* `rel="noopener"` prevents the new page from being able to
  access the `window.opener` property and ensures it runs in a separate
  process.
* `rel="noreferrer"` attribute has the same effect, but also
  prevents the `Referer` header from being sent to the new page. See 
  [Link type "noreferrer"][whatwg]{: .external }.

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

[Audit source](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/dobetterweb/external-anchors-use-rel-noopener.js){: .external }

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
