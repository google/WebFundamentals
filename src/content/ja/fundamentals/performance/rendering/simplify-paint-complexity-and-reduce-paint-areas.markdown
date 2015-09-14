---
title: "Simplify paint complexity and reduce paint areas"
description: "ペイントは、最終的にユーザの画面に合成されるピクセルを書き込む処理です。 通常、ペイントはパイプライン内のすべてのタスクのうちで最も長く実行されるため、可能な限り避ける必要があります。"
updated_on: 2015-03-20
notes:
  highdpi:
    - "位置が固定されている高 DPI 画面の要素は、自動的に独自のコンポジ層にプロモートされます。 これは低 DPI デバイスでは実行されません。その理由は、プロモーションによってテキスト レンダリングがサブピクセルからグレースケールに変更され、レイヤー プロモーションを手作業で実行する必要があるためです。"
key-takeaways:
  - 形状または不透明度とは別に任意のプロパティを変更すると、常にペイントがトリガーされます。
  - ペイントは多くの場合、ピクセル パイプラインの中で最も高価な部分なので、できるだけ避けるようにします。
  - アニメーションのプロモーションやオーケストレーションを介してペイント エリアを縮小します。Chrome DevTool のペイント プロファイラを使用して、ペイントの複雑さとコストを評価し、可能なものを削減します。


---
<p class="intro">
  ペイントは、最終的にユーザの画面に合成されるピクセルを書き込む処理です。 通常、ペイントはパイプライン内のすべてのタスクのうちで最も長く実行されるため、可能な限り避ける必要があります。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

任意の要素の形状を変更すると要素のピクセルの修正が必要になるため、レイアウトをトリガーすると、常にペイントがトリガーされます。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg" class="g--centered" alt="フル ピクセル パイプライン。">

背景、テキスト色、シャドウなどの非形状プロパティを変更した場合も、ペイントをトリガーすることができます。 これらのケースではレイアウトが必要とされず、パイプラインは次のようになります。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg" class="g--centered" alt="レイアウトなしのピクセル パイプライン。">

## Chrome DevTools を使用して、ペイントのボトルネックを迅速に識別することができます。

Chrome DevTools を使用して、ペイントされた領域を迅速に識別することができます。 DevTools に移動して、キーボードの Esc キーを押します。 表示されるパネルの [レンダリング] タブに移動し、[Show paint rectangles] を選択します。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" class="g--centered" alt="DevTools の show paint rectangles オプション。">

Chrome で切り替えられるこのオプションを使用すると、ペイントが発生するたびに画面が緑色で点滅します。 画面の全体、またはペイントされるべきではなかった画面領域が緑色で点滅する場合は、その原因を詳しく調査する必要があります。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg" class="g--centered" alt="ペイントが発生するたびに画面が緑色で点滅します。">

Chrome DevTools タイムラインのオプションで、ペイント プロファイラの多くの情報が提供されます。 これを有効にするには、タイムラインに移動し、上部の [ペイント] ボックスを選択します。 このオプションはオーバーヘッドを伴い、パフォーマンス プロファイリングをゆがめるため、ペイント問題のプロファイルングを行うときのみ、有効にするよう留意してください。 実際にペイントされている対象を詳しく分析したいときに、このオプションを使用するのが最適です。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" class="g--centered" alt="Chrome DevTools でペイント プロファイリングを有効にするトグル。">

ここからタイムライン レコーディングを実行できます。これにより、ペイント レコードはかなり詳細な情報を持つようになります。 フレーム内のペイント レコードをクリックすることで、そのフレームのペイント プロファイラにアクセスできます。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" class="g--centered" alt="ペイント プロファイラを起動するボタン。">

ペイント プロファイラをクリックすると、ビューが表示されます。このビューでは、ペイントされたもの、ペイントにかかった時間、必要であった個々のペイント コールを確認することができます。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg" class="g--centered" alt="Chrome DevTools ペイント プロファイラ。">

このプロファイラでは、エリアと複雑性 (実際にはペイントにかかる時間) を分析し、ペイントを回避できない場合に修正個所を確定することができます。

## 移動またはフェードする要素のプロモート

ペイントは常にメモリ内の単一の画像に対して行われるわけではありません。 実際、ブラウザは複数の画像、必要な場合はコンポジ層に対してペイントを行うことができます。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg" class="g--centered" alt="コンポジ層の表現">

このアプローチの利点は、通常は再ペイントされる要素、または変換によって画面上を移動する要素を、他の要素に影響を与えないで処理できることです。 これは Sketch、GIMP、Photoshop などのアート パッケージの手法と同じであり、個々のレイヤーを他のレイヤーに対して相互に処理および合成して最終的な画像を作成することができます。

新しいレイヤーを作成するための最良の方法は、`will-change` CSS プロパティを使用することです。 この方法は Chrome、Opera、Firefox で動作し、`transform` の値を使用すると、新しいコンポジ層が作成されます。

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

`will-change` をサポートしないものの、レイヤー作成を利用できるブラウザ (Safari や Mobile Safari など) では、3D 変換を(誤)使用して新しいレイヤーを強制的に作成する必要があります。

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

ただし、各レイヤーはメモリと管理を必要とするため、あまり数多くのレイヤーを作成しないように注意する必要があります。 この手法の詳細については、セクション [Stick to compositor-only properties and manage layer count](stick-to-compositor-only-properties-and-manage-layer-count) を参照してください。

新しいレイヤーに要素をプロモートした場合は、それによってパフォーマンス上の利点が得られたことを DevTool によって確認してください。 **プロファイリングなしに要素をプロモートしないでください。**

## ペイント エリアの縮小

ただし、要素をプロモートしても、ペイント作業が依然として必要になる場合があります。 ペイントの大きな問題は、ペイントを必要とする 2 つのエリアがブラウザによって結合されると、画面全体の再ペイントが必要になる可能性が生じることです。 したがって、たとえば、ページの最上部にヘッダーを固定し、画面の最下部に何かを描くと、最終的に画面全体が再ペイントされる可能性があります。

{% include shared/remember.liquid title="Note" list=page.notes.highdpi %}

ペイント エリアを縮小するには、通常、過度のオーバーラップが生じないようにアニメーションと遷移を編成するか、ページの特定の部分のアニメーション化を避ける方法を見つける必要があります。

## ペイントの複雑性の簡素化
ペイントを実行しようとすると、特定の処理が他の処理よりも高価になります。 たとえば、ブラーを必要とする処理 (シャドウなど) は、赤いボックスの描画などよりもペイントに長い時間がかかります。 ただし、CSS に関して、これは必ずしも明白でありません。従来は非常に異なるパフォーマンス特性を示した `background: red;` と `box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` が、現在も必ずそうであるとは限りません。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" class="g--centered" alt="画面の一部をペイントする時間。">

上記のペイント プロファイラを使用すると、効果を実現する他の方法を探す必要があるかどうかを判断できます。 より安価なスタイル集合を使用すること、または目的の結果を実現する他の手法を採用することが可能かどうかを検討してください。

可能な場合は、特にアニメーションの実行中には常にペイントを避ける必要があります。特にモバイル機器上では、1 フレームあたり **10ms** は、一般的にペイント作業を実行するのに十分長い時間ではありません。


