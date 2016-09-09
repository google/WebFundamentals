---
title: "实现应用外壳"
description: "如何在 Progressive Web App 中实现一个应用外壳?"
updated_on: 2016-09-09
translation_priority: 1
translators:
  - wangyu
notes:
  learn-about-wsk: "了解更多关于 <a href='https://developers.google.com/web/tools/starter-kit/'>Web Starter Kit</a> 的信息"
  image-sprite: "将每个图标分为单独的文件而不是使用 sprite 图，这看起来似乎有些低效，但我们
  会将它们作为应用外壳的一部分对他们进行缓存，确保它们始终可用，且不需要进行网络请求。"
  give-you: "我么将会提供 HTML 和 CSS 代码来节省你的时间，同时保证你起步于一个稳固的基础。
  在下一节，你将有机会自己写这些代码"
---

<p class="intro">
任何项目都可以有多种起步方式，通常我们推荐使用 Web Starter Kit。但是，这里为了保持我们的项目
足够简单并专注于 Progressive Web Apps，我们提供了你所需的全部资源。
</p>

{% include shared/toc.liquid %}

## 下载示例代码

你可以[下载本 progressive web app 引导指南需要的所有代码](pwa-weather.zip)，指南中每一步
需要的资源你都能够在这个 ZIP 文件中找到。

## 为应用外壳编写 HTML 代码

为了保证我们的起步代码尽可能清晰，我们将会开始于一个新的 `index.html` 文件并添加在
[构建应用外壳](step-01)中谈论过的核心组件的代码

请记住，核心组件包括：

* 包含标题的头部，以及头部的 添加/刷新 按钮
* 放置天气预报卡片的容器
* 天气预报卡片的模板
* 一个用来添加城市的对话框
* 一个加载指示器


{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
  <!-- Insert link to styles.css here -->
</head>
<body>
  <header class="header">
    <h1 class="header__title">Weather App</h1>
    <button id="butRefresh" class="headerButton"></button>
    <button id="butAdd" class="headerButton"></button>
  </header>

  <main class="main" hidden>
    <!-- Insert forecast-card.html here -->
  </main>

  <div class="dialog-container">
    <!-- Insert add-new-city-dialog.html here -->
  </div>

  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <!-- Insert link to app.js here -->
</body>
</html>
{% endhighlight %}

需要注意的是默认情况下 `main` 是隐藏（`hidden`） 的，而加载指示器是显示出来的。这是为了保证
用户能在页面加载后立刻看到加载器，给用户一个清晰的指示，表明页面正在加载。

接下来，让我们添加天气预报卡片和新增城市的对话框。为了节省时间，这些已经在 `resources` 目录下
提供了，因此你只需将其复制粘贴至相应位置即可。

## 给核心 UI 组件添加样式

是时候来添加一些样式了。作为我们的构建和部署过程的一部分，我们将希望能够将样式内联在 HTML 文档
中，但现在，让我们先将其放在单独的 CSS 文件中。

在 `index.html` 文件中，替换 `<!-- Insert link to styles here -->` 为以下代码：

{% highlight html %}
<link rel="stylesheet" type="text/css" href="styles/inline.css">
{% endhighlight %}

为了节省时间，我们已经为你创建了
[样式表](https://weather-pwa-sample.firebaseapp.com/styles/inline.css)。花费几分钟
看看搞明白它然后做出一些修改，让样式更加符合你的心意。

{% include shared/note.liquid list=page.notes.image-sprite %}

## 测试并做出一些调整

现在是时候来测试一下效果了，看看它长什么样并做出一些修改让它变成你想要的效果。请确保从 `main`
容器上移除 `hidden` 属性后再测试天气预报卡片的渲染效果，并为卡片添加一些假数据。

{% include shared/remember.liquid list=page.notes.give-you %}

这个应用现在应该是响应式的了，但是并不完美。试着添加一些额外的样式来让它在各个设备上都能表现的很
好。因此，考虑一下你能为此做些什么。

## 添加关键的 JavaScript 启动代码

现在我们的 UI 已经准备好了，是时候来添加一些代码让它工作起来了。像搭建应用外壳的时候那样，注意
考虑哪些代码是为了保持用户体验必须提供的，哪些可以延后加载。

在启动代码中，我们将包括：

* 一个 `app` 对象包含一些和应用效果的关键信息。
* 为头部的按钮（`add`/`refresh`）和添加城市的对话框中的按钮（`add`/`cancel`）添加事件监听
函数。
* 一个添加或者更新天气预报卡片的方法（`app.updateForecastCard`）。
* 一个从 Firebase 公开的天气 API 上获取数据的方法(`app.getForecast`)。
* 一个迭代当前所有卡片并调用 `app.getForecast` 获取最新天气预报数据的方法 (`app.updateForecasts`).
* 一些假数据 (`fakeForecast`) 让你能够快速地测试渲染效果。

添加 JavaScript 代码

1. 从 `resources/step3` 目录下将 `app.js` 拷贝至 `scripts` 文件夹并重命名为 `app.js`
2. 在 `index.html` 中，添加一个连接，来加载新创建的 `app.js`。<br/>
   `<script src="/scripts/app.js"></script>`

## 测试

现在，你已经添加了核心的 HTML、CSS 和 JavaScript，是时候测试一下应用了。这个时候它能做的可能
还不多，但要确保在控制台没有报错信息。

为了看看假的天气信息的渲染效果，将下面这行代码添加至你的 `app.js` 中：

`app.updateForecastCard(fakeForecast);`


<a href="https://weather-pwa-sample.firebaseapp.com/step-04/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">试一试</a>
