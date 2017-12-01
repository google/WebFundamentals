project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:用戶希望頁面可以交互並且非常流暢。像素管道的每個階段均可能出現卡頓現象。瞭解用於確定和解決會降低運行時性能的常見問題的工具和策略。

{# wf_updated_on:2016-03-15 #}
{# wf_published_on:2015-04-13 #}

# 分析運行時性能 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

用戶希望頁面可以交互並且非常流暢。像素管道的每個階段均可能出現卡頓現象。
瞭解用於確定和解決會降低運行時性能的常見問題的工具和策略。




### TL;DR {: .hide-from-toc }
- 不要編寫會強制瀏覽器重新計算佈局的 JavaScript。將讀取和寫入功能分開，並首先執行讀取。
- 不要使您的 CSS 過於複雜。減少使用 CSS 並保持 CSS 選擇器簡潔。
- 儘可能地避免佈局。選擇根本不會觸發佈局的 CSS。
- 繪製比任何其他渲染活動花費的時間都要多。請留意繪製瓶頸。


## JavaScript 

JavaScript 計算，特別是會觸發大量視覺變化的計算會降低應用性能。
不要讓時機不當或長時間運行的 JavaScript 影響用戶交互。


### 工具

進行 **Timeline** [記錄][recording]，並找出疑似較長的 **Evaluate Script** 事件。
如果您發現存在任何這樣的事件，可以啓用 [JS 分析器][profiler]並重新做記錄，以便獲取究竟調用了哪些 JS 函數以及調用每個函數需要多長時間的更詳細信息。




如果您注意到 JavaScript 中出現較多的卡頓現象，您可能需要進一步分析並收集 JavaScript CPU 配置文件。CPU 配置文件會顯示執行時間花費在頁面的哪些函數上。在[加快 JavaScript 執行速度][cpu]中瞭解如何創建 CPU 配置文件。




[profiler]: ../evaluate-performance/timeline-tool#profile-js
[cpu]: js-execution

### 問題

下表對一些常見 JavaScript 問題和潛在解決方案進行了說明：

<table>
  <thead>
      <th>問題</th>
      <th>示例</th>
      <th>解決方案</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">大開銷輸入處理程序影響響應或動畫。</td>
      <td data-th="Example">觸摸、視差滾動。</td>
      <td data-th="Solution">讓瀏覽器儘可能晚地處理觸摸和滾動，或者綁定偵聽器（請參閱 <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Paul Lewis 運行時性能檢查單中的大開銷輸入處理程序</a>）。</td>
    </tr>
    <tr>
      <td data-th="Problem">時機不當的 JavaScript 影響響應、動畫、加載。</td>
      <td data-th="Example">頁面加載後用戶向右滾動、setTimeout/setInterval。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">優化 JavaScript 執行</a>：使用 <code>requestAnimationFrame</code>、使 DOM 操作遍佈各個幀、使用網絡工作線程。
    </tr>
    <tr>
      <td data-th="Problem">長時間運行的 JavaScript 影響響應。</td>
      <td data-th="Example"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded 事件</a>由於 JS 工作過多而停止。</td>
      <td data-th="Solution">將純粹的計算工作轉移到<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">網絡工作線程</a>。如果您需要 DOM 訪問權限，請使用  <code>requestAnimationFrame</code>（另請參閱<a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">優化 JavaScript 執行</a>）。</td>
    </tr>
    <tr>
      <td data-th="Problem">會產生垃圾的腳本影響響應或動畫。</td>
      <td data-th="Example">任何地方都可能發生垃圾回收。</td>
      <td data-th="Solution">減少編寫會產生垃圾的腳本（請參閱 <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Paul Lewis 運行時性能檢查單中的動畫垃圾回收</a>）。</td>
    </tr>
  </tbody>
</table>

## 樣式 

樣式更改開銷較大，在這些更改會影響 DOM 中的多個元素時更是如此。
只要您將樣式應用到元素，瀏覽器就必須確定對所有相關元素的影響、重新計算佈局並重新繪製。



相關指南：

* [縮小樣式計算的範圍並降低其複雜性](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)


### 工具

進行 **Timeline** [記錄][recording]。檢查大型 **Recalculate Style** 事件的記錄（以紫色顯示）。


點擊 **Recalculate Style** 事件可以在 **Details** 窗格中查看更多相關信息。
如果樣式更改需要較長時間，對性能的影響會非常大。
如果樣式計算會影響大量元素，則需要改進另一個方面。


![長時間運行的重新計算樣式](imgs/recalculate-style.png)

要降低 **Recalculate Style** 事件的影響，請執行以下操作：

* 使用 [CSS 觸發器](https://csstriggers.com)瞭解哪些 CSS 屬性會觸發佈局、繪製與合成。
這些屬性對渲染性能的影響最大。

* 請轉換到影響較小的屬性。請參閱[堅持僅合成器屬性和管理層計數][compositor]，尋求更多指導。


[compositor]: /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count

### 問題

下表對一些常見樣式問題和潛在解決方案進行了說明：


<table>
  <thead>
      <th>問題</th>
      <th>示例</th>
      <th>解決方案</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">大開銷樣式計算影響響應或動畫。</td>
      <td data-th="Example">任何會更改元素幾何形狀的 CSS 屬性，如寬度、高度或位置；瀏覽器必須檢查所有其他元素並重做佈局。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">避免會觸發佈局的 CSS。</a></td>
    </tr>
    <tr>
      <td data-th="Problem">複雜的選擇器影響響應或動畫。</td>
      <td data-th="Example">嵌套選擇器強制瀏覽器瞭解與所有其他元素有關的全部內容，包括父級和子級。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">在 CSS 中引用只有一個類的元素。</a></td>
    </tr>
  </tbody>
</table>

相關指南：

* [縮小樣式計算的範圍並降低其複雜性](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)


## 佈局 

佈局（或 Firefox 中的自動重排）是瀏覽器用來計算頁面上所有元素的位置和大小的過程。
網頁的佈局模式意味着一個元素可能影響其他元素；例如 `<body>` 元素的寬度一般會影響其子元素的寬度以及樹中各處的節點，等等。這個過程對於瀏覽器來說可能很複雜。
一般的經驗法則是，如果在幀完成前從 DOM 請求返回幾何值，您將發現會出現“強制同步佈局”，在頻繁地重複或針對較大的 DOM 樹執行操作時這會成爲性能的大瓶頸。


 

相關指南：

* [避免佈局抖動](/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [診斷強制同步佈局](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)



### 工具

Chrome DevTools 的 **Timeline** 可以確定頁面何時會導致強制同步佈局。
這些 **Layout** 事件使用紅色豎線標記。 

![強制同步佈局](imgs/forced-synchronous-layout.png)

“佈局抖動”是指反覆出現強制同步佈局情況。
這種情況會在 JavaScript 從 DOM 反覆地寫入和讀取時出現，將會強制瀏覽器反覆重新計算佈局。
要確定佈局抖動，請找到多個強制同步佈局警告（如上方屏幕截圖所示）的模式。



### 問題

下表對一些常見佈局問題和潛在解決方案進行了說明：


<table>
  <thead>
      <th>問題</th>
      <th>示例</th>
      <th>解決方案</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">強制同步佈局影響響應或動畫。</td>
      <td data-th="Example">強制瀏覽器在像素管道中過早執行佈局，導致在渲染流程中重複步驟。</td>
      <td data-th="Solution">先批處理您的樣式讀取，然後處理任何寫入（另請參閱<a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">避免大型、複雜的佈局和佈局抖動</a>）。</td>
    </tr>
  </tbody>
    <tr>
      <td data-th="Problem">佈局抖動影響響應或動畫。</td>
      <td data-th="Example">形成一個使瀏覽器進入讀取-寫入-讀取寫入週期的循環，強制瀏覽器反覆地重新計算佈局。</td>
      <td data-th="Solution">使用 <a href="https://github.com/wilsonpage/fastdom">FastDom 內容庫</a>自動批處理讀取-寫入操作。</td>
    </tr>
  </tbody>
</table>

## 繪製與合成 

繪製是填充像素的過程。這經常是渲染流程開銷最大的部分。
如果您在任何情況下注意到頁面出現卡頓現象，很有可能存在繪製問題。


合成是將頁面的已繪製部分放在一起以在屏幕上顯示的過程。
大多數情況下，如果堅持僅合成器屬性並避免一起繪製，您會看到性能會有極大的改進，但是您需要留意過多的層計數（另請參閱[堅持僅合成器屬性和管理層計數](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)）。




### 工具

想要了解繪製花費多久或多久繪製一次？請在 **Timeline** 面板上啓用 [Paint profiler][paint]，然後[進行記錄][recording]。

如果您的大部分渲染時間花費在繪製上，即表示存在繪製問題。
 

![Timeline 記錄中的長時間繪製](imgs/long-paint.png)

請查看 [**rendering settings**][rendering settings] 菜單，進一步瞭解可以幫助診斷繪製問題的配置。
 

### 問題

下表對一些常見繪製與合成問題及潛在解決方案進行了說明：

<table>
  <thead>
      <th>問題</th>
      <th>示例</th>
      <th>解決方案</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">繪製風暴影響響應或動畫。</td>
      <td data-th="Example">較大的繪製區域或大開銷繪製影響響應或動畫。</td>
      <td data-th="Solution">避免繪製、提升將要移動到自有層的元素，使用變形和不透明度（請參閱<a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">降低繪製的複雜性並減少繪製區域</a>）。</td>
    </tr>
        <tr>
      <td data-th="Problem">層數激增影響動畫。</td>
      <td data-th="Example">使用 translateZ(0) 過度提升過多的元素會嚴重影響動畫性能。</td>
      <td data-th="Solution">請謹慎提升到層，並且僅在您瞭解這樣會有切實改進時提升到層（請參閱<a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">堅持僅合成器屬性和管理層計數</a>）。</td>
    </tr>
  </tbody>
</table>


[recording]: ../evaluate-performance/timeline-tool#make-a-recording
[paint]: ../evaluate-performance/timeline-tool#profile-painting
[rendering settings]: ../evaluate-performance/timeline-tool#rendering-settings


{# wf_devsite_translation #}
