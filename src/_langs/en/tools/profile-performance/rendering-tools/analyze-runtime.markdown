---
rss: false
layout: tools-article
title: "Analyze Runtime Performance"
seotitle: "Analyze Runtime Performance Using Chrome DevTools Frames Mode"
description: "Users expect pages to be interactive and smooth. Each stage in the pixel pipeline represents an opportunity to introduce 'jank'. Learn about the tools and strategies to identify and fix common problems that slow down runtime performance."
introduction: "Users expect pages to be interactive and smooth. Each stage in the pixel pipeline represents an opportunity to introduce 'jank'. Learn about the tools and strategies to identify and fix common problems that slow down runtime performance."
article:
  written_on: 2015-04-14
  updated_on: 2015-06-15
  order: 1
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
  layout:
    -  
      title: Avoid large, complex layouts and layout thrashing
      href: fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing
      section:
        title: "Avoid large, complex layouts and layout thrashing"
        href: fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing
  javascript:
    -  
      title: Optimize JavaScript Execution
      href: fundamentals/performance/rendering/optimize-javascript-execution?hl=en
      section:
        title: "Optimize JavaScript Execution"
        href: fundamentals/performance/rendering/optimize-javascript-execution
priority: 0
collection: rendering-tools
key-takeaways:
  layout-issues:
    - Don't write JavaScript that forces the browser to recalculate layout. Separate read and write functions, and perform reads first.
    - Don't over-complicate your CSS. Use less CSS and keep your CSS selectors simple.
    - Avoid layout as much as possible. Choose CSS that doesn't trigger layout at all.
    - Painting can take up more time than any other rendering activity. Watch out for paint bottlenecks.

remember:
  css-triggers:
    - Learn how Paul Lewis built [CSS Triggers](https://aerotwist.com/blog/css-triggers/).
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.layout-issues %}

## How to identify JavaScript bottlenecks

JavaScript calculations, especially ones
that trigger extensive visual changes,
can stall application performance.
Don't let badly-timed or long-running JavaScript interfere
with users interacting with your site.

### Tools

The simplest way to test JavaScript performance is to view Scripting events
in the [Chrome DevTools Timeline](/web/tools/profile-performance/evaluate-performance/timeline-tool).
If any of the scripting events seem suspiciously long,
enable the JS Stacks at the top of the Timeline tool:

![JavaScript Profiler](imgs/js-stack.png)

Now you can find out more about the specific functions called in your application.
Don't enable the JS Stacks by default, as you'll experience information overload;
only enable the tool when identifying JavaScript bottlenecks.

If you're noticing quite a bit of jank in your JavaScript,
you may need to take the next step beyond a timeline recording,
and collect a JavaScript CPU profile.
CPU profiles show where execution time is spent in your page's functions.
Learn how to create CPU profiles
in [Speed Up JavaScript Execution](/web/tools/profile-performance/rendering-tools/js-execution).

### Problems

The following table describes some common JavaScript problems and potential solutions:

<table class="table-3">
  <thead>
      <th>Problem</th>
      <th>Example</th>
      <th>Solution</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Expensive input handlers affecting response or animation.</td>
      <td data-th="Example">Touch, parallax scrolling.</td>
      <td data-th="Solution">Let the browser handle touch and scrolls, or bind the listener as late as possible (see <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Expensive Input Handlers in Paul Lewis' runtime performance checklist</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">Badly-timed JavaScript affecting response, animation, load.</td>
      <td data-th="Example">User scrolls right after page load, setTimeout / setInterval.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Optimize JavaScript execution</a>: use <code>requestAnimationFrame</code>, spread DOM manipulation over frames, use Web Workers.</td>
    </tr>
    <tr>
      <td data-th="Problem">Long-running JavaScript affecting response.</td>
      <td data-th="Example">The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded event</a> stalls as it's swamped with JS work.</td>
      <td data-th="Solution">Move pure computational work to <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Workers</a>. If you need DOM access, use <code>requestAnimationFrame</code> (see also <a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Optimize JavaScript Execution</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">Garbage-y scripts affecting response or animation.</td>
      <td data-th="Example">Garbage collection can happen anywhere.</td>
      <td data-th="Solution">Write less garbage-y scripts (see <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Garbage Collection in Animation in Paul Lewis' runtime performance checklist</a>).</td>
    </tr>
  </tbody>
</table>

## How to identify style bottlenecks

Style changes are costly, especially if those changes affect more than one element in the DOM. Any time you apply styles to an element, the browser has to figure out the impact on all related elements, recalculate the layout, and repaint.

{% include modules/related_guides.liquid inline=true list=page.related-guides.style %}

### Tools

Make a recording using the [Chrome DevTools Timeline](/web/tools/profile-performance/evaluate-performance/timeline-tool). Recalculate Style events are displayed in purple blocks; check the timeline for large Recalculate Style events:

![Long running styles](imgs/long-running-style.jpg)

Less time and less impact means improved performance.
View more details for these events. If the style changes are taking a long time,
that's a performance hit. Also, if the style calculations are impacting a large number of elements,
that's also a sign there's room for improvement:

![Style details](imgs/style-details.jpg)

Another easy way to reduce style changes is to avoid CSS properties
that have the most impact on rendering performance.
Use the [CSS Triggers tool](http://csstriggers.com/)
to determine whether a CSS property triggers layout, paint, and/or composite:

![csstriggers.com](imgs/csstriggers.png)

If you're using CSS properties that trigger everything, consider switching to a CSS property with less impact (see also
[Stick to compositor-only properties and manage layer count](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)).

### Problems

The following table describes some common style problems and potential solutions:

<table class="table-3">
  <thead>
      <th>Problem</th>
      <th>Example</th>
      <th>Solution</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Expensive style calculations affecting response or animation.</td>
      <td data-th="Example">Any CSS property that changes an element's geometry, like its width, height, or position; the browser has to check all other elements and redo the layout.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Avoid CSS that triggers layouts.</a></td>
    </tr>
    <tr>
      <td data-th="Problem">Complex selectors affecting response or animation.</td>
      <td data-th="Example">Nested selectors force the browser to know everything about all the other elements, including parents and children.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">Reference an element in your CSS with just a class.</a></td>
    </tr>
  </tbody>
</table>

{% include modules/related_guides.liquid inline=true list=page.related-guides.style %}

## How to identify layout bottlenecks

Layout (or reflow in Firefox) is the process by which the browser calculates the positions and sizes of all the elements on a page. The web’s layout model means that one element can affect others; for example,
the width of the `<body>` element typically affects its children’s widths, and so on,
all the way up and down the tree. The process can be quite involved for the browser.

A general rule of thumb-- if you ask for a geometric value back from the DOM before a frame is complete, you are going to find yourself with "forced synchronous layouts", which can be a big performance bottleneck if repeated frequently or performed for a large DOM tree. 

### Tools

The Chrome DevTools Timeline identifies when your application causes a forced asynchronous layout and marks such records with yellow warning icon: ![Forced synchronous layout warning](imgs/forced-synchronous.png){:.inline}. 

"Layout thrashing" is a repetition of forced synchronous layout conditions. JavaScript writes and then reads from the DOM  multiple times, forcing the browser to re-calculate layout over and over again.

Layout thrashing is easy to spot using a Timeline recording.
Learn more in [Diagnose Forced Synchronous Layouts](/web/tools/profile-performance/rendering-tools/forced-synchronous-layouts).
Look for a pattern of multiple forced synchronous warnings:

![Layout thrashing](imgs/layout-thrashing.png)

### Problems

The following table describes some common layout problems and potential solutions:

<table class="table-3">
  <thead>
      <th>Problem</th>
      <th>Example</th>
      <th>Solution</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Forced synchronous layout affecting response or animation.</td>
      <td data-th="Example">Forcing the browser to perform layout earlier in the pixel pipeline, resulting in repeating steps in the rendering process.</td>
      <td data-th="Solution">Batch your style reads first, then do any writes (see also <a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Avoid large, complex layouts and layout thrashing</a>).</td>
    </tr>
  </tbody>
    <tr>
      <td data-th="Problem">Layout thrashing affecting response or animation.</td>
      <td data-th="Example">A loop that puts the browser into a read-write-read-write cycle, forcing the browser to recalculate layout over and over again.</td>
      <td data-th="Solution">Automatically batch read-write operations using <a href="https://github.com/wilsonpage/fastdom">FastDom library</a>.</td>
    </tr>
  </tbody>
</table>

## How to identify paint and composite bottlenecks

Paint is the process of filling in pixels and is often the most costly part of the rendering process.
If you've noticed that your page is janky in any way -- for example, scrolling isn't smooth -- then it's likely that you have paint problems.

Compositing is where the painted parts of the page are put together for displaying on screen.
For the most part, if you stick to compositor-only properties and avoid paint altogether,
you should see a major improvement in performance,
but you need to watch out for excessive layer counts (see also [Stick to compositor-only properties and manage layer count](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)).

### Tools

Want to know how long painting takes or how often painting occurs? Enable the Paint profile in the Chrome DevTools Timeline. Record interaction with your page, and then check to see if most of the rendering time is spent painting. If it is, you have paint problems.

![Long paint times in timeline recording](imgs/long-paint.png)

Diagnose the paint problems further by enabling <strong>Show paint rectangles</strong> and <strong>Enable continuous page repainting</strong> in the Timeline Rendering settings:

![Chrome DevTools rendering settings](imgs/rendering-settings.png)

When you enable continuous paint mode, the page continuously repaints, showing a counter of how much painting work is happening. You can hide elements and mutate styles, watching the counter, in order to figure out what is slowing things down.

Paul Irish's post,
[Profiling Long Paint Times with DevTools Continuous Painting Mode](http://updates.html5rocks.com/2013/02/Profiling-Long-Paint-Times-with-DevTools-Continuous-Painting-Mode),
explains how to use Chrome DevTools to track paint issues.

### Problems

The following table describes some common paint and composite problems and potential solutions:

<table class="table-3">
  <thead>
      <th>Problem</th>
      <th>Example</th>
      <th>Solution</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Paint storms affecting response or animation.</td>
      <td data-th="Example">Big paint areas or expensive paints affecting response or animation.</td>
      <td data-th="Solution">Avoid paint, promote elements that are moving to their own layer, use transforms and opacity (see <a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">Simplify paint complexity and reduce paint areas</a>).</td>
    </tr>
        <tr>
      <td data-th="Problem">Layer explosions affecting animations.</td>
      <td data-th="Example">Overpromotion of too many elements with translateZ(0) greatly affects animation performance.
</td>
      <td data-th="Solution">Promote to layers sparingly, and only when you know it offers tangible improvements (see <a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">Stick to composite-only properties and manage layer count</a>).</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
