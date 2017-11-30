project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:內容安全政策可顯著降低現代瀏覽器中跨網站腳本攻擊的風險和影響。

{# wf_published_on:2012-06-15 #}
{# wf_updated_on:2016-02-19 #}

# 內容安全政策 {: .page-title }

{% include "web/_shared/contributors/mikewest.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}

網站的安全模式源於[同源政策](//en.wikipedia.org/wiki/Same-origin_policy){: .external}。
來自 `https://mybank.com` 的代碼應僅能訪問 `https://mybank.com` 的數據，而絕不被允許訪問 `https://evil.example.com`。每個源均與其餘網絡保持隔離，從而爲開發者提供一個可進行構建和操作的安全沙盒。在理論上，這非常棒。而在實踐中，攻擊者已找到聰明的方式來破壞系統。


例如，[跨網站腳本 (XSS)](//en.wikipedia.org/wiki/Cross-site_scripting){: .external}攻擊可通過欺騙網站提供惡意代碼和計劃好的內容來繞過同源政策。這是個大問題，因爲瀏覽器將網頁上顯示的所有代碼視爲該網頁安全源的合法部分。[XSS 備忘單](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet){: .external}是一種舊的但具有代表性的跨會話方法，攻擊者可通過該方法注入惡意代碼來違背信任。
如果攻擊者成功地注入任意代碼，則系統很可能受到了攻擊：用戶會話數據泄露，應保密的信息被透露給壞人。很顯然，可能的話，我們想阻止這種情況發生。


本概覽重點介紹一個可顯著降低現代瀏覽器中 XSS 攻擊的風險和影響的防護功能：
內容安全性政策 (CSP)。

### TL;DR {: .hide-from-toc }
* 使用白名單告訴客戶端允許加載和不允許加載的內容。
* 瞭解可使用哪些指令。
* 瞭解這些指令接受哪些關鍵字。
* 內聯代碼和 `eval()` 被視爲是有害的。
* 向服務器舉報政策違規行爲，以免執行這些行爲。


## 來源白名單 


瀏覽器無法區分哪些腳本是應用的一部分，哪些是第三方惡意注入的，因此，XSS 攻擊會利用這個漏洞。例如，在本頁面來源的上下文中，頁面底部的 Google +1 按鈕會加載和執行來自 `https://apis.google.com/js/plusone.js` 的代碼。我們信任該代碼，但我們不能期望瀏覽器本身可以明白來自 `apis.google.com` 的代碼是好的，而來自 `apis.evil.example.com` 的代碼很可能不好。瀏覽器欣然地下載並執行頁面請求的任意代碼，而不會考慮其來源。


CSP 定義 `Content-Security-Policy` HTTP 標頭，其允許您創建信任的內容的來源白名單，並指示瀏覽器僅執行或渲染來自這些來源的資源，而不要盲目地信任服務器提供的所有內容。即使攻擊者能夠發現可從中注入腳本的漏洞，由於此腳本也不符合此白名單，因此，也不會執行該腳本。



由於我們信任 `apis.google.com` 傳輸有效代碼，並且我們信任我們自己也能做到，因此，我們可以定義一個政策，該政策僅允許執行來自以下兩個來源之一的腳本：



    Content-Security-Policy: script-src 'self' https://apis.google.com

很簡單，對不對？您可能已猜到，`script-src` 是一條指令，其用於控制腳本對於某個特定頁面所享有的一組權限。
我們已指定 `'self'` 作爲一個有效的腳本來源，指定 `https://apis.google.com` 作爲另一個有效的腳本來源。瀏覽器通過 HTTPS 以及當前頁面的來源從 `apis.google.com` 盡職地下載和執行 JavaScript。


<div class="attempt-right">
  <figure>
    <img src="images/csp-error.png" alt="控制檯錯誤：拒絕加載腳本“http://evil.example.com/evil.js”，因爲它違反了以下內容安全政策指令：script-src 'self' https://apis.google.com">
  </figure>
</div>

定義此政策後，瀏覽器只會引發一個錯誤，而不會加載來自任何其他來源的腳本。
當狡猾的攻擊者設法將代碼注入您的網站時，他們只會看到一條錯誤消息，而不是他們期待的成功。



### 政策適用於各種各樣的資源

儘管腳本資源是最顯而易見的安全風險，但 CSP 提供了一個豐富的政策指令集，讓您可以對允許頁面加載的資源進行相當精細的控制。您已瞭解 `script-src`，因此，這個概念應該很清晰了。
我們快速地看一下其餘資源指令：

* **`base-uri`** 用於限制可在頁面的 `<base>` 元素中顯示的網址。
* **`child-src`** 用於列出適用於工作線程和嵌入的幀內容的網址。例如：`child-src https://youtube.com` 將啓用來自 YouTube（而非其他來源）的嵌入視頻。
使用此指令替代已棄用的 **`frame-src`** 指令。
* **`connect-src`** 用於限制可（通過 XHR、WebSockets 和 EventSource）連接的來源。
* **`font-src`** 用於指定可提供網頁字體的來源。Google 的網頁字體可通過 `font-src https://themes.googleusercontent.com` 啓用。
* **`form-action`** 用於列出可從 `<form>` 標記提交的有效端點。
* **`frame-ancestors`** 用於指定可嵌入當前頁面的來源。此指令適用於 `<frame>`、`<iframe>`、`<embed>` 和 `<applet>` 標記。此指令不能在 `<meta>` 標記中使用，並僅適用於非 HTML 資源。
* **`frame-src`** 已棄用。請改用 **`child-src`**。
* **`img-src`** 用於定義可從中加載圖像的來源。
* **`media-src`** 用於限制允許傳輸視頻和音頻的來源。
* **`object-src`** 可對 Flash 和其他插件進行控制。
* **`plugin-types`** 用於限制頁面可以調用的插件種類。
* **`report-uri`** 用於指定在違反內容安全政策時瀏覽器向其發送報告的網址。此指令不能用於 `<meta>` 標記。
* **`style-src`** 是 `script-src` 版的樣式表。
* **`upgrade-insecure-requests`** 指示 User Agent 將 HTTP 更改爲 HTTPS，重寫網址架構。
該指令適用於具有大量舊網址（需要重寫）的網站。


默認情況下，這些指令的適用範圍很廣。如果您不爲某條指令（例如，`font-src`）設置具體的政策，則默認情況下，該指令在運行時假定您指定 `*` 作爲有效來源（例如，您可以從任意位置加載字體，沒有任何限制）。




您可以通過指定一個 **`default-src`** 指令替換此默認行爲。
此指令用於定義您未指定的大多數指令的默認值。
一般情況下，這適用於以 `-src` 結尾的任意指令。
如果將 `default-src` 設爲 `https://example.com`，並且您未能指定一個 `font-src` 指令，那麼，您可以從 `https://example.com` 加載字體，而不能從任何其他地方加載。在我們前面的示例中，我們僅指定了 `script-src`，其表示可以從任意來源加載圖像、字體等。



以下指令不使用 `default-src` 作爲回退指令。請記住，如果不對其進行設置，則等同於允許加載任何內容。


* `base-uri`
* `form-action`
* `frame-ancestors`
* `plugin-types`
* `report-uri`
* `sandbox`

您可以針對您的特定應用使用任意數量的上述指令，只需在 HTTP 標頭中列出每條指令，並使用分號將它們隔開。

請確保在一條指令中列出所需的特定類型的全部資源。
如果您編寫類似 `script-src https://host1.com; script-src https://host2.com` 的指令，則第二條指令將被忽略。如下指令可正確地將這兩個來源指定爲有效來源：


    script-src https://host1.com https://host2.com

例如，如果您有一個從內容交付網絡（例如，`https://cdn.example.net`）加載所有資源的應用，並清楚您不需要任何幀內容或插件，則您的政策可能類似如下：




    Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'

### 實現詳情

在網絡上的各種教程中您會看到 `X-WebKit-CSP` 和 `X-Content-Security-Policy` 標頭。
今後，您應忽略這些帶前綴的標頭。
現代瀏覽器（IE 除外）均支持不帶前綴的 `Content-Security-Policy` 標頭。
您應該使用此類標頭。

無論您使用何種標頭，都要逐頁定義政策：在發送 HTTP 標頭的同時您還需要連帶發送您希望確保予以保護的每個響應。這樣非常靈活，因爲您可以根據特定頁面的需求調整針對該頁面的政策。
也許您的網站中的某一組頁面具有 +1 按鈕，而其他頁面則沒有：您可以僅在必要時允許加載此按鈕代碼。



每條指令中的來源列表都是靈活的。您可以按架構（`data:`、`https:`）指定來源，也可按各種具體條件指定來源範圍，這些條件從僅限定主機名（`example.com`，即匹配該主機上的任意來源：任意架構、任意端口）到完全限定 URI（`https://example.com:443`，僅匹配 HTTPS、僅匹配 `example.com` 和僅匹配端口 443），不一而足。接受使用通配符，但通配符僅可用作架構、端口，或者僅可位於主機名的最左側：`*://*.example.com:*` 將與 `example.com` 使用任何架構、位於任何端口上的所有子域名（但 `example.com` 本身除外）匹配。




此來源列表還接受四個關鍵字：

* 如您所料，**`'none'`** 不執行任何匹配。
* **`'self'`** 與當前來源（而不是其子域）匹配。
* **`'unsafe-inline'`** 允許使用內聯 JavaScript 和 CSS。（我們稍後將對此進行詳細介紹。）
* **`'unsafe-eval'`** 允許使用類似 `eval` 的 text-to-JavaScript 機制。（我們也會介紹這個關鍵字。）


上述關鍵字需要使用單引號。例如，`script-src 'self'`（帶引號）可授權執行來自當前主機的 JavaScript；`script-src self`（無引號）可啓用來自名爲“`self`”的服務器（而不是來自當前主機）的 JavaScript，而這可能並非您的本意。




### 沙盒

還有一條指令值得探討：`sandbox`。該指令與我們看到的其他指令有些不同，因爲它限制的是頁面可進行的操作，而不是頁面可加載的資源。如果 `sandbox` 指令存在，則將此頁面視爲使用 `sandbox` 屬性在 `<iframe>` 的內部加載的。這可能會對該頁面產生廣泛的影響：強制該頁面進入一個唯一的來源，同時阻止表單提交等其他操作。上述內容有點超出本文的範疇，但您可以在 [HTML5 規範中的“沙盒”部分](https://developers.whatwg.org/origin-0.html#sandboxing){: .external}.{: .external} 中找到關於有效的沙盒屬性的完整詳細信息。



### 元標記

CSP 首選的傳輸機制是一個 HTTP 標頭。不過，在標記中直接設置一個頁面政策會非常有用。
使用一個 `http-equiv` 屬性通過 `<meta>` 標記進行此設置：



    <meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">


該政策不能用於 frame-ancestors、report-uri 或 sandbox。

## 內聯代碼被視爲是有害的。

很明顯，CSP 基於白名單來源，因爲此方法可明確指示瀏覽器將特定的資源集視爲可接受的資源，並拒絕其餘資源。不過，基於來源的白名單無法解決 XSS 攻擊帶來的最大威脅：內聯腳本注入。如果攻擊者可以注入一個 script 標記，在標記中直接包含一些惡意的負載 (<code>&lt;script&gt;sendMyDataToEvilDotCom();&lt;/script&gt;</code>)，則瀏覽器將無法將它與合法內聯腳本標記區分開來。CSP 可通過完全禁止內聯腳本來解決此問題：這是唯一確定有效的方式。



此禁止規則不僅包括在 `script` 標記中直接嵌入的腳本，也包括內聯事件處理程序和 `javascript:` 網址。
您需要將 `script` 標記的內容移入外部文件，並使用相應的 `addEventListener()` 調用替換 `javascript:` 網址和 `<a ...
onclick="[JAVASCRIPT]">`。
例如，您可以將以下內容



    <script>
      function doAmazingThings() {
        alert('YOU AM AMAZING!');
      }
    </script>
    <button onclick='doAmazingThings();'>Am I amazing?</button>


重寫爲下面這樣：

    <!-- amazing.html -->
    <script src='amazing.js'></script>
    <button id='amazing'>Am I amazing?</button>

<div style="clear:both;"></div>


    // amazing.js
    function doAmazingThings() {
      alert('YOU AM AMAZING!');
    }
    document.addEventListener('DOMContentReady', function () {
      document.getElementById('amazing')
        .addEventListener('click', doAmazingThings);
    });


除了能夠更好地配合 CSP 外，重寫的代碼還具有許多優勢；無論您是否使用 CSP，這都是最佳做法。
內聯 JavaScript 混合結構和行爲的方式正是您不應採用的方式。使用外部資源，瀏覽器更容易緩存，開發者也更容易理解，並有助於編譯和壓縮。如果您將代碼移入外部資源，那麼您可以編寫更好的代碼。


以相同方式處理內聯樣式：`style` 屬性和 `style` 標記都應合併到外部樣式表，以防範可通過 CSS 實現的各種[極其狡猾的](http://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html){: .external} 數據滲漏方法。




如果您必須具有內聯腳本和樣式，您可以啓用它，只需在 `script-src` 或 `style-
src` 指令中添加一個 `'unsafe-inline'` 作爲允許的來源。
您也可以使用一個隨機數或哈希值（見下文），但您真不應這麼做。禁止內聯腳本是 CSP 提供的最大安全性優勢，禁止內聯樣式同樣可以提高應用的安全性。
要確保在移除所有不符規範的代碼之後能夠正常運行，需要預先做一些工作，但這是值得采取的折衷做法。



### 如果您一定要使用它 ...

CSP Level 2 可爲內聯腳本提供向後兼容性，即允許您使用一個加密隨機數（數字僅使用一次）或一個哈希值將特定內聯腳本列入白名單。儘管這可能很麻煩，但它在緊急情況下很有用。


要使用隨機數，請爲您的 script 標記提供一個隨機數屬性。該值必須與信任的來源列表中的某個值匹配。
例如：


    <script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
      //Some inline code I cant remove yet, but need to asap.
    </script>


現在，將隨機數添加到已追加到 `nonce-` 關鍵字的 `script-src` 指令。

    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

請記住，必須爲每個頁面請求重新生成隨機數，並且隨機數必須是不可猜測的。


哈希值的工作方式與此大致相同。創建腳本自身的 SHA 哈希值並將其添加到 `script-src` 指令，而不是爲 script 標記添加代碼。例如，假設您的頁面包含以下內容：




    <script>alert('Hello, world.');</script>


您的政策將包含以下內容：

    Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

以下是幾點注意事項。`sha*-` 前綴指定生成此哈希值的算法。
上面的示例中便運用了 sha256-。CSP 同樣支持 sha384- 和 sha512-。
生成此哈希值時不包含 `<script>` 標記。
大寫字母和空格也同樣重要，包括前導空格或結尾空格。


使用 Google 搜索如何生成 SHA 哈希值，將會返回任何語言的解決方法。
使用 Chrome 40 或更高版本，您可以打開 DevTools，然後重新加載您的頁面。
Console 標籤將包含錯誤消息，提供每個內聯腳本的正確的 sha256 哈希值。


## Eval 同樣有害

即使攻擊者無法直接注入腳本，他們也會欺騙您的應用將不活動文本轉換爲可執行的 JavaScript，並代表他們執行它。 <code>eval()</code>、<code>new
Function()</code>、 <code>setTimeout([string], ...)</code> 和 <code>setInterval([string], ...)</code> 都是矢量，通過它們注入文本最終會導致執行一些意外的惡意行爲。CSP 對於此風險的默認響應是完全阻止所有這些矢量。



這對您構建應用的方式有不小的影響。

*   您必須通過內置 `JSON.parse` 解析 JSON，而不是依靠 `eval` 來解析。
原生 JSON 操作在 [IE8 及以上版本的每個瀏覽器](http://caniuse.com/#feat=json){: .external} 中均可用，並且十分安全。
*   使用內聯函數（而不是字符串）重寫您當前正在進行的任何 `setTimeout` 或 `setInterval` 調用。
例如：

<div style="clear:both;"></div>

    setTimeout("document.querySelector('a').style.display = 'none';", 10);


最好重寫爲


    setTimeout(function () {
      document.querySelector('a').style.display = 'none';
    }, 10);


*   在運行時避免使用內聯模板：爲在運行時加快模板生成的速度，許多模板庫大量使用 `new
    Function()`。這是一個高效的動態編程應用，但在評估惡意文本時存在風險。某些框架可立即支持 CSP，在缺少 `eval` 時回退到可靠的解析器。[AngularJS 的 ng-csp 指令](https://docs.angularjs.org/api/ng/directive/ngCsp){: .external} 就是一個很好的例子。



不過，最好選擇可提供預編譯（例如，[Handlebars 就可以](http://handlebarsjs.com/precompilation.html){: .external}）的模板語言。預編譯您的模板能夠讓用戶體驗到甚至比最快的運行時實現還要快的速度，並且也更加安全。
如果 eval 及其 text-to-JavaScript 兄弟指令對您的應用非常重要，您可以通過在 `script-src` 指令中添加一個 `'unsafe-eval'` 作爲允許的來源來啓用它們，但我們很不贊成這麼做。禁止執行字符串讓攻擊者更難以在您的網站上執行未授權的代碼。



## 報告 


CSP 能夠阻止不受信任的資源客戶端，這對於您的用戶來說是一個巨大的優勢，而若能夠向服務器返回某種通知以便您可以在第一時間發現和制止允許惡意注入的錯誤，更是很有幫助。因此，您可以指示瀏覽器將 JSON 格式的違規行爲報告  <code>POST</code> 到在  <code>report-uri</code> 指令中指定的位置。




    Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

這些報告將類似如下：


    {
      "csp-report": {
        "document-uri": "http://example.org/page.html",
        "referrer": "http://evil.example.com/",
        "blocked-uri": "http://evil.example.com/evil.js",
        "violated-directive": "script-src 'self' https://apis.google.com",
        "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
      }
    }



此報告包含很多信息，可幫助您跟蹤違規行爲的具體原因，包括髮生違規行爲的頁面 (`document-uri`)、該頁面的引用站點（注意，與 HTTP 標頭字段不同，此鍵值不存在拼寫錯誤）、違反頁面政策 (`blocked-uri`) 的資源、其違反的具體指令 (`violated-directive`) 以及頁面的完整政策 (`original-policy`)。






### 僅報告

如果您是剛剛開始使用 CSP，那麼，在向您的用戶部署嚴格的政策前，先評估您的應用的當前狀態很重要。作爲完整部署的敲門磚，您可以要求瀏覽器監控某個政策，報告違規行爲，但不強制執行限制。發送 `Content-Security-Policy-Report-Only` 標頭，而不是 `Content-Security-Policy` 標頭。



    Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

在僅報告模式中指定的政策不會阻止限制的資源，但會向您指定的位置發送違規行爲報告。
您甚至可以發送兩個標頭，在強制執行一個政策的同時監控另一個政策。
此方式可有效評估更改應用的 CSP 產生的影響：針對新政策啓用報告，監控違規行爲報告，並修復出現的所有錯誤；如果您對其效果滿意，可開始強制執行新政策。






## 真實用例 

CSP 1 在 Chrome、Safari 和 Firefox 中非常實用，但在 IE 10 中僅得到非常有限的支持。
您可以<a href="http://caniuse.com/#feat=contentsecuritypolicy">
在 canisue.com 上查看具體信息</a>。CSP Level 2 在 Chrome 40 及更高版本中可用。
Twitter 和 Facebook 等大量網站已部署此標頭（<a href="https://blog.twitter.com/2011/improving-browser-security-with-csp">Twitter 的案例研究</a>值得一讀），併爲您開始在自己的網站上進行部署制定了相應標準。




爲您的應用制定政策的第一步是評估您實際加載的資源。
一旦您已瞭解在您的應用中整合內容的方式，則可以基於這些要求設置一個政策。我們來看幾個常見用例，並確定我們如何在 CSP 的保護範圍內爲它們提供最好的支持。


### 用例 #1：社交媒體小部件

* Google 的 [+1 按鈕](/+/web/+1button/){: .external} 包括一個來自 `https://apis.google.com` 的腳本，並從 `https://plusone.google.com` 嵌入一個 `<iframe>`。爲嵌入此按鈕，您需要一個同時包含這兩個來源的政策。
一個最低限度的政策應該是`script-src
https://apis.google.com; child-src https://plusone.google.com`。您也需要確保將 Google 提供的 JavaScript 代碼段提取到一個外部 JavaScript 文件中。如果您有一個使用 `child-src` 的現有政策，您需要將其更改爲 `child-src`。
* Facebook 的 [Like 按鈕](//developers.facebook.com/docs/plugins/like-button){: .external }

具有許多實現選項。我們建議堅持使用 `<iframe>` 版本，因爲它已安全地放入沙盒，與網站的其餘部分隔離開來。
爲了正常運行，它需要一個 `child-src https://facebook.com` 指令。
請注意，默認情況下，Facebook 提供的 `<iframe>` 代碼加載一個相對網址 `//facebook.com`。對該網址進行更改以明確指定 HTTPS：`https://facebook.com`。
除非迫不得已，否則沒有理由使用 HTTP。

* Twitter 的 [Tweet 按鈕](https://publish.twitter.com/#)信任對腳本和幀的訪問，這兩者均在 `https://platform.twitter.com` 上進行託管。（默認情況下，Twitter 同樣提供一個相對網址；在本地複製/粘貼此代碼時，編輯該代碼以指定 HTTPS。）您可通過 `script-src https://platform.twitter.com; child-src
https://platform.twitter.com` 搞定，只要您將 Twitter 提供的 JavaScript 代碼段移入外部 JavaScript 文件。
* 其他平臺具有相似需求，可通過類似的方式解決。
我們建議只設置一個值爲 `'none'` 的 `default-src` ，並觀察您的控制檯以確定您需要哪些資源才能使小部件正常運行。


添加多個小部件非常簡單：只需將政策指令合併，請記得將同一類型的所有資源合併到一條指令中。如果所有三個社交媒體小部件您都需要，則此政策應類似如下：


    script-src https://apis.google.com https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com

### 用例 #2：鎖定

讓我們假設一下，您在運行一個銀行網站，並希望確保只能加載您自己寫入的資源。
在此情形下，首先設置一個阻止所有內容的默認政策 (`default-src
'none'`)，然後在此基礎上逐步構建。


假設此銀行網站在 `https://cdn.mybank.net` 上加載所有來自 CDN 的圖像、樣式和腳本，並通過 XHR 連接到 `https://api.mybank.com/` 以抽取各種數據。可使用幀，但僅用於網站的本地頁面（無第三方來源）。
網站上沒有 Flash，也沒有字體和 Extra。
我們能夠發送的最嚴格的 CSP 標頭爲：

    Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'

### 用例 #3：僅 SSL

一個婚戒論壇管理員想要確保所有資源僅通過安全渠道加載，但不會真正編寫很多代碼；他沒有能力僅僅依靠內聯腳本和樣式來重寫第三方論壇軟件的大量代碼。以下政策將非常有效：


    Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'

即使在 `default-src` 中指定了 `https:`，此腳本和樣式指令不會自動繼承該來源。
每條指令均會完全覆蓋該特定資源類型的默認值。


## 展望未來


內容安全政策級別 2 是一個<a href="http://www.w3.org/TR/CSP2/">
候選建議</a>。W3C 的 Web 應用安全工作組已開始着手此規範的下次更新，[內容安全政策級別 3](https://www.w3.org/TR/CSP3/){: .external }。

 


如果您對這些即將發佈的功能介紹感興趣，[請查看 public-webappsec@ 郵件列表存檔](http://lists.w3.org/Archives/Public/public-webappsec/)，或親自加入探討。




{# wf_devsite_translation #}
