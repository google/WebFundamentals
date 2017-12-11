project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトで古い CSS Flexbox を使用しない」のリファレンス ドキュメント。

{# wf_updated_on:2016-12-05 #}
{# wf_published_on:2016-12-05 #}

#  サイトで古い CSS Flexbox を使用しない {: .page-title }

##  監査が重要である理由 {: #why }

2009 年の旧仕様の Flexbox はサポートを終了しました。この旧仕様の Flexbox は最新版と比較すると 2.3 倍の処理時間を要します。
詳細については、[Flexbox Layout Isn't Slow][slow] をご覧ください。


[slow]: https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow

##  監査に合格する方法 {: #how }

Lighthouse のレポートでは、ページのスタイルシートで検出された `display: box` のインスタンスが **URLs** の下に一覧表示されます。
すべてのインスタンスを新しい構文
`display: flex` で置き換えてください。

スタイルシートで `display: box` を使用している場合は、廃止された他の
Flexbox プロパティが使用されている可能性があります。つまり、`box-flex` のような `box` で始まるプロパティは、すべてサポートが終了しているため、置換する必要があります。
古いプロパティと新しいプロパティの対応関係については、[CSS Flexbox 2009/2011 仕様の構文属性マッピング][map]
をご覧ください。


[map]: https://wiki.csswg.org/spec/flexbox-2009-2011-spec-property-mapping

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、ページで使用されているすべてのスタイルシートにおいて、`display: box` が使用されているかチェックします。
ただし、その他の廃止されたプロパティがスタイルシートで使用されているかはチェックされません。



{# wf_devsite_translation #}
