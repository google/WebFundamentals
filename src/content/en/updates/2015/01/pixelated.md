project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Pixelation of the nation. Now in Chrome 41

{# wf_updated_on: 2015-01-17 #}
{# wf_published_on: 2015-01-17 #}
{# wf_tags: news,css,pixelated,image-rendering #}

# image-rendering: pixelated {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



As web developers we play with images all the time and in most cases browsers are great
at scaling images to fit the boundaries of our site designs whilst keeping the images pretty. But what happens when you want to control how the browser scales the images on your page?

Chrome 41 (Beta in January 2015) introduces a new CSS property [`image-rendering: pixelated`](https://developer.mozilla.org/en/docs/Web/CSS/image-rendering) ([Spec](http://dev.w3.org/csswg/css-images-3/#the-image-rendering)) that gives you a little more control over how the browser renders a scaled up image.

The CSS property `image-rendering` and the value `pixelated` are interesting because they turn off the
browser's standard smooth scaling (normally bi-linear interpolation) and replaces it with another
scaling algorithm (nearest neighbor in most cases) when resizing the images.

Imagine you had an image that was 2×2 pixels and you scaled it up to 100×100 pixels, the browser
would render it in a way that didn't make it look blocky. Something like:

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-19-pixelated/smooth.png" alt="smooth rendering" />
</p>

There are many cases where you would not want this smoothing behavior and instead use
a method that preserves a more accurate representation of the image.

To get this effect, you simply apply `image-rendering: pixelated;` to your image as follows.

    <img
         style="image-rendering: pixelated;"
         width="100" height="100"
         src="data:image/png;base64,iVBORw0KGgoAAAA....Ik2kAAAAASUVORK5CYII=">

<p style="text-align: center;">
  <img src="/web/updates/images/2015-01-19-pixelated/pixelated.png" alt="pixelated rendering" />
</p>

[Try the Demo](https://googlechrome.github.io/samples/image-rendering-pixelated/index.html).  As you can
see the application of the property has a significant effect on how the image is rendered.

This property can be applied in many places:

*  `<img>` elements
*  `<canvas style="image-rendering: pixelated">` elements
*  Any element with a `background-image` property

## I still don't get it.  Where should I use this?

If you are just showing photos on your site, then you probably don't want this.

A great use-case is games, you frequently have to scale up the canvas to make it fit the screen size correctly. Prior to this CSS property the browser would interpolate the canvas in such a way that it would look blurry (see below [sic]).


<blockquote class="twitter-tweet" data-partner="tweetdeck" data-align="center"><p>Oh wow, <a href="https://twitter.com/ChromiumDev">@ChromiumDev</a> Canary finally landed `image-resizing: pixelated` for &lt;canvas&gt;! Before &amp; after: <a href="http://t.co/QcPDtHu3s5">pic.twitter.com/QcPDtHu3s5</a></p>&mdash; Thomas Boyt (@thomasABoyt) <a href="https://twitter.com/thomasABoyt/status/555990806272946176">January 16, 2015</a></blockquote>


If you are building an airline ticketing tool, or an app that displays [QR codes](https://twitter.com/andreasbovens/status/556696829421953024) then frequently the user will want it to be full screen so that it is easier to scan, so controlling the image-rendering is critical.

<figure style="text-align: center;">
<img src="https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=H&chl=https://goo.gl/nWBBg"
    width="280" height="280">
    <figcaption>Default Smoothing</figcaption>
</figure>

<figure style="text-align: center;">
<img src="https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=H&chl=https://goo.gl/nWBBg"
    style="image-rendering: pixelated;"
    width="280" height="280">
    <figcaption>Preserving pixelation (only visible in Chrome M41+ or Opera 26+)</figcaption>
</figure>

If you are interested in seeing the implementation, checkout [Issue 317991](https://code.google.com/p/chromium/issues/detail?id=317991) (it is left open for the implementation of the crisp-edges value. Star the issue to track the implementation).


{% include "comment-widget.html" %}
