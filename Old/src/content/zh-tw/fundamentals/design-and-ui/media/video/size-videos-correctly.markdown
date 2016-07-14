---
title: "正確設定影片大小"
description: "影片大小對提升使用者滿意度十分重要。"
updated_on: 2014-09-19
key-takeaways:
  size-matters:
    - 請勿提供超過平台處理能力的影片框架大小或品質。
    - 製作長度適中的影片。
    - 影片較長可能會導致無法順暢下載及定位：部分瀏覽器可能需要等待影片下載完成後才可播放。
notes:
  media-fragments:
    - 大部分的行動平台 (iOS 除外) 都支援 Media Fragments API。
    - 請確認您的伺服器支援「範圍請求」。在預設情況下，大部分伺服器中的「範圍請求」都會處於啟用狀態。不過，有些託管服務可能會關閉這項功能。
  dont-overflow:
    - 請勿將元素大小強制調整為不同於原始影片的長寬比。過度擠壓或延展都會導致不佳的視覺效果。
  accessibility-matters:
    - Android 版 Chrome、iOS Safari 和目前所有的電腦瀏覽器 (Firefox 除外) 都支援 track 元素 (請參閱 <a href="http://caniuse.com/track" title="Track 元素支援狀態">caniuse.com/track</a>)。此外，還有一些 polyfill。我們建議您使用 <a href='//www.delphiki.com/html5/playr/' title='Playr track 元素 polyfill'>Playr</a> 或 <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>。
  construct-video-streams:
    - Android 版 Chrome 和 Opera、Internet Explorer 11 和電腦版 Chrome 都支援 MSE，而且 <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions 導入時間'>Firefox</a> 也已計畫提供這項支援。
  optimize:
    - <a href="../images/">圖片</a>
    - <a href="../../performance/optimizing-content-efficiency/">最佳化內容效率</a>
related-guides:
  media:
  -
      title: "使用 CSS 媒體查詢提升回應成效"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "回應式網頁設計基礎知識"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  影片大小對提升使用者滿意度十分重要。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


## 查看影片大小

影片框架實際編碼大小可能會與影片元素的尺寸不同 (正如圖片可能不會以實際尺寸顯示一樣)。

如要查看影片的編碼大小，請使用影片元素的 `videoWidth` 和 `videoHeight` 屬性。`width` 和 `height` 會傳回影片元素的尺寸，而這些尺寸可能已透過 CSS 或內嵌寬度和高度屬性進行調整。

## 確認影片不會超出容器

如果影片元素對於目前檢視區來說太大，則可能會超出容器，導致使用者無法觀看內容或使用
控制項。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Android 版 Chrome 螢幕截圖：未設定樣式的影片元素超出檢視區 (縱向)" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Android 版 Chrome 螢幕截圖：未設定樣式的影片元素超出檢視區 (橫向)" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

您可以使用 JavaScript 或 CSS 控制影片尺寸。JavaScript 程式庫和 [FitVids](//fitvidsjs.com/) 等外掛程式可協助您維持合適的影片大小及長寬比，即使是 YouTube 和其他來源中的 Flash 影片也不例外。

使用 [CSS 媒體查詢](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)，即可根據檢視區尺寸指定元素大小；`max-width: 100%` 是您的最佳幫手。

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

對於 iframe 中的媒體內容 (例如 YouTube 影片)，請嘗試使用回應式方法(例如 [John Surdakowski 提出的方法](//avexdesigns.com/responsive-youtube-embed/))。

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS：**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML：**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

請嘗試比較{% link_sample _code/responsive_embed.html %}回應式示例{% endlink_sample %}和{% link_sample _code/unyt.html %}非回應式版本{% endlink_sample %}有何不同。




