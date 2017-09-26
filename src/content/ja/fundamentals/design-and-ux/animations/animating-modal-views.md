project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: アプリ内のモーダルビューにアニメーションを付ける方法を学習します。

{# wf_updated_on:2016-08-24 #}
{# wf_published_on:2014-08-08 #}

# モーダルビューのアニメーション化 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/dont-press.gif" alt="モーダルビューをアニメーション化。" />
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/modal-view-animation.html" target="_blank" class="external">お試しください</a>
    </figcaption>
  </figure>
</div>

モーダル ビューは重要なメッセージを表示するためのビューです。ユーザー インターフェースをブロックしてでも表示したい理由がある場合にのみ、使用するようにしてください。モーダルビューは過度に使用するとユーザー操作の妨げになり、ユーザー エクスペリエンスを低下させるため、使用する際は注意が必要です。しかし状況によっては最適なビューでもあり、アニメーションを追加することによって躍動感を出すことができます。

### TL;DR {: .hide-from-toc }
* モーダルビューは慎重に使用する必要があります。ユーザー操作を不必要に妨げると、ユーザーはストレスを感じます。
* アニメーションにスケールを追加すると、優れた「ドロップオン」効果が得られます。
* ユーザーがモーダルビューを消した場合は、すぐにビューを非表示にします。一方、モーダルビューを表示する際は、ユーザーが驚かないように表示速度を少し落とします。

<div class="clearfix"></div>

モーダル オーバーレイはビューポートに合わせる必要があるため、`position` を `fixed` に設定します。


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
    

`opacity` の初期値は 0 であるため、ビューでは非表示になっています。ただし、クリックやタッチイベントを通過させるため、`pointer-events` を `none` に設定しておく必要があります。この設定をしないと、すべての操作がブロックされてページ全体の応答性が低下します。最後に、`opacity` と `transform` をアニメーション化するために、これらを変更予定の要素として `will-change` で指定しておく必要があります（[will-change プロパティの使用](animations-and-performance#using-the-will-change-property)を参照してください）。

ビューが表示されているときは操作を受け付け、`opacity` を 1 にしておく必要があります。


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

モーダル ビューが必要なときにいつでも、JavaScript を使用して「表示する」クラスを切り替えることができます。


    modal.classList.add('visible');
    

この時点では、モーダルビューはアニメーションなしで表示されます。以下でアニメーションを追加しましょう（[カスタム イージング](custom-easing)を参照してください）。



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
    

`scale` を transform に追加すると、わずかにビューが画面上に落下するように見え、素敵な効果が得られます。デフォルトの遷移として、transform プロパティと opacity プロパティの両方にカスタム曲線と 0.1 秒の継続時間を指定します。

この持続時間はかなり短いですが、ユーザーがビューを閉じてアプリに戻りたい場面には最適です。しかし、モーダル ビューが表示時に目立ちすぎるという難点もあります。この問題を解決するには、`visible` クラスの transition の値をオーバーライドします。


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
    

これでモーダルビューが画面に表示されるまでの時間は 0.3 秒になるので、唐突感は軽減されます。一方、モーダルビューを消すスピードは速い方がユーザーに好まれます。





{# wf_devsite_translation #}
