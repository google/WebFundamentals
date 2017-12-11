project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトで document.write() を使用しない」のリファレンス ドキュメント。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

#  サイトで document.write() を使用しない {: .page-title }

##  監査が重要である理由 {: #why }

2G、3G、低速 Wi-Fi など、低速のネットワークに接続している場合は、`document.write()`
で動的に挿入された外部スクリプトによって、メインページのコンテンツ表示が数十秒単位で遅れる場合があります。


詳細は、[Intervening against `document.write()`][[blog] をご覧ください。

[blog]: /web/updates/2016/08/removing-document-write

##  監査に合格する方法 {: #how }

Lighthouse のレポートには、`document.write()` への呼び出しがリストアップされます。
このリストを確認して、動的にスクリプトを挿入している呼び出しに注意してください。
スクリプトが
[Intervening against `document.write()`][[blog] の導入部分に記載された条件に一致する場合は、挿入されたスクリプトが Chrome で実行されません。
よって、これらの `document.write()` への呼び出しを変更する必要があります。
解決策については、[How do I fix this?][fix] をご覧ください。 

[fix]: /web/updates/2016/08/removing-document-write#how_do_i_fix_this

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、検出された `document.write()` のインスタンスがすべて報告されます。
なお、Chrome で `document.write()` が実行されなくなるのは、スクリプトがレンダリングをブロックする場合と動的に挿入された場合のみです。
それ以外のケースでは、`document.write()` を使用できる場合もあります。



{# wf_devsite_translation #}
