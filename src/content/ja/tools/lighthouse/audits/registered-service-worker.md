project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目 「Service Worker を登録する」のリファレンス ドキュメント。

{# wf_updated_on:2016-07-25 #}
{# wf_published_on:2016-07-25 #}

#  Service Worker を登録する {: .page-title }

##  監査が重要である理由 {: #why }

以下の Progressive Web App の機能を有効にするには、まず Service Worker の登録をする必要があります。


* オフライン対応
* プッシュ通知
* ホーム画面への追加

##  監査に合格する方法 {: #how }

数行のコードを記載するだけで Service Worker
を登録できます。ただし、上記の Progressive Web App の機能を実装する目的でのみ、Service Worker を利用するようにしてください。
これらのアプリの機能を実装するには、さらに作業が必要です。


Service Worker
でファイルをキャッシュしてオフラインでの使用を可能にする方法については、Lighthouse のドキュメント[「オフライン時に URL でステータスコード 200 を返す」](http-200-when-offline#how) の「監査に合格する方法」の内容をご覧ください。


プッシュ通知や "Add to Homescreen"
機能を有効にするには、以下のチュートリアルのステップを一通り実行して、学習した内容をもとに自身のアプリにこれらの機能を追加してください。


* [ウェブアプリでプッシュ通知を有効にする](https://codelabs.developers.google.com/codelabs/push-notifications)
* [ユーザーのホーム画面にウェブアプリを追加する](https://codelabs.developers.google.com/codelabs/add-to-home-screen)


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Chrome Debugger によって Service Worker のバージョンが返されるかチェックします。


{# wf_devsite_translation #}
