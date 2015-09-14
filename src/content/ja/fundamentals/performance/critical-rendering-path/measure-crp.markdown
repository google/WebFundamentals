---
title: "ナビゲーション タイミングを用いてクリティカル レンダリング パスを測定する"
description: "最適化するには、測定できなければなりません。幸運なことに、Navigation Timing API によって、クリティカル レンダリング パスの各ステップを測定する上で必要なツールがすべて手に入ります。"
updated_on: 2014-09-18
key-takeaways:
  measure-crp:
    - ナビゲーション タイミングは、CRP 測定のための高分解能なタイムスタンプを提供します。
    - ブラウザによって発行された多数の消耗イベントが、CRP のさまざまなステージをキャプチャします。
---
<p class="intro">
  最適化するには、測定できなければなりません。幸運なことに、Navigation Timing API によって、クリティカル レンダリング パスの各ステップを測定する上で必要なツールがすべて手に入ります。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.measure-crp %}

確かなパフォーマンス戦略の基盤を形成するのは、正確な測定です。それこそ、まさに Navigation Timing API が実現するものです。

<img src="images/dom-navtiming.png" class="center" alt="ナビゲーション タイミング">

上記の図の各ラベルは、ブラウザが各ページを読み込んだときの高分解能タイムスタンプに対応します。ただし、ここでは、さまざまなタイムスタンプの一部しか表示しています。今はネットワーク関連タイムスタンプはすべて省略しており、後のトピックで扱います。

さて、各タイムスタンプは何を意味しているのでしょうか。

* **domLoading:** これは、プロセス全体が開始するときのタイムスタンプで、間もなく、ブラウザが最初に受け取った HTML 
ドキュメントのバイトの解析を開始します。
* **domInteractive:** ブラウザが HTML の解析をすべて完了して、DOM 構築が完了した時点を示します。
* **domContentLoaded:** DOM の準備が整い、JavaScript の実行をブロックするスタイルシートが存在しない時点を示します。必要に応じて、レンダリング ツリーの構築が開始できる段階です。
* 多くの JavaScript フレームワークは、このイベントを待ってから、自身のロジックの実行を開始します。このため、ブラウザは、_EventStart_ と _EventEnd_ のタイムスタンプを取得することで、この実行にかかった時間をトラッキングできるようにしています。
* **domComplete:** 名前が示すとおり、すべての処理が完了し、ページ上のすべてのリソース（画像など）がダウンロードを完了したことを示します。つまり、読み込み中のマークが回転を止めた状態です。
* **loadEvent:** 各ページの読み込みの最終ステップとして、ブラウザが onload イベントを発行します。このイベントは、追加アプリケーション ロジックをトリガーできます。

HTML 仕様では、イベントを発行する際に満たすべき条件など、各イベントの具体的な条件が規定されています。ここでは、クリティカル レンダリング パスに関係する主な条件だけに焦点を当てます。

* **domInteractive:** DOM の準備が整ったことを示します。
* **domContentLoaded:** 通常、[DOM と CSSOM が両方とも準備が整った](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)ことを示します。
* パーサー ブロック JavaScript が存在しない場合、_DOMContentLoaded_ は _domInteractive_ の直後に発行されます。
* **domComplete:** ページとサブリソースがすべて準備が整った時点を示します。

^

{% include_code src=_code/measure_crp.html snippet=full lang=html %}

上記のサンプルでは、やや複雑に見えますが、実は非常にシンプルです。Navigation Timing API がすべての関連タイムスタンプを取得し、コードは単に "onload" イベントが発行されるのを待ちます（onload イベントは、domInteractive、domContentLoaded、domComplete の後に発行されます）。そして、さまざまなタイムスタンプの相違が計算されます。
<img src="images/device-navtiming-small.png" class="center" alt="NavTiming デモ">

以上で、トラッキングする具体的な基点と、その測定値を出力するシンプルな関数が手に入りました。コードを修正すれば、このような指標をページに出力する代わりに、アナリティクス サーバーに送信することもできます（[Google アナリティクスでは自動的にこの処理が行われます](https://support.google.com/analytics/answer/1205784?hl=ja)）。この方法は、ページのパフォーマンスを定期的に記録し、最適化でメリットが生じるページを特定する方法として優れています。



