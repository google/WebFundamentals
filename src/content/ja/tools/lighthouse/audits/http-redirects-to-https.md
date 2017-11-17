project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトへの HTTP トラフィックを HTTPS にリダイレクトする」のリファレンス ドキュメント。

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

#  サイトで HTTP トラフィックを HTTPS にリダイレクトする {: .page-title }

##  監査が重要である理由 {: #why }

すべてのサイトは HTTPS で保護されている必要があります。理由については、Lighthouse のドキュメント
[「サイトを HTTPS で配信する」](https)をご覧ください。

HTTPS の設定が完了したら、自身のサイトに対する保護されていない HTTP トラフィックを、すべて HTTPS にリダイレクトする必要があります。


##  監査に合格する方法 {: #how }

1. HTML の `head` で canonical リンクを使用して、検索エンジンで効率良く該当ページを特定できるようにします。


       <link rel="canonical" href="https://example.com"/>

2. HTTP トラフィックを HTTPS へリダイレクトするようにサーバーを設定します。サーバーの適切な設定については、ご利用のサーバーのドキュメントを参照してください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、該当ページの URL を `http` に変換してページを読み込み、そのページが保護されていることを示すイベントが Chrome Debugger で発行されるのを待機します。
Lighthouse が 10 秒以内にイベントを受信しなければ、この監査は不合格になります。



{# wf_devsite_translation #}
