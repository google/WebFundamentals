---
title: "つまづきポイント"
description: "Service Worker はまだ新しい技術です。ここではつまづきやすいポイントを紹介します。"
translators:
  - myakura
---

<p class="intro">Service Worker はまだ新しい技術です。ここではつまづきやすいポイントを紹介します。早くこのセクションがなくなればいいですが、いま Service Worker で何かをする場合は気に留めておいてください。</p>

## インストールが失敗したときのフィードバックが少ない

Worker が登録されても `chrome://inspect/#service-workers` や `chrome://serviceworker-internals` に現れない場合、`event.waitUntil` に渡された `Promise` が reject されたなどの理由からインストールに失敗した可能性が高いです。

インストールが成功したか失敗したかを知るには、`chrome://serviceworker-internals` に行き、「Open DevTools window and pause JavaScript execution on service worker startup for debugging」にチェックを入れ、そして `install` イベントの開始時に `debugger` ステートメントを記述してください（このオプションは Chrome 47 より前のバージョンでは名前が異なります）。これと DevTools の [Pause on exception ボタン](https://developers.google.com/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints#exceptions)」で問題を見つけられるでしょう。

## fetch() のデフォルト

### クレデンシャルがデフォルトでは送られない

`fetch()` はデフォルトでは Cookie などのクレデンシャルをリクエストに含めません。含めたい場合は次のようにします。

{% highlight javascript %}
fetch(url, {
  credentials: 'include'
})
{% endhighlight %}

この挙動は意図的で、XHR の「URL が同一 origin の場合にだけクレデンシャルを含める」という複雑な挙動よりも明らかに良いものです。Fetch の挙動は他の CORS リクエストに似ています。CORS リクエストはたとえば `<img crossorigin>` といったものです。この場合、`<img crossorigin="use-credentials">` とオプトインしなければ Cookie は送られません。

### 非 CORS なリクエストはデフォルトで失敗する

サードパーティの URL を取得しようとしても、CORS がサポートされていない場合 `fetch` は失敗します。非 CORS なリクエストを送るためには、`Request` オブジェクトに `no-cors` オプションを指定しなければいけません。しかしこうすると、返ってくるのは「不透明（opaque）」なレスポンスになります。これはレスポンスが成功したかどうかが分からないということです。

{% highlight javascript %}
cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
  return new Request(urlToPrefetch, { mode: 'no-cors' });
})).then(function() {
  console.log('All resources have been fetched and cached.');
});
{% endhighlight %}

### レスポンシブ・イメージの処理

`srcset` 属性や `<picture>` 要素は、最も適切な画像アセットを選択しリクエストする仕組みです。

Service Worker のインストール時に画像をキャッシュさせたい場合、以下のパターンが考えられます。

1. `srcset` 属性や `<picture>` 要素に指定された画像すべてをインストールする
2. 低解像度版の画像をインストールする
3. 高解像度版の画像をインストールする

実際には、2番か3番を選ぶべきでしょう。すべての画像をダウンロードするのは無駄ですから。

低解像度の画像をインストール時にキャッシュさせるなら、後でネットワークが繋がった時に高解像度の画像をダウンロードするようにすればいいのです。高解像度の画像がダウンロードされなくても手元には低解像度の画像があるのでフォールバックできます。素敵な考えですが、ひとつ問題があります。

以下の様なふたつの画像があるとします。

| ピクセル密度 | 幅  | 高さ |
| ---------- | --- | ---- |
| 1x         | 400 | 400  |
| 2x         | 800 | 800  |

`srcset` 属性を使ったマークアップは次のようになります。

{% highlight html %}
<img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x">
{% endhighlight %}

2x な画面では、ブラウザは `image-2x.png` をダウンロードするでしょう。オフラインであれば `catch()` し、キャッシュした `image-src.png` を返せます。しかしブラウザは 2x な画面での表示を想定しているので、画像は 400×400 CSS ピクセルではなく 200×200 CSS ピクセルで表示されます。これを回避するには、画像の幅と高さを明示します。

{% highlight html %}
<img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
style="width:400px; height: 400px;">
{% endhighlight %}

アート・ディレクションで `<picture>` 要素を使う場合、この方法はとても難しくなり、画像がどのように作られ使われるかにかなり依存します。しかし `srcset` と同じような方法は使えます。
