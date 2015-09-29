---
layout: shared/narrow-pages-list
title: "Rendering performance"
description: "Users notice if sites and apps don't run well, so optimizing rendering performance is crucial!"
published_on: 2015-03-20
updated_on: 2015-03-20
order: 1
translation_priority: 0
authors:
  - paullewis
notes:
  csstriggers:
    If you want to know which of the three versions above changing any given CSS property will trigger head to <a href="http://csstriggers.com">CSS Triggers</a>. And if you want the fast track to high performance animations, read the section on <a href="stick-to-compositor-only-properties-and-manage-layer-count">changing compositor-only properties</a>.
  rasterize:
    "Sometimes you may hear the term \"rasterize\" used in conjunction with paint. This is because painting is actually two tasks: 1) creating a list of draw calls, and 2) filling in the pixels.

    The latter is called \"rasterization\" and so whenever you see paint records in DevTools, you should think of it as including rasterization. (In some architectures creating the list of draw calls and rasterizing are done in different threads, but that isn't something under developer control.)"
udacity:
  id: ud860
  title: Browser Rendering Optimization
  description: "Interested in taking a deep dive into Rendering Performance? Check out the companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the rendering of your pages."
  image: images/rp-udacity.jpg
---

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p class="intro">
      Users of today’s web <a href="http://paul.kinlan.me/what-news-readers-want/">
      expect that the pages they visit will be interactive and smooth</a> and
      that’s where you need to increasingly focus your time and effort. Pages
      should not only load quickly, but also run well; scrolling should be
      stick-to-finger fast, and animations and interactions should be silky smooth.
    </p>
    <p>
      To write performant sites and apps you need to understand how HTML, JavaScript and CSS is handled by the browser, and ensure that the code you write (and the other 3rd party code you include) runs as efficiently as possible.
    </p>
  </div>
  {% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}
</div>

## 60fps and Device Refresh Rates

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p>
      Most devices today refresh their screens <b>60 times a second</b>. If there’s an animation or transition running, or the user is scrolling the pages, the browser needs to match the device’s refresh rate and put up 1 new picture, or frame, for each of those screen refreshes.
    </p>
    <p>
      Each of those frames has a budget of just over 16ms (1 second / 60 = 16.66ms). In reality, however, the browser has housekeeping work to do, so all of your work needs to be completed inside <b>10ms</b>. When you fail to meet this budget the frame rate drops, and the content judders on screen. This is often referred to as <b>jank</b>, and it negatively impacts the user's experience.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <img src="images/intro/response.jpg" alt="User interacting with a website.">
  </div>
</div>

## The pixel pipeline
There are five major areas that you need to know about and be mindful of when you work. They are areas you have the most control over, and key points in the pixels-to-screen pipeline:

<img src="images/intro/frame-full.jpg"  alt="The full pixel pipeline">

* **JavaScript**. Typically JavaScript is used to handle work that will result in visual changes, whether it’s jQuery’s `animate` function, sorting a data set, or adding DOM elements to the page. It doesn’t have to be JavaScript that triggers a visual change, though: CSS Animations, Transitions, and the Web Animations API are also commonly used.
* **Style calculations**. This is the process of figuring out which CSS rules apply to which elements based on matching selectors, e.g. `.headline` or `.nav > .nav__item`. From there, once rules are known, they are applied and the final styles for each element are calculated.
* **Layout**. Once the browser knows which rules apply to an element it can begin to calculate how much space it takes up and where it is on screen. The web’s layout model means that one element can affect others, e.g. the width of the `<body>` element typically affects its children’s widths and so on all the way up and down the tree, so the process can be quite involved for the browser.
* **Paint**. Painting is the process of filling in pixels. It involves drawing out text, colors, images, borders, and shadows, essentially every visual part of the elements. The drawing is typically done onto multiple surfaces, often called layers.
* **Compositing**. Since the parts of the page were drawn into potentially multiple layers they need to be drawn to the screen in the correct order so that the page renders correctly. This is especially important for elements that overlap another, since a mistake could result in one element appearing over the top of another incorrectly.

Each of these parts of the pipeline represents an opportunity to introduce jank, so it's important to understand exactly what parts of the pipeline your code triggers.

{% include shared/remember.liquid title="Note" list=page.notes.rasterize %}

You won’t always necessarily touch every part of the pipeline on every frame. In fact, there are three ways the pipeline _normally_ plays out for a given frame when you make a visual change, either with JavaScript, CSS, or Web Animations:

### 1. JS / CSS > Style > Layout > Paint > Composite

<img src="images/intro/frame-full.jpg"  alt="The full pixel pipeline">

If you change a “layout” property, so that’s one that changes an element’s geometry, like its width, height, or its position with left or top, the browser will have to check all the other elements and “reflow” the page. Any affected areas will need to be repainted, and the final painted elements will need to be composited back together.

### 2. JS / CSS > Style > Paint > Composite

<img src="images/intro/frame-no-layout.jpg" alt="The  pixel pipeline without layout.">

If you changed a “paint only” property, like a background image, text color, or shadows, i.e. one that does not affect the layout of the page, then the browser skips layout, but it will still do paint.

### 3. JS / CSS > Style > Composite

<img src="images/intro/frame-no-layout-paint.jpg" alt="The pixel pipeline without layout or paint.">

If you change a property that requires neither layout nor paint, and the browser jumps to just do compositing.

This final version is the cheapest and most desirable for high pressure points in an app's lifecycle, like animations or scrolling.

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

Performance is the art of avoiding work, and making any work you do as efficient as possible. In many cases it's about working with the browser, not against it. It’s worth bearing in mind that the work listed above in the pipeline differ in terms of computational cost; some tasks are more expensive than others!

Let’s take a dive into the different parts of the pipeline. We’ll take a look at the common issues, as well how to diagnose and fix them.
