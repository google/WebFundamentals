project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Application 面板檢查、修改和調試網絡應用清單、服務工作線程和服務工作線程緩存。

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on:2016-07-25 #}

# 調試 Progressive Web App {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

使用 <strong>Application</strong> 面板檢查、修改和調試網絡應用清單、服務工作線程和服務工作線程緩存。


相關指南： 

* [Progressive Web App](/web/progressive-web-apps)

本指南僅討論 **Application** 面板的 Progressive Web App 功能。
如果您希望獲得其他窗格的幫助，請參閱本指南的最後一部分，即[其他 Application 面板指南](#other)。




### TL;DR {: .hide-from-toc }
- 使用 <strong>App Manifest</strong> 窗格檢查您的網絡應用清單和觸發 Add to Homescreen 事件。
- 使用 <strong>Service Worker</strong> 窗格執行與服務工作線程相關的全部任務，例如註銷或更新服務、模擬推送事件、切換爲離線狀態，或者停止服務工作線程。
- 從 <strong>Cache Storage</strong> 窗格查看您的服務工作線程緩存。
- 從 <strong>Clear Storage</strong> 窗格中點擊一次按鈕，註銷服務工作線程並清除所有存儲與緩存。


## 網絡應用清單 {: #manifest }

如果您希望用戶能夠將您的應用添加到他們移動設備的主屏幕上，那麼您需要一個網絡應用清單。
清單定義應用在主屏幕上的外觀、從主屏幕啓動時將用戶定向到何處，以及應用在啓動時的外觀。



相關指南：

* [通過網絡應用清單改進用戶體驗](/web/fundamentals/web-app-manifest)
* [使用應用安裝橫幅](/web/fundamentals/app-install-banners)


設置好清單後，您可以使用 **Application** 面板的 **Manifest** 窗格對其進行檢查。


![Manifest 窗格][manifest]

* 要查看清單來源，請點擊 **App Manifest** 標籤下方的鏈接（上方屏幕截圖中的 `https://airhorner.com/manifest.json`）。
* 按 **Add to homescreen** 按鈕模擬 Add to Homescreen 事件。
如需瞭解詳細信息，請參閱下一部分。
* **Identity** 和 **Presentation** 部分以一種對用戶更加友好的方式顯示了清單來源中的字段。
* **Icons** 部分顯示了您已指定的每一個圖標。

[manifest]: images/manifest.png

### 模擬 Add to Homescreen 事件 {: #add-to-homescreen }

只有至少已經訪問網站兩次、訪問至少間隔五分鐘時纔可以將網絡應用添加到主屏幕上。
開發或調試您的 Add to Homescreen 工作流時，此條件非常不便。利用 **App Manifest** 窗格上的 **Add to homescreen** 按鈕，您可以隨時模擬 Add to Homescreen 事件。




您可以使用 [Google I/O 2016 Progressive Web App](https://events.google.com/io2016/){: .external } 測試此功能，該應用可以爲 Add to Homescreen 提供相應支持。在應用打開時點擊 **Add to Homescreen** 會提示 Chrome 顯示“add this site to your shelf”橫幅（桌面設備），而在移動設備上則會顯示“add to homescreen”橫幅。



![添加到桌面設備文件架][shelf]

**提示**：在模擬 Add to Homescreen 事件時請保持 **Console** 抽屜式導航欄處於打開狀態。
Console 會告訴您清單是否存在任何問題，並記錄與 Add to Homescreen 生命週期有關的其他信息。


**Add to Homescreen** 功能還不能模擬移動設備的工作流。
注意“add to shelf”提示在上方屏幕截圖中的觸發方式（即使 DevTools 處於 Device Mode）。
不過，如果您可以將應用成功添加到桌面設備文件架，那麼在移動設備上也可以獲得成功。



如果您希望測試真實的移動體驗，則可以通過[遠程調試][remote debugging]將一臺真實的移動設備連接到 DevTools，然後點擊 DevTools 上的 **Add to Homescreen** 按鈕，在連接的移動設備上觸發“add to homescreen”提示。



[shelf]: images/io.png
[remote debugging]: /web/tools/chrome-devtools/debug/remote-debugging/remote-debugging

## 服務工作線程 {: #service-workers }

服務工作線程是未來網絡平臺中的一種基礎技術。它們是瀏覽器獨立於網頁在後臺運行的腳本。這些腳本使您可以訪問不需要網頁或用戶交互的功能，例如推送通知、後臺同步和離線體驗。




相關指南：

* [服務工作線程簡介](/web/fundamentals/primers/service-worker)
* [推送通知：及時、相關且精確](/web/fundamentals/push-notifications)


**Application** 面板中的 **Service Workers** 窗格是在 DevTools 中檢查和調試服務工作線程的主要地方。


![Service Worker 窗格][sw]

* 如果服務工作線程已安裝到當前打開的頁面上，您會看到它將列示在此窗格中。
例如，在上方的屏幕截圖中，`https://events.google.com/io2016/` 的作用域內安裝了一個服務工作線程。
* **Offline** 複選框可以將 DevTools 切換至離線模式。它等同於 **Network** 窗格中的離線模式，或者 [Command Menu][cm] 中的 `Go offline` 選項。
* **Update on reload** 複選框可以強制服務工作線程在每次頁面加載時更新。
* **Bypass for network** 複選框可以繞過服務工作線程並強制瀏覽器轉至網絡尋找請求的資源。
* **Update** 按鈕可以對指定的服務工作線程執行一次性更新。
* **Push** 按鈕可以在沒有負載的情況下模擬推送通知（也稱爲[操作消息][tickle]）。
* **Sync** 按鈕可以模擬後臺同步事件。
* **Unregister** 按鈕可以註銷指定的服務工作線程。參閱[清除存儲](#clear-storage)，瞭解點擊一次按鈕即可註銷服務工作線程並擦除存儲和緩存的方式。
* **Source** 行可以告訴您當前正在運行的服務工作線程的安裝時間。
鏈接是服務工作線程源文件的名稱。點擊鏈接會將您定向至服務工作線程來源。
* **Status** 行可以告訴您服務工作線程的狀態。此行上的數字（上方屏幕截圖中的 `#1`）指示服務工作線程已被更新的次數。如果啓用 **update on reload** 複選框，您會注意到每次頁面加載時此數字都會增大。在狀態旁邊，您將看到 **start** 按鈕（如果服務工作線程已停止）或 **stop** 按鈕（如果服務工作線程正在運行）。服務工作線程設計爲可由瀏覽器隨時停止和啓動。
使用 **stop** 按鈕明確停止服務工作線程可以模擬這一點。停止服務工作線程是測試服務工作線程再次重新啓動時的代碼行爲方式的絕佳方法。它通常可以揭示由於對持續全局狀態的不完善假設而引發的錯誤。
* **Clients** 行可以告訴您服務工作線程作用域的原點。
如果您已啓用 **show all** 複選框，**focus** 按鈕將非常實用。
在此複選框啓用時，系統會列出所有註冊的服務工作線程。
如果您點擊正在不同標籤中運行的服務工作線程旁的 **focus** 按鈕，Chrome 會聚焦到該標籤。


如果服務工作線程導致任何錯誤，將顯示一個名爲 **Errors** 的新標籤。


![包含錯誤的服務工作線程][errors]

[sw]: images/sw.png
[cm]: /web/tools/chrome-devtools/settings#command-menu
[tickle]: /web/fundamentals/push-notifications/how-push-works
[errors]: images/sw-error.png

## 服務工作線程緩存 { :#caches }

**Cache Storage** 窗格提供了一個已使用（服務工作線程）[Cache API][sw-cache] 緩存的只讀資源列表。


![Service Worker Cache 窗格][sw-cache-pane]

請注意，第一次打開緩存並向其添加資源時，DevTools 可能檢測不到更改。
重新加載頁面後，您應當可以看到緩存。

如果您打開了兩個或多個緩存，您將看到它們列在 **Cache Storage** 下拉菜單下方。


![多個服務工作線程緩存][multiple-caches]

[sw-cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[sw-cache-pane]: images/sw-cache.png
[multiple-caches]: images/multiple-caches.png

## 清除存儲 {: #clear-storage }

開發 Progressive Web App 時，**Clear Storage** 窗格是一個非常實用的功能。
利用此窗格，只需點擊一次按鈕即可註銷服務工作線程並清除所有緩存與存儲。
參閱下面的部分了解詳情。


相關指南：

* [清除存儲](/web/tools/chrome-devtools/iterate/manage-data/local-storage#clear-storage)


## 其他 Application 面板指南 {: #other }

參閱下面的部分，獲取有關 **Application** 面板其他窗格的更多幫助。


相關指南：

* [檢查頁面資源](/web/tools/chrome-devtools/iterate/manage-data/page-resources)
* [檢查和管理本地存儲與緩存](/web/tools/chrome-devtools/iterate/manage-data/local-storage)



{# wf_devsite_translation #}
