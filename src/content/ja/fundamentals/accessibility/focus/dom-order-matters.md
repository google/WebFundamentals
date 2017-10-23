project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 既定の DOM 順序の重要性

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# DOM 順序の重要性 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}

ネイティブ要素は、DOM での位置に基づいて自動的にタブオーダーに挿入されます。そのため、フォーカス動作について学ぶにはネイティブ要素を操作するのが一番です。

たとえば、DOM に 3 つのボタン要素が順番に配置されているとします。
`Tab` を押すと、各ボタンが順番にフォーカスされます。以下のコード ブロックをクリックして、フォーカス ナビゲーションの開始点を変えて、`Tab`
を押してボタン間でフォーカスを移動させてみてください。

```
<button>I Should</button>
<button>Be Focused</button>
<button>Last!</button>
```

{% framebox height="80px" %}
<button>I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

CSS を使用すると、DOM での順序を保持したまま、異なる順序で要素を画面に表示できることに注意してください。たとえば、`float` などの CSS
プロパティを使用して 1 つのボタンを右に移動した場合、ボタンが画面に表示される順序は変わりますが、DOM
での順序は保持されるため、タブオーダーも変わりません。ページ全体をユーザーがタブで移動した場合、ボタンは直感的な順序ではフォーカスされません。以下のコード
ブロックをクリックして、フォーカス ナビゲーションの開始点を変えて、`Tab` を押してボタン間でフォーカスを移動させてみてください。

```
<button style="float: right">I Should</button>
<button>Be Focused</button>
<button>Last!</button>
```

{% framebox height="80px" %}
<button style="float: right;">I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

CSS
を使用して画面上での要素の視覚的な位置を変更する場合は注意が必要です。フォーカスの位置がランダムに移動しているように見えるため、キーボードを使用するユーザーが混乱することがあります。このような理由から、WebAIM
チェックリストの[セクション 1.3.2](http://webaim.org/standards/wcag/checklist#sc1.3.2){:
.external } では、コード順によって決定される読み取りとナビゲーションの順序は、論理的かつ直感的にする必要があると既定されています。

原則として、ときどきページ上をタブで移動して、タブオーダーがおかしな順番になっていないことを確認してください。この確認作業にはそれほど手間がかからないので、習慣的に行うことをお勧めします。

## 画面外のコンテンツ

レスポンシブ サイド ナビゲーションなど、現在表示されていなくても DOM
で必要なコンテンツがある場合はどうすべきでしょうか。このように、画面外にある状態でフォーカスを受け取る要素があると、ユーザーがページ上をタブで移動した際に、フォーカスが消えたり再表示されたりするように見えることがあります。これは明らかに望ましくない状況です。理想的には、パネルが画面外にあるときはフォーカスを受け取らないようにして、ユーザーが操作できる状態でのみフォーカスが当たるようにする必要があります。

![an offscreen slide-in panel can steal
focus](../../../../en/fundamentals/accessibility/focus/imgs/slide-in-panel.png)

フォーカスの位置を確認するために、多少の検出作業が必要になる場合があります。
現在フォーカスされている要素を確認するには、コンソールで `document.activeElement` を使用します。

現在フォーカスが当たっている画面外の要素を特定したら、それを `display: none` または `visibility: hidden`
に設定して、ユーザーに表示する前に `display: block` または `visibility: visible` に戻すことができます。

![a slide-in panel set to display
none](../../../../en/fundamentals/accessibility/focus/imgs/slide-in-panel2.png)

![a slide-in panel set to display
block](../../../../en/fundamentals/accessibility/focus/imgs/slide-in-panel3.png)

一般に、公開前にデベロッパー側でサイト上をタブで移動し、フォーカスが消えたり、論理的ではない順序で移動したりしないことを確認することをお勧めします。問題がある場合は、`display:
none` または `visibility: hidden` で画面外のコンテンツを適切に非表示にするか、要素の DOM
での物理的な位置を変更して論理的な順序になるようにする必要があります。
