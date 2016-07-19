project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Responsive web design patterns are quickly evolving, but there are a handful of established patterns that work well across the desktop and mobile devices

<p class="intro">
  Tiny tweaks simply makes small changes to the layout, such as adjusting font size, resizing images or moving content around in very minor ways.
</p>

It works well on single column layouts such as one page linear websites, text
heavy articles.

<a href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/tiny-tweaks.html">
  <img src="imgs/tiny-tweaks.svg">
  Try it
</a>

As its name implies, little changes with this sample as the screen size changes.
As the screen width gets larger, so do the font size and padding.

Sites using this pattern include:

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.c1</span> <span class="p">{</span>
  <span class="k">padding</span><span class="o">:</span> <span class="m">10px</span><span class="p">;</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">500px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nc">.c1</span> <span class="p">{</span>
    <span class="k">padding</span><span class="o">:</span> <span class="m">20px</span><span class="p">;</span>
    <span class="k">font-size</span><span class="o">:</span> <span class="m">1.5em</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>

<span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">800px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nc">.c1</span> <span class="p">{</span>
    <span class="k">padding</span><span class="o">:</span> <span class="m">40px</span><span class="p">;</span>
    <span class="k">font-size</span><span class="o">:</span> <span class="m">2em</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/responsive/patterns/tiny-tweaks.html">Try full sample</a>
      </p>
  </div>





