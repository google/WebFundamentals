---
title: "設定檢視區"
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
  在針對多種裝置最佳化的網頁中，文件的標題必須包含中繼檢視區元素。中繼檢視區標記可指示瀏覽器如何控制網頁的大小和縮放。
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.set-viewport %}

為了嘗試提供最佳體驗，行動瀏覽器會採用桌上型電腦螢幕寬度顯示網頁 (通常是 980px 左右，不同裝置各有差異)，然後再透過放大字型和將內容縮放為螢幕大小等方法，試著讓內容更容易閱讀。對於使用者來說，這表示字型可能會看起來不一致。當要查看內容或進行互動時，他們必須輕按兩下或以雙指撥動縮放內容。

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


使用中繼檢視區值 `width=device-width` 即可運用裝置獨立像素配合螢幕寬度。採用這項做法後，無論網頁是在小型行動裝置或大型桌上型電腦顯示器顯示，都可隨著不同的螢幕大小靈活編排內容。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="未設定檢視區的網頁">
      查看示例
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="設定檢視區的網頁">
      查看示例
    {% endlink_sample %}
  </div>
</div>

當裝置變為橫向模式時，部分瀏覽器不會將內容重新編排以符合螢幕大小，而是維持網頁寬度並進行縮放。新增 `initial-scale=1` 屬性可指示瀏覽器在 CSS 像素和裝置獨立像素之間建立 1:1 的關係 (無論裝置方向為何)，並允許網頁充分運用橫向寬度。

{% include shared/remember.liquid inline="True" list=page.notes.use-commas %}

## 確認檢視區可供使用

除了設定 `initial-scale` 以外，您也可以在檢視區設定下列屬性：

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

設定完成後，這些屬性可能會停用使用者縮放檢視區的權限，導致協助工具發生問題。



