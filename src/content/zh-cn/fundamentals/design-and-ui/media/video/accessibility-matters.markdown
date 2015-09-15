---
title: "辅助功能问题"
description: "辅助功能并非一项功能。"
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
  辅助功能并非一项功能。失聪用户无法理解没有字幕的视频，而失明用户则无法'观看'没有解说的视频。花些时间向视频中添加这些内容比为用户提供糟糕的体验要好得多。至少为所有用户提供一种满足其基本需求的体验。
</p>

{% include shared/toc.liquid %}



## 添加字幕以改善辅助功能

要使媒体在移动设备上更易访问，请使用跟踪元素添加字幕或说明。

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

使用跟踪元素后，字幕会如下所示：

 <img class="center" alt="展示在 Android 版 Chrome 中使用跟踪元素时所显示的字幕的屏幕截图" src="images/Chrome-Android-track-landscape-5x3.jpg">

## 添加跟踪元素

您可以轻松为视频添加字幕，只需添加一个跟踪元素作为视频元素的子元素即可：

{% include_code src=_code/track.html snippet=track lang=html %}

跟踪元素的 src 属性决定跟踪文件的位置。

## 定义跟踪文件中的字幕

跟踪文件包括 WebVTT 格式的定时'插入'：

    WEBVTT

    00:00.000 --> 00:04.000
    坐在树枝上使用笔记本电脑的人。

    00:05.000 --> 00:08.000
    树枝折断，他开始下落。

    ...



