---
title: "動画プレーヤーをカスタマイズする"
description: "動画の表示はプラットフォームによって異なります。モバイル ソリューションではデバイスの向きを考慮する必要があります。Fullscreen API を使用すると、動画コンテンツのフルスクリーン表示を制御できます。"
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "動画要素を使用して、サイトで動画の読み込み、デコード、再生を行う。"
    - "多様なモバイル プラットフォームに対応できるように複数の形式で動画を生成する。"
    - "動画がコンテナからはみ出さないように動画のサイズを正しく設定する。"
    - "動画要素の子としてトラック要素を追加し、利用しやすさの問題に対応する。"
notes:
  media-fragments:
    - "Media Fragments API は、ほとんどのプラットフォームでサポートされていますが、iOS ではサポートされていません。"
    - "お使いのサーバーで Range リクエストがサポートされていることを確認してください。ほとんどのサーバーで Range リクエストはデフォルトで有効になっていますが、一部のホスティング サーバーでは無効になっている場合があります。"
  dont-overflow:
    - "要素のサイズ設定で、元の動画と異なるアスペクト比を使用しないでください。画面を縮めたり引き延ばしたりすると、動画の表示が崩れます。"
  accessibility-matters:
    - "トラック要素は、Firefox を除き、Chrome for Android、iOS Safari、および現在デスクトップで使用されているすべてのブラウザでサポートされています（<a href='http://caniuse.com/track' title='トラック要素のサポート状況'>caniuse.com/track</a> をご覧ください）。polyfill も使用できます。Google では、<a href='//www.delphiki.com/html5/playr/' title='Playr トラック要素の polyfill'>Playr</a> または <a href='//captionatorjs.com/' title='Captionator トラック'>Captionator</a> をおすすめします。"
  construct-video-streams:
    - "MSE は、Chrome の Android と Opera、デスクトップの Internet Explorer 11 と Chrome でサポートされており、また <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions の実装予定'>Firefox</a> でもサポートされる予定です。"
  optimize:
    - "<a href='../images/'>画像</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>コンテンツの効率の最適化</a>"
---

<p class="intro">
  動画の表示はプラットフォームによって異なります。モバイル ソリューションではデバイスの向きを考慮する必要があります。Fullscreen API を使用すると、動画コンテンツのフルスクリーン表示を制御できます。
</p>

{% include shared/toc.liquid %}


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
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

ドキュメント全体をフルスクリーン表示する方法は、次のとおりです。
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

フルスクリーン状態の変更をリッスンすることもできます。
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

要素が現在フルスクリーン モードかどうかを確認することもできます。
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

また、CSS で :fullscreen 疑似クラスを使用して、フルスクリーン モードでの要素の表示方法を変更することもできます。

Fullscreen API をサポートしているデバイスでは、動画のプレースホルダとしてサムネイル画像を使用することを検討してください。

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>このブラウザは、動画要素をサポートしていません。</p>
</video>

実際の動作を確認するには、こちらの{% link_sample _code/fullscreen.html %}デモ{% endlink_sample %}をご覧ください。

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



