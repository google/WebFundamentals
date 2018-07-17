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

Since CSS affects the style and layout of [DOM][DOM]{: .external } nodes, the browser must
download, parse, and process all CSS that a page uses before it can show any content on a
user's screen. Displaying content is usually called *rendering*.

[DOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

Suppose `main.css` is a huge file, but your HTML page only uses one
[ruleset][ruleset]{: .external } from the file. Unfortunately, the browser doesn't know
that your page only needs one ruleset from the file. Instead, it downloads the entire huge file,
parses all of its rulesets, and checks if any of those rulesets apply to the HTML
nodes on your page.

[ruleset]: https://css-tricks.com/css-ruleset-terminology/

Downloading, parsing, and processing CSS rulesets all slow down your page load time. You can
speed up your page load time by *only* shipping the CSS that you need in order to load the page.
This CSS is sometimes called the *critical CSS*. Other CSS that *might* be used later, as
the user interacts with the page, should be deferred.

TODO add "does this make sense?" feedback here

## Recommendations {: #recommendations }

Strategies:

* Manual curation.
* Automated inlining.

## More information {: #more-info }

Sources:

* [Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/unused-css-rules.js
