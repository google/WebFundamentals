---
title: "为旧版平台提供替代方案"
description: "并非所有的视频格式都可以受到所有平台的支持。查看各大平台支持哪些格式，并确保您的视频支持所有这些格式。"
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
  并非所有的视频格式都可以受到所有平台的支持。查看各大平台支持哪些格式，并确保您的视频支持所有这些格式。
</p>

{% include shared/toc.liquid %}


## 查看支持的格式

使用 canPlayType() 找出支持的视频格式。该方法采用与 mime-type 一致的字符串参数和可选编解码器，会返回以下某个值：

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>返回值</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="返回值">（空字符串）</td>
      <td data-th="说明">容器和/或编解码器不受支持。</td>
    </tr>
    <tr>
      <td data-th="返回值"><code>maybe</code></td>
      <td data-th="说明">
        容器和编解码器可能受支持，但是浏览器
        需要下载部分视频才能明确。
      </td>
    </tr>
    <tr>
      <td data-th="返回值"><code>probably</code></td>
      <td data-th="说明">格式似乎受支持。
      </td>
    </tr>
  </tbody>
</table>

以下是一些 canPlayType() 参数示例和在 Chrome 中运行时的返回值：


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>类型</th>
      <th>响应</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="类型"><code>video/xyz</code></td>
      <td data-th="响应">（空字符串）</td>
    </tr>
    <tr>
      <td data-th="类型"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="响应">（空字符串）</td>
    </tr>
    <tr>
      <td data-th="类型"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="响应">（空字符串）</td>
    </tr>
    <tr>
      <td data-th="类型"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="响应"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="类型"><code>video/webm</code></td>
      <td data-th="响应"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="类型"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="响应"><code>probably</code></td>
    </tr>
  </tbody>
</table>


## 制作多种格式的视频

许多工具都可以帮助您将同一视频保存为多种格式：

* 桌面工具：[FFmpeg](//ffmpeg.org/)
* GUI 应用：[Miro](//www.mirovideoconverter.com/)、[HandBrake](//handbrake.fr/) 和 [VLC](//www.videolan.org/)
* 在线编码/转码服务：[Zencoder](//en.wikipedia.org/wiki/Zencoder) 和 [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## 查看所用的格式

想了解浏览器实际所选的视频格式吗？

在 JavaScript 中，使用视频的 currentSrc 属性即可返回所用的来源。

要实际了解此操作，请观看{% link_sample _code/video-main.html %}此演示{% endlink_sample %}：Chrome 和 Firefox 会选择 chrome.webm（因为这是这些浏览器可能支持的来源列表中的首个选项），而 Safari 则会选择 chrome.mp4。



