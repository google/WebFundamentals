---
title: "利用しやすさに関する問題"
description: "利用しやすさは機能ではありません。"
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
  利用しやすさは機能ではありません。目や耳が不自由な方は、キャプションや説明なしでは動画を楽しむことができません。ユーザーに不便な思いをさせることを思えば、動画にキャプションや説明を追加するのはたいした手間ではありません。すべてのユーザーが最低限の情報を利用できるようにしましょう。
</p>

{% include shared/toc.liquid %}



## キャプションを含めて利用しやすさを改善する

携帯端末でメディアを利用しやすくするには、トラック要素を使用してキャプションまたは説明を表示します。

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

トラック要素を使用すると、次のようにキャプションが表示されます。

 <img class="center" alt="Android の Chrome でトラック要素を使用して表示されているキャプションを示すスクリーンショット" src="images/Chrome-Android-track-landscape-5x3.jpg">

## トラック要素を追加する

動画にキャプションを追加するのは非常に簡単です。動画要素の子としてトラック要素を追加するだけです。

{% include_code src=_code/track.html snippet=track lang=html %}

トラック要素の src 属性では、トラック ファイルの場所を指定します。

## トラック ファイルでキャプションを定義する

トラック ファイルは WebVTT 形式で、時間を指定した「キュー」で構成されます。

    WEBVTT

    00:00.000 --> 00:04.000
    木の枝の上に座った男性がノートパソコンを使っています。

    00:05.000 --> 00:08.000
    枝が折れて男性は落下してしまいます。

    ...



