project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:此代碼實驗室將幫助您學習如何識別和解決網絡應用性能的瓶頸。

{# wf_updated_on: 2016-10-20 #}
{# wf_published_on: 2016-01-01 #}


# 發現並解決網絡應用性能的問題 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}




## 簡介




此代碼實驗室是關於應用/網頁性能的一個 Udacity 課程 ( [ud860](https://www.udacity.com/course/browser-rendering-optimization--ud860)) 的部分內容的文本版本。此代碼實驗室並非是視頻課程的腳本，它傾向於使用課程的原始實際最終項目處理卡頓識別和校正問題。


## 概覽




我們都遇到過應用在顯示動畫、滾動或其他用戶操作時不規則跳躍的情況。這種視覺的不一致性就是我們通常稱爲*卡頓*或*抖動*的性能問題，容易分散用戶的注意力，非常令人討厭；它會中斷用戶使用應用時的思路，並且會讓應用看起來缺乏美觀度和專業性。

如果瀏覽器創建和顯示某一幀所需的時間過長，則該幀會被跳過，根本不會顯示。取而代之的是，您將看到下一幀（或緊接其後的幀），因此對象跳過此間隙而非平滑移動。

通過確保應用運行的幀率始終保持在每秒 60 幀 (60fps)，可避免卡頓現象。有許多因素與應用的幀率有關，並且有多種 JavaScript 和 CSS 編碼方法可減輕或徹底消除卡頓，實現所期望的幀率。

此代碼實驗室旨在通過幫助您查找和修復導致卡頓的幀顯示瓶頸，改變您解決應用性能問題的方式。

### 在開始之前需瞭解的內容

*  *關鍵渲染路徑：*  您應瞭解渲染管道及 JavaScript 和 CSS 對其的影響。詳情請參見： [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](/web/fundamentals/performance/critical-rendering-path/) 和有關 [網站性能優化：關鍵渲染路徑](https://www.udacity.com/course/website-performance-optimization--ud884)__的 Udacity 課程。__
*  *幀和幀率：*  您應瞭解瀏覽器如何構建幀，以及爲何 60fps 的幀率對於顯示的流暢性至關重要。詳情請參見： [https://developers.google.com/web/fundamentals/performance/rendering/](/web/fundamentals/performance/rendering/) 和有關 [瀏覽器渲染優化：構建 60 FPS 網絡應用](https://www.udacity.com/course/browser-rendering-optimization--ud860)的課程。
*  *應用生命週期：*  您應瞭解運行應用的響應、動畫、閒置和加載部分，並能識別每個部分存在的機會大小。詳情請參見：[RAIL 性能模型](/web/fundamentals/performance/rail)
*  *Chrome DevTools：*  您應對 DevTools 有基本的瞭解，並知道如何用它們（尤其是 Timeline 工具）來分析網絡應用。詳情請參見：[分析運行時性能](/web/tools/chrome-devtools/rendering-tools/)。

### 在此代碼實驗室中您將學習的內容

* 如何識別導致顯示性能瓶頸的應用代碼
* 如何分析和修改代碼，以減少或徹底消除瓶頸

### 您的開發工作空間中需要的工具

* Google Chrome 瀏覽器、DevTools
* 實際項目的示例代碼（如下所示）

###  卡頓/抖動

下面我們通過 Jake Archibald 推出的“Jank Invaders”遊戲來了解卡頓。它旨在展示與幀率和性能有關的問題。下面是一個屏幕截圖。

![4a4d206daaf5693a.png](img/4a4d206daaf5693a.png)

在該遊戲中，有一些宇宙飛船在屏幕上移動。“好人”可順暢移動，“壞蛋”（間諜船）則動作卡頓。在順暢移動的宇宙飛船當中混入了十艘間諜船，您的任務是識別這些動作卡頓的間諜船，並通過快速點擊將其擊落。[這裏是遊戲的鏈接](http://jakearchibald.github.io/jank-invaders/)。去吧，玩得開心；完成任務後再回來。

很顯然，用戶會發現卡頓並理所當然地選擇性能更好的應用，對網絡應用同樣如此：糟糕的性能會毀掉一個好網站。此代碼實驗室可幫助您思考您項目的性能，並探索如何識別和修復常見問題。您將探尋滾動不暢、更新閃爍和動畫抖動等問題的原因，實現流暢平滑的 60fps 幀率目標。


## 項目應用




我們首先了解您將在此代碼實驗室中調試的這個應用。其外觀如下所示。

![36d93b5f28eb60c5.png](img/36d93b5f28eb60c5.png)

此網站使用 __Hacker News API__ 來顯示最新帖子及其積分。目前，該應用性能不佳，在移動設備上尤爲如此，但它的幀率沒有理由達不到 60fps。在本代碼實驗室結束時，您將掌握所需的技能、方法，最重要的是，掌握相關理念，能夠優化這個存在卡頓現象的應用，使其更具吸引力並更高效運行，爲用戶提供 60fps 體驗。

###  獲取項目代碼

首先，您應取得應用代碼的“優化前”和“優化後”版本。您可以克隆存儲區或直接下載 zip 文件。

* 存在性能瓶頸的原始應用位於 [GitHub 存儲區](http://github.com/udacity/news-aggregator)；此外，它也是一個[活動網站](http://udacity.github.io/news-aggregator/)，您可以直接查看其狀況。這是您將要使用的版本。
* 以下是 [GitHub 存儲區](https://github.com/udacity/news-aggregator/tree/solution)中無性能瓶頸的完整應用。可以使用該修正版本作爲參考。

###  運行原始應用

首先，獲取並運行存在卡頓現象的原始應用版本。在 Chrome 中，打開頂層文件夾（例如，news-aggregator-master）中的 __index.html__。嘗試對應用執行各種操作；您很快會發現，在主屏幕中滾動以及帖子內容的滑入/滑出操作存在不少明顯的性能問題，而它們卻是用戶的兩項主要交互操作。我們將重點關注這些主要問題，瞭解如何改善這一存在卡頓現象的應用的性能。


## 練習 1：列表滾動




在主屏幕中滾動時，您會發現帖子列表抖動。此外，您還會發現各帖子積分指示器（帶圓圈的數字）不僅會改變數值，還會改變顏色。本練習將發現問題所在，並決定如何解決。

讓我們使用時間線來看看在主屏幕中滾動時實際發生了什麼。開始記錄之前，請確保啓用 __JS Profile__ 複選框。開始新記錄，在列表中稍微向下滾動，然後停止記錄。 

在記錄的頂部，您會看到 FPS 指示器呈現綠色。您會看到綠條中偶爾出現了一些峯值，如以下屏幕截圖所示。綠條這麼低的事實表明屏幕的幀率未達到 60 FPS。

![2e40b3134f26b0fa.png](img/2e40b3134f26b0fa.png)

放大您的記錄，您會看到在滾動事件之後是函數調用（後面跟着大量單獨的佈局事件，每個事件都有紅色的警告三角形）。在下面的屏幕截圖中，佈局事件是幀圖底部非常小的紫色事件。這充分說明出現了*強制同步佈局*。

![d6fb17faaa99e6f.png](img/d6fb17faaa99e6f.png)

鼠標懸停以識別佈局事件，然後點擊此事件查看其詳細信息。 

![fce56d36285bc1fc.png](img/fce56d36285bc1fc.png)

查看佈局事件的詳細信息，您會發現強制同步佈局警告是由 app.js 中的 `colorizeAndScaleStories` 函數引發的。

![f58a21a56040ce6a.png](img/f58a21a56040ce6a.png)

讓我們看一看該函數。

```
function colorizeAndScaleStories() {

  var storyElements = document.querySelectorAll('.story');

  // It does seem awfully broad to change all the
  // colors every time!
  for (var s = 0; s < storyElements.length; s++) {

    var story = storyElements[s];
    var score = story.querySelector('.story__score');
    var title = story.querySelector('.story__title');

    // Base the scale on the y position of the score.
    var height = main.offsetHeight;
    var mainPosition = main.getBoundingClientRect();
    var scoreLocation = score.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    var scale = Math.min(1, 1 - (0.05 * ((scoreLocation - 170) / height)));
    var opacity = Math.min(1, 1 - (0.5 * ((scoreLocation - 170) / height)));

    score.style.width = (scale * 40) + 'px';
    score.style.height = (scale * 40) + 'px';
    score.style.lineHeight = (scale * 40) + 'px';

    // Now figure out how wide it is and use that to saturate it.
    scoreLocation = score.getBoundingClientRect();
    var saturation = (100 * ((scoreLocation.width - 38) / 2));

    score.style.backgroundColor = 'hsl(42, ' + saturation + '%, 50%)';
    title.style.opacity = opacity;
  }
}
```

注意，應用訪問了 `height`、`width` 和 `line-height`，它們都會導致佈局運行。另外還設置了透明度，在透明度更改時不會觸發佈局的運行，但這行代碼會應用新的樣式並觸發重新計算，因而也會觸發佈局的運行。函數主循環中使用的這兩種技術導致了強制同步問題的產生。 

接下來，我們看看帖子積分指示器的視覺效果，它沒有添加任何信息值。我們可以使用 CSS 屬性而不是 JavaScript 來實現這一效果，但還不如直接刪除該效果。結論：有時候最佳的代碼修復方法是刪除代碼。

讓我們移除 `colorizeAndScaleStories` 函數的調用。爲 app.js 中的第 88、89 和 305 行以及整個函數（第 255-286 行）添加註釋。不要刪除這些行，因爲我們稍後在此代碼實驗室中引用的函數將與應用不匹配。現在，帖子積分始終看起來一樣。

再次運行代碼並對滾動活動生成一個時間線記錄，然後放大顯示滾動事件。這一次您會看到滾動後面只有一個樣式重新計算，並且 FPS 條變高了。 

![5e9d66cb007f9076.png](img/5e9d66cb007f9076.png)

額外的佈局及其強制同步佈局警告均已消失，幀率也相當不錯。一個卡頓問題得到解決！


## 練習 2：帖子串聯




影響應用流暢性的另一個問題是向列表中添加帖子時出現滾動卡頓。請注意 `scroll` 事件偵聽器中對 `loadStoryBatch` 的調用。

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    loadStoryBatch();
});
```

此函數會通過加載頁面時向其插入新帖子更改頁面的視覺外觀，尤其是在使用 `appendChild` 追加 DOM 時。這個函數本身以及使用它的設計方法並沒有任何問題，我們來考慮它的調用方式。

`loadStoryBatch` 會盡量抓取內容；它會基於 `loadThreshold` 測試在任何需要的時候運行，不管頁面上正在運行的其他內容，也不管瀏覽器是否處於幀構建過程中。這是因爲 JavaScript 引擎在執行腳本時會不顧渲染管道。這種直接運行會導致性能問題，尤其是在向列表中添加更多帖子時。我們可以通過使用 *requestAnimationFrame* 解決這個問題。

理想情況下，可引起頁面產生視覺變化的任何操行爲都應在 requestAnimationFrame 調用內發生。讓我們來修改 `scroll` 事件偵聽器代碼。

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    requestAnimationFrame(loadStoryBatch);
});
```

這種簡單更改可以確保我們與動畫相關的腳本在管道過程中運行得較早，實現較小但很重要的性能提升。


## 練習 3：帖子滑入/滑出（第 1 部分）




我們的新聞聚合應用的另一個問題是帖子內容的滑入和滑出。它是除了滾動列表外應用最常見的一項用戶交互。

和以往一樣，首先在時間線中記錄一段帖子內容的滑入和滑出，然後檢查幀率。滑入/滑出操作在有些設備上可能有些許卡頓，而在另一些設備上則可能基本無法正常運行。請務必在移動設備上瀏覽[活動網站](http://udacity.github.io/news-aggregator/)，但其實它在所有平臺上均存在問題。

![59865afca1e508ef.png](img/59865afca1e508ef.png)

一般情況下，當您看到上面有紅色三角形的紫色事件時，會想要通過鼠標懸停在其上查看詳細信息來進行調查。現在，您對觸發計時器後出現的強制同步佈局感興趣。 

![1bd8f7700f55a6c4.png](img/1bd8f7700f55a6c4.png)

滑入/滑出動畫觸發計時器，就會出現強制同步佈局。詳細信息指向 app.js 文件中的第 180 行一個稱爲 `animate` 的函數。讓我們看一看該函數。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        setTimeout(animate, 4);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

您首先可以看到的是將下次調用設置爲 `animate` 的 `setTimeout`。如在上一練習中所學，對頁面執行的可見工作通常應位於 `requestAnimationFrame` 調用內部。但這一 `setTimeout` 卻導致問題發生。

這裏解決問題的一個顯而易見的簡單方法，就是將每個 `animate` 調用都放到 `requestAnimationFrame` 內部，從而強制其在幀序列的開始處執行。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

如果再執行一次時間線記錄，您會發現性能有中等或較大提高，具體依設備而定。

獎勵問題：想一想，帖子滑入/滑出時會發生什麼。我們只是讓帖子在頁面上顯示或消失，以展示或隱藏相關內容。這是一種簡單的過渡過程，我們是否需要 JavaScript 來實現，或者說能否僅使用 CSS 來處理呢？我們會在練習 5 中再次細探這一問題。


## 練習 4：內存浪費




動畫卡頓並非網絡應用和頁面性能不佳的唯一原因。另一個罪魁禍首是內存使用低效，您可能已經想到，我們的新聞聚合應用在這方面同樣問題不少。

當用戶點擊了主列表中的一條帖子標題時，應用將構建帖子內容，將其添加到頁面並滑入視圖。其中，“將其添加到頁面”這一部分需要深究。通常，處理貼子點擊的函數稱爲 `onStoryClick`。我們看一下它的情況如何。

```
function onStoryClick(details) {

  var storyDetails = $('sd-' + details.id);

  // Wait a little time then show the story details.
  setTimeout(showStory.bind(this, details.id), 60);

  // Create and append the story. A visual change...
  // perhaps that should be in a requestAnimationFrame?
  // And maybe, since they're all the same, I don't
  // need to make a new element every single time? I mean,
  // it inflates the DOM and I can only see one at once.
  if (!storyDetails) {

    if (details.url)
      details.urlobj = new URL(details.url);

    var comment;
    var commentsElement;
    var storyHeader;
    var storyContent;

    var storyDetailsHtml = storyDetailsTemplate(details);
    var kids = details.kids;
    var commentHtml = storyDetailsCommentTemplate({
      by: '', text: 'Loading comment...'
    });

    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);

    commentsElement = storyDetails.querySelector('.js-comments');
    storyHeader = storyDetails.querySelector('.js-header');
    storyContent = storyDetails.querySelector('.js-content');

    var closeButton = storyDetails.querySelector('.js-close');
    closeButton.addEventListener('click', hideStory.bind(this, details.id));

    var headerHeight = storyHeader.getBoundingClientRect().height;
    storyContent.style.paddingTop = headerHeight + 'px';

    if (typeof kids === 'undefined')
      return;

    for (var k = 0; k < kids.length; k++) {

      comment = document.createElement('aside');
      comment.setAttribute('id', 'sdc-' + kids[k]);
      comment.classList.add('story-details__comment');
      comment.innerHTML = commentHtml;
      commentsElement.appendChild(comment);

      // Update the comment with the live data.
      APP.Data.getStoryComment(kids[k], function(commentDetails) {

        commentDetails.time *= 1000;

        var comment = commentsElement.querySelector(
            '#sdc-' + commentDetails.id);
        comment.innerHTML = storyDetailsCommentTemplate(
            commentDetails,
            localeData);
      });
    }
  }
}
```

在聲明瞭第一組變量後，請注意構造變量 `storyDetails` 的四行語句，它們分別設置了元素類型、屬性和內容。在此之後，您可能注意到 `storyDetails` 作爲新的節點通過 `appendChild` 方法已添加到 DOM。

首先，這不一定有問題，但隨着應用的使用，會引起越來越嚴重的浪費問題。當然，用戶一次僅瀏覽一條帖子，但爲每個已瀏覽的帖子創建的新節點卻從未捨棄。在數次點擊之後，DOM 將佈滿廢棄的節點，它們佔據大量內存並拖慢應用運行速度 -- 應用使用的時間越久，性能下降得越厲害。

解決這一問題的更好方法是在腳本中提前創建一個用於存放當前帖子內容的永久性 `storyDetails` 節點，然後每次打開帖子時使用可信任的 `innerHTML` 屬性重置其內容，而不是每次都創建一個新節點。換句話說，您應簡化以下代碼： 

```
    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);
```

改爲：

```
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.innerHTML = storyDetailsHtml;
```

這一變更無疑能夠提高長期性能，但短期內沒有什麼好處。 

我們仍然需要解決帖子內容滑入/滑入的問題。


## 練習 5：帖子滑入/滑出（第 2 部分）




到目前爲止，您不僅改善了應用的整體性能，還解決了一些具體的性能問題，例如列表滾動等。但是，在運行改善後的應用時，您會發現帖子內容的滑入/滑出方面仍然存在一些問題，而它是另一項主要的用戶交互。

讓我們仔細研究一下該過程。在時間線中，打開 JavaScript 性能分析器並啓動時間線記錄以下操作：單擊一個帖子標題以便讓其滑入，然後點擊帖子的 X 按鈕將其滑出。如同練習 3 中那樣，`onStoryClick` 函數（仍然）導致強制同步佈局。

![33ba193a24cb7303.png](img/33ba193a24cb7303.png)

在此練習中，我們將 `animate` 函數調用置於 `requestAnimationFrame` 中，這雖然能起一定作用，但並未完全解決問題。 

通過前面的討論（以及您對 [CSS 觸發器](http://csstriggers.com/)的瞭解），可以知道某些屬性的使用會觸發渲染管道某些部分的執行。讓我們再次仔細看看 `animate`。

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

在函數將近結尾處設置了 `left` 屬性；這會導致瀏覽器運行佈局。稍後又設置了 `style` 屬性；這導致瀏覽器重新計算樣式。您知道，如果這多次發生在同一幀中，便會導致強制同步佈局。在此函數中多次發生此情況。 

`animate` 函數位於`showStory` 函數及其姊妹函數 `hideStory` 當中，後兩者更新同一屬性並導致強制同步佈局問題。

我們在此代碼實驗室的前面部分中已經瞭解到，有時候最佳的代碼修復方法是刪除代碼。`showStory` 和 `hideStory` 函數各司其職，但對於實現一個簡單的效果而言過於複雜。所以，我們暫時捨棄它們，看看能否通過 CSS 來達到想要的效果。請看以下 CSS 代碼：

```
.story-details {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 2;
  box-shadow:
      0px 2px 7px 0px rgba(0, 0, 0, 0.10);

  overflow: hidden;
  transition: transform 0.3s;
  will-change: transform;
}

.story-details.visible {
  transform: translateX(-100vw);
}

.story-details.hidden {
  transform: translateX(0);
}
```

首先要注意的是，在 `.story-details` 類中，我們將 `left` 屬性設爲 100%；無論屏幕寬度爲何，這都會將整個帖子內容元素完全推到可見頁面右側以外，從而有效隱藏此元素。 

其次，在 `.story-details.visible` 和 `.story-details.hidden` 類中，我們各設置了一個 `transform` 元素，分別將 X（水平）位置強制設置爲 -100vw（*視口寬度*）和 0。在應用運行時，這些類會將帖子內容重新置於視圖中，或置於屏幕外的原始位置。

然後，爲確保帖子產生類似於動畫的效果而不是突兀地進入或退出屏幕，我們對 `transform` 設置一個 `transition`，爲其提供 0.3 秒（33 毫秒）的發生時間。這樣即確保實現平滑的滑入/滑出視覺效果。

最後，我們使用 `will-change` 屬性來告知瀏覽器 `transform` 可能會發生變化。

返回到 `showStory` 和 `hideStory` 函數，我們現在可以大幅簡化這兩個函數，只需通過添加或移除新的 `visible` 和 `hidden` 類，即可實現所需的視覺變更，無需進行復雜的腳本編程。

```
function showStory(id) {
  if (!storyDetails)
    return;

  storyDetails.classList.add('visible');
  storyDetails.classList.remove('hidden');
}

function hideStory(id) {
  storyDetails.classList.add('hidden');
  storyDetails.classList.remove('visible');
}
```

通過上述操作，我們應用中帖子內容的滑入/滑出操作性能會有很大的改善。當然，要想知道實際效果如何，還需進行測試。對帖子的滑入和滑出執行另一段時間線記錄，然後仔細看看。

![5543cf34c10a914b.png](img/5543cf34c10a914b.png)

應用的性能應有很大改善；圖表中的所有幀率遠低於 60fps 線，同時強制同步佈局警告都已消失。最棒的是，我們不再需要使用 JavaScript 來執行滑入/滑出動畫。 

我們的基本性能改善工作已經完成。


## 恭喜！




如果您已遵照說明和解釋，並且已對原始項目代碼作出了建議的修改，現在您的應用即可以 60fps 幀率流暢運行，而無任何動畫卡頓現象。

### 我們涵蓋了哪些內容？

在本代碼實驗室中，我們涵蓋了：

* 先決條件知識：關鍵渲染路徑、幀和幀率、應用生命週期以及 Chrome DevTools
* 卡頓概述：卡頓的概念、出現原因以及如何直觀地識別卡頓現象
* 項目應用：項目應用的功能，項目應用無法達到流暢動畫效果的原因以及如何發現和解決問題

### 有哪些結論？

本代碼實驗室主要結論：

* 屏幕動畫卡頓可能是因爲設計問題和編碼問題引起。
* 感覺到卡頓或沒有卡頓是用戶決定是否使用應用的一個重要因素。
* 速度上的微小調整可大大提升應用的長期整體性能。

### 後續操作

我們建議您查看位於 [GitHub 存儲區](https://github.com/udacity/news-aggregator/tree/solution)的完整項目代碼。您會發現其中包含了更多已改進的代碼，由於時間原因，本代碼實驗室未能全部涵蓋。比較此應用“更新之前”的版本和“更新之後“的版本，找出編碼的不同之處，看作者爲提升應用的性能還作出了哪些其他改進。

### 謝謝！

感謝您瀏覽本代碼實驗室。我們將始終致力於作出改進，如果您發現錯誤問題或有任何建議、問題或意見，請通過以下反饋鏈接聯繫我們。樂享編碼！




{# wf_devsite_translation #}
