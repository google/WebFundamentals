---
layout: section
title: "图片"
description: "一图胜千言，另外图片也是每个页面不可或缺的组成。只是它们通常也要对大部分的下载字节负责。有了响应式 web 设计，不仅我们的布局能基于设备特征变化，图片也能。"
introduction: "一图胜千言，另外图片也是每个页面不可或缺的组成。只是它们通常也要对大部分的下载字节负责。有了响应式 web 设计，不仅我们的布局能基于设备特征变化，图片也能。"
authors:
  - petelepage
translators:
  - samchen
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

### 响应式图片

响应式 web 设计意味着，不仅我们的布局能基于设备特征变化，内容也能。比如，高分辨率 (2x) 显示屏上，就需要高分辨率图片保证清晰度。当浏览器宽 800px 时，一张 50% 宽度的图片或许很适合，但在一个局促的手机上，则会占用太多空间，另外，缩小图片来适应小屏幕时，耗费的带宽支出却是一样的。


### 艺术指导

<img class="center" src="img/art-direction.png" alt="艺术指导示例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

其余时候，图片也许需要更大幅度的修改：更改比例，裁剪甚至更换整张图片。这种情况里，改变图片通常称作艺术指导 (art direction)。请访问 [responsiveimages.org/demos/](http://responsiveimages.org/demos/) 查看更多例子。

{% include modules/udacity.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
