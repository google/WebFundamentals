---
rss: false
layout: article
title: "Steps to Evaluate RAIL"
seotitle: "Steps to Evaluate RAIL"
description: "Measuring frames per second is only a small part of testing your application's performance. Testing against user metrics is critical for success."
introduction: "Measuring frames per second is only a small part of testing your application's performance. Testing against user metrics is critical for success."
article:
  written_on: 2015-06-08
  updated_on: 2015-06-08
  order: 2
authors:
  - megginkearney
related-guides:
  style:
    -
      title: Reduce the scope and complexity of style calculations
      href: fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations
      section:
        title: "Reduce the scope and complexity of style calculations"
        href: fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations
  thrashing:
    -
      title: Diagnose Forced Synchronous Layouts
      href: tools/profile-performance/rendering-tools/forced-synchronous-layouts
      section:
        title: "Diagnose Forced Synchronous Layouts"
        href: tools/profile-performance/rendering-tools/forced-synchronous-layouts
priority: 0
collection: evaluate-performance
key-takeaways:
  rail-metrics:
    - Empathize with your users. Touch buttons, scroll pages, watch animations, go idle, re-engage, and load every page.
    - If page loads take more than one second, you are in danger of losing users. Optimize your critical rendering path to ensure fast first page loads.
    - Experiencing jank? Identify and fix the common problems affecting the pixel pipeline.
remember:
  animation:
    - TBD.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.rail-metrics %}

## Test key performance metrics 

The following table is affectively a user test plan for checking that your site meets key performance metrics. Use the Chrome DevTools [Timeline tool](#timeline-tool) to record user actions. Then check the recording times in the Timeline against the key metrics:

<table class="table-3">
  <thead>
      <th>RAIL Step</th>
      <th>Key Metric</th>
      <th>User Actions</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>Response</strong></td>
      <td data-th="Key Metric">Input latency (from tap to paint) < 100ms.</td>
      <td data-th="User Test">User taps on an icon or button (for example, opening the nav menu, tapping Compose).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Response</strong></td>
      <td data-th="Key Metric">Input latency (from tap to paint) < 16ms.</td>
      <td data-th="User Test">User drags their finger and app's response is bound to the finger position (for example, pull to refresh, swiping a carousel).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animation</strong></td>
      <td data-th="Key Metric">Input latency (from tap to paint) < 100ms for initial response.</td>
      <td data-th="User Test">User initiates page scroll or animation initiates.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animation</strong></td>
      <td data-th="Key Metric">Each frame's work (JS to paint) completes < 16ms.</td>
      <td data-th="User Test">User scrolls the page or sees an animation.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Idle</strong></td>
      <td data-th="Key Metric">Main thread JS work chunked no larger than 50ms.</td>
      <td data-th="User Test">User isn't interacting with the page, but main thread should be available enough to handle the next user input.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Load</strong></td>
      <td data-th="Key Metric">Page considered ready to use in 1000ms.</td>
      <td data-th="User Test">User loads the page and sees the critical path content.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Load</strong></td>
      <td data-th="Key Metric">Satisfy the Response goals during the full page load process.</td>
      <td data-th="User Test">User loads the page and starts interacting (for example, scroll or open navigation).</td>
    </tr>
  </tbody>
</table> 

## Fix slow page loads

If your users wait longer than 1 second for a page load,
there's a good chance they won't be coming back.
Successful page loads aren't about getting everyone on a page to load under 1 second.
You need to prioritize and display content that relates
to the primary action users want to take on that page.

Follow these steps to optimize the critical rendering path to deliver fast first page loads (see [Optimizing the Critical Rendering Path](/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path)):

1. Analyze your critical path: number of resources, bytes, length. Use the Chrome DevTools Network panel to [measure resource loading times](/web/tools/profile-performance/network-performance/resource-loading).
2. Minimize number of critical resources (eliminate, defer, mark as async).
3. Optimize the order in which critical resources are downloaded.
4. Reduce the number of roundtrips to get critical bytes.

Use the [PageSpeed Insights tool](https://developers.google.com/speed/pagespeed/insights/)
to test page loads and find out what's getting in the way of the critical rendering path.
You and also find out more in [PageSpeed Rules and Recommendations](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations).

## Check for jank in the pixel pipeline

Each part of the pixel pipeline represents an opportunity to introduce jank.
For each stage in the pipeline,
learn more about the common problems
that slow down one or more aspects of the RAIl performance model,
tools to identify these problems, and possible solutions.

### Find and fix JavaScript bottlenecks

Use the [Chrome DevTools JavaScript profiler](web/tools/profile-performance/rendering-tools/js-execution) to measure the impact JavaScript has on performance by function.

If JavaScript is affecting performance,
chances are it's one of these problems:

<table class="table-3">
  <thead>
      <th>Problem</th>
      <th>Example</th>
      <th>Solution</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Expensive input handlers affecting response or animation.</td>
      <td data-th="Example">Touch, parallax scrolling affecting</td>
      <td data-th="Solution">Let the browser handle touch and scrolls, or else bind the listener as late as possible (see <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Expensive Input Handlers in Paul Lewis' runtime performance checklist</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">Badly-timed JavaScript affecting response, animation, load.</td>
      <td data-th="Example">User scrolls right after page load, setTimeout / setInterval.</td>
      <td data-th="Solution"><a href="web/fundamentals/performance/rendering/optimize-javascript-execution">Optimize JavaScript execution</a>: use requestAnimationFrame, spread DOM manipulation over frames, use Web Workers.</td>
    </tr>
    <tr>
      <td data-th="Problem">Long-running JavaScript affecting response.</td>
      <td data-th="Example">The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded event</a> stalls as it's swamped with JS work affecting.</td>
      <td data-th="Solution">Move pure computational work to <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Workers</a>. If you need DOM access, use requestAnimationFrame (see also <a href="web/fundamentals/performance/rendering/optimize-javascript-execution">Optimize JavaScript Execution</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">Garbagey scripts affecting response or animation.</td>
      <td data-th="Example">Garbage collection can happen anywhere.</td>
      <td data-th="Solution">Write less garbagey scripts (see <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Garbage Collection in Animation in Paul Lewis' runtime performance checklist</a>).</td>
    </tr>
  </tbody>
</table>

### Find and fix style & layout bottlenecks

Style changes are costly, especially if those changes affect more than one element in the DOM. Any time you apply styles to an element, the browser has to figure out the impact on all related elements, recalculate the layout, and repaint. 

Find out which CSS properties cost more in terms of rendering performance than others using CSS Triggers](http://csstriggers.com/). This tool lets you filter by CSS property, shows whether or not each CSS property affects layout, paint, and or composite, and provides a detailed description of that properties impact on renderng performance:

![csstriggers.com](imgs/csstriggers.png)

{% include modules/related_guides.liquid inline=true list=page.related-guides.style %}

The following table describes common style and layout problems:

<table class="table-3">
  <thead>
      <th>Problem</th>
      <th>Example</th>
      <th>Solution</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Expensive style calculations affecting response or animation.</td>
      <td data-th="Example">Any CSS property that changes an element's geometry, like it's width, height, or position; the browser has to check all other elements and redo the layout.</td>
      <td data-th="Solution"><a href="fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Avoid CSS that triggers layouts</a></td>
    </tr>
    <tr>
      <td data-th="Problem">Layout thrashing affecting response or animation.</td>
      <td data-th="Example">A loop that puts the browser into a read-write-read-write cycle, forcing the browser to recalculate layout over and over again.</td>
      <td data-th="Solution">Batch read-write operations using <a href="https://github.com/wilsonpage/fastdom">FastDom library</a></td>
    </tr>
  </tbody>
</table>

Layout thrashing is easy to spot using a Timeline recording. Look for pattern-like multiple forced synchronous warnings:

![Layout thrashing](imgs/layout-thrashing.png)

{% include modules/related_guides.liquid inline=true list=page.related-guides.thrashing %}

### Find and fix paint & composite bottlenecks

Want to know how long painting takes or how often painting occurs? Enable the Paint profile in the Chrome DevTools Timeline. Record interaction with your page, and check to see if most of the rendering time is spent painting. If it is, you've got paint problems.

![Long paint times in timeline recording](imgs/long-paint.png)

Diagnose the paint problems further by enabling <strong>Show paint rectangles</strong> and <strong>Enable continuous page repainting</strong> in the Timeline Rendering settings:

![Chrome DevTools rendering settings](imgs/rendering-settings.png)

When you enable continuous paint mode, the page continuously repaints, showing a counter of how much painting work is happening. You can hide elements and mutate styles, watching the counter, in order to figure out what is slow.

The following table describes common paint and composite problems:

<table class="table-3">
  <thead>
      <th>Problem</th>
      <th>Example</th>
      <th>Solution</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Paint storms affecting response or animation.</td>
      <td data-th="Example">Big paint areas or expensive paints affecting response or animation</td>
      <td data-th="Solution">Avoid paint, promote elements that are moving, use transforms and opacity (see <a href="fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">Simplify paint complexity and reduce paint areas</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">Layer explosions affecting animations.</td>
      <td data-th="Example">Overpromotion of too many elements with translateZ(0) greatly affects animation performance.
</td>
      <td data-th="Solution">Promote to layers sparingly, and only when you know it offers tangible improvements (see <a href="fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">Stick to composite-only properties and manage layer count</a>).</td>
    </tr>
  </tbody>
</table>

{% endwrap %}
