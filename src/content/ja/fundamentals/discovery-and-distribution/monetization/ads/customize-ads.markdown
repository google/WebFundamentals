---
title: "広告をカスタマイズする"
description: "最も効果的な広告によって、ユーザー エクスペリエンスを改善できます。広告のコンテンツそのものは広告主から配信されますが、広告のコンテンツ タイプ、カラー、サイズ、配置を制御することができます。"
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - サイトでユーザーの意図した操作を邪魔するような位置に広告を配置しない。スクロールせずに見える範囲に広告を配置して、重要なコンテンツがスクロールしなければ見えないという状態にはしない。
    - 常にレスポンシブ広告ユニットを使用する。スマートサイズでは不十分な場合、アドバンス モードに切り替える。
    - 広告に気づいてもらえるよう、コンテンツ全体に広告を統合する機会を探す。
    - サイトに融合させる、引き立たせる、コントラストを付けるテキスト スタイルを選択する。
notes:
  targeting:
    - 広告は、キーワードやカテゴリではなく、サイトのコンテンツ全体に基づいてターゲットを設定する。特定のトピックに関連した広告を表示する場合は、トピックに関する文章と段落全体を含めてください。
  testing:
    - 必ずさまざまなデバイスと画面で広告をテストして、レスポンシブな動作が正しく機能していることを確認してください。
  images:
    - 広告主様は、広告の表示方法を完全に制御できます。広告の配置やサイズ設定を使用して、サイトに表示されるディスプレイ広告のタイプに影響を及ぼすことはできますが、画像コンテンツを実際に制御することはできません。
---

<p class="intro">
  最も効果的な広告によって、ユーザー エクスペリエンスを改善できます。広告のコンテンツそのものは広告主から配信されますが、広告のコンテンツ タイプ、カラー、サイズ、配置を制御することができます。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## ユーザーにとって最も有益な位置に広告を配置する

サイトで広告を配置する位置や
表示する広告の数を判断する際は常に、ユーザー第一を心がけてください。

* 広告を使用してサイトのコンテンツを引き立てます。その反対ではありません。
* ページの広告が掲載過多だったり、広告のせいでスクロールしないとコンテンツが表示されなかったり、広告のかたまりが表示可能なスペースを占有していたり、広告に明確なラベルが付けられていないと、ユーザーの満足度の低下につながり、AdSense のポリシーにも違反します。
* 広告でユーザーに価値を提供しましょう。収益が非常に少ないか、クリック数や表示数が少ない広告ユニットは、ユーザーに価値を提供していないと考えてよいでしょう。

モバイル広告の配置オプションのサンプル:

<img src="images/mobile_ads_placement.png" class="center" alt="モバイル イメージ広告のサンプル">

詳しくは、AdSense の
[広告のプレースメントのベスト プラクティス](https://support.google.com/adsense/answer/1282097)をご覧ください。


## レスポンシブなサイズ設定が不十分な場合
場合によっては、レスポンシブ広告を使用するだけではなく、さらに細かく広告の表示方法の制御が必要な場合があります。この場合、アドバンス モードに切り替えて、レスポンシブ広告ユニット コードのスマート サイズを上書きします。
たとえば、[メディア クエリ]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html)を使用して広告のサイズを正確に制御できます。

1. [レスポンシブ広告ユニットの作成]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units)の手順に従います。
2. [広告コード] ボックスで、[モード] プルダウンから [<strong>アドバンス（コード変更が必要）</strong>] を選択します。
3. 広告コードを変更し、ユーザーのデバイスに基づき広告の正確なサイズを設定します。

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  試してみましょう
{% endlink_sample %}

詳しくは、AdSense の[高度な機能](https://support.google.com/adsense/answer/3543893)をご覧ください。

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## サイトを引き立たせるスタイルを選択する

[最も効果的な広告](https://support.google.com/adsense/answer/17957)とは、サイトのスタイルに融合させるかコントラストを付ける広告です。Google AdSense では、一連の[既製広告スタイル](https://support.google.com/adsense/answer/6002585)を提供しています。サイトにぴったり合うスタイルを選択するか、独自のスタイルを作成してください。

### カスタマイズ可能な設定

テキスト広告では、次のいずれかのスタイルをカスタマイズできます。

* 枠線の色
* 背景色
* テキストのフォント ファミリとフォント サイズ
* デフォルトのテキストの色
* 広告タイトル専用のテキストの色
* URL 専用のテキストの色

### スタイルの適用方法

新しいユニットを作成するときは、[<strong>テキスト広告スタイル</strong>] プロパティを展開して、さまざまなスタイルをテキストに適用することができます。

<img src="images/customize.png" class="center" alt="テキスト広告スタイル">

すべてのテキスト広告は、Google AdSense の<strong>デフォルト</strong>のスタイルを使用します。既製のスタイルをそのまま使用したり、スタイルに多少の変更を加えたり、独自にカスタム スタイルを作成することもできます。

新しいスタイルを保存すると、そのスタイルを既存または新しい広告ユニットに
適用できます。

1. [広告スタイル](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES)に移動します。
2. <strong>アクティブなすべてのサービスで利用できる広告スタイル</strong>のリストから、変更する広告スタイルを選択します。
3. 変更して、<strong>広告スタイルを保存</strong>します。

既存の広告スタイルを変更すると、そのスタイルを使用しているアクティブな広告ユニットが自動的に更新されます。

{% include shared/remember.liquid title="Note" list=page.notes.images %}


