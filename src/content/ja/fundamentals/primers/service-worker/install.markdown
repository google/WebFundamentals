---
title: "Service Worker のインストール"
description: "コントロールされたページが登録プロセスを発生させると、主役は Service Worker のスクリプトに移ります。そしてスクリプトは `install` イベントを処理します。"
translators:
  - myakura
---

<p class="intro">コントロールされたページが登録プロセスを発生させると、主役は Service Worker のスクリプトに移ります。そしてスクリプトは `install` イベントを処理します。</p>

最も簡単なケースとして、`install` イベントにコールバックを定義し、キャッシュさせたいファイルを指定します。

{% highlight javascript %}
self.addEventListener('install', function(event) {
  // インストール処理
});
{% endhighlight %}

セットしたコールバックでは以下を実行しています。

1. キャッシュを開く
2. ファイルをキャッシュさせる
3. 必要なアセットがすべてキャッシュされたかを確認する

{% highlight javascript %}
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
{% endhighlight %}

ここでは、好きなキャッシュ名をつけ `caches.open()` をコールし、その後キャッシュさせたいファイルの配列を `cache.addAll()` に渡しています。一連の処理は `Promise` をチェーンさせています（`caches.open()` と `cache.addAll()`）。 `event.waitUntil()` は `Promise` をとり、インストールにかかる時間と、与えた処理が成功したかどうかを知るために使われます。

渡したファイルがすべて無事にキャッシュされた場合、Service Worker のインストールが完了します。渡したファイルのうち**どれかひとつでも**ダウンロードに失敗した場合、インストールは失敗します。こうすることによりすべてのアセットが存在していると保証できますが、インストール時にキャッシュさせたいファイルを決めなければいけません。ファイルの数が大きくなれば、キャッシュが失敗して Service Worker がインストールされない確率も高くなります。

これはあくまで一例です。`install` イベントでは他の処理もできますし、`install` にイベントリスナを設定しなくてもいいのです。
