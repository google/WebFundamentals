project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 58 中添加到 DevTools 的新功能和變更。

{# wf_updated_on: 2017-03-06 #}
{# wf_published_on: 2017-03-06 #}
{# wf_tags: chrome58,devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Chrome 58 中添加到 DevTools 的新功能和變更。 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# DevTools 更新點 (Chrome 58) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

歡迎來到首期的 DevTools 發版日誌！從這一版本開始，首次打開新版 Chrome 你會看到 DevTools 
有一個 **What's New** 標籤，裏面含有當前版本發版日誌的鏈接。

## 亮點

* Timeline 面板更名爲 Performance 面板。
* Profiles 面板更名爲 Memory 面板。
* 可直接編輯 Cookie 值。
* 在內存溢出前 DevTool 會自動暫停。

## 新功能

### 可編輯的 Cookie {: #cookies }

雙擊 **Cookies** 標籤裏的表格項可直接編輯。

<figure>
  <img src="/web/updates/images/2017/03/editable-cookies.png"/>
  <figcaption>
    <b>圖 1</b>. 編輯 Cookie
  </figcaption>
</figure>

感謝 [kdzwinel](https://twitter.com/kdzwinel) 的貢獻!

### CSS 變量可以在 Styles 面板中進行審查和編輯 {: #css-variables }

現在，Styles 面板中可審查和編輯 CSS 變量了。查看[此示例][css vars]親自體驗一把吧。

[css vars]: https://googlechrome.github.io/devtools-samples/author/css-vars

### 內存溢出斷點 {: #out-of-memory-breakpoints }

當程序在短時間內分配佔用了大量內存時，DevTools 會自動暫停並且加大堆棧的上限。
這樣你就可以審查堆棧，在控制檯執行命令來釋放內存，然後繼續進行調試。想了解更多，
請移步 [Chrome的一小步，V8堆棧的一大步][heap]。

<figure>
  <img src="/web/updates/images/2017/03/out-of-memory-breakpoint.png"/>
  <figcaption>
    <b>圖 2</b>. 在內存溢出點的暫停
  </figcaption>
</figure>

[heap]: https://v8project.blogspot.com/2017/02/one-small-step-for-chrome-one-giant.html

### Canvas 被創建的斷點 {: #canvas-creation-breakpoints }

你可以創建一個基於 canvas 上下文被創建時所觸發的[事件斷點][event-listener-breakpoint]。

<figure>
  <img src="/web/updates/images/2017/03/canvas-breakpoint.png"/>
  <figcaption>
    <b>圖 3</b>. 從<b>事件斷點面板</b>的<b> canvas 上下文被創建</b>複選框生成的斷點
  </figcaption>
</figure>

[event-listener-breakpoint]: /web/tools/chrome-devtools/javascript/breakpoints#event-listeners

### 瀑布流時間線中新增開始時間 {: #start-stats }

在瀑布流時間線頂部，可以看到一條請求是何時加入隊列以及何時開始的。

<figure>
  <img src="/web/updates/images/2017/03/request-start-times.svg"/>
  <figcaption>
    <b>圖 4</b>. 瀑布流時間線中新增開始時間
  </figcaption>
</figure>

### 用時統計標籤中的服務器信息 {: #server-stats }

現在可以向網絡面板的用時統計標籤中插入自定義的服務器用時統計了。查看[服務器用時統計示例][server]。

[server]: https://gist.github.com/paulirish/a76ac17fc211b019e538c09d8d827691

<figure>
  <img src="/web/updates/images/2017/03/server-stats.svg"/>
  <figcaption>
    <b>圖 5</b>. <b>用時統計標籤</b>中的服務器時間統計
  </figcaption>
</figure>

## 變更

### Timeline 面板變更爲了現在的 Performance 面板 {: #performance-panel }

Timeline 面板更名爲了 Performance 面板，以更好地反映它的功能。

### Profiles 面板變成了現在的 Memory 面板 {: #memory-panel }

Profiles 面板更名爲了 Memory 面板，以更好地反映它的功能。

### CPU 分析器位置變更 {: #cpu-profiler }

既然 Profiles 面板已經更名爲了 Memory 面板，再把 CPU 分析器放這裏面就不合適了。此外，從長遠來看後續
會把所有分析相關的放入性能面板。目前，你仍然可以通過
[**設置**][settings] > **更多工具** > **JavaScript Profiler** 來訪問老版的 CPU 分析器。

查看 [Chrome DevTools: 在 Chrome 58 中進行 JavaScript CPU 分析][migration]以瞭解如何在 Performance 面板中
分析 CPU。

[settings]: /web/tools/chrome-devtools/ui#settings
[migration]: /web/updates/2016/12/devtools-javascript-cpu-profile-migration

### 全新的控制檯界面 {: #console }

控制檯及相關的標籤進行了界面的更新。一些不太常用的功能進行了隱藏，露出了更加常用的功能。

* 點擊 **控制檯設置圖標** ![控制檯設置圖標][console settings]{:.devtools-inline} 來進行控制檯相關的設置。
* **Preserve log** 被挪到了 **控制檯的設置界面**.
* 去掉了 **Filters** 按鈕及相應的面板。換成了現在的下拉菜單樣式。
* 過濾控制檯信息的文本輸入框從之前不可見的二級面板中挪了出來，始終顯示。
* 過濾控制檯信息的文本輸入自動接收正則作爲輸入，所以不需要之前的**正則開關**了。
* 去掉了 **Hide violations** 複選框，取而代之的是日誌等級下拉框中的 **Verbose**。
* 新版控制檯中，勾選 **控制檯設置** 中的 **Selected context only** 的效果和之前老界面裏
  去掉 **Show all messages** 的效果是一樣的。

<figure>
  <img src="/web/updates/images/2017/03/console.png"/>
  <figcaption>
    <b>圖 6</b>. 全新的控制檯界面
  </figcaption>
</figure>

[console settings]: /web/updates/images/2017/03/console-settings.png

### WebGL 事件監聽器斷點位置有所變更 {: #webgl }

WebGL [事件監聽器斷點][event-listener-breakpoint] 從原來的 **WebGL** 分類中移動到了 **Canvas** 分類中。
去掉了**WebGL** 這個分類。