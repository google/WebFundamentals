project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在此代碼實驗室中，您將學習如何使用新版 DevTools Application 面板調試服務工作線程。您還將學習如何模擬推送通知以驗證您的訂閱是否正確設置。

{# wf_updated_on:2016-10-19 #}
{# wf_published_on:2016-01-01 #}


# 調試服務工作線程 {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}



## 簡介




服務工作線程爲開發者提供應對參差不齊的網絡和創建真正離線優先網絡應用的驚人能力。但是作爲一種新技術，它們有時可能難以調試，特別是當我們等待工具跟上時。

此代碼實驗室將引導您創建基本的服務工作線程，並演示如何使用 Chrome DevTools 中新的 Application 面板來調試和檢查工作線程。

### 我們將要開發什麼應用？

![6ffdd0864a80600.png](img/6ffdd0864a80600.png)

在此代碼實驗室中，您將使用一個非常簡單的 Progressive Web App，並學習在您遇到問題時可以在自己的應用中使用的技術。

因爲此代碼實驗室的重點是指導您使用工具，所以您可以在各個點和試驗上隨時停止。使用代碼、刷新頁面、打開新標籤等。學習調試工具的最好方法只是打破傳統並親自動手安裝它們。

### 您將學習的內容

* 如何使用 Application 面板檢查服務工作線程
* 如何瀏覽 Cache 和 IndexedDB
* 如何模擬不同網絡情況
* 如何使用調試程序語句和斷點調試服務工作線程
* 如何模擬推送事件

### 您需具備的條件

* Chrome 52 或更高版本
* 安裝  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)，或者使用您自己選擇的 Web 服務器。
* 示例代碼
* 文本編輯器
* HTML、CSS 和 JavaScript 的基礎知識

此代碼實驗室的重點是調試服務工作線程以及有關使用服務工作線程的一些先備知識。某些概念只是一掠而過，有些則向您提供代碼塊（例如樣式或不相關的 JavaScript）以直接複製和粘貼後使用。如果您對服務工作線程不熟悉，請務必[通讀 API 入門指南](/web/fundamentals/primers/service-worker/)，然後再繼續。


## 設置




### 下載代碼

可通過點擊以下按鈕下載此代碼實驗室的所有代碼：

[鏈接](https://github.com/googlecodelabs/debugging-service-workers/archive/master.zip)

解壓下載的 zip 文件。這將解壓根文件夾 (`debugging-service-workers-master`)，其中包含此代碼實驗室的每個步驟的對應文件夾，以及您需要的所有資源。

`step-NN` 文件夾包含此代碼實驗室的每個步驟所需的結束狀態。這些文件夾供您參考。我們將在一個名爲 `work` 的目錄中完成所有的編碼工作。

### 安裝並驗證網絡服務器

儘管您可以使用自己的網絡服務器，但此代碼實驗室的設計只有與 Chrome Web Server 結合使用時才能正常運行。如果您尚未安裝此應用，可以從 Chrome 網上應用店安裝。

[鏈接](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

安裝 Web Server for Chrome 後，點擊書籤欄上的 Apps 快捷方式： 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

在隨後出現的窗口中，點擊 Web Server 圖標： 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

接下來您將看到此對話框，您可以在其中配置本地網絡服務器：

![433870360ad308d4.png](img/433870360ad308d4.png)

點擊 __choose folder__ 按鈕，然後選擇 `work` 文件夾。這樣您就可以通過網絡服務器對話框（在 __Web Server URL(s)__ 部分）中突出顯示的網址爲正在進行的工作提供支持。

在 Options 下，選中“Automatically show index.html”旁邊的框，如下所示：

![8937a38abc57e3.png](img/8937a38abc57e3.png)

然後將標記爲“Web Server:STARTED”的切換按鈕向左滑動，然後向右滑動，停止並重啓服務器。

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

現在，在您的網絡瀏覽器中訪問您的工作網站（通過點擊突出顯示的 Web Server URL），然後您會看到如下頁面：

![693305d127d9fe80.png](img/693305d127d9fe80.png)

顯然，此應用還沒有做任何有趣的事情。我們將添加功能，以便驗證其是否可在後續步驟中離線工作。## Application 標籤簡介







### 檢查清單

構建 Progressive Web App 需要將許多不同的核心技術（包括服務工作線程和網絡應用清單）以及有用的支持技術（如 Cache Storage API、IndexedDB 和推送通知）結合在一起。爲使開發人員能夠輕鬆獲得各種技術的協調視圖，Chrome DevTools 在新版 Application 面板中爲每個技術加入了檢查器。

* 打開 Chrome DevTools，然後點擊顯示爲 __Application__ 的標籤。

![b380532368b4f56c.png](img/b380532368b4f56c.png)

查看邊欄，請注意 __Manifest__ 當前處於突出顯示狀態。此視圖顯示與 `manifest.json` 文件有關的重要信息，例如其應用名稱、啓動網址、圖標等。

雖然我們不會在此代碼實驗室中對其進行介紹，但請注意，有一個 __Add to homescreen__ 按鈕，它可用於模擬添加應用到用戶主屏幕的體驗。

![56508495a6cb6d8d.png](img/56508495a6cb6d8d.png)

### 檢查服務工作線程

過去，檢查服務工作線程需要在 Chrome 內部環境中進行調查，而且絕對不是最方便的用戶體驗。所有這一切都隨着新的 __Application__ 標籤而改變！

* 點擊當前選擇的 __Manifest__ 項下方的 __Service Workers__ 菜單項

![3dea544e6b44979d.png](img/3dea544e6b44979d.png)

__Service Workers__ 視圖提供有關當前源中活動的服務工作線程的信息。頂部的一行是一系列複選框。

* __Offline __- 將模擬斷開與網絡的連接。這將有助於快速驗證您的服務工作線程的抓取處理程序是否正常運行。
* __Update on reload__ - 將用新的服務工作線程強制替換當前服務工作線程（如果開發者已更新 `service-worker.js`）。通常情況下，瀏覽器將等待，直到用戶在更新到新的服務工作線程之前關閉包含當前網站的所有標籤。
* __Bypass for network__ - 將強制瀏覽器忽略所有活動服務工作線程並從網絡中獲取資源。這有助於您使用 CSS 或 JavaScript 而不必擔心服務工作線程意外緩存或返回舊文件。
* __Show all__ - 將在不考慮來源的情況下，顯示所有活動服務工作線程。

您將下方看到與當前活動服務工作線程（如果存在）有關的信息。最有用的字段之一是 __Status__ 字段，它顯示服務工作線程的當前狀態。由於這是首次啓動應用，當前的服務工作線程已成功安裝並激活，因此它顯示一個綠色圓圈表示一切正常。

請注意綠色狀態指示燈旁邊的 ID 號。這是當前活動服務工作線程的 ID。請記住它或寫下來，因爲稍後我們將使用它進行比較。

* 在您的文本編輯器中，打開 `service-worker.js` 文件

當前服務工作線程的代碼非常簡單，只有幾個控制檯日誌。

    self.addEventListener('install', function(event) {
      console.log('Service Worker installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service Worker activating.');  
    });

如果您切換回 DevTools 然後查看控制檯，可以看到兩個日誌都已成功輸出。

![5fcfd389f5357c09.png](img/5fcfd389f5357c09.png)

請更新 `service-worker.js` 的代碼以查看其完成生命週期變更。

* 更新 `service-worker.js` 中的註釋，使其包含新消息。

    self.addEventListener('install', function(event) {
      console.log('A *new* Service Worker is installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Finally active. Ready to start serving content!');  
    });

* 刷新頁面並在 DevTools 中打開控制檯

控制檯記錄 `A *new* Service Worker is installing.`，但不顯示處於活動狀態的新服務工作線程的第二條消息。

* 切換到 DevTools 中的 Application 標籤

在 Application 標籤中，現有兩個狀態指示燈，各表示我們的兩個服務工作線程的狀態。

![2e41dbf21437944c.png](img/2e41dbf21437944c.png)

請注意第一個服務工作線程的 ID。它應該與原始服務工作線程 ID 匹配。當您安裝新的服務工作線程時，在用戶下一次訪問頁面之前，以前的工作線程將保持活動狀態。

第二個狀態指示燈顯示我們剛剛編輯的新服務工作線程。現在它處於等待狀態。

強制激活新服務工作線程的簡單方法是使用 __skipWaiting__ 按鈕。

![7a60e9ceb2db0ad2.png](img/7a60e9ceb2db0ad2.png)

* 點擊 skipWaiting 按鈕，然後切換至控制檯

請注意現在控制檯記錄來自 `activate` 事件處理程序的消息。

`Finally active. Ready to start serving content!`


## 瀏覽緩存




使用服務工作線程管理您的離線緩存文件是令人難以置信的超能力。新版 __Application__ 面板有很多有用的工具，用於瀏覽和修改存儲的資源，這些工具在開發期間非常有用。

### 爲服務工作線程添加緩存

在您可以檢查緩存之前，您需要編寫一些代碼來存儲一些文件。在服務工作線程的安裝階段，預緩存文件是一種有用的技術，可以確保在用戶即將離線時關鍵資源可用。讓我們由此開始。

* 在更新 `service-worker.js` 之前，打開 DevTools __Application__ 面板，導航至 __Service Workers__ 菜單，然後選中顯示爲 __Update on reload__ 的框

![d4bcfb0983246797.png](img/d4bcfb0983246797.png)

這一有用的技巧將強制頁面使用最新的服務工作線程，因此您不必在每次要更改服務工作線程時點擊 __skipWaiting__ 選項。

* 接下來，更新 `service-worker.js` 中的代碼，顯示如下

```
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/smiley.svg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});
```

* 刷新頁面

在 Application 面板中，您可能會注意到顯示了錯誤。這似乎很可怕，但是點擊 __details__ 按鈕後，就會發現這只是 __Application__ 面板告知您的舊服務工作線程已被強制更新。由於這是預期行爲，所以完全沒問題，但是它可以起到警告的作用。因此請不要忘記在完成編輯 `service-worker.js` 文件後關閉複選框。

![a039ca69d2179199.png](img/a039ca69d2179199.png)

### 檢查 Cache Storage

請注意 __Application__ 中的 __Cache Storage__ 菜單項現有一個插入符，顯示它可展開。

* 點擊以展開 __Cache Storage__ 菜單，然後點擊 `my-site-cache-v1`

![af2b3981c63b1529.png](img/af2b3981c63b1529.png)

在這裏您可看到由服務工作線程緩存的所有文件。如果您需要從緩存中移除文件，可以右鍵點擊該文件，然後從上下文菜單中選擇 __delete__ 選項。同樣，您可以通過右鍵點擊 `my-site-cache-v1`，然後選擇 delete 以刪除整個緩存。

![5c8fb8f7948066e6.png](img/5c8fb8f7948066e6.png)

### 清理平板

您可能已經注意到，除 __Cache Storage__，還有一些與存儲資源有關的其他菜單項：Local Storage、Session Storage、IndexedDB、Web SQL、Cookie 以及 Application Cache ("AppCache")。在一個面板中精細控制每個資源是非常有用的！但是如果您處於想刪除所有存儲資源的情形下，訪問每個菜單項並刪除其內容是相當繁瑣的。更好的做法是，您可以使用 __Clear storage__ 選項來一次性清理平板（請注意這也將註銷所有的服務工作線程）。

* 選擇 __Clear storage__ 菜單選項
* 點擊 __Clear site data__ 按鈕以刪除所有存儲資源

![59838a73a2ea2aaa.png](img/59838a73a2ea2aaa.png)

如果您返回並點擊 `my-site-cache-v1`，將看到已刪除所有存儲文件。

![317d24238f05e69c.png](img/317d24238f05e69c.png)

齒輪是什麼？

因爲服務工作線程能夠提出自己的網絡請求，所以可有助於識別來自工作線程本身的網絡流量。

* 當 `my-site-cache-v1` 仍然爲空時，切換至 Network 面板
* 刷新頁面

在 Network 面板中，您應該看到對文件（例如 `main.css`）的一組初始請求。之後是前面帶有齒輪圖標的第二輪請求，這些請求似乎要獲取相同的資源。

![2ba393cf3d41e087.png](img/2ba393cf3d41e087.png)

齒輪圖標表示這些請求來自服務工作線程本身。具體而言，這些是由服務工作線程的 `install` 處理程序提出以填充離線緩存的請求。


## 模擬不同網絡條件




服務工作線程的殺手鐗功能之一是即使在用戶離線時，它們也能夠爲其提供緩存內容。要驗證一切是否按計劃進行，請測試 Chrome 提供的一些網絡節流工具。

### 離線時提供請求服務

爲提供離線內容，您需要將 `fetch` 處理程序添加到 `service-worker.js`中。

* 將以下代碼添加到緊跟在 `activate` 處理程序後的 `service-worker.js`中。

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

* 切換到 __Application__ 面板，並驗證 __Update on reload__ 仍處於選中狀態
* 刷新頁面以安裝新服務工作線程
* 取消選中 __Update on reload__
* 選中 __Offline__

您的 __Application__ 面板應該如下顯示：

![873b58278064b627.png](img/873b58278064b627.png)

請注意 __Network__ 面板現在有一個黃色警告標誌，表示您已離線（並提醒您如果要繼續使用網絡進行開發，您需要取消選中該複選框）。

隨着您的 `fetch` 處理程序到位，您的應用設置爲 __Offline__，現在到了關鍵時刻。刷新頁面，如果一切順利，您應該繼續看到網站內容，即使網絡未提供任何信息。您可以切換至 __Network__ 面板以驗證 Cache Storage 是否提供所有資源。請注意在 __Size__ 列中，表示這些資源來自 `(from Service Worker)`。這是一個信號，告訴我們服務工作線程攔截了請求，並提供了來自緩存的響應而不是碰撞網絡。

![a6f485875ca088db.png](img/a6f485875ca088db.png)

您將注意到有失敗的請求（例如對新服務工作線程或 `manifest.json` 的請求）。這是完全正常且符合預期的。

### 測試緩慢或奇怪的網絡

因爲我們在各種不同的環境中使用我們的移動設備，不斷在各種連接狀態之間轉換。不僅如此，在世界上的許多地方，3G 和 2G 速度仍是常態。爲驗證我們的應用適用於這些消費者，我們應該測試即使在較慢的連接情況下，它也能保持高性能。

首先，讓我們在服務工作線程不運行的情況下，模擬在緩慢的網絡上應用是如何工作的。

* 在 __Application__ 面板中，取消選中 __Offline__
* 選中 __Bypass for network__

![739dc5811e4aa937.png](img/739dc5811e4aa937.png)

__Bypass for network__ 選項將告訴瀏覽器，當需要發出網絡請求時跳過我們的服務工作線程。這表示 Cache Storage 未能提供任何內容，就好像我們沒有安裝任何服務工作線程一樣。

* 接下來，切換至 __Network__ 面板
* 使用 __Network Throttle__ 下拉菜單將網絡速度設置爲 `Regular 2G`。

__Network Throttle__ 下拉菜單位於 __Network__ 面板的右上角、__Network__ 面板的 __Offline__ 複選框旁邊。默認情況下，它被設置爲 `No throttling`。

![c59b54a853215598.png](img/c59b54a853215598.png)

* 將速度設置爲 `Regular 2G`，刷新頁面

請注意響應時間會飆升！現在每個資源的下載需要幾百毫秒的時間。

![70e461338a0bb051.png](img/70e461338a0bb051.png)

讓我們看看服務工作線程在後臺運行時有何不同。

* 仍將速度設置爲 `Regular 2G`，切換回 __Application__ 標籤
* 取消選中 __Bypass for network__ 複選框
* 切換回 __Network__ 面板
* 刷新頁面

現在我們的響應時間急速下降至每個資源僅需幾毫秒。對於網絡速度較慢的用戶來說，這是天壤之別！

![f0f6d3b0a1b1f18d.png](img/f0f6d3b0a1b1f18d.png)


## 請記住，它只是 JavaScript




服務工作線程就像一種魔法，但是在後臺，它們實際上只是常規 JavaScript 文件。這表示您可以使用現有的工具（如 `debugger` 語句和斷點）來調試它們。

### 使用調試程序

許多開發者在他們的應用出現問題時，依賴於出色的舊版 `console.log()`。但是，工具箱中有一個更強大的工具：`debugger`。

將這一行添加到您的代碼中將暫停執行，並打開 DevTools 中的 __Sources__ 面板。從這裏開始，您可以逐步執行函數、檢查對象，甚至使用控制檯對當前 作用域運行命令。這對於調試一個奇怪的服務工作線程尤其有用。

爲了對其進行測試，我們來調試 `install` 處理程序。

* 在 `service-worker.js` 中 `install` 處理程序的開頭添加一個 `debugger` 語句。

```
self.addEventListener('install', function(event) {
  debugger;
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});
```

* 從 __Application__ 面板中，刷新頁面
* 點擊 __skipWaiting__ 以激活新服務工作線程
* 再次刷新頁面以允許 `fetch` 處理程序運行

應用將暫停執行並將面板切換至 __Sources__，其中 `debugger` 語句現在將在 `service-worker.js` 中突出顯示。

![d960b322c020d6cc.png](img/d960b322c020d6cc.png)

此視圖提供了大量有用的工具。有一個工具是 __Scope__ 檢查器，它讓我們在當前函數作用域內看到對象的當前狀態。

* 點擊 `event: ExtendableEvent` 下拉菜單

![5116146f838a566.png](img/5116146f838a566.png)

從這裏，您可以瞭解有關當前作用域內對象的各種有用的信息。例如，查看 `type` 字段，您可以驗證當前事件對象是否爲 `install` 事件。

### 使用斷點

如果您正在 __Sources__ 面板中檢查代碼，您可能會發現設置一個斷點比在您的實際文件中添加 `debugger` 語句更容易些。斷點有類似的目的（它凍結執行，讓我們檢查應用），但是它可以在 DevTools 中自行設置。

要設置斷點，您需要點擊您希望應用停止執行的行號。

* 從 __Sources__ 面板向下滾動到 `service-worker.js` 的第 25 行，然後點擊行號

![da7b5f76723ca525.png](img/da7b5f76723ca525.png)

這將在 `fetch` 處理程序的開頭設置斷點，以便可以檢查其事件對象。

* 刷新頁面

請注意，與您使用 `debugger` 語句時類似，執行現在已停在有斷點的行上。這表示您現在可以檢查在您的應用中傳遞的 `FetchEvent` 對象，並確定它們請求的資源。

* 在 __Scope__ 檢查器中，展開 `event` 對象
* 展開 `request` 對象
* 請注意 `url` 屬性

![f9b0c00237b4400d.png](img/f9b0c00237b4400d.png)

您可以看到該 `FetchEvent` 正在 `http://127.0.0.1:8887/` 上請求資源，這是我們的 `index.html`。因爲應用將處理許多 `fetch` 請求，您可以將斷點留在原處並恢復執行。這使您能在每個 `FetchEvent` 在應用在傳遞時對其進行檢查。有一項非常有用的技術，用於精確觀察您的應用中的所有請求。

* 按下 __Resume__ 按鈕以允許繼續腳本執行

![ce7b5e8df4e8bc07.png](img/ce7b5e8df4e8bc07.png)

稍後，執行將在同一斷點處暫停。檢查 `event.request.url` 屬性，並請注意現在它顯示 `http://127.0.0.1:8887/styles/main.css`。您可以繼續用這種方式查看它請求 `smiley.svg`、`main.js`，最後是 `manifest.json`。


## 測試推送通知




推送通知是創造互動體驗的重要組成部分。由於通知需要在應用服務器、消息服務（如 Google Cloud Messaging）和您的服務工作線程之間進行協調，因此首先要獨立測試服務工作線程以驗證其是否正確設置，這可能非常有用。

### 添加推送支持

您可能已經注意到在應用中心有一個  __Subscribe for Push Notifications__ 按鈕，它要求用戶訂閱推送通知。此按鈕已被遠程配置，以在用戶點擊時請求推送通知權限。

![3e7f08f9d8c1fc5c.png](img/3e7f08f9d8c1fc5c.png)

最後的步驟是將 `push` 事件的支持添加至 `service-worker.js`。

* 打開 `service-worker.js`，然後在 `fetch` 處理程序後添加以下幾行

```
self.addEventListener('push', function(event) {  
  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/smiley.svg';  
  var tag = 'simple-push-example-tag';
  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});
```

處理程序就緒後，就可以很輕鬆地模擬推送事件。

* 打開 __Application__ 面板
* 刷新頁面，當您看到新的服務工作線程進入 `waiting` 階段時，點擊 __skipWaiting__ 按鈕
* 點擊 __Subscribe to Push Notifications__ 按鈕
* 接受權限提示

![a8a8fa8d35b0667a.png](img/a8a8fa8d35b0667a.png)

* 最後，點擊 __Update__ 和 __Unregister__ 旁邊的 __Push__ 按鈕

![eacd4c5859f5f3ff.png](img/eacd4c5859f5f3ff.png)

您現在應該會看到在屏幕的右上角，出現一個確認服務工作線程是否按預期處理 `push` 事件的推送通知。

![b552ed129bc6cdf6.png](img/b552ed129bc6cdf6.png)

幹得不錯！

現在您的工具箱中有一些調試工具，您應該有能力解決項目中出現的任何問題。剩下的唯一的事情就是您要走出去，然後構建下一個驚人的 Progressive Web App！





## 發現問題，或者有反饋？ {: .hide-from-toc }
立即提交[問題](https://github.com/googlecodelabs/debugging-service-workers/issues)，幫助我們讓代碼實驗室更加強大。
謝謝！

{# wf_devsite_translation #}
