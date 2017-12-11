project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "AUDIT_NAME" Lighthouse audit.

{# wf_updated_on: 2017-01-30 #}
{# wf_published_on: 2017-01-30 #}

# AUDIT_NAME  {: .page-title }

## Why the audit is important {: #why }

## How to pass the audit {: #how }

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/AUDIT_NAME

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'AUDIT_NAME / Helpful';
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
