---
title: "クイック リファレンス"
description: "動画要素のプロパティの概要を説明します。"
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
  動画要素のプロパティの概要を説明します。
</p>

{% include shared/toc.liquid %}


## 動画要素の属性

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

### 自動再生

デスクトップでは、autoplay によって、すぐに動画をダウンロードしてできるだけ早く再生するようブラウザに指示することができます。iOS および Chrome for Android では、autoplay は機能しません。動画を再生するには画面をタップする必要があります。

autoplay を使用できるプラットフォームでも、有効にすべきかどうかを検討する必要があります。

* データの使用量が増えてコストがかかる場合があります。
* ユーザーに確認せずにいきなりダウンロードと再生を開始すると、予想以上に帯域幅と CPU を独占し、ページのレンダリングに時間がかかる場合があります。
* ユーザーにとって動画や音声の再生が好ましくない状況である可能性があります。

自動再生の動作は、Android WebView で [WebSettings API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean))を使用して設定できます。
デフォルトでは true になっていますが、WebView アプリで無効にすることができます。

### 事前読み込み

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

## JavaScript

[HTML5 Rocks Video の記事](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript)に、動画の再生を制御するための JavaScript のプロパティ、メソッド、イベントがわかりやすくまとめられています。その内容をここに転載し、関連するモバイル固有の懸念事項について更新しました。

### プロパティ

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

playbackRate（{% link_sample _code/scripted.html %}デモをご覧ください{% endlink_sample %}）と volume は、携帯端末ではサポートされていません。

### メソッド

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
機能しません。{% link_sample _code/scripted.html %}デモ{% endlink_sample %}をご覧ください（同様に、埋め込みの YouTube 動画など、コンテンツの再生を開始することはできません）。

### イベント

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



