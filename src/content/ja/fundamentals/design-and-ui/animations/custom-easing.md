project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: オフロードに移動して、プロジェクトのために完全なカスタムア ニメーションを作成します。


{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# Custom Easing {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}


場合によっては、CSS に含まれているイージング キーワードを使用したくなかったり、JavaScript ベースのアニメーション ライブラリを使用することがあるでしょう。」 どちらの場合も、通常は独自の曲線 (または式) を定義することができ、これによって、プロジェクトのアニメーションの感触を制御できます。

### TL;DR {: .hide-from-toc }
- カスタム イージングによって、プロジェクトにもっと個性を与えることができます。
- デフォルトのアニメーション曲線 (ease-out、ease-in など) に似た 3 次ベジェ曲線を作成することができ、異なる場所を強調します。
- JavaScript を使用して、アニメーションのタイミングや動作など、詳細に制御することができます。 elastic または bounce アニメーション。


CSS でアニメーションしている場合、タイミングを定義するために 3 次ベジェ曲線を定義することができます。 実際、キーワード `ease`、`ease-in`、`ease-out`、および `linear` は、ベジェ曲線を事前定義するためにマップされます。詳細については、[CSS トランジションの使用](http://www.w3.org/TR/css3-transitions/)を参照してください。

CSS では、これらのベジェ曲線は 4 つの値、または数字の 2 つのペアを持ちます。各ペアは 3 次ベジェ曲線の制御点の X 座標と Y 座標を記述します。  ベジェ曲線の開始点は （0,0） の座標であり、終了点は（1、1） の座標で、2 つの制御点の X と Y の値を設定します。 2 つの制御点の X の値は 0 と 1 の間でなければならず、各制御点の Y の値は [0、1] の限界を超えることができます。ただし、その正確な値は不明です。

各制御点の X と Y の値を変更すると、アニメーションに非常に異なる曲線を与え、大きく異なる感触になります。 たとえば、最初の制御点が右下にある場合は、アニメーションの起動が遅くなります。 左上の領域にある場合は、高速に起動します。 逆に、第 2 の制御点がグリッドの右下にある場合は、最後に高速に動作するようになり、左上にある場合は、最後に遅くなります。

比較のために 2 つの曲線を示します。典型的な ease-in-out 曲線とカスタム カーブです。

<img src="images/ease-in-out-markers.png" style="display: inline; max-width: 300px" alt="Ease-in-out のアニメーション曲線。" />
<img src="images/custom.png" style="display: inline; max-width: 300px" alt="カスタム アニメーション曲線" />

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/box-move-custom-curve.html">カスタム イージングのアニメーションを参照。</a>

カスタム曲線の CSS は次のとおり:


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

最初の 2 つの数字は、最初の制御点の X と Y 座標であり、2 番目の数字は 2 番目の制御点の X と Y 座標です。

カスタム曲線の作成は楽しく、アニメーションの感触を大幅に制御することができます。 たとえば、上記の曲線を考えると、曲線旧来の ease-in-out 曲線に似ていますが、ease-in が短かく、‘getting going’、ポーション、および終了時に細長く鈍化することがわかります。

この実験 <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/curve-playground.html">アニメーション曲線ツール</a> 曲線がアニメーションの感触にどのように影響するかをご覧ください。

## JavaScript を使用した詳細制御

3 次ベジエ曲線よりもさらに多くの制御が必要になる場合があります。 おそらく、elastic bounce の感覚を得たり、アニメーションの実行を途中で停止したいことがありますが、CSS で実現するには困難です。 このような場合には、JavaScript のアニメーション ライブラリを使用する必要があります。 一番良いライブラリは[Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)です (超軽量を保持したい場合は TweenLite)。小さな JavaScript ライブラリで多く制御を取得できる、非常に成熟したコードベースです。

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/box-move-elastic.html">elastic ease アニメーションを参照。</a>

ページにスクリプトを含む TweenMax のようなものを使用するには:


    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

準備ができたら、要素に対して TweenMax を呼び出し、目的のプロパティとイージングを伝えます。 使用できるイージングのオプションは多数ありますが、次のコードは elastic ease-out を使用しています。


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

[TweenMax 文書](http://greensock.com/docs/#/HTML5/GSAP/TweenMax/) は、利用できるすべてのオプションを説明していますので、読む価値があります。



