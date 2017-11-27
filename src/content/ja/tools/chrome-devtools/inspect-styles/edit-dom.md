project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools の [Elements] パネルの DOM ツリービューには、現在のウェブページの DOM 構造が表示されます。DOM のアップデートを通じて、ページのコンテンツと構造をライブ編集します。

{# wf_updated_on: 2015-04-29 #}
{# wf_published_on: 2015-04-29 #}

# DOM の編集 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Chrome DevTools の [Elements] パネルの DOM ツリービューには、現在のウェブページの DOM 構造が表示されます。DOM のアップデートを通じて、ページのコンテンツと構造をライブ編集します。


### TL;DR {: .hide-from-toc }
- DOM によりページの構造が定義されます。各 DOM ノードは、ヘッダーノードや段落ノードなどのページ要素です。
- レンダリングされた DOM を通じてページのコンテンツと構造をライブ編集します。
- ただし、[Elements] パネルでの DOM の変更を通じてソースファイルを変更することはできない点に注意してください。ページを再読み込みすると、すべての DOM ツリーの変更内容が失われます。
- DOM ブレークポイントを使用して DOM の変更を監視します。


##  要素の調査{:#inspect-an-element}

**[Elements] パネル**を使用して、ページ内のすべての要素を 1 つの DOM ツリーで調査します。
任意の要素を選択して、その要素に適用されているスタイルを調査します。

<video autoplay muted src="animations/inspect-element.mp4">
</video>

以下のように、いくつかの方法で要素を調査できます。

ページ上の任意の要素を右クリックし、[**Inspect**] を選択します。

![右クリックで要素を調べる](/web/tools/chrome-devtools/inspect-styles/imgs/right-click-inspect.png)

<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd> キーを押します。
+ <kbd class="kbd">C</kbd> キー（Windows）または <kbd class="kbd">Cmd</kbd>
+ <kbd class="kbd">Shift</kbd>+<kbd class="kbd">C</kbd> キー（Mac）を押して、DevTools を [Inspect Element] モードで開き、要素にカーソルを合わせます。
DevTools により自動的に、[**Elements**] パネルでカーソルが合わせられている要素がハイライト表示されます。

[**Elements**] パネル内で要素がハイライト表示されている状態で要素をクリックすると、調査モードが終了します。
 

[**Inspect Element**] ボタン ![Inspect icon](/web/tools/chrome-devtools/inspect-styles/imgs/inspect-icon.png){:.inline} をクリックし、Inspect Element モードにして、要素をクリックします。



コンソールで [`inspect`][inspect] メソッドを使用します（例: `inspect(document.body)`）。


##  DOM のナビゲーション

DOM 構造をナビゲートするには、マウスまたはキーボードを使用します。

折りたたまれたノードの隣には右向きの矢印があります。![折りたたまれたノード](imgs/collapsed-node.png){:.inline}


展開されたノードの隣には下向きの矢印があります。![展開されたノード](imgs/expanded-node.png){:.inline}


マウスを使用して、次の操作を実行できます。

* 1 回クリックすると、ノードがハイライト表示されます。
* ノードを展開するには、ノードの任意の場所をダブルクリックするか、ノードの隣にある矢印をクリックします。
* ノードを折りたたむには、ノードの隣にある矢印をクリックします。キーボードを使用して、次の操作を実行できます。
* **↑**キーを押すと、現在のノードの 1 つ上のノードが選択されます。
* **↓**キーを押すと、現在のノードの 1 つ下のノードが選択されます。
* **→**キーを押すと、折りたたまれたノードが展開されます。もう一度押すと、（展開された）ノードの最初の子に移動します。
この手法により、深くネストされているノードをすばやくナビゲートできます。


###  パンくずリストのナビゲーション

[Elements] パネルの下部にはパンくずリストがあります。 

![パンくずリスト](imgs/breadcrumb-body.png)

現在選択されているノードは青でハイライト表示されています。その左側のノードは現在のノードの親です。
さらにその左側のノードは親の親です。同様に、ツリーの最上位まで続きます。


![パンくずリストの拡張](imgs/breadcrumb-footer.png)

構造の上位にナビゲートしていくと、ハイライトが移動します。

![パンくずリストを上位にナビゲートする](imgs/breadcrumb-trail.png)

DevTools には、リスト内の項目が可能な限り多く表示されます。リスト全体がステータスバーに収まらない場合は、リストが切り捨てられた位置に省略記号（...）が表示されます。

省略記号をクリックすると、非表示になっている要素が表示されます。


![パンくずリストの省略記号](imgs/breadcrumb-ellipsis.png)

##  DOM ノードと属性の編集

DOM ノード名または属性を編集するには、次のようにします。

* ノード名または属性を直接ダブルクリックします。
* ノードをハイライト表示して <kbd>Enter</kbd> キーを押し、名前または属性が選択されるまで <kbd>Tab</kbd> キーを押し続けます。
* [その他のアクション メニュー](#more-actions) を開き、[**Add Attribute**] または [**Edit Attribute**] を選択します。
[**Edit Attribute**] は状況依存メニューです。クリックした部分に応じて、編集対象が変わります。


終了すると、終了タグが自動的にアップデートされます。

<video autoplay muted src="animations/edit-element-name.mp4">
</video>

###  DOM ノードとその子の HTML としての編集

DOM ノードとその子を HTML として編集するには、次のようにします。

* [その他のアクション メニュー](#more-actions) を開き、[**Edit as HTML**] を選択します。 
* <kbd>F2</kbd> キー（Windows または Linux）または <kbd>Fn</kbd>+<kbd>F2</kbd> キー（Mac）を押します。
* 変更を保存する場合は、<kbd>Ctrl</kbd>+<kbd>Enter</kbd> キー（Windows または Linux）または <kbd>Cmd</kbd>+<kbd>Enter</kbd> キー（Mac）を押します。
* 保存せずにエディタを終了する場合は、<kbd>Esc</kbd> キーを押します。

![HTML としての編集](imgs/edit-as-html.png)

##  DOM ノードの移動

ノードを移動するには、ノードをクリックし、長押してドラッグします。

<video autoplay muted src="animations/move-node.mp4">
</video>

##  DOM ノードの削除

DOM ノードを削除するには、次のようにします。

* [その他のアクション メニュー](#more-actions) を開き、[**Delete Node**] を選択します。
* ノードを選択して <kbd>Delete</kbd> キーを押します。

注: 誤ってノードを削除した場合は、<kbd class='kbd'>Ctrl</kbd>+<kbd class='kbd'>Z</kbd> キー（Mac の場合は <kbd class='kbd'>Cmd</kbd>+<kbd class='kbd'>Z</kbd> キー）で最後の操作を元に戻すことができます。

##  その他のアクション メニューの表示{:#more-actions}

**その他のアクション** メニューを使用すると、さまざまな方法で DOM ノードを操作できます。
メニューを表示するには、ノードを右クリックするか、ノードを選択して**その他のアクション** ボタン（![その他のアクション ボタン](imgs/more-actions-button.png){:.inline}）を押します。

ボタンは現在選択されている要素にのみ表示されます。


![その他のアクション メニュー](imgs/more-actions-menu.png)

##  ビューへのスクロール

DOM ノードにカーソルを合わせるか、ノードを選択すると、レンダリングされたノードがビューポートでハイライト表示されます。
ノードがスクロールされて画面外に出ると、ノードが現在のビューポートより上にある場合はビューポートの上部にツールチップが表示され、ノードが現在のビューポートより下にある場合は下部にツールチップが表示されます。
たとえば、以下のスクリーンショットの DevTools では、[**Elements**] パネルで現在選択されている要素がビューポートより下にあることが示されています。


![ビューポートより下にある要素](imgs/below-viewport.png)

ノードがビューポート内に表示されるようにページをスクロールするには、ノードを**右クリック**し、[**Scroll into View**] を選択します。


##  DOM ブレークポイントの設定

複雑な JavaScript アプリケーションをデバッグするための DOM ブレークポイントを設定します。たとえば、JavaScript によって DOM 要素のスタイルを変更している場合は、要素の属性が変更されたときに呼び出される DOM ブレークポイントを設定します。
サブツリーの変更、属性の変更、ノードの削除のいずれかの DOM 変更でブレークポイントがトリガーされます。

{# include shared/related_guides.liquid inline=true list=page.related-guides.breakpoints #}

###  サブツリーの変更

サブツリーの変更ブレークポイントは、子要素が追加、削除、または移動された場合にトリガーされます。たとえば、`main-content` 要素にサブツリーの変更ブレークポイントを設定した場合は、次のコードでブレークポイントがトリガーされます。


    var element = document.getElementById('main-content');
    //modify the element's subtree.
    var mySpan = document.createElement('span');
    element.appendChild( mySpan );
    

###  属性の変更

属性の変更は、要素の属性（`class, id, name`）が動的に変更された場合に発生します。


    var element = document.getElementById('main-content');
    // class attribute of element has been modified.
    element.className = 'active';
    

###  ノードの削除

ノードの削除の変更は、対象のノードが DOM から削除されたときにトリガーされます。



    document.getElementById('main-content').remove();
    

##  DOM ブレークポイントの操作

[Elements] パネルと [Sources] パネルの両方に DOM ブレークポイントを管理するためのパネルが含まれています。


各ブレークポイントが、要素の識別子とブレークポイントのタイプとともに表示されます。

![[DOM Breakpoints] ペイン](imgs/dom-breakpoints-pane.png)

次のいずれかの方法で、一覧表示されている各ブレークポイントを操作します。

* 要素の識別子に**カーソルを合わせる**と、ページ上での要素の対応する位置が示されます（[Elements] パネルでノードにカーソルを合わせた場合と同様です）。
* 要素を**クリック**すると、[Elements] パネルでその要素が選択されます。
* チェックボックスの**オンとオフを切り替える**と、ブレークポイントが有効または無効になります。

DOM ブレークポイントをトリガーすると、[DOM Breakpoints] ペインでそのブレークポイントがハイライト表示されます。
[**Call Stack**] ペインには、デバッガーの一時停止の**理由**が表示されます。


![ブレークポイントの理由](imgs/breakpoint-reason.png)

##  要素のイベント リスナーの表示

[**Event Listeners**] ペインで、DOM ノードに関連付けられている JavaScript のイベント リスナーを表示します。
 

![[Event Listeners] ペイン](imgs/event-listeners-pane.png)

[Event Listeners] ペインの最上位の項目は、リスナーが登録されているイベントタイプを示します。


イベントタイプ（たとえば、`click`）の隣にある矢印をクリックすると、登録されたイベント ハンドラのリストが表示されます。
各ハンドラは、CSS セレクターに似た要素の識別子（`document` や `button#call-to-action` など）により識別されます。
同じ要素に対して複数のハンドラが登録されている場合、その要素は繰り返しリストに示されます。


要素の識別子の隣にある展開矢印をクリックすると、イベント ハンドラのプロパティが表示されます。[Event Listeners] ペインに、各リスナーの以下のプロパティが示されます。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">イベント リスナーのプロパティと説明</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Value"><code>handler</code></td>
      <td data-th="Description">コールバック関数を含みます。関数を右クリックし、[<strong>Show Function Definition</strong>] を選択すると、関数が定義されている場所が表示されます（ソースコードが使用可能な場合）。</td>
    </tr>
    <tr>
      <td data-th="Value"><code>useCapture</code></td>
      <td data-th="Description"> <code>addEventListener</code> に <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a> フラグが設定されていたかどうかを示すブール値です。</td>
    </tr>
  </tbody>
</table>

注: Chrome 拡張機能の多くが、独自のイベント リスナーを DOM に追加します。イベント リスナーが多数あり、それらが自分のコードで設定したものではない場合は、[シークレット ウィンドウ](https://support.google.com/chrome/answer/95464)でページを再度開いてみてください。シークレット ウィンドウでは、既定で拡張機能の実行が停止されます。

###  祖先イベント リスナーの表示

{% comment %}

スクリーンショットのコード

<!doctype html>
<html>
<body onload="console.log('onload');">
  <div onfocus="console.log('focus');">
    <button id="button" onclick="console.log('onclick');">クリックする</button>
  </div>
</body>
</html>

{% endcomment %}

[**Ancestors**] チェックボックスがオンになっている場合は、現在選択されているノードのイベント リスナーに加えて、そのノードの祖先のイベント リスナーも表示されます。



![[Ancestors] がオン](imgs/ancestors-enabled.png)

このチェックボックスがオフになっている場合は、現在選択されているノードのイベント リスナーのみが表示されます。


![[Ancestors] がオフ](imgs/ancestors-disabled.png)

###  フレームワーク リスナーの表示

{% comment %}

スクリーンショットのコード

<!doctype html>
<html>
<script src="https://code.jquery.com/jquery-2.2.0.js"></script>
<body>
  <button id="button">クリックしてください</button>
  <script>
    $('#button').click(function() {
      $('#button').text('hehe, that tickled, thanks');
    });
  </script>
</body>
</html>

{% endcomment %}

JavaScript のフレームワークとライブラリの中には、ネイティブ DOM イベントをそのカスタム イベント API にラップしているものがあります。
過去には、このせいで DevTools でイベントリスナを調べるのが難しくなっていました。なぜなら、関数定義が単にフレームワークまたはライブラリのコードを参照するためです。[**Framework listeners**] 機能によってこの問題が解決されます。


[**Framework listeners**] チェックボックスがオンになっている場合、DevTools は自動的にイベントコードのフレームワークまたはライブラリがラップしている部分を解決し、ユーザーのコードのどこに実際にイベントがバインドされているかを通知します。



![[Framework listeners] がオン](imgs/framework-listeners-enabled.png)

[**Framework listeners**] チェックボックスがオフになっている場合は、イベント リスナー コードで、フレームワークまたはライブラリ コードのどこかを解決することになると考えられます。
 

![[Framework listeners] がオフ](imgs/framework-listeners-disabled.png)



[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
