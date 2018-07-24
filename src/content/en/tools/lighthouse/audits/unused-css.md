project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Defer unused CSS" Lighthouse audit.

{# wf_updated_on: 2018-07-19 #}
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

By default, a browser must download, parse, and process all external stylesheets that it
encounters before it can display, or *render*, any content to a user's screen. It wouldn't make
sense for a browser to attempt to display content before the stylesheets have been processed, because
the stylesheets may contain rules that affect the styling of the page.

Each external stylesheet must be downloaded from the network. These extra network trips can
significantly increase the time that users must wait before they see any content on their screens.

Unused CSS also slows down a browser's construction of the [render tree][render]. The render
tree is like the DOM tree, except that it also includes the styles for each node.
To construct the render tree, a browser must walk the entire DOM tree, and check which CSS rules
apply to each node. The more unused CSS there is, the more time that a browser might potentially
need to spend calculating the styles for each node.

[render]: /web/fundamentals/performance/critical-rendering-path/render-tree-construction

## Recommendations {: #recommendations }

The CSS that is needed in order to load a page is called the *critical CSS*. In general, a page
load should only be blocked on critical CSS. See [Detecting critical CSS](#detecting).

Theoretically, the most optimal approach is to inline critical CSS into the `<head>` of the HTML.
Once the HTML is downloaded, a browser has everything that it needs in order to display the page.
It doesn't need to make any more network requests. See [Inlining CSS](#inlining).

    <!doctype html>
    <html>
      <head>
        <style>
          /* Critical CSS here. */
        </style>
        ...

*Uncritical CSS* is CSS that the page might need later. For example, suppose clicking a button
causes a modal to appear. The modal only appears after clicking the button. The modal's style
rules are uncritical, because the modal will never be displayed when the page is first loaded.
See [Deferring uncritical CSS](#deferring).

### Detecting critical CSS {: #detecting }

The Coverage tab of Chrome DevTools can help you discover critical and uncritical CSS. See
[View used and unused CSS with the Coverage tab][coverage].

[coverage]: /web/tools/chrome-devtools/css/reference#coverage

<figure>
  <img src="/web/tools/chrome-devtools/css/imgs/coverage-detail.png"
       alt="The Coverage tab."/>
  <figcaption>
    <b>Figure 1</b>. The Coverage tab
  </figcaption>
</figure>

You can also extract this information from Puppeteer.
See [`page.coverage`][puppeteer]{: .external }.

[puppeteer]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagecoverage

### Inlining critical CSS {: #inlining }

This is a list of up-to-date tools that can automate the process of inlining critical CSS.
You are welcome to [add your own tool to this list][doc]{:.external}.

[doc]: https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/lighthouse/audits/unused-css.md

Caution: None of these tools have been vetted. Make sure to do your own due diligence.

Node:

* [penthouse](https://github.com/pocketjoso/penthouse){: .external }
* [critical](https://github.com/addyosmani/critical){: .external }
* [inline-critical](https://github.com/bezoerb/inline-critical){: .external }

Apache:

* [mod_pagespeed](https://github.com/apache/incubator-pagespeed-mod){: .external }

Nginx:

* [ngx_pagespeed](https://github.com/pagespeed/ngx_pagespeed){: .external }

Webpack:

* [isomorphic-style-loader](https://github.com/kriasoft/isomorphic-style-loader/){: .external }

Rollup:

* [rollup-plugin-purgecss](https://github.com/FullHuman/rollup-plugin-purgecss){: .external }

Gulp:

* [gulp-inline-source](https://github.com/fmal/gulp-inline-source){: .external }

Grunt:

* [grunt-penthouse](https://github.com/fatso83/grunt-penthouse){: .external }
* [grunt-critical](https://github.com/bezoerb/grunt-critical){: .external }

### Deferring uncritical CSS {: #deferring }

This is a list of up-to-date tools that can automate the process of deferring uncritical CSS.
You are welcome to [add your own tool to this list][doc]{:.external}.

Caution: None of these tools have been vetted. Make sure to do your own due diligence.

* [loadCSS](https://github.com/filamentgroup/loadCSS){: .external }

## More information {: #more-info }

Lighthouse ignores any file with less than 2 kilobytes of potential savings.

Sources:

* [Audit source][src]{: .external }
* [Optimize CSS Delivery](/speed/docs/insights/OptimizeCSSDelivery)
* [Render-Tree Construction, Layout, and Paint](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/unused-css-rules.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
