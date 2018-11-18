project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Links Do Not Have Descriptive Text" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2018-02-22 #}
{# wf_blink_components: N/A #}

# Links Do Not Have Descriptive Text  {: .page-title }

## Overview {: #overview }

Link descriptions, which are the clickable words in links, help users and search engines better
understand your content.

## Recommendations {: #recommendations }

Replace generic descriptions, such as `click here` in the example below...

    <p>To see all of our basketball videos, <a href="videos.html">click here</a>.</p>

...with specific descriptions, such as `basketball videos` in the example below.

    <p>Check out all of our <a href="videos.html">basketball videos</a>.</p>

In general, the link text should clearly indicate to users what type of content they'll get if
they click the link.

More recommendations:

* Stay on topic. Don't use text that has no relation to the page's content.
* Don't use the page's URL as the link description, unless you have a good reason to do so,
  such as referencing a site's new address.
* Keep descriptions concise. Aim for a few words or a short phrase.
* Format links so that they're easy to spot.
* Pay attention to your internal links, too. Improving the quality of internal links can
  help users and Google navigate your site easier.

See [Use links wisely][support]{:.external} for more guidance. You'll need to scroll a bit,
there's no anchor to the exact section.

[support]: https://support.google.com/webmasters/answer/7451184#optimize

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

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
