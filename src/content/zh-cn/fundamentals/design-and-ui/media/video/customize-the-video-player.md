project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 不同的平台展示视频的方式也不相同。移动解决方案需要考虑设备方向。使用 Fullscreen API 可以控制视频内容的全屏视图。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 自定义视频播放器 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



不同的平台展示视频的方式也不相同。移动解决方案需要考虑设备方向。使用 Fullscreen API 可以控制视频内容的全屏视图。



不同的平台展示视频的方式也不相同。移动解决方案需要考虑设备方向。使用 Fullscreen API 可以控制视频内容的全屏视图。

## 设备方向在不同设备中的工作原理

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

## 内联或全屏显示

不同的平台展示视频的方式也不相同。iPhone 版 Safari 会在网页中内联显示视频元素，却会以全屏模式播放视频：

<img class="center" alt="iPhone（纵向）中的视频元素屏幕截图" src="images/iPhone-video-with-poster.png">

在 Android 设备中，用户可以通过点击全屏图标来请求全屏模式。但是默认情况下，浏览器以内联模式播放视频：

<img class="center" alt="Android 版 Chrome（纵向）中播放视频的屏幕截图" src="images/Chrome-Android-video-playing-portrait-3x5.png">

iPad 版 Safari 以内联模式播放视频：

<img class="center" alt="iPad Retina（横向）版 Safari 的视频播放的屏幕截图" src="images/iPad-Retina-landscape-video-playing.png">

## 控制内容的全屏模式

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

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



