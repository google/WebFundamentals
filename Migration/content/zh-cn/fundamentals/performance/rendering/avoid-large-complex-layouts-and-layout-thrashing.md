---
title: "避免大规模、复杂的布局"
description: "布局，就是浏览器计算DOM元素的几何信息的过程：元素大小和在页面中的位置。每个元素都有一个显式或隐式的大小信息，决定于其CSS属性的设置、或是元素本身内容的大小、抑或是其父元素的大小。在Blink/WebKit内核的浏览器和IE中，这个过程称为布局。在基于Gecko的浏览器（比如Firefox）中，这个过程称为Reflow。虽然称呼不一样，但二者在本质上是一样的。"
updated_on: 2015-03-20
translators:
  - samchen
notes:
  tree:
    - "在浏览器内部执行渲染流水线的过程中，有一棵渲染树，它是基于DOM树生成的。这棵树上的元素，都是最终会被显示到设备屏幕上的元素。它包含了元素的所有可视信息：颜色、维度、位置等等。但是，如果一个元素含有`display: none`属性，那么它将不会出现这棵渲染树中。同样的，如果一个元素含有一个pseudo子元素（:after, :before），这些pseudo子元素不会出现在DOM树中，但却会出现在渲染树中。"
  csstriggers:
    - 想要一份详细的能触发布局、绘制或渲染层合并的CSS属性清单？去<a href="http://csstriggers.com/">CSS Triggers</a>看看吧。

key-takeaways:
  - 布局通常是在整个文档范围内发生。
  - 需要布局的DOM元素的数量直接影响到性能；应该尽可能避免触发布局。
  - 分析页面布局模型的性能；新的Flexbox比旧的Flexbox和基于浮动的布局模型更高效。
  - 避免强制同步布局事件的发生；对于元素的样式属性值，要先读再写。


---
<p class="intro">
  布局，就是浏览器计算DOM元素的几何信息的过程：元素大小和在页面中的位置。每个元素都有一个显式或隐式的大小信息，决定于其CSS属性的设置、或是元素本身内容的大小、抑或是其父元素的大小。在Blink/WebKit内核的浏览器和IE中，这个过程称为布局。在基于Gecko的浏览器（比如Firefox）中，这个过程称为Reflow。虽然称呼不一样，但二者在本质上是一样的。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

与样式计算类似，布局的时间消耗主要在于：

1. 需要布局的DOM元素的数量
2. 布局过程的复杂程度

## 尽可能避免触发布局

当你修改了元素的样式属性之后，浏览器会将会检查为了使这个修改生效是否需要重新计算布局以及更新渲染树。对于DOM元素的“几何属性”的修改，比如width/height/left/top等，都需要重新计算布局。

{% highlight css %}
.box {
  width: 20px;
  height: 20px;
}

/**
 * Changing width and height
 * triggers layout.
 */
.box--expanded {
  width: 200px;
  height: 350px;
}
{% endhighlight %}

**几乎所有的布局都是在整个文档范围内发生的。** 如果你的页面中含有很多元素，那么计算这些元素的位置和维度的工作将耗费很长时间。

如果确实无法避免布局的发生，那么同样，你应该使用Chrome的DevTools来分析一下它到底耗费了多长时间，从而判断布局过程是否是页面性能的瓶颈。首先，打开DevTools，选择Timeline标签，，点击左上角红色record按钮，然后在页面上做一些互动操作。再点击一次那个红色按钮结束记录，你就会看到页面性能的分解图：

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg" class="g--centered" alt="DevTools showing a long time in Layout" />

我们再仔细分析一下上面的例子，会发现布局耗费的时间超过20毫秒。前面已经说过，为了保障流畅的动画效果，我们需要控制每一帧的时间消耗在16毫秒以内，而现在这个消耗显然太长了。我们还可以看到其他一些细节，比如布局树的大小（此例中为1618个节点）、需要布局的DOM节点数量。

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

## 使用flexbox替代老的布局模型
web页面有许多种布局模型，浏览器对它们的支持程度各不相同。最老式的布局模型能以相对、绝对和浮动的方式将元素定位到屏幕上。

下图显示了对页面中1300个盒对象使用浮动布局的时间消耗分析。当然这个例子有点极端，因为它只用了一种定位方式，而在大多数实际应用中会混用多种定位方式。

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg" class="g--centered" alt="Using floats as layout" />

如果我们对这个示例中的元素使用Flexbox的布局方式（这是web平台上最近新添加的一种布局方式），我们将得到一张完全不同的布局时间消耗图：

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg" class="g--centered" alt="Using flexbox as layout" />

可以看到，对_同样数量的元素_改用Flexbox布局之后，达到了同样的显示效果，但是时间消耗却得到大幅改进（由14毫秒减少到3.5毫秒）。同时需要注意的是，在有些场景下你可能无法使用Flexbox布局方式，因为它[不像浮动布局那样被浏览器广泛支持](http://caniuse.com/#search=flexbox)。但不管怎样，至少你得在对页面布局模型的性能分析的基础之上，来选择一种性能最优的布局方式，而不是随意地选择布局方式。

在任何情况下，不管是是否使用Flexbox，你都应该**努力避免同时触发所有布局**，特别在页面对性能敏感的时候（比如执行动画效果或页面滚动时）。

## 避免强制同步布局事件的发生
将一帧画面渲染到屏幕上的处理顺序如下所示：

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg" class="g--centered" alt="Using flexbox as layout" />

首先是执行JavaScript脚本，_然后_是样式计算，_然后_是布局。但是，我们还可以强制浏览器在执行JavaScript脚本之前先执行布局过程，这就是所谓的**强制同步布局**。

首先你得记住，在JavaScript脚本运行的时候，它能获取到的元素样式属性值都是上一帧画面的，都是旧的值。因此，如果你想在这一帧开始的时候，读取一个元素（暂且称其为“box”）的height属性，你可以会写出这样的JavaScript代码：

{% highlight javascript %}
// Schedule our function to run at the start of the frame.
requestAnimationFrame(logBoxHeight);

function logBoxHeight() {
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

如果你在读取height属性之前，修改了box的样式，那么可能就会有问题了：

{% highlight javascript %}
function logBoxHeight() {

  box.classList.add('super-big');

  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);
}
{% endhighlight %}

现在，为了给你返回box的height属性值，浏览器必须_首先_应用box的属性修改（因为对其添加了`super-big`样式），_接着_执行布局过程。在这之后，浏览器才能返回正确的height属性值。但其实我们可以避免这个不必要且耗费昂贵的布局过程。

为了避免触发不必要的布局过程，你应该首先批量读取元素样式属性（浏览器将直接返回上一帧的样式属性值），然后再对样式属性进行写操作。

上面的JavaScript函数的正确写法应该是：

{% highlight javascript %}
function logBoxHeight() {
  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);

  box.classList.add('super-big');
}
{% endhighlight %}

大多数情况下，你应该都不需要先修改然后再读取元素的样式属性值，使用上一帧的值就足够了。过早地同步执行样式计算和布局是潜在的页面性能的瓶颈之一，你大概也不想这样做。

## 避免快速连续的布局
还有一种情况比强制同步布局更糟：_连续快速的多次执行它_。我们看看这段代码：

{% highlight javascript %}
function resizeAllParagraphsToMatchBlockWidth() {

  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
{% endhighlight %}

这段代码对一组段落标签执行循环操作，设置`<p>`标签的width属性值，使其与box元素的宽度相同。看上去这段代码是OK的，但问题在于，在每次循环中，都读取了box元素的一个样式属性值，然后立即使用该值来更新`<p>`元素的width属性。在下一次循环中读取box元素`offsetwidth`属性的时候，浏览器必须先使得上一次循环中的样式更新操作生效，也就是执行布局过程，然后才能响应本次循环中的样式读取操作。也就意味着，布局过程将在_每次循环_中发生。

我们使用_先读后写_的原则，来修复上述代码中的问题：

{% highlight javascript %}
// Read.
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + 'px';
  }
}
{% endhighlight %}

如果你想确保编写的读写操作是安全的，你可以使用[FastDOM](https://github.com/wilsonpage/fastdom)。它能帮你自动完成读写操作的批处理，还能避免意外地触发强制同步布局或快速连续的布局。


