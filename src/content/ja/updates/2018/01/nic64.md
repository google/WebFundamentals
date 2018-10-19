project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-03-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# Chrome 64の新機 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* [`ResizeObservers` ](#resizeobserver)のサポートは、要素のコンテンツ矩形のサイズが変更されたときに通知します。
*モジュールは、[import.meta](#import-meta)でホスト固有のメタデータにアクセスできるようになりました。
* [ポップアップブロッカー](#popup-blocker)が強くなります。
* [`window.alert()` ](#window-alert)はもはやフォーカスを変更しません。

そして、[もっとたくさんの](#more)があります！

私はPete LePageです。 Chrome 64のデベロッパー向けに新しくなった機能を紹介しましょう！

<div class="clearfix"></div>

Note: 変更の完全なリストを望みますか？ [Chromiumソースリポジトリ変更リスト](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140)をご覧ください。

## `ResizeObserver` {: #resizeobserver }

要素のサイズが変更されたときのトラッキングは、少し苦しいことがあります。ほとんどの場合、リスナーをドキュメントの`resize` イベントにアタッチしてから、`getBoundingClientRect` または`getComputedStyle` を呼び出します。しかし、それらの両方がレイアウトスラッシングを引き起こす可能性があります。

ブラウザウィンドウのサイズが変更されず、ドキュメントに新しい要素が追加された場合はどうなりますか？または、要素に`display: none` を追加しましたか？どちらもページ内の他の要素のサイズを変更することができます。

`ResizeObserver` は、要素のサイズが変更されたときに通知し、要素の新しい高さと幅を提供し、レイアウトのスラッシングのリスクを低減します。

他のオブザーバと同様、これを使用するのは非常に簡単です.`ResizeObserver` オブジェクトを作成し、コールバックをコンストラクタに渡します。コールバックには、`ResizeOberverEntries` の配列が与えられます。これは、要素の新しいディメンションを含む観測要素ごとに1つのエントリです。

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

詳細と実際の例については、[`ResizeObserver` :要素の`document.onresize` に似ています](/web/updates/2016/10/resizeobserver)を参照してください。


## 改良されたポップアップブロッカー {: #popup-blocker }

私はタブアンダーが嫌いです。あなたはそれらを知っています、それはあるページがある目的地へのポップアップを開き、そのページをナビゲートする時です。通常、そのうちの1つは、あなたが欲しくない広告か何かです。

Chrome 64以降、これらのタイプのナビゲートはブロックされ、ChromeはユーザーにいくつかのネイティブUIを表示し、必要に応じてリダイレクトを行うことができます。


## `import.meta` {: #import-meta }

JavaScriptモジュールを書くときには、現在のモジュールに関するホスト固有のメタデータにアクセスしたいことがよくあります。 Chrome 64では、モジュール内で`import.meta` プロパティがサポートされ、モジュールのURLが`import.meta.url` として公開されるようになりました。

これは、現在のHTMLドキュメントではなく、モジュールファイルを基準にしてリソースを解決したいときに非常に便利です。


## もっと！ {: #more }

これらは、Chrome 64の開発者向けの変更のほんの一部ですが、もちろん、それ以上のものがあります。

* Chromeは、正規表現で[名前付きキャプチャ](/web/updates/2017/07/upcoming-regexp-features#named_captures)と[Unicodeプロパティエスケープ](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes)をサポートするようになりました。
* `preload` および`<audio>` 要素のデフォルトの`<video>` 値は、`metadata` になりました。これにより、Chromeは他のブラウザと連動し、メディア自体ではなくメタデータを読み込むだけで、帯域幅やリソースの使用量を削減できます。
* `Request.prototype.cache` を使用して`Request` のキャッシュモードを表示し、要求がリロード要求かどうかを判断できるようになりました。
*フォーカス管理APIを使用すると、スクロールせずに`preventScroll` 属性で要素にフォーカスを設定できるようになりました。

## `window.alert()` {: #window-alert }

ああ、もう1つ！これは実際には「開発者機能」ではありませんが、それは私を幸せにします。 `window.alert()` はフォアグラウンドに背景タブを表示しなくなりました。代わりに、ユーザーがそのタブに戻るときにアラートが表示されます。

何かが私の`window.alert` を発射したので、ランダムなタブの切り替えはもうありません。私は古いGoogleカレンダーを見ています。


必ず[YouTubeチャンネル](https://goo.gl/6FP1a5)に[購読](https://www.youtube.com/user/ChromeDevelopers/)し、新しいビデオを起動するたびにメール通知を受け取るか、[RSSフィード](/web/shows/rss.xml)をフィードリーダーに追加してください。


私はPete LePageです。Chrome 65がリリースされるとすぐに、Chromeの新機能について説明します。

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}