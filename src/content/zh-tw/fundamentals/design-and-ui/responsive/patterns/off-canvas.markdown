---
title: "畫布外空間利用"
description: "回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式"
updated_on: 2014-10-21
---

<p class="intro">
  它不會垂直堆疊內容，畫布外空間利用模式會將較不常用的內容 -- 可能是導覽或應用程式功能表 -- 放在螢幕外，當螢幕足夠大時才顯示，而且在較小的螢幕上，內容只需按一下就會顯示。
</p>

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg">
  嘗試一下
{% endlink_sample %}

不垂直堆疊內容，本範例使用一個 `transform: translate(-250px, 0)`，
以將兩個內容 `div` 隱藏於螢幕之外。  透過新增一個開放類別給元素，
以使其可見，這裡使用了 JavaScript 來顯示 div。  在螢幕變更寬的同時，
螢幕外的定位會從元素移除，而元素會在可見檢視區中顯示。


注意在此範例中，
iOS 6 版本 Safari 和 Android 瀏覽器不支援 `flexbox` 的 `flex-flow: row nowrap` 功能，所以我們必須退回到絕對定位方式。


使用這種模式的網站包括：

 * [HTML5Rocks
 文章](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [臉書行動版網站](https://m.facebook.com/)

{% include_code src=_code/off-canvas.html snippet=ocanvas lang=css %}


