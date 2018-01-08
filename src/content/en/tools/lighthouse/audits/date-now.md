project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Avoids Date.now() In Its Own Scripts" Lighthouse audit.

{# wf_updated_on: 2017-04-18 #}
{# wf_published_on: 2016-12-01 #}

# Avoids Date.now() In Its Own Scripts  {: .page-title }

## Why the audit is important {: #why }

If you're using `Date.now()` to measure time, consider using
`performance.now()` instead. `performance.now()` provides a higher timestamp
resolution, and always increases at a constant rate that is independent
of the system clock, which can be adjusted or manually skewed.

## How to pass the audit {: #how }

In your report, Lighthouse lists every instance of `Date.now()` that it
finds under **URLs**. Replace each of these calls with `performance.now()`.

See [`performance.now()`][MDN] for more information on the API.

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse reports every instance of `Date.now()` that it finds from
scripts that are on the same host as the page. Scripts from other hosts are
excluded, because Lighthouse assumes that you don't have control over these
scripts. So, there may be other scripts using `Date.now()` on your page,
but these won't show up in your Lighthouse report.


{% include "web/tools/lighthouse/audits/_feedback/date-now.html" %}
