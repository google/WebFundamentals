---
title: "依照檢視區大小調整內容"
description: "大多數的網站並未針對多裝置體驗進行最佳化。快來瞭解基礎知識，讓您的網站適用於行動裝置、桌上型電腦或任何附有螢幕的裝置。"
updated_on: 2014-04-30
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
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---
<p class="intro">
  使用者習慣在桌上型電腦和行動裝置上垂直捲動網站，如果強迫使用者以水平捲動或縮放的方式瀏覽整個網頁，將會導致不良的使用者體驗。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

當您開發包含 `meta viewport` 標記的行動裝置網站時，一不小心就會建立不符合指定檢視區的網頁內容。舉例來說，顯示寬度超過檢視區的圖片時，將會導致檢視區變為水平捲動模式。這時您應將內容調整為符合檢視區的寬度，以免使用者必須以水平捲動方式瀏覽網頁。

因為各裝置 CSS 像素的螢幕大小和寬度大不相同 (例如手機和平板電腦之間，甚至是各家手機都有差異)，建議您不要將內容設為依據特定檢視區寬度，才能確保內容正常顯示。

如果針對網頁元素設定大型絕對 CSS 寬度 (例如下方示例)，將會導致 `div` 過寬而無法在較窄的裝置正確顯示 (例如 iPhone 這類 CSS 像素寬度為 320 的裝置)。因此，建議您不妨考慮使用相對寬度值，例如 `width: 100%`。相同地，使用大型絕對定位值時也請留意，因為這類值會導致元素超過小螢幕上的檢視區。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="iPhone 上顯示包含 344px 固定寬度元素的網頁。">
      查看示例
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Nexus 5 上顯示包含 344px 固定寬度元素的網頁。">
      查看示例
    {% endlink_sample %}
  </div>
</div>



