---
title: "自定义广告"
description: "出色的广告可以改善用户体验。尽管广告的实际内容由广告客户提供，但您仍然可以控制广告的内容类型、颜色、大小以及展示位置。"
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - 绝对不要将广告展示在可能会影响用户预期体验的网站位置；确保首屏的广告不会推挤其下的重要内容。
    - 务必使用自适应广告单元；如果智能确定尺寸功能无法满足您的需求，请切换至高级模式。
    - 尽量使广告贯穿于内容之间，以免显示不相关的广告。
    - 选择与您的网站互相协调、互补或形成对比的文字样式。
notes:
  targeting:
    - 根据网站总体内容（而非关键字或类别）定位广告。如果您想展示与特定主题相关的广告，请添加与这些主题相关的完整句子和段落。
  testing:
    - 务必在不同的设备和屏幕上测试广告，以确保它的自适应行为正常发挥作用。
  images:
    - 广告客户可完全掌控其展示广告的呈现效果。您可以使用广告展示位置和尺寸确定功能来影响自己网站中显示的展示广告类型，但您无法实际控制图片内容。
---

<p class="intro">
  出色的广告可以改善用户体验。尽管广告的实际内容由广告客户提供，但您仍然可以控制广告的内容类型、颜色、大小以及展示位置。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 将广告展示在对用户最有利的位置

当确定广告在网站上的展示位置和
要添加的广告数量时，请务必将用户放在第一位！

* 使用广告来丰富网站内容，而不是用网站内容丰富广告。
* 页面中广告数量过多、广告将重要内容向下推至非首屏位置、广告因集聚在一起而占用可视空间，或者广告因没有明确的标签而降低了用户满意度，所有这些都违反了 AdSense 政策。
* 确保广告可为用户提供价值。如果您的广告单元带来的收入、点击次数或查看次数非常少，则很可能是由于它们没有为用户提供价值。

移动广告的展示位置选项示例：

<img src="images/mobile_ads_placement.png" class="center" alt="移动图片广告示例">

有关详情，请参阅 AdSense 
[广告展示位置最佳做法](https://support.google.com/adsense/answer/1282097)。


## 如果自适应尺寸确定功能无法满足您的需求，该怎么办？
在某些情况下，您可能需要加大对广告展示方式的控制，而非简单地使用自适应广告。在这种情况下，您可以切换至高级模式，并覆盖自适应广告单元代码中的智能确定尺寸功能。
例如，您可以使用[媒体查询]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html)精确控制广告尺寸：

1. 请按照相关说明[创建自适应广告单元]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units)。
2. 在广告代码框中，从'模式'下拉菜单中选择<strong>高级（需要修改代码）</strong>。
3. 修改广告代码，以便根据用户设备设置精确的广告尺寸：

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
    试用
{% endlink_sample %}

有关详情，请参阅 AdSense 帮助中的[高级功能](https://support.google.com/adsense/answer/3543893)。

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## 选择与网站互补的样式

[最成功的广告](https://support.google.com/adsense/answer/17957)会与网站样式协调或与其形成对比。Google AdSense 提供一系列的[预定义广告样式](https://support.google.com/adsense/answer/6002585)；请选择最适合您网站的样式或创建自己的广告样式。

### 可自行设置的样式

您可以自行设置文字广告中的以下任意样式：

* 边框颜色
* 背景颜色
* 文字字体类型和字体大小
* 默认文字颜色
* 广告标题专用的文字颜色
* 网址专用的文字颜色

### 如何应用样式

创建新广告单元时，您可以通过扩展<strong>文字广告样式</strong>属性来为文字广告应用其他样式：

<img src="images/customize.png" class="center" alt="文字广告样式">

文字广告全部使用 Google AdSense <strong>默认</strong>样式。您可以使用预定义样式（不做任何更改）、对预定义样式稍作修改，或创建自己的样式。

保存新样式后，您可将其应用于任意现有或 
新广告单元：

1. 导航至[广告样式](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES)。
2. 从<strong>适用于您正在使用的所有产品的广告样式</strong>列表中选择您想更改的广告样式。
3. 做出更改并<strong>保存广告样式</strong>。

更改现有广告样式时，使用该样式的所有有效广告单元都会自动更新。

{% include shared/remember.liquid title="Remember" list=page.notes.images %}


