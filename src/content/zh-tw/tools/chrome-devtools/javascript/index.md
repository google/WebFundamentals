project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:在本交互式教程中使用 Chrome DevTools 調試 JavaScript 入門。

{# wf_updated_on:2017-01-04 #}
{# wf_published_on:2017-01-04 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

<!-- TODO
     make demo responsive
-->

# 在 Chrome DevTools 中調試 JavaScript 入門 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

本交互式教程循序漸進地教您在 Chrome DevTools 中調試 JavaScript 的基本工作流程。
雖然教程介紹的是如何調試一種具體問題，但您學到的一般工作流程對調試各種類型的 JavaScript 錯誤均有幫助。



如果您使用 `console.log()` 來查找和修正代碼中的錯誤，可以考慮改用本教程介紹的工作流程。
其速度快得多，也更有效。


## 第 1 步：重現錯誤 {: #step-1 }

重現錯誤始終是調試的第一步。“重現錯誤”是指找到一系列總是能導致錯誤出現的操作。

您可能需要多次重現錯誤，因此要儘量避免任何多餘的步驟。


請按照以下說明重現您要在本教程中修正的錯誤。


1. 點擊 **Open Demo**。演示頁面在新標籤中打開。

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Open Demo</button>
     </a>

1. 在演示頁面上，輸入 `5` 作爲 **Number 1**。
1. 輸入 `1` 作爲 **Number 2**。
1. 點擊 **Add Number 1 and Number 2**。
1. 查看輸入和按鈕下方的標籤。上面顯示的是 `5 + 1 = 51`。

啊嗚。這個結果是錯誤的。正確結果應爲 `6`。這就是您要修正的錯誤。


## 第 2 步：使用斷點暫停代碼

DevTools 讓您可以暫停執行中的代碼，並對暫停時刻的*所有*變量值進行檢查。
用於暫停代碼的工具稱爲**斷點**。
立即試一試：

1. 按 <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>（Windows、Linux）在演示頁面上打開 DevTools。

1. 點擊 **Sources** 標籤。

<!-- TODO add a screenshot.Don't create the screenshot until demo design is
     finished.Add it here rather than previous screenshot in case Sources
     is hidden -->

1. 點擊 **Event Listener Breakpoints** 將該部分展開。DevTools 顯示一個包含 **Animation** 和 **Clipboard** 等可展開事件類別的列表。



<!-- TODO or maybe add it here -->

1. 在 **Mouse** 事件類別旁，點擊 **Expand** ![Expand 圖標](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline}。DevTools 顯示一個包含 **click** 等 Mouse 事件的列表，事件旁有相應的複選框。
1. 選中 **click** 複選框。

     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="DevTools 在演示頁面上打開，Sources 面板獲得焦點，click 事件偵聽器斷點處於啓用狀態。"
       <figcaption>
         <b>圖 1</b>：DevTools 在演示頁面上打開，Sources 面板獲得焦點，click 事件偵聽器斷點處於啓用狀態。
         如果 DevTools 窗口較大，則 <b>Event Listener Breakpoints</b> 窗格位於右側，而不是像屏幕截圖中那樣位於左下方。</figcaption>
     </figure>

1. 返回至演示頁面，再次點擊 **Add Number 1 and Number 2**。DevTools 暫停演示並在 **Sources** 面板中突出顯示一行代碼。
   DevTools 突出顯示的是下面這行代碼：

       `function onClick() {`

當您選中 **click** 複選框時，就是在所有 `click` 事件上設置了一個基於事件的斷點。
點擊了*任何*節點，並且該節點具有 `click` 處理程序時，DevTools 會自動暫停在該節點 `click` 處理程序的第一行。



注：這不過是 DevTools 提供的衆多斷點類型中的一種。應使用的斷點類型取決於您要調試的問題類型。


[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

## 第 3 步：單步調試代碼

一個常見的錯誤原因是腳本執行順序有誤。
可以通過單步調試代碼一次一行地檢查代碼執行情況，準確找到執行順序異常之處。立即試一試：

1. 在 DevTools 的 **Sources** 面板上，點擊 **Step into next function call** ![單步執行到下一個函數調用中][into]{:.devtools-inline}，一次一行地單步調試 `onClick()` 函數的執行。DevTools 突出顯示下面這行代碼：

       `if (inputsAreEmpty()) {` 

1. 點擊 **Step over next function call** ![單步執行時越過下一個函數調用][over]{:.devtools-inline}。
DevTools 執行 `inputsAreEmpty()` 但不進入它。
請注意 DevTools 是如何跳過幾行代碼的。
   這是因爲 `inputsAreEmpty()` 求值結果爲 false，所以 `if` 語句的代碼塊未執行。


這就是單步調試代碼的基本思路。如果您看一下 `get-started.js` 中的代碼，就能發現錯誤多半出在 `updateLabel()` 函數的某處。您可以不必單步調試每一行代碼，而是使用另一種斷點在靠近錯誤位置的地方暫停代碼。



[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## 第 4 步：設置另一個斷點

代碼行斷點是最常見的斷點類型。如果您想在執行到某一行代碼時暫停，請使用代碼行斷點。立即試一試：

1. 看一下 `updateLabel()` 中的最後一行代碼，其內容類似於：

       `label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;`

1. 在這行代碼的左側，可以看到這行代碼的行號：
**32**。點擊 **32**。DevTools 會在 **32** 上放置一個藍色圖標。
這意味着這行代碼上有一個代碼行斷點。
   DevTools 現在總是會在執行這行代碼之前暫停。
1. 點擊 **Resume script execution** ![繼續執行腳本][resume]{:.devtools-inline}。
腳本繼續執行，直至到達您設置了斷點的代碼行。
1. 看一下 `updateLabel()` 中已執行的代碼行。

   DevTools 打印輸出 `addend1`、`addend2` 和 `sum` 的值。

`sum` 的值疑似有問題。其求值結果本應是數字，而實際結果卻是字符串。
這可能就是造成錯誤的原因。

## 第 5 步：檢查變量值

另一種常見的錯誤原因是，變量或函數產生的值異常。
許多開發者都利用 `console.log()` 來了解值隨時間變化的情況，但 `console.log()` 可能單調乏味而又效率低下，原因有兩個。
其一，您可能需要手動編輯大量調用 `console.log()` 的代碼。
其二，由於您不一定知曉究竟哪一個變量與錯誤有關，因此可能需要對許多變量進行記錄。


DevTools 爲 `console.log()` 提供的其中一個替代工具是監視表達式。可以使用監視表達式來監視變量值隨時間變化的情況。顧名思義，監視表達式的監視對象不僅限於變量。您可以將任何有效的 JavaScript 表達式存儲在監視表達式中。
立即試一試：

1. 在 DevTools 的 **Sources** 面板上，點擊 **Watch**。該部分隨即展開。
1. 點擊 **Add Expression** ![添加表達式][add]{:.devtools-inline}。
1. 鍵入 `typeof sum`。
1. 按 <kbd>Enter</kbd>。DevTools 顯示 `typeof sum: "string"`。冒號右側的值就是監視表達式的結果。


     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="“監視表達式”窗格。"
       <figcaption>
         <b>圖 1</b>：創建  <code>typeof sum</code> 監視表達式後的“監視表達式”窗格（右下方）。
         如果 DevTools 窗口較大，則“監視表達式”窗格位於右側，<b>Event Listener Breakpoints</b> 窗格的上方。</figcaption>
     </figure>

正如猜想的那樣，`sum` 的求值結果本應是數字，而實際結果卻是字符串。
這就是演示頁面錯誤的原因。

DevTools 爲 `console.log()` 提供的另一個替代工具是 Console。可以使用 Console 對任意 JavaScript 語句求值。開發者通常利用 Console 在調試時覆蓋變量值。在您所處的情況下，Console 可幫助您測試剛發現的錯誤的潛在解決方法。
立即試一試：

1. 如果您尚未打開 Console 抽屜，請按 <kbd>Escape</kbd> 將其打開。
它會在 DevTools 窗口底部打開。
1. 在 Console 中，鍵入 `parseInt(addend1) + parseInt(addend2)`。
1. 按 <kbd>Enter</kbd>。DevTools 對語句求值並打印輸出 `6`，即您預料演示頁面會產生的結果。


     <figure>
       <img src="imgs/get-started-console.png"
         alt="對一個語句求值後的 Console 抽屜。"
       <figcaption>
         <b>圖 1</b>：對  <code>parseInt(addend1) + parseInt(addend2)</code> 求值後的 Console 抽屜。</figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## 第 6 步：應用修正

您已找到錯誤的潛在解決方法。剩下的工作就是編輯代碼後重新運行演示頁面來測試修正效果。
您不必離開 DevTools 就能應用修正。
您可以直接在 DevTools UI 內編輯 JavaScript 代碼。
立即試一試：

1. 在 DevTools 的 **Sources** 面板上的代碼編輯器中，將 `var sum = addend1 + addend2` 替換爲 `var sum = parseInt(addend1) + parseInt(addend2);`。它就是您當前暫停位置上面那行代碼。
1. 按 <kbd>Command</kbd>+<kbd>S</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>S</kbd>（Windows、Linux）保存更改。代碼的背景色變爲紅色，這表示在 DevTools 內更改了腳本。
1. 點擊 **Deactivate breakpoints** ![停用斷點][deactivate]{:.devtools-inline}。它變爲藍色，表示處於活動狀態。
如果進行了此設置，DevTools 會忽略您已設置的任何斷點。
1. 點擊 **Resume script execution** ![繼續執行腳本][resume]{:.devtools-inline}。
1. 使用不同的值測試演示頁面。現在演示頁面應能正確計算求和。


切記，此工作流程只對運行在瀏覽器中的代碼應用修正。
它不會爲所有運行您的頁面的用戶修正代碼。
要實現該目的，您需要修正運行在提供頁面的服務器上的代碼。


[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## 後續步驟

恭喜！現在您已掌握了在 DevTools 中調試 JavaScript 的基礎知識。

本教程只向您介紹了兩種設置斷點的方法。DevTools 還提供了許多其他方法，其中包括：


* 僅在滿足您指定的條件時觸發的條件斷點。
* 發生已捕獲或未捕獲異常時觸發的斷點。
* 當請求的網址與您提供的子字符串匹配時觸發的 XHR 斷點。


<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="add-breakpoints" target="_blank"
   rel="noopener noreferrer"><button>爲我演示所有斷點</button></a>

有幾個代碼單步執行控件在本教程中未予說明。
請點擊以下鏈接，瞭解有關它們的更多信息。

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="step-code#stepping_in_action" target="_blank"
   rel="noopener noreferrer"><button>我想要掌握代碼單步調試知識</button></a>

## 反饋

請通過回答下列問題幫助我們改進本教程。

{% framebox width="auto" height="auto" %}

<p>您是否已成功完成本教程？</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / Yes">支持</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / No">不支持</button>

<p>本教程是否包含您在尋找的信息？</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / Yes">支持</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / No">不支持</button>

<p>教程是否過長？</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / Yes">支持</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / No">不支持</button>

{% endframebox %}


{# wf_devsite_translation #}
