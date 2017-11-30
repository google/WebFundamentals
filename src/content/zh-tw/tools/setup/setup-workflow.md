project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:在 Chrome DevTools 中設置永久製作，以便立即查看更改和將這些更改保存到磁盤中。

{# wf_updated_on:2015-07-30 #}
{# wf_published_on:2015-07-08 #}

# 使用 DevTools 的工作區設置持久化 {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

在 Chrome DevTools 中設置永久製作，以便立即查看更改和將這些更改保存到磁盤中。

利用 Chrome DevTools，您可以更改網頁上的元素和樣式並立即查看更改。默認情況下，刷新瀏覽器後更改消失，除非您將其手動複製並粘貼到外部編輯器中。




通過工作區，您可以將這些更改保存到磁盤中，而不用離開 Chrome DevTools。將本地網絡服務器提供的資源映射到磁盤上的文件中，並實時查看對這些文件的更改。





### TL;DR {: .hide-from-toc }
- 請勿將這些更改手動複製到本地文件中。使用工作區將在 DevTools 中進行的更改保存到您的本地資源中。
- 將您的本地文件暫存到瀏覽器中。將文件映射到網址。
- 設置好永久工作區後，在 Elements 面板中進行的樣式更改將自動保留；DOM 更改則不會。在 Sources 元素面板中保留元素更改。


## 將本地源文件添加到工作區

要將本地文件夾的源文件設置爲可以在 Sources 面板中修改，請執行以下操作：

1. 右鍵點擊左側面板。
2. 選擇 **Add Folder to Workspace**。
3. 選擇您想要映射的本地文件夾的位置。
4. 點擊 **Allow**，授予 Chrome 訪問該文件夾的權限。 

![將文件夾添加到工作區](imgs/addfolder.png)

通常，本地文件夾包含網站的原始源文件，用於在服務器上填充網站。如果您不希望通過工作區更改這些原始文件，請複製文件夾並將其指定爲工作區文件夾。

## 暫存保留的更改

您已將本地文件夾映射到工作區中，但瀏覽器仍在提供網絡文件夾內容。要將永久更改自動暫存到瀏覽器中，請將文件夾中的本地文件映射到網址：




1. 右鍵點擊或者在按住 Ctrl 的同時點擊 Sources 左側面板中的文件。
2. 選擇 **Map to File System Resource**。
3. 選擇永久工作區中的本地文件。
4. 在 Chrome 中重新加載頁面。

![將文件映射到網址](imgs/maptoresource.png)

之後，Chrome 會加載映射的網址，同時顯示工作區內容，而不是網絡內容。這樣，您可以直接在本地文件中操作，而不必在 Chrome 與外部編輯器之間重複切換。






## 限制

儘管工作區功能強大，您仍應當注意一些限制。

* 只有 Elements 面板中的樣式更改會保留；對 DOM 的更改不會保留。

* 僅可以保存在外部 CSS 文件中定義的樣式。對 `element.style` 或內嵌樣式的更改不會保留。（如果您有內嵌樣式，可以在 Sources 面板中對它們進行更改。）

* 如果您有映射到本地文件的 CSS 資源，在 Elements 面板中進行的樣式更改無需顯式保存即會立即保留 - <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> 或者 <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd> (Mac)。


* 如果您正在從遠程服務器（而不是本地服務器）映射文件，Chrome 會從遠程服務器重新加載頁面。您的更改仍將保存到磁盤，並且如果您在工作區中繼續編輯，這些更改將被重新應用。

* 您必須在瀏覽器中使用映射文件的完整路徑。要查看暫存版本，您的索引文件在網址中必須包含 .html。

## 本地文件管理

除了修改現有文件外，您還可以在爲工作區使用的本地映射目錄中添加和刪除文件。



### 添加文件

要添加文件，請執行以下操作：

1. 右鍵點擊 Sources 左側窗格中的文件夾。
2. 選擇 **New File**。
3. 爲新文件鍵入一個包含擴展名的名稱（例如 `newscripts.js`）並按 **Enter**；文件將添加到本地文件夾中。

### 刪除文件

要刪除文件，請執行以下操作：

1. 右鍵點擊 Sources 左側窗格中的文件。
2. 選擇 **Delete** 並點擊 **Yes** 確認。

### 備份文件

對文件進行重大更改前，複製原始文件進行備份非常有用。


要複製文件，請進行以下操作：

1. 右鍵點擊 Sources 左側窗格中的文件。
2. 選擇 **Make a Copy...**。
3. 爲文件鍵入一個包含擴展名的名稱（例如 `mystyles-org.css`）並按 **Enter**。

### 刷新

直接在工作區中創建或刪除文件時，Sources 目錄將自動刷新以顯示文件更改。要隨時強制刷新，請右鍵點擊文件夾並選擇 **Refresh**。



如果您在外部編輯器中更改當前正在打開的文件，並且希望更改顯示在 DevTools 中，刷新操作也非常有用。DevTools 通常可以自動捕捉此類更改，但是如果您希望確保萬無一失，只需按上文所述刷新文件夾。

### 搜索文件或文本

要在 DevTools 中搜索已加載的文件，請按 <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> 或者 <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> (Mac) 打開搜索對話框。您仍然可以在工作區中進行此操作，不過，搜索範圍將擴展到 Workspace 文件夾中的遠程已加載文件和本地文件。






要在多個文件中搜索某個字符串，請執行以下操作：

1. 打開搜索窗口：點擊 **Show Drawer** 按鈕 ![Show Drawer](imgs/show_drawer_button.png){:.inline} ，然後點擊 **Search**；或者按 <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">F</kbd> 或 <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">F</kbd> (Mac)。
2. 將字符串鍵入搜索字段並按 **Enter**。
3. 如果字符串是一個正則表達式或者需要不區分大小寫，請點擊相應的框。


![跨文件搜索字符串](imgs/searchacross.png)

搜索結果將顯示在 Console 抽屜中並按文件名列示，同時指示匹配數量。使用**展開** ![展開](imgs/expand_button.png){:.inline}和**摺疊** ![摺疊](imgs/collapse_button.png){:.inline}箭頭可以展開或摺疊給定文件的結果。



{# wf_devsite_translation #}
