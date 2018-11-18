project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "First Contentful Paint" Lighthouse audit.

{# wf_updated_on: 2018-08-15 #}
{# wf_published_on: 2018-08-15 #}
{# wf_blink_components: Platform>DevTools #}

# First Contentful Paint  {: .page-title }

## Overview {: #overview }

<blockquote>
  <p>
    Load is not a single moment in time — it’s an experience that no one metric can fully capture.
    There are multiple moments during the load experience that can affect whether a user perceives
    it as "fast" or "slow".
  </p>
  <p>--- <a class="external" href="https://w3c.github.io/paint-timing/">Paint Timing spec</a></p>
</blockquote>

First Contentful Paint (FCP) marks the point, immediately after navigation, when the browser renders
the first bit of content from the DOM. This is an important milestone for users because
it provides feedback that the page is actually loading.

## Recommendations {: #recommendations }

To speed up First Contentful Paint, speed up the download time of resources or do less work that
blocks the browser from rendering DOM content.

* Minimize the number of render-blocking external stylesheets and scripts upon which the page depends.
  See [Render-Blocking CSS](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)
  and [Loading Third-Party JavaScript][3PJS].
* Use [HTTP Caching][Caching] to speed up repeat visits.
* Minify and compress text-based assets to speed up their download time. See [Optimizing Encoding
  and Transfer Size of Text-Based Assets][Text].
* [Optimize JavaScript bootup][bootup] and reduce JavaScript payloads with [tree shaking][tree shaking]
  or [code splitting][code splitting]. The goal is to do less JavaScript work on page load.

[3PJS]: /web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/
[Caching]: /web/fundamentals/performance/get-started/httpcaching-6
[Text]: /web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer
[bootup]: /web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/
[tree shaking]: /web/fundamentals/performance/optimizing-javascript/tree-shaking/
[code splitting]: /web/fundamentals/performance/optimizing-javascript/code-splitting/

### Tracking FCP in the real world {: #RUM }

To measure when FCP actually occurs on your users' devices, see
[Tracking FP/FCP](/web/fundamentals/performance/user-centric-performance-metrics#tracking_fpfcp).
The code snippet describes how to programmatically access FCP data and submit it to Google
Analytics.

See [Assessing Loading Performance in Real Life with Navigation and Resource Timing][RUM]
for more on collecting real-user metrics.

[RUM]: /web/fundamentals/performance/navigation-and-resource-timing/

## More information {: #more-info }

See [First Contentful Paint](https://w3c.github.io/paint-timing/#first-contentful-paint){:.external}
for an exact definition of what types of content trigger the First Contentful Paint milestone.

Sources:

* [Audit source][src]{:.external}
* [Paint Timing spec](https://w3c.github.io/paint-timing/){:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/metrics/first-contentful-paint.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
