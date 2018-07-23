project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Document uses plugins" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2018-03-26 #}
{# wf_blink_components: Platform>DevTools #}

# Document uses plugins  {: .page-title }

## Overview {: #overview }

Plugins harm SEO in two ways:

1. Search engines can't index plugin content. Plugin content won't show up in search results.
2. Many mobile devices don't support plugins, which creates frustrating experiences for
   mobile users This is likely to increase your bounce rate and other signals that indicate to
   search engines that the page is not helpful for mobile users.

Source:

* [Unplayable content](/search/mobile-sites/mobile-seo/common-mistakes#unplayable-content)

## Recommendations {: #recommendations }

Remove the plugins and convert your content to HTML.

See [Video](/web/fundamentals/media/video) to learn the best practices for displaying video on
the web.

## More information {: #more-info }

Lighthouse checks the page for tags that commonly represent plugins:

* `embed`
* `object`
* `applet`

And then flags each tag as a plugin if its MIME type matches any of the following:

* `application/x-java-applet`
* `application/x-java-bean`
* `application/x-shockwave-flash`
* `application/x-silverlight`
* `application/x-silverlight-2`

Or if the tag points to a URL with a file format that is known to represent plugin content:

* `swf`
* `flv`
* `class`
* `xap`

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/plugins.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
