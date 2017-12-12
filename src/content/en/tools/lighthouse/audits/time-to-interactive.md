project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Time to Interactive" Lighthouse audit.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2016-10-05 #}
{# wf_blink_components: N/A #}

# Time to Interactive  {: .page-title }

## Overview {: #overview }

Page load is a key aspect of how a user perceives the performance of your
page. See [Measure Performance with the RAIL Method](/web/fundamentals/performance/rail) for more information.

This audit identifies the time at which a page appears to be ready enough that
a user can interact with it.

## Recommendations {: #recommendations }

See [Speed Index](speed-index#recommendations) for more help on improving page load performance.
The lower your Time to Interactive score, the better.

More information {: #more-info }

Time to Interactive is defined as the point at which layout has stabilized,
key webfonts are visible, and the main thread is available enough to handle
user input.

Note that this metric is in early phases and is subject to change.


{% include "web/tools/lighthouse/audits/_feedback/time-to-interactive.html" %}
