project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: How to review your site for accessibility issues.

{# wf_updated_on: 2017-07-24 #}
{# wf_published_on: 2017-03-12 #}

# 如何進行無障礙功能審查{：.page-title}

{% include "web/_shared/contributors/robdodson.html" %}

<div>
  <div class="video-wrapper">
    <iframe class="devsite-embedded-youtube-video" data-video-id="cOmehxAU_4s" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen="">
    </iframe>
  </div>
確定您的網站或應用程序是否有無障礙功能似乎是一項壓倒一切的任務。 如果您第一次接觸到無障礙環境，這個話題的廣度可能讓您想知道從哪裡開始 - 畢竟，致力於適應各種能力意味著需要考慮相應多樣化的問題。
</div>

在這篇文章中，我將把這些問題分解成邏輯的，循序漸進的過程，以審查現有網站的可訪問性。




## 從鍵盤開始


<img src="imgs/ic_keyboard_black_24px.svg" class="attempt-right" alt="" width="120">對於無法使用鼠標或不使用鼠標的用戶而言，鍵盤導航是他們在屏幕上顯示所有內容的主要方法。這些受眾包括運動障礙的用戶，如重複性壓力傷害（RSI）或癱瘓，以及屏幕閱讀器用戶。為了獲得良好的鍵盤輸入體驗，您需要有一個合理的Tab鍵順序和易於辨別的對焦風格。

### 關鍵點

- 從您的網站開始切換。元素的重點排列順序應該遵循DOM順序。如果您不確定哪些元素應該關注焦點，請參閱[焦點基礎知識](/web/fundamentals/accessibility/focus/)進行回顧。一般的經驗法則是，用戶可以與任何控制進行交互或提供輸入，旨在可以聚焦並顯示焦點指示符（例如聚焦環）。通常的做法是在不提供替代的情況下禁用焦點樣式，在CSS中使用`outline: none` ，但這是一種反模式。如果鍵盤用戶看不到所關注的內容，則他們無法與該頁面進行交互。如果您需要區分鼠標和鍵盤的造型風格，請考慮添加類似於[輸入內容](https://github.com/ten1seven/what-input)的庫。

- 自定義交互式控件應該旨在可以調整。如果您使用JavaScript將`<div>`轉換為花哨的下拉列表，它將不會自動插入到Tab鍵順序中。要使自定義控件可以聚焦，請給它一個`tabindex=”0”` 。

- 避免使用`tabindex` > 0進行控制。無論這些控件在DOM中的位置如何，這些控件都會以Tab鍵順序跳過其他所有內容。這可能會讓屏幕閱讀器用戶感到困惑，因為他們傾向於以線性方式瀏覽DOM。

- 非交互式內容（例如標題）應該避免被聚焦。有時開發人員會在標題中添加`tabindex` ，因為他們認為它們很重要。這也是一種反模式，因為它使鍵盤用戶看到屏幕效率降低。對於屏幕閱讀器用戶，屏幕閱讀器將已經公佈這些標題，因此不需要使它們可以聚焦。

- 如果新內容添加到頁面中，請嘗試確保用戶的注意力集中在該內容上，以便他們可以對其進行操作。有關示例，請參閱[在頁面級別管理焦點](/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_at_the_page_level) 。

- 謹防在任何時候完全陷害焦點。注意自動完成小部件，其中鍵盤焦點可能會卡住。如果用戶不希望用戶與頁面的其他部分進行交互，焦點可能會暫時陷入特定的情況下，例如顯示模式，但您的目標應該是提供一種逃脫模式的鍵盤訪問方法。一個例子參見[Modals和鍵盤陷阱](/web/fundamentals/accessibility/focus/using-tabindex#modals_and_keyboard_traps)指南。

### 僅僅因為某些東西是可以聚焦的並不意味著它是可用的

如果您已經構建了自定義控件，那麼只需使用鍵盤即可讓用戶能夠實現其*全部*功能。有關改進鍵盤訪問的技巧，請參閱[管理組件中的焦點](/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_in_components) 。

### 不要忘記屏幕外的內容

許多網站的屏幕內容都存在於DOM中，但不可見，例如，響應式抽屜菜單中的鏈接或尚未顯示的模式窗口中的按鈕。將這些元素留在DOM中可能會導致令人困惑的鍵盤輸入體驗，特別是對於屏幕閱讀器而言，它將宣布屏幕外的內容，就好像它是頁面的一部分。請參閱[處理屏外內容](/web/fundamentals/accessibility/focus/dom-order-matters#offscreen_content)以獲取有關如何處理這些元素的提示。

## 用屏幕閱讀器試一試

<img src="imgs/ic_speaker_notes_black_24px.svg" class="attempt-right" alt="" width="100">

改進通用鍵盤支持為下一步奠定了一些基礎，即檢查頁面是否有適當的標籤和語義以及屏幕閱讀器導航的任何障礙。如果您不熟悉輔助技術如何解釋語義標記，請參閱“ [簡介”以](/web/fundamentals/accessibility/semantics-builtin/)了解更新。

### 關鍵點

- 檢查所有圖像以獲取正確的`alt`文字。這種做法的例外是圖像主要用於演示目的，而不是必不可少的內容。為了表示應該通過屏幕閱讀器跳過圖像，請將`alt`屬性的值設置為空字符串，例如`alt=””` 。

- 檢查標籤的所有控件。對於自定義控件，這可能需要使用`aria-label`或`aria-labelledby` 。有關示例，請參閱[ARIA標籤和關係](/web/fundamentals/accessibility/semantics-aria/aria-labels-and-relationships) 。

- 檢查所有自定義控件的適當`role`以及賦予其狀態的所有必需的ARIA屬性。例如，自定義復選框需要一個`role=”checkbox”`和`aria-checked=”true|false”`才能正確傳達其狀態。有關[ARIA](/web/fundamentals/accessibility/semantics-aria/)如何為自定義控件提供缺少語義的一般概述，請參閱[ARIA簡介](/web/fundamentals/accessibility/semantics-aria/) 。

- 信息流應該是有道理的。由於屏幕閱讀器以DOM順序瀏覽頁面，如果您已使用CSS以可視化方式重新定位元素，則可能會以無意義的順序發布它們。如果您需要在頁面的較早部分出現，請嘗試在DOM中更早地物理移動它。

- 旨在支持屏幕閱讀器導航到頁面上的所有內容。避免讓網站的任何部分永久隱藏或屏蔽閱讀器訪問。

- 如果內容*應該*從屏幕閱讀器中隱藏，例如，如果內容不在屏幕上或只是表示形式，請確保將內容設置為`aria-hidden=”true”` 。查看關於[隱藏內容](/web/fundamentals/accessibility/semantics-aria/hiding-and-updating-content#aria-hidden)的指南以獲得進一步解釋。

### 熟悉即使是一個屏幕閱讀器也有很長的路要走

雖然學習屏幕閱讀器似乎令人望而生畏，但實際上他們很容易上手。一般來說，大多數開發人員只需使用幾個簡單的鍵盤命令即可獲得。

如果您在Mac上，請[使用VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=6) （Mac OS附帶的屏幕閱讀器）查看[此視頻](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=6) 。如果您使用的是PC上的[視頻，請使用NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4) ，這是一款支持捐贈的開源Windows屏幕閱讀器。

### 詠嘆調隱藏不會阻止鍵盤焦點

理解ARIA只能影響元素的*語義*是很重要的;它對元素的*行為*沒有影響。雖然您可以隱藏元素來屏蔽具有`aria-hidden=”true”`讀者，但不會改變該元素的焦點行為。對於離屏交互式內容，您通常需要將`aria-hidden=”true”`和`tabindex=”-1”` ，以確保它真正從鍵盤流中移除。提出的[惰性屬性](https://github.com/WICG/inert)旨在通過組合這兩個屬性的行為來使這更容易。

## 利用標題和地標

<img src="imgs/ic_map_black_24px.svg" class="attempt-right" alt="" width="100">

標題和地標元素為您的頁面增添了語義結構，大大提高了輔助技術用戶的導航效率。許多屏幕閱讀器用戶報告說，當他們第一次登陸不熟悉的頁面時，他們通常會嘗試[按標題導航](http://www.heydonworks.com/article/responses-to-the-screen-reader-strategy-survey) 。同樣，屏幕閱讀器也可以跳轉到重要的地標如`<main>`和`<nav>` 。出於這些原因，重要的是要考慮如何使用頁面結構來指導用戶的體驗。

### 關鍵點

- 正確使用`h1-h6`層次結構。將標題看作是為頁面創建輪廓的工具。不要依賴標題的內置樣式;相反，請將所有標題視為相同大小，並使用語義上適合的主要，次要和第三級內容。然後使用CSS使標題符合您的設計。

- 使用地標元素和角色，以便用戶可以繞過重複的內容。許多輔助技術提供了跳轉到頁面特定部分的快捷方式，例如由`<main>`或`<nav>`元素定義的那些部分。這些元素具有隱含的標誌性作用。您還可以使用ARIA `role`屬性在頁面上顯式定義區域，例如`<div role=”search”>` 。有關更多示例，請參閱[關於標題和地標的指南](/web/fundamentals/accessibility/semantics-builtin/navigating-content) 。

- 避免`role=”application”`除非您有以前的使用經驗。 `application`界面角色將告訴輔助技術，禁用其快捷方式並通過所有按鍵進入頁面。這意味著屏幕閱讀器用戶通常用於在頁面上移動的鍵將不再起作用，並且您將需要自己實現*所有*鍵盤處理。

### 用屏幕閱讀器快速檢查標題和地標

像VoiceOver和NVDA這樣的屏幕閱讀器提供了一個上下文菜單，用於跳轉到頁面上的重要區域。如果您正在進行可訪問性檢查，則可以使用這些菜單快速瀏覽頁面，並確定標題級別是否合適以及正在使用哪些地標。要了解更多信息，請參閱[VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&index=6&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)和[NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4)基礎知識上的這些教學視頻。

## 使過程自動化

<img src="imgs/ic_build_black_24px.svg" class="attempt-right" alt="" width="100">

手動測試站點的可訪問性可能很乏味且容易出錯。最終你會希望盡可能地自動化這個過程。這可以通過使用瀏覽器擴展和命令行可訪問性測試套件來完成。

### 關鍵點

- 頁面是否通過了[ax](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)或[WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)瀏覽器擴展的所有測試？這些擴展只是兩個可用的選項，可以作為任何手動測試過程的有用補充，因為它們可以快速獲取微妙的問題，如失敗的對比率和缺失的ARIA屬性。如果您更喜歡從命令行執行操作， [ax-cli](https://github.com/dequelabs/axe-cli)提供的功能與ax瀏覽器擴展相同，但可以從終端輕鬆運行。

- 為了避免回歸，尤其是在持續集成環境中，請將像[ax-core](https://github.com/dequelabs/axe-core)這樣的庫合併到您的自動測試套件中。 ax-core是為ax-chrome擴展提供動力的引擎，但卻是一個易於運行的命令行實用程序。

- 如果您使用的是框架或庫，它是否提供了自己的輔助功能工具？一些示例包括Angular的[量角器可訪問性插件](https://github.com/angular/protractor-accessibility-plugin/) ，以及Polymer和Web Components的[a11ysuite](https://github.com/Polymer/web-component-tester#a11ysuite) 。盡可能利用可用的工具來避免重新發明車輪。

### 如果您正在構建漸進式Web應用程序，請考慮試用Lighthouse

<img src="imgs/lighthouse.png" class="attempt-right" alt="">

Lighthouse 是一種幫助衡量漸進式網絡應用性能的工具，但它也使用axe-core庫來支持一系列輔助功能測試。如果您已經在使用Lighthouse，請留意報告中的可訪問性測試失敗。修復這些將有助於改善您網站的整體用戶體驗。

## 總結

將輔助功能評估作為您團隊過程的常規部分，並且儘早且經常地進行這些檢查可以幫助改善使用您的網站的整體體驗。請記住，良好的可訪問性等於良好的UX

### 其他資源

- [Web Accessibility by Google](https://bit.ly/web-a11y)
- [Accessibility Fundamentals](/web/fundamentals/accessibility/)
- [A11ycasts](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
