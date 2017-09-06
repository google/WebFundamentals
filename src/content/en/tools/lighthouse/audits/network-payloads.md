project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Enormous Network Payloads" Lighthouse audit.

{# wf_updated_on: 2017-06-21 #}
{# wf_published_on: 2017-06-21 #}

# Avoids Enormous Network Payloads  {: .page-title }

## Why the audit is important {: #why }

Reducing the total size of network requests speeds up page load time and
saves your users money that they would have spent on cellular data.

See [Highest Correlation To Load Time][httparchive] to view the correlation
between requests and load time.

See [What Does My Site Cost][cost] to calculate the cost of viewing your
site around the world. You can adjust the results to factor in purchasing
power.


[httparchive]: http://httparchive.org/interesting.php#onLoad
[cost]: https://whatdoesmysitecost.com/

## How to pass the audit {: #how }

Click **View Details** to see your page's requests. The largest requests are
presented first. Reduce the size of the requests to reduce your total
payload size.

Here are some strategies for reducing payload size:

* Defer requests until they're needed. See [The PRPL Pattern][PRPL] for
  one possible approach.
* Optimize requests to be as small as possible. Possible techniques include:
    * [Enable text compression][txtcompression].
    * Minify HTML, JS, and CSS. See [Minification][mini].
    * Use WebP instead of JPEG or PNG. See [Serve Images As WebP][webp].
    * Set the compression level of JPEG images to 85. See [Optimize
      Images][opto].
* Cache requests so that the page doesn't re-download the resources on repeat
  visits. See [HTTP Caching][http] and [Service Workers: An Introduction][SW].

[PRPL]: /web/fundamentals/performance/prpl-pattern/
[txtcompression]: /web/tools/lighthouse/audits/text-compression#how
[mini]: /web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations
[webp]: /web/tools/lighthouse/audits/webp
[opto]: /web/tools/lighthouse/audits/optimize-images#how
[http]: /web/fundamentals/performance/optimizing-content-efficiency/http-caching
[SW]: /web/fundamentals/getting-started/primers/service-workers

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse sums up the total byte size of all resources that the page
requested.

The target score of 1600KB is based on what a page can theoretically download
on a 3G connection, while still achieving a time-to-interactive of 10 seconds
or less. See [googlechrome/lighthouse/pull/1759][PR] for the original
discussion.

[PR]: https://github.com/GoogleChrome/lighthouse/pull/1759

The 0 to 100 score is calculated from a lognormal distribution.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/total-byte-weight.js

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'Network Payloads / Helpful';
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
