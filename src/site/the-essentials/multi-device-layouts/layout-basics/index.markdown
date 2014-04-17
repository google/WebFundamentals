---
layout: article
title: "Responsive Web Design Fundamentals"
introduction: "The use of mobile devices to surf the web is growing at an astronomical pace, 
              but unfortunately much of the web isn't optimized for those mobile devices. Mobile 
              devices are often constrained by display size and require a different approach 
              to how content is laid out on screen."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
collection: multi-device-layouts
key-takeaways:
  set-viewport:
    - Use meta viewport tag to control the width and scaling of the browsers viewport.
    - Include <code>width=device-width</code> to match the screen's width in device independent pixels.
    - Include <code>initial-scale=1</code> to establish a 1:1 relationship between CSS pixels and device independent pixels.
    - Ensure your page is accessible by not disabling user scaling.
  size-content-to-vp:
    - Do not use large fixed width elements.
    - Content should not rely on a particular viewport width to render well.
    - Use CSS media queries to apply different styling for small and large screens.
  media-queries:
    - Media queries can be used to apply styles based on device characteristics.
    - Use <code>min-width</code> over <code>min-device-width</code> to ensure the broadest experience.
    - Use relative sizes for elements to avoid breaking layout.
  choose-breakpoints:
    - Create breakpoints based on content, never on specific devices, products or brands.
    - Design for the smallest mobile device first, then progressively enhance the experience as more screen real estate becomes available.
    - Keep lines of text to a maximum of around 70 or 80 characters.
remember:
  use-commas:
    - Use a comma to separate attributes to ensure older browsers can properly parse the attributes.
---
{% wrap content %}

<style type="text/css">
  video {
    width: 100%;
  }

  img.wide {
    width: 100%;
  }

  img.tall {
    max-height: 500px;
  }

  table {
    max-width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  thead {
    font-weight: bold;
  }

  th, td{
    text-align: left;
    padding: 8px;
  }

  tbody > tr:nth-child(odd) {
    background-color: #f5f5f5;
  }

  tr {
    border-bottom: 1px solid #ddd;
  }

  .text-danger {
    color: #a94442;
  }

  .text-success {
    color: #3c763d;
  }

  .text-center {
    text-align: center;
  }

</style>

* Table of Contents
{:toc}

There is a multitude of different screen sizes across phones, "phablets", 
tablets, desktops, game consoles, TVs, even wearables.  Screen sizes will always 
be changing, so it's important that your site can adapt to any screen size, 
today or in the future.

<video autoplay loop controls>
  <source src="videos/resize.mp4">
</video>

Responsive web design, originally defined by [Ethan Marcotte in A List 
Apart](http://alistapart.com/article/responsive-web-design/) responds to the 
needs of the users and the devices they're using.  The layout changes based on 
the size and capabilities of the device.  For example, on a phone, users would 
see content shown in a single column view; a tablet might show the same content 
in two columns.

## Set the viewport

{% include modules/takeaway.liquid  title="Key Takeaways" type="learning" list=page.key-takeaways.set-viewport %}

Pages optimized for a variety of devices must include a meta viewport element in 
the head of the document.  A meta viewport tag gives the browser instructions on 
how to control the page's dimensions and scaling.

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

In order to attempt to provide the best experience, mobile browsers will render 
the page at a desktop screen width (usually about 960px), and then try to make 
the content look better by increasing font sizes and scaling the content to fit 
the screen.  For users, this means that font sizes may appear inconsistently and 
they have to double-tap or pinch-zoom in order to be able to see and interact 
with the content.

Using the meta viewport value `width=device-width` instructs the page to match 
the screen's width in device independent pixels. This allows the page to reflow 
content to match different screen sizes, whether rendered on a small mobile 
phone or a large desktop monitor.

<figure>
  <img src="imgs/sxs-vp.png" class="wide" alt="Side by side view of a page without a viewport set and one with the viewport set." />
</figure>

[View page without a viewport](vp-no.html)

[View page with a viewport](vp.html)

Some browsers will keep the page's width constant when rotating to landscape 
mode, and zoom rather than reflow to fill the screen. Adding the attribute 
`initial-scale=1` instructs browsers to establish a 1:1 relationship between CSS 
pixels and device independent pixels regardless of device orientation, and 
allows the page to take advantage of the full landscape width.

{% include modules/highlight.liquid character="!" position="right" title="Remember" type="remember" list=page.remember.use-commas %}

### Ensure an accessible viewport

In addition to setting an `initial-scale`, you can also set the `minimum-scale`, 
`maximum-scale` and `user-scalable` attributes on the viewport.  When set, these 
can disable the user's ability to zoom the viewport, potentially causing 
accessibility issues.

# Size content to the viewport

{% include modules/takeaway.liquid  title="Key Takeaways" type="learning" list=page.key-takeaways.size-content-to-vp %} 

On both desktop and mobile devices, users are used to scrolling websites 
vertically but not horizontally, and forcing the user to scroll horizontally or 
to zoom out in order to see the whole page results in a poor user experience.

When developing a mobile site with a `meta viewport` tag, it's easy to 
accidentally create page content that doesn't quite fit within the specified 
viewport. For example, an image that is displayed at a width wider than the 
viewport can cause the viewport to scroll horizontally. You should adjust this 
content to fit within the width of the viewport, so that the user does not need 
to scroll horizontally.

Since screen dimensions and width in CSS pixels vary widely between devices 
(e.g. between phones and tablets, and even between different phones), content 
should not rely on a particular viewport width to render well.  

Setting large absolute CSS widths for page elements (such as the example below), 
will cause the `div` to be too wide for the viewport on a narrower device (e.g. 
a device with a width of 320 CSS pixels, such as an iPhone). Instead, consider 
using relative width values, such as `width: 100%`.  Similarly, beware of using 
large absolute positioning values that may cause the element to fall outside the 
viewport on small screens.

<figure>
  <img src="imgs/sxs-vp-fixed.png" class="wide" alt="Side by side view of a page with a fixed with element and an element at 100% width." />
</figure>

## Use CSS Media Queries For Responsiveness 

{% include modules/takeaway.liquid title="Key Takeaways" type="learning" list=page.key-takeaways.media-queries %}

Media queries are simple filters that can be applied to CSS styles.  They make 
it easy to change styles based on the characteristics of the device rendering 
the content, including the display type, width, height, orientation and even 
resolution.  For example, you could place all styles necessary for printing 
inside a print media query:

    <link rel="stylesheet" type="text/css" href="print.css" media="print" />

In addition to using the `media` attribute in the stylesheet link, there are two 
other ways to apply media queries that can be embedded in a CSS file: `@media` 
and `@import`.  For performance reasons, either of the first two methods are 
recommended over the `@import` syntax.

    @media print {
      // print style sheets go here
    }

    @import url(print.css) print;

The logic that applies to media queries is not mutually exclusive and any filter 
that meets that criteria the resulting CSS block will be applied using the 
standard rules of precedence in CSS.

### Apply media queries based on viewport size

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


<table>
  <thead>
    <tr>
      <th>attribute</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td><code>min-width</code></td>
    <td>Rules applied for any browser width over the value defined in the query.</td>
    </tr>
    <tr>
    <td><code>max-width</code></td>
    <td>Rules applied for any browser width under the value defined in the query.</td>
    </tr>
    <tr>
    <td><code>min-height</code></td>
    <td>Rules applied for any browser height over the value defined in the query.</td>
    </tr>
    <tr>
    <td><code>max-height</code></td>
    <td>Rules applied for any browser height under the value defined in the query.</td>
    </tr>
    <tr>
    <td><code>orientation=portrait</code></td>
    <td>Rules applied for any browser where the height is greater than or equal to the width.</td>
    </tr>
    <tr>
    <td><code>orientation=landscape</code></td>
    <td>Rules for any browser where the width is greater than the height.</td>
    </tr>
  </tbody>
</table>

Let's take a look an example:

<figure>
  <img src="imgs/mq.png" class="wide" alt="Preview of a page using media queries to change properties as it is resized.">
</figure>

{% include_code _code/media-queries.html mqueries %}

* When the browser is between <b>0px</b> and <b>640px</b> wide, `max-640px.css` will be applied.
* When the browser is between <b>500px</b> and <b>600px</b> wide, styles within the `@media` will be applied.
* When the browser is <b>640px or wider</b>, `min-640px.css` will be applied.
* When the browser <b>width is greater than the height</b>, `landscape.css` will be applied.
* When the browser <b>height is greater than the width</b>, `portrait.css` will be applied.


### A note on `min-``device-width`

In addition to `*-width`, it is also possible to create queries based on 
`*-device-width`; the difference is subtle but very important.  `min-width` is 
based on the size of the browser window, where as `min-device-width` is based on 
the size of the screen.

On a mobile device, this really doesn't matter that much as in most cases the 
user can't resize the window, but on a desktop, users can control the size of 
their windows and will expect the content to adapt naturally.  Therefore, you 
should avoid using `*-device-width`, since the page won't respond when the 
desktop browser window is resized.

### Use relative units

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

<div class="clear">
  <div class="g--half">
    <h2 class="text-danger text-center">NO</h2>
    <pre><code>div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}</code></pre>
  </div>

  <div class="g--half g--last">
    <h2 class="text-success text-center">YES</h2>
    <pre><code>div.fullWidth {
  width: 100%;
}</code></pre>
  </div>
</div>

## How to choose breakpoints

{% include modules/takeaway.liquid  title="Key Takeaways" type="learning" list=page.key-takeaways.choose-breakpoints %}

While it may be helpful to think about defining breakpoints based on device 
classes, use caution.  Defining breakpoints based on specific devices, products, 
brand names or operating systems, that are in use today will result in a 
maintenance nightmare. Instead, the content itself should determine how the 
layout adjusts to its container.  

### Pick major breakpoints by starting small, then working up

Design the content to fit on a small screen size first, then expand the screen 
until a breakpoint becomes necessary.  This will allow you to optimize 
breakpoints based on content and maintain the fewest number of breakpoints 
possible.

Let's work through the example we saw at the beginning, the weather forecast.  
The first step is to make the forecast look good on a small screen.

<figure>
  <img src="imgs/weather-1.png" class="tall" alt="Preview of the weather forecast displayed on a small screen." />
</figure>

[View full sample](weather-1.html)

Next, resize the browser until there is too much white space between the 
elements and the forecast simply doesn't look as good.  The decision is somewhat 
subjective, but above 600px is certainly too wide.

<figure>
  <img src="imgs/weather-2.png" class="wide" alt="Preview of the weather forecast as the page gets wider." />
</figure>

To insert a breakpoint at 600px, create two new stylesheets, one to use when the 
browser is 600px and below, and one for when it is wider than 600px.

{% include_code _code/weather-2.html mqweather2 %}

Finally, refactor the CSS.  In this example, we've placed the common styles such 
as fonts, icons, basic positioning, colors in `weather.css`.  Specific layouts 
for the small screen are then placed in `weather-small.css` and large screen 
styles are placed in `weather-large.css`.

<figure>
  <img src="imgs/weather-3.png" class="wide" alt="Preview of the weather forecast designed for a wider screen." />
</figure>

[View full sample](weather-2.html)

### Pick minor breakpoints when necessary

In addition to choosing major breakpoints when layout changes significantly, it 
is also helpful to adjust for minor changes.  For example between major 
breakpoints, it may be helpful to adjust the margins or padding on an element, 
or increase the font size to make it feel more natural in the layout.

Let's start by optimizing the small screen layout.  In this case, let's boost 
the font when the viewport width is greater than 360px.  Second, when there is 
enough space, we can separate the high and low temperature so they're on the 
same line, instead of on top of each other.  And let's also make the weather 
icons a bit larger.

{% include_code _code/weather-small.css mqsmallbpsm css %}

<figure>
  <img src="imgs/weather-4.png" class="wide" alt="Before and after view of the page after minor breaks were added for small screens." />
</figure>

Similarly, for the large screens, it's best to limit to maximum width of the 
forecast panel so it doesn't consume the whole screen width.

{% include_code _code/weather-large.css mqsmallbplg css %}

[View finished sample](weather.html)

### Optimize text for reading

Classic readability theory suggests that an ideal column should contain 70 to 80 
characters per line (about  8 to 10 words in English), thus each time the width 
of a text block grows past about 10 words, a breakpoint should be considered.  

<figure>
  <img src="imgs/reading.png" class="wide" alt="Preview of a page designed for optimum reading experiences." />
</figure>

Let's take a deeper look at the above blog post example.  On smaller screens, 
the Roboto font at 1em works perfectly giving 10 words per line, but larger 
screens will require a breakpoint. In this case, if the browser width is greater 
than 575px, the ideal content width is 550px.

{% include_code _code/reading.html mqreading css %}

### Never completely hide content

Be careful when choosing what content to hide or show depending on screen size.  
Don't simply hide content just because you can't fit it on screen.  Screen size 
is not a definitive indication of what a user may want.  For example, 
eliminating the pollen count from the weather forecast could be a serious issue 
for spring time allergy sufferers who need the information to determine if they 
can go outside or not.

{% endwrap %}