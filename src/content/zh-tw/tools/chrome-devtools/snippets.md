project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:代碼段是您可以在 Chrome DevTools 的 Sources 面板中製作和執行的小腳本。您可以從任何頁面訪問和運行它們。在您運行代碼段時，它會從當前已打開頁面的上下文執行。

{# wf_updated_on:2016-06-26 #}
{# wf_published_on:2015-10-12 #}

# 從任何頁面運行代碼段 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

代碼段是您可以在 Chrome DevTools 的 Sources 面板中製作和執行的小腳本。
您可以從任何頁面訪問和運行它們。
在您運行代碼段時，它會從當前已打開頁面的上下文執行。


如果您有將在多個頁面上重複使用的實用程序或調試腳本，可以考慮將腳本保存爲代碼段。

您也可以使用代碼段替代[小書籤](https://en.wikipedia.org/wiki/Bookmarklet)。



### TL;DR {: .hide-from-toc }
- 代碼段是您可以從任何頁面運行的小腳本（類似於小書籤）。
- 使用“Evaluate in Console”功能可以在控制檯中運行部分代碼段。
- 請注意，Sources 面板中的常用功能（如斷點）也可與代碼段結合使用。


## 創建代碼段

要創建代碼段，請打開 **Sources** 面板，點擊 **Snippets** 標籤，在導航器中點擊右鍵，然後選擇 **New**。


![創建代碼段](images/create-snippet.png)

在編輯器中輸入您的代碼。如果您未保存更改，您的腳本名稱旁會有一個星號，如下面的屏幕截圖所示。請按 <kbd>Command</kbd>+<kbd>S</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>S</kbd>
（Windows、Linux）以保存您的更改。 

![未保存的代碼段](images/unsaved-snippet.png)

## 運行代碼段

可以通過三種方式運行代碼段： 

* 右鍵點擊代碼段文件名（左側窗格列出了所有代碼段），然後選擇 **Run**。
* 點擊 **Run** 按鈕 (![運行代碼段按鈕](images/run.png){:.inline})。
* 按 <kbd>Command</kbd>+<kbd>Enter</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>Enter</kbd>（Windows、Linux）。


要在控制檯中評估部分代碼段，請突出顯示這一部分，在編輯器中的任意位置右鍵點擊，然後選擇 **Evaluate in Console**，或使用鍵盤快捷鍵 <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>（Windows、Linux）。





![在控制檯中評估](images/evaluate-in-console.png)

## 查看本地修改

<!-- TODO apply revision content doesn't really work... -->

要查看您對代碼段所做修改的差異，請在編輯器中（顯示代碼段時）點擊右鍵，然後選擇 **Local modifications**。


![本地修改](images/local-modifications.png)

在控制檯抽屜式導航欄中會彈出名稱爲 **History** 的新標籤。

![代碼段歷史記錄](images/snippet-history.png)

每個時間戳代表一次修改。展開時間戳旁的三角符號，查看那個時間點所做修改的差異。**revert** 鏈接可以移除修訂歷史記錄。從 2016 年 6 月 27 日開始，**apply revision content** 和 **apply original content** 鏈接似乎無法按預期工作。



## 設置斷點

就像在其他腳本上一樣，您也可以在代碼段上設置斷點。請參閱[添加斷點](/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints)，瞭解如何在 **Sources** 面板中添加斷點。




{# wf_devsite_translation #}
