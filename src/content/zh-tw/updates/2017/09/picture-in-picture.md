project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 讓我們來討論如何使用一個Web API以在桌面創建一個浮動視頻窗口。

{# wf_updated_on: 2017-09-12 #}
{# wf_published_on: 2017-09-12 #}
{# wf_tags: news,media #}
{# wf_featured_image: /web/updates/images/generic/picture-in-picture.png #}
{# wf_featured_snippet: 讓我們來討論如何使用一個Web API以在桌面創建一個浮動視頻窗口。 #}
{# wf_blink_components: Blink>Media #}

# 畫中畫 (PiP) {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

Translated by
{% include "web/_shared/contributors/henrylim.html" %}

自2017年4月起，[Android O的Chrome支持畫中畫](https://developer.android.com/about/versions/oreo/android-8.0.html#opip)。這功能可讓用戶在同個時間，在悬浮窗中的`<video>`元素播放視頻，一邊做其他的事情。

要如何使用畫中畫呢？首先開啟Chrome, 然後開啟一個擁有視頻的網頁嗎，然後將那個視頻在全屏中播放。然後按主頁按鈕以回到Android的主頁，你將會發現正在播放著的視頻將會自動地進入畫中畫模式。是不是很酷呢？

<figure>
  <img src="/web/updates/images/2017/09/picture-in-picture-hero.jpg" alt="Android Picture in Picture photo">
  <figcaption>
    <b>圖 1.</b>
    Android的畫中畫模式
  </figcaption>
</figure>

但是... 要怎樣在桌面中使用畫中畫? 網頁要怎樣控制畫中畫呢?

好消息是[畫中畫Web API的規範](https://wicg.github.io/picture-in-picture/) 已經在草稿階段中了。這規範能讓網頁使用這API來控制畫中畫在網頁中的行為，這包括：

- 通知網頁當視頻進入或退出畫中畫。
- 允許用戶使用手勢來進入或退出畫中畫模式。
- 允許網頁退出畫中畫。
- 允許網頁檢查是否可以使用畫中畫模式。

以下是畫中畫Web API的示例代碼：

```
<video id="video" src="https://example.com/file.mp4"></video>

<button id="pipButton"></button>

<script>
  // 如果不支持畫中畫，將按鈕隱藏
  pipButton.hidden = !document.pictureInPictureEnabled;

  pipButton.addEventListener('click', function() {
    // 如果沒有元素在畫中畫模式，我們將為那視頻 (video)元素
    // 請求進入畫中畫模式。若是已經是在畫中畫模式中，
    // 我們將請求退出畫中畫模式。
    if (!document.pictureInPictureElement) {
      video.requestPictureInPicture()
      .catch(error => {
        // 視頻無法進入畫中畫模式
      });
    } else {
      document.exitPictureInPicture()
      .catch(error => {
        // 視頻無法退出畫中畫模式
      });
    }
  });
</script>
```

注意: 目前沒有任何的游覽器可以運行以上的代碼。

## 反馈

您覺得這個畫中畫怎樣呢? 歡迎你在[Picture In Picture WICG的软件源](https://github.com/WICG/picture-in-picture)提供建議及提出問題。我们渴望能听到你的想法！

## 阻止Android中的畫中畫的默认行为

今天，你可以使用resize event來阻止在Chrome運行的網頁中的視頻進入Android默認的畫中畫模式。您可以通過resize event來檢測窗口大小是否有變化（見以下的代碼）。直到畫中畫Web API被正式的實施，使用resize event來阻止Android中的畫中畫的默认行为的方法只是暫時的，這不是長期的解決方法。

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
