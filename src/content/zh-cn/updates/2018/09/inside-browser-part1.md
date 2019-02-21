project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn how browser turn your code into functional website from high-level architecture to the specifics of the rendering pipeline.

{# wf_published_on: 2018-09-05 #}
{# wf_updated_on: 2018-09-21 #}
{# wf_featured_image: /web/updates/images/inside-browser/cover.png #}
{# wf_featured_snippet: Learn how browser turn your code into functional website from high-level architecture to the specifics of the rendering pipeline. In part 1, we’ll take a look at core computing terminology and Chrome’s multi-process architecture. #}
{# wf_blink_components: N/A #}

<style>
  figcaption {
    font-size:0.9em;
  }
</style>

# Inside look at modern web browser (part 1) {: .page-title }

{% include "web/_shared/contributors/kosamari.html" %}

## CPU、GPU、内存和多进程架构

在这个4 部分的系列博客文章中，我们将介绍 Chrome 浏览器从高级架构到渲染流程的具体细节。如果你想知道浏览器如何将你的代码转换为一个具备功能的网站，或者你不确定为什么某种特定的技术被建议用来提高性能，那么本系列非常适合你。

As part 1 of this series, we’ll take a look at core computing terminology and Chrome’s
multi-process architecture.

注意：如果您熟悉 CPU / GPU 和进程/线程的概念，可以跳转至[浏览器架构](#browser-architecture) 小节。

## At the core of the computer are the CPU and GPU

为了理解浏览器运行的环境，我们先得了解计算机的一些部件与其功能。

### CPU

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part1/CPU.png" alt="CPU">
  
  <figcaption>图1：4 个 CPU 核心如同职员一般坐在自己的桌前依次处理任务
  </figcaption>
</figure>

首先是 **C**entral **P**rocessing **U**nit - 或 **CPU**。CPU 可以理解成是你的计算机的大脑。CPU 核心（图中以办公室职员的形象展示），能在许多不同的任务来到时，按序处理。从数学到艺术，它能处理一切任务，同时也知道如何回复客户的电话。过去，大多 CPU 都是单芯片的。CPU 核心像是居住在同一片芯片里的另一个 CPU。现代硬件大部分拥有多核心，为你的手机、笔记本电脑提供了更强大的计算能力。

<div class="clearfix"></div>

### GPU

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part1/GPU.png" alt="GPU">
  <figcaption>图2: 众多拿着扳手的GPU核心, 他们只能处理有限的任务
  </figcaption>
</figure>

**G**raphics **P**rocessing **U**nit - 或 **GPU** 是另一种计算机部件。不像 CPU，GPU 擅长同时在多个核心处理简单的任务。顾名思义，它开发最初被用来处理图形。这就是为什么在说到图形处理时，“使用 GPU”或”GPU 支持”总是与快速渲染和流畅交互相关联。
近年来，随着 GPU 加速计算的使用，越来越多的计算可以独立运行在 GPU 上（不依赖CPU）。

<div class="clearfix"></div>

当您在计算机或手机上启动应用程序时，CPU 和 GPU 为应用程序提供了支撑。通常，应用程序使用操作系统提供的机制运行在 CPU 和 GPU 上。

<figure>
  <img src="/web/updates/images/inside-browser/part1/hw-os-app.png" alt="Hardware, OS, Application">
  <figcaption>图3：三层计算机架构。机器硬件位于底部，操作系统位于中间，应用程序位于顶部。</figcaption>
</figure>

## 在进程与线程上执行程序

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part1/process-thread.png" alt="process and threads">
  <figcaption>图4：进程就像是一个盒子，线程就像在盒子里游泳的鱼
  </figcaption>
</figure>

在深入浏览器架构之前还得掌握的概念是进程和线程。
进程可以描述为执行应用程序的程序。线程则是存在于进程内部并执行所属进程的任意部分程序。

启动应用程序时，进程就被创建了。该程序可能会创建线程来帮它工作，但这不是必须的。操作系统为进程提供了一“块”内存，所有应用程序状态都保存在这块私有的内存空间中。当关闭应用程序时，进程也会消失，操作系统会释放内存。

<div class="clearfix"></div>

<figure>
  <a href="/web/updates/images/inside-browser/part1/memory.svg">
    <img src="/web/updates/images/inside-browser/part1/memory.png" alt="process and memory">
  </a>
  <b><span class="material-icons">play_circle_outline</span>点击图片观看动画
  </b>
  <figcaption>图5：图解进程使用内存空间并存储应用数据</figcaption>
</figure>

一个进程可以请求操作系统启动另一个进程来运行不同任务。这时，不同的内存块被分配给新的进程。如果这两个进程需要通信，它们可以通过
**I**nter **P**rocess **C**ommunication (**IPC**，进程间通信)技术实现。很多应用进程都是这样设计的。这样设计的好处是当子进程（由主进程启动的新进程）没有响应需要重启时不会影响在不同内存块中的其他进程运行。

<figure>
  <a href="/web/updates/images/inside-browser/part1/workerprocess.svg">
    <img src="/web/updates/images/inside-browser/part1/workerprocess.png" alt="worker process and IPC">
  </a>
  <b><span class="material-icons">play_circle_outline</span>点击图片观看动画
  </b>
  <figcaption>图6：图解进程间通过IPC进行通信
  </figcaption>
</figure>

## Browser Architecture {: #browser-architecture }

那 Web 浏览器是如何通过进程与线程构建的呢？可以有两种方式，一种是拥有许多不同线程的单一进程，另一种是许多通过 IPC 通信的不同进程，每个进程拥有较少的线程。

<figure>
  <img src="/web/updates/images/inside-browser/part1/browser-arch.png" alt="browser architecture">
  <figcaption>图7：基于进程/线程的不同浏览器架构</figcaption>
</figure>

这里需要注意一点，这些不同的架构都属于实现细节。
如何构建 Web 浏览器并无标准规范。两个浏览器的架构可能完全不同。

在本系列文章中，我们将使用如下图所示的 Chrome 的最新架构。

顶层是浏览器进程（Browser），协调其他负责浏览器不同功能的进程。多个渲染器进程（Renderer）被创建并被分配给每个标签页。直到最近，Chrome 都会尽可能给每个标签页一个进程；而现在，Chrome的策略是优先给每个站点独立的进程，包括 iframe（见[站点隔离](#site-isolation)）。

<figure>
  <img src="/web/updates/images/inside-browser/part1/browser-arch2.png" alt="browser architecture">
  <figcaption>图8：图解Chrome的多进程架构。Chrome为每个标签页分配一个渲染器进程。
  </figcaption>
</figure>

## 各个进程都控制着什么？

下表描述了各个 Chrome 进程与其职责：

<table class="responsive">
  <tr>
    <th colspan="2">进程与其职责</th>
  </tr>
  <tr>
    <td>浏览器进程（Browser）</td>
    <td>控制应用的“浏览器”部分，包括地址栏、书签、后退与前进按钮。<br>也处理着 Web 浏览器的一些看不见的高级的部分，比如网络请求与文件访问。</td>
  </tr>
  <tr>
    <td>渲染器进程（Renderer）</td>
    <td>控制展示网页的标签页</td>
  </tr>
  <tr>
    <td>插件进程（Plugin）</td>
    <td>控制网站使用的所有插件，比如 flash。</td>
  </tr>
  <tr>
    <td>图形处理单元（GPU）</td>
    <td>处理独立于其他进程的 GPU 任务。它被分为多个进程，因为 GPU 处理着来自不同应用的请求并将它们绘制到同一屏幕。</td>
  </tr>
</table>

<figure>
  <img src="/web/updates/images/inside-browser/part1/browserui.png" alt="Chrome processes">
  <figcaption>图9：不同进程指向浏览器 UI 的不同部分</figcaption>
</figure>

甚至还有更多其他进程，比如扩展程序（Extension）进程和工具进程。如果你想知道你的 Chrome 里运行着多少进程，点开右上角的选项菜单<span class="material-icons">more_vert</span>，选择更多工具，然后选择任务管理器。任务管理器中列出了当前运行的所有进程，以及它们占用的 CPU 与 内存。

## Chrome 多进程架构的好处

前面我提到 Chrome 使用了多个渲染器进程。你可以把情况最简化，认为每个标签页都有它自己的渲染器进程。比如，当前你打开了三个标签页，每个标签页都有运行着独立的渲染器进程。
如果其中一个标签失去响应，你可以在完好保留其他两个网页的情况下关闭失去响应的标签页并继续上网。如果所有标签页都运行在同一个进程上，当一个标签页失去响应，所有标签页都会失去响应。这种情况太糟了。

<figure>
  <a href="/web/updates/images/inside-browser/part1/tabs.svg">
    <img src="/web/updates/images/inside-browser/part1/tabs.png" alt="multiple renderer for tabs">
  </a>
  <b><span class="material-icons">play_circle_outline</span>点击图片观看动画
  </b>
  <figcaption>图10：图解运行着每个标签页的多个进程</figcaption>
</figure>

另一个分离浏览器的工作至不同进程的好处是安全与沙盒。既然系统提供了限制进程特权的方式，浏览器能把某些进程和某些特性。举个例子，Chrome 浏览器对处理用户任意输入的进程限制了任意文件访问。

由于进程拥有自己的私有内存空间，所有它们通常包含了常用基础设施（比如 V8，Chrome 的 JavaScript 引擎）的拷贝。这意味着更多的内存使用，因为它们不能像进程中的线程一样共享内存。
为了节省内存，Chrome 限制了其能运行的进程总数。
该限制因您设备的内存与 CPU 而变化，但当达到该限额时，Chrome 会开始将统一站点的不同标签页运行在同一进程上。

## Saving more memory - Servicification in Chrome

浏览器进程也使用了同样的方法。Chrome 正计划将浏览器程序的各部分以服务的方式运行，使各个服务分成多进程或合并成同一进程都变得简单。

总体来说，当Chrome运行在性能强劲的硬件上时，可以给每个服务分配独立的进程，带来更强的稳定性。但如果Chrome运行在一台硬件资源不充裕的设备上市，它会把服务整合到一个进程中来减少内存占用。在这次Chrome服务化改变之前，类似的整合进程以减少内存使用的方式已经在其他平台（如，Android）上使用了。

<figure>
  <a href="/web/updates/images/inside-browser/part1/servicfication.svg">
    <img src="/web/updates/images/inside-browser/part1/servicfication.png" alt="Chrome servicfication">
  </a>
  <b>
    <span class="material-icons">play_circle_outline</span>点击图片观看动画
  </b>
  <figcaption>
   图 11: 图解Chrome服务化 不同服务的进程整合与拆分</figcaption>
</figure>

## 按frame运行的渲染器进程 - 站点隔离 {: #site-isolation }

[站点隔离](/web/updates/2018/07/site-isolation)是最近引入Chrome的新特性，它用独立分离的渲染器进程运行每个跨站iframe。
我们提到了一个标签页一个渲染器进程的模型，这种模型允许跨站iframe跑在同一个进程中，共享内存空间。
让a.com 和 b.com 跑在同一个渲染器进程中看起来似乎是合理的。
[同源策略](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)是网络核心安全模型，它确保在未经许可的情况一个站点不能访问其他站点的数据。安全攻击的一个主要目标就是绕过这一策略。
进程隔离是分隔站点最有效的方式。[熔断和幽灵漏洞](/web/updates/2018/02/meltdown-spectre)的存在使我们更清楚地意识到用进程分隔站定的必要性。
从Chrome67开始，站点隔离在桌面浏览器上默认被弃用。每个标签页中的跨站iframe都分配到独立分隔的渲染器进程。

<figure>
  <img src="/web/updates/images/inside-browser/part1/isolation.png" alt="site isolation">
  <figcaption>
图 12: 图解站点站点隔离：单个站点内iframe渲染器多进程
  </figcaption>
</figure>

站点隔离方案历经多年工程上的努力。站点隔离不仅仅是简单地分配不同渲染器进程，它从根本上改变了iframe间的通信方式。在iframe运行在不同进程间情况下，打开页面上的devtool调试，devtool需要做很多后台工作来使其看起来与非站点隔离情况下一致。即使是像简单的用Ctrl+F在页面上查找文字也意味着要跨不同渲染器进程搜索。由此可以看出为什么Chrome浏览器工程师将站点隔离视特性为重大里程碑。

## 总结

在这篇文章中，我们介绍了高层次视角下的浏览器架构，并介绍了多进程架构的优点。我们还介绍了Chrome中与多进程架构密切相关的服务化和站点隔离。在下一篇文章中，我们将开始深入研究为了展示一个网站，进程和线程需要做哪些事情。

你喜欢这篇文章吗？如果你有任何疑问或建议，请在评论区留言或在推特[@kosamari](https://twitter.com/kosamari)上联系我 。

<a class="button button-primary gc-analytics-event attempt-right" href="/web/updates/2018/09/inside-browser-part2" data-category="InsideBrowser" data-label="Part1 / Next">下一篇：导航中发生了什么？</a>

<div class="clearfix"></div>

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
