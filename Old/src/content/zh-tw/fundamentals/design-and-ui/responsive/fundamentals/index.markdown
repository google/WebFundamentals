---
title: "回應式網頁設計基礎"
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
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---
<p class="intro">
   透過行動裝置上網的使用者數量正以難以想像的速度暴增，但是大多數的網站並未針對行動裝置進行最佳化。礙於行動裝置的螢幕大小，開發人員必須針對行動裝置螢幕上的內容另行編排。
</p>


{% comment %}
{% ytvideo oK09n_PGhTo %}
{% endcomment %}

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


手機、平板手機、平板電腦、桌上型電腦、遊戲機、電視，甚至是穿戴式裝置的螢幕大小五花八門，各有不同。螢幕大小總是日新月異，因此您的網站如何在今日或未來隨時因應調整，顯得更為重要。

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

回應式網頁設計最早是由 [A List Apart 的 Ethan Marcotte](http://alistapart.com/article/responsive-web-design/) 所定義，這項設計可針對使用者的需求和其所使用的裝置做出回應。版面配置會隨著裝置的螢幕大小和功能變動。舉例來說，使用者在手機上會看到以一欄顯示的內容；在平板電腦上則會看到以兩欄顯示的相同內容。



