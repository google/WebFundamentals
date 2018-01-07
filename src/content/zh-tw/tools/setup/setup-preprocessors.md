project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:瞭解如何設置 CSS 與 JS 預處理器以幫助您高效地編寫代碼。

{# wf_updated_on:2015-08-03 #}
{# wf_published_on:2015-08-03 #}

# 設置 CSS 與 JS 預處理器 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

正確使用 CSS 預處理器（如 Sass、JS 預處理器和轉譯器）可以極大地提高您的開發速度。瞭解如何設置。


### TL;DR {: .hide-from-toc }
- 預處理器讓您可以使用瀏覽器原生不支持的 CSS 和 JavaScript 中的功能，如 CSS 變量。
- 如果您使用預處理器，可以使用 Source Maps 將原始源文件映射到渲染的輸出。
- 確保您的網絡服務器能夠提供 Source Maps。
- 使用支持的預處理器自動生成 Source Maps。


## 什麼是預處理器？

預處理器可以獲取任意的源文件，並將其轉換成瀏覽器可以識別的內容。 

輸出爲 CSS 時，可以使用預處理器添加以下功能（如果不使用預處理器，則不會存在這些功能）：CSS 變量、嵌套，等等。這個類別中顯著的例子是 [Sass](http://sass-lang.com/)、[Less](http://lesscss.org/){: .external } 和 [Stylus](https://learnboost.github.io/stylus/)。

輸出爲 JavaScript 時，它們可以從完全不同的語言轉換（編譯），或者將超集或新語言標準轉換（轉譯）爲當前的標準。這個類別中顯著的例子是 [CoffeeScript](http://coffeescript.org/){: .external } 和 ES6（通過 [Babel](https://babeljs.io/)）。

## 調試和修改預處理的內容

只要您在瀏覽器中且使用 DevTools [修改您的 CSS](/web/tools/chrome-devtools/inspect-styles/edit-styles) 或調試 JavaScript，就會出現一個非常明顯的問題：您正在瀏覽的內容沒有反映源，而且不會真的幫助您解決問題。

爲了解決問題，最現代的預處理器支持一種名稱爲 <b>Source Maps</b> 的功能。

### 什麼是 Source Maps？

源映射是一種基於 JSON 的映射格式，可以在縮小的文件與其源之間建立關係。如果您爲生產而構建，縮小和合並 JavaScript 文件時，還會生成包含原始文件相關信息的源映射。

### Source Maps 的工作方式

對於生成的每個 CSS 文件，除了編譯的 CSS，CSS 預處理器還會生成源映射文件 (.map)。源映射文件是 JSON 文件，會在每個生成的 CSS 聲明與源文件相應行之間定義映射。

每個 CSS 文件均包含指定源映射文件網址的註解，嵌入文件最後一行上的特殊註釋中：

    /*# sourceMappingURL=<url> */

例如，假設存在一個名爲 **styles.scss** 的 Sass 源文件：

    %$textSize: 26px;
    $fontColor: red;
    $bgColor: whitesmoke;
    h2 {
        font-size: $textSize;
        color: $fontColor;
        background: $bgColor;
    }

Sass 會生成 CSS 文件 **styles.css**，包含 sourceMappingURL 註解：

    h2 {
      font-size: 26px;
      color: red;
      background-color: whitesmoke;
    }
    /*# sourceMappingURL=styles.css.map */

下方爲一個源映射文件示例：

    {
      "version": "3",
      "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK"
      "sources": ["sass/styles.scss"],
      "file": "styles.css"
    }

## 驗證網絡服務器可以提供 Source Maps

一些網絡服務器（如 Google App 引擎）需要適用於提供的每個文件類型的顯式配置。這種情況下，需要爲您的 Source Maps 提供 MIME 類型的 `application/json`，但實際上 Chrome 可以[接受任何內容類型](https://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files)，例如 `application/octet-stream`。

### 獎勵：通過自定義標題進行源映射 

如果您不希望文件中存在其他註釋，請使用縮小的 JavaScript 文件上的 HTTP 標題字段告知 DevTools 在哪裏可以找到源映射。這需要配置或自定義您的網絡服務器，不在本文檔的介紹範圍內。

    X-SourceMap: /path/to/file.js.map

像註釋一樣，它也可以告知 DevTools 和其他工具在哪裏可以查找與 JavaScript 文件關聯的源映射。此標題也可以解決以不支持單行註釋的語言引用 Source Maps 的問題。

## 支持的預處理器

幾乎任何編譯到 JavaScript 的語言都可以立即生成 Source Maps，包括 Coffeescript、TypeScript、JSX 等。您也可以在 Node 內的服務器側、通過 Sass、Less 等的 CSS 中使用 Source Maps，使用可以爲您提供節點式需求的 browserify 以及會提高整潔效果的縮小工具（如 uglify-js）生成多級別 Source Maps。

### JavaScript

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">編譯器</th>
      <th width="40%" data-th="Command">命令</th>
      <th data-th="Instructions">說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://coffeescript.org/#source-maps">CoffeeScript</a></td>
      <td data-th="Command"><code>$ coffee -c square.coffee -m</code></td>
      <td data-th="Instructions">編譯器只需要 -m (--map) 標記即可輸出源映射，也會爲輸出文件添加 sourceMapURL 註釋指令。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://www.typescriptlang.org/">TypeScript</a></td>
      <td data-th="Command"><code>$ tsc -sourcemap square.ts</code></td>
      <td data-th="Instructions">-sourcemap 標記會生成映射並添加註釋指令。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/google/traceur-compiler/wiki/SourceMaps">Traceur</a></td>
      <td data-th="Command"><code>$ traceur --source-maps=[file|inline]</code></td>
      <td data-th="Instructions">對於 <code>--source-maps=file</code>，每個以 <code>.js</code> 結尾的輸出文件都會有一個以 <code>.map</code> 結尾的源映射文件；對於  <code>source-maps='inline'</code>，每個以 <code>.js</code> 結尾的輸出文件結尾的註釋都會包含編碼在 <code>data:</code> 網址中的源映射。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://babeljs.io/docs/usage/cli/#compile-with-source-maps">Babel</a></td>
      <td data-th="Command"><code>$ babel script.js --out-file script-compiled.js --source-maps</code></td>
      <td data-th="Instructions">使用 --source-maps 或 -s 生成 Source Maps。使用 <code>--source-maps inline</code> 生成內嵌 Source Maps。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/mishoo/UglifyJS2">UglifyJS</a></td>
      <td data-th="Command"><code>$ uglifyjs file.js -o file.min.js --source-map file.min.js.map</code></td>
      <td data-th="Instructions">這是生成“file.js”源映射所需的非常基本的命令。這也會爲輸出文件添加註釋指令。</td>
    </tr>
  </tbody>
</table>

### CSS

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">編譯器</th>
      <th width="40%" data-th="Command">命令</th>
      <th data-th="Instructions">說明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://sass-lang.com">Sass</a></td>
      <td data-th="Command"><code>$ scss --sourcemap styles.scss styles.css</code></td>
      <td data-th="Instructions">支持 Sass 3.3 及以上的 Sass 形式的 Source Maps。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://lesscss.org/">Less</a></td>
      <td data-th="Command"><code>$ lessc styles.less > styles.css --source-map styles.css.map</code></td>
      <td data-th="Instructions">在 1.5.0 中實現。請參閱<a href="https://github.com/less/less.js/issues/1050#issuecomment-25566463">問題 #1050</a> 瞭解詳細信息和使用模式。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
      <td data-th="Command"><code>$ stylus --sourcemaps styles.style styles.css</code></td>
      <td data-th="Instructions">這會將源映射作爲 base64 編碼的字符串直接嵌入到輸出文件中。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://compass-style.org/">Compass</a></td>
      <td data-th="Command"><code>$ sass --compass --sourcemap --watch scss:css</code></td>
      <td data-th="Instructions">或者，您也可以將 `sourcemap: true` 添加到 config.rb 文件中。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></td>
      <td data-th="Command"><code></code></td>
      <td data-th="Instructions">請點擊鏈接查看如何使用此編譯器以及兼用輸入源映射。</td>
    </tr>
  </tbody>
</table>

## Source Maps 與 DevTools

現在，您已經正確地設置了 Source Maps，DevTools 已內置對基於 CSS 和 JS 的 Source Maps 的支持，這一點可能會讓您很高興。

### 修改預處理的 CSS

請轉至[修改 Sass、Less 或 Stylus](/web/tools/chrome-devtools/inspect-styles/edit-styles)，詳細瞭解如何在 DevTools 內直接修改和刷新鏈接至源映射的樣式。

### 修改和調試預處理的 JavaScript

請在[將預處理代碼映射到源代碼](/web/tools/chrome-devtools/debug/readability/source-maps)中詳細瞭解如何在 Sources 面板中調試放大、編譯或轉譯的 JavaScript。


{# wf_devsite_translation #}
