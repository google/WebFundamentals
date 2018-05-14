project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ペイントは、最終的にユーザーの画面に合成されるピクセルを書き込む処理です。通常、ペイントはパイプライン内のすべてのタスクの中で最も実行時間が長いため、できるだけ避ける必要があります。

{# wf_updated_on:2015-03-20 #}
{# wf_published_on:2015-03-20 #}

#  ペイントの複雑さの簡略化とペイントエリアの縮小 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

ペイントは、最終的にユーザーの画面に合成されるピクセルを書き込む処理です。
通常、ペイントはパイプライン内のすべてのタスクの中で最も実行時間が長いため、できるだけ避ける必要があります。


### TL;DR {: .hide-from-toc } 

* 形状または不透明度以外の任意のプロパティを変更すると、常にペイントがトリガーされます。
* ペイントは多くの場合、ピクセル パイプラインの中で最も高コストの部分なので、できるだけ避けるようにします。
* レイヤー プロモーションやアニメーションのオーケストレーションを介してペイントエリアを縮小します。
* Chrome DevTools のペイント プロファイラを使用して、ペイントの複雑さとコストを評価し、可能なものを削減します。

##  レイアウトとペイントのトリガー

任意の要素の形状を変更すると要素のピクセルの修正が必要になるため、レイアウトをトリガーすると、常にペイントがトリガーされます。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg"  alt="フル ピクセル パイプライン。">

背景、テキスト色、影などの非形状プロパティを変更した場合も、ペイントをトリガーすることができます。これらのケースではレイアウトが必要とされず、パイプラインは次のようになります。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg"  alt="レイアウトなしのピクセル パイプライン。">

## Chrome DevTools を使用して、ペイントのボトルネックを迅速な識別

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" alt="DevTools の [Show paint rectangles] オプション。">
  </figure>
</div>

Chrome DevTools を使用して、ペイントされた領域を迅速に識別することができます。DevTools に移動して、キーボードの Esc キーを押します。表示されるパネルの [Rendering] タブに移動し、[Show paint rectangles] を選択します。

<div style="clear:both;"></div>

Chrome でこのオプションをオンに切り替えると、ペイントが発生するたびに画面が緑色で点滅します。画面の全体、またはペイントされるべきではなかった画面領域が緑色で点滅する場合は、その原因を詳しく調査する必要があります。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg"  alt="ペイントが発生するたびに画面が緑色で点滅します。">


<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" alt="Chrome DevTools でペイント プロファイリングを有効にするトグル。">
  </figure>
</div>

Chrome DevTools の Timeline には、ペイント プロファイラの詳細情報を提供するオプションがあります。これを有効にするには、Timeline に移動し、上部の [Paint] ボックスを選択します。このオプションはオーバーヘッドを伴い、パフォーマンス プロファイリングをゆがめるため、ペイント問題のプロファイルを行うときにのみ有効にするよう留意してください。実際にペイントされている対象を詳しく分析したいときに、このオプションを使用するのが最適です。

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" alt="ペイント プロファイラを起動するボタン。" class="screenshot">
  </figure>
</div>

ここから Timeline の記録を実行できます。これにより、ペイント レコードはかなり詳細な情報を持つようになります。フレーム内のペイント レコードをクリックすることで、そのフレームのペイント プロファイラにアクセスできます。

<div style="clear:both;"></div>

ペイント プロファイラをクリックすると、ビューが表示されます。このビューでは、ペイントされたもの、ペイントにかかった時間、必要であった個々のペイントコールを確認することができます。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg"  alt="Chrome DevTools ペイント プロファイラ。">

このプロファイラでは、エリアと複雑性（実際にはペイントにかかる時間）を分析し、ペイントを回避できない場合に修正個所を確定することができます。

## 移動またはフェードする要素のプロモート

ペイントは常にメモリ内の単一の画像に対して行われるわけではありません。実際、ブラウザは複数の画像、必要な場合はコンポジ層に対してペイントを行うことができます。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg"  alt="コンポジ層の表現。">

このアプローチには、通常は再ペイントされる要素、または変換によって画面上を移動する要素を、他の要素に影響を与えないで処理できるという利点があります。これは Sketch、GIMP、Photoshop などのアート パッケージの手法と同じであり、個々のレイヤーを他のレイヤーに対して相互に処理および合成して最終的な画像を作成することができます。

新しいレイヤーを作成するための最良の方法は、`will-change` CSS プロパティを使用することです。この方法は Chrome、Opera、Firefox で動作し、`transform` の値を使用すると、新しいコンポジ層が作成されます。


    .moving-element {
      will-change: transform;
    }


`will-change` をサポートしないものの、レイヤー作成を利用できるブラウザ（Safari や Mobile Safari など）では、3D 変換を（誤）使用して新しいレイヤーを強制的に作成する必要があります。


    .moving-element {
      transform: translateZ(0);
    }


ただし、各レイヤーはメモリと管理を必要とするため、あまり多くのレイヤーを作成しないように注意する必要があります。この手法の詳細については、[コンポジタ専用プロパティのみの使用、およびレイヤー数の管理](stick-to-compositor-only-properties-and-manage-layer-count) セクションを参照してください。

新しいレイヤーに要素をプロモートした場合は、それによってパフォーマンス上の利点が得られたことを DevTools によって確認してください。**プロファイリングなしに要素をプロモートしないでください。**

## ペイントエリアの縮小

ただし、要素をプロモートしても、ペイント作業が依然として必要になる場合があります。ペイントの大きな問題は、ペイントを必要とする 2 つのエリアがブラウザによって結合されると、画面全体の再ペイントが必要になる可能性が生じることです。したがって、たとえば、ページの最上部にヘッダーを固定し、画面の最下部に何かを描くと、最終的に画面全体が再ペイントされる可能性があります。

注: 位置が固定されている高 DPI 画面の要素は、自動的に独自のコンポジ層にプロモートされます。これは低 DPI 端末では実行されません。その理由は、プロモーションによってテキスト レンダリングがサブピクセルからグレースケールに変更され、レイヤー プロモーションを手動で実行する必要があるためです。

ペイントエリアの縮小は、通常、過度のオーバーラップが生じないようにアニメーションと遷移を調整するか、ページの特定の部分のアニメーション化を避ける方法を見つける作業です。

##  ペイントの複雑さの簡略化

<div class="attempt-right">
  <figure>
    <img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" alt="画面の一部のペイントにかかる時間。">
  </figure>
</div>

ペイントでは、特定の処理のコストが他の処理よりも高くなります。たとえば、ブラーを必要とする処理（シャドウなど）では、赤いボックスの描画などよりもペイントに時間がかかります。ただし、CSS に関しては、これは必ずしも明白でありません。`background: red;` と `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` は、パフォーマンス特性が大きく異なるようには見えませんが、実際には異なります。

上記のペイント プロファイラを使用すると、効果を実現するために他の方法を探す必要があるかどうかを判断できます。より低コストのスタイル、または目的の結果を実現する他の手法を使用できるかどうかを検討してください。

可能な場合、特にアニメーションの実行中には常に、ペイントを避ける必要があります。これは、特にモバイル端末上では、1 フレームあたり **10 ミリ秒**は、一般的にペイント作業を実行するのに十分長い時間ではないためです。


{# wf_devsite_translation #}
