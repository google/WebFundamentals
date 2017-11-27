project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:了解如何以最简便的方式为您的网站添加视频，并确保用户在任何设备上均可获得最佳体验。

{# wf_updated_on:2014-04-28 #}
{# wf_published_on:2014-04-15 #}

# 视频 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

用户喜欢视频，它们有趣，信息量大。在移动设备上，视频是一种更方便的信息传递方式。
但是，视频占用带宽，并且在不同平台上的流畅程度也不尽相同。
用户不喜欢等待视频加载，也不喜欢按下播放键后没有任何反应。
请继续阅读，找出给网站添加视频的最简单方法，确保用户在任何设备上均可获得最佳体验。




## 添加视频 

### TL;DR {: .hide-from-toc }
- 使用 `video` 元素在网站上加载、解码以及播放视频。
- 制作多种格式的视频，使其可以在多种移动平台上播放。
- 正确设定视频大小，确保它们不会溢出容器。
- 无障碍服务很重要；添加 `track` 元素作为 `video` 元素的子元素。


### 添加视频元素

添加 `video` 元素，以便在网站上加载、解码以及播放视频：

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
  <p>This browser does not support the video element.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>您的浏览器不支持 video 元素。</p>
    </video>
    

### 指定多个文件格式

并非所有浏览器都支持相同的视频格式。可以使用 `<source>` 元素指定多种格式，以在用户的浏览器不支持某种格式时作为后备之用。



例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external }

浏览器在解析 `<source>` 标记时，会使用可选的 `type` 属性帮助确定要下载并播放的文件。
如果浏览器支持 `WebM`，则会播放 chrome.webm，否则，浏览器会检查自己是否可以播放 MPEG-4 视频。



请参阅 [A Digital Media Primer for Geeks](//www.xiph.org/video/vid1.shtml)，详细了解视频和音频在网络中的工作原理。


与提供不同的 HTML 或服务器端脚本相比，此方法有诸多优势，这一点在移动设备上表现得尤为显著：


* 开发者可以根据自己的喜好排列格式顺序。
* 本地客户端转换的延迟时间缩短；只需发出一个请求即可获取内容。
* 与使用包含 User Agent 检测的服务器端支持数据库相比，允许浏览器选择格式更简单、更快捷并且更可靠。
* 指定每个文件的来源类型可提升网络性能；浏览器无需下载部分视频以“嗅探”其格式，就可以选择视频来源。


所有这些在移动环境中尤为重要，因为在移动环境中，带宽和延迟的影响最大，用户的耐心可能十分有限。当多个来源具有不支持的类型时，不添加 type 属性可能会影响性能。




使用移动浏览器开发者工具比较[具有 type 属性](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external }的网络活动和[没有 type 属性](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html){: target="_blank" .external }的网络活动。

同时，请检查浏览器开发者工具中的响应标头以[确保服务器报告正确的 MIME 类型](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)；否则，视频来源类型检查将不起作用。



### 指定开始时间和结束时间

节省带宽并提高网站的自适应性：使用 Media Fragments API 为视频元素添加开始时间和结束时间。


<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>此浏览器不支持视频元素。</p>
</video>

要添加媒体片段，只需向媒体网址添加 `#t=[start_time][,end_time]` 即可。
例如，要播放第 5 秒和第 10 秒之间的视频，请指定以下代码：



    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

您还可以使用 Media Fragments API 提供有关同一个视频的多个视图，就如 DVD 中的记忆点一样，而无需编码和提供多个文件。




注意：除 iOS 之外的大多数平台都支持 Media Fragments API。此外，确保服务器支持 Range Requests。默认情况下，多数服务器中的 Range Requests 处于启用状态，不过，有些托管服务可能会将其停用。

使用浏览器开发者工具检查响应标头中的 `Accept-Ranges: bytes`：


<img class="center" alt="Chrome DevTools 屏幕截图：Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### 包括海报图像

为 `video` 元素添加 poster 属性，以便用户可以在元素加载后立即了解其内容，而无需下载或播放视频。




    <video poster="poster.jpg" ...>
      ...
    </video>
    

如果视频 `src` 损坏或提供的视频格式均不受支持，那么海报也可用作后备资源。
海报图像唯一的缺点是它需要一个额外的文件请求，这不仅会占用一些带宽，还需要进行渲染。如需了解详细信息，请参阅[图像优化](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)。

下图对不含海报图像的视频和含海报图像的视频进行了并排比较，我们已将海报图像设为灰色，以表示它不是视频：

<div class="attempt-left">
  <figure>
    <img alt="Android 版 Chrome 屏幕截图（纵向）：不含海报" src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Android 版 Chrome 屏幕截图（纵向）：不含海报
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android 版 Chrome 屏幕截图（纵向）：含海报" src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Android 版 Chrome 屏幕截图（纵向）：含海报
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


## 为旧版平台提供替代方案 

并非所有的视频格式都可以受到所有平台的支持。查看各大平台支持哪些格式，并确保您的视频能以所有这些格式运行。




### 查看支持的格式 {: #check-formats }

使用 `canPlayType()` 找出支持的视频格式。此方法所带的字符串参数包括一个 `mime-type` 和可选编解码器，返回以下某个值：



<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">返回值和说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">（空字符串）</td>
      <td data-th="Description">容器和/或编解码器不受支持。</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        容器和编解码器可能受支持，但是浏览器需要下载部分视频才能确认。
      </td>
    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">格式似乎受支持。
      </td>
    </tr>
  </tbody>
</table>

以下是一些 `canPlayType()` 参数示例和在 Chrome 中运行时的返回值：


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">类型和响应</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">（空字符串）</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">（空字符串）</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">（空字符串）</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### 制作多种格式的视频

许多工具都可以帮助您将同一视频保存为多种格式：

* 桌面工具：[FFmpeg](//ffmpeg.org/)
* GUI 应用：[Miro](http://www.mirovideoconverter.com/)、[HandBrake](//handbrake.fr/)、[VLC](//www.videolan.org/)
* 在线编码/转码服务：[Zencoder](//en.wikipedia.org/wiki/Zencoder)、[Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)



### 查看所用的格式

想了解浏览器实际所选的视频格式吗？

在 JavaScript 中，使用视频的 `currentSrc` 属性即可返回所用的来源。



## 正确调整视频大小 

谈到如何让用户始终感到满意，文件大小很重要。


### TL;DR {: .hide-from-toc }
- 请不要提供帧尺寸或质量超过平台处理能力的视频。
- 请严格根据需要控制视频的长度。
- 视频过长可能导致下载和搜寻停顿；一些浏览器可能需要等到视频下载完毕才能开始播放。


### 检查视频大小

编码时的实际视频帧尺寸可能不同于 video 元素尺寸（这与显示的图片尺寸可能并非其实际尺寸是一个道理）。



要检查视频的编码大小，请使用 video 元素的 `videoWidth` 和 `videoHeight` 属性，`width` 和 `height` 返回 video 元素的尺寸，这些尺寸可能已使用 CSS 或内联宽度和高度属性进行过调整。




### 确保视频不会溢出容器

如果 video 元素过大，视口容纳不下，则可能会从容器中溢出，从而使用户无法观看内容或使用控件。



<div class="attempt-left">
  <figure>
    <img alt="Android 版 Chrome 屏幕截图（纵向）：未设置样式的 video 元素溢出了视口    " src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Android 版 Chrome 屏幕截图（纵向）：未设置样式的 video 元素溢出了视口
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android 版 Chrome 屏幕截图（横向）：未设置样式的 video 元素溢出了视口" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>
      Android 版 Chrome 屏幕截图（横向）：未设置样式的 video 元素溢出了视口
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

可以使用 JavaScript 或 CSS 控制视频尺寸。JavaScript 内容库和插件（如 [FitVids](http://fitvidsjs.com/)）可以维持合适的视频大小和纵横比，即使是 YouTube 和其他来源中的 Flash 视频也不例外。




使用 [CSS 媒体查询](/web/fundamentals/design-and-ux/responsive/#css-media-queries)来根据视口尺寸指定元素大小；`max-width: 100%` 是您的好帮手。

对于 iframe 中的媒体内容（如 YouTube 视频），请尝试使用自适应方法（如 [John Surdakowski 提出的](http://avexdesigns.com/responsive-youtube-embed/)方法）。



注意：请勿强制调整元素尺寸，否则会使宽高比异于原始视频。挤压或拉伸都会造成较差的视觉效果。

**CSS**：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML**：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }

对比[自适应示例](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }和[非自适应版本](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html){: target="_blank" .external }。



## 自定义视频播放器

不同的平台显示视频的方式也不相同。移动解决方案需要考虑设备方向。
使用 Fullscreen API 可以控制视频内容的全屏视图。



### 设备方向在不同设备中的工作原理

台式机显示器或笔记本电脑没有设备方向问题，但设备方向对移动设备或平板电脑网页设计至关重要。


iPhone 版 Safari 可以在横向和纵向之间自由转换：


<div class="attempt-left">
  <figure>
    <img  alt="iPhone 版 Safari 中播放的视频的屏幕截图（纵向）" src="images/iPhone-video-playing-portrait.png">
    <figcaption>iPhone 版 Safari 中播放的视频的屏幕截图（纵向）</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="iPhone 版 Safari 中播放的视频的屏幕截图（横向）" src="images/iPhone-video-playing-landscape.png">
    <figcaption>iPhone 版 Safari 中播放的视频的屏幕截图（横向）</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

iPad 和 Android 版 Chrome 中的设备方向问题十分棘手。例如，在未进行自定义设置的情况下，在 iPad 上横向播放的视频如下所示：



<img alt="配 Retina 屏的 iPad 版 Safari 中播放的视频的屏幕截图（横向）"
src="images/iPad-Retina-landscape-video-playing.png">

使用 CSS 设置视频 `width: 100%` 或 `max-width: 100%` 可解决许多设备方向布局方面的问题。
您还可以考虑全屏模式替代方案。


## 内联或全屏显示

<img class="attempt-right" alt="iPhone 上 video 元素的屏幕截图（纵向）" src="images/iPhone-video-with-poster.png">

不同的平台显示视频的方式也不相同。iPhone 版 Safari 会在网页中内联显示 video 元素，但会以全屏模式播放视频：


<div style="clear:both;"></div>

<img class="attempt-right" alt="Android 版 Chrome 中视频播放的屏幕截图（纵向）" src="images/Chrome-Android-video-playing-portrait-3x5.png">

在 Android 设备上，用户可以通过点击全屏图标来请求全屏模式。
但默认情况下，浏览器以内联模式播放视频：

<div style="clear:both;"></div>

<img class="attempt-right" alt="配 Retina 屏的 iPad 版 Safari 中播放的视频的屏幕截图（横向）" src="images/iPad-Retina-landscape-video-playing.png">

iPad 版 Safari 以内联模式播放视频：

<div style="clear:both;"></div>

### 控制内容的全屏模式

不强制视频全屏播放的平台为 Fullscreen API 提供[广泛支持](http://caniuse.com/#feat=fullscreen)。
使用此 API 可以控制内容或网页的全屏模式。


以全屏模式显示某元素，如视频：

    elem.requestFullScreen();
    

以全屏模式显示整个文档：

    document.body.requestFullScreen();
    

您还可以侦听全屏状态变化：

    video.addEventListener("fullscreenchange", handler);
    

或者，查看元素当前是否处于全屏模式：

    console.log("In full screen mode: ", video.displayingFullscreen);
    

您也可以使用 CSS `:fullscreen` 伪类来更改全屏模式下元素的显示方式。


<video autoplay muted loop class="attempt-right">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
  <p>此浏览器不支持视频元素。</p>
</video>

在支持 Fullscreen API 的设备中，考虑将缩略图用作视频占位符：


要了解此操作实例，请观看[演示](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html){: target="_blank" .external }。

Dogfood：`requestFullScreen()` 可能添加了供应商前缀，并且可能需要额外代码才能实现全面的跨浏览器兼容性。

<div style="clear:both;"></div>




## 无障碍服务很重要

无障碍服务并非一项功能。失聪用户无法理解没有字幕的视频，而失明用户则无法观看没有解说的视频。向视频中添加这些内容所花费的时间代价比为用户提供糟糕体验所付出的代价要小得多。至少为所有用户提供基础体验。


### 添加字幕以改善无障碍服务

<img class="attempt-right" alt="展示在 Android 版 Chrome 中使用 track 元素后字幕显示情况的屏幕截图" src="images/Chrome-Android-track-landscape-5x3.jpg">

要使媒体在移动设备上更易访问，请使用 track 元素添加字幕或说明。


<div style="clear:both;"></div>

### 添加 track 元素

您可以轻松为视频添加字幕，只需添加一个 track 元素作为 video 元素的子项即可：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/track.html){: target="_blank" .external }

跟踪元素的 `src` 属性决定跟踪文件的位置。

## 在跟踪文件中定义字幕

跟踪文件包括 WebVTT 格式的定时“提示”：

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...

Dogfood：Chrome（Android 版）、iOS Safari 以及当前的所有桌面版浏览器（Firefox 除外）均支持 track 元素（请参阅 [caniuse.com/track](http://caniuse.com/track)）。此外，还有一些 polyfill。我们建议使用 [Captionator](http://captionatorjs.com/){: .external }。




## 快速参考资料

### Video 元素属性

要查看 video 元素属性的完整列表及其定义，请参阅 [video 元素规范](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element)。


<table>
  <thead>
    <tr>
      <th>属性</th>
      <th>可用性</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">所有浏览器。</td>
      <td data-th="Description">视频的地址（网址）。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">所有浏览器。</td>
      <td data-th="Description">video 元素显示后无需下载视频内容浏览器就可立即显示的图片文件的地址（网址）。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">所有移动浏览器均忽略 preload。</td>
      <td data-th="Description">提示浏览器：播放前预加载元数据（或某个视频）十分重要。选项包括 none、metadata 或 auto（请参阅<a href="#preload">预加载</a>部分了解详情）。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">iPhone 和 Android 设备均不支持；所有桌面版浏览器、iPad 以及 Android 版 Firefox 和 Opera 均支持。</td>
      <td data-th="Description">尽快开始下载和播放（请参阅<a href="#autoplay">自动播放</a>部分了解详情）。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">所有浏览器。</td>
      <td data-th="Description">循环播放视频。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">所有浏览器。</td>
      <td data-th="Description">显示默认视频控件（播放、暂停等）。</td>
    </tr>
  </tbody>
</table>

### 自动播放 {: #autoplay }

在桌面设备上，`autoplay` 会指示浏览器立即下载并播放视频。在 iOS 设备和 Chrome（Android 版）中，`autoplay` 不起作用；用户必须点按屏幕才能播放视频。

即使是在可以进行自动播放的平台上，您也需要考虑将其启用是否妥当：


* 流量消耗的费用可能十分高昂。
* 使媒体不事先询问就开始下载和播放可能会在无意间占用带宽和 CPU，从而使页面呈现出现延迟。
* 用户可能处于不便播放音频或视频的环境中。

可通过 [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)) 在 Android WebView 中配置自动播放行为。默认情况下它处于启用状态，但是 WebView 应用可选择将其停用。



### 预加载 {: #preload }

`preload` 属性会提示浏览器应预加载的信息或内容量。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">值和说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Description">用户甚至可能不会观看视频，那就无需预加载任何内容。</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">应预加载元数据（时长、尺寸、文字轨道），但要尽量减少视频加载量。</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">用户希望可以立即下载整个视频。</td>
    </tr>
  </tbody>
</table>

`preload` 属性在不同平台上的效果不同。例如，Chrome 在桌面设备上可以缓冲 25 秒的视频，却无法在 iOS 或 Android 设备上缓冲。这意味着，移动设备上可能会出现播放启动延迟，而在桌面设备上却不会出现这种情况。请参阅 [Steve Souders 的测试网页](//stevesouders.com/tests/mediaevents.php)，了解全部详情。


### JavaScript

[The HTML5 Rocks Video article](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) 详尽地总结了可用于控制视频播放的 JavaScript 属性、方法以及事件。我们在此处添加了上述内容，并根据移动设备的具体要求对相关点进行了更新。


#### 属性

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">属性和说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">获取或设置播放位置（以秒为单位）。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">获取或设置视频的当前音量。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">获取静音状态或将音频设为静音。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">获取或设置播放速率；1 表示以常规速度向前播放。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">说明当前已缓冲、可以播放的视频量。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">播放中视频的地址。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">以像素为单位表示的视频宽度（这可能会与 video 元素宽度有所不同）。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">以像素为单位表示的视频高度（这可能会与 video 元素高度有所不同）。</td>
    </tr>
  </tbody>
</table>

移动设备既不支持 `playbackRate`（[观看演示](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }），也不支持 `volume`。

#### 方法

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">方法和说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">在没有开始播放的情况下加载或重新加载视频来源：例如，当使用 JavaScript 更改视频 src 时。</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">从当前位置播放视频。</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">在当前位置暂停播放视频。</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">找出支持的格式（请参阅<a href="#check-formats">查看支持的格式</a>）。</td>
    </tr>
  </tbody>
</table>

除非以响应用户操作（例如点击按钮）的方式调用 `play()` 和 `pause()`， 否则这两种方法无法在移动设备（Android 版 Opera 除外）上起作用：观看[演示](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }。（同样，您也无法对嵌入式 YouTube 视频等内容执行开始播放的操作。）





#### 事件

以下只是部分可能会触发的媒体事件。请参阅 Mozilla 开发者网络上的[媒体事件](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)页面，查看完整列表。



<table class="responsive">
  <thead>
  <tr>
    <th colspan="2">事件和说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">当所提供的数据足以使浏览器相信自己可以连贯地播放整个视频时触发的事件。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">视频播放完毕后触发的事件。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">出现错误时触发的事件。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">视频首次开始播放时、暂停后或重新开始播放时触发的事件。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">为指明下载进度而定期触发的事件。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">操作延迟，等待另一操作完成时触发的事件。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">浏览器完成视频元数据（时长、尺寸、文字轨道）加载后触发的事件。</td>
    </tr>
  </tbody>
</table>




{# wf_devsite_translation #}
