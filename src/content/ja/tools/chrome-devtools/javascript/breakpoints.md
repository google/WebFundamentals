project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description:Chrome DevTools でコードを一時停止するために使用できるすべての方法を説明します。

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-02-03 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# ブレークポイントでコードを一時停止する {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

JavaScript コードを一時停止するにはブレークポイントを使用します。 このガイドでは、DevTools で使用可能なブレークポイントの種類と、それらを使用するタイミングおよび設定する方法について説明します。
 デバッグ プロセスのハンズオン チュートリアルは、[Chrome DevTools で JavaScript をデバッグする](/web/tools/chrome-devtools/javascript/)をご覧ください。



## 各種ブレークポイントを使用するタイミングの概要 {: #overview }

最もよく知られているブレークポイントはコード行（line-of-code）のブレークポイントです。 しかし、バグの場所が厳密にはわからない場合や作業するコードベースが非常に大きい場合は特に、コード行ブレークポイントを効率的に設定できないこともあります。
 そのような場合、他の種類のブレークポイントをいつどのように使えばよいかを知っていれば、自分が行うデバッグ作業の時間を節約できます。



<table>
  <tr><th>ブレークポイントの種類</th><th>使用に適した一時停止の対象...</th></tr>
  <tr>
    <td><a href="#loc">コード行</a></td>
    <td>
      厳密なコード部分。
    </td>
  </tr>
  <tr>
    <td><a href="#conditional-loc">条件付きコード行</a></td>
    <td>
      厳密なコード部分、ただし他の何らかの条件が真であるときに限る。
    </td>
  </tr>
  <tr>
    <td><a href="#dom">DOM</a></td>
    <td>
      特定の DOM ノードまたはその子を変更または削除するコード。

    </td>
  </tr>
  <tr>
    <td><a href="#xhr">XHR</a></td>
    <td>
      指定する文字列パターンが XHR URL に含まれる場合。
    </td>
  </tr>
  <tr>
    <td><a href="#event-listeners">イベント リスナー</a></td>
    <td>
      <code>click</code> などのイベントが発生した後に実行されるコード。

    </td>
  </tr>
  <tr>
    <td><a href="#exceptions">例外</a></td>
    <td>
      捕捉された例外または捕捉されていない例外をスローするコード行。

    </td>
  </tr>
  <tr>
    <td><a href="#function">関数</a></td>
    <td>
      特定の関数が呼び出されるあらゆる場合。
    </td>
  </tr>
</table>

## コード行ブレークポイント {: #loc }

コード行ブレークポイントは、調査が必要な厳密なコード部分がわかっている場合に使用します。
 DevTools はこのコード行が実行される前に*必ず*一時停止します。


DevTools でコード行ブレークポイントを設定する手順は、次のとおりです。

1. **[Sources]** タブをクリックします。
1. ブレークポイントを配置する対象のコード行を含むファイルを開きます。
1. 対象のコード行に移動します。
1. コード行の左側に行番号列があります。 その列をクリックします。 行番号列の上に青いアイコンが表示されます。


<figure>
  <img src="imgs/loc-breakpoint.png"
       alt="コード行ブレークポイント。"
  <figcaption>
    <b>図 1</b>: 行 <b>29</b> に設定したコード行ブレークポイント
  </figcaption>
</figure>

### コード内のコード行ブレークポイント {: #debugger }

コードから `debugger` が呼び出されて、ブレークポイントが配置された行で一時停止します。 これは[コード行ブレークポイント](#loc)と同等ですが、ブレークポイントが DevTools UI 内ではなくコード内に設定されている点が異なります。



    console.log('a');
    console.log('b');
    debugger;
    console.log('c');

### 条件付きコード行ブレークポイント {: #conditional-loc }

条件付きコード行ブレークポイントは、調査が必要な厳密なコード部分はわかっているが、他の一定の条件が真である場合にのみ一時停止するという場合に使用します。



条件付きコード行ブレークポイントを設定する手順は、次のとおりです。

1. **[Sources]** タブをクリックします。
1. ブレークポイントを配置する対象のコード行を含むファイルを開きます。
1. 対象のコード行に移動します。
1. コード行の左側に行番号列があります。 その列を右クリックします。
1. **[Add conditional breakpoint]** を選択します。 コード行の下にダイアログが表示されます。
1. ダイアログに条件を入力します。
1. <kbd>Enter</kbd> を押してブレークポイントをアクティベートします。 行番号列の上にオレンジ色のアイコンが表示されます。


<figure>
  <img src="imgs/conditional-loc-breakpoint.png"
       alt=" 条件付きコード行ブレークポイント。"
  <figcaption>
    <b>図 2</b>: 行 
<b>32</b> に設定した条件付きコード行ブレークポイント
  </figcaption>
</figure>

### コード行ブレークポイントの管理 {: #manage-loc }

1 つの場所のコード行ブレークポイントを無効化または削除する場合は、**[Breakpoints]** ペインを使用します。


<figure>
  <img src="imgs/breakpoints-pane.png"
       alt="[Breakpoints] ペイン。"
  <figcaption>
    <b>図 3</b>: 2 つのコード行ブレークポイントが表示された <b>[Breakpoints]</b> ペイン。<code>get-started.js</code> の 15 行目と 32 行目にブレークポイントが配置されている
  </figcaption>


</figure>

* 無効にするブレークポイントのエントリーの横にあるチェックボックスにチェックを入れます。
* そのブレークポイントを削除する場合は、エントリー上で右クリックします。
* すべてのブレークポイントを非アクティベートする、すべてのブレークポイントを無効にする、またはすべてのブレークポイントを削除する場合は、**[Breakpoints]** ペインの任意の場所で右クリックします。
 すべてのブレークポイントを無効にすることは、ブレークポイントのチェックを一つ一つすべて解除することに相当します。
 すべてのブレークポイントを非アクティベートすると、すべてのコード行ブレークポイントを無視し、それらのブレークポイントが有効である状態は維持するよう DevTools に指示するため、再アクティベートしたときには以前と同じ状態が復元されます。




<figure>
  <img src="imgs/deactivated-breakpoints.png"
       alt="[Breakpoints] ペインで非アクティベートされたブレークポイント。"
  <figcaption>
    <b>図 4</b>: <b>[Breakpoints]</b> ペインで非アクティベートされたブレークポイントは無効になっており、半透明で表示されている
</figcaption>

</figure>

## DOM 変更ブレークポイント {: #dom }

DOM ノードまたはその子を変更するコードで一時停止するときは、DOM 変更ブレークポイントを使用します。


DOM 変更ブレークポイントを設定する手順は、次のとおりです。

1. **[Elements]** タブをクリックします。
1. ブレークポイントを設定する要素に移動します。
1. その要素を右クリックします。
1. **[Break on]** の上にマウスポインターを移動し、**[Subtree modifications]**、**[Attribute   modifications]**、または **[Node removal]** を選択します。


<figure>
  <img src="imgs/dom-change-breakpoint.png"
       alt="DOM 変更ブレークポイントの作成時に表示されるコンテキスト メニュー。"
  <figcaption>
    <b>図 5</b>: DOM 変更ブレークポイントの作成時に表示されるコンテキスト メニュー
</figcaption>
</figure>

### DOM 変更ブレークポイントの種類 {: #dom-types }

* **[Subtree modifications]**: 現在選択されているノードの子が削除、追加、または子の内容が変更されたときにトリガーされます。
 子ノードの属性が変更された場合、または現在選択されているノードが変更された場合はトリガーされません。



* **[Attributes modifications]**:現在選択されているノードに対して属性が追加または削除された場合、あるいは属性値が変更された場合にトリガーされます。


* **[Node Removal]**:現在選択されているノードが削除された場合にトリガーされます。

## XHR/Fetch ブレークポイント {: #xhr }

XHR ブレークポイントは、指定された文字列が XHR のリクエスト URL に含まれているときに一時停止する場合に使用します。
 DevTools は、XHR が `send()` を呼び出す箇所でコード行を一時停止します。


注: この機能は [Fetch][Fetch] リクエストとも連携します。

この連携が便利な例は、ページがリクエストしている URL が間違っていて、間違ったリクエストの原因となっている AJAX または Fetch ソースコードをその場で確認したいという場合です。



XHR ブレークポイントを設定する手順は、次のとおりです。

1. **[Sources]** タブをクリックします。
1. **[XHR Breakpoints]** ペインを展開します。
1. **[Add breakpoint]** をクリックします。
1. 出現時に一時停止する文字列を入力します。 DevTools は、この文字列が XHR のリクエスト URL に出現するすべての箇所で一時停止します。
1. <kbd>Enter</kbd> を押して確認します。

<figure>
  <img src="imgs/xhr-breakpoint.png"
       alt="XHR ブレークポイントの作成。"
  <figcaption>
    <b>図 6</b>: <b>[XHR Breakpoints]</b> での
    URL に <code>org</code> を含むすべてのリクエストに対する XHR ブレークポイントの作成
</figcaption>
</figure>

[Fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## イベント リスナー ブレークポイント {: #event-listeners }

イベント リスナー ブレークポイントは、イベントが発生した後で実行されるイベント リスナーコードで一時停止する場合に使用します。
 特定のイベント（`click` など）またイベントのカテゴリ（すべてのマウスイベントなど）を選択することができます。


1. **[Sources]** タブをクリックします。
1. **[Event Listener Breakpoints]** ペインを展開します。 DevTools に **[Animation]** といったイベント カテゴリのリストが表示されます。
1. 発生したら一時停止するイベントのカテゴリにチェックを入れるか、またはカテゴリを展開して特定のイベントにチェックを入れるかします。


<figure>
  <img src="imgs/event-listener-breakpoint.png"
       alt="イベント リスナー ブレークポイントの作成。"
  <figcaption>
    <b>図 7</b>: <code>deviceorientation</code> のイベント リスナー ブレークポイントの作成

  </figcaption>
</figure>

## 例外ブレークポイント {: #exceptions }

例外ブレークポイントは、捕捉された例外または捕捉されていない例外をスローしているコード行で一時停止する場合に使用します。


1. **[Sources]** タブをクリックします。
1. **[Pause on exceptions]** ![Pause on
   exceptions](imgs/pause-on-exceptions.png) をクリックします{:.devtools-inline}。 有効になると青色に変わります。
1. (オプション) 捕捉されていないで例外に加えて捕捉された例外でも一時停止する場合は、**[Pause On Caught Exceptions]** チェックボックスにチェックを入れます。


<figure>
  <img src="imgs/uncaught-exception.png"
       alt="捕捉されていない例外で一時停止した状態。"
  <figcaption>
    <b>図 7</b>: 捕捉されていない例外で一時停止した状態
</figcaption>
</figure>

## 関数ブレークポイント {: #function }

特定の関数が呼び出されたあらゆる場合に一時停止するときに、`debug(functionName)` を呼び出します（`functionName` はデバッグする関数）。
 `debug()` をコード内に挿入するか（`console.log()` ステートメントのように）または DevTools コンソールから呼び出すことができます。
 `debug()` は、関数の最初の行に
[コード行ブレークポイント](#loc)を設定した場合に相当します。

    function sum(a, b) {
      let result = a + b; // DevTools pauses on this line.
      return result;
    }
    debug(sum); // Pass the function object, not a string.
    sum();


### 対象の関数がスコープ内にあるようにする {: #scope }

DevTools は、デバッグする関数がスコープ内にないと `ReferenceError` をスローします。


    (function () {
      function hey() {
        console.log('hey');
      }
      function yo() {
        console.log('yo');
      }
      debug(yo); // This works.
      yo();
    })();
    debug(hey); // This doesn't work. hey() is out of scope.

`debug()` を DevTools コンソールから呼び出している場合、対象の関数がスコープ内にあるようにするには少しの手間が必要となります。
 次のような方法をとることもできます。

1. その関数がスコープ内にある場所に[コード行ブレークポイント](#loc)を設定します。
1. ブレークポイントをトリガーします。
1. コートがコード行ブレークポイントで一時停止している間に、DevTools コンソールで `debug()` を呼び出します。


## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
