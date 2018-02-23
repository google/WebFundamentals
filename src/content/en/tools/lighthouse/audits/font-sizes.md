project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Document Doesn't Use Legible Font Sizes" Lighthouse audit.

{# wf_updated_on: 2018-02-23 #}
{# wf_published_on: 2018-02-21 #}
{# wf_blink_components: Platform>DevTools #}

# Document Doesn't Use Legible Font Sizes  {: .page-title }

## Overview {: #overview }

Font sizes smaller than 12px are often difficult to read on mobile devices, and may require users
to pinch-to-zoom in order to display the text at a comfortable reading size.

## Recommendations {: #recommendations }

Aim to have a font size of at least 12px on at least 60% of the text on your pages. 
When a page fails the audit, Lighthouse lists the results in a table with 4 columns:

* **Source**. The source location of the CSS ruleset that is causing the illegible text.
* **Selector**. The selector of the ruleset.
* **% of Page Text**. The percentage of text on the page that is affected by the ruleset.
* **Font Size**. The computed size of the text.

### Text is illegible because of a missing viewport config {: #viewport }

If Lighthouse reports `Text is illegible because of a missing viewport config`, add a
`<meta name="viewport" content="width=device-width, initial-scale=1">` tag to the `<head>` of
your document. See [Has A Viewport Meta Tag With Width Or Initial-Scale][viewport].

[viewport]: /web/tools/lighthouse/audits/has-viewport-meta-tag

## More information {: #more-info }

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/font-size.js
