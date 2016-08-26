project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 並非所有的影片格式都受到所有平台的支援。請查看各大主要平台支援哪些格式，並確認您的影片可以在上述所有平台正常播放。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 為舊版平台提供替代方案 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



並非所有的影片格式都受到所有平台的支援。請查看各大主要平台支援哪些格式，並確認您的影片可以在上述所有平台正常播放。



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

如要瞭解這項操作的實際情況，請觀看<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">這部示範影片</a>：Chrome 和 Firefox 會選擇 `chrome.webm` (因為這是上述瀏覽器的潛在來源支援清單中的第一個選項)，而 Safari 則會選擇 `chrome.mp4`。



