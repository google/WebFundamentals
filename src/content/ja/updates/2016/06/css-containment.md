project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: CSS Containment という新しい仕様によって、ブラウザが行うスタイル、レイアウト、描画の範囲を制限できるようになります。

{# wf_published_on: 2016-06-01 #}
{# wf_updated_on: 2016-06-01 #}

# Chrome 52 に CSS Containment が導入 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


<style>
img.screenshot {
  max-width: 100%;
}
</style>

### TL;DR {: .hide-from-toc }

CSS Containment という新しい仕様によって、ブラウザが行うスタイル、レイアウト、描画の範囲を制限できるようになります。

<img class="screenshot" src="/web/updates/images/2016/06/containment.jpg" alt="CSS Containment の比較。使用前：レイアウトに 59.6ms、使用後：レイアウトに 0.05ms" />

Containament 仕様では次の構文と値が定義されています。


    contain: none | strict | content | [ size || layout || style || paint ]
    

CSS Containment は Chrome 52、Opera 40 で実装されました（[Firefox も支持を表明](https://www.chromestatus.com/features/6522186978295808)]しています）。ぜひ使ってみて、どうだったかを教えてください！

## contain プロパティ

Web アプリや複雑な Web サイトを開発するとき、スタイル、レイアウト、描画をどう抑えるかがパフォーマンス上の課題になります。多くの場合 DOM の**全体**が計算の「スコープ」になるため、Web アプリにおいて自己完結した「ビュー」を作るのが難しいのです。DOM の一部の変更が他の箇所に影響すること、ブラウザにどの箇所をスコープ（もしくはスコープ外）として伝える方法がないことがその理由です。

たとえば、こんな DOM があったとしましょう。


    <section class="view">
      Home
    </section>
    
    <section class="view">
      About
    </section>
    
    <section class="view">
      Contact
    </section>
    

ひとつのビューに新しい要素を追加すると、スタイル、レイアウト、そして描画が発生します。


    <section class="view">
      Home
    </section>
    
    <section class="view">
      About
      <div class="newly-added-element">Check me out!</div>
    </section>
    
    <section class="view">
      Contact
    </section>
    

しかしこの場合、**DOM 全体**がスコープとなってしまい、スタイル、レイアウト、描画の計算は**すべての要素**を考慮にいれなければいけません。たとえ要素が変更されていなくてもです。DOM が大きくなればなるほど計算処理が増えるので、ユーザーの入力に迅速に答えられなくなる可能性が高まります。

いいニュースもあります。ブラウザが賢くなり、スタイル、レイアウト、描画のスコープを自動的に制限するので、私たちが何もしなくても速くなるようにはなってきています。

しかしもっといいニュースがあります。スコープを開発者自身がコントロールできる新しい CSS プロパティが導入されたのです。それが **Containment** （封じ込め）です。

## contain プロパティ

CSS Containment は `contain` という新しいプロパティに以下の値を指定し使用します。

* `layout`
* `paint`
* `size`
* `style`

各値はそれぞれ、ブラウザがするべきレンダリングの行いを制限します。それぞれの値についてみてみましょう。

### レイアウト (contain: layout)

> This value turns on layout containment for the element. This ensures that the containing element is totally opaque for layout purposes; nothing outside can affect its internal layout, and vice versa.
> 訳：この値は要素に対し、レイアウトの封じ込めを有効にします。これにより、要素がレイアウト上不透明（opaque）であることが保証されます。つまり要素外のものが封じ込められた要素に影響することはありませんし、逆もまた同様です。
> [Containment 仕様](https://drafts.csswg.org/css-containment/#valdef-contain-layout)

レイアウトの封じ込めは `containt: paint` とともに、**最も**恩恵を受けるものでしょう。

基本的にレイアウトはドキュメント全体がスコープになるため、DOM の大きさに比例して大きくなります。つまり、要素の `left` プロパティを変更したとすると（[プロパティは一例です](https://csstriggers.com)）、DOM 内のすべての要素に対しチェックが働く可能性があります。

封じ込めを有効にすると、考慮すべき要素の数がドキュメント全体から片手で数えるくらいに減るでしょう。これにより、ブラウザが無駄な仕事をする必要がなくなり、パフォーマンスが大きく向上する可能性があります。

### 描画 (contain: paint)

> This value turns on paint containment for the element. This ensures that the descendants of the containing element don’t display outside its bounds, so if an element is off-screen or otherwise not visible, its descendants are also guaranteed to be not visible.
> 訳：この値は要素に対し、描画の封じ込めを有効にします。これにより、子孫要素が指定された要素の領域外に表示されないことが保証されます。もし指定された要素が画面外、もしくは非表示となる場合、子孫要素も表示されません。
> [Containment 仕様](https://drafts.csswg.org/css-containment/#valdef-contain-paint)

描画にスコープを設けることは、レイアウトに続きとても有益な封じ込めでしょう。描画の封じ込めは、適用された要素を切り取るようなものです。しかし副作用もあります。

* **絶対配置され、さらに固定配置された要素のコンテナブロックのような挙動をとる** ― つまり `contain: paint` 内の要素は、ドキュメントをはじめ、親の要素と同じように配置されません
* **スタッキングコンテキストになる** ― これにより、`z-hindex` などが作動し、子要素も新しく生成されたコンテキストに沿ってスタックされます
* **フォーマティングコンテキストになる** ― これにより、たとえば描画の封じ込めを指定したブロックレベル要素がある場合、それは**独立した**レイアウト環境として扱われます。つまり、要素の外側のレイアウトが要素内の子に影響することは基本的にありません

### 大きさ (contain: size)

> The value turns on size containment for the element. This ensures that the containing element can be laid out without needing to examine its descendants.
> 訳：この値は要素に対し、大きさの封じ込めを有効にします。これにより、指定された要素が子孫要素の内容を調べずにレイアウトされることが保証されます。
> [Containment 仕様](https://drafts.csswg.org/css-containment/#valdef-contain-size)

`content: size` は、要素の子が**親要素の大きさに影響しない**ことを意味し、計算もしくは指定された大きさが使用されます。結果、`content: size` を指定しても、大きさを指定しなかった場合（直接もしくは Flexbox のプロパティ経由で）、要素は 0px × 0px で表示されます。

サイズの封じ込めは大きさの決定に子要素を考慮しないことを二重に保証するものです。しかし、これ自身だけではパフォーマンスにあまり寄与しません。

### スタイル (contain: style)

> This value turns on style containment for the element. This ensures that, for properties which can have effects on more than just an element and its descendants, those effects don’t escape the containing element.
> 訳：この値は要素に対し、スタイルの封じ込めを有効にします。これにより、
> [Containment 仕様](https://drafts.csswg.org/css-containment/#valdef-contain-style)

要素のスタイルを変更した場合、DOM ツリーの上方にどう影響するのかを予想するのは大変でしょう。ひとつの例として[CSS のカウンタ](https://developer.mozilla.org/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters)があります。子のカウンタを変更すると、ドキュメント中にある同じ名前を持つカウンタの値に影響するのです。`contain: style` を指定すると、包含要素を超えてスタイルの変更が伝わることはありません。

**`contain: style` はスタイルにスコープをもたらすものではありません（スタイルのスコープは Shadow DOM によってもたらされます）**。ここでの封じ込めは該当するツリーの一部に対しスタイルの変更を制限するものであり、スタイルの**宣言**を制限するものではありません。

## strict と content

値のキーワードは `contain: layout paint` のように組み合わせても使えます。こうするとその挙動のみを適用します。ただ、 `contain` プロパティにはほかにもう2つ値があります。

* `contain: strict` は `contain: layout style paint size` と同じです
* `contain: content` は `contain: layout style paint` と同じです

要素の大きさがわかっているとき（もしくは大きさを保持したいとき）には、`strict` がよいでしょう。しかし `strict` を**大きさ抜きで**指定した場合、大きさの封じ込めが効果として含まれているため、要素が 0px × 0px で表示されるかもしれないことに注意してください。

いっぽうで、`content` はスコープにとても寄与します。大きさを指定する必要もありません。

この2つの中では基本的に `contain: content` を検討したほうがよいでしょう。`contain: content` では不十分な場合に、その回避策として `strict` を使うべきです。

## 試してみてください

封じ込めは、ページ上のどの箇所を孤立させたいかをブラウザに示すとてもよい仕組みです。Chrome 52 以降で試して、どうかを教えてください！

### 関連リンク

* [CSS Containment 仕様](https://drafts.csswg.org/css-containment/)
  * [CSS Containment 仕様 日本語訳](http://triple-underscore.github.io/css-containment-ja.html)
* [Chrome Statusでのステータス](https://www.chromestatus.com/features/6522186978295808)

Translated By: 
{% include "web/_shared/contributors/myakura.html" %}

{% include "comment-widget.html" %}