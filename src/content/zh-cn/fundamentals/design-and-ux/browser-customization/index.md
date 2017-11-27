project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:现代浏览器让您能够轻松地定制特定组件，如图标、地址栏颜色，甚至允许添加自定义磁贴等对象。这些简单的改进可提升吸引力，吸引用户再次访问您的网站。


{# wf_updated_on: 2015-09-21 #}
{# wf_published_on: 2015-09-21 #}

# 图标和浏览器颜色 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

现代浏览器让您能够轻松地定制特定组件，如图标、地址栏颜色，甚至允许添加自定义磁贴等对象。这些简单的改进可提升吸引力，吸引用户再次访问您的网站。


## 提供出色的图标和磁贴 

当用户访问您的网页时，浏览器会尝试从 HTML 提取图标。图标可能出现在许多地方，包括浏览器标签、最近的应用切换、新的（或最近访问的）标签页面等。

提供高质量的图像将使您的网站更具辨识度，让用户更容易发现您的网站。
 

为充分支持所有浏览器，您需要向每个页面的 `<head>` 元素添加几个标记。



    <!-- icon in the highest resolution we need it for -->
    <link rel="icon" sizes="192x192" href="icon.png">
    
    <!-- reuse same icon for Safari -->
    <link rel="apple-touch-icon" href="ios-icon.png">
    
    <!-- multiple icons for IE -->
    <meta name="msapplication-square310x310logo" content="icon_largetile.png">
    

### Chrome 和 Opera

Chrome 和 Opera 均使用 `icon.png`，图标将被缩放到设备所需的大小。
为防止自动缩放，您还可以通过指定 `sizes` 属性另外提供尺寸。



注：图标大小应基于 48px，例如 48px、96px、144px 和 192px

### Safari

Safari 还使用带有 `rel` 属性的 `<link>` 标记：`apple-touch-icon`。

您可以指定[显式尺寸](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27)，即为每个图标提供单独的链接标记，防止操作系统调整图标的大小：




    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    

### Internet Explorer 和 Windows Phone

Windows 8 的新主屏幕体验可支持 4 种不同固定网站布局，因此需要 4 个图标。
如果您不想支持特定尺寸，则可以省去相关的元标记。



    <meta name="msapplication-square70x70logo" content="icon_smalltile.png">
    <meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
    <meta name="msapplication-wide310x150logo" content="icon_widetile.png">
    

### Internet Explorer 中的磁贴

Microsoft 的“固定网站”及其旋转的“动态磁贴”远远超越了其他实现方法，不在本指南的介绍范围内。
您可以在 MSDN 的[如何创建动态磁贴](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx)中了解更多信息。




## 定义浏览器元素的颜色

使用不同的 `meta` 元素，您可以自定义浏览器，甚至自定义平台的元素。
请谨记，某些元素只能在特定平台或浏览器上使用，但是它们可以大大增强体验。
 

Chrome、Firefox OS、Safari、Internet Explorer 和 Opera Coast 允许您使用元标记来定义浏览器元素的颜色，甚至定义平台的颜色。


### Chrome 和 Opera 的元主题背景色

要指定 Android 版 Chrome 的主题背景色，请使用元主题背景色。

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#4285f4">
    

<img src="imgs/theme-color.png" alt="在 Chrome 中定制地址栏的主题颜色">

### Safari 特定的样式

Safari 允许您设置状态栏样式和指定启动图像。

#### 指定启动图像

默认情况下，Safari 在加载过程中显示空白屏幕，在多次加载之后会显示应用之前状态的屏幕截图。
要避免出现这种情况，您可以通过 `rel=apple-touch-startup-image` 添加一个链接标记，让 Safari 显示独特的启动图像。

例如：


    <link rel="apple-touch-startup-image" href="icon.png">
    

图像必须为目标设备屏幕的特定尺寸，否则不会被使用。
请参考 [Safari 网页内容指南](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)了解更多详情。



尽管 Apple 的文档缺少此主题的内容，但开发者社区已想出一种针对所有设备的办法：使用高级媒体查询来选择相应的设备，然后指定正确的图像。以下是一个可行的解决方法，此方法由 [tfausak 的 gist](//gist.github.com/tfausak/2222823) 提供


#### 更改状态栏的外观

您可以将默认状态栏的外观更改为 `black` 或 `black-translucent`。
通过 `black-translucent`，状态栏浮在全屏内容的顶层，而不是将内容向下推。
这样使布局有更大高度，但有点遮挡顶层。
以下是所需的代码：


    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
<div class="attempt-left">
  <figure>
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption>使用  <code>black-translucent</code> 的屏幕截图</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption>使用  <code>black</code> 的屏幕截图</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>




{# wf_devsite_translation #}
