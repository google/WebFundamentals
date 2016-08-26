project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: リッチなオフライン体験、定期的なバックグラウンド同期、プッシュ通知など、これまでネイティブアプリを必要としていた機能が Web にもやってきます。Service Worker はそれらの機能を提供する基盤技術です。

{# wf_review_required #}
{# wf_published_on: 2000-01-01 #}

# Service Worker の紹介 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/myakura.html" %}



リッチなオフライン体験、定期的なバックグラウンド同期、プッシュ通知など、これまでネイティブアプリを必要としていた機能が Web にもやってきます。Service Worker はそれらの機能を提供する基盤技術です。

## Service Worker とは

Service Worker はブラウザが Web ページとは別にバックグラウンドで実行するスクリプトで、Web ページやユーザのインタラクションを必要としない機能を Web にもたらします。すでに現在、[プッシュ通知](/web/updates/2015/03/push-notifications-on-the-open-web)や[バックグラウンド同期](/web/updates/2015/12/background-sync)が提供されています。さらに将来は定期的な同期、ジオフェンシングなども導入されるでしょう。このチュートリアルで説明する機能は、ネットワークリクエストへの介入や処理機能と、レスポンスをプログラムから操作できるキャッシュ機能です。

この API にとてもわくわくするのは、それがオフライン体験をサポートし、そして開発者がその体験を完全にコントロールできるからです。

Service Worker 以前にも、オフライン体験を Web にもたらすものとして [AppCache](http://www.html5rocks.com/en/tutorials/appcache/beginner/) というものがありました。しかし AppCache の重大な問題として、[たくさんの意図しない挙動](http://alistapart.com/article/application-cache-is-a-douchebag)があったこと、シングルページ Web アプリにはうまく動いてくれたものの、複数のページにまたがるサイトではうまく動いてくれないという設計がありました。Service Worker はこれらの弱点を避けるように設計されています。

Service Worker について、知っておきたいことは次のとおりです。

* Service Worker は [JavaScript Worker](http://www.html5rocks.com/ja/tutorials/workers/basics/) のひとつです。ですので DOM に直接アクセスできません。Service Worker がコントロールするページとの通信は [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) インターフェースから送られるメッセージに返信することで行えます。DOM を操作したい場合は、コントロールするページ経由で行えます。
* Service Worker はプログラム可能なネットワークプロキシです。ページからのネットワークリクエストをコントロールできます。
* Service Worker は使用されていない間は終了され、必要な時になったら起動します。ですので `onfetch`、`onmessage` ハンドラ内でグローバルに設定したステートに依存できません。持続的で再利用可能な情報を Service Worker のライフサイクル間で共有したい場合は、[IndexedDB API](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API) API にアクセスしなければいけません。
* Service Worker は JavaScript の Promises を多用します。Promises についてよく知らない方はこの記事を読むのをいったん止めて、[Jake Archibaldの記事](/web/fundamentals/primers/promises/)を読みましょう。
