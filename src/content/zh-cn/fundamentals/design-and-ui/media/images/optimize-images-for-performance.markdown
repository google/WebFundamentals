---
title: "优化图片提升性能"
description: "图片通常占了下载字节的多数，在页面上一般也占据很大部分的可视空间。"
translators:
  - samchen
updated_on: 2014-04-30
key-takeaways:
  optimize-images:
    - 不要随便选择图片格式，弄清现有格式的区别，用最适合的格式。
    - 在你的工作流程中引进图片优化与压缩工具，减小文件大小。
    - 将常用图片放入图片精灵中，减少 http 请求数量。
    - 考虑在图片滚动进入视口后才加载，以改善页面初始加载时间，减小页面首次初始大小。
related-guides:
  optimize:
  -
      title: "图片优化"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "优化内容效率"
        href: fundamentals/performance/optimizing-content-efficiency/
---

<p class="intro">
  图片通常占了下载字节的多数，在页面上一般也占据很大部分的可视空间。因此，优化图片通常可以最大限度地给你的网站节省字节并提升性能：浏览器要下载的字节越少，客户端对带宽的竞争就越小，浏览器下载、显示所有资源的速度就越快。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## 选择正确的格式

有两类图片类型可以考虑：[矢量图](http://en.wikipedia.org/wiki/Vector_graphics)与[位图](http://en.wikipedia.org/wiki/Raster_graphics)。对于位图，你一样需要选择正确的压缩格式，比如：`GIF`、`PNG`、`JPG`。

**位图**，诸如相片及其它通过独立的点或像素网格表示的图片。位图通常来自照相机或扫描仪，也可以在浏览器中借助 `canvas` 元素创建。随着图片尺寸的增加，文件大小跟着增加。如果位图拉伸超过初始尺寸，则会变得模糊，因为浏览器需要猜测怎样填补缺失的像素。

**矢量图**，譬如商标和线描，它们是由一系列的曲线、直线、形状和填充色构成的。矢量图使用 Adobe Illustrator 或 Inkscape 这样的程序创建，保存为矢量格式如 [`SVG`](http://css-tricks.com/using-svg/)。因为矢量图是建立在简单图元上，它们可以进行无损伸缩，还能保持文件大小不变。

选择图片格式时，需要综合考虑图片的源格式（位图还是矢量）及内容（颜色、动画、文本等等）。没有一个格式能够适用所有图片类型，它们各有优劣。

在选择正确的格式时，先参考以下指导：

* 摄影图片使用 `JPG`。
* 诸如商标和线描的矢量插画及纯色图形使用 `SVG`。如果矢量不可用，试试 WebP 或 PNG。
* 图片需要更丰富的颜色及更好压缩比时，使用 `PNG` 而不是 `GIF`。
* 长动画考虑使用 `<video>`，能提供更好的图片质量，还允许用户控制回放。

## 减小文件大小

在保存图片后，图片文件大小可以通过后处理减掉相当一部分。有很多图片压缩工具 - 有损与无损的、在线的、GUI 的、命令行的。在可能的情况下，最好自动化图片优化，这样在你的工作流程中，它就是一等公民。

有许多工具可用来对 `JPG` 和 `PNG` 文件做进一步的无损压缩，而不会对图片质量造成影响。对于 `JPG`，试试 [jpegtran](http://jpegclub.org/) 或 [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (只 Linux 下有；通过 --strip-all 选项运行。对于 `PNG`，试试 [OptiPNG](http://optipng.sourceforge.net/) 或 [PNGOUT](http://www.advsys.net/ken/util/pngout.htm)。

## 使用图片精灵

图片精灵是一个将许多图片合并到一个单一'精灵表'图片的技术。然后单一的图片就可以通过设定元素背景图片（所谓的精灵表）加上位移来显示正确的部分。

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt="Image sprite sheet used in example">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

精灵化的好处是，减少了读取多张图片的下载数量，而且还能保持缓存的启用。

## 考虑延缓加载

首屏包含许多图片的长页面中，延缓加载能极大提高加载速度，可以按需加载，或者在主要内容加载完成且渲染好之后加载。除了性能上的提升外，使用延缓加载能产生无限滚动的体验。

在创建无限滚动的页面时，需要注意，内容是可见后才加载的，搜索引擎因此可能永远看不到该内容。此外，用户想查看脚部信息也不可能了，因为总是有新内容被载入。

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}


