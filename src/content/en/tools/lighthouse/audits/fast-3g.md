project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Page Load Is Fast Enough On 3G" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-06-14 #}
{# wf_blink_components: N/A #}

# Page Load Is Fast Enough On 3G  {: .page-title }

## Overview {: #overview }

Many mobile users of your page experience the equivalent of a 3G network
connection. Ensuring that your page loads fast over a simulated 3G network
ensures that your page loads in a reasonable amount of time for your mobile
users.

Note: A fast page load on 3G is a baseline requirement for a site to be
considered a Progressive Web App. See [Baseline Progressive Web App
Checklist](/web/progressive-web-apps/checklist#baseline).

## Recommendations {: #recommendations }

There are two main metrics regarding how users perceive load time:

* The page appears visually complete.
* The page is interactive. If a page appears visually complete at 1s,
  but the user can't interact with it until 10s, then the perceived page
  load time is 10s.

To speed up time-to-visually-complete, only load the resources you need in order
to display the page. See [Critical Rendering Path][CRP] and [Optimizing Content
Efficiency][OCE].

[CRP]: /web/fundamentals/performance/critical-rendering-path/
[OCE]: /web/fundamentals/performance/optimizing-content-efficiency/

To speed up time-to-interactive, only execute the JavaScript that you need in
order to display the page, and defer the rest. See [Get Started With Analyzing
Runtime Performance][GS] to learn how to analyze JavaScript execution with
Chrome DevTools. [Record load performance][load] shows you how to record a page
load. Once you're familiar with the basics, do a page load recording and analyze
the results to find JS work that can be deferred. See [Rendering
Performance][RP] for strategies.

[GS]: /web/tools/chrome-devtools/evaluate-performance/
[load]: /web/tools/chrome-devtools/evaluate-performance/reference#record-load
[RP]: /web/fundamentals/performance/rendering/

## More information {: #more-info }

Lighthouse throttles the page if the network connection is faster than
3G and then measures the time to first interactive. If the time to first
interactive is less than 10s, the audit passes.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
