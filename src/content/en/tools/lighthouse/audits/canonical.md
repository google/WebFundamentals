project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Document doesn't have a valid rel=canonical" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2018-03-05 #}
{# wf_blink_components: Platform>DevTools #}

# Document doesn't have a valid rel=canonical  {: .page-title }

## Overview {: #overview }

When multiple pages have similar content, search engines consider them duplicate versions of the
same page. For example, desktop and mobile versions of a product page are considered duplicates.
Search engines select one of the pages as the canonical version and crawl that one more, while
crawling the other ones less.

Canonical links let you explicitly specify which version to crawl. There are multiple
advantages to this:

* You get to specify which URL should appear in search results.
* It helps search engines consolidate multiple URLs into a single, preferred URL. For example,
  if other sites put query parameters on the ends of links to your page, search engines
  consolidate those URLs to your preferred version.
* It simplifies tracking methods. Tracking one URL is easier than tracking many.
* It improves the page ranking of syndicated content by consolidating the syndicated links to
  your original content back to your preferred URL.
* It optimizes crawling time. Time spent crawling duplicate pages is time not spent crawling
  other pages with truly unique content.

Sources:

* [Consolidate duplicate URLs][CDU]{:.external}
* [Learn the impact of duplicate URLs][LDU]{:.external}

[CDU]: https://support.google.com/webmasters/answer/139066
[LDU]: https://support.google.com/webmasters/answer/6080548

## Recommendations {: #recommendations }

Add a canonical link element to the `head` element of your HTML:

    <!doctype html>
    <html>
      <head>
        ...
        <link rel="canonical" href="https://example.com"/>
        ...

Or, add a `Link` header to your HTTP response:

    Link: https://example.com; rel=canonical

See [Specify a canonical page][specify]{:.external} for the pros and cons of various canonical
link approaches.

[specify]: https://support.google.com/webmasters/answer/139066

More guidelines:

* Make sure that the canonical URL is valid.
* Use secure HTTPS canonical URLs over HTTP ones as much as possible. Make sure that the page
  is completely secure and doesn't have any mixed content errors. See [Understand Security
  Issues][Security] to learn how to diagnose security errors in Chrome DevTools.
* If you use [hreflang links][hreflang]{:.external} to serve different versions of a page
  depending on a user's language or country, make sure that the canonical URL points to the
  proper page for that respective language or country.
* Don't point the canonical URL to a different domain. Yahoo and Bing don't allow this.
* Don't point pages to the site's root page, unless their content is the same. This may be
  valid in some cases, such as for AMP or mobile page variations, but nonetheless Lighthouse
  treats this scenario as a failure.

[Security]: /web/tools/chrome-devtools/security
[hreflang]: https://support.google.com/webmasters/answer/189077

Sources:

* [5 common mistakes with rel=canonical][5]{:.external}

[5]: https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html

### Google-specific recommendations {: #google }

Note: Recommendations for other search engines are welcome. [Edit this page.][Edit]{:.external}

[Edit]: https://github.com/google/WebFundamentals/tree/master/src/content/en/tools/lighthouse/audits/canonical.md

* Use the [Index Status Report][ISR]{:.external} to see which URLs Google considers canonical
  or duplicate across your entire site.
* Don't use Google's URL removal tool for canonization. It removes *all* versions of a URL
  from search.
* You can use the Search Console to specify a preferred domain for all pages. See [Set your
  preferred domain][Domain]{:.external}.

[ISR]: https://search.google.com/search-console/index
[Domain]: https://support.google.com/webmasters/answer/44231

## More information {: #more-info }

If Lighthouse finds no canonical links, it marks the audit as not applicable.

Lighthouse marks the audit as a fail if any of the following are true:

* There is more than 1 canonical link.
* The canonical link is not a valid URL.
* The canonical link points to a page for a different region or language.
* The canonical link points to a different domain.
* The canonical link points to the site root. Note that this may be valid in some scenarios,
  such as for AMP or mobile page variations, but nonetheless Lighthouse marks this scenario as
  a failure.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/canonical.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
