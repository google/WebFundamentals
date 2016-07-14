---
title: "ビュー間のアニメーション"
description: "アプリ内の 2 つのビュー間にアニメーションを付ける方法の学習"
updated_on: 2014-10-22
key-takeaways:
  code:
    - "ビュー間を移動するために遷移を使用します。`left`、`top`、またはレイアウトをトリガーする他のプロパティは使用しないようにします。"
    - "使用するすべてのアニメーションは瞬間的であり、持続時間は短くする必要があります。"
    - "画面サイズが大きくなったときに、アニメーションとレイアウトがどのように変化するかを考慮します。小さい画面でうまく動作しても、デスクトップで使用すると、妙に見える場合があります。"
notes:
  sixtyfps:
    - "すべてのアニメーションについて 60fps を維持するように注意します。 そうすれば、ユーザの興味を削ぐようなぎこちないアニメーションを避けることができます。 アニメーションが始まるずっと前に、変化する予定のすべてのものに対してアニメーション要素が will-change セットを持つようにします。 ビュー遷移については、<code>will-change: transform</code>を使用するもが最も適切です。"
  flinging:
    - "複数のブラウザ間でこの種の階層を作成するのは困難になる場合があります。 たとえば、フリング スクロールを '再有効化' するには、iOS で追加の CSS プロパティ <code>-webkit-overflow-scrolling: touch</code> が必要です。ただし、標準の overflow プロパティの場合と違って、どの軸にそれを適用するのかを制御できません。 複数のデバイスにわたって必ず実装をテストしてください。"

---
<p class="intro">
  詳細ビューへのリストの場合やサイドバー ナビゲーションを表示する場合など、アプリケーション内の複数のビュー間でユーザを移動したいことがよくあります。 これらのビュー間のアニメーションは、ユーザの興味を保つのに非常に効果的であり、プロジェクトの活力を高めることになります。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

これらのビュー遷移の外観と動作は、操作するビューのタイプに極めて大きく依存します。そのため、たとえば、ビュー上でモーダル オーバーレイにアニメーションを付ける処理は、リストビューと詳細ビュー間で遷移する処理とは異なります。

{% include shared/remember.liquid title="Note" list=page.notes.sixtyfps %}

## 変換を使用してビュー間を移動

少し簡潔化するために、リストビューおよび詳細ビューの 2 つのビューがあると想定します。 ユーザがリストビュー内のリスト項目をタップすると、詳細ビューがスライドインして、リストビューがスライドアウトします。

<img src="imgs/gifs/view-translate.gif" alt="2 つのビュー間の移動" />

この効果を実現するには、`overflow: hidden` が設定されたコンテナが 2 つのビューのために必要です。 こうすると、水平スクロールバーを表示しなくても、2 つのビューを各ビューの内部に並べて入れることができます。また、必要に応じて、各ビューをコンテナの内部に並べてスライドさせることができます。

<img src="imgs/container-two-views.svg" alt="階層を表示します。" />

コンテナの CSS は次のとおり:

{% highlight css %}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
{% endhighlight %}

コンテナの位置は `relative` として設定されます。 そのため、ビュー内部の各ビューを左上隅に対して絶対的な位置に配置した後、変換を使用して自由に移動することができます。 このアプローチは (レイアウトと描画をトリガーする) `left` プロパティを使用するよりもパフォーマンスにとって有利であり、通常、より容易に合理化することができます。

{% highlight css %}
.view {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  /* let the browser know we plan to animate
     each view in and out */
  will-change: transform;
}
{% endhighlight %}

`transform` プロパティに `transition` を追加すると、良好なスライド効果が得られます。 実感を高めるために、カスタム `cubic-bezier` 曲線を使用しています。これについては、[Custom Easing guide](custom-easing.html) で説明しています。

{% highlight css %}
.view {
  /* Prefixes are needed for Safari and other WebKit-based browsers */
  transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
}
{% endhighlight %}

画面外のビューは右側に移動する必要があります。したがって、この場合、詳細ビューを移動する必要があります。

{% highlight css %}
.details-view {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
{% endhighlight %}

ここで、クラスを処理するために若干の JavaScript が必要になります。 これによって、ビュー上で適切なクラスが切り替えられます。

{% highlight javascript %}
var container = document.querySelector('.container');
var backButton = document.querySelector('.back-button');
var listItems = document.querySelectorAll('.list-item');

/**
 * Toggles the class on the container so that
 * we choose the correct view.
 */
function onViewChange(evt) {
  container.classList.toggle('view-change');
}

// When you click on a list item bring on the details view.
for (var i = 0; i < listItems.length; i++) {
  listItems[i].addEventListener('click', onViewChange, false);
}

// And switch it back again when you click on the back button
backButton.addEventListener('click', onViewChange);
{% endhighlight %}

最後に、それらのクラスの CSS 宣言を追加します。

{% highlight css %}
.view-change .list-view {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.view-change .details-view {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
{% endhighlight %}

{% link_sample _code/inter-view-animation.html %}サンプルを参照してください。{% endlink_sample %}

この手法を拡張して複数のビューをカバーすることもできます。基本的な概念は同じです。個々の非可視ビューを画面外に移動し、必要に応じて戻します。現在画面内のビューは画面外に移動する必要があります。

{% include shared/remember.liquid title="Note" list=page.notes.flinging %}

複数のビュー間の遷移のほかに、この手法はサイドバー ナビゲーション要素のような他のスライドイン要素に適用することもできます。 唯一の実際の違いは、他のビューを移動する必要がないことです。

## アニメーションが大きい画面で動作することを確認してください。

大きい画面の場合は、リストビューを移動するのではなく常時維持して、詳細ビューを右側からスライドインさせます。 これはナビゲーション ビューの操作とよく似ています。

<img src="imgs/container-two-views-ls.svg" alt="階層を大きい画面に表示します。" />


