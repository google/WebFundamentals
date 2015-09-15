---
title: "添加视频"
description: "了解如何以最简便的方式为您的网站添加视频，并确保用户通过任何设备均可获得最佳体验。"
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - 使用视频元素，以便在您的网站上加载、解码以及播放视频。
    - 制作多种格式的视频，使其可以在多种移动平台上播放。
    - 正确设定视频大小，确保它们不会溢出容器。
    - 辅助功能问题；添加跟踪元素作为视频元素的子元素。
notes:
  media-fragments:
    - 多数移动平台（iOS 除外）都支持 Media Fragments API。
    - 请确保您的服务器支持'范围请求'。默认情况下，多数服务器中的'范围请求'处于启用状态，不过，有些托管服务可能会将其关闭。
  dont-overflow:
    - 请勿强制调整元素尺寸，否则会使宽高比异于原始视频。挤压或拉伸都会造成较差的视觉效果。
  accessibility-matters:
    - Android 版 Chrome、iOS Safari 以及当前的所有桌面版浏览器（Firefox 除外）均支持跟踪元素（请参阅 <a href="http://caniuse.com/track" title="Track element support status">caniuse.com/track</a>）。此外，还有一些 polyfill。我们建议您使用 <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> 或 <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>。
  construct-video-streams:
    - Android 版 Chrome 和 Opera、Internet Explorer 11 以及 桌面版 Chrome 均支持 MSE，而且 <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a> 也已计划为其提供支持。
  optimize:
    - <a href="../images/">图片</a>
    - <a href="../../performance/optimizing-content-efficiency/">优化内容效率</a>
---

<p class="intro">
  了解如何以最简便的方式为您的网站添加视频，并确保用户通过任何设备均可获得最佳体验。
</p>

{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.add-a-video %}

## 添加视频元素

添加视频元素，以便在您的网站上加载、解码以及播放视频：

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>此浏览器不支持视频元素。</p>
</video>

{% highlight html %}
<video src="chrome.webm" type="video/webm">
    <p>您的浏览器不支持视频元素。</p>
</video>
{% endhighlight %}

## 指定多个文件格式

不同的浏览器支持的视频格式也会有所差异。
如果用户的浏览器不支持某种格式，那么您可以使用 <source> 元素指定多种格式，以作后备之用。
例如：

{% include_code src=_code/video-main.html snippet=sourcetypes %}

浏览器在解析 <source> 代码时，会使用可选的 type 属性来帮助确定要下载并播放的文件。如果浏览器支持 WebM，则会播放 chrome.webm，否则，浏览器会检查自己是否可以播放 MPEG-4 视频。
请参阅<a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>达人数字媒体入门</a>，详细了解视频和音频在网络中的工作原理。

与提供不同的 HTML 或服务器端脚本相比，此方法有诸多优势，这一点在移动设备上表现得尤为显著：

* 开发者可以根据自己的喜好排列格式顺序。
* 本地客户端转换的延迟时间缩短；只需一个请求即可获取内容。
* 与使用包含用户代理检测的服务器端支持数据库相比，允许浏览器选择格式更为简单、快捷，而且更可靠。
* 指定每个文件的来源类型可提升网络性能；浏览器无需下载部分视频以'嗅探'其格式，就可以选择视频来源。

所有这些在移动环境中尤为重要，因为其中的带宽和延迟性影响最大，因此用户的耐心可能十分有限。
当多个来源具有不支持的类型时，不添加类型属性可能会影响性能。

使用移动浏览器开发者工具比较{% link_sample _code/video-main.html %}具有类型属性{% endlink_sample %}的网络活动和{% link_sample _code/notype.html %}没有类型属性{% endlink_sample %}的网络活动。
同时，请检查浏览器开发者工具中的响应标头以[确保服务器报告正确的 MIME 类型](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)；否则，视频来源类型检查将不起作用。

## 指定开始时间和结束时间

节省带宽并提高网站的自适应性：使用 Media Fragments API 为视频元素添加开始时间和结束时间。

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>此浏览器不支持视频元素。</p>
</video>

要添加媒体片段，只需向媒体网址添加 #t=[start_time][,end_time] 即可。例如，要播放第 5 秒和第 10 秒之间的视频，请指定以下代码：

{% highlight html %}
<source src="video/chrome.webm#t=5,10" type="video/webm">
{% endhighlight %}

您还可以使用 Media Fragments API 提供有关同一个视频的多个视图（如 DVD 中的插入点），而无需编码和提供多个文件。

{% include shared/remember.liquid title="Remember" list=page.notes.media-fragments %}

使用浏览器开发者工具检查响应标头中的 Accept-Ranges: bytes：

<img class="center" alt="Chrome 开发者工具屏幕截图：Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## 添加海报图片

为视频元素添加 poster 属性，以便用户可以在视频加载后立即了解其内容，而无需下载视频或开始播放。

{% highlight html %}
<video poster="poster.jpg" ...>
  ...
</video>
{% endhighlight %}

如果视频 src 损坏或提供的视频格式均不受支持，那么海报也可用作后备资源。海报图片唯一的缺陷是它需要一个额外的文件请求，不仅会占用一些带宽，而且还需要呈现。有关详情，请参阅[图片优化](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization)。

下图对不含海报图片的视频和具有海报图片的视频进行了并排比较，我们已将海报图片设为灰色，以指明它不是视频：

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android 版 Chrome（纵向）屏幕截屏：没有海报" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android 版 Chrome（纵向）屏幕截图：有海报" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



