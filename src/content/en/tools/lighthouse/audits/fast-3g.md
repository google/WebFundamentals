project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Page Load Is Fast Enough On 3G" Lighthouse audit.

{# wf_updated_on: 2017-06-14 #}
{# wf_published_on: 2017-06-14 #}

# Page Load Is Fast Enough On 3G  {: .page-title }

## Why the audit is important {: #why }

Many mobile users of your page experience the equivalent of a 3G network
connection. Ensuring that your page loads fast over a simulated 3G network
ensures that your page loads in a reasonable amount of time for your mobile
users.

Note: A fast page load on 3G is a baseline requirement for a site to be
considered a Progressive Web App. See [Baseline Progressive Web App
Checklist](/web/progressive-web-apps/checklist#baseline).

## How to pass the audit {: #how }

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

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse throttles the page if the network connection is faster than
3G and then measures the time to first interactive. If the time to first
interactive is less than 10s, the audit passes.

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Fast Enough On 3G / Helpful';
var url = 'https://github.com/google/webfundamentals/issues/new?title=[' +
      label + ']';
var feedback = {
  "category": "Lighthouse",
  "choices": [
    {
      "button": {
        "text": "This Doc Was Helpful"
      },
      "response": "Thanks for the feedback.",
      "analytics": {
        "label": label
      }
    },
    {
      "button": {
        "text": "This Doc Was Not Helpful"
      },
      "response": 'Sorry to hear that. Please <a href="' + url +
          '" target="_blank">open a GitHub issue</a> and tell us how to ' +
          'make it better.',
      "analytics": {
        "label": label,
        "value": 0
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}
