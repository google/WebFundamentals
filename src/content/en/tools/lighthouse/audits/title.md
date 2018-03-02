project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Document Doesn't Have A Title Element" Lighthouse audit.

{# wf_updated_on: 2018-03-02 #}
{# wf_published_on: 2018-03-02 #}
{# wf_blink_components: Platform>DevTools #}

# Document Doesn't Have A Title Element  {: .page-title }

## Overview {: #overview }

Note: This audit occurs in both the Accessibility and SEO categories of your
Lighthouse report.

### Accessibility {: #accessibility }

The document title gives screen readers users an overview of a page's purpose.

See [Documents must have `<title>` element to aid in navigation][a11y]{:.external}
for more discussion about the accessibility aspects of this audit.

[a11y]: https://dequeuniversity.com/rules/axe/2.2/document-title

### SEO {: #seo }

Search users rely heavily on document titles. It's often the primary piece of
information for deciding whether a page is relevant to a query.

## Recommendations {: #recommendations }

Make sure that every page has a title.

    <!doctype html>
    <html>
      <head>
        <title>Create Good Titles</title>
      </head>
      ...
    </html>

If you've got a big site, use the [HTML Improvements Report][HIR]{:.external}
to crawl the site and discover any page that's missing a title.

[HIR]: https://support.google.com/webmasters/answer/80407

Tips for creating great titles:

* Make them descriptive and concise. Avoid vague descriptions like `Home`.
* Avoid keyword stuffing. It's not helpful to users, and search engines may
  mark the page as spam.
* Avoid repeated or boilerplate titles.
* It's OK to brand your titles, but do it concisely.
* Be careful about disallowing search engines. Your page can still be indexed,
  even if robots are blocked from crawling it. If a robot can't crawl it, then
  a search engine will be forced to rely on off-page content, such as link
  descriptions from other sites, in order to describe the page. See [Block
  search indexing with 'noindex'][B]{:.external} to learn how to block a page
  from appearing in search indexes.

See [Create descriptive page titles][CDPT]{:.external} for more on these tips.

[CDPT]: https://support.google.com/webmasters/answer/35624
[B]: https://support.google.com/webmasters/answer/93710

## More information {: #more-info }

This audit is powered by the [aXe accessibility engine][aXe]{:.external}.

[aXe]: https://www.deque.com/products/axe/

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/accessibility/document-title.js
