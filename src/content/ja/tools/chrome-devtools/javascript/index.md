project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description:Chrome DevTools を使用して JavaScript のバグを見つけて修正する方法を説明します。

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-01-04 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Chrome DevTools で JavaScript をデバッグする {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

このチュートリアルでは、DevTools で JavaScript の問題をデバッグするための基本的なワークフローを説明します。
この記事を読み進めるか、または下にあるこのチュートリアルのビデオ版をご覧ください。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="H0XScE08hy8"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## ステップ 1: バグを再現する {: #reproduce }

デバッグの最初のステップは、バグを一貫して再度発生させる一連のアクションを特定することです。


1. 次の**「デモを開く」** をクリックします。 新しいタブでデモが開きます。

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>デモを開く</button>
     </a>

1. **[Number 1]** テキストボックスに `5` を入力します。
1. **[Number 2]** テキストボックスに `1` を入力します。
1. **[Add Number 1 and Number 2]** をクリックします。 ボタンの下のラベルに `5 + 1 = 51` と表示されます。 結果は `6` になる必要があります。
 このバグを、これから修正します。

     <figure>
       <img src="imgs/bug.png"
         alt="5 + 1 の結果が 51 になっています。結果は 6 になる必要があります。"/>
       <figcaption>
         <b>図 1</b>。 5 + 1 の結果が 51 になっています。結果は 6 になる必要があります。
</figcaption>
     </figure>

## ステップ 2: Sources パネルの UI に精通する {: #sources-ui }

DevTools には、CSS の変更、ページ読み込みパフォーマンスのプロファイリング、ネットワーク リクエストのモニタリングなどのいろいろなタスクのためのいろいろなツールがあります。
 **[Sources]** パネルで JavaScript をデバッグします。


1. <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> キー（Mac）または <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> キー（Windows、Linux）を押して、DevTools を開きます。
 このショートカットを押すと、**[Console]** パネルが開きます。

     <figure>
       <img src="imgs/console.png" alt="[Console] パネル。"/>
       <figcaption>
         <b>図 2</b>。 <b>[Console]</b> パネル。
       </figcaption>
     </figure>

1. **[Sources]** タブをクリックします。

     <figure>
       <img src="imgs/sources.png" alt="[Sources] パネル。"/>
       <figcaption>
         <b>図 3</b>。 <b>[Sources]</b> パネル。
       </figcaption>
     </figure>

**[Sources]** パネルの UI は 3 つの部分からなっています。

<figure>
  <img src="imgs/sources-annotated.png" alt="[Sources] パネルの UI の 3 つの部分。"/>
  <figcaption>
    <b>図 4</b>。 <b>[Sources]</b> パネルの UI の 3 つの部分
</figcaption>
</figure>

1. **[File Navigator]** ペイン。 ページによってリクエストされているすべてのファイルがここにリストされます。
2. **[Code Editor]** ペイン。 **[File Navigator]** ペインでファイルを選択すると、そのファイルの内容がここに表示されます。
3. **[JavaScript Debugging]** ペイン。 ページの JavaScript を検査するための各種ツール。 DevTools ウィンドウの幅が広いときには、このペインが **[Code Editor]** ペインの右側に表示されます。


## ステップ 3: ブレークポイントでコードを一時停止する {: #event-breakpoint }

このような問題をデバッグする一般的な方法は、コードに `console.log()`
ステートメントを多数挿入して、スクリプト実行時のそれぞれの値を検査するというものです。 次に例を示します。

<pre class="prettyprint">function updateLabel() {
  var addend1 = getNumber1();
  <strong>console.log('addend1:', addend1);</strong>
  var addend2 = getNumber2();
  <strong>console.log('addend2:', addend2);</strong>
  var sum = addend1 + addend2;
  <strong>console.log('sum:', sum);</strong>
  label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;
}</pre>

`console.log()` を使用する方法でも目的を達成することはできますが、**ブレークポイント**を使用したほうがより速く処理することができます。
ブレークポイントを使用すると、コードの実行中にコードを一時停止し、その時点におけるすべての値を調べることができます。
 `console.log()` を使用する方法と比べて、ブレークポイントには次の利点があります。

* `console.log()` を使用した場合、ソースコードを手動で開き、関係するコードを探し、`console.log()` ステートメントを挿入し、ページを再読み込みして、Console でメッセージを確認する必要があります。
 ブレークポイントを使用した場合は、コードの構造を知らなくても、関係するコードで一時停止することができます。
* `console.log()` ステートメントには、検査する値を 1 つずつ明示的に指定する必要があります。
 ブレークポイントを使用すると、その時点のすべての変数の値が DevTools に表示されます。
 コードに影響する変数が他にもあったことに気付かされる場合もあります。

このように、ブレークポイントを使用するなら、`console.log()` を使用する方法よりも速くバグを見つけて修正することができます。

先ほどのデモに戻って、このアプリがどのように動作するかを考えると、経験に基づいて、間違いの合計（`5 + 1 = 51`）は **[Add Number 1 and Number 2]** ボタンに関連付けられた `click` イベント リスナーで計算されると推測することができます。
 それで、`click` リスナーが実行されるタイミング前後のコードを一時停止することになります。
 **[Event Listener Breakpoints]**
を使用する場合は、次のとおりに操作します。

1. **[JavaScript Debugging]** ペインで、**[Event Listener Breakpoints]** をクリックしてセクションを展開します。
 DevTools に、**[Animation]** や **[Clipboard]** などの展開可能なイベント カテゴリのリストが表示されます。
1. **[Mouse]** イベント カテゴリの横にある **[Expand]** ![[Expand]
 アイコン](/web/tools/chrome-devtools/images/expand.png) をクリックします{: .devtools-inline}。
   DevTools に **click** や **mousedown** といったマウスイベントのリストが表示されます。 各イベントの横にはチェックボックスがあります。
1. **click** のチェックボックスにチェックを入れます。 これで、DevTools は*いずれかの* `click` イベント リスナーが実行されると自動的に一時停止するようセットアップされます。

     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="click のチェックボックスが有効になっている。"/>
       <figcaption>
         <b>図 5</b>。 <b>click</b> のチェックボックスが有効になっている
       </figcaption>
     </figure>

1. デモに戻って、**[Add Number 1 and Number 2]** を再度クリックします。 DevTools はデモを一時停止し、**[Sources]** パネル内のあるコード行をハイライト表示します。
   DevTools はコードの次の行で一時停止しているはずです。

     <pre class="prettyprint">function onClick() {</pre>

     コードの別の行で一時停止している場合は、正しい行で一時停止するまで、**[Resume Script Execution]** ![Resume
     Script Execution][resume]{:.cdt-inl} を押してください。

     <aside class="note">
       **注**: 想定外の行で一時停止した場合、訪問した各ページの `click` イベント リスナーを登録するブラウザ拡張機能がインストールされています。
 その拡張機能の `click` リスナーで一時停止しました。
 すべての拡張機能を無効にする Incognito Mode を使用して[プライベート モードでブラウジングする][incognito]と、毎回コードの正しい行で一時停止します。
     </aside>

[incognito]: https://support.google.com/chrome/answer/95464

**[Event Listener Breakpoints]** は DevTools で利用可能な数多くの種類のブレークポイントの 1 つに過ぎません。
いろいろあるタイプをすべて覚えておくだけの価値はあります。それぞれのタイプがいろいろな状況で迅速にデバッグするのに非常に役立つからです。
 各タイプをいつどのように使用したらよいかについては、[ブレークポイントでコードを一時停止する][breakpoints]を参照してください。


[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png
[breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints

## ステップ 4: コードをステップ実行する {: #code-stepping }

バグの一般的な原因の 1 つは、スクリプトの実行順序が間違っていることです。
 コードをステップ実行すると、コードを 1 行ずつ実行して、予想とは異なる順序で実行されているコード行を見つけることができます。
 さっそく試してみましょう。

1. DevTools の **[Sources]** パネルで、**[Step into next function call]** ![Step into next function call][into]{:.devtools-inline}
 をクリックし、`onClick()` 関数を 1 行ずつステップ実行します。
   DevTools では次のコード行がハイライト表示されます。

     <pre class="prettyprint">if (inputsAreEmpty()) {</pre>

1. **[Step over next function call]** ![Step over next function call][over]{:.devtools-inline} をクリックします。 DevTools は、ステップ実行せずに、`inputsAreEmpty()` を実行します。
 DevTools が数行のコードをスキップしていることに注意してください。
   これは、`inputsAreEmpty()` が false と評価されたため、`if` 文のコードブロックが実行されなかったからです。


以上がコードをステップ実行する際の基本的な考え方です。 `get-started.js` 内のコードを調べると、`updateLabel()` 関数のどこかにバグがあることがわかります。
 コードの各行をステップ実行する代わりに、別のタイプのブレークポイントを使用すると、バグがあると思われる箇所の付近でコードを一時停止することができます。



[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## ステップ 5: コード行のブレークポイントを設定する {: #line-breakpoint }

コード行のブレークポイントは、最も一般的なタイプのブレークポイントです。 特定のコード行で一時停止したい場合は、コード行のブレークポイントを使用します。



1. `updateLabel()` の最後のコード行は、次のようになっています。

     <pre class="prettyprint">label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;</pre>

1. コードの左側には、この特定のコードの行番号 **32** が表示されています。
 **32** をクリックします。 DevTools により、**32**  の上に青いアイコンが配置されます。
 このアイコンは、この行にコード行のブレークポイントがあることを示します。
   これで、DevTools は、このコード行が実行される前に常に一時停止します。
1. **[Resume script execution]** ![Resume script execution][resume]{:.devtools-inline}
をクリックします。 スクリプトは、行 32 に到達するまで実行されます。
行 29、30、および 31 で、DevTools は各行のセミコロンの右に `addend1`、`addend2`、および `sum` の値を出力します。

     <figure>
       <img src="imgs/line-of-code-breakpoint.png"
         alt="DevTools は行 32 のコード行のブレークポイントで一時停止します。"/>
       <figcaption>
         <b>図 6</b>。 DevTools は行 32 のコード行のブレークポイントで一時停止します
       </figcaption>
     </figure>

## ステップ 6: 変数値をチェックする {: #check-values }

`addend1`、`addend2`、および `sum` の値に問題がありそうです。 これらは引用符で囲まれており、文字として扱われているようです。
  これがバグの原因であると考えられます。
ここでさらに情報を収集しましょう。 DevTools には変数値を調べるためのたくさんのツールがあります。


### 方法 1: [Scope] ペイン {: #scope }

コードのある行で一時停止すると、その時点で定義されているローカル変数とグローバル変数が、それぞれの値とともに **[Scope]** ペインに表示されます。
 クロージャ変数が存在すれば、それも表示されます。
 変数値をダブルクリックすると、値を編集できます。 コード内に一時停止する行がない場合、**[Scope]** ペインは空になります。


<figure>
  <img src="imgs/scope-pane.png"
    alt="[Scope] ペイン。"/>
  <figcaption>
    <b>図 7</b>。 <b>[Scope]</b> ペイン
</figcaption>
</figure>

### 方法 2: Watch Expressions {: #watch-expressions }

**[Watch Expressions]** タブを使用して、変数の値を時間の経過に伴ってモニターすることができます。
名前が示すように、[Watch Expressions] の対象は変数だけに限定されていません。 任意の有効な JavaScript 式を Watch Expression に保存することができます。
 さっそく試してみましょう。

1. **[Watch]** タブをクリックします。
1. **[Add Expression]** ![Add Expression][add] をクリックします{:.devtools-inline}。
1. `typeof sum` と入力します。
1. <kbd>Enter</kbd>を押します。 DevTools に `typeof sum: "string"` が表示されます。 コロンの右側の値が Watch Expression の結果です。

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="[Watch Expression] ペイン。"/>
       <figcaption>
         <b>図 8</b>。 <code>typeof sum</code> Watch Expression を作成した後の [Watch Expression] ペイン（右下）。

         DevTools ウィンドウが大きい場合、[Watch Expression] ペインは、右側の [<b>Event Listener Breakpoints</b>] ペインの上に表示されます。

       </figcaption>
     </figure>

予想どおり、`sum` は、数字ではなく、文字列として評価されています。
 これがバグの原因であることが、ここではっきりしました。

### 方法 3: Console {: #console }

`console.log()` メッセージを表示するだけでなく、任意の JavaScript ステートメントを評価するためにも Console を使用することができます。
 デバッグのために、Console を使用して、バグの潜在的な修正をテストすることができます。
 さっそく試してみましょう。

1. [Console] ドロワーを開いていない場合は、<kbd>Escape</kbd> キーを押してドロワーを開きます。
 ドロワーは DevTools ウィンドウの下部に開きます。
1. Console に `parseInt(addend1) + parseInt(addend2)` を入力します。 `addend1` と `addend2` がスコープ内であるコード行で一時停止しているので、このステートメントは実行されます。
1. <kbd>Enter</kbd>を押します。 DevTools は文を評価し、`6` を出力します。これは、デモで生成されるべき結果です。

     <figure>
       <img src="imgs/get-started-console.png"
         alt="parseInt(addend1) + parseInt(addend2) を評価した後の [Console] ドロワー。"/>
       <figcaption>
         <b>図 9</b>。 <code>parseInt(addend1) + parseInt(addend2)</code> を評価した後の [Console] ドロワー。

       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## ステップ 7: 修正を適用する {: #apply-fix }

バグの修正対象箇所が見つかりました。 あとはコードを編集してデモを再度実行し、正しく修正されたか確認するだけです。
 修正を適用するために DevTools を閉じる必要はありません。
 DevTools UI 内で JavaScript コードを直接編集できます。
 さっそく試してみましょう。

1. **[Resume script execution]** ![Resume script execution][resume]
をクリックします{:.devtools-inline}。
1. **Code Editor** で、行 31 の `var sum = addend1 + addend2` を   `var sum = parseInt(addend1) + parseInt(addend2)` に置き換えます。
1. <kbd>Command</kbd>+<kbd>S</kbd> キー（Mac）または <kbd>Control</kbd>+<kbd>S</kbd> キー（Windows、Linux）を押して変更を保存します。
1. **[Deactivate breakpoints]** ![Deactivate
   breakpoints][deactivate] をクリックします{:.devtools-inline}。 アクティブであることを示す青色に変わります。
 この設定の間、DevTools は設定したすべてのブレークポイントを無視します。
1. いろいろな値でデモを試してみましょう。 デモは正しく計算するようになりました。

Note: このワークフローでは、ブラウザで実行されているコードのみに修正が適用されることに注意してください。
ページを訪問するすべてのユーザーのコードが修正されるわけではありません。 すべてのユーザーのコードを修正するには、サーバー上のコードを修正する必要があります。


[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## 次のステップ {: #next-steps }

これで完了です。JavaScript をデバッグするときに Chrome DevTools を最大限に活用する方法がこれでわかりました。
 このチュートリアルで説明したツールや方法を使うことで、かなりの時間の節約になります。

このチュートリアルでは、ブレークポイントの設定方法を 2 つだけ説明しましたが、 DevTools では、他にも次のような多くの方法を利用できます。


* 指定した条件が満たされた場合にのみトリガーされる条件付きブレークポイント。
* 捕捉された例外または捕捉されていない例外に対するブレークポイント。
* リクエストした URL が指定した文字列に部分一致した場合にトリガーされる XHR ブレークポイント。


各タイプをいつどのように使用したらよいかについては、[ブレークポイントでコードを一時停止する](/web/tools/chrome-devtools/javascript/breakpoints)
を参照してください。

このチュートリアルでは説明していませんが、コードをステップ実行するためのコントロールが他にもいくつかあります。 詳しくは、[行コードをステップ オーバーする](/web/tools/chrome-devtools/javascript/reference#stepping)を参照してください。


## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
