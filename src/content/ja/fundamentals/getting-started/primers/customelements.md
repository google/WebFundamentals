project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ウェブ デベロッパーは、カスタム要素を使用して、新しい HTML タグを定義したり、既存のタグを拡張したり、再利用可能なウェブ コンポーネントを作成したりすることができます。

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-06-28 #}

# カスタム要素 v1: 再利用可能なウェブ コンポーネント {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

### TL;DR {: #tldr .hide-from-toc }

ウェブ デベロッパーは、[カスタム要素][spec]を使用して、**新しい HTML タグを作成したり**、既存の HTML タグを拡張したり、他のデベロッパーが作成したコンポーネントを拡張したりすることができます。API は[ウェブ コンポーネント](http://webcomponents.org/){: .external }の基盤となるものです。API により、単に Vanilla JS、HTML、CSS を使用して再利用可能なコンポーネントを作成するためのウェブ標準ベースの方法が提供されます。その結果、アプリでは、コードが減り、モジュール型のコードが使用され、コードの再利用が増えます。

## はじめに {: #intro}

注: この記事では、新しい<a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-elements" target="_blank">カスタム要素 v1 仕様</a>について記述しています。カスタム要素を使用している場合は、<a href="https://www.chromestatus.com/features/4642138092470272">Chrome 33 に付属している v0 バージョン</a>をよく理解しているでしょう。概念は同じですが、v1 仕様の API には重要な違いがあります。このまま読み進めて新機能を確認するか、<a href="#historysupport">経緯ブラウザとブラウザ対応</a>のセクションで詳細を参照してください。

ブラウザには、HTML と呼ばれる、ウェブ アプリケーションを構築するための優れたツールが備わっています。HTML については
聞いたことがあると思います。これは宣言型であり、ポータブルかつ幅広くサポートされていて、使用も簡単です。HTML は確かに優れていますが、ボキャブラリと拡張性は限られています。[HTML Living Standard](https://html.spec.whatwg.org/multipage/){: .external } には、JS 動作をマークアップに自動的に関連付ける方法がありませんでした。しかし現在は違います。

HTML を最新化するための対処法は、カスタム要素です。カスタム要素は欠けている部分を補い、構造と動作を包括するものです。
HTML で問題を解決できない場合は、問題を解決できるカスタム要素を作成することができます。
**カスタム要素は、HTML の利点を保ちつつ、ブラウザに新たな技を組み込みます**。

## 新しい要素の定義 {: #define}

新しい HTML 要素を定義するには、JavaScript を利用する必要があります。

カスタム要素を定義し、ブラウザに新しいタグを通知するためには、`customElements` グローバルが使用されます。
作成するタグ名を指定して `customElements.define()` を呼び出し、ベース `HTMLElement` を拡張する JavaScript `class` を呼び出します。


**例** - モバイル ドロワー パネル `<app-drawer>` の定義:


    class AppDrawer extends HTMLElement {...}
    window.customElements.define('app-drawer', AppDrawer);
    
    // Or use an anonymous class if you don't want a named constructor in current scope.
    window.customElements.define('app-drawer', class extends HTMLElement {...});
    

使用例:


    <app-drawer></app-drawer>
    

重要なのは、カスタム要素の使用は、`<div>` などの要素を使用する場合とまったく変わらないことです。インスタンスをページで宣言したり、JavaScript で動的に作成したり、イベント リスナーをアタッチしたりすることができます。さらに他の例を見てみましょう。

### 要素の JavaScript API の定義 {: #jsapi}

カスタム要素の機能は、`HTMLElement` を拡張する ES2015 [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) を使用して定義されます。`HTMLElement` を拡張すると、カスタム要素は確実に DOM API 全体を継承します。したがって、クラスに追加したプロパティやメソッドはすべて、要素の DOM インターフェースの一部になります。基本的に、クラスを使用して、タグの**公開 JavaScript API** を作成します。




**例** - `<app-drawer>` の DOM インターフェースの定義:


    class AppDrawer extends HTMLElement {
    
      // A getter/setter for an open property.
      get open() {
        return this.hasAttribute('open');
      }
    
      set open(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
          this.setAttribute('open', '');
        } else {
          this.removeAttribute('open');
        }
        this.toggleDrawer();
      }
    
      // A getter/setter for a disabled property.
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Can define constructor arguments if you wish.
      constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
    
        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          // Don't toggle the drawer if it's disabled.
          if (this.disabled) {
            return;
          }
          this.toggleDrawer();
        });
      }
    
      toggleDrawer() {
        ...
      }
    }
    
    customElements.define('app-drawer', AppDrawer);
    

この例では、`open` プロパティ、`disabled` プロパティ、および `toggleDrawer()` メソッドを持つドロワーを作成しています。
また、[プロパティが HTML 属性として反映されています](#reflectattr)。

カスタム要素の便利な機能は、**クラス定義内にある `this` が DOM 要素自体を参照**（つまり、クラスのインスタンスを参照）することです。
この例では、`this` は `<app-drawer>` を参照しています。これ（😉）が、要素が `click` リスナーをそれ自身にアタッチできる仕組みです。またこれは、イベント リスナーに限定されません。要素コード内で DOM API 全体を使用できます。`this` を使用して、要素のプロパティにアクセスしたり、その子（`this.children`）を調べたり、ノードをクエリしたり（`this.querySelectorAll('.items')`）することができます。

**カスタム要素の作成ルール**

1. カスタム要素の名前には**ダッシュ（-）を含める必要があります**。つまり、`<x-tags>`、`<my-element>`、`<my-awesome-app>` はすべて有効な名前ですが、`<tabs>` と `<foo_bar>` は無効です。この要件によって、HTML パーサーは、通常の要素とカスタム要素を区別することができます。またこれによって、新しいタグが HTML に追加されたときの前方互換性が保証されます。
2. 同じタグを複数回登録することはできません。登録しようとすると、`DOMException` がスローされます。ブラウザに新しいタグを通知したら、それで終了です。取り消すことはできません。
3. HTML で自己終了が許可されるのは[数個の要素](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)だけなので、カスタム要素を自己終了にすることはできません。必ず終了タグを記述してください（<code>&lt;app-drawer&gt;&lt;/app-drawer&gt;</code>）。

## 要素の拡張 {: #extend}

カスタム要素 API は、新しい HTML 要素を作成する場合だけでなく、他のカスタム要素を拡張したり、ブラウザの組み込み HTML を拡張したりする場合にも役立ちます。


### カスタム要素の拡張 {: #extendcustomeel}

別のカスタム要素を拡張するには、そのクラス定義を拡張します。

**例** - `<app-drawer>` を拡張する `<fancy-app-drawer>` の作成:


    class FancyDrawer extends AppDrawer {
      constructor() {
        super(); // always call super() first in the ctor. This also calls the extended class' ctor.
        ...
      }
    
      toggleDrawer() {
        // Possibly different toggle implementation?
        // Use ES2015 if you need to call the parent method.
        // super.toggleDrawer()
      }
    
      anotherMethod() {
        ...
      }
    }
    
    customElements.define('fancy-app-drawer', FancyDrawer);
    

### ネイティブ HTML 要素の拡張 {: #extendhtml}

もっと便利な `<button>` を作成するとします。`<button>` の動作と機能をコピーするよりも、カスタム要素を使用して既存の要素を段階的に拡張する方がよい方法です。


**カスタム組み込み要素**は、ブラウザの組み込み HTML タグのいずれかを拡張するカスタム要素です。
既存の要素を拡張することの主な利点は、その機能（DOM プロパティ、メソッド、ユーザー補助機能）をすべて取得できることです。
[Progressive Web App](/web/progressive-web-apps/) を作成する場合、**既存の HTML 要素を段階的に拡張**するよりもよい方法はありません。

要素を拡張するには、正しい DOM インターフェースを継承するクラス定義を作成する必要があります。
たとえば、`<button>` を拡張するカスタム要素は、`HTMLElement` ではなく `HTMLButtonElement` を継承する必要があります。
同様に、`<img>` を拡張する要素は、`HTMLImageElement` を拡張する必要があります。


**例** - `<button>` の拡張:


    // See https://html.spec.whatwg.org/multipage/indices.html#element-interfaces
    // for the list of other DOM interfaces.
    class FancyButton extends HTMLButtonElement {
      constructor() {
        super(); // always call super() first in the ctor.
        this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY));
      }
    
      // Material design ripple animation.
      drawRipple(x, y) {
        let div = document.createElement('div');
        div.classList.add('ripple');
        this.appendChild(div);
        div.style.top = `${y - div.clientHeight/2}px`;
        div.style.left = `${x - div.clientWidth/2}px`;
        div.style.backgroundColor = 'currentColor';
        div.classList.add('run');
        div.addEventListener('transitionend', e => div.remove());
      }
    }
    
    customElements.define('fancy-button', FancyButton, {extends: 'button'});
    

ネイティブ要素を拡張するときに、`define()` の呼び出しが若干変わっていることに注意してください。3 番目の必須パラメータが、どのタグを拡張するかをブラウザに伝えています。これが必要なのは、多数の HTML タグが同じ DOM インターフェースを共有しているためです。たとえば、`<section>`、`<address>`、`<em>`（この他にもあります）はすべて `HTMLElement` を共有し、`<q>` と `<blockquote>` の両方が `HTMLQuoteElement` を共有します。`{extends: 'blockquote'}` を指定することによって、ブラウザは、`<q>` ではなく機能拡張された `<blockquote>` を作成することを認識します。HTML の DOM インターフェースの完全なリストは、[HTML 仕様](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces)を参照してください。


注: `HTMLButtonElement` を拡張すると、この便利なボタンに `<button>` のすべての DOM プロパティとメソッドが与えられます。これにより、`disabled` プロパティ、`click()` メソッド、`keydown` リスナー、`tabindex` 管理など、多くの要素についてチェック済みマークを付けることができ、自分で実装する必要がなくなります。代わりに、カスタム機能、具体的には `drawRipple()` メソッドで `<button>` を段階的に拡張することに注力できます。コードは少なくし、再利用を増やします。

カスタム組み込み要素の使用者は、この要素を複数の方法で使用できます。ネイティブ タグに `is=""` 属性を追加して要素を宣言できます。



    <!-- This <button> is a fancy button. -->
    <button is="fancy-button" disabled>Fancy button!</button>
    

JavaScript でインスタンスを作成できます。


    // Custom elements overload createElement() to support the is="" attribute.
    let button = document.createElement('button', {is: 'fancy-button'});
    button.textContent = 'Fancy button!';
    button.disabled = true;
    document.body.appendChild(button);
    

または、`new` 演算子を使用できます。


    let button = new FancyButton();
    button.textContent = 'Fancy button!';
    button.disabled = true;
    

`<img>` を拡張する別の例を見てみましょう。

**例** - `<img>` の拡張:


    customElements.define('bigger-img', class extends Image {
      // Give img default size if users don't specify.
      constructor(width=50, height=50) {
        super(width * 10, height * 10);
      }
    }, {extends: 'img'});
    

ユーザーはこのコンポーネントを次のように宣言します。


    <!-- This <img> is a bigger img. -->
    <img is="bigger-img" width="15" height="20">
    

または、JavaScript でインスタンスを作成します。


    const BiggerImage = customElements.get('bigger-img');
    const image = new BiggerImage(15, 20); // pass ctor values like so.
    console.assert(image.width === 150);
    console.assert(image.height === 200);
    

注: 一部のブラウザは  <code>is=""</code> 構文の実装に反対しています。これは、ユーザー補助機能や進歩的な機能拡張にとって残念なことです。ネイティブ HTML 要素を拡張することが有用であるとお考えの場合は、<a href='https://github.com/w3c/webcomponents/issues/509'>Github</a> にあなたの意見を投稿してください。

## カスタム要素応答 {: #reactions}

カスタム要素は、要素の存続期間における重要な時点でコードを実行するための、特別なライフサイクル フックを定義できます。
これらは**カスタム要素応答**と呼ばれます。

<table>
  <thead>
    <tr>
      <th>名前</th>
      <th>呼び出される状況</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>constructor</code></td>
      <td>要素のインスタンスが作成または<a href="#upgrades">アップグレード</a>されたとき。状態の初期化、イベント リスナーの設定、または <a href="#shadowdom">Shadow DOM の作成</a>に役立ちます。 <code>constructor</code> で実行できる操作の制限事項については、<a href="https://html.spec.whatwg.org/multipage/scripting.html#custom-element-conformance">仕様</a>を参照してください。</td>
    </tr>
    <tr>
      <td><code>connectedCallback</code></td>
      <td>要素が DOM に挿入されるたびに呼び出されます。リソースの取得やレンダリングなどの、セットアップ コードの実行に役立ちます。一般に、この時点まで作業を遅らせるようにする必要があります。</td>
    </tr>
    <tr>
      <td><code>disconnectedCallback</code></td>
      <td>要素が DOM から削除されるたびに呼び出されます。クリーンアップ コードの実行（イベント リスナーの削除など）に役立ちます。</td>
    </tr>
    <tr>
      <td><code>attributeChangedCallback(attrName, oldVal, newVal)</code></td>
      <td>属性が追加、削除、更新、または置換されたとき。パーサーによって要素が作成されたときの初期値に対して、または<a href="#upgrades">アップグレード</a>されたときにも呼び出されます。<b>注:</b> <code>observedAttributes</code> プロパティに示されている属性のみがこのコールバックを受け取ります。</td>
    </tr>
    <tr>
      <td><code>adoptedCallback()</code></td>
      <td>カスタム要素が新しい <code>document</code> に移動されたとき（たとえば、誰かが <code>document.adoptNode(el)</code> を呼び出したとき）。</td>
    </tr>
  </tbody>
</table>

ブラウザは、`observedAttributes` 配列でホワイトリストとして登録されているすべての属性に対して `attributeChangedCallback()` を呼び出します（[属性の変更の監視](#attrchanges)を参照）。実際のところこれはパフォーマンスの最適化です。ユーザーが `style` や `class` などの一般的な属性を変更した場合、大量のコールバックが返されることは望ましくありません。


**応答コールバックは同期的に行われます**。誰かが要素で `el.setAttribute(...)` を呼び出すと、ブラウザはすぐに `attributeChangedCallback()` を呼び出します。
同様に、要素が DOM から削除されると（たとえば、ユーザーが `el.remove()` を呼び出した場合）、その直後に `disconnectedCallback()` を受け取ります。



**例:** `<app-drawer>` へのカスタム要素応答の追加:


    class AppDrawer extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.
        ...
      }
      connectedCallback() {
        ...
      }
      disconnectedCallback() {
        ...
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        ...
      }
    }
    

応答の定義は、それに意味がある場合に行ってください。要素が十分に複雑であり、`connectedCallback()` で IndexedDB に対する接続を開いている場合は、`disconnectedCallback()` で必要なクリーンアップ作業を行ってください。ただし、注意が必要です。あらゆる状況で、DOM から要素が削除されるとは限りません。たとえば、ユーザーがタブを閉じている場合は `disconnectedCallback()` が呼び出されません。

**例:** カスタム要素を別のドキュメントに移動して、その `adoptedCallback()` を監視する:


    function createWindow(srcdoc) {
      let p = new Promise(resolve => {
        let f = document.createElement('iframe');
        f.srcdoc = srcdoc || '';
        f.onload = e => {
          resolve(f.contentWindow);
        };
        document.body.appendChild(f);
      });
      return p;
    }
    
    // 1. Create two iframes, w1 and w2.
    Promise.all([createWindow(), createWindow()])
      .then(([w1, w2]) => {
        // 2. Define a custom element in w1.
        w1.customElements.define('x-adopt', class extends w1.HTMLElement {
          adoptedCallback() {
            console.log('Adopted!');
          }
        });
        let a = w1.document.createElement('x-adopt');
    
        // 3. Adopts the custom element into w2 and invokes its adoptedCallback().
        w2.document.body.appendChild(a);
      });
    

## プロパティと属性

### 属性へのプロパティの反映 {: #reflectattr}

HTML プロパティでは、その値が HTML 属性として DOM に反映されることがよくあります。たとえば、`hidden` または `id` の値は JS では次のように変更されます。



    div.id = 'my-id';
    div.hidden = true;
    

値はライブ DOM に属性として適用されます。


    <div id="my-id" hidden>
    

これは「[属性へのプロパティの反映](https://html.spec.whatwg.org/multipage/infrastructure.html#reflecting-content-attributes-in-idl-attributes)」と呼ばれます。HTML のほぼすべてのプロパティでこれが行われます。なぜでしょうか。属性は、要素を宣言的に設定するためにも役立ち、ユーザー補助機能や CSS セレクターといった特定の API は属性を利用して機能します。


プロパティを反映することが役立つのは、**要素の DOM 表現がその JavaScript 状態と同期された状態を保つ**必要がある状況です。
プロパティを反映することが望ましい理由の 1 つは、これにより、JS の状態が変更されたときにユーザー定義のスタイルが適用されるためです。


`<app-drawer>` を思い出してみましょう。このコンポーネントが無効な場合、使用者は、コンポーネントがフェードアウトされるか、ユーザー操作が不可になる（あるいこの両方）ことを希望するでしょう。



    app-drawer[disabled] {
      opacity: 0.5;
      pointer-events: none;
    }
    

JS で `disabled` プロパティが変更された場合、ユーザーのセレクターが一致するように、この属性を DOM に追加する必要があります。
要素は、同じ名前の属性に値を反映することによって、この動作を提供できます。



    ...
    
    get disabled() {
      return this.hasAttribute('disabled');
    }
    
    set disabled(val) {
      // Reflect the value of `disabled` as an attribute.
      if (val) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
      this.toggleDrawer();
    }
    

### 属性の変更の監視 {: #attrchanges}

HTML 属性は、ユーザーが初期状態を宣言するための便利な方法です。


    <app-drawer open disabled></app-drawer>
    

要素は、`attributeChangedCallback` を定義することによって、属性の変更に応答することができます。ブラウザは、`observedAttributes` 配列に示されている属性が変更されるたびにこのメソッドを呼び出します。



    class AppDrawer extends HTMLElement {
      ...
    
      static get observedAttributes() {
        return ['disabled', 'open'];
      }
    
      get disabled() {
        return this.hasAttribute('disabled');
      }
    
      set disabled(val) {
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
      }
    
      // Only called for the disabled and open attributes due to observedAttributes
      attributeChangedCallback(name, oldValue, newValue) {
        // When the drawer is disabled, update keyboard/screen reader behavior.
        if (this.disabled) {
          this.setAttribute('tabindex', '-1');
          this.setAttribute('aria-disabled', 'true');
        } else {
          this.setAttribute('tabindex', '0');
          this.setAttribute('aria-disabled', 'false');
        }
        // TODO: also react to the open attribute changing.
      }
    }
    

この例では、`disabled` 属性が変更されたときに、`<app-drawer>` で追加の属性を設定しています。
ここでは行いませんが、**`attributeChangedCallback` を使用して、JS プロパティをその属性と同期された状態に保つ**こともできます。


## 要素のアップグレード {: #upgrades}

### 段階的に機能向上される HTML

カスタム要素は `customElements.define()` を呼び出すことによって定義されることは既に学びました。ただしこれは、カスタム要素の定義と登録を一度に行わなければならないという意味ではありません。


**カスタム要素は、その定義を登録する前に使用できます**。

段階的な機能向上はカスタム要素の特長です。つまり、ページで一連の `<app-drawer>` 要素を宣言して、ずっと後まで `customElements.define('app-drawer', ...)` を呼び出さないでおくことが可能です。これは、ブラウザが、[不明なタグ](#unknown)のおかげでカスタム要素の候補を異なる方法で処理するためです。`define()` を呼び出し、既存の要素にクラス定義を与えるプロセスは、「要素のアップグレード」と呼ばれます。

いつタグ名が定義されるかを確認するには、`window.customElements.whenDefined()` を使用します。これは、要素が定義されたときに解決される Promise を提供します。



    customElements.whenDefined('app-drawer').then(() => {
      console.log('app-drawer defined');
    });
    

**例** - 一連の子要素がアップグレードされるまで処理を遅らせる


    <share-buttons>
      <social-button type="twitter"><a href="...">Twitter</a></social-button>
      <social-button type="fb"><a href="...">Facebook</a></social-button>
      <social-button type="plus"><a href="...">G+</a></social-button>
    </share-buttons>
    


    // Fetch all the children of <share-buttons> that are not defined yet.
    let undefinedButtons = buttons.querySelectorAll(':not(:defined)');
    
    let promises = [...undefinedButtons].map(socialButton => {
      return customElements.whenDefined(socialButton.localName);
    ));
    
    // Wait for all the social-buttons to be upgraded.
    Promise.all(promises).then(() => {
      // All social-button children are ready.
    });
    

注: カスタム要素は、定義されるまで中間状態にあると考えます。[仕様](https://dom.spec.whatwg.org/#concept-element-custom-element-state)では、要素の状態を「undefined」、「uncustomized」、または「custom」と定義しています。`<div>` のような組み込み要素の状態は常に「defined」です。

## 要素定義済みのコンテンツ {: #addingmarkup}

カスタム要素は、要素コード内で DOM API を使用して自分のコンテンツを管理できます。このとき、[応答](#reactions)を使うと便利です。

**例** - 既定の HTML を使用した要素の作成:

    customElements.define('x-foo-with-markup', class extends HTMLElement {
      connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
      }
      ...
    });
    
Declaring this tag will produce:

    <x-foo-with-markup>
     <b>I'm an x-foo-with-markup!</b>
    </x-foo-with-markup>

{% framebox height="70px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}
.demoarea::before {
  display: block;
  content: 'DEMO';
}
</style>

<div class="demoarea">
  <x-foo-with-markup></x-foo-with-markup>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-with-markup', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

注: ある要素の子を新しいコンテンツで上書きすることは想定されていないため、一般によい考えではありません。自分のマークアップが破棄されたユーザーは驚くでしょう。要素定義済みのコンテンツを追加するもっとよい方法は、Shadow DOM を使用することです。これについては、次で説明します。

### Shadow DOM を使用する要素の作成 {: #shadowdom}

注: この記事では [Shadow DOM][sd_spec] の機能は取り上げませんが、これはカスタム要素と組み合わせて使用する強力な API です。
それ単体では、Shadow DOM は構成ツールです。
カスタム要素と併用することで、特別な効果が生まれます。


Shadow DOM は、ページの他の部分とは別に一連の DOM を所有、レンダリング、およびスタイル設定する方法を要素に提供します。
アプリ全体を単一のタグ内に隠すことさえできます。



    <!-- chat-app's implementation details are hidden away in Shadow DOM. -->
    <chat-app></chat-app>
    

カスタム要素で Shadow DOM を使用するには、`constructor` 内で `this.attachShadow` を呼び出します。

    customElements.define('x-foo-shadowdom', class extends HTMLElement {
      constructor() {
        super(); // always call super() first in the ctor.

        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
          <style>:host { ... }</style> <!-- look ma, scoped styles -->
          <b>I'm in shadow dom!</b>
          <slot></slot>
        `;
      }
      ...
    });

使用例:

    <x-foo-shadowdom>
      <p><b>User's</b> custom text</p>
    </x-foo-shadowdom>
    
    <!-- renders as -->
    <x-foo-shadowdom>
      <b>I'm in shadow dom!</b>
      <slot></slot>
    </x-foo-shadowdom>

{% framebox height="130px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-shadowdom>
    <p><b>User's</b> custom text</p>
  </x-foo-shadowdom>
</div>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-shadowdom', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the ctor.
      let shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
        <b>I'm in shadow dom!</b>
        <slot></slot>
      `;
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

###  `<template>` からの要素の作成{: #fromtemplate}

ご存じない方のために、[`<template>` 要素](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)とは、解析され、ページの読み込み時には非アクティブで、実行時に後からアクティブ化できる DOM のフラグメントを宣言するための要素です。これは、ウェブ コンポーネント ファミリーのもう 1 つの API プリミティブです。**テンプレートは、カスタム要素の構造を宣言するために最適なプレースホルダです**。

**例:** `<template>` から作成された Shadow DOM コンテンツへの要素の登録:

    <template id="x-foo-from-template">
      <style>
        p { color: orange; }
      </style>
      <p>I'm in Shadow DOM.My markup was stamped from a &lt;template&gt;.</p>
    </template>
    
    <script>
      customElements.define('x-foo-from-template', class extends HTMLElement {
        constructor() {
          super(); // always call super() first in the ctor.
          let shadowRoot = this.attachShadow({mode: 'open'});
          const t = document.querySelector('#x-foo-from-template');
          const instance = t.content.cloneNode(true);
          shadowRoot.appendChild(instance);
        }
        ...
      });
    </script>
    

この数行のコードには多大な効果があります。主な処理内容を見ていきましょう。

1. HTML で新しい要素を定義します。`<x-foo-from-template>`
2. 要素の Shadow DOM が `<template>` から作成されます。
3. Shadow DOM のおかげで、要素の DOM は要素に対してローカルになります。
4. Shadow DOM のおかげで、要素の内部 CSS の適用対象が要素になります。

{% framebox height="100px" %}
<style>
.demoarea {
  padding: 8px;
  border: 1px dashed #ccc;
}

.demoarea::before {
  content: 'DEMO';
  display: block;
}
</style>

<div class="demoarea">
  <x-foo-from-template></x-foo-from-template>
</div>

<template id="x-foo-from-template">
  <style>:host p { color: orange; }</style>
  <p>I'm in Shadow DOM.My markup was stamped from a &lt;template&gt;.</p>
</template>

<script>
const supportsCustomElementsV1 = 'customElements' in window;

if (supportsCustomElementsV1) {
  customElements.define('x-foo-from-template', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({mode: 'open'});
      const t = document.querySelector('#x-foo-from-template');
      shadowRoot.appendChild(t.content.cloneNode(true));
    }
  });
} else {
  if (self.frameElement) {
    self.frameElement.style.display = 'none';
  }
}
</script>
{% endframebox %}

## カスタム要素のスタイル設定 {: #styling}

要素が Shadow DOM を使用して独自のスタイル設定を定義していても、ユーザーは自分のページからカスタム要素のスタイルを設定できます。
これらは「ユーザー定義のスタイル」と呼ばれます。


    <!-- user-defined styling -->
    <style>
      app-drawer {
        display: flex;
      }
      panel-item {
        transition: opacity 400ms ease-in-out;
        opacity: 0.3;
        flex: 1;
        text-align: center;
        border-radius: 50%;
      }
      panel-item:hover {
        opacity: 1.0;
        background: rgb(255, 0, 255);
        color: white;
      }
      app-panel > panel-item {
        padding: 5px;
        list-style: none;
        margin: 0 7px;
      }
    </style>
    
    <app-drawer>
      <panel-item>Do</panel-item>
      <panel-item>Re</panel-item>
      <panel-item>Mi</panel-item>
    </app-drawer>
    

要素のスタイルが Shadow DOM 内で定義されている場合、CSS による指定がどのように機能するのか疑問に思うかもしれません。
スタイルの指定では、ユーザーのスタイルが優先され、常に要素定義のスタイル設定をオーバーライドします。
[Shadow DOM を使用する要素の作成](#shadowdom)セクションを参照してください。

### 未登録要素の事前スタイル設定 {: #prestyle}

要素が[アップグレード](#upgrades)される前は、`:defined` 疑似クラスを使用して、その要素を CSS で適用対象に指定できます。これは、コンポーネントを事前にスタイル設定する場合に役立ちます。
たとえば、未定義のコンポーネントを非表示にし、それらが定義されたときにフェードインさせることで、レイアウトやその他の視覚的な FOUC を防ぎたい場合があります。



**例** - 定義されるまで `<app-drawer>` を非表示にする:


    app-drawer:not(:defined) {
      /* Pre-style, give layout, replicate app-drawer's eventual styles, etc. */
      display: inline-block;
      height: 100vh;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    

`<app-drawer>` が定義されると、セレクター（`app-drawer:not(:defined)`）は一致しなくなります。


## その他の詳細 {: #details}

### 不明な要素と未定義のカスタム要素 {: #unknown}

HTML は厳密ではなく、柔軟に使用することができます。たとえば、ページで `<randomtagthatdoesntexist>` を宣言しても、ブラウザはこれを問題なく受け入れます。なぜ非標準タグが機能するのでしょうか。理由は [HTML 仕様](https://html.spec.whatwg.org/multipage/dom.html#htmlunknownelement)で許可されているからです。仕様で定義されていない要素は `HTMLUnknownElement` として解析されます。

このことは、カスタム要素の場合は該当しません。カスタム要素の候補は、有効な名前（「-」を含む）で作成されていれば、`HTMLElement` として解析されます。
カスタム要素対応のブラウザで、これを確認できます。コンソールを起動します。<span class="kbd">Ctrl</span>+<span class="kbd">Shift</span>+<span class="kbd">J</span>（Mac の場合は <span class="kbd">Cmd</span>+<span class="kbd">Opt</span>+<span class="kbd">J</span>）を押して、次のコード行を貼り付けます。


    // "tabs" is not a valid custom element name
    document.createElement('tabs') instanceof HTMLUnknownElement === true
    
    // "x-tabs" is a valid custom element name
    document.createElement('x-tabs') instanceof HTMLElement === true
    

## API リファレンス

`customElements` グローバルは、カスタム要素を使用するための便利な方法を定義します。

**`define(tagName, constructor, options)`**

ブラウザで新しいカスタム要素を定義します。

例


    customElements.define('my-app', class extends HTMLElement { ... });
    customElements.define(
      'fancy-button', class extends HTMLButtonElement { ... }, {extends: 'button'});
    

**`get(tagName)`**

有効なカスタム要素タグ名が指定されている場合、要素のコンストラクタを返します。要素定義が登録されていない場合は、`undefined` を返します。


例


    let Drawer = customElements.get('app-drawer');
    let drawer = new Drawer();
    

**`whenDefined(tagName)`**

カスタム要素が定義されたときに解決される Promise を返します。要素が既に定義されている場合は、すぐに解決されます。
タグ名が有効なカスタム要素名でない場合は拒否されます。


例


    customElements.whenDefined('app-drawer').then(() => {
      console.log('ready!');
    });
    

## 経緯とブラウザ対応 {: #historysupport}

ここ数年ウェブ コンポーネントを使用していれば、Chrome 36+ では `customElements.define()` ではなく `document.registerElement()` を使用するカスタム要素 API のバージョンが実装されていたことをご存じでしょう。これは現在、標準の非推奨バージョンと見なされ、v0 と呼ばれます。現在注目されているのは `customElements.define()` で、ブラウザ ベンダーはこれを実装し始めています。これはカスタム要素 v1 と呼ばれます。

古い v0 の仕様に興味がある場合は、[html5rocks の記事](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/){: .external }をご覧ください。

### ブラウザ対応

Chrome 54（[ステータス](https://www.chromestatus.com/features/4696261944934400)）にはカスタム要素 v1 が実装されています。Safari は[プロトタイプの作成を開始](https://bugs.webkit.org/show_bug.cgi?id=150225)しました。WebKit Nightly で API をテストできます。Edge は[プロトタイプの作成を開始](https://twitter.com/AaronGustafson/status/717028669948977153)しました。Mozilla には、実装に際して[未対応のバグ](https://bugzilla.mozilla.org/show_bug.cgi?id=889230)があります。

カスタム要素の機能を検出するには、`window.customElements` が存在するかどうか確認します。


    const supportsCustomElementsV1 = 'customElements' in window;
    

####  Polyfill{: #polyfill}

さまざまなブラウザで広くサポートされるようになるまでは、[polyfill](https://github.com/webcomponents/custom-elements/blob/master/custom-elements.min.js) を利用できます。 

**注**: `:defined` CSS 疑似クラスの Polyfill は提供されていません。

インストール:

    bower install --save webcomponents/custom-elements

使用方法:


    function loadScript(src) {
     return new Promise(function(resolve, reject) {
       const script = document.createElement('script');
       script.src = src;
       script.onload = resolve;
       script.onerror = reject;
       document.head.appendChild(script);
     });
    }
    
    // Lazy load the polyfill if necessary.
    if (!supportsCustomElementsV1) {
      loadScript('/bower_components/custom-elements/custom-elements.min.js').then(e => {
        // Polyfill loaded.
      });
    } else {
      // Native support.Good to go.
    }
    

## まとめ

カスタム要素は、ブラウザで新しい HTML タグを定義し、再利用可能なコンポーネントを作成するための新しいツールを提供します。
これらを Shadow DOM や `<template>` などのその他の新しいプラットフォーム プリミティブと組み合わせることで、ウェブ コンポーネントの全体像が見えてきました。

- 再利用可能なコンポーネントを作成および拡張するためのクロスブラウザ（ウェブ標準）。
- ライブラリやフレームワークは不要です。Vanilla JS / HTML のみで使用できます。
- 使い慣れたプログラミング モデルを提供します。これは単なる DOM / CSS / HTML です。
- その他の新しいウェブ プラットフォーム機能（Shadow DOM、`<template>`、CSS カスタム プロパティなど）と連携して適切に動作します。
- ブラウザの DevTools と緊密に統合されています。
- 既存のユーザー補助機能を利用します。

[spec]: https://html.spec.whatwg.org/multipage/scripting.html#custom-elements
[sd_spec]: http://w3c.github.io/webcomponents/spec/shadow/


{# wf_devsite_translation #}
