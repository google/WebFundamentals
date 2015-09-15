---
title: "欄內容下排"
description: "回應式網頁設計模式正在快速演化，但已有一些能跨桌面和行動裝置運作良好的既定模式"
updated_on: 2014-10-21
---

<p class="intro">
  針對全寬度多欄版面配置，視窗寬度之於內容變得太窄時，欄內容下排只是會垂直堆疊所有欄而已。  
</p>

最後結果是所有欄會被垂直堆疊。
  為這種版面配置模式選擇中斷點，
視內容而定，也會因每一種設計而變動。


{% link_sample _code/column-drop.html %}
  <img src="imgs/column-drop.svg">
  嘗試一下
{% endlink_sample %}


就像主體為流動的範例，
內容被垂直堆疊於最小檢視中，但在螢幕擴展超出 600px 時，主要與次要內容 
`div` 會佔據整個螢幕寬度。  `div` 的順序是以舊 CSS 屬性來設定。
  在 800px 時，所有三個內容 `div` 都會顯示，使用完整螢幕寬度。


使用這種模式的網站包括：

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

{% include_code src=_code/column-drop.html snippet=cdrop lang=css %}


