project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 創建靈活設計，而不是固定的設計,佈局。並且能夠在任何尺寸的屏幕正常運行。

{# wf_updated_on: 2016-05-13 #}
{# wf_published_on: 2014-04-29 #}

# 響應用戶界面 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


Translated By: 

{% include "web/_shared/contributors/henrylim.html" %}



<div>
  <div class="attempt-right">
    創建靈活設計，而不是固定的設計,佈局。並且能夠在任何尺寸的屏幕正常運行。
  </div>
 
{% include "web/_shared/udacity/ud893.html" %}


</div>


## 設置視口 


對於針對各種設備優化過的網頁，其文檔標頭中必須包含元視口元素。元視口代碼會指示瀏覽器如何對網頁尺寸和縮放比例進行控制。




### TL;DR {: .hide-from-toc }
- 使用元視口代碼控制瀏覽器視口的寬度和縮放比例。
- 添加 <code>width=device-width</code> 以便與屏幕寬度（以設備無關像素爲單位）進行匹配。
- 添加 <code>initial-scale=1</code> 以便將 CSS 像素與設備無關像素的比例設爲 1:1。
- 確保在不停用用戶縮放功能的情況下，您的網頁也可以訪問。


爲了提供最佳體驗，移動瀏覽器會以桌面設備的屏幕寬度（通常大約爲 980 像素，但不同設備可能會有所不同）來呈現網頁，然後再增加字體大小並將內容調整爲適合屏幕的大小，從而改善內容的呈現效果。對用戶來說，這就意味着，字體大小可能會不一致，他們必須點按兩次或張合手指進行縮放，才能查看內容並與之互動。


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


使用元視口值 width=device-width 指示網頁與屏幕寬度（以設備無關像素爲單位）進行匹配。這樣一來，網頁便可以重排內容，使之適合不同的屏幕大小（從較小的手機到較大的桌面設備顯示器，不一而足）。

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" class="attempt-left" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="未設置視口的網頁">
    <figcaption>
          查看示例
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
<img src="imgs/vp.png" class="attempt-right"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="已設置視口的網頁">
    <figcaption>
          查看示例
     </figcaption>
  </figure>
  </a>
</div>

有些瀏覽器會在旋轉到橫向模式時保持固定的網頁寬度，然後通過縮放（而不是重排）填滿屏幕。添加屬性 initial-scale=1 會指示瀏覽器在不考慮設備方向的情況下，指示瀏覽器將 CSS 像素與設備無關像素的比例設爲 1:1，並允許網頁完全佔用橫向寬度。

Note: 使用英文逗號分隔屬性，確保舊版瀏覽器可以準確解析相關屬性。

### 確保視口可以訪問

除了設置 initial-scale 外，您還可以在視口上設置以下屬性：

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

但是，設置後，這些屬性可以停用用戶縮放視口的功能，可能會造成網頁訪問方面的問題。


## 調整內容大小，使其適合視口

無論在桌面設備上還是在移動設備上，用戶都習慣上下滾動網站，而不是橫向滾動，因此，如果用戶必須橫向滾動或縮小頁面才能查看整個網頁，那麼這將給用戶帶來糟糕的體驗。


### TL;DR {: .hide-from-toc }
- 請勿使用較大的固定寬度元素。
- 在任何視口寬度下，內容均應正常顯示。
- 使用 CSS 媒體查詢爲不同尺寸的屏幕應用不同樣式。


使用 meta viewport 代碼開發移動版網站時，開發者很容易在無意間創建出不太適合指定視口的網頁內容。例如，如果圖片寬度大於視口寬度，那麼就會導致視口橫向滾動。您應該調整此內容，使其適合視口內的寬度，以便用戶無需橫向滾動。

由於不同設備（例如手機和平板電腦，甚至不同手機之間）的屏幕尺寸和寬度（以 CSS 像素爲單位）差別很大，因此內容不應只在特定視口下正常顯示。

爲網頁元素設置較大的 CSS 絕對寬度（如下例所示）會導致 div 因過寬而不適合窄視口設備（例如，iPhone 等寬度爲 320 CSS 像素的設備）。因此，請改爲使用相對寬度值，例如 width: 100%。同樣請注意，使用較大的絕對定位值可能會使元素脫離小屏幕上的視口。

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
      <img src="imgs/vp-fixed-iph.png" class="attempt-left" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="iPhone 上帶有 344 像素的固定寬度元素的網頁。">
    <figcaption>
      查看示例
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
      <img src="imgs/vp-fixed-n5.png" class="attempt-right" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Nexus 5 上帶有 344 像素的固定寬度元素的網頁。">
    <figcaption>
      查看示例
     </figcaption>
  </figure>
  </a>
</div>


## 將 CSS 媒體查詢用於自適應設計

媒體查詢是可應用於 CSS 樣式的簡單過濾器。有了這些過濾器，我們可以根據設備呈現內容的特點輕鬆更改樣式，包括顯示屏類型、寬度、高度、方向甚至是分辨率。




### TL;DR {: .hide-from-toc }
- 媒體查詢可用於根據設備特點應用樣式。
- 優先使用 <code>min-width</code>（而非 <code>min-device-width</code>），以確保實現最寬闊的視覺體驗。
- 爲元素使用相對尺寸，以免破壞版式完整性。



例如，您可以將打印必需的所有樣式放在打印媒體查詢中：


    <link rel="stylesheet" href="print.css" media="print">
    

除了在樣式錶鏈接中使用 media 屬性之外，我們還可以通過另外兩種方法應用可以嵌入 CSS 文件的媒體查詢：@media 和 @import。出於性能方面的考慮，我們建議開發者優先考慮使用前兩種方法，儘量避免使用 @import 語法（請參閱[避免 CSS 導入](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)）。


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

不同媒體查詢適用的邏輯並不是互斥的，因此，開發者可以根據 CSS 中優先級的標準規則，應用滿足生成的 CSS 區塊標準的任何過濾器。

### 根據視口大小應用媒體查詢

通過媒體查詢，我們可以打造自適應體驗，使特定樣式可應用於小屏幕、大屏幕和介於兩者之間的屏幕。通過媒體查詢語法，我們可以創建可根據設備特點應用的規則。


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

儘管我們可以查詢多個不同的項目，但自適應網頁設計最常使用的項目爲：min-width、max-width、min-height 和 max-height。


<table>
    <thead>
    <tr>
      <th data-th="屬性">屬性</th>
      <th data-th="結果">結果</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="屬性"><code>min-width</code></td>
      <td data-th="結果">當任意瀏覽器寬度大於查詢中定義的值時適用的規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>max-width</code></td>
      <td data-th="結果">當任意瀏覽器寬度小於查詢中定義的值時適用的規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>min-height</code></td>
      <td data-th="結果">當任意瀏覽器高度大於查詢中定義的值時適用的規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>max-height</code></td>
      <td data-th="結果">當任意瀏覽器高度小於查詢中定義的值時適用的規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>orientation=portrait</code></td>
      <td data-th="結果">高度大於或等於寬度的任意瀏覽器適用的規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>orientation=landscape</code></td>
      <td data-th="結果">寬度大於高度的任意瀏覽器適用的規則。</td>
    </tr>
  </tbody>
</table>

我們通過一個示例瞭解一下：

<figure>
  
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="預覽使用媒體查詢的網頁，以便在調整尺寸時更改屬性。">
  
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* 當瀏覽器寬度介於 <b>0 像素</b>和 <b>640 像素</b>之間時，系統將會應用 max-640px.css。
* 當瀏覽器寬度介於 <b>500 像素</b>和 <b>600 像素</b>之間時，系統將會應用 @media。
* 當瀏覽器寬度爲 <b>640 像素或大於此值</b>時，系統將會應用 min-640px.css。
* 當瀏覽器<b>寬度大於高度</b>時，系統將會應用 landscape.css。
* 當瀏覽器<b>高度大於寬度</b>時，系統將會應用 portrait.css。


### min-device-width 注意事項

儘管開發者也可以根據 *-device-width 創建查詢，但是我們**強烈建議不要這麼做**。

這兩種代碼的差別雖然不明顯但卻十分重要：min-width 以瀏覽器窗口尺寸爲依據，而 min-device-width 卻是以屏幕尺寸爲依據。很遺憾，有些瀏覽器（包括舊版 Android 瀏覽器）可能無法正確報告設備寬度，反而會以預期的視口寬度報告屏幕尺寸（以設備像素爲單位）。

此外，使用 *-device-width 會阻止內容適應允許窗口調整大小的桌面設備或其他設備，因爲該查詢基於設備的實際大小，而非瀏覽器窗口大小。

### 使用相對單位

與固定寬度的版式相比，自適應設計的主要概念基礎是流暢性和比例可調節性。使用相對衡量單位有助於簡化版式，並防止無意間創建對視口來說過大的組件。

例如，在頂級 div 上設置 width: 100% 可以確保其橫跨視口的寬度，對視口來說既不會太大也不會太小。無論設備是寬度爲 320 像素的 iPhone、寬度爲 342 像素的 Blackberry Z10，還是寬度爲 360 像素的 Nexus 5，div 均會適合這些屏幕。

此外，使用相對單位可讓瀏覽器根據用戶縮放程度呈現內容，而無需爲網頁添加橫向滾動條。

<span class="compare-worse">Not recommended</span> — fixed width

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span> — responsive width

    div.fullWidth {
      width: 100%;
    }


## 如何選擇斷點

儘管根據設備類定義斷點的方法可能很有用，但請慎用這種方法。如果根據具體設備、產品、品牌名稱或現今正在使用的操作系統定義斷點，後期維護起來可能會困難重重。相反，內容本身應該確定版式調整方式，使其適合自己的容器。



### TL;DR {: .hide-from-toc }
- 根據內容創建斷點，絕對不要根據具體設備、產品或品牌來創建。
- 從針對最小的移動設備進行設計入手，然後隨着屏幕類型不斷增加而逐漸改善體驗。
- 使每行的文字最多爲 70 或 80 個字符左右。


### 以從小屏幕開始、不斷擴展的方式選擇主要斷點

先針對小屏幕尺寸進行內容設計，然後擴展至不同尺寸的屏幕，直到必須添加斷點爲止。如此一來，您便可以根據內容優化斷點，並使斷點數量降至最低。

我們來分析一下在開頭部分看到的示例[天氣預報](/web/fundamentals/design-and-ux/responsive/)。
首先使天氣預報在較小的屏幕上呈現效果良好。

<figure>
  
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="在較小的屏幕上預覽天氣預報的顯示效果。">
  
</figure>

接下來，調整瀏覽器大小，直到元素之間的空間過大，天氣預報根本無法正常顯示爲止。具體應調整到多大是由自己主觀決定的，但超過 600 像素肯定就過寬了。

<figure>
  
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="在網頁逐漸變寬時預覽天氣預報的顯示效果。">
  
</figure>

要在 600 像素處插入斷點，請新建兩個樣式表，一個在瀏覽器不超過 600 像素時使用，另一個在超過 600 像素時使用。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

最後，重新設計 CSS。在本例中，我們已將常用的樣式（例如字體、圖標、基本定位和顏色）放入 weather.css。然後，針對小屏幕的特定版式會放入 weather-small.css，而大屏幕樣式則放入 weather-large.css。

<figure>
  
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  
</figure>

### 必要時選擇小斷點

除了選擇主要斷點使版式發生重大變化外，做出適當調整產生微小變化的做法也很有用。例如，進行以下調整可能會很有用：在主要斷點之間調整某個元素的邊距或內邊距，或增加字體大小使其在版式中看起來更自然。

首先優化小屏幕版式。在本例中，當視口寬度超過 360 像素時，我們來增加字體大小。接下來，當有足夠的空間時，我們可以將高溫和低溫分隔開，使其在同一行中顯示，而不是以上下排列的形式顯示。然後，我們來調大天氣圖標。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm"   adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
    <figcaption>
      Before adding minor breakpoints.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
    <figcaption>
      After adding minor breakpoints.
     </figcaption>
  </figure>
</div>


<div style="clear:both;"></div>

同樣，如果是大屏幕，我們最好限制天氣預報面板的寬度，使其不會佔用整個屏幕寬度。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg"   adjust_indentation="auto" %}
</pre>

### 優化文本，提高可讀性

傳統的可讀性理論建議：理想欄目的每一行應該包含 70 到 80 個字符（大約 8 到 10 個英文單詞），因此，每次文本塊寬度超過 10 個單詞時，就應考慮添加斷點。

<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="添加小斷點之前。">
    <figcaption>Before adding minor breakpoints.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="添加小斷點之後。">
    <figcaption>After adding minor breakpoints.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

我們來深入分析一下上述博文示例。在較小的屏幕上，大小爲 1em 的 Roboto 字體可以使每行完美地呈現 10 個單詞，而在較大的屏幕上就需要添加斷點了。在本例中，如果瀏覽器寬度超過了 575 像素，那麼內容的理想寬度是 550 像素。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading"   adjust_indentation="auto" %}
</pre>

### 絕不能完全隱藏內容

在根據屏幕大小選擇要隱藏或顯示的內容時請務必謹慎。
不要只是因爲內容無法適合屏幕而將其隱藏。屏幕大小並非確定用戶需求的決定性因素。例如，如果去除天氣預報中的花粉統計數據，那麼對春天容易過敏的用戶來說就是非常嚴重的問題，因爲這些用戶要根據這類信息決定是否外出。







