---
title: "主體為流動"
description: "回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式"
updated_on: 2014-10-21
---

<p class="intro">
  主體為流動模式主要包含一個流動網格。  在大型或中型螢幕上，它通常保持為相同的大小，只是會在較寬螢幕上調整邊界。
</p>

在小螢幕上，
流動網格會導致內容自動重排，而欄則是是垂直堆疊。  這種模式的一大主要優勢是它在小螢幕與大螢幕之間，
只需要一個中斷點。


{% link_sample _code/mostly-fluid.html %}
  <img src="imgs/mostly-fluid.svg">
  嘗試一下
{% endlink_sample %}

在最小的檢視中，每個內容 `div` 都垂直堆疊。  一旦螢幕寬度達到 600px，
主要內容 `div` 會保持在 `width: 100%`，
而次要 `div` 會在主要 `div` 下顯示為兩欄。  超過 800px 時，
容器 `div` 變成固定寬度，並在螢幕上居中。

使用這種模式的網站包括：

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


{% include_code src=_code/mostly-fluid.html snippet=mfluid lang=css %}


