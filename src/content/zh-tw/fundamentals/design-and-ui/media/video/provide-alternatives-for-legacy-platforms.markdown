---
title: "為舊版平台提供替代方案"
description: "並非所有的影片格式都受到所有平台的支援。請查看各大主要平台支援哪些格式，並確認您的影片可以在上述所有平台正常播放。"
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
  並非所有的影片格式都受到所有平台的支援。請查看各大主要平台支援哪些格式，並確認您的影片可以在上述所有平台正常播放。
</p>

{% include shared/toc.liquid %}


## 查看支援的格式

使用 `canPlayType()` 找出支援的影片格式。這個方法採用與 `mime-type` 一致的字串引數和可選轉碼器，並會傳回下列其中一個值：

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>傳回值</th>
    <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="傳回值">(空字串)</td>
      <td data-th="說明">容器和/或轉碼器不受支援。</td>
    </tr>
    <tr>
      <td data-th="傳回值"><code>maybe</code></td>
    <td data-th="說明">
        容器和轉碼器可能受到支援，但是瀏覽器
        需要下載部分影片才能確定。
      </td>
    </tr>
    <tr>
      <td data-th="傳回值"><code>probably</code></td>
      <td data-th="說明">格式似乎受到支援。
      </td>
    </tr>
  </tbody>
</table>

以下提供一些示例，說明在 Chrome 中執行 `canPlayType()` 時的引數和傳回值：


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>類型</th>
      <th>回應</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="類型"><code>video/xyz</code></td>
      <td data-th="回應">(空字串)</td>
    </tr>
    <tr>
      <td data-th="類型"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="回應">(空字串)</td>
    </tr>
    <tr>
      <td data-th="類型"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="回應">(空字串)</td>
    </tr>
    <tr>
      <td data-th="類型"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="回應"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="類型"><code>video/webm</code></td>
      <td data-th="回應"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="類型"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="回應"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## 製作多種格式的影片

有許多工具都可以協助您將同一部影片儲存為多種格式：

* 桌上型電腦工具：[FFmpeg](//ffmpeg.org/)
* GUI 應用程式：[Miro](//www.mirovideoconverter.com/)、[HandBrake](//handbrake.fr/) 和 [VLC](//www.videolan.org/)
* 線上編碼/轉碼服務：[Zencoder](//en.wikipedia.org/wiki/Zencoder) 和 [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## 查看所用的格式

想瞭解瀏覽器實際選用的影片格式嗎？

很簡單，只要在 JavaScript 中使用影片的 `currentSrc` 屬性，即可傳回瀏覽器所採用的來源資訊。

如要瞭解這項操作的實際情況，請觀看{% link_sample _code/video-main.html %}這部示範影片{% endlink_sample %}：Chrome 和 Firefox 會選擇 `chrome.webm` (因為這是上述瀏覽器的潛在來源支援清單中的第一個選項)，而 Safari 則會選擇 `chrome.mp4`。



