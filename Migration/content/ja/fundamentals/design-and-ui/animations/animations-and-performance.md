---
title: "Animations and Performance"
description: "アニメーションは快適に実行される必要があります。そうでなければ、ユーザーは操作性が悪いと感じます。"
updated_on: 2014-10-21
key-takeaways:
  code:
    - "アニメーションがパフォーマンスの問題を引き起こさないように注意してください。指定した CSS プロパティをアニメーション化するときの影響を理解するようにしてください。"
    - "ページ (レイアウト) の形状の変更、または描画作成のプロパティのアニメーション化は特に高価です。"
    - "可能な場合は、形状と不透明度の変更に留めてください。"
    - "<code>will-change</code> を使用して、ブラウザにアニメーション化する対象を通知します。"
related-guides:
  blocking-css:
  -
      title: "Render Blocking CSS"
      href: fundamentals/performance/critical-rendering-path/render-blocking-css.html
      section:
        id: critical-rendering-path
        title: "Critical Rendering Path"
        href: performance/critical-rendering-path/
---
<p class="intro">
  アニメーション化する度に、60 fps を維持するように注意してください。スタッターやストールが目立ちすぎると、ユーザーにネガティブな印象を与えます。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

アニメーション プロパティは無料ではなく、安価なプロパティもそうでないものもあります。 たとえば、要素の `width` および `height` のアニメーション化は形状を変化させることであり、ページ上の他の要素を移動したりサイズを変更するなどの影響を引き起こす可能性があります。 この処理はレイアウトと呼ばれ (Firefox など Gecko ベースのブラウザのリフロー)、ページに多くの要素が含まれている場合は高価なことがあります。 レイアウトがトリガーされるたびに、ページまたはその一部は通常ペイントされる必要があります。これは一般的に、レイアウト操作そのものよりも高価です。

可能な場合は、レイアウトやペイントをトリガーするプロパティのアニメーション化は避けてください。 近代的なブラウザの大部分では、アニメーションは `opacity` または `transform` に限定され、両方ともブラウザによって高度に最適化することができます。アニメーションを処理するのが JavaScript か CSS かは問題ではありません。

個々の CSS プロパティによってトリガーされる作業の完全なリストは、[CSS Triggers](http://csstriggers.com) にあり、[High Performance Animations on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/) 作成の完全なガイドを参照できます。

{% include shared/related_guides.liquid inline=true list=page.related-guides.blocking-css %}

### will-change プロパティの使用

[`will-change`](http://dev.w3.org/csswg/css-will-change/) を使用すると、ブラウザに要素のプロパティを変更することを通知できます。 これによりブラウザは、変更を行う前に、適切な最適化を試みることができます。 ただし、ブラウザがリソースの無駄にする可能性があるため、`will-change` を使いすぎないように注意する必要があります。使いすぎると、さらに多くのパフォーマンスの問題が発生します。

一般的なルールは、アニメーションがユーザーの操作またはアプリケーションの状態によって 200 ミリ秒以内で起動できれば、will-change の利用価値があります。 ほとんどの場合、アニメーション化するアプリの現在のビューで、`will-change` をプロパティの変更のために有効化します。 前のガイドで使用したボックス サンプルの場合、 `will-change` を形状と不透明度の変更のために追加すると次のようになります。

{% highlight css %}
.box {
  will-change: transform, opacity;
}
{% endhighlight %}

Chrome、Firefox、および Opera のブラウザが現在これをサーポートしていますが、これらのプロパティを変更したりアニメーションをサポートするために、適切な最適化が行われます。

## CSS および JavaScript のパフォーマンス

パフォーマンスの観点から、CSS や JavaScript のアニメーションの優劣を議論する ウェブ ページやコメント スレッドが数多くあります。 ここで留意すべき点がいくつかあります。

* CSS ベースのアニメーションは一般的に、スタイリング、レイアウト、ペイント、および JavaScript が実行されているブラウザの「メイン スレッド」とは別のスレッドで処理されます。 つまり、ブラウザがメインスレッド上でいくつかの高価なタスクを実行している場合、CSS ベースのアニメーションは、潜在的に中断されることなく続行できます。 形状と不透明度の変更は、多くの場合、CSS ベースのアニメーションと同じスレッドで処理できるので、「コンポジット スレッド」と呼ばれます。アニメーションにはこれらを使用することが理想的です。
* アニメーションがペイント、レイアウト、またはその両方をトリガーする場合、「メイン スレッド」の動作が要求されます。 これは、CSS と JavaScript ベースの両方のアニメーションに当てはまり、レイアウトやペイントのオーバーヘッドは、CSS や JavaScript の実行に関連するすべての作業を矮小する可能性があります。これにより議論の余地が生じます。

特定のプロパティをアニメーション化することによってトリガーされる動作を正確に知りたい場合は、[CSS トリガー] (http://csstriggers.com) を参照してください。


