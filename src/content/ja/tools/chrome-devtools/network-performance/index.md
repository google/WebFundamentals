project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:ネットワーク パフォーマンスを分析してみましょう。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-01-17 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
figcaption {
  text-align: center;
}
</style>

# Chrome DevTools でネットワーク パフォーマンスを分析する {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

注: 読み込み速度を改善する総合的なアプローチについては、[ウェブサイトの速度の最適化](/web/tools/chrome-devtools/speed/get-started)を参照してください。
 そのチュートリアルでは、読み込みパフォーマンスを分析する推奨ワークフローが説明されています。


このチュートリアルでは、Chrome DevTools の [Network] パネルを使用してページの読み込みが遅い理由を理解する方法を、手順を追ってインタラクティブに説明します。


## ステップ 1: DevTools をセットアップする {: #set-up }

モバイル ユーザーからあなたのサイトの特定のページが遅いという報告を受けたと仮定しましょう。
 このときあなたがしなければならないことは、そのページ速くすることです。

1. 次の**「遅いページを開く」** をクリックします。 新しいタブでそのページが開きます。

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v1.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Slow Page Opened">
       <button>遅いページを開く</button>
     </a>

1. そのページにフォーカスがある状態で <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd>（Mac）または <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>（Windows、Linux）を押して、そのページで DevTools を開きます。

1. DevTools の **[Network]** タブをクリックします。

     <figure>
       <img src="imgs/get-started-network-panel.png"
         alt="診断しようとしている遅いページで開かれた、Chrome DevTools の [Network] パネル。
">
       <figcaption>
         <b>図 1</b>。 診断しようとしている遅いページの横に開かれた、Chrome DevTools の [Network] パネル。

       </figcaption>
     </figure>

     <aside class="note">
       <b>注: </b> 残りのスクリーンショットでは、DevTools は<a
       href="/web/tools/chrome-devtools/ui#placement" target="_blank">
       ドッキングを解除されて別個のウィンドウになっているため、</a>その内容がはっきりと表示されています。

     </aside>

1. **[Capture Screenshots]** ![Capture
   Screenshots][screenshots] を有効にします。{:.devtools-inline}有効になると青色に変わります。
   DevTools はページ読み込み中のスクリーンショットをキャプチャします。

## ステップ 2: モバイル ユーザーのエクスペリエンスをエミュレートする {: #emulate }

ノートパソコンやデスクトップ パソコンでネットワーク パフォーマンスをテストしても、思い通りの結果が得られない場合があります。 使用するインターネット接続がモバイル ユーザーの接続よりも速すぎたり、使用するブラウザのキャッシュに以前に訪問したときのリソースが残っていたりすることがあるからです。



1. **[Disable Cache]** チェックボックスにチェックを入れます。 このチェックボックスを有効にした場合、DevTools はキャッシュにあるリソースを使用しません。
   こうすることで、初めてサイトを訪問したユーザーがページを表示したときのユーザー エクスペリエンスが正確にエミュレートされます。

1. 現在の設定が **[No Throttling]** となっているドロップダウンで、**[Regular 2G]** を選択します。
 DevTools はネットワーク接続をスロットリングして、通常の 2G エクスペリエンスとなるようにシミュレートします。
 これが、接続状態の悪い場所でモバイル ユーザーがサイトを使用したときの操作性です。


<figure>
  <img src="imgs/get-started-setup.svg"
    alt="スクリーンショットを設定し、キャッシュ無効にし、スロットリングを行った状態の Chrome DevTools [Network] パネル。">

  <figcaption>
    <b>図 2</b>。 モバイル ユーザーの操作性をエミュレートするように設定された Chrome DevTools の [Network] パネル。
 左から右に、スクリーンショット、キャッシュ無効、スロットリングの設定がそれぞれ青い囲みで示されています。


  </figcaption>
</figure>

これは最悪のケースのセットアップです。 このセットアップ状態でページ読み込みを速くできたら、すべてのユーザーの読み込みが速くなるはずです。


[screenshots]: imgs/capture-screenshots.png

## ステップ 3: リクエストを分析する {: #analyze }

ページを再読み込みし、読み込まれるリクエストを分析して、ページが遅くなる理由を見つけます。


### パート A:レンダリング ブロック スクリプトを見つける

ブラウザは `<script>` タグを検出すると、直ちにレンダリングを一時停止してスクリプトを実行します。
 ページ読み込みに必要ないスクリプトを見つけて、それらを非同期にして実行を遅らせ、読み込み時間を速くします。


1. <kbd>Command</kbd>+<kbd>R</kbd>（Mac）または <kbd>Control</kbd>+<kbd>R</kbd>（Windows、Linux）を押して、ページを再読み込みします。

   Wi-Fi 接続の条件が良い状態で、ページを完全に読み込むのに 10 秒以上かかります。

     <figure>
       <img src="imgs/get-started-post-load.png"
         alt="ページ再読み込み後の Chrome DevTools [Network] パネル。">
       <figcaption>
         <b>図 3</b>。 ページ再読み込み後の Chrome DevTools [Network] パネル。

       </figcaption>
     </figure>

1. [Network] パネルの下部にある [[Summary]
 ペイン](reference#summary) の [`DOMContentLoaded`][DOMContentLoaded] の値を確認します。
   値は 4 秒以上になっているはずです。 このように、このイベントの動作が遅い場合、メイン ドキュメントの読み込みと解析を遅らせているスクリプトに注意してください。

1. **main.js** をクリックして、リクエストをさらに調査します。 DevTools に新しいタブが表示され、このリクエストに関する詳細情報が提供されます。

1. **[Preview]** タブをクリックすると、リクエストのソースコードが表示されます。 スクリプトが 4000 ミリ秒の間ハングしていることがわかります。

   このスクリプトを `async` 属性でマーキングし、ドキュメントの `<body>` の最下部に移動することで、このスクリプトで待機状態にならずにページを読み込めます。

     <figure>
       <img src="imgs/get-started-preview.png"
         alt="[Preview] ペインでの main.js のソースコードの表示。">
       <figcaption>
         <b>図 4</b>。 [Preview] ペインでの <code>main.js</code> のソースコードの表示。

       </figcaption>
     </figure>

レンダリング ブロック スクリプトについて詳しくは、[Parser-blocking versus asynchronous JavaScript][async]をご覧ください。


### パート B:サイズの大きいリクエストの検出

ページを読み込んだときに、DevTools ロゴの読み込みにかなり時間がかかったことにお気づきになりましたか。
ページの読み込みがブロックされているわけではなく、実はページの*表示*が遅くなるようにしています。
 ユーザーはページが速く*表示される*ことを好みます。

1. **[Close]** ![Close][close] をクリックして、{:.devtools-inline} [**[Requests] ペイン**](reference#requests)を再度表示します。

1. 左上のスクリーンショットをダブルクリックします。

1. 右矢印キーを押して、スクリーンショット全体を概観します。 スクリーンショットの下の時刻は、スクリーンショットを撮った時間を表します。
 スクリーンショットの読み込みに 2 秒以上かかっています。
 これは、ファイルのサイズが大きいことを意味しているようです。

1. スクリーンショットの外をクリックして、スクリーンショットを最小表示にします。

1. `logo-1024px.png`
 リクエストの [Waterfall](reference#waterfall) の上にマウスポインターを置きます。 リクエストの処理にかかる時間のほとんどが画像のダウンロードに費やされています。
 このことから、画像が非常に大きいことがわかります。

     <figure>
       <img src="imgs/get-started-waterfall.png"
         alt="logo-1024px.png のウォーターフォール。">
       <figcaption>
         <b>図 5</b>。 <code>logo-1024px.png</code> のウォーターフォール。
       </figcaption>
     </figure>

[DOMContentLoaded]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

[async]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript#parser_blocking_versus_asynchronous_javascript

[close]: imgs/close.png 

## ステップ 4: 更新されたページ上で修正を検証する {: #verify }

作業の完了は間近です。 ページに 2 箇所の変更を行ったとしましょう。


* スクリプトを `<body>` の最下部に移動し、`async` のマークを付けて、ページ読み込みの邪魔をしないようにしました。
* ロゴを SVG に変換してファイルのサイズを小さくしました。

あとは、更新したページをテストして、修正したページの読み込みが実際に速くなっているかを検証する作業が残っています。


1. **[速いページを開く]** をクリックします。 新しいタブで修正したページが開きます。

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v2.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Fast Page Opened">
       <button>速いページを開く</button>
     </a>

1. 先ほどと同じように DevTools をセットアップします。 スクリーンショットとキャッシュ無効をオンにし、ネットワーク スロットリングを **Regular 2G** に設定します。

1. ページを再読み込みします。 ページの読み込みがとても速くなっています。

     <figure>
       <img src="imgs/get-started-post-fix.png"
         alt="修正適用後のページ読み込みの記録。">
       <figcaption>
         <b>図 6</b>。 修正適用後のページ読み込みの記録。
 このページは完全に表示されるまでに 10 秒ほどかかっていました。
 それがたった 1 秒で表示されるようになりました。
       </figcaption>
     </figure>

<aside class="note">
  <b>注</b>: ページの読み込みは非序に速くなりましたが、約 5 秒かかっており、依然として使用には堪えません。
 これは、ページのメインスレッドでハングするスクリプトが実行されているためです。

</aside>

## 次のステップ {: #next-steps }

お疲れ様でした。 これで、あなたも Chrome DevTools [Network] パネルの正真正銘のエキスパートになりました。
 いや...、 まだエキスパートではないかもしれませんね。 でも、スキルと知識のしっかりとした土台を据えることはできました。


* 軽快なページ読み込みの理論について詳しくは、<a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / CRP"
  href="/web/fundamentals/performance/critical-rendering-path">クリティカル レンディング パス</a>をご覧ください。
* 種々のネットワークの問題を適格に見極める方法については、<a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Issues Guide" href="issues">Network
  Issues Guide</a>をご覧ください。
* [Network] パネルの全機能については、<a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Reference" href="reference">Network
  Panel Reference</a>をご覧ください。

## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
