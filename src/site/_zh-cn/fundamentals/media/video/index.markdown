---
layout: section
title: 视频
description: 了解如何以最简便的方式为您的网站添加视频，并确保用户通过任何设备均可获得最佳体验。
introduction: 视频因其趣味性和信息性而深受用户青睐。在移动设备中，视频是一种更为简单的信息传递方式。但是，视频占用带宽，而且它们在不同的平台上达到的效果可能会有所差异。用户不喜欢等待视频加载，也不喜欢在按下播放键后系统没有任何反应。详细了解为网站添加视频的最简方式，并确保用户通过任何设备均可获得最佳体验。
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
collection: introduction-to-media
id: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - 使用视频元素，以便在您的网站上加载、解码以及播放视频。
    - 制作多种格式的视频，使其可以在多种移动平台上播放。
    - 正确设定视频大小，确保它们不会溢出容器。
    - 辅助功能问题；添加跟踪元素作为视频元素的子元素。
remember:
  media-fragments:
    - 多数移动平台（iOS 除外）都支持 Media Fragments API。
    - 请确保您的服务器支持`范围请求`。默认情况下，多数服务器中的`范围请求`处于启用状态，不过，有些托管服务可能会将其关闭。
  dont-overflow:
    - 请勿强制调整元素尺寸，否则会使宽高比异于原始视频。挤压或拉伸都会造成较差的视觉效果。
  accessibility-matters:
    - Android 版 Chrome、iOS Safari 以及当前的所有桌面版浏览器（Firefox 除外）均支持跟踪元素（请参阅 <a href="http://caniuse.com/track" title="Track element support status">caniuse.com/track</a>）。此外，还有一些 polyfill。我们建议您使用 <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> 或 <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>。
  construct-video-streams:
    - Android 版 Chrome 和 Opera、Internet Explorer 11 以及桌面版 Chrome 均支持 MSE，而且 <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a> 也已计划为其提供支持。
  optimize:
    - <a href="../images/">图片</a>
    - <a href="../../performance/optimizing-content-efficiency/">优化内容效率</a>
---

{% wrap content%}

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/j5fYOYrsocs?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

