project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: アプリ内の 2 つのビュー間にアニメーションを付ける方法を学習します。

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-08 #}

# ビュー切り替えのアニメーション {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

リストから詳細ビューを開いたり、サイドバー ナビゲーションを表示したり、アプリケーション内でビューを切り替えたいケースが多くあります。このようなビュー間に切り替えアニメーションがあると、ユーザーを引きつけ、プロジェクトに躍動感を与えることができます。

### TL;DR {: .hide-from-toc }
* ビューの切り替えには遷移を利用し、レイアウトをトリガーする `left` や `top` などのプロパティの使用は避けます。
* アニメーションはすばやく動くものを使用し、継続時間を短くする必要があります。
* 画面サイズが大きくなったときに、アニメーションとレイアウトがどのように変化するかについても考慮が必要です。小さい画面でうまく動作しても、デスクトップで使用すると適切に表示されない場合があります。

これらのビュー遷移の外観と動作は、扱うビューのタイプによって異なります。たとえば、ビュー上のモーダル オーバーレイのアニメーションは、リストビューと詳細ビューを切り替える遷移とは別物です。

ポイント:すべてのアニメーションにおいて、60fps を極力維持します。これにより、アニメーションがスムーズに動き、ユーザー操作に支障をきたすことがなくなります。また、アニメーションが始まる前に、各アニメーション要素で予定されている変更内容を `will-change` で指定しておきます。ビュー遷移には、`will-change: transform` を使用するのが最も一般的です。

##  画面遷移によってビュー間を移動

<div class="attempt-left">
  <figure>
    <img src="images/view-translate.gif" alt="2 つのビュー間の遷移" />
  </figure>
</div>

わかりやすくするために、リストビューと詳細ビューの 2 つのビューがあるとしましょう。ユーザーがリストビュー内のリスト項目をタップすると、詳細ビューがスライドインして、リストビューがスライドアウトします。

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views.svg" alt="階層を表示。" />
  </figure>
</div>

この効果を実現するには、`overflow: hidden` が設定された、両方のビュー用のコンテナが必要です。こうすると、水平スクロールバーを表示しなくても、2 つのビューをコンテナ内に並べることができます。また、各ビューを必要に応じてコンテナ内で左右にスライドさせることができます。

<div style="clear:both;"></div>

コンテナの CSS は次のとおりです。


    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }
    

コンテナの位置は `relative` として設定します。これにより、コンテナ内の各ビューは必ず左上に配置されたあと、遷移に応じてさまざまな位置に移動します。このアプローチは（レイアウトと描画をトリガーする）`left` プロパティを使用するよりもパフォーマンスが高く、一般的に、より簡単に効率化することができます。


    .view {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    
      /* let the browser know we plan to animate
         each view in and out */
      will-change: transform;
    }
    

`transform` プロパティに `transition` を追加すると、良好なスライド効果が得られます。また、動きを滑らかにするために、カスタム `cubic-bezier` 曲線を使用しています。詳しくは、[カスタム イージングのガイド](custom-easing)をご覧ください。


    .view {
      /* Prefixes are needed for Safari and other WebKit-based browsers */
      transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
      transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    }
    

画面外のビューは右側に移動する必要があります。したがって、この場合は詳細ビューを移動する必要があります。


    .details-view {
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    

ここで、クラスを処理するために JavaScript が少し必要になります。これにより、ビュー上で適切なクラスを切り替えます。


    var container = document.querySelector('.container');
    var backButton = document.querySelector('.back-button');
    var listItems = document.querySelectorAll('.list-item');
    
    /**
     * Toggles the class on the container so that
     * we choose the correct view.
     */
    function onViewChange(evt) {
      container.classList.toggle('view-change');
    }
    
    // When you click a list item, bring on the details view.
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].addEventListener('click', onViewChange, false);
    }
    
    // And switch it back again when you click the back button
    backButton.addEventListener('click', onViewChange);
    

最後に、これらのクラスの CSS 宣言を追加します。


    .view-change .list-view {
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    
    .view-change .details-view {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    
[Try it](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/inter-view-animation.html){: target="_blank" .external }

この手法を拡張して複数のビューに適用することもできます。基本的な概念は同じです。見えていない個々のビューは画面外に移動し、必要に応じて画面内に戻します。その際、現在画面に表示されているビューは画面外に移動する必要があります。

Warning: 複数のブラウザ間でこのような階層を作成するのは困難になる場合があります。たとえば、フリング スクロールを「再有効化」するには、iOS で追加の CSS プロパティ  <code>-webkit-overflow-scrolling: touch</code> が必要です。ただし、標準の overflow プロパティの場合と違って、対象とする軸を制御できません。そのため、実装後は複数のデバイスで必ずをテストを実施してください。

この手法はビューの切り替えに加え、サイドバー ナビゲーション要素のような他のスライドイン要素に適用することができます。実質的な違いは、他のビューを移動する必要がないことだけです。

## 大画面でのアニメーション動作の確認

<div class="attempt-right">
  <figure>
    <img src="images/container-two-views-ls.svg" alt="階層を大画面に表示。" />
  </figure>
</div>

大きい画面の場合は、リストビューを消さずに常時表示して、詳細ビューを右側からスライドインさせます。これはナビゲーション ビューの操作とよく似ています。






{# wf_devsite_translation #}
