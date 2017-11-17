project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:了解如何缓和或加强您的动画。

{# wf_updated_on:2016-08-23 #}
{# wf_published_on:2014-08-08 #}

# 缓动的基础知识 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

自然界中没有东西是从一点呈线性地移动到另一点。现实中，物体在移动时往往会加速或减速。我们的大脑习惯于期待这种运动，因此在做动画时，应利用此规律。自然的运动会让用户对您的应用感觉更舒适，从而产生更好的总体体验。

### TL;DR {: .hide-from-toc }
* 缓动使您的动画感觉更自然。
* 为 UI 元素选择缓出动画。
* 避免缓入或缓入缓出动画，除非可以使其保持简短；这类动画可能让最终用户觉得很迟钝。


在经典动画中，缓慢开始然后加速的动画术语是“慢入”，快速开始然后减速的动画被称为“慢出”。网络上对于这些动画最常用的术语分别是“缓入”和“缓出”。有时两种动画相组合，称为“缓入缓出”。缓动实际上是使动画不再那么尖锐或生硬的过程。

## 缓动关键字

CSS 变换和动画都允许您[选择要为动画使用的缓动类型](choosing-the-right-easing)。您可以使用影响相关动画的缓动（或有时称为 `timing`）的关键字。还可以[完全自定义您的缓动](custom-easing)，借此方式更自由地表达应用的个性。

以下是可在 CSS 中使用的一些关键字：

* `linear`
* `ease-in`
* `ease-out`
* `ease-in-out`

资料来源：[CSS 变换，W3C](http://www.w3.org/TR/css3-transitions/#transition-timing-function-property)

还可以使用 `steps` 关键字，它允许您创建具有离散步骤的变换，但上面列出的关键字对于创建感觉自然的动画最有用，并且这绝对是您要的效果。

## 线性动画

<div class="attempt-right">
  <figure>
    <img src="images/linear.png" alt="线性缓动动画的曲线。" />
  </figure>
</div>

没有任何缓动的动画称为**线性**动画。线性变换的图形看起来像这样：

随着时间推移，其值以等量增加。采用线性运动时，动画内容往往显得很僵硬，不自然，让用户觉得不协调。一般来说，应避免线性运动。

不管通过 CSS 还是 JavaScript 来编写动画代码，您将发现始终有线性运动的选项。 

[查看线性动画](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-linear.html){: target="_blank" .external }

<div style="clear:both;"></div>

要通过 CSS 实现上述效果，代码将类似下面这样：


    transition: transform 500ms linear;
    


## 缓出动画

<div class="attempt-right">
  <figure>
    <img src="images/ease-out.png" alt="缓出动画的曲线。" />
  </figure>
</div>

缓出使动画在开头处比线性动画更快，还会在结尾处减速。

缓出一般最适合界面，因为开头时快速使动画有反应快的感觉，同时在结尾仍允许有一点自然的减速。

[查看缓出动画](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-out.html){: target="_blank" .external }

<div style="clear:both;"></div>

有很多方法来实现缓出效果，但最简单的方法是 CSS 中的 `ease-out` 关键字：


    transition: transform 500ms ease-out;
    


## 缓入动画

<div class="attempt-right">
  <figure>
     <img src="images/ease-in.png" alt="缓入动画的曲线。" />
  </figure>
</div>

缓入动画开头慢结尾快，与缓出动画正好相反。

这种动画像沉重的石头掉落一样，开始时很慢，然后快速地重重撞击地面，突然沉寂下来。

但是，从交互的角度来看，缓入可能让人感觉有点不寻常，因为结尾很突然；在现实中移动的物体往往是减速，而不是突然停止。缓入还有让人感觉行动迟缓的不利效果，这会对网站或应用的响应速度给人的感觉产生负面影响。

[查看缓入动画](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in.html){: target="_blank" .external }

<div style="clear:both;"></div>

要使用缓入动画，与缓出和线性动画类似，可以使用其关键字：


    transition: transform 500ms ease-in;
    

## 缓入缓出动画

<div class="attempt-right">
  <figure>
    <img src="images/ease-in-out.png" alt="缓入缓出动画的曲线。" />
  </figure>
</div>

缓入并缓出与汽车加速和减速相似，使用得当时，可以实现比单纯缓出更生动的效果。

由于缓入开头让动画有迟钝感，因此动画持续时间不要过长。300-500 毫秒的时间范围通常比较合适，但实际的数量主要取决于项目的感觉。也就是说，由于开头慢、中间快和结尾慢，动画将有更强的对比，可能让用户感到非常满意。

[查看缓入缓出动画](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-ease-in-out.html){: target="_blank" .external }

<div style="clear:both;"></div>


要设置缓入缓出动画，可以使用 `ease-in-out` CSS 关键字：


    transition: transform 500ms ease-in-out;
    




{# wf_devsite_translation #}
