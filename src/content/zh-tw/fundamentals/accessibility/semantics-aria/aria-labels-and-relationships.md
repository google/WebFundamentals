project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:使用 ARIA 標籤創建可訪問元素說明


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# ARIA 標籤和關係 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## 標籤

ARIA 提供了多種向元素添加標籤和說明的機制。事實上，ARIA 是唯一一種可以添加可訪問幫助或說明文本的方式。
我們來看一下 ARIA 用於創建可訪問標籤的屬性。


### aria-label

`aria-label` 允許我們指定一個用作可訪問標籤的字符串。這將替換任何其他原生標記機制，例如 `label` 元素 &mdash;例如，如果 `button` 同時具有文本內容和 `aria-label`，將僅使用 `aria-label` 值。




如果您有某種指明元素用途的視覺指示（例如，使用圖形而不是文本的按鈕），則可以使用 `aria-label` 屬性，但是仍需要向無法獲取視覺指示（例如，僅使用圖像指示其用途的按鈕）的任何人闡明該用途。





![使用 aria-label 標識一個僅圖像按鈕](imgs/aria-label.jpg)

### aria-labelledby

`aria-labelledby` 允許我們將 DOM 中另一個元素的 ID 指定爲當前元素的標籤。


![使用 aria-labelledby 標識單選組](imgs/aria-labelledby.jpg)

這非常類似於使用 `label` 元素，但也存在一些關鍵區別。

 1. `aria-labelledby` 可以用於任何元素，而不僅僅是可標記元素。
 1. `label` 元素引用其標記的對象，但對於 `aria-labelledby` 來說，關係則相反 &mdash; 被標記的對象引用標記它的元素。


 1. 只有一個標籤元素與可標記元素關聯，但是 `aria-labelledby` 可以利用一組 IDREF 從多個元素構建標籤。標籤將按照 IDREF 的提供順序串聯。

 1. 您可以使用 `aria-labelledby` 引用隱藏和不在可訪問性樹中的元素。
例如，您可以在想要標記的元素旁添加一個隱藏的 `span`，然後使用 `aria-labelledby` 引用該元素。


 1. 不過，由於 ARIA 僅影響可訪問性樹，`aria-labelledby` 並不會展現使用 `label` 元素時熟悉的標籤點擊行爲。



重要的是，`aria-labelledby` 將替換元素的**所有**其他名稱源。
因此，如果一個元素同時擁有 `aria-labelledby` 和 `aria-label` 或者`aria-labelledby` 和原生 HTML `label`，`aria-labelledby` 標籤將始終具有最高優先級。



## 關係

`aria-labelledby` 是一個*關係屬性*示例。無論頁面元素的 DOM 屬性如何，關係屬性都會在它們之間創建語義關係。如果是 `aria-labelledby`，關係將是“此元素由另一個元素標記”。


ARIA 規範列出了[八個關係屬性](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_relationships){: .external }。其中的六個（即 `aria-activedescendant`、`aria-controls`、`aria-describedby`、`aria-labelledby` 和 `aria-owns`）通過引用一個或多個元素的方式在頁面元素之間創建一個新鏈接。各個屬性的區別是鏈接的含義及其向用戶呈現的方式。


### aria-owns

`aria-owns` 是使用最廣泛的 ARIA 關係之一。此屬性既允許我們告知輔助技術應將 DOM 中獨立的一個元素視爲當前元素的子項，也允許我們以不同順序重排現有子元素。例如，如果一個彈出式子菜單在視覺上靠近其父菜單，但不能是其父項的 DOM 子項（否則會影響視覺呈現），您可以使用 `aria-owns` 將子菜單作爲父菜單的子項呈現給屏幕閱讀器。





![使用 aria-owns 在菜單與子菜單之間建立關係](imgs/aria-owns.jpg)

### aria-activedescendant

`aria-activedescendant` 扮演着相關角色。與頁面的活動元素是具有焦點的元素一樣，設置元素的活動子項允許我們告知輔助技術，在一個元素的父項實際具有焦點時應作爲焦點元素將該元素呈現給用戶。例如，在列表框中，您可能希望將頁面焦點停留在列表框容器上，但對當前選中的列表項持續更新列表框的 `aria-activedescendant` 屬性。這樣會讓當前選定項以焦點項的形式顯示給輔助技術。


![使用 aria-activedescendant 在列表框中建立關係](imgs/aria-activedescendant.jpg)

### aria-describedby

`aria-describedby` 提供了一種可訪問說明，方式與 `aria-labelledby` 提供標籤的方式相同。
與 `aria-labelledby` 一樣，`aria-describedby` 可能引用不可見的元素，無論這些元素在 DOM 中隱藏，還是對輔助技術用戶隱藏。如果存在用戶可能需要的額外說明性文本，則不管該文本適用於輔助技術用戶還是所有用戶，這種技術都非常有用。



一個常見的示例是密碼輸入字段帶有一些說明性文本，其中，說明性文本用於說明最低密碼要求。
與標籤不同，此說明不一定會呈現給用戶；用戶可以選擇是否訪問說明，此說明可能跟在其他信息之後，也可能被其他內容搶佔。例如，如果用戶正在輸入信息，他們的輸入將回顯並且可能中斷元素的說明。因此，說明是一種用於傳達補充但非必要信息的絕佳方式；它不會妨礙更關鍵的信息，例如元素角色。



![使用 aria-describedby 與密碼字段建立關係](imgs/aria-describedby.jpg)

### aria-posinset 和 aria-setsize

其餘的關係屬性略有不同並協同作用。`aria-posinset`（“在集中的位置”）和 `aria-setsize`（“集大小”）用於定義集（例如，列表）中同級元素之間的關係。



如果無法通過 DOM 中存在的元素確定集的大小（例如，使用延遲渲染避免在 DOM 中生成大的列表時），`aria-setsize` 可以指定實際集大小，`aria-posinset` 可以指定元素在集中的位置。例如，在一個可能包含 1000 個元素的集中，您可以指定特定元素的 `aria-posinset` 爲 857（即使其在 DOM 中位於首位），然後使用動態 HTML 技術確保用戶可以根據需要查看完整列表。





![使用 aria-posinset 和 aria-setsize 在列表中建立關係](imgs/aria-posinset.jpg)


{# wf_devsite_translation #}
