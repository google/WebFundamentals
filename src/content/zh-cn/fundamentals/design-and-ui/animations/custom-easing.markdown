---
title: "自定义缓动"
description: "不走寻常路，为项目创建完全自定义的动画。"
updated_on: 2014-10-21
key-takeaways:
  code:
    - 自定义缓动使您能够给项目提供更多个性。
    - 您可以创建与默认动画曲线（缓出、缓入等）相似的三次贝塞尔曲线，只是重点放在不同的地方。
    - 当需要对动画时间和行为（例如弹性或弹跳动画）进行更多控制时， 使用 JavaScript。

---
<p class="intro">
  有时您不想使用 CSS 随附的缓动关键字，或者要使用基于 JavaScript 的动画库。 在这两种情况下，一般可以定义自己的曲线（或公式），这让您能更好地控制项目动画的感觉。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

如果使用 CSS 编写动画，您将发现可以通过定义三次贝塞尔曲线来定义时间。 事实上，关键字`ease`、`ease-in`、`ease-out`和`linear`映射到预定义的贝塞尔曲线，详细说明请参考 [CSS 过渡规范](http://www.w3.org/TR/css3-transitions/)。

在 CSS 中，这些贝塞尔曲线有四个值，即 2 对数字，每对数字描述三次贝塞尔曲线的控制点的 X 和 Y 坐标。  贝塞尔曲线的起点坐标为 (0, 0)，终点坐标为 (1, 1)；由您设置两个控制点的 X 和 Y 值。 两个控制点的 X 值必须在 0 到 1 之间，每个控制点的 Y 值可以超过 [0, 1] 限制，但此规范未说明可超过多少！

更改每个控制点的 X 和 Y 值将实现截然不同的曲线，从而使动画有截然不同的感觉。 例如，如果第一个控制点在右下角，则动画在开头缓慢。 如果它在左上角，动画在开头会显得很快。 相反，如果第三控制点在网格的右下角，则动画在结尾处变快，而在左上角时，动画将在结尾处变慢。

为了对比，以下有两条曲线：一条典型的缓入缓出曲线和一条自定义曲线：

<img src="imgs/ease-in-out-markers.png" style="display: inline; max-width: 300px" alt="缓入缓出动画的曲线。" />
<img src="imgs/custom.png" style="display: inline; max-width: 300px" alt="定制动画的曲线。" />

{% link_sample _code/box-move-custom-curve.html %}查看自定义缓动的动画。{% endlink_sample %}

此自定义曲线的 CSS 为：

{% highlight css %}
transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
{% endhighlight %}

前两个数字是第一个控制点的 X 和 Y 坐标，后两个数字是第二个控制点的 X 和 Y 坐标。

制作自定义曲线很有趣，它让您对动画的感觉进行更多控制。 以上述曲线为例，您可以看到曲线与经典的缓入缓出曲线相似，但缓入即“开始”部分缩短，而结尾减速部分拉长。

使用此{% link_sample _code/curve-playground.html %}动画曲线工具{% endlink_sample %}进行试验，并查看此曲线如何影响动画的感觉。

## 使用 JavaScript 实现更多控制

有时您需要三次贝塞尔曲线未能提供的更多控制。 可能您想要弹跳的感觉，或希望在中途停止执行动画，这两种情况要通过 CSS 实现都更加困难。 在这种情况下，应当使用 JavaScript 动画库。 其中一个最佳的库是[Greensock’s TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified) (或 TweenLite，如果您想要超轻量版本)，您可以在小型 JavaScript 库中获得很多控制，它是一个非常成熟的代码库。

{% link_sample _code/box-move-elastic.html %}查看弹性缓动的动画。{% endlink_sample %}

要使用 TweenMax 之类的代码，可在页面中包括其脚本：

{% highlight html %}
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
{% endhighlight %}

到达合适位置后，您可以对元素调用 TweenMax，并且告诉它您想要的任何缓动，以及您想要哪些属性。 有大量缓动选项可供使用；以下代码使用一个弹性缓出：

{% highlight javascript %}
var box = document.getElementById('my-box');
var animationDurationInSeconds = 1.5;

TweenMax.to(box, animationDurationInSeconds, {
  x: '100%',
  ease: 'Elastic.easeOut'
});
{% endhighlight %}

[TweenMax 文档](http://greensock.com/docs/#/HTML5/GSAP/TweenMax/) 重点说明了您使用的所有选项，因此非常值得一读。



