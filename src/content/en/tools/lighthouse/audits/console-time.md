project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids console.time() In Its Own Scripts" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2016-12-01 #}
{# wf_blink_components: N/A #}

# Avoids console.time() In Its Own Scripts  {: .page-title }

## Overview {: #overview }

If you're using `console.time()` to measure your page's performance, consider
using the User Timing API instead. Benefits include:

* High-resolution timestamps.
* Exportable timing data.
* Integration with the Chrome DevTools Timeline. When the User Timing function
  `performance.measure()` is called during a Timeline recording, DevTools
  automatically adds the measurement to the Timeline's results, as shown in the
  `my custom measurement` label in the screenshot below.

![User Timing measurement in Chrome DevTools Timeline][timeline]

[timeline]: /web/tools/lighthouse/images/user-timing-measurement-in-devtools.png

## Recommendations {: #recommendations }

In your report, Lighthouse lists every instance of `console.time()` that it
finds under **URLs**. Replace each of these calls with `performance.mark()`.
If you want to measure the time that has elapsed between two marks, use
`performance.measure()`.

See [User Timing API: Understanding Your Web App][html5rocks]
to learn how to use the API.

[html5rocks]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

## More information {: #more-info }

Lighthouse reports every instance of `console.time()` that it finds from
scripts that are on the same host as the page. Scripts from other hosts are
excluded, because Lighthouse assumes that you don't have control over these
scripts. So, there may be other scripts using `console.time()` on your page,
but these won't show up in your Lighthouse report.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
