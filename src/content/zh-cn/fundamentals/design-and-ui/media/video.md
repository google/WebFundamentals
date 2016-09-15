project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 学习给网站添加视频的最简方法，确保用户在任何设备上均可获得最佳体验。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 视频 {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}


Translated By: 

{% include "web/_shared/contributors/samchen.html" %}



用户喜欢视频，它们有趣，信息量大。在移动设备上，视频是一种更方便的信息传递方式。但是，视频占用带宽，而且不同平台上它们效果并不如一。用户不喜欢等待视频加载，也不喜欢按下播放键后没有任何反应。请继续阅读，找出给网站添加视频的最简方法，确保用户在任何设备上均可获得最佳体验。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## 添加视频 




了解如何以最简便的方式为您的网站添加视频，并确保用户通过任何设备均可获得最佳体验。



### TL;DR {: .hide-from-toc }
- 使用视频元素，以便在您的网站上加载、解码以及播放视频。
- 制作多种格式的视频，使其可以在多种移动平台上播放。
- 正确设定视频大小，确保它们不会溢出容器。
- 辅助功能问题；添加跟踪元素作为视频元素的子元素。


### 添加视频元素

添加视频元素，以便在您的网站上加载、解码以及播放视频：

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>此浏览器不支持视频元素。</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>您的浏览器不支持视频元素。</p>
    </video>
    

### 指定多个文件格式

不同的浏览器支持的视频格式也会有所差异。
如果用户的浏览器不支持某种格式，那么您可以使用 <source> 元素指定多种格式，以作后备之用。
例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/video-main.html" region_tag="sourcetypes" %}
</pre>

浏览器在解析 <source> 代码时，会使用可选的 type 属性来帮助确定要下载并播放的文件。如果浏览器支持 WebM，则会播放 chrome.webm，否则，浏览器会检查自己是否可以播放 MPEG-4 视频。
请参阅<a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>达人数字媒体入门</a>，详细了解视频和音频在网络中的工作原理。

与提供不同的 HTML 或服务器端脚本相比，此方法有诸多优势，这一点在移动设备上表现得尤为显著：

* 开发者可以根据自己的喜好排列格式顺序。
* 本地客户端转换的延迟时间缩短；只需一个请求即可获取内容。
* 与使用包含用户代理检测的服务器端支持数据库相比，允许浏览器选择格式更为简单、快捷，而且更可靠。
* 指定每个文件的来源类型可提升网络性能；浏览器无需下载部分视频以'嗅探'其格式，就可以选择视频来源。

所有这些在移动环境中尤为重要，因为其中的带宽和延迟性影响最大，因此用户的耐心可能十分有限。
当多个来源具有不支持的类型时，不添加类型属性可能会影响性能。

使用移动浏览器开发者工具比较<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">具有类型属性</a>的网络活动和<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">没有类型属性</a>的网络活动。
同时，请检查浏览器开发者工具中的响应标头以[确保服务器报告正确的 MIME 类型](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)；否则，视频来源类型检查将不起作用。

### 指定开始时间和结束时间

节省带宽并提高网站的自适应性：使用 Media Fragments API 为视频元素添加开始时间和结束时间。

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>此浏览器不支持视频元素。</p>
</video>

要添加媒体片段，只需向媒体网址添加 #t=[start_time][,end_time] 即可。例如，要播放第 5 秒和第 10 秒之间的视频，请指定以下代码：


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

您还可以使用 Media Fragments API 提供有关同一个视频的多个视图（如 DVD 中的插入点），而无需编码和提供多个文件。

Note: - 多数移动平台（iOS 除外）都支持 Media Fragments API。
- 请确保您的服务器支持'范围请求'。默认情况下，多数服务器中的'范围请求'处于启用状态，不过，有些托管服务可能会将其关闭。


使用浏览器开发者工具检查响应标头中的 Accept-Ranges: bytes：

<img class="center" alt="Chrome 开发者工具屏幕截图：Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### 添加海报图片

为视频元素添加 poster 属性，以便用户可以在视频加载后立即了解其内容，而无需下载视频或开始播放。


    <video poster="poster.jpg" ...>
      ...
    </video>
    

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


## 为旧版平台提供替代方案 




并非所有的视频格式都可以受到所有平台的支持。查看各大平台支持哪些格式，并确保您的视频支持所有这些格式。



### 查看支持的格式

使用 canPlayType() 找出支持的视频格式。该方法采用与 mime-type 一致的字符串参数和可选编解码器，会返回以下某个值：

<table>
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


<table>
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


### 制作多种格式的视频

许多工具都可以帮助您将同一视频保存为多种格式：

* 桌面工具：[FFmpeg](//ffmpeg.org/)
* GUI 应用：[Miro](//www.mirovideoconverter.com/)、[HandBrake](//handbrake.fr/) 和 [VLC](//www.videolan.org/)
* 在线编码/转码服务：[Zencoder](//en.wikipedia.org/wiki/Zencoder) 和 [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### 查看所用的格式

想了解浏览器实际所选的视频格式吗？

在 JavaScript 中，使用视频的 currentSrc 属性即可返回所用的来源。

要实际了解此操作，请观看<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">此演示</a>：Chrome 和 Firefox 会选择 chrome.webm（因为这是这些浏览器可能支持的来源列表中的首个选项），而 Safari 则会选择 chrome.mp4。


## 正确设置视频大小 




大小对提升用户满意度十分重要。


### TL;DR {: .hide-from-toc }
- 请勿提供框架大小或质量超过平台处理范围的视频。
- 提供适当时长的视频。
- 视频较长可能会导致无法顺畅下载和定位：一些浏览器可能需要等待视频下载完成后才可播放。



### 查看视频大小

视频框架实际编码大小可能会与视频元素的尺寸有所不同（正如图片可能不会以实际尺寸显示一样）。

要查看视频的编码大小，请使用视频元素的 videoWidth 和 videoHeight 属性。width 和 height 会返回视频元素的尺寸，而这些尺寸可能已使用 CSS 或内联宽度和高度属性进行过调整。

### 确保视频不会溢出容器

如果视频元素过大，不适合当前视口，则可能会从容器中溢出，从而使用户无法观看内容或使用
控件。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Android 版 Chrome（纵向）屏幕截图：未设置样式的视频元素从视口溢出" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Android 版 Chrome（横向）屏幕截图：未设置样式的视频元素从视口溢出" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

您可以使用 JavaScript 或 CSS 控制视频尺寸。JavaScript 图库和插件（如 [FitVids](//fitvidsjs.com/)）可以维持合适的视频大小及宽高比，即使是 YouTube 和其他来源中的 Flash 视频也不例外。

使用 [CSS 媒体查询](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) 来根据视口尺寸指定元素大小；max-width: 100% 是您的最佳帮手。

{# include shared/related_guides.liquid inline=true list=page.related-guides.media #}

对于 iframe 中的媒体内容（如 YouTube 视频），请尝试使用自适应方法（如 [John Surdakowski 提出的方法](//avexdesigns.com/responsive-youtube-embed/)）。

Note: 请勿强制调整元素尺寸，否则会使宽高比异于原始视频。挤压或拉伸都会造成较差的视觉效果。

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/responsive_embed.html" region_tag="styling"   adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/responsive_embed.html" region_tag="markup"   adjust_indentation="auto" %}
</pre>

对比<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">自适应示例</a>和<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">非自适应版本</a>。


## 自定义视频播放器 




不同的平台展示视频的方式也不相同。移动解决方案需要考虑设备方向。使用 Fullscreen API 可以控制视频内容的全屏视图。



不同的平台展示视频的方式也不相同。移动解决方案需要考虑设备方向。使用 Fullscreen API 可以控制视频内容的全屏视图。

### 设备方向在不同设备中的工作原理

设备方向对台式机显示器或笔记本电脑而言不会构成问题，但对移动设备或平板电脑网页设计却是至关重要。

iPhone 版 Safari 可以在横向和纵向之间自由转换：

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="在 iPhone（纵向）版 Safari 中播放视频的屏幕截图" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="在 iPhone（横向）版 Safari 中播放视频的屏幕截图" src="images/iPhone-video-playing-landscape.png">
</div>

iPad 和 Android 版 Chrome 中的设备方向问题十分棘手。
例如，在未进行自定义设置的情况下，iPad 上横向播放的视频如下所示：

<img class="center" alt="iPad Retina（横向）版 Safari 的视频播放的屏幕截图"
src="images/iPad-Retina-landscape-video-playing.png">

使用 CSS 设置视频 width: 100% 或 max-width: 100% 可解决许多设备方向版式方面的问题。您还可以考虑将全屏模式用作替代方案。

### 内联或全屏显示

不同的平台展示视频的方式也不相同。iPhone 版 Safari 会在网页中内联显示视频元素，却会以全屏模式播放视频：

<img class="center" alt="iPhone（纵向）中的视频元素屏幕截图" src="images/iPhone-video-with-poster.png">

在 Android 设备中，用户可以通过点击全屏图标来请求全屏模式。但是默认情况下，浏览器以内联模式播放视频：

<img class="center" alt="Android 版 Chrome（纵向）中播放视频的屏幕截图" src="images/Chrome-Android-video-playing-portrait-3x5.png">

iPad 版 Safari 以内联模式播放视频：

<img class="center" alt="iPad Retina（横向）版 Safari 的视频播放的屏幕截图" src="images/iPad-Retina-landscape-video-playing.png">

### 控制内容的全屏模式

不强制视频全屏播放的平台为 Fullscreen API 提供[广泛支持](//caniuse.com/fullscreen)。使用此 API 可以控制内容或网页的全屏模式。

以全屏模式显示某元素，如video:

    elem.requestFullScreen();
    

以全屏模式显示整个文档：

    document.body.requestFullScreen();
    

您还可以监听全屏状态变化：

    video.addEventListener("fullscreenchange", handler);
    

或者，查看元素当前是否处于全屏模式：

    console.log("In full screen mode: ", video.displayingFullscreen);
    

您也可以使用 CSS :fullscreen 伪类来更改以全屏模式显示的元素的显示方式。

在支持 Fullscreen API 的设备中，考虑将缩略图用作视频占位符：

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>此浏览器不支持视频元素。</p>
</video>

要实际了解此操作，请观看<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">演示</a>。

Note: `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.


## 辅助功能问题 




辅助功能并非一项功能。失聪用户无法理解没有字幕的视频，而失明用户则无法'观看'没有解说的视频。花些时间向视频中添加这些内容比为用户提供糟糕的体验要好得多。至少为所有用户提供一种满足其基本需求的体验。




### 添加字幕以改善辅助功能

要使媒体在移动设备上更易访问，请使用跟踪元素添加字幕或说明。

Note: Android 版 Chrome、iOS Safari 以及当前的所有桌面版浏览器（Firefox 除外）均支持跟踪元素（请参阅 <a href="http://caniuse.com/track" title="Track element support status">caniuse.com/track</a>）。此外，还有一些 polyfill。我们建议您使用 <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> 或 <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>。

使用跟踪元素后，字幕会如下所示：

 <img class="center" alt="展示在 Android 版 Chrome 中使用跟踪元素时所显示的字幕的屏幕截图" src="images/Chrome-Android-track-landscape-5x3.jpg">

### 添加跟踪元素

您可以轻松为视频添加字幕，只需添加一个跟踪元素作为视频元素的子元素即可：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/track.html" region_tag="track"   adjust_indentation="auto" %}
</pre>

跟踪元素的 src 属性决定跟踪文件的位置。

### 定义跟踪文件中的字幕

跟踪文件包括 WebVTT 格式的定时'插入'：

    WEBVTT

    00:00.000 --> 00:04.000
    坐在树枝上使用笔记本电脑的人。

    00:05.000 --> 00:08.000
    树枝折断，他开始下落。

    ...


## 快速参考 




有关视频元素属性的快速概览。



### 视频元素属性

要查看视频元素属性的完整列表及其定义，请参阅[视频元素规范](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element)。

<table>
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

#### 自动播放

在桌面设备中，autoplay 会指示浏览器尽快开始下载并播放视频。在 iOS 设备和 Android 版 Chrome 中，autoplay 不起作用；用户必须点按屏幕才能播放视频。

即使是在可以进行自动播放的平台中，您也需要考虑将其启用是否妥当：

* 数据流量可能会十分昂贵。
* 使媒体不事先询问就开始下载并播放，这可能会在无意间占用带宽和 CPU，从而使页面呈现出现延迟。
* 用户可能会处于不便播放音频或视频的环境中。

开发者可通过 [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)) 在 Android WebView 中配置自动播放行为。
默认情况下，它处于启用状态，但是 WebViewIt 应用可选择将其停用。

#### 预加载

preload 属性会指示浏览器应预加载的信息或内容量。

<table>
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

### JavaScript

[HTML5 Rocks 视频文章](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)详尽地总结了可用于控制视频播放的 JavaScript 属性、方法以及事件。我们在此处添加了上述内容，并根据移动设备的具体要求对相关点进行了更新。

#### 属性

<table>
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

移动设备既不支持 playbackRate（<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/scripted.html">观看演示</a>），也不支持音量。

#### 方法

<table>
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
否则这两种方法无法在移动设备（Android 版 Opera 除外）上起作用：观看<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/scripted.html">演示</a> （同样，您也无法对嵌入式 YouTube 视频等内容执行开始播放的操作）。

#### 事件

以下只是部分可能会触发的媒体事件。请参阅 Mozilla 开发者网络上的[媒体事件](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)页面，查看完整列表。

<table>
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



