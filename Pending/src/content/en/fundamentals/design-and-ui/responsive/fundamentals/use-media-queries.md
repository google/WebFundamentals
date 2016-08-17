project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen.

{# wf_review_required #}
{# wf_updated_on: 2014-10-09 #}
{# wf_published_on: 2014-04-29 #}

# Use CSS media queries for responsiveness {: .page-title }

{% include "_shared/contributors/petelepage.html" %}

Media queries are simple filters that can be applied to CSS styles.  They make  it easy to change styles based on the characteristics of the device rendering the content, including the display type, width, height, orientation and even resolution.


## TL;DR
- Media queries can be used to apply styles based on device characteristics.
- Use <code>min-width</code> over <code>min-device-width</code> to ensure the broadest experience.
- Use relative sizes for elements to avoid breaking layout.


For example, you could place all styles necessary for printing
inside a print media query:


    <link rel="stylesheet" href="print.css" media="print">
    

In addition to using the `media` attribute in the stylesheet link, there are two
other ways to apply media queries that can be embedded in a CSS file: `@media`
and `@import`.  For performance reasons, either of the first two methods are
recommended over the `@import` syntax
(see [Avoid CSS imports](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

The logic that applies to media queries is not mutually exclusive and any filter
that meets that criteria the resulting CSS block will be applied using the
standard rules of precedence in CSS.

## Apply media queries based on viewport size

Media queries enable us to create a responsive experience, where specific styles
are applied to small screens, large screens and anywhere in between.  The media
query syntax allows for the creation of rules that can be applied depending on
device characteristics.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

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
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Preview of a page using media queries to change properties as it is resized.">
  {% endlink_sample %}
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/fundamentals/_code/media-queries.html" region_tag="mqueries" %}
</pre>

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
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <h2>NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>
</div>


