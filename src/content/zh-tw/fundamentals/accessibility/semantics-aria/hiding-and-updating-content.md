project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:向輔助技術隱藏內容


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 隱藏和更新內容 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## aria-hidden

優化輔助技術用戶體驗的另一個重要技巧涉及確保只向輔助技術公開相關的頁面部分。可通過幾種方法確保不將 DOM 的某個部分向無障礙 API 公開。


首先，任何向 DOM 顯式隱藏的內容同樣不會包含在無障礙樹中。
因此，任何 CSS 樣式爲 `visibility: hidden` 或 `display: none` 或者使用 HTML5 `hidden` 屬性的內容同樣會向輔助技術用戶隱藏。



不過，未進行視覺渲染但未做顯式隱藏的元素仍包含在無障礙樹中。
一種常見的技巧是，在絕對位置位於屏幕之外的元素中加入“屏幕閱讀器專用文本”。



    .sr-only {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    

此外，正如我們所見，通過 `aria-label`、`aria-labelledby` 或 `aria-describedby` 屬性引用原本隱藏的元素來提供屏幕閱讀器專用文本是可行的。



如需瞭解有關創建“屏幕閱讀器專用”文本的詳細信息，請參閱這篇有關[文本隱藏技巧](http://webaim.org/techniques/css/invisiblecontent/#techniques){: .external }的 WebAIM 文章。



最後，ARIA 提供了一種利用 `aria-hidden` 屬性將非視覺隱藏內容排除在輔助技術訪問範圍之外的機制。如果對元素應用該屬性，實際上是將元素*及其所有子項*從無障礙樹中移除。只有 `aria-labelledby` 或 `aria-describedby` 屬性引用的元素例外。


    <div class="deck">
      <div class="slide" aria-hidden="true">
        Sales Targets
      </div>
      <div class="slide">
        Quarterly Sales
      </div>
      <div class="slide" aria-hidden="true">
        Action Items
      </div>
    </div>

例如，如果您要創建某個模態 UI 來阻止對主頁面的訪問，可以使用 `aria-hidden`。
在此情況下，視力正常用戶可以看到某種半透明疊層，這表示頁面的大部分內容當前無法使用，但屏幕閱讀器用戶仍可探索頁面的其他部分。在此情況下以及創建鍵盤陷阱（[前文有說明](/web/fundamentals/accessibility/focus/using-tabindex#modals-and-keyboard-traps)）的情況下，您需要確保那些當前超出範圍的頁面部分同樣處於 `aria-hidden` 狀態。




現在您已瞭解 ARIA 的基礎知識、它與原生 HTML 語義的協作方式、如何利用它對無障礙樹執行相當重大的修改以及如何更改單個元素的語義，讓我們看看如何利用它來傳遞有時效性要求的信息。




## aria-live

`aria-live` 允許開發者將某個頁面部分標記爲“活動”，其意義在於，無論處在什麼頁面位置，都應立即向用戶傳達更新，而不是在用戶恰好探索該頁面部分時再行傳達。當元素具有 `aria-live` 屬性時，包含它及其子項的頁面部分稱作*活動區域*。



![ARIA live 建立一個活動區域](imgs/aria-live.jpg)

例如，活動區域可以是因用戶操作而出現的狀態消息。
如果消息的重要性足以吸引視力正常用戶的注意，也就足以吸引輔助技術用戶的注意（通過設置其 `aria-live` 屬性）。

將這個簡單 `div`


    <div class="status">Your message has been sent.</div>
    

與其“活動”版本進行比較：


    <div class="status" aria-live="polite">Your message has been sent.</div>
    

`aria-live` 有三個允許值：`polite`、`assertive` 和 `off`。

 - `aria-live="polite"` 指示輔助技術在完成其當前執行的任何操作後提醒用戶這一變化。
它非常適合在事情重要但並不緊急時使用，`aria-live` 大多作此用途。
 - `aria-live="assertive"` 指示輔助技術中斷其正在執行的操作，立即提醒用戶這一變化。
這僅適用於重要並且緊急的更新，例如“您的更改因服務器出錯而未予保存；請刷新頁面”這樣的狀態消息，或者因用戶操作（如按步進器小部件上的按鈕）而直接引發的輸入字段更新。
 - `aria-live="off"` 指示輔助技術暫停 `aria-live` 中斷。


可以運用一些技巧來確保活動區域工作正常。

首先，您的 `aria-live` 區域多半應在初始頁面加載時進行設置。這並非定規，但如果您在某個 `aria-live` 區域遇到困難，可能就是這個問題所致。



其次，不同的屏幕閱讀器對不同類型變化的反應有所差異。
例如，可通過將子元素的 `hidden` 樣式從 true 切換爲 false，在某些屏幕閱讀器上觸發提醒。


其他兼容 `aria-live` 的屬性可以幫助您優化活動區域發生變化時傳達給用戶的信息。


`aria-atomic` 表示傳達更新時是否應將整個區域作爲一個整體加以考慮。
例如，如果某個包括日、月和年的日期小部件具有 `aria-live=true` 和 `aria-atomic=true`，並且用戶使用的步進器控件只能更改月份值，則會再次讀出日期小部件的完整內容。`aria-atomic` 的值可以是 `true` 或 `false`（默認值）。





`aria-relevant` 表示應向用戶提供哪些類型的更改。有一些選項可以單獨使用，或以令牌列表形式使用。


 - *additions*，表示任何添加到活動區域的元素都是重要內容。
例如，向現有狀態消息日誌追加 span 意味着將把該 span 告知用戶（假定 `aria-atomic` 爲 `false`）。
 - *text*，表示添加到任何子節點的文本內容都是重要內容。
例如，如果修改自定義文本字段的 `textContent` 屬性，將向用戶讀出修改後的文本。
 - *removals*，表示應將移除任何文本或子節點的情況傳達給用戶。
 - *all*，意味着所有更改都是重要更改。不過，`aria-relevant` 的默認值是 `additions text`，這表示如果您不指定 `aria-relevant`，它會將對元素的任何添加動態告知用戶，而這很可能是您最想獲得的信息。




最後，`aria-busy` 允許您通知輔助技術它應暫時忽略對元素的更改（例如在加載內容時）。
一切就位後，`aria-busy` 應設置爲 false，以使閱讀器的工作正常化。


 


{# wf_devsite_translation #}
