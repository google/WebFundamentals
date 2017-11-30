project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:瞭解通過網絡收集資源的階段至關重要。這是解決加載問題的基礎。

{# wf_published_on:2016-02-03 #}
{# wf_updated_on:2016-02-03 #}

# 瞭解 Resource Timing {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

瞭解通過網絡收集資源的階段至關重要。這是解決加載問題的基礎。


### TL;DR {: .hide-from-toc }
- 瞭解 Resource Timing 的階段。
- 瞭解每個階段向 Resource Timing API 提供的內容。
- 瞭解時間線圖表中不同的性能問題指示器，例如一系列透明欄或者大片的綠塊。


所有網絡請求都被視爲資源。通過網絡對它們進行檢索時，資源具有不同生命週期，以 Resource Timing 表示。Network 面板使用與應用開發者所用相同的 [Resource Timing API](http://www.w3.org/TR/resource-timing)。



請注意：當使用具有跨源資源的 Resource Timing API 時，確保所有資源具有 CORS 標頭。


Resource Timing API 提供了與接收各個資源的時間有關的大量詳細信息。請求生命週期的主要階段包括：


* 重定向
  * 立即開始 `startTime`。
  * 如果正在發生重定向，`redirectStart` 也會開始。
  * 如果重定向在本階段末發生，將採集 `redirectEnd`。
* 應用緩存
  * 如果是應用緩存在實現請求，將採集 `fetchStart` 時間。
* DNS
  * `domainLookupStart` 時間在 DNS 請求開始時採集。
  * `domainLookupEnd` 時間在 DNS 請求結束時採集。
* TCP
  * `connectStart` 在初始連接到服務器時採集。
  * 如果正在使用 TLS 或 SSL，`secureConnectionStart` 將在握手（確保連接安全）開始時開始。
  * `connectEnd` 將在到服務器的連接完成時採集。
* 請求
  * `requestStart` 會在對某個資源的請求被髮送到服務器後立即採集。
* 響應
  * `responseStart` 是服務器初始響應請求的時間。
  * `responseEnd` 是請求結束並且數據完成檢索的時間。

![Resource Timing API 示意圖](imgs/resource-timing-api.png)

## 在 DevTools 中查看

要查看 Network 面板中給定條目完整的耗時信息，您有三種選擇。

1. 將鼠標懸停到 Timeline 列下的耗時圖表上。這將呈現一個顯示完整耗時數據的彈出窗口。
2. 點擊任何條目並打開該條目的 Timing 標籤。
3. 使用 Resource Timing API 從 JavaScript 檢索原始數據。

![Resource Timing 信息](imgs/resource-timing-data.png)

<figure>
<figcaption>
<p>
  此代碼可以在 DevTools 的 Console 中運行。
  它將使用 Network Timing API 檢索所有資源。
  然後，它將通過查找是否存在名稱中包含“style.css”的條目對條目進行過濾。
  如果找到，將返回相應條目。
</p>
<code>
  performance.getEntriesByType('resource').filter(item => item.name.includes("style.css"))</code>

</figcaption>
<img src="imgs/resource-timing-entry.png" alt="Resource Timing 條目">
</figure>

<style>
dt:before {
  content: "\00a0\00a0\00a0";
}
dt strong {
  margin-left: 5px;
}
dt.stalled:before, dt.proxy-negotiation:before {
  background-color: #cdcdcd;
}
dt.dns-lookup:before {
  background-color: #1f7c83;
}
dt.initial-connection:before, dt.ssl:before {
  background-color: #e58226;
}
dt.request-sent:before, dt.ttfb:before {
  background-color: #5fdd5f;
}
dt.content-download:before {
  background-color: #4189d7;
}
</style>

<dl>

  <dt class="queued"><strong>Queuing</strong></dt>
  <dd>
    如果某個請求正在排隊，則指示：
      <ul>
        <li>
        請求已被渲染引擎推遲，因爲該請求的優先級被視爲低於關鍵資源（例如腳本/樣式）的優先級。
        圖像經常發生這種情況。        </li>
        <li>
        請求已被暫停，以等待將要釋放的不可用 TCP 套接字。        </li>
        <li>
        請求已被暫停，因爲在 HTTP 1 上，瀏覽器僅允許每個源擁有<a href="https://crbug.com/12066">六個 TCP 連接</a>。        </li>
        <li>
        生成磁盤緩存條目所用的時間（通常非常迅速）        </li>
      </ul>
  </dd>

  <dt class="stalled"><strong> Stalled/Blocking</strong></dt>
  <dd>
    請求等待發送所用的時間。
    可以是等待 Queueing 中介紹的任何一個原因。
    此外，此時間包含代理協商所用的任何時間。</dd>


  <dt class="proxy-negotiation"><strong> Proxy Negotiation</strong></dt>
  <dd>與代理服務器連接協商所用的時間。</dd>

  <dt class="dns-lookup"><strong><abbr title="Domain Name System"> DNS</abbr> Lookup</strong></dt>
  <dd>
    執行 DNS 查詢所用的時間。
    頁面上的每一個新域都需要完整的往返才能執行 DNS 查詢。</dd>


  <dt class="initial-connection"><strong> Initial Connection / Connecting</strong></dt>
  <dd>建立連接所用的時間，包括 <abbr title="Transmission Control Protocol">TCP</abbr> 握手/重試和協商 <abbr title="Secure Sockets Layer">SSL</abbr> 的時間。</dd>

  <dt class="ssl"><strong> SSL</strong></dt>
  <dd>完成 SSL 握手所用的時間。</dd>

  <dt class="request-sent"><strong> Request Sent / Sending</strong></dt>
  <dd>
    發出網絡請求所用的時間。
    通常不到一毫秒。</dd>


  <dt class="ttfb"><strong> Waiting (<abbr title="Time To First Byte">TTFB</abbr>)</strong></dt>
  <dd>
    等待初始響應所用的時間，也稱爲至第一字節的時間。
    此時間將捕捉到服務器往返的延遲時間，以及等待服務器傳送響應所用的時間。</dd>


  <dt class="content-download"><strong> Content Download / Downloading</strong></dt>
  <dd>接收響應數據所用的時間。</dd>
</dl>


## 診斷網絡問題

通過 Network 面板可以發現大量可能的問題。查找這些問題需要很好地瞭解客戶端與服務器如何通信，以及協議施加的限制。


### 已被加入隊列或已被停止的系列

最常見問題是一系列已被加入隊列或已被停止的條目。這表明正在從單個網域檢索太多的資源。在 HTTP 1.0/1.1 連接上，Chrome 會將每個主機強制設置爲最多六個 TCP 連接。如果您一次請求十二個條目，前六個將開始，而後六個將被加入隊列。最初的一半完成後，隊列中的第一個條目將開始其請求流程。





![被停止的請求系列](imgs/stalled-request-series.png)

要爲傳統的 HTTP 1 流量解決此問題，您需要實現[域分片](https://www.maxcdn.com/one/visual-glossary/domain-sharding-2/)。也就是在您的應用上設置多個子域，以便提供資源。然後，在子域之間平均分配正在提供的資源。



HTTP 1 連接的修復結果**不會**應用到 HTTP 2 連接上。事實上，前者的結果會影響後者。
如果您部署了 HTTP 2，請不要對您的資源進行域分片，因爲它與 HTTP 2 的操作方式相反。在 HTTP 2 中，到服務器的單個 TCP 連接作爲多路複用連接。這消除了 HTTP 1 中的六個連接限制，並且可以通過單個連接同時傳輸多個資源。



### 至第一字節的漫長時間

<small>又稱：大片綠色</small>

![長 TTFB 指示燈](imgs/indicator-of-high-ttfb.png)

等待時間長表示至第一字節的時間 (TTFB) 漫長。建議將此值控制在 [200 毫秒以下](/speed/docs/insights/Server)。長 TTFB 會揭示兩個主要問題之一。

請執行以下任一操作：

1. 客戶端與服務器之間的網絡條件較差，或者
2.服務器應用的響應慢

要解決長 TTFB，首先請儘可能縮減網絡。理想的情況是將應用託管在本地，然後查看 TTFB 是否仍然很長。如果仍然很長，則需要優化應用的響應速度。可以是優化數據庫查詢、爲特定部分的內容實現緩存，或者修改您的網絡服務器配置。很多原因都可能導致後端緩慢。您需要調查您的軟件並找出未滿足您的性能預算的內容。






如果本地託管後 TTFB 仍然漫長，那麼問題出在您的客戶端與服務器之間的網絡上。很多事情都可以阻止網絡遍歷。客戶端與服務器之間有許多點，每個點都有其自己的連接限制並可能引發問題。測試時間是否縮短的最簡單方法是將您的應用置於其他主機上，並查看 TTFB 是否有所改善。




### 達到吞吐量能力

<small>又稱：大片藍色</small>

![吞吐量能力指示符](imgs/indicator-of-large-content.png)

如果您看到 Content Download 階段花費了大量時間，則提高服務器響應或串聯不會有任何幫助。首要的解決辦法是減少發送的字節數。



{# wf_devsite_translation #}
