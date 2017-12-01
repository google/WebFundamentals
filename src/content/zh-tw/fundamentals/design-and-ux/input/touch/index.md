project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:從手機到桌面設備的屏幕，使用觸摸屏的設備越來越多。應用應該以直觀而又優雅的方式響應觸摸動作。

{# wf_updated_on: 2014-01-06 #}
{# wf_published_on: 2014-01-01 #}

# 爲網站添加觸摸功能 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Rwc4fHUnGuU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

從手機到桌面設備的屏幕，使用觸摸屏的設備越來越多。
當用戶選擇與應用的 UI 進行交互時，應用應該以直觀的方式響應其觸摸動作。


<div class="clearfix"></div>

## 響應元素狀態

您是否有過這樣的經歷：觸摸或點按網頁上的某個元素時懷疑網站是否真的檢測到了您的觸摸動作？


只需在用戶觸摸 UI 元素或與其進行交互時改變元素的顏色，用戶就能基本確認網站處於工作狀態。
這樣做不僅能減輕用戶的失望感，還能讓其覺得網站敏捷並且響應迅速。


DOM 元素可繼承下列任何狀態：default、focus、hover 和 active。
要在上述每一種狀態下改變 UI，我們需要對下列僞類 `:hover`、`:focus` 和 `:active` 應用樣式，如下所示：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="btnstates" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

![說明以不同顏色代表不同按鈕狀態的圖像](images/button-states.png)

在大多數移動瀏覽器上，系統會在用戶點按某個元素後對其應用 *hover* 和/或 *focus* 狀態。


請認真考慮所設置的樣式以及用戶完成觸摸後會看到的外觀。


注：定位標記和按鈕在不同瀏覽器中可能有不同的行爲，因此可以假定在某些情況下保持 **hover** 狀態，在其他情況下保持 **focus** 狀態。



### 禁止默認瀏覽器樣式

爲不同狀態添加樣式後，您會注意到大多數瀏覽器在響應用戶觸摸時實現的是其自己的樣式。
這主要是因爲當移動設備首次發佈時，許多網站還沒有適用於 `:active` 狀態的樣式設置。因此，許多瀏覽器添加了額外的突出顯示顏色或樣式來向用戶提供反饋。


大多數瀏覽器使用 `outline` CSS 屬性在某個元素獲得焦點時在其周圍顯示一個圓環。
可以使用以下代碼禁止該樣式：

    .btn:focus {
      outline: 0;

      // Add replacement focus styling here (i.e. border)
    }

Safari 和 Chrome 添加的點按突出顯示顏色可使用 `-webkit-tap-highlight-color` CSS 屬性阻止：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="webkit-specific" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

Windows Phone 上的 Internet Explorer 也有類似行爲，但可通過元標記禁止：


    <meta name="msapplication-tap-highlight" content="no">

Firefox 有兩個副作用需要處理。

`-moz-focus-inner` 僞類，它會在可觸摸元素上添加一個輪廓，可通過設置 `border: 0` 將輪廓移除。


在 Firefox 上使用 `<button>` 元素時，系統會對該元素應用漸變，可通過設置 `background-image: none` 移除該效果。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/states-example.html" region_tag="ff-specific" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/states-example.html){: target="_blank" .external }

注意：請僅在有對應 `:hover`、`:active` 和 `:focus` 的僞類時禁止上面提到的默認樣式！


### 停用用戶選擇

當您創建 UI 時，在某些情況下您可能希望用戶在與 UI 元素進行交互時禁止長按 UI 或將鼠標拖動到 UI 上時選擇文本的默認行爲。



可以通過 `user-select` CSS 屬性實現此目的，但要注意的是，如果用戶*需要*選擇元素中的文本，在內容上施加這種限制會令其**極其**惱怒。因此務必要小心謹慎地使用。




    user-select: none;

## 實現自定義手勢

如果您想到了一個網站自定義交互和手勢創意，需要牢記兩個主題：


1. 如何支持所有瀏覽器。
1. 如何保持較高的幀率。


在本文中，我們關注的正是這些主題，它們先是介紹成功登陸所有瀏覽器所需支持的 API，然後介紹如何高效地使用這些事件。



根據您希望手勢具有的功能，您可能希望用戶一次只與一個元素進行交互，*也*可能希望他們能同時與多個元素進行交互。



注意：別忘了，一些用戶需要鍵盤輸入，並且在觸摸屏設備上運行輔助技術的用戶可能因手勢被輔助技術攔截/使用而無法執行手勢。




在本文中，我們將研究兩個示例，它們都展示瞭如何支持所有瀏覽器，以及如何保持較高的幀率。


![文檔觸摸 GIF 演示](images/touch-document-level.gif){: .attempt-right }

第一個示例允許用戶與一個元素進行交互。在此情況下，您可能希望所有觸摸事件都提供給這一個元素，只要手勢最初始於元素本身。例如，將手指移動到可滑動元素之外仍可控制元素。


這很有用處，因爲它給用戶帶來了極大的靈活性，但會給用戶與 UI 的交互方式施加限制。


<div class="clearfix"></div>

![元素觸摸 GIF 演示](images/touch-element-level.gif){: .attempt-right }

不過，如果您希望用戶能夠同時與多個元素進行交互（利用多點觸控），則應僅限觸摸特定元素。



這對用戶而言更爲靈活，但會讓操縱 UI 的邏輯複雜化，應對用戶錯誤的彈性下降。


<div class="clearfix"></div>

### 添加事件偵聽器

在 Chrome（版本 55 及更高版本）、Internet Explorer 和 Edge 中，`PointerEvents` 是建議的自定義手勢實現方法。


在其他瀏覽器中，`TouchEvents` 和 `MouseEvents` 是正確的方法。

`PointerEvents` 的一大特色是，它將包括鼠標、觸摸和觸控筆事件在內的多種輸入類型合併成一個回調集。需要偵聽的事件是 `pointerdown`、`pointermove`、`pointerup` 和 `pointercancel`。


其他瀏覽器中的對應項是 `touchstart`、`touchmove`、`touchend` 和 `touchcancel` 觸摸事件，如果想爲鼠標輸入實現相同的手勢，則需實現 `mousedown`、`mousemove` 和 `mouseup`。




如果對需要使用的事件有疑問，可以看一看這個[觸摸、鼠標和指針事件](#touch-mouse-and-pointer-events)表。


使用這些事件需要對 DOM 元素調用 `addEventListener()` 方法，使用的參數爲事件名稱、回調函數和一個布爾值。布爾值決定是否應在其他元素有機會捕獲並解釋事件之前或之後捕獲事件。（`true` 表示想要先於其他元素捕獲事件。）





下面這個示例偵聽的是交互的開始。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="addlisteners" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

注：由於 API 採用了特殊設計，PointerEvents 只需單個 `pointerdown` 事件便可同時處理鼠標和觸摸事件。


#### 處理單元素交互

在上面這段簡短的代碼中，我們只添加了鼠標事件的開始事件偵聽器。
其原因是，只有當光標懸停在添加了事件偵聽器的元素*之上*時，纔會觸發鼠標事件。


當我們對 DOM 元素調用 `setPointerCapture` 時，TouchEvents 將在手勢開始後對其進行追蹤，無論觸摸發生在什麼位置；PointerEvents 將追蹤事件，無論觸摸發生在什麼位置。



對於鼠標移動和結束事件，我們在手勢開始方法*中*添加了事件偵聽器，並向文檔添加了偵聽器，這意味着它可以追蹤光標，直至手勢完成。



實現以上操作的步驟如下：

1. 添加所有 TouchEvent 和 PointerEvent 偵聽器。對於 MouseEvents，**只**添加開始事件。
1. 在開始手勢回調內，將鼠標移動和結束事件綁定到文檔。這樣便可接收所有鼠標事件，無論事件是否發生在原始元素上。
對於 PointerEvents，我們需要對原始元素調用 `setPointerCapture()` 來接收所有進一步的事件。然後處理手勢開始。
1. 處理移動事件。
1. 發生結束事件時，從文檔中移除鼠標移動和結束偵聽器並結束手勢。


以下代碼段中的 `handleGestureStart()` 方法向文檔添加了移動和結束事件：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

我們添加的結束回調是 `handleGestureEnd()`，當手勢完成時，這個回調會從文檔中移除移動和結束事件偵聽器並釋放指針捕獲，如下所示：



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-end-gesture" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-1.html){: target="_blank" .external }

<div class="attempt-left">  <p>通過按照這種模式向文檔添加移動事件，當用戶開始與某個元素進行交互並將手勢移動到該元素之外時，無論鼠標移動到頁面上的什麼位置，我們仍可收到鼠標移動事件，因爲收到的事件來自文檔。</p>





  <p>此圖顯示了手勢開始後我們向文檔添加移動和結束事件時觸摸事件的行爲。</p></div>



![在 `touchstart` 中將觸摸事件綁定到文檔的插圖](images/scroll-bottleneck.gif)


<div class="clearfix"></div>

### 高效響應觸摸動作

既然已經完成了對開始和結束事件的處理，我們可以實際響應觸摸事件了。


對於任何開始和移動事件，均可輕鬆地從事件中提取 `x` 和 `y`。


下例通過檢查 `targetTouches` 是否存在來檢查事件是否來自 `TouchEvent`。
如果存在，則從第一次觸摸提取 `clientX` 和 `clientY`。如果事件是 `PointerEvent` 或 `MouseEvent`，則直接從事件本身提取 `clientX` 和 `clientY`。




<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-2.html" region_tag="extract-xy" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/touch/touch-demo-2.html){: target="_blank" .external }

`TouchEvent` 有三個包含觸摸數據的列表：

* `touches`：屏幕上所有當前觸摸的列表，無論它們在什麼 DOM 元素之中。
* `targetTouches`：當前事件所綁定的 DOM 元素觸摸列表。
* `changedTouches`：因發生變化而導致事件觸發的觸摸列表。


在大多數情況下，`targetTouches` 便可滿足您的所有需求。（如需瞭解有關這些列表的詳細信息，請參閱[觸摸列表](#touch-lists)）。


#### 使用 requestAnimationFrame

由於事件回調是在主線程上觸發，因此我們需要在事件回調中運行儘可能少的代碼，從而保持較高的幀率和防止出現卡頓。



使用 `requestAnimationFrame()` 可以讓我們有機會在瀏覽器正想要繪製幀之前更新 UI，並且有助於減輕事件回調的工作負荷。



如果您不熟悉 `requestAnimationFrame()`，可以[在此處瞭解詳情](/web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes)。


一種典型的實現是，保存來自開始和移動事件的 `x` 和 `y` 座標，然後在移動事件回調內請求動畫幀。



在演示中，我們將初始觸摸位置存儲在 `handleGestureStart()` 中（查找 `initialTouchPos`）：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-start-gesture" adjust_indentation="auto" %}
</pre>

`handleGestureMove()` 方法先存儲其事件的位置，然後在必要時請求動畫幀，並以回調形式傳入 `onAnimFrame()` 函數：



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="handle-move" adjust_indentation="auto" %}
</pre>

`onAnimFrame` 值是一個函數，被調用時會改變我們的 UI，使其四處移動。
將此函數傳入 `requestAnimationFrame()` 的目的是指示瀏覽器在其即將更新頁面（即對頁面繪製任何更改）時調用該函數。



在 `handleGestureMove()` 回調中，我們首先檢查 `rafPending` 是否爲 false，這表示最後一個移動事件後 `requestAnimationFrame()` 是否調用過 `onAnimFrame()`。這意味着，在同一時間等待運行的 `requestAnimationFrame()` 只有一個。


執行 `onAnimFrame()` 回調時，我們在想要移動的任何元素上設置變換，然後將 `rafPending` 更新爲 `false`，從而讓下一個觸摸事件能夠請求新的動畫幀。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="on-anim-frame" adjust_indentation="auto" %}
</pre>

### 利用觸摸操作控制手勢

CSS 屬性 `touch-action` 用於控制元素的默認觸摸行爲。
我們的示例使用 `touch-action: none` 來防止瀏覽器在用戶觸摸時執行任何操作，從而攔截所有觸摸事件。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="touch-action-example" adjust_indentation="auto" %}
</pre>

使用 `touch-action: none` 的影響頗爲巨大，因爲它會阻止所有默認的瀏覽器行爲。
在許多情況下，採用下面其中一個解決方案是更好的選擇。


`touch-action` 可停用瀏覽器實現的手勢。例如，IE10 以上版本支持點按兩次執行縮放手勢。
將 touch-action 設置爲 `manipulation` 可以阻止點按兩次的默認行爲。



這樣您就可以自行實現點按兩次手勢。

下面列出了常用的 touch-action 值：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">觸摸操作參數</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>touch-action: none</code></td>
      <td data-th="Description">瀏覽器將不處理觸摸交互。
</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pinch-zoom</code></td>
      <td data-th="Description">像  `touch-action: none` 一樣停用所有瀏覽器交互（
 `pinch-zoom` 除外，該交互仍由瀏覽器處理。
 </td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: pan-y pinch-zoom</code></td>
      <td data-th="Description">處理 JavaScript 中的水平滾動，而
不停用垂直滾動或雙指張合縮放（例如圖像輪播）。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>touch-action: manipulation</code></td>
      <td data-th="Description">停用點按兩次手勢，可避免瀏覽器的任何點按延遲。
將滾動和雙指張合縮放交由瀏覽器處理。</td>
    </tr>
  </tbody>
</table>


## 支持較舊版本 IE

如果想支持 IE10，需要處理加有供應商前綴的 `PointerEvents` 版本。



要檢查對 `PointerEvents` 的支持情況，一般需要查找 `window.PointerEvent`，但在 IE10 中，則要查找 `window.navigator.msPointerEnabled`。



帶供應商前綴的事件名稱如下：'MSPointerDown'、'MSPointerUp' 和 'MSPointerMove'。


下例展示的是如何檢查支持情況和切換事件名稱。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/touch/_code/touch-demo-1.html" region_tag="pointereventsupport" adjust_indentation="auto" %}
</pre>

如需瞭解詳細信息，可以看看這篇[來自 Microsoft 的更新文章](https://msdn.microsoft.com/en-us/library/dn304886(v=vs.85).aspx)。


##  引用

### 對應不同觸摸狀態的僞類

<table>
  <thead>
    <tr>
      <th>類</th>
      <th>示例</th>
      <th>說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Class">:hover</td>
      <td data-th="Example"><img alt="處於按下狀態的按鈕" src="images/btn-hover-state.png"></td>
      <td data-th="Description">
        當光標放置於某個元素上面時進入該狀態。
        懸停時的 UI 變化有助於鼓勵用戶與元素進行交互。
      </td>
    </tr>
    <tr>
      <td data-th="Class">:focus</td>
      <td data-th="Example">
        <img alt="處於焦點狀態的按鈕
" src="images/btn-focus-state.png">
      </td>
      <td data-th="Description">
        當用戶按 Tab 在頁面上的各個元素間導航時進入該狀態。focus 狀態可讓用戶瞭解當前正在與其進行交互的是哪一個元素；還可讓用戶輕鬆地利用鍵盤瀏覽 UI。
      </td>
    </tr>
    <tr>
      <td data-th="Class">:active</td>
      <td data-th="Example">
        <img alt="處於按下狀態的按鈕" src="images/btn-pressed-state.png">
      </td>
      <td data-th="Description">
        當選定某個元素時（例如，當用戶正點擊或觸摸某個元素時）進入該狀態。
      </td>
    </tr>
  </tbody>
</table>



可以在這裏找到權威的觸摸事件參考資料：[w3 Touch Events](http://www.w3.org/TR/touch-events/)。


### 觸摸、鼠標和指針事件

這些事件是爲應用新增手勢的構建基塊：


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">觸摸、鼠標和指針事件</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event Names">
        <code>touchstart</code>,
        <code>mousedown</code>,
        <code>pointerdown</code>
      </td>
      <td data-th="Description">
        這是在手指第一次觸摸某個元素或用戶按住鼠標時調用的事件。
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchmove</code>,
        <code>mousemove</code>,
        <code>pointermove</code>
      </td>
      <td data-th="Description">
        這是用戶在屏幕上移動手指或使用鼠標拖動時調用的事件。
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchend</code>,
        <code>mouseup</code>,
        <code>pointerup</code>
      </td>
      <td data-th="Description">
       這是用戶將手指從屏幕上擡起或鬆開鼠標時調用的事件。
      </td>
    </tr>
    <tr>
      <td data-th="Event Names">
        <code>touchcancel</code>
        <code>pointercancel</code>
      </td>
      <td data-th="Description">
        這是瀏覽器取消觸摸手勢時調用的事件。例如，
        用戶觸摸某個網絡應用後切換標籤。
      </td>
    </tr>
  </tbody>
</table>

### 觸摸列表

每個觸摸事件都包括三個列表屬性：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">觸摸事件屬性</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>touches</code></td>
      <td data-th="Description">
        屏幕上的所有當前觸摸列表，無論正在觸摸的是哪些元素。
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>targetTouches</code></td>
      <td data-th="Description">
        在作爲當前事件目標的元素上開始的觸摸列表。
        例如，如果您綁定到 <code>&lt;button&gt;</code>，
       您將只獲取該按鈕上的當前觸摸。如果綁定到文檔，則可獲得文檔上的所有當前觸摸。
      </td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>changedTouches</code></td>
      <td data-th="Description">
        因發生更改而導致事件觸發的觸摸列表：
        <ul>
          <li>
            對於 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchstart">
            touchstart</a></code>
            事件 -- 隨當前事件剛剛激活的觸摸點列表。
          </li>
          <li>
            對於 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchmove">
            touchmove</a></code>
            事件 -- 最後一個事件後發生過移動的觸摸點列表。
          </li>
          <li>
            對於 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchend">
            touchend</a></code>
            和 <code>
            <a href="http://www.w3.org/TR/touch-events/#dfn-touchcancel">
            touchcancel</a></code>
            事件 -- 剛從表面上移除的觸摸點列表。
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### 在 iOS 上啓用 active 狀態支持

遺憾的是，iOS 上的 Safari 默認情況下不應用 *active* 狀態，要將它啓用，您需要向 *document body* 或每個元素添加一個 `touchstart` 事件偵聽器。



此操作應在 User Agent 測試之後進行，這樣它就只能運行在 iOS 設備上。

向 body 添加觸摸開始的優點是可以應用於 DOM 中的所有元素，但這可能會在滾動頁面時帶來性能問題。



    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
      }
    };


替代方案是向頁面中的所有可交互元素添加觸摸開始偵聽器，從而緩解部分性能問題。



    window.onload = function() {
      if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        var elements = document.querySelectorAll('button');
        var emptyFunction = function() {};
        for(var i = 0; i < elements.length; i++) {
          elements[i].addEventListener('touchstart', emptyFunction, false);
        }
      }
    };


{# wf_devsite_translation #}
