project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices

<p class="intro">
  Rather than stacking content vertically, the off canvas pattern places less frequently used content, perhaps navigation or app menus off screen, only showing it when the screen size is large enough, and on smaller screens, content is only a click away.
</p>

<a href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/off-canvas.html">
  <img src="imgs/off-canvas.svg">
  Try it
</a>

Rather than stacking content vertically, this sample hides two of the content
`div`s off screen by using a `transform: translate(-250px, 0)`.  JavaScript is used
to show the divs by adding an open class to the element to make visible.  As the
screen gets wider, the off-screen positioning is removed from the elements and
they're shown within the visible viewport.

Note in this sample, Safari for iOS 6 and Android Browser do not support the
`flex-flow: row nowrap` feature of `flexbox`, so we’ve had to fallback to
absolute positioning.

Sites using this pattern include:

 * [HTML5Rocks
  Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](https://www.google.com/nexus/)
 * [Facebook's Mobile Site](https://m.facebook.com/)


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">body</span> <span class="p">{</span>
  <span class="k">overflow-x</span><span class="o">:</span> <span class="k">hidden</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.container</span> <span class="p">{</span>
  <span class="k">display</span><span class="o">:</span> <span class="k">block</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.c1</span><span class="o">,</span> <span class="nc">.c3</span> <span class="p">{</span>
  <span class="k">position</span><span class="o">:</span> <span class="k">absolute</span><span class="p">;</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">250px</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>

  <span class="c">/*</span>
<span class="c">    This is a trick to improve performance on newer versions of Chrome</span>
<span class="c">    #perfmatters</span>
<span class="c">  */</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">backface</span><span class="o">-</span><span class="k">visibility</span><span class="o">:</span> <span class="k">hidden</span><span class="p">;</span>
  <span class="n">backface</span><span class="o">-</span><span class="k">visibility</span><span class="o">:</span> <span class="k">hidden</span><span class="p">;</span>

  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transition</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span> <span class="m">0.4s</span> <span class="n">ease</span><span class="o">-</span><span class="n">out</span><span class="p">;</span>
  <span class="n">transition</span><span class="o">:</span> <span class="n">transform</span> <span class="m">0.4s</span> <span class="n">ease</span><span class="o">-</span><span class="n">out</span><span class="p">;</span>

  <span class="k">z-index</span><span class="o">:</span> <span class="m">1</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.c1</span> <span class="p">{</span>
  <span class="c">/*</span>
<span class="c">  Using translate3d as a trick to improve performance on older versions of Chrome</span>
<span class="c">  See: http://aerotwist.com/blog/on-translate3d-and-layer-creation-hacks/</span>
<span class="c">  #perfmatters</span>
<span class="c">  */</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">-250px</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">-250px</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
<span class="p">}</span>

<span class="nc">.c2</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">position</span><span class="o">:</span> <span class="k">absolute</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.c3</span> <span class="p">{</span>
  <span class="k">left</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.c1.open</span> <span class="p">{</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
<span class="p">}</span>

<span class="nc">.c3.open</span> <span class="p">{</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">-250px</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">-250px</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">500px</span><span class="o">)</span> <span class="p">{</span>
  <span class="c">/* If the screen is wider then 500px, use Flexbox */</span>
  <span class="nc">.container</span> <span class="p">{</span>
    <span class="k">display</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="p">;</span>
    <span class="k">display</span><span class="o">:</span> <span class="n">flex</span><span class="p">;</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="o">-</span><span class="n">flow</span><span class="o">:</span> <span class="n">row</span> <span class="k">nowrap</span><span class="p">;</span>
    <span class="n">flex</span><span class="o">-</span><span class="n">flow</span><span class="o">:</span> <span class="n">row</span> <span class="k">nowrap</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="nc">.c1</span> <span class="p">{</span>
    <span class="k">position</span><span class="o">:</span> <span class="k">relative</span><span class="p">;</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transition</span><span class="o">:</span> <span class="k">none</span> <span class="m">0s</span> <span class="n">ease</span><span class="o">-</span><span class="n">out</span><span class="p">;</span>
    <span class="n">transition</span><span class="o">:</span> <span class="k">none</span> <span class="m">0s</span> <span class="n">ease</span><span class="o">-</span><span class="n">out</span><span class="p">;</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
    <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
  <span class="p">}</span>
  <span class="nc">.c2</span> <span class="p">{</span>
    <span class="k">position</span><span class="o">:</span> <span class="k">static</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">800px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nt">body</span> <span class="p">{</span>
    <span class="k">overflow-x</span><span class="o">:</span> <span class="k">auto</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="nc">.c3</span> <span class="p">{</span>
    <span class="k">position</span><span class="o">:</span> <span class="k">relative</span><span class="p">;</span>
    <span class="k">left</span><span class="o">:</span> <span class="k">auto</span><span class="p">;</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transition</span><span class="o">:</span> <span class="k">none</span> <span class="m">0s</span> <span class="n">ease</span><span class="o">-</span><span class="n">out</span><span class="p">;</span>
    <span class="n">transition</span><span class="o">:</span> <span class="k">none</span> <span class="m">0s</span> <span class="n">ease</span><span class="o">-</span><span class="n">out</span><span class="p">;</span>
    <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
    <span class="n">transform</span><span class="o">:</span> <span class="n">translate</span><span class="p">(</span><span class="m">0</span><span class="o">,</span><span class="m">0</span><span class="p">);</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/off-canvas.html">Try full sample</a>
      </p>
  </div>





