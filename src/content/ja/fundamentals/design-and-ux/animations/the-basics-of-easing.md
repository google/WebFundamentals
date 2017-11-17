project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: アニメーションをやわらかく見せたり、重みを与えたりする方法を学習します。

{# wf_updated_on:2016-08-23 #}
{# wf_published_on:2014-08-08 #}

# イージングの基本 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

自然界の中で、一地点から別の場所に直線的に移動するものはありません。実際には、物は移動するときに加速または減速する傾向があります。私たちの脳は、この種の動きを自然と予測するようにできているので、アニメーション化するときは、この傾向を生かします。ユーザーが快適に感じる自然な動きをアプリに取り入れることで、全体的なエクスペリエンスを向上させることができます。

### TL;DR {: .hide-from-toc }
* イージングによって、アニメーションはより自然に見えます。
* UI 要素には ease-out アニメーションを使用します。
* ease-in または ease-in-out アニメーションはエンドユーザーに緩慢な印象を与える傾向があるため、継続時間を短くできる場合を除いては、使用を控えてください。


従来のアニメーションでは、ゆっくりと動き出して加速する動きは「スローイン」、高速で動き出して減速する動きは「スローアウト」と呼ばれます。一般的に、ウェブの世界ではこれを「ease in」と「ease out」という専門用語で表現します。これらを組み合わせた「ease in out」という用語が使われることもあります。イージングとは、アニメーションを滑らかで自然に見せるためのプロセスです。

##  イージングのキーワード

CSS 遷移とアニメーションではどちらも、[アニメーションに使用するイージングの種類を選択できます](choosing-the-right-easing)。また、対象とするアニメーションのイージング（`timing` とも言います）に作用するキーワードを使用することも可能です。さらに、[イージングを全面的にカスタマイズ](custom-easing)すると、より自由に独創的なアプリに仕上げることができます。

以下は CSS で使用できるキーワードの一部です。

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

出典: [CSS 遷移、W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

`steps` キーワードを使用すると、離散的なステップから成る遷移を構成できますが、自然に感じるアニメーションを作成する上で最も有用なキーワードは上に挙げたものです。

##  リニア アニメーション

<div class="attempt-right">
  <figure>
    <img src="images/linear.png" alt="リニア イーズのアニメーション曲線。" />
  </figure>
</div>

イージングが何もないアニメーションは**リニア**と呼ばれます。リニア遷移のグラフは次のようになります。

時間に比例して、一定の割合で値が増加します。直線運動はロボットのように不自然に見えやすく、ユーザーに不快感を与える場合があります。そのため、一般的には直線運動は避けたほうがよいでしょう。

CSS や JavaScript を使用してアニメーションのコーディングをする場合は、直線運動用のオプションを使用できます。 

[リニア アニメーションを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-linear.html){: target="_blank" .external }

<div style="clear:both;"></div>

CSS で上記の効果を実現するためのコードは次のようになります。


    transition: transform 500ms linear;
    


##  ease-out アニメーション

<div class="attempt-right">
  <figure>
    <img src="images/ease-out.png" alt="Ease-out のアニメーション曲線。" />
  </figure>
</div>

Easing out では、アニメーションはリニアのものよりも高速で動き出し、最後に減速します。

一般的に、ease out はユーザー インターフェースの動作に最適です。動き始めのスピードが速いのでアニメーションの反応が早く感じられ、最後は減速するので自然に見えます。

[ease-out アニメーションを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-out.html){: target="_blank" .external }

<div style="clear:both;"></div>

Ease out 効果を実現する方法はたくさんありますが、最も単純なのは CSS の `ease-out` キーワードを使う方法です。


    transition: transform 500ms ease-out;
    


##  ease-in アニメーション

<div class="attempt-right">
  <figure>
    <img src="images/ease-in.png" alt="Ease-in のアニメーション曲線。" />
  </figure>
</div>

ease-in アニメーションは、動き始めはゆっくりで、最後に速くなります。つまり ease-out の逆です。

この種のアニメーションは、重い石が落下するときの動きに似ています。つまり、ゆっくりと動き始め、最後は勢いよく地面にぶつかって止まります。

ただ、相互作用という観点では、ease-in は唐突に終了するので少し不自然に見えます（現実の世界では、動いている物は突然止まるのではなく、徐々に減速します）。さらに、ease-in には動き出しが重く感じられるという難点があるため、サイトやアプリの反応が悪く見えるおそれがあります。

[ease-in アニメーションを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in.html){: target="_blank" .external }

<div style="clear:both;"></div>

ease-in アニメーションを使用するには、ease-out やリニア アニメーションと同様に、そのキーワードを使用します。


    transition: transform 500ms ease-in;
    

##  ease-in-out アニメーション

<div class="attempt-right">
  <figure>
    <img src="images/ease-in-out.png" alt="Ease-in-out のアニメーション曲線。" />
  </figure>
</div>

Ease-in-out は、車の加速と減速に似ています。慎重に使用すれば、ease out よりもさらに劇的な効果を実現できます。

アニメーションの継続時間は、極端に長くしないでください。長すぎると、ease-in の効果によってアニメーションの始まりが重く見えます。一般的には 300 ～ 500 ミリ秒の範囲が妥当です。ただし具体的な数値は、そのプロジェクトの雰囲気によって大きく異なります。ease-in-out はゆっくりと立ち上がり、中盤で加速し、ゆっくりと終了するので、全体としてアニメーションのコントラストが強調されるため、ユーザーには好まれると考えられます。

[ease-in-out アニメーション見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in-out.html){: target="_blank" .external }

<div style="clear:both;"></div>


ease-in-out のアニメーションには、CSS キーワードの `ease-in-out` を使用します。


    transition: transform 500ms ease-in-out;
    




{# wf_devsite_translation #}
