---
layout: article
title: "Images"
description: "A picture is worth 1000 words, and images play an integral part of every page. But they also often account for most of the downloaded bytes.  With Responsive web design not only can our layouts change based on device characteristics, but images as well."
introduction: "A picture is worth 1000 words, and images play an integral part of every page. But they also often account for most of the downloaded bytes.  With responsive web design not only can our layouts change based on device characteristics, but images as well."
rel:
  gplusauthor: https://plus.google.com/+PeteLePage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: introduction-to-media
key-takeaways:
  use-right-image:
    - Use the best image for the characteristics of the display, consider
      screen size, device resolution and page layout.
    - Change the <code>background-image</code> property in CSS for high DPI
      displays using media queries with <code>min-resolution</code> and
      <code>-webkit-min-device-pixel-ratio</code>.
    - Use srcset to provide high resolution images in addition to the 1x
      image in markup.
    - Consider the performance costs when using JavaScript image replacement
      techniques or when serving highly compressed high resolution images to
      lower resolution devices.
  avoid-images:
    - Avoid images whenever possible, instead, leverage browser capabilities,
      use unicode characters in place of images, and replace complex icons
      with icon fonts.
  optimize-images:
    - Don't just randomly choose an image format, understand the different
      formats available, and use the format best suited.
    - Include image optimization and compression tools into your workflow to
      reduce file sizes.
    - Reduce the number of http requests by placing frequently used images
      into image sprites.
    - Consider loading images only after they’ve scrolled into view to
      improve the initial page load time and reduce the initial page weight.
remember:
  compressive:
    - Use caution with the compressive technique because of the increased
      memory and decoding costs it requires.  Resizing large images to fit on
      smaller screens is expensive and can be particularly painful on low-end
      devices where both memory and processing is limited.
related:
  optimize:
    - <a href="../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization">Image optimization</a>
    - <a href="../../performance/optimizing-content-efficiency/">Optimizing content efficiency</a>
---

{% wrap content%}

<style type="text/css">
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}

### Responsive images

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

{% include modules/takeaway.liquid list=page.key-takeaways.use-right-image %}

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

{% include_code _code/conditional-mq.html conditional css %}

### Use image-set to provide high res images

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

{% include_code _code/image-set.html imageset css %}

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

{% include_code _code/media-query-dppx.html mqdppx css %}

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

## Images in markup

The `img` element is powerful – it downloads, decodes and renders content – and
modern browsers support a range of image formats.  Including images that work
across devices is no different than for desktop, and only requires a few minor
tweaks to create a good experience.

Remember to use relative units when specifying widths for images to prevent them
from accidentally overflowing the viewport.  For example, `width: 50%;`, will
cause the image width to be 50% of the containing element (not the viewport or
actual pixel size).

Because CSS allows content to overflow it's container, it may be necessary use
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

The `srcset` attribute enhances the behavior of the `img` element, making it
easy to provide multiple image files for different device characteristics.  In
the same way that the [`image-set` CSS function](#use-image-set-to-provide-high-res-images)
works, `srcset` allows the browser to choose the best image depending on the
characteristics of the device, for example using a 2x image on a 2x display,
or a 1x image on a 2x device when on a limited bandwidth network.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ... />
{% endhighlight %}

On browsers that don't support `srcset`, the browser simply uses the default
image file specified by the `src` attribute.  This is why it is important to
always include a 1x image that can be displayed on any device, regardless of
capabilities.  When `srcset` is supported, the comma-separated list of
image/conditions is parsed and only the most appropriate image is downloaded and
displayed.

While the conditions can include everything from pixel density to viewport width
to viewport height, only pixel density is well supported today.  To balance
current behavior with future features, stick with simply providing the 2x image
in the attribute.

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

{% include modules/highlight.liquid title="Important" type="remember" list=page.remember.compressive %}

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


## Avoid images completely

Sometimes, the best image isn't actually an image at all. Whenever possible, use
the native capabilities of the browser to provide the same or similar
functionality.  Browsers generate visuals that would have previously required
images.   This means that browsers no longer need to download separate image
files and prevents awkwardly scaled images.  Icons can be rendered using unicode
or special icon fonts.

{% include modules/takeaway.liquid list=page.key-takeaways.avoid-images %}

### Place text in markup, instead of embedded in images

Wherever possible, text should be text, and not embedded into images, for
example using images for headlines, or placing contact information like phone
numbers or addresses directly into images.  This prevents people from being able
to copy and paste the information, makes it inaccessible for screen readers, and
isn't responsive.  Instead, place the text in your markup and if necessary use
webfonts to achieve the style you need.

### Use CSS to replace images

<style type="text/css">
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
<p id="noImage">
  Modern browsers can use CSS features to create styles that would previously
  required images.  For examples, complex gradients can be created using the
  <code>background</code> property, shadows can be created using
  <code>box-shadow</code> and rounded corners can be added with the
  <code>border-radius</code> property.
</p>

{% highlight html %}
<style type="text/css">
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Keep in mind that using these techniques does require rendering cycles, which
can be significant on mobile.  If over-used, you'll lose any benefit you may
have gained and may hinder performance.

### Replace simple icons with unicode

Many fonts include support for the myriad of unicode glyphs, which can be used
instead of images.  Unlike images, unicode fonts scale well, and look good no
matter matter how small or large they appear on screen.

Beyond the normal character set, unicode may include symbols for number forms
(&#8528;), arrows (&#8592;), math operators (&#8730;), geometric shapes
(&#9733;), control pictures (&#9654;), braille patterns (&#10255;), music
notation (&#9836;), Greek letters (&#937;), even chess pieces (&#9822;).

Including a unicode character is done in the same way named entities are:
`&#XXXX`, where `XXXX` represents the unicode character number.  For example:

{% highlight html %}
You're a super &#9733;
{% endhighlight %}

You're a super &#9733;

### Replace complex icons with icon fonts

For more complex icon requirements, icon fonts are generally lightweight, easy
to use and can be served in a single HTTP request. Icon fonts have a number of
advantages to images:

* They're vector graphics that can be infinitely scaled.
* CSS effects such as color, shadowing, transparency and animations are
  straightforward.
* An entire set of icons can be downloaded in one font.

{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Example of a page that uses FontAwesome for it's font icons.">
{% endlink_sample %}
{% include_code _code/icon-font.html iconfont html %}

There are hundreds of free and paid icon fonts available including [Font
Awesome](http://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/) and [Glyphicons](http://glyphicons.com/).

Be sure to balance the weight of the additional HTTP request and file size with
the need for the icons.  For example, if you only need a handful of icons, it
may be better to use an image or an image sprite.

## Optimize images for performance

Images often account for most of the downloaded bytes and also often occupy a
significant amount of the visual space on the page. As a result, optimizing
images can often yield some of the largest byte savings and performance
improvements for your website: the fewer bytes the browser has to download, the
less competition there is for client's bandwidth and the faster the browser can
download and display all the assets.

{% include modules/takeaway.liquid list=page.key-takeaways.optimize-images %}

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
No one format will fit all image types and each has it's own strengths and
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
{% include_code _code/image-sprite.html sprite css %}

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

{% include modules/related.liquid list=page.related.optimize %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
