project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトの独自スクリプトで Date.now() を使用しない」のリファレンス ドキュメント。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

#  サイトの独自スクリプトで Date.now() を使用しない {: .page-title }

##  監査が重要である理由 {: #why }

`Date.now()` を使用して時間を計測している場合は、代わりに `performance.now()` を使用することを検討してください。
`performance.now()`
では、より高精度のタイムスタンプが返されます。この値はシステムクロックに依存せず、常に一定の割合で増加します。また、手動で調整したり、ずらしたりすることも可能です。


##  監査に合格する方法 {: #how }

Lighthouse のレポートでは、検出された `Date.now()` のインスタンスが **URLs** の下に一覧表示されます。
これらの呼び出しを、それぞれ `performance.now()` で置き換えます。

この API の詳細については、[`performance.now()`][MDN] をご覧ください。

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、指定したページと同じホスト上にあるスクリプトで検出された `Date.now()` のインスタンスがすべて報告されます。
その他のホスト上のスクリプトは制御不可能とみなされるため、報告対象から除外されます。
したがって、ページで `Date.now()` を使用するスクリプトが他にあったとしても、Lighthouse のレポートには含まれない場合があります。



{# wf_devsite_translation #}
