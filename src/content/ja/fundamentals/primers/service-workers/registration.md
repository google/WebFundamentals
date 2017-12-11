project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Service Worker 登録のタイミングのベスト プラクティス

{# wf_updated_on:2016-11-28 #}
{# wf_published_on:2016-11-28 #}

# Service Worker 登録 {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

[Service Worker](/web/fundamentals/getting-started/primers/service-workers)
は、ウェブアプリへの再アクセスを高速化できますが、Service Worker の初回インストールによってユーザーの最初のアクセス エクスペリエンスが低下しないように措置を講じる必要があります。




通常、最初のページが読み込まれるまで Service Worker [登録](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)を延期すると、ユーザー（特に、ネットワーク接続が遅いモバイル端末のユーザー）は最適なエクスペリエンスが得られます。




##  一般的なボイラプレート コード

Service Worker の詳細を読んだことがある場合は、次のようなボイラプレートを見たことがあるでしょう。


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

これに `console.log()` 文や、前回の Service Worker 登録のアップデートを検出する[コード](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20)が含まれる場合があり、これらはページを更新するようユーザーに知らせる手段として使用されます。ただし、標準のいくつかのコード行が少し異なるだけです。


では、`navigator.serviceWorker.register` に微妙な違いはあるでしょうか。従うべきベスト プラクティスはあるでしょうか。
驚くことではありませんが（この記事がここですぐに終わらない限り）、答えは両方とも「はい」です。


##  ユーザーの最初のアクセス

ユーザーがウェブアプリにはじめてアクセスする場合を考察してみましょう。Service Worker はまだ存在せず、ブラウザは、最終的にインストールされる Service Worker があるかどうかを事前に把握できません。



デベロッパーの優先順位は、ブラウザがインタラクティブなページの表示に最小限必要なクリティカル リソースを迅速に取得できるようにすることです。レスポンスの取得を遅らせるものは、迅速なインタラクティブ エクスペリエンスの敵です。


ここで、JavaScript またはページでレンダリングする必要がある画像をダウンロードするプロセスで、ブラウザがバックグラウンド スレッドまたはプロセス（簡略化のためにスレッドを想定します）の開始を決定するとします。あなたは強力なパソコンではなく、世界の大部分で主要端末と見なされている能力の低いスマートフォンを使用しています。このスレッドを開始すると、ブラウザがインタラクティブなウェブページのレンダリングに費やす可能性がある CPU 時間やメモリの競合が発生します。



アイドル状態のバックグラウンド スレッドが大きな変化をもたらす可能性はあまりありません。ただし、スレッドがアイドル状態ではなく、ネットワークからリソースのダウンロードを開始する場合はどうでしょう。CPU やメモリの競合に関する懸念よりも、多くのモバイル端末が利用できる帯域幅の制限に関する懸念を優先すべきです。帯域幅は貴重であるため、同時にセカンダリ リソースをダウンロードすることでクリティカル リソースを浪費しないでください。


新しい Service Worker スレッドを開始してリソースのダウンロードとキャッシュをバックグラウンドで実行すると、ユーザーがはじめてサイトにアクセスしたときの迅速なインタラクティブ エクスペリエンスを提供するという目標に逆行することになります。




##  ボイラプレートの改善

解決策として、`navigator.serviceWorker.register()` を呼び出すタイミングを選択することで Service Worker の起動を制御します。単純な経験則では、次のように <code>[load イベント](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)</code> が <code>window</code> で発生するまで登録を遅らせます。

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

ただし、Service Worker 登録を開始する適切な時間は、ウェブアプリが読み込みの直後に実行する内容にもよります。たとえば、[Google I/O
2016 ウェブアプリ](https://events.google.com/io2016/)は、メイン画面に遷移する前に短いアニメーションを表示します。チームは、(/web/showcase/2016/iowa2016) では、アニメーションの表示中に Service Worker 登録を開始すると、ローエンドのモバイル端末でアニメーションの品質が低下する場合があることがわかりました。ユーザーに不快感を与えるのではなく、ブラウザが数秒間アイドル状態になる可能性が高い場合に、アニメーションが終わるまで Service Worker 登録を[遅らせました](https://github.com/GoogleChrome/ioweb2016/blob/8cfa27261f9d07fe8a5bb7d228bd3f35dfc9a91e/app/scripts/helper/elements.js#L42)。



同様に、ウェブアプリでページの読み込み後に追加のセットアップを実行するフレームワークが使用されている場合は、その作業が終わったときに通知するフレームワーク固有のイベントを探してください。



##  2 回目以降のアクセス

これまでは最初のアクセス エクスペリエンスについて重点的に説明しましたが、Service Worker 登録を遅らせることでサイトへの再アクセスにどのような影響があるでしょうか。驚かれるかもしれませんが、影響はまったくありません。



Service Worker は登録されると、`install` および `activate` [ライフサイクル イベント](/web/fundamentals/instant-and-offline/service-worker/lifecycle)を通過します。アクティベートされると、Service Worker はウェブアプリへのその後のアクセスの `fetch` イベントを処理できるようになります。Service Worker は、そのスコープ内のページに対するリクエストが行われる前に起動しますが、これは、それについて考慮する場合に意味をなします。既存の Service Worker がページへのアクセスの前に実行されていない場合は、ナビゲーション リクエストの `fetch` イベントを処理できません。



アクティブな Service Worker がある場合は、`navigator.serviceWorker.register()` をいつ呼び出しても、実際には呼び出すかどうかも問題にはなりません。Service Worker スクリプトの URL を変更しない限り、`navigator.serviceWorker.register()` は 2 回目以降のアクセス中は効果的に[何もしません](https://en.wikipedia.org/wiki/NOP)。呼び出されるタイミングは影響しません。


##  早く登録する理由

Service Worker をできるだけ早く登録することに意味はあるでしょうか。思い浮かぶシナリオは、Service Worker で <code>[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)</code> を使用して初回アクセス時のページを制御し、その  <code>fetch</code> ハンドラの内部で[ランタイム キャッシュ](/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response)を積極的に実行する場合です。この場合は、Service Worker をできるだけ早くアクティブにして、後で取得する可能性があるリソースをランタイム キャッシュに移入するとメリットがあります。ウェブアプリがこのカテゴリに属する場合は、一歩離れて、Service Worker の  <code>install</code> ハンドラがメインページのリクエストと帯域幅を取り合うリソースを要求していないことを確認することをお勧めします。




##  テスト

最初のアクセスをシミュレートするのに適した方法は、ウェブアプリを [Chrome のシークレット ウィンドウ](https://support.google.com/chromebook/answer/95464?co=GENIE.Platform%3DDesktop)で開き、[Chrome の DevTools](/web/tools/chrome-devtools/) でネットワーク トラフィックを確認することです。ウェブ デベロッパーは、ウェブアプリのローカル インスタンスを 1 日に何十回も再読み込みします。ただし、既に Service Worker が存在し、キャッシュが十分に入力されている場合にサイトに再アクセスすると、新しいユーザーと同じエクスペリエンスが得られず、発生するおそれのある問題を簡単に無視してしまいます。



登録のタイミングによって生じる可能性がある違いを次の例に示します。
両方のスクリーンショットは、低速の接続をシミュレートするためにネットワーク スロットリングを使用して、シークレット モードで[サンプルアプリ](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo)にアクセスしている間に撮影されたものです。



![登録が早い場合のネットワーク トラフィック](../images/early-registration.png
"Network traffic with early registration.")

上のスクリーンショットには、Sercie Worker 登録をできるだけ早く実行するようにサンプルが変更された場合のネットワーク トラフィックが反映されています。
ページの表示に必要な他のリソースに対するリクエストとプリキャッシュ リクエスト（Service Worker の `install` ハンドラから開始された、横に[歯車アイコン](http://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools/33655173#33655173)が付いているエントリ）が混在しているのがわかります。





![登録が遅い場合のネットワーク トラフィック](../images/late-registration.png
"Network traffic with late registration.")


上のスクリーンショットでは、ページの読み込みが終わるまで Service Worker 登録が遅延されています。
帯域幅の競合を回避して、すべてのリソースがネットワークから取得されるまでプリキャッシュ リクエストが始まらないことがわかります。さらに、プリキャッシュするアイテムの一部（[Size] 列で `(from disk cache)` のアイテム）は既にブラウザの HTTP キャッシュにあるため、ネットワークに再アクセスしなくても Service Worker のキャッシュに移入できます。




このようなテストを現実のモバイル ネットワーク上にある実際のローエンド端末から実行すると、ボーナス点が得られます。
Chrome の[リモート デバッグ機能](/web/tools/chrome-devtools/remote-debugging/)を利用して、Android スマートフォンを USB でパソコンに接続し、実行しているテストに多くのユーザーの現実のエクスペリエンスが実際に反映されるようにすることができます。





## まとめ

まとめると、ユーザーの最初のアクセス エクスペリエンスを最適にすることが最優先事項です。最初のアクセス時のページ読み込みが終わるまで Service Worker 登録を遅らせることで、これを実現できます。再アクセス時にも、Service Worker のすべてのメリットを享受できます。

Service Worker の初回登録を最初のページの読み込みが終わるまで遅らせる最も簡単な方法は、次のコードを使用することです。


    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }


{# wf_devsite_translation #}
