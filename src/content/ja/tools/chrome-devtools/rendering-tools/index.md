project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:ユーザーは、ページがインタラクティブでスムーズに操作できることを期待します。ピクセル パイプラインの各段階で、問題が発生する可能性があります。ここでは、実行時のパフォーマンスを低下させる一般的な問題を特定して解決するためのツールと戦略について説明します。

{# wf_updated_on:2016-03-15 #}
{# wf_published_on:2015-04-13 #}

# 実行時のパフォーマンスの分析 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

ユーザーは、ページがインタラクティブでスムーズに操作できることを期待します。ピクセル パイプラインの各段階で、問題が発生する可能性があります。
ここでは、実行時のパフォーマンスを低下させる一般的な問題を特定して解決するためのツールと戦略について説明します。




### TL;DR {: .hide-from-toc }
- ブラウザがレイアウトを再計算することになるような JavaScript は記述しません。読み取り関数と書き込み関数を分け、読み取り関数を先に実行します。
- 複雑すぎる CSS を記述しません。CSS の使用を少なくし、CSS セレクターをシンプルに保ちます。
- なるべく、レイアウトを設定しません。レイアウトをまったくトリガーしない CSS を選択します。
- ペイントは、他のレンダリング アクティビティよりも時間がかかる場合があるため、ペイントのボトルネックに注意します。


## JavaScript 

JavaScript による計算、特に見た目が大きく変わるような計算は、アプリケーションのパフォーマンスを低下させる可能性があります。
不適切なタイミングで実行されたり、実行時間が長くなる JavaScript によってユーザーの操作を妨げないようにします。


###  ツール

**Timeline** [記録][recording]を行い、時間がかかっている疑いのある **Evaluate Script** イベントを探します。
該当するイベントが見つかったら、[JS プロファイラ][profiler]を有効にし、記録を再実行して、呼び出された JS 関数と各関数にかかった所要時間に関する詳細情報を取得します。




JavaScript 内で少しでも問題のある箇所を見つけたら、必要に応じて分析を次のレベルに引き上げ、JavaScript CPU プロファイルを収集します。CPU プロファイルでは、ページの関数内で実行時間がかかっている箇所が示されます。CPU プロファイルの作成方法については、[JavaScript 実行の高速化][cpu]をご覧ください。




[profiler]: ../evaluate-performance/timeline-tool#profile-js
[cpu]: js-execution

###  問題点

以下の表では、JavaScript に共通する問題と、可能な解決策をいくつか示します。

<table>
  <thead>
      <th>問題</th>
      <th>例</th>
      <th>解決策</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">レスポンスやアニメーションに影響する、負荷の高い入力ハンドラ。</td>
      <td data-th="Example">タッチ、パララックス スクロール。</td>
      <td data-th="Solution">タッチやスクロールをブラウザに処理させるか、リスナーとのバインドをできる限り遅らせます（<a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Paul Lewis 氏の実行時のパフォーマンス チェックリストの負荷の高い入力ハンドラ</a>を参照）。</td>
    </tr>
    <tr>
      <td data-th="Problem">レスポンス、アニメーション、読み込みに影響する、不適切なタイミングで実行される JavaScript。</td>
      <td data-th="Example">ページ読み込み直後のユーザー スクロール、setTimeout / setInterval。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">JavaScript 実行の最適化</a>:  <code>requestAnimationFrame</code> の使用、フレーム全体への DOM 操作の拡張、Web Worker の使用。</td>
    </tr>
    <tr>
      <td data-th="Problem">レスポンスに影響する、実行に時間がかかるJavaScript。</td>
      <td data-th="Example">JS に作業が占有され、<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded イベント</a>がストールする。</td>
      <td data-th="Solution">純粋な計算処理は <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Worker</a> に移動する。DOM へのアクセスが必要な場合は、 <code>requestAnimationFrame</code> を使用（<a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">JavaScript 実行の最適化</a>を参照）。</td>
    </tr>
    <tr>
      <td data-th="Problem">レスポンスやアニメーションに影響する、ガーベージ コレクションの対象になりそうなスクリプト。</td>
      <td data-th="Example">いたるところで、ガーベージ コレクションが行われる可能性がある。</td>
      <td data-th="Solution">ガーベージ コレクションの対象になりそうなスクリプトの記述を減らす（<a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Paul Lewis 氏の実行時のパフォーマンス チェックリストのアニメーションにおけるガーベージ コレクション</a>を参照)。</td>
    </tr>
  </tbody>
</table>

##  スタイル 

スタイルの変更は負荷の高い処理です。特に DOM の複数の要素に影響する変更は、負荷が高くなります。
要素にスタイルを適用すると、必ずブラウザによって関連するすべての要素への影響が考慮され、レイアウトが再計算されて、再度ペイントが行われます。



関連ガイド:

* [スタイル計算のスコープと複雑さの軽減](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)


###  ツール

**Timeline** [記録][recording] を行います。記録を調べ、時間がかかっている **Recalculate Style** イベント（紫色で表示）を探します。


**Recalculate Style** イベントをクリックして、**詳細**ペインに詳細情報を表示します。
スタイルの変更に時間がかかると、パフォーマンスに影響します。
スタイル計算が多数の要素に影響している場合は、別の箇所にも改善の余地があります。


![時間がかかるスタイルの再計算](imgs/recalculate-style.png)

**Recalculate Style** イベントの影響を減らすには、以下の対策を行います。

* [CSS トリガー](https://csstriggers.com)を使って、レイアウト、ペイント、およびコンポジットをトリガーする CSS プロパティを確認します。
このようなプロパティは、レンダリングのパフォーマンスに悪影響を及ぼします。
* これらを影響の少ないプロパティに切り替えます。詳しいガイダンスについては、[コンポジタ専用プロパティのみの使用、およびレイヤー数の管理][compositor]をご覧ください。


[compositor]: /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count

###  問題点

以下の表に、一般的なスタイルの問題と、可能な解決策をいくつか示します。


<table>
  <thead>
      <th>問題</th>
      <th>例</th>
      <th>解決策</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">レスポンスやアニメーションに影響する、負荷の高いスタイル計算。</td>
      <td data-th="Example">幅、高さ、位置など、要素のジオメトリを変更するすべての CSS プロパティ。ブラウザは他のすべての要素をチェックして、レイアウトをやり直す必要があります。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">レイアウトをトリガーする CSS を使用しません</a>。</td>
    </tr>
    <tr>
      <td data-th="Problem">レスポンスやアニメーションに影響する、複雑なセレクター。</td>
      <td data-th="Example">セレクターをネストすると、ブラウザは、親や子を含め、他のすべての要素に関するあらゆる情報を把握します。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">1 つのクラスだけで CSS の要素を参照します</a>。</td>
    </tr>
  </tbody>
</table>

関連ガイド:

* [スタイル計算のスコープと複雑さの軽減](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)


##  レイアウト 

レイアウト（Firefox ではリフロー）とはブラウザが利用するプロセスであり、ページ上のすべての要素の位置とサイズを計算します。
ウェブのレイアウト モデルでは、1 つの要素が他の複数の要素に影響を与える可能性があります。たとえば、`<body>` 要素の幅は一般的にその子の幅に影響を与え、かつツリーの上から下まで影響を与えます。
このため、プロセスはブラウザにとって非常に複雑になります。


一般的な経験則として、DOM から返されたジオメトリ値をフレームが完了する前に要求すると、「レイアウトの同期が強制的に行われる」のがわかります。このようなレイアウトの同期が繰り返し頻繁に行われたり、大きな DOM ツリーに対して実行されると、大きなパフォーマンス ボトルネックになる可能性があります。


 

関連ガイド:

* [レイアウト スラッシングの回避](/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [レイアウトの強制同期の診断](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)



###  ツール

Chrome DevTools の **Timeline** を使って、ページでレイアウトの同期が強制的に行われたタイミングを特定します。
このような **Layout** イベントは、赤い縦線で示されます。 

![レイアウトの強制同期](imgs/forced-synchronous-layout.png)

「レイアウト スラッシング」とは、レイアウトの強制的な同期が繰り返し行われる状態のことです。
JavaScript が DOM に対して書き込みと読み取りを繰り返すと、この状態が発生します。その結果、ブラウザはレイアウトを何度も強制的に再計算することになります。
レイアウト スラッシングを見極めるには、レイアウトの同期が複数回強制される警告パターンを探します（上記のスクリーンショットを参照）。



###  問題点

以下の表に、レイアウトの一般的な問題と、可能な解決策をいくつか示します。


<table>
  <thead>
      <th>問題</th>
      <th>例</th>
      <th>解決策</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">レスポンスやアニメーションに影響する、レイアウトの強制同期。</td>
      <td data-th="Example">レンダリング プロセスで手順の繰り返しが行われることになる、ピクセル パイプラインの早い段階でのブラウザによるレイアウトの強制実行。</td>
      <td data-th="Solution">最初にスタイルを一括で読み取り、その後書き込みを行う（<a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">大きく複雑なレイアウトとレイアウト スラッシングの回避</a>を参照）。</td>
    </tr>
  </tbody>
    <tr>
      <td data-th="Problem">レスポンスやアニメーションに影響する、レイアウト スラッシング。</td>
      <td data-th="Example">ブラウザが読み取りと書き込みを交互に繰り返し、ブラウザがレイアウトを何度も再計算することになるループ。</td>
      <td data-th="Solution"><a href="https://github.com/wilsonpage/fastdom">FastDom ライブラリ</a>を使用する、読み取りと書き込みの自動一括操作。</td>
    </tr>
  </tbody>
</table>

##  ペイントとコンポジット 

ペイントとはピクセルを塗りつぶす処理です。多くの場合、レンダリング プロセスの中でも最も負荷の高い処理になります。
ページに何らかの問題を感じる場合は、ペイントに問題がある可能性が高くなります。


コンポジットは、画面に表示するために、ページのペイントされた部分がまとめて置かれている場所です。
多くの場合、コンポジタ専用のプロパティを使用して、まとめてペイントを行わないようにすると、パフォーマンスが大幅に改善します。ただし、レイヤー数の超過には注意が必要です（[コンポジタ専用プロパティのみの使用、およびレイヤー数の管理](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)を参照）。




###  ツール

ペイントの所要時間と発生頻度を調べるには、[**Timeline**] パネルの[ペイント プロファイラ][paint] を有効にして、[記録を行います][recording]。
レンダリング時間の大半をペイント処理が占めている場合は、ペイントに問題があります。
 

![Timeline 記録でペイントに時間がかかっている](imgs/long-paint.png)

ペイントの問題の診断に役立つ詳細設定については、[**Rendering settings**][rendering settings] メニューを確認してください。
 

###  問題点

以下の表に、ペイントとコンポジットの一般的な問題と、可能な解決策をいくつか示します。

<table>
  <thead>
      <th>問題</th>
      <th>例</th>
      <th>解決策</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">レスポンスやアニメーションに影響する、大量のペイント。</td>
      <td data-th="Example">レスポンスやアニメーションに影響する、大きなペイント領域や負荷の高いペイント。</td>
      <td data-th="Solution">ペイントを避け、独自の例やに移動される要素をプロモートして、変換と不透明度を使用する（<a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">ペイントの複雑さの軽減とペイント領域の縮小</a>を参照）。</td>
    </tr>
        <tr>
      <td data-th="Problem">アニメーションに影響する、レイヤの超過。</td>
      <td data-th="Example">アニメーションのパフォーマンスに大きく影響する、translateZ(0) を持つ要素のプロモートが多すぎる。</td>

      <td data-th="Solution">明らかに改善されることがわかっている場合のみ、慎重にレイヤにプロモートする（<a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">コンポジタ専用プロパティのみを使用し、レイヤー数を管理する</a>を参照）。</td>
    </tr>
  </tbody>
</table>


[recording]: ../evaluate-performance/timeline-tool#make-a-recording
[paint]: ../evaluate-performance/timeline-tool#profile-painting
[rendering settings]: ../evaluate-performance/timeline-tool#rendering-settings


{# wf_devsite_translation #}
