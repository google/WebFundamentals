project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 動画の表示はプラットフォームによって異なります。モバイル ソリューションではデバイスの向きを考慮する必要があります。Fullscreen API を使用すると、動画コンテンツのフルスクリーン表示を制御できます。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 動画プレーヤーをカスタマイズする {: .page-title }

{% include "_shared/contributors/TODO.html" %}



動画の表示はプラットフォームによって異なります。モバイル ソリューションではデバイスの向きを考慮する必要があります。Fullscreen API を使用すると、動画コンテンツのフルスクリーン表示を制御できます。



動画の表示はプラットフォームによって異なります。モバイル ソリューションではデバイスの向きを考慮する必要があります。Fullscreen API を使用すると、動画コンテンツのフルスクリーン表示を制御できます。

## さまざまなデバイスでのデバイスの向きの影響

デバイスの向きは、デスクトップ モニターやノートパソコンでは問題になりませんが、携帯端末やタブレット用のウェブページのデザインを検討する際には非常に重要です。

iPhone の Safari は、縦向きと横向きでの切り替えが非常にスムーズです。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="縦向きの iPhone の Safari で再生している動画のスクリーンショット" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="横向きの iPhone の Safari で再生している動画のスクリーンショット" src="images/iPhone-video-playing-landscape.png">
</div>

iPad や Android の Chrome では、デバイスの向きが問題になることがあります。
たとえば、横向きの iPad での動画の再生をカスタマイズしないと、次のように表示されます。

<img class="center" alt="横向きの iPad Retina の Safari で再生している動画のスクリーンショット"
src="images/iPad-Retina-landscape-video-playing.png">

CSS で width: 100% または max-width: 100% と設定すると、デバイスの向きによるレイアウトの問題の多くは解決できます。また、フルスクリーンの代替手段も検討した方がよい場合があります。

## インラインまたはフルスクリーン表示

動画の表示はプラットフォームによって異なります。iPhone の Safari では、動画要素をウェブページ内で表示しますが、再生するときはフルスクリーン モードになります。

<img class="center" alt="縦向きの iPhone に表示された動画要素のスクリーンショット" src="images/iPhone-video-with-poster.png">

Android では、フルスクリーン アイコンをクリックすることでフルスクリーン モードをリクエストできますが、デフォルトではインラインで動画を再生します。

<img class="center" alt="縦向きの Android の Chrome で再生している動画のスクリーンショット" src="images/Chrome-Android-video-playing-portrait-3x5.png">

iPad の Safari では動画をインラインで再生します。

<img class="center" alt="横向きの iPad Retina の Safari で再生している動画のスクリーンショット" src="images/iPad-Retina-landscape-video-playing.png">

## コンテンツのフルスクリーン表示の制御

フルスクリーンでの動画の再生を強制できないプラットフォームでは、Fullscreen API が[幅広くサポートされています](//caniuse.com/fullscreen)。この API を使用すると、コンテンツまたはページのフルスクリーン表示を制御できます。

video:のように要素をフルスクリーン表示する方法は、次のとおりです。

    elem.requestFullScreen();
    

ドキュメント全体をフルスクリーン表示する方法は、次のとおりです。

    document.body.requestFullScreen();
    

フルスクリーン状態の変更をリッスンすることもできます。

    video.addEventListener("fullscreenchange", handler);
    

要素が現在フルスクリーン モードかどうかを確認することもできます。

    console.log("In full screen mode: ", video.displayingFullscreen);
    

また、CSS で :fullscreen 疑似クラスを使用して、フルスクリーン モードでの要素の表示方法を変更することもできます。

Fullscreen API をサポートしているデバイスでは、動画のプレースホルダとしてサムネイル画像を使用することを検討してください。

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>このブラウザは、動画要素をサポートしていません。</p>
</video>

実際の動作を確認するには、こちらの<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">デモ</a>をご覧ください。

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



