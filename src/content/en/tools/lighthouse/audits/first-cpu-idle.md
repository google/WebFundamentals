project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "First CPU Idle" Lighthouse audit.

{# wf_updated_on: 2018-10-01 #}
{# wf_published_on: 2017-06-23 #}
{# wf_blink_components: N/A #}

# First CPU Idle {: .page-title }

## Overview {: #overview }

Note: This audit used to be called First Interactive. It changed to First CPU Idle
in Lighthouse 3.0 to more clearly describe how it works.

The First CPU Idle metric measures when a page is *minimally* interactive:

* *Most*, but maybe not all, UI elements on the screen are interactive.
* The page responds, *on average*, to most user input in a reasonable amount
  of time.

See also [Consistently Interactive](consistently-interactive).

## Recommendations {: #recommendations }

There are two general strategies for improving load time:

* Minimize the number of required or "critical" resources that must be
  downloaded or executed before the page can load. See [Critical Rendering
  Path][CRP].
* Minimize the size of each critical resource. See [Optimizing Content
  Efficiency][OCE].

[CRP]: /web/fundamentals/performance/critical-rendering-path
[OCE]: /web/fundamentals/performance/optimizing-content-efficiency

## More information {: #more-info }

The score is a lognormal distribution of some complicated calculations based on
the definition of the First CPU Idle metric. See [First Interactive And
Consistently Interactive][FIACI] for definitions.

[FIACI]: https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/first-interactive.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
