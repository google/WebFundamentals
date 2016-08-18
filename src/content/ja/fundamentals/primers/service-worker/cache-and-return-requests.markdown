---
title: "リクエストをキャッシュして返す"
description: "Service Worker がインストールされたいま、あなたがしたいのはキャッシュさせたレスポンスを返すことですよね？"
translators:
  - myakura
---

<p class="intro">Service Worker がインストールされたいま、あなたがしたいのはキャッシュさせたレスポンスを返すことですよね？</p>

Service Worker がインストールされた状態で、他のページヘ移動したりページを更新したりすると、Service Worker は `fetch` イベントを受け取ります。

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあったのでそのレスポンスを返す
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
{% endhighlight %}

ここでは `fetch` イベント内に `event.respondWith()` を定義しています。その中には `caches.match()` の Promise を渡しています。`caches.match()` はリクエストを見て、Service Worker が生成したキャッシュの中に該当するものがあるかを探します。

ここでは、マッチするレスポンスがある場合はその値を返し、そうでない場合はコール結果を `fetch()` に渡しています。これによりネットワークリクエストが発生し、結果が得られたらそれを返します。インストール時にキャッシュしたアセットは基本的にこうやって使います。

もし新しいリクエストを逐次キャッシュさせたい場合は、`fetch()` のレスポンスを処理しキャッシュに追加すればいいのです。

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあったのでレスポンスを返す
        if (response) {
          return response;
        }

        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // レスポンスが正しいかをチェック
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
{% endhighlight %}

ここでは以下を実行しています。

1. `fetch` リクエストに対する `then()` にコールバックを追加
2. レスポンスを取得したら、以下のチェックを行う

   1. レスポンスが正しいかを保証
   2. レスポンスのステータスコードが `200` かを確認
   3. レスポンスの型が `basic` かを確認。これは同じ origin からのリクエストということを表します。これはまた、サードパーティのアセットがキャッシュされないことも意味します
3. チェックが通れば、レスポンスを [clone](https://fetch.spec.whatwg.org/#dom-response-clone) する。これはレスポンスが [Stream](https://streams.spec.whatwg.org/) なので、その中身を一度しか使えないからです。この例ではレスポンスをブラウザに返すだけではなく、キャッシュに渡さなければいけません。ですのでレスポンスを clone し、ひとつをブラウザに、もうひとつをキャッシュに渡します。
