---
title: "Layout shifter"
description: "响应式网页设计模式正在快速发展，但只有少数几种成熟的 模式可以在桌面和 和移动设备上流畅运行"
updated_on: 2014-10-21
---

<p class="intro">
  Layout shifter 模式是响应最快的模式，在多种屏幕宽度上采用 多个视图断点。
</p>

此布局的关键是内容移动的方式，而不是重排
并放到其他列下面。  由于每个主要视图断点之间的显著差异，
其维护更复杂，并且可能涉及元素
内的更改，而不只是总体内容布局的更改。

{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg">
  试一下
{% endlink_sample %}

这个简化示例显示了　Layout shifter 模式，在较小的屏幕上
内容垂直排列，但在屏幕变大时显著改变，
左侧一个 `div`，右侧排列两个 `div`。

使用此模式的网站包括：

 * [Food Sense](http://foodsense.is/)
 * [Seminal 响应式设计
示例](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

{% include_code src=_code/layout-shifter.html snippet=lshifter lang=css %}


