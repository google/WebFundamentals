project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: アプリ内のモーダル ビューにアニメーションを付ける方法の学習


{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# Animating Modal Views {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


モーダル ビューは、重要なメッセージのためのものであり、ユーザー インターフェースをブロックする必要があります。 それらは破壊的であり、過剰に使用するとユーザーの操作を台無しにしてしまうため、使用するときは注意する必要があります。 しかし、特定の環境では適切なビューであり、いくつかのアニメーションを追加することによって活用できます。

### TL;DR {: .hide-from-toc }
- モーダル ビューは慎重に使用する必要があります。ユーザーの操作を不必要に妨げると、ユーザーはイライラします。
- アニメーションにスケールを追加すると、効果的な「ドロップオン」が得られます。
- ユーザーが受け付けない場合はすぐにモーダル ビューを除外し、ユーザーが驚かないようにもう少しゆっくりと画面に表示させるようにしてください。


<img src="images/dont-press.gif" alt="モーダルビューをアニメーション化。" />

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/modal-view-animation.html">サンプルを参照してください。</a>

モーダル オーバーレイはビューポートに配列する必要があり、`position` を `fixed` に設定しなければなりません。


    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    
      pointer-events: none;
      opacity: 0;
    
      will-change: transform, opacity;
    }
    

初期には 0 の `opacity` があるため、ビューでは非表示になっています。しかし、承認をクリックしてタッチできるよう、`pointer-events` を `none` に設定する必要もあります。 これを行わないとすべての相互操作がブロックされ、ページ全体の応答がなくなります。 最後に、これは `opacity` および `transform` をアニメーション化するため、`will-change` で変更されたマークが必要です。([Using the will-change property](/web/fundamentals/design-and-ui/animations/animations-and-performance#using-the-will-change-property) も参照してください)。

ビューが表示されているときは、相互操作に同意し、1 の`opacity` を保持する必要があります。


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

モーダル ビューが必要なときにいつでも、JavaScript を使用してクラスを"視覚的に"切り替えることができます。


    modal.classList.add('visible');
    

この時点でモーダル ビューは、アニメーションなしで表示され、
に追加されます ([Custom Easing](/web/fundamentals/design-and-ui/animations/custom-easing) も参照してください)。


    .modal {
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    
      -webkit-transition:
        -webkit-transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

`scale` を変換に追加すると、ビューが画面上にかすかに落下するように見え、素敵な効果が得られます。 デフォルトのトランジションは、カスタム曲線および 0.1 秒の持続時間で、遷移と不透明度プロパティの両方に適用されます。

持続時間はかなり短いですが、それは、ユーザーがビューを閉じてアプリを取得したいときに最適です。 難点は、モーダル ビューが表示されたときに目立ちすぎる可能性があることです。 この問題を解決するには、`visible` クラスの遷移値をオーバーライドする必要があります。


    .modal.visible {
    
      -webkit-transform: scale(1);
      transform: scale(1);
    
      -webkit-transition:
        -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

これで、モーダル ビューは画面に表示されるまでの時間は 0.3 秒になります。あまり目立たなくなりますが、すぐに消えることを好むユーザーもいます。



