---
title: "关键呈现路径"
description: "通过优先显示与用户要在网页上执行的主要操作有关的内容，优化关键呈现路径。"
updated_on: 2014-04-28
udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
---
<p class="intro">
  优化关键呈现路径对于改进网页性能至关重要：我们的目标是优先显示与用户要在网页上执行的主要操作有关的内容。
</p>

要提供快速的网络用户体验，浏览器需要做许多工作。大多数此类工作我们网络开发人员是看不到的：我们编写标记，屏幕上就会显示出漂亮的网页。但是，浏览器究竟是如何使用我们的 HTML、CSS 和 JavaScript 在屏幕上呈现像素呢？

从收到 HTML、CSS 和 JavaScript 字节到对其进行必需的处理从而转变为呈现的像素的过程中还有许多中间步骤，优化性能其实就是了解这些步骤中发生了什么 - 即**关键呈现路径**。

<img src="images/progressive-rendering.png" class="center" alt="渐进式网页呈现">

通过优化关键呈现路径，可以大大缩短首次呈现网页的时间. 另外，了解关键呈现路径还可以为构建高性能交互式应用程序打下基础。其实，处理交互式更新的过程是相同的，只是在连续循环中完成，理想情况下每秒可以处理 60 个帧！ 但是，我们还是按部就班来学习吧。首先，我们从头开始快速介绍一下浏览器如何显示简单网页。

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}


