project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:用户希望页面可以交互并且非常流畅。像素管道的每个阶段均可能出现卡顿现象。了解用于确定和解决会降低运行时性能的常见问题的工具和策略。

{# wf_updated_on:2016-03-15 #}
{# wf_published_on:2015-04-13 #}

# 分析运行时性能 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

用户希望页面可以交互并且非常流畅。像素管道的每个阶段均可能出现卡顿现象。
了解用于确定和解决会降低运行时性能的常见问题的工具和策略。




### TL;DR {: .hide-from-toc }
- 不要编写会强制浏览器重新计算布局的 JavaScript。将读取和写入功能分开，并首先执行读取。
- 不要使您的 CSS 过于复杂。减少使用 CSS 并保持 CSS 选择器简洁。
- 尽可能地避免布局。选择根本不会触发布局的 CSS。
- 绘制比任何其他渲染活动花费的时间都要多。请留意绘制瓶颈。


## JavaScript 

JavaScript 计算，特别是会触发大量视觉变化的计算会降低应用性能。
不要让时机不当或长时间运行的 JavaScript 影响用户交互。


### 工具

进行 **Timeline** [记录][recording]，并找出疑似较长的 **Evaluate Script** 事件。
如果您发现存在任何这样的事件，可以启用 [JS 分析器][profiler]并重新做记录，以便获取究竟调用了哪些 JS 函数以及调用每个函数需要多长时间的更详细信息。




如果您注意到 JavaScript 中出现较多的卡顿现象，您可能需要进一步分析并收集 JavaScript CPU 配置文件。CPU 配置文件会显示执行时间花费在页面的哪些函数上。在[加快 JavaScript 执行速度][cpu]中了解如何创建 CPU 配置文件。




[profiler]: ../evaluate-performance/timeline-tool#profile-js
[cpu]: js-execution

### 问题

下表对一些常见 JavaScript 问题和潜在解决方案进行了说明：

<table>
  <thead>
      <th>问题</th>
      <th>示例</th>
      <th>解决方案</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">大开销输入处理程序影响响应或动画。</td>
      <td data-th="Example">触摸、视差滚动。</td>
      <td data-th="Solution">让浏览器尽可能晚地处理触摸和滚动，或者绑定侦听器（请参阅 <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Paul Lewis 运行时性能检查单中的大开销输入处理程序</a>）。</td>
    </tr>
    <tr>
      <td data-th="Problem">时机不当的 JavaScript 影响响应、动画、加载。</td>
      <td data-th="Example">页面加载后用户向右滚动、setTimeout/setInterval。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">优化 JavaScript 执行</a>：使用 <code>requestAnimationFrame</code>、使 DOM 操作遍布各个帧、使用网络工作线程。
    </tr>
    <tr>
      <td data-th="Problem">长时间运行的 JavaScript 影响响应。</td>
      <td data-th="Example"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded 事件</a>由于 JS 工作过多而停止。</td>
      <td data-th="Solution">将纯粹的计算工作转移到<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">网络工作线程</a>。如果您需要 DOM 访问权限，请使用  <code>requestAnimationFrame</code>（另请参阅<a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">优化 JavaScript 执行</a>）。</td>
    </tr>
    <tr>
      <td data-th="Problem">会产生垃圾的脚本影响响应或动画。</td>
      <td data-th="Example">任何地方都可能发生垃圾回收。</td>
      <td data-th="Solution">减少编写会产生垃圾的脚本（请参阅 <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Paul Lewis 运行时性能检查单中的动画垃圾回收</a>）。</td>
    </tr>
  </tbody>
</table>

## 样式 

样式更改开销较大，在这些更改会影响 DOM 中的多个元素时更是如此。
只要您将样式应用到元素，浏览器就必须确定对所有相关元素的影响、重新计算布局并重新绘制。



相关指南：

* [缩小样式计算的范围并降低其复杂性](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)


### 工具

进行 **Timeline** [记录][recording]。检查大型 **Recalculate Style** 事件的记录（以紫色显示）。


点击 **Recalculate Style** 事件可以在 **Details** 窗格中查看更多相关信息。
如果样式更改需要较长时间，对性能的影响会非常大。
如果样式计算会影响大量元素，则需要改进另一个方面。


![长时间运行的重新计算样式](imgs/recalculate-style.png)

要降低 **Recalculate Style** 事件的影响，请执行以下操作：

* 使用 [CSS 触发器](https://csstriggers.com)了解哪些 CSS 属性会触发布局、绘制与合成。
这些属性对渲染性能的影响最大。

* 请转换到影响较小的属性。请参阅[坚持仅合成器属性和管理层计数][compositor]，寻求更多指导。


[compositor]: /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count

### 问题

下表对一些常见样式问题和潜在解决方案进行了说明：


<table>
  <thead>
      <th>问题</th>
      <th>示例</th>
      <th>解决方案</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">大开销样式计算影响响应或动画。</td>
      <td data-th="Example">任何会更改元素几何形状的 CSS 属性，如宽度、高度或位置；浏览器必须检查所有其他元素并重做布局。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">避免会触发布局的 CSS。</a></td>
    </tr>
    <tr>
      <td data-th="Problem">复杂的选择器影响响应或动画。</td>
      <td data-th="Example">嵌套选择器强制浏览器了解与所有其他元素有关的全部内容，包括父级和子级。</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">在 CSS 中引用只有一个类的元素。</a></td>
    </tr>
  </tbody>
</table>

相关指南：

* [缩小样式计算的范围并降低其复杂性](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)


## 布局 

布局（或 Firefox 中的自动重排）是浏览器用来计算页面上所有元素的位置和大小的过程。
网页的布局模式意味着一个元素可能影响其他元素；例如 `<body>` 元素的宽度一般会影响其子元素的宽度以及树中各处的节点，等等。这个过程对于浏览器来说可能很复杂。
一般的经验法则是，如果在帧完成前从 DOM 请求返回几何值，您将发现会出现“强制同步布局”，在频繁地重复或针对较大的 DOM 树执行操作时这会成为性能的大瓶颈。


 

相关指南：

* [避免布局抖动](/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [诊断强制同步布局](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)



### 工具

Chrome DevTools 的 **Timeline** 可以确定页面何时会导致强制同步布局。
这些 **Layout** 事件使用红色竖线标记。 

![强制同步布局](imgs/forced-synchronous-layout.png)

“布局抖动”是指反复出现强制同步布局情况。
这种情况会在 JavaScript 从 DOM 反复地写入和读取时出现，将会强制浏览器反复重新计算布局。
要确定布局抖动，请找到多个强制同步布局警告（如上方屏幕截图所示）的模式。



### 问题

下表对一些常见布局问题和潜在解决方案进行了说明：


<table>
  <thead>
      <th>问题</th>
      <th>示例</th>
      <th>解决方案</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">强制同步布局影响响应或动画。</td>
      <td data-th="Example">强制浏览器在像素管道中过早执行布局，导致在渲染流程中重复步骤。</td>
      <td data-th="Solution">先批处理您的样式读取，然后处理任何写入（另请参阅<a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">避免大型、复杂的布局和布局抖动</a>）。</td>
    </tr>
  </tbody>
    <tr>
      <td data-th="Problem">布局抖动影响响应或动画。</td>
      <td data-th="Example">形成一个使浏览器进入读取-写入-读取写入周期的循环，强制浏览器反复地重新计算布局。</td>
      <td data-th="Solution">使用 <a href="https://github.com/wilsonpage/fastdom">FastDom 内容库</a>自动批处理读取-写入操作。</td>
    </tr>
  </tbody>
</table>

## 绘制与合成 

绘制是填充像素的过程。这经常是渲染流程开销最大的部分。
如果您在任何情况下注意到页面出现卡顿现象，很有可能存在绘制问题。


合成是将页面的已绘制部分放在一起以在屏幕上显示的过程。
大多数情况下，如果坚持仅合成器属性并避免一起绘制，您会看到性能会有极大的改进，但是您需要留意过多的层计数（另请参阅[坚持仅合成器属性和管理层计数](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)）。




### 工具

想要了解绘制花费多久或多久绘制一次？请在 **Timeline** 面板上启用 [Paint profiler][paint]，然后[进行记录][recording]。

如果您的大部分渲染时间花费在绘制上，即表示存在绘制问题。
 

![Timeline 记录中的长时间绘制](imgs/long-paint.png)

请查看 [**rendering settings**][rendering settings] 菜单，进一步了解可以帮助诊断绘制问题的配置。
 

### 问题

下表对一些常见绘制与合成问题及潜在解决方案进行了说明：

<table>
  <thead>
      <th>问题</th>
      <th>示例</th>
      <th>解决方案</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">绘制风暴影响响应或动画。</td>
      <td data-th="Example">较大的绘制区域或大开销绘制影响响应或动画。</td>
      <td data-th="Solution">避免绘制、提升将要移动到自有层的元素，使用变形和不透明度（请参阅<a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">降低绘制的复杂性并减少绘制区域</a>）。</td>
    </tr>
        <tr>
      <td data-th="Problem">层数激增影响动画。</td>
      <td data-th="Example">使用 translateZ(0) 过度提升过多的元素会严重影响动画性能。</td>
      <td data-th="Solution">请谨慎提升到层，并且仅在您了解这样会有切实改进时提升到层（请参阅<a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">坚持仅合成器属性和管理层计数</a>）。</td>
    </tr>
  </tbody>
</table>


[recording]: ../evaluate-performance/timeline-tool#make-a-recording
[paint]: ../evaluate-performance/timeline-tool#profile-painting
[rendering settings]: ../evaluate-performance/timeline-tool#rendering-settings


{# wf_devsite_translation #}
