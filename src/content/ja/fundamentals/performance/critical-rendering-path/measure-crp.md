project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: クリティカル レンダリング パスの測定方法を説明します。

{# wf_updated_on:2014-09-17 #}
{# wf_published_on:2014-03-31 #}

# クリティカル レンダリング パスの測定 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

確実なパフォーマンス戦略を立てる上で、正確な計測は欠かせません。
測定できなければ最適化できません。このドキュメントでは、CRP パフォーマンスを測定するさまざまなアプローチについて説明します。


* Lighthouse のアプローチでは、自動化された一連のテストをページに対して実行し、ページの CRP パフォーマンスに関するレポートを生成します。
このアプローチを採用すると、ブラウザで読み込んだ特定のページの CRP パフォーマンスの概要をすばやく簡単に把握できるため、テスト、反復、パフォーマンス改善を迅速に行うことができます。
* Navigation Timing API のアプローチでは、[RUM（リアル ユーザー モニタリング）](https://en.wikipedia.org/wiki/Real_user_monitoring) メトリクスを取得します。

名前が意味するとおり、これらのメトリクスはサイトにおける実際のユーザー操作から取得され、さまざまな端末やネットワーク状況においてユーザーが体感したとおりに、実際の CRP パフォーマンスを正確に把握できます。
一般には、Lighthouse を使用して明らかに CRP を最適化できる箇所を特定し、Navigation Timing API でコードを計測して、アプリの実際のパフォーマンスを監視するというアプローチが推奨されます。



##  Lighthouse を使用したページの監査{: #lighthouse }

Lighthouse は、指定したページに対して一連のテストを実行し、ページの結果をレポートにまとめて表示するウェブアプリの監査ツールです。
Lighthouse は Chrome 拡張機能または NPM モジュールとして実行できるため、Lighthouse を継続的インテグレーション システムと統合する場合に便利です。



使用を開始するには、[Lighthouse によるウェブアプリの監査](/web/tools/lighthouse/)をご覧ください。

Lighthouse を Chrome 拡張機能として実行すると、ページの CRP 結果は以下のスクリーンショットのようになります。


![Lighthouse の CRP 監査](images/lighthouse-crp.png)

この監査結果の詳細については、[クリティカル リクエスト チェーン][crc]をご覧ください。


[crc]: /web/tools/lighthouse/audits/critical-request-chains

##  Navigation Timing API でコードを計測する {: #navigation-timing }

Navigation Timing API と、ページの読み込み時に発行されたその他のブラウザ イベントを組み合わせると、任意のページでの実際の CRP パフォーマンスを取得および記録できます。



<img src="images/dom-navtiming.png"  alt="Navigation Timing">

上記の図の各ラベルは、ブラウザが読む込むすべてのページについてトラックする、詳細なタイムスタンプに相当します。実は、この具体例では、さまざまなタイムスタンプの一部だけを表示しています。ここではネットワーク関連タイムスタンプはすべて省略してあります。ただし、後の演習で扱う予定です。

ところで、これらのタイムスタンプは何を意味しているでしょうか。

* `domLoading`: これは、プロセス全体の始動タイムスタンプであり、ブラウザが最初に受け取った HTML ドキュメントのバイトの解析を開始する時点を示します。
* `domInteractive`: ブラウザが HTML の解析をすべて完了し、DOM の構築を完了した時点を示します。
* `domContentLoaded`: DOM の準備が整い、JavaScript の実行をブロックするスタイルシートが存在しなくなった時点を示します。つまり、これ以降、レンダリング ツリーの構築を開始できます。
    * 多くの JavaScript フレームワークでは、このイベントを待ったうえで、それ自体のロジックの実行を開始します。このため、ブラウザでは、`EventStart` と `EventEnd` のタイムスタンプをキャプチャすることで、この処理の所要時間をトラッキングできるようにしています。
* `domComplete`: 名前が示すように、すべての処理が完了し、ページ上にあるすべてのリソース（画像など）のダウンロードが完了したことを示します。つまり、読み込み中のマークの回転が止まった状態です。
* `loadEvent`: ページごとの読み込みの最終ステップとして、ブラウザは `onload` イベントを発行します。これにより、追加のアプリケーション ロジックがトリガーされることがあります。


HTML 仕様では、イベントを発行するタイミング、満たすべき条件など、すべてのイベントごとに具体的な条件が規定されています。ここでは目的に合わせて、クリティカル レンダリング パスに関係する主なマイルストーンだけに焦点を当てます。

* `domInteractive` は DOM の準備ができた時点を示します。
* `domContentLoaded` は通常は [DOM と CSSOM の両方の準備ができた時点を示します](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)。
    * パーサー ブロック JavaScript が存在しない場合、`DOMContentLoaded` は `domInteractive` の直後に発行されます。
* `domComplete` はページおよびすべてのサブリソースの準備ができた時点を示します。


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp.html){: target="_blank" .external }

上記のサンプルは一見すると厄介そうですが、実はかなりシンプルです。Navigation Timing API がすべての関連タイムスタンプをキャプチャします。このコードでは `onload` イベントが発行されるのを待ち（`onload` イベントは、`domInteractive`、`domContentLoaded`、`domComplete` の後で発行）、さまざまなタイムスタンプ間の差を計算しているだけです。

<img src="images/device-navtiming-small.png"  alt="NavTiming デモ">

以上です。これで、トラッキング対象の具体的なマイルストーンと、その測定値を出力するシンプルな関数がそろいました。これらのメトリックをページに出力する代わりに、コードを修正してアナリティクス サーバーに送信することもできます（[Google アナリティクスではこれを自動で実行](https://support.google.com/analytics/answer/1205784)）。これは、ページのパフォーマンスを正しく把握し、最適化作業によってメリットが生じそうなページを特定する方法として優れています。

##  DevTools とは {: #devtools }

このようなドキュメントでは、Chrome DevTools の [Network] パネルを使用して、CRP のコンセプトを説明している場合がありますが、DevTools は現在、CRP の測定に最適というわけではありません。クリティカルなリソースを特定する仕組みが組み込まれていないためです。
クリティカルなリソースを特定するには、[Lighthouse](#lighthouse) の監査を実行します。


<a href="analyzing-crp" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Analyzing CRP">
  <button>次のトピック: クリティカル レンダリング パスのパフォーマンスを分析する</button>
</a>


{# wf_devsite_translation #}
