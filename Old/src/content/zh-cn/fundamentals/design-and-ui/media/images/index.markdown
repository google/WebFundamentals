---
title: "图片"
description: "一图胜千言，另外图片也是每个页面不可或缺的组成。只是它们通常也要对大部分的下载字节负责。有了响应式 web 设计，不仅我们的布局能基于设备特征变化，图片也能。"
translators:
  - samchen
updated_on: 2014-04-30
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
---

<p class="intro">
  一图胜千言，另外图片也是每个页面不可或缺的组成。只是它们通常也要对大部分的下载字节负责。有了响应式 web 设计，不仅我们的布局能基于设备特征变化，图片也能。
</p>


### 响应式图片

响应式 web 设计意味着，不仅我们的布局能基于设备特征变化，内容也能。比如，高分辨率 (2x) 显示屏上，就需要高分辨率图片保证清晰度。当浏览器宽 800px 时，一张 50% 宽度的图片或许很适合，但在一个局促的手机上，则会占用太多空间，另外，缩小图片来适应小屏幕时，耗费的带宽支出却是一样的。


### 艺术指导

<img class="center" src="img/art-direction.png" alt="艺术指导示例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

其余时候，图片也许需要更大幅度的修改：更改比例，裁剪甚至更换整张图片。这种情况里，改变图片通常称作艺术指导 (art direction)。请访问 [responsiveimages.org/demos/](http://responsiveimages.org/demos/) 查看更多例子。

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


