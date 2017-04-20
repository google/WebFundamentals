project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ここまでは、適切に通知する方法について説明してきました。続いて、その実装方法に進みます。

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# メッセージの処理 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/cc-good.png" alt="通知の例">
</figure>

[このセクションの冒頭](#anatomy)で、この画像のような通知とそのコードを紹介しました。


このコードの書き方について少し説明しましたが、実際に使うにはまだ情報が不足しています。
そこで、このセクションで補足します。

<div style="clear:both;"></div>

##  あらためて、Service Worker とは

Service Worker についてあらためて説明します。メッセージの処理には、Service Worker 専用のコードが必要です。背景情報を知りたい方は、[概要](/web/fundamentals/getting-started/primers/service-workers)をもう一度ご確認ください。DevTools を使用した [Service Worker のデバッグ](/web/tools/chrome-devtools/debug/progressive-web-apps/#service-workers)について、便利な手順も記載しています。



##  通知の仕組みの詳細 {: #more-anatomy }

サーバーから通知を受信すると、Service Worker は push イベントを使用して、通知をインターセプトします。
以下は、その基本的な仕組みです。


    self.addEventListener('push', event => {
      event.waitUntil(
        // Process the event and display a notification.
      );
    });


`waitUntil()` 内のどこかで、Service Worker の registration オブジェクトの `showNotification()` を呼び出します。



    self.registration.showNotification(title, {
        body:'Are you free tonight?',
        icon: 'images/joe.png',
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: 'request',
        actions: [
          { action: 'yes', title: 'Yes!', icon: 'images/thumb-up.png' },
          { action: 'no', title: 'No', icon: 'images/thumb-down.png' }
        ]
      })


技術的には、`showNotification()` の必須パラメータは title のみですが、実用上は少なくとも body と icon を含める必要があります。
ご存知のとおり、通知には非常に多くのオプションがあります。
[MDN でオプション一覧](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)をご覧ください。


最後に、`notificationclick` メソッドと `notificationclose` メソッドを使用してユーザーのレスポンスを処理します。



    self.addEventListener('notificationclick', event => {  
      // Do something with the event  
      event.notification.close();  
    });

    self.addEventListener('notificationclose', event => {  
      // Do something with the event  
    });


あとは、この基本的な考え方に沿って作り込むだけです。

##  通知を非表示にする {: #choosing-not-to-show }

プッシュ メッセージを受信したときに、通知を表示する必要がない場合もあります。
たとえば、すでにアプリが開いており、プッシュ通知のコンテンツがすでにユーザーに表示されている場合が考えられます。


幸い、Service Worker にはアプリが開いているかどうかをチェックする方法があります。Service Worker は、[`clients`](https://developer.mozilla.org/en-US/docs/Web/API/Clients) というインターフェースをサポートしています。これにより、すべてのアクティブ クライアントのリストを現在の Service Worker で制御できます。クライアントがアクティブかどうかを確認するには、`clients.length` を呼び出します。
このプロパティが `0` を返したら、通知を表示します。
それ以外の場合は、他の処理を実行します。

<pre class="prettyprint">
self.addEventListener('push', event => {
  const promiseChain = clients.matchAll()
  .then(clients => {
    <strong>let mustShowNotification = true;
    if (clients.length > 0) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].visibilityState === 'visible') {
          mustShowNotification = false;
          return;
        }
      }
    }

    if (mustShowNotification) {
      // Show the notification.
      event.waitUntil(
        self.registration.showNotification('Push notification')
      );
    } else {
      // Send a message to the page to update the UI.
      console.log('The application is already open.');
    }</strong>
  });

  event.waitUntil(promiseChain);
});
</pre>

##  メッセージのコンテンツの準備 {: #preparing-messages }

以前に説明したように、サーバーは 2 種類のメッセージを送信します。

* データ ペイロードを含むメッセージ。
* データ ペイロードを含まないメッセージ。多くの場合、通知と呼ばれます。

push ハンドラでこの両方に対応しなければなりません。ペイロードを含まないメッセージの場合、ユーザーにデータが利用可能であることを伝える前にデータを取得し、優れたユーザー エクスペリエンスを提供する必要があります。



まずは、`event.waitUntil()` を呼び出す基本的な push イベント ハンドラから説明します。
このメソッドは、Promise または Promise の解決を受け取ります。
また、特定のタスクが完了するまで `push` イベントの有効期間を延長します。
次に示すように、通知を表示するまで `push` イベントを保持します。


    self.addEventListener('push', event => {
      const promiseChain = someFunction();
      event.waitUntil(promiseChain);
    });

次に、event オブジェクト内にデータがあれば取得します。

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>
  let data = null;
  if (event.data) {
    // We have data - lets use it
    data = event.data.json();
  }</strong>
  let promiseChain = someFunction(data);
  event.waitUntil(promiseChain);
});
</pre>


オブジェクト内にデータがなければ、`fetch()` を呼び出してサーバーから取得します。それ以外の場合は、単にデータを返します。


<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      // Now we have data we can show a notification.
    });
  event.waitUntil(promiseChain);
});
</pre>

いずれにせよ、最終的に JSON オブジェクトを取得します。ここでついに、ユーザーに通知を表示します。


<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      return self.registration.showNotification(data.title, {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/icon-192x192.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: data.tag
      });
    });
  event.waitUntil(promiseChain);
});
</pre>

##  同様の通知をまとめる {: #combine-similar-notes }

<figure class="attempt-right">
  <img src="images/combined-notes-mobile.png" alt="同じ送信者からのメッセージをまとめる">
</figure>

複数の通知を 1 つの通知にまとめると有用な場合があります。たとえばソーシャル ネットワーク アプリで、特定のユーザーが投稿するたびに通知するのではなく、まとめて通知したほうがよい場合があります。



同様の通知をまとめるには多くの要素を変更する必要がありますが、次のステップで作り込むことをお勧めします。


1. `push` イベント ハンドラでメッセージを受け取ります。
2. `self.registration.getNotifications()` を呼び出して統合する通知が存在するかを確認します。
これは通常、通知のタグをチェックする方法で確認します。
3. 最後に、`self.registration.showNotification()` を呼び出して新しい通知を表示し、必ずオプションで renotify パラメータを true に設定します（以下の例をご覧ください）。




別の例で、この処理を確認してみましょう。前のセクションで説明したメッセージのデータを既に受信または取得していると仮定します。そのデータの処理方法を見てみましょう。

まずは、基本的な push イベント ハンドラを使用します。`waitUntil()` メソッドで、通知データを解決する Promise が返されます。



    self.addEventListener('push', function(event) {
      const promiseChain = getData(event.data)
      .then(data => {
        // Do something with the data
      });
      event.waitUntil(promiseChain);
    });


メッセージ データを取得したら、`data.tag` を使用して `getNotifications()` を呼び出します。

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag});
  })
  .then(notifications => {
    //Do something with the notifications.
  })</strong>;
  event.waitUntil(promiseChain);
});
</pre>

他の例では、`showNotification()` の呼び出し時に `options` オブジェクトをインスタンス化しました。
今回は、`getNotifications()` の結果に基づいて `options` オブジェクトを変更する必要があります。そこで、通知の `options` オブジェクトをインスタンス化します。



通知の options にも通知のデータを付加している点に注意してください。
これは、`notificationclick` でも使用できるようにするためです。詳しくはこの後のセクションで説明します。
ブラウザに通知を統合したことを知らせるには、`tag` を再利用して、`renotify` を `true` に設定します。
以下のコードで、どちらもハイライト表示されています。

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        <strong>noteOptions.renotify = true;</strong>
        // Configure other options for combined notifications.
      }
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

新しい通知の残りのプロパティを設定する際に、2 つのアクション ボタンを通知に追加します。
1 つはアプリを開きます。もう 1 つは、何もアクションを実行せずに通知を閉じます。どちらのアクションも push イベントでは処理されません。詳しくは次のセクションで説明します。
最後に、通知を表示します（26 行目）。

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        data.title = "Flight Updates";
        noteOptions.body = "There are several updates regarding your flight, 5212 to Kansas City.";
        noteOptions.renotify = true;
        <strong>noteOptions.actions = [
          {action: 'view', title: 'View updates'},
          {action: 'notNow', title: 'Not now'}
        ];
      }

      return self.registration.showNotification(data.title, noteOptions);
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

##  通知にアクションを追加する {: #notification-actions }

ここまで、アクションが組み込まれた通知の例を取り上げました。次に、その実装方法とアクションに応答する方法を見てみましょう。


`showNotification()` では、オプションの actions を 1 つ以上設定した options 引数を取ることを思い出してください。



    ServiceWorkerRegistration.showNotification(title, {  
      body: data.body,  
      icon: (data.icon ? data.icon : '/images/i_face_black_24dp_2x.png'),  
      vibrate: [200, 100, 200, 100, 200, 100, 400],  
      tag: data.tag,  
      actions: [  
        {action: 'change', title: 'Ask for reschedule'},  
        {action: 'confirm', title: 'Confirm'}  
      ],  
      data: data  
    })

<figure class="attempt-right">
  <img src="images/confirmation.png" alt="アクション付きの通知">
</figure>

この通知では、Stacy さんが午後 3 時の約束を確認したことを伝えます。
受信者は、確認した旨を伝えるか、約束のスケジュールの変更をリクエストします。
前者の場合、サーバーに直接メッセージが送信されます。
後者の場合、アプリを開いて適切なインターフェースを表示します。


<div style="clear:both;"></div>

まず、Service Worker に `notificationclick` イベント ハンドラを追加します。さらに、通知を閉じます。



    self.addEventListener('notificationclick', function(event) {  
      event.notification.close();  
      // Process the user action.  
    });


次に、通知がクリックされた場所を特定するためにいくつかロジックが必要になります。ユーザーが [Confirm] または [Ask for Reschedule] をクリックしたか、あるいはどちらもクリックしなかったかを特定します。


<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm') {
    // Send the confirmation to the server.
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }</strong>
});
</pre>

ユーザーが [Confirm] をクリックした場合は、アプリを開かずにそのままサーバーに送信します（3～13 行目）。
サーバーに確認を送信した後すぐに、`notificationclick` イベントから return している点に注目してください。このようにすれば、アプリが開かれることはありません。

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm')
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.</strong>
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }
});
</pre>

受信者が [Ask for Reschedule] をクリックした場合は、確認ページを開く必要があります。アクション ボタン以外の場所をクリックした場合は、単にアプリを開きます。どちらの場合でも、適切な URL を作成します。


<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm') {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.
  <strong>} else if (event.action === 'change') {
    var appUrl = '/?confirmation_id=' +
      event.notification.data.confirmation_id + '#reschedule';
  } else {
    var appUrl = '/';
  }
  // Navigate to appUrl.</strong>
});
</pre>

注: ここからコードのサンプルが少し長くなるため、スペースを節約するために抜粋して紹介します。しかし、ご安心ください。最後に完全なコードが掲載されています。

URL にかかわらず、`clients.matchAll()` を呼び出して、ナビゲーションに使うクライアント ウィンドウを取得します。



    self.addEventListener('notificationclick', function(event) {
      // Content excerpted

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        })
      );
    });


最後に、クライアントが開いているかどうかに応じて、異なるナビゲーション パスを取得する必要があります。


<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  // Content excerpted

  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    <strong>}).then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].navigate(appUrl);
        activeClients[0].focus();
      } else {
        clients.openWindow(appUrl);
      }</strong>
    })
  );
});
</pre>


`notificationclick` ハンドラの完全なコードは次のとおりです。


    self.addEventListener('notificationclick', function(event) {
      event.notification.close();
      if (event.action === 'confirm') {
        var fetchOptions = {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: event.notification.data.confirmation_id
        };
        var confirmation = new Request('/back/end/system/confirm');
        event.waitUntil(fetch(confirmation, fetchOptions));
        return; // So we don't open the page when we don't need to.
      } else if (event.action === 'change') {
        var appUrl = '?confirmation_id=' +
          event.notification.data.confirmation_id + '#reschedule';
      } else {
        var appUrl = '/';
      }

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        }).then( activeClients => {
          if (activeClients.length > 0) {
            activeClients[0].navigate(appUrl);
            activeClients[0].focus();
          } else {
            clients.openWindow(appUrl);
          }
        })
      );
    });


{# wf_devsite_translation #}
