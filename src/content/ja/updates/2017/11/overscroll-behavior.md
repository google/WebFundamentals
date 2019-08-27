project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: CSS overscroll-behaviorプロパティの概要。

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS #} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png #} {# wf_featured_snippet: The CSS overscroll-behavior property allows developers to override the browser's overflow scroll effects when reaching the top/bottom of content. It can be used to customize or prevent the mobile pull-to-refresh action. #}

# スクロールを制御する:プルトゥリフレッシュおよびオーバーフローエフェクトのカスタマイズ{: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include "web/_shared/contributors/majidvp.html" %} {% include "web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

[CSSの`overscroll-behavior`](https://wicg.github.io/overscroll-behavior/)プロパティを使用すると、開発者はコンテンツの最上部/最下部に到達したときにブラウザーのデフォルトのオーバーフロースクロール動作をオーバーライドできます。ユースケースには、モバイルでのプルトゥリフレッシュ機能の無効化、オーバースクロールグローとラバーバンディング効果の削除、モーダル/オーバーレイの下にあるページコンテンツのスクロール防止などがあります。

`overscroll-behavior`はChrome 63以降が必要です.開発中または他のブラウザで検討中です.詳細については、 [chromestatus.com](https://www.chromestatus.com/feature/5734614437986304)をご覧ください. {: .caution }

## バックグラウンド

### スクロール境界とスクロールチェーン{: #scrollchaining }

<figure class="attempt-right">
  <a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" target="_blank">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Chrome Androidでのスクロールチェーン。</figcaption>
</figure>

スクロールはページと対話するための最も基本的な方法の1つですが、特定のUXパターンは、ブラウザーの風変わりなデフォルトの動作のために対処が難しい場合があります。例として、ユーザーがスクロールしなければならない可能性のある多数のアイテムを含むアプリドロワーを取り上げます。それらが最下部に達すると、オーバーフローするコンテナは、消費するコンテンツがなくなるため、スクロールを停止します。つまり、ユーザーは「スクロール境界」に到達します。ただし、ユーザーがスクロールを続けた場合はどうなるかに注意してください。 **引き出しの*後ろ*のコンテンツがスクロールを開始します** ！スクロールは親コンテナに引き継がれます。例のメインページ自体。

この動作は**スクロールチェーン**と呼ばれ**ます** 。コンテンツをスクロールするときのブラウザのデフォルトの動作。多くの場合、デフォルトは非常に優れていますが、望ましくない場合や予期しない場合もあります。特定のアプリは、ユーザーがスクロール境界に達したときに異なるユーザーエクスペリエンスを提供する場合があります。

### プルツーリフレッシュ効果{: #p2r }

プルトゥリフレッシュは、FacebookやTwitterなどのモバイルアプリで普及している直感的なジェスチャーです。ソーシャルフィードをプルダウンしてリリースすると、より新しい投稿を読み込むための新しいスペースが作成されます。実際、この特定のUXは*非常に人気*があり、Android上のChromeのようなモバイルブラウザーも同じ効果を採用しています。ページの上部を下にスワイプすると、ページ全体が更新されます。

<div class="clearfix centered">
  <figure class="attempt-left">
    <a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4" target="_blank">
       <video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4" autoplay muted loop height="350" class="border"></video>
    </a>
    <figcaption>Twitterのカスタムプルツーリフレッシュ<br> PWAでフィードを更新するとき。</figcaption>
  </figure>
  <figure class="attempt-right">
    <a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" target="_blank">
       <video src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay muted loop height="350" class="border"></video>
    </a>
    <figcaption>Chrome Androidのネイティブのプルトゥリフレッシュアクション<br>ページ全体を更新します。</figcaption>
  </figure>
</div>

Twitter [PWAの](/web/progressive-web-apps/)ような状況では、ネイティブのプルツーリフレッシュアクションを無効にすることが理にかなっています。どうして？このアプリでは、ユーザーが誤ってページを更新することを望まないでしょう。ダブルリフレッシュアニメーションを見る可能性もあります！あるいは、ブラウザのアクションをカスタマイズして、サイトのブランドにもっと近づけるようにした方が良いかもしれません。残念なことに、このタイプのカスタマイズはうまくいかないことがあります。開発者は、不要なJavaScriptを記述したり、 [非パッシブ](/web/tools/lighthouse/audits/passive-event-listeners)タッチリスナーを追加したり（スクロールをブロックしたり）、ページ全体を100vw / vh `<div>`固定したりします（ページがオーバーフローしないようにします）。これらの回避策には、スクロールのパフォーマンスに悪影響が[十分に文書化さ](https://wicg.github.io/overscroll-behavior/#intro)れています。

もっとうまくやれる！

## `overscroll-behavior`導入{: #intro }

`overscroll-behavior` [プロパティ](https://wicg.github.io/overscroll-behavior/)は、コンテナ（ページ自体を含む）をオーバースクロールしたときの動作を制御する新しいCSS機能です。これを使用して、スクロールチェーンのキャンセル、プルツーリフレッシュアクションの無効化/カスタマイズ、iOSでのラバーバンド効果の無効化（Safariが`overscroll-behavior`実装している場合）などを行うことができます。最良の部分は、 <strong data-md-type="double_emphasis">`overscroll-behavior`</strong>を**使用**しても、イントロで言及したハッキングのよう**にページのパフォーマンスに悪影響を与えないこと**です！

このプロパティは、次の3つの値を取ります。

1. **auto-**デフォルト。要素から発生するスクロールは、祖先要素に伝播する場合があります。

- **含む** -スクロールチェーンを防ぎます。スクロールは祖先に伝播しませんが、ノード内のローカル効果が表示されます。たとえば、Androidのオーバースクロールグロー効果や、iOSのラバーバンディング効果は、スクロール境界に達したときにユーザーに通知します。 **注** ： `overscroll-behavior: contain` `html`要素に`overscroll-behavior: contain`を使用すると、オーバースクロールナビゲーションアクションが防止されます。
- **なし** - `contain`と同じですが、ノード自体内でのオーバースクロール効果も防止します（AndroidオーバースクロールグローやiOSラバーバンディングなど）。

注： `overscroll-behavior` behaviorは、特定の軸の動作のみを定義する場合、 `overscroll-behavior-x`および`overscroll-behavior-y`省略形もサポートします。

`overscroll-behavior`使用方法を確認するために、いくつかの例を見てみましょう。

## スクロールが固定位置要素をエスケープしないようにします{: #fixedpos }

### チャットボックスシナリオ{: #chat }

<figure class="attempt-right">
  <a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4" target="_blank">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4" autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
  <figcaption>チャットウィンドウの下のコンテンツもスクロールします:(</figcaption>
</figure>

ページの下部に位置する固定されたチャットボックスを考えてください。意図は、チャットボックスが自己完結型のコンポーネントであり、その背後のコンテンツとは別にスクロールすることです。ただし、スクロールチェーンのため、ユーザーがチャット履歴の最後のメッセージに到達するとすぐにドキュメントがスクロールを開始します。

このアプリでは、チャットボックス内で発生するスクロールをチャット内に留める方が適切です。チャットメッセージを保持する要素に`overscroll-behavior: contain`を追加することで、これを実現できます。

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

基本的に、チャットボックスのスクロールコンテキストとメインページを論理的に分離しています。最終結果は、ユーザーがチャット履歴の最上部/最下部に達したときにメインページが表示されたままになることです。チャットボックスで始まるスクロールは伝播しません。

### ページオーバーレイシナリオ{: #overlay }

「アンダースクロール」シナリオのもう1つのバリエーションは、コンテンツが**固定位置オーバーレイの**背後でスクロールしている場合です。死んだ景品の`overscroll-behavior`が`overscroll-behavior`れています！ブラウザは役に立つようにしていますが、最終的にはサイトがバグのように見えます。

**例** - `overscroll-behavior: contain`ありとなしのモーダル`overscroll-behavior: contain` ：

<figure class="clearfix centered">
  <div class="attempt-left">
    <a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4" target="_blank">
      <video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4" autoplay muted loop height="290"></video>
    </a>
    <figcaption><b>変更前</b> ：ページコンテンツがオーバーレイの下にスクロールします。</figcaption>
  </div>
  <div class="attempt-right">
    <a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4" target="_blank">
      <video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4" autoplay muted loop height="290"></video>
    </a>
    <figcaption><b>後</b> ：ページコンテンツはオーバーレイの下にスクロールしません。</figcaption>
  </div>
</figure>

## プルツーリフレッシュを無効にする{: #disablp2r }

**pull-to-refreshアクションをオフにすることは、CSSの1行です** 。ビューポート定義要素全体でのスクロールチェーンを防ぐだけです。ほとんどの場合、それは`<html>`または`<body>`です。

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

この単純な追加により、 [チャットボックスデモ](https://ebidel.github.io/demos/chatbox.html)の二重プルリフレッシュアニメーションを修正し、代わりに、よりきれいなローディングアニメーションを使用するカスタムエフェクトを実装できます。受信トレイが更新されると、受信トレイ全体もぼやけます。

<figure class="clearfix centered">
  <div class="attempt-left">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4" autoplay muted loop height="225"></video>
    <figcaption>前</figcaption>
  </div>
  <div class="attempt-right">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4" autoplay muted loop height="225"></video>
    <figcaption>後</figcaption>
  </div>
</figure>

[完全なコードの](https://github.com/ebidel/demos/blob/master/chatbox.html)スニペットは次のとおり[です](https://github.com/ebidel/demos/blob/master/chatbox.html) 。

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## オーバースクロールグローとラバーバンディング効果の無効化{: #disableglow }

スクロール境界にヒットしたときにバウンス効果を無効にするには、 `overscroll-behavior-y: none`使用します。

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4" autoplay muted loop height="300" class="border"></video>
    <figcaption><b>変更前</b> ：スクロール境界を押すとグローが表示されます。</figcaption>
  </div>
  <div class="attempt-right">
    <video src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay muted loop height="300" class="border"></video>
    <figcaption><b>後</b> ：グローが無効になりました。</figcaption>
  </div>
</figure>

注：これにより、左/右のスワイプナビゲーションが保持されます。ナビゲーションを防ぐには、 `overscroll-behavior-x: none`使用できます。ただし、これは[まだ](https://crbug.com/762023) Chrome [に実装さ](https://crbug.com/762023)れています。

## 完全なデモ{: #demo }

すべてをまとめると、 [チャットボックス](https://ebidel.github.io/demos/chatbox.html)の完全[なデモで](https://ebidel.github.io/demos/chatbox.html)は、 `overscroll-behavior`を使用して、カスタムのプルトゥリフレッシュアニメーションを作成し、スクロールがチャットボックスウィジェットをエスケープしないようにします。これにより、CSS `overscroll-behavior`なしでは達成するのが`overscroll-behavior`た最適なユーザーエクスペリエンスが提供され`overscroll-behavior` 。

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
    <video src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay muted loop alt="Chatbox demo" height="600"></video>
  </a>
  <figcaption><a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">デモを見る</a> | <a href="https://github.com/ebidel/demos/blob/master/chatbox.html" target="_blank">ソース</a></figcaption>
</figure>

<br>
