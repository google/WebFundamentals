project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Time to Interactive" Lighthouse audit.

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# Time to Interactive  {: .page-title }

## Why the audit is important {: #why }

Page load is a key aspect of how a user perceives the performance of your
page. See [Measure Performance with the RAIL Method](/web/fundamentals/performance/rail) for more information.

This audit identifies the time at which a page appears to be ready enough that
a user can interact with it.

## How to pass the audit {: #how }

Check out the resources in the [How to pass the audit](speed-index#how) section
of the Speed Index audit for more help on improving page load performance.
The lower your Time to Interactive score, the better.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Time to Interactive is defined as the point at which layout has stabilized,
key webfonts are visible, and the main thread is available enough to handle
user input.

Note that this metric is in early phases and is subject to change.


{% include "web/tools/lighthouse/audits/_feedback/time-to-interactive.html" %}
