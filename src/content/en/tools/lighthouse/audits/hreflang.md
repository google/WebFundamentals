project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Document doesn't have a valid hreflang" Lighthouse audit.

{# wf_updated_on: 2018-03-23 #}
{# wf_published_on: 2018-03-23 #}
{# wf_blink_components: Platform>DevTools #}

# Document doesn't have a valid hreflang  {: .page-title }

## Overview {: #overview }

If you serve different content based on a user's language or region, use `hreflang` links
to ensure that search engines serve the correct content for that language or region.

[support]: https://support.google.com/webmasters/answer/189077

## Recommendations {: #recommendations }

Define an `hreflang` link for each language version of a URL. Lighthouse flags in your report any
incorrect `hreflang` links that it has found.

Suppose that you have 3 versions of a page:

* An English version at `https://example.com`
* A Spanish version at `https://es.example.com`
* A German version at `https://de.example.com`

Tell search engines that these pages are equivalent by adding `link` elements to the `head` of
your HTML:

    <link rel="alternate" hreflang="en" href="https://example.com" />
    <link rel="alternate" hreflang="es" href="https://es.example.com" />
    <link rel="alternate" hreflang="de" href="https://de.example.com" />

Or by adding `Link` headers to your HTTP response:

    Link: <https://example.com>; rel="alternate"; hreflang="en", <https://es.example.com>;
    rel="alternate"; hreflang="es", <https://de.example.com>; rel="alternate"; hreflang="de"

Or by adding language version information to your Sitemap.

For pages that allow users to select their language use the `x-default` keyword.

    <link rel="alternate" href="https://example.com" hreflang="x-default" />

Each language page should specify all the different language versions, **including itself**.

Pages must always link to each other. When page A links to page B, page B must also link
back to page A, or else search engines may ignore the `hreflang` links or interpret them
incorrectly.

The `hreflang` value must always specify a language code. The language code must follow
[ISO 639-1][639-1]{:.external} format. The `hreflang` value can also include an optional
regional code. For example, `en-ie` is for English speakers in Ireland, whereas `es-ie` is for
Spanish speakers in Ireland. The region code must follow [ISO 3166-1 alpha-2][3166-1]{:.external}
format.

[639-1]: https://wikipedia.org/wiki/List_of_ISO_639-1_codes
[3166-1]: https://wikipedia.org/wiki/ISO_3166-1_alpha-2

Source:

* [Use hreflang for language and regional URLs][support]{:.external}

## More information {: #more-info }

Lighthouse only checks for valid language codes. It does not check for valid region codes.

Lighthouse checks for `hreflang` links in the page's `head` and in its response headers.
Lighthouse does not check your Sitemap.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/hreflang.js
