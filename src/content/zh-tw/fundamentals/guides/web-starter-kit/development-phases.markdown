---
title: "發展階段"
description: "在專案開發過程中，每位開發人員都會經歷不同的階段。 Web Starter Kit 可提高您的生產力，並簡化每一階段的一系列任務。"
updated_on: 2014-10-21
---

<p class="intro">
  在開發期間，有 3 個您將經常使用的特定命令：gulp serve、gulp 和 gulp serve:dist。  讓我們查看每一項任務將如何協助您開發您的網站。
</p>

{% include shared/toc.liquid %}

## 啟動本機伺服器

我們將要查看的第一個任務是：`$ gulp serve`。

就表面上看，這項任務會啟動一本機 HTTP 伺服器，讓您可以在瀏覽器查看您的網站，
但在幕後還有額外的工具在運作。

### 即時重新載入

即時重新載入免除在編輯器中變更、切換到瀏覽器、按 CTRL-R，
然後等待頁面重新載入的傳統重新整理劇本。


以即時重新載入的功能，您可以在編輯器中進行變更，
並查看內容於開啟網站的任何瀏覽器中立即生效。

{% ytvideo JE-ejS8N3YI %}

### 跨裝置測試

「瀏覽器同步」可協助您跨多種裝置測試您的網站。 任何捲動、點選或按鍵
將跨任何連線的瀏覽器共用。

{% ytvideo RKKBIs_3svM %}

只有當您以 `gulp serve` 執行您的網站時，此功能才會運作。 現在試試看，先執行 
`gulp serve`、以並列的兩個瀏覽器視窗開啟 URL，並捲動其中一頁面。


### 自動附加首碼

當鎖定多種瀏覽器時，您將需要使用廠商首碼，
以確保您可以在每一套中使用功能。 Web Starter Kit 會為您自動化
所有附加首碼的動作。

我們的範例 CSS (如下) 並不包括任何廠商首碼：

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

建置 (build) 程序會透過產生以下最終輸出的 autoprefixer，
來執行 CSS：

    .app-bar-container {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      -webkit-flex-direction: row;
          -ms-flex-direction: row;
              flex-direction: row;

      margin: 0 auto;
    }

### 請檢查您的 JAVAscript

JSHint 是一套工具，它會掃描您的 JavaScript 程式碼，以檢查您 JavaScript 邏輯的可能問題，
並 [強制程式碼編寫的最佳做法](http://www.jshint.com/docs/)。

當您建置專案，或如果您執行 gulp 伺服器，
每當您變更 JavaScript 時，該工具就會執行。

### 編譯您的 SASS

當您正在執行 serve 命令時，
對您專案中任何 Sass 檔案的任何變動都會編譯為 CSS 並附加首碼，
之後您的頁面會以「即時重新載入」重新載入。

對於 Sass 的新功能，專案將會自我描述為
一種「CSS 延伸語言」。 基本上這是具有一些額外功能的 CSS。 例如，它新增了對變數與函數的支援，
協助您以模組化和可重複使用的方式，構建您的 CSS。


## 建置您網站的生產版本

您可以簡單的 `gulp`
 命令，建置您網站的生產就緒版本。 此命令可執行我們已見過的某些任務，
而它能執行的其他任務旨在使您的網站載入更快且更有效率。

生產建置可執行的主要任務為：

### 建置樣式

首先，此建置將編譯您專案中的 Sass。 在 Sass 被編譯後，
Autoprefixer 會快速瀏覽所有 CSS。

### 檢查您的 JavaScript 是否有問題

第二建置步驟會對您的 JavaScript 執行 JSHint。

### 建置 HTML 頁面

下一步會審查您的 HTML 檔案，尋找建置區塊，
以串連及縮小 JavaScript。 在處理了 Javascript 之後，
建置程序會縮小 HTML 頁面。

縮小藉由移除並非真正需要的註解或空白字元，
以及其他技巧，能夠降低最終 JavaScript 檔案的字元數。
 這可降低最終檔案大小，
加速您網站的載入時間。

串連是指將多個檔案的內容貼上至單一檔案中。 我們這麼做的原因在於，
瀏覽器對一部伺服器只會提出一個要求，而非多個要求，
這會讓使用者加快過程。

一個建置區塊具有所有必要功能，
以管理我們該縮小與串連一起哪些 JavaScript 檔案。 讓我們查看一範例建置區塊：

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

建置區塊只是特別格式的註解。
位於建置區塊之間的您所有 javascript 檔案會被合併 (串連)，
並縮小成名為 main.min.js 的檔案，而最終建置將以此指令碼標籤，取代這些指令碼：


    <script src="scripts/main.min.js"></script>

### 最佳化任何影像資產

對於 JPEG 和 PNG 而言，影像中的中繼資料會被剝除；
不需要它來轉譯影像。 中繼資料內含一些資訊，
例如用來拍照的照相機之資訊。

對於 SVG 而言，它會移除不需要的任何屬性，
或不存在的任何空白與註解。

### 複製字型

這個簡單的任務會從應用程式複製我們的字型，至最終建置目錄。

### 從根目錄中複製任何檔案過來

如果建置在專案的根目錄中發現的任何檔案，
它也將會複製檔案到最終建置中。

## 測試您的生產建置

在您將任何東西送入生產階段之前，
必須確保一切會如您所望運作。 `gulp serve:dist` 命令會建置您網站的生產版本、
啟動一個伺服器，並為您開啟一個瀏覽器。 此功能 **沒有「即時重新載入」或「瀏覽器同步」**，
但卻是在部署您網站之前測試它的可靠方式。


