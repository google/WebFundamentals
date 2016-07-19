project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices

<p class="intro">
  For full-width multi-column layouts, column drop simply stacks the columns vertically as the window width becomes too narrow for the content.
</p>

Eventually
this results in all of the columns being stacked vertically.  Choosing
breakpoints for this layout pattern is dependent on the content and will change
for each design.

<a href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/column-drop.html">
  <img src="imgs/column-drop.svg">
  Try it
</a>


Like the mostly fluid sample, content is stacked vertically in the smallest
view, but as the screen expands beyond 600px, the primary and secondary content
`div`'s take the full width of the screen.  The order of the `div`'s is set using
the order CSS property.  At 800px all three content `div`'s are shown, using the
full screen width.

Sites using this pattern include:

 * [Modernizr](https://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.container</span> <span class="p">{</span>
  <span class="k">display</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="p">;</span>
  <span class="k">display</span><span class="o">:</span> <span class="n">flex</span><span class="p">;</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="o">-</span><span class="n">flow</span><span class="o">:</span> <span class="n">row</span> <span class="n">wrap</span><span class="p">;</span>
  <span class="n">flex</span><span class="o">-</span><span class="n">flow</span><span class="o">:</span> <span class="n">row</span> <span class="n">wrap</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.c1</span><span class="o">,</span> <span class="nc">.c2</span><span class="o">,</span> <span class="nc">.c3</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">600px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nc">.c1</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">60%</span><span class="p">;</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">order</span><span class="o">:</span> <span class="m">2</span><span class="p">;</span>
    <span class="n">order</span><span class="o">:</span> <span class="m">2</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nc">.c2</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">40%</span><span class="p">;</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">order</span><span class="o">:</span> <span class="m">1</span><span class="p">;</span>
    <span class="n">order</span><span class="o">:</span> <span class="m">1</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nc">.c3</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">order</span><span class="o">:</span> <span class="m">3</span><span class="p">;</span>
    <span class="n">order</span><span class="o">:</span> <span class="m">3</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>


<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">800px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nc">.c2</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">20%</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nc">.c3</span> <span class="p">{</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">20%</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/column-drop.html">Try full sample</a>
      </p>
  </div>





