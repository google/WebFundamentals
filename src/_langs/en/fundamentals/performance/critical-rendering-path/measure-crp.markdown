---
layout: article
title: "Measuring the Critical Rendering Path with Navigation Timing"
description: "You can't optimize what you can't measure. Thankfully, the Navigation Timing API gives us all the necessary tools to measure each step of the critical rendering path!"
introduction: "You can't optimize what you can't measure. Thankfully, the Navigation Timing API gives us all the necessary tools to measure each step of the critical rendering path!"
article:
  written_on: 2014-04-01
  updated_on: 2014-09-18
  featured: true
  order: 5
collection: critical-rendering-path
priority: 0
authors:
  - ilyagrigorik
key-takeaways:
  measure-crp:
    - Navigation Timing provides high resolution timestamps for measuring CRP.
    - Browser emits series of consumable events which capture various stages of the CRP.
---
{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/takeaway.liquid list=page.key-takeaways.measure-crp %}

The foundation of every solid performance strategy is good measurement and instrumentation. Turns out, that is exactly what the Navigation Timing API provides.

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

Each of the labels in the above diagram corresponds to a high resolution timestamp that the browser tracks for each and every page it loads. In fact, in this specific case we're only showing a fraction of all the different timestamps &mdash; for now we're skipping all network related timestamps, but we'll come back to them in a future lesson.

So, what do these timestamps mean?

* **domLoading:** this is the starting timestamp of the entire process, the
  browser is about to start parsing the first received bytes of the HTML
  document.
* **domInteractive:** marks the point when the browser has finished parsing all
  of the HTML and DOM construction is complete.
* **domContentLoaded:** marks the point when both the DOM is ready and there are no stylesheets that are blocking JavaScript execution - meaning we can now (potentially) construct the render tree.
    * Many JavaScript frameworks wait for this event before they start executing their own logic. For this reason the browser captures the _EventStart_ and _EventEnd_ timestamps to allow us to track how long this execution took.
* **domComplete:** as the name implies, all of the processing is complete and
  all of the resources on the page (images, etc.) have finished downloading -
  i.e. the loading spinner has stopped spinning.
* **loadEvent:** as a final step in every page load the browser fires an
  "onload" event which can trigger additional application logic.

The HTML specification dictates specific conditions for each and every event: when it should be fired, which conditions should be met, and so on. For our purposes, we'll focus on a few key milestones related to the critical rendering path:

* **domInteractive** marks when DOM is ready.
* **domContentLoaded** typically marks when [both the DOM and CSSOM are ready](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * If there is no parser blocking JavaScript then _documentContentLoaded_ will fire immediately after _domInteractive_.
* **domComplete** marks when the page and all of its subresources are ready.

^

{% include_code _code/measure_crp.html full html %}

The above example may seem a little daunting on first sight, but in reality it is actually pretty simple. The Navigation Timing API captures all the relevant timestamps and our code simply waits for the "onload" event to fire &mdash; recall that onload event fires after domInteractive, domContentLoaded and domComplete &mdash; and computes the difference between the various timestamps.
<img src="images/device-navtiming-small.png" class="center" alt="NavTiming demo">

All said and done, we now have some specific milestones to track and a simple function to output these measurements. Note that instead of printing these metrics on the page you can also modify the code to send these metrics to an analytics server ([Google Analytics does this automatically](https://support.google.com/analytics/answer/1205784?hl=en)), which is a great way to keep tabs on performance of your pages and identify candidate pages that can benefit from some optimization work.

{% include modules/nextarticle.liquid %}

{% endwrap%}
