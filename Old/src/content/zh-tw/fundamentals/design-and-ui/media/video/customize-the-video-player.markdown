---
title: "自訂影片播放器"
description: "每個平台顯示影片的方式各有不同。行動解決方案需要將裝置方向納入考量。請使用 Fullscreen API 來控制影片內容的全螢幕畫面。"
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - 使用 video 元素，以便在您的網站上載入、解碼以及播放影片。
    - 製作多種格式的影片，以便在多種行動平台上播放。
    - 正確設定影片大小，確保影片不會超出容器。
    - 無障礙程度很重要；請為 video 元素新增 track 子元素。
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
---

<p class="intro">
  每個平台顯示影片的方式各有不同。行動解決方案需要將裝置方向納入考量。請使用 Fullscreen API 來控制影片內容的全螢幕畫面。
</p>

{% include shared/toc.liquid %}


每個平台顯示影片的方式各有不同。行動解決方案需要將裝置方向納入考量。請使用 Fullscreen API 來控制影片內容的全螢幕畫面。

## 裝置方向在不同裝置中的運作方式

桌上型電腦顯示器或筆記型電腦並沒有裝置方向的問題。但是針對行動裝置或平板電腦設計網頁時，裝置方向卻是至關重要。

iPhone 版 Safari 可以在橫向和縱向之間自由轉換：

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="在 iPhone 版 Safari 中播放影片的螢幕截圖 (縱向)" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="在 iPhone 版 Safari 中播放影片的螢幕截圖 (橫向)" src="images/iPhone-video-playing-landscape.png">
</div>

iPad 和 Android 版 Chrome 中的裝置方向問題十分棘手。
舉例來說，如果沒有特別設定，在 iPad 上橫向播放的影片看起來是這樣的：

<img class="center" alt="iPad Retina 版 Safari 的影片播放螢幕截圖 (橫向)"
src="images/iPad-Retina-landscape-video-playing.png">

只要使用 CSS 為影片設定 `width: 100%` 或 `max-width: 100%`，即可解決許多因裝置方向造成的版面配置問題。您還可以考慮將全螢幕模式當作替代方案。

## 內嵌或全螢幕顯示

不同的平台展示影片的方式也不相同。iPhone 版 Safari 會在網頁中內嵌影片元素，但會以全螢幕模式播放影片：

<img class="center" alt="iPhone 中的影片元素螢幕截圖 (縱向)" src="images/iPhone-video-with-poster.png">

在 Android 裝置中，使用者可以點擊全螢幕圖示來請求全螢幕模式。但是在預設情況下，瀏覽器會以內嵌模式播放影片：

<img class="center" alt="在 Android 版 Chrome 中播放影片的螢幕截圖 (縱向)" src="images/Chrome-Android-video-playing-portrait-3x5.png">

iPad 版 Safari 以內嵌模式播放影片：

<img class="center" alt="iPad Retina 版 Safari 的影片播放螢幕截圖 (橫向)" src="images/iPad-Retina-landscape-video-playing.png">

## 控制內容的全螢幕模式

如果平台並不強制以全螢幕播放影片，則[大多支援](//caniuse.com/fullscreen) Fullscreen API。您可使用這個 API 控制內容或網頁的全螢幕模式。

如要以全螢幕模式顯示某元素，例如video:
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

如要以全螢幕模式顯示整個文件：
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

您也可以偵測全螢幕狀態變化：
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

此外，您還可查看元素目前是否處於全螢幕模式：
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

您也可以使用 CSS `:fullscreen` 準類別來變更元素在全螢幕模式的顯示方式。

在支援 Fullscreen API 的裝置中，請考慮使用縮圖做為影片預留位置：

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>這個瀏覽器不支援影片元素。</p>
</video>

如要瞭解這項操作的實際運作情況，請觀看{% link_sample _code/fullscreen.html %}示範{% endlink_sample %}。

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



