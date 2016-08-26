project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: すべてのプラットフォームですべての動画形式がサポートされているわけではありません。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# レガシー プラットフォーム用の代替手段を提供する {: .page-title }

{% include "_shared/contributors/TODO.html" %}



すべてのプラットフォームですべての動画形式がサポートされているわけではありません。主要なプラットフォームでサポートされている動画形式を確認し、各プラットフォームで動画を再生できるようにしましょう。主要なプラットフォームでサポートされている動画形式を確認し、各プラットフォームで動画を再生できるようにしましょう。



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

実際の動作を確認するには、<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/video-main.html">こちらのデモ</a>をご覧ください。Chrome と Firefox は chrome.webm を選択し（ブラウザがサポートしているソースのリストで先頭に指定されているため）、Safari は「chrome.mp4」を選択しています。



