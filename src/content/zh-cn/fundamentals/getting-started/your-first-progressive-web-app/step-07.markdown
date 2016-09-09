---
title: "支持集成入原生应用"
description: "使用添加至主屏幕，和将你的 Progressive Web App 集成入原生应用中。"
updated_on: 2016-09-09
translation_priority: 1
translators:
  - wangyu
---

<p class="intro">
没有人喜欢在手机的键盘上输入一长串的 URL，有了添加至主屏幕的功能，你的用户可以选择添加一个图标在他们的屏幕上，就像从应用商店安装一个原生应用那样。而且这儿添加一个图标是更加容易的。
</p>

{% include shared/toc.liquid %}

## Web 应用安装横幅和添加至主屏


web 应用安装横幅给你能够让用户快速地将 web 应用添加至他们的主屏的能力，让他们能够很容易地再次进入你的应用。添加应用安装横幅是很简单的，Chrome 处理了几乎所有事情，我么只需要简单地包含一个应用程序清单（manifest）来说明你的应用的一些细节。

Chrome 使用了一系列标准包括对 service worker 的使用，加密连接状态以及用户的访问频率决定了什么时候展示这个横幅。除此之外，用户可以手动地通过 Chrome 中 “添加至主屏” 这个菜单按钮来添加。


### 使用 manifest.json 文件来声明一个应用程序清单

web 应用程序清单是一个简单的 JSON 文件，它给你了控制你的应用如何出现在用户期待出现的地方（比如用户手机主屏幕），这直接影响到用户能启动什么，以及更重要的，用户如何启动它。

使用 web 应用程序清单，你的应用可以：

* 能够真实存在于用户主屏幕上
* 在 Android 上能够全屏启动，不显示地址栏
* 控制屏幕方向已获得最佳效果
* 定义启动画面，为你的站点定义主题
* 追踪你的应用是从主屏幕还是 URL 启动的

{% highlight javascript %}
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
{% endhighlight %}

追踪你的应用是从哪儿启动的最简单方式是在 `start_url` 参数后面添加一个查询字符串，然后使用工具来分析查询字段。如果你使用这个方法，记得要更新应用外壳缓存的文件，确保含有查询字段的文件被缓存。

### 告诉浏览器你的程序清单文件

将这段代码添加至你的 `index.html` 的 `<head>` 部分：
`<link rel="manifest" href="/manifest.json">`

### 最佳实践

* 将程序清单的链接添加至你站点的所有页面上，这样在用户第一次访问的时候它能够被 Chrome 正确检索到，且不管用户从哪个页面访问的。
* 如果同时提供了 `name` 和 `short_name`，`short_name` 是 Chrome 的首选。
* 为不同分辨率的屏幕提供不同的 icon。Chrome 会尝试使用最接近 48dp 的图标，比如在 2x 屏上使用 96px 的，在 3x屏上使用 144px 的。
* 记得要包含一个适合在启动画面上显示的图标，另外别忘了设置 `background_color`。

扩展阅读：[使用应用安装横幅](https://developers.google.com/web/fundamentals/engage-and-retain/simplified-app-installs/)


## iOS Safari 的添加至主屏幕元素

在 `index.html` 中，将下面代码添加至 `<head>` 中：

{% highlight html %}
<!-- Add to home screen for Safari on iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather App">
<link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
{% endhighlight %}

## Windows 上的贴片图标

在 `index.html` 中，将下面代码添加至 `<head>` 中：

{% highlight html %}
<meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
<meta name="msapplication-TileColor" content="#2F3BA2">
{% endhighlight %}

## 亲自尝试

* 尝试将应用在你的 Android Chrome 上添加至首屏，并确认启动画面上使用了正确的图标。
* 检查一下 Safari 和 Internet Explorer 确认图标正确地出现了。

<a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">试一试</a>
