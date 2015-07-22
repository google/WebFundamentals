---
layout: section
title: "Images"
description: "A picture is worth 1000 words, and images play an integral part of every page. But they also often account for most of the downloaded bytes.  With Responsive web design not only can our layouts change based on device characteristics, but images as well."
introduction: "A picture is worth 1000 words, and images play an integral part of every page. But they also often account for most of the downloaded bytes.  With responsive web design not only can our layouts change based on device characteristics, but images as well."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: introduction-to-media
priority: 0
id: images
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
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

{% comment %}
<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/vpRsLPI400U?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>
{% endcomment %}

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

{% include modules/udacity.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


{% include modules/nextarticle.liquid %}

{% endwrap %}
