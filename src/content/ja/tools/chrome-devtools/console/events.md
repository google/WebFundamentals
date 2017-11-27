project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools コマンドライン API を使用すると、さまざまな方法でイベント リスナーを観察したり調査したりできます。

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

#  イベントの監視 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Chrome DevTools コマンドライン API を使用すると、さまざまな方法でイベント リスナーを観察したり調査したりできます。JavaScript はインタラクティブなページで中心的な役割を果たすもので、ブラウザはイベントやイベント ハンドラのデバッグに役立つツールを提供します。


### TL;DR {: .hide-from-toc }
- 特定のタイプのイベントは、 <code>monitorEvents()</code> を使用してリッスンします。
- リッスンを停止するには  <code>unmonitorEvents()</code> を使用します。
- DOM 要素のリスナーは  <code>getEventListeners()</code> を使用して取得します。
- イベント リスナーに関する情報を取得するには、[Event Listeners Inspector] パネルを使用します。


##  イベントの監視

[monitorEvents()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events)
メソッドを使用すると、DevTools は指定されたターゲットに関する情報を記録します。

最初のパラメータは、監視するオブジェクトです。2 つ目のパラメータが指定されていない場合は、すべてのイベントが返されます。リッスンするイベントを指定するには、文字列または文字列の配列を 2 つ目のパラメータとして渡します。




ページの本文に対するクリック イベントをリッスンする場合:

    monitorEvents(document.body, "click");

監視対象イベントがサポート対象の「イベントタイプ」で、DevTools によって一連の標準のイベント名にマップされている場合、このメソッドはそのタイプのイベントをリッスンします。



[コマンドライン API](/web/tools/chrome-devtools/debug/command-line/command-line-reference) では、「イベントタイプ」を、対応するイベントに完全にマッピングしています。

イベントの監視を停止するには、`unmonitorEvents()` メソッドを呼び出し、そのメソッドに監視を停止するオブジェクトを指定します。


`body` オブジェクトに対するイベントのリッスンを停止する場合:

    unmonitorEvents(document.body);

##  オブジェクトに登録されているイベント リスナーの表示

[getEventListeners() API](/web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject)
は、指定されたオブジェクトに登録されているイベント リスナーを返します。

戻り値は、登録済みの各イベントタイプ（`click` または `keydown` など）の配列が含まれるオブジェクトです。各配列のメンバーは、各タイプに登録されているリスナーを記述するオブジェクトです。たとえば、次のコードでは、ドキュメント オブジェクトに登録されているすべてのイベント リスナーのリストが表示されます。





    getEventListeners(document);

![getEventListeners() を使用した場合の出力](images/events-call-geteventlisteners.png)

指定したオブジェクトに複数のリスナーが登録されている場合は、配列に各リスナーのメンバーが含まれます。次の例では `mousedown` イベントについて、#scrollingList 要素に 2 つのイベント リスナーが登録されています。




![mousedown にアタッチされたイベント リスナーの表示](images/events-geteventlisteners_multiple.png)

これらの各オブジェクトをさらに展開して、そのプロパティを調べることができます。

![リスナー オブジェクトの展開されたビュー](images/events-geteventlisteners_expanded.png)

##  DOM 要素に登録されているイベント リスナーの表示

デフォルトでは、Elements Inspector の [*Event Listeners*] パネルには、ページにアタッチされているすべてのイベントが表示されます。


![[Event Listeners] パネル](images/events-eventlisteners_panel.png)

フィルタを使用すると、イベントが選択したノードのみに限定されます。

![[Selected Node Only] でフィルタされた [Event listeners] パネル](images/events-eventlisteners_panel_filtered.png)

オブジェクトを展開すると、パネルにイベント リスナーの詳細が表示されます。この例では、ページに jQuery 経由で 2 つのイベント リスナーがアタッチされています。



![展開されたイベント リスナーのビュー](images/events-eventlisteners_panel_details.png)



{# wf_devsite_translation #}
