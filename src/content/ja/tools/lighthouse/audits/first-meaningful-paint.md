project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「First Meaningful Paint」のリファレンス ドキュメント。

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

#  First Meaningful Paint {: .page-title }

##  監査が重要である理由 {: #why }

ユーザーが体感するアプリのパフォーマンスは、ページの読み込み速度に大きく左右されます。
詳細については、[Measure Performance with the RAIL Method](/web/fundamentals/performance/rail) をご覧ください。

この監査では、ユーザーがページの主要コンテンツが表示されたと認識するタイミングを特定します。


##  監査に合格する方法 {: #how }

First Meaningful Paint のスコアが低いほど、主要コンテンツがページ上に高速で表示されます。


First Meaningful Paint の高速化を実現するには、[クリティカル レンダリング パスの最適化](/web/fundamentals/performance/critical-rendering-path/)を参考にしてください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

基本的に First Meaningful Paint とは、アバブ・ザ・フォールドのレイアウトが大きく変化してウェブフォントが読み込まれる前のペイントを指します。
詳細な仕様については
[First Meaningful Paint: A Layout-Based Aproach](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view) をご覧ください。



{# wf_devsite_translation #}
