project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:從 DevTools 控制檯查看頁面上任意項目的狀態。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

# 評估表達式 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}
從 DevTools 控制檯使用它的某個評估功能查看頁面上任意項目的狀態。

DevTools 控制檯讓您可通過特定方式瞭解您頁面中的項目狀態。通過使用支持 JavaScript 的多個功能，再結合運用您的 JavaScript 知識，評估您可以輸入的任何表達式。





### TL;DR {: .hide-from-toc }
- 只需鍵入表達式即可對其進行評估。
- 使用一個快捷鍵選擇元素。
- 使用  <code>inspect()</code> 檢查 DOM 元素和 JavaScript 堆對象。
- 使用 $0 - 4 訪問最近選擇的元素和對象。


## 查看錶達式

按下 <kbd class="kbd">Enter</kbd> 鍵後，此控制檯可評估您提供的任何 JavaScript 表達式。輸入表達式後，系統將顯示屬性名稱建議；控制檯還會提供自動填充和 Tab 自動補全功能。





如果有多個匹配項，<kbd class="kbd">↑</kbd> 和 <kbd class="kbd">↓</kbd> 在它們之間循環切換。
按 <kbd class="kbd">→</kbd> 鍵可選擇當前建議。如果有一個建議，按 <kbd class="kbd">Tab</kbd> 鍵選中它。



![控制檯中的簡單表達式。](images/evaluate-expressions.png)

## 選擇元素

使用下列快捷鍵選擇元素：

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">快捷鍵及說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Shortcut">$()</td>
      <td data-th="Description">返回與指定 CSS 選擇器匹配的第一個元素。 <code>document.querySelector()</code> 的快捷鍵。</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$$()</td>
      <td data-th="Description">返回一個與指定 CSS 選擇器匹配的所有元素數組。等同於 <code>document.querySelectorAll()</code>。</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$x()</td>
      <td data-th="Description">返回一個與指定 XPath 匹配的元素數組。</td>
    </tr>
  </tbody>
</table>

目標選擇的示例：

    $('code') // Returns the first code element in the document.
    $$('figure') // Returns an array of all figure elements in the document.
    $x('html/body/p') // Returns an array of all paragraphs in the document body.

## 檢查 DOM 元素和 JavaScript 堆對象

`inspect()` 函數選取一個 DOM 元素或 JavaScript 引用作爲一個參數。如果您提供一個 DOM 元素，則 DevTools 進入“Elements”面板並顯示該元素。如果您提供一個 JavaScript 引用，則它進入“Profile”面板。






當此代碼在該頁面上的控制檯中執行時，它會抓取此圖並在“Elements”面板上顯示它。這會利用到 `$_` 屬性以獲取最後一個評估的表達式的輸出。




    $('[data-target="inspecting-dom-elements-example"]')
    inspect($_)

## 訪問最近選擇的元素和對象

控制檯在變量中存儲最後使用的五個元素和對象，以方便訪問。使用 $0 - 4 從控制檯訪問這些元素。請記住，計算機從 0 開始計算，這意味着最新的項目是 $0，最早的項目是 $4。







{# wf_devsite_translation #}
