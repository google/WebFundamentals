project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 大多數的網站並未針對多裝置體驗進行最佳化。快來瞭解基礎知識，讓您的網站適用於行動裝置、桌上型電腦或任何附有螢幕的裝置。

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# 回應式網頁設計基礎 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


透過行動裝置上網的使用者數量正以難以想像的速度暴增，但是大多數的網站並未針對行動裝置進行最佳化。礙於行動裝置的螢幕大小，開發人員必須針對行動裝置螢幕上的內容另行編排。


{% comment %}
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
{% endcomment %}


{% include "web/_shared/udacity/ud893.html" %}




手機、平板手機、平板電腦、桌上型電腦、遊戲機、電視，甚至是穿戴式裝置的螢幕大小五花八門，各有不同。螢幕大小總是日新月異，因此您的網站如何在今日或未來隨時因應調整，顯得更為重要。


  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>


回應式網頁設計最早是由 [A List Apart 的 Ethan Marcotte](http://alistapart.com/article/responsive-web-design/){: .external} 所定義，這項設計可針對使用者的需求和其所使用的裝置做出回應。版面配置會隨著裝置的螢幕大小和功能變動。舉例來說，使用者在手機上會看到以一欄顯示的內容；在平板電腦上則會看到以兩欄顯示的相同內容。


## 設定檢視區

在針對多種裝置最佳化的網頁中，文件的標題必須包含中繼檢視區元素。中繼檢視區標記可指示瀏覽器如何控制網頁的大小和縮放。




### TL;DR {: .hide-from-toc }
- 使用中繼檢視區標記控制瀏覽器檢視區寬度和縮放比例。
- 納入 <code>width=device-width</code> 即可運用裝置獨立像素配合螢幕寬度。
- 納入 <code>initial-scale=1</code> 即可在 CSS 像素和裝置獨立像素之間建立 1:1 的關係。
- 啟用允許使用者縮放的功能，確認您的網頁可供存取。


為了嘗試提供最佳體驗，行動瀏覽器會採用桌上型電腦螢幕寬度顯示網頁 (通常是 980px 左右，不同裝置各有差異)，然後再透過放大字型和將內容縮放為螢幕大小等方法，試著讓內容更容易閱讀。對於使用者來說，這表示字型可能會看起來不一致。當要查看內容或進行互動時，他們必須輕按兩下或以雙指撥動縮放內容。


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


使用中繼檢視區值 `width=device-width` 即可運用裝置獨立像素配合螢幕寬度。採用這項做法後，無論網頁是在小型行動裝置或大型桌上型電腦顯示器顯示，都可隨著不同的螢幕大小靈活編排內容。

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Page without a viewport set">
    <figcaption>
      Page without a viewport set
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
    <img src="imgs/vp.png" srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Page with a viewport set">
    <figcaption>
      Page with a viewport set
     </figcaption>
  </figure>
  </a>
</div>

當裝置變為橫向模式時，部分瀏覽器不會將內容重新編排以符合螢幕大小，而是維持網頁寬度並進行縮放。新增 `initial-scale=1` 屬性可指示瀏覽器在 CSS 像素和裝置獨立像素之間建立 1:1 的關係 (無論裝置方向為何)，並允許網頁充分運用橫向寬度。

Note: 使用半形逗號 (,) 分隔屬性，確保舊版瀏覽器可以正確剖析屬性。

### 確認檢視區可供使用

除了設定 `initial-scale` 以外，您也可以在檢視區設定下列屬性：

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

設定完成後，這些屬性可能會停用使用者縮放檢視區的權限，導致協助工具發生問題。


## 依照檢視區大小調整內容

使用者習慣在桌上型電腦和行動裝置上垂直捲動網站，如果強迫使用者以水平捲動或縮放的方式瀏覽整個網頁，將會導致不良的使用者體驗。


### TL;DR {: .hide-from-toc }
- 請勿使用大型固定寬度元素。
- 應避免內容必須依賴特定檢視區寬度才能正常顯示的情況。
- 使用 CSS 媒體查詢以針對不同大小的螢幕套用不同的樣式。


當您開發包含 `meta viewport` 標記的行動裝置網站時，一不小心就會建立不符合指定檢視區的網頁內容。舉例來說，顯示寬度超過檢視區的圖片時，將會導致檢視區變為水平捲動模式。這時您應將內容調整為符合檢視區的寬度，以免使用者必須以水平捲動方式瀏覽網頁。

因為各裝置 CSS 像素的螢幕大小和寬度大不相同 (例如手機和平板電腦之間，甚至是各家手機都有差異)，建議您不要將內容設為依據特定檢視區寬度，才能確保內容正常顯示。

如果針對網頁元素設定大型絕對 CSS 寬度 (例如下方示例)，將會導致 `div` 過寬而無法在較窄的裝置正確顯示 (例如 iPhone 這類 CSS 像素寬度為 320 的裝置)。因此，建議您不妨考慮使用相對寬度值，例如 `width: 100%`。相同地，使用大型絕對定位值時也請留意，因為這類值會導致元素超過小螢幕上的檢視區。

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-iph.png" class="attempt-left" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Page with a 344px fixed width element on an iPhone.">
    <figcaption>
      Page with a 344px fixed width element on an iPhone.
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-n5.png" class="attempt-right" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Page with a 344px fixed width element on a Nexus 5.">
    <figcaption>
      Page with a 344px fixed width element on a Nexus 5.
     </figcaption>
  </figure>
  </a>
</div>


## 使用 CSS 媒體查詢提升回應成效

媒體查詢是可套用到 CSS 樣式的簡易篩選器。透過媒體查詢即可輕鬆依據顯示內容的裝置特性 (包括顯示器類型、寬度、高度、方向，甚至是解析度) 變更樣式。




### TL;DR {: .hide-from-toc }
- 媒體查詢可用來依據裝置特性套用樣式。
- 使用 <code>min-width</code> (而不是 <code>min-device-width</code>) 以確保獲得最通用的體驗。
- 針對元素使用相對大小，避免版面走樣。



舉例來說，您可將所有必要的列印樣式放在列印媒體查詢中：


    <link rel="stylesheet" href="print.css" media="print">
    

除了在樣式表連結中使用 `media` 屬性以外，您還可透過其他兩種方法套用可嵌入 CSS 檔案的媒體查詢：`@media` 和 `@import`。基於成效考量，建議您優先使用前兩個方法，盡量避免使用 `@import` 語法 (請參閱 [避免 CSS 匯入](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations))。


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

媒體查詢的邏輯並不是互相排斥的，而且對於任何符合條件的篩選器，查詢到的 CSS 區塊都會使用標準的 CSS 運算順序套用。

## 根據檢視區大小套用媒體查詢

媒體查詢可讓我們建立回應式的體驗，也就是針對各種大小的螢幕套用特定的樣式。媒體查詢的語法可讓我們建立依據裝置特性套用的規則。


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

雖然我們可以查詢很多不同的項目，但是回應式網頁設計最常用的是 `min-width`、`max-width`、`min-height` 和 `max-height`。


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
      <td data-th="結果">任何超過查詢中指定寬度的瀏覽器都會套用規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>max-width</code></td>
      <td data-th="結果">任何未超過查詢中指定寬度的瀏覽器都會套用規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>min-height</code></td>
      <td data-th="結果">任何超過查詢中指定高度的瀏覽器都會套用規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>max-height</code></td>
      <td data-th="結果">任何未超過查詢中指定高度的瀏覽器都會套用規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>orientation=portrait</code></td>
      <td data-th="結果">任何高度大於或等於寬度的瀏覽器都會套用規則。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>orientation=landscape</code></td>
      <td data-th="結果">任何寬度大於高度的瀏覽器都會套用規則。</td>
    </tr>
  </tbody>
</table>

讓我們看看示例：

<figure>
  
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="當網頁大小變更時，使用媒體查詢變更屬性的預覽畫面">
  
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* 當瀏覽器寬度介於 <b>0px</b> 和 <b>640px</b>，將會套用 `max-640px.css`。
* 當瀏覽器寬度介於 <b>500px</b> 和 <b>600px</b>，將會套用 `@media`。
* 當瀏覽器寬度為 <b>640px 以上</b>，將會套用 `min-640px.css`。
* 當瀏覽器<b>寬度大於高度</b>，將會套用 `landscape.css`。
* 當瀏覽器<b>高度大於寬度</b>，將會套用 `portrait.css`。


###`min-device-width` 注意事項

您也可以依據 `*-device-width` 建立查詢 (但我們**非常不建議**這麼做)。

雖然差異很細微，但卻非常重要：`min-width` 是依據瀏覽器視窗大小，而 `min-device-width` 則是依據螢幕大小。很遺憾的是，部分瀏覽器 (包括舊版 Android 瀏覽器) 會因為無法正確回報裝置寬度，改以裝置像素回報螢幕大小，而不是回報預期的檢視區寬度。

此外，使用 `*-device-width` 可以防止內容在允許變更視窗大小的桌上型電腦或其他裝置上隨之調整，因為查詢是依據實際的裝置大小，而不是瀏覽器視窗的大小。

### 使用相對單元

不同於固定寬度版面配置，回應式網頁設計背後的主要概念著重於流暢度和完美比例。使用相對單位進行評估，有助於簡化版面配置並防止意外建立超過檢視區大小的元件。

舉例來說，在頂層 div 設定 width: 100% 可確保檢視區寬度會隨螢幕調整，而且永遠不會過大或過小。無論是寬度為 320px 的 iPhone、342px 的 Blackberry Z10 或 360px 的 Nexus 5，div 都可符合各種大小。

此外，使用相對單位也可讓瀏覽器依據使用者的縮放比例顯示內容，不需在網頁上新增水平捲動軸。

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

