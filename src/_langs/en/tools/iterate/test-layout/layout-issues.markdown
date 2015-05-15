---
rss: false
layout: article
title: "Track Down Layout Issues"
description: "Make your site look great and load fast. Understand the common problems that occur when the browser renders elements on a page. Use tools to help you identify and fix these layout problems."
introduction: "Make your site look great and load fast. Understand the common problems that occur when the browser renders elements on a page. Use tools to help you identify and fix these layout problems."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-14
  order: 3
authors:
  - mkearney
related-guides:
  style:
    -
      title: Reduce the scope and complexity of style calculations
      href: fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations
      section:
        title: "Reduce the scope and complexity of style calculations"
        href: fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations
priority: 0
collection: test-layout
key-takeaways:
  layout-issues:
    - Don't over-complicate your CSS. Use less CSS and keep your CSS selectors simple.
    - Avoid layout as much as possible. Choose CSS that doesn't trigger layout at all.
    - Don't write JavaScript that forces your browser to recalculate layout. Separate read and write functions, and read first.
    - The Chrome DevTools Timeline shows you when you've forced the browser to recalculate layout. See lots of warnings? Layout thrashing forces the browser to recalculate layout over and over again.
    - Painting can take up more time than any other rendering activity. Watch out for paint bottlenecks.

remember:
  css-triggers:
    - Learn how Paul Lewis built [CSS Triggers](https://aerotwist.com/blog/css-triggers/).
---
{% wrap content %}

Layout (or reflow in Firefox) is the process by which the browser calculates the positions and sizes of all the elements on a page. The web’s layout model means that one element can affect others, for example, the width of the `<body>`element typically affects its children’s widths and so on all the way up and down the tree. The process can be quite involved for the browser.

Learn about four key layout problems: a brief introduction on what causes them, the tools available to track them down, some quick fixes, and links off to more detailed tutorials on how to fix them. Know about these problems already and want to dive deeper into fixes, see [Improve Rendering Performance](tools/profile-performance/rendering-tools/index).

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.layout-issues %}

## Problem 1: Complicated CSS

Style changes are costly, especially if those changes affect more than one element in the DOM. Any time you apply styles to an element, the browser has to figure out the impact on all related elements, recalculate the layout, and repaint.

{% include modules/related_guides.liquid inline=true list=page.related-guides.style %}

### Tool

Know which CSS properties cost more in terms of rendering performance than others. [CSS Triggers](http://csstriggers.com/) lets you filter by CSS property, shows whether or not each CSS property affects layout, paint, and or composite, and provides a detailed description of that properties impact on renderng performance:

![csstriggers.com](imgs/csstriggers.png)

{% include modules/remember.liquid title="Note" list=page.remember.css-triggers %}

### Fixes

<table class="table-3">
  <thead>
      <th>Fix</th>
      <th>Description</th>
      <th>Learn More</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Fix">Use less CSS</td>
	  <td data-th="Description">Less CSS, means less work for the browser to calculate layout.</td>
	  <td data-th="Learn More">[Reduce the scope and complexity of style calculations](fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)</td>
    </tr>
    <tr>
      <td data-th="Fix">Keep CSS Selectors simple</td>
	  <td data-th="Description">Reference an element in your CSS with a simple class. Create new classes instead of building complex CSS selector families.</td>
	  <td data-th="Learn More">[Reduce the scope and complexity of style calculations](fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)</td>
    </tr>
    <tr>
      <td data-th="Fix">Avoid CSS that triggers layout</td>
	  <td data-th="Description">If you change an element's geometry, like it's width, height, or position, the browser has to check all other elements and redo the layout.</td>
	  <td data-th="Learn More">[Avoid large, complex layouts and layout thrashing](fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)</td>
    </tr>
  </tbody>
</table>

## Problem 2: Forced synchronous layouts

Normally, Chrome performs layouts "lazily" in response to CSS or DOM updates from your application. This allows Chrome to batch style and layout changes rather than reacting to each on demand. However, your JavaScript can force Chrome to perform a layout immediately and synchronously by querying the value of certain layout-dependent element properties such as `element.offsetWidth`.

General rule of thumb-- if you ask a geometric value back from the DOM before a frame is complete, you are going to find yourself with forced synchronous layouts. These so called "forced synchronous layouts" can be a big performance bottleneck if repeated frequently or performed for large DOM tree. 

Both Wilson Page and Paul Lewis recommend separating reading styles from changing styles, and reading styles first. They also recommend using `requestAnimationFrame` to ensure that your JavaScript runs at the start of a frame. When visual changes are happening on screen you want to do your work at the right time for the browser, which is right at the start of the frame.

See also 

[Optimize JavaScript Execution])(fundamentals/performance/rendering/optimize-javascript-execution)

Wilson Page's blog post on  provides quick fixes to forced synchronous layouts, including batching the DOM reads and DOM writes together so that the layout is calculated just once. This post also

### Tool

The Chrome DevTools Timeline identifies when your application causes a forced asynchronous layout and marks such records with yellow warning icon: ![Forced synchronous layout warning](imgs/image25.png)). 

![Timeline with forced synchronous layout warning](imgs/forced_layout.png)

Learning to use the Timeline tool effectively requires some practice. For detailed information on how to use the Timeline tool, see [Analyze Rendering Performance](tools/profile-performance/evaluate-performance/analyze-rendering).

### Fixes

<table class="table-3">
  <thead>
      <th>Fix</th>
      <th>Description</th>
      <th>Learn More</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Fix">Read styles first.</td>
	  <td data-th="Description">Batch DOM reads and DOM writers together and read the DOM first so taht layout is calculated just once.</td>
	  <td data-th="Learn More">[Layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/);</br>
	  [Avoid large, complex layouts and layout thrashing](fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing))</td>
    </tr>
    <tr>
      <td data-th="Fix">Use <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">requestAnimationFrame()</a>.</td>
	  <td data-th="Description">This method requests that the browser call a specified function to update an animation before the next repaint. Use this method to guarantee that your JavaScript works at the start of the frame. Wilson Page recommends using this method to improve performance of existing code, without having to totally refacotr it. Schedule a write function to be executed in the next frame; DOM reads can happen in the current frame.</td>
	  <td data-th="Learn More">Wilson Page's blog posthttps://github.com/udacity/news-aggregator/blob/master/scripts/app.js, [Layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/);</br>
	  [Optimize JavaScript Execution](fundamentals/performance/rendering/optimize-javascript-execution))</td>
    </tr>
  </tbody>
</table>

## Problem 3: Layout thrashing

Layout thrashing is a forced-synchronous layout broken-record. JavaScript writes and then Reads from the DOM, multiple-times repeating, forcing the browser to re-calculate layout over and over again. The most common cause of layout thrashing: a loop that puts the browser into a read-write-read-write cycle:

<pre>
function resizeAllParagraphsToMatchBlockWidth() {

  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
</pre>

### Tool

Layout thrashing is easy to spot using a Timeline recording. Multiple forced synchronous warnings that are pattern-like is a strong signal:

![Layout thrashing](layout-thrashing/tbd.png)

### Fixes

The same fixes for individual forced synchronous layous apply to layout thrashing, but you can save yourself a lot of time using this fix:

<table class="table-3">
  <thead>
      <th>Fix</th>
      <th>Description</th>
      <th>Learn More</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Fix"><a href="https://github.com/wilsonpage/fastdom">FastDom library</a></td>
	  <td data-th="Description">Eliminates layout thrashing by batching read/write operations.</td>
	  <td data-th="Learn More">Introduction to FastDom in [Layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/);</br> <a href="https://github.com/wilsonpage/fastdom">FastDom library</a></td>
    </tr>
  </tbody>
</table>

## Problem 4: Long paint times

Paint is the process of filling in pixels and is often the most costly part of the rendering process. Trigger layout, and you trigger paint, since the browser will need to create pixels for the new geometry.

If you've noticed that your page is janky in anyway, for example, scrolling isn't smooth, then more likely than not, you've got pain problems.

The first step to fixing paint problems is identifying them. Paul Irish's post [Profiling Long Paint Times with DevTools Continuous Painting Mode](http://updates.html5rocks.com/2013/02/Profiling-Long-Paint-Times-with-DevTools-Continuous-Painting-Mode), explains how to use Chrome DevTools to track paint issues.

Once you've identified the problems, you can start to fix them. Paul Lewis' article,[Simplify paint complexity and reduce paint areas](fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas), describes in detail what you can do to avoid too much paint. 

The main gist of both of these articles are summarized here.

### Tool

Want to know how long painting takes or how often painting occurs? Enable the Paint profile in the Chrome DevTools Timeline. Record interaction with your page, and check to see if most of the rendering time is spent painting. If it is, you've got paint problems.

![Long paint times in timeline recording](imgs/long-paint.png)

Diagnose the paint problems further by enabling <strong>Show paint rectangles</strong> and <strong>Enable continuous page repainting</strong> in the Timeline Rendering settings:

![Chrome DevTools rendering settings](rendering-settings-files/rendering-settings.png)</div>

Seeing the regions where Chrome paints helps diagnose and ultimately [avoid unnecessary paints](http://www.html5rocks.com/en/tutorials/speed/unnecessary-paints/) on a page. You can also use this to [study painting behaviors](http://www.paulirish.com/2011/viewing-chromes-paint-cycle/) just by hovering over links, popups, or some content which dynamically updates.

When you enable continuous paint mode, the page continuously repaints, showing a counter of how much painting work is happening. You can hide elements and mutate styles, watching the counter, in order to figure out what is slow.

### Fixes

<table class="table-3">
  <thead>
      <th>Fix</th>
      <th>Description</th>
      <th>Learn More</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Fix">Promote elements that move or fade</td>
	  <td data-th="Description">Use `will-change: transform` CSS property to create a new composite layer for elements that are regularly repainted.</td>
	  <td data-th="Learn More">[Simplify paint complexity and reduce paint areas](fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas)</td>
    </tr>
    <tr>
      <td data-th="Fix">Avoid paint during animations in particular</td>
	  <td data-th="Description">The 10ms you have per frame in an animation is normally not long enough to get paint work done.</td>
	  <td data-th="Learn More">[Simplify paint complexity and reduce paint areas](fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas)</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
