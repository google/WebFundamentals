project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:默認 DOM 順序的重要性


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# DOM 順序至關重要 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



使用原生元素對了解焦點行爲極有幫助，因爲是根據這些元素在 DOM 中的位置自動將它們插入跳格順序的。



例如，您可能有三個 button 元素，在 DOM 中依次排列。
按 `Tab` 時焦點會按順序跳至每個按鈕。試着點擊下面的代碼塊以移動焦點導航的起點，然後按 `Tab` 在按鈕之間循環移動焦點。



    <button>I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button>I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

不過，必須注意的是，如果使用 CSS，可能會出現 DOM 中存在的順序與屏幕上出現的順序不同的情況。
例如，如果使用 `float` 之類的 CSS 屬性將一個按鈕右移，按鈕卻是以不同順序出現在屏幕上。但由於它們在 DOM 中的順序保持不變，因此跳格順序同樣保持不變。
當用戶在頁面中循環跳格時，按鈕並不是按直觀順序獲得焦點。
試着點擊下面的代碼塊以移動焦點導航的起點，然後按 `Tab` 在按鈕之間循環移動焦點。



    <button style="float: right">I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button style="float: right;">I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

利用 CSS 更改元素在屏幕上的視覺位置時要小心。這可能使跳格順序看似隨機般地四處亂跳，令依賴鍵盤的用戶感到困惑。因此，Web AIM 檢查清單[在第 1.3.2 節](http://webaim.org/standards/wcag/checklist#sc1.3.2){: .external }規定，由代碼順序決定的讀取和導航順序應直觀併合乎邏輯。




一般來說，應時常試着在頁面中循環跳格，這完全是爲了確保您沒有無意中弄亂了跳格順序。
這是個值得養成的好習慣，並且也不會增加多少工作量。


## 屏幕外內容
如果有當前並未顯示但仍需包含在 DOM 中的內容（例如自適應側邊導航），該怎麼辦？
如果您有這種位於屏幕之外時獲得焦點的元素，當用戶在頁面中循環跳格時，看起來就好像焦點消失後又再次出現，這顯然不是您想要的效果。理想情況下，我們應該防止面板在位於屏幕之外時獲得焦點，只允許它在用戶可以與其進行交互時獲得焦點。



![一個可能會偷走焦點的屏幕外滑入式面板](imgs/slide-in-panel.png)

有時，您需要做點偵探工作才能搞清楚焦點的下落。
可以利用控制檯中的 `document.activeElement` 來了解當前獲得焦點的元素。


知道哪一個屏幕外元素獲得了焦點後，就可以將其設置爲 `display: none` 或 `visibility: hidden`，然後恢復其原來的設置 `display: block` 或 `visibility: visible`，最後再顯示給用戶。



![設置爲不顯示任何內容的滑入式面板](imgs/slide-in-panel2.png)

![設置爲顯示區塊的滑入式面板](imgs/slide-in-panel3.png)

一般而言，我們鼓勵開發者在每次發佈前在網站上循環跳格，確保跳格順序不會消失或不按邏輯順序地亂跳。如果存在問題，則應確保使用 `display: none` 或 `visibility: hidden` 正確隱藏了屏幕外內容，或者重新安排元素在 DOM 中的物理位置，使它們按邏輯順序排列。





{# wf_devsite_translation #}
