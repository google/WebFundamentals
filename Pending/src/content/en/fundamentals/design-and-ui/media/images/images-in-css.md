project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: The CSS `background` property is a powerful tool for adding complex images to elements, making it easy to add multiple images, cause them to repeat, and more.

<p class="intro">
  The CSS `background` property is a powerful tool for adding complex images to elements, making it easy to add multiple images, cause them to repeat, and more.  When combined with media queries, the background property becomes even more powerful, enabling conditional image loading based on screen resolution, viewport size and more.
</p>


















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Use the best image for the characteristics of the display, consider screen size, device resolution and page layout.</li>
    
    <li>Change the <code>background-image</code> property in CSS for high DPI displays using media queries with <code>min-resolution</code> and <code>-webkit-min-device-pixel-ratio</code>.</li>
    
    <li>Use srcset to provide high resolution images in addition to the 1x image in markup.</li>
    
    <li>Consider the performance costs when using JavaScript image replacement techniques or when serving highly compressed high resolution images to lower resolution devices.</li>
    
  </ul>
  
</div>



## Use media queries for conditional image loading or art direction

Media queries not only affect the page layout, but can also be used to
conditionally load images or to provide art direction depending on the viewport
width.

For example in the sample below, on smaller screens, only `small.png` is
downloaded and applied to the content `div`, while on larger screens,
`background-image: url(body.png)` is applied to the body and `background-image:
url(large.png)` is applied to the content `div`.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.example</span> <span class="p">{</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">400px</span><span class="p">;</span>
  <span class="k">background-image</span><span class="o">:</span> <span class="sx">url(small.png)</span><span class="p">;</span>
  <span class="k">background-repeat</span><span class="o">:</span> <span class="k">no-repeat</span><span class="p">;</span>
  <span class="k">background</span><span class="o">-</span><span class="k">size</span><span class="o">:</span> <span class="n">contain</span><span class="p">;</span>
  <span class="k">background-position</span><span class="o">-</span><span class="n">x</span><span class="o">:</span> <span class="k">center</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">500px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nt">body</span> <span class="p">{</span>
    <span class="k">background-image</span><span class="o">:</span> <span class="sx">url(body.png)</span><span class="p">;</span>
  <span class="p">}</span>
  <span class="nc">.example</span> <span class="p">{</span>
    <span class="k">background-image</span><span class="o">:</span> <span class="sx">url(large.png)</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/media/images/conditional-mq.html">Try full sample</a>
      </p>
  </div>



## Use image-set to provide high res images

The `image-set()` function in CSS enhances the behavior `background` property,
making it easy to provide multiple image files for different device
characteristics.  This allows the browser to choose the best image depending on
the characteristics of the device, for example using a 2x image on a 2x display,
or a 1x image on a 2x device when on a limited bandwidth network.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nt">background-image</span><span class="o">:</span> <span class="nt">image-set</span><span class="o">(</span>
  <span class="nt">url</span><span class="o">(</span><span class="nt">icon1x</span><span class="nc">.jpg</span><span class="o">)</span> <span class="nt">1x</span><span class="o">,</span>
  <span class="nt">url</span><span class="o">(</span><span class="nt">icon2x</span><span class="nc">.jpg</span><span class="o">)</span> <span class="nt">2x</span>
<span class="o">);</span></code></pre></div>

In addition to loading the correct image, the browser will also scale it
accordingly. In other words, the browser assumes that 2x images are twice as
large as 1x images, and so will scale the 2x image down by a factor of 2, so
that the image appears to be the same size on the page.

Support for `image-set()` is still new and is only supported in Chrome and
Safari with the `-webkit` vendor prefix.  Care must also be taken to include a
fallback image for when `image-set()` is not supported, for example:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.sample</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">128px</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">128px</span><span class="p">;</span>
  <span class="k">background-image</span><span class="o">:</span> <span class="sx">url(icon1x.png)</span><span class="p">;</span>
  <span class="k">background-image</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">image</span><span class="o">-</span><span class="n">set</span><span class="p">(</span>
    <span class="sx">url(icon1x.png)</span> <span class="m">1</span><span class="n">x</span><span class="o">,</span>
    <span class="sx">url(icon2x.png)</span> <span class="m">2</span><span class="n">x</span>
  <span class="p">);</span>
  <span class="k">background-image</span><span class="o">:</span> <span class="n">image</span><span class="o">-</span><span class="n">set</span><span class="p">(</span>
    <span class="sx">url(icon1x.png)</span> <span class="m">1</span><span class="n">x</span><span class="o">,</span>
    <span class="sx">url(icon2x.png)</span> <span class="m">2</span><span class="n">x</span>
  <span class="p">);</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/media/images/image-set.html">Try full sample</a>
      </p>
  </div>



The above will load the appropriate asset in browsers that support image-set,
and fall back to the 1x asset otherwise. The obvious caveat is that while
`image-set()` browser support is low, most browsers will get the 1x asset.

## Use media queries to provide high res images or art direction

Media queries can create rules based on the [device pixel
ratio](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), making it possible
to specify different images for 2x vs 1x displays.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="k">@media</span> <span class="o">(</span><span class="nt">min-resolution</span><span class="o">:</span> <span class="nt">2dppx</span><span class="o">),</span>
<span class="o">(</span><span class="nt">-webkit-min-device-pixel-ratio</span><span class="o">:</span> <span class="nt">2</span><span class="o">)</span>
<span class="p">{</span>
  <span class="c">/* High dpi styles &amp; resources here */</span>
<span class="p">}</span></code></pre></div>

Chrome, Firefox and Opera all support the standard `(min-resolution: 2dppx)`,
while Safari and Android Browser both require the older vendor prefixed syntax
without the `dppx` unit.  Remember, these styles are only loaded if the device
matches the media query, and you must specify styles for the base case.  This
also provides the benefit of ensuring something will be rendered if the browser
doesn't support resolution specific media queries.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.sample</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">128px</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">128px</span><span class="p">;</span>
  <span class="k">background-image</span><span class="o">:</span> <span class="sx">url(icon1x.png)</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-resolution</span><span class="o">:</span> <span class="nt">2dppx</span><span class="o">),</span> <span class="c">/* Standard syntax */</span>
<span class="o">(</span><span class="nt">-webkit-min-device-pixel-ratio</span><span class="o">:</span> <span class="nt">2</span><span class="o">)</span>  <span class="c">/* Safari &amp; Android Browser */</span>
<span class="p">{</span>
  <span class="nc">.sample</span> <span class="p">{</span>
    <span class="k">background</span><span class="o">-</span><span class="k">size</span><span class="o">:</span> <span class="n">contain</span><span class="p">;</span>
    <span class="k">background-image</span><span class="o">:</span> <span class="sx">url(icon2x.png)</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/media/images/media-query-dppx.html">Try full sample</a>
      </p>
  </div>



You can also use the min-width syntax to display alternative images depending on
the viewport size.  This technique has the advantage that the image is not
downloaded if media query doesn't match.  For example, `bg.png` is only
downloaded and applied to the `body` if the browser width is 500px or greater:

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">500px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nt">body</span> <span class="p">{</span>
    <span class="k">background-image</span><span class="o">:</span> <span class="sx">url(bg.png)</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span></code></pre></div>



