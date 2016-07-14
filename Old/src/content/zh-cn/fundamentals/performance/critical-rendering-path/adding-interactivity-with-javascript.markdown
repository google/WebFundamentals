---
title: "使用 JavaScript 添加交互"
description: "JavaScript 允许我们修改页面的方方面面：内容、样式以及它如何响应用户交互。但是，JavaScript 也会阻塞 DOM 构建，延缓页面渲染。我们可以让我们的 JavaScript 异步加载，消除关键渲染路径中不必要的 JavaScript，来提供更佳性能。"
updated_on: 2014-09-18
translators:
  - samchen
key-takeaways:
  adding-interactivity:
    - JavaScript 可以查询、修改 DOM 与 CSSOM。
    - JavaScript 的执行因 CSSOM 而阻塞。
    - 除非明确声明 DOM 构建为异步，否则 JavaScript 会阻塞这一流程。
---
<p class="intro">
  JavaScript 允许我们修改页面的方方面面：内容、样式以及它如何响应用户交互。但是，JavaScript 也会阻塞 DOM 构建，延缓页面渲染。我们可以让我们的 JavaScript 异步加载，消除关键渲染路径中不必要的 JavaScript，来提供更佳性能。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.adding-interactivity %}

JavaScript 是一门运行在浏览器上的动态语言，它允许我们修改页面上的种种：我们可以向 DOM 树添加或移除元素来修改页面内容，我们可以修改任一个元素的 CSSOM 属性，我们可以处理用户输入，等等。为了实际演示，我们用内联脚本扩展下之前的 "Hello World" 示例：

{% include_code src=_code/script.html snippet=full %}

* JavaScript 允许我们进入 DOM，取得隐藏的 span 节点的引用，该节点可能不在渲染树中出现，但它仍在 DOM 里。有了引用后，我们就可以修改它的文本（通过 .textContent），甚至可以将其计算的 display 样式属性从 'none' 改成 'inline'。完成上述后，我们的页面现在会显示 "**Hello interactive students!**"。

* JavaScript 还允许我们在 DOM 上创建、样式化，然后添加或移除新元素。事实上，技术上说，我们的整个页面可以只是一个大 JavaScript 文件，逐个创建并样式化元素 - 这种方法行得通，但实践中使用 HTML 和 CSS 要简单得多。在我们的 JavaScript 函数的第二部分，我们创建了一个新 div 元素，设置它的文本内容，样式化它，然后将它添加到 body 中。

<img src="images/device-js-small.png" class="center" alt="页面预览">

这样，我们修改了现有 DOM 节点的内容与 CSS 样式，在文档中添加了一个全新节点。我们的页面不会赢得任何设计奖，但是它演示了 JavaScript 赋予我们的力量与灵活。

只不过，这里潜藏着一个大的性能问题。JavaScript 赋予我们许多能力，但它也同时给页面如何及何时渲染带来了许多额外限制。

首先，请注意，上面示例中，我们的内联脚本靠近页面底部。为什么？你应该自己试一把。如果我们把脚本移到 _span_ 元素上方，你会发现脚本不起作用，并提示无法在文档中找到任何 _span_ 元素的引用，即 _getElementsByTagName('span')_ 会返回 _null_。这透露一个重要事实：我们的脚本在文档的哪儿插入，即在哪儿执行。HTML 解析器遇到一个 script 标签，它会暂停构建 DOM，并移交控制权给 JavaScript 引擎；等 JavaScript 引擎执行完毕，浏览器从中断的地方恢复 DOM 构建。

换句话说，我们的脚本块找不到页面中靠后的元素，因为这些元素尚未处理到。或者，稍微换个说法：**执行内联脚本会阻塞 DOM 构建，也就延缓了首次渲染。**

页面上引用脚本的另一个微妙事实是，它们不仅可以读取、修改 DOM，它们还可以读取、修改 CSSOM。事实上，这也正是我们在例子中所做的，将 span 元素的 display 属性从 none 改为 inline。最终结果？我们现在有一个竞态。

如果浏览器尚未完成 CSSOM 下载与构建，而我们就想运行我们的脚本，会怎样？答案很简单，对性能不好：**浏览器会延迟脚本执行，直到完成 CSSOM 下载与构建，而在我们等待时，DOM 构建同样被阻塞。**

简言之，JavaScript 在 DOM、CSSOM 和 JavaScript 执行间引入了很多新的依存关系，导致浏览器在处理和渲染页面上出现大幅延迟：

1. 脚本在文档中的位置很重要。
2. 遇到 script 标签时，DOM 构建停止，直到脚本执行完毕。
3. JavaScript 可以查询、修改 DOM 和 CSSOM。
4. CSSOM 准备就绪前，JavaScript 执行被延后。

我们谈论「优化关键渲染路径」时，很大程度上是在谈论理解、优化 HTML、CSS 与 JavaScript 之间的依存关系谱。


## 解析器阻塞 vs. 异步 JavaScript

默认情况下，JavaScript 执行会阻塞解析器：当浏览器在文档中遇到一个 script，它必须暂停 DOM 构建，移交控制权给 JavaScript 运行时，让脚本先执行，然后才继续处理 DOM。在前面的示例中，我们已经了解内联脚本的情况。事实上，内联脚本始终会阻塞解析器，除非你十分小心，编写额外代码来推迟它们的执行。

通过 script 标签引入的脚本又怎样？让我们拿前面的示例说，把代码提取到一个单独文件中：

{% include_code src=_code/split_script.html snippet=full %}

**app.js**

{% include_code src=_code/app.js snippet=full lang=javascript %}

你觉得我们使用 `<script>` 标签代替内联 JavaScript 代码段，执行顺序会有所不同吗？答案是不会，因为这些代码是一样的，所以结果会一样。在两个示例中，浏览器均须先暂停，然后执行脚本，之后才能处理文档的剩余部分。只不过说，**在外部 JavaScript 文件情况中，浏览器必须暂停，然后等待脚本从磁盘、缓存或远程服务器中取回，这就又可能给我们的关键渲染路径增加了数以万毫秒计的延迟。**

尽管如此，好消息是，我们有应急出口。默认情况下，所有 JavaScript 均会阻塞解析器，因为浏览器不知道脚本想在页面上做什么，因此它必须假定最糟的状况并阻塞解析器。但是，如果我们能够告知浏览器说，脚本无需在文档中引用它的确切位置被执行呢？如此一来，浏览器会继续构建 DOM，并在脚本准备就绪后（比如，从缓存或远程服务器中加载完文件）执行脚本。

那么，我们如何实现这种方法呢？很简单，我们可以将脚本标记为 _async_：

{% include_code src=_code/split_script_async.html snippet=full %}

将 async 关键字添加到 script 标签，告诉浏览器，在它等脚本准备就绪前不应阻塞 DOM 构建，这将是性能上的巨大提升！



