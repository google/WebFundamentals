---
title: "Service Worker を使って App Shell を事前キャッシュする"
description: "プログレッシブ ウェブアプリのApp Shellを事前キャッシュするために、Service Workerを使う。"
updated_on: 2016-05-02
translators:
  - yoichiro
notes:
  sw-intro: "Service Worker をよくご存知ない場合は、[Service Worker の概要記事](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)をご覧ください。この記事では、Service Worker でできることや、Service Worker のライフサイクルなど、基本事項を説明しています。"
  sw-https: "Service Worker の機能は  HTTPS  経由でアクセスしたページでのみ使用できます（テストを円滑に進められるように、<code>https://localhost</code> またはこれに相当する URL でも動作するようになっています）。この制約が課せられる理由については、Chromium チームの投稿記事 <a href='http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features'>Prefer Secure Origins For Powerful New Features</a>（強力な新機能に対する「セキュア オリジン」の採用傾向について）をご覧ください。"
  not-production: "下記のコードは本番環境では使用<b>しないでください</b>。これはごく基本的な用途に対応したコードで、本番環境で使用すると App Shell が更新されない状況に陥る可能性があります。後のセクションでこの実装に伴う危険性とその回避方法を説明していますので、必ずご確認ください。"
  permutations: "ファイル名はパス全体を含めるようにしてください。たとえばアプリは <code>index.html</code> から配信されますが、リクエストには「<code>/</code>」も含まれています（サーバーはルートフォルダがリクエストされたときに <code>index.html</code> を送信します）。<code>fetch</code> メソッドでこの処理を行うこともできますが、大文字と小文字の組み合わせに注意が必要となり、かえって複雑になる可能性があります。"
  bump-name: "<code>[ServiceWorker]</code> がコンソールにログ出力されない場合は、<code>cacheName</code> を変更していることを確認してページを再度読み込んでください。これで解決できない場合は、「運用中の Service Worker のテストを行う際のヒント」の項をご覧ください。"
---

<p class="intro">
プログレッシブ ウェブアプリは、高速に動作し、かつインストール可能でなければなりません。
つまり、オンラインでも、オフラインでも、接続が不安定または遅い場所でも動作することが
求められます。これを実現するには、Service Worker を使用して App Shell を
キャッシュし、常にすばやく利用できる状態を維持する必要があります。
</p>

{% include shared/toc.liquid %}

Service Worker をよくご存知ない場合は、[Service Worker の概要記事](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)をご覧ください。
この記事では、Service Worker でできることや、Service Worker のライフサイクルなど、
基本事項を説明しています。

Service Worker を介して提供する機能は、プログレッシブ・エンハンスメントの 1 つとして
考えるべきで、こうした機能を追加するのはブラウザでサポートされている場合のみにする
必要があります。たとえばネットワークを使用できない状況では、Service Worker を使って
App Shell とアプリのデータをキャッシュすることができます。一方 Service Worker
がサポートされていない場合は、オフラインのコードを呼び出すことなく、最小限のユーザー
エクスペリエンスのみを提供します。段階的な機能向上を提供するための機能検出に伴う
オーバーヘッドはわずかで、機能をサポートしていない古いブラウザが使用されている場合、
問題が起こることはありません。

{% include shared/remember.liquid list=page.notes.sw-https %}

## Service Worker が利用可能な場合に登録する

オフラインでもアプリが動作するようにするには、まず Service Worker を登録します。
Service Worker は、ウェブページを開いていなくても、またはユーザーの操作がなくても、
バックグラウンドで処理を進めることのできるスクリプトです。

登録の手順は次のとおりです。

1. Service Worker のコードを提供する JavaScript ファイルを作成します。
1. 作成した JavaScript ファイルを Service Worker として登録するようブラウザに指定します。

まず、アプリケーションのルートフォルダ（`your-first-pwapp-master/work`）に
`service-worker.js` という空のファイルを作成します。このファイルは
アプリケーションのルートに置く必要があります。このファイルが置かれている
ディレクトリによって Service Worker のスコープが定義されるためです。

次に、ブラウザで Service Worker がサポートされているかどうかを確認し、サポート
されている場合は Service Worker を登録します。方法は、 `app.js` ファイルに、
次のコードを追加します。

{% highlight javascript %}
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
}
{% endhighlight %}

## サイトのアセットをキャッシュする

Service Worker を登録すると、ユーザーがページに初めてアクセスしたときに
`インストール` イベントが呼び出されます。このイベント ハンドラで、アプリケーションに
必要なすべてのアセットをキャッシュします。

{% include shared/note.liquid list=page.notes.not-production %}

Service Worker が呼び出されると、caches オブジェクトが開かれ、App Shell の
読み込みに必要なアセットが挿入されます。`service-worker.js` ファイルの末尾に次の
コードを追加してください。

{% highlight javascript %}
var cacheName = 'weatherPWA-step-5-1';
var filesToCache = [];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
{% endhighlight %}

まず、`caches.open()` を使用してキャッシュを開き、キャッシュに名前を付けます。
キャッシュに名前を付けることでファイルのバージョン管理が可能になります。また、
データと App Shell を切り離し、お互いに影響を与えることなく個別に更新できるように
なります。

キャッシュが開いたら、`cache.addAll()` を呼び出します。これは URL のリストを取り、
該当のファイルをサーバーから取得して応答をキャッシュに追加します。`cache.addAll()`
は最小単位であるため、ファイルのうち 1 つでも取得できないものがあると、キャッシュの
ステップそのものが失敗に終わります。

Service Worker に変更を加えるときには必ず `cacheName` を変更し、キャッシュから
最新版のファイルが取得されるようにします。使わないコンテンツやデータのキャッシュは
定期的に削除することが重要です。イベント リスナーを追加して、すべてのキャッシュキー
の取得と使われていないキャッシュキーの削除を行う `activate` イベントを待機します。

{% highlight javascript %}
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});
{% endhighlight %}

最後に、App Shell に必要なファイルのリストを更新しましょう。画像、JavaScript、
スタイルシートなど、アプリに必要なすべてのファイルを配列に含めます。

{% highlight javascript %}
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic\_add\_white\_24px.svg',
  '/images/ic\_refresh\_white\_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];
{% endhighlight %}

{% include shared/note.liquid list=page.notes.permutations %}

まだアプリはオフラインで動作しません。App Shell の構成要素のキャッシュは
できましたが、ローカル キャッシュからの読み込みを行う必要があります。

## キャッシュからApp Shell を配信する

Service Worker を使うと、プログレッシブ ウェブアプリから送信されたリクエストを
傍受して Service Worker 内部で処理することができます。つまり、リクエストの
処理方法を決めることができ、キャッシュした応答を配信することも可能です。

例:

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
  // Do something interesting with the fetch here
});
{% endhighlight %}

`service-worker.js` file:
それでは、キャッシュからApp Shell を配信しましょう。`service-worker.js`
ファイルの末尾に次のコードを追加します。

{% highlight javascript %}
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
{% endhighlight %}

内側から外側に向かって説明すると、まず `caches.match()` を使用して、`fetch`
イベントを呼び出したウェブ リクエストを評価し、キャッシュからのデータが利用可能か
どうかを確認します。次に、キャッシュ データで応答するか、fetch を使用して
ネットワークからコピーを取得します。そして、`e.respondWith()` を使用して
ウェブページに `response` を返します。

{% include shared/remember.liquid list=page.notes.bump-name %}

## 特殊なケースに関する注意

何度も言いますが、このコードは**本番環境では使用しないでください**。このコードは、
多くの特殊ケースには対応していません。

### 変更のたびにキャッシュキーの更新が必要

たとえば、このキャッシュ方法では、コンテンツを変更するたびにキャッシュキーを更新する
必要があります。そうしないとキャッシュは更新されず、古いコンテンツが配信されることに
なります。このため、プロジェクトでの作業中は、変更を行うたびにキャッシュキーを変更
するようにしてください。

### 変更のたびにキャッシュ全体の再ダウンロードが必要

もう 1 つの注意点は、ファイルを変更するとキャッシュ全体が無効になるため、
再ダウンロードが必要になるということです。つまり、1 文字のスペルミスを修正した
だけでも、キャッシュが無効になり、もう一度全体をダウンロードしなければならなく
なります。これはあまり効率的とは言えません。

### ブラウザ キャッシュによってService Worker のキャッシュ更新が妨害される

さらにもう 1 つの注意点として、インストール処理中に行う HTTPS リクエストは
ネットワークに直接送信し、ブラウザのキャッシュから応答が返されないようにすることが
重要です。そうしないと、キャッシュされた古い応答がブラウザから返され、その結果、
Service Worker のキャッシュが更新されなくなります。

### 本番環境での「キャッシュ優先」戦略の使用

今回のアプリでは「キャッシュ優先」の戦略を使用します。この場合、キャッシュされた
コンテンツのコピーがあれば、ネットワークに問い合わせを行わずにキャッシュのコピーを
返すことになります。「キャッシュ優先」の戦略は簡単に実装できる一方で、後から
さまざまな課題を生む原因になることがあります。ホストページと Service Worker
の登録内容のコピーがキャッシュされると、Service Worker の設定を変更することは
極めて困難です（設定は定義された場所に依存するため）。また、実装したサイトの更新も
非常に複雑になります。

### 特殊なケースを回避するには

こうした特殊なケースを回避するには、[sw-precache](https://github.com/GoogleChrome/sw-precache)
のようなライブラリを使用します。こうしたライブラリを使用するとデータの有効期限を
適切に管理することができます。また、リクエストがネットワークに直接送信されるように
なるとともに、あらゆる煩雑な作業から解放されます。

## 運用中の Service Worker をテストする際のヒント

Service Worker のデバッグは困難な場合があります。さらに、キャッシュを使用する
場合に想定どおりにキャッシュが更新されないと、さらに解決に苦労することになります。
典型的な Service Worker のライフサイクルとコードのバグに挟まれて、身動きが
とれなくなってしまうでしょう。しかし、こうした作業を容易にしてくれるツールが
あります。

ヒント:

* Service Worker の登録が解除された後も、関連するブラウザ ウィンドウが閉じられる
まで、Service Worker が表示されることがあります。
* アプリに対して複数のウィンドウが開いている場合、新しい Service Worker の動作が
有効になるのは、すべてのウィンドウが再読み込みされて最新の Service Worker に更新されてからとなります。
* Service Worker の登録を解除してもキャッシュは消去されません。このため、
キャッシュ名が変わっていないと古いデータが使用される可能性があります。
* Service Worker が既に存在する場合、新しい Service Worker を登録しても、
[即時コントロール](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control)
を指定していなければ新しい Service Worker は機能しません。ページを再読み込みして
初めて機能するようになります。

### 作業に役立つページ: chrome://serviceworker-internals

Chrome の Service Worker  ページ（`chrome://serviceworker-internals`）を
利用すると、既存の Service Worker を停止し、登録を解除して、新たに開始するという
一連の操作を簡単に行うことができます。このページでは、Service Worker から
デベロッパー ツールを起動して、Service Worker のコンソールにアクセスすることも
できます。

## テスト

* Chrome DevTools を開き、Service Worker が適切に登録され正しいリソースが
キャッシュされていることを確認します。
* `cacheName` を変更してみて、キャッシュが適切に更新されることを確認します。

<a href="https://weather-pwa-sample.firebaseapp.com/step-05/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">試す</a>
