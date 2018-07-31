project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Preload key requests" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2018-03-28 #}
{# wf_blink_components: Platform>DevTools #}

# Preload key requests  {: .page-title }

## Overview {: #overview }

Preloading requests can make your pages load faster.

Suppose your page's [critical request chain][CRC] looks like this:

[CRC]: /web/tools/lighthouse/audits/critical-request-chains

    index.html
    |--app.js
       |--styles.css
       |--ui.js

Your `index.html` file declares `<script src="app.js">`. When  `app.js` runs , it calls
`fetch()` in order to download `styles.css` and `ui.js`. The page doesn't appear complete
until those last 2 resources are downloaded, parsed, and executed.

<figure>
  <img src="images/before.png"
       alt="Without preload links, styles.css and ui.js are requested only after
            app.js has been downloaded, parsed, and executed."/>
  <figcaption>
    <b>Figure 1</b>. Without preload links, <code>styles.css</code> and
    <code>ui.js</code> are requested only after <code>app.js</code> has been downloaded,
    parsed, and executed.
  </figcaption>
</figure>

The problem here is that the browser only becomes aware of those last 2 resources after it
downloads, parses, and executes `app.js`. Yet you as a developer know that those resources are
important and should be downloaded as soon as possible.

## Recommendations {: #recommendations }

Declare preload links in your HTML to instruct the browser to download key resources
as soon as possible.

    <head>
      ...
      <link rel="preload" href="styles.css" as="style">
      <link rel="preload" href="ui.js" as="script">
      ...
    </head>

<figure>
  <img src="images/after.png"
       alt="With preload links, styles.css and ui.js are requested at the same time
            as app.js."/>
  <figcaption>
    <b>Figure 2</b>. With preload links, <code>styles.css</code> and
    <code>ui.js</code> are requested at the same time as <code>app.js</code>.
  </figcaption>
</figure>

The table below lists browser support for preload links.

{% framebox width="auto" height="auto" enable_widgets="true" %}
  <p class="ciu_embed" data-feature="link-rel-preload"
     data-periods="future_2,future_1,current,past_1,past_2"
     data-accessible-colours="false">
    See <a href="http://caniuse.com/#feat=link-rel-preload">Can I Use link-rel-preload?</a>
    to see browser support for preload links.
  </p>
  <script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/caniuse-embed.min.js"
          onload="devsite.framebox.AutoSizeClient.updateSize()"></script>
{% endframebox %}

## More information {: #more-info }

Lighthouse flags the third level of requests in your critical request chain as preload
candidates. Using the example above, Lighthouse would flag `styles.css` and `ui.js`
as candidates. The potential savings are based on how much earlier the
browser would be able to start the requests if you declared preload links. For example,
if `app.js` takes 200ms to download, parse, and execute, the potential savings for each
resource is 200ms since `app.js` is no longer a bottleneck for each of the requests.

Sources:

* [Preload, Prefetch, And Priorities In Chrome][Addy]{:.external}
* [Preload: What Is It Good For?][Yoav]{:.external}
* [Audit source][src]{:.external}

[Addy]: https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
[Yoav]: https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/
[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/uses-rel-preload.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
