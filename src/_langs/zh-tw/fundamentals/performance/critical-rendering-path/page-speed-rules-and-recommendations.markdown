---
layout: article
title: "PageSpeed 規則和建議"
description: "PageSpeed Insights 規則使用背景：最佳化關鍵轉譯路徑時需要注意的地方及其原因。"
introduction: "PageSpeed Insights 規則使用背景：最佳化關鍵轉譯路徑時需要注意的地方及其原因。"
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 8
collection: critical-rendering-path
authors:
  - ilyagrigorik
---
{% wrap content %}

##刪除禁止轉譯的 JavaScript 和 CSS

如要儘快完成初次轉譯，您需要盡量減少甚至刪除 (如果可能) 網頁的關鍵資源數量、盡量減少下載的關鍵位元組數以及盡量縮短關鍵路徑的長度。

## 最佳化 JavaScript 的使用情況

在預設情況下，JavaScript 資源會禁止剖析器，除非將其標為 _async_，或者使用特殊的 JavaScript 程式碼片段新增。禁止剖析器的 JavaScript 會強制瀏覽器等待 CSSOM，並暫停 DOM 的建構作業，導致大幅延遲初次轉譯的時間。

###  **建議使用非同步 JavaScript 資源**

非同步資源會取消禁止文件剖析器，因此瀏覽器在執行指令碼之前，都不會禁止 CSSOM。通常來說，如果可以將指令碼設定為非同步，也就表示該指令碼不是初次轉譯意所必需的。建議您不妨考慮在初次轉譯之後再載入非同步標記。

### **延遲剖析 JavaScript**

任何非必需的指令碼 (對建構初次轉譯的內容無關緊要的指令碼) 都應該延遲，藉此降低瀏覽器轉譯網頁時所需的工作量。

### **避免執行時間過長的 JavaScript**

執行時間過長的 JavaScript 會禁止瀏覽器建構 DOM、CSSOM 以及轉譯網頁。因此，任何對初次轉譯無關緊要的初始化邏輯和功能都應該延遲執行。如果需要執行較長的初始化序列，可以考慮分割成幾個階段，使瀏覽器可以間隔處理其他事件。

## 最佳化 CSS 的使用情況

CSS 是建構轉譯樹狀結構的必備元素，但在初次建構網頁時，JavaScript 常常會禁止 CSS 執行。請務必將任何非必需的 CSS 標記為非關鍵資源 (例如 print 或者其他媒體查詢)，並且儘可能減少關鍵 CSS 數量及縮短傳輸時間。

### **將 CSS 放入文件的 head 標籤內**

建議您儘早在 HTML 文件中指定所有 CSS 資源，以便瀏覽器及早發現 `<link>`標籤，迅速發出 CSS 請求。

### **避免使用 CSS import**

CSS import (@import) 指令可讓一個樣式表從另一個樣式表檔案中匯入規則。但是，建議您避免使用這些指令，因為這會在關鍵路徑中增加往返次數：只有在收到並剖析完帶有 @import 規則的 CSS 樣式表之後，才會發現匯入的 CSS 資源。

### **內嵌禁止轉譯的 CSS**

為了獲得最佳效果，您不妨考慮將關鍵 CSS 直接內嵌到 HTML 文件中。這麼做可以減少關鍵路徑中的額外往返次數。如果做法正確，在只有 HTML 一項禁止資源時，就能實現「一次往返」的關鍵路徑長度。

{% include modules/nextarticle.liquid %}

{% endwrap%}

