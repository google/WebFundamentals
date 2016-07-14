---
title: "优化JavaScript的执行效率"
description: "页面里的动画效果大多是通过JavaScript触发的。有些是直接修改DOM元素样式属性而产生的，有些则是由数据计算而产生的，比如搜索或排序。错误的执行时机和太长的时间消耗，是常见的导致JavaScript性能低下的原因。你需要尽量减少这两方面对你的JavaScript代码带来的执行性能的影响。"
updated_on: 2015-03-20
translators:
  - samchen
notes:
  jit:
    - 如果你想看看JIT到底长什么样，请参考：<a href="http://mrale.ph/irhydra/2/">IRHydra<sup>2</sup> by Vyacheslav Egorov</a>。这篇文章讲解了页面中的JavaScript代码在Chrome的V8引擎中被优化时的中间状态。

key-takeaways:
  - 对于动画效果的实现，避免使用setTimeout或setInterval，请使用requestAnimationFrame。
  - 把耗时长的JavaScript代码放到Web Workers中去做。
  - 把DOM元素的更新划分为多个小任务，分别在多个frame中去完成。
  - 使用Chrome DevTools的Timeline和JavaScript Profiler来分析JavaScript的性能。

---
<p class="intro">
  页面里的动画效果大多是通过JavaScript触发的。有些是直接修改DOM元素样式属性而产生的，有些则是由数据计算而产生的，比如搜索或排序。错误的执行时机和太长的时间消耗，是常见的导致JavaScript性能低下的原因。你需要尽量减少这两方面对你的JavaScript代码带来的执行性能的影响。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

JavaScript性能分析是一门艺术活，因为你所写的JavaScript代码跟实际执行的代码完全是两回事。现代浏览器都会使用JIT编译器和其他优化手段来使你的JavaScript代码能尽可能执行得更快，这个编译和优化的过程会对代码产生极大的改动。

{% include shared/remember.liquid title="Note" list=page.notes.jit %}

尽管如此，在优化JavaScript程序的执行速度方面，还是有一些你力所能及的事。

## 使用requestAnimationFrame

假设页面上有一个动画效果，你想在动画刚刚发生的那一刻的时候做点什么，比如运行一段JavaScript程序。那么唯一能保证这个运行时机的，就是`requestAnimationFrame`。

{% highlight javascript %}
/**
 * If run as a requestAnimationFrame callback, this
 * will be run at the start of the frame.
 */
function updateScreen(time) {
  // Make visual updates here.
}

requestAnimationFrame(updateScreen);
{% endhighlight %}

很多框架和示例代码都是用`setTimeout`或`setInterval`来实现页面中的动画效果。这种实现方式的问题是，你在`setTimeout`或`setInterval`中指定的回调函数的执行时机是无法保证的。它将在这一帧动画的_某个时间点_被执行，很可能是在帧结束的时候。这就意味这我们可能失去这一帧的信息，也就是发生jank。

<img src="images/optimize-javascript-execution/settimeout.jpg" class="g--centered" alt="setTimeout causing the browser to miss a frame.">

事实上，jQuery中`animate`函数就是用`setTimeout`来实现的动画的！我建议你去给它打个补丁，用[`requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame)来取代`setTimeout`。

## 降低代码复杂度或者使用Web Workers

JavaScript代码是运行在浏览器的主线程上的。与此同时，浏览器的主线程还负责样式计算、布局，甚至绘制（多数情况下）的工作。可以想象，如果JavaScript代码运行时间过长，就会阻塞主线程上其他的渲染工作，很可能就会导致帧丢失。

因此，你需要认真规划一下你的JavaScript程序的运行时机和运行耗时。比如，如果你要在一个动画（比如页面滚动）执行过程中运行JavaScript程序，那么理想情况是把这段JavaScript程序的运行耗时控制在3-4毫秒以内。如果长于这个时间，那么就有帧丢失的风险。另一方面，在浏览器空闲的时候，你可以有更多时间来运行JavaScript程序。

大多数情况下，你可以把纯计算工作放到[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage)中做（如果这些计算工作不会涉及DOM元素的存取）。一般来说，JavaScript中的数据处理工作，比如排序或搜索，一般都适合这种处理方式。

{% highlight javascript %}
var dataSortWorker = new Worker("sort-worker.js");
dataSortWorker.postMesssage(dataToSort);

// The main thread is now free to continue working on other things...

dataSortWorker.addEventListener('message', function(evt) {
   var sortedData = e.data;
   // Update data on screen...
});

{% endhighlight %}

正如前面提到的，并不是所有的JavaScript代码都适合这种方式，因为Web Workers无法访问DOM元素。如果你的JavaScript代码需要存取DOM元素，也就是说必须在主线程上运行，那么可以考虑批处理的方式：把任务细分为若干个小任务，每个小任务耗时很少，各自放在一个`requestAnimationFrame`中回调运行。

{% highlight javascript %}
var taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
requestAnimationFrame(processTaskList);

function processTaskList(taskStartTime) {
  var taskFinishTime;

  do {
    // Assume the next task is pushed onto a stack.
    var nextTask = taskList.pop();

    // Process nextTask.
    processTask(nextTask);

    // Go again if there’s enough time to do the next task.
    taskFinishTime = window.performance.now();
  } while (taskFinishTime - taskStartTime < 3);

  if (taskList.length > 0)
    requestAnimationFrame(processTaskList);

}
{% endhighlight %}

如果采用划分小任务的方式，那么你需要确保给用户呈现一个好的UX/UI，使得用户能感知到当前浏览器正在处理一个任务，比如[使用一个进度条或者指示器](http://www.google.com/design/spec/components/progress-activity.html)。不管怎样，这种方式能使释放浏览器的主线程，使你的web应用总能对用户交互保持响应。

## 了解JavaScript的“帧税”

当我们评价一个框架、库或者自己写的JavaScript代码时，很重要的一点就是要分析每一帧中JavaScript代码运行的消耗。对性能很敏感的动画效果（比如渐变或滚动）来说，这一点尤其重要。

对于JavaScript代码的性能分析，最好的方式就是使用Chrom的DevTools。一般来说，通过它你能获取到这些细节：

<img src="images/optimize-javascript-execution/low-js-detail.jpg" class="g--centered" alt="Chrome DevTools' Timeline providing low JS execution detail.">

如果你发现了运行时间很长的JavaScript代码，那么你可以开启DevTools中顶部的JavaScript profiler选项：

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" class="g--centered" alt="Enabling the JS profiler in DevTools.">

但是，这个选项本身的运行也会有一些消耗。因此，确保只有在你需要查看更多运行时细节的时候才开启它。开启这个选项之后，再执行一次页面分析动作，你会看到更多细节：

<img src="images/optimize-javascript-execution/high-js-detail.jpg" class="g--centered" alt="Chrome DevTools' Timeline providing high JS execution detail.">

有了这些信息，你就能分析出JavaScript代码对于页面渲染性能的影响了，从而发现并修复JavaScript代码中性能低下的部分。至于如何修复，就像前面说的，你可以删除它或者把它放到Web Worker中去，以释放主线程来响应其他任务。

## 避免对JavaScript代码进行微优化

对于一个任务，如果换一种实现方式，浏览器的执行速度可以快100倍的话，是非常酷的。比如，读取一个元素的`offsetTop`属性就比计算它的`getBoundingClientRect()`要快。但一般情况下，在每一帧中运行的JavaScript代码之中调用这些函数的次数都是有限的。因此，在这些微优化上花再大的精力，整体上JavaScript代码的性能可能也就获得若干毫秒的提升。这是不划算的。

但是，如果你是做一个游戏，或者计算密集型的web应用，那么这条建议可能不适合你。因为你很可能要在一帧中执行很多计算工作，这种情况下需要争取做一切可能的性能优化。

简而言之：慎用微优化。因为一般来说它对你的web应用效果不大。


