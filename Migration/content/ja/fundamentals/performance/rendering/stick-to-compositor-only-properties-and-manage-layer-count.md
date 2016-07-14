---
title: "Stick to compositor-only properties and manage layer count"
description: "コンポジットは、ページのペイント部分を画面に一緒に置かれている場所です。"
updated_on: 2015-03-20
notes:
  flip:
    - "これらのプロパティだけにアニメーションを制限することができない場合は、<a href=\"http://aerotwist.com/blog/flip-your-animations\">FLIP principle</a> を参照してください。より高価なプロパティからの形状と不透明度の変化にアニメーションを再マッピングするのに役立つことがあります。"
key-takeaways:
  - アニメーションの形状と不透明度の変更に固執します。
  - 移動要素を will-change または translateZ でプロモートします。
  - プロモーション ルールを乱用しないでください。レイヤーはメモリーと管理を必要とします。
---
<p class="intro">
  コンポジットは、ページのペイント部分を画面に一緒に置かれている場所です。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

ページのパフォーマンスに影響を与える 2 つの重要な要因があります。管理対象となる必要コンポジタ レイヤーの数と、アニメーションのために使用するプロパティです。

## 形状と不透明度の変更をアニメーションにしようしてます
ピクセル パイプラインの最適パフォーマンス バージョンは、レイアウト、ペイントの両方を回避し、コンポジットの変更だけを要します。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg" class="g--centered" alt="レイアウトまたはペイントなしのピクセル パイプライン。">

これを達成するために、コンポジタで扱うことができる変化の特性に固執する必要があります。 現在は**transforms** および**opacity**の 2 つのプロパティだけがあります。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg" class="g--centered" alt="プロパティは、レイアウトやペイントを起動することなく、アニメーション化することができます。">

形状と不透明度を使用するための注意点は、これらのプロパティを変更するに要素が自身コンポジタのレイヤーでなければならないということです。 レイヤーを作成するためには、次の要素をプロモートしなければなりません。

{% include shared/remember.liquid title="Note" list=page.notes.flip %}

## アニメーション化する要素をプロモート

“[Simplify paint complexity and reduce paint areas](simplify-paint-complexity-and-reduce-paint-areas)”セクションで説明したように、独自のレイヤーにアニメーション化する要素をプロモートしますが、合理的な範囲に留めてください。

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

あるいは、古いブラウザまたは will-change をサポートしていないブラウザ:

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

これにより、ブラウザに変更予定を伝え、変更予定の内容に応じて、ブラウザはコンポジタ レイヤーの作成など、事前警告を与えます。

## レイヤーを管理し、レイヤーの破裂を避ける

それはおそらく魅力的ですが、レイヤーは多くの場合パフォーマンスを助けることを理解し、次のものを使用してページ上のすべての要素をプロモートします。

{% highlight css %}
* {
  will-change: transform;
  transform: translateZ(0);
}
{% endhighlight %}

つまり、ページ上のすべての単一の要素をプロモートするということです。 ここでの問題は、作成したすべてのレイヤーは、メモリーおよび管理を必要とすることであり、それは無料ではありません。 実際には、限られたメモリーの端末におけるパフォーマンスへの影響は、これまでレイヤーを作成するための利益を上回ることがあります。 すべてのレイヤーのテクスチャは GPU にアップロードする必要があるため、CPU と GPU、および GPUのテクスチャの使用可能なメモリー間の帯域幅の面でさらなる制約が生じます。

要するに、**不必要に要素をプロモートしてはいけません**.。

## Chrome DevTools を使用してアプリのレイヤーを理解する

アプリ内の各レイヤーを理解し、その要素がなぜレイヤーを有しているかを知るために、Chrome DevTools の  Timeline でペイント プロファイラを有効にする必要があります。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" class="g--centered" alt="Chrome DevTools のペイント プロファイラ用のトグル。">

切り替えると記録を取ることができます。 記録が終了したら、個々のフレームをクリックすることができるようになります。これは frames-per-second バーと詳細の間にあります。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg" class="g--centered" alt="フレーム開発者は、プロファイリングに関心があります。">

これをクリックすると、新しいオプションの詳細が提供されます: レイヤー タブ。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg" class="g--centered" alt="レイヤー タブ ボタンは Chrome DevTools にあります。">

このオプションでは新しいビューが表示されます。これによって、各レイヤーが作成された理由とともに、フレームの間に全てのレイヤーをパン、スキャン、およびズームインすることができます。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg" class="g--centered" alt="Chrome DevTools のレイヤー ビュー。">

このビューを使用すると、すでにあるレイヤーの数を追跡することができます。 スクロールやトランジションなどのパフォーマンスが重要なアクションの間に合成に多くの時間を費やしている場合 (目標は**4-5 ミリ秒**)、この情報を使用して、自分のアプリでレイヤ数を管理することができます。


