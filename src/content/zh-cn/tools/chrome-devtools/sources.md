project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: 在 Chrome DevTools 的 Sources 面板中查看和编辑文件、创建代码段、调试 JavaScript 并设置工作区。

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-01-09 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Sources 面板概览 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

使用 Chrome DevTools **Sources** 面板可以：

* [查看文件](#files)。
* [编辑 CSS 和 JavaScript](#edit)。
* [创建和保存 JavaScript 的**代码段**](#snippets)，您可以在任何页面上运行此代码段。
  **代码段**与小书签相似。
* [调试 JavaScript](#debug)。
* [设置工作区](#workspace)，以将您在 DevTools 中作出的更改保存到文件系统的代码中。


## 查看文件 {: #files }

使用 **Network** 窗格可以查看页面已加载的所有资源。

<figure>
  <img src="images/sources-network-pane.png"
       alt="Network 窗格"/>
  <figcaption>
    <b>图 1</b>. <b>Network</b> 窗格
  </figcaption>
</figure>

**Network** 窗格的组织结构：

* 顶层（如<b>图 1</b> 中的 `top`）表示 [HTML 帧][frame]。
  您在访问的每个页面上都可找到 `top`。 `top` 表示主文档帧。
* 第二层（如<b>图 1</b> 中的 `developers.google.com`）表示[来源][origin]。
* 第三层、第四层等等，表示从该来源加载的目录和资源。
 例如，在<b>图 1</b> 中，资源 `devsite-googler-button` 的完整路径是 `developers.google.com/_static/f6e16de9fa/css/devsite-googler-button`



[frame]: https://www.w3.org/TR/html401/present/frames.html
[origin]: https://www.w3.org/TR/2011/WD-html5-20110525/origin-0.html

在 **Network** 窗格中点击文件可以在 **Editor** 窗格中查看其内容。 您可以查看任何类型的文件。
 如果是图像文件，您可以查看图像的预览版本。

<figure>
  <img src="images/sources-editor-pane.png"
       alt="在 Editor 窗格中查看文件"/>
  <figcaption>
    <b>图 2</b>. 在 <b>Editor</b> 窗格中查看 <code>jquery-bundle.js</code> 的内容
    
  </figcaption>
</figure>

## 编辑 CSS 和 JavaScript {: #edit }

使用 **Editor** 窗格编辑 CSS 和 JavaScript。  DevTools 会更新页面以运行您的新代码。
 例如，如果编辑某元素的 `background-color`，更改将立即生效。


<figure>
  <img src="images/edit-css.gif"
       alt="在 Editor 窗格中编辑 CSS"/>
  <figcaption>
    <b>图 3</b>. 在 <b>Editor</b> 窗格中编辑 CSS，以将元素的背景颜色从蓝色更改为红色
  </figcaption>

</figure>

CSS 更改操作会立即生效，且不需要保存。 要让 JavaScript 更改操作生效，需按 <kbd>Command</kbd>+<kbd>S</kbd> (Mac) 或 <kbd>Control</kbd>+<kbd>S</kbd>（Windows、Linux）。
DevTools 不能重新运行脚本，因此只有在函数内作出的 JavaScript 更改才会生效。
 例如，注意在<b>图 4</b> 中，`console.log('A')` 没有运行，而 `console.log('B')` 运行。
 如果 DevTools 在作出更改后重新运行整个脚本，则系统会将文本 `A` 记录到 **Console** 中。


<figure>
  <img src="images/edit-js.gif"
       alt="在 Editor 窗格中编辑 JavaScript"/>
  <figcaption>
    <b>图 5</b>. 在 <b>Editor</b> 窗格中编辑 JavaScript
  </figcaption>
</figure>

重新加载页面后，DevTools 会清空您的 CSS 和 JavaScript 更改内容。 如需了解如何将更改内容保存到文件系统中，请参阅[设置工作区](#workspace)。



## 创建、保存和运行代码段 {: #snippets }

代码段是可在任何页面上运行的脚本。 假设为将 jQuery 库插入页面中，您在 **Console** 中反复输入以下代码，以便从 **Console** 运行 jQuery 命令：



    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    script.crossOrigin = 'anonymous';
    script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
    document.head.appendChild(script);

不过，您可以在 **Snippet** 中保存此代码，并在需要时通过点击几个按钮运行该代码。
 DevTools 可将此**代码段**保存到您的文件系统中。

<figure>
  <img src="images/snippet.png"
       alt="将 jQuery 库插入页面的代码段。"/>
  <figcaption>
    <b>图 6</b>. 将 jQuery 库插入页面的<b>代码片段</b>
  </figcaption>
</figure>

运行**代码段**：

* 通过 **Snippets** 窗格打开文件，然后点击 **Run** ![Run 按钮][run]{:.cdt-inl}。
* 打开 [**Command Menu**][CM]、删除 `>` 字符、输入 `!`、输入您**代码段**的名称，然后按 <kbd>Enter</kbd> 键。


[CM]: /web/tools/chrome-devtools/ui#command-menu
[run]: images/run-snippet.png

如需了解详情，请参阅[从任何页面运行代码段][snip]。

[snip]: /web/tools/chrome-devtools/snippets

## 调试 JavaScript {: #debug }

与其使用 `console.log()` 推断 JavaScript 出错的地方，不如考虑使用
Chrome DevTools 调试工具。 其总体思路是在代码中有意停止执行代码的位置设置断点，然后一次一行地单步调试执行代码。
 在单步调试代码时，您可以查看和更改当前定义的所有属性和变量的值，在 **Console** 中运行 JavaScript 等等。


如需了解在 DevTools 中调试的基础知识，请参阅 [JavaScript 调试入门](/web/tools/chrome-devtools/javascript/)。


<figure>
  <img src="images/debugging.png"
       alt="调试 JavaScript"/>
  <figcaption>
    <b>图 7</b>. 调试 JavaScript
</figcaption>
</figure>

## 设置工作区 {: #workspace }

默认情况下，在 **Sources** 面板中编辑文件后，这些更改内容会在重新加载页面时丢失。
 您可以通过 **Workspaces**，将您在 DevTools 中作出的更改保存到您的文件系统中。
 这样，您基本上可将 DevTools 用作代码编辑器。

如需入门信息，请参阅[使用 DevTools 的工作区设置持久化][WS]。

[WS]: /web/tools/chrome-devtools/workspaces/

## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
