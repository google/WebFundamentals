---
layout: shared/plain
title: "Responsive Images"
description: "TODO"
introduction: "TODO"
snippet: "TODO"
id: responsive-media-images
collection: design-and-ui
article:
  written_on: 2014-04-30
  updated_on: 2014-09-30
authors:
  - petelepage
priority: 0
key-takeaways:
  img-in-markup:
    - "Use relative sizes for images to prevent them from accidentally overflowing the container."
    - "Use the <code>picture</code> element when you want to specify different images depending on device characteristics (a.k.a. art direction)."
    - "Use <code>srcset</code> and the <code>x</code> descriptor in the <code>img</code> element to give hints to the browser about the best image to use when choosing from different densities."
  use-right-image:
    - "Use the best image for the characteristics of the display, consider screen size, device resolution and page layout."
    - "Change the <code>background-image</code> property in CSS for high DPI displays using media queries with <code>min-resolution</code> and <code>-webkit-min-device-pixel-ratio</code>."
    - "Use srcset to provide high resolution images in addition to the 1x image in markup."
    - "Consider the performance costs when using JavaScript image replacement techniques or when serving highly compressed high resolution images to lower resolution devices."
  avoid-images:
    - "Avoid images whenever possible, instead, leverage browser capabilities for shadows, gradients, rounded corners and more."
  optimize-images:
    - "Don't just randomly choose an image format, understand the different formats available, and use the format best suited."
    - "Include image optimization and compression tools into your workflow to reduce file sizes."
    - "Reduce the number of http requests by placing frequently used images into image sprites."
    - "Consider loading images only after they’ve scrolled into view to improve the initial page load time and reduce the initial page weight."
related:
  optimize:
  -
      title: "Image optimization"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "Optimizing Content Efficiency"
        href: fundamentals/performance/optimizing-content-efficiency/
remember:
  picture-support:
    - "The <code>picture</code> element is beginning to land in browsers. Although it's not available in every browser yet, we recommend its use because of the strong backward compatibility and potential use of the <a href='http://picturefill.responsiveimages.org/'>Picturefill polyfill</a>. See the <a href='http://responsiveimages.org/#implementation'> ResponsiveImages.org</a> site for further details."
  compressive:
    - "Use caution with the compressive technique because of the increased memory and decoding costs it requires. Resizing large images to fit on smaller screens is expensive and can be particularly painful on low-end devices where both memory and processing is limited."
---

<div class="intro">
  A picture is worth 1000 words, and images play an integral part of every page.
  But they also often account for most of the downloaded bytes.  With responsive
  web design not only can our layouts change based on device characteristics,
  but images as well.
</div>

{% include shared/toc.liquid %}

## Types of responsive images
TODO

### Responsive Images

Responsive web design means that not only can our layouts change based on device
characteristics, but content as well.  For example, on high resolution (2x)
displays, high resolution graphics are needed to ensure sharpness.  An image
that  is 50% width may work just fine when the browser is 800px wide, but will
use too much real estate on a narrow phone, and still comes at the same
bandwidth overhead when scaled down to fit on a smaller screen.

### Art direction

<img class="center" src="img/art-direction.png" alt="Art direction example"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Other times the image may need to be changed more drastically: changing the
proportions, cropping and even replacing the entire image.  In this case,
changing the image is usually referred to as art direction.  See
[responsiveimages.org/demos/](http://responsiveimages.org/demos/) for more
examples.

## Images in markup

The <code>img</code> element is powerful – it downloads, decodes and renders 
content – and modern browsers support a range of image  formats.  Including 
images that work across devices is no different than for desktop, and only 
requires a few minor tweaks to create a good experience.

### Use relative sizes for images

Remember to use relative units when specifying widths for images to prevent them
from accidentally overflowing the viewport.  For example, `width: 50%;`, will
cause the image width to be 50% of the containing element (not the viewport or
actual pixel size).

Because CSS allows content to overflow its container, it may be necessary use
max-width: 100% to prevent images and other content from overflowing.  For
example:

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

Be sure to provide meaningful descriptions via the `alt` attribute on `img`
elements; these help make your site more accessible by providing context to
screen readers and other assistive technologies.

### Enhance `img`'s with `srcset` for high DPI devices

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    The <code>srcset</code> attribute enhances the behavior of the 
    <code>img</code> element, making it easy to provide multiple image files 
    for different device characteristics. Similar to the <code>image-set</code>
    <a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS function</a>
    native to CSS, <code>srcset</code> allows the browser to choose the best 
    image depending on the characteristics of the device, for example using 
    a 2x image on a 2x display, and potentially in the future, a 1x image on 
    a 2x device when on a limited bandwidth network.
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

On browsers that don't support `srcset`, the browser simply uses the default
image file specified by the `src` attribute.  This is why it is important to
always include a 1x image that can be displayed on any device, regardless of
capabilities.  When `srcset` is supported, the  comma-separated list of
image/conditions is parsed prior to making any requests, and only the most
appropriate image is downloaded and displayed.

While the conditions can include everything from pixel density to width and 
height, only pixel density is well supported today.  To balance current
behavior with future features, stick with simply providing the 2x image in
the attribute.

### Art direction in responsive images with `picture`

Changing images based on device characteristics, also known as art
direction can be accomplished using the picture element.  The 
<code>picture</code> element defines a declarative solution for 
providing multiple versions of an image based on different 
characteristics, like device size, device resolution, orientation,
and more.

<img class="center" src="img/art-direction.png" alt="Art direction example"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.remember.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    The <code>picture</code> element should be used when an image source 
    exists in multiple densities, or when a responsive design dictates a 
    somewhat different image on some types of screens.  Similar to the 
    <code>video</code> element, multiple <code>source</code> elements can 
    be included, making it possible to specify different image files
    depending on media queries or image format.
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

In the above example, if the browser width is at least 800px, then either
`head.jpg` or `head-2x.jpg` will be used, depending on the device resolution. 
If the browser is between 450px and 800px, then either `head-small.jpg` or 
`head-small-2x.jpg` will be used, again, depending on the device resolution.
For screen widths less than 450px and backwards compatibility where the 
`picture` element isn’t supported, the browser will render the `img` element 
instead, and should always be included.

#### Relative sized images

When the final size of the image isn’t known, it can be difficult to specify 
a density descriptor for the image sources.  This is especially true for
images that span a proportional width of the browser and are fluid, depending
on the size of the browser.

Instead of supplying fixed image sizes and densities, the size of each 
supplied image can be specified by adding a width descriptor along with the
size of the image element, allowing the browser to automatically calculate
the effective pixel density and choose the best image to download.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

The above example renders an image that is half of the viewport width
(`sizes="50vw"`), and depending on the width of the browser and it’s device
pixel ratio, allowing the browser to choose the correct image regardless of
how large the browser window is.  For example, the table below shows which
image the browser would choose:

<table class="table-4">
  <colgroup>
    <col span="1">
    <col span="1">
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="Browser width">Browser width</th>
      <th data-th="Device pixel ratio">Device pixel ratio</th>
      <th data-th="Image used">Image used</th>
      <th data-th="Effective resolution">Effective resolution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2.5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2.67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3.125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1.27x</td>
    </tr>
  </tbody>
</table>


#### Account for breakpoints in responsive images

In many cases, the size or image may change depending on the site’s layout
breakpoints.  For example, on a small screen, you might want the image to
span the full width of the viewport, while on larger screens, it should only
take a small proportion.  

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

The `sizes` attribute in the above example uses several media queries to
specify the size of the image. When the browser width is greater than
600px, the image will be 25% of the viewport width, when it is between 500px
and 600px, the image will be 50% of the viewport width, and below 500px, it
will be full width.


### Make product images expandable

Customers want to see what they're buying.  On retail sites, users expect to be 
able to view high resolution closeups of products to get a better look at 
details, and [study participants](/web/fundamentals/principles/research-study.html) got frustrated if they weren't able to.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="J. Crews website with expandable product image">
  <figcaption>J. Crew's website with expandable product image.</figcaption>
</figure>

A good example of tappable, expandable images is provided by the J. Crew site.  
An disappearing overlay indicates that an image is tappable, providing a zoomed 
in image with fine detail visible.


### Other image techniques

#### Compressive images

The [compressive image
technique](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)
serves a highly compressed 2x image to all devices, no matter the actual
capabilities of the device.  Depending on the type of image and level of
compression, image quality may not appear to change, but the file size drops
significantly.

{% link_sample _code/compressive.html %}
See example
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.remember.compressive %}

#### JavaScript image replacement

JavaScript image replacement checks the capabilities of the device and "does the
right thing". You can determine device pixel ratio via
`window.devicePixelRatio`, get screen width and height, and even potentially do
some network connection sniffing via `navigator.connection` or issuing a fake
request. Once you've collected all of this information, you can decide which
image to load.

One big drawback to this approach is that using JavaScript means that you will
delay image loading until at least the look-ahead parser has finished. This
means that images won't even start downloading until after the `pageload` event
fires. In addition, the browser will most likely download both the 1x and 2x
images, resulting in increased page weight.

## Images in CSS

The CSS `background` property is a powerful tool for adding complex images to 
elements, making it easy to add multiple images, cause them to repeat, and more.
When combined with media queries, the background property becomes even more 
powerful, enabling conditional image loading based on screen resolution, 
viewport size and more.

### Use media queries for conditional image loading or art direction

Media queries not only affect the page layout, but can also be used to
conditionally load images or to provide art direction depending on the viewport
width.

For example in the sample below, on smaller screens, only `small.png` is
downloaded and applied to the content `div`, while on larger screens,
`background-image: url(body.png)` is applied to the body and `background-image:
url(large.png)` is applied to the content `div`.

{% include_code src=_code/conditional-mq.html snippet=conditional lang=css %}

### Use `image-set` to provide high res images

The `image-set()` function in CSS enhances the behavior `background` property,
making it easy to provide multiple image files for different device
characteristics.  This allows the browser to choose the best image depending on
the characteristics of the device, for example using a 2x image on a 2x display,
or a 1x image on a 2x device when on a limited bandwidth network.

{% highlight css %}
background-image: image-set(
  url(icon1x.jpg) 1x,
  url(icon2x.jpg) 2x
);
{% endhighlight %}

In addition to loading the correct image, the browser will also scale it
accordingly. In other words, the browser assumes that 2x images are twice as
large as 1x images, and so will scale the 2x image down by a factor of 2, so
that the image appears to be the same size on the page.

Support for `image-set()` is still new and is only supported in Chrome and
Safari with the `-webkit` vendor prefix.  Care must also be taken to include a
fallback image for when `image-set()` is not supported, for example:

{% include_code src=_code/image-set.html snippet=imageset lang=css %}

The above will load the appropriate asset in browsers that support image-set,
and fall back to the 1x asset otherwise. The obvious caveat is that while
`image-set()` browser support is low, most browsers will get the 1x asset.

### Use media queries to provide high res images or art direction

Media queries can create rules based on the [device pixel
ratio](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), making it possible
to specify different images for 2x vs 1x displays.

{% highlight css %}
@media (min-resolution: 2dppx),
(-webkit-min-device-pixel-ratio: 2)
{
  /* High dpi styles & resources here */
}
{% endhighlight %}

Chrome, Firefox and Opera all support the standard `(min-resolution: 2dppx)`,
while Safari and Android Browser both require the older vendor prefixed syntax
without the `dppx` unit.  Remember, these styles are only loaded if the device
matches the media query, and you must specify styles for the base case.  This
also provides the benefit of ensuring something will be rendered if the browser
doesn't support resolution specific media queries.

{% include_code src=_code/media-query-dppx.html snippet=mqdppx lang=css %}

You can also use the min-width syntax to display alternative images depending on
the viewport size.  This technique has the advantage that the image is not
downloaded if media query doesn't match.  For example, `bg.png` is only
downloaded and applied to the `body` if the browser width is 500px or greater:

{% highlight css %}
@media (min-width: 500px) {
  body {
    background-image: url(bg.png);
  }
}
{% endhighlight %}

## Use SVG for icons

When adding icons to your page, use SVG icons where possible or in some cases,
unicode characters.

### Replace simple icons with unicode

Many fonts include support for the myriad of unicode glyphs, which can be used
instead of images. Unlike images, unicode fonts scale well, and look good no
matter how small or large they appear on screen.

Beyond the normal character set, unicode may include symbols for number forms
(&#8528;), arrows (&#8592;), math operators (&#8730;), geometric shapes
(&#9733;), control pictures (&#9654;), braille patterns (&#10255;), music
notation (&#9836;), Greek letters (&#937;), even chess pieces (&#9822;).

Including a unicode character is done in the same way named entities are:
`&#XXXX`, where `XXXX` represents the unicode character number. For example:

{% highlight html %}
You're a super &#9733;
{% endhighlight %}

You're a super &#9733;

### Replace complex icons with SVG

For more complex icon requirements, SVG icons are generally lightweight, 
easy to use and can be styled with CSS. SVG have a number of advantages over
raster images:

* They're vector graphics that can be infinitely scaled.
* CSS effects such as color, shadowing, transparency and animations are 
  straightforward.
* SVG images can be inlined right in the document.
* They are semantic.
* Provide better accessibility with the appropriate attributes.

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

### Use icon fonts with caution

Icon fonts are popular, and can be easy to use, but have some drawbacks 
compared to SVG icons.

* They're vector graphics that can be infinitely scaled, but may be 
  anti-aliased resulting in icons that aren’t as sharp as expected.
* Limited styling with CSS.
* Pixel perfect positioning can be difficult, depending on line-height, 
  letter spacing, etc.
* Are not semantic, and can be difficult to use with screen readers or 
  other assistive technology.
* Unless properly scoped, can result in a large file size for only using a 
  small subset of the icons available. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Example of a page that uses FontAwesome for its font icons.">
{% endlink_sample %}

{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

There are hundreds of free and paid icon fonts available including [Font
Awesome](http://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/) and [Glyphicons](http://glyphicons.com/).

Be sure to balance the weight of the additional HTTP request and file size with
the need for the icons. For example, if you only need a handful of icons, it
may be better to use an image or an image sprite.

## Optimize images for performance

Images often account for most of the downloaded bytes and also often occupy a 
significant amount of the visual space on the page. As a result, optimizing 
images can often yield some of the largest byte savings and performance 
improvements for your website: the fewer bytes the browser has to download, 
the less competition there is for client's bandwidth and the faster the browser 
can download and display all the assets.

### Choose the right format

There are two types of images to consider: [vector
images](http://en.wikipedia.org/wiki/Vector_graphics) and [raster
images](http://en.wikipedia.org/wiki/Raster_graphics). For raster images, you
also need to choose the right compression format, for example: `GIF`, `PNG`, `JPG`.

**Raster images**, like photographs and other images which are represented as a
grid of individual dots or pixels. Raster images typically come from a camera or
scanner, or can be created in the browser with the `canvas` element.  As the
image size gets larger, the file size grows as well.  When scaled larger than
their original size, raster images get blurry as the browser needs to guess how
to fill in the missing pixels.

**Vector images**, such as logos and line art are be defined by a set of curves,
lines, shapes and fill colors. Vector images are created with programs like
Adobe Illustrator or Inkscape and saved to a vector format like
[`SVG`](http://css-tricks.com/using-svg/).  Because vector images are built on
simple primitives, they can be scaled without any loss in quality without a
change in file size.

When choosing the right format, it is important to consider both the origin of
the image (raster or vector), and the content (colors, animation, text, etc).
No one format will fit all image types and each has its own strengths and
weaknesses.

Start with these guidelines when choosing the right format:

* Use `JPG` for photographic images.
* Use `SVG` for vector art and solid color graphics such as logos and line art.
  If vector art is unavailable, try WebP or PNG.
* Use `PNG` rather than `GIF` as it allows for more colors and offers better
  compression ratios.
* For longer animations, consider using `<video>` which provide better image
  quality and gives the user control over playback.

### Reduce the file size

Image file size can be considerably reduced by 'post-processing' them after
saving. There are a number of tools for image compression – lossy and lossless,
online, GUI, command line.  Where possible, it's best to try automating image
optimization so that it's a first-class citizen in your workflow.

Several tools are available that perform further, lossless compression on `JPG`
and `PNG` files, with no effect on image quality. For `JPG`, try
[jpegtran](http://jpegclub.org/) or
[jpegoptim](http://freshmeat.net/projects/jpegoptim/) (available on Linux only;
run with the --strip-all option). For `PNG`, try
[OptiPNG](http://optipng.sourceforge.net/) or
[PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

### Use image sprites

CSS spriting is a technique whereby a number of images are combined in a single
'sprite sheet' image. Individual images can then be used by specifying the
background image for an element (the sprite sheet) plus an offset to display the
correct part.

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt="Image sprite sheet used in example">
{% endlink_sample %}

{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

Spriting has the advantage of reducing the number of downloads required to get
multiple images, while still enabling caching.

### Consider lazy loading

Lazy loading can significantly speed up loading on long pages that include many
images below the fold by loading them either as needed or once the primary
content has finished loading and rendering.  In addition to performance
improvements, using lazy loading can create infinite scrolling experiences.

Be careful when creating infinite scrolling pages, because content is loaded as
it becomes visible, search engines may never see that content.  In addition,
users who are looking for information they expect to see in the footer will
never see the footer because new content is always loaded.
