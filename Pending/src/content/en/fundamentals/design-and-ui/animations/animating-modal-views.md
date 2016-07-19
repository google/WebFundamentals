project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Learn how to animate modal views in your apps.

<p class="intro">
Modal views are for important messages, and for which you have very good reasons to block the user interface. Care must be taken when you use them as they are disruptive and can easily ruin the user’s experience if overused. But, in some circumstances, they’re the right views to use, and adding some animation will bring them to life."

</p>
















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Modal views should be used sparingly; users will get frustrated if you interrupt their experience unnecessarily.</li>
    
    <li>Adding scale to the animation gives a nice 'drop on' effect.</li>
    
    <li>Be sure to get rid of the modal view quickly when the user dismisses it, but you should bring it on to screen a little more slowly so it doesn't surprise the user.</li>
    
  </ul>
  
</div>



<img src="imgs/gifs/dont-press.gif" alt="Animating a modal view." />

<a href="/web/resources/samples/fundamentals/design-and-ui/animations/modal-view-animation.html">See sample.</a>

The modal overlay should be aligned to the viewport so it needs to have its `position` set to `fixed`:

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.modal</span> <span class="p">{</span>
  <span class="k">position</span><span class="o">:</span> <span class="k">fixed</span><span class="p">;</span>
  <span class="k">top</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
  <span class="k">left</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>

  <span class="k">pointer</span><span class="o">-</span><span class="n">events</span><span class="o">:</span> <span class="k">none</span><span class="p">;</span>
  <span class="k">opacity</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>

  <span class="n">will</span><span class="o">-</span><span class="n">change</span><span class="o">:</span> <span class="n">transform</span><span class="o">,</span> <span class="k">opacity</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>

It has an initial `opacity` of 0 so it's hidden from view, but then it will also need `pointer-events` set to `none` so that click and touches pass through. Without that it will block all interactions rendering the whole page unresponsive. Finally, since it will animate its `opacity` and `transform` those need to be marked as changing with `will-change` (see also [Using the will-change property](/web/fundamentals/design-and-ui/animations/animations-and-performance.html#using-the-will-change-property)).

When the view is visible it will need to accept interactions and have an `opacity` of 1:

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.modal.visible</span> <span class="p">{</span>
  <span class="k">pointer</span><span class="o">-</span><span class="n">events</span><span class="o">:</span> <span class="k">auto</span><span class="p">;</span>
  <span class="k">opacity</span><span class="o">:</span> <span class="m">1</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>

Now whenever the modal view is required, you can use JavaScript to toggle the "visible" class:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">modal</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="s1">&#39;visible&#39;</span><span class="p">);</span></code></pre></div>

At this point the modal view will appear without any animation, so that can now be added in
(see also [Custom Easing](/web/fundamentals/design-and-ui/animations/custom-easing.html)):

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.modal</span> <span class="p">{</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">scale</span><span class="p">(</span><span class="m">1</span><span class="o">.</span><span class="m">15</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">scale</span><span class="p">(</span><span class="m">1</span><span class="o">.</span><span class="m">15</span><span class="p">);</span>

  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transition</span><span class="o">:</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span> <span class="m">0.1s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">)</span><span class="o">,</span>
    <span class="k">opacity</span> <span class="m">0.1s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">);</span>

  <span class="n">transition</span><span class="o">:</span>
    <span class="n">transform</span> <span class="m">0.1s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">)</span><span class="o">,</span>
    <span class="k">opacity</span> <span class="m">0.1s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">);</span>

<span class="p">}</span></code></pre></div>

Adding `scale` to the transform makes the view appear to drop onto the screen slightly, which is a nice effect. The default transition applies to both transform and opacity properties with a custom curve and a duration of 0.1 seconds.

The duration is pretty short, though, but it's ideal for when the user dismisses the view and wants to get back to your app. The downside is that it’s probably too aggressive for when the modal view appears. To fix this you should override the transition values for the `visible` class:

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.modal.visible</span> <span class="p">{</span>

  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">scale</span><span class="p">(</span><span class="m">1</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">scale</span><span class="p">(</span><span class="m">1</span><span class="p">);</span>

  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transition</span><span class="o">:</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span> <span class="m">0.3s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">)</span><span class="o">,</span>
    <span class="k">opacity</span> <span class="m">0.3s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">);</span>

  <span class="n">transition</span><span class="o">:</span>
    <span class="n">transform</span> <span class="m">0.3s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">)</span><span class="o">,</span>
    <span class="k">opacity</span> <span class="m">0.3s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">);</span>

<span class="p">}</span></code></pre></div>

Now the modal view takes 0.3s seconds to come onto the screen, which is a bit less aggressive, but it is dismissed quickly, which the user will appreciate.




