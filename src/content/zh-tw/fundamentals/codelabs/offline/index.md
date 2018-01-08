project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:學習如何將服務工作線程集成到現有應用內，以使應用能夠離線工作。

{# wf_updated_on: 2016-11-09 #}
{# wf_published_on: 2016-01-01 #}


# 在網絡應用中添加服務工作線程和離線功能 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



## 概覽



![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

在此代碼實驗室中，您將學習如何將服務工作線程集成到現有應用內，以使應用能夠離線工作。該應用名爲 [Air Horner](https://airhorner.com)。點擊喇叭就會發聲。

#### 您將學習的內容

* 如何向現有項目添加基礎服務工作線程。
* 如何使用 Chrome DevTools 模擬離線模式以及檢查和調試服務工作線程。
* 一種簡單的離線緩存策略。

#### 您需具備的條件

* Chrome 52 或更高版本。
* 對  [Promises](/web/fundamentals/getting-started/primers/promises)、Git 和 Chrome DevTools 的基本瞭解。
* 示例代碼。
* 文本編輯器。
* 本地網絡服務器。如果您想要使用此代碼實驗室中所述的網絡服務器，則需要在命令行中安裝 Python。


## 獲取示例代碼



通過 SSH 從命令行克隆 GitHub 存儲區。

    $ git clone git@github.com:GoogleChrome/airhorn.git

或 HTTPS：

    $ git clone https://github.com/GoogleChrome/airhorn.git


## 運行應用示例



首先，我們先看看應用示例的最終樣子（提示：太奇妙了）。 

通過查看 `master` 分支確保您位於正確的（最終）分支。

    $ git checkout master

從本地網絡服務器運行網站。您可以使用任意網絡服務器，但對於此代碼實驗室的其他部分，我們假定您在端口 3000 上使用的是 Python 的 `SimpleHTTPServer`，以便從 `localhost:3000` 中運行應用。

    $ cd app
    $ python -m SimpleHTTPServer 3000

在 Chrome 中打開網站。您會看到：![9246b0abd8d860da.png](img/9246b0abd8d860da.png)


## 測試應用



點擊喇叭，應能發聲。

現在，您可以使用 Chrome DevTools 模擬離線模式了。

打開 DevTools，轉至 __Application__ 面板，然後啓用 __Offline __ 複選框。在下面的屏幕截圖中，鼠標懸停在複選框上。 

![479219dc5f6ea4eb.png](img/479219dc5f6ea4eb.png)

點擊複選框後，請注意 __Network __ 面板標籤旁邊的警告圖標（帶有感嘆號的黃色三角形）。這表示您處於離線狀態。 

如需證明您處於離線模式，請轉至  [https://google.com](https://google.com)。您會看到 Chrome 的“there is no Internet connection”錯誤消息。 

現在，返回到應用中。儘管您處於離線狀態，頁面應仍然能夠完全重新加載。您應仍然能夠使用喇叭。

它能夠離線工作的原因就是此 代碼實驗室的基礎：通過服務工作線程提供離線支持。


## 構建初學者應用



您現在將要刪除應用中的所有離線支持，學習如何使用服務工作線程重新將離線支持添加到應用中

請查看應用的“斷開”版本，此版本未實現服務工作線程。

    $ git checkout code-lab

返回到 DevTools 的 __Application __ 面板，禁用 __Offline __ 複選框，以便重新返回在線狀態。

運行頁面。應用應能如期運行。

現在，使用 DevTools 重新模擬離線模式（通過在 __Application __ 面板中啓用 __Offline __ 複選框）。__注意！如果您不是非常瞭解服務工作線程，則會看到一些異常行爲。

您可能會看到什麼？因爲您處於離線狀態，並且這個版本的應用沒有服務工作線程，您將看到 Chrome 中顯示典型的“there is no Internet connection”錯誤消息。

但您實際看到的是...功能完備的離線應用！

![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

這是怎麼回事？回想一下您在開始此代碼實驗室時的情景，您嘗試了應用的完整版本。當您運行那個版本時，應用實際上安裝了服務工作線程。現在，在您每次運行應用時，服務工作線程都會自動運行。一旦 `localhost:3000` 等作用域（您將會在下一部分中瞭解有關作用域的更多內容）中安裝了服務工作線程，服務工作線程會在您每次訪問作用域時自動啓動，除非您以編程方式或手動將其刪除。 

如需修復這一問題，請轉至 DevTools 的 __Application __ 面板，點擊 __Service Workers __ 選項卡，然後點擊 __Unregister __ 按鈕。在下面的屏幕截圖中，鼠標懸停在按鈕上。 

![837b46360756810a.png](img/837b46360756810a.png)

現在，在您重新加載網站之前，請確保您仍然在使用 DevTools 模擬離線模式。重新加載頁面，應會如期顯示“there is no Internet connection”錯誤消息。

![da11a350ed38ad2e.png](img/da11a350ed38ad2e.png)


## 在網站上註冊服務工作線程



現在，可以將離線支持重新添加到應用中。這個過程由兩個步驟組成：

1. 創建一個將作爲服務工作線程的 JavaScript 文件。
2. 指示瀏覽器將此 JavaScript 文件註冊爲“服務工作線程”。

首先，創建一個名爲 `sw.js` 的空白文件，然後將其放入 `/app` 文件夾。 

現在打開 `index.html`，並將以下代碼添加到 `<body>` 底部。

```
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}
</script>
```

腳本會檢查瀏覽器是否支持服務工作線程。如果不支持，它會將我們當前使用的空白文件 `sw.js` 註冊爲服務工作線程，然後記錄到控制檯。

在重新運行網站之前，返回到 DevTools，查看  __Application __面板的 __Service Workers __ 標籤。此標籤當前應爲空，表示網站沒有安裝服務工作線程。 

![37d374c4b51d273.png](img/37d374c4b51d273.png)

確保已停用 DevTools 中的 __Offline __ 複選框。重新加載頁面。在加載頁面時，您可以看到服務工作線程已經完成註冊。

![b9af9805d4535bd3.png](img/b9af9805d4535bd3.png)

在 __Source __ 標籤旁邊，您可以看到已註冊的服務工作線程源代碼的鏈接。 

![3519a5068bc773ea.png](img/3519a5068bc773ea.png)

如果您想要檢查當前爲頁面安裝的服務工作線程，請點擊鏈接。這將會在 DevTools 的 __Sources __ 面板中爲您顯示服務工作線程的源代碼。例如，現在點擊鏈接，您會看到一個空文件。 

![dbc14cbb8ca35312.png](img/dbc14cbb8ca35312.png)


## 安裝網站資產



註冊服務工作線程後，當用戶首次點擊頁面時，會觸發 `install` 事件。此事件就是您要緩存頁面資產的地方。

將以下代碼添加到 sw.js。

```
importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});
```

第一行會添加緩存 polyfill。此 polyfill 已經添加到存儲區。我們需要使用 polyfill 是因爲 Cache API 尚未在所有瀏覽器中得到完全支持。接下來是 `install` 事件偵聽器。`install` 事件偵聽器可以打開 `caches` 對象，然後使用我們要緩存的資源列表進行填充。關於 `addAll` 操作的一個重要事情就是要麼全部添加，要麼全部不添加。如果其中有一個文件不存在或無法抓取，整個 `addAll` 操作將會失敗。合格的應用將會處理這種情況。

下一步是對服務工作線程編程，以將任意資源的請求返回給攔截，並使用 `caches` 對象返回每個資源的本地存儲版本。


## 攔截網頁請求



服務工作線程的一個強大的功能就是，一旦它控制頁面，就可以攔截頁面發出的每個請求，並確定對請求執行的操作。在本部分中，您將對服務工作線程進行編程，以攔截請求並返回緩存版本的資產，而不是到網絡上檢索這些資產。

第一步是將一個事件處理程序附加到 `fetch` 事件。發出的每個請求都會觸發此事件。

將以下代碼添加到 `sw.js` 的底部，以便記錄父頁面發出的請求。

我們來測試一下這個功能。__注意！__您將會看到更加異常的服務工作線程行爲。 

打開 DevTools，轉至 __Application__ 面板。應停用 __Offline __複選框。按 `Esc` 鍵以打開 DevTools 窗口底部的 __Console __抽屜。您的 DevTools 窗口應類似於以下屏幕截圖：

![c96de824be6852d7.png](img/c96de824be6852d7.png)

現在重新加載頁面並查看 DevTools 窗口。首先，我們預期能看到記錄到控制檯中的大量請求，但沒有看到。其次，在 __Service Worker __窗格中，我們可以看到 __Status __已發生更改：

![c7cfb6099e79d5aa.png](img/c7cfb6099e79d5aa.png)

在 __Status __中，有一個新的服務工作線程正等待激活。這就是包含我們剛纔所做更改的新的服務工作線程。因此，出於某種原因，我們以前安裝的舊的服務工作線程（空白文件）仍然在控制頁面。如果您點擊 __Source __旁邊的 `sw.js` 鏈接，便可驗證舊的服務工作線程仍然在運行中。 

如需修復這種不便，請啓用 __Update on reload__ 複選框。

![26f2ae9a805bc69b.png](img/26f2ae9a805bc69b.png)

啓用此複選框後，DevTools 會始終在每個頁面重新加載時更新服務工作線程。這在主動開發服務工作線程時非常有用。

現在重新加載頁面，就會看到系統安裝了新的服務工作線程，並且正在將請求網址記錄到控制器，如預期一樣。

![53c23650b131143a.png](img/53c23650b131143a.png)

現在，您需要確定使用這些請求要完成的任務。默認情況下，如果您未進行任何設置，請求會傳遞到網絡，系統會將響應返回到網頁。

要使應用離線工作，如果緩存中存在請求，我們需要從中獲取請求。

請更新您的抓取事件偵聽器，以匹配以下代碼。

`event.respondWith()` 方法會讓瀏覽器評估未來事件的結果。`caches.match(event.request)` 會獲取觸發抓取事件的當前網絡請求，在緩存中尋找匹配的資源。匹配通過查找網址字符串執行。`match` 方法會返回可解析的 promise，即使未在緩存中找到相關文件。這意味着您可以選擇要執行的操作。在您的簡單案例中，如果未找到文件，您會想要從網絡中 `fetch` 它，然後將其返回到瀏覽器。

這是最簡單的情況，還有許多其他緩存情境。例如，您可以增量方式緩存之前未緩存請求的所有響應，以便以後從緩存返回這些響應。 


## 恭喜！



現在您獲得離線支持了。在您處於在線狀態時重新加載頁面，將服務工作線程更新爲最新版本，然後使用 DevTools 轉至離線模式。重新加載頁面，就可以擁有功能完備的離線汽笛了！

#### 我們已經闡述的內容

* 如何向現有項目添加基礎服務工作線程。
* 如何使用 Chrome DevTools 模擬離線模式以及檢查和調試服務工作線程。
* 一種簡單的離線緩存策略。

#### 後續步驟

* 瞭解如何輕鬆添加功能強大的[具有 Polymer 離線元素的離線支持](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0)
* 探索更多[高級緩存技巧](https://jakearchibald.com/2014/offline-cookbook/)

#### 瞭解詳情

*  [服務工作線程簡介](/web/fundamentals/primers/service-worker/)





## 發現問題，或者有反饋？ {: .hide-from-toc }
立即提交[問題](https://github.com/googlesamples/io2015-codelabs/issues)，幫助我們讓代碼實驗室更加強大。謝謝！

{# wf_devsite_translation #}
