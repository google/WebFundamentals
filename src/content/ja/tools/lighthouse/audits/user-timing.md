project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「User Timing の Mark と Measure」のリファレンス ドキュメント。

{# wf_updated_on:2016-10-06 #}
{# wf_published_on:2016-10-06 #}

#  User Timing の Mark と Measure {: .page-title }

##  監査が重要である理由 {: #why }

User Timing API を利用して、アプリの JavaScript のパフォーマンスを計測することができます。
基本的には、スクリプトで最適化したい部分を決定して、その部分を User Timing API
で計測します。
計測結果については、API
を使用して JavaScript からアクセスするか、[Chrome DevTools の Timeline の記録](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)に表示させることができます。


##  監査に合格する方法 {: #how }

この監査は「合格」や「不合格」を判定する形式にはなっていません。単に、アプリのパフォーマンス計測に役立つ API
を紹介するための項目になります。
Lighthouse のレポートに表示されるこの監査項目のスコアは、アプリ内で検出された User Timing の Mark および Measure の数に相当します。


アプリに User Timing の Mark と Measure が含まれている場合は、その Mark と Measure が Lighthouse のレポートに表示されます。


アプリの JavaScript のパフォーマンスを計測するために、User Timing API の使用を開始する際は、[User Timing API](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/)
の記事をご覧ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では、Chrome の Trace Event Profiling Tool から User Timing のデータを抽出します。


{# wf_devsite_translation #}
