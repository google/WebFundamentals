---
title: "给模态视图设置动画"
description: "了解如何给应用的模态视图设置动画。"
updated_on: 2014-10-21
key-takeaways:
  code:
    - 模态视图应谨慎使用；如果不必要地打断用户的体验，他们会很失望。
    - 给动画加上缩放可实现不错的“掉落”效果。
    - 在用户取消模态视图时，一定要快速去除它，但是应慢一点放入屏幕，使其不会让用户吃惊。
notes:
  pointerevents:
    - 较旧版本的 Internet Explorer 不支持<code>pointer-event</code>属性，因此对于这些版本，必须手动切换显示属性。 其缺点是要占用一帧让更改“生效”，因此必须使用 requestAnimationFrame 回调来开始动画。 如果不等待一帧，则模态叠层将直接出现。

---
<p class="intro">
  模态视图用于重要消息，并且您有很好的理由来阻止用户界面。 在使用此类视图时必须注意，因为它们会导致中断，如果过度使用，可能容易损害用户体验。 但是，在某些情况下，它们是适合使用的视图，并且加上一些动画将使其变得生动。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

<img src="imgs/gifs/dont-press.gif" alt="给模态视图设置动画。" />

{% link_sample _code/modal-view-animation.html %}参考示例。{% endlink_sample %}

模态叠层应与视口对齐，因此需要将其`position`设置为`fixed`：

{% highlight css %}
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
{% endhighlight %}

其初始`opacity`为 0，因此在视图中被隐藏，而且还需要将`pointer-events`设置为`none`，使点击和触摸事件能够穿过。 若不设置，它将阻止所有交互，使整个页面无响应。 最后，由于它将对`opacity`和`transform`设置动画，需要使用`will-change`这些属性将其标记为“即将更改” (另请参考[使用 will-change 属性]({{site.fundamentals}}/look-and-feel/animations/animations-and-performance.html#using-the-will-change-property))。

当视图可见时，需要接受交互并且将`opacity`设置为 1：

{% highlight css %}
.modal.visible {
  pointer-events: auto;
  opacity: 1;
}
{% endhighlight %}

现在，每当需要模态视图时，可以使用 JavaScript 来切换 "visible" 类：

{% highlight javascript %}
modal.classList.add('visible');
{% endhighlight %}

此时，模态视图将以无动画的方式出现，那么现在可以加入动画
(另请参考[自定义缓动]({{site.fundamentals}}/look-and-feel/animations/custom-easing.html))：

{% highlight css %}
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
{% endhighlight %}

给变形属性加上`scale`使视图好像轻轻掉到屏幕上，这是一种不错的效果。 同时给变形和透明度属性应用默认变换，采用自定义曲线和 0.1 秒持续时间。

这个持续时间很短，但在用户消除视图并且希望返回应用时，效果非常好。 缺点是当模态视图出现时，可能太突然。 要纠正此问题，应当代替`visible`类的变换值：

{% highlight css %}
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
{% endhighlight %}

现在模态视图用 0.3 秒时间进入屏幕，没那么突然，但是会快速消除，这样用户会喜欢。



