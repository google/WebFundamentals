project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:通過 Chrome DevTools Command Line API，您可以使用各種方式觀察和檢查事件偵聽器

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# 監控事件 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
通過 Chrome DevTools Command Line API，您可以使用各種方式觀察和檢查事件偵聽器。JavaScript 在交互式頁面中扮演着重要角色，瀏覽器爲您提供一些有用的工具來調試事件和事件處理程序。


### TL;DR {: .hide-from-toc }
- 使用  <code>monitorEvents()</code> 偵聽特定類型的事件。
- 使用  <code>unmonitorEvents()</code> 停止偵聽。
- 使用  <code>getEventListeners()</code> 獲取 DOM 元素的偵聽器。
- 使用“Event Listeners Inspector”面板獲取有關事件偵聽器的信息。


## 監控事件

[monitorEvents()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events) 方法指示 DevTools 記錄與指定目標有關的信息。


第一個參數是要監控的對象。如果不提供第二個參數，所有事件都將返回。若要指定要偵聽的事件，則傳遞一個字符串或一個字符串數組作爲第二個參數。




在頁面正文上偵聽“click”事件：

    monitorEvents(document.body, "click");

如果監控的事件是受支持的*事件類型*，DevTools 將其映射到一組標準事件名稱，則該方法偵聽該類型的事件。



[Command Line API](/web/tools/chrome-devtools/debug/command-line/command-line-reference) 可提供完整的*事件類型*與其涵蓋的事件的對應情況。

如需停止監控事件，請調用 `unmonitorEvents()` 方法併爲其提供對象以停止監控。


停止偵聽 `body` 對象上的事件：

    unmonitorEvents(document.body);

## 查看在對象上註冊的事件偵聽器

[getEventListeners() API](/web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject) 返回在指定對象上註冊的事件偵聽器。


返回值是一個對象，其包含每個註冊的事件類型（例如，`click` 或 `keydown`）數組。每個數組的成員是描述爲每個類型註冊的偵聽器的對象。例如，以下代碼列出了在文檔對象上註冊的所有事件偵聽器：





    getEventListeners(document);

![使用 getEventListeners() 時的輸出](images/events-call-geteventlisteners.png)

如果在指定對象上註冊了多個偵聽器，則數組包含每個偵聽器的成員。以下示例中，在“#scrollingList”元素上爲 `mousedown` 事件註冊了兩個事件偵聽器：




![附加到 mousedown 的事件偵聽器的視圖](images/events-geteventlisteners_multiple.png)

進一步展開每個對象以查看它們的屬性：

![展開的 listener 對象的視圖](images/events-geteventlisteners_expanded.png)

## 查看在 DOM 元素上註冊的事件偵聽器

默認情況下，Elements Inspector 中的 *Event Listeners* 面板顯示附加到頁面的所有事件：


![Event listeners 面板](images/events-eventlisteners_panel.png)

過濾器將事件限制在選定的節點：

![Event listeners 面板，僅按選定的節點過濾](images/events-eventlisteners_panel_filtered.png)

通過展開對象，此面板顯示事件偵聽器詳細信息。在此示例中，此頁面擁有兩個通過 jQuery 附加的事件偵聽器：



![展開的事件偵聽器視圖](images/events-eventlisteners_panel_details.png)



{# wf_devsite_translation #}
