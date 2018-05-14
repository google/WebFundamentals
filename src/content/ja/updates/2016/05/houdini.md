project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini は CSS エンジンの内部を開発者に公開する API の総称です。

{# wf_updated_on: 2016-09-22 #}
{# wf_published_on: 2016-05-19 #}

# Houdini – CSS の秘密を解き明かすもの {: .page-title }

{% include "web/_shared/contributors/surma.html" %}



Dogfood：この記事の各セクションに、そこで紹介する仕様の現状を追記しました。

CSS の作業にどれくらいかけているか、想像したことがありますか？属性をひとつ変えるだけで、Web サイト全体のレイアウトが変わってしまうなんてことは少なくありません。そういう点で、CSS は**マジック**です。（勘のいい方はなんでこんなことを言うのか分かっちゃうでしょうか。）さて、私たち、Web 開発者コミュニティはこれまで、このマジックをただ観賞し、その証人になることしかできませんでした。しかし、もし、私たちもマジックを披露できたら？**マジシャンになれたら**？それが Houdini なんです！

Houdini タスクフォースは、CSS エンジンの一部を Web 開発者に公開するために Mozilla, Apple, Opera, Microsoft, HP, Intel, Google のエンジニアが集った場所です。このタスクフォースは W3C での正式な標準化を目的として、いくつかのドラフトを策定しています。タスクフォースはハイレベルなゴールを設定し、それらを実現する仕様のドラフトを、そしてさらに、それらのドラフトを実装するためのローレベルな仕様のドラフトも策定しています。これらの仕様がおもに「Houdini」と呼ばれるものです。このポストを書いている時点で、[ドラフトのリスト][Houdini Drafts]はまだ未完成で、いくつかの仕様はプレースホルダだけです。Houdini がどれくらい初期段階なのかがわかるかと思います。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="EUlIxr8mk7s"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

**注意**：これからHoudini のドラフトを紹介し、どんな問題を解決しようとしているのかを紹介したいと思っています。現在はドラフト段階ですが、コード例も紹介しようと思います。ですので、すべての仕様が「ドラフト」であり、変わりやすいことを念頭においてください。紹介したサンプルコードが将来も動く保証はありませんし、ましてやドラフトが標準になる保証さえありません。

## Houdini の仕様たち

### Worklets ([仕様][Worklets spec])

Worklets はそれ単体ではとくに便利じゃありません。これはあとで紹介するドラフトを実現するために導入されたものです。「Worklet」という単語を見て Web Workers を思い浮かべた方、するどいです。Worklets と Workers には多くの共通点があります。では Workers があるのになぜ新しいものを作るのでしょうか。

Houdini　のゴールは、Web 開発者が書いたコードを　CSS　エンジンや周辺のシステムにフックさせることです。なのっで、開発者が書いたコードの一部が**毎フレーム**実行されてしまうなんてことは容易に考えられます。そういったコードの一部には、そうなるしかないものもあるでしょう。Web Workers の仕様にはこう書いてあります。

> Workers [...] は重たい処理なので、数多くの処理を Worker で行うべきではありません。たとえば、400万画素の画像のピクセルごとに Worker を起動するべきではありません。

つまり、Web Worker は Houdini がやりたいことをするのに向いていません。これが Worklets を策定した理由です。Worklets は ES2015 のクラスを使い、Worklet であらかじめ定義されたメソッドを指定します。Worklets は軽くて、ライフタイムが短いのです。

### Paint Worklet ([仕様][Paint Worklet spec])

**アップデート**：初期段階の実装が Chrome Canary に搭載されました。“Experimental Web Platform features” を有効にすると、すべてではありませんが使えます。

まずは Paint Worklet から説明しようと思います。というのも、説明しないといけない機能が少ないからです。仕様にはこう書いてあります。

> CSS の描画段階は、背景、内容、要素の寸法（レイアウトから生成）と算出値をもとにした要素のハイライトの描画に責任を持ちます。

現在の仕様の段階は、ボーダーと背景画像を動的に生成できるというものです。これにより新しい効果をたくさん実現できます。たとえば、DOM 要素を新たに作らず、ボタンにリップル（波紋）効果を施すなんてこともできます。`<canvas>` ではなく、コードを描画時に実行できる利点として、描画する要素の大きさを知っていることと、フラグメントを察知し適切に処理できることです。

えっと、フラグメントって…？

#### フラグメントとは

私はこれまで、DOM ツリー中の要素は CSS エンジンによりボックスとしてレイアウトされるものと考えていました。しかしこの考えはインライン要素を考慮すると破綻します。たとえば `<span>` は折り返すかもしれません。つまり、ひとつの DOM ノードであっても、2つの**断片**、つまり**フラグメント**になるわけです。[仕様][Fragmentation spec]では、2つのフラグメントの境界ボックスを**フラグメンテナ**（fragmentainer）と呼んでいます（ジョークじゃないですよ）。

<img src="/web/updates/images/2016/05/houdini/fragment.png">

Paint Worklet の話に戻りましょう。フラグメントごとにコードが呼ばれ、スタイルが適用されると、機能削減版の `<canvas>` ライクな API にアクセスできます。最終的にはマージンの外に「あふれた」箇所へのアクセスも可能になり、要素の境界の**周り**にも描画できるようになります。つまり `box-shadow` みたいな効果ですね。


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
    

以下は Paint Worklet API で[実装][Paint Worklet source]されたリップル（[デモ][Paint Worklet demo]）のビデオです。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="BX_qv2yKSUk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

### Compositor Worklet

**アップデート**：Chrome は Compositor Worker という Chrome 独自の API を実装中です。この API の上に Compositor Worklet（そして他のものも）を実装します。Compositor Worker はもうそろそろ実装され、ネイティブ実装と遜色ないパフォーマンスを発揮できる polyfill を提供できるようになります。

Compositor Worklet の仕様は WICG に移され、もう少し検討が必要とされてしまいましたが、私がわくわくしているのは実はこれなのです。ご存知かもしれませんが、いくつかの処理は CSS エンジンにより、グラフィックスカードに移管されます。CSS エンジンはグラフィックスカードに依存しているのに、です。

ブラウザは DOM ツリーをとり、決められた条件によって、いくつかの枝とそのサブツリーを個別の[レイヤー][HTML5Rocks layers]にします。サブツリーは自身をそのレイヤーに描画します（将来的には Paint Worklet を使うかもしれません）。最後に、描画された個々のレイヤーすべてが z-index や 3D Transforms を考慮したうえで重なり、配置され、私たちが画面上に見る画像になります。この処理は「compositing」と呼ばれ、「compositor」によって処理されます。この処理の利点は、たとえページがほんのちょっとスクロールしただけでも、**すべての**要素を再描画する必要がないことです。再描画の代わりに、前のフレームのレイヤーを再利用し、スクロール後の位置にあわせて compositor を再度実行するだけです。これによりスピードアップが図られ、60 fps を達成する助けになります。[Paul Lewis] もハッピーです。

<img src="/web/updates/images/2016/05/houdini/compworklet_small.png">

名前から想像できるとおり、Compositor Worklet は compositor にフックし、すでに描画された要素のレイヤーがどう配置され、他のレイヤーとどう重なりあうかに影響します。もう少し説明すると、ブラウザに特定の DOM ノードを compositing 処理にフックさせたいと伝え、その要素が持つ属性―スクロール位置や `transform`、`opacity`などへのアクセスを可能にします。これは、その要素を独立したレイヤーにし、コードを**毎フレーム**コールさせることを意味します。レイヤーの `transform` を操作し動かしたり、属性（`opacity` など）を変更したりして、ゴテゴテっとした小賢しいエフェクトを 60 fps で動かせられるんです。以下のコードは、Compositor Worklet を使ってパララックススクロールを実装したコードの**すべて**です。


    // main.js
    window.compositorWorklet.import('worklet.js')
      .then(function() {
        var animator = new CompositorAnimator('parallax');
        animator.postMessage([
          new CompositorProxy($('.scroller'), ['scrollTop']),
          new CompositorProxy($('.parallax'), ['transform']),
        ]);
      });

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
    

Compositor Worklet は、同僚の Robert Flack が [polyfill][CompWorklet polyfill] を書いているので、どんなものか試せます。ただし、パフォーマンスはよくないでしょう。

### Layout Worklet ([仕様][Layout Worklet spec])

**アップデート**：最初のドラフトが提案されました。実装はこれからです。

仕様に中身はまだありませんが、そのアイデアはとても興味をそそるものです。なにせレイアウトを自分で定義できるんですから！Layout Worklet は `display: layout('mylayout')` といったことができ、ノードの子をノードのボックス内でどう配置するかを JavaScript で定義できる仕組みです。もちろん、JavaScript で実装された Flexbox はネイティブ実装よりも遅いでしょう。しかし、ムダを省くことでパフォーマンスがよくなるケースも容易に考えられるでしょう。たとえば、Windows 10 や [Masonry] スタイルのレイアウトを想像してください。絶対配置・固定配置も使わない、`z-index` もない。要素も重ならず、ボーダーやオーバーフローもない。再レイアウト時にこうしたチェックを飛ばせるなら、パフォーマンスにもきっと良い影響があるでしょう。


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
    

### Typed CSSOM ([仕様][Typed CSSOM spec])

**アップデート**：「ほぼほぼ完全」な実装が Chrome Canary に「Experimental Web Platform features」フラグつきで実装されました。

Typed CSSOM（CSS オブジェクトモデル）は、たぶん誰もが遭遇し、ずっと耐えてきた問題をなんとかするものです。どういうことか、1行の JavaScript で説明してみましょう。


    $('#someDiv').style.height = getRandomInt() + 'px';
    

ここでは、計算をしたのち、単位をつけるために数値を文字列に変換しています。その理由はただ、文字列にすることで CSS エンジンがそれを数値として解釈してくれるからです。[JavaScript で `transform` の値をいじる][Aerotwist FLIP]と、もっとひどいことになります。しかしそれも終わりです！CSS にちょっとだけ型が導入されるんです！

この仕様は他のとくらべだいぶ成熟しており、[polyfill][Typed CSSOM polyfill] も進んでいます。（注：この polyfill には、**いまよりももっと大きな**オーバーヘッドがあります。この polyfill の目的は、API の便利さを確かめてもらうことにあります。）

文字列の代わりに、要素の `StylePropertyMap` をさわります。これは各 CSS の属性と対応する値型を key-value としたマップです。たとえば `width` は `LengthValue` という値型を持ちます。`LengthValue` は `em`、`rem`、`px`、`percent` といった CSS の単位すべてを含むディクショナリです。たとえば `height calc(5px + 5%)` を指定すると、`LengthValue{px: 5, percent: 5}` となります。`box-sizing` などのプロパティはいくつかのキーワードを受けとるだけなので、値型は `keywordValue` を持ちます。こういった属性のバリデーションは、実行時に行われるでしょう。


    <div style="width: 200px;" id="div1"></div>
    <div style="width: 300px;" id="div2"></div>
    <div id="div3"></div>
    <div style="margin-left: calc(5em + 50%);" id="div4"></div>
    

    var w1 = $('#div1').styleMap.get('width');
    var w2 = $('#div2').styleMap.get('width');
    $('#div3').styleMap.set('background-size',
      [new SimpleLength(200, 'px'), w1.add(w2)])
    $('#div4')).styleMap.get('margin-left')
      // => {em: 5, percent: 50}
    

### Properties and Values ([仕様][Properties and Values spec])

**アップデート**：仕様は安定していますが、試せる実装はまだありません。

[CSS カスタムプロパティ][CSS Custom Properties]（もしくは俗称の「CSS Variables」）を知っていますか？それです！それに型がつきます！これまでの CSS Variables は文字列しか持てず、その利用法も値の使い回しを避けるためくらいにしか使えませんでした。しかしこの仕様では、変数に型を指定できるだけではなく、初期値や継承の有無までも JavaScript API から指定できます。技術的には、カスタムプロパティを CSS Transition や CSS Animations で動かすことも意味します（実際に検討もされています）。


    ["--scale-x", "--scale-y"].forEach(function(name) {
    document.registerProperty({
        name: name,
        syntax: "<number>",
        inherits: false,
        initialValue: "1"
      });
    });
    

### Font Metrics

フォントメトリクスは、名前のとおりです。X という文字列を Y というフォントを使い、サイズ Z で表示させたとき、そのバウンディングボックスはどうなるでしょう？Unicode のふしぎな文字や、[ルビ][ruby annotations]はどうでしょう？フォントメトリクスはこれまで要望が多かったものですが、Houdini によってついに実現すると思います。

### まだまだありますよ！

Houdini のドラフトのリストには、まだ多くの仕様があります。しかしその多くが、アイデアをただ書いたものといった段階で、この先どうなるかはわかりません。オーバーフローの挙動、CSS 構文の拡張 API、スクロールの挙動を拡張するといった、野望のあるものが並んでいます。どれも、Web プラットフォームがこれまでできなかったことを可能にするものです。

## デモ

[デモのコード][Houdini Samples]（polyfill を使った[デモ本体][Houdini Demo]）はオープンソースにしています。デモを実行しているビデオを見ると、Worklet がどういうものかなんとなくつかめるかと思います。新しい API が Canary に追加されたら、レポジトリにもデモを追加しようと思います。

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
[CSS Custom Properties]: /web/updates/2016/02/css-variables-why-should-you-care
[Houdini Demo]: https://googlechrome.github.io/houdini-samples/compositor-worklet/twitter-header
[Paint Worklet demo]: http://googlechrome.github.io/houdini-samples/paint-worklet/ripple/
[Paint Worklet source]: https://github.com/GoogleChrome/houdini-samples/tree/master/paint-worklet/ripple


Translated By: 
{% include "web/_shared/contributors/myakura.html" %}

{% include "comment-widget.html" %}