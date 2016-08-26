project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ユーザーに楽しんでいただくためには、サイズの設定が重要です。

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# 動画のサイズを正しく設定する {: .page-title }

{% include "_shared/contributors/TODO.html" %}



ユーザーに楽しんでいただくためには、サイズの設定が重要です。


## TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''



## 動画のサイズを確認する

エンコードされた動画の実際のフレームサイズは、動画要素のサイズによって異なる場合があります（画像を実際のサイズでは表示できない場合があるため）。

エンコードされた動画のサイズを確認するには、動画要素の videoWidth と videoHeight プロパティを使用します。width と height は、動画要素のサイズを返します。この値は、CSS またはインラインの width と height 属性を使用してサイズが設定されている場合があります。

## 動画がコンテナからはみ出さないようにする

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




