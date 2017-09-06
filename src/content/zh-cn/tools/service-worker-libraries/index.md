project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:服务工作线程库。

{# wf_published_on:2015-01-01 #}
{# wf_updated_on:2016-11-07 #}

# 服务工作线程库 {: .page-title }

使用我们的[服务工作线程](/web/fundamentals/getting-started/primers/service-workers)库可以消除服务工作线程样板文件代码，从而简化您的开发工作。



<figure class="attempt-right">
  <img src="/web/tools/images/tools-landing-page.gif">
  <figcaption>服务工作线程库概览</figcaption>
</figure>

**sw-precache&mdash;**与您的构建流程集成，以生成服务工作线程，用于预缓存静态资产，例如 Application Shell。



**sw-toolbox&mdash;**实现常见运行时缓存模式，例如动态内容、API 调用以及第三方资源，实现方法就像编写 README 一样简单。


**sw-offline-google-analytics&mdash;**临时保留并重试 Analytics 请求，以避免请求因网络断开连接而丢失。


<div class="clearfix"></div>

## 为什么使用服务工作线程库？

您赞同向网络应用添加服务工作线程有诸多优势—消除网络不确定性，可以承诺提供离线优先的由服务工作线程支持的快速访问体验。

但是，要从头开始编写您自己的服务工作线程，您必须清除一些障碍：


* 轻松可靠地预缓存网址。 
* 递增缓存版本字符串，以确保预缓存的资源得到更新。
* 实现缓存过期策略，以考虑缓存大小或输入项寿命。
* 构建常见模式，例如 [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi) 网络超时和样板文件代码。
* 在离线使用期间采集和报告 Google Analytics 数据。


您可以使用我们的服务工作线程库解决所有这些缺陷。


## 服务工作线程预缓存 

[服务工作线程预缓存](https://github.com/GoogleChrome/sw-precache/) (`sw-precache`) 是一个模块，用于生成可预缓存资源的服务工作线程。此模块可用于基于 JavaScript 的构建脚本中，例如使用 [`gulp`](https://gulpjs.com/) 编写的脚本。此外，它还提供一个[命令行接口](https://github.com/GoogleChrome/sw-precache/#command-line-interface)。您可以直接使用此模块，或者，您也可以根据自己的喜好，针对特定的构建环境使用一个围绕 `sw-precache` 的[包装器](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)，例如 [`webpack`](https://webpack.github.io/)。




它可以与 [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox) 库[结合使用](https://github.com/GoogleChrome/sw-precache/blob/master/sw-precache-and-sw-toolbox.md)，遵循 [App Shell + 动态内容模型](/web/fundamentals/architecture/app-shell) 进行构建时其效果非常好。


完整文档请参见[阅读详情](https://github.com/GoogleChrome/sw-precache/blob/master/README.md)，[入门指南](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md)提供了快速入门指导。



[获取 sw-precache](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

### 功能

| 功能 | 摘要 |
|---------|---------|
| 预缓存 App Shell | 网络应用的 Shell（它的核心 HTML、JavaScript 和 CSS）可以在用户访问页面时预缓存。|
| 构建时集成 | 集成到您的现有构建流程中：[Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js)、[Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js)或 [命令行](https://github.com/GoogleChrome/sw-precache#command-line-interface)。|
| 实时更新 | 构建中的更改会更新服务工作线程脚本。用户可以获取更新，但您无需手动更新内容或缓存。|
| 没有网络，也没关系 | 无论网络是否可用，都能通过[缓存优先](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)的方式快速提供您的静态资源。|

## Service Worker Toolbox

[Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/) (`sw-toolbox`) 提供一些简单的帮助程序，供您创建自己的服务工作线程时使用。
具体而言，它提供常见的缓存模式和一个[表达方法](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)，以便使用这些策略处理运行时请求。


 

[获取 sw-toolbox](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

### 功能

| 功能 | 摘要 |
|---------|---------|
| 运行时缓存 | 在运行时或第一次使用时，可以缓存较大或不经常使用的资源，如图像。|
| 离线回退 | 在线时从网络加载全新的图像、API 响应或其他动态内容，但离线时将回退到缓存占位符。|
| 告别 Lie-Fi | 在网络过慢时，通过自动回退到缓存响应应对 [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0)。|
| 应对缓存膨胀 | 无需再缓存上个月的图像。最近最少使用和基于时间的缓存到期时间有助于释放空间。|

## Offline Google Analytics

[Offline Google Analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics) 临时保留并重试 Analytics 请求，以避免请求因网络断开连接而丢失。

此工具可以通过 npm 轻松安装到您的构建系统中，也可以轻松导入到您的服务工作线程脚本中。
使用参数化的函数调用对其进行配置。


[获取 sw-offline-google-analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics){: .button .button-primary }

### 功能

| 功能 | 摘要 |
|---------|---------|
| Offline Google Analytics | 创建用于确保 Google Analytics JavaScript 在离线状态下可用的获取处理程序。|
| 临时缓存数据 | 保留在设备处于离线状态时发起的 Analytics 请求并在服务工作线程下次启动时重试这些请求。|
| 自定义重播值 | 要添加到重播的 Google Analytics 请求的键/值对。例如，您可能设置自定义维度来表示请求已重播。|
| 已修改的命中参数 | 例如，让您可以通过编程方式修改命中参数，以跟踪尝试命中到重播之间经过的时间。|

## 了解详情

### 文章

[sw-toolbox 入门指南](http://deanhume.com/home/blogpost/getting-started-with-the-service-worker-toolbox/10134)（作者：Dean Hume）

[使用 sw-precache 向 create-react-app 添加离线支持](https://medium.com/dev-channel/create-react-pwa-7b69425ffa86#.nqsrshawm)（作者：Jeffrey Posnick）

[生产环境中的服务工作线程](/web/showcase/case-study/service-workers-iowa)案例研究仔细分析了 `sw-precache` 和 `sw-toolbox`
库如何让 [Google I/O 2015 网络应用](https://events.google.com/io2015/)更强大。



### 代码实验室

[使用 sw-precache 添加服务工作线程](https://codelabs.developers.google.com/codelabs/sw-precache/index.html#0)

### 视频

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jCKZDTtUA2A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Jeff Posnick 在 Chrome 开发者峰会 2015 上的演说 _Instant Loading with Service Workers_ 说明了如何高效地使用
`sw-precache` 和 `sw-toolbox` 来构建能够快速加载和离线工作的网络应用。



[幻灯片](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15)

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="IIRj8DftkqE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Matt Gaunt 和 Addy Osmani 解释了我们的服务工作线程库可以如何帮助您的网络应用立即离线工作。
此视频介绍了 `sw-precache` 和 `sw-toolbox`。


<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="gfHXekzD7p0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

在本集 Totally Tooling Mini-Tips 视频中，Matt 和 Addy 逐步讲解 `sw-toolbox`。


<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Use459WBeWc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

在 Google I/O 2016 上，Mat Scales 介绍了诸多强大的库和工具，这些库和工具可以使 Progressive Web App 快速加载、出色地离线工作以及实现渐进式增强，这一切都是为了提供更佳的用户体验。




{# wf_devsite_translation #}
