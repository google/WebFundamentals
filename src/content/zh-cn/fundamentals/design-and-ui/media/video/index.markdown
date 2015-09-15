---
title: "视频"
description: "学习给网站添加视频的最简方法，确保用户在任何设备上均可获得最佳体验。"
updated_on: 2014-04-29
translators:
  - samchen
key-takeaways:
  add-a-video:
    - 在你的网站上使用 video 元素加载、解码然后播放视频。
    - 制作多种格式的视频，覆盖多种移动平台。
    - 正确设定视频大小，确保它们不会溢出容器。
    - 可访问性很重要；添加 track 元素作为 video 元素的子元素。
notes:
  media-fragments:
    - 多数平台（iOS 除外）都支持 Media Fragments API。
    - 请确保您的服务器支持 Range 请求头。默认情况下，多数服务器开启了 Range 请求头支持，不过，有些托管服务可能会将其关闭。
  dont-overflow:
    - 调整元素尺寸时，不要出现宽高比异于原始视频的情况。挤压或拉伸的效果都糟糕。
  accessibility-matters:
    - Android 版 Chrome、iOS Safari 以及当前的所有桌面版浏览器（Firefox 除外）均支持 track 元素（请参阅 <a href="http://caniuse.com/track" title="Track 元素的支持状况">caniuse.com/track</a>）。此外，还有一些 polyfill 可用。我们建议您使用 <a href='//www.delphiki.com/html5/playr/' title='Playr track 元素 polyfill'>Playr</a> 或 <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>。
  construct-video-streams:
    - Android 上的 Chrome 和 Opera、Internet Explorer 11 以及桌面版 Chrome 均支持 MSE，而且 <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions 实施时间表'>Firefox</a> 也已计划为其提供支持。
  optimize:
    - <a href="../images/">图片</a>
    - <a href="../../performance/optimizing-content-efficiency/">优化内容效率</a>
---

<p class="intro">
  用户喜欢视频，它们有趣，信息量大。在移动设备上，视频是一种更方便的信息传递方式。但是，视频占用带宽，而且不同平台上它们效果并不如一。用户不喜欢等待视频加载，也不喜欢按下播放键后没有任何反应。请继续阅读，找出给网站添加视频的最简方法，确保用户在任何设备上均可获得最佳体验。
</p>

{% ytvideo j5fYOYrsocs %}



