project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現する方法について説明します。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 動画 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



ユーザーは動画を好みます。面白く、ためになるからです。携帯端末では、動画の方が情報を理解しやすい場合があります。しかし動画は帯域幅を必要とするため、すべてのプラットフォームで常に同じように視聴できるとは限りません。動画の読み込みで待たされたり、[再生] を押して何も起こらなかったりすると、ユーザーは不快に感じます。動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現する方法をご確認ください。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## 動画を追加する 




動画をサイトに追加して、どのデバイスでも最高のユーザー エクスペリエンスを実現する方法について説明します。



### TL;DR {: .hide-from-toc }
- 動画要素を使用して、サイトで動画の読み込み、デコード、再生を行う。
- 多様なモバイル プラットフォームに対応できるように複数の形式で動画を生成する。
- 動画がコンテナからはみ出さないように動画のサイズを正しく設定する。
- 動画要素の子としてトラック要素を追加し、利用しやすさの問題に対応する。


### 動画要素を追加する

サイトで動画の読み込み、デコード、再生を行うための動画要素を追加します。

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>このブラウザは、動画要素をサポートしていません。</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>お使いのブラウザは、動画要素をサポートしていません。</p>
    </video>
    

### 複数のファイル形式を指定する

すべてのブラウザが同じ動画形式をサポートしているとは限りません。
<source> 要素では、ユーザーのブラウザがいずれかの形式をサポートしていない場合の代替として、複数の形式を指定することができます。
次に例を示します。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/video-main.html" region_tag="sourcetypes" %}
</pre>

ブラウザは <source> タグを解析する際に、オプションの type 属性を使用して、どのファイルをダウンロードして再生するかを判断します。ブラウザが WebM をサポートしている場合は chrome.webm を再生し、サポートしていない場合は MPEG-4 動画を再生できます。
ウェブで動画と音声を使用する方法については、<a href='//www.xiph.org/video/vid1.shtml' title='デジタル動画に関する、楽しくてためになる解説動画'>A Digital Media Primer for Geeks</a>（英語）をご覧ください。

このアプローチは、特に携帯端末でさまざまな HTML やサーバー側スクリプトを配信する場合に、次のようなメリットがあります。

* デベロッパーが優先順位に基づいて形式を指定できます。
* ネイティブ クライアント側で切り替えることで、コンテンツを取得する際にリクエストが 1 つだけ生成されるため待ち時間が短縮されます。
* サーバー側でユーザー エージェントの検出機能とサポート データベースを使用するよりも、ブラウザで形式を選択する方がより簡単かつ迅速で、信頼性が高くなる場合があります。
* ファイルごとにソースのタイプを指定するとネットワークのパフォーマンスが向上します。ブラウザが動画の一部をダウンロードして形式を識別しなくても、動画のソースを選択できるためです。

ここに挙げたポイントはすべて、帯域幅と待ち時間が重視され、ユーザーの忍耐に限界があるモバイル コンテキストでは特に重要です。
type 属性を指定しないと、複数のソースの中にサポートされていないタイプが存在する場合に、パフォーマンスに影響する可能性があります。

モバイル ブラウザ デベロッパー ツールを使用して、<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">type 属性がある場合</a>と <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/notype.html">type 属性がない場合</a>でネットワークのアクティビティを比較してください。
また、ブラウザ デベロッパー ツールでレスポンス ハンドラを確認し、[サーバーが適切な MIME タイプを報告することを確認してください](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types)。そうしないと、動画のソースタイプのチェックが機能しません。

### 開始時刻と終了時刻を指定する

帯域幅を節約し、レスポンシブなサイトを構築しましょう。それには、Media Fragments API を使用して、動画要素に開始時間と終了時間を追加します。

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>このブラウザは、動画要素をサポートしていません。</p>
</video>

メディア フラグメントを追加するには、メディアの URL に #t=[start_time][,end_time] を追加するだけです。たとえば、5～10 秒の間だけ動画を再生するには、次のように指定します。


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

また、Media Fragments API を使用すると、DVD のキューポイントのように同じ動画の複数のビューを配信することができ、複数のファイルをエンコードして配信する必要はありません。

<!-- TODO: Verify note type! -->
Note: - Media Fragments API は、ほとんどのプラットフォームでサポートされていますが、iOS ではサポートされていません。
- お使いのサーバーで Range リクエストがサポートされていることを確認してください。ほとんどのサーバーで Range リクエストはデフォルトで有効になっていますが、一部のホスティング サーバーでは無効になっている場合があります。


ブラウザ デベロッパー ツールを使用して、レスポンス ヘッダーの Accept-Ranges: bytes を確認します。

<img class="center" alt="Chrome デベロッパー ツールのスクリーンショット: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### ポスター画像を含める

動画要素に poster 属性を追加しておくと、要素が読み込まれたときにユーザーがその内容をすぐに把握できるため、動画をダウンロードして再生する必要がなくなります。


    <video poster="poster.jpg" ...>
      ...
    </video>
    

ポスターは、動画の src が破損していたり、指定した動画形式がすべてサポートされていない場合の代替手段にもなります。ポスター画像の唯一のデメリットは、追加のファイル リクエストによって帯域幅を消費し、レンダリングが必要になることです。詳しくは、[画像の最適化](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization)をご覧ください。

次に、ポスター画像がある場合とない場合を並べて比較してみましょう。動画ではないことを証明するため、グレースケールのポスター画像を使用しています。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="縦向きの Android Chrome のスクリーンショット、ポスターなし" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="縦向きの Android Chrome のスクリーンショット、ポスターあり" src="images/Chrome-Android-video-poster.png">
  </div>
</div>


## レガシー プラットフォーム用の代替手段を提供する 




すべてのプラットフォームですべての動画形式がサポートされているわけではありません。主要なプラットフォームでサポートされている動画形式を確認し、各プラットフォームで動画を再生できるようにしましょう。主要なプラットフォームでサポートされている動画形式を確認し、各プラットフォームで動画を再生できるようにしましょう。



### サポートされている形式を確認する

サポートされている動画形式を検出するには、canPlayType() を使用します。このメソッドは、mime-type とオプションのコーデックで構成された文字列引数を受け取り、次のいずれかの値を返します。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>戻り値</th>
    <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="戻り値">（空の文字列）</td>
      <td data-th="説明">コンテナまたはコーデック、あるいはその両方がサポートされていません。</td>
    </tr>
    <tr>
      <td data-th="戻り値"><code>maybe</code></td>
    <td data-th="説明">
        コンテナおよびコーデックはサポートされている可能性がありますが、ブラウザで
        動画の一部をダウンロードして確認する必要があります。
      </td>
    </tr>
    <tr>
      <td data-th="戻り値"><code>probably</code></td>
      <td data-th="説明">この形式はサポートされています。
      </td>
    </tr>
  </tbody>
</table>

Chrome で実行する場合の canPlayType() の引数と戻り値の例は次のとおりです。


<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>タイプ</th>
      <th>レスポンス</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="タイプ"><code>video/xyz</code></td>
      <td data-th="レスポンス">（空の文字列）</td>
    </tr>
    <tr>
      <td data-th="タイプ"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="レスポンス">（空の文字列）</td>
    </tr>
    <tr>
      <td data-th="タイプ"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="レスポンス">（空の文字列）</td>
    </tr>
    <tr>
      <td data-th="タイプ"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="レスポンス"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="タイプ"><code>video/webm</code></td>
      <td data-th="レスポンス"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="タイプ"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="レスポンス"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### 複数の形式で動画を生成する

同じ動画を異なる形式で保存できるツールは数多くあります。

* デスクトップ ツール: [FFmpeg](//ffmpeg.org/)
* GUI アプリケーション: [Miro](//www.mirovideoconverter.com/)、[HandBrake](//handbrake.fr/)、[VLC](//www.videolan.org/)
* オンライン エンコーディング / トランスコーディング サービス: [Zencoder](//en.wikipedia.org/wiki/Zencoder)、[Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### 使用されている形式を確認する

ブラウザで実際に選択されている動画形式を確認したい場合があります。

JavaScript では、動画の currentSrc プロパティを使用して、使用されているソースを取得できます。

実際の動作を確認するには、<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">こちらのデモ</a>をご覧ください。Chrome と Firefox は chrome.webm を選択し（ブラウザがサポートしているソースのリストで先頭に指定されているため）、Safari は「chrome.mp4」を選択しています。


## 動画のサイズを正しく設定する 




ユーザーに楽しんでいただくためには、サイズの設定が重要です。


### TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''



### 動画のサイズを確認する

エンコードされた動画の実際のフレームサイズは、動画要素のサイズによって異なる場合があります（画像を実際のサイズでは表示できない場合があるため）。

エンコードされた動画のサイズを確認するには、動画要素の videoWidth と videoHeight プロパティを使用します。width と height は、動画要素のサイズを返します。この値は、CSS またはインラインの width と height 属性を使用してサイズが設定されている場合があります。

### 動画がコンテナからはみ出さないようにする

動画要素がビューポートよりも大きすぎると、コンテナからはみ出し、コンテンツを表示できなかったり、
コントロールを使用できない場合があります。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="縦向きの Android Chrome のスクリーンショット。スタイルが未設定の動画要素がビューポートからはみ出している" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="横向きの Android Chrome のスクリーンショット。スタイルが未設定の動画要素がビューポートからはみ出している" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

JavaScript または CSS を使用して動画のサイズを制御できます。[FitVids](//fitvidsjs.com/) などの JavaScript ライブラリとプラグインによって、YouTube やその他のソースから取得した Flash 動画でも、適切なサイズとアスペクト比を維持することができます。

[CSS メディア クエリ](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)を使用して、ビューポートのサイズに応じた要素のサイズを指定できます。max-width: 100% と指定することをおすすめします。

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

フレーム内のメディア コンテンツ（YouTube 動画など）には、レスポンシブな手法をお試しください（[John Surdakowski 氏が提唱している手法など](//avexdesigns.com/responsive-youtube-embed/)）。

<!-- TODO: Verify note type! -->
Note: 要素のサイズ設定で、元の動画と異なるアスペクト比を使用しないでください。画面を縮めたり引き延ばしたりすると、動画の表示が崩れます。

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">レスポンシブなサンプル</a>と<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">レスポンシブではないサンプル</a>を比較してみましょう。


## 動画プレーヤーをカスタマイズする 




動画の表示はプラットフォームによって異なります。モバイル ソリューションではデバイスの向きを考慮する必要があります。Fullscreen API を使用すると、動画コンテンツのフルスクリーン表示を制御できます。



動画の表示はプラットフォームによって異なります。モバイル ソリューションではデバイスの向きを考慮する必要があります。Fullscreen API を使用すると、動画コンテンツのフルスクリーン表示を制御できます。

### さまざまなデバイスでのデバイスの向きの影響

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

### インラインまたはフルスクリーン表示

動画の表示はプラットフォームによって異なります。iPhone の Safari では、動画要素をウェブページ内で表示しますが、再生するときはフルスクリーン モードになります。

<img class="center" alt="縦向きの iPhone に表示された動画要素のスクリーンショット" src="images/iPhone-video-with-poster.png">

Android では、フルスクリーン アイコンをクリックすることでフルスクリーン モードをリクエストできますが、デフォルトではインラインで動画を再生します。

<img class="center" alt="縦向きの Android の Chrome で再生している動画のスクリーンショット" src="images/Chrome-Android-video-playing-portrait-3x5.png">

iPad の Safari では動画をインラインで再生します。

<img class="center" alt="横向きの iPad Retina の Safari で再生している動画のスクリーンショット" src="images/iPad-Retina-landscape-video-playing.png">

### コンテンツのフルスクリーン表示の制御

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


## 利用しやすさに関する問題 




利用しやすさは機能ではありません。目や耳が不自由な方は、キャプションや説明なしでは動画を楽しむことができません。ユーザーに不便な思いをさせることを思えば、動画にキャプションや説明を追加するのはたいした手間ではありません。すべてのユーザーが最低限の情報を利用できるようにしましょう。




### キャプションを含めて利用しやすさを改善する

携帯端末でメディアを利用しやすくするには、トラック要素を使用してキャプションまたは説明を表示します。

<!-- TODO: Verify note type! -->
Note: トラック要素は、Firefox を除き、Chrome for Android、iOS Safari、および現在デスクトップで使用されているすべてのブラウザでサポートされています（<a href='http://caniuse.com/track' title='トラック要素のサポート状況'>caniuse.com/track</a> をご覧ください）。polyfill も使用できます。Google では、<a href='//www.delphiki.com/html5/playr/' title='Playr トラック要素の polyfill'>Playr</a> または <a href='//captionatorjs.com/' title='Captionator トラック'>Captionator</a> をおすすめします。

トラック要素を使用すると、次のようにキャプションが表示されます。

 <img class="center" alt="Android の Chrome でトラック要素を使用して表示されているキャプションを示すスクリーンショット" src="images/Chrome-Android-track-landscape-5x3.jpg">

### トラック要素を追加する

動画にキャプションを追加するのは非常に簡単です。動画要素の子としてトラック要素を追加するだけです。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

トラック要素の src 属性では、トラック ファイルの場所を指定します。

### トラック ファイルでキャプションを定義する

トラック ファイルは WebVTT 形式で、時間を指定した「キュー」で構成されます。

    WEBVTT

    00:00.000 --> 00:04.000
    木の枝の上に座った男性がノートパソコンを使っています。

    00:05.000 --> 00:08.000
    枝が折れて男性は落下してしまいます。

    ...


## クイック リファレンス 




動画要素のプロパティの概要を説明します。



### 動画要素の属性

動画要素の属性の詳細な一覧とその定義については、[動画要素の仕様](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element)をご覧ください。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>属性</th>
      <th>使用可能状況</th>
    <th>説明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="属性"><code>src</code></td>
      <td data-th="使用可能状況">すべてのブラウザ</td>
      <td data-th="説明">動画のアドレス（URL）</td>
    </tr>
    <tr>
      <td data-th="属性"><code>poster</code></td>
      <td data-th="使用可能状況">すべてのブラウザ</td>
      <td data-th="説明">ブラウザが動画要素を表示するときに、動画コンテンツをダウンロードせずにすぐに表示できる画像ファイルのアドレス（URL）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>preload</code></td>
      <td data-th="使用可能状況">すべてのモバイル ブラウザは preload を無視します。</td>
      <td data-th="説明">動画全体を再生する前に、あらかじめ読み込むメタデータ（または動画の一部）についてブラウザに知らせます。オプションは、none、metadata、auto です（詳しくは、「事前読み込み」セクションをご覧ください）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>autoplay</code></td>
      <td data-th="使用可能状況">iPhone または Android ではサポートされていません。すべてのデスクトップ ブラウザ、iPad、Firefox、および Android 用 Opera ではサポートされています。</td>
      <td data-th="Description">できるだけ早くダウンロードを開始して再生します（「自動再生」セクションをご覧ください）。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>loop</code></td>
      <td data-th="使用可能状況">すべてのブラウザ</td>
      <td data-th="説明">動画をリピート再生します。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>controls</code></td>
      <td data-th="使用可能状況">すべてのブラウザ</td>
      <td data-th="説明">デフォルトの動画コントロール（再生、一時停止など）を表示します。</td>
    </tr>
  </tbody>
</table>

#### 自動再生

デスクトップでは、autoplay によって、すぐに動画をダウンロードしてできるだけ早く再生するようブラウザに指示することができます。iOS および Chrome for Android では、autoplay は機能しません。動画を再生するには画面をタップする必要があります。

autoplay を使用できるプラットフォームでも、有効にすべきかどうかを検討する必要があります。

* データの使用量が増えてコストがかかる場合があります。
* ユーザーに確認せずにいきなりダウンロードと再生を開始すると、予想以上に帯域幅と CPU を独占し、ページのレンダリングに時間がかかる場合があります。
* ユーザーにとって動画や音声の再生が好ましくない状況である可能性があります。

自動再生の動作は、Android WebView で [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean))を使用して設定できます。
デフォルトでは true になっていますが、WebView アプリで無効にすることができます。

#### 事前読み込み

preload 属性を使用すると、事前に読み込む情報またはコンテンツの量に関する情報をブラウザに知らせることができます。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>値</th>
    <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="値"><code>none</code></td>
      <td data-th="説明">ユーザーが動画を視聴できない可能性があるため、事前に何も読み込まない。</td>
    </tr>
    <tr>
      <td data-th="値"><code>metadata</code></td>
      <td data-th="説明">メタデータ（長さ、サイズ、テキスト トラック）に加えて、最小限の動画を事前に読み込む必要があります。</td>
    </tr>
    <tr>
      <td data-th="値"><code>auto</code></td>
      <td data-th="説明">すぐに動画全体をダウンロードすることが望ましいと見なされます。</td>
    </tr>
  </tbody>
</table>

preload 属性の効果は、プラットフォームによって異なります。
たとえば、Chrome は 25 秒間の動画をバッファしますが、iOS や Android ではバッファしません。したがって携帯端末では、デスクトップでは起こらない再生開始の遅延が発生する可能性があります。詳しくは、[Steve Souders のテストページ](//stevesouders.com/tests/mediaevents.php)をご覧ください。

### JavaScript

[HTML5 Rocks Video の記事](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)に、動画の再生を制御するための JavaScript のプロパティ、メソッド、イベントがわかりやすくまとめられています。その内容をここに転載し、関連するモバイル固有の懸念事項について更新しました。

#### プロパティ

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>プロパティ</th>
    <th>説明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="プロパティ"><code>currentTime</code></td>
      <td data-th="説明">再生の位置を秒単位で取得または設定します。</td>
    </tr>
    <tr>
      <td data-th="プロパティ"><code>volume</code></td>
      <td data-th="説明">動画の現在の音量を取得または設定します。</td>
    </tr>
    <tr>
      <td data-th="プロパティ"><code>muted</code></td>
      <td data-th="説明">音声のミュートを取得または設定します。</td>
    </tr>
    <tr>
      <td data-th="プロパティ"><code>playbackRate</code></td>
      <td data-th="説明">再生速度を取得または設定します。1 が通常の再生速度です。</td>
    </tr>
    <tr>
      <td data-th="プロパティ"><code>buffered</code></td>
      <td data-th="説明">動画のバッファサイズと再生の準備状況に関する情報（<a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="canvas 要素内の動画のバッファサイズを表示するデモ">デモ</a>をご覧ください）。</td>
    </tr>
    <tr>
      <td data-th="プロパティ"><code>currentSrc</code></td>
      <td data-th="説明">再生中の動画のアドレス。</td>
    </tr>
    <tr>
      <td data-th="プロパティ"><code>videoWidth</code></td>
      <td data-th="説明">ピクセル単位の動画の幅（動画要素の幅と異なる場合があります）。</td>
    </tr>
    <tr>
      <td data-th="プロパティ"><code>videoHeight</code></td>
      <td data-th="説明">ピクセル単位の動画の高さ（動画要素の幅と異なる場合があります）。</td>
    </tr>
  </tbody>
</table>

playbackRate（<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/scripted.html">デモをご覧ください</a>）と volume は、携帯端末ではサポートされていません。

#### メソッド

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>メソッド</th>
    <th>説明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="メソッド"><code>load()</code></td>
      <td data-th="説明">動画のソースの読み込みまたは再読み込みを行いますが、再生は開始しません。たとえば、JavaScript を使用して動画の src が変更された場合に使用します。</td>
    </tr>
    <tr>
      <td data-th="メソッド"><code>play()</code></td>
      <td data-th="説明">現在の位置から動画を再生します。</td>
    </tr>
    <tr>
      <td data-th="メソッド"><code>pause()</code></td>
      <td data-th="説明">現在の位置で動画を一時停止します。</td>
    </tr>
    <tr>
      <td data-th="メソッド"><code>canPlayType('format')</code></td>
      <td data-th="説明">サポートされている形式を検出します（「サポートされている形式を確認する」をご覧ください）。</td>
    </tr>
  </tbody>
</table>

携帯端末では（Android の Opera を除き）、ボタンをクリックするといったユーザーの操作に対するレスポンスとして呼び出されない限り、play() と pause() は
機能しません。<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/scripted.html">デモ</a>をご覧ください（同様に、埋め込みの YouTube 動画など、コンテンツの再生を開始することはできません）。

#### イベント

以下のイベントは、発生する可能性があるメディア イベントの一部です。完全な一覧については、Mozilla Developer Network の[メディア イベント](//developer.mozilla.org/docs/Web/Guide/Events/Media_events)に関するページ（英語）をご覧ください。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>イベント</th>
    <th>説明</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="イベント"><code>canplaythrough</code></td>
      <td data-th="説明">動画を中断せずに完全に再生できるとブラウザが判断するだけの十分なデータが利用可能になったときに発生します。</td>
    </tr>
    <tr>
      <td data-th="イベント"><code>ended</code></td>
      <td data-th="説明">動画の再生が完了したときに発生します。</td>
    </tr>
    <tr>
      <td data-th="イベント"><code>error</code></td>
      <td data-th="説明">エラーが発生したときに発生します。</td>
    </tr>
    <tr>
      <td data-th="イベント"><code>playing</code></td>
      <td data-th="説明">初めて、一時停止後、または再開時に、動画の再生を開始するときに発生します。</td>
    </tr>
    <tr>
      <td data-th="イベント"><code>progress</code></td>
      <td data-th="説明">ダウンロードの進行状況を示すために定期的に発生します。</td>
    </tr>
    <tr>
      <td data-th="イベント"><code>waiting</code></td>
      <td data-th="説明">別の操作の完了待ちのため、操作が遅延しているときに発生します。</td>
    </tr>
    <tr>
      <td data-th="イベント"><code>loadedmetadata</code></td>
      <td data-th="説明">ブラウザが動画のメタデータ（長さ、サイズ、テキスト トラック）の読み込みを完了したときに発生します。</td>
    </tr>
  </tbody>
</table>



