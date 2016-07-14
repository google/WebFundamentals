---
title: "レガシー プラットフォーム用の代替手段を提供する"
description: "すべてのプラットフォームですべての動画形式がサポートされているわけではありません。"
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
  すべてのプラットフォームですべての動画形式がサポートされているわけではありません。主要なプラットフォームでサポートされている動画形式を確認し、各プラットフォームで動画を再生できるようにしましょう。主要なプラットフォームでサポートされている動画形式を確認し、各プラットフォームで動画を再生できるようにしましょう。
</p>

{% include shared/toc.liquid %}


## サポートされている形式を確認する

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


## 複数の形式で動画を生成する

同じ動画を異なる形式で保存できるツールは数多くあります。

* デスクトップ ツール: [FFmpeg](//ffmpeg.org/)
* GUI アプリケーション: [Miro](//www.mirovideoconverter.com/)、[HandBrake](//handbrake.fr/)、[VLC](//www.videolan.org/)
* オンライン エンコーディング / トランスコーディング サービス: [Zencoder](//en.wikipedia.org/wiki/Zencoder)、[Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

## 使用されている形式を確認する

ブラウザで実際に選択されている動画形式を確認したい場合があります。

JavaScript では、動画の currentSrc プロパティを使用して、使用されているソースを取得できます。

実際の動作を確認するには、{% link_sample _code/video-main.html %}こちらのデモ{% endlink_sample %}をご覧ください。Chrome と Firefox は chrome.webm を選択し（ブラウザがサポートしているソースのリストで先頭に指定されているため）、Safari は「chrome.mp4」を選択しています。



