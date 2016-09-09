---
title: "基于应用外壳的架构"
description: "什么是应用外壳，以及你如何使用应用外壳模式构建一个 web 应用？"
updated_on: 2016-09-09
translation_priority: 1
translators:
  - wangyu
---

<p class="intro">
应用的壳是应用的用户界面所需的最基本的 HTML、CSS 和 JavaScript，也是一个用来确保应用有好多性能的组件。它的首次加载将会非常快，加载后立刻被缓存下来。这意味着应用的外壳不需要每次使用时都被下载，而是只加载需要的数据。
</p>


{% include shared/toc.liquid %}

应用外壳的结构分为应用的核心基础组件和承载数据的 UI。所有的 UI 和基础组件都使用一个 service worker 缓存在本地，因此在后续的加载中 Progressive Web App 仅需要加载需要的数据，而不是加载所有的内容。

<figure>
  <img src="images/appshell.jpg" />
</figure>

换句话说，应用的壳相当于那些发布到应用商店的原生应用中打包的代码。它是让你的应用能够运行的核心组件，只是没有包含数据。

## 为什么使用基于应用外壳的结构?

使用基于应用外壳的结构允许你专注于速度，给你的 Progressive Web App 和原生应用相似的属性：快速的加载和灵活的更新，所有这些都不需要用到应用商店。

## 设计应用外壳

第一步是设计核心组件

问问自己：

* 需要立刻显示什么在屏幕上？
* 我们的应用需要那些关键的 UI 组件？
* 应用外壳需要那些资源？比如图片，JavaScript，样式表等等。

我们将要创建一个天气应用作为我们的第一个 Progressive Web App 。它的核心组件包括：

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <ul>
      <li>包含标题的头部，包括添加/刷新 按钮</li>
      <li>放置天气预报卡片的容器</li>
      <li>天气预报卡片的模板</li>
      <li>一个用来添加城市的对话框</li>
      <li>一个加载指示器</li>
    </ul>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <img src="images/weather-ss.png">
  </div>
</div>

在设计一个更加复杂的应用时，内容不需要在首次全部加载，可以在之后按需加载，然后缓存下来供下次使用。比如，我们能够延迟加载添加城市的对话框，直到完成对首屏的渲染且有一些空闲的时间。
