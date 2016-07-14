---
title: "The Basics of Easing"
description: "アニメーションをソフトにして重みを与える方法について説明します。"
updated_on: 2014-10-21
key-takeaways:
  code:
    - "イージングはアニメーションをより自然に感じさせます。"
    - "ease-out アニメーションを UI 要素に使用します。"
    - "ease-in または ease-in-out アニメーションは、それらを短くできる場合以外は使用しません。エンド ユーザー緩慢な印象を与える傾向があります。"
---
<p class="intro">
  自然界の中で、一地点から別の場所に直線的に移動するものは何もありません。 実際には、移動すると加速または減速する傾向があります。 私たちの脳は、この種の動きを予測るように配線されているので、アニメーション化するときはこれを活用する必要があります。 自然な動きはより快適に感じ、全体的なエクスペリエンスの向上につながります。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

古典的なアニメーションでは、ゆっくりと開始し加速する動きは「スローイン」といいます。また、減速する動きは「スローアウト」と呼ばれます。しかし、ウェブ上で最も一般的に使用される専門用語は“ease in” と “ease out” です。 時にはこれらを組み合わせて “ease in out” と呼ばれます。 イージングは実際、アニメーションを深刻または顕著にするプロセスです。

## イージングのキーワード

CSS トランジションとアニメーションから次のことがわかります[choose the kind of easing you want to use for your animations]({{site.fundamentals}}/look-and-feel/animations/choosing-the-right-easing.html)。 当該の動画のイージングに影響するキーワードを使用することができます (タイミングともいいます)。 また、次のことも可能です [go completely custom with your easing]({{site.fundamentals}}/look-and-feel/animations/custom-easing.html)、これによって、アプリの個性を表現する方法により多くの自由を与えます。

CSS で使用できるキーワードの一部は以下のとおりです。

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

Source: [CSS Transitions, W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

`steps` のキーワードを使用することもでき、これによって離散的なステップのトランジションを作成することができますが、上に列挙したものは自然を感じるアニメーションを作成するために最も有用です。

## リニア アニメーション

イージングが何もないアニメーションは**linear**と呼ばれます。 リニア推移のグラフは次のようになります。

<img src="imgs/linear.png" style="max-width: 300px" alt="リニア イーズのアニメーション曲線。" />

{% link_sample _code/box-move-linear.html %} リニア アニメーションを参照。{% endlink_sample %}

時間に伴って値が等しい量で移動します。 直線運動ではロボットのように不自然に感じる傾向があり、ユーザーの目障りになります。 一般的には、直線運動を避ける必要があります。

アニメーションのコーディングが CSS や JavaScript で行われている場合、直線運動のためのオプションがあることがわかります。 CSS で上記の効果を達成するためのコードは次のようになります。

{% highlight css %}
transition: transform 500ms linear;
{% endhighlight %}


## Ease-out アニメーション

Easing out では、アニメーションは線形のものよりも早く開始し、最後に減速します。

<img src="imgs/ease-out.png" style="max-width: 300px" alt="Ease-out のアニメーション曲線。" />

Ease out 効果を使う多くの方法がありますが、最も単純なのは CSS の`ease-out` キーワードです。

{% highlight css %}
transition: transform 500ms ease-out;
{% endhighlight %}

{% link_sample _code/box-move-ease-out.html %} Ease-out アニメーションを参照。{% endlink_sample %}

Easing out は一般的に、ユーザー·インターフェースの作業に最適です。高速起動はアニメーションの応答性を感じさせ、最後に自然に減速します。

## Ease-in アニメーション

Ease-in アニメーションは、ゆっくり始まり、最後に高速になります。つまり ease-out と逆です。

<img src="imgs/ease-in.png" style="max-width: 300px" alt="Ease-in のアニメーション曲線。" />

{% link_sample _code/box-move-ease-in.html %} Ease-in アニメーションを参照。{% endlink_sample %}

この種のアニメーションのは、ゆっくりと開始し、防音強打で素早く地面を打つ落下重い石のようなものです。

ease-in アニメーションを使用するには、ease-out やリニア アニメーションと同様に、そのキーワードを使用することができます。

{% highlight css %}
transition: transform 500ms ease-in;
{% endhighlight %}

しかし、相互操作の観点からは、ease-in は突然終わるため、少し不自然に感じます。現実の世界で動くものは突然止まるのではなく、徐々に減速します。 Ease-in はまた、慣れるまでは緩慢な印象を与えます。このことは、サイトやアプリで応答性についてネガティブな影響を与えることがあります。

## Ease-in-out アニメーション

 Ease-in-out は、車は加速と減速で慎重に使用するべきです。ease out よりも劇的な効果をもたらします。

<img src="imgs/ease-in-out.png" style="max-width: 300px" alt="Ease-in-out のアニメーション曲線。" />

{% link_sample _code/box-move-ease-in-out.html %}ease-in-out アニメーションを参照。{% endlink_sample %}

アニメーションの再生時間を長くしないでください。ease-in によりアニメーションの使い勝手が低下します。 300 - 500 ミリ秒の範囲が適切です。正確な数が何であるかに関して、プロジェクトの感触に大きく依存することになります。 つまり、開始が遅く、中盤が早く、終わりが遅いために、アニメーションのコントラストが増加し、ユーザーの満足につながります。

Ease-in-out animation アニメーションを取得するには、`ease-in-out` CSS キーワードを使用します。

{% highlight css %}
transition: transform 500ms ease-in-out;
{% endhighlight %}


