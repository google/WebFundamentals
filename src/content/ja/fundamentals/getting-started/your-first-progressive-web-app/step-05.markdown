---
title: "Service Worker を使ってアプリケーション データをキャッシュする"
description: "プログレッシブ ウェブアプリにてアプリケーションデータをキャッシュするためにService Workerを使用する"
updated_on: 2016-05-04
translators:
  - yoichiro
---

<p class="intro">
データに正しいキャッシュ戦略を選択することは重要であり、これはアプリで提供する
データの種類によって決まります。たとえば、天気情報や株価など時間の経過とともに
変動するデータはできるだけ最新のものでなければなりませんが、アバターの画像や記事の
コンテンツなどは更新の頻度が比較的少なくても問題はないと考えられます。
</p>

{% include shared/toc.liquid %}

今回のアプリに適しているのは、**まずキャッシュ、次にネットワークという優先**順でデータを
取得する戦略です。この戦略では、画面にとにかく早くデータを表示し、その後ネットワーク
から最新のデータが返された時点でデータの更新を行います。**キャッシュではなく
ネットワークを優先**した場合、ネットワークからの fetch がタイムアウトになってから
キャッシュ データが取得されることになり、待ち時間が発生してしまいます。キャッシュ
優先の場合はこうした待ち時間がなくなります。

キャッシュ、ネットワークの順でデータを取得するには、キャッシュに 1 回、
ネットワークに 1 回、合計 2 回の非同期リクエストを送信する必要があります。
アプリのネットワーク リクエストにはそれほど変更を加える必要はありませんが、
Service Worker には、応答を返す前にキャッシュを行うよう変更を加える必要が
あります。

以上の理由から、非同期リクエストを 2 回（キャッシュに 1 回、ネットワークに 1 回）
行う必要があります。通常は、キャッシュ データはほぼ瞬時に返され、最近のデータとして
アプリで利用可能になります。そしてネットワークのリクエストが返されると、ネットワーク
からの最新データを基にアプリが更新されます。

## ネットワーク リクエストを傍受して応答をキャッシュする

Service Worker に対し、Weather API へのリクエストを傍受するように、また後の
アクセスを容易にするためその応答を Cache に格納するように変更を加えます。
**キャッシュ、ネットワークの順**にデータを取得する戦略では、ネットワークの応答を
「確実な情報源」として想定し、常に最新の情報を提供するものとして位置づけます。
ネットワークからデータを取得できない場合は、アプリで最新のキャッシュ データを取得
しているので、ネットワークで失敗しても問題はないということになります。

Service Worker に `dataCacheName` を追加し、アプリケーションのデータと
App Shell を切り離せるように設定しましょう。こうすると、App Shell が更新されて
古いキャッシュが消去されても、データは変更されず高速な読み込みに対応できます。なお、
将来データ形式が変わった場合は、App Shell とコンテンツの同期を確保しつつ新しい
形式に対応する方法が必要になります。

`service-worker.js` ファイルの先頭に次の行を追加します。

{% highlight javascript %}
var dataCacheName = 'weatherData-v1';
{% endhighlight %}

次に、`fetch` イベント ハンドラに変更を加え、データ API へのリクエストを他の
リクエストと別に処理できるようにする必要があります。

{% highlight javascript hl_lines="3 4 5 6" %}
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  var dataUrl = 'https://publicdata-weather.firebaseio.com/';
  if (e.request.url.indexOf(dataUrl) === 0) {
    // Put data handler code here
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
{% endhighlight %}

このコードでは、リクエストを傍受し、URL の先頭が Weather API のアドレスかどうかを
確認します。URL の先頭が Weather API のアドレスであれば、`fetch` を使用して
リクエストを行います。応答が返されたらキャッシュを開き、応答をコピーして格納した後、
リクエストの送信元に応答を返します。

次に、コードの `// Put data handler code here` の部分を以下のコードに
置き換えます。

{% highlight javascript %}
e.respondWith(
  fetch(e.request)
    .then(function(response) {
      return caches.open(dataCacheName).then(function(cache) {
        cache.put(e.request.url, response.clone());
        console.log('[ServiceWorker] Fetched&Cached Data');
        return response;
      });
    })
);
{% endhighlight %}

このアプリはまだオフラインでは動作しません。App Shell のデータのキャッシュと取得を
実装しましたが、データをキャッシュできてもまだネットワークに依存している状態です。

## リクエストを行う

前に説明したとおり、アプリではキャッシュに 1 回、ネットワークに 1 回、合計 2 回の
非同期リクエストを送信する必要があります。アプリでは `window` で利用可能な
`caches` オブジェクトを使ってキャッシュにアクセスし、最新のデータを取得します。
これはプログレッシブ・エンハンスメントを実装する場合の良い例です。すべてのブラウザで
`caches` オブジェクトが利用可能とは限らず、`caches` オブジェクトが利用できない
ときはネットワーク リクエストが引き続き動作可能でなければならないからです。

必要な手順は次のとおりです。

1. グローバルな `window` オブジェクトにおいて、`caches` オブジェクトが利用可能か
どうかを確認します。
1. キャッシュにデータをリクエストします。
    1. サーバーへのリクエストでまだ応答がない場合は、キャッシュ データを使ってアプリを更新します。
1. サーバーにデータをリクエストします。
    1. データを保存し、後ですばやくアクセスできるようにします。
    1. サーバーからの最新データを使ってアプリを更新します。

まれに、キャッシュよりも先に XHR  が応答することがあります。このような場合に
キャッシュによってアプリが更新されないように、まずフラグを追加しましょう。`app`
オブジェクトに `hasRequestPending: false` を追加します。

次に、`caches` オブジェクトが存在するかどうかを確認し、存在する場合はそこから
最新のデータをリクエストします。方法は、XHRが作られる前に、`app.getForecast` に
次のコードを追加します。

{% highlight javascript %}
if ('caches' in window) {
  caches.match(url).then(function(response) {
    if (response) {
      response.json().then(function(json) {
        // Only update if the XHR is still pending, otherwise the XHR
        // has already returned and provided the latest data.
        if (app.hasRequestPending) {
          console.log('updated from cache');
          json.key = key;
          json.label = label;
          app.updateForecastCard(json);
        }
      });
    }
  });
}
{% endhighlight %}

最後に、`app.hasRequestPending` フラグを更新します。それには、XHR の作成の前に
`app.hasRequestPending = true;` を追加し、XHR の応答ハンドラで
`app.updateForecastCard(response)` の直前に `app.hasRequestPending = false;`
と設定します。

これで、お天気アプリでは、キャッシュから 1 回、XHR を介して 1 回、合計 2 回の
非同期リクエストが行われるようになりました。キャッシュにデータが存在する場合は
そのデータが返され、XHR からの応答がなければキャッシュ データが高速（10s/ms）
に表示されてカードが更新されます。その後、XHR から応答があると、Weather API
から直接取得した最新のデータを使ってカードが更新されます。

何らかの理由でキャッシュより早く XHR から応答があった場合は、`hasRequestPending`
フラグにより、ネットワークの最新データにキャッシュ データが上書きされる事態が回避されます。

## テスト

* コンソールで、更新のたびに 2 つのイベント（キャッシュからデータが取得されたことを
示すイベントと、ネットワークからデータが取得されたことを示すイベント）が表示される
ことを確認します。
* この時点で、アプリは完全にオフラインで動作するようになっています。開発用のサーバー
を停止し、ネットワークの接続を切断して、アプリを実行してみてください。App Shell
とデータの両方がキャッシュから配信されるようになります。

<a href="https://weather-pwa-sample.firebaseapp.com/step-07/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">試す</a>
