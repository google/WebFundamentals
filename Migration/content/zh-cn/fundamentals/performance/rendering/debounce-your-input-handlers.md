---
title: "对用户输入事件的处理去抖动"
description: "用户输入事件处理函数是一个可能会导致web应用性能问题的因素，因为它们在运行时会阻塞帧的渲染，并且会导致额外且不必要的布局的发生。"
updated_on: 2015-03-20
translators:
  - samchen
notes:
  highdpi:
    - "在DPI较高的屏幕上，固定定位的元素会自动地被提升到一个它自有的渲染层中。但在DPI较低的设备上却并非如此，因为这个渲染层的提升会使得字体渲染方式由子像素变为灰阶（详细内容请参考：[Text Rendering](http://www.html5rocks.com/en/tutorials/internals/antialiasing-101/?redirect_from_locale=zh#toc-text-rendering)），我们需要手动实现渲染层的提升。"
  csstriggers:
    - 想要一份详细的能触发布局、绘制或组合的CSS属性清单？去<a href="http://csstriggers.com/">CSS Triggers</a>看看吧。

key-takeaways:
  - 避免使用运行时间过长的输入事件处理函数，它们会阻塞页面的滚动
  - 避免在输入事件处理函数中修改样式属性
  - 对输入事件处理函数去抖动，存储事件对象的值，然后在requestAnimationFrame回调函数中修改样式属性


---
<p class="intro">
  用户输入事件处理函数是一个可能会导致web应用性能问题的因素，因为它们在运行时会阻塞帧的渲染，并且会导致额外且不必要的布局的发生。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

## 避免使用运行时间过长的输入事件处理函数

在理想情况下，当用户在设备屏幕上触摸了页面上某个位置时，页面的渲染层合并线程将接收到这个触摸事件并作出响应，比如移动页面元素。这个响应过程是不需要浏览器主线程的参与的，也就是说，不会导致JavaScript、布局和绘制过程的发生。

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" class="center" alt="Lightweight scrolling; compositor only.">

但是，如果你对这个被触摸的元素绑定了输入事件处理函数，比如`touchstart`、`touchmove`或者`touchend`，那么渲染层合并线程必须等待这些被绑定的处理函数的执行完毕之后才能被执行。因为你可能在这些处理函数中调用了类似`preventDefault()`的函数，这将会阻止输入事件（touch/scroll等）的默认处理函数的运行。事实上，即便你没有在事件处理函数中调用`preventDefault()`，渲染层合并线程也依然会等待，也就是用户的滚动页面操作被阻塞了，表现出的行为就是滚动出现延迟或者卡顿（帧丢失）。

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" class="center" alt="Heavy scrolling; compositor is blocked on JavaScript.">

简而言之，你必须确保对用户输入事件绑定的任何处理函数都能够快速执行完毕，以便腾出时间来让渲染层合并线程来完成它的工作。

## 避免在输入事件处理函数中修改样式属性

输入事件处理函数，比如scroll/touch事件的处理，都会在`requestAnimationFrame`之前被调用执行。

因此，如果你在上述输入事件的处理函数中做了修改样式属性的操作，那么这些操作会被浏览器暂存起来。然后在调用`requestAnimationFrame`的时候，如果你在一开始做了读取样式属性的操作，那么根据“[避免大规模、复杂的布局](avoid-large-complex-layouts-and-layout-thrashing)”中所述，你将会触发浏览器的强制同步布局过程！

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" class="center" alt="Heavy scrolling; compositor is blocked on JavaScript.">

## 对滚动事件处理函数去抖动

有一个方法能同时解决上面的两个问题：对样式修改操作去抖动，控制其仅在下一次`requestAnimationFrame`中发生：

{% highlight javascript %}
function onScroll (evt) {

  // Store the scroll value for laterz.
  lastScrollY = window.scrollY;

  // Prevent multiple rAF callbacks.
  if (scheduledAnimationFrame)
    return;

  scheduledAnimationFrame = true;
  requestAnimationFrame(readAndUpdatePage);
}

window.addEventListener('scroll', onScroll);
{% endhighlight %}

这么做还有一个额外的好处，就是能使你的事件处理函数变得轻量。这很关键，因为它能使包含复杂计算代码的页面也能快速响应scroll/touch事件！


