---
layout: section
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
id: images
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

{% include modules/nextarticle.liquid %}

{% endwrap %}
