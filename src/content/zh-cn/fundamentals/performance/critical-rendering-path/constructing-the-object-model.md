project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 浏览器要在屏幕上渲染内容，需要先构建 DOM 与 CSSOM 树。因此，我们需要确保将 HTML 和 CSS 尽可能快地提供给浏览器。

{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

# 构建对象模型 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Translated By: 

{% include "web/_shared/contributors/samchen.html" %}



浏览器要在屏幕上渲染内容，需要先构建 DOM 与 CSSOM 树。因此，我们需要确保将 HTML 和 CSS 尽可能快地提供给浏览器。



### TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''


## 文档对象模型 (DOM)


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

让我们从最简单的可能情况开始说：一个普通 HTML 网页，包含一些文字，一张图片。浏览器需要做什么才能处理这个简单页面呢？

<img src="images/full-process.png" alt="DOM 构建过程">

1. **转换：**浏览器从磁盘或网络读取 HTML 的原始字节，然后根据指定的文件编码格式（例如 UTF-8）将其转换为相应字符。
2. **符号化：**浏览器将字符串转换为 [W3C HTML5 标准](http://www.w3.org/TR/html5/){: .external } 指定的各种符号 - 比如 "<html>"、"<body>" 及其他「尖括号」内的字符串。每个符号都有特殊含义并一套规则。
3. **词法分析：**发射的符号转换为「对象」，定义它们的属性与规则。
4. **DOM 构建：**最后，因为 HTML 标记定义不同标签间的相互关系（某些标签嵌套在其他标签中），所以创建的对象在树状数据结构中互相链接，树状数据结构还捕获原始标记中定义的父子关系：比如 _HTML_ 对象是 _body_ 对象的父对象，_body_ 是 _paragraph_ 对象的父对象等等。

<img src="images/dom-tree.png" class="center" alt="DOM 树">

**上述整个流程的最终输出是文档对象模型，即这个简单网页的 "DOM"，浏览器使用它完成页面的所有后续处理。**

每次浏览器处理 HTML 标记，都要完成上述各个步骤：将字节转换为字符，确认符号，将符号转换为节点，然后构建 DOM 树。整个过程需要一些时间，处理大量 HTML 时更是如此。

<img src="images/dom-timeline.png" class="center" alt="在 DevTools 中跟踪 DOM 的构建">

Note: 我们假定您对 Chrome DevTools 有基本了解 - 也就是说，您知道如何捕获网络瀑布图，或是录制时间轴。如果您需要快速重温，请访问 <a href="https://developer.chrome.com/devtools">Chrome DevTools 文档</a>，又或您是首次使用 DevTools，我们建议学习 Codeschool <a href="http://discover-devtools.codeschool.com/">发现 DevTools</a> 课程。

如果您打开 Chrome DevTools，并在页面加载时录制时间轴，你可以看到执行这一步骤所需的实际时间 &mdash; 在上例中，将一堆 HTML 字节转换为 DOM 树大约需要 5 毫秒。当然，如果页面更大（大多数页面都是如此），这个过程需要的时间估计会更多。在后面创建流畅动画的章节中，您会看到，如果浏览器必须处理大量 HTML，这很可能变成你的瓶颈。

DOM 树准备就绪后，我们是否就有足够信息在屏幕上渲染页面了？还不行！DOM 树捕获文档标记的属性及关系，但没有告诉我们元素在渲染时是什么样子。这是 CSSOM 的责任，也就是我们接下来要讲的。

## CSS 对象模型 (CSSOM)

浏览器在构建我们的简单页面 DOM 时，在文档的 head 部分碰上一个 link 标签，引用了外部 CSS 样式表 style.css。浏览器预见到它会需要这个资源来渲染页面，因此会立即发出一个该资源的请求，该请求返回以下内容：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full"   adjust_indentation="auto" %}
</pre>

当然，我们本可以在 HTML 标记中直接声明样式（内联），但是，将 CSS 与 HTML 分开，我们就可以分离关注点：设计人员处理 CSS，开发人员关注 HTML，等等。

与 HTML 一样，我们需要将收到的 CSS 规则转换为浏览器可以理解、能够处理的东西。因此，我们再重复一次与处理 HTML 非常相似的过程：

<img src="images/cssom-construction.png" class="center" alt="CSSOM 构建步骤">

CSS 字节会转换为字符，然后转换为符号和节点，最后链接进树状结构上，即所谓「CSS 对象模型」，缩写为 CSSOM：

<img src="images/cssom-tree.png" class="center" alt="CSSOM 树">

CSSOM 为什么采用树状结构？ 在给页面上的一切对象计算最终的样式集时，浏览器会先从应用给该节点的最通用规则开始（例如，如果节点是 body 元素的子元素，则应用所有 body 样式），然后，通过应用更具体的规则递归细化计算的样式 - 亦即规则「向下层叠」。

再具体点说，我们来看一下上面的 CSSOM 树。body 元素中 _span_ 标记内包含的任何文字均是 16 像素字体大小，红色文本 - font-size 指令从 body 向下层叠到 span。但是，如果 span 标签是 paragraph (p) 标签的子标签，则它的内容不会显示。

此外，请注意，上面的树不是完整的 CSSOM 树，它只显示了我们决定在样式表中覆盖的样式。每个浏览器都会提供一套默认的样式，也称为「用户代理样式」 -- 即我们不提供任何自定义样式时看到的样式 -- 我们的样式只是覆盖这些默认样式集（例如 [默认 IE 样式](http://www.iecss.com/){: .external }）。如果您曾在 Chrome DevTools 中检查过「计算的样式」，并且想知道所有样式从何来，现在您应该知道答案了！

好奇 CSS 处理需要的时间？ 在 DevTools 中录制时间轴，并查找 "Recalculate Style" 事件：与 DOM 解析不同，timeline 不显示单独的 "Parse CSS" 条目，而是在 "Recalculate Style" 这一个事件下一同捕获解析、CSSOM 树的构建及计算的样式的递归计算。

<img src="images/cssom-timeline.png" class="center" alt="在 DevTools 中跟踪 CSSOM 的构建">

处理我们的小样式表需要大约 0.6 毫秒，影响网页上的 8 个元素 -- 时间不多，但也会产生成本。只不过，8 个元素从何而来呢？CSSOM 和 DOM 是独立的数据结构。结果证明，浏览器隐藏了一个重要步骤。接下来，让我们聊聊将 DOM 与 CSSOM 链接在一起的渲染树。



