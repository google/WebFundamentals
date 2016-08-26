project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 影片大小對提升使用者滿意度十分重要。

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# 正確設定影片大小 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



影片大小對提升使用者滿意度十分重要。


## TL;DR {: .hide-from-toc }
- 請勿提供超過平台處理能力的影片框架大小或品質。
- 製作長度適中的影片。
- 影片較長可能會導致無法順暢下載及定位：部分瀏覽器可能需要等待影片下載完成後才可播放。



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

<!-- TODO: Verify note type! -->
Note: 請勿將元素大小強制調整為不同於原始影片的長寬比。過度擠壓或延展都會導致不佳的視覺效果。

**CSS：**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML：**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

請嘗試比較<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">回應式示例</a>和<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">非回應式版本</a>有何不同。




