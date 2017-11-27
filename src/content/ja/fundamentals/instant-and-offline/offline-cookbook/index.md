project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on:2014-12-09 #}

# オフライン クックブック {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

AppCache が登場したとき、コンテンツをオフラインで動作させるためのパターンがいくつか提供されました。
これらが必要としていたパターンならとてもラッキーです。宝くじに当たったも同然です（当選者はまだ現れていませんが）。しかし、それ以外のほとんどの人は為す術もなく[右往左往](http://alistapart.com/article/application-cache-is-a-douchebag)していました。




[Service Worker][sw_primer] により、オフラインの解決をあきらめ、デベロッパー自身が解決できるようにするための作用可能な部分を提供しました。
Service Worker では、キャッシュや、リクエストの処理方法を制御できます。
つまり、独自のパターンを作成できるようになったのです。
考えられるいくつかのパターンを個別に見ていきましょう。ただし、実際には URL やコンテキストに応じて複数のパターンを組み合わせて使用することになると思います。



特に記載のない限り、すべてのコードサンプルは Chrome と Firefox で機能します。Service Worker のサポートの詳細については、[Is Service Worker Ready?][is_sw_ready] をご覧ください。


これらのいくつかのパターンの実際のデモについては、[Trained-to-thrill][ttt] と、そのパフォーマンスの影響がわかる[動画](https://www.youtube.com/watch?v=px-J9Ghvcx4)をご覧ください。



##  キャッシュ マシン - リソースを格納するタイミング

[Service Worker][sw_primer] では、リクエストとキャッシュは別々に処理されるため、これらの説明も個別に行います。
まず、キャッシュはどのタイミングで実行する必要がありますか。


###  インストール時 - 依存関係として{: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

Service Worker により `install` イベントが提供されます。これを使用して、他のイベントを処理する前にやっておくべき準備を行うことができます。
ここで注意が必要なのは、この時点ではまだ前のバージョンの Service Worker が実行中であり、ページを処理しているということです。



** 適しているケース:** CSS、画像、フォント、JS、テンプレートなど（基本的にサイトの特定の「バージョン」に対して静的なすべてのもの）。


これらのフェッチに失敗した場合、サイト全体が機能不全に陥ってしまう原因になります。ネイティブ アプリの初期ダウンロードに含まれるものと同じです。



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

`event.waitUntil` は Promise を受け取りインストールの長さと成功を定義します。Promise が棄却された場合、インストールは失敗したと見なされ、この Service Worker は放棄されます（古いバージョンが実行中の場合は影響を受けません）。`caches.open` と `cache.addAll` は Promise を返します。いずれかのリソースのフェッチに失敗すると、`cache.addAll` 呼び出しは棄却されます。


[trained-to-thrill][ttt] では、これを使用して[静的アセットをキャッシュしています](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3)。



###  インストール時 - 依存関係としてではなく{: #on-install-not }

<img src="images/cm-on-install-not.png">

上記に似ていますが、インストールの完了を遅延させず、キャッシュに失敗してもインストールは失敗しません。


** 適しているケース:** サイズが大きく、すぐには必要のないリソース（ゲームの後の方のレベルで使用されるアセットなど）。


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

levels 11-20 の `cache.addAll` Promise を `event.waitUntil` に渡していません。そのため、失敗してもゲームはオフラインで利用できます。これらのレベルが存在しない可能性を考慮し、存在しない場合はそれらのキャッシュを再試行することは必要になります。


levels 11-20 のダウンロード中に Service Worker が強制終了される場合もあります。これはイベント処理が完了し、キャッシュする必要がないためです。
今後、このようなケースや映画などの大容量のダウンロードに対応するために、バックグラウンドでダウンロードする API を追加する予定です。



###  アクティベート時{: #on-activate }

<img src="images/cm-on-activate.png">

** 適しているケース:** クリーンアップと移行。

新しい Service Worker がインストールされて、前のバージョンが使用されなくなると、新しい Service Worker がアクティベートされ、`activate` イベントが発生します。
古いバージョンが使用されなくなったので、このタイミングで IndexedDB のスキーマ移行の処理や不要なキャッシュの削除を行うとよいでしょう。



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

アクティベート中、`fetch` などの他のイベントはキューに入れられるため、アクティベートに時間がかかると、ページの読み込みがブロックされてしまう可能性があります。
アクティベートはできるだけ短時間で済ませ、古いバージョンがアクティブだったときに実行できなかった処理のみにアクティベーションを使用するようにしてください。



[trained-to-thrill][ttt] では、これを使用して[古いキャッシュを削除しています](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17)。


###  ユーザー操作時{: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

** 適しているケース:** サイト全体をオフラインで利用できない場合に、オフラインで利用したいコンテンツをユーザーが選択できるようにします。
たとえば、YouTube などでの動画、Wikipedia の記事、Flickr の特定のギャラリー。


ユーザーに「後で読む」ボタンや「オフライン用に保存」ボタンを提供します。ユーザーがボタンをクリックすると、ネットワークから必要なリソースがフェッチされ、キャッシュに保存されます。


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

[caches API][caches_api] は、ページと Service Worker から利用できます。つまり、キャッシュにリソースを追加するのに Service Worker を関与させる必要がありません。




###  ネットワークの応答時{: #on-network-response }

<img src="images/cm-on-network-response.png">

** 適しているケース:** ユーザーの受信トレイや記事コンテンツなど、頻繁にアップデートされるリソース。
また、注意が必要ではありますが、アバターなどの必須でないコンテンツ。


キャッシュ内にリクエストに一致するものがない場合は、ネットワークから取得してページに送信し、同時にキャッシュにも追加します。


アバターなど、広範囲の URL に対してこれを実行する場合は、オリジンのストレージを肥大化させないよう注意が必要です。ユーザーがディスク領域を回収する必要があるときに、自分が第一候補にはなりたくありません。キャッシュ内の不要になったアイテムは削除するようにしてください。


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

メモリを効率的に使用するために、response と request の本文は 1 回しか読み出すことができません。
上記のコードでは、[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone) を使用して、個別に読み出すことができる追加のコピーを作成しています。



[trained-to-thrill][ttt] では、これを使用して [Flickr 画像をキャッシュしています](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109)。


###  stale-while-revalidate{: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

** 適しているケース:** 頻繁にアップデートされるが、必ずしも最新のバージョンである必要がないリソース。
アバターはこのカテゴリに該当します。

キャッシュされたバージョンが利用可能な場合はこれを使用しますが、次回に備えてアップデートをフェッチします。


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

これは HTTP の [stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale) に非常に似ています。


###  プッシュ メッセージ時{: #on-push-message }

<img src="images/cm-on-push.png">

[Push API](/web/fundamentals/push-notifications) は、Service Worker をベースに構築された別の機能です。OS のメッセージング サービスからのメッセージに応答して Service Worker を起動できます。このときユーザーがサイトのタブを開いていない場合でも、Service Worker のみが起動されます。
ページからこれを実行するパーミッションをリクエストして、ユーザーにプロンプトを表示します。


** 適しているケース:** チャット メッセージ、ニュース速報、メールなど、通知に関連するコンテンツ。
また、頻繁に変更されるわけではないが即座に同期することに意味があるコンテンツ（TODO リストのアップデートやカレンダーの変更など）。



<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

通常、通知をタップすると、関連するページが開いたり、フォーカスされたりしますが、その前にキャッシュをアップデートしておくことが非常に重要です。ユーザーがプッシュ メッセージを受信するときは当然オンラインですが、その通知を最終的に操作するときはオンラインであるとは限りません。そのため、このコンテンツをオフラインで利用できるようにすることが重要です。Twitter のネイティブ アプリはそのほとんどがオフライン ファーストの代表的な例ですが、少し違う部分があります。



ネットワーク接続がない場合、Twitter はプッシュ メッセージに関連するコンテンツを提供できません。
しかも、メッセージをタップすると通知がなくなります。ユーザーが得られる情報はタップ前よりも少なくなってしまいます。
このようにならないようにしてください。

<div style="clear:both;"></div>

以下のコードは、キャッシュをアップデートしてから通知を表示します。

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
              body: "From " + emails[0].from.name
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


###  バックグラウンド同期時{: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

試験運用:バックグラウンド同期は Chrome ではまだ安定的にサポートされていません。

[バックグラウンド同期](/web/updates/2015/12/background-sync)は、Service Worker をベースに構築された別の機能です。これにより、バックグラウンド データの同期を 1 回限りまたは（非常にヒューリスティックな）間隔でリクエストできます。このときユーザーがサイトのタブを開いていない場合でも、Service Worker のみが起動されます。ページからこれを実行するパーミッションをリクエストして、ユーザーにプロンプトを表示します。


** 適しているケース:** 急を要さないアップデート。特に、ソーシャル メディアのタイムラインやニュース記事など、定期的にアップデートされるものは、そのたびにプッシュ メッセージが発生すると頻繁が高すぎます。



    self.addEventListener('sync', function(event) {
      if (event.id == 'update-leaderboard') {
        event.waitUntil(
          caches.open('mygame-dynamic').then(function(cache) {
            return cache.add('/leaderboard.json');
          })
        );
      }
    });


##  キャッシュの永続性{: #cache-persistence }

オリジンには、操作を実行するための一定の空き領域が確保されています。この空き領域はすべてのオリジン ストレージ間で共有されます
（LocalStorage、IndexedDB、Filesystem、キャッシュ）。


与えられる領域は指定されておらず、端末やストレージの状況によって異なります。
与えられている領域を確認するには次のようにします。

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

ただし、すべてのブラウザ ストレージのように、ブラウザは端末のストレージが不足してきたときにこれを強制的にスローできます。
残念ながら、これらの動画はどうしても残したい、このゲームは削除されてもかまわないといった違いをブラウザは判断できません。



これを回避するために、API [`requestPersistent`](https://storage.spec.whatwg.org/){: .external } が用意されています。


    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

もちろん、ユーザーはパーミッションを付与する必要があります。ユーザーをこのフローに組み込むことが重要です。そうすることで、削除の可否をユーザーに委ねることができます。端末の容量が不足してきたときに不必要なデータを削除しても解決しない場合は、どのアイテムを残すか削除するかをユーザーが決定します。





この機能のためにオペレーティング システム側で必要となるのは、ストレージ使用状況の内訳において、ブラウザを単一アイテムとして報告するのではなく、ネイティブ アプリと同等の「永続性のある」オリジンとして扱うことです。




##  提案の提供 - リクエストへの応答{: #serving-suggestions }

どれだけキャッシュしても、それらのキャッシュをいつ、どのように使用するかを Service Worker に指示しないとキャッシュが使用されることはありません。
ここではリクエスト処理に関するいくつかのパターンを示します。


###  キャッシュのみ{: #cache-only }

<img src="images/ss-cache-only.png">

** 適しているケース:** サイトの特定の「バージョン」に対して静的なものすべて。これらは install イベントでキャッシュされているため、存在するものとして当てにすることができます。



    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

このケースの処理が必要なことはあまりありませんが、[キャッシュになければネットワークから取得](#cache-falling-back-to-network)で説明します。


###  ネットワークのみ{: #network-only }

<img src="images/ss-network-only.png">

** 適しているケース:** analytics ping、GET 以外のリクエストなど、オフラインに相当しないもの。


    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

このケースの処理が必要なことはあまりありませんが、[キャッシュになければネットワークから取得](#cache-falling-back-to-network)で説明します。


###  キャッシュになければネットワークから取得{: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

** 適しているケース:** オフライン ファーストの場合、ほとんどのリクエストの処理方法にこのパターンが適用されます。
受信リクエストが例外的な場合は、他のパターンが適用されます。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

これは、キャッシュに見つかる場合は「キャッシュのみ」の動作を適用し、キャッシュに見つからない場合は「ネットワークのみ」の動作を適用します（GET 以外のすべてのリクエストはキャッシュに含まれないため、キャッシュできません）。



###  キャッシュとネットワークの競争{: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

** 適しているケース:** ディスク アクセスが低速な端末でパフォーマンスを追及している場合の小さいアセット。


古いハードドライブ、ウィルス スキャン、高速インターネット接続の組み合わせにより、ネットワークからリソースを取得する方がディスクから取得するよりも速い場合があります。ただし、端末にコンテンツが存在する場合にネットワークから取得するのは、データの浪費につながることに留意してください。


    // Promise.race is no good to us because it rejects if
    // a promise rejects before fulfilling.Let's make a proper
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


###  ネットワークから取得できなければキャッシュから取得{: #network-falling-back-to-cache }

<img src="images/ss-network-falling-back-to-cache.png">

** 適しているケース:** サイトの「バージョン」外で頻繁にアップデートされるリソースが取得できなかった場合の応急策
（記事、アバター、ソーシャル メディアのタイムライン、ゲームのリーダーボードなど）。


これは、オンラインのユーザーには最新のコンテンツを提供し、オフラインのユーザーにはキャッシュされた古いバージョンを提供することになります。ネットワーク リクエストが成功した場合は、おそらく[キャッシュ エントリをアップデート](#on-network-response)します。


ただし、この方法には問題があります。ユーザーのネットワーク接続が途切れがちまたは低速である場合は、ネットワークからの取得が失敗するのを待ってから、既に端末に存在する表示可能なコンテンツを取得する必要があります。そのため、非常に時間がかかり、ユーザーがイライラしてしまいます。これをうまく解決するには、次のパターンの[先にキャッシュ、次にネットワーク](#cache-then-network)をご覧ください。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

###  先にキャッシュ、次にネットワーク{: #cache-then-network }

<img src="images/ss-cache-then-network.png">

** 適しているケース:** 頻繁にアップデートされるコンテンツ（記事、ソーシャル メディアのタイムライン、ゲームのリーダーボードなど）。


この場合、ページは、1 つはキャッシュに対して、もう 1 つはネットワークに対してと、2 つのリクエストを生成することが必要です。
つまり、まずはキャッシュされたデータを表示してから、ネットワークから取得できた場合はそのページをアップデートするということです。


新しいデータを取得したら現在のデータを置き換えられる場合もありますが（ゲームのリーダーボードなど）、コンテンツの大きい部分の置き換えは混乱を招くことがあります。基本的にユーザーが視聴中や操作中のコンテンツは「消去」しないでください。


Twitter は古いコンテンツの上に新しいコンテンツを追加し、スクロール位置を調整するため、ユーザーの邪魔をすることがありません。
これは、Twitter のコンテンツはほとんどリニアなデータ構造で順番が維持されているからです。
[trained-to-thrill][ttt] ではこのパターンをコピーして、コンテンツが画面に表示されるまでの時間を短くし、新着のコンテンツを表示するようにしています。



** ページのコード:**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage();
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


** Service Worker のコード:**

常にネットワークから取得して、キャッシュをアップデートしています。

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

注: `fetch` と `caches` はまだページに公開していないため（[チケット #1](https://code.google.com/p/chromium/issues/detail?id=436770)、[チケット #2](https://code.google.com/p/chromium/issues/detail?id=439389)）、上記は Chrome ではまだ機能しません。

これに対処するために [trained-to-thrill][ttt] では、[fetch の代わりに XHR](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3) を使用しました。また、Service Worker に結果の取得元を伝えるために Accept ヘッダーを不正に利用しています（[ページのコード](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70)、[Service Worker のコード](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61)）。





###  汎用のフォールバック{: #generic-fallback }

<img src="images/ss-generic-fallback.png">

キャッシュやネットワークからリソースの提供に失敗した場合は、汎用のフォールバックを提供するようにします。


** 適しているケース:** セカンダリ画像（アバター、POST リクエストの失敗、「このページはオフラインでは利用できません」といったページなど）。


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

フォールバックするアイテムは、[依存関係としてインストール](#on-install-as-dependency)されている必要があります。

ページがメールを送信している場合は、Service Worker はフォールバックして IndexedDB の送信ボックスにメールを保存し、送信は失敗したものの、データは保存されていることをページでわかるように応答します。



###  Service Worker 側のテンプレート{: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

** 適しているケース:** サーバー レスポンスをキャッシュできなかったページ。

[サーバーでページをレンダリングすると高速ではあります](https://jakearchibald.com/2013/progressive-enhancement-is-faster/)が、これは、キャッシュに存在していても意味のない状態データが含まれてしまうことを意味しています（例: 「... としてログイン」）。Service Worker でページが制御される場合は、代わりに JSON データとテンプレートをリクエストしてレンダリングします。



    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request);

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


##  まとめ

ここで紹介した方法のどれかを選択しなければならないわけではありません。リクエスト URL に応じてこのうちの複数を使用することになるでしょう。
たとえば、[trained-to-thrill][ttt] では以下を使用しています。


* [インストール時にキャッシュ](#on-install-as-dependency)、静的 UI と動作
* [ネットワークの応答時にキャッシュ](#on-network-response)、Flickr 画像とデータ
* [キャッシュになければネットワークからフェッチ](#cache-falling-back-to-network)、ほとんどのリクエスト
* [キャッシュからフェッチしてさらにネットワークからフェチ](#cache-then-network)、Flickr 検索結果

リクエストを確認して処理内容を決定します。

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

全体像を把握できたと思います。


###  謝辞{: hide-from-toc }
すばらしいアイコンをありがとうございました。

* [Code](http://thenounproject.com/term/code/17547/){: .external }: buzzyrobot
* [Calendar](http://thenounproject.com/term/calendar/4672/){: .external }: Scott Lewis
* [Network](http://thenounproject.com/term/network/12676/){: .external }: Ben Rizzo
* [SD](http://thenounproject.com/term/sd-card/6185/): Thomas Le Bas
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external }: iconsmind.com
* [Trash](http://thenounproject.com/term/trash/20538/){: .external }: trasnik
* [Notification](http://thenounproject.com/term/notification/32514/){: .external }: @daosme
* [Layout](http://thenounproject.com/term/layout/36872/){: .external }: Mister Pixel
* [Cloud](http://thenounproject.com/term/cloud/2788/){: .external }: P.J. Onori

そして校正を手伝ってくれた [Jeff Posnick](https://twitter.com/jeffposnick) にも感謝の意を述べたいと思います。


### 参考資料
* [ServiceWorkers: 概要][sw_primer]
* [Is ServiceWorker ready?][is_sw_ready] - 主要なブラウザでの実装ステータスの追跡
* [JavaScript の Promise: 概要](/web/fundamentals/getting-started/primers/promises) - Promise のガイド


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache


{# wf_devsite_translation #}
