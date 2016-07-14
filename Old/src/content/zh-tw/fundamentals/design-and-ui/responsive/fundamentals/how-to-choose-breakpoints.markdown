---
title: "如何選擇中斷點"
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
  雖然依照裝置類別定義中斷點很實用，但是這麼做時請謹慎。如果依照現在市面上的特定裝置、產品、品牌名稱或作業系統定義中斷點，日後的維護作業將會變得很棘手。因此，建議您依照內容來決定版面配置應如何隨著容器調整。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## 先從較小裝置開始選擇主要中斷點，之後再處理較大的裝置

先設計符合小螢幕的內容，接著將螢幕放大，等到畫面開始走樣時，再設置中斷點。如此一來，您可以根據內容將中斷點最佳化，只需保留最少的中段點即可。

讓我們運用開頭看到的[氣象預報]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html)示例進行說明。
首先，我們要確認氣象預報在小螢幕清晰可見。

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="氣象預報顯示在小螢幕的預覽畫面。">
  {% endlink_sample %}
</figure>

接下來，我們要調整瀏覽器大小，直到各元素之間空隙過大，導致氣象預報畫面走樣為止。空隙是否過大屬於主觀判定，但是超過 600px 確實是太寬了。

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="網頁變寬時的氣象預報預覽畫面。">
  {% endlink_sample %}
</figure>

如要在 600px 時插入中斷點，請建立兩份樣式表：一份用於 600px 以下的瀏覽器，另一份用於寬度超過 600px 的瀏覽器。

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

最後，我們要重新建構 CSS。在這個例子中，我們已將字型、圖示、基本定位、顏色等常見的樣式放入 `weather.css`。小螢幕專用的版面配置則是放在 `weather-small.css`，而大螢幕專用的版面配置則是放在 `weather-large.css`。

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## 視情況選取次要中斷點

當版面配置大幅變更時，除了選擇主要中斷點以外，依據次要中斷點調整也很有幫助。例如，如果您在主要中斷點之間增設次要中斷點，即可調整元素的邊界和間隙，或是增加字型大小，讓版面配置看起來更加自然。

讓我們先從小螢幕版面配置著手。在這個案例中，讓我們設定當寬度大於 360px 時，即放大字型。接著，當擁有足夠空間時，我們可以將高低溫並排，而不是上下排列。我們也可以稍微放大氣象圖示。

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

對大螢幕來說也是一樣，建議您最好設定氣象面板的寬度上限，以免佔用所有的螢幕寬度。

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

##將文字最佳化以利閱讀

傳統的可讀性理論主張，最理想的欄位每行的文字應包含 70 到 80 個字元 (大約是 8 到 10 個英文字)。因此，每當文字區塊寬度超過 10 個英文字時，即應考慮設置中斷點。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="增加次要中斷點之前。">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="增加次要中斷點之後。">
  </div>
</div>

讓我們深入探討上述的網誌文章示例。如果在小螢幕上採用寬度為 1em 的 Roboto 字型，每行可以容納 10 個英文字。但如果是大螢幕，就需要設置中斷點了。在這個案例中，如果瀏覽器框寬度大於 575px，理想的內容寬度為 550px。

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## 請勿完全隱藏內容

依據螢幕大小選擇要隱藏或顯示的內容時，請多加留意。
千萬不要因為內容無法符合螢幕大小而輕易隱藏。您無法依據螢幕大小判定使用者需要哪些內容。舉例來說，如果隨意將氣象預報中的花粉計量資訊刪除，可能會對容易在春季過敏的使用者造成嚴重危害，因為他們需要這項資訊才能判斷是否應該出門。




