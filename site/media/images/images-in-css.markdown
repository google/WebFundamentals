---
layout: article
title: "Images in CSS"
description: "The CSS `background` property is a powerful tool for adding complex images to
elements, making it easy to add multiple images, cause them to repeat, and more."
introduction: "The CSS `background` property is a powerful tool for adding complex images to
elements, making it easy to add multiple images, cause them to repeat, and more.
 When combined with media queries, the background property becomes even more
powerful, enabling conditional image loading based on screen resolution,
viewport size and more."
rel:
  gplusauthor: https://plus.google.com/+PeteLePage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 2
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

{% include modules/takeaway.liquid list=page.key-takeaways.use-right-image %}

## Use media queries for conditional image loading or art direction

Media queries not only affect the page layout, but can also be used to
conditionally load images or to provide art direction depending on the viewport
width.

For example in the sample below, on smaller screens, only `small.png` is
downloaded and applied to the content `div`, while on larger screens,
`background-image: url(body.png)` is applied to the body and `background-image:
url(large.png)` is applied to the content `div`.

{% include_code _code/conditional-mq.html conditional css %}

## Use image-set to provide high res images

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

## Use media queries to provide high res images or art direction

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

{% include modules/nextarticle.liquid %}

{% endwrap %}
