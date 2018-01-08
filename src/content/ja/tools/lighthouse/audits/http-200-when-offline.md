project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「オフライン時に URL でステータスコード 200 を返す」のリファレンス ドキュメント。

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

#  オフライン時に URL でステータスコード 200 を返す {: .page-title }

##  監査が重要である理由 {: #why }

Progressive Web App はオフラインでも機能します。オフライン状態でページにアクセスした際に、Lighthouse
へのレスポンスとして HTTP 200 が返されない場合は、そのページはオフラインで利用できません。


##  監査に合格する方法 {: #how }

1. アプリに Service Worker を追加します。
2. Service Worker を使用して、ローカルにファイルをキャッシュします。
3. Service Worker
をネットワーク プロキシとして使用し、オフライン時にローカルにキャッシュしたファイルを返すようにします。

既存のアプリに Service Worker
を追加する方法については、[ウェブアプリに Service Worker を追加してオフラインでの使用を可能にする](https://codelabs.developers.google.com/codelabs/offline) をご覧ください。
この実践形式のコードラボでは、自身のアプリに Service Worker
を追加する方法を順を追って説明しています。
その中に、上記のステップ 1 と 3 の説明も含まれています。

上記のコードラボでは、Chrome DevTools を使用して Service Worker をデバッグするための基本的な方法もいくつか紹介されています。
さらに詳しい内容は、このトピックに特化したコードラボ
[Debugging Service Workers](https://codelabs.developers.google.com/codelabs/debugging-service-workers)
をご覧ください。

自身のアプリに最適なキャッシュ技術を特定するには、[Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/) の内容を参考にしてください。
この記事に、上記のステップ 2 の説明が含まれています。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、Chorme の Debugging Protocol を使用してオフライン接続をエミュレートし、`XMLHttpRequest` によってページの取得を試みます。



{# wf_devsite_translation #}
