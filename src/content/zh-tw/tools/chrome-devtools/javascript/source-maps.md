project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:保持您的客戶端代碼便於閱讀和調試，即使在您組合、縮減或編譯代碼後也應如此。

{# wf_updated_on:2015-04-21 #}
{# wf_published_on:2015-04-13 #}

# 將預處理代碼映射到源代碼 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

保持您的客戶端代碼便於閱讀和調試，即使在您組合、縮減或編譯代碼後也應如此。使用源映射將您的源代碼映射到編譯的代碼。


### TL;DR {: .hide-from-toc }
- 使用 Source Maps 將縮減的代碼映射到源代碼。隨後，您可以在其原始來源中閱讀和調試編譯的代碼。
- 僅使用<a href=''/web/tools/setup/setup-preprocessors?#supported-preprocessors''>可以產生 Source Maps 的預處理器</a>。
- 驗證您的網絡服務器可以提供 Source Maps。


## 預處理器使用入門

本文將說明如何與 DevTools Sources 面板中的 JavaScript Source Maps 交互。要初步瞭解什麼是預處理器、它們的作用以及 Source Maps 的工作方式，請轉至[設置 CSS 和 JS 預處理器](/web/tools/setup/setup-preprocessors?#debugging-and-editing-preprocessed-content)。

## 使用支持的預處理器

您需要使用可以創建源映射的壓縮工具。有關最常用的選項，[請參見我們的預處理器支持部分](/web/tools/setup/setup-preprocessors?#supported-preprocessors)。要詳細查看，請參見[源映射：語言、工具和其他信息](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info) Wiki 頁面。

Source Maps 一般與下列類型的預處理器搭配使用：

* 轉譯器（[Babel](https://babeljs.io/){: .external }、[Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started)）
* 編譯器（[Closure Compiler](https://github.com/google/closure-compiler)、[TypeScript](http://www.typescriptlang.org/){: .external }、[CoffeeScript](http://coffeescript.org) 和 [Dart](https://www.dartlang.org)）
* Minifiers ([UglifyJS](https://github.com/mishoo/UglifyJS))

## DevTools Sources 面板中的 Source Maps

預處理器中的 Source Maps 可以使 DevTools 加載縮減代碼與原始文件。然後，您可以使用原始文件設置斷點和瀏覽代碼。同時，Chrome 也會運行您的縮減代碼。這會讓您感覺到就像在生產環境中運行開發網站一樣。

在 DevTools 中運行 Source Maps 時，您會注意到 JavaScript 不會編譯，也會看到 Source Maps 引用的所有 JavaScript 文件。這是使用源映射，不過後臺卻在實際運行編譯的代碼。任何錯誤、日誌和斷點都將映射到開發代碼，從而實現出色的調試！因此，您會感覺到就像在生產環境中運行開發網站一樣。

### 在設置中啓用 Source Maps

Source Maps 默認處於啓用狀態（自 Chrome 39 開始），不過，如果您想要仔細檢查或啓用它們，請先打開 DevTools，然後點擊設置配置 ![齒輪](imgs/gear.png){:.inline}。在 **Sources**下，選中 **Enable JavaScript Source Maps**。您也可以選中 **Enable CSS Source Maps**。

![啓用 Source Maps](imgs/source-maps.jpg)

### 使用 Source Maps 調試

[調試代碼](/web/tools/chrome-devtools/debug/breakpoints/step-code) 和啓用 Source Maps 時，Source Maps 將在兩個地方顯示：

1. 控制檯中（指向來源的鏈接應是原始文件，而不是生成的文件）
2. 逐步執行代碼時（調用堆棧中的鏈接應打開原始的源文件）

## @sourceURL 和 displayName

雖然不是 Source Map 規範的一部分，`@sourceURL` 仍然可以讓您在處理 eval 時將開發變得更輕鬆。此幫助程序非常類似於 `//# sourceMappingURL` 屬性，並且實際上在 Source Map V3 規範中也有所提及。

通過將下面的特殊註釋包含到代碼中（將進行 eval 處理），您可以命名 eval 和內嵌腳本與樣式，使其在 DevTools 中以更具邏輯的名稱顯示。

`//# sourceURL=source.coffee`

導航到此**[演示](http://www.thecssninja.com/demo/source_mapping/compile.html)**，然後執行以下操作：


* 打開 DevTools 並轉至 **Sources** 面板。
* 將一個文件名輸入“Name your code:”輸入字段。
* 點擊 **compile** 按鈕。
* 將出現一條提醒，以及 CoffeeScript 源的評估和。

如果您展開“Sources”子面板，現在您會看到一個具有您之前輸入的自定義文件名的新文件。如果您雙擊來查看此文件，它將包含我們原始來源的已編譯 JavaScript。不過，最後一行將是 `// @sourceURL` 註釋，指示原始的源文件是什麼。處理語言抽象時，這樣可以爲調試提供很大幫助。

![使用 sourceURL](imgs/coffeescript.jpg)




{# wf_devsite_translation #}
