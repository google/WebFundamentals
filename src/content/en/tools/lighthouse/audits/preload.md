project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Preload key requests" Lighthouse audit.

{# wf_updated_on: 2018-03-27 #}
{# wf_published_on: 2018-03-26 #}
{# wf_blink_components: Platform>DevTools #}

# Preload key requests  {: .page-title }

## Overview {: #overview }

Preloading requests can help speed up your page load.

Suppose your page's [critical request chain][CRC] looks like this:

[CRC]: /web/tools/lighthouse/audits/critical-request-chains

    index.html
    |--app.js
       |--styles.css
       |--font.woff
       |--ui.js

Your `index.html` file declares `<script src="app.js">`. When  `app.js` runs , it calls
`fetch()` in order to download `styles.css`, `font.woff`, and `ui.js`.

The page's [first meaningful paint][FMP] is blocked on those last 3 resources. In other words,
there won't be any content on the page until the browser loads and parses those resources.
The problem here is that the browser only becomes aware of those last 3 resources after it
parses and executes `app.js`. Yet you as a developer know that those resources are important.

[FMP]: /web/tools/lighthouse/audits/first-meaningful-paint

## Recommendations {: #recommendations }

Declare preload links in your HTML to instruct the browser to download the key resources
earlier.

    <link rel="preload" href="styles.css" as="style">
    <link rel="preload" href="font.woff" as="font">
    <link rel="preload" href="ui.js" as="script">

{% framebox width="auto" height="auto" enable_widgets="true" %}
  <script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js"></script>
  <p class="ciu_embed" data-feature="link-rel-preload"
     data-periods="future_2,future_1,current,past_1,past_2"
     data-accessible-colours="false">
    See <a href="http://caniuse.com/#feat=link-rel-preload">Can I Use link-rel-preload?</a>
    to find out which browsers support preload.
  </p>
{% endframebox %}

## More information {: #more-info }

Sources:

* [Preload, Prefetch, And Priorities In Chrome][Addy]{:.external}
* [Preload: What Is It Good For?][Yoav]{:.external}
* [Audit source][src]{:.external}

[Addy]: https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
[Yoav]: https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/uses-rel-preload.js
