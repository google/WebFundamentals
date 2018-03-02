project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Page Is Blocked From Indexing" Lighthouse audit.

{# wf_updated_on: 2018-03-02 #}
{# wf_published_on: 2018-03-02 #}
{# wf_blink_components: Platform>DevTools #}

# Page Is Blocked From Indexing  {: .page-title }

## Overview {: #overview }

Search engines crawl your page in order to understand your content. If you don't
give them permission to crawl your page, they can't know what your page
contains, and therefore are unable to list your page in search results.

## Recommendations {: #recommendations }

If you want search engines to crawl your page, remove the HTTP headers or meta
tags that are preventing crawlers from doing so. Your Lighthouse report lists the
problematic headers or tags. Lighthouse only checks for the general headers or
tags that affect all crawlers. It doesn't flag headers or tags that block
specific search engine bots.

See [Robots meta tag and X-Robots-Tag HTTP header specifications][spec]{:.external}
for details about exactly how you can configure your meta tags and HTTP headers
to get more control over how search engines crawl your page. Below is an
overview of the issues that Lighthouse flags.

[spec]: https://developers.google.com/search/reference/robots_meta_tag

The tag below prevents all search engine crawlers from accessing your page:

    <meta name="robots" content="noindex"/>

The HTTP response header below does the same:

    X-Robots-Tag: noindex

You can inspect your page's response headers via [the **Headers** tab of Chrome
DevTools][headers].

[headers]: /web/tools/chrome-devtools/network-performance/reference#headers

<figure>
  <img src="/web/tools/chrome-devtools/images/headers.svg"
       alt="The Headers tab."/>
  <figcaption><b>Figure 1</b>. The <b>Headers</b> tab</figcaption>
</figure>

## More information {: #more-info }

You might also have meta tags that block specific crawlers, such as:

    <meta name="AdsBot-Google" content="noindex"/>

Lighthouse doesn't check for bot-specific directives like this. Nonetheless,
directives like this can still make your page harder to discover in various
ways.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/is-crawlable.js
