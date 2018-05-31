project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2018-05-31 #}
{# wf_published_on: 2018-06-01 #}
{# wf_blink_components: Platform>DevTools #}

# Get Started With Improving Load Performance {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Goal of tutorial

This tutorial teaches you how to use Chrome DevTools to find ways to make your web pages
load faster.

At the end of this tutorial, you still may not understand all of the theories behind load
performance optimization, *and that is totally OK*. It's a complicated field, and it takes time
to learn.

You will, however, leave this tutorial with an easy-to-understand, yet detailed and
quantitative, workflow for measuring load performance. And you will also know how to
*prove* that any changes you make actually have improved performance.

## Prerequisites

You should have basic web development experience, similar to the level of experience
outlined in this [Introduction to Web Development][intro] syllabus. You don't need to
know anything about load performance.

[intro]: https://www.coursera.org/learn/web-development

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

Whenever you begin to improve a page's load performance **always start with an audit**.
The audit has 2 important functions:

* It creates a baseline for you to measure subsequent changes against. Rather than just making a change
  and assuming that it'll make the page load faster, the before and after audits give you quantitative proof
  that the change is working as intended. Sometimes, you'll introduce a change, and be shocked to discover that
  it actually makes the page *slower*!
* It gives you actionable tips on what changes will have the most impact.

### Set up {: #setup }

1. Go to `chrome://version` to check what version of Chrome you're using. This tutorial was
   created with Chrome 68. If you're using an earlier or later version, the DevTools UI may look
   different, or some features may not be available. You should still be able to get through most
   of the tutorial. Please [send feedback](#feedback) if you can't and we'll update this tutorial.
1. <a class="gc-analytics-event" href="https://before.glitch.me" target="_blank" rel="noopener"
   data-category="CTA" data-label="{% dynamic print request.path %}">Open the site</a>.
1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac)
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> to open Chrome DevTools.

<figure>
  <img src="imgs/devtools.png" alt="DevTools."/>
  <figcaption>
    <b>Figure X</b>. DevTools
  </figcaption>
</figure>

Tip: You can dock DevTools to the left, right, of bottom of your page. You can also undock it
into a separate window. See [Change DevTools placement](/web/tools/chrome-devtools/ui#placement).

### Establish a baseline {: #baseline }

1. Click the **Audits** tab. It may be hidden behind the **More Panels**
   ![More Panels](imgs/more-panels.png){:.inline-icon} button. There's a Lighthouse on this
   page because the project that powers the Audits panel is called Lighthouse.

     <figure>
       <img src="imgs/audits.png" alt="The Audits panel."/>
       <figcaption>
         <b>Figure X</b>. The Audits panel
       </figcaption>
     </figure>

1. In the **Audits** section, keep the **Performance** checkbox enabled, but disable all the
   other ones. Leave the settings in the other sections as is.

     <figure>
       <img src="imgs/config.png" alt="Audit settings."/>
       <figcaption>
         <b>Figure X</b>. Audit settings
       </figcaption>
     </figure>

1. Click **Run audits**.

### Master the report UI {: #report }

TODO mention how each page will highlight different areas of improvement, because each page is coded diffferently.

The report gives you a lot of information. Here's how to make sense of it all.

1. The number within the circle represents your overall performance score.

1. **Metrics** represent different measurements of what your users experience when they load
   your page. There is no single metric that encompasses the whole experience.
1. Hover over the **First Contentful Paint** metric. DevTools gives you more information about
   what the metric measures. Click **Learn more**. Chrome opens up a new tab containing
   documentation about that metric.

     TODO hovering over metric screenshot

1. Below **Metrics** is a timeline of screenshots representing how the page looks during the
   course of the load.
1. **Opportunies** provides specific tips on how to improve the page. Working on these tips
   should improve the **Metrics** scores.
1. **Diagnostics** 

## Step 2: Experiment with optimizations

When you attempt to optimize your own code, it's best to make a single change, and then run an audit
again, to ensure that your load performance is working in the right direction.

However, you probably have things to do, so we're not going to make you make changes to some random codebase,
and then re-run audits multiple times in order to see the changes. In this section, we're just going
to briefly walk through how we made this particular codebase faster.

### Minify images

When you make these changes yourself, you may need to experiment with different options. For example, it actually
took me a couple hours to get these image optimizations working. It's totally normal to not get it perfect on the
first try. But making your site load faster for your users is worth the effort!

## Summary {: #summary}

1. Run an audit to measure your baseline performance.
1. 


## Next steps {: #next-steps }

### Convince your company to invest in load performance

### Get help from the DevTools community

## Feedback {: #feedback }

TODO
