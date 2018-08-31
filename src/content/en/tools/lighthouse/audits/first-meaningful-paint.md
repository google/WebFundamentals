project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "First Meaningful Paint" Lighthouse audit.

{# wf_updated_on: 2018-08-05 #}
{# wf_published_on: 2016-10-05 #}
{# wf_blink_components: N/A #}

# First Meaningful Paint {: .page-title }

## Overview {: #overview }

Page load is a key aspect of how a user perceives the performance of your
page. See [Measure Performance with the RAIL Method](/web/fundamentals/performance/rail) for more information.

This audit identifies the time at which the user feels that the primary
content of the page is visible.

## Recommendations {: #recommendations }

The lower your First Meaningful Paint score, the faster that the page
appears to display its primary content.

[Optimizing the Critical Rendering Path](/web/fundamentals/performance/critical-rendering-path/)
is particularly helpful towards achieving a faster First Meaningful Paint.

## More information {: #more-info }

First Meaningful Paint is essentially the paint after which the biggest
above-the-fold layout change has happened, and web fonts have loaded. See the
spec to learn more:
[First Meaningful Paint: A Layout-Based Approach](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view).


## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
