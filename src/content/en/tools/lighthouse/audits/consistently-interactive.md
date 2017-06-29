project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Consistently Interactive" Lighthouse audit.

{# wf_updated_on: 2017-06-23 #}
{# wf_published_on: 2017-06-23 #}

# Consistently Interactive {: .page-title }

## Why the audit is important {: #why }

The Consistently Interactive metric measures when a page is *fully* interactive:

* *Everything* shown on the screen is interactive.
* The page strictly meets the R guideline of the RAIL performance model:
  *everything* on the page responds to user input within 100ms. See [Response:
  respond in under 100ms][R].

[R]: /web/fundamentals/performance/rail#response

See also [First Interactive](first-interactive).

## How to pass the audit {: #how }

There are two general strategies for improving load time:

* Minimize the number of required or "critical" resources that must be
  downloaded or executed before the page can load. See [Critical Rendering
  Path][CRP].
* Minimize the size of each critical resource. See [Optimizing Content
  Efficiency][OCE].

[CRP]: /web/fundamentals/performance/critical-rendering-path
[OCE]: /web/fundamentals/performance/optimizing-content-efficiency

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

The score is a lognormal distribution of some complicated calculations based on
the definition of the Consistently Interactive metric. See [First Interactive
And Consistently Interactive][FIACI] for definitions.

[FIACI]: https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/consistently-interactive.js

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Consistently Interactive / Helpful';
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
