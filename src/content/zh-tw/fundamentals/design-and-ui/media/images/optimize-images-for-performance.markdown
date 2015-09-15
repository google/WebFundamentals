---
title: "將圖片最佳化以提升效能"
description: "大部分的下載位元組通常都是圖片，而且圖片也常常佔據了廣大的視覺空間。"
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
related-guides:
  optimize:
  -
      title: "圖片最佳化"
      href: fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization
      section:
        id: optimizing-content-efficiency
        title: "最佳化內容效率"
        href: performance/optimizing-content-efficiency/
---

<p class="intro">
  大部分的下載位元組通常都是圖片，而且圖片也常常佔據了廣大的視覺空間。因此，只要將圖片最佳化，就能節省大量位元組，並提升網站的效能：瀏覽器要下載的位元組愈少，用戶端頻寬的爭用情況就越少，瀏覽器下載並顯示所有資產的速度就可因此提升。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.optimize-images %}

## 選擇適合的格式

您可以考慮使用下列兩類圖片：[向量圖片](http://en.wikipedia.org/wiki/Vector_graphics)和[點陣圖片](http://en.wikipedia.org/wiki/Raster_graphics)。如果選用點陣圖片，您還必須選擇適當的壓縮格式，例如 `GIF`、`PNG` 和 `JPG`。

**點陣圖片**包括照片和以單點或像素組成的網格形式所呈現的其他圖片。點陣圖片通常是透過相機或掃描器產生的，您也可以使用 `canvas` 元素在瀏覽器中製作這類圖片。圖片越大，檔案越大。點陣圖片放大到超過原始大小時，就會變得模糊，因為瀏覽器需要猜測如何填充缺少的像素。

**向量圖片** (例如標誌和素描圖片) 是由一組曲線、線條、圖形和填充色定義的。向量圖片通常是使用 Adobe Illustrator 或 Inkscape 等程式製作，然後以 [`SVG`](http://css-tricks.com/using-svg/) 等向量格式進行儲存。由於向量圖片是根據簡單的圖元製作的，因此縮放時不會降低圖片品質，也不會改變檔案大小。

選擇適當的格式時，請務必考慮圖片的原圖 (點陣圖片或向量圖片) 和內容 (顏色、動畫和文字等)。沒有一種格式適用於所有圖片類型，因為每種格式都有優缺點。

當您要選擇適當的格式時，請先參考下準則：

* 照片類圖片使用 `JPG` 格式。
* 向量圖片和單色圖形 (例如標誌和素描圖片) 使用 `SVG`。
  如果沒有向量圖片，請嘗試使用 WebP 或 PNG。
* 不要使用 `GIF`，因為  `PNG` 顏色較豐富，而且可提供較優異的壓縮比例。
* 對於較長的動畫，請考慮使用 `<video>` 以便提供更佳的圖片品質，並讓使用者自行播放。

## 縮減檔案大小

儲存圖片後，接著進行後製處理可以大幅縮減圖片檔案大小。圖片壓縮工具有多種：失真壓縮和無失真壓縮、線上壓縮、GUI 以及命令列。如果可以，建議您將圖片最佳化作業自動化，藉此確保這項作業成為您工作流程中的首要任務。

目前市面上還有其他工具可以對 `JPG` 和 `PNG` 檔案執行進一步的無失真壓縮，圖片品質絲毫不會受到影響。如果是 `JPG`，請試試 [jpegtran](http://jpegclub.org/) 或 [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (僅限 Linux 系統，透過 --strip-all 選項執行)。如果是 `PNG`，請試試 [OptiPNG](http://optipng.sourceforge.net/) 或 [PNGOUT](http://www.advsys.net/ken/util/pngout.htm)。

## 使用圖片拼貼

CSS 拼貼是一種將多個圖片整合到一個「拼貼表」圖片的方法。然後，透過指定元素 (拼貼表) 的背景圖片以及可顯示正確部分的偏移值，即可使用單一圖片。

{% link_sample _code/image-sprite.html %}
<img src="img/sprite-sheet.png" class="center" alt="示例中使用圖片拼貼表">
{% endlink_sample %}
{% include_code src=_code/image-sprite.html snippet=sprite lang=css %}

拼貼功能可減少為了獲得多個圖片所需的下載次數，同時還可以進行快取。

## 考慮使用延遲載入

延遲載入透過依需要載入圖片或在主要內容載入完成並呈現後才載入的機制，可以顯著加快在需捲動位置包含大量圖片的長篇網頁載入速度。除了提高效能外，使用延遲載入還可以打造無限的捲動體驗。

但是，在建立無限捲動網頁時請三思。因為系統是在發現內容後才進行載入，搜尋引擎可能永遠無法找到某些內容。此外，想查看頁尾內容的使用者永遠也無法看到頁尾，因為網頁會不斷載入新內容。

{% include shared/related_guides.liquid inline=true list=page.related-guides.optimize %}




