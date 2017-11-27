project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 让我们来讨论如何使用一个Web API以在桌面创建一个浮动视频窗口。

{# wf_updated_on: 2017-09-12 #}
{# wf_published_on: 2017-09-12 #}
{# wf_tags: news,media #}
{# wf_featured_image: /web/updates/images/generic/picture-in-picture.png #}
{# wf_featured_snippet: 让我们来讨论如何使用一个Web API以在桌面创建一个浮动视频窗口。 #}
{# wf_blink_components: Blink>Media #}

# 画中画 (PiP) {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Translated by
{% include "web/_shared/contributors/henrylim.html" %}

自2017年4月起，[Android O的Chrome支持画中画](https://developer.android.com/about/versions/oreo/android-8.0.html#opip)。这功能可让用户在同个时间，在悬浮窗中的`<video>`元素播放视频，一边做其他的事情。

要如何使用画中画呢？首先开启Chrome, 然后开启一个拥有视频的网页吗，然后将那个视频在全屏中播放。然后按主页按钮以回到Android的主页，你将会发现正在播放着的视频将会自动地进入画中画模式。是不是很酷呢?

<figure>
  <img src="/web/updates/images/2017/09/picture-in-picture-hero.jpg" alt="Android Picture in Picture photo">
  <figcaption><b>图 1.</b>
    Android的画中画模式</figcaption>
</figure>

但是... 要怎样在桌面中使用画中画? 网页要怎样控制画中画呢?

好消息是[画中画Web API的规范](https://wicg.github.io/picture-in-picture/) 已经在草稿阶段中了。这规范能让网页使用这API来控制画中画在网页中的行为，这包括：

- 通知网页当视频进入或退出画中画。
- 允许用户使用手势来进入或退出画中画模式。
- 允许网页退出画中画。
- 允许网页检查是否可以使用画中画模式。

以下是画中画Web API的示例代码：

```
<video id="video" src="https://example.com/file.mp4"></video>

<button id="pipButton"></button>

<script>
  // 如果不支持画中画，将按钮隐藏
  pipButton.hidden = !document.pictureInPictureEnabled;

  pipButton.addEventListener('click', function() {
    // 如果没有元素在画中画模式，我们将为那视频 (video)元素
    // 请求进入画中画模式。若是已经是在画中画模式中，
    // 我们将请求退出画中画模式。
    if (!document.pictureInPictureElement) {
      video.requestPictureInPicture()
      .catch(error => {
        // 视频无法进入画中画模式
      });
    } else {
      document.exitPictureInPicture()
      .catch(error => {
        // 视频无法退出画中画模式
      });
    }
  });
</script>
```

注意: 目前没有任何的游览器可以运行以上的代码。

## 反馈

您觉得这个画中画怎样呢? 欢迎你在[Picture In Picture WICG的软件源](https://github.com/WICG/picture-in-picture)提供建议及提出问题。我们渴望能听到你的想法！

## 阻止Android中的画中画的默认行为

今天，你可以使用resize event来阻止在Chrome运行的网页中的视频进入Android默认的画中画模式。您可以通过resize event来检测窗口大小是否有变化（见以下的代码）。直到画中画Web API被正式的实施，使用resize event来阻止Android中的画中画的默认行为的方法只是暂时的，这不是长期的解决方法。

```
// See whether resize is small enough to be PiP. It's a hack, but it'll
// work for now.
window.addEventListener('resize', function() {
  if (!document.fullscreenElement) {
    return;
  }

  var minimumScreenSize = 0.33;
  var screenArea = screen.width * screen.height;
  var windowArea = window.outerHeight * window.outerWidth;

  // If the size of the window relative to the screen is less than a third,
  // let's assume we're in PiP and exit fullscreen to prevent Auto PiP.
  if ((windowArea / screenArea) < minimumScreenSize) {
    document.exitFullscreen();
  }
});
```

{% include "comment-widget.html" %}
