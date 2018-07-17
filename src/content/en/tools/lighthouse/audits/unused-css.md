project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Defer unused CSS" Lighthouse audit.

{# wf_updated_on: 2018-07-17 #}
{# wf_published_on: 2018-07-17 #}
{# wf_blink_components: Platform>DevTools #}

# Defer unused CSS {: .page-title }

## Overview {: #overview }

Using a [`<link>`][link]{: .external } tag is a common way to add styles to a page:

[link]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link

    <!doctype html>
    <html>
      <head>
        <link href="main.css" rel="stylesheet">
        ...

The `main.css` file that the browser downloads is known as an *external stylesheet*, because it's
stored separately from the HTML that uses it.

Since CSS affects the style and layout of DOM nodes, the browser must download, parse, and
process all CSS that a page uses before it can show any content on a user's screen. Displaying
content is also known as *rendering*.

## Recommendations {: #recommendations }

Strategies:

* Manual curation.
* Automated inlining.

## More information {: #more-info }

Sources:

* [Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/unused-css-rules.js
