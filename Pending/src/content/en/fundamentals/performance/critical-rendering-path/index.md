


<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p class="intro">{{page.description}}</p>
    <p>
      Delivering a fast web experience requires a lot of work by the browser. Most of
      this work is hidden from us as web developers: we write the markup, and a nice
      looking page comes out on the screen. But how exactly does the browser go from
      consuming our HTML, CSS, and JavaScript to rendered pixels on the screen?
    </p>
  </div>
  {% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}
</div>

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




### Topics


  [Constructing the Object Model](/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model?hl=en)

  [Render-tree construction, layout, and paint](/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=en)

  [Render blocking CSS](/web/fundamentals/performance/critical-rendering-path/render-blocking-css?hl=en)

  [Adding interactivity with JavaScript](/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript?hl=en)

  [Measuring the critical rendering path with Navigation Timing](/web/fundamentals/performance/critical-rendering-path/measure-crp?hl=en)

  [Analyzing critical rendering path performance](/web/fundamentals/performance/critical-rendering-path/analyzing-crp?hl=en)

  [Optimizing the critical rendering path](/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path?hl=en)

  [PageSpeed rules and recommendations](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations?hl=en)

