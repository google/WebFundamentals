project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 選項1

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-03-28 #}

# Chrome 開發者工具 {: .page-title }

Chrome 開發者工具是一套內置於Google Chrome中的Web開發和調試工具，可用來對網站進行迭代、調試和分析。

Dogfood: 尋找最新版本的Chrome 開發者工具, [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) 總是有最新的DevTools.

## 打開Chrome 開發者工具 {: #open }

* 在Chrome菜單中選擇 **更多工具** > **開發者工具**
* 在頁面元素上右鍵點擊，選擇 “檢查”
* 使用 [快捷鍵 ](/web/tools/chrome-devtools/inspect-styles/shortcuts)
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows) 或 <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>I</kbd> (Mac)

## 瞭解面板

### 設備模式

<img src="images/device-mode.png" alt="Device Mode" class="attempt-right">

使用設備模式構建完全響應式，移動優先的網絡體驗。

* [Device Mode](/web/tools/chrome-devtools/device-mode/)
* [Test Responsive and Device-specific Viewports](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)
* [Emulate Sensors: Geolocation &amp; Accelerometer](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

<div style="clear:both;"></div>


### 元素面板

<img src="images/panels/elements.png" alt="Elements Panel" class="attempt-right">
使用元素面板可以自由的操作DOM和CSS來迭代佈局和設計頁面.


* [檢查和調整頁面](/web/tools/chrome-devtools/inspect-styles/)
* [編輯樣式](/web/tools/chrome-devtools/inspect-styles/edit-styles)
* [編輯DOM](/web/tools/chrome-devtools/inspect-styles/edit-dom)

<div style="clear:both;"></div>


### 控制檯面板

<img src="images/panels/console.png" alt="Console Panel" class="attempt-right">

在開發期間，可以使用控制檯面板記錄診斷信息，或者使用它作爲 shell在頁面上與JavaScript交互。

* [使用控制檯面板](/web/tools/chrome-devtools/console/)
* [命令行交互](/web/tools/chrome-devtools/console/)

<div style="clear:both;"></div>


### 源代碼面板

<img src="images/panels/sources.png" alt="Sources Panel" class="attempt-right">

在源代碼面板中設置斷點來調試 JavaScript ，或者通過Workspaces（工作區）連接本地文件來使用開發者工具的實時編輯器。

* [斷點調試](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [調試混淆的代碼](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [使用開發者工具的Workspaces（工作區）進行持久化保存](/web/tools/setup/setup-workflow)

<div style="clear:both;"></div>


### 網絡面板
<img src="images/panels/network.png" alt="Network Panel" class="attempt-right">

使用網絡面板瞭解請求和下載的資源文件並優化網頁加載性能。

* [網絡面板基礎](/web/tools/chrome-devtools/network-performance/resource-loading)
* [瞭解資源時間軸](/web/tools/chrome-devtools/network-performance/understanding-resource-timing)
* [網絡帶寬限制](/web/tools/chrome-devtools/network-performance/network-conditions)

<div style="clear:both;"></div>


### 性能面板
Note: 在 Chrome 57 之後時間線面板更名爲性能面板.
<img src="images/panels/performance.png" alt="Timeline Panel" class="attempt-right">

使用時間軸面板可以通過記錄和查看網站生命週期內發生的各種事件來提高頁面的運行時性能。

* [如何查看性能](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [分析運行時性能](/web/tools/chrome-devtools/rendering-tools/)
* [診斷強制的同步佈局](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)

<div style="clear:both;"></div>


### 內存面板
Note: 在 Chrome 57 之後分析面板更名爲內存面板.
<img src="images/panels/memory.png" alt="Profiles Panel" class="attempt-right">

如果需要比時間軸面板提供的更多信息，可以使用“配置”面板，例如跟蹤內存泄漏。
Use the Profiles panel if you need more information than the Timeline provide, for instance to track down memory leaks.

* [JavaScript CPU 分析器](/web/tools/chrome-devtools/rendering-tools/js-execution)
* [內存堆區分析器](/web/tools/chrome-devtools/memory-problems/)

<div style="clear:both;"></div>


### 應用面板
Note: 在 Chrome 52 之後資源面板更名爲應用面板.
<img src="images/panels/application.png" alt="Application Panel" class="attempt-right">

使用資源面板檢查加載的所有資源，包括IndexedDB與Web SQL數據庫，本地和會話存儲，cookie，應用程序緩存，圖像，字體和樣式表。

* [管理數據](/web/tools/chrome-devtools/manage-data/local-storage)

<div style="clear:both;"></div>


### 安全面板
<img src="images/panels/security.png" alt="Security Panel" class="attempt-right">

使用安全面板調試混合內容問題，證書問題等等。

* [安全](/web/tools/chrome-devtools/security)

<div style="clear:both;"></div>

## 參與互動

[Twitter](https://twitter.com/ChromeDevTools){: .button .button-white}
[Stack Overflow](https://stackoverflow.com/questions/tagged/google-chrome-devtools){: .button .button-white}
[Slack](https://chromiumdev.slack.com/messages/devtools/){: .button .button-white}
