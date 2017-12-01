project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:很重要的一點是，您需要了解應用或網站在連接不佳或不可靠時的使用情況，並相應地進行構建。有一些工具可以幫助您。

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2016-05-09 #}

# 瞭解低帶寬和高延遲 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

很重要的一點是，您需要了解應用或網站在連接不佳或不可靠時的使用情況，並相應地進行構建。有一些工具可以幫助您。

## 在低帶寬和高延遲環境中測試{: #testing }

<a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">越來越多</a>的人通過移動設備來體驗網站。即使是在家裏，<a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">有許多用戶也都捨棄固定寬帶而使用移動網絡</a>。

在這樣的趨勢中，您需要理解您的應用或網站在連接不佳或不可靠的狀況下表現如何。有很多軟件工具可以幫助您[模擬或仿真](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference)低帶寬和高[延遲](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)。

###  模擬網絡限速

在建立或更新網站時，您必須確保在不同連接條件下提供足夠性能。多種工具可以幫助您。

####  瀏覽器工具

[Chrome DevTools](/web/tools/chrome-devtools/network-performance/network-conditions) 讓您能使用 Chrome DevTools Network 面板的預設或自定義設置，以多種上傳/下載速度和[往返時間](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)測試網站：

![Chrome DevTools 節流](images/chrome-devtools-throttling.png)

####  系統工具

如果您安裝了適用於 Xcode 的[硬件 IO 工具](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools)，Mac 上即會提供一個名爲 Network Link Conditioner 首選面板。

![Mac Network Link Conditioner 控制面板](images/network-link-conditioner-control-panel.png)

![Mac Network Link Conditioner 設置](images/network-link-conditioner-settings.png)

![Mac Network Link Conditioner 自定義設置](images/network-link-conditioner-custom.png)

####  設備模擬

[Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed) 允許您模擬在 Android 設備上運行應用（包括網絡瀏覽器和混合式網絡應用）時可能遇到的各種網絡狀況：

![Android Emulator](images/android-emulator.png)

![Android Emulator 設置](images/android-emulator-settings.png)

對於 iPhone，Network Link Conditioner 可用於模擬欠佳的網絡狀況（參見上文）。

###  使用不同位置和網絡測試

連接性能依服務器位置和網絡類型而定。

[WebPagetest](https://webpagetest.org) 是一種在線服務，讓您的網站能以各種網絡和主機位置運行性能測試。例如，您可以通過 2G 網絡從位於印度的服務器或通過網絡電纜從位於美國的服務器測試您的網站。

![WebPagetest 設置](images/webpagetest.png)

選擇一個位置，然後從高級設置中選擇連接類型。您甚至可以使用[腳本](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)（例如，登錄到某個網站）或通過使用其 [RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis)實現自動化測試。這可以幫助您在構建流程中納入連接測試或性能記錄。

[Fiddler](http://www.telerik.com/fiddler) 支持通過 [GeoEdge](http://www.geoedge.com/faq) 進行全局代理，並且可以使用其自定義規則來模擬調制解調器的速度。

![Fiddler 代理](images/fiddler.png)

###  在連接不佳的網絡狀態下測試

利用軟件和硬件代理，您可以模擬有問題的移動網絡狀況，例如帶寬限制、封包延遲和隨機丟包。利用共享代理或欠佳網絡，開發團隊可以將網絡實戰測試納入工作流程。

Facebook 的 [Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/) (ATC) 是以 BSD 許可證發佈的一套應用，可用於控制流量和模擬連接不良的網絡狀況：

![Facebook 的 Augmented Traffic Control](images/augmented-traffic-control.png)

> Facebook 甚至推出 [2G Tuesdays](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/) 項目來幫助瞭解 2G 網絡用戶的產品體驗。在週二，員工會收到一個彈出提示，讓他們選擇模擬 2G 連接。

[Charles](https://www.charlesproxy.com/){: .external } HTTP/HTTPS 代理可用來[調節帶寬和延遲](http://www.charlesproxy.com/documentation/proxying/throttling/)。Charles 是商業軟件，但提供有免費試用版。

![Charles 代理帶寬和延遲設置](images/charles.png)

有關 Charles 的更多信息，請參見 [codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/)。

## 處理不可靠的連接和“lie-fi”{: #lie-fi }

###  什麼是 lie-fi？

<a href="http://www.urbandictionary.com/define.php?term=lie-fi">lie-fi</a> 一詞至少可追溯到 2008 年（那時候手機看起來像<a href="https://www.mobilegazette.com/2008-phones-wallchart.htm" title="Images of phones from 2008">這樣</a>），是指看似連接而實際未連接的情況。瀏覽器看似已連接上網絡，但由於某種原因，實際並未連接。

像這種虛假連接會導致糟糕的體驗，因爲瀏覽器（或 JavaScript）會持續不斷地嘗試檢索資源，而不是放棄並選擇有效的備用連接。實際上，Lie-fi 比離線更糟，因爲如果確實離線的話，至少 JavaScript 可以採取相應的規避措施。

現在，越來越多的人捨棄固定寬帶而轉爲使用移動網絡，因此，Lie-fi 問題也越來越嚴峻。最新的[美國人口普查數據](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use)顯示，越來越多的人[捨棄固定寬帶而轉爲使用移動網絡](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/)。下圖是 2015 年和 2013 年在家使用移動互聯網的數據比較：

<img src="images/home-broadband.png" class="center" alt="顯示捨棄固定寬帶而轉爲使用移動網絡（尤其是低收入家庭）的美國人口普查數據圖">

###  使用超時來處理時斷時續的連接

過去，[使用 XHR 的笨方法](http://stackoverflow.com/questions/189430/detect-that-the-internet-connection-is-offline)用於測試時斷時續的網絡連接，但是服務工作線程採用更可靠的方法來設置網絡超時。Jeff Posnick 在其[通過服務工作線程實現瞬時加載](https://youtu.be/jCKZDTtUA2A?t=19m58s)演講中，解釋瞭如何使用 [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) 超時來實現這一目的：


    toolbox.router.get(
      '/path/to/image',
      toolbox.networkFirst,
      {networkTimeoutSeconds: 3}
    );
    

此外，[超時選項](https://github.com/whatwg/fetch/issues/20)也即將在 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) 中實現 - 而且 [Streams API](https://www.w3.org/TR/streams-api/) 會通過優化內容交付和避免龐大的請求來提供幫助。Jake Archibald 在[超負荷頁面加載](https://youtu.be/d5_6yHixpsQ?t=6m42s)中給出了有關如何解決 lie-fi 的更多詳情。


{# wf_devsite_translation #}
