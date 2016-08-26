project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 并非所有的视频格式都可以受到所有平台的支持。查看各大平台支持哪些格式，并确保您的视频支持所有这些格式。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 为旧版平台提供替代方案 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



并非所有的视频格式都可以受到所有平台的支持。查看各大平台支持哪些格式，并确保您的视频支持所有这些格式。



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

要实际了解此操作，请观看<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">此演示</a>：Chrome 和 Firefox 会选择 chrome.webm（因为这是这些浏览器可能支持的来源列表中的首个选项），而 Safari 则会选择 chrome.mp4。



