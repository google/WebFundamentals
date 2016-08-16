---
title: "Service Worker の更新"
description: "開発が進むと、Service Worker を更新しなければいけない時が来るでしょう。"
translators:
  - myakura
---

<p class="intro">開発が進むと、Service Worker を更新しなければいけない時が来るでしょう。更新は以下の手順で行います。</p>

1. Service Worker の JavaScript ファイルを更新します。ユーザーがあなたのサイトに移動してきた時、ブラウザは Service Worker を定義する JavaScript ファイルを再度ダウンロードしようとします。現在ブラウザが保持しているファイルとダウンロードしようとするファイルにバイト差異がある場合、それは「新しいもの」と認識されます
2. 新しい Service Worker がスタートし、`install` イベントが発火します
3. この時点では、まだ古い Service Worker が現在のページをコントロールしているため、新しい Service Worker は `waiting` 状態になります
4. 開かれているページが閉じられたら、古い Service Worker は終了され、新しい Service Worker がページをコントロール可能になります
5. 新しい Service Worker がページをコントロール可能になったら、`activate` イベントが発火します

`activate` のコールバックで行いたいのが、キャッシュの管理です。なぜかというと、古いキャッシュをインストール時に削除すると、現在のページを管理する古い Service Worker がそのキャッシュからリソースを提供できなくなるからです。

たとえば、`my-site-cache-v1` という名前のキャッシュがあり、これをページ用、ブログ用のふたつのキャッシュに分割したいとしましょう。インストール時に `pages-cache-v1` と `blog-posts-cache-v1` というふたつのキャッシュを作り、アクティベーション時に古い `my-site-cache-v1` を削除するわけです。

次のコードは Service Worker 中のキャッシュすべてをループ処理し、ホワイトリストにないものを削除するものです。

{% highlight javascript %}
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
{% endhighlight %}
