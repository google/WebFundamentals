project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Deprecated APIs" Lighthouse audit.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2017-07-12 #}

# Avoids Deprecated APIs  {: .page-title }

## Why the audit is important {: #why }

Deprecated APIs are scheduled to be removed from Chrome. Calling these APIs
after they're removed will cause errors on your site.

## How to pass the audit {: #how }

Lighthouse flags the deprecated APIs in your report. Go to [Chrome Platform
Status][CPS]{:.external} and expand the entries for the APIs that you're using
to learn more about why the APIs are deprecated, as well as how to replace
them.

[CPS]: https://www.chromestatus.com/features#deprecated

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse collects the deprecated API warnings that Chrome logs to the
DevTools Console.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/deprecations.js

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Deprecated APIs / Helpful';
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
