project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトでアプリケーション キャッシュを使用しない」のリファレンス ドキュメント。

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

#  サイトでアプリケーション キャッシュを使用しない {: .page-title }

##  監査が重要である理由 {: #why }

アプリケーション キャッシュ（AppCache）は、[サポートを終了][deprecated]しました。

[deprecated]: https://html.spec.whatwg.org/multipage/browsers.html#offline

##  監査に合格する方法 {: #how }

Service Worker の [Cache API][API] を代用することを検討してください。

AppCache から Service Worker へ移行する際は、
[sw-appcache-behavior][sw-appcache-behavior] ライブラリを利用することをお勧めします。このライブラリを使用すると、Service Worker をベースにして AppCache
のマニフェストで定義された動作を実装できます。


Service Worker
を使用してオフラインでもサイトを稼働させるための情報については、監査リファレンスの[オフライン時に URL でステータスコード 200 を返す](http-200-when-offline)の内容をご覧ください。


[API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

[sw-appcache-behavior]: https://github.com/GoogleChrome/sw-appcache-behavior

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

AppCache マニフェストが検出されなければ、監査に合格します。


{# wf_devsite_translation #}
