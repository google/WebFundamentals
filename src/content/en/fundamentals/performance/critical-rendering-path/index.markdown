---
layout: shared/plain
title: "Critical Rendering Path"
description: "TODO"
written_on: 2014-04-01
updated_on: 2014-04-28
order: 1
translation_priority: 0
authors:
  - ilyagrigorik

udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
related-guides:
  crp:
    -
      title: "Constructing the Object Model"
      href: fundamentals/performance/critical-rendering-path/constructing-the-object-model
      section:
        title: "Understanding the critical rendering path"
        href: fundamentals/performance/critical-rendering-path/
    -
      title: "Render-tree Construction, Layout, and Paint"
      href: fundamentals/performance/critical-rendering-path/render-tree-construction
      section:
        title: "Understanding the critical rendering path"
        href: fundamentals/performance/critical-rendering-path/
    -
      title: "Render Blocking CSS"
      href: fundamentals/performance/critical-rendering-path/render-blocking-css
      section:
        title: "Understanding the critical rendering path"
        href: fundamentals/performance/critical-rendering-path/
    -
      title: "Adding Interactivity with JavaScript"
      href: fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
      section:
        title: "Understanding the critical rendering path"
        href: fundamentals/performance/critical-rendering-path/
    -
      title: "Measuring the Critical Rendering Path with Navigation Timing"
      href: fundamentals/performance/critical-rendering-path/measure-crp
      section:
        title: "Understanding the critical rendering path"
        href: fundamentals/performance/critical-rendering-path/
    -
      title: "Analyzing Critical Rendering Path Performance"
      href: fundamentals/performance/critical-rendering-path/analyzing-crp
      section:
        title: "Understanding the critical rendering path"
        href: fundamentals/performance/critical-rendering-path/
    -
      title: "Optimizing the Critical Rendering Path"
      href: fundamentals/performance/critical-rendering-path/optimize-crp
      section:
        title: "Understanding the critical rendering path"
        href: fundamentals/performance/critical-rendering-path/
    -
      title: "PageSpeed Rules and Recommendations"
      href: fundamentals/performance/critical-rendering-path/page-speed-rules-and-recomendations
      section:
        title: "Understanding the critical rendering path"
        href: fundamentals/performance/critical-rendering-path/
---

<p class="intro">
  Optimizing the critical rendering path is critical for improving performance 
  of our pages: our goal is to prioritize and display the content that relates
  to the primary action the user wants to take on a page.
</p>

Delivering a fast web experience requires a lot of work by the browser. Most of
this work is hidden from us as web developers: we write the markup, and a nice
looking page comes out on the screen. But how exactly does the browser go from
consuming our HTML, CSS, and JavaScript to rendered pixels on the screen?

Optimizing for performance is all about understanding what happens in these
intermediate steps between receiving the HTML, CSS, and JavaScript bytes and
the required processing to turn them into rendered pixels - that's
the **critical rendering path**.

<img src="images/progressive-rendering.png" class="center" alt="progressive page rendering">

By optimizing the critical rendering path we can significantly improve the
time to first render of our pages. Further, understanding the critical
rendering path will also serve as a foundation for building well performing
interactive applications. It turns out, the process for processing interactive
updates is the same, just done in a continuous loop and ideally at 60 frames
per second! However, let's not get ahead of ourselves just yet. First, let's
take a quick, ground-up overview of how the browser goes about displaying a
simple page.

{% include shared/related_guides.liquid list=page.related-guides.crp %}
