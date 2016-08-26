project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 瞭解如何以最簡便的方式為您的網站新增影片，並確保使用者透過任何裝置都可獲得最佳體驗。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 新增影片 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



瞭解如何以最簡便的方式為您的網站新增影片，並確保使用者透過任何裝置都可獲得最佳體驗。



## TL;DR {: .hide-from-toc }
- 使用 video 元素，以便在您的網站上載入、解碼以及播放影片。
- 製作多種格式的影片，以便在多種行動平台上播放。
- 正確設定影片大小，確保影片不會超出容器。
- 無障礙程度很重要；請為 video 元素新增 track 子元素。


## 新增 video 元素

新增 video 元素，以便在您的網站上載入、解碼以及播放影片：

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>這個瀏覽器不支援影片元素。</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>您的瀏覽器不支援影片元素。</p>
    </video>
    

## 指定多個檔案格式

不同的瀏覽器支援的影片格式也會有所差異。
您可以使用 `<source>` 元素指定多種格式，如果使用者的瀏覽器不支援某種格式，就可以顯示備用影片。
舉例來說：

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/video-main.html" region_tag="sourcetypes" %}
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

請使用行動瀏覽器開發人員工具，比較<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">具有類型屬性</a>的網路活動和<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">沒有類型屬性</a>的網路活動。
同時，請檢查瀏覽器開發人員工具中的回應標題，以[確認伺服器回報了正確的 MIME 類型](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)；否則，影片來源類型檢查將無法正常運作。

## 指定開始和結束時間

節省頻寬並提高網站的回應靈敏度：使用 Media Fragments API 為 video 元素新增開始和結束時間。

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
  <p>這個瀏覽器不支援影片元素。</p>
</video>

如要新增媒體片段，只要將 `#t=[start_time][,end_time]` 新增到媒體網址即可。舉例來說，如要播放第 5 秒和第 10 秒之間的影片，請指定：


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

您還可以使用 Media Fragments API 提供同一部影片的多個畫面 (如 DVD 中的提示點)，完全不需要編碼及提供多個檔案。

<!-- TODO: Verify note type! -->
Note: - 大部分的行動平台 (iOS 除外) 都支援 Media Fragments API。
- 請確認您的伺服器支援「範圍請求」。在預設情況下，大部分伺服器中的「範圍請求」都會處於啟用狀態。不過，有些託管服務可能會關閉這項功能。


請使用瀏覽器開發人員工具檢查回應標題中的 `Accept-Ranges: bytes`：

<img class="center" alt="Chrome 開發人員工具螢幕截圖：Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## 納入海報圖片

您可以為影片元素新增 poster 屬性，當影片載入後，使用者無需下載或播放影片，即可馬上瞭解內容。


    <video poster="poster.jpg" ...>
      ...
    </video>
    

如果影片 `src` 損壞或提供的影片格式都不受支援，那麼海報也可當作備用資源。海報圖片唯一的缺點就是需要額外的檔案請求，這不僅會佔用頻寬，而且還需要轉譯時間。詳情請參閱[圖片最佳化](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization)。

下圖對是否包含海報圖片的影片進行了並排比較，我們已將海報圖片設為灰色，以便與影片區隔：

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android 版 Chrome (縱向) 螢幕擷圖：不含海報" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android 版 Chrome (縱向) 螢幕截圖：包含海報" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



