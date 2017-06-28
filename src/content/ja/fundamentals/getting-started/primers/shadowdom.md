project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ウェブ デベロッパーは Shadow DOM を使用して、ウェブ コンポーネント用の区分化された DOM と CSS を作成できます。

{# wf_updated_on: 2016-10-13 #}
{# wf_published_on: 2016-08-01 #}

# Shadow DOM v1: 自己完結型ウェブ コンポーネント {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc}

Shadow DOM は、ウェブアプリ構築における扱いにくさを取り除きます。扱いにくさは、HTML、CSS、および JS がグローバルであるという性質から生じます。この問題を回避するために、何年もかけて[さまざま](http://getbem.com/introduction/)な[ツール](https://github.com/css-modules/css-modules)を[数多く](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)開発してきました。たとえば、新しい HTML の id や class を使用するときに、ページで使用されている既存の名前と競合するかどうかは通知されません。[些細なバグ](http://www.2ality.com/2012/08/ids-are-global.html)が少しずつ増えたり、CSS の特殊性が大きな問題となったり（`!important` による指定のすべて）、スタイル セレクターが制御不可能になったり、[パフォーマンスが損なわれたり](/web/updates/2016/06/css-containment)します。他にもまだまだあります。


**Shadow DOM は CSS と DOM を調整します**。ウェブ プラットフォームに **scoped スタイル**を導入します。
ツールや命名規則がなくても、Vanilla JavaScript で **CSS とマークアップをバンドルし**、実装の詳細を非表示にして、**自己完結型のコンポーネントを作成**できます。



## はじめに {: #intro}

注: **Shadow DOM についてよく理解していますか？**この記事では、新しい<a href="http://w3c.github.io/webcomponents/spec/shadow/" target="_blank">
Shadow DOM v1 仕様</a>について記述しています。Shadow DOM を使用している場合は、<a href="https://www.chromestatus.com/features/4507242028072960">
Chrome 35 に付属している v0 バージョン</a>と webcomponents.js polyfill をよく理解しているでしょう。概念は同じですが、v1 仕様の API には重要な違いがあります。またこれは、すべての主要ブラウザが実装に同意しているバージョンでもあり、Safari Tech Preview と Chrome Canary には既に実装されています。このまま読み進めて新機能を確認するか、<a href="#historysupport">
経緯ブラウザとブラウザ対応</a>のセクションで詳細を参照してください。


Shadow DOM は、4 つのウェブ コンポーネント標準である [HTML Templates](https://www.html5rocks.com/en/tutorials/webcomponents/template/)、[Shadow DOM][sd_spec_whatwg]、[カスタム要素](/web/fundamentals/getting-started/primers/customelements)、および [HTML Imports](https://www.html5rocks.com/en/tutorials/webcomponents/imports/) の 1 つです。





Shadow DOM を使用するウェブ コンポーネントを作成する必要はありません。ただし、作成する場合は、そのメリット（CSS スコープ、DOM カプセル化、コンポジション）を活用し、弾力性があり、適合性と再利用性が非常に高い再利用可能な[カスタム要素](/web/fundamentals/getting-started/primers/customelements)を作成します。カスタム要素が新しい HTML を（JS API を使用して）作成する方法であるなら、Shadow DOM はその HTML と CSS を提供する方法です。2 つの API を組み合わせて、自己完結型の HTML、CSS、および JavaScript でコンポーネントを作成します。


Shadow DOM は、コンポーネント ベースのアプリを構築するためのツールとして設計されています。このため、ウェブ開発に共通の問題に、次のような解決策を提供します。


- **隔離された DOM**: コンポーネントの DOM は自己完結型です（たとえば、`document.querySelector()` はコンポーネントの Shadow DOM 内のノードを返しません）。
- **Scoped CSS**: Shadow DOM 内で定義された CSS のスコープは、その Shadow DOM に設定されます。スタイルルールは DOM 外には適用されず、ページのスタイルが外部から適用されることもありません。
- **コンポジション**: コンポーネント用の宣言型のマークアップ ベースの API を設計します。
- **CSS の簡略化** - スコープが設定された DOM とは、単純な CSS セレクター、より汎用的な id または class 名を使用することができ、名前の競合を心配する必要がないことを意味します。
- **生産性** - 1 つの大きな（グローバル）ページではなく、複数の DOM のまとまりとしてアプリを考えます。


注: ウェブ コンポーネント以外でも、Shadow DOM API とそのメリットは活用できますが、ここではカスタム要素に基づく例のみを紹介します。すべての例で、カスタム要素 v1 API を使用します。




####  `fancy-tabs`デモ{: #demo}

この記事全体を通じて、デモ コンポーネント（`<fancy-tabs>`）と、そこからのコード スニペットを使用しています。
ご使用のブラウザで API がサポートされていれば、以下のライブデモを表示できるはずです。
表示されない場合は、<a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
Github で完全なソース</a>を確認してください。


<figure class="demoarea">
  <iframe style="height:360px;width:100%;border:none" src="https://rawgit.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b/raw/fancy-tabs-demo.html"></iframe>
  <figcaption>
    <a href="https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b" target="_blank">
      Github でソースを表示
    </a>
  </figcaption>
</figure>

## Shadow DOM とは {: #what}

#### DOM の背景 {: #sdbackground}

ウェブは HTML の使いやすさにより発展してきました。タグをいくつか宣言するだけで、数秒で表現と構造を兼ね備えたページを作成できます。ただし、HTML だけではそれほど便利ではありません。人間にとって、テキストベースの言語を理解するのは簡単ですが、機械には助けが必要です。そこで Document Object Model（DOM）が導入されます。


ブラウザはウェブページを読み込む際、さまざまな特別な処理を行います。そのような処理の 1 つは、作成者の HTML をライブ ドキュメントに変換することです。基本的に、ブラウザは、ページの構造を理解するために、HTML（テキストの静的文字列）を解析してデータモデル（オブジェクトまたはノード）にします。ブラウザは、このようなノードのツリー（DOM）を作成することで、HTML の階層を保持します。DOM の優れた点は、これがページのライブ表現であることです。私たちが作成する静的 HTML とは異なり、ブラウザによって生成されるノードには、プロパティとメソッドが含まれます。また、何よりもよいのは、プログラムで操作できることです。これが、JavaScript を使用して、直接 DOM 要素を作成できる理由です。



    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello world!';
    header.appendChild(h1);
    document.body.appendChild(header);
    

このコードは、以下の HTML マークアップになります。


    <body>
      <header>
        <h1>Hello DOM</h1>
      </header>
    </body>
    

背景については、これくらいで十分でしょう。では、[_Shadow DOM_](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/) とは一体何でしょうか。


#### 陰にある DOM {: #sddom}

Shadow DOM は単なる通常の DOM ですが、次の 2 つの点が異なっています。1）作成方法と使用方法、および 2）ページの残りの部分との関係でどのように動作するかです。通常は、DOM ノードを作成し、ノードを別の要素の子として追加します。Shadow DOM では、要素に追加されているが、その実際の子とは分離されている、スコープが設定された DOM ツリーを作成します。このスコープが設定されたサブツリーは **Shadow ツリー**と呼ばれます。Shadow ツリーが追加されている要素は **Shadow ホスト**です。
`<style>` を含め、Shadow で追加したものはすべてホスト要素に対してローカルになります。これが、Shadow DOM が CSS スタイルのスコープを設定する仕組みです。


## Shadow DOM の作成 {: #create}

**Shadow ルート**は、「ホスト」要素に追加されるドキュメント フラグメントです。Shadow ルートを追加することで、要素がその Shadow DOM を取得します。
要素の Shadow DOM を作成するには、`element.attachShadow()` を呼び出します。



    const header = document.createElement('header');
    const shadowRoot = header.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().
    
    // header.shadowRoot === shadowRoot
    // shadowRoot.host === header
    

ここでは `.innerHTML` を使用して Shadow ルートに値を入力していますが、他の DOM API を使用することもできます。
これがウェブです。自由に選択できるのです。

仕様では、Shadow ツリーをホストできない[要素のリストが定義](http://w3c.github.io/webcomponents/spec/shadow/#h-methods)されています。
要素がこのリストに含まれる理由は複数あります。


- ブラウザが既に、要素に対して独自の内部 Shadow DOM をホストしている（`<textarea>`、`<input>`）。
- その要素が Shadow DOM をホストするのは合理的でない（`<img>`）。

たとえば、これはうまくいきません。


    document.createElement('input').attachShadow({mode: 'open'});
    // Error. `<input>` cannot host shadow dom.
    

### カスタム要素の Shadow DOM の作成 {: #elements}

Shadow DOM は、[カスタム要素](/web/fundamentals/getting-started/primers/customelements)を作成するときに特に役立ちます。Shadow DOM を使用して要素の HTML、CSS、および JS を区分化することで、「ウェブ コンポーネント」を生成します。




**例** - カスタム要素が **Shadow DOM をそれ自身に追加**して、DOM と CSS をカプセル化する:


    // Use custom elements API v1 to register a new HTML tag and define its JS behavior
    // using an ES6 class. Every instance of <fancy-tab> will have this same prototype.
    customElements.define('fancy-tabs', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to <fancy-tabs>.
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
          <div id="tabs">...</div>
          <div id="panels">...</div>
        `;
      }
      ...
    });

ここでは興味深いことがいくつか行われています。1 つ目は、`<fancy-tabs>` のインスタンスが作成されたときに、カスタム要素が**独自の Shadow DOM を作成**していることです。これは `constructor()` 内で行われています。2 つ目は、Shadow ルートを作成しているため、`<style>` 内の CSS ルールのスコープが `<fancy-tabs>` に設定されることです。


注: この例を実行すると、何もレンダリングされないことに気付くでしょう。
ユーザーのマークアップが消えたように見えます。これは、**要素の Shadow DOM がその子の代わりにレンダリングされる**ためです。子を表示するには、Shadow DOM に [`<slot>` 要素](#slots)を配置して、子がレンダリングされる場所をブラウザに通知する必要があります。詳細については[後述](#composition_slot)します。



## コンポジションとスロット {: #composition_slot}

コンポジションは、最もよく理解されていない Shadow DOM の機能の 1 つですが、間違いなく最も重要なものです。


ウェブ開発の世界では、コンポジションとは HTML から宣言的にアプリを構築する方法のことです。
異なる構成要素（`<div>`、`<header>`、`<form>`、`<input>`）が集まって、アプリを構成します。これらのタグの中には、連携して動作するものもあります。`<select>`、`<details>`、`<form>`、および `<video>` などのネイティブ要素の柔軟性が非常に高い理由は、コンポジションにあります。これらのタグはそれぞれ、特定の HTML を子として受け入れ、それらに特別な処理を行います。たとえば、`<select>` は `<option>` と `<optgroup>` をドロップダウンと複数選択ウィジェットにレンダリングすることができます。
`<details>` 要素は `<summary>` を展開可能な矢印としてレンダリングします。
`<video>` でさえも、特定の子を処理することができます。`<source>` 要素はレンダリングされませんが、動画の動作に影響します。



### 用語: Light DOM と Shadow DOM {: #lightdom}

Shadow DOM のコンポジションによって、ウェブ開発にさまざまな新しい基盤が導入されました。
詳細を説明する前に、使用する用語を統一しておきましょう。


**Light DOM**

コンポーネントのユーザーが作成するマークアップです。この DOM はコンポーネントの Shadow DOM の外側に存在します。
これは要素の実際の子です。


    <button is="better-button">
      <!-- the image and span are better-button's light DOM -->
      <img src="gear.svg" slot="icon">
      <span>Settings</span>
    </button>
    

**Shadow DOM**

コンポーネントの作成者が作成する DOM です。Shadow DOM はコンポーネントにローカルで、その内部構造と Scoped CSS を定義し、実装の詳細をカプセル化します。また、コンポーネントの使用者が作成したマークアップをレンダリングする方法を定義することもできます。



    #shadow-root
      <style>...</style>
      <slot name="icon"></slot>
      <span id="wrapper">
        <slot>Button</slot>
      </span>
    

** フラット化された DOM ツリー**

ブラウザが Shadow DOM の中にユーザーの Light DOM を配置した結果で、これにより最終生成物がレンダリングされます。
フラット化されたツリーが、DevTools で最終的に表示され、ページにレンダリングされます。



    <button is="better-button">
      #shadow-root
        <style>...</style>
        <slot name="icon">
          <img src="gear.svg" slot="icon">
        </slot>
        <slot>
          <span>Settings</span>
        </slot>
    </button>
    

### &lt;slot&gt; 要素 {: #slots}

Shadow DOM は、`<slot>` 要素を使用して複数の異なる DOM ツリーを合成します。**スロットはコンポーネント内にあるプレースホルダで、ユーザーはこれに独自のマークアップを入れることができます**。1 つ以上のスロットを定義して、外部マークアップをコンポーネントの Shadow DOM 内でレンダリングされるように呼び込みます。
基本的には、「ユーザーのマックアップをここでレンダリングしてください」と言っているのと同じです。


注: スロットはウェブ コンポーネントに「宣言型 API」を作成する方法です。これはユーザーの DOM に組み込まれて、コンポーネント全体のレンダリングを助けます。つまり、**複数の異なる DOM ツリーを合成**します。




要素は、`<slot>` によって呼び込まれていれば、Shadow DOM の境界を「越える」ことができます。
このような要素は**分散ノード**と呼ばれます。概念上は、分散ノードは少し不思議に思えるかもしれません。
スロットは物理的には DOM を動かさず、Shadow DOM 内の別の場所でレンダリングします。


コンポーネントはその Shadow DOM 内でゼロ個以上のスロットを定義できます。スロットは空にすることも、フォールバック コンテンツを提供することもできます。
ユーザーが [Light DOM](#lightdom) コンテンツを提供していない場合、スロットはそのフォールバック コンテンツをレンダリングします。



    <!-- Default slot. If there's more than one default slot, the first is used. -->
    <slot></slot>
    
    <slot>Fancy button</slot> <!-- default slot with fallback content -->
    
    <slot> <!-- default slot entire DOM tree as fallback -->
      <h2>Title</h2>
      <summary>Description text</summary>
    </slot>
    

**名前付きスロット**を作成することもできます。名前付きスロットは Shadow DOM 内の特別な穴で、ユーザーはこれを名前で参照します。


**例** - `<fancy-tabs>` の Shadow DOM 内の名前付きスロット:


    #shadow-root
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    

コンポーネント ユーザーは `<fancy-tabs>` を次のように宣言します。


    <fancy-tabs>
      <button slot="title">Title</button>
      <button slot="title" selected>Title 2</button>
      <button slot="title">Title 3</button>
      <section>content panel 1</section>
      <section>content panel 2</section>
      <section>content panel 3</section>
    </fancy-tabs>
    
    <!-- Using <h2>'s and changing the ordering would also work! -->
    <fancy-tabs>
      <h2 slot="title">Title</h2>
      <section>content panel 1</section>
      <h2 slot="title" selected>Title 2</h2>
      <section>content panel 2</section>
      <h2 slot="title">Title 3</h2>
      <section>content panel 3</section>
    </fancy-tabs>
    

フラット化されるツリーは次のようになります。


    <fancy-tabs>
      #shadow-root
        <div id="tabs">
          <slot id="tabsSlot" name="title">
            <button slot="title">Title</button>
            <button slot="title" selected>Title 2</button>
            <button slot="title">Title 3</button>
          </slot>
        </div>
        <div id="panels">
          <slot id="panelsSlot">
            <section>content panel 1</section>
            <section>content panel 2</section>
            <section>content panel 3</section>
          </slot>
        </div>
    </fancy-tabs>
    

コンポーネントは複数の異なる構成を処理できますが、フラット化された DOM ツリーは変わらないことに注意してください。
`<button>` を `<h2>` に変更することもできます。
このコンポーネントは、`<select>` と同様に、異なる種類の子を処理するために作成されたものです。


## スタイル設定 {: #styling}

ウェブ コンポーネントのスタイル設定には多数のオプションがあります。Shadow DOM を使用するコンポーネントのスタイルは、メインページで設定することも、独自のスタイルを定義することも、ユーザーが規定値をオーバーライドできるように、フックを（[CSS カスタム プロパティ][css_props]の形式で）提供することもできます。



### コンポーネント定義のスタイル {: #host}

Shadow DOM の最も便利な機能は間違いなく **Scoped CSS** です。

- 外部ページからの CSS セレクターは、コンポーネント内部には適用されません。
- 内部で定義されたスタイルは外部に影響しません。これらのスコープはホスト要素に設定されています。

**Shadow DOM 内で使用される CSS セレクターは、コンポーネントにローカルで適用されます**。実際には、この場合もまた、ページの他の場所との競合を気にせずに、一般的な id または class 名を使用できるということです。CSS セレクターをより単純にすることが Shadow DOM 内でのベスト プラクティスです。
これはパフォーマンスの面でも優れています。

**例** - Shadow ルートで定義されたスタイルはローカル


    #shadow-root
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          ...
        }
        #tabs {
          display: inline-flex;
          ...
        }
      </style>
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

Shadow ツリーにはスタイルシートのスコープも適用されます。


    #shadow-root
      <!-- Available in Chrome 54+ -->
      <!-- WebKit bug: https://bugs.webkit.org/show_bug.cgi?id=160683 -->
      <link rel="stylesheet" href="styles.css">
      <div id="tabs">
        ...
      </div>
      <div id="panels">
        ...
      </div>
    

`multiple` 属性を追加したときに、`<select>` 要素がどのように（ドロップダウンではなく）複数選択ウィジェットをレンダリングするのか、疑問に思ったことはありませんか。


<select multiple>
  <option>Do</option>
  <option selected>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>So</option>
</select>

`<select>` は、この要素に対して宣言された属性に基づいて、それ自身に異なるスタイルを設定できます。
ウェブ コンポーネントも、`:host` セレクターを使用してそれ自身にスタイルを設定できます。


**例** - それ自身にスタイルを設定するコンポーネント


    <style>
    :host {
      display: block; /* by default, custom elements are display: inline */
      contain: content; /* CSS containment FTW. */
    }
    </style>
    

`:host` に関する問題点の 1 つは、親ページのルールによる指定の優先度が、要素で定義されている `:host` ルールよりも高いことです。
つまり、外部のスタイルが優先されます。このため、ユーザーは外部から最上位のスタイルをオーバーライドできます。
また、`:host` は Shadow ルートのコンテキスト内でしか機能しないため、これを Shadow DOM の外側で使用することはできません。



正しい形式の `:host(<selector>)` を使用すると、ホストが `<selector>` に一致する場合に、ホストをターゲットにすることができます。
これは、ホストに基づいてユーザー操作または状態、またはスタイルの内部ノードに反応する動作をコンポーネントがカプセル化するための優れた方法です。




    <style>
    :host {
      opacity: 0.4;
      will-change: opacity;
      transition: opacity 300ms ease-in-out;
    }
    :host(:hover) {
      opacity: 1;
    }
    :host([disabled]) { /* style when host has disabled attribute. */
      background: grey;
      pointer-events: none;
      opacity: 0.4;
    }
    :host(.blue) {
      color: blue; /* color host when it has class="blue" */
    }
    :host(.pink) > #tabs {
      color: pink; /* color internal #tabs node when host has class="pink". */
    }
    </style>
    

### コンテキストに基づくスタイル設定 {: #contextstyling}

`:host-context(<selector>)` は、コンポーネントまたはそのいずれかの祖先が `<selector>` に一致する場合に、コンポーネントに一致します。
これの一般的な使用方法は、コンポーネントの周囲の要素に基づいたテーマの設定です。
たとえば、多くの人が `<html>` または `<body>` にクラスを適用することで、テーマを設定しています。



    <body class="darktheme">
      <fancy-tabs>
        ...
      </fancy-tabs>
    </body>
    

`:host-context(.darktheme)` は、`<fancy-tabs>` が `.darktheme` の子孫である場合に、この要素にスタイルを設定します。



    :host-context(.darktheme) {
      color: white;
      background: black;
    }
    

`:host-context()` はテーマの設定に役立ちますが、より優れた方法は、[CSS カスタム プロパティを使用してスタイルフックを作成](#stylehooks)することです。


### 分散ノードのスタイル設定 {: #stylinglightdom}

`::slotted(<compound-selector>)` は、`<slot>` に分散されるノードに一致します。


たとえば、ネームバッジ コンポーネントを作成したとしましょう。


    <name-badge>
      <h2>Eric Bidelman</h2>
      <span class="title">
        Digital Jedi, <span class="company">Google</span>
      </span>
    </name-badge>
    

コンポーネントの Shadow DOM は、ユーザーの `<h2>` と `.title` にスタイルを設定できます。


    <style>
    ::slotted(h2) {
      margin: 0;
      font-weight: 300;
      color: red;
    }
    ::slotted(.title) {
       color: orange;
    }
    /* DOESN'T WORK (can only select top-level nodes).
    ::slotted(.company),
    ::slotted(.title .company) {
      text-transform: uppercase;
    }
    */
    </style>
    <slot></slot>
    

前述したとおり、`<slot>` はユーザーの Light DOM は動かしません。ノードが `<slot>` に分散されると、`<slot>` はその DOM をレンダリングしますが、ノードの実際の位置は変わりません。**分散前に適用されていたスタイルは、分散後も引き続き適用されます**。ただし、Light DOM が分散された場合は、追加のスタイル（Shadow DOM により定義されたスタイル）を使用できます。


`<fancy-tabs>` のより詳細な別の例を以下に示します。


    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
        #panels {
          box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
          background: white;
          border-radius: 3px;
          padding: 16px;
          height: 250px;
          overflow: auto;
        }
        #tabs {
          display: inline-flex;
          -webkit-user-select: none;
          user-select: none;
        }
        #tabsSlot::slotted(*) {
          font: 400 16px/22px 'Roboto';
          padding: 16px 8px;
          ...
        }
        #tabsSlot::slotted([aria-selected="true"]) {
          font-weight: 600;
          background: white;
          box-shadow: none;
        }
        #panelsSlot::slotted([aria-hidden="true"]) {
          display: none;
        }
      </style>
      <div id="tabs">
        <slot id="tabsSlot" name="title"></slot>
      </div>
      <div id="panels">
        <slot id="panelsSlot"></slot>
      </div>
    `;
    

この例では、タブのタイトル用の名前付きスロットと、タブのコンテンツ用の名前付きスロットの 2 つのスロットがあります。
ユーザーがタブを選択したら、選択されたタブを太字にし、そのパネルを表示します。
これは、`selected` 属性を持つ分散ノードを選択することによって行われます。
カスタム要素の JS（ここには示していません）は、その属性を適切な時に追加します。


### 外部からのコンポーネントのスタイル設定 {: #stylefromoutside}

外部からコンポーネントのスタイルを設定するには、いくつかの方法があります。最も簡単は方法は、タグ名をセレクターとして使用することです。



    fancy-tabs {
      width: 500px;
      color: red; /* Note: inheritable CSS properties pierce the shadow DOM boundary. */
    }
    fancy-tabs:hover {
      box-shadow: 0 3px 3px #ccc;
    }
    

**外部スタイルは常に、Shadow DOM 内で定義されたスタイルより優先されます**。たとえば、ユーザーがセレクター `fancy-tabs { width: 500px; }` を作成すると、これがコンポーネントのルール `:host { width: 650px;}` より優先されます。



コンポーネント自体にスタイルを設定しても、コンポーネントにしか適用されません。コンポーネントの内部にスタイルを設定するには、どうすればよいでしょうか。
これには、CSS カスタム プロパティが必要です。


#### CSS カスタム プロパティを使用したスタイルフックの作成 {: #stylehooks}

コンポーネントの作成者が [CSS カスタム プロパティ][css_props]を使用してスタイルフックを提供している場合、ユーザーは内部スタイルを調整できます。
概念的には、このアイデアは `<slot>` に似ています。
ユーザーがオーバーライドできる「スタイル プレースホルダ」を作成するのです。

**例** - `<fancy-tabs>` で、ユーザーが背景色をオーバーライドできるようにする:


    <!-- main page -->
    <style>
      fancy-tabs {
        margin-bottom: 32px;
        --fancy-tabs-bg: black;
      }
    </style>
    <fancy-tabs background>...</fancy-tabs>
    

その Shadow DOM の内部:


    :host([background]) {
      background: var(--fancy-tabs-bg, #9E9E9E);
      border-radius: 10px;
      padding: 10px;
    }
    

この場合、コンポーネントはユーザーが指定した値であるため、`black` を背景の値として使用します。
そうでない場合は、既定値の `#9E9E9E` を使用します。

注: コンポーネント作成者は、デベロッパーに、使用できる CSS カスタム プロパティを教える必要があります。
これはコンポーネントの公開インターフェースの一部と考えてください。
スタイルフックについても必ずドキュメントに記載してください。


## 高度なトピック {: #advanced}

### クローズド Shadow ルートの作成（非推奨） {: #closed}

Shadow DOM の別の特長は、「クローズド」モードと呼ばれます。クローズド Shadow ツリーを作成すると、外部の JavaScript はコンポーネントの内部 DOM にアクセスできなくなります。これは、`<video>` などのネイティブ要素の動作と似ています。ブラウザは `<video>` の Shadow DOM をクローズド モードの Shadow ルートを使用して実装しているため、JavaScript はこの Shadow DOM にアクセスできません。



**例** - クローズド Shadow ツリーの作成:


    const div = document.createElement('div');
    const shadowRoot = div.attachShadow({mode: 'closed'}); // close shadow tree
    // div.shadowRoot === null
    // shadowRoot.host === div
    

その他の API もクローズド モードの影響を受けます。

- `Element.assignedSlot` または `TextNode.assignedSlot` は `null` を返します。
- Shadow DOM 内の要素に関連付けられているイベントの `Event.composedPath()` は [] を返します。


注: クローズド Shadow ルートはそれほど便利ではありません。デベロッパーの中には、クローズド モードを人工的なセキュリティ機能であると考える人もいます。
しかし、はっきり言って、これはセキュリティ機能では**ありません**。
クローズド モードは単に、外部 JS が要素の内部 DOM にアクセスできないようにするだけです。



`{mode: 'closed'}` を使用してウェブ コンポーネントを作成すべきではない理由を以下にまとめます。


1. うわべだけのセキュリティ。攻撃者が `Element.prototype.attachShadow` をハイジャックするのを止めることはできません。


2. クローズド モードは**カスタム要素コードが、それ自身の Shadow DOM にアクセスできないようにします**。
これは完全な間違いです。`querySelector()` などの要素を後で使用する必要がある場合、その参照を隠しておかなければなりません。
これはクローズド モードの本来の目的を完全に損なうものです。


        customElements.define('x-element', class extends HTMLElement {
          constructor() {
            super(); // always call super() first in the ctor.
            this._shadowRoot = this.attachShadow({mode: 'closed'});
            this._shadowRoot.innerHTML = '<div class="wrapper"></div>';
          }
          connectedCallback() {
            // When creating closed shadow trees, you'll need to stash the shadow root
            // for later if you want to use it again. Kinda pointless.
            const wrapper = this._shadowRoot.querySelector('.wrapper');
          }
          ...
        });

3. **クローズド モードは、ユーザーにとってのコンポーネントの柔軟性を失わせることになります。** ウェブ コンポーネントを作成していると、機能を追加し忘れるときがやってきます。構成オプション。ユーザーが希望するユースケース。内部ノードに十分なスタイルフックを追加し忘れるのは、典型的な例です。クローズド モードでは、ユーザーが既定値をオーバーライドしてスタイルを調整する方法はありません。コンポーネントの内部にアクセスできることは、非常に有用です。コンポーネントにユーザーの希望する機能がない場合、ユーザーは最終的に、コンポーネントをフォークするか、別のコンポーネントを探すか、自分自身でコンポーネントを作成するでしょう。


### JS でのスロットの使用 {: #workwithslots}

Shadow DOM API は、スロットや分散ノードを使用するためのユーティリティを提供します。これは、カスタム要素を作成するときに役立ちます。

#### slotchange イベント {: #slotchange}

`slotchange` イベントは、スロットの分散ノードが変更されたときに呼び出されます。たとえば、ユーザーが Light DOM から子を追加または削除した場合です。



    const slot = this.shadowRoot.querySelector('#slot');
    slot.addEventListener('slotchange', e => {
      console.log('light dom children changed!');
    });
    
注: コンポーネントのインスタンスが最初に初期化されたときには、`slotchange` は呼び出されません。


Light DOM への他の種類の変更を監視するには、要素のコンストラクタで [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) を設定します。



#### スロットでレンダリングされる要素 {: #slotnodes}

どの要素がスロットに関連付けられているのかを把握しておくと、便利な場合があります。スロットでレンダリングされる要素を確認するには、`slot.assignedNodes()` を呼び出します。
`{flatten: true}` オプションでも、スロットのフォールバック コンテンツが返されます（分散されているノードがない場合）。



例として、次のような Shadow DOM があるとしましょう。

    <slot><b>fallback content</b></slot>

<table>
  <thead><th>使用方法</th><th>呼び出し</th><th>結果</th></tr></thead>
  <tr>
    <td>&lt;button is="better-button"&gt;My button&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[text]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button">&lt;/button&gt;</td>
    <td><code>slot.assignedNodes();</code></td>
    <td><code>[]</code></td>
  </tr>
  <tr>
    <td>&lt;button is="better-button"&gt;&lt;/button&gt;</td>
    <td><code>slot.assignedNodes({flatten: true});</code></td>
    <td><code>[&lt;b&gt;fallback content&lt;/b&gt;]</code></td>
  </tr>
</table>

#### 要素が割り当てられているスロット {: #assignedslot}

逆の質問に答えることもできます。`element.assignedSlot` を使用すると、要素が割り当てられているコンポーネント スロットがわかります。


### Shadow DOM イベントモデル {: #events}

イベントが発生して Shadow DOM の外に出ると、Shadow DOM が提供するカプセル化を維持するように、イベントのターゲットが調整されます。
つまり、イベントは、Shadow DOM 内の内部要素ではなく、コンポーネントから発生したかのようにターゲットが再設定されます。イベントによっては、Shadow DOM の外には伝播しないものもあります。

Shadow 境界を**越えない**イベントは次のとおりです。

- フォーカス イベント: `blur`、`focus`、`focusin`、`focusout`
- マウスイベント: `click`、`dblclick`、`mousedown`、`mouseenter`、`mousemove` など
- ホイール イベント: `wheel`
- 入力イベント: `beforeinput`、`input`
- キーボード イベント: `keydown`、`keyup`
- コンポジション イベント: `compositionstart`、`compositionupdate`、`compositionend`
- ドラッグ イベント: `dragstart`、`drag`、`dragend`、`drop` など

**ヒント**

Shadow ツリーが開いている場合、`event.composedPath()` を呼び出すと、イベントが通過するノードの配列が返されます。


#### カスタム イベントの使用 {: #customevents}

Shadow ツリーの内部ノードで呼び出されるカスタム DOM イベントは、そのイベントが `composed: true` フラグを使用して作成されたものでない限り、Shadow 境界の外には出てきません。




    // Inside <fancy-tab> custom element class definition:
    selectTab() {
      const tabs = this.shadowRoot.querySelector('#tabs');
      tabs.dispatchEvent(new Event('tab-select', {bubbles: true, composed: true}));
    }
    

`composed: false`（既定）の場合は、ユーザーは Shadow ルートの外部でイベントをリッスンできなくなります。



    <fancy-tabs></fancy-tabs>
    <script>
      const tabs = document.querySelector('fancy-tabs');
      tabs.addEventListener('tab-select', e => {
        // won't fire if `tab-select` wasn't created with `composed: true`.
      });
    </script>
    

###  フォーカスの処理{: #focus}

[Shadow DOM のイベントモデル](#events)で説明したように、Shadow DOM 内で呼び出されるイベントは、ホスト要素から発生したように調整されます。たとえば、Shadow ルート内で `<input>` をクリックしたとします。




    <x-focus>
      #shadow-root
        <input type="text" placeholder="Input inside shadow dom">
    

`focus` イベントは `<input>` ではなく、`<x-focus>` から発生したかのように見えます。
同様に、`document.activeElement` は `<x-focus>` となります。Shadow ルートが `mode:'open'`（[クローズド モード](#closed)を参照）で作成された場合は、フォーカスされた内部ノードにもアクセスできます。



    document.activeElement.shadowRoot.activeElement // only works with open mode.

出現する Shadow DOM のレベルが複数ある場合は（別のカスタム要素内のカスタム要素など）、`activeElement` を検出するために Shadow ルートを再帰的にドリルする必要があります。




    function deepActiveElement() {
      let a = document.activeElement;
      while (a && a.shadowRoot && a.shadowRoot.activeElement) {
        a = a.shadowRoot.activeElement;
      }
      return a;
    }
    

フォーカスの別のオプションとして `delegatesFocus: true` オプションがあります。これは、Shadow ツリー内の要素のフォーカス動作を展開します。


- Shadow DOM 内のノードをクリックし、そのノードがフォーカス可能な領域でない場合は、最初のフォーカス可能な領域がフォーカスされます。

- Shadow DOM 内のノードがフォーカスされると、フォーカスされる要素に加え、ホストにも `:focus` が適用されます。


**例** - `delegatesFocus: true` がフォーカス動作を変更する方法


    <style>
      :focus {
        outline: 2px solid red;
      }
    </style>
    
    <x-focus></x-focus>
    
    <script>
    customElements.define('x-focus', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
    
        const root = this.attachShadow({mode: 'open', delegatesFocus: true});
        root.innerHTML = `
          <style>
            :host {
              display: flex;
              border: 1px dotted black;
              padding: 16px;
            }
            :focus {
              outline: 2px solid blue;
            }
          </style>
          <div>Clickable Shadow DOM text</div>
          <input type="text" placeholder="Input inside shadow dom">`;
    
        // Know the focused element inside shadow DOM:
        this.addEventListener('focus', function(e) {
          console.log('Active element (inside shadow dom):',
                      this.shadowRoot.activeElement);
        });
      }
    });
    </script>
    

**結果**

<img src="imgs/delegateFocusTrue.png" title="delegatesFocus: true behavior">

上記は `<x-focus>` がフォーカスされた場合（ユーザーによるクリック、タブ付き、`focus()` など）、「クリック可能な Shadow DOM テキスト」がクリックされた場合、または内部の `<input>` がフォーカスされた場合（`autofocus` など）の結果です。



`delegatesFocus: false` を設定した場合は、代わりに以下が表示されます。

<figure>
  <img src="imgs/delegateFocusFalse.png">
  <figcaption>
    <code>delegatesFocus: false</code> と内部の  <code>&lt;input></code> がフォーカスされます。
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusFalseFocus.png">
  <figcaption>
    <code>delegatesFocus: false</code> と  <code>&lt;x-focus></code>
がフォーカスされます（ <code>tabindex="0"</code> が設定されるなど）。
  </figcaption>
</figure>

<figure>
  <img src="imgs/delegateFocusNothing.png">
  <figcaption>
    <code>delegatesFocus: false</code> と「クリック可能な Shadow DOM テキスト」がクリックされます（または要素の Shadow DOM 内の他の空の領域がクリックされます）。
  </figcaption>
</figure>


## おすすめの方法とコツ {: #tricks}

私は何年にもわたり、ウェブ コンポーネントの作成について学んできました。ここで紹介するおすすめの方法は、コンポーネントの作成や Shadow DOM のデバッグに役立つと思います。



### CSS Containment {: #containment}

通常、ウェブ コンポーネントのレイアウト、スタイル、ペイントはかなり自己完結型です。完全に自己完結したものにするために、`:host` で [CSS Containment](/web/updates/2016/06/css-containment) を使用します。




    <style>
    :host {
      display: block;
      contain: content; /* Boom. CSS containment FTW. */
    }
    </style>
    

### 継承可能なスタイルのリセット {: #reset}

継承可能なスタイル（`background`、`color`、`font`、`line-height` など）は、Shadow DOM でも引き続き継承されます。
つまり、これらは既定で Shadow DOM の境界を越えます。
新しい状態で開始する必要がある場合は、`all: initial;` を使用して、継承可能なスタイルが Shadow 境界を越えたときにスタイルを初期値にリセットします。



    <style>
      div {
        padding: 10px;
        background: red;
        font-size: 25px;
        text-transform: uppercase;
        color: white;
      }
    </style>
    
    <div>
      <p>I'm outside the element (big/white)</p>
      <my-element>Light DOM content is also affected.</my-element>
      <p>I'm outside the element (big/white)</p>
    </div>
    
    <script>
    const el = document.querySelector('my-element');
    el.attachShadow({mode: 'open'}).innerHTML = `
      <style>
        :host {
          all: initial; /* 1st rule so subsequent properties are reset. */
          display: block;
          background: white;
        }
      </style>
      <p>my-element: all CSS properties are reset to their
         initial value using <code>all: initial</code>.</p>
      <slot></slot>
    `;
    </script>

{% framebox height="195px" %}
<div class="demoarea">
  <style>
    #initialdemo {
      padding: 10px;
      background: red;
      font-size: 25px;
      text-transform: uppercase;
      color: white;
    }
  </style>

  <div id="initialdemo">
    <p>I'm outside the element (big/white)</p>
    <my-element>Light DOM content is also affected.</my-element>
    <p>I'm outside the element (big/white)</p>
  </div>
</div>

<script>
function supportsShadowDOM() {
  return !!HTMLElement.prototype.attachShadow;
}

if (supportsShadowDOM()) {
  const el = document.querySelector('#initialdemo my-element');
  el.attachShadow({mode: 'open'}).innerHTML = `
    <style>
      :host {
        all: initial; /* 1st rule so subsequent properties are reset. */
        display: block;
        background: white;
      }
    </style>
    <p>my-element: all CSS properties are reset to their
       initial value using <code>all: initial</code>.</p>
    <slot></slot>
  `;
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

### ページで使用されるすべてのカスタム要素の検出 {: #findall}

ページで使用されているカスタム要素を検出すると便利な場合があります。これを行うには、ページで使用されているすべての要素の Shadow DOM を再帰的に走査する必要があります。



    const allCustomElements = [];
    
    function isCustomElement(el) {
      const isAttr = el.getAttribute('is');
      // Check for <super-button> and <button is="super-button">.
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    }
    
    function findAllCustomElements(nodes) {
      for (let i = 0, el; el = nodes[i]; ++i) {
        if (isCustomElement(el)) {
          allCustomElements.push(el);
        }
        // If the element has shadow DOM, dig deeper.
        if (el.shadowRoot) {
          findAllCustomElements(el.shadowRoot.querySelectorAll('*'));
        }
      }
    }
    
    findAllCustomElements(document.querySelectorAll('*'));
    

{% comment %}
ブラウザによっては、`querySelectorAll()` での Shadow DOM v0 の `/deep/` コンビネータの使用もサポートされます。


    const allCustomElements = Array.from(document.querySelectorAll('html /deep/ *')).filter(el => {
      const isAttr = el.getAttribute('is');
      return el.localName.includes('-') || isAttr && isAttr.includes('-');
    });
    

今のところ、`/deep/` は[引き続き `querySelectorAll()` 呼び出しで動作します](https://bugs.chromium.org/p/chromium/issues/detail?id=633007)。
{% endcomment %}

### &lt;template> からの要素の作成 {: #fromtemplate}

`.innerHTML` を使用して Shadow ルートに値を設定する代わりに、宣言型の `<template>` を使用できます。
テンプレートは、ウェブ コンポーネントの構造を宣言するために理想的なプレースホルダです。


例は、[カスタム要素: 再利用可能なウェブ コンポーネントの構築](/web/fundamentals/getting-started/primers/customelements)を参照してください。


## 経緯とブラウザ対応 {: #historysupport}

過去数年間にわたりウェブ コンポーネントを使用していれば、しばらく前から Chrome 35+ と Opera に古いバージョンの Shadow DOM が付属していたことをご存じでしょう。Blink はしばらくの間、両方のバージョンのサポートを続けます。v0 仕様では、Shadow ルートを作成するための異なるメソッド（v1 の `element.attachShadow` ではなく `element.createShadowRoot`）が提供されていました。古いメソッドを呼び出すと、引き続き v0 セマンティックで Shadow ルートが作成されるため、既存の v0 コードに問題は発生しません。



古い v0 の仕様に興味がある場合は、html5rocks の記事（[1](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)、[2](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/)、[3](https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/)）をご覧ください。[Shadow DOM v0 と v1 の違い][differences]を説明した優れた記事もあります。







### ブラウザ対応 {: #support}

Chrome 53（[ステータス](https://www.chromestatus.com/features/4667415417847808)）、Opera 40、Safari 10 には Shadow DOM v1 が付属しています。
Edge は[高い優先度で]検討中です(https://developer.microsoft.com/en-us/microsoft-edge/platform/status/shadowdom/)。Mozilla
には、実装に際して[未対応のバグ](https://bugzilla.mozilla.org/show_bug.cgi?id=811542)があります。



Shadow DOM の機能を検出するには、`attachShadow` が存在するかどうかを確認します。


    const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;
    

    
####  Polyfill{: #polyfill}

さまざまなブラウザで広くサポートされるようになるまでは、[shadydom](https://github.com/webcomponents/shadydom) と [shadycss](https://github.com/webcomponents/shadycss) の Polyfill により v1 機能が提供されます。Shady DOM は Shadow DOM の DOM スコープの設定、shadycss Polyfill の CSS カスタム プロパティ、ネイティブ API が提供するスタイルのスコープ設定を模倣します。


Polyfill のインストール:

    bower install --save webcomponents/shadydom
    bower install --save webcomponents/shadycss

Polyfill の使用:


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.async = true;
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }

    // Lazy load the polyfill if necessary.
    if (!supportsShadowDOMV1) {
      loadScript('/bower_components/shadydom/shadydom.min.js')
        .then(e => loadScript('/bower_components/shadycss/shadycss.min.js'))
        .then(e => {
          // Polyfills loaded.
        });
    } else {
      // Native shadow dom v1 support. Go to go!
    }


スタイルのシムやスコープの設定方法の詳細については、[https://github.com/webcomponents/shadycss#usage](https://github.com/webcomponents/shadycss)
をご覧ください。


## まとめ

初めて、適切な CSS スコープと DOM スコープを設定し、真のコンポジションを持つ API プリミティブができました。
カスタム要素などの他のウェブ コンポーネント API と組み合わせることで、Shadow DOM は、ハックや `<iframe>` などの古い要素を使用することなく、真にカプセル化されたコンポーネントを作成する方法を提供します。



誤解しないでください。Shadow DOM は、間違いなく複雑で、使いこなすのは大変です。しかし、努力して使い方を習得するだけの価値はあります。
しばらく使ってみてください。使い方を覚えながら、質問してください。

#### 参考資料

- [Shadow DOM v1 と v0 の違い][differences]
- WebKit ブログの [Introducing Slot-Based Shadow DOM API](https://webkit.org/blog/4096/introducing-shadow-dom-api/)
- [Philip Walton](https://twitter.com/@philwalton) の [Web Components and the future of Modular CSS](https://philipwalton.github.io/talks/2015-10-26/)
- Google の Web Fundamentals の[カスタム要素: 再利用可能なウェブ コンポーネントの構築](/web/fundamentals/getting-started/primers/customelements)
- [Shadow DOM v1 仕様][sd_spec_whatwg]
- [カスタム要素 v1 仕様][ce_spec]

## よくある質問

**今すぐ Shadow DOM v1 を使用できますか？**

polyfill があれば使用できます。[ブラウザ対応](#support)をご覧ください。

**Shadow DOM ではどのようなセキュリティ機能が提供されていますか？**

Shadow DOM はセキュリティ機能ではありません。これは、CSS のスコープを設定し、DOM ツリーをコンポーネントの中に隠すための軽量なツールです。
本当のセキュリティ境界が必要な場合は、`<iframe>` を使用してください。


**ウェブ コンポーネントでは Shadow DOM を使用しなければならないのですか？**

いいえ。Shadow DOM を使用するウェブ コンポーネントを作成する必要はありません。ただし、[Shadow DOM を使用するカスタム要素](#elements)を作成すると、CSS スコープ、DOM のカプセル化、コンポジションといった機能を利用できるようになります。



**開いている Shadow ツリーと閉じた Shadow ツリーの違いは何ですか？**

[クローズド Shadow ルート](#closed)をご覧ください。

[ce_spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[ce_article]: (/web/fundamentals/getting-started/primers/customelements)
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/
[sd_spec_whatwg]: https://dom.spec.whatwg.org/#shadow-trees
[differences]: http://hayato.io/2016/shadowdomv1/
[css_props]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables


{# wf_devsite_translation #}
