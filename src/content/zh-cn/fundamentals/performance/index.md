project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Improving performance starts with minimizing, or at least, optimizing the data that users download. Understanding how a browser renders those resources is a prerequisite for improving code efficiency. After improving it, you need a way to test it. 

{# wf_updated_on: 2017-02-22 #}
{# wf_published_on: 2017-02-22 #}

# 性能表现 {: .page-title }

提高性能表现的过程要从最小化，或者至少从优化用户下载数据开始。提高代码效率的前提是要理解浏览器是如何渲染这些文件的。最后，你需要一些方法来测试。

## 优化内容效率

<img src="images/oce.png" class="attempt-right" style="max-height: 200px;">


为提供卓越的性能，您需要优化网站中每一个字节的传送！

[使用入门](optimizing-content-efficiency/)


<div style="clear:both;"></div>

## 关键渲染路径

<img src="images/crp.png" class="attempt-right">

从收到 HTML、CSS 和 JavaScript 字节到对其进行必需的处理，从而将它们转变成渲染的像素这一过程中有一些中间步骤，您了解这些步骤吗？

[了解详情](critical-rendering-path/)

<div style="clear:both;"></div>

## 渲染性能

<img src="images/rend.png" class="attempt-right">

要想编写高性能的网站或应用，您需要了解浏览器是如何处理 HTML、JavaScript 和 CSS 的，从而确保您编写的代码（和包含的第三方代码）尽可能高效运行。

[了解详情](rendering/)

<div style="clear:both;"></div>

## 了解低带宽和高延迟

<img src="images/low.png" class="attempt-right">

很重要的一点是，您需要了解应用或网站在连接不佳或不可靠时的使用情况，并相应地进行构建。有一些工具可以帮助您。

[了解详情](poor-connectivity/)

<div style="clear:both;"></div>

## PRPL 模式

<img src="images/prpl.png" class="attempt-right">

PRPL（推送、渲染、预先缓存和延迟加载）是一种用于结构化和提供渐进式网络应用 (PWA) 的模式，该模式强调应用交付和启动的性能。



[了解详情](prpl-pattern/)


<div style="clear:both;"></div>


## 相关资源


### 代码实验室

[发现并解决网络应用性能的问题](/web/fundamentals/getting-started/codelabs/web-perf/) <br>
此代码实验室将帮助您学习如何识别和解决网络应用性能的瓶颈。

### Chrome DevTools

* [如何了解性能](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [运行时性能](/web/tools/chrome-devtools/rendering-tools/)
* [页面加载性能](/web/tools/chrome-devtools/network-performance/resource-loading)


### Udacity 课程

[浏览器渲染优化](https://www.udacity.com/course/browser-rendering-optimization--ud860)<br>
Google 性能大师 Paul Lewis 将帮助您消除卡顿并创建可以保持每秒 60 帧性能的网络应用。


[关键渲染路径](https://www.udacity.com/course/website-performance-optimization--ud884)<br>
了解关键渲染路径，或者浏览器为将 HTML、CSS 和 JavaScript 转换成生动、逼真的网站而必须采取的步骤。


[HTTP/1 至 HTTP/2](https://www.udacity.com/course/client-server-communication--ud897)<br>
Surma 将从 HTTP/1 的基础知识开始，一直讲解到 HTTP/2 和如何有效加载资产，他还会介绍这些协议的安全方面。
<div style="clear:both;"></div>





{# wf_devsite_translation #}

