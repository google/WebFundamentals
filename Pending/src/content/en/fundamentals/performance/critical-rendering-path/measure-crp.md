project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Learn to measure the critical rendering path.

<p class="intro">
  You can't optimize what you can't measure. Thankfully, the Navigation 
  Timing API gives us all the necessary tools to measure each step of the 
  critical rendering path!
</p>

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






The foundation of every solid performance strategy is good measurement and instrumentation. Turns out, that is exactly what the Navigation Timing API provides.

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

Each of the labels in the above diagram corresponds to a high resolution timestamp that the browser tracks for each and every page it loads. In fact, in this specific case we're only showing a fraction of all the different timestamps &mdash; for now we're skipping all network related timestamps, but we'll come back to them in a future lesson.

So, what do these timestamps mean?

* `domLoading`: this is the starting timestamp of the entire process, the
  browser is about to start parsing the first received bytes of the HTML
  document.
* `domInteractive`: marks the point when the browser has finished parsing all
  of the HTML and DOM construction is complete.
* `domContentLoaded`: marks the point when both the DOM is ready and there are no stylesheets that are blocking JavaScript execution - meaning we can now (potentially) construct the render tree.
    * Many JavaScript frameworks wait for this event before they start executing their own logic. For this reason the browser captures the `EventStart` and `EventEnd` timestamps to allow us to track how long this execution took.
* `domComplete`: as the name implies, all of the processing is complete and
  all of the resources on the page (images, etc.) have finished downloading -
  i.e. the loading spinner has stopped spinning.
* `loadEvent`: as a final step in every page load the browser fires an
  `onload` event which can trigger additional application logic.

The HTML specification dictates specific conditions for each and every event: when it should be fired, which conditions should be met, and so on. For our purposes, we'll focus on a few key milestones related to the critical rendering path:

* `domInteractive` marks when DOM is ready.
* `domContentLoaded` typically marks when [both the DOM and CSSOM are ready](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/).
    * If there is no parser blocking JavaScript then `DOMContentLoaded` will fire immediately after `domInteractive`.
* `domComplete` marks when the page and all of its subresources are ready.

<!-- Span required to prevent rest of page from being indented.
  https://github.com/google/WebFundamentals/issues/1873 -->
<span></span>


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;html&gt;</span>
  <span class="nt">&lt;head&gt;</span>
    <span class="nt">&lt;title&gt;</span>Critical Path: Measure<span class="nt">&lt;/title&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;viewport&quot;</span> <span class="na">content=</span><span class="s">&quot;width=device-width,initial-scale=1&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;link</span> <span class="na">href=</span><span class="s">&quot;style.css&quot;</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;script&gt;</span>
      <span class="kd">function</span> <span class="nx">measureCRP</span><span class="p">()</span> <span class="p">{</span>
        <span class="kd">var</span> <span class="nx">t</span> <span class="o">=</span> <span class="nb">window</span><span class="p">.</span><span class="nx">performance</span><span class="p">.</span><span class="nx">timing</span><span class="p">,</span>
          <span class="nx">interactive</span> <span class="o">=</span> <span class="nx">t</span><span class="p">.</span><span class="nx">domInteractive</span> <span class="o">-</span> <span class="nx">t</span><span class="p">.</span><span class="nx">domLoading</span><span class="p">,</span>
          <span class="nx">dcl</span> <span class="o">=</span> <span class="nx">t</span><span class="p">.</span><span class="nx">domContentLoadedEventStart</span> <span class="o">-</span> <span class="nx">t</span><span class="p">.</span><span class="nx">domLoading</span><span class="p">,</span>
          <span class="nx">complete</span> <span class="o">=</span> <span class="nx">t</span><span class="p">.</span><span class="nx">domComplete</span> <span class="o">-</span> <span class="nx">t</span><span class="p">.</span><span class="nx">domLoading</span><span class="p">;</span>
        <span class="kd">var</span> <span class="nx">stats</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;p&#39;</span><span class="p">);</span>
        <span class="nx">stats</span><span class="p">.</span><span class="nx">textContent</span> <span class="o">=</span> <span class="s1">&#39;interactive: &#39;</span> <span class="o">+</span> <span class="nx">interactive</span> <span class="o">+</span> <span class="s1">&#39;ms, &#39;</span> <span class="o">+</span>
            <span class="s1">&#39;dcl: &#39;</span> <span class="o">+</span> <span class="nx">dcl</span> <span class="o">+</span> <span class="s1">&#39;ms, complete: &#39;</span> <span class="o">+</span> <span class="nx">complete</span> <span class="o">+</span> <span class="s1">&#39;ms&#39;</span><span class="p">;</span>
        <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">stats</span><span class="p">);</span>
      <span class="p">}</span>
    <span class="nt">&lt;/script&gt;</span>
  <span class="nt">&lt;/head&gt;</span>
  <span class="nt">&lt;body</span> <span class="na">onload=</span><span class="s">&quot;measureCRP()&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;p&gt;</span>Hello <span class="nt">&lt;span&gt;</span>web performance<span class="nt">&lt;/span&gt;</span> students!<span class="nt">&lt;/p&gt;</span>
    <span class="nt">&lt;div&gt;&lt;img</span> <span class="na">src=</span><span class="s">&quot;awesome-photo.jpg&quot;</span><span class="nt">&gt;&lt;/div&gt;</span>
  <span class="nt">&lt;/body&gt;</span>
<span class="nt">&lt;/html&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/performance/critical-rendering-path/measure_crp.html">Try full sample</a>
      </p>
  </div>



The above example may seem a little daunting on first sight, but in reality it is actually pretty simple. The Navigation Timing API captures all the relevant timestamps and our code simply waits for the `onload` event to fire &mdash; recall that `onload` event fires after `domInteractive`, `domContentLoaded` and `domComplete` &mdash; and computes the difference between the various timestamps.

<img src="images/device-navtiming-small.png" class="center" alt="NavTiming demo">

All said and done, we now have some specific milestones to track and a simple function to output these measurements. Note that instead of printing these metrics on the page you can also modify the code to send these metrics to an analytics server ([Google Analytics does this automatically](https://support.google.com/analytics/answer/1205784?hl=en)), which is a great way to keep tabs on performance of your pages and identify candidate pages that can benefit from some optimization work.


