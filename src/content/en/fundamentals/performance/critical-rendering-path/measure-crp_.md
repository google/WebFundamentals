project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Learn to measure the critical rendering path.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# Measuring the Critical Rendering Path with Navigation Timing {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

You can't optimize what you can't measure. Luckily, the Navigation 
Timing API provides the necessary tools to measure each step of the 
critical rendering path (CRP).

## TL;DR
- Navigation Timing provides high resolution timestamps for measuring the CRP.
- The browser emits series of consumable events that capture various stages of the CRP.


The foundation of every solid performance strategy is good measurement and instrumentation, which is exactly what the Navigation Timing API provides.

<img src="images/dom-navtiming.png"  alt="Navigation Timing">

Each label in the above diagram corresponds to a high resolution timestamp that the browser tracks for every page it loads. In this case, we're only showing a fraction of the different timestamps&mdash;for now we're skipping all network related timestamps.

So, what do these timestamps mean?

* `domLoading`: marks the start of the process; the
  browser is about to start parsing the first received bytes of the HTML
  document.
* `domInteractive`: marks the point at which the browser finishes parsing all
  the HTML and DOM construction is complete.
* `domContentLoaded`: marks the point when the DOM is ready and no stylesheets are blocking JavaScript execution---meaning we can now (potentially) construct the render tree.
    * Many JavaScript frameworks wait for this event before they start executing their own logic. For this reason the browser captures the `EventStart` and `EventEnd` timestamps to allow us to track how long this execution took.
* `domComplete`: marks the point at which all of the processing is complete and
  all of the resources on the page (images, and so on) have finished downloading; that is, the loading spinner has stopped spinning.
* `loadEvent`: marks the final step in every page load when the browser fires an
  `onload` event that can trigger additional application logic.

The HTML specification dictates specific conditions for each event: when it should be fired, which conditions should be met, and so on. For our purposes, we'll focus on a few key milestones related to the critical rendering path:

* `domInteractive` marks when DOM is ready.
* `domContentLoaded` typically marks when [both the DOM and CSSOM are ready](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * If there is no parser blocking JavaScript, then `DOMContentLoaded` fires immediately after `domInteractive`.
* `domComplete` marks the point at which the page and all of its subresources are ready.

<!-- Span required to prevent rest of page from being indented.
  https://github.com/google/WebFundamentals/issues/1873 -->
<span></span>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full" lang=html %}
</pre>

The above example may seem a little daunting on first sight, but in reality it is actually pretty simple. The Navigation Timing API captures all the relevant timestamps and our code simply waits for the `onload` event to fire &mdash; recall that `onload` event fires after `domInteractive`, `domContentLoaded` and `domComplete`&mdash;and computes the difference between the various timestamps.

<img src="images/device-navtiming-small.png"  alt="NavTiming demo">

When all is said and done, we have milestones to track and a simple function to output these measurements. Note that instead of printing these metrics on the page you can modify the code to send these metrics to an analytics server ([Google Analytics does this automatically](https://support.google.com/analytics/answer/1205784?hl=en)), which is a great way to keep tabs on the performance of your pages and identify candidate pages that can benefit from some optimization work.

