project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:了解如何设置 CSS 与 JS 预处理器以帮助您高效地编写代码。

{# wf_updated_on:2015-08-03 #}
{# wf_published_on:2015-08-03 #}

# 设置 CSS 与 JS 预处理器 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

正确使用 CSS 预处理器（如 Sass、JS 预处理器和转译器）可以极大地提高您的开发速度。了解如何设置。


### TL;DR {: .hide-from-toc }
- 预处理器让您可以使用浏览器原生不支持的 CSS 和 JavaScript 中的功能，如 CSS 变量。
- 如果您使用预处理器，可以使用 Source Maps 将原始源文件映射到渲染的输出。
- 确保您的网络服务器能够提供 Source Maps。
- 使用支持的预处理器自动生成 Source Maps。


## 什么是预处理器？

预处理器可以获取任意的源文件，并将其转换成浏览器可以识别的内容。 

输出为 CSS 时，可以使用预处理器添加以下功能（如果不使用预处理器，则不会存在这些功能）：CSS 变量、嵌套，等等。这个类别中显著的例子是 [Sass](http://sass-lang.com/)、[Less](http://lesscss.org/){: .external } 和 [Stylus](https://learnboost.github.io/stylus/)。

输出为 JavaScript 时，它们可以从完全不同的语言转换（编译），或者将超集或新语言标准转换（转译）为当前的标准。这个类别中显著的例子是 [CoffeeScript](http://coffeescript.org/){: .external } 和 ES6（通过 [Babel](https://babeljs.io/)）。

## 调试和修改预处理的内容

只要您在浏览器中且使用 DevTools [修改您的 CSS](/web/tools/chrome-devtools/inspect-styles/edit-styles) 或调试 JavaScript，就会出现一个非常明显的问题：您正在浏览的内容没有反映源，而且不会真的帮助您解决问题。

为了解决问题，最现代的预处理器支持一种名称为 <b>Source Maps</b> 的功能。

### 什么是 Source Maps？

源映射是一种基于 JSON 的映射格式，可以在缩小的文件与其源之间建立关系。如果您为生产而构建，缩小和合并 JavaScript 文件时，还会生成包含原始文件相关信息的源映射。

### Source Maps 的工作方式

对于生成的每个 CSS 文件，除了编译的 CSS，CSS 预处理器还会生成源映射文件 (.map)。源映射文件是 JSON 文件，会在每个生成的 CSS 声明与源文件相应行之间定义映射。

每个 CSS 文件均包含指定源映射文件网址的注解，嵌入文件最后一行上的特殊注释中：

    /*# sourceMappingURL=<url> */

例如，假设存在一个名为 **styles.scss** 的 Sass 源文件：

    %$textSize: 26px;
    $fontColor: red;
    $bgColor: whitesmoke;
    h2 {
        font-size: $textSize;
        color: $fontColor;
        background: $bgColor;
    }

Sass 会生成 CSS 文件 **styles.css**，包含 sourceMappingURL 注解：

    h2 {
      font-size: 26px;
      color: red;
      background-color: whitesmoke;
    }
    /*# sourceMappingURL=styles.css.map */

下方为一个源映射文件示例：

    {
      "version": "3",
      "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK"
      "sources": ["sass/styles.scss"],
      "file": "styles.css"
    }

## 验证网络服务器可以提供 Source Maps

一些网络服务器（如 Google App 引擎）需要适用于提供的每个文件类型的显式配置。这种情况下，需要为您的 Source Maps 提供 MIME 类型的 `application/json`，但实际上 Chrome 可以[接受任何内容类型](https://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files)，例如 `application/octet-stream`。

### 奖励：通过自定义标题进行源映射 

如果您不希望文件中存在其他注释，请使用缩小的 JavaScript 文件上的 HTTP 标题字段告知 DevTools 在哪里可以找到源映射。这需要配置或自定义您的网络服务器，不在本文档的介绍范围内。

    X-SourceMap: /path/to/file.js.map

像注释一样，它也可以告知 DevTools 和其他工具在哪里可以查找与 JavaScript 文件关联的源映射。此标题也可以解决以不支持单行注释的语言引用 Source Maps 的问题。

## 支持的预处理器

几乎任何编译到 JavaScript 的语言都可以立即生成 Source Maps，包括 Coffeescript、TypeScript、JSX 等。您也可以在 Node 内的服务器侧、通过 Sass、Less 等的 CSS 中使用 Source Maps，使用可以为您提供节点式需求的 browserify 以及会提高整洁效果的缩小工具（如 uglify-js）生成多级别 Source Maps。

### JavaScript

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">编译器</th>
      <th width="40%" data-th="Command">命令</th>
      <th data-th="Instructions">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://coffeescript.org/#source-maps">CoffeeScript</a></td>
      <td data-th="Command"><code>$ coffee -c square.coffee -m</code></td>
      <td data-th="Instructions">编译器只需要 -m (--map) 标记即可输出源映射，也会为输出文件添加 sourceMapURL 注释指令。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://www.typescriptlang.org/">TypeScript</a></td>
      <td data-th="Command"><code>$ tsc -sourcemap square.ts</code></td>
      <td data-th="Instructions">-sourcemap 标记会生成映射并添加注释指令。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/google/traceur-compiler/wiki/SourceMaps">Traceur</a></td>
      <td data-th="Command"><code>$ traceur --source-maps=[file|inline]</code></td>
      <td data-th="Instructions">对于 <code>--source-maps=file</code>，每个以 <code>.js</code> 结尾的输出文件都会有一个以 <code>.map</code> 结尾的源映射文件；对于  <code>source-maps='inline'</code>，每个以 <code>.js</code> 结尾的输出文件结尾的注释都会包含编码在 <code>data:</code> 网址中的源映射。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://babeljs.io/docs/usage/cli/#compile-with-source-maps">Babel</a></td>
      <td data-th="Command"><code>$ babel script.js --out-file script-compiled.js --source-maps</code></td>
      <td data-th="Instructions">使用 --source-maps 或 -s 生成 Source Maps。使用 <code>--source-maps inline</code> 生成内嵌 Source Maps。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/mishoo/UglifyJS2">UglifyJS</a></td>
      <td data-th="Command"><code>$ uglifyjs file.js -o file.min.js --source-map file.min.js.map</code></td>
      <td data-th="Instructions">这是生成“file.js”源映射所需的非常基本的命令。这也会为输出文件添加注释指令。</td>
    </tr>
  </tbody>
</table>

### CSS

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">编译器</th>
      <th width="40%" data-th="Command">命令</th>
      <th data-th="Instructions">说明</th>
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
      <td data-th="Instructions">在 1.5.0 中实现。请参阅<a href="https://github.com/less/less.js/issues/1050#issuecomment-25566463">问题 #1050</a> 了解详细信息和使用模式。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
      <td data-th="Command"><code>$ stylus --sourcemaps styles.style styles.css</code></td>
      <td data-th="Instructions">这会将源映射作为 base64 编码的字符串直接嵌入到输出文件中。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://compass-style.org/">Compass</a></td>
      <td data-th="Command"><code>$ sass --compass --sourcemap --watch scss:css</code></td>
      <td data-th="Instructions">或者，您也可以将 `sourcemap: true` 添加到 config.rb 文件中。</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></td>
      <td data-th="Command"><code></code></td>
      <td data-th="Instructions">请点击链接查看如何使用此编译器以及兼用输入源映射。</td>
    </tr>
  </tbody>
</table>

## Source Maps 与 DevTools

现在，您已经正确地设置了 Source Maps，DevTools 已内置对基于 CSS 和 JS 的 Source Maps 的支持，这一点可能会让您很高兴。

### 修改预处理的 CSS

请转至[修改 Sass、Less 或 Stylus](/web/tools/chrome-devtools/inspect-styles/edit-styles)，详细了解如何在 DevTools 内直接修改和刷新链接至源映射的样式。

### 修改和调试预处理的 JavaScript

请在[将预处理代码映射到源代码](/web/tools/chrome-devtools/debug/readability/source-maps)中详细了解如何在 Sources 面板中调试放大、编译或转译的 JavaScript。


{# wf_devsite_translation #}
