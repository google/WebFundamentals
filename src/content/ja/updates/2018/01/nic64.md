project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-10-30 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# Chrome 64 #新 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* [`ResizeObservers`](#resizeobserver)サポートは、要素のコンテンツ長方形のサイズが変更されたときに通知します。
*モジュールは[import.meta](#import-meta)ホスト固有のメタデータにアクセスできるようになり[import.meta](#import-meta) 。
* [pop-up blocker](#popup-blocker)が強くなります。
* [`window.alert()`](#window-alert)はフォーカスを変更しなくなりました。

そして、 [plenty more](#more)ます！

私はPete LePageです。 Chrome 64のデベロッパー向けに新しくなった機能を紹介しましょう！

<div class="clearfix"></div>

Note:変更の完全なリストを希望しますか？ [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140)チェックして[Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140) 。

## `ResizeObserver` {: #resizeobserver }

要素のサイズが変更されたときのトラッキングは、少し苦しいことがあります。ほとんどの場合、リスナーをドキュメントの`resize`イベントに`resize` 、次に`getBoundingClientRect`または`getComputedStyle`呼び出します。しかし、それらの両方がレイアウトスラッシングを引き起こす可能性があります。

ブラウザウィンドウのサイズが変更されず、ドキュメントに新しい要素が追加された場合はどうなりますか？または、 `display: none`を要素に追加しましたか？どちらもページ内の他の要素のサイズを変更することができます。

`ResizeObserver` 、要素のサイズが変更されたときに通知し、要素の新しい高さと幅を提供し、レイアウトのスラッシングのリスクを低減します。

他のオブザーバと同様に、これを使用するのは非常に簡単です`ResizeObserver`オブジェクトを作成し、コンストラクタにコールバックを渡します。コールバックには、 `ResizeOberverEntries`配列が与えられます`ResizeOberverEntries`は、要素の新しいディメンションを含む、観測された要素ごとに1つのエントリです。

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

詳細と実際の例については、 [`ResizeObserver`: It's like `document.onresize` for Elements](/web/updates/2016/10/resizeobserver)をご覧ください。


## ポップアップブロッカー{: #popup-blocker }

私はタブアンダーが嫌いです。あなたはそれらを知っています、それはあるページがある目的地へのポップアップを開き、そのページをナビゲートする時です。通常、そのうちの1つは、あなたが欲しくない広告か何かです。

Chrome 64以降、これらのタイプのナビゲートはブロックされ、ChromeはユーザーにいくつかのネイティブUIを表示し、必要に応じてリダイレクトを行うことができます。


## `import.meta` {: #import-meta }

JavaScriptモジュールを書くときには、現在のモジュールに関するホスト固有のメタデータにアクセスしたいことがよくあります。 Chrome 64では、モジュール内の`import.meta`プロパティがサポートされ、モジュールのURLが`import.meta.url`として公開されるように`import.meta.url` 。

これは、現在のHTMLドキュメントではなく、モジュールファイルを基準にしてリソースを解決したい場合に非常に便利です。


## そしてさらに！ {: #more }

これらは、Chrome 64の開発者向けの変更のほんの一部ですが、もちろん、それ以上のものがあります。

* Chromeは正規表現で[named captures](/web/updates/2017/07/upcoming-regexp-features#named_captures)と[Unicode property  escapes](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes)をサポートする[named captures](/web/updates/2017/07/upcoming-regexp-features#named_captures)なり[Unicode property  escapes](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes)た。
* `<audio>`と`<video>`要素のデフォルトの`preload`値は`<audio>`なり`metadata` 。これにより、Chromeは他のブラウザと連動し、メディア自体ではなくメタデータを読み込むだけで、帯域幅やリソースの使用量を削減できます。
*ここで使用することができます`Request.prototype.cache`のキャッシュモード表示し`Request` 、要求が再ロード要求であるかどうかを判断します。
* Focus Management APIを使用すると、 `preventScroll`属性でスクロールせずに要素にフォーカスを設定できるようになりました。

## `window.alert()` {: #window-alert }

ああ、もう1つ！これは実際には「開発者機能」ではありませんが、それは私を幸せにします。 `window.alert()`はフォアグラウンドに背景タブを表示しなくなりました！代わりに、ユーザーがそのタブに戻るときにアラートが表示されます。

何かが私に`window.alert`を発したので、ランダムなタブの切り替えはもうありません。私は古いGoogleカレンダーを見ています。


[subscribe](https://goo.gl/6FP1a5)を[YouTube channel](https://www.youtube.com/user/ChromeDevelopers/)に必ず[RSS feed](/web/shows/rss.xml)してください。新しいビデオを起動するたびに電子メール通知を[RSS feed](/web/shows/rss.xml)か、 [RSS feed](/web/shows/rss.xml)をフィードリーダーに追加します。


私はPete LePageです。Chrome 65がリリースされるとすぐに、Chromeの新機能について説明します。

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
