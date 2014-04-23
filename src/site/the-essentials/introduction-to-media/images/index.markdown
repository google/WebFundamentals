---
layout: article
title: "Images"
description: "Images were the first media types used on the web and are an integral part of every single page yet they need to be created and managed correctly to ensure that you are not driving users away."
rel: 
  gplusauthor: https://plus.google.com/+SamDutton
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 2
collection: introduction-to-media
---

{% wrap content%}

* Table of Contents
{:toc}

The web started life as a text-only medium, but [the ability to embed
images](http://www.internethistorypodcast.com/2014/04/on-the-20th-anniversary-an-oral-history-of-netscapes-founding/)
was the innovation that truly made it take off.

Now we need to think again about how we use images, given the increasing variety
of devices and contexts for consuming web content.

In this article we describe a range of techniques to adapt and respond to
viewport sizes and usage scenarios: how to deal with both small and large
devices with varying 'pixel density', and how to provide the best experience in
the face of variable connectivity.

## How can I include images in web pages?

{% class key-takeaway %}

* Consider &lt;img&gt; alternatives: background images, sprites, Unicode symbols, icon
  fonts, data URIs, the canvas element or inline SVGs.
* If possible avoid effects such as rounded corners, shadows and gradients &ndash; or
  use CSS, not images.
* To improve accessibility, add an alt attribute to every img elements.

{% endclass %}

There are many ways to embed images in a web page, each with advantages and
disadvantages.

### Making the most of &lt;img&gt;

The img element is powerful &ndash; it downloads, decodes and renders content &ndash; and
modern browsers support a range of image formats.

Two golden rules:

* In general, as described Sizing images, avoid hardcoding width and height
  attributes. Use CSS instead.
* Give every img element an alt attribute. These are not displayed on mobile
  platforms but still available to assistive technologies. Add alt='' for images
  that do not convey information, such as text decorations and bullet points:
  [this Sitepoint
  article](http://www.sitepoint.com/the-hidden-nuggets-of-wcag2-when-not-to-use-alt-attributes/)
  has more information.

It's straightforward to create images and set their properties in JavaScript:

{% include_code _code/imageJavaScript.html code javascript %}
{% link_sample _code/imageJavaScript.html %}Try it{% endlink_sample %}

However, always consider the [critical rendering
path](https://docs.google.com/presentation/d/1IRHyU7_crIiCjl0Gvue0WY3eY_eYvFQvSfwQouW9368/present#slide=id.p19):
do not let dynamic page building get in the way of fast loading. Plain old `&lt;img
src='foo.jpg' /&gt;` doesn't in itself respond to context in terms of size and
content, but throughout this article we describe ways to get around that without resorting to JavaScript.

{% class note %}
Beware that the `src` for an image element will be downloaded even if the image
CSS `display` property is set to `none`, or `visibility` is set to `hidden`.
{% endclass %}

### Use CSS instead of images for shadows, gradients and rounded corners

[CSS gradients](http://css-tricks.com/examples/CSS3Gradient) are supported by
[all modern browsers](http://caniuse.com/css-gradients):

{% include_code _code/gradient.html code css %}
{% link_sample _code/gradient.html %}

![CSS gradient example](images/gradient.jpg)

Try it
{% endlink_sample %}

[Likewise](http://caniuse.com/css-boxshadow) for [box
shadows](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow):

{% include_code _code/boxShadow.html code css %}

![CSS box shadow example](images/boxShadow.jpg)

{% link_sample _code/boxShadow.html %}
Try it
{% endlink_sample %}

...and [rounded corners](http://caniuse.com/border-radius), aka border-radius:

{% include_code _code/borderRadius.html circle css%}

![CSS border radius example: circle shape](images/borderRadiusCircle.png)

{% include_code _code/borderRadius.html ellipse css %}

![CSS border radius example: ellipse shape](images/borderRadiusEllipse.png)

{% include_code _code/borderRadius.html lozenge css %}

![CSS border radius example: lozenge shape](images/borderRadiusLozenge.png)

{% link_sample _code/borderRadius.html %}
Try it
{% endlink_sample %}

However, all these techniques incur [a processing and rendering penalty
](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/),
which can be particularly significant on mobile.

So the moral is:

* If you must, use CSS rather than element shadow/corner hacks background
  gradient images
* Wherever possible, avoid gradients, shadows and rounded corners.

### How to use background images

CSS background images have a number of properties that make them useful as a
low-bandwidth technique for creating background patterns and other visual
effects:

{% include_code _code/backgroundGradient.html code css %}

![CSS box shadow example](images/backgroundGradient.jpg)

{% link_sample _code/backgroundGradient.html %}
Try it
{% endlink_sample %}

Background images repeat horizontally and vertically by default, but you can
adjust that with the `repeat-x` and `repeat-y` properties. It's even possible to
have multiple background images:

{% include_code _code/backgroundMultiple.html code css %}

![CSS box shadow example](images/backgroundMultiple.png)

{% link_sample _code/backgroundMultiple.html %}
Try it
{% endlink_sample %}


Media queries can also be used with background images.

The following example shows how to display alternative images depending on the
viewport size:

{% include_code _code/imageAlternative.html code css %}

{% link_sample _code/imageAlternative.html %}
Try it
{% endlink_sample %}

Background images can also be used for conditional display of images:

{% include_code _code/imageConditional.html code css %}

{% link_sample _code/imageConditional.html %}
Try it
{% endlink_sample %}

Open the example with your browser window, with the browsers dev tools open, with width less than 500px. Notice that the image is not downloaded.

Images can also be added by using the CSS `:before` and `:after` pseudo-classes &ndash; a [handy technique](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) for decorating elements.

{% include_code _code/cssBeforeAfter.html code css %}

{% link_sample _code/cssBeforeAfter.html %}
Try it
{% endlink_sample %}


CSS can also be used for stylish [drop cap
effects](http://line25.com/tutorials/how-to-create-a-stylish-drop-cap-effect-with-css3)
without using images.

### Unicode

Many fonts have good support for the myriad Unicode glyphs. Consider whether you
could use these instead of images. [Unicode character
sets](http://unicode-table.com/en/sets/) include symbols and icons that cover a
huge range of subjects. You may be able to use these instead of images:

<div style="color: #36dce7; font-size: 48px;"> ❤ ♫ ☯ ✂</div>

{% link_sample _code/unicode.html %}
Try it
{% endlink_sample %}


### Icon fonts

It's possible to build a font family made of images rather than letters. Here's
a small sample from [Font Awesome](http://fortawesome.github.io/Font-Awesome/):

&lt;img src="images/image00.png" alt="alt text"/&gt; &lt;!-- TODO: Fix alt text and URL --&gt;

The 'characters' in icon fonts behave just like letters in other fonts, so you
can resize and colour just like you would otherwise.

There are [many techniques](http://css-tricks.com/examples/PseudoIconTest/) for
using icon fonts. The following example is done with screenreaders in mind:

    HTML
    &lt;div data-icon="r"&gt;RSS&lt;/div&gt;

    CSS
    [data-icon]:before {
      content: attr(data-icon);
      font-family: MyIconFont;
      speak: none;
      }

Icon fonts have a [number of
advantages](http://css-tricks.com/examples/IconFont/) to plain old images:

* They're vector graphics that can be infinitely scaled.
* CSS effects such as shadowing, transparency and animations are
  straightforward.
* An entire set of images can be downloaded in one font.

There are [lots of tools for creating icon
fonts](http://stackoverflow.com/questions/10254331/tools-to-create-an-icon-font)
and [lots of pre-built icon
fonts](http://css-tricks.com/flat-icons-icon-fonts/). For improved
accessibility, [make use of ARIA
attributes](http://css-tricks.com/examples/IconFont/).

### Data URIs

Data URIs provide a way to include a file such as an image inline as a [Base64
encoded](https://en.wikipedia.org/wiki/Base64) string using the following
format:

    data:[&lt;mediatype&gt;][;base64],&lt;data&gt;

Drag 'n' drop tool such as
[jpillora.com/base64-encoder](http://jpillora.com/base64-encoder) are available
to convert binary files such as images to Data URIs, or you can use a command
like the following:

    - uuencode -m infile remotename

The Data URI for an image like this:

&lt;img src="images/image01.png" alt="alt text"/&gt; &lt;!-- TODO: Fix alt text and URL --&gt;

...looks like this:

    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAABQCAMAAAAdiXgJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRFSaPX1B0q3aQnAo
    ...

(The full version is around 5000 characters!)

That Data URI string can then be used as an img src like this

    &lt;img src='data:image/png;base64,iVBOR...' alt='Chrome logo'&gt;

….or with CSS as a background image:

        background-image: url(data:image/png;base64,iVBOR…)

Data URIs are [well supported](http://caniuse.com/datauri) on mobile and desktop
browsers.

Using Data URIs for images make sense in some scenarios &ndash; for example, on a site
homepage with no other dependencies, where it's more important to reduce the
number of requests than the total download size. [google.com](http://google.com)
makes extensive use of them: take a look at the Network panel in your browser
dev tools.

Pro

* Reduce the number of requests: images are included inline.

Con:

* Can considerably increase the size of an HTML request
* Add markup and workflow complexity,
* Data URI format is considerably bigger than binary (up to 30%) and therefore
  doesn't reduce total download size.
* Cannot be cached, so must be downloaded for every page they're used on.
* Not supported in IE 6 and 7, incomplete support in IE8.

### How to use sprites

CSS spriting is a technique whereby a number of images are combined in a single
'sprite sheet' image. Individual images can then be used by specifying the
background image for an element (the sprite sheet) plus an offset to display the
correct part:

    HTML
    &lt;ul&gt;
    &lt;li class='sprite forward aria-label='Forward'&gt;&lt;/li&gt;
    &lt;li class='sprite back' aria-label='Back'&gt;&lt;/li&gt;
    &lt;/ul&gt;

    CSS
    .sprite {background-image:url('images/spriteSheet.png')}
    .forward {background-position: 0px 0px}
    .forward:hover {background-position: 0px 10px} /* change colour for hover */
    .back {background-position: 0px 20px}
    .back:hover {background-position: 0px 30px}

Take a look at this example of a sprite sheet [from
google.com](https://www.google.com/images/nav_logo193.png), which includes
multiple icons and logos:

&lt;img src="images/image02.png" alt="alt text"/&gt; &lt;!-- TODO: Fix alt text and URL --&gt;

Spriting has the advantage of reducing the number of downloads and total
download size required to get multiple images, while still enabling cacheing.

## What format should I choose for images?

{% class key-takeaway %}

* Use a raster or vector formats correctly.
* Optimise images with appropriate tools.

{% endclass %}

### Understand image types: raster and vector

There are two ways to create and store images:

**Raster:** photographs and other images which are represented as a grid of
individual dots of colour. Raster images might from a camera or scanner, or be
created with the canvas element.

**Vector:** images such as logos and line art which can be defined as a set of
curves, lines, shapes and fill colours. Vector images can be created with
programs like Adobe Illustrator or Inkscape, or from using a vector format such
as SVG.

SVG makes it possible to include vector graphics in a web page (described below)
.

### Choose the right compression format: GIF, PNG, JPG or WebP

When selecting an image format, you need to consider both the origin of image
(raster or vector) and the individual content of the the image (are there
repeated patterns or areas of single colour, is text included?) No one format
fits all image types.

{% class note %}
Ilya Grigorik has written a definitive and detailed [guide to optimising
efficiency for
images](https://docs.google.com/a/google.com/document/d/1EdBtvM_OIdmZlPhtOq_oLuQ4nGEq1dycOsN8A-KtExY/edit#heading=h.satr4xiyp2fp).
This gives full details about how to select an image format.
{% endclass %}

There are multiple image compression formats, lossy and lossless (whether they
sacrifice some data to reduce file size), with varying support for colour,
transparency and animation:

* **GIF:** up to 256 colors, transparency, animation, lossless. Wide
  support.
* **PNG:** up to 16M colors, optional transparency, lossless. Wide support.
* **JPG:** up to 16M colors, no transparency, lossy. Wide support.
* **JPEG XR:** up to 16M colors, optional transparency, lossy and lossless
  modes, better compression. Currently [only supported by Internet
  Explorer](https://en.wikipedia.org/wiki/JPEG_XR).
* **WebP:** up to 16M colors, optional transparency, lossy and lossless modes,
  animation, better compression. Currently [only supported by Chrome and
  Opera](http://caniuse.com/webp).

As a general rule:

* Use JPEG for photographic images.
* Use PNG (or WebP if you can) for vector art and solid-colour graphics, such as
  logos and line art.
* Use PNG rather than GIF: more colours, better compression.
* If you really have to, use GIF for animation (for example, for
  [icons](https://ssl.gstatic.com/s2/oz/images/notifications/spinner_64_3f4fa14117c586c002a98cd7c5fbb2d3.gif)
  or
  [screencasts](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/xhr-async.gif))
  but consider creating a video instead. There are tools like
  [MediaCrush](https://mediacru.sh/) to convert from animated GIF to video.

### Use vector formats instead of raster images

A vector graphic is defined as a set of curves, lines and fills &ndash; rather than
the colour of each pixel being specified individually.

Vector graphics have two main advantages over raster formats:

* Images can be scaled without loss of quality &ndash; great for high-DPI displays (8k
  TV anyone?) and when working across multiple viewport sizes.
* File size is the same, no matter what the display size.

There are two ways to include vector graphics in a web page:

* As a font, including Unicode symbols and icon fonts (see above).
* As an SVG image.

[SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) (Scalable Vector
Graphics) is a  vector image format [widely
supported](http://www.google.com/url?q=http%3A%2F%2Fcaniuse.com%2Fsvg&sa=D&sntz=1&usg=AFQjCNH8eBrd5JzwQ20BwzYOX6Z_whgVOA)
by web browsers.

An SVG image can be an external file used as the `src` of an &lt;img&gt; like
[this](http://simpl.info/svg/) or used in code form inline like this:

    &lt;svg xmlns="http://www.w3.org/2000/svg" version="1.1"
        viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
        style="width:100%; height:100%; position:absolute; top:0; left:0;
        z-index:-1;"&gt;
        &lt;linearGradient id="gradient"&gt;
            &lt;stop class="begin" offset="0%"/&gt;
            &lt;stop class="end" offset="100%"/&gt;
        &lt;/linearGradient&gt;
        &lt;rect x="0" y="0" width="100" height="100" style="fill:url(#gradient)" /&gt;
        &lt;circle cx="50" cy="50" r="30" style="fill:url(#gradient)" /&gt;
        &lt;/svg&gt;

This code (from [Mozilla Developer
Network](https://developer.mozilla.org/en/docs/SVG_In_HTML_Introduction))
produces this image:

[SVG code as actual image]

This code above adds less than 0.5kB to the page size. A JPG of the same image
saved in low quality is around 14kB in size:

[Example]

SVG fallbacks using HTML, CSS and JavaScript:
[css-tricks.com/svg-fallbacks](http://css-tricks.com/svg-fallbacks)

 &lt;svg width="96" height="96"&gt;
   &lt;image xlink:href="svg.svg" src="svg.png" width="96" height="96"/&gt;
 &lt;/svg&gt;

One of the cool things about SVG is that you can [controls components of an
image with CSS](http://css-tricks.com/using-svg/). SVGs can be shrunk with tools
like [SVG Optimser](http://petercollingridge.appspot.com/svg_optimiser); you can
even shrink them further by [converting to Data
URIs](http://css-tricks.com/using-svg/)!

Using inline SVG has the same advantage as using data URIs: image data can be
included in the page, thereby avoiding download of external files.

Icon fonts also make it possible to include vector graphics within web pages.

### Using the canvas element

The canvas is [implemented in all modern browsers](http://caniuse.com/canvas)
and makes it possible to build images in JavaScript from lines, curves text and
other images.

Here's a canvas element with a line, a circle, text and an image:

&lt;img src="images/image03.png" alt="alt text"/&gt; &lt;!-- TODO: Fix alt text and URL --&gt;

...and here's the code:

    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");

    // fill a rectangle
    context.fillStyle="#333";
    context.fillRect(0, 0, 640, 640);

    // draw lines
    context.strokeStyle="red";
    context.lineWidth = 20;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.moveTo(40, 40);
    context.lineTo(200, 100);
    context.lineTo(40, 140);
    context.stroke();

    // draw a circle
    context.fillStyle="blue";
    context.beginPath();
    context.arc(345, 100, 30, 0, Math.PI*2, true);
    context.closePath();
    context.fill();

    // draw text
    context.fillStyle = "darkGreen";
    context.font = "bold 36px sans-serif";
    context.fillText("It's simpl!", 455, 112);

    // draw image
    var image = new Image();
    image.src = "images/eye.png";
    image.onload = function() {
        context.drawImage(image, 680, 80);
        }

Canvas can be a simple way to build images without external dependencies.

### Optimise images with lossy and lossless tools

Image file size can be considerably reduced by 'post-processing' them after
saving.

There are a number of tools for image compression &ndash; lossy and lossless, online,
GUI, command line. Many of these tools can be incorporated in your workflow.

Addy Osmani has compiled a great list of [tools for image
optimisation](http://addyosmani.com/blog/image-optimization-tools/).

### For animations, try video

Try tools like [MediaCrush](https://mediacru.sh/) to convert from animated GIF
to video

## Maintain download efficiency and image quality

{% class key-takeaway %}

* Avoid images! Use text, Unicode, and CSS effects instead, wherever possible.
* If you can't avoid images, use the least number of pixels. Make images as
  small as possible: ensure saved dimensions are equal (or as close as possible
  to) to display size.
* Use the highest possible compression, lowest possible quality.
* Use the right format: JPG for photos, PNG for line art and logos.
* Reduce the number of downloads: use sprites, inline data URIs, icon fonts, the
  canvas element or inline SVG instead of external image files where
  appropriate.
* Beware of media query gotchas: an image may be downloaded even if not visible.
  See [CSS Media Query for Mobile is Fool's
  Gold](http://blog.cloudfour.com/css-media-query-for-mobile-is-fools-gold/) for
  further details.
* Build image performance into your workflow from the start of every project:
  establish a [performance
  budget](http://timkadlec.com/2013/01/setting-a-performance-budget/) that
  ensures an acceptable page load time across platforms.
* Automate optimisation tasks where possible, using task runners such as
  [grunt](http://gruntjs.com/).

{% endclass %}

    Image optimization boils down to two criteria: optimizing the number of bytes
    used to encode each image pixel, and optimizing the total number of pixels.

    — Ilya Grigorik

## How can I size images?

{% class key-takeaway %}

* Consider cross-device pixel density: the number of CSS pixels versus 'device
  pixels'.
* Avoid absolute measurements that may overflow the viewport.
* Make the most of simple CSS to size images to fit the viewport: max-width:
  100% and calc().
* Respect aspect ratio.

{% endclass %}

The size of an image element can be adjusted from CSS or JavaScript, but the
size of the actual image always remains the same.

You can obtain the 'actual' dimensions of an image with the `naturalWidth` and
`naturalHeight` properties. You can also check this by hovering over an image
with the Chrome Dev Tools:

&lt;img src="images/image04.png" alt="alt text"/&gt; &lt;!-- TODO: Fix alt text and URL --&gt;

Below we look at some techniques for sizing images with CSS.

### What's a pixel?

Different devices use a different number of actual, physical pixels (the
coloured dots on the screen) to represent a single CSS pixel. For example, Apple
Retina displays use two physical pixels to represent one CSS pixel. Overall,
this is a reasonable compromise in order to provide an acceptable display of
existing web content.

### Use relative units where possible

CSS dimensions can be expressed in two ways:

* Absolute units such as `px`, `pt`, `cm` and `in`

Absolute units can be useful &ndash; and it's good to define the size of elements to
speed up rendering &ndash; but beware of overflowing the viewport. Instead, make use
of relative units whenever possible.

The following image has `width: 500px`defined in CSS. Try viewing it on a phone
or with a smaller window on desktop:

[Example]

Here's the same image using `width: 100%`:

[Example]

{% class note %}
In CSS, `width: 100%` means 100% of the width of the containing element, not the
viewport.

Don't forget that browsers add CSS margins to web pages by default &ndash; and default
CSS stylesheets vary between
[Chrome](http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css),
[Firefox](http://mxr.mozilla.org/mozilla-central/source/layout/style/html.css)
and [Internet Explorer](http://www.iecss.com/).

If you want 100% of the viewport height to work in all browsers, you will need
to set the margins, padding and min-height for the body element, and height for
the html element:

    html {
        height: 100%;
        }
    body {
        margin: 0;
        min-height: 100%;
        padding: 0;
        }

(Example here.)
{% endclass %}

A nice technique is to combine `width` and `max-width` &ndash; that way an image can
be given a preferred size but will never overflow its containing element: try
resizing this example, which uses the following code:

img {

    max-width: 100%;
    width: 400px;

}

### Using calc()

CSS `calc()` makes it possible to use a mathematical expression to define
dimensions, potentially mixing absolute and relative units:

    img {
    calc(100% - 20px);
    }

That makes it possible to fit an image inside an element, while coping with
margins, padding and other sizing issues.

CSS calc() [is supported by all modern browsers](http://caniuse.com/calc) (apart
from Opera Mini, and with limited support in Internet Explorer 8) and is
especially useful when fitting an image responsively to the viewport size:

[Live example]

### Maintain aspect ratio

Images have a fixed 'aspect ratio': width divided by height. When an image
element is resized, its aspect ratio must stay the same. Take particular care
when automating build processes and templating not to get incorrect aspect
ratios and 'out by one' errors. (Take a look at sites with the [Image
Checker](https://chrome.google.com/webstore/detail/image-checker/bacnicogfgpigmmenfiplfiofpkocpii)
extension: many popular sites make this mistake.) Stretched or squashed images
look bad, and unneccessarily resizing images to fit an element takes processing
and can slow rendering, causing particular problems on mobile.

{% class note %}
Compressive Images is a technique for adding images to a page, whereby an image
is saved at a lower quality with larger pixel dimensions. The idea behind this
is that image quality can be better for the same file size: see demo
[here](http://filamentgroup.com/lab/rwd_img_compression/).

Because of the memory and decode costs, this technique is **not recommended**.

The total number of pixels is multiplied by four (if images are saved with twice
the width and height) and this can be particularly painful on low-end devices
where both memory and processing is limited.
{% endclass %}

### Correctly size and position background images

CSS enables absolute or relative sizing and positioning:

    background-size: auto;
    background-size: 100%;
    left: 50%;

In a responsive context, relative sizing will often work better.

Bearing in mind that elements may have large dimensions on a large viewport,
make sure to use the correct repeat settings:

    repeat-x: none;

[Examples]

## The right image for the right viewport

{% class key-takeaway %}

* Consider different display sizes as well as different window sizes
* Consider art direction: using techniques to choose different images for
  different display sizes
* Consider orientation

{% endclass %}

Different viewport sizes demand different image sizes &ndash; or possibly different
'crops' of the same image, or even different images.

{% class note %}
We recommend using CSS media queries to respond to viewport sizing.

Please see Responsive Design for more information about using media queries for
responsive images.
{% endclass %}

### Art direction

Displaying the same image smaller or larger is not always enough for responsive
web design.

Art direction techniques enable display of a different crop of an image, or even
a different image, depending on the size of the viewport.

[responsiveimages.org](http://responsiveimages.org) gives two examples of art
direction in action: an image with different crops for different viewport sizes,
and an image of the Nokia Lumia that swaps from portrait to landscape depending
on the viewport size:

[Dog image]

[Nokia video]

### Consider landscape and portrait

[TBD]

## &lt;picture&gt;, srcset… WTF?

{% class key-takeaway %}

* The picture element is being implemented.
* srcset is in Chrome and coming to other browsers.

{% endclass %}

The plain old img element only provides a single `src` for an image, and that
can't respond to the viewport size, pixel density, or other conditions.

The picture element makes it possible to assist the browser in choosing an
appropriate image.

Here's an example from the [picture
](http://picture.responsiveimages.org/)[spec](http://picture.responsiveimages.org/):

    &lt;picture&gt;
        &lt;source media="(min-width: 45em)" srcset="large.jpg"&gt;
        &lt;source media="(min-width: 18em)" srcset="med.jpg"&gt;
        &lt;img src="images/small.jpg" alt="The president giving an award."&gt;
    &lt;/picture&gt;

(See this example in action here.)

The source element allows the developer to list potential image sources in order
of preference: the browser will choose the first source for which a media query
matches.

What if the picture element is not supported? The browser will fall back to the
img element.

As can be seen, the picture element works in conjunction with the `srcset`
attribute.

In the example above the srcset only provides a single image source. The srcset
attribute really comes into its own when used to respond to conditions such as
pixel density &ndash; in this example provding alternative images for devices with a
1:1 device:CSS pixel ratio and a 2:1 ratio (such as Retina displays):

    &lt;picture&gt;
        &lt;source media="(min-width: 45em)" srcset="large.jpg 1x, large-hd.jpg 2x"&gt;
        &lt;source media="(min-width: 18em)" srcset="med.jpg, med-hd.jpg 2x"&gt;
        &lt;img src="images/small.jpg" alt="The president giving an award."&gt;
    &lt;/picture&gt;

(Example here.)

Using the picture element in conjunction with srcset allows the browser to
respond to varying pixel densities, and additionally enables art direction &ndash; the
ability to select a different image, based on media queries.

It's also possible to add a type attribute to each source element, to enable
developers to take advantage of up and coming codecs, and provide preferred
alternatives:

    &lt;picture&gt;
        &lt;source media="(min-width: 45em)" srcset="large.jpg 1x, large-hd.jpg 2x"
     type="image/jpeg"&gt;
        &lt;source media="(min-width: 18em)" srcset="med.jpg, med-hd.jpg 2x"
        type="image/jpeg"&gt;
         &lt;source media="(min-width: 45em)" srcset="large.webp 1x, large-hd.webp
         2x"
     type="image/webp"&gt;
        &lt;source media="(min-width: 18em)" srcset="med.webp, med-hd.webp 2x"
        type="image/webp"&gt;
        &lt;img src="images/small.jpg" alt="The president giving an award."&gt;
    &lt;/picture&gt;

(Example here: try this on a browser such as Chrome that supports WebP, and a
browser that doesn't, such as Safari.)

In this example, the picture element will ignore any sources whose type is not
supported by the browser, then continue on to check the media query and select
the appropriate pixel density.

[Picturefill](https://github.com/scottjehl/picturefill) is a strict polyfill of
the picture element that makes it possible to use the picture element right now
(as in the examples linked to above). Work on implementation is underway.

Why use the picture element instead of other responsive image techniques?

* Intentions are shown in markup explicitly, rather than hidden in external
  code.
* There are no external dependencies, and only required images will be
  downloaded.
* The native picture implementation will take advantage of browser-level
  optimisations such as prefetching.

Clearly, the picture element and srcset combination can become quite verbose. It
may also be hard to manually adjust breakpoints for multiple picture elements in
the same document &ndash; but both these problems can be reduced via workflow
automation and templating..

## Using JavaScript for image handling

{% class key-takeaway %}

* JavaScript can be used to responsively choose images, but consider CSS
  alternatives.
* Use lazy loading where appropriate.

{% endclass %}

### Choosing alternative images with JavaScript and server-side scripting

There are a number of JavaScript techniques for ascertaining the viewport size
and requesting images accordingly &ndash; possibly in combination with server-side
scripting. As well as adding complexity, these techniques can preclude browser
optimisations such as image prefetching.

We won't go into further detail here, but recommend CSS Media Query alternatives
before resorting to JavaScript and/or server-side alternatives.

### Consider lazy loading

Standalone [JavaScript](http://www.jqueryrain.com/demo/jquery-lazy-load/) and
plugins for jQuery and other libraries make it possible to load images only as
they are appear in the viewport. There is also a [PageSpeed
Module](https://developers.google.com/speed/pagespeed/module/filter-lazyload-images)
to do the same.

Lazy loading can enable techniques such as 'infinite scrolling' (as used on
sites such as Tumblr) and can significantly speed up loading on long pages that
include numerous images. (Be aware however that infinite scrolling pages need to
be made [search
friendly](http://googlewebmastercentral.blogspot.com/2014/02/infinite-scroll-search-friendly.html)
and have other disadvantages &ndash; not least, that the page has no 'bottom'.)

## Accessibility

{% class key-takeaway %}

* Provide alternative content to ensure your content is accessible.
* Use alt attributes on img elements: these are not displayed on mobile but
  still available to assistive technologies.
* Add alt='' for images that do not convey information, such as text decorations
  and bullet points: [this Sitepoint
  article](http://www.sitepoint.com/the-hidden-nuggets-of-wcag2-when-not-to-use-alt-attributes/)
  has more information.
* Use ARIA attributes.

{% endclass %}

## More information
### The image element

[MDN reference
article](https://developer.mozilla.org/en/docs/Web/API/HTMLImageElement)

### High DPI techniques

[High DPI Images for Variable Pixel
Densities](http://www.html5rocks.com/en/mobile/high-dpi/#toc-calculating-dpr)
[Compressive Images](http://filamentgroup.com/lab/rwd_img_compression/)

### SVG

[Splash Vector Graphics on your Responsive
Site](http://www.html5rocks.com/en/tutorials/svg/mobile_fundamentals/): make the
most of SVG and SVG animations
[Raphaël](http://raphaeljs.com/): simple SVG creation and animation

### Icon fonts

[Icon fonts are awesome](https://css-tricks.com/examples/IconFont/)
[The big list of flat icons and icon
fonts](http://css-tricks.com/flat-icons-icon-fonts/)
[HTML for Icon Font Usage](http://css-tricks.com/html-for-icon-font-usage/): how
to use and build icon fonts, with accessibility considerations
[5 Use Cases for Icon
Fonts](http://css-tricks.com/five-use-cases-for-icon-fonts/): amazing techniques
and tricks
[Creating Icon Fonts for the
Web](http://www.lynda.com/Glyphs-App-tutorials/Creating-Icon-Fonts-Web/157228-2.html?utm_source=google&utm_medium=cpc&utm_campaign=Search-Dsg-Icon%2BFonts-XCT&utm_content=43168190466&utm_term=how%20to%20use%20icon%20fonts):
online course

### Data URIs

Data URI generators: [dopiaza](http://dopiaza.org/tools/datauri/index.php),
[DataURL.net](http://dataurl.net/#dataurlmaker)
[Convert CSS images to Data URIs](http://dataurl.net/#cssoptimizer)

### SVG

[Using SVG](http://css-tricks.com/using-svg/)
[SVG Optimiser](http://petercollingridge.appspot.com/svg_optimiser)
[Iconic](https://useiconic.com/tour/): comprehensive set of SVG icons

### Image usage and testing

[HTTP Archive stats](http://httparchive.org/interesting.php#bytesperpage)
[WebPageTest](http://www.webpagetest.org/): website performance testing
[Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/):
page speed testing, with cross-platform UI tests and advice

### Tools

[ImageMagick](http://www.imagemagick.org/script/index.php): convert, edit or
build  images from the command line or programmatically
[Tools for image
optimisation](http://addyosmani.com/blog/image-optimization-tools/), by Addy
Osmani (including a number of grunt tasks
[jpgegcrush](http://akuvian.org/src/jpgcrush.tar.gz)
[ImageOptim](http://imageoptim.com/): lossless image optimizer for JPEG, PNG and
animated GIF.
[OptiPNG](http://optipng.sourceforge.net/): lossless PNG optimizer.
[pngquant](http://pngquant.org/): lossy PNG quantisation (i.e. combining similar
colours).
[tinypng.com](https://tinypng.com/) and
[Kraken.io](https://kraken.io/web-interface) provide online interfaces to
OptiPNG + pngquant2. There are also several GUIs including
[Pngyu](http://nukesaq88.github.io/Pngyu/).
[CSS sprite tool
suggestions](http://stackoverflow.com/questions/527336/tools-to-make-css-sprites):
we recommend [SpriteMe](http://www.stevesouders.com/blog/2009/09/14/spriteme/)
(by Steve Souders) and [SpritePad](http://spritepad.wearekiss.com/).
[Image
Checker](https://chrome.google.com/webstore/detail/image-checker/bacnicogfgpigmmenfiplfiofpkocpii)
extension: checks for resized images and aspect ratio problems.

### Responsive Web Design

[Responsive Web
Design](http://www.alistapart.com/articles/responsive-web-design/), by Ethan
Marcotte
[This is Responsive](http://bradfrost.github.com/this-is-responsive/): patterns,
resources and news collated by Brad Frost
[The Dao of Web Design](http://www.alistapart.com/articles/dao/): influential
article by John Allsopp from April 2000: 'Now is the time for the medium of the
web to outgrow its origins in the printed page.'
[A List Apart articles on responsive
design](http://www.alistapart.com/articles/)
[Fluid Images](http://unstoppablerobotninja.com/entry/fluid-images)
[responsiveimages.org](http://responsiveimages.org/)
[Real World RWD Performance &ndash; Take
2](http://www.guypo.com/uncategorized/real-world-rwd-performance-take-2/):
almost all responsive sites download all content

### The picture element

[Picture element spec draft](http://geekhood.net/picture-element.html)
[Picturefill](https://github.com/scottjehl/picturefill): enables markup that
mimics the picture element, from developer Scott Jehl

### Accessibility

Multi-device accessibility:
[video](https://www.youtube.com/watch?v=E0ojKLzXoZ4), [slide
deck](https://docs.google.com/presentation/d/1xKlQZRHyLPXvrTdGkGIumc24bT4_kxRmdqIC_b7fngo/pub?start=false&loop=false&delayms=3000#slide=id.g17271919f_36)

{% endwrap %}
