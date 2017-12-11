project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「Speed Index」のリファレンス ドキュメント。

{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

#  Speed Index {: .page-title }

##  監査が重要である理由 {: #why }

Speed Index はページの読み込みパフォーマンスにおける指標であり、ページのコンテンツが目に見える状態になるまでの時間を表します。
このスコアが低いほど、パフォーマンスが高くなります。

##  監査に合格する方法 {: #how }

Speed Index のスコアを低くするには、ページを最適化して、視覚的な観点で読み速度を上げる必要があります。
まずは以下の 2 点から検討することをお勧めします。

* [コンテンツの効率の最適化](/web/fundamentals/performance/optimizing-content-efficiency/)
* [クリティカル レンダリング パスの最適化](/web/fundamentals/performance/critical-rendering-path/)

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では
[Speedline](https://github.com/pmdartus/speedline)
と呼ばれるノード モジュールを使用して、Speed Index のスコアを算出します。

Speed Index のベースとなるアルゴリズムと手法の詳細については、[Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)
をご覧ください。

目標スコアは、対数正規分布の累積分布関数によって計算されます。
さらに詳しい内容については、監査の[ソース](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/speed-index-metric.js)のコメントをご覧ください。




{# wf_devsite_translation #}
