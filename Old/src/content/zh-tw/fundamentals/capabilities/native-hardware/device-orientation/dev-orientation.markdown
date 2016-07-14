---
title: "裝置定向"
description: "裝置定向事件會傳回旋轉資料，此資料包含裝置的前後與左右傾斜程度，以及電話或筆記型電腦是否具有羅盤、裝置面對的方向。"
updated_on: 2014-10-21
key-takeaways:
  devorientation: 
    - 請保守使用。
    - 支援測試。
    - 不要每次定向事件就更新 UI；反之請同步至 requestAnimationFrame。
---

<p class="intro">
  裝置定向事件會傳回旋轉資料，此資料包含裝置的前後與左右傾斜程度，以及電話或筆記型電腦是否具有羅盤、裝置面對的方向。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devorientation %}

## 使用裝置定位事件的時機

裝置定向事件有幾個用途。  例如：

<ul>
  <li>當使用者移動時更新地圖。</li>
  <li>細微的 UI 調校，例如新增視差效果。</li>
  <li>結合地理位置，可用於逐向式導航。</li>
</ul>

## 查看支援並接聽事件

若要接聽 `DeviceOrientationEvent`，
首先請查看瀏覽器是否支援這些事件。  然後，將事件接聽器附加到 `window` 
 物件，接聽 `deviceorientation` 物件。 

{% include_code src=_code/dev-orientation.html snippet=devori lang=javascript %}

## 處理裝置定位事件

當裝置移動或變更方向時，
裝置定位事件會觸發。  它會傳回裝置在目前位置相對於
 <a href="index.html#earth-coordinate-frame"> 之間差異的資料
地球座標視框</a>。

此事件通常會傳回三個屬性，
<a href="index.html#rotation-data">`alpha`</a>、
<a href="index.html#rotation-data">`beta`</a>和
<a href="index.html#rotation-data">`gamma`</a>。  在 Mobile Safari 上，
額外參數<a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a>會與羅盤標題一起傳回
。


