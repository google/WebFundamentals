project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:檢查和編輯頁面的 HTML 與 CSS。

{# wf_updated_on:2016-01-28 #}
{# wf_published_on:2015-04-13 #}

# 檢查和編輯頁面與樣式 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

使用 Chrome DevTools 的 Elements 面板檢查和實時編輯頁面的 HTML 與 CSS。


![Chrome DevTools 的 Elements 面板](imgs/elements-panel.png)


### TL;DR {: .hide-from-toc }
- 在 Elements 面板中檢查和實時編輯 DOM 樹中的任何元素。
- 在 Styles 窗格中查看和更改應用到任何選定元素的 CSS 規則。
- 在 Computed 窗格中查看和修改選定元素的框模型。
- 在 Sources 面板中查看在本地對頁面所做的更改。


## 實時編輯 DOM 節點

要實時編輯 DOM 節點，只需雙擊[選定元素](#inspect-an-element)，然後進行更改：


<video src="animations/edit-element-name.mp4" style="max-width:100%;"
       loop muted autoplay controls></video>

DOM 樹視圖會顯示樹的當前狀態；可能會與最初因其他原因加載的 HTML 不匹配。
例如，您可以使用 JavaScript 修改 DOM 樹；瀏覽器引擎會嘗試修正無效的作者標記並生成意外的 DOM。



## 實時編輯樣式

在 **Styles** 窗格中實時編輯樣式屬性名稱和值。所有樣式均可修改，除了灰色部分（與 User Agent 樣式表一樣）。



要編輯名稱或值，請點擊它，進行更改，然後按 <kbd class="kbd">Tab</kbd> 或 <kbd class="kbd">Enter</kbd> 保存更改。


![編輯屬性名稱](imgs/edit-property-name.png)

默認情況下，您的 CSS 修改不是永久的，重新加載頁面時更改會丟失。
如果您想要在頁面加載時保留更改，請設置[永久製作](/web/tools/setup/setup-workflow)。

 

## 檢查和編輯框模型參數

使用 **Computed** 窗格檢查和編輯當前元素的框模型參數。
框模型中的所有值均可修改，只需點擊它們即可。


![Computed 窗格](imgs/computed-pane.png)

同軸矩形包含當前元素 **padding**、**border** 和 **margin** 屬性的 **top**、**bottom**、**left**、**right** 值。

 

對於位置爲非靜態的元素，還會顯示 **position** 矩形，包含 **top**、**right**、**bottom** 和 **left** 屬性的值。



![非靜態計算元素](imgs/computed-non-static.png)

對於 `position: fixed` 和 `position: absolute` 元素，中心域包含選定元素實際的 **offsetWidth × offsetHeight** 像素尺寸。所有值都可以通過雙擊修改，就像 Styles 窗格中的屬性值一樣。
不過，無法保證這些更改能夠生效，因爲這要取決於具體的元素定位詳情。



![固定計算元素](imgs/computed-fixed.png)

## 查看本地更改

<video src="animations/revisions.mp4" style="max-width:100%;"
       autoplay loop muted controls></video>

要查看對頁面所做實時編輯的歷史記錄，請執行以下操作：

1. 在 **Styles** 窗格中，點擊您修改的文件。DevTools 會將您帶到 **Sources** 面板。
1. 右鍵點擊文件。
1. 選擇 **Local modifications**。

要探索所做的更改，請執行以下操作：

* 展開頂級文件名查看做出修改的時間 ![做出修改的時間](imgs/image_25.png){:.inline}。
* 展開第二級項目查看修改相應的[不同](https://en.wikipedia.org/wiki/Diff)（前和後）。

粉色背景的線表示移除，綠色背景的線表示添加。


## 撤消更改

如果您未[設置永久製作](/web/tools/setup/setup-workflow)，每次您重新加載頁面時，所有的實時編輯都會丟失。


假設您已設置了永久製作，要撤消更改，請執行以下操作：

* 使用 <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd> (Windows) 或 <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd> (Mac) 通過 Elements 面板快速撤消對 DOM 或樣式所做的細微更改。



* 要撤消對文件所做的所有本地修改，請打開 **Sources** 面板，然後選擇文件名旁的 **revert**。


[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
