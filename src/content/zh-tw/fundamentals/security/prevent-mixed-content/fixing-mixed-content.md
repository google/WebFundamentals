project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:查找和修正混合內容是一項重要任務，但可能非常耗時。本指南將介紹可爲此過程提供幫助的一些工具。

{# wf_published_on:2015-09-28 #}
{# wf_updated_on:2016-08-24 #}

# 防止混合內容 {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

成功：讓您的網站支持 HTTPS 是保護您的網站和用戶免受攻擊的重要一步，但混合內容會使這種保護失效。爲保護您的網站和用戶，查找和修正混合內容非常重要。

查找和修正混合內容是一項重要任務，但可能非常耗時。本指南將介紹可爲此過程提供幫助的一些工具和技術。如需瞭解混合內容本身的更多信息，請參閱[什麼是混合內容](./what-is-mixed-content)。

### TL;DR {: .hide-from-toc }

* 在您的頁面上加載資源時，請始終使用 https:// 網址。
* 使用 `Content-Security-Policy-Report-Only` 標頭監控網站上的混合內容錯誤。
* 使用 `upgrade-insecure-requests` CSP 指令防止訪問者訪問不安全的內容。

## 查找和修正混合內容 

手動查找混合內容可能很耗時，具體取決於存在的問題數量。本文檔中介紹的流程使用 Chrome 瀏覽器；但是大多數現代瀏覽器都提供相似的工具來幫助您處理此過程。

### 通過訪問網站查找混合內容

在 Google Chrome 中訪問 HTTPS 網頁時，瀏覽器會在 JavaScript 控制檯中以錯誤和警告的形式提醒您存在混合內容。


如需查看這些提醒，請轉到我們的被動混合內容或主動混合內容示例頁面，並打開 Chrome JavaScript 控制檯。您可以從“View”菜單（View -&gt; Developer -&gt; JavaScript Console）打開此控制檯或通過右鍵點擊此頁面，選擇“Inspect Element”，然後選擇“Console”打開。

[什麼是混合內容](what-is-mixed-content#passive-mixed-content){: .external}頁面中的[被動混合內容示例](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: .external}將導致系統顯示混合內容警告，如下所示：

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的視頻。此內容也應通過 HTTPS 提供。">
</figure>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

主動混合內容示例將導致系統顯示混合內容錯誤：


<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的資源。此請求已被阻止，內容必須通過 HTTPS 提供。">
</figure>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }


您需要在網站的源代碼中修正這些錯誤和警告中列出的 http:// 網址。列出這些網址及其所在頁面有助於您稍後修正它們。 

注：系統僅針對您當前正在查看的頁面顯示混合內容錯誤和警告，在每次您導航到一個新頁面時將清理 JavaScript 控制檯。這意味着您必須單獨查看網站的每一個頁面來查找這些錯誤。有些錯誤可能僅在您與頁面的一部分進行交互後纔出現，請參考我們之前的指南中提供的圖像庫混合內容示例。

### 在源代碼中查找混合內容

您可以在源代碼中直接搜索混合內容。在源代碼中搜索 `http://` 並查找包含 HTTP 網址屬性的標記。

具體而言，您要查找之前指南中的[混合內容類型與相關安全威脅](what-is-mixed-content#mixed-content-types--security-threats-associated){: .external}部分列出的標記。
請注意，在定位標記 (`<a>`) 的 href 屬性中有 `http://` 通常不屬於混合內容問題，後面會介紹一些值得注意的例外情況。
 

如果您有一個來自 Chrome 混合內容錯誤和警告的 HTTP 網址列表，您也可以在源代碼中搜索這些完整的網址，以找出它們在網站中的位置。

 

### 修正混合內容

在找出混合內容在網站源代碼中的位置後，按照下面的步驟進行修正。


將 Chrome 中的以下混合內容錯誤用作示例：

<figure>
  <img src="imgs/image-gallery-warning.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的圖像。此內容也應通過 HTTPS 提供。">
</figure>

下面是您在源代碼中找到的內容：
 
    <img src="http://googlesamples.github.io/web-fundamentals/.../puppy.jpg"> 

#### 第 1 步

通過在您的瀏覽器中打開一個新標籤，在地址欄中輸入網址，然後將 `http://` 更改爲 `https://`，檢查該網址是否可通過 HTTPS 提供。


如果通過 **HTTP** 和 **HTTPS** 顯示的資源相同，則一切正常。
繼續執行[第 2 步](#step-2)。

<div class="attempt-left">
  <figure>
    <img src="imgs/puppy-http.png">
    <figcaption class="success">
      HTTP 圖像加載沒有任何錯誤。
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/puppy-https.png">
    <figcaption class="success">
      HTTPS 圖像加載沒有任何錯誤，且圖像與 HTTP 加載的相同。轉到<a href="#step-2">第 2 步</a>！
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

如果您看到證書警告，或內容無法通過 **HTTPS** 顯示，則意味着無法安全地獲取資源。


<div class="attempt-left">
  <figure>
    <img src="imgs/https-not-available.png">
    <figcaption class="warning">
      資源無法通過 HTTPS 獲取。
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/https-cert-warning.png">
    <figcaption class="warning">
      嘗試通過 HTTPS 查看資源時系統發出的證書警告。
</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

在此情況下，您應考慮以下某個方案：

* 從一個不同的主機添加資源（如可用）。
* 如果法律允許，請在您的網站上直接下載和託管內容。
* 將此資源從您的網站完全排除。

#### 第 2 步

將網址從 `http://` 更改爲 `https://`，保存源文件，並在必要時重新部署更新文件。

#### 第 3 步

查看您最初發現錯誤的頁面，驗證並確保該錯誤不再出現。

### 請注意非標準標記的使用

請注意您網站上非標準標記的使用。例如，定位 (`<a>`) 標記網址自身不會產生混合內容，因爲它們使瀏覽器導航到新頁面。
這意味着它們通常不需要修正。然而，有些圖像庫腳本替換了 `<a>` 標記的功能，並將 `href` 屬性指定的 HTTP 資源加載到頁面上的燈箱展示，從而引發混合內容問題。


 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" region_tag="snippet1" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

在上面的代碼中，將 `<a>` 標記 href 保留爲 `http://` 可能看上去是安全的；但是，如果您查看示例並點擊圖像，您會發現其加載一個混合內容資源並在頁面上顯示它。

 

## 處理大批量的混合內容

上面的手動步驟在較小網站上的效果很好，但對於大網站，或具有許多獨立開發團隊的網站而言，它很難跟蹤記錄所有加載的內容。爲幫助處理此任務，您可以使用內容安全政策指示瀏覽器就混合內容通知您，並確保您的頁面絕不會意外加載不安全的資源。



### 內容安全政策

[**內容安全政策**](/web/fundamentals/security/csp/) (CSP) 是一個多用途瀏覽器功能，您可以用它管理大批量的混合內容。CSP 報告機制可用於跟蹤網站上的混合內容；強制政策可通過升級或阻止混合內容保護用戶。



您可以通過在服務器發送的響應中添加 `Content-Security-Policy` 或 `Content-Security-Policy-Report-Only` 標頭爲頁面啓用這些功能。此外，在頁面的 `<head>` 部分中，可以使用一個 `<meta>` 標記設置 `Content-Security-Policy`（**而非** `Content-Security-Policy-Report-Only`）。請參閱下文中的示例。

除了用於混合內容外，CSP 還有許多其他用途。可在以下資源中找到有關其他 CSP 指令的信息：

* [Mozilla 的 CSP 簡介](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy){: .external}
* [HTML5 Rock 的 CSP 簡介](//www.html5rocks.com/en/tutorials/security/content-security-policy/){: .external}
* [CSP playground](http://www.cspplayground.com/){: .external }
* [CSP 規範](//www.w3.org/TR/CSP/){: .external }

注：瀏覽器強制執行它們收到的<b>所有</b>內容安全政策。瀏覽器在響應標頭或 <code>&lt;meta&gt;</code> 元素中收到的多個 CSP 標頭值被合併，強制作爲一個政策；報告政策也以同樣的方式進行合併。通過採用政策的交集合並政策；也就是說，第一個政策之後的每個政策都只能進一步限制允許的內容，而不是擴寬它。



### 使用內容安全政策查找混合內容 

您可以使用內容安全政策收集網站上的混合內容報告。
如需啓用此功能，請設置 `Content-Security-Policy-Report-Only` 指令，方法是將其添加爲網站的響應標頭。
 

響應標頭：  

    Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint 


無論用戶在何時訪問網站上的頁面，他們的瀏覽器都會向 `https://example.com/reportingEndpoint` 發送有關任何違背內容安全政策的內容的 JSON 格式報告。

在此情況下，任何時候通過 HTTP 加載子資源，瀏覽器都會發送報告。
這些報告包括髮生政策違規行爲的頁面網址和違背該政策的子資源網址。如果您配置報告端點以記錄這些報告，您可以跟蹤您網站上的混合內容，無需親自訪問每個頁面。

 

對此，需要注意兩個方面：

* 用戶必須在可識別 CSP 標頭的瀏覽器中訪問您的頁面。
  這對於大多數現代瀏覽器都適用。
* 您只能獲得用戶已訪問的頁面的報告。因此，如果您有流量不太大的頁面，則這些頁面的報告可在您獲得整個網站的報告之前獲得。



如需瞭解 CSP 標頭格式的詳細信息，請參閱[內容安全政策規範](https://w3c.github.io/webappsec/specs/content-security-policy/#violation-reports){: .external}。 

如果您不想親自配置報告端點，[https://report-uri.io/](https://report-uri.io/){: .external} 是一個合理的替代做法。



### 升級不安全的請求

對於自動修正混合內容，其中一個最新最好的工具是 [**`upgrade-insecure-requests`**](//www.w3.org/TR/upgrade-insecure-requests/){: .external} CSP 指令。該指令指示瀏覽器在進行網絡請求之前升級不安全的網址。


例如，如果某個頁面包含一個帶有 HTTP 網址的圖像標記：

 
    <img src="http://example.com/image.jpg"> 


此瀏覽器改而對 <code><b>https:</b>//example.com/image.jpg</code> 進行安全請求，從而使用戶不會看到混合內容。



您可以通過發送一個帶此指令的 `Content-Security-Policy` 標頭啓用此功能：



    Content-Security-Policy: upgrade-insecure-requests  


或使用一個 `<meta>` 元素在文檔的 `<head>` 部分中嵌入相同的指令內聯：


  
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">  


值得注意的是，如果資源不能通過 HTTPS 獲得，則升級的請求失敗，並且無法加載該資源。
這可保證您的頁面的安全性。
 

`upgrade-insecure-requests` 指令級聯到 `<iframe>` 文檔中，從而確保整個頁面受到保護。


### 阻止所有混合內容

並非所有瀏覽器均支持 upgrade-insecure-requests 指令，因此，可使用替代指令 [**`block-all-mixed-content`**](http://www.w3.org/TR/mixed-content/#strict-checking){: .external} CSP 指令來保護用戶。此指令指示瀏覽器從不加載混合內容；所有混合內容資源請求均被阻止，包括主動混合內容和被動混合內容。此選項還級聯到 `<iframe>` 文檔中，確保整個頁面沒有混合內容。


頁面可以選擇執行此行爲，方法是發送一個帶有該指令的 `Content-Security-Policy` 標頭：


  
    Content-Security-Policy: block-all-mixed-content  


或使用一個 `<meta>` 元素在文檔的 `<head>` 部分中嵌入相同的指令內聯：


  
    <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">


使用 `block-all-mixed-content` 的弊端可能很明顯，即所有混合內容均被阻止。
這可提升安全性，但它意味着頁面上不再提供這些資源。
這可能會中斷用戶期望獲得的功能和內容。
 

### CSP 替代方案

如果您的網站由某個平臺（如 Blogger）代爲託管，那麼，您可能沒有相應權限來修改標頭和添加 CSP。一個可行的替代方案是使用 [HTTPSChecker](https://httpschecker.net/how-it-works#httpsChecker){: .external } 或[混合內容掃描](https://github.com/bramus/mixed-content-scan){: .external } 等網站抓取工具代您查找您的網站中的問題。








{# wf_devsite_translation #}
