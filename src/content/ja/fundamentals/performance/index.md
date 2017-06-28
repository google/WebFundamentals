project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: パフォーマンスの改善は、ユーザーがダウンロードするデータの最小化、または少なくとも最適化から始まります。ブラウザがこれらのリソースをレンダリングする方法について理解しておくことが、コードの効率を高めるための前提条件です。また、改善後にテストする方法が必要になります。 

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

#  パフォーマンス {: .page-title }

パフォーマンスの改善は、ユーザーがダウンロードするデータの最小化、または少なくとも最適化から始まるプロセスです。ブラウザがこれらのリソースをレンダリングする方法について理解しておくことが、コードの効率を高めるための前提条件です。また、改善後にテストする方法が必要になります。 

##  コンテンツの効率の最適化

<img src="images/oce.png" class="attempt-right" style="max-height: 200px;">

優れたパフォーマンスを実現するには、サイトのすべてのバイトの配信を最適化する必要があります。

[スタートガイド](optimizing-content-efficiency/)

<div style="clear:both;"></div>

##  クリティカル レンダリング パス

<img src="images/crp.png" class="attempt-right">

HTML、CSS、JavaScript を受信して、レンダリングされたピクセルに変換されるまでの中間ステップで、なにが起こっているのでしょうか？

[詳細を見る](critical-rendering-path/)

<div style="clear:both;"></div>

##  レンダリング パフォーマンス

<img src="images/rend.png" class="attempt-right">

パフォーマンスの高いサイトとアプリを作成するには、HTML、JavaScript、および CSS がブラウザでどのように処理されるかを理解する必要があります。また、記述したコード（および他のサードパーティのコード）が、できる限り効率的に実行されるようにします。

[詳細を見る](rendering/)

<div style="clear:both;"></div>

##  低帯域幅と高レイテンシの理解

<img src="images/low.png" class="attempt-right">

接続状態が悪く不安定なときのアプリまたはサイトの操作性を把握して、それに応じてアプリやサイトを構築することが重要です。これに役立つさまざまなツールがあります。

[詳細を見る](poor-connectivity/)

<div style="clear:both;"></div>

##  PRPL パターン

<img src="images/prpl.png" class="attempt-right">

PRPL（レンダリング、事前キャッシュ、遅延読み込み）は、Progressive Web App（PWA）を構築および配信するためのパターンで、アプリの配信と起動時のパフォーマンスに重点を置いています。



[詳細を見る](prpl-pattern/)

<div style="clear:both;"></div>


##  関連リソース

###  コードラボ

[ウェブアプリのパフォーマンスの問題を特定して修正する](/web/fundamentals/getting-started/codelabs/web-perf/)<br>
このコードラボでは、ウェブアプリのパフォーマンスのボトルネックを特定して解決する方法を学びます。

### Chrome DevTools

* [パフォーマンスの考え方](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [実行時のパフォーマンス](/web/tools/chrome-devtools/rendering-tools/)
* [ページの読み込みパフォーマンス](/web/tools/chrome-devtools/network-performance/resource-loading)


###  Udacity コース

[ブラウザのレンダリングの最適化](https://www.udacity.com/course/browser-rendering-optimization--ud860)<br>
Google のパフォーマンスの専門家である Paul Lewis が、不自然な動作を削除し、1 秒 60 フレームのパフォーマンスを維持するウェブアプリの作成をサポートします。


[クリティカル レンダリング パス](https://www.udacity.com/course/website-performance-optimization--ud884)<br>
クリティカル レンダリング パス、つまり、ブラウザが HTML、CSS、JavaScript を生き生きとしたウェブサイトに変換するために必要なステップについて学びます。


[HTTP/1 から HTTP/2](https://www.udacity.com/course/client-server-communication--ud897)<br>
Surma は HTTP/1 の基本から HTTP/2 に至るまで、アセットを効率良く読み込む方法を説明し、これらのプロトコルのセキュリティについても説明します。
<div style="clear:both;"></div>





{# wf_devsite_translation #}
