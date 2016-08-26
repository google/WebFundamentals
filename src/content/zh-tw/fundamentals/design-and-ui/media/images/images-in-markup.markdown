---
title: "標記中的圖片"
description: "`img` 元素功能非常強大，不但可下載、解碼，還可以顯示內容，現代的瀏覽器大多支援各式的圖片格式。"
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - 針對圖片使用相對大小可避免圖片意外超出容器。
    - 當您想依據裝置特性指定不同圖片時 (上述行為又稱為美學指導)，請使用 <code>picture</code> 元素。
    - 請在 <code>img</code> 元素中使用 <code>srcset</code> 和 <code>x</code> 描述元，藉此提示瀏覽器如何依據不同的螢幕密度選用最佳圖片。
notes:
  picture-support:
    - <code>picture</code> 元素已陸續空降到各個瀏覽器了。
      雖然不是所有瀏覽器都可使用這項元素，我們仍然建議您採用，因為這項元素不僅擁有強大的回溯相容性，最重要的是它運用 <a href="http://picturefill.responsiveimages.org/">Picturefill polyfill</a> 的驚人潛力。
      詳情請參閱 <a href="http://responsiveimages.org/#implementation">ResponsiveImages.org</a> 網站。
  compressive:
    - 請謹慎使用壓縮技術，因為這樣會增加記憶體和解碼時的資源成本。縮小大型圖片以符合較小的螢幕非常耗費系統資源。對於記憶體和處理能力有限的低階裝置來說，這麼做的影響更加嚴重。
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  <code>img</code> 元素功能非常強大，不但可下載、解碼，還可以顯示內容，現代的瀏覽器大多支援各式的圖片格式。與加入桌上型電腦適用的圖片相比，針對各種裝置加入適用圖片的程序並無不同，只要些微調整，就可以創造優異的使用體驗。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## 針對圖片使用相對大小

指定圖片寬度時，請記得使用相對大小以避免圖片意外超出檢視區。舉例來說，`width: 50%` 會讓圖片寬度維持為圖片所在的元素 (不是檢視區或實際像素大小) 的 50%

因為 CSS 允許內容超出容器，您可能需要使用 max-width: 100%，防止圖片和其他內容超出範圍。舉例來說：

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

請務必在 `img` 元素上運用 `alt` 屬性提供簡單明瞭的說明。這些說明可為螢幕閱讀器和其他輔助技術提供支援，讓您的網站成為更好的無障礙空間。

##運用 `srcset` 提升 `img` 以在高 DPI 裝置顯示

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      <code>srcset</code> 屬性可提升 <code>img</code> 元素的行為，讓您輕鬆針對不同的裝置特性提供多個圖片檔案。與 CSS 原生的 <code>image-set</code> <a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS 函式</a>相似，<code>srcset</code> 可讓瀏覽器依據裝置特性選擇最佳圖片。舉例來說，在 2 倍大的螢幕上使用 2 倍大的圖片，或者當網路頻寬有限時，未來也可能在 2 倍大的裝置上使用 1 倍大的圖片。
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

如果瀏覽器不支援 `srcset`，就會直接使用 `src` 屬性指定的預設圖片檔案。因此，請務必納入 1 倍大的圖片，這樣不論裝置的功能是否支援，螢幕上都會顯示圖片。如果瀏覽器支援 `srcset`，在提出任何要求之前，瀏覽器會先剖析以逗號分隔的圖片/條件清單，然後再下載並顯示最適合的圖片。

雖然清單中可以包含像素密度、寬度和高度等條件，目前只有像素密度可獲得完整支援。為了兼顧現有的行為和未來的功能，建議您只在屬性中提供 2 倍大的圖片。

## 運用 `picture` 在回應式圖片中提供美學指導

只要使用 picture 元素，就可根據裝置特性變更圖片 (又稱為美學指導)。<code>picture</code> 元素會定義陳述式解決方案，以便依據不同特性 (例如裝置大小、裝置解析度、方向等) 提供多種版本的圖片。

<img class="center" src="img/art-direction.png" alt="美學指導示例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      當圖片來源有多種解析度，或者當回應式設計針對不同類型的螢幕指定不同的圖片時，請使用 <code>picture</code> 元素。您也可納入與 <code>video</code> 元素相似的 <code>source</code> 元素，以便依據媒體查詢或圖片格式指定不同的圖片檔案。
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

在上述示例中，如果瀏覽器寬度至少為 800px，則會依據裝置解析度使用 `head.jpg` 或 `head-2x.jpg`。如果瀏覽器寬度介於 450px 和 800px，則同樣會依據裝置解析度使用 `head-small.jpg` 或 `head-small-2x.jpg`。在螢幕寬度少於 450px，而且回溯相容功能並未支援 `picture` 元素的情況下，瀏覽器會改為顯示 `img` 元素並應一律納入。

### 相對大小的圖片

在無法得知最終圖片大小的情況下，要為圖片來源指定密度描述元是一件吃力的工作。如果圖片會依據瀏覽器大小和瀏覽器寬度動態調整放大比例，這更是難上加難。

如要讓瀏覽器自動計算最有效的像素密度並下載最佳圖片，建議您不要提供固定的圖片大小和密度，而是透過新增寬度描述元以及 image 元素大小，藉此指定每個提供的圖片大小。

{% include_code src=_code/sizes.html snippet=picture lang=html %}

上面的示例會依據瀏覽器寬度和裝置像素比，顯示大小為檢視區寬度一半 (`sizes="50vw"`) 的圖片，藉此讓瀏覽器選擇適合的圖片，而不會受到瀏覽器視窗大小的影響。舉例來說，下方的表格顯示的是瀏覽器會選擇的圖片：

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="瀏覽器寬度">瀏覽器寬度</th>
      <th data-th="裝置像素比">裝置像素比</th>
      <th data-th="使用的圖片">使用的圖片</th>
      <th data-th="有效解析度">有效解析度</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="瀏覽器寬度">400px</td>
      <td data-th="裝置像素比">1</td>
      <td data-th="使用的圖片"><code>200.png</code></td>
      <td data-th="有效解析度">1x</td>
    </tr>
    <tr>
      <td data-th="瀏覽器寬度">400px</td>
      <td data-th="裝置像素比">2</td>
      <td data-th="使用的圖片"><code>400.png</code></td>
      <td data-th="有效解析度">2x</td>
    </tr>
    <tr>
      <td data-th="瀏覽器寬度">320px</td>
      <td data-th="裝置像素比">2</td>
      <td data-th="使用的圖片"><code>400.png</code></td>
      <td data-th="有效解析度">2.5x</td>
    </tr>
    <tr>
      <td data-th="瀏覽器寬度">600px</td>
      <td data-th="裝置像素比">2</td>
      <td data-th="使用的圖片"><code>800.png</code></td>
      <td data-th="有效解析度">2.67x</td>
    </tr>
    <tr>
      <td data-th="瀏覽器寬度">640px</td>
      <td data-th="裝置像素比">3</td>
      <td data-th="使用的圖片"><code>1000.png</code></td>
      <td data-th="有效解析度">3.125x</td>
    </tr>
    <tr>
      <td data-th="瀏覽器寬度">1100px</td>
      <td data-th="裝置像素比">1</td>
      <td data-th="使用的圖片"><code>1400.png</code></td>
      <td data-th="有效解析度">1.27x</td>
    </tr>
  </tbody>
</table>


### 回應式圖片的中斷點說明

在許多情況中，圖片大小會依據網站版面配置的中斷點而變化。舉例來說，您可能希望圖片在小螢幕上能橫跨整個檢視區寬度，但是圖片在大螢幕上可能只會佔據一小部分。

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

上方示例中的 `sizes` 屬性使用了多個媒體查詢來指定圖片的大小。當瀏覽器寬度大於 600px，圖片會是檢視區寬度的 25%。當瀏覽器寬度介於 500px 和 600px，圖片會是檢視區寬度的 50%。如果瀏覽器寬度小於 500px，圖片就會與檢視區等寬。


## 展開產品圖片

客戶對於要購買的產品，總是希望仔細欣賞。同樣地，使用者也期待在零售網站上看到高解析度的產品特寫，以便端詳細節。根據[研究參與者](/web/fundamentals/principles/research-study.html)的回應指出，如果網站無法提供產品特寫，將會令他們感到失望。

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="J. Crews 網站包含可展開的產品圖片">
  <figcaption>J. Crews 網站包含可展開的產品圖片。</figcaption>
</figure>

說到輕按後即可展開的圖片，絕不能錯過 J. Crew  網站。看到消失的重疊影像，即表示您可透過輕按的方式展開內含細節的放大圖片。


## 其他圖片相關技術

### 壓縮圖片

[壓縮圖片
技術](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) 可將高度壓縮的 2 倍圖片傳送到所有裝置，無論裝置功能是否支援都沒問題。依據圖片類型和壓縮程度，圖片品質可能看起來沒變，但是檔案大小卻大幅降低了。

{% link_sample _code/compressive.html %}
查看示例
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.remember.compressive %}

### JavaScript 圖片取代

JavaScript 圖片取代技術會先檢查裝置功能，然後再做出正確的判斷。您可以透過 `window.devicePixelRatio` 判斷裝置像素比，取得螢幕寬度和高度的資訊，甚至是透過 `navigator.connection` 進行網路連線偵測或是發出模擬要求。收集到所有資訊後，您就可決定要載入哪個圖片。

不過，這個做法有一項明顯的缺點。因為使用 JavaScript 的緣故，至少必須等到 look-ahead 剖析器完成後，圖片才會載入。這也表示必須等到 `pageload` 事件啟動後，圖片才會開始下載。此外，瀏覽器也很可能會同時下載 1 倍和 2 倍大的圖片，導致網頁作業加重。



