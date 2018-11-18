project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools 的 Network 面板測量您的網絡應用的網絡性能。

{# wf_updated_on:2016-02-21 #}
{# wf_published_on:2015-04-13 #}

# 測量資源加載時間 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

使用 <strong>Network</strong> 面板測量您的網站網絡性能。


![Chrome DevTools 的 Network 面板](imgs/network-panel.png)

**Network** 面板記錄頁面上每個網絡操作的相關信息，包括詳細的耗時數據、HTTP 請求與響應標頭和 Cookie，等等。




### TL;DR {: .hide-from-toc }
- 使用 Network 面板記錄和分析網絡活動。
- 整體或單獨查看資源的加載信息。
- 過濾和排序資源的顯示方式。
- 保存、複製和清除網絡記錄。
- 根據需求自定義 Network 面板。


## Network 面板概覽

Network 面板由五個窗格組成：

1. **Controls**。使用這些選項可以控制 **Network** 面板的外觀和功能。
2. **Filters**。
使用這些選項可以控制在 **Requests Table** 中顯示哪些資源。提示：按住 <kbd>Cmd</kbd> (Mac) 或 <kbd>Ctrl</kbd> (Windows/Linux) 並點擊過濾器可以同時選擇多個過濾器。
3. **Overview**。
此圖表顯示了資源檢索時間的時間線。如果您看到多條豎線堆疊在一起，則說明這些資源被同時檢索。
4. **Requests Table**。
此表格列出了檢索的每一個資源。
   默認情況下，此表格按時間順序排序，最早的資源在頂部。點擊資源的名稱可以顯示更多信息。
   提示：右鍵點擊 **Timeline** 以外的任何一個表格標題可以添加或移除信息列。
5. **Summary**。
此窗格可以一目瞭然地告訴您請求總數、傳輸的數據量和加載時間。


![Network 面板的窗格](imgs/panes.png)

默認情況下，**Requests Table** 會顯示以下列。您可以[添加和移除列](#add-and-remove-table-columns)。


* **Name**。資源的名稱。
* **Status**。HTTP 狀態代碼。
* **Type**。已請求資源的 MIME 類型。
* **Initiator**。發起請求的對象或進程。值爲以下選項之一：
  * **Parser**。Chrome 的 HTML 解析器發起請求。
  * **Redirect**。HTTP 重定向發起請求。
  * **Script**。腳本發起請求。
  * **Other**。某些其他進程或操作發起請求，例如用戶通過鏈接或者在地址欄中輸入網址導航到頁面。
* **Size**。響應標頭（通常爲數百字節）加響應正文（由服務器提供）的組合大小。
* **Time**。從請求開始至在響應中接收到最終字節的總持續時間。
* **Timeline**。Timeline 列可以顯示所有網絡請求的可視瀑布。
點擊此列的標題可以顯示一個包含更多排序字段的菜單。


## 記錄網絡活動

在 **Network** 面板打開時，DevTools 在默認情況下會記錄所有網絡活動。
要記錄活動，只需在面板打開時重新加載頁面，或者等待當前加載頁面上的網絡活動。


您可以通過 **record** 按鈕指示 DevTools 是否記錄。
顯示紅色 (![記錄按鈕打開](imgs/record-on.png){:.inline}) 表明 DevTools 正在記錄。
顯示灰色 (![記錄按鈕關閉](imgs/record-off.png){:.inline}) 表明 DevTools 未在記錄。
點擊此按鈕可以開始或停止記錄，也可以按鍵盤快捷鍵 <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>。


## 在記錄期間捕捉屏幕截圖 {:#filmstrip}

**Network** 面板可以在頁面加載期間捕捉屏幕截圖。此功能稱爲**幻燈片**。
 

點擊**攝影機**圖標可以啓用幻燈片。圖標爲灰色時，幻燈片處於停用狀態 (![已停用幻燈片](imgs/filmstrip-disabled.png){:.inline})。如果圖標爲藍色，則說明已啓用 (![已啓用幻燈片](imgs/filmstrip-enabled.png){:.inline})。


重新加載頁面可以捕捉屏幕截圖。屏幕截圖顯示在**概覽**上方。
 

![帶幻燈片的記錄](imgs/filmstrip.png)

將鼠標懸停在一個屏幕截圖上時，**Timeline** 將顯示一條黃色豎線，指示幀的捕捉時間。


![Timeline 上的幻燈片疊加層](imgs/filmstrip-timeline-overlay.png)

雙擊屏幕截圖可查看放大版本。在屏幕截圖處於放大狀態時，使用鍵盤的向左和向右箭頭可以在屏幕截圖之間導航。



![放大的幻燈片屏幕截圖](imgs/filmstrip-zoom.png)

## 查看 DOMContentLoaded 和 load 事件信息

**Network** 面板突出顯示兩種事件：[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) 和 [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load)。



解析頁面的初始標記時會觸發 `DOMContentLoaded`。
此事件將在 **Network** 面板上的兩個地方顯示：

1. **Overview** 窗格中的藍色豎線表示事件。
2. 在 **Summary** 窗格中，您可以看到事件的確切時間。

![Network 面板上的 DOMContentLoaded 事件](imgs/domcontentloaded.png)

頁面完全加載時將觸發 `load`。此事件顯示在三個地方：

1. **Overview** 窗格中的紅色豎線表示事件。
2. **Requests Table** 中的紅色豎線也表示事件。
3. 在 **Summary** 窗格中，您可以看到事件的確切時間。

![Network 面板上的 load 事件](imgs/load.png)

## 查看單個資源的詳細信息

點擊資源名稱（位於 **Requests Table** 的 **Name** 列下）可以查看與該資源有關的更多信息。


可用標籤會因您所選擇資源類型的不同而不同，但下面四個標籤最常見：


* **Headers**。與資源關聯的 HTTP 標頭。
* **Preview**。JSON、圖像和文本資源的預覽。
* **Response**。HTTP 響應數據（如果存在）。
* **Timing**。資源請求生命週期的精細分解。


![查看單一資源的詳情](imgs/network-headers.png)

### 查看網絡耗時

點擊 **Timing** 標籤可以查看單個資源請求生命週期的精細分解。
 

生命週期按照以下類別顯示花費的時間：

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* Queuing
* Stalled
* 如果適用：DNS lookup、initial connection、SSL handshake
* Request sent
* Waiting (TTFB)
* Content Download

![timing 標籤](imgs/timing-tab.png)

將鼠標懸停到 **Timeline** 圖表內的資源上時，您也可以看到相同的信息。
 

![Timeline 中一個資源的定時數據](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

相關指南：

* [瞭解 Resource Timing](understanding-resource-timing)

### 查看 HTTP 標頭

點擊 **Headers** 可以顯示該資源的標頭。

**Headers** 標籤可以顯示資源的請求網址、HTTP 方法以及響應狀態代碼。
此外，該標籤還會列出 HTTP 響應和請求標頭、它們的值以及任何查詢字符串參數。
 

![單一資源的 HTTP 標頭](imgs/network-headers.png)

點擊每一部分旁邊的 `view source` 或 `view parsed` 鏈接，您能夠以源格式或者解析格式查看響應標頭、請求標頭或者查詢字符串參數。



![查看標頭源](imgs/view-header-source.png)

您也可以點擊相應部分旁邊的 `view URL encoded` 或 `view decoded` 鏈接，以網址編碼或解碼格式查看查詢字符串參數。


![查看已編碼網址](imgs/view-url-encoded.png)

### 預覽資源

點擊 **Preview** 標籤可以查看該資源的預覽。**Preview** 標籤可能顯示一些有用的信息，也可能不顯示，具體取決於您所選擇資源的類型。



![圖像資源預覽](imgs/preview-png.png)

### 查看 HTTP 響應內容

點擊 **Response** 標籤可以查看資源未格式化的 HTTP 響應內容。
**Preview** 標籤可能包含一些有用的信息，也可能不包含，具體取決於您所選擇資源的類型。


![JSON 資源響應數據](imgs/response-json.png)

### 查看 Cookie

點擊 **Cookies** 標籤可以查看在資源的 HTTP 請求和響應標頭中傳輸的 Cookie 表。
只有傳輸 Cookie 時，此標籤纔可用。


下面是 Cookie 表中每一列的說明：

* **Name**。Cookie 的名稱。
* **Value**。Cookie 的值。
* **Domain**。Cookie 所屬的域。
* **Path**。Cookie 來源的網址路徑。
* **Expires / Max-Age**。Cookie 的 expires 或 max-age 屬性的值。
* **Size**。Cookie 的大小（以字節爲單位）。
* **HTTP**。指示 Cookie 應僅由瀏覽器在 HTTP 請求中設置，而無法通過 JavaScript 訪問。
* **Secure**。如果存在此屬性，則指示 Cookie 應僅通過安全連接傳輸。


![資源 Cookie](imgs/cookies.png)

### 查看 WebSocket 框架

點擊 **Frames** 標籤可以查看 [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) 連接信息。

只有選定資源發起 `WebSocket` 連接時，此標籤纔會顯示。


![WebSocket 框架標籤](imgs/websocket-frames.png)

下表對 **Frames** 標籤上表格中的每一列進行了說明：


* **Data**。消息負載。如果消息爲純文本，將在此處顯示。
對於二進制操作碼，此字段將顯示操作碼的名稱和代碼。
支持以下操作碼：
  * 延續框架
  * 二進制框架
  * 連接關閉框架
  * Ping 框架
  * Pong 框架
* **Length**。消息負載的長度（以字節爲單位）。
* **Time**。消息創建時的時間戳。

消息根據其類型進行彩色編碼： 

* 傳出文本消息爲淺綠色。
* 傳入文本消息爲白色。 
* WebSocket 操作碼爲淺黃色。
* 錯誤爲淺紅色。

**有關當前實現的說明：**

* 要在每條新消息到達後刷新 **Frames** 表，請點擊左側的資源名稱。

* **Frames** 表格僅保留最後 100 條 `WebSocket` 消息。

## 查看資源發起者和依賴項 {:#initiators-dependencies}

按住 <kbd>Shift</kbd> 並將鼠標懸停在資源上，可以查看其發起者和依賴項。
本部分將您懸停的資源稱爲**目標**。
 

目標上方的第一個綠色編碼資源爲目標的發起者。
如果上方存在第二個也是綠色編碼的資源，那麼該資源將是發起者的發起者。
目標下方紅色編碼的任何資源都是目標的依賴項。


下方的屏幕截圖中，目標是 `dn/`。此目標的發起者爲以 `rs=AA2Y` 開頭的腳本。
發起者 (`rs=AA2Y`) 的發起者爲 `google.com`。
最後，`dn.js` 是目標 (`dn/`) 的依賴項。


![查看資源發起者和依賴關係](imgs/initiators-dependencies.png)

請記住，對於具有大量資源的頁面，您可能無法看到所有的發起者或依賴項。
 

## 排序請求

默認情況下，**Requests Table** 中的資源按照每個請求的開始時間排序，最早的請求位於頂部。


點擊列標頭可以按照該標頭下每個資源的值對錶格排序。
再次點擊相同的標頭可以將排序順序更改爲升序或降序。


**Timeline** 列與其他列不同。點擊此列時，它將顯示一個由多個排序字段組成的菜單：


* **Timeline**。按每個網絡請求的開始時間排序。這是默認排序方式，與按 **Start Time** 選項排序相同。
* **Start Time**。按每個網絡請求的開始時間排序（與按 **Timeline** 選項排序相同）。
* **Response Time**。按每個請求的響應時間排序。
* **End Time**。按每個請求完成的時間排序。
* **Duration**。按每個請求的總時間排序。選擇此過濾器可以確定哪些資源的加載時間最長。
* **Latency**。按請求開始與響應開始之間的時間排序。
選擇此過濾器可以確定哪些資源至第一字節 (TTFB) 的時間最長。


![Timeline 排序字段](imgs/timeline-sort-fields.png)

## 過濾請求 

**Network** 面板提供了多種方式來過濾要顯示哪些資源。
點擊 **Filter** 按鈕 (![Filter 按鈕](imgs/filters.png){:.inline}) 可以隱藏或顯示 **Filters** 窗格。



使用內容類型按鈕可以僅顯示選定內容類型的資源。
 

Note: 按住 <kbd>Cmd</kbd> (Mac) 或 <kbd>Ctrl</kbd> (Windows/Linux) 並點擊過濾器可以同時啓用多個過濾器。

![同時選擇了多個內容類型過濾器]
(imgs/multiple-content-type-filters.png)

**Filter** 文本字段看似非常強大。如果您在其中輸入任意字符串，**Network** 面板僅會顯示文件名與給定字符串匹配的資源。



![資源名稱過濾](imgs/resource-name-filtering.png)

**Filter** 文本字段還支持各種關鍵詞，這樣，您可以按照各種屬性對資源排序，例如使用 `larger-than` 關鍵字按文件大小進行排序。



下文列表說明了所有關鍵字。 

* `domain`。僅顯示來自指定域的資源。您可以使用通配符字符 (`*`) 來包含多個域。
例如，`*.com` 將顯示來自以 `.com` 結尾的所有域名的資源。
DevTools 會使用它遇到的所有域填充自動填充下拉菜單。
* `has-response-header`。顯示包含指定 HTTP 響應標頭的資源。
DevTools 會使用它遇到的所有響應標頭填充自動填充下拉菜單。
* `is`。使用 `is:running` 可以查找 `WebSocket` 資源。
* `larger-than`。顯示大於指定大小的資源（以字節爲單位）。
將值設爲 `1000` 等同於設置爲 `1k`。
* `method`。顯示通過指定 HTTP 方法類型檢索的資源。
DevTools 會使用它遇到的所有 HTTP 方法填充下拉菜單。
* `mime-type`。顯示指定 MIME 類型的資源。DevTools 會使用它遇到的所有 MIME 類型填充下拉菜單。
* `mixed-content`。顯示所有混合內容資源 (`mixed-content:all`)，或者僅顯示當前顯示的資源 (`mixed-content:displayed`)。
* `scheme`。顯示通過未保護 HTTP (`scheme:http`) 或受保護 HTTPS (`scheme:https`) 檢索的資源。
* `set-cookie-domain`。顯示具有 `Set-Cookie` 標頭並帶有與指定值匹配的 `Domain` 屬性的資源。
DevTools 會使用它遇到的所有 Cookie 域填充自動填充下拉菜單。
* `set-cookie-name`。顯示具有 `Set-Cookie` 標頭並且名稱與指定值匹配的資源。
DevTools 會使用它遇到的所有 Cookie 名稱填充自動填充下拉菜單。
* `set-cookie-value`。顯示具有 `Set-Cookie` 標頭並且值與指定值匹配的資源。
DevTools 會使用它遇到的所有 Cookie 值填充自動填充下拉菜單。
* `status-code`。僅顯示 HTTP 狀態代碼與指定代碼匹配的資源。
DevTools 會使用它遇到的所有狀態代碼填充自動填充下拉菜單。


![按文件大小過濾](imgs/larger-than.png)

上面的一些關鍵字都提及自動填充下拉菜單。要觸發自動填充菜單，請在鍵入關鍵字時後面加一個冒號。
例如，在下面的屏幕截圖中，輸入 `domain:` 觸發了自動填充下拉菜單。


![過濾文本字段自動填充](imgs/filter-autocomplete.png)

## 複製、保存和清除網絡信息

在 **Requests Table** 中點擊右鍵可以複製、保存或刪除網絡信息。
某些選項取決於上下文，因此，如果您希望操作單個資源，則需要右鍵點擊該資源所在的行。

下面的列表說明了每一個選項。

* **Copy Response**。將選定資源的 HTTP 響應複製到系統剪貼板。
* **Copy as cURL**。以 [cURL](http://curl.haxx.se/){: .external } 命令字符串的形式將選定資源的網絡請求複製到系統剪貼板。請參閱[以 cURL 命令形式複製請求](#copy-requests-as-curl-commands)。
* **Copy All as HAR**。以 [HAR](https://en.wikipedia.org/wiki/.har){: .external } 數據形式將所有資源複製到系統剪貼板。HAR 文件包含用於說明網絡“瀑布”的 JSON 數據結構。多款[第三方](https://ericduran.github.io/chromeHAR/){: .external } [工具](https://code.google.com/p/harviewer/){: .external } 可以依據 HAR 文件中的數據重建網絡瀑布。請參閱[網頁性能工具：
HTTP 歸檔 (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)，瞭解更多信息。
* **Save as HAR with Content**。將所有網絡數據及每一個頁面資源保存到 HAR 文件。
二進制資源（包括圖像）以 Base64 編碼文本的形式編碼。
* **Clear Browser Cache**。清除瀏覽器緩存。**提示**：您也可以從 [**Network Conditions**][nc] 抽屜式導航欄中啓用或停用瀏覽器緩存。
* **Clear Browser Cookies**。清除瀏覽器的 Cookie。
* **Open in Sources Panel**。在 **Sources** 面板中打開選定資源。
* **Open Link in New Tab**。在新標籤中打開選定資源。您也可以在 Network 表中雙擊資源名稱。
* **Copy Link Address**。將資源網址複製到系統剪貼板。
* **Save**。保存選定的文本資源。僅在文本資源上顯示。
* **Replay XHR**。重新發送選定的 `XMLHTTPRequest`。僅在 XHR 資源上顯示。


![複製並保存上下文菜單](imgs/copy-save-menu.png) 

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### 以 cURL 命令形式複製一個或所有請求 {: #curl }

[cURL](http://curl.haxx.se/){: .external } 是一種用於進行 HTTP 事務的命令行工具。
 

在 Requests Table 中右鍵點擊某個資源，將鼠標懸停在 **Copy** 上，然後選擇 **Copy as cURL**，複製 Network 面板檢測到的所有資源的 cURL 請求的字符串。



![以 cURL 命令形式複製單一請求](imgs/copy-as-curl.png)

選擇 **Copy as cURL**，複製 Network 面板檢測到的所有資源的 cURL 請求的字符串。


當您複製全部時，過濾將被忽略（例如，如果您過濾 Network 面板僅顯示 CSS 資源，然後按 **Copy All as cURL**，您將獲取所有檢測到的資源，而不只是 CSS）。



## 自定義 Network 面板

默認情況下，**Requests Table** 會使用小行顯示資源。點擊 **Use large resource rows** 按鈕 (![large resource rows 按鈕](imgs/large-resource-rows-button.png){:.inline}) 可以增大每一行的大小。


 

大行可以讓某些列顯示兩個文本字段：主要字段和次要字段。
列標頭指示次要字段的含義。
 

![大資源行](imgs/large-resource-rows.png)

### 添加和移除表格列

右鍵點擊 **Requests Table** 中的任一標題可以添加或移除列。


![添加或移除列](imgs/add-remove-columns.png)

### 導航時保留網絡日誌。

默認情況下，每當您重新加載當前頁面或者加載不同的頁面時，網絡活動記錄會被丟棄。啓用 **Preserve log** 複選框可以在這些情況下保存網絡日誌。
新記錄將附加到 **Requests Table** 的底部。

## 其他資源

要詳細瞭解如何優化您的應用的網絡性能，請參閱下面的資源：

* 使用 [PageSpeed Insights](/speed/pagespeed/insights) 確定可以應用到您網站的性能最佳做法，以及使用 [PageSpeed 優化工具](/speed/pagespeed/optimization)將應用這些最佳做法的流程自動化。
* [Google Chrome 中的高性能網絡](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/)討論了 Chrome 網絡內部機制，以及您如何充分利用它們讓您的網站更快。
* [gzip 壓縮的工作原理](/speed/articles/gzip)提供了 gzip 壓縮的高級概覽，並介紹了這種壓縮爲什麼是一種不錯的方法。
* [網頁性能最佳做法](/speed/docs/best-practices/rules_intro)提供了更多用於優化您的網頁或應用的網絡性能的提示。







{# wf_devsite_translation #}
