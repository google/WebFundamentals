---
layout: shared/narrow
title: "Optimize images for performance"
description: "Images often account for most of the downloaded bytes and also often occupy a significant amount of the visual space on the page."
authors:
  - petelepage
published_on: 2014-04-30
updated_on: 2014-04-30
order: 4
translation_priority: 0
key-takeaways:
  optimize-images:
    - "Don't just randomly choose an image format, understand the different formats available, and use the format best suited."
    - "Include image optimization and compression tools into your workflow to reduce file sizes."
    - "Reduce the number of http requests by placing frequently used images into image sprites."
    - "Consider loading images only after they’ve scrolled into view to improve the initial page load time and reduce the initial page weight."
related-guides:
  optimize:
  -
      title: "Image optimization"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "Optimizing Content Efficiency"
        href: fundamentals/performance/optimizing-content-efficiency/
---

<p class="intro">
  Images often account for most of the downloaded bytes and also often occupy a significant amount of the visual space on the page. As a result, optimizing images can often yield some of the largest byte savings and performance improvements for your website: the fewer bytes the browser has to download, the less competition there is for client's bandwidth and the faster the browser can download and display all the assets.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## Choose the right format

There are two types of images to consider: [vector
images](https://en.wikipedia.org/wiki/Vector_graphics) and [raster
images](https://en.wikipedia.org/wiki/Raster_graphics). For raster images, you
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
[`SVG`](https://css-tricks.com/using-svg/).  Because vector images are built on
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

## Reduce the file size

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

## Use image sprites

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

## Consider lazy loading

Lazy loading can significantly speed up loading on long pages that include many
images below the fold by loading them either as needed or once the primary
content has finished loading and rendering.  In addition to performance
improvements, using lazy loading can create infinite scrolling experiences.

Be careful when creating infinite scrolling pages, because content is loaded as
it becomes visible, search engines may never see that content.  In addition,
users who are looking for information they expect to see in the footer will
never see the footer because new content is always loaded.

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}


