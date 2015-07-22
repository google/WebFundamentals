---
layout: article
title: "Images in Markup"
description: "The `img` element is powerful – it downloads, decodes and renders content – and modern browsers support a range of image formats."
introduction: "The <code>img</code> element is powerful – it downloads, decodes and renders content – and modern browsers support a range of image  formats.  Including images that work across devices is no different than for desktop, and only requires a few minor tweaks to create a good experience."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-09-30
  order: 1
priority: 0
collection: images
key-takeaways:
  img-in-markup:
    - Use relative sizes for images to prevent them from accidentally
      overflowing the container.
    - Use the <code>picture</code> element when you want to specify different
      images depending on device characteristics (a.k.a. art direction).
    - Use <code>srcset</code> and the <code>x</code> descriptor in the 
      <code>img</code> element to give hints to the browser about the best 
      image to use when choosing from different densities.
remember:
  picture-support:
    - The <code>picture</code> element is beginning to land in browsers.
      Although it's not available in every browser yet, we recommend its
      use because of the strong backward compatibility and potential use 
      of the 
      <a href="http://picturefill.responsiveimages.org/">Picturefill polyfill</a>.
      See the <a href="http://responsiveimages.org/#implementation">
      ResponsiveImages.org</a> site for further details. 
  compressive:
    - Use caution with the compressive technique because of the increased
      memory and decoding costs it requires.  Resizing large images to fit on
      smaller screens is expensive and can be particularly painful on low-end
      devices where both memory and processing is limited.
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
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
  img.phone {
    max-height: 500px;
    
  }
</style>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Use relative sizes for images

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

## Enhance `img`'s with `srcset` for high DPI devices

<div class="clear">
  <div class="g--half">
    <p>
      The <code>srcset</code> attribute enhances the behavior of the 
      <code>img</code> element, making it easy to provide multiple image files 
      for different device characteristics. Similar to the <code>image-set</code>
      <a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS function</a>
      native to CSS, <code>srcset</code> allows the browser to choose the best 
      image depending on the characteristics of the device, for example using 
      a 2x image on a 2x display, and potentially in the future, a 1x image on 
      a 2x device when on a limited bandwidth network.
    </p>
  </div>

  <div class="g--half g--last">
    {% include modules/video.liquid id="Pzc5Dly_jEM" %}
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

## Art direction in responsive images with `picture`

Changing images based on device characteristics, also known as art
direction can be accomplished using the picture element.  The 
<code>picture</code> element defines a declarative solution for 
providing multiple versions of an image based on different 
characteristics, like device size, device resolution, orientation,
and more.

<img class="center" src="img/art-direction.png" alt="Art direction example"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include modules/remember.liquid title="Important" list=page.remember.picture-support %}

<div class="clear">
  <div class="g--half">
    <p>
      The <code>picture</code> element should be used when an image source 
      exists in multiple densities, or when a responsive design dictates a 
      somewhat different image on some types of screens.  Similar to the 
      <code>video</code> element, multiple <code>source</code> elements can 
      be included, making it possible to specify different image files
      depending on media queries or image format.
    </p>
  </div>
  <div class="g--half g--last">
    {% include modules/video.liquid id="QINlm3vjnaY" %}
  </div>
</div>

{% include_code _code/media.html picture html %}

In the above example, if the browser width is at least 800px, then either
`head.jpg` or `head-2x.jpg` will be used, depending on the device resolution. 
If the browser is between 450px and 800px, then either `head-small.jpg` or 
`head-small-2x.jpg` will be used, again, depending on the device resolution.
For screen widths less than 450px and backwards compatibility where the 
`picture` element isn’t supported, the browser will render the `img` element 
instead, and should always be included.

### Relative sized images

When the final size of the image isn’t known, it can be difficult to specify 
a density descriptor for the image sources.  This is especially true for
images that span a proportional width of the browser and are fluid, depending
on the size of the browser.

Instead of supplying fixed image sizes and densities, the size of each 
supplied image can be specified by adding a width descriptor along with the
size of the image element, allowing the browser to automatically calculate
the effective pixel density and choose the best image to download.

{% include_code _code/sizes.html picture html %}

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


### Account for breakpoints in responsive images

In many cases, the size or image may change depending on the site’s layout
breakpoints.  For example, on a small screen, you might want the image to
span the full width of the viewport, while on larger screens, it should only
take a small proportion.  

{% include_code _code/breakpoints.html picture html %}

The `sizes` attribute in the above example uses several media queries to
specify the size of the image. When the browser width is greater than
600px, the image will be 25% of the viewport width, when it is between 500px
and 600px, the image will be 50% of the viewport width, and below 500px, it
will be full width.


## Make product images expandable

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
