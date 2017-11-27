project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトを HTTPS で配信する」のリファレンス ドキュメント。

{# wf_updated_on: 2016-09-19 #}
{# wf_published_on: 2016-09-19 #}

#  サイトを HTTPS で配信する {: .page-title }

##  監査が重要である理由 {: #why }

機密データを扱わない場合でも、すべてのウェブサイトは HTTPS で保護されている必要があります。
HTTPS は、第三者によるウェブサイトとユーザー間の通信内容の傍受および改ざんを防止します。


HTTPS 接続を使用していないと、写真撮影や録音など、ウェブ プラットフォームの強力な新機能の多くを利用することができません。


定義上、HTTPS で動作しないアプリが、Progressive Web App と見なされることはありません。
これは、Service Worker など、多くの Progressive Web App のコア技術で、HTTPS 接続が必要であるためです。


すべてのサイトを HTTPS で保護すべき理由については、[常に HTTPS を使用する必要がある理由](/web/fundamentals/security/encrypt-in-transit/why-https)をご覧ください。


##  監査に合格する方法 {: #how }

サイトを HTTPS に移行します。

[Firebase](https://firebase.google.com/docs/hosting/){: .external }
や [GitHub Pages](https://pages.github.com/){: .external } など、多くのホスティング プラットフォームは、デフォルトで安全性が確保されています。


サーバーを所有しており、安価で簡単に証明書を生成したい場合は、[Let's Encrypt](https://letsencrypt.org/){: .external } の内容をご覧ください。
自身のサーバーで HTTPS
を有効にするための詳細情報については、[送信中のデータの暗号化](/web/fundamentals/security/encrypt-in-transit/enable-https)の一連のドキュメントをご覧ください。


すでに HTTPS で配信されているページが監査に合格しない場合は、混在コンテンツに原因がある可能性があります。
混在コンテンツとは、安全なサイトから保護されていない（HTTP ）リソースをリクエストした際に発生する状態です。
この問題をデバッグする方法については、Chrome DevTools の Security
パネルにある[セキュリティの問題を理解する](/web/tools/chrome-devtools/debug/security)のドキュメントをご覧ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、該当ページが安全な接続で配信されていることを示す Chrome Debugger Protocol からのイベントを待機します。
10 秒以内にイベントが検知されなければ、監査には合格しません。



{# wf_devsite_translation #}
