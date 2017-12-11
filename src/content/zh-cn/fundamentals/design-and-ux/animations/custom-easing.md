project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:不走寻常路，为项目创建完全自定义的动画。

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# 自定义缓动 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/samthorogood.html" %}

有时您不想使用 CSS 随附的缓动关键字，或者要使用 Web Animations 或 JavaScript 框架。在这些情况下，一般可以定义自己的曲线（或公式），这让您能更好地控制项目动画的感觉。

### TL;DR {: .hide-from-toc }
* 自定义缓动使您能够给项目提供更多个性。
* 您可以创建与默认动画曲线（缓出、缓入等）相似的三次贝塞尔曲线，只是重点放在不同的地方。
* 当需要对动画时间和行为（例如弹性或弹跳动画）进行更多控制时，请使用 JavaScript。


如果使用 CSS 编写动画，您将发现可以通过定义三次贝塞尔曲线来定义时间。事实上，关键字 `ease`、`ease-in`、`ease-out` 和 `linear` 映射到预定义的贝塞尔曲线，详细说明请参考 [CSS 变换规范](http://www.w3.org/TR/css3-transitions/) 和 [Web Animations 规范](https://w3c.github.io/web-animations/#scaling-using-a-cubic-bezier-curve)。

这些贝塞尔曲线有四个值，即 2 对数字，每对数字描述三次贝塞尔曲线的控制点的 X 和 Y 坐标。贝塞尔曲线的起点坐标为 (0, 0)，终点坐标为 (1, 1)；由您设置两个控制点的 X 和 Y 值。两个控制点的 X 值必须在 0 到 1 之间，每个控制点的 Y 值可以超过 [0, 1] 限制，但此规范未说明可超过多少。

更改每个控制点的 X 和 Y 值将实现截然不同的曲线，从而使动画有截然不同的感觉。例如，如果第一个控制点在右下角，则动画在开头缓慢。如果它在左上角，动画在开头会显得很快。相反，如果第二控制点在网格的右下角，则动画在结尾处变快；而在左上角时，动画将在结尾处变慢。

为了对比，以下有两条曲线：一条典型的缓入缓出曲线和一条自定义曲线：

<div class="attempt-left">
  <figure>
    <img src="images/ease-in-out-markers.png" alt="缓入缓出动画的曲线。" />
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/custom.png" alt="自定义动画的曲线。" />
  </figure>
</div>

[查看自定义缓动的动画](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-custom-curve.html){: target="_blank" .external }

此自定义曲线的 CSS 为：


    transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    

前两个数字是第一个控制点的 X 和 Y 坐标，后两个数字是第二个控制点的 X 和 Y 坐标。

制作自定义曲线很有趣，您可以有效控制对动画的感觉。以上述曲线为例，您可以看到曲线与经典的缓入缓出曲线相似，但缓入即“开始”部分缩短，而结尾减速部分拉长。

使用此[动画曲线工具](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/curve-playground.html){: target="_blank" .external }进行试验，并查看此曲线如何影响动画的感觉。

## 使用 JavaScript 框架实现更多控制

有时您需要三次贝塞尔曲线未能提供的更多控制。如果您需要弹跳的感觉，您可以考虑使用 JavaScript 框架，因为使用 CSS 或 Web Animations 很难实现这个效果。

### TweenMax

[GreenSock 的 TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)（或 TweenLite，如果您想要超轻量版本）是一个强大的框架，您可以在小型 JavaScript 库中获得很多控制，它是一个非常成熟的代码库。

[查看弹性缓动的动画](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-elastic.html){: target="_blank" .external }

要使用 TweenMax，请在页面中包括此脚本：


    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
    

将该脚本放到合适位置后，您可以对元素调用 TweenMax，并且告诉它您想要的任何缓动，以及您想要哪些属性。有大量缓动选项可供使用；以下代码使用一个弹性缓出：


    var box = document.getElementById('my-box');
    var animationDurationInSeconds = 1.5;
    
    TweenMax.to(box, animationDurationInSeconds, {
      x: '100%',
      ease: 'Elastic.easeOut'
    });
    

[TweenMax 文档](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/)重点说明了您使用的所有选项，非常值得一读。





{# wf_devsite_translation #}
