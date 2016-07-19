project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen.

<p class="intro">
  Media queries are simple filters that can be applied to CSS styles.  They make  it easy to change styles based on the characteristics of the device rendering the content, including the display type, width, height, orientation and even resolution.
</p>



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






For example, you could place all styles necessary for printing
inside a print media query:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">href=</span><span class="s">&quot;print.css&quot;</span> <span class="na">media=</span><span class="s">&quot;print&quot;</span><span class="nt">&gt;</span></code></pre></div>

In addition to using the `media` attribute in the stylesheet link, there are two
other ways to apply media queries that can be embedded in a CSS file: `@media`
and `@import`.  For performance reasons, either of the first two methods are
recommended over the `@import` syntax
(see [Avoid CSS imports](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)).

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="k">@media</span> <span class="nt">print</span> <span class="p">{</span>
  <span class="c">/* print style sheets go here */</span>
<span class="p">}</span>

<span class="k">@import</span> <span class="nt">url</span><span class="o">(</span><span class="nt">print</span><span class="nc">.css</span><span class="o">)</span> <span class="nt">print</span><span class="p">;</span></code></pre></div>

The logic that applies to media queries is not mutually exclusive and any filter
that meets that criteria the resulting CSS block will be applied using the
standard rules of precedence in CSS.

## Apply media queries based on viewport size

Media queries enable us to create a responsive experience, where specific styles
are applied to small screens, large screens and anywhere in between.  The media
query syntax allows for the creation of rules that can be applied depending on
device characteristics.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="k">@media</span> <span class="o">(</span><span class="nt">query</span><span class="o">)</span> <span class="p">{</span>
  <span class="c">/* CSS Rules used when query matches */</span>
<span class="p">}</span></code></pre></div>

While there are several different items we can query on, the ones used most
often for responsive web design are `min-width`, `max-width`, `min-height` and
`max-height`.


<table class="mdl-data-table mdl-js-data-table">
  <colgroup>
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="attribute">attribute</th>
      <th data-th="Result">Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">Rules applied for any browser width over the value defined in the query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">Rules applied for any browser width below the value defined in the query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">Rules applied for any browser height over the value defined in the query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">Rules applied for any browser height below the value defined in the query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Rules applied for any browser where the height is greater than or equal to the width.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Rules for any browser where the width is greater than the height.</td>
    </tr>
  </tbody>
</table>

Let's take a look an example:

<figure>
  <a href="/web/resources/samples/fundamentals/design-and-ui/responsive/fundamentals/media-queries.html">
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Preview of a page using media queries to change properties as it is resized.">
  </a>
</figure>


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;(max-width: 640px)&quot;</span> <span class="na">href=</span><span class="s">&quot;max-640px.css&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;(min-width: 640px)&quot;</span> <span class="na">href=</span><span class="s">&quot;min-640px.css&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;(orientation: portrait)&quot;</span> <span class="na">href=</span><span class="s">&quot;portrait.css&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;(orientation: landscape)&quot;</span> <span class="na">href=</span><span class="s">&quot;landscape.css&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;style&gt;</span>
  <span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">500px</span><span class="o">)</span> <span class="nt">and</span> <span class="o">(</span><span class="nt">max-width</span><span class="o">:</span> <span class="nt">600px</span><span class="o">)</span> <span class="p">{</span>
    <span class="nt">h1</span> <span class="p">{</span>
      <span class="k">color</span><span class="o">:</span> <span class="nb">fuchsia</span><span class="p">;</span>
    <span class="p">}</span>

    <span class="nc">.desc</span><span class="nd">:after</span> <span class="p">{</span>
      <span class="k">content</span><span class="o">:</span><span class="s2">&quot; In fact, it&#39;s between 500px and 600px wide.&quot;</span><span class="p">;</span>
    <span class="p">}</span>
  <span class="p">}</span>
<span class="nt">&lt;/style&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/responsive/fundamentals/media-queries.html">Try full sample</a>
      </p>
  </div>



* When the browser is between <b>0px</b> and <b>640px</b> wide, `max-640px.css` will be applied.
* When the browser is between <b>500px</b> and <b>600px</b> wide, styles within the `@media` will be applied.
* When the browser is <b>640px or wider</b>, `min-640px.css` will be applied.
* When the browser <b>width is greater than the height</b>, `landscape.css` will be applied.
* When the browser <b>height is greater than the width</b>, `portrait.css` will be applied.


## A note on `min-device-width`

It is also possible to create queries based on
`*-device-width`; though this practice is **strongly discouraged**.

The difference is subtle but very important: `min-width` is based on the
size of the browser window, whereas `min-device-width` is based on
the size of the screen.  Unfortunately some browsers, including the legacy
Android browser may not report the device width properly and instead
report the screen size in device pixels instead of the expected viewport width.

In addition, using `*-device-width` can prevent content from adapting on
desktops or other devices that allow windows to be resized because the query
is based on the actual device size, not the size of the browser window.

## Use `any-pointer` and `any-hover` for flexible interactions

Starting with Chrome 39, your style sheets can write selectors that cover
multiple pointer types and hover behaviors. The `any-pointer` and `any-hover`
media features are similar to `pointer` and `hover` in allowing you to query the
capabilities of the user's pointer. Unlike the later, `any-pointer` and
`any-hover` operate on the union of all pointer devices rather than the just the
primary pointer device.

## Use relative units

A key concept behind responsive design is fluidity and proportionality as
opposed to fixed width layouts.  Using relative units for measurements can help
simplify layouts and prevent accidentally creating components that are too big
for the viewport.

For example, setting width: 100% on a top level div, ensures that it spans the
width of the viewport and is never too big or too small for the viewport.  The
div will fit, no matter if it's a 320px wide iPhone, 342px wide Blackberry Z10
or a 360px wide Nexus 5.

In addition, using relative units allows browsers to render the content based on
the users zoom level without the need for adding horizontal scroll bars to the
page.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <h2>YES</h2>
<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nt">div</span><span class="nc">.fullWidth</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <h2>NO</h2>
<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nt">div</span><span class="nc">.fullWidth</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">320px</span><span class="p">;</span>
  <span class="k">margin-left</span><span class="o">:</span> <span class="k">auto</span><span class="p">;</span>
  <span class="k">margin-right</span><span class="o">:</span> <span class="k">auto</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>
  </div>
</div>



