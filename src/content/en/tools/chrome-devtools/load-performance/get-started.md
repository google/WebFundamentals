project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2018-05-25 #}
{# wf_published_on: 2018-06-01 #}
{# wf_blink_components: Platform>DevTools #}

# Get Started With Improving Load Performance {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<aside class="objective">
  <b>Goal</b>: This tutorial teaches you how to use Chrome DevTools to find ways
  to make web pages load faster.
</aside>

<aside class="caution">
  <b>Prerequisites</b>: You should have basic web development experience,
  similar to the level of the syllabus for <a href="https://www.coursera.org/learn/web-development"
  class="external">Introduction to Web Development</a>.
</aside>

## Overview {: #overview }

Your boss has assigned you a maintenance project. The previous employee in charge
of the code, Tony the cat, has left the company.

<figure>
  <img src="imgs/tony.jpg" alt="Tony the cat."/>
  <figcaption>
    <b>Figure X</b>. Tony the cat
  </figcaption>
</figure>

Note: Many people do not know that cats can build websites. They can, they're just not
very good at it.

Your marketing team has identified this as an important site for the company.
They have also recently read that there is a strong correlation between page
load time and engagement metrics, such as time spent on page, bounce rates, and
conversions.

## Step 1: Audit the page {: #audit }

Whenever you set out to improve a page's load performance, start with an audit.
The audit has 2 important functions: it establishes a quantitative baseline, and
it gives you actionable tips on what changes will have the most impact.

### Set up {: #setup }

### Establish a baseline {: #baseline }

1. <a href="https://before.glitch.me">Open the site</a>.
1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac)
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> to open Chrome DevTools.
1. Click the **Audits** tab. It may be hidden behind the **More Panels**
   ![TODO](TODO){:.inline-icon} button.
1. Click **Perform an audit**.
1. Keep the **Performance** checkbox enabled, but disable all the other ones.
1. Click **Run audit**. DevTools simulates a mobile user's experience by
   throttling the network and CPU. Mobile devices often access the web with
   slower network connections, and less powerful CPUs.
1. Wait for the audit to finish. DevTools shows a report of the page's
   performance.

### Understand your report {: #report }

The report seems useful, but what all does it mean exactly?

## Step X: Share the report


## Next steps {: #next-steps }

### Convince your company to invest in load performance

### Get help from the DevTools community

## Feedback {: #feedback }

TODO
