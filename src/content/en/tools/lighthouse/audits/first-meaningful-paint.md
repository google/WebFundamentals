project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "First Meaningful Paint" Lighthouse audit.

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# First Meaningful Paint {: .page-title }

## Why the audit is important {: #why }

Page load is a key aspect of how a user perceives the performance of your
page. See [Measure Performance with the RAIL Method](/web/fundamentals/performance/rail) for more information.

This audit identifies the time at which the user feels that the primary
content of the page is visible.

## How to pass the audit {: #how }

The lower your First Meaningful Paint score, the faster that the page
appears to display its primary content.

[Optimizing the Critical Rendering Path](/web/fundamentals/performance/critical-rendering-path/)
is particularly helpful towards achieving a faster First Meaningful Paint.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

First Meaningful Paint is essentially the paint after which the biggest
above-the-fold layout change has happened, and web fonts have loaded. See the
spec to learn more:
[First Meaningful Paint: A Layout-Based Aproach](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view).


{% include "web/tools/lighthouse/audits/_feedback/first-meaningful-paint.html" %}
