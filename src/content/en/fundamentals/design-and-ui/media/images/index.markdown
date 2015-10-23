---
layout: shared/narrow-pages-list
title: "Images"
description: "A picture is worth 1000 words, and images play an integral part of every page. But they also often account for most of the downloaded bytes.  With Responsive web design not only can our layouts change based on device characteristics, but images as well."
authors:
  - petelepage
published_on: 2014-04-30
updated_on: 2014-04-30
order: 1
translation_priority: 0
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
---

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p class="intro">
      Responsive web design means that not only can our layouts change based on device
      characteristics, but content as well.  For example, on high resolution (2x)
      displays, high resolution graphics are needed to ensure sharpness.  An image
      that  is 50% width may work just fine when the browser is 800px wide, but will
      use too much real estate on a narrow phone, and still comes at the same
      bandwidth overhead when scaled down to fit on a smaller screen.
    </p>
  </div>
  {% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}
</div>

### Art direction

<img src="img/art-direction.png" alt="Art direction example"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Other times the image may need to be changed more drastically: changing the
proportions, cropping and even replacing the entire image.  In this case,
changing the image is usually referred to as art direction.  See
[responsiveimages.org/demos/](https://responsiveimages.org/demos/) for more
examples.


