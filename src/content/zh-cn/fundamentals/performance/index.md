project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Improving performance starts with minimizing, or at least, optimizing the data that users download. Understanding how a browser renders those resources is a prerequisite for improving code efficiency. After improving it, you need a way to test it. 

{# wf_updated_on: 2017-02-22 #}
{# wf_published_on: 2017-02-22 #}

# 性能表现 {: .page-title }

提高性能表现的过程要从最小化，或者至少从优化用户下载数据开始。提高代码效率的前提是要理解浏览器是如何渲染这些文件的。最后，你需要一些方法来测试。

## 优化内容效率

<img src="images/oce.png" class="attempt-right" style="max-height: 200px;">

要让你的网站表现优异，就要优化网站上的每一个比特。

[现在开始](optimizing-content-efficiency/)

<div style="clear:both;"></div>

## 关键渲染路径

<img src="images/crp.png" class="attempt-right">

你知道浏览器在得到 HTML，CSS 和 JavaScript 后是通过哪些步骤把它们渲染成像素的吗？

[了解更多](critical-rendering-path/)

<div style="clear:both;"></div>

## 渲染表现

<img src="images/rend.png" class="attempt-right">

要写一个表现良好的网站或者应用，你需要理解浏览器是如何处理 HTML，JavaScript 和 CSS 的，并且确保你写的代码（以及你用到的第三方代码）尽可能地高效。

[了解更多](rendering/)

<div style="clear:both;"></div>

## 理解低带宽（Low Bandwidth）和高等待时间（High Latency）

<img src="images/low.png" class="attempt-right">

理解你的网站或应用在连接很糟糕或不稳定时是什么样子非常重要，这样你就可以据此来搭建它们。有很多工具可以帮你做到这一点。

[了解更多](poor-connectivity/)

<div style="clear:both;"></div>

## PRPL 范式

<img src="images/prpl.png" class="attempt-right">

PRPL (push, render, pre-cache and lazy-load) 是渐进式网页应用（Progressive Web Apps）开发的结构和服务范式。它强调分发（delivery）和启动（launch）的表现。

[了解更多](prpl-pattern/)

<div style="clear:both;"></div>


## 相关资源

### Codelabs

[发现和解决网页应用表现问题（Find and Fix Web App Performance Issues）](/web/fundamentals/getting-started/codelabs/web-perf/) <br>
This codelab will help you learn to identify and fix web app performance bottlenecks.

### Chrome 开发工具 Chrome DevTools

* [怎样看待性能表现（How to Look at Performance）](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [运行性能表现（Runtime Performance）](/web/tools/chrome-devtools/rendering-tools/)
* [页面加载表现（Page Load Performance）](/web/tools/chrome-devtools/network-performance/resource-loading)


### 优达学城课程

[浏览器渲染优化（Browser Rendering Optimization）](https://udacity.com/ud860)<br>
谷歌性能优化大师 Paul Lewis 在这里帮助你消灭 jank，写出拥有 60 幅每秒加载表现的网页应用。

[关键渲染路径（Critical Rendering Path）](https://udacity.com/ud884)<br>
学习“关键渲染路径”，或者叫“浏览器将 HTML，CSS 和 JavaScript 转化为栩栩如生的网页的步骤”。

[从 HTTP/1 到 HTTP/2（HTTP/1 to HTTP/2）](https://udacity.com/ud897)<br>
Surma 从基本的 HTTP/1 一直讲到 HTTP/2，关于怎样高效加载，以及这些协议的安全性。 
<div style="clear:both;"></div>