project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2014-12-09 #}
{# wf_blink_components: N/A #}

# オフライン クックブック {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

AppCache が登場したとき、コンテンツをオフラインで動作させるためのパターンがいくつか提供されました。
 それらのパターンがあなたの求めていたものだったとしたらラッキーです。AppCache の宝くじに当たったも同然です（当選者はまだ名乗り出ていませんが）。しかし、ほとんどの人は [AppCache という問題児](http://alistapart.com/article/application-cache-is-a-douchebag)に悩まされていました。




Google はオフラインでの解決の試みを断念し、[Service Worker][sw_primer] によって、デベロッパー自身が解決できるようにするための実用的なツールを提供しました。
 Service Worker では、キャッシュやリクエストの処理方法を制御できます。
 つまり、独自のパターンを作成できるようになったのです。
 考えられるいくつかのパターンを個別に見ていきましょう。ただし、実際には URL やコンテキストに応じて、複数のパターンを組み合わせて使用することになります。



特に断りのない限り、現時点ではすべてのコードサンプルは Chrome と Firefox で動作します。
Service Worker のサポートの詳細については、["Is Service Worker Ready?"][is_sw_ready] をご覧ください。

これらのいくつかのパターンの実際のデモについては、[Trained-to-thrill][ttt] をご覧ください。そのパフォーマンスの効果は[この動画](https://www.youtube.com/watch?v=px-J9Ghvcx4)を見ればわかります。



## キャッシュ マシン - リソースを格納するタイミング

[Service Worker][sw_primer] では、リクエストとキャッシュは別々に処理されるため、これらの説明も別々に行います。
 まず、キャッシュはいつ実行する必要があるでしょうか？


### インストール時 - 依存関係として {: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

Service Worker は `install` イベントを提供します。 このイベントを使用して、他のイベントを処理する前にやっておくべき準備を行うことができます。
 この時点では前のバージョンの Service Worker がまだ実行中で、ページを処理しているので、準備作業によってそれを中断してはなりません。



**最適なケース:** CSS、画像、フォント、JS、テンプレートなど、基本的にサイトの特定の「バージョン」に対して静的と見なしうるすべてのもの。


それらのフェッチに失敗した場合、サイト全体が機能不全に陥る原因になります。それらはネイティブ アプリの初回ダウンロードに含まれるものと同じです。



    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mysite-static-v3').then(function(cache) {
          return cache.addAll([
            '/css/whatever-v3.css',
            '/css/imgs/sprites-v6.png',
            '/css/fonts/whatever-v8.woff',
            '/js/all-min-v4.js'
            // etc
          ]);
        })
      );
    });

`event.waitUntil` は Promise を受け取り、インストールの長さと成功を定義します。
 Promise が棄却された場合、インストールは失敗したと見なされ、この Service Worker は破棄されます（古いバージョンが実行中の場合、古いバージョンは影響を受けません）。
 `caches.open` と `cache.addAll` は Promise を返します。
 いずれかのリソースのフェッチに失敗すると、`cache.addAll` 呼び出しは棄却されます。


[trained-to-thrill][ttt] では、これを使用して[静的アセットをキャッシュ](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3)しています。



### インストール時 - 依存関係としてではなく {: #on-install-not }

<img src="images/cm-on-install-not.png">

上記と似ていますが、インストールの完了を遅延させず、キャッシュに失敗してもインストールの失敗にはつながりません。


**最適なケース:** サイズが大きく、すぐには必要とされないリソース（ゲームの後の方のレベルで使用されるアセットなど）。


    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mygame-core-v1').then(function(cache) {
          cache.addAll(
            // levels 11-20
          );
          return cache.addAll(
            // core assets & levels 1-10
          );
        })
      );
    });

レベル 11～20 の `cache.addAll` Promise を `event.waitUntil` に渡していないので、これが失敗してもゲームはオフラインで続行できます。
 当然ながら、これらのレベルが存在しない可能性を考慮し、存在しない場合はそれらのキャッシュを再試行する必要があります。


レベル 11～20 のダウンロード中に Service Worker が強制終了されることもあります。これはイベント処理が完了し、イベントをキャッシュする必要がなくなるためです。
 今後、このようなケースや映画などの大容量ダウンロードに対応するために、バックグラウンドでダウンロードする API を追加する予定です。



### アクティベート時 {: #on-activate }

<img src="images/cm-on-activate.png">

**最適なケース:** クリーンアップと移行。

新しい Service Worker がインストールされて前のバージョンが使用されなくなると、新しい Service Worker がアクティベートされ、`activate` イベントが発生します。
 古いバージョンはもう気にしなくてよいので、このタイミングで IndexedDB のスキーマ移行処理や使用しないキャッシュの削除を行うとよいでしょう。



    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
      );
    });

アクティベート中、`fetch` などの他のイベントはキューに入れられるため、アクティベートに時間がかかるとページの読み込みがブロックされてしまう可能性があります。
 アクティベーションはできるだけ簡素なものにしておき、古いバージョンがアクティブだったときに実行できなかった処理のみにアクティベーションを使用するようにしてください。



[trained-to-thrill][ttt] では、これを使用して[古いキャッシュを削除](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17)しています。


### ユーザー操作時 {: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

**最適なケース:** サイト全体をオフラインにできない場合に、ユーザーがオフラインで利用したいコンテンツを選択できるようにします。
 たとえば、 YouTube などの動画、Wikipedia の記事、Flickr の特定のギャラリーなどです。


ユーザーに「後で読む」ボタンや「オフライン用に保存」ボタンを提供します。 ユーザーがボタンをクリックすると、必要なリソースがネットワークからフェッチされ、キャッシュに格納されます。


    document.querySelector('.cache-article').addEventListener('click', function(event) {
      event.preventDefault();

      var id = this.dataset.articleId;
      caches.open('mysite-article-' + id).then(function(cache) {
        fetch('/get-article-urls?id=' + id).then(function(response) {
          // /get-article-urls returns a JSON-encoded array of
          // resource URLs that a given article depends on
          return response.json();
        }).then(function(urls) {
          cache.addAll(urls);
        });
      });
    });

[Cache API][caches_api] は、Service Worker だけでなくページからも利用できます。つまり、キャッシュにリソースを追加するために Service Worker を使用する必要がありません。




### ネットワークの応答時 {: #on-network-response }

<img src="images/cm-on-network-response.png">

**最適なケース:** ユーザーの受信トレイや記事コンテンツなど、頻繁に更新されるリソース。
 また、アバターなどの必須でないコンテンツにも役立ちます（ただし、注意が必要です）。


リクエストに一致するものがキャッシュ内になければ、ネットワークから取得してページに送信し、同時にキャッシュにも追加します。


アバターなど広範囲の URL に対してこれを実行する場合は、オリジンのストレージを肥大化させないよう注意が必要です。ユーザーがディスク領域を再要求する必要が生じたときに、自分が第一候補になりたくはありません。
 不要になったキャッシュ内のアイテムは必ず削除するようにしてください。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    });

メモリを効率的に使用するために、レスポンスとリクエストの本文の読み取りを 1 回に限定することができます。
 上記のコードでは、[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone) を使用して、別個に読み取ることができる追加のコピーを作成しています。



[trained-to-thrill][ttt] では、これを使用して [Flickr 画像をキャッシュ](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109)しています。


### stale-while-revalidate {: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

**最適なケース:** 頻繁に更新されるが、必ずしも最新のバージョンでなくてもよいリソース。
 アバターはこのカテゴリに該当します。

キャッシュされたバージョンが利用可能であればそれを使用しますが、次回に備えて最新版をフェッチします。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function(response) {
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            return response || fetchPromise;
          })
        })
      );
    });

これは、HTTP の [stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale) にとてもよく似ています。


### プッシュ メッセージ時 {: #on-push-message }

<img src="images/cm-on-push.png">

[Push API](/web/fundamentals/push-notifications) は、Service Worker をベースに構築された別の機能です。
 この API により、OS のメッセージング サービスからのメッセージに応じて Service Worker を起動できます。
 このとき、ユーザーがサイトのタブを開いていなくても、Service Worker のみが起動されます。
 ページからタブを開くためのパーミッションをリクエストして、ユーザーにプロンプトを表示します。


**最適なケース:** チャット メッセージ、ニュース速報、メールなど、通知に関連するコンテンツ。
 また、頻繁には変更されないが即座に同期することに意味があるコンテンツ（TODO リストの更新やカレンダーの予定変更など）。



<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

通常、通知をタップすると、その最終結果として関連ページが開いたりフォーカスされたりしますが、それが起こる前にキャッシュを更新しておくことが非常に重要です。
 ユーザーがプッシュ メッセージを受信するときは当然オンラインですが、その通知を最終的に操作するときはオンラインであるとは限りません。そのため、このコンテンツをオフラインで利用できるようにすることが重要です。
 Twitter のネイティブ アプリは、その大部分がオフラインファーストの代表的な例ですが、そうとはいえない点もあります。



ネットワーク接続がなければ、Twitter はプッシュ メッセージに関連するコンテンツを提供できません。
 また、メッセージをタップすると通知が削除されるので、ユーザーが得られる情報はタップする前より減ってしまいます。
 そのような事態は避けてください。

<div style="clear:both;"></div>

以下のコードは、キャッシュを更新してから通知を表示します。

    self.addEventListener('push', function(event) {
      if (event.data.text() == 'new-email') {
        event.waitUntil(
          caches.open('mysite-dynamic').then(function(cache) {
            return fetch('/inbox.json').then(function(response) {
              cache.put('/inbox.json', response.clone());
              return response.json();
            });
          }).then(function(emails) {
            registration.showNotification("New email", {
              body:"From " + emails[0].from.name
              tag: "new-email"
            });
          })
        );
      }
    });

    self.addEventListener('notificationclick', function(event) {
      if (event.notification.tag == 'new-email') {
        // Assume that all of the resources needed to render
        // /inbox/ have previously been cached, e.g. as part
        // of the install handler.
        new WindowClient('/inbox/');
      }
    });


### バックグラウンド同期時 {: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

[バックグラウンド同期](/web/updates/2015/12/background-sync)は、Service Worker をベースに構築された別の機能です。
 これにより、バックグラウンド データの同期を 1 回限り、または（非常にヒューリスティックな）間隔をおいてリクエストできます。
 このとき、ユーザーがサイトのタブを開いていなくても、Service Worker のみが起動されます。
 ページからタブを開くためのパーミッションをリクエストして、ユーザーにプロンプトを表示します。


**最適なケース:** 急を要さない更新。特に、ソーシャル メディアのタイムラインやニュース記事などで定期的に発生する更新（更新のたびにプッシュ メッセージが発生すると発生頻度があまりにも高くなってしまいます）。



    self.addEventListener('sync', function(event) {
      if (event.id == 'update-leaderboard') {
        event.waitUntil(
          caches.open('mygame-dynamic').then(function(cache) {
            return cache.add('/leaderboard.json');
          })
        );
      }
    });


## キャッシュの永続性 {: #cache-persistence }

オリジンには、処理を実行するための一定の空き領域が与えられます。
この空き領域はすべてのオリジン ストレージ間で共有されます。たとえば、LocalStorage、IndexedDB、ファイルシステム、（当然ながら）キャッシュなどです。


与えられる領域は決まっておらず、端末やストレージの状況によって異なります。
 与えられている領域を確認するには、次のコードを使用します。

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

ただし、すべてのブラウザ ストレージと同様に、端末のストレージが残り少なくなると、ブラウザはこの領域を自由に放棄することができます。
 残念ながら、これらの映画は残したい、このゲームは削除されてもかまわないといった違いをブラウザは判断できません。



この問題の回避策として、API
[`requestPersistent`](https://storage.spec.whatwg.org/){: .external } が用意されています。

    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

もちろん、ユーザーはパーミッションを付与する必要があります。 重要なのは、ユーザーをこのフローに組み込むことです。それにより、削除の可否の判断をユーザーに委ねることができます。
端末の容量が残り少なくなったとき、不要なデータを削除しても容量不足が解決しない場合は、どのアイテムを残すかまたは削除するかをユーザーが決定します。



これがうまくいくためにオペレーティング システム側で必要となるのは、ブラウザを 1 つのアイテムとして報告するのではなく、ストレージ使用状況の分析において、「永続性のある」オリジンをネイティブ アプリと同等に扱うことです。




## 提案の提供 - リクエストへの応答 {: #serving-suggestions }

どれだけキャッシュを行っても、それらのキャッシュをいつどのように使用するかを Service Worker に指示しないと、キャッシュは使用されません。
 ここでは、リクエスト処理に関するパターンをいくつか示します。


### キャッシュのみ {: #cache-only }

<img src="images/ss-cache-only.png">

**最適なケース:** サイトの特定の「バージョン」に対して静的と見なしうるすべてのもの。
これらは install イベントでキャッシュされているはずなので、既にあるものとして当てにできます。


    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

このケースの処理が特に必要になることはほとんどありませんが、[キャッシュになければネットワークから取得](#cache-falling-back-to-network)で説明しています。


### ネットワークのみ {: #network-only }

<img src="images/ss-network-only.png">

**最適なケース:** アナリティクス ping、GET 以外のリクエストなど、オフラインに相当するものがないもの。


    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

このケースの処理が特に必要になることはほとんどありませんが、[キャッシュになければネットワークから取得](#cache-falling-back-to-network)で説明しています。


### キャッシュになければネットワークから取得 {: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

**最適なケース:** オフライン ファーストのアプリを作成する場合、ほとんどのリクエストの処理にこのパターンが適用されます。
 受信リクエストによっては、例外的に他のパターンが適用されます。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

これは、キャッシュ内にあるものには「キャッシュのみ」の動作を適用し、キャッシュ内にないものには「ネットワークのみ」の動作を適用します（GET 以外のすべてのリクエストはキャッシュできないため、後者が適用されます）。



### キャッシュとネットワークの優劣 {: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

**最適なケース:** ディスク アクセスが低速な端末でパフォーマンスを追及する場合の小さなアセット。


古いハードドライブ、ウィルス スキャンソフト、高速インターネット接続を一緒に使用している場合、ネットワークからリソースを取得する方がディスクから取得するより速い場合があります。
 ただし、端末にコンテンツが存在するのにネットワークから取得すると、データの浪費につながるので注意してください。


    // Promise.race is no good to us because it rejects if
    // a promise rejects before fulfilling. Let's make a proper
    // race function:
    function promiseAny(promises) {
      return new Promise((resolve, reject) => {
        // make sure promises are all promises
        promises = promises.map(p => Promise.resolve(p));
        // resolve this promise as soon as one resolves
        promises.forEach(p => p.then(resolve));
        // reject if all promises reject
        promises.reduce((a, b) => a.catch(() => b))
          .catch(() => reject(Error("All failed")));
      });
    };

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        promiseAny([
          caches.match(event.request),
          fetch(event.request)
        ])
      );
    });


### ネットワークから取得できなければキャッシュから取得 {: #network-falling-back-to-cache }

<img src="images/ss-network-falling-back-to-cache.png">

**最適なケース:** サイトの「バージョン」外で頻繁に更新されるリソースが取得できなかった場合の応急策。
 たとえば、 記事、アバター、ソーシャル メディアのタイムライン、ゲームの得点ランキングなどです。


このパターンでは、オンラインのユーザーには最新のコンテンツを提供し、オフラインのユーザーにはキャッシュされた古いバージョンを提供することになります。
 ネットワーク リクエストが成功したら、ほとんどの場合は[キャッシュ エントリを更新](#on-network-response)します。


しかし、この方法には短所があります。 ユーザーのネットワーク接続が途切れがちだったり低速だったりする場合、ユーザーは、既に端末に存在する完全に利用可能なコンテンツを取得できるにもかかわらず、ネットワークからの取得が失敗するのを待たねばなりません。
 そのため、コンテンツの取得に非常に時間がかかり、ユーザーをイライラさせるおそれがあります。
 もっとよい解決策として、次に紹介する[先にキャッシュ、次にネットワーク](#cache-then-network)をご覧ください。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

### 先にキャッシュ、次にネットワーク {: #cache-then-network }

<img src="images/ss-cache-then-network.png">

**最適なケース:** 頻繁に更新されるコンテンツ。 たとえば、 記事、ソーシャル メディアのタイムライン、ゲームの得点ランキングなどです。


このパターンでは、ページで 2 つのリクエスト（キャッシュとネットワークに対してそれぞれ 1 つずつ）を生成する必要があります。
 つまり、まずはキャッシュされたデータを表示し、その後ネットワークから取得できたらページを更新します。


新しいデータを取得したときに現在のデータを置き換えるだけで済む場合もありますが（たとえば
 ゲームの得点ランキング）、コンテンツの大部分を置き換えると混乱を招くことがあります。
 基本的に、ユーザーが視聴中または操作中のデータが「消失」してしまわないようにしてください。


Twitter は古いコンテンツの上に新しいコンテンツを追加してスクロール位置を調整するので、ユーザーの邪魔をすることがありません。
 これが可能なのは、Twitter のコンテンツでは、ほぼリニアな順序が維持されているためです。
 [trained-to-thrill][ttt] では、このパターンをコピーして、コンテンツが画面に表示されるまでの時間をできる限り短縮する一方で、最新のコンテンツを取得できたらすぐに表示するようにしています。



**ページのコード:**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage(data);
    });

    // fetch cached data
    caches.match('/data.json').then(function(response) {
      if (!response) throw Error("No data");
      return response.json();
    }).then(function(data) {
      // don't overwrite newer network data
      if (!networkDataReceived) {
        updatePage(data);
      }
    }).catch(function() {
      // we didn't get cached data, the network is our last hope:
      return networkUpdate;
    }).catch(showErrorMessage).then(stopSpinner);


**Service Worker のコード:**

常にネットワークにアクセスし、そのたびにキャッシュを更新します。

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    });


[trained-to-thrill][ttt] では、この問題の回避策として、[fetch の代わりに XHR](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3) を使用するとともに、Service Worker に結果の取得元を知らせるため Accept ヘッダーを変則的に使用しました（[ページのコード](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70)、[Service Worker のコード](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61)）。





### 汎用的なフォールバック {: #generic-fallback }

<img src="images/ss-generic-fallback.png">

キャッシュやネットワークからリソースを提供できない場合、通常は汎用的なフォールバックを提供します。


**最適なケース:** アバターなどのセカンダリ画像、失敗した POST リクエスト、「このページはオフラインでは利用できません」というページ。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
          // Fall back to network
          return response || fetch(event.request);
        }).catch(function() {
          // If both fail, show a generic fallback:
          return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
      );
    });

フォールバックに使用するアイテムは、通常は[依存関係としてインストール](#on-install-as-dependency)されます。

ページでメールを送信している場合、Service Worker がフォールバックを行う際は IDB の送信トレイにメールを保存し、ページに応答して送信は失敗したがデータの保存には成功したことを知らせます。



### Service Worker 側のテンプレート {: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

**最適なケース:** サーバー レスポンスをキャッシュできなかったページ。

[サーバーでページをレンダリングすると高速になる](https://jakearchibald.com/2013/progressive-enhancement-is-faster/)とはいえ、これは、意味のない状態データがキャッシュに保存されることを意味します（例:
 「…としてログイン」）。 Service Worker でページが制御されている場合は、代わりに JSON データとテンプレートをリクエストしてレンダリングすることができます。



    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request.url);

      event.respondWith(
        Promise.all([
          caches.match('/article-template.html').then(function(response) {
            return response.text();
          }),
          caches.match(requestURL.path + '.json').then(function(response) {
            return response.json();
          })
        ]).then(function(responses) {
          var template = responses[0];
          var data = responses[1];

          return new Response(renderTemplate(template, data), {
            headers: {
              'Content-Type': 'text/html'
            }
          });
        })
      );
    });


## 複数の方法を組み合わせる

これまで紹介した方法のどれか 1 つを選択しなければならないということはありません。通常は、リクエスト URL に応じて複数の方法を使用することになります。
 たとえば、[trained-to-thrill][ttt] では以下を使用しています。


* [インストール時にキャッシュ](#on-install-as-dependency): 静的 UI と静的動作
* [ネットワークの応答時にキャッシュ](#on-network-response): Flickr の画像とデータ
* [キャッシュになければネットワークから取得](#cache-falling-back-to-network): ほとんどのリクエスト
* [先にキャッシュ、次にネットワーク](#cache-then-network): Flickr の検索結果

次のコードは、リクエストを確認して処理方法を決定します。

    self.addEventListener('fetch', function(event) {
      // Parse the URL:
      var requestURL = new URL(event.request.url);

      // Handle requests to a particular host specifically
      if (requestURL.hostname == 'api.example.com') {
        event.respondWith(/* some combination of patterns */);
        return;
      }
      // Routing for local URLs
      if (requestURL.origin == location.origin) {
        // Handle article URLs
        if (/^\/article\//.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/\.webp$/.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (request.method == 'POST') {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/cheese/.test(requestURL.pathname)) {
          event.respondWith(
            new Response("Flagrant cheese error", {
              status: 512
            })
          );
          return;
        }
      }

      // A sensible default pattern
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

以上で、処理パターンの全容をおわかりいただけたと思います。

## フィードバック {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

### 謝辞 {: hide-from-toc }
素敵なアイコンをありがとうございました。

* [コード](http://thenounproject.com/term/code/17547/){: .external } : buzzyrobot
* [カレンダー](http://thenounproject.com/term/calendar/4672/){: .external } : Scott Lewis
* [ネットワーク](http://thenounproject.com/term/network/12676/){: .external } : Ben Rizzo
* [SD](http://thenounproject.com/term/sd-card/6185/): Thomas Le Bas
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external } : iconsmind.com
* [ごみ箱](http://thenounproject.com/term/trash/20538/){: .external } : trasnik
* [通知](http://thenounproject.com/term/notification/32514/){: .external } : @daosme
* [レイアウト](http://thenounproject.com/term/layout/36872/){: .external } : Mister Pixel
* [クラウド](http://thenounproject.com/term/cloud/2788/){: .external } : P.J. Onori

公開前にたくさんの間違いを見つけてくれた [Jeff Posnick](https://twitter.com/jeffposnick) にも感謝します。


### 参考資料
* [Service Worker の紹介][sw_primer]
* [Is ServiceWorker ready?][is_sw_ready]: 主要なブラウザでの実装ステータスの追跡
* [JavaScript の Promise: 概要](/web/fundamentals/getting-started/primers/promises): Promise のガイド


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
