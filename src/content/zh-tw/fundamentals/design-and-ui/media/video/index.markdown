---
title: "影片"
description: "瞭解如何以最簡便的方式為您的網站新增影片，並確保使用者透過任何裝置都可獲得最佳體驗。"
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
  使用者都喜歡影片，因為影片可以寓教於樂。在行動裝置中，影片可協助使用者輕鬆吸收資訊。但是，影片會佔用頻寬，而且在不同平台上的效果也可能有所差異。如果影片載入時間過久，或是按下播放鍵後卻沒有任何反應，都會讓使用者心生反感。請繼續讀下去，即可瞭解如何以最簡單的方式為網站新增影片，並確保使用者透過任何裝置都可獲得最佳體驗。
</p>

{% ytvideo j5fYOYrsocs %}



