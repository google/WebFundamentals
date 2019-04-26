project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:サイトに大量のイメージや動画があり、それを減らすことなくすべて使いたい場合、遅延読み込みは、まさに必要なテクニックかもしれません。最初のページ読み込み時間を短縮し、ページごとのペイロードを減らすことができます。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-04-04 #}
{# wf_blink_components: Blink>Image,Blink>HTML,Blink>JavaScript #}

# イメージと動画の遅延読み込み {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

ウェブサイトの一般的なペイロードには、かなりの量の[イメージ](http://beta.httparchive.org/reports/state-of-images?start=earliest&end=latest)と[動画](http://beta.httparchive.org/reports/page-weight#bytesVideo)が含まれることがあります。
 プロジェクト関係者は、既存のアプリケーションからメディアリソースを減らすことなく使いたいと考えるかもしれません。
 このような状況では、特に関係者全員がサイトのパフォーマンスを向上させたいものの実現方法について意見が割れる場合、ジレンマが生じます。
ここで便利なのが、遅延読み込みです。これは、コンテンツを減らすことなく、最初のページのペイロード_と_読み込み時間を短縮するソリューションです。


## 遅延読み込みとは

遅延読み込みは、ページ読み込み時に重要でないリソースの読み込みを遅らせる手法です。
 代わりに、重要でないリソースは必要なときに読み込まれます。
 イメージの場合、「重要でない」とはたいてい「オフスクリーン」と同義です。
 Lighthouse を使って改善項目について調べたことがあるなら、この分野のガイダンスを、次のような[オフスクリーン イメージ監査](/web/tools/lighthouse/audits/offscreen-images)という形で見たことがあるでしょう。




<figure>
  <img srcset="images/offscreen-audit-2x.png 2x, images/offscreen-audit-1x.png 1x"
src="images/offscreen-audit-1x.png" alt="Lighthouse のオフスクリーン イメージ監査のスクリーンショット">

  <figcaption><b>図 1</b>。 Lighthouse のパフォーマンス監査の 1 つは、遅延読み込みの対象となるオフスクリーンのイメージを特定することです。</figcaption>

</figure>

おそらく遅延読み込みが実行されているのを見たことがあるでしょう。それは次のように行われます。


- ページにアクセスし、コンテンツを読みながらスクロールし始めます。
- スクロールしていくと、ある時点でビューポート内にプレースホルダ イメージが現れます。
- すぐにプレースホルダ イメージが最終的なイメージに置き換えられます。

イメージの遅延読み込みの例として、一般的な公開プラットフォーム [Medium](https://medium.com/) があります。これは、ページ読み込み時に軽量のプレースホルダ イメージを読み込み、スクロールによってイメージがビューポートに現れるときに、遅延読み込みされたイメージに置き換えます。




<figure>
  <img srcset="images/lazy-loading-example-2x.jpg 2x,
images/lazy-loading-example-1x.jpg 1x"
src="images/lazy-loading-example-1x.jpg" alt="ブラウズ中の Medium ウェブサイトのスクリーンショット。遅延読み込みが実行されている。
 左側はぼやけたプレースホルダ、右側は読み込まれたリソース。">

  <figcaption><b>図 2</b>。 イメージ遅延読み込みが実行されている例。 ページの読み込み時にプレースホルダ イメージが読み込まれ（左）、ビューポートにスクロールされると、必要なタイミングで最終的なイメージが読み込まれます。</figcaption>


</figure>

遅延読み込みに詳しくない場合、このテクニックの有用性やメリットについて疑問に思うかもしれません。
 では、その点について説明します。

## イメージや動画を単に_読み込む_のではなく、遅延読み込みをするのはなぜですか。

それは、ユーザーに表示されないものを読み込んでいる可能性があるからです。 これにはいくつかの点で問題があります。


- データの無駄です。 定額制の接続では、これは最悪の問題になるわけではありません（ただし、その貴重な帯域幅を、実際にユーザーに表示される他のリソースのダウンロードに使用できるかもしれません）。
 一方、データ量に上限のあるプランの場合、ユーザーに表示されないものを読み込むなら、実質的にデータ料金が無駄になる可能性があります。
- 処理時間、バッテリー、その他のシステム リソースの無駄になります。 メディア リソースがダウンロードされた後、ブラウザはそれをデコードし、そのコンテンツをビューポートにレンダリングする必要があります。



イメージや動画を遅延読み込みすると、最初のページの読み込み時間、最初のページのデータ量、システム リソースの使用量を減らすことができ、すべてパフォーマンス向上につながります。
 このガイドでは、いくつかのテクニックを取り上げ、イメージや動画を遅延読み込みするためのガイダンスと、[一般的に使用されるライブラリの簡単なリスト](/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#lazy_loading_libraries)を紹介します。



## イメージの遅延読み込み

イメージの遅延読み込みのメカニズムは理論的には単純ですが、実際のしくみは少し複雑です。
 また、遅延読み込みが役立つ 2 つの異なるユースケースがあります。
 まず、HTML のインライン イメージの遅延読み込みから説明します。


### インライン イメージ

最も一般的な遅延読み込みの対象は、`<img>` 要素で使用されるイメージです。
`<img>` 要素を遅延読み込みする場合、JavaScript を使用してそれらがビューポート内にあるかどうかを確認します。
 ビューポート内にある場合、その `src` 属性（場合によっては `srcset`）属性にはイメージ コンテンツへの URL が入力されています。


#### Intersection Observer の使用

以前に遅延読み込みコードを書いたことがある場合、`scroll` や `resize` のようなイベント ハンドラを使用したかもしれません。
 このアプローチは、あらゆるブラウザへの互換性が最も高い方法ですが、最近のブラウザでは、[Intersection Observer API](/web/updates/2016/04/intersectionobserver) によって要素の可視性を高性能かつ効率的にチェックすることができます。




注: Intersection Observer はすべてのブラウザでサポートされているわけではありません。 ブラウザ間の互換性が重要な場合は、[次のセクション](#using_event_handlers_the_most_compatible_way)をご覧ください。そこでは、パフォーマンスの低い（ただし互換性が高い）スクロールとリサイズのイベント ハンドラを使用してイメージを遅延読み込みする方法を紹介します。





Intersection Observer は、さまざまなイベント ハンドラに依存するコードよりも使いやすく読みやすい方法です。デベロッパーは要素の可視性を検出する複雑なコードを書く必要がなく、要素を監視する Intersection Observer を登録するだけでよいからです。
 デベロッパーが行うのは、要素が表示される場合に何をするかを決めるだけです。
 遅延読み込みされた `<img>` 要素に対して、以下の基本的なマークアップ パターンを使用するとします。


```html
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load-1x.jpg" data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="I'm an image!">
```

このマークアップには、注目すべき 3 つの部分があります。

1. `class` 属性は、JavaScript での要素を選択します。
2. `src` 属性は、ページが最初に読み込まれたときに表示されるプレースホルダ イメージを参照します。
3. `data-src` 属性と `data-srcset` 属性は、要素がビューポートに入ったら読み込むイメージの URL を指定するプレースホルダ属性です。


では、JavaScript で Intersection Observer を使用し、このマークアップ パターンでイメージを遅延読み込みする方法を見てみましょう。


```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

ドキュメントの `DOMContentLoaded` イベントでは、このスクリプトは `lazy` クラスを持つすべての `<img>` 要素について DOM に問い合わせます。
 Intersection Observer が利用可能な場合は、`img.lazy` 要素がビューポートに入ったときにコールバックを実行する新しい Observer を作成します。

 [この CodePen の例](https://codepen.io/malchata/pen/YeMyrQ)で、実際のコードの動作を確認してください。


注: このコードは、`isIntersecting` という名前の Intersection Observer メソッドを使用します。これは、Edge 15 の Intersection Observer の実装では使用できません。
 そのため、上記の遅延読み込みコード（およびその他の同様のコード スニペット）は失敗します。
 より詳しい機能検出条件のガイダンスについては、[こちらの GitHub の投稿](https://github.com/w3c/IntersectionObserver/issues/211)をご覧ください。



しかし Intersection Observer の欠点は、[多くのブラウザでサポートされている](https://caniuse.com/#feat=intersectionobserver)ものの、汎用的ではないということです。
 サポート外のブラウザを [polyfill する](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)か、または上記のコードが示すように、Intersection Observer が利用可能かどうかを検出し、必要ならより互換性のある古い方法を使用する必要があります。




#### イベント ハンドラを使用する（最も互換性の高い方法）

遅延読み込みのために Intersection Observer 使用する_必要がある_と同時に、ブラウザの互換性がアプリケーションの重要な要件である場合もあります。
 [Intersection Observer のサポートを polyfill することは_可能_](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)（これが最も簡単）ですが、[`scroll`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll)、[`resize`](https://developer.mozilla.org/en-US/docs/Web/Events/resize) や、おそらく [`orientationchange`](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange) イベント ハンドラを [`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) と一緒に使用したコードで代替して、要素がビューポートにあるかどうかを判断することもできます。











前述と同じマークアップ パターンで、以下の JavaScript は遅延読み込み機能を提供します。


```javascript
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

このコードは `scroll` イベント ハンドラの `getBoundingClientRect` を使用して、`img.lazy` 要素がビューポートにあるかどうかを確認します。
 `setTimeout` 呼び出しが処理を遅延させるために使用され、`active` 変数は関数呼び出しを制限するために使用される処理ステートを含んでいます。
 イメージが遅延読み込みされると、要素配列から削除されます。
 要素配列の `length` が `0` になると、スクロール イベント ハンドラ コードは削除されます。
 [この CodePen の例](https://codepen.io/malchata/pen/mXoZGx)で、実際に動作しているこのコードを参照してください。


このコードはほとんどすべてのブラウザで機能しますが、潜在的なパフォーマンスの問題があります。繰り返しの `setTimeout` 呼び出しは（呼び出し内のコードが制限されても）無駄になる可能性があります。
 この例では、ビューポートにイメージがあるかどうかにかかわらず、ドキュメントのスクロール時またはウィンドウのサイズ変更時に 200 ミリ秒ごとにチェックが実行されています。
 さらに、遅延読み込みの必要な要素の数を追跡し、スクロール イベント ハンドラをアンバインドするという面倒な作業は、デベロッパーが行わなければなりません。



まとめると、可能な限り Intersection Observer を使用し、できるだけ高い互換性がアプリケーションの重要な要件である場合はイベント ハンドラにフォールバックします。



### CSS でのイメージ処理

`<img>` タグは、ウェブページ上のイメージを使用する最も一般的な方法ですが、CSS
[`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image) プロパティ（およびその他のプロパティ）を経由してイメージを呼び出すこともできます。
 可視性に関係なく読み込まれる `<img>` 要素とは異なり、CSS でのイメージ読み込み動作は推測に基づいて行われます。
 [ドキュメントと CSS オブジェクト モデル](/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)および[レンダリング ツリー](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)が構築されるとき、ブラウザは、外部リソースをリクエストする前に、CSS がドキュメントに適用される方法を検討します。
 外部リソースに関する CSS ルールが現在構成中のドキュメントに適用されないと判断した場合、ブラウザはそれをリクエストしません。



この推測に基づく振る舞いにより、CSS でのイメージのロードを延期できます。つまり、JavaScript を使用して、要素がビューポート内に配置されるタイミングを判断し、背景画像を呼び出すスタイルを適用するクラスを要素に適用します。
 これにより、イメージは初期ロード時ではなく必要なタイミングでダウンロードされます。
 たとえば、大きなヒーローの背景画像を含む要素を考えてみましょう。


```html
<div class="lazy-background">
  <h1>Here's a hero heading to get your attention!</h1>
  <p>Here's hero copy to convince you to buy a thing!</p>
  <a href="/buy-a-thing">Buy a thing!</a>
</div>
```

この `div.lazy-background` 要素は通常、ある CSS によって呼び出されるヒーローの背景画像を含みます。
 しかし、この遅延読み込みの例では、`visible` クラスによって`div.lazy-background` 要素の `background-image` プロパティを分離できます。これは、ビューポートに配置されたときに要素に追加するクラスです。



```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

ここから、JavaScript を使用して要素がビューポート内にあるかどうかを確認し（Intersection Observer を使用）、その時点で `div.lazy-background` 要素に `visible` クラスを追加し、これによりイメージが読み込まれます。



```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
```

前述のとおり、Intersection Observer は現在すべてのブラウザでサポートされているわけではないため、代替ソリューションまたは polyfill を使用することができます。
[この CodePen のデモ](https://codepen.io/malchata/pen/wyLMpR)で、実際のコードの動作を確認してください。


## 動画の遅延読み込み

イメージ要素と同様に、動画の遅延読み込みを行うこともできます。 通常の状況で動画を読み込むときは、この `<video>` 要素を使用します（ただし、一部の実装では [`<img>` を使用した別の方法](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/)があります）。
 `<video>` の遅延読み込みの_方法_はユースケースによって異なります。
 異なるソリューションを必要とするいくつかのシナリオについて説明します。


### 自動再生されない動画の場合

ユーザーによって再生が開始される動画（自動再生_されない_動画）の場合は、`<video>` 要素に [`preload` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)を指定することができます。




```html
<video controls preload="none" poster="one-does-not-simply-placeholder.jpg">
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

ここで、`preload` 属性に `none` の値を使用して、ブラウザが動画データを事前に_何も_プリロードしないようにします。
 スペースを確保するために、`poster` 属性を使用して `<video>` 要素にプレースホルダを指定します。
 これは、動画を読み込むデフォルトの動作がブラウザによって異なる場合があるためです。


- Chrome では `preload` のデフォルトは `auto` 自動でしたが、Chrome 64 では、デフォルトが `metadata` になりました。
 ただし、デスクトップ版の Chrome では、動画の一部が `Content-Range` ヘッダーを使用してプリロードされる場合があります。
 Firefox、Edge、Internet Explorer 11 も同様に動作します。
- デスクトップ版の Chrome と同様、Safari 11.0 のデスクトップ版もさまざまな動画をプリロードします。
 バージョン 11.2（現時点では Safari の Tech Preview バージョン）では、動画メタデータのみがプリロードされます。
 [iOS の Safari では、動画はプリロードされません](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html#//apple_ref/doc/uid/TP40009523-CH2-SW9)。
- [データセーバー モード](https://support.google.com/chrome/answer/2392284)が有効な場合、`preload` はデフォルト値の `none` になります。


`preload` に関するブラウザのデフォルト動作は決まっていないため、明示的に設定することをお勧めします。
 ユーザーが再生を開始するこのケースでは、すべてのプラットフォームで動画の読み込みを遅らせる最も簡単な方法は `preload="none"` を使用することです。
 `preload` 属性は、動画コンテンツの読み込みを遅らせる唯一の方法ではありません。
 JavaScript で動画再生を処理するアイデアやヒントについては、[_動画プリロードによる高速再生_](/web/fundamentals/media/fast-playback-with-video-preload)をご覧ください。



残念ながら、この方法はアニメーション GIF の代わりに動画を使用する場合は役に立ちません。その点について以下に説明します。


### アニメーション GIF の代替の動画の場合

アニメーション GIF は広く使用されていますが、特に出力ファイルのサイズなど、さまざまな点で動画に劣ります。
 アニメーション GIF は、数メガバイトのデータになることがあります。
 たいてい、同じような画質の動画ははるかに小さくなります。


アニメーション GIF の代わりに `<video>` 要素を使用するのは、`<img>` 要素のように単純ではありません。
 アニメーション GIF には、次の 3 つの特徴があります。


1. 読み込み時に自動的に再生される。
2. 継続的にループする（[例外もあります](https://davidwalsh.name/prevent-gif-loop))。
3. オーディオ トラックがない。

これを `<video>` 要素を使用して行う場合、以下のようになります。

```html
<video autoplay muted loop playsinline>
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

`autoplay`、`muted`、`loop` の各属性は一目瞭然です。
[iOS で自動再生するには `playsinline` が必要です](https://webkit.org/blog/6784/new-video-policies-for-ios/)。
 現在、あらゆるプラットフォームで機能する、GIF の代替としての動画を利用できます。
 では、どうしたらそれを遅延読み込みできるでしょうか？[Chrome は動画を遅延読み込みします](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/03/chrome-58-media-updates%23offscreen&sa=D&ust=1521096956530000&usg=AFQjCNHPv7wM_yxmkOWKA0sZ-MXYKUdUXg)が、すべてのブラウザでこの最適化された動作を利用できるわけではありません。
対象端末やアプリケーションの要件によっては、この点を自分で処理しなければならない場合もあります。
 まず、次のように `<video>` マークアップを修正します。

```html
<video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
  <source data-src="one-does-not-simply.webm" type="video/webm">
  <source data-src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

[`poster` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster)が追加されているのに気付くでしょう。これは、動画が遅延読み込みされるまで `<video>` 要素のスペースに表示されるプレースホルダを指定することができます。
 上述の `<img>` の遅延読み込みの例と同様に、各 `<source>` 要素の `data-src` 属性に動画の URL を指定します。
 そこから、上述の Intersection Observer ベースのイメージ遅延読み込みの例に似た JavaScript を使用します。


```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
```

`<video>` 要素を遅延読み込みする場合、すべての子 `<source>` 要素を反復処理し、それらの `data-src` 属性を `src` 属性に切り替える必要があります。
 それが完了したら、要素の `load` メソッドを呼び出して動画の読み込みをトリガーする必要があります。その後、メディアは`autoplay` 属性に従って自動的に再生を開始します。




この方法により、アニメーション GIF の動作をエミュレートする動画ソリューションが得られます。これは、アニメーション GIF のように集中的なデータ使用を発生させることなく、そのコンテンツを遅延読み込みすることができます。



## 遅延読み込み用ライブラリ

遅延読み込みが内部で_どのように_機能しているのかは重要でなく、ただライブラリを使用して実行したい場合（何も恥ずかしいことではありません！）、選択肢はたくさんあります。
 多くのライブラリは、このガイドで説明しているものと似たマークアップ パターンを使用します。
 以下の遅延読み込みライブラリが役立つかもしれません。


- [lazysizes](https://github.com/aFarkas/lazysizes) は、イメージと iframe を遅延読み込みするフル機能の遅延読み込みライブラリです。
 使用されるパターンは、ここに示すコード例と非常によく似ています。つまり、`<img>` 要素上の `lazyload` クラスに自動的にバインドし、`data-src` 属性や `data-srcset` 属性にイメージ URL を指定する必要があり、そのコンテンツがそれぞれ `src` 属性や `srcset` 属性にスワップされます。
 これは Intersection Observer （またはその polyfill）を使用し、[多くのプラグイン](https://github.com/aFarkas/lazysizes#available-plugins-in-this-repo)で動画の遅延読み込みのように動作するよう拡張できます。
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js) は、Iintersection Observer のみを使用する超軽量のオプションです。
 そのため非常に高性能ですが、古いブラウザで使用するには polyfill が必要です。
- [blazy](https://github.com/dinbror/blazy) は、別の軽量（1.4 KB）遅延ローダです。
 lazysizes と同様に、読み込みにサードパーティのユーティリティを必要とせず、IE7+ でも動作します。
ただし、Intersection Observer を使用できません。
- [yall.js](https://github.com/malchata/yall.js) は、Intersection Observer を使用し、イベント ハンドラにフォールバックするライブラリで、私が書いたものです。
 これは IE11 や他の主要なブラウザと互換性があります。
- React に特化した遅延読み込みライブラリを探しているなら、[react-lazyload](https://github.com/jasonslyvia/react-lazyload) を検討してください。
 これは Intersection Observer を使用しませんが、React を使ったアプリケーションの開発に慣れている場合には、イメージの遅延読み込みを行う慣れた方法です。



これらの遅延読み込みライブラリは、それぞれドキュメント化されており、さまざまな遅延読み込みのためのマークアップ パターンが豊富にあります。
 自分で手を加えたいのでない限り、ライブラリを利用するのが早道です。
 最小限の労力で済みます。

## うまくいかない原因

イメージや動画の遅延読み込みによって確かにパフォーマンスが向上しますが、簡単に行えるタスクではありません。
 正しく行われない場合、意図しない結果が生じる可能性があります。
 そのため、次の点に注意することが重要です。


### ファースト ビューに注意する

ページ上のすべてのメディア リソースを JavaScript で遅延読み込みしたいという誘惑にかられますが、注意が必要です。
 スクロールしなくても見える範囲にあるものは、遅延読み込みすべきではありません。
 そのようなリソースは重要なアセットとみなし、通常どおりに読み込む必要があります。


主な理由として、遅延読み込みでは、スクリプトが読み込みを終了して実行を開始し DOM が対話的になるまで、そのような重要なメディア・リソースの読み込みが遅延されるためです。
 スクロールせずに見える範囲より下にあるイメージの場合は問題ありませんが、ファースト ビューで表示される重要なリソースの場合、標準の `<img>` 要素を使用したほうが速く読み込むことができます。


もちろん、最近はウェブサイトがさまざまなサイズの画面で表示されるため、スクロールせずに見える範囲を容易に特定できません。
 ノートパソコンではファーストビューで表示されるものも、モバイル端末ではスクロールしないと表示されない可能性があります。
 あらゆる状況でこれに対処するための絶対確実なアドバイスはありません。
 ページの重要なアセットの一覧を作成し、それらのイメージを通常の方法で読み込む必要があります。



さらに、遅延読み込みをトリガーするためのしきい値として、ファーストビューの範囲を厳密に指定したくない場合があります。
 ファーストビューの範囲よりも少し下にバッファ ゾーンを設定するほうが都合がよいかもしれません。ユーザーがスクロールしてビューポート内にイメージが現れるより前に、余裕を持ってイメージの読み込みを始められるからです。
 たとえば Intersection Observer API では、新しい `IntersectionObserver` インスタンスを作成するときに、オプション オブジェクトに `rootMargin` プロパティを指定できます。
 これにより、要素に効果的にバッファを与え、要素がビューポートに現れる前に遅延読み込み動作をトリガーできます。



```javascript
let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
  // Lazy loading image code goes here
}, {
  rootMargin:"0px 0px 256px 0px"
});
```

`rootMargin` の値が、CSS の `margin` プロパティで指定した値と似ているのに気付かれるでしょう。
この例では、監視要素（デフォルトではブラウザのビューポートですが、`root` プロパティを使用して特定の要素に変更可能）の下の境界を 256 ピクセル分広げています。
 これは、イメージ要素がビューポートの 256 ピクセル以内にあるときにコールバック関数が実行されることを意味します。つまり、ユーザーに実際に表示される前にイメージの読み込みが開始します。



スクロール イベント処理コードを使用してこれと同じ効果を得るには、単に `getBoundingClientRect` チェックを調整してバッファを含めます。これにより、Intersection Observer をサポートしていないブラウザでも同じ効果が得られます。



### レイアウト シフトとプレースホルダ

プレースホルダを用しない場合、メディアを遅延読み込みするとレイアウトがずれることがあります
これはユーザーにとって混乱を招くだけでなく、システム リソースを消費してゴミの一因となる高コストの DOM レイアウト操作を引き起こす可能性があります。
 少なくとも、ターゲット イメージと同じサイズを占める無地のプレースホルダや、メディア アイテムを読み込む前にそのコンテンツのヒントを与える [LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders/) や [SQIP](https://github.com/technopagan/sqip) などのテクニックを使用することを検討してください。






`<img>` タグの場合、`src` 属性が最終イメージ URL で更新されるまで、最初はその属性がプレースホルダを指す必要があります。
 プレースホルダ イメージを指すには、`<video>` 要素の `poster` 属性を使用します。
 さらに、`<img>` と `<video>` タグの両方で、`width` 属性と `height` 属性を使用します。
 これにより、メディアのロード時にプレースホルダから最終イメージに遷移する際に、要素のレンダリング サイズが変更されることはありません。



### イメージ デコーディングの遅延

大きなイメージを JavaScript でロードして DOM にドロップすると、メインスレッドが動かなくなり、デコード中にユーザー インターフェースが短時間応答しなくなる可能性があります。
 イメージを DOM に挿入する前に [`decode` メソッドを使用して非同期的にイメージをデコードする](https://medium.com/dailyjs/image-loading-with-image-decode-b03652e7d2d2)と、この問題がなくなる場合があります。
ただし、これは現時点でどこでも利用できるわけではなく、遅延読み込みロジックも複雑になります。
 使用する場合は、この点をチェックする必要があります。 以下は、フォールバックで `Image.decode()` を使用する方法を示しています。


```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

if ("decode" in newImage) {
  // Fancy decoding logic
  newImage.decode().then(function() {
    imageContainer.appendChild(newImage);
  });
} else {
  // Regular image load
  imageContainer.appendChild(newImage);
}
```

[この CodePen リンク](https://codepen.io/malchata/pen/WzeZGW)で、この例のようなコードの動作を確認してください。
 大部分のイメージがかなり小さい場合、それほど効果はないかもしれませんが、大きなイメージを遅延読み込みして DOM に挿入する場合、ジャンクを減らすのに役立ちます。



### 読み込まれない場合

メディア リソースが何らかの理由で読み込みに失敗し、エラーが発生することがあります。
 これはどのような場合に生じるのでしょうか？いろいろなケースがありますが、たとえば次のようなシナリオを仮定して考えましょう。
HTML キャッシュ ポリシーが短期間（たとえば 5 分）だとします。そして、ユーザーがサイトにアクセスするか、_または_古いタブを長時間（たとえば数時間）開いたままにしたとします。それから、あなたのコンテンツを読むために戻ってきます。
このプロセスのある時点で、再デプロイメントが行われます。 このデプロイメント中、イメージ リソースの名前はハッシュ ベースのバージョニングにより変更されるか、完全に削除されます。
 ユーザーがイメージを遅延読み込みするまでにリソースは使用不可になり、失敗します。


これが発生するのは比較的まれなことですが、遅延読み込みが失敗した場合のバックアップ計画を立てるのはよいことです。
 イメージの場合、解決策は次のようになります。


```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

newImage.onerror = function(){
  // Decide what to do on error
};
newImage.onload = function(){
  // Load the image
};
```

エラー発生時に実行する内容は、アプリケーションによって異なります。 たとえば、イメージのプレースホルダ領域をボタンで置き換えてユーザーがイメージを再度読み込めるようにしたり、イメージのプレースホルダ領域に単にエラー メッセージを表示したりできます。




他のシナリオも考えられます。 いずれにしても、エラーが発生したときにユーザーに通知し、問題が発生した場合の対処方法をユーザーに提供するのはよいことです。



### JavaScript の可用性

JavaScript が常に利用可能であると考えないでください。 イメージを遅延読み込みする場合は、JavaScript が利用できない場合にイメージを表示する `<noscript>` マークアップを使用することを検討してください。
 最も単純なフォールバックの例は、JavaScript がオフになっている場合に `<noscript>` 要素を使用してイメージを提供することです。


```html
<!-- An image that eventually gets lazy loaded by JavaScript -->
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load.jpg" alt="I'm an image!">
<!-- An image that is shown if JavaScript is turned off -->
<noscript>
  <img src="image-to-lazy-load.jpg" alt="I'm an image!">
</noscript>
```

JavaScript がオフになっている場合、プレースホルダ イメージと `<noscript>` 要素に含まれるイメージの_両方_が表示されます。
 これを回避するには、`<html>` タグに `no-js` のクラスを次のように指定します。


```html
<html class="no-js">
```

次に、`<link>` タグを介してスタイルシートがリクエストされる前に、JavaScript がオンの場合に `<html>` 要素から `no-js` クラスを削除する 1 行のインライン スクリプトを `<head>` に配置します。



```html
<script>document.documentElement.classList.remove("no-js");</script>
```

最後に、以下のように CSS を使用して、JavaScript を使用できない場合は lazy クラスの要素を単に隠すことができます。


```css
.no-js .lazy {
  display: none;
}
```

これで、プレースホルダ イメージの読み込みを防ぐことはできませんが、問題を回避できます。
 JavaScript がオフになっている場合でも、ユーザーはプレースホルダ イメージ以上のものを表示できます。プレースホルダだけ表示されて、意味のあるイメージ コンテンツが何も表示されないよりはよいでしょう。



## まとめ

注意して使用すると、イメージや動画の遅延読み込みにより、サイトでの初期ロード時間とページのペイロードが大幅に減少する可能性があります。
 ユーザーには、不要なネットワーク アクティビティやメディアリソースの処理コストが発生せず、必要に応じてそれらのリソースを表示することもできます。



パフォーマンス改善のテクニックに関して言えば、遅延読み込みの効果は明らかです。
 サイトにたくさんのインライン イメージがあるなら、不必要なダウンロードを減らすための最良の方法です。
 サイトのユーザーとプロジェクト関係者からも評価されることでしょう。


_[François
Beaufort](/web/resources/contributors/beaufortfrancois)、Dean Hume、[Ilya
Grigork](/web/resources/contributors/ilyagrigorik)、[Paul
Irish](/web/resources/contributors/paulirish)、[Addy
Osmani](/web/resources/contributors/addyosmani)、[Jeff
Posnick](/web/resources/contributors/jeffposnick)、そして Martin Schierle の貴重なフィードバックにより、この記事の質を大幅に向上させることができました。深く感謝いたします。_

