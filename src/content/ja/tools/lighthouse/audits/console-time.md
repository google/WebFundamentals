project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「サイトの独自スクリプトで console.time() を使用しない」のリファレンス ドキュメント。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

#  サイトの独自スクリプトで console.time() を使用しない {: .page-title }

##  監査が重要である理由 {: #why }

`console.time()` を使用してページのパフォーマンスを計測している場合は、代わりに User Timing API
を使用することを検討してください。以下のようなメリットがあります。

* 高精度のタイムスタンプ。
* タイミング データをエクスポート可能。
* Chrome DevTools の Timeline への統合。Timeline の記録中に User Timing の
`performance.measure()` 関数が呼び出されると、計測結果が DevTools
によって自動で Timeline に追加されます。以下のスクリーンショットの `my custom measurement` ラベルが、これに相当します。


![Chrome DevTools の Timeline に表示される User Timing の計測結果][timeline]

[timeline]: /web/tools/lighthouse/images/user-timing-measurement-in-devtools.png

##  監査に合格する方法 {: #how }

Lighthouse のレポートでは、検出された `console.time()` のインスタンスが **URLs** の下に一覧表示されます。
これらの呼び出しを、それぞれ `performance.mark()` で置き換えます。
2 つのマーク間の経過時間を計測するには、`performance.measure()`
を使用します。

この API を使用方法については、[User Timing API: あなたの Web アプリをもっと理解するために][html5rocks]をご覧ください。


[html5rocks]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、指定したページと同じホスト上にあるスクリプトで検出された `console.time()` のインスタンスがすべて報告されます。
その他のホスト上のスクリプトは制御不可能とみなされるため、報告対象から除外されます。
したがって、ページで `console.time()` を使用するスクリプトが他にあったとしても、Lighthouse のレポートには含まれない場合があります。



{# wf_devsite_translation #}
