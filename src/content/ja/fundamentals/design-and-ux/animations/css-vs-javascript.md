project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: アニメーション化には CSS または JavaScript を使用できます。条件に応じて、どちらを使用すべきかを見ていきましょう。

{# wf_updated_on: 2016-08-25 #}
{# wf_published_on: 2014-08-08 #}

# CSS アニメーションと JavaScript のアニメーションの比較 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

ウェブ上でアニメーションを作成するには、主に 2 通りの方法（CSS の使用および JavaScript の使用）があります。どちらの方法を選択するのかは、プロジェクトの他の依存関係、および実現しようとする効果の種類に大きく依存します。

### TL;DR {: .hide-from-toc }
* UI 要素の状態の切り替えなど単純な一度切りの遷移には、CSS アニメーションを使用します。
* バウンス、停止、一時停止、巻き戻し、スローダウンなど、高度な効果を実現したい場合は、JavaScript アニメーションを使用します。
* JavaScript でアニメーション化する場合は、Web Animations API などの使いやすい最新のフレームワークを使用します。


基本的なアニメーションはほとんど CSS でも JavaScript でも作成できますが、作業負荷と所要時間に差が出ます（[CSS と JavaScript のパフォーマンス比較](animations-and-performance#css-vs-javascript-performance) を参照してください）。それぞれに長所と短所があるため、以下のガイドラインを参考にしてください。

* **UI 要素の状態がシンプルで自己完結的な場合は、CSS を使用します。**サイドからナビゲーション メニューをスライドさせたり、ツールチップを表示したりする場合は、CSS 遷移とアニメーションが理想的です。状態を制御するために最終的に JavaScript を使用することになっても、アニメーション自身は CSS 内にあります。
* **アニメーションを細かく制御する必要がある場合は、JavaScript を使用します。**Web Animations API は、現在 Chrome と Opera で利用できる標準ベースのアプローチです。実際のオブジェクトを使用できるため、複雑なオブジェクト指向のアプリケーションにとっては理想的です。停止、一時停止、スローダウン、逆再生が必要な場合は、JavaScript も便利です。
* **シーン全体を手動で調整する場合は、`requestAnimationFrame` を直接使用します。**これは JavaScript の高度なアプローチですが、ゲームを作成する場合や HTML キャンバスに描画する場合に役立ちます。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WaNoqBAp8NI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

一方、jQuery の [`.animate()`](https://api.jquery.com/animate/){: .external } メソッドや [GreenSock の TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) など、アニメーション機能を含む JavaScript フレームワークを既に使用している場合は、通常、それを継続して使用するほうが便利です。

<div class="clearfix"></div>

##  CSS によるアニメーション

画面上で何かを動かすには、 CSS によるアニメーションを使用するのが最も単純な方法です。動作を自分で指定するこのアプローチは、*宣言型*といいます。

X 軸と Y 軸の両方に対して、要素を 100 ピクセルずつ動かす CSS を以下に示します。ここでは、移動時間を 500 ミリ秒に設定した CSS 遷移を使用しています。`move` クラスが追加されると、`transform` 値が変更されて遷移が始まります。


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
    
[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-simple.html){: target="_blank" .external }

遷移の継続時間のほかに、「イージング」のオプションもあります。基本的に、アニメーションの印象はイージングによって決まります。イージングについての詳細は、[イージングの基本](the-basics-of-easing)のガイドを参照してください。

上記のスニペットと同様に、アニメーションを管理するために別の CSS クラスを作成する場合は、JavaScript を使用して各アニメーションのオンとオフを切り替えることができます。


    box.classList.add('move');
    

こうすると、アプリケーションが均衡化されます。ターゲット要素に対して適切なクラスを設定すれば、アニメーションの操作はブラウザに任せて、JavaScript による状態の管理に専念できます。この手法を採用すると、要素の `transitionend` イベントを監視できます。ただし、旧バージョンの Internet Explorer をサポートしなくてもよい場合に限ります（これらのイベントはバージョン 10 以降でサポートされます）。他のブラウザはすべて、当面は、このイベントをサポートしています。

遷移の終了を監視するのに必要な JavaScript は次のとおりです。


    var box = document.querySelector('.box');
    box.addEventListener('transitionend', onTransitionEnd, false);
    
    function onTransitionEnd() {
      // Handle the transition finishing.
    }
    

CSS 遷移のほかに、CSS アニメーションも使用できます。これにより、個々のアニメーション キーフレーム、継続時間、反復処理をより細かく制御できます。

注: アニメーションになじみのない方のために説明すると、キーフレームは手書きのアニメーションに由来する古い用語です。アニメーション作成者は、あるアクションに対してキーフレームと呼ばれる特定のフレームを作成します。キーフレームは特定のモーションの主要な部分をキャプチャするものです。その後、アニメーション作成者は、キーフレームの間にすべての個別フレームを描き始めます。本日、CSS アニメーションで同様のプロセスを実行します。このプロセスでは、特定の時点で CSS プロパティが持つ必要のある値をブラウザに指示すると、ブラウザがギャップを埋めます。

たとえば遷移と同じ方法を用いて、クリックなどのユーザー操作がなくても無限に繰り返すアニメーションをボックスに適用することが可能です。また、複数のプロパティを同時に変更することもできます。


    /**
     * This is a simplified version without
     * vendor prefixes.With them included
     * (which you will need), things get far
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
    

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-keyframes.html){: target="_blank" .external }

CSS アニメーションでは、ターゲット要素とは別にアニメーション自体を定義し、アニメーション名プロパティを使用して必要なアニメーションを選択します。

一部の CSS アニメーションには今でもベンダー プレフィックスが付いており、Safari、Safari Mobile、Android では `-webkit-` が使用されています。Chrome、Opera、Internet Explorer、Firefox はすべてプレフィックスなしでリリースされています。プレフィックスを付けたバージョンの CSS を作成する必要がある場合は、さまざまなツールを利用できます。これらのツールを使用すると、ソースファイル内ではプレフィックスなしのバージョンを書くことができます。

##  JavaScript と Web Animations API によるアニメーション

JavaScript によるアニメーションの作成は、CSS による遷移やアニメーションの作成よりも複雑ですが、通常、デベロッパーにとっては非常に強力な手法となります。[Web Animations API](https://w3c.github.io/web-animations/) を使用すると、特定の CSS プロパティのアニメーション化や、構成可能な効果オブジェクトの作成が可能になります。

JavaScript アニメーションは、コードの一部としてインラインで記述する*命令型*です。他のオブジェクト内にカプセル化することもできます。前述の CSS 遷移を再現するために必要な JavaScript を以下に示します。


    var target = document.querySelector('.box');
    var player = target.animate([
      {transform: 'translate(0)'},
      {transform: 'translate(100px, 100px)'}
    ], 500);
    player.addEventListener('finish', function() {
      target.style.transform = 'translate(100px, 100px)';
    });
    

デフォルトでは、ウェブ アニメーションは要素の体裁のみを変更します。オブジェクトを移動先の位置に保持したい場合は、サンプルのように、アニメーションが完了したときにその基盤となるスタイルを変更する必要があります。

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-wa.html){: target="_blank" .external }

Web Animations API は、W3C の新しい標準です。Chrome と Opera ではネイティブでサポートされており、[Firefox 向けの API は積極的に開発中です](https://birtles.github.io/areweanimatedyet/){: .external }。その他の最新ブラウザについては、[Polyfill を利用できます](https://github.com/web-animations/web-animations-js)。

JavaScript アニメーションを使用すると、あらゆるステップで要素のスタイルを細かく制御できるため、アニメーションのスローダウン、一時停止、停止、逆再生、要素の操作などを適切に実行することができます。動作を適切にカプセル化できるため、複雑なオブジェクト指向のアプリケーションを作成する場合に特に便利な方法です。


{# wf_devsite_translation #}
