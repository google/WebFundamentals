project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現するための最も簡単な方法について説明します。

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-15 #}

# 動画 {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

動画は楽しく有益であるため、ユーザーに好まれます。モバイル端末では、動画の方が情報を理解しやすい場合があります。
しかし動画は広い帯域幅を必要とするため、すべてのプラットフォームで常に同じように視聴できるとは限りません。
動画の読み込みで待たされたり、再生ボタンを押しても無反応だったりすると、ユーザーは不快に感じます。
このガイドでは動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現するための最も簡単な方法について説明します。




##  動画を追加する 

### TL;DR {: .hide-from-toc }
- `video` 要素を使用して、サイトで動画の読み込み、デコード、再生を行います。
- 多様なモバイル プラットフォームに対応するため、複数の形式で動画を生成します。
- 動画がコンテナからはみ出さないように動画のサイズを正しく設定します。
- `track` 要素を `video` 要素の子として追加し、ユーザー補助機能に対応します。


###  video 要素を追加する

サイトで動画の読み込み、デコード、再生を行うために `video` 要素を追加します。

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
  <p>お使いのブラウザは video 要素をサポートしていません。</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Your browser does not support the video element.</p>
    </video>
    

###  複数のファイル形式を指定する

すべてのブラウザが同じ動画形式をサポートしているとは限りません。`<source>`
要素では、ユーザーのブラウザが任意の形式をサポートしていない場合の代替手段として、複数の形式を指定できます。次に例を示します。


次に例を示します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external }

ブラウザは `<source>` タグを解析する際に、オプションの `type` 属性を使用して、どのファイルをダウンロードして再生するかを判断します。
ブラウザが
`WebM` をサポートしている場合は、chrome.webm を再生し、再生できない場合は MPEG-4
動画を再生できるか確認します。

ウェブ上の動画とオーディオの仕組みについては、[A Digital Media Primer for Geeks](//www.xiph.org/video/vid1.shtml)
をご覧ください。

このアプローチは、特にモバイル端末でさまざまな HTML やサーバー側スクリプトを配信する場合に、次のようなメリットがあります。


* デベロッパーが優先度順に形式をリストアップできます。
* ネイティブ クライアント側で切り替えることで、コンテンツを取得する際にリクエストが 1 つだけ生成されるため、待ち時間が短縮されます。
* ユーザー エージェントの検出機能を備えたサーバー側のデータベースを使用するよりも、ブラウザ側で形式を選択する方が簡単で時間がかからず、信頼性も高くなる場合があります。
* 各ファイルのソースタイプを指定すると、ネットワークのパフォーマンスが向上します。これは、ブラウザ側で動画の一部をダウンロードして形式を調べなくても、動画ソースを選択できるようになるためです。


上記のポイントはすべて、帯域幅と待ち時間が重要視され、ユーザーがすばやい反応を望むモバイル コンテキストにおいて特に重要になります。また、type 属性を指定しないと、非対応のタイプのソースが複数存在する場合に、パフォーマンスが低下するおそれがあります。




モバイル ブラウザ用のデベロッパー ツールを使用して、[type 属性がある場合](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html){: target="_blank" .external }と [type 属性がない場合](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html){: target="_blank" .external }のネットワーク アクティビティを比較してください。

また、ブラウザ デベロッパー ツールでレスポンス ヘッダーをチェックし、[サーバーが適切な MIME タイプを報告することを確認してください](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)。そうしないと、動画のソースタイプのチェックが機能しません。



###  開始と終了の時間を指定する

帯域幅を節約して、よりレスポンシブなサイトを構築するためには、Media
Fragments API を使用して video 要素に開始時間と終了時間を追加します。

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>お使いのブラウザは video 要素をサポートしていません。</p>
</video>

メディア フラグメントを追加するには、メディアの URL に `#t=[start_time][,end_time]` を追加するだけです。
たとえば、5～10 秒間だけ動画を再生するには、次のように指定します。



    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

また、Media Fragments API
を使用すると、DVD のキューポイントのように、同じ動画で複数のビューを配信できます。その際、複数のファイルをエンコードして配信する必要はありません。



Warning: iOS 以外のほとんどのプラットフォームは、Media Fragments API をサポートしています。また、お使いのサーバーで Range リクエストがサポートされていることを確認してください。ほとんどのサーバーでは Range リクエストがデフォルトで有効になっていますが、一部のホスティング サービスでは無効になっている場合があります。

ブラウザ デベロッパー ツールを使用して、レスポンス ヘッダーの `Accept-Ranges: bytes` を確認します。


<img class="center" alt="Chrome DevTools のスクリーンショット: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

###  ポスター画像を含める

`video`
要素に poster 属性を追加しておくと、ユーザーは動画をダウンロードまたは再生しなくても、要素が読み込まれた時点で動画の内容を把握できます。



    <video poster="poster.jpg" ...>
      ...
    </video>
    

ポスターは、動画の `src` が破損していたり、提供されたすべての動画形式に非対応の場合の代替手段にもなります。ポスター画像の唯一のデメリットは、追加のファイル リクエストによって帯域幅を消費し、レンダリングが必要になることです。詳しくは、[画像の最適化](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) をご覧ください。

以下は、ポスター画像がある場合とない場合の比較です。動画ではないことを示すために、グレースケールのポスター画像を作成しました。

<div class="attempt-left">
  <figure>
    <img alt="Android Chrome のスクリーンショット、縦向き、ポスターなし" src="images/Chrome-Android-video-no-poster.png">
    <figcaption>
      Android Chrome のスクリーンショット、縦向き、ポスターなし
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android Chrome のスクリーンショット、縦向き、ポスターあり" src="images/Chrome-Android-video-poster.png">
    <figcaption>
      Android Chrome のスクリーンショット、縦向き、ポスターあり
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


##  従来のプラットフォーム向けに代替手段を用意する 

すべてのプラットフォームですべての動画形式がサポートされているわけではありません。主要なプラットフォームでサポートされている動画形式を確認し、各プラットフォームで動画が再生されるようにしてください。




###  サポートされている形式を確認する{: #check-formats }

サポートされている動画形式を調べるには、`canPlayType()` を使用します。このメソッドは、`mime-type`
とオプションのコーデックで構成される文字列を引数に取り、次のいずれかの値を返します。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">戻り値と説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Return value">（空の文字列）</td>
      <td data-th="Description">コンテナまたはコーデック、あるいはその両方がサポートされていません。</td>
    </tr>
    <tr>
      <td data-th="Return value"><code>maybe</code></td>
      <td data-th="Description">
        コンテナおよびコーデックはサポートされている可能性がありますが、ブラウザで動画の一部をダウンロードして確認する必要があります。</td>


    </tr>
    <tr>
      <td data-th="Return value"><code>probably</code></td>
      <td data-th="Description">この形式はサポートされています。</td>

    </tr>
  </tbody>
</table>

Chrome で実行する場合の `canPlayType()` の引数と戻り値の例は次のとおりです。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">タイプとレスポンス</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type"><code>video/xyz</code></td>
      <td data-th="Response">（空の文字列）</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response">（空の文字列）</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Response">（空の文字列）</td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm</code></td>
      <td data-th="Response"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Type"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Response"><code>probably</code></td>
    </tr>
  </tbody>
</table>


###  複数の形式で動画を生成する

同じ動画を異なる形式で保存できるツールは数多くあります。

* デスクトップ ツール: [FFmpeg](//ffmpeg.org/)
* GUI アプリケーション: [Miro](http://www.mirovideoconverter.com/)、[HandBrake](//handbrake.fr/)、[VLC](//www.videolan.org/)
* オンライン エンコーディング / トランスコーディング サービス: [Zencoder](//en.wikipedia.org/wiki/Zencoder)、[Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)



###  使用されている形式を確認する

ブラウザで実際に選択されている動画形式を確認したい場合があります。

JavaScript では、動画の `currentSrc` プロパティを使用して、使用されているソースを取得できます。



##  動画を適正なサイズにする 

ファイルサイズは、ユーザーの満足度に大きく影響します。


### TL;DR {: .hide-from-toc }
- プラットフォームで処理できないようなフレームサイズの大きい動画や、高品質の動画の提供は控えてください。
- 動画は必要以上に長くするべきではありません。
- 長い動画のダウンロードや検出処理は、途中で止まることがあります。そのため、ブラウザによっては、再生を開始する前のダウンロードに長時間を要する場合があります。


###  動画サイズを確認する

エンコードした実際の動画フレームサイズは、動画要素のサイズとは異なる場合があります（実際のサイズでは画像が適正に表示されないこともあります）。



動画のエンコードサイズを確認するには、動画要素のプロパティである `videoWidth`
と`videoHeight`
を使用します。`width` と `height` は動画要素のサイズ（CSS やインラインの幅および高さの属性で指定されたサイズの場合もある）を返します。


###  動画をコンテナに収める

ビューポートに対して動画要素が大きすぎるとコンテナからはみ出してしまい、ユーザーがコンテンツを見たり、操作ができなくなることがあります。



<div class="attempt-left">
  <figure>
    <img alt="Android Chrome のスクリーンショット、縦向き: スタイルが設定されておらずビューポートからはみ出している動画要素" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>
      Android Chrome のスクリーンショット、縦向き: スタイルが設定されておらずビューポートからはみ出している動画要素
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="Android Chrome のスクリーンショット、横向き: スタイルが設定されておらずビューポートからはみ出している動画要素" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>
      Android Chrome のスクリーンショット、横向き: スタイルが設定されておらずビューポートからはみ出している動画要素
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

JavaScript や CSS を使用して動画のサイズを制御できます。JavaScript ライブラリや
[FitVids](http://fitvidsjs.com/)
などのプラグインを使用すると、YouTube やその他のソースの Flash 動画であっても、適切なサイズとアスペクト比を保持することができます。


ビューポートのサイズに応じて要素のサイズを指定するには、[CSS メディアクエリ](/web/fundamentals/design-and-ux/responsive/#css-media-queries)で `max-width: 100%` を使うと便利です。

iframe 内のメディアコンテンツ（YouTube 動画など）には、レスポンシブ アプローチ（[John Surdakowski が提案している手法など](http://avexdesigns.com/responsive-youtube-embed/)）を試してみてください。



Warning: 要素のサイズ設定で、元の動画と異なるアスペクト比を使用しないでください。動画を縮めたり引き延ばしたりすると表示が崩れます。

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }

[レスポンシブなバージョン](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html){: target="_blank" .external }
と[レスポンシブではないバージョン](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html){: target="_blank" .external } を比較してください。


##  動画プレイヤーをカスタマイズする

動画の表示はプラットフォームによって異なります。モバイル ソリューションではデバイスの向きを考慮する必要があります。
Fullscreen API を使用すると、動画コンテンツのフルスクリーン表示を制御できます。



###  さまざまなデバイスでのデバイスの向きの影響

デバイスの向きはデスクトップ モニターやノートパソコンでは問題になりませんが、スマートフォンやタブレット用のウェブページのデザインを検討する際は非常に重要になります。


iPhone の Safari は、縦向きと横向きでの切り替えが非常にスムーズです。


<div class="attempt-left">
  <figure>
    <img  alt="iPhone の Safari で再生している動画のスクリーンショット（縦向き）" src="images/iPhone-video-playing-portrait.png">
    <figcaption>iPhone の Safari で再生している動画のスクリーンショット（縦向き）</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img alt="iPhone の Safari で再生している動画のスクリーンショット（横向き）" src="images/iPhone-video-playing-landscape.png">
    <figcaption>iPhone の Safari で再生している動画のスクリーンショット（横向き）</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

iPad や Android の Chrome では、デバイスの向きが問題になることがあります。たとえば、横向きの iPad での動画の再生をカスタマイズしないと、次のように表示されます。



<img alt="iPad Retina の Safari で再生している動画のスクリーンショット、横向き"
src="images/iPad-Retina-landscape-video-playing.png">

CSS で動画を `width: 100%` または `max-width: 100%` と設定すると、デバイスの向きによるレイアウトの問題の多くは解決できます。
また、フルスクリーンの代替手段も検討した方がよい場合があります。


##  インラインまたはフルスクリーン表示

<img class="attempt-right" alt="iPhone の video 要素のスクリーンショット、縦向き" src="images/iPhone-video-with-poster.png">

動画の表示はプラットフォームによって異なります。iPhone の Safari では、video 要素をウェブページ内で表示しますが、再生するときはフルスクリーン モードになります。


<div style="clear:both;"></div>

<img class="attempt-right" alt="Android の Chrome で再生している動画のスクリーンショット、縦向き" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Android では、フルスクリーン アイコンをクリックすることでフルスクリーン モードをリクエストできますが、
デフォルトではインラインで動画を再生します。

<div style="clear:both;"></div>

<img class="attempt-right" alt="iPad Retina の Safari で再生している動画のスクリーンショット、横向き" src="images/iPad-Retina-landscape-video-playing.png">

iPad の Safari では動画をインラインで再生します。

<div style="clear:both;"></div>

###  コンテンツのフルスクリーン表示の制御

フルスクリーンでの動画の再生を強制できないプラットフォーム用に、Fullscreen API が[幅広くサポート](http://caniuse.com/#feat=fullscreen)されています。
この API を使用すると、コンテンツまたはページのフルスクリーン表示を制御できます。


video のように要素をフルスクリーン表示する方法は、次のとおりです。

    elem.requestFullScreen();
    

ドキュメント全体をフルスクリーン表示する方法は、次のとおりです。

    document.body.requestFullScreen();
    

フルスクリーン状態の変更をリッスンすることもできます。

    video.addEventListener("fullscreenchange", handler);
    

要素が現在フルスクリーン モードかどうかを確認することもできます。

    console.log("In full screen mode: ", video.displayingFullscreen);
    

また、CSS で `:fullscreen` 疑似クラスを使用して、フルスクリーン モードでの要素の表示方法を変更することもできます。


<video autoplay muted loop class="attempt-right">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
  <p>お使いのブラウザは video 要素をサポートしていません。</p>
</video>

Fullscreen API をサポートしているデバイスでは、動画のプレースホルダとしてサムネイル画像を使用することを検討してください。


実際の動作を確認するには、こちらの[デモ](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html){: target="_blank" .external }をご覧ください。

試験運用: `requestFullScreen()` はベンダーのプレフィックス付きであり、クロスブラウザの互換性を完全にサポートするには追加のコードが必要です。

<div style="clear:both;"></div>




##  ユーザー補助機能について

アクセシビリティは機能ではありません。目や耳が不自由な方は、字幕や説明なしでは動画を楽しむことができません。動画にキャプションや説明を追加する手間を惜しまず、ユーザーにとっての利便性を重視してください。すべてのユーザーが最低限の情報を利用できるようにしましょう。


###  字幕を追加して利用しやすくする

<img class="attempt-right" alt="Android の Chrome で track 要素を使用して表示された字幕を示すスクリーンショット" src="images/Chrome-Android-track-landscape-5x3.jpg">

モバイル端末でメディアを利用しやすくするには、track 要素を使用して字幕または説明を表示します。


<div style="clear:both;"></div>

###  track 要素を追加する

track 要素を video 要素の子として追加するだけで、動画に簡単に字幕を追加できます。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/track.html){: target="_blank" .external }

track 要素の `src` 属性では、トラック ファイルの場所を指定します。

##  トラック ファイルで字幕を定義する

トラック ファイルは WebVTT 形式で、時間を指定した「キュー」で構成されます。

    WEBVTT

    00:00.000 --> 00:04.000
    Man sitting on a tree branch, using a laptop.

    00:05.000 --> 00:08.000
    The branch breaks, and he starts to fall.

    ...

試験運用: track 要素は、Firefox を除き、Chrome for Android、iOS Safari、および現在デスクトップで使用されているすべてのブラウザでサポートされています（[caniuse.com/track](http://caniuse.com/track) をご覧ください）。polyfill も使用できます。また、[Captionator](http://captionatorjs.com/){: .external } を利用することを推奨します。




##  クィック リファレンス

###  video 要素の属性

video 要素のすべての属性と定義の一覧については、[video 要素の仕様](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element)を参照してください。


<table>
  <thead>
    <tr>
      <th>属性</th>
      <th>使用可能な環境</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribute"><code>src</code></td>
      <td data-th="Availability">すべてのブラウザ</td>
      <td data-th="Description">動画のアドレス（URL）。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>poster</code></td>
      <td data-th="Availability">すべてのブラウザ</td>
      <td data-th="Description">動画コンテンツをダウンロードすることなく、video 要素が表示されるとすぐにブラウザに表示できる画像ファイルのアドレス（URL）。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>preload</code></td>
      <td data-th="Availability">preload は、すべてのモバイル端末で無視されます。</td>
      <td data-th="Description">再生前にメタデータ（または動画）をあらかじめ読み込むべきであることをブラウザに通知します。オプションは、none、metadata、auto です（詳細は<a href="#preload">プリロード</a>のセクションを参照してください）。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>autoplay</code></td>
      <td data-th="Availability">未対応: iPhone、Android。対応: すべてのデスクトップ ブラウザ、iPad、Firefox、Android 用 Opera。</td>
      <td data-th="Description">できるだけ早くダウンロードして再生を開始します（詳細は、<a href="#autoplay">自動再生</a>のセクションを参照してください）。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>loop</code></td>
      <td data-th="Availability">すべてのブラウザ</td>
      <td data-th="Description">動画をループ再生します。</td>
    </tr>
    <tr>
      <td data-th="Attribute"><code>controls</code></td>
      <td data-th="Availability">すべてのブラウザ</td>
      <td data-th="Description">デフォルトの動画コントロール（再生、一時停止など）を表示します。</td>
    </tr>
  </tbody>
</table>

###  自動再生{: #autoplay }

デスクトップでは、`autoplay`を指定することで、動画をすぐにダウンロードして再生するようにブラウザに通知します。iOS および Chrome for Android では `autoplay` が機能しないため、ユーザーは動画を再生するために画面をタップする必要があります。

自動再生が可能なプラットフォームでも、以下の点を踏まえて、この機能を有効にするべきか検討してください。


* データ使用のコストは高くなる場合があります。
* 自動でダウンロードや再生を開始すると、帯域幅や CPU が予想以上に占有され、ページのレンダリングが遅くなるおそれがあります。
* ユーザーが動画や音声の再生を煩わしく感じる可能性もあります。

[WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)) を使用すると、Android WebView で自動再生動作を設定できます。デフォルトでは true に設定されていますが、WebView アプリで無効に設定できます。



###  プリロード{: #preload }

`preload` 属性によって、プリロードする情報やコンテンツの量をブラウザに通知することができます。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">値 &amp; 説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Value"><code>none</code></td>
      <td data-th="Description">ユーザーが動画を見ない可能性もあるため、何もプリロードしません。</td>
    </tr>
    <tr>
      <td data-th="Value"><code>metadata</code></td>
      <td data-th="Description">最小限の動画のメタデータ（時間、サイズ、テキスト トラック）をプリロードします。</td>
    </tr>
    <tr>
      <td data-th="Value"><code>auto</code></td>
      <td data-th="Description">すぐに動画全体をダウンロードします。</td>
    </tr>
  </tbody>
</table>

`preload` 属性の効果は、プラットフォームごとに異なります。たとえば Chrome の場合、デスクトップでは動画の 25 秒間分をバッファ処理しますが、iOS や Android ではまったくバッファ処理を行いません。つまり、モバイル端末では再生開始まで時間がかかる場合がありますが、デスクトップではすぐに再生されるということです。詳細は、[Steve Souders のテストページ](//stevesouders.com/tests/mediaevents.php)をご覧ください。


### JavaScript

[HTML5 Rocks Video の記事](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)には、動画再生を制御するために使用可能な JavaScript
プロパティ、メソッド、イベントの概要がわかりやすくまとめられています。
この記事のコンテンツをもとに、必要に応じてモバイル固有の内容を含めた情報をこちらページに掲載しています。


####  プロパティ

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">プロパティ &amp; 説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>currentTime</code></td>
      <td data-th="Description">再生ポジションを秒単位で取得または設定します。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>volume</code></td>
      <td data-th="Description">動画の現在の音量を取得または設定します。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>muted</code></td>
      <td data-th="Description">音量ミュートの状態を取得または設定します。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>playbackRate</code></td>
      <td data-th="Description">倍速再生の乗数を取得または設定します。通常の再生速度が 1 になります。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>buffered</code></td>
      <td data-th="Description">バッファ済みで再生可能な動画時間の情報です。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>currentSrc</code></td>
      <td data-th="Description">再生中の動画のアドレスです。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoWidth</code></td>
      <td data-th="Description">ピクセル単位の動画の幅（video 要素の幅と差がある場合もあります）。</td>
    </tr>
    <tr>
      <td data-th="Property"><code>videoHeight</code></td>
      <td data-th="Description">ピクセル単位の動画の高さ（video 要素の高さと差がある場合もあります）</td>
    </tr>
  </tbody>
</table>

`playbackRate`（[デモを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }）も `volume` も、モバイル端末ではサポートされていません。

####  メソッド

<table class="responsive">
  <thead>
    <tr>
    <th colspan="2">メソッド &amp; 説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Method"><code>load()</code></td>
      <td data-th="Description">JavaScript で動画ソースが変更されたときなどに、再生を開始することなく動画ソースの読み込み、または再読み込みを行います。</td>
    </tr>
    <tr>
      <td data-th="Method"><code>play()</code></td>
      <td data-th="Description">現在の位置から動画を再生します。</td>
    </tr>
    <tr>
      <td data-th="Method"><code>pause()</code></td>
      <td data-th="Description">現在の位置で動画を一時停止します。</td>
    </tr>
    <tr>
      <td data-th="Method"><code>canPlayType('format')</code></td>
      <td data-th="Description">サポートされている形式をチェックします（<a href="#check-formats">サポートされている形式を確認する</a>の説明を参照）。</td>
    </tr>
  </tbody>
</table>

モバイル端末（Android
用 Opera
を除く）では、`play()` と `pause()` は、ボタンクリックなどのユーザー操作に対するレスポンスとして呼び出された場合にのみ機能します。[デモ](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html){: target="_blank" .external }をご覧ください。（同様に、埋め込まれた
YouTube 動画などのコンテンツの再生も開始できません。）


####  イベント

以下は、発行される可能性のあるメディア イベントの一部です。すべてのイベントを含む一覧については、Mozilla Developer Network
の[メディア イベント](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)のページを参照してください。


<table class="responsive">
  <thead>
  <tr>
    <th colspan="2">イベント &amp; 説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Event"><code>canplaythrough</code></td>
      <td data-th="Description">動画を中断せずに最後まで再生できるとブラウザが判断するだけの十分なデータが準備できたときに発行されます。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>ended</code></td>
      <td data-th="Description">動画の再生が完了すると発行されます。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>error</code></td>
      <td data-th="Description">エラーが発生した場合に発行されます。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>playing</code></td>
      <td data-th="Description">初めて動画の再生を開始したとき、一時停止したあと、再び再生を開始したときに発行されます。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>progress</code></td>
      <td data-th="Description">ダウンロードの進捗を示すために定期的に発行されます。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>waiting</code></td>
      <td data-th="Description">別の処理の完了待ちで、処理が遅延しているときに発行されます。</td>
    </tr>
    <tr>
      <td data-th="Event"><code>loadedmetadata</code></td>
      <td data-th="Description">ブラウザでメタデータ（時間、サイズ、テキスト トラック）の読み込みが完了すると発行されます。</td>
    </tr>
  </tbody>
</table>




{# wf_devsite_translation #}
