project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:网络应用清单是一个 JSON 文件，您可以利用它控制在用户想要看到本机应用的区域（例如设备主屏幕）中如何向用户显示网络应用或网站，指示用户可以启动哪些功能，以及定义其在启动时的外观。

{# wf_updated_on:2016-08-19 #}
{# wf_published_on:2016-02-11 #}

# 网络应用清单 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

[网络应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest)是一个 JSON 文件，您（即开发者）可以利用它控制在用户想要看到应用的区域（例如移动设备主屏幕）中如何向用户显示网络应用或网站，指示用户可以启动哪些功能，以及定义其在启动时的外观。

网络应用清单提供了将网站书签保存到设备主屏幕的功能。当网站以这种方式启动时： 

* 它具有唯一的图标和名称，以便用户将其与其他网站区分开来。
* 它会在下载资源或从缓存恢复资源时向用户显示某些信息。
* 它会向浏览器提供默认显示特性，以避免网站资源可用时的过渡过于生硬。 

它通过一个文本文件中的元数据这一简单机制完成所有这些工作。那就是网络应用清单。

注：尽管您可以在任何网站上使用网络应用清单，它们却是 [Progressive Web App](/web/progressive-web-apps/) 的必备要素。

### TL;DR {: .hide-from-toc }
- 创建清单并将其链接到您的页面，这是非常简单的过程。
- 控制用户从主屏幕启动时看到的内容。
- 这包括启动画面、主题颜色以及打开的网址等。 

## 创建清单

在对网络应用清单做详细探究之前，让我们先创建一个基本清单，然后为其链接一个网页。


不管您要什么，都可以调用清单。大多数人使用 `manifest.json`。下面是一个示例：


    {
      "short_name": "AirHorner",
      "name": "Kinlan's AirHorner of Infamy",
      "icons": [
        {
          "src": "launcher-icon-1x.png",
          "type": "image/png",
          "sizes": "48x48"
        },
        {
          "src": "launcher-icon-2x.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "launcher-icon-4x.png",
          "type": "image/png",
          "sizes": "192x192"
        }
      ],
      "start_url": "index.html?launcher=true"
    }
    

确保包括以下内容： 

* 在用户主屏幕上用作文本的 `short_name`。  
* 在网络应用安装横幅中使用的 `name`。  
  

## 将清单的相关信息告知浏览器

在您创建清单且将清单添加到您的网站之后，将 `link` 标记添加到包含网络应用的所有页面上，如下所示：



    <link rel="manifest" href="/manifest.json">
  
## 设置启动网址

如果您不提供 `start_url`，则将使用当前页面，这不太可能是您的用户想要的内容。
但这并不是将它包括在内的唯一原因。
由于您现在可以定义应用的启动方式，因此可向 `start_url` 添加一个查询字符串参数来说明其启动方式。
 

    "start_url": "/?utm_source=homescreen"

这可以是您希望的任何内容；我们要使用的值的优点是对 Google Analytics 十分有意义。
 

## 自定义图标

<figure class="attempt-right">
  <img src="images/homescreen-icon.png" alt="“添加到主屏幕”图标">
  <figcaption>“添加到主屏幕”图标</figcaption>
</figure>

 当用户将您的网站添加到其主屏幕时，您可以定义一组供浏览器使用的图标。您可以通过类型和大小定义它们，如下所示：

<div style="clear:both;"></div>

    "icons": [{
        "src": "images/touch/icon-128x128.png",
        "type": "image/png",
        "sizes": "128x128"
      }, {
        "src": "images/touch/apple-touch-icon.png",
        "type": "image/png",
        "sizes": "152x152"
      }, {
        "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
        "type": "image/png",
        "sizes": "144x144"
      }, {
        "src": "images/touch/chrome-touch-icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      }],
    

注：将图标保存到主屏幕时，Chrome 首先寻找与显示密度匹配并且尺寸调整到 48dp 屏幕密度的图标。如果未找到任何图标，则会查找与设备特性匹配度最高的图标。无论出于任何原因，如果您想把目标明确锁定在具有特定像素密度的图标，可以使用带数字参数的可选  <code>density</code> 成员。如果您不声明密度，其默认值为 1.0。这意味着“可将该图标用于等于和大于 1.0 的屏幕密度”，而这通常就是您所需要的。

## 添加启动画面

<figure class="attempt-right">
  <img src="images/background-color.gif" alt="背景颜色">
  <figcaption>启动屏幕的背景颜色</figcaption>
</figure>

当您从主屏幕启动网络应用时，幕后执行了若干操作：


1. Chrome 启动。
2. 显示页面的渲染器启动。
3. 您的网站从网络（如果网站有服务工作线程，则从缓存）加载。

执行以上操作时，屏幕显示为白色并且看似已经停滞。如果您从网络加载网页时页面需要花费不止一两秒的时间才能让首页显现任何内容，这种情况将变得尤为明显。



为提供更优质的用户体验，您可以用标题、颜色和图像来替换白色屏幕。 

### 设置图像和标题

如果您从未落下课程进度，您已应完成了图像和标题的设置。Chrome 会根据清单的特定成员推断图像和标题。此处的要点是了解详情。 

启动画面图像提取自 `icons` 数组。Chrome 为设备选择最接近 128dp 的图像。标题是直接从 `name` 成员获取的。

### 设置背景颜色 

利用适当命名的 `background_color` 属性指定背景颜色。
Chrome 在网络应用启动后会立即使用此颜色，这一颜色将保留在屏幕上，直至网络应用首次呈现为止。


要设置背景颜色，请在您的清单中设置下列内容：


    "background_color": "#2196F3",
    

现在，从主屏幕启动您的网站时将不会呈现白色屏幕。

该属性的建议适用值是加载页面的背景颜色。使用与加载页面相同的颜色可实现从启动画面到首页的平稳过渡。


### 设置主题颜色

使用 `theme_color` 属性指定主题颜色。该属性设置工具栏的颜色。
对此，我们还建议复制某种现有颜色，具体地讲就是 `theme-color` `<meta>`。



## 设置启动样式

<figure class="attempt-right">
  <img src="images/manifest-display-options.png" alt="网络应用支持">
  <figcaption>清单显示选项</figcaption>
</figure>

利用网络应用清单来控制显示类型和页面方向。

### 自定义显示类型

您可以通过将 `display` 类型设置为 `standalone`，让您的网络应用隐藏浏览器的 UI：


    "display": "standalone"
    

如果您认为用户喜欢在浏览器中像正常网站一样查看您的网页，您可以将 `display` 类型设置为 `browser`：


    "display": "browser"
    
<div style="clear:both;"></div>

### 指定页面的初始方向

<figure class="attempt-right">
  <img src="images/manifest-orientation-options.png" alt="网络应用清单方向选项">
  <figcaption>网络应用清单方向选项</figcaption>
</figure>

您可以强制一个特定方向，这对于某些应用很有用，例如只能在一个方向上运行的游戏。
请有选择地使用。
用户更愿意能够自行选择方向。


    "orientation": "landscape"

<div style="clear:both;"></div>
    

## 提供全站主题颜色

<figure class="attempt-right">
  <img src="images/theme-color.png" alt="背景颜色">
  <figcaption>主题颜色</figcaption>
</figure>

Chrome 在 2014 年为您的网站引入了主题颜色这一概念。主题颜色是来自您的网页的提示，用于告知浏览器使用什么颜色来为[地址栏等 UI 元素](/web/fundamentals/design-and-ux/browser-customization/)着色。

  

如果没有清单，您需要在每个页面上定义主题颜色，并且如果您拥有的是大型网站或旧版网站，进行大量全站更改并不可行。


<div style="clear:both;"></div>

向您的清单添加 `theme_color` 属性后，从主屏幕启动网站时，网域中的每个页面都将自动获得主题颜色。




    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="背景颜色">
  <figcaption>全站主题颜色</figcaption>
</figure>

## 测试您的清单 {: #test }

如果您想要手动验证网络应用清单是否已正确设置，请使用 Chrome DevTools 的 **Application** 面板上的 **Manifest** 标签。


![Chrome DevTools 的“Manifest”标签](images/devtools-manifest.png)

此标签提供了人类可读版本的许多清单属性。
请参阅 Chrome DevTools 文档中的[网络应用清单](/web/tools/chrome-devtools/progressive-web-apps#manifest)，了解有关此标签的详细信息。您还可以从此处模拟 Add to Homescreen 事件。
请参阅[测试应用安装横幅](/web/fundamentals/engage-and-retain/app-install-banners/#testing-the-app-install-banner)，了解有关此主题的详细信息。



如果您希望采取自动化方法来验证自己的网络应用清单，请参阅 [Lighthouse](/web/tools/lighthouse/)。
Lighthouse 是一个网络应用审核工具，您可以将其作为 Chrome 扩展程序或 NPM 模块运行。
您为 Lighthouse 提供一个网址，它会对此页面运行一套审核，然后以报告形式显示结果。与网络应用清单相关 Lighthouse 审核包括检查以下内容：


* 应用是否可以添加到主屏幕。
* 添加后，应用是否以自定义启动画面启动。
* 浏览器地址栏的颜色是否可自定义。
* 应用是否采用 HTTPS（Add to Homescreen 的先决条件）。

## 更多信息

这篇文章为您简要介绍了网络应用清单，但还有更多信息需要了解。


* 如果您使用了网络应用清单，可能还想设置一个[应用安装横幅](/web/fundamentals/engage-and-retain/app-install-banners/)。
 

* Mozilla 开发者网络上提供了网络应用清单的[完整参考文档](https://developer.mozilla.org/en-US/docs/Web/Manifest)。


* 如果您需要由创建网络应用清单的工程师提供的功能说明，可以阅读[实际 W3C 规范](http://www.w3.org/TR/appmanifest/){: .external }。


注：如果您将来更新 `manifest.json` 文件，用户不会自动获取这些更改，除非他们将您的应用重新添加到自己的主屏幕上。







{# wf_devsite_translation #}
