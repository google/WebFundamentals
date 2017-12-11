project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトの独自リソースに HTTP/2 を使用する」のリファレンス ドキュメント。

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

#  サイトの独自リソースに HTTP/2 を使用する {: .page-title }

##  監査が重要である理由 {: #why }

HTTP/2 を使用すると、ページのリソースの読み込み速度が向上し、データ通信量が削減されます。


HTTP/1.1 と比較した HTTP/2 のメリットについては、[HTTP/2 Frequently Asked Questions][faq] の一覧をご確認ください。


詳細な技術概要については、[HTTP/2 の概要][intro]をご覧ください。

[faq]: https://http2.github.io/faq/
[intro]: /web/fundamentals/performance/http2/

##  監査に合格する方法 {: #how }

Lighthouse のレポートでは、HTTP/2 で提供されていないリソースが **URLs** の下に一覧表示されます。
この監査に合格するには、これらのリソースをすべて HTTP/2 で提供するようにします。

お使いのサーバーで HTTP/2 を有効にする方法については、[Setting up HTTP/2][setup] をご覧ください。

[setup]: https://dassur.ma/things/h2setup/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、指定したページと同じホストにあるリソースがすべて収集され、各リソースの HTTP プロトコルのバージョンがチェックされます。


Lighthouse では、その他のホスト上にあるリソースの提供方法は制御不可能とみなされるため、それらのリソースは報告対象から除外されます。



{# wf_devsite_translation #}
