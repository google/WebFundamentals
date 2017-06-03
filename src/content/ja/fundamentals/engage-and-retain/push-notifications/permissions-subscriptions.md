project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 通知に対するパーミッションのリクエストやユーザーのサブスクライブは、通知を表示したときに 1 タップで手軽に実行できるようにする必要があります。

{# wf_updated_on:2016-06-30 #}
{# wf_published_on:2016-06-30 #}

# パーミッションのリクエストとユーザーのサブスクライブ {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

通知に対するパーミッションのリクエストやユーザーのサブスクライブは、通知を表示したときに 1 タップで手軽に実行できるようにする必要があります。

このセクション以降では、実際のコードを紹介します。これらの短いコードを実装する場所を明確に理解しておくことが重要です。ここでは、Service Worker についての理解が重要になります。パーミッションのリクエストとユーザーのサブスクライブのコードは、Service Worker のコードではなく、アプリのコードで実行されます。Service Worker は後ほど、プッシュ メッセージを処理してユーザーに表示する際に使用します。


##  パーミッションの確認 {: #check-permissions }

ページを読み込むときは必ず、既存のパーミッションを確認してください。パーミッションがすでに付与されている場合、すぐに通知の送信を開始できます。いずれの場合も、この情報をもとにパーミッションの状態を設定します。以下に例を示します。わかりやすくするため、まだ何もリクエストしません。


注: 簡潔にするため、この例では、本来実行すべき多くの機能チェックを省略しています。
完全な元のコードは、Google の
<a href='https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications'>
GitHub のサンプル リポジトリ</a>を参照してください。


    function initialiseState() {
      if (Notification.permission !== 'granted') {
        console.log('The user has not granted the notification permission.');
        return;
      } else if (Notification.permission === “blocked”) {
       /* the user has previously denied push. Can't reprompt. */
      } else {
        /* show a prompt to the user */
      }

      // Use serviceWorker.ready so this is only invoked
      // when the service worker is available.
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
          .then(function(subscription) {
            if (!subscription) {
              // Set appropriate app states.
              return;
            }
          })
          .catch(function(err) {
            console.log('Error during getSubscription()', err);
          });
      });
    }


##  ページの読み込み時のサブスクリプション リクエストを回避する {: #avoid-page-load-requests }

前の例では、`pushManager.subscribe()` を呼び出していない点に注意してください。これは、既存のサブスクリプションが見つからない場合には当然のレスポンスのように思えます。このようなリクエストはタイムリーに見えるかもしれませんが、ユーザーについてまだ何も把握しておらず、ユーザー側もこちらの情報を知らない可能性があるため、的確で有用なメッセージを送信するのは困難です。



##  パーミッションのリクエスト {: #requesting-permission }

<figure class="attempt-right">
  <img src="images/news-prompt.png" alt="通知の送信前に許可を求め、その目的を説明する">
</figure>

タイミングによらず、パーミッションをリクエストする処理は 2 つのプロセスから成ります。まずは、通知の送信目的を明確に説明したメッセージを使用して、アプリから通知を送信する許可を求めます。



ユーザーが同意したら、Push Manager からサブスクリプションを取得できます。取得するには、`PushManager.subscribe()` を呼び出します（以下の例で強調表示されている箇所）。この例では、`userVisibleOnly` を `true` に設定したオブジェクトを渡して、通知を常にユーザーに表示するようにブラウザに指定します。また、`applicationServerKey` も渡します。


<div style="clear:both;"></div>

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    <strong>return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });</strong>
  })
  .then(subscription => {
    // Do something with the subscription.
  })
  .catch(error => {
    // Do something with the error.
  });
}
</pre>

これは Chrome で実行した結果です。

![Chrome のパーミッション要求画面](images/news-permissions.png){:width="296px"}

### applicationServerKey とは {: #applicationserverkey }

`applicationServerKey` の値は、サーバーで生成する必要があります。サーバー側のすべての問題については、次のセクションで説明します。
ここではまず、`applicationServerKey` について把握する必要があります。 `subscribe()` 呼び出しでキーを渡すときは、[Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)（8 ビットの符号なし整数の配列）であることを確認してください。





##  特定のアクションをトリガーにする {: #trigger-from-action }

<figure class="attempt-right">
  <img src="images/airline-prompt.png" alt="特定のアクションによるプロンプト">
</figure>

特定の状況で実行されたアクションのレスポンスとして、通知を送信するパーミッションを求めます。
この方法では、通知をユーザーの目標と関連付けて、通知を送信する目的を明確に示すことができます。



たとえば、航空会社のサイトでフライトの遅延をユーザーに通知したい場合、目立つ場所にオプトイン チェックボックスを表示して、ユーザーがオプトインを選択した場合にのみ通知のパーミッションを求めます。



<div style="clear:both;"></div>

##  通知を管理する場所を提供する {: #manage-notifications }

ユーザーが容易にサイトの通知を変更したり、無効にできるようにしてください。そうすれば、ユーザーがブラウザや端末レベルで通知を無効にするのを防ぐことができます。


目立つ場所に、通知のスイッチを追加します。また、通知の実装方法ではなく、送信する内容がユーザーにわかるように、ラベルを付けます。
デベロッパーがソユーズ宇宙船の軌道調整方法を知らないように、ユーザーは「プッシュ通知」と表示されても何のことか分かりません。



<div class="attempt-left">
  <figure>
    <img src="images/flight-delay.png">
    <figcaption class="success">
      <b>推奨: </b> 以後表示する通知の内容を示す通知スイッチ。
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/send-push.png">
    <figcaption class="warning">
      <b>非推奨:</b> 通知の実装方法しか伝わらない通知スイッチ。
</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>


##  サーバーにサブスクリプションを渡す {: #passing-subscription }

通知を送信するパーミッションを取得し、関連するコントロールの状態を設定したら、サブスクリプション情報（仕様では「プッシュ リソース」と呼ばれる）をプッシュ サーバーに送信する必要があります。それには、サブスクリプション データを含む適切な request オブジェクトを作成してサーバーに渡します。



リクエストを作成する際は（以下の例で強調表示）、`POST` 動詞と `application/json` の `Content-Type` ヘッダーを使用します。
本文用に、subscription オブジェクトを文字列に変換する必要があります。
次のセクション、[メッセージの送信](sending-messages)で、このオブジェクトの中身を見ていきます。
`fetch()` を使用して、サーバーにサブスクリプション リクエストを送信します。


<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });
  })
  <strong>.then(subscription => {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(subscription)
    };
    return fetch('/your-web-server/api', fetchOptions);
  })</strong>
  .catch(error => {
    // Do something with the error.
  });
}
</pre>


{# wf_devsite_translation #}
