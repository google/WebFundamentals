project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:通過每次執行一個代碼行或一個函數，您可以觀察數據和頁面中的變化，準確瞭解正在發生什麼。

{# wf_updated_on: 2015-09-01 #}
{# wf_published_on: 2015-04-13 #}

# 如何單步調試代碼 {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

通過每次執行一個代碼行或一個函數，您可以觀察數據和頁面中的變化，準確瞭解正在發生什麼。您還可以修改腳本使用的數據值，您甚至可以修改腳本本身。

*爲什麼此變量值是 20 而不是 30？爲什麼該代碼行看上去沒什麼效果？爲什麼此標誌在應爲 false 的時候成爲 true？* 每個開發者都面臨這些問題，逐步執行代碼可瞭解問題所在。

[設置斷點](add-breakpoints)後，返回此頁面，並正常地使用它，直到達到某個斷點。這將暫停頁面上的所有 JavaScript，焦點轉向“DevTools Sources”面板，並突出顯示斷點。現在，您可以有選擇性地執行代碼並逐步檢查其數據。


### TL;DR {: .hide-from-toc }
- 逐步執行代碼以便在問題發生之前或發生時觀察問題，並通過實時編輯測試更改。
- 最好越過控制檯記錄，因爲記錄的數據在到達控制檯時已過時。
- 啓用“Async call stack”功能以提高異步函數調用堆棧的可視性。
- 將腳本設爲黑箱以使第三方代碼不出現在調用堆棧中。
- 使用已命名的函數而不是匿名函數，以提高調用堆棧可讀性。


## 步驟的操作

所有步驟選項均通過邊欄中的可點擊圖標![斷點按鈕欄](imgs/image_7.png){:.inline}表示，但也可以通過快捷鍵觸發。下面是簡要介紹：

<table>
  <thead>
    <tr>
      <th data-th="Icon/Button">圖標/按鈕</th>
      <th data-th="Action">操作</th>
      <th data-th="Description">描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="Resume" class="inline"></td>
      <td data-th="Action">Resume</td>
      <td data-th="Description">繼續執行直到下一個斷點。如果沒有遇到斷點，則繼續正常執行。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Long Resume" class="inline"></td>
      <td data-th="Action">Long Resume</td>
      <td data-th="Description">繼續執行，將斷點停用 500 毫秒。便於暫時跳過斷點，否則會持續暫停執行代碼，例如，循環內的斷點。<p><b>點擊並按住 <i>Resume</i>，直到展開以顯示操作。</b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Step Over" class="inline"></td>
      <td data-th="Action">Step Over</td>
      <td data-th="Description">不管下一行發生什麼都會執行，並跳轉到下一行。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Step Into" class="inline"></td>
      <td data-th="Action">Step Into</td>
      <td data-th="Description">如果下一行包含一個函數調用，<i>Step Into</i> 將跳轉並在其第一行暫停該函數。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Step Out" class="inline"></td>
      <td data-th="Action">Step Out</td>
      <td data-th="Description">函數調用後，執行當前函數剩餘部分，然後在下一個語句暫停。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Deactivate breakpoints" class="inline"></td>
      <td data-th="Action">Deactivate breakpoints</td>
      <td data-th="Description">暫時停用所有斷點。用於繼續完整執行，不會真正移除斷點。再次點擊以重新激活斷點。</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pause on exceptions" class="inline"></td>
      <td data-th="Action">Pause on exceptions</td>
      <td data-th="Description">在發生異常時，自動暫停執行代碼。</td>
    </tr>
  </tbody>
</table>

使用 **step into** 作爲典型的“一次一行”操作，因爲它確保只有一個語句被執行，無論您進入或離開哪些函數。

當您懷疑未捕獲的異常正在引發問題，但不知道異常在哪裏時，使用 [Pause on exceptions](add-breakpoints#break-on-uncaught-exception)。啓用此選項後，您可以通過點擊 **Pause On Caught Exceptions** 複選框優化它；在此情況下，僅當發生需要特別處理的異常時執行纔會暫停。

## 按作用域查看屬性 {: #scope }

當您暫停腳本時，**Scope** 窗格會顯示在該時刻當前已定義的所有屬性。


在以下屏幕截圖中，此窗格用藍色突出顯示。

![Sources 面板的 Scope 窗格](imgs/scope-pane.png)

Scope 窗格只有在腳本暫停時纔會填充信息。頁面運行時，Scope 窗格不含任何信息。


Scope 窗格顯示在 local、closure 和 global 級別定義的屬性。


如果某個屬性旁有“Carat”圖標，這意味着此屬性指代一個對象。點擊“Carat”圖標可展開對象並查看其屬性。


有時這些屬性的顯示會變暗。例如，在以下屏幕截圖中，屬性 `function Object() { [native code] }` 比 `confirm` 屬性暗淡。


![顯示暗淡的屬性](imgs/enumerables.png)

深顏色屬性可以計數。淺顏色、顯示暗淡的屬性則不可計數。
如需瞭解詳細信息，請參閱以下 Stack Overflow 主題：[Chrome 開發者工具 Scope 面板中的顏色有何含義？](Chrome 開發者工具 Scope 面板中的顏色有何含義？)



## 調用堆棧

在靠近邊欄頂部的位置是 **Call Stack** 部分。在斷點處代碼暫停時，調用堆棧以倒序形式顯示將代碼帶到該斷點的執行路徑。這不但有助於瞭解執行*現在*所在位置，還有助於瞭解代碼的執行路徑，這是進行調試的一個重要因素。

### 示例

<img src="imgs/image_15.png" alt="Call stack" class="attempt-left">

`index.html` 文件中位於第 50 行的一個初始 onclick 事件調用了位於 `dgjs.js` JavaScript 文件第 18 行的 `setone()` 函數，後者接着調用了位於同一文件第 4 行的 `setall()` 函數，執行在當前斷點處暫停。




<div class="clearfix"></div>

### 啓用異步調用堆棧

啓用異步調用堆棧功能可提高執行異步函數調用的透明度。


1. 打開 DevTools 的 **Sources** 面板。
2. 在 **Call Stack** 窗格上，啓用 **Async** 複選框。

以下視頻包含一個展示異步調用堆棧功能的簡單腳本。
在此腳本中，第三方庫用於選擇一個 DOM 元素。
一個名爲 `onClick` 的函數被註冊爲此元素的 `onclick` 事件處理程序。
無論何時調用 `onClick`，它都會循序調用一個名爲 `f` 的函數，該函數通過 `debugger` 關鍵字強制腳本暫停。

 

<video src="animations/async-call-stack-demo.mp4"
       autoplay muted loop controls></video>

在此視頻中，觸發了一個斷點並展開了調用堆棧。堆棧中只有一個調用：`f`。
然後，啓用異步調用堆棧功能，腳本繼續執行，並再次觸發斷點和展開調用堆棧。此時，調用堆棧包含 `f` 之前的所有調用，包括第三方內容庫調用和 `onClick` 調用。首次調用該腳本時，調用堆棧中只有一個調用。
第二次調用腳本時，有四個調用。簡言之，異步調用堆棧功能可提高完整的異步函數調用堆棧的可視性。



### 提示：給函數命名以提高調用堆棧可讀性

匿名函數使調用堆棧很難閱讀。爲函數命名以提高可讀性。


以下兩個屏幕截圖中的代碼段功能效果相同：代碼功能並不重要，重要的是第一個屏幕截圖中的代碼使用匿名函數，而第二個屏幕截圖中的代碼使用已命名的函數。




在第一個屏幕截圖的調用堆棧中，前兩個函數均標明 `(anonymous function)`。
在第二個屏幕截圖中，前兩個函數已命名，從而讓您更容易瞭解程序流的大致情況。在處理大量的腳本文件（包括第三方內容庫和框架）時，您的調用堆棧爲五個或者十個調用深，在函數已命名後，理解調用堆棧流要容易得多。




含匿名函數的調用堆棧：

![包含可讀性低匿名函數的調用堆棧](imgs/anon.png)

含已命名函數的調用堆棧： 

![包含可讀性更高已命名函數的調用堆棧](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

### 將第三方代碼設置爲黑箱

將腳本文件設置爲黑箱以忽略來自調用棧的第三方文件。

設置爲黑箱之前：

![設置爲黑箱之前的調用堆棧](imgs/before-blackbox.png)

設置爲黑箱之後：

![設置爲黑箱之後的調用堆棧](imgs/after-blackbox.png)

如需將文件設置爲黑箱：

1. 打開 DevTools Settings。

   ![打開 DevTools 設置](imgs/open-settings.png)

2. 在左側的導航菜單中，點擊 **Blackboxing**。

   ![Chrome DevTools 中的 Blackboxing 面板](imgs/blackbox-panel.png)

3. 點擊 **Add pattern**。

4. 在 **Pattern** 文本字段中，輸入您想要從調用堆棧排除的文件名模式。
DevTools 將排除與該模式匹配的任意腳本。
 

   ![添加黑箱模式](imgs/add-pattern.png)

5. 在文本字段右側的下拉菜單中，選擇 **Blackbox** 以執行腳本文件，但從調用堆棧排除調用，或選擇 **Disabled** 以阻止執行文件。



6. 點擊 **Add** 保存。

下次運行此頁面並觸發斷點時，DevTools 將使函數調用不出現在來自調用堆棧的已設置爲黑箱的腳本中。


## 數據操作

代碼執行暫停時，您可以觀察和修改其正在處理的數據。這對於嘗試追蹤一個看上去有錯誤值的變量或沒有如期收到的傳遞參數很關鍵。

通過點擊 **Show/Hide drawer** 顯示 Console 抽屜![顯示/隱藏抽屜](imgs/image_16.png){: .inline}或按 <kbd class="kbd">ESC</kbd>.在執行步驟時打開控制檯，您現在可以：

* 輸入變量的名稱以在當前函數範圍中查看其當前值
* 輸入一個 JavaScript 分配語句以更改此值

嘗試修改值，然後繼續執行以查看它如何改變您的代碼的結果，以及它是否如期運行。

#### 示例

<img src="imgs/image_17.png" alt="Console Drawer" class="attempt-left">

我們發現參數 `dow` 的值當前爲 2，但在繼續執行前將其手動更改爲 3。


<div class="clearfix"></div>

## 實時編輯

觀察並暫停執行代碼有助於您查找錯誤，而實時編輯讓您可以快速預覽更改，無需重新加載。

如需實時編輯腳本，只需在執行步驟時點擊“Sources”面板的編輯器部分。在編輯器中進行所需的更改，然後按 <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">S</kbd>（或在 Mac 上按 <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">S</kbd>）提交此更改。此時，整個 JS 文件將作爲補丁程序進入 VM，並且所有函數定義都將更新。 

現在，您可以繼續執行；已修改的腳本將替代原始腳本執行，並且您可以觀察您的更改效果。

#### 示例

![實時編輯](imgs/image_18.png)

我們懷疑參數 `dow` 在被傳遞到函數 `setone()` 時，在任何情況下都會增加 1，也就是說，收到的值 `dow<` 在應爲 0 時卻爲 1，在應爲 1 時卻爲 2，等等。爲了快速測試遞減的傳遞值是否確認這是一個問題，我們在函數的開頭添加第 17 行，並按 <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> 鍵提交併繼續。




## 管理線程執行 {: #threads }

使用 Sources 面板上的 **Threads** 窗格可暫停、進入以及檢查其他線程，例如服務工作線程或網絡工作線程。


爲展示 Threads 窗格，此部分使用了以下演示：[網絡工作線程基本示例](http://mdn.github.io/simple-web-worker/)。


如果您打開應用上的 DevTools，就能發現 main 腳本位於 `main.js` 中：


![Main 腳本](imgs/main-script.png)

網絡 worker 腳本位於 `worker.js` 中：

![Worker 腳本](imgs/worker-script.png)

Main 腳本偵聽對 **Multiply number 1** 或 **Multiply number 2** 輸入字段做出的更改。
偵聽到更改時，main 腳本立即向網絡工作線程發送一則消息，內含這兩個需要相乘的數值。
網絡工作線程執行完乘法運算後將結果返回給 main 腳本。



假定您在 `main.js` 中設置了一個在第一個數字發生變化時觸發的斷點：


![Main 腳本斷點](imgs/main-script-breakpoint.png)

並且您還在 `worker.js` 中設置了一個在工作線程收到消息時觸發的斷點：


![Worker 腳本斷點](imgs/worker-script-breakpoint.png)

在此應用的 UI 觸發這兩個斷點時修改第一個數字。

![觸發的 main 和 worker 腳本斷點](imgs/breakpoints-triggered.png)

在 Threads 窗格中，藍色箭頭指示的是當前選定的線程。
例如，在上面的屏幕截圖中，選定的是 **Main** 線程。 

DevTools 所有用於單步調試代碼（繼續或暫停腳本執行、單步執行下一函數調用、進入並單步執行下一函數調用等）的控件都與該線程有關。換言之，如果您在 DevTools 顯示類似以上屏幕截圖的內容時按 **Resume script execution** 按鈕，Main 線程會繼續執行，但網絡工作線程仍將暫停。**Call Stack** 和 **Scope** 部分同樣只顯示 Main 線程的信息。


如果您想爲網絡工作線程單步調試代碼，或查看其作用域和調用堆棧信息，只需在 Threads 窗格中點擊其標籤，使其旁邊出現藍色箭頭。以下屏幕截圖顯示的是選擇工作線程後調用堆棧和作用域信息的變化情況。同樣，如果您要按任何一個單步調試代碼按鈕（繼續執行腳本、單步執行下一函數調用等），該操作將只與工作線程有關。Main 線程不受影響。

![獲得焦點的工作線程](imgs/worker-thread.png)


{# wf_devsite_translation #}
