---
layout: article
title: "Images in Markup"
description: "The `img` element is powerful – it downloads, decodes and renders content – and
modern browsers support a range of image formats."
introduction: "The `img` element is powerful – it downloads, decodes and renders content – and
modern browsers support a range of image formats.  Including images that work
across devices is no different than for desktop, and only requires a few minor
tweaks to create a good experience."
rel:
  gplusauthor: https://plus.google.com/+PeteLePage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: images
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

<style>
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

## Enhance `img`'s with `srcset` for high DPI devices

The `srcset` attribute enhances the behavior of the `img` element, making it
easy to provide multiple image files for different device characteristics.  In
the same way that the [`image-set` CSS function](#use-image-set-to-provide-high-res-images)
works, `srcset` allows the browser to choose the best image depending on the
characteristics of the device, for example using a 2x image on a 2x display,
or a 1x image on a 2x device when on a limited bandwidth network.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
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

## Other image techniques

### Compressive images

The [compressive image
technique](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)
serves a highly compressed 2x image to all devices, no matter the actual
capabilities of the device.  Depending on the type of image and level of
compression, image quality may not appear to change, but the file size drops
significantly.

{% link_sample _code/compressive.html %}
See example
{% endlink_sample %}

{% include modules/remember.liquid title="Important" list=page.remember.compressive %}

### JavaScript image replacement

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

{% include modules/nextarticle.liquid %}

{% endwrap %}
