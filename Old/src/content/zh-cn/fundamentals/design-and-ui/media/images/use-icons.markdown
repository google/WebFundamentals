---
title: "图标使用 SVG"
description: "在给页面添加图标时，尽可能使用 SVG 图标，某些情况下，用 unicode 字符。"
translators:
  - samchen
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - 图标使用 SVG 或 unicode，而不是位图。
---

<p class="intro">
  在给页面添加图标时，尽可能使用 SVG 图标，某些情况下，用 unicode 字符。
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## 用 unicode 替代简单图标

许多字体支持五花八门的 unicode 字形，可以代替图片使用。不像图片，unicode 字体可以伸缩，不管在屏幕上的显示大小如何，都没有问题。

除了常见的字符集，unicode 可能包含的符号有数字形式 (&#8528;)、箭头 (&#8592;)、数学操作符 (&#8730;)、几何形状 (&#9733;)、控制图标 (&#9654;)、盲文 (&#10255;)、音符 (&#9836;)、希腊字母 (&#937;)，甚至象棋子 (&#9822;)。
)

使用 unicode 字符的方式与字符实体一样：`&#XXXX`，其中 `XXXX` 代表 unicode 字符编码。比如：

{% highlight html %}
You're a super &#9733;
{% endhighlight %}

You're a super &#9733;

## 用 SVG 替代复杂图标

对于更为复杂的图标需求，SVG 图标通常要轻量、易用，并且可以通过 CSS 样式化。SVG 比位图有许多优势：

* 它们是矢量图，可以无限伸缩。
* 诸如颜色、阴影、透明度以及动画这些 CSS 效果是直接的。
* SVG 图片能够内联在文档中。
* 它们是有语义的。
* 通过适当的属性，提供更佳的可访问性。

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## 谨慎使用图标字体

图标字体很流行，也方便使用，但对比 SVG 图标有些缺陷。

* 它们是可以无限伸缩的矢量图没错，但抗锯齿可能导致图标没有预期的锐利。
* 有限的 CSS 样式化。
* 精确定位到像素很难，取决于行高、字符间距等。
* 没有语义，屏幕阅读器及其它辅助性技术上很难使用。
* 除非封装得好，否则会导致文件很大，而用到的图标却只是所有图标的一小子集。

{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Example of a page that uses FontAwesome for it's font icons.">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

免费的、收费的图标字体现在有很多，包括 [Font Awesome](http://fortawesome.github.io/Font-Awesome/)、[Pictos](http://pictos.cc/) 和 [Glyphicons](http://glyphicons.com/)。

请权衡你对图标的需求及额外增加的 HTTP 请求、文件大小。举例说，如果你只需要少量图标，或许使用图片或图片精灵会更合适。


