project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:如果初始 HTML 內容通過安全的 HTTPS 連接加載，但其他資源通過不安全的 HTTP 連接加載，則會出現混合內容。

{# wf_updated_on:2016-08-24 #}
{# wf_published_on:2015-09-25 #}

# 什麼是混合內容？ {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

**混合內容**在以下情況下出現：初始 HTML 內容通過安全的 HTTPS 連接加載，但其他資源（例如，圖像、視頻、樣式表、腳本）則通過不安全的 HTTP 連接加載。之所以稱爲混合內容，是因爲同時加載了 HTTP 和 HTTPS 內容以顯示同一個頁面，且通過 HTTPS 加載的初始請求是安全的。現代瀏覽器會針對此類型的內容顯示警告，以向用戶表明此頁面包含不安全的資源。



### TL;DR {: .hide-from-toc }

* HTTPS 對於保護您的網站和用戶免受攻擊非常重要。
* 混合內容會降低您的 HTTPS 網站的安全性和用戶體驗。

## 資源請求和網絡瀏覽器

當瀏覽器訪問網站的頁面時，它將請求 HTML 資源。然後，網絡服務器返回 HTML 內容，瀏覽器進行解析並顯示給用戶。通常，一個 HTML 文件不足以顯示一個完整頁面，因此，HTML 文件包含瀏覽器需要請求的其他資源的引用。這些子資源可以是圖像、視頻、額外 HTML、CSS 或 JavaScript 之類的資源；每個資源均使用單獨的請求獲取。 

## HTTPS 的優勢

當瀏覽器通過 HTTPS（HTTP Secure 的縮寫形式）請求資源時，它使用一個已加密連接與網絡服務器進行通信。


使用 HTTPS 有三個主要優勢：

* 身份驗證
* 數據完整性
* 保密性

### 身份驗證

我正在訪問的網站是正確的嗎？ 

HTTPS 讓瀏覽器檢查並確保其已打開正確的網站，並且沒有被重定向到惡意的網站。
當導航到您的銀行網站時，您的瀏覽器對該網站進行身份驗證，從而防止攻擊者冒充您的銀行竊取您的登錄憑據。

 

### 數據完整性

是否有人篡改我正在發送或接收的內容？ 

HTTPS 讓瀏覽器檢測是否有攻擊者更改了瀏覽器接收的任何數據。
使用您的銀行網站轉賬時，這樣做可防止當您的請求在傳輸中時攻擊者更改目標帳號。

 

### 保密性

是否有人能看到我正在發送或接收的內容？

HTTPS 可防止攻擊者竊取瀏覽器的請求，跟蹤訪問的網站或竊取已發送或接收的信息。
 

### HTTPS、傳輸層安全協議 (TLS) 和 SSL

HTTPS 是 HTTP Secure 的縮寫，即超文本傳輸安全協議。此處的 **secure** 部分來自於添加到瀏覽器發送和接收的請求的加密。目前大多數瀏覽器都使用傳輸層安全協議 (TLS) 提供加密；**TLS** 有時稱爲 SSL。
 

本文不會詳細介紹 HTTPS、傳輸層安全協議 (TLS) 和 SSL，但是，如果您想了解更多信息，可以先從以下資源入手：


* [Wikipedia HTTPS](https://en.wikipedia.org/wiki/HTTPS){: .external}
* [Wikipedia TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security){: .external}
* [可汗學院 (Khan Academy) 的加密課程](https://www.khanacademy.org/computing/computer-science/cryptography){: .external}
* [高性能瀏覽器網絡](http://chimera.labs.oreilly.com/books/1230000000545){: .external}（作者：Ilya Grigorik）中的[傳輸層安全協議 (TLS) 章節](http://chimera.labs.oreilly.com/books/1230000000545/ch04.html){: .external} 

## 混合內容會降低 HTTPS 的安全性

使用不安全的 HTTP 協議請求子資源會降低整個頁面的安全性，因爲這些請求容易受到**中間人攻擊**，攻擊者竊聽網絡連接，查看或修改雙方的通信。通過使用這些資源，攻擊者通常可以完全控制頁面，而不只是泄露的資源。

儘管許多瀏覽器向用戶報告混合內容警告，但出現警告時爲時已晚：不安全的請求已被執行，且頁面的安全性被破壞。遺憾的是，這種情況在網絡中很普遍，正因如此，瀏覽器不能簡單地阻止所有混合請求，否則將會限制許多網站的功能。



<figure>
  <img src="imgs/image-gallery-warning.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的圖像。此內容也應通過 HTTPS 提供。">
  <figcaption>
    修正應用中的混合內容問題是開發者的責任。
</figcaption>
</figure>

### 一個簡單的示例

從 HTTPS 頁面加載不安全的腳本。

查看通過 **HTTPS**&mdash;[**https**://googlesamples.github.io/web-fundamentals/.../simple-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: .external}加載的此示例頁面 &mdash; 添加一個 **HTTP** 腳本標記，其嘗試加載混合內容。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/simple-example.html" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: target="_blank" .external }

在此示例中，使用一個 **HTTP** 網址加載腳本 `simple-example.js`。這是最簡單的混合內容案例。瀏覽器請求 `simple-example.js` 文件時，攻擊者可以將代碼注入返回的內容，並控制整個頁面。
 

幸運的是，大多數現代瀏覽器均默認阻止此類危險的內容。
請參閱[具有混合內容的瀏覽器行爲](#browser-behavior-with-mixed-content){: .external}。

<figure>
  <img src="imgs/simple-mixed-content-error.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的腳本。此請求已被阻止，內容必須通過 HTTPS 提供。">
  <figcaption>Chrome 可阻止不安全的腳本。</figcaption>
</figure>

### 一個 XMLHttpRequest 示例

通過 XMLHttpRequest 加載不安全的數據。

查看通過 **HTTPS**&mdash;[**https**://googlesamples.github.io/web-fundamentals/.../xmlhttprequest-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: .external} 加載的此示例頁面 &mdash; 添加一個通過 **HTTP** 加載的`XMLHttpRequest`，以獲取混合內容 `JSON` 數據。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/xmlhttprequest-example.html" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: target="_blank" .external }

下面的 **HTTP** 網址是在 JavaScript 中動態構建的，並且最終被 `XMLHttpRequest` 用於加載不安全的資源。
與上面簡單的示例相似，當瀏覽器請求 `xmlhttprequest-data.js` 文件時，攻擊者可以將代碼注入返回的內容中，並控制整個頁面。




大多數現代瀏覽器也會阻止這些危險的請求。

<figure>
  <img src="imgs/xmlhttprequest-mixed-content-error.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的 XMLHttpRequest 端點。此請求已被阻止，內容必須通過 HTTPS 提供。">
  <figcaption>Chrome 可阻止不安全的 XMLHttpRequest。</figcaption>
</figure>

### 圖像庫示例

使用 jQuery 燈箱加載不安全的圖像。

查看通過 **HTTPS**&mdash;[**https**://googlesamples.github.io/web-fundamentals/.../image-gallery-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: .external} 加載的此示例頁面時 &mdash; 最初沒有任何混合內容問題；但是當點擊縮略圖時，將通過 **HTTP** 加載完整尺寸的混合內容圖像。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

圖像庫通常依靠 `<img>` 標記 `src` 屬性在頁面上顯示縮略圖，然後，使用定位 (`<a>`) 標記 `href` 屬性爲圖像庫疊加層加載完整尺寸的圖像。正常情況下，`<a>` 標記不會產生混合內容，但在此例中，jQuery 代碼替換默認鏈接行爲（導航到新頁面），改爲在此頁面上加載 **HTTP** 圖像。


 

<figure>
  <img src="imgs/image-gallery-warning.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的圖像。此內容也應通過 HTTPS 提供。">
</figure>

不安全的圖像會降低網站的安全性，但是它們的危險性與其他類型的混合內容不一樣。
現代瀏覽器仍會加載混合內容圖像，但也會向用戶顯示警告。
 

## 混合內容類型與相關安全威脅

混合內容有兩種：主動混合內容和被動混合內容 

**被動混合內容**指的是不與頁面其餘部分進行交互的內容，從而使中間人攻擊在攔截或更改該內容時能夠執行的操作受限。被動混合內容包括圖像、視頻和音頻內容，以及無法與頁面其餘部分進行交互的其他資源。

  

**主動混合內容**作爲整體與頁面進行交互，並且幾乎允許攻擊者對頁面進行任何操作。
主動混合內容包括瀏覽器可下載和執行的腳本、樣式表、iframe、flash 資源及其他代碼。



### 被動混合內容

被動混合內容仍會給您的網站和用戶帶來安全威脅。
例如，攻擊者可以攔截針對網站上的圖像的 HTTP 請求，調換或更換這些圖像；此攻擊者可以調換“save and delete”按鈕圖像，導致您的用戶無意間刪除內容；將您的產品圖表更換爲下流或淫穢內容，從而損害您的網站；或將您的產品圖像更換爲不同網站或產品的廣告。



 

即使攻擊者不改變您的網站內容，您仍面臨嚴重的隱私問題，攻擊者可以使用混合內容請求跟蹤用戶。攻擊者可以基於瀏覽器加載的圖像或其他資源瞭解用戶訪問哪些頁面，以及查看了哪些產品。


以下是被動混合內容的示例： 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/passive-mixed-content.html" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

大多數瀏覽器仍向用戶渲染此類型的混合內容，但是也會顯示警告，因爲這些內容會給您的網站和用戶帶來安全風險和隱私風險。

 

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的視頻。此內容也應通過 HTTPS 提供。">
  <figcaption>來自 Chrome JavaScript 控制檯的混合內容警告。</figcaption>
</figure>

### 主動混合內容

與被動混合內容相比，主動混合內容造成的威脅更大。攻擊者可以攔截和重寫主動內容，從而完全控制頁面，甚至整個網站。這讓攻擊者可以更改有關頁面的任何內容，包括顯示完全不同的內容、竊取用戶密碼或其他登錄憑據、竊取用戶會話 Cookie，或將用戶重定向到一個完全不同的網站。


 

鑑於這種威脅的嚴重性，許多瀏覽器都會默認阻止此類型的內容以保護用戶，但是其作用因瀏覽器供應商和版本而有所差異。



以下包含主動混合內容的示例：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/active-mixed-content.html" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="混合內容：頁面已通過 HTTPS 加載，但請求了不安全的資源。此請求已被阻止，內容必須通過 HTTPS 提供。">
  <figcaption>來自 Chrome JavaScript 控制檯的混合內容錯誤。</figcaption>
</figure>

## 具有混合內容的瀏覽器行爲

鑑於上述威脅，瀏覽器最好是阻止所有混合內容。
但是，這將破壞大量網站，而數百萬用戶每天都要訪問這些網站。
當前的折衷做法是阻止最危險的混合內容類型，同時仍允許請求不太危險的混合內容類型。

 

現代瀏覽器遵循[混合內容規範](https://w3c.github.io/webappsec/specs/mixedcontent/){: .external }，其定義了[**可選擇性地阻止的內容**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-optionally-blockable){: .external}和[**可阻止的內容**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-blockable){: .external}類別。 

根據此規範，“當破壞網絡重要部分的風險超過允許此資源作爲混合內容使用的風險時”，該資源有資格成爲可選擇性阻止的內容；這是上述[被動混合內容](#passive-mixed-content)類別的子集。在撰寫本文時，可選擇性阻止的內容中僅包括圖像、視頻和音頻資源以及預獲取的鏈接這些資源類型。隨着時間的推移，此類別可能會縮小。


**可選擇性阻止的內容**以外的所有內容被視爲**可阻止的內容**，將被瀏覽器阻止。
 

### 瀏覽器版本

切記，並不是網站的每個訪問者都使用最新的瀏覽器。
不同瀏覽器供應商的不同版本的瀏覽器處理混合內容的方式不盡相同。
最糟糕的情況是，有些瀏覽器和版本根本不會阻止任何混合內容，這對於用戶而言非常不安全。
 

每個瀏覽器的確切行爲不斷變化，因此，我們在這裏不做具體介紹。
如果您對特定瀏覽器的行爲方式感興趣，請直接查看供應商發佈的信息。
 

注：您的用戶在訪問您的網站時指望您保護他們。修復混合內容問題以保護<b>所有</b>訪問者（包括使用較舊瀏覽器的訪問者）很重要。




{# wf_devsite_translation #}
