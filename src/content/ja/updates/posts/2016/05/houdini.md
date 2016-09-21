---
title: "Houdini – Demystifying CSS"
description: "Houdini は CSS エンジンの内部を開発者に公開する API の総称です。"
translators:
  - myakura

---

**アップデート**：この記事の各セクションに、そこで紹介する仕様の現状を追記しました。

Have you ever thought about the amount of work CSS does? You change a single
attribute and suddenly your entire website appears in a different layout. It’s
kind of *magic* in that regard. (Can you tell where I am going with this?!) So
far, we – the community of web developers – have only been able to witness and
observe the magic. What if we want to come up with our own magic? What if we
want to *become the magician*? Enter Houdini!

CSS の作業にどれくらいかけているか、想像したことがありますか？属性をひとつ変えるだけで、Web サイト全体のレイアウトが変わってしまうなんてことは少なくありません。そういう点で、CSS は**マジック**です。（勘のいい方はなんでこんなことを言うのか分かっちゃうでしょうか。）さて、私たち、Web 開発者コミュニティはこれまで、このマジックをただ観賞し、その証人になることしかできませんでした。しかし、もし、私たちもマジックを披露できたら？**マジシャンになれたら**？それが Houdini なんです！

The Houdini task force consists of engineers from Mozilla, Apple, Opera,
Microsoft, HP, Intel and Google working together to expose certain parts of the
CSS engine to web developers. The task force is working on a *collection of
drafts* with the goal to get them accepted by the W3C to become actual web
standards. They set themselves a few high-level goals, turned them into
specification drafts which in turn gave birth to a set of supporting,
lower-level specification drafts. The collection of these drafts is what is
usually meant when someone talks about “Houdini”. At the time of writing,
the [list of drafts][Houdini Drafts] is incomplete and some of the drafts
are mere placeholders. That’s how early in development of Houdini we are.

Houdini タスクフォースは、CSS エンジンの一部を Web 開発者に公開するために Mozilla, Apple, Opera, Microsoft, HP, Intel, Google のエンジニアが集った場所です。このタスクフォースは W3C での正式な標準化を目的として、いくつかのドラフトを策定しています。タスクフォースはハイレベルなゴールを設定し、それらを実現する仕様のドラフトを、そしてさらに、それらのドラフトを実装するためのローレベルな仕様のドラフトも策定しています。これらの仕様がおもに「Houdini」と呼ばれるものです。このポストを書いている時点で、[ドラフトのリスト][Houdini Drafts]はまだ未完成で、いくつかの仕様はプレースホルダだけです。Houdini がどれくらい初期段階なのかがわかるかと思います。

<iframe width="100%" height="315" src="https://www.youtube.com/embed/EUlIxr8mk7s" frameborder="0" allowfullscreen></iframe>

*Disclaimer:* I want to give a quick overview of the Houdini drafts so you have
an idea of what kind of problems Houdini tries to tackle. As far as the current
state of the specs allow, I’ll try to give code examples, as well. Please be
aware that all of these specs are *drafts* and very volatile. There’s no
guarantee that these code samples will be even remotely correct in the future or
that any of these drafts become reality.

**注意**：これからHoudini のドラフトを紹介し、どんな問題を解決しようとしているのかを紹介したいと思っています。現在はドラフト段階ですが、コード例も紹介しようと思います。ですので、すべての仕様が「ドラフト」であり、変わりやすいことを念頭においてください。紹介したサンプルコードが将来も動く保証はありませんし、ましてやドラフトが標準になる保証さえありません。

## Houdini の仕様たち

### Worklets ([仕様][Worklets spec])

Worklets by themselves are not really useful. They are a concept introduced to
make many of the later drafts possible. If you thought of Web Workers when you
read “worklet”, you are not wrong. They have a lot of conceptual overlap. So why
a new thing when we already have workers? Houdini’s goal is to expose new APIs
to allow web developers to hook up their own code into the CSS engine and the
surrounding systems. It’s probably not unrealistic to assume that some of these
code fragments will have to be run *every. single. frame*. Some of them have to
by definition. Quoting the [Web Worker spec]:

Worklets はそれ単体ではとくに便利じゃありません。これはあとで紹介するドラフトを実現するために導入されたものです。「Worklet」という単語を見て Web Workers を思い浮かべた方、するどいです。Worklets と Workers には多くの共通点があります。では Workers があるのになぜ新しいものを作るのでしょうか。

Houdini　のゴールは、Web 開発者が書いたコードを　CSS　エンジンや周辺のシステムにフックさせることです。なのっで、開発者が書いたコードの一部が**毎フレーム**実行されてしまうなんてことは容易に考えられます。そういったコードの一部には、そうなるしかないものもあるでしょう。Web Workers の仕様にはこう書いてあります。

> Workers [...] are relatively heavy-weight, and are not intended to be used in
large numbers. For example, it would be inappropriate to launch one worker for
each pixel of a four megapixel image.

> Workers [...] は重たい処理なので、数多くの処理を Worker で行うべきではありません。たとえば、400万画素の画像のピクセルごとに Worker を起動するべきではありません。

That means web workers are not viable for the things Houdini plans to do.
Therefore, worklets were invented. Worklets make use of ES2015 classes to define
a collection of methods, the signatures of which are predefined by
the type of the worklet. They are light-weight and short-lived.

つまり、Web Worker は Houdini がやりたいことをするのに向いていません。これが Worklets を策定した理由です。Worklets は ES2015 のクラスを使い、Worklet であらかじめ定義されたメソッドを指定します。Worklets は軽くて、ライフタイムが短いのです。

### Paint Worklet ([仕様][Paint Worklet spec])

**Status update:** First incomplete implementation landed in Chrome Canary behind the
“Experimental Web Platform features” flag.

**アップデート**：初期段階の実装が Chrome Canary に搭載されました。“Experimental Web Platform features” を有効にすると、すべてではありませんが使えます。

I am starting with this as it is introduces the fewest new concepts. From the
spec draft itself:

まずは Paint Worklet から説明しようと思います。というのも、説明しないといけない機能が少ないからです。仕様にはこう書いてあります。

> The paint stage of CSS is responsible for painting the background, content and
highlight of an element based on that element’s geometry (as generated by the
layout stage) and computed style.

> CSS の描画段階は、背景、内容、要素の寸法（レイアウトから生成）と算出値をもとにした要素のハイライトの描画に責任を持ちます。

At the current level of the spec, you can create border
and background images dynamically. This allows you to do a lot of new things
like having a ripple effect on buttons without creating additional DOM elements.
Another big advantage of running your code at an element's paint time over
using a `<canvas>` element is that you will know the size of the element you are
painting and that you will be aware of the fragments and handle them appropriately.

現在の仕様の段階は、ボーダーと背景画像を動的に生成できるというものです。これにより新しい効果をたくさん実現できます。たとえば、DOM 要素を新たに作らず、ボタンにリップル（波紋）効果を施すなんてこともできます。`<canvas>` ではなく、コードを描画時に実行できる利点として、描画する要素の大きさを知っていることと、フラグメントを察知し適切に処理できることです。

Wait, what are fragments?

えっと、フラグメントって…？

#### フラグメントとは

I think of elements in the DOM tree as boxes that are laid out by the CSS engine
to make up my website. This model is flawed when inline elements come into play.
A `<span>` may need to be wrapped; so while still technically being a single DOM
node, it has been *fragmented* into 2, well, *fragments*. The [仕様][Fragmentation spec]
calls the bounding box of these 2 fragments a *fragmentainer*. (I am not kidding.)

私はこれまで、DOM ツリー中の要素は CSS エンジンによりボックスとしてレイアウトされるものと考えていました。しかしこの考えはインライン要素を考慮すると破綻します。たとえば `<span>` は折り返すかもしれません。つまり、ひとつの DOM ノードであっても、2つの**断片**、つまり**フラグメント**になるわけです。[仕様][Fragmentation spec]では、2つのフラグメントの境界ボックスを**フラグメンテナ**（fragmentainer）と呼んでいます（ジョークじゃないですよ）。

<img src="/web/updates/images/2016/05/houdini/fragment.png">

Back to the Paint Worklet: effectively, your code will get called for each
fragment and will be given access to a stripped down `<canvas>`-like API as well
as the styles applied to the element. Eventually, you  will even be able to request
an “overflow” margin to allow you to draw effects *around* the element’s boundaries,
just like `box-shadow`.

Paint Worklet の話に戻りましょう。フラグメントごとにコードが呼ばれ、スタイルが適用されると、機能削減版の `<canvas>` ライクな API にアクセスできます。最終的にはマージンの外に「あふれた」箇所へのアクセスも可能になり、要素の境界の**周り**にも描画できるようになります。つまり `box-shadow` みたいな効果ですね。

{% highlight JS %}
class {
  static get inputProperties() {
    return ['border-color', 'border-size'];
  }
  paint(ctx, geom, inputProperties) {
    var offset = inputProperties['border-size']
    var colors = inputProperties['border-color'];
    self.drawFadingEdge(
      ctx,
      0-offset[0], 0-offset[0],
      geom.width+offset[0], 0-offset[0],
      color[0]);
    self.drawFadingEdge(
      ctx,
      geom.width+offset[1], 0-offset[1],
      geom.width+offset[1], geom.height+offset[1],
      color[1]);
    self.drawFadingEdge(
      ctx, 0-offset[2],
      geom.height+offset[2], geom.width+offset[2],
      geom.height+offset[2],
      color[2]);
    self.drawFadingEdge(
      ctx,
      0-offset[3], 0-offset[3],
      0-offset[3], geom.height+offset[3],
      color[3]);
  }
  drawFadingEdge(ctx, x0, y0, x1, y1, color) {
    var gradient =
      ctx.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0, color);
    var colorCopy = new ColorValue(color);
    colorCopy.opacity = 0;
    gradient.addColorStop(0.5, colorCopy);
    gradient.addColorStop(1, color);
  }
  overflow(inputProperties) {
    // Taking a wild guess here. The return type
    // of overflow() is currently specified
    // as `void`, lol.
    return {
      top: inputProperties['border-size'][0],
      right: inputProperties['border-size'][1],
      bottom: inputProperties['border-size'][2],
      left: inputProperties['border-size'][3],
    };
  }
};
{% endhighlight %}

Here is a video of a ripple [implementation][Paint Worklet source] that uses
the Paint Worklet API ([Demo][Paint Worklet demo]).

以下は Paint Worklet API で[実装][Paint Worklet source]されたリップル（[デモ][Paint Worklet demo]）のビデオです。

<iframe width="100%" height="315" src="https://www.youtube.com/embed/BX_qv2yKSUk" frameborder="0" allowfullscreen></iframe>

### Compositor Worklet

**Status update:** Chrome is working on compositor worker, which is a Chrome-proprietary
API on top of which compositor worklet (and other things) will be implemented.
Compositor worker is due to land soon™ and will allow us to provide you with
a polyfill that has very similar performance benefits to a native implementation.

**アップデート**：Chrome は Compositor Worker という Chrome 独自の API を実装中です。この API の上に Compositor Worklet（そして他のものも）を実装します。Compositor Worker はもうそろそろ実装され、ネイティブ実装と遜色ないパフォーマンスを発揮できる polyfill を提供できるようになります。

Even though the compositor worklet spec has been moved to the WICG and will
be iterated on, it’s the one the specs that excites me the most. As you might know, some
operations are outsourced to the graphics card of your computer by the CSS
engine, although that is dependent on both your grapics card and your device in
general. A browser usually takes the DOM tree and, based on specific criteria,
decides to give some branches and subtrees their own [layer][HTML5Rocks layers].
These subtrees paint themselves onto it (maybe using a paint worklet in the
future). As a final step, all these individual, now painted, layers are stacked
and positioned on top of each other, respecting z-indices, 3D transforms and
such, to yield the final image that is visible on your screen. This process is
called “compositing” and is executed by the “compositor”. The advantage of this
process is that you don’t have to make *all* the elements repaint themselves
when the page scrolls a tiny bit. Instead, you can reuse the layers from the
previous frame and just re-run the compositor with the changed scroll position.
This makes things fast. This helps us reach 60fps. This makes [Paul Lewis]
happy.

Compositor Worklet の仕様は WICG に移され、もう少し検討が必要とされてしまいましたが、私がわくわくしているのは実はこれなのです。ご存知かもしれませんが、いくつかの処理は CSS エンジンにより、グラフィックスカードに移管されます。CSS エンジンはグラフィックスカードに依存しているのに、です。

ブラウザは DOM ツリーをとり、決められた条件によって、いくつかの枝とそのサブツリーを個別の[レイヤー][HTML5Rocks layers]にします。サブツリーは自身をそのレイヤーに描画します（将来的には Paint Worklet を使うかもしれません）。最後に、描画された個々のレイヤーすべてが z-index や 3D Transforms を考慮したうえで重なり、配置され、私たちが画面上に見る画像になります。この処理は「compositing」と呼ばれ、「compositor」によって処理されます。この処理の利点は、たとえページがほんのちょっとスクロールしただけでも、**すべての**要素を再描画する必要がないことです。再描画の代わりに、前のフレームのレイヤーを再利用し、スクロール後の位置にあわせて compositor を再度実行するだけです。これによりスピードアップが図られ、60 fps を達成する助けになります。[Paul Lewis] もハッピーです。

<img src="/web/updates/images/2016/05/houdini/compworklet_small.png">

As the name suggests, the compositor worklet lets you hook into the compositor
and influence the way an element’s layer, which has already been painted, is
positioned and layered on top of the other layers. To get a little more
specific, you can tell the browser that you want to hook into the compositing
process for a certain DOM node and can request access to certain attributes like
scroll position, `transform` or `opacity`. This will force this element on to its
own layer and *on each frame* your code gets called. You can move your layer
by manipulating the layers transform and change its attributes (like `opacity`)
allowing you to do fancy-schmancy things at a whopping 60 fps. Here’s a *full*
implementation for parallax scrolling using the compositor worklet.

名前から想像できるとおり、Compositor Worklet は compositor にフックし、すでに描画された要素のレイヤーがどう配置され、他のレイヤーとどう重なりあうかに影響します。もう少し説明すると、ブラウザに特定の DOM ノードを compositing 処理にフックさせたいと伝え、その要素が持つ属性―スクロール位置や `transform`、`opacity`などへのアクセスを可能にします。これは、その要素を独立したレイヤーにし、コードを**毎フレーム**コールさせることを意味します。レイヤーの `transform` を操作し動かしたり、属性（`opacity` など）を変更したりして、ゴテゴテっとした小賢しいエフェクトを 60 fps で動かせられるんです。以下のコードは、Compositor Worklet を使ってパララックススクロールを実装したコードの**すべて**です。

{% highlight JS %}
// main.js
window.compositorWorklet.import('worklet.js')
  .then(function() {
    var animator = new CompositorAnimator('parallax');
    animator.postMessage([
      new CompositorProxy($('.scroller'), ['scrollTop']),
      new CompositorProxy($('.parallax'), ['transform']),
    ]);
  });{% endhighlight %}
{% highlight JS %}
// worklet.js
registerCompositorAnimator('parallax', class {
  tick(timestamp) {
    var t = self.parallax.transform;
    t.m42 = -0.1 * self.scroller.scrollTop;
    self.parallax.transform = t;
  }

  onmessage(e) {
    self.scroller = e.data[0];
    self.parallax = e.data[1];
  };
});
{% endhighlight %}

My colleague Robert Flack has written a [polyfill][CompWorklet polyfill] for the
compositor worklet so you can give it a try – obviously with a much
higher performance impact.

Compositor Worklet は、同僚の Robert Flack が [polyfill][CompWorklet polyfill] を書いているので、どんなものか試せます。ただし、パフォーマンスはよくないでしょう。

### Layout Worklet ([仕様][Layout Worklet spec])

**Status update:** First real spec draft has been been proposed. Implementation
is a good while away.

**アップデート**：最初のドラフトが提案されました。実装はこれからです。

Again, the specification for this is practically empty, but the concept is
intriguing: write your own layout! The layout worklet is supposed to enable you
to do `display: layout('myLayout')` and run your JavaScript to arrange a node’s
children in the node’s box. Of course, running a full JavaScript implementation
of CSS’s `flex-box` layout will be slower than running an equivalent native
implementation, but it’s easy to imagine a scenario where cutting corners can
yield a performance gain. Imagine a website consisting of nothing but tiles á la
Windows 10 or a [Masonry]-style layout. Absolute/fixed positioning is not used,
neither is `z-index` nor do elements ever overlap or have any kind of border or
overflow. Being able to skip all these checks on re-layout could yield a
performance gain.

仕様に中身はまだありませんが、そのアイデアはとても興味をそそるものです。なにせレイアウトを自分で定義できるんですから！Layout Worklet は `display: layout('mylayout')` といったことができ、ノードの子をノードのボックス内でどう配置するかを JavaScript で定義できる仕組みです。もちろん、JavaScript で実装された Flexbox はネイティブ実装よりも遅いでしょう。しかし、ムダを省くことでパフォーマンスがよくなるケースも容易に考えられるでしょう。たとえば、Windows 10 や [Masonry] スタイルのレイアウトを想像してください。絶対配置・固定配置も使わない、`z-index` もない。要素も重ならず、ボーダーやオーバーフローもない。再レイアウト時にこうしたチェックを飛ばせるなら、パフォーマンスにもきっと良い影響があるでしょう。

{% highlight JS %}
registerLayout('random-layout', class {
    static get inputProperties() {
      return [];
    }
    static get childrenInputProperties() {
      return [];
    }
    layout(children, constraintSpace, styleMap) {
        const width = constraintSpace.width;
        const height = constraintSpace.height;
        for (let child of children) {
            const x = Math.random()*width;
            const y = Math.random()*height;
            const constraintSubSpace = new ConstraintSpace();
            constraintSubSpace.width = width-x;
            constraintSubSpace.height = height-y;
            const childFragment = child.doLayout(constraintSubSpace);
            childFragment.x = x;
            childFragment.y = y;
        }

        return {
            minContent: 0,
            maxContent: 0,
            width: width,
            height: height,
            fragments: [],
            unPositionedChildren: [],
            breakToken: null
        };
    }
});
{% endhighlight %}

### Typed CSSOM ([仕様][Typed CSSOM spec])

**Status update:** An “almost complete” implementation has landed in Chrome Canary
behind the “Experimental Web Platform features” flag.

**アップデート**：「ほぼほぼ完全」な実装が Chrome Canary に「Experimental Web Platform features」フラグつきで実装されました。

Typed CSSOM (CSS Object Model or Cascading Style Sheets Object Model) addresses a
problem we probably all have encountered and just learned to just put up with.
Let me illustrate with a line of JavaScript:

Typed CSSOM（CSS オブジェクトモデル）は、たぶん誰もが遭遇し、ずっと耐えてきた問題をなんとかするものです。どういうことか、1行の JavaScript で説明してみましょう。

{% highlight JS %}
$('#someDiv').style.height = getRandomInt() + 'px';
{% endhighlight %}

We are doing math, converting a number to a string to append a unit just to have
the browser parse that string and convert it back to a number for the CSS engine.
This gets even uglier when you [manipulate transforms with JavaScript][Aerotwist FLIP].
No more! CSS is about to get some typing!

ここでは、計算をしたのち、単位をつけるために数値を文字列に変換しています。その理由はただ、文字列にすることで CSS エンジンがそれを数値として解釈してくれるからです。[JavaScript で `transform` の値をいじる][Aerotwist FLIP]と、もっとひどいことになります。しかしそれも終わりです！CSS にちょっとだけ型が導入されるんです！

This draft is one of the more mature ones and a [polyfill][Typed CSSOM polyfill] is
already being worked on. (Disclaimer: using the polyfill will obviously
add *even more* computational overhead. The point is to show how convenient the
API is.)

この仕様は他のとくらべだいぶ成熟しており、[polyfill][Typed CSSOM polyfill] も進んでいます。（注：この polyfill には、**いまよりももっと大きな**オーバーヘッドがあります。この polyfill の目的は、API の便利さを確かめてもらうことにあります。）

Instead of strings you will be working on an element’s `StylePropertyMap`, where
each CSS attribute has it’s own key and corresponding value type. Attributes
like `width` have `LengthValue` as their value type. A `LengthValue` is a
dictionary of all CSS units like `em`, `rem`, `px`, `percent`, etc. Setting
`height: calc(5px + 5%)` would yield a `LengthValue{px: 5, percent: 5}`. Some
properties like `box-sizing` just accept certain keywords and therefore have a
`KeywordValue` value type. The validity of those attributes could then be checked
at runtime.

文字列の代わりに、要素の `StylePropertyMap` をさわります。これは各 CSS の属性と対応する値型を key-value としたマップです。たとえば `width` は `LengthValue` という値型を持ちます。`LengthValue` は `em`、`rem`、`px`、`percent` といった CSS の単位すべてを含むディクショナリです。たとえば `height calc(5px + 5%)` を指定すると、`LengthValue{px: 5, percent: 5}` となります。`box-sizing` などのプロパティはいくつかのキーワードを受けとるだけなので、値型は `keywordValue` を持ちます。こういった属性のバリデーションは、実行時に行われるでしょう。

{% highlight HTML %}
<div style="width: 200px;" id="div1"></div>
<div style="width: 300px;" id="div2"></div>
<div id="div3"></div>
<div style="margin-left: calc(5em + 50%);" id="div4"></div>
{% endhighlight %}
{% highlight JS %}
var w1 = $('#div1').styleMap.get('width');
var w2 = $('#div2').styleMap.get('width');
$('#div3').styleMap.set('background-size',
  [new SimpleLength(200, 'px'), w1.add(w2)])
$('#div4')).styleMap.get('margin-left')
  // => {em: 5, percent: 50}
{% endhighlight %}

### Properties and Values ([仕様][Properties and Values spec])

**Status update:** Spec is pretty stable. No accesible implementation as of yet.

**アップデート**：仕様は安定していますが、試せる実装はまだありません。

Do you know [CSS Custom Properties] (or their unofficial alias “CSS Variables”)?
This is them but with types! So far, variables could only have string values and
used a simple search-and-replace approach. This draft would allow you to not
only specify a type for your variables, but also define a default value and
influence the inheritance behavior using a JavaScript API. Technically, this
would also allow custom properties to get animated with standard CSS transitions
and animations, which is also being considered.

[CSS カスタムプロパティ][CSS Custom Properties]（もしくは俗称の「CSS Variables」）を知っていますか？それです！それに型がつきます！これまでの CSS Variables は文字列しか持てず、その利用法も値の使い回しを避けるためくらいにしか使えませんでした。しかしこの仕様では、変数に型を指定できるだけではなく、初期値や継承の有無までも JavaScript API から指定できます。技術的には、カスタムプロパティを CSS Transition や CSS Animations で動かすことも意味します（実際に検討もされています）。

{% highlight JS %}
["--scale-x", "--scale-y"].forEach(function(name) {
document.registerProperty({
    name: name,
    syntax: "<number>",
    inherits: false,
    initialValue: "1"
  });
});
{% endhighlight %}

### Font Metrics

Font metrics is exactly what it sounds like. What is the bounding box (or the
bounding boxes when we are wrapping) when I render string X with font Y at size
Z? What if I go all crazy unicode on you like using [ruby annotations]? This has
been requested a lot and Houdini should finally make these wishes
come true.

フォントメトリクスは、名前のとおりです。X という文字列を Y というフォントを使い、サイズ Z で表示させたとき、そのバウンディングボックスはどうなるでしょう？Unicode のふしぎな文字や、[ルビ][ruby annotations]はどうでしょう？フォントメトリクスはこれまで要望が多かったものですが、Houdini によってついに実現すると思います。

### まだまだありますよ！

There’s even more specs in Houdini’s list of drafts, but the future of those is
rather uncertain and they are not much more than placeholders for ideas.
Examples include custom overflow behaviors, CSS syntax extension API, extension
of native scroll behavior and similarly ambitious things all of which enable
things on the web platform that weren't possible before.

Houdini のドラフトのリストには、まだ多くの仕様があります。しかしその多くが、アイデアをただ書いたものといった段階で、この先どうなるかはわかりません。オーバーフローの挙動、CSS 構文の拡張 API、スクロールの挙動を拡張するといった、野望のあるものが並んでいます。どれも、Web プラットフォームがこれまでできなかったことを可能にするものです。

## デモ

I have open-sourced the [code for the demo][Houdini Samples]
([live demo][Houdini Demo] using polyfill) videos I made so you can get a feeling
on what working with worklets feels like. I will update the repository with new
demos as new APIs are landing in Canary.

[デモのコード][Houdini Samples]（polyfill を使った[デモ本体][Houdini Demo]）はオープンソースにしています。デモを実行しているビデオを見ると、Worklet がどういうものかなんとなくつかめるかと思います。新しい API が Canary に追加されたら、レポジトリにもデモを追加しようと思います。

If you want to get involved, there’s always the [Houdini mailing list].

もし Houdini に関わりたい場合は、[メーリングリスト][Houdini mailing list]がありますよ。

[Houdini Drafts]: http://dev.w3.org/houdini/
[Worklets spec]: https://drafts.css-houdini.org/worklets/
[Web Worker spec]: https://www.w3.org/TR/workers/
[Paint Worklet spec]: https://drafts.css-houdini.org/css-paint-api/
[Fragmentation spec]: https://www.w3.org/TR/css3-break/
[HTML5Rocks layers]: http://www.html5rocks.com/en/tutorials/speed/layers/
[Paul Lewis]: https://twitter.com/aerotwist
[Layout Worklet spec]: https://drafts.css-houdini.org/css-layout-api/
[Masonry]: http://masonry.desandro.com/
[Typed CSSOM spec]: https://drafts.css-houdini.org/css-typed-om/
[Aerotwist FLIP]: https://aerotwist.com/blog/flip-your-animations/#got-code
[Typed CSSOM polyfill]: https://github.com/css-typed-om/typed-om
[ruby annotations]: https://ja.wikipedia.org/wiki/%E3%83%AB%E3%83%93
[Properties and Values spec]: https://drafts.css-houdini.org/css-properties-values-api/
[Houdini Samples]: https://github.com/GoogleChrome/houdini-samples
[Houdini mailing list]: https://lists.w3.org/Archives/Public/public-houdini/
[CompWorklet Polyfill]: https://github.com/googlechrome/houdini-samples
[Web Components]: http://webcomponents.org/
[parallax scrolling]: https://en.wikipedia.org/wiki/Parallax_scrolling
[CSS Custom Properties]: https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care
[Houdini Demo]: https://googlechrome.github.io/houdini-samples/compositor-worklet/twitter-header
[Paint Worklet demo]: http://googlechrome.github.io/houdini-samples/paint-worklet/ripple/
[Paint Worklet source]: https://github.com/GoogleChrome/houdini-samples/tree/master/paint-worklet/ripple

