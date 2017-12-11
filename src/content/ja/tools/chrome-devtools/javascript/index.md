project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: このインタラクティブなチュートリアルでは、Chrome DevTools を使用して JavaScript をデバッグします。

{# wf_updated_on:2017-01-04 #}
{# wf_published_on:2017-01-04 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

<!-- TODO
     make demo responsive
-->

# Chrome DevTools で JavaScript をデバッグする {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

このインタラクティブなチュートリアルでは、Chrome DevTools で JavaScript をデバッグするための基本的なワークフローを順を追って説明します。
このチュートリアルでは、1 つの特定の問題をデバッグする方法について説明しますが、この一般的なワークフローは、あらゆるタイプの JavaScript のバグをデバッグするのに役立ちます。



`console.log()` を使用してコードのバグを探し、修正している方は、このチュートリアルで概要を説明しているワークフローの採用を検討してください。
多くの場合、このワークフローの方が速く効率的です。


##  ステップ 1: バグを再現する{: #step-1 }

デバッグを始めるには、必ず最初にバグを再現する必要があります。「バグを再現する」とは、バグを一貫して発生させる一連のアクションを特定することです。
バグを何度も発生させる必要がある場合もあるため、不要なステップは排除してください。


以下の手順に従って、このチュートリアルで修正するバグを再現します。


1. 以下の[**デモを開く**] をクリックして、新しいタブでデモを開きます。

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>デモを開く</button>
     </a>

1. デモで、[**Number 1**] に `5` を入力します。
1. [**Number 2**] に `1` を入力します。
1. [**Add Number 1 and Number 2**] をクリックします。
1. 入力ボタンの下のラベルを確認してください。`5 + 1 = 51` と表示されています。

この結果は間違いです。結果は `6` になる必要があります。このバグを、これから修正します。


##  ステップ 2: ブレークポイントでコードを一時停止する

DevTools を使用すると、コードの実行中にコードを一時停止し、その時点におけるすべての変数の値を調べることができます。
コードを一時停止するためのツールは、**ブレークポイント**と呼ばれます。
さっそく試してみましょう。

1. <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> キー（Mac）または <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> キー（Windows、Linux）を押して、デモで DevTools を開きます。



1. [**Sources**] タブをクリックします。

<!-- TODO add a screenshot.Don't create the screenshot until demo design is
     finished.Add it here rather than previous screenshot in case Sources
     is hidden -->

1. [**Event Listener Breakpoints**] をクリックして、セクションを展開します。DevTools に、[**Animation**] や [**Clipboard**] などの展開可能なイベント カテゴリのリストが表示されます。

<!-- TODO or maybe add it here -->

1. [**Mouse**] イベント カテゴリの横にある [**Expand**] ![展開アイコン](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline} をクリックします。

   DevTools に、[**click**] など、チェックボックスが横にあるマウスイベントのリストが表示されます。
1. [**click**] チェックボックスをオンにします。


     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="DevTools opened on the demo, with the Sources panel in focus
              and click event listener breakpoints enabled."
       <figcaption>
         <b>図 1</b>: デモで開かれた DevTools。[Sources] パネルが表示されており、クリック イベント リスナのブレークポイントが有効になっています。

         DevTools ウィンドウが大きい場合、[<b>Event Listener Breakpoints</b>] ペインは左下ではなく、スクリーンショットのように右側に表示されます。</figcaption>
     </figure>

1. デモに戻り、[**Add Number 1 and Number 2**] を再度押します。DevTools はデモを一時停止し、[**Sources**] パネルでコード行をハイライト表示します。DevTools では次のコード行がハイライト表示されています。

       `function onClick() {`

[**click**] チェックボックスをオンにすると、すべての `click` イベントにイベントベースのブレークポイントが設定されます。
任意のノードがクリックされたときに、そのノードに `click` ハンドラがあると、DevTools はそのノードの `click` ハンドラの最初の行で自動的に一時停止します。



注: このブレークポイントは、DevTools で提供される多様なブレークポイントの 1 つです。デバッグする問題のタイプに応じて、異なるブレークポイントを使用する必要があります。


[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

##  ステップ 3: コードをステップ実行する

バグの一般的な原因の 1 つは、スクリプトの実行順序が間違っていることです。
コードをステップ実行すると、コードを 1 行ずつ実行して、予想とは異なる順序で実行されているコード行を見つけることができます。
さっそく試してみましょう。

1. DevTools の [**Sources**] パネルで、[**Step into next function call**] ![Step into next function call][into]{:.devtools-inline} をクリックし、`onClick()` 関数を 1 行ずつステップ実行します。


   DevTools では次のコード行がハイライト表示されます。

       `if (inputsAreEmpty()) {` 

1. [**Step over next function call**] ![Step over next function call][over]{:.devtools-inline} をクリックします。
DevTools は、ステップ実行せずに、`inputsAreEmpty()` を実行します。DevTools が数行のコードをスキップしていることに注意してください。これは、`inputsAreEmpty()` が false と評価されたため、`if` 文のコードブロックが実行されなかったからです。


以上がコードをステップ実行する際の基本的な考え方です。`get-started.js` 内のコードを調べると、`updateLabel()` 関数のどこかにバグがあることがわかります。
コードの各行をステップ実行する代わりに、別のタイプのブレークポイントを使用すると、バグがある箇所の付近でコードを一時停止することができます。



[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

##  ステップ 4: 別のブレークポイントを設定する

コード行のブレークポイントは、最も一般的なタイプのブレークポイントです。特定のコード行で一時停止したい場合は、コード行のブレークポイントを使用します。
さっそく試してみましょう。

1. `updateLabel()` の最後のコード行には、次のようなコードがあります。

       `label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;`

1. コードの左側には、この特定のコードの行番号 **32** が表示されています。
**32** をクリックします。DevTools により、**32** の上に青いアイコンが配置されます。
このアイコンは、この行にコード行のブレークポイントがあることを示します。
   これで、DevTools は、このコード行が実行される前に常に一時停止します。
1. [**Resume script execution**] ![Resume script execution][resume]{:.devtools-inline} をクリックします。
スクリプトは、ブレークポイントを設定したコード行に到達するまで実行されます。
1. 既に実行された `updateLabel()` のコード行を確認します。DevTools で、`addend1`、`addend2`、および `sum` の値が出力されています。

`sum` の値に問題がありそうです。この値は、数字である必要がありますが、文字列として評価されているようです。
これがバグの原因であると考えられます。

##  ステップ 5: 変数値をチェックする

バグのもう 1 つの一般的な原因は、変数または関数が予想とは異なる値を生成することです。
多くのデベロッパーは `console.log()` を使用して値の変化を追っていますが、`console.log()` による方法は手間がかかり、効率が悪くなる場合があります。理由は 2 つあります。
まず、`console.log()` を何回も呼び出すようにコードを手動で編集しなければならない場合があります。
さらに、どの変数がバグに関連しているかを特定できていない場合は、多くの変数をログに出力しなければなりません。


DevTools では、`console.log()` の代替ツールの 1 つとして Watch Expression を使用できます。Watch Expression を使用して、変数値の経時的な変化を監視します。名前が示しているように、Watch Expression は変数以外にも使用できます。
任意の有効な JavaScript 式を Watch Expression に保存することもできます。
さっそく試してみましょう。

1. DevTools の [**Sources**] パネルで、[**Watch**] をクリックします。セクションが展開します。
1. [**Add Expression**] ![Add Expression][add]{:.devtools-inline} をクリックします。
1. `typeof sum` を入力します。
1. <kbd>Enter</kbd> キーを押します。DevTools に `typeof sum: "string"` が表示されます。コロンの右側の値が Watch Expression の結果です。


     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="[Watch Expression] ペイン"
       <figcaption>
         <b>図 1</b>:  <code>typeof sum</code> Watch Expression を作成した後の [Watch Expression] ペイン（右下）。
         DevTools ウィンドウが大きい場合、[Watch Expression] ペインは、右側の [<b>Event Listener Breakpoints</b>] ペインの上に表示されます。</figcaption>
     </figure>

予想どおり、`sum` は、数字ではなく、文字列として評価されています。
これがデモのバグの原因です。

DevTools には `console.log()` に代わるもう 1 つの代替ツール、Console があります。Console を使用して、任意の JavaScript 文を評価します。通常、デベロッパーは Console を使用して、デバッグ時に変数値を上書きします。


ここでは、Console を使用して、見つけたバグの修正案をテストします。
さっそく試してみましょう。

1. [Console] ドロワーを開いていない場合は、<kbd>Escape</kbd> キーを押してドロワーを開きます。
[Console] ドロワーは、DevTools ウィンドウの下部に表示されます。
1. [Console] ドロワーに `parseInt(addend1) + parseInt(addend2)` と入力します。
1. <kbd>Enter</kbd> キーを押します。DevTools は文を評価し、`6` を出力します。これは、デモで生成されるべき結果です。


     <figure>
       <img src="imgs/get-started-console.png"
         alt="文を評価した後の [Console] ドロワー。"
       <figcaption>
         <b>図 1</b>:  <code>parseInt(addend1) + parseInt(addend2)</code> を評価した後の [Console] ドロワー。</figcaption>


     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

##  ステップ 6: 修正を適用する

既にバグの修正方法は特定しています。あとはコードを編集してデモを再度実行し、正しく修正されたか確認するだけです。
修正を適用するために DevTools を閉じる必要はありません。
DevTools UI 内で JavaScript コードを直接編集できます。
さっそく試してみましょう。

1. DevTools の [**Sources**] パネルのコードエディタで、`var sum = addend1 + addend2` を `var sum = parseInt(addend1) + parseInt(addend2);` に置き替えます。この行は、現在一時停止している行の 1 つ上の行です。
1. <kbd>Command</kbd>+<kbd>S</kbd> キー（Mac）または <kbd>Control</kbd>+<kbd>S</kbd> キー（Windows、Linux）を押して変更を保存します。コードの背景が赤に変更され、DevTools 内でスクリプトが変更されたことが示されます。
1. [**Deactivate breakpoints**] ![Deactivate breakpoints][deactivate]{:.devtools-inline} をクリックします。コードの背景が青に変わり、スクリプトがアクティブになっていることが示されます。このように設定されていると、DevTools では、設定済みのブレークポイントを無視します。
1. [**Resume script execution**] ![Resume script execution][resume]{:.devtools-inline} をクリックします。
1. さまざまな値をデモに入力してみてください。デモで合計が正しく計算されるようになっているはずです。


このワークフローでは、ブラウザで実行されているコードのみに修正が適用されることに注意してください。
ページを実行しているすべてのユーザー向けのコードが修正されるわけではありません。
すべてのユーザーのコードを修正するには、ページを配信しているサーバーで実行されているコードを修正する必要があります。


[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

##  次のステップ

これで完了です。DevTools で JavaScript をデバッグする方法の基礎を学習しました。

このチュートリアルでは、ブレークポイントの設定方法を 2 つだけ説明しましたが、DevTools では、次のようなその他の方法を多数利用できます。


* 指定した条件が満たされた場合にのみトリガーされる条件付きブレークポイント。
* 捕捉された例外または捕捉されていない例外に対するブレークポイント。
* リクエストした URL が指定した文字列に部分一致した場合にトリガーされる XHR ブレークポイント。


<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="add-breakpoints" target="_blank"
   rel="noopener noreferrer"><button>すべてのブレークポイントを確認する</button></a>

このチュートリアルでは説明していませんが、コードをステップ実行するためのコントロールが他にもいくつかあります。
詳細については、次のリンク先をご覧ください。

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="step-code#stepping_in_action" target="_blank"
   rel="noopener noreferrer"><button>コードのステップ実行について詳しく学習する</button></a>

##  フィードバック

このチュートリアルを改善するために、以下の質問にご回答ください。

{% framebox width="auto" height="auto" %}

<p>チュートリアルを完了できましたか？</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / Yes">はい</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / No">いいえ</button>

</p>このチュートリアルには、探していた情報が含まれていましたか？<p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / Yes">はい</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / No">いいえ</button>

<p>このチュートリアルは長すぎますか？</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / Yes">はい</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / No">いいえ</button>

{% endframebox %}


{# wf_devsite_translation #}
