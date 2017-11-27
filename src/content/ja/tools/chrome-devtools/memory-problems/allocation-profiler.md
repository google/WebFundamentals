project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Allocation Profiler Tool を使って、ガーベジ コレクションが正しく行われていないオブジェクトを探し、引き続きメモリを保持します。

{# wf_updated_on:2015-07-08 #}
{# wf_published_on:2015-04-13 #}

# Allocation Profiler Tool の使い方 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
Allocation Profiler Tool を使って、ガベージ コレクションが正しく行われていないオブジェクトを探し、引き続きメモリを保持します。


## ツールの仕組み

**Allocation Profiler** は、スナップショットの詳細情報を表示する [ヒープ プロファイラ](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots)
と、時系列の記録を行う [Timeline パネル](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)
を組み合わせたものです。この 2 つのツールと同様、オブジェクトのヒープ割り当てを追跡するには、記録を開始し、一連のアクションを実行して記録を停止し、分析します。




このツールでは、記録中に定期的（50 ミリ秒ごと）にヒープのスナップショットを取得し、記録終了時に最後のスナップショットを取得します。

![Allocation Profiler](imgs/object-tracker.png)

注: @ の後の数字はオブジェクト ID です。この ID は、スナップショットを複数取得しても変わりません。この ID を使えば、ヒープの状態変化を正確に比較できます。オブジェクトはガベージ コレクションの実行中に移動するため、オブジェクトのアドレスを表示しても意味がありません。

## Allocation Profiler を有効にする

Allocation Profiler の使用を開始するには、以下の手順を実行します。

1. [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html) が最新であることを確認します。
2. デベロッパー ツールを開き、右下にある歯車アイコンをクリックします。
3. [Profiler] パネルが開き、プロファイルの種類として [Record Heap Allocations] が表示されます。

![Record Heap Allocations プロファイラ](imgs/record-heap.png)

## ヒープ割り当てプロファイルの内容

ヒープ割り当てプロファイルでは、オブジェクトが作成される場所が示され、保持パスが特定されます。以下のスナップショットの上部にある縦線は、ヒープで新しいオブジェクトが見つかった時点を示します。


各縦線の高さは最近割り当てられたオブジェクトのサイズに対応し、縦線の色はそれらのオブジェクトが最後のヒープ スナップショットにも存在するかどうかを示します。青い縦線はタイムラインの終了時まで存在しているオブジェクトを示し、灰色の縦線はタイムライン中に割り当てられたオブジェクトのうち、ガベージ コレクションが行われたオブジェクトを示します。





![Allocation Profiler のスナップショット](imgs/collected.png)

以下のスナップショットでは、アクションが 10 回実行されています。サンプル プログラムでは 5 個のオブジェクトがキャッシュされるため、最後の 5 本の青い縦線は予想どおりですが、最も左にある青い縦線は問題が発生する恐れがあることを示しています。



そこで上記のタイムラインのスライダーを使用して、この特定のスナップショットを拡大し、その時点で割り当てられていたオブジェクトを確認します。


![スナップショットを拡大](imgs/sliders.png)

ヒープ内の特定のオブジェクトをクリックすると、ヒープ スナップショットの下部に、保持ツリーが表示されます。オブジェクトへの保持パスを調べると、オブジェクトのガベージ コレクションが行われなかった理由を把握できるだけの情報が提供されるので、必要に応じてコードを変更し、不要な参照を削除します。

## 関数ごとのメモリ割り当ての表示{: #allocation-profiler }

また、JavaScript 関数ごとのメモリ割り当てを表示することもできます。詳細については、[関数ごとのメモリ割り当て状況の調査](index#allocation-profile) をご覧ください。




{# wf_devsite_translation #}
