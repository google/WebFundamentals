project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Perceptual Speed Index" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-10-04 #}

# Perceptual Speed Index  {: .page-title }

## Why the audit is important {: #why }

Perceptual Speed Index is a page load performance metric that shows you how
quickly the contents of a page are visibly populated. The lower the score,
the better.

## How to pass the audit {: #how }

To lower your Speed Index score, you need to optimize your page to visually
load faster. Two good starting places are:

* [Optimizing Content Efficiency](/web/fundamentals/performance/optimizing-content-efficiency/).
* [Optimizing the Critical Rendering Path](/web/fundamentals/performance/critical-rendering-path/).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse uses a node module called
[Speedline](https://github.com/pmdartus/speedline)
to generate the Speed Index score.

For more information on the algorithms and methodologies behind Speed Index,
see [Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index).

The target score is computed by a cumulative distribution function of a
log-normal distribution. Check out the comments in the
[source](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/speed-index-metric.js)
of the audit if you need to know more.


{% include "web/tools/lighthouse/audits/_feedback/speed-index.html" %}
