project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript を使用すると、コンテンツ、スタイル設定、ユーザー操作に対するレスポンスなど、ページに関するあらゆる変更を加えることができます。ただし、JavaScript は DOM の構築をブロックして、ページのレンダリングを遅らせてしまうことがあります。最適なパフォーマンスを実現するには、JavaScript を非同期にして、クリティカル レンダリング パスから不要な JavaScript をすべて取り除く必要があります。

{# wf_updated_on:2014-09-17 #}
{# wf_published_on:2013-12-31 #}

# JavaScript を使用してインタラクティブにする {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

JavaScript を使用すると、コンテンツ、スタイル設定、ユーザー操作に対するレスポンスなど、ページに関するあらゆる変更を加えることができます。
ただし、JavaScript は DOM の構築をブロックして、ページのレンダリングを遅らせてしまうことがあります。
最適なパフォーマンスを実現するには、JavaScript を非同期にして、クリティカル レンダリング パスから不要な JavaScript をすべて取り除く必要があります。



### TL;DR {: .hide-from-toc }
- JavaScript では、DOM と CSSOM のクエリと変更が可能です。
- JavaScript の実行は CSSOM をブロックします。
- JavaScript は非同期であると明示的に宣言されていない場合、DOM の構築をブロックします。


JavaScript はブラウザで実行される動的な言語であり、あらゆる面でページの動作を変更することができます。たとえば、DOM ツリーに要素を追加または削除してコンテンツを変更したり、各要素の CSSOM プロパティを変更したり、ユーザー入力を処理したり、その他にもさまざまな操作が可能です。具体的に説明するため、前に紹介した Hello World サンプルに簡単なインライン スクリプトを追加します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/script.html){: target="_blank" .external }

* JavaScript を使用すると DOM の内部にアクセスして非表示の span ノード（レンダーツリーに表示されなくても、DOM にあるノード）へのリファレンスを取得することができます。リファレンスを取得すると、テキストの変更（.textContent を利用）や、計算済みの表示スタイルのプロパティを「none」から「inline」にオーバーライドすることができます。サンプルページには「**Hello interactive students!**」と表示されます。

* JavaScript では、DOM の要素の新規作成、スタイル設定、追加、削除を行うこともできます。技術的には、ページ全体を単一の大きな JavaScript ファイルにして、1 つずつ要素を作成してスタイル設定を行うことも可能です。ただし、実際には HTML や CSS と連携させる方がはるかに簡単です。この JavaScript 関数の後半では、新しい div 要素を作成し、テキスト コンテンツ、スタイルの設定を行って、body に追加しています。

<img src="images/device-js-small.png"  alt="ページ プレビュー">

ここでは、既存の DOM ノードのコンテンツや CSS スタイルを変更し、まったく新しいノードをドキュメントに追加しました。このページがデザイン賞を受賞することはないでしょうが、JavaScript の持つ力と柔軟性は実証しています。

JavaScript は非常に強力ですが、ページ レンダリングの方法やタイミングについて大きな制限が加わります。

まず、上記のサンプルで、インライン スクリプトがページの下端近くにある点に注目してください。なぜでしょうか。実際に試すとわかりますが、このスクリプトを _span_ 要素の上に移動するとスクリプトは失敗し、ドキュメントで _span_ 要素への参照が見つからないというエラーが出ます。つまり、getElementsByTagName(‘span') が _null_ を返します。これは、重要な特性を示しています。このスクリプトは、ドキュメントに挿入されたそのままの位置で実行されているのです。HTML パーサーが script タグに遭遇すると、DOM 構築のプロセスを一時中断し、JavaScript エンジンに制御を渡します。JavaScript エンジンの実行が完了すると、ブラウザは中断前の位置に戻り、そこから DOM 構築を再開します。

つまり、ページの最後の方にある要素はまだ処理されていないため、スクリプト ブロックでそれらの要素を見つけることはできません。言い換えれば、**インライン スクリプトの実行は、DOM 構築をブロックし、結果的に最初のレンダリングが遅れる**ということです。

このページにスクリプトを導入したことで、DOM だけでなく CSSOM プロパティも、スクリプトによる読み込みと変更が可能であるという、隠れた特性も判明しました。それがまさに、このサンプルで、span 要素の display プロパティを none から inline に変更することによって行っている操作です。その結果として、競合状態が生まれました。

スクリプトを実行する時点で、ブラウザが CSSOM のダウンロードと構築を完了していないと、どうなるでしょうか。答えは単純で、パフォーマンスが低下します。**ブラウザは、CSSOM のダウンロードと構築が完了するまで、スクリプトの実行を遅らせます。**

つまり、JavaScript によって、DOM、CSSOM、JavaScript の実行において新たな依存関係が多く生まれます。これにより、ブラウザによる画面上のページの処理とレンダリングが大幅に遅れる場合があります。

* ドキュメント内のスクリプトの位置が重要です。
* DOM 構築は、script タグに遭遇すると、スクリプトの実行が完了するまで一時中断されます。
* JavaScript では、DOM と CSSOM のクエリと変更が可能です。
* JavaScript の実行は、CSSOM の準備が整うまで、遅延されます。

「クリティカル レンダリング パスの最適化」とは、主に HTML、CSS、JavaScript の依存グラフを理解して最適化することを意味します。

##  パーサー ブロックと非同期 JavaScript

デフォルトでは、JavaScript の実行は「パーサー ブロック」です。ブラウザがドキュメント内でスクリプトに遭遇すると、DOM 構築を一時中断して、JavaScript ランタイムに制御を渡し、スクリプトの実行を待ってから DOM 構築を進めます。これについては、上のサンプルのインライン スクリプトで実際に確認しました。事実、インライン スクリプトは、実行を遅らせる追加コードを記述しなければ必ずパーサー ブロックになります。

script タグによって組み込まれたスクリプトの場合は、どうでしょうか。先ほどのサンプルで、コードを別のファイルに抽出してみましょう。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script.html){: target="_blank" .external }

インライン JavaScript コードの代わりに &lt;script&gt; タグを使用しても、処理はまったく変わらないと思うかもしれません。
実際、どちらの場合もブラウザが一時中断してスクリプトが実行されたあとに、ドキュメントの残りの部分が処理されます。ただし、**JavaScript ファイルが外部にある場合は、ブラウザは一時停止して、スクリプトがディスク、キャッシュ、またはリモート サーバーから取得されるのを待つ必要があります。その結果、クリティカル レンダリング パスに、ミリ秒から秒単位の遅延が加わることになります。**






デフォルトでは、すべての JavaScript はパーサー ブロックです。ブラウザは、スクリプトがページで実行する処理を知りません。そのため、最悪のケースを想定して、パーサーをブロックする必要があります。ただし、ブラウザに対して「ドキュメント内で参照されている場所でスクリプトを実行する必要はない」と伝えれば、ブラウザで DOM 構築を継続して、キャッシュやリモート サーバーからスクリプト ファイルが取得された後など、準備が整った時点でスクリプトを実行させることができます。  

これを実現するには、スクリプトを _async_ として指定します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script_async.html){: target="_blank" .external }

script タグに async キーワードを追加すると、スクリプトの準備が整うのを待つ間、DOM 構築をブロックしないようにブラウザに伝えることができます。この対応により、パフォーマンスを大幅に改善することができます。

<a href="measure-crp" class="gc-analytics-event" data-category="CRP"
    data-label="Next / Measuring CRP">
  <button>次のトピック: クリティカル レンダリング パスの測定</button>
</a>


{# wf_devsite_translation #}
