---
title: "無障礙程度很重要"
description: "無障礙程度並非一項功能。"
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
  無障礙程度並非一項功能。失聰使用者無法理解沒有字幕的影片，而失明使用者則無法欣賞沒有語音解說的影片。只要花一點時間在影片中新增這些內容，即可為使用者提供優異的體驗。建議您至少為所有使用者提供一項滿足其基本需求的體驗。
</p>

{% include shared/toc.liquid %}



## 新增字幕以改善無障礙程度

如果希望媒體在行動裝置上更容易使用，請採用 track 元素新增字幕或說明。

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

使用 track 元素後，字幕看起來像這樣：

 <img class="center" alt="展示使用 track 元素在 Android 版 Chrome 中顯示字幕的螢幕截圖" src="images/Chrome-Android-track-landscape-5x3.jpg">

## 新增 track 元素

只要為 video 元素新增一個 track 子元素，即可輕鬆在影片中新增字幕：

{% include_code src=_code/track.html snippet=track lang=html %}

track 元素的 `src` 屬性會指定字幕軌檔案的位置。

##在字幕軌檔案中定義字幕

字幕軌檔案是由 WebVTT 格式的定時「提示」所組成：

    WEBVTT

    00:00.000 --> 00:04.000
    一個男人正坐在樹枝上使用筆記型電腦。

    00:05.000 --> 00:08.000
    樹枝折斷，他開始落下。

    ...



