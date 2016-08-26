project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 無障礙程度並非一項功能。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 無障礙程度很重要 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



無障礙程度並非一項功能。失聰使用者無法理解沒有字幕的影片，而失明使用者則無法欣賞沒有語音解說的影片。只要花一點時間在影片中新增這些內容，即可為使用者提供優異的體驗。建議您至少為所有使用者提供一項滿足其基本需求的體驗。




## 新增字幕以改善無障礙程度

如果希望媒體在行動裝置上更容易使用，請採用 track 元素新增字幕或說明。

<!-- TODO: Verify note type! -->
Note: Android 版 Chrome、iOS Safari 和目前所有的電腦瀏覽器 (Firefox 除外) 都支援 track 元素 (請參閱 <a href="http://caniuse.com/track" title="Track 元素支援狀態">caniuse.com/track</a>)。此外，還有一些 polyfill。我們建議您使用 <a href='//www.delphiki.com/html5/playr/' title='Playr track 元素 polyfill'>Playr</a> 或 <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>。

使用 track 元素後，字幕看起來像這樣：

 <img class="center" alt="展示使用 track 元素在 Android 版 Chrome 中顯示字幕的螢幕截圖" src="images/Chrome-Android-track-landscape-5x3.jpg">

## 新增 track 元素

只要為 video 元素新增一個 track 子元素，即可輕鬆在影片中新增字幕：

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

track 元素的 `src` 屬性會指定字幕軌檔案的位置。

##在字幕軌檔案中定義字幕

字幕軌檔案是由 WebVTT 格式的定時「提示」所組成：

    WEBVTT

    00:00.000 --> 00:04.000
    一個男人正坐在樹枝上使用筆記型電腦。

    00:05.000 --> 00:08.000
    樹枝折斷，他開始落下。

    ...



