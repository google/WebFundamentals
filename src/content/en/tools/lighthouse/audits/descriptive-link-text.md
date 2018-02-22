project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Links Do Not Have Descriptive Text" Lighthouse audit.

{# wf_updated_on: 2018-02-22 #}
{# wf_published_on: 2018-02-22 #}
{# wf_blink_components: N/A #}

# Links Do Not Have Descriptive Text  {: .page-title }

## Overview {: #overview }

Anchor descriptions, which are the clickable words in links, help users and search engines better
understand your content.

## Recommendations {: #recommendations }

Replace generic descriptions, such as `click here` in the example below:

    <p>To see all of our basketball videos, <a href="videos.html">click here</a>.</p>

With specific descriptions, such as `basketball videos` in the example below.

    <p>Check out all of our <a href="videos.html">basketball videos</a>.</p>

In general, the link text should clearly indicate to users what type of content they'll get if
they click the link. Using the exact title of the document, or a description of the page, is
usually good enough. Avoid using URLs as link descriptions.

[style]: https://developers.google.com/style/link-text

## More information {: #more-info }

Lighthouse flags the following generic link descriptions:

* `click here`
* `click this`
* `go`
* `here`
* `this`
* `start`
* `right here`
* `more`
* `learn more`

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/link-text.js
