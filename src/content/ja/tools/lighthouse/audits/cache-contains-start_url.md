project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「キャッシュにマニフェストの start_url を保持する」のリファレンス ドキュメント。

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

#  キャッシュにマニフェストの start_url を保持する {: .page-title }

##  監査が重要である理由 {: #why }

オフライン状態でも、モバイル端末のホーム画面から Progressive Web App が正常に起動する必要があります。


##  監査に合格する方法 {: #how }

1. `manifest.json` ファイルで `start_url` プロパティを定義します。
2. Service Worker が `start_url` の値に一致するリソースを適切にキャッシュすることを確認します。


ホーム画面にアプリを追加するための基本的な手順については、[ユーザーのホーム画面にウェブアプリを追加する](https://codelabs.developers.google.com/codelabs/add-to-home-screen)
をご覧ください。
この実践形式のコードラボでは、"Add to Homescreen" 機能を既存のアプリに追加する方法を順を追って説明しています。
このコードラボの内容を参考にして、自身のアプリで "Add to Homescreen" 機能を有効にしてください。


Service Workerでファイルをキャッシュしてオフラインでの使用を可能にする方法については、Lighthouse のドキュメント[「オフライン時に URL でステータスコード 200 を返す」](http-200-when-offline#how) の「監査に合格する方法」の内容をご覧ください。(http-200-when-offline#how)



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

モバイル端末のホーム画面から Progressive Web App を起動すると、アプリは特定の URL を開きます。
この URL はアプリの
`manifest.json` ファイルに `start_url` プロパティとして定義されています。

この監査では `manifest.json` の `start_url` の値を解析して、Service Worker のキャッシュに該当のリソースがキャッシュされているかを確認します。


なお、**Service Worker が** `start_url` ** リクエストをリダイレクトしていると、この監査では正確な結果が出ない場合があります**。


この監査の欠点として、Service Worker に `start_url`
リクエストを解決させずに、キャッシュの中身を直接チェックしているという点が挙げられます。
そのため、`start_url` の値と厳密に一致するリソースがキャッシュに存在しなくても、実際に Service Worker がキャッシュに存在する別のリソースにリダイレクトしてリクエストを正常に解決している場合は、検出漏れが発生する可能性があります。
逆に、`start_url` に一致するリソースがキャッシュに含まれていても、Service Worker が存在しないリソースにリクエストをリダイレクトしていると、誤検知が発生する可能性があります





{# wf_devsite_translation #}
