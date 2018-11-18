project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Web Starter Kit 是多設備開發的樣板文件和工具

{# wf_published_on:2015-01-01 #}
{# wf_updated_on:2016-09-12 #}

# Web Starter Kit {: .page-title }

[下載 Web Starter Kit（測試版）](https://github.com/google/web-starter-kit/releases/latest){: .button .button-primary }

## 什麼是 Web Starter Kit？

[Web Starter Kit](https://github.com/google/web-starter-kit) 是用於 Web 開發的樣板文件。在多臺設備上構建卓越體驗並且[以性能爲導向](#web-performance)的工具。幫助您遵循 Google 的[網頁基礎知識](/web/fundamentals/)中介紹的最佳做法，以便保持工作效率。爲行業的專業人士和新來者提供一個堅實的起點。

### 功能

| 功能                                | 摘要                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|自適應樣板文本 | 針對跨屏網頁優化的自適應樣板文本。由 [Material Design Lite](http://getmdl.io) 提供技術支持。您可以使用這個工具或者 [basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html) 從頭開始。                          |
| Sass 支持                           | 輕鬆將 [Sass](http://sass-lang.com/) 彙編到 CSS 中，可以支持變量、混合類以及更多。（生產時運行 `gulp serve` 或 `gulp`）                                                                                                      |
| 性能優化               | 縮小並連接 JavaScript、CSS、HTML 和圖像來幫您精簡頁面。（運行 `gulp` 以便向 `/dist` 中創建經過優化的項目版本）                                                                                                |
| 代碼錯誤分析               | JavaScript 代碼錯誤分析是通過 [ESLint](http://eslint.org)（用於識別和報告 JavaScript 中的模式的可插拔代碼分析工具）完成的。Web Starter Kit 使用的 ESLint 具有 [eslint-config-google](https://github.com/google/eslint-config-google)，視圖遵循 Google JavaScript 風格指南。                                                                                                |
| 通過 Babel 6.0 支持 ES2015                    | 可選的 ES2015 支持（使用 [Babel](https://babeljs.io/){: .external }）。爲了啓用 ES2015 支持，請刪除 (https://github.com/google/web-starter-kit/blob/master/.babelrc) 文件中的 `"only": "gulpfile.babel.js",` 這一行。ES2015 源代碼將自動轉譯爲 ES5，以提供廣泛的瀏覽器支持。  |
| 內置的 HTTP 服務器                   | 內置的服務器可在您開發和迭代時在本地預覽網站                                                                                                                                                                            |
| 實時瀏覽器重新加載                 | 在進行任何編輯後實時重新加載瀏覽器，無需擴展程序。（運行 `gulp serve` 並編輯您的文件）                                                                                                                           |
| 跨設備同步           | 當您編輯項目時在多臺設備上同步點擊、滾動、形成和實時重新加載。由 [BrowserSync](http://browsersync.io) 提供技術支持。（運行 `gulp serve` 並打開網絡中其他設備上提供的 IP）                       |
| 離線支持                     | 由於我們已經完成了[服務工作線程](/web/fundamentals/getting-started/primers/service-workers)[預先緩存](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226)，將 `dist` 部署到 HTTPS 域中的網站可以獲得離線支持。這一步可以通過 [sw-precache](https://github.com/GoogleChrome/sw-precache/) 實現。                                                                                                                                              |
| PageSpeed Insights                     | 顯示您的網站在移動設備和臺式機上運行性能的網頁性能指標（運行 `gulp pagespeed`）                                                                                                                                                    |

## 快速入門

[下載](https://github.com/google/web-starter-kit/releases/latest)工具包或者克隆[這個](https://github.com/google/web-starter-kit)存儲區並根據 `app` 目錄中包含的內容進行構建。



您有兩個 HTML 起點可以選擇：

- `index.html` - 默認起點，包含 Material Design 佈局。
- `basic.html` - 無佈局，但仍包含我們最低限度的移動最佳做法

請務必參閱[安裝文檔](https://github.com/google/web-starter-kit/blob/master/docs/install.md)，驗證您的環境是否已準備好運行 WSK。驗證您的系統可以運行 WSK 後，請檢查可用的[命令](https://github.com/google/web-starter-kit/blob/master/docs/commands.md)以便開始使用。


## 網頁性能

Web Starter Kit 努力爲您提供開箱即用的高性能起點。我們的默認模板的中值網頁測試[得分](http://www.webpagetest.org/result/151201_VW_XYC/){: .external }[速度指數](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) 爲 ~1100（1000 爲理想值），重複訪問速度指數爲 ~550，這一切都得益於服務工作線程預先緩存。 

## 瀏覽器支持

目前，我們致力於爲以下瀏覽器的兩個最新版本提供官方支持：

* Chrome
* Edge
* Firefox
* Safari
* Opera
* Internet Explorer 9+

這並不是說 Web Starter Kit 不能在比上述版本舊的瀏覽器中使用，僅僅表示我們關注的重點是確保上述瀏覽器中的佈局卓越。

## 故障排除

如果您在安裝或運行這些工具時遇到問題，請查看我們的[問題排查](https://github.com/google/web-starter-kit/wiki/Troubleshooting)指南，然後提出[問題](https://github.com/google/web-starter-kit/issues)。我們非常樂意與您討論問題的解決辦法。

## 僅限樣板文本選項

如果您不願意使用我們的任何工具，請從項目中刪除以下文件：`package.json`、`gulpfile.babel.js`、`.jshintrc` 和 `.travis.yml`。您現在可以安全地選擇使用具有備用構建系統或不具備任何構建系統的樣板文本了。

## 文檔和訣竅

* [文件附錄](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - 這裏的不同文件是幹什麼用的？
* [使用 Material Design Lite 的 Sass](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - 如何使 MDL 的 Sass 與 WSK 結合使用。
* [部署指南](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - 可供 Firebase、Google App Engine 和其他服務使用。
* [Gulp 訣竅](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - 官方的 Gulp 訣竅目錄包括您可以添加到項目中的不同工作流程的綜合指南。

## 靈感

Web Starter Kit 的靈感來源於[移動設備 HTML5 樣板文件](https://html5boilerplate.com/mobile/){: .external }以及 Yeoman 的 [generator-gulp-webapp](https://github.com/yeoman/generator-webapp)，並且在開發的過程中採用了這兩個項目的貢獻者的意見。我們的[常見問題解答](https://github.com/google/web-starter-kit/wiki/FAQ)試圖回答有關項目的常見問題。


## 瞭解詳情

如需瞭解詳細信息、查看代碼，提交問題或參與其中，請查看我們在 [https://github.com/google/web-starter-kit](https://github.com/google/web-starter-kit) 上提供的 Git 存儲區



{# wf_devsite_translation #}
