project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: クリティカル レンダリング パスにおけるパフォーマンスのボトルネックの特定および解消法について説明します。

{# wf_updated_on:2014-04-27 #}
{# wf_published_on:2014-03-31 #}

# クリティカル レンダリング パスのパフォーマンスを分析する {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

クリティカル レンダリング パスにおけるパフォーマンスのボトルネックを特定して解消するには、注意が必要なポイントを把握しておく必要があります。
このページでは、実践的な例を取り上げながら、ページの最適化に役立つ一般的なパフォーマンス パターンについて紹介します。




クリティカル レンダリング パスを最適化する目的は、できる限り早くブラウザがページを描画できるようにすることです。ページの高速化は、エンゲージメントの向上、ページの閲覧回数の増加、[コンバージョン率の改善](https://www.google.com/think/multiscreen/success.html)につながります。訪問者が何もない画面を見つめるだけの時間を最小限にするため、「どのリソースのどの順で読み込むか」を最適化することが必要です。

このプロセスを説明するために、まずは最もシンプルなケースから始めて、徐々にリソースやスタイル、アプリケーション ロジックを追加してページを構築していきます。その過程で、ケースごとの最適化を行い、失敗しやすいポイントついても説明します。

これまでは、リソース（CSS、JavaScript、HTML などのファイル）が処理できる状態になったあと、ブラウザ側で行われる処理だけに焦点を当てており、リソースをキャッシュから取得する場合とネットワークから取得する場合の所要時間については考慮していませんでした。ここでは、次の前提条件があるとします。

* サーバーまでのネットワーク ラウンドトリップ（プロパゲーション レイテンシ）は 100 ms
* サーバーの応答時間は、HTML ドキュメントの場合は 100 ms、その他のファイルの場合は 10 ms

##  Hello World サンプル

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom_nostyle.html){: target="_blank" .external }

まずは CSS と JavaScript は使わずに、基本的な HTML マークアップと 1 つの画像から始めましょう。Chrome DevTools でネットワーク タイムラインを開き、リソース ウォーターフォールを確認します。

<img src="images/waterfall-dom.png" alt=""  alt="CRP">

注: このドキュメントでは DevTools を使用して CRP のコンセプトを説明しますが、現在のところ、DevTools は CRP 分析にあまり適してはいません。
詳細については、[DevTools に関するドキュメント](measure-crp#devtools)をご覧ください。


想定どおり、HTML のダウンロードに約 200 ms かかっています。青色の線の透過部分は、ブラウザが応答バイトを受け取っておらず、ネットワーク上で待機している時間を表します。一方、塗りつぶされた部分は、最初の応答バイトを受け取ってからダウンロードが完了するまでの時間を表します。HTML のダウンロード量はわずか（4 K 未満）であるため、1 回のラウンドトリップでファイル全体を取得できます。そのため、HTML ドキュメントを取得するための所要時間は約 200 ms です。この時間の半分はネットワーク上で待機しており、残りの半分はサーバーの応答を待っています。

HTML コンテンツが利用可能になると、ブラウザはバイトを解析してトークンに変換し、DOM ツリーを構築する必要があります。DevTools の下の方には、便宜のために、DOMContentLoaded イベントの時間（216 ms）が表示されています。これは、青色の縦線に相当します。HTML ダウンロードの完了時点と青色の縦線（DOMContentLoaded）の差が、ブラウザで DOM ツリーを構築するのに要した時間です。今回の場合、この時間は数ミリ秒にすぎません。

「awesome photo」が `domContentLoaded` イベントをブロックしていない点にも注目してください。これは、ページの各アセットを待たずに、レンダリング ツリーの構築やページのレンダリングができることを示しています。**初回のレンダリングを高速化する上で、すべてのリソースが必須というわけではありません**。後で、クリティカル レンダリング パスに関するトピックで説明するように、一般に検討対象となるのは、HTML マークアップ、CSS、JavaScript です。画像は、初回のページ レンダリングをブロックしませんが、できる限り早く画像がレンダリングされるように配慮する必要はあります。

ただし、`load` イベント（`onload`）は、画像によってブロックされます。DevTools では、335 ms で `onload` イベントが記録されています。前に説明したとおり、`onload` イベントは、ページに必要な**すべてのリソース**がダウンロードされ、処理が完了した時点を表します。この段階で、ブラウザの読み込み中マークの回転が止まります（ウォーターフォール上の赤色の縦線に相当）。


##  JavaScript と CSS をサンプルに追加する

「Hello World サンプル」ページは、一見するとシンプルに見えますが、内部ではさまざまな処理が実行されていました。また、現実的には HTML 以外の要素も必要になります。CSS スタイルシートと 1 つ以上のスクリプトを組み合わせて、インタラクティブなページにするケースも多くあります。この両者をサンプルに追加して、どうなるか見てみましょう。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_timing.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_timing.html){: target="_blank" .external }

_JavaScript と CSSを追加する前：_

<img src="images/waterfall-dom.png" alt="DOM の CRP" >

_JavaScript と CSS あり:_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM、JS" >

外部 CSS ファイルと JavaScript ファイルを追加すると、2 つのリクエストがウォーターフォールに追加されます。ブラウザは、ほぼ同時にすべてをディスパッチしています。一方、**`domContentLoaded` イベントと `onload` イベントのタイミングの差は大幅に縮まっています**。

何が起きたのでしょう？

* 前述の HTML のみのサンプルとは異なり、今回は CSS ファイルを取得して解析し、CSSOM を構築する必要があります。また、レンダリング ツリーの構築には、DOM と CSSOM の両方が必要です。
* パーサーをブロックする JavaScript ファイルをページに追加したことで、CSS ファイルのダウンロードと解析が完了するまで、`domContentLoaded` イベントがブロックされています。この理由は、JavaScript が CSSOM に対してクエリを実行する場合があるため、JavaScript を実行する前に、CSS ファイルをブロックしてダウンロードを待つ必要があるためです。

**外部スクリプトをインライン スクリプトに置き換えるとどうなるでしょうか。** スクリプトをインラインでページに直接組み込んだとしても、CSSOM が構築されるまで、ブラウザはスクリプトを実行できません。つまり、インライン JavaScript もパーサー ブロックになります。

CSS をブロックしても、インライン スクリプトの方がページのレンダリングが高速になるでしょうか。実際に試してみましょう。

_外部 JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM、JS" >

_インライン JavaScript:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM、CSSOM、インライン JS" >

リクエストは 1 つ減りますが、`onload` と `domContentLoaded` のタイミングは実質同じです。なぜでしょうか。ご存知のとおり、JavaScript がインラインであっても外部ファイルであっても、大きな違いはありません。どちらの場合も、ブラウザは script タグに遭遇するとブロックして、CSSOM が構築されるまで待機します。また、最初のサンプルでは、CSS と JavaScript がブラウザによって同時にダウンロードされ、ほぼ同時にダウンロードが完了していました。よって、今回の場合は JavaScript コードをインライン化しても、あまりメリットはありません。ただし、ページのレンダリングを高速化するための戦略はいくつかあります。

まず、前述したように、インライン スクリプトは常にパーサー ブロックですが、外部スクリプトは、async キーワードを追加してパーサー ブロックではなくすことができます。インライン化を元に戻し、試してみましょう。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_async.html){: target="_blank" .external }

_パーサー ブロック（外部）JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM、JS" >

_非同期（外部）JavaScript:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM、CSSOM、非同期 JS" >

ずっと改善されました。`domContentLoaded` イベントは HTML の解析後すぐに発行されています。ブラウザは JavaScript でブロックせず、他にパーサー ブロック スクリプトは存在しないため、CSSOM の構築も並列して処理できます。

別の方法として、CSS と JavaScript の両方をインライン化するというアプローチもあります。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_inlined.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_inlined.html){: target="_blank" .external }

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM、インライン CSS、インライン JS" >

`domContentLoaded` のタイミングは、前のサンプルとほぼ変わりません。今回は avaScript を非同期にする代わりに、CSS と JavaScript の両方を直接ページにインライン化しています。これにより、HTML ページのサイズはかなり大きくなっていますが、すべてがページ内にあるため、ブラウザで外部リソースの取得を待つ必要がないというメリットがあります。

以上のように、非常にシンプルなページでも、クリティカル レンダリング パスの最適化は簡単ではありません。さまざまなリソース間の依存関係図を把握し、どのリソースが「クリティカル」であるか特定し、そのようなリソースをページに組み込む方法をさまざまな戦略の中から選ぶ必要があります。ただし、ページごとに違いがあるため、対策は 1 つではありません。最適な戦略を特定するには、このようなプロセスを自身で実践する必要があります。

では、これらのことを踏まえて、一般的なパフォーマンス パターンを特定していきましょう。

##  フォーマンス パターン

最もシンプルなページは、CSS、JavaScript、その他のリソースを含まず、HTML マークアップだけで構成されているページです。このページをレンダリングするために、ブラウザはリクエストを開始し、HTML ドキュメントが届くのを待ち、それを解析し、DOM を構築して、ようやく画面上にレンダリングします。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom_nostyle.html){: target="_blank" .external }

<img src="images/analysis-dom.png" alt="Hello World の CRP" >

**T<sub>0</sub> と T<sub>1</sub> の間の時間は、ネットワークとサーバーの処理時間を表します。**ベストケースの場合（HTML ファイルが小さい場合）、1 回 のネットワーク ラウンドトリップでドキュメント全体を取得できます。ファイルが大きい場合は、TCP 転送プロトコルの仕組み上、必要なラウンドトリップ数が増える可能性があります。**つまり、ベストケースにおいては、上記のページのクリティカル レンダリング パスは（最低で）1 回のラウンドトリップになります。**

では、同じページで、外部 CSS ファイルを使用するケースを検討しましょう。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css.html){: target="_blank" .external }

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM の CRP" >

繰り返しになりますが、HTML ドキュメントを取得する際はネットワーク ラウンドトリップが発生し、取得したマークアップから CSS ファイルも必要であることがわかります。つまり、ブラウザは画面上にページをレンダリングするために、サーバーに戻って CSS を取得する必要があります。**結果的に、このページを表示するには最低 2 回のラウンドトリップが発生します。**CSS ファイルの取得に複数回のラウンドトリップが必要になる場合があるので、「最低」で 2 回です。

クリティカル レンダリング パスに関連する用語の定義は次のとおりです。

* ** クリティカル リソース:** 初回のページ レンダリングをブロックする可能性のあるリソース。
* ** クリティカル パス長:** すべてのクリティカル リソースを取得するために必要なラウンドトリップ数または総時間。
* ** クリティカル バイト:** 初回のページ レンダリングに必要な合計バイト数。これは、すべてのクリティカル リソースの転送ファイルサイズの合計になります。最初のサンプルは 1 つのクリティカル リソース（HTML ドキュメント）を含む単一の HTML ページなので、クリティカル パス長は 1 ネットワーク ラウンドトリップ（ファイルサイズが小さい場合）、総クリティカル バイトは HTML ドキュメント自体の転送サイズだけになります。


では、これと上記の HTML + CSS のサンプルにおけるクリティカル パスの特徴を比較してみましょう。

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM の CRP" >

* クリティカル リソースの数は **2** つ
* 最小クリティカル パス長のラウンド トリップ数は **2** 以上
* クリティカル バイト数は **9** KB

レンダリング ツリーの構築には、HTML と CSS の両方が必要です。そのため、HTML と CSS の両方がクリティカル リソースとなります。CSS は、ブラウザが HTML ドキュメントを取得した後にのみ取得可能になるため、クリティカル パス長は、最低で 2 ラウンドトリップとなります。クリティカル バイトは合計 9 KB です。

では、追加の JavaScript ファイルをサンプルに追加しましょう。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_js.html){: target="_blank" .external }

ページの外部 JavaScript アセットとして `app.js` を追加しました。これはパーサー ブロック リソースであり、クリティカル リソースになります。さらに、JavaScript ファイルを実行するには、ブロックして CSSOM を待つ必要があります。JavaScript では CSSOM に対するクエリが可能であるため、ブラウザは、`style.css` がダウンロードされて CSSOM が構築されるまで、一時停止します。

<img src="images/analysis-dom-css-js.png" alt="DOM、CSSOM、JavaScript の CRP" >

ところで、このページの「ネットワーク ウォーターフォール」を確認すると、CSS リクエストと JavaScript リクエストがほぼ同じタイミングで開始されていることがわかります。ブラウザは HTML を取得し、両方のリソースを発見して両方のリクエストを開始しています。そのため、上記ページのクリティカル パスの特徴は、次のようになります。

* クリティカル リソースの数は **3** つ
* 最小クリティカル パス長のラウンド トリップ数は **2** 以上
* クリティカル バイト数は **11** KB

今回のクリティカル リソースは 3 つ、クリティカル バイトは合計で 11 KB です。ただし、CSS と JavaScript は同時に転送できるため、クリティカル パス長は変わらず 2 ラウンドトリップです。**クリティカル レンダリング パスの特徴を把握すると、クリティカル リソースを特定し、ブラウザがリソースの取得をスケジューリングする方法を理解できるようになります。**では、サンプルの考察を続けましょう。

サイト デベロッパーからの情報で、ページに組み込まれている JavaScript はブロック不要であることがわかりました。スクリプトに含まれるアナリティクスや他のコードは、ページのレンダリングをブロックする必要がありません。よって、script タグに「async」属性を追加して、パーサーをブロックしないようにすることができます。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_js_async.html){: target="_blank" .external }

<img src="images/analysis-dom-css-js-async.png" alt="DOM、CSSOM、非同期 JavaScript の CRP" >

非同期スクリプトにはいくつかメリットがあります。

* スクリプトがパーサー ブロックにならず、クリティカル レンダリング パスの一部ではなくなります。
* 他にクリティカル スクリプトがないため、CSS が `domContentLoaded` イベントをブロックする必要もなくなります。
* `domContentLoaded` イベントが早く発生するほど、他のアプリケーション ロジックも早く実行できるようになります。

この結果、最適化されたページでは、クリティカル リソースが 2 つ（HTML と CSS）に戻り、最小クリティカル パス長は 2 ラウンドトリップ、クリティカル バイト数は合計 9 KB です。

最後に、CSS スタイルシートが印刷にのみ必要なケースではどうなるのか見てみましょう。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_nb_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_nb_js_async.html){: target="_blank" .external }

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM、ブロックしない CSS、非同期 JavaScript の CRP" >

style.css リソースは印刷にのみ使用されるため、ブラウザでは、ページをレンダリングする際に CSS をブロックする必要がありません。したがって、DOM 構築が完了した時点で、ブラウザにはページのレンダリングに必要な情報がすべてそろっています。その結果、このページのクリティカル リソースは 1 つ（HTML ドキュメント）、最小クリティカル レンダリング パス長は 1 ラウンドトリップになります。

<a href="optimizing-critical-rendering-path" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Optimizing CRP">
  <button>次のトピック: クリティカル レンダリング パスの最適化</button>
</a>


{# wf_devsite_translation #}
