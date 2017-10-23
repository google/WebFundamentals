project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: tabindex による DOM 順序の変更

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# tabindex の使用 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}

ネイティブ要素の DOM 位置で決まる既定のタブオーダーは便利ですが、タブオーダーの変更が必要になる場合があり、HTML
要素の物理的な位置を変えることは、最適または適切な解決策であるとは限りません。このような場合は、`tabindex` HTML
属性を使用して、要素のタブ位置を明示的に設定できます。

`tabindex` は任意の要素に適用できますが、必ずしもすべての要素で有用であるとは限りません。また、広範な整数値を使用します。`tabindex`
を使用すると、フォーカス可能なページ要素の明示的な順序を指定したり、フォーカス不可能な要素をタブオーダーに追加したり、要素をタブオーダーから削除したりできます。次に例を示します。

`tabindex="0"`: 要素を通常のタブオーダーに追加します。要素は `Tab` キーを押すとフォーカスされ、`focus()`
メソッドを呼び出すことでフォーカスがあたります。

```
<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
```

{% framebox height="60px" %}


<style>
  custom-button {
    margin: 10px;
  }
</style>


<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
{% endframebox %}

`tabindex="-1"`: 通常のタブオーダーから要素を削除しても、`focus()` メソッドを呼び出すことでまだ要素にフォーカスできます。

```
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
```

{% framebox height="80px" %}
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
{% endframebox %}

`tabindex="5"`: 0 より大きい tabindex を指定すると、通常のタブオーダーの前にその要素へジャンプします。複数の要素の tabindex
が 0 より大きい場合、タブオーダーは 0 より大きい最小値からスタートし、次第に大きい値の要素に移動します。0 より大きい tabindex
の使用は、**アンチパターン**と見なされます。

```
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
```

{% framebox height="80px" %}
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
{% endframebox %}

これは、特にヘッダー、イメージ、記事のタイトルなどの非入力要素に当てはまります。そのような種類の要素に `tabindex`
を追加することは逆効果です。可能な場合、DOM 順序でタブオーダーが論理的になるようにソースコードを配置することをお勧めします。`tabindex`
を使用する対象は、ボタン、タブ、ドロップダウン、テキスト フィールドなどのカスタム インタラクティブ
コントロール、つまり、ユーザーが入力を想定する要素に制限してください。

スクリーン リーダーには `tabindex` がないため、スクリーン
リーダーのユーザーが重要なコンテンツを逃す心配はありません。画像のように、コンテンツが非常に重要であっても、ユーザーがそれを操作できない場合は、フォーカス可能にする必要はありません。また、後ほど簡単に説明しますが、適切な
`alt` 属性のサポートすることで、スクリーン リーダーのユーザーも画像のコンテンツを理解できるようになります。

## ページレベルでのフォーカスの管理

`tabindex`
が有用であり、かつ必須のシナリオについて説明します。さまざまなコンテンツのセクションを含む堅牢なシングルページを構築しているとします。すべてのセクションを一度に見ることはできません。このようなページでは、ナビゲーション
リンクをクリックすると、ページを更新せずに表示可能なコンテンツを変更できる場合があります。

この場合、選択したコンテンツ領域を特定し、`tabindex` に -1 を指定して、通常のタブオーダーで表示されないようにして、`focus`
メソッドを呼び出すことがあります。*フォーカスの管理*というこのテクニックを使用すれば、ユーザーが知覚する状況を、サイトの視覚的なコンテンツに同期させることができます。

## コンポーネントのフォーカスの管理

ページ上で何か変更する際にフォーカスを管理することは重要ですが、コントロール レベルでフォーカスを管理することが必要になる場合もあります。たとえば、カスタム
コンポーネントを作成している場合があてはまります。

ネイティブ `select`
要素について考えてみましょう。基本的なフォーカスを受け取ることはできますが、フォーカスがあたると、カーソルキーを使用して追加の機能を提供できます（選択可能なオプション）。カスタムの
`select` 要素を作成する場合は、同じような動作を提供し、ユーザーが主にキーボードだけに頼ってコントロールを操作できるようにします。

```
<!-- Focus the element using Tab and use the up/down arrow keys to navigate -->
<select>
  <option>Aisle seat</option>
  <option>Window seat</option>
  <option>No preference</option>
</select>
```


<select>
  <option data-parent-segment-id="472963">Aisle seat</option>
  <option data-parent-segment-id="472964">Window seat</option>
  <option data-parent-segment-id="472965">No preference</option>
</select>


実装するキーボードの動作を把握するのが難しいかもしれませんが、参考になるドキュメントがあります。
[Accessible Rich Internet Applications (ARIA) Authoring
Practices](https://www.w3.org/TR/wai-aria-practices/){: .external }
ガイドには、タイプ別コンポーネントの一覧と、サポートしているキーボードの操作が記載されています。後ほど ARIA
についてさらに詳しく取り上げますが、ここでは、このガイドを使用して新しいコンポーネントにキーボード サポートを追加します。

一連のラジオボタンに類似した、独自の外観と動作を持つ新しい[カスタム要素](/web/fundamentals/getting-started/primers/customelements)を作成しているとします。

```
<radio-group>
  <radio-button>Water</radio-button>
  <radio-button>Coffee</radio-button>
  <radio-button>Tea</radio-button>
  <radio-button>Cola</radio-button>
  <radio-button>Ginger Ale</radio-button>
</radio-group>
```

必要なキーボード サポートを判断するには、[ARIA Authoring Practices
ガイド](https://www.w3.org/TR/wai-aria-practices/){: .external }をご確認ください。セクション 2
にデザイン
パターンのリストがあり、このリスト内に[ラジオグループの特性の表](https://www.w3.org/TR/wai-aria-practices/#radiobutton){:
.external }があり、新しい要素に最も近い既存のコンポーネントが掲載されています。

この表でわかるように、サポートする必要がある一般的なキーボード動作の 1 つは、上下左右の矢印キーです。
この動作を新しいコンポーネントに追加するには、*tabindex の移動*というテクニックを使用します。

![W3C spec excerpt for radio
buttons](../../../../en/fundamentals/accessibility/focus/imgs/radio-button.png)

tabindex の移動を機能させるには、現在アクティブな子を除いて、すべての子の `tabindex` を -1 に設定します。

```
<radio-group>
  <radio-button tabindex="0">Water</radio-button>
  <radio-button tabindex="-1">Coffee</radio-button>
  <radio-button tabindex="-1">Tea</radio-button>
  <radio-button tabindex="-1">Cola</radio-button>
  <radio-button tabindex="-1">Ginger Ale</radio-button>
</radio-group>
```

コンポーネントは、次にキーボードのイベント リスナーを使用し、ユーザーが押したキーを判断します。以前にフォーカスを設定した子の `tabindex` は -1
に設定し、次にフォーカスされる子の `tabindex` を 0 にして、その子の focus メソッドを呼び出します。

```
<radio-group>
  // Assuming the user pressed the down arrow, we'll focus the next available child
  <radio-button tabindex="-1">Water</radio-button>
  <radio-button tabindex="0">Coffee</radio-button> // call .focus() on this element
  <radio-button tabindex="-1">Tea</radio-button>
  <radio-button tabindex="-1">Cola</radio-button>
  <radio-button tabindex="-1">Ginger Ale</radio-button>
</radio-group>
```

ユーザーが最後（またはフォーカスの移動方向によっては先頭）の子まで到達すると、ループして先頭（または最後）の子に再度フォーカスします。

以下の完成した例でお試しください。DevTools で要素を調べると、tabindex が次のラジオボタンに移動する様子がわかります。

{% framebox height="130px" %}


<style>
  .demo {
    margin-left: 80px;
  }
  radio-button {
    position: relative;
    display: block;
    font-size: 18px;
  }
  radio-button:focus {
    outline: none;
  }
  radio-button::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
  radio-button:focus::before {
    box-shadow: 0 0 3px 3px #83BEFF;
  }
  radio-button[aria-checked="true"]::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: red;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
</style>



<div class="demo">
  <radio-group>
    <radio-button data-parent-segment-id="472979">Water</radio-button>
    <radio-button data-parent-segment-id="472980">Coffee</radio-button>
    <radio-button data-parent-segment-id="472982">Tea</radio-button>
    <radio-button data-parent-segment-id="472983">Cola</radio-button>
    <radio-button data-parent-segment-id="472985">Ginger Ale</radio-button>
  </radio-group>
</div>



<script
src="https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js"></script>



<script>
  class RadioButton extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radio');
      this.setAttribute('tabindex', -1);
      this.setAttribute('aria-checked', false);
    }
  }

  window.customElements.define('radio-button', RadioButton);

  // Define values for keycodes
  const VK_LEFT       = 37;
  const VK_UP         = 38;
  const VK_RIGHT      = 39;
  const VK_DOWN       = 40;

  class RadioGroup extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radiogroup');
      this.radios = Array.from(this.querySelectorAll('radio-button'));

      // Setup initial state
      if (this.hasAttribute('selected')) {
        let selected = this.getAttribute('selected');
        this._selected = selected;
        this.radios[selected].setAttribute('tabindex', 0);
        this.radios[selected].setAttribute('aria-checked', true);
      } else {
        this._selected = 0;
        this.radios[0].setAttribute('tabindex', 0);
      }

      this.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.addEventListener('click', this.handleClick.bind(this));
    }

    handleKeyDown(e) {
      switch(e.keyCode) {

        case VK_UP:
        case VK_LEFT: {
          e.preventDefault();

          if (this.selected === 0) {
            this.selected = this.radios.length - 1;
          } else {
            this.selected--;
          }
          break;

        }

        case VK_DOWN:
        case VK_RIGHT: {
          e.preventDefault();

          if (this.selected === this.radios.length - 1) {
            this.selected = 0;
          } else {
            this.selected++;
          }
          break;
        }

      }
    }

    handleClick(e) {
      const idx = this.radios.indexOf(e.target);
      if (idx === -1) {
        return;
      }
      this.selected = idx;
    }

    set selected(idx) {
      if (isFinite(this.selected)) {
        // Set the old button to tabindex -1
        let previousSelected = this.radios[this.selected];
        previousSelected.tabIndex = -1;
        previousSelected.removeAttribute('aria-checked', false);
      }

      // Set the new button to tabindex 0 and focus it
      let newSelected = this.radios[idx];
      newSelected.tabIndex = 0;
      newSelected.focus();
      newSelected.setAttribute('aria-checked', true);

      this.setAttribute('selected', idx);
      this._selected = idx;
    }

    get selected() {
      return this._selected;
    }
  }

  window.customElements.define('radio-group', RadioGroup);
</script>


{% endframebox %}

GitHub
で[この要素の完成版ソース](https://gist.github.com/robdodson/85deb2f821f9beb2ed1ce049f6a6ed47){:
.external }を参照できます。

## モーダルとキーボードのトラップ

フォーカスを管理するとき、解決できない状況に陥ることがあります。たとえばフォーカスを管理し、タブの動作をキャプチャする自動入力ウィジェットの場合、入力が完了するまでユーザーはそこから移動できなくなります。これは*キーボード
トラップ*と呼ばれ、ユーザーにかなりのストレスを与えるおそれがあります。Web AIM チェックリストのセクション 2.1.2
で、この問題に言及しており、[キーボード
フォーカスを特定のページ要素にロックして、閉じ込めてはいけない](http://webaim.org/standards/wcag/checklist#sc2.1.2){:
.external }と説明しています。ユーザーがキーボードのみを使用してすべてのページ要素を自由に移動できるようにする必要があります。

通常とは異なり、モーダル
ウィンドウのように上記の動作が実際には望ましい場合もあります。通常、モーダルを表示する場合、それ以外のコンテンツにはアクセスしてほしくありません。ページを視覚的に覆うオーバーレイを追加することはできますが、キーボードのフォーカスはモーダル以外の場所に意図せず移動してしまいます。

![a modal window asking the user to save their
work](../../../../en/fundamentals/accessibility/focus/imgs/modal-example.png)

この例のように、モーダルの表示中のみ、一時的にフォーカスを閉じ込めるキーボード
トラップを実装し、モーダルが閉じたら以前にフォーカスのあったアイテムにフォーカスを戻すことができます。

> `<dialog>` 要素など、これを簡単に実現する方法がいくつかありますが、まだ幅広いブラウザでサポートされているわけではありません。
> `<dialog>` の詳細については、この [MDN
の記事](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog){:
.external }をご覧ください。モーダル
ウィンドウの詳細については、[モーダルの例](https://github.com/gdkraus/accessible-modal-dialog){:
.external }をご覧ください。

いくつかの要素を含む `div` で表されるモーダル ダイアログと、バックグラウンド オーバーレイを表す別の `div`
について考えてみましょう。この状況で、一時的なキーボード トラップを実装するために必要な基本的な手順を説明します。

1. `document.querySelector` を使用して、モーダルとオーバーレイの div を選択し、そのリファレンスを保存します。
2. モーダルが開いたら、モーダルが開いたときにフォーカスのあった要素へのリファレンスを保存し、その要素にフォーカスを戻せるようにします。
3. *keydown リスナー*を使用して、モーダルが開いている間に押されたキーを取得します。バックグラウンド
オーバーレイのクリックをリッスンして、ユーザーがクリックしたときにモーダルを閉じます。
4.
次に、モーダル内でフォーカス可能な要素のコレクションを取得します。最初と最後のフォーカス可能な要素は「監視員」のように機能して、フォーカスをモーダル内に留めるために前後にループするタイミングを知らせます。
5. モーダル ウィンドウを表示して、最初のフォーカス可能な要素をフォーカスします。
6. ユーザーが `Tab` または `Shift+Tab` を押したときは、フォーカスを前後に移動し、最後または最初の要素まで到達したら適宜ループさせます。
7. ユーザーが `Esc`
を押したときは、モーダルを閉じます。特定の閉じるボタンを探さなくてもモーダルを閉じることができるため、この機能は非常に便利です。マウスのユーザーにもメリットがあります。
8. モーダルを閉じるときは、モーダルとバックグラウンド オーバーレイを非表示にして、以前に保存した、フォーカスのあった要素にフォーカスを戻します。

この手順に従えば、だれでも効果的に使用でき、ストレスを与えないモーダル ウィンドウを作成できます。

詳細については、こちらの[サンプル
コード](https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution){:
.external
}をご覧ください。また、[完成したページ](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html){:
.external }の例もライブでご覧になれます。
