project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 瞭解如何以最簡便的方式為您的網站新增影片，並確保使用者透過任何裝置都可獲得最佳體驗。

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 影片 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}



使用者都喜歡影片，因為影片可以寓教於樂。在行動裝置中，影片可協助使用者輕鬆吸收資訊。但是，影片會佔用頻寬，而且在不同平台上的效果也可能有所差異。如果影片載入時間過久，或是按下播放鍵後卻沒有任何反應，都會讓使用者心生反感。請繼續讀下去，即可瞭解如何以最簡單的方式為網站新增影片，並確保使用者透過任何裝置都可獲得最佳體驗。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## 新增影片 




瞭解如何以最簡便的方式為您的網站新增影片，並確保使用者透過任何裝置都可獲得最佳體驗。



### TL;DR {: .hide-from-toc }
- 使用 video 元素，以便在您的網站上載入、解碼以及播放影片。
- 製作多種格式的影片，以便在多種行動平台上播放。
- 正確設定影片大小，確保影片不會超出容器。
- 無障礙程度很重要；請為 video 元素新增 track 子元素。


### 新增 video 元素

新增 video 元素，以便在您的網站上載入、解碼以及播放影片：

<video controls>
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
     <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
     <p>這個瀏覽器不支援影片元素。</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>您的瀏覽器不支援影片元素。</p>
    </video>
    

### 指定多個檔案格式

不同的瀏覽器支援的影片格式也會有所差異。
您可以使用 `<source>` 元素指定多種格式，如果使用者的瀏覽器不支援某種格式，就可以顯示備用影片。
舉例來說：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

在剖析 `<source>` 標記時，瀏覽器會使用可選的 `type` 屬性來判定要下載及播放的檔案。如果瀏覽器支援 WebM，則會播放 chrome.webm。否則，瀏覽器會檢查是否可以播放 MPEG-4 影片。
請參閱<a href='//www.xiph.org/video/vid1.shtml' title='十分寓教於樂的數位影片教學'>高手專屬數位媒體入門</a>，詳細瞭解影片和音訊在網路中的運作方式。

與提供不同的 HTML 或伺服器端指令碼相比，這個方法擁有許多優勢，在行動裝置上更是有顯著差異：

* 開發人員可以根據喜好排列格式順序。
* 本地用戶端轉換可縮短延遲時間；只需一個請求即可獲取內容。
* 與使用需要偵測使用者代理程式的伺服器端支援資料庫相比，讓瀏覽器自行選擇格式的做法不僅更簡單快速，而且也更可靠。
* 指定每個檔案的來源類型可提升網路效能；因為瀏覽器可以直接選擇影片來源，就不必為了「嗅探」格式而下載部分影片。

對於行動環境來說，上述的所有要點更是重要，因為這類環境極度重視頻寬和延遲，而且使用者的耐心十分有限。
如果未納入類型屬性，當多個來源具有不支援的類型時，效能就可能大受影響。

請使用行動瀏覽器開發人員工具，比較<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">具有類型屬性</a>的網路活動和<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html">沒有類型屬性</a>的網路活動。
同時，請檢查瀏覽器開發人員工具中的回應標題，以[確認伺服器回報了正確的 MIME 類型](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)；否則，影片來源類型檢查將無法正常運作。

### 指定開始和結束時間

節省頻寬並提高網站的回應靈敏度：使用 Media Fragments API 為 video 元素新增開始和結束時間。

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>這個瀏覽器不支援影片元素。</p>
</video>

如要新增媒體片段，只要將 `#t=[start_time][,end_time]` 新增到媒體網址即可。舉例來說，如要播放第 5 秒和第 10 秒之間的影片，請指定：


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

您還可以使用 Media Fragments API 提供同一部影片的多個畫面 (如 DVD 中的提示點)，完全不需要編碼及提供多個檔案。

Note: - 大部分的行動平台 (iOS 除外) 都支援 Media Fragments API。
- 請確認您的伺服器支援「範圍請求」。在預設情況下，大部分伺服器中的「範圍請求」都會處於啟用狀態。不過，有些託管服務可能會關閉這項功能。


請使用瀏覽器開發人員工具檢查回應標題中的 `Accept-Ranges: bytes`：

<img class="center" alt="Chrome 開發人員工具螢幕截圖：Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### 納入海報圖片

您可以為影片元素新增 poster 屬性，當影片載入後，使用者無需下載或播放影片，即可馬上瞭解內容。


    <video poster="poster.jpg" ...>
      ...
    </video>
    

如果影片 `src` 損壞或提供的影片格式都不受支援，那麼海報也可當作備用資源。海報圖片唯一的缺點就是需要額外的檔案請求，這不僅會佔用頻寬，而且還需要轉譯時間。詳情請參閱[圖片最佳化](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization)。

下圖對是否包含海報圖片的影片進行了並排比較，我們已將海報圖片設為灰色，以便與影片區隔：

<div class="attempt-left">
  <figure>
    <img alt="Android Chrome screenshot, portrait: no poster" src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Android Chrome screenshot, portrait: no poster
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android Chrome screenshot, portrait: with poster" src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Android Chrome screenshot, portrait: with poster
     </figcaption>
  </figure>
</div>

## 為舊版平台提供替代方案 




並非所有的影片格式都受到所有平台的支援。請查看各大主要平台支援哪些格式，並確認您的影片可以在上述所有平台正常播放。



### 查看支援的格式

使用 `canPlayType()` 找出支援的影片格式。這個方法採用與 `mime-type` 一致的字串引數和可選轉碼器，並會傳回下列其中一個值：

<table>
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


<table>
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


### 製作多種格式的影片

有許多工具都可以協助您將同一部影片儲存為多種格式：

* 桌上型電腦工具：[FFmpeg](//ffmpeg.org/)
* GUI 應用程式：[Miro](//www.mirovideoconverter.com/)、[HandBrake](//handbrake.fr/) 和 [VLC](//www.videolan.org/)
* 線上編碼/轉碼服務：[Zencoder](//en.wikipedia.org/wiki/Zencoder) 和 [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### 查看所用的格式

想瞭解瀏覽器實際選用的影片格式嗎？

很簡單，只要在 JavaScript 中使用影片的 `currentSrc` 屬性，即可傳回瀏覽器所採用的來源資訊。

如要瞭解這項操作的實際情況，請觀看<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">這部示範影片</a>：Chrome 和 Firefox 會選擇 `chrome.webm` (因為這是上述瀏覽器的潛在來源支援清單中的第一個選項)，而 Safari 則會選擇 `chrome.mp4`。


## 正確設定影片大小 




影片大小對提升使用者滿意度十分重要。


### TL;DR {: .hide-from-toc }
- 請勿提供超過平台處理能力的影片框架大小或品質。
- 製作長度適中的影片。
- 影片較長可能會導致無法順暢下載及定位：部分瀏覽器可能需要等待影片下載完成後才可播放。



### 查看影片大小

影片框架實際編碼大小可能會與影片元素的尺寸不同 (正如圖片可能不會以實際尺寸顯示一樣)。

如要查看影片的編碼大小，請使用影片元素的 `videoWidth` 和 `videoHeight` 屬性。`width` 和 `height` 會傳回影片元素的尺寸，而這些尺寸可能已透過 CSS 或內嵌寬度和高度屬性進行調整。

### 確認影片不會超出容器

如果影片元素對於目前檢視區來說太大，則可能會超出容器，導致使用者無法觀看內容或使用
控制項。

<div class="attempt-left">
  <figure>
    <img alt="Android Chrome screenshot, portrait: unstyled video element overflows viewport" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Android Chrome screenshot, portrait: unstyled video element overflows viewport
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android Chrome screenshot, landscape: unstyled video element overflows viewport" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>
      Android Chrome screenshot, landscape: unstyled video element overflows viewport
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>
您可以使用 JavaScript 或 CSS 控制影片尺寸。JavaScript 程式庫和 [FitVids](//fitvidsjs.com/) 等外掛程式可協助您維持合適的影片大小及長寬比，即使是 YouTube 和其他來源中的 Flash 影片也不例外。

使用 [CSS 媒體查詢](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)，即可根據檢視區尺寸指定元素大小；`max-width: 100%` 是您的最佳幫手。

{# include shared/related_guides.liquid inline=true list=page.related-guides.media #}

對於 iframe 中的媒體內容 (例如 YouTube 影片)，請嘗試使用回應式方法(例如 [John Surdakowski 提出的方法](//avexdesigns.com/responsive-youtube-embed/))。

Note: 請勿將元素大小強制調整為不同於原始影片的長寬比。過度擠壓或延展都會導致不佳的視覺效果。

**CSS：**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling"   adjust_indentation="auto" %}
</pre>

**HTML：**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup"   adjust_indentation="auto" %}
</pre>

請嘗試比較<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html">回應式示例</a>和<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html">非回應式版本</a>有何不同。


## 自訂影片播放器 




每個平台顯示影片的方式各有不同。行動解決方案需要將裝置方向納入考量。請使用 Fullscreen API 來控制影片內容的全螢幕畫面。



每個平台顯示影片的方式各有不同。行動解決方案需要將裝置方向納入考量。請使用 Fullscreen API 來控制影片內容的全螢幕畫面。

### 裝置方向在不同裝置中的運作方式

桌上型電腦顯示器或筆記型電腦並沒有裝置方向的問題。但是針對行動裝置或平板電腦設計網頁時，裝置方向卻是至關重要。

iPhone 版 Safari 可以在橫向和縱向之間自由轉換：

<div class="attempt-left">
  <figure>
    <img  alt="Screenshot of video playing in Safari on iPhone, portrait" src="images/iPhone-video-playing-portrait.png">
    <figcaption>Screenshot of video playing in Safari on iPhone, portrait</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Screenshot of video playing in Safari on iPhone, landscape" src="images/iPhone-video-playing-landscape.png">
    <figcaption>Screenshot of video playing in Safari on iPhone, landscape</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

iPad 和 Android 版 Chrome 中的裝置方向問題十分棘手。
舉例來說，如果沒有特別設定，在 iPad 上橫向播放的影片看起來是這樣的：

<img class="center" alt="iPad Retina 版 Safari 的影片播放螢幕截圖 (橫向)"
src="images/iPad-Retina-landscape-video-playing.png">

只要使用 CSS 為影片設定 `width: 100%` 或 `max-width: 100%`，即可解決許多因裝置方向造成的版面配置問題。您還可以考慮將全螢幕模式當作替代方案。

### 內嵌或全螢幕顯示

不同的平台展示影片的方式也不相同。iPhone 版 Safari 會在網頁中內嵌影片元素，但會以全螢幕模式播放影片：

<img class="center" alt="iPhone 中的影片元素螢幕截圖 (縱向)" src="images/iPhone-video-with-poster.png">

在 Android 裝置中，使用者可以點擊全螢幕圖示來請求全螢幕模式。但是在預設情況下，瀏覽器會以內嵌模式播放影片：

<img class="center" alt="在 Android 版 Chrome 中播放影片的螢幕截圖 (縱向)" src="images/Chrome-Android-video-playing-portrait-3x5.png">

iPad 版 Safari 以內嵌模式播放影片：

<img class="center" alt="iPad Retina 版 Safari 的影片播放螢幕截圖 (橫向)" src="images/iPad-Retina-landscape-video-playing.png">

### 控制內容的全螢幕模式

如果平台並不強制以全螢幕播放影片，則[大多支援](//caniuse.com/fullscreen) Fullscreen API。您可使用這個 API 控制內容或網頁的全螢幕模式。

如要以全螢幕模式顯示某元素，例如video:

    elem.requestFullScreen();
    

如要以全螢幕模式顯示整個文件：

    document.body.requestFullScreen();
    

您也可以偵測全螢幕狀態變化：

    video.addEventListener("fullscreenchange", handler);
    

此外，您還可查看元素目前是否處於全螢幕模式：

    console.log("In full screen mode: ", video.displayingFullscreen);
    

您也可以使用 CSS `:fullscreen` 準類別來變更元素在全螢幕模式的顯示方式。

在支援 Fullscreen API 的裝置中，請考慮使用縮圖做為影片預留位置：

<video autoplay loop class="center">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
     <p>這個瀏覽器不支援影片元素。</p>
</video>

如要瞭解這項操作的實際運作情況，請觀看<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html">示範</a>。

Note: `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.


## 無障礙程度很重要 




無障礙程度並非一項功能。失聰使用者無法理解沒有字幕的影片，而失明使用者則無法欣賞沒有語音解說的影片。只要花一點時間在影片中新增這些內容，即可為使用者提供優異的體驗。建議您至少為所有使用者提供一項滿足其基本需求的體驗。




### 新增字幕以改善無障礙程度

如果希望媒體在行動裝置上更容易使用，請採用 track 元素新增字幕或說明。

Note: Android 版 Chrome、iOS Safari 和目前所有的電腦瀏覽器 (Firefox 除外) 都支援 track 元素 (請參閱 <a href="http://caniuse.com/track" title="Track 元素支援狀態">caniuse.com/track</a>)。此外，還有一些 polyfill。我們建議您使用 <a href='//www.delphiki.com/html5/playr/' title='Playr track 元素 polyfill'>Playr</a> 或 <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>。

使用 track 元素後，字幕看起來像這樣：

 <img class="center" alt="展示使用 track 元素在 Android 版 Chrome 中顯示字幕的螢幕截圖" src="images/Chrome-Android-track-landscape-5x3.jpg">

### 新增 track 元素

只要為 video 元素新增一個 track 子元素，即可輕鬆在影片中新增字幕：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track"   adjust_indentation="auto" %}
</pre>

track 元素的 `src` 屬性會指定字幕軌檔案的位置。

##在字幕軌檔案中定義字幕

字幕軌檔案是由 WebVTT 格式的定時「提示」所組成：

    WEBVTT

    00:00.000 --> 00:04.000
    一個男人正坐在樹枝上使用筆記型電腦。

    00:05.000 --> 00:08.000
    樹枝折斷，他開始落下。

    ...


## 快速參考 




video 元素各項屬性的快速概覽。



### Video 元素屬性

如要查看 video 元素屬性的完整清單及定義，請參閱[video 元素規格](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element)。

<table>
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

#### 自動播放

在電腦上，`autoplay` 會指示瀏覽器儘快開始下載並播放影片。在 iOS 裝置和 Android 版 Chrome 中，`autoplay` 無法運作；使用者必須輕按螢幕才能播放影片。

即使是在可以進行自動播放的平台中，您也需要考慮是否適合啟用這項功能：

* 數據傳輸費用可能會十分昂貴。
* 媒體未事先詢問就開始下載並播放，這可能會在您毫不知情的情況下佔用頻寬和 CPU，導致頁面轉譯出現延遲。
* 使用者可能正處於不便播放音訊或影片的環境中。

透過 [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean))，開發人員可在 Android WebView 中設定自動播放行為。
在預設情況下，這項功能處於啟用狀態，但是 WebView 應用程式可選擇停用。

#### 預先載入

`preload` 屬性會提示瀏覽器應預先載入的資訊或內容量。

<table>
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

### JavaScript

在 [HTML5 Rocks 影片](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)這篇文章中，您可以看到用來控制影片播放的 JavaScript 屬性、方法和事件的詳盡摘要。我們將上述內容移植到這裡，並根據行動裝置的具體需求進行了相關變更。

#### 屬性

<table>
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

playbackRate (<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">觀看示範</a>) 和 volume 都無法在行動裝置上使用。

#### 方法

<table>
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
除非因為回應使用者操作(例如點擊按鈕) 而呼叫 play() 和 pause()，否則這兩種方法無法運作：請觀看<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">示範影片</a> (同樣地，您也無法對嵌入式 YouTube 影片等內容執行開始播放的操作)。

#### 事件

以下只是部分可能會觸發的媒體事件。如需完整清單，請參閱 Mozilla 開發人員網路上的[媒體事件](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) 頁面。

<table>
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



