---
title: "版面配置位移"
description: "回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式"
updated_on: 2014-10-21
---

<p class="intro">
  版面配置位移模式是最為回應式的模式，帶有跨數個螢幕寬度的多個中斷點。
</p>

這種版面配置的關鍵在於內容四處移動的方式，
而非自動重排或欄內容下排。  由於每個主要中斷點之間的顯著差異，
它的維護更複雜，並可能涉及元素內的變更，
而非整體的內容版面配置。

{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg">
  嘗試一下
{% endlink_sample %}

以下的簡化範例會顯示版面配置位移模式。
在較小的螢幕上，內容會垂直堆疊，
但在螢幕變得較大時大幅變更，帶有一個左 `div` ，和兩個堆疊的 `div` 在右邊。

使用這種模式的網站包括：

 * [Food Sense](http://foodsense.is/)
 * [基本回應式設計
範例](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

{% include_code src=_code/layout-shifter.html snippet=lshifter lang=css %}


