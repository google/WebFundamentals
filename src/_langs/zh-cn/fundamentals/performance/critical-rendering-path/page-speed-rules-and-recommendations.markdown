---
layout: article
title: "PageSpeed 规则和建议"
description: "PageSpeed Insights 规则使用背景：优化关键呈现路径时需要注意的地方及其原因。"
introduction: "PageSpeed Insights 规则使用背景：优化关键呈现路径时需要注意的地方及其原因。"
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 8
collection: critical-rendering-path
authors:
  - ilyagrigorik
---

{% wrap content %}

## 删除阻止呈现的 JavaScript 和 CSS

若要尽快完成首次呈现，您需要尽量减少甚至删除（如果有可能）网页所呈现关键资源的数量、尽量减少下载的关键字节数以及尽量缩短关键路径的长度。

## 优化 JavaScript 的使用

默认情况下，JavaScript 资源会阻止解析器，除非将其标为 _async_，或者使用特殊的 JavaScript 代码段进行添加。阻塞解析器的 JavaScript 强制浏览器等待 CSSOM，并暂停 DOM 的构建，继而大大延迟首次呈现的时间。

### **推荐使用异步 JavaScript 资源**

异步资源会取消阻止文档解析器，使浏览器可以在执行标记之前不会在 CSSOM 上实施阻止。通常，如果可以将标记设置为异步，也就意味着该标记不是首次呈现所必需的 - 考虑在首次呈现之后加载异步标记。

### **延迟解析 JavaScript**

任何非必需的标记（即对构建首次呈现的内容无关紧要的标记）都应予以延迟，从而尽量降低浏览器呈现网页时所需的工作量。

### **避免运行时间长的 JavaScript**

运行时间长的 JavaScript 会阻止浏览器构建 DOM、CSSOM 以及呈现网页。因此，任何对首次呈现无关紧要的初始化逻辑和功能都应该延迟执行。如果需要运行较长的初始化序列，可以考虑分割成几个阶段，使浏览器可以间隔处理其他事件。

## 优化 CSS 的使用

CSS 是构建呈现树的必备元素，但在首次构建网页时，JavaScript 常常会在 CSS 上实施阻止。应该确保将任何非必需的 CSS 标记为非关键资源（例如 print 或者其他媒体查询），并应确保尽可能减少关键 CSS 数，尽可能缩短传输时间。

### **将 CSS 放入文档的 head 标签内**

应该尽早在 HTML 文档中指定所有 CSS 资源，使浏览器可以尽早发现`<link>`标签，并尽早发出 CSS 请求。

### **避免使用 CSS import**

CSS import (`@import`) 指令使一个样式表可以从另一个样式表文件中导入规则。但是，应避免使用这些指令，因为这会在关键路径中增加往返次数：只有在收到并解析完带有 @import 规则的 CSS 样式表之后，才会发现导入的 CSS 资源。

### **内联阻止呈现的 CSS**

为了获得最佳效果，您也许会考虑将关键 CSS 直接内联到 HTML 文档中。这可以在关键路径中减少额外的往返次数。如果方法得当，在只有 HTML 是阻止资源时，就能实现'一次往返'的关键路径长度。

{% include modules/nextarticle.liquid %}

{% endwrap%}

