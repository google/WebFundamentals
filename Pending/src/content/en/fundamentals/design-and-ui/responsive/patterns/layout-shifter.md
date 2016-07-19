project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices

<p class="intro">
  The layout shifter pattern is the most responsive pattern, with multiple breakpoints across several screen widths.
</p>

Key to this layout is the way content moves about, instead of reflowing and
dropping below other columns.  Due to the significant differences between each
major breakpoint, it is more complex to maintain and likely involves changes
within elements, not just overall content layout.

<a href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/layout-shifter.html">
  <img src="imgs/layout-shifter.svg">
  Try it
</a>

This simplified example shows the layout shifter pattern, on smaller screens
content is stacked vertically, but changes significantly as the screen becomes
larger, with a left `div` and two stacked `div`'s on the right.

Sites using this pattern include:

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.container</span> <span class="p">{</span>
  <span class="k">display</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="p">;</span>
  <span class="k">display</span><span class="o">:</span> <span class="n">flex</span><span class="p">;</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="o">-</span><span class="n">flow</span><span class="o">:</span> <span class="n">row</span> <span class="n">wrap</span><span class="p">;</span>
  <span class="n">flex</span><span class="o">-</span><span class="n">flow</span><span class="o">:</span> <span class="n">row</span> <span class="n">wrap</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.c1</span><span class="o">,</span> <span class="nc">.c2</span><span class="o">,</span> <span class="nc">.c3</span><span class="o">,</span> <span class="nc">.c4</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">600px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nc">.c1</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">25%</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nc">.c4</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">75%</span><span class="p">;</span>
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
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/layout-shifter.html">Try full sample</a>
      </p>
  </div>





