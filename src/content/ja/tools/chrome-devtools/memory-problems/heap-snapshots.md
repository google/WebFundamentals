project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools のヒープ プロファイラを使ってヒープのスナップショットを記録し、メモリリークを見つける方法について説明します。

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-06-08 #}

# ヒープのスナップショットを記録する方法 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Chrome DevTools のヒープ プロファイラを使ってヒープのスナップショットを記録し、メモリリークを見つける方法について説明します。

Chrome DevTools のヒープ プロファイラでは、ページの JavaScript オブジェクトと関連 DOM ノード別にメモリ分布が示されます ([オブジェクトの保持ツリー](/web/tools/chrome-devtools/profile/memory-problems/memory-101#objects-retaining-tree) もご覧ください)。このツールを使用して、JS ヒープのスナップショットの取得、メモリグラフの分析、スナップショットの比較、メモリリークの検出を行います。






## スナップショットの取得

[Profiles] パネルで [**Take Heap Snapshot**] をオンにして [**Start**] ボタンをクリックするか、<span class="kbd">Cmd</span>+<span class="kbd">E</span> キーまたは <span class="kbd">Ctrl</span>+<span class="kbd">E</span> キーを押します。

![プロファイルの種類の選択](imgs/profiling-type.png)

**スナップショット** は、最初にレンダラーのプロセスメモリに格納されます。そしてスナップショット アイコンをクリックして表示すると、オンデマンドで DevTools に転送されます。


スナップショットが DevTools に読み込まれて解析されると、スナップショットのタイトルの下に数値が表示されます。この数値は、[到達可能な JavaScript オブジェクト](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes) の合計サイズを示します。



![到達可能なオブジェクトの合計サイズ](imgs/total-size.png)

注: スナップショットには、到達可能なオブジェクトだけが含まれます。また、スナップショットを取得する際は、必ず最初にガベージ コレクションが実行されます。

## スナップショットのクリア

[Clear all profiles] アイコンをクリックして、（DevTools とレンダラーの両方のメモリから）スナップショットを削除します。

![スナップショットの削除](imgs/remove-snapshots.png)

DevTools ウィンドウを閉じても、プロファイルはレンダラーのメモリから削除されません。DevTools を再度開くと、以前に取得したすべてのスナップショットがスナップショットの一覧に再表示されます。

<p class="note"><strong>例:</strong> <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html">散在しているオブジェクト</a>の例を試してみましょう。ヒープ プロファイラを使用してこれらのオブジェクトをプロファイルします。数多くの "(object)" アイテムの割り当てが表示されます。</p>

## スナップショットの表示

タスクごとに異なる観点でスナップショットを表示します。

**Summary ビュー** は、オブジェクトをコンストラクタ名別のグループにして表示します。このビューでは、コンストラクタ名別にグループ化された型に基づいてオブジェクト（およびそのメモリ使用量）を追跡します。これは特に、[DOM リークを追跡する](/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis#narrow-down-causes-of-memory-leaks) のに役立ちます。


**Comparison ビュー** は、2 つのスナップショットの違いを表示します。このビューでは、操作前後の 2 つ（またはそれ以上）のメモリのスナップショットを比較します。解放されたメモリと参照カウントの変化を調べると、メモリリークの存在と原因を確認できます。

**Containment ビュー** では、ヒープのコンテンツを調査します。オブジェクト構造に適したビューが提供されるため、グローバル名前空間 "(window)" で参照されるオブジェクトを分析し、保持内容を調べるのに役立ちます。このビューでは、クロージャを分析して下位レベルのオブジェクトまで踏み込んで調査します。

**Dominators ビュー** には[ドミネーター ツリー](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators)が表示されるため、集積点を見つけるのに便利です。このビューでは、オブジェクトへの予期しない参照がもう存在しないこと、削除またはガベージ コレクションが実際に機能していることを確認します。




ビューを切り替えるには、ビューの下部にあるセレクターを使用します。

![ビューを切り替えるセレクター](imgs/switch-views.png)

注: プロパティの中には JavaScript ヒープに格納されないプロパティもあります。ネイティブコードを実行する getter を使用するように実装されたプロパティは取得されません。また、数値などの文字列以外の値も取得されません。

### Summary ビュー

スナップショットは最初に Summary ビューで開きます。このビューにはオブジェクトの合計数が表示され、オブジェクトを展開するとインスタンスを表示できます。

![Summary ビュー](imgs/summary-view.png)

最上位のエントリは「集計」行です。各行には以下の情報が表示されます。

* **Constructor** は、このコンストラクタを使用して作成されたすべてのオブジェクトを表します。
* **オブジェクトのインスタンス数**は #  列に表示されます。
* **Shallow size** 列には、特定のコンストラクタ関数によって作成されたすべてのオブジェクトの浅いサイズの合計が表示されます。浅いサイズとは、オブジェクト自体が保持するメモリサイズです（一般に、配列と文字列の浅いサイズは大きくなります）。[オブジェクト サイズ](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)もご覧ください。
* **Retained size** 列には、オブジェクトの同じセットの最大保持サイズが表示されます。あるオブジェクトが削除された（そのオブジェクトに依存するオブジェクトに到達できなくなった）後、解放される可能性のあるメモリサイズを保持サイズと呼びます。[オブジェクト サイズ](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)もご覧ください。
* **Distance** 列には、ノードへの単純な最短パスにおけるルートまでの距離が表示されます。

上部のビューで集計行を展開すると、その集計に含まれるすべてのインスタンスが表示されます。インスタンスごとに、浅いサイズと保持サイズが対応する列に表示されます。@ 文字の後の数字はオブジェクトの一意の ID です。この ID を使ってオブジェクト単位でヒープのスナップショットを比較します。

黄色のオブジェクトは、そのオブジェクトに JavaScript 参照が含まれていることを示します。赤いオブジェクトはデタッチされたノードで、背景が黄色のオブジェクトから参照されています。

**ヒープ プロファイラ内のさまざまなコンストラクタ（グループ）エントリが表す内容**

![Constructor グループ](imgs/constructor-groups.jpg)

* **(global property)** – グローバル オブジェクト（'window' など）とそのオブジェクトが参照するオブジェクトとの間の中間オブジェクトです。オブジェクトがコンストラクタ Person を使って作成され、グローバル オブジェクトによって保持されている場合、保持パスは [global] > (global property) > Person のようになります。この中間オブジェクトは、標準と対照をなしています。標準では、オブジェクトは直接相互参照します。中間オブジェクトはパフォーマンス上の理由から用意されています。グローバル オブジェクトは定期的に変更されます。プロパティ アクセスの最適化はグローバル以外のオブジェクトには適切に機能しますが、グローバル オブジェクトには適切ではありません。

* **(roots)** – 保持ツリービュー内のルートエントリは、選択したオブジェクトへの参照を持っているエンティティです。ルートエントリは、独自の目的でエンジンによって作成された参照になることもあります。エンジンにはオブジェクトを参照するキャッシュがあります。しかし、このような参照はすべて弱い参照です。そのため、本当に強い参照がない場合、オブジェクトのガベージ コレクションが行われるのを防ぐことができません。

* **(closure)** – 関数クロージャ全体のオブジェクトのグループへの参照カウントです。

* **(array、string、number、regexp)** – 配列、文字列、数値、または正規表現を参照するプロパティを持つオブジェクト型の一覧です。

* **(compiled code)** – 単純に、コンパイル済みのコードに関連するすべてのオブジェクトです。スクリプトは関数に似ていますが、&lt;script&gt; 本体に対応します。SharedFunctionInfos (SFI) は、関数とコンパイル済みコードの間に位置するオブジェクトです。関数には通常コンテキストがありますが、SFI にはありません。

* **HTMLDivElement**、**HTMLAnchorElement**、**DocumentFragment** など – コードから参照される特定の型の要素またはドキュメント オブジェクトへの参照です。


<p class="note"><strong>例:</strong> Summary ビューの使い方を理解するには、こちらの<a href="https://developer.chrome.com/devtools/docs/heap-profiling-summary">デモページ</a>をお試しください。</p>

### Comparison ビュー

複数のスナップショットを相互に比較することによって、リークされたオブジェクトを見つけます。特定のアプリケーション操作がリークしないことを確認するには、以下のシナリオを実行します（たとえば、ドキュメントを開いて閉じるといった直接操作とその逆の操作をペアで行うと、通常、コレクションの対象となるガベージは残りません）。

1. 操作を実行する前にヒープ スナップショットを取得します。
2. 操作を実行します（リークが発生すると考えられる方法でページを操作します）。
3. 逆の操作を実行します（反対の操作を行い、その操作を数回繰り返します）。
4. 再度スナップショットを取得し、ビューを Comparison に変更して手順 1 のスナップショットと比較します。

Comparison ビューに、2 つのスナップショットの違いが表示されます。集計エントリを展開すると、オブジェクトの追加されたインスタンスと削除されたインスタンスが表示されます。

![Comparison ビュー](imgs/comparison-view.png)

<p class="note"><strong>例:</strong> リークの検出にスナップショットの比較を使う方法を確認するには、こちらの<a href="https://developer.chrome.com/devtools/docs/heap-profiling-comparison">デモページ</a>をお試しください。</p>

### Containment ビュー

Containment ビューは、基本的にはアプリケーションのオブジェクト構造の「鳥瞰図」です。関数クロージャの内部を見て、JavaScript オブジェクトを構成する VM の内部オブジェクトを観察し、アプリケーションが非常に下位レベルで使用するメモリ量を把握できます。
ビューには複数のエントリ ポイントがあります。

* **DOMWindow オブジェクト**は、JavaScript コードでは「グローバル」オブジェクトと考えられるオブジェクトです。
* **GC Roots** は、VM のガベージによって使用される実際の GC ルートです。GC ルートは、組み込みオブジェクトのマップ、シンボルテーブル、VM スレッドスタック、コンパイル キャッシュ、ハンドルスコープ、グローバル ハンドルから構成されます。
* **Native オブジェクト** は、自動化を可能にするために、JavaScript 仮想マシン内に「プッシュされる」ブラウザ オブジェクトです。たとえば、DOM ノードや CSS ルールなどがあります。

![Containment ビュー](imgs/containment-view.png)

<p class="note">
  <strong>例:</strong> このビューを使用してクロージャとイベント ハンドラを調査する方法を理解するには、こちらの<a href="https://developer.chrome.com/devtools/docs/heap-profiling-containment">デモページ</a>をお試しください。
</p>

<strong>クロージャについての考え方</strong>

スナップショット内のクロージャを簡単に区別できるようにするには、関数に名前を付けると非常に役立ちます。たとえば、以下の例は名前付きの関数を使用していません。


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function() { // this is NOT a named function
        return largeStr;
      };
    
      return lC;
    }
    

上記の例を以下のようにします。


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function lC() { // this IS a named function
        return largeStr;
      };
    
      return lC;
    }
    

![関数に名前を付けてクロージャを区別する](imgs/domleaks.png)

<p class="note">
    <strong>例:</strong>
     メモリへのクロージャの影響を分析するには、<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example7.html">eval が悪影響を及ぼす理由</a>を示すこちらの例をお試しください。あわせて、<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example8.html">ヒープの割り当て</a>を記録する手順を示す例もご覧ください。
</p>

### Dominators ビュー

[Dominators](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators) ビューには、ヒープグラフのドミネーターツリーが表示されます。Containment ビューに外観が似ていますが、プロパティ名がありません。これは、オブジェクトのドミネーターにオブジェクトへの直接参照が含まれていない可能性があるためです。ドミネーターツリーはグラフのスパニングツリーではありません。ですが、メモリの集積点をすばやく特定するのに役立ちます。






<p class="note"><strong>注: </strong> Chrome Canary で Dominators ビューを有効にするには、[Settings] > [Show advanced heap snapshot properties] の順に選択して、DevTools を再起動します。</p>

![Dominators ビュー](imgs/dominators-view.png)

<p class="note">
    <strong>例:</strong>
     集積点を見つける方法を理解するには、こちらの<a href="https://developer.chrome.com/devtools/docs/heap-profiling-dominators">デモ</a>をお試しください。あわせて、<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example10.html">保持パスとドミネーター</a>の例もご覧ください。
</p>

## コードの色分け表示

オブジェクトのプロパティとプロパティ値にはさまざまな型があり、その型に応じて色が付けられています。
各プロパティは、以下の 4 つの型のいずれかになります。

* **a: property** - 名前を持つ標準プロパティで、.（ドット）演算子または ["foo bar"] のように [ ] （角かっこ）表記を使ってアクセスします。
* **0: element** - 数値インデックスを持つ標準プロパティで、[ ] （角かっこ）表記を使ってアクセスします。
* **a: context var** - 関数コンテキスト内の変数で、関数クロージャの内部から名前でアクセスします。
* **a: system prop** - JavaScript VM によって追加されるプロパティで、JavaScript コードからはアクセスできません。

`System ` として指定したオブジェクトには、対応する JavaScript 型がありません。それらは、JavaScript VM のオブジェクト システムの実装に含まれています。V8 は、内部オブジェクトのほとんどをユーザーの JS オブジェクトとして同じヒープ内に割り当てます。したがって、それらは v8 内部だけに含まれます。

## 特定のオブジェクトの検索

ガベージ コレクションが行われたヒープ内でオブジェクトを見つけるには、<kbd><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">F</kbd></kbd> でオブジェクト ID を指定して検索します。

## DOM リークの検出

ヒープ プロファイラには、ブラウザのネイティブ オブジェクト（DOM ノード、CSS ルール）と JavaScript オブジェクト間の双方向の依存関係を反映する機能があります。この機能は、デタッチされ、忘れられた DOM サブツリーがあるために発生する、目に見えないリークを検出するのに役立ちます。




DOM リークは考えている以上に大きくなることがあります。以下のサンプルを考えてみましょう。#tree の GC が行われるのはどのタイミングでしょう。



      var select = document.querySelector;
      var treeRef = select("#tree");
      var leafRef = select("#leaf");
      var body = select("body");
    
      body.removeChild(treeRef);
    
      //#tree can't be GC yet due to treeRef
      treeRef = null;
    
      //#tree can't be GC yet due to indirect
      //reference from leafRef
    
      leafRef = null;
      //#NOW can be #tree GC
    

`#leaf` はその親（parentNode）への参照を保持し、再帰的に `#tree` まで参照するため、leafRef が Null フィールドになる場合のみ、`#tree` の下のツリー全体が GC の候補になります。



![DOM サブツリー](imgs/treegc.png)

<p class="note">
    <strong>例:</strong>
     DOM ノードでリークが発生する状況とリークを検出する方法を理解するには、こちらの <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html">DOM ノードのリーク</a>の例をお試しください。あわせて、<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html">DOM リークが予想以上に大きくなる</a>例もご覧ください。
</p>

DOM リークとメモリ分析の基礎について詳しく理解するには、[Chrome DevTools を使用してメモリリークを見つけてデバッグする](http://slid.es/gruizdevilla/memory)（Gonzalo Ruiz de Villa 著）をご覧ください。


<p class="note">
    <strong>例:</strong>
     デタッチされた DOM ツリーを操作する場合は、こちらの<a href="https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks">デモ</a>をお試しください。
</p>




{# wf_devsite_translation #}
