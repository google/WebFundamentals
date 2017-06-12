project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ネイティブ アプリで最も貴重な機能であるプッシュ通知が、ウェブでも利用できるようになりました。最大限に活用するには、通知がタイムリー、的確、有用である必要があります。

{# wf_updated_on:2016-06-30 #}
{# wf_published_on:2016-06-30 #}

# ウェブでのプッシュ通知: タイムリー、有用、的確 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}


<img src="images/cc-good.png" alt="通知の例" class="attempt-right">

デベロッパーを集めてモバイル端末の機能にあってウェブにはないものは何かと質問すると、プッシュ通知は常に上位にあげられます。


ユーザーは、ウェブのプッシュ通知を許可することで、お気に入りのサイトから最新情報を得られるようになります。一方、デベロッパー側は、関連性のあるコンテンツをカスタマイズして、効率的にユーザーのリピート率を高めることができます。

 

Push API と Notification API によって新たな可能性が広がり、ユーザーに再び働きかけることが可能になります。


##  Service Worker は関係しますか？ {: #service-worker-involved }

はい。プッシュ機能は Service Worker がベースになっています。これは、バックグラウンドで Service Worker が動作しているためです。
したがって、プッシュ通知のコードが実行されるのは（つまり電池が使用されるのは）、ユーザーが通知をクリックしたり閉じたりして、通知を操作しているときだけです。この仕組みをまだ十分に把握していない方は、[Service Worker の概要][service-worker-primer]をご覧ください。プッシュおよび通知を実装する方法について説明する後のセクションで、Service Worker のコードを使用します。



##  2 つのテクノロジー {: #two-technologies }

プッシュおよび通知では、相互に補完し合う異なる API を使用します。[**プッシュ**](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)はサーバーから Service Worker に情報を提供するアクションです。[**通知**](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)は、Service Worker またはウェブページが情報をユーザーに表示するアクションです。






##  通知の仕組みの概略 {: #anatomy }

次のセクションでは多数の画像を使って説明する予定ですが、ここで少しコードをお見せしましょう。
次のコードをご覧ください。Service Worker の registration を使用して、registration オブジェクトの `showNotification` を呼び出します。



    serviceWorkerRegistration.showNotification(title, options);
    

`title` 引数は通知の見出しとして表示されます。`options` 引数はオブジェクト リテラルで、通知のその他のプロパティを設定します。通常、options オブジェクトは次のようになります。




    {
      "body":"Did you make a $1,000,000 purchase at Dr. Evil...",
      "icon": "images/ccard.png",
      "vibrate": [200, 100, 200, 100, 200, 100, 400],
      "tag": "request",
      "actions": [
        { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
        { "action": "no", "title": "No", "icon": "images/no.png" }
      ]
    }
    
<img src="images/cc-good.png" alt="Example Notification" class="attempt-right">

このコードは画像内に表示される通知を生成します。一般に、ネイティブ アプリケーションと同じ機能を提供します。これらの機能の実装について詳しく説明する前に、その効果的な使用方法について説明します。パーミッションやサブスクリプションの処理、メッセージの送信やメッセージへの応答など、プッシュ通知の実装方法について説明します。



##  プッシュ通知を試す方法

動作を完全に理解して実装する前に、機能を使える方法がいくつかあります。まず、[Google 独自のサンプル](https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications)をチェックアウトします。Peter Beverloo の [Notification Generator](https://tests.peter.sh/notification-generator/) や Chris Mills の [push-api-demo](https://github.com/chrisdavidmills/push-api-demo) も利用できます。

注: localhost を使用していない場合、Push API には HTTPS が必要です。

<<../../../_common-links.md>>


{# wf_devsite_translation #}
