project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: ブレークポイントを使用して、JavaScript コードを一時停止し、その特定時点の変数の値とコールスタックを調べることができます。

{# wf_updated_on: 2016-07-17 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# ブレークポイントの設定方法 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

ブレークポイントを使用して、JavaScript コードを一時停止し、その特定の時点での変数値とコールスタックを調べることができます。



ブレークポイントを設定したら、[コードをステップ実行する方法](step-code)で、コードをステップ実行して変数とコールスタックを調べる方法を確認してください。




### TL;DR {: .hide-from-toc }
- ブレークポイントを設定する最も基本的な方法は、特定のコード行に手動でブレークポイントを追加することです。ブレークポイントは、特定の条件が満たされたときにのみトリガーされるように設定できます。
- イベント、DOM の変更、捕捉されない例外などの一般的な条件が満たされた場合にトリガーされるブレークポイントを設定することもできます。


##  特定のコード行へのブレークポイントの設定{:#line-number}

調査対象の文がわかっている場合は、特定のコード行にブレークポイントを設定すると便利です。
たとえば、ログイン ワークフローが期待どおりに動作せず、ログインを処理する関数がコードに 1 つだけ存在する場合は、その関数にバグがあると考えてよいでしょう。


このシナリオでは、ブレークポイントをその関数の最初の行に追加します。ブレークポイントをコード行に設定すると、ブレークポイントを削除するか、無効にするか、または条件付きにするまで、コードは必ずその行で一時停止します。



特定のコード行にブレークポイントを設定するには、まず [**Sources**] パネルを開き、左側の [**File Navigator**] ペインからスクリプトを選択します。
[**File Navigator**] が表示されない場合は、[**Toggle file navigator**] ボタン（![[hide / show file navigator] ボタン][fn]{:.devtools-inline}）をクリックします。




**ヒント**:縮小されたコードを操作する場合は、[**pretty print**] ボタン（![[pretty print] ボタン][pp]{:.devtools-inline}）をクリックして読み取り可能にします。


 

ソースコードの左側には、行番号が表示されます。この領域は、**行番号ガター**と呼ばれます。
行番号ガター内をクリックして、そのコード行にブレークポイントを追加します。


![行番号ブレークポイント][lnb]

式が複数の行にまたがっているときに、式の途中に行のブレークポイントを配置した場合は、DevTools によりブレークポイントが次に式に設定されます。
たとえば、以下のスクリーンショットの 4 行目にブレークポイントを設定しようとすると、DevTools によって 6 行目にブレークポイントが設定されます。


![式の途中のブレークポイント](imgs/mid-expression-breakpoint.png)

[pp]: imgs/pretty-print.png
[fn]: imgs/file-navigator.png
[lnb]: imgs/line-number-breakpoint.png

###  行番号ブレークポイントを条件付きにする

条件付きブレークポイントは、指定した条件が満たされた場合にのみトリガーされます。


まだブレークポイントが設定されていない行番号を右クリックし、[**Add conditional breakpoint**] をクリックして条件付きブレークポイントを作成します。
ブレークポイントを既にコード行に追加していて、そのブレークポイントを条件付きにする場合は、右クリックして [**Edit breakpoint**] をクリックします。


テキスト項目に条件を入力し、<kbd>Enter</kbd> キーを押します。

![条件の追加][ac]

条件付きブレークポイントは金色で表されます。 

![条件付きブレークポイント][cb]

[ac]: imgs/adding-condition.png
[cb]: imgs/conditional-breakpoint.png

###  行番号ブレークポイントの削除または無効化

ブレークポイントを一時的に無視する場合は、無効にします。
**行番号ガター**内を右クリックし、[**Disable breakpoint**] を選択します。


![ブレークポイントの無効化][db]

ブレークポイントが不要になった場合は、削除します。**行番号ガター**内を右クリックし、[**Remove breakpoint**] を選択します。


すべてのスクリプトのすべての行番号のブレークポイントを一箇所で管理することもできます。
その場所は、[**Sources**] パネルの [**Breakpoints**] ペインです。


[**Breakpoints**] ペイン UI からブレークポイントを削除するには、ブレークポイントを右クリックして [**Remove breakpoint**] を選択します。


![[Breakpoints] ペイン][bp]

このペインで任意のブレークポイントを無効にするには、そのチェックボックスを無効にします。

すべてのブレークポイントを無効にするには、このペインで右クリックし、[**Deactivate breakpoints**] を選択します。
これは、[**Disable All Breakpoints**] オプションを選択した場合と同じ結果になります。


[**Sources**] パネルにある [**deactivate breakpoints**] ボタン（![[deactivate breakpoints] ボタン][dbb]{:.devtools-inline}）をクリックしてすべてのブレークポイントを無効にすることもできます。




[db]: imgs/disable-breakpoint.png
[bp]: imgs/breakpoints-pane.png
[dbb]: imgs/deactivate-breakpoints-button.png

##  DOM の変更に対するブレークポイントの設定{:#dom}

DOM ノードを不適切に変更、削除、または追加するバグがコードにある場合は、DOM 変更ブレークポイントを設定します。


DevTools を使用すると、コード内でこの変更の原因を手動で探すことなく、ノードにブレークポイントを設定することができます。
ノードまたは場合によってはその子ノードが追加、削除、または変更されるたびに、DevTools はページを一時停止して、ノードの追加、削除、または変更を引き起こしているコード行を表示します。




DOM 変更ブレークポイントを設定する方法を学習するためのライブデモを以下に示します。[**Increment**] をクリックすると、[**Count**] の値が 1 ずつインクリメントされます。
お試しください。

このインタラクティブなチュートリアルの目標は、[**Count**] が増加するとトリガーされる DOM 変更ブレークポイントを設定して、[**Count**] を変更しているコードを調査できるようにすることです。



{% framebox height="auto" %}
<p><b>DOM 変更ブレークポイントのデモ</b></p>
<button>Increment</button>
<p>Count: <span>0</span></p>
<script>
var buttons = document.querySelectorAll('button');
var increment = buttons[0];
var toggle = buttons[1];
var count = document.querySelector('span');
increment.addEventListener('click', function() {
  count.textContent = parseInt(count.textContent) + 1;
});
</script>
{% endframebox %}

**DOM 変更ブレークポイントを追加するには**、次のようにします。

1. [**Count**] を右クリックして、[**Inspect**] を選択します。DevTools ではノードが青色でハイライト表示されます。
これは `<p>` ノードです。ノードをダブルクリックして展開し、その内容を確認することで、適切なノードが表示されていることを確認できます。



1. ハイライト表示されたノードを右クリックして、[**Break on**] > [**Subtree Modifications**] を選択します。
ノードの左側の青いアイコン ![DOM ブレークポイント アイコン][icon]{:.devtools-inline} は、そのノードに DOM ブレークポイントが設定されていることを示します。

青い背景に青いアイコンが表示されているため、ノードがハイライト表示されているときは、アイコンが見づらくなります。



1. デモに戻り、[**Increment**] をクリックします。DevTools はページを一時停止して、[**Sources**] を開き、変更を引き起こしているスクリプト内のコード行をハイライト表示します。



1. [**Resume script execution**] ![[resume script execution] ボタン][resume]{:.devtools-inline} を 2 回押して、スクリプトの実行を再開します。

カウント テキストが削除されるときにブレークポイントが一度トリガーされ、新しいカウントでそのテキストがアップデートされるときに再度ブレークポイントがトリガーされるため、このボタンを 2 回押す必要があります。



[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

選択したノードの属性が変更されたとき、または選択したノードが削除された場合に中断するには、上記のステップ 2 で、[**Subtree Modifications**] の代わりに、[**Attributes modifications**] または [**Node Removal**] を選択します。



ヒント: これらのブレークポイントは排他的ではありません。単一のノードで、これらのブレークポイントのうち 2 つまたは 3 つすべてを同時に有効化できます。

**ブレークポイントを一時的にオフにするには**、次のようにします。

1. DevTools で [**Elements**] を表示します。
1. [**DOM Breakpoints**] をクリックします。DevTools ウィンドウが小さいと、オーバーフローメニュー ![オーバーフローメニュー][overflow]{:.devtools-inline} の背後に [**DOM Breakpoints**] が隠れている場合があります。
チェックボックス（テキスト `p` の横）と [**Subtree Modified**]（`p` の下）が表示されます。
1. [**Subtree Modified**] の横のチェックボックスをオフにします。
1. [**Increment**] を再度クリックしてみてください。
カウントがインクリメントされますが、DevTools はページを一時停止しません。


ヒント: `p` にカーソルを合わせると、ビューポートでノードがハイライト表示されます。[**Elements**] でノードを選択するには、`p` をクリックします。


**ブレークポイントを削除するには**、次のようにします。

1. [**DOM Breakpoints**] を表示します。
1. 削除するブレークポイントを右クリックして、[**Remove breakpoint**] を選択します。


[icon]: imgs/dom-breakpoint-icon.png
[overflow]: imgs/overflow.png

###  DOM 変更ブレークポイントのタイプの詳細

各タイプの DOM 変更ブレークポイントがトリガーされる厳密なタイミングとその方法の詳細は次のとおりです。


* **Subtree modifications**: 現在選択されているノードの子が削除、追加、または子の内容が変更されたときにトリガーされます。
子ノードの属性が変更された場合、または現在選択されているノードが変更された場合はトリガーされません。



* **Attributes modifications**: 現在選択されているノードに対して属性が追加または削除された場合、あるいは属性値が変更された場合にトリガーされます。


* **Node Removal**: 現在選択されているノードが削除された場合にトリガーされます。

##  XHR での中断

XHR でブレークポイントをトリガーする方法は 2 つあります。それは、任意の XHR が XHR ライフサイクルの特定のステージ（`readystatechange` や `load` など）に到達した場合にトリガーする方法と、XHR の URL が特定の文字列に一致した場合にトリガーする方法です。

 

XHR ライフサイクルの特定のステージで中断する場合は、[[event listener breakpoints] ペイン](#events)で [**XHR**] カテゴリをオンにします。


XHR の URL が特定の文字列に一致した場合に中断するには、[**Sources**] パネルの [**XHR Breakpoints**] ペインを使用します。
 

![[XHR Breakpoints] ペイン][xbp]

[xbp]: imgs/xhr-breakpoints-pane.png

プラス記号のボタンをクリックすると、新しいブレークポイント パターンを追加できます。テキスト項目に文字列を入力し、<kbd>Enter</kbd> キーを押して保存します。


**ヒント**:プラス記号をクリックしてすぐに <kbd>Enter</kbd> キーを押すと、XHR の送信前にブレークポイントをトリガーできます。


##  イベント発生時に中断{:#events}

[**Sources**] パネルの [**Event Listener Breakpoints**] ペインを使用すると、特定のイベント（`click` など）やイベントのカテゴリ（`mouse` イベントなど）の発生時に中断できます。



![[event listener breakpoints] ペイン][elbp]

最上位はイベントのカテゴリを表します。これらのチェックボックスのいずれかをオンにすると、そのカテゴリのいずれかのイベントがトリガーされるたびに一時停止できます。
最上位のカテゴリを展開すると、そのカテゴリに含まれるイベントが表示されます。


特定のイベントを監視する場合は、そのイベントが属している最上位のカテゴリを探し、ターゲット イベントの横にあるチェックボックスをオンにします。


![展開された [event listener breakpoints] ペイン][eelbp]

[elbp]: imgs/event-listener-breakpoints-pane.png

[eelbp]: imgs/expanded-event-listener-breakpoints-pane.png

##  例外のブレークポイント{:#exceptions}

例外のブレークポイントを使用して、例外がスローされた場合にスクリプトを一時停止し、例外をスローしているコード行を表示します。



以下のデモにはバグがあります。以下の手順に従い、例外のブレークポイントを使用してバグを修正する方法を説明します。


{% framebox height="auto" width="auto" %}
<button>Print Random Number</button>
<p>Random Number: <span></span></p>
<script type="text/javascript">
  var nodes = {};
  nodes.button = document.querySelector('button');
  nodes.num = document.querySelector('span');
  nodes.button.addEventListener('click', function onClick() {
    nodes.number.textContent = Math.random();
  });
</script>
{% endframebox %}

1. [**Print Random Number**] をクリックします。ボタンの下の [**Random Number**] ラベルに乱数が出力されるはずですが、何も表示されません。このバグを、これから修正します。
1. <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> キー（Mac）または <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> キー（Windows、Linux）を押して、DevTools を開きます。
1. [**Sources**] タブをクリックします。
1. [**Pause on exceptions**] ![Pause on exceptions][pause on exception]{:.devtools-inline} をクリックします。
1. [**Print Random Number**] を再度押し、ブレークポイントをトリガーします。DevTools は、`nodes.number.textContent = Math.random();` を含むコード行で一時停止します。
以上が、例外のブレークポイントを使うための説明になります。
以降では、この特定のバグを修正する方法について説明します。
1. DevTools が現在一時停止しているコード行で、`nodes` にカーソルを合わせ、オブジェクトが適切に参照されていることを確認します。このオブジェクトには、`button`、`num`、および `__proto__` の 3 つのプロパティが含まれています。これらのオブジェクトには問題がなく、バグの原因ではありません。
1. `number` にカーソルを合わせます。このプロパティが `undefined` と評価されているはずです。これがバグの原因です。このプロパティの名前は、`number` ではなく、`num` にする必要があります。
1. DevTools で、`nodes.number.textContent` を `nodes.num.textContent` に変更します。
1. <kbd>Command</kbd>+<kbd>S</kbd> キー（Mac）または <kbd>Control</kbd>+<kbd>S</kbd> キー（Windows、Linux）を押して、変更を保存します。保存すると、DevTools によって自動でスクリプトの実行が再開されます。
1. [**Print Random Number**] を再度押して、バグが修正されたことを確認します。
ボタンをクリックした後、DevTools は一時停止しなくなります。つまり、スクリプトが例外をスローしなくなります。


[pause on exception]: /web/tools/chrome-devtools/images/pause-on-exception.png


{# wf_devsite_translation #}
