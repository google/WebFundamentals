project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Chrome DevTools 的 Elements 面板中的 DOM 樹視圖可以顯示當前網頁的 DOM 結構。通過 DOM 更新實時修改頁面的內容和結構。

{# wf_updated_on: 2015-04-29 #}
{# wf_published_on: 2015-04-29 #}

# 編輯 DOM {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Chrome DevTools 的 Elements 面板中的 DOM 樹視圖可以顯示當前網頁的 DOM 結構。通過 DOM 更新實時修改頁面的內容和結構。


### TL;DR {: .hide-from-toc }
- DOM 定義您的頁面結構。每一個 DOM 節點都是一個頁面元素，例如，標題節點或段落節點。
- 通過渲染的 DOM 實時編輯頁面的內容和結構。
- 不過請記住，您無法在 Elements 面板中通過 DOM 更改修改源文件。重新加載頁面會清空任何 DOM 樹修改。
- 使用 DOM 斷點留意 DOM 更改。


## 檢查元素 {:#inspect-an-element}

使用 **Elements** 面板可以在一個 DOM 樹中檢查頁面中的所有元素。
選擇任何元素並檢查應用到該元素的樣式。

<video autoplay muted src="animations/inspect-element.mp4">
</video>

可以通過多種方式檢查元素：

右鍵點擊頁面上的任何元素並選擇 **Inspect**。

![通過右鍵點擊檢查元素](/web/tools/chrome-devtools/inspect-styles/imgs/right-click-inspect.png)

按 <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd>
+ <kbd class="kbd">C</kbd> (Windows) 或 <kbd class="kbd">Cmd</kbd>
+ <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd> (Mac)，在 Inspect Element 模式下打開 DevTools，然後將鼠標懸停到某個元素上。
DevTools 會在 **Elements** 面板中自動突出顯示您懸停的元素。點擊元素可以退出檢查模式，同時保持元素在 **Elements** 面板中處於突出顯示狀態。
 

點擊 **Inspect Element** 按鈕 ![Inspect 圖標](/web/tools/chrome-devtools/inspect-styles/imgs/inspect-icon.png){:.inline} 轉到 Inspect Element 模式，然後點擊元素。



在控制檯中使用 [`inspect`][inspect] 方法，例如 `inspect(document.body)`。


## DOM 導航

使用您的鼠標或鍵盤在 DOM 結構中導航。

摺疊的節點的旁邊會有一個向右箭頭：![摺疊的節點](imgs/collapsed-node.png){:.inline}


展開的節點的旁邊會有一個向下箭頭：![展開的節點](imgs/expanded-node.png){:.inline}


使用鼠標：

* 點擊一次可以突出顯示節點。
* 要展開節點，請雙擊節點上的任何地方，或者點擊節點旁邊的箭頭。
* 要摺疊節點，請點擊節點旁邊的箭頭。

使用鍵盤：

* 按**向上箭頭**鍵可以選擇當前節點上方的節點。
* 按**向下箭頭**可以選擇當前節點下方的節點。
* 按**向右箭頭**鍵可以展開摺疊的節點。再按一次可以移動到（已展開）節點的第一個子級。
您可以使用此方法快速導航到深度嵌套的節點。


### 麪包屑導航記錄導航

Elements 面板的底部是麪包屑導航記錄。 

![麪包屑導航記錄](imgs/breadcrumb-body.png)

當前選定的節點將以藍色突出顯示。左側是當前節點的父級。
再左側是父級的父級。以此類推，一直到 DOM 樹。


![擴展麪包屑導航記錄](imgs/breadcrumb-footer.png)

在結構中向上導航會移動突出顯示焦點：

![麪包屑導航記錄向上導航](imgs/breadcrumb-trail.png)

DevTools 會在記錄中顯示儘可能多的項目。如果狀態欄無法顯示全部記錄，將在記錄截斷的地方顯示一個省略號 (...)。點擊省略號可以顯示隱藏的元素：


![麪包屑導航省略號](imgs/breadcrumb-ellipsis.png)

## 編輯 DOM 節點和屬性

要編輯 DOM 節點名稱或屬性，請執行以下操作：

* 直接在節點名稱或屬性上雙擊。
* 突出顯示節點，按 <kbd>Enter</kbd>，然後按 <kbd>Tab</kbd>，
  直到選中名稱或屬性。
* 打開 [more actions 菜單](#more-actions) 並選擇 **Add Attribute** 或 **Edit Attribute**。
**Edit Attribute** 取決於上下文；您點擊的部分決定要編輯的內容。


完成後，結束標記將自動更新。

<video autoplay muted src="animations/edit-element-name.mp4">
</video>

### 以 HTML 形式編輯 DOM 節點及其子級

要以 HTML 形式編輯 DOM 節點及其子級，請執行以下操作：

* 打開 [more actions 菜單](#more-actions)並選擇 **Edit as HTML**。 
* 按 <kbd>F2</kbd> (Windows / Linux) 或 <kbd>Fn</kbd>+<kbd>F2</kbd> (Mac)。
* 按 <kbd>Ctrl</kbd>+<kbd>Enter</kbd> (Windows / Linux) 或 <kbd>Cmd</kbd>+<kbd>Enter</kbd> (Mac) 保存更改。
* 按 <kbd>Esc</kbd> 可以退出編輯器而不保存。

![以 HTML 形式編輯](imgs/edit-as-html.png)

## 移動 DOM 節點

點擊、按住並拖動節點可將其移動。

<video autoplay muted src="animations/move-node.mp4">
</video>

## 刪除 DOM 節點

要刪除 DOM 節點，請執行以下操作：

* 打開 [more actions 菜單](#more-actions)並選擇 **Delete Node**。
* 選擇節點並按 <kbd>Delete</kbd> 鍵。

注：如果您意外刪除了節點，按 <kbd class='kbd'>Ctrl</kbd> + <kbd class='kbd'>Z</kbd>（Mac 上爲 <kbd class='kbd'>Cmd</kbd> + <kbd class='kbd'>Z</kbd>）可以撤消您的上一步操作。

## 顯示 more actions 菜單 {:#more-actions}

利用 **more actions** 菜單，您可以通過多種方式與 DOM 節點交互。
要查看該菜單，請右鍵點擊節點，或者選擇節點，然後按 **more actions** 按鈕 (![more action 按鈕](imgs/more-actions-button.png){:.inline}))。按鈕僅在當前選定的元素上顯示。


![more actions 菜單](imgs/more-actions-menu.png)

## 滾動到視圖

懸停或選擇 DOM 節點時，渲染的節點將在視口中突出顯示。
如果節點滾動到屏幕以外，在節點位於當前視口上方時您將在視口頂部看到提示，而在節點位於當前視口下方時，您將在底部看到提示。例如，在下方的屏幕截圖中，DevTools 指出 **Elements** 面板中當前選定的節點位於視口以下。


![視口下的元素](imgs/below-viewport.png)

要滾動頁面使節點在視口中顯示，請**右鍵點擊**節點並選擇 **Scroll into View**。


## 設置 DOM 斷點

設置 DOM 斷點以調試複雜的 JavaScript 應用。例如，如果您的 JavaScript 正在更改 DOM 元素的樣式，請將 DOM 斷點設置爲在元素屬性修改時觸發。在發生以下一種 DOM 更改時觸發斷點：子樹更改、屬性更改、節點移除。

{# include shared/related_guides.liquid inline=true list=page.related-guides.breakpoints #}

### 子樹修改

添加、移除或移動子元素時將觸發子樹修改斷點。例如，如果您在 `main-content` 元素上設置子樹修改，以下代碼將觸發斷點：


    var element = document.getElementById('main-content');
    //modify the element's subtree.
    var mySpan = document.createElement('span');
    element.appendChild( mySpan );
    

### 屬性修改

動態更改元素的屬性 (`class, id, name`) 時將發生屬性修改：


    var element = document.getElementById('main-content');
    // class attribute of element has been modified.
    element.className = 'active';
    

### 節點移除

從 DOM 中移除有問題的節點時將觸發節點移除修改：



    document.getElementById('main-content').remove();
    

## 與 DOM 斷點交互

Elements 和 Sources 面板均包含一個用於管理 DOM 斷點的窗格。


每個斷點都會列出元素標識符和斷點類型。

![DOM breakpoints 窗格](imgs/dom-breakpoints-pane.png)

可通過以下方式之一與列出的每一個斷點交互：

* **懸停**在元素標識符上可以顯示元素在頁面上的相應位置（類似於在 Elements 面板中懸停在節點上）。
* **點擊**元素可以將其在 Elements 面板中選中。
* **切換**複選框可以啓用或停用斷點。

觸發 DOM 斷點時，斷點將在 DOM Breakpoints 窗格中突出顯示。
**Call Stack** 窗格將顯示調試程序暫停的**原因**：


![斷點原因](imgs/breakpoint-reason.png)

## 查看元素事件偵聽器

在 **Event Listeners** 窗格中查看與 DOM 節點關聯的 JavaScript 事件偵聽器。
 

![Event Listeners 面板](imgs/event-listeners-pane.png)

Event Listeners 窗格中的頂級項目將顯示具有已註冊偵聽器的事件類型。


點擊事件類型（例如 `click`）旁的箭頭可以查看已註冊事件處理程序的列表。
每個處理程序都由一個類似於 CSS 選擇器的元素標識符標識，例如 `document` 或 `button#call-to-action`。如果已爲相同元素註冊多個處理程序，將重複列示元素。


點擊元素標識符旁的展開箭頭可以查看事件處理程序的屬性。Event Listeners 窗格將列出每個偵聽器的以下屬性：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">事件偵聽器屬性和說明</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Value"><code>handler</code></td>
      <td data-th="Description">包含一個回調函數。右鍵點擊函數並選擇 <strong>Show Function Definition</strong> 可以查看函數的定義位置（如果源代碼可用）。</td>
    </tr>
    <tr>
      <td data-th="Value"><code>useCapture</code></td>
      <td data-th="Description">指示  <code>addEventListener</code> 上的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a> 標誌是否設置的布爾值。</td>
    </tr>
  </tbody>
</table>

注：許多 Chrome 擴展程序都會將其自己的事件偵聽器添加到 DOM 上。如果您看到一些不是由您的代碼設置的事件偵聽器，您可能希望在[隱身窗口](https://support.google.com/chrome/answer/95464)中重新打開頁面。默認情況下，隱身窗口會阻止擴展程序運行。

### 查看祖先實體事件偵聽器

{% comment %}

code for screenshot

<!doctype html>
<html>
<body onload="console.log('onload');">
  <div onfocus="console.log('focus');">
    <button id="button" onclick="console.log('onclick');">點我</button>
  </div>
</body>
</html>

{% endcomment %}

如果啓用 **Ancestors** 複選框，除了當前選定節點的事件偵聽器外，還會顯示其祖先實體的事件偵聽器。



![已啓用祖先實體](imgs/ancestors-enabled.png)

如果停用複選框，將僅顯示當前選定節點的事件偵聽器。


![已停用祖先實體](imgs/ancestors-disabled.png)

### 查看框架偵聽器

{% comment %}

code for screenshot

<!doctype html>
<html>
<script src="https://code.jquery.com/jquery-2.2.0.js"></script>
<body>
  <button id="button">請點我</button>
  <script>
    $('#button').click(function() {
      $('#button').text('hehe, that tickled, thanks');
    });
  </script>
</body>
</html>

{% endcomment %}

某些 JavaScript 框架和庫會將原生 DOM 事件封裝到它們的自定義事件 API 中。
過去，這會讓使用 DevTools 檢查事件偵聽器非常困難，因爲函數定義僅會引用框架或內容庫代碼。**框架偵聽器**功能讓這一問題迎刃而解。


啓用 **Framework listeners** 複選框時，DevTools 會自動解析事件代碼的框架或內容庫封裝部分，然後告訴您實際將事件綁定到代碼中的位置。



![框架偵聽器已啓用](imgs/framework-listeners-enabled.png)

如果停用 **Framework listeners** 複選框，事件偵聽器代碼很可能會在框架或內容庫代碼的其他地方解析。
 

![框架偵聽器已停用](imgs/framework-listeners-disabled.png)



[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
