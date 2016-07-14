---
title: "快速参考"
description: "有关视频元素属性的快速概览。"
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
---

<p class="intro">
  有关视频元素属性的快速概览。
</p>

{% include shared/toc.liquid %}


## 视频元素属性

要查看视频元素属性的完整列表及其定义，请参阅[视频元素规范](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element)。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>属性</th>
      <th>适用范围</th>
      <th>说明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="属性"><code>src</code></td>
      <td data-th="适用范围">所有浏览器</td>
      <td data-th="说明">视频地址（网址）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>poster</code></td>
      <td data-th="适用范围">所有浏览器</td>
      <td data-th="说明">视频元素显示后无需下载视频内容就可立即显示的图片文件地址（网址）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>preload</code></td>
      <td data-th="适用范围">所有移动浏览器均无法预加载。</td>
      <td data-th="说明">浏览器提示：播放前预加载元数据（或某个视频）十分重要。选项包括无、元数据或自动（请参阅'预加载'部分，了解详情）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>autoplay</code></td>
      <td data-th="适用范围">iPhone 和 Android 设备均不支持；所有桌面版浏览器、iPad 以及 Android 版 Firefox 和 Opera 均支持。</td>
      <td data-th="Description">尽快开始下载和播放（请参阅'自动播放'部分）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>loop</code></td>
      <td data-th="适用范围">所有浏览器</td>
      <td data-th="说明">循环播放视频。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>controls</code></td>
      <td data-th="适用范围">所有浏览器</td>
      <td data-th="说明">显示默认视频控件（播放、暂停等）。</td>
    </tr>
  </tbody>
</table>

### 自动播放

在桌面设备中，autoplay 会指示浏览器尽快开始下载并播放视频。在 iOS 设备和 Android 版 Chrome 中，autoplay 不起作用；用户必须点按屏幕才能播放视频。

即使是在可以进行自动播放的平台中，您也需要考虑将其启用是否妥当：

* 数据流量可能会十分昂贵。
* 使媒体不事先询问就开始下载并播放，这可能会在无意间占用带宽和 CPU，从而使页面呈现出现延迟。
* 用户可能会处于不便播放音频或视频的环境中。

开发者可通过 [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)) 在 Android WebView 中配置自动播放行为。
默认情况下，它处于启用状态，但是 WebViewIt 应用可选择将其停用。

### 预加载

preload 属性会指示浏览器应预加载的信息或内容量。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>值</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="值"><code>none</code></td>
      <td data-th="说明">用户甚至可能不会观看视频，那就无需预加载任何内容。</td>
    </tr>
    <tr>
      <td data-th="值"><code>metadata</code></td>
      <td data-th="说明">应预加载元数据（时长、尺寸、文字轨道），但要尽量减少视频加载量。</td>
    </tr>
    <tr>
      <td data-th="值"><code>auto</code></td>
      <td data-th="说明">用户都希望可以立即下载整个视频。</td>
    </tr>
  </tbody>
</table>

preload 属性在不同平台中的效果不同。
例如，Chrome 在桌面设备上可以缓冲 25 秒的视频，却无法在 iOS 或 Android 设备上缓冲。这意味着，移动设备上可能会出现播放启动延迟，而在桌面设备上却不会出现这种情况。请参阅 [Steve Souders 的测试网页](//stevesouders.com/tests/mediaevents.php)，了解全部详情。

## JavaScript

[HTML5 Rocks 视频文章](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)详尽地总结了可用于控制视频播放的 JavaScript 属性、方法以及事件。我们在此处添加了上述内容，并根据移动设备的具体要求对相关点进行了更新。

### 属性

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>属性</th>
      <th>说明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="属性"><code>currentTime</code></td>
      <td data-th="说明">获取或设置播放位置（以秒为单位）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>volume</code></td>
      <td data-th="说明">获取或设置视频的当前音量。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>muted</code></td>
      <td data-th="说明">获取静音状态或将音频设为静音。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>playbackRate</code></td>
      <td data-th="说明">获取或设置播放速率；1 表示以常规速度向前播放。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>buffered</code></td>
      <td data-th="说明">说明当前已缓冲、可以播放的视频量（观看<a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demo displaying amount of buffered video in a canvas element">演示</a>）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>currentSrc</code></td>
      <td data-th="说明">视频的当前播放位置。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>videoWidth</code></td>
      <td data-th="说明">以像素为单位表示的视频宽度（这可能会与视频元素宽度有所不同）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>videoHeight</code></td>
      <td data-th="说明">以像素为单位表示的视频高度（这可能会与视频元素高度有所不同）。</td>
    </tr>
  </tbody>
</table>

移动设备既不支持 playbackRate（{% link_sample _code/scripted.html %}观看演示{% endlink_sample %}），也不支持音量。

### 方法

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>方法</th>
    <th>说明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="方法"><code>load()</code></td>
      <td data-th="说明">在没有开始播放的情况下加载或重新加载视频来源：例如，当使用 JavaScript 更改视频 src 时。</td>
    </tr>
    <tr>
      <td data-th="方法"><code>play()</code></td>
      <td data-th="说明">从当前位置播放视频。</td>
    </tr>
    <tr>
      <td data-th="方法"><code>pause()</code></td>
      <td data-th="说明">在当前位置暂停播放视频。</td>
    </tr>
    <tr>
      <td data-th="方法"><code>canPlayType('format')</code></td>
      <td data-th="说明">找出支持的格式（请参阅"支持的格式"）。</td>
    </tr>
  </tbody>
</table>

除非以响应用户操作（例如点击按钮）的方式调用 play() 和 pause()，
否则这两种方法无法在移动设备（Android 版 Opera 除外）上起作用：观看{% link_sample _code/scripted.html %}演示{% endlink_sample %} （同样，您也无法对嵌入式 YouTube 视频等内容执行开始播放的操作）。

### 事件

以下只是部分可能会触发的媒体事件。请参阅 Mozilla 开发者网络上的[媒体事件](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)页面，查看完整列表。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>事件</th>
      <th>说明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="事件"><code>canplaythrough</code></td>
      <td data-th="说明">当所提供的数据足以使浏览器相信自己可以连贯地播放整个视频时触发的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>ended</code></td>
      <td data-th="说明">视频播放完毕后触发的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>error</code></td>
      <td data-th="说明">出现错误时触发的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>playing</code></td>
      <td data-th="说明">视频首次开始播放时、暂停后或重新开始播放时触发的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>progress</code></td>
      <td data-th="说明">为指明下载进度而定期触发的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>waiting</code></td>
      <td data-th="说明">操作延迟，等待另一操作完成时触发的事件。</td>
    </tr>
    <tr>
      <td data-th="事件"><code>loadedmetadata</code></td>
      <td data-th="说明">浏览器完成视频元数据（时长、尺寸、文字轨道）加载后触发的事件。</td>
    </tr>
  </tbody>
</table>



