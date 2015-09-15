---
title: "轉譯效能"
description: "使用者會注意到網站和應用程式運作差勁，所以轉譯效能最佳化至關重要！"
updated_on: 2015-03-20
notes:
  csstriggers:
    - 如果您想要瞭解以上三個版本中的哪個版本在變更任何特定 CSS 屬性時會觸發，請前往 <a href="http://csstriggers.com">CSS 觸發器</a>。 如果您想快速取得高效能動畫，請閱讀關於<a href="stick-to-compositor-only-properties-and-manage-layer-count">變更僅限撰寫器屬性</a>的一節。
  rasterize:
    - "有時您可能聽到 「光柵化」一詞與繪製一起使用。 這是因為繪製實際上包含兩個任務：1) 建立繪製呼叫清單，和 2) 填入像素。 後者稱為 「光柵化」，所以每當您檢視 DevTools 中的繪製記錄時，都應該將之視為包含光柵化的工作。 (在某些架構中，建立繪製呼叫與光柵化的清單是以不同執行緒完成，但那並非在開發人員控制之下。"
udacity:
  id: ud860
  title: 瀏覽器轉譯最佳化
  description: "有興趣深入探究轉譯效能嗎？查閱手冊課程並深入了解瀏覽器如何轉換 HTML、CSS 和 JavaScript 為螢幕上的像素、如何使用 DevTools 來測量效能，以及如何最佳化您網頁的轉譯。"
  image: images/rp-udacity.jpg
---
<p class="intro">
  現今網頁<a href=\"http://paul.kinlan.me/what-news-readers-want/\">的使用者會期望，他們所造訪的頁面具備互動性與順暢性</a>，這就是您需要投入更多時間和精力的地方。 網頁不但要迅速載入，但也要執行良好；捲動應該隨指隨至，而動畫和互動應如絲般滑順。
</p>

<img src="images/intro/response.jpg" class="center" alt="使用者與網站進行互動。">

要撰寫高效能的網站和應用程式，您需要瞭解瀏覽器如何處理 HTML、JavaScript 和 CSS，並確保您撰寫的程式碼 (和您納入的其他第三方程式碼) 儘可能高效率執行。

## 60fps 和裝置重新整理頻率

時下大多數裝置會以 **每秒 60 次** 重新整理螢幕。 如果正在執行動畫或轉換，或使用者正在捲動網頁，瀏覽器需要符合裝置的重新整理頻率，並針對每一次螢幕重新整理，組成一個新圖形，或畫面。

每一個畫面的容許預算只有稍高於 16ms (1 秒 / 60 = 16.66ms)。 在現實中，瀏覽器還有例常任務要執行，因此您的所有工作必須在 **10ms** 內完成。 當您未能滿足此預算要求，畫面率就會下降，而螢幕上的內容會顫動。 這通常稱為 **閃避**，這會負面影響使用者體驗。

##像素管道
當您工作時，您必須知悉和注意五大主要領域。 它們是您擁有最大控制權的領域，也是像素轉螢幕管道的關鍵點：

<img src="images/intro/frame-full.jpg" class="center" alt="完整像素管道">

* **JavaScript**。 通常 JavaScript 是用來處理形成視覺變更的工作，無論是 jQuery 的 `animate` 功能、排序資料集，或新增 DOM 元素至網頁。 不過觸發視覺變更的不一定是 JavaScript：CSS 動畫、轉換和網頁動畫 API 也常被使用。
* **樣式計算**。 這就是根據符合的選取器，弄清楚哪些 CSS 規則適用於哪些元素的過程，例如 `.headline` 或 `.nav > .nav__item`。 從那裡開始，一旦已知規則，它們就會被套用，並計算每個元素的最終樣式。
* **版面配置**。 一旦瀏覽器知道哪些規則套用至元素，它就可以開始計算要佔用多少空間，以及它在螢幕上的位置。 網頁的版面配置模型意味著，一個元素可以影響其他元素，例如 `<body>` 元素的寬度通常會影響其子項寬度，以及在樹狀結構往上或往下延伸，因此對於瀏覽器而言，這個程序必須相當投入。
* **繪製**。 繪製是以像素為單位填入的過程。 這牽涉到描繪出文字、顏色、影像、邊框和陰影，基本上是元素的每個視覺化部分。 描繪通常是針對多重表單 -- 常稱為層 -- 進行。
* **合成**。 因為網頁的部分被描繪至可能多個層，因此它們需要按正確的順序描繪至螢幕，讓網頁能正確轉譯。 元素重疊到另一元素特別重要，因為一個錯誤可能導致元素錯誤地出現在另一個元素之上。

管道的每個部分都有機會引發閃避，所以很重要的是要確切瞭解，您的程式碼觸發了管道的哪些部分。

{% include shared/remember.liquid title="Note" list=page.notes.rasterize %}

您不一定會在每一畫面都能接觸到管道的每一部分。 事實上，當您無論是以 JavaScript、CSS 或網頁動畫做出視覺變更時，管道 _通常_ 有三種方法為特定畫面演出 ：

### 1. JS / CSS > Style > Layout > Paint > Composite

<img src="images/intro/frame-full.jpg" class="center" alt="完整像素管道">

如果您變更「版面配置」屬性，也就是變更了元素的幾何形狀，例如它的寬度、高度或其與左側或頂部的相對位置，瀏覽器將必需檢查所有其他元素並「自動重排」網頁。 任何受影響的區域將需要重新繪製，和最終的繪製元素將需要一起合成回來。

### 2. JS / CSS > Style > Paint > Composite

<img src="images/intro/frame-no-layout.jpg" class="center" alt="無版面配置的像素管道。">

如果您變更「純繪製」屬性，如背景影像、文字顏色或陰影，例如 不會影響網頁版面配置的屬性，那麼瀏覽器會略過版面配置，但它仍然執行繪製。

### 3. JS / CSS > Style > Composite

<img src="images/intro/frame-no-layout-paint.jpg" class="center" alt="無版面配置或繪製的像素管道。">

如果您變更一個不需要版面配置或繪製的屬性，那麼瀏覽器會直接跳去執行合成。

最終版本的成本最低，也是應用程式生命周期中高壓力點所最需要，例如在動畫處理或捲動時。

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

效能是避免非必要工作的藝術，請儘可能讓您的工作高效率。 在許多情況下，這在於善用瀏覽器，而非妨礙它。 值得記住的是，以上在管道中列出的工作之運算成本迥異；某些任務比別的任務更高成本！

讓我們深入探究管道的不同部分。 我們來看看常見的問題，以及如何診斷和解決這些問題。

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}

