project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: コンポジットは、画面に表示するために、ページのペイントされた部分がまとめて置かれている場所です。

{# wf_updated_on:2015-03-20 #}
{# wf_published_on:2015-03-20 #}

# コンポジタ専用プロパティの優先使用、およびレイヤー数の管理 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

コンポジットは、画面に表示するために、ページのペイントされた部分がまとめて置かれている場所です。


ページのパフォーマンスに影響を与える 2 つの重要な要因があります。管理対象となるコンポジタ レイヤーの数と、アニメーションのために使用するプロパティです。

### TL;DR {: .hide-from-toc }

* アニメーションの形状と不透明度の変更のみを行うようにします。
* 移動要素を `will-change` または `translateZ` でプロモートします。
* プロモーション ルールにより、レイヤーでメモリーと管理が必要になるため、ルールの多用は避けてください。

## アニメーションの形状と不透明度の変更の使用

最もパフォーマンスの高いピクセル パイプラインでは、レイアウトとペイントの両方を避け、コンポジットの変更のみを必要とします。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg"  alt="レイアウトまたはペイントなしのピクセル パイプライン。">

これを実現するには、コンポジタのみで処理できるプロパティの変更のみを行う必要があります。現在、これに当てはまるプロパティは **`transforms`** と **`opacity`** のみです。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg"  alt="レイアウトやペイントをトリガーせずにアニメーション化できるプロパティ。">

`transform` と `opacity` を使用する際の注意点は、これらのプロパティを変更する要素がそれ自身のコンポジ層になければならないということです。レイヤーを作成するには、要素をプロモートする必要があります。これについては、次のセクションで説明します。

注: これらのプロパティだけにアニメーションを制限することができない場合は、FLIP principle(https://aerotwist.com/blog/flip-your-animations) を参照してください。より高価なプロパティから、形状と不透明度の変更にアニメーションを再マッピングするのに役立つ場合があります。

## アニメーション化する要素をプロモートする

[ペイントの複雑さの簡略化とペイントエリアの縮小](simplify-paint-complexity-and-reduce-paint-areas) セクションで説明したように、アニメーション化する要素をそれら自身のレイヤーにプロモートする必要があります（合理的な範囲にとどめてください）。


    .moving-element {
      will-change: transform;
    }


古いブラウザ、または will-change をサポートしていないブラウザの場合は、次のようにします。


    .moving-element {
      transform: translateZ(0);
    }


これにより、ブラウザに変更が行われることが予告されます。予定されている変更の内容に応じて、ブラウザは、コンポジット層を作成するなどの準備をすることができます。

## レイヤーを管理して、レイヤーが増えすぎないようにする

レイヤーによってパフォーマンスが向上することが多いことを知ると、次のように、ページ上のすべての要素をプロモートしたくなることでしょう。


    * {
      will-change: transform;
      transform: translateZ(0);
    }


これは、ページ上のあらゆる要素をプロモートしたいという遠回しな言い方です。ここでの問題は、作成したすべてのレイヤーにメモリと管理が必要であり、それはコストなしでは行えないということです。実際、メモリが限られている端末では、レイヤーの作成によって得られる利益を、パフォーマンスへの影響がはるかに上回ることがあります。すべてのレイヤーのテクスチャは GPU にアップロードする必要があるため、CPU と GPU 間の帯域幅や、GPU のテクスチャで使用可能なメモリの面でさらなる制約が生じます。

警告:要素を不必要にプロモートしないでください。

## Chrome DevTools を使用してアプリのレイヤーを理解する

<div class="attempt-right">
  <figure>
    <img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" alt="Chrome DevTools のペイント プロファイラ用のトグル。">
  </figure>
</div>

アプリ内の各レイヤーを理解し、その要素がなぜレイヤーを有しているかを知るために、Chrome DevTools の Timeline でペイント プロファイラを有効にする必要があります。

<div style="clear:both;"></div>

これがオンになっている場合、記録を実行する必要があります。記録が終了したら、frames-per-second バーと詳細の間にある個々のフレームをクリックできるようになります。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg"  alt="デベロッパーがプロファイリングを行うフレーム。">

これをクリックすると、詳細に新しいオプションの [layer] タブが表示されます。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg"  alt="Chrome DevTools の [layer] タブボタン。">

このオプションでは新しいビューが表示されます。これを使用して、対象のフレームの間にすべてのレイヤーをパン、スキャン、およびズームインすることができ、各レイヤーが作成された理由も示されます。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg"  alt="Chrome DevTools の [layer] ビュー。">

このビューを使用すると、現在あるレイヤーの数を追跡することができます。スクロールやトランジションなどのパフォーマンスが重要なアクションの間に合成に多くの時間を費やしている場合（目標は **4～5 ミリ秒**）、この情報を使用して、現在あるレイヤーの数とレイヤーが作成された理由を確認できます。また、このビューから、自分のアプリのレイヤー数を管理できます。


{# wf_devsite_translation #}
