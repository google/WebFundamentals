---
layout: article
title: "圖片最佳化"
description: "網頁上大部分的下載位元組通常都是圖片，而且圖片也常常佔據了廣大的視覺空間。因此，只要將圖片最佳化，就能節省大量位元組，並提升網站的效能：瀏覽器要下載的位元組愈少，用戶端頻寬的爭用情況就越少，瀏覽器下載速度就可提升，並在螢幕上顯示實用的內容。"
introduction: "網頁上大部分的下載位元組通常都是圖片，而且圖片也常常佔據了廣大的視覺空間。因此，只要將圖片最佳化，就能節省大量位元組，並提升網站的效能：瀏覽器要下載的位元組愈少，用戶端頻寬的爭用情況就越少，瀏覽器下載速度就可提升，並在螢幕上顯示實用的內容。"
article:
  written_on: 2014-05-07
  updated_on: 2014-05-10
  order: 3
collection: optimizing-content-efficiency
authors:
  - ilyagrigorik
key-takeaways:
  replace:
    - 消除不必要的圖片資源
    - 儘量運用 CSS3 效果
    - 使用網路字型，避免在圖片中將文字編碼
  vector-raster:
    - 向量圖片非常適用於由幾何圖形組成的圖片
    - 向量圖片不受縮放和解析度的影響
    - 如果複雜的畫面中包含許多不規則的圖形和細節，請使用點陣圖片
  hidpi:
    - 在高解析度螢幕中，每個 CSS 像素具有多個裝置像素
    - 高解析度圖片需要非常多的像素和位元組
    - 無論解析度高低，圖片最佳化技術都一樣
  optimizing-vector:
    - SVG 是一種 XML 圖片格式
    - 請將 SVG 檔案迷你化，以便縮減檔案大小
    - 請使用 GZIP 壓縮 SVG 檔案
  optimizing-raster:
    - 點陣圖片是一格像素
    - 每個像素都會包含顏色和透明度資訊
    - 圖片壓縮器會使用多種技術縮減每個像素所需的位元數，藉此降低圖片的檔案大小
  lossless-lossy:
    - 因為人類眼睛運作機制的緣故，圖片非常適合採用失真壓縮
    - 圖片最佳化是失真和無失真壓縮的一項功能
    - 將圖片最佳化時，使用失真或無失真演算法會造成圖片格式略有不同
    - 並沒有所有圖片都適用的最佳格式或「品質設定」：每種特定的壓縮器和圖片內容組合都會產生獨一無二的結果
  formats:
    - "請先選取通用的格式：GIF、PNG、JPEG"
    - "反覆實驗後，為每種格式選取最佳設定：品質、調色盤大小等"
    - 考慮為現代用戶端新增 WebP 和 JPEG XR 資產 scaled-images:
    - 傳送可放大的資產是最簡單有效的最佳化作業
    - 請特別留意大型資產，因為這類資產會耗費大量資源
    - 透過將圖片放大為正常顯示大小，可減少不必要的像素數量


notes:
  decompressed:
    - "順帶一提，無論使用哪種圖片格式將伺服器傳輸到用戶端，當圖片經過瀏覽器解碼後，每個像素一律會佔用 4 位元組的記憶體。對於大型圖片和可用記憶體有限的裝置 (例如低階行動裝置) 來說，這是重要的考量因素。"
  artifacts:
    - "由左至右 (PNG)：32 位元 (1600 百萬色)、7 位元 (128 色)、5 位元 (32 色)。包含色彩逐漸轉換 (漸層、天空等) 的複雜畫面 需要大型調色盤，才可避免視覺雜訊 (例如 5 位元資產中的像素化天空)。另一方面，如果圖片僅使用少數顏色，大型調色盤只是白白浪費了寶貴的位元資源！"
  quality:
    - "請注意，如果使用不同的演算法將圖片編碼，則無法直接比較不同圖片格式的品質水準：品質為 90 JPEG 的圖片和品質為 90 WebP 的圖片看起來就大不相同。事實上，即使是相同圖片格式的品質水準，也會因為採用壓縮器而產生視覺上的差異！"
  resized:
    - '將游標懸停在 Chrome DevTools 中的圖片 image 元素，即可同時看見圖片資產的「自然」和「顯示」大小。在上述示例中，系統會下載 300x260 的像素圖片，要顯示時再於用戶端縮小為 245x212。'
---

{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}

圖片最佳化不僅是藝術，也是一門科學。這是藝術，因為每個圖片都獨一無二，要如何才可將圖片妥善壓縮，我們沒有絕對的答案。這同時也是科學，因為目前已有開發完善的技術，可以大幅降低圖片大小。如要找出圖片的最佳設定，您需要仔細分析許多面向：例如格式的能力、編碼資料的內容、品質、像素維度等等。

##清除及取代圖片

{% include modules/takeaway.liquid list=page.key-takeaways.replace %}

請先問自己一個問題：這張圖片真的能達成預期的效果嗎？ 良好的設計通常都很簡單，而且能產生最佳的效能。與 HTML、CSS、JavaScript 等網頁資產相比，圖片相對會佔用較多的位元組。如果您能將圖片資源清除，這通常就是最棒的最佳化策略了。話說回來，如果將圖片放在適當的位置，有效傳達的資訊將勝過千言萬語。因此，如何取捨就看您自己了。

接下來，您應該考量是否有替代技術可以更經濟有效率的方式，達成您預期的結果：

* **CSS 效果** (漸層、陰影等) 和 CSS 動畫可用來產生不受解析度限制的資產。無論解析度高低或縮放大小為何，這類資產都能常保清晰，而且所需的位元組遠比圖片檔案少。
* **網路字型**不僅可呈現美觀的字型，也保留了選取、搜尋及調整文字大小的功能，大幅提升使用上的便利性。

如果您採用了將文字編碼嵌入圖片的方式，請立即停下來重新考慮。就良好的設計、品牌宣傳和可讀性來說，優美的字型自然是關鍵的要素。但是嵌入圖片的文字卻會導致負面的使用者體驗，因為這類文字無法搜尋、縮放、無法剖析，而且在高 DPI 裝置上顯示的效果也不好。雖然使用網路字型時必須遵循[專屬的最佳化流程](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/)，但是網路字型解決了所有的疑問，絕對是顯示文字的最佳選擇。


## 向量和點陣圖片

{% include modules/takeaway.liquid list=page.key-takeaways.vector-raster %}

確定圖片就是可達成您預期效果的最佳媒體後，下一個關鍵抉擇就是選取適合的格式：

&nbsp;

<div class="clear">
  <div class="g--half">
    <b>向量</b>
    <img class="center" src="images/vector-zoom.png" alt="放大的向量圖片">
  </div>

  <div class="g--half g--last">
    <b>點陣</b>
    <img src="images/raster-zoom.png" alt="放大的點陣圖片">
  </div>
</div>

* [向量圖片](http://en.wikipedia.org/wiki/Vector_graphics)會使用線條、圓點和多邊形呈現圖片。
* [點陣圖片](http://en.wikipedia.org/wiki/Raster_graphics)會將每個像素的值嵌入正方形網格內。

兩種格式各有優缺點。向量格式適合由簡單幾何圖形組成的圖片 (例如標誌、文字、圖示等等)，無論解析度高低或縮放大小為何，都可顯示清晰的圖片，因此也非常適合高解析度的螢幕和需要在不同大小顯示的資產。

不過，當畫面非常複雜 (例如相片)，向量格式就顯得使不上力：即使描述所有圖形的 SVG 標記數量高得嚇人，結果看起來還是缺乏「真實感」。如果發生這種情況，您就應該考慮使用點陣圖片格式，例如 GIF、PNG、JPEG 或 JPEG-XR 和 WebP 這類較新的格式。

點陣圖片並沒有不受解析度高低和縮放大小影響的屬性，當您放大點陣圖片時，將會看到鋸齒狀和模糊的影像。因此，您可能需要為點陣圖片儲存多個解析度的版本，才能為使用者提供最佳體驗。


## 高解析度螢幕的意涵

{% include modules/takeaway.liquid list=page.key-takeaways.hidpi %}

談到圖片像素時，我們必須區分不同類型的像素，也就是 CSS 像素和裝置像素。單一 CSS 像素可包含多個裝置像素，例如單一 CSS 像素可能直接對應單一裝置像素，或者受到多個裝置像素的支援。這有什麼重要的？ 問得好！裝置像素愈多，螢幕上顯示的內容就愈精緻。

<img src="images/css-vs-device-pixels.png" class="center" alt="CSS 和裝置像素">

高 DPI (HiDPI) 螢幕可呈現出美不勝收的畫面，但是美麗需要代價：我們的圖片資產需要更詳細的資訊，才可發揮高裝置像素的功能。好消息是向量圖片非常適合這項工作，因為這類圖片在任何解析度都能保持畫面清晰。為了顯示更精緻的細節，我們可能會耗用較多的處理資源，但是基礎資產仍然不變，而且不受解析度的影響。

另一方面，點陣圖片面臨的挑戰更大，因為這類圖片會將資料嵌入每個像素中。像素愈多，點陣圖片的檔案大小就愈大。讓我們以 100x100 (CSS) 像素顯示的相片資產為例，看看其中的差異：

<table class="table-3">
<colgroup><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>螢幕解析度</th>
    <th>總像素</th>
    <th>未壓縮的檔案大小 (每像素 4 個位元組)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="解析度">1x</td>
  <td data-th="總像素">100 x 100 = 10,000</td>
  <td data-th="檔案大小">40,000 位元組</td>
</tr>
<tr>
  <td data-th="解析度">2x</td>
  <td data-th="總像素">100 x 100 x 4 = 40,000</td>
  <td data-th="檔案大小">160,000 位元組</td>
</tr>
<tr>
  <td data-th="解析度">3x</td>
  <td data-th="總像素">100 x 100 x 9 = 90,000</td>
  <td data-th="檔案大小">360,000 位元組</td>
</tr>
</tbody>
</table>

當我們將解析度增加一倍時，實際螢幕和總像素數量會增加四倍：水平像素和垂直像素各增加一倍後再相乘。因此，當螢幕變為「2 倍」時，所需像素不只是兩倍，而是增加為四倍。

這在實際應用上代表什麼意思？ 高解析度螢幕可讓我們放送美觀的圖片，這可說是一項優異的產品功能。不過，高解析度螢幕也需要高解析度圖片才能相得益彰：請儘量使用不受解析度影響且可常保清晰畫值的向量圖片。如果必須使用點陣圖片，請將每個圖片的多個版本最佳化後再進行放送。如需瞭解詳情，請繼續閱讀。


## 最佳化向量圖片

{% include modules/takeaway.liquid list=page.key-takeaways.optimizing-vector %}

所有現代的瀏覽器都支援可縮放向量圖片 (SVG)。SVG 是一種適用於二維圖形的 XML 圖片格式：我們可以直接將 SVG 標記嵌入網頁，或者當做外部資源使用。您可使用大部分的向量繪圖軟體，或是直接在文字編輯器手繪的方式建立 SVG 檔案。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
   x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
<g id="XMLID_1_">
  <g>
    <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
  </g>
</g>
</svg>
{% endhighlight %}

上方示例會顯示從 Adobe Illustrator 匯出，外緣是黑色而背景為紅色的簡單圓形。如您所見，其中包含了許多中繼資料，例如圖層資訊、備註和 XML 命名空間，但是在瀏覽器中顯示資產時，通常不需要這些資料。因此，我們大力建議您透過 [svgo](https://github.com/svg/svgo) 工具將 SVG 檔案迷你化。

以上述示例說明，svgo 可將上述由 Illustrator 產生的 SVG 檔案大小縮減 58%，也就是從 470 位元組降為 199 位元組。此外，因為 SVG 是 XML 格式，我們也可以運用 GZIP 壓縮技術縮減傳輸大小，請確認您的伺服器可壓縮 SVG 資產！


## 最佳化點陣圖片

{% include modules/takeaway.liquid list=page.key-takeaways.optimizing-raster %}

點陣圖片就是個別像素構成的二維網格，例如 100x100 像素的圖片就是 10,000 像素的數列。話說回來，每個像素都會儲存 [RGBA](http://en.wikipedia.org/wiki/RGBA_color_space) 值：(R) 紅色頻道、(G) 綠色頻道、(B) 藍色頻道和 (A) Alpha (透明) 頻道。

在內部作業中，瀏覽器會將 256 個值 (色調) 分配給每個頻道，換算後等於每個頻道 8 位元 (2 ^ 8 = 256)，每個像素 4 位元組 (4 個頻道 x 8 位元 = 32 位元 = 4 位元組)。因此，如果我們知道網格的維度，就可以輕鬆計算出檔案大小：

* 100 x 100px 的圖片是由 10,000 像素所組成
* 10,000 像素 x 4 位元組 = 40,000 位元組
* 40,000 位元組 / 1024 = 39 KB

^

{% include modules/remember.liquid title="Note" list=page.notes.decompressed %}

<table class="table-3">
<colgroup><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>維度</th>
    <th>像素</th>
    <th>檔案大小</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="維度">100 x 100</td>
  <td data-th="像素">10,000</td>
  <td data-th="檔案大小">39 KB</td>
</tr>
<tr>
  <td data-th="維度">200 x 200</td>
  <td data-th="像素">40,000</td>
  <td data-th="檔案大小">156 KB</td>
</tr>
<tr>
  <td data-th="維度">300 x 300</td>
  <td data-th="像素">90,000</td>
  <td data-th="檔案大小">351 KB</td>
</tr>
<tr>
  <td data-th="維度">500 x 500</td>
  <td data-th="像素">250,000</td>
  <td data-th="檔案大小">977 KB</td>
</tr>
<tr>
  <td data-th="維度">800 x 800</td>
  <td data-th="像素">640,000</td>
  <td data-th="檔案大小">2500 KB</td>
</tr>
</tbody>
</table>

大小為 39KB 的 100x100 圖片看起來似乎微不足道，但是大型圖片的檔案大小會迅速爆增，導致下載圖片資產變得費時，同時也會耗用大量資源。還好，目前我們談到的都是「未壓縮」圖片格式。那麼，我們要如何縮減圖片檔案的大小呢？

縮減圖片的「位元深度」就是一個簡單的策略。我們可以從每個頻道 8 位元縮減為較小的調色盤：每個頻道 8 位元代表每個頻道有 256 個值，總共就有 16,777,216 (2563) 色。如果我們將調色盤縮減為 256 色，會發生什麼情況呢？ 這樣一來，所有 RGB 頻道總共只需要 8 位元，而每個像素也立即省下兩位元組。這個數據代表原本每個像素 4 位元組的格式大幅壓縮了 50%！

<img src="images/artifacts.png" class="center" alt="壓縮雜訊">

{% include modules/remember.liquid title="Note" list=page.notes.artifacts %}

將儲存在個別像素的資料最佳化之後，我們就可以更進一步看看周圍的像素：事實上，許多圖片 (特別是相片) 的相鄰像素都具有類似的顏色，例如天空、重複出現的質地等等。這項資訊對我們大有幫助，因為壓縮器可套用[差分編碼](http://en.wikipedia.org/wiki/Delta_encoding)。相對於儲存每個像素的個別值的方式，我們可以儲存相鄰像素之間的差異：如果相鄰像素完全相同，則差分為「零」，因此我們只需要儲存一個位元！ 但是，不繼續探索下去就太可惜了...

人類的眼精對於不同顏色的敏感度各有差異：我們可以依據這個原則減少或增價這些顏色的調色盤，以達到將顏色編碼最佳化的目的。
「附近」像素可構成二維網格，這表示每個像素都有多個鄰居：我們可以循著這個脈絡提升差分編碼的成效。
有別於僅關注每個像素的相鄰像素，我們可以看看涵蓋附近像素的較大區塊，分別為不同區塊編碼不同的設定。依此類推...

如您所見，圖片最佳化很快就變得複雜起來 (或說變得有趣嗎？這就見仁見智了)。圖片最佳化也是學界和商界積極研究的領域。因為圖片佔據了大量位元組，積極開發更優異的圖片壓縮技術，可說是價值連城！ 如果您渴望進一步瞭解相關資訊，請前往[維基百科網頁](http://en.wikipedia.org/wiki/Image_compression)，或是參閱 [WebP 壓縮技術白皮書](https://developers.google.com/speed/webp/docs/compression)以獲得實際操作示例。

再說明一次，這些資訊非常實用，但也充滿學術理論：我們到底要如何透過這些資訊將網頁的圖片最佳化？ 雖然我們無法發明最新的壓縮技術，但是瞭解問題的輪廓 (RGBA、像素、位元深度和各種最佳化技術) 也是不可或缺的一環。在我們繼續探討不同的點陣圖片格式之前，請務必瞭解上述這些概念並牢記在心。


## 失真和無失真圖片壓縮

{% include modules/takeaway.liquid list=page.key-takeaways.lossless-lossy %}

對於特定的資料類型 (例如網頁原始碼或可執行檔)，我們不希望壓縮器修改或遺漏任何原始資訊：任何資料位元遺失或出錯都會使得檔案內容的意義完全改變，更糟的是，整個檔案可能會完全損毀。至於其他的資料類型 (例如圖片、音訊和影片)，即使壓縮檔和原始檔案有些出入，也還算是可接受的範圍。

事實上，由於人類眼睛運作機制的緣故，我們常常會為了縮減圖片檔案大小而捨棄一些像素資訊。舉例來說，我們的眼睛對於每種顏色的敏感度各有不同，這表示我們可以運用較少的位元來為部分顏色編碼。因此，一般的圖片最佳化流程大概都是由下列兩個步驟組成：

1. 圖片經過[失真](http://en.wikipedia.org/wiki/Lossy_compression)篩選器處理，以除去部分像素資料
1. 圖片經過[無失真](http://en.wikipedia.org/wiki/Lossless_compression)篩選器處理，以壓縮像素資料

**您可自行決定是否要進行第一個步驟，實際採用的演算法會依據特定圖片格式有所差異。不過，請記得任何圖片都可以經過失真壓縮處理，藉此縮減大小。** 事實上，執行失真和無失真壓縮步驟時，各種圖片格式 (例如 GIF、PNG、JPEG 等) 的差異會因為搭配 (或略過) 特定演算法而有所不同。

那麼，什麼才是「最佳」的失真和無失真最佳化設定? 答案取決於圖片內容和您自訂的條件。例如，您在面對龐大的檔案大小和因為採用失真壓縮而產生的視覺雜訊，對於兩者之間的取捨：在某些情況下，您可能會略過失真最佳化步驟，以便完整傳達精緻的細節；在其他情況下，您可能可以採用較為積極的失真最佳化步驟，藉此縮減圖片資產的檔案大小。我們並沒有一體適用的完美設定，您必須自行依當時情況做出正確的判斷。

<img src="images/save-for-web.png" class="center" alt="儲存為網頁用">

舉個簡單的例子，在使用 JPEG 等失真格式時，壓縮程式通常會提供一個可自訂的「品質」設定 (例如 Adobe Photoshop 中的「儲存為網頁用」功能提供的品質滑桿)。該設定通常是介於 1 和 100 之間的數字，用於控制特定的失真和無失真演算法組合的內部工作。為了獲得最佳效果，請大膽試驗圖片的不同品質設定，不必擔心品質下降，因為這麼做的視覺效果通常非常好，而檔案大小可能會大幅減少。

{% include modules/remember.liquid title="Note" list=page.notes.quality %}


##選擇正確的圖片格式

{% include modules/takeaway.liquid list=page.key-takeaways.formats %}

除了不同的失真壓縮演算法和無失真壓縮演算法之外，不同的圖片格式支援不同的功能，例如動畫和透明度 (alpha) 頻道。因此，為特定圖片選擇「正確的格式」時，必須同時考量預期視覺效果和功能兩方面的要求。


<table class="table-4">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>格式</th>
    <th>透明度</th>
    <th>動畫</th>
    <th>瀏覽器</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="格式"><a href="http://en.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="透明度">支援</td>
  <td data-th="動畫">支援</td>
  <td data-th="瀏覽器">所有</td>
</tr>
<tr>
  <td data-th="格式"><a href="http://en.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="透明度">支援</td>
  <td data-th="動畫">不支援</td>
  <td data-th="瀏覽器">所有</td>
</tr>
<tr>
  <td data-th="格式"><a href="http://en.wikipedia.org/wiki/JPEG">JPEG</a></td>
  <td data-th="透明度">不支援</td>
  <td data-th="動畫">不支援</td>
  <td data-th="瀏覽器">所有</td>
</tr>
<tr>
  <td data-th="格式"><a href="http://en.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="透明度">支援</td>
  <td data-th="動畫">支援</td>
  <td data-th="瀏覽器">IE</td>
</tr>
<tr>
  <td data-th="格式"><a href="http://en.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="透明度">支援</td>
  <td data-th="動畫">支援</td>
  <td data-th="瀏覽器">Chrome、Opera、Android</td>
</tr>
</tbody>
</table>

最普遍廣受支援的三種格式分別是：GIF、PNG 和 JPEG。除了這些格式之外，某些瀏覽器還支援 WebP 和 JPEG XR 等較新的格式，可以提供更好的整體壓縮效果以及更多的功能。那麼，您應該使用哪種格式呢？

<img src="images/format-tree.png" class="center" alt="儲存為網頁用">

1. **是否需要動畫？ 如果需要，GIF 是唯一的通用選擇。**
  * GIF 限制調色盤最多為 256 色，這對於大多數圖片都不是好選擇。此外，PNG-8 透過小調色盤為圖片提供更好的壓縮比例。因此，當您需要動畫時，GIF 才是正確的選擇。
1. ** 是否需要使用最高的解析度保留精細的細節？ 請使用 PNG。**
  * 除了選擇調色盤大小，PNG 並不採用任何失真壓縮演算法。因此，產生的圖片品質最高，但代價是檔案大小明顯高於其他格式。請謹慎使用。
  * 如果圖片資產包含由幾何圖形組成的圖片，請考慮將其轉換成向量 (SVG) 格式！
  * 如果圖片資產包含文字，請停下來重新考慮。圖片中的文字無法選取、搜尋或「縮放」。如果需要顯示自訂的外觀 (因為品牌塑造或其他原因)，則應使用網路字型。
1. **是否要最佳化照片、螢幕擷圖或類似的圖片資源？ 請使用 JPEG。**
  * JPEG 混合使用失真最佳化和無失真最佳化，藉此縮減圖片資產的檔案大小。請嘗試幾種 JPEG 品質水準，為圖片資產找到品質和檔案大小的最佳平衡點。

最後，確定每個資產的最佳圖片格式和設定之後，請考慮增加一個以 WebP 和 JPEG XR 編碼的版本。這兩種格式都是新格式，不過很遺憾，這兩種格式尚未獲得所有瀏覽器的普遍支援，但是可以為較新的用戶端大幅節省資源。舉例來說，與可比較的 JPEG 圖片相比，WebP 平均可以[使檔案大小縮減 30%](https://developers.google.com/speed/webp/docs/webp_study)。

因為 WebP 和 JPEG XR 都未獲得普遍支援，您需要為應用程式或伺服器額外增加一個邏輯，以放送適合的資源：

* 某些 CDN 提供圖片最佳化服務，包括放送 JPEG XR 和 WebP。
* 某些開放原始碼的工具 (例如 PageSpeed for Apache 或 PageSpeed for Nginx) 可將最佳化、轉換及放送適合資源的作業自動化。
* 您可以額外新增應用程式邏輯來偵測用戶端、檢查用戶端支援的格式，並放送最適合的圖片格式。

最後請注意，如果您使用 Webview 在原生應用程式中轉譯內容，將可以完全控制用戶端，並獨佔使用 WebP！ Facebook、Google+ 和許多其他應用程式都使用 WebP 放送應用程式內的所有圖片，省下的資源絕對讓您感到物超所值。如要瞭解 WebP 的詳細資訊，請觀看 Google I/O 2013 的 [WebP：部署更快、更小、更絢麗的圖片](https://www.youtube.com/watch?v=pS8udLMOOaE)演講。


## 工具和參數微調

天底下並沒有任何適用於所有圖片的完美圖片格式、工具或最佳化參數集。為了獲得最佳效果，您必須根據圖片內容、視覺和其他技術要求，選擇格式及其設定。

<table class="table-2">
<colgroup><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>工具</th>
    <th>說明</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="工具"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="說明">建立及最佳化 GIF 圖片</td>
</tr>
<tr>
  <td data-th="工具"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="說明">最佳化 JPEG 圖片</td>
</tr>
<tr>
  <td data-th="工具"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="說明">無失真 PNG 最佳化</td>
</tr>
<tr>
  <td data-th="工具"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="說明">失真 PNG 最佳化</td>
</tr>
</tbody>
</table>


請大膽試驗每個壓縮程式的參數。不妨降低品質，看看效果如何，然後取消重來。當您發現一組美觀的設定之後，即可對網站上其他類似圖片套用這些設定。但是，切勿認為您必須使用相同設定來壓縮所有圖片。


## 提供縮放的圖片資產

{% include modules/takeaway.liquid list=page.key-takeaways.scaled-images %}

圖片最佳化可以歸納為兩個標準：將用於為每個圖片像素進行編碼的位元組數最佳化，以及將像素總數最佳化：圖片的檔案大小就是像素總數乘以用於為每個像素進行編碼的位元組數。專注在這兩方面就對了！

因此，最簡單有效的圖片最佳化方法就是，確保我們提供的像素剛好可以在瀏覽器中以所需大小顯示資產。聽起來很簡單，是嗎？ 只可惜，大多數網頁的許多圖片資產都達不到這個要求：一般來說，網頁會提供較大的資產，然後任由瀏覽器進行重新縮放 (這也會佔用額外的 CPU 資源)，並以較低的解析度顯示。

<img src="images/resized-image.png" class="center" alt="已調整大小的圖片">

{% include modules/remember.liquid title="Note" list=page.notes.resized %}

提供超額的像素不僅會導致額外的間接成本，通常最後下場都是讓瀏覽器代替我們重新縮放圖片，而我們也因此錯失絕佳機會，無法縮減及最佳化轉譯網頁所需得總位元組數。另外請注意，大小調整不僅是減少圖片像素數的功能，同時也可以縮減自然大。

<table class="table-3">
<colgroup><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>自然大小</th>
    <th>顯示大小</th>
    <th>不必要的像素數</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="自然">110 x 110</td>
  <td data-th="顯示">100 x 100</td>
  <td data-th="間接成本">110 x 110 - 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="自然">410 x 410</td>
  <td data-th="顯示">400 x 400</td>
  <td data-th="間接成本">410 x 410 - 400 x 400 = 8100</td>
</tr>
<tr>
  <td data-th="自然">810 x 810</td>
  <td data-th="顯示">800 x 800</td>
  <td data-th="間接成本">810 x 810 - 800 x 800 = 16100</td>
</tr>
</tbody>
</table>

請注意，在上述這三種情況下，顯示大小只比圖片的自然大小「小 10 個像素」。但是，自然大小越大，我們必須編碼及提供的額外像素數就會明顯增加！ 因此，儘管您也許無法保證每個資產都以精確的顯示大小提供，但是，**您應確保不必要的像素數降到最低，並確保較大資產盡可能以接近顯示大小提供。**

## 圖片最佳化檢查表

圖片最佳化不僅是藝術，也是一門科學。這是藝術，因為每個圖片都獨一無二，要如何才可將圖片妥善壓縮，我們沒有絕對的答案。這同時也是科學，因為目前已有開發完善的技術和演算法，可以大幅降低圖片大小。

在最佳化圖片時，請記住下列技巧和方法：

* **優先選用向量格式：**向量圖片不受解析度和縮放程度影響，最適用於多裝置或高解析度的情況。
* **縮減及壓縮 SVG 資源：**大多數繪圖應用程式產生的 XML 標記通常包含不必要的中繼資料，可以放心刪除；請確保伺服器設定為對 SVG 資產採用 GZIP 壓縮。
* **選擇最佳點陣圖片格式：**確定功能要求，然後選擇適合每個特定資產的格式。
* **試驗點陣格式的最佳品質設定：**請大膽降低「品質」設定，效果通常非常好，節省的位元組可能會很可觀。
* **刪除不必要的圖片中繼資料：**許多點陣圖片包含不必要的資產中繼資料：地理資訊、相機資訊等。請使用適合的工具刪除這些資料。
* **提供可縮放的圖片：**調整伺服器上的圖片大小，確保「顯示」大小盡可能接近圖片的「自然」大小。請特別留意較大的圖片，因為調整這些圖片的大小時，通常會產生最大的間接成本！
* **自動化、自動化、自動化：**請投資自動化工具和基礎設施，如此可以確保所有圖片資產一定會經過最佳化。


{% include modules/nextarticle.liquid %}

{% endwrap %}

