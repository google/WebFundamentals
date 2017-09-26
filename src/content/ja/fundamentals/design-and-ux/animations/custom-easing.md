project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 少し本題からそれて、プロジェクト用に完全にカスタムのアニメーションを作成します。

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# カスタム イージング {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

状況によっては、CSS に含まれているイージング キーワードを使用したくない場合や、ウェブ アニメーションや JavaScript フレームワークを使用したい場合などがあると思います。このような場合、一般的には独自の曲線（または式）を定義して、プロジェクトのアニメーションの雰囲気を自在に変えることができます。

### TL;DR {: .hide-from-toc }
* カスタム イージングによって、より独創的なプロジェクトを作成することができます。
* デフォルトのアニメーション曲線（ease-out、ease-in など）に類似した 3 次ベジェ曲線を作成して、異なる箇所を強調できます。
* JavaScript を使用すると、elastic や bounce などのアニメーションのタイミングや動作を細かく制御することができます。


アニメーションに CSS を使用している場合は、3 次ベジェ曲線を定義して、アニメーションのタイミングを指定することができます。実際、`ease`、`ease-in`、`ease-out`、`linear` のキーワードは、事前定義されたベジェ曲線にマッピングします。詳細については、[CSS 遷移の仕様](http://www.w3.org/TR/css3-transitions/) および[ウェブ アニメーションの仕様](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve)を参照してください。

これらのベジェ曲線は 4 つの値、つまり 2 つの数値から成るペアを 2 つ使用して定義されます。各ペアは 3 次ベジェ曲線の制御点の X 座標と Y 座標を表します。ベジェ曲線の開始点は座標（0、0）、終了点は座標（1、1）で、2 つの制御点の X 座標と Y 座標の値をそれぞれ設定できます。2 つの制御点の X 座標の値には 0 ～ 1 の間の数値を指定します。一方、各制御点の Y 座標の値は 0 ～ 1 の範囲を超えて指定できます（上限値は仕様では明記されていません）。

各制御点の X と Y の値を変更すると曲線が大幅に変化し、アニメーションの印象が大きく変わります。たとえば 1 つ目の制御点が右下にある場合、アニメーションはゆっくりと動き出します。逆に左上の領域にある場合は、最初から速く動きます。一方、2 つ目の制御点がグリッドの右下にある場合は最後の動きが速く、左上にある場合は最後の動きが遅くなります。

比較のために 2 つの曲線を示します。典型的な ease-in-out 曲線とカスタム カーブです。

<div class="attempt-left">
  <figure>
    <img src="images/ease-in-out-markers.png" alt="Ease-in-out のアニメーション曲線。" />
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/custom.png" alt="カスタム アニメーション曲線" />
  </figure>
</div>

[カスタム イージングのアニメーションを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-custom-curve.html){: target="_blank" .external }

カスタム曲線の CSS は次のとおりです。


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

最初の 2 つの数字は 1 つ目の制御点の X 座標と Y 座標で、後の 2 つの数字は 2 番目の制御点の X 座標と Y 座標です。

カスタム曲線の作成は楽しい作業で、アニメーションの見え方を細かく制御することができます。たとえば上記のカスタム曲線は、標準的な ease-in-out 曲線に似ていますが、ease-in の時間が短く（動き出してから短時間で加速）、最後に長い時間をかけて減速しています。

こちらの[アニメーション曲線ツール](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html){: target="_blank" .external }を使用して、曲線に応じてアニメーションの印象がどう変わるのかをご確認ください。

##  JavaScript フレームワークを使用して細かく制御する

3 次ベジエ曲線よりもさらに詳細な制御が必要になる場合があります。跳ね返り効果については、CSS や Web Animations で実現するのは難しいため、JavaScript フレームワークの使用を検討してください。

###  TweenMax

強力なフレームワークの 1 つに [Greensock の TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)（または、超軽量版の TweenLite）があります。これは非常に成熟したコードベースで、小さな JavaScript ライブラリでさまざまな制御が可能です。

[elastic ease アニメーションを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-elastic.html){: target="_blank" .external }

TweenMax を使用するには、ページに以下のスクリプトを追加します。


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

スクリプトの準備ができたら要素に対して TweenMax を呼び出し、使用するプロパティとイージングを通知します。使用できるイージングのオプションは多数ありますが、次のコードでは elastic ease-out を使用しています。


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

[TweenMax 文のドキュメント](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/)に利用できるオプションが網羅されていますので、ぜひ一読してください。





{# wf_devsite_translation #}
