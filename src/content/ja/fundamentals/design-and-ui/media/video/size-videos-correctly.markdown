---
title: "動画のサイズを正しく設定する"
description: "ユーザーに楽しんでいただくためには、サイズの設定が重要です。"
updated_on: 2014-09-19
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
related-guides:
  media:
  -
      title: "CSS メディア クエリを使用してレスポンシブにする"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: " レスポンシブ ウェブデザインの基本"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  ユーザーに楽しんでいただくためには、サイズの設定が重要です。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


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

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

{% link_sample _code/responsive_embed.html %}レスポンシブなサンプル{% endlink_sample %}と{% link_sample _code/unyt.html %}レスポンシブではないサンプル{% endlink_sample %}を比較してみましょう。




