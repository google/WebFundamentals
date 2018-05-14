project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:JavaScript 允许我们修改网页的方方面面：内容、样式以及它如何响应用户交互。不过，JavaScript 也会阻止 DOM 构建和延缓网页渲染。为了实现最佳性能，可以让您的 JavaScript 异步执行，并去除关键渲染路径中任何不必要的 JavaScript。

{# wf_updated_on:2014-09-17 #}
{# wf_published_on:2013-12-31 #}

# 使用 JavaScript 添加交互 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

JavaScript 允许我们修改网页的方方面面：内容、样式以及它如何响应用户交互。
不过，JavaScript 也会阻止 DOM 构建和延缓网页渲染。
为了实现最佳性能，可以让您的 JavaScript 异步执行，并去除关键渲染路径中任何不必要的 JavaScript。



### TL;DR {: .hide-from-toc }
- JavaScript 可以查询和修改 DOM 与 CSSOM。
- JavaScript 执行会阻止 CSSOM。
- 除非将 JavaScript 显式声明为异步，否则它会阻止构建 DOM。


JavaScript 是一种运行在浏览器中的动态语言，它允许我们对网页行为的几乎每一个方面进行修改：我们可以通过在 DOM 树中添加和移除元素来修改内容；我们可以修改每个元素的 CSSOM 属性；我们可以处理用户输入，等等。为进行说明，让我们用一个简单的内联脚本对之前的“Hello World”示例进行扩展：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/script.html){: target="_blank" .external }

* JavaScript 允许我们进入 DOM 并拉取对隐藏的 span 节点的引用 - 该节点可能未出现在渲染树中，却仍然存在于 DOM 内。然后，在我们获得引用后，就可以更改其文本（通过 .textContent），甚至可以将其计算的 display 样式属性从“none”替换为“inline”。现在，我们的页面显示“**Hello interactive students!**”。

* JavaScript 还允许我们在 DOM 中创建、样式化、追加和移除新元素。从技术上讲，我们的整个页面可以是一个大的 JavaScript 文件，此文件能够逐一创建元素并对其进行样式化。尽管这种方法可行，但是在实践中，使用 HTML 和 CSS 要简单得多。在 JavaScript 函数的第二部分，我们会创建一个新的 div 元素，设置其文本内容，对其进行样式化，然后将其追加到正文中。

<img src="images/device-js-small.png"  alt="网页预览">

我们通过以上示例修改了现有 DOM 节点的内容和 CSS 样式，并为文档添加了一个全新的节点。我们的网页不会赢得任何设计奖，但它说明了 JavaScript 赋予我们的能力和灵活性。

不过，尽管 JavaScript 为我们带来了许多功能，不过也在页面渲染方式和时间方面施加了更多限制。

首先，请注意上例中的内联脚本靠近网页底部。为什么呢？您真应该亲自尝试一下。如果我们将脚本移至 _span_元素之上，您就会注意到脚本运行失败，并提示在文档中找不到对任何 _span_ 元素的引用 - 即 _getElementsByTagName(‘span')_ 会返回 _null_。这透露出一个重要事实：我们的脚本在文档的何处插入，就在何处执行。当 HTML 解析器遇到一个 script 标记时，它会暂停构建 DOM，将控制权移交给 JavaScript 引擎；等 JavaScript 引擎运行完毕，浏览器会从中断的地方恢复 DOM 构建。

换言之，我们的脚本块找不到网页中任何靠后的元素，因为它们尚未接受处理！或者，稍微换个说法：**执行我们的内联脚本会阻止 DOM 构建，也就延缓了首次渲染。**

在网页中引入脚本的另一个微妙事实是，它们不仅可以读取和修改 DOM 属性，还可以读取和修改 CSSOM 属性。实际上，我们在示例中就是这么做的：将 span 元素的 display 属性从 none 更改为 inline。最终结果如何？我们现在遇到了竞态问题。

如果浏览器尚未完成 CSSOM 的下载和构建，而我们却想在此时运行脚本，会怎样？答案很简单，对性能不利：**浏览器将延迟脚本执行和 DOM 构建，直至其完成 CSSOM 的下载和构建。**

简言之，JavaScript 在 DOM、CSSOM 和 JavaScript 执行之间引入了大量新的依赖关系，从而可能导致浏览器在处理以及在屏幕上渲染网页时出现大幅延迟：

* 脚本在文档中的位置很重要。
* 当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行。
* JavaScript 可以查询和修改 DOM 与 CSSOM。
* JavaScript 执行将暂停，直至 CSSOM 就绪。

“优化关键渲染路径”在很大程度上是指了解和优化 HTML、CSS 和 JavaScript 之间的依赖关系谱。

## 解析器阻止与异步 JavaScript

默认情况下，JavaScript 执行会“阻止解析器”：当浏览器遇到文档中的脚本时，它必须暂停 DOM 构建，将控制权移交给 JavaScript 运行时，让脚本执行完毕，然后再继续构建 DOM。我们在前面的示例中已经见过内联脚本的实用情况。实际上，内联脚本始终会阻止解析器，除非您编写额外代码来推迟它们的执行。

通过 script 标签引入的脚本又怎样？让我们还用前面的例子，将代码提取到一个单独文件中：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script.html){: target="_blank" .external }

无论我们使用 &lt;script&gt; 标记还是内联 JavaScript 代码段，您都可以期待两者能够以相同方式工作。
在两种情况下，浏览器都会先暂停并执行脚本，然后才会处理剩余文档。不过，**如果是外部 JavaScript 文件，浏览器必须停下来，等待从磁盘、缓存或远程服务器获取脚本，这就可能给关键渲染路径增加数十至数千毫秒的延迟。**






默认情况下，所有 JavaScript 都会阻止解析器。由于浏览器不了解脚本计划在页面上执行什么操作，它会作最坏的假设并阻止解析器。向浏览器传递脚本不需要在引用位置执行的信号既可以让浏览器继续构建 DOM，也能够让脚本在就绪后执行；例如，在从缓存或远程服务器获取文件后执行。  

为此，我们可以将脚本标记为_异步_：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script_async.html){: target="_blank" .external }

向 script 标记添加异步关键字可以指示浏览器在等待脚本可用期间不阻止 DOM 构建，这样可以显著提升性能。

<a href="measure-crp" class="gc-analytics-event" data-category="CRP"
    data-label="Next / Measuring CRP">
  <button>下一课：评估关键渲染路径</button>
</a>


{# wf_devsite_translation #}
