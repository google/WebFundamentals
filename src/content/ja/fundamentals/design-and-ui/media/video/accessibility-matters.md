project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 利用しやすさは機能ではありません。

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# 利用しやすさに関する問題 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



利用しやすさは機能ではありません。目や耳が不自由な方は、キャプションや説明なしでは動画を楽しむことができません。ユーザーに不便な思いをさせることを思えば、動画にキャプションや説明を追加するのはたいした手間ではありません。すべてのユーザーが最低限の情報を利用できるようにしましょう。




## キャプションを含めて利用しやすさを改善する

携帯端末でメディアを利用しやすくするには、トラック要素を使用してキャプションまたは説明を表示します。

<!-- TODO: Verify note type! -->
Note: トラック要素は、Firefox を除き、Chrome for Android、iOS Safari、および現在デスクトップで使用されているすべてのブラウザでサポートされています（<a href='http://caniuse.com/track' title='トラック要素のサポート状況'>caniuse.com/track</a> をご覧ください）。polyfill も使用できます。Google では、<a href='//www.delphiki.com/html5/playr/' title='Playr トラック要素の polyfill'>Playr</a> または <a href='//captionatorjs.com/' title='Captionator トラック'>Captionator</a> をおすすめします。

トラック要素を使用すると、次のようにキャプションが表示されます。

 <img class="center" alt="Android の Chrome でトラック要素を使用して表示されているキャプションを示すスクリーンショット" src="images/Chrome-Android-track-landscape-5x3.jpg">

## トラック要素を追加する

動画にキャプションを追加するのは非常に簡単です。動画要素の子としてトラック要素を追加するだけです。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

トラック要素の src 属性では、トラック ファイルの場所を指定します。

## トラック ファイルでキャプションを定義する

トラック ファイルは WebVTT 形式で、時間を指定した「キュー」で構成されます。

    WEBVTT

    00:00.000 --> 00:04.000
    木の枝の上に座った男性がノートパソコンを使っています。

    00:05.000 --> 00:08.000
    枝が折れて男性は落下してしまいます。

    ...



