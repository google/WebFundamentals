project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:保持您的客户端代码便于阅读和调试，即使在您组合、缩减或编译代码后也应如此。

{# wf_updated_on:2015-04-21 #}
{# wf_published_on:2015-04-13 #}

# 将预处理代码映射到源代码 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

保持您的客户端代码便于阅读和调试，即使在您组合、缩减或编译代码后也应如此。使用源映射将您的源代码映射到编译的代码。


### TL;DR {: .hide-from-toc }
- 使用 Source Maps 将缩减的代码映射到源代码。随后，您可以在其原始来源中阅读和调试编译的代码。
- 仅使用<a href=''/web/tools/setup/setup-preprocessors?#supported-preprocessors''>可以产生 Source Maps 的预处理器</a>。
- 验证您的网络服务器可以提供 Source Maps。


## 预处理器使用入门

本文将说明如何与 DevTools Sources 面板中的 JavaScript Source Maps 交互。要初步了解什么是预处理器、它们的作用以及 Source Maps 的工作方式，请转至[设置 CSS 和 JS 预处理器](/web/tools/setup/setup-preprocessors?#debugging-and-editing-preprocessed-content)。

## 使用支持的预处理器

您需要使用可以创建源映射的压缩工具。有关最常用的选项，[请参见我们的预处理器支持部分](/web/tools/setup/setup-preprocessors?#supported-preprocessors)。要详细查看，请参见[源映射：语言、工具和其他信息](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info) Wiki 页面。

Source Maps 一般与下列类型的预处理器搭配使用：

* 转译器（[Babel](https://babeljs.io/){: .external }、[Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started)）
* 编译器（[Closure Compiler](https://github.com/google/closure-compiler)、[TypeScript](http://www.typescriptlang.org/){: .external }、[CoffeeScript](http://coffeescript.org) 和 [Dart](https://www.dartlang.org)）
* Minifiers ([UglifyJS](https://github.com/mishoo/UglifyJS))

## DevTools Sources 面板中的 Source Maps

预处理器中的 Source Maps 可以使 DevTools 加载缩减代码与原始文件。然后，您可以使用原始文件设置断点和浏览代码。同时，Chrome 也会运行您的缩减代码。这会让您感觉到就像在生产环境中运行开发网站一样。

在 DevTools 中运行 Source Maps 时，您会注意到 JavaScript 不会编译，也会看到 Source Maps 引用的所有 JavaScript 文件。这是使用源映射，不过后台却在实际运行编译的代码。任何错误、日志和断点都将映射到开发代码，从而实现出色的调试！因此，您会感觉到就像在生产环境中运行开发网站一样。

### 在设置中启用 Source Maps

Source Maps 默认处于启用状态（自 Chrome 39 开始），不过，如果您想要仔细检查或启用它们，请先打开 DevTools，然后点击设置配置 ![齿轮](imgs/gear.png){:.inline}。在 **Sources**下，选中 **Enable JavaScript Source Maps**。您也可以选中 **Enable CSS Source Maps**。

![启用 Source Maps](imgs/source-maps.jpg)

### 使用 Source Maps 调试

[调试代码](/web/tools/chrome-devtools/debug/breakpoints/step-code) 和启用 Source Maps 时，Source Maps 将在两个地方显示：

1. 控制台中（指向来源的链接应是原始文件，而不是生成的文件）
2. 逐步执行代码时（调用堆栈中的链接应打开原始的源文件）

## @sourceURL 和 displayName

虽然不是 Source Map 规范的一部分，`@sourceURL` 仍然可以让您在处理 eval 时将开发变得更轻松。此帮助程序非常类似于 `//# sourceMappingURL` 属性，并且实际上在 Source Map V3 规范中也有所提及。

通过将下面的特殊注释包含到代码中（将进行 eval 处理），您可以命名 eval 和内嵌脚本与样式，使其在 DevTools 中以更具逻辑的名称显示。

`//# sourceURL=source.coffee`

导航到此**[演示](http://www.thecssninja.com/demo/source_mapping/compile.html)**，然后执行以下操作：


* 打开 DevTools 并转至 **Sources** 面板。
* 将一个文件名输入“Name your code:”输入字段。
* 点击 **compile** 按钮。
* 将出现一条提醒，以及 CoffeeScript 源的评估和。

如果您展开“Sources”子面板，现在您会看到一个具有您之前输入的自定义文件名的新文件。如果您双击来查看此文件，它将包含我们原始来源的已编译 JavaScript。不过，最后一行将是 `// @sourceURL` 注释，指示原始的源文件是什么。处理语言抽象时，这样可以为调试提供很大帮助。

![使用 sourceURL](imgs/coffeescript.jpg)




{# wf_devsite_translation #}
