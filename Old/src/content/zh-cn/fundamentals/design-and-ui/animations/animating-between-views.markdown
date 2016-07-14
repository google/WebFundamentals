---
title: "在视图之间设置动画"
description: "了解如何在应用的两个视图之间设置动画。"
updated_on: 2014-10-22
key-takeaways:
  code:
    - 使用变换来切换不同视图；避免使用 `left`、`top` 或任何会触发布局的其他属性。
    - 确保使用的所有动画生气勃勃，并且设置较短的持续时间。
    - 考虑在屏幕尺寸增大时您的动画和布局如何变化；适合小屏幕的动画用在桌面环境时可能看起来很怪。
notes:
  sixtyfps:
    - "应当力求使所有动画保持 60fps。 这样用户不会觉得动画卡顿，从而不会影响其使用体验。 确保在动画开始之前，针对您打算更改的属性为动画元素设置 will-change。 对于视图变换，您很可能要使用 <code>will-change: transform</code>。"
  flinging:
    - "以跨浏览器的方式设计此类层次结构可能很难。 例如，iOS 需要额外的 CSS 属性<code>-webkit-overflow-scrolling: touch</code>来“重新启用”抛式滚动，但是您不能像使用标准溢出属性一样，控制动作所针对的轴。 一定要在各种设备上测试您的实现方法！"

---
<p class="intro">
  很多时候您需要让用户在应用的各视图之间切换，不管是从列表换到详情视图，还是显示侧栏导航。 这些视图之间的动画对于吸引用户很有用，并给您的项目增加更多活力。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

这些视图变换的外观及行为在很大程度上取决于您所处理的视图类型，因此（例如）给视图上层的模态叠层设置动画，应是一种与在列表和详情视图之间变换不同的体验。

{% include shared/remember.liquid title="Note" list=page.notes.sixtyfps %}

## 使用变换在视图之间移动

为简单起见，我们假定有两个视图：一个列表视图和一个详情视图。 当用户点击列表视图内的列表项时，详情视图将滑入屏幕，并且列表视图滑出。

<img src="imgs/gifs/view-translate.gif" alt="在两个视图之间变换" />

要实现此效果，您需要一个容纳这两个视图的容器，并为容器设置`overflow: hidden`。 这样两个视图可以并排放在容器内，而不显示水平滚动条，并且每个视图可以按需在容器内侧向滑动。

<img src="imgs/container-two-views.svg" alt="视图层次。" />

此容器的 CSS 代码为：

{% highlight css %}
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
{% endhighlight %}

容器的位置被设置为`relative`。 这意味着，其中的每个视图可以绝对定位在左上角，然后通过变形移动位置。 此方法比使用`left`属性（因为会触发布局和绘图）更有利于性能，并且一般更容易合理化。

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

在`transform`属性上加上`transition`可实现不错的滑动效果。 为实现不错的感觉，它使用了自定义的`cubic-bezier`曲线，我们在[自定义缓动指南](custom-easing.html)中讨论了此主题。

{% highlight css %}
.view {
  /* Prefixes are needed for Safari and other WebKit-based browsers */
  transition: -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
  transition: transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
}
{% endhighlight %}

屏幕之外的视图应变换到右侧，因此在这种情况下需要移动详情视图：

{% highlight css %}
.details-view {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
{% endhighlight %}

现在，需要少量 JavaScript 来处理类。 这将切换视图上相应的类。

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

最后，我们为这些类加上 CSS 声明。

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

{% link_sample _code/inter-view-animation.html %}参考示例。{% endlink_sample %}

您可以扩展此示例以包括多个视图，基本概念仍是一样；每个不可见视图应在屏幕之外，并按需进入屏幕，同时当前屏幕视图应移走。

{% include shared/remember.liquid title="Note" list=page.notes.flinging %}

除了在视图之间变换之外，此技术还能应用于其他滑入元素，例如侧栏导航元素。 唯一差异是不需要移动其他视图。

## 确保动画在较大屏幕上正常显示

对于较大屏幕，始终应让列表视图留在周围，而不是将其移除，并且从右侧滑入详情视图。 它与处理导航视图几乎一样。

<img src="imgs/container-two-views-ls.svg" alt="较大屏幕上的视图层次。" />


