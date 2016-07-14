---
title: "圖片"
description: "一張圖片勝過千言萬語，而圖片在每個網頁上都是不可或缺的一環。但是，大部分的下載位元組通常都是圖片。有了回應式網頁設計，不僅版面配置可以根據裝置特性變更，圖片也可以靈活變動。"
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - 針對顯示器的特性選用最佳圖片時，請考量螢幕大小、裝置解析度和網頁版面配置。
    - 使用包含 <code>min-resolution</code> 和 <code>-webkit-min-device-pixel-ratio</code> 的媒體查詢，變更 CSS 中的 <code>background-image</code> 屬性後，即可用於高 DPI 顯示器。
    - 除了標記中的 1x 圖片，還可使用 srcset 提供高解析度圖片。
    - 使用 JavaScript 圖片取代技術，或者將經過高度壓縮的高解析度圖片放送到解析度較低的裝置時，請考量這麼做對於成效的影響。
  avoid-images:
    - 儘量避免使用圖片，請善用瀏覽器的功能，使用 unicode 字元取代圖片，並以圖示字型取代複雜的圖示。
  optimize-images:
    - 請勿任意選擇圖片格式。建議您先瞭解所有可用的格式，再選用最合適的格式。
    - 將圖片最佳化和壓縮工具納入您的工作流程，藉此降低檔案大小。
    - 將常用的圖片放到圖片小精靈中，藉此減少 http 要求數量。
    - 請考慮在使用者捲動到圖片所在位置時才載入圖片，藉此縮短最初載入網頁所需的時間。
notes:
  compressive:
    - 請謹慎使用壓縮技術，因為這樣會增加記憶體和解碼時的資源成本。縮小大型圖片以符合較小的螢幕非常耗費系統資源。對於記憶體和處理能力有限的低階裝置來說，這麼做的影響更加嚴重。
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
---

<p class="intro">
  一張圖片勝過千言萬語，而圖片在每個網頁上都是不可或缺的一環。但是，大部分的下載位元組通常都是圖片。有了回應式網頁設計，不僅版面配置可以根據裝置特性變更，圖片也可以靈活變動。
</p>


{% ytvideo vpRsLPI400U %}

### 回應式圖片

有了回應式網頁設計，不僅版面配置可以根據裝置特性變更，圖片也可以靈活變動。例如，在高解析度 (2x) 的螢幕上，必須使用高解析度圖形才能保持畫面銳度。當瀏覽器寬度為 800px 時，寬度為其 50% 的圖片效果就很好，但在較窄的手機上可能會佔用過多的空間，而且當其縮小到適合較小的螢幕時，仍然會佔用相同的頻寬。

### 美學指導

<img class="center" src="img/art-direction.png" alt="美學指導示例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

有時候，我們需要對圖片做出大幅變動，例如變更比例、進行裁剪，甚至是替換整個圖片。在這種情況下，變更圖片的動作一般稱為美學指導。如要查看更多示例，請前往 [responsiveimages.org/demos/](http://responsiveimages.org/demos/)。

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}



