---
layout: article
title: "构建对象模型"
description: "浏览器需要先构建 DOM 和 CSSOM 树，才能在屏幕上呈现内容。因此，需要确保尽快将 HTML 和 CSS 提供给浏览器。"
introduction: "浏览器需要先构建 DOM 和 CSSOM 树，才能呈现网页。因此，需要确保尽快将 HTML 和 CSS 提供给浏览器。"
article:
  written_on: 2014-04-01
  updated_on: 2014-09-12
  order: 1
collection: critical-rendering-path
authors:
  - ilyagrigorik
key-takeaways:
  构建对象模型：
    - 字节 → 字符 → 令牌 → 节点 → 对象模型。
    - HTML 标记会转换为文档对象模型 (DOM)，而 CSS 标记会转换为 CSS 对象模型 (CSSOM)。
    - DOM 和 CSSOM 是独立的数据结构。
    - 使用 Chrome DevTools Timeline 可以捕获和检查 DOM 和 CSSOM 的构建和处理成本。
notes:
  devtools:
    - 我们假定您对 Chrome DevTools 有基本的了解 - 也就是说，您知道如何捕获网络瀑布流或记录时间轴。如果您需要快速重温一下相关知识，请访问 <a href="https://developer.chrome.com/devtools">Chrome DevTools documentation</a>，如果您是首次使用 DevTools，则建议学习 Codeschool <a href="http://discover-devtools.codeschool.com/">Discover DevTools</a> 课程。
---

{% wrap content%}

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

{% include modules/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## 文档对象模型 (DOM)

{% include modules/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

{% include_code _code/basic_dom.html full %}

首先，我们从最简单的情况开始讲解：一个纯 HTML 网页，包含一些文字和一张图片。浏览器需要怎样做才能处理这个简单的网页呢？

<img src="images/full-process.png" alt="DOM 构建过程">

1. **转换：**浏览器从磁盘或网络读取 HTML 的原始字节，然后根据指定的文件编码格式（例如 UTF-8）将其转换为相应字符。
2. **令牌化：**浏览器将字符串转换为 [W3C HTML5 标准](http://www.w3.org/TR/html5/) 指定的不同令牌 - 例如'<html>'、'<body>'以及其他带'尖括号'的字符串。每个令牌都具有特殊的含义和一套规则。
3. **词法分析：**发出的令牌转换为定义其属性和规则的'对象'。
4. **DOM 构建：**最后，因为 HTML 标记定义不同标签之间的关系（某些标签嵌套在其他标签中），所以，创建的对象在树状数据结构中链接起来，树状数据结构还会捕获原始标记中定义的父子关系：比如 _HTML_ 对象是 _body_ 对象的父对象，_body_ 是 _paragraph_ 对象的父对象等等。

<img src="images/dom-tree.png" class="center" alt="DOM 树">

**上述整个流程的最终输出是文档对象模型，即这个简单网页的'DOM'，浏览器会使用该 DOM 完成对相应网页的所有后续处理。**

每次浏览器处理 HTML 标记时，必须完成上述所有步骤：将字节转换为字符，标识令牌，将令牌转换为节点，然后构建 DOM 树。整个过程可能需要一段时间，尤其在要处理大量 HTML 时更是如此。

<img src="images/dom-timeline.png" class="center" alt="在 DevTools 中跟踪 DOM 的构建">

{% include modules/remember.liquid title="Note" list=page.notes.devtools %}

如果您打开 Chrome DevTools，并在网页加载时记录时间轴，可以看到执行此步骤所需的实际时间 - 在上例中，将 HTML 字节转换为 DOM 树大约需要 5 毫秒。当然，如果网页更大（大多数网页都是如此），此过程需要的时间可能会长很多。在后面关于创建流畅动画的章节中，您会看到，如果浏览器必须处理大量 HTML，这很可能成为一个瓶颈问题。

DOM 树准备就绪后，我们是否就有足够的信息在屏幕上呈现网页了？ 还不行！ DOM 树会捕获文档标记的属性和关系，但是不会告诉我们元素在呈现时的样式。这是 CSSOM 要做的事，也就是我们接下来要讲的！

## CSS 对象模型 (CSSOM)

在浏览器构建这个简单网页的 DOM 时，在文档的 head 部分会遇到一个 link 标签，用于引用外部 CSS 样式表 style.css。浏览器预见到将需要此资源来呈现网页，因此会立即发出对此资源的请求，该请求会返回以下内容：

{% include_code _code/style.css full css %}

当然，我们本可以直接在 HTML 标记中声明样式（内联），但是，如果将 CSS 与 HTML 分开，我们就可以将内容和设计分别进行处理：设计人员可以处理 CSS，开发人员可以处理 HTML 等等。

与 HTML 相同，我们需要将收到的 CSS 规则转换为浏览器可以理解和处理的内容。因此，我们再重复一次与处理 HTML 非常类似的过程：

<img src="images/cssom-construction.png" class="center" alt="CSSOM 构建步骤">

CSS 字节会转换为字符，然后转换为令牌和节点，最后链接到树状结构上，称为'CSS 对象模型'，或缩写为 CSSOM：

<img src="images/cssom-tree.png" class="center" alt="CSSOM 树">

CSSOM 为什么采用树状结构？ 在为网页上的任何对象计算最终的样式集时，浏览器会先从适用于该节点的最通用规则开始（例如，如果是 body 元素的子元素，则应用所有 body 样式），然后，通过应用更加具体的规则（即规则向下级联），递归细化计算的样式。

为了更具体地进行说明，我们来看一下上面所述的 CSSOM 树。body 元素中 _span_ 标记内包含的任何文字均采用 16 磅的字体大小，采用红色文字 - font-size 指令从 body 向下级联到 span。但是，如果 span 标签是 paragraph (p) 标签的子标签，则不会显示其内容。

此外，请注意，上述树不是完整的 CSSOM 树，只显示我们决定在样式表中覆盖的样式。每个浏览器都会提供一套默认的样式，也称为'用户代理样式' -- 即不提供任何自定义样式时看到的样式 -- 我们的样式只是覆盖这些默认样式集（例如 [默认 IE 样式](http://www.iecss.com/)）。如果您曾在 Chrome DevTools 中检查过'计算的样式'，并且想知道所有样式从何而来，现在您应该知道答案了！

想知道 CSS 处理所需的时间？ 在 DevTools 中记录时间轴，并查找'Recalculate Style'事件：与 DOM 解析不同，时间轴不显示单独的'Parse CSS'条目，而是捕获解析和 CSSOM 树构建，加上此事件下计算的样式的递归计算。

<img src="images/cssom-timeline.png" class="center" alt="在 DevTools 中跟踪 CSSOM 的构建">

处理我们的小样式表需要大约 0.6 毫秒，且会影响网页上的 8 个元素 -- 时间不多，但也会产生成本。但是，8 个元素从何而来呢？ CSSOM 和 DOM 是独立的数据结构！ 原来，浏览器隐藏一个重要的步骤。接下来，我们介绍将 DOM 和 CSSOM 链接在一起的呈现树形结构。

{% include modules/nextarticle.liquid %}

{% endwrap %}

