---
title: "快速參考"
description: "video 元素各項屬性的快速概覽。"
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
---

<p class="intro">
  video 元素各項屬性的快速概覽。
</p>

{% include shared/toc.liquid %}


## Video 元素屬性

如要查看 video 元素屬性的完整清單及定義，請參閱[video 元素規格](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element)。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>屬性</th>
      <th>適用範圍</th>
    <th>說明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="屬性"><code>src</code></td>
      <td data-th="適用範圍">所有瀏覽器</td>
      <td data-th="說明">影片位址 (網址)。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>poster</code></td>
      <td data-th="適用範圍">所有瀏覽器</td>
      <td data-th="說明">影片元素顯示後，無需下載影片內容就可立即顯示的圖片檔案位址 (網址)。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>preload</code></td>
      <td data-th="適用範圍">所有行動瀏覽器都無法預先載入。</td>
      <td data-th="說明">提示瀏覽器不妨在播放前預先載入中繼資料 (或某部影片)。選項包括 none、metadata 或 auto (詳情請參閱「預先載入」部分)。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>autoplay</code></td>
      <td data-th="適用範圍">iPhone 和 Android 裝置都不支援；所有電腦版瀏覽器、iPad 以及 Android 版 Firefox 和 Opera 都支援。</td>
      <td data-th="Description">儘快開始下載及播放 (請參閱「自動播放」部分)。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>loop</code></td>
      <td data-th="適用範圍">所有瀏覽器</td>
      <td data-th="說明">循環播放影片。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>controls</code></td>
      <td data-th="適用範圍">所有瀏覽器</td>
      <td data-th="說明">顯示預設影片控制項 (播放、暫停等)。</td>
    </tr>
  </tbody>
</table>

### 自動播放

在電腦上，`autoplay` 會指示瀏覽器儘快開始下載並播放影片。在 iOS 裝置和 Android 版 Chrome 中，`autoplay` 無法運作；使用者必須輕按螢幕才能播放影片。

即使是在可以進行自動播放的平台中，您也需要考慮是否適合啟用這項功能：

* 數據傳輸費用可能會十分昂貴。
* 媒體未事先詢問就開始下載並播放，這可能會在您毫不知情的情況下佔用頻寬和 CPU，導致頁面轉譯出現延遲。
* 使用者可能正處於不便播放音訊或影片的環境中。

透過 [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean))，開發人員可在 Android WebView 中設定自動播放行為。
在預設情況下，這項功能處於啟用狀態，但是 WebView 應用程式可選擇停用。

### 預先載入

`preload` 屬性會提示瀏覽器應預先載入的資訊或內容量。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>值</th>
    <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="值"><code>none</code></td>
      <td data-th="說明">使用者可能根本不會觀看影片，因此不必預先載入任何內容。</td>
    </tr>
    <tr>
      <td data-th="值"><code>metadata</code></td>
      <td data-th="說明">不妨預先載入中繼資料 (時間長度、尺寸、文字軌)，但只需載入少許影片。</td>
    </tr>
    <tr>
      <td data-th="值"><code>auto</code></td>
      <td data-th="說明">表示希望立即下載整部影片。</td>
    </tr>
  </tbody>
</table>

在不同的平台中，`preload` 屬性的效果會有所不同。
例如，Chrome 在電腦上可以緩衝 25 秒的影片，但無法在 iOS 或 Android 裝置上進行緩衝。換句話說，行動裝置上可能會出現播放啟動延遲，但是在電腦上卻不會出現這種情況。詳情請參閱 [Steve Souders 的測試網頁](//stevesouders.com/tests/mediaevents.php)。

## JavaScript

在 [HTML5 Rocks 影片](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)這篇文章中，您可以看到用來控制影片播放的 JavaScript 屬性、方法和事件的詳盡摘要。我們將上述內容移植到這裡，並根據行動裝置的具體需求進行了相關變更。

### 屬性

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>屬性</th>
    <th>說明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="屬性"><code>currentTime</code></td>
      <td data-th="說明">取得或設定播放位置 (以秒為單位)。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>volume</code></td>
      <td data-th="說明">取得或設定影片的目前音量。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>muted</code></td>
      <td data-th="說明">取得靜音狀態或將音訊設為靜音。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>playbackRate</code></td>
      <td data-th="說明">取得或設定播放速率；1 表示以正常速度向前播放。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>buffered</code></td>
      <td data-th="說明">說明目前已緩衝且可以播放的影片量 (請觀看<a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="在畫布元素中顯示已緩衝影片量的示範影片">示範影片</a>)。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>currentSrc</code></td>
      <td data-th="說明">目前播放的影片網址。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>videoWidth</code></td>
      <td data-th="說明">以像素為單位的影片寬度 (這可能會與 video 元素寬度不同)。</td>
    </tr>
    <tr>
      <td data-th="屬性"><code>videoHeight</code></td>
      <td data-th="說明">以像素為單位的影片高度 (這可能會與 video 元素高度不同)。</td>
    </tr>
  </tbody>
</table>

playbackRate ({% link_sample _code/scripted.html %}觀看示範{% endlink_sample %}) 和 volume 都無法在行動裝置上使用。

### 方法

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>方法</th>
    <th>說明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="方法"><code>load()</code></td>
      <td data-th="說明">在沒有開始播放的情況下載入或重新載入影片來源：例如使用 JavaScript 變更影片 src 的時候。</td>
    </tr>
    <tr>
      <td data-th="方法"><code>play()</code></td>
      <td data-th="說明">從目前位置播放影片。</td>
    </tr>
    <tr>
      <td data-th="方法"><code>pause()</code></td>
      <td data-th="說明">在目前位置暫停播放影片。</td>
    </tr>
    <tr>
      <td data-th="方法"><code>canPlayType('format')</code></td>
      <td data-th="說明">找出支援的格式 (請參閱「查看支援的格式」)。</td>
    </tr>
  </tbody>
</table>

在行動裝置上 (Android 版 Opera 除外)，
除非因為回應使用者操作(例如點擊按鈕) 而呼叫 play() 和 pause()，否則這兩種方法無法運作：請觀看{% link_sample _code/scripted.html %}示範影片{% endlink_sample %} (同樣地，您也無法對嵌入式 YouTube 影片等內容執行開始播放的操作)。

### 事件

以下只是部分可能會觸發的媒體事件。如需完整清單，請參閱 Mozilla 開發人員網路上的[媒體事件](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) 頁面。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>事件</th>
    <th>說明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="事件"><code>canplaythrough</code></td>
      <td data-th="說明">當瀏覽器獲得足夠資料，並確信可以連貫地播放整部影片時，就會觸發這個事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>ended</code></td>
      <td data-th="說明">影片播放完畢後觸發的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>error</code></td>
      <td data-th="說明">出現錯誤時觸發的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>playing</code></td>
      <td data-th="說明">影片首次開始播放時、暫停後或重新開始播放時觸發的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>progress</code></td>
      <td data-th="說明">為說明下載進度而定期觸發的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>waiting</code></td>
      <td data-th="說明">操作延遲，等待另一操作完成時觸發的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>loadedmetadata</code></td>
      <td data-th="說明">瀏覽器載入影片中繼資料 (時間長度、尺寸、文字軌道) 後觸發的事件。</td>
    </tr>
  </tbody>
</table>



