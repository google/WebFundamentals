project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: [Application] パネルを使用して、ウェブアプリ マニフェスト、Service Worker、Service Worker のキャッシュの調査、変更、およびデバッグを行うことができます。

{# wf_updated_on:2016-07-25 #}
{# wf_published_on:2016-07-25 #}

# Progressive Web App のデバッグ {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[<strong>Application</strong>] パネルを使用して、ウェブアプリ マニフェスト、Service Worker、Service Worker のキャッシュの調査、変更、およびデバッグを行うことができます。


関連ガイド: 

* [Progressive Web App](/web/progressive-web-apps)

このガイドでは、[**Application**] パネルの Progressive Web App 機能のみについて説明します。
その他のペインの使用方法については、このガイドの最後のセクション、[[Application] パネルに関するその他のガイド](#other)をご覧ください。




### TL;DR {: .hide-from-toc }
- ウェブアプリ マニフェストを調べ、ホーム画面への追加イベントをトリガーするには、[<strong>App Manifest</strong>] ペインを使用します。
- サービスの登録解除や更新、プッシュ イベントのエミュレート、オフライン操作、Service Worker の停止など、Service Worker に関連する広範なタスクには、[<strong>Service Worker</strong>] ペインを使用します。
- [<strong>Cache Storage</strong>] ペインには、Service Worker のキャッシュが表示されます。
- [<strong>Clear Storage</strong>] ペインでは、ボタンを 1 回クリックするだけで、Service Worker の登録を解除し、すべてのストレージとキャッシュを消去することができます。


##  ウェブアプリ マニフェスト{:#manifest}

ユーザーがモバイルのホーム画面にアプリを追加できるようにするには、ウェブアプリ マニフェストが必要です。
マニフェストは、ホーム画面でのアプリの表示、ホーム画面から起動したときのユーザーの送信先、起動時のアプリの外観を定義します。



関連ガイド:

* [ウェブアプリ マニフェストによるユーザー エクスペリエンスの向上](/web/fundamentals/engage-and-retain/web-app-manifest)
* [アプリのインストール バナーの使用](/web/fundamentals/engage-and-retain/app-install-banners)


マニフェストを設定したら、[**Application**] パネルの [**Manifest**] ペインを使用して調べることができます。


![[Manifest] ペイン][manifest]

* マニフェスト ソースを確認するには、[**App Manifest**] ラベルの下のリンク（上のスクリーンショットでは `https://airhorner.com/manifest.json`）をクリックします。
* ホーム画面への追加イベントをシミュレートするには、[**Add to homescreen**] ボタンをクリックします。
詳細については、次のセクションをご覧ください。
* [**Identity**] セクションと [**Presentation**] セクションには、マニフェスト ソースの項目がわかりやすく表示されます。
* [**Icons**] セクションには、指定したすべてのアイコンが表示されます。

[manifest]: images/manifest.png

###  ホーム画面への追加イベントのシミュレート{:#add-to-homescreen}

ウェブアプリをホーム画面に追加できるのは、サイトに少なくとも 2 回アクセスし、アクセスの間隔が 5 分以上である場合のみです。
ホーム画面への追加ワークフローを開発またはデバッグする際、この条件が不便な場合があります。[**App Manifest**] ペインの [**Add to homescreen**] ボタンを使用すると、必要に応じていつでもホーム画面への追加イベントをシミュレートできます。




ホーム画面への追加を正式にサポートしている [Google I/O 2016 Progressive Web App](https://events.google.com/io2016/){: .external } でこの機能をテストすることができます。アプリが開いているときに [**Add to homescreen**] をクリックすると、Chrome ではバナー「add this site to your shelf」が表示されます。これは、モバイル端末の「add to homescreen」バナーに相当するデスクトップ用のバナーです。



![デスクトップ シェルフへの追加][shelf]

**使い方**:ホーム画面への追加イベントをシミュレートしている間は [**Console**] ドロワーを開いたままにしておいてください。
コンソールでは、マニフェストに問題があった場合はそのことが示され、また、ホーム画面への追加のライフサイクルに関するその他の情報がログ記録されます。


[**Add to homescreen**] 機能は、モバイル端末でのワークフローのシミュレーションにはまだ対応していません。
DevTools が Device Mode であっても、上のスクリーンショットで「add to shelf」プロンプトがトリガーされている点に注意してください。
ただし、デスクトップ シェルフに問題なくアプリを追加できれば、モバイルでも動作します。



モバイル自体で操作をテストするには、[リモート デバッグ][remote
debugging]を使用して実際のモバイル端末を DevTools に接続し、（DevTools で）[**Add to homescreen**] ボタンをクリックして、接続したモバイル端末で「add to homescreen」プロンプトをトリガーします。



[shelf]: images/io.png
[remote debugging]: /web/tools/chrome-devtools/debug/remote-debugging/remote-debugging

##  Service Worker{:#service-workers}

Service Worker は、将来のウェブ プラットフォームの基礎となるテクノロジーです。これは、ウェブページとは別に、ブラウザがバックグラウンドで実行するスクリプトです。これらのスクリプトを使用すると、プッシュ通知、バックグラウンド同期、オフライン操作など、ウェブページやユーザーによる操作を必要としない機能にアクセスできます。




関連ガイド:

* [Service Worker の概要](/web/fundamentals/primers/service-worker)
* [プッシュ通知:タイムリー、有用、的確](/web/fundamentals/engage-and-retain/push-notifications)


[**Application**] パネルの [**Service Workers**] ペインは、DevTools で Service Worker の調査やデバッグを行う際の主要な場所です。


![[Service Workers] ペイン][sw]

* 現在開いているページに Service Worker がインストールされている場合、このペインに表示されます。
たとえば、上のスクリーンショットでは、`https://events.google.com/io2016/` のスコープについて Service Worker がインストールされています。

* [**Offline**] チェックボックスをオンにすると、DevTools はオフライン モードになります。これは、[**Network**] パネルや、[コマンド メニュー][cm]の [`Go offline`] オプションから使用できるオフライン モードと同じです。
* [**Update on reload**] チェックボックスをオンにすると、ページが読み込まれるたびに Service Worker が強制的に更新されます。
* [**Bypass for network**] チェックボックスをオンにすると、Service Worker がバイパスされ、ブラウザは、リクエストされたリソースのためにネットワークにアクセスするよう強制されます。
* [**Update**] ボタンを使用すると、指定した Service Worker の 1 回限りの更新が実行されます。
* [**Push**] ボタンを使用すると、ペイロードを含まないプッシュ通知（[通知][tickle]とも呼ばれる）がエミュレートされます。
* [**Sync**] ボタンを使用すると、バックグラウンド同期イベントがエミュレートされます。
* [**Unregister**] ボタンを使用すると、指定した Service Worker の登録が解除されます。1 回のボタンクリックするだけで、Service Worker の登録を解除し、ストレージとキャッシュを消去する方法については、[ストレージの消去](#clear-storage)をご覧ください。
* [**Source**] 行では、現在実行中の Service Worker がインストールされた日時を確認できます。
リンクは、Service Worker のソースファイルの名前です。リンクをクリックすると、Service Worker のソースに送信されます。
* [**Status**] 行では、Service Worker のステータスを確認できます。この行の数字（上のスクリーンショットでは `#1`）は、Service Worker が更新された回数を示します。
[**Update on reload**] チェックボックスをオンにした場合、ページが読み込まれるたびにこの数が増えます。
ステータスの横には、[**start**] ボタン（Service Worker が停止している場合）または [**stop**] ボタン（Service Worker が実行中の場合）が表示されます。Service Worker は、ブラウザによっていつでも停止および起動されるように設計されています。
Service Worker を [**stop**] ボタンを使用して明示的に停止すると、これをシミュレートできます。 Service Worker が再起動されたときにコードがどのように動作するかをテストするには、Service Worker を停止するのが最適な方法です。
これにより、永続的なグローバル状態についての前提が間違っているために発生するバグが明らかになることがよくあります。
* [**Clients**] 行では、Service Worker のスコープのオリジンを確認できます。
[**focus**] ボタンは主に、[**Show all**] チェックボックスをオンにしている場合に便利です。
このチェックボックスをオンにすると、登録されているすべての Service Worker が表示されます。
別のタブで実行されている Service Worker の横にある [**focus**] ボタンをクリックすると、そのタブにフォーカスが移動します。


Service Worker でエラーが発生すると、[**Errors**] という新しいラベルが表示されます。


![エラーが発生している Service Worker][errors]

[sw]: images/sw.png
[cm]: /web/tools/chrome-devtools/settings#command-menu
[tickle]: /web/fundamentals/engage-and-retain/push-notifications/sending-messages#ways-to-send
[errors]: images/sw-error.png

##  Service Worker のキャッシュ{:#caches}

[**Cache Storage**] ペインには、（Service Worker の）[Cache API][sw-cache] を使用してキャッシュされているリソースの読み取り専用のリストが表示されます。


![Service Worker のキャッシュ ペイン][sw-cache-pane]

はじめてキャッシュを開いてリソースを追加したときには、DevTools で変更が検出されないことがあります。
ページが再読み込みされるとキャッシュが表示されます。

キャッシュを 2 つ以上開いている場合は、[**Cache Storage**] ドロップダウンの下に表示されます。


![Service Worker の複数のキャッシュ][multiple-caches]

[sw-cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[sw-cache-pane]: images/sw-cache.png
[multiple-caches]: images/multiple-caches.png

##  ストレージの消去{:#clear-storage}

[**Clear Storage**] ペインは、Progressive Web App を開発する際に役立つ機能です。
このペインでは、ボタンを 1 回クリックするだけで、Service Worker の登録を解除し、すべてのキャッシュとストレージを消去することができます。
詳細については、次のセクションをご覧ください。


関連ガイド:

* [ストレージの消去](/web/tools/chrome-devtools/iterate/manage-data/local-storage#clear-storage)


##  [Application] パネルに関するその他のガイド{:#other}

[**Application**] パネルのその他のペインの詳細については、次のガイドをご覧ください。


関連ガイド:

* [ページリソースの調査](/web/tools/chrome-devtools/iterate/manage-data/page-resources)
* [ローカル ストレージおよびキャッシュの調査と管理](/web/tools/chrome-devtools/iterate/manage-data/local-storage)



{# wf_devsite_translation #}
