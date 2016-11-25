project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSS または JavaScript でアニメーション化することができます。 どちらを使いますか? またその理由は ?」

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# CSS 対 JavaScript のアニメーション {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}


ウェブ上でアニメーションを作成するには、主に 2 通りの方法（CSS の使用および JavaScript の使用）があります。 どちらの方法を選択するのかは、プロジェクトの他の従属関係、および実現しようとする効果の種類に大きく依存します。

### TL;DR {: .hide-from-toc }
- UI 要素の状態の切り替えなど、単純な「ワンショット」遷移には、CSS アニメーションを使用します。
- バウンド、停止、一時停止、巻き戻し、スローダウンなど、高度な効果を実現したい場合は、JavaScript アニメーションを使用します。
- JavaScript によるアニメーションを選択した場合は、TweenMax を使用します。または、簡易版のソリューションが望ましい場合は、TweenLite を使用します。


ほとんどの基本アニメーションは CSS または JavaScript で作成できますが、作業負荷と時間は異なります (参照 [CSS 対 JavaScript のパフォーマンス](/web/fundamentals/design-and-ui/animations/animations-and-performance#css-vs-javascript-performance))。 各方法には長所と短所がありますが、適切な経験則は次のとおりです。

* ** より単純で自己充足的な状態を UI 要素に持たせる場合は、CSS を使用します。** 側面からナビゲーション メニューを取り込んだり、ツールヒントを表示したりするには、CSS 遷移とアニメーションが理想的です。 状態を制御するために最終的に JavaScript を使用することになっても、アニメーション自身は CSS 内にあります。
* ** アニメーションを細かく制御する必要がある場合は、JavaScript を使用します。** タッチ位置を動的に追跡する場合や、停止/一時停止/スローダウン/逆再生を行うアニメーションを作成する場合は、通常、JavaScript を使用する必要があります。

アニメーション機能を含む jQuery または JavaScript フレームワークをすでに使用している場合は、通常、CSS に切り替えるよりも、既存のアニメーション機能をそのまま使用するほうが便利です。

### CSS によるアニメーション

画面上で何かを動かすのに CSS によるアニメーションが最も単純な方法であることに、疑いの余地はありません。

X 軸と Y 軸の両方向に要素を 100px 移動させる CSS を下記に示します。 この処理を実行するのに、500ms かかるように設定された CSS 遷移を使用します。 `move` クラスが追加されると、`transform` 値が変更されて遷移が始まります。


    .box {
      -webkit-transform: translate(0, 0);
      -webkit-transition: -webkit-transform 500ms;
    
      transform: translate(0, 0);
      transition: transform 500ms;
    }
    
    .box.move {
      -webkit-transform: translate(100px, 100px);
      transform: translate(100px, 100px);
    }
    

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/box-move-simple.html">サンプルを参照してください。</a>

遷移の持続時間のほかに、軽減化のためのオプションがあります。それは本質的にアニメーションの感じ方です。 詳細については、[“The Basics of Easing”](the-basics-of-easing.html) ガイドを参照してください。

上記のスニペットと同様に、アニメーションを管理するために別個の CSS クラスを作成する場合は、JavaScript を使用して各アニメーションのオンとオフを切り替えることができます。


    box.classList.add('move');
    

こうすると、アプリケーションが最適に均衡化されます。 JavaScript による状態の管理に焦点を当てて、ターゲット要素に対して適切なクラスを単に設定し、アニメーションの操作をブラウザに任せることができます。 この手法を採用し続ける場合は、要素に対する `transitionend` イベントを監視できます。ただし、旧バージョンの Internet Explorer のサポートを無視できる場合に限ります (これらのイベントをサポートする最初のバージョンは IE バージョン 10 でした)。 他のすべてのブラウザは、しばらくの間、イベントをサポートしていました。

遷移の最後を監視するのに必要な JavaScript は次のとおりです。


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

CSS 遷移を使用するほかに、CSS アニメーションも使用できます。こうすると、個々のアニメーション キーフレーム、時速時間と反復をより細かく制御できます。

Note: アニメーションという用語に慣れていない場合、手書きアニメーションからの旧用語はキーフレームです。 アニメーション作者は、一定のアクションに対してキーフレームと呼ばれる特定のフレームを作成します。キーフレームは特定のモーションの最も極端な部分を捕捉するものです。その後、アニメーション作者は、キーフレームの間にすべての個別フレームを描き始めます。 本日、CSS アニメーションで同様のプロセスを実行します。このプロセスでは、特定の時点で CSS プロパティが持つ必要のある値をブラウザに指示すると、ブラウザがギャップを埋めます。

たとえば、遷移と同じ方法でボックスをアニメーション化できますが、クリックのようなユーザ操作なしでのアニメーション化や、反復回数が無限のアニメーション化が可能です。 また、複数のプロパティを同時に変更することもできます。


    /**
     * This is a simplified version without
     * vendor prefixes. With them included
     * (which you will need) things get far
     * more verbose!
     */
    .box {
      /* Choose the animation */
      animation-name: movingBox;
    
      /* The animation’s duration */
      animation-duration: 1300ms;
    
      /* The number of times we want
          the animation to run */
      animation-iteration-count: infinite;
    
      /* Causes the animation to reverse
          on every odd iteration */
      animation-direction: alternate;
    }
    
    @keyframes movingBox {
      0% {
        transform: translate(0, 0);
        opacity: 0.3;
      }
    
      25% {
        opacity: 0.9;
      }
    
      50% {
        transform: translate(100px, 100px);
        opacity: 0.2;
      }
    
      100% {
        transform: translate(30px, 30px);
        opacity: 0.8;
      }
    }
    

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/box-move-keyframes.html">サンプルを参照してください。</a>

CSS アニメーションでは、ターゲット要素とは別個にアニメーション自身を定義し、アニメーション名プロパティを使用して必要なアニメーションを選択します。

依然としてほとんどの CSS アニメーションはベンダーのプレフィックス付きであり、Chrome、Safari、Opera、Safari Mobile、Android の各ブラウザでは `-webkit-` が使用されています。 Internet Explorer と Firefox の両ブラウザはプレフィックスなしで出荷されています。 プレフィックス付きバージョンの必要な CSS を作成するのに役立つ数多くのツールがあります。これらのツールを使用して、ソースファイル内でプレフィックスなしのバージョンを書くことができます。

### JavaScript によるアニメーション

JavaScript によるアニメーションの作成は、CSS による遷移またはアニメーションの作成よりも複雑ですが、通常、より広範なパワーを開発者に提供します。 一般的なアプローチでは `requestAnimationFrame` を使用し、アニメーションの各フレームで、アニメーション化対象の要素の各プロパティ値を手作業で確定します。

Note: アニメーション用に setInterval または setTimeout を使用するウェブ関連コードを見かけることがあります。 アニメーションは画面のリフレッシュ レートに同期しないため、これは不適切な手法です。アニメーションは激しく震動してスキップする可能性があります。 このようなコードは常に避けて、代わりに、正しく同期される requestAnimationFrame を使用してください。

前述の CSS 遷移を再作成するのに必要な JavaScript を下記に示します。


    function Box () {
    
      var animationStartTime = 0;
      var animationDuration = 500;
      var target = document.querySelector('.box');
    
      this.startAnimation = function() {
        animationStartTime = Date.now();
        requestAnimationFrame(update);
      };
    
      function update() {
        var currentTime = Date.now();
        var positionInAnimation = (currentTime - animationStartTime) / animationDuration;
    
        var xPosition = positionInAnimation * 100;
        var yPosition = positionInAnimation * 100;
    
        target.style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';
    
        if (positionInAnimation <= 1)
          requestAnimationFrame(update);
      }
    }
    
    var box = new Box();
    box.startAnimation();
    

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/box-move-js.html">サンプルを参照してください。</a>

より多くのケースに適用できるよう拡張しようとすると、このコードは非常に複雑で管理が難しくなるように思われます。したがって、一般的に、アニメーション用に使用できる数多くの JavaScript ライブラリのいずれかを選択するのが適切です。 プロジェクトで jQuery をすでに使用している場合は、既存の機能を維持して、[`.animate()`](http://api.jquery.com/animate/) 関数を使用するほうが適切です。 一方、専用のライブラリが必要な場合は、非常に強力な [Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) を使用してください。 TweenLite と呼ばれる簡易版の TweenMax があります。TweenLite はファイルサイズの観点から使いやすく設計されています。

JavaScript によるアニメーションでは、すべてのステップで要素スタイルを細かく制御できるため、アニメーションの停止、一時停止、スローダウン、逆再生、操作などを適切な方法で実行することができます。


