project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Learn how to animate between two views in your apps.

<p class="intro">
  Many times you will want to move users between views in your application, whether that's a list to a details view, or show a sidebar navigation. Animations between these views are great for keeping the user engaged and add even more life to your projects.
</p>

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






What these view transitions look and behave like will depend very much on the type of views you’re dealing with, so for example animating a modal overlay on top of a view should be a different experience to transitioning between a list and details view.





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Use translations to move between views

To make life a bit easier let’s assume there are two views: a list view and a details view. As the user taps on a list item inside the list view the details view will slide in, and the list view will slide out.

<img src="imgs/gifs/view-translate.gif" alt="Translating between two views" />

To achieve this effect you will need a container for both views which has `overflow: hidden` set on it. That way the two views can both be inside it side-by-side without showing any horizontal scrollbars, and each view can slide side-to-side inside the container as needed.

<img src="imgs/container-two-views.svg" alt="View hierarchy." />

The CSS for the container is:

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.container</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">overflow</span><span class="o">:</span> <span class="k">hidden</span><span class="p">;</span>
  <span class="k">position</span><span class="o">:</span> <span class="k">relative</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>

The position of the container is set as `relative`. This will mean that each view inside it can be positioned absolutely to the top left corner and then moved around with transforms. This approach is better for performance than using the `left` property (since that triggers layout and paint), and is typically easier to rationalize.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.view</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">position</span><span class="o">:</span> <span class="k">absolute</span><span class="p">;</span>
  <span class="k">left</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
  <span class="k">top</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>

  <span class="c">/* let the browser know we plan to animate</span>
<span class="c">     each view in and out */</span>
  <span class="n">will</span><span class="o">-</span><span class="n">change</span><span class="o">:</span> <span class="n">transform</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>

Adding a `transition` on the `transform` property provides a nice slide effect. To give it a nice feel it’s using a custom `cubic-bezier` curve, which we discussed in the [Custom Easing guide](custom-easing.html).

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.view</span> <span class="p">{</span>
  <span class="c">/* Prefixes are needed for Safari and other WebKit-based browsers */</span>
  <span class="n">transition</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span> <span class="m">0.3s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">);</span>
  <span class="n">transition</span><span class="o">:</span> <span class="n">transform</span> <span class="m">0.3s</span> <span class="n">cubic</span><span class="o">-</span><span class="n">bezier</span><span class="p">(</span><span class="m">0</span><span class="o">.</span><span class="m">465</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">183</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">153</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">946</span><span class="p">);</span>
<span class="p">}</span></code></pre></div>

The view that is offscreen should be translated to the right, so in this case the details view needs to be moved:

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.details-view</span> <span class="p">{</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translateX</span><span class="p">(</span><span class="m">100%</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translateX</span><span class="p">(</span><span class="m">100%</span><span class="p">);</span>
<span class="p">}</span></code></pre></div>

Now a small amount of JavaScript is necessary to handle the classes. This will toggle the appropriate classes on the views.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">container</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.container&#39;</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">backButton</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.back-button&#39;</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">listItems</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelectorAll</span><span class="p">(</span><span class="s1">&#39;.list-item&#39;</span><span class="p">);</span>

<span class="cm">/**</span>
<span class="cm"> * Toggles the class on the container so that</span>
<span class="cm"> * we choose the correct view.</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">onViewChange</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">container</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">toggle</span><span class="p">(</span><span class="s1">&#39;view-change&#39;</span><span class="p">);</span>
<span class="p">}</span>

<span class="c1">// When you click on a list item bring on the details view.</span>
<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">listItems</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">listItems</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="nx">onViewChange</span><span class="p">,</span> <span class="kc">false</span><span class="p">);</span>
<span class="p">}</span>

<span class="c1">// And switch it back again when you click on the back button</span>
<span class="nx">backButton</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="nx">onViewChange</span><span class="p">);</span></code></pre></div>

Finally, we add the CSS declarations for those classes.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.view-change</span> <span class="nc">.list-view</span> <span class="p">{</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translateX</span><span class="p">(</span><span class="m">-100%</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translateX</span><span class="p">(</span><span class="m">-100%</span><span class="p">);</span>
<span class="p">}</span>

<span class="nc">.view-change</span> <span class="nc">.details-view</span> <span class="p">{</span>
  <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">transform</span><span class="o">:</span> <span class="n">translateX</span><span class="p">(</span><span class="m">0</span><span class="p">);</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translateX</span><span class="p">(</span><span class="m">0</span><span class="p">);</span>
<span class="p">}</span></code></pre></div>

<a href="/web/resources/samples/fundamentals/design-and-ui/animations/inter-view-animation.html">See sample.</a>

You could expand this to cover multiple views, and the basic concept should remain the same; each non-visible view should be offscreen and brought on as needed, and the currently onscreen view should be moved off.





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






In addition to transitioning between views this technique can also be applied to other slide-in elements, like sidebar navigation elements. The only real difference is that you shouldn’t need to move the other views.

## Ensure your animation works with larger screens

For a larger screen you should keep the list view around all the time rather than removing it, and slide on the details view from the right hand side. It’s pretty much the same as dealing with a navigation view.

<img src="imgs/container-two-views-ls.svg" alt="View hierarchy on a large screen." />



