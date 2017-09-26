project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目 「操作可能になるタイミング」のリファレンス ドキュメント。

{# wf_updated_on:2016-10-05 #}
{# wf_published_on:2016-10-05 #}

# 操作可能になるタイミング {: .page-title }

##  監査が重要である理由 {: #why }

ユーザーが体感するアプリのパフォーマンスは、ページの読み込み速度に大きく左右されます。
詳細については、[Measure Performance with the RAIL Method](/web/fundamentals/performance/rail) をご覧ください。

この監査では、ページが表示され、ユーザー操作が可能になるタイミングを特定します。


##  監査に合格する方法 {: #how }

ページの読み込み時のパフォーマンスを改善する方法ついては、Speed Index の[監査に合格する方法](speed-index#how)で紹介されているリソースをご覧ください。
この「操作可能になるタイミング」のスコアが低いほど、パーフォーマンスが高くなります。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

「操作可能になるタイミング」とは、レイアウトが安定して、主要なウェブフォントが表示され、メインスレッドでユーザー入力を処理できる状態になるタイミングとして定義されます。



この測定基準は導入されて間もないため、変更される可能性があることに注意してください。


{# wf_devsite_translation #}
