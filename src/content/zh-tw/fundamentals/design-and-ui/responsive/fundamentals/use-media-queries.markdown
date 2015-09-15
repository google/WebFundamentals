---
title: "使用 CSS 媒體查詢提升回應成效"
description: "大多數的網站並未針對多裝置體驗進行最佳化。快來瞭解基礎知識，讓您的網站適用於行動裝置、桌上型電腦或任何附有螢幕的裝置。"
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - 使用中繼檢視區標記控制瀏覽器檢視區寬度和縮放比例。
    - 納入 <code>width=device-width</code> 即可運用裝置獨立像素配合螢幕寬度。
    - 納入 <code>initial-scale=1</code> 即可在 CSS 像素和裝置獨立像素之間建立 1:1 的關係。
    - 啟用允許使用者縮放的功能，確認您的網頁可供存取。
  size-content-to-vp:
    - 請勿使用大型固定寬度元素。
    - 應避免內容必須依賴特定檢視區寬度才能正常顯示的情況。
    - 使用 CSS 媒體查詢以針對不同大小的螢幕套用不同的樣式。
  media-queries:
    - 媒體查詢可用來依據裝置特性套用樣式。
    - 使用 <code>min-width</code> (而不是 <code>min-device-width</code>) 以確保獲得最通用的體驗。
    - 針對元素使用相對大小，避免版面走樣。
  choose-breakpoints:
    - 依據內容建立中斷點 (切勿依據特定裝置、產品或品牌。
    - 先為最小的行動裝置設計，等到要擴展到更大的螢幕時，再陸續提升使用體驗。
    - 將每行文字保持在大約最多 70 或 80 個字元的長度。
notes:
  use-commas:
    - "使用半形逗號 (,) 分隔屬性，確保舊版瀏覽器可以正確剖析屬性。"
---
<p class="intro">
  媒體查詢是可套用到 CSS 樣式的簡易篩選器。透過媒體查詢即可輕鬆依據顯示內容的裝置特性 (包括顯示器類型、寬度、高度、方向，甚至是解析度) 變更樣式。
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.media-queries %}


舉例來說，您可將所有必要的列印樣式放在列印媒體查詢中：

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

除了在樣式表連結中使用 `media` 屬性以外，您還可透過其他兩種方法套用可嵌入 CSS 檔案的媒體查詢：`@media` 和 `@import`。基於成效考量，建議您優先使用前兩個方法，盡量避免使用 `@import` 語法 (請參閱 [避免 CSS 匯入]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html))。

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

媒體查詢的邏輯並不是互相排斥的，而且對於任何符合條件的篩選器，查詢到的 CSS 區塊都會使用標準的 CSS 運算順序套用。

## 根據檢視區大小套用媒體查詢

媒體查詢可讓我們建立回應式的體驗，也就是針對各種大小的螢幕套用特定的樣式。媒體查詢的語法可讓我們建立依據裝置特性套用的規則。

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

雖然我們可以查詢很多不同的項目，但是回應式網頁設計最常用的是 `min-width`、`max-width`、`min-height` 和 `max-height`。


<table class="mdl-data-table mdl-js-data-table">
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
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="當網頁大小變更時，使用媒體查詢變更屬性的預覽畫面">
  {% endlink_sample %}
</figure>

{% include_code src=_code/media-queries.html snippet=mqueries %}

* 當瀏覽器寬度介於 <b>0px</b> 和 <b>640px</b>，將會套用 `max-640px.css`。
* 當瀏覽器寬度介於 <b>500px</b> 和 <b>600px</b>，將會套用 `@media`。
* 當瀏覽器寬度為 <b>640px 以上</b>，將會套用 `min-640px.css`。
* 當瀏覽器<b>寬度大於高度</b>，將會套用 `landscape.css`。
* 當瀏覽器<b>高度大於寬度</b>，將會套用 `portrait.css`。


##`min-device-width` 注意事項

您也可以依據 `*-device-width` 建立查詢 (但我們**非常不建議**這麼做)。

雖然差異很細微，但卻非常重要：`min-width` 是依據瀏覽器視窗大小，而 `min-device-width` 則是依據螢幕大小。很遺憾的是，部分瀏覽器 (包括舊版 Android 瀏覽器) 會因為無法正確回報裝置寬度，改以裝置像素回報螢幕大小，而不是回報預期的檢視區寬度。

此外，使用 `*-device-width` 可以防止內容在允許變更視窗大小的桌上型電腦或其他裝置上隨之調整，因為查詢是依據實際的裝置大小，而不是瀏覽器視窗的大小。

## 使用相對單元

不同於固定寬度版面配置，回應式網頁設計背後的主要概念著重於流暢度和完美比例。使用相對單位進行評估，有助於簡化版面配置並防止意外建立超過檢視區大小的元件。

舉例來說，在頂層 div 設定 width: 100% 可確保檢視區寬度會隨螢幕調整，而且永遠不會過大或過小。無論是寬度為 320px 的 iPhone、342px 的 Blackberry Z10 或 360px 的 Nexus 5，div 都可符合各種大小。

此外，使用相對單位也可讓瀏覽器依據使用者的縮放比例顯示內容，不需在網頁上新增水平捲動軸。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



