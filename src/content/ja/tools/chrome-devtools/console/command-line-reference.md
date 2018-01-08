project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

#  コマンドライン API リファレンス {: .page-title }

{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

コマンドライン API には、一般的なタスクを実行するための便利な関数のコレクションが含まれています。これらのタスクには、DOM 要素の選択と調査、読み取り可能な形式でのデータの表示、プロファイラの起動と停止、DOM イベントの監視などがあります。

注: この API は、コンソール内でのみ利用できます。ページ上のスクリプトからコマンドライン API にアクセスすることはできません。


## $_

`$_` は、直前に評価された式の値を返します。

次の例では、単純な式（`2 + 2`）が評価されています。次に `$_` プロパティが評価され、同じ値が含まれています。




![$_ は直前に評価された式](images/recently-evaluated-expression-1.png)

次の例では、評価された式に最初は名前の配列が含まれています。配列の長さを調べるために `$_.length` を評価すると、`$_` に保存されている値が変わり、最後に評価された式の 4 になります。





![新しいコマンドが評価されると、$_ が変わる](images/recently-evaluated-expression-2.png)

## $0～$4

`$0`、`$1`、`$2`、`$3`、`$4` コマンドは、[Elements] パネル内で調査された最後の 5 つの DOM 要素または [Profiles] パネルで選択された最後の 5 つの JavaScript ヒープ オブジェクトの参照履歴として動作します。`$0` は直前に選択された要素または JavaScript オブジェクトを返し、`$1` はその前に選択されたものを返す、のようになります。




次の例では、クラス `medium` を含む要素が [Elements] パネルで選択されています。[Console] ドロワーでは、`$0` が評価され、同じ要素が表示されています。




![$0 の例](images/element-0.png)

次のイメージでは、同じページで別の要素が選択されています。`$0` は、今度は新しく選択された要素を参照し、`$1` は前に選択された要素を返します。



![$1 の例](images/element-1.png)

## $(selector)

`$(selector)` は、指定された CSS セレクターを含む最初の DOM 要素への参照を返します。この関数は、[document.querySelector()](https://docs.webplatform.org/wiki/css/selectors_api/querySelector) 関数のエイリアスです。




次の例は、ドキュメント内の最初の `<img>` 要素への参照を返します。


![$('img') の例](images/selector-img.png)

返された結果を右クリックして、[Reveal in Elements Panel] を選択すると DOM で検索でき、[Scroll in to View] を選択するとページ上に表示できます。



次の例は、現在選択されている要素への参照を返し、その src プロパティを表示しています。

![$('img').src の例](images/selector-img-src.png)

注:  <code>$</code> を使用する jQuery などのライブラリを使用する場合、この機能は上書きされ、 <code>$</code> はそのライブラリの実装に対応します。

## $$(selector)

`$$(selector)` は、指定された CSS セレクターに一致する要素の配列を返します。このコマンドは、[document.querySelectorAll()](https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll) の呼び出しと同じです。




次の例では、`$$()` を使用して、現在のドキュメント内にあるすべての `<img>` 要素の配列を作成し、各要素の `src` プロパティの値を表示しています。



		var images = $$('img');
		for (each in images) {
			console.log(images[each].src);
		}

![$$() を使用してドキュメント内のすべてのイメージを選択し、そのソースを表示する例](images/all-selector.png)

注: スクリプトを実行せずに新しい行を開始するには、コンソールで <kbd class='kbd'>Shift</kbd>+<kbd class='kbd'>Enter</kbd> を押します。

## $x(path)

`$x(path)` は、指定された XPath 式に一致する DOM 要素の配列を返します。


たとえば、次の例では、ページ上のすべての `<p>` 要素が返されます。


		$x("//p")

![XPath セレクターの使用例](images/xpath-p-example.png)

次の例では、`<a>` 要素を含むすべての `<p>` 要素が返されます。


		$x("//p[a]")

![より複雑な XPath セレクターの使用例](images/xpath-p-a-example.png)

## clear()

`clear()` は、履歴のコンソールをクリアします。

		clear();

## copy(object)

`copy(object)` は、指定されたオブジェクトの文字列表現をクリップボードにコピーします。


		copy($0);

## debug(function)

指定した関数が呼び出されると、[Sources] パネル上でデバッガーが起動されてその関数内で中断するため、コードをステップ実行してデバッグできます。



		debug(getData);

![debug() による関数内での中断](images/debug.png)

関数での中断を終了するには `undebug(fn)` を使用し、すべてのブレークポイントを無効にするには UI を使用します。


ブレークポイントの詳細については、[ブレークポイントを使用したデバッグ](/web/tools/chrome-devtools/javascript/add-breakpoints)を参照してください。


## dir(object)

`dir(object)` は、指定されたオブジェクトのすべてのプロパティをオブジェクト スタイルのリストで表示します。このメソッドは、コンソール API の `console.dir()` メソッドのエイリアスです。



次の例は、同じ要素を表示するためにコマンドラインで直接 `document.body` を評価した場合と `dir()` を使用した場合の違いを示しています。



		document.body;
		dir(document.body);

![dir() 関数を使用した場合と使用しない場合の document.body の記録](images/dir.png)

詳細については、コンソール API の [`console.dir()`](/web/tools/chrome-devtools/debug/console/console-reference#console.dir(object)) エントリを参照してください。


## dirxml(object)

`dirxml(object)` は、指定されたオブジェクトの XML 表現を [Elements] タブのように出力します。このメソッドは、[console.dirxml()](https://developer.mozilla.org/en-US/docs/Web/API/Console) メソッドと同等です。



## inspect(object/function) {:#inspect}

`inspect(object/function)` は、指定された要素またはオブジェクトを適切なパネルで開いて選択します。DOM 要素の場合は [Elements] パネル、JavaScript ヒープ オブジェクトの場合は [Profiles] パネルが使用されます。


次の例では、`document.body` を [Elements] パネルで開きます。

		inspect(document.body);

![inspect() を使用した要素の調査](images/inspect.png)

調べる関数を渡すと、[Sources] パネルにドキュメントが調査用に開きます。



## getEventListeners(object)

`getEventListeners(object)` は、指定されたオブジェクトに登録されているイベント リスナーを返します。戻り値は、各登録済みタイプ（"click"、"keydown" など）の配列が含まれているオブジェクトです。各配列のメンバーは、各タイプに登録されているリスナーを記述するオブジェクトです。たとえば、次のメソッドは、ドキュメント オブジェクトに登録されているすべてのイベント リスナーのリストを表示します。









		getEventListeners(document);

![getEventListeners() を使用した場合の出力](images/get-event-listeners.png)

指定したオブジェクトに複数のリスナーが登録されている場合は、配列に各リスナーのメンバーが含まれます。次の例では、「mousedown」イベントについて、#scrollingList 要素に 2 つのイベント リスナーが登録されています。





![複数のリスナー](images/scrolling-list.png)

これらの各オブジェクトをさらに展開して、そのプロパティを調べることができます。

![リスナー オブジェクトの展開されたビュー](images/scrolling-list-expanded.png)

## keys(object)

`keys(object)` は、指定されたオブジェクトに属しているプロパティの名前を含む配列を返します。同じプロパティに関連付けられている値を取得するには、`values()` を使用します。




たとえば、アプリケーションで次のオブジェクトが定義されているとします。


		var player1 = { "name": "Ted", "level": 42 }

`player1` がグローバルな名前空間に定義されていると仮定して（簡潔にするため）、コンソールで `keys(player1)` と `values(player1)` を入力すると、結果は次のようになります。


![keys() と values() メソッドの例](images/keys-values.png)

## monitor(function)

指定した関数が呼び出されると、関数名とその関数の呼び出し時に渡された引数を示すメッセージがコンソールに出力されます。




		function sum(x, y) {
			return x + y;
		}
		monitor(sum);

![monitor() メソッドの例](images/monitor.png)

監視を中止するには、`unmonitor(function)` を使用します。

## monitorEvents(object[, events])

指定されたイベントのいずれかが指定されたオブジェクトで発生すると、イベント オブジェクトがコンソールに出力されます。監視する 1 つのイベント、イベントの配列、またはイベントの定義済みコレクションにマッピングされた一般的なイベントの「タイプ」のいずれかを指定できます。次の例を参照してください。

次のメソッドは、window オブジェクトに対するすべての resize イベントを監視します。

		monitorEvents(window, "resize");

![window の resize イベントの監視](images/monitor-events.png)

次のメソッドは、window オブジェクトに対する "resize" イベントと "scroll" イベントの両方を監視する配列を定義しています。

		monitorEvents(window, ["resize", "scroll"])

イベントの定義済みセットにマッピングされた文字列である、利用可能なイベントの「タイプ」のいずれかを指定することもできます。次の表に、利用可能なイベントタイプとそれに関連付けられているイベント マッピングを示します。




<table class="responsive">
	<thead>
		<tr>
			<th colspan="2">イベントタイプ &amp; 対応するマッピング済みイベント</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>mouse</td>
			<td>"mousedown"、"mouseup"、"click"、"dblclick"、"mousemove"、"mouseover"、"mouseout"、"mousewheel"</td>
		</tr>
		<tr>
			<td>key</td>
			<td>"keydown"、"keyup"、"keypress"、"textInput"</td>
		</tr>
		<tr>
			<td>touch</td>
			<td>"touchstart"、"touchmove"、"touchend"、"touchcancel"</td>
		</tr>
		<tr>
			<td>control</td>
			<td>"resize"、"scroll"、"zoom"、"focus"、"blur"、"select"、"change"、"submit"、"reset"</td>
		</tr>
	</tbody>
</table>

たとえば、次のメソッドは、[Elements] パネルで現在選択されている入力テキスト項目に対して、"key" イベント タイプの対応するすべてのキーイベントを使用しています。



		monitorEvents($0, "key");

テキスト項目に文字を入力した後のサンプル出力を次に示します。

![キーイベントの監視](images/monitor-key.png)

## profile([name]) と profileEnd([name])

`profile()` は、オプションの名前を指定して JavaScript CPU プロファイリング セッションを開始します。`profileEnd()` は、プロファイルを完了し、結果を [Profile] パネルに表示します（[JavaScript 実行の高速化](/web/tools/chrome-devtools/rendering-tools/js-execution) も参照）。





プロファイリングを開始するには、次のようにします。

		profile("My profile")

プロファイリングを停止して [Profiles] パネルに結果を表示するには、次のようにします。

		profileEnd("My profile")

プロファイルは、ネストすることもできます。次の例は、どのような順番でも動作します。

		profile('A');
		profile('B');
		profileEnd('A');
		profileEnd('B');

[Profiles] パネルでの結果:

![グループ化されたプロファイル](images/grouped-profiles.png)


注: 一度に複数の CPU プロファイルを動作させることができ、作成順に閉じる必要はありません。

## table(data[, columns])

オプションの列見出しを指定してデータ オブジェクトを渡すことで、オブジェクト データを表形式で記録します。たとえば、コンソールで表を使用して名前のリストを表示するには、次のようにします。





		var names = {
			0: { firstName: "John", lastName: "Smith" },
			1: { firstName: "Jane", lastName: "Doe" }
		};
		table(names);

![table() メソッドの例](images/table.png)

## undebug(function)

`undebug(function)` は、指定された関数のデバッグを停止して、関数の呼び出し時にデバッガーが起動されないようにします。



		undebug(getData);

## unmonitor(function)

`unmonitor(function)` は、指定された関数の監視を停止します。これは、`monitor(fn)` と組み合わせて使用します。


		unmonitor(getData);

## unmonitorEvents(object[, events])

`unmonitorEvents(object[, events])` は、指定されたオブジェクトとイベントの監視を停止します。たとえば、次のメソッドは、window オブジェクトに対するすべてのイベント監視を停止します。




		unmonitorEvents(window);

オブジェクトに対する特定のイベントの監視を停止することもできます。たとえば、次のコードでは、現在選択されている要素に対するすべての mouse イベントの監視を開始し、「mousemove」イベントの監視を停止します（コンソール出力のノイズを減らすため）。





		monitorEvents($0, "mouse");
		unmonitorEvents($0, "mousemove");

## values(object)

`values(object)` は、指定されたオブジェクトに属しているすべてのプロパティの値を含む配列を返します。


		values(object);




{# wf_devsite_translation #}
