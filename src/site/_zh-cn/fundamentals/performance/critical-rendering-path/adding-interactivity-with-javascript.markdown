---
layout: article
title: "使用 JavaScript 添加互动内容"
description: "通过 JavaScript，我们可以修改网页的各个方面：内容、样式以及与用户互动的行为。但是，JavaScript 也会阻止 DOM 构建并使网页呈现时间出现延迟。采用 JavaScript 异步编程，并消除关键呈现路径中的不必要 JavaScript，以提供最佳性能。"
introduction: "通过 JavaScript，我们可以修改网页的各个方面：内容、样式以及与用户互动的行为。但是，JavaScript 也会阻止 DOM 构建并使网页呈现时间出现延迟。采用 JavaScript 异步编程，并消除关键呈现路径中的不必要 JavaScript，以提供最佳性能。"
article:
  written_on: 2014-01-01
  updated_on: 2014-09-18
  order: 4
collection: critical-rendering-path
authors:
  - ilyagrigorik
key-takeaways:
  adding-interactivity:
    - JavaScript 可以查询和修改 DOM 和 CSSOM。
    - CSSOM 上的 JavaScript 执行区块。
    - 除非明确声明 DOM 构建为异步，否则 JavaScript 会阻止这一流程。
---
{% wrap content %}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.adding-interactivity %}

JavaScript 是一种在浏览器中运行的动态语言，可让我们修改网页行为方式的各个方面：我们可以通过向 DOM 树添加或从中移除元素来修改网页内容；我们可以修改每个元素的 CSSOM 属性；还可以处理用户输入等更多内容。为了实际说明 JavaScript 的功能，我们来用简单的内联脚本扩展前面的'Hello World'示例：

{% include_code _code/script.html full %}

* 通过 JavaScript，我们可以访问 DOM，并提取出对隐藏的 span 节点的引用，该节点可能不会出现在呈现树中，但它仍然在 DOM 中！ 有了引用之后，我们便可以更改它的文本（通过 .textContent），甚至可以将其经过计算的显示样式属性从`none`改为`inline`。完成上述所有步骤后，我们的页面将会显示'**Hello interactive students!**'。

* 通过 JavaScript，我们还可以为 DOM 新建元素、设计新元素样式，并向其附加或从中移除新元素。实际上，从技术层面上讲，我们的整个页面可能只是一个大型 JavaScript 文件，该文件逐个创建元素并定义元素样式；这种方法虽然行得通，但是使用 HTML 和 CSS 要简单得多。在 JavaScript 函数的第二部分，我们创建了新的 div 元素、为它设置了文本内容、设计了样式，并将其附加到了正文中。

<img src="images/device-js-small.png" class="center" alt="网页预览">

通过这些操作，我们修改了现有 DOM 节点的内容和 CSS 样式，并为文档添加了全新的节点。我们的网页无法赢得任何设计奖项，但是它体现了 JavaScript 赋予我们的强大功能和灵活性。

尽管如此，它仍然潜藏着较大的性能问题。JavaScript 可为我们提供许多功能，但是它也给页面呈现方式和时间带来了很多额外的限制。

首先请注意，在上述示例中，我们的内联脚本靠近页面底部。为什么？ 试一下就知道了。如果我们将脚本移到 _span_ 元素的上方，您会发现脚本不起作用，并提示无法在文档中找到对任何 _span_ 元素的引用，即 _getElementsByTagName(`span`)_ 会返回 _null_。这表明一个重要的特性：我们的脚本会在文档中插入的确切点执行。HTML 解析器遇到脚本代码时，它会暂停构建 DOM 的流程，并对 JavaScript 引擎进行控制；JavaScript 引擎运行完后，浏览器就会从断开的地方继续运行并恢复 DOM 构建。

换句话说，我们的脚本区块找不到网页中靠下的元素，因为这些元素尚未被处理！ 我们也可以稍微变换下说法：**执行内联脚本会阻止 DOM 构建，也会使首次呈现出现延迟。**

将脚本引入网页的另一个隐性特性是：这些脚本不仅可以读取和修改 DOM 属性，还可以读取和修改 CSSOM 属性。事实上，这正是我们在将 span 元素的显示属性从`none`更改为`inline`时，在示例中所执行的操作。最终结果如何？ 我们现在处于竞争环境下。

如果我们想运行脚本时浏览器尚未完成 CSSOM 的下载和构建操作，结果会如何？ 答案很简单，会影响性能：**浏览器会将脚本执行延迟到完成 CSSOM 下载和构建之后；在我们等待时，DOM 构建也会被阻止！**

简言之，JavaScript 在 DOM、CSSOM 和 JavaScript 执行之间引入了很多依存关系，而且会使浏览器在处理和在屏幕上呈现网页的速度方面出现大幅延迟：

1. 脚本在文档中的位置很重要。
2. DOM 构建在遇到脚本代码时，以及在脚本执行完之前，将处于暂停状态。
3. JavaScript 可以查询和修改 DOM 和 CSSOM。
4. CSSOM 准备就绪之前，JavaScript 执行会出现延迟。

我们谈论'优化关键呈现路径'时，很大程度上是在谈论理解和优化 HTML、CSS 和 JavaScript 之间的依存关系图。


## 解析器阻止与异步 JavaScript

默认情况下，JavaScript 执行是一种阻止解析器的行为：当浏览器遇到文档中的脚本时，它必须暂停 DOM 构建、移交对 JavaScript 运行时的控制，并在继续处理 DOM 构建之前执行脚本。在前面的示例中，我们已经实际了解了具有内联脚本的这类操作。事实上，内联脚本始终会阻止解析器，除非您特意编写其他代码来推迟它们的执行。

通过脚本代码添加的脚本会怎样？ 让我们以前面的示例为分析对象，并将代码提取到一个单独的文件中：

{% include_code _code/split_script.html full %}

**app.js**

{% include_code _code/app.js full javascript %}

当我们使用 `<script>` 代码代替内联 JavaScript 代码段时，执行顺序会有所不同吗？ 当然不会，因为这些代码是一样的，且应该会以相同的方式发挥作用。在这两个示例中，浏览器均必须暂停并执行脚本，然后才能处理文档的剩余部分。**即使是外部 JavaScript 文件，浏览器也必须暂停，并等待系统从磁盘、缓存或远程服务器中提取脚本，这可能会使关键呈现路径的延迟时间增加数万毫秒。**

尽管如此，但好消息是我们有应急路径！ 默认情况下，所有 JavaScript 均会阻止解析器，因为浏览器不知道脚本想在网页上执行什么操作，因此浏览器必须假定最糟糕的状况并阻止解析器。但是，如果我们能够向浏览器发送信号并告诉它脚本无需在它在文档中被引用的确切点执行，会怎么样呢？ 如此一来，浏览器会继续构建 DOM，并在脚本准备就绪后（例如，从缓存或远程服务器中提取到文件之后）执行脚本。

那么，我们如何实现这种方法呢？ 很简单，我们可以将脚本标记为 _async_：

{% include_code _code/split_script_async.html full %}

将异步关键字添加到脚本代码中，告诉浏览器在等待脚本准备就绪之前不应阻止 DOM 构建，这将是性能方面的巨大提升！

{% include modules/nextarticle.liquid %}

{% endwrap %}

