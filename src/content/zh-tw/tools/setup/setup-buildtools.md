project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:從頭開始構建您的多設備網站。瞭解如何使用一套構建流程工具加快開發速度和創建快速加載的網站。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-09-24 #}

# 設置構建工具 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
從頭開始構建您的多設備網站。瞭解如何使用一套構建流程工具加快開發速度和創建快速加載的網站。每個網站均應有一個開發版本和一個生產版本。<br /><br />開發版本具有構成網站的所有 HTML、CSS、JS 和圖像文件，且格式清爽，便於您處理。<br /><br />生產版本將提取並縮小這些文件，然後對這些文件（如圖像）加以串連/合併和優化。

網絡開發者必須同時考慮很多事情，構建步驟就是一開始要處理的最重要也是最棘手的事情之一。
您必須弄清楚所有需要自動化的任務，例如：
圖像壓縮、CSS 縮小、JavaScript 串連、響應測試、單元測試，不一而足。



按照本指南瞭解構建工作流的最佳方法，從而確保您創建的網站從開始構建之時即遵循了所有最佳做法。




### TL;DR {: .hide-from-toc }
- 您的構建流程工具必須針對性能進行優化；它們應能夠自動縮小和串連 JavaScript、CSS、HTML 和圖像。
- 使用 LiveReload 等工具，以使開發流程更順暢。


開始編碼之前，需要考慮如何優化和構建網站的生產版本。
從頭開始設置此工作流可以避免項目結束時出現任何糟糕的意外，而且您可以將工具添加到工作流中爲您執行單調枯燥的任務，從而加快開發速度。




## 什麼是構建流程？

構建流程是一組針對項目文件運行的任務，主要是在開發期間編譯和測試代碼，以及用於創建網站開發版本。構建流程不應是一組在開發工作流結束時運行的任務。


實現構建流程最熱門的工具是 [Gulp](http://gulpjs.com/){: .external } 和 [Grunt](http://gruntjs.com/)，二者都是命令行工具。

如果您對這兩款工具都沒有使用經驗，請使用 Gulp，我們在 [Web Starter Kit](/web/tools/starter-kit/) 中就是使用它，因此建議您也使用它。



很多工具都具有 GUI，而且可能更容易掌握，但不是很靈活。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">支持的平臺和工具名稱</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://alphapixels.com/prepros/">Prepros</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="https://incident57.com/codekit/">CodeKit</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="http://hammerformac.com/">HammerForMac</a></td>
    </tr>
  </tbody>
</table>


## 構建流程中應執行哪些任務？

在下文中，我們將介紹在構建流程中應執行的最常見任務，以及在使用 Grunt 和 Gulp 時我們建議執行的任務。


這需要執行大量試錯工作，以按照您希望的方式完成一切設置，如果您不熟悉構建流程，這可能會令您感到氣餒。


要獲取一個好的構建流程示例，請查閱[Web Starter Kit 入門指南](/web/fundamentals/getting-started/web-starter-kit/)，該指南詳細介紹瞭如何使用 Web Starter Kit，並解釋了 Gulp 文件中每個命令的作用。您可以將此示例作爲快速設置方式，然後根據需要加以更改。


如果您想要創建自己的構建流程，但又不熟悉 Gulp 和 Grunt，此快速入門指南將是您瞭解如何安裝和運行您的首個構建流程的最佳途徑：



* [Grunt 入門指南](http://gruntjs.com/getting-started)
* [Gulp 入門指南](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)


### 使用串連和縮小功能以構建更快速的網站

對於不熟悉串連和縮小這兩個術語的開發者，串連就是指將多個文件合併在一起，例如將多個文件複製粘貼到一個文件中。我們這樣做的原因是它更爲有效，因爲瀏覽器只需獲取一個文件，而不是很多小文件。


縮小是指提取文件並減少總字符數、但不更改代碼工作方式的過程。
刪除註釋或提取一個長變量名稱並縮小該名稱就是一個很好的例子。
這樣可以減小文件大小，從而加快下載速度。


對於縮小，使用以下插件：

<table>
  <thead>
    <tr>
      <th data-th="Type of File">文件類型</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS</td>
      <td data-th="Gulp"><a href="https://github.com/ben-eb/gulp-csso">gulp-csso</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-cssmin">grunt-contrib-cssmin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/terinjokes/gulp-uglify/">gulp-uglify</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-uglify">grunt-contrib-uglify</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">HTML</td>
      <td data-th="Gulp"><a href="https://www.npmjs.com/package/gulp-minify-html">gulp-minify-html</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-htmlmin">grunt-contrib-htmlmin</a></td>
    </tr>
  </tbody>
</table>

對於串連，使用以下插件：

<table>
  <thead>
    <tr>
      <th data-th="Type of File">文件類型</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS (Sass)</td>
      <td data-th="Gulp"><a href="https://github.com/dlmanning/gulp-sass">gulp-sass</a> 或 <a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-sass">grunt-contrib-sass</a> 或 <a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a> 或 <a href="https://github.com/fatso83/grunt-codekit">grunt-codekit</a></td>
    </tr>
  </tbody>
</table>

**注**：您可以通過利用“導入”功能來使用 Sass（[請參見 Web Starter Kit 中的示例](https://github.com/google/web-starter-kit/blob/master/app/styles/main.scss)）。


### 優化圖像

圖像優化是幫助加快網站速度的一個重要步驟；在不損害圖像質量的情況下縮小圖片的幅度會讓您大吃一驚．
元數據會從圖像中刪除，因爲瀏覽器不需要元數據即可顯示圖像，例如有關拍攝照片所用相機的信息。



對於圖像優化，您可以使用以下模塊。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp 和 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-imagemin">gulp-imagemin</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-imagemin">grunt-contrib-imagemin</a></td>
    </tr>
  </tbody>
</table>

### 別因供應商前綴而出紕漏

爲您使用的 CSS 包含所有供應商前綴通常是有點單調的任務。
使用前綴自動補全工具自動添加需要包含的前綴：


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp 和 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-autoprefixer">gulp-autoprefixer</a></td>
      <td data-th="Grunt"><a href="https://github.com/nDmitry/grunt-autoprefixer">grunt-autoprefixer</a></td>
    </tr>
  </tbody>
</table>

**注**
如果您喜歡，您可以添加 [Sublime 軟件包來執行前綴自動補全工作](/web/tools/setup/setup-editor#autoprefixer)。


### 切勿使文本編輯器處於實時重新加載狀態

實時重新加載會在您每次做出更改後在瀏覽器中更新您的網站。只要使用一次，就再也離不開它了。


Web Starter Kit 使用 browser-sync 提供實時重新加載支持。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp 和 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="http://www.browsersync.io/docs/gulp/">browser-sync</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-connect">grunt-contrib-connect</a> 和 <a href="https://github.com/gruntjs/grunt-contrib-watch">grunt-contrib-watch</a></td>
    </tr>
  </tbody>
</table>

Note: 如果您喜歡實時重新加載這一想法，但不想有構建流程，請參閱 [Addy Osmani 撰寫的有關 HTML5Rocks 的文章](http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/)，其中介紹了各種替代方案（有些是免費的，有些是商業的）。


{# wf_devsite_translation #}
