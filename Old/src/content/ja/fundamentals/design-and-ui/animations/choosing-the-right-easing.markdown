---
title: "Choosing the Right Easing"
description: "イージング イン、アウト、または両方の中から、プロジェクトに適したイージングを選択します。 多少快活にするのもよいでしょう!"
updated_on: 2014-10-21
key-takeaways:
  code:
    - "UI 要素のための ease-out アウトアニメーションを使用します。Quintic ease-out は、非常使いやすく便利です。"
    - "アニメーションの ease-out と ease-in の継続時間は、200 ～ 500 ミリ秒にしてください。一方、 bounce および  elastic eases は、800 ～ 1200 ミリ秒にします。"

---
<p class="intro">
  アニメーションのイージングのさまざまなオプションの利用について説明しましたが、どの種類をプロジェクトで使用するか、また、アニメーションの継続時間についても考慮する必要があります。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

一般的に、**ease-out** は正しいコールで、適切なデフォルトです。 これによって迅速に起動でき、アニメーションに適切な応答性を与え、しかも最後には効果的に減速します。

CSS の `ease-out` キーワードで指定されたものを超える周知の ease-out 方程式のグループがありますが、これらは ‘aggressiveness’ の範疇に入ります。 極めて快活な ease-out 効果については、[Quintic ease-out](http://easings.net/#easeOutQuint) を検討してください。

<img src="imgs/quintic-ease-out-markers.png" alt="Quintic ease-out のアニメーション曲線" style="max-width: 300px"/>

{% link_sample _code/box-move-quintic-ease-out.html %}Quintic ease-out のアニメーションをご覧ください。{% endlink_sample %}

他のイージングの方程式、特に bounce または elastic ease は、プロジェクトで適切な場合にのみ、慎重に使用する必要があります。 不快なアニメーションがユーザーの目に触れないようにするために、いくつかのポイントがあります。 プロジェクトが陽気で楽しいものでない場合は、UI 要素に bounce を用いないでください!逆に、気軽で楽しいサイトを作る場合は、是非 bounce を用いてください!

気軽にいろいろと試してみて、のプロジェクトの性格と一致しているかを確認し、そこから始めます。 イージング タイプの完全なリストとデモについては、 [easings.net](http://easings.net) を参照してください。

## アニメーションの正しい継続時間を選択します。

プロジェクトに追加されたアニメーションが、正しい持続時間を有することが重要です。 短すぎるとアニメーションが攻撃的でシャープな感じになります。長すぎると目障りで迷惑になります。

* **Ease-out: 200 ～ 500 ミリ秒**。 これによってアニメーションを視認できますが、目障りに感じることはありません。
* **Ease-in: 200 ～ 500 ミリ秒**。 最後に衝撃を与えるすと、その感触を柔らげる時間がなくなることを覚えておいてください。
* **Bounce または elastic 効果: 800 ～ 1200 ミリ秒**。 Elastic または bounce 効果では、「落ち着く」ための時間が必要です。 この余分な時間がないと、アニメーションの elastic または bounce 部分は非常に攻撃的になり、目障りになります。

もちろんこれらはガイドラインにすぎません。 ご自身で自由に実験し、プロジェクトに適した効果を選んでください。


