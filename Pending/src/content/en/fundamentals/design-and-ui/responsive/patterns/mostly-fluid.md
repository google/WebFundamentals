project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices

<p class="intro">
  The mostly fluid pattern consists primarily of a fluid grid.  On large or medium screens, it usually remains the same size, simply adjusting the margins on wider screens.
</p>

On smaller screens, the fluid grid causes the main content to reflow,
while columns are stacked vertically.  One major advantage of this pattern is
that it usually only requires one breakpoint between small screens and large
screens.

<a href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/mostly-fluid.html">
  <img src="imgs/mostly-fluid.svg">
  Try it
</a>

In the smallest view, each content `div` is stacked vertically.  Once the screen
width hits 600px, the primary content `div` remains at `width: 100%`, while the
secondary `div`'s are shown as two columns below the primary `div`.  Beyond
800px, the container `div` becomes fixed width and is centered on the screen.

Sites using this pattern include:

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)



  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.container</span> <span class="p">{</span>
  <span class="k">display</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="p">;</span>
  <span class="k">display</span><span class="o">:</span> <span class="n">flex</span><span class="p">;</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="o">-</span><span class="n">flow</span><span class="o">:</span> <span class="n">row</span> <span class="n">wrap</span><span class="p">;</span>
  <span class="n">flex</span><span class="o">-</span><span class="n">flow</span><span class="o">:</span> <span class="n">row</span> <span class="n">wrap</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.c1</span><span class="o">,</span> <span class="nc">.c2</span><span class="o">,</span> <span class="nc">.c3</span><span class="o">,</span> <span class="nc">.c4</span><span class="o">,</span> <span class="nc">.c5</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">600px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nc">.c2</span><span class="o">,</span> <span class="nc">.c3</span><span class="o">,</span> <span class="nc">.c4</span><span class="o">,</span> <span class="nc">.c5</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">50%</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">800px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nc">.c1</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">60%</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="nc">.c2</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">40%</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="nc">.c3</span><span class="o">,</span> <span class="nc">.c4</span><span class="o">,</span> <span class="nc">.c5</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">33.33%</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">800px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nc">.container</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">800px</span><span class="p">;</span>
    <span class="k">margin-left</span><span class="o">:</span> <span class="k">auto</span><span class="p">;</span>
    <span class="k">margin-right</span><span class="o">:</span> <span class="k">auto</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/mostly-fluid.html">Try full sample</a>
      </p>
  </div>





