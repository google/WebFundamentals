---
layout: article
title: "添加 WebApp 清单文件"
description: "Web 应用的清单文件是一个简单的 JSON 文件，使您（开发者）能够控制在用户可能看到应用的区域（例如手机主屏幕）中如何向用户显示应用，指示用户可以启动哪些功能，更重要的是说明启动方法。 未来，清单文件将让您对应用进行更多控制，但现在我们只侧重于如何启动应用。"
introduction: "Web 应用的清单文件是一个简单的 JSON 文件，使您（开发者）能够控制在用户可能看到应用的区域（例如手机主屏幕）中如何向用户显示应用，指示用户可以启动哪些功能，更重要的是说明启动方法。 未来，清单文件将让您对应用进行更多控制，但现在我们只侧重于如何启动应用。"
article:
  written_on: 2014-12-17
  updated_on: 2014-12-17
  order: 1
id: wapp-app-manifest
collection: stickyness
authors:
  - mattgaunt
  - paulkinlan
collection: stickyness
priority: 1
key-takeaways:
  manifest:
    - 定义各种图标，使它们在所有设备机型上正常显示
    - 选择一个好的 `short_name`，因为这是用户将看到的信息
    - 添加一个启动 URL 和一个 Querystring 参数，以便您跟踪有多少用户启动您的应用
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.manifest %}

添加 WebApp 清单文件非常简单。 创建一个 manifest.json
文件，其中包含 WebApp 的设置和资源，
然后从 html 页面中添加对此文件的 *link*。

## 创建清单文件

不管您要什么，都可以调用清单文件。 大多数人可能只使用 manifest.json。 下面给出一个示例。

{% highlight json %}
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-0-75x.png",
      "sizes": "36x36"
    },
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-1-5x.png",
      "sizes": "72x72"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html",
  "display": "standalone"
}
{% endhighlight %}

应当包括一个 *short_name*，因为这将用于启动器文本。

如果不提供 *start_url*，则将使用当前页面，这不太可能是您的用户想要的内容。

## 将您的清单文件告诉浏览器

在创建清单文件并放在网站上之后，只需要按以下方式将一个链接标签添加到组成您的 Web 应用的所有页面。

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}

## 为设备创建漂亮的应用图标

当用户将您的网站添加到主屏幕时，您可以定义一组供浏览器使用的图标。

Web 应用的图标可以按上述方式定义，如类型、大小和密度，但您不必定义全部信息，可以只定义大小和图像源。

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "sizes": "192x192"
  }],
{% endhighlight %}

<div class="clear g-wide--full">
    <figure>
        <img src="images/homescreen-icon.png" alt="添加到主屏幕图标">

        <figcaption>添加到主屏幕图标</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 配置您的网站的启动方式

通过将*display*类型定义为*standalone*，可以让 WebApp 隐藏浏览器 UI。

{% highlight json %}
"display": "standalone"
{% endhighlight %}

别担心，如果您认为用户喜欢在浏览器中像正常网站一样查看您的网页，则可以使用浏览器显示类型。

{% highlight json %}
"display": "browser"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-display-options.png" alt="web-app-capable">

        <figcaption>清单文件显示选项</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 定义页面的初始方向

您可以强制一个特定方向，这对于某些用例确实很有用，例如只能在横向模式下运行的游戏。 但是，应谨慎使用。 用户希望在两个方向均可查看应用。

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-orientation-options.png" alt="WebApp 清单文件方向选项">

        <figcaption>WebApp 清单文件方向选项</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 目前使用是否安全。 即浏览器支持

是的。  这是一个先进的功能，如果您支持，则用户在使用可以处理此功能的浏览器时将
获得更好的体验。  如果浏览器不支持清单文件，也不会阻止用户使用此
网站。

截至 2014 年 11 月，Chrome 已实施清单文件。 Mozilla 正在实施， [IE 正在探索此领域](https://status.modern.ie/webapplicationmanifest?term=manifest)。

{% include modules/nextarticle.liquid %}

{% endwrap %}
