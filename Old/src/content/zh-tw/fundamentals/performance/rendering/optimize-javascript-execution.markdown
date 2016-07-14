---
title: "最佳化 JavaScript 執行"
description: "JavaScript 往往是視覺變更的觸發器。 有時是直接透過樣式操作，有時是計算造成視覺變更，例如搜尋或排序一些資料。 時機不對或長時間執行的 JavaScript 可能是常見的效能問題導因，您應該儘量減少它的影響。"
updated_on: 2015-03-20
notes:
  jit:
    - 如果您真的想要看到作用中的 JIT，應該要看看<a href="http://mrale.ph/irhydra/2/">IRHydra<sup>2</sup> by Vyacheslav Egorov</a>。 這會顯示當 Chrome 的 JavaScript 引擎 V8 正在將之最佳化時的 JavaScript 程式碼之中繼狀態。

key-takeaways:
  - 針對視覺更新避免 setTimeout 或 setInterval；一律改為使用 requestAnimationFrame。
  - 將長時間執行的 JavaScript 從主執行緒移動至 Web Worker。
  - 使用微任務，以讓 DOM 在多個畫面內變更。
  - 使用 Chrome DevTools 的 Timeline 和 JavaScript Profiler，以評估 JavaScript 的影響。

---
<p class="intro">
  JavaScript 往往是視覺變更的觸發器。 有時是直接透過樣式操作，有時是計算造成視覺變更，例如搜尋或排序一些資料。 時機不對或長時間執行的 JavaScript 可能是常見的效能問題導因，您應該儘量減少它的影響。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

JavaScript 效能分析可能稱得上是一門藝術，因為您撰寫的 JavaScript 程式碼一點也不像實際執行的程式碼。 最新的瀏覽器使用 JIT 編譯器和各式各樣的最佳化和技巧，以試圖給您儘可能最快的執行速度，這大幅變更了程式碼的動力。

{% include shared/remember.liquid title="Note" list=page.notes.jit %}

不過話雖如此，您還是可以做一些努力，以協助您的應用程式成功執行 JavaScript。

## 針對視覺變更，請使用 RequestAnimationFrame

當視覺變更在螢幕上發生時，您會想在正確時機為瀏覽器執行自己的工作，這也正是畫面開始之際。 要保證 JavaScript 會在畫面開始之時執行的唯一方法是使用 `requestAnimationFrame`。

{% highlight javascript %}
/**
 * If run as a requestAnimationFrame callback, this
 * will be run at the start of the frame.
 */
function updateScreen(time) {
  // Make visual updates here.
}

requestAnimationFrame(updateScreen);
{% endhighlight %}

架構或範例可以像動畫一樣，使用 `setTimeout` 或 `setInterval` 做視覺變更，但這種方式的問題在於，回呼會在畫面的 _某一點_ 執行，可能就在結束之時，如此往往造成我們遺漏一個畫面的效果，從而導致閃避現象。

<img src="images/optimize-javascript-execution/settimeout.jpg" class="g--centered" alt="setTimeout 導致瀏覽器遺漏一個畫面。">

事實上，時下 jQuery 的預設 `animate` 行為是使用 `setTimeout`！您可以 [修補它以使用 `requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame)，強烈建議使用者採用。

## 降低複雜性或使用 Web Worker

JavaScript 是在瀏覽器的主執行緒上運作，就連同樣式計算、版面配置，以及在許多情況下與繪製一起運作。 如果您的 JavaScript 長時間執行，它將封鎖這些其他任務，有可能導致畫面遺漏。

關於 JavaScript 的執行時機和持續時間，您應該按戰略計劃安排。 例如，如果您處於如捲動的動畫中，您應該最好要設法將您的 JavaScript 維持在 **3-4ms** 之間。 比這個數字長的時間，您就可能會佔用太多時間。 如果您處於閒置期，對於所佔用的時間，您可以更寬鬆一些。

在許多情況下，只要 Web Worker 不需要 DOM 存取時，您就可以將純運算工作移轉給 [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage)。 像排序或搜尋等資料操作或穿越動作，常常正好適合這種模式，也適合載入和模型產生。

{% highlight javascript %}
var dataSortWorker = new Worker("sort-worker.js");
dataSortWorker.postMesssage(dataToSort);

// The main thread is now free to continue working on other things...

dataSortWorker.addEventListener('message', function(evt) {
   var sortedData = e.data;
   // Update data on screen...
});

{% endhighlight %}

並非所有的工作都可以適用這種模式：Web Worker 並無 DOM 存取能力。 當您的工作必須在主執行緒上運作時，請考慮批次方案：將較大的任務分割成微任務，每個微任務僅需幾 ms 的時間，同時是跨每個畫面在 `requestAnimationFrame` 處理常式內執行。

{% highlight javascript %}
var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
requestAnimationFrame(processTaskList);

function processTaskList(taskStartTime) {
  var taskFinishTime;

  do {
    // Assume the next task is pushed onto a stack.
    var nextTask = taskList.pop();

    // Process nextTask.
    processTask(nextTask);

    // Go again if there’s enough time to do the next task.
    taskFinishTime = window.performance.now();
  } while (taskFinishTime - taskStartTime < 3);

  if (taskList.length > 0)
    requestAnimationFrame(processTaskList);

}
{% endhighlight %}

這種方法會伴隨 UX 和 UI 後果，您將需要確定使用者知道一項任務正在處理中，此時可[使用進度或活動指示器](http://www.google.com/design/spec/components/progress-activity.html)。 任一情況下，這種方法將讓您的應用程式的主執行緒保持空閒，協助它對使用者互動保持高回應性。

## 知曉您 JavaScript 的「畫面負擔」

當評估架構、程式庫或您自己的程式碼時，以個別畫面為基礎，評估執行 JavaScript 程式碼的成本。 在做轉換或捲動等效能關鍵的動畫工作時，這一點尤其重要。

測量您 JavaScript 成本和效能設定檔的最佳方法，是使用 Chrome DevTools。 基本上，您將取得看起來像以下的低詳細資料記錄：

<img src="images/optimize-javascript-execution/low-js-detail.jpg" class="g--centered" alt="Chrome DevTools 的 Timeline 提供低 JS 執行詳細資料。">

如果您發現您有長時間執行的 JavaScript，您可以啟用 DevTools 使用者介面頂部的 JavaScript 分析工具：

啟用 DevTools 中的 JS 分析工具。"><img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" class="g--centered" alt="

以這種方式分析 JavaScript 會帶有額外負荷，所以當您想要更深入瞭解 JavaScript 執行期特性時，要確定只啟用此功能。 啟用核取方塊之後，您現在可以執行相同的行為，對於您 JavaScript 呼叫了哪些功能，您會得到多出許多的相關資訊：

<img src="images/optimize-javascript-execution/high-js-detail.jpg" class="g--centered" alt="Chrome DevTools 的 Timeline 提供高 JS 執行詳細資料。">

持有這項資訊，您可以評估 JavaScript 對您的應用程式的效能影響，並開始尋找並修復功能執行所需時間太長的任何熱點。 正如之前所述，您應設法刪除長時間執行的 JavaScript，若不可能的話，就將之移動到 Web Worker ，騰出主執行緒去執行其它任務。

## 避免微最佳化您的 JavaScript

瀏覽器可以執行一個項目的一種版本會比其他事快 100 倍，例如要求與元素的 `offsetTop` 比計算 `getBoundingClientRect()` 快，這當然很好。但事實是每個畫面中，您只會呼叫這類功能幾次，所以著重在 JavaScript 效能的這一方面，通常是浪費精力。 一般情況下，您只會節省 ms 的九牛一毛。

如果您在製作遊戲或高運算成本的的應用程式，那麼就是上述的例外情況，因為在這種情況下，您通常會在單一畫面中納入許多運算，此時所有考量都有幫助。

簡而言之，因為微最佳化通常不會對應至您正在打造的應用程式種類，因此對於微最佳化要非常謹慎。


