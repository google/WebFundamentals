---
title: "缓动的基础知识"
description: "了解如何缓和或加强您的动画。"
updated_on: 2014-10-21
key-takeaways:
  code:
    - 缓动使您的动画感觉更自然。
    - 为 UI 元素选择缓出动画。
    - 避免缓入或缓入缓出动画，除非可以使其保持简短；这类动画可能让最终用户觉得很迟钝。

---
<p class="intro">
  自然界中没有东西是从一点呈线性地移动到另一点。 现实中，事物在移动时可能加速或减速。 我们的大脑习惯于期待这种运动，因此在做动画时，应利用此规律。 自然的运动将使用户对您的应用感觉更舒适，从而产生更好的总体体验。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

在经典动画中，缓慢开始然后加速的动画术语是“慢入”，快速开始然后减速的动画被称为“慢出”，但是网络上对于这些动画最常用的术语分别是“缓入”和“缓出”。 有时两种动画组合，称为“缓入缓出”。 缓动实际上是使动画不再那么尖锐或生硬的过程。

## 缓动关键字

CSS 变换和动画都允许您[选择要为动画使用的缓动类型]({{site.fundamentals}}/look-and-feel/animations/choosing-the-right-easing.html)。 您可以使用影响相关动画的缓动（或有时称为定时）的关键字。 还可以[完全自定义您的缓动]({{site.fundamentals}}/look-and-feel/animations/custom-easing.html)，使您能更自由地表达应用的个性。

以下是可在 CSS 中使用的一些关键字：

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

资料来源：[CSS 变换，W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

还可以使用`steps`关键字，它允许您创建具有离散步骤的变换，但上面列出的关键字对于创建感觉自然的动画最有用，并且这正是您要的东西。

## 线性动画

没有任何缓动的动画被称为**线性**动画。 线性变换的图形看起来像这样：

<img src="imgs/linear.png" style="max-width: 300px" alt="线性动画的曲线。" />

{% link_sample _code/box-move-linear.html %}查看线性动画{% endlink_sample %}

随着时间推移，其值以等量增加。 采用线性运动时，事物常常让人觉得像机器人，不自然，这也是用户会觉得不协调的东西。 一般来说，应避免线性运动。

不管通过 CSS 还是 JavaScript 来编写动画，您将发现始终有线性运动的选项。 要通过 CSS 实现上述效果，代码将类似以下：

{% highlight css %}
transition: transform 500ms linear;
{% endhighlight %}


## 缓出动画

缓出使动画在开头处比线性动画更快，并且还会在结尾处减速。

<img src="imgs/ease-out.png" style="max-width: 300px" alt="缓出动画的曲线。" />

有很多方法来实现缓出效果，但最简单的方法是 CSS 中的`ease-out`关键字:

{% highlight css %}
transition: transform 500ms ease-out;
{% endhighlight %}

{% link_sample _code/box-move-ease-out.html %}查看缓出动画。{% endlink_sample %}

缓出一般最适合用户界面，因为开头时快速使动画有反应快的感觉，同时在结尾仍允许有一点自然的减速。

## 缓入动画

缓入动画开头慢结尾快；与缓出正好相反。

 <img src="imgs/ease-in.png" style="max-width: 300px" alt="缓入动画的曲线。" />

{% link_sample _code/box-move-ease-in.html %}查看缓入动画。{% endlink_sample %}

这种动画像沉重的石头掉落一样，开始时很慢，然后快速地重重撞击地面，突然沉寂下来。

要使用缓入动画，与缓出和线性动画类似，可以使用其关键字:

{% highlight css %}
transition: transform 500ms ease-in;
{% endhighlight %}

但是，从交互的角度来看，缓入可能让人感觉有点不寻常，因为结尾很突然；在现实中移动的事物往往是减速，而不是突然停止。 缓入还有让人感觉行动迟缓的不利效果，这会对网站或应用的响应速度给人的感觉产生负面影响。

## 缓入缓出动画

缓入并缓出与汽车加速和减速相似，使用得当时，可以实现比单纯缓出更生动的效果。

<img src="imgs/ease-in-out.png" style="max-width: 300px" alt="缓入缓出动画的曲线。" />

{% link_sample _code/box-move-ease-in-out.html %}查看缓入缓出动画。{% endlink_sample %}

必须注意，由于缓入开头让动画有迟钝感，动画时间不要过长。 一般 300 - 500 毫秒的范围比较合适，但很大程度上要根据项目的感觉来使用准确的数字。 也就是说，由于开头慢、中间快和结尾慢，最终动画将有更强的对比，可能让用户感到非常满意。

要设置缓入缓出动画，可以使用`ease-in-out` CSS 关键字:

{% highlight css %}
transition: transform 500ms ease-in-out;
{% endhighlight %}


