project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Consistently Interactive" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-06-23 #}
{# wf_blink_components: N/A #}

# Consistently Interactive {: .page-title }

## Overview {: #overview }

The Consistently Interactive metric measures when a page is *fully* interactive:

* The page strictly meets the [Idle guideline of the RAIL performance model][I]:
  the page yields control back to the main thread at least once every 50ms.
* The network is idle. Specifically, there are only two open network requests
  remaining.

[I]: /web/fundamentals/performance/rail#idle

Note: Maximizing idle time also indirectly improves [Response][R] time.
The more idle time there is, the more likely that the page will be able
to respond to user input in the target time of 100ms or less.

[R]: /web/fundamentals/performance/rail#response

See also [First Interactive](first-interactive).

## Recommendations {: #recommendations }

To improve your Consistently Interactive score:

* Minimize the number of required or "critical" resources that must be
  downloaded or executed before the page can load. See [Critical Rendering
  Path][CRP].
* Minimize the size of each critical resource. See [Optimizing Content
  Efficiency][OCE].
* Maximize idle time so that your JavaScript spends no more than 50ms at
  a time executing tasks in the main thread. See [Optimizing JavaScript
  Execution][OJE].

[CRP]: /web/fundamentals/performance/critical-rendering-path
[OCE]: /web/fundamentals/performance/optimizing-content-efficiency
[OJE]: /web/fundamentals/performance/rendering/optimize-javascript-execution

## More information {: #more-info }

The score is a lognormal distribution of some complicated calculations based on
the definition of the Consistently Interactive metric. See [First Interactive
And Consistently Interactive][FIACI] for definitions.

[FIACI]: https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/consistently-interactive.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
